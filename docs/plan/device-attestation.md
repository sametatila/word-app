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

**DURUM (2026-09-23): kod hazır, canlıda KAPALI.** Sunucu `.env`'inde iki değişken boş
olduğu sürece deploy hiçbir şeyi değiştirmiyor: `/api/config` `guestAttestation: null`
diyor, uygulama Google'a gitmiyor, sunucu hiçbir şey yazmıyor.

Ne yapıldı:
- **Mobil (Android):** kendi native modülümüz `LernomiIntegrity`
  (`mobile/android/.../integrity/LernomiIntegrityModule.kt`,
  `com.google.android.play:integrity:1.6.0`, standart istek). Giriş ekranı açılınca
  sağlayıcı önceden hazırlanıyor (`prepareIntegrityToken`); "Hesapsız devam et"te
  `mobile/src/lib/integrity` belgeyi en çok 4 sn bekliyor ve `/sign-in/anonymous`
  gövdesine `{ attestation: { token, nonce } }` ekliyor. Gelmezse yalnız hata kodu
  gidiyor (`{ attestation: { error: "-1" } }`, `timeout`, `no_module`); açılış hiçbir
  yolda durmuyor. iOS'ta hiçbir şey olmuyor. Belge başlıkta değil gövdede: birkaç KB
  olabiliyor ve nginx'in başlık tamponunu aşarsa istek 400 ile düşerdi.
- **requestHash:** her açılışta rastgele 32 bayt nonce,
  `base64url(sha256("lernomi/guest-sign-in/v1:" + nonce))`. Sunucu özeti kendisi
  hesaplayıp belgedekiyle karşılaştırıyor; aynı özet ikinci kez gelirse `replay`.
- **Sunucu:** `src/lib/auth/play-integrity.ts`. Servis hesabı JWT → OAuth
  (`playintegrity` kapsamı) → `playintegrity.googleapis.com/v1/com.lernomi.learn:decodeIntegrityToken`.
  `lib/auth/server` `after` kancası kimlik açıldıktan SONRA işi başlatıyor ve
  beklemiyor. Geçmek için hepsi: paket, özet, tazelik (≤10 dk), `PLAY_RECOGNIZED`,
  `MEETS_DEVICE_INTEGRITY`. Lisans hükmü yalnız kaydediliyor.
- **Kayıt:** `guest_attestations` (migration 0067): kimlik, platform, build, kip, sonuç
  (`pass`/`fail`/`missing`/`error`), sebepler, üç hüküm, özet, zaman. Belge saklanmıyor.
  Hesap silmede satır kalıyor, kimlik boşalıyor; misafir hesaba birleşince taşınıyor.
  iOS açılışları yazılmıyor; istemci başlığı olmayan (betik) açılış `platform = null`.
- **Test:** `npm run test:guest-attestation` (CI veritabanı adımında), mobil
  `__tests__/integrity.test.ts` + `guest.test.ts`.

Env (üç dosyada aynı satır; sunucuda `/opt/lernomi/.env`):

| Değişken | Değer |
|---|---|
| `GUEST_ATTESTATION` | boş/`off` = kapalı · `log` = kaydet · `enforce` = henüz yok, `log` gibi çalışır ve bunu log'a yazar |
| `PLAY_INTEGRITY_KEY_PATH` | `playintegrity` çağırabilen servis hesabının JSON yolu (`/opt/lernomi/secrets/…`, `root:lernomi 0640`). Boşken kip ne derse desin kapalı |

Proje numarası (`658160017552`, `nomi-507213`) sunucuda sabit, `/api/config` ile iniyor.

**Nasıl açılır:** (1) Aşama 1'deki konsol adımları; (2) belge gönderen Android sürümü
mağazada (eski sürümler `missing/no_token` yazar, kimseyi etkilemez); (3) sunucuda
anahtar dosyası + iki satır, yedekten sonra rolling restart. Kapatmak için
`GUEST_ATTESTATION=""` + restart.

**Ölçüm sorguları:**

```sql
-- günlük dağılım
select date_trunc('day', created_at) as gun, result, count(*)
  from guest_attestations group by 1, 2 order by 1 desc, 2;
-- kalanların sebebi
select reasons, count(*) from guest_attestations
 where result <> 'pass' and created_at > now() - interval '7 days'
 group by 1 order by 2 desc;
-- sürüme göre (eski sürümün "yok"u ayrı görünsün)
select platform, build, result, count(*) from guest_attestations
 where created_at > now() - interval '7 days' group by 1, 2, 3 order by 1, 2 desc, 3;
```

Kalan (ölçüm sırasında bakılacak): satırlar bugün süresiz duruyor; Aşama 3 kararıyla
birlikte bir saklama süresi (ör. 90 gün) cron'a eklenmeli. Emülatör/debug derlemesi
`app:UNRECOGNIZED_VERSION` ile `fail` yazar, beklenen bu.

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
