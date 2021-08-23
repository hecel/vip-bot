const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'snipe',
  run: async(bot, message, args) => {
    
 let msg = bot.edits.get(message.channel.id);
 if(!msg) return message.channel.send({embed: { description: `There's nothing to edit!`, color: "RED"}}).then(m => {
   m.delete({ timeout: 4000 });
 });
    
let user = message.author;
    
const embed = new MessageEmbed()
.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
.setDescription(msg.content)
.setColor("GOLD")
.setImage(msg.image)
.setTimestamp();
message.channel.send(embed);
  }
}