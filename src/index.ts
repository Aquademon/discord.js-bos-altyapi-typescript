import "dotenv/config";
import { Client, GatewayIntentBits, Partials } from "discord.js";

// Belirli intent'ler ve partial'lar ile yeni bir client örneği oluştur
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, // Sunucuları yönetme niyeti
        GatewayIntentBits.GuildMessages, // Sunucu mesajlarını almak niyeti
        GatewayIntentBits.MessageContent, // Mesaj içeriğini almak niyeti
        GatewayIntentBits.GuildMembers // Sunucu üyelerini yönetme niyeti
    ],
    partials: [
        Partials.Message, // Kısmi mesajları almak için
        Partials.Channel, // Kısmi kanalları almak için
        Partials.Reaction // Kısmi reaksiyonları almak için
    ]
});

// ===== Çökme Koruyucusu ===== //
process.on("unhandledRejection", async (reason, promise) => {
    console.error(`[ÇÖKME-KORUYUCU/unhandledRejection]: ${reason} ${promise}`);
});
process.on("uncaughtException", async err => {
    console.log(`[ÇÖKME-KORUYUCU/uncaughtException]: ${err}`);
});
process.on("uncaughtExceptionMonitor", async (err, origin) => {
    console.log(`[ÇÖKME-KORUYUCU/uncaughtExceptionMonitor]: ${err} ${origin}`);
});

// Botu .env dosyasındaki token ile giriş yap
client.login(process.env.DISCORD_TOKEN);
