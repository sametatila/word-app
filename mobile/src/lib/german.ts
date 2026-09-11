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
  // "au" ikili ünlüsü tek parça umlautlanır: Haus → Häuser, Baum → Bäume.
  const au = stem.toLowerCase().lastIndexOf("au");
  if (au >= 0) {
    const upper = stem[au] === stem[au].toUpperCase();
    return `${stem.slice(0, au)}${upper ? "Äu" : "äu"}${stem.slice(au + 2)}`;
  }
  const matches = [...stem.matchAll(/[aouAOU]/g)];
  const last = matches[matches.length - 1];
  if (!last || last.index === undefined) return stem;
  const map: Record<string, string> = { a: "ä", o: "ö", u: "ü", A: "Ä", O: "Ö", U: "Ü" };
  return stem.slice(0, last.index) + map[last[0]] + stem.slice(last.index + 1);
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

/** Maddenin doğru çoğulu; kural okunamıyorsa ya da çoğulu yoksa null. */
export function pluralOf(de: string, formen: string | null): string | null {
  if (!de || /\s/.test(de)) return null;
  const rule = parsePluralRule(formen ?? "");
  if (!rule) return null;
  return joinPlural(rule.umlaut ? umlautStem(de) : de, rule.suffix);
}
