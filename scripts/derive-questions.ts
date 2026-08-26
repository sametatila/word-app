/**
 * Okuma/dinleme egzersizlerine yazılı soru türetme (WP-72, WP-31 adım 4).
 * Çalıştır: npm run content:derive → src/lib/skills/content/derived-questions.ts
 *
 * Neden türetme: 238 egzersizin her birine elle iki soru yazmak haftalar
 * sürer; oysa metnin kendisinde iki güvenilir soru zaten var:
 *   1. gapfill — sözlükçedeki (gloss) bir anahtar kelimenin geçtiği cümle;
 *      kelime boşluk olur. Sözlükçe kelimesi metnin öğretmek istediği
 *      kelimedir, boşluk rastgele değil.
 *   2. short_answer — mevcut çoktan seçmeli sorulardan doğru şıkkı kısa
 *      (≤ 4 kelime, Richtig/Falsch olmayan) olan biri: aynı soru, şıksız.
 *      Tanımak yerine üretmek; açıklama aynı kaldığı için "neden" korunur.
 *   3. dictation (dinleme) — 4–9 kelimelik bir bölüm cümlesi.
 * Egzersizde zaten ≥ 2 yazılı soru varsa dokunulmaz. Züritüütsch (zh-*)
 * egzersizlerinde dikte yok: TTS standart Almanca okur, lehçe cümlesini
 * yazdırmak yanlış ölçer.
 *
 * Çıktı deterministik: aynı içerik → aynı dosya (git farkı yalnız içerik
 * değişince). Elle yazılmış sorular içerik dosyalarında kalır; bu dosya
 * yalnız ek. Elle yazılan bir egzersize sonradan yazılı soru eklenirse
 * türetme o egzersiz için kendiliğinden düşer.
 */
import { writeFileSync } from "node:fs";
import { a1 } from "../src/lib/skills/content/a1";
import { a2 } from "../src/lib/skills/content/a2";
import { b1 } from "../src/lib/skills/content/b1";
import { b2 } from "../src/lib/skills/content/b2";
import { c1 } from "../src/lib/skills/content/c1";
import { zhA1 } from "../src/lib/skills/content/zh-a1";
import { zhA2 } from "../src/lib/skills/content/zh-a2";
import { zhB1 } from "../src/lib/skills/content/zh-b1";
import { zhB2 } from "../src/lib/skills/content/zh-b2";
import { zhC1 } from "../src/lib/skills/content/zh-c1";
import type { SkillExercise, SkillQuestion } from "../src/lib/skills/types";

const WRITTEN = new Set(["gapfill", "short_answer", "dictation", "order", "produce"]);
const all: SkillExercise[] = [...a1, ...a2, ...b1, ...b2, ...c1, ...zhA1, ...zhA2, ...zhB1, ...zhB2, ...zhC1];

const wc = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
/**
 * Cümlelere böl: noktadan sonra boşluk + büyük harf gelmeli (kısaltma ve
 * "vom 12. Mai" gibi tarihler bölünmez); sayıyla biten ("des 19.") ya da
 * tırnak içeren parçalar boşluk sorusu için kullanılmaz.
 */
