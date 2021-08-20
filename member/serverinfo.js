const { MessageEmbed } = require("discord.js");
const { Menu } = require("discord.js-menu");

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
      let embed2 = new MessageEmbed()
      .setColor("YELLOW")
      .addField("region:", region)
      .addField("server id:", Guild_Id)
      .addField("total member:", total)
      .addField("total channel:", totalChannel)
      let embed3 = new MessageEmbed()
      .setColor("YELLOW")
      .addField("total emoji:", totalEmoji)
      .addField("total role:", role)
      .addField("member online", online)
      .addField("member dnd", dnd)
      let embed4 = new MessageEmbed()
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
const pages = [embed1, embed2, embed3, embed4];
  ReactionPages(message, pages, false);
}