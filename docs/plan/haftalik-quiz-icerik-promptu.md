# Haftalık quiz — içerik devir promptu

Bu belge **bir sonraki seviyenin içeriğini yazacak ajana verilecek promptu** tutuyor.
A1 yazılıp kontrolden geçtikten sonra kullanılır; A2 için hazır, üst seviyeler için
tema tablosu değiştirilerek aynen kullanılır.

Kararların kaydı ve faz takibi: artifact
`https://claude.ai/code/artifact/91486c81-6819-43a1-be35-87b5b606d90c`

Neden ayrı bir belge: içerik üretimi tekrar eden ve uzun süren bir iş. Kuralların
sohbet geçmişinde kalması, üçüncü seviyede şablonun sessizce kaymasına yol açar —
repodaki `data/**/SPEC.md` dosyalarının var oluş sebebiyle aynı sebep.

---

## Prompt (olduğu gibi kopyalanır)

```
Depo: /home/linkinqark/Desktop/workspace-linux/word-app

GÖREV
Haftalık quiz için A2 seviyesinde 5 haftalık içerik yaz: kurs `de` ve kurs `en`
için beşer paket (toplam 10 dosya). A1 paketleri YAZILDI ve kontrolden geçti —
onları önce oku ve şablonu birebir izle:
  src/lib/weekly-quiz/de/a1-w01.ts .. a1-w05.ts
  src/lib/weekly-quiz/en/a1-w01.ts .. a1-w05.ts
Tip tanımları ve her alanın gerekçesi: src/lib/weekly-quiz/types.ts

DEĞİŞMEYEN KURALLAR (A1 ile aynı)
1. Blok dağılımı hafta başına sabit: read 2 · listen 2 · grammar 3 · vocab 2.
   `personal` blok yazılmaz — çalışma anında öğrencinin SRS'inden üretilir.
   Havuzu ~14 madde yaz; quiz 10 tanesini seçiyor.
2. Sözcük bütçesi: her madde yalnız o kursun A2 (ve altı) kelime listesindeki
   sözcükleri kullanabilir. Liste veritabanında:
     select de, tr, en from words where course='de' and niveau in ('A1','A2');
   `npm run check:quiz` bunu ölçüyor ve ihlali HATA sayıyor.
3. Her maddede `why` dolu (Türkçe, ≥20 karakter): yanlıştan sonra gösterilen
   açıklama. Kuralı söyler, cevabı tekrar etmez.
4. Çeldiriciler anadil girişiminden üretilir ve `native` etiketi taşır:
     kurs de → native "tr" ve native "en" varyantı
     kurs en → native "tr" ve native "de" varyantı
   tr→de: cinsiyet/artikel, durum ekleri, V2 sözdizimi (Türkçede fiil sonda).
   en→de: Akkusativ/Dativ ayrımı, ayrılabilir fiiller, sahte dostlar.
   tr→en: artikel yokluğu (a/the), present simple ↔ continuous ayrımı.
   de→en: do-desteği, sıfat sırası, sahte dostlar (also, handy, become).
   Çeldirici rastgele değil: öğrencinin GERÇEKTEN yapacağı hatayı temsil eder.
5. Aralıklı tekrar: her haftanın ≥1 maddesi önceki haftaların bir hedefini
   yeniden yokluyor (`targets` alanıyla). W5 saf tekrar değil TRANSFER haftası —
   önceki sözcükler yeni bağlamlarda.
6. Uyaran (okuma metni, dinleme diyaloğu) kurs başına BİR kez yazılır; anadile
   göre değişen tek şey çeldiriciler ve `why` metni.
7. Marka adı geçmez (Goethe, telc, ÖSD, Cambridge, IELTS…) — kontrol betiği
   tarıyor, hata veriyor.
8. Cevap dağılımı dengeli: aynı şık konumu maddelerin %60'ından fazlasında
   doğru olamaz; doğru şık sistematik olarak en uzun olamaz.

A2 TEMALARI (A1'in üstüne kurulur, tekrar etmez)
  W1 Geçmiş zaman anlatımı   W2 Sağlık ve randevu   W3 Seyahat ve yol tarifi
  W4 İş ve başvuru           W5 Transfer (W1–W4 yeni bağlamlarda)

TESLİM
- 10 dosya + index.ts kaydı
- `npm run check:quiz` HATASIZ geçmeli (uyarı varsa gerekçesi baseline'a yazılır)
- `npx tsc --noEmit` temiz
- Değişiklikleri TEK atomik commit olarak yerelde bırak, push etme.

KALİTE ÖLÇÜSÜ
Bu bir sınav değil, gelişim aracı. Maddeler öğrenciyi yakalamaya değil,
ne bildiğini ve neyi karıştırdığını göstermeye çalışır. Bir madde yalnızca
"öğrenci bunu bilmiyorsa hangi yanlışı yapar" sorusunun net bir cevabı varsa
iyidir — `why` o cevabı açıklar.
```

