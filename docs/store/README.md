# Mağaza kaydı: vitrin metinleri ve kareler

İki mağazanın vitrin metinlerinin (açıklama, altyazı, kısa açıklama, anahtar kelime, tanıtım
metni, abonelik açıklamaları) tek kaynağı bu belge; metin değişirse önce burası, sonra aynı
yolla mağaza. Açık konsol işleri `docs/store/audit.md`'de. Ekran görüntüleri de burada
üretiliyor:

| Klasör | Ne | Depoda mı |
|---|---|---|
| `raw/<cihaz>/<set>/light/<ekran>.png` | Ham ekran görüntüleri (cihaz: `iphone`, `ipad`, `android-phone`, `android-tablet`; set: `tr-de`, `en-de`, `de-en`), yalnız karelerin kullandığı ekranlar, kayıpsız sıkıştırılmış | **Evet** — yeniden üretilemez, cihaz ve giriş yapılmış hesap ister |
| `raw/iphone/review/` | App Store abonelik inceleme görseli (Premium ekranı, plan listesi görünür; misafir oturumunda, İngilizce) | **Evet** |
| `plan/frames.json` | Mağaza ölçüleri, kare sırası, altyazılar (tr/en/de), büyüteç kırpımları | **Evet** |
| `out/` | Üretilen kareler + `_sheets/` kontrol tabakaları | Hayır — `.gitignore`'da, tek komutla yeniden üretilir |

## Vitrin kararları (2026-09-25)

Samet'le soru-cevapla verildi. `plan/frames.json` bu bölümün kare sırasını ve altyazılarını
uyguluyor; çelişirse bu bölüm geçerli. Kareler bu tanımla üretiliyor (durum aşağıda "Açık"). Karar değişirse
bu bölüm güncellenir, yeni belge açılmaz.

**Konumlandırma.** Lernomi bir *dil* uygulaması; Almanca ilk ve en güçlü kurs (vitrin adı
"Almanca Öğren A1-C1" ASO için), İngilizce ikinci planda ama açıklamada anılır: "tek dil
uygulaması" izlenimi verilmez. Ana vaat **gerçek dil eğitimi** (tam müfredat, konuşarak,
Türkçe anlatım); sınav bu eğitimin sonucu olarak ikinci katman. Sınava hazırlanan kitle
(tarihi olan öğrenci) ayrıca WhatsApp/Telegram grup kampanyasıyla (2 ay) hedefleniyor;
kampanya vitrinde YOK (görselde fiyat/süreli teklif olmaz), grup sayfasında.

**Altyazı / tek cümle:** **"Konuş, anla, sınava hazırlan"** (tr, 28 karakter; iOS subtitle,
Play kısa açıklamanın ilk cümlesi). en-US: **"Speak, understand, exam-ready"** (29) ·
de-DE: **"Reden, verstehen, prüfungsfit"** (29). 2026-10-05'te eski "ace exams" / "bestehen"
yerine geldi: ikisi sınav geçme vaadi sayılabiliyordu (denetim M14 kapandı) ve vitrin provasında
sınava hazırlanmayan okur ilk cümlede kendini bulamadı. "Sprechen, verstehen, prüfungsfit" 32
karakter, iOS altyazı sınırı 30.

**Play kısa açıklaması (tr, 70):** "Konuş, anla, sınava hazırlan: sıfırdan C1'e Almanca, Türkçe anlatımla." (iOS altyazısıyla aynı cümleyle başlar.)

**Sayılar (2026-09-25, Samet):** birim KELİME + ALIŞTIRMA + DENEME SINAVI; adım/ünite sayısı
anılmaz. Yuvarlak ve doğru: Almanca "8.500'den fazla kelime, 900'den fazla alıştırma, **50'den fazla
deneme sınavı**" (Samet: içerik artacak, "60" ve seviye başına kesin sayı "her seviyede 12" YAZILMAZ);
İngilizce "7.000'den fazla kelime, 900'den fazla alıştırma, 50'den fazla deneme sınavı". Ölçüm
(2026-09-26): Almanca 8.704 kelime (depo), 1.370 alıştırma, 60 deneme sınavı; İngilizce 7.165 /
1.250 / 60 (alıştırma ve sınav canlı içerik sürümünden, sorgu `docs/play/listing.md` §3.0).
2026-09-29 yeniden ölçüldü, aynı (kelimeler canlı `words` tablosundan). İçerik azalırsa bu cümleler
gözden geçirilir.

