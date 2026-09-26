# Beceriler kütüphanesi — yazım şartnamesi

Öğrenci Patika sırasına bağlı kalmadan seviye ve beceri seçip çalışır. Her egzersiz kendi başına
duran, özgün, seviyeye uygun ve öğreten bir parçadır: her cevaptan sonra "neden"i söyler
(`explain`), yazma ve monologda rubrik alır, söyleyiş drillinde bilinen sapmayı (`confusions`) yakalar.

## Durum ve dosya

Her hücrede (kurs × seviye) 20 parti yazıldı: `library/<kurs>-<seviye>.ts` (parti 1) ve
`-p2.ts` … `-p20.ts`. Sıradaki parti **p21**.

- Dosya: `src/lib/skills/content/library/<kurs>-<seviye>-p<N>.ts`, kaydı `library/index.ts`.
- Dışa aktarım adı: `deA1P21` biçimi (kurs + seviye + `P` + parti).
- Dosyada beş egzersiz, her beceriden bir: okuma, dinleme, yazma, konuşma, dil bilgisi.
- Kimlik: `<kurs>-<seviye>-lib-<r|l|w|s|g><N>`, `N` = parti (`de-a1-lib-r21`). Denetleyici biçimi,
  seviyeyi, kursu ve beceri harfini sınar.
