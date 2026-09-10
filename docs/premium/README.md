# Premium — mimari, mağaza kurulumu ve yönetim

Bu belge üç şeyi anlatıyor: yapının **neden** böyle kurulduğu, RevenueCat ve
mağazalarda **adım adım** ne yapman gerektiği, ve bir gün RevenueCat'ten
**nasıl çıkacağın**.

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
                          (TEK YETKİ KAYNAĞI)           ◀── davet ödülü
                                    │                   ◀── elle verilen süre
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
2. **Mağazadan gelmeyen yetki mümkün.** Promo kodu, davet ödülü ve elle verilen
   süre mağazada yok. Sağlayıcıya sorulsaydı bunları kazanan kullanıcı
   uygulamada ücretsiz görünürdü.
3. **Denetlenebilir.** Her hareket `premium_grants` defterinde: kim, ne zaman,
   hangi kaynaktan, ne kadar.

### Yetkinin iki bileşeni

| | Nereden | Nasıl yazılır |
|---|---|---|
| **Mağaza penceresi** (`store_until`) | sağlayıcı bildirir | her olayda **üzerine yazılır** |
| **Bonus** (`bonus_minutes` + `bonus_until`) | promo / davet / elle | **bakiyeye eklenir**, birikir |

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
| `src/lib/premium/referral.ts` | Davet zinciri ve ödül |
| `src/lib/premium/ports.ts` | **Sağlayıcı sözleşmesi** — bağımsızlığın durduğu yer |
| `src/lib/premium/providers/*` | Adaptörler (bugün yalnız RevenueCat) |
| `mobile/src/lib/premium.ts` | Mobilde durum — **sunucudan** |
| `mobile/src/lib/billing.ts` | Mobilde **yalnız satın alma** |

---

## 2. Ürün kararları (2026-09-08'de verildi)

| | Ücretsiz | Premium |
|---|---|---|
| Kelime turu, okuma, dinleme | sınırsız | sınırsız |
| Yürüyüş modu **ekran açık** | sınırsız | sınırsız |
| Yürüyüş modu **cepte / ekran kapalı** | yok | var (günlük adil kullanım tavanı) |
| Deneme sınavı | seviye başına 1 | tamamı, 3'lü paketler hâlinde |
| Haftalık sınav | haftada 1 | havuzun tamamı + geçmiş |
| Konuşma/yazma dersi | seviye başına 2 | adil kullanım tavanına kadar |
| Konuşma/yazma becerisi | 2 + 2 | adil kullanım tavanına kadar |
| Ömürlük hak bitince | haftada 2 yenilenen hak | — |

**Yürüyüş bölmesi neden "ekran kapalı" üzerinden:** maliyetin tamamı orada.
Ekran açıkken cihazın kendi tanıyıcısı çalışıyor ve bize hiçbir şeye mal olmuyor;
ekran kapanınca sunucu STT'ye (Azure) düşülüyor. Bölme özelliğin kendisinde
değil, faturayı üreten yolda — ücretsiz kullanıcı yürüyüş modunu her gün
kullanabiliyor, premium'un ne olduğunu her gün görüyor.

**Deneme sınavı paketleri:** ilk paket her zaman açık. Sonraki paket iki yoldan
açılıyor — pakette **%60** başarı (başarı hızlandırır) **ya da** paketteki tüm
kâğıtların bitirilmesi (çaba da açar). İkincisi bir emniyet supabı: onsuz %60'ı
tutturamayan bir **ödeme yapmış** kullanıcı hiçbir yeni kâğıt göremez ve bu,
iadenin ve tek yıldızın en sık sebebidir. Panelden kapatılabilir; kapatılırsa
paywall metnine "puan yetmezse paket açılmaz" cümlesi eklenmeli.

**Referans ödülü ilk ÖDEMEDE düşüyor**, denemede değil: 1 aylık deneme iptal
edilebildiği için ödül denemeye bağlansaydı sahte hesapla hafta üretmek serbest
kalırdı. Koşulu webhook'un doğru çağırmasına bırakmıyoruz — `rewardForFirstPayment`
`store_paid_at`i kendisi okuyor, yani elle telafi ya da geri doldurma betiği gibi
ikinci bir çağıran da ödülü denemeden üretemiyor.

