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
| M3 | Ekran görüntüsü, ikon, öne çıkan grafik | ✅ (ASC) | 2026-10-07 API: üç dilde iPhone 6,7" 6 kare + iPad 13" 4 kare. Play telefon kareleri ve 1024×500 grafik Play tarafında ayrı (M15) |
| M4 | Abonelikler sürümle incelemede | ✅ | 2026-10-07 16:10: gönderim (4 öğe: iOS 1.0.0 build 22 + Lernomi Premium grubu + 1 Month + 1 Year) WAITING_FOR_REVIEW (API okuması). Yeni ASC akışı: abonelik ve grup sayfasından "Add for Review", sürüm aynı taslağa. Apple ücretli sözleşme/vergi/banka Active (Samet). TestFlight sandbox satın alma ve iptal uçtan uca (S2) |
| M5 | Sürüme bağlı build | ✅ | 2026-10-07: build 21 (VALID, şifreleme beyanı false) 1.0.0 sürüm kaydına API ile bağlandı ve geri okundu; TestFlight dahili testte, tr "Neler test edilecek" notu. Her yeni build bağlanır (AGENTS.md build akışı) |
| M6 | Play listesi boş, en/de yok | ✅ | tr-TR, en-US, de-DE başlık + kısa + tam açıklama girildi, geri okundu (2026-09-25, API) |
| M7 | Play kapalı test: 12 testçi × 14 gün | ⏳ Samet | Kanal `alpha` (ülkeler ve testçi listesi Samet, 2026-10-01). Build 14 `alpha`'da TASLAK (2026-10-01): taslak uygulamada API yalnız taslak koyabiliyor (400 "Only releases with status draft…"). Samet Console'dan "Kapalı teste yayınla" der; Play incelemesinden sonra 14 gün başlar. `Lernomi-Beta` kullanılmıyor |
| M8 | Play › Uygulama içeriği formları | ⏳ Samet (yalnız video) | 2026-09-29 gönderildi: Uygulama erişimi (tek hesap, `docs/play/console.md` §1), IARC (`docs/play/listing.md` §2), hedef kitle 18+ ve "küçükleri kısıtla" açık, Veri güvenliği (`docs/play/data-safety.md`), reklam kimliği "Hayır" (birleşik manifestte `AD_ID` yok). AÇIK: ön plan servisi beyanı "Arka planda ses girişi" seçili, video bağlantısı bekliyor (§3) |
| M9 | OAuth "In production" + Play imzalı sürümde Google girişi | ⏳ Samet | Play imzasının SHA-1 istemcileri açık (`docs/play/console.md` §2); cihazda denenmedi |
| M10 | Gerçek iPhone koşusu | ⏳ Samet | `docs/plan/ios-device-runbook.md` kayıt tablosu: yürüyüş, kilit ekranı, sandbox satın alma, Apple girişi, silme. 2026-10-03: iPhone SE'de TestFlight 1.0.0 (18) kurulu, cihazda Lernomi çökme kaydı yok; yürüyüş ve kilit ekranı build 15–17'de denendi (runbook 8.5b–8.5d) |
| M11 | İnceleme notu arayüzde olmayan adlar kullanıyor | ✅ | f1b75548; canlı not 2026-09-26'da `docs/appstore/connect.md` §1 bloğuyla birebirdi (3.905 karakter); 2026-09-29'da blok güncellendi, canlıda yalnız 9. madde düzeltildi (3.867), kalanı yeniden girilecek. Play'de bu not yok: iki kısa talimat, 500 karakter (`docs/play/console.md` §1) |
| M12 | TestFlight beta açıklamaları kursları ters anlatıyor | ✅ | f1b75548, üç dil geri okundu |
| M13 | releaseType AFTER_APPROVAL | ✅ | 54ab2ef7: `releaseType: MANUAL` (2026-09-26, Samet); onaydan sonra "Release this version" ile açılır |
| M14 | Altyazı "ace exams" / "bestehen" sınav geçme vaadi | ✅ | 2026-10-05: en "Speak, understand, exam-ready", de "Reden, verstehen, prüfungsfit"; ASC altyazı + Play kısa açıklama + ilk kare (iki mağaza, en/de) + landing hero; API'den geri okundu (`docs/store/README.md` "Mağazaya YENİDEN GİRİLDİ (2026-10-05)") |
| M15 | Maskotlu öne çıkan grafik ↔ "çocuklara çekici değil" | ◐ Samet (tasarım) | Karar verildi (2026-09-26): `docs/store/README.md` › "Görsel çerçeve" (gerçek ekran ana unsur, mirket köşede, yetişkin sahneler). 18+ kalıyor. Kalan: tasarımın bu çerçeveyle yapılması (M3) |
| M16 | İçerik hakları beyanı "üçüncü taraf içerik yok" | ◐ | 2026-10-07: ASC `DOES_NOT_USE_THIRD_PARTY_CONTENT` korunuyor. Karakter sesleri bizim (İ5 ✅); metin ve ses servis çıktıları (yapay zekâ, Azure) servis şartlarıyla bizim. Tek açık nokta Edge (İ6): 20 Ekim'de Azure'a geçince beyan tam doğru. Apple'ın gönderim engeli değil |

