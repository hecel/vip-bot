const { Client, Util, MessageEmbed, Collection } = require("discord.js");
const fs = require("fs");
const distube = require("distube");
const { GiveawaysManager } = require("discord-giveaways");
const Discord = require("discord.js");
const timezone = require("moment-timezone");
const DIG = require("discord-image-generation");
const colors = require("colors");
const client = new Client();
const bot = new Client();
//const { MessageButton } = require("discord-buttons");
const superagent = require("superagent");
const express = require("express");
const app = express();
const http = require("http");
const ms = require("ms");
const timeSpan = ms("2 days");
//require("discord-buttons")(bot);

const { prefix, TOKEN, developer } = require("./util/main");

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
        let waktu = bot.channels.cache.get("878427894332936203")
        waktu.setName(`${timezone().tz("Asia/Jakarta").format("⌚ HH:mm [WIB]") + " "}`)
        let waktu1 = bot.channels.cache.get("878430437884723210")
        waktu1.setName(`${timezone().tz("Asia/Irkutsk").format("⌚ HH:mm [WIB]") + " "}`)
        let waktu2 = bot.channels.cache.get("878430913548124270")
        waktu2.setName(`${timezone().tz("Asia/Jayapura").format("⌚ HH:mm [WIB]") + " "}`)
    }
    setInterval(time, 10000);
});

bot.snipes = new Map();
bot.edits = new Map();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.hatebin = new Map();
bot.developers = developer;
bot.giveaways = new GiveawaysManager(bot, {
  storage: "./giveaways.json",
  updateCountdownEvery: 5000,
  embedColor: "GOLD",
  reaction: ":tada:"
});

//const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
//for(const file of commandFiles) {
  //const command = require(`./commands/${file}`);
  //bot.commands.set(command.name, command);
//}
bot.on("messageDelete", function(message, channel) {
  bot.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    image: message.attachments.first() ? message.attachments.first().proxyURL : null
  });
});

