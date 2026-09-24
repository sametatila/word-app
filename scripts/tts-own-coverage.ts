/**
 * KENDİ SESLERİMİZİN KAPSAMI — günlük tur, pratik ve yürüyüş modunun sese gönderebildiği HER metin.
 *
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/tts-own-coverage.ts \
 *     --words <kelime-dökümü.json> --map <tts-map.json> [--produced <üretilmiş-anahtarlar.json>] [--jobs <eksik.jsonl>]
 *
 * Kelimeler sunucuda yalnız Defne ve Aras'ın önceden üretilmiş dosyalarından çalıyor; tabloda olmayan metin için
 * Edge'e DÜŞÜLMÜYOR (bkz. `lib/tts/own`). Yani buradaki her eksik, uygulamada susan bir hoparlör demek. Betik
 * metinleri uygulamanın KENDİ işlevleriyle kuruyor (`withArtikel`, `firstExample`, `buildCloze`, `buildOrder`,
 * `pluralChoices`, `glossFor`) ve istemcinin yaptığı gibi `splitForSpeech` ile bölüp temizliyor: anahtar,
 * istemcinin adrese koyduğu dizgenin ta kendisi.
 *
 * Kaynaklar (web + mobil, hepsi aynı metinleri istiyor):
 *   word          `withArtikel(w)` — bütün oyunlar, geri bildirim şeridi, eşleştirme, yürüyüş hedefi, ön indirme
 *   plural        `die <çoğul>` — çoğul oyunu (cevap `pluralChoices`tan, `formen` ham değil)
 *   example       `firstExample(beispiel)` — tanıtım kartı örneği, çeviri oyunu
 *   cloze         boşluğa cevabı koyulmuş TAM cümle — boşluk doldurma geri bildirimi (web `filled`, mobil `fillBlank`)
 *   order         dizilmiş tam cümle — cümle dizme geri bildirimi
 *   token         cümle dizmede yerleştirilen her sözcük kutusu (`tileSpeech`: kenar noktalaması atılmış)
 *   gloss_<dil>   anadil karşılığı — yürüyüş modu (anadil sesi, seçilen karakter)
 *   walk_skip     yürüyüş modunun "geç" sözcüğü (ipucunda hedef dilde okunuyor)
 *   first_word    girişten önceki ısınmanın beş kelimesi (`lib/first-words`, elle yazılmış liste)
 *   voice_sample  ayarlardaki ses önizlemesinin cümlesi (`voice-picker` SAMPLE; mobil kopyası parite kapısında)
 *   walk_*        yürüyüş modunun anlatım cümleleri (`tts-walk-jobs.ts`; tur özetleri 0–20 bütün birleşimler).
 *                 Anlatım `k=n` ile gidiyor: eksikse Edge karşılığı çalar, susmaz — ama karakter tutarlılığı için sayılıyor.
 *
 * Boşluklu cümle BİLEREK yok: mobildeki hoparlörü boşluğu atlayıp bozuk bir cümle okuyordu ("Sind der neue
 * Lehrer?") ve webde hiç yoktu; 2026-09-23'te kaldırıldı. Tam cümle cevaptan sonra `cloze` olarak okunuyor.
 *
 * `--produced` (tts-test manifestlerinden `ses|dil|metin` → ok|warn) verilirse eksikler ikiye ayrılıyor: üretilmiş
 * ama tabloya girmemiş (uyarı kararı bekleyen) ve HİÇ üretilmemiş. `--jobs` yalnız ikincisini tts-test
 * `kelimeler.py` iş biçiminde yazar ({id, field, lang, niveau, rank, text, clean}).
 *
 * Hesabın kendisi `tts-own-needs.ts`te; sunucudaki bekçi (`tts-own-watch.ts`) de onu kullanıyor.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { coverage, jobLines, ownNeeds, type WordRow } from "./tts-own-needs";

const arg = (k: string) => {
  const i = process.argv.indexOf(k);
  return i > 0 ? process.argv[i + 1] : undefined;
};
const wordsPath = arg("--words");
const mapPath = arg("--map");
if (!wordsPath || !mapPath) {
  console.error("kullanım: --words <döküm.json> --map <tts-map.json> [--produced <json>] [--jobs <çıktı.jsonl>]");
  process.exit(2);
}

const rows: WordRow[] = JSON.parse(readFileSync(wordsPath, "utf8"));
const map: Record<string, string> = JSON.parse(readFileSync(mapPath, "utf8"));
const produced: Record<string, "ok" | "warn"> = arg("--produced") ? JSON.parse(readFileSync(arg("--produced")!, "utf8")) : {};

const { byField, jobs } = coverage(ownNeeds(rows), map, produced);

let bad = 0;
console.log("kaynak          toplam   tabloda  bekleyen(uyarı)  üretilmemiş");
for (const [field, f] of Object.entries(byField)) {
  bad += f.withheld + f.missing;
  console.log(`${field.padEnd(15)} ${String(f.total).padStart(6)}  ${String(f.inMap).padStart(8)}  ${String(f.withheld).padStart(15)}  ${String(f.missing).padStart(11)}`);
}

const out = arg("--jobs");
if (out) {
  const lines = jobLines(jobs);
  writeFileSync(out, lines.join("\n") + (lines.length ? "\n" : ""));
  console.log(`\n${lines.length} iş yazıldı → ${out}`);
}
console.log(bad ? `\nEKSİK: ${bad} anahtar sesiz kalır` : "\nKAPSAM TAM: her metin tabloda");
process.exit(bad ? 1 : 0);
