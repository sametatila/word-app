/**
 * Beceriler kütüphanesi — kapsam ve pedagoji raporu.
 *
 *   npm run report:library            (bütün kurslar)
 *   npm run report:library -- de      (tek kurs)
 *
 * `audit:skills` NESNEL kusuru arar (cevabı olmayan soru, metinde geçmeyen
 * sözlükçe). Bu betik onun yapmadığını yapar: içeriğin PEDAGOJİK dengesini
 * ölçer ve sayıyı masaya koyar — tanıma mı üretim mi ağır basıyor, metinler
 * seviyenin hedef aralığında mı, gerekçe her soruda var mı, seviyeler
 * arasında gerçek bir tırmanma var mı.
 *
 * Hiçbir eşik burada "hata" üretmez; rapor karar vermez, gösterir. Kapı
 * görevini `test:content` ve `audit:skills` üstleniyor.
 */
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { itemCount } from "../src/lib/skills/meta";
import { candoForExercise } from "../src/lib/cando-map";
import type { CefrLevel, SkillExercise, SkillId } from "../src/lib/skills/types";
import fs from "node:fs";

const LEVELS: CefrLevel[] = ["A1", "A2", "B1", "B2", "C1"];
const SKILLS: SkillId[] = ["reading", "listening", "writing", "speaking", "grammar"];
const SKILL_TR: Record<SkillId, string> = {
  reading: "okuma",
  listening: "dinleme",
  writing: "yazma",
  speaking: "konuşma",
  grammar: "dil bilgisi",
};

/** Okuma metni için seviye hedefi (data/content/SPEC.md ile aynı). */
const READING_WORDS: Record<CefrLevel, [number, number]> = {
  A1: [60, 120], A2: [100, 180], B1: [150, 260], B2: [200, 350], C1: [250, 450],
};
/** Dinleme toplamı için hedef — SPEC yalnız bölüm başına sınır koyuyor. */
const LISTENING_WORDS: Record<CefrLevel, [number, number]> = {
  A1: [60, 120], A2: [100, 180], B1: [150, 260], B2: [200, 320], C1: [250, 400],
};

const courseArg = (process.argv[2] ?? "all").toLowerCase();
const all = BUNDLED_EXERCISES as SkillExercise[];
const isLib = (e: SkillExercise) => e.id.includes("-lib-");
const courseOf = (e: SkillExercise) => e.course ?? "de";
const courses = courseArg === "all" ? [...new Set(all.map(courseOf))].sort() : [courseArg];

const wc = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const pct = (n: number, d: number) => (d ? `%${((100 * n) / d).toFixed(0)}` : "—");
const pad = (s: string | number, n: number) => String(s).padEnd(n);
const rpad = (s: string | number, n: number) => String(s).padStart(n);

/* ── 1. Kapsam ──────────────────────────────────────────────────────────── */
console.log("\n=== KAPSAM: kurs × seviye × beceri (kütüphane / Patika) ===\n");
const head = ["seviye", ...SKILLS.map((s) => SKILL_TR[s]), "toplam"];
for (const course of courses) {
  const mine = all.filter((e) => courseOf(e) === course);
  if (!mine.length) continue;
  console.log(`${course.toUpperCase()}`);
  console.log("  " + pad(head[0], 8) + head.slice(1).map((h) => rpad(h, 13)).join(""));
  for (const level of LEVELS) {
    const row = SKILLS.map((skill) => {
      const at = mine.filter((e) => e.level === level && e.skill === skill);
      const lib = at.filter(isLib).length;
      const path = at.length - lib;
      return rpad(`${lib} / ${path}`, 13);
    });
    const at = mine.filter((e) => e.level === level);
    console.log("  " + pad(level, 8) + row.join("") + rpad(`${at.filter(isLib).length} / ${at.length - at.filter(isLib).length}`, 13));
  }
  const lib = mine.filter(isLib).length;
  console.log(`  ${pad("TOPLAM", 8)}kütüphane ${lib} · Patika ${mine.length - lib} · hepsi ${mine.length}\n`);
}

