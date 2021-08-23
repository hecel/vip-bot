module.exports = {
    name: "say",
    run: async(bot, message, args) => {
        let kata = args[1];
        message.channel.send(kata);
    }
}