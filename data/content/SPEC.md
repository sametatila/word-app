# İçerik şartnamesi

Beceri egzersizleri ve kelime havuzu için tek şartname. Kodu
`scripts/check-content.ts` (`npm run test:content`); belge ile kapı çelişirse
kapı geçerlidir, belge düzeltilir. Konuşmalar: `data/conversations-plan/SPEC.md`.

| Tür | Tip | Yer | Kimlik |
|---|---|---|---|
| Ünite egzersizi (Patika) | `SkillExercise` (`src/lib/skills/types.ts`) | `src/lib/skills/content/{a1..c1}-uNN.ts`, `en-<seviye>-uNN.ts` | `b1-u3-r1`, `en-a1-u3-l2` |
| Kütüphane egzersizi | `SkillExercise`, `unit` yok | `src/lib/skills/content/library/<kurs>-<seviye>[-pN].ts` | `de-a2-lib-g1` |
| Kelime havuzu | `words` tablosu | `data/app/words.json`, `words-en.json` (bkz. `data/README.md`) | sayısal |

**Kimlikler asla değiştirilmez, yeniden kullanılmaz, yeniden numaralanmaz:**
`user_skills` birincil anahtarı `(user_id, exercise_id)`, `user_conversations`
`(user_id, conversation_id)`. Kimlik değişirse canlı ilerleme kopar.

## Dil kuralları

- **Açıklama Türkçe, içerik hedef dilde.** `intro`, `explain`, `why`, `hint`
  Türkçe; öğrencinin okuyup söylediği her şey hedef dilde. İngilizce kursta `de`
  alanları hedef dil (İngilizce) metnidir.
- **Tek doğal karşılık.** `tr`/`en` alanında virgülle ikinci anlam yok; kalıplarda
  `…` ve `/` serbest. Parantezli açıklama `tr`'ye girmez (uyarı), `note`'a gider.
- **Sözlükçe metnin anlamını verir.** Anlam havuzdakiyle aynıysa havuzun sözcüğü
  birebir; metin gerçekten başka anlam kullanıyorsa bağlamsal karşılık.
  `en`: fiil `to` ile, isim tekil, artikelsiz, küçük harf.
- **Yazım.** Hedef dil metninde ı İ ğ Ğ ş Ş yok (büyük harfli özel adlar hariç;
  hata). İngilizce Amerikan yazımı ve Amerikan sözcük seçimiyle.
- **Uzunluk (uyarı).** Okuma metni A1 60–120, A2 100–180, B1 150–260, B2 200–350,
  C1 250–450 kelime (±%40 dışı uyarı). Dinleme bölümü ≤ 40, soru ≤ 30 kelime.
  `explain` tek cümle; 260 karakteri aşan uyarı.
- **Seviye.** A1 Präsens/sık fiillerde Perfekt/ana cümle; A2 Perfekt, modal,
  weil/dass, Dativ edatları; B1 yan cümleler, nezaket Konjunktiv II, Passiv
  Präsens; B2 Passiv çeşitleri, Konjunktiv, Partizip; C1 serbest.
- **Yasak.** İngilizce açıklama, suçlayan dil, emoji.

## SkillExercise

- `id` bütün kurslarda benzersiz; `level` A1–C1; `genre` kapalı listeden
  (`GENRES`, çeviri anahtarı `genre.*`); `minutes` 1–20; `cando` yalnız tanımlı kimlikler.
- Aynı seviyede iki ayrı ünitede aynı başlık hata (aynı ünite içinde serbest).
- `gloss`: her `de` metinde geçer (`data/meanings/contains.mjs`; okuma/dinlemede
  soru ve şıklar da sayılır), aynı madde iki kez yok, `tr` dolu.
- **Okuma/dinleme:** ≥ 3 soru, her soruda `explain`. `mcq`/`truefalse` 2–4 şık;
  `gapfill` (soruda `___`), `short_answer` (gösterilen cevap ≤ 5 kelime),
  `dictation` (cümle bölümlerde geçer) → `accept[]`, ilki kanonik; `order` 3–6
  madde ve kökteki sayı madde sayısıyla tutar. **En az 2 çoktan seçmeli olmayan
  soru** (uyarı) **ve en az 1 şıklı soru:** seviye sınavı (`exam.ts` `pickTexts`)
  yalnız ≥ 2 şıklı soruları alır; şıklı sorusu olmayan metin sınav havuzuna girmez
  (`npm run test:exams`).
- **Doğru/yanlış dengesi:** `True/False` ya da `Richtig/Falsch` şıklı sorularda
  "doğru" payı kurs × seviye başına (ünite ve kütüphane ayrı, ≥ 20 soruda)
  %35–65; dışı hata.
