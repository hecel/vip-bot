const { Collection } = require("discord.js");
const antijoin = new Collection();

module.exports = {
    name: "antijoin",
    aliases: ["antjn"],
    run: async(bot, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You don't have permission to usage this command!");
        
        let query = args[1];
        if(!query) return message.channel.send("Please specify a query!");

        const getCollection = bot.antiinvites.get(message.guild.id);
        if(query === "on") {
            if(getCollection) return message.channel.send("Antiinvite is already enabled!").then(m => {
                m.delete({ timeout: 4000});
            });

            bot.antiinvites.set(message.guild.id, true);
            message.channel.send("Turned on antiinvite sytem.");
            // .then(m => {
            //     m.delete({ timeout: 4000});
            // });
        } else if(query === "off") {
            if(!getCollection) return message.channel.send("Antiinvite is already disabled!").then(m => {
                m.delete({ timeout: 10000});
            });

            bot.antiinvites.delete(message.guild.id);
            message.channel.send("Turned off antiinvite sytem.");
            // .then(m => {
            //     m.delete({ timeout: 10000 });
            // });
        }
    }
}