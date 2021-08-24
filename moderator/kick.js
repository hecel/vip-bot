module.exports = {
    name: "kick",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]));
        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        let reason = args[1];
        if(!member) return message.channel.send("Please specify a member");
        if(!reason) return message.channel.send("Please specify a reason");
        memberTarget.kick({ reason: reason });
    }
}