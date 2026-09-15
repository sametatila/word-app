# Google Play Console — hedef kitle, içerik derecelendirme ve mağaza listesi (Lernomi)

Console'a girilecek cevaplar ve metinler. Kimlik alanları ve alan adı 2026-09-10'da
kesinleşti ve dolduruldu; geriye yalnız inceleme hesabının kimliği kaldı
(`[[TEST_HESABI_*]]`, bkz. `docs/play/console.md`). Kaynak: uygulamadaki gerçek içerik ve özellikler;
rakip adı, uygulamada olmayan özellik ve abartılı iddia yok (Play "metadata" politikası).

## 1. Hedef kitle ve içerik (Target audience and content)

| Soru | Cevap | Gerekçe |
|---|---|---|
| Hedef yaş grupları | **Yalnız 18 ve üzeri** | Kullanım şartları §3 hesap açmayı 18 yaşla sınırlıyor. 16–17 işaretlenmemeli: altında bir yaş grubu seçmek uygulamayı Aileler politikası kapsamına alır ve açık uçlu yapay zekâ sohbeti ile serbest metinli sosyal katman o kapsamda ek gereklilik doğurur. İçerik de yetişkine dönük: CEFR A1–C1, sınav hazırlığı, "Hukuk ve sözleşme dili", "Para ve kariyer" |
| Uygulama çocuklara çekici mi | **Hayır** | Maskot (mirket) ve oyunlaştırma var ama listeleme yetişkin öğrenciye ve sınava odaklı; mağaza görsellerinde maskot ana unsur olmayacak |
| Aileler politikası | Kapsam dışı | Yapay zekâ sohbeti ve kullanıcı etkileşimi çocuk kitlesiyle bağdaşmaz |
| Beklenmeyen çocuk kullanıcı | Hesap ve veri silinir | Gizlilik politikası §12 |

Listeleme kuralı: ekran görüntülerinde ve açıklamada "çocuk", "kids", "eğlenceli oyun"
vurgusu yok; maskot yalnız uygulama içinde.

## 2. İçerik derecelendirme anketi (IARC)

