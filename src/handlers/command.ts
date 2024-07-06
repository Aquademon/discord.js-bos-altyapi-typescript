import AsciiTable from "ascii-table";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { blue, red, bold } from "colors";

// Komutları ve durumlarını göstermek için ASCII tablosu oluştur
const table = new AsciiTable()
    .setHeading("Komut", "Durum")
    .setBorder("|", "=", "0", "0");

export default client => {
    // Komutlar klasöründeki alt klasörleri oku
    readdirSync(join("src", "commands", "prefix")).map(dir => {
        // Belirli klasördeki TypeScript dosyalarını filtrele
        const files = readdirSync(join("src", "commands", dir)).filter(file =>
            file.endsWith(".ts")
        );

        // Eğer dosya yoksa, kırmızı renkle 0 komut yazdır
        if (!files || files.length <= 0) console.log(bold(red("Commands - 0")));

        // Her komut dosyasını oku ve içe aktar
        files.map(async file => {
            let command = await import(
                join("src", "commands", "prefix", dir, file)
            );

            if (command) {
                // Komutu client'a ekle
                client.commands.set(command.name, command);

                // Eğer komutun takma adları varsa, bunları da ekle
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.map(alias => {
                        client.aliases.set(alias, command.name);
                    });
                }

                // Başarılı komutu tabloya ekle
                table.addRow(command.name, "🟢");
            } else {
                // Başarısız komutu tabloya ekle
                table.addRow(file, "🔴");
            }
        });
    });

    // Tabloyu mavi renkle yazdır
    console.log(bold(blue(table.toString())));
};
