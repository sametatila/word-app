# Premium — mimari, mağaza kurulumu ve yönetim

Yetkinin neden sağlayıcıdan bağımsız kurulduğu, ücretsiz/Premium kararları (§2), mağazalarda
ve RevenueCat'te neyin kurulu olduğu (§3), panel (§4) ve RevenueCat'ten çıkış (§5).

---

## 1. Mimari — neden sağlayıcıya bağlı değiliz

Tek cümle: **yetkinin kaynağı bizim veritabanımız, mağaza değil.**

```
  Mağaza (Apple / Google)
        │  satın alma
        ▼
  RevenueCat ──webhook──▶  /api/premium/webhook/revenuecat
                                    │  adaptör → StoreEvent
                                    ▼
                        entitlements + premium_grants   ◀── promo kodu
                          (TEK YETKİ KAYNAĞI)           ◀── elle verilen süre
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
                  web            Android           iOS
             (hepsi /api/premium/status'a sorar)
```

Üç somut sonucu var:

1. **Sağlayıcı değiştirilebilir.** Uygulamanın hiçbir ekranı "premium miyim"
   sorusunu RevenueCat'e sormuyor. `RevenueCat` adı yalnız iki yerde geçiyor:
   `src/lib/premium/providers/revenuecat.ts` (sunucu) ve
   `mobile/src/lib/billing.ts` + `billingConfig.ts` (satın alma arayüzü).
2. **Mağazadan gelmeyen yetki mümkün.** Promo kodu ve elle verilen süre
   mağazada yok. Sağlayıcıya sorulsaydı bunları kazanan kullanıcı
   uygulamada ücretsiz görünürdü.
3. **Denetlenebilir.** Her hareket `premium_grants` defterinde: kim, ne zaman,
   hangi kaynaktan, ne kadar.

### Yetkinin iki bileşeni

| | Nereden | Nasıl yazılır |
|---|---|---|
| **Mağaza penceresi** (`store_until`) | sağlayıcı bildirir | her olayda **üzerine yazılır** |
| **Bonus** (`bonus_minutes` + `bonus_until`) | promo / elle | **bakiyeye eklenir**, birikir |

Ayrı tutulmalarının sebebi: sağlayıcı her yenilemede **mutlak bir bitiş tarihi**
bildiriyor. Tek sütunda toplansalardı her yenileme biriken hediye günlerini
sessizce silerdi. Ayrı tutulunca yenileme bonusa dokunmuyor.

Bonus, mağaza kapsamı **yokken** harcanmaya başlıyor; abonelik varken bekliyor,
yanmıyor. Kullanıcı hediye süresi çalışırken abone olursa kalan hediye bakiyeye
**geri dönüyor** (`applyStoreEvent`).

### Aynı olay iki kez gelirse

Ödeme sağlayıcıları teslimatı **en az bir kez** garanti eder, tam bir kez değil:
ağ koptuğunda ya da yanıt geç döndüğünde aynı olayı tekrar gönderirler. Yani
"iki kez gelmez" diye bir varsayım kurulamaz.

Eleme anahtarı **olay kimliği**, ve kısıt kodda değil veritabanında:
`premium_grants(ref) where source='store'` BENZERSİZ. `applyStoreEvent` deftere
yazmayı **kapı** olarak kullanıyor — satır dönmezse olay zaten işlenmiştir, çık —
ve yazma ile durum güncellemesi **tek işlemde**.

Bu ayrım önemli: "önce SELECT, satır yoksa uygula" bugünkü kodda çoğu zaman
doğru sonuç verir, ama bir yarıştır ve `applyStoreEvent`e artıran tek bir yazma
eklendiği gün sessizce delinir. Ödeme akışında hatanın para tarafına düştüğü
yer tam burasıdır, o yüzden garanti kısıtta duruyor.

### Dosya haritası