/* ── 2. Kütüphane egzersizlerinin ölçümü ────────────────────────────────── */
type Row = {
  id: string; course: string; level: CefrLevel; skill: SkillId;
  items: number; minutes: number; gloss: number; glossEn: number;
  words: number; target: string; questions: number; written: number;
  explainMissing: number; explainLong: number; answerIdx: number[];
  detail: string; cando: string;
};
const rows: Row[] = [];

function measure(e: SkillExercise): Row {
  const r: Row = {
    id: e.id, course: courseOf(e), level: e.level, skill: e.skill,
    items: itemCount(e), minutes: e.minutes, gloss: e.gloss.length,
    glossEn: e.gloss.filter((g) => g.en).length,
    words: 0, target: "", questions: 0, written: 0,
    explainMissing: 0, explainLong: 0, answerIdx: [], detail: "",
    cando: candoForExercise(e).join(",") || "—",
  };
  const WRITTEN = new Set(["gapfill", "short_answer", "dictation", "order", "produce"]);
  if (e.skill === "reading" || e.skill === "listening" || e.skill === "grammar") {
    r.questions = e.questions.length;
    for (const q of e.questions) {
      const kind = q.kind ?? "mcq";
      if (WRITTEN.has(kind)) r.written++;
      if (!q.explain?.trim()) r.explainMissing++;
      else if (q.explain.length > 260) r.explainLong++;
      if (!WRITTEN.has(kind) && (q.options?.length ?? 0) >= 3) r.answerIdx.push(q.answer);
    }
  }
  if (e.skill === "reading") {
    r.words = wc(e.text);
    const [lo, hi] = READING_WORDS[e.level];
    r.target = `${lo}-${hi}`;
    r.detail = "metin";
  }
  if (e.skill === "listening") {
    r.words = e.segments.reduce((n, s) => n + wc(s.text), 0);
    const [lo, hi] = LISTENING_WORDS[e.level];
    r.target = `${lo}-${hi}`;
    const longest = Math.max(...e.segments.map((s) => wc(s.text)));
    r.detail = `${e.segments.length} bölüm, en uzun ${longest} kelime`;
  }
  if (e.skill === "writing") {
    const kinds = e.tasks.map((t) => t.kind);
    const free = e.tasks.find((t) => t.kind === "free" || t.kind === "reply");
    const min = free && "minWords" in free ? free.minWords : 0;
    const sample = free && "sample" in free && free.sample ? wc(free.sample) : 0;
    r.words = sample;
    r.target = min ? `≥${min}` : "—";
    r.detail = `${kinds.join("+")}, örnek ${sample} kelime`;
  }
  if (e.skill === "speaking") {
    if ("monologue" in e) {
      const m = e.monologue;
      r.words = wc(m.sampleDe);
      r.target = `${m.minSeconds}-${m.maxSeconds} sn`;
      r.detail = `monolog, ${m.bulletsTr.length} madde, ${m.targets.length} kalıp`;
    } else if ("tasks" in e) {
      const t = e.tasks;
      const withFix = t.filter((x) => (x.confusions?.length ?? 0) > 0).length;
      r.words = Math.round(t.reduce((n, x) => n + wc(x.de), 0) / t.length);
      r.target = "≤12 kelime";
      r.detail = `drill, ${t.length} cümle, ${withFix}/${t.length} düzeltmeli`;
    }
  }
  if (e.skill === "grammar") {
    const ornek = e.explanation.reduce((n, b) => n + (b.examples?.length ?? 0), 0);
    r.words = e.explanation.reduce((n, b) => n + wc(b.tr), 0);
    r.target = "anlatım";
    r.detail = `${e.explanation.length} blok, ${ornek} örnek · ${e.focus}`;
  }
  return r;
}

for (const e of all) if (isLib(e) && courses.includes(courseOf(e))) rows.push(measure(e));
rows.sort((a, b) => a.course.localeCompare(b.course) || LEVELS.indexOf(a.level) - LEVELS.indexOf(b.level) || SKILLS.indexOf(a.skill) - SKILLS.indexOf(b.skill));

