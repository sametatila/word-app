import { cheatsheetHref, ERROR_LABELS, type ErrorType } from "@/lib/errors";
import { parsePluralRule, pluralOf, umlautStem } from "@/lib/german";
import { ruleFor } from "@/lib/cheatsheet/rules";

/**
 * "Neden" — yanlış cevabın tek cümlelik gerekçesi (plan WP-13).
 *
 * Şerit bugüne kadar "doğrusu: der Tisch" diyordu; bu, cevabı söylüyor ama
 * öğretmiyor. Öğrenci aynı hatayı bir sonraki kelimede yine yapıyor, çünkü
 * kuralı değil o kelimeyi görmüş oluyor. Buradaki işlevler hata tipi ve
 * kelime verisinden KURALI çıkarır: "-ung ile bitenler dişil", "yan cümlede
 * fiil sona gider", "z sesi ts okunur" — ve dilbilgisi sayfasındaki tabloya
 * bağlar.
 *
 * Saf ve istemci-güvenli: veritabanı yok, sunucu yok; oyunlar cevap anında
 * çağırır. Kurallar bilerek KISA ve "genelde"li: Almanca artikel kuralları
 * istisnalı, ve istisnayı kural diye sunmak yanlış öğretir. Bir kural tam
 * uymuyorsa metin bunu söyler ("istisna, kelimeyle birlikte ezberle").
 */

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
  formen?: string | null;
  typ?: string;
};

/* ───────────────────────────── artikel ───────────────────────────── */

type ArticleRule = {
  test: (de: string) => boolean;
  artikel: "der" | "die" | "das";
  /** Kural açıklaması, kısa. */
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
  { test: endsWith("chen", "lein"), artikel: "das", rule: "-chen ve -lein küçültme ekleri her zaman nötr", strength: "hep" },
  { test: endsWith("ung", "heit", "keit", "schaft", "tät", "tion", "sion", "enz", "anz", "ie", "ik", "ur"), artikel: "die", rule: "-ung/-heit/-keit/-schaft/-tät/-tion/-ik/-ur eki her zaman dişil", strength: "hep" },
  { test: endsWith("ismus"), artikel: "der", rule: "-ismus her zaman eril", strength: "hep" },
  { test: endsWith("ling"), artikel: "der", rule: "-ling her zaman eril", strength: "hep" },
  { test: endsWith("ment", "um", "tum"), artikel: "das", rule: "-ment/-um/-tum genelde nötr", strength: "genelde" },
  { test: endsWith("erei", "ei"), artikel: "die", rule: "-ei genelde dişil", strength: "genelde" },
  { test: endsWith("in"), artikel: "die", rule: "-in (kadın meslek/kişi) dişil", strength: "genelde" },
  { test: endsWith("or", "ist", "ant", "ent", "ier", "eur"), artikel: "der", rule: "-or/-ist/-ant/-ent/-eur (kişi) eki eril", strength: "genelde" },
  { test: (de) => /^ge[a-zäöüß]+e$/i.test(de), artikel: "das", rule: "Ge-…-e kalıbı (toplu ad) nötr", strength: "genelde" },
  { test: endsWith("ma", "o"), artikel: "das", rule: "-ma/-o sonu genelde nötr", strength: "genelde" },
  { test: endsWith("e"), artikel: "die", rule: "-e sonu büyük çoğunlukla dişil", strength: "genelde" },
  { test: endsWith("er", "el"), artikel: "der", rule: "-er/-el sonu genelde eril", strength: "genelde" },
];

export function articleRule(de: string): ArticleRule | null {
  return ARTICLE_RULES.find((r) => r.test(de)) ?? null;
}

function whyArticle(word: WhyWord, picked?: string | null): Why {
  const href = cheatsheetHref("article");
  const target = word.artikel ?? "";
  const rule = articleRule(word.de);
  const chosen = picked && picked !== target ? `„${picked}“ değil „${target}“: ` : "";
  if (!target) return { type: "article", text: "Bu kelimenin artikeli veride yok.", href };
  if (rule && rule.artikel === target) {
    return {
      type: "article",
      text: `${chosen}${rule.rule} — ${target} ${word.de}.`,
      href,
    };
  }
  if (rule && rule.artikel !== target) {
    return {
      type: "article",
      text: `${chosen}istisna — ${rule.rule}, ama ${word.de} ${target} alır; kelimeyle ezberle.`,
      href,
    };
  }
  return {
    type: "article",
    text: `${chosen}${word.de} için son ek kuralı yok; artikeli kelimeyle ezberle: ${target} ${word.de}.`,
    href,
  };
}

