import type { LegalDocDefault } from "./types";

/**
 * Kullanım şartları — koddaki VARSAYILAN metin, üç dilde.
 *
 * NEREDEN GELDİ. 2026-09-09'a kadar bu metin JSX'ti (src/app/terms/page.tsx + src/content/legal/terms-{en,de}.tsx).
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
export const TERMS_DEFAULT: Record<"tr" | "en" | "de", LegalDocDefault> = {
  tr: {
    title: "Kullanım Şartları",
    description: "Lernomi'yi kullanmanın kuralları: hesap, kabul edilebilir kullanım, kullanıcı içeriği, yapay zekâ, abonelik, tüketici hakları.",
    summary: [
      "Lernomi'yi kullanarak bu sözleşmeyi kabul edersin.",
      "Hizmet Türkiye'den sunulur ve Türk hukukuna tabidir. Bulunduğun ülkenin zorunlu tüketici hakları saklıdır.",
      "Hesabın sana aittir ve başkalarına saygılı kullanılır. Yazdıkların senin kalır.",
      "Yapay zekâ yanıtları hata yapabilir.",
      "Premium abonelik uygulamayı indirdiğin mağazadan alınır ve iptali de oradan yapılır.",
    ],
    body: `## 1. Taraflar ve kabul

Bu sözleşme, aşağıda kimliği verilen taraflar ("Lernomi", "biz") ile Lernomi web uygulamasını (www.lernomi.app) ya da Android uygulamasını kullanan kişi ("sen") arasındadır. İki kişiyiz: hizmeti tasarlayan, işleten ve verinden sorumlu olan taraf ile uygulamayı mağazalarda yayımlayan ve abonelik tahsilatını yürüten taraf. Hesap açarak ya da uygulamayı kullanarak bu şartları ve [Gizlilik Politikası]({{link:privacy}})'nı kabul etmiş olursun; 6563 sayılı Kanun uyarınca bu metin sözleşme kurulmadan önce erişilebilir durumdadır ve saklanabilir. Kabul etmiyorsan uygulamayı kullanma.

{{entityBlock:controller:contact}}

{{entityBlock:publisher}}

## 2. Hizmet

Lernomi, kelime, dinleme, konuşma ve yazma pratiği sunan bir dil öğrenme uygulamasıdır: aralıklı tekrar turları, konuşmalar (anlatım ve yapay zekâ ile karşılıklı konuşma), yürüyüş modu, yazma değerlendirmesi, sınav hazırlığı, haftalık sıralama ve arkadaşlık özellikleri. Kurslar Almanca (Hochdeutsch), Zürih Almancası ve İngilizcedir; kurs listesi zamanla değişebilir ve her kursta her özellik aynı anda hazır olmayabilir. Özellikler zamanla eklenebilir, değişebilir ya da kaldırılabilir; ücretli özellikleri etkileyen değişiklikleri önceden duyururuz.

## 3. Hesap ve yaş

- Lernomi yetişkinlere yöneliktir: hesap açmak için 18 yaşını doldurmuş olman gerekir. 18 yaşından küçük olduğunu öğrendiğimiz hesapları kapatır ve verilerini sileriz.
- Hesap bilgilerin doğru olmalı; parolanı kimseyle paylaşma. Hesabınla yapılan işlemlerden sen sorumlusun; yetkisiz kullanımı fark edince bize bildir.
- Hesabını dilediğin an silebilirsin: uygulamada Profil › Ayarlar › Hesap ya da web'de [hesap silme sayfası]({{link:deleteAccount}}). Silme geri alınamaz.

## 4. Kabul edilebilir kullanım

Şunları yapamazsın:

- Görünen adında ya da paylaştığın metinlerde hakaret, nefret söylemi, taciz, cinsel içerik, başkasının kimliğine bürünme, kişisel veri ifşası ya da reklam kullanmak,
- Sıralama, seri ve görevleri otomasyon, sahte hesap ya da hile ile manipüle etmek,
- Hizmeti tersine mühendislikle çözmek, kazımak, aşırı yüklemek ya da başkalarının erişimini engellemek,
- Yapay zekâ konuşma pratiğini yasa dışı, zararlı ya da başkalarını hedef alan içerik üretmek için kullanmak,
- Uygulanan yasaları (fikri mülkiyet, kişisel veriler, yaptırımlar dâhil) ihlal etmek.

İhlalde içeriği kaldırabilir, özellikleri kısıtlayabilir ya da hesabı kapatabiliriz; kararı ve gerekçesini bildirir, itiraz için {{supportEmail}} adresini kullanabilirsin. Ciddi ihlaller önceden uyarı gerektirmez.

## 5. Senin içeriğin ve bildirme

Yazdığın metinler, söylediklerinin dökümü ve görünen adın sana aittir. Bize yalnız hizmeti sunmak için gereken, dünya çapında, münhasır olmayan ve ücretsiz bir kullanım izni verirsin: değerlendirmek, geri bildirim üretmek, seçtiğin kadarını (görünen ad, ilerleme) diğer kullanıcılara göstermek. İçeriğini reklam ya da model eğitimi için kullanmayız; hesabını silince izin sona erer.

Hukuka aykırı ya da bu şartlara aykırı bir içerik (başka bir kullanıcının adı, davranışı) gördüğünde uygulamadaki "Bildir" düğmesiyle ya da {{supportEmail}} üzerinden bildirebilirsin; AB Dijital Hizmetler Tüzüğü (DSA) kapsamındaki bildirimler için de tek iletişim noktası budur. Bildirimler insan tarafından incelenir; alınan karar ve itiraz yolu bildirene ve içerik sahibine iletilir. Arkadaşlık özelliklerinde engelleme ve bildirme düğmeleri bulunur.

## 5a. Sosyal özellikler

- Kullanıcı adı 3-20 karakter, harf, rakam ve alt çizgi; başkasının adını, markasını ya da yanıltıcı bir kimliği kullanamazsın. Uygunsuz adlar değiştirilebilir.
- Sosyal profilin varsayılan olarak herkese açıktır; görünürlüğü, arkadaşlık isteklerini ve etkinlik paylaşımını Ayarlar › Sosyal'den yönetirsin.
- Engelleme karşılıklıdır ve bildirilmez. Bildirimler insan tarafından incelenir; asılsız ya da kötü niyetli bildirimler de kural ihlalidir.
- Özel mesajlaşma yoktur; tepkiler, dürtmeler ve ortak görevler arkadaşlarınla sınırlıdır.

## 6. Yapay zekâ içeriği

- Konuşma pratiği ve değerlendirmeler dil modelleriyle üretilir; bir yapay zekâ ile etkileştiğin uygulamada açıkça belirtilir. Yanıtlar yanlış, eksik ya da tutarsız olabilir; dil bilgisi düzeltmeleri kesin doğru sayılmamalıdır.
- Rahatsız edici ya da hatalı bir yanıtı, yanıtın altındaki "Bildir" ile uygulamadan çıkmadan bildirebilirsin.
- Yapay zekâ karakterleri gerçek kişi değildir; tıbbi, hukuki ya da mali tavsiye vermezler.

## 7. Premium abonelik, ödeme ve cayma

- **Satın alma:** Premium, uygulamayı indirdiğin mağazanın kendi ödeme sistemiyle satın alınır: Android'de Google Play Faturalandırma{{ifIos}}, iOS'ta Apple uygulama içi satın alma{{/ifIos}}. Ödemeyi mağaza işler ve mağazanın kendi hizmet şartları da geçerlidir. Fiyat, para birimi, süre, deneme koşulları ve vergiler satın alma anında mağaza tarafından gösterilir; bu bilgiler 6502 sayılı Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamındaki ön bilgilendirmeyi oluşturur.
- **Yenileme ve iptal:** Abonelik, dönem sonundan en az 24 saat önce iptal edilmezse aynı süreyle yenilenir. İptal, aboneliği aldığın mağazadan yapılır: Play Store › Ödemeler ve abonelikler{{ifIos}}, iOS'ta Ayarlar › Apple Hesabı › Abonelikler{{/ifIos}}. Hesap silmek aboneliği iptal etmez. Ücretsiz deneme bitmeden iptal edersen ücret alınmaz.
- **Cayma hakkı:** Dijital içerik hizmeti satın alma anında ifa edilmeye başlandığından, Mesafeli Sözleşmeler Yönetmeliği m.15/1-ğ ve AB Tüketici Hakları Direktifi m.16(m) uyarınca cayma hakkı, ifaya başlanmasına verdiğin onayla sona erer; satın alma ekranında bu onay istenir. Mağazanın kendi iade politikası ayrıca uygulanır ve mağazanın kabul ettiği iadeleri biz de tanırız{{ifIos}} — Google Play için Play desteği, Apple için reportaproblem.apple.com{{/ifIos}}.
- **Fiyat değişikliği:** Abonelik ücreti zamanla değişebilir. Kural şu: **ödediğin dönemin fiyatı o dönem boyunca değişmez** — bir artış hiçbir zaman geriye yürümez ve yalnızca bir sonraki yenilemeden itibaren geçerli olur. Bir artıştan önce mağaza üzerinden (e-posta ve mağaza bildirimi) en az **30 gün** önceden, yeni tutar ve yürürlük tarihiyle birlikte bilgilendirilirsin. Artışın büyüklüğüne ve mağazanın kurallarına göre iki yol işler: küçük ve seyrek artışlarda abonelik, sen iptal etmediğin sürece yeni fiyatla yenilenir; bunun dışındaki artışlarda **açık onayın aranır** ve onay vermezsen abonelik yenilenmeden sona erer. Her iki durumda da yürürlük tarihinden önce iptal edersen yeni fiyat senden tahsil edilmez. Para birimi, bölge ya da vergi oranı değişikliklerinden (ör. KDV) kaynaklanan tutar farkları mağaza tarafından uygulanır ve bu maddedeki bildirim süresine tabi değildir.
- **Tanıtım fiyatları ve hediye süreler:** Ücretsiz deneme, indirimli giriş fiyatı, promosyon kodu ve davet ödülü **yalnız belirtilen süre için** geçerlidir; süre bitince standart fiyat uygulanır ve bu bilgi satın alma anında gösterilir. Hediye ya da kodla kazanılan süre bir para alacağı değildir: nakde çevrilemez, devredilemez ve gelecekteki fiyatların sabit kalacağı anlamına gelmez.
- **Satış belgesi:** Satışı mağaza yapar ve belgeyi mağaza düzenleyip mağaza hesabındaki e-posta adresine gönderir; belge talebini mağazanın desteğine iletirsin. Yayıncı bir şirket değil, gerçek kişidir ve mobil uygulama geliştiriciliği kazanç istisnası kapsamında olduğundan ayrıca fatura düzenlemez.

## 7a. Adil kullanım

Yapay zekâ ve konuşma tanıma sağlayıcı kotalarını herkes için korumak amacıyla hesap başına günlük sınırlar uygulanır: konuşma pratiği {{fairUse:roleplayTurnsPerDay}} tur, sunucu konuşma tanıma {{fairUse:sttRequestsPerDay}} istek, telaffuz puanı {{fairUse:pronounceRequestsPerDay}} istek, içerik bildirimi {{fairUse:reportsPerDay}}. Sınıra ulaşınca uygulama bunu gösterir ve ertesi gün açılır. Sınırlar dürüst ağır kullanımın çok üstündedir; yalnız otomasyon ve kötüye kullanımı engellemek içindir ve gerektiğinde güncellenebilir.

Premium'un kendi günlük adil kullanım sınırları da vardır (cepte yürüyüş turu ve yapay zekâ değerlendirmesi). Bu sınırlar ürünle birlikte ayarlandığı için burada sabit bir sayı yazılmaz; **yürürlükteki değerler uygulamadaki Premium sayfasında** açıkça gösterilir ve satın almadan önce görülebilir. Bir sınır düşürülürse değişiklik aynı sayfada duyurulur. Premium hiçbir yerde “sınırsız” olarak tanıtılmaz.

## 7b. Üçüncü taraf hizmetler

Google ile giriş (Google Hesap şartları), {{ifIos}}Apple ile giriş (Apple Hesabı şartları), {{/ifIos}}uygulamayı indirdiğin mağaza (Google Play Hizmet{{ifIos}} Şartları, Apple Media Services{{/ifIos}} Şartları ve ilgili iade politikaları) ve cihazının konuşma tanıma servisi kendi sağlayıcılarının şartlarına tabidir. Yapay zekâ ve konuşma tanıma sağlayıcıları Gizlilik Politikası'nda listelenir; bunlar bizim alt işleyicilerimizdir ve seninle doğrudan sözleşme kurmazlar.

## 8. Fikri mülkiyet

Uygulama, tasarım, maskot, ses efektleri ve öğretim içerikleri Lernomi'ye aittir ve 5846 sayılı Fikir ve Sanat Eserleri Kanunu ile uluslararası sözleşmelerle korunur. Kelime listeleri Lernomi tarafından hazırlanmıştır. Uygulamada anılan sınav adları kendi sahiplerinin markalarıdır ve Lernomi onlarla bağlı değildir. Kişisel öğrenme amacı dışında kopyalama, dağıtma ya da türev ürün yapma izni yoktur.

## 9. Hizmetin sürekliliği

Hizmeti "olduğu gibi" sunarız. Bakım, sağlayıcı kesintileri ya da kotalar nedeniyle bazı özellikler (ör. sunucu konuşma tanıma, yapay zekâ konuşma) geçici olarak kapanabilir; uygulama bunu gösterir ve mümkünse cihaz içi yedeğe geçer. Ücretli bir özelliğin uzun süreli kapalı kalması hâlinde orantılı iade ya da süre uzatımı yaparız.

## 10. Sorumluluğun sınırı

Lernomi bir öğrenme aracıdır; sınav sonucu, dil yeterliği ya da bir kararın doğruluğu için garanti vermez. Kasıt ve ağır ihmal dışında, hizmetten kaynaklanan dolaylı zararlardan sorumlu değiliz; toplam sorumluluğumuz son 12 ayda ödediğin abonelik bedeliyle sınırlıdır. Tüketici olarak Türk hukukundan ve bulunduğun ülkenin zorunlu hükümlerinden doğan hakların saklıdır; bu madde onları daraltmaz.

## 10a. Tazmin

Bu şartları ya da yürürlükteki hukuku ihlal ederek (ör. başkasının haklarını çiğneyen içerik, hizmete saldırı, hile) üçüncü kişilerin Lernomi'ye yönelttiği talep ve zararlardan, kusurun ölçüsünde sen sorumlusun. Tüketiciler için bu madde yalnız kasıt ve ağır ihmal hâlinde uygulanır.

## 11. Fesih

Hesabını istediğin zaman silebilirsin. Biz, bu şartların ihlali ya da hizmetin sona ermesi hâlinde makul bildirimle hesabı kapatabiliriz; hizmetin tümüyle sona ermesi durumunda en az 30 gün önce haber verir, verilerini indirme imkânı sunar ve kullanılmayan abonelik süresini iade ederiz.

## 12. Uygulanacak hukuk ve uyuşmazlık çözümü

Bu sözleşme Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıklarda önce {{supportEmail}} üzerinden dostane çözüm ararız. Türkiye'deki tüketiciler, parasal sınırlar dâhilinde Tüketici Hakem Heyetlerine ve tüketici mahkemelerine başvurabilir; diğer uyuşmazlıklarda {{court}} mahkemeleri ve icra daireleri yetkilidir. AB ve Birleşik Krallık'ta yerleşik tüketicilerin, bulundukları ülkenin zorunlu tüketici hükümlerinden ve kendi ülkelerinin mahkemelerine başvurma hakkından doğan hakları etkilenmez; diğer ülkelerdeki kullanıcılar için yerel zorunlu hükümler saklıdır.

## 12a. Mücbir sebep

Doğal afet, savaş, salgın, geniş çaplı internet ya da altyapı kesintisi, sağlayıcı iflası ve idari kararlar gibi tarafların kontrolü dışındaki olaylar süresince yükümlülükler askıya alınır; 30 günü aşan kesintide her iki taraf sözleşmeyi feshedebilir ve kullanılmayan abonelik süresi iade edilir.

## 12b. Genel hükümler

- **Bütünlük:** Bu şartlar, Gizlilik Politikası ve satın alma ekranındaki ön bilgilendirme taraflar arasındaki sözleşmenin tamamıdır.
- **Bölünebilirlik:** Bir hükmün geçersiz sayılması diğerlerini etkilemez; geçersiz hüküm amacına en yakın geçerli hükümle değiştirilmiş sayılır.
- **Devir:** Hesabını ve bu sözleşmeden doğan haklarını başkasına devredemezsin. Biz, hizmetin devri ya da faaliyetin bir şirket yapısına taşınması hâlinde sözleşmeyi, haklarını koruyarak ve sana bildirerek devredebiliriz.
- **Feragat:** Bir hakkın kullanılmaması ondan vazgeçildiği anlamına gelmez.
- **Dil:** Sözleşmenin bağlayıcı dili Türkçedir; çeviriler bilgi içindir. Yorum farkında Türkçe metin esas alınır.
- **Tebligat:** Bize yapılacak bildirimler {{supportEmail}} adresine; sana yapılacak bildirimler hesabındaki e-posta adresine ya da uygulama içi mesajla yapılır ve ulaştığı anda tebliğ edilmiş sayılır.
- **Saklama:** Bu sözleşme elektronik ortamda saklanır; kabul ettiğin sürümü ve tarihini isteyebilirsin.

## {{ifIos}}13a. Apple App Store için ek koşullar

Uygulamayı App Store'dan indirdiysen aşağıdaki maddeler de geçerlidir. Bunlar Apple'ın kendi EULA'sını kullanmayan geliştiricilerden istediği asgari koşullardır ve yalnız Apple sürümü için uygulanır; çelişki hâlinde bu bölüm öncelikli olur.

- **Sözleşmenin tarafları:** Bu sözleşme yalnız seninle bizim aramızdadır, Apple ile değil. Uygulamadan ve içeriğinden yalnız biz sorumluyuz.
- **Lisansın kapsamı:** Uygulamayı, App Store Hizmet Şartları'ndaki Kullanım Kuralları çerçevesinde, sahibi ya da kullanıcısı olduğun Apple marka cihazlarda kullanman için devredilemez bir lisans veriyoruz.
- **Bakım ve destek:** Bakım ve destekten yalnız biz sorumluyuz; Apple'ın böyle bir yükümlülüğü yoktur.
- **Garanti:** Garantiden yalnız biz sorumluyuz. Uygulama geçerli bir garantiye uymazsa durumu Apple'a bildirebilirsin; Apple satın alma bedelini iade eder ve bunun ötesinde bir garanti yükümlülüğü taşımaz.
- **Talepler:** Uygulamaya ilişkin taleplerin (ürün sorumluluğu, hukuka uygunluk, tüketici koruması ve gizlilik dâhil) muhatabı Apple değil biziz.
- **Fikri mülkiyet:** Uygulamanın üçüncü bir kişinin fikri mülkiyet hakkını ihlal ettiği iddiasında araştırma, savunma ve uzlaşma yalnız bize aittir.
- **Hukuka uygunluk:** Uygulamayı kullanarak, ABD ambargosu uygulanan ya da ABD tarafından "terörizmi destekleyen" olarak belirlenmiş bir ülkede bulunmadığını ve ABD'nin yasaklı taraflar listelerinde yer almadığını beyan edersin.
- **İletişim:** Soru, şikâyet ve taleplerin için 1. bölümdeki iletişim bilgileri geçerlidir.
- **Üçüncü taraf şartları:** Uygulamayı kullanırken geçerli üçüncü taraf şartlarına da uymayı kabul edersin.
- **Üçüncü taraf lehtar:** Apple ve bağlı şirketleri bu sözleşmenin üçüncü taraf lehtarıdır ve koşullarını sana karşı ileri sürme hakkına sahiptir.

## {{/ifIos}}13. Değişiklikler ve iletişim

Şartları güncellediğimizde yürürlük tarihi ve sürüm değişir; senin aleyhine olan önemli değişiklikleri en az 30 gün önce uygulama içinde ve e-postayla duyururuz, kabul etmezsen hesabını kapatabilirsin. Sorular için: {{supportEmail}}.`,
  },
  en: {
    title: "Terms of Use",
    description: "The rules for using Lernomi: account, acceptable use, user content, AI, subscription, consumer rights.",
    summary: [
      "By using Lernomi you accept this agreement.",
      "The service is provided from Türkiye and governed by Turkish law. The mandatory consumer rights of your own country are unaffected.",
      "Your account is yours, and is used with respect for others. What you write stays yours.",
      "AI answers can be wrong.",
      "Premium is bought in the store you downloaded the app from, and cancelled there.",
    ],
    body: `## 1. Parties and acceptance

This agreement is between the parties identified below ("Lernomi", "we") and the person using the Lernomi web app (www.lernomi.app) or Android app ("you"). There are two of us: the person who designs and operates the service and is responsible for your data, and the person who publishes the app on Google Play and collects the subscription revenue. By creating an account or using the app you accept these terms and the [Privacy Policy]({{link:privacy}}). Under Turkish Law no. 6563 this text is accessible and can be stored before the contract is concluded. If you do not accept it, do not use the app.

{{entityBlock:controller:contact}}

{{entityBlock:publisher}}

## 2. The service

Lernomi is a language learning app offering vocabulary, listening, speaking and writing practice: spaced repetition rounds, speaking practices (explanation and a conversation with AI), walk mode, writing assessment, exam preparation, a weekly leaderboard and friend features. The courses are German (Hochdeutsch), Zurich German and English; the course list may change over time and not every feature is ready in every course at the same time. Features may be added, changed or removed; we announce changes affecting paid features in advance.

## 3. Account and age

- Lernomi is intended for adults: you must be 18 or older to create an account. We close accounts we learn belong to someone under 18 and delete their data.
- Your account details must be accurate; never share your password. You are responsible for activity on your account; tell us if you notice unauthorised use.
- You can delete your account at any time: in the app under Profile › Settings › Account, or on the web via the [account deletion page]({{link:deleteAccount}}). Deletion cannot be undone.

## 4. Acceptable use

You may not:

- use insults, hate speech, harassment, sexual content, impersonation, disclosure of personal data or advertising in your display name or in any text you share,
- manipulate the leaderboard, streaks or quests through automation, fake accounts or cheating,
- reverse engineer, scrape or overload the service, or block others' access to it,
- use the AI speaking practice to produce unlawful or harmful content, or content targeting other people,
- breach applicable law, including intellectual property, personal data and sanctions rules.

In case of a breach we may remove content, restrict features or close the account; we tell you the decision and its reason, and you can appeal at {{supportEmail}}. Serious breaches do not require prior warning.

## 5. Your content and reporting

The texts you write, the transcripts of what you say and your display name are yours. You grant us only the worldwide, non-exclusive, royalty-free licence needed to provide the service: to assess your work, generate feedback and show as much as you choose (display name, progress) to other users. We do not use your content for advertising or model training; the licence ends when you delete your account.

If you see content that is unlawful or breaches these terms (another user's name or behaviour), you can report it with the "Report" button in the app or at {{supportEmail}}; this is also the single point of contact for notices under the EU Digital Services Act (DSA). Reports are reviewed by a human; the decision and the route of appeal are communicated to the reporter and to the content owner. The friend features include block and report buttons.

## 5a. Social features

- A username is 3-20 characters of letters, digits and underscores; you may not use someone else's name, a trademark or a misleading identity. Inappropriate names may be changed.
- Your social profile is public by default; you manage visibility, friend requests and activity sharing under Settings › Social.
- Blocking is mutual and is not notified. Reports are reviewed by a human; false or malicious reports are themselves a breach of the rules.
- There is no private messaging; reactions, nudges and shared quests are limited to your friends.

## 6. AI content

- Speaking practice and assessments are produced by language models; the app states clearly where you are interacting with an AI. Answers can be wrong, incomplete or inconsistent; grammar corrections must not be treated as definitive.
- You can report an offensive or incorrect answer without leaving the app, using "Report" under that answer.
- AI characters are not real people; they do not give medical, legal or financial advice.

## 7. Premium subscription, payment and withdrawal

- **Purchase:** Premium is bought through the payment system of the store you downloaded the app from: Google Play Billing on Android{{ifIos}}, Apple in-app purchase on iOS{{/ifIos}}. Payment is processed by the store and the store's own terms of service also apply. Price, currency, term, trial conditions and taxes are shown by the store at the moment of purchase; this information constitutes the pre-contractual information required by Turkish Law no. 6502 and the Distance Contracts Regulation.
- **Renewal and cancellation:** Unless cancelled at least 24 hours before the end of the term, the subscription renews for the same period. You cancel in the store you bought it from: Play Store › Payments and subscriptions{{ifIos}}, or Settings › Apple Account › Subscriptions on iOS{{/ifIos}}. Deleting your account does not cancel the subscription. If you cancel before a free trial ends, you are not charged.
- **Right of withdrawal:** Because performance of a digital content service begins at the moment of purchase, under Art. 15/1-ğ of the Distance Contracts Regulation and Art. 16(m) of the EU Consumer Rights Directive the right of withdrawal ends with your consent to performance beginning; that consent is requested on the purchase screen. The store's own refund policy applies in addition, and we honour refunds the store grants{{ifIos}} — Play support for Google Play, reportaproblem.apple.com for Apple{{/ifIos}}.
- **Price changes:** The subscription price can change over time. The rule is this: **the price you paid holds for the period you paid for** — an increase never applies retroactively and only takes effect from the next renewal. Before an increase you are notified through the store (e-mail and store notification) at least **30 days** in advance, with the new amount and the date it takes effect. Depending on the size of the increase and the store's rules, one of two paths applies: for small, infrequent increases the subscription renews at the new price unless you cancel; for anything beyond that **your explicit consent is required**, and without it the subscription simply ends instead of renewing. In both cases, if you cancel before the effective date you are not charged the new price. Amount differences caused by a change of currency, region or tax rate (for example VAT) are applied by the store and are not subject to the notice period in this clause.
- **Promotional prices and gifted time:** A free trial, a discounted introductory price, a promo code and a referral reward are valid **only for the stated period**; when it ends the standard price applies, and this is shown at the time of purchase. Time gained from a gift or a code is not a monetary claim: it cannot be cashed out or transferred, and it does not mean future prices are fixed.
- **Proof of purchase:** The sale is made by the store, which issues the receipt and sends it to the e-mail address on your store account; you can request a copy from the store's support. The publisher is not a company but a natural person, and because the earnings fall within the Turkish income tax exemption for mobile application development, no separate invoice is issued.

## 7a. Fair use

To protect AI and speech recognition provider quotas for everyone, daily per-account limits apply: {{fairUse:roleplayTurnsPerDay}} speaking practice turns, {{fairUse:sttRequestsPerDay}} server speech recognition requests, {{fairUse:pronounceRequestsPerDay}} pronunciation scoring requests and {{fairUse:reportsPerDay}} content reports. When you reach a limit the app says so and it reopens the next day. The limits sit far above honest heavy use; they exist only to stop automation and abuse and may be updated when needed.

Premium has its own daily fair-use limits too (pocket-walk rounds and AI evaluations). Because these are tuned together with the product, no fixed number is written here; **the values in force are shown on the Premium page in the app** and can be seen before you buy. If a limit is lowered, the change is announced on that same page. Premium is never advertised as “unlimited”.

## 7b. Third-party services

Sign-in with Google (Google Account terms), {{ifIos}}Sign in with Apple (Apple Account terms), {{/ifIos}}the store you downloaded the app from (Google Play Terms of Service{{ifIos}}, Apple Media Services Terms{{/ifIos}} and the relevant refund policies) and your device's speech recognition service are subject to their own providers' terms. The AI and speech recognition providers are listed in the Privacy Policy; they are our sub-processors and do not enter into a contract with you directly.

## 8. Intellectual property

The app, its design, the mascot, the sound effects and the learning content belong to Lernomi and are protected by Turkish Law no. 5846 on Intellectual and Artistic Works and by international conventions. The word lists were compiled by Lernomi. Any exam names mentioned in the app are trademarks of their respective owners and Lernomi is not affiliated with them. Copying, distributing or making derivative works is not permitted beyond personal learning use.

## 9. Continuity of the service

We provide the service "as is". Maintenance, provider outages or quotas can temporarily disable some features (e.g. server speech recognition, AI conversation); the app shows this and falls back to the on-device alternative where possible. If a paid feature stays unavailable for a long period, we give a proportionate refund or extend the term.

## 10. Limitation of liability

Lernomi is a learning tool; it gives no guarantee about an exam result, a level of language proficiency or the correctness of a decision. Except for intent and gross negligence, we are not liable for indirect damage arising from the service; our total liability is limited to the subscription fees you paid in the last 12 months. Your rights as a consumer under Turkish law and under the mandatory provisions of your country of residence are unaffected; this clause does not narrow them.

## 10a. Indemnity

If third parties bring claims against Lernomi because you breached these terms or applicable law (e.g. content infringing someone else's rights, an attack on the service, cheating), you are responsible for those claims and damages to the extent of your fault. For consumers this clause applies only in cases of intent and gross negligence.

## 11. Termination

You can delete your account whenever you like. We may close an account with reasonable notice if these terms are breached or if the service ends; should the service end entirely, we give at least 30 days' notice, offer a way to download your data and refund the unused part of any subscription.

## 12. Governing law and dispute resolution

This agreement is governed by the law of the Republic of Türkiye. In a dispute we first seek an amicable solution via {{supportEmail}}. Consumers in Türkiye may apply, within the applicable monetary thresholds, to the Consumer Arbitration Committees and the consumer courts; for other disputes the courts and enforcement offices of {{court}} have jurisdiction. The rights of consumers resident in the EU and the United Kingdom under the mandatory consumer provisions of their country and their right to bring proceedings before their own courts are unaffected; for users in other countries local mandatory provisions are reserved.

## 12a. Force majeure

Obligations are suspended for the duration of events beyond the parties' control, such as natural disaster, war, epidemic, large-scale internet or infrastructure outage, provider insolvency and administrative decisions; if an interruption exceeds 30 days either party may terminate the agreement and the unused subscription period is refunded.

## 12b. General provisions

- **Entire agreement:** These terms, the Privacy Policy and the pre-contractual information on the purchase screen form the whole of the agreement between the parties.
- **Severability:** If a provision is held invalid, the others are unaffected; the invalid provision is deemed replaced by the valid provision closest to its purpose.
- **Assignment:** You may not assign your account or your rights under this agreement. We may assign the agreement in the event of a transfer of the service or if the activity is moved into a company structure, preserving your rights and notifying you.
- **Waiver:** Not exercising a right does not mean waiving it.
- **Language:** The binding language of the agreement is Turkish; translations are for information. In case of a difference in interpretation, the Turkish text prevails.
- **Notices:** Notices to us go to {{supportEmail}}; notices to you go to the e-mail address on your account or as an in-app message, and are deemed served upon arrival.
- **Retention:** This agreement is stored electronically; you may request the version you accepted and its date.

## {{ifIos}}13a. Additional terms for the Apple App Store

If you downloaded the app from the App Store, the following also applies. These are the minimum terms Apple requires from developers who do not use Apple's own EULA; they apply to the Apple version only and prevail in case of conflict.

- **Parties:** This agreement is between you and us only, not with Apple. We alone are responsible for the app and its content.
- **Scope of the licence:** We grant you a non-transferable licence to use the app on Apple-branded devices that you own or control, within the Usage Rules of the App Store Terms of Service.
- **Maintenance and support:** We alone are responsible for maintenance and support; Apple has no such obligation.
- **Warranty:** We alone are responsible for any warranty. If the app fails to conform to an applicable warranty you may notify Apple, and Apple will refund the purchase price; beyond that Apple has no warranty obligation.
- **Claims:** Claims relating to the app — including product liability, legal compliance, consumer protection and privacy — are addressed to us, not to Apple.
- **Intellectual property:** If a third party claims the app infringes their intellectual property rights, investigation, defence and settlement are ours alone.
- **Legal compliance:** By using the app you represent that you are not located in a country subject to a US embargo or designated by the US as "terrorist supporting", and that you are not on any US list of prohibited parties.
- **Contact:** For questions, complaints and claims, the contact details in section 1 apply.
- **Third-party terms:** You agree to comply with applicable third-party terms when using the app.
- **Third-party beneficiary:** Apple and its subsidiaries are third-party beneficiaries of this agreement and have the right to enforce it against you.

## {{/ifIos}}13. Changes and contact

When we update these terms, the effective date and version change; we announce material changes to your detriment at least 30 days in advance in the app and by e-mail, and you may close your account if you do not accept them. Questions: {{supportEmail}}.`,
  },
  de: {
    title: "Nutzungsbedingungen",
    description: "Die Regeln für die Nutzung von Lernomi: Konto, zulässige Nutzung, Nutzerinhalte, KI, Abonnement, Verbraucherrechte.",
    summary: [
      "Mit der Nutzung von Lernomi nimmst du diese Vereinbarung an.",
      "Der Dienst wird aus der Türkei angeboten und unterliegt türkischem Recht. Die zwingenden Verbraucherrechte deines Landes bleiben unberührt.",
      "Dein Konto gehört dir und wird respektvoll gegenüber anderen genutzt. Was du schreibst, bleibt dein.",
      "KI-Antworten können falsch sein.",
      "Premium wird in dem Store gekauft, aus dem du die App geladen hast, und dort gekündigt.",
    ],
    body: `## 1. Parteien und Annahme

Diese Vereinbarung besteht zwischen den unten bezeichneten Parteien ("Lernomi", "wir") und der Person, die die Lernomi-Webanwendung (www.lernomi.app) oder die Android-App nutzt ("du"). Wir sind zwei Personen: diejenige, die den Dienst gestaltet, betreibt und für deine Daten verantwortlich ist, und diejenige, die die App bei Google Play veröffentlicht und die Abonnementeinnahmen vereinnahmt. Mit der Erstellung eines Kontos oder der Nutzung der App nimmst du diese Bedingungen und die [Datenschutzerklärung]({{link:privacy}}) an. Nach dem türkischen Gesetz Nr. 6563 ist dieser Text vor Vertragsschluss zugänglich und speicherbar. Wenn du ihn nicht annimmst, nutze die App nicht.

{{entityBlock:controller:contact}}

{{entityBlock:publisher}}

## 2. Der Dienst

Lernomi ist eine Sprachlern-App mit Übungen zu Wortschatz, Hören, Sprechen und Schreiben: Wiederholungsrunden nach dem Spaced-Repetition-Prinzip, Sprechübungen (Erklärung und Dialog mit KI), Gehmodus, Schreibbewertung, Prüfungsvorbereitung, eine Wochen-Rangliste und Freundesfunktionen. Die Kurse sind Deutsch (Hochdeutsch), Zürichdeutsch und Englisch; die Kursliste kann sich im Laufe der Zeit ändern, und nicht jede Funktion ist in jedem Kurs gleichzeitig verfügbar. Funktionen können hinzugefügt, geändert oder entfernt werden; Änderungen, die bezahlte Funktionen betreffen, kündigen wir vorher an.

## 3. Konto und Alter

- Lernomi richtet sich an Erwachsene: Für ein Konto musst du mindestens 18 Jahre alt sein. Konten, von denen wir erfahren, dass sie einer Person unter 18 gehören, schließen wir und löschen die Daten.
- Deine Kontodaten müssen richtig sein; gib dein Passwort niemals weiter. Für Aktivitäten über dein Konto bist du verantwortlich; melde uns unbefugte Nutzung.
- Du kannst dein Konto jederzeit löschen: in der App unter Profil › Einstellungen › Konto oder im Web über die [Seite zur Kontolöschung]({{link:deleteAccount}}). Die Löschung ist unwiderruflich.

## 4. Zulässige Nutzung

Untersagt ist:

- Beleidigungen, Hassrede, Belästigung, sexuelle Inhalte, Identitätsvortäuschung, Offenlegung personenbezogener Daten oder Werbung im Anzeigenamen oder in Texten, die du teilst,
- die Rangliste, Serien und Aufgaben durch Automatisierung, Fake-Konten oder Betrug zu manipulieren,
- den Dienst zu reverse-engineeren, zu scrapen, zu überlasten oder den Zugang anderer zu blockieren,
- die KI-Sprechpraxis zu nutzen, um rechtswidrige, schädliche oder gegen andere gerichtete Inhalte zu erzeugen,
- geltendes Recht zu verletzen, einschließlich Urheberrecht, Datenschutzrecht und Sanktionsvorschriften.

Bei einem Verstoß können wir Inhalte entfernen, Funktionen einschränken oder das Konto schließen; wir teilen dir die Entscheidung und ihre Begründung mit, und du kannst unter {{supportEmail}} Widerspruch einlegen. Schwere Verstöße erfordern keine Vorwarnung.

## 5. Deine Inhalte und Meldungen

Die Texte, die du schreibst, die Transkripte dessen, was du sprichst, und dein Anzeigename gehören dir. Du erteilst uns nur das weltweite, nicht ausschließliche und unentgeltliche Nutzungsrecht, das zur Erbringung des Dienstes erforderlich ist: bewerten, Rückmeldung erzeugen und so viel wie du auswählst (Anzeigename, Fortschritt) anderen Nutzern zeigen. Wir nutzen deine Inhalte nicht für Werbung oder Modelltraining; mit der Löschung deines Kontos endet das Nutzungsrecht.

Wenn du einen rechtswidrigen oder diesen Bedingungen widersprechenden Inhalt siehst (Name oder Verhalten eines anderen Nutzers), kannst du ihn über die Schaltfläche "Melden" in der App oder unter {{supportEmail}} melden; dies ist auch die einzige Kontaktstelle für Meldungen nach dem EU-Gesetz über digitale Dienste (DSA). Meldungen werden von einem Menschen geprüft; Entscheidung und Rechtsbehelf werden der meldenden Person und dem Inhaber des Inhalts mitgeteilt. Die Freundesfunktionen enthalten Schaltflächen zum Blockieren und Melden.

## 5a. Soziale Funktionen

- Ein Benutzername besteht aus 3-20 Zeichen (Buchstaben, Ziffern, Unterstrich); den Namen einer anderen Person, eine Marke oder eine irreführende Identität darfst du nicht verwenden. Unangemessene Namen können geändert werden.
- Dein soziales Profil ist standardmäßig öffentlich; Sichtbarkeit, Freundschaftsanfragen und das Teilen von Aktivität verwaltest du unter Einstellungen › Soziales.
- Blockieren wirkt beidseitig und wird nicht mitgeteilt. Meldungen werden von einem Menschen geprüft; unwahre oder missbräuchliche Meldungen sind selbst ein Regelverstoß.
- Es gibt keine privaten Nachrichten; Reaktionen, Anstöße und gemeinsame Aufgaben sind auf deine Freunde beschränkt.

## 6. KI-Inhalte

- Sprechpraxis und Bewertungen werden von Sprachmodellen erzeugt; die App weist deutlich darauf hin, wo du mit einer KI interagierst. Antworten können falsch, unvollständig oder widersprüchlich sein; Grammatikkorrekturen dürfen nicht als endgültig richtig gelten.
- Eine anstößige oder fehlerhafte Antwort kannst du ohne die App zu verlassen über "Melden" unter der Antwort melden.
- KI-Figuren sind keine echten Personen; sie erteilen keine medizinische, rechtliche oder finanzielle Beratung.

## 7. Premium-Abonnement, Zahlung und Widerruf

- **Kauf:** Premium wird über das Zahlungssystem des Stores gekauft, aus dem du die App geladen hast: unter Android über Google Play Billing{{ifIos}}, unter iOS über den Apple In-App-Kauf{{/ifIos}}. Die Zahlung wickelt der Store ab, und dessen eigene Nutzungsbedingungen gelten zusätzlich. Preis, Währung, Laufzeit, Testbedingungen und Steuern zeigt der Store im Moment des Kaufs an; diese Angaben bilden die vorvertragliche Information nach dem türkischen Gesetz Nr. 6502 und der Fernabsatzverordnung.
- **Verlängerung und Kündigung:** Wird das Abonnement nicht mindestens 24 Stunden vor Ende der Laufzeit gekündigt, verlängert es sich um denselben Zeitraum. Gekündigt wird in dem Store, in dem du gekauft hast: Play Store › Zahlungen und Abos{{ifIos}}, unter iOS Einstellungen › Apple-Account › Abonnements{{/ifIos}}. Das Löschen des Kontos kündigt das Abonnement nicht. Kündigst du vor Ende einer kostenlosen Testphase, fällt keine Gebühr an.
- **Widerrufsrecht:** Da die Erbringung eines digitalen Inhaltsdienstes im Moment des Kaufs beginnt, endet das Widerrufsrecht nach Art. 15/1-ğ der türkischen Fernabsatzverordnung und Art. 16(m) der EU-Verbraucherrechterichtlinie mit deiner Zustimmung zum Beginn der Erbringung; diese Zustimmung wird auf dem Kaufbildschirm eingeholt. Die Rückerstattungsrichtlinie des jeweiligen Stores gilt zusätzlich, und von ihm gewährte Rückerstattungen erkennen wir an{{ifIos}} — für Google Play der Play-Support, für Apple reportaproblem.apple.com{{/ifIos}}.
- **Preisänderung:** Der Abopreis kann sich mit der Zeit ändern. Die Regel lautet: **Der bezahlte Preis gilt für den bezahlten Zeitraum** — eine Erhöhung wirkt nie rückwirkend und greift erst ab der nächsten Verlängerung. Vor einer Erhöhung wirst du über den Store (E-Mail und Store-Benachrichtigung) mindestens **30 Tage** vorher informiert, mit dem neuen Betrag und dem Datum des Inkrafttretens. Je nach Höhe der Erhöhung und den Regeln des Stores gilt einer von zwei Wegen: Bei kleinen, seltenen Erhöhungen verlängert sich das Abo zum neuen Preis, sofern du nicht kündigst; darüber hinaus ist **deine ausdrückliche Zustimmung erforderlich**, und ohne sie endet das Abo, statt sich zu verlängern. In beiden Fällen wird dir der neue Preis nicht berechnet, wenn du vor dem Stichtag kündigst. Betragsunterschiede durch geänderte Währung, Region oder Steuersätze (etwa die Mehrwertsteuer) setzt der Store um; sie unterliegen nicht der Frist in dieser Klausel.
- **Aktionspreise und geschenkte Laufzeit:** Eine kostenlose Testphase, ein vergünstigter Einführungspreis, ein Aktionscode und eine Einladungsprämie gelten **nur für den angegebenen Zeitraum**; danach gilt der Standardpreis, und das wird beim Kauf angezeigt. Durch Geschenk oder Code gewonnene Laufzeit ist kein Geldanspruch: Sie ist weder auszahlbar noch übertragbar und bedeutet nicht, dass künftige Preise festgeschrieben sind.
- **Kaufbeleg:** Den Verkauf tätigt der Store; er stellt den Beleg aus und sendet ihn an die E-Mail-Adresse deines Store-Kontos. Eine Kopie kannst du beim Support des Stores anfordern. Der Herausgeber ist keine Gesellschaft, sondern eine natürliche Person; da die Einkünfte unter die türkische Einkommensteuerbefreiung für die Entwicklung mobiler Anwendungen fallen, wird keine gesonderte Rechnung ausgestellt.

## 7a. Fair Use

Um die Kontingente der KI- und Spracherkennungsanbieter für alle zu schützen, gelten tägliche Grenzen pro Konto: {{fairUse:roleplayTurnsPerDay}} Runden Sprechpraxis, {{fairUse:sttRequestsPerDay}} serverseitige Spracherkennungsanfragen, {{fairUse:pronounceRequestsPerDay}} Anfragen zur Aussprachebewertung und {{fairUse:reportsPerDay}} Inhaltsmeldungen. Ist eine Grenze erreicht, zeigt die App es an, und am nächsten Tag ist sie wieder offen. Die Grenzen liegen weit über ehrlicher intensiver Nutzung; sie bestehen nur, um Automatisierung und Missbrauch zu verhindern, und können bei Bedarf angepasst werden.

Auch Premium hat eigene tägliche Fair-Use-Grenzen (Geh-Runden in der Tasche und KI-Bewertungen). Da sie gemeinsam mit dem Produkt justiert werden, steht hier keine feste Zahl; **die geltenden Werte werden auf der Premium-Seite in der App** angezeigt und sind vor dem Kauf einsehbar. Wird eine Grenze gesenkt, wird die Änderung auf derselben Seite bekannt gegeben. Premium wird nirgends als „unbegrenzt“ beworben.

## 7b. Dienste Dritter

Die Anmeldung mit Google (Google-Konto-Bedingungen), {{ifIos}}die Anmeldung mit Apple (Apple-Account-Bedingungen), {{/ifIos}}der Store, aus dem du die App geladen hast (Google Play-Nutzungsbedingungen{{ifIos}}, Apple-Media-Services-Bedingungen{{/ifIos}} und die jeweiligen Rückerstattungsrichtlinien) und der Spracherkennungsdienst deines Geräts unterliegen den Bedingungen ihrer jeweiligen Anbieter. Die KI- und Spracherkennungsanbieter sind in der Datenschutzerklärung aufgeführt; sie sind unsere Unterauftragsverarbeiter und schließen keinen Vertrag direkt mit dir.

## 8. Geistiges Eigentum

Die App, das Design, das Maskottchen, die Soundeffekte und die Lerninhalte gehören Lernomi und sind durch das türkische Gesetz Nr. 5846 über geistige und künstlerische Werke sowie durch internationale Abkommen geschützt. Die Wortlisten wurden von Lernomi erstellt. Die in der App genannten Prüfungsnamen sind Marken ihrer jeweiligen Inhaber, und Lernomi ist nicht mit ihnen verbunden. Über den persönlichen Lerngebrauch hinaus ist Kopieren, Verbreiten oder das Erstellen abgeleiteter Werke nicht erlaubt.

## 9. Verfügbarkeit des Dienstes

Wir stellen den Dienst "wie besehen" bereit. Wartung, Anbieterausfälle oder Kontingente können einzelne Funktionen zeitweise abschalten (z. B. serverseitige Spracherkennung, KI-Gespräch); die App zeigt das an und weicht, wo möglich, auf die geräteinterne Alternative aus. Bleibt eine bezahlte Funktion längere Zeit abgeschaltet, erstatten wir anteilig oder verlängern die Laufzeit.

## 10. Haftungsbeschränkung

Lernomi ist ein Lernwerkzeug; es gibt keine Garantie für ein Prüfungsergebnis, ein Sprachniveau oder die Richtigkeit einer Entscheidung. Außer bei Vorsatz und grober Fahrlässigkeit haften wir nicht für mittelbare Schäden aus dem Dienst; unsere Gesamthaftung ist auf die in den letzten 12 Monaten von dir gezahlten Abonnementgebühren begrenzt. Deine Rechte als Verbraucher nach türkischem Recht und nach den zwingenden Vorschriften deines Wohnsitzlandes bleiben unberührt; diese Ziffer schränkt sie nicht ein.

## 10a. Freistellung

Machen Dritte gegenüber Lernomi Ansprüche geltend, weil du diese Bedingungen oder geltendes Recht verletzt hast (z. B. Inhalte, die Rechte anderer verletzen, ein Angriff auf den Dienst, Betrug), haftest du im Umfang deines Verschuldens für diese Ansprüche und Schäden. Für Verbraucher gilt diese Ziffer nur bei Vorsatz und grober Fahrlässigkeit.

## 11. Beendigung

Du kannst dein Konto jederzeit löschen. Wir können ein Konto mit angemessener Vorankündigung schließen, wenn diese Bedingungen verletzt werden oder der Dienst endet; endet der Dienst vollständig, kündigen wir dies mindestens 30 Tage vorher an, bieten eine Möglichkeit zum Herunterladen deiner Daten und erstatten die nicht genutzte Abonnementlaufzeit.

## 12. Anwendbares Recht und Streitbeilegung

Diese Vereinbarung unterliegt dem Recht der Republik Türkei. Bei Streitigkeiten suchen wir zunächst über {{supportEmail}} eine gütliche Lösung. Verbraucher in der Türkei können sich innerhalb der geltenden Wertgrenzen an die Verbraucherschlichtungsausschüsse und die Verbrauchergerichte wenden; für sonstige Streitigkeiten sind die Gerichte und Vollstreckungsbehörden in {{court}} zuständig. Die Rechte von in der EU und im Vereinigten Königreich wohnhaften Verbrauchern aus den zwingenden Verbraucherschutzvorschriften ihres Landes und ihr Recht, die Gerichte ihres eigenen Landes anzurufen, bleiben unberührt; für Nutzer in anderen Ländern gelten die dortigen zwingenden Vorschriften.

## 12a. Höhere Gewalt

Für die Dauer von Ereignissen außerhalb der Kontrolle der Parteien — Naturkatastrophe, Krieg, Epidemie, großflächiger Internet- oder Infrastrukturausfall, Insolvenz eines Anbieters, behördliche Entscheidungen — sind die Pflichten ausgesetzt; dauert eine Unterbrechung länger als 30 Tage, kann jede Partei die Vereinbarung beenden, und die nicht genutzte Abonnementlaufzeit wird erstattet.

## 12b. Allgemeine Bestimmungen

- **Vollständigkeit:** Diese Bedingungen, die Datenschutzerklärung und die vorvertragliche Information auf dem Kaufbildschirm bilden die gesamte Vereinbarung zwischen den Parteien.
- **Salvatorische Klausel:** Ist eine Bestimmung unwirksam, bleiben die übrigen unberührt; die unwirksame Bestimmung gilt als durch die wirksame Bestimmung ersetzt, die ihrem Zweck am nächsten kommt.
- **Übertragung:** Du darfst dein Konto und deine Rechte aus dieser Vereinbarung nicht übertragen. Wir dürfen die Vereinbarung bei einer Übertragung des Dienstes oder bei Überführung der Tätigkeit in eine Gesellschaftsform übertragen, wobei deine Rechte gewahrt bleiben und wir dich informieren.
- **Verzicht:** Die Nichtausübung eines Rechts bedeutet keinen Verzicht darauf.
- **Sprache:** Verbindliche Sprache der Vereinbarung ist Türkisch; Übersetzungen dienen der Information. Bei Auslegungsunterschieden ist der türkische Text maßgebend.
- **Zustellung:** Mitteilungen an uns gehen an {{supportEmail}}; Mitteilungen an dich gehen an die E-Mail-Adresse deines Kontos oder erfolgen als Nachricht in der App und gelten mit Zugang als zugestellt.
- **Aufbewahrung:** Diese Vereinbarung wird elektronisch aufbewahrt; du kannst die von dir angenommene Fassung und ihr Datum anfordern.

## {{ifIos}}13a. Zusätzliche Bedingungen für den Apple App Store

Hast du die App aus dem App Store geladen, gilt zusätzlich Folgendes. Das sind die Mindestbedingungen, die Apple von Entwicklern verlangt, die nicht Apples eigene EULA verwenden; sie gelten nur für die Apple-Fassung und gehen im Widerspruchsfall vor.

- **Vertragsparteien:** Diese Vereinbarung besteht nur zwischen dir und uns, nicht mit Apple. Für die App und ihre Inhalte sind allein wir verantwortlich.
- **Umfang der Lizenz:** Wir gewähren dir eine nicht übertragbare Lizenz zur Nutzung der App auf Apple-Geräten, die du besitzt oder kontrollierst, im Rahmen der Nutzungsregeln der App Store-Nutzungsbedingungen.
- **Wartung und Support:** Für Wartung und Support sind allein wir verantwortlich; Apple trifft keine solche Pflicht.
- **Gewährleistung:** Für die Gewährleistung sind allein wir verantwortlich. Entspricht die App einer geltenden Gewährleistung nicht, kannst du Apple benachrichtigen; Apple erstattet den Kaufpreis und trifft darüber hinaus keine Gewährleistungspflicht.
- **Ansprüche:** Ansprüche im Zusammenhang mit der App — einschließlich Produkthaftung, Rechtskonformität, Verbraucherschutz und Datenschutz — richten sich an uns, nicht an Apple.
- **Geistiges Eigentum:** Macht ein Dritter geltend, die App verletze seine Rechte des geistigen Eigentums, obliegen Prüfung, Verteidigung und Beilegung allein uns.
- **Rechtskonformität:** Mit der Nutzung der App versicherst du, dich nicht in einem Land zu befinden, das einem US-Embargo unterliegt oder von den USA als "terrorismusunterstützend" eingestuft wird, und auf keiner US-Liste verbotener Parteien zu stehen.
- **Kontakt:** Für Fragen, Beschwerden und Ansprüche gelten die Kontaktangaben in Abschnitt 1.
- **Bedingungen Dritter:** Du verpflichtest dich, bei der Nutzung der App die geltenden Bedingungen Dritter einzuhalten.
- **Begünstigte Dritte:** Apple und seine Tochtergesellschaften sind begünstigte Dritte dieser Vereinbarung und berechtigt, sie dir gegenüber durchzusetzen.

## {{/ifIos}}13. Änderungen und Kontakt

Wenn wir diese Bedingungen aktualisieren, ändern sich Gültigkeitsdatum und Version; wesentliche Änderungen zu deinem Nachteil kündigen wir mindestens 30 Tage vorher in der App und per E-Mail an, und du kannst dein Konto schließen, wenn du sie nicht annimmst. Fragen: {{supportEmail}}.`,
  },
};
