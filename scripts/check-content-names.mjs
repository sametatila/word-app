#!/usr/bin/env node
/**
 * HEDEF DİL İÇERİĞİNDE TÜRKÇE KİŞİ ADI YOK — `npm run check:content-names`.
 *
 * Almanca ve İngilizce kursun içeriğinde kişiler o dilin adlarını taşıyor (2026-10-05, Samet). Türkçe adlar
 * seslendirmede bozuluyordu ("Can" → "Ken", "Deniz" → "Denise", "Elif" harf harf) ve içerik üreten her yeni tur
 * (elle ya da yapay zekâyla) onları geri getirebilir. Kaynağı geçmiş kayıt olan dosyalar (data/meanings/qa,
 * data/audit-*) taranmaz. İki kural:
 *
 * A) `data/names/turkish-names.json` listesindeki adlar hiçbir yerde geçmez — yorumlar dahil, tırnak içinde
 *    ('Ali'yle …') ve iyelik ekiyle de: Almanca/İngilizce iyelik (Elifs, Elif's) ve Türkçe ek (Elif'in).
 *    2026-10-09: eski düzen tırnaktan sonra gelen adı ve -s iyeliğini görmüyordu ("Das Pferd von Elifs Oma",
 *    "'Ali'nin kuzeni" Patika'da kaldı).
 *
 * B) Aynı içerik öğesinde eski ad ile yeni adı birlikte geçmez. Eşleme `data/names/rename-2026-10-05.json`
 *    (kurs|ad|tür → yeni ad). Türkçede sözcük de olan adlar (Deniz, Kaya, Can, Onur…) A listesinde yok; onları
 *    ancak bağlam ayırır: hedef metin kişiyi yeni adıyla anıyorken Türkçe yönerge ya da açıklama eski adı
 *    söylüyorsa (de-a1 alfabe adımı: "'Kaya nasıl yazılıyor?' diye sor" ama beklenen "Wie schreibt man
 *    Eckhard?") öğrenci imkânsız bir adımla karşılaşır. Öğe = eski adı kapsayan en küçük `{…}` nesne ve onu
 *    kapsayan nesneler (dosyanın kökü hariç, 30 bin karakteri aşmayan).
 *
 * Adın kişi olmadığı, sözcük olarak geçtiği kalıplar (Emir kipi, Dilek kipi, Can you…, Deniz kenarında) tek
 * dosyada: `data/names/word-senses.json`. 2026-10-05 değişikliği bunları da ada çevirmişti ("Leonie kipi",
 * "Uwe cümlesi", "Collins sıfatlar"); bu dosya hem o sözcüklerin geri gelmesine izin veriyor hem de ad olarak
 * kalmalarını yakalamıyor.
 */
import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const { adlar } = JSON.parse(readFileSync("data/names/turkish-names.json", "utf8"));
const { eşleme } = JSON.parse(readFileSync("data/names/rename-2026-10-05.json", "utf8"));
const { anlamlar } = JSON.parse(readFileSync("data/names/word-senses.json", "utf8"));

/** Türkçe harfleri ASCII'ye indirir — eşleme anahtarları bu biçimde (Ayşe → Ayse, Çağrı → Cagri). */
const fold = (s) => s.replace(/ı/g, "i").replace(/İ/g, "I").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const listExact = new Set(adlar);
/** eski ad (ASCII) → yeni adlar (her kurs ve tür) */
const yeni = new Map();
for (const [k, v] of Object.entries(eşleme)) {
  const eski = k.split("|")[1];
  if (!yeni.has(eski)) yeni.set(eski, new Set());
  yeni.get(eski).add(v);
}
const allNew = new Set([...yeni.values()].flatMap((s) => [...s]));
const senses = Object.values(anlamlar).flat().map((k) => new RegExp(k, "gu"));

const KAYNAK = [
  "src/lib/skills/content", "src/lib/mock-exams/de", "src/lib/mock-exams/en", "src/lib/conversations/module-exam",
  "src/lib/weekly-quiz/de", "src/lib/weekly-quiz/en", "src/lib/conversations/content", "src/lib/immersion/content",
  "src/lib/conversations/characters.ts", "data/app/words.json", "data/app/words-en.json", "data/placement",
  "data/skills/prose/out", "data/skills/prose-de/out", "data/skills/task/out", "data/skills/task-de/out",
  "data/mock-exams/prose", "data/weekly-quiz/prose", "data/conversations", "data/meanings/out", "data/en-de/out",
];
const files = execFileSync("git", ["ls-files", ...KAYNAK], { encoding: "utf8" }).split("\n")
  .filter((f) => /\.(ts|json)$/.test(f));

