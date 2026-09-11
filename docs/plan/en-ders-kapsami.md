# WP-74 — İngilizce ders kapsamı B1–C1

**Durum:** sürüyor (B1 TAM, B2 TAM; 200/300 ders — kalan yalnız C1) · **Sahip:** Claude · **Açılış:** 2026-09-11

## Kusur

İngilizce kursun ders katmanı A2'de bitiyor. Ölçüldü (2026-09-11):

| katman | A1 | A2 | B1 | B2 | C1 |
|---|---|---|---|---|---|
| ders (Patika) | 100 | 100 | **0** | **0** | **0** |
| beceri | 57 | 57 | 25 | 25 | 25 |
| deneme kâğıdı | 12 | 12 | 12 | 12 | 12 |

Almanca kursta aynı satır 100 / 100 / 180 / 100 / 100. Yani İngilizce
öğrencisi B1'e çıktığında beceri kütüphanesi ve deneme sınavı çalışıyor,
**Patika boş**. Ekran bunu dürüstçe söylüyor (`immersion/page.tsx`, "bu
seviyede ünite yok") ama söylemek çözmek değil: kursun bel kemiği olan
ders akışı yarıda kesiliyor. Kurs kartı da `English · CEFR A1–C1` diyor.

## Kapsam

Modül başına 10 ders, seviye başına 10 modül: **B1 100 + B2 100 + C1 100
= 300 ders**. Almanca B1'in 18 modülü buraya taşınmıyor — o genişleme
Almanca kelime havuzunun kapsanmayan 1059 maddesinden çıkmıştı
(`b1-yeniden-kurgu.md` §5), İngilizce havuzun kendi ölçümü yapılmadan
aynı sayı varsayılmaz.

Modül temaları `MODULE_THEMES` tablosundan geliyor ve tablo SEVİYE
anahtarlı, kurs anahtarlı değil: İngilizce B1 de Almanca B1'in ilk on
temasını kullanacak. A1/A2'de bu zaten böyle ve tutuyor (İngilizce A1
modül 3 «Yeme-içme», modül 9 «Sağlık ve vücut» — birebir oturuyor).
Tutmazsa tabloyu kursa göre bölmek ayrı bir iştir, önce ölçülür.

## Sözleşme (ders başına)

2026-09-11'de sahibin kararıyla İngilizce kurs Almanca kursun
sözleşmesine getirildi; yeni dersler o sözleşmeyle doğar:

- 8 sözlükçe maddesi, her biri kendi tekrar adımıyla
- 3 kalıp; üçü de modellenir, **üçü de üretilir**
- 19 adım: onay + giriş + 8 kelime + kural köprüsü + 3 kalıp tekrarı
  + 3 üretim + 1 doğru-yanlış + kapanış
- üretim adımlarında `accept` dizisi (İngilizce kursun A1/A2'de kurduğu
  şey; eşdeğer doğru cevaplar reddedilmez)
- rol yapma: 6–9 tur, senaryolu yedeği ile
- `tekrar adımı payı` %60'ı geçmez, `puanlanan adım` ≥ 4

Biçim JSON (`src/lib/lessons/content/en-b1.json`), TS değil — İngilizce
katman baştan böyle kuruldu.

## Yazmak ile bağlamak ayrı iki iş

Ders yazmak işin yarısı. Her yeni Türkçe dize **Almanca anadil ekseninde**
de karşılık ister (Almanca anadilli öğrenci İngilizce kursu alıyor):

1. `src/lib/lessons/content/en-b1.json` — ders
2. `node data/lessons/prose-de/make.mjs` → yeni Türkçe dizeler `in/`'e düşer
3. elle `data/lessons/prose-de/out/` paketleri — Almanca karşılıklar
4. `npm run check:native-de` → "ders 300/300" demeli
5. `npm run dump:native` → `mobile/src/data/native/de.json`

