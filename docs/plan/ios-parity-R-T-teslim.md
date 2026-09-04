# Şerit R + T — başka şeritlere teslim

`docs/plan/ios-parity.md` §2.1 gereği: kilitli dosyaları sahibi düzenler, isteyen
şerit **tarif eder**. Bu dosya Şerit R'nin (marka kaynakları, R1–R4) ve Şerit T'nin
(platforma göre metin ve davranış, E1–E3) başka şeritlerden istediklerini ve
onlara bıraktıklarını tek yerde tutar.

Bu şeritte üretilen hiçbir şey **derlenmedi**: makinede Xcode yok (§0).

İlgili commit'ler:

| Commit | Ne |
|---|---|
| `bc36eeb` | uygulama ikonu, açılış ekranı, pencere zemini (R1–R3) |
| `fad616b` | SFX yedek mp3'leri iOS paketine (R4) |
| `106a95c` | mağaza metinleri ve platform davranışı (E1–E3) |
| `cb9e3e6` | Apple giriş hata metinleri — **yanlış commit'e düştü**, aşağıda §4 |
| `d5a8a98` | yürüyüş modu: kesilen dinleme düzeltmesi + iOS ekran eşlemesi kararı (§5) |
| `f671869` | `sfx.ts` docblock'u iki paketi de anlatıyor |
| `1248c95` | i18n tabanı 137 → 123 |

---

## 1 → Şerit P (`project.pbxproj`)

### 1.1 Asset katalog: yapılacak bir şey YOK

`Images.xcassets` pbxproj'da klasör başvurusu olarak duruyor
(`lastKnownFileType = folder.assetcatalog`, satır 21) ve Resources fazında
(satır 174). Katalogun **içine** eklenen her şey — AppIcon PNG'leri,
`LaunchIcon.imageset`, iki `.colorset` — proje dosyasına dokunmadan pakete girer.
`ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon` da zaten yerinde.
`LaunchScreen.storyboard` da Resources fazında; yalnız içeriği değişti.

### 1.2 SFX mp3'leri — TEK TEK dosya olarak eklenmeli (folder reference DEĞİL)

Altı yeni dosya, hedefe eklenmeyi bekliyor:

```
mobile/ios/Lernomi/sfx/correct.mp3
mobile/ios/Lernomi/sfx/finish.mp3
mobile/ios/Lernomi/sfx/micoff.mp3
mobile/ios/Lernomi/sfx/micon.mp3
mobile/ios/Lernomi/sfx/tap.mp3
mobile/ios/Lernomi/sfx/wrong.mp3
```

Her biri `PBXFileReference` + gruba + **Resources fazına** (`PBXBuildFile`).
Derlenen kod değil, kaynak.

**Kritik:** sarı grup (tek tek dosya başvurusu) olacak, **mavi klasör (folder
reference) OLMAYACAK.** Sebep `react-native-sound`un yolu kurma biçimi:

- `RNSound.m` → `constantsToExport` içinde `MainBundlePath = [[NSBundle mainBundle] bundlePath]`,
  yani paketin **kökü**.
- `sound.js:45` → `this._filename = basePath + '/' + filename` → `"<paket>/correct.mp3"`.
- `prepare` bu yolu doğrudan `NSURL`e veriyor; `pathForResource:` gibi alt klasör
  araması yok.

Folder reference eklenirse dosyalar pakette `sfx/` altında kalır, altı sesin
**hiçbiri** bulunamaz ve iOS yedeği bugünkü gibi ölü kalır. Aynı not
`mobile/scripts/render-sfx.py`in başında da yazılı.

### 1.3 Info.plist: yapılacak bir şey YOK

`UILaunchStoryboardName = LaunchScreen` zaten var ve korunuyor. `UILaunchScreen`
sözlüğüne **geçilmedi** — plan (§R2) onu "P ile kararlaştır" diyordu; Info.plist
kilitli olduğu için bağımsız çözülebilen yol seçildi, storyboard yerinde kaldı.
Geçiş yine de istenirse storyboard silinir, `UILaunchScreen` içine
`UIColorName = LaunchBackground` + `UIImageName = LaunchIcon` yazılır; katalog
kaynakları hazır.

**Karar (2026-09-04, Şerit P sordu, Samet verdi): geçilmeyecek, storyboard kalıyor.
Şerit S'ten sonra tekrar bakılacak.**

