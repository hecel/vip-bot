const { readdirSync } = require("fs");
const ascii = require("ascii-table");

let table = new ascii('Commands');
table.setHeading('Command', 'Load status');

module.exports = (bot) => {
  
    readdirSync(`${process.cwd()}/commands/`).forEach(dir => {
      
        const commands = readdirSync(`${process.cwd()}/commands/${dir}/`).filter(file => file.endsWith(".js"));
        
        for (let file of commands) {
            let pull = require(`${process.cwd()}/commands/${dir}/${file}`);
            console.log(`File ${file} was loaded`);

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
    let channel = bot.channels.cache.get("883668517679927336");

    if(!channel) return;

    channel.send(table.toString());
}