Kapılar: `check:lessons`, `test:content`, `check:native-de`, `test:gloss`.
Biri kırmızıyken modül bitmiş sayılmaz.

## Sıra

Modül modül, her modül tek commit. B1 1→10, sonra B2, sonra C1.
Her modülün sonunda dört kapı da yeşil olacak.

### Bitenler

**B1 modül 1 — İş dünyası (2026-09-11).** On ders: kariyer hikâyesi,
özgeçmiş, niyet mektubu, iş görüşmesi, ilk hafta, toplantı ve teslim
tarihi, maaş konuşması, iş arkadaşları, değerlendirme görüşmesi, istifa
ve devir. Seviyenin on dilbilgisi ifadesi (B1.GR.11-20) bu modülde birer
kez kullanıldı; ders başına bir kural, tekrar yok.

İki şey ders yazmadan ÖNCE yapıldı ve sırası önemli: can-do ifadeleri
(`cando.ts` + `FOCUS_GR_EN`) ve `prose-de/make.mjs` dosya listesi.
İkisi de sonradan yapılsaydı kapılar yeşil görünürken içerik sessizce
etiketsiz ve çevrilmemiş kalırdı.

**B1 modül 2 — Ev ve kira dünyası (2026-09-11).** On ders: daire aramak,
daire gezmek, kira sözleşmesi, taşınma günü, ev arkadaşları, tamirat,
faturalar, gürültü sorunu, evden çıkmak, mahalle. Aynı on kural, başka
bir dünyada — spiral müfredat: kural tekrar eder, bağlam değişir.

Modülün tekrarlayan kusuru şu: bir sözlükçe kelimesi yalnız ÜRETİM
hedefinde ya da köprüde geçiyor. `check:lessons` bunu «her kelime tekrar
ettiriliyor» diye reddediyor ve haklı — öğrenciden duymadığı bir kelimeyi
üretmesi istenmemeli. İki modülde toplam on iki kelime bu yüzden bir
tekrar hedefine taşındı; yazarken baştan tekrar hedefine koymak daha
ucuz.

**B1 modül 3 — Bağlaç ustalığı (2026-09-11).** On ders: sebep ve sonuç,
zaman cümleleri, amaç anlatmak, koşul incelikleri, tarif ederek anlatmak,
hikâyenin sırası, söylenenleri bağlamak, haber dili, kural ve öğüt,
deneyimi bağlamak.

Bu modülün konusu bir alan değil bir beceri, ve her ders bir bağlaç
AİLESİNİ karşılaştırıyor, tek tek öğretmiyor — çünkü kusur seçimde
çıkıyor. Doğru/yanlış adımı da hep o karışma noktasına bakıyor.

Referans dili satırlarında iki kez İDDİA TERSİNE DÖNDÜ: «Türkçede hepsi
eğer ile çıkıyor» Almanca için yanlış (es sei denn / solange / für den
Fall, dass hepsi ayrı), «bağlaç nereye koyulursa koyulsun anlaşılır» de
yanlış (weil ve deshalb kelime sırasını değiştiriyor). İkisi de Almancaya
karşı yeniden yazıldı — bu satırlar çevrilmez, yeniden ölçülür.

**B1 modül 4 — İlgi cümleleri (2026-09-11).** On ders: birini tarif etmek,
yeri tarif etmek, tavsiye etmek, seçim yapmak, nasıl çalışır, şikâyet ve iade,
randevu ve iptal, yönerge vermek, karışıklık, karara varmak.

Modülün teması bir alan değil yine bir beceri, ve ilk iki ders aynı kuralı iki
ayrı bağlayıcıyla (kişi / yer) işliyor — geri kalan sekiz ders kuralı başka
bağlamlara taşıyor. Modül 3'ten devralınan ders şu: kuralı ilan etmek değil,
kuralın SEÇİLDİĞİ yeri göstermek öğretiyor.

