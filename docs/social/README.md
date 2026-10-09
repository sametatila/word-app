# Sosyal videolar (TikTok + Instagram Reels)

Lernomi'nin kısa videoları. Reklam değil, işe yarayan Almanca içerik: video izleyene bir şey öğretir,
Lernomi yalnız kaynak ve kapanıştaki küçük imzadır. Üretimi Claude Code yapar, yayını Samet.

İçerik yalnız depodaki veriden gelir: kelime, artikel, seviye, örnek cümle ve Türkçesi `data/app/words.json`,
kelime çiftleri `data/content/confusables.json`, telaffuz Defne'nin yayındaki kayıtları (`~/Workspace/tts-test/yayin`,
bekletmedeki kayıt kullanılmaz). Müzik ve efektler tarayıcıda sıfırdan sentezlenir. Telif ve ticari kullanım
açısından üçü de bizim (ses: `tts-test/LICENSES.md`, yazı tipleri OFL).

## Dizin düzeni

| Yer | Ne | Git |
|---|---|---|
| `scripts/social/engine.js` | Motor: 1080×1920 sahne, ızgara, kanca, kapanış, ses ve müzik sentezi | ✓ |
| `scripts/social/templates/<yaklaşım>-<tema>.js` | 20 şablon (5 yaklaşım × 4 tema). İçerik ve metin TAŞIMAZ, bölümden okur | ✓ |
| `scripts/social/lib/` | Node yardımcıları: içerik (`content.mjs`), bölüm kaydı ve tekrar engeli (`episodes.mjs`), sayfa (`page.mjs`), ses izi ve −14 LUFS (`audio.mjs`) | ✓ |
| `scripts/social/{check,gallery,audit,render}.mjs` | Komutlar (aşağıda) | ✓ |
| `scripts/social/{gallery,render}.html` | Atölye sayfası ve kare kare çıktı sayfası kabukları | ✓ |
| `data/social/episodes/<şablon>-<NNN>.mjs` | **Bölümler**: bir şablon + içeriği + ekran metinleri. Tek içerik kaynağı | ✓ |
| `.shots/social/gallery/` | Atölye: `atolye.html` + yanında `ses/<şablon>.mp4` (artifact, `files` ile) | ✗ |
| `.shots/social/out/<bölüm>/` | Paylaşılacak dosyalar: MP4, kapaklar, açıklama | ✗ |

Başka yere dosya yazılmaz. Geçici dosyalar `.shots/social/render/` ve `cache/` altında.

## Komutlar

```bash
npm run social:check                      # bölümler yükleniyor mu, aynı içerik tekrar ediyor mu, liste
npm run social:gallery [-- --no-posters] [-- --no-audio]  # atölye: her şablonun en yeni bölümü (.shots/social/gallery/)
npm run social:audit [-- <bölüm|şablon> …]  # yerleşim denetimi, Chrome + Safari motoru (WebKit); verilmezse bütün bölümler
npm run social:plan                       # depodaki takvim + takvim kuralları (canlı takvim stüdyoda)
npm run social:texts [-- <bölüm|şablon> …]  # ekrandaki her yazı düzenlenebilir mi (veri ya da şablon ui'si)
npm run social:render -- <bölüm-id> …     # MP4 + kapaklar + açıklama (.shots/social/out/<bölüm>/)
npm run social:render -- --status hazır   # durumu "hazır" olan bütün bölümler
npm run social:render -- <id> --muziksiz  # ek olarak müziksiz sürüm (platform müziği eklemek için)
```

WebKit bir kez kurulur: `node node_modules/playwright-core/cli.js install webkit`.

**Atölyeyi yayınlamak:** Artifact `file_path=.shots/social/gallery/atolye.html`, `url=https://claude.ai/artifact/CUyTS2ZwL4XQa83j6WHs3y`,
`files` = her `ses/<şablon>.mp4` (yalnız ses; Artifact `.m4a` sunmuyor, `.mp4` sunuyor; yayın yolu aynı). Galeri sesi derlerken bir kez üretir (MP4'teki karışımın aynısı;
`.shots/social/cache/audio/` önbellekli): telefonda Safari 40 sn'lik müziği kendisi sentezlerken çöküyordu
(2026-10-08, WebKit iPhone 15 benzetimi). Dosya okunamazsa (yerelde `file://`) oynatıcı sesi tarayıcıda sentezler;
yerel telefon testi için klasörü `python3 -m http.server` ile sun.

