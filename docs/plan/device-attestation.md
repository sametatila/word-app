# Cihaz doğrulaması (Play Integrity / App Attest) — son tarih 2026-09-24

Karar 2026-09-15'te verildi (misafir modu best-practice turu, madde 6): bu iş
**2026-09-24'te kesinlikle yapılmalı**. AGENTS.md'deki "Tarihli işler" bölümü bu
belgeye bakıyor.

## Sorun

"Hesapsız devam et" (`POST /api/auth/sign-in/anonymous`) e-posta ya da doğrulama
istemeden sunucuda bir misafir kimliği açıyor. Tek koruma IP başına saatte 10 kimlik
(`src/lib/auth/server.ts` `customRules`).

- **Kötüye kullanım:** IP değiştiren bir betik binlerce misafir açabilir. Her misafir
  veritabanında satır, seslendirme kotası (günde 500) ve 2026-09-15'ten beri bir yapay
  zekâ değerlendirmesi (`GUEST_AI_TRIALS`) harcatabiliyor, yani doğrudan maliyet.
- **Masum takılma:** okul ağı ya da operatörün ortak IP'si (CGNAT) arkasındaki 11.
  kişi "çok fazla misafir oturumu" hatası alıyor.

## Çözüm

Mağazanın imzalı belgesi, isteğin gerçek bir cihazdan ve değiştirilmemiş, mağazadan
indirilmiş uygulamadan geldiğini kanıtlıyor. Sunucu belgeyi Google/Apple'a doğrulatıyor.

- Android: **Play Integrity API** (standart istek; `appIntegrity`, `deviceIntegrity`).
- iOS: **App Attest** (`DCAppAttestService`).

Doğrulanan istemcide IP sınırı gevşetilebilir; doğrulanamayan istemci sıkı sınıra düşer.

## Aşamalar

### 1. Samet'in yapacakları (kod dışı)
- [ ] Google Cloud projesi `nomi-507213`: Play Integrity API'yi etkinleştir.
- [ ] Play Console › Test ve yayın › Uygulama bütünlüğü: Play Integrity API'yi bu Cloud
      projesine bağla.
- [ ] Sunucu doğrulaması için servis hesabı: `playintegrity` kapsamıyla kullanılacak
      anahtarın canlı sunucuya konmasını ONAYLA. Yeni env değişkeni üç dosyaya da aynı
      satırla eklenir (AGENTS.md env senkron kuralı): `.env.example`, yerel `.env`,
      `/opt/lernomi/.env`. Sunucu `.env`'inden önce yedek alınır.
- [ ] (iOS, sonra) Apple Developer › Identifiers › `app.lernomi.ios`: App Attest yetkisini aç.

### 2. Kayıt kipi (Android) — önce
- Mobil: misafir açılmadan önce Play Integrity belgesi alınır ve
  `/sign-in/anonymous` isteğinde gönderilir.
- Sunucu: belge Google'a doğrulatılır, sonuç (geçti / kaldı / yok, sebep) kaydedilir,
  **kimse reddedilmez**.
- Env bayrağı ile kip seçilir (ör. `GUEST_ATTESTATION=log|enforce|off`).
- Birkaç gün ölçülür: gerçek kullanıcıların kaçı geçiyor, eski cihazlar, Google Play
  hizmetleri olmayan cihazlar (ör. bazı Huawei'ler), emülatörler.

### 3. Engelleme kipi — ölçüm temizse
- Doğrulanamayan istemci reddedilir ya da sıkı IP sınırına düşer; doğrulanan istemcide
  IP sınırı gevşetilir.
- Geçemeyen gerçek kullanıcı için giriş ekranında açık bir mesaj ve hesapla devam yolu.

### 4. iOS
- App Attest istemci + sunucu doğrulaması (CBOR attestation, Apple kök sertifikası).
- Linux'ta derlenemediği için iOS cihazında Samet'le birlikte denenir.

## Doğrulama
- Sunucu doğrulaması gerçek Postgres'te bir test betiğiyle (misafir testleri gibi) ve
  sahte/geçersiz belgeyle reddedilen yollarla ölçülür.
- Android release derlemesi emülatörde ve gerçek cihazda denenir.
- Yönetim panelinde misafir sayısı (2026-09-15'ten beri var) kayıt kipinin öncesi ve
  sonrasıyla karşılaştırılır.
