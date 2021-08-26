const fetch = require("node-fetch");
let config;
try {
    config = require("../botconfig/config.json");
} catch(err) {
    config = null;
}

module.exports = {
    name: "yt-t",
    run: async(bot, message, args) => {

        let channel = message.member.voice.channel;
        if(!channel) return message.channel.send("You have to be in a vc");

        let token = config ? config.TOKEN : process.env.TOKEN;

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${token}`,
                "content-type": "application/json"
            }
        }).then(res => res.json()).then(invite => {
            if(!invite.code) return message.channel.send("Sadly i cant start a yt together");
            message.channel.send(`https://discord.com/invite/${invite.code}`);
        });
    }
}