## Bölüm üretimi (Claude Code iş akışı)

1. **Durumu gör:** `npm run social:check`. Hangi seri kaç bölümde, hangisi yayında.
2. **Şablonu seç:** takvimden (aşağıda "Plan"). Bir seri hep aynı temada kalır.
3. **İçeriği seç** (kurallar aşağıda). Kullanılmış kelimeyi tekrar seçme: `check` zaten durdurur.
4. **Bölüm dosyasını yaz:** `data/social/episodes/<şablon>-<NNN>.mjs`, NNN o şablonda sıradaki numara.
   Örnek ve şablona özgü `copy` anahtarları: aynı şablonun 001 bölümü ve şablon dosyasının başındaki yorum.
   ```js
   /* Tek satırlık açıklama. */
   const episode = {
     template: "kelime-lacivert",
     status: "taslak", // taslak → hazır → yayında
     created: "2026-10-12",
     slot: "2026-10-26 07:30", // Berlin; yalnız 07:30 / 12:30 / 18:30
     content: ({ deck }) => ({
       items: deck(["…", "…"]),
       copy: { title: "…", hook: ["…", "…"], caption: "…\n\n#…", outro: { series: "…", ask: "…" } /* + şablona özgü */ },
     }),
   };
   export default episode;
   ```
5. **Denetle:** `npm run social:check` ve `npm run social:plan` (hata yok) →
   `npm run social:audit -- <bölüm-id>` (sorun yok) → kareleri gözle gör (oynatıcıda ya da ekran görüntüsüyle).
   Denetim aracı taşma, çakışma, kutu dışı yazı ve güvenli alanı ölçer, ama "anlamlı mı, doğal mı" sorusunu ölçmez:
   metni yüksek sesle oku.
6. **Üret:** `npm run social:render -- <bölüm-id>`. Çıktı satırında süre, ses (−14 LUFS civarı) ve sayfa hatası yok.
7. **Durumu "hazır" yap**, `npm run social:texts -- <bölüm-id>` (hepsi düzenlenebilir), bölüm dosyalarını commit et.
   Deploy sonrası sunucu işçisi aktarır, stüdyo takvimi yeni partiyi gösterir; video stüdyoda onayla sunucuda üretilir.
8. **Yayın durumu** depoda değil, panelde (`social_posts`): Samet "zamanlandı / yayında" işaretler, bağlantıyı yazar.
   Yayındaki (saati geçmiş) bölümün içeriği değiştirilmez.

**Takvim kuralları** (`social:check` ve `social:plan` denetler): bir saate tek bölüm; aynı gün aynı yaklaşım yok;
art arda iki bölüm aynı temada değil; farklı yaklaşımlarda ortak kelime 30 günden yakınsa hata.

Yeni şablon gerekirse (yeni format ya da tema): `templates/` altına, mevcut bir şablonu örnek alarak. Kurallar
"Tasarım standardı"nda; `social:audit` iki motorda temiz olmadan galeriye girmez.

## İçerik kuralları

- **Uydurma yok.** Kelime, çeviri, örnek cümle, artikel yalnız veriden. Elle yazılan tek şey ekran metni (kanca,
  kural kartı, etiket, kapanış, açıklama). Kural kartındaki dilbilgisi kesin ve doğru olmalı; emin değilsen yazma.
- **İşe yarasın.** İzleyen "bunu bilmem lazımmış" demeli: gerçek bir durum (doktor, kira, kasa, iş, resmî daire,
  ulaşım), sık kullanılan kelime, karıştırılan çift. Nadir, tuhaf ya da çevirisi zayıf kaydı seçme
  (ör. "Sachbearbeiter = büro görevlisi" zayıftı, çıkarıldı).
