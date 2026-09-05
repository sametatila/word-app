/**
 * İçerik doğrulayıcı — `npm run test:content` (WP-70)
 *
 *   npm run test:content                 # hepsi
 *   npm run test:content -- lessons      # tek tür: skills | lessons | cheatsheet
 *   npm run test:content -- --baseline   # uyarı sayısını baseline'a yaz
 *
 * Kurallar `data/content/SPEC.md`'de; burası onların kodu. İki liste:
 *   HATA   — yapıyı bozan (eksik alan, aralık dışı indeks, kopuk `next`,
 *            yinelenen kimlik). Bir tane bile varsa çıkış 1.
 *   UYARI  — kalite (havuz dışı kelime, çok anlamlı karşılık, uzun metin,
 *            `en` eksik). Etiket başına sayılır; `data/content/baseline.json`
 *            etiket başına tavan tutar — aşan ya da yeni kategori hata:
 *            mevcut borç bilinir, yeni borç alınmaz.
 *
 * Veritabanı yok: içerik koddan (`bundled`, `LESSONS`, `CHEATSHEETS`),
 * kelime havuzu `data/app/words.json`'dan.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { LESSONS } from "../src/lib/lessons";
import { moduleExamPlan } from "../src/lib/lessons/module-exam";
import { LESSON_ICONS } from "../src/lib/lessons/types";
import type { DialogueTurn } from "../src/lib/dialogue";
import type { Lesson } from "../src/lib/lessons/types";
import type { SkillExercise } from "../src/lib/skills/types";
import { isCandoId } from "../src/lib/cando";
import { candoForExercise, candoForLesson } from "../src/lib/cando-map";
// contains.mjs: kelimenin metinde çekimli hâliyle geçip geçmediği (kelime hattıyla ortak).
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore — .mjs, tip bildirimi yok
import { contains } from "../data/meanings/contains.mjs";

const ROOT = path.resolve(__dirname, "..");
const BASELINE = path.join(ROOT, "data/content/baseline.json");
const args = process.argv.slice(2);
const only = args.find((a) => !a.startsWith("--"));
const writeBaseline = args.includes("--baseline");

const LEVELS = new Set(["A1", "A2", "B1", "B2", "C1"]);
const TR_LETTER = /[ıİğĞşŞ]/;
/** Türkçe olduğunun ikinci işareti — Almancada karşılığı olmayan sözcük ve ekler. */
const TR_HINT = /[ıİğĞşŞçÇ]|\b(ve|bir|bu|şu|için|ile|ne|nasıl|hangi|yaz|anlat|kur|seç)\b|\w+(yor|mek|mak|leri|ları)\b/i;
/**
 * Almanca metinde Türkçe harf var mı — ÖZEL ADLAR HARİÇ. Metinlerde Türk
 * karakterler var ("Frau Yıldız", "Herr Aydın") ve bu bilinçli: öğrenci
 * kendini metinde görüyor. Büyük harfle başlayan kelimeler (özel ad ya da
 * Almanca isim) sınavdan çıkarılıyor; kalanında Türkçe harf hata.
 */
