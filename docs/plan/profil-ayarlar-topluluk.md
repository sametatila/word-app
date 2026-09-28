# Profil, Ayarlar, Topluluk — yeniden kurgu

Samet'in isteği (2026-09-28): arkadaş ekranı, profil ve ayarlar dağınık; aynı yere birden çok kapı var, başlıkta
zaten olan şeyler profilde tekrar ediyor. Modern uygulamaların düzenine göre üç platformda (web, iOS, Android)
aynı yapı. Kararların hepsi Samet'in (2026-09-28, iki tur soru); uygulama taslak onayından sonra.

## Bugünkü sorunlar (envanter, 2026-09-28)

1. Gelen kutusu üç yerde: başlık düğmesi, profil menüsü, arkadaş kartındaki "N yeni" (dokunulmuyor).
2. Arkadaşlar hem alt sekmede hem profil menüsünde.
3. Haftalık lig yalnız profilden; arkadaş tablosu iki yerde (Arkadaş sekmesinin dibi + Lig › Arkadaşlar).
4. İki dişli, iki hedef: profil → uygulama ayarları, arkadaş kartı → kullanıcı adı / görünürlük / izinler /
   engellenenler. Ayarlar'ın "Gizlilik" bölümünde engellenenler yok.
5. İki "Arkadaşını davet et", iki bağlantı: profil davet kodu (mobil `/r/KOD`, web `/premium?code=KOD`),
   arkadaş ekranı profil bağlantısı (`/u/<ad>?src=invite`).
6. Gelişim (Kelimelerim, Yapabildiklerim, Yazılarım) yalnız alev hapından; seri 0 olunca hap yok, yol yok.
7. Hesabı sil mobilde iki yerde (profil dibi + Ayarlar › Hesap), web'de yalnız profilde (yorum aksini söylüyor).
8. Adlar: web "NotificationBell" gelen kutusunu açıyor; "Bildirimler" hatırlatma ayarının adı.
9. Web'de Künye ve açık kaynak lisansları satırı yok; Premium üye bandı web'de dokunulmaz, mobilde Paywall.

## Kararlar

| Konu | Karar |
|---|---|
| Alt sekmeler | Öğren · Patika · Beceriler · **Topluluk** (Arkadaş sekmesinin yerine) |
| Topluluk içi | Üst sekmeler **Lig · Arkadaşlar · Akış**. Lig: "Grubum / Arkadaşlar" süzgeci; arkadaş tablosu yalnız burada. Arkadaşlar: istekler, görevler, liste, arama. |
| Başlık | alev · zil · avatar. Alev seri 0'da sönük ama görünür, Gelişim'i açar. Zil = "Bildirimler" (bugünkü gelen kutusu); "Gelen kutusu" adı kalkar. |
| Profil | kimlik; Seri + XP; lig sırası kartı (→ Topluluk › Lig); Gelişim bölümü; son 3 başarım + Tümü; Premium durumu (üyeyse abonelik yönetimi). Sağ üstte tek dişli → Ayarlar. |
| Profilden çıkan | gelen kutusu, arkadaşlar, haftalık sıralama, davet, çıkış, hesabı sil |
| Ayarlar yapısı | Kısa grup listesi + alt ekranlar. Web masaüstünde iki bölmeli (solda liste, sağda içerik). |
| Ayarlar sırası | Öğrenme · Uygulama · Hatırlatmalar · Hesap · Gizlilik · Abonelik · Destek ve hakkında · Çıkış yap |
| Sosyal ayarlar | Tek Ayarlar'a: kullanıcı adı → Hesap; görünürlük, izinler, engellenenler → Gizlilik. Topluluk'taki dişli kalkar. |
| Güvenlik | Hesap içinde alt ekran: parola, iki adımlı doğrulama, oturumlar |
| Çıkış / silme | Yalnız Ayarlar: "Çıkış yap" en altta, "Hesabı sil" Hesap'ın sonunda (mağaza kuralı: uygulama içinde bulunur) |
| Davet | Tek davet, Topluluk'ta, `/r/KOD` (web de). Bağlantı bugün de yeni hesaptan davet edene arkadaşlık isteği gönderiyor (`referral.explain`); profil bağlantısı (`/u/<ad>?src=invite`) davet düğmesinden çıkar. |
| Web kenar çubuğu | Aynı 4 sekme; ayraç altında Profil + Ayarlar. Kelimelerim ve seri/XP göstergesi kalkar. |
| Misafir | Topluluk görünür, tek kart "Arkadaş ve lig için hesap aç". Profil kısa (Seri/XP, Gelişim, başarımlar, hesap aç bandı). Ayarlar'da Hesap yerine "Hesap aç" + "Misafir verilerini sil". |

## Ayarlar içeriği

1. **Öğrenme** — öğrenilecek dil, seviye (+ seviye testi), günlük hedef ve yeni kelime sayısı.
2. **Uygulama** — arayüz dili (Ana dilim), ses (okuma sesi, oyun sesleri), görünüm; web'de "Ana ekrana ekle".
3. **Hatırlatmalar** — bugünkü Bildirimler ekranı (günlük hatırlatma + saat, seri koruma, haftalık sınav, sistem
   ayarları, deneme bildirimi).
4. **Hesap** — görünen ad, kullanıcı adı, giriş yöntemleri, Güvenlik ›, Hesabı sil.
5. **Gizlilik** — profil görünürlüğü, izinler (istek, öneriler, etkinlik), engellenenler, kullanım verisi,
   yapay zekâ geri bildirimi onayı, mikrofon onayı.
6. **Abonelik** — Premium durumu ve yönetimi (mağaza abonelik sayfası), değilse Premium'a geç.
7. **Destek ve hakkında** — destek ve iletişim, gizlilik politikası, şartlar, Künye, açık kaynak lisansları, sürüm.
8. **Çıkış yap**.

## Aşamalar

1. Ayarlar birleşmesi (grup listesi + alt ekranlar, sosyal ayarların taşınması, çıkış/silme, web Künye/lisans).
2. Profil sadeleşmesi (menü kalkar; lig kartı, Gelişim, başarım önizlemesi, Premium).
3. Topluluk sekmesi (Lig · Arkadaşlar · Akış, tek davet); başlıkta zil adı ve alev.
4. Web davet bağlantısı `/premium?code=KOD` → `/r/KOD` (mobil gibi).

Web her push'ta canlıya gider, mobil build ile. Aynı günde çıkması için web kısmı mobil build'le birlikte push
edilir. Eski adresler (`/friends/settings`, `/inbox`, `/leaderboard`) yönlendirmeyle yaşar; bildirim derin
bağlantıları (`league_up`, istekler) yeni yerleri açar. Her aşamada i18n (tr/en/de, web + mobil), `check:parity`,
mağaza inceleme notundaki hesap silme yolu (`docs/appstore/README.md`, `docs/play/console.md`) güncellenir.
