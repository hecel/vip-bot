// const { badword } = require("../data.json");

// module.exports = {
//     name: "badwords",
//     run: async(bot, message, args) => {
//         if(!message.member.hasPermission("ADMINISTRATOR")) {
//             let confirm = false;
//             var i;
//             for(i = 0;i < badword.length; i++) {
//                 if(message.content.toLowerCase().includes(badword[i].toLowerCase())) confirm = true;
//             }
//             if(confirm) {
//                 message.delete();
//                 return message.channel.send("You are not allowed to send badwords here!");
//             }
//         }
//     }
// }