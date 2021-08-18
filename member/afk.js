const { MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
  name : 'afk',
  run : async(bot, message, args) => {
    const content = args.slice(1).join(" ")
    if(!content) return message.channel.send("please provide a reason.");

    await db.set(`afk-${message.author.id}+${message.guild.id}`, content);
    const embed = new MessageEmbed()
    .setDescription(`I set you AFK **Reason :** ${content}`)
    .setColor("GOLD")
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic : true }))
    .setTimestamp()
    .setFooter("script by: BlueWolf#0371");
    message.channel.send(embed);    
  }
}