**Konuşma adımının vitrindeki anlatımı (Samet'in seçtiği metin):** "Komşunla tanışırken, doktorda,
ev bakarken, iş görüşmesinde, toplantıda… Gerçek hayatta karşına çıkacak durumları yapay zekâ karakteriyle
konuşarak çalışırsın. Hatanı hemen düzeltir, takıldığında ne diyebileceğini önerir." Ücretsizde
seviye başına sınırlı olduğu için "ücretsiz ve sınırsız" denmez.

**Açıklama metni kararları (2026-09-25):** her iddia koda, canlı ayara ve içeriğe göre
doğrulanır, gerekirse metin değişir (Samet'in kuralı). Doğrulanmış tr taslağı ve 32
satırlık kanıt tablosu oturum çıktısında; kararlar:
- Deneme süresi açıkça: "yeni abonelere ilk ay ücretsiz" (FREE_TRIAL 1 ay: ASC'de 175 bölge,
  satış 173'ünde, Çin ve Rusya kapalı; Play'de 173 bölge; yalnız daha önce abone olmamışa).
- "HESAPSIZ BAŞLA" paragrafı kalıyor (hesapsız başlama, ilerlemenin hesaba taşınması, aynı
  hesap telefon/tablet/web, hesap isteyen özellikler).
- Ücretsiz haklar "bitir + seri" mekaniğiyle somut anlatılır (2026-09-25 kararı, kod varsayılanı:
  seviye başına Patika 2 Konuşma + 2 Yazma, Beceriler 2 konuşma + 2 yazma, 1 deneme sınavı;
  açık olanları bitirip 7 günlük seri yapınca +2 / deneme +1, sonra her 7 günlük seride
  yeniden; kademe tavanı yok; haftalık yenilenen hak KALKTI). Panelde sayı değişirse metin de.
- Düzeltilen yanlış/yanıltıcı iddialar: sohbet "daha doğal söyleyiş önermez" (yalnız dil
  bilgisi düzeltir + takılınca 3 öneri; `src/lib/conversations/chat.ts` üslup kuralı); Premium'da
  da deneme sınavları üçerli paketlerle sırayla açılır (`computePacks`); deneme sınavında
  bölüm sonucu yüzde + "Ölçüm hedeflerine göre" çubukları + yapılacaklar listesi, incelemede
  hata→düzeltme (yazma/konuşmada 745930f5'ten beri görev puanlarıyla, denetim T14/T15; rubrik
  ölçütü çubukları yalnız beceri turu ve modül sınavında);
  aralıklı tekrar SM-2 türevi ("unutmadan önce", "tam unutmak üzereyken" DEĞİL); kulaklık
  zorunlu değil. Metinde Android/Google Play adı geçmez (App Store 2.3.10).
- KARAR VERİLDİ (2026-09-25, `docs/premium/README.md` §2): konuşmanın yapay zekâ sohbeti artık
  Patika'nın **Konuşma** adımı ve ücretsizde seviye başına 2 + "bitir + seri"; hak yoksa adım
  kilitli ve Premium ister. Misafir ve yapay zekâ iznini reddeden senaryolu konuşmayla devam
  eder (maliyetsiz). Premium tavanı 300 mesaj/gün KALIYOR. Metin sohbeti "ücretsiz ve
  sınırsız" diye anmaz.

**Vitrin provası düzeltmeleri (2026-10-05, Samet onayladı):** altı hedef kişiliğin (dil modeli
canlandırması, gerçek kullanıcı değil) vitrin okumasından. Üç uzun açıklamada ve landing'de:
- Ücretsiz olan girişte bir cümleyle söylenir (tr "Kelime, okuma, dinleme ve dil bilgisi ücretsiz;
  reklam yok."); ÜCRETSİZ ve PREMIUM bölümleri İNGİLİZCE/HESAPSIZ'dan önceye alındı; sondaki
  "Reklam yok." girişe taşındı. Hak kuralı tek cümle: "2'şer konuşma ve yazma çalışması …
  bitirip 7 günlük seri yapınca yeni haklar eklenir" (+2 / +1 sayıları vitrinde yok, uygulamada var).
- Premium'un günlük sayıları vitrinden çıktı: "Günlük adil kullanım sınırları Premium sayfasında
  yazar." Sayılar paywall'da satın almadan önce görünüyor (`plan.pro_fair_use`), şartlar §7a oraya
  yönlendiriyor; "sınırsız" denmiyor (3.1.2(a)). Paket cümlesi: "sırayla, 3'er 3'er açılır".
- Mikrofon cümlesi gizlilik politikasının özet satırıyla birebir (HESAPSIZ BAŞLA sonunda; metin
  kuralı aşağıda).
- Sahneler: "ev bakarken, maaş görüşmesinde" (iki kursta da var: `de-b1-besichtigung`,
  `de-b1-gehalt`, `de-b2-gehaltsverhandlung`, `en-b1-viewing`, `en-b1-salary-talk`,
  `en-b2-the-salary-conversation`); A1 düzeyindeki "yol sorarken" çıktı.
- (2. tur ile değişti, aşağıda) Deneme sınavları "her CEFR seviyesinde" yazıyordu.

**Vitrin provası 2. tur (2026-10-05, bağımsız ve şüpheci değerlendirici; Samet onayladı):**
- "Sıfırdan" (en "from zero", de "von null"): açıklamanın ilk cümlesi, tanıtım metni, Play kısa açıklama,
  ilk kare, landing hero ve meta açıklama. A1 kursu ilk selamlaşmadan başlıyor (`de-a1-hallo`,
  `en-a1-hello`); "A1–C1" adda ve bölüm başlığında kalıyor. iOS anahtar kelime: tr `sıfırdan`
  (`kurs`, `seviye` çıktı), en `beginner` (`words` çıktı), de `anfänger` (`test` çıktı).
- Deneme sınavı sayısı Premium'la aynı cümlede (2.3.2): "Her seviyede 1 deneme sınavı ücretsiz;
  Premium'da toplamda 50'den fazla." Tanıtım metni artık 50+ yerine "her seviyede ücretsiz bir deneme
  sınavı" diyor. "CEFR" vitrinden çıktı (Türkçe okura bir şey anlatmıyordu).
- Ücretsiz hak sayısı geri geldi, tek cümlede: "2'şer hak ve 1 deneme sınavı daha" (`gates.ts`
  `streakBonus` 2, `mockStreakBonus` 1; panelde değişirse metin de).
- Sahneler A1'den işe: "Komşunla tanışırken, doktorda, ev bakarken, iş görüşmesinde, toplantıda"
  (iki kursta var: `de-a1-hallo`/`en-a1-hello`, `de-a2-meeting`/`en-a2-meeting`). Konuşmaya
  çekinen için: "sohbette yazarak da cevap verirsin" (sohbet ekranında yazı kutusu var).
- Veri: "Sunucular AB'de; sohbet kayıtların 30 gün sonra silinir" (`SPEECH_LOG_RETENTION_DAYS`,
  gizlilik §9 "Sohbet kayıtları"). Yer için "Uygulama karşındakinin yapay zekâ olduğunu ekranda
  söyler" cümlesi çıktı (açıklama zaten "yapay zekâ karakteri" diyor; bildirim uygulamada duruyor),
  ilk satırdaki altyazı tekrarı çıktı, günlük tur paragrafı kısaldı.
- Kareler: 1. kare "Sıfırdan C1'e, Türkçe anlatımla" / "Seviyeni seç ya da kısa testle bul"
  (altyazı tekrarı yerine yeni bilgi). 3. kare alt satırı "Her seviyede 1'i ücretsiz, tümü
  Premium'da". 4. kare görüntüsü ekran açık yürüyüş girişi olduğu için başlık ona uyduruldu:
  "Ekrana bakmadan, yolda çalış" / "Günde 3 tur ücretsiz, ekran kapalıyken Premium" (kilit ekranı
  karesi M10 gerçek cihaz doğrulamasından sonra).

**Beş sütun (öncelik sırası):** 1) **A1'den C1'e adım adım**, Türkçe anlatım ("müfredat" ve "tam" kullanılmaz) · 2) konuşarak
öğren: gerçek hayattan durumlarda yapay zekâ karakteriyle sohbet + konuşmaya geri bildirim · 3) dört becerili deneme sınavları,
konuşma ve yazma da puanlanır · 4) Cepte yürüyüş (ekran kapalı, **Premium**; ekran açık
yürüyüş ücretsizde günde 3 tur, `plan.free_walk`) · 5) günlük kelime turu ve seri.