Kategori: **Eğitim / Referans** değil, "Utility, Productivity, Communication, or Other" altında
eğitim uygulaması olarak doldurulur (Play'in anketinde eğitim seçeneği bu grupta).

| Soru | Cevap | Dayanak |
|---|---|---|
| Şiddet, cinsellik, kumar, kaba dil içeriği | Hayır | ÖLÇÜLDÜ (2026-09-10): cinsellik ve şiddet tasviri sıfır; `Gewalt` yalnız B1 hırsızlık ünitesinde kelime maddesi, silah geçişleri mecaz |
| Alkol, tütün, uyuşturucu ATFI | **Evet, seyrek** | 8.707 kelimenin 14'ü: `Bier`, `Wein`, `rauchen`, `Zigarette` (A1), `Alkohol`, `Kneipe`, `Droge` (B1). IARC bu soruyu ayrı soruyor; App Store'da aynı cevap dereceyi 4+'tan 13+'a çekti |
| Kullanıcılar birbiriyle etkileşiyor mu | **Evet, sınırlı** | Haftalık sıralamada görünen ad; arkadaşlık, tepki, dürtme; özel mesajlaşma yok |
| Kullanıcı üretimi içerik başkalarına görünüyor mu | Evet (görünen ad, kullanıcı adı, biyografi) | Moderasyon: ad filtresi, bildir/engelle, insan incelemesi |
| Kişisel bilgi paylaşımı | Kullanıcı isterse görünen ad | Konum paylaşımı yok |
| Konum paylaşımı | Hayır | Konum izni yok |
| Dijital satın alma | **Evet** (abonelik) | Manifest zaten `com.android.vending.BILLING` taşıyor (react-native-purchases) ve premium ürünün parçası; bkz. aşağıdaki karar |
| Reklam | Hayır | Reklam SDK'sı yok |
| Yapay zekâ ile etkileşim / üretilen içerik | **Evet** | Rol yapma diyalogları ve değerlendirme; uygulama içi bildirme |
| Yarışma (contests) | **Evet, sürekli** | Haftalık lig: küme başına sıralama, yükselme/düşme, haftalık sıfırlama. "Ödülsüz" olması tanımı değiştirmiyor — App Store anketinde ilk taslak bu yüzden yanlıştı, bkz. `docs/appstore/listing.md` §2.3 |


> **Karar (2026-09-09):** premium ilk sürümde AÇIK sayılıyor. Abonelik satın alma
> RevenueCat bağlanınca gelecek, ama ürün premium'lu bir ürün olarak yayımlanıyor:
> ücretsiz katmanın sınırları uygulanıyor, paywall erişilebilir, promo kodu ve davet
> ödülü bugün gerçek premium veriyor. Beyanlar buna göre doldurulur — sonradan
> "aslında satın alma da varmış" demek, mağaza gözünde beyanın düzeltilmesi değil
> YANLIŞ BEYAN olur.

Beklenen sonuç: alkol/tütün atfı ve yarışma cevapları PEGI 3'ü yukarı çekecek —
App Store'da aynı cevaplar 13+ verdi. **Hedef kitle 18+ olarak kalıyor** ve App Store
derecesi de 2026-09-10'da elle 18+'a yükseltildi; üç beyan (Play hedef kitlesi,
App Store derecesi, şartlar §3) artık aynı sayıyı söylüyor. Gerekçe:
`docs/appstore/listing.md` §2.4.

## 3. Mağaza listesi

### Başlık (en çok 30 karakter)

`Lernomi: Almanca Öğren A1-C1` (28/30). Console'daki başlıkla ve App Store adıyla aynı (2026-09-14'te API'den okundu).

Tek kelime "Lernomi" Play'de başka bir uygulamayla çakışmıyor: 2026-09-14 sorgusunda aynı
adla uygulama çıkmadı (§4.1). İngilizce kurs listelemede öne çıkacaksa: `Lernomi: Almanca ve İngilizce`.

### Kısa açıklama (en çok 80 karakter)

`Almanca kelime, konuşma ve sınav hazırlığı. Kısa turlar, yürürken pratik.`

### Tam açıklama (en çok 4000 karakter)

```
Lernomi, dil öğrenmeyi günlük bir alışkanlığa çeviren bir uygulamadır: kısa kelime
turları, gerçek derslerle konuşma pratiği ve sınav formatına hedefli hazırlık.

KELİME TURLARI
Aralıklı tekrar (SRS) her kelimeyi tam unutmak üzereyken önüne getirir. A1'den C1'e
resmi kelime listelerine dayanan içerik; çoktan seçmeli, yazma, dinleme, eşleştirme ve
cümle kurma oyunları.

YÜRÜYÜŞ MODU
Ekrana bakmadan çalış: Türkçe ipucunu duy, Almancasını söyle. Telefon cebindeyken ya da
ekran kapalıyken de dinler; sesin yalnız tanıma için kullanılır, kaydedilmez.

DERSLER VE KONUŞMA PRATİĞİ
Her ders kısa bir anlatımla başlar, ardından yapay zekâ karakteriyle gerçek bir sahnede
konuşursun: kafede sipariş, doktor randevusu, iş görüşmesi. Düzeltmeler anında gelir.

OKUMA, DİNLEME, YAZMA
Her seviyede okuma ve dinleme parçaları, yazma görevleri; yazdıkların değerlendirilir
ve geri bildirim alırsın.

SINAV HAZIRLIĞI
telc Deutsch formatına uygun Lesen ve Hören alıştırmaları.

ARKADAŞLARINLA
Haftalık sıralama, arkadaş ekleme, tepkiler ve ortak görevler. Özel mesajlaşma yoktur;
profil görünürlüğünü sen yönetirsin.

GİZLİLİK
Reklam yok, takip yok, veri satışı yok. Mikrofon yalnız sen başlattığında açılır;
yapay zekâya bir şey gitmeden önce iznin istenir. Hesabını dilediğin an uygulamadan silebilirsin.

Zürih Almancası (Züritüütsch) kursu ve İngilizce kursu da mevcuttur.

Gizlilik politikası: https://www.lernomi.app/privacy
Kullanım şartları: https://www.lernomi.app/terms
```

Yasak: "Duolingo", "Babbel" gibi rakip adları; "en iyi", "1 numara" iddiaları; olmayan
özellik (tam deneme sınavı, reklamsız premium). telc adı yalnız
sınav formatını tarif etmek için, "onaylı/resmi" ima etmeden.

### Kategori ve etiketler

Kategori: **Eğitim**. Etiketler: dil öğrenme, Almanca, kelime, sınav hazırlığı, konuşma pratiği.

### Görseller

| Varlık | Ölçü | İçerik |
|---|---|---|
| Uygulama ikonu | 512×512 PNG | Mevcut adaptive ikonun ön planı, turuncu zemin |
| Feature graphic | 1024×500 | Marka rengi zemin, başlık ve iki ekran görüntüsü; maskot küçük |
| Telefon ekran görüntüleri (en az 4, 16:9 ya da 9:16) | 1080×1920 önerilir | 1) Günlük tur, 2) Yürüyüş modu, 3) Ders diyaloğu, 4) Beceriler (okuma/dinleme/yazma), 5) Sınav hazırlık, 6) Sıralama |
| 7" ve 10" tablet | en az 1 | Beceriler ekranı yatay |