console.log("=== KÜTÜPHANE EGZERSİZLERİ ===\n");
console.log("  " + pad("id", 17) + pad("madde", 6) + pad("dk", 4) + pad("sözlükçe", 9) + pad("ölçü", 7) + pad("hedef", 10) + "ayrıntı");
for (const r of rows) {
  const olcu = r.skill === "grammar" ? `${r.words}s` : r.words ? String(r.words) : "—";
  console.log("  " + pad(r.id, 17) + rpad(r.items, 4) + "  " + rpad(r.minutes, 2) + "  " + rpad(`${r.gloss}/${r.glossEn}en`, 8) + " " + rpad(olcu, 5) + "  " + pad(r.target, 10) + r.detail);
}

/* ── 3. Pedagojik göstergeler ───────────────────────────────────────────── */
console.log("\n=== PEDAGOJİ ===\n");

// (a) Tanıma / üretim dengesi
const qRows = rows.filter((r) => r.questions > 0);
const qTotal = qRows.reduce((n, r) => n + r.questions, 0);
const wTotal = qRows.reduce((n, r) => n + r.written, 0);
console.log(`Soru: ${qTotal} · yazılı (üretim) ${wTotal} ${pct(wTotal, qTotal)} · çoktan seçmeli ${qTotal - wTotal} ${pct(qTotal - wTotal, qTotal)}`);
const azYazili = qRows.filter((r) => r.written < 2);
console.log(`  Egzersiz başına yazılı soru < 2 olan: ${azYazili.length ? azYazili.map((r) => r.id).join(", ") : "yok"}`);

// (b) Gerekçe
const eksik = rows.reduce((n, r) => n + r.explainMissing, 0);
const uzun = rows.reduce((n, r) => n + r.explainLong, 0);
console.log(`Gerekçe (explain): eksik ${eksik} · 260 karakterden uzun ${uzun}`);

// (c) Doğru şık konumu — okumadan hep aynı şıkkı işaretleyen kaç puan alır
const idx: number[] = [];
for (const r of rows) idx.push(...r.answerIdx);
const dist = [0, 1, 2, 3].map((i) => idx.filter((x) => x === i).length);
console.log(`Doğru şık konumu (3+ şıklı ${idx.length} soru): ` + dist.map((n, i) => `idx${i} ${pct(n, idx.length)}`).join(" · ") + "  (tekdüze ≈ %33)");

// (c2) Şık uzunluğu — doğru şık sistematik olarak uzunsa okumadan bulunur
{
  let dogruUz = 0, dogruN = 0, yanlisUz = 0, yanlisN = 0;
  const supheli: string[] = [];
  for (const e of all.filter((x) => isLib(x) && courses.includes(courseOf(x)))) {
    // Yalnız anlama soruları: dil bilgisi şıkları çekim biçimleridir
    // ("has lived" / "lived"), uzunluk farkı orada bir ipucu değil.
    if (e.skill !== "reading" && e.skill !== "listening") continue;
    if (!("questions" in e) || !Array.isArray(e.questions)) continue;
    e.questions.forEach((q, i) => {
      const o = q.options ?? [];
      if (o.length < 3) return;
      const uz = o.map((x) => x.length);
      dogruUz += uz[q.answer]; dogruN++;
      uz.forEach((n, j) => { if (j !== q.answer) { yanlisUz += n; yanlisN++; } });
      // Doğru şık öteki şıkların en uzunundan %60 uzunsa okumadan seçilebilir.
      const enUzunYanlis = Math.max(...uz.filter((_, j) => j !== q.answer));
      if (uz[q.answer] > enUzunYanlis * 1.6) supheli.push(`${e.id} soru ${i + 1}`);
    });
  }
  const d = dogruN ? dogruUz / dogruN : 0;
  const y = yanlisN ? yanlisUz / yanlisN : 0;
  console.log(`Şık uzunluğu: doğru ort. ${d.toFixed(0)} karakter · yanlış ort. ${y.toFixed(0)} karakter (fark ${((d / y - 1) * 100).toFixed(0)}%)`);
  console.log(`  Doğru şıkkı belirgin uzun olan soru: ${supheli.length ? supheli.join(", ") : "yok"}`);
}

