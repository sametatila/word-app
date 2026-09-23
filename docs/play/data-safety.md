# Google Play Console — Veri Güvenliği beyanı (Lernomi, `com.lernomi.learn`)

Kodda doğrulanan toplamaya göre hazırlandı; kaynak listesi `src/lib/legal/index.ts` (`PROCESSORS`) ve gizlilik
politikası `/privacy`. Yeni bir sağlayıcı ya da veri türü eklenince önce bu üçü güncellenir,
sonra Console'daki form. "Paylaşım" Play tanımıyla: verinin üçüncü tarafa aktarılması —
sunucumuz üzerinden konuşma tanıma ve dil modeli sağlayıcılarına giden veri de paylaşımdır.

Son güncelleme: 2026-09-23 (hukuki sürüm 1.5; yayın öncesi denetim LEG-1/2/3/15). Kimlik ve iletişim bilgileri `src/lib/legal/index.ts`'te; Console'a girilecek destek adresi `support@lernomi.app`, gizlilik/veri talepleri `kvkk@lernomi.app` (KVKK) ve `gdpr@lernomi.app` (GDPR). Veri sorumlusu ile Play yayıncısı **ayrı kişiler** (bkz. `docs/play/listing.md` §5): Console'a girilecek kimlik yayıncınındır. Veri sorumlusu Almanya'da yerleşik olduğundan GDPR m.27 AB temsilcisi gerekmiyor. Türkiye temsilcisi ataması imzalanıp Kuruma bildirilene kadar metinler temsilciden söz etmiyor (1.5, LEG-7). VERBİS kaydı yapılmıyor (çalışan sayısı ve mali bilanço eşiklerine dayanan istisna) ve metinler kayıtlı olduğunu iddia etmiyor.

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
| Mesajlar › Diğer uygulama içi mesajlar (yazılan ve söylenen metinler: yazma görevleri, konuşma pratiği, sınav cevapları) | Evet | Evet (Groq, Mistral, Cerebras) | Hayır | İsteğe bağlı (uygulama içi açık rıza, izin yoksa gönderilmez) | Uygulama işlevi (değerlendirme ve geri bildirim) |
| Uygulama etkinliği › Uygulama içi etkileşimler (ilerleme, seri, XP, ekran görüntüleme olayları) | Evet | Hayır | Hayır | Zorunlu (ilerleme) / isteğe bağlı (olaylar, kapatılabilir) | Uygulama işlevi, analitik, kişiselleştirme |
| Uygulama etkinliği › Diğer kullanıcı içeriği (görünen ad, kullanıcı adı, içerik ve kullanıcı bildirimleri) | Evet | Hayır | Hayır | İsteğe bağlı (görünen ad boş bırakılabilir) | Uygulama işlevi, kişiselleştirme (sıralama, sosyal profil), güvenlik (moderasyon) |
| Uygulama etkinliği › Diğer eylemler (arkadaşlık istekleri, tepkiler, dürtmeler, ortak görevler, engellemeler) | Evet | Hayır | Hayır | İsteğe bağlı | Uygulama işlevi (sosyal özellikler) |
| Uygulama bilgisi ve performans › Çökme günlükleri (anonim JS hata raporu: hata iletisi, yığın izi) | **Evet** | Hayır | Hayır | Zorunlu (analitik anahtarından bağımsız gönderiliyor) | Uygulama işlevi, analitik (hata ayıklama) |
| Uygulama bilgisi ve performans › Tanılama (hata raporuna eşlik eden ekran adı, uygulama sürümü, platform) | **Evet** | Hayır | Hayır | Zorunlu | Uygulama işlevi, analitik |
| Uygulama bilgisi ve performans › Diğer (ekran genişliği, platform etiketi) | Evet | Hayır | Hayır | İsteğe bağlı (kapatılabilir) | Analitik |
| Finansal bilgi › Satın alma geçmişi | Evet | Evet (RevenueCat, Google Play) | Hayır | İsteğe bağlı | Uygulama işlevi (abonelik) |
| Cihaz veya diğer kimlikler › Cihaz bildirim jetonu | **Evet** | **Evet** (Google — Firebase Cloud Messaging) | Hayır | İsteğe bağlı (bildirim izni) | Uygulama işlevi (bildirim gönderimi) |
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
