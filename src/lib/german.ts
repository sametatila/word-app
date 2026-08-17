/**
 * Almanca biçimbilgisi yardımcıları.
 *
 * Hem sunucuda (tur kurulurken) hem istemcide (dilbilgisi notu yazılırken)
 * aynı kuralların geçerli olması gerekir; bu yüzden ortak bir yerde durur.
 */

/**
 * Kökün son ünlüsünü umlautlar: "Arzt" → "Ärzt", "Haus" → "Häus".
 *
 * Büyük harf ayrıca ele alınır. Almanca isimler büyük harfle başlar ve
 * ünlüsü yalnızca baştaki harf olan kelimeler vardır (Amt, Angst, Apfel,
 * Arzt); yalnızca küçük harf aranırsa bunlar hiç umlautlanmaz ve "die
 * Arzte" gibi var olmayan bir çoğul üretilir.
 */
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
  const map: Record<string, string> = {
    a: "ä", o: "ö", u: "ü",
    A: "Ä", O: "Ö", U: "Ü",
  };
  return stem.slice(0, last.index) + map[last[0]] + stem.slice(last.index + 1);
}

/**
 * Almanca çoğul biçimleri — sözlükteki ek kuralından gerçek kelimeye.
 *
 * Veride çoğul, ekin kendisi olarak yazılır: "-e", "-en", "¨-er", "ä, -e",
 * "-" (değişmez), "(Sg.)" (çoğulu yok). Ekranda "¨-er" göstermek bir şey
 * öğretmez; öğrenciden beklenen "die Wörter".
 */

/** Çoğulu olmayan ya da çoğul bilgisi taşımayan madde işaretleri. */
const NO_PLURAL = /^(\(?(sg|pl)\.?\)?|nur singular|nur plural|[–—-]{1,2})$/i;

/** Sözlük yazımını (umlaut var mı, hangi ek) ayrıştırır. */
function parsePluralRule(raw: string): { umlaut: boolean; suffix: string } | null {
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
  // (Apfel → Äpfeln). "Armn" gibi bir biçim yanlış bile sayılmaz, öğrencinin
  // aklından geçmez; çeldirici olarak da işe yaramaz.
  if (suffix === "n" && !/([aeiouäöü]|el|er)$/i.test(stem)) return null;
  if (suffix === "s" && stem.endsWith("s")) return null;
  return stem + suffix;
}

/** Öğrencinin gerçekten karıştırdığı ekler. */
const PLURAL_SUFFIXES = ["", "e", "en", "n", "er", "s"];

/**
 * Çoğul turunun şıkları: doğru biçim ve ona en çok benzeyen yanlışlar.
 *
 * Buradaki asıl kazanç şu: çeldiriciler rastgele kelimeler değil, **aynı
 * kelimenin diğer çoğul kurallarıyla** üretilmiş biçimleridir (Wort → Worte /
 * Wörter / Worts). Öğrencinin gerçekte yaptığı hata tam olarak budur;
 * rastgele bir kelime bakar bakmaz elenir ve tur dört şıklı bir yazı tura
 * oyununa döner.
 *
 * Sıra önemli: önce doğru cevabın **kendi kökünden** türeyen biçimler gelir.
 * Umlautsuz bir kelimeye durduk yere umlaut takmak ("Ädresse") kimsenin
 * düşünmeyeceği bir şık üretir; bunlar yalnızca sayı tamamlamak için, en
 * sonda kullanılır.
 *
 * Yeterli çeldirici üretilemezse null döner ve tur kurulmaz.
 */
export function pluralChoices(
  de: string,
  formen: string | null,
  count: number,
  /**
   * Rastgelelik kaynağı.
   *
   * Günün ortak turu aynı seviyedeki herkese aynı şıkları göstermek zorunda
   * (bkz. lib/daily.ts) ve bu ancak üretim tohumdan türetilirse mümkün.
   * Verilmezse normal turlardaki davranış sürüyor.
   */
  rand: () => number = Math.random,
): { answer: string; distractors: string[] } | null {
  if (!de || /\s/.test(de)) return null; // çok kelimeli başlıklar bu turun dışında
  const rule = parsePluralRule(formen ?? "");
  if (!rule) return null;

  const plain = de;
  const umlauted = umlautStem(de);
  const answer = joinPlural(rule.umlaut ? umlauted : plain, rule.suffix);
  if (!answer) return null;

  // Doğru cevabın kökü önce; diğer kök yalnızca tamamlayıcı.
  const stems = rule.umlaut ? [umlauted, plain] : [plain, umlauted];
  const seen = new Set([answer]);
  const tiers: string[][] = [[], []];

  for (const [tier, stem] of stems.entries()) {
    if (stem === stems[0] && tier > 0) continue; // umlautlanamayan kelimede iki kök aynı
    for (const suffix of PLURAL_SUFFIXES) {
      const form = joinPlural(stem, suffix);
      if (!form || seen.has(form)) continue;
      seen.add(form);
      tiers[tier].push(form);
    }
  }

  // Kademe içinde sıra rastgele: hep aynı üç çeldirici gelirse şıklar ezberlenir.
  const ordered = [...shufflePlural(tiers[0], rand), ...shufflePlural(tiers[1], rand)];
  if (ordered.length < count) return null;
  return { answer, distractors: ordered.slice(0, count) };
}

/** Maddenin doğru çoğulu; kural okunamıyorsa ya da çoğulu yoksa null. */
export function pluralOf(de: string, formen: string | null): string | null {
  if (!de || /\s/.test(de)) return null;
  const rule = parsePluralRule(formen ?? "");
  if (!rule) return null;
  return joinPlural(rule.umlaut ? umlautStem(de) : de, rule.suffix);
}

function shufflePlural<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
