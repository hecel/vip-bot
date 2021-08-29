const Discord = require("discord.js");

module.exports = {
    name: "pp",
    run: async(bot , message, args) => {
        let user = message.mentions.users.first() || message.author;
        let rm = `${Math.floor(Math.random() * "=".length) + "D"}`;

        const embed = new Discord.MessageEmbed()
        .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
        .addField(`${user} pp:`, rm)
        .setColor("RANDOM")
        .setTimestamp();
        message.channel.send(embed);
    }
}