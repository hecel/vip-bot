let config;
try {
  config = require("../botconfig/config.json");
} catch(error) {
  config = null
}

module.exports = {
  name: "reload",
  description: "reload for all file",
  aliases: ["rl"],
  run: async(bot, message, args) => {
    
    const owner = config ? config.owner : process.env.owner;
    if(!message.author.id === owner) return message.channel.send("sorry, you don't my developer.");

    bot.commands.sweep(() => true);
    glob(`${__dirname}/../**/*.js`, async(err, filePaths) => {
        if(err) return console.log(err);
        filePaths.forEach((file) => {
            delete require.cache[require.resolve(file)];

            const pull = require(file);

            if(pull.name) {
                console.log(`Reloaded ${pull.name} (cmd)`);
                bot.commands.set(file.name, pull);
            }
            if(pull.aliases && Array.isArray(pull.aliases)) {
                pull.aliases.forEach((alias) => {
                    bot.aliases.set(alias, pull.name);
                });
            }
            message.channel.send("Relloaded Commands");
        });
    });
    
    // if(!args[1]) return message.channel.send("please input a category.").then(m => {
    //   m.delete({ timeout: 4000 });
    // });
    // if(!args[2]) return message.channel.send("please input a command name.").then(m => {
    //   m.delete({ timeout: 4000 });
    // });
    // let category = args[1].toLowerCase();
    // let command = args[2].toLowerCase();
    
    // try {
    //   delete require.cache[require.resolve(`/app/${category}/${command}.js`)];
    //   bot.commands.delete(command);
      
    //   const pull = require(`/app/${category}/${command}.js`);
    //   bot.commands.set(command, pull);
      
    //   message.channel.send(`Done reloading **${command}.js**`);
    // } catch(error) {
    //   message.channel.send(`Error reloading **${command}.js**: \`${error.message}\``);
    // }
  }
}