**B1 modül 5 — Bürokrasi (2026-09-11).** On ders: kayıt işlemleri, form
doldurmak, banka hesabı, oturum ve vize, sigorta, vergi beyanı, resmî yazışma,
sıra ve bekleme, belgeler, itiraz.

Bu modülün kelime yükü ağır ve havuz sınırı burada sıkışıyor: sekiz maddenin
sekizi de havuzda olmalı, ama bürokrasi sözcükleri B1 havuzunda seyrek. Yazarken
önce `vocabcheck` ile aday liste ölçüldü, sonra ders kuruldu — ters sırayla
çalışınca ders bitip kapı kırılıyor.

**B1 modül 6 — Eğitim ve gelişim (2026-09-11).** On ders: çalışma planı, sınava
hazırlık, nasıl öğreniyorum, ilerlemeyi konuşmak, hatalardan öğrenmek, öğretmen
geri bildirimi, grup çalışması, çevrimiçi kurs, motivasyonu korumak, sıradaki
adım.

Burada rol yapma açılışı bir kez soruyla bitmedi (`en-b1-motivation`) ve kapı
haklı olarak reddetti: açılış soru değilse öğrenci ilk turda ne söyleyeceğini
bilmiyor, konuşma tek taraflı başlıyor.

**B1 modül 7 — Fikir ve tartışma (2026-09-11).** On ders: fikir söylemek,
katılmak ve katılmamak, tartışma, habere tepki, sosyal medya, ikna etmek, tahmin
yürütmek, kaynağı sormak, geriden anlatmak, geleceği tartışmak.

İki şey burada netleşti. Birincisi ipucu biçimi: Türkçe SOV olduğu için
«[açıklama] [İngilizce simge] [fiil:]» dizilişi Türkçede doğal, Almancada
bozuk çıkıyor — çünkü Almanca fiili öne alıyor. Modülün on beş ipucu tek bir
sağlam kalıba çevrildi: «… için» + simge + «kullanılır:». Segment sırası
derste sabit, o yüzden Almancanın kurtarabileceği diziliş baştan seçilmeli.

İkincisi ikon: `speak` diye bir ikon yok ve bunu `check:lessons` değil
`check:content` yakalıyor. İki kapı da çalıştırılmadan modül bitmiş sayılmaz.

**B1 modül 8 — Sağlık sistemi (2026-09-11).** On ders: aile hekimine
kaydolmak, belirtileri anlatmak, acil serviste, reçete ve kutu, tahlil
sonuçları, uzmana sevk, hastanede bir gece, tedaviyi seçmek, ikinci görüş,
rapor almak.

A1 ve A2 sağlığı zaten işliyor (doktor randevusu, eczane, hastane, sigorta,
ağrı anlatma). Bu yüzden B1 katmanı hastalığı değil SİSTEMİ anlatıyor: kayıt,
sevk zinciri, prospektüs, sonuç aktarımı, ikinci görüş, rapor. Aynı alanda
ikinci bir tur atmanın yolu konuyu değil bakış açısını değiştirmek.

Modülde iki tuzak çıktı, ikisi de sözlükçeyle ilgili:

Birincisi Almanca sözlüğün TÜRKÇE DİZEYLE anahtarlanması. `pack`, `emergency`
ve `file` karşılığı «kutu», «acil», «dosya» bırakılsaydı sözlük onlara zaten
var olan «Kiste», «dringend», «Datei» karşılığını verecekti — bağlama değil
dizeye bakıyor. Karşılıklar «ilaç kutusu», «acil durum», «hasta dosyası»
yapılınca Almanca doğru kelimeyi aldı: Packung, Notfall, Krankenakte. Yani
Türkçe karşılık yalnız öğrenciye değil, Almanca eksene de yazılıyor.

İkincisi tekrar hedefi eşleşmesi: kapı sözlükçe kelimesini tekrar hedefinin
İÇİNDE ALT DİZE olarak arıyor. `smoke` için tek tekrar `He gave up smoking`
idi ve «smoking» içinde «smoke» geçmiyor — kapı haklı olarak reddetti. Aynı
tuzağa `deny`/«denies» de düşüyor. Çekimlenince kök değişen kelimeye ayrı bir
tekrar hedefi gerekiyor.

