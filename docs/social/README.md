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
npm run social:audit [-- <şablon> …]      # yerleşim denetimi, Chrome + Safari motoru (WebKit)
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
     content: ({ deck }) => ({
       items: deck(["…", "…"]),
       copy: { title: "…", hook: ["…", "…"], caption: "…\n\n#…", outro: { series: "…", ask: "…" } /* + şablona özgü */ },
     }),
   };
   export default episode;
   ```
5. **Denetle:** `npm run social:check` (hata yok) → `npm run social:gallery -- --no-posters` →
   `npm run social:audit -- <şablon>` (sorun yok) → kareleri gözle gör (oynatıcıda ya da ekran görüntüsüyle).
   Denetim aracı taşma, çakışma, kutu dışı yazı ve güvenli alanı ölçer, ama "anlamlı mı, doğal mı" sorusunu ölçmez:
   metni yüksek sesle oku.
6. **Üret:** `npm run social:render -- <bölüm-id>`. Çıktı satırında süre, ses (−14 LUFS civarı) ve sayfa hatası yok.
7. **Durumu "hazır" yap**, yalnız bölüm dosyasını commit et.
8. **Yayından sonra** (Samet söyleyince): `status: "yayında"`, `published: "YYYY-AA-GG"`, istenirse `links` ve
   `metrics` (aşağıda). Yayındaki bölümün içeriği değiştirilmez.

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
  ikisinin de sesi var, ikisi de günlük kelime. Veride 815 aday var ama çoğu zayıf; en kıt kaynak bu, idareli kullan.
- **"Cümleyi kur" cümleleri:** 4–7 kelime, A1–B1, tek bir dilbilgisi fikri. İpucu iki noktasız ve kesin.

**Türkçe ekran metni:** Türk bir içerik üreticisinin konuşma diliyle. Çeviri kokan, iki nokta üst üsteli, robotik
kalıp yok. Kötü: "Sıra sende: sesli söyle", "Skorunu yorumlara yaz: _ / 4", "4 cümleyle hallet". İyi: "Şimdi sen
söyle", "Kaç tane bildin? Yorumlara yaz", "Bu 4 cümle yetiyor". Açıklamanın ilk satırı aranabilir bir cümle olsun
("Almanca doktor randevusu", "Almanca artikel kuralı"): iki platform da arama motoru gibi çalışıyor.

## Tasarım standardı

- **Izgara:** yazı alanı x 96–930 (sağda düğme sütunu), ortalananlar 513 ekseninde, dikey 250–1530 (üstte sekmeler,
  altta açıklama). Boşluk 8'in katları; köşe kart 48, kutu 32, hap yüksekliğin yarısı; kutuda yazıya ≥24 px dolgu.
- **Kanca:** ilk karede soru ya da dert. `E.hook` satırları yazı boyunun 1,16 katı aralıkla dizer, sığmayanı küçültür.
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
| Süre | 28–43 sn (şimdiki bölümler) | Bkz. eleştiri: 30 sn altı hedef |
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
2. **Süre uzun.** Kelime desteleri 42–43 sn, diyaloglar 28–34 sn. Eğitici kısa videoda bitirme oranı 30 sn'den sonra
   hızla düşüyor ve bitirme oranı dağıtımın ana sinyali. → Desteler 3–4 kelime (~30 sn) ya da "1/2, 2/2" bölümler
   (seri takibi de getirir). Kapanış 5 sn sürüyor; özet + kapanış 3 sn'ye inerse döngü (ikinci izleme) artar.
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
| Kelime destesi | Lacivert | haftada 1 | 3–4 kelimeye kısalt (bkz. eleştiri 2) |
| Hangisini duydun? | Lacivert | haftada 1 | Kıt kaynak: idareli |
| Cümleyi kur | Gece / Turuncu | haftada 1 | Turuncu haftada en çok bir |

**Faz 1, pilot (2 hafta, günde 1, 14 video):**
- Hafta 1: her yaklaşım en az iki kez, farklı temalarla (aynı içerik iki kez yayınlanmaz).
- Hafta 2: eleştirideki 1 ve 2 numaralı değişiklikler uygulanmış sürümlerle aynı ritim.
- Aynı dosya TikTok ve Reels'e, aynı gün; saat ~18:30 Berlin (Almanya'daki Türk izleyici + Türkiye akşamı).
- İnsan yüzlü 2–3 video (Samet çeker).

**Faz 2, karar (3. hafta):** her bölüm için ölçümler bölüm dosyasına yazılır, seri başına karşılaştırılır:
3 sn tutma, ortalama izleme yüzdesi, bitirme, 1000 izlenme başına kaydetme / paylaşma / yorum, profil ziyareti,
takip, kampanya bağlantısından kurulum. En zayıf yaklaşım bırakılır, en güçlü ikisi haftada 2'ye çıkar, tema kilitlenir.

**Faz 3, düzenli üretim:** haftada 7 bölüm. Claude Code her pazartesi haftanın bölümlerini yazar, denetler, üretir
(`--status hazır`); Samet yükler ve yayından sonra durum ile ölçümleri bildirir. Ayda bir bu belgedeki eleştiri ve
plan veriyle güncellenir.

**Ölçüm alanı (bölüm dosyasında, yayından ~7 gün sonra):**
```js
metrics: { tiktok: { views, avgWatchPct, completionPct, likes, comments, shares, saves, follows }, reels: { … }, installs: { tiktok, reels } },
```

**Kapasite (2026-10-08 ölçümü):** cümleyi kur için 1795 kısa sesli cümle, kelime destesi için 2754 sesli kelime,
artikel için 2343 sesli isim (yalnız -ung → die 215 kelime): yıllarca yeter. "Hangisini duydun?" için 815 aday çiftin
çoğu zayıf; elle seçildiğinde birkaç düzine bölüm. Ses kapsamı Defne kayıtları arttıkça büyür.
