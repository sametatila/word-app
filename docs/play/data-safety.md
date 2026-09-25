# Google Play Console — Veri Güvenliği beyanı (Lernomi, `com.lernomi.learn`)

Kodda doğrulanan toplamaya göre hazırlandı; kaynak listesi `src/lib/legal/index.ts` (`PROCESSORS`) ve gizlilik
politikası `/privacy`. Yeni bir sağlayıcı ya da veri türü eklenince önce bu üçü güncellenir,
sonra Console'daki form. "Paylaşım" Play tanımıyla: verinin üçüncü tarafa aktarılması —
sunucumuz üzerinden konuşma tanıma ve dil modeli sağlayıcılarına giden veri de paylaşımdır.

Son güncelleme: 2026-09-24 (hukuki sürüm 1.6: Play Integrity; önceki 1.5 yayın öncesi denetim LEG-1/2/3/15). Kimlik ve iletişim bilgileri `src/lib/legal/index.ts`'te; Console'a girilecek destek adresi `support@lernomi.app`, gizlilik/veri talepleri `kvkk@lernomi.app` (KVKK) ve `gdpr@lernomi.app` (GDPR). 1.7'den (2026-09-24) beri hizmet sağlayıcı, veri sorumlusu ve Play yayıncısı **aynı kişi** (Musa Atila, Türkiye; bkz. `docs/play/listing.md` §5); Console'daki kimlik de odur. Veri sorumlusu AB'de yerleşik olmadığından GDPR m.27 AB temsilcisi var (Samet Atila, Dortmund; iletişimi `gdpr@lernomi.app`). Türkiye temsilcisi kavramı kalktı. VERBİS kaydı yapılmıyor (çalışan sayısı ve mali bilanço eşiklerine dayanan istisna) ve metinler kayıtlı olduğunu iddia etmiyor. Veri Güvenliği formunun cevapları kimlik değişikliğinden etkilenmiyor: toplanan veri ve alıcılar aynı.

## Genel sorular

| Soru | Cevap |
|---|---|
| Uygulama kullanıcı verisi topluyor ya da paylaşıyor mu | Evet |
| Toplanan tüm veriler aktarımda şifreleniyor mu | Evet (HTTPS) |
| Kullanıcı veri silme talebinde bulunabiliyor mu | Evet — `https://www.lernomi.app/account/delete` ve uygulama içi Profil › Ayarlar › Hesap › Hesabı sil; hesapsız (misafir) kullanımda Profil › Misafir verilerini sil |
| Hesap oluşturma var mı | Evet (e-posta/parola, Google, Apple); İSTEĞE BAĞLI — uygulama hesapsız da kullanılıyor (misafir kimliği, 2026-09-15). Misafirde e-posta ve ad toplanmıyor; kullanıcı kimliği (rastgele), öğrenme verisi ve uygulama etkileşimi toplanıyor, hesaba birleşince ya da 30 gün kullanılmayınca siliniyor |
| Bağımsız güvenlik incelemesi (MASA) | Hayır |
| Aileler politikasına tabi mi | Hayır (hedef kitle 18+; şartlar hesap açmayı 18 yaşla sınırlıyor) |

## Veri türleri

Sütunlar Console'daki sırayla: toplanıyor / paylaşılıyor / geçici işleme / zorunlu mu / amaçlar.