Gerekçe sıralamayla ilgili, zevkle değil. `UILaunchScreen`'in `UIImageName`'i boyut
denetimi vermiyor; görüntüyü kendi kurallarıyla ortalayıp ölçekliyor. Storyboard'da
ise Şerit R bilinçli olarak 160 pt'lik bir ikon yerleştirdi. Geçiş, görebildiğimiz
bir şeyi göremediğimiz bir şeyle değiştirir. İlk başarılı derlemeden önce çalışan
ama doğrulanmamış bir parçayı düzen uğruna oynatmak tek bilinmezi ikiye çıkarır.

Ertelemenin bedeli düşük: Şerit S'in ilk cihaz ekran görüntüsünde açılış yanlış
görünürse geçiş yine bir commit'lik iş — ama o zaman elde kanıt olur. §3'teki
sunum maddeleri (3, 4, 5) zaten bu kanıtı üretiyor.

---

## 2 → Şerit N (`LernomiSpeech.swift` / `.m`) ve Şerit S

### 2.1 `AppDelegate.swift`e dokunuldu — çakışmasın diye haber

Kilitli dosya listesinde değil (§2.1) ve N'in kapsamında da yok, ama iOS'ta
elle yazılmış tek Swift dosyası orası olduğu için bilinsin. İki ekleme:

- `window?.backgroundColor = UIColor(named: "WindowBackground")`
- `ReactNativeDelegate` içinde `override func customizeRootView(_:)`

