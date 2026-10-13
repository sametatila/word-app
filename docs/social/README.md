# Sosyal videolar (TikTok + Instagram Reels + YouTube Shorts)

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
     ytTitle: "Almanya'da ev ilanında göreceğin 3 Almanca kelime #almanca #shorts", // takvimdeki bölümde zorunlu
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
("Almanca doktor randevusu", "Almanca artikel kuralı"): üç platform da arama motoru gibi çalışıyor. YouTube'da
başlık ayrı alan: bölüm dosyasında `ytTitle` (takvimdeki her bölümde zorunlu, `social:check` denetler).

**YouTube başlığı (`ytTitle`):** en çok 100 karakter, `<` `>` yok (YouTube kuralı), sonu `#shorts` (önünde konu etiketi:
`#almanca #shorts`). Aranabilir konu başta ("Almanca doktor randevusu…", "Kiste mi, Küste mi?"): Shorts akışında ilk
~40 karakter görünür. Açıklamanın ilk cümlesinin kopyası değil; tık tuzağı, büyük harfle bağırma, "ücretsiz" yok.
Saat gibi yayın bilgisidir, içerik değil: stüdyoda ayrı kaydedilir, yeni sürüm açmaz, onayı düşürmez; depoda
değişirse stüdyoda elle değiştirilmemişse onu izler. YouTube açıklaması = paylaşım metni + `#shorts` (stüdyo kopyalar).

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

## Format (TikTok + Instagram Reels + YouTube Shorts)

Üç platform aynı dosyayı kabul ediyor; güvenli alan hepsini karşılayacak şekilde kuruldu (oynatıcıdaki **Arayüz**
düğmesi sırayla TikTok, Reels ve Shorts düğmelerini üstüne koyar). Fark yalnız metinde: TikTok ve Instagram tek
açıklama, YouTube başlık + açıklama.

| | Değer | Neden |
|---|---|---|
| Görüntü | 1080×1920, 9:16, 30 fps, H.264 High, yuv420p (BT.709), CRF 18, 2 sn'de bir anahtar kare | Platformların önerdiği; yeniden sıkıştırmada kayıp az. 9:16 ve 3 dk altı YouTube'da kendiliğinden Short |
| Ses | AAC 192k 48 kHz, ≈ −14 LUFS, gerçek tepe ≤ −1 dBTP (yüklenecek dosyada ölçülür) | Platformlar bu civara çekiyor; yüksek verilen kısılır, çok düşük kalan sessiz duyulur |
| Süre | 28–38 sn (şimdiki bölümler; kelime desteleri 3 kelime, ~30 sn) | Bkz. eleştiri 2: 30 sn civarı hedef |
| Kapak | `kapak.jpg` (9:16) yüklenir | Akışta ve profilde görünen kare |
| Profil ızgarası | `kapak-3x4.jpg` (orta 1080×1440) kontrol için | TikTok ve Instagram profilde 3:4 kesit gösteriyor; kanca bu bölgede okunmalı |
| Açıklama | `aciklama.txt`: ilk satır aranabilir cümle + 5–6 etiket (üç platformda aynı) | Instagram'da 3–5 etiket yeterli, fazlası işe yaramıyor; YouTube ilk 3 etiketi başlığın üstünde gösterir |
| YouTube başlığı | bölümün `ytTitle`ı (en çok 100 karakter, `<` `>` yok, sonu `#shorts`); stüdyoda Paylaşım adımı | YouTube'da başlık ayrı ve aramada en ağır alan; `#shorts` Shorts rafına girmesine yardım eder; Shorts açıklamasındaki bağlantılar tıklanmıyor |
| YouTube açıklaması | paylaşım metni + `#shorts` (stüdyoda "YouTube açıklaması" Kopyala) | Etiketler üç platformda aynı kalır |