**B1 modül 9 — Çevre ve şehir yaşamı (2026-09-11).** On ders: çöpü ayırmak,
enerji tasarrufu, yeşil alan, iklimi konuşmak, şehir nasıl değişti, gidiş
geliş, su ve atık, mahalle projesi, yapılmadan önce, şehir mi kır mı.

Bu modülde kural ders için uydurulmadı, metnin kendi kuralı: belediye çöp
yazısı baştan sona edilgen (kuralı koyanı söylemez), tasarruf konuşması
baştan sona şartlı (her tasarruf bir davranışın karşılığı), iklim konuşması
baştan sona gelecek, toplu taşıma yazısı baştan sona zorunluluk kipi.
Eşleşme doğal olduğu için on dersin dokuzu ilk kapı denemesinde geçti.

`check-lessons.ts` bir yanlış uyarı üretiyordu: «aynı kelime iki derste yeni
diye öğretilmemeli» denetimi SEVİYE anahtarlıydı, kurs anahtarlı değil.
Almanca dersteki `wild` ile İngilizce dersteki `wild` aynı yazılıyor, farklı
kelime ve hiçbir öğrenci ikisini birden görmüyor. Anahtar HEDEF DİL'e
çevrildi — kurs değil, çünkü aynı dili öğreten iki kurs (de ve gsw-zh) hâlâ
çakışmalı. Dört eş yazım düştü: warm, online, modern, wild. Başka hiçbir
uyarı maskelenmedi (ölçüldü).

**B1 modül 10 — Duygular ve hayaller (2026-09-11). B1 BİTTİ.** On ders:
duyguyu adlandırmak, pişmanlık, hayaller, olsaydı, beni etkileyen şey,
cesaret vermek, korkular, sırdaş, minnet, nereye varmak istiyorum.

Modülün dayanağı: duygu sözcüğü tek başına duyguyu anlatmıyor, ZAMAN
anlatıyor. «Üzgünüm» ile «pazartesiden beri üzgünüm» aynı kelimeyi taşıyor
ama biri hâl, biri süreç. Pişmanlık dersi de aynı yerden kuruluyor —
pişmanlık iki zamanın arasındaki boşlukta doğuyor.

### B1 katmanının kapanış ölçümü

- 100 ders, 100 benzersiz kimlik
- **800 sözlükçe maddesi, 800'ü de benzersiz** — seviye içinde tek tekrar yok
- 3.913 Almanca dize (l-076…l-095); `check:native-de` ders 300/300
- `check:lessons` hata yok, `test:content` bütçe içinde, `test:gloss` geçti

Bir etiket tutarsızlığı kapanışta düzeltildi: bir ders `Gerund and
infinitive`, dokuzu `Gerund or infinitive` diyordu. İkisi de aynı can-do'ya
eşleşiyordu (`FOCUS_GR_EN` düzenli ifadesi ikisini de yakalıyor), yani kapı
görmedi — ama etiket öğrenciye gösteriliyor ve aynı kural iki adla
görünüyordu. `Second conditional` ve `Modals of deduction` etiketleri
BİLEREK ayrı bırakıldı: onlar aynı kuralın alt başlığı değil, dersin gerçekten
başka bir yüzünü öğretiyor.

**B2 modül 1 — Profesyonel iletişim (2026-09-11).** On ders: sabah
bilgilendirmesi, devir notu, meslektaşı tanıtmak, çeyrek sonuna kadar,
tutanak yazmak, neyin yanlış gittiği, bilseydik, vurguyu yerleştirmek,
resmî açılış, ölçülü söylemek.

Modül kapandığında B2.GR.11-20'nin onu da tam bir kez kullanılmış oldu ve bu
ÖLÇÜLDÜ, varsayılmadı: her dersin `candoForLesson` çıktısı tek tek bakıldı.

