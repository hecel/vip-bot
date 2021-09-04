const bot = require("../index").bot;

bot.on("ready", async() => {
    console.log("bot sudah online");
    
    bot.user.setStatus("dnd");
    //automeme();

    function time() {
        let waktu = bot.channels.cache.get("878427894332936203");
        waktu.setName(`${timezone().tz("Asia/Jakarta").format("⌚ HH:mm [WIB]") + " "}`);
        let waktu1 = bot.channels.cache.get("878430437884723210");
        waktu1.setName(`${timezone().tz("Asia/Irkutsk").format("⌚ HH:mm [WIT]") + " "}`);
        let waktu2 = bot.channels.cache.get("878430913548124270");
        waktu2.setName(`${timezone().tz("Asia/Jayapura").format("⌚ HH:mm [WITA]") + " "}`);
    }
    setInterval(time, 10000);

    function randomStatus() {
        let s = [
          `🎥| My prefix ${PREFIX}`,
          `🎥| creator: ${developer}`,
          //`🎥| invite saya: ${PREFIX}invite`,
          //`🎥| found a bug? | ${PREFIX}report-bug`,
          //"🎥| Rilis Versi 4.2.6",
          //`🎥| mau kirim masukan? | ${PREFIX}request`,
          //`🎥| mau ngerjain tugas sambil main discord? | ${PREFIX}google | ${PREFIX}brainly`,
          `🎥| Time: ${timezone().tz("Asia/Jakarta").format("⌚ HH:mm [WIB]") + " "}`,
          `🎥| ${bot.users.cache.size} 👤User!`,
          `🎥| ${bot.guilds.cache.size} 📬Server!`,
          `🎥| ${bot.channels.cache.size} 🌐Channel!`,
          `🎥| total shard: ${bot.shard / 1000}%`
        ];
        bot.user.setActivity({
          url: "https://www.youtube.com/watch?v=iydD0OxoaH0",
          name: s[Math.floor(Math.random() * s.length)],
          type: "COMPETING"
        });
      }
      setInterval(randomStatus, 8000);
});