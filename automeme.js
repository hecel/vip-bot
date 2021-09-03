const Discord = require("discord.js");
const webhook = new Discord.WebhookClient("883172820249608192", "5i3_dX1Us_rjIMUwEU8-gLe22lhrDsT_1mEHpn0V9HQD2HJiR7_vQQSYLt9MDbFoHUqR");
const ms = require("ms");
const fetch = require("superagent");

module.exports = () => {
    setInterval(function automeme() {
        let subreddits = [
            "meme",
            "animemes",
            "MemesOfAnime",
            "animememes",
            "AnimeFunny",
            "dankmemes",
            "dankmeme",
            "wholesomememes",
            "MemeEconomy",
            "techsupportanimals",
            "meirl",
            "me_irl",
            "2meirl4meirl",
            "AdviceAnimals",
            "furry"
           ];
          
         const { body } = fetch.get(`https://imgur.com/r/${subreddits[Math.floor(Math.random() * subreddits.length)]}/hot.json`);
        //  const { data } = body;
        //  const meme = data[Math.floor(Math.random() * data.length)];
          
           try {
             
             let embed = new MessageEmbed()
             .setColor("RANDOM")
             .setAuthor(body.title)
             .setDescription(`Score: **${body.score}**\nViews: **${body.views}**`)
             .setTitle(`${body.subreddit}`)
             .setURL(`https://www.reddit.com${body.reddit}`)
             .setImage(`http://imgur.com/${body.hash}${body.ext}`)
             .setTimestamp()
             //.setFooter("Script by: 𝓦𝓞𝓵𝓕𝓡𝓐𝓓#0371\n");
             webhook.send({ embeds: [embed] });
           } catch (err) {
            //  let embed = new MessageEmbed()
            //  .setTitle(":x: Error!")
            //  .setDescription(err)
            //  .setAuthor(message.author.tag, message.author.displayAvatarURL())
            //  .setColor("GOLD")
            //  .setTimestamp()
            //  .setFooter("Script by: 𝓦𝓞𝓵𝓕𝓡𝓐𝓓#0371");
            //  message.channel.send(embed);
           }
    }, ms("5s"));
}