| Kategori › Veri türü | Toplanıyor | Paylaşılıyor | Geçici | Zorunlu | Amaçlar |
|---|---|---|---|---|---|
| Kişisel bilgi › Ad | Evet | Hayır | Hayır | Zorunlu | Hesap yönetimi, kişiselleştirme |
| Kişisel bilgi › E-posta adresi | Evet | Hayır | Hayır | Zorunlu | Hesap yönetimi, güvenlik (doğrulama, parola sıfırlama) |
| Kişisel bilgi › Kullanıcı kimlikleri | Evet | Evet (RevenueCat) | Hayır | Zorunlu | Hesap yönetimi, satın alma eşleme |
| Kişisel bilgi › Diğer bilgi (IP adresi, tarayıcı/cihaz tanımı — oturum kaydı) | Evet | Hayır | Hayır | Zorunlu | Dolandırıcılık önleme, güvenlik, hız sınırı |
| Ses › Ses kayıtları | Evet | Evet (Microsoft Azure, Groq, Cloudflare, Speechmatics, Deepgram, Mistral) | Evet (Lernomi'de saklanmaz; Speechmatics işi bitince siliniyor, Deepgram'da eğitim katılımı kapalı — sunucu ajanının `lib/stt` düzeltmesi yayında olmadan "geçici" işaretlenmez, aşağıdaki nota bak) | İsteğe bağlı (ekran kapalı yürüyüş modu; uygulama içi açık rıza, izin yoksa gönderilmez) | Uygulama işlevi (konuşma tanıma) |
| Mesajlar › Diğer uygulama içi mesajlar (yazılan ve söylenen metinler: yazma görevleri, sohbet, sınav cevapları) | Evet | Evet (Groq, Mistral, Cerebras) | Hayır | İsteğe bağlı (uygulama içi açık rıza, izin yoksa gönderilmez) | Uygulama işlevi (değerlendirme ve geri bildirim) |
| Uygulama etkinliği › Uygulama içi etkileşimler (ilerleme, seri, XP, ekran görüntüleme olayları) | Evet | Hayır | Hayır | Zorunlu (ilerleme) / isteğe bağlı (olaylar, kapatılabilir) | Uygulama işlevi, analitik, kişiselleştirme |
| Uygulama etkinliği › Diğer kullanıcı içeriği (görünen ad, kullanıcı adı, içerik ve kullanıcı bildirimleri) | Evet | Hayır | Hayır | İsteğe bağlı (görünen ad boş bırakılabilir) | Uygulama işlevi, kişiselleştirme (sıralama, sosyal profil), güvenlik (moderasyon) |
| Uygulama etkinliği › Diğer eylemler (arkadaşlık istekleri, tepkiler, dürtmeler, ortak görevler, engellemeler) | Evet | Hayır | Hayır | İsteğe bağlı | Uygulama işlevi (sosyal özellikler) |
| Uygulama bilgisi ve performans › Çökme günlükleri (anonim JS hata raporu: hata iletisi, yığın izi) | **Evet** | Hayır | Hayır | Zorunlu (analitik anahtarından bağımsız gönderiliyor) | Uygulama işlevi, analitik (hata ayıklama) |
| Uygulama bilgisi ve performans › Tanılama (hata raporuna eşlik eden ekran adı, uygulama sürümü, platform) | **Evet** | Hayır | Hayır | Zorunlu | Uygulama işlevi, analitik |
| Uygulama bilgisi ve performans › Diğer (ekran genişliği, platform etiketi) | Evet | Hayır | Hayır | İsteğe bağlı (kapatılabilir) | Analitik |
| Uygulama bilgisi ve performans › Diğer uygulama performans verileri (Play Integrity: bizim sunucuya yazdığımız sonuç — uygulama tanındı mı, cihaz bütünlüğü, lisans durumu, sebep — ve Google kütüphanesinin topladığı uygulama meta verisi: paket adı, sürüm, imza sertifikası, Play lisans durumu) — **`GUEST_ATTESTATION` açılınca** | Evet | Hayır | Hayır | Zorunlu (Android'de "Hesapsız devam et"; kapatma anahtarı yok) | Dolandırıcılık önleme, güvenlik ve uyumluluk |
| Finansal bilgi › Satın alma geçmişi | Evet | Evet (RevenueCat, Google Play) | Hayır | İsteğe bağlı | Uygulama işlevi (abonelik) |
| Cihaz veya diğer kimlikler › Cihaz bildirim jetonu | **Evet** | **Evet** (Google — Firebase Cloud Messaging) | Hayır | İsteğe bağlı (bildirim izni) | Uygulama işlevi (bildirim gönderimi) |
| Cihaz veya diğer kimlikler › Play Integrity'nin cihaz bilgisi (anahtar doğrulama sertifikası, cihaz doğrulama belgesi, isteğe özgü `requestHash`) — **`GUEST_ATTESTATION` açılınca** | Evet | Hayır (Google hizmet sağlayıcı olarak işliyor) | Hayır | Zorunlu (Android'de "Hesapsız devam et") | Dolandırıcılık önleme, güvenlik ve uyumluluk |
| Konum, kişiler, takvim, fotoğraf/video, sağlık | Hayır | Hayır | — | — | Toplanmıyor |

