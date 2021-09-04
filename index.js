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
//const automeme = require("./automeme");
//const timeSpan = ms("2 days");
//require("discord-buttons")(bot);

const { TOKEN, developer } = require("./util/main");
const { get } = require("node-superfetch");

app.get("/", (req, res) => {
  console.log("ping");
  res.sendStatus(200);
});

app.listen(process.env.PORT);

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
//bot.antiinvites = new Collection();
["module", "event"].forEach(handler => {
    require(`./handler/${handler}`)(bot, Discord);
});
bot.on("messageDelete", function(message, channel) {
    
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
bot.login(TOKEN);