/** Büyük harfle başlayan sözcük + isteğe bağlı iyelik/ek: Elifs, Elif's, Elif'in, Kaya. */
const TOKEN = /(?<![\p{L}\p{N}_-])(\p{Lu}\p{Ll}+)(s|['’]s|['’]\p{Ll}+)?(?![\p{L}\p{N}_])/gu;

/** Dizeleri ve yorumları atlayarak `{…}` aralıkları (en dıştaki parantez hariç). */
function objectSpans(src) {
  const out = [];
  const stack = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (c === '"' || c === "'" || c === "`") {
      i++;
      while (i < src.length && src[i] !== c) i += src[i] === "\\" ? 2 : 1;
    } else if (c === "/" && src[i + 1] === "/") {
      while (i < src.length && src[i] !== "\n") i++;
    } else if (c === "/" && src[i + 1] === "*") {
      const e = src.indexOf("*/", i + 2);
      i = e < 0 ? src.length : e + 1;
    } else if (c === "{" || c === "[") stack.push(i);
    else if (c === "}" || c === "]") {
      const s = stack.pop();
      if (c === "}" && s !== undefined && stack.length > 0) out.push([s, i + 1]);
    }
    i++;
  }
  return out;
}

const lineOf = (src, pos) => src.slice(0, pos).split("\n").length;
const hitsA = [];
const hitsB = [];
for (const f of files) {
  const src = readFileSync(f, "utf8");
  const ignored = [];
  for (const re of senses) for (const m of src.matchAll(re)) ignored.push([m.index, m.index + m[0].length]);
  const isIgnored = (p) => ignored.some(([s, e]) => p >= s && p < e);
  const occ = [];
  for (const m of src.matchAll(TOKEN)) {
    if (isIgnored(m.index)) continue;
    let name = m[1];
    // "Elifs": -s iyeliği ancak listedeki ya da eşlemedeki bir adın arkasındaysa ek sayılır
    if (!m[2] && name.endsWith("s") && (listExact.has(name.slice(0, -1)) || yeni.has(fold(name.slice(0, -1))))) name = name.slice(0, -1);
    occ.push({ i: m.index, word: m[0], name, base: fold(name) });
  }
  const isNew = (w) => allNew.has(w) || allNew.has(w.replace(/(['’]\p{Ll}*|s)$/u, ""));
  let spans = null;
  const newWords = occ.filter((o) => isNew(o.word));
  for (const o of occ) {
    if (!listExact.has(o.name) && !yeni.has(o.base)) continue;
    const line = lineOf(src, o.i);
    const ctx = src.slice(Math.max(0, o.i - 50), o.i + 70).replace(/\s+/g, " ");
    if (listExact.has(o.name)) {
      hitsA.push(`${f}:${line}: ${o.word} — …${ctx}…`);
      continue;
    }
    const targets = yeni.get(o.base);
    if (!targets) continue;
    spans ??= objectSpans(src).filter(([s, e]) => e - s <= 30000).sort((a, b) => (a[1] - a[0]) - (b[1] - b[0]));
    const span = spans.find(([s, e]) => s <= o.i && o.i < e && newWords.some((n) => n.i >= s && n.i < e
      && [...targets].some((t) => n.word === t || n.word.startsWith(t) && /^(s|['’]\p{Ll}*)$/u.test(n.word.slice(t.length)))));
    if (span) {
      const both = newWords.filter((n) => n.i >= span[0] && n.i < span[1]).map((n) => n.word);
      hitsB.push(`${f}:${line}: ${o.word} ↔ ${[...new Set(both)].filter((w) => [...targets].some((t) => w.startsWith(t))).join(", ")} — …${ctx}…`);
    }
  }
}

let fail = false;
if (hitsA.length) {
  fail = true;
  console.error(`✗ Hedef dil içeriğinde ${hitsA.length} Türkçe ad (data/names/turkish-names.json):`);
  for (const h of hitsA.slice(0, 200)) console.error("  " + h);
  console.error("Almanca içerikte Almanca, İngilizce içerikte İngilizce ad kullan; eşleme örnekleri data/names/rename-2026-10-05.json.");
}
if (hitsB.length) {
  fail = true;
  console.error(`✗ ${hitsB.length} öğede eski ad yeni adıyla birlikte geçiyor (data/names/rename-2026-10-05.json):`);
  for (const h of hitsB.slice(0, 200)) console.error("  " + h);
  console.error("Türkçe yönerge/açıklama da kişiyi hedef metindeki adıyla ansın. Ad değil sözcükse kalıbı data/names/word-senses.json'a ekle.");
}
if (fail) process.exit(1);
console.log(`✓ ${files.length} içerik dosyasında Türkçe kişi adı yok (${adlar.length} ad, ${yeni.size} eşleme).`);
