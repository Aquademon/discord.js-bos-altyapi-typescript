import { client } from "../index";
import config from "../config";
import { EmbedBuilder } from "discord.js";

const cooldowns = new Map();

client.on("messageCreate", async (message) => {
    const { COLORS, OWNERS, BETA } = config;

        if (!message.content.startsWith(config.PREFIX) || message.author.bot) return;

        const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        if (!commandName) return;

        // @ts-ignore
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;


        if (!OWNERS.includes(message.author.id) &&
        command.settings?.disabled === true && 
        !BETA.includes(message.author.id) ||
        BETA.includes(message.author.id) &&
         command.settings?.beta === false)
        {
            const embed = new EmbedBuilder()
                .setTitle("Komut Devre Dışı")
                .setAuthor({
                    name: message.guild.name,
                    iconURL: message.guild.iconURL()
                })
                    // @ts-ignore
                .setColor(COLORS.RED)
                .setDescription(`**Bu komut "Owner" tarafından geçici süreliğine kapatıldı!**`)
                .addFields([
                    { 
                        name: "Beta kullanıcılar için", 
                        value: `${command.settings?.beta === true ? "Kullanılabilir Durumda!" : "Kullanılamaz Durumda!"}`, 
                        inline: true 
                    }
                ]);

            return message.reply({ embeds: [embed]});
        }

        if (command.userPerms || command.botPerms) {
            if (command.userPerms && !message.member?.permissions.has(command.userPerms)) {
                await message.reply(`You don't have required permissions (${command.userPerms}) to use this command!`);
                return;
            }

                    // @ts-ignore
            if (command.botPerms && !message.guild?.me?.permissions.has(command.botPerms)) {
                await message.reply(`I don't have required permissions (${command.botPerms}) to use this command!`);
                return;
            }
        }

        // Cooldown handling
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Map());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps?.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                await message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
                return;
            }
        }

        timestamps?.set(message.author.id, now);
        setTimeout(() => timestamps?.delete(message.author.id), cooldownAmount);

        try {
            await command.run(client, message, args);
        } catch (error) {
            console.error(error);
            await message.reply("There was an error while executing this command!");
        }
    });