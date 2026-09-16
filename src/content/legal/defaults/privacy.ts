import type { LegalDocDefault } from "./types";

/**
 * Gizlilik politikası — koddaki VARSAYILAN metin, üç dilde.
 *
 * NEREDEN GELDİ. 2026-09-09'a kadar bu metin JSX'ti (src/app/privacy/page.tsx + src/content/legal/privacy-{en,de}.tsx).
 * Panelden düzenlenebilir olması istenince markdown'a çevrildi — elle
 * kopyalanarak değil, sayfaların GERÇEK ÇIKTISINDAN üretilerek: bir cümlenin
 * yolda kaybolmadığının tek kanıtı, basılan şeyin kendisiyle karşılaştırmaktı.
 * Dönüşüm iki yönde de doğrulandı: iOS bayrağı açık ve kapalı hâlleriyle eski
 * çıktıya birebir eşleşiyor.
 *
 * BU DOSYA VARSAYILAN, KAYNAK DEĞİL. Yürürlükteki metin `legal_documents`
 * tablosunda; orada satır yoksa (yeni kurulum, boş veritabanı, okuma hatası)
 * burası basılıyor. Panelde bir şey bozulursa geri dönülecek yer burası.
 *
 * ELLE DÜZENLENEBİLİR ama düzenleme yayına ÇIKMAZ: veritabanında o belgenin
 * satırı varsa üstyazım kazanır. Buradaki metni değiştirmek yalnız yeni
 * kurulumları ve "varsayılana dön" düğmesini etkiler.
 */
