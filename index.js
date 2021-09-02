const { Client, Util, MessageEmbed, Collection } = require("discord.js");
const randomstring = require("randomstring");
// const fs = require("fs");
// const distube = require("distube");
const { GiveawaysManager } = require("discord-giveaways");
const Discord = require("discord.js");
const timezone = require("moment-timezone");
const DIG = require("discord-image-generation");
//const colors = require("colors");
//const client = new Client();
const bot = new Client({ partials: ["MESSAGE", "REACTION"] }); //({ disableMentions: "everyone" });
//const { MessageButton } = require("discord-buttons");
const superagent = require("superagent");
const express = require("express");
const app = express();
const http = require("http");
const ms = require("ms");
//const timeSpan = ms("2 days");
//require("discord-buttons")(bot);

const { prefix, TOKEN, developer } = require("./util/main");
const { get } = require("node-superfetch");

let PREFIX = prefix;

app.get("/", (req, res) => {
  console.log("ping");
  res.sendStatus(200);
});

app.listen(process.env.PORT);

bot.on("warn", console.warn);
bot.on("shard", () => {
  let shard = new Discord.ShardingManager("./index.js").shards.size;
  let channel = bot.channels.cache.get("808454208760053822");

  if (!channel) return;

  channel.send(shard);
});
bot.on("error", console.error);
bot.on("ready", () => {
  console.log("bot sudah online");
    
    bot.user.setStatus("dnd");

    function time() {
        let waktu = bot.channels.cache.get("878427894332936203");
        waktu.setName(`${timezone().tz("Asia/Jakarta").format("⌚ HH:mm [WIB]") + " "}`);
        let waktu1 = bot.channels.cache.get("878430437884723210");
        waktu1.setName(`${timezone().tz("Asia/Irkutsk").format("⌚ HH:mm [WIT]") + " "}`);
        let waktu2 = bot.channels.cache.get("878430913548124270");
        waktu2.setName(`${timezone().tz("Asia/Jayapura").format("⌚ HH:mm [WITA]") + " "}`);
    }
    setInterval(time, 10000);
});
bot.on("shardDisconnect", async(event, id) => {
    console.log(`[SHARD] Shard ${id} disconnected (${event.code})`);
});
bot.on("shardReconnecting", async(id) => {
    console.log(`[SHARD] Shard ${id} conntecting ${id.toFixed}`);
});

bot.snipes = new Map();
bot.edits = new Map();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.premiums = new Collection();
bot.hatebin = new Map();
bot.developers = developer;
bot.giveaways = new GiveawaysManager(bot, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  embedColor: "GOLD",
  reaction: "🎉"
});
bot.antijoins = new Collection();
["module"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

//const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
//for(const file of commandFiles) {
  //const command = require(`./commands/${file}`);
  //bot.commands.set(command.name, command);
//}
bot.on("guildCreate", (guild) => {
    let ch;
    guild.channels.cache.forEach((channel) => {
        if(channel.type === "text" && !ch && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) ch = channel;
    });
    if(!ch) return;

    const embed = new MessageEmbed()
    .setAuthor(`Hello!, Thank you for inviting me to ${guild.name}`)
    .setColor("#00fdfd")
    .setDescription(`My prefix is **${prefix}**`)
    .addField("need help?", "Take a look at my developers!")
    .addField("join my developer's existing server!", "[join](https://discord.gg/zuVYHJfaHC)")
    .setTimestamp();
    ch.send(embed).catch(e => {
        if(e) return;
    });
});
bot.on("messageDelete", function(message, channel) {
    bot.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });

  //ghost pings
  if(message.mentions.users.first()) {
    let channel = bot.channels.cache.get("864049509306335243");

    if(!channel) return;

    const embed = new MessageEmbed()
    .setTitle("Ghost ping")
    .setColor("RED")
    .setDescription(`${message.author} ghost pings: ${message.mentions.users.first()}\nmessage ini dari: ${message.guild}`)
    .setTimestamp();
    return channel.send(embed);
  }
});
bot.on("messageUpdate", async(oldMessage, message) => {
    bot.edits.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });
  //ghost pings
  if(oldMessage.mentions.users.first()) {
    let channel = bot.channels.cache.get("864049509306335243");

    if(!channel) return;
    
    const embed = new MessageEmbed()
    .setTitle("Ghost ping")
    .setColor("RED")
    .setDescription(`${oldMessage.author} ghost pings: ${oldMessage.mentions.users.first()}\nmessage ini dari: ${oldMessage.guild}`)
    .setTimestamp();
    return channel.send(embed);
  }
});
bot.on("guildMemberAdd", async(member, message) => {
    const getCollection = bot.antijoins.has(member.guild.id);
    if(!getCollection) return;
    // if(!bot.antijoins.includes(member.user)) {
    //     bot.antijoins.push(member.user);
    // }
    if(bot.antijoins.get(member.guild.id)) {
        if(!member.guild.me.permissions.has("KICK_MEMBERS")) return;
        try {
            await member.user.send(`You have been kicked with reason: **Antijoin was enabled**`);
        } catch {

        }
        await member.kick("Antijoin was enabled");
    }

    let guild = member.guild;
    let server = guild.name;
    let total = guild.memberCount;
    let channel = member.guild.channels.cache.find(ch => ch.name === "logs");
    let role = member.guild.roles.cache.find(r => r.name === "member");
    if (!channel) return;
    if (!role) return;
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Welcome!")
      .setDescription(`Asik ${member} join, sekarang member ada: ${total} member`)
      .setTimestamp()
      .setFooter("script by: BuleWolf#0371\n");
    channel.send(embed).then(member.roles.add(role.id));
  });
  bot.on("guildMemberRemove", member => {
    let guild = member.guild;
    let server = guild.name;
    let total = guild.memberCount;
    let channel = member.guild.channels.cache.find(ch => ch.name === "logs");
    if (!channel) return;
    const embed = new MessageEmbed()
      .setColor("RED")
      .setTitle("Good bye!")
      .setDescription(`yah ${member} left, sekarang member sisa: ${total} member`)
      .setTimestamp()
      .setFooter("script by: BlueWolf#0371");
    channel.send(embed);
  });

