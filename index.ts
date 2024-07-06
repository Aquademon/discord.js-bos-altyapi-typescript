import { Client, GatewayIntentBits, Partials, Collection  } from "discord.js"
import * as fs from 'fs';
import * as child_process from 'child_process';
import "colors";
import config  from "../src/config"
import path from "path";

const client = new Client({
    // @ts-ignore
    intents: Object.values(GatewayIntentBits),
    // @ts-ignore
    partials: Object.values(Partials),
});

//------Çökme engelleyici------//
process.on('unhandledRejection', async (reason, promise) => {
    console.log(reason, promise);
  });
  
  process.on('uncaughtException', async (err) => {
    console.log(err);
  });
  
  process.on('uncaughtExceptionMonitor', async (err, origin) => {
    console.log(err, origin);
  });
  //------Çökme engelleyici------//

  //------Ayarlar------//

      // @ts-ignore
  client.slashcommands = new Collection();

          // @ts-ignore
          client.slashArray = new Collection();

        // @ts-ignore
        client.commands = new Collection();

        // @ts-ignore
        client.aliases = new Collection();
  
      // @ts-ignore
      client.exec = async (code) => {
        return child_process.execSync(code).toString()
      };
  
      // @ts-ignore
  client.classes = (className: string): any => {
    return require(`${process.cwd()}/src/Classes/${className}`);
  };

  (async () => {
    try {
        const serverModule = await import(`${process.cwd()}/src/server`);
        await serverModule.default(client);
    } catch (error) {
        console.error('Error loading module:', error);
    }
})();

  
      // @ts-ignore
  client.config = config;

  export {client}
  
  const handlersPath = path.join(process.cwd(), "src", "Handlers");
  fs.readdirSync(handlersPath).forEach(async(handler) => {
      const handlerModule = await import(path.join(handlersPath, handler));
      handlerModule.default(client);
  });
  
  client.login(process.env.TOKEN);
  //------Ayarlar------//