| Dosya | Ne yapar |
|---|---|
| `src/lib/premium/gates.ts` | Sınırların **tipi ve varsayılanı** — tek kaynak |
| `src/lib/premium/config.ts` | Yürürlükteki değerler (panelden gelen üstyazım) |
| `src/lib/premium/entitlement.ts` | Yetkinin hesabı ve yazılması |
| `src/lib/premium/access.ts` | "Bu kullanıcı bunu yapabilir mi" kararları |
| `src/lib/premium/quota.ts` | Kota sayaçları (gün / hafta / ömürlük) |
| `src/lib/premium/promo.ts` | Kod üretimi ve bozdurma |
| `src/lib/premium/referral.ts` | Davet zinciri (Premium ödülü yok) |
| `src/lib/premium/ports.ts` | **Sağlayıcı sözleşmesi** — bağımsızlığın durduğu yer |
| `src/lib/premium/providers/*` | Adaptörler (bugün yalnız RevenueCat) |
| `mobile/src/lib/premium.ts` | Mobilde durum — **sunucudan** |
| `mobile/src/lib/billing.ts` | Mobilde **yalnız satın alma** |

---

## 2. Ürün yapısı ve kota kararları — 2026-09-25 (GEÇERLİ)

Samet'le soru-cevapla verildi; 2026-09-08 kararlarının ("tek havuz", haftalık yenilenen hak,
deneme sınavında %60 koşulu) yerini aldı. Kod bu tabloyla birebir (`src/lib/premium/gates.ts`,
`unlock.ts`); ayrışırsa kesin kaynak burası.