- `monologue` türü tek konuşmacı (hata).
- **Yazma:** `free` checklist ≥ 2, `minWords` 15–200, phrases ≥ 2, `sample` ≥
  minWords; `reply` + `stimulus`; `form` 3–8 alan; `rewrite` `source` ≠ `answer`
  ve `why` zorunlu; `build` `hint` zorunlu (yanlış denemeden sonra gösterilir);
  `sentence` 2–3 kelime; `summary` yalnız B1+. Her yazma setinde Türkçe
  konuşanın tipik aktarım hatasını hedefleyen bir `rewrite` önerilir.
- **Konuşma:** drill ≥ 4 görev, cümle ≤ 12 kelime, `confusions[].heard` tanıyıcı
  çıktısıdır (hedef dil alfabesinde, hedef cümlenin kendisi değil); diyalog
  `next`'leri kopuk değil, `fallback.example` dolu, `theme.role/goal` dolu;
  monolog `bulletsTr` 3–5, 20 ≤ minSeconds < maxSeconds ≤ 120, `sampleDe` ≥ 30 kelime.
- **Dil bilgisi** (yalnız kütüphane): `focus`, 1–5 anlatım bloğu, ≥ 3 örnek,
  6–12 soru, `unit` yok.
- **Kütüphane kimliği** `<kurs>-<seviye>-lib-<r|l|w|s|g><n>`: kurs, seviye ve beceri
  harfi egzersizle uyuşur; `unit` alanı olmaz (Patika'ya sızar).

## Ünite egzersizleri

- Ünite başına altı egzersiz: 2 okuma + 2 dinleme + 2 yazma; dosya
  `<seviye>-uNN.ts` (İngilizce `en-<seviye>-uNN.ts`), kimlik
  `<seviye>-u<n>-<r|l|w><1|2>` (İngilizce `en-` önekli).
- **Liste sırası önemli.** `buildTrack` (`src/lib/immersion/build.ts`) yuvaları
  `unit` alanına değil liste sırasına göre imleçle doldurur (ünite = 4 konuşma).
  Ünite dosyaları seviye listesinin (`b1.ts`, `en-a1.ts` …) **başında**, ünite
  sırasıyla durur. Ünite dosyası olmayan egzersiz arkaya konur; öne konursa bir
  ünitenin yuvasını kapar.
- Metin o üniteye kadar öğretilen kelime ve kalıpların dışına çıkmaz; çıkan sözcük
  sözlükçede verilir. Ölçü: `npm run check:unitvocab` (Almanca),
  `npm run check:en-unitvocab -- <seviye>` (İngilizce).
- Sözlükçe metinden gelir; konuşmanın kelimesi metinde yoksa sözlükçeye girmez.
- Anadil ekseni: Almanca kurs egzersizleri `data/skills/prose` ve `task`
  (→ İngilizce), İngilizce kurs egzersizleri `data/skills/prose-de` ve `task-de`
  (→ Almanca). Kapılar `check:skills-prose(-de)`, `check:skills-task(-de)`.

## Havuz ve seviye kuralları

- **Konuşma sözlükçesi seviye başına 8 kelime** (kapı), havuzun o seviyedeki
  katmanından. Alt seviye payı ~%10 (konuşma başına ~1 pekiştirme); kelime
  konuşmanın kendi konusuysa fazlası kabul.
- **`rank` uydurulmaz:** `data/a2-expansion/de_50k.txt` satır numarası (satır =
  sıra). Sıklık tek başına karar vermez (kısaltma ve çoğulda çarpılır).
- Yeni havuz kimliği `words.json`'daki en büyük kimlikten devam eder (İngilizce
  havuz 200000+, gsw-zh 100000+ aralığında).
- **Havuz dışı kelime vetosu** (konuşma havuzda olmayan kelime öğretiyorsa):

| | Durum | Karar |
|---|---|---|
| A | Havuzda aynı anlamda kayıt var, konuşma varyant yazmış | Konuşmayı havuzun yazımına çevir |
| B | Türev: çoğul, Partizip I/II, derece, üretken sonek (-ung, -heit, -keit, -bar, -sam, -schaft, -lich, -er) | Madde başı değil (`formen`e ait); konuşma başka kelime alır |
| C | Gerçek madde başı, o seviyede | Havuza ekle (`rank` de_50k'dan) |
| D | Şeffaf bileşik, kökü üst seviyede, havuzda aynı kavram var, çok dar | Havuza ekleme, konuşmadan çıkar |

## Doğrulayıcı

Hata çıkış kodu 1 verir. Uyarılar etiket başına sayılır;
`data/content/baseline.json` tavanı aşan ya da yeni etiket açan uyarı da düşürür.

```
npm run test:content                     # hepsi
npm run test:content -- skills           # tek tür: skills | conversations | words
npm run test:content -- --verbose        # her uyarıyı bas
npm run test:content -- --baseline       # tavanı yaz (bilinçli kabul)
```

Uygulamaya giden yol: `npm run db:seed:skills` (web `skill_exercises`), mobil
döküm (`npm run check:dumps` aynılığı denetler), `npm run content:publish`.