// (d) Metin uzunluğu hedefe göre
console.log("Metin uzunluğu hedef aralığında mı:");
for (const r of rows.filter((x) => x.skill === "reading" || x.skill === "listening")) {
  const [lo, hi] = r.target.split("-").map(Number);
  const durum = r.words < lo ? "KISA" : r.words > hi ? "UZUN" : "tamam";
  if (durum !== "tamam") console.log(`  ${pad(r.id, 17)} ${r.words} kelime, hedef ${r.target} → ${durum}`);
}
console.log("  (yalnız aralık dışındakiler listelenir)");

// (e) Seviyeler arası tırmanma
console.log("Seviye tırmanması (okuma · dinleme kelime, yazma minWords, monolog sn):");
for (const course of courses) {
  const line = LEVELS.map((lv) => {
    const rd = rows.find((r) => r.course === course && r.level === lv && r.skill === "reading");
    const ls = rows.find((r) => r.course === course && r.level === lv && r.skill === "listening");
    const wr = rows.find((r) => r.course === course && r.level === lv && r.skill === "writing");
    const sp = rows.find((r) => r.course === course && r.level === lv && r.skill === "speaking");
    return `${lv} ${rd?.words ?? "—"}·${ls?.words ?? "—"}·${wr?.target ?? "—"}·${sp?.target ?? "—"}`;
  });
  console.log(`  ${course}: ${line.join("  |  ")}`);
}

// (e2) KOPYA DENETİMİ — kütüphane metni başka bir içerikle örtüşüyor mu
{
  /*
   * Kullanıcının ilk şartı: kütüphane içeriği Patika'nın, derslerin ve deneme
   * kâğıtlarının kopyası olmayacak. Ölçüm sekiz kelimelik pencereler: doğal
   * dilde iki bağımsız metnin sekiz kelimesi arka arkaya aynı olmaz, ama
   * kopyalanmış bir cümle onlarca pencere paylaşır. Kısa kalıplar ("Sehr
   * geehrte Damen und Herren") sekiz kelimeye ulaşmadığı için elenmiş oluyor.
   */
  const N = 8;
  const norm = (t: string) => t.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean);
  const grams = (t: string) => {
    const w = norm(t);
    const out = new Set<string>();
    for (let i = 0; i + N <= w.length; i++) out.add(w.slice(i, i + N).join(" "));
    return out;
  };
  const surfaceOf = (e: SkillExercise): string => {
    const out: string[] = [];
    if (e.skill === "reading") out.push(e.text);
    if (e.skill === "listening") out.push(...e.segments.map((x) => x.text));
    if (e.skill === "writing")
      for (const t of e.tasks) {
        if ("sample" in t && t.sample) out.push(t.sample);
        if ("stimulus" in t && t.stimulus) out.push(t.stimulus);
        if ("answer" in t && t.answer) out.push(t.answer);
      }
    if (e.skill === "speaking" && "monologue" in e) out.push(e.monologue.sampleDe);
    if (e.skill === "speaking" && "tasks" in e) out.push(...e.tasks.map((t) => t.de));
    if (e.skill === "grammar") out.push(...e.explanation.flatMap((b) => (b.examples ?? []).map((x) => x.de)));
    return out.join("\n");
  };

  // Karşılaştırma havuzu: Patika egzersizleri + dersler + deneme kâğıtları.
  const others: string[] = [];
  for (const e of all) if (!isLib(e)) others.push(surfaceOf(e));

  /*
   * KÜTÜPHANE İÇİ kopya ayrı ölçülüyor. Hedef hücre başına beş egzersiz;
   * aynı seviyede beş okuma yazarken ikinci ve üçüncü metnin birbirine
   * benzemesi, Patika'ya benzemesinden daha olası. Aşağıdaki çapraz
   * karşılaştırma her kütüphane egzersizini ötekilerle kıyaslıyor.
   */
  const libs = all.filter((x) => isLib(x) && courses.includes(courseOf(x)));
  const libGrams = new Map<string, Set<string>>();
  for (const e of libs) libGrams.set(e.id, grams(surfaceOf(e)));
  const ic: string[] = [];
  for (let i = 0; i < libs.length; i++) {
    for (let j = i + 1; j < libs.length; j++) {
      const a = libGrams.get(libs[i].id)!;
      const b = libGrams.get(libs[j].id)!;
      const ortak = [...a].filter((g) => b.has(g));
      if (ortak.length > 2) ic.push(`  ${libs[i].id} ↔ ${libs[j].id}: ${ortak.length} pencere — ör. "${ortak[0].slice(0, 60)}…"`);
    }
  }
  console.log(`Kütüphane içi kopya: ${ic.length ? `${ic.length} çift` : "yok"}`);
  for (const d of ic.slice(0, 8)) console.log(d);
  for (const f of ["de-a1", "de-a2", "de-b1", "de-b2", "de-c1", "en-a1", "en-a2"]) {
    const path = `mobile/src/data/lessons/${f}.json`;
    if (fs.existsSync(path)) others.push(fs.readFileSync(path, "utf8"));
  }
  for (const f of ["papers.json", "papers-en.json"]) {
    const path = `mobile/src/data/exams/${f}`;
    if (fs.existsSync(path)) others.push(fs.readFileSync(path, "utf8"));
  }
  const havuz = new Set<string>();
  for (const t of others) for (const g of grams(t)) havuz.add(g);

  let carpisan = 0;
  const detay: string[] = [];
  for (const e of all.filter((x) => isLib(x) && courses.includes(courseOf(x)))) {
    const mine = grams(surfaceOf(e));
    const hit = [...mine].filter((g) => havuz.has(g));
    if (hit.length) {
      carpisan++;
      detay.push(`  ${e.id}: ${hit.length}/${mine.size} pencere — ör. "${hit[0].slice(0, 70)}…"`);
    }
  }
  console.log(`Kopya denetimi (${N} kelimelik pencere, havuz ${havuz.size} pencere): ${carpisan ? `${carpisan} egzersizde örtüşme` : "örtüşme yok"}`);
  for (const d of detay.slice(0, 10)) console.log(d);
  /*
   * NASIL OKUNUR. Bir iki pencere KALIP demektir, kopya değil: "Guten Tag, was
   * kann ich für Sie tun?" ya da "Sehr geehrte Damen und Herren" gerçek
   * Almancada tek biçimde söylenir ve iki bağımsız metinde aynı çıkar; bunları
   * değiştirmek dili bozardı. Kopyalanmış bir metin onlarca pencere paylaşır.
   * Eşik: egzersiz başına 3'ten çok pencere ya da toplam pencerelerin %5'i.
   */
  const supheliKopya = detay.filter((d) => {
    const m = /: (\d+)\/(\d+) pencere/.exec(d);
    return m && (Number(m[1]) > 3 || Number(m[1]) / Number(m[2]) > 0.05);
  });
  console.log(`  Eşiği aşan (kalıp değil, gerçek örtüşme adayı): ${supheliKopya.length ? supheliKopya.length : "yok"}`);
}

