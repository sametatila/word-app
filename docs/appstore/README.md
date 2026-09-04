# App Store hazırlığı (Lernomi, iOS)

Bu klasör `docs/play/`in iOS karşılığıdır. **İkisi ayrı beyanlardır**: Play'in Veri
Güvenliği formu ile App Store Connect'in gizlilik etiketleri farklı sorular sorar ve
farklı yerlerde yayımlanır. Birini doldurup öbürünü kopyalamak, iki mağazada çelişen
beyan bırakır.

## Durum (2026-09-04)

iOS **yayında değil.** `mobile/ios/Lernomi.xcodeproj` var ama React Native şablonundan
çıkmamış: `PRODUCT_BUNDLE_IDENTIFIER` hâlâ `org.reactjs.native.example.$(PRODUCT_NAME…)`.

Hukuki metinler iOS için **hazır yazıldı ama kapalı**: `src/lib/legal.ts` içindeki
`LEGAL_PLATFORMS.ios` `false`. Açıldığında şunlar kendiliğinden devreye giriyor:

- şartlarda "13a. Apple App Store için ek koşullar" (Apple'ın özel EULA için istediği
  asgari maddeler: taraflar, lisans kapsamı, bakım, garanti, talepler, fikri mülkiyet,
  ihracat beyanı, iletişim, üçüncü taraf şartları, **Apple'ın üçüncü taraf lehtar** olması),
- satın alma / iptal / iade maddelerinin Apple yolu (Ayarlar › Apple Hesabı › Abonelikler,
  reportaproblem.apple.com),
- gizlilik politikasında platform sayımı ve alıcılar tablosuna **Apple (App Store)** satırı.

Bayrağı açmadan önce `LEGAL_VERSION` artırılmalı ve `LEGAL_CHANGELOG`'a kayıt düşülmeli.

## Bayrak açılmadan bitmesi gereken iş

| # | İş | Neden |
|---|---|---|
| 1 | Apple Developer Program hesabı | Bundle kimliği, sertifika, App Store Connect kaydı bunsuz yok |
| 2 | Gerçek bundle kimliği (ör. `app.lernomi.ios`) | Şablon kimliğiyle yükleme kabul edilmez |
| 3 | **Apple ile Giriş** | Google ile giriş sunulduğu için App Store Review Guidelines 4.8 istiyor. Metin işi değil, ürün işi |
| 4 | Uygulama içi hesap silme | 5.1.1(v) zorunlu kılıyor — Android'de var, iOS'ta da aynı yere bağlanmalı |
| 5 | Gizlilik etiketleri | Aşağıdaki tablo App Store Connect'e girilir |
| 6 | Yaş derecelendirmesi | Play'de 18+ seçildi; App Store derecelendirmesi ayrı doldurulur ve tutarlı olmalı |
| 7 | Arka plan sesinin CİHAZDA doğrulanması | Ekran kapalıyken yürüyüş modu kararı verildi ve kod yazıldı, ama macOS/Xcode olmadan derlenip denenemedi (aşağıya bak) |
| 8 | İzin metinlerinin Xcode projesine bağlanması | `tr/en/de.lproj/InfoPlist.strings` yazıldı; hedefe eklenip `CFBundleLocalizations` ayarlanmalı |

## Ekran kapalıyken yürüyüş modu (arka planda ses)

**Karar:** iOS'ta da ekran kapalıyken çalışacak. Android'de bunu mikrofon tipli ön plan
servisi yapıyor; iOS'ta böyle bir şey yok — uygulamayı ekran kapalıyken ayakta tutan tek
şey **etkin bir ses oturumu** ve `UIBackgroundModes = audio`.

Yapılanlar:

- `Info.plist` → `UIBackgroundModes: [audio]`.
- `LernomiSpeech.swift` → `startWalkService` / `stopWalkService`. Metot adları Android'le
  birebir aynı; JS (`lib/stt.ts`) bunları zaten çağırıyordu ve iOS'ta sessizce boşa
  düşüyordu, **JS değişmedi**. Oturum tur boyunca açık tutuluyor.
- Kelime başına yapılan temizlik artık tur oturumunu kapatmıyor; kapatsaydı ekran
  kapalıyken bir sonraki kelimeye geçilemezdi.

**Doğrulanmadı.** Bu makinede macOS ve Xcode yok; kod derlenmedi, cihazda denenmedi.
Cihazda sınanacak dört şey: (1) ekran kilitlendikten sonra tur devam ediyor mu,
(2) kelimeler arası boşlukta uygulama askıya alınıyor mu, (3) kilit ekranında mikrofon
göstergesi görünüyor mu, (4) telefon çağrısı gelip bittiğinde oturum toparlanıyor mu.

**İnceleme riski:** arka planda mikrofon isteyen bir uygulama App Review'da en çok
sorgulanan şeydir. App Review Information alanına şu üçü açıkça yazılmalı: modu kullanıcı
başlatır, kilit ekranında sürdüğü görünür, uygulama içinden durdurulabilir. Video eklemek
en hızlı çözen yol.


## Gizlilik etiketleri (App Store Connect › App Privacy)

Play'in Veri Güvenliği beyanıyla (`docs/play/data-safety.md`) aynı gerçeği anlatır,
Apple'ın kategorileriyle. **Hiçbir veri türü izleme (tracking) için kullanılmıyor** —
reklam kimliği toplanmıyor, üçüncü taraf reklam ya da analitik SDK'sı yok.

| Apple kategorisi | Toplanıyor | Kimliğe bağlı | Amaç |
|---|---|---|---|
| Contact Info › Email Address | Evet | Evet | App Functionality |
| Contact Info › Name | Evet | Evet | App Functionality |
| User Content › Audio Data | **Hayır** (geçici işlenir, saklanmaz) | — | — |
| User Content › Other User Content (yazdığın ve söylediğin metinler) | Evet | Evet | App Functionality |
| Identifiers › User ID | Evet | Evet | App Functionality |
| Usage Data › Product Interaction | Evet | Evet | Analytics (ayarlardan kapatılabilir) |
| Purchases › Purchase History | Evet | Evet | App Functionality |
| Diagnostics | Hayır | — | — |
| Location, Contacts, Health, Financial Info, Browsing History, Search History, Sensitive Info | Hayır | — | — |

Ses için dikkat: Apple "toplanıyor" derken **cihazdan ayrılıp saklanmayı** kastediyor.
Ses sunucuya gidiyor ama tanıma biter bitmez siliniyor ve saklanmıyor; bu yüzden
"collected" değil. Tanınan **metin** saklanıyor ve o User Content olarak beyan ediliyor.
Bu ayrım gizlilik politikası §3 ve §4 ile birebir aynı.

## İnceleme notları (App Review Information)

Uygulamanın tamamı hesap gerektiriyor, misafir modu yok — `docs/play/console.md`'deki
inceleme hesabı ve adımlar App Store Connect'e de girilir. Ek olarak açıklanması gereken:

- **Mikrofon ve arka plan sesi:** yürüyüş modu kullanıcı başlattığında mikrofonu açar;
  ekran kapalıyken ses tanınmak üzere sunucuya gider ve saklanmaz. İnceleyen bunu
  görebilsin diye adım adım yazılmalı, aksi hâlde arka plan izni sorgulanır.
- **Yapay zekâ içeriği:** rol yapma bir dil modeliyle üretiliyor; uygulamada "gerçek kişi
  değil" bildirimi ekranda kalıcı ve her yanıtın altında "Bildir" var (Guidelines 1.2 ve
  üretken içerik beklentileri).
- **Kullanıcı içeriği:** görünen ad, kullanıcı adı ve biyografi moderasyondan geçiyor;
  engelleme ve bildirme var, özel mesajlaşma yok.

## Not

Vergi tarafı iOS'ta da aynı: GVK mükerrer m.20/B istisnası "elektronik uygulama paylaşım
ve satış platformları" diyor, App Store da bunun içinde. Yayıncı Türkiye'de yerleşik
gerçek kişi olmaya devam ediyor (bkz. `src/lib/legal.ts` kimlik notu).
