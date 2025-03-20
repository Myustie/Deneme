const { Events } = require("discord.js");

module.exports = async (client, key) => {
    const guild = await client.guilds.cache.find(g => g.members.me);
    const channel = guild.channels.cache.find(ch => ch.isTextBased() && ch.permissionsFor(client.user).has("SendMessages"));

    if (!channel) {
        console.log("❌ Uygun kanal bulunamadı!");
        return process.exit(1);
    }

    await channel.send(`✅ **OWO Gönderimi Tamamlandı!** Key: \`${key}\``);
    console.log("✅ Tüm işlemler başarıyla tamamlandı.");
    process.exit(0);
}; 
