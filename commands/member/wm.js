const {MessageButton} = require("discord-buttons");

module.exports = {
  name: "wikipedia-minecraft",
  aliases: ["wm"],
  run: async(bot, message, args) => {
    
    let search = args.slice(1).join("+");
    let link = `https://minecraftid.fandom.com/id/wiki/${search}`;
    if(!search) return message.channel.send("please provide a valid youtuber");
    
    const button = new MessageButton()
    .setStyle("url")
    .setURL(link)
    .setLabel("click here to see link");
    
    const m = await message.channel.send("click here to see youtuber info:", button);
    
    const collector = m.createButtonCollector((button) => {
      button.clicker.user.id === message.author.id, { time: 600000, max: 1000 }
    });
    collector.on("collect", (c) => {
      
      console.log(c.id);
      
      c.defer();
      
      collector.stop();
      
    });
  }
}