**Yükleme kontrol listesi (Samet):** MP4 ve kapak stüdyoda bölümün indirme düğmelerinde; açıklama ve YouTube başlığı 5. adımda (Paylaşım) "Kopyala" ile.
- Kapak olarak `kapak.jpg`'yi seç. Açıklamayı Paylaşım'dan kopyalayıp yapıştır.
- **YouTube Studio:** başlık ve "YouTube açıklaması" Paylaşım'daki "Kopyala" düğmelerinden; "Hayır, çocuklara özel değil"; görünürlük
  **Planla** → bölümün saati (Berlin). Takvim zamanlanmış Short'u kendisi bulur, elle işaretleme yok.
- **Yapay zekâ etiketi:** ses Defne (yapay sentez). TikTok gerçekçi yapay zekâ içeriğine etiket istiyor; etiketi açmak
  güvenli taraf (etiketin dağıtımı kısmadığını söylüyorlar). Instagram'da "AI info" (otomatik yayında işçi koyuyor).
  YouTube'da "Değiştirilmiş veya yapay içerik: Evet".
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

**Ritim (Samet, 2026-10-09; YouTube 2026-10-12):** günde 3 video, üç platforma aynı dosya; saatler Berlin 07:30, 12:30,
18:30. Yeni kısa format yok, mevcut 20 tasarım. Claude iki haftalık parti (42 bölüm) üretir; Samet TikTok'un ve
YouTube'un kendi zamanlayıcısına iki hafta ileriye koyar, Instagram'ı stüdyoda "Otomatik" yapar. TikTok'u panelde
"zamanlandı" işaretler (haftayı tek düğmeyle); YouTube zamanlananları takvim kendisi bulur. İnsan yüzlü video pilotta yok; izlenme
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

## Yatay: YouTube uzun video (2026-10-13)

