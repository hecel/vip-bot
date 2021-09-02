const Discord = require("discord.js");

module.exports = {
    name: "",
    aliases: [""],
    run: async(bot, message, args) => {
        try {
            if (!message.member.hasPermission(["ADMINISTRATOR"]))
              return message.channel.send("maaf hanya staff aja yang bisa menggunakan command ini!");
      
            let icon = message.guild.iconURL({ size: 4096, dynamic: true }),
              png = message.guild.iconURL({
                size: 4096,
                dynamic: true,
                format: "png"
              }),
              jpg = message.guild.iconURL({
                size: 4096,
                dynamic: true,
                format: "jpg"
              });
            let ma = await message.channel.send("mememuat icon server");
            setTimeout(() => {
              const embed = new MessageEmbed()
                .setColor("FFB400")
                .setTitle(`**Server Icon:**`)
                .setDescription(`[PNG](${png}), [JPG](${jpg}), [WEBP](${icon})`)
                .setImage(icon)
                .setTimestamp()
                .setFooter("Script by: BlueWolf#0371\n");
              ma.edit("ini icon server nya Onichan:", embed);
            }, 4000);
          } catch (error) {
            return message.author.send(error.message);
          }
    }
}