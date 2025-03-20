// Gerekli kütüphaneleri import ediyoruz.
const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json'); // Token dosyasındaki tokeni alıyoruz.

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Sunuculara erişim
        GatewayIntentBits.GuildMessages, // Mesajlara erişim
        GatewayIntentBits.MessageContent, // Mesaj içeriğine erişim
    ],
});

client.once('ready', () => {
    console.log(`Bot başarıyla giriş yaptı: ${client.user.tag}`);

    // Slash komutlarını oluşturuyoruz.
    const commands = [
        new SlashCommandBuilder().setName('key-uret')
            .setDescription('Yeni bir key oluştur.')
            .addIntegerOption(option => 
                option.setName('miktar')
                    .setDescription('Oluşturulacak OWO miktarını girin')
                    .setRequired(true)
            ),
        
        new SlashCommandBuilder().setName('keys')
            .setDescription('Tüm keyleri listeler.'),
        
        new SlashCommandBuilder().setName('send')
            .setDescription('Key ile OWO gönderim işlemini başlatır.')
            .addStringOption(option => 
                option.setName('key')
                    .setDescription('Gönderilecek keyi girin.')
                    .setRequired(true)
            ),
        
        new SlashCommandBuilder().setName('join')
            .setDescription('Botu token ile sunucuya katılmasını sağlar.')
    ];

    // Komutları kaydediyoruz.
    client.application.commands.set(commands)
        .then(() => {
            console.log('Slash komutları başarıyla kaydedildi.');
        })
        .catch(err => {
            console.error('Slash komutları kaydedilemedi:', err);
        });
});

// Bot komutlarını dinlemek ve işlemek için
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'key-uret') {
        const miktar = interaction.options.getInteger('miktar');
        // Burada key üretme işlemini yapıyoruz, miktar kadar key oluşturulacak
        await interaction.reply(`Başarıyla ${miktar} miktarında key üretildi.`);
    } else if (commandName === 'keys') {
        // Burada veritabanındaki keylerin listeleneceği kısım olacak
        await interaction.reply('Tüm keyler listelenecek...');
    } else if (commandName === 'send') {
        const key = interaction.options.getString('key');
        // Key doğrulama ve gönderim işlemi burada yapılacak
        await interaction.reply(`Key ${key} ile gönderim başlatıldı.`);
    } else if (commandName === 'join') {
        // Token ile sunucuya katılma işlemi yapılacak
        await interaction.reply('Token ile sunucuya giriş yapılacak.');
    }
});

// Botu Discord'a giriş yapmak için başlatıyoruz.
client.login(token);