// (f) can-do kapsamı ve süre/madde
const candosuz = rows.filter((r) => r.cando === "—");
console.log(`Yapabilirlik etiketi: ${rows.length - candosuz.length}/${rows.length} egzersizde var${candosuz.length ? ` (eksik: ${candosuz.map((r) => r.id).join(", ")})` : ""}`);
const dk = rows.reduce((n, r) => n + r.minutes, 0);
console.log(`Toplam çalışma süresi: ${dk} dakika · ${rows.reduce((n, r) => n + r.items, 0)} puanlanabilir madde`);

// (g) Sözlükçe
const glossToplam = rows.reduce((n, r) => n + r.gloss, 0);
const glossEn = rows.reduce((n, r) => n + r.glossEn, 0);
const deRows = rows.filter((r) => r.course === "de");
const deGloss = deRows.reduce((n, r) => n + r.gloss, 0);
const deGlossEn = deRows.reduce((n, r) => n + r.glossEn, 0);
console.log(`Sözlükçe: ${glossToplam} madde · Almanca kursta İngilizce karşılık ${deGlossEn}/${deGloss} ${pct(deGlossEn, deGloss)}`);
console.log(`  (İngilizce kursta \`en\` alanı yazılmaz: ${glossEn - deGlossEn} beklenmeyen)\n`);
