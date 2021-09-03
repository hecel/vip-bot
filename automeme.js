const Discord = require("discord.js");
const webhook = new Discord.WebhookClient("883172820249608192", "5i3_dX1Us_rjIMUwEU8-gLe22lhrDsT_1mEHpn0V9HQD2HJiR7_vQQSYLt9MDbFoHUqR");
const ms = require("ms");
const got = require("got");

module.exports = () => {
    setInterval(function automeme() {
        try {
        const embed = new Discord.MessageEmbed();
        got("https://www.reddit.com/r/meme/random/.json").then(response => {
            let content = JSON.parse(response.body);
            let permaLink = content[0].data.children[0].data.permalink;
            let memeURL = `https://reddit.com/${permaLink}`;
            let memeImage = content[0].data.children[0].data.url;
            let memeTitle = content[0].data.children[0].data.title;
            let memeUpvotes = content[0].data.children[0].data.ups;
            let memeDownvotes = content[0].data.children[0].data.downs;
            let memeNumComments = content[0].data.children[0].data.num_comments;
            
            embed.setTitle(`${memeTitle}`);
            embed.setURL(`${memeURL}`);
            embed.setImage(memeImage);
            embed.setColor("RANDOM");
            embed.setFooter(`👍${memeUpvotes} | 👎${memeDownvotes} | 💬${memeNumComments}`);
            webhook.send(embed);
        });
        } catch (err) {
            let embed = new Discord.MessageEmbed()
            .setTitle(":x: Error!")
            .setDescription(err)
            //.setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setColor("GOLD")
            .setTimestamp()
            //.setFooter("Script by: 𝓦𝓞𝓵𝓕𝓡𝓐𝓓#0371");
            console.log(embed);
        }
    }, ms("5s"));
}