# Ekran görüntüsü çekimi (iOS simülatörü)

Tanıtım sayfasının (`public/landing/<çift>/`) ve ileride mağaza karelerinin ham ekranları
buradaki yöntemle çekiliyor. İlk çekim 2026-09-28; UI çalışmasından sonra aynı yolla
tekrarlanacak. Vitrin kuralları (ne gösterilir, ne gösterilmez) `docs/store/README.md`
"Vitrin kararları" ve "Kurallar"da; bu belge yalnız NASIL.

## Setler: dil ÇİFTİ başına

Tek içeriği çevirmek yetmiyor: her ziyaretçi kendi arayüzünü VE kendi kursunu görür.

| Set | Arayüz | Kurs | Nerede |
|---|---|---|---|
| `tr-de` | Türkçe | Almanca (öncelikli) | Türkçe sayfanın ana ekranları |
| `tr-en` | Türkçe | İngilizce | Türkçe sayfada İngilizce kursu gösteren yerler (dil yolları) |
| `en-de` | İngilizce | Almanca | İngilizce sayfa |
| `de-en` | Almanca | İngilizce | Almanca sayfa |

Sayfa hangi seti kullanacağını `src/content/landing.ts` `SCREEN_SET`ten okuyor; seti olmayan
dil `SCREEN_FALLBACK`e düşüyor. Set tamamlanınca oraya yazılır.

Her sette 7 ekran, her biri açık VE koyu tema (sayfa temaya göre değiştiriyor):

| Ekran (`<ekran>`) | Nereden | İçerik durumu |
|---|---|---|
| `home` | Öğren sekmesi | Günlük tur kutusu (maskot görünür), günün görevleri |
| `path` | Patika sekmesi | B1, ilk ünite "şu an", ilk adım bitmiş |
| `unit` | Patika › ilk ünite kartı | Konuşma adımı tamamlandı (yeşil tik), sıradaki "Şimdi" |
| `conversation` | Ünite › Konuşma adımı › sohbet | Kullanıcının TEK net hatası + doğru düzeltme + 3 öneri; yapay zekâ bildirimi görünür |
| `mock-task` | Öğren › Deneme sınavları › B1 › bir bölüm › Bölüme başla | Görev ekranı (süre sayacı, görev + anadil açıklaması) |
| `walk-intro` | Öğren › Yürüyüş modu | Başla ekranı (ipucunu anadilde duyarsın…) |
| `skills` | Beceriler sekmesi | B1, beş beceri sekmesi |

Konuşma karesi vitrinin en önemli karesi: yapay zekâ bazen yanlış düzeltme üretiyor (2026-09-28'de
"und ich arbeite gern" → bozuk Almanca). Karede yanlış düzeltme varsa o kare KULLANILMAZ; tek ve
bariz bir hatayla (ör. `seit drei Jahre` → `Jahren`) yeniden yazılır. Sayfadaki konuşma dökümü
(`landing.ts` `talk`) o çekimdeki konuşmadan birebir alınır.

## Hazırlık (bir kez)

- Xcode + iOS simülatörü "iPhone 18 Pro Max" (6.9", 1320×2868; App Store 6.9" karesiyle aynı).
- Maestro (simülatöre dokunma/yazma): `curl -fsSL https://get.maestro.mobile.dev | bash`
  (Java gerekir). Komut `~/.maestro/bin/maestro`.
