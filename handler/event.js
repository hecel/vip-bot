const { readdirSync } = require("fs");
const ascii = require("ascii-table");

let table = new ascii('Event');
table.setHeading('Event', 'Load status');

module.exports = (bot, Discord) => {
  
    readdirSync(`${process.cwd()}events/`).forEach(dir => {
      
        const commands = readdirSync(`${process.cwd()}/events/`).filter(file => file.endsWith(".js"));
        
        for (let file of commands) {
            let pull = require(`${process.cwd()}/events/${file}`);
            let name = pull.split(".")[0];
            console.log(`File ${file} was loaded`);

            bot.on(name, pull.bind(null, bot, Discord));

            if (pull.name) {
                bot.commands.set(pull.name, pull);
                bot.premiums.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
            //if (pull.premiums && Array.isArray(pull.premiums)) pull.premiums.forEach(premium => bot.premiums.set(premium, pull.name));
        }
    });
    // let channel = bot.channels.cache.get("883668517679927336");

    // if(!channel) return;
    console.log(table.toString());
}