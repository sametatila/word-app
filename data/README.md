# Kelime Verisi

Havuzun tek kaynağı `app/words.json`. Dosya artık ham bir dışa aktarım değil,
**canlı veritabanının tam görüntüsü**: `scripts/seed.ts` bu dosyadan çalıştığında
üretimde sıfır fark üretir. Seviye (`niveau`), Türkçe karşılık, tip ve örnek
cümleler tek tek gözden geçirilip düzeltilmiş durumda; kelime havuzu üzerinde
çalışırken bu dosya esas alınır.

## Dosyalar

| Dosya | Açıklama |
|---|---|
| `app/words.json` | Almanca havuz — canlı DB'nin görüntüsü, satır başına bir JSON nesnesi |
| `app/words-en.json` | İngilizce havuz (tr → en kursu) |
| `app/beispiel-tr.json` | Örnek cümlelerin Türkçe çevirileri, kelime id'sine bağlı |

## Alanlar

`id, de, artikel, tr, en, formen, typ, niveau, rank, beispiel, beispielTr, beispielEn`

- `de` — madde başı (artikelsiz), `artikel` — der/die/das (isim değilse boş)
- `tr` / `en` — tek doğal karşılık; ikisi birlikte Türkçede çöken ayrımları ayırır
  (er/sie/es üçü de "o", ama he/she/it)
- `formen` — çoğul eki (isim) ya da çekim formları (fiil)
- `typ` — Nomen / Verb / Adjektiv / Sonstiges
- `niveau` — CEFR seviyesi A1–C1; patika ve oyun zorluğu bunu kullanır
- `rank` — sıklık sırası; düşük sayı daha sık

## Üretim

Havuz artık toplu bir dönüştürme adımıyla üretilmiyor. Değişiklikler doğrudan
`app/words.json` (ve anlam paketleri `meanings/out`) üzerinde yapılır; canlıya her
deploy'un sonunda `db:seed` + `db:seed:en` ile kendiliğinden gider (2026-09-26'dan beri,
sunucudaki `deploy.sh`). Seed kaynakta olmayan kelimeyi siler ve bu, kullanıcının o
kelimedeki ilerlemesini de siler: silinecek kelime `SEED_MAX_DELETE` (20) eşiğini aşarsa
seed hiçbir şey yazmadan durur; bilinçli toplu silme `--allow-delete` ile elle yapılır.

**Yayımlanmış listelerden örnek cümle alınmaz.** Havuzun ilk hâli bir sınav kurumunun
herkese açık kelime listelerinden çıkarılmıştı; o listelerin örnek cümleleri 2026-09-26'da
özgün cümlelerle değişti (Almanca 1.413, İngilizce kursta 720). `npm run check:published-examples`
(CI'da) aynı cümlelerin geri girmesini durdurur; liste metni depoda yok, yalnız cümle
özetleri (`data/published-examples.sha`).

Doğrulama betikleri (`data/meanings/check.mjs`, `npm run test:seed`) fark bırakıp
bırakmadığını denetler.

## Doğrulama durumu

- 3.192/3.192 madde çevrildi, boş çeviri yok.
- Tüm çiftler ikinci bir turda kelime-çeviri-örnek uyumu için denetlendi; 6 düzeltme uygulandı.
- Almanca `ä/ß` kalıntısı, bozuk kodlama, çeviride kalmış artikel: 0.
- "CD, Film, Internet, Pizza" gibi 37 madde Türkçede de aynı olduğu için birebir aynıdır.
