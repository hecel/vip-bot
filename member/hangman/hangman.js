const { hangman } = require("reconlx");

module.exports = {
    name: "hangman",
    run: async(bot, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!channel) return message.channel.send("Please specify a channel.");

        const word = args.slice(2).join(" ");
        if(!word) return message.channel.send("Please specify a word to guess");

        const hang = new hangman({
            message: message,
            word: word,
            client: bot,
            channelID: channel.id,
            permission: "MANAGE_MESSAGES"
        });
        hang.start();
    }
}