bot.on("ready", () => {
  function randomStatus() {
    let s = [
      `🎥| My prefix ${PREFIX}`,
      `🎥| creator: ${developer}`,
      //`🎥| invite saya: ${PREFIX}invite`,
      //`🎥| found a bug? | ${PREFIX}report-bug`,
      //"🎥| Rilis Versi 4.2.6",
      //`🎥| mau kirim masukan? | ${PREFIX}request`,
      //`🎥| mau ngerjain tugas sambil main discord? | ${PREFIX}google | ${PREFIX}brainly`,
      `🎥| Time: ${timezone().tz("Asia/Jakarta").format("⌚ HH:mm [WIB]") + " "}`,
      `🎥| ${bot.users.cache.size} 👤User!`,
      `🎥| ${bot.guilds.cache.size} 📬Server!`,
      `🎥| ${bot.channels.cache.size} 🌐Channel!`,
      `🎥| total shard: ${bot.shard / 1000}%`
    ];
    bot.user.setActivity({
      url: "https://www.youtube.com/watch?v=iydD0OxoaH0",
      name: s[Math.floor(Math.random() * s.length)],
      type: "COMPETING"
    });
  }
  setInterval(randomStatus, 8000);
});
// bot.on("guildMemberAdd", member => {
//     const createdAt = new Date(member.user.createdAt).getTime();
//     const difference = Date.now() - createdAt;

