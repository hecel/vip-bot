// const Discord = require("discord.js");

// module.exports = {
//     name: "sumbit",
//     run: async(bot, message, args) => {
//         let channel = bot.channels.cache.get("784242772894416966");
//         if(!channel) return;
//         let developer = message.author;
//         let tag = args[1];
//         let id = tag.id;
//         let prefix = args[3];
//         let link = `https://discord.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=0`;

//         const embed = new Discord.MessageEmbed()
//         .setTitle("**New Submissions**")
//         .addField("Bot Author:", developer)
//         .addField("Bot Discriminator:", tag)
//         .addField("Bot Prefix:", prefix)
//         .addField("**Invite:**", link)
//         .setThumbnail(id.user.tag, id.user.displayAvatarURL({ dynamic: true }))
//         .setColor("GREEN")
//         .setAuthor(developer.tag, developer.displayAvatarURL({ dynamic: true }))
//         .setTimestamp();
//         channel.send(embed);
//     }
// }