const Discord = require("discord.js");

module.exports = {
    name: "ramal",
    aliases: ["rm"],
    run: async(bot, message, args) => {
        try {
            let pertanyaan = message.content.split(" ").slice(1).join(" ");
            let jawaban = [
              "no",
              "yes",
              "possible",
              "it could be",
              "error",
              "who knows",
              "forget"
            ];
            let m = await message.channel.send("is fortune-telling...");
            setTimeout(() => {
              const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle("**🔮Magic ball🔮**")
                .addField("Question:", `**${pertanyaan}**`)
                .addField("Answer:",`**${jawaban[Math.floor(Math.random() * jawaban.length)]}**`)
                .setTimestamp()
                .setFooter("Script by: BlueWolf#0371\n");
              m.edit("berhasil meramal!", embed).then(ramal => {
                ramal.react(emoji1);
                ramal.react(emoji2);
              });
            }, 4000);
          } catch (error) {
            return message.channel.send(error.message);
          }
    }
}