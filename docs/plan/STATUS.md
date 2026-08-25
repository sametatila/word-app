# Durum takibi

Her ajan aldığı WP'yi buraya işler: durum (`bekliyor` → `sürüyor` → `inceleme` → `bitti`), sahip, başlangıç, son commit, not. Bitmiş sayılma ölçütü README'deki DoD.

| WP | Başlık | Faz | Durum | Sahip | Başlangıç | Son commit | Not |
|---|---|---|---|---|---|---|---|
| WP-00 | Öğrenme ölçüm çerçevesi | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `kind` sütunu eklendi; `session_round` yazılmıyor (karar kaydı) |
| WP-01 | Beceri ilerlemesi sunucuya | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | GET/POST/PUT `/api/skills`, `lib/skills/record.ts`, e2e §27 |
| WP-02 | Hata taksonomisi | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `lib/errors.ts`, `reviews.error_type/detail`, 11 oyun + yürüyüş, e2e §28 |
| WP-03 | AI değerlendirme servisi | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `/api/assess`, `assessments` tablosu, istemci yedeği; kalite testi 20/20 (assess-samples.md) |
| WP-04 | Çevrimdışı rol yapma yedeği | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | senaryo motoru + 10 A1 senaryosu; kanıt `reports/shots/wp04-roleplay-*.png` |
| WP-10 | Çeviri oyunu | 1 | bekliyor | | | | |
| WP-11 | Dönüştürme drilleri | 1 | bekliyor | | | | |
| WP-12 | Serbest cümle görevi | 1 | bekliyor | | | | |
| WP-13 | "Neden" geri bildirimi | 1 | bekliyor | | | | |
| WP-14 | Oyun merdiveni | 1 | bekliyor | | | | |
| WP-20 | Telaffuz puanlama | 2 | bekliyor | | | | sağlayıcı kararı önce |
| WP-21 | Konuşma içeriği + monolog | 2 | bekliyor | | | | |
| WP-22 | Rol yapma sınav modu | 2 | bekliyor | | | | |
| WP-23 | Açık diyalog motoru | 2 | bekliyor | | | | |
| WP-30 | AI yazma değerlendirmesi | 3 | bekliyor | | | | |
| WP-31 | Yazma / soru türleri | 3 | bekliyor | | | | |
| WP-40 | Yerleştirme testi | 4 | bekliyor | | | | |
| WP-41 | Seviye ve modül sınavı v2 | 4 | bekliyor | | | | |
| WP-42 | Haftalık kullanım sınavı | 4 | bekliyor | | | | |
| WP-43 | CEFR can-do haritası | 4 | bekliyor | | | | önce yapılır |
| WP-50 | Beceri yetkinlik modeli | 5 | bekliyor | | | | |
| WP-51 | Hata analitiği | 5 | bekliyor | | | | |
| WP-52 | Gelişim raporu | 5 | bekliyor | | | | |
| WP-60 | /learn yeniden kompozisyon | 6 | bekliyor | | | | |
| WP-61 | Geri bildirim bileşeni | 6 | bekliyor | | | | |
| WP-62 | Ders oynatıcı akışı | 6 | bekliyor | | | | |
| WP-63 | Beceri merkezi | 6 | bekliyor | | | | |
| WP-64 | Profil ve analitik | 6 | bekliyor | | | | |
| WP-65 | Onboarding + yerleştirme akışı | 6 | bekliyor | | | | |
| WP-66 | Erdi koç sesi | 6 | bekliyor | | | | |
| WP-70 | İçerik şeması ve doğrulayıcı | 7 | bekliyor | | | | en başta |
| WP-71 | Ders kapsamı B1–C1 | 7 | bekliyor | | | | sürekli |
| WP-72 | Konuşma/yazma/okuma içeriği | 7 | bekliyor | | | | sürekli |
| WP-73 | Gerekçe ve kural parçacıkları | 7 | bekliyor | | | | |

## Karar kaydı

Plan uygulanırken alınan ürün/teknik kararlar (tarih, karar, gerekçe, kim):