---

## Başlangıç promptu (A1 bitmeden, paralel başlatmak için)

A1 içeriği yazılmadan A2 ajanını başlatmak gerekirse bu kullanılır. Tek fark:
şablonu A1 dosyalarından değil doğrudan `types.ts`'ten alıyor, ve `index.ts`'e
DOKUNMUYOR — paralel çalışan iki ajan aynı dosyayı düzenlerse biri ötekini ezer.

```
Depo: /home/linkinqark/Desktop/workspace-linux/word-app

GÖREV
Haftalık quiz için A2 seviyesinde 5 haftalık içerik yaz: kurs `de` ve kurs `en`
için beşer paket, toplam 10 dosya:
  src/lib/weekly-quiz/de/a2-w01.ts .. a2-w05.ts   (export const DE_A2_W01 …)
  src/lib/weekly-quiz/en/a2-w01.ts .. a2-w05.ts   (export const EN_A2_W01 …)

ÖNCE OKU — şemanın tamamı ve her alanın gerekçesi burada:
  src/lib/weekly-quiz/types.ts
Yazdığın her paket `QuizWeek` tipine uymak zorunda. A1 paketleri ŞU AN
YAZILIYOR (paralel bir oturumda); onları bekleme, örnek alma, dosyalarına
dokunma.

PARALEL ÇALIŞMA KURALI — ÖNEMLİ
Yalnız yukarıdaki 10 dosyayı OLUŞTUR. Başka hiçbir dosyayı değiştirme:
`types.ts`, `index.ts`, i18n sözlükleri, `package.json`, A1 dosyaları — hiçbiri.
index kaydını ben yapacağım; sen son raporunda dosya adlarını ve export
adlarını listele. Git: değişikliklerini TEK atomik commit olarak yerelde bırak,
push etme.

BLUEPRINT (types.ts `QUIZ_PLAN`) — hafta başına sabit
  read 2 · listen 2 · grammar 3 · vocab 2
  `personal` blok YAZILMAZ — çalışma anında öğrencinin SRS'inden üretiliyor.
  Havuzu en az 14 madde yaz (`QUIZ_POOL_MIN`); quiz 10 tanesini seçiyor.
  Yani yukarıdaki dağılımın üstüne ~5 madde daha ekle, aynı bloklara dağıt.

SÖZCÜK BÜTÇESİ (en sık düşülen hata)
Her madde yalnız o kursun A2 ve ALTI kelime listesindeki sözcükleri
kullanabilir. Listeyi oku:
  ssh lernomi "sudo -u postgres psql -d lernomi -t -A -F'|' -c \"select de, tr, en from words where course='de' and niveau in ('A1','A2') order by coalesce(rank,999999) limit 400;\""
Kurs `en` için `course='en'`. Öğrencinin hiç görmediği sözcüğü sormak quiz'i
ölçüm olmaktan çıkarır.

ÇELDİRİCİ KURALI — bu işin kalbi
Çeldirici rastgele yanlış değil, öğrencinin GERÇEKTEN yapacağı hatadır ve
değeri anadil girişiminden gelir. `byNative` ile anadile göre değiştir:
  kurs de → taban `tr`, ayrıca `en` varyantı
  kurs en → taban `tr`, ayrıca `de` varyantı
  tr→de: cinsiyet/artikel, durum ekleri, V2 sözdizimi (Türkçede fiil sonda)
  en→de: Akkusativ/Dativ ayrımı, ayrılabilir fiiller, sahte dostlar
         (also≠also, bekommen≠become, Gift≠gift)
  tr→en: artikel yokluğu (a/the), present simple ↔ continuous ayrımı
  de→en: do-desteği, sıfat sırası, sahte dostlar (handy, become, actual)
`read`/`listen` maddelerinde `byNative` KULLANMA: metni anlamak anadile göre
değişmez, uydurma fark maddeyi bozar.

ÖRNEK MADDE (biçim ve ton için)
  {
    id: "de-a2-w01-g1",
    block: "grammar",
    stem: "Gestern ___ ich meinen Freund im Park getroffen.",
    options: ["habe", "bin", "war", "hatte"],
    answer: 0,
    why: "`treffen` Perfekt'i `haben` ile kurar; `sein` yalnız yer değiştirme ve durum değişimi fiillerinde (gehen, fahren, werden) kullanılır.",
    targets: ["perfekt.haben", "verb.treffen"],
    byNative: {
      en: {
        options: ["habe", "bin", "war", "hatte"],
        answer: 0,
        why: "İngilizcede tek yardımcı fiil var (`have met`), Almancada iki. `treffen` hareket fiili değil, o yüzden `haben`.",
      },
    },
  }

ARALIKLI TEKRAR
Her haftanın en az bir maddesi önceki haftaların bir hedefini yeniden yoklar —
bağı `targets` kuruyor, o yüzden etiketler haftadan haftaya AYNI yazılmalı
("perfekt.haben" iki hafta iki farklı yazımla geçerse zincir kopar).
W5 saf tekrar değil TRANSFER haftası: W1–W4 sözcükleri yeni bağlamlarda.

A2 TEMALARI (A1'in üstüne kurulur, tekrar etmez)
  W1 Geçmiş zaman anlatımı   W2 Sağlık ve randevu   W3 Seyahat ve yol tarifi
  W4 İş ve başvuru           W5 Transfer (W1–W4 yeni bağlamlarda)

DİL
`why` ve `themeTr` Türkçe yazılır (çeviri hattı en/de'ye taşıyacak).
`stem`, `options`, uyaran metinleri HEDEF dilde. `theme` hedef dilde.

BİÇİM KURALLARI
- Marka adı geçmez (Goethe, telc, ÖSD, Cambridge, IELTS…).
- Aynı şık konumu maddelerin %60'ından fazlasında doğru olamaz.
- Doğru şık sistematik olarak en uzun olamaz.
- Her `why` en az 20 karakter; kuralı söyler, cevabı tekrar etmez.
- Şıklar birbirinin aynısı olamaz; `answer` `options` sınırları içinde.
- Okuma metni A2'de 90–130 sözcük; dinleme diyaloğu 6–10 replik.

TESLİM
- 10 dosya, `QuizWeek` tipine uygun
- `npx tsc --noEmit` çıktısında SENİN dosyalarından hata olmamalı
  (`.next/` kaynaklı bayat hatalar var, onlar seninle ilgili değil)
- Son raporda: dosya listesi, export adları, ve her hafta için blok sayıları

KALİTE ÖLÇÜSÜ
Bu bir sınav değil, gelişim aracı. Maddeler öğrenciyi yakalamaya değil, ne
bildiğini ve neyi karıştırdığını göstermeye çalışır. Bir madde yalnızca
"öğrenci bunu bilmiyorsa hangi yanlışı yapar" sorusunun net bir cevabı varsa
iyidir — `why` o cevabı açıklar.
```

