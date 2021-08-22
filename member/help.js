const Discord = require("discord.js");
const { ReactionPages } = require("reconlx");
const choice = ["🚫", "👑", "⚜️", "🎮", "🔧", "🎉", "⚖️", "⚙️"];

exports.run = async(bot, message, args) => {
  
  const embed1 = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setAuthor(message.author.tag, message.author.displayAvatarURL())
  .setThumbnail(bot.user.displayAvatarURL({ format: "png", dynamic: true }) + "?size=2048")
  .setDescription("**__HELP COMMANDS__**")
  .addField(`PREFIX: **__${message.prefix}__**`, true)
  .addField("**__INFO EMOJI__**", `\`👑: Owner.\n⚜️: Core.\n🎮: Game.\n🔧: Moderator.\n🎉: Giveaway.\n⚖️: Hangman.\``);

  const embed2 = new Discord.MessageEmbed()
  .setTitle("**__DEVELOPER__**")
  .addField(`restart\nreload\nls\neval`, true)
  .setColor("BLUE");

  const embed3 = new Discord.MessageEmbed()
  .setTitle("**__CORE__**")
  .addField(`instagram\nsay\nping\navatar\ninvite\nreport-bug\nuserinfo\nmemberinfo\nserverinfo\nsy\nirl\ndiscord\nch\nyt\nnonolive\ngoogle\nbrainly\nmeme\ncovid\nsnipe\nascii\ncalculator\nmath`, true)
  .setColor("BLUE");

  const embed4 = new Discord.MessageEmbed()
  .setTitle("**__GAME__**")
  .addField(`gay\nnsfw\nramal\nputin\nwanted\nrip\npp\nejected\nmeeting`,true)
  .setColor("BLUE");

  const embed5 = new Discord.MessageEmbed()
  .setTitle("**__MODERATOR__**")
  .addField(`kick\nban\nchannel-delete\nservericon\nwarn\nunwarn\nmute\nunmute\nnuke\ncc\ncn\nsetprefix\nsetnick\nslowmode\nlock\nunlock`,true)
  .setColor("BLUE");

  const embed6 = new Discord.MessageEmbed()
  .setTitle("**__GIVEAWAYS__**")
  .addField(`gstart\ngend\ngedit\ngdelete\ngreroll`,true)
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
          
          case "🚫":
            reaction.users.remove(user).catch(console.error);
            m.delete();
            break;

          case "👑":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed2);
            break;

          case "⚜️":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed3);
            break;

          case "🎮":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed4);
            break;

          case "🔧":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed5);
            break;
        
          case "🎉":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed6);
            break;

          case "⚖️":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed7);
            break;

          case "⚙️":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed8);
            break;

          collector.stop();
          break;
            
          default:
            reaction.users.remove(user).catch(console.error);
            break;
        }
      });
}