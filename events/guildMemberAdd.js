module.exports = (bot, member) => {
    const getCollection = bot.antijoins.has(member.guild.id);
    if(!getCollection) return;
    // if(!bot.antijoins.includes(member.user)) {
    //     bot.antijoins.push(member.user);
    // }
    if(bot.antijoins.get(member.guild.id)) {
        if(!member.guild.me.permissions.has("KICK_MEMBERS")) return;
        try {
            await member.user.send(`You have been kicked with reason: **Antijoin was enabled**`);
        } catch {

        }
        await member.kick("Antijoin was enabled");
    }

    let guild = member.guild;
    let server = guild.name;
    let total = guild.memberCount;
    let channel = member.guild.channels.cache.find(ch => ch.name === "logs");
    let role = member.guild.roles.cache.find(r => r.name === "member");
    if (!channel) return;
    if (!role) return;
    const embed = new MessageEmbed()
      .setColor("GREEN")
      .setTitle("Welcome!")
      .setDescription(`Asik ${member} join, sekarang member ada: ${total} member`)
      .setTimestamp()
      .setFooter("script by: BuleWolf#0371\n");
    channel.send(embed).then(member.roles.add(role.id));
  };