const trLetters = (text: string) => TR_LETTER.test(text.replace(/(^|[\s„"(])[A-ZÄÖÜİ][^\s.,;:!?„"()]*/g, "$1"));
const READING_WORDS: Record<string, [number, number]> = { A1: [60, 120], A2: [100, 180], B1: [150, 260], B2: [200, 350], C1: [250, 450] };

const errors: string[] = [];
const warnings: string[] = [];
const E = (where: string, msg: string) => errors.push(`${where} — ${msg}`);
const W = (where: string, msg: string) => warnings.push(`${where} — ${msg}`);

const words = (JSON.parse(readFileSync(path.join(ROOT, "data/app/words.json"), "utf8")) as { de: string }[]).map((w) => w.de);
const pool = new Set(words.map((w) => w.toLocaleLowerCase("de-DE")));
const inPool = (de: string) => {
  const bare = de.replace(/^(der|die|das|de|d|s|en|e)\s+/i, "").replace(/\s*\(.*\)\s*/g, "").replace(/…|\.\.\./g, "").trim();
  if (!bare || /\s/.test(bare)) return true; // kalıp/çok kelimeli: havuz karşılaştırması anlamsız
  return pool.has(bare.toLocaleLowerCase("de-DE"));
};
const wc = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const multi = (s: string) => /,/.test(s) && !/[…/]/.test(s);
const need = (where: string, obj: Record<string, unknown>, keys: string[]) => {
  for (const k of keys) {
    const v = obj[k];
    if (v === undefined || v === null || (typeof v === "string" && !v.trim()) || (Array.isArray(v) && !v.length)) E(where, `zorunlu alan boş: ${k}`);
  }
};

/* ───────────── senaryo / diyalog turları (ortak) ───────────── */
function checkTurns(where: string, turns: DialogueTurn[], opts: { minTurns?: number; opening?: string } = {}) {
  const ids = new Set<string>();
  for (const t of turns) {
    if (ids.has(t.id)) E(where, `yinelenen tur kimliği ${t.id}`);
    ids.add(t.id);
  }
  turns.forEach((t, i) => {
    const w = `${where} tur ${t.id}`;
    need(w, t as unknown as Record<string, unknown>, ["ask", "askTr", "cue", "replies", "fallback"]);
    if (trLetters(t.ask)) E(w, `ask içinde Türkçe harf: "${t.ask}"`);
    if (!t.fallback?.example?.trim()) E(w, "fallback.example boş");
    if (!t.fallback?.say?.trim() || !t.fallback?.sayTr?.trim()) E(w, "fallback.say/sayTr boş");
    for (const r of t.replies ?? []) {
      if (!r.match?.length) E(w, "reply.match boş");
      if (r.match?.length === 1) W(w, `tek köklü dal: ${r.match[0]}`);
      if (!r.say?.trim()) E(w, "reply.say boş");
      if (r.next && !ids.has(r.next)) E(w, `kopuk next: ${r.next}`);
    }
    if (i === 0 && opts.opening !== undefined && t.ask !== opts.opening) E(w, "ilk turun ask'i açılış repliğiyle aynı değil");
  });
  if (opts.minTurns !== undefined && turns.length < opts.minTurns) E(where, `senaryo ${turns.length} tur, minTurns ${opts.minTurns}`);
}

/* ───────────── beceri egzersizleri ───────────── */
function checkSkills(list: SkillExercise[]) {
  const ids = new Set<string>();
  for (const e of list) {
    const w = `[skills] ${e.id}`;
    if (ids.has(e.id)) E(w, "yinelenen kimlik");
    ids.add(e.id);
    need(w, e as unknown as Record<string, unknown>, ["id", "level", "title", "genre", "intro", "minutes"]);
    if (!LEVELS.has(e.level)) E(w, `geçersiz seviye ${e.level}`);
    if (e.minutes < 1 || e.minutes > 20) W(w, `minutes ${e.minutes} aralık dışı (1–20)`);
    for (const id of e.cando ?? []) if (!isCandoId(id)) E(w, `bilinmeyen can-do kimliği ${id}`);
    if (!candoForExercise(e).length) E(w, "can-do etiketi üretilemedi");
    // ö ve ü Türkçede de var: "söylemeyi", "sürüyor". Yalnız ı/ğ/ş aramak,
    // bu harfleri taşımayan tamamen Türkçe cümleleri Almanca sanıyordu.
    // İkinci bir işaret gerekiyor: Türkçe işlev sözcüğü ya da -yor/-mek eki
    // (hiçbiri Almancada geçmez).
    if (!TR_HINT.test(e.intro) && /[ßÄÖÜäöü]/.test(e.intro) && !/„|"/.test(e.intro)) W(w, "intro Türkçe olmalı; Almanca harf var");

    const text =
      e.skill === "reading" ? e.text : e.skill === "listening" ? e.segments.map((s) => s.text).join(" ") : "";
    for (const g of e.gloss ?? []) {
      if (!g.de?.trim() || !g.tr?.trim()) E(w, `gloss eksik: ${JSON.stringify(g)}`);
      if (multi(g.tr)) W(w, `çok anlamlı tr: ${g.de} → "${g.tr}"`);
      if (!g.en) W(w, `en yok: ${g.de}`);
      if (g.en && TR_LETTER.test(g.en)) E(w, `en alanında Türkçe harf: ${g.de} → "${g.en}"`);
      if (/[()[\]]/.test(g.tr)) W(w, `parantezli tr: ${g.de} → "${g.tr}"`);
      if (text && !/[…/,]/.test(g.de) && !contains(text, g.de)) W(w, `sözlükçe kelimesi metinde yok: "${g.de}"`);
    }

    if (e.skill === "reading") {
      const n = wc(e.text);
      const [lo, hi] = READING_WORDS[e.level] ?? [0, Infinity];
      if (n < lo * 0.6 || n > hi * 1.4) W(w, `okuma metni ${n} kelime; ${e.level} için ${lo}–${hi}`);
      if (trLetters(e.text)) E(w, "okuma metninde Türkçe harf");
    }
    if (e.skill === "listening") {
      for (const s of e.segments) {
        if (wc(s.text) > 40) W(w, `dinleme bölümü ${wc(s.text)} kelime (> 40): "${s.text.slice(0, 40)}…"`);
        if (trLetters(s.text)) E(w, `dinleme bölümünde Türkçe harf: "${s.text.slice(0, 40)}"`);
      }
    }
    if (e.skill === "reading" || e.skill === "listening") {
      if (e.questions.length < 3) W(w, `${e.questions.length} soru (< 3)`);
      e.questions.forEach((q, i) => {
        const qw = `${w} soru ${i + 1}`;
        const kind = q.kind ?? "mcq";
        if (!q.text?.trim()) E(qw, "soru metni boş");
        // Yazılı türler (WP-31): şık yerine kabul listesi; sıralama: maddeler.
        if (kind === "gapfill" || kind === "short_answer" || kind === "dictation" || kind === "produce") {
          if (!q.accept?.length) E(qw, `${kind}: accept boş`);
          for (const a of q.accept ?? []) if (trLetters(a)) E(qw, `${kind}: accept içinde Türkçe harf "${a}"`);
          if (kind === "short_answer" && (q.accept ?? []).some((a) => wc(a) > 5)) W(qw, "short_answer: kabul edilen cevap > 5 kelime");
          if (kind === "gapfill" && !/___/.test(q.text)) W(qw, "gapfill: soruda ___ boşluğu yok");
          if (kind === "dictation" && e.skill === "listening" && !e.segments.some((s) => s.text.includes(q.accept![0]))) W(qw, "dictation: cümle bölümlerde geçmiyor");
        } else if (kind === "order") {
          if (!q.items || q.items.length < 3 || q.items.length > 6) E(qw, `order: ${q.items?.length ?? 0} madde (3–6)`);
        } else {
          if (!q.options || q.options.length < 2 || q.options.length > 4) E(qw, `şık sayısı ${q.options?.length ?? 0}`);
          if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= (q.options?.length ?? 0)) E(qw, `answer indeksi aralık dışı: ${q.answer}`);
          if (new Set(q.options).size !== q.options?.length) E(qw, "yinelenen şık");
        }
        if (!q.explain?.trim()) E(qw, "explain (neden) boş");
        else if (q.explain.length > 260) W(qw, `explain ${q.explain.length} karakter (> 260)`);
        if (wc(q.text) > 30) W(qw, `soru ${wc(q.text)} kelime (> 30)`);
      });
      // WP-31 kabul ölçütü: üretim/gapfill soruları — henüz pilot; eksikse uyarı.
      const written = e.questions.filter((q) => ["gapfill", "short_answer", "dictation", "order", "produce"].includes(q.kind ?? "mcq")).length;
      if (written < 2) W(w, `çoktan seçmeli olmayan soru ${written} (< 2)`);
    }
    if (e.skill === "writing") {
      if (!e.tasks.length) E(w, "yazma görevi yok");
      e.tasks.forEach((t, i) => {
        const tw = `${w} görev ${i + 1}`;
        if (t.kind === "sentence") {
          if (!t.words || t.words.length < 2 || t.words.length > 3) E(tw, `sentence: ${t.words?.length ?? 0} kelime (2–3)`);
          for (const g of t.words ?? []) if (!g.de?.trim() || !g.tr?.trim()) E(tw, `sentence: kelime eksik ${JSON.stringify(g)}`);
        } else if (t.kind === "build") {
          if (!t.tr?.trim() || !t.answer?.trim()) E(tw, "build: tr/answer boş");
          if (trLetters(t.answer)) E(tw, "build: answer içinde Türkçe harf");
        } else if (t.kind === "form") {
          if (!t.prompt?.trim() || !t.facts?.trim()) E(tw, "form: prompt/facts boş");
          if (!t.fields || t.fields.length < 3 || t.fields.length > 8) E(tw, `form: ${t.fields?.length ?? 0} alan (3–8)`);
          for (const f of t.fields ?? []) if (!f.label?.trim() || !f.answer?.trim()) E(tw, `form: alan eksik ${JSON.stringify(f)}`);
        } else if (t.kind === "rewrite") {
          if (!t.prompt?.trim() || !t.source?.trim() || !t.answer?.trim()) E(tw, "rewrite: prompt/source/answer boş");
          if (trLetters(t.answer)) E(tw, "rewrite: answer içinde Türkçe harf");
          if (t.source.trim() === t.answer.trim()) E(tw, "rewrite: source ile answer aynı");
        } else if (t.kind === "summary") {
          if (!t.prompt?.trim() || !t.source?.trim() || !t.sample?.trim()) E(tw, "summary: prompt/source/sample boş");
          if (t.maxSentences < 1 || t.maxSentences > 4) W(tw, `summary: maxSentences ${t.maxSentences}`);
          if (e.level === "A1" || e.level === "A2") W(tw, "summary görevi B1+ için");
        } else if (t.kind === "reply") {
          if (!t.prompt?.trim() || !t.stimulus?.trim()) E(tw, "reply: prompt/stimulus boş");
          if ((t.checklist?.length ?? 0) < 2) W(tw, "reply: checklist < 2");
          if (t.minWords < 15 || t.minWords > 200) W(tw, `reply: minWords ${t.minWords}`);
        } else {
          if (!t.prompt?.trim()) E(tw, "free: prompt boş");
          if ((t.checklist?.length ?? 0) < 2) W(tw, "free: checklist < 2");
          if (t.minWords < 15 || t.minWords > 200) W(tw, `free: minWords ${t.minWords}`);
          if ((t.phrases?.length ?? 0) < 2) W(tw, "free: phrases < 2");
          if (t.sample && wc(t.sample) < t.minWords) W(tw, `free: sample ${wc(t.sample)} kelime, minWords ${t.minWords}`);
        }
      });
    }
    if (e.skill === "speaking") {
      if ("dialogue" in e) {
        checkTurns(w, e.dialogue);
        if ((e.targets?.length ?? 0) < 2) W(w, "diyalog hedefleri < 2");
        // Açık diyalog teması (WP-23): rol Almanca, hedef Türkçe, sahne = intro.
        if (!e.theme) W(w, "diyalog teması yok (yalnız senaryo)");
        else if (!e.theme.role?.trim() || !e.theme.goal?.trim()) E(w, "diyalog teması eksik (role/goal)");
      } else if ("monologue" in e) {
        const m = e.monologue;
        if (!m.promptTr?.trim()) E(w, "monolog: promptTr boş");
        if (!m.bulletsTr || m.bulletsTr.length < 3 || m.bulletsTr.length > 5) E(w, `monolog: ${m.bulletsTr?.length ?? 0} madde (3–5)`);
        if ((m.targets?.length ?? 0) < 2) W(w, "monolog hedefleri < 2");
        if (!(m.minSeconds >= 20 && m.maxSeconds > m.minSeconds && m.maxSeconds <= 120)) E(w, `monolog süre ${m.minSeconds}–${m.maxSeconds}`);
        if (wc(m.sampleDe) < 30) W(w, `monolog örneği ${wc(m.sampleDe)} kelime (< 30)`);
        if (trLetters(m.sampleDe)) E(w, "monolog örneğinde Türkçe harf");
      } else {
        if (e.tasks.length < 4) W(w, `konuşma drill'i ${e.tasks.length} görev (< 4)`);
        for (const t of e.tasks) {
          if (!t.de?.trim() || !t.tr?.trim()) E(w, `konuşma görevi eksik: ${JSON.stringify(t).slice(0, 60)}`);
          if (wc(t.de) > 12) W(w, `konuşma cümlesi ${wc(t.de)} kelime (> 12): "${t.de}"`);
          for (const c of t.confusions ?? []) if (!c.heard?.length || !c.fix?.trim()) E(w, `confusion eksik: ${t.de}`);
        }
      }
    }
  }
}

/* ───────────── dersler ───────────── */
function checkLessons(list: Lesson[]) {
  const ids = new Set<string>();
  const icons = new Set<string>(LESSON_ICONS);
  for (const l of list) {
    const w = `[lessons] ${l.id}`;
    if (ids.has(l.id)) E(w, "yinelenen kimlik");
    ids.add(l.id);
    need(w, l as unknown as Record<string, unknown>, ["id", "level", "course", "icon", "title", "titleTr", "summary", "minutes", "focusId", "vocab", "patterns", "lecture", "roleplay"]);
    if (!LEVELS.has(l.level)) E(w, `geçersiz seviye ${l.level}`);
    if (!icons.has(l.icon)) E(w, `bilinmeyen ikon ${l.icon}`);
    for (const id of l.cando ?? []) if (!isCandoId(id)) E(w, `bilinmeyen can-do kimliği ${id}`);
    if (!candoForLesson(l).length) E(w, "can-do etiketi üretilemedi");
    if (l.minutes < 3 || l.minutes > 20) W(w, `minutes ${l.minutes}`);
    if (l.vocab.length < 4 || l.vocab.length > 10) W(w, `vocab ${l.vocab.length} (4–10)`);
    if (l.patterns.length < 2 || l.patterns.length > 5) W(w, `patterns ${l.patterns.length} (2–5)`);
    let out = 0;
    for (const v of l.vocab) {
      if (!v.de?.trim() || !v.tr?.trim()) E(w, `vocab eksik: ${JSON.stringify(v)}`);
      if (multi(v.tr)) W(w, `çok anlamlı vocab tr: ${v.de} → "${v.tr}"`);
      if (l.course === "de" && !inPool(v.de)) out++;
    }
    if (l.course === "de" && l.vocab.length && out / l.vocab.length > 0.34) W(w, `havuz dışı kelime ${out}/${l.vocab.length}`);
    for (const p of l.patterns) if (!p.de?.trim() || !p.tr?.trim()) E(w, `pattern eksik: ${JSON.stringify(p)}`);

    const steps = l.lecture;
    if (steps.length < 8 || steps.length > 20) W(w, `lecture ${steps.length} adım (8–20)`);
    let scored = 0;
    let repeat = 0;
    steps.forEach((s, i) => {
      const sw = `${w} adım ${i + 1}`;
      if (!s.say?.length) E(sw, "say boş");
      for (const seg of s.say ?? []) {
        if (seg.lang === "de" && trLetters(seg.text)) E(sw, `Almanca parçada Türkçe harf: "${seg.text}"`);
      }
      const x = s.expect;
      if (!x) return;
      if (x.kind === "repeat") {
        repeat++;
        if (!x.target?.trim()) E(sw, "repeat.target boş");
      } else if (x.kind === "produce") {
        scored++;
        if (!x.target?.trim()) E(sw, "produce.target boş");
        if (!x.hint?.length) E(sw, "produce.hint boş (ilk yanlışın 'neden'i)");
        if (trLetters(x.target)) E(sw, `produce.target içinde Türkçe harf: "${x.target}"`);
      } else if (x.kind === "truefalse") {
        scored++;
        if (!x.statement?.trim()) E(sw, "truefalse.statement boş");
        if (!x.why?.length) E(sw, "truefalse.why boş");
      }
    });
    if (scored < 3) W(w, `puanlanan adım ${scored} (< 3)`);
    if (steps.length && repeat / steps.length > 0.6) W(w, `tekrar adımı payı %${Math.round((100 * repeat) / steps.length)} (> 60)`);

    const r = l.roleplay;
    need(`${w} roleplay`, r as unknown as Record<string, unknown>, ["scene", "partner", "opening", "openingTr", "minTurns"]);
    if (trLetters(r.opening)) E(w, "roleplay.opening içinde Türkçe harf");
    // Aralık check-lessons.ts ile AYNI olmalı: orada 6-9 zorunlu (HATA), burada
    // 2-6 uyarılıyordu. Rol yapma 6-9 tura çıkınca (894ddb0) bu eşik güncellenmedi
    // ve kataloğun 426 dersi, öteki doğrulayıcının dayattığı değer yüzünden burada
    // uyarı üretir oldu. İki doğrulayıcı aynı alan için farklı şey söyleyemez.
    if (r.minTurns < 6 || r.minTurns > 9) W(w, `minTurns ${r.minTurns} (6–9)`);
    if (r.script?.length) checkTurns(`${w} senaryo`, r.script, { minTurns: r.minTurns, opening: r.opening });
  }
}


/* ───────────── çalıştır ───────────── */
const kinds = only ? [only] : ["skills", "lessons"];
if (kinds.includes("skills")) checkSkills(BUNDLED_EXERCISES);
if (kinds.includes("lessons")) checkLessons(LESSONS);

const counts = `${BUNDLED_EXERCISES.length} egzersiz · ${LESSONS.length} ders · havuz ${words.length} kelime`;
console.log(`\nİçerik doğrulama — ${kinds.join(", ")} · ${counts}\n`);
if (errors.length) {
  console.log(`HATA (${errors.length})`);
  for (const e of errors) console.log(`  ✗ ${e}`);
}

/* ── şık konumu yanlılığı + modül sınavı kâğıtları ────────────────────────
   2026-09-05'te ölçülen kusur: 1484 çoktan seçmeli sorunun %83'ünde doğru
   cevap İLK şıktaydı — her seviyede, her yazarda (A1 %86, B2 %89, C1 %82).
   Hiçbir şey okumadan hep ilk şıkkı işaretleyen ~%83 alıyordu. Kusur tek bir
   soruya bakınca GÖRÜNMÜYOR, ancak toplamda çıkıyor; bu yüzden buraya bir
   toplam denetimi olarak eklendi.

   Düzeltme `skills/bundled.ts` içindeki `withShuffledOptions`. Buradaki iş
   onun ÇALIŞMAYA DEVAM ETTİĞİNİ doğrulamak: dağılım tekdüzeden (≈%33) uzağa
   kaçarsa ya karıştırma devre dışı kalmıştır ya yeni içerik onu atlıyordur.

   Modül sınavı kâğıtları ayrıca denetlenir; onların şık yanlılığı ZARARSIZ
   (exam.ts kâğıdı kurarken kullanıcı+hafta tohumuyla kendi karıştırmasını
   yapar), o yüzden yalnız bilgi olarak basılır.
*/
const SIKSIZ_TUR = new Set(["gapfill", "short_answer", "dictation", "order"]);
const YANLILIK_ESIK = 45;
{
  const perLevel = new Map<string, number[]>();
  for (const ex of BUNDLED_EXERCISES as SkillExercise[]) {
    for (const q of ((ex as { questions?: { kind?: string; options?: string[]; answer?: number }[] }).questions ?? [])) {
      if (SIKSIZ_TUR.has(q.kind ?? "mcq") || !q.options || q.options.length < 3) continue;
      const d = perLevel.get(ex.level) ?? [];
      d[q.answer ?? 0] = (d[q.answer ?? 0] ?? 0) + 1;
      perLevel.set(ex.level, d);
    }
  }
  console.log("\nŞIK KONUMU (üç ve daha çok şıklı; tekdüze ≈ %33)");
  for (const lv of [...perLevel.keys()].sort()) {
    const d = perLevel.get(lv)!;
    const t = d.reduce((a, n) => a + (n ?? 0), 0);
    const pay = d.map((n) => ((n ?? 0) / t) * 100);
    const enYuksek = Math.max(...pay);
    console.log(`  ${lv}: ${String(t).padStart(4)} soru · ` + pay.map((x, i) => `idx${i} %${x.toFixed(0)}`).join(" · "));
    if (enYuksek > YANLILIK_ESIK)
      E(`[skills] ${lv}`, `şık konumu yanlı: %${enYuksek.toFixed(0)} tek konumda (tekdüze ≈ %33) — bundled.ts withShuffledOptions çalışmıyor olabilir`);
  }

  const kagitDag: number[] = [];
  let kagitT = 0;
  for (const lv of ["A1", "A2", "B1", "B2", "C1"]) {
    for (let m = 0; m < 10; m++) {
      const plan = moduleExamPlan(lv, m) as {
        code: string;
        reading?: { questions: { de: string; tr: string; options: string[]; answer: number }[] };
        listening?: { questions: { de: string; tr: string; options: string[]; answer: number }[] };
        canDo?: unknown[]; speaking?: unknown[]; writing?: { sample?: string };
      } | undefined;
      if (!plan) continue;
      const sorular = [
        ...(plan.reading?.questions ?? []).map((q) => ["Lesen", q] as const),
        ...(plan.listening?.questions ?? []).map((q) => ["Hören", q] as const),
      ];
      for (const [bol, q] of sorular) {
        const yer = `[exam] ${plan.code} ${bol}`;
        if (!q.de || !q.tr) E(yer, "soru metni ya da çevirisi eksik");
        if (!q.options?.length) { E(yer, "şık yok"); continue; }
        // Aynı şık iki kez basılırsa iki doğru cevap olur ve soru kendini ele verir.
        if (new Set(q.options).size !== q.options.length) E(yer, `aynı şık iki kez: ${q.options.join(" / ")}`);
        if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.options.length)
          E(yer, `cevap indeksi aralık dışı (${q.answer})`);
        else { kagitDag[q.answer] = (kagitDag[q.answer] ?? 0) + 1; kagitT++; }
      }
      if (!plan.canDo?.length) E(`[exam] ${plan.code}`, "yapabilirlik listesi boş");
      if (!plan.speaking?.length) E(`[exam] ${plan.code}`, "konuşma bölümü boş");
      if (!plan.writing?.sample) E(`[exam] ${plan.code}`, "yazma örneği yok");
    }
  }
  if (kagitT)
    console.log(`  modül sınavı kâğıtları: ${kagitT} soru · ` +
      kagitDag.map((n, i) => `idx${i} %${(((n ?? 0) / kagitT) * 100).toFixed(0)}`).join(" · ") +
      "  (exam.ts kendi karıştırmasını yapıyor, zararsız)");
}

