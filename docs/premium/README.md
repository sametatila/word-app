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
kalırdı.

**"Sınırsız" denmiyor.** Premium'un da adil kullanım tavanı var ve paywall'da
yazılı. Tavanı olan bir şeyi sınırsız diye pazarlamak App Store 3.1.2 ve Play'in
abonelik beyanı kurallarına aykırı.

---

## 3. RevenueCat kurulumu — adım adım

> Sıra önemli: **önce mağazalarda ürünler**, sonra RevenueCat. RevenueCat
> ürünleri mağazadan okuyor; ürün yoksa bağlayacak bir şey de yok.

### 3.1 App Store Connect (iOS)

1. **My Apps → Lernomi → Subscriptions** → **Create** bir *Subscription Group*:
   ad `Lernomi Premium`. (Aynı gruptaki ürünler arasında kullanıcı yükseltme /
   düşürme yapabiliyor; aylık ve yıllık **aynı** grupta olmalı.)
2. Gruba iki abonelik ekle:
   - Product ID `premium_monthly`, süre **1 Month**
   - Product ID `premium_yearly`, süre **1 Year**
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

1. **Monetise → Products → Subscriptions → Create subscription**
   - Product ID `premium_monthly` → *base plan* `monthly-autorenew`,
     billing period **P1M**, **auto-renewing**
   - Product ID `premium_yearly` → *base plan* `yearly-autorenew`,
     billing period **P1Y**, **auto-renewing**
2. Her base plan için **Offer** ekle: *Free trial*, süre **P1M**, uygunluk
   *New customers only*.
3. **Fiyat**: base plan → *Set prices* → Türkiye ve Euro ülkeleri yukarıdaki
   tabloya göre; kalan ülkeler için USD tabanından dönüştür.
4. **Aktifleştir** (Activate). Etkin olmayan bir base plan RevenueCat'e
   görünmez.
5. **Service account**: Google Cloud'da bir servis hesabı aç, *Google Play
   Android Developer API*'yi etkinleştir, JSON anahtarını indir. Play Console →
   *Users and permissions* → o servis hesabını davet et ve **View financial
   data** + **Manage orders and subscriptions** yetkisini ver. (Yetki
   verilmezse RevenueCat abonelikleri doğrulayamaz.)

### 3.3 RevenueCat panosu

1. `app.revenuecat.com` → **Create new project**: `Lernomi`.
2. **Project settings → Apps → + New app**:
   - **Google Play Store**: paket adı `com.lernomi.learn`, §3.2'deki servis
     hesabı JSON'unu yükle.
   - **App Store**: bundle `app.lernomi.ios`, §3.1'deki *shared secret* ve
     *In-App Purchase Key* (.p8) dosyasını yükle.
3. **Products**: her iki uygulama için `premium_monthly` ve `premium_yearly`'yi
   içe aktar (*Import* mağazadan okur).
4. **Entitlements → + New**: identifier **`premium`**.
   Bu değer `mobile/src/lib/billingConfig.ts` içindeki `entitlementId` ile
   **birebir** aynı olmalı.
   Dört ürünün (2 platform × 2 süre) hepsini bu entitlement'a bağla.
5. **Offerings → + New**: identifier **`default`**, *Make current* işaretli.
   İki paket ekle:
   - `$rc_monthly` → `premium_monthly`
   - `$rc_annual` → `premium_yearly`
   Paywall fiyatları buradan okuyor; offering boşsa paywall fiyat gösteremez.
6. **Project settings → Integrations → Webhooks → + New**:
   - **URL**: `https://www.lernomi.app/api/premium/webhook/revenuecat`
   - **Authorization header**: uzun rastgele bir sır üret
     (`openssl rand -hex 32`) ve **aynı değeri** üç env dosyasına da yaz:
     `.env.example` (boş bırak), yerel `.env`, sunucu `/opt/lernomi/.env` —
     anahtar adı `REVENUECAT_WEBHOOK_AUTH`.
   - **Environment**: Production. (Sandbox olayları sunucuda bilerek yok
     sayılıyor; test için `REVENUECAT_ALLOW_SANDBOX=1` gerekiyor ve bu
     **üretimde asla** açılmaz.)
7. **Project settings → API keys → Public app-specific keys**: Android
   anahtarını (`goog_…`) ve iOS anahtarını (`appl_…`)
   `mobile/src/lib/billingConfig.ts` içine yaz. Bu anahtarlar **sır değil**,
   uygulama paketinde zaten gömülü.

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

## 6. Sınanacaklar (mağaza hesapları gerektirir)

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
