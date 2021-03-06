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

const { prefix, TOKEN, developer } = require("./util/main");
const { get } = require("node-superfetch");

let PREFIX = prefix;

app.get("/", (req, res) => {
  console.log("ping");
  res.sendStatus(300);
});
app.listen(3000);

bot.on("warn", console.warn);
bot.on("error", console.error);
bot.on("ready", () => {
  console.log("bot sudah online");
    
    bot.user.setStatus("dnd");
    //automeme();

    function time() {
        let waktu = bot.channels.cache.get("878427894332936203");
        waktu.setName(`${timezone().tz("Asia/Jakarta").format("? HH:mm [WIB]") + " "}`);
        let waktu1 = bot.channels.cache.get("878430437884723210");
        waktu1.setName(`${timezone().tz("Asia/Irkutsk").format("? HH:mm [WIT]") + " "}`);
        let waktu2 = bot.channels.cache.get("878430913548124270");
        waktu2.setName(`${timezone().tz("Asia/Jayapura").format("? HH:mm [WITA]") + " "}`);
    }
    setInterval(time, 10000);
});
bot.on("shardDisconnect", async(event, id) => {
    console.log(`[SHARD] Shard ${id} disconnected (${event.code})`);
});
bot.on("shardReconnecting", async(id) => {
    console.log(`[SHARD] conntecting...`);
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
  reaction: "??"
});
bot.antijoins = new Collection();
//bot.antiinvites = new Collection();
["module"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

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
    //.addField("join my developer's existing server!", "[join](https://discord.gg/zuVYHJfaHC)")
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
      `My prefix ${PREFIX}`,
      `creator: ${developer}`,
      //`invite saya: ${PREFIX}invite`,
      //`found a bug? | ${PREFIX}report-bug`,
      //"Rilis Versi 4.2.6",
      //`mau kirim masukan? | ${PREFIX}request`,
      //`mau ngerjain tugas sambil main discord? | ${PREFIX}google | ${PREFIX}brainly`,
      `Time: ${timezone().tz("Asia/Jakarta").format("? HH:mm [WIB]") + " "}`,
      `${bot.users.cache.size} User!`,
      `${bot.guilds.cache.size} Server!`,
      `${bot.channels.cache.size} Channel!`,
      //`total shard: ${bot.shard / 1000}%`
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
        if(sentMessage) sentMessage.edit(`${reaction.count} - ?`);
        else {
            const embed = new MessageEmbed()
            .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL({ dynamic: true }))
            .setDescription(`**[Jump to the message](${reaction.message.url})**\n\n${reaction.message.content}\n`)
            .setColor("YELLOW")
            .setFooter(reaction.message.id)
            .setTimestamp();
            if(reaction.message.attachments.array().length >= 1) embed.setImage(reaction.message.attachments.array()[0].proxyURL);
            if(SBChannel) SBChannel.send("1 - ?", embed);
        }
    }
    if(reaction.emoji.name === "?") {
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

  const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
//   const cmds = bot.premiums.get(command) || bot.premiums.find(cmds => cmds.premiums && cmds.premiums.includes(command));
//   cmd = cmds;
  if(cmd) {
   cmd.run(bot, message, args);
  } else return;
  console.log(`${message.author.tag} menggunakan command ${prefix}${command}`, `message ini dari: ${message.guild.name}`);
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
});
bot.login(TOKEN);