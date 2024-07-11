import fs from "fs";
import path from "path";
import colors from "colors";
import AsciiTable from "ascii-table";

const table = new AsciiTable();
table.setHeading("Commands", "Status").setBorder("|", "=", "0", "0");

interface Command {
    name: string;
    aliases?: string[];
}

export default client => {
    const commandDir = path.join(process.cwd(), "src", "commands", "prefix");

    const directories = fs.readdirSync(commandDir);

    for (const dir of directories) {
        const files = fs
            .readdirSync(path.join(commandDir, dir))
            .filter((file) => file.endsWith(".ts"));

        if (files.length === 0) continue;

        for (const file of files) {
            const commandPath = path.join(commandDir, dir, file);
            let command: Command;

            try {
                command = (await import(commandPath)).default;
            } catch (error) {
                console.error(colors.red(`Failed to load command file: ${commandPath}`), error);
                table.addRow(file.split(".ts"), "❌");
                continue;
            }


            if (command) {
                client.commands.set(command.name, command);

                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach((alias) => {
                        client.aliases.set(alias, command.name);
                    });
                }

                table.addRow(command.name, "✅");
            } else {
                console.error(colors.red(`Invalid command structure or run function not defined: ${commandPath}`));
                table.addRow(file.split(".ts"), "❌");
            }
        }
    };

    console.log(colors.blue(table.toString()));
};
