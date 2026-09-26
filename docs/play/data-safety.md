# Google Play Console — Veri güvenliği beyanı (Lernomi, `com.lernomi.learn`)

Kodda doğrulanan toplamaya göre hazırlandı. Alıcı listesinin kaynağı `src/lib/legal/index.ts`
(`PROCESSORS`) ve gizlilik politikası `/privacy`; yeni bir sağlayıcı ya da veri türü eklenince
önce onlar, sonra bu belge, sonra Console'daki form güncellenir. "Paylaşım" Play tanımıyla:
verinin üçüncü tarafa aktarılması; sunucumuz üzerinden konuşma tanıma ve dil modeli
sağlayıcılarına giden veri de paylaşımdır, hizmet sağlayıcıya (Cloudflare, Google'ın Play
Integrity çözümlemesi) aktarım değildir.

Console'daki kimlik ve iletişim `LEGAL_ENTITY`deki hizmet sağlayıcınınkidir (bkz.
`docs/play/listing.md` §5): destek `support@lernomi.app`, veri talepleri `kvkk@lernomi.app` ve
`gdpr@lernomi.app`. Form Console'dan CSV olarak dışa aktarılıp bu belgeye göre doldurulur
(denetim G1, G7, M8).

## Genel sorular

| Soru | Cevap |
|---|---|
| Uygulama kullanıcı verisi topluyor ya da paylaşıyor mu | Evet |
| Toplanan tüm veriler aktarımda şifreleniyor mu | Evet (HTTPS) |
| Kullanıcı veri silme talebinde bulunabiliyor mu | Evet — `https://www.lernomi.app/account/delete` ve uygulama içi Profil › Ayarlar › Hesap › Hesabı sil; hesapsız kullanımda Profil › Misafir verilerini sil |
| Hesap oluşturma var mı | Evet (e-posta/parola, Google, Apple), isteğe bağlı. Misafirde e-posta ve ad toplanmıyor; rastgele kullanıcı kimliği, öğrenme verisi ve etkileşim toplanıyor, hesaba birleşince ya da 30 gün kullanılmayınca siliniyor |
| Bağımsız güvenlik incelemesi (MASA) | Hayır |
| Aileler politikasına tabi mi | Hayır (hedef kitle 18+) |

## Veri türleri

| Kategori › Veri türü | Toplanıyor | Paylaşılıyor | Geçici | Zorunlu | Amaçlar |
|---|---|---|---|---|---|
| Kişisel bilgi › Ad | Evet | Hayır | Hayır | Zorunlu | Hesap yönetimi, kişiselleştirme |
| Kişisel bilgi › E-posta adresi | Evet | Hayır | Hayır | Zorunlu | Hesap yönetimi, güvenlik (doğrulama, parola sıfırlama) |
| Kişisel bilgi › Kullanıcı kimlikleri | Evet | Evet (RevenueCat) | Hayır | Zorunlu | Hesap yönetimi, satın alma eşleme |
| Kişisel bilgi › Diğer bilgi (IP, tarayıcı/cihaz tanımı — oturum kaydı) | Evet | Hayır | Hayır | Zorunlu | Dolandırıcılık önleme, güvenlik, hız sınırı |
| Ses › Ses kayıtları | Evet | Evet (Microsoft Azure, Groq, Cloudflare, Speechmatics, Deepgram) | Evet (aşağıya bak) | İsteğe bağlı (ekran kapalı yürüyüş; uygulama içi açık rıza) | Uygulama işlevi (konuşma tanıma) |
| Mesajlar › Diğer uygulama içi mesajlar (yazma görevleri, sohbet, sınav cevapları) | Evet | Evet (Groq, Mistral, Cerebras) | Hayır | İsteğe bağlı (uygulama içi açık rıza) | Uygulama işlevi (değerlendirme ve geri bildirim) |
| Uygulama etkinliği › Uygulama içi etkileşimler (ilerleme, seri, XP, ekran olayları) | Evet | Hayır | Hayır | Zorunlu (ilerleme) / isteğe bağlı (olaylar) | Uygulama işlevi, analitik, kişiselleştirme |
| Uygulama etkinliği › Diğer kullanıcı içeriği (görünen ad, kullanıcı adı, bildirimler) | Evet | Hayır | Hayır | İsteğe bağlı | Uygulama işlevi, kişiselleştirme, güvenlik (moderasyon) |
| Uygulama etkinliği › Diğer eylemler (arkadaşlık, tepki, dürtme, ortak görev, engelleme) | Evet | Hayır | Hayır | İsteğe bağlı | Uygulama işlevi (sosyal) |
| Uygulama bilgisi ve performans › Çökme günlükleri (anonim JS hata raporu) | Evet | Hayır | Hayır | Zorunlu | Uygulama işlevi, analitik (hata ayıklama) |
| Uygulama bilgisi ve performans › Tanılama (hata raporundaki ekran adı, sürüm, platform) | Evet | Hayır | Hayır | Zorunlu | Uygulama işlevi, analitik |
| Uygulama bilgisi ve performans › Diğer (ekran genişliği, platform etiketi) | Evet | Hayır | Hayır | İsteğe bağlı | Analitik |
| Uygulama bilgisi ve performans › Diğer uygulama performans verileri (Play Integrity) | Evet | Hayır | Hayır | Zorunlu | Dolandırıcılık önleme, güvenlik ve uyumluluk |
| Finansal bilgi › Satın alma geçmişi | Evet | Evet (RevenueCat, Google Play) | Hayır | İsteğe bağlı | Uygulama işlevi (abonelik) |
| Cihaz veya diğer kimlikler (bildirim jetonu + Play Integrity cihaz bilgisi) | Evet | Evet (Google — Firebase Cloud Messaging) | Hayır | Zorunlu | Uygulama işlevi, dolandırıcılık önleme, güvenlik ve uyumluluk |
| Konum, kişiler, takvim, fotoğraf/video, sağlık | Hayır | — | — | — | — |

