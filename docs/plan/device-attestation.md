# Cihaz doğrulaması (Play Integrity / App Attest)

## Durum

| Aşama | Durum |
|---|---|
| 1. Konsol adımları (Android) | Yapıldı: Play Integrity API açık ve Play Console'a bağlı; sunucu anahtarı mevcut `reviews-readonly` servis hesabı (ayrı hesap açılmadı) |
| 2. Kayıt kipi (Android) | **Canlıda, 2026-09-24'ten beri.** Sunucu `GUEST_ATTESTATION=log`, `PLAY_INTEGRITY_KEY_PATH=/opt/lernomi/secrets/reviews-readonly.json`. Belge gönderen ilk sürüm Android vc 6 |
| 3. Engelleme kipi | Sıradaki: birkaç gün ölçüm (aşağıdaki SQL) → temizse aç |
| 4. iOS App Attest | Sonra |

AGENTS.md "Tarihli işler" bu belgeye bakıyor.

## Sorun
"Hesapsız devam et" (`POST /api/auth/sign-in/anonymous`) doğrulama istemeden misafir kimliği açıyor.
Tek koruma IP başına saatte 10 kimlik (`src/lib/auth/server.ts` `customRules`).

- **Kötüye kullanım:** IP değiştiren bir betik binlerce misafir açabilir; her misafir veritabanı
  satırı, seslendirme kotası ve bir yapay zekâ değerlendirmesi (`GUEST_AI_TRIALS`) harcatır.
- **Masum takılma:** okul ağı ya da CGNAT arkasındaki 11. kişi "çok fazla misafir oturumu" alır.

Çözüm: mağazanın imzalı belgesi isteğin gerçek cihazdaki değiştirilmemiş mağaza uygulamasından
geldiğini kanıtlar; sunucu belgeyi Google/Apple'a doğrulatır. Doğrulananın IP sınırı gevşer,
doğrulanamayan sıkı sınıra düşer.

## Aşama 2 — kayıt kipi (nasıl çalışıyor)

- **Mobil (Android):** native modül `LernomiIntegrity` (`mobile/android/.../integrity/LernomiIntegrityModule.kt`,
  `com.google.android.play:integrity:1.6.0`, standart istek). Giriş ekranı açılınca sağlayıcı hazırlanır
  (`prepareIntegrityToken`); "Hesapsız devam et"te `mobile/src/lib/integrity` belgeyi en çok 4 sn bekler ve
  `/sign-in/anonymous` gövdesine `{ attestation: { token, nonce } }` ekler. Gelmezse yalnız hata kodu gider
  (`{ attestation: { error: "-1" } }`, `timeout`, `no_module`); açılış hiçbir yolda durmaz. iOS'ta bir şey
  olmaz. Belge gövdede, başlıkta değil (nginx başlık tamponunu aşabilirdi).
- **requestHash:** her açılışta rastgele 32 bayt nonce, `base64url(sha256("lernomi/guest-sign-in/v1:" + nonce))`.
  Sunucu özeti kendisi hesaplar; aynı özet ikinci kez gelirse `replay`.
- **Sunucu:** `src/lib/auth/play-integrity.ts`. Servis hesabı JWT → OAuth (`playintegrity` kapsamı) →
  `playintegrity.googleapis.com/v1/com.lernomi.learn:decodeIntegrityToken`. `lib/auth/server` `after` kancası
  kimlik açıldıktan SONRA işi başlatır, beklemez. Geçmek için: paket, özet, tazelik (≤ 10 dk),
  `PLAY_RECOGNIZED`, `MEETS_DEVICE_INTEGRITY`. Lisans hükmü yalnız kaydedilir.
- **Kayıt:** `guest_attestations` (migration 0067): kimlik, platform, build, kip, sonuç
  (`pass`/`fail`/`missing`/`error`), sebepler, üç hüküm, özet, zaman. Belge saklanmaz. Hesap silinince satır
  kalır, kimlik boşalır; misafir hesaba birleşince taşınır. iOS açılışı yazılmaz; istemci başlığı olmayan
  açılış `platform = null`.
- **Saklama 90 gün:** `ATTESTATION_RETENTION_DAYS` (`src/lib/auth/attestation-const.ts`), süpürme
  `purgeExpiredGuestAttestations` günlük cron'da (`api/cron/assess`, 04:15 UTC). Süreyi değiştirmek sabit ve
  politika BİRLİKTE (`npm run test:legal`).
- **Gizlilik:** hukuki sürüm 1.6'dan beri politikada ("Cihaz bütünlüğü kontrolü", §9 saklama, alıcı
  "Google (Play Integrity)"). Play Veri güvenliği satırı `docs/play/data-safety.md`de.
- **Test:** `npm run test:guest-attestation` (CI veritabanı adımı), mobil `__tests__/integrity.test.ts` + `guest.test.ts`.

| Env (üç env dosyasında aynı satır) | Değer |
|---|---|
| `GUEST_ATTESTATION` | boş/`off` = kapalı · `log` = kaydet · `enforce` = henüz yok, `log` gibi çalışır ve bunu log'a yazar |
| `PLAY_INTEGRITY_KEY_PATH` | servis hesabı JSON yolu (`/opt/lernomi/secrets/…`, `root:lernomi 0640`); boşken kip ne derse desin kapalı |

Proje numarası (`658160017552`, `nomi-507213`) sunucuda sabit, `/api/config` ile iner. Kapatmak:
`GUEST_ATTESTATION=""` + rolling restart. Emülatör/debug derlemesi `app:UNRECOGNIZED_VERSION` ile `fail`
yazar, beklenen bu; eski sürümler `missing/no_token` yazar.

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

## Aşama 3 — engelleme (ölçüm temizse)
- Doğrulanamayan istemci reddedilir ya da sıkı IP sınırına düşer; doğrulananın IP sınırı gevşer.
- Geçemeyen gerçek kullanıcıya giriş ekranında açık mesaj ve hesapla devam yolu.
- Yönetim panelindeki misafir sayısı öncesi/sonrası karşılaştırılır.

## Aşama 4 — iOS
- Apple Developer › Identifiers › `app.lernomi.ios`: App Attest yetkisi.
- App Attest istemci + sunucu doğrulaması (CBOR attestation, Apple kök sertifikası); iOS cihazında denenir.