B1'de olduğu gibi ders yazmadan ÖNCE dört şey yapıldı ve sırası önemli:

1. `cando.ts` — İngilizce B2 için on dilbilgisi ifadesi (`B2.GR.11-20`).
   Numara 11'den başlıyor çünkü 1-6 Almanca kursun B2 dilbilgisi ve iki kurs
   aynı numarayı paylaşamaz. `EN_GR_IDS` B1 ve B2'yi birlikte üretiyor.
2. `cando-map.ts` — on yeni satır `FOCUS_GR_EN`'in EN BAŞINA. B1 satırlarının
   B2 sütunu yok: bir B2 dersi «Passive report structures» odağıyla aşağıdaki
   `/passive/i` satırına düşseydi `hit[1]["B2"]` undefined dönerdi ve ders
   sessizce ifadesiz kalırdı. Desenler B2'ye özgü seçildi ki B1 odakları
   yukarı kaymasın: «third conditional» yakalanıyor, «Conditionals» hâlâ
   B1 satırına gidiyor.
3. `cando/out/c-005.json` + `cando-de/out/c-005.json` — ifadelerin İngilizce ve
   Almanca metni. Kapsam 155 → 165.
4. `prose-de/make.mjs` dosya listesine `en-b2.json`, ve `src/lib/lessons`,
   `mobile/src/data/lessons`, `check-dumps.ts` bağlantıları.

Dersler eşleşme doğrulandı: beş dersin beşi de hedeflenen ifadeye gidiyor
(B2.GR.13, 16, 17, 18, 19).

Referans dili burada bir kez yeniden ölçüldü: «açıklayıcı ilgi cümlesi
virgülle ayrılıyor» Almanca anadilli için YETERSİZ bir ipucu, çünkü Almancada
HER ilgi cümlesi virgül alıyor. Almanca metin bunu söylüyor: virgül İngilizcede
bir ayırt edici, Almancada değil.

**B2 modül 2 — Müzakere ve şikâyet (2026-09-11).** On ders: iddia, sorun
tam olarak ne, ne konuşulmuştu, resmî şikâyet, ödün vermek, anlaşsaydık,
sert mektup, olayın özeti, taraflar, bunu okuduğunuzda.

Modül 1'in on kuralı burada ikinci kez geçiyor ama başka bir dünyada —
spiral müfredat. Aynı yarık cümle modül 1'de vurguyu yerleştiriyordu,
burada şikâyetin SINIRINI çiziyor: «itiraz ettiğimiz şey fiyat» demek, geri
kalanına itiraz etmediğini de söylemek demek. Aynı devrik yapı modül 1'de
resmî açılış yapıyordu, burada sesini yükseltmeden sertleşmenin yolu.

Kelime tuzağı bu kez yazarken görüldü: `violate` için «The violation of the
term» diye bir tekrar yazılsaydı kapı reddederdi, çünkü «violation» içinde
«violate» geçmiyor. Buna karşılık `enforce`/«enforcement», `reimburse`/
«reimbursement» ve `perform`/«performance» geçiyor — isimleştirme dersinin
üç kalıbı o üç fiille kuruldu, `violate` ayrı bir tekrar hedefine kondu.

**B2 modül 3 — Edilgenin bütün hâlleri (2026-09-11).** On ders: aktarıldığı
kadarıyla, tamamlandığında, sürecin kaydı, yapılmış olacak, ki kontrol
edilmişti, değiştirilen şey, hiçbir yerde yazmıyor, taşınmış olmalı, kontrol
edilseydi, öyle görünüyor ki.

Modülün teması bir alan değil bir YAPI — B1 modül 3'ün (bağlaç ustalığı)
yaptığının aynısı. Her ders edilgenin başka bir hâlini gösteriyor: aktarım
kalıbı, ortaç öbeği, isimleştirme, gelecekte edilgen, edilgen ilgi cümlesi,
edilgen yarık cümle, edilgen kip bileşimi. «Bitmiş olacak» ile «bitirilmiş
olacak» aynı takvimi anlatıyor ama biri yapanı taşıyor öteki taşımıyor.

