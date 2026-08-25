# Durum takibi

Her ajan aldığı WP'yi buraya işler: durum (`bekliyor` → `sürüyor` → `inceleme` → `bitti`), sahip, başlangıç, son commit, not. Bitmiş sayılma ölçütü README'deki DoD.

| WP | Başlık | Faz | Durum | Sahip | Başlangıç | Son commit | Not |
|---|---|---|---|---|---|---|---|
| WP-00 | Öğrenme ölçüm çerçevesi | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `kind` sütunu eklendi; `session_round` yazılmıyor (karar kaydı) |
| WP-01 | Beceri ilerlemesi sunucuya | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | GET/POST/PUT `/api/skills`, `lib/skills/record.ts`, e2e §27 |
| WP-02 | Hata taksonomisi | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `lib/errors.ts`, `reviews.error_type/detail`, 11 oyun + yürüyüş, e2e §28 |
| WP-03 | AI değerlendirme servisi | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `/api/assess`, `assessments` tablosu, istemci yedeği; kalite testi 20/20 (assess-samples.md) |
| WP-04 | Çevrimdışı rol yapma yedeği | 0 | inceleme | Claude | 2026-08-25 | (bkz. git log) | senaryo motoru + 10 A1 senaryosu; kanıt `reports/shots/wp04-roleplay-*.png` |
| WP-10 | Çeviri oyunu | 1 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `translate` turu, `lib/sentence-match`, kısmi SRS kalitesi, AI onayı; kanıt `reports/shots/wp10-translate-*.png` |
| WP-11 | Dönüştürme drilleri | 1 | bekliyor | | | | |
| WP-12 | Serbest cümle görevi | 1 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `free_sentence` turu, `AssessmentCard`, yazma görevi `kind:"sentence"`; kanıt `reports/shots/wp12-free-*.png` |
| WP-13 | "Neden" geri bildirimi | 1 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `lib/why.ts`, `FeedbackLine`, şerit 2. satır, cheatsheet derin bağlantı; kanıt `reports/shots/wp13-*.png` |
| WP-14 | Oyun merdiveni | 1 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `lib/ladder.ts`, yazarak tamamla, yeni kelimeye ipuçlu yazma, oturum içi basamak inişi; kanıt `reports/shots/wp14-*.png` |
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
| WP-60 | /learn yeniden kompozisyon | 6 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `lib/plan.ts`, `GET /api/plan`, `PlanCard`; modlar şeridi/sınav kartı yapılmadı (karar kaydı); kanıt `reports/shots/wp60-plan.png` |
| WP-61 | Geri bildirim bileşeni | 6 | bekliyor | | | | |
| WP-62 | Ders oynatıcı akışı | 6 | bekliyor | | | | |
| WP-63 | Beceri merkezi | 6 | bekliyor | | | | |
| WP-64 | Profil ve analitik | 6 | bekliyor | | | | |
| WP-65 | Onboarding + yerleştirme akışı | 6 | bekliyor | | | | |
| WP-66 | Erdi koç sesi | 6 | bekliyor | | | | |
| WP-70 | İçerik şeması ve doğrulayıcı | 7 | inceleme | Claude | 2026-08-25 | (bkz. git log) | `data/content/SPEC.md`, `npm run test:content`, etiket başına uyarı bütçesi; paket/apply genelleştirme WP-71 pilotunda |
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
- 2026-08-25 — Sıra: Faz 0'dan sonra WP-70 yerine WP-13 alındı (sahibi "devam et" dedi; kullanıcıya en görünür kazanç geri bildirim). WP-70 sıradaki. Claude.
- 2026-08-25 — WP-13 adım 3 (okuma/dinleme sorusu gerekçesi): `SkillQuestion.explain` zaten cevaptan sonra Türkçe gerekçe gösteriyor; ayrı `why_tr` alanı açılmadı, WP-70 şemasında `explain` bu rolü üstlenir. Adım 4 (ders `produce`): ilk yanlışta içerikteki hedefe özgü ipucu zaten "neden" işlevi görüyor; dokunulmadı. Claude.
- 2026-08-25 — Artikel kuralları `lib/why.ts`'te "hep/genelde" güçlü/zayıf işaretli ve istisnada dürüst ("istisna — kelimeyle ezberle"); 50 isimlik test 35+ kural isabetiyle sabitlendi. Çoğul kalıbı turun doğru biçiminden türetiliyor (`formen` demo/dış veride eksik olabiliyor). Claude.
- 2026-08-25 — İçerik doğrulayıcı uyarıları toplam değil ETİKET başına bütçeliyor (`data/content/baseline.json`): toplam tavan, bir borcu azaltırken başka yerde borç almaya izin verirdi. Mevcut borç 2.227 uyarı (en yok 1.254, metinde geçmeyen sözlükçe 485, çok anlamlı tr 163, parantezli tr 158…); WP-72 kapatır. Claude.
- 2026-08-25 — Almanca metinde Türkçe harf kuralı özel adları (büyük harfle başlayan kelimeler) dışarıda bırakıyor: metinlerdeki "Frau Yıldız" bilinçli. Claude.
- 2026-08-25 — WP-70 adım 4 (paket/apply genelleştirme) bu turda yazılmadı: mevcut `data/skills/make-packets.mjs` + `apply-skills.ts` deseni SPEC'te akış olarak tarif edildi; ilk yeni içerik türü (WP-71 B1 pilotu) gelince genelleştirilecek — soyut bir üretici yazmak, tüketicisi olmadan yanlış soyutlama riski. Claude.
- 2026-08-25 — Çeviri turunda sıra hatası `correct=false` + `quality=3`: istatistikte ve hata tipinde yanlış sayılır (öğrenci cümleyi kuramadı), SRS'te kelime lapse etmez (kelime bilinmiş). `Answer.quality` sunucuda 0–5'e kilitlenir; yanlış cevap 3'ü aşamaz, doğru cevap 3'ün altına inemez. Claude.
- 2026-08-25 — Çeviri AI onayı: yerel hakem "yanlış" dediğinde ve cümle ≥ 3 kelimeyse `/api/assess` (sentence) 6 sn tavanla sorulur; overall ≥ 75 ve task ≥ 3 ise kabul (kalite 4, "anlamca doğru — başka kuruluş"). Sağlayıcı yok/zaman aşımı → yerel karar. Kota bu yolla tüketilir; `report:learning` üretim satırında görünür. Claude.
- 2026-08-25 — WP-14 A/B bayrağı (`profiles.flags.ladder`) yazılmadı: `profiles` tablosunda `flags` sütunu yok, salt bunun için şema açmak gereksiz; merdiven herkese açık, etkisi `report:learning` KPI 2 (üretim payı) ve doğrulukla izlenir. Claude.
- 2026-08-25 — KPI 2 tanımı genişledi: üretim = `production_attempt` olayları + `reviews` içinde üretim oyunları (`lib/ladder.ts PRODUCTION_GAMES`: typing/scramble/order/translate/speak). Önce yalnız olaylar sayılıyordu ve kelime turundaki üretim görünmez kalıyordu. Claude.
- 2026-08-25 — Yeni kelimenin ipuçlu yazma turu kuyruğun sonuna değil iki kelime sonrasına serpiştiriliyor: 10 yeni kelime × 3 tur = 30 > 20 tavan, sona konunca hiç çıkmıyordu (e2e ile ölçüldü). Claude.
- 2026-08-25 — Oturum içi basamak inişi istemcide: sunucu turları önceden kurduğu için `easeRound` eldeki veriyle dönüştürür (çeviri → cümle diz, yazarak tamamla → şıklı, yazma → ipuçlu); cevap oynanan oyunun adıyla kaydedilir. Claude.
- 2026-08-25 — `free_sentence` turu PLAYABLE dışında ve oturumda en çok 2: hakemi AI (kota + süre), sağlayıcı yokken tur hiç kurulmuyor (yedek dilbilgisini ölçemiyor; ölçülmeyen iş yaptırmak yerine tur yok). Beceri tarafındaki `kind:"sentence"` görevi ise sağlayıcı yokken yedekle çalışır ve "AI kapalı" der. Claude.
- 2026-08-25 — Serbest cümle SRS eşlemesi: overall ≥ 90 → 5, ≥ 70 → 4 (doğru), 40–69 → 3 (yanlış, lapse yok), < 40 → 2; yedekte en çok 3. Hata tipi rubriğin ilk hatasından. Claude.
- 2026-08-25 — WP-60 kapsam: plan kartı (adım 1–2, 5) yapıldı; modlar şeridi (adım 3) ve sınavlar kartı (adım 4) yapılmadı — mevcut "Başka türlü oyna" bölümü ve tek oyun seçici zaten görünür, sınavlar WP-40/41/42 gelmeden boş bir kart olurdu. `dailyStats.plan_done` sütunu açılmadı: "yapıldı" bugünün kayıtlarından türetiliyor (session_done olayı, ders/egzersiz lastAt, oyun cevapları); ayrı bir kayıt planı sözleşmeye çevirirdi. Öneri motoru WP-50 gelene kadar geçici kural: en az çalışılan beceri + en sık hata tipi (≥5/14 gün) → tek oyunlu tur. Claude.
