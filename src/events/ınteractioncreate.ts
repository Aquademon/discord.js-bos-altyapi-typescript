import { EmbedBuilder, PermissionsBitField } from "discord.js";
import ms from "ms";
import { client } from "../index";
import config from "../config";

const cooldown = new Map();

client.on("interactionCreate", async (interaction) => {
    const { COLORS, OWNERS, BETA } = config;

    if (!interaction.isCommand()) return;

    const commandName = interaction.commandName;

    // @ts-ignore
    const slashCommand = client.slashCommands.get(commandName);

    if (!slashCommand) {
        console.error(`Komut bulunamadı: ${commandName}`);
        return interaction.reply({
            content: "Belirtilen komut bulunamadı.",
            ephemeral: true
        });
    }

    try {
        if (!OWNERS.includes(interaction.user.id) && 
        !BETA.includes(interaction.user.id) && 
        slashCommand.settings?.disabled === true) {
            const embed = new EmbedBuilder()
                .setTitle("Komut Devre Dışı")
                .setAuthor({
                    name: interaction.guild.name,
                    iconURL: interaction.guild.iconURL()
                })
                    // @ts-ignore
                .setColor(COLORS.RED)
                .setDescription("Bu komut Owner tarafından geçici süreliğine kapatıldı!")
                .addFields(
                    { name: "Beta kullanıcılar için", value: "Kullanılabilir!", inline: true }
                );

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (slashCommand.userPerms || slashCommand.botPerms) {
              // @ts-ignore
            if (!interaction.member.permissions.has(PermissionsBitField.resolve(slashCommand.userPerms || []))) {
                const userPerms = new EmbedBuilder()
                    .setDescription(`🚫 ${interaction.user}, Bu komutu kullanmak için \`${slashCommand.userPerms}\` yetkisine sahip değilsiniz!`)
                    .setColor("Red");
                return interaction.reply({ embeds: [userPerms], ephemeral: true });
            }

                // @ts-ignore
            if (!interaction.guild.me.permissions.has(PermissionsBitField.resolve(slashCommand.botPerms || []))) {
                const botPerms = new EmbedBuilder()
                    .setDescription(`🚫 ${interaction.user}, Bu komutu kullanmak için \`${slashCommand.botPerms}\` yetkisine sahip değilim!`)
                    .setColor("Red");
                return interaction.reply({ embeds: [botPerms], ephemeral: true });
            }
        }

        await slashCommand.run(client, interaction);

        if (slashCommand.cooldown) {
            if (cooldown.has(`${interaction.user.id}-${commandName}`)) {
                return interaction.reply({
                    content: `Bu komutu tekrar kullanabilmek için lütfen ${ms(cooldown.get(`${interaction.user.id}-${commandName}`) - Date.now(), { long: true })} bekleyin.`,
                    ephemeral: true
                });
            }

            cooldown.set(`${interaction.user.id}-${commandName}`, Date.now() + slashCommand.cooldown);
            setTimeout(() => {
                cooldown.delete(`${interaction.user.id}-${commandName}`);
            }, slashCommand.cooldown);
        }
    } catch (error) {
        console.error(error);
        interaction.reply({
            content: "Bu komutu çalıştırırken bir hata oluştu!",
            ephemeral: true
        });
    }
});