const sentences = (text: string) =>
  text
    .split(/\n+/)
    .flatMap((chunk) => chunk.split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ„"])/))
    .map((s) => s.trim())
    .filter((s) => /[.!?]$/.test(s) && !/\d\.$/.test(s) && !/[„“"]/.test(s));
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Sözlükçe girdisinden aranacak tek kelime: "sich treffen" → "treffen", "die Wohnung" → "Wohnung". */
function headword(de: string): string | null {
  const parts = de.replace(/[()/,…]/g, " ").split(/\s+/).filter(Boolean);
  const cand = parts.filter((p) => !/^(der|die|das|ein|eine|sich|zu|am|im|zum|zur)$/i.test(p));
  const w = cand.sort((a, b) => b.length - a.length)[0];
  return w && /^[\p{L}-]{4,}$/u.test(w) ? w : null;
}

/** En çok `max` boşluk sorusu — farklı sözlükçe kelimesi ve farklı cümle. */
function gapfills(ex: Extract<SkillExercise, { skill: "reading" | "listening" }>, max: number): SkillQuestion[] {
  const corpus = ex.skill === "reading" ? sentences(ex.text) : ex.segments.map((s) => s.text.trim());
  const used = new Set<string>();
  const out: SkillQuestion[] = [];
  for (const g of ex.gloss) {
    if (out.length >= max) break;
    const w = headword(g.de);
    if (!w) continue;
    const re = new RegExp(`(^|[^\\p{L}])(${escapeRe(w)})(?=[^\\p{L}]|$)`, "u");
    const sent = corpus.find((s) => !used.has(s) && re.test(s) && wc(s) >= 4 && wc(s) <= 22);
    if (!sent) continue;
    used.add(sent);
    const m = sent.match(re)!;
    const shown = sent.replace(re, `$1___`);
    out.push({
      kind: "gapfill",
      text: `${ex.skill === "reading" ? "Metinden" : "Dinlediğinden"} tamamla: „${shown}“`,
      options: [],
      answer: 0,
      accept: [m[2]],
      explain: `„${sent}“ — ${g.de}: ${g.tr}.`,
    });
  }
  return out;
}

function shortAnswer(ex: Extract<SkillExercise, { skill: "reading" | "listening" }>): SkillQuestion | null {
  for (const q of ex.questions) {
    if ((q.kind ?? "mcq") !== "mcq") continue;
    const opt = q.options[q.answer];
    if (!opt || /^(richtig|falsch|ja|nein)$/i.test(opt) || wc(opt) > 3 || opt.length > 30) continue;
    if (/\d{1,2}[:.]\d{2}/.test(opt) && ex.skill === "listening") continue; // saat dikte gibi olur, atla
    const bare = opt.replace(/[.!?]$/, "");
    const accept = [bare];
    const noArticle = bare.replace(/^(der|die|das|den|dem|ein|eine|einen|einem|um|am|im|bis|in|nach|zu|mit)\s+/i, "");
    if (noArticle !== bare && wc(noArticle) >= 1) accept.push(noArticle);
    return {
      kind: "short_answer",
      text: `${q.text.replace(/\s*\(.*?\)\s*$/, "")} (kısa cevap)`,
      options: [],
      answer: 0,
      accept,
      explain: q.explain,
    };
  }
  return null;
}

function dictation(ex: Extract<SkillExercise, { skill: "listening" }>): SkillQuestion | null {
  if (ex.id.startsWith("zh-")) return null;
  const seg = ex.segments.map((s) => s.text.trim()).find((t) => wc(t) >= 4 && wc(t) <= 9 && !/\d/.test(t));
  if (!seg) return null;
  const who = ex.segments.find((s) => s.text.trim() === seg)?.speaker;
  return {
    kind: "dictation",
    text: `Dikte: bir cümleyi dinle ve yaz${who ? ` (konuşan: ${who})` : ""}.`,
    options: [],
    answer: 0,
    accept: [seg],
    explain: `„${seg}“ — cümleyi kelime kelime karşılaştır; umlaut ve büyük harf tanıyıcıda değil, yazımda önemli.`,
  };
}

const out: Record<string, SkillQuestion[]> = {};
let touched = 0;
let added = 0;
for (const ex of all) {
  if (ex.skill !== "reading" && ex.skill !== "listening") continue;
  const have = ex.questions.filter((q) => WRITTEN.has(q.kind ?? "mcq")).length;
  if (have >= 2) continue;
  const extra: SkillQuestion[] = [];
  const s = shortAnswer(ex);
  // Önce bir boşluk + bir kısa cevap; kısa cevap yoksa ikinci boşluk; dinlemede dikte.
  extra.push(...gapfills(ex, s ? 1 : 2));
  if (s) extra.push(s);
  if (ex.skill === "listening" && have + extra.length < 2) {
    const d = dictation(ex);
    if (d) extra.push(d);
  }
  if (have + extra.length < 2) extra.push(...gapfills(ex, 2).filter((q) => !extra.some((e) => e.text === q.text)));
  const need = Math.max(0, 2 - have);
  const take = extra.slice(0, Math.max(need, Math.min(extra.length, 2)));
  if (!take.length) continue;
  out[ex.id] = take;
  touched++;
  added += take.length;
}

const header = `import type { SkillQuestion } from "../types";

/**
 * ÜRETİLMİŞ DOSYA — elle düzenleme: \`npm run content:derive\` yeniden yazar.
 * Okuma/dinleme egzersizlerine türetilmiş yazılı sorular (WP-72); kaynak ve
 * kurallar scripts/derive-questions.ts. Egzersiz kimliği → ek sorular;
 * bundled.ts yükleme sırasında ekler.
 */
export const DERIVED_QUESTIONS: Record<string, SkillQuestion[]> = `;
writeFileSync("src/lib/skills/content/derived-questions.ts", header + JSON.stringify(out, null, 2) + ";\n");
console.log(`derive-questions — ${touched} egzersiz, ${added} soru yazıldı.`);