//     if(difference < timeSpan) {
//         member.send("You are an Alt account!");
//         member.kick({ reason: "This is an alt account" });
//     }
// });
bot.on("messageReactionAdd", async(reaction, user) => {
    const starboard = async() => {
        const SBChannel = bot.channels.cache.find(c => c.name.toLowerCase() === "starboard");
        const msgs = await SBChannel.messages.fetch({ limit: 100});
        const sentMessage = msgs.find(msg => msg.embeds.length = 1 ? (msg.embeds[0].footer.text.startsWith(reaction.message.id) ? true : false) : false);
        if(sentMessage) sentMessage.edit(`${reaction.count} - ⭐`);
        else {
            const embed = new MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`)
            .setColor("YELLOW")
            .setFooter(reaction.message.id)
            .setTimestamp();
            if(reaction.message.attachments.array().length >= 1) embed.setImage(reaction.message.attachments.array()[0].proxyURL);
            if(SBChannel) SBChannel.send("1 - ⭐", embed);
        }
    }
    if(reaction.emoji.name === "⭐") {
        if(reaction.message.channel.name.toLowerCase() === "starboard") return;
        if(reaction.message.partial) {
            await reaction.fetch();
            await reaction.message.fetch();
        } else starboard();
    }
});
bot.on("message", async(message) => {
  if (message.author.bot || message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content === `<@${bot.user.id}>` || message.content === `<@!${bot.user.id}>`) {
    message.channel.send(`${message.author} My Prefix is ${message.prefix}`).then(m => {
      m.delete({ timeout: 4000 });
    });
}
  //sistem args
 const args = message.content.split(" ");
  
  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  message.prefix = prefix;
  
 // bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
  
  const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
//   const cmds = bot.premiums.get(command) || bot.premiums.find(cmds => cmds.premiums && cmds.premiums.includes(command));
//   cmd = cmds;
  if(cmd) {
   cmd.run(bot, message, args);
  } else return;

  //sistem cooldown
  let { cooldown } = require("./cooldown.js");
  let cmdcooldown = cooldown;

  if (!message.content.startsWith(prefix)) return;
  
  if (cmdcooldown.has(message.author.id)) {
    await message.delete();
    return message.channel.send("Hai gunakan bot ini lagi dalam 4 detik!").then(m => {
        m.delete({ timeout: 4000 });
      });
  }

  cmdcooldown.add(message.author.id);
  setTimeout(() => {
    cmdcooldown.delete(message.author.id);
  }, 4000);
  let channel = bot.channels.cache.get("800392235186651136");
  const embed = new MessageEmbed();
  console.log(`${message.author.tag} menggunakan command ${prefix}${command}`, `message ini dari: ${message.guild.name}`);
//   if (command === "setprefix") {
//     let staff = message.member.hasPermission(["ADMINISTRATOR"]);
//     if (!staff)
//       return message.reply("sorry you not have permision **__ADMINISTRATOR__**!").then(m => {
//           m.delete({ timeout: 4000 });
//         });
//     let data = db.get(`prefix.${message.guild.id}`);

//     let simbol = args.slice(1).join(" ");
//     if (!simbol)
//       return message.channel.send("please input the prefix!").then(m => {
//         m.delete({ timeout: 4000 });
//       });
//     db.set(`prefix.${message.guild.id}`, simbol);
//     message.channel.send(`💡SUCSES! the server prefix has changed to: **${simbol}**\nNote: type **${simbol}default** to changed prefix default`);
//   } else if (command === "default") {
//     db.delete(`prefix.${message.guild.id}`);
//     return message.channel.send("the prefix server has changed to default!").then(m => {
//         m.delete({ timeout: 4000 });
//       });
//   }
    // if (message.content.startsWith(`${prefix}setup`)) {

    //     if (!message.guild.member(bot.user).hasPermission(["MANAGE_CHANNELS", "ADMINISTRATOR"])) return;
    //     message.guild.channels.create(`mining`, 'text').catch(e => { });

    // }

    // if (message.content.startsWith(`${prefix}gen`)) {

    //     message.delete();

    //     message.channel.send("https://discord.gift/" + randomstring.generate(16));

    // }


    // if (message.content.startsWith(`${prefix}start`)) {
    //     if (!message.guild.member(bot.user).hasPermission(["ADMINISTRATOR"])) return;

    //     message.delete();

    //     setInterval(function () {

    //         message.channel.send("https://discord.gift/" + randomstring.generate(16));

    //     }, 4000);

    // }
  /*if (command === "invite") {
    try {
      let ms = await message.channel.send("membuat link <a:loading:771193549436747786>");
      setTimeout(() => {
        const embed = new MessageEmbed()
          .setColor("BLUE")
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL({ format: "png", dynamic: true }) + "?size=")
          .setTitle("invite")
          .setDescription("invite saya!")
          .addFields(
            {
              name: "link invite:",
              value: "[click here!](https://bit.ly/Anime-bot)",
              inline: true
            },
            {
              name: "link official server discord Anime:",
              value: "[join](https://discord.gg/SY4u37zqEt)",
              inline: true
            },
            {
              name: "subcribe Channel Not A Developer!:",
              value: "[SUBCRIBE](https://www.youtube.com/watch?v=j1e7QSReo5Y)",
              inline: true
            },
            {
              name: "Join projek glitch!",
              value: "[JOIN PROJEK](https://discord.gg/NekoPoi)",
              inline: true
            },
            {
              name: "liat muka asli ||RAHASIA||",
              value: "[lihat](https://discord.gg/NekoPoi)",
              inline: true
            }
          )
          .setTimestamp()
          .setFooter("Script by: BlueWolf#0371\n");
        ms.edit("berhasil membuat link", embed);
      }, 4000);
    } catch (error) {
      return message.channel.send(error.message);
    }
  }*/
  try {
    const commandFile = require(`./commands/owner/${command}.js`);
    commandFile.run(bot, message, args, Util);
  } catch(error) {
    
  }
  try {
    const commandFile = require(`./commands/moderator/${cmd}.js`);
    commandFile.run(bot, message, args);
  } catch(error) {
    
  }
  try {
    const commandFile = require(`./commands/member/${cmd}.js`);
    commandFile.run(bot, message, args);
  } catch(error) {
    
  }
  try {
    const commandFile = require(`./commands/giveaway/${cmd}.js`);
    commandFile.run(bot, message, args);
  } catch(error) {
    
  }
//   try {
//   const commandFile = require(`./commands/${command}.js`);
//   commandFile.run(bot, message, args);
//   } catch(error) {

//   }
//   try {
//     const commandFile = require(`../botconfig/${command}js`);
//     commandFile(bot, message, args);
//   } catch(error) {
    
//   }
});
bot.on("message", async message => {
  let id = "786861563222163486";
  if (message.channel.id === id) {
    await message.delete();
  }
});
bot.login(TOKEN);