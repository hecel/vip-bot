const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "unmute",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to usage this commands!");
        const user = message.mentions.users.first();
        if(!user) return message.channel.send("Please specify a user");
        const member = message.guild.members.cache.get(user.id);
        var role = message.guild.roles.cache.find(r => r.name === "mute");
        if(!role) return message.channel.send(`I can't find the role ${role}`);
        member.roles.remove(role.id);
        message.channel.send(`Successfully unwarn ${user} with role: **${role}**`);
    }
}