**"Sınırsız" denmiyor.** Premium'un da adil kullanım tavanı var ve paywall'da
yazılı. Tavanı olan bir şeyi sınırsız diye pazarlamak App Store 3.1.2 ve Play'in
abonelik beyanı kurallarına aykırı.

---

## 3. RevenueCat kurulumu — adım adım

> Sıra önemli: **önce mağazalarda ürünler**, sonra RevenueCat. RevenueCat
> ürünleri mağazadan okuyor; ürün yoksa bağlayacak bir şey de yok.

### 3.1 App Store Connect (iOS)

> **ÜRÜN KİMLİĞİ TEK KULLANIMLIK.** Apple bir kimliği silsen bile serbest
> bırakmıyor: aynı adla yeniden oluşturmaya çalışınca "already being used by
> another subscription" diyor. Yani yanlış kurulmuş bir aboneliği silip
> düzeltmek YOK — kimlik yanarsa yenisini seçmek ve kodu ona göre güncellemek
> gerekiyor (`src/lib/premium/gates.ts` → `plans.productMonthly/Yearly`).
>
> Bu bir kez yaşandı: `premium_monthly` / `premium_yearly` seviye sırasını
> düzeltmek için silindi ve iki kimlik birden yandı. **Seviye sırası silmeden
> değişiyor** — Subscriptions listesindeki *Edit* düğmesi yeterli.

1. **My Apps → Lernomi → Subscriptions** → **Create** bir *Subscription Group*:
   ad `Lernomi Premium`. (Aynı gruptaki ürünler arasında kullanıcı yükseltme /
   düşürme yapabiliyor; aylık ve yıllık **aynı** grupta olmalı.)
2. Gruba iki abonelik ekle. **Seviye sırası baştan doğru kurulmalı** (silmeden
   düzeltilebilir ama kimlik yakmamak için baştan doğru kur): üst seviye
   YÜKSELTME sayılıyor ve anında gerçekleşiyor, alt/aynı seviye dönem sonunu
   bekliyor. İçerik ikisinde aynı olduğu için ayrım süre — yıllık üstte:
   - **Level 1** · Product ID `lernomi_premium_yearly`, süre **1 Year**
   - **Level 2** · Product ID `lernomi_premium_monthly`, süre **1 Month**
   Ürün kimlikleri panelde yazılı olanla aynı olmalı (`/admin/premium` →
   *Planlar*), yoksa RevenueCat offering'i boş döner.
3. **Fiyat**: her ürün için *Subscription Prices* → önce **taban ülke** (US)
   fiyatı, sonra Apple'ın önerdiği ülke tablosunu aç ve şunları **elle** düzelt:

   | Bölge | Aylık | Yıllık |
   |---|---|---|
   | Türkiye | 199,99 ₺ | 1.199,99 ₺ |
   | Euro bölgesi | 4,99 € | 29,99 € |
   | Taban (US) ve diğer her yer | 4,99 $ | 29,99 $ |

   Apple listede olmayan ülkeleri tabandan dönüştürüyor; taban fiyat bu yüzden
   "global" satır.
4. **Ücretsiz deneme**: her ürün için *Subscription Prices → Introductory
   Offers* → **Free Trial**, süre **1 Month**, hedef *New Subscribers*.
   Panelde de aynı sayı yazılı olmalı (`Ücretsiz deneme (gün)` = 30).
5. **Localizations**: tr, en, de için görünen ad ve açıklama. Açıklama ne
   verdiğini SÖYLEMELİ (paketli deneme sınavları, cepte yürüyüş, adil kullanım);
   uygulamadaki paywall ile ayrışmamalı.
6. **App-Specific Shared Secret**: App Information → *App-Specific Shared
   Secret* → üret ve kopyala (RevenueCat isteyecek).
7. **In-App Purchase Key**: Users and Access → Integrations → In-App Purchase →
   anahtar üret, `.p8` dosyasını indir (RevenueCat'e yükleyeceksin; Apple'ın
   sunucu bildirimleri V2 için gerekiyor).

### 3.2 Play Console (Android)

