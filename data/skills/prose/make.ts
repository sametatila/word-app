/**
 * Beceri egzersizlerinin DÜZ METNİNİ paketler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/skills/prose/make.ts`
 *
 * İki alan, tek hat. Egzersizin Türkçe yazılmış iki yeri var ve ikisi de
 * öğrencinin okuduğu yer:
 *
 *   `intro`             egzersizin başındaki çerçeve — ne yapacağını söyler
 *   `questions.explain` doğru cevabın NEDEN doğru olduğu, cevaptan sonra
 *
 * Ayrı iki hat kurmak paketleri bölerdi ama kural kümesi neredeyse aynı;
 * `word` hattındaki gibi tek hat ve `kind` alanı yeterli. Kapı yalnız
 * `explain` için ek bir kural taşıyor.
 *
 * SÖZLÜKÇE HATTIN DIŞINDA. `GlossEntry` tipinde `en` alanı ZATEN var ve
 * 4.945'in 4.945'i dolu — beceri içeriğini yazan taraf İngilizceyi baştan
 * düşünmüş. Sınav hattındaki `canDo` ile aynı gerekçe: ikinci bir doğruluk
 * kaynağı açmak, ikisi ayrışınca hangisinin doğru olduğunu bilinemez hâle
 * getirir.
 *
 * KAYNAK DEĞİŞMİYOR. Karşılıklar `out/` altında duruyor ve çalışma anında
 * bir sözlükten okunuyor — `introEn`/`explainEn` diye kardeş alanlar
 * eklenmiyor. Ders ekseninde aynı karar `cando` ve `exam` hatlarında
 * verildi ve orada işe yaradı; ayrıca `src/lib/skills/` altında ikinci bir
 * oturum çalışıyor ve kaynağa dokunmamak çakışmayı da bitiriyor.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { BUNDLED_EXERCISES } from "@/lib/skills";

const DIR = new URL(".", import.meta.url).pathname;

/**
 * ALINTI SATIRI — çeviri istemeyen `explain`.
 *
 * Açıklamaların büyük kısmı Türkçe düzyazı DEĞİL: metinden alınmış Almanca
 * (İngilizce kursta İngilizce) bir cümle, tırnak içinde. "„Fünf Minuten.“"
 * satırının İngilizcesi yine "„Fünf Minuten.“" — kanıt cümlesi çevrilmez,
 * çünkü öğrencinin metinde göreceği şey odur.
 *
 * Ölçüt DAR tutuldu: dizenin TAMAMI tek bir tırnak açıklığı olacak, içinde
 * başka tırnak geçmeyecek, sonunda en fazla bir nokta olacak. Böylece
 * "„X“ ve Murat'ın sorusu …" gibi alıntıyla BAŞLAYIP Türkçe devam eden
 * satırlar geçiş sayılmıyor — 34 tanesi var ve hepsi yazılacak listede.
 *
 * Yanlış geçiş yanlış redden tehlikeli: geçiş sayılan bir satır kimseye
 * sorulmadan olduğu gibi kalır. O yüzden ölçüt gevşetilmemeli.
 */
export const isQuote = (t: string): boolean =>
  /^\s*[„"“']([^„"“”']+)[”“"']\s*\.?\s*$/.test(t);

export type ProseRow = {
  tr: string;
  kind: "intro" | "explain";
  /** Kaç egzersizde geçiyor — sıralama buna göre. */
  n: number;
  /** Bağlam: egzersizin kimliği ve becerisi. En çok üç tane. */
  ctx: string[];
  /**
   * `explain` için sorunun ALMANCA kökü ve doğru şıkkı. Açıklama neyin
   * neden doğru olduğunu söylüyor; kökü görmeden çevrilirse "çünkü ikinci
   * şık" gibi bir cümle bağlamsız kalır.
   */
  q?: string;
  a?: string;
};

type Q = { text?: string; options?: string[]; answer?: number; explain?: string };
type Ex = { id: string; skill?: string; level?: string; intro?: string; questions?: Q[] };

export function extractProse(): ProseRow[] {
  const rows = new Map<string, ProseRow>();
  const add = (kind: ProseRow["kind"], tr: string | undefined, ctx: string, q?: Q) => {
    if (typeof tr !== "string" || !tr.trim()) return;
    const key = kind + "|" + tr;
    const r = rows.get(key) ?? { tr, kind, n: 0, ctx: [] };
    r.n++;
    if (r.ctx.length < 3) r.ctx.push(ctx);
    if (q && !r.q) {
      r.q = q.text;
      r.a = q.options?.[q.answer ?? 0];
    }
    rows.set(key, r);
  };

  for (const e of Object.values(BUNDLED_EXERCISES as unknown as Record<string, Ex>)) {
    const at = `${e.id} · ${e.skill ?? "?"} ${e.level ?? ""}`.trim();
    add("intro", e.intro, at);
    for (const q of e.questions ?? []) add("explain", q.explain, at, q);
  }

  // Sıklık azalan; eşitlikte kısa önce, sonra alfabetik — sıra KARARLI
  // olmalı, yoksa paketler her `make`te kayar ve yazılanlar tutmaz.
  return [...rows.values()].sort(
    (a, b) => b.n - a.n || a.tr.length - b.tr.length || a.tr.localeCompare(b.tr, "tr"),
  );
}

/** Yazılacak satırlar — alıntılar dışarıda. */
export const proseWork = (): ProseRow[] => extractProse().filter((r) => !isQuote(r.tr));

/** Alıntı satırları: karşılıkları KENDİLERİ. Sözlüğe birim eşleme olarak giriyor. */
export const proseQuotes = (): ProseRow[] => extractProse().filter((r) => isQuote(r.tr));

if (process.argv[1]?.endsWith("make.ts")) {
  const rows = proseWork();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 150;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `p-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const kinds = rows.reduce<Record<string, number>>((a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a), {});
  const quotes = proseQuotes().length;
  console.log(
    `${rows.length + quotes} benzersiz dize · ${quotes} alıntı (geçiş) · ` +
      `${rows.length} yazılacak · ${n} paket\n` +
      Object.entries(kinds)
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k} ${v}`)
        .join(" · "),
  );
}