bot.on("ready", () => {
  function randomStatus() {
    let s = [
      `🎥| My prefix ${PREFIX}`,
      `🎥| creator: ${developer}`,
      `🎥| invite saya: ${PREFIX}invite`,
      `🎥| menemukan bug? | ${PREFIX}report-bug`,
      "🎥| Rilis Versi 4.2.6",
      `🎥| mau kirim masukan? | ${PREFIX}request`,
      `🎥| mau ngerjain tugas sambil main discord? | ${PREFIX}google | ${PREFIX}brainly`,
      `🎥| Waktu: ${timezone().tz("Asia/Jakarta").format("⌚ HH:mm [WIB]") + " "}`,
      `🎥| ${bot.users.cache.size} 👤User!`,
      `🎥| ${bot.guilds.cache.size} 📬Server!`,
      `🎥| ${bot.channels.cache.size} 🌐Channel!`,
      `🎥| total shard: ${client.shard / 1000}%`
    ];
    bot.user.setActivity({
      url: "https://www.youtube.com/watch?v=iydD0OxoaH0",
      name: s[Math.floor(Math.random() * s.length)],
      type: "COMPETING"
    });
  }
  setInterval(randomStatus, 8000);
});
bot.on("guildMemberAdd", member => {
    const createdAt = new Date(member.user.createdAt).getTime();
    const difference = Date.now() - createdAt;

    if(difference < timeSpan) {
        member.send("You are an Alt account!");
        member.kick({ reason: "This is an alt account" });
    }
});
bot.on("message", async message => {
  if (message.author.bot || message.channel.type === "dm") return;
  if (!message.content.startsWith(prefix)) return;
  //sistem args
 const args = message.content.split(" ");
  
  let command = message.content.toLowerCase().split(" ")[0];
  command = command.slice(prefix.length);
  message.prefix = prefix;
  
 // bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
  
  //const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
  //if(cmd) {
   // cmd.execute(bot, message, args);
  //} else return;

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

  let owner = "745841820201910303";
  let emoji1 = "👍",
    emoji2 = "👎",
    emoji3 = "🚫";

    // Queue status template
    const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

    // DisTube event listeners, more in the documentation page
    distube.on("playSong", (message, queue, song) => message.channel.send(`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user.tag}\n${status(queue)}`)).on("addSong", (message, queue, song) => message.channel.send(`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user.tag}`)).on("playList", (message, queue, playlist, song) => message.channel.send(`Play \`${playlist.name}\` playlist (${playlist.songs.length} songs).\nRequested by: ${song.user.tag}\nNow playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}`)).on("addList", (message, queue, playlist) => message.channel.send(`Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)}).on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    .on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
    });

//   if(command === "tes") {
    
//     const button = new MessageButton()
//     .setStyle("green")
//     .setID("1")
//     .setLabel("ENABLE");
      
//     const button2 = new MessageButton()
//     .setStyle("red")
//     .setID("2")
//     .setLabel("DISABLE");
      
//     const m = await message.channel.send("testing", { buttons: button});
      
//     const collect = m.createButtonCollector((button) => {
//       button.clicker.user.id === message.author.id, { time: 600000, max: 1000 }
//     });
//     collect.on("collect", (c) => {
//       console.log(c.id);
        
//       c.defer();
        
//       if(c.id == "1") {
        
//         button.edit("testing button", { buttons: button2 });
          
//         collect.stop();
//         } else if(c.id == "2") {
          
//           c.defer();
          
//           button.edit("testing", { buttons: button });
          
//           collect.stop();
//         }
//       });
//   }
  if (command === "setprefix") {
    let staff = message.member.hasPermission(["ADMINISTRATOR"]);
    if (!staff)
      return message.reply("sorry you not have permision **__ADMINISTRATOR__**!").then(m => {
          m.delete({ timeout: 4000 });
        });
    let data = db.get(`prefix.${message.guild.id}`);

    let simbol = args.slice(1).join(" ");
    if (!simbol)
      return message.channel.send("please input the prefix!").then(m => {
        m.delete({ timeout: 4000 });
      });
    db.set(`prefix.${message.guild.id}`, simbol);
    message.channel.send(`💡SUCSES! the server prefix has changed to: **${simbol}**\nNote: type **${simbol}default** to changed prefix default`);
  } else if (command === "default") {
    db.delete(`prefix.${message.guild.id}`);
    return message.channel.send("the prefix server has changed to default!").then(m => {
        m.delete({ timeout: 4000 });
      });
  }
  if (command === "verif") {
    await message.delete();
    let id = "783773922058305558";
    let guild = message.guild.id === id;
    if (!guild) {
      return message.channel.send(`maaf command ini hanya bisa di ${id}!`).then(m => {
          m.delete({ timeout: 4000 });
        });
    } else {
      let channel = bot.channels.cache.get("786872400436002837");
      const verifikasi = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("🔓verifikasi🔓")
        .setDescription(`${message.author.username} mau verifikasi!`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("script by: BlueWlf#0371\n");
      channel.send("@here", verifikasi).then(real => {
        real.react("🔓");
        real.react(emoji3);
      });
    }
  }
  if (command === "request") {
    let author = bot.channels.cache.get("793591111851573268");
    let m = message.content.split(" ").slice(1).join(" ");
    if (!m)
      return message.channel.send("Tolong masukan request kamu!").then(m => {
        m.delete({ timeout: 4000 });
      });
    message.reply("terimakasih atas masukannya!").then(m => {
      m.delete({ timeout: 4000 });
    });
    let embed = new MessageEmbed()
      .setColor("YELLOW")
      .setTitle("Request command")
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`pesan dari: ${message.author.tag} request command:\n${m}`);
    author.send(`pesan dari server: ${message.guild.name}`, embed).then(req => {
      req.react(emoji1);
      req.react(emoji2);
      req.react(emoji3);
    });
  }
  if (command === "rip") {
    let input = args.slice(1).join("+");
    let user =
      message.mentions.members.first() ||
      message.author ||
      bot.users.cache.get(input) ||
      bot.users.cache.find(x => x.username == input);
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let img = await new DIG.Rip().getImage(avatar);
    let attach = new Discord.MessageAttachment(img, "rip.png");
    message.channel.send(attach).then(wasted => {
      wasted.react(emoji1);
      wasted.react(emoji2);
    });
  }
  if (command === "wanted") {
    let input = args.slice(1).join("+");
    let user =
      message.mentions.members.first() ||
      message.author ||
      bot.users.cache.get(input) ||
      bot.users.cache.find(x => x.username == input);
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let img = await new DIG.Wanted().getImage(avatar);
    let attach = new Discord.MessageAttachment(img, "wanted.png");
    message.channel.send(attach).then(wanted => {
      wanted.react(emoji1);
      wanted.react(emoji2);
    });
  }
  if (command === "putin") {
    let input = args.slice(1).join("+");
    let user =
      message.mentions.members.first() ||
      message.author ||
      bot.users.cache.get(input) ||
      bot.users.cache.find(x => x.username == input);
    let avatar = user.displayAvatarURL({ dynamic: false, format: "png" });
    let img = await new DIG.Poutine().getImage(avatar);
    let attach = new Discord.MessageAttachment(img, "putin.png");
    message.channel.send(attach).then(b => {
      b.react(emoji1);
      b.react(emoji2);
    });
  }
  if (command === "report-bug") {
    try {
      if (
        !message.content.split(" ").slice(1).join(" "))
        return message.channel.send("tolong masukan command dan bug nya!").then(m => {
            m.delete({ timeout: 4000 });
          });
      message.reply("terimakasih atas masukannya!").then(anjay => {
        anjay.delete({ timeout: 4000 });
      });
      const author = bot.channels.cache.get("793592559795699752");
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Bug Command")
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setDescription(
          message.content.split(" ").slice(1).join(" "))
        .setTimestamp()
        .setFooter("script by: BlueWolf#0371\n");
      author.send(embed).then(Chat => {
        Chat.react(emoji1);
        Chat.react(emoji2);
        Chat.react(emoji3);
      });
    } catch (e) {
      let embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(":x: Error!")
        .setDescription(e)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("Script by: BlueWolf#0371\n");
      message.channel.send(embed).then(Turah => {
        Turah.react(emoji1);
        Turah.react(emoji2);
        Turah.react(emoji3);
      });
    }
  }
  if (command === "ls") {
    try {
      if (message.author.id !== owner)
        return message.channel.send("Maaf kamu bukan owner!");
      let md = await message.channel.send("mengecek harap sabar <a:loading:771193549436747786>");
      setTimeout(() => {
        let embed = new MessageEmbed()
          .setColor("GREEN")
          .setTitle("List User dan Server")
          .setDescription("melihat list server dan user")
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .addField("USER:", `**${bot.users.cache.size} User!**`)
          .addField("SERVER:", `**${bot.guilds.cache.size} Server!**`)
          .setTimestamp()
          .setFooter("Script by: BlueWolf#0371\n");
        md.edit("berhasil mengecek!", embed);
      }, 4000);
    } catch (error) {
      let embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(":x: Error!")
        .setDescription(`**${error.message}**`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
        .setFooter("Script by: BlueWolf#0371");
      message.channel.send(embed);
    }
  }
  if (command === "muka") {
    try {
      if (message.author.id !== "745841820201910303") {
        message.channel.send("maaf hanya owner yang bisa!").then(m => m.delete(5000));
      } else {
        let m = await message.channel.send("menganalisa muka <a:loading:771193549436747786>");
        setTimeout(() => {
          const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle("**clik here!**")
            .setDescription("pencet **clik here!** untuk melihat!")
            .setURL("https://bit.ly/muka-Dika")
            .setTimestamp();
          m.edit("berhasil menganalisa", embed);
        }, 6000);
      }
    } catch (e) {
      return message.channel.send(e.message);
    }
  }
  if (command === "ramal") {
    try {
      let pertanyaan = message.content.split(" ").slice(1).join(" ");
      let jawaban = [
        "tidak",
        "ya",
        "mungkin",
        "bisa jadi",
        "error",
        "entahlah",
        "lupa"
      ];
      let m = await message.channel.send("Sedang meramal <a:loading:771193549436747786>");
      setTimeout(() => {
        const embed = new MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(message.author.tag, message.author.displayAvatarURL())
          .setTitle("**🔮Bola Sakti🔮**")
          .addField("pertanyaan:", `**${pertanyaan}**`)
          .addField("Jawaban",`**${jawaban[Math.floor(Math.random() * jawaban.length)]}**`)
          .setTimestamp()
          .setFooter("Script by: BlueWolf#0371\n");
        m.edit("berhasil meramal!", embed).then(ramal => {
          ramal.react(emoji1);
          ramal.react(emoji2);
        });
      }, 4000);
    } catch (error) {
      return message.channel.send(error.message);
    }
  }
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
  if (command === "servericon") {
    message.react("🔎");
    try {
      if (!message.member.hasPermission(["ADMINISTRATOR"]))
        return message.channel.send("maaf hanya staff aja yang bisa menggunakan command ini!");

      let icon = message.guild.iconURL({ size: 4096, dynamic: true }),
        png = message.guild.iconURL({
          size: 4096,
          dynamic: true,
          format: "png"
        }),
        jpg = message.guild.iconURL({
          size: 4096,
          dynamic: true,
          format: "jpg"
        });
      let ma = await message.channel.send("mememuat icon server");
      setTimeout(() => {
        const embed = new MessageEmbed()
          .setColor("FFB400")
          .setTitle(`**Server Icon:**`)
          .setDescription(`[PNG](${png}), [JPG](${jpg}), [WEBP](${icon})`)
          .setImage(icon)
          .setTimestamp()
          .setFooter("Script by: BlueWolf#0371\n");
        ma.edit("ini icon server nya Onichan:", embed);
      }, 4000);
    } catch (error) {
      return message.author.send(error.message);
    }
  }
  if (command === "unwarn") {
    message.react("👍");
    let user = message.mentions.members.first() || message.author,
      userSet = message.guild.member(user),
      role = message.guild.roles.cache.find(r => r.name === "warn"),
      member = message.guild.members.cache.find(member => member.id === userSet.id);
    try {
      if (!message.member.hasPermission(["ADMINISTRATOR"]))
        return message.reply("kamu tidak ada permission untuk menggunakan command ini!");
      if (!user) return;
      if (!role)
        return message.channel.send("Tolong buat role dengan nama **__warn__**!");
      message.channel
        .send(`berhasil unwarn ${member} dari ${role}!`)
        .then(member.roles.remove(role.id));
    } catch (e) {
      let embed = new MessageEmbed()
        .setColor("RED")
        .setTitle(":x: Error!")
        .setDescription(e)
        .setTimestamp()
        .setFooter("Script by: BlueWolf#0371\n");
      message.channel.send(embed);
    }
  }
  if (command === "warn") {
    message.react("👍");
    let input = args.slice(1).join(" ");
    let user =
        bot.users.cache.get(input) ||
        bot.users.cache.find(x => x.username === input) ||
        message.mentions.members.first() ||
        message.author,
      userSet = message.guild.member(user),
      role = message.guild.roles.cache.find(r => r.name === "warn"),
      member = message.guild.members.cache.find(
        member => member.id === userSet.id
      );
    try {
      if (!message.member.hasPermission(["ADMINISTRATOR"]))
        return message.reply("kamu tidak ada permission untuk commmand ini!");
      if (!user) return;
      if (!role) return message.channel.send("tolong buat role dengan nama: **__warn__**!");
      const embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("warn command")
        .addField(`\`kamu telah memberi warn ke pada:\n${message.mentions.users.first()}\ndengan alasan:\n ${message.content.split(" ").slice(1).join(" ")}\``, true)
        .setTimestamp()
        .setFooter("script by: BlueWolf#0371\n");
      message.author.send(embed).then(member.roles.add(role.id));
      message.channel.send(`berhasil mengasih warn ke: ${member} dengan role ${role}!`);
    } catch (error) {
      return message.author.send(error.message);
    }
  }
  if (command === "nsfw") {
    try {
      if (message.channel.nsfw === false)
        return message.reply("Tolong Buat channel nsfw supaya biar aman!");
      const img = ["https://nekos.life/api/v2/img/lewd"];
      let nsfw = Math.floor(Math.random() * img.length);

      const { body } = await superagent.get(img[nsfw]);

      const embed = new Discord.MessageEmbed()
        .setAuthor("Script by: BlueWolf#0371", message.author.avatarURL)
        .setColor("RANDOM")
        .setImage(body.url)
        .setTimestamp();
      message.channel.send(embed);
    } catch (error) {
      return message.channel.send(error.message);
    }
  }
  if (command === "gay") {
    try {
      const embed = new MessageEmbed()
        .setColor("RANDOM")
        .addField(`:gay_pride_flag: Random Gay\n${Math.floor(Math.random() * 100) + 0}% Gay :gay_pride_flag:`, true)
        .setTimestamp()
        .setFooter("Scrip by: BlueWolf#0371\n");
      message.channel.send(embed);
    } catch (error) {
      return message.channel.send(error.message);
    }
  }
  if (command === "profile-bot" || command === "pb") {
    message.react("775274958729379890");
    const embed = new MessageEmbed()
      .setColor("YELLOW")
      .setAuthor(bot.user.tag, bot.user.displayAvatarURL())
      .setThumbnail(bot.user.displayAvatarURL())
      .setDescription(`Nama Bot:\n${bot.user.tag}\nCreator bot:\nBlueWolf#0371\nStatus bot:\nOnline\nDi buat pada tanggal:\n27/07/2020\nJam pembuatan bot:\n20:00\nCoding yang dipakai:\nglitch.com\nLama pembuatan:\n20 bulan`)
      .addFields(
        {
          name: "jumblah server yang memakai bot:",
          value: `${bot.guilds.cache.size} server`,
          inline: true
        },
        {
          name: "jumblah user yang memakai bot:",
          value: `${bot.users.cache.size} user`,
          inline: true
        },
        {
          name: "jumblah channel yang memakai bot:",
          value: `${bot.channels.cache.size} channel`,
          inline: true
        }
      )
      .setTimestamp()
      .setFooter("Script by: BlueWolf#01371\n");
    message.channel.send(embed);
  }
  if(command === "time") {
    message.react("⌚");
    try {
      const m = await message.channel.send("mengecek time");
      setTimeout(() => {
        const embed = new MessageEmbed()
          .setColor("#FF8401")
          .addField(`:flag_id: Time Zone Indonesia:\n**${timezone().tz("Asia/Jakarta").format("⌚️ HH:mm [WIB]") + " "}**\n**${timezone().tz("Asia/Irkutsk").format("⌚️ HH:mm [WITA]") + " "}**\n**${timezone().tz("Asia/Jayapura").format("⌚️ HH:mm [WIT]") + " "}**`, true)
          .addField(`:flag_us: Time Zone America:\n**${timezone().tz("America/New_York").format("⌚️ HH:mm []") + " "}**\n**${timezone().tz("America/Los_Angeles").format("⌚️ HH:mm []") + " "}**`, true)
          .setTimestamp()
          .setFooter("Scrip by: BlueWolf#0371\n");
        m.edit(`⌚ time:`, embed);
      }, 4000);
    } catch (error) {
      return message.channel.send(error.message);
    }
  }
  if (command === "ping") {
    message.react("📶");
    try {
      const m = await message.channel.send("Mencari ping");
      setTimeout(() => {
        const embed = new Discord.MessageEmbed()
          .setColor("#FF8401")
          .setTitle(":ping_pong: PONG!")
          .addField("🔥 Api", `**${bot.ws.ping}ms!**`)
          .addField("⌛ Latency",`**${m.createdTimestamp - message.createdTimestamp}ms!**`)
          .setTimestamp()
          .setFooter("Scrip by: BlueWolf#0371\n");
        m.edit(`sukses mencari ping`, embed);
      }, 4000);
    } catch (error) {
      return message.channel.send(error.message);
    }
  }
  if (command === "avatar") {
    const input = args.slice(1).join("+");
    const user =
      bot.users.cache.get(input) ||
      bot.users.cache.find(x => x.username == input) ||
      message.mentions.members.first() ||
      message.author;

    let avatar = user.displayAvatarURL({ size: 4096, dynamic: true }),
      png = user.displayAvatarURL({ size: 4096, dynamic: true, format: "png" }),
      jpg = user.displayAvatarURL({ size: 4096, dynamic: true, format: "jpg" }),
      gif = user.displayAvatarURL({ size: 4096, dynamic: true, format: "gif" });

    const embed = new Discord.MessageEmbed()
      .setTitle(`${user.tag} avatar`)
      .setDescription(`[PNG](${png}), [JPG](${jpg}), [WEBP](${avatar}), [GIF]( ${gif})`)
      .setColor("#5FB404")
      .setImage(avatar)
      .setTimestamp()
      .setFooter("Scrip by: BlueWolf#0371\n");
    return message.channel.send(embed);
  }
  try {
    const commandFile = require(`./owner/${command}.js`);
    commandFile.run(bot, message, args, Util);
  } catch(error) {
    
  }
  try {
    const commandFile = require(`./moderator/${command}.js`);
    commandFile.run(bot, message, args);
  } catch(error) {
    
  }
  try {
    const commandFile = require(`./member/${command}.js`);
    commandFile.run(bot, message, args);
  } catch(error) {
    
  }
  try {
    const commandFile = require(`./member/giveaway/${command}.js`);
    commandFile.run(bot, message, args);
  } catch(error) {
    
  }
  try {
  const commandFile = require(`./commands/${command}.js`);
  commandFile.run(bot, message, args);
  } catch(error) {

  }
  try {
    const commandFile = require(`../botconfig/${command}js`);
    commandFile(bot, message, args);
  } catch(error) {
    
  }
  
});
bot.on("guildMemberAdd", member => {
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
bot.on("message", async message => {
  let id = "786861563222163486";
  if (message.channel.id === id) {
    await message.delete();
  }
});
bot.login(TOKEN);