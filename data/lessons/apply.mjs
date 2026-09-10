/**
 * Yazılan İngilizceyi çalışma anına bağlar: `node data/lessons/apply.mjs`
 *
 * Beş hat (`lecture`, `word`, `vocab`, `patterns`, `meta`) `out/` altında
 * elle yazılmış karşılıkları tutuyor ama HİÇBİRİ uygulamaya girmiyordu.
 * Bu betik onları tek bir üretilen sözlüğe topluyor; çözücü
 * (`src/lib/lessons/native.ts`) o sözlükten okuyor.
 *
 * ANAHTAR `lecture/make.mjs` İLE BİREBİR AYNI OLMAK ZORUNDA. Anlatım hattı
 * 8.788 dizenin 32'sini Almanca kelimeye göre BÖLÜYOR — "Türkçesi 'yüz'
 * demek" hem `hundert` hem `das Gesicht` için kullanılıyor ve İngilizcede
 * 'a hundred' ile 'face' aynı sözcük değil. Çözücü bu bölmeyi aynen
 * yapmazsa 66 satırın yarısı sessizce yanlış kelimeyi söyler:
 *
 *   düz anahtar       tr
 *   bölünmüş anahtar  tr + AYRAÇ + de
 *
 * `de`, adımda dizeden ÖNCE gelen Almanca parça — `make.mjs` de yalnız ona
 * bakıyor. AYRAÇ yazdırılamayan bir karakter: Türkçe metin boşluk da
 * noktalama da taşıyabildiği için ayracın metinde ASLA geçmeyeceğinden
 * emin olmak gerekiyor.
 *
 * Şablon ayrı: `word()` yardımcısı metni çalışma anında kuruyor, yani
 * ekrana çıkan dize `out/`ta yok. Çözücü onu çerçeve deseniyle tanıyıp
 * üç parçadan (kelime karşılığı + not + çerçeve) yeniden kuruyor.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const OUT = new URL("../../src/lib/lessons/generated/", import.meta.url).pathname;

/** Bileşik anahtarların ayracı — çözücüdeki `SEP` ile aynı olmak zorunda. */
const SEP = "\u0000";

const read = (line) => {
  const d = `${DIR}${line}/out/`;
  if (!existsSync(d)) return [];
  return readdirSync(d)
    .filter((x) => x.endsWith(".json"))
    .sort()
    .flatMap((f) => JSON.parse(readFileSync(d + f, "utf8")));
};

/** Anlatım: düz dizeler ve Almancaya göre bölünmüş olanlar ayrı iki sözlük. */
const lecture = {};
const lectureSplit = {};
for (const r of read("lecture")) {
  if (r.de) lectureSplit[r.tr + SEP + r.de] = r.en;
  else lecture[r.tr] = r.en;
}

/** Şablon: çerçeve, sıra sözcüğü ve not. */
const frames = {};
const ordinals = {};
const notes = {};
for (const r of read("word")) {
  if (r.kind === "frame") frames[r.tr] = r.en;
  else if (r.kind === "ordinal") ordinals[r.tr] = r.en;
  else notes[r.tr] = r.en;
}

/** Sözlükçe: `(ders, Almanca)` → İngilizce karşılık. Türetilenler + elle yazılanlar. */
const vocab = {};
const derived = `${DIR}vocab/derived.json`;
if (existsSync(derived))
  for (const r of JSON.parse(readFileSync(derived, "utf8"))) vocab[r.lesson + SEP + r.de] = r.en;
for (const r of read("vocab")) vocab[r.lesson + SEP + r.de] = r.en;

/** Kalıp notu ve ders başlığı/özeti — anahtarları kendi hatlarından geliyor. */
const patterns = {};
for (const r of read("patterns")) patterns[r.lesson + SEP + r.de] = r.en;
const meta = {};
for (const r of read("meta")) meta[r.lesson] = { title: r.titleEn, summary: r.summaryEn };

const data = { lecture, lectureSplit, frames, ordinals, notes, vocab, patterns, meta };

mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}native-en.json`, `${JSON.stringify(data)}\n`);

const n = (o) => Object.keys(o).length;
console.log(
  "native-en.json yazıldı\n" +
    `  anlatım ${n(lecture)} (+${n(lectureSplit)} bölünmüş) · çerçeve ${n(frames)} · sıra ${n(ordinals)} · not ${n(notes)}\n` +
    `  sözlükçe ${n(vocab)} · kalıp ${n(patterns)} · ders ${n(meta)}`,
);
