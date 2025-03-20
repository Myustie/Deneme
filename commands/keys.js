const { SlashCommandBuilder } = require("discord.js");
const Key = require("../models/Key");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("keys")
        .setDescription("Tüm keyleri listeler"),

    async execute(interaction) {
        const keys = await Key.find();
        if (!keys.length) return interaction.reply("Henüz oluşturulmuş bir key yok.");

        let response = "**Mevcut Keyler:**\n";
        keys.forEach(k => {
            response += `**Key:** \`${k.key}\` - **Miktar:** ${k.amount} OWO - **Kullanılmış:** ${k.used ? "✅" : "❌"}\n`;
        });

        await interaction.reply(response);
    }
};
