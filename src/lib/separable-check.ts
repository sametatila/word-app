import type { NativeLang } from "@/lib/courses";
import { overallScore, type AssessRequest, type Assessment, type AssessError } from "@/lib/assess-prompts";
import VERBS from "@/lib/separable-verbs.generated.json";

/**
 * Ayrılabilir fiilin EKSİK ÖNEKİ — rubrik değerlendirmesinin kod tarafı (QA F-0072).
 *
 * Puanlı konuşmada (Ü15 "Ich habe mich verlaufen") öğrenci "… und biege an der
 * Ampel rechts." yazdı: "abbiegen"in "ab"ı yok. Adımın hedef kalıbı tam bu
 * yapıyı öğretiyor ("Biegen Sie an der Ampel rechts ab."), alıştırma sohbeti aynı
 * cümleyi reddetmişti, ama rubrik hata bulmadı (Dil bilgisi 4/4, %100). Model
 * eksik öneki "yok olan bir kelime" olarak göremiyor: cümle kendi içinde
 * okunaklı, işaretleyeceği yanlış bir sözcük yok.
 *
 * İki katman, ikisi de YALNIZ görevin hedef kalıplarından (`targets`, `target`)
 * çıkan fiillerle çalışıyor; kalıpta olmayan fiile dokunulmuyor, çünkü öneksiz
 * gövdenin çoğu kendi başına doğru ("Ich stehe an der Haltestelle",
 * "Ich steige in den Zug"):
 *
 * 1. NOT (`separableNotes`): kalıptaki fiilin gövdesi öneksiz geçiyor VE
 *    ardından kalıbın orta öğelerinden (zamir/artikel/edat dışı) en az biri geliyorsa
 *    istem modele bunu söylüyor ve kararı ona bırakıyor (öneksiz anlam doğruysa
 *    hata yazmasın: "Ich biege rechts in die Goethestraße").
 * 2. ZORLAMA (`enforceSeparable`): cümle üstelik kalıbın önekten önceki
 *    öğesinde BİTİYORSA ("biege an der Ampel rechts" ↔ "Biegen Sie an der
 *    Ampel rechts ab") öneksiz okumanın doğru olma ihtimali kalmıyor; model yine
 *    yazmadıysa hata kodla ekleniyor ve dil bilgisi 4'ten 3'e iniyor. "…"lı
 *    kalıpta ("Ich stehe um … auf") son öğe serbest, kalıbın sabit öğesi ("um")
 *    yetiyor.
 *
 * Ölçüm (2026-10-09): 580 Almanca konuşmanın bütün metinleri (111 bin dize) kendi
 * kalıplarıyla tarandı; tek zorlama, içeriğin BİLEREK yanlış verdiği doğru-yanlış
 * cümlesi ("Die Arbeit fängt um neun."), not hiç yok.
 */

type Verb = { inf: string; prefix: string; forms: Set<string> };
type Pair = Verb & { pattern: string; middle: string[]; content: Set<string>; preps: Set<string>; wild: boolean };

export type SeparableMiss = {
  /** Cevabın kaçıncı satırı (1 tabanlı) — sohbette her satır bir tur. */
  line: number;
  /** Öğrencinin yazdığı gövde, metindeki biçimiyle ("biege"). */
  verb: string;
  inf: string;
  prefix: string;
  pattern: string;
  /** Gövdeden parçanın sonuna, metinden birebir. */
  wrong: string;
  start: number;
  end: number;
  /** Cümle kalıbın çerçevesini taşıyor: hata kodla eklenir. */
  strong: boolean;
};

/** Önekin edat olarak da durabildiği durumlar: önek ancak SONDA durunca "var" sayılır. */
const PREPOSITION_LIKE = new Set(["an", "auf", "aus", "bei", "mit", "nach", "vor", "zu", "um"]);
/**
 * Edatlar çerçeve sayılmıyor: "Ich steige in Hannover um." kalıbında "Und dann
 * steige ich in den Zug" doğru, ortak olan yalnız "in". Canlı ölçümde (2026-10-09)
 * bu ortaklıkla düşülen not modeli doğru cümleye hata yazdırdı. Yalnız "…"lı ve
 * başka çerçevesi olmayan kalıpta ("Die Arbeit fängt um … an") edat yetiyor.
 */