- **Tekrar yok.** Aynı yaklaşımda bir kelime iki bölümde kullanılamaz (`social:check` hata verir). Farklı
  yaklaşımlar arasında ortak kelime uyarıdır: bilerek pekiştirme değilse başka kelime seç.
- **"Hangisini duydun?" çiftleri:** iki kelime aynı türde ve aynı artikelle (yoksa sesteki artikel cevabı ele verir),
  ikisinin de sesi var, ikisi de günlük kelime. Bölüm başına bir ses karşıtlığı (ü/i, e/i, a/e, b/p…), 3 çift (~28 sn).
  Kaynak bol (bkz. Kapasite); sınırlayan `confusables.json`daki aynı tür/artikel koşulu.
- **"Cümleyi kur" cümleleri:** 4–7 kelime, A1–B1, tek bir dilbilgisi fikri. İpucu iki noktasız ve kesin.
- **Kelime destesi:** 3 kelime (~30 sn; şablon 3–6 kabul eder ama kart başına ~7 sn). Kanca, başlık ve özet
  sayıyla uyumlu ("bu 3 kelime"). Fazlası bir sonraki bölüme: "1/2, 2/2" seri olarak.

**Türkçe ekran metni:** Türk bir içerik üreticisinin konuşma diliyle. Çeviri kokan, iki nokta üst üsteli, robotik
kalıp yok. Kötü: "Sıra sende: sesli söyle", "Skorunu yorumlara yaz: _ / 4", "4 cümleyle hallet". İyi: "Şimdi sen
söyle", "Kaç tane bildin? Yorumlara yaz", "Bu 4 cümle yetiyor". Açıklamanın ilk satırı aranabilir bir cümle olsun
("Almanca doktor randevusu", "Almanca artikel kuralı"): iki platform da arama motoru gibi çalışıyor.

## Tasarım standardı

- **Izgara:** yazı alanı x 96–930 (sağda düğme sütunu), ortalananlar 513 ekseninde, dikey 250–1530 (üstte sekmeler,
  altta açıklama). Boşluk 8'in katları; köşe kart 48, kutu 32, hap yüksekliğin yarısı; kutuda yazıya ≥24 px dolgu.
- **Kanca:** ilk karede soru ya da dert, 0. karede tam okunur (hareket yalnız vurgu dalgası). `E.hook` satırları yazı
  boyunun 1,16 katı aralıkla dizer, sığmayanı küçültür.
- **Kapanış (`E.outro`):** özetin altında seri sözü, yorum sorusu, kutulu imza. Uzun metin önce tek satıra sığacak
  kadar küçülür, sığmazsa alttan yukarı dizilir; imza hep en altta, logonun köşesiyle eş merkezli kutuda.
- **Tema:** Gece, Kâğıt, Turuncu kutu, Lacivert. Turuncu yalnız çerçeve: logo turuncu zeminde kaybolur, içerik açık
  panelde. Bir seri tek temada kalır (izleyici seriyi ilk karede tanısın).
- **Müzik:** 20 sentez tarzı (`E.music`), her şablon başka birini kullanır; seviyeler ölçülerek eşitlendi.
  Konuşma sırasında müzik kısılır.
- **Belirlilik:** `render(t)` yalnız t'ye bakar (CSS animasyonu yok): aynı t, aynı kare. MP4 bu sayede kare kare çıkar.

## Format (TikTok + Instagram Reels)

İki platform aynı dosyayı kabul ediyor; güvenli alan ikisini birden karşılayacak şekilde kuruldu (oynatıcıdaki
**Arayüz** düğmesi TikTok ve Reels düğmelerini üstüne koyar).

