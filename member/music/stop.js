const distube = require("distube");

module.exports = {
    name: "stop",
    run: async(bot , message, args) => {
        let user = message.guild.members.cache.get(bot.user.id);
        if(!message.member.voice.channel) return message.channel.send("You are not in a voice channel!");
        if(user.voice.channel !== message.member.voice.channel) return message.channel.send("You are not in the same voice channel as the bot!");

        distube.stop(message).then(() => {
            message.channel.send(`#${message.author.tag} has stop the music.`);
        });
    }
}