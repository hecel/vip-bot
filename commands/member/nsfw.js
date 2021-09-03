// const Discord = require("discord.js");

// module.exports = {
//     name: "nsfw",
//     aliases: ["18+"],
//     run: async(bot, message, args) => {
//         try {
//             if (message.channel.nsfw === false)
//               return message.reply("Please create an nsfw channel to keep it safe!");
//             const img = ["https://nekos.life/api/v2/img/lewd"];
//             let nsfw = Math.floor(Math.random() * img.length);
      
//             const { body } = await superagent.get(img[nsfw]);
      
//             const embed = new Discord.MessageEmbed()
//               .setAuthor("Script by: BlueWolf#0371", message.author.avatarURL)
//               .setColor("RANDOM")
//               .setImage(body.url)
//               .setTimestamp();
//             message.channel.send(embed);
//           } catch (error) {
//             return message.channel.send(error.message);
//           }
//     }
// }