Bu modülde kelime listeleri ancak altı ayrı sorguyla doldu ve bunu «havuz
seyrekleşti» diye yazmıştım. **Yanlıştı, modül 5'te ölçtüm:** havuzda 7163
satır var, 2028'i kullanılmış, B2 seviyesinde **1934'ü boşta**. Seyrekleşen
havuz değil benim arama yöntemimdi — kelimeyi önce kafamda seçip havuzda
arıyordum. Havuz bir ALMANCA kelime listesinden türediği için içinde «civil
servant», «commuter train» var ama `cell`, `gene`, `atom`, `server`, `chip`
yok. Doğru sıra ters: önce boştaki kelimeler listelenir, ders konusu ona göre
dizilir. Tek sorguda kırk kelime çıkıyor (`scratchpad/freewords.mjs`).

**B2 modül 4 — Medya ve aktarılan söz (2026-09-11).** On ders: başlığı
okumak, kaynağı alıntılamak, düzeltme, basın özeti, gazetenin savı, doğruluk
kontrolü, bassalardı, daha önce yayımlanmadı, yayına girdiğinde, raporun
kendisi.

Modülün kendi ekseni aktarım kalıbının ZAMANI. B2 modül 1'de «is thought to
be» bugünü anlatıyordu; başlık dilinde asıl kullanılan «is thought to have
been», çünkü olayı verir ama kimsenin sözü olarak vermez. Aynı yapının iki
zamanı ayrı modüllerde ayrı iş görüyor — spiralin B2'deki karşılığı bu.

Düzeltme dersi modülün ahlaki yükünü taşıyor: `must have` bir çıkarım,
`can't have` bir ret, `should have` bir eksik tespiti. Karıştırılınca özür
suçlamaya dönüşüyor ve düzeltme yazısı asıl işini görmüyor.

**B2 modül 5 — Bilim ve teknoloji (2026-09-11).** On ders: bir çalışmanın
işleyişi, laboratuvar yordamı, bulgu, veri geldiğinde, o değişken, çalışmanın
gösterdiği, hiçbir örüntü çıkmadı, tutmamış olmalı, örneklem büyük olsaydı,
geçici sonuç.

