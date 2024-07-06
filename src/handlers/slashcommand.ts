import AsciiTable from "ascii-table";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { yellow, red, bold } from "colors";

import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";

// Komutları ve durumlarını göstermek için ASCII tablosu oluştur
const table = new AsciiTable()
    .setHeading("Komut (/)", "Durum")
    .setBorder("|", "=", "0", "0");

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

export default client => {
    const folders = readdirSync(join("src", "commands", "slash"), {
        withFileTypes: true
    })
        .filter(dir => dir.isDirectory())
        .map(dir => dir.name);

    for (const folder of folders) {
        const commandFiles = join("src", "commands", "slash", folder).filter(
            file => file.endsWith(".ts")
        );

        for (const file of commandFiles) {
            const filePath = join("src", "commands", "slash", folder, file);

            try {
                const cmd = await import(filePath);
                const command = cmd.default;

                if (
                    !command ||
                    !command.data ||
                    !command.data.name ||
                    !command.data.description
                ) {
                    console.error(
                        `Invalid command structure in file: ${filePath}`
                    );
                    continue;
                }

                client.slashCommands.set(command.data.name, command);
                if (command.data instanceof SlashCommandBuilder) {
                    client.slashArray.push(command.data.toJson());
                } else {
                    client.slashArray.push(command.data);
                }

                table.addRow(command.data.name, "🟢");
            } catch (error) {
                console.error(
                    `Failed to load slash command at ${filePath}:`,
                    error
                );
                table.addRow(file, "🔴");
            }
        }

        console.log(bold(red(table.toString())));

        try {
            await rest.put(Routes.applicationCommands(process.env.DISCORD_ID), {
                body: client.slashArray
            });
            console.log(bold(yellow("Komutlar • Kayıtlı")));
        } catch (error) {
            console.error("Failed to register slash commands:", error);
        }
    }
};
