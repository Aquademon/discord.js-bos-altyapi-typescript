# Discord.js TypeScript Bot Template

Bu proje, TypeScript kullanarak Discord.js ile gelişmiş bir Discord botu oluşturmak için bir altyapıdır. Bu şablon, bot geliştirme sürecinizi hızlandırmak ve daha kolay hale getirmek için temel işlevler ve yapılandırmalar içerir.

## İçindekiler

-   [Özellikler](#özellikler)
-   [Gereksinimler](#gereksinimler)
-   [Kurulum](#kurulum)
-   [Yapılandırma](#yapılandırma)
-   [Kullanım](#kullanım)
-   [Lisans](#lisans)

## Özellikler

-   **TypeScript Desteği:** Modern TypeScript ile yazılmıştır.
-   **Modüler Yapı:** Komutlar ve olaylar modüler olarak yapılandırılmıştır.
-   **Kolay Yapılandırma:** `.env` dosyası ile yapılandırma.
-   **Gelişmiş Hata Yönetimi:** Hata yakalama ve kaydetme mekanizmaları.
-   **Örnek Komutlar ve Olaylar:** Başlangıç için örnek komutlar ve olaylar içerir.

## Gereksinimler

-   Node.js v18 veya daha üstü
-   npm veya yarn paket yöneticisi
-   Discord Developer Portal'da oluşturulmuş bir bot tokenı

## Kurulum

1. Bu projeyi bilgisayarınıza klonlayın:

    ```bash
    mkdir Proje-Adi
    cd Proje-Adi
    git clone https://github.com/Aquademon/discord.js-bos-altyapi-typescript.git .
    ```

2. Gerekli bağımlılıkları yükleyin:

    ```bash
    npm install
    # veya
    yarn install
    ```

3. `.env` dosyasını oluşturun ve gerekli bilgileri doldurun:
    ```env
    TOKEN="Discord Bot TOKEN"
    ```

## Yapılandırma

### .env Dosyası

`TOKEN`: Discord Developer Portal'dan aldığınız bot tokenı.

### config.ts Dosyası

- PREFIX: Prefix'li komutların çalışması için genel bir değişken. Örnek bir şema:
```ts
export default {
    PREFIX: "!"
};
```

- MESSAGES: Prefix için genel message değişkenleri. Örnek bir şema:
```ts
export default {
    MESSAGES: {
        COOLDOWN_MESSAGE: ["5S"]
    }
};
```

- COLORS: Genel renk değişkenleridir. Örnek bir şema:
```ts
export default {
    COLORS: {
        PURPLE: "#9269ff",
        RED: "#ff0000"
    }
};
```

- EMOJIS: Genel emoki değişkenleri. Örnek bir şema:
```ts
export default {
    EMOJIS: {
        SUCCESS: "✅",
        ERROR: "❌"
    }
};
```

- OWNERS: Bot sahiplerini "ID" girerek owner özel komutlarda işinizi kolaylaştırır. Örnek bir şema.
```ts
export default {
    OWNERS: ["581884583985807381","1098189730513956945"]
};
```

- config.ts dosyasının Tüm Şeması
```ts
export default {
    PREFIX: "!",
    MESSAGES: {
        COOLDOWN_MESSAGE: ["5S"]
    },
    COLORS: {
        PURPLE: "#9269ff",
        RED: "#ff0000"
    },
    EMOJIS: {
        SUCCESS: "✅",
        ERROR: "❌"
    },
    OWNERS: ["581884583985807381","1098189730513956945"]
};
```

### Prefix Komutları
`/src/commands/prefix/ping.ts` klasöründe komut dosyalarınızı oluşturabilirsiniz. Örnek bir komut dosyası `ping.ts`:

```typescript
export default {
    name: "deneme",
    run: async function(client, message, args) {
        await message.reply(`🏓 Pong ${client.ws.ping}ms`)
    }
};
```

### Slash Komutları
`/src/commands/slash/ping.ts` klasöründe komut dosyalarınızı oluşturabilirsiniz. Örnek bir komut dosyası `ping.ts`:

```typescript
export default {
  data: {
    name: "ping",
    description: "Botun Ping Gösterir",
  },
  run: async function(client,interaction) {
await interaction.reply(`🏓 Pong ${client.ws.ping}ms`)
 }
}
```

### Olaylar

`/src/events` klasöründe olay dosyalarınızı oluşturabilirsiniz. Örnek bir olay dosyası `ready.ts`:

```typescript
    import { ActivityType } from "discord.js";
import { client } from "../index";
import colors from "colors"

client.on("ready", (client) => {
  console.log(colors.red(`${client.user.tag} İsimli Bot Şuan Aktif!`));

  const activities = [
    {
      name: `Dark_Hunter & AquaDemon`,
      type: ActivityType.Playing,
    }
  ];

  const status = ["dnd"];
  let i = 0;
  setInterval(() => {
    if (i >= activities.length) i = 0;
    client.user.setActivity(activities[i]);
    i++;
  }, 5000);

  let s = 0;
  setInterval(() => {
    if (s >= activities.length) s = 0;
    // @ts-ignore
    client.user.setStatus(status[s]);
    s++;
  }, 30000);
});
```

## Kullanım

Botu çalıştırmak için aşağıdaki komutu kullanın:

```bash
npm start
# veya
yarn start
```

## Lisans

Bu proje [Apache 2.0 Lisansı](LICENSE) ile lisanslanmıştır. Daha fazla bilgi için [LICENSE](LICENSE) dosyasına bakın.
