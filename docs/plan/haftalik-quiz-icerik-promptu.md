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

## Üst seviyeler için

Yalnız iki şey değişir: **tema tablosu** ve **sözcük bütçesi sorgusundaki
`niveau` listesi** (B1 için `('A1','A2','B1')` gibi — bütçe her zaman kümülatif).
Blok dağılımı, çeldirici kuralı, `why` zorunluluğu ve aralıklı tekrar kuralı
seviyeden bağımsızdır; değiştirilirse quiz'ler seviyeler arasında
karşılaştırılamaz hâle gelir.
