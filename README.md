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
    DISCORD_TOKEN=bot_tokeni_buraya
    PREFIX=!
    ```

## Yapılandırma

### .env Dosyası

`DISCORD_TOKEN`: Discord Developer Portal'dan aldığınız bot tokenı.

`PREFIX`: Bot komutları için kullanılacak ön ek.

### Komutlar

`/src/commands/prefix` klasöründe komut dosyalarınızı oluşturabilirsiniz. Örnek bir komut dosyası `ping.ts`:

```typescript
KOMUTU BURAYA EKLE HANTIR
```

### Olaylar

`/src/events` klasöründe olay dosyalarınızı oluşturabilirsiniz. Örnek bir olay dosyası `ready.ts`:

```typescript
EVENTİ BURAYA EKLE HANTIR
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
