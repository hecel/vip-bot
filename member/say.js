module.exports = {
    name: "say",
    run: async(bot, message, args) => {
        await message.delete();
        let kata = args[1];
        if(!kata) return message.channel.send("please specify the word");
        message.channel.send(kata);
    }
}