const PREPOSITIONS = new Set([
  ...PREPOSITION_LIKE, "in", "im", "ins", "am", "zum", "zur", "von", "vom", "für", "über", "unter", "durch", "bis",
  "gegen", "ohne", "hinter", "neben", "zwischen", "beim",
]);
/** Önekten sonra gelebilen dolgu sözcükleri ("Ruf mich an bitte"). */
const TRAILING_FILLERS = new Set(["bitte", "mal", "doch", "gern", "gerne", "jetzt"]);
/**
 * Kalıbın çerçevesini kuran sözcüklerden sayılmayanlar: zamir, artikel, dolgu.
 * "Stell die Blumen bitte dort hin." kalıbında "Wohin stelle ich die?" doğru bir
 * cümle; "die" ortak diye çerçeve sayılsaydı öneki zorlardı (içerik taramasında
 * görüldü, 2026-10-09).
 */
const FUNCTION_WORDS = new Set([
  "ich", "du", "er", "sie", "es", "wir", "ihr", "mich", "dich", "mir", "dir", "uns", "euch", "ihn", "ihm", "ihnen", "sich",
  "der", "die", "das", "den", "dem", "des", "ein", "eine", "einen", "einem", "einer", "eines",
  ...TRAILING_FILLERS,
]);
const CONJUNCTIONS = new Set(["und", "aber", "oder", "denn", "sondern"]);
/** Yardımcı fiillerin gövdesi her cümlede geçer; "vorhaben" ya da "dabeisein" için not düşmek gürültü olur. */
const SKIP_BASES = new Set(["haben", "sein", "werden"]);

function fold(w: string): string {
  return w.toLocaleLowerCase("de-DE").replace(/ß/g, "ss");
}

function stemOf(base: string): string {
  if (/[^e](el|er)n$/.test(base)) return base.slice(0, -1); // wandern → wander
  if (base.endsWith("en")) return base.slice(0, -2);
  return base.endsWith("n") ? base.slice(0, -1) : base; // tun → tu
}

/** Gövdenin şimdiki zaman ve emir biçimleri; 3. tekil sözlükten geliyor (nimmt, fährt, gibt). */
function formsOf(base: string, third: string): Set<string> {
  const s = stemOf(base);
  const t = third.endsWith("t") ? third.slice(0, -1) : third;
  return new Set([base, s, `${s}e`, `${s}st`, `${s}est`, `${s}t`, `${s}et`, third, `${t}st`, `${third}st`, t].map(fold).filter((f) => f.length >= 2));
}

const BY_PREFIX = new Map<string, Verb[]>();
const PREFIX_SET = new Set((VERBS as [string, string, string][]).map((v) => v[1]));
for (const [inf, prefix, third] of VERBS as [string, string, string][]) {
  const base = inf.slice(prefix.length);
  if (SKIP_BASES.has(base)) continue;
  const list = BY_PREFIX.get(prefix) ?? [];
  list.push({ inf, prefix, forms: formsOf(base, third) });
  BY_PREFIX.set(prefix, list);
}

type Tok = { w: string; raw: string; start: number; end: number };