### S — Satın alma ve hesap akışları

| Madde | Konu | Durum | Kanıt / kalan |
|---|---|---|---|
| S1 | promo-2m herkese varsayılan deneme olabilir | ✅ | İki teklife `rc-ignore-offer` etiketi (Play API) ve yorumlar (fc39525f). 2026-09-27 Samet build 9 Android dahili testte doğruladı: paywall "1 ay ücretsiz". (Fiyat TRY görünüyor: Play fiyat ülkesini Google hesabının Play ülkesinden alıyor, konumdan değil; kod hatası değil) |
| S2 | Mağaza satın alması uçtan uca | ✅ iOS | 2026-10-07: TestFlight build 21, Apple satın alma penceresi (1 ay deneme 0 TL, sonra 199,99 TL/ay) → RevenueCat → `store_events` `purchase` `lernomi_premium_monthly` ios sandbox TRY → hesapta Premium `store_provider=revenuecat`, `store_state=trial`, sandbox; uygulama "satın alma başarılı". Android (Play lisans testçisi) henüz denenmedi |
| S3 | iOS'ta Google yalnız kalabilir (4.8) | ✅ | 168d9f87: iOS'ta Google düğmesi yalnız Apple da açıkken |
| S4 | Demo hesapta "Hediye Premium" görünüyor | ✅ | İnceleme notuna "sunucuda yalnız inceleme için verildi" cümlesi (f1b75548) |
| S5 | iOS arayüzünde "Android" adı | ✅ | e0a13164 |
| S6 | Misafir paywall'ında Geri yükle yok | ✅ | 6f795209 |
| S7 | Web/Android Apple jetonu iptalinde client_id | ✅ | 10ec4ac5 (bundle, olmazsa Services ID; `test:apple`) |
| S8 | Android'de Apple kullanıcısı silmede yeniden giremiyor | ✅ | 351767e2 |
| S9 | Abonelik açıklamaları geniş vaat | ✅ | Play iki üründe (977973eb); ASC iki üründe tr/en-US/de-DE 2026-09-27'de girildi, altısı geri okundu (Samet çalıştırdı). Metin `docs/store/README.md` |
| S10 | Android promo kodu kutusu: ücretsiz dağıtım teyidi | ⏳ Samet | Kodlar satılmıyorsa sorun yok; teyit bekleniyor (AND-6) |
| S11 | Play'de "24 saat önce iptal" cümlesi | ✅ | 5e5310a2 |
| S12 | Web'de GB/CH ziyaretçisi USD görüyor | ✅ | b80ad229 |
| S13 | Grup teklifi (promo-2m) tekrar alınabilir (güvenlik denetimi O10) | ✅ | 2026-10-08: Samet Play Console'da iki `promo-2m` teklifinin uygunluğunu "Hiç abonelik almamış" yaptı; Play API geri okuma: dört teklifin (iki `free-trial-1m`, iki `promo-2m`) hepsi `acquisitionRule.scope.anySubscriptionInApp`, `promo-2m` etiketleri `promo2m,rc-ignore-offer` duruyor |

