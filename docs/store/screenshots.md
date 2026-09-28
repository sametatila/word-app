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
  2026-09-28). Ücretsiz hesap: seviye başına 2 Konuşma ve 2 Yazma, 1 deneme sınavı; hak biterse
  kilitli görünür. Premium vermek üretim veritabanına yazmak demek, Samet'e sorulur.
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

## Durum (2026-09-28)

| Set | Ekranlar | Not |
|---|---|---|
| `tr-de` | 7/7 | eski sıcak palet (B paletinden önce) |
| `en-de` | 7/7 | eski sıcak palet |
| `de-en` | 7/7 | B paleti |
| `tr-en` | 6/7 | `conversation` yok: hesabın B1 konuşma hakkı bitti; Premium vermek üretime yazmak, Samet'e sorulur. Sayfa bu seti henüz kullanmıyor |

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
- Günlük turda kartlar İngilizce ikinci satır taşır (bilinçli, `docs/plan/native-language.md`);
  vitrin karesi olarak günlük tur yerine ana ekrandaki günlük tur kutusu kullanılıyor.
- Uygulamada hukuki güncelleme bildirimi ya da bildirim izni penceresi çıkarsa önce kapatılır;
  karede sistem penceresi kalmaz.
- Simülatörü iş bitince kapat: `xcrun simctl shutdown all` (Samet toplantıdayken açık kalmasın).
