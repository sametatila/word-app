/**
 * "Neden" — yanlış cevabın tek cümlelik gerekçesi.
 *
 * Web `src/lib/why.ts`in mobil karşılığı ve GÖVDESİ ONUNLA AYNI. Önceki hâli
 * yirmi dokuz satırlık bir sadeleştirmeydi ("tam gramer tabloları taşınmadı")
 * ve bedeli ölçülebilirdi: web yanlış cevapta kuralı söylüyordu ("-ung ile
 * bitenler dişil", "yan cümlede fiil sona gider", "Kirche ch, Kirsche sch"),
 * Android ise yalnız doğru cevabı tekrar ediyordu. Aynı hatayı yapan iki
 * kullanıcıdan biri kuralı öğreniyor, öteki kelimeyi ezberliyordu.
 *
 * İki fark kaldı, ikisi de dilin kendisinden:
 *   - Web `translate(lang, ...)` ile çağrılıyor (sunucuda da çalışıyor);
 *     mobilde `tx()` zaten geçerli dili biliyor.
 *   - `href` alanı webde dilbilgisi sayfasına bağ olacaktı; iki tarafta da
 *     bugün hep `null` - alan gövdeler ayrışmasın diye duruyor.
 */
import { t as tx, currentLang } from "../lib/i18n";
import { ERROR_LABEL_KEYS, type ErrorType } from "../lib/errors";
import { parsePluralRule, pluralOf, umlautStem } from "../lib/german";
import { ruleFor } from "./whyRules";
import { confusableHint } from "../lib/confusables";

/** Açıklamanın anadildeki karşılığı - web `lib/option-label` `glossFor`. */
function gloss(w: WhyWord): string {
  const lang = currentLang();
  if (lang === "en") return w.en || w.tr;
  if (lang === "de") return w.deGloss || w.tr;
  return w.tr;
}

/** Büyük harfe çevirirken kullanılan yerel ayar - web `lib/i18n/dict` `localeOf`. */
function uiLocale(): string {
  const lang = currentLang();
  return lang === "tr" ? "tr-TR" : lang === "de" ? "de-DE" : "en-US";
}

export type Why = {
  type: ErrorType;
  /** Türkçe, tek cümle. */
  text: string;
  /** Dilbilgisi sayfasındaki ilgili tablo; yoksa null (anlam/dinleme). */
  href: string | null;
  /** Yazım hatasında harf düzeyinde fark; diğer tiplerde yok. */
  diff?: { typed: DiffSeg[]; target: DiffSeg[] };
};

export type DiffSeg = { text: string; kind: "same" | "missing" | "extra" };

export type WhyWord = {
  de: string;
  artikel: string | null;
  tr: string;
  /**
   * Açıklamada kullanılan anlam ANADİLDE seçiliyor (`glossFor`), o yüzden
   * İngilizce ve Almanca karşılıklar da tipin parçası. İsteğe bağlılar: çağıran
   * yerlerin bir kısmı yalnız Türkçe taşıyan eski yapılarla çalışıyor ve orada
   * Türkçe oynayan kullanıcı için sonuç değişmiyor.
   */
  en?: string | null;
  deGloss?: string | null;
  formen?: string | null;
  typ?: string;
};

/* ───────────────────────────── artikel ───────────────────────────── */

type ArticleRule = {
  test: (de: string) => boolean;
  artikel: "der" | "die" | "das";
  /** Kuralın SÖZLÜK ANAHTARI — metin gösterildiği yerde çevriliyor. */
  rule: string;
  /** Kuralın güveni: "hep" = istisnası yok denecek kadar az; "genelde" = çoğunluk. */
  strength: "hep" | "genelde";
};

const endsWith = (...suffixes: string[]) => (de: string) => {
  const w = de.toLocaleLowerCase("de-DE");
  return suffixes.some((s) => w.endsWith(s) && w.length > s.length + 1);
};

/**
 * Sondan başa kontrol edilir; ilk uyan kazanır. Sıra önemli: "-in" kuralı
 * "-ein" ya da "-ion"dan önce uymamalı, "-ei" kuralı "-erei"yi kapsar.
 * Kurallar ders kitaplarının verdiği güvenli listedir; tartışmalı olanlar
 * (-nis, -e) "genelde" işaretli.
 */