export const PRIVACY_DEFAULT: Record<"tr" | "en" | "de", LegalDocDefault> = {
  tr: {
    title: "Gizlilik Politikası ve Aydınlatma Metni",
    description: "Lernomi'nin hangi verileri, neden ve ne kadar süreyle işlediği; KVKK ve GDPR kapsamındaki hakların; hesap silme.",
    summary: [
      "Lernomi bir dil öğrenme uygulaması: Almanca, Zürih Almancası ve İngilizce.",
      "Hesabını yürütmek için e-postan ve adın, öğrenmeni izlemek için ilerleme verin işlenir.",
      "Yazdıkların ve söylediklerin yapay zekâ sağlayıcılarına ancak uygulama içinde izin verdiğinde gönderilir; sağlayıcılar izin ekranında adıyla sayılır.",
      "Mikrofon yalnız konuşarak cevap verdiğinde açılır. Sesin sunucuya yalnız izninle gönderilir ve kayıt saklanmaz.",
      "Reklam, reklam kimliği ve üçüncü taraf takip yok.",
      "Hesabını dilediğin an uygulamadan ya da web'den silebilirsin.",
      "Avrupa'da GDPR, Türkiye'de KVKK hakların geçerli.",
    ],
    body: `## 1. Veri sorumlusu

Bu politika kapsamındaki kişisel verilerin sorumlusu, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) anlamında aşağıdaki kişidir: hangi verinin hangi amaçla işleneceğine, ne kadar tutulacağına ve hangi sağlayıcıya gideceğine o karar verir. Politika, Lernomi web uygulamasını (www.lernomi.app) ve {{platforms}} kapsar.

{{entityBlock:controller:contact}}

Uygulamayı mağazalarda yayımlayan ve abonelik tahsilatını yürüten taraf ayrı bir kişidir. Yayıncı, veri sorumlusunun talimatı dışında kişisel veri işlemez; Play Console{{ifIos}} ve App Store Connect{{/ifIos}} üzerinden eriştiği sipariş, abonelik ve yorum verisi bakımından **veri işleyen** sıfatını taşır ve taraflar arasında bu kapsamda bir işleme sözleşmesi bulunur (GDPR m.28, KVKK m.12).

{{entityBlock:publisher}}

Sunucular {{hosting}} üzerinde çalışır; veriler orada saklanır. Veri sorumlusu Türkiye'de yerleşik değildir; Türkiye'den yapılacak başvurular ve Kurumla yazışma için yukarıda bilgileri verilen veri sorumlusu temsilcisi belirlenmiştir. Temsilcinin belirlenmesi veri sorumlusunun kendi sorumluluğunu ortadan kaldırmaz.

**Toplama yöntemi ve hukuki sebep (KVKK m.10):** Veriler, kayıt ve ayar formları, seçtiğin giriş sağlayıcısı (Google ya da Apple), uygulama içi etkileşimler, cihazın bildirim servisi ve mikrofon aracılığıyla elektronik ortamda, otomatik ya da kısmen otomatik yollarla toplanır; her veri için hukuki sebep 3. bölümdeki tabloda verilmiştir.

## 2. Kimler için hangi hukuk

- **Türkiye'deki kullanıcılar:** KVKK ve ikincil mevzuatı (Aydınlatma Yükümlülüğü Tebliği, Veri Sorumlusuna Başvuru Tebliği, yurt dışına aktarım usulleri).
- **AB/AEA'daki kullanıcılar:** Veri sorumlusu Almanya'da yerleşik olduğundan GDPR m.3(1) gereği GDPR ve Alman veri koruma mevzuatı (BDSG); Birleşik Krallık'ta ayrıca UK GDPR ve Data Protection Act 2018. Bu politikadaki hukuki dayanaklar GDPR m.6 ile eşlenmiştir. Veri sorumlusu Birlik içinde yerleşik olduğu için GDPR m.27 kapsamında ayrıca bir AB temsilcisi atanması gerekmez.
- **Diğer ülkeler:** Yerel veri koruma hukukundan doğan haklar saklıdır (10. bölüm). Lernomi kişisel verini satmaz ve davranışsal reklam için paylaşmaz.

## 3. Hangi veriler, neden işleniyor

| Veri | Nereden | Amaç | Hukuki dayanak (KVKK / GDPR) | Saklama |
|---|---|---|---|---|
| E-posta adresi, ad, parola özeti | Kayıt formu ya da giriş için seçtiğin Google veya Apple hesabın | Hesap açma, giriş, parola sıfırlama, doğrulama e-postası | Sözleşmenin kurulması ve ifası (m.5/2-c / m.6(1)(b)) | Hesap süresince |
| Misafir kimliği: rastgele bir kullanıcı kimliği ve oturum jetonu (e-posta, ad ya da parola alınmaz) | Uygulama, "Hesapsız devam et"e dokunduğunda | Uygulamayı hesapsız kullanırken ilerlemeni sunucuda tutmak; hesap oluşturur ya da hesabına girersen ilerlemeni hesabına geçirmek | Sözleşmenin kurulması ve ifası (m.5/2-c / m.6(1)(b)) | {{sessionMaxDays}} gün kullanılmazsa en geç 7 gün içinde silinir; var olan bir hesaba birleşince ya da eklememeyi seçince hemen silinir; e-postayla hesap oluşturunca hesabın kendisi olur |
| Görünen ad, avatar seçimi, seviye, kurs, günlük hedef, ses tercihi | Sen | Kişiselleştirme; görünen ad haftalık sıralamada diğer kullanıcılara görünür | Sözleşmenin ifası | Hesap süresince |
| Öğrenme verisi: kelime durumu, tekrar sonuçları, seri, XP, başarımlar, konuşma ve sınav sonuçları | Uygulamayı kullanırken | Aralıklı tekrar planı, ilerleme, sıralama | Sözleşmenin ifası | Hesap süresince |
| Yazdığın ve söylediğin metinler (yazma görevleri, konuşma pratiği, sınav cevapları) | Sen | Yapay zekâ ile değerlendirme, geri bildirim ve konuşma pratiğindeki yanıtlar | Dil modeli sağlayıcılarına gönderim için açık rıza (m.5/1 / m.6(1)(a)): uygulama içi izin ekranı, geri alınabilir. Sonuçların hesabında tutulması için sözleşmenin ifası | Değerlendirmeler hesap süresince; konuşma pratiği kayıtları {{speechLogDays}} gün |
| Sunucuya giden mikrofon ses kaydı | Mikrofon: ekran kapalıyken ya da telefon cebindeyken yürüyüş modu; web'de ayrıca telaffuz puanı ve sınavlardaki konuşma cevapları | Söylediğini yazıya çevirmek ve telaffuzunu puanlamak | Açık rıza (m.5/1 / m.6(1)(a)); uygulama içi izin ekranı, geri alınabilir | Saklanmaz; tanıma biter bitmez silinir, yalnız tanınan metin tutulur |
| Kullanım olayları: hangi ekran açıldı, tur başladı/bitti, ekran genişliği ve platform | Uygulama | Ürünü iyileştirme (birinci taraf analitik) | Meşru menfaat (m.5/2-f / m.6(1)(f)); ayarlardan kapatılabilir | Hesap süresince |
| IP adresi ve tarayıcı/cihaz tanımı (oturum kaydında) | Bağlantın | Oturum güvenliği, kötüye kullanım ve hız sınırı | Meşru menfaat (güvenlik) | Oturum süresince (en çok {{sessionMaxDays}} gün) |
| Sosyal profil: kullanıcı adı, görünürlük ve istek tercihleri | Sen | Arkadaşların ve (görünürlük "herkese açık" ise) diğer kullanıcıların seni bulması | Sözleşmenin ifası; tercihler için rıza | Hesap süresince |
| Arkadaşlık istekleri, arkadaş listesi, engellemeler, kullanıcı bildirimleri | Sen ve arkadaşların | Arkadaşlık özellikleri, güvenlik ve moderasyon | Sözleşmenin ifası; meşru menfaat (güvenlik) | Hesap süresince; bildirimler inceleme kapanana kadar |
| Etkinlik akışı, tepkiler, dürtmeler, ortak görevler, gelen kutusu bildirimleri | Uygulamayı kullanırken | Arkadaşlarınla ilerleme paylaşımı ve motivasyon (yalnız arkadaşlarına görünür) | Sözleşmenin ifası; "etkinliğimi göster" tercihiyle kapatılabilir | Hesap süresince |
| Web push aboneliği (tarayıcı uç noktası ve şifreleme anahtarları) | Tarayıcın, izin verirsen | Web'de hatırlatma bildirimleri | Rıza (tarayıcı izni) | İzin geri alınana ya da uç nokta geçersizleşene kadar |
| Hatırlatma tercihleri: günlük hatırlatma, seri koruma ve haftalık sınav anahtarları, hatırlatma saati, saat dilimi | Sen (saat dilimi, web'de bildirimleri açtığında tarayıcından alınır) | Hatırlatmaları yerel saatine göre göndermek ve tercihini bütün cihazlarında aynı tutmak | Sözleşmenin ifası | Hesap süresince |
| Mobil bildirim jetonu ve platform (Android/iOS) | Cihazın, bildirimlere izin verirsen | Hatırlatmaları ve arkadaşlık bildirimlerini (istek, dürtme, ortak görev) telefonuna iletmek; iletimi Firebase Cloud Messaging yapar | Rıza (işletim sisteminin bildirim izni) | Çıkış yapana ya da jeton geçersizleşene kadar; hesap silinince hemen silinir |
| Yapay zekâ ve ses izni kararların (amaç, karar, tarih, metin sürümü, platform) | Sen (izin ekranı, Ayarlar › Gizlilik) | İznin verildiğini ya da geri alındığını gösterebilmek | Hukuki yükümlülük (m.5/2-ç / m.6(1)(c) ve GDPR m.7(1)) | Hesap süresince |
| Satın alma ve abonelik durumu | Uygulama mağazası / RevenueCat | Premium özellikleri açmak | Sözleşmenin ifası; yasal yükümlülük (muhasebe) | Hesap süresince; mali kayıtlar yasal süre boyunca |
| İçerik bildirimlerin | Sen ("Bildir") | Uygunsuz yapay zekâ yanıtlarını incelemek | Meşru menfaat (güvenli hizmet) | İnceleme kapanana kadar |
| Yazdığın destek ve hak talepleri | Sen | Talebi cevaplamak, yasal kayıt | Yasal yükümlülük (KVKK m.13, GDPR m.12) | Talep kapandıktan sonra 2 yıl |

**Hesapsız (misafir) kullanım:** Hesap oluşturmadan kullanırsan yukarıdaki öğrenme verisi, kişiselleştirme tercihleri, kullanım olayları ve oturum kaydı hesap yerine misafir kimliğine bağlı işlenir. Misafirde sosyal özellikler, sunucudaki ses tanımaya gönderim, bildirim jetonu ve satın alma yoktur; hatırlatmalar yalnız cihazında kurulur ve sunucuya yazılmaz. Yapay zekâya gönderim misafir kimliği başına tek bir yazma ya da konuşma değerlendirmesiyle sınırlıdır ve hesaptaki gibi ancak açık rızanla yapılır (5. bölüm); rıza kararın misafir kimliğine yazılır ve Ayarlar › Gizlilik'ten geri alınabilir. Misafir kimliğinin jetonu yalnız cihazının güvenli deposunda (iOS Anahtar Zinciri, Android Keystore) saklanır ve yalnız oturumunu sürdürmek ya da geri kurmak ve ilerlemeni bir hesaba geçirmek için kullanılır. E-postayla hesap oluşturursan misafir kimliği hesabının kendisi olur (e-posta adresini doğrulayana kadar misafir olarak kalır). Sosyal girişle hesap oluşturursan misafir ilerlemen hesabına taşınır. Var olan ve içinde ilerleme bulunan bir hesaba girersen ilerlemeyi eklemek isteyip istemediğin sorulur: eklersen hesabındaki ilerlemeyle birleşir (aynı kelimede, derste ya da alıştırmada en ileri durum ve toplam emek korunur, hesabının ayarları geçerli kalır), eklemezsen misafir verileri silinir; iki durumda da misafir kimliği silinir.

**Toplanmayanlar:** konum, rehber, takvim, fotoğraf, reklam kimliği, donanım kimlikleri (IMEI, seri numarası gibi), çökme raporu, özel nitelikli kişisel veri. Toplanan cihaz tanımlayıcıları yalnız yukarıdaki mobil bildirim jetonu ve web push aboneliğidir; ikisi de yalnız bildirim göndermek için kullanılır. Lernomi reklam göstermez, üçüncü taraf analitik ya da takip SDK'sı içermez, veri satmaz.

## 4. Mikrofon ve ses kayıtları

Mikrofon yalnız konuşarak cevap verdiğin yerlerde ve sen başlattığında açılır: yürüyüş modu, derslerdeki ve konuşma alıştırmalarındaki sesli cevaplar, sınavların konuşma bölümleri ve rol yapma. Yürüyüş modunda ipucunu kendi dilinde duyar, öğrendiğin dildeki karşılığını söylersin.

Mobil uygulamada ekran açıkken tanıma, cihazın kendi konuşma tanıma servisiyle yapılır; web'de tarayıcının konuşma tanıma servisi kullanılır. Bu servisin sesi cihazda mı işlediği yoksa işletim sistemi ya da tarayıcı sağlayıcısının (Google ya da Apple gibi) sunucularına mı gönderdiği cihaza, tarayıcıya, dile ve ayarlara göre değişir ve o sağlayıcının kendi şartlarına tabidir; bu yol Lernomi sunucusundan geçmez.

Ses Lernomi sunucusuna yalnız şu hâllerde ve yalnız izin verdiysen gider: ekran kapalıyken ya da telefon cebindeyken yürüyüş modu; web'de ayrıca telaffuz puanı ve sınavlardaki konuşma cevaplarının yazıya çevrilmesi. Kayıt kısa bir ses parçası olarak gönderilir ve aşağıdaki konuşma tanıma sağlayıcılarından birine iletilir. Ses dosyası sunucuda ya da sağlayıcıda saklanmaz; yalnız tanınan metin, beklenen kelime ve klip süresi kullanım kaydına yazılır.

- Yürüyüş modunda mikrofon, modu uygulamadan durdurana kadar açık kalır; Android'de bu süre boyunca sürekli bir bildirim görünür. Öteki ekranlarda mikrofon yalnız cevabını söylediğin süre açıktır.
- Ekran kapalıyken kayıt, işletim sisteminin bu iş için öngördüğü arka plan yoluyla yapılır: Android'de mikrofon tipli ön plan servisi{{ifIos}}, iOS'ta arka plan ses oturumu{{/ifIos}}. Sistemin mikrofon göstergesi açık kalır.
- Ses sunucuya gitmeden önce bu işlemi anlatan ve sesin gidebileceği konuşma tanıma sağlayıcılarını adıyla sayan bir izin ekranı gösterilir; yürüyüş modunda bu ekran mikrofon onayıdır ve onaylamadan mod başlamaz. İznin olmadan ses sunucuya gönderilmez. İzin vermezsen sunucuya dayanan özellikler (ekran kapalı yürüyüş; web'de telaffuz puanı ve sınavlardaki sesli cevapların yazıya çevrilmesi) çalışmaz, uygulamanın geri kalanı çalışır.
- Tanıma sonucunda küfür maskelenir.

### Açık rıza metni (ses)

Yürüyüş modunda "Kabul ediyorum, başla"ya ya da ses izni ekranında "İzin ver ve devam et"e bastığında şu beyanı vermiş olursun: "Mikrofon kayıtlarımın, söylediğimi yazıya çevirmek ve telaffuzumu puanlamak amacıyla Lernomi sunucusuna ve izin ekranında adları gösterilen, bu politikanın 6. bölümünde de listelenen, bir kısmı yurt dışında bulunan konuşma tanıma sağlayıcılarına aktarılmasına; kaydın işlem biter bitmez silinmesine açık rıza veriyorum. Bu rızayı Ayarlar › Gizlilik bölümünden dilediğim an geri alabileceğimi biliyorum."

## 4a. Sosyal özellikler ve görünürlük

- Görünen adın haftalık sıralamada tüm kullanıcılara görünür; sıralamaya girmek istemiyorsan görünen adını boş bırakabilirsin ("Öğrenci" olarak görünürsün).
- Sosyal profilin (kullanıcı adı, seviye, seri) varsayılan olarak **herkese açık**tır; Ayarlar › Sosyal'den "yalnız arkadaşlar" ya da "gizli" yapabilir, arkadaşlık isteklerini ve önerilerde görünmeyi kapatabilirsin.
- Etkinlik akışı (tur tamamlama, seri kilometre taşı) yalnız arkadaşlarına görünür; "etkinliğimi göster" ile kapatılır.
- Bir kullanıcıyı engellediğinde iki taraf birbirini görmez; bildirdiğinde kayıt insan tarafından incelenir. Engelleme ve bildirim kayıtları karşı tarafa gösterilmez.
- Lernomi'de özel mesajlaşma yoktur; etkileşim yalnız tepkiler, dürtmeler ve ortak görevlerle olur.

## 4b. Otomatik karar verme ve profilleme

Aralıklı tekrar planı, günlük tur içeriği, seviye önerisi ve haftalık sıralama öğrenme verinden otomatik hesaplanır. Bunlar ürün işleyişinin parçasıdır, seni kapsamlı biçimde profillemez ve hakkında hukuki ya da benzer ölçüde önemli bir sonuç doğurmaz (GDPR m.22 kapsamına giren bir karar yoktur). Seviye önerisini istediğin zaman kendin değiştirebilirsin.

## 5. Yapay zekâ ile işlenen metinler

Konuşma pratiği (rol yapma), yazma görevleri ve sınav cevapların, izin verdiysen, geri bildirim üretmek için dil modeli sağlayıcılarına gönderilir. Gönderilen şey yalnız senin yazdığın/söylediğin metin ve konuşmanın senaryosudur; ad ya da e-posta gönderilmez. Sağlayıcılar, verileri model eğitiminde kullanmamayı taahhüt eden API şartlarıyla ve veri işleme sözleşmeleriyle çalışır. Yapay zekâ karakterlerinin gerçek kişi olmadığı uygulamada açıkça belirtilir (AB Yapay Zekâ Tüzüğü m.50 şeffaflık). Yanıtlar hata içerebilir; her yanıtın altındaki "Bildir" ile bildirebilirsin, bildirimler insan tarafından incelenir. Lernomi hakkında yalnız otomatik işlemeye dayanan, hukuki sonuç doğuran bir karar vermez.

**İzin:** Metin bir sağlayıcıya ilk kez gitmeden önce, neyin gönderileceğini ve hangi sağlayıcılara gidebileceğini adıyla gösteren bir izin ekranı açılır. "İzin ver ve devam et"e basmadan metnin hiçbir sağlayıcıya gitmez; bu kural uygulamada değil sunucuda uygulanır, yani uygulamanın eski bir sürümü ya da başka bir cihaz da izni atlayamaz. İzin vermezsen alıştırmalar yapay zekâsız sürer: konuşmalar senaryoyla ilerler, yazma ve sınav cevapları kural tabanlı bir tahminle değerlendirilir ya da puansız kalır. Kararın hesabına tarih ve metin sürümüyle kaydedilir ve bütün cihazlarında geçerlidir; Ayarlar › Gizlilik'ten istediğin an değiştirebilirsin. Alıcı listesi değişirse izin yeniden istenir.

### Açık rıza metni (yapay zekâ)

İzin ekranında "İzin ver ve devam et"e bastığında şu beyanı vermiş olursun: "Yazdığım ve söyleyip yazıya çevrilen metinlerin, görevin kendisiyle birlikte, değerlendirme, geri bildirim ve konuşma karakterinin cevabını üretmek amacıyla izin ekranında adları gösterilen ve bu politikanın 6. bölümünde listelenen, bir kısmı yurt dışında bulunan dil modeli sağlayıcılarına aktarılmasına açık rıza veriyorum. Bu rızayı Ayarlar › Gizlilik bölümünden dilediğim an geri alabileceğimi biliyorum."

## 6. Verinin ulaştığı hizmet sağlayıcılar ve yurt dışına aktarım

Aşağıdaki sağlayıcılar yalnız belirtilen amaçla ve yalnız o iş için gereken veriyle çalışır; hiçbiri veriyi kendi amaçları için kullanamaz. Sunucular Almanya'dadır. Türkiye'den AB'ye ve AB'den ABD/Birleşik Krallık'a yapılan aktarımlarda kullanılan güvence son sütundadır: KVKK m.9 kapsamında Kurul'un ilan ettiği standart sözleşme ve GDPR Bölüm V kapsamında standart sözleşme hükümleri ya da yeterlilik kararı.

{{processorsTable}}

Verilerin kamu kurumlarına aktarımı yalnız yasal bir zorunluluk ya da yetkili makam talebi hâlinde ve talep kapsamıyla sınırlı yapılır.

## 7. Çerezler ve yerel depolama

Web'de yalnız zorunlu oturum çerezi kullanılır (giriş yaptığını hatırlamak için, {{sessionMaxDays}} gün); bu nedenle çerez onay bandı yoktur. Pazarlama ya da takip çerezi kullanılmaz. Tarayıcı ve uygulama yerel depolamasında tema ve ses tercihleri ile yarım kalan konuşma gibi yalnız o cihaza ait bilgiler tutulur; bunlar cihazından çıkmaz. Hatırlatma tercihleri ve yapay zekâ izinleri ise bütün cihazlarında geçerli olsun diye hesabına yazılır (3. bölüm).

## 8. Ürün analitiği ve kapatma

Lernomi, hangi özelliklerin kullanıldığını anlamak için kendi sunucusuna kısa kullanım olayları yazar (ör. "tur tamamlandı"). Bu olayda ne bulunabileceği dar bir çerçeveyle sınırlı:

- Olay adları önceden belirlenmiş kapalı bir listeden gelir.
- Her olay en çok 32 karakterlik teknik bir etiket taşıyabilir ("single:artikel", "level:B1" gibi).
- Etiket yalnız harf, rakam, alt çizgi, iki nokta ve tire kabul eder. Salt rakamdan da oluşamaz. Bu yüzden bir e-posta adresi, bağlantı ya da telefon numarası taşıması mümkün değildir.
- Bunun dışında serbest metin gönderilmez ve olaylar üçüncü tarafa gitmez.

Ayarlar › Gizlilik bölümündeki "Kullanım verisi gönder" anahtarıyla bunu kapatabilirsin. Bu, KVKK ve GDPR m.21'deki itiraz hakkının karşılığıdır. Kapattığında yalnız hizmet için zorunlu kayıtlar tutulur.

## 8a. Ticari elektronik ileti

Sana yalnız hizmetle ilgili iletiler gönderilir: e-posta doğrulama, parola sıfırlama, hesap ve güvenlik bildirimleri, izin verdiğin hatırlatmalar. 6563 sayılı Kanun kapsamında ticari elektronik ileti gönderilmez; ileride pazarlama iletisi gönderilmek istenirse İleti Yönetim Sistemi (İYS) üzerinden ayrıca onayın alınır ve her iletide ret yolu bulunur.

## 9. Saklama süreleri

- Hesap ve öğrenme verisi: hesabın açık olduğu sürece; hesap silinince tümü silinir.
- Misafir verisi (hesapsız kullanım): misafir kimliğini {{sessionMaxDays}} gün kullanmazsan oturumu düşer ve veriler en geç 7 gün içinde silinir; var olan bir hesaba birleşince ya da eklememeyi seçince misafir kimliği hemen silinir, e-postayla hesap oluşturunca hesabın kendisi olur.
- Konuşma pratiği kayıtları (söylediğin cümle ve model yanıtı): {{speechLogDays}} gün, sonra kendiliğinden silinir.
- Ses kayıtları: saklanmaz.
- Mobil bildirim jetonu: çıkış yapana ya da jeton geçersizleşene kadar.
- Oturum kayıtları (IP, cihaz tanımı): oturum süresince, en çok {{sessionMaxDays}} gün.
- Mali kayıtlar (abonelik faturaları): Türk Ticaret Kanunu ve Vergi Usul Kanunu'nun öngördüğü süre (10 yıl), yalnız uygulama mağazasının (Google Play{{ifIos}} ya da App Store{{/ifIos}}) ilettiği kadarıyla.
- Hak talepleri yazışmaları: talep kapandıktan sonra 2 yıl.
- Sunucu yedekleri: silinen veriler yedeklerden en geç {{backupRetentionDays}} gün içinde düşer; yedekler yalnız felaket kurtarma için kullanılır, silinen hesap yedekten geri yüklenmez.

## 10. Hakların

KVKK m.11 ve GDPR m.15-22 uyarınca şunları isteyebilirsin:

- Verilerinin işlenip işlenmediğini öğrenmek, bilgi istemek ve bir kopyasını makine tarafından okunabilir biçimde almak (erişim ve taşınabilirlik),
- Eksik ya da yanlış veriyi düzeltmek (ad ve tercihleri Ayarlar'dan kendin değiştirebilirsin),
- Verilerinin silinmesini ya da yok edilmesini istemek (11. bölümdeki hesap silme yolu),
- İşlemenin kısıtlanmasını istemek ve meşru menfaate dayanan işlemeye itiraz etmek (analitik anahtarı),
- Açık rızanı geri almak (yapay zekâ ve ses izinleri ile mikrofon onayı Ayarlar › Gizlilik'te; geri alma önceki işlemenin hukukiliğini etkilemez),
- Verilerin üçüncü kişilere aktarılması hâlinde düzeltme ve silmenin onlara bildirilmesini istemek,
- Zarara uğraman hâlinde tazminat talep etmek.

**Başvuru:** KVKK kapsamındaki talepler için {{privacyEmailTr}}, GDPR ve UK GDPR kapsamındaki talepler için {{privacyEmailEu}} adresine yaz; kimliğini doğrulamak için hesabındaki e-posta adresinden yazman yeterlidir. Türkiye'de KVKK Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca ıslak imzalı yazılı başvuru, güvenli elektronik imzalı başvuru ya da hesabında kayıtlı e-posta adresinden başvuru da yapılabilir. Talepler en geç 30 gün içinde ücretsiz sonuçlandırılır; GDPR kapsamında bu süre gerekirse iki ay uzatılabilir ve sana bildirilir.

**Şikâyet:** Türkiye'de Kişisel Verileri Koruma Kurulu'na (kvkk.gov.tr). AB'de veri sorumlusunun yetkili denetim otoritesi, yerleşim yerine göre Kuzey Ren-Vestfalya Eyalet Veri Koruma ve Bilgi Edinme Görevlisi'dir (LDI NRW). GDPR m.77 uyarınca kendi ülkendeki otoriteye de başvurabilirsin. Birleşik Krallık'ta ICO. Şikâyetten önce veri sorumlusuna yazman yeterli olabilir; taleplerin çoğu doğrudan çözülür.

## 11. Hesabını ve verilerini silme

Hesabını iki yoldan silebilirsin: uygulamada **Profil › Ayarlar › Hesap › Hesabı sil**, ya da web'de [www.lernomi.app/account/delete]({{link:deleteAccount}}). Silme anında hesabın, ilerlemen, yazıların, konuşma kayıtların, kullanım olayların ve sosyal izlerin (arkadaşlıklar, tepkiler) kalıcı olarak silinir; geri alınamaz. Yasal saklama yükümlülüğü olan mali kayıtlar anonimleştirilerek tutulur. Mağaza aboneliğin varsa onu aldığın mağaza üzerinden ayrıca iptal etmen gerekir.

Hesapsız (misafir) kullanıyorsan verilerini uygulamada **Profil › Misafir verilerini sil** ile silebilirsin: misafir kimliği ve bütün ilerlemen sunucudan ve cihazından kalıcı olarak silinir.

## 12. Çocuklar

Lernomi 18 yaşından küçükler için tasarlanmamıştır ve onlardan bilerek veri toplamaz; kullanım şartları hesap açmayı 18 yaş ve üzeriyle sınırlar (bkz. şartlar §3). İçerik yetişkin öğrencilere ve resmî dil sınavı hazırlığına yöneliktir; uygulamada açık uçlu yapay zekâ konuşması ve kullanıcı etkileşimi bulunduğundan çocuk kitlesine uygun değildir. 18 yaşından küçük birinin hesap açtığı fark edilirse hesap ve veriler silinir; ebeveynler {{privacyEmailTr}} adresine yazabilir.

## 13. Güvenlik

Tüm bağlantılar HTTPS ile şifrelenir. Parolalar geri döndürülemez özet olarak saklanır. Sunucuya erişim anahtarla sınırlıdır; giriş denemeleri hız sınırına tabidir. Hesap silme gibi yıkıcı işlemler parola ya da yeni bir oturum ister. Kişisel verileri etkileyen bir ihlalde KVKK (72 saat içinde Kurul'a) ve GDPR m.33-34 uyarınca bildirim yapılır ve sen bilgilendirilirsin.

## 14. Değişiklikler

Politika değiştiğinde bu sayfadaki yürürlük tarihi ve sürüm güncellenir; işleme amaçlarını genişleten bir değişiklikte uygulama içinde bilgilendirme yapılır ve gerekiyorsa yeniden onay istenir. Sorular için: {{privacyEmailTr}}.`,
  },
  en: {
    title: "Privacy Policy",
    description: "What data Lernomi processes, why and for how long; your rights under GDPR and Turkish data protection law; deleting your account.",
    summary: [
      "Lernomi is a language learning app: German, Zurich German and English.",
      "Your e-mail and name are processed to run your account, and your progress data to track your learning.",
      "What you write and say is sent to AI providers only after you allow it in the app; the consent screen names the providers.",
      "The microphone opens only when you answer by speaking. Audio reaches the server only with your permission, and the recording is not kept.",
      "No ads, no advertising identifier, no third-party tracking.",
      "You can delete your account at any time, from the app or the web.",
      "GDPR rights in Europe, KVKK rights in Türkiye.",
    ],
    body: `## 1. Data controller

The controller of the personal data covered by this policy, within the meaning of Turkish Law no. 6698 on the Protection of Personal Data (KVKK) and the European Union General Data Protection Regulation (GDPR), is the person identified below: they decide what data is processed for what purpose, how long it is kept and which providers it goes to. The policy covers the Lernomi web app (www.lernomi.app) and {{platforms}}.

{{entityBlock:controller:contact}}

The app is published in the app stores and the subscription revenue is collected by a different person. The publisher processes no personal data except on the controller's instructions; for the order, subscription and review data they access through the Play Console{{ifIos}} and App Store Connect{{/ifIos}} they act as a **processor**, and a processing agreement between the parties covers this (Art. 28 GDPR, Art. 12 KVKK).

{{entityBlock:publisher}}

The servers run on {{hosting}}; the data is stored there. The controller is not established in Türkiye; for applications made from Türkiye and for correspondence with the Turkish authority, the representative identified above has been designated. Designating a representative does not remove the controller's own responsibility.

**Collection method and legal ground (KVKK Art. 10):** Data is collected electronically, by automated or partly automated means, through registration and settings forms, the sign-in provider you choose (Google or Apple), in-app interactions, your device's notification service and the microphone; the legal ground for each item is given in the table in section 3.

## 2. Which law applies to whom

- **Users in Türkiye:** KVKK and its secondary legislation (Communiqué on the Obligation to Inform, Communiqué on Applications to the Data Controller, rules on transfers abroad).
- **Users in the EU/EEA:** because the controller is established in Germany, the GDPR applies by virtue of Art. 3(1) GDPR, together with German data protection law (BDSG); in the United Kingdom, the UK GDPR and the Data Protection Act 2018 also apply. The legal grounds in this policy are mapped to Art. 6 GDPR. As the controller is established within the Union, no separate EU representative under Art. 27 GDPR is required.
- **Other countries:** rights under local data protection law are reserved (section 10). Lernomi does not sell your personal data and does not share it for behavioural advertising.

## 3. What data is processed and why

| Data | Source | Purpose | Legal ground (KVKK / GDPR) | Retention |
|---|---|---|---|---|
| E-mail address, name, password hash | Registration form, or the Google or Apple account you sign in with | Account creation, sign-in, password reset, verification e-mail | Conclusion and performance of a contract (Art. 5/2-c / Art. 6(1)(b)) | For the life of the account |
| Guest identity: a random user ID and session token (no e-mail, name or password is collected) | The app, when you tap "Continue without an account" | Keeping your progress on the server while you use the app without an account; moving it into your account if you create one or sign in | Conclusion and performance of a contract (Art. 5/2-c / Art. 6(1)(b)) | Deleted within 7 days after {{sessionMaxDays}} days without use; deleted immediately when combined with an existing account or when you choose not to add it; becomes your account itself when you create one with e-mail |
| Display name, avatar choice, level, course, daily goal, voice preference | You | Personalisation; the display name is visible to other users on the weekly leaderboard | Performance of a contract | For the life of the account |
| Learning data: word state, review results, streak, XP, achievements, speaking practice and exam results | While you use the app | Spaced repetition schedule, progress, leaderboard | Performance of a contract | For the life of the account |
| Texts you write and say (writing tasks, speaking practice, exam answers) | You | AI assessment, feedback and replies in speaking practice | Explicit consent for sending to language model providers (Art. 5/1 / Art. 6(1)(a)): in-app consent screen, revocable. Performance of a contract for keeping the results in your account | Assessments for the life of the account; speaking practice logs for {{speechLogDays}} days |
| Microphone audio sent to the server | The microphone: walk mode with the screen off or the phone in your pocket; on the web also pronunciation scores and spoken answers in exams | Transcribing what you said and scoring your pronunciation | Explicit consent (Art. 5/1 / Art. 6(1)(a)); in-app consent screen, revocable | Not kept; deleted as soon as recognition finishes, only the recognised text is retained |
| Usage events: which screen opened, round started/finished, screen width and platform | The app | Improving the product (first-party analytics) | Legitimate interest (Art. 5/2-f / Art. 6(1)(f)); can be switched off in settings | For the life of the account |
| IP address and browser/device description (in the session record) | Your connection | Session security, abuse prevention and rate limiting | Legitimate interest (security) | For the life of the session (at most {{sessionMaxDays}} days) |
| Social profile: username, visibility and request preferences | You | Letting your friends and, if visibility is "public", other users find you | Performance of a contract; consent for the preferences | For the life of the account |
| Friend requests, friend list, blocks, user reports | You and your friends | Friend features, safety and moderation | Performance of a contract; legitimate interest (safety) | For the life of the account; reports until the review closes |
| Activity feed, reactions, nudges, shared quests, inbox notifications | While you use the app | Sharing progress with your friends and motivation (visible only to your friends) | Performance of a contract; can be switched off with the "show my activity" preference | For the life of the account |
| Web push subscription (browser endpoint and encryption keys) | Your browser, if you allow it | Reminder notifications on the web | Consent (browser permission) | Until the permission is withdrawn or the endpoint expires |
| Reminder preferences: daily reminder, streak protection and weekly exam toggles, reminder time, time zone | You (the time zone is taken from your browser when you turn on notifications on the web) | Sending reminders at your local time and keeping your choice the same on all your devices | Performance of a contract | For the life of the account |
| Mobile notification token and platform (Android/iOS) | Your device, if you allow notifications | Delivering reminders and friend notifications (requests, nudges, shared quests) to your phone; delivery is handled by Firebase Cloud Messaging | Consent (the operating system's notification permission) | Until you sign out or the token expires; deleted immediately when the account is deleted |
| Your AI and voice consent decisions (purpose, decision, date, text version, platform) | You (consent screen, Settings › Privacy) | Being able to show that consent was given or withdrawn | Legal obligation (Art. 5/2-ç / Art. 6(1)(c) and Art. 7(1) GDPR) | For the life of the account |
| Purchase and subscription state | App store / RevenueCat | Unlocking Premium features | Performance of a contract; legal obligation (accounting) | For the life of the account; financial records for the statutory period |
| Your content reports | You ("Report") | Reviewing inappropriate AI answers | Legitimate interest (a safe service) | Until the review closes |
| Support messages and rights requests you send | You | Answering the request, statutory record | Legal obligation (KVKK Art. 13, GDPR Art. 12) | 2 years after the request closes |

**Using the app without an account (guest):** If you use the app without creating an account, the learning data, personalisation preferences, usage events and session record described above are processed under a guest identity instead of an account. Guests have no social features, nothing is sent to server-side speech recognition, and there is no notification token and no purchase; reminders are set up only on your device and are not written to the server. Sending text to AI is limited to a single writing or speaking assessment per guest identity and, as with an account, happens only with your explicit consent (section 5); your consent decision is recorded under the guest identity and can be withdrawn under Settings › Privacy. The guest identity's token is stored only in your device's secure storage (iOS Keychain, Android Keystore) and used only to keep or restore your session and to move your progress into an account. If you create an account with e-mail, the guest identity becomes your account itself (it stays a guest until you verify your e-mail address). If you create an account with a social sign-in, your guest progress moves into it. If you sign in to an existing account that already has progress, you are asked whether to add this progress: if you add it, it is combined with that account's progress (for the same word, lesson or exercise the most advanced state and the total effort are kept, and your account's settings stay in force); if you don't, the guest data is deleted; in both cases the guest identity is deleted.

**What is not collected:** location, contacts, calendar, photos, advertising identifier, hardware identifiers (such as IMEI or serial number), crash reports, special categories of personal data. The only device identifiers collected are the mobile notification token and the web push subscription above; both are used solely to deliver notifications. Lernomi shows no ads, contains no third-party analytics or tracking SDK, and sells no data.

## 4. Microphone and audio recordings

The microphone opens only where you answer by speaking, and only when you start it: walk mode, spoken answers in lessons and speaking practice, the speaking parts of exams, and roleplay. In walk mode you hear a prompt in your own language and say the word in the language you are learning.

In the mobile app, while the screen is on, recognition is performed by the device's own speech recognition service; on the web, the browser's speech recognition service is used. Whether that service processes the audio on the device or sends it to the servers of the operating system or browser provider (such as Google or Apple) depends on the device, the browser, the language and the settings, and is governed by that provider's own terms; this path does not go through the Lernomi server.

Audio reaches the Lernomi server only in the following cases, and only if you have given permission: walk mode with the screen off or the phone in your pocket; and on the web, pronunciation scores and transcribing spoken answers in exams. The recording is sent as a short audio clip and passed to one of the speech recognition providers listed below. The audio file is not stored on the server or at the provider; only the recognised text, the expected word and the clip length are written to the usage record.

- In walk mode the microphone stays open until you stop the mode in the app; on Android a persistent notification is shown during that time. On other screens the microphone is open only while you say your answer.
- While the screen is off, recording runs through the background mechanism the operating system provides for this: a microphone-type foreground service on Android{{ifIos}}, a background audio session on iOS{{/ifIos}}. The system microphone indicator stays on.
- Before audio is sent to the server, a consent screen explains this processing and names the speech recognition providers the audio may go to; in walk mode this screen is the microphone consent, and the mode does not start without it. Without your permission no audio is sent to the server. If you decline, the features that rely on the server (walk mode with the screen off; on the web, pronunciation scores and transcribing spoken answers in exams) do not work, and the rest of the app does.
- Profanity is masked in the recognition result.

### Explicit consent text (voice)

When you press "I agree, start" in walk mode, or "Allow and continue" on the voice consent screen, you give the following declaration: "I give my explicit consent to my microphone recordings being transferred to the Lernomi server and to the speech recognition providers named on the consent screen and listed in section 6 of this policy, some of which are located abroad, for the purpose of transcribing what I said and scoring my pronunciation; and to the recording being deleted as soon as the operation finishes. I know that I can withdraw this consent at any time under Settings › Privacy."

## 4a. Social features and visibility

- Your display name is visible to all users on the weekly leaderboard; if you do not want to appear there, you can leave your display name empty (you then appear as "Learner").
- Your social profile (username, level, streak) is **public** by default; under Settings › Social you can set it to "friends only" or "private", and turn off friend requests and appearing in suggestions.
- The activity feed (round completion, streak milestone) is visible only to your friends; it is turned off with "show my activity".
- When you block a user, neither side sees the other; when you report someone, the record is reviewed by a human. Block and report records are not shown to the other party.
- Lernomi has no private messaging; interaction happens only through reactions, nudges and shared quests.

## 4b. Automated decision-making and profiling

The spaced repetition schedule, the content of the daily round, the level suggestion and the weekly leaderboard are computed automatically from your learning data. These are part of how the product works; they do not profile you comprehensively and produce no legal or similarly significant effect for you (there is no decision within the scope of Art. 22 GDPR). You can change the suggested level yourself at any time.

## 5. Texts processed by AI

If you have given permission, your speaking practice (roleplay), writing tasks and exam answers are sent to language model providers in order to generate feedback. What is sent is only the text you wrote or said and the scenario of the speaking practice; your name and e-mail are not sent. The providers operate under API terms and data processing agreements in which they undertake not to use the data for model training. The app states clearly that AI characters are not real people (transparency under Art. 50 of the EU AI Act). Answers can contain mistakes; you can flag them with the "Report" button under each answer, and reports are reviewed by a human. Lernomi makes no decision about you that is based solely on automated processing and produces a legal effect.

**Permission:** Before any text goes to a provider for the first time, a consent screen shows what will be sent and names the providers it may go to. Until you press "Allow and continue", your text goes to no provider; this rule is enforced on the server, not in the app, so an older app version or another device cannot bypass it. If you decline, practice continues without AI: conversations follow a script, and writing and exam answers get a rule-based estimate or stay unscored. Your decision is saved to your account with its date and text version and applies on all your devices; you can change it at any time under Settings › Privacy. If the list of recipients changes, you are asked again.

### Explicit consent text (AI)

When you press "Allow and continue" on the consent screen you give the following declaration: "I give my explicit consent to the texts I write, and the texts transcribed from what I say, being transferred together with the task itself to the language model providers named on the consent screen and listed in section 6 of this policy, some of which are located abroad, for the purpose of producing assessments, feedback and the conversation character's replies. I know that I can withdraw this consent at any time under Settings › Privacy."

## 6. Service providers that receive data, and transfers abroad

The providers below work only for the stated purpose and only with the data that task requires; none of them may use the data for their own purposes. The servers are in Germany. The safeguard used for transfers from Türkiye to the EU and from the EU to the USA/United Kingdom is in the last column: the standard contract published by the Turkish Board under KVKK Art. 9, and standard contractual clauses or an adequacy decision under Chapter V GDPR.

{{processorsTable}}

Data is transferred to public authorities only where there is a legal obligation or a request from a competent authority, and only within the scope of that request.

## 7. Cookies and local storage

On the web only the strictly necessary session cookie is used (to remember that you are signed in, for {{sessionMaxDays}} days); for that reason there is no cookie consent banner. No marketing or tracking cookies are used. Browser and app local storage holds device-specific things like theme and sound preferences and an unfinished speaking practice; these never leave your device. Reminder preferences and AI permissions, by contrast, are saved to your account so that they apply on all your devices (section 3).

## 8. Product analytics and switching them off

To understand which features are used, Lernomi writes short usage events to its own server (e.g. "round completed"). What such an event may contain is tightly bounded:

- Event names come from a closed, predefined list.
- Each event may carry a technical label of at most 32 characters (such as "single:artikel" or "level:B1").
- The label accepts only letters, digits, underscore, colon and hyphen, and cannot consist of digits alone. It therefore cannot hold an e-mail address, a link or a phone number.
- Nothing else is sent as free text, and the events go to no third party.

You can switch this off with the "Send usage data" toggle under Settings › Privacy. This is the right to object under KVKK and Art. 21 GDPR. Once it is off, only the records strictly necessary for the service are kept.

## 8a. Commercial electronic messages

You receive only service-related messages: e-mail verification, password reset, account and security notices, and the reminders you allowed. No commercial electronic messages within the meaning of Turkish Law no. 6563 are sent; if marketing messages are ever sent, your separate consent will first be obtained through the Turkish Message Management System (İYS) and every message will carry an opt-out.

## 9. Retention periods

- Account and learning data: as long as the account exists; when the account is deleted, all of it is deleted.
- Guest data (use without an account): if you do not use the guest identity for {{sessionMaxDays}} days, its session expires and the data is deleted within 7 days at the latest; when combined with an existing account or when you choose not to add it, the guest identity is deleted immediately; when you create an account with e-mail, it becomes your account itself.
- Speaking practice logs (the sentence you said and the model's reply): {{speechLogDays}} days, then deleted automatically.
- Audio recordings: not kept.
- Mobile notification token: until you sign out or the token expires.
- Session records (IP, device description): for the life of the session, at most {{sessionMaxDays}} days.
- Financial records (subscription invoices): the period required by the Turkish Commercial Code and the Tax Procedure Law (10 years), and only to the extent the app store (Google Play{{ifIos}} or the App Store{{/ifIos}}) passes them on.
- Correspondence about rights requests: 2 years after the request closes.
- Server backups: deleted data drops out of the backups within {{backupRetentionDays}} days at the latest; backups are used only for disaster recovery, and a deleted account is never restored from a backup.

## 10. Your rights

Under KVKK Art. 11 and Art. 15-22 GDPR you may ask to:

- learn whether your data is processed, request information about it and receive a copy in a machine-readable format (access and portability),
- correct incomplete or inaccurate data (you can change your name and preferences yourself in Settings),
- have your data erased or destroyed (the account deletion route in section 11),
- restrict processing and object to processing based on legitimate interest (the analytics toggle),
- withdraw your explicit consent (the AI and voice permissions and the microphone consent, under Settings › Privacy; withdrawal does not affect the lawfulness of earlier processing),
- request that corrections and erasure be notified to third parties to whom the data was transferred,
- claim compensation if you suffer damage.

**Making a request:** write to {{privacyEmailEu}} for requests under the GDPR or UK GDPR, or to {{privacyEmailTr}} for requests under Turkish data protection law (KVKK); writing from the e-mail address on your account is enough to verify your identity. In Türkiye, under the Communiqué on the Procedures for Applications to the Data Controller, you may also apply in writing with a wet signature, with a qualified electronic signature, or from the e-mail address registered on your account. Requests are resolved free of charge within 30 days at the latest; under the GDPR this period may be extended by two months where necessary, and you will be told.

**Complaints:** in Türkiye to the Personal Data Protection Board (kvkk.gov.tr). In the EU the controller's competent supervisory authority is, by place of establishment, the State Commissioner for Data Protection and Freedom of Information of North Rhine-Westphalia (LDI NRW). Under Art. 77 GDPR you may also complain to the authority in your own country. In the United Kingdom, the ICO. Please write to the controller first; most requests can be resolved directly.

## 11. Deleting your account and your data

You can delete your account in two ways: in the app under **Profile › Settings › Account › Delete account**, or on the web at [www.lernomi.app/account/delete]({{link:deleteAccount}}). At the moment of deletion your account, your progress, your texts, your speaking logs, your usage events and your social traces (friendships, reactions) are permanently deleted; this cannot be undone. Financial records subject to a statutory retention obligation are kept in anonymised form. If you have a store subscription, you need to cancel it separately in the store you bought it from.

If you use the app without an account (as a guest), you can delete your data in the app under **Profile › Delete guest data**: the guest identity and all of your progress are permanently deleted from the server and from your device.

## 12. Children

Lernomi is not designed for people under 18 and does not knowingly collect data from them; the terms of use limit account creation to people aged 18 and over (see terms, clause 3). The content is aimed at adult learners and at official language exam preparation; because the app contains open-ended AI conversation and user interaction, it is not suitable for a child audience. If someone under 18 is found to have created an account, the account and the data are deleted; parents can write to {{privacyEmailEu}}.

## 13. Security

All connections are encrypted with HTTPS. Passwords are stored as irreversible hashes. Access to the server is limited to keys; sign-in attempts are rate limited. Destructive operations such as account deletion require a password or a fresh session. In the event of a breach affecting personal data the authorities are notified (in Türkiye the Board within 72 hours) under KVKK and Art. 33-34 GDPR, and you are informed.

## 14. Changes

When this policy changes, the effective date and version on this page are updated; for a change that broadens the purposes of processing you are informed in the app and, where necessary, asked for consent again. Questions: {{privacyEmailEu}}.`,
  },
  de: {
    title: "Datenschutzerklärung",
    description: "Welche Daten Lernomi verarbeitet, warum und wie lange; deine Rechte nach DSGVO und türkischem Datenschutzrecht; Konto löschen.",
    summary: [
      "Lernomi ist eine Sprachlern-App: Deutsch, Zürichdeutsch und Englisch.",
      "Deine E-Mail-Adresse und dein Name werden für dein Konto verarbeitet, deine Fortschrittsdaten für dein Lernen.",
      "Was du schreibst und sagst, geht erst an KI-Anbieter, wenn du es in der App erlaubst; der Einwilligungsbildschirm nennt die Anbieter namentlich.",
      "Das Mikrofon öffnet sich nur, wenn du sprechend antwortest. Audio geht nur mit deiner Erlaubnis an den Server, und die Aufnahme wird nicht gespeichert.",
      "Keine Werbung, keine Werbe-ID, kein Tracking durch Dritte.",
      "Du kannst dein Konto jederzeit löschen, in der App oder im Web.",
      "In Europa gelten die DSGVO-Rechte, in der Türkei die KVKK-Rechte.",
    ],
    body: `## 1. Verantwortlicher

Verantwortlicher für die von dieser Erklärung erfassten personenbezogenen Daten im Sinne des türkischen Gesetzes Nr. 6698 zum Schutz personenbezogener Daten (KVKK) und der Datenschutz-Grundverordnung der Europäischen Union (DSGVO) ist die unten bezeichnete Person. Diese Person entscheidet, welche Daten zu welchem Zweck verarbeitet, wie lange sie gespeichert und an welche Anbieter sie übermittelt werden. Die Erklärung gilt für die Lernomi-Webanwendung (www.lernomi.app) und {{platforms}}.

{{entityBlock:controller:contact}}

Die App wird von einer anderen Person in den App-Stores veröffentlicht, die auch die Abonnementeinnahmen vereinnahmt. Der Herausgeber verarbeitet personenbezogene Daten ausschließlich auf Weisung des Verantwortlichen; für die über die Play Console{{ifIos}} und App Store Connect{{/ifIos}} zugänglichen Bestell-, Abonnement- und Rezensionsdaten handelt er als **Auftragsverarbeiter**, und zwischen den Parteien besteht dazu ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO, Art. 12 KVKK).

{{entityBlock:publisher}}

Die Server laufen bei {{hosting}}; dort werden die Daten gespeichert. Der Verantwortliche ist nicht in der Türkei niedergelassen; für Anträge aus der Türkei und für die Korrespondenz mit der türkischen Behörde ist der oben genannte Vertreter benannt. Die Benennung eines Vertreters berührt die eigene Verantwortlichkeit des Verantwortlichen nicht.

**Art der Erhebung und Rechtsgrundlage (Art. 10 KVKK):** Die Daten werden elektronisch, automatisiert oder teilweise automatisiert über Registrierungs- und Einstellungsformulare, den von dir gewählten Anmeldeanbieter (Google oder Apple), Interaktionen in der App, den Benachrichtigungsdienst deines Geräts und das Mikrofon erhoben; die Rechtsgrundlage für jede Angabe steht in der Tabelle in Abschnitt 3.

## 2. Wer welchem Recht unterliegt

- **Nutzer in der Türkei:** KVKK und seine Durchführungsvorschriften (Mitteilung zur Informationspflicht, Mitteilung zu Anträgen an den Verantwortlichen, Regeln zur Übermittlung ins Ausland).
- **Nutzer in der EU/im EWR:** Da der Verantwortliche in Deutschland niedergelassen ist, gilt die DSGVO nach Art. 3 Abs. 1 DSGVO zusammen mit dem BDSG; im Vereinigten Königreich gelten zusätzlich die UK GDPR und der Data Protection Act 2018. Die Rechtsgrundlagen dieser Erklärung sind Art. 6 DSGVO zugeordnet. Da der Verantwortliche in der Union niedergelassen ist, ist kein gesonderter EU-Vertreter nach Art. 27 DSGVO erforderlich.
- **Andere Länder:** Rechte aus dem örtlichen Datenschutzrecht bleiben vorbehalten (Abschnitt 10). Lernomi verkauft deine personenbezogenen Daten nicht und gibt sie nicht für verhaltensbasierte Werbung weiter.

## 3. Welche Daten verarbeitet werden und warum

| Daten | Herkunft | Zweck | Rechtsgrundlage (KVKK / DSGVO) | Speicherdauer |
|---|---|---|---|---|
| E-Mail-Adresse, Name, Passwort-Hash | Registrierungsformular oder das Google- oder Apple-Konto, mit dem du dich anmeldest | Kontoerstellung, Anmeldung, Passwort-Reset, Bestätigungs-E-Mail | Abschluss und Erfüllung eines Vertrags (Art. 5/2-c / Art. 6 Abs. 1 lit. b) | Für die Dauer des Kontos |
| Gastidentität: eine zufällige Nutzerkennung und ein Sitzungstoken (keine E-Mail-Adresse, kein Name, kein Passwort) | Die App, wenn du auf "Ohne Konto fortfahren" tippst | Deinen Fortschritt bei Nutzung ohne Konto auf dem Server halten; ihn in dein Konto übernehmen, wenn du eines erstellst oder dich anmeldest | Abschluss und Erfüllung eines Vertrags (Art. 5/2-c / Art. 6 Abs. 1 lit. b) | Nach {{sessionMaxDays}} Tagen ohne Nutzung innerhalb von 7 Tagen gelöscht; bei Zusammenführung mit einem bestehenden Konto oder wenn du ihn nicht hinzufügen willst sofort; wird bei Kontoerstellung per E-Mail zu deinem Konto selbst |
| Anzeigename, Avatar-Auswahl, Niveau, Kurs, Tagesziel, Stimmpräferenz | Du | Personalisierung; der Anzeigename ist für andere Nutzer in der Wochen-Rangliste sichtbar | Erfüllung eines Vertrags | Für die Dauer des Kontos |
| Lerndaten: Wortstatus, Wiederholungsergebnisse, Serie, XP, Erfolge, Ergebnisse von Sprechübungen und Prüfungen | Während der Nutzung der App | Wiederholungsplan, Fortschritt, Rangliste | Erfüllung eines Vertrags | Für die Dauer des Kontos |
| Texte, die du schreibst und sprichst (Schreibaufgaben, Sprechpraxis, Prüfungsantworten) | Du | Bewertung, Rückmeldung und Antworten in der Sprechpraxis durch KI | Ausdrückliche Einwilligung für die Übermittlung an Sprachmodell-Anbieter (Art. 5/1 / Art. 6 Abs. 1 lit. a): Einwilligungsbildschirm in der App, widerruflich. Erfüllung eines Vertrags für die Speicherung der Ergebnisse in deinem Konto | Bewertungen für die Dauer des Kontos; Protokolle der Sprechpraxis {{speechLogDays}} Tage |
| An den Server gesendetes Mikrofon-Audio | Mikrofon: Gehmodus bei ausgeschaltetem Bildschirm oder mit dem Telefon in der Tasche; im Web außerdem Aussprachebewertung und gesprochene Antworten in Prüfungen | Verschriftlichung des Gesagten und Bewertung der Aussprache | Ausdrückliche Einwilligung (Art. 5/1 / Art. 6 Abs. 1 lit. a); Einwilligungsbildschirm in der App, widerruflich | Wird nicht gespeichert; nach Abschluss der Erkennung gelöscht, nur der erkannte Text bleibt |
| Nutzungsereignisse: welcher Bildschirm geöffnet wurde, Runde begonnen/beendet, Bildschirmbreite und Plattform | Die App | Verbesserung des Produkts (eigene Analyse, keine Dritten) | Berechtigtes Interesse (Art. 5/2-f / Art. 6 Abs. 1 lit. f); in den Einstellungen abschaltbar | Für die Dauer des Kontos |
| IP-Adresse und Browser-/Gerätebezeichnung (im Sitzungsdatensatz) | Deine Verbindung | Sitzungssicherheit, Missbrauchsabwehr und Ratenbegrenzung | Berechtigtes Interesse (Sicherheit) | Für die Dauer der Sitzung (höchstens {{sessionMaxDays}} Tage) |
| Soziales Profil: Benutzername, Sichtbarkeits- und Anfrageeinstellungen | Du | Damit deine Freunde und — bei Sichtbarkeit "öffentlich" — andere Nutzer dich finden | Erfüllung eines Vertrags; Einwilligung für die Einstellungen | Für die Dauer des Kontos |
| Freundschaftsanfragen, Freundesliste, Blockierungen, Nutzermeldungen | Du und deine Freunde | Freundesfunktionen, Sicherheit und Moderation | Erfüllung eines Vertrags; berechtigtes Interesse (Sicherheit) | Für die Dauer des Kontos; Meldungen bis zum Abschluss der Prüfung |
| Aktivitäts-Feed, Reaktionen, Anstöße, gemeinsame Aufgaben, Posteingangs-Benachrichtigungen | Während der Nutzung der App | Teilen des Fortschritts mit deinen Freunden und Motivation (nur für deine Freunde sichtbar) | Erfüllung eines Vertrags; über die Einstellung "Aktivität zeigen" abschaltbar | Für die Dauer des Kontos |
| Web-Push-Abonnement (Browser-Endpunkt und Verschlüsselungsschlüssel) | Dein Browser, wenn du es erlaubst | Erinnerungen im Web | Einwilligung (Browser-Berechtigung) | Bis zum Widerruf der Berechtigung oder zum Ungültigwerden des Endpunkts |
| Erinnerungseinstellungen: Schalter für tägliche Erinnerung, Serienschutz und Wochenprüfung, Erinnerungszeit, Zeitzone | Du (die Zeitzone wird beim Aktivieren der Benachrichtigungen im Web aus deinem Browser übernommen) | Erinnerungen zu deiner Ortszeit senden und deine Auswahl auf allen Geräten gleich halten | Erfüllung eines Vertrags | Für die Dauer des Kontos |
| Mobiles Benachrichtigungs-Token und Plattform (Android/iOS) | Dein Gerät, wenn du Benachrichtigungen erlaubst | Erinnerungen und Freundes-Benachrichtigungen (Anfragen, Anstöße, gemeinsame Aufgaben) auf dein Telefon zustellen; die Zustellung übernimmt Firebase Cloud Messaging | Einwilligung (Benachrichtigungsberechtigung des Betriebssystems) | Bis du dich abmeldest oder das Token ungültig wird; bei Kontolöschung sofort gelöscht |
| Deine Entscheidungen zur KI- und Spracherlaubnis (Zweck, Entscheidung, Datum, Textversion, Plattform) | Du (Einwilligungsbildschirm, Einstellungen › Datenschutz) | Nachweis, dass die Einwilligung erteilt oder widerrufen wurde | Rechtliche Verpflichtung (Art. 5/2-ç / Art. 6 Abs. 1 lit. c und Art. 7 Abs. 1 DSGVO) | Für die Dauer des Kontos |
| Kauf- und Abonnementstatus | App-Store / RevenueCat | Freischalten der Premium-Funktionen | Erfüllung eines Vertrags; rechtliche Verpflichtung (Buchhaltung) | Für die Dauer des Kontos; Finanzunterlagen für die gesetzliche Frist |
| Deine Inhaltsmeldungen | Du ("Melden") | Prüfung unangemessener KI-Antworten | Berechtigtes Interesse (sicherer Dienst) | Bis zum Abschluss der Prüfung |
| Support-Nachrichten und Rechteanfragen | Du | Beantwortung der Anfrage, gesetzliche Dokumentation | Rechtliche Verpflichtung (Art. 13 KVKK, Art. 12 DSGVO) | 2 Jahre nach Abschluss der Anfrage |

**Nutzung ohne Konto (Gast):** Nutzt du die App ohne Konto, werden die oben beschriebenen Lerndaten, Personalisierungseinstellungen, Nutzungsereignisse und der Sitzungseintrag unter einer Gastidentität statt unter einem Konto verarbeitet. Gäste haben keine sozialen Funktionen, es wird nichts an die serverseitige Spracherkennung gesendet, und es gibt weder ein Benachrichtigungs-Token noch Käufe; Erinnerungen werden nur auf deinem Gerät eingerichtet und nicht auf den Server geschrieben. Das Senden von Text an eine KI ist auf eine einzige Schreib- oder Sprechbewertung pro Gastidentität begrenzt und geschieht wie beim Konto nur mit deiner ausdrücklichen Einwilligung (Abschnitt 5); deine Entscheidung wird unter der Gastidentität gespeichert und lässt sich unter Einstellungen › Datenschutz widerrufen. Das Token der Gastidentität wird nur im sicheren Speicher deines Geräts (iOS-Schlüsselbund, Android Keystore) gespeichert und nur verwendet, um deine Sitzung zu erhalten oder wiederherzustellen und deinen Fortschritt in ein Konto zu übernehmen. Erstellst du ein Konto per E-Mail, wird die Gastidentität zu deinem Konto selbst (bis du deine E-Mail-Adresse bestätigst, bleibt sie ein Gast). Erstellst du ein Konto über eine soziale Anmeldung, wird dein Gastfortschritt übernommen. Meldest du dich bei einem bestehenden Konto mit Fortschritt an, wirst du gefragt, ob du diesen Fortschritt hinzufügen willst: Fügst du ihn hinzu, wird er mit dessen Fortschritt zusammengeführt (bei demselben Wort, derselben Lektion oder Übung bleiben der weiteste Stand und der gesamte Aufwand erhalten, die Einstellungen deines Kontos gelten weiter); wenn nicht, werden die Gastdaten gelöscht; in beiden Fällen wird die Gastidentität gelöscht.

**Was nicht erhoben wird:** Standort, Kontakte, Kalender, Fotos, Werbe-ID, Hardwarekennungen (etwa IMEI oder Seriennummer), Absturzberichte, besondere Kategorien personenbezogener Daten. Die einzigen erhobenen Gerätekennungen sind das oben genannte mobile Benachrichtigungs-Token und das Web-Push-Abonnement; beide dienen nur der Zustellung von Benachrichtigungen. Lernomi zeigt keine Werbung, enthält kein Analyse- oder Tracking-SDK Dritter und verkauft keine Daten.

## 4. Mikrofon und Audioaufnahmen

Das Mikrofon öffnet sich nur dort, wo du sprechend antwortest, und nur, wenn du es startest: im Gehmodus, bei gesprochenen Antworten in Lektionen und Sprechübungen, in den Sprechteilen von Prüfungen und im Rollenspiel. Im Gehmodus hörst du eine Vorgabe in deiner Sprache und sprichst das Wort in der Sprache, die du lernst.

In der mobilen App übernimmt bei eingeschaltetem Bildschirm der geräteeigene Spracherkennungsdienst die Erkennung; im Web wird der Spracherkennungsdienst des Browsers verwendet. Ob dieser Dienst das Audio auf dem Gerät verarbeitet oder an die Server des Betriebssystem- oder Browseranbieters (etwa Google oder Apple) sendet, hängt vom Gerät, vom Browser, von der Sprache und von den Einstellungen ab und richtet sich nach den Bedingungen dieses Anbieters; über den Lernomi-Server läuft dieser Weg nicht.

Audio gelangt nur in folgenden Fällen und nur mit deiner Erlaubnis an den Lernomi-Server: im Gehmodus bei ausgeschaltetem Bildschirm oder mit dem Telefon in der Tasche; im Web außerdem für die Aussprachebewertung und die Verschriftlichung gesprochener Antworten in Prüfungen. Die Aufnahme wird als kurzer Audioausschnitt gesendet und an einen der unten aufgeführten Spracherkennungsanbieter weitergegeben. Die Audiodatei wird weder auf dem Server noch beim Anbieter gespeichert; nur der erkannte Text, das erwartete Wort und die Cliplänge werden im Nutzungsdatensatz festgehalten.

- Im Gehmodus bleibt das Mikrofon geöffnet, bis du den Modus in der App beendest; unter Android ist in dieser Zeit eine dauerhafte Benachrichtigung sichtbar. Auf anderen Bildschirmen ist das Mikrofon nur geöffnet, während du deine Antwort sprichst.
- Bei ausgeschaltetem Bildschirm läuft die Aufnahme über den Mechanismus, den das Betriebssystem dafür vorsieht: unter Android ein Vordergrunddienst vom Typ "Mikrofon"{{ifIos}}, unter iOS eine Hintergrund-Audiositzung{{/ifIos}}. Die System-Mikrofonanzeige bleibt an.
- Bevor Audio an den Server geht, erklärt ein Einwilligungsbildschirm diese Verarbeitung und nennt die Spracherkennungsanbieter, an die das Audio gehen kann; im Gehmodus ist dieser Bildschirm die Mikrofon-Einwilligung, und ohne sie startet der Modus nicht. Ohne deine Erlaubnis wird kein Audio an den Server gesendet. Lehnst du ab, funktionieren die Funktionen, die den Server brauchen (Gehmodus bei ausgeschaltetem Bildschirm; im Web die Aussprachebewertung und die Verschriftlichung gesprochener Antworten in Prüfungen), nicht; der Rest der App funktioniert.
- Im Erkennungsergebnis werden Schimpfwörter maskiert.

### Text der ausdrücklichen Einwilligung (Stimme)

Wenn du im Gehmodus auf "Ich stimme zu, los geht's" oder auf dem Einwilligungsbildschirm für die Stimme auf "Erlauben und fortfahren" tippst, gibst du folgende Erklärung ab: "Ich willige ausdrücklich ein, dass meine Mikrofonaufnahmen zum Zweck der Verschriftlichung des Gesagten und der Bewertung meiner Aussprache an den Lernomi-Server und an die auf dem Einwilligungsbildschirm genannten und in Abschnitt 6 dieser Erklärung aufgeführten, teils im Ausland ansässigen Spracherkennungsanbieter übermittelt werden und dass die Aufnahme unmittelbar nach dem Vorgang gelöscht wird. Mir ist bekannt, dass ich diese Einwilligung jederzeit unter Einstellungen › Datenschutz widerrufen kann."

## 4a. Soziale Funktionen und Sichtbarkeit

- Dein Anzeigename ist für alle Nutzer in der Wochen-Rangliste sichtbar; willst du dort nicht erscheinen, kannst du den Anzeigenamen leer lassen (du erscheinst dann als "Lernende/r").
- Dein soziales Profil (Benutzername, Niveau, Serie) ist standardmäßig **öffentlich**; unter Einstellungen › Soziales kannst du es auf "nur Freunde" oder "privat" stellen und Freundschaftsanfragen sowie das Erscheinen in Vorschlägen abschalten.
- Der Aktivitäts-Feed (abgeschlossene Runde, Serien-Meilenstein) ist nur für deine Freunde sichtbar; er wird über "Aktivität zeigen" abgeschaltet.
- Blockierst du eine Person, sehen sich beide Seiten nicht mehr; meldest du jemanden, wird der Vorgang von einem Menschen geprüft. Blockier- und Meldevorgänge werden der Gegenseite nicht angezeigt.
- Lernomi hat keine privaten Nachrichten; Interaktion findet nur über Reaktionen, Anstöße und gemeinsame Aufgaben statt.

## 4b. Automatisierte Entscheidungen und Profiling

Der Wiederholungsplan, der Inhalt der Tagesrunde, der Niveauvorschlag und die Wochen-Rangliste werden automatisch aus deinen Lerndaten berechnet. Diese Berechnungen sind Teil der Funktionsweise des Produkts, erstellen kein umfassendes Profil von dir und entfalten dir gegenüber keine rechtliche oder ähnlich erhebliche Wirkung (es gibt keine Entscheidung im Sinne von Art. 22 DSGVO). Den vorgeschlagenen Niveauwert kannst du jederzeit selbst ändern.

## 5. Von KI verarbeitete Texte

Wenn du es erlaubt hast, werden deine Sprechpraxis (Rollenspiel), Schreibaufgaben und Prüfungsantworten zur Erzeugung von Rückmeldungen an Anbieter von Sprachmodellen gesendet. Gesendet wird nur der von dir geschriebene oder gesprochene Text und das Szenario der Sprechübung; Name und E-Mail-Adresse werden nicht gesendet. Die Anbieter arbeiten unter API-Bedingungen und Auftragsverarbeitungsverträgen, in denen sie zusagen, die Daten nicht für Modelltraining zu verwenden. Die App weist deutlich darauf hin, dass KI-Figuren keine echten Personen sind (Transparenz nach Art. 50 der KI-Verordnung der EU). Antworten können Fehler enthalten; du kannst sie über die Schaltfläche "Melden" unter jeder Antwort melden, und Meldungen werden von einem Menschen geprüft. Lernomi trifft über dich keine ausschließlich auf automatisierter Verarbeitung beruhende Entscheidung mit rechtlicher Wirkung.

**Erlaubnis:** Bevor ein Text zum ersten Mal an einen Anbieter geht, zeigt ein Einwilligungsbildschirm, was gesendet wird, und nennt die Anbieter, an die er gehen kann. Solange du nicht auf "Erlauben und fortfahren" tippst, geht dein Text an keinen Anbieter; diese Regel wird auf dem Server durchgesetzt, nicht in der App, sodass auch eine ältere App-Version oder ein anderes Gerät sie nicht umgehen kann. Lehnst du ab, übst du ohne KI weiter: Gespräche folgen einem Skript, Schreib- und Prüfungsantworten erhalten eine regelbasierte Schätzung oder bleiben unbewertet. Deine Entscheidung wird mit Datum und Textversion in deinem Konto gespeichert und gilt auf all deinen Geräten; du kannst sie jederzeit unter Einstellungen › Datenschutz ändern. Ändert sich die Liste der Empfänger, wirst du erneut gefragt.

### Text der ausdrücklichen Einwilligung (KI)

Wenn du auf dem Einwilligungsbildschirm auf "Erlauben und fortfahren" tippst, gibst du folgende Erklärung ab: "Ich willige ausdrücklich ein, dass die Texte, die ich schreibe, und die aus meinen gesprochenen Antworten verschriftlichten Texte zusammen mit der jeweiligen Aufgabe zum Zweck der Bewertung, der Rückmeldung und der Antworten der Gesprächsfigur an die auf dem Einwilligungsbildschirm genannten und in Abschnitt 6 dieser Erklärung aufgeführten, teils im Ausland ansässigen Sprachmodell-Anbieter übermittelt werden. Mir ist bekannt, dass ich diese Einwilligung jederzeit unter Einstellungen › Datenschutz widerrufen kann."

## 6. Dienstleister, die Daten erhalten, und Übermittlung ins Ausland

Die folgenden Anbieter arbeiten nur zum angegebenen Zweck und nur mit den für diese Aufgabe erforderlichen Daten; keiner von ihnen darf die Daten für eigene Zwecke verwenden. Die Server stehen in Deutschland. Die für Übermittlungen aus der Türkei in die EU und aus der EU in die USA bzw. das Vereinigte Königreich verwendete Garantie steht in der letzten Spalte: der von der türkischen Behörde nach Art. 9 KVKK veröffentlichte Standardvertrag sowie Standardvertragsklauseln oder ein Angemessenheitsbeschluss nach Kapitel V DSGVO.

{{processorsTable}}

Eine Übermittlung an Behörden erfolgt nur bei einer rechtlichen Verpflichtung oder auf Verlangen einer zuständigen Stelle und nur im Umfang dieses Verlangens.

## 7. Cookies und lokale Speicherung

Im Web wird nur das unbedingt erforderliche Sitzungs-Cookie verwendet (um zu merken, dass du angemeldet bist, {{sessionMaxDays}} Tage); deshalb gibt es kein Cookie-Banner. Marketing- oder Tracking-Cookies werden nicht eingesetzt. In der lokalen Speicherung von Browser und App liegen gerätebezogene Angaben wie Design- und Toneinstellungen und eine unterbrochene Sprechübung; diese verlassen dein Gerät nicht. Erinnerungseinstellungen und KI-Erlaubnisse werden dagegen in deinem Konto gespeichert, damit sie auf all deinen Geräten gelten (Abschnitt 3).

## 8. Produktanalyse und Abschalten

Um zu verstehen, welche Funktionen genutzt werden, schreibt Lernomi kurze Nutzungsereignisse auf den eigenen Server (z. B. "Runde abgeschlossen"). Was ein solches Ereignis enthalten darf, ist eng begrenzt:

- Die Ereignisnamen stammen aus einer geschlossenen, vorab festgelegten Liste.
- Jedes Ereignis kann eine technische Kennzeichnung von höchstens 32 Zeichen tragen (etwa "single:artikel" oder "level:B1").
- Die Kennzeichnung lässt nur Buchstaben, Ziffern, Unterstrich, Doppelpunkt und Bindestrich zu und darf nicht ausschließlich aus Ziffern bestehen. Sie kann daher weder eine E-Mail-Adresse noch einen Link oder eine Telefonnummer enthalten.
- Darüber hinaus wird kein Freitext gesendet, und die Ereignisse gehen an keinen Dritten.

Über den Schalter "Nutzungsdaten senden" unter Einstellungen › Datenschutz kannst du das abschalten. Das ist das Widerspruchsrecht nach KVKK und Art. 21 DSGVO. Danach werden nur die für den Dienst zwingend erforderlichen Datensätze geführt.

## 8a. Kommerzielle elektronische Nachrichten

Du erhältst nur dienstbezogene Nachrichten: E-Mail-Bestätigung, Passwort-Reset, Konto- und Sicherheitshinweise sowie die von dir erlaubten Erinnerungen. Kommerzielle elektronische Nachrichten im Sinne des türkischen Gesetzes Nr. 6563 werden nicht versendet; sollten künftig Marketingnachrichten versendet werden, wird zuvor deine gesonderte Zustimmung über das türkische Nachrichtenverwaltungssystem (İYS) eingeholt, und jede Nachricht enthält eine Abmeldemöglichkeit.

## 9. Speicherfristen

- Konto- und Lerndaten: solange das Konto besteht; mit der Löschung des Kontos wird alles gelöscht.
- Gastdaten (Nutzung ohne Konto): Nutzt du die Gastidentität {{sessionMaxDays}} Tage nicht, läuft ihre Sitzung ab und die Daten werden spätestens nach 7 Tagen gelöscht; bei Zusammenführung mit einem bestehenden Konto oder wenn du sie nicht hinzufügen willst, wird die Gastidentität sofort gelöscht; bei Kontoerstellung per E-Mail wird sie zu deinem Konto selbst.
- Protokolle der Sprechpraxis (dein Satz und die Antwort des Modells): {{speechLogDays}} Tage, danach automatische Löschung.
- Audioaufnahmen: werden nicht gespeichert.
- Mobiles Benachrichtigungs-Token: bis du dich abmeldest oder das Token ungültig wird.
- Sitzungsdatensätze (IP, Gerätebezeichnung): für die Dauer der Sitzung, höchstens {{sessionMaxDays}} Tage.
- Finanzunterlagen (Abonnementrechnungen): die vom türkischen Handelsgesetzbuch und vom Steuerverfahrensgesetz vorgesehene Frist (10 Jahre), und nur soweit der App-Store (Google Play{{ifIos}} oder App Store{{/ifIos}}) sie übermittelt.
- Schriftwechsel zu Rechteanfragen: 2 Jahre nach Abschluss der Anfrage.
- Server-Backups: gelöschte Daten fallen spätestens innerhalb von {{backupRetentionDays}} Tagen aus den Backups heraus; Backups dienen nur der Notfallwiederherstellung, und ein gelöschtes Konto wird nie aus einem Backup wiederhergestellt.

## 10. Deine Rechte

Nach Art. 11 KVKK und Art. 15-22 DSGVO kannst du verlangen:

- zu erfahren, ob deine Daten verarbeitet werden, Auskunft darüber zu erhalten und eine Kopie in einem maschinenlesbaren Format zu bekommen (Auskunft und Datenübertragbarkeit),
- unvollständige oder unrichtige Daten berichtigen zu lassen (Name und Einstellungen kannst du in den Einstellungen selbst ändern),
- die Löschung oder Vernichtung deiner Daten (Weg zur Kontolöschung in Abschnitt 11),
- die Einschränkung der Verarbeitung und Widerspruch gegen eine auf berechtigtem Interesse beruhende Verarbeitung (Analyse-Schalter),
- den Widerruf deiner ausdrücklichen Einwilligung (KI- und Spracherlaubnis sowie Mikrofon-Einwilligung unter Einstellungen › Datenschutz; der Widerruf berührt die Rechtmäßigkeit der bisherigen Verarbeitung nicht),
- dass Berichtigung und Löschung den Dritten mitgeteilt werden, an die die Daten übermittelt wurden,
- Schadensersatz, wenn dir ein Schaden entstanden ist.

**Antragstellung:** Schreibe für Anträge nach DSGVO oder UK GDPR an {{privacyEmailEu}} und für Anträge nach türkischem Datenschutzrecht (KVKK) an {{privacyEmailTr}}; zur Identitätsprüfung genügt es, von der E-Mail-Adresse deines Kontos zu schreiben. In der Türkei kannst du nach der Mitteilung über das Verfahren für Anträge an den Verantwortlichen den Antrag auch schriftlich mit eigenhändiger Unterschrift, mit qualifizierter elektronischer Signatur oder von der in deinem Konto hinterlegten E-Mail-Adresse aus stellen. Anträge werden kostenlos innerhalb von höchstens 30 Tagen bearbeitet; nach der DSGVO kann diese Frist bei Bedarf um zwei Monate verlängert werden, worüber du informiert wirst.

**Beschwerde:** in der Türkei bei der Behörde zum Schutz personenbezogener Daten (kvkk.gov.tr). In der EU ist die zuständige Aufsichtsbehörde des Verantwortlichen nach dem Ort der Niederlassung die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW). Nach Art. 77 DSGVO kannst du dich auch an die Behörde in deinem eigenen Land wenden. Im Vereinigten Königreich beim ICO. Bitte wende dich zuerst an den Verantwortlichen; die meisten Anliegen lassen sich direkt lösen.

## 11. Konto und Daten löschen

Du kannst dein Konto auf zwei Wegen löschen: in der App unter **Profil › Einstellungen › Konto › Konto löschen** oder im Web unter [www.lernomi.app/account/delete]({{link:deleteAccount}}). Im Moment der Löschung werden dein Konto, dein Fortschritt, deine Texte, deine Sprechprotokolle, deine Nutzungsereignisse und deine sozialen Spuren (Freundschaften, Reaktionen) dauerhaft gelöscht; das ist unwiderruflich. Finanzunterlagen, die einer gesetzlichen Aufbewahrungspflicht unterliegen, werden anonymisiert aufbewahrt. Hast du ein Store-Abonnement, musst du es zusätzlich in dem Store kündigen, in dem du es gekauft hast.

Nutzt du die App ohne Konto (als Gast), kannst du deine Daten in der App unter **Profil › Gastdaten löschen** löschen: Die Gastidentität und dein gesamter Fortschritt werden dauerhaft vom Server und von deinem Gerät gelöscht.

## 12. Kinder

Lernomi ist nicht für Personen unter 18 Jahren gestaltet und erhebt von ihnen wissentlich keine Daten. Die Nutzungsbedingungen beschränken die Kontoerstellung auf Personen ab 18 Jahren (siehe Nutzungsbedingungen, Ziffer 3). Die Inhalte richten sich an erwachsene Lernende und an die Vorbereitung auf offizielle Sprachprüfungen; da die App offene KI-Gespräche und Interaktion zwischen Nutzern enthält, ist sie für ein kindliches Publikum nicht geeignet. Wird bekannt, dass eine Person unter 18 Jahren ein Konto erstellt hat, werden Konto und Daten gelöscht; Eltern können an {{privacyEmailEu}} schreiben.

## 13. Sicherheit

Alle Verbindungen sind mit HTTPS verschlüsselt. Passwörter werden als nicht umkehrbare Hashes gespeichert. Der Zugriff auf den Server ist auf Schlüssel beschränkt; Anmeldeversuche unterliegen einer Ratenbegrenzung. Für zerstörende Vorgänge wie die Kontolöschung sind ein Passwort oder eine frische Sitzung erforderlich. Bei einer Verletzung des Schutzes personenbezogener Daten werden die Behörden (in der Türkei die Behörde innerhalb von 72 Stunden) nach KVKK und Art. 33-34 DSGVO benachrichtigt und du wirst informiert.

## 14. Änderungen

Wenn sich diese Erklärung ändert, werden Gültigkeitsdatum und Version auf dieser Seite aktualisiert; bei einer Änderung, die die Verarbeitungszwecke erweitert, wird in der App informiert und erforderlichenfalls erneut eine Einwilligung eingeholt. Fragen: {{privacyEmailEu}}.`,
  },
};
