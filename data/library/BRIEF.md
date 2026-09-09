# Beceriler kütüphanesi — içerik yazım şartnamesi

Girdi dosyaları (`data/library/in/`) ÜRETİLİR, depoda tutulmaz:

```
npm run prep:library      # pools/ · avoid/ · used/ klasörlerini yazar
```

Dil bilgisi odakları: `data/library/grammar-plan.md` (hücre başına beş ayrı kural).

Sen bir kurs × seviye × PARTİ dosyası yazıyorsun:
`src/lib/skills/content/library/<kurs>-<seviye>-p<N>.ts` (yer tutucu hazır, doldur).
Dosyada BEŞ egzersiz olacak, her beceriden bir tane: okuma, dinleme, yazma, konuşma, dil bilgisi.
Kimlik sonu partinin numarasıdır: parti 2 → `de-a1-lib-r2`, `-l2`, `-w2`, `-s2`, `-g2`.
Kaynak tipler: `src/lib/skills/types.ts` (oku). Emsal dosyalar: `library/de-a1.ts` ve `library/en-a1.ts`
(ikisini de OKU; biçim, ton ve derinlik oradaki gibi olacak).

HEDEF: her hücrede (kurs × seviye × beceri) beş egzersiz. Parti 1 yazıldı;
sen bir sonraki seti yazıyorsun. `data/library/in/used/<kurs>-<seviye>.txt` o hücrede
ZATEN VAR olan konuları listeler — okumadan yazma.

Depo kuralı: **yalnız kendi dosyana yaz.** Başka hiçbir dosyaya dokunma, `git add`/commit yapma.

## 1. Ürün ne

Öğrenci Patika'nın sırasına bağlı kalmadan seviyesini ve becerisini seçip kendi başına çalışıyor.
Her egzersiz kendi başına duran, özgün, seviyeye uygun ve **öğreten** bir parça: sadece soru sormaz,
her cevaptan sonra "neden"i söyler (`explain`), yazma ve monologda rubrik geri bildirimi alır,
söyleyiş drillinde bilinen sapmayı (`confusions`) yakalar.

Anadil Türkçe; hedef dil kurs (`de` Almanca, `en` İngilizce). **Alan adı `de` hedef dil metnini
taşır — İngilizce kursta `de` alanına İngilizce yazılır.** Türkçe alanlar: `intro`, `genre`,
`tr`, `explain`, `hint`, `prompt`, `checklist`, `promptTr`, `bulletsTr`, `focus`, `explanation[].tr`.

## 2. Kopya yasağı (en önemli kural)

İKİ liste okunacak:

1. `used/<kurs>-<seviye>.txt` — kütüphanede o hücrede zaten var olan egzersizler.
   Aynı sahneyi, aynı metin türünü ve aynı dil bilgisi odağını TEKRARLAMA.
   Beş okuma metni beş FARKLI tür olmalı (ilan, e-posta, haber, blog, kural
   metni, program, yorum…); beş dinleme beş farklı biçim (diyalog, telefon,
   anons, röportaj, sesli mesaj, tanıtım konuşması); beş dil bilgisi BEŞ AYRI
   kural.
2. `avoid/<kurs>-<seviye>.txt` — Patika, ders ve deneme kâğıdı içeriği.