İkisi de yalnız zemin rengi içindir; ses oturumu, köprü ya da modül kaydıyla
ilgisi yok. `customizeRootView(_:)` RN'in bu iş için ayırdığı geçersiz kılma
noktası (`RCTUIConfiguratorProtocol.h` docblock'u örneğini bile veriyor).

Derlenme riski **düşük ama sıfır değil**: metot sınıf başlığında değil yalnız
protokolde bildirilmiş. Aynı dosyadaki `override func bundleURL()` de öyle
(`RCTReactNativeFactory.h:44`) ve o bugün derleniyor — desen kanıtlı. Yine de
Mac'te ilk derlemede bu iki satır gözden geçirilsin.

### 2.2 `playSfx` ile ilişki

Şerit N'in `playSfx`i ekran-kapalı yolu; buradaki mp3'ler köprü hazır değilken
kullanılan `react-native-sound` yolu. İkisi aynı nota tablosundan
(`src/lib/sfxNotes.ts`) geliyor, birbirinin yerine geçmiyor. `sfx.ts` hangisini
seçeceğini kendisi biliyor, **JS'e dokunulmadı**.

---

## 3 → Şerit S (Mac'te derleme ve cihazda sınama)

Planın §5'ine eklenecek maddeler:

**Sunum**
1. Uygulama ikonu her boyutta net mi; ana ekranda, Ayarlar'da ve Spotlight'ta
   maskot tanınıyor mu (en küçük görünen boyut 40 piksel).
2. `xcrun altool` / App Store Connect yüklemesi "missing icon" demeden geçiyor mu
   (iPad girişleri dâhil — `TARGETED_DEVICE_FAMILY = "1,2"`).
3. Açılış ekranı Android'inkiyle aynı mı: turuncu zemin, ortada ikon, yazı yok.
4. Koyu temada açılışta beyaz flaş kaldı mı (açılış ekranı ile ilk JS karesi arası).
5. Açık temada zemin `#FBF7F2`, koyuda `#17120E` mi — Android'le yan yana.

**Ses**
6. Köprü hazır değilken (uygulama daha yeni açıldı / çevrimdışı) altı ses de
   çalıyor mu, yoksa `sfx/` alt klasörü yüzünden hiç bulunamıyor mu (§1.2).

**Yürüyüş modu — §5'in bağlı olduğu tek ölçüm**
6a. **Uygulama arka plandayken (`UIBackgroundModes = audio`, ses oturumu açık)
    `SFSpeechRecognizer` gerçekten çalışıyor mu?** Yürüyüş sırasında telefonu
    kilitle, bir kelime bekle, cevabın tanınıp tanınmadığına bak. Bütün §5 dengesi
    bu cevaba bağlı; ölçülene kadar bugünkü eşleme yerinde kalır.
6b. Kısa kesinti (bildirime dokun, hemen dön) kelimeyi yakıyor mu — yoksa kelime
    bir kez daha mı soruluyor (`d5a8a98`).
6c. 6a "çalışıyor" çıkarsa: bir yürüyüş boyunca kaç Azure çağrısı gidiyor
    (Azure portal, F0 5 saat/ay).

**Mağaza metinleri**
7. Hesap silme ekranındaki abonelik uyarısı Apple yolunu gösteriyor mu.
8. Paywall'daki "Aboneliği yönet" App Store abonelik ekranını açıyor mu.
9. Güncelleme şeridi iOS'ta hiç görünmüyor mu (Guidelines 2.5.2).

**Analitik**
10. Yönetim panosunda "iOS · uygulama" satırı beliriyor mu (kind `ios:standalone`).

---

## 4 → Şerit D / Samet: kayda geçmesi gerekenler

### 4.1 `cb9e3e6` yanlış mesajla commit edildi

Apple giriş hata metinleri (`autherror.apple_failed`, `autherror.no_apple_token`;
Şerit A'nın `ios-parity-A-teslim.md` §2'de istediği iki anahtar) üç sözlüğe
yazıldı ve **doğru içerikle ağaçta**, ama commit'lenirken başka bir şeridin
`.env.example` commit'ine karıştı: `cb9e3e6 "Lernomi 8/n: env dosyalarındaki
veritabanı adı ve senkron kopukluğu"`. Eşzamanlı çalışan iki agent'ın index'i
paylaşması yüzünden oldu. İçerik kaybı yok; yalnız mesaj o değişikliği anlatmıyor.
Push edilmemiş; istenirse mesajı düzeltilebilir. Başka bir şeridin commit'i
olduğu için buradan dokunulmadı.

Anahtarların yeri teslim belgesindekinden bir satır farklı: `apple_failed`
alfabetik yerine (`autherror` bloğunun başı) kondu, belge onu
`bu_e_postayla…` ile `cancelled` arasına öneriyordu. Dosyaların kuralı alfabetik
sıra; 823 anahtarda yalnız altı bilinçli istisna var (hepsi walk/learn konuşma
metinleri) ve onlar bozulmadı.

### 4.2 `npm run i18n:check` — ÇÖZÜLDÜ, taban da sıkılaştırıldı

`numbers.ts`in Almanca sayı sözcükleri (`fünf`, `zwölf`, `dreißig`) tarayıcıya Türkçe
metin gibi görünüyordu; `059679e` ile tabana alındı. Ardından taban `1248c95` ile
137 → 123'e indirildi: aradaki 14 boşluğun tamamı çoktan çevrilmiş üç dosyadan
(`WalkModeScreen.tsx` 11, `voiceMatch.ts` 2, `ExamPrepScreen.tsx` 1) kalmış eski
girişlerdi. Üçü artık sıfırda, yani o dosyalara girecek tek bir ham Türkçe dizgi
bile `--check`i kırıyor. `numbers.ts` 10'da duruyor.

### 4.3 Kapatılmayan bitişik kusur

`mobile/src/screens/LearnScreen.tsx:93` — güncelleme şeridindeki
`Yeni sürüm hazır · v{...}` metni çeviri katmanını atlıyor (tabanda duruyor,
sayı artmadı). Şerit T'nin kapsamında değildi ve şerit artık yalnız Android'de
çizildiği için aciliyeti düştü, ama Almanca/İngilizce arayüzde hâlâ Türkçe.

### 4.4 İkon kaynağı kararı

Plan (§R1) kaynak olarak Android'in `mipmap-xxxhdpi/ic_launcher_foreground.png`
dosyasını gösteriyordu. Kullanılan kaynak depo kökündeki
`scripts/logo-source.png`: **aynı çizim**, ama 1024×1024 ve iOS kadrajında.
Android dosyası uyarlanabilir-ikon katmanı olduğu için içindeki gerçek kare
354 piksel; oradan 1024'e büyütmek App Store ikonunu bulanıklaştırırdı.
`scripts/icons.mjs` web ikonlarını da bu dosyadan üretiyor, yani marka görseli
üç platformda tek kaynaktan geliyor. Android tarafına **dokunulmadı** (§2.3).

Yeniden üretim: `cd mobile && python3 scripts/render-app-icon.py` (Pillow gerekir).

---

## 5 → Karar kaydı: iOS'ta "ekran kapalı" ne demek

Ajan 1'in iOS ekran izlemesi indikten sonra iki platform **aynı olayı dinlemiyor**:

| | Olay | Ne tetikler |
|---|---|---|
| Android | `ACTION_SCREEN_OFF` / `ON` (`LernomiSpeechModule.kt`) | yalnız güç tuşu |
| iOS | `didEnterBackground` / `willEnterForeground` (`LernomiSpeech.swift`) | kilit **+** uygulama değiştirme, bildirime dokunma, gelen çağrı |

Bayrağı `WalkModeScreen.tsx` iki yerde okuyor: kaynak seçimi (`useAzure`) ve
dinlemenin kesilmesi. Yani iOS'ta bildirime dokunmak, Android'de olmayan bir
maliyet ve bir kesinti üretiyor.

### Karar: eşleme olduğu gibi kabul edildi

Bayrağın sorduğu şey "ekran kapalı mı" değil, **"ücretsiz yol çalışıyor mu"**.
iOS'ta uygulama arka plana düşer düşmez WebView köprüsü **kesin olarak** askıya
alınıyor; native `SFSpeechRecognizer`ın arka planda çalıştığı ise **doğrulanmadı**
(§3.6a). Bilinmez bu yönde dururken yanlış tarafa düşmenin bedeli simetrik değil:

- fazladan bir Azure çağrısı → kuruş (F0: 5 saat/ay, çağrı başına 3 sn kayıt),
- sessizce başarısız bir native tanıma → "duyamadım" → **üç turda yürüyüş biter.**

### Elenen iki seçenek

**Native tarafta ayrıştırma — YAPILAMIYOR.** Ajan 1'e devredilecek iş çıkmadı:
iOS'ta güç tuşunu haber veren genel bir API yok; `protectedDataWillBecomeUnavailable`
yalnız cihazda parola varsa ve gecikmeli düşüyor (parolasız cihazda hiç gelmiyor),
dolayısıyla tek başına kilit sinyali olamıyor; SpringBoard'ın kilit bildirimi özel
API, Guidelines 2.5.1 riski. Kayda geçsin diye: `willResignActive` bilerek
kullanılmıyor — o bildirim şeridi ve Denetim Merkezi'nde de düşer, eşlemeyi daha da
hassas yapardı.

**Gecikme (debounce) — EKLENMEDİ.** Kısa kesintide bayrağı geciktirmek, o aralıkta
sorulan kelimeyi arka planda ölü olabilecek tanıyıcıya yollar: parayı kurtarıp turu
riske atar. Kısa kesintinin asıl zararı bunun yerine doğrudan kapatıldı.

### Kapatılan kusur

Kesinti native dinleme sırasında geldiğinde dinleme kesiliyor ve boş sonuç dönüyordu;
tekrar sorma şartı ise `screenOffRef.current` idi. Kullanıcı kesme ile boş sonuç
arasında ön plana döndüyse tekrar **hiç** olmuyor, boş sonuç "duyamadım" sayılıyordu
— üç duyamadım turu bitirdiği için iki saniyelik bir bakış yürüyüşü sonlandırabilirdi.

Artık dinlemeyi bizim kestiğimiz ayrıca izleniyor (`listenCut`) ve şart eskisinin
**üstüne ekleniyor**: `listenCut || screenOff`. Hiçbir durumda eskisinden az tekrar
olmuyor. Tekrarın kaynağı tekrar anında seçiliyor — hâlâ arka plandaysa Azure,
kullanıcı döndüyse yine ücretsiz native. Yani düzeltme Azure harcamasını artırmıyor,
azaltabiliyor.

### Bu karar ne zaman gözden geçirilir

§3.6a "arka planda çalışıyor" derse eşleme daraltılabilir ve iOS'ta Azure'a hiç
düşülmeyebilir; o zaman `LernomiSpeech.swift`ten `didEnterBackground` çıkarılıp
yalnız kilit sinyali (parola varsa `protectedDataWillBecomeUnavailable`, yoksa
"hiç") bırakılması Ajan 1'in işi olur. "Çalışmıyor" derse bugünkü eşleme zaten
doğrudur ve değişmez.
