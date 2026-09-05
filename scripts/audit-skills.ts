/**
 * Beceri egzersizi kalite denetimi: `npm run audit:skills`
 *
 * Kelime havuzu denetimiyle aynı ilke: yalnızca nesnel, tartışmaya açık
 * olmayan hatalar. Bir egzersizde cevabı olmayan soru, metinde geçmeyen
 * sözlükçe maddesi ya da yanlış işaretlenmiş doğru şık öğrenciye sessizce
 * yanlış bilgi öğretir — bunlar zevk meselesi değildir.
 */
import fs from "node:fs";
import { sentenceContainsWord } from "../src/lib/headword";
import { BUNDLED_EXERCISES } from "../src/lib/skills/index";
import type { SkillExercise, SkillQuestion } from "../src/lib/skills/types";

type Finding = { id: string; rule: string; detail: string };
const findings: Finding[] = [];
const add = (id: string, rule: string, detail: string) => findings.push({ id, rule, detail });

const norm = (s: string) =>
  s.toLowerCase().replace(/[.,!?;:„“"'()–—-]/g, " ").replace(/\s+/g, " ").trim();

/** Egzersizin tüm Almanca metni — sözlükçe ve cevap denetimi buna bakar. */
/**
 * Egzersizin ALMANCA gövdesi — sözlükçe buna karşı aranır.
 *
 * İki boşluk kapatıldı, ikisi de sahte bulgu üretiyordu:
 * - Konuşma egzersizi hiç gövde vermiyordu, yani ses çalışmalarının bütün
 *   sözlükçesi "metinde geçmiyor" sayılıyordu. Konuşmanın metni söylenecek
 *   cümlelerdir.
 * - Yazma egzersizinde yalnız cevaplar ve örnek taranıyordu; oysa öğrenci
 *   verilen KALIPLARI ve uyaranı da okuyor. Orada geçen bir sözlükçe maddesi
 *   öğrenciyle buluşuyor demektir.
 */
function bodyOf(ex: SkillExercise): string {
  if (ex.skill === "reading") return ex.text;
  if (ex.skill === "listening") return ex.segments.map((s) => s.text).join(" ");
  if (ex.skill === "writing")
    return ex.tasks
      .map((t) => {
        const verilen = [
          ...("phrases" in t && Array.isArray(t.phrases) ? t.phrases.map((p: { de: string }) => p.de) : []),
          ..."stimulus" in t && typeof t.stimulus === "string" ? [t.stimulus] : [],
        ].join(" ");
        const cekirdek =
          t.kind === "build" || t.kind === "rewrite"
            ? `${t.answer} ${(t.alternatives ?? []).join(" ")}`
            : t.kind === "form"
              ? t.fields.map((f) => f.answer).join(" ")
              : (t.sample ?? "");
        return `${cekirdek} ${verilen}`;
      })
      .join(" ");
  if (ex.skill === "speaking")
    return "tasks" in ex && Array.isArray(ex.tasks)
      ? (ex.tasks as { de?: string }[]).map((t) => t.de ?? "").join(" ")
      : "";
  return "";
}

/**
 * Şık listesi TAŞIMAYAN soru türleri.
 *
 * WP-31/WP-72 ile yazılı türler geldi (boşluk doldurma, kısa cevap, dikte,
 * sıralama) ve bunlar tanım gereği şıksız: cevap yazılıyor ya da diziliyor.
 * Bu denetim onları bilmediği için hepsini "şık sayısı yetersiz" sayıyordu —
 * rapordaki 2336 bulgunun 1667'si bu yanlış pozitifti ve 25 gerçek bulgu
 * altında kayboluyordu. Bir rapor okunmuyorsa kusur bulmuyor demektir.
 */
const SIKSIZ_TUR = new Set(["gapfill", "short_answer", "dictation", "order"]);

function checkQuestions(id: string, qs: SkillQuestion[]) {
  if (!qs?.length) return add(id, "soru yok", "egzersizde hiç soru yok");
  qs.forEach((q, i) => {
    const tag = `soru ${i + 1}`;
    const kind = q.kind ?? "mcq";
    if (!q.text?.trim()) add(id, "soru metni boş", tag);
    if (SIKSIZ_TUR.has(kind)) {
      // Yazılı türde beklenen şey şık değil kabul edilen cevap (ya da sıra).
      if (kind === "order") {
        if (!q.items?.length) add(id, "sıralama maddesi yok", tag);
      } else if (!q.accept?.length) {
        add(id, "kabul edilen cevap yok", `${tag} (${kind})`);
      }
    } else if (!Array.isArray(q.options) || q.options.length < 2)
      add(id, "şık sayısı yetersiz", `${tag}: ${q.options?.length ?? 0} şık`);
    else {
      if (q.answer < 0 || q.answer >= q.options.length)
        add(id, "cevap indeksi geçersiz", `${tag}: answer=${q.answer}, ${q.options.length} şık`);
      const seen = new Set(q.options.map(norm));
      if (seen.size !== q.options.length)
        add(id, "aynı şık iki kez", `${tag}: ${q.options.join(" | ")}`);
      if (q.options.some((o) => !o?.trim())) add(id, "boş şık", tag);
    }
    if (!q.explain?.trim()) add(id, "açıklama yok", tag);
  });
}

const ids = new Set<string>();
for (const ex of BUNDLED_EXERCISES as SkillExercise[]) {
  const id = ex.id;
  if (ids.has(id)) add(id, "yinelenen id", id);
  ids.add(id);

  if (!ex.title?.trim()) add(id, "başlık yok", "");
  if (!ex.intro?.trim()) add(id, "yönerge yok", "");
  if (!ex.minutes || ex.minutes < 1) add(id, "süre geçersiz", String(ex.minutes));
  // Kurs ile id öneki tutarlı olmalı: zh- ile başlayan egzersiz Zürih kursuna ait.
  const isZh = id.startsWith("zh-");
  const course = ex.course ?? "de";
  if (isZh !== (course === "gsw-zh"))
    add(id, "kurs etiketi tutarsız", `id "${id}" ama course "${course}"`);
  // Seviye id ile eşleşmeli: "a2-r3" → A2
  const lvlInId = id.replace(/^zh-/, "").slice(0, 2).toUpperCase();
  if (lvlInId !== ex.level) add(id, "seviye id ile uyuşmuyor", `id "${id}" ama level "${ex.level}"`);

  const body = norm(bodyOf(ex));

  // Sözlükçe metinden gelmeli: metinde geçmeyen kelimeyi "bu metnin kilit
  // kelimesi" diye sunmak öğrenciyi yanlış yönlendirir.
  for (const g of ex.gloss ?? []) {
    if (!g.de?.trim() || !g.tr?.trim()) {
      add(id, "sözlükçe eksik alan", JSON.stringify(g));
      continue;
    }
    // Ortak mantık: ayrılabilen fiiller metinde parçalanır ("mitkommen" →
    // "kommst du mit") ve düz arama bunları kaçırır.
    if (!sentenceContainsWord(g.de, body)) add(id, "sözlükçe metinde geçmiyor", `"${g.de}"`);
  }

  if (ex.skill === "reading") {
    if (!ex.text?.trim()) add(id, "metin yok", "");
    else if (ex.text.split(/\s+/).length < 20)
      add(id, "metin çok kısa", `${ex.text.split(/\s+/).length} kelime`);
    checkQuestions(id, ex.questions);
  } else if (ex.skill === "listening") {
    if (!ex.segments?.length) add(id, "ses bölümü yok", "");
    else if (ex.segments.some((s) => !s.text?.trim())) add(id, "boş ses bölümü", "");
    checkQuestions(id, ex.questions);
  } else if (ex.skill === "writing") {
    if (!ex.tasks?.length) add(id, "yazma görevi yok", "");
    for (const [i, t] of (ex.tasks ?? []).entries()) {
      if (t.kind === "build") {
        if (!t.answer?.trim()) add(id, "kanonik cevap yok", `görev ${i + 1}`);
        if (!t.tr?.trim()) add(id, "Türkçe istem yok", `görev ${i + 1}`);
        // Alternatif diziliş aynı kelimelerden kurulmalı, yoksa öğrenci doğru
        // yazdığı hâlde reddedilir ya da yanlışı kabul edilir.
        const bag = (s: string) => norm(s).split(" ").sort().join(" ");
        for (const alt of t.alternatives ?? [])
          if (bag(alt) !== bag(t.answer))
            add(id, "alternatif farklı kelimeler", `görev ${i + 1}: "${alt}"`);
      } else if (t.kind === "sentence") {
        if ((t.words?.length ?? 0) < 2) add(id, "kelime yok", `görev ${i + 1}`);
      } else if (t.kind === "free" || t.kind === "reply") {
        if (!t.prompt?.trim()) add(id, "senaryo yok", `görev ${i + 1}`);
        if (!t.checklist?.length) add(id, "kontrol listesi yok", `görev ${i + 1}`);
        if (!t.sample?.trim()) add(id, "örnek cevap yok", `görev ${i + 1}`);
      }
    }
  }
}

const byRule = new Map<string, Finding[]>();
for (const f of findings) {
  if (!byRule.has(f.rule)) byRule.set(f.rule, []);
  byRule.get(f.rule)!.push(f);
}
const byCourse = { de: 0, "gsw-zh": 0 } as Record<string, number>;
for (const ex of BUNDLED_EXERCISES as SkillExercise[]) byCourse[ex.course ?? "de"]++;

console.log(`${(BUNDLED_EXERCISES as SkillExercise[]).length} egzersiz (de ${byCourse.de} · gsw-zh ${byCourse["gsw-zh"]}) · ${findings.length} bulgu\n`);
for (const [rule, list] of [...byRule.entries()].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${String(list.length).padStart(4)}  ${rule}`);
  for (const f of list.slice(0, 6)) console.log(`        ${f.id}  ${f.detail}`);
  if (list.length > 6) console.log(`        … ${list.length - 6} tane daha`);
}
fs.writeFileSync("data/audit-skills.json", JSON.stringify(findings, null, 1));