const ARTICLE_RULES: ArticleRule[] = [
  { test: endsWith("chen", "lein"), artikel: "das", rule: "artrule.chen", strength: "hep" },
  { test: endsWith("ung", "heit", "keit", "schaft", "tät", "tion", "sion", "enz", "anz", "ie", "ik", "ur"), artikel: "die", rule: "artrule.ung", strength: "hep" },
  { test: endsWith("ismus"), artikel: "der", rule: "artrule.ismus", strength: "hep" },
  { test: endsWith("ling"), artikel: "der", rule: "artrule.ling", strength: "hep" },
  { test: endsWith("ment", "um", "tum"), artikel: "das", rule: "artrule.ment", strength: "genelde" },
  { test: endsWith("erei", "ei"), artikel: "die", rule: "artrule.ei", strength: "genelde" },
  { test: endsWith("in"), artikel: "die", rule: "artrule.in", strength: "genelde" },
  { test: endsWith("or", "ist", "ant", "ent", "ier", "eur"), artikel: "der", rule: "artrule.or", strength: "genelde" },
  { test: (de) => /^ge[a-zäöüß]+e$/i.test(de), artikel: "das", rule: "artrule.ge", strength: "genelde" },
  { test: endsWith("ma", "o"), artikel: "das", rule: "artrule.ma", strength: "genelde" },
  { test: endsWith("e"), artikel: "die", rule: "artrule.e", strength: "genelde" },
  { test: endsWith("er", "el"), artikel: "der", rule: "artrule.er", strength: "genelde" },
];

export function articleRule(de: string): ArticleRule | null {
  return ARTICLE_RULES.find((r) => r.test(de)) ?? null;
}

function whyArticle(word: WhyWord, picked?: string | null): Why {
  const href = null;
  const target = word.artikel ?? "";
  const rule = articleRule(word.de);
  const chosen = picked && picked !== target ? tx("why.not_but", { picked, target }) : "";
  if (!target) return { type: "article", text: tx("why.no_article_data"), href };
  if (rule && rule.artikel === target) {
    return {
      type: "article",
      text: `${chosen}${tx(rule.rule)} — ${target} ${word.de}.`,
      href,
    };
  }
  if (rule && rule.artikel !== target) {
    return {
      type: "article",
      text:
        chosen +
        tx("why.article_exception", { rule: tx(rule.rule), word: word.de, artikel: target }),
      href,
    };
  }
  return {
    type: "article",
    text: chosen + tx("why.article_no_rule", { word: word.de, artikel: target }),
    href,
  };
}

/* ───────────────────────────── çoğul ───────────────────────────── */

const PLURAL_PATTERN: Record<string, string> = {
  "": "plrule.none",
  e: "plrule.e",
  er: "plrule.er",
  en: "plrule.en",
  n: "plrule.n",
  s: "plrule.s",
};

/**
 * Çoğul gerekçesi. Doğru biçim önce turun kendisinden (`correct`) alınır —
 * tur zaten onu biliyor ve gösteriyor; `formen` alanından yeniden türetmek
 * demo/dış veride eksik kalabiliyor ve "Ärzte yerine Arzte" gibi bir
 * gerekçe cevabın kendisiyle çelişirdi. Kalıp (umlaut + ek) doğru biçimle
 * kökün karşılaştırılmasından çıkar; okunamazsa `formen` kuralı, o da yoksa
 * "ezberle".
 */
function whyPlural(word: WhyWord, picked?: string | null, correct?: string | null): Why {
  const href = null;
  const rule = parsePluralRule(word.formen ?? "");
  const plural = correct?.replace(/^die\s+/i, "") || pluralOf(word.de, word.formen ?? null);
  if (!plural) {
    return { type: "plural", text: tx("why.plural_irregular", { word: word.de }), href };
  }
  const umlautedStem = umlautStem(word.de);
  const hasUmlaut = umlautedStem !== word.de && plural.startsWith(umlautedStem);
  const stem = hasUmlaut ? umlautedStem : word.de;
  const suffix = plural.startsWith(stem) ? plural.slice(stem.length) : rule?.suffix ?? null;
  const chosen = picked && picked !== plural ? tx("why.not_but", { picked, target: plural }) : "";
  const forms = `${word.artikel ?? ""} ${word.de} → die ${plural}`.replace(/\s+/g, " ").trim();
  if (suffix === null || !(suffix in PLURAL_PATTERN)) {
    return {
      type: "plural",
      text: chosen + tx("why.plural_no_pattern", { word: word.de, forms }),
      href,
    };
  }
  const umlaut = hasUmlaut ? tx("why.umlaut_prefix") : "";
  return {
    type: "plural",
    text:
      chosen +
      tx("why.plural_pattern", {
        pattern: umlaut + tx(PLURAL_PATTERN[suffix]),
        forms,
      }),
    href,
  };
}

