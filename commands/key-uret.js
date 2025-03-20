const { SlashCommandBuilder } = require("discord.js");
const Key = require("../models/Key");

function generateKey(length) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let key = "";
    for (let i = 0; i < length; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return key;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("key-uret")
        .setDescription("Yeni bir key üretir")
        .addIntegerOption(option => option.setName("miktar").setDescription("OWO miktarı").setRequired(true)),

    async execute(interaction) {
        const amount = interaction.options.getInteger("miktar");
        const key = generateKey(9);

        await Key.create({ key, amount });

        await interaction.reply(`Yeni key oluşturuldu: \`${key}\` (${amount} OWO)`);
    }
};
