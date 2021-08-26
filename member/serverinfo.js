const { MessageEmbed } = require("discord.js");
const { Menu } = require("discord.js-menu");
const { ReactionPages } = require("reconlx");
const choice = ["🚫", "📣", "🔰", "📋"];

exports.run = async(bot, message, args) => {
  
    let Guild_Id = message.guild.id;
    let region = message.guild.region;
    let owner = message.guild.owner.user.tag;
    let total = message.guild.memberCount;
    let thumbnail = message.guild.iconURL();
    let role = message.guild.roles.cache.size;
    let totalChannel = message.guild.channels.cache.size;
    let totalEmoji = message.guild.emojis.cache.size;
    let online = message.guild.members.cache.filter(m => m.user.presence.status === "online").size,
        dnd = message.guild.members.cache.filter(m => m.user.presence.status === "dnd").size,
        idle = message.guild.members.cache.filter(m => m.user.presence.status === "idle").size,
        offline = message.guild.members.cache.filter(m => m.user.presence.status === "offline").size;
  
      let embed1 = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle("**__SERVER INFO__**")
        .setThumbnail(thumbnail)
        .addField("owner name:", owner)
        .addField("**__INFO EMOJI__**", `\`📣: Main pages.\n🔰: region\n📋: total.\``);
      let embed2 = new MessageEmbed()
      .setColor("YELLOW")
      .addField("region:", region)
      .addField("server id:", Guild_Id)
      .addField("total member:", total)
      .addField("total channel:", totalChannel);
      let embed3 = new MessageEmbed()
      .setColor("YELLOW")
      .addField("total emoji:", totalEmoji)
      .addField("total role:", role)
      .addField("member online", online)
      .addField("member dnd", dnd)
      .setColor("YELLOW")
      .addField("member idle:", idle)
      .addField("member offline", offline)
      .setTimestamp()
      .setFooter("Script by: BlueWolf#0371\n");
  
// new Menu(message.channel, message.author.id, [
//     {
//       name: "main",
//       content: embed,
//       reactions: {
//         "⚫": "stop",
//         "▶": "next"      
//       }
//     },
//     {
//       name: "otherPage",
//       content: embed1,
//       reactions: {
//         "⚫": "stop",
//         "↩": "previous",
//         "▶": "next"
//       }
//     },
//     {
//       name: "otherPage",
//       content: embed2,
//       reactions: {
//         "⚫": "stop",
//         "↩": "previous",
//         "▶": "next"
//       }
//     },
//     {
//       name: "otherPage",
//       content: embed3,
//       reactions: {
//         "⚫": "stop",
//         "↩": "previous"
//       }
//     }
//   ]);
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

          case "📣":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed1);
            break;

          case "🔰":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed2);
            break;

          case "📋":
            reaction.users.remove(user).catch(console.error);
            m.edit(embed3);
            
            collector.stop();
            break;
            
          default:
            reaction.users.remove(user).catch(console.error);
            break;
        }
      });
}