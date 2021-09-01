module.exports = {
    name: "kick",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have permission to run this command!");
        const member = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(member.id);
        let rs = args.slice(2).join(" ");
        if(!member) return message.channel.send("Please specify a member");
        if(!rs) return message.channel.send("Please specify a reason");
        memberTarget.kick(rs);
        member.send(`You has been kicked for reason: ${rs}`);
        message.channel.send(`Successfully kicked ${member} with reason: ${rs}`);
    }
}