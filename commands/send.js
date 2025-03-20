const { SlashCommandBuilder } = require("discord.js");
const Key = require("../models/Key");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("send")
        .setDescription("Belirtilen key ile OWO gönderimi başlatır")
        .addStringOption(option =>
            option.setName("key")
                .setDescription("Kullanılacak key")
                .setRequired(true)
        ),

    async execute(interaction) {
        const keyInput = interaction.options.getString("key");
        const keyData = await Key.findOne({ key: keyInput });

        if (!keyData) {
            return interaction.reply("❌ Geçersiz key!");
        }
        if (keyData.used) {
            return interaction.reply("❌ Bu key zaten kullanılmış!");
        }

        // Token.txt dosyasından ilk tokeni al
        const tokenPath = path.join(__dirname, "..", "token.txt");
        const tokens = fs.readFileSync(tokenPath, "utf8").split("\n").map(t => t.trim()).filter(Boolean);
        
        if (tokens.length === 0) {
            return interaction.reply("❌ Kullanılabilir token bulunamadı!");
        }

        const token = tokens[0]; // İlk tokeni kullanacağız
        const userID = interaction.user.id;
        const guildID = interaction.guild.id;

        // Join işlemini başlat
        const joinProcess = spawn("node", ["./modules/join.js", token, userID, guildID, keyInput]);

        joinProcess.stdout.on("data", data => console.log(`Join Output: ${data}`));
        joinProcess.stderr.on("data", data => console.error(`Join Error: ${data}`));

        await interaction.reply("✅ Gönderim işlemi başlatıldı, lütfen bekleyin...");
    }
};
