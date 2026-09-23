/**
 * Seslendirme ENVANTERİ — `npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/tts-inventory.ts`
 * Uygulamada Edge/Azure'a giden her metni kaynağına göre sayar (rol yapma HARİÇ: o Edge'de kalıyor).
 * Çıktı: reports/tts-inventory.json + özet. Kendi karakter seslerine geçişin boyutunu ölçmek için.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { MOCK_PAPERS } from "../src/lib/mock-exams/source";
import { QUIZ_WEEKS } from "../src/lib/weekly-quiz";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { MODULE_EXAMS } from "../src/lib/lessons/module-exam";
import { LESSONS } from "../src/lib/lessons/source";
import { cleanForSpeech, splitForSpeech } from "../src/lib/tts/text";

type Row = { source: string; lang: string; role: "target" | "narration"; text: string };
const rows: Row[] = [];
const add = (source: string, lang: string, role: Row["role"], text: string) => {
  const c = cleanForSpeech(text ?? "");
  if (!c) return;
  for (const part of splitForSpeech(text)) rows.push({ source, lang, role, text: cleanForSpeech(part) });
};

/* 1. kelime havuzları */
function loadWords(p: string) {
  const t = readFileSync(p, "utf8").trim();
  try { return JSON.parse(t) as Record<string, string>[]; } catch {
    return t.split("\n").filter((l) => l.trim().startsWith("{")).map((l) => JSON.parse(l.replace(/,\s*$/, "")));
  }
}
for (const [course, file] of [["de", "data/app/words.json"], ["en", "data/app/words-en.json"]] as const) {
  for (const w of loadWords(file)) {
    add(`words.${course}.word`, course, "target", `${w.artikel ?? ""} ${w.de}`.trim());
    if (w.beispiel) add(`words.${course}.example`, course, "target", w.beispiel);
    if (course === "de" && w.typ === "Nomen" && w.formen) add(`words.${course}.plural`, course, "target", `die ${w.formen}`);
    if (w.tr) add(`words.${course}.gloss_tr`, "tr", "narration", w.tr);   // yürüyüş modu: anlam anadilde okunuyor
  }
}

/* 2. dersler — anlatım (lecture) parçaları; roleplay hariç */
/* Dinleme bloğu parçası. `lang` YOK: dinleme modelleri (`ListeningSegment`,
   deneme kâğıdı ve haftalık sınav uyaranı) konuşmacı başına ses için
   `{ speaker?, text }` taşıyor (2026-09-18) ve burada zaten yalnız metin
   okunuyor. Tipte `lang` zorunlu kalınca üç `forEach` derlemede düşüyordu. */
type Seg = { text: string; speaker?: string };
function walk(v: unknown, course: string, id: string, path: string) {
  if (Array.isArray(v)) { v.forEach((x) => walk(x, course, id, path)); return; }
  if (!v || typeof v !== "object") return;
  const o = v as Record<string, unknown>;
  if (typeof o.lang === "string" && typeof o.text === "string") {
    add(`lessons.${course}.${o.lang === "tr" ? "narration" : "target"}`, o.lang, o.lang === "tr" ? "narration" : "target", o.text);
    return;
  }
  for (const [k, x] of Object.entries(o)) {
    if (k === "roleplay") continue;
    if ((k === "target" || k === "statement") && typeof x === "string") add(`lessons.${course}.target`, course, "target", x);
    else if (k === "accept" && Array.isArray(x)) x.forEach((s) => typeof s === "string" && add(`lessons.${course}.target`, course, "target", s));
    else walk(x, course, id, `${path}.${k}`);
  }
}
for (const l of LESSONS) walk((l as unknown as { lecture: unknown }).lecture, l.course, l.id, "lecture");

/* 3. dinleme blokları + okuma metinleri (check-tts ile aynı toplama) */
for (const paper of MOCK_PAPERS) for (const part of paper.parts) for (const task of part.tasks) for (const st of task.texts ?? []) {
  if (st.kind === "audio") st.segments.forEach((s: Seg) => add(`listening.${paper.course}.mock`, paper.course, "target", s.text));
  else if (st.kind === "text") add(`reading.${paper.course}.mock`, paper.course, "target", st.body);
}
for (const week of QUIZ_WEEKS) for (const it of week.items) {
  const st = (it as { stimulus?: { kind: string; segments?: Seg[]; body?: string } }).stimulus;
  if (!st) continue;
  if (st.kind === "audio" && st.segments) st.segments.forEach((s) => add(`listening.${week.course}.quiz`, week.course, "target", s.text));
  if (st.kind === "text" && st.body) add(`reading.${week.course}.quiz`, week.course, "target", st.body);
}
for (const ex of BUNDLED_EXERCISES) {
  const course = ex.id.startsWith("en-") ? "en" : "de";
  if (ex.skill === "listening") ex.segments.forEach((s: Seg) => add(`listening.${course}.skills`, course, "target", s.text));
  if (ex.skill === "reading") add(`reading.${course}.skills`, course, "target", ex.text);
}
for (const plan of MODULE_EXAMS) plan.listening?.turns?.forEach((t: { de: string }) => add("listening.de.module_exam", "de", "target", t.de));

/* 4. anlatım arayüz cümleleri (yürüyüş modu, ders geri bildirimi) */
for (const lang of ["tr", "en", "de"]) {
  const src = readFileSync(`src/i18n/base/${lang}.ts`, "utf8");
  for (const m of src.matchAll(/"((?:walk|walkmode|lessonp|common\.answer_is|aiconsent\.voice_without)[a-z_.]*)"\s*:\s*"((?:[^"\\]|\\.)*)"/g)) add(`ui.${lang}.narration`, lang, "narration", m[2]);
}

/* özet */
const uniq = new Map<string, Row>();
for (const r of rows) uniq.set(`${r.lang}|${r.text}`, r);
const by: Record<string, { items: number; unique: number; chars: number }> = {};
const seen = new Set<string>();
for (const r of rows) {
  const b = (by[r.source] ??= { items: 0, unique: 0, chars: 0 });
  b.items++;
  const k = `${r.lang}|${r.text}`;
  if (!seen.has(k)) { seen.add(k); b.unique++; b.chars += r.text.length; }
}
const total = { unique: uniq.size, chars: [...uniq.values()].reduce((a, r) => a + r.text.length, 0) };
const byLang: Record<string, { unique: number; chars: number }> = {};
for (const r of uniq.values()) { const b = (byLang[`${r.lang}/${r.role}`] ??= { unique: 0, chars: 0 }); b.unique++; b.chars += r.text.length; }
writeFileSync("reports/tts-inventory.json", JSON.stringify({ by, byLang, total, texts: [...uniq.values()] }, null, 1));
console.log("kaynak".padEnd(28), "madde".padStart(7), "benzersiz".padStart(10), "karakter".padStart(10));
for (const [k, v] of Object.entries(by)) console.log(k.padEnd(28), String(v.items).padStart(7), String(v.unique).padStart(10), String(v.chars).padStart(10));
console.log("\ndil/rol:", byLang);
console.log("TOPLAM benzersiz metin:", total.unique, "karakter:", total.chars);