/* ───────────────────────────── yazım ───────────────────────────── */

/** Harf düzeyinde fark — en uzun ortak alt dizi üzerinden. Kısa kelimeler için yeterli. */
export function charDiff(typed: string, target: string): { typed: DiffSeg[]; target: DiffSeg[] } {
  const a = [...typed];
  const b = [...target];
  const n = a.length;
  const m = b.length;
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      dp[i][j] = a[i].toLocaleLowerCase("de-DE") === b[j].toLocaleLowerCase("de-DE") ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const t: DiffSeg[] = [];
  const g: DiffSeg[] = [];
  const push = (arr: DiffSeg[], ch: string, kind: DiffSeg["kind"]) => {
    const last = arr[arr.length - 1];
    if (last && last.kind === kind) last.text += ch;
    else arr.push({ text: ch, kind });
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i].toLocaleLowerCase("de-DE") === b[j].toLocaleLowerCase("de-DE")) {
      push(t, a[i], "same");
      push(g, b[j], "same");
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      push(t, a[i], "extra");
      i++;
    } else {
      push(g, b[j], "missing");
      j++;
    }
  }
  while (i < n) push(t, a[i++], "extra");
  while (j < m) push(g, b[j++], "missing");
  return { typed: t, target: g };
}

/** Türkçe konuşanın en sık karıştırdığı ses–harf eşleşmeleri; farkta geçen harfe göre seçilir. */
const SPELLING_HINTS: [RegExp, string][] = [
  [/[zZ]/, "sphint.z"],
  [/[vV]/, "sphint.v"],
  [/ie|ei/, "sphint.ie"],
  [/sch|ch/, "sphint.sch"],
  [/ß/, "sphint.ss"],
  [/[äöü]/, "sphint.umlaut"],
  [/[A-ZÄÖÜ]/, "sphint.caps"],
  [/h/, "sphint.h"],
];

function whySpelling(word: WhyWord, typed?: string | null): Why {
  const target = word.de;
  const diff = charDiff(typed ?? "", target);
  const changed = [...diff.typed.filter((s) => s.kind !== "same"), ...diff.target.filter((s) => s.kind !== "same")]
    .map((s) => s.text)
    .join("");
  const hint = SPELLING_HINTS.find(([re]) => re.test(changed))?.[1];
  // Fark şeritte harf harf çiziliyor (FeedbackLine); metin yalnız ipucu.
  const text = tx(hint ?? "sphint.compare");
  return { type: "spelling", text, href: null, diff: typed ? diff : undefined };
}

/* ───────────────────────────── cümle ───────────────────────────── */

const W_WORDS = /^(wer|was|wo|wann|wie|warum|wohin|woher|welche[rs]?|wieso|weshalb|wem|wen|wessen)$/i;
const SUBORDINATORS = /\b(weil|dass|wenn|ob|obwohl|damit|während|bevor|nachdem|als|sobald|falls)\b/i;

function whyVerbPosition(answer?: string[] | null, tail?: string | null): Why {
  // Bağlantı kural parçacığından (WP-73): "weil" geçen cümle a2-nebensatz'a,
  // soru a1-wfragen'e gider — hata tipinin genel tablosundan daha isabetli.
  const href = null;
  const sentence = (answer ?? []).join(" ");
  const first = answer?.[0]?.replace(/[^a-zäöüß]/gi, "") ?? "";
  if (SUBORDINATORS.test(sentence)) {
    const m = sentence.match(SUBORDINATORS);
    return { type: "verb_position", text: tx("why.vpos_sub", { word: m?.[1] ?? "" }), href };
  }
  if (tail?.trim() === "?" && !W_WORDS.test(first)) {
    return { type: "verb_position", text: tx("why.vpos_yesno"), href };
  }
  if (tail?.trim() === "?") {
    return { type: "verb_position", text: tx("why.vpos_wfrage"), href };
  }
  if (answer && answer.length > 1 && !/^(ich|du|er|sie|es|wir|ihr|man)$/i.test(first)) {
    return { type: "verb_position", text: tx("why.vpos_inversion", { word: answer[0] }), href };
  }
  return { type: "verb_position", text: tx("whyrule.vpos.general"), href };
}