---

## B1 promptu (A1 + A2 yazıldıktan sonra — başlatmaya hazır)

A2 promptundan üç farkı var ve üçü de işi kolaylaştırıyor: örnek dosyalar
artık gerçekten var, kontrol betiği yazıldı ve koşulabiliyor, ve kayıt
zorunlu hâle geldi (betik dizini değil **kataloğu** geziyor — kaydedilmeyen
dosya denetlenmemiş kalır).

```
Depo: /home/linkinqark/Desktop/workspace-linux/word-app

GÖREV
Haftalık quiz için B1 seviyesinde 5 haftalık içerik yaz: kurs `de` ve kurs `en`
için beşer paket, toplam 10 dosya:
  src/lib/weekly-quiz/de/b1-w01.ts .. b1-w05.ts   (export const DE_B1_W01 …)
  src/lib/weekly-quiz/en/b1-w01.ts .. b1-w05.ts   (export const EN_B1_W01 …)

ÖNCE OKU — üçü de zorunlu:
  src/lib/weekly-quiz/types.ts        şema ve her alanın gerekçesi
  src/lib/weekly-quiz/de/a1-w01.ts    örnek paket (Almanca)
  src/lib/weekly-quiz/en/a1-w03.ts    örnek paket (İngilizce)
  src/lib/weekly-quiz/de/a2-w01.ts    bir üst seviyenin nasıl kurulduğu
Yazdığın her paket `QuizWeek` tipine uymak zorunda.

KAYIT ZORUNLU
Dosyaları `src/lib/weekly-quiz/index.ts` içindeki `QUIZ_WEEKS` listesine ekle.
Kontrol betiği dizini değil bu listeyi geziyor: kaydedilmeyen paket sessizce
denetlenmemiş kalır. Import sırası A1 → A2 → B1 olacak şekilde ekle.

BLUEPRINT (types.ts `QUIZ_PLAN`) — seviyeden bağımsız, DEĞİŞMEZ
  read 2 · listen 2 · grammar 3 · vocab 2
  `personal` blok YAZILMAZ — çalışma anında öğrencinin SRS'inden üretiliyor.
  Havuz en az 14 madde (`QUIZ_POOL_MIN`); quiz 10 tanesini seçiyor.

SÖZCÜK BÜTÇESİ — B1 KÜMÜLATİF
Her madde yalnız o kursun A1+A2+B1 kelime listesindeki sözcükleri kullanabilir:
  select de, tr, en from words where course='de' and niveau in ('A1','A2','B1');
Kurs `en` için `course='en'`. Liste diskte de var: data/app/words.json (dizi) ve
data/app/words-en.json (satır başına bir nesne).

B1 DİLBİLGİSİ ODAĞI
  de: yan cümle (weil/dass/wenn, fiil sonda) · Konjunktiv II (würde/könnte) ·
      Passiv · ilgi cümlesi (der/die/das) · Genitiv
  en: present perfect ↔ past simple · koşul cümleleri (1./2. tip) ·
      ilgi cümlesi (who/which/that) · edilgen çatı · dolaylı anlatım

ÇELDİRİCİ KURALI — B1'de girişim değişiyor, tablo bu
  tr→de: yan cümlede fiilin sona gitmesi TÜRK öğrenciye tanıdık (Türkçede de
         fiil sonda) — asıl tuzak BAĞLACIN yeri ve ana cümlenin V2'si.
         Konjunktiv II'nin Türkçede doğrudan karşılığı yok (-sa/-se kipiyle
         karışıyor). Genitiv Türkçedeki tamlamayla karışıyor.
  en→de: yan cümlede fiilin sona gitmesi İNGİLİZ öğrencinin en büyük tuzağı
         (İngilizcede sıra değişmez). `würde` ile `would` birebir sanılıyor
         ama Almancada `könnte`/`hätte` yeğleniyor.
  tr→en: present perfect ↔ past simple ayrımının Türkçede karşılığı yok
         ("gördüm" ikisini de karşılıyor) — B1'in en çok karıştırılan yeri.
         Dolaylı anlatımda zaman kaydırması (backshift) Türkçede yok.
  de→en: Almanca Perfekt geçmiş zamanın TAMAMINI karşıladığı için
         "I have seen him yesterday" üretiliyor — klasik ve sistematik hata.
         `since`/`for` ayrımı (`seit` ikisini birden karşılıyor).
         Sahte dostlar B1'de artıyor: `eventually`≠eventuell,
         `actually`≠aktuell, `sensible`≠sensibel, `become`≠bekommen.
  `read`/`listen` maddelerinde `byNative` KULLANMA.

B1 TEMALARI (A1 tanışma/rutin/alışveriş/ev, A2 geçmiş/sağlık/seyahat/iş —
tekrar etme)
  W1 Görüş bildirme ve gerekçelendirme   W2 Medya ve haberler
  W3 Eğitim ve kariyer planları          W4 Çevre ve toplum
  W5 Transfer (W1–W4 yeni bağlamlarda)

ARALIKLI TEKRAR
Her haftanın en az bir maddesi önceki haftaların bir hedefini yeniden yoklar;
bağı `targets` kuruyor, etiketler haftadan haftaya AYNI yazılmalı. W5 saf
tekrar değil TRANSFER haftası ve metin türü bilerek değişir.
Kontrol betiği bu zinciri arıyor ve kopuksa HATA veriyor.

UZUNLUK
B1'de okuma metni 150–220 sözcük, dinleme diyaloğu 8–12 replik.

TESLİM — hepsi geçmeli
  npm run check:quiz      → 0 HATA. Uyarılar: Almanca özel adlar için uyarı
                            normal (Almancada büyük harf özel adı ayırt
                            etmiyor); dinleme parçasında `speaker` alanına
                            yazılan adlar kendiliğinden muaf oluyor.
  npx tsc --noEmit        → senin dosyalarından hata olmamalı
  npm run test:quiz       → 45/45 kalmalı (kırılırsa şemadan sapmışsındır)
Değişikliklerini TEK atomik commit olarak yerelde bırak, push etme.
Son raporda: dosya listesi, export adları, her hafta için blok sayıları ve
check:quiz çıktısının son satırı.

KALİTE ÖLÇÜSÜ
Bu bir sınav değil, gelişim aracı. Bir madde yalnızca "öğrenci bunu
bilmiyorsa hangi yanlışı yapar" sorusunun net bir cevabı varsa iyidir ve
`why` o cevabı açıklar. B1'de bu daha da önemli: bu seviyede hatalar artık
bilgi eksikliğinden değil, anadilin yapısını hedef dile taşımaktan geliyor.
```

