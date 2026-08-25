# İçerik şartnamesi — tek kaynak (WP-70)

Uygulamadaki bütün öğretici içerik kod içinde TypeScript olarak yaşar ve **tek bir doğrulayıcıdan** geçer: `npm run test:content` (`scripts/check-content.ts`). İçerik üreten ajan (insan ya da model) bu belgeye göre yazar, doğrulayıcı yeşil olmadan içerik depoya girmez. Yeni bir içerik türü eklemek üç adımdır: burada bölüm, `src/lib/**/types.ts`'te tip, doğrulayıcıda kural.

## İçerik türleri ve yerleri

| Tür | Tip | Dosya | Kimlik |
|---|---|---|---|
| Beceri egzersizi (okuma/dinleme/yazma/konuşma) | `SkillExercise` — `src/lib/skills/types.ts` | `src/lib/skills/content/{a1..c1,zh-*,speaking,dialogue}.ts` → `bundled.ts` | `"a1-r1"`, `"zh-a2-l3"` — kalıcı, değiştirilmez |
| Ders | `Lesson` — `src/lib/lessons/types.ts` | `src/lib/lessons/content/de-{a1..b1}-bNN.ts` → `index.ts` | `"de-a1-hallo"` |
| Çevrimdışı rol yapma senaryosu | `DialogueTurn[]` — `src/lib/dialogue.ts` | `src/lib/lessons/content/scripts-*.ts` (ders kimliğiyle) | dersin kimliği |
| Dilbilgisi sayfası | `CheatSheet` — `src/lib/cheatsheet/types.ts` | `src/lib/cheatsheet/de-{a1..c1}.ts` | `"a1-artikel"` |
| Kelime havuzu | `data/app/words.json` → `words` tablosu | `data/*` hattı (bkz. `data/README.md`) | sayısal |
| Dilbilgisi drill'i (WP-11) | `Drill` — `src/lib/cheatsheet/drills.ts` (henüz yok) | `src/lib/cheatsheet/drills-*.ts` | `"<sheetId>/<n>"` |

Çalışma zamanı: beceri egzersizleri `npm run db:seed:skills` ile `skill_exercises` tablosuna yüklenir (tablo boşsa gömülü kopya); dersler ve dilbilgisi doğrudan koddan okunur.

## Dil kuralları (her tür için)

- **Türkçe açıklama, Almanca içerik.** Öğrenciye söylenen her şey Türkçe (`tr`, `explain`, `cue`, `hint`, `why`, `summary`); öğrencinin okuyup söyleyeceği her şey Almanca. İngilizce yalnız `en` alanlarında, ayırt edici olarak.
- **Tek doğal karşılık.** `tr` ve `en` alanlarında virgülle ikinci anlam yok (`"kalkmak, hareket etmek"` yasak). Kalıplarda (`…`, `/`) çizgi ve üç nokta serbest. Parantezli açıklama `tr`'ye girmez; `note` alanına gider.
- **Havuzla tutarlılık.** Egzersiz sözlükçesi ve ders kelimeleri kelime havuzundaki karşılığı kullanır; metin gerçekten başka anlam kullanıyorsa bağlamsal karşılık yazılır ve bu bilinçli bir sapmadır (doğrulayıcıda uyarı). Havuzda olmayan kelime uyarıdır; A1/A2 içeriğinde havuz dışı kelime %10'u geçmemeli.
- **Yazım.** Almanca alanlarda Türkçe harf (ı İ ğ Ğ ş Ş) yok; Türkçe alanlarda ß/umlaut yalnız alıntı içinde. İsimler büyük harfle. `ss`/`ß` kurs kuralına göre: `de` kursunda ß, `gsw-zh` kursunda ss.
- **Uzunluk.** Okuma metni A1 60–120, A2 100–180, B1 150–260, B2 200–350, C1 250–450 kelime. Dinleme bölümü tek satırda ≤ 40 kelime. Soru ≤ 30 kelime. `explain`/`why` tek cümle, ≤ 200 karakter.
- **Seviye.** Yapılar seviyenin dilbilgisi tablolarını aşmaz: A1 Präsens/Perfekt(sık fiiller)/ana cümle; A2 Perfekt/Modal/weil-dass/Dativ edatları; B1 yan cümle çeşitleri/Konjunktiv II nezaket/Passiv Präsens; B2 Passiv çeşitleri/Konjunktiv/Partizip; C1 serbest.
- **Yasaklar.** İngilizce açıklama yok; "çeviri yerine örnek" — kural anlatırken Almanca örnek ver, İngilizceyle açıklama; öğrenciyi suçlayan dil yok; emoji yok.

## Zorunlu alanlar ve iş kuralları