/** Uyarı etiketi: tür + mesajın sayısız hâli ("dinleme bölümü N kelime"). */
const tagOf = (w: string) => w.replace(/^\[(\w+)\].*? — ([^:"„]+).*$/s, "$1: $2").replace(/\d+/g, "N").trim();
const byTag = new Map<string, number>();
for (const w of warnings) byTag.set(tagOf(w), (byTag.get(tagOf(w)) ?? 0) + 1);
if (warnings.length) {
  console.log(`\nUYARI (${warnings.length})`);
  for (const [tag, n] of [...byTag.entries()].sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(4)}  ${tag}`);
  if (args.includes("--verbose")) for (const w of warnings) console.log(`  · ${w}`);
}

/*
  Uyarı bütçesi ETİKET başına: toplam sayı tek başına "en yok" borcunu
  azaltırken başka bir yerde "kopuk sözlükçe" borcu almaya izin verirdi.
  Etiket başına tavan: hiçbir kategori büyüyemez, yeni kategori açılamaz.
*/
let baseline: Record<string, number> = {};
if (existsSync(BASELINE)) baseline = JSON.parse(readFileSync(BASELINE, "utf8")) as Record<string, number>;
if (writeBaseline) {
  if (!only) baseline = {};
  for (const [tag, n] of byTag) baseline[tag] = n;
  writeFileSync(BASELINE, JSON.stringify(Object.fromEntries(Object.entries(baseline).sort()), null, 2) + "\n");
  console.log(`\nbaseline yazıldı: ${byTag.size} etiket, ${warnings.length} uyarı.`);
}
const over: string[] = [];
if (Object.keys(baseline).length) {
  for (const [tag, n] of byTag) {
    const cap = baseline[tag] ?? 0;
    if (n > cap) over.push(`${tag}: ${n} > ${cap}`);
  }
}
if (over.length) {
  console.log("\n✗ Uyarı bütçesi aşıldı (yeni içerik borcu). Düzelt ya da bilinçli kabul için --baseline:");
  for (const o of over) console.log(`  · ${o}`);
}
const failed = errors.length > 0 || over.length > 0;
console.log(failed ? "\nİÇERİK DOĞRULAMASI BAŞARISIZ" : `\nİÇERİK DOĞRULAMASI GEÇTİ (${warnings.length} uyarı, bütçe içinde)`);
process.exit(failed ? 1 : 0);
