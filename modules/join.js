const { Client, GatewayIntentBits } = require("discord.js");

const token = process.argv[2];
const userID = process.argv[3];
const guildID = process.argv[4];
const key = process.argv[5];

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once("ready", async () => {
    console.log(`✅ Token ile giriş yapıldı: ${client.user.tag}`);

    const guild = await client.guilds.fetch(guildID);
    if (!guild) {
        console.log("❌ Sunucu bulunamadı!");
        return process.exit(1);
    }

    await guild.members.fetch(userID).then(member => {
        console.log(`✅ Kullanıcı ${member.user.tag} sunucuda bulundu, işlem başlıyor.`);
        require("./balance")(client, userID, guildID, key);
    }).catch(err => {
        console.log("❌ Kullanıcı sunucuda bulunamadı!", err);
        process.exit(1);
    });
});

client.login(token);
