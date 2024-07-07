import { EmbedBuilder, Collection, PermissionsBitField } from "discord.js";
import humanizeDuration from "humanize-duration";
import config from "../config";
import client from "../index";

// Komut ön ekini ve bekleme sürelerini saklamak için koleksiyon oluştur
const prefix = config.PREFIX;
const cooldown = new Collection();

client.on("messageCreate", async message => {
    // Bot mesajlarını veya DM'leri göz ardı et
    if (message.author.bot) return;
    if (message.channel.type !== 0) return;

    // Mesajın komut olup olmadığını kontrol et
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    // Mesajı parçalara ayırarak komut ve argümanları al
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length == 0) return;

    // Komutu veya takma adını al
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        // Komut için bekleme süresi kontrolü yap
        if (command.cooldown) {
            if (cooldown.has(`${command.name}${message.author.id}`)) {
                return message.channel.send({
                    content: config.MESSAGES["COOLDOWN_MESSAGE"].replace(
                        "<duration>",
                        humanizeDuration(
                            cooldown.get(
                                `${command.name}${message.author.id}`
                            ) - Date.now(),
                            { lang: "tr", round: true }
                        )
                    )
                });
            }

            // Bekleme süresini ayarla
            cooldown.set(
                `${command.name}${message.author.id}`,
                Date.now() + command.cooldown
            );
            setTimeout(() => {
                cooldown.delete(`${command.name}${message.author.id}`);
            }, command.cooldown);
        }

        // Komutu çalıştır
        command.run(client, message, args);
    }
});