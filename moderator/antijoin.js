const Discord = require("discord.js");
const { antijoin } = new Discord.Collector();

module.exports = {
    name: "antijoin",
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to usage this command!");
        
        let query = args[2];
        if(!query) return message.channel.send("Please specify a query!");

        const getCollection = antijoin.get(message.guild.id);
        if(query === "on") {
            if(getCollection) return message.channel.send("Antijoin is already enabled!").then(m => {
                m.delete({ timeout: 4000});
            });

            antijoin.set(message.guild.id, []);
            message.channel.send("Turned on antijoin sytem.").then(m => {
                m.delete({ timeout: 4000});
            });
        } else if(query === "off") {
            if(!getCollection) return message.channel.send("Antijoin is already disabled!").then(m => {
                m.delete({ timeout: 4000});
            });

            antijoin.delete(message.guild.id);
            message.channel.send("Turned off antijoin sytem.").then(m => {
                m.delete({ timeout: 4000 });
            });
        } else if(qury === "list") {
            message.channel.send(`Kicked member: ${getCollection.map(value => { return `${value.tag} (${value.id})`})}`);
        }
    }
}