**Kare listesi (iPhone 6.9" ve Play telefon, bu sırayla; ilk üçü aramada görünür):**

| # | Sütun | Ekran | İçerik durumu (çekimde hazırlanacak) | Altyazı taslağı |
|---|---|---|---|---|
| 1 | A1'den C1'e adım adım | Patika: A1→C1 ünite haritası (Okuma, Dinleme, Konuşma, Yazma, Dil bilgisi, Quiz, Sınav) | B1'de ilerleyen hesap; A1–A2 tamamlanmış görünür | Sıfırdan C1'e, Türkçe anlatımla · Seviyeni seç ya da kısa testle bul (2026-10-05; önce: A1'den C1'e adım adım, Türkçe anlatımla) |
| 2 | Konuşma | Patika › Konuşma adımı: sahne sohbeti | Gerçek bir sahne (ör. B1 doktor randevusu); kullanıcının cümlesi ve düzeltmesi görünür; yapay zekâ bildirimi görünür | Konuş, düzeltmeni anında gör |
| 3 | Sınav | Deneme sınavı sonucu | B1 deneme sınavı, yazma ya da konuşma bölümünün sonucu: bölüm yüzdesi, "Ölçüm hedeflerine göre" çubukları (görev puanlarından, 745930f5) ve yapılacaklar listesi; incelemede hata→düzeltme. Yeni etiketler ("yapay zekâ puanlar") build 11 ile: çekim build 11+ ile | Konuşma ve yazma da puanlanır · Her seviyede 1'i ücretsiz, tümü Premium'da (2026-10-05) |
| 4 | Fark | Cepte yürüyüş + kilit ekranı | Ekran kapalı akış; kilit ekranında "Yürüyüş modu açık" | Ekrana bakmadan, yolda çalış · Günde 3 tur ücretsiz, ekran kapalıyken Premium (2026-10-05; ham görüntü ekran açık giriş) |
| 5 | Alışkanlık | Günlük kelime turu | Sesli tur, kalan kelime sayısı | Her gün, unutmadan önce |
| 6 | Beceriler | Beceri kütüphanesi | Beş beceri kartı | Okuma, dinleme, yazma, konuşma, dil bilgisi |

**iPad 13" (yatay, 4 kare):** 1, 2, 3 ve 6 (tablet içerik kolonu en iyi bu ekranlarda).

**Kurallar (değişmedi):** her vitrin kendi dilinde çekilir (tr-TR: Türkçe arayüz + Almanca
kurs; en-US: İngilizce arayüz + Almanca kurs; de-DE: Almanca arayüz + İngilizce kurs);
gerçek hesap, yer tutucu veri yok; sınav markası yok; Premium özellik altyazıda "Premium"
der (2.3.2). Aşağıdaki "Kurallar" bölümü de geçerli.

**Görsel çerçeve (2026-09-26, Samet onayladı; denetim M15).** Hedef kitle 18+ ve Play'de
"çocuklara çekici değil" beyanı var; Google'ın ret ölçütü "çocuksu animasyon ya da genç karakter".
Tasarım bu çerçeveyle yapılır:
- **İkon:** mirket ikonu kalır (sade, stilize, tek yetişkin figür). Vitrindeki maskot payının bir
  kısmını ikon zaten kullanıyor.
- **Play öne çıkan grafik (1024×500):** ana unsur gerçek bir uygulama ekranı, telefon çerçevesinde
  (Konuşma adımı ya da deneme sınavı). Yazı "Konuş, anla, sınava hazırlan" + A1–C1 işareti.
  Mirket varsa köşede, yüksekliğin en fazla üçte biri, sakin pozda; konfeti, yıldız, konuşma
  balonu, zıplama yok. Zemin marka turuncusu ya da koyu nötr; pastel/gökkuşağı paleti ve
  yuvarlak çizgi film yazı tipi yok.
- **Ekran görüntüleri:** maskot yalnız gerçek arayüzde göründüğü yerde (Öğren ekranındaki günlük
  tur kutusu); ayrıca eklenmez. Sahneler yetişkin hayatından (iş görüşmesi, doktor, resmî daire,
  kira, seyahat); okul ve çocuk sahnesi yok. Oyunlaştırma (XP, lig, seri) en fazla bir karede ve
  ana mesaj olmadan.
- **Altyazılar** beceri ve sonuç anlatır; "eğlenceli", "oyun", "çocuk" geçmez.
- Vitrin videoları tr-de için hazır (2026-10-02, aşağıda "Vitrin videosu"): App Preview ve Play tanıtım
  videosu. Play ön plan servisi beyanı videosu ayrı iş: gerçek cihazda, kilit ekranıyla (AND-3).

**Onaylanan Türkçe uzun açıklama (App Store + Play ortak, 2026-09-25):** 41 iddia koda, canlı
ayara ve içeriğe karşı doğrulandı (kanıt tablosu oturum çıktısında). Kararlar: belge her yerde
"başarı belgesi"; seri kademesi tavansız ("sonra her 7 günlük seride yeniden" doğru); fiyat
cümlesi yok (mağaza ve paywall gösteriyor). Karakter: 3973/4000 (2026-10-05, 2. tur). Anlatım ekranda yazı, sesli okunan yalnız öğrenilen dil ("okursun"). Paragraflar
tek satır: Console'a yapıştırınca satır ortasında kırılmasın.

```text
Lernomi ile Almancayı sıfırdan C1'e, Türkçe anlatımla ve konuşarak öğren. Kelime ezberinde kalmazsın: dili kullanırsın, konuşmana ve yazına geri bildirim alırsın, hazır olduğunda deneme sınavlarıyla kendini ölçersin. Kelime, okuma, dinleme ve dil bilgisi ücretsiz; reklam yok.

A1'DEN C1'E ADIM ADIM
Almancada 8.500'den fazla kelime ve 900'den fazla alıştırma. Patika seni seviye seviye, ünite ünite ilerletir: her ünitede okuma, dinleme, konuşma, yazma, dil bilgisi ve quiz adımları var; modül ve seviye sınavlarıyla nerede olduğunu görürsün. Başlangıç seviyeni kendin seçebilir ya da kısa bir seviye testiyle bulabilirsin. Dili biraz biliyorsan Beceriler'de istediğin seviyeden alıştırma yaparsın.

KONUŞARAK ÖĞREN
Komşunla tanışırken, doktorda, ev bakarken, iş görüşmesinde, toplantıda… Gerçek hayatta karşına çıkacak durumları yapay zekâ karakteriyle konuşarak çalışırsın. Hatanı hemen düzeltir, takıldığında ne diyebileceğini önerir. Konuşmaya çekiniyorsan sohbette yazarak da cevap verirsin. Konuşma adımı Türkçe bir anlatımla başlar: kullanacağın kalıpları önce kendi dilinde okursun. İstersen sonunda puanlı konuşmayı denersin.

DÖRT BECERİLİ DENEME SINAVLARI
Her seviyede 1 deneme sınavı ücretsiz; Premium'da toplamda 50'den fazla. Her birinde okuma, dinleme, yazma ve konuşma bölümleri ve bölüm başına süre var. Okuma ve dinleme otomatik puanlanır; yazma ve konuşma cevaplarını yapay zekâ puanlar ve hatalarını düzeltmeleriyle gösterir. Sonunda başarı yüzdeni ve neye çalışman gerektiğini gösteren bir liste alırsın.

CEPTE YÜRÜYÜŞ
Yürüyüş modunda ekrana bakmadan çalışırsın: Türkçe ipucunu duyar, kelimeyi sesli söylersin. Ücretsizde ekran açıkken günde 3 tur. Telefon cebindeyken, ekran kapalıyken de süren Cepte yürüyüş Premium'da.

HER GÜN BİRKAÇ DAKİKA
Günlük kelime turunda aralıklı tekrar, kelimeleri unutmadan önce yeniden karşına çıkarır. Pratikte istediğin kadar tekrar edersin; haftalık quiz, seri ve arkadaşlarla lig de var.

ÜCRETSİZ
Kelime çalışma, pratik, okuma, dinleme, dil bilgisi ve quiz ücretsiz ve sınırsız. Haftalık quiz, ekran açık yürüyüş ve her seviyede 1 deneme sınavı da ücretsiz. Her seviyede Patika'da ve Beceriler'de 2'şer konuşma ve yazma çalışması açık; bunları bitirip 7 günlük seri yapınca 2'şer hak ve 1 deneme sınavı daha açılır, her yeni 7 günlük seride yine.

PREMIUM
Ekran kapalı Cepte yürüyüş, tüm deneme sınavları, Patika ve Beceriler'de bütün konuşma ve yazma çalışmaları, seri ve bitirme beklemeden. Deneme sınavları sırayla, 3'er 3'er açılır. Günlük adil kullanım sınırları Premium sayfasında yazar.
Premium aylık ya da yıllık, otomatik yenilenen bir aboneliktir ve aynı hesapla telefonda, tablette ve web'de geçerlidir. Yeni abonelere ilk ay ücretsiz; deneme bitmeden iptal edersen ücret alınmaz. Dönem bitiminden en az 24 saat önce iptal edilmezse abonelik yenilenir; aboneliğini satın aldığın mağazanın hesap ayarlarından yönetebilir ya da iptal edebilirsin.

İNGİLİZCE DE VAR
Aynı yapıda İngilizce kursu: A1'den C1'e 7.000'den fazla kelime, 900'den fazla alıştırma ve 50'den fazla deneme sınavı.

HESAPSIZ BAŞLA
Hesap açmadan başlayabilirsin. Hesap oluşturunca ilerlemen hesabına taşınır; telefonda, tablette ve web'de aynı hesapla devam edersin. Arkadaşlar ve lig, yapay zekâyla sohbet, yapay zekâ değerlendirmesi ve Premium hesap ister; hesapsızken Konuşma adımı önceden hazırlanmış bir sohbetle sürer. Metnin yapay zekâya ancak iznini verirsen gider. Mikrofon yalnız konuşarak cevap verdiğinde açılır. Sesin sunucuya yalnız izninle gönderilir ve kayıt saklanmaz. Sunucular AB'de; sohbet kayıtların 30 gün sonra silinir.

Modül ve seviye sınavlarını geçince neler yapabildiğini gösteren, paylaşabileceğin bir başarı belgesi alırsın. Deneme sınavlarını Lernomi hazırladı; Lernomi hiçbir sınav kurumuyla bağlantılı değildir, belgeler resmî bir sertifika yerine geçmez.

Hesabını uygulamanın içinden silebilirsin.

Kullanım Şartları: https://www.lernomi.app/terms
Gizlilik Politikası: https://www.lernomi.app/privacy
```

**Onaylanan en-US ve de-DE uzun açıklamaları (Samet onayladı, 2026-09-25):** aynı yapı, kendi kitlesine uyarlanmış
(en-US: İngilizce konuşup Almanca öğrenen; de-DE: Almanca konuşup İngilizce öğrenen). Her arayüzde tek
kurs sunulduğu için "öteki kurs" paragrafı yok. Vitrine özgü iddialar doğrulandı (anlatım dili,
sahneler, bağlantılar). Almanca metinde Beceriler "Fertigkeiten" (Samet'in kararı, uygulamayla aynı).
Haftalık quiz de en/de çevrili (kilitli `quiznative/*` paketleri); "explained in English /
Erklärungen auf Deutsch" iddiası her içerik türü için doğru.

en-US (3982/4000):

```text
Learn German from zero to C1 with Lernomi: explained in English, practiced by speaking. Go beyond word lists: use the language, get feedback on your speaking and writing, and test yourself with mock exams when you're ready. Vocabulary, reading, listening and grammar are free, with no ads.

A1 TO C1, STEP BY STEP
More than 8,500 German words and more than 900 exercises. The Path takes you level by level, unit by unit: every unit has Reading, Listening, Speaking, Writing, Grammar and Quiz steps, and module and level exams show you where you stand. Pick your starting level yourself or find it with a short placement test. Already know some German? Practice at any level in Skills.

LEARN BY SPEAKING
Meeting your neighbor, at the doctor's, viewing an apartment, in a job interview, in a meeting… Practice real-life situations by talking with an AI character. It corrects your mistakes right away and suggests what you could say when you get stuck. Shy about speaking? Type your answers in the chat. Each Speaking step opens with a short intro in English to the phrases you'll use. If you like, finish with a scored round.

FOUR-SKILL MOCK EXAMS
1 free mock exam per level; more than 50 in total with Premium. Each has Reading, Listening, Writing and Speaking sections, each with its own time limit. Reading and Listening are scored automatically; AI scores your written and spoken answers and shows your mistakes with corrections. At the end you get your score as a percentage and a list of what to work on.

POCKET WALKING
In Walk mode you study without looking at the screen: you hear the English cue and say the German word out loud. Free: 3 rounds a day with the screen on. Pocket Walking, with your phone in your pocket and the screen off, is Premium.

A FEW MINUTES A DAY
In the daily word round, spaced repetition brings words back before you forget them. Review as much as you like in Practice; a weekly quiz, streaks and a league with friends are there too.

FREE
Vocabulary, practice, reading, listening, grammar and quizzes are free and unlimited. The weekly quiz, Walk mode with the screen on and 1 mock exam per level are free too. At every level, 2 speaking and 2 writing tasks are open in both Path and Skills; finish them and reach a 7-day streak to unlock 2 more of each and 1 more mock exam, then again with every further 7-day streak.

PREMIUM
Pocket Walking with the screen off, every mock exam, and every Speaking and Writing step in Path plus all speaking and writing assessments in Skills, with no waiting for streaks or finishing. Mock exams unlock in order, 3 at a time. Daily fair-use limits are listed on the Premium page.
Premium is a monthly or yearly auto-renewing subscription and works with the same account on phone, tablet and the web. New subscribers get the first month free; cancel before the trial ends and you won't be charged. It renews unless canceled at least 24 hours before the end of the period; manage or cancel it in the account settings of the store you bought it from.

START WITHOUT AN ACCOUNT
Start without an account. Create one later and your progress moves into it; continue on phone, tablet and the web with the same account. Friends and leagues, AI conversation, AI feedback and Premium need an account; without one, the Speaking step runs as a prepared conversation. Your text is only sent to the AI if you allow it. The microphone opens only when you answer by speaking. Audio reaches the server only with your permission, and the recording is not kept. Servers are in the EU; conversation logs are deleted after 30 days.

Pass module and level exams to earn a certificate of achievement you can share, showing what you can do. The mock exams are Lernomi's own; Lernomi is not affiliated with any exam provider, and certificates of achievement are not official certificates.

You can delete your account right in the app.

Terms of Use: https://www.lernomi.app/terms/en
Privacy Policy: https://www.lernomi.app/privacy/en
```

de-DE (3989/4000):

```text
Lerne mit Lernomi Englisch von null bis C1, mit Erklärungen auf Deutsch und durch Sprechen. Statt nur Vokabeln zu pauken, benutzt du die Sprache, bekommst Feedback zu Sprechen und Schreiben und misst dich mit Probeprüfungen. Vokabeln, Lesen, Hören und Grammatik: kostenlos, ohne Werbung.

VON A1 BIS C1, SCHRITT FÜR SCHRITT
Mehr als 7.000 Wörter und mehr als 900 Übungen. Der Pfad führt dich Niveau für Niveau, Einheit für Einheit: Jede Einheit hat die Schritte Lesen, Hören, Sprechen, Schreiben, Grammatik und Quiz; Modul- und Niveauprüfungen zeigen, wo du stehst. Dein Startniveau wählst du selbst oder per kurzem Einstufungstest. Mit Vorkenntnissen übst du bei den Fertigkeiten auf jedem Niveau.

LERNEN DURCH SPRECHEN
Beim Kennenlernen der Nachbarn, beim Arzt, bei der Wohnungsbesichtigung, im Vorstellungsgespräch, im Meeting … Alltagssituationen übst du im Gespräch mit einer KI-Figur. Sie korrigiert Fehler sofort und schlägt dir etwas vor, wenn du nicht weiterweißt. Im Chat kannst du auch schriftlich antworten. Jeder Sprechen-Schritt beginnt mit einer kurzen Einführung der Wendungen auf Deutsch. Am Ende kannst du dich bewerten lassen.

PROBEPRÜFUNGEN IN VIER FERTIGKEITEN
1 Probeprüfung pro Niveau kostenlos, mit Premium insgesamt mehr als 50. Jede hat die Teile Lesen, Hören, Schreiben und Sprechen mit eigener Zeit. Lesen und Hören werden automatisch bewertet; Geschriebenes und Gesprochenes bewertet eine KI und zeigt deine Fehler mit Korrektur. Am Ende siehst du dein Ergebnis in Prozent und woran du arbeiten solltest.

TASCHEN-GEHMODUS
Im Gehmodus lernst du ohne Blick aufs Display: Du hörst den deutschen Hinweis und sagst das englische Wort laut. Kostenlos: 3 Runden pro Tag bei eingeschaltetem Bildschirm. Der Taschen-Gehmodus mit ausgeschaltetem Bildschirm gehört zu Premium.

JEDEN TAG EIN PAAR MINUTEN
In der täglichen Runde bringt verteilte Wiederholung Wörter zurück, bevor du sie vergisst. Üben kannst du beliebig oft; dazu Wochen-Quiz, Serie und Liga mit Freunden.

KOSTENLOS
Vokabeln, Üben, Lesen, Hören, Grammatik und Quiz sind kostenlos und unbegrenzt. Auch das Wochen-Quiz, der Gehmodus bei eingeschaltetem Bildschirm und 1 Probeprüfung pro Niveau sind kostenlos. Pro Niveau sind im Pfad und bei den Fertigkeiten je 2 Sprech- und 2 Schreibaufgaben offen; schließt du sie ab und erreichst eine 7-Tage-Serie, kommen je 2 weitere und 1 Probeprüfung dazu, mit jeder weiteren 7-Tage-Serie wieder.

PREMIUM
Taschen-Gehmodus, alle Probeprüfungen und alle Sprech- und Schreibaufgaben in Pfad und Fertigkeiten, ohne auf Serie oder Abschluss zu warten. Probeprüfungen öffnen sich der Reihe nach, je 3 auf einmal. Tägliche Fair-Use-Grenzen stehen auf der Premium-Seite.
Premium ist ein sich automatisch verlängerndes Monats- oder Jahresabo und gilt mit demselben Konto auf Handy, Tablet und im Web. Neue Abonnenten bekommen den ersten Monat kostenlos; kündigst du vor Ende der Testphase, zahlst du nichts. Es verlängert sich, wenn du nicht mindestens 24 Stunden vor Ende des Zeitraums kündigst; verwalten und kündigen kannst du es in den Kontoeinstellungen deines Stores.

OHNE KONTO STARTEN
Starte ohne Konto; mit Konto kommt dein Fortschritt mit, auf Handy, Tablet und im Web. Freunde und Liga, KI-Gespräche, KI-Feedback und Premium brauchen ein Konto; ohne Konto läuft der Sprechen-Schritt als vorbereitetes Gespräch. Dein Text geht nur mit deiner Erlaubnis an die KI. Das Mikrofon öffnet sich nur, wenn du sprechend antwortest. Audio geht nur mit deiner Erlaubnis an den Server, und die Aufnahme wird nicht gespeichert. Server in der EU; Chatverläufe werden nach 30 Tagen gelöscht.

Bestandene Modul- und Niveauprüfungen bringen dir einen teilbaren Leistungsnachweis. Die Probeprüfungen stammen von Lernomi; Lernomi ist mit keinem Prüfungsanbieter verbunden, ein Leistungsnachweis ersetzt kein offizielles Zertifikat.

Dein Konto löschst du in der App.

Nutzungsbedingungen: https://www.lernomi.app/terms/de
Datenschutzerklärung: https://www.lernomi.app/privacy/de
```

**Kısa metinler (Samet onayladı, 2026-09-25):**

| Alan | tr | en-US | de-DE |
|---|---|---|---|
| Play kısa açıklama (80) | yukarıda (70) | `Speak, understand, exam-ready: German from zero to C1, explained in English.` (76) | `Reden, verstehen, prüfungsfit: Englisch von null bis C1, auf Deutsch erklärt.` (77) |
| iOS tanıtım metni (170, incelemesiz değişir) | `Almancayı sıfırdan C1'e adım adım öğren: gerçek hayattan durumlarda konuş, her gün kelime turunu yap, her seviyede ücretsiz bir deneme sınavıyla nerede olduğunu gör.` (165) | `Learn German step by step from zero to C1: talk through real-life situations, do a daily word round and see where you stand with a free mock exam at every level.` (161) | `Englisch Schritt für Schritt von null bis C1: sprich in Alltagssituationen, übe täglich Wörter und sieh mit einer kostenlosen Probeprüfung pro Niveau, wo du stehst.` (164) |
| iOS anahtar kelimeler (100 bayt) | `ingilizce,kelime,sınav,deneme,dil,gramer,dinleme,okuma,yazma,konuşma,sıfırdan,alman,a2,b1,b2` (96 bayt) | `vocabulary,beginner,grammar,listening,reading,writing,speaking,course,deutsch,mock,test,a2,b1,b2` (96 bayt) | `vokabeln,wortschatz,grammatik,hören,lesen,schreiben,prüfung,probeprüfung,anfänger,kurs,a2,b1,b2` (99 bayt) |

Anahtar kelime kuralları: ad ve altyazıdaki kelimeler tekrar yazılmaz (Apple onları zaten
indeksliyor); sınav markası, "ders", "sertifika" yok (başarı belgesi resmî sertifika değil).
**Mağazaya GİRİLDİ (2026-09-25, API, geri okundu):** ASC sürüm 1.0.0 tr/en-US/de-DE: altyazı,
açıklama (bu belgedeki metinle birebir, geri okunup karşılaştırıldı), anahtar kelimeler, tanıtım metni,
destek URL'si (`/support`, `/support/en`, `/support/de`), pazarlama URL'si `https://www.lernomi.app`.
Play tr-TR/en-US/de-DE: başlık, kısa ve tam açıklama (edit commit edildi, geri okundu). Metin değişirse
önce bu belge, sonra aynı yolla mağaza. Play 512 ikonu da yüklendi (üç dil, aşağıdaki türetmeyle).

**Mağazaya YENİDEN GİRİLDİ (2026-09-29, Samet onayladı; API, üç dilde geri okundu, ASC ve Play birebir):** 2026-09-29 tutarlılık denetiminin düzeltmeleri: üç uzun açıklamada
iki cümle uygulamaya çekildi. (1) Konuşma adımının isteğe bağlı sonu 205c206cc'de "Kendini puanla /
Score yourself" yerine "Puanlı konuşmayı dene / Take the scored round / Lass dich bewerten" oldu: tr
"İstersen sonunda puanlı konuşmayı denersin.", en "If you like, finish with a scored round.", de "Am Ende
kannst du dich bewerten lassen.". (2) HESAPSIZ BAŞLA listesine yapay zekâ değerlendirmesi eklendi
(misafirde tek deneme değerlendirmesi dışında hesap ister; şartlar §3 ve `guest.*` metinleri böyle
söylüyor): tr "…yapay zekâyla sohbet, yapay zekâ değerlendirmesi ve Premium…", en "…AI conversation,
AI feedback and Premium…", de "…KI-Gespräche, KI-Feedback und Premium…". (3) de: özelliğin adı
paywall ve abonelik açıklamasıyla aynı "Taschen-Gehmodus" (uygulamada 0f8c20329'dan beri; metinde
"Gehmodus in der Tasche" kalmıştı): başlık "TASCHEN-GEHMODUS", yürüyüş paragrafının son cümlesi ve
PREMIUM paragrafının başı. Alanlar: ASC 1.0.0 açıklama (tr, en-US, de-DE) + Play tam açıklama
(tr-TR, en-US, de-DE). Kısa metinler, anahtar kelimeler ve abonelik açıklamaları değişmedi.

**Mağazaya YENİDEN GİRİLDİ (2026-10-05, vitrin provası düzeltmeleri; Samet istedi):** ASC 1.0.0 üç dilde
açıklama + en-US/de-DE altyazı (`appInfoLocalizations`); en-US ve de-DE iPhone 6,9" (6) ve iPad 13" (4)
kareleri `--replace` ile (yalnız iki dil: `ASC_LOCALES=en-US,de-DE`, tr setine dokunulmadı). Play tek
edit: üç dilde tam açıklama, en-US/de-DE kısa açıklama, en-US/de-DE telefon 6, 7" ve 10" tablet 4'er
ve öne çıkan grafik (`.secrets/play/play-listing-update.mjs`, edit içinde ve commit sonrası `play-dump`
ile geri okundu, eşit). Değişiklik yalnız ilk kare başlığında: en "Speak, understand, exam-ready",
de "Reden, verstehen, prüfungsfit". App Store sürümü henüz incelemeye gönderilmedi (ilk gönderim
Samet'te, aboneliklerin sürüme bağlanması arayüzden).

**Abonelik açıklamaları (2026-09-25, denetim S9):** paywall'daki iddiayla aynı (`paywall.pitch_exams`): Premium'un
farkı Cepte yürüyüş, TÜM deneme sınavları ve seri beklemeden Konuşma/Yazma. "Tüm sınavlar" yazılmaz (modül ve
seviye sınavları ücretsiz), "yapay zekâyla konuşma-yazma" tek başına yazılmaz (ücretsizde de seviye başına hak var).

| Mağaza | tr | en-US | de-DE |
|---|---|---|---|
| ASC açıklama (55) | `Cepte yürüyüş, tüm deneme sınavları, Konuşma, Yazma` | `Pocket Walking, every mock exam, Speaking & Writing` | `Taschen-Gehmodus, Probeprüfungen, Sprechen & Schreiben` |
| Play faydalar (40) | Cepte yürüyüş (ekran kapalı) · Tüm deneme sınavları · Seri beklemeden Konuşma ve Yazma | Pocket Walking (screen off) · Every mock exam · Speaking & Writing, no streak wait | Taschen-Gehmodus (Bildschirm aus) · Alle Probeprüfungen · Sprechen & Schreiben ohne Serie |
| Play açıklama (80) | Cepte yürüyüş, tüm deneme sınavları, seri beklemeden Konuşma ve Yazma adımları | Pocket Walking, every mock exam, every Speaking and Writing step, no streak wait | Taschen-Gehmodus, alle Probeprüfungen, alle Sprechen- und Schreiben-Schritte |

Play iki üründe girildi ve geri okundu (2026-09-25). ASC iki üründe üç dilde girildi ve geri
okundu (2026-09-27, Samet çalıştırdı; denetim S9).

**Durum (2026-10-01):** üç dilde 75 kare güncel build'den üretildi (`npm run store:frames`, ham görüntüler
`raw/`), tabakalar gözle denetlendi; App Store abonelik inceleme görseli `raw/iphone/review/`.
**Yüklendi (2026-10-01, Samet'in onayıyla, API'den geri okundu):** App Store üç dilde iPhone 6,9" (`APP_IPHONE_67`)
6 + iPad 13" (`APP_IPAD_PRO_3GEN_129`) 4 kare; iki aboneliğe inceleme görseli (`paywall-plans.png`), ikisi de
`READY_TO_SUBMIT`. Play üç dilde telefon 6, 7" ve 10" tablet 4'er, öne çıkan grafik. Yükleyiciler
`.secrets/appstore/asc-upload-screens.mjs` (`screens` / `subreview`, `--replace`) ve
`.secrets/play/play-upload-images.mjs` (her türü önce boşaltır). Abonelik inceleme görseli
`raw/iphone/review/paywall-signed-in.png`: giriş yapılmış, Premium'suz hesapla (İngilizce arayüz) iki plan,
"Start free trial", deneme/yenileme şartı ve bağlantılar bir karede; iki aboneliğe yüklendi (2026-10-01).
`screenshots@` hesabı Premium olduğu için çekim süresince bonus Premium geçici kapatıldı ve birebir geri
yazıldı (Samet'in onayıyla). App Preview videosu: aşağıda "Vitrin videosu".

## Yeniden üretmek

```bash
npm run store:frames                                        # bütün mağazalar, üç dil
npm run store:frames -- --store appstore-iphone --locale tr-TR
npm run store:frames -- --screen conversation --raw <ham-klasör>
```

Üretici `scripts/store/frames.mjs` (Playwright + Chrome, yazı tipi `scripts/store/fonts/` Bricolage
Grotesque, tanıtım sayfasıyla aynı). Girdi `docs/store/raw/` (ya da `--raw`), tanım `plan/frames.json`,
çıktı `docs/store/out/<mağaza>/<yerel>/NN-<ekran>.png`; alfa kanalı atılır (Play 24 bit PNG, App Store
saydamlık kabul etmez), ölçü ve kanal sayısı her dosyada denetlenir.

| Mağaza (`--store`) | Ölçü | Cihaz (ham) | Kareler |
|---|---|---|---|
| `appstore-iphone` | 1320×2868 (6.9") | `iphone` | 1–6 |
| `appstore-ipad` | 2752×2064 (13", yatay) | `ipad` | 1, 2, 3, 6 |
| `play-phone` | 1440×2560 (9:16) | `android-phone` | 1–6 |
| `play-tablet-7` | 1920×1080 (16:9) | `android-tablet` | 1, 2, 3, 6 |
| `play-tablet-10` | 2560×1440 (16:9) | `android-tablet` | 1, 2, 3, 6 |
| `play-feature` | 1024×500 öne çıkan grafik | `android-phone` (Konuşma) | 1 |

Tasarım: zemin sırayla turuncu / koyu / açık; başlık dar kesim 800, küçük önizlemede (arama sonucu, ilk üç
kare) okunacak boyda; cihaz CSS ile çizilir (App Store'da iPhone/iPad, Play'de nötr Android gövdesi);
**büyüteç** ham ekrandan kesilen GERÇEK bir arayüz bileşenini (yapay zekâ balonu ve düzeltmesi, ölçüm
kartı, beceri sekmeleri, günlük tur kartı) bütün olarak büyütüp kaynağının üstüne oturtur. Kırpım elle
girilmez: ekranın `callout` tanımındaki çapa metni (üç dilde) ham görüntüde macOS Vision OCR'la bulunur
(`scripts/store/ocr.swift`, ilk koşuda `swiftc` ile derlenir, sonuç önbellekte), sonra çapanın içinde durduğu
bileşen pikselden çıkarılır (sayfa zemininden açık, bağlı yüzey; `row` yan yana eş kutuları birleştirir).
Mercek kaynağın üstünde, bir kenarı kaynağın kenarıyla çakışacak hizada durur (komşu yazıyı en az kesen
hiza); büyütme sığacak kadardır. Kart bulunamazsa satır yöntemine düşer. Turuncu zeminde metin beyaz.
Çapa tutmazsa kare büyüteçsiz çıkar ve üretici listeler (kaçış: `callouts` elle oran). A1–C1
seviye çizgisi (hesap B1'de) yalnız açılış karesinde ve öne çıkan grafikte. Eksik ham görüntü atlanır ve
sonda listelenir. `--fallback android-phone=iphone` yalnız yerleşim provası: o kareler mağazaya gitmez.

Kontrol: `out/_sheets/<mağaza>.png` (bütün kareler) ve `<mağaza>-search.png` (ilk üç kare arama sonucu
boyunda); başlık taşması, Türkçe/Almanca harf ve kırpım buradan gözle denetlenir.

## Vitrin videosu

```bash
npm run store:video                         # iki biçim, plandaki bütün setler
npm run store:video -- --format preview     # yalnız App Preview
npm run store:video -- --format promo --still 10,27.5   # durağan kontrol kareleri
```

| Biçim | Nereye | Ölçü | Süre | İçerik |
|---|---|---|---|---|
| `preview` | App Store App Preview, iPhone 6.9" | 886×1920, 30 fps | 29,97 sn | Yalnız ekran kaydı + üstte kısa başlık çipi (Apple: uygulamadan kayıt, cihaz/el yok, en çok 30 sn) |
| `promo` | Play tanıtım videosu (YouTube bağlantısı) | 1920×1080, 30 fps | 40 sn | Motion graphics: kinetik başlık, sahneler arası süzülen telefon, zemin geçişi, büyüteç, yürüyüşte dinleme halkaları ve kararan ekran, Patika'da A1–C1 basamakları, kapanış kartı |

Tanım `plan/video.json` (sahne sırası ve süresi, hangi ham parçanın hangi aralığı, büyüteç alanı, metinler);
üretici `scripts/store/video/video.mjs`, çıktı `out/video/<set>-<biçim>.mp4` (H.264 High, AAC 256k 48 kHz,
−16 LUFS). Tasarım dili mağaza kareleriyle aynı (Bricolage, turuncu/koyu/açık zemin, gerçek arayüz, büyüteç
gerçek bileşen); konfeti, maskot, uydurma arayüz eklenmez. Ekranda görünen konfeti uygulamanın kendisi
(sınavı geçince).

**Müzik** `scripts/store/video/music.mjs` ile sıfırdan sentezleniyor (örnek ya da hazır parça yok, telif
ve atıf yok): 120 BPM, Re majör I–V–vi–IV, davul/bas/pad/arpej, sahne sınırlarında yükselen ses ve vuruş.
Sahneler 2 sn'lik ölçüye oturur; düzen ölçü ölçü dosyanın başında. Hazır CC0 parça arandı (2026-10-02):
FreePD kapanmış, Commons/OpenGameArt'taki CC0 parçalar deneysel ya da oyun müziği. Başka parça
kullanılacaksa lisansı (ticari kullanım, atıfsız) buraya yazılır ve `music.mjs` yerine o dosya verilir.

**Ham kayıt** `raw/video/<set>/` (iPhone 18 Pro Max simülatörü, `xcrun simctl io recordVideo`, yalnız
kullanılan aralıklar kesilip 30 fps H.264 olarak saklı). Çekim yolu `docs/store/screenshots.md`
"Vitrin videosu kaydı". Büyüteç alanı (`lens.rect`) kayıttaki bileşenin oranı: kayıt yenilenirse durağan
kareyle denetlenir. Sonuç ekranındaki "1 görev yapay zekâ puanı almadı" notu ve yürüyüşte simülatörün
mikrofonu duymadığı için "Duyamadım" anları kurguya alınmadı.

Yükleme: App Preview App Store Connect'te sürüm sayfasından (iPhone 6.9"), poster karesi seçilir; Play
tanıtım videosu YouTube'a (liste dışı, reklamsız) yüklenip bağlantısı Console › Mağaza kaydına girilir.
İkisi de Samet'te.

## Play ikonu (512×512)

Kaynağı iOS'un 1024'lük ikonu; Play 512 istiyor, alfa ve köşe yuvarlatma
KABUL ETMİYOR. Türetme tek satır, o yüzden çıktı depoda durmuyor:

```bash
python3 -c "from PIL import Image; \
Image.open('mobile/ios/Lernomi/Images.xcassets/AppIcon.appiconset/AppIcon-1024.png') \
.convert('RGB').resize((512,512), Image.LANCZOS) \
.save('docs/store/graphics/play-icon-512.png','PNG',optimize=True)"
```

## Yeni ham görüntü çekmek

Yöntem, cihazlar, sıra ve tuzaklar `docs/store/screenshots.md` "Mağaza kareleri: dört cihaz". Özet:
iOS simülatörü (Release) ve Android emülatörü (imzalı release; debug yapısı olmaz, R8 ve paketlenmiş
varlıklar yalnız release'te), `screenshots@lernomi.app` hesabı, simülatörün sistem dili setin dilinde.
Ham görüntüler önce `.shots/store-kit/raw/` altına çekilir, kareler `--raw` ile oradan denenir; kareler
onaylanınca karelerin kullandığı açık tema dosyaları buraya kayıpsız sıkıştırılarak kopyalanır
(`sharp().png({ compressionLevel: 9 })`) ve `npm run store:frames` varsayılan kökle aynı kareyi verir.
Üretici bit düzeyinde belirleyici değil (tarayıcı çizimi): iki koşu arasında piksel farkı olur, karşılaştırma
gözle ya da ortalama farkla yapılır.

## Kurallar

- **Yer tutucu veri olmaz.** Kareler gerçek hesapla, gerçek ilerlemeyle alınır.
- **Çocuk vurgusu olmaz:** hedef kitle 18+ (`docs/play/listing.md` §1). Maskotun payı yukarıdaki
  "Görsel çerçeve"de.
- **Altyazı özellik anlatır**, fiyat ya da vaat içermez.
- **Sınav markası geçmez** (hiçbir sınav kurumunun ya da sınavın adı; karar
  `docs/play/listing.md` §4.2). "Gerçek
  sınav görevi", "resmî sınav" gibi bir kurumla bağ ya da resmîlik ima eden ifade de yok:
  deneme sınavlarını Lernomi kendisi yazdı.
- **Premium gerektiren özellik anılıyorsa altyazıda "Premium" yazar** (App Store 2.3.2, Play
  yanıltıcı meta veri). Karedeki ekran premium hesapla çekildiği için kilitsiz görünüyor;
  ücretsiz kapsamı altyazı söylemek zorunda. Ücretsiz/Premium ayrımının kaynağı
  `src/lib/premium/gates.ts`; "1'i ücretsiz" sayısı `free.mockExamsPerLevel` ve panelde
  değişirse altyazı da değişir.
- **Her yerelleştirme kendi dilinde** kare ister. Üç arayüz dilinin üçü de açık
  (`PAIR_READY`: tr, en, de — `mobile/src/lib/courses.ts`): her set (`tr-de`, `en-de`, `de-en`) o arayüz diliyle çekilir; altyazılar `plan/frames.json`da
  üç dilde.
- **iOS kareleri iOS'tan alınır.** Android karesini App Store'a yüklemek 2.3.3 ihlalidir;
  `--fallback` yalnız yerleşim provası için.

### Metin kuralları (iki mağaza)

- Rakip uygulama adı yok; "en iyi", "1 numara", başarı garantisi ve fiyat yok.
- Sınav markası yok (karar `docs/play/listing.md` §4.2); "resmî sınav", "sertifika kazan" gibi
  resmîlik iması yok. Başarı belgesi resmî sertifika değil.
- Olmayan özellik yok. Premium gerektiren özellik aynı cümlede Premium diye anılır (App Store
  2.3.2); adlar paywall'la aynı, Premium için "sınırsız" denmez (3.1.2(a)).
- Promo kodu, davet ödülü ya da "kodla Premium" anılmaz (App Store 3.1.1).
- App Store metninde başka platform adı ("Android", "Google Play") geçmez (2.3.10).
- Mikrofon cümlesi gizlilik politikasıyla aynı (§4: mikrofon yalnız konuşarak cevap verirken
  açılır, ses yalnız izinle gönderilir ve saklanmaz).
- Bildirme kapsamı gerçeğe göre; "her ekranda" denmez.
- iOS açıklaması ekran kapalı Cepte yürüyüşü anıyor: gerçek iPhone'da doğrulanmadan
  gönderilecekse o cümle çıkarılır (denetim M10, App Store 2.3.1).
