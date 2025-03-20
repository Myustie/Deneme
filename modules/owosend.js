const { Events } = require("discord.js");

module.exports = async (client, userID, guildID, key, balance) => {
    const guild = await client.guilds.fetch(guildID);
    const channel = guild.channels.cache.find(ch => ch.isTextBased() && ch.permissionsFor(client.user).has("SendMessages"));

    if (!channel) {
        console.log("❌ Uygun kanal bulunamadı!");
        return process.exit(1);
    }

    await channel.send(`owo send <@${userID}> ${balance}`);

    client.on(Events.MessageCreate, async (message) => {
        if (message.author.id !== "408785106942164992") return;

        if (message.content.includes("confirm")) {
            const confirmButton = message.components[0].components.find(btn => btn.customId.startsWith("confirm"));
            if (confirmButton) {
                await confirmButton.click();
                console.log("✅ Onay butonuna tıklandı.");
                require("./kalancash")(client, key, balance);
            }
        }
    });
};
