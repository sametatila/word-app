import type { Round, RoundWord } from "@/lib/types";
import { umlautStem } from "@/lib/german";

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
      const stem = m[1] ? umlautStem(word.de) : word.de;
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
    .replace(/[.,!?;:]/g, " ")
    // Boşluk sadeleştirmesi noktalama temizliğinden SONRA gelmeli: "entweder ...
    // oder" önce yapıldığında çift boşukla kalıyor ve hiçbir yazımla eşleşmiyordu.
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Yazım farklarını eşitleyen katlama.
 *
 * Almanca klavyesi olmayan biri ä/ö/ü/ß yazamaz; standart karşılıkları
 * ae/oe/ue/ss'tir. Üstelik `ss` İsviçre'de yanlış değil **doğru** yazımdır —
 * bu uygulamada Züritüütsch kursu da var ve orada ß hiç kullanılmaz. Bu yüzden
 * ikisi de kabul edilir.
 *
 * Umlaut düz sesliye indirgenmez (ö → oe, ö → o değil): aksi hâlde "schon" ile
 * "schön" ya da "Bar" ile "Bär" birbirine karışır ve gerçekten yanlış cevap
 * doğru sayılırdı.
 *
 * Artikel her iki tarafta da isteğe bağlıdır: kelime "Tür" diye saklanıp
 * artikeli ayrı sütunda dursa bile "die Tür" yazan haklıdır.
 */
export function foldSpelling(s: string): string {
  return normalize(s)
    .replace(/^(der|die|das)\s+/, "")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue");
}

/** Yazılan cevap, verilen başlıklardan herhangi biriyle eşleşiyor mu? */
export function matchesAnswer(typed: string, candidates: string[]): boolean {
  const target = foldSpelling(typed);
  if (!target) return false;
  return candidates
    .flatMap((c) => acceptedForms(c))
    .some((form) => foldSpelling(form) === target);
}

/**
 * Bir madde başlığı için kabul edilebilir yazımların tamamı.
 *
 * Sözlük başlığı ile öğrencinin yazacağı şey aynı değildir. Başlık, birden çok
 * bilgiyi tek satıra sıkıştırır:
 *
 *   "sich setzen"      dönüşlü zamir fiilin parçası ama tek başına "setzen" de doğrudur
 *   "setzen (sich)"    aynı şey, parantezle
 *   "der/die Bekannte" iki artikel, tek kelime
 *   "heraus/raus"      iki ayrı geçerli biçim — birini bilmek yeter
 *   "Zeug"             sözlükte "-zeug" olarak da geçebilir, tire ek işaretidir
 *
 * Öğrenciden bu satırı harfi harfine kopyalamasını beklemek yazımı değil,
 * sözlük biçimini ezberlemeyi ölçer. Burada başlıktan bütün makul yazımlar
 * üretilir; herhangi biri doğru sayılır.
 */
export function acceptedForms(raw: string): string[] {
  const out = new Set<string>();

  const add = (value: string) => {
    const base = normalize(value).replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
    if (!base) return;
    out.add(base);
    // Artikel isteğe bağlı: "die Bekannte" de "Bekannte" de kabul.
    const noArticle = base.replace(/^(der|die|das)\s+/, "");
    out.add(noArticle);
    // Dönüşlü zamir isteğe bağlı ve yeri serbest: sözlükte "setzen (sich)"
    // yazsa da öğrenci "sich setzen" ya da yalnızca "setzen" yazabilmeli.
    const withoutSich = noArticle.replace(/\bsich\b/g, " ").replace(/\s+/g, " ").trim();
    if (withoutSich && withoutSich !== noArticle) {
      out.add(withoutSich);
      out.add(`sich ${withoutSich}`);
    }
  };

  for (const variant of parenVariants(raw)) {
    for (const alt of splitAlternatives(variant)) add(alt);
  }
  return [...out];
}

/**
 * Parantezli kısım hem varken hem yokken geçerlidir.
 * "(Schlag-)Sahne" → "Schlagsahne" ve "Sahne"; "setzen (sich)" → "setzen sich" ve "setzen".
 */
function parenVariants(raw: string): string[] {
  if (!raw.includes("(")) return [raw];
  return [
    raw.replace(/\(([^)]*)\)\s*/g, (_, inner: string) => inner.replace(/-+$/, "")), // birleşik
    raw.replace(/\([^)]*\)/g, " "), // parantezsiz
  ];
}

/** Sözlükteki kısa artikel yazımları. */
const ARTICLE_SHORT: Record<string, string> = { r: "der", e: "die", s: "das" };

/**
 * Eğik çizgiyle ayrılmış başlığı gerçek kelimelere açar.
 *
 * Çizgi iki ayrı iş görüyor ve ikisi farklı davranır:
 *   "heraus/raus"      → iki tam kelime, ikisi de geçerli
 *   "der/die Bekannte" → yalnızca artikel değişiyor, kelime ortak
 *
 * Bileşik tahmini bilerek yapılmaz: "Nord-/Ostsee" yazımından "Nordsee"yi
 * çıkarmak, bileşiğin nerede bölündüğünü bilmeyi gerektirir ve büyük/küçük
 * harften türetilemez. Böyle maddeler veride açık yazılır ("Nordsee/Ostsee");
 * burada tahmin etmek sessiz yanlışlar üretirdi.
 */
function splitAlternatives(raw: string): string[] {
  const parts = raw
    .split("/")
    .map((p) => p.trim().replace(/^-+|-+$/g, "").trim())
    .filter(Boolean);
  if (parts.length <= 1) return [parts[0] ?? ""];

  // Her parça artikel ve gövdesine ayrılır. Artikel parçanın tamamı olabilir
  // ("der/die Bekannte") ya da gövdeyle aynı parçada durabilir ("r/e Erwachsene").
  const parsed = parts.map((p) => {
    const withBody = p.match(/^(der|die|das|[res])\s+(.+)$/i);
    if (withBody) return { article: expandArticle(withBody[1]), body: withBody[2] };
    if (/^(der|die|das|[res])$/i.test(p)) return { article: expandArticle(p), body: null };
    return { article: null, body: p };
  });

  // Yalnız artikelden ibaret parçalar gövdeyi kardeşlerinden alır.
  const shared = [...parsed].reverse().find((x) => x.body)?.body ?? "";

  const out: string[] = [];
  for (const part of parsed) {
    const body = part.body ?? shared;
    if (!body) continue;
    out.push(part.article ? `${part.article} ${body}` : body);
  }
  return out;
}

function expandArticle(a: string): string {
  const key = a.toLowerCase();
  return ARTICLE_SHORT[key] ?? key;
}