| | Değer | Neden |
|---|---|---|
| Görüntü | 1080×1920, 9:16, 30 fps, H.264 High, yuv420p (BT.709), CRF 18, 2 sn'de bir anahtar kare | İki platformun önerdiği; yeniden sıkıştırmada kayıp az |
| Ses | AAC 192k 48 kHz, ≈ −14 LUFS, gerçek tepe ≤ −1 dBTP (yüklenecek dosyada ölçülür) | Platformlar bu civara çekiyor; yüksek verilen kısılır, çok düşük kalan sessiz duyulur |
| Süre | 28–38 sn (şimdiki bölümler; kelime desteleri 3 kelime, ~30 sn) | Bkz. eleştiri 2: 30 sn civarı hedef |
| Kapak | `kapak.jpg` (9:16) yüklenir | Akışta ve profilde görünen kare |
| Profil ızgarası | `kapak-3x4.jpg` (orta 1080×1440) kontrol için | İki platform profilde 3:4 kesit gösteriyor; kanca bu bölgede okunmalı |
| Açıklama | `aciklama.txt`: ilk satır aranabilir cümle + 5–6 etiket | Instagram'da 3–5 etiket yeterli, fazlası işe yaramıyor |

**Yükleme kontrol listesi (Samet):**
- Kapak olarak `kapak.jpg`'yi seç. Açıklamayı `aciklama.txt`'den yapıştır.
- **Yapay zekâ etiketi:** ses Defne (yapay sentez). TikTok gerçekçi yapay zekâ içeriğine etiket istiyor; etiketi açmak
  güvenli taraf (etiketin dağıtımı kısmadığını söylüyorlar). Instagram'da "AI info".
- **Marka bildirimi:** TikTok'ta kendi markanı tanıtıyorsan "İçeriği açıkla → Kendi markan".
- Platform müziği eklenecekse `--muziksiz` sürümü yükle (iş hesaplarında yalnız ticari kütüphane serbest).
- Yayından sonra bölüm dosyasında `status: "yayında"`, `published`.

## Eleştirel değerlendirme (dönüşüm ve izlenme)

Güçlü yanlar: içerik doğru ve işe yarar (veriden, uydurma yok); her videoda izleyene görev var (tahmin et, söyle,
dinle); kalan süre üstte görünüyor; özet ekranı kaydetmeye uygun; kapanışta tek yorum sorusu; telif riski yok.
Zayıf yanlar, etki sırasıyla:

1. **İlk saniye boş başlıyor.** Kanca kelime kelime 0,4–1 sn'de geliyor; akışta otomatik oynayan ilk kare neredeyse
   düz zemin. Kaydırma kararı ilk saniyede veriliyor. → Kanca 0. karede okunur olmalı (hareket vurgu olarak sonra),
   ya da ilk karede ses (soru ya da kelime) başlamalı.
   **Uygulandı (2026-10-09):** kanca 20 şablonda 0. karede tam okunur, kelimeler sırayla kabararak vurgulanır.
2. **Süre uzun.** Kelime desteleri 42–43 sn, diyaloglar 28–34 sn. Eğitici kısa videoda bitirme oranı 30 sn'den sonra
   hızla düşüyor ve bitirme oranı dağıtımın ana sinyali. → Desteler 3–4 kelime (~30 sn) ya da "1/2, 2/2" bölümler
   (seri takibi de getirir). Kapanış 5 sn sürüyor; özet + kapanış 3 sn'ye inerse döngü (ikinci izleme) artar.
   **Uygulandı (2026-10-09):** kelime desteleri 3 kelime, 28–30 sn (kart başına ~7 sn: 4 kelime ~36 sn ederdi).
   Kapanış kısaltması henüz yapılmadı.
3. **Yüzsüz, şablon görünümü.** Sadece ekran ve sentez ses; akışta "otomatik üretilmiş" hissi riski var, güven ve
   takip düşük kalabilir. Instagram yeniden paylaşılan/özgün olmayan içeriğin erişimini kısıyor; bizimki özgün ama
   her gün aynı kalıp yorgunluk yaratır. → Her 4 videodan biri insan yüzlü (Samet ya da bir öğretmen: aynı içeriğin
   üstünde 5 sn yorum, "ben de bunu yanlış söylüyordum"); şablonlar dönüşümlü.
4. **Türkçe ses yok.** Bütün anlatım yazıyla; sesi açık dinleyen Türkçe bağlamı duymuyor, sesi kapalı izleyen
   telaffuzu kaçırıyor. → Kancaya kısa bir Türkçe ses (tek cümle) en büyük kazanç adayı; yoksa yazı yeterince büyük
   ve erken olmalı (şimdi öyle).
