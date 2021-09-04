const bot = require("../index").bot;

bot.on("messageUpdate", async(oldMessage, message) => {
    bot.edits.set(message.channel.id, {
        content: message.content,
        author: message.author,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });
  //ghost pings
  if(oldMessage.mentions.users.first()) {
    let channel = bot.channels.cache.get("864049509306335243");

    if(!channel) return;
    
    const embed = new MessageEmbed()
    .setTitle("Ghost ping")
    .setColor("RED")
    .setDescription(`${oldMessage.author} ghost pings: ${oldMessage.mentions.users.first()}\nmessage ini dari: ${oldMessage.guild}`)
    .setTimestamp();
    return channel.send(embed);
  }
});