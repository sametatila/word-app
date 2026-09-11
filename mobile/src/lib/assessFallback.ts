import { t } from "./i18n";

/**
 * KURAL TABANLI ASGARİ DEĞERLENDİRME — sağlayıcı yokken.
 *
 * Web `lib/assess-client` `fallbackAssessment` ile aynı kurallar, aynı
 * puanlama, aynı metinler. Mobilde hiç yoktu: yapay zekâ kapalıyken web
 * kullanıcısı ölçüt listesiyle birlikte bir puan görüyor, Android kullanıcısı
 * hiçbir şey göremiyordu — aynı turda iki farklı ürün.
 *
 * Dürüst olmak gerekir: bu dilbilgisini ölçmez, ölçemez. Ölçebildiği şey
 * görevin biçimsel kısmı: uzunluk, hedef kalıpların geçip geçmediği, cümle
 * başı büyük harf ve nokta, Almanca yazıldığı (Türkçe harf yoksa).
 * Dilbilgisi/kelime puanı bu yüzden nötr 2 kalıyor ve sonuç HİÇBİR ZAMAN
 * gerçek değerlendirme gibi sunulmuyor (`offline: true`).
 */
export type AssessKind = "sentence" | "writing" | "speaking" | "roleplay";

export type FallbackCheck = {
  kind: "min_words" | "target" | "capital" | "punctuation" | "target_lang";
  key: string;
  vars?: Record<string, string | number>;
  ok: boolean;
};

export type FallbackRequest = {
  kind: AssessKind;
  task: { targets?: string[]; target?: string; constraints?: string[] };
  answer: { text: string };
};

export type FallbackResult = {
  offline: true;
  checks: FallbackCheck[];
  words: number;
  score: { task: number; grammar: number; vocab: number; structure: number; overall: number };
  errors: never[];
  corrected: string;
  praise_tr: string;
  next_tip_tr: string;
};

const MIN_WORDS: Record<AssessKind, number> = {
  sentence: 3,
  writing: 30,
  speaking: 3,
  roleplay: 6,
};

/** Web `overallScore` ile AYNI ağırlıklar: iki platform aynı metne aynı puanı vermeli. */
export function overallScore(s: { task: number; grammar: number; vocab: number; structure: number }): number {
  const w = s.task * 0.35 + s.grammar * 0.3 + s.vocab * 0.15 + s.structure * 0.2;
  return Math.max(0, Math.min(100, Math.round((w / 4) * 100)));
}

function fold(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** "en az 40 kelime" gibi bir kısıttan sayıyı çeker. */
function minWordsFrom(constraints: string[] | undefined): number | null {
  for (const c of constraints ?? []) {
    const m = c.match(/en az\s+(\d+)\s+kelime|mindestens\s+(\d+)\s+w[oö]rter/i);
    if (m) return Number(m[1] ?? m[2]);
  }
  return null;
}

export function fallbackAssessment(req: FallbackRequest): FallbackResult {
  const text = req.answer.text.trim();
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
  const folded = ` ${fold(text)} `;
  const checks: FallbackCheck[] = [];

  const minWords = minWordsFrom(req.task.constraints) ?? MIN_WORDS[req.kind];
  checks.push({ kind: "min_words", key: "assess.min_words", vars: { min: minWords, n: words }, ok: words >= minWords });

  const targets = req.task.targets ?? (req.task.target ? [req.task.target] : []);
  let hit = 0;
  for (const target of targets) {
    // Kalıbın ilk anlamlı kelimesi yeter: "Ich hätte gern" için "haette" ya da "gern".
    const stems = fold(target)
      .split(" ")
      .filter((w) => w.length >= 3);
    const ok = stems.length ? stems.some((w) => folded.includes(` ${w} `) || folded.includes(` ${w}`)) : false;
    if (ok) hit++;
    checks.push({ kind: "target", key: "assess.target", vars: { pattern: target }, ok });
  }

  if (req.kind === "writing" || req.kind === "sentence") {
    checks.push({ kind: "capital", key: "assess.capital", ok: /^[A-ZÄÖÜ]/.test(text) });
    checks.push({ kind: "punctuation", key: "assess.punctuation", ok: /[.!?]$/.test(text) });
  }
  const turkishChars = /[çğışİ]/.test(text);
  checks.push({ kind: "target_lang", key: "assess.target_lang", ok: !turkishChars });

  const passed = checks.filter((c) => c.ok).length;
  const ratio = checks.length ? passed / checks.length : 0;
  const task = Math.round(ratio * 4);
  const structure = targets.length ? Math.round((hit / targets.length) * 4) : task;
  // Dilbilgisi ve kelime ölçülemiyor: nötr 2 — genel puanı ne şişirir ne batırır.
  const score = { task, grammar: 2, vocab: 2, structure };

  const missing = targets.filter((_, i) => !checks[1 + i]?.ok);
  return {
    offline: true,
    checks,
    words,
    score: { ...score, overall: overallScore(score) },
    errors: [],
    corrected: text,
    praise_tr: words >= minWords ? t("assessfb.length_ok") : words > 0 ? t("assessfb.length_short") : "",
    next_tip_tr: missing.length
      ? t("assessfb.try_phrase", { phrase: missing[0] })
      : turkishChars
        ? t("assessfb.turkish_chars")
        : t("assessfb.retry_when_ai"),
  };
}