/**
 * Kural parçacığından gerekçe (WP-73): bağlamda geçen ipucuna göre seçilen
 * kural + Almanca örnek; tabloya kuralın kendi bağlantısıyla gider.
 */
function whyFromRule(type: ErrorType, context: string): Why {
  const rule = ruleFor(type, context);
  if (!rule) return { type, text: tx(ERROR_LABEL_KEYS[type]), href: null };
  const why = tx(rule.why);
  const text = `${why.charAt(0).toLocaleUpperCase(uiLocale())}${why.slice(1)}: ${rule.example}`;
  return { type, text, href: null };
}

/** Kural seçimi için bağlam: doğru cümle + yazılan + kelime. */
function contextOf(input: WhyInput): string {
  return [(input.answer ?? []).join(" ") + (input.tail ?? ""), input.correct ?? "", input.detail ?? "", input.word?.de ?? ""].filter(Boolean).join(" ");
}

/* ───────────────────────────── giriş ───────────────────────────── */

export type WhyInput = {
  type: ErrorType;
  word?: WhyWord | null;
  /** Seçilen şık / yazılan kelime. */
  detail?: string | null;
  /** Doğru cevap metni (çoğul oyunu: doğru çoğul biçim). */
  correct?: string | null;
  /** Cümle oyunları: doğru sıra ve sondaki noktalama. */
  answer?: string[] | null;
  tail?: string | null;
};

/**
 * Hata tipi ve eldeki veriden gerekçe. Her tip için bir cümle döner — boş
 * dönmez; kural bilinmiyorsa "ezberle" der, çünkü sessiz kalmak da bir mesaj
 * verir ("bunun açıklaması yok") ve o mesaj yanlış.
 */
export function whyFor(input: WhyInput): Why {
  const w = input.word ?? null;
  const withArt = (word: WhyWord) => `${word.artikel ? `${word.artikel} ` : ""}${word.de}`;
  switch (input.type) {
    case "article":
      return w
        ? whyArticle(w, input.detail)
        : { type: "article", text: tx("whyrule.article.general"), href: null };
    case "plural":
      return w
        ? whyPlural(w, input.detail, input.correct)
        : { type: "plural", text: tx("why.plural_learn"), href: null };
    case "spelling":
      return w
        ? whySpelling(w, input.detail)
        : { type: "spelling", text: tx("sphint.compare"), href: null };
    case "verb_position":
      return whyVerbPosition(input.answer, input.tail);
    case "word_order":
    case "case":
    case "conjugation":
      return whyFromRule(input.type, contextOf(input));
    case "meaning": {
      /*
        Karıştırma çifti (WP-73): seçilen karşılık bilinen bir çiftin öbür
        yarısıysa ayrım cümlesi. Çiftler ve ayrım cümleleri TÜRKÇE KONUŞANA
        göre seçilmiş (bkz. lib/confusables) — hem seçim hem cümle Türkçeye
        bağlı. Başka bir arayüz dilinde çevrilmemiş bir cümle göstermektense
        genel açıklamaya düşülüyor; çiftlerin o diller için yeniden seçilmesi
        ayrı bir içerik işi.
      */
      const pair = currentLang() === "tr" && w ? confusableHint(w.de, input.detail) : null;
      if (pair) return { type: "meaning", text: `${pair.hint} (${pair.example})`, href: null };
      return {
        type: "meaning",
        text: w
          ? input.detail
            ? tx("why.meaning_wrong_pick", { picked: input.detail, word: withArt(w), meaning: gloss(w) })
            : `${withArt(w)} = ${gloss(w)}.`
          : tx("whyrule.meaning.general"),
        href: null,
      };
    }
    case "listening":
      return {
        type: "listening",
        text: w
          ? tx(input.detail ? "why.listening_with_pick" : "why.listening", {
              word: withArt(w),
              // Açıklama da anadilde: "Auto = araba" mı "Auto = car" mı.
              meaning: gloss(w),
              picked: input.detail ?? "",
            })
          : tx("whyrule.listening.general"),
        href: null,
      };
    case "pronunciation":
      return {
        type: "pronunciation",
        text: w
          ? tx("why.pronunciation", { word: w.de })
          : tx("why.pronunciation_general"),
        href: null,
      };
  }
}

/** Şeritteki etiket metni. */
export function whyLabel(type: ErrorType): string {
  return tx(ERROR_LABEL_KEYS[type]);
}