Ekran görüntüleri gerçek cihazdan, gerçek hesapla; yer tutucu veri yok. Metin yerleşimi
varsa uygulamadaki özelliği anlatır, fiyat ya da vaat içermez.

### Diğer alanlar

| Alan | Değer |
|---|---|
| Varsayılan dil | Türkçe (tr-TR); İngilizce çeviri listelemesi sonraki adım |
| E-posta | `support@lernomi.app` |
| Web sitesi | `https://www.lernomi.app` |
| Gizlilik politikası | `https://www.lernomi.app/privacy` |
| Reklam içerir | Hayır |
| Uygulama içi satın alma | Premium canlıysa "Evet" |

## 4. Marka ve fikri mülkiyet

### 4.1 "Lernomi" ad sorgusu — yapılan sorgular ve sonuçları (2026-09-14)

Rapor B28 "Lernomi adı Play'de başka bir uygulamada; marka sorgusu yapılmamış" diyordu ve
bu belgenin eski sürümü de aynı şeyi söylüyordu. Sorgular 2026-09-14'te, oturum açmadan ve
her kaynağın kendi arama ucuyla yapıldı. Aşağıdakiler **yapılan sorgu ve sonucu**dur; hukuki
bir değerlendirme ya da "kullanılabilir" görüşü değildir.

**Mağazalar**