**Sözlük (ürünün dili — kodda, arayüzde, paywall'da, mağazada aynı):**

| Yer | Parçalar | Not |
|---|---|---|
| **Öğren** | Kelime çalışma (günlük tur) · Pratik (aynı oyun türüyle kelime tekrarı) · Haftalık quiz (her hafta farklı; şu an 5, artacak) · Deneme sınavları · Yürüyüş modu | Deneme sınavları YALNIZ burada, Patika'dan bağımsız |
| **Patika** | Okuma · Dinleme · **Konuşma** · Yazma · Dil bilgisi · **Quiz** · **Sınav** | İçerik yalnız Patika'ya ait ve Patika'da yalnız bu yedi adım var. **Konuşma** adımı Türkçe anlatım + yapay zekâ sohbetidir; sonundaki isteğe bağlı puanlı 5 tur adımın **Kendini puanla** kısmıdır, ayrı bir "sınav" adı taşımaz. **Quiz** ünite içindeki soru turu, **Ünite quizi** ünitenin sonundaki quiz. **Sınav** modül sınavı ile seviye sınavıdır (seviye sınavı Patika'nın sonunda) |
| **Beceriler** | Okuma · Dinleme · Konuşma · Yazma · Dil bilgisi | Dili bir miktar bilen kullanıcı için; CEFR seviyesi serbestçe değişir |

Bu sözlük kodda da tek sözlüktür: dosya adları, fonksiyon ve değişken adları, yorumlar, i18n
anahtarları, içerik kimlikleri, API adresleri ve veritabanı tabloları aynı adları taşır; Patika
adımları için başka bir ad kalmadı. Kod karşılıkları §2.2'de.

**Kotalar:**

| | Ücretsiz | Premium |
|---|---|---|
| Kelime çalışma, pratik, okuma, dinleme, dil bilgisi, quiz | sınırsız | sınırsız |
| Haftalık quiz | haftada 1 | haftada 1 |
| **Yürüyüş modu** | **günde 3 tur**, yalnız ekran açıkken (tur sonundaki "devam" da bir tur) | ekran kapalı dahil; kötüye kullanım tavanı günde 20 tur |
| **Deneme sınavları** (Öğren) | her seviyede **1** deneme sınavı açık; onu **bitirip 7 günlük seri** yapınca **+1**, sonra her 7 günlük seride +1 | **3'lü paketler**: paketteki 3 deneme sınavını **tamamlayınca** sonraki 3 açılır |
| **Patika Konuşma** (anlatım + yapay zekâ sohbeti + puanlı kısım) | **seviye başına 2** açık; ikisini **tamamlayıp 7 günlük seri** yapınca **+2**, sonra her 7 günlük seride +2. Hak yoksa adım **kilitli, Premium ister** | yalnız kötüye kullanım tavanı |
| **Patika Yazma** (yapay zekâ değerlendirmesi) | aynı: seviye başına 2 + (tamamla + 7 gün seri) → +2 | yalnız kötüye kullanım tavanı |
| **Beceriler Konuşma / Yazma** (yapay zekâ değerlendirmesi) | **seviye başına** 2'şer + (tamamla + 7 gün seri) → +2'şer | yalnız kötüye kullanım tavanı |

**Kalkanlar:** deneme sınavındaki %60 başarı koşulu (iki katmanda); haftada 2 yenilenen
ortak hak; "Patika ve Beceriler ortak / tek havuz" anlatımı; kotasız Patika sohbeti; Cepte
yürüyüşteki sayılmayan "günde 20 tur".

**Yönlendirme ilkesi (Samet, zorunlu):** arayüz kullanıcıyı doğru bilgilendirir ve YÖNLENDİRİR;
hiçbir kilitte kullanıcı "ne yapacağım" diye kalmaz, kendi kendine ilerler ve takip eder. Her
kotalı yüzeyde (deneme sınavı, Patika Konuşma/Yazma, Beceriler Konuşma/Yazma, yürüyüş modu,
paywall) bir sonraki hakkın koşulları ve durumu görünür — ör. "Deneme sınavını tamamladın ✓ ·
7 günlük seri 3/7 · 4 gün sonra ikinci deneme sınavı ücretsiz açılır" — yanında "Premium'la hemen
aç". Hak açılınca kısa bir kutlama efekti (reduceMotion'a saygılı). Durum sunucuda tek bir saf
fonksiyonla hesaplanır, web ve mobil aynı bilgiyi gösterir.

**Paywall (web, iOS, Android):** her satır bu tabloyla birebir; hakların **nasıl kazanıldığı**
(tamamla + 7 günlük seri) açıkça yazılır. Premium'daki sınırlar "sınırsız" denmeden "kötüye
kullanımı önleyen günlük üst sınır" diye anılır (App Store 3.1.2), sayıları Premium ekranında.

### 2.1 Uygulama (2026-09-25) — kod bu kararları nasıl tutuyor

**Formül (tek yer `src/lib/premium/unlock.ts`, saf, `test:premium`):**
izin verilen = taban + bonus × k, k = min(⌊en uzun seri ÷ 7⌋, tam bitirilmiş dilim
sayısı[, `maxTiers`]). İlk dilim tabandır; ikinci dilim ancak tabandaki hakların HEPSİ
bitirilince VE en uzun seri 7'ye varınca açılır, üçüncüsü ikinci dilim de bitince ve seri
14'e varınca. Seri tek başına açmaz, bitirmek tek başına açmaz. Ölçü `longest_streak`:
kazanılan hak geri alınmaz. Kademe tavanı `maxTiers` (panel), varsayılan **0 = sınırsız**
(karar yok).

**Sayaçlar — hepsi `usage_counters`, hepsi ayrı:**

| Yüzey | Kullanılan hak (ömürlük) | Sahiplenme işareti | "Bitirmek" |
|---|---|---|---|
| Patika Konuşma | `conversation:<SEVİYE>` | `conversation_owned:<SEVİYE>:<konuşma>` | Konuşma adımının bitmesi (`user_conversations` satırı, `/api/conversation`) |
| Patika Yazma | `path_writing:<SEVİYE>` | `path_writing_owned:<egzersiz>` | ilk değerlendirme (sahiplenmek = değerlendirilmiş gönderim) |
| Beceriler yazma | `skill_writing:<SEVİYE>` | `skill_owned:<egzersiz>` | ilk değerlendirme |
| Beceriler konuşma (B1+ monolog) | `skill_speaking:<SEVİYE>` | `skill_owned:<egzersiz>` | ilk değerlendirme |
| Deneme sınavı | — (açık sınav = sıradaki ilk N) | — | deneme sınavının bitmesi (`mock_exam_attempts.finished_at`) |
| Yürüyüş modu | `walk_rounds` (gün, UTC) | — | — |

Hak maddenin İLK yapay zekâ kullanımında düşer ve madde sahiplenilir; sahiplenilmiş madde
hak bitse de açık kalır, yeniden açmak hak yemez (`claimTiered`: önce işaret, sonra seviye
sayacı izin verilen sayıyla atomik; sayaç doluysa işaret geri alınır). Seviye maddenin
KENDİ seviyesi, istemcinin gönderdiği değil. Sahiplenilmemiş (senaryolu) bir konuşmayı bitirmek
dilimi doldurmaz.

**Nerede düşüyor:**
- Patika Konuşma: `/api/chat` ilk turu (konuşma kimliğiyle). Puanlı kısım ("Kendini puanla",
  `/api/assess` `kind: chat`) AYNI hakkı kullanır, ayrı hak düşmez.
- Patika Yazma ve Beceriler: `/api/assess`, madde `exerciseId`den çözülür.
- **Modül/seviye sınavı yazma bölümü hak DÜŞÜRMEZ** (web kimlik gönderse de mobil göndermese
  de): sınav Patika'nın ölçme adımı, tablo onu kotaya bağlamıyor; yalnız kötüye kullanım
  tavanları (günde 120 çağrı, 60 değerlendirme).
- Yürüyüş: birim **TUR** (2026-09-25 düzeltmesi, Samet; ilk uygulamadaki "oturum" ve 30
  dakikalık pencere kalktı). Her `/api/session?walk=1` isteği — tur sonundaki "devam" dahil —
  bir tur ve günlük haktan bir düşer (`openWalkRound`, tek SQL ifadesi). Yalnız son sayılan
  turdan 2 saniye içinde gelen istek aynı turun çift gönderimi sayılır (eşzamanlı çift istek
  iki tur yakmasın); istemcinin tur kimliğine güvenilmez. Kuyruk kurulamazsa (500) tur geri
  verilir. 4. tur 403 → kilit + paywall. Ekran kapalı yol (`/api/stt`) yalnız premium; kelime
  tavanı tur tavanı × 40. Eski `walk_sessions` sayacı gün sınırlıydı, taşınmadı.
  Not: iki istemci de yürüyüş ekranı açılınca kuyruğu yüklüyor, yani ekranı açmak bir tur
  sayılıyor.

**SENARYOLU YOL İSTİSNASI.** Misafir ve yapay zekâ iznini REDDEDEN (`declined`) kullanıcı
Konuşma adımını bugünkü gibi senaryolu (yapay zekâsız) konuşmayla yapar; adım kilitlenmez ve
hak düşmez. Sebep: izin zorlanamaz (App Store 5.1.2(i)) ve senaryolu yolun maliyeti yok.
Hakkı bitmiş ama izin vermiş kullanıcı senaryoluya DÜŞMEZ, kilidi görür (paywall + "nasıl
açılır"). Kapı sunucuda: misafir `/api/chat`e hiç giremiyor (403 account_required), izni
reddeden rıza kapısında duruyor (403 consent); ikisi de kotaya varmıyor.

**Premium:** kademe yok. Yazma/konuşma değerlendirmesi alıştırma başına bir kez günlük
`aiPracticePerDay` (30) tavanına sayılır; Konuşma adımının tavanı sohbet mesajı (günde 300,
`lib/quotas`); yürüyüş `fairUse.walkRoundsPerDay` (20) tur, AYNI sayaçla gerçekten
sayılıyor (eski "günde 20 tur" hiçbir yerde sayılmıyordu). Paywall bunları "kötüye kullanımı
önleyen günlük üst sınır" diye yazar (`plan.pro_fair_use`).

**Kilit açma görünümü:** `/api/premium/status` → `unlock` (bütün seviyeler tek çağrıda:
kalan hak, bitir x/y, seri x/7, tahmini gün, sahiplenilmiş maddeler). Web ve mobil aynı
sayıdan aynı cümleyi kurar.

**Geriye uyum:** üretimde `app_settings` › `premium.config` satırı yok (2026-09-25 ölçüldü),
kod varsayılanı geçerli. Eski kayıttaki `weeklyAiPractice`, `streakMaxTiers`,
`free.pocketWalksPerDay`, `fairUse.pocketWalksPerDay`, `mock.unlockPct`,
`mock.unlockOnComplete` yok sayılır. Durum ucu eski sürümler için `fairUse.pocketWalksPerDay`
takma adını ve `gates.pocket_walk`u taşımaya devam ediyor.

### 2.2 Kod sözlüğü

Yukarıdaki sözlük kodda şöyle yazılıyor. Seçim tek kök: **Patika'nın Konuşma adımı
`conversation`, adımın yapay zekâ sohbeti `chat`**. `speaking` bilerek seçilmedi: o ad zaten
Beceriler'in Konuşma alıştırmasına ait (egzersiz türü `speaking`, değerlendirme türü
`speaking`, sayaç `skill_speaking:`); aynı kök iki ayrı yüzeyi adlandırsaydı sayaçlar ve
değerlendirme türleri birbirine karışırdı. Kota sayacının adı (`conversation:<SEVİYE>`) da
bu seçimle aynı.

| Kavram (arayüz) | Kodda | Not |
|---|---|---|
| Konuşma adımı (Patika) | `conversation` — tip `Conversation`, `lib/conversations/`, `/conversations/<id>` | Anlatım + sohbet + Kendini puanla |
| Anlatım fazı | `lecture` | Anadil sözlüğünün yayınlanan maddesi de bu ad (`native/en` › `lecture`) |
| Sohbet fazı | `chat` — `lib/conversations/chat.ts`, `/api/chat`, içerik alanı `chat` | |
| Puanlı kısım ("Kendini puanla") | `scored` — `/conversations/<id>/scored`, sohbet kipi `scored`, madde `<id>:scored` | Arayüzde "sınav" demiyor |
| Quiz | `quiz` | |
| Ünite quizi | `unitQuiz` — öğe `<ünite>-unitQuiz1` | |
| Sınav (modül + seviye) | `exam` — `/exam/<sv>/<modül>`, `/exam/<sv>` | Seviye sınavı Patika'nın sonunda |
| Modül hız turu | `boss` — `/boss/<sv>/<modül>` | |

#### Tarihçe: 2026-09-25 yeniden adlandırma

Eski göç dosyalarını (`drizzle/00xx`) ve 2026-09-25'ten önceki commit'leri okuyan geliştirici
için yalnız kalıcı veri ve adres eşlemesi:

| Alan | Eski | Yeni |
|---|---|---|
| Tablo | `user_lessons` · `roleplay_logs` | `user_conversations` · `chat_logs` |
| Sütun | `lesson_id` · `roleplay_done` | `conversation_id` · `chat_done` |
| Tür değeri (`ai_usage`, `assessments`, `content_reports` › `kind`) | `roleplay` | `chat` |
| API | `/api/lesson` · `/api/roleplay` | `/api/conversation` · `/api/chat` |
| Sayaç (`usage_counters.key`) | `writing_lesson:<SV>` · `owned_lesson:<id>` · `writing_skill:<SV>` · `speaking_skill:<SV>` · `skill_ai:<id>` · `roleplay_turns` (gün) | `path_writing:<SV>` · `path_writing_owned:<id>` · `skill_writing:<SV>` · `skill_speaking:<SV>` · `skill_owned:<id>` · `chat_turns` (gün) |

Göç `drizzle/0069_rename_conversation.sql`: yalnız RENAME ve UPDATE, idempotent, tek
transaction. `deploy.sh`'taki `drizzle-kit push --force` şemada olmayan tabloyu VERİSİYLE
sildiği için sıra yedek → 0069 elle → deploy → 0069 bir kez daha oldu. Eski adresler ve eski
adla gelen istekler reddedilir; geçici uyumluluk katmanı yok.

### 2.3 Kalıcı notlar

- **Davetin karşılığı Premium süresi değil** (2026-09-17, gerekçe `src/lib/premium/referral.ts`):
  bağ kurulunca davet edilenden davetçiye arkadaşlık isteği gidiyor, kabul edilince ortak seri
  başlıyor. `grantBonus` yalnız promo kodu, elle telafi ve destek jesti için.
- **Yürüyüşte bölme ekran kapalı yol üzerinden:** maliyetin tamamı sunucu STT'de; ekran açıkken
  cihazın kendi tanıyıcısı çalışıyor.
- **Paywall satırına yeni anahtar eklemek geriye uyumlu değil.** Satırlar sunucudan anahtar +
  parametre olarak iniyor (`describeLimits`), çeviri istemcinin gömülü sözlüğünden geliyor ve
  bilinmeyen anahtar ham basılıyor. Mümkünse var olan anahtarı yeniden kullan, metnini değiştir;
  parametre çıkarma (eksik parametre ekrana `{n}` basar). Yeni satır ancak eklendikten sonra
  derlenen sürümlerde görünür.
- **"Sınırsız" denmiyor:** Premium'un kötüye kullanım tavanı var ve paywall'da yazılı (App Store
  3.1.2, Play abonelik beyanı).

---

## 3. Kurulu durum — mağazalar ve RevenueCat

Sıra: önce mağazada ürün, sonra RevenueCat (ürünleri mağazadan okuyor). Ürün, fiyat, deneme,
entitlement, offering ve webhook değişikliği canlı etkili: Samet açıkça istemeden yapılmaz.

| Ne | Değer |
|---|---|
| Ürünler (iki mağazada aynı kimlik) | `lernomi_premium_monthly` (1 ay), `lernomi_premium_yearly` (1 yıl); `gates.ts` › `plans.productMonthly/Yearly` |
| App Store | Abonelik grubu `Lernomi Premium`; seviye sırası yıllık 1, aylık 2. Durum ve eksikler `docs/store/audit.md` (M4) |
| Play base plan'lar | `monthly-autorenew` (P1M), `yearly-autorenew` (P1Y), otomatik yenilenen, `legacyCompatible: true` |
| Deneme | 1 ay ücretsiz, yalnız gruptaki bir aboneliği daha önce almamışa. ASC intro offer (New Subscribers); Play teklifi `free-trial-1m`. Panel `plans.trialDays` = 30 |
| Grup kodu teklifi | Play: her base plan'da `promo-2m` (P2M ücretsiz, etiketler `promo2m` + `rc-ignore-offer`). iOS: teklif kodları `promo2m-monthly` / `promo2m-yearly`; özel kod değerleri uygulama onaylanınca üretilir. Kod kaydı bizde (`promo_codes.kind='store_trial'`, `src/lib/premium/store-trial.ts`) |
| Fiyat (aylık / yıllık) | TR 199,99 / 1.199,99 TRY · euro bölgesi 4,99 / 29,99 EUR · GB 4,99 / 29,99 GBP · CH 4 / 25 CHF · diğer 4,99 / 29,99 USD tabanından dönüşüm. Vitrin kopyası `gates.ts` › `plans.prices` |
| Bölgeler | Play 173; ASC 175 bölge, satış 173'ünde (Çin, Rusya kapalı) |
| RevenueCat projesi | `proj05e87e13`; uygulamalar Play `app2101cd9c6b`, App Store `app37837eed80` (Test Store `app7fb7bfd160` şablon, dokunulmaz) |
| Entitlement | `lernomi_premium` = `billingConfig.ts` › `entitlementId`; dört ürün bağlı (Play: `…:monthly-autorenew`, `…:yearly-autorenew`) |
| Geçerli offering | **`lernomi_default`** (`$rc_monthly`, `$rc_annual`, her birinde iOS + Play ürünü). `default` adlı offering Test Store şablonu, current değil |
| Webhook | `https://www.lernomi.app/api/premium/webhook/revenuecat`, ortam **hepsi**, olay filtresi yok, Authorization `REVENUECAT_WEBHOOK_AUTH` |
| Sandbox | Sunucu sandbox olaylarını kabul edip `store_environment='sandbox'` işaretliyor, gelirden düşüyor; `REVENUECAT_ALLOW_SANDBOX=0` kapatır |
| SDK anahtarları | Public `goog_…` / `appl_…` `mobile/src/lib/billingConfig.ts`'te (sır değil). v2 gizli anahtar yalnız sunucuda `REVENUECAT_API_KEY` (hesap silmede RC kaydı) |

### 3.1 App Store tuzakları

- **Ürün kimliği tek kullanımlık.** Silinen aboneliğin kimliği bir daha kullanılamıyor
  ("already being used"); kimlik yanarsa yenisi seçilir ve `gates.ts` güncellenir. Seviye sırası
  silmeden değişir (Subscriptions listesinde *Edit*). `premium_monthly`/`premium_yearly` bu
  yüzden yandı.
- Aylık ve yıllık aynı grupta olmalı; üst seviye yükseltme sayılır ve anında gerçekleşir.
- RevenueCat'e App-Specific Shared Secret ve In-App Purchase Key (.p8) verildi; App Store Connect
  API anahtarı da verildiği için ürünler mağazadan içe aktarılıyor.

### 3.2 Play tuzakları

- Abonelik menüsü ancak imzalı bir AAB bir kanala (iç test yeter) yüklendikten sonra açılıyor.
- Etkin olmayan base plan RevenueCat'e görünmez.
- Fiyat dönüşümünde bölge sürümü **`2025/03`** (2022/02 Bulgaristan'ı BGN sayıyor, dönüşüm EUR
  veriyor → 400).
- `promo-2m` teklifinden `rc-ignore-offer` etiketi kalkarsa RevenueCat onu normal satın almada
  varsayılan deneme seçer (denetim S1).
- **RevenueCat servis hesabı** (`docs/premium/play-service-account.sh`): Google Cloud'da Android
  Publisher, Play Developer Reporting ve Cloud Pub/Sub API'leri; hesaba Pub/Sub Editor ve
  Monitoring Viewer rolleri; Play Console'da dört yetki (uygulama bilgisi, finansal veri,
  sipariş/abonelik yönetimi, mağaza varlığı). JSON anahtarı RevenueCat'e yüklenir, depoya ve
  `.env`'e girmez. Yetkinin işlemesi 36 saati bulabilir.
- RevenueCat Play uygulamasında paket adı `com.lernomi.learn` (`applicationId`, `namespace`
  değil); Custom URL Scheme, finansal rapor kovası ve Apps Experience alanları bilerek boş.

### 3.3 Webhook ve sunucu

```bash
# üç env dosyasında da aynı anahtar kümesi (AGENTS.md senkron kuralı)
REVENUECAT_WEBHOOK_AUTH="…"      # RevenueCat › Integrations › Webhooks › Authorization Header
REVENUECAT_ALLOW_SANDBOX=""      # boş = sandbox işaretli kabul; "0" = yok say
```

RevenueCat 2xx dışını beş kez yeniden deniyor; uç yalnız gerçek hatada (401, 503) 2xx dışı dönüyor,
tanımadığı olayı 200 ile kapatıyor. Aynı olayın ikinci gelişi `premium_grants(ref)` benzersizliğiyle
eleniyor (§1).

Doğrulama: `curl -sI https://www.lernomi.app/api/premium/status` → 200; RevenueCat'te *Send test
event* → 200 (`skipped: ignored_type`); sandbox satın alma → `premium_grants`'te `source='store'`
satırı (henüz yapılmadı, denetim S2).

---

## 4. Yönetim paneli — `/admin/premium`

Buradaki değerler canlıda geçerli (en geç 30 saniyede üç platformda); kod ya da mağaza sürümü
gerekmez.

- **Ücretsiz katman:** seviye başına tabanlar (Patika Konuşma, Patika Yazma, Beceriler
  konuşma/yazma, deneme sınavı), dilim başına ek hak, seri adımı, kademe tavanı (0 = sınırsız),
  günde yürüyüş turu. `0` = özellik ücretsizde yok.
- **Kötüye kullanım tavanı:** Premium'un günlük yürüyüş turu ve değerlendirme tavanı; paywall
  metni kendiliğinden değişir. Sohbet mesajı tavanı kodda (300).
- **Deneme sınavı paketleri:** paket boyu.
- **Planlar ve fiyat bilgisi:** ürün kimlikleri, deneme süresi, vitrin fiyatları. Buradaki fiyat
  mağazadaki fiyatı değiştirmez; değişirse iki konsolda elle eşitlenir.
- **Promo kodları** ve **davet sıralaması** (davet Premium vermiyor; ayarlanacak bir şey yok).

Haftada 2 yenilenen ortak hak (`ai_practice_weekly`) kalktı (`src/lib/premium/access.ts`).

### Promo kodu ile 2–3 ay Premium verme

1. `/admin/premium` → *Promo kodları*.
2. `Kaç gün premium` = 60 ya da 90 · `Kaç kod` · `Kod başına kullanım` = 1 (kişisel) ya da büyük
   sayı (kampanya) · `Kampanya adı`.
3. **Kod üret**; her satırda dağıtım bağlantısı `https://www.lernomi.app/premium?code=KOD`.
4. Süre bakiyeye eklenir: abonelik varken bekler, bitince başlar. Kod kutusu web'de ve Android'de
   var, iOS'ta yok (App Store 3.1.1); yetki üç platformda geçerli.

Kodlar silinmez, kapatılır. Grup kodları (`store_trial`) gün vermez, mağazanın 2 aylık denemesini
açar (§3).

### Davet

Her kullanıcının sabit kodu var (`profiles.referral_code`); kodla kayıt olunca bağ kuruluyor
(`referrals`), ödül yok (§2.3). Bir kişi yalnız bir kez davet edilmiş sayılır.

---

## 5. RevenueCat'ten ayrılmak

1. **Yeni adaptör:** `src/lib/premium/providers/<ad>.ts` — `StoreAdapter` (`configured()`,
   `parse()`); `ports.ts` beklenen alanları anlatıyor.
2. **Kayıt:** `providers/index.ts` › `ADAPTERS`; uç `/api/premium/webhook/<ad>` kendiliğinden açılır.
3. **Mobil:** `mobile/src/lib/billing.ts`'teki beş fonksiyon (`configureBilling`, `getPackages`,
   `purchase`, `restore`, `billingLogout`) yeni SDK ile; imzalar korunursa ekran değişmez.
