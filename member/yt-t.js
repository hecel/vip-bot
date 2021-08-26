const fetch = require("node-fetch");

module.exports = {
    name: "yt-t",
    run: async(bot, message, args) => {

        let channel = message.member.voice.channel;
        if(!channel) return message.channel.send("You have to be in a vc");

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 0,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${bot.token}`,
                "content-type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if(!invite.code) return message.channel.send("Sadly i cant start a yt together");
            message.channel.send(`https://discord.com/invite/${invite.code}`);
        });
    }
}