### SkillExercise
- `id` benzersiz (bütün kurslar arasında), `level` ∈ A1–C1, `title` Almanca, `genre`, `intro` Türkçe, `minutes` 1–20.
- `gloss[]`: `de` metinde geçer (`contains`, `data/meanings/contains.mjs`), `tr` tek karşılık, `en` var (uyarı).
- `questions[]` (okuma/dinleme): ≥ 3 soru; `options` 2–4; `answer` indeks aralıkta; `explain` Türkçe, boş değil — geri bildirimin "neden"i budur (WP-13).
- `cando?: string[]` — CEFR yapabilirlik etiketleri (WP-43 listesi; şimdilik serbest kısa etiket, ör. `"a1.self.introduce"`).
- Yazma `free` görevi: `checklist` ≥ 2, `minWords` 15–200, `phrases` ≥ 2, `sample` ≥ minWords kelime.
- Konuşma drill'i: `tasks` ≥ 4, her `de` ≤ 12 kelime; `confusions[].heard` boş değil.
- Konuşma diyaloğu: `dialogue[].id` benzersiz, her `next` var olan bir tura gider, `fallback.example` boş değil, `targets` ≥ 2.

### Lesson
- `id` benzersiz, `level`, `course`, `icon` listeden, `title` Almanca, `titleTr`/`summary` Türkçe, `minutes` 3–20, `focusId` boş değil.
- `vocab` 4–10 (`de`, `tr`), `patterns` 2–5.
- `lecture` 8–20 adım; puanlanan adım (`produce`/`truefalse`) ≥ 3; `produce` adımında `hint` boş değil, `target` Almanca; `truefalse` adımında `why` boş değil; `repeat` payı ≤ %60 (WP-62 hedefi %40 — uyarı).
- `roleplay`: `scene` Türkçe, `partner`, `opening` Almanca, `openingTr`, `minTurns` 2–6; `script` varsa: ≥ `minTurns` tur, `script[0].ask === opening`, her `next` var, her turun `fallback.example`i var, `replies[].match` ≥ 2 kök.
- `cando?: string[]`.

### CheatSheet
- `id` benzersiz, `level`, `title` Türkçe, `de` Almanca, `summary`; `blocks` ≥ 1; tablo bloklarında her satır `columns.length` hücre.

### DialogueTurn (senaryo)
- `id` benzersiz tur içinde; `ask` Almanca + `askTr`; `cue` Türkçe; `replies` ≥ 1; her `match` en az bir kök; `fallback.say/sayTr/example`.

## Doğrulayıcı — `npm run test:content`

`scripts/check-content.ts` bütün içeriği koddan yükler (tsx, path alias'ları `scripts/tsconfig.e2e.json`) ve iki liste basar: **hata** (yapıyı bozan: eksik alan, aralık dışı indeks, kopuk `next`, yinelenen kimlik, Almanca metinde Türkçe harf — özel adlar hariç) → çıkış kodu 1; **uyarı** (kalite: havuz dışı kelime, çok anlamlı karşılık, uzun metin, `en` eksik) → etiket başına sayılır. `data/content/baseline.json` etiket başına tavan tutar: bir kategori tavanı aşarsa ya da yeni kategori açılırsa hata. Mevcut borç bilinir (2026-08-25: 2.227 uyarı, en büyüğü sözlükçede `en` eksik 1.254 ve metinde geçmeyen sözlükçe kelimesi 485 — WP-72 kapatır), yeni borç alınmaz; borç azaldıkça `--baseline` ile tavan indirilir.

```
npm run test:content            # hepsi
npm run test:content -- lessons # tek tür: skills | lessons | cheatsheet | scripts
npm run test:content -- --baseline   # etiket başına uyarı tavanını yaz (bilinçli kabul)
npm run test:content -- --verbose    # her uyarıyı tek tek bas
```

## Üretim akışı

1. **Paket:** `data/skills/make-packets.mjs` deseni — üretilecek öğeler JSON paketine çıkarılır (`data/content/in/<paket>.json`), istem şablonu bu SPEC'ten (ilgili bölüm + örnek 2 madde).
2. **Üretim:** model paketi doldurur (`data/content/out/<paket>.json`).
3. **Doğrulama:** `check-content` + paket denetimi (`data/skills/check.mjs` deseni).
4. **Gözden geçirme:** `data/content/review/<paket>.md` — her 5 maddede 1 örneklem, insan onayı; sapmalar listelenir.
5. **Uygulama:** `scripts/apply-*.ts` ile TS içerik dosyasına yazılır; `npm run test:content` yeşil; commit.

Kimlikler asla yeniden kullanılmaz ya da yeniden numaralanmaz: ilerleme kayıtları (`user_skills`, `user_lessons`, `cheat_progress`) kimliğe bağlıdır.