function tokens(s: string, offset = 0): Tok[] {
  const out: Tok[] = [];
  for (const m of s.matchAll(/…|\.{3}|[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*/gu)) {
    const raw = m[0] === "..." ? "…" : m[0];
    out.push({ w: fold(raw), raw, start: offset + (m.index ?? 0), end: offset + (m.index ?? 0) + m[0].length });
  }
  return out;
}

/** Kalıplardan (önek sonda) fiil çiftleri: "Biegen Sie an der Ampel rechts ab." → abbiegen, orta öğeler [sie, an, der, ampel, rechts]. */
function pairsFrom(patterns: string[]): Pair[] {
  const out: Pair[] = [];
  for (const pattern of patterns) {
    const toks = tokens(pattern);
    const last = toks[toks.length - 1];
    // Önek küçük harfle yazılır: "Wer kommt zum Fest?" bir önek değil.
    if (!last || last.raw !== last.raw.toLowerCase()) continue;
    const verbs = BY_PREFIX.get(last.w);
    if (!verbs) continue;
    for (let i = 0; i < toks.length - 1; i++) {
      const v = verbs.find((x) => x.forms.has(toks[i].w));
      if (!v) continue;
      const middle = toks.slice(i + 1, -1).map((t) => t.w);
      const content = new Set(middle.filter((w) => w !== "…" && !FUNCTION_WORDS.has(w) && !PREPOSITIONS.has(w)));
      const preps = new Set(middle.filter((w) => PREPOSITIONS.has(w)));
      out.push({ ...v, pattern, middle, content, preps, wild: middle.includes("…") });
      break;
    }
  }
  return out;
}

/** Cevabı tümcelere böler: satır, noktalama ve sıralama bağlacı ("…Straße und biege …"). */
function segments(text: string): { line: number; toks: Tok[] }[] {
  const out: { line: number; toks: Tok[] }[] = [];
  let lineStart = 0;
  text.split("\n").forEach((lineText, li) => {
    for (const m of lineText.matchAll(/[^.!?;:,]+/g)) {
      let cur: Tok[] = [];
      for (const t of tokens(m[0], lineStart + (m.index ?? 0))) {
        if (CONJUNCTIONS.has(t.w)) {
          if (cur.length) out.push({ line: li + 1, toks: cur });
          cur = [];
        } else cur.push(t);
      }
      if (cur.length) out.push({ line: li + 1, toks: cur });
    }
    lineStart += lineText.length + 1;
  });
  return out;
}

export function targetsOf(req: Pick<AssessRequest, "task" | "lang">): string[] {
  if ((req.lang ?? "de") !== "de") return [];
  return [...(req.task.targets ?? []), ...(req.task.target ? [req.task.target] : [])];
}

/** Kalıptaki ayrılabilir fiilin öneksiz geçtiği yerler. Almanca dışında ve kalıpsız görevde boş. */
export function findSeparableMisses(text: string, req: Pick<AssessRequest, "task" | "lang">): SeparableMiss[] {
  const pairs = pairsFrom(targetsOf(req));
  if (!pairs.length) return [];
  const out: SeparableMiss[] = [];
  for (const seg of segments(text)) {
    for (const p of pairs) {
      const at = seg.toks.findIndex((t) => p.forms.has(t.w));
      if (at < 0) continue;
      const after = seg.toks.slice(at + 1);
      // Gövde sonda (yan cümle ya da yarım tümce): önek orada bitişik yazılır, buraya dokunma.
      if (!after.length) continue;
      // Bitişik biçim: abbiegen, abgebogen, abzubiegen.
      if (seg.toks.some((t) => t.w !== p.prefix && t.w.startsWith(p.prefix) && t.w.length >= p.prefix.length + 4 && /(en|n|t)$/.test(t.w))) continue;
      let end = after.length;
      while (end > 0 && TRAILING_FILLERS.has(after[end - 1].w)) end--;
      // Sonda kalıbınki ya da BAŞKA bir önek: "Ich rufe dich später zurück" ("an" kalıbında) doğru.
      if (end > 0 && PREFIX_SET.has(after[end - 1].w)) continue;
      if (!PREPOSITION_LIKE.has(p.prefix) && after.some((t) => t.w === p.prefix)) continue;
      /* Gövdeden sonra kalıbın çerçeve sözcüklerinden hiçbiri yoksa öğrenci
         büyük olasılıkla öneksiz fiili kendi anlamıyla kullanıyor ("Ich gebe dir
         den Zettel", kalıp "Ich gebe es dir zurück"): not bile düşülmüyor, yoksa
         not modeli doğru cümleye hata yazmaya itebilir. */
      const lexical = after.some((t) => p.content.has(t.w));
      // "…"lı, çerçevesi yalnız edat olan kalıp: kısa tümce ve aynı edat ("fängt um neun").
      const prepOnly = !p.content.size && p.wild && after.length <= 3 && after.some((t) => p.preps.has(t.w));
      if (!lexical && !prepOnly) continue;
      const last = after[after.length - 1];
      const strong = prepOnly || p.wild || p.content.has(last.w);
      const first = seg.toks[at];
      out.push({
        line: seg.line,
        verb: first.raw,
        inf: p.inf,
        prefix: p.prefix,
        pattern: p.pattern,
        wrong: text.slice(first.start, last.end),
        start: first.start,
        end: last.end,
        strong,
      });
      break;
    }
  }
  return out;
}

/** İsteme giden not satırları (öğrenci metninin DIŞINDA, görevle birlikte). */
export function separableNotes(misses: SeparableMiss[]): string[] {
  return misses.map(
    (m) =>
      `AYRILABİLİR FİİL DENETİMİ (kod): ${m.line}. satırda „${m.verb}“ var ama „${m.prefix}“ öneki yok; hedef kalıp „${m.pattern}“ ayrılabilir „${m.inf}“ fiilini kullanıyor. Öğrenci burada „${m.inf}“ demek istediyse önek eksiktir ve bu bir verb_position hatasıdır (wrong: „${m.wrong}“, fix: „${m.wrong} ${m.prefix}“). Öneksiz fiil bu cümlede kendi başına doğru bir anlam taşıyorsa hata yazma.`,
  );
}

const WHY: Record<NativeLang, (m: SeparableMiss) => string> = {
  tr: (m) => `„${m.inf}“ ayrılabilir bir fiil: çekimli „${m.verb}“ ikinci sırada durur, „${m.prefix}“ öneki cümlenin sonuna gelir; önek düşerse fiilin anlamı eksik kalır.`,
  en: (m) => `„${m.inf}“ is a separable verb: the conjugated „${m.verb}“ stays in second position and the prefix „${m.prefix}“ goes to the end of the clause; without it the verb is incomplete.`,
  de: (m) => `„${m.inf}“ ist ein trennbares Verb: „${m.verb}“ steht an zweiter Stelle, die Vorsilbe „${m.prefix}“ kommt ans Satzende; ohne sie fehlt ein Teil des Verbs.`,
};

function hasWord(s: string, w: string): boolean {
  return fold(s).split(/[^\p{L}\p{N}]+/u).includes(fold(w));
}

/**
 * Model kalıbın çerçevesindeki eksik öneki yazmadıysa hatayı ekler ve dil
 * bilgisini en çok 3 yapar. Model aynı yeri zaten düzelttiyse (yanlışta gövde,
 * düzeltmede önek) dokunmaz.
 */
export function enforceSeparable(result: Assessment, misses: SeparableMiss[], native: NativeLang = "tr"): Assessment {
  const strong = misses.filter((m) => m.strong);
  if (!strong.length) return result;
  const added: AssessError[] = [];
  let corrected = result.corrected;
  for (const m of strong) {
    const covered = result.errors.some(
      (e) => hasWord(e.wrong, m.verb) && (hasWord(e.fix, m.prefix) || hasWord(e.fix, m.inf) || fold(e.fix).includes(fold(m.inf))),
    );
    if (covered) continue;
    const fix = `${m.wrong} ${m.prefix}`;
    added.push({ span: [m.start, m.end], wrong: m.wrong, type: "verb_position", fix, why_tr: (WHY[native] ?? WHY.tr)(m) });
    if (corrected.includes(m.wrong) && !corrected.includes(fix)) corrected = corrected.replace(m.wrong, fix);
  }
  if (!added.length) return result;
  const grammar = Math.min(result.score.grammar, 3);
  const score = { ...result.score, grammar };
  score.overall = overallScore(score);
  return { ...result, score, errors: [...result.errors, ...added].sort((a, b) => a.span[0] - b.span[0]), corrected };
}
