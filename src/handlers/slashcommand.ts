import AsciiTable from "ascii-table";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { blue, red, bold } from "colors";

// Komutları ve durumlarını göstermek için ASCII tablosu oluştur
const table = new AsciiTable()
    .setHeading("Komut (/)", "Durum")
    .setBorder("|", "=", "0", "0");

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
    }
};
