const bot = require("../index").bot;
const prefix = require("../util/main");


bot.on("message", async(message) => {
    if (message.author.bot || message.channel.type === "dm") return;
    if (!message.content.startsWith(prefix)) return;
    if (message.content === `<@${bot.user.id}>` || message.content === `<@!${bot.user.id}>`) {
      message.channel.send(`${message.author} My Prefix is ${message.prefix}`).then(m => {
        m.delete({ timeout: 4000 });
      });
  }
    //sistem args
   const args = message.content.split(" ");
    
    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(prefix.length);
    message.prefix = prefix;
    
   // bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
    
    const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
  //   const cmds = bot.premiums.get(command) || bot.premiums.find(cmds => cmds.premiums && cmds.premiums.includes(command));
  //   cmd = cmds;
    if(cmd) {
     cmd.run(bot, message, args);
    } else return;
    console.log(`${message.author.tag} menggunakan command ${prefix}${command}`, `message ini dari: ${message.guild.name}`);
    try {
      const commandFile = require(`../commands/owner/${command}.js`);
      commandFile.run(bot, message, args, Util);
    } catch(error) {
      
    }
    try {
      const commandFile = require(`../commands/moderator/${cmd}.js`);
      commandFile.run(bot, message, args);
    } catch(error) {
      
    }
    try {
      const commandFile = require(`../commands/member/${cmd}.js`);
      commandFile.run(bot, message, args);
    } catch(error) {
      
    }
    try {
      const commandFile = require(`../commands/giveaway/${cmd}.js`);
      commandFile.run(bot, message, args);
    } catch(error) {
      
    }
  //   try {
  //   const commandFile = require(`./commands/${command}.js`);
  //   commandFile.run(bot, message, args);
  //   } catch(error) {
  
  //   }
  //   try {
  //     const commandFile = require(`../botconfig/${command}js`);
  //     commandFile(bot, message, args);
  //   } catch(error) {
      
  //   }
  });