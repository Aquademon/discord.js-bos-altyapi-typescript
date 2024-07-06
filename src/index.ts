import "dotenv/config";
import { Client, GatewayIntentBits, Partials } from "discord.js";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { bold, yellow } from "colors";

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

// ==== Çökme Koruyucusu // ==== //
process.on("unhandledRejection", async (reason, promise) => {
    console.error(
        `${bold(
            yellow("[ÇÖKME-KORUYUCU/unhandledRejection]:")
        )} ${reason} ${promise}`
    );
});
process.on("uncaughtException", async err => {
    console.log(
        `${bold(yellow("[ÇÖKME-KORUYUCU/uncaughtException]:"))} ${err}`
    );
});
process.on("uncaughtExceptionMonitor", async (err, origin) => {
    console.log(
        `${bold(
            yellow("[ÇÖKME-KORUYUCU/uncaughtExceptionMonitor]:")
        )} ${err} ${origin}`
    );
});

// ==== // İstemci Özellikleri // ====//
// @ts-ignore
client.commands = new Collection();
// @ts-ignore
client.slashCommands = new Collection();
// @ts-ignore
client.aliases = new Collection();

// Botu .env dosyasındaki token ile giriş yap
client.login(process.env.TOKEN);

export default client;

readdirSync(join(__dirname, "Handlers")).map(handler => {
    const func = await import(join(__dirname, "Handlers", handler));
    func.default(client);
});
