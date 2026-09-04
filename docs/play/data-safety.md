# Google Play Console — Veri Güvenliği beyanı (Lernomi, `com.lernomi.learn`)

Kodda doğrulanan toplamaya göre hazırlandı; kaynak listesi `src/lib/legal.ts` ve gizlilik
politikası `/privacy`. Yeni bir sağlayıcı ya da veri türü eklenince önce bu üçü güncellenir,
sonra Console'daki form. "Paylaşım" Play tanımıyla: verinin üçüncü tarafa aktarılması —
sunucumuz üzerinden konuşma tanıma ve dil modeli sağlayıcılarına giden veri de paylaşımdır.

Son güncelleme: 2026-09-04. Kimlik ve iletişim bilgileri `src/lib/legal.ts`'teki yer tutucular doldurulunca kesinleşir; Console'a girilecek e-posta da o dosyadaki gizlilik adresidir. Veri sorumlusu ile Play yayıncısı **ayrı kişiler** (bkz. `docs/play/listing.md` §5): Console'a girilecek kimlik yayıncınındır. Veri sorumlusu Almanya'da yerleşik olduğundan GDPR m.27 AB temsilcisi gerekmiyor; Türkiye'deki başvurular için yayıncı veri sorumlusu temsilcisi olarak belirlendi. VERBİS kaydı yapılmıyor (çalışan sayısı ve mali bilanço eşiklerine dayanan istisna) ve metinler kayıtlı olduğunu iddia etmiyor.

## Genel sorular

| Soru | Cevap |
|---|---|
| Uygulama kullanıcı verisi topluyor ya da paylaşıyor mu | Evet |
| Toplanan tüm veriler aktarımda şifreleniyor mu | Evet (HTTPS) |
| Kullanıcı veri silme talebinde bulunabiliyor mu | Evet — `https://www.lernomi.app/account/delete` ve uygulama içi Ayarlar › Hesap › Hesabı sil |
| Hesap oluşturma var mı | Evet (e-posta/parola, Google) |
| Bağımsız güvenlik incelemesi (MASA) | Hayır |
| Aileler politikasına tabi mi | Hayır (hedef kitle 18+; şartlar hesap açmayı 18 yaşla sınırlıyor) |

## Veri türleri

Sütunlar Console'daki sırayla: toplanıyor / paylaşılıyor / geçici işleme / zorunlu mu / amaçlar.

| Kategori › Veri türü | Toplanıyor | Paylaşılıyor | Geçici | Zorunlu | Amaçlar |
|---|---|---|---|---|---|
| Kişisel bilgi › Ad | Evet | Hayır | Hayır | Zorunlu | Hesap yönetimi, kişiselleştirme |
| Kişisel bilgi › E-posta adresi | Evet | Hayır | Hayır | Zorunlu | Hesap yönetimi, güvenlik (doğrulama, parola sıfırlama) |
| Kişisel bilgi › Kullanıcı kimlikleri | Evet | Evet (RevenueCat, premium açılınca) | Hayır | Zorunlu | Hesap yönetimi, satın alma eşleme |
| Kişisel bilgi › Diğer bilgi (IP adresi, tarayıcı/cihaz tanımı — oturum kaydı) | Evet | Hayır | Hayır | Zorunlu | Dolandırıcılık önleme, güvenlik, hız sınırı |
| Ses › Ses kayıtları | Evet | Evet (Microsoft Azure, Groq, Cloudflare, Speechmatics, Deepgram, Mistral) | Evet (saklanmaz) | İsteğe bağlı (yürüyüş modu, açık rıza) | Uygulama işlevi (konuşma tanıma) |
| Mesajlar › Diğer uygulama içi mesajlar (yazılan ve söylenen metinler: yazma görevleri, konuşma pratiği, sınav cevapları) | Evet | Evet (Groq, Mistral, Cerebras, Google Gemini, OpenRouter) | Hayır | İsteğe bağlı | Uygulama işlevi (değerlendirme ve geri bildirim) |
| Uygulama etkinliği › Uygulama içi etkileşimler (ilerleme, seri, XP, ekran görüntüleme olayları) | Evet | Hayır | Hayır | Zorunlu (ilerleme) / isteğe bağlı (olaylar, kapatılabilir) | Uygulama işlevi, analitik, kişiselleştirme |
| Uygulama etkinliği › Diğer kullanıcı içeriği (görünen ad, kullanıcı adı, biyografi, içerik ve kullanıcı bildirimleri) | Evet | Hayır | Hayır | Zorunlu (ad) / isteğe bağlı (biyografi) | Uygulama işlevi, kişiselleştirme (sıralama, sosyal profil), güvenlik (moderasyon) |
| Uygulama etkinliği › Diğer eylemler (arkadaşlık istekleri, tepkiler, dürtmeler, ortak görevler, engellemeler) | Evet | Hayır | Hayır | İsteğe bağlı | Uygulama işlevi (sosyal özellikler) |
| Uygulama bilgisi ve performans › Diğer (ekran genişliği, platform etiketi) | Evet | Hayır | Hayır | İsteğe bağlı (kapatılabilir) | Analitik |
| Finansal bilgi › Satın alma geçmişi | Evet (premium açılınca) | Evet (RevenueCat, Google Play) | Hayır | İsteğe bağlı | Uygulama işlevi (abonelik) |
| Konum, kişiler, takvim, fotoğraf/video, sağlık, cihaz veya diğer kimlikler, çökme günlükleri, tanılama | Hayır | Hayır | — | — | Toplanmıyor |

Notlar:
- "Geçici işleme" yalnız ses kaydı için: ses tanıma bitince silinir, hiçbir yerde saklanmaz.
- Google ile giriş: Google, hesap kimliği/ad/e-posta'yı bize verir (Google'a bizden veri gitmez). Console'da bu, "Kişisel bilgi" toplama satırlarıyla karşılanır.
- Reklam SDK'sı, üçüncü taraf analitik ve çökme raporlama yok; "Cihaz veya diğer kimlikler" hayır.
- Analitik olayları kapalı sözlükten gelir, serbest metin taşımaz; Ayarlar › Gizlilik'ten kapatılabilir.

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

- Foreground service (mikrofon): "Kullanıcının başlattığı sürekli ses yakalama — yürüyüş modunda konuşma tanıma". Video: Başla → onay ekranı (MicDisclosure) → izin → ekran kapatma → bildirim → durdurma.
- İçerik derecelendirme: kullanıcılar birbirini görüyor (görünen ad, arkadaşlık), yapay zekâ ile etkileşim var, dijital satın alma premium açılınca.
- Üretken yapay zekâ: uygulama içi bildirme (her yanıtın altında "Bildir"), promptlarda güvenlik sınırları, insan incelemesi (admin › Loglar).
