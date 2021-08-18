let config;
try{
  config = require("../botconfig/config.json");
} catch (error) {
  config = null
}

module.exports = {
  name: "restart",
  aliases: ["res"],
  run: async(bot, message, args) => {
  
  const owner = config ? config.owner : process.env.owner;
  
  if(!message.author.id === owner) return message.reply("sorry you not my developer!").then(m => {
    m.delete({
      timeout: 4000
    });
  });
  let me = await message.channel.send("restarting....");
  setTimeout(() => {
    me.edit("💡SUCSES!!!").then(() => {
      process.exit(1);
    });
  }, 4000);
 }
}