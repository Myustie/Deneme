const { SlashCommandBuilder } = require("discord.js");
const Key = require("../models/Key");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("key-sil")
        .setDescription("Belirtilen key'i siler")
        .addStringOption(option => option.setName("key").setDescription("Silinecek key").setRequired(true)),

    async execute(interaction) {
        const key = interaction.options.getString("key");
        const deleted = await Key.findOneAndDelete({ key });

        if (!deleted) {
            return interaction.reply("Böyle bir key bulunamadı.");
        }

        await interaction.reply(`\`${key}\` keyi başarıyla silindi.`);
    }
};
