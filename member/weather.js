const weather = require("weather-js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "weather",
    run: async(bot, message, args) => {
        //if(!wea) return message.channel.send("Please specify a weather");
        weather.find({ search: args.join(" "), degreeType: `C` }, function(error, result) {

            const embed = new MessageEmbed()
            .setTitle("Please specify a location")
            .setColor("PURPLE")
            .setTimestamp();
            if(!args[0]) return message.channel.send(embed);

            const embed = new MessageEmbed()
            .setTitle("Invalid location")
            .setColor("PURPLE")
            .setTimestamp();
            if(result === undefined || result.length === 0) return message.channel.send(embed);

            let current = result[0].current;
            let location = result[0].location;

            message.channel.send("Getting weather info...").then(m => {

                const embed = new MessageEmbed()
                .setAuthor(`current weather for ${current.observationpoint}`)
                .setThumbnail(current.imgurl)
                .setDescription(`**${current.skytext}**`)
                .addField(`Timezone:`, `UTC ${location.timezone}`, true)
                .addField(`Degree Type:`, `celcius`, true)
                .addField(`Temperature:`, `${current.temperature}°`, true)
                .addField(`Wind:`, `${current.widdisplay}`, true)
                .addField(`Feels Like:`, `${current.feelslike}`, true)
                .addField(`Humidty:`, `${current.humidty}`, true)
                .setColor("GREEN")
                .setTimestamp();

                m.edit(embed);
            });
        });
    }
}