4. **Geçiş:** iki sağlayıcı aynı deftere yazdığı için bir süre birlikte açık kalabilir.
5. **Değişmeyenler:** `entitlements`, `premium_grants`, promo, kotalar, panel, `/api/premium/*`.

Web'e kendi ödeme yolunu (Stripe) eklemek de bir adaptör; web komisyonsuz tek kanal. Bugün web'de
satın alma yok ve sayfa "yükseltme uygulamadan yapılıyor" diyor.

---

## 6. Yerelde test

Yetki katmanının testleri gerçek Postgres istiyor (benzersiz kısıt çakışması, kayıp güncelleme,
`now()`un cümle içi değeri). CI `postgres:17` servis kabıyla koşuyor; yerelde:

```bash
docker run -d --name lernomi-pgtest -p 55432:5432 \
  -e POSTGRES_PASSWORD=test -e POSTGRES_DB=lernomi postgres:17-alpine

export DATABASE_URL=postgres://postgres:test@127.0.0.1:55432/lernomi
export TEST_DATABASE_URL=$DATABASE_URL
npx tsx scripts/migrate-all.ts     # bütün migration'lar (bugün 70), sıra _journal.json'dan
npx tsx scripts/schema-check.ts    # şema ile veritabanı uyumlu mu
npm run test:entitlement
npm run test:quota                 # kota kuralları (§2)
npm run test:premium               # saf hesaplar, veritabanı istemez
```

