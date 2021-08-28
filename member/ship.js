const Discord = require("discord.js");

module.exports = {
    name: "ship",
    run: async(bot, message, args) => {
        let user = message.mentions.users.first();
        if(!user) return message.channel.send("Please mentions a user to ship");

        let r = Math.floor(Math.random() * 100) + 1;

        const unLove = Discord.MessageEmbed()
        .setTitle("This isn\'t a match")
        .setThumbnail("https://cdn.discordapp.com/attachments/824906735176253450/828554687229067275/images.png")
        .setDescription(`${message.author} shipped with ${user} and it is`)
        .setColor("RANDOM")
        .setTimestamp();

        const love = Discord.MessageEmbed()
        .setTitle("They are born for each others")
        .setThumbnail("https://cdn.discordapp.com/attachments/824906735176253450/828555115593859123/9k.png")
        .setDescription(`${message.author} shipped with ${user} and it is`)
        .setColor("RANDOM")
        .setTimestamp();

        if(r > 50) {
            message.channel.send(love);
        } else {
            message.channel.send(unLove);
        }
    }
}