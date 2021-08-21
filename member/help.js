const Discord = require("discord.js");
const { ReactionPages } = require("reconlx");
const choice = ["🚫"];

exports.run = async(bot, message, args) => {
  
  const embed1 = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setThumbnail(bot.user.displayAvatarURL({ format: "png", dynamic: true }) + "?size=2048")
  .setDescription("**__HELP COMMANDS__**")
  .addField(`PREFIX: **__${message.prefix}__**`, true);

  const embed2 = new Discord.MessageEmbed()
  .setTitle("**__DEVELOPER__**")
  .addField(`\`restart, reload, ls, eval\``, true)
  .setColor("BLUE");

  const embed3 = new Discord.MessageEmbed()
  .setTitle("**__CORE__**")
  .addField(`\`instagram, say, ping, avatar, invite, report-bug, userinfo, memberinfo, serverinfo, sy, irl, discord, ch, yt, nonolive, google, brainly, meme, covid, snipe, ascii, calculator, math\``, true)
  .setColor("BLUE");

  const embed4 = new Discord.MessageEmbed()
  .setTitle("**__GAME__**")
  .addField(`\`gay, nsfw, ramal, putin, wanted, rip, pp, ejected, meeting\``,true)
  .setColor("BLUE");

  const embed5 = new Discord.MessageEmbed()
  .setTitle("**__MODERATOR__**")
  .addField(`\`kick, ban, channel-delete, servericon, warn, unwarn, mute, unmute, nuke, cc, cn, setprefix, setnick, slowmode, lock, unlock\``,true)
  .setColor("BLUE");

  const embed6 = new Discord.MessageEmbed()
  .setTitle("**__GIVEAWAYS__**")
  .addField(`\`gstart, gend, gedit, gdelete, greroll\``,true)
  .setColor("BLUE");

  const embed7 = new Discord.MessageEmbed()
  .setTitle("**__HANGMAN__**")
  .addField(`\`hangman\``)

  const embed8 = new Discord.MessageEmbed()
  .setTitle("**__TOTAL COMMANDS__**")
  .addField(`\`55 COMMANDS\``, true)
  .setColor("BLUE")
  .setTimestamp()
  .setFooter("Scrip by: BlueWolf#0371\n");
  
  const pages = [embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8];
  ReactionPages(message, pages, false);
}