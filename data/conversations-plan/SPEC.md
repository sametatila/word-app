# Ders Üretim Şartnamesi

Bu belge, ders içeriği üreten ajanın (Opus) uyacağı sözleşmedir. Müfredat
`topics-a1.md … topics-c1.md` dosyalarında; her satır bir ders. Ajan bir
partide (genellikle 10–20 ders) bu satırları alır ve aşağıdaki kurallarla tam
derslere dönüştürür. **Bu belgeden sapmak yasaktır; belirsizlikte mevcut altı
örnek ders (src/lib/lessons/content/de-*.ts) emsaldir.**

## 1. Ürünün ne olduğu

Ders, Türkçe konuşan bir yetişkine Almanca öğreten **sesli, etkileşimli bir
senaryo**. İki fazı var:

1. **Anlatım (lecture):** Öğretmen Türkçe anlatır, hedefler Almancadır.
   Kelimeler tek tek söyletilir, kalıp açıklanır, örnek tekrar ettirilir,
   öğrenciden kendi cümlesini ÜRETMESİ istenir, doğru/yanlış ile sınanır.
   Her adım konuşarak cevaplanır. Metinler sesli okunur: **yazı dili değil,
   sıcak ve doğal konuşma dili yaz.**
2. **Konuşma (roleplay):** Model, sahnedeki karakteri oynar ve konuşmayı
   dersin kalıplarının kullanılacağı yöne sürer. Sen yalnızca sahneyi, rolü
   ve açılış repliğini yazarsın; konuşmanın kendisi çalışma anında üretilir.

## 2. Dosya ve kayıt düzeni

- Parti dosyası: `src/lib/lessons/content/de-<seviye>-b<NN>.ts`
  (ör. `de-a1-b01.ts`), dışa aktarım: `export const deA1B01: Lesson[] = [...]`.
- Her seviyenin **ilk partisi**, o seviyenin mevcut örnek derslerini kendi
  konu numarasındaki yerine **taşır** (obje birebir kopyalanır, eski dosya
  silinir) — katalog sırası böylece hep konu numarası sırası olur.
- `src/lib/lessons/index.ts` içindeki `LESSONS` dizisine parti, konu
  numarası sırasını koruyacak konuma eklenir.
- Kimlik: `de-<seviye>-<slug>` — slug, konular dosyasında verilmiştir;
  değiştirme. İkon da konular dosyasından gelir (tip: `LessonIcon`).
- İçerik dosyaları `tr()` ve `de()` yardımcılarını `../types`'tan alır.

## 3. Ders iskeleti (zorunlu sıra)

Adım sayısı 14–24. Sıra:

1. **Onay girişi** (`confirm`): "Merhaba/Bugün …! X, Y ve Z'yi öğreneceğiz.
   Başlamaya hazır mısın?" — dersin vaadini somut söyler.
2. **Çerçeve** (beklentisiz `say`): kalıpların ne işe yaradığı, tek küçük
   paragraf. Sonu "Önce kelimeleri öğrenelim." benzeri bir köprü.
3. **5 kelime, 5 `repeat` adımı.** Kalıp: "İlk/İkinci/Üçüncü/Dördüncü/Son
   kelimemiz:" + `de(kelime)` + "Türkçesi '…' demek. Lütfen" + `de(kelime)` +
   "deyin." Sıra sabittir; övgüyü motor ekler, içerik eklemez.
4. **Kalıp blokları** (kalıp başına): açıklama `say` → örnek cümle `repeat` →
   `produce`. En az 2 kalıp bloğu; üçüncü kalıp (soru kalıbı gibi) tek
   `repeat` ile verilebilir.
5. **`truefalse`**: "Son bir doğru-yanlış alıştırması:" + `de(cümle)` +
   "cümlesi doğru mu, yanlış mı?" — yargılanan cümle MUTLAKA bir `de`
   segmentinde geçer.
6. **Kapanış** (beklentisiz `say`): bir cümle özet + konuşma sahnesine köprü
   ("Şimdi … karşısındasın: …"). Beklenti YOK — düğmeyle geçilir.

Puanlanan adımlar: en az 2 `produce` + 1 `truefalse` (toplam ≥ 3).

## 4. Dil kalitesi — en önemli bölüm

**Türkçe (anlatım):**
- Sen-diliyle, sıcak, kısa cümleler. Çeviri kokusu yasak: "Bu, senin için
  önemlidir" değil, "Bunu çok kullanacaksın".
- Dilbilgisi terimlerini Türkçe karşılığıyla ve EN AZ terimle anlat; terimi
  kullanacaksan bir kez tanımla ("belirtme hâli, yani Akkusativ").
- Türkçeyle KARŞITLIK kur: kural, Türkçede olmayan/farklı olan şey üzerinden
  anlatılır ("Türkçede fiil sona gider, Almancada ikinci sırada durur").
- Çeviriler doğal Türkçe: "Ich möchte einen Kaffee" → "Bir kahve istiyorum"
  (asla "Ben bir kahveyi istemekteyim" gibi).

**Almanca (hedefler):**
- Kusursuz ve seviyeye uygun. Kelimeler havuzun o seviyedeki katmanıyla
  hizasında (`data/app/words.json`, `niveau`); seviyenin üstünde yapı ve
  kelime kullanma.
- Adlar HEP artikelli öğretilir: `das Fieber`. Fiiller mastar hâlinde;
  dönüşlüler `sich` ile.
