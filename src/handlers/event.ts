import fs from "fs";
import path from "path";
import colors from "colors";
import AsciiTable from "ascii-table";

const table = new AsciiTable();
table.setHeading("Events", "Stats").setBorder("|", "=", "0", "0");

export default async (client) => {
  const eventsPath = path.resolve(process.cwd(), "src/events");
  
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".ts"));

  for (const file of eventFiles) {
    try {
      await import(path.join(eventsPath, file));
      table.addRow(file.split(".ts")[0], "✅");
    } catch (error) {
      table.addRow(file.split(".ts")[0], "❌");
      console.error(`Error loading event ${file}:`, error);
    }
  }

  console.log(colors.white(table.toString()));
};