- `course` her egzersizde yazılır; `unit` yazılmaz (Patika'ya sızar).
- Tipler: `src/lib/skills/types.ts`. Emsal: `library/de-a1.ts`, `library/en-a1.ts`.
- Yalnız kendi dosyana yaz.

Girdi dosyaları üretilir, depoda tutulmaz: `npm run prep:library` → `data/library/in/`
(`pools/`, `avoid/`, `used/`).

## Dil

Anadil Türkçe; hedef dil kurs (`de` Almanca, `en` İngilizce). Alan adı `de` hedef dil metnini
taşır: İngilizce kursta `de` alanına İngilizce yazılır. Türkçe alanlar: `intro`, `tr`, `explain`,
`hint`, `prompt`, `checklist`, `promptTr`, `bulletsTr`, `focus`, `explanation[].tr`.

Almanca kursta `ß`. İngilizce kursta Amerikan yazımı ve sözcük seçimi. Hedef dil metninde Türkçe
harf yok (özel adlar hariç). Emoji yok. Almanca alıntıda `„…“` (düz `"` string'i kapatır).

## Kopya yasağı

1. `used/<kurs>-<seviye>.txt`: o hücrede zaten var olan egzersizler. Aynı sahne, aynı metin
   türü, aynı dil bilgisi odağı tekrarlanmaz. `used/`daki odakları oku ve yeni bir kural seç.
2. `avoid/<kurs>-<seviye>.txt`: Patika, konuşma ve deneme sınavı içeriği. Aynı sahne, aynı
   karakter adı dizisi, aynı tür + konu birleşimi yasak. Mevcut dosyayı kopyalayıp değiştirmek yasak.

Kurum ve sınav markası (Goethe, telc, ÖSD, Cambridge, IELTS, TOEFL…) geçmez. Kütüphane için bunu
otomatik tarayan kapı yok; marka listesi yalnız `check:quiz` ve `check-mock-exams.ts`te. Kendin bak.

## Kelime havuzu

`pools/<kurs>-<seviye>.txt`: seviyenin katmanı + alt seviyeler. Havuz dışı oran hedefi A1/A2
≤ %10, B1 ≤ %15, B2/C1 ≤ %20; özel adlar, sayılar, gün/ay adları serbest. Ölçüm `check:libvocab`.

Sözlükçe (`gloss`): metnin kilit kelimeleri, 5–8 (A1'de 4–6), her biri metinde geçer. `tr` tek
doğal karşılık; havuzda varsa havuzunkini kullan. Almanca kursta `en` de yazılır; İngilizce kursta yazılmaz.

Seviye yapısı (Almanca): A1 Präsens, sık Perfekt, ana cümle, `können/möchten/müssen`; A2 Perfekt,
modal, weil/dass, Dativ edatları; B1 yan cümleler, Konjunktiv II nezaket, Passiv Präsens; B2 Passiv
çeşitleri, Konjunktiv, Partizip; C1 üslup seçimi (nominal/verbal, kayıt).
İngilizce: A1 present simple/continuous, can, there is; A2 past simple, going to/will, comparatives;
B1 present perfect vs past, conditionals 1–2, passive; B2 conditionals 3/mixed, wish, relative
clauses, modals of deduction; C1 inversion, cleft, nominalization, hedging, register.

## Uzunluk ve biçim

| Ne | Kural |
|---|---|
| Okuma metni | A1 60–120 · A2 100–180 · B1 150–260 · B2 200–350 · C1 250–450 kelime; hedef aralığın ortası |
| Dinleme | `segments[]`, bölüm ≤ 40 kelime; diyalogda `speaker`. Rakam yerine yazıyla sayı, kısaltma yok (TTS) |
| Soru sayısı | okuma/dinleme 5–6, dil bilgisi 8–10 |
| Soru metni | ≤ 30 kelime |
| `explain` | Türkçe tek cümle, hedef ≤ 200 karakter (260'ın üstü uyarı) |
| Yazılı soru | okuma/dinlemede en az 2 soru çoktan seçmeli değil |
| Doğru/yanlış | kütüphane grubunda "True/Richtig" oranı %35–65 (dışı hata) |
| `genre` | kapalı liste (`check-content.ts` `GENRES`): `article`, `email`, `dialogue`, `monologue`, `pronounce`, `grammar`… |
| `title` | hedef dilde, kısa |
| `intro` | Türkçe tek cümle: durum + ne yapılacak |
| `minutes` | okuma A1 3 … C1 8; yazma 6–10; konuşma 4–6; dil bilgisi 5–7 |

Soru türleri (`kind`): `mcq` (3 şık, benzer uzunluk), `truefalse` (`["Richtig","Falsch"]` /
`["True","False"]`), `gapfill` (soruda `___`, `accept[]` ilki kanonik), `short_answer` (`accept[]`
≤ 5 kelime), `dictation` (yalnız dinleme; cümle bir bölümde aynen geçer), `order` (`items[]`
3–6). Yazılı türlerde `options: []`, `answer: 0`. Yükleyici şıkları karıştırır.

## Beceri başına

**Okuma** (`-lib-r`). Gerçek hayattan bir metin türü. Sorular: ana fikir → ayrıntı →
çıkarım/tutum (B1+) → 2 yazılı soru.

**Dinleme** (`-lib-l`). Diyalog ya da tek konuşmacı (anons, sesli mesaj, podcast). `dictation`
kısa tam cümle ister (≤ 8 kelime).

**Yazma** (`-lib-w`). `tasks[]` 3 görev: 2 × `build` (Türkçe cümle → kanonik hedef cümle,
`alternatives`, Türkçe `hint`) + 1 × `free` (Türkçe `prompt`, isteğe bağlı hedef dilde
`stimulus`, `checklist` 3–4, `minWords` A1 25 · A2 40 · B1 60 · B2 90 · C1 120, `phrases` 3–5,
`sample` minWords'ü geçer).

**Konuşma** (`-lib-s`).
- A1, A2: söyleyiş drilli. `tasks[]` 6–8 cümle, `de` ≤ 12 kelime, Türkçe telaffuz `hint`,
  `confusions[]` (`heard`, `fix`, `expected`). Tek ses/kalıp odağı. `genre: "pronounce"`, `minutes: 4`.
- B1, B2, C1: monolog. `monologue: { promptTr, bulletsTr (3–5), targets (3–5), minSeconds,
  maxSeconds, sampleDe (≥ 60 kelime), rubricHint? }`. Süre B1 40–75, B2 50–90, C1 60–110 sn.
  `genre: "monologue"`, `gloss: []`, `minutes: 5`. B1 görüş + gerekçe, B2 karşılaştırma, C1 savunma.

**Dil bilgisi** (`-lib-g`). `focus` Türkçe tek satır (Almanca kursta kuralın adı da: "Akkusativ:
den / einen"). `explanation[]` 2–4 blok, Türkçeyle karşıtlık kurarak, sen-diliyle. `questions[]`
8–10 (`mcq`, `gapfill`, `order`, `truefalse`); çeldiriciler kuralın tipik hatası. `gloss` 3–5.
`genre: "grammar"`, `minutes: 6`.

## Doğrulama

```
npx tsc --noEmit -p tsconfig.json
npm run -s test:content -- skills --verbose       # kendi -lib- kimliklerin görünmemeli
npm run -s check:libvocab -- <kurs> <seviye>      # havuz dışı oran
npm run -s report:library -- <kurs>               # "Kütüphane içi kopya" satırında kimliğin olmamalı
```

Bitince döndür: dosya yolu, beş egzersizin kimlik + başlığı, doğrulayıcı sonucu (hata/uyarı,
havuz dışı oran) ve en çok üç tereddüt.