- Hedef cümleler KONUŞULABİLİR olmalı: tanıyıcı dostu, 3–9 kelime; özel ad
  gerekiyorsa yaygın olanlar (Anna, Ali, Berlin, Izmir). Noktalama hedefin
  parçası değildir (değerlendirme noktalamayı zaten atar).
- Bir üretim hedefinin eşdeğer doğru biçimleri varsa `accept` listesine yaz.

**Segment disiplini:**
- Türkçe metin `tr()`, Almanca metin `de()` segmentinde durur — HİÇ karışmaz.
  Almanca kelimeyi Türkçe cümlenin içine yazmak yasaktır (yanlış sesle
  okunur). Kalıbın devamı "…" ile gösterilebilir (seslendirmede atılır).
- Parantezli açıklama yazma: seslendirme parantez içini okumaz, anlam kaybolur.

## 5. Alıştırma tasarımı

- **`produce` ipucu (`hint`):** önce hatanın tipik SEBEBİ, sonra doğru cümle
  `de` segmentinde, sonunda "Tekrar dene." — ipucu "yanlış" demez, öğretir.
- **`truefalse`:** cümlede TEK ve net bir hata olur (ya da cümle doğrudur).
  `answer` dağılımı katalog genelinde %25–60 doğru olmalı — hep "yanlış"
  yazarsan öğrenci okumadan cevaplıyor. `why` hatayı adlandırır ve doğrusunu
  `de` segmentiyle verir.
- Üretim hedefleri katalogda benzersiz olsun; aynı cümleyi iki derse koyma.
- Önceki derslerin kelimelerini örneklerde ve konuşmada YENİDEN KULLAN
  (sarmal tekrar) — ama `vocab` listesine yalnızca yeni öğretilen 5 kelime
  girer. Aynı seviyede bir kelime iki kez "yeni" diye öğretilmez.

## 6. Konuşma fazı (roleplay)

- `scene`: Türkçe, öğrenciye emir kipiyle ne yapacağını söyler ve dersin
  kalıplarını adres gösterir (30+ karakter).
- `partner`: Türkçe sıfat + rol ("sabırsız ama iyi kalpli bir satıcı").
- `opening`: Almanca, en fazla 2 cümle, SORUYLA biter. `openingTr` doğal
  Türkçesi.
- `goal`: Türkçe, tek cümle — konuşma NE OLUNCA tamamlanır. Bir konu başlığı
  değil bir SONUÇ yazılır: "Sipariş verilmiş, gelmiş ve hesap istenmiş olur."
  Sahnenin kopyası olamaz; sahne öğrencinin ne yapacağını, amaç konuşmanın
  nerede biteceğini söyler. Bu alan olmadan model tur sayısı dolana kadar soru
  soruyor ve konuşma bitmiyor, KESİLİYOR.
- `minTurns`: 6–9. Sabit değil, `goal`in kaç adım istediğine bağlı: iki
  sonuçlu amaç taban turu, üç ve daha çok sonuçlu amaç bir tur fazlasını alır.
  Taban seviyeyle yükselir (A1 6, A2 7, B1 8); adım sayısı fazlaysa sırasıyla
  7, 8, 9. (Model konuşmayı dört fazda sürüyor — açılış, gelişme, toparlama,
  kapanış — ve son turda amacı sonuçlandırıp veda ediyor; sistem hallediyor,
  içerik karışmaz.)
- Dersin çevrimdışı `script`i varsa tur sayısı `minTurns`tan az olamaz: az
  olursa sağlayıcısız ortamda ders hiç geçilemez (doğrulayıcı hata verir).

## 7. Meta alanlar

- `title` Almanca senaryo adı ("Beim Arzt"); `titleTr` kısa Türkçesi.
- `summary` tek cümle: dersin NE öğrettiği ("… öğretir: …" kalıbı iyi).
- `minutes`: A1–A2 → 8–9, B1 → 10, B2 → 11, C1 → 12.
- `focusId` konular dosyasından; aynı odak birden çok derste olabilir
  (sarmal), ad UYDURMA — dosyadakini kullan.
- `icon` konular dosyasından. Geçerli değerlerin tek kaynağı
  `src/lib/lessons/types.ts` içindeki `LessonIcon` tipidir (65 simge);
  listede olmayan bir değer tip hatası verir. Simge eklemek üreticinin işi
  değildir — konu dosyasındaki değeri aynen kullan.

## 8. Kalite kapıları — partiyi bitirmeden

1. `npx tsc --noEmit` → sıfır hata.
2. `npm run check:lessons` → sıfır HATA; uyarıları oku, haklıysa düzelt.
3. Kendi gözden geçirmen: her Almanca cümleyi ana dili Almanca biri gibi,
   her Türkçe cümleyi ana dili Türkçe biri gibi oku. Emin olmadığın cümleyi
   YAZMA — daha basitini yaz.
4. Aynı partide iki dersin aynı sahne/aynı soru kalıbıyla açılmadığını
   kontrol et: girişler, örnekler ve sahneler çeşitlensin.

## 9. Yasaklar

- Motorun eklediği övgüyü içeriğe yazmak (tekrar/üretimden sonraki adım
  övgüyle başlamaz).
- Markdown/yıldız/madde işareti (metinler sesli okunuyor).
- Seviye üstü kelime ve yapı; birden çok yeni kural aynı derste.
- "Ders 12" gibi künye dili; her ders kendi başına bir sohbettir.
- Konu dosyasındaki id/başlık/ikon/odak alanlarını değiştirmek.
