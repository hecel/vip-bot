const Discord = require("discord.js");

module.exports = {
    name: "gay",
    aliases: ["gay"],
    run: async(bot, message, args) => {
        try {
            const embed = new MessageEmbed()
              .setColor("RANDOM")
              .addField(`:gay_pride_flag: Random Gay\n${Math.floor(Math.random() * 100) + 0}% Gay :gay_pride_flag:`, true)
              .setTimestamp()
              .setFooter("Scrip by: BlueWolf#0371\n");
            message.channel.send(embed);
          } catch (error) {
            return message.channel.send(error.message);
          }
    }
}