---

## B2 promptu

B1 ile aynı iskelet; değişen tema tablosu, seviye bütçesi ve girişim tablosu.
B2'de girişimin karakteri bir kez daha değişiyor: artık tekil kural hataları
değil, **anadilin üslubunun** hedef dile taşınması ölçülüyor.

```
Depo: /home/linkinqark/Desktop/workspace-linux/word-app

GÖREV
Haftalık quiz için B2 seviyesinde 5 haftalık içerik yaz: kurs `de` ve kurs `en`
için beşer paket, toplam 10 dosya:
  src/lib/weekly-quiz/de/b2-w01.ts .. b2-w05.ts   (export const DE_B2_W01 …)
  src/lib/weekly-quiz/en/b2-w01.ts .. b2-w05.ts   (export const EN_B2_W01 …)

ÖNCE OKU — dördü de zorunlu:
  src/lib/weekly-quiz/types.ts        şema ve her alanın gerekçesi
  src/lib/weekly-quiz/de/a2-w01.ts    örnek paket (Almanca)
  src/lib/weekly-quiz/en/a2-w04.ts    örnek paket (İngilizce, iyi çeldiriciler)
  src/lib/weekly-quiz/de/b1-w01.ts    bir alt seviyenin nasıl kurulduğu
Yazdığın her paket `QuizWeek` tipine uymak zorunda.

KAYIT ZORUNLU
Dosyaları `src/lib/weekly-quiz/index.ts` içindeki `QUIZ_WEEKS` listesine ekle.
Kontrol betiği dizini değil bu listeyi geziyor: kaydedilmeyen paket sessizce
denetlenmemiş kalır.

BLUEPRINT (types.ts `QUIZ_PLAN`) — seviyeden bağımsız, DEĞİŞMEZ
  read 2 · listen 2 · grammar 3 · vocab 2
  `personal` blok YAZILMAZ. Havuz en az 14 madde; quiz 10 tanesini seçiyor.

SÖZCÜK BÜTÇESİ — B2 KÜMÜLATİF
  select de, tr, en from words where course='de' and niveau in ('A1','A2','B1','B2');
Kurs `en` için `course='en'`. Diskte: data/app/words.json (dizi),
data/app/words-en.json (satır başına bir nesne).

B2 DİLBİLGİSİ ODAĞI
  de: Konjunktiv II (gerçek dışı) · Passiv (tüm zamanlarda, modal ile) ·
      obwohl/damit/sodass · Partizipialattribut · Genitiv zinciri ·
      indirekte Rede (Konjunktiv I) · Nominalisierung
  en: past perfect ve present perfect continuous · 3. tip koşul ·
      modal perfect (must have been) · tanımlayan ↔ tanımlamayan ilgi cümlesi ·
      edilgen + bildirme fiilleri (is said to) · deyimsel fiiller · ölçülü dil

ÇELDİRİCİ KURALI — B2'de girişim ÜSLUP düzeyine çıkıyor
  tr→de: indirekte Rede tuzak, çünkü Türkçede `-miş` zaten bir kanıtsallık
         kipi ve Konjunktiv I'e YANLIŞ eşleniyor — öğrenci aktarımı kipsiz
         kuruyor ya da `-miş` sezgisiyle yanlış yerde kullanıyor.
         Partizipialattribut ise TANIDIK (Türkçede de ortaçlı sıfat cümlesi
         isimden önce gelir) — orada tuzak yapı değil, uzunluk.
         Nominalisierung Türkçedeki `-me/-ma` ile karışıyor.
  en→de: Partizipialattribut İngilizcede YOK; öğrenci ilgi cümlesine kaçıyor.
         Konjunktiv I'in karşılığı yok, `würde` ile karıştırılıyor.
         Karmaşık cümlede fiilin sona gitmesi hâlâ bozuluyor.
  tr→en: perfect görünüşleri Türkçede tek biçime düşüyor; past perfect
         gereksiz yerde kullanılıyor ya da hiç kullanılmıyor.
         Deyimsel fiillerin (`put off`, `bring up`) Türkçede karşılığı yok,
         öğrenci tek sözcüklü resmî eşdeğerine kaçıyor.
         Soyut isimlerde tanımlık (`the society` ↔ `society`).
  de→en: NOMİNAL ÜSLUP AKTARIMI — Almancanın isimleştirme eğilimi İngilizceye
         taşınınca ağır ve yapay cümle çıkıyor ("the realisation of the
         implementation"); İngilizce fiil yeğler. B2'nin en karakteristik
         hatası budur ve en az bir madde bunu ölçmeli.
         Sahte dostlar derinleşiyor: `chef`≠Chef, `gymnasium`≠Gymnasium,
         `konkurrenz`, `eventually`≠eventuell, `sensible`≠sensibel.
         `since`/`for` ve modal perfect'te Almanca sırası.
  `read`/`listen` maddelerinde `byNative` KULLANMA.

B2 TEMALARI (A1 gündelik, A2 geçmiş/sağlık/seyahat/iş, B1 görüş/medya/
eğitim/çevre — hiçbirini tekrar etme)
  W1 İş yerinde iletişim ve müzakere   W2 Bilim ve teknoloji
  W3 Kültür, sanat ve kimlik           W4 Ekonomi, tüketim ve etik
  W5 Transfer (W1–W4 yeni bağlamlarda)

ARALIKLI TEKRAR
Her haftanın en az bir maddesi önceki haftaların bir hedefini yeniden yoklar;
bağı `targets` kuruyor ve etiketler haftadan haftaya AYNI yazılmalı. W5 saf
tekrar değil TRANSFER haftası, metin türü de bilerek değişir. Kontrol betiği
zinciri arıyor ve kopuksa HATA veriyor.

UZUNLUK
B2'de okuma metni 220–320 sözcük, dinleme diyaloğu 10–14 replik.

TESLİM — hepsi geçmeli
  npm run check:quiz      → 0 HATA (Almanca özel ad uyarıları normal;
                            dinleme `speaker` alanındaki adlar muaf)
  npx tsc --noEmit        → senin dosyalarından hata olmamalı
  npm run test:quiz       → 45/45 kalmalı
Değişikliklerini TEK atomik commit olarak yerelde bırak, push etme.
Son raporda: dosya listesi, export adları, hafta başına blok sayıları ve
check:quiz çıktısının son satırı.

KALİTE ÖLÇÜSÜ
Bir madde yalnızca "öğrenci bunu bilmiyorsa hangi yanlışı yapar" sorusunun
net bir cevabı varsa iyidir; `why` o cevabı açıklar, cevabı tekrar etmez.
B2'de ölçülen şey kural bilgisi değil, anadilin üslubuna direnebilmek — bu
yüzden çeldirici "yanlış seçenek" değil, öğrencinin GERÇEKTEN yazacağı cümle
olmalı.
```

---

## Üst seviyeler için

Yalnız iki şey değişir: **tema tablosu** ve **sözcük bütçesi sorgusundaki
`niveau` listesi** (B1 için `('A1','A2','B1')` gibi — bütçe her zaman kümülatif).
Blok dağılımı, çeldirici kuralı, `why` zorunluluğu ve aralıklı tekrar kuralı
seviyeden bağımsızdır; değiştirilirse quiz'ler seviyeler arasında
karşılaştırılamaz hâle gelir.