- 2026-08-25 — Plan yazıldı; kaynak `reports/ogrenme-kesif-raporu.html`.
- 2026-08-25 — `events` tablosuna `kind text` sütunu (kapalı sözlük etiketi, ≤32 karakter, sunucuda doğrulanır). Gerekçe: üretim türü+puan, beceri+seviye+puan gibi iki boyutlu olaylar tek tam sayıya sığmıyordu; serbest metin yasağı sürüyor. Claude.
- 2026-08-25 — `session_round` olayı yazılmıyor: `reviews` zaten oyun/doğruluk/gecikmeyi satır satır tutuyor, ikinci kopya yalnız hacim üretirdi. Ad listede duruyor, KPI'lar `reviews`'dan okuyor. Claude.
- 2026-08-25 — `reviews.detail` sütunu: yanlışın kendisi (seçilen şık / yazılan kelime, ≤ 60 karakter). Plan yalnız `error_type` diyordu; WP-51'in karıştırma çiftleri ("meaning" hatasında hangi kelime seçildi) bu olmadan hesaplanamazdı. Serbest metin değil: şık metni ya da tek kelime. Claude.
- 2026-08-25 — SRS hata ağırlığı: `schedule(prev, q, now, errorWeight)`; kelimenin son 14 gündeki son yanlışının tipine göre (`ERROR_SRS_WEIGHT`, artikel/çoğul 0,9, gerisi 1). Yalnız tekrar evresi gün aralığına uygulanır. WP-51 ölçüme göre ayarlar. Claude.
- 2026-08-25 — `/api/assess` JSON'u sağlayıcının JSON modundan değil istemden istiyor (`assess-prompts.ts`) ve toleranslı ayrıştırıcıyla okuyor; span'ler modelden değil, modelin verdiği "wrong" parçasının metinde aranmasıyla hesaplanıyor (karakter indeksi modellerde güvenilmez). Geçersiz çıktı 502. Claude.
- 2026-08-25 — Değerlendirme önbelleği bellek değil `assessments` tablosu (hash, 24 sa): sunucusuz ortamda süreç belleği paylaşılmıyor; tablo zaten gelişim grafiği için gerekiyordu. Kota önbellek isabetlerini saymıyor. Claude.
- 2026-08-25 — WP-03 kalite testi (20 örnek) yerelde koşulamadı: sohbet anahtarları yalnız Vercel'de (Sensitive). Betik ve insan puanları hazır (`npm run test:assess`, `docs/plan/assess-samples.md`); anahtarı olan koşup tabloyu doldurur. Claude.
- 2026-08-25 — Çevrimdışı rol yapmada anlaşılmayan cevap da tur sayılıyor (modelli akışla aynı kural: her kullanıcı sözü bir tur). Ders geçme kalıp kullanımına değil tur sayısına bağlı kaldı; kalıp kullanımı `production_attempt(roleplay)` puanı olarak ölçülüyor — WP-22 sınav modu bunu koşula çevirebilir. Claude.
- 2026-08-25 — Senaryolar ders dosyasına değil `content/scripts-a1.ts`'e yazıldı; `lessons/index.ts` kimlikle bağlıyor. İçerik hattı (WP-70/71) senaryoyu ders metninden bağımsız üretip gözden geçirebilsin diye. Claude.
- 2026-08-25 — Faz 0 e2e için yerel Postgres: `docker run … postgres:16-alpine` (5439), `DATABASE_URL=<test> npx drizzle-kit migrate`, `TEST_DATABASE_URL=<test> npm run test:seed && npm run test:e2e`. README'ye taşınmalı (WP-70 sırasında). Claude.
- 2026-08-25 — WP-03 kalite testi Mistral ile koşuldu: 20/20 ±1, hata tipi 14/14, span 11/11. Modelin JSON'u beş biçimde bozduğu ölçüldü; ayrıştırıcı tek kuralla (`closesString`) onarıyor, istem iç tırnağı yasaklıyor, bütçe 1600 jeton. Model insan puanından ~+1 cömert (WP-50 notu). Claude.