### İ — İçerik, yapay zekâ, fikri mülkiyet

| Madde | Konu | Durum | Kanıt / kalan |
|---|---|---|---|
| İ1 | Goethe Wortliste örnek cümleleri, depo geçmişi, şartlar cümlesi | ◐ Samet | Cümleler ✅: db354b44 (1.413), b1779f68 (720), kapı `check:published-examples` (0366e38d). Açık: depo PUBLIC, e53db725 geçmişte (private ya da geçmiş temizliği Samet'te); şartlardaki "The word lists were compiled by Lernomi" cümlesi (?) karar bekliyor |
| İ2 | Deneme sınavı yapay zekâ sonucunda Bildir ve etiket | ✅ | b6775252; sürdürülen sohbet 247d11cb |
| İ3 | "officially / resmen", kapakta "resmî değil" notu | ✅ | 607a5fd8, 311edc83 |
| İ4 | Sınav yönergesi kalıpları + BRANDS | ✅ | BRANDS listesi 1a36d07d; 1.466 yönerge alanı kendi üslubumuzla 6feb7eff (Türkçe `*Tr` alanları aynı anlamda, değişmedi) |
| İ5 | Defne/Aras referans ses izni ve model lisansı | ✅ | 2026-10-07: sesler VoxCPM2 ses tasarımıyla yazılı tariften üretildi, gerçek kişi yok; model kod+ağırlık Apache-2.0. Kaynak ve lisans paragrafı `docs/plan/tts-own-voices.md` "KAYNAK VE LİSANS" |
| İ6 | Edge TTS (resmî olmayan uç) | ⏳ Claude, hedef 2026-10-20 (Samet) | Beyan tarafı LEG-2 ile kapalı. Kelime dışı katmanlar (dinleme, okuma, konuşma, beceri, sohbet) Edge'den; 30 günde 71.699 karakter (önbellek dışı). Plan: Edge kalkar, Azure (aynı sesler, resmî; F0 ayda 500 bin karakter) birincil; uzun vadede kendi sesler (~178 sa üretim). Samet: 20 Ekim'e kadar Edge kalıyor |
| İ7 | Açık kaynak lisans ekranı | ✅ | b01006ea, acbc8cee (`/licenses`, `npm run licenses:gen`) |
| İ8 | Sıklık listesi ve maskot çiziminin kaynağı | ✅ | Liste FrequencyWords 2018 `de_50k.txt` ile bayt bayt aynı (upstream karşılaştırması 2026-09-26), içerik CC BY-SA 4.0: atıf `/licenses` › Data ve `data/README.md` › Kaynaklar. Maskotu Lernomi ekibi oluşturdu (Samet, 2026-09-26), üçüncü taraf hakkı yok |
| İ9 | Ligde bildirme yalnız uzun basış | ✅ | 333d7113 |

### G — Gizlilik beyanları

| Madde | Konu | Durum | Kanıt / kalan |
|---|---|---|---|
| G1 | Play Veri güvenliği Play Integrity'yi kapsamıyor | ◐ Samet | Belge hazır (`docs/play/data-safety.md`, iki satır). Console'a CSV ile girilecek (M8) |
| G2 | Integrity ısınması dokunuştan önce | ✅ | f49329eb: metin gerçeğe uyduruldu (ısınma bilerek ekranda) |
| G3 | Politika §3 cihaz kimliği cümlesi | ✅ | f49329eb |
| G4 | Pod manifestleri App Privacy etiketinden geniş | ✅ | 8768f0a4 (manifest); Connect formu 2026-09-27'de on türle yayımlandı: Other Diagnostic Data App Functionality + Analytics, Coarse Location App Functionality ve kimliğe bağlı; özet manifestle birebir (Samet) |
| G5 | "Ses saklanmaz" altı sağlayıcıdan ikisi için kanıtlı | ✅ | 22cab66e, 23bbd813: Mistral ses zincirinden çıktı. 2026-09-27: Groq Console › Data Controls › Global ZDR + Inference APIs ZDR açık (Batch, Fine-tuning kapandı; kullanılmıyor). Ses zincirindeki beş sağlayıcının hepsi artık saklamıyor ya da siliyor |
| G6 | Mikrofon izin metni sunucuya gönderimi söylemiyor | ✅ | 86d7b3eb |
| G7 | Veri güvenliğinde tutarsız işaretler | ⏳ Claude | CSV girilirken bilinçli seçim (G1 ile) |
| G8 | Arama sorgusu URL'de, erişim günlüğünde | ✅ | Sunucuda nginx günlük maskesi (repo dışı) |
| G10 | Cloudflare Workers AI ses alıcısı olarak döndü (Samet, 2026-10-05: Deepgram kredisi bitince otomatik geçiş) | ✅ | Hukuk 1.10.0 (alıcılar tablosu, gizlilik §4 üç dilde, sürüm kaydı), ses rızası 4. Workers AI girdiyi saklamıyor ve eğitimde kullanmıyor (depolama servisi ve AI Gateway yok), yani App Store ve Play'deki "geçici" işaretleri geçerli; Play formu alıcı adı sormuyor, App Privacy etiketi değişmiyor. Ölçüm `docs/plan/walk-stt.md` |
| G9 | Ses yalnız ekran kapalı yürüyüşte sunucuya (Samet, 2026-09-27) | ✅ | f139e0c4, adf6d817, 7c67639e, 6b26fb9b (+ belgeler 698b0a41 içinde); canlıda 18:35. Zincir Azure → Deepgram → Groq; `/api/stt` yalnız `mode=walk`, `/api/pronounce` yalnız metin; web tarayıcı tanıyıcısıyla. Gizlilik 1.8.5, ses rızası 3. Azure anahtarı geçersizdi (401); yeni kaynak `lernomi-speech` 2026-09-27'de bağlandı, sunucudan 200 |

### T — Yerel yapı ve teknik

| Madde | Konu | Durum | Kanıt / kalan |
|---|---|---|---|
| T1 | UIBackgroundModes remote-notification | ✅ | fe0761ab; 2026-09-26 Samet build 9'da iPhone'da görünür bildirimin geldiğini doğruladı |
| T2 | NSAllowsLocalNetworking + 1C8F.1 | ✅ | 6f80cdfc |
| T3 | İnceleme boyunca minBuild ve bakım anahtarı | ⏳ Claude (kural) | İnceleme süresince `minBuild.ios` gönderilen build'in altında, bakım kapalı; Integrity Aşama 3'te iOS muafiyeti korunur |
| T4 | Debug keystore'a bağlı OAuth istemcisi | ⏳ Samet | Google Cloud'da `lernomi-android` (5E:8F…) silinecek (TEC-1) |
| T5 | Amazon IAP kütüphanesi pakette | ✅ (karar) | Bilerek bırakıldı (2026-09-26): `purchases-hybrid-common` bağımlılığı, çıkarmak R8/çalışma anı riski |
| T6 | Derleme klasöründe eski AAB | ✅ | 2026-09-26: `release-android.sh` temiz derlemeyle vc 9 AAB üretti ve dahili teste yüklendi (ProGuard eşlemiyle); eski iOS derleme klasörleri (build 1, 7, 8) silindi |
| T7 | Hukuki sayfalarda lang="tr" | ✅ | 7aecb20f |
| T8 | Tablet düzeni (IOS-6, Samet 2026-09-26: kolon genişlikleri, sarılan düğme/metin) | ◐ Claude | e6ab84e3: kolon tavanı 840 → 1120, ızgara 960dp'den dört sütun, istatistik ızgaraları dengeli, tek diyalog ölçüsü (440) ve uzun etikette düğmeler alt alta (web de, `check:parity`). Taranan: Android tablet yatay + dikey, iPad 13"/mini dikey ve iPad 13" yatay (XCUITest ile döndürülerek), 33 ekran; yerel sunucuyla. Kalan: oturum içi akışlarda (konuşma, sınav, yürüyüş) göz turu build 9'da |
| T9 | İngilizce/Almanca arayüzde Türkçe içerik (Patika, görevler, başarımlar, Neler yapabilirim) | ◐ Claude | 74466b44: istemci `Accept-Language` gönderiyor; anadilsiz hesaplar (üretimde 40'ın 31'i) açılışta cihaz dilini hesaba yazıyor; onboarding anadili her zaman devrediyor. Ek 501b037a: dil değişince (girişte hesabın dili benimsenince ya da Ayarlar'dan) bütün ekranlar yeni dilde kuruluyor; önce sekmelerdeki ekranlar eski dilde kalıyordu. Yerelde doğrulandı (Android, iPad tr→en→de); kullanıcıya build 9 ile ulaşır |
| T10 | Sign in with Apple anahtarı yenilendi | ✅ | 2026-09-27: eski anahtarın bir kısmı bir env karşılaştırma komutunda oturum çıktısına düştü (başka yere gitmedi). Samet eskisini iptal etti; yeni anahtar `MBQU337CN7` (`.secrets/apple/`, yerel ve sunucu `.env`), Apple token ucu iOS bundle ve Services ID için `invalid_grant` (imza kabul) |
| T11 | İngilizce/Almanca anadilli kullanıcıya Türkçe içerik (Samet cihaz testi, 2026-09-27) | ◐ Claude | Tarama: çeviri verisi %100; sızıntı dil kaynağından. Yürüyüş (ekran kapalı/açık onay, kelime kartı, web duyurusu), sunucu (anadili boş profil doldurma, contentLang, sınav soruları ve yazma görevleri, Patika başlıkları, günün turu dile bağlı, zayıf noktalar gloss, e-posta), istemciler (yapay zekâ istek metinleri anadilde, mobil sözlük yenileme/yeniden deneme). Commit'ler: yürüyüş (bu oturumun "Yürüyüş: anadil tarafı" commit'i), bc5b97eb, 4338ca87. Kalan: build 10 ile cihazda doğrulama |
| T12 | İçerik geri bildirimi: her ekranda "Bildir", panelde değerlendirme (Samet, 2026-09-28) | ◐ Claude | Sunucu tarafı hazır: `content_reports` genişledi (göç 0071, `schema.ts`), `POST /api/reports` yeni gövde + eski gövde, 24 saat tekrar kilidi, `/admin/moderation/content` (gruplu liste, süzgeç, CSV, grup kararı, "İçeriği kapat"), uyarılar `err-reportnew`/`err-reporthot`, `suspectItems` yapısal eşleşme, hukuki 1.8.6 (gizlilik tablosu, şartlar §5). Kalan: web + mobil istemcilerin (bayrak, ReportSheet) yayını, build 10 ile cihazda uçtan uca deneme. Ayrıntı `docs/plan/content-feedback.md` |
| T13 | Tanıtım sayfası vitrine göre yeniden yazıldı (Samet, 2026-09-28) | ◐ Claude | `src/app/page.tsx` + `src/content/landing.ts` (tr/en/de) + `components/landing/`; açık/koyu tema, ekranlar iPhone 6.9" simülatöründe üretimdeki `screenshots@lernomi.app` hesabıyla (parola `.secrets/screenshots/`), `public/landing/tr/`. 2026-09-28 ek: dört dil yolu bölümü (tr→de, tr→en, en→de, de→en) ve alt bilgide dil seçici. Kalan: İngilizce ve Almanca arayüzle ekran çekimi (şimdilik Türkçe ekranlar), ince ayar canlıda |
| T14 | Deneme sınavı yazma/konuşma: düzeltmenin doğru biçimi boş (2026-09-28 simülatör) | ◐ Claude | 745930f5: sunucu `right` + `fix` birlikte veriyor (kayıtlı satırlar ve build 9/10 da deploy ile düzelir), web ve mobil `right \|\| fix`. Kalan: build 11'de cihazda göz kontrolü |
| T15 | Deneme sınavı yazma/konuşma bölüm sonucu görev puanlarını kullanmıyor | ◐ Claude | 745930f5: `scoreSection` (Teil eşit ağırlık, boş görev 0, puansız görev ortalama dışı, hiç puan yoksa dürüst "puan yok"), özet görev puanları ve hatalarıyla, etiket "yapay zekâ puanlar". Puan ve özet sunucuda, deploy ile mevcut build'lere ulaşır; yeni etiket ve ekran metinleri build 11 ile. Deploy öncesi bitmiş yazma denemeleri veritabanında 0 kalır. Kalan: canlı model çağrılı uçtan uca deneme |
| T16 | Konuşma adımı özeti yanlış yönlendiriyor (mobil) | ◐ Claude | e8c7c237: "yarım kaldı" yalnız tur eksikse, düşük doğruluk ayrı not (eşik tek yerde `CONVERSATION_PASS_RATIO`); mobil düzeltme sayımı; günlük görev yenileniyor; üretim adımında farklı cümleye "istenen cümleden farklı". Adım belirli bir cümle istiyordu (Almanca konuşuyorum), benim cevabım anlamca farklıydı: kabul etmemesi doğru. Açık not: 3 puanlı adımda %70 = 3/3 (174 konuşma); web `judgeSpeech` sözcük sırasına bakmıyor. Kalan: build 11'de cihazda |
| T17 | Türkçe arayüzde İngilizce ikinci satır (iOS, 2026-09-28) | ✅ (bilinçli) | Sızıntı değil: ana satır anadilde, ikinci satır ayırt etmek için hep İngilizce (5cd407b06, 38d3717d2, `data/meanings/SPEC.md`; `glossFor`/`exampleFor` ve mobil `gloss.ts`, `test:gloss` + mobil `gameGloss` testi). Kural `docs/plan/native-language.md`'ye yazıldı |
| T18 | Sohbette yanlış düzeltme (en→de, 2026-09-28 simülatör) | ◐ Claude | "und ich arbeite gern mit Kunden" bozuk Almancaya düzeltildi. İstem sıkılaştırıldı (kursa göre kural) + sunucu `fix-guard` kesin yanlışı siliyor (`test:fix-guard` CI'da). Groq: 34 denemede ham 4, süzgeç sonrası 0. Kalan: Mistral ile ölçüm (yerelde 429) |
| T19 | İngilizce kursunda "5 artikel" günlük görevi (2026-09-28 simülatör) | ✅ | 92783725: görev seçimi kursa bağlı (`supportsGame`, web ve mobil aynı kural, `check:parity`); sunucu tarafı, mevcut build'lere de ulaşır. Başarımlar da kursa uygun (2026-09-29, Samet: "kursa uygun başarımlar olmalı"): katalog `supportsGame`e bakıyor, İngilizce kurs artikel/çoğul yerine `cloze300`/`scramble150` alıyor (katalog boyları eşit), `allGames` kursun oyun sayısını istiyor ve metni sayı yazmıyor, öteki kursta kazanılan rozet duvarda açık kalıyor; `artikel300`/`plural150`e bağlı avatar parçaları karşılıklarıyla da açılıyor. Kapı `test:achievements` (CI), `test:e2e` 17 |
| T20 | İngilizce/Almanca arayüzde konuşma Türkçe kalıyor (2026-10-05 simülatör, build 16) | ◐ Claude (kod), yeni build bekliyor | Mobil konuşmaları kendi içinde paketli taşıyor (`mobile/src/data/conversations`), anadil sözlüğü (`native/en`, `native/de`) sunucudan iniyor ve Türkçe metne anahtarlı. Türkçe metni değişen konuşmada (ör. f073c020a, kişi adları) eski build'in paketli metni yeni sözlükte bulunmuyor, `resolveConversation` hep-ya-hiç kuralıyla bütün konuşmayı Türkçeye düşürüyor (A1 "Hallo!": sahne, çeviri, başlık Türkçe). Güncel main'den build bunu gösterdi: İngilizce. Yayındaki build'ler (TestFlight/Play testi) etkileniyor olabilir. Seçenekler: yeni build, sözlüğe eski anahtarları da koymak ya da konuşma gövdelerini içerik deposundan almak Düzeltme (2026-10-05): A1 de içerik paketinden okunuyor (sözlükle aynı sürüm), tohum yalnız ağ yokken ya da 3 sn içinde inmezse; çeviri önbelleği nesneye bağlı (`mobile/src/data/conversations`, `lib/nativeContent`, testler `conversationsSeed`, `nativeContent`). Yayındaki eski build'ler yeni build'e kadar etkilenmeye devam eder |
| T21 | Ayarlar › Öğrenme: kurs seçimi sunucudan kopuyor (2026-10-06 simülatör) | ⏳ Claude (kod) | Arayüz dili Almanca yapılıp (kurs sunucuda İngilizceye geçer) Türkçeye dönülünce ekran Almanca seçili gösteriyor, sunucuda İngilizce kalıyor; Almancaya dokunmak istek göndermiyor (`SettingsScreen` `pickCourse`: `c === course` erken dönüşü, `course` durumu ilk yüklemede bir kez doldurulup sunucudaki değişikliği izlemiyor; `updateProfile` sonucu da denetlenmiyor). Uygulama yeniden açılınca düzeliyor. Düzeltme: kurs durumu `me.course`u izlesin, başarısız kayıtta geri alınsın; yeni build ister |
| T22 | Ekran kapalı yürüyüş: cihazda konuşma algılama (VAD), sabit 3 sn pencere yerine (Samet, 2026-10-08) | ◐ Claude (kod), yeni build bekliyor | Ölçüm 9746923f3 (`docs/plan/walk-stt.md` "Cihazda konuşma algılama"): sentetik 138 sahnede Azure kabulü aynı, gönderilen ses −%56, konuşmasız kayıt hiç gönderilmiyor. Native kopyalar `WalkVad.kt`/`WalkVad.swift` (referans `scripts/lib/walk-vad.ts`; sabitler `check:parity`, davranış `scripts/walk-vad-native-parity.ts`: 538 akışta üç kopya birebir); yeni `recordUtterance`, eski yapı ve iOS'ta motor yoksa sabit pencere. Cihazda bakılacak: ekran kapalıyken kelime söyleyince kayıt erken bitiyor ve doğru sayılıyor, sessiz kalınca yükleme olmadan "duyamadım", yürürken/cepte/rüzgârda yanlış tetik yok, Bluetooth kulaklık mikrofonu; sunucuda `ai_usage` stt azure `audio_seconds` 3 yerine ~1,5–2 |
| T23 | QA oynatıcı bulguları (build 22, Android, 2026-10-09): F-0003, F-0009, F-0017, F-0026, F-0040, F-0054 | ◐ Claude (kod), yeni build bekliyor | Web canlıda, mobil kısmı build 23+ ile gelir. 985e32890 anlatım balonunda hedef dilden sonra yeni cümleye nokta (`lib/segmentText`); 2cea66c38 konuşma özetinde düzeltmeler kalıplardan önce; 2111dd1d1 sohbet günlük sınır uyarısı bir kez, gönderme kapalı; 280c967a3 modül sınavı dinleme metni gizli + kelime turunda hüküm yok (`BlindAnswers`), metin sonuçta; 9824e7b7c Beceri/Patika alıştırmasında yarım çıkış onayı (`useUnsavedWork`, iOS hareketi koşullu); f359ead40 ünitede kilitli adıma dokununca neden satırı. F-0062: 7fe816728 ünite quizinde aynı işi gören kalıp ikinci doğru şık olmuyor (mobil kopya `game/immersionQuiz`; de-a1-u13-quiz1 8. soru çeldiricisi artık "Wo ist die Haltestelle?" değil). Cihazda bak: özet uzunken düzeltmeler kartı görünür, sınav Hören'de yalnız konuşmacı çipleri, Wortschatz'ta "Cevabı ver ve devam et", Yazma'da metin yazıp Kapat/geri → onay, kilitli adıma dokununca satır |

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
| X-3 | İnceleme hesabı Premium, satın alma ekranına ulaşılamıyor | ✅ | apple-review@ (Premium) + apple-review-free@ ASC'de; Play › Uygulama erişiminde yalnız google-review@ (tam erişim kutusu zorunlu; Premium'suz hesap Play'e girilmedi, 2026-09-29, `docs/play/console.md` §1); google-review-free@ üretimde, kullanılmıyor. Parolalar yalnız konsollarda |
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
| CNT-8 | Deneme sınavı yönergeleri resmî sınavlara yakın | ✅ | 1580bd4c, f5c348d9 (66 yer); kalan kalıplar İ4 ile kapandı (6feb7eff, 1.466 alan) |
