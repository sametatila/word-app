# Google Play Console — hedef kitle, içerik derecelendirme ve mağaza listesi (Nomi)

Console'a girilecek cevaplar ve metinler. Kimlik alanları ve alan adı kesinleşince
`[[...]]` yer tutucuları doldurulur. Kaynak: uygulamadaki gerçek içerik ve özellikler;
rakip adı, uygulamada olmayan özellik ve abartılı iddia yok (Play "metadata" politikası).

## 1. Hedef kitle ve içerik (Target audience and content)

| Soru | Cevap | Gerekçe |
|---|---|---|
| Hedef yaş grupları | **Yalnız 18 ve üzeri** | Kullanım şartları §3 hesap açmayı 18 yaşla sınırlıyor. 16–17 işaretlenmemeli: altında bir yaş grubu seçmek uygulamayı Aileler politikası kapsamına alır ve açık uçlu yapay zekâ sohbeti ile serbest metinli sosyal katman o kapsamda ek gereklilik doğurur. İçerik de yetişkine dönük: CEFR A1–C1, Goethe/telc sınav hazırlığı, "Hukuk ve sözleşme dili", "Para ve kariyer" |
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
| Şiddet, cinsellik, uyuşturucu, kumar, kaba dil içeriği | Hayır | Ders içerikleri sınav odaklı; STT küfür maskeli; promptlarda güvenlik sınırları |
| Kullanıcılar birbiriyle etkileşiyor mu | **Evet, sınırlı** | Haftalık sıralamada görünen ad; arkadaşlık, tepki, dürtme; özel mesajlaşma yok |
| Kullanıcı üretimi içerik başkalarına görünüyor mu | Evet (görünen ad, kullanıcı adı, biyografi) | Moderasyon: ad filtresi, bildir/engelle, insan incelemesi |
| Kişisel bilgi paylaşımı | Kullanıcı isterse görünen ad | Konum paylaşımı yok |
| Konum paylaşımı | Hayır | Konum izni yok |
| Dijital satın alma | Premium canlıysa **Evet** (abonelik); canlı değilse Hayır | `billingConfig.ts` anahtarı |
| Reklam | Hayır | Reklam SDK'sı yok |
| Yapay zekâ ile etkileşim / üretilen içerik | **Evet** | Rol yapma diyalogları ve değerlendirme; uygulama içi bildirme |

Beklenen sonuç: PEGI 3 / ESRB Everyone, "Kullanıcı etkileşimi" ve "Dijital satın alma"
etiketleriyle.

## 3. Mağaza listesi

### Başlık (en çok 30 karakter)

`Nomi: Almanca Öğren`

Tek kelime "Nomi" Play'de başka bir uygulamayla (yapay zekâ arkadaş) çakışıyor;
ayırt edici son ek şart. İngilizce kurs listelemede öne çıkacaksa: `Nomi: Almanca ve İngilizce`.

### Kısa açıklama (en çok 80 karakter)

`Almanca kelime, konuşma ve Goethe/telc hazırlığı. Kısa turlar, yürürken pratik.`

### Tam açıklama (en çok 4000 karakter)

```
Nomi, dil öğrenmeyi günlük bir alışkanlığa çeviren bir uygulamadır: kısa kelime
turları, gerçek derslerle konuşma pratiği ve Goethe/telc sınavlarına hedefli hazırlık.

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
Goethe-Zertifikat ve telc Deutsch formatına uygun Lesen ve Hören alıştırmaları.

ARKADAŞLARINLA
Haftalık sıralama, arkadaş ekleme, tepkiler ve ortak görevler. Özel mesajlaşma yoktur;
profil görünürlüğünü sen yönetirsin.

GİZLİLİK
Reklam yok, takip yok, veri satışı yok. Mikrofon yalnız sen yürüyüş modunu başlatınca
açılır. Hesabını dilediğin an uygulamadan silebilirsin.

Zürih Almancası (Züritüütsch) kursu ve İngilizce kursu da mevcuttur.

Gizlilik politikası: [[SITE]]/privacy
Kullanım şartları: [[SITE]]/terms
```

Yasak: "Duolingo", "Babbel" gibi rakip adları; "en iyi", "1 numara" iddiaları; olmayan
özellik (tam deneme sınavı, reklamsız premium). Goethe-Institut ve telc adları yalnız
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
| E-posta | `[[DESTEK_E_POSTASI]]` |
| Web sitesi | `[[SITE]]` |
| Gizlilik politikası | `[[SITE]]/privacy` |
| Reklam içerir | Hayır |
| Uygulama içi satın alma | Premium canlıysa "Evet" |

## 4. Marka ve fikri mülkiyet

- "Nomi" adı: TÜRKPATENT ve EUIPO'da marka sorgusu yap; Play'deki "Nomi" (yapay zekâ arkadaş)
  ile karışıklık itirazına karşı ayırt edici başlık kullan.
- Maskot (mirket) özgün; başka bir dil uygulamasının maskotuna benzemiyor.
- Goethe-Institut ve telc tescilli markalar: listelemede yalnız tanımlayıcı kullanım,
  logo yok; Kullanım Şartları §8 bağlantısızlığı belirtiyor.

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
