/**
 * Almanca biçim yardımcıları — web `src/lib/german.ts` ile AYNI yerde, aynı ad.
 *
 * `umlautStem` gramer notunun içinde duruyordu (`game/wordGrammar`) ve oradaki
 * harf haritası (`{ a: "ä", ... }`) mobil `i18n-scan`i kırıyordu: tarayıcı tek
 * harfli dizgeleri çevrilmemiş metin sanıyor. Harf tablosu arayüz metni değil,
 * bu yüzden dosya sayımdan muaf tutuldu (`SKIP_CONTENT`) - ve muafiyetin bir
 * kapısı var: `check:parity` "umlaut govdesi" gövdeyi webinkiyle dizge dizge
 * karşılaştırıyor. Web tarafında aynı dört harf ham metin tabanında yazılıydı.
 */

/** Umlautlu gövde — web `lib/german` `umlautStem` ile aynı. */
export function umlautStem(stem: string): string {
  // Umlaut SON ünlüye gelir; o ünlü "au" ikilisiyse ikili tek parça umlautlanır:
  // Haus → Häuser, Baum → Bäume. Önceki bir "au" hesaba katılmaz: Ausflug → Ausflüge,
  // Hauptstadt → Hauptstädte (ilk "au"yu umlautlamak "Äusfluge" üretiyordu).
  const matches = [...stem.matchAll(/[aouAOU]/g)];
  const last = matches[matches.length - 1];
  if (!last || last.index === undefined) return stem;
  const i = last.index;
  if ((last[0] === "u" || last[0] === "U") && i > 0 && (stem[i - 1] === "a" || stem[i - 1] === "A")) {
    return `${stem.slice(0, i - 1)}${stem[i - 1] === "A" ? "Äu" : "äu"}${stem.slice(i + 1)}`;
  }
  const map: Record<string, string> = { a: "ä", o: "ö", u: "ü", A: "Ä", O: "Ö", U: "Ü" };
  return stem.slice(0, i) + map[last[0]] + stem.slice(i + 1);
}

/**
 * Çoğul kuralı okuma — web `lib/german` ile BİREBİR aynı gövde.
 *
 * "Neden" açıklaması çoğul desenini (umlaut + ek) buradan çıkarıyor: veride
 * çoğul ekin kendisi olarak yazılı ("-e", "¨-er", "ä, -e", "-", "(Sg.)").
 */

/** Çoğulu olmayan ya da çoğul bilgisi taşımayan madde işaretleri. */
const NO_PLURAL = /^(\(?(sg|pl)\.?\)?|nur singular|nur plural|[–—-]{1,2})$/i;

/** Sözlük yazımını (umlaut var mı, hangi ek) ayrıştırır. */
export function parsePluralRule(raw: string): { umlaut: boolean; suffix: string } | null {
  const value = raw.trim();
  if (!value) return null;
  // "-" tek başına "çoğulda değişmez" demektir ve geçerli bir kuraldır;
  // "(Sg.)", "nur Singular", "–" ise çoğul yokluğunu bildirir.
  if (value !== "-" && NO_PLURAL.test(value)) return null;

  // "ä, -e" / "Ä, -e": umlaut ayrı yazılmış biçim.
  const spelled = value.match(/^[äöü]u?,\s*-?\s*([a-zäöüß]*)$/i);
  if (spelled) return { umlaut: true, suffix: spelled[1] ?? "" };

  // "¨-er", "¨-", "-en", "-", "-s"
  const dashed = value.match(/^(¨)?-\s*([a-zäöüß]*)$/i);
  if (dashed) return { umlaut: Boolean(dashed[1]), suffix: dashed[2] ?? "" };

  return null; // fiil çekimi ya da serbest metin — çoğul kuralı değil
}

/**
 * Eki köke ekler. Almanca ek birleşimleri düz yapıştırma değildir; öğrencinin
 * asla yazmayacağı biçimler ("Straßee") çeldirici olarak da işe yaramaz.
 */
function joinPlural(stem: string, suffix: string): string | null {
  if (!suffix) return stem;
  if (stem.endsWith("e") && suffix.startsWith("e")) {
    // "Straße" + "-en" → "Straßen"; "Straße" + "-e" diye bir biçim yok.
    return suffix === "en" ? `${stem}n` : null;
  }
  // Yalın "-n" çoğulu yalnızca ünlüyle ya da -el/-er ile biten köklere gelir
  // (Apfel → Äpfeln). "Armn" gibi bir biçim yanlış bile sayılmaz.
  if (suffix === "n" && !/([aeiouäöü]|el|er)$/i.test(stem)) return null;
  if (suffix === "s" && stem.endsWith("s")) return null;
  return stem + suffix;
}

/** Tam biçimden kural çıkarırken denenen kurallar — yaygından seyreğe. */
const RULE_CANDIDATES: { umlaut: boolean; suffix: string }[] = [
  { umlaut: false, suffix: "" },
  { umlaut: false, suffix: "e" },
  { umlaut: false, suffix: "en" },
  { umlaut: false, suffix: "n" },
  { umlaut: false, suffix: "er" },
  { umlaut: false, suffix: "s" },
  { umlaut: false, suffix: "nen" },
  { umlaut: true, suffix: "" },
  { umlaut: true, suffix: "e" },
  { umlaut: true, suffix: "er" },
];

/** `formen` bir kural değil çoğulun kendisiyse o sözcük ("Museen", "die Arbeitsverträge"). */
function fullPluralOf(formen: string | null): string | null {
  return (formen ?? "").trim().match(/^(?:die\s+)?(\p{Lu}[\p{L}-]*)$/u)?.[1] ?? null;
}

/**
 * Maddenin çoğul KURALI — yazılı kural ya da yazılı tam biçimi üreten kural.
 *
 * Veride çoğul iki biçimde duruyor: kural ("¨-e") ve çoğulun kendisi
 * ("Arbeitsverträge", sonu değişenlerde zorunlu: "Museen"). Yalnız kural
 * okunuyordu; tam biçimle yazılmış 1.847 ismin 1.754'ü aslında kurallı olduğu
 * hâlde çoğul turu hiç kurulmuyordu ve kart notu ham metni basıyordu. Tam biçimi
 * bir kural birebir üretiyorsa o kural kullanılıyor; üretmiyorsa (Museen,
 * Pizzen, Themen) null — o isimlerde çeldirici üretmek uydurma biçim demek.
 */
export function pluralRuleOf(de: string, formen: string | null): { umlaut: boolean; suffix: string } | null {
  const rule = parsePluralRule(formen ?? "");
  if (rule) return rule;
  const full = fullPluralOf(formen);
  if (!full || !de || /\s/.test(de)) return null;
  for (const c of RULE_CANDIDATES) {
    if (joinPlural(c.umlaut ? umlautStem(de) : de, c.suffix) === full) return c;
  }
  return null;
}

/** Kartta gösterilecek çoğul: kuralın ürettiği biçim, yoksa yazılı tam biçim. */
export function pluralFormOf(de: string, formen: string | null): string | null {
  const rule = pluralRuleOf(de, formen);
  if (rule && de && !/\s/.test(de)) return joinPlural(rule.umlaut ? umlautStem(de) : de, rule.suffix);
  return fullPluralOf(formen);
}

/** Maddenin doğru çoğulu; kural okunamıyorsa ya da çoğulu yoksa null. */
export function pluralOf(de: string, formen: string | null): string | null {
  if (!de || /\s/.test(de)) return null;
  const rule = pluralRuleOf(de, formen);
  if (!rule) return null;
  return joinPlural(rule.umlaut ? umlautStem(de) : de, rule.suffix);
}
