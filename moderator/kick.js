module.exports = {
    name: "kick",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]));
        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        let rs = args[2];
        if(!member) return message.channel.send("Please specify a member");
        if(!rs) return message.channel.send("Please specify a reason");
        memberTarget.kick({ reason: rs });
        message.channel.send(`Successfully kicked ${member}`);
    }
}