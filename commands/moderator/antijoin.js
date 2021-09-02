const { Collection } = require("discord.js");
const antijoin = new Collection();

module.exports = {
    name: "antijoin",
    aliases: ["anti"],
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to usage this command!");
        
        let query = args[1];
        if(!query) return message.channel.send("Please specify a query!");

        const getCollection = bot.antijoins.get(message.guild.id);
        if(query === "on") {
            if(getCollection) return message.channel.send("Antijoin is already enabled!").then(m => {
                m.delete({ timeout: 4000});
            });

            bot.antijoins.set(message.guild.id, true);
            message.channel.send("Turned on antijoin sytem.");
            // .then(m => {
            //     m.delete({ timeout: 4000});
            // });
        } else if(query === "off") {
            if(!getCollection) return message.channel.send("Antijoin is already disabled!").then(m => {
                m.delete({ timeout: 10000});
            });

            bot.antijoins.delete(message.guild.id);
            message.channel.send("Turned off antijoin sytem.");
            // .then(m => {
            //     m.delete({ timeout: 10000 });
            // });
        } else if(query === "list") {
            if(!getCollection) return message.channel.send("Antijoin is enabled!");
            message.channel.send(`Kicked member: ${getCollection.map(value => { return `${value.tag} (${value.id})`})}`);
        }
    }
}