/* ───────────────────────────── çoğul ───────────────────────────── */

const PLURAL_PATTERN: Record<string, string> = {
  "": "-el/-en/-er ile biten eril ve nötr isimler çoğulda değişmez",
  e: "-e: tek heceli eril isimlerin çoğu (der Tisch → die Tische)",
  er: "-er: kısa nötr isimler, umlaut alabilir (das Kind → die Kinder)",
  en: "-(e)n: dişil isimlerin büyük çoğunluğu (die Frau → die Frauen)",
  n: "-n: -e ile biten dişil isimler (die Blume → die Blumen)",
  s: "-s: yabancı kökenli ve sesli harfle bitenler (das Auto → die Autos)",
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
  const href = cheatsheetHref("plural");
  const rule = parsePluralRule(word.formen ?? "");
  const plural = correct?.replace(/^die\s+/i, "") || pluralOf(word.de, word.formen ?? null);
  if (!plural) {
    return { type: "plural", text: `${word.de} kelimesinin çoğulu düzenli bir kalıba uymuyor — biçimi ezberle.`, href };
  }
  const umlautedStem = umlautStem(word.de);
  const hasUmlaut = umlautedStem !== word.de && plural.startsWith(umlautedStem);
  const stem = hasUmlaut ? umlautedStem : word.de;
  const suffix = plural.startsWith(stem) ? plural.slice(stem.length) : rule?.suffix ?? null;
  const chosen = picked && picked !== plural ? `„${picked}“ değil „${plural}“: ` : "";
  if (suffix === null || !(suffix in PLURAL_PATTERN)) {
    return { type: "plural", text: `${chosen}${word.de} düzenli bir kalıba uymuyor — ${word.artikel ?? ""} ${word.de} → die ${plural}, biçimi ezberle.`.replace(/\s+/g, " "), href };
  }
  const umlaut = hasUmlaut ? "umlaut + " : "";
  return {
    type: "plural",
    text: `${chosen}kalıp ${umlaut}${PLURAL_PATTERN[suffix]}; ${word.artikel ?? ""} ${word.de} → die ${plural}.`.replace(/\s+/g, " "),
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
  [/[zZ]/, "z harfi ts okunur, s değil"],
  [/[vV]/, "v harfi f okunur; v sesi w ile yazılır"],
  [/ie|ei/, "ie uzun i, ei „ay“ okunur — ikinci harf sesi söyler"],
  [/sch|ch/, "ş sesi sch, gırtlak sesi ch ile yazılır"],
  [/ß/, "ß uzun ünlüden sonraki keskin s sesi"],
  [/[äöü]/, "umlaut harfi anlamı değiştirir (schon ≠ schön)"],
  [/[A-ZÄÖÜ]/, "isimler her zaman büyük harfle başlar"],
  [/h/, "ünlüden sonraki h okunmaz, ünlüyü uzatır"],
];

function whySpelling(word: WhyWord, typed?: string | null): Why {
  const target = word.de;
  const diff = charDiff(typed ?? "", target);
  const changed = [...diff.typed.filter((s) => s.kind !== "same"), ...diff.target.filter((s) => s.kind !== "same")]
    .map((s) => s.text)
    .join("");
  const hint = SPELLING_HINTS.find(([re]) => re.test(changed))?.[1];
  // Fark şeritte harf harf çiziliyor (FeedbackLine); metin yalnız ipucu.
  const text = hint ?? "harfleri tek tek karşılaştır";
  return { type: "spelling", text, href: null, diff: typed ? diff : undefined };
}

/* ───────────────────────────── cümle ───────────────────────────── */

const W_WORDS = /^(wer|was|wo|wann|wie|warum|wohin|woher|welche[rs]?|wieso|weshalb|wem|wen|wessen)$/i;
const SUBORDINATORS = /\b(weil|dass|wenn|ob|obwohl|damit|während|bevor|nachdem|als|sobald|falls)\b/i;

function whyVerbPosition(answer?: string[] | null, tail?: string | null): Why {
  // Bağlantı kural parçacığından (WP-73): "weil" geçen cümle a2-nebensatz'a,
  // soru a1-wfragen'e gider — hata tipinin genel tablosundan daha isabetli.
  const rule = ruleFor("verb_position", `${(answer ?? []).join(" ")}${tail ?? ""}`);
  const href = rule?.link ? `/cheatsheet#${rule.link}` : cheatsheetHref("verb_position");
  const sentence = (answer ?? []).join(" ");
  const first = answer?.[0]?.replace(/[^a-zäöüß]/gi, "") ?? "";
  if (SUBORDINATORS.test(sentence)) {
    const m = sentence.match(SUBORDINATORS);
    return { type: "verb_position", text: `„${m?.[1]}“ ile başlayan yan cümlede çekimli fiil en sona gider.`, href };
  }
  if (tail?.trim() === "?" && !W_WORDS.test(first)) {
    return { type: "verb_position", text: "Evet/hayır sorusunda çekimli fiil cümlenin başına gelir, özne ondan sonra.", href };
  }
  if (tail?.trim() === "?") {
    return { type: "verb_position", text: "Soru kelimesinden sonra fiil ikinci sırada, özne fiilden sonra gelir.", href };
  }
  if (answer && answer.length > 1 && !/^(ich|du|er|sie|es|wir|ihr|man)$/i.test(first)) {
    return { type: "verb_position", text: `Cümle „${answer[0]}“ ile başlayınca fiil yine ikinci sırada kalır, özne fiilden SONRA gelir.`, href };
  }
  return { type: "verb_position", text: "Ana cümlede çekimli fiil her zaman ikinci sırada durur.", href };
}

/**
 * Kural parçacığından gerekçe (WP-73): bağlamda geçen ipucuna göre seçilen
 * kural + Almanca örnek; tabloya kuralın kendi bağlantısıyla gider.
 */
function whyFromRule(type: ErrorType, context: string): Why {
  const rule = ruleFor(type, context);
  if (!rule) return { type, text: ERROR_LABELS[type], href: cheatsheetHref(type) };
  const text = `${rule.why.charAt(0).toLocaleUpperCase("tr-TR")}${rule.why.slice(1)}: ${rule.example}`;
  return { type, text, href: rule.link ? `/cheatsheet#${rule.link}` : cheatsheetHref(type) };
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
  switch (input.type) {
    case "article":
      return w ? whyArticle(w, input.detail) : { type: "article", text: "Artikel kelimenin parçasıdır; kelimeyle birlikte öğren.", href: cheatsheetHref("article") };
    case "plural":
      return w ? whyPlural(w, input.detail, input.correct) : { type: "plural", text: "Çoğul biçimi kelimeyle birlikte öğren.", href: cheatsheetHref("plural") };
    case "spelling":
      return w ? whySpelling(w, input.detail) : { type: "spelling", text: "Yazımı harf harf karşılaştır.", href: null };
    case "verb_position":
      return whyVerbPosition(input.answer, input.tail);
    case "word_order":
    case "case":
    case "conjugation":
      return whyFromRule(input.type, contextOf(input));
    case "meaning":
      return {
        type: "meaning",
        text: w
          ? input.detail
            ? `„${input.detail}“ başka bir kelimenin karşılığı; ${w.artikel ? `${w.artikel} ` : ""}${w.de} = ${w.tr}. İkisini yan yana bir daha oku.`
            : `${w.artikel ? `${w.artikel} ` : ""}${w.de} = ${w.tr}.`
          : "Anlamı karıştırdın; iki kelimeyi yan yana bir daha oku.",
        href: null,
      };
    case "listening":
      return {
        type: "listening",
        text: w
          ? `Duyduğun kelime ${w.artikel ? `${w.artikel} ` : ""}${w.de} (${w.tr})${input.detail ? `; „${input.detail}“ başka bir kelime` : ""}. Bir kez daha dinle ve yazımına bak.`
          : "Bir kez daha dinle ve yazımına bak.",
        href: null,
      };
    case "pronunciation":
      return {
        type: "pronunciation",
        text: w ? `Söylediğin başka bir kelimeye kaydı; hedef: ${w.de}. Vurgu ilk hecede, z = ts, w = v.` : "Söylediğin başka bir kelimeye kaydı.",
        href: null,
      };
  }
}

/** Şeritteki etiket metni. */
export function whyLabel(type: ErrorType): string {
  return ERROR_LABELS[type];
}
