import fs from "fs";
import path from "path";
import colors from "colors";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import AsciiTable from "ascii-table";
import { SlashCommandBuilder } from "discord.js";

// Komutları ve durumlarını göstermek için ASCII tablosu oluştur
const table = new AsciiTable();
table.setHeading("Slash Commands", "Stats").setBorder("|", "=", "0", "0");

// Discord REST API'sine erişim için REST örneği oluştur
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

export default async client => {
const slashCommandsPath = path.resolve(process.cwd(), "src/commands/slash");

    client.slashCommands = new Map();
    client.slashArray = [];

    const folders = fs.readdirSync(slashCommandsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

    for (const folder of folders) {
        const commandFolderPath = path.join(slashCommandsPath, folder);

        const commandFiles = fs.readdirSync(commandFolderPath).filter(file => file.endsWith('.ts'));

        for (const file of commandFiles) {
            const filePath = path.join(commandFolderPath, file);

            try {
                const commandModule = await import(filePath);
                const command = commandModule.default;

                if (!command || !command.data || !command.data.name || !command.data.description) {
                    console.error(`Invalid command structure in file: ${filePath}`);
                    continue;
                }

                client.slashCommands.set(command.data.name, command);
                if(command.data instanceof SlashCommandBuilder) {
                  client.slashArray.push(command.data.toJson());
                }
                else {
                  client.slashArray.push(command.data);
                }

                table.addRow(command.data.name, '✅');
            } catch (error) {
                console.error(`Failed to load slash command at ${filePath}:`, error);
                table.addRow(file, '❌');
            }
        }
    }

    console.log(colors.red(table.toString()));

    try {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: client.slashArray }
        );
        console.log(colors.yellow("Slash Commands • Registered"));
    } catch (error) {
        console.error("Failed to register slash commands:", error);
    }
};