- Hesap: **`screenshots@lernomi.app`**, parola `.secrets/screenshots/account` (yerel, git dışı).
  Üretimde, yalnız ekran görüntüsü için; e-postası veritabanında doğrulandı (Samet'in onayıyla,
  2026-09-28). Premium (2026-12-28'e dek, bonus): kareler kilitsiz ve kota şeridi olmadan çekilir.
  Süre dolunca yeniden vermek üretim veritabanına yazmak demek, Samet'e sorulur.
- Hesapta B1 seçili (Ayarlar › Öğrenme › Seviye). Onboarding'deki seviye seçimi hesaba geçmiyor.

## Akış

```bash
scripts/shots/sim.sh boot            # simülatör + 9:41 durum çubuğu, açık tema
scripts/shots/sim.sh build           # Release derle + kur (~10 dk; güncel main ile)
scripts/shots/sim.sh launch
scripts/shots/sim.sh peek home       # önizleme: .shots/peek/home.png (Claude Read ile bakar)
```

Ekranda gezinme: `tap <x%> <y%>` (yüzdeler TAM SAYI), `tapText "Metin"`, `back`, `scroll`,
`say "cümle"` (sohbet kutusuna yaz + gönder), `type "…"` (odaktaki kutuya). Her adımdan sonra
`peek` ile bakılır; koordinat önizlemedeki (414×900) konumun yüzdesi.

Dil değiştirmek: Profil (sağ üst avatar) › Ayarlar (sağ üst) › Uygulama › `tapText "English"` /
`"Deutsch"` / `"Türkçe"`. Almanca arayüze geçince kurs kendiliğinden İngilizceye döner
(Almanca kendi dilini öğretmiyor); Türkçeye dönünce kursu Ayarlar › Öğrenme'den seçmek gerekir.

Çekmek: ekran hazırken `scripts/shots/sim.sh cap <set> <ekran>` açık ve koyu temayı birlikte
kaydeder (`.shots/<set>/{light,dark}/<ekran>.png`). Sonra:

```bash
node scripts/shots/to-webp.mjs <set>      # → public/landing/<set>/<ekran>-<tema>-<480|720>.webp
```

ve `landing.ts` `SCREEN_SET`e set yazılır. Sayfayı yerelde görmek: `npx next dev -p 3100`,
Playwright ile `localhost:3100` (Accept-Language tr/en/de) açık ve koyu tema, 1440 ve 390 genişlik.

## Durum

Sayfadaki WebP'ler: dört set 7/7, açık ve koyu (2026-09-30, B paleti). `tr-en` sayfada KULLANILMIYOR
(`SCREEN_SET` dil başına tek set; "Diller" bölümü yalnız metin); set hazır tutuluyor.

Mağaza çekimi (2026-10-01, main c42be31a1 + 230eb9ae5 build'i): üç set dört cihazda tam, 75 kare; karelerin
kullandığı ham görüntüler `docs/store/raw/`. Tanıtım sayfasının dört seti aynı çekimden, konuşma dökümleri
(`landing.ts` `talk`) çekimdeki konuşmalardan birebir. Sonraki UI değişikliğinde değişen ekranlar aynı yolla
yeniden alınır.

## Tuzaklar (2026-09-28'de yaşandı)

- Maestro yüzde koordinatta ondalık kabul etmiyor (`"66.8%"` → NumberFormatException).
- Yüzde koordinat bazen kayıyor ya da dokunuş bir adım geç işleniyor (sürücü her çağrıda yeniden
  kuruluyor). Güvenilir yol: metinle `tapText`, olmazsa NOKTA koordinatı (`point: "75,196"`, 414×900
  önizlemedeki konumla aynı ölçek); öğenin kutusunu görmek için
  `~/.maestro/bin/maestro --device <udid> hierarchy`. Her dokunuştan sonra `peek`.
- Başka bir oturum ikinci bir simülatör açmış olabilir: `xcrun simctl … booted` yanlış cihaza gider;
  betik cihazı adıyla seçiyor, uygulamayı yeniden açmak için `sim.sh restart`.
- `tapText` aynı metni taşıyan başlığa gidebilir ("Hesap oluştur" başlık + düğme): düğmeye `tap` ile.
- `xcrun simctl privacy … grant` uygulamayı kapatır; yeniden `launch`.
- Sohbette her gönderimden sonra klavye kapanıyor: `say` kutuya her seferinde dokunuyor.
- Yürüyüş modu simülatörde ses duyamadığı için birkaç saniyede "Turu duraklattım"a düşer:
  `walk-intro` (başla ekranı) çekilir, tur ekranı çekilmez.
- Günlük turda kartlar anadilde ikinci satır taşır (bilinçli, `docs/plan/native-language.md`).
  Tanıtım sayfası ana ekrandaki günlük tur kutusunu, mağaza karesi "boşluğu doldur" kartını kullanıyor.
- Uygulamada hukuki güncelleme bildirimi ya da bildirim izni penceresi çıkarsa önce kapatılır;
  karede sistem penceresi kalmaz.
- Simülatörü iş bitince kapat: `xcrun simctl shutdown all` (Samet toplantıdayken açık kalmasın).

## Vitrin videosu kaydı (2026-10-02)

iPhone simülatöründe (tr-de: arayüz Türkçe, kurs Almanca, `screenshots@` Premium) `.shots/store-kit/rec.sh
start <ad>` / `rec.sh stop` (`xcrun simctl io <udid> recordVideo --codec=h264`, 1320×2868). Akış: Patika,
konuşma (Der Lebenslauf, "Baştan başla", anlatım `lecture-tr.yaml` ile geçilir, cümle yazılıp GÖNDER
düğmesine basılır), yürüyüş modu (giriş + tur), günlük tur (kartlar doğru cevaplanır), yazma bölümü
(`mockrun.sh` + `texts-de.sh`, sonuç ekranı). Kullanılan aralıklar `ffmpeg -ss … -to … -vf fps=30` ile
`docs/store/raw/video/<set>/<sahne>-N.mp4` olarak kesilir; ham uzun kayıtlar `.shots/store-kit/video/`.

Tuzaklar:
- Konuşmada ilk gönderim birkaç dakikalık boşluktan sonra "[Bağlantı sorunu. Tekrar dene.]" veriyordu
  (boşta ölen HTTP bağlantısı, iOS POST'u kendisi yeniden denemiyor, -1005). İstemci artık tekrarı
  zararsız isteği bir kez daha gönderiyor (`api/client` `send`, `replay`); build 16 ve öncesinde
  gezinmeden hemen sonra gönder.
- Simülatör mikrofonu Mac mikrofonunu duymuyor (Simulator'ın macOS mikrofon izni): yürüyüş turu
  "Duyamadım"a düşüp duraklıyor. Kurguda "Şimdi Almanca karşılığını söyle" anları kullanılır.
- Konum/izin değiştirmek (`simctl privacy`) uygulamayı kapatır; ilk açılışta mikrofon, konuşma tanıma
  ve yürüyüş açıklaması sorulur, kayıttan önce geçilir.

## Mağaza kareleri: dört cihaz (2026-09-29)

Mağaza karelerinin ham ekranları iPhone 18 Pro Max ve iPad Pro 13" (M5) simülatörü, Android telefon
(1080×2400) ve tablet (2560×1600) emülatöründe, imzalı release yapısıyla çekiliyor. Ekran listesi ve
kurallar `docs/store/README.md`; üretici `npm run store:frames -- --raw <kök>`. Çekim kiti
`.shots/store-kit/` (git dışı, yerel): cihaz kimlikleri betiklerin içinde.

| Betik | Ne yapar |
|---|---|
| `d.sh <iphone\|ipad\|aphone\|atab> <komut>` | Maestro sarmalayıcı: `launch`, `restart`, `tap x y`, `tapText`, `type`, `swipe`, `back`, `flow`, `peek`, `shot` |
| `cap.sh <cihaz> <set> <ekran> [both]` | `raw/<cihaz>/<set>/<tema>/<ekran>.png`; `both` açık + koyu |
| `ocr.mjs <cihaz> [find\|tap <regex>]` | Ekranı macOS Vision ile okur; metne göre dokunur (koordinat tahmini yok) |
| `daily-to-blank.sh` | Günlük turda kart türünü okuyup "boşluğu doldur" kartına kadar ilerler |
| `walk-burst.sh` (Android), `walk-burst-ios.sh` | Yürüyüş turunda art arda çekip uygun kareyi seçer |
| `conv-retry.sh` | Konuşma adımını baştan başlatır, anlatımı geçer (`lecture-*.yaml`), cümleyi yazar |
| `mocktask.sh` + `texts-de.sh` | Yazma görevini yazıp değerlendirtir |
| `sb.sh`, `demo.sh <seri>` | iOS durum çubuğu 9:41; Android demo modu (9:41, tam pil, bildirim yok) |

Sıra ve ayarlar:
- **Dil ve kurs HESABA bağlı.** Bir cihazda Ayarlar › Uygulama'dan dili değiştirmek, uygulama yeniden
  açılınca öteki cihazları da değiştirir; Almanca arayüze geçince kurs kendiliğinden İngilizce olur. İş
  KURSA göre sıralanır: Almanca kursla tr-de ve en-de, sonra İngilizce kursla de-en ve tr-en.
- **iOS simülatörünün sistem dili setin diline** alınır, yoksa durum çubuğu başka dilde tarih gösterir
  (iPad "29 Eyl Sal", iPhone'da saat biçimi): `xcrun simctl spawn <udid> defaults write -g AppleLanguages
  -array en-US` + `AppleLocale en_US`, sonra `shutdown` + `boot` + `sb.sh`. Yeniden açılan iPad DİKEY
  gelir: Maestro `- setOrientation: LANDSCAPE_LEFT`.
- Build başına bir kez hukuki güncelleme bildirimi çıkar; kapatılır, karede kalmaz.

Tuzaklar:
- Android telefon için ayrı AVD (`Lernomi_Phone`, port 5558): `Medium_Phone` başka oturumlarca açık
  tutulabiliyor ve aynı AVD iki kez açılamıyor. Yeni AVD'de giriş `login-and.sh`; simülatörde misafir
  kalmışsa uygulamayı kaldır + `xcrun simctl keychain <udid> reset` (misafir kimliği anahtar zincirinde).
- Android'de uzun metin Maestro `inputText` ile yarıda kalıyor ve klavye açıkken kaydırma Gboard'da kayan
  yazmaya dönüşüp metne harf ekliyor: `and-task.sh` metni `adb shell input text` ile 12 kelimelik
  parçalarla yazar (adb çağrısı `</dev/null` ile, yoksa kalan parçaları yutar), klavyeyi yalnız açıksa
  geri tuşuyla kapatır ve ekrandaki kelime sayacıyla doğrular. Her görevde puan gelmeden ilerlenmez.
- Yeni kurulumda ilk konuşmada "Eller serbest" açık gelebiliyor; anlatım sesle ilerlemeye çalışır. Kareden
  önce kapatılır (öteki cihazlarla aynı görünsün).
- Tablette "Bildirim bekleme süresi açık" sistem bildirimi durum çubuğuna simge koyar: bildirim
  gölgesinden "Clear all", sonra `demo.sh`. `sbcheck.mjs` Android karelerinde simge arar.
- `verify-raw.sh` her ham görüntünün gerçekten adının ekranı olduğunu OCR ile denetler (yanlış ekranda
  çekilmiş kareyi yakalar).
- Android'de adb sunucusu Maestro koşusundan sonra yeniden başlıyor; betikler `adb wait-for-device`
  ile bekliyor. Uygulamayı açmak için `am start -W -n com.lernomi.learn/com.lernomi.MainActivity`.
- Android'de Maestro `hideKeyboard` geri tuşu gibi davranıp sohbetten ÇIKARIYOR; kullanılmaz.
- Android durum çubuğunda mikrofon açılınca ~1 sn yeşil gösterge çıkar; `walk-burst.sh` piksel
  denetimiyle göstergesiz kareyi seçer. iOS simülatörü Almanca yerelde mikrofon aşamasını hemen "Nicht
  verstanden"a düşürüyor; yürüyüş karesinde büyüteç yalnız "… ohne Bildschirm" etiketini aldığı için
  etiketin göründüğü kare yeterli.
- Yarım bırakılmış deneme "kaldığı yerden açıldı" notuyla açılır: temiz görev ekranı için yeni deneme.
- Konuşmada kaldığı yerden dönülen sohbet düzeltme satırını ve önerileri göstermez: kare her zaman
  adımı baştan başlatıp tek cümle yazarak çekilir. Rol metnini oku: yankı, yer tutucu ad ya da
  dilbilgisi hatası olan kare kullanılmaz.
- Deneme sonucundaki "Yapılacaklar" özeti sınav bitince BİR KEZ üretilir. Sağlayıcı o an yoksa kurala
  düşer ve "yapay zekâ değerlendirmesi şu an kullanılamıyor" notu çıkar; o sonuç kareye konmaz, sınav
  yeniden yazılır.

Yapay zekâ kotası:
- Konuşma, yazma değerlendirmesi ve deneme özeti üretimdeki sohbet sağlayıcılarını (Cloudflare
  Workers AI → Groq) kullanır; `npm run test:chat` ve `assess-eval` AYNI anahtarları harcar.
  Cloudflare hesabı Workers Paid'de (10.000 neuron/gün ücretsiz, aşanı faturalanır, kota kapanmaz), Groq'un ücretsiz
  günlük token penceresi 200 bin. 2026-09-29'da o günkü zincirin iki sağlayıcısı kapalıydı ve Groq'un
  penceresi doldu; yapay zekâlı kareler çekilemedi. Çekim gününden önce ölçüm betikleri koşulmaz; kota şöyle okunur:
  `ssh lernomi "sudo -u postgres psql -d lernomi -At -c \"select provider, ok, status, count(*) from
  ai_usage where day = current_date group by 1,2,3\""`.