## Notlar

- **Ses "geçici" koşullu.** Lernomi sunucusu sesi saklamıyor; Speechmatics işi transkriptten
  sonra siliniyor, Deepgram isteği `mip_opt_out=true` taşıyor (denetim LEG-3); Azure kısa ses ve
  Cloudflare Workers AI belgelerine göre saklamıyor; Mistral ses almıyor. Groq arıza/kötüye
  kullanım için 30 güne kadar kayıt tutabiliyor; Console › Data Controls › Zero Data Retention
  açılınca tutmuyor (denetim G5, Samet). Koşullardan biri geri alınırsa "geçici" kalkar.
- **Paylaşım izinle.** Metin dil modellerine, ses konuşma tanıma sağlayıcılarına ancak
  sağlayıcıları adıyla sayan ekranda izin verildikten sonra gidiyor; karar sunucuda
  (`user_consents`). Bu yüzden bu türler "isteğe bağlı".
- **Play Integrity** canlıda `log` kipinde (sunucu `GUEST_ATTESTATION=log`; Android vc 6'dan beri
  belge gönderiliyor), bu yüzden iki satır formda **zorunlu**. Android'de "Hesapsız devam et"te
  uygulama Google Play Integrity'den imzalı bir belge alıyor; sunucu onu Google'a çözdürüp yalnız
  hükümleri ve sebebi `guest_attestations`a yazıyor (90 gün, belgenin kendisi yazılmıyor).
  - *Diğer uygulama performans verileri:* bizim yazdığımız sonuç ve kütüphanenin gönderdiği
    uygulama meta verisi (paket adı, sürüm, imza sertifikası), oturum açmış kullanıcının Play
    lisans durumu.
  - *Cihaz veya diğer kimlikler:* kütüphanenin gönderdiği cihaz bilgisi (anahtar doğrulama
    sertifikası, cihaz doğrulama belgesi) ve `requestHash`. Formda bu tür bildirim jetonuyla tek
    satır: paylaşılıyor Evet (FCM yüzünden), Zorunlu (Integrity yolunda kapatma anahtarı yok),
    amaçlar birleşik.
  - *Paylaşım yok:* Google'ın beyanına göre (developer.android.com/google/play/integrity/terms)
    Integrity verisi üçüncü taraflara aktarılmıyor; belgeyi çözdürmek hizmet sağlayıcıya
    aktarım. Politikada "Google (Play Integrity)" alıcı olarak yazılı.
  - Google kütüphanesinin topladıkları temkinli taraf seçilerek beyan ediliyor (Samet,
    2026-09-24). Ortam ayrıntıları (Play Protect, uygulama erişim riski) kapalı; açılırsa ilk
    satıra eklenir.
- **Bildirim jetonu** yalnız bildirim izni verildikten sonra üretiliyor (`mobile/firebase.json`
  › `messaging_auto_init_enabled: false`). Reklam kimliği toplanmıyor.
- **Çökme günlükleri / Tanılama:** JS hataları `/api/client-errors`e gidiyor
  (`src/lib/client-errors.ts`, `mobile/src/lib/errorReport.ts`); kullanıcı kimliği yazılmıyor,
  e-posta/jeton/uzun sayılar temizleniyor, paylaşılmıyor. Analitik anahtarı bunu kapatmadığı için
  "zorunlu". Native çökmeler yalnız Android vitals'ta. Crashlytics yok (denetim X-1).
- **Analitik** olayları kapalı sözlükten, serbest metin yok; Ayarlar › Gizlilik'ten
  kapatılabilir, tercih hesapta ve sunucu uyuyor (denetim LEG-7).
- **Google/Apple ile giriş:** sağlayıcı bize kimlik, ad ve e-posta veriyor; "Kişisel bilgi"
  satırlarıyla karşılanıyor. Apple ile giriş Android'de web akışıyla.
- **Cloudflare** (ters vekil, Turnstile) ve **seslendirme** (Edge/Azure; yalnız seslendirilecek
  metin, hesap bilgisi yok) formda satır gerektirmiyor; politikada alıcı olarak yazılı.

## Güvenlik uygulamaları ve bağlantılar

| Soru | Cevap |
|---|---|
| Veriler aktarımda şifreleniyor | Evet |
| Veriler silinebiliyor | Evet (hesap silme; yazılar tek tek de silinebilir) |
| Bağımsız güvenlik incelemesi | Hayır |

Gizlilik politikası `https://www.lernomi.app/privacy` · şartlar `/terms` · hesap silme
`/account/delete`. Alan adı değişirse üçü Console'da güncellenir.

## Diğer beyanlarla tutarlılık

- Ön plan servisi: "Kullanıcının başlattığı sürekli ses yakalama — yürüyüş modunda konuşma
  tanıma"; video akışı Öğren › Yürüyüş modu › Başla ile başlıyor (`docs/play/console.md` §3).
- İçerik derecelendirme: kullanıcılar birbirini görüyor, yapay zekâ etkileşimi ve dijital satın
  alma var (`docs/play/listing.md` §2).
- Üretken yapay zekâ: uygulama içi bildirme, promptlarda güvenlik sınırları, insan incelemesi.
