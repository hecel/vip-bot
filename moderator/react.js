const Discord = require("discord.js");

module.exports = {
    name: "react",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have permission **ADMINISTRATOR**");

        let roles = message.mentions.roles.first();
        if(!roles) return message.channel.send("Please mentions a roles to get added");

        const embed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("RANDOM")
        .setDescription(`React with ✅ to get the role ${roles}`)
        .setTimestamp();
        let msg = await message.channel.send(embed);

        await msg.react("✅");

        const filter = (reaction, user) => ["✅"].includes(reaction.emoji.name);
        const collector = msg.createReactionCollector(filter, { dispose: true });

        collector.on("remove", (reaction, user) => {
            if(user.bot) return;

            let member = reaction.message.guild.members.cache.find(member => member.id === user.id);

            member.roles.remove(roles.id);
        });
        collector.on("collect", (reaction, user) => {
            if(user.bot) return;

            let member = reaction.message.guild.members.cache.find(member => member.id === user.id);

            member.roles.add(roles.id);
        });
    }
}