Samet (2026-10-13): haftada 2 uzun video (10–15 dk, 1920×1080), yalnız YouTube (TikTok'a tek tük deneme). Yüz yok;
sesler Mac'te Defne, Aras, Can ve Mira. Uygulama ekran kaydı değil, dikey videolardaki gibi tasarlanmış sahne. Akış:
Claude yazar → editör stüdyoda düzeltir (önizleme, video üretmeden) → Samet seslendirir → onay → sunucuda video.

| Yer | Ne |
|---|---|
| `scripts/social/yatay/motor.js` | Yatay motor (`window.Y`): 12 sütunlu ızgara, sabit bölgeler (bölüm şeridi, künye, içerik alanı, iki satırlık altyazı), sahne sistemi, ortak sahneler (bölüm kartı, uygulama kartı, 20 sn bitiş ekranı), yerleşim denetimi |
| `scripts/social/yatay/sablonlar/<seri>.js` | Seri şablonları: `yuru` (Yürürken Almanca, Lacivert) · `sinav` (A1 Sınavı, Kâğıt) · `duy` (Hangisini Duydun?, Gece) · `gunluk` (Almanya'da Günlük Hayat, Turuncu) · `artikel` (Artikel Kuralları, Kâğıt) · `hikaye` (Yavaş Almanca Hikâyeler, Lacivert) |
| `data/social/yatay/<seri>-<NNN>.mjs` | Bölümler; stüdyoda kimlik `yatay-<seri>-<NNN>` (format "yatay") |
| `scripts/social/yatay/{icerik,sayfa,uret,aciklama,arac}.mjs` | Yükleme ve kurallar · sayfa · üretim (MP4, kapak 1280×720, açıklama) · YouTube açıklaması · yerel araç |
| `~/Workspace/tts-test/yatay_mac.sh <talep>` | Mac: talepteki satırları dört karakterle üretir, canlı tabloya ekler |

```bash
npm run social:yatay                                   # yatay bölümler: yükleniyor mu, tekrar/takvim, eksik ses
npm run social:yatay -- <id> --sunucudan --cizelge     # süre, bölümler, YouTube açıklaması (sesler sunucudan okunur)
npm run social:yatay -- <id> --denetle --kare 3,40     # yerleşim denetimi + kareler (.shots/social/yatay/<id>/)
npm run social:yatay:render -- <id> --sure 30          # yerel deneme üretimi (ilk 30 sn)
```

**Satır:** seslendirilen her metin bölüm verisinde `{ v: ses, l: dil, t: metin, x?: tür }` (`x: "listen"` sınav dinleme
kaydı). Ses anahtarı `ses|dil|metin[#tür]`; motor kaydın süresini kullanır, kaydı yoksa süreyi metinden tahmin eder ve
altyazı etiketi kesikli çizilir (önizleme). Kayıt gelince çizelge kendiliğinden kayar. Stüdyoda `v`, `l`, `x` kilitli,
yalnız metin değişir; değişen metin yeni kayıt ister. Şablonun sabit yazıları (`ui`) bölüm verisine kopyalanır: ekrandaki
her yazı düzenlenebilir.

**Ses talebi (bölüm başına tek talep):** editör "Seslendirmeye gönder" der → Telegram + Talepler (ses ve dile göre
gruplu) → Samet Mac'te `yatay_mac.sh <talep>` → kayıtlar tabloya eklenir, talep kendiliğinden kapanır. Talep olmadan
(ör. yeni partinin eksikleri): `yatay_mac.sh --dosya <anahtarlar.txt> <ad>`.

**Türkçe anlatımda Almanca kelime yok** (Türkçe ses bozuk okur): "bu sonla biten" gibi yazılır, Almanca ekranda.
Kaçınılmazsa (artikeller, "Bürgeramt") `yatay_mac.sh`'ın ALMANCA listesi kelimeyi «…» ile işaretler ve Almanca okutur
(`kelimeler.synth_mixed`); kayıt anahtarı düz metin. Ortak satırlar (nasıl çalışır, hızlı tekrar, uygulama) bölümler
arasında aynı metin = aynı kayıt.

**Takvim:** saat serbest (önerilen 19:00 Berlin), günde tek uzun video (hata), art arda aynı seri uyarı; dikey
kurallarına girmez (saat, tema, 30 gün ortak kelime). Takvimde üç saatin altında "uzun" şeridi. Platform işçileri 3
dakikadan uzun videoyu yalnız yatay bölümle, kısa videoyu yalnız dikeyle eşler (19:00'daki uzun video 18:30 Short'unun
penceresine düşüyordu); Instagram yatayı hiç eşlemez.

**Üretim, iki yol (stüdyoda onay düğmesi seçer):**
- **Mac'te üret (önerilen, ~15 dk):** iş `social_renders.target = 'mac'`. Mac'te launchd `app.lernomi.yatay-uret`
  dakikada bir `scripts/social/yatay/mac.mjs`: ssh ile `/opt/lernomi/social-mac.sh --mac-claim` (Mac görüldü →
  `SOCIAL_DIR/mac-status.json`, stüdyo "Mac açık" der), işi alır, sesleri sunucudan çeker, **sunucunun motor kaynağıyla**
  üretir (Mac'teki kopya geride kalsa da kare aynı), dosyaları `out/<bölüm>/r<sürüm>-<iş>/`e rsync'ler, `--mac-done`.
  20 sn'de bir `--mac-beat`; bağlantı koparsa sunucu 3 dk sonra işi "failed" yapar. Mac kapalıysa iş bekler, stüdyoda
  "Sunucuya al".
- **Sunucuda üret (~1 sa):** `lernomi-social-render.timer` → `/opt/lernomi/social-render.sh` → `worker.mjs --uzun`
  (yalnız `target = 'server'`, zaman aşımı 4 sa, `render.lock`). Ölçüm 2026-10-14: 45 sn video 227 sn (≈5×).
1920×1080, 30 fps, CRF 18, −14 LUFS; ses Node tarafında karışır (kayıtlar zamanlarına, efektler motorla aynı formülle).
Kapak 1280×720 (YouTube küçük resmi), açıklama: bölümün metni + bölüm listesi (motorun zamanlarından; ilk 0:00, her
bölüm ≥ 10 sn) + kampanya bağlantısı (`utm_source=youtube&utm_campaign=<bölüm>`) + etiketler. YouTube başlığında
`#shorts` yok. Son 20 sn bitiş ekranı: soldaki daireye "abone ol", sağdaki 16:9 kutuya "video" öğesi.

**Plan (Samet, 2026-10-13: 16 Ekim başlangıç, 8 video / 4 hafta):** salı ve cuma 19:00 (Berlin). Sınav ve Yürürken
ikişer, Günlük hayat, Hangisini duydun, Artikel ve Hikâye birer. Her hafta bir "dinle, tekrar et" türü, bir
etkileşimli tür. Ölçüt (4 hafta sonra): ortalama izleme süresi, abone kazanımı, açıklamadaki bağlantıdan kurulum.

## Stüdyo (lernomi.app/studio)

Samet ve sosyal medya editörü (2026-10-09, Samet: "videodaki tüm metinleri istisnasız düzenleyebilmeli ve videoya
dönüştürmeden preview yapabilmeli; onay verirse video sunucuda üretilmeli, kalite kaybı olmadan alıp planlamayı
yapabilmeli").

- **Sayfalar:** `/studio` Genel bakış (üç platformun istatistikleri, ilk sayfa), `/studio/takvim` takvim,
  `/studio/<bölüm>` editör (iki sekme: İçerik ve onay · Paylaşım; onaylı ve videosu hazır bölüm Paylaşım'da açılır: video ve indirme, kopyalanacak açıklama + YouTube başlığı/açıklaması, yayın saati, platform başına durum ve o platformun Kopyala düğmeleri; `?sekme=paylasim`), `/studio/<bölüm>/performans` videonun performansı, `/studio/requests` Defne talepleri.
- **Tazeleme ve eski sayfa (2026-10-13; Samet: "yenileme yapıldığında değişiklik etki etmiyor"):** işçiler durumu ve
  metrikleri arka planda yazıyor; stüdyo sayfaları sekme görünürken dakikada bir, sekmeye dönünce ve geri/ileri
  düğmesinden sonra kendiliğinden tazelenir (`src/app/studio/refresh.tsx`). Takvim ve editör yeni veriyi taslağı ezmeden
  alır (kaydedilmemiş metin, elle değiştirilmiş platform alanı korunur). Platform durumu kaydı formun gördüğü
  `updatedAt`ı taşır: satır o arada değiştiyse (işçi "Yayında" yaptı) yazılmaz, güncel durum yüklenir. Toplu işaret
  yalnız satırı olmayan ("Planlandı") bölümlere yazar.
- **İstatistik (2026-10-12; Samet: "3 platformun istatistiklerini doğru harmanlayarak hem genel hem postlara özel"):**
  hesap `src/lib/social-stats-core.ts` (test `npm run test:social-stats`), okuma `src/lib/social-stats.ts`.
  Harmanlama: izlenme üç platformda oynatma sayısı → toplanır; etkileşim = beğeni + yorum + paylaşım + kaydetme (hangisi
  varsa; kaydetme yalnız Instagram); erişim yalnız Instagram (toplanmaz); ortalama izleme Instagram + YouTube'dan,
  izlenmeyle ağırlıklı (TikTok API'si vermiyor), oran = süre / video süresi. Toplamlar aralıkta yayınlanan videoların
  bugünkü değeri; günlük grafik o gün KAZANILAN izlenme; yaklaşım / saat / tema karşılaştırması "ilk 24 saat" ile
  (yaşa göre yanıltmasın). Geçmiş: işçiler her eşitlemeden sonra `scripts/social/lib/stats.mjs` ile
  `social_post_snapshots` (ilk 7 gün saatte bir, sonra günde bir) ve `social_account_days` (günlük takipçi) yazar;
  geçmiş 2026-10-12 akşamı başladı.
- **Roller:** `ADMIN_EMAILS` panelin tamamı + stüdyo; `SOCIAL_EDITOR_EMAILS` YALNIZ stüdyo (kullanıcı verisi içeren
  panele 404). E-posta doğrulanmış olmalı; kaydetme/onay için hesapta iki adımlı doğrulama açık olmalı. Her yazma
  `admin_audit`e `studio.*` olarak düşer. Kod: `src/lib/studio-auth.ts`.
- **Akış:** Claude bölümü depoda yazar → sunucu işçisi aktarır → stüdyoda düzenle (canlı önizleme, sunucuyla aynı
  motor) → Kaydet (yeni sürüm) → Onayla ve üret → video sunucuda (30 sn video ≈ 5 dk, düşük öncelikle) → MP4 / kapak / açıklama KAYIPSIZ indirilir
  (sunucudaki dosyanın baytları; açıklama ve YouTube başlığı Paylaşım'da "Kopyala") → platform zamanlayıcısı → takvimde "zamanlandı / yayında".
- **İstisnasız:** ekrandaki her yazı ya bölüm verisinden ya şablonun `meta.ui` sabit yazılarından gelir (bölüm
  `copy.ui` ile ezer). Kapı: `npm run social:texts` (veriye/ui'ye dayanmayan yazı = hata). Yeni şablonda gömülü yazı
  bırakılmaz.
- **Kurallar (`src/lib/studio.ts`):** yalnız metin değişir (yapı, öğe sayısı, kimlik alanları `who/icon/avatar/key/typ`
  ve satırdaki `scene` kilitli; serbest alan `copy.ui`; YouTube başlığı veride değil, saat gibi ayrı kaydedilir); her kayıt sürüm, geri dönüş yeni sürüm; eşzamanlı düzenlemede 409; onaydan sonra metin
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

Belirteçler: Instagram uzun ömürlü belirteç 60 gün, `refresh_access_token` ile yenilenir. TikTok erişim belirteci 24 saat,
yenileme belirteci 365 gün.

### Instagram: kurulu (2026-10-10)

Meta uygulaması **Lernomi** (developers.facebook.com, geliştirme modu yeterli: yalnız kendi hesabımız; işletme portföyü
PraktikaDeutsch), ürün "Instagram API with Instagram Login", hesap **lernomi_app** (içerik üreticisi, Instagram tester).
İzinler `instagram_business_basic`, `instagram_business_manage_insights`, `instagram_business_content_publish` (Business
login ayarlarının verdiği embed adresinde mesaj/yorum izinleri de var, kullanılmıyor). Yönlendirme adresi
`https://www.lernomi.app/`. Yerelde `.secrets/instagram/` (`id`, `api` = uygulama gizli anahtarı, `token`).

İşçi `scripts/social/instagram.mjs` (başındaki yorum ayrıntılı), sunucuda `lernomi-social-ig.timer` dakikada bir →
`/opt/lernomi/social-ig.sh` (repo dışı, video işçisinin eşi). Belirteç `/opt/lernomi/social/instagram/token.json` (600,
`lernomi`; `.env`'de değil çünkü işçi 7 günde bir yeniler ve dosyaya yazar). Durum `instagram/status.json` (belirteçsiz),
stüdyo takviminde "Instagram API" etiketi.

- **Eşitleme:** hesabın Reels gönderileri (fotoğraf ve karusel sayılmaz) saatinden bölüme eşlenir (gönderi saatten 30 dk önce – 3 sa sonra; her saatte tek
  bölüm), satır "Yayında" olur, bağlantı ve kimlik yazılır. Elle (Instagram uygulamasından ya da Meta zamanlayıcısından)
  paylaşılan video da tanınır.
- **Metrikler:** `views`, `reach`, `likes`, `comments`, `shares`, `saves`, `interactions`, `avgWatchSec`
  (`ig_reels_avg_watch_time`). İlk 3 gün saatlik, 30 güne kadar 6 saatte bir, 90 güne kadar günde bir.
- **Otomatik yayın:** Instagram durumu **Otomatik** olan bölüm saatinde yayınlanır (takvimde "N videoyu otomatik yayına
  al", editörde Yayın kutusu). Şart: güncel sürüm onaylı ve videosu sunucuda hazır. Saatten 20 dk önce kap açılır;
  Instagram MP4'ü ve kapağı **imzalı, 3 saatlik adresten** (`/api/studio/file/<üretim>?k=mp4|kapak&exp&sig`,
  HMAC `BETTER_AUTH_SECRET`) baytı baytına çeker. Kap `is_ai_generated=true` ile açılır (Defne sesi; elle yüklemedeki
  "AI info" etiketi, yayından sonra eklenemiyor). Bu API dosya yüklemeyi kabul etmiyor: `upload_type=resumable`
  "The parameter video_url is required" diyor (2026-10-10, v21–v24 denendi). Saat gelince `media_publish`. Video hazır
  değilse saatinde Telegram, 3 saat sonra hâlâ olmadıysa **Yayınlanamadı** + Telegram (yeniden "Otomatik" tekrar dener).
  İki kez yayın yok: yayın adımı satırı "publishing"e kilitler; yarıda kalırsa kabın durumu (`PUBLISHED`/`FINISHED`)
  karar verir. "Zamanlandı" (platformun kendi zamanlayıcısı) satırlarına dokunulmaz; ikisini aynı bölümde kullanma.
- **Deneme (yayınlamadan):** `node scripts/social/instagram.mjs --dry <bölüm>` kabı açar ve Instagram'ın işlemesini
  bekler, `media_publish` çağırmaz (kap 24 saatte düşer). `--check` hesap ve belirteç günü.
- **Belirteç biterse / iptal olursa** (Telegram "[UYARI] Instagram …"): uygulama paneli › Instagram › API setup with
  Instagram login › Business login settings'teki embed adresiyle yeniden yetki ver ya da "Generate token"; yeni belirteç
  `token.json`a (`{"token","refreshedAt","expiresAt"}`, 600, sahibi `lernomi`).

### TikTok: API kurulu (2026-10-12)

TikTok for Developers uygulaması **Lernomi**, **sandbox** (inceleme yok; hedef kullanıcı @lernomi_app, gerçek veri
dönüyor), Login Kit + `user.info.basic`, `user.info.stats`, `video.list` (yayın ürünleri bilerek yok: denetimden
geçmez). Yönlendirme `https://www.lernomi.app/`. Yerelde `.secrets/tiktok/` (`key`, `secret`, logo). İşçi
`scripts/social/tiktok.mjs` (başındaki yorum ayrıntılı), sunucuda `lernomi-social-tt.timer` 5 dakikada bir →
`/opt/lernomi/social-tt.sh` (repo dışı). Belirteç `/opt/lernomi/social/tiktok/token.json` (600, `lernomi`; uygulama
anahtarları da içinde, yenileme onları ister; erişim 24 sa, yenileme 365 gün). Durum `tiktok/status.json`, stüdyo
takviminde "TikTok API" etiketi.

- **Eşitleme:** yalnız yayındaki videolar listede (zamanlanmış görünmez). Önce Samet'in yazdığı bağlantıdaki kimlikle,
  yoksa saatinden bölüme eşlenir (saatten 30 dk önce – 3 sa sonra); satır **Yayında** olur.
- **Metrikler:** `views`, `likes`, `comments`, `shares` (Display API bu kadar; izlenme süresi/tamamlama yok, onlar
  TikTok Studio'da ya da Business API onayıyla). Tek istekte bütün videolar: 90 güne kadar saatte bir. Hesap: takipçi,
  video sayısı.
- **Yayın denetimi:** "Zamanlandı" satırı saatten 20 dk sonra hâlâ yayında değilse bir kez Telegram. API çalışmıyorsa
  herkese açık oEmbed'e düşer (`https://www.tiktok.com/oembed?url=…`: zamanlanmış/gizli video 400, yayındaki 200).
- **Yeniden yetki** (Telegram "[UYARI] TikTok …"; 365 günde bir ya da iptal): `https://www.tiktok.com/v2/auth/authorize/?client_key=<key>&scope=user.info.basic,user.info.stats,video.list&response_type=code&redirect_uri=https%3A%2F%2Fwww.lernomi.app%2F&state=<rastgele>`,
  dönen `code` → `POST https://open.tiktokapis.com/v2/oauth/token/` (`grant_type=authorization_code`), sonuç
  `token.json` biçimine (`clientKey, clientSecret, accessToken, refreshToken, expiresAt, refreshExpiresAt`).
- `node scripts/social/tiktok.mjs --check` hesap ve belirteç; `--check <bağlantı>` tek videonun oEmbed durumu.

### YouTube Shorts: okuma kurulu (2026-10-12)

Google Cloud projesi **nomi-507213**: YouTube Data API v3 + YouTube Analytics API açık, OAuth istemcisi
**lernomi-youtube** (Desktop; onay Mac'te yerel adresle alındı), izin ekranı **In production** (2026-10-12'de Testing'ten
alındı: Testing'te yenileme belirteci 7 günde düşer). Kanal **Lernomi (@lernomiapp)**, `UCrN2aZ1K-GBa6ncnC5bdMyw`.
İzinler `youtube.readonly`, `yt-analytics.readonly`, `youtube.upload`. Yerelde `.secrets/youtube/` (`client.json`,
`token.json`). İşçi `scripts/social/youtube.mjs` (başındaki yorum ayrıntılı), sunucuda `lernomi-social-yt.timer` 10
dakikada bir → `/opt/lernomi/social-yt.sh` (repo dışı). Belirteç `/opt/lernomi/social/youtube/token.json` (600,
`lernomi`). Durum `youtube/status.json`, stüdyo takviminde "YouTube API" etiketi.

- **Eşitleme:** kanal sahibi zamanlanmış videoları da görür. YouTube Studio'da bölümün saatine zamanlanan Short
  (`publishAt`, saatten 30 dk önce – 3 sa sonra) kendiliğinden **Zamanlandı** + bağlantı; herkese açılınca **Yayında**.
  Liste dışı ve taslak videolar sayılmaz.
- **Metrikler:** videos.list saatte bir (`views`, `likes`, `comments`; anlık) + Analytics API 6 saatte bir (`watchMin`,
  `avgWatchSec`, `avgViewPct`, `shares`, `subsGained`; 1–2 gün gecikmeli). Kanal: abone sayısı.
- **Denetim:** "Zamanlandı" saatinden 20 dk sonra hâlâ herkese açık değilse bir kez Telegram.
- **Yükleme (henüz yok):** API ile yükleme ve gerçek zamanlama (`status.publishAt`, `containsSyntheticMedia`) mümkün,
  ama doğrulanmamış projeden yüklenen video "gizli"ye kilitlenir: YouTube API Services denetimi (audit) gerekir. Onaya
  kadar Short'lar YouTube Studio'dan elle zamanlanır. Kota: yükleme ~1.600 birim, günlük 10.000.
- `node scripts/social/youtube.mjs --check` kanal ve son yüklemeler.
- **Yeniden yetki** (Telegram "[UYARI] YouTube …"; şifre değişimi, izin iptali): Desktop istemcisiyle yerel adresli
  OAuth (PKCE, `access_type=offline`, `prompt=consent`), çıkan yenileme belirteci `token.json`a
  (`clientId, clientSecret, refreshToken`).

**Sıra:** (1) Instagram ✅ (yukarıda). (2) TikTok ✅ (sandbox, metrik + yayın denetimi). TikTok'ta yayın elle kalır.
(3) YouTube okuma ✅; yükleme için denetim başvurusu.

**Kapasite (2026-10-08 ölçümü):** cümleyi kur için 1795 kısa sesli cümle, kelime destesi için 2754 sesli kelime,
artikel için 2343 sesli isim (yalnız -ung → die 215 kelime): yıllarca yeter. "Hangisini duydun?" için `confusables.json`daki
1527 çiftin 1483'ünde iki kelimenin de sesi var; listede olmayan, 1–2 harf farklı sesli 464 çift daha var; Türk kulağına
zor karşıtlıklı (uzun/kısa ünlü, ä/e, ch/sch, b/p…) kaba sayım ~600. Bölüm başına 3–4 çiftle yüzlerce bölüm eder.
Defne kapsamı 4528/8704 kelime ve büyüyor; kapsam arttıkça aday da artar.
