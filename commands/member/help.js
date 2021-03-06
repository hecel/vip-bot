const Discord = require("discord.js");
const { ReactionPages } = require("reconlx");
const choice = ["š«", "š£", "š", "āļø", "š®", "š§", "š"];

module.exports = {
    name: "help",
    aliases: ["h"],
    run: async(bot, message, args) => {
  
  const embed1 = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setThumbnail(bot.user.displayAvatarURL({ format: "png", dynamic: true }) + "?size=2048")
  .setDescription("**__HELP COMMANDS__**")
  .addField(`PREFIX: **__${message.prefix}__**`, true)
  .addField("**__INFO EMOJI__**", `\`š£: Prefix\nš: Owner.\nāļø: Core.\nš®: Game.\nš§: Moderator.\nš: Giveaway.\``);

  const embed2 = new Discord.MessageEmbed()
  .addField("**__DEVELOPER__**", `restart\nreload\nls\neval`)
  .setColor("BLUE");

  const embed3 = new Discord.MessageEmbed()
  .addField("**__CORE__**", `say\nping\navatar\nruserinfo\nmemberinfo\nserverinfo\ncovid\nsnipe\nweather\ntranslate`)
  .setColor("BLUE");

  const embed4 = new Discord.MessageEmbed()
  .addField("**__GAME__**", `gay\nputin\nwanted\nrip\nyt-t\nship\nakinator\nhangman`)
  .setColor("BLUE");

  const embed5 = new Discord.MessageEmbed()
  .addField("**__MODERATOR__**", `kick\nban\nchannel-delete\nservericon\nwarn\nunwarn\nmute\nunmute\nnuke\nsetnick\nslowmode\nlock\nunlock\nantijoin`)
  .setColor("BLUE");

  const embed6 = new Discord.MessageEmbed()
  .addField("**__GIVEAWAYS__**", `gstart\ngend\ngedit\ngdelete\ngreroll`)
  .setColor("BLUE")
  .setTimestamp(); 
//   const pages = [embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8];
//   ReactionPages(message, pages, false);
  const m = await message.channel.send(embed1);
    for (const chot of choice) {
      await m.react(chot);
    }
      const filter = (rect, usr) => usr.id !== message.client.user.id;
      var collector = m.createReactionCollector(filter, { time: 600000, max: 1000 });
        collector.on("collect", (reaction, user) => {
        switch(reaction.emoji.name) {
          
          case "š«":
            reaction.users.remove(user).catch(console.error);
            m.delete();
            break;

          case "š£":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed1);
            break;

          case "š":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed2);
            break;

          case "āļø":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed3);
            break;

          case "š®":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed4);
            break;

          case "š§":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed5);
            break;
        
          case "š":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed6);

          collector.stop();
          break;
            
          default:
            reaction.users.remove(user).catch(console.error);
            break;
        }
      });
    }
}