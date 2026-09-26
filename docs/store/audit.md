# Mağaza ve hukuk denetimleri — tek kayıt

Yayın öncesi denetimlerin git'teki tek kaydı. Kullanım:

- Yeni denetim önce buraya bakar. ✅ satırlar kanıtıyla (commit, API okuması, Samet'in kararı)
  yazılı; yeniden araştırılmaz, yalnız kanıtın hâlâ geçerli olduğu kontrol edilir.
- Yeni denetim kendi bölümünü en alta ekler; önceki bir maddeyi kapatıyorsa o satır güncellenir.
- Madde kapanınca ya da karar değişince satır burada güncellenir; başka belgede durum tablosu
  tutulmaz.
- İşaretler: ✅ yapıldı · ◐ kısmen · ⏳ açık (kimde) · ? belirsiz.

## 2026-09-25 denetimi

Rapor: https://claude.ai/artifact/AGhitESr9H9PaAQmbdkhGk. Durumlar 2026-09-26'da commit'lerden ve
ASC salt okuma dökümünden güncellendi.

### M — Mağaza konsolları ve gönderim

| Madde | Konu | Durum | Kanıt / kalan |
|---|---|---|---|
| M1 | ASC açıklama, anahtar kelime, altyazı, tanıtım metni boş | ✅ | 2026-09-25 API ile üç dilde girildi, geri okundu (7fe5672c); metinler `docs/store/README.md` |
| M2 | en/de Support URL boş | ✅ | `/support/en`, `/support/de` girildi (2026-09-25, API) |
| M3 | Ekran görüntüsü, ikon, öne çıkan grafik yok | ◐ Samet | Play 512 ikonu yüklendi (3f8b4ea1). ASC'de üç dilde kare seti 0 (2026-09-26 okuması); iPhone 6.9", iPad 13", Play telefon kareleri ve 1024×500 grafik tasarımdan sonra |
| M4 | Abonelikler MISSING_METADATA, sürüme eklenmemiş | ⏳ Samet | 2026-09-26: iki abonelik hâlâ MISSING_METADATA, inceleme görseli yok. Paywall görüntüsü yüklenip ikisi 1.0.0'a eklenecek |
| M5 | Sürüme bağlı build 4 (Crashlytics'li) | ⏳ Samet + Claude | 2026-09-26: 1.0.0'a hâlâ build 4 bağlı; TestFlight'ta 8'e kadar VALID. Gönderimden önce son build bağlanır |
| M6 | Play listesi boş, en/de yok | ✅ | tr-TR, en-US, de-DE başlık + kısa + tam açıklama girildi, geri okundu (2026-09-25, API) |
| M7 | Play kapalı test: 12 testçi × 14 gün | ⏳ Samet | 17 testçi `Lernomi-Beta`da, kanalda sürüm yok. Taslak uygulamada API yalnız taslak sürüm koyabiliyor; kanal Console'dan incelemeye gönderilerek açılır (M6, M8 önce) |
| M8 | Play › Uygulama içeriği formları | ⏳ Samet | Uygulama erişimi (`docs/play/console.md` §1), ön plan servisi beyanı + video (§3), Veri güvenliği (`docs/play/data-safety.md`, G1), IARC, hedef kitle, reklam kimliği "Hayır" |
| M9 | OAuth "In production" + Play imzalı sürümde Google girişi | ⏳ Samet | Play imzasının SHA-1 istemcileri açık (`docs/play/console.md` §2); cihazda denenmedi |
| M10 | Gerçek iPhone koşusu | ⏳ Samet | `docs/plan/ios-device-runbook.md` kayıt tablosu: yürüyüş, kilit ekranı, sandbox satın alma, Apple girişi, silme |
| M11 | İnceleme notu arayüzde olmayan adlar kullanıyor | ✅ | f1b75548; canlı not `docs/appstore/connect.md` §1 bloğuyla birebir (2026-09-26 karşılaştırıldı, 3.905 karakter) |
| M12 | TestFlight beta açıklamaları kursları ters anlatıyor | ✅ | f1b75548, üç dil geri okundu |
| M13 | releaseType AFTER_APPROVAL | ✅ | 54ab2ef7: `releaseType: MANUAL` (2026-09-26, Samet); onaydan sonra "Release this version" ile açılır |
| M14 | Altyazı "ace exams" / "bestehen" sınav geçme vaadi | ⏳ Samet (karar) | Altyazılar Samet'in onayıyla girildi; risk kararı açık, değişirse iki mağazaya yeniden girilir |
| M15 | Maskotlu öne çıkan grafik ↔ "çocuklara çekici değil" | ◐ Samet (tasarım) | Karar verildi (2026-09-26): `docs/store/README.md` › "Görsel çerçeve" (gerçek ekran ana unsur, mirket köşede, yetişkin sahneler). 18+ kalıyor. Kalan: tasarımın bu çerçeveyle yapılması (M3) |
| M16 | İçerik hakları beyanı "üçüncü taraf içerik yok" | ⏳ Samet (karar) | 2026-09-26: ASC `DOES_NOT_USE_THIRD_PARTY_CONTENT`. Edge seslendirmesi (İ6) ve Defne/Aras referansı (İ5) kararına bağlı |

### S — Satın alma ve hesap akışları

| Madde | Konu | Durum | Kanıt / kalan |
|---|---|---|---|
| S1 | promo-2m herkese varsayılan deneme olabilir | ◐ Samet | İki teklife `rc-ignore-offer` etiketi (Play API) ve yorumlar (fc39525f). Kalan: iç test sürümünde paywall'ın "1 ay" dediğini cihazda görmek |
| S2 | Mağaza satın alması uçtan uca denenmedi | ⏳ Samet + Claude | Premium'suz demo hesapla TestFlight sandbox + Play lisans testçisi; ardından DB'de `source='store'`, `store_environment='sandbox'` satırı |
| S3 | iOS'ta Google yalnız kalabilir (4.8) | ✅ | 168d9f87: iOS'ta Google düğmesi yalnız Apple da açıkken |
| S4 | Demo hesapta "Hediye Premium" görünüyor | ✅ | İnceleme notuna "sunucuda yalnız inceleme için verildi" cümlesi (f1b75548) |
| S5 | iOS arayüzünde "Android" adı | ✅ | e0a13164 |
| S6 | Misafir paywall'ında Geri yükle yok | ✅ | 6f795209 |
| S7 | Web/Android Apple jetonu iptalinde client_id | ✅ | 10ec4ac5 (bundle, olmazsa Services ID; `test:apple`) |
| S8 | Android'de Apple kullanıcısı silmede yeniden giremiyor | ✅ | 351767e2 |
| S9 | Abonelik açıklamaları geniş vaat | ◐ Samet | Play iki üründe girildi (977973eb). ASC 2026-09-26'da hâlâ eski ("All exams…"); metin `docs/store/README.md`, girişi Samet'in onayıyla API'den |
| S10 | Android promo kodu kutusu: ücretsiz dağıtım teyidi | ⏳ Samet | Kodlar satılmıyorsa sorun yok; teyit bekleniyor (AND-6) |
| S11 | Play'de "24 saat önce iptal" cümlesi | ✅ | 5e5310a2 |
| S12 | Web'de GB/CH ziyaretçisi USD görüyor | ✅ | b80ad229 |

### İ — İçerik, yapay zekâ, fikri mülkiyet

| Madde | Konu | Durum | Kanıt / kalan |
|---|---|---|---|
| İ1 | Goethe Wortliste örnek cümleleri, depo geçmişi, şartlar cümlesi | ◐ Samet | Cümleler ✅: db354b44 (1.413), b1779f68 (720), kapı `check:published-examples` (0366e38d). Açık: depo PUBLIC, e53db725 geçmişte (private ya da geçmiş temizliği Samet'te); şartlardaki "The word lists were compiled by Lernomi" cümlesi (?) karar bekliyor |
| İ2 | Deneme sınavı yapay zekâ sonucunda Bildir ve etiket | ✅ | b6775252; sürdürülen sohbet 247d11cb |
| İ3 | "officially / resmen", kapakta "resmî değil" notu | ✅ | 607a5fd8, 311edc83 |
| İ4 | Sınav yönergesi kalıpları + BRANDS | ✅ | BRANDS listesi 1a36d07d; 1.466 yönerge alanı kendi üslubumuzla 6feb7eff (Türkçe `*Tr` alanları aynı anlamda, değişmedi) |
| İ5 | Defne/Aras referans ses izni ve model lisansı | ⏳ Samet | Kaynak, izin ve lisans `docs/plan/tts-own-voices.md`'ye tek paragraf |
| İ6 | Edge TTS (resmî olmayan uç) | ⏳ Samet | Beyan tarafı LEG-2 ile kapalı; çıkış planı (Azure ya da kendi sesler) açık |
| İ7 | Açık kaynak lisans ekranı | ✅ | b01006ea, acbc8cee (`/licenses`, `npm run licenses:gen`) |
| İ8 | Sıklık listesi ve maskot çiziminin kaynağı | ⏳ Claude + Samet | `data/a2-expansion/README.md` yalnız "OpenSubtitles türevi" diyor; lisans ve maskot sahibi yazılı değil |
| İ9 | Ligde bildirme yalnız uzun basış | ✅ | 333d7113 |

### G — Gizlilik beyanları

| Madde | Konu | Durum | Kanıt / kalan |
|---|---|---|---|
| G1 | Play Veri güvenliği Play Integrity'yi kapsamıyor | ◐ Samet | Belge hazır (`docs/play/data-safety.md`, iki satır). Console'a CSV ile girilecek (M8) |
| G2 | Integrity ısınması dokunuştan önce | ✅ | f49329eb: metin gerçeğe uyduruldu (ısınma bilerek ekranda) |
| G3 | Politika §3 cihaz kimliği cümlesi | ✅ | f49329eb |
| G4 | Pod manifestleri etiketten geniş | ◐ Samet | Uygulama manifesti ✅ (8768f0a4: Diagnostics'e Analytics, Coarse Location). ASC › App Privacy formu Samet'te (API yok) |
| G5 | "Ses saklanmaz" altı sağlayıcıdan ikisi için kanıtlı | ◐ Samet | 22cab66e, 23bbd813: Mistral ses zincirinden çıktı. Kalan: Groq Console › Data Controls › Zero Data Retention |
| G6 | Mikrofon izin metni sunucuya gönderimi söylemiyor | ✅ | 86d7b3eb |
| G7 | Veri güvenliğinde tutarsız işaretler | ⏳ Claude | CSV girilirken bilinçli seçim (G1 ile) |
| G8 | Arama sorgusu URL'de, erişim günlüğünde | ✅ | Sunucuda nginx günlük maskesi (repo dışı) |

### T — Yerel yapı ve teknik

| Madde | Konu | Durum | Kanıt / kalan |
|---|---|---|---|
| T1 | UIBackgroundModes remote-notification | ◐ Samet | fe0761ab. Kalan: görünür bildirimin cihazda geldiğini görmek (runbook 9.3a) |
| T2 | NSAllowsLocalNetworking + 1C8F.1 | ✅ | 6f80cdfc |
| T3 | İnceleme boyunca minBuild ve bakım anahtarı | ⏳ Claude (kural) | İnceleme süresince `minBuild.ios` gönderilen build'in altında, bakım kapalı; Integrity Aşama 3'te iOS muafiyeti korunur |
| T4 | Debug keystore'a bağlı OAuth istemcisi | ⏳ Samet | Google Cloud'da `lernomi-android` (5E:8F…) silinecek (TEC-1) |
| T5 | Amazon IAP kütüphanesi pakette | ✅ (karar) | Bilerek bırakıldı (2026-09-26): `purchases-hybrid-common` bağımlılığı, çıkarmak R8/çalışma anı riski |
| T6 | Derleme klasöründe eski AAB | ⏳ Claude | Yüklemeden önce yeniden derle (`npm run release:android`) |
| T7 | Hukuki sayfalarda lang="tr" | ✅ | 7aecb20f |
| T8 | Tablet düzeni (IOS-6, Samet 2026-09-26: kolon genişlikleri, sarılan düğme/metin) | ◐ Claude | e6ab84e3: kolon tavanı 840 → 1120, ızgara 960dp'den dört sütun, istatistik ızgaraları dengeli, tek diyalog ölçüsü (440) ve uzun etikette düğmeler alt alta (web de, `check:parity`). Taranan: Android tablet yatay + dikey ve iPad 13"/mini dikey, 33 ekran; yerel sunucuyla. Kalan: iPad yatayda yeni genişlikle ve oturum içi akışlarda (konuşma, sınav, yürüyüş) göz turu build 9'da |
| T9 | İngilizce/Almanca arayüzde Türkçe içerik (Patika, görevler, başarımlar, Neler yapabilirim) | ◐ Claude | 74466b44: istemci `Accept-Language` gönderiyor; anadilsiz hesaplar (üretimde 40'ın 31'i) açılışta cihaz dilini hesaba yazıyor; onboarding anadili her zaman devrediyor. Yerelde doğrulandı; kullanıcıya build 9 ile ulaşır |

### B — Belge kaymaları

| Madde | Konu | Durum | Kanıt |
|---|---|---|---|
| B1 | Tarihli işler tablosu | ✅ | Yerel AGENTS.md güncellendi (2026-09-25) |
| B2 | Grup teklifi "herkese açık değil" | ✅ | fc39525f |
| B3 | Eskimiş belge cümleleri | ✅ | 45db437b; 2026-09-26 belge temizliği |

## 2026-09-23 denetimi

Rapor: https://claude.ai/artifact/KAAoSCw9PuWrHMaZwvvcEj (55 madde). Hukuk, içerik, teknik ve web
maddeleri aşağıda. iOS, satın alma ve Android maddelerinden **kapananlar**: X-2, X-5, X-7, X-8,
IOS-1, IOS-2, IOS-4…IOS-11, IAP-1…IAP-5, AND-5 (kanıtları 2026-09-24 tarihli
`docs/appstore/README.md` ve `docs/play/console.md` sürümlerinde, git geçmişinde). Açık kalanlar
2026-09-25 maddelerine taşındı: X-4 → M4 · IOS-3, AND-1 → M3 · AND-2 → M7 · AND-3 → M8 ·
AND-4 → M9 · AND-6 → S10 · TEC-1 → T4 · LEG-13 → G4.

| Madde | Konu | Durum | Kanıt |
|---|---|---|---|
| X-1 | Crashlytics hiçbir beyanda yok | ✅ | İki platformdan kaldırıldı (1ba3e5ce); politika birinci taraf hata raporunu anlatıyor; iOS manifestine Crash/Diagnostic |
| X-3 | İnceleme hesabı Premium, satın alma ekranına ulaşılamıyor | ✅ | apple-review@ (Premium) + apple-review-free@ ASC'de; google-review@ + google-review-free@ üretimde, Play › Uygulama erişimine M8 ile girecek. Parolalar yalnız konsollarda |
| X-6 | Mağaza adı üç yerde farklı | ✅ | 97222dce: uygulama adı Lernomi, mağaza adı "Lernomi: Almanca Öğren A1-C1" |
| X-9 | Tanıtım sayfası ve web paywall'ı mağazayla çelişiyor | ✅ | 5a695c3e, fd915f8b, f5c05c0c |
| X-10 | Belgelerde yanlış durum bilgileri | ✅ | bc4cf4f2 |
| LEG-1 | Cloudflare alıcı olarak anılmıyor | ✅ | cf9ebbcc |
| LEG-2 | Seslendirme resmî olmayan Edge ucunda | ✅ | cf9ebbcc (beyan); hizmet riski İ6 |
| LEG-3 | Speechmatics ve Deepgram'da "ses saklanmaz" | ✅ | 840b4548 (iş silme, `mip_opt_out`) |
| LEG-4 | Impressum ve DSA tüccar beyanı | ✅ | Künye yayında; ASC DSA beyanı aktif (2026-09-10); Play'de ayrı form yok, bilgi hesap doğrulamasından (2026-09-24) |
| LEG-5 | Yurt dışı aktarım güvenceleri | ⏳ Samet + Musa | KVKK standart sözleşme + Kurul bildirimi, m.27 yazılı görevlendirme, DPA'lar, eğitim ayarları. Metin yalnız var olanı söylüyor |
| LEG-6 | Hesap silinince RevenueCat kaydı kalıyor | ✅ | 8b3e5c53; sunucu anahtarı 2026-09-23 |
| LEG-7 | Analitik tercihi yalnız cihazda | ✅ | 72e9429f, 9cb15ad2 |
| LEG-8 | Şart kabulü kaydedilmiyor | ✅ | 72e9429f |
| LEG-9 | Konuşma kayıtları 30–37 günde siliniyor | ✅ | 1004ba50 (günlük temizlik) |
| LEG-10 | Taraf ve kimlik tutarlılığı | ✅ | df0ad791 |
| LEG-11 | Küçük saklama tutarsızlıkları | ✅ | Yaş ifadesi, kapanan şikâyet 1 yıl, journald 30 gün |
| TEC-2 | Apple "E-postamı Gizle" postası | ✅ | lernomi.app ve noreply@lernomi.app Apple'da kayıtlı (SPF); Resend DKIM imzalı. Uçtan uca deneme ilk gizli adresli kayıtta |
| TEC-3 | Dış izleme seyrek | ✅ | UptimeRobot 5 dk; `uptime.yml` günde bir (sertifika) |
| TEC-4 | Küçük teknik temizlikler | ✅ | 094235d3, 4b60150e |
| CNT-1 | Kayıtta ad süzgeçsiz | ✅ | efce01d4 |
| CNT-2 | Moderasyon listesi | ✅ | 3624c0d7 |
| CNT-3 | "Kendini puanla" ve anlık değerlendirmede Bildir yok | ✅ | 7afb9ce3 (deneme sınavı: İ2) |
| CNT-4 | Şartlarda sıfır tolerans ve 24 saat | ✅ | cf9ebbcc, 0142522e |
| CNT-5 | Abonelik açıklamaları ücretsiz özelliği Premium gibi satıyor | ✅ | 2026-09-23 metni; paywall diliyle yeniden: S9 |
| CNT-6 | Sınav "sertifikası" feragatsiz | ✅ | 470ba65a |
| CNT-7 | Zürih seçilebiliyor, release'te STT logları | ✅ | aaeb03c2, 4b60150e, 648e6de2 |
| CNT-8 | Deneme sınavı yönergeleri resmî sınavlara yakın | ◐ | 1580bd4c, f5c348d9 (66 yer); kalan kalıplar İ4 |