| Kaynak | Sorgu | Sonuç |
|---|---|---|
| Google Play, ABD vitrini | [`lernomi`](https://play.google.com/store/search?q=lernomi&c=apps&hl=en&gl=US) | "Lernomi" adlı uygulama yok. Tek sonuç **Nomi: AI Companion with a Soul** (geliştirici Nomi.ai, paket `ai.nomi.twa`): adı "Nomi", Play'in yakın yazım eşleşmesi. Eski belgedeki "yapay zekâ arkadaş uygulamasıyla çakışıyor" notuyla örtüşen tek sonuç bu ve **aynı ad değil** |
| Google Play, Türkiye vitrini (İngilizce ve Türkçe arayüz) | [`lernomi`](https://play.google.com/store/search?q=lernomi&c=apps&hl=tr&gl=TR) | Eşleşme yok; Play genel eğitim uygulamaları öneriyor |
| Google Play, Almanya vitrini (İngilizce ve Almanca arayüz) | [`Lernomi`](https://play.google.com/store/search?q=Lernomi&c=apps&hl=de&gl=DE) | "Keine Ergebnisse für Lernomi" / "No results for lernomi" |
| Google Play, Birleşik Krallık | [`"lernomi"`](https://play.google.com/store/search?q=%22lernomi%22&c=apps&hl=en&gl=GB) | "No results" |
| Google Play, doğrudan adres | geliştirici `Lernomi`, paket `com.lernomi.learn` | İkisi de 404 (henüz yayımlanmış bir sayfa yok) |
| App Store — Apple'ın arama ucu (iTunes Search API) | [`term=lernomi&entity=software`](https://itunes.apple.com/search?term=lernomi&entity=software&country=tr), vitrinler us, gb, tr, de, at, ch, fr, nl | Adında, satıcı adında ya da paket kimliğinde "lernom" geçen uygulama yok (us ve gb'de alakasız yakın sonuçlar, öteki altı vitrinde sıfır sonuç) |

**Marka veritabanları** (sınıf 9, 41, 42 odaklı)

| Kaynak | Sorgu | Sonuç |
|---|---|---|
| [TMview](https://www.tmdn.org/tmview/) (EUIPO'nun işlettiği ortak veritabanı) — tüm ofisler | `lernomi`: tam, "içerir", "benzer" | **Tam eşleşme yok.** İçerir: 3 — SALERNOMIA (İtalya), SELLERNOMICS (ABD, sınıf 41, tescilli), DEALERNOMICS (ABD, sona ermiş). Benzer: 7 — **LERNMI** (İspanya, **sınıf 41, tescilli**, MIXELAND 1431 S.L.), Lenomi (Almanya, 24/25), LeRoMi Camper (Almanya, 12/22/35), LENOMI (ABD başvurusu, 25/35), SERNOMI (ABD ve Fransa, sınıf 5, sona ermiş), LEROMI (Brezilya, sona ermiş) |
| TMview — ofis ofis: EUIPO (EM), TÜRKPATENT (TR), WIPO Madrid (WO), Almanya (DE), İsviçre (CH), Birleşik Krallık (GB), Avusturya (AT) | aynı üç arama | EM, TR, WO, CH, GB, AT: üç aramada da **0**. DE: yalnız benzer aramada Lenomi ve LeRoMi Camper. Ofis filtresinin çalıştığı bilinen markalarla sınandı (ör. TR'de "turkcell", EM ve WO'da "babbel" kayıt döndürdü) |
| [USPTO](https://tmsearch.uspto.gov/search/search-information) — sitenin kullandığı arama servisi | kelime markası `lernomi`; ayrıca en çok iki harf farklı yazımlar | **Tam eşleşme 0** (aynı sorgu "duolingo" için 19 kayıt döndürdü, yani sorgu çalışıyor). Yakın yazımda 74 kayıt; sınıf 9/41/42'de canlı olanlar: LEOMI (9/41/42), LERNOU (9), LEMNOI (9), ERGOMI (9), LEBROMI (9), LERMOM (9), GENOMI-K (42/44). "lernom" ya da "learnom" içeren canlı marka: SELLERNOMICS (41), LEARNOMATION (41) |
| [EUIPO eSearch plus](https://euipo.europa.eu/eSearch/) | — | Doğrudan sorgulanmadı (tarayıcıda çalışan uygulama). EUIPO kayıtları TMview'da EM ofisiyle sorgulandı: 0 |
| [WIPO Global Brand Database](https://branddb.wipo.int/en/quicksearch) | — | **Erişilemedi.** Site otomatik istemciye bir doğrulama (ALTCHA) gösteriyor; atlatılmadı. Madrid sistemi uluslararası kayıtları TMview'da (WO) 0; GBD'nin TMview'da olmayan ulusal koleksiyonları **sorgulanmadı** |
| [TÜRKPATENT araştırma ekranı](https://www.turkpatent.gov.tr/arastirma-yap?form=trademark) | — | **Erişilemedi**: ekran reCAPTCHA istiyor. TÜRKPATENT kayıtları TMview'da (TR) 0. TMview ulusal veriyi ofislerden dönemsel olarak aldığı için çok yeni başvurular orada gecikmeli görünebilir |

**Alan adları ve şirket adları**

| Kaynak | Sorgu | Sonuç |
|---|---|---|
| Kayıt kuruluşlarının RDAP/WHOIS servisleri (Verisign, PIR, DENIC, EURid, SWITCH, nic.at, Nominet, TRABIS ve .io/.ai/.co kayıt kuruluşları) | `lernomi` + .com, .net, .org, .io, .ai, .co, .de, .eu, .ch, .at, .co.uk, .uk, .com.tr, .tr | **Hiçbiri kayıtlı değil.** Kayıtlı olan yalnız bizim `lernomi.app`. (Alan adının boş olması marka hakkı hakkında bir şey söylemez) |
| [UK Companies House](https://find-and-update.company-information.service.gov.uk/search/companies?q=lernomi) | `lernomi` | "No results found" |
| [Zefix](https://www.zefix.ch/) (İsviçre ticaret sicili) | `lernomi` | Sonuç yok |
| [North Data](https://www.northdata.com/lernomi) (Almanya, Avusturya, İsviçre, Birleşik Krallık, Kıbrıs vb. sicil yayınlarını derleyen ikincil kaynak) | `lernomi` | Adında "Lernomi" geçen tek kayıt **Lernomi Holdings Ltd.**, Lefkoşa, Kıbrıs, sicil HE 261397, durumu "Terminated" (sona ermiş). Faaliyet alanı kaynakta yok; Kıbrıs resmî sicilinde doğrulanmadı |
| OpenCorporates; Türkiye Ticaret Sicili Gazetesi ünvan sorgusu | `lernomi` | **Erişilemedi** (ikisi de captcha istiyor) |
| Genel web araması | "Lernomi" app / trademark / language learning | "Lernomi" adlı bir ürün, marka ya da şirket sitesi çıkmadı. Aynı alanda yakın adlar var: **Lerni** (lerni.us, çevrimiçi dil kursu; Play'de `com.lerni.android`), Lernix (yapay zekâ dil öğretmeni), Lernu! (Esperanto). TMview'da "LERNI" adıyla da kayıtlar var, ör. AB markası LERNi (sınıf 16/19/28/41, tescilli) ve Türkiye başvurusu "ludi lerni" (9/28/35/38/41/42) |

**Özet.** 2026-09-14 itibarıyla iki mağazada da "Lernomi" adlı bir uygulama, sorgulanabilen
marka veritabanlarında da "LERNOMI" işareti bulunmadı; eski "Play'de çakışıyor" iddiası
doğrulanmadı (bulunan uygulamanın adı "Nomi"). Buna karşılık eğitim ve yazılım sınıflarında
yazılışı yakın işaretler (LERNMI, LEOMI, LERNi, NOMI adlı çeşitli kayıtlar) ve aynı pazarda
yakın adlı ürünler (Lerni) var; bunların karışıklık yaratıp yaratmayacağı hukuki bir
değerlendirme ve burada yapılmadı. İki sınır da açık: WIPO GBD ile TÜRKPATENT'in kendi ekranı
otomatik sorguya kapalıydı ve sesçe benzerlik taraması yapılmadı.

**Öneri (hukuki görüş değil):** ilk sürümden ve reklam harcamasından önce profesyonel bir
marka araştırması (sesçe benzerlik ve TMview dışındaki ulusal siciller dahil) yaptırılması
ve "LERNOMI"nin TÜRKPATENT ve/veya EUIPO'da 9, 41 ve 42. sınıflarda başvurusunun
değerlendirilmesi. Olası bir ad değişikliği yayından önce çok daha ucuz.

### 4.2 Sınav markaları

- telc tescilli bir marka: listelemede yalnız tanımlayıcı kullanım,
  logo yok; Kullanım Şartları §8 bağlantısızlığı belirtiyor.

### 4.3 Maskot

Maskot (mirket) özgün; başka bir dil uygulamasının maskotuna benzemiyor.

> iOS için ayrı bir beyan seti gerekiyor; bkz. `docs/appstore/README.md`. Play'in Veri
> Güvenliği formu ile App Store gizlilik etiketleri farklı sorular sorar, biri öbürüne
> kopyalanamaz.

## 5. Geliştirici hesabı — şirketsiz gerçek kişi

**İki taraf var, karıştırmayın.** Play hesabı ve mağazada görünen yayıncı **Musa Atila**
(Tufanbeyli, Adana); gizlilik politikasındaki **veri sorumlusu** ise **Samet Atila**
(Dortmund, Almanya). Bu bilerek böyle: veri sorumlusu AB'de yerleşik olduğu için GDPR
m.27 AB temsilcisi gerekmiyor. Mağaza sayfası ile politika farklı isim gösterdiğinde
kullanıcı ve inceleyen kafa karıştırmasın diye ilişki hem şartlar §1'de hem gizlilik
politikası §1'de açıkça anlatılıyor (yayıncı, veri sorumlusunun talimatıyla hareket
eden veri işleyendir).

Hesap **bireysel** (kişisel) geliştirici hesabı: ticaret siciline kayıtlı bir tüzel kişi yok,
dolayısıyla "organization" hesabı ve onun istediği D-U-N-S numarası da yok. Bunun doğrudan
sonuçları:

| Konu | Sonuç |
|---|---|
| Kimlik doğrulama | Play, ad-soyad, adres, telefon ve e-postayı doğruluyor; `src/lib/legal.ts` içindeki **yayıncı** (`publisher*`) değerleriyle aynı olmalı — veri sorumlusunun (`controller*`) bilgileriyle değil |
| Adresin görünürlüğü | Bireysel hesapta doğrulanmış ad ve adres **mağaza sayfasında herkese görünür**. Ev adresi verilmek istenmiyorsa hesap açılırken bir yazışma adresi kullanılmalı — sonradan değiştirmek yeniden doğrulama demek |
| Destek e-postası | Listelemede zorunlu ve herkese açık; `LEGAL_ENTITY.supportEmail` ile aynı olmalı |
| Kapalı test kapısı | Kişisel hesaplar için Play, üretime geçmeden önce belirli sayıda test kullanıcısıyla kesintisiz kapalı test istiyor. **Sayı ve süre Google tarafından değiştiriliyor; Console'daki güncel değer esas alınmalı.** Bu, bireysel hesapların en sık gözden kaçırdığı kapı |

Metin tarafındaki karşılığı `src/lib/legal.ts`'teki kimlik profili notunda: ticaret sicil/MERSİS
alanı yok, yerine vergi dairesi var; KEP zorunlu değil ve boş bırakılırsa hukuki metinlerden
kendiliğinden düşüyor; satış belgesini Google düzenlediği ve kazanç istisnası kapsamında
belge düzenleme yükümlülüğü olmadığı için şartlar fatura vaat etmiyor.

> Vergi tarafı (istisnanın koşulları, banka hesabı, istisna belgesi, hasılat sınırı) bu deponun
> konusu değil ve mali müşavirle doğrulanmalı. Buradaki tek etkisi metinlerin şirket varsaymaması.