Modülün kendi ekseni KESİNLİK DERECESİ. Bilimsel dilde bir cümlenin ağırlığı
kelimede değil yapıda: `must have` bir çıkarım, `can't have` bir ret,
`should have` bir eksik tespiti — modül 4'te bunlar bir düzeltme yazısının
ahlakıydı, burada bir yöntem tartışmasının. Aynı spiralde devrik yapı da yön
değiştiriyor: modül 4'te bir ilki duyuruyordu (`Never before has … been
shown`), burada beklenmedik bir ölçümü (`Never has such a pattern emerged`).

Son ders modülün yükünü taşıyor: yumuşatıcı bağlayıcılar. Bilimsel sonuç
çoğu zaman geçicidir ve `it seems to be` / `apparently` / `on balance`
sonucu verir ama kapıyı kapatmaz. Tereddüdü zayıflık sayan bir dinleyiciyle
konuşmak rol yapmanın kendi işi.

Modül 5 kapandığında B2.GR.11-20'nin onu da modül içinde tam bir kez
kullanılmış oldu (`candoForLesson` ile ölçüldü, 10/10) ve B2'nin elli
dersinin hepsi bir ifadeye düşüyor.

**B2 modül 6 — Toplum ve ekonomi (2026-09-11).** On ders: eşitsizlik raporu,
rakamlara göre, fiyatı ne sürüklüyor, kiralar artınca, etkilenen kesim,
katılım hiç bu kadar düşmedi, on yılın sonuna kadar, tutmayan kanun, fabrika
kalsaydı, bir kesim hakkında konuşmak.

Modülün kendi ekseni TOPLULUK HAKKINDA KONUŞMAK. Bir kesim hakkındaki cümle
farkında olmadan herkes hakkında bir cümleye dönüşür; modülün her dersi bu
kaymayı başka bir yerden tutuyor. İsimleştirme faili düşürüyor (rapor dili
bunu bilerek yapar), edilgen aktarım kaynağı düşürüyor, virgüllü ilgi cümlesi
bilgi ekliyor ama kimliği DARALTMIYOR — virgülsüzü daraltır ve bir kesimi
ayırır. Son ders bunu doğrudan söylüyor: yumuşatıcılar hükmü verir ama onu
herkes hakkında bir cümleye çevirmez.

Kelime seçimi bu modülde ilk kez doğru sırayla yapıldı: önce havuzdaki boş B2
kelimeleri listelendi, konu ona göre dizildi. Seksen maddenin sekseni de tek
sorguda doğrulandı (havuz dışı 0, yinelenen 0, seviye dışı 0) — modül 3'te
altı sorgu gerektiren iş bir sorguya indi.

Almanca eksende bir yapı sınırı daha göründü: Türkçe iki tokenin ortak
fiilini sona atabiliyor («… olanı, … olanı, … ise … bağlar»), Almanca
atamıyor. Segment sırası dersten geldiği için çözüm her tokene kendi
fiilini vermek: «bindet das Gleichzeitige an, … bindet das Gebaute an, …
bindet dagegen das vorher Beendete an». Beş satır böyle düzeltildi.

**B2 modül 7 — Kültür ve sanat (2026-09-11).** On ders: katalog künyesi,
sezon duyurusu, oyunun yaptığı, sahnedeki bir ömür, şenliğin ne olduğu,
böyle bir infial hiç olmadı, açılışa kadar, ikinci perde, başka türlü
betimleseydi, beğenmediğini söylemek.

Modülün kendi ekseni MESAFE: yapıtla onu anlatan kişi arasındaki uzaklık.
Künye dili faili siler çünkü kayıt kalıcıdır ve kimin yaptığı değişir;
aktarım kalıbı kaynağı siler ve bu sanat haberinde bir koruma değil bir
uyarıdır; yarık cümle yapıtın KONUSUNU değil YAPTIĞINI başa taşır. Son ders
modülün yükünü taşıyor: beğenmemek kolay, söyledikten sonra konuşmanın
sürmesi zor — yumuşatıcıların işi tam bu.

Spiral burada da dönüyor: virgüllü ilgi cümlesi modül 6'da bir kesimi
ayırmamaya yarıyordu, burada bir geleneği tuhaflaştırmamaya. Kip bileşimi
modül 5'te yöntem tartışmasıydı, burada eleştiriyi hakarete çevirmeyen şey.

Bu modülde Türkçede hiçbir kapının görmediği bir kusur sınıfı bulundu:
metne iki kez Kiril harf kaçmış (`ismе`, `savа`). Latin karşılığıyla aynı
görünüyor, arama-değiştirme ıskalıyor, `check:lessons` ve `test:content`
umursamıyor. `scratchpad/charcheck.py` bütün Türkçe alanları tarayıp
beklenmeyen harfleri döküyor; dört İngilizce dosyanın tamamı temizlendi.

**B2 modül 8 — Para ve kariyer stratejisi (2026-09-11).** On ders: maliyet
raporu, şirket haberi, kariyeri belirleyen şey, işe alım zinciri,
sözleşmedeki kişi, hiç bu kadar zor bulunmadı, aralığa kadar, tutmayan
kredi, sözleşme kapsasaydı, maaş konuşması.

Modülün kendi ekseni SAVUNMAYA GEÇMEMEK. Para ve kariyer konuşmaları
kolayca kişiselleşir: rakam savunulacak bir şeye, kanun bir memurun
hatasına, kredi bir aile üyesinin suçuna dönüşür. Modülün her dersi bunu
başka bir yapıyla engelliyor — isimleştirme işi kişiden ayırıyor, kip
bileşimi çıkarımı suçlamadan ayırıyor, yumuşatıcı talebi verirken
pazarlığı açık bırakıyor. Son ders bunu doğrudan söylüyor: kesin cümle
karşıdakini tek bir cevaba mahkûm eder.

İki Türkçe kusur yazarken düzeldi, ikisini de hiçbir kapı görmüyor:
ünsüz uyumu («teklifden» → «tekliften») ve anlamca tutmayan bir üretim
hedefi (bir mektup kadrolu iş olamaz; «teklif» yapıldı).

**B2 modül 9 — İnsan ilişkileri ve psikoloji (2026-09-11).** On ders:
değerlendirme raporu, onun hakkında söylenenler, asıl kıran şey, nasıl
bozuştuk, aramızdaki kişi, hiç bu kadar ağır gelmemişti, bir yıl sonra,
yanlış anlamış olmalı, konuşsaydık, duyguyu adlandırmak.

Modülün kendi ekseni DUYGUYU KİMİN SÖZÜ OLARAK SÖYLEDİĞİN. Bir duygu
söylenirken kolayca karşıdaki hakkında bir gerçeğe dönüşür; modülün her
dersi bunu başka bir yapıyla tutuyor. İlk ders bu modülde spirali TERSİNE
çeviriyor: isimleştirme modül 1'den beri iyi bir araçtı, burada iki
yüzlü — raporda kişiyi korur, sohbette kişiyi konudan çıkarır. Aynı
şekilde edilgen aktarım, bir rakamda az zararlıyken bir insanda en yıkıcı
biçim; ders bunu açıkça söylüyor.

Kip bileşimi dersi modülün ahlaki merkezi: `can't have` ilişkide en
cömert kiptir, çünkü karşındakine yapmayacağı şeyi yakıştırmaz. Son ders
ise yumuşatıcıların işini ilişkiye taşıyor: üçü de duyguyu verir ama onu
karşındaki hakkında bir hükme çevirmez.

