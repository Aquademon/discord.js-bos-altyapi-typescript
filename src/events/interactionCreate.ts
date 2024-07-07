import { EmbedBuilder, Collection, PermissionsBitField } from "discord.js";
import humanizeDuration from "humanize-duration";
import config from "../config";
import client from "../index";

// Kullanıcı bazlı komut bekleme sürelerini saklamak için koleksiyon oluştur
const cooldown = new Collection();

client.on("interactionCreate", async interaction => {
    // Slash komutunu alın
    const slashCommand = client.slashCommands.get(interaction.commandName);

    // Otomatik tamamlama tipi için kontrol yap
    if (interaction.type === 4) {
        if (slashCommand?.autocomplete) {
            const choices = [];
            await slashCommand.autocomplete(interaction, choices);
        }
    }

    // Eğer etkileşim komut tipi değilse, geri dön
    if (interaction.type !== 2) return;

    // Eğer komut bulunamadıysa, komutu koleksiyonlardan sil
    if (!slashCommand) {
        client.slashCommands.delete(interaction.commandName);
        client.slashArray.delete(interaction.commandName);
        return;
    }

    try {
        // Eğer komut bekleme süresi varsa, kontrol yap
        if (slashCommand.cooldown) {
            if (
                cooldown.has(`slash-${slashCommand.name}${interaction.user.id}`)
            ) {
                return interaction.reply({
                    content: config.MESSAGES["COOLDOWN_MESSAGE"].replace(
                        "<duration>",
                        humanizeDuration(
                            cooldown.get(
                                `slash-${slashCommand.name}${interaction.user.id}`
                            ) - Date.now(),
                            { lang: "tr", round: true }
                        )
                    ),
                    ephemeral: true
                });
            }

            // Komut bekleme süresini ayarla
            cooldown.set(
                `slash-${slashCommand.name}${interaction.user.id}`,
                Date.now() + slashCommand.cooldown
            );
            setTimeout(() => {
                cooldown.delete(
                    `slash-${slashCommand.name}${interaction.user.id}`
                );
            }, slashCommand.cooldown);
        }

        // Komutu çalıştır
        await slashCommand.run(client, interaction);
    } catch (error) {
        console.error(error);
    }
});