`avoid/<kurs>-<seviye>.txt` dosyasını oku. Oradaki ders başlıkları, ünite egzersiz başlıkları ve
deneme sınavı metinleri **tekrar edilmez**: aynı sahne, aynı karakter adları dizisi, aynı metin
türü + aynı konu birleşimi yasak. Konu yakın olabilir (A1'de hayat sınırlı) ama metin, durum,
ayrıntılar ve sorular yeni olacak. Mevcut dosyaları kopyalayıp değiştirmek yasak.

Kurum/sınav markası geçmez: goethe, telc, ösd, testdaf, dtz, cambridge, ielts, toefl, toeic,
pearson, british council vb. (doğrulayıcı hata verir).

## 3. Kelime havuzuna riayet

`pools/<kurs>-<seviye>.txt`: seviyenin katmanı + alt seviyelerin kelimeleri. Metnin kelimeleri
büyük ölçüde bu kümeden gelir. Havuz dışı kelime A1/A2'de %10'u geçmez; B1+'da bilerek seçilmiş,
sözlükçede açıklanmış birkaç kelime olabilir. Özel adlar (kişi, şehir), sayılar ve gün/ay adları
serbest. Sözlükçeye (`gloss`) metnin **kilit** kelimelerini koy (5–8; A1'de 4–6); her sözlükçe
maddesi metinde gerçekten geçmeli. `tr` TEK doğal karşılık (virgülle ikinci anlam yok, parantez
yok); havuzda kelime varsa havuzun karşılığını birebir kullan, metin başka anlamda kullanıyorsa
bağlamdaki anlamı yaz. Almanca kursta `en` alanı da ver (tek İngilizce karşılık); İngilizce kursta
`en` yazma.

Seviye yapı sınırı (Almanca): A1 Präsens, sık Perfekt, ana cümle, `können/möchten/müssen`;
A2 Perfekt, modal, weil/dass, Dativ edatları; B1 yan cümle çeşitleri, Konjunktiv II nezaket,
Passiv Präsens; B2 Passiv çeşitleri, Konjunktiv, Partizip; C1 serbest, ama seviyenin işi
üslup SEÇİMİ (nominal/verbal, ironi, kayıt).
İngilizce: A1 present simple/continuous, can, there is; A2 past simple, going to/will,
comparatives, present perfect'e giriş; B1 present perfect vs past, conditionals 1–2, passive,
reported speech'e giriş; B2 conditionals 3/mixed, wish, passive çeşitleri, relative clauses,
modals of deduction; C1 inversion, cleft, nominalisation, hedging, register.

## 4. Uzunluk ve biçim sınırları (doğrulayıcı ölçer)

- Okuma metni kelime: A1 60–120 · A2 100–180 · B1 150–260 · B2 200–350 · C1 250–450. Hedef
  aralığın ORTASI (A1 ~90, A2 ~140, B1 ~210, B2 ~280, C1 ~350).
- Dinleme: `segments[]` — diyalogda `speaker` var; her bölüm ≤ 40 kelime. Toplam A1 ~80,
  A2 ~130, B1 ~200, B2 ~260, C1 ~320 kelime. Konuşma dili: kısa cümleler, dolgu sözcükleri
  (A1'de az), doğal kesintiler. Metin TTS ile seslendirilecek: rakam yerine yazıyla sayı,
  kısaltma yok.
- Sorular: okuma/dinleme 5–6, dil bilgisi 8–10. Soru metni ≤ 30 kelime, `explain` tek cümle
  ≤ 200 karakter, Türkçe, metnin neresinde/kural ne diyor.
- Soru türleri (`kind`): `mcq` (3 şık; şıklar benzer uzunlukta, tek doğru), `truefalse`
  (`options: ["Richtig","Falsch"]` Almanca / `["True","False"]` İngilizce), `gapfill`
  (soruda `___`, `accept[]` ilk kanonik, varsa yazım varyantı), `short_answer` (`accept[]`
  ≤ 5 kelime), `dictation` (yalnız dinlemede; cümle bir bölümde aynen geçer), `order`
  (`items[]` 3–6 doğru sıra). Okuma/dinlemede en az 2 soru çoktan seçmeli DEĞİL.
  Yazılı türlerde `options: []`, `answer: 0`.
- Doğru şıkkı hep 0'a yazma zorunluluğu yok ama `answer` doğru indeksi göstermeli;
  paket yükleyici şıkları kendisi karıştırır.
- `minutes`: okuma A1 3 … C1 8; dinleme benzer; yazma 6–10; konuşma 4–6; dil bilgisi 5–7.
- `genre`: Türkçe tür etiketi ("İlan", "E-posta", "Sohbet", "Podcast", "Monolog",
  "Ses çalışması", "Kural"…). `title`: hedef dilde, kısa.
- `intro`: Türkçe TEK cümle: durum + ne yapılacak. Almanca/İngilizce kelime geçirme.

## 5. Beceri başına tasarım

**Okuma (`skill: "reading"`, id `-lib-r1`).** Gerçek hayattan bir metin türü. Sorular sırayla:
ana fikir → ayrıntı → çıkarım/tutum (B1+) → 2 yazılı soru. Şıklar metinden "aynı kelime"
tuzağı içerebilir (B1+).

**Dinleme (`skill: "listening"`, id `-lib-l1`).** Diyalog ya da tek konuşmacı (anons, sesli
mesaj, podcast). Sorular dinleme hedefleri: kim/ne/ne zaman (A1–A2), tutum/ima (B1+).
`dictation` sorusu bir bölümdeki tam cümleyi ister (kısa, ≤ 8 kelime).

**Yazma (`skill: "writing"`, id `-lib-w1`).** `tasks[]` 3 görev: 2 × `build` (Türkçe cümle →
hedef dilde kanonik cümle, `alternatives` ile eşdeğer dizilişler, `hint` Türkçe dil bilgisi
ipucu) + 1 × `free` (senaryo `prompt` Türkçe; varsa `stimulus` hedef dilde gelen mesaj/ilan;
`checklist` 3–4 madde; `minWords` A1 25, A2 40, B1 60, B2 90, C1 120; `phrases` 3–5 kalıp
(`de`/`tr`); `sample` hedef dilde, minWords'ü geçen özgün örnek). Mobilde yalnız `build` ve
`free` çalışıyor — başka görev türü kullanma.

**Konuşma (`skill: "speaking"`).**
- A1 ve A2: **söyleyiş drilli** (id `-lib-s1`): `tasks[]` 6–8 cümle, her `de` ≤ 12 kelime, `tr`
  doğal karşılık, `hint` Türkçe telaffuz ipucu, `confusions[]` (Türkçe konuşanın o cümlede
  yapacağı sapma: `heard` tanıyıcının üreteceği yanlış biçimler, `fix` tek cümle düzeltme,
  `expected` doğru kelime). Drilli tek bir ses/kalıp odağına kur (Almanca: ch, r, ü/ö, z=ts,
  w/v, st/sp, ei/ie, uzun-kısa ünlü, vurgu; İngilizce: th, w/v, r, /æ/-/e/, -ed sonları, kelime
  vurgusu, schwa, bağlantılı konuşma). `genre: "Ses çalışması"`, `minutes: 4`.
- B1, B2, C1: **monolog** (id `-lib-s1`): `monologue: { promptTr, bulletsTr (3–5), targets
  (3–5 kalıp de/tr), minSeconds, maxSeconds, sampleDe (≥ 60 kelime, seviyeye uygun), rubricHint? }`.
  Süre B1 40–75, B2 50–90, C1 60–110. `genre: "Monolog"`, `gloss: []`, `minutes: 5`.
  Görev seviyeye göre: B1 görüş + gerekçe, B2 karşılaştırma/tartışma, C1 savunma/değerlendirme.

**Dil bilgisi (`skill: "grammar"`, id `-lib-g1`).** `focus` (Türkçe tek satır kural adı; Almanca
kursta kuralın adını da geçir: "Akkusativ: den / einen"), `explanation[]` 2–4 blok: `heading?`,
`tr` (Türkçeyle KARŞITLIK kurarak, sen-diliyle, kısa; terim kullanacaksan bir kez tanımla),
`examples[]` 2–4 ({ de, tr, note? }). `questions[]` 8–10: `mcq` (üç şık, çeldiriciler kuralın
tipik hatası), `gapfill` (çekim/biçim yazdır), `order` (sözdizimi), `truefalse` (doğru mu?).
Her `explain` kuralı bir kez daha somut söyler. `gloss` 3–5 (örneklerde geçen kilit kelimeler).
`genre: "Kural"`, `minutes: 6`.

Seviye başına odak (verildi, değiştirme):
| | Almanca | İngilizce |
|---|---|---|
| A1 | Akkusativ: den / einen (belirtme hâli) | Present simple: do/does, üçüncü tekilde -s |
| A2 | Perfekt: haben/sein + Partizip II | Past simple: düzenli/düzensiz fiiller, did ile soru |
| B1 | Nebensatz: weil / dass / wenn — fiil sona | Present perfect ile past simple: since/for, already/yet |
| B2 | Passiv: Vorgangs- ve Zustandspassiv, Präsens/Präteritum | Conditionals 2–3 ve wish |
| C1 | Nominalstil ↔ Verbalstil, Partizipialattribut | Inversion ve vurgu: not only…, hardly…, cleft |

## 6. Dosya biçimi

```ts
import type { SkillExercise } from "../../types";

/** <KURS> · <SEVİYE> — Beceriler kütüphanesi, ilk parti (2026-09-08). */
export const deA2: SkillExercise[] = [
  { id: "de-a2-lib-r1", course: "de", level: "A2", skill: "reading", title: "…", genre: "…", intro: "…", gloss: [...], minutes: 4, text: "…\n\n…", questions: [...] },
  { id: "de-a2-lib-l1", course: "de", level: "A2", skill: "listening", ..., segments: [{ speaker: "…", text: "…" }, …], questions: [...] },
  { id: "de-a2-lib-w1", course: "de", level: "A2", skill: "writing", ..., tasks: [...] },
  { id: "de-a2-lib-s1", course: "de", level: "A2", skill: "speaking", ..., tasks: [...] },   // A1–A2 drill; B1+ monologue
  { id: "de-a2-lib-g1", course: "de", level: "A2", skill: "grammar", ..., focus: "…", explanation: [...], questions: [...] },
];
```

Dışa aktarım adı: `deA1, deA2, deB1, deB2, deC1, enA1, enA2, enB1, enB2, enC1` (dosyadaki
yer tutucuyu koru). `course` alanı HER egzersizde yazılır. `unit` alanı YAZILMAZ.
Almanca kursta `ß` kullanılır; İngilizce kursta İngiliz/Amerikan yazımı tutarlı (Amerikan).
Metinlerde Türkçe harf yok (özel adlar hariç). Emoji yok. Tırnak: Almanca alıntıda „…“, Türkçe
açıklamada normal tırnak.

## 7. Bitince kendin doğrula

```
npx tsc --noEmit -p tsconfig.json                 # tip hatası yok (başka dosyalarınki seni ilgilendirmez)
npm run -s test:content -- skills --verbose       # kendi kimliklerin (-lib-) hiç görünmemeli
npm run -s check:libvocab -- <kurs> <seviye>      # havuz dışı oranı
npm run -s report:library -- <kurs>               # kopya denetimi: "Kütüphane içi kopya" satırı
```

Son komuttaki **"Kütüphane içi kopya"** senin egzersizini öteki kütüphane
egzersizleriyle karşılaştırır; kimliğin orada görünüyorsa metni değiştir.

TÜRKÇE TIRNAK UYARISI: Almanca alıntıda açılış `„` ise kapanış `“` olmalı
(düz `"` string'i kapatır ve dosya derlenmez).

Uyarı listesinde kendi kimliklerin (`-lib-`) geçmemeli; geçiyorsa düzelt. Havuz dışı oranı
A1/A2 ≤ %10, B1 ≤ %15, B2/C1 ≤ %20 hedef. Bittiğinde yalnız şunu döndür: dosya yolu, beş egzersizin
kimlik+başlık listesi, doğrulayıcı sonucu (hata/uyarı sayısı, havuz dışı oranı) ve tereddüt
ettiğin en fazla üç nokta.
