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

bot.snipes = new Map();
bot.edits = new Map();
bot.commands = new Collection();
bot.aliases = new Collection();
bot.events = new Collection();
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
    require(`./handler/${handler}`)(bot);
});
["ready", "messageUpdate", "messageDelete", "message", "guildMemberRemove", "guildMemberAdd", "guildCreate", "messageReactionAdd"].forEach(event => {
    require(`./events/${event}`)(bot, Discord);
});

module.exports.bot = bot;

bot.login(TOKEN);