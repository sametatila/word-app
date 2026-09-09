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
      "Hesabını yürütmek için e-posta ve adını, öğrenmeni izlemek için ilerleme verini işleriz.",
      "Yürüyüş modunda mikrofon sesin, açık rızanla, konuşmanı yazıya çevirmek için gönderilir. Ses kaydı saklanmaz.",
      "Reklam, reklam kimliği ve üçüncü taraf takip yok.",
      "Hesabını dilediğin an uygulamadan ya da web'den silebilirsin.",
      "Avrupa'da GDPR, Türkiye'de KVKK hakların geçerli.",
    ],
    body: `## 1. Veri sorumlusu

Bu politika kapsamındaki kişisel verilerin sorumlusu, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) anlamında aşağıdaki kişidir: hangi verinin hangi amaçla işleneceğine, ne kadar tutulacağına ve hangi sağlayıcıya gideceğine o karar verir. Politika, Lernomi web uygulamasını (www.lernomi.app) ve {{platforms}} kapsar.

{{entityBlock:controller:contact}}

Uygulamayı mağazalarda yayımlayan ve abonelik tahsilatını yürüten taraf ayrı bir kişidir. Yayıncı, veri sorumlusunun talimatı dışında kişisel veri işlemez; Play Console üzerinden eriştiği sipariş, abonelik ve yorum verisi bakımından **veri işleyen** sıfatını taşır ve aramızda bu kapsamda bir işleme sözleşmesi bulunur (GDPR m.28, KVKK m.12).

{{entityBlock:publisher}}

Sunucularımız {{hosting}} üzerinde çalışır; veriler orada saklanır. Veri sorumlusu Türkiye'de yerleşik değildir; Türkiye'den yapılacak başvurular ve Kurumla yazışma için yukarıda bilgileri verilen veri sorumlusu temsilcisi belirlenmiştir. Temsilcinin belirlenmesi veri sorumlusunun kendi sorumluluğunu ortadan kaldırmaz.

**Toplama yöntemi ve hukuki sebep (KVKK m.10):** Veriler, kayıt ve ayar formları, uygulama içi etkileşimler ve mikrofon aracılığıyla elektronik ortamda, otomatik ya da kısmen otomatik yollarla toplanır; her veri için hukuki sebep 3. bölümdeki tabloda verilmiştir.

## 2. Kimler için hangi hukuk

- **Türkiye'deki kullanıcılar:** KVKK ve ikincil mevzuatı (Aydınlatma Yükümlülüğü Tebliği, Veri Sorumlusuna Başvuru Tebliği, yurt dışına aktarım usulleri).
- **AB/AEA'daki kullanıcılar:** Veri sorumlusu Almanya'da yerleşik olduğundan GDPR m.3(1) gereği GDPR ve Alman veri koruma mevzuatı (BDSG); Birleşik Krallık'ta ayrıca UK GDPR ve Data Protection Act 2018. Bu politikadaki hukuki dayanaklar GDPR m.6 ile eşlenmiştir. Veri sorumlusu Birlik içinde yerleşik olduğu için GDPR m.27 kapsamında ayrıca bir AB temsilcisi atanması gerekmez.
- **Diğer ülkeler:** Yerel veri koruma hukukundan doğan haklar saklıdır (10. bölüm). Kişisel verini satmayız ve davranışsal reklam için paylaşmayız.

## 3. Hangi verileri, neden işliyoruz

| Veri | Nereden | Amaç | Hukuki dayanak (KVKK / GDPR) | Saklama |
|---|---|---|---|---|
| E-posta adresi, ad, parola özeti | Kayıt formu ya da Google hesabın | Hesap açma, giriş, parola sıfırlama, doğrulama e-postası | Sözleşmenin kurulması ve ifası (m.5/2-c / m.6(1)(b)) | Hesap süresince |
| Görünen ad, avatar seçimi, seviye, kurs, günlük hedef, ses tercihi | Sen | Kişiselleştirme; görünen ad haftalık sıralamada diğer kullanıcılara görünür | Sözleşmenin ifası | Hesap süresince |
| Öğrenme verisi: kelime durumu, tekrar sonuçları, seri, XP, başarımlar, konuşma ve sınav sonuçları | Uygulamayı kullanırken | Aralıklı tekrar planı, ilerleme, sıralama | Sözleşmenin ifası | Hesap süresince |
| Yazdığın ve söylediğin metinler (yazma görevleri, konuşma pratiği, sınav cevapları) | Sen | Yapay zekâ ile değerlendirme ve geri bildirim | Sözleşmenin ifası | Değerlendirmeler hesap süresince; konuşma pratiği kayıtları 30 gün |
| Mikrofon ses kaydı | Yürüyüş modunda mikrofon | Söylediğin kelimeyi yazıya çevirmek | Açık rıza (m.5/1 / m.6(1)(a)); uygulama içi onay ekranı, geri alınabilir | Saklanmaz; tanıma biter bitmez silinir, yalnız tanınan metin tutulur |
| Kullanım olayları: hangi ekran açıldı, tur başladı/bitti, ekran genişliği ve platform | Uygulama | Ürünü iyileştirme (birinci taraf analitik) | Meşru menfaat (m.5/2-f / m.6(1)(f)); ayarlardan kapatılabilir | Hesap süresince |
| IP adresi ve tarayıcı/cihaz tanımı (oturum kaydında) | Bağlantın | Oturum güvenliği, kötüye kullanım ve hız sınırı | Meşru menfaat (güvenlik) | Oturum süresince (en çok 30 gün) |
| Sosyal profil: kullanıcı adı, biyografi, görünürlük ve istek tercihleri | Sen | Arkadaşların ve (görünürlük "herkese açık" ise) diğer kullanıcıların seni bulması | Sözleşmenin ifası; tercihler için rıza | Hesap süresince |
| Arkadaşlık istekleri, arkadaş listesi, engellemeler, kullanıcı bildirimleri | Sen ve arkadaşların | Arkadaşlık özellikleri, güvenlik ve moderasyon | Sözleşmenin ifası; meşru menfaat (güvenlik) | Hesap süresince; bildirimler inceleme kapanana kadar |
| Etkinlik akışı, tepkiler, dürtmeler, ortak görevler, gelen kutusu bildirimleri | Uygulamayı kullanırken | Arkadaşlarınla ilerleme paylaşımı ve motivasyon (yalnız arkadaşlarına görünür) | Sözleşmenin ifası; "etkinliğimi göster" tercihiyle kapatılabilir | Hesap süresince |
| Web push aboneliği (tarayıcı uç noktası ve şifreleme anahtarları) | Tarayıcın, izin verirsen | Web'de hatırlatma bildirimleri | Rıza (tarayıcı izni) | İzin geri alınana ya da uç nokta geçersizleşene kadar |
| Bildirim izni ve hatırlatma saati | Sen | Yerel hatırlatmalar (cihazda planlanır, sunucuya gitmez) | Rıza | Cihazda |
| Satın alma ve abonelik durumu | Uygulama mağazası / RevenueCat | Premium özellikleri açmak | Sözleşmenin ifası; yasal yükümlülük (muhasebe) | Hesap süresince; mali kayıtlar yasal süre boyunca |
| İçerik bildirimlerin | Sen ("Bildir") | Uygunsuz yapay zekâ yanıtlarını incelemek | Meşru menfaat (güvenli hizmet) | İnceleme kapanana kadar |
| Bize yazdığın destek ve hak talepleri | Sen | Talebi cevaplamak, yasal kayıt | Yasal yükümlülük (KVKK m.13, GDPR m.12) | Talep kapandıktan sonra 2 yıl |

**Toplamadıklarımız:** konum, rehber, takvim, fotoğraf, reklam kimliği, cihaz kimliği, çökme raporu, özel nitelikli kişisel veri. Lernomi reklam göstermez, üçüncü taraf analitik ya da takip SDK'sı içermez, veri satmaz.

## 4. Mikrofon ve ses kayıtları

Yürüyüş modunda Türkçe ipucunu duyar, Almancasını söylersin. Ekran açıkken tanıma, cihazın kendi konuşma tanıma servisiyle yapılır. Bu servisin sesi cihazda mı işlediği yoksa işletim sistemi sağlayıcısının (Google ya da Apple) sunucularına mı gönderdiği cihaza, dile ve cihaz ayarlarına göre değişir ve o sağlayıcının kendi şartlarına tabidir; bu yol bizim sunucumuzdan geçmez. Ekran kapalıyken ya da telefon cebindeyken ses, 16 kHz mono kayıt olarak sunucumuza gönderilir ve aşağıdaki konuşma tanıma sağlayıcılarından birine iletilir. Ses dosyası sunucuda ya da sağlayıcıda saklanmaz; yalnız tanınan metin, beklenen kelime ve klip süresi kullanım kaydına yazılır.

- Mikrofon yalnız sen yürüyüş modunu başlatınca açılır; sürekli bir bildirim görünür ve uygulamadan durdurabilirsin.
- Ekran kapalıyken kayıt, işletim sisteminin bu iş için öngördüğü arka plan yoluyla yapılır: Android'de mikrofon tipli ön plan servisi{{ifIos}}, iOS'ta arka plan ses oturumu{{/ifIos}}. Sistemin mikrofon göstergesi açık kalır.
- İlk kullanımda bu işlemi anlatan bir onay ekranı gösterilir; onaylamadan mod başlamaz. Onayı vermezsen mikrofon hiç kullanılmaz, uygulamanın geri kalanı çalışır.
- Tanıma sonucunda küfür maskelenir.

### Açık rıza metni (mikrofon)

Uygulamada "Kabul ediyorum, başla"ya bastığında şu beyanı vermiş olursun: "Yürüyüş modunda mikrofon kayıtlarımın, söylediğim kelimeyi yazıya çevirmek amacıyla Lernomi sunucusuna ve bu politikanın 6. bölümünde listelenen, bir kısmı yurt dışında bulunan konuşma tanıma sağlayıcılarına aktarılmasına; kaydın işlem biter bitmez silinmesine açık rıza veriyorum. Bu rızayı Ayarlar › Gizlilik bölümünden dilediğim an geri alabileceğimi biliyorum."

## 4a. Sosyal özellikler ve görünürlük

- Görünen adın haftalık sıralamada tüm kullanıcılara görünür; sıralamaya girmek istemiyorsan görünen adını boş bırakabilirsin ("Öğrenci" olarak görünürsün).
- Sosyal profilin (kullanıcı adı, biyografi, seviye, seri) varsayılan olarak **herkese açık**tır; Ayarlar › Sosyal'den "yalnız arkadaşlar" ya da "gizli" yapabilir, arkadaşlık isteklerini ve önerilerde görünmeyi kapatabilirsin.
- Etkinlik akışı (tur tamamlama, seri kilometre taşı) yalnız arkadaşlarına görünür; "etkinliğimi göster" ile kapatılır.
- Bir kullanıcıyı engellediğinde iki taraf birbirini görmez; bildirdiğinde kayıt insan tarafından incelenir. Engelleme ve bildirim kayıtları karşı tarafa gösterilmez.
- Lernomi'de özel mesajlaşma yoktur; etkileşim yalnız tepkiler, dürtmeler ve ortak görevlerle olur.

## 4b. Otomatik karar verme ve profilleme

Aralıklı tekrar planı, günlük tur içeriği, seviye önerisi ve haftalık sıralama öğrenme verinden otomatik hesaplanır. Bunlar ürün işleyişinin parçasıdır, seni kapsamlı biçimde profillemez ve hakkında hukuki ya da benzer ölçüde önemli bir sonuç doğurmaz (GDPR m.22 kapsamına giren bir karar yoktur). Seviye önerisini istediğin zaman kendin değiştirebilirsin.

## 5. Yapay zekâ ile işlenen metinler

Konuşma pratiği (rol yapma), yazma görevleri ve sınav cevapların, geri bildirim üretmek için dil modeli sağlayıcılarına gönderilir. Gönderilen şey yalnız senin yazdığın/söylediğin metin ve konuşmanın senaryosudur; ad ya da e-posta gönderilmez. Sağlayıcılar, verileri model eğitiminde kullanmamayı taahhüt eden API şartlarıyla ve veri işleme sözleşmeleriyle çalışır. Yapay zekâ karakterlerinin gerçek kişi olmadığı uygulamada açıkça belirtilir (AB Yapay Zekâ Tüzüğü m.50 şeffaflık). Yanıtlar hata içerebilir; her yanıtın altındaki "Bildir" ile bize iletebilirsin, bildirimler insan tarafından incelenir. Lernomi hakkında yalnız otomatik işlemeye dayanan, hukuki sonuç doğuran bir karar vermez.

## 6. Verinin ulaştığı hizmet sağlayıcılar ve yurt dışına aktarım

Aşağıdaki sağlayıcılar yalnız belirtilen amaçla ve yalnız o iş için gereken veriyle çalışır; hiçbiri veriyi kendi amaçları için kullanamaz. Sunucularımız Almanya'dadır. Türkiye'den AB'ye ve AB'den ABD/Birleşik Krallık'a yapılan aktarımlarda kullanılan güvence son sütundadır: KVKK m.9 kapsamında Kurul'un ilan ettiği standart sözleşme ve GDPR Bölüm V kapsamında standart sözleşme hükümleri ya da yeterlilik kararı.

{{processorsTable}}

Verilerin kamu kurumlarına aktarımı yalnız yasal bir zorunluluk ya da yetkili makam talebi hâlinde ve talep kapsamıyla sınırlı yapılır.

## 7. Çerezler ve yerel depolama

Web'de yalnız zorunlu oturum çerezi kullanılır (giriş yaptığını hatırlamak için, 30 gün); bu nedenle çerez onay bandı yoktur. Pazarlama ya da takip çerezi kullanmayız. Tarayıcı ve uygulama yerel depolamasında tema, ses ve bildirim tercihleri, avatar seçimi ve yarım kalan konuşma gibi bilgiler tutulur; bunlar cihazından çıkmaz.

## 8. Ürün analitiği ve kapatma

Lernomi, hangi özelliklerin kullanıldığını anlamak için kendi sunucusuna kısa kullanım olayları yazar (ör. "tur tamamlandı"). Bu olayda ne bulunabileceği dar bir çerçeveyle sınırlı:

- Olay adları önceden belirlenmiş kapalı bir listeden gelir.
- Her olay en çok 32 karakterlik teknik bir etiket taşıyabilir ("single:artikel", "level:B1" gibi).
- Etiket yalnız harf, rakam, alt çizgi, iki nokta ve tire kabul eder. Salt rakamdan da oluşamaz. Bu yüzden bir e-posta adresi, bağlantı ya da telefon numarası taşıması mümkün değildir.
- Bunun dışında serbest metin gönderilmez ve olaylar üçüncü tarafa gitmez.

Ayarlar › Gizlilik bölümündeki "Kullanım verisi gönder" anahtarıyla bunu kapatabilirsin. Bu, KVKK ve GDPR m.21'deki itiraz hakkının karşılığıdır. Kapattığında yalnız hizmet için zorunlu kayıtlar tutulur.

## 8a. Ticari elektronik ileti

Sana yalnız hizmetle ilgili iletiler göndeririz: e-posta doğrulama, parola sıfırlama, hesap ve güvenlik bildirimleri, izin verdiğin hatırlatmalar. 6563 sayılı Kanun kapsamında ticari elektronik ileti göndermeyiz; ileride pazarlama iletisi göndermek istersek İleti Yönetim Sistemi (İYS) üzerinden ayrıca onayını alırız ve her iletide ret yolu bulunur.

## 9. Saklama süreleri

- Hesap ve öğrenme verisi: hesabın açık olduğu sürece; hesap silinince tümü silinir.
- Konuşma pratiği kayıtları (söylediğin cümle ve model yanıtı): 30 gün, sonra kendiliğinden silinir.
- Ses kayıtları: saklanmaz.
- Oturum kayıtları (IP, cihaz tanımı): oturum süresince, en çok 30 gün.
- Mali kayıtlar (abonelik faturaları): Türk Ticaret Kanunu ve Vergi Usul Kanunu'nun öngördüğü süre (10 yıl), yalnız Google Play'in bize ilettiği kadarıyla.
- Hak talepleri yazışmaları: talep kapandıktan sonra 2 yıl.
- Sunucu yedekleri: silinen veriler yedeklerden en geç {{backupRetentionDays}} gün içinde düşer; yedekler yalnız felaket kurtarma için kullanılır, silinen hesap yedekten geri yüklenmez.

## 10. Hakların

KVKK m.11 ve GDPR m.15-22 uyarınca şunları isteyebilirsin:

- Verilerinin işlenip işlenmediğini öğrenmek, bilgi istemek ve bir kopyasını makine tarafından okunabilir biçimde almak (erişim ve taşınabilirlik),
- Eksik ya da yanlış veriyi düzeltmek (ad ve tercihleri Ayarlar'dan kendin değiştirebilirsin),
- Verilerinin silinmesini ya da yok edilmesini istemek (11. bölümdeki hesap silme yolu),
- İşlemenin kısıtlanmasını istemek ve meşru menfaate dayanan işlemeye itiraz etmek (analitik anahtarı),
- Açık rızanı geri almak (mikrofon onayı; geri alma önceki işlemenin hukukiliğini etkilemez),
- Verilerin üçüncü kişilere aktarılması hâlinde düzeltme ve silmenin onlara bildirilmesini istemek,
- Zarara uğraman hâlinde tazminat talep etmek.

**Başvuru:** KVKK kapsamındaki talepler için {{privacyEmailTr}}, GDPR ve UK GDPR kapsamındaki talepler için {{privacyEmailEu}} adresine yaz; kimliğini doğrulamak için hesabındaki e-posta adresinden yazman yeterlidir. Türkiye'de KVKK Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca ıslak imzalı yazılı başvuru, güvenli elektronik imzalı başvuru ya da hesabında kayıtlı e-posta adresinden başvuru da yapılabilir. Talepleri en geç 30 gün içinde ücretsiz sonuçlandırırız; GDPR kapsamında bu süre gerekirse iki ay uzatılabilir ve sana bildirilir.

**Şikâyet:** Türkiye'de Kişisel Verileri Koruma Kurulu'na (kvkk.gov.tr). AB'de veri sorumlusunun yetkili denetim otoritesi, yerleşim yerine göre Kuzey Ren-Vestfalya Eyalet Veri Koruma ve Bilgi Edinme Görevlisi'dir (LDI NRW). GDPR m.77 uyarınca kendi ülkendeki otoriteye de başvurabilirsin. Birleşik Krallık'ta ICO. Önce bize yazmanı rica ederiz, çoğu talebi doğrudan çözebiliriz.

## 11. Hesabını ve verilerini silme

Hesabını iki yoldan silebilirsin: uygulamada **Profil › Ayarlar › Hesap › Hesabı sil**, ya da web'de [www.lernomi.app/account/delete]({{link:deleteAccount}}). Silme anında hesabın, ilerlemen, yazıların, konuşma kayıtların, kullanım olayların ve sosyal izlerin (arkadaşlıklar, tepkiler) kalıcı olarak silinir; geri alınamaz. Yasal saklama yükümlülüğü olan mali kayıtlar anonimleştirilerek tutulur. Mağaza aboneliğin varsa onu aldığın mağaza üzerinden ayrıca iptal etmen gerekir.

## 12. Çocuklar

Lernomi 18 yaşından küçükler için tasarlanmamıştır ve onlardan bilerek veri toplamaz; kullanım şartları hesap açmayı 18 yaş ve üzeriyle sınırlar (bkz. şartlar §3). İçerik yetişkin öğrencilere ve resmî dil sınavı hazırlığına yöneliktir; uygulamada açık uçlu yapay zekâ konuşması ve kullanıcı etkileşimi bulunduğundan çocuk kitlesine uygun değildir. 18 yaşından küçük birinin hesap açtığını fark edersek hesabı ve verileri sileriz; ebeveynler {{privacyEmailTr}} adresine yazabilir.

## 13. Güvenlik

Tüm bağlantılar HTTPS ile şifrelenir. Parolalar geri döndürülemez özet olarak saklanır. Sunucuya erişim anahtarla sınırlıdır; giriş denemeleri hız sınırına tabidir. Hesap silme gibi yıkıcı işlemler parola ya da yeni bir oturum ister. Kişisel verileri etkileyen bir ihlalde KVKK (72 saat içinde Kurul'a) ve GDPR m.33-34 uyarınca bildirim yaparız ve seni bilgilendiririz.

## 14. Değişiklikler

Politikayı değiştirdiğimizde bu sayfadaki yürürlük tarihi ve sürüm güncellenir; işleme amaçlarını genişleten bir değişiklikte uygulama içinde bilgilendirir ve gerekiyorsa yeniden onay isteriz. Sorular için: {{privacyEmailTr}}.`,
  },
  en: {
    title: "Privacy Policy",
    description: "What data Lernomi processes, why and for how long; your rights under GDPR and Turkish data protection law; deleting your account.",
    summary: [
      "Lernomi is a language learning app: German, Zurich German and English.",
      "We process your e-mail and name to run your account, and your progress data to track your learning.",
      "In walk mode, with your explicit consent, microphone audio is sent to be transcribed. The recording is not kept.",
      "No ads, no advertising identifier, no third-party tracking.",
      "You can delete your account at any time, from the app or the web.",
      "GDPR rights in Europe, KVKK rights in Türkiye.",
    ],
    body: `## 1. Data controller

The controller of the personal data covered by this policy, within the meaning of Turkish Law no. 6698 on the Protection of Personal Data (KVKK) and the European Union General Data Protection Regulation (GDPR), is the person identified below: they decide what data is processed for what purpose, how long it is kept and which providers it goes to. The policy covers the Lernomi web app (www.lernomi.app) and {{platforms}}.

{{entityBlock:controller:contact}}

The app is published in the app stores and the subscription revenue is collected by a different person. The publisher processes no personal data except on the controller's instructions; for the order, subscription and review data they access through the Play Console they act as a **processor**, and a processing agreement between us covers this (Art. 28 GDPR, Art. 12 KVKK).

{{entityBlock:publisher}}

Our servers run on {{hosting}}; the data is stored there. The controller is not established in Türkiye; for applications made from Türkiye and for correspondence with the Turkish authority, the representative identified above has been designated. Designating a representative does not remove the controller's own responsibility.

**Collection method and legal ground (KVKK Art. 10):** Data is collected electronically, by automated or partly automated means, through registration and settings forms, in-app interactions and the microphone; the legal ground for each item is given in the table in section 3.

## 2. Which law applies to whom

- **Users in Türkiye:** KVKK and its secondary legislation (Communiqué on the Obligation to Inform, Communiqué on Applications to the Data Controller, rules on transfers abroad).
- **Users in the EU/EEA:** because the controller is established in Germany, the GDPR applies by virtue of Art. 3(1) GDPR, together with German data protection law (BDSG); in the United Kingdom, the UK GDPR and the Data Protection Act 2018 also apply. The legal grounds in this policy are mapped to Art. 6 GDPR. As the controller is established within the Union, no separate EU representative under Art. 27 GDPR is required.
- **Other countries:** rights under local data protection law are reserved (section 10). We do not sell your personal data and do not share it for behavioural advertising.

## 3. What data we process and why

| Data | Source | Purpose | Legal ground (KVKK / GDPR) | Retention |
|---|---|---|---|---|
| E-mail address, name, password hash | Registration form or your Google account | Account creation, sign-in, password reset, verification e-mail | Conclusion and performance of a contract (Art. 5/2-c / Art. 6(1)(b)) | For the life of the account |
| Display name, avatar choice, level, course, daily goal, voice preference | You | Personalisation; the display name is visible to other users on the weekly leaderboard | Performance of a contract | For the life of the account |
| Learning data: word state, review results, streak, XP, achievements, speaking practice and exam results | While you use the app | Spaced repetition schedule, progress, leaderboard | Performance of a contract | For the life of the account |
| Texts you write and say (writing tasks, speaking practice, exam answers) | You | AI assessment and feedback | Performance of a contract | Assessments for the life of the account; speaking practice logs for 30 days |
| Microphone audio | The microphone in walk mode | Transcribing the word you said | Explicit consent (Art. 5/1 / Art. 6(1)(a)); in-app consent screen, revocable | Not kept; deleted as soon as recognition finishes, only the recognised text is retained |
| Usage events: which screen opened, round started/finished, screen width and platform | The app | Improving the product (first-party analytics) | Legitimate interest (Art. 5/2-f / Art. 6(1)(f)); can be switched off in settings | For the life of the account |
| IP address and browser/device description (in the session record) | Your connection | Session security, abuse prevention and rate limiting | Legitimate interest (security) | For the life of the session (at most 30 days) |
| Social profile: username, bio, visibility and request preferences | You | Letting your friends and, if visibility is "public", other users find you | Performance of a contract; consent for the preferences | For the life of the account |
| Friend requests, friend list, blocks, user reports | You and your friends | Friend features, safety and moderation | Performance of a contract; legitimate interest (safety) | For the life of the account; reports until the review closes |
| Activity feed, reactions, nudges, shared quests, inbox notifications | While you use the app | Sharing progress with your friends and motivation (visible only to your friends) | Performance of a contract; can be switched off with the "show my activity" preference | For the life of the account |
| Web push subscription (browser endpoint and encryption keys) | Your browser, if you allow it | Reminder notifications on the web | Consent (browser permission) | Until the permission is withdrawn or the endpoint expires |
| Notification permission and reminder time | You | Local reminders (scheduled on the device, not sent to the server) | Consent | On the device |
| Purchase and subscription state | App store / RevenueCat | Unlocking Premium features | Performance of a contract; legal obligation (accounting) | For the life of the account; financial records for the statutory period |
| Your content reports | You ("Report") | Reviewing inappropriate AI answers | Legitimate interest (a safe service) | Until the review closes |
| Support messages and rights requests you send us | You | Answering the request, statutory record | Legal obligation (KVKK Art. 13, GDPR Art. 12) | 2 years after the request closes |

**What we do not collect:** location, contacts, calendar, photos, advertising identifier, device identifier, crash reports, special categories of personal data. Lernomi shows no ads, contains no third-party analytics or tracking SDK, and sells no data.

## 4. Microphone and audio recordings

In walk mode you hear a prompt in your own language and say the target-language word. While the screen is on, recognition is performed by the device's own speech recognition service. Whether that service processes the audio on the device or sends it to the operating system provider's servers (Google or Apple) depends on the device, the language and the device settings, and is governed by that provider's own terms; this path does not go through our server. While the screen is off or the phone is in your pocket, audio is sent to our server as a 16 kHz mono recording and passed to one of the speech recognition providers listed below. The audio file is not stored on our server or at the provider; only the recognised text, the expected word and the clip length are written to the usage record.

- The microphone opens only when you start walk mode; a persistent notification is shown and you can stop it from the app.
- While the screen is off, recording runs through the background mechanism the operating system provides for this: a microphone-type foreground service on Android{{ifIos}}, a background audio session on iOS{{/ifIos}}. The system microphone indicator stays on.
- On first use a consent screen explains this processing; the mode does not start without your consent. If you decline, the microphone is never used and the rest of the app works.
- Profanity is masked in the recognition result.

### Explicit consent text (microphone)

When you press "I agree, start" in the app you give the following declaration: "I give my explicit consent to my microphone recordings in walk mode being transferred to the Lernomi server and to the speech recognition providers listed in section 6 of this policy, some of which are located abroad, for the purpose of transcribing the word I said; and to the recording being deleted as soon as the operation finishes. I know that I can withdraw this consent at any time under Settings › Privacy."

## 4a. Social features and visibility

- Your display name is visible to all users on the weekly leaderboard; if you do not want to appear there, you can leave your display name empty (you then appear as "Learner").
- Your social profile (username, bio, level, streak) is **public** by default; under Settings › Social you can set it to "friends only" or "private", and turn off friend requests and appearing in suggestions.
- The activity feed (round completion, streak milestone) is visible only to your friends; it is turned off with "show my activity".
- When you block a user, neither side sees the other; when you report someone, the record is reviewed by a human. Block and report records are not shown to the other party.
- Lernomi has no private messaging; interaction happens only through reactions, nudges and shared quests.

## 4b. Automated decision-making and profiling

The spaced repetition schedule, the content of the daily round, the level suggestion and the weekly leaderboard are computed automatically from your learning data. These are part of how the product works; they do not profile you comprehensively and produce no legal or similarly significant effect for you (there is no decision within the scope of Art. 22 GDPR). You can change the suggested level yourself at any time.

## 5. Texts processed by AI

Your speaking practice (roleplay), writing tasks and exam answers are sent to language model providers in order to generate feedback. What is sent is only the text you wrote or said and the scenario of the speaking practice; your name and e-mail are not sent. The providers operate under API terms and data processing agreements in which they undertake not to use the data for model training. The app states clearly that AI characters are not real people (transparency under Art. 50 of the EU AI Act). Answers can contain mistakes; you can send them to us with the "Report" button under each answer, and reports are reviewed by a human. Lernomi makes no decision about you that is based solely on automated processing and produces a legal effect.

## 6. Service providers that receive data, and transfers abroad

The providers below work only for the stated purpose and only with the data that task requires; none of them may use the data for their own purposes. Our servers are in Germany. The safeguard used for transfers from Türkiye to the EU and from the EU to the USA/United Kingdom is in the last column: the standard contract published by the Turkish Board under KVKK Art. 9, and standard contractual clauses or an adequacy decision under Chapter V GDPR.

{{processorsTable}}

Data is transferred to public authorities only where there is a legal obligation or a request from a competent authority, and only within the scope of that request.

## 7. Cookies and local storage

On the web only the strictly necessary session cookie is used (to remember that you are signed in, for 30 days); for that reason there is no cookie consent banner. We use no marketing or tracking cookies. Browser and app local storage holds things like theme, sound and notification preferences, avatar choice and an unfinished speaking practice; these never leave your device.

## 8. Product analytics and switching them off

To understand which features are used, Lernomi writes short usage events to its own server (e.g. "round completed"). What such an event may contain is tightly bounded:

- Event names come from a closed, predefined list.
- Each event may carry a technical label of at most 32 characters (such as "single:artikel" or "level:B1").
- The label accepts only letters, digits, underscore, colon and hyphen, and cannot consist of digits alone. It therefore cannot hold an e-mail address, a link or a phone number.
- Nothing else is sent as free text, and the events go to no third party.

You can switch this off with the "Send usage data" toggle under Settings › Privacy. This is the right to object under KVKK and Art. 21 GDPR. Once it is off, only the records strictly necessary for the service are kept.

## 8a. Commercial electronic messages

We send you only service-related messages: e-mail verification, password reset, account and security notices, and the reminders you allowed. We send no commercial electronic messages within the meaning of Turkish Law no. 6563; if we ever want to send marketing messages, we will obtain your separate consent through the Turkish Message Management System (İYS) and every message will carry an opt-out.

## 9. Retention periods

- Account and learning data: as long as the account exists; when the account is deleted, all of it is deleted.
- Speaking practice logs (the sentence you said and the model's reply): 30 days, then deleted automatically.
- Audio recordings: not kept.
- Session records (IP, device description): for the life of the session, at most 30 days.
- Financial records (subscription invoices): the period required by the Turkish Commercial Code and the Tax Procedure Law (10 years), and only to the extent Google Play passes them to us.
- Correspondence about rights requests: 2 years after the request closes.
- Server backups: deleted data drops out of the backups within {{backupRetentionDays}} days at the latest; backups are used only for disaster recovery, and a deleted account is never restored from a backup.

## 10. Your rights

Under KVKK Art. 11 and Art. 15-22 GDPR you may ask to:

- learn whether your data is processed, request information about it and receive a copy in a machine-readable format (access and portability),
- correct incomplete or inaccurate data (you can change your name and preferences yourself in Settings),
- have your data erased or destroyed (the account deletion route in section 11),
- restrict processing and object to processing based on legitimate interest (the analytics toggle),
- withdraw your explicit consent (the microphone consent; withdrawal does not affect the lawfulness of earlier processing),
- request that corrections and erasure be notified to third parties to whom the data was transferred,
- claim compensation if you suffer damage.

**Making a request:** write to {{privacyEmailEu}} for requests under the GDPR or UK GDPR, or to {{privacyEmailTr}} for requests under Turkish data protection law (KVKK); writing from the e-mail address on your account is enough to verify your identity. In Türkiye, under the Communiqué on the Procedures for Applications to the Data Controller, you may also apply in writing with a wet signature, with a qualified electronic signature, or from the e-mail address registered on your account. We resolve requests free of charge within 30 days at the latest; under the GDPR this period may be extended by two months where necessary, and you will be told.

**Complaints:** in Türkiye to the Personal Data Protection Board (kvkk.gov.tr). In the EU the controller's competent supervisory authority is, by place of establishment, the State Commissioner for Data Protection and Freedom of Information of North Rhine-Westphalia (LDI NRW). Under Art. 77 GDPR you may also complain to the authority in your own country. In the United Kingdom, the ICO. We would ask you to write to us first; we can resolve most requests directly.

## 11. Deleting your account and your data

You can delete your account in two ways: in the app under **Profile › Settings › Account › Delete account**, or on the web at [www.lernomi.app/account/delete]({{link:deleteAccount}}). At the moment of deletion your account, your progress, your texts, your speaking logs, your usage events and your social traces (friendships, reactions) are permanently deleted; this cannot be undone. Financial records subject to a statutory retention obligation are kept in anonymised form. If you have a store subscription, you need to cancel it separately in the store you bought it from.

## 12. Children

Lernomi is not designed for people under 18 and does not knowingly collect data from them; the terms of use limit account creation to people aged 18 and over (see terms, clause 3). The content is aimed at adult learners and at official language exam preparation; because the app contains open-ended AI conversation and user interaction, it is not suitable for a child audience. If we discover that someone under 18 has created an account, we delete the account and the data; parents can write to {{privacyEmailEu}}.

## 13. Security

All connections are encrypted with HTTPS. Passwords are stored as irreversible hashes. Access to the server is limited to keys; sign-in attempts are rate limited. Destructive operations such as account deletion require a password or a fresh session. In the event of a breach affecting personal data we notify the authorities (in Türkiye the Board within 72 hours) under KVKK and Art. 33-34 GDPR, and we inform you.

## 14. Changes

When we change this policy, the effective date and version on this page are updated; for a change that broadens the purposes of processing we inform you in the app and, where necessary, ask for consent again. Questions: {{privacyEmailEu}}.`,
  },
  de: {
    title: "Datenschutzerklärung",
    description: "Welche Daten Lernomi verarbeitet, warum und wie lange; deine Rechte nach DSGVO und türkischem Datenschutzrecht; Konto löschen.",
    summary: [
      "Lernomi ist eine Sprachlern-App: Deutsch, Zürichdeutsch und Englisch.",
      "Wir verarbeiten deine E-Mail-Adresse und deinen Namen für dein Konto und deine Fortschrittsdaten für dein Lernen.",
      "Im Gehmodus wird Mikrofon-Audio mit deiner ausdrücklichen Einwilligung zur Verschriftlichung gesendet. Die Aufnahme wird nicht gespeichert.",
      "Keine Werbung, keine Werbe-ID, kein Tracking durch Dritte.",
      "Du kannst dein Konto jederzeit löschen, in der App oder im Web.",
      "In Europa gelten die DSGVO-Rechte, in der Türkei die KVKK-Rechte.",
    ],
    body: `## 1. Verantwortlicher

Verantwortlicher für die von dieser Erklärung erfassten personenbezogenen Daten im Sinne des türkischen Gesetzes Nr. 6698 zum Schutz personenbezogener Daten (KVKK) und der Datenschutz-Grundverordnung der Europäischen Union (DSGVO) ist die unten bezeichnete Person. Diese Person entscheidet, welche Daten zu welchem Zweck verarbeitet, wie lange sie gespeichert und an welche Anbieter sie übermittelt werden. Die Erklärung gilt für die Lernomi-Webanwendung (www.lernomi.app) und {{platforms}}.

{{entityBlock:controller:contact}}

Die App wird von einer anderen Person in den App-Stores veröffentlicht, die auch die Abonnementeinnahmen vereinnahmt. Der Herausgeber verarbeitet personenbezogene Daten ausschließlich auf Weisung des Verantwortlichen; für die über die Play Console zugänglichen Bestell-, Abonnement- und Rezensionsdaten handelt er als **Auftragsverarbeiter**, und zwischen uns besteht dazu ein Auftragsverarbeitungsvertrag (Art. 28 DSGVO, Art. 12 KVKK).

{{entityBlock:publisher}}

Unsere Server laufen bei {{hosting}}; dort werden die Daten gespeichert. Der Verantwortliche ist nicht in der Türkei niedergelassen; für Anträge aus der Türkei und für die Korrespondenz mit der türkischen Behörde ist der oben genannte Vertreter benannt. Die Benennung eines Vertreters berührt die eigene Verantwortlichkeit des Verantwortlichen nicht.

**Art der Erhebung und Rechtsgrundlage (Art. 10 KVKK):** Die Daten werden elektronisch, automatisiert oder teilweise automatisiert über Registrierungs- und Einstellungsformulare, Interaktionen in der App und das Mikrofon erhoben; die Rechtsgrundlage für jede Angabe steht in der Tabelle in Abschnitt 3.

## 2. Wer welchem Recht unterliegt

- **Nutzer in der Türkei:** KVKK und seine Durchführungsvorschriften (Mitteilung zur Informationspflicht, Mitteilung zu Anträgen an den Verantwortlichen, Regeln zur Übermittlung ins Ausland).
- **Nutzer in der EU/im EWR:** Da der Verantwortliche in Deutschland niedergelassen ist, gilt die DSGVO nach Art. 3 Abs. 1 DSGVO zusammen mit dem BDSG; im Vereinigten Königreich gelten zusätzlich die UK GDPR und der Data Protection Act 2018. Die Rechtsgrundlagen dieser Erklärung sind Art. 6 DSGVO zugeordnet. Da der Verantwortliche in der Union niedergelassen ist, ist kein gesonderter EU-Vertreter nach Art. 27 DSGVO erforderlich.
- **Andere Länder:** Rechte aus dem örtlichen Datenschutzrecht bleiben vorbehalten (Abschnitt 10). Wir verkaufen deine personenbezogenen Daten nicht und geben sie nicht für verhaltensbasierte Werbung weiter.

## 3. Welche Daten wir verarbeiten und warum

| Daten | Herkunft | Zweck | Rechtsgrundlage (KVKK / DSGVO) | Speicherdauer |
|---|---|---|---|---|
| E-Mail-Adresse, Name, Passwort-Hash | Registrierungsformular oder dein Google-Konto | Kontoerstellung, Anmeldung, Passwort-Reset, Bestätigungs-E-Mail | Abschluss und Erfüllung eines Vertrags (Art. 5/2-c / Art. 6 Abs. 1 lit. b) | Für die Dauer des Kontos |
| Anzeigename, Avatar-Auswahl, Niveau, Kurs, Tagesziel, Stimmpräferenz | Du | Personalisierung; der Anzeigename ist für andere Nutzer in der Wochen-Rangliste sichtbar | Erfüllung eines Vertrags | Für die Dauer des Kontos |
| Lerndaten: Wortstatus, Wiederholungsergebnisse, Serie, XP, Erfolge, Ergebnisse von Sprechübungen und Prüfungen | Während der Nutzung der App | Wiederholungsplan, Fortschritt, Rangliste | Erfüllung eines Vertrags | Für die Dauer des Kontos |
| Texte, die du schreibst und sprichst (Schreibaufgaben, Sprechpraxis, Prüfungsantworten) | Du | Bewertung und Rückmeldung durch KI | Erfüllung eines Vertrags | Bewertungen für die Dauer des Kontos; Protokolle der Sprechpraxis 30 Tage |
| Mikrofon-Audio | Mikrofon im Gehmodus | Verschriftlichung des gesprochenen Wortes | Ausdrückliche Einwilligung (Art. 5/1 / Art. 6 Abs. 1 lit. a); Einwilligungsbildschirm in der App, widerruflich | Wird nicht gespeichert; nach Abschluss der Erkennung gelöscht, nur der erkannte Text bleibt |
| Nutzungsereignisse: welcher Bildschirm geöffnet wurde, Runde begonnen/beendet, Bildschirmbreite und Plattform | Die App | Verbesserung des Produkts (eigene Analyse, keine Dritten) | Berechtigtes Interesse (Art. 5/2-f / Art. 6 Abs. 1 lit. f); in den Einstellungen abschaltbar | Für die Dauer des Kontos |
| IP-Adresse und Browser-/Gerätebezeichnung (im Sitzungsdatensatz) | Deine Verbindung | Sitzungssicherheit, Missbrauchsabwehr und Ratenbegrenzung | Berechtigtes Interesse (Sicherheit) | Für die Dauer der Sitzung (höchstens 30 Tage) |
| Soziales Profil: Benutzername, Bio, Sichtbarkeits- und Anfrageeinstellungen | Du | Damit deine Freunde und — bei Sichtbarkeit "öffentlich" — andere Nutzer dich finden | Erfüllung eines Vertrags; Einwilligung für die Einstellungen | Für die Dauer des Kontos |
| Freundschaftsanfragen, Freundesliste, Blockierungen, Nutzermeldungen | Du und deine Freunde | Freundesfunktionen, Sicherheit und Moderation | Erfüllung eines Vertrags; berechtigtes Interesse (Sicherheit) | Für die Dauer des Kontos; Meldungen bis zum Abschluss der Prüfung |
| Aktivitäts-Feed, Reaktionen, Anstöße, gemeinsame Aufgaben, Posteingangs-Benachrichtigungen | Während der Nutzung der App | Teilen des Fortschritts mit deinen Freunden und Motivation (nur für deine Freunde sichtbar) | Erfüllung eines Vertrags; über die Einstellung "Aktivität zeigen" abschaltbar | Für die Dauer des Kontos |
| Web-Push-Abonnement (Browser-Endpunkt und Verschlüsselungsschlüssel) | Dein Browser, wenn du es erlaubst | Erinnerungen im Web | Einwilligung (Browser-Berechtigung) | Bis zum Widerruf der Berechtigung oder zum Ungültigwerden des Endpunkts |
| Benachrichtigungsberechtigung und Erinnerungszeit | Du | Lokale Erinnerungen (auf dem Gerät geplant, nicht an den Server gesendet) | Einwilligung | Auf dem Gerät |
| Kauf- und Abonnementstatus | App-Store / RevenueCat | Freischalten der Premium-Funktionen | Erfüllung eines Vertrags; rechtliche Verpflichtung (Buchhaltung) | Für die Dauer des Kontos; Finanzunterlagen für die gesetzliche Frist |
| Deine Inhaltsmeldungen | Du ("Melden") | Prüfung unangemessener KI-Antworten | Berechtigtes Interesse (sicherer Dienst) | Bis zum Abschluss der Prüfung |
| Support-Nachrichten und Rechteanfragen an uns | Du | Beantwortung der Anfrage, gesetzliche Dokumentation | Rechtliche Verpflichtung (Art. 13 KVKK, Art. 12 DSGVO) | 2 Jahre nach Abschluss der Anfrage |

**Was wir nicht erheben:** Standort, Kontakte, Kalender, Fotos, Werbe-ID, Geräte-ID, Absturzberichte, besondere Kategorien personenbezogener Daten. Lernomi zeigt keine Werbung, enthält kein Analyse- oder Tracking-SDK Dritter und verkauft keine Daten.

## 4. Mikrofon und Audioaufnahmen

Im Gehmodus hörst du eine Vorgabe in deiner Sprache und sprichst das Wort in der Zielsprache. Bei eingeschaltetem Bildschirm übernimmt die Erkennung der geräteeigene Spracherkennungsdienst. Ob dieser Dienst das Audio auf dem Gerät verarbeitet oder an die Server des Betriebssystemanbieters (Google oder Apple) sendet, hängt vom Gerät, von der Sprache und von den Geräteeinstellungen ab und richtet sich nach den Bedingungen dieses Anbieters; über unseren Server läuft dieser Weg nicht. Bei ausgeschaltetem Bildschirm oder wenn das Telefon in der Tasche steckt, wird das Audio als 16-kHz-Mono-Aufnahme an unseren Server gesendet und an einen der unten aufgeführten Spracherkennungsanbieter weitergegeben. Die Audiodatei wird weder auf dem Server noch beim Anbieter gespeichert; nur der erkannte Text, das erwartete Wort und die Cliplänge werden im Nutzungsdatensatz festgehalten.

- Das Mikrofon wird nur geöffnet, wenn du den Gehmodus startest; eine dauerhafte Benachrichtigung ist sichtbar, und du kannst ihn aus der App beenden.
- Bei ausgeschaltetem Bildschirm läuft die Aufnahme über den Mechanismus, den das Betriebssystem dafür vorsieht: unter Android ein Vordergrunddienst vom Typ "Mikrofon"{{ifIos}}, unter iOS eine Hintergrund-Audiositzung{{/ifIos}}. Die System-Mikrofonanzeige bleibt an.
- Beim ersten Mal erklärt ein Einwilligungsbildschirm diese Verarbeitung; ohne Einwilligung startet der Modus nicht. Erteilst du sie nicht, wird das Mikrofon nie genutzt, und der Rest der App funktioniert.
- Im Erkennungsergebnis werden Schimpfwörter maskiert.

### Text der ausdrücklichen Einwilligung (Mikrofon)

Wenn du in der App auf "Ich stimme zu, los" tippst, gibst du folgende Erklärung ab: "Ich willige ausdrücklich ein, dass meine Mikrofonaufnahmen im Gehmodus zum Zweck der Verschriftlichung des von mir gesprochenen Wortes an den Lernomi-Server und an die in Abschnitt 6 dieser Erklärung aufgeführten, teils im Ausland ansässigen Spracherkennungsanbieter übermittelt werden und dass die Aufnahme unmittelbar nach dem Vorgang gelöscht wird. Mir ist bekannt, dass ich diese Einwilligung jederzeit unter Einstellungen › Datenschutz widerrufen kann."

## 4a. Soziale Funktionen und Sichtbarkeit

- Dein Anzeigename ist für alle Nutzer in der Wochen-Rangliste sichtbar; willst du dort nicht erscheinen, kannst du den Anzeigenamen leer lassen (du erscheinst dann als "Lernende/r").
- Dein soziales Profil (Benutzername, Bio, Niveau, Serie) ist standardmäßig **öffentlich**; unter Einstellungen › Soziales kannst du es auf "nur Freunde" oder "privat" stellen und Freundschaftsanfragen sowie das Erscheinen in Vorschlägen abschalten.
- Der Aktivitäts-Feed (abgeschlossene Runde, Serien-Meilenstein) ist nur für deine Freunde sichtbar; er wird über "Aktivität zeigen" abgeschaltet.
- Blockierst du eine Person, sehen sich beide Seiten nicht mehr; meldest du jemanden, wird der Vorgang von einem Menschen geprüft. Blockier- und Meldevorgänge werden der Gegenseite nicht angezeigt.
- Lernomi hat keine privaten Nachrichten; Interaktion findet nur über Reaktionen, Anstöße und gemeinsame Aufgaben statt.

## 4b. Automatisierte Entscheidungen und Profiling

Der Wiederholungsplan, der Inhalt der Tagesrunde, der Niveauvorschlag und die Wochen-Rangliste werden automatisch aus deinen Lerndaten berechnet. Diese Berechnungen sind Teil der Funktionsweise des Produkts, erstellen kein umfassendes Profil von dir und entfalten dir gegenüber keine rechtliche oder ähnlich erhebliche Wirkung (es gibt keine Entscheidung im Sinne von Art. 22 DSGVO). Den vorgeschlagenen Niveauwert kannst du jederzeit selbst ändern.

## 5. Von KI verarbeitete Texte

Deine Sprechpraxis (Rollenspiel), Schreibaufgaben und Prüfungsantworten werden zur Erzeugung von Rückmeldungen an Anbieter von Sprachmodellen gesendet. Gesendet wird nur der von dir geschriebene oder gesprochene Text und das Szenario der Sprechübung; Name und E-Mail-Adresse werden nicht gesendet. Die Anbieter arbeiten unter API-Bedingungen und Auftragsverarbeitungsverträgen, in denen sie zusagen, die Daten nicht für Modelltraining zu verwenden. Die App weist deutlich darauf hin, dass KI-Figuren keine echten Personen sind (Transparenz nach Art. 50 der KI-Verordnung der EU). Antworten können Fehler enthalten; du kannst sie uns über die Schaltfläche "Melden" unter jeder Antwort mitteilen, und Meldungen werden von einem Menschen geprüft. Lernomi trifft über dich keine ausschließlich auf automatisierter Verarbeitung beruhende Entscheidung mit rechtlicher Wirkung.

## 6. Dienstleister, die Daten erhalten, und Übermittlung ins Ausland

Die folgenden Anbieter arbeiten nur zum angegebenen Zweck und nur mit den für diese Aufgabe erforderlichen Daten; keiner von ihnen darf die Daten für eigene Zwecke verwenden. Unsere Server stehen in Deutschland. Die für Übermittlungen aus der Türkei in die EU und aus der EU in die USA bzw. das Vereinigte Königreich verwendete Garantie steht in der letzten Spalte: der von der türkischen Behörde nach Art. 9 KVKK veröffentlichte Standardvertrag sowie Standardvertragsklauseln oder ein Angemessenheitsbeschluss nach Kapitel V DSGVO.

{{processorsTable}}

Eine Übermittlung an Behörden erfolgt nur bei einer rechtlichen Verpflichtung oder auf Verlangen einer zuständigen Stelle und nur im Umfang dieses Verlangens.

## 7. Cookies und lokale Speicherung

Im Web wird nur das unbedingt erforderliche Sitzungs-Cookie verwendet (um zu merken, dass du angemeldet bist, 30 Tage); deshalb gibt es kein Cookie-Banner. Marketing- oder Tracking-Cookies setzen wir nicht ein. In der lokalen Speicherung von Browser und App liegen Angaben wie Design-, Ton- und Benachrichtigungseinstellungen, Avatar-Auswahl und eine unterbrochene Sprechübung; diese verlassen dein Gerät nicht.

## 8. Produktanalyse und Abschalten

Um zu verstehen, welche Funktionen genutzt werden, schreibt Lernomi kurze Nutzungsereignisse auf den eigenen Server (z. B. "Runde abgeschlossen"). Was ein solches Ereignis enthalten darf, ist eng begrenzt:

- Die Ereignisnamen stammen aus einer geschlossenen, vorab festgelegten Liste.
- Jedes Ereignis kann eine technische Kennzeichnung von höchstens 32 Zeichen tragen (etwa "single:artikel" oder "level:B1").
- Die Kennzeichnung lässt nur Buchstaben, Ziffern, Unterstrich, Doppelpunkt und Bindestrich zu und darf nicht ausschließlich aus Ziffern bestehen. Sie kann daher weder eine E-Mail-Adresse noch einen Link oder eine Telefonnummer enthalten.
- Darüber hinaus wird kein Freitext gesendet, und die Ereignisse gehen an keinen Dritten.

Über den Schalter "Nutzungsdaten senden" unter Einstellungen › Datenschutz kannst du das abschalten. Das ist das Widerspruchsrecht nach KVKK und Art. 21 DSGVO. Danach werden nur die für den Dienst zwingend erforderlichen Datensätze geführt.

## 8a. Kommerzielle elektronische Nachrichten

Wir senden dir nur dienstbezogene Nachrichten: E-Mail-Bestätigung, Passwort-Reset, Konto- und Sicherheitshinweise sowie die von dir erlaubten Erinnerungen. Kommerzielle elektronische Nachrichten im Sinne des türkischen Gesetzes Nr. 6563 versenden wir nicht; sollten wir künftig Marketingnachrichten senden wollen, holen wir deine gesonderte Zustimmung über das türkische Nachrichtenverwaltungssystem (İYS) ein, und jede Nachricht enthält eine Abmeldemöglichkeit.

## 9. Speicherfristen

- Konto- und Lerndaten: solange das Konto besteht; mit der Löschung des Kontos wird alles gelöscht.
- Protokolle der Sprechpraxis (dein Satz und die Antwort des Modells): 30 Tage, danach automatische Löschung.
- Audioaufnahmen: werden nicht gespeichert.
- Sitzungsdatensätze (IP, Gerätebezeichnung): für die Dauer der Sitzung, höchstens 30 Tage.
- Finanzunterlagen (Abonnementrechnungen): die vom türkischen Handelsgesetzbuch und vom Steuerverfahrensgesetz vorgesehene Frist (10 Jahre), und nur soweit Google Play sie uns übermittelt.
- Schriftwechsel zu Rechteanfragen: 2 Jahre nach Abschluss der Anfrage.
- Server-Backups: gelöschte Daten fallen spätestens innerhalb von {{backupRetentionDays}} Tagen aus den Backups heraus; Backups dienen nur der Notfallwiederherstellung, und ein gelöschtes Konto wird nie aus einem Backup wiederhergestellt.

## 10. Deine Rechte

Nach Art. 11 KVKK und Art. 15-22 DSGVO kannst du verlangen:

- zu erfahren, ob deine Daten verarbeitet werden, Auskunft darüber zu erhalten und eine Kopie in einem maschinenlesbaren Format zu bekommen (Auskunft und Datenübertragbarkeit),
- unvollständige oder unrichtige Daten berichtigen zu lassen (Name und Einstellungen kannst du in den Einstellungen selbst ändern),
- die Löschung oder Vernichtung deiner Daten (Weg zur Kontolöschung in Abschnitt 11),
- die Einschränkung der Verarbeitung und Widerspruch gegen eine auf berechtigtem Interesse beruhende Verarbeitung (Analyse-Schalter),
- den Widerruf deiner ausdrücklichen Einwilligung (Mikrofon-Einwilligung; der Widerruf berührt die Rechtmäßigkeit der bisherigen Verarbeitung nicht),
- dass Berichtigung und Löschung den Dritten mitgeteilt werden, an die die Daten übermittelt wurden,
- Schadensersatz, wenn dir ein Schaden entstanden ist.

**Antragstellung:** Schreibe für Anträge nach DSGVO oder UK GDPR an {{privacyEmailEu}} und für Anträge nach türkischem Datenschutzrecht (KVKK) an {{privacyEmailTr}}; zur Identitätsprüfung genügt es, von der E-Mail-Adresse deines Kontos zu schreiben. In der Türkei kannst du nach der Mitteilung über das Verfahren für Anträge an den Verantwortlichen den Antrag auch schriftlich mit eigenhändiger Unterschrift, mit qualifizierter elektronischer Signatur oder von der in deinem Konto hinterlegten E-Mail-Adresse aus stellen. Wir bearbeiten Anträge kostenlos innerhalb von höchstens 30 Tagen; nach der DSGVO kann diese Frist bei Bedarf um zwei Monate verlängert werden, worüber wir dich informieren.

**Beschwerde:** in der Türkei bei der Behörde zum Schutz personenbezogener Daten (kvkk.gov.tr). In der EU ist die zuständige Aufsichtsbehörde des Verantwortlichen nach dem Ort der Niederlassung die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen (LDI NRW). Nach Art. 77 DSGVO kannst du dich auch an die Behörde in deinem eigenen Land wenden. Im Vereinigten Königreich beim ICO. Wir bitten dich, dich zuerst an uns zu wenden; die meisten Anliegen können wir direkt lösen.

## 11. Konto und Daten löschen

Du kannst dein Konto auf zwei Wegen löschen: in der App unter **Profil › Einstellungen › Konto › Konto löschen** oder im Web unter [www.lernomi.app/account/delete]({{link:deleteAccount}}). Im Moment der Löschung werden dein Konto, dein Fortschritt, deine Texte, deine Sprechprotokolle, deine Nutzungsereignisse und deine sozialen Spuren (Freundschaften, Reaktionen) dauerhaft gelöscht; das ist unwiderruflich. Finanzunterlagen, die einer gesetzlichen Aufbewahrungspflicht unterliegen, werden anonymisiert aufbewahrt. Hast du ein Store-Abonnement, musst du es zusätzlich in dem Store kündigen, in dem du es gekauft hast.

## 12. Kinder

Lernomi ist nicht für Personen unter 18 Jahren gestaltet und erhebt von ihnen wissentlich keine Daten. Die Nutzungsbedingungen beschränken die Kontoerstellung auf Personen ab 18 Jahren (siehe Nutzungsbedingungen, Ziffer 3). Die Inhalte richten sich an erwachsene Lernende und an die Vorbereitung auf offizielle Sprachprüfungen; da die App offene KI-Gespräche und Interaktion zwischen Nutzern enthält, ist sie für ein kindliches Publikum nicht geeignet. Erfahren wir, dass eine Person unter 18 Jahren ein Konto erstellt hat, löschen wir Konto und Daten; Eltern können an {{privacyEmailEu}} schreiben.

## 13. Sicherheit

Alle Verbindungen sind mit HTTPS verschlüsselt. Passwörter werden als nicht umkehrbare Hashes gespeichert. Der Zugriff auf den Server ist auf Schlüssel beschränkt; Anmeldeversuche unterliegen einer Ratenbegrenzung. Für zerstörende Vorgänge wie die Kontolöschung sind ein Passwort oder eine frische Sitzung erforderlich. Bei einer Verletzung des Schutzes personenbezogener Daten benachrichtigen wir die Behörden (in der Türkei die Behörde innerhalb von 72 Stunden) nach KVKK und Art. 33-34 DSGVO und informieren dich.

## 14. Änderungen

Wenn wir diese Erklärung ändern, werden Gültigkeitsdatum und Version auf dieser Seite aktualisiert; bei einer Änderung, die die Verarbeitungszwecke erweitert, informieren wir in der App und holen erforderlichenfalls erneut eine Einwilligung ein. Fragen: {{privacyEmailEu}}.`,
  },
};
