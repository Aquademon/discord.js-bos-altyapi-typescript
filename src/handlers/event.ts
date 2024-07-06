import AsciiTable from "ascii-table";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { green, red, bold } from "colors";

// Olayları ve durumlarını göstermek için ASCII tablosu oluştur
const table = new AsciiTable()
    .setHeading("Olay", "Durum")
    .setBorder("|", "=", "0", "0");

export default client => {
    // "src/events" klasöründeki tüm TypeScript dosyalarını oku
    readdirSync(join("src", "events"))
        .filter(file => file.endsWith(".ts"))
        .map(async event => {
            // Her olayı içe aktar
            await import(join("src", "events", event));

            // Başarılı şekilde içe aktarılan olayı tabloya ekle
            table.addRow(event.split(".ts")[0], "🟢");
        });

    // Tabloyu yeşil renkle yazdır
    console.log(bold(green(table.toString())));
};