> **ÖN KOŞUL — bu bölüm bir yapı yüklenmeden AÇILMAZ.** Play, abonelik
> ürünlerini ancak imzalı bir AAB en az bir sürüm kanalına (en hızlısı
> *Internal testing*) yüklendikten sonra gösteriyor. Menüde *Subscriptions*
> soluk ya da boş görünüyorsa sebebi budur, hesap ya da yetki değil. iOS'ta
> böyle bir kısıt yok: App Store Connect'te uygulama kaydı yeterli.

1. **Monetise → Products → Subscriptions → Create subscription**
   - Product ID `lernomi_premium_monthly` → *base plan* `monthly-autorenew`,
     billing period **P1M**, **auto-renewing**
   - Product ID `lernomi_premium_yearly` → *base plan* `yearly-autorenew`,
     billing period **P1Y**, **auto-renewing**
2. Her base plan için **Offer** ekle: *Free trial*, süre **P1M**, uygunluk
   *New customers only*.
3. **Fiyat**: base plan → *Set prices* → Türkiye ve Euro ülkeleri yukarıdaki
   tabloya göre; kalan ülkeler için USD tabanından dönüştür.
4. **Aktifleştir** (Activate). Etkin olmayan bir base plan RevenueCat'e
   görünmez.
5. **Service account** — RevenueCat'in satın almaları Google'a doğrulatmasını
   sağlayan şey. Eksikse hiçbir Android aboneliği doğrulanmaz.

   a. **Google Cloud** (Play hesabına bağlı proje) → *APIs & Services* → şu **üç**
      API'yi etkinleştir: **Android Publisher API**, **Google Play Developer
      Reporting API**, **Cloud Pub/Sub API** (sonuncusu platform sunucu
      bildirimleri için).
   b. *IAM & Admin → Service Accounts* → yeni servis hesabı, **iki** rol:
      **Pub/Sub Editor** (bildirimler) ve **Monitoring Viewer** (bildirim
      kuyruğunun izlenmesi).
   c. Servis hesabı → *Keys → Add key → **JSON*** → inen dosya RevenueCat'e
      yüklenir. **Bu dosya SIR**: depoya da `.env`'e de girmez, yüklendikten
      sonra yerel kopyası silinir.
   d. **Play Console → Users and permissions** → servis hesabının e-postasını
      davet et ve **dört** yetkiyi ver:
      *View app information and download bulk reports (read-only)* ·
      *View financial data, orders, and cancellation survey responses* ·
      *Manage orders and subscriptions* ·
      *Manage store presence* (ürün oluşturma/güncelleme için).
   e. **36 saate kadar sürebilir.** Hemen çalışmazsa bozuk değil. Hızlandırma:
      *Monetize → Products*'ta bir ürün açıklamasını değiştir — bu genelde
      kimlik bilgilerini hemen ya da 24 saat içinde aktive ediyor.

### 3.3 RevenueCat panosu

