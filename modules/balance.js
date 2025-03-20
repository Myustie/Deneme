const { Events } = require("discord.js");

module.exports = async (client, userID, guildID, key) => {
    const guild = await client.guilds.fetch(guildID);
    const channel = guild.channels.cache.find(ch => ch.isTextBased() && ch.permissionsFor(client.user).has("SendMessages"));

    if (!channel) {
        console.log("❌ Uygun kanal bulunamadı!");
        return process.exit(1);
    }

    await channel.send("owo cash");

    client.on(Events.MessageCreate, async (message) => {
        if (message.author.id !== "408785106942164992") return; // OWO botun ID'si

        const balanceMatch = message.content.match(/you currently have ([\d,]+) cowoncy/i);
        if (balanceMatch) {
            const balance = parseInt(balanceMatch[1].replace(/,/g, ""), 10);
            console.log(`✅ OWO Bakiyesi Okundu: ${balance}`);
            require("./owosend")(client, userID, guildID, key, balance);
        }
    });
};