5. **Uygulamaya giden yol zayıf.** Bilerek reklam yok, ama dönüşüm yalnız profil → biyografi bağlantısına kalıyor ve
   ölçülmüyor. → Biyografide kampanya bağlantısı (Play `referrer=utm_source=tiktok…`, App Store kampanya bağlantısı
   `ct=`), her 5 videoda bir kapanışta yumuşak bir cümle ("Bu turun devamı uygulamada"), Instagram'da hikâyede
   bağlantı çıkartması. Kurulumlar platform başına ayrı ölçülmeli; yoksa neyin işe yaradığını bilemeyiz.
6. **Paylaşım daveti yok.** Reels'te dağıtımı en çok paylaşım (DM'e gönderme) büyütüyor; yorum ve kaydetme var,
   paylaşma yok. → Yorum sorusunun bir kısmı "Almanya'daki arkadaşına gönder" türü olsun (dönüşümlü).
7. **Müzik keşfi yok.** Kendi sentez müziğimiz trend seslerden gelen keşfi getirmez. → Pilotta bölümlerin bir kısmını
   `--muziksiz` + platformun ticari kütüphanesinden popüler bir parçayla dene, farkı ölç.
8. **Ölçmeden karar verme riski.** Yukarıdakilerin hepsi tahmin; hangisinin gerçekten fark yarattığını ancak veriyle
   görürüz. Plan bu yüzden önce ölçüm kuruyor.

## Plan

**Seri ve tema eşlemesi** (pilotun ilk haftasında denenir, ikinci haftada kilitlenir):

| Seri | Şablon (öneri) | Ritim | Not |
|---|---|---|---|
| Artikel | Gece | haftada 2 | Kural serisi: her bölüm bir kural ya da tema (mutfak, ev, iş…) |
| Gerçek durum (diyalog) | Kâğıt | haftada 2 | Her bölüm bir Almanya durumu; yorumlardan konu seçtir |
| Kelime destesi | Lacivert | haftada 1 | 3 kelime, ~30 sn (bkz. eleştiri 2) |
| Hangisini duydun? | Lacivert | haftada 1 | Kaynak bol; bölüm başına bir ses karşıtlığı |
| Cümleyi kur | Gece / Turuncu | haftada 1 | Turuncu haftada en çok bir |

**Ritim (Samet, 2026-10-09):** günde 3 video, iki platforma aynı dosya; saatler Berlin 07:30, 12:30, 18:30. Yeni kısa
format yok, mevcut 20 tasarım. Claude iki haftalık parti (42 bölüm) üretir; Samet iki platformun kendi zamanlayıcısına
iki hafta ileriye koyar ve panelde "zamanlandı" işaretler (haftayı tek düğmeyle). İnsan yüzlü video pilotta yok; izlenme
iyi ama takip/kurulum zayıf kalırsa 2–3 tanesi deneme olarak çekilir.

**Faz 1, pilot (12–25 Ekim 2026, 42 video):**
- Hafta 1 (12–18 Ekim): 20 tasarımın her biri bir kez (001 bölümleri) + 1 diyalog. Tema karşılaştırması ilk haftadan.
- Hafta 2 (19–25 Ekim): aynı 20 tasarım yeni içerikle (002) + 1 diyalog; gün sırası 3 gün kaydırıldı (gün etkisi
  karışmasın). Her tasarımdan iki veri noktası.
- Roller: 07:30 hızlı test (artikel, duy), 12:30 kaydetmelik (kelime, kur), 18:30 ana video (diyalog); kurallar izin
  verdiğince.

**Faz 2, karar (26 Ekim haftası):** her bölüm için metrikler (`social_posts.metrics`) seri ve tema başına karşılaştırılır:
3 sn tutma (Instagram `reels_skip_rate`), ortalama izlenme, bitirme, 1000 izlenme başına kaydetme / paylaşma / yorum,
profil ziyareti, takip, kampanya bağlantısından kurulum. En zayıf yaklaşım azaltılır, en güçlü ikisi artar, her yaklaşım
için tema kilitlenir. Bir saat dilimi sürekli geride kalırsa günde 2'ye inilir.