Notlar:
- "Geçici işleme" yalnız ses kaydı için ve **koşullu**: Lernomi sunucusu sesi saklamıyor; Speechmatics tarafında iş, transkript okunduktan sonra silinmeli (`DELETE /v2/jobs/{id}`) ve Deepgram isteği `mip_opt_out=true` taşımalı (denetim LEG-4, sunucu ajanı). İkisi yayında değilse "geçici" işareti kaldırılır.
- Google ya da Apple ile giriş: sağlayıcı hesap kimliği/ad/e-posta'yı bize verir (sağlayıcıya bizden veri gitmez). Console'da bu, "Kişisel bilgi" toplama satırlarıyla karşılanır. Apple ile giriş Android'de de sunuluyor (web akışı; `/api/config` → `appleWeb:true`).
- **Paylaşım izinle yapılıyor (2026-09-14).** Metin dil modeli sağlayıcılarına, ses konuşma tanıma sağlayıcılarına ancak uygulama içinde sağlayıcıları adıyla sayan ekranda izin verildikten sonra gidiyor; karar sunucuda (`user_consents`) ve uç izin yoksa isteği sağlayıcıya iletmiyor. Play Kullanıcı Verileri politikasının belirgin açıklama ve rıza şartının karşılığı; Veri Güvenliği'nde bu türler bu yüzden "isteğe bağlı".
- Reklam SDK'sı, üçüncü taraf analitik ve üçüncü taraf çökme raporlama SDK'sı yok (**Firebase Crashlytics 2026-09-23'te uygulamadan çıkarıldı**; önceki derlemelerde vardı ve hiçbir beyanda yoktu, denetim LEG-1).
- **Çökme günlükleri / Tanılama 2026-09-23'te HAYIR'dan EVET'e döndü.** Web ve mobil JS hataları `/api/client-errors`e gidiyor (`src/lib/client-errors.ts`, `mobile/src/lib/errorReport.ts`): ad, ileti, yığın (≤4000 karakter), ekran adı; sürüm/platform `x-lernomi-client` başlığından. Kullanıcı kimliği yazılmıyor, e-posta/jeton/uzun sayılar sunucuda temizleniyor; kimseyle paylaşılmıyor. Toplama kullanıcıya bağlı değil ama Play "toplanıyor" tanımı kullanıcıya bağlanmayı şart koşmuyor. Analitik anahtarı bunu kapatmıyor, o yüzden "zorunlu". Native çökmeler yalnız Play Console › Android vitals'ta (Google'ın kendi toplaması, bizim beyanımız değil).
- **Cloudflare (ters vekil + Turnstile, 2026-09-23'te politikaya yazıldı):** bütün trafik ve kayıt/giriş/parola sıfırlamadaki Turnstile (mobilde WebView) Cloudflare'den geçiyor. Play tanımında hizmet sağlayıcıya aktarım "paylaşım" sayılmıyor ve IP tek başına bir veri türü değil; formda değişiklik gerektirmiyor. Politikada alıcı olarak yazılı.
- **Seslendirme (Edge/Azure):** sunucudan, hesap bilgisi olmadan yalnız seslendirilecek metin gidiyor; kullanıcı verisi değil, formda satır gerektirmiyor. Politikada alıcı olarak yazılı.
- **"Cihaz veya diğer kimlikler" 2026-09-10'da HAYIR'dan EVET'e döndü.** Uzak bildirim
  (Firebase Cloud Messaging) o gün açıldı; cihaz başına bir kayıt jetonu saklanıyor
  (`device_tokens`) ve Google'a gidiyor. Play'in kendi tanımı bu kutuya *Firebase
  installation ID*'yi açıkça yazıyor, yani jeton buraya girer. Reklam kimliği hâlâ
  toplanmıyor. Bildirim izni verilmezse jeton hiç üretilmiyor, o yüzden isteğe bağlı.
  **2026-09-23'ten beri bu yapısal olarak garanti:** `mobile/firebase.json` →
  `messaging_auto_init_enabled: false`; FCM jetonu (ve arkasındaki Firebase kurulum
  kimliği) uygulama açılışında değil, bildirim izni verildikten sonra üretiliyor.
- **Play Integrity (hukuki sürüm 1.6, 2026-09-24; beyan kararı Samet, 2026-09-24).** Android'de "Hesapsız
  devam et"te uygulama Google Play Integrity'den imzalı bir belge alıyor, sunucu onu Google'a çözdürüp
  yalnız hükümleri ve sebebi `guest_attestations`a misafir kimliğine bağlı yazıyor (90 gün, günlük cron
  siler; belgenin kendisi yazılmıyor). 2026-09-24'ten beri canlıda `log` kipinde (sunucu `GUEST_ATTESTATION=log`, Android vc 6'dan
  beri belge gönderiliyor): form satırı ARTIK ZORUNLU, Veri güvenliği girilirken eklenir (denetim 2026-09-25 G1).
  - *Kategori:* İKİ satır, Google kütüphanesinin topladıkları DAHİL (aşağıdaki karar).
    **Uygulama bilgisi ve performans › Diğer uygulama performans verileri**: bizim yazdığımız sonuç
    (uygulamanın ve çalıştığı ortamın durumu) ile kütüphanenin gönderdiği uygulama meta verisi (paket
    adı, sürüm, imza sertifikası) ve oturum açmış kullanıcının Play lisans durumu. **Cihaz veya diğer
    kimlikler**: kütüphanenin gönderdiği cihaz bilgisi (anahtar doğrulama sertifikası, cihaz doğrulama
    belgesi) ve `requestHash`. Bizim SAKLADIĞIMIZ şey bir tanımlayıcı değil (`requestHash` her açılışta
    yeni, rastgele bir nonce'un özeti); satır, cihazdan Google'a giden veri yüzünden var.
  - *Console'da tek tür:* Play formunda "Cihaz veya diğer kimlikler" TEK bir veri türü; bildirim jetonu
    satırıyla birleşik cevap: toplanıyor Evet, paylaşılıyor Evet (FCM yüzünden), geçici Hayır,
    **Zorunlu** (Play Integrity yolunda kullanıcı toplamayı kapatamıyor), amaçlar "Uygulama işlevi" +
    "Dolandırıcılık önleme, güvenlik ve uyumluluk".
  - *Amaç:* **Dolandırıcılık önleme, güvenlik ve uyumluluk** (Google'ın Play Integrity belgesinin
    tarif ettiği kullanım: uygulama, lisans ve cihaz bütünlüğünü doğrulamak).
  - *Paylaşım:* Hayır. Google'ın kendi beyanı (developer.android.com/google/play/integrity/terms,
    "Data safety" bölümü): Play Integrity'nin topladığı veri üçüncü taraflara aktarılmıyor ve Play
    Store'un bu işlemesi Google Play Hizmet Şartları'na tabi; sunucumuzun belgeyi çözdürmek için
    Google'a geri göndermesi Play tanımında hizmet sağlayıcıya aktarım, paylaşım değil. Politikada
    alıcı olarak yazılı ("Google (Play Integrity)", bağımsız veri sorumlusu).
  - *Geçici:* Hayır (90 gün tutuluyor). *Zorunlu:* misafir yolunda kullanıcının kapatabileceği bir
    anahtar yok; misafir modu isteğe bağlı olsa da satır "zorunlu" işaretlenir (temkinli seçim).
  - *Google kütüphanesinin topladıkları BEYAN EDİLİYOR (Samet, 2026-09-24; yaygın ve temkinli uygulama).*
    Play Veri güvenliği yardımı geliştiriciyi uygulamadaki bütün kütüphanelerin (Google'ınkiler dahil)
    cihazdan gönderdiği veriden sorumlu tutuyor. Google'ın sayfası
    (developer.android.com/google/play/integrity/terms) API'nin topladıklarını sayıyor: `requestHash`/nonce,
    uygulama meta verisi (paket adı, sürüm, imza sertifikası), oturum açmış kullanıcı için Play lisans
    durumu, cihaz bilgisi (anahtar doğrulama sertifikası, cihaz doğrulama belgesi). Ortam ayrıntıları
    (Play Protect durumu, uygulama erişim riski) bizde KAPALI, o yüzden toplanmıyor ve beyan edilmiyor;
    açılırsa "Diğer uygulama performans verileri" satırına eklenir. Veri şifreli, üçüncü tarafa
    paylaşılmıyor, sabit süre sonra siliniyor; Google "formu nasıl dolduracağınıza siz karar verirsiniz"
    diyor, karar temkinli taraf.
  - App Store tarafı etkilenmiyor: iOS'ta kontrol yok (App Attest Aşama 4).
- Analitik olayları kapalı sözlükten gelir, serbest metin taşımaz; Ayarlar › Gizlilik'ten kapatılabilir. Tercih 1.5'ten beri hesaba (misafirde misafir kimliğine) yazılıyor ve sunucu da uyuyor (LEG-9).

## Güvenlik uygulamaları

| Soru | Cevap |
|---|---|
| Veriler aktarımda şifreleniyor | Evet |
| Veriler silinebiliyor | Evet (hesap silme; ayrıca yazılar tek tek silinebilir) |
| Bağımsız güvenlik incelemesi | Hayır |

## Bağlantılar

- Gizlilik politikası: `https://www.lernomi.app/privacy` (Türkçe kısayol `/gizlilik`)
- Kullanım şartları: `https://www.lernomi.app/terms`
- Hesap silme: `https://www.lernomi.app/account/delete` (`/hesap-sil`)
- Alan adı değişince üçünü de Console'da güncelle.

## Diğer beyanlarla tutarlılık

- Foreground service (mikrofon): "Kullanıcının başlattığı sürekli ses yakalama — yürüyüş modunda konuşma tanıma". Video: Öğren › Yürüyüş modu › Başla → onay ekranı (MicDisclosure, sağlayıcılar adıyla) → izin → ekran kapatma → bildirim → ekran kapalıyken bir cevap → durdurma (`docs/play/console.md` §3).
- İçerik derecelendirme: kullanıcılar birbirini görüyor (görünen ad, arkadaşlık), yapay zekâ ile etkileşim var, dijital satın alma **var** (abonelik; RevenueCat iki platformda da bağlı, Play abonelikleri ve `lernomi_default` offering kurulu).
- Üretken yapay zekâ: uygulama içi bildirme (her yanıtın altında "Bildir"), promptlarda güvenlik sınırları, insan incelemesi (admin › Loglar).