> **Pano 2025–26'da yeniden tasarlandı.** Dikey menüye geçildi, projeler üst
> düzeye çıktı ve **Product catalog** diye birleşik bir bölüm geldi (Products,
> Offerings, Entitlements, Virtual Currencies). API anahtarları ve entegrasyonlar
> eskiden "Apps" altındaydı, artık **Platforms** başlığı altında. Aşağıdaki adlar
> yeni panoya göre; eski düzendeysen adlar farklı görünür. Değişirse kaynak:
> [Product catalog](https://www.revenuecat.com/docs/getting-started/entitlements) ·
> [Webhooks](https://www.revenuecat.com/docs/integrations/webhooks) ·
> [API keys](https://www.revenuecat.com/docs/projects/authentication).

1. **Proje**: panonun üstündeki proje açılırından **+ Create new project** →
   `Lernomi`.

2. **Uygulamaları bağla** — proje panosunda **Apps** (yeni düzende **Platforms**
   altında; web sağlayıcıları için ayrıca **Web**):
   - **Google Play Store**: uygulama adı, paket adı `com.lernomi.learn`
     (`build.gradle`'daki **`applicationId`** — `namespace` olan `com.lernomi`
     DEĞİL), §3.2'deki **Service Credentials** (servis hesabı JSON'u).

     Aynı ekrandaki üç alan **boş bırakılır** ve üçünün de sebebi ayrı:
     · **Custom URL Scheme** — RevenueCat'in kendi hazır paywall'ının
       önizlemesi için. Biz onu kullanmıyoruz (paywall bizim kodumuzda),
       doldurmak AndroidManifest'e çalışmayan bir intent-filter eklemek olurdu.
     · **Financial reports bucket ID** — yalnız GEÇMİŞ finansal veriyi içe
       aktarmak için; yeni uygulamada geçmiş yok. Gerekirse Play Console →
       *Download reports → Financial* altındaki `gs://pubsite_prod_…`.
     · **Google Apps Experience / Games Level Up Program** — 1M doları aşan
       TEKRARLANMAYAN satın almalarda hizmet bedelini düşüren program. Biz
       yalnız abonelik satıyoruz; programa gerçekten katılmadan tarih yazmak
       komisyon hesabını bozar.
   - **Apple App Store**: uygulama adı, bundle `app.lernomi.ios`,
     **Shared Secret** ve **In-App Purchase Key** (.p8).
     İsteğe bağlı ama **işini kolaylaştırır**: **App Store Connect API Key** —
     bunu da verirsen RevenueCat ürünleri mağazadan doğrudan çekebiliyor, elle
     ürün girmen gerekmiyor.

3. **Ürünler** — **Product catalog → Products**:
   `+ New` → **Import Products** (mağazadan okur) ya da `+ New product` ile elle.
   İki uygulama için de `lernomi_premium_monthly` ve `lernomi_premium_yearly` görünmeli.
   Ürün kimlikleri panelde yazılı olanla aynı olmalı (`/admin/premium` →
   *Planlar*), yoksa offering boş kalır.

4. **Entitlement** — **Product catalog → Entitlements** → `+ New entitlement`,
   identifier **`premium`**.
   Bu değer `mobile/src/lib/billingConfig.ts` içindeki `entitlementId` ile
   **birebir** aynı olmalı.
   Entitlement'ı açıp **Attach** düğmesiyle dört ürünün (2 platform × 2 süre)
   hepsini bağla.

5. **Offering** — **Product catalog → Offerings** → `+ New`, identifier
   **`default`**. İçine gir, **+ Add package** ile iki paket ekle; **Identifier**
   alanı serbest metin değil, süreye göre bir **açılır liste**:
   - *Monthly* (RevenueCat'in ayırdığı kimlik: `$rc_monthly`) → `lernomi_premium_monthly`
   - *Annual* (`$rc_annual`) → `lernomi_premium_yearly`

   Sonra bu offering'i projenin **Default Offering**'i yap. Paywall fiyatları
   buradan okuyor; offering boşsa ya da varsayılan değilse fiyat gösterilemez.

6. **Webhook** — sol menüde **Integrations → Webhooks** → *Add new configuration*:
   - **Webhook Name**: serbest, ör. `Lernomi sunucu`
   - **URL**: `https://www.lernomi.app/api/premium/webhook/revenuecat`
   - **Authorization Header**: uzun rastgele bir sır üret
     (`openssl rand -hex 32`) ve **aynı değeri** üç env dosyasına da yaz:
     `.env.example` (boş bırak), yerel `.env`, sunucu `/opt/lernomi/.env` —
     anahtar adı `REVENUECAT_WEBHOOK_AUTH`.
   - **Environment filter**: **Production**. (Sunucu sandbox olaylarını zaten
     reddediyor; iki katman birlikte duruyor. Test için
     `REVENUECAT_ALLOW_SANDBOX=1` gerekiyor ve bu **üretimde asla** açılmaz.)
   - **App scope**: tüm uygulamalar — tek uç iki platformu da karşılıyor.
   - **Event type filters**: boş bırak. Adaptör tanımadığı olayı zaten sessizce
     geçiyor ve filtre koymak, ileride eklenecek bir olay türünü sessizce
     kaybettirir.

   RevenueCat 200 dışını **beş kez** yeniden deniyor. Uç bu yüzden yalnız gerçek
   hatada (401 yetkisiz, 503 yapılandırılmamış) 2xx dışı dönüyor; "bizim işimize
   yaramayan ama geçerli" olaylar 200 ile kapanıyor.

7. **SDK anahtarları** — **API keys** (yeni düzende **Platforms** altında; tek
   bir uygulamanınkine **Apps** → uygulamayı seçerek de bakılabilir). Android
   (`goog_…`) ve iOS (`appl_…`) **public** anahtarlarını
   `mobile/src/lib/billingConfig.ts` içine yaz. Bunlar **sır değil**, uygulama
   paketinde zaten gömülü; gizli olan `sk_…` ile başlayan secret anahtarlar ve
   onlara bu projede hiç ihtiyaç yok.

### 3.4 Sunucu tarafı

```bash
# üç env dosyasında da aynı anahtar kümesi olmalı (AGENTS.md senkron kuralı)
REVENUECAT_WEBHOOK_AUTH="…"      # §3.3-6'daki sır
REVENUECAT_ALLOW_SANDBOX=""      # üretimde BOŞ kalır
```

Sonra migration:

```bash
npx tsx scripts/apply-migration.ts drizzle/0041_premium_entitlements.sql
npm run db:check                 # şema ↔ kod sapması var mı
```

### 3.5 Doğrulama

- `curl -sI https://www.lernomi.app/api/premium/status` → 200
- RevenueCat panelinde webhook satırında **Send test event** → sunucu günlüğünde
  `[premium/webhook]` hatası olmamalı, yanıt 200 (`skipped: ignored_type`).
- Sandbox/test hesabıyla satın alma yap; `premium_grants` tablosunda `source =
  'store'` satırı görünmeli.

---

## 4. Yönetim paneli — `/admin/premium`

Buradaki her değer **canlıda geçerli**; kod değişikliği veya mağaza sürümü
gerekmiyor (en geç 30 saniyede üç platformda yürürlükte).

- **Ücretsiz katman**: kotalar. `0` = "bu özellik ücretsizde hiç yok".
- **Adil kullanım tavanı**: premium'un günlük tavanı. Paywall'da kullanıcıya
  yazılıyor — değiştirirsen metin de kendiliğinden değişir.
- **Deneme sınavı paketleri**: paket boyu, açan yüzde, "bitirmek de açsın".
- **Referans**: ödül günü, kişi başı tavan.
- **Planlar ve fiyat bilgisi**: ürün kimlikleri, deneme süresi ve **vitrin**
  fiyatları. ⚠️ Buradaki fiyatlar **mağazadaki fiyatı değiştirmez**; mobilde
  fiyat mağazadan gelir (politika gereği). Değiştirirsen App Store Connect ve
  Play Console'daki tutarları da elle eşitle.
- **Promo kodları**: üretim, listeleme, kapatma.
- **Davet sıralaması**: kim kaç kişi getirdi.

### Promo kodu ile 2–3 ay premium verme

1. `/admin/premium` → *Promo kodları*
2. `Kaç gün premium` = 60 ya da 90 · `Kaç kod üretilsin` = kaç kişiye
   vereceksen · `Kod başına kullanım` = 1 (tek kişilik) veya büyük bir sayı
   (kampanya kodu) · `Kampanya adı` = raporlama için
3. **Kod üret** → çıkan listeyi kopyala. Her satırda kodun yanında dağıtım
   bağlantısı var:
   `https://www.lernomi.app/premium?code=KOD`
   Bağlantıya tıklayan kullanıcıda kod alanı dolu geliyor.
4. Kod üç platformda da geçerli; mağazadan bağımsız. Süre kullanıcının
   bakiyesine ekleniyor — abonesi varsa yanmıyor, aboneliği bitince başlıyor.

Kodlar **silinmiyor**, kapatılıyor: kullananların geçmişi ayakta kalsın.

### Davet (referans)

- Her kullanıcının ömür boyu sabit bir kodu var (`profiles.referral_code`,
  ilk istendiğinde üretiliyor).
- Davet edilen kişi kodla kayıt olunca bağ kuruluyor (`referrals`), **ödül
  verilmiyor**.
- Davet edilenin **ilk gerçek ödemesi** alındığında davetçiye 7 gün düşüyor.
  Ödüller bakiyede **birikiyor**: üç davet = 21 gün.
- Bir kişi yalnız **bir kez** davet edilmiş sayılıyor; ilk davetçi kazanıyor.

---

## 5. RevenueCat'ten ayrılmak

Mimarinin sınavı bu. Yapılacaklar:

1. **Yeni adaptör**: `src/lib/premium/providers/<ad>.ts` — `StoreAdapter`
   arayüzünü uygula (`configured()` ve `parse()`). Sağlayıcının olaylarını
   `StoreEvent`e çevir; `ports.ts` ne beklendiğini alan alan anlatıyor.
2. **Kayda ekle**: `providers/index.ts` içindeki `ADAPTERS` haritasına bir
   satır. Webhook ucu `/api/premium/webhook/<ad>` olarak kendiliğinden açılır.
3. **Mobil satın alma**: `mobile/src/lib/billing.ts` içindeki beş fonksiyonu
   yeni SDK ile yaz (`configureBilling`, `getPackages`, `purchase`, `restore`,
   `billingLogout`). Ekranlar bu imzaları çağırıyor; imzalar korunursa hiçbir
   ekran değişmez.
4. **Geçiş**: iki sağlayıcı bir süre **aynı anda** açık kalabilir — ikisi de
   aynı deftere yazıyor. Eski aboneler eski sağlayıcıdan yenilenmeye devam
   eder, yeni satın almalar yenisinden gelir. Kimse yetkisini kaybetmez.
5. **Değişmeyenler**: `entitlements`, `premium_grants`, promo, davet, kotalar,
   admin paneli, `/api/premium/*` uçları, web ve mobil arayüzler.

Web'e kendi ödeme yolunu (Stripe) eklemek de aynı iş: bir adaptör. Web
**komisyonsuz** tek kanal — Apple ve Google %15–30 alıyor. Bugün web'de satın
alma yok ve sayfa bunu açıkça söylüyor ("yükseltme uygulamadan yapılıyor");
kilit gösterip satın alma yolu sunmamak kullanıcıyı çıkmaza sokardı.

---

## 6. Yerelde testi koşturmak

Yetki katmanının 32 doğrulaması **gerçek** Postgres istiyor; sınadıklarının
yarısı veritabanının kendi davranışı (benzersiz kısıtın çakışması, kayıp
güncelleme, `now()`un cümle içinde değerlendirilmesi). CI bunu bir servis
kabıyla koşuyor; yerelde bir kap yetiyor:

```bash
docker run -d --name lernomi-pgtest --network host \
  -e POSTGRES_PASSWORD=test -e POSTGRES_DB=lernomi \
  -e PGPORT=55432 postgres:17-alpine

export DATABASE_URL=postgres://postgres:test@127.0.0.1:55432/lernomi
export TEST_DATABASE_URL=$DATABASE_URL
npx tsx scripts/migrate-all.ts     # 45 migration, sıra _journal.json'dan
npx tsx scripts/schema-check.ts    # şema ile veritabanı uyumlu mu
npm run test:entitlement           # 32 doğrulama
```

`--network host` tercih değil zorunluluk: bu makinede docker'ın köprü ağı
(`veth` çifti) desteklenmiyor, varsayılan ağla kap ayağa kalkmıyor. Port
5432 yerine 55432 seçilmesinin sebebi de bu — host ağında yerel Postgres ile
çakışmasın.

`migrate-all.ts` adres localhost değilse **baştan reddediyor**; test de aynı
şekilde. Üretim veritabanına yanlışlıkla bağlanmak bu iki kapının arkasında.

---

## 7. Sınanacaklar (mağaza hesapları gerektirir)

- [ ] Sandbox satın alma → `premium_grants`'e `store` satırı düşüyor mu
- [ ] Deneme başlangıcı → yetki açılıyor, `store_paid_at` **boş** kalıyor
- [ ] Deneme → ücretli geçiş → `store_paid_at` doluyor, davetçiye 7 gün düşüyor
- [ ] İptal → süre sonuna kadar erişim sürüyor (`canceled`)
- [ ] İade → erişim **derhal** kapanıyor (`refunded`)
- [ ] Promo kodu → üç platformda da aynı anda açılıyor
- [ ] Hediye süresi çalışırken abone olmak → kalan hediye bakiyeye dönüyor
- [ ] Ücretsiz hesapta cepte yürüyüş → 403 `premium_required`
- [ ] Ücretsiz hesapta 2. seviye dersi sonrası → haftalık hakka düşüyor
- [ ] Kilitli deneme kâğıdının kimliğini doğrudan uca göndermek → 403
- [ ] Abonelik bitince premium ekranlar kilitleniyor, **ilerleme silinmiyor**