**Faz 3, düzenli üretim:** iki haftada bir 42 bölüm. Plan bitmeden ~7 gün önce panel uyarır; Samet Claude'dan yeni
partiyi ister. Ayda bir bu belgedeki eleştiri ve plan veriyle güncellenir.

## Stüdyo (lernomi.app/studio)

Samet ve sosyal medya editörü (2026-10-09, Samet: "videodaki tüm metinleri istisnasız düzenleyebilmeli ve videoya
dönüştürmeden preview yapabilmeli; onay verirse video sunucuda üretilmeli, kalite kaybı olmadan alıp planlamayı
yapabilmeli").

- **Roller:** `ADMIN_EMAILS` panelin tamamı + stüdyo; `SOCIAL_EDITOR_EMAILS` YALNIZ stüdyo (kullanıcı verisi içeren
  panele 404). E-posta doğrulanmış olmalı; kaydetme/onay için hesapta iki adımlı doğrulama açık olmalı. Her yazma
  `admin_audit`e `studio.*` olarak düşer. Kod: `src/lib/studio-auth.ts`.
- **Akış:** Claude bölümü depoda yazar → sunucu işçisi aktarır → stüdyoda düzenle (canlı önizleme, sunucuyla aynı
  motor) → Kaydet (yeni sürüm) → Onayla ve üret → video sunucuda (30 sn video ≈ 5 dk, düşük öncelikle) → MP4 / kapak / açıklama KAYIPSIZ indirilir
  (sunucudaki dosyanın baytları) → platform zamanlayıcısı → takvimde "zamanlandı / yayında".
- **İstisnasız:** ekrandaki her yazı ya bölüm verisinden ya şablonun `meta.ui` sabit yazılarından gelir (bölüm
  `copy.ui` ile ezer). Kapı: `npm run social:texts` (veriye/ui'ye dayanmayan yazı = hata). Yeni şablonda gömülü yazı
  bırakılmaz.
- **Kurallar (`src/lib/studio.ts`):** yalnız metin değişir (yapı, öğe sayısı, kimlik alanları `who/icon/avatar/key/typ`
  ve satırdaki `scene` kilitli); her kayıt sürüm, geri dönüş yeni sürüm; eşzamanlı düzenlemede 409; onaydan sonra metin
  değişirse onay düşer, kuyruktaki üretim iptal. Saat: aynı saate iki bölüm yok (hata), diğer takvim kuralları uyarı.
- **Ses (Samet: "yalnız Defne"):** seslendirilen Almanca metin değişirse Defne kaydı gerekir; kaydı yoksa onay kapalı.
  Ses bekçisi (`scripts/tts-own-watch.ts`, gece + deploy) stüdyo metinlerini `eksik.jsonl`e yazar (`word_social` /
  `example_social`), Mac `eksik_mac.sh` sabah 08:40'ta üretip yayınlar; stüdyo kaydı görünce onay açılır.
- **Sunucu işçisi (`scripts/social/worker.mjs`):** `lernomi-social-worker.timer` ~20 sn'de bir: depo değiştiyse
  aktarım (düzenlenmiş veriye dokunmaz, `origin_changed` der; stüdyoda değişen saati korur; depodan kalkan bölüm
  arşivlenir), takılan üretimi kapatma, kuyruktaki bir üretim (Defne ve yerleşim yeniden denetlenir). Çıktı
  `SOCIAL_DIR/out/<bölüm>/r<sürüm>-<üretim>/`; aynı bölümün eski videosunun dosyaları silinir. Aktarım durumu
  `SOCIAL_DIR/import-state.json`.
- **Takvim:** açılışta bugünün haftası; plan sürükle-bırakla değişir (`/api/studio/plan`, `lib/studio` moveEpisode):
  dolu saate bırakılan iki bölüm yer değiştirir, geçmiş saate bırakılamaz, takvim dışına bırakılan bölümün saati
  kalkar; sonuç, takvim uyarıları ve "Geri al" bildirimde. Editörde "dinle" düğmesi alanın Defne kaydını çalar.
- **Sunucu tarayıcısı:** Playwright'ın tam Chromium'u (`launchBrowser`, headless shell değil; Mac'le aynı çizim),
  sRGB sabit; `/opt/lernomi/social/browsers`. 30 sn'lik video ≈ 5 dk (Nice 10, en çok 2 çekirdek).
- **Tablolar:** `social_episodes` (veri, saat, onay), `social_revisions`, `social_renders`, `social_requests` (talepler), `social_posts` (platform).

**Claude yeni parti yazarken:** stüdyoda değişen saatleri ve metinleri görmek için önce canlı takvime bak
(`ssh lernomi` + `psql` okuma: `select id, slot, edited from social_episodes where archived_at is null order by slot`).
Depodaki bir bölümü değiştirmek stüdyoda düzenlenmişse onu ezmez (editöre "Claude güncelledi" çıkar); düzenlenmemişse
yeni sürüm olarak gelir ve onayı düşer.

## Platform API'leri (araştırma 2026-10-09, resmi belgeler)

| | Metrik okuma | Yayınlama | Zamanlanmışları okuma |
|---|---|---|---|
| **Instagram** | Var. "Instagram API with Instagram Login", `instagram_business_basic` + `instagram_business_manage_insights`, Standard Access: kendi hesabımız için **inceleme yok**, Facebook sayfası gerekmez. Reels: `views`, `reach`, `likes`, `comments`, `saved`, `shares`, `ig_reels_avg_watch_time`, `reels_skip_rate`… (48 sa gecikme) | Var (`instagram_business_content_publish`, inceleme yok, `is_ai_generated`), ama **ileri tarih parametresi yok**: kendi cron'umuzla yayınlanır | Yok |
| **TikTok** | Display API (`video.list`): yalnız sayılar (izlenme, beğeni, yorum, paylaşım); sandbox'ta incelemesiz çalışıp çalışmadığı denenmeli. İzlenme süresi ve tamamlama için TikTok API for Business (`video.insights`), uygulama onayı gerekir | Pratikte yok: denetimsiz uygulamada gönderi gizli kalır; "kendi hesabına yükleme aracı" denetimden geçemez (yönergeler) | Yok |

Belirteçler: Instagram uzun ömürlü belirteç 60 gün, `refresh_access_token` ile yenilenir (sunucuda ~30 günde bir cron).
TikTok erişim belirteci 24 saat, yenileme belirteci 365 gün.

**Sıra:** (1) Instagram metrik eşitlemesi (Samet: hesabı Professional yap, developers.facebook.com'da Business uygulaması +
Instagram ürünü "API setup with Instagram login", Lernomi hesabını tester ekle, belirteci `.secrets/` altına koy; Claude
sunucuya, `social_posts` eşitleme cron'una ve belirteç yenilemeye bağlar; gönderiler açıklama + saatle bölüme eşlenir).
(2) TikTok Display API sandbox'ı dene; yetmezse Business API başvurusu. (3) İstenirse Instagram'a otomatik yayın
(kendi cron'umuz). TikTok'ta yayın elle kalır.

**Kapasite (2026-10-08 ölçümü):** cümleyi kur için 1795 kısa sesli cümle, kelime destesi için 2754 sesli kelime,
artikel için 2343 sesli isim (yalnız -ung → die 215 kelime): yıllarca yeter. "Hangisini duydun?" için `confusables.json`daki
1527 çiftin 1483'ünde iki kelimenin de sesi var; listede olmayan, 1–2 harf farklı sesli 464 çift daha var; Türk kulağına
zor karşıtlıklı (uzun/kısa ünlü, ä/e, ch/sch, b/p…) kaba sayım ~600. Bölüm başına 3–4 çiftle yüzlerce bölüm eder.
Defne kapsamı 4528/8704 kelime ve büyüyor; kapsam arttıkça aday da artar.