**B2 modül 10 — Resmî yazışma ve kapanış (2026-09-11). B2 KAPANDI.** On
ders: resmî yazı, dosyada yazana göre, gecikmeye yol açan, işin yürüyüşü,
sorumlu kişi, hiç bu kadar çabuk olmadı, sözleşme kapanırken, şikâyete
verilen cevap, teklif tutsaydı, kapanış cümlesi.

Modülün kendi ekseni KAYIT. Resmî yazı işlemi kişiden ayırır, çünkü
kayıt yıllar sonra da okunacak ve kimin yaptığı değişecek; edilgen aktarım
bilgiyi verir ama imzayı vermez, imzayı dosyada aramak okuyanın işi;
devrik yapı sitem etmeden durumu söyler. Şikâyet dersi seviyenin en ince
ayrımını taşıyor: `can't have` iyi niyeti kabul edip yine de hakkını
istemektir — haklıyken haksız duruma düşmemenin dilbilgisi.

Son ders hem modülü hem seviyeyi kapatıyor: bir yazışmayı bitirirken
kapıyı açık bırakmak. Sonucu vermek kolay, karşı tarafa cevap hakkı
bırakarak vermek zor; B2'nin bütün yükü bu cümlede.

**B2 sayıları:** 100 ders, 800 sözlükçe maddesi, 800'ü de benzersiz,
B2.GR.11-20 her modülde bir kez (on modülün onunda da ölçüldü), Almanca
eksende l-105…l-110 paketleri.

## Tamamlanma ölçütü

- `LESSONS` içinde `course: "en"` için B1/B2/C1 100'er ders
- dört kapı yeşil, `test:content` bütçesi büyümemiş
- `mobile/src/data/native/de.json` güncel
- `docs/plan/STATUS.md` WP-74 satırı `bitti`
