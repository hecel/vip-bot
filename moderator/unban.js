module.exports = {
    name: "kick",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You dont have permission to run this command!");
        const member = args.slice(1).join(" ");
        const memberTarget = message.guild.members.cache.get(member.id);
        let rs = args.slice(2).join(" ");
        if(!member) return message.channel.send("Please specify a member");
        memberTarget.unban();
        member.send(`You has been unbaned`);
        message.channel.send(`Successfully unbaned ${member}`);
    }
}