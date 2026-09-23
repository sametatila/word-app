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
 *
 * Boşluklu cümle BİLEREK yok: mobildeki hoparlörü boşluğu atlayıp bozuk bir cümle okuyordu ("Sind der neue
 * Lehrer?") ve webde hiç yoktu; 2026-09-23'te kaldırıldı. Tam cümle cevaptan sonra `cloze` olarak okunuyor.
 *
 * `--produced` (tts-test manifestlerinden `ses|dil|metin` → ok|warn) verilirse eksikler ikiye ayrılıyor: üretilmiş
 * ama tabloya girmemiş (uyarı kararı bekleyen) ve HİÇ üretilmemiş. `--jobs` yalnız ikincisini tts-test
 * `kelimeler.py` iş biçiminde yazar ({id, field, lang, niveau, rank, text, clean}).
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { withArtikel, glossFor } from "../src/lib/option-label";
import { firstExample } from "../src/lib/example";
import { buildCloze, buildOrder } from "../src/lib/session";
import { pluralChoices } from "../src/lib/german";
import { splitForSpeech, tileSpeech } from "../src/lib/tts/text";
import { courseOrDefault, NATIVE_LANGS, PAIR_READY } from "../src/lib/courses";
import { OWN_CHARACTERS } from "../src/lib/tts/voices";
import { skipWord } from "../src/lib/voice-intent";
import { firstWordsFor } from "../src/lib/first-words";

/** Kursu hangi anadiller öğreniyor — yürüyüş modunun anlam sesi bu dillerde. */
const nativesFor = (course: string) => NATIVE_LANGS.filter((l) => PAIR_READY[l]?.includes(course as never));

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

type Row = {
  id: number; de: string; artikel: string | null; tr: string; en: string | null; formen: string | null;
  typ: string; niveau: string; beispiel: string | null; de_gloss: string | null; rank: number | null; course: string;
};
const rows: Row[] = JSON.parse(readFileSync(wordsPath, "utf8"));
const map: Record<string, string> = JSON.parse(readFileSync(mapPath, "utf8"));
const produced: Record<string, "ok" | "warn"> = arg("--produced") ? JSON.parse(readFileSync(arg("--produced")!, "utf8")) : {};

/** Kursun sese gönderdiği bütün (dil, metin, kaynak) üçlüleri — kelime başına. */
type Need = { lang: string; text: string; field: string; w: Row };
const needs: Need[] = [];
const push = (w: Row, field: string, lang: string, text: string | null | undefined) => {
  if (!text?.trim()) return;
  // İstemci böyle bölüyor ve temizliyor (speak-button `speakGerman`, mobil `speakTarget`).
  for (const part of splitForSpeech(text)) needs.push({ lang, text: part, field, w });
};

for (const course of ["de", "en"] as const) {
  const pool = rows.filter((r) => r.course === course);
  const target = courseOrDefault(course).targetLang;
  // Oturum `words` satırını `RoundWord`e çeviriyor; buradaki işlevler yalnız bu alanları okuyor.
  const asRound = (r: Row) => ({ ...r, deGloss: r.de_gloss, beispielTr: null, beispielEn: null }) as never;
  for (const w of pool) {
    push(w, "word", target, withArtikel(w));
    if (w.artikel) {
      const pl = pluralChoices(w.de, w.formen, 3);
      if (pl) push(w, "plural", target, `die ${pl.answer}`);
    }
    push(w, "example", target, firstExample(w.beispiel)?.trim());

    const cloze = buildCloze(asRound(w), pool as never);
    if (cloze) {
      push(w, "cloze", target, cloze.sentence.replace(/_{2,}/, cloze.answer).replace(/\s+/g, " ").trim());
    }
    const order = buildOrder(asRound(w));
    if (order) {
      push(w, "order", target, `${order.answer.join(" ")}${order.tail}`);
      for (const t of order.answer) push(w, "token", target, tileSpeech(t));
    }
    for (const native of nativesFor(course)) {
      push(w, `gloss_${native}`, native, glossFor({ tr: w.tr, en: w.en, deGloss: w.de_gloss }, native)?.text);
    }
  }
}

/* Kelime tablosunun dışındaki iki küçük kaynak — sahte bir satırla aynı yoldan geçiyorlar. */
const extra = (course: string, field: string, lang: string, text: string) =>
  push({ id: 0, de: text, artikel: null, tr: "", en: null, formen: null, typ: "", niveau: "A1", beispiel: null, de_gloss: null, rank: null, course }, field, lang, text);
for (const course of ["de", "en"] as const) {
  const target = courseOrDefault(course).targetLang;
  extra(course, "walk_skip", target, skipWord(course));
  for (const native of NATIVE_LANGS) {
    for (const level of ["A1", "A2", "B1", "B2", "C1"]) {
      for (const fw of firstWordsFor(native, course, level)) extra(course, "first_word", target, withArtikel(fw));
    }
  }
}

// Önizleme cümlesi bileşenden okunuyor (bileşeni içe aktarmak istemci kodunu da çekerdi).
const picker = readFileSync(path.join(__dirname, "../src/components/voice-picker.tsx"), "utf8");
for (const course of ["de", "en"] as const) {
  const m = picker.match(new RegExp(`^\\s+${course}: "(.+)",$`, "m"));
  if (!m) throw new Error(`voice-picker SAMPLE.${course} okunamadı`);
  extra(course, "voice_sample", courseOrDefault(course).targetLang, m[1]);
}

/* Aynı anahtar birçok kelimeden gelebilir ("die Hunde", "ich"): iş listesinde bir kez. */
const byField: Record<string, { total: number; inMap: number; withheld: number; missing: number }> = {};
const jobs = new Map<string, Need>();
const seen = new Set<string>();
for (const n of needs) {
  for (const voice of OWN_CHARACTERS) {
    const key = `${voice}|${n.lang}|${n.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const f = (byField[n.field] ??= { total: 0, inMap: 0, withheld: 0, missing: 0 });
    f.total++;
    if (map[key]) f.inMap++;
    else if (produced[key]) f.withheld++;
    else {
      f.missing++;
      if (!jobs.has(`${n.lang}|${n.text}`)) jobs.set(`${n.lang}|${n.text}`, n);
    }
  }
}

let bad = 0;
console.log("kaynak          toplam   tabloda  bekleyen(uyarı)  üretilmemiş");
for (const [field, f] of Object.entries(byField)) {
  bad += f.withheld + f.missing;
  console.log(`${field.padEnd(15)} ${String(f.total).padStart(6)}  ${String(f.inMap).padStart(8)}  ${String(f.withheld).padStart(15)}  ${String(f.missing).padStart(11)}`);
}

const out = arg("--jobs");
if (out) {
  const lv = (x: string) => ["A1", "A2", "B1", "B2", "C1"].indexOf(x);
  const lines = [...jobs.values()]
    .sort((a, b) => lv(a.w.niveau) - lv(b.w.niveau) || (a.w.rank ?? 1e9) - (b.w.rank ?? 1e9) || a.w.id - b.w.id)
    .map((n, i) =>
      // `id` iş listesinde benzersiz olmalı (dosya adı `<id>_<field>`): aynı kelimenin birden çok sözcük
      // kutusu var, o yüzden sıra numarası ekleniyor.
      JSON.stringify({ id: `${n.w.course}${n.w.id}.${i}`, field: n.field, lang: n.lang, niveau: n.w.niveau, rank: n.w.rank, text: n.text, clean: n.text }),
    );
  writeFileSync(out, lines.join("\n") + (lines.length ? "\n" : ""));
  console.log(`\n${lines.length} iş yazıldı → ${out}`);
}
console.log(bad ? `\nEKSİK: ${bad} anahtar sesiz kalır` : "\nKAPSAM TAM: her metin tabloda");
process.exit(bad ? 1 : 0);
