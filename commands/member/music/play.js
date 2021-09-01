const distube = require("distube");

module.exports = {
    name: "play",
    run: async(bot, message, args) => {
        if(!message.member.voice.channel) return message.channel.send("You are not in a voice channel!");
        if(!args[1]) return message.channel.send("You most state someting to play...");

        distube.play(message, args.join(" "));
    }
}