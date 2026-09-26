# Kelime verisi

Havuzun tek kaynağı `app/words.json`: canlı veritabanının tam görüntüsü. Değişiklik
doğrudan bu dosyada (ve anlam paketleri `meanings/out`'ta) yapılır; her deploy'un
sonunda `npm run db:seed` + `npm run db:seed:en` canlıya uygular.

| Dosya | İçerik |
|---|---|
| `app/words.json` | Almanca havuz, JSON dizisi — 8.704 madde (A1 906 · A2 1.447 · B1 1.836 · B2 2.061 · C1 2.454) |
| `app/words-en.json` | İngilizce kurs havuzu, satır başına bir JSON — 7.163 madde, kimlik 200000+ |
| `app/beispiel-tr.json` | Örnek cümle Türkçesi, kelime kimliğine bağlı (seed yedek olarak okur) |
| `a2-expansion/de_50k.txt` | Almanca sıklık listesi (OpenSubtitles türevi, 50.000 satır); `rank` buradan okunur |

**Alanlar:** `id, de, artikel, tr, en, formen, typ, niveau, rank, usage, beispiel, beispielTr, beispielEn`

- `de` madde başı (artikelsiz), `artikel` der/die/das (isim değilse boş).
- `tr` / `en` tek doğal karşılık; ikisi birlikte Türkçede çöken ayrımları ayırır.
- `formen` çoğul eki ya da çekim biçimleri; türevler madde başı olmaz, buraya yazılır.
- `typ` Nomen / Verb / Adjektiv / Sonstiges; `niveau` A1–C1.
- `rank` sıklık sırası (düşük = sık): `de_50k.txt` satır numarası, uydurulmaz.
- `usage` isteğe bağlı kullanım kodu (`src/lib/usage.ts` `USAGE_CODES`: akk, dat, ugs, brit …).
- `words-en.json` ek alanları: `course` (`en`), `srcId` (türetildiği Almanca madde),
  `deGloss` (Almanca anadilli için karşılık; boşsa `srcId`'den türetilir). Seed: `npm run db:seed:en`.

**Silme kilidi.** Seed kaynakta olmayan kelimeyi siler ve bu, kullanıcının o kelimedeki
ilerlemesini de siler. Silinecek kelime `SEED_MAX_DELETE` (20) eşiğini aşarsa seed hiçbir
şey yazmadan durur; bilinçli toplu silme `--allow-delete` ile elle yapılır.

**Yayımlanmış listelerden örnek cümle alınmaz.** `npm run check:published-examples` (CI'da)
bilinen liste cümlelerinin geri girmesini durdurur; depoda yalnız cümle özetleri var
(`data/published-examples.sha`).

Denetim: `node data/meanings/check.mjs all`, `npm run test:seed`. İçerik kuralları:
`data/content/SPEC.md`.
