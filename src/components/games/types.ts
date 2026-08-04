import type { Round, RoundWord } from "@/lib/types";

export type GameResult = {
  wordId: number;
  correct: boolean;
  latencyMs: number;
  hintUsed?: boolean;
};

/**
 * Tüm oyunlar aynı sözleşmeyi kullanır:
 * tur bitince `onDone` bir kez çağrılır ve o turdaki tüm kelimelerin
 * sonuçları döner (eşleştirme gibi çoklu turlar birden fazla sonuç döndürür).
 */
export type GameProps<R extends Round = Round> = {
  round: R;
  onDone: (results: GameResult[]) => void;
};

export type { RoundWord };

/** Almanca kelimeyi artikeliyle birlikte gösterir. */
export function withArtikel(w: RoundWord): string {
  return w.artikel ? `${w.artikel} ${w.de}` : w.de;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Kelime türünün Türkçe etiketi. Veri "Sonstiges" dese de çeviri fiilse fiil sayılır. */
export function typLabel(typ: string, tr: string): string {
  if (typ === "Nomen") return "isim";
  if (typ === "Verb" || /(mek|mak)(\s*,|$)/.test(tr)) return "fiil";
  return "diğer";
}

/** Almanca çoğul eki kuralını gerçek çoğul biçimine çevirir: "der Arzt" + "¨-e" → "die Ärzte". */
function umlaut(stem: string): string {
  const au = stem.lastIndexOf("au");
  if (au >= 0) return `${stem.slice(0, au)}äu${stem.slice(au + 2)}`;
  const matches = [...stem.matchAll(/[aou]/g)];
  const last = matches[matches.length - 1];
  if (!last || last.index === undefined) return stem;
  const map: Record<string, string> = { a: "ä", o: "ö", u: "ü" };
  return stem.slice(0, last.index) + map[last[0]] + stem.slice(last.index + 1);
}

/**
 * Ekranda gösterilecek dilbilgisi notu.
 * Ham PDF gösterimi ("¨-e", "(Sg.)") yerine öğrencinin okuyabileceği bir metin döner.
 */
export function grammarNote(word: RoundWord): string | null {
  const raw = word.formen?.trim();
  if (!raw) return null;
  if (/^\(?Sg\.?\)?$/i.test(raw)) return "çoğulu yok";
  if (/^\(?Pl\.?\)?$/i.test(raw)) return "yalnızca çoğul";

  if (word.artikel) {
    const m = raw.match(/^(¨)?-?\s*(\w*)$/);
    if (m) {
      const stem = m[1] ? umlaut(word.de) : word.de;
      const suffix = m[2] ?? "";
      return `çoğul: die ${stem}${suffix}`;
    }
    return `çoğul: ${raw}`;
  }
  return raw; // fiil çekimleri olduğu gibi
}

/** Yazım karşılaştırması: büyük/küçük harf ve boşluk toleranslı. */
export function normalize(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/\s+/g, " ")
    .replace(/[.,!?;:]/g, "")
    .trim();
}
