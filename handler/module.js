const { readdirSync } = require('fs');
const ascii = require('ascii-table');

let table = new ascii('Commands');
table.setHeading('Command', 'Load status');

module.exports = (bot) => {
  
  readdirSync(`${process.cwd()}/member/`).forEach(dir => {
      
        const commands = readdirSync(`${process.cwd()}/members/${dir}/`).filter(file => file.endsWith(".js"));
        
        for (let file of commands) {
            let pull = require(`${process.cwd()}/members/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });

    console.log(table.toString());
}