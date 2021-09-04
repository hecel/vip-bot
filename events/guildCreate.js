module.exports = (guild) => {
    let ch;
    guild.channels.cache.forEach((channel) => {
        if(channel.type === "text" && !ch && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) ch = channel;
    });
    if(!ch) return;

    const embed = new MessageEmbed()
    .setAuthor(`Hello!, Thank you for inviting me to ${guild.name}`)
    .setColor("#00fdfd")
    .setDescription(`My prefix is **${prefix}**`)
    .addField("need help?", "Take a look at my developers!")
    //.addField("join my developer's existing server!", "[join](https://discord.gg/zuVYHJfaHC)")
    .setTimestamp();
    ch.send(embed).catch(e => {
        if(e) return;
    });
}