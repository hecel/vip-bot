const Discord = require("discord.js");

exports.run = async (bot, message, args) => {
  
  try {
  // You can make a single array to detect the user permissions.
  if (!message.member.hasPermission("MANAGE_GUILD", "ADMINISTRATOR")) {
    return message.channel.send({embed: {color: "RED", description: "You can't use this command!"}});
  }
  
  let nick = args.slice(2).join(" ");
  let user = message.mentions.users.first() || message.author;
  
  if (!user) return message.channel.send({embed: {color: "RED", description: "You need to input the user."}}).then(m => {
    m.delete({ timeout:4000 });
  });
  if (!nick) return message.channel.send({embed: {color: "RED", description: "You need to input the nickname."}}).then(m => {
    m.delete({ timeout:4000 });
  });
  
  let member = message.guild.members.cache.get(user.id);
  
  await member.setNickname(nick);
  return message.channel.send({embed: {color: "GREEN", description: `Successfully changed **${user.tag}** nickname to **${nick}**`}});
 } catch (e) {
  return message.channel.send(e);
 }
}

exports.help = {
  name: "setnickname",
  description: "Set a user nickname.",
  usage: "setnickname <@user> <nick>",
}

exports.conf = {
  aliases: ["setname"],
  cooldown: 5
}