`migrate-all.ts` ve testler adres localhost değilse baştan reddediyor: üretime yanlışlıkla
bağlanmak bu kapıların arkasında.

---

## 7. Sınanacaklar (mağaza hesapları gerektirir)

Uçtan uca satın alma henüz hiç denenmedi (denetim S2).

- [ ] Sandbox satın alma → `premium_grants`'e `store` satırı, `store_environment='sandbox'`
- [ ] Deneme başlangıcı → yetki açılıyor, `store_paid_at` boş
- [ ] Deneme → ücretli geçiş → `store_paid_at` doluyor
- [ ] İptal → süre sonuna kadar erişim (`canceled`)
- [ ] İade → erişim derhal kapanıyor (`refunded`)
- [ ] Promo kodu → üç platformda aynı anda açılıyor
- [ ] Hediye süresi çalışırken abone olmak → kalan hediye bakiyeye dönüyor
- [ ] Ücretsiz hesapta ekran kapalı yürüyüş → 403 `premium_required`
- [ ] Taban hak bitince kilit + paywall; bitir + 7 günlük seri → yeni dilim
- [ ] Kilitli deneme sınavının kimliğini doğrudan uca göndermek → 403
- [ ] Abonelik bitince Premium ekranlar kilitleniyor, ilerleme silinmiyor
