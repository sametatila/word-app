import "dotenv/config";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { and, eq, notInArray, sql } from "drizzle-orm";
import { cleanHeadword } from "../src/lib/headword";
import { words } from "../src/lib/db/schema";
import { firstExample } from "../src/lib/example";
import { readMeanings } from "./apply-meanings";
import { readZurichSentences } from "./apply-zurich-beispiel";

/**
 * Züritüütsch kelime havuzunu Neon'a yükler.
 *
 * Kaynak: data/app/words.json (Goethe listesi — tr/typ/niveau/rank buradan) +
 * data/zurich/chunk-*.json (gsw biçim, artikel, Zürihce örnek cümle).
 * gsw kelimeleri 100000+kaynak_id kimliğiyle, course='gsw-zh' olarak yaşar;
 * Hochdeutsch köprüsü formen alanına "HD: …" olarak yazılır.
 */

const ID_OFFSET = 100000;

type SrcRow = {
  id: number;
  de: string;
  artikel: string;
  tr: string;
  typ: string;
  niveau: string;
  beispiel: string;
  rank?: number | null;
};
type GswRow = { id: number; gsw: string; artikel: string | null; beispiel: string };

/** seed.ts ile aynı temizlik: bölgesel işaretler ve yarım parantezler ayıklanır. */

const inferTyp = (r: SrcRow) =>
  r.typ === "Sonstiges" && /(mek|mak)(\s*,|$)/.test(r.tr) ? "Verb" : r.typ;

/** Zürihçe cümlelerde geçen yerler yerelleştirildi: Berlin→Züri, Mainz→Winterthur… */
const PLACES =
  /\b(Berlin|München|Münche|Hamburg|Köln|Frankfurt|Wien|Dresden|Leipzig|Stuttgart|Bonn|Bremen|Mainz|Heidelberg|Zürich|Züri|Winterthur|Basel|Bern|Luzern|Genf|Chur|Thun)\b/g;

/**
 * Türkçe çeviri Almanca cümleden üretildi; Zürihçe karşılık ise çoğu yerde
 * yerelleştirildi ("Ich wohne in Berlin" → "Ich wohne z Züri") ya da baştan
 * yazıldı. Bu maddelerde devralınan çeviri yanlış olur — yanlış çeviri
 * göstermektense hiç göstermemek doğrudur.
 *
 * Ölçüt: cümledeki sayılar ve yer adları örtüşüyorsa çeviri devralınır.
 */
function translationFits(de: string, gsw: string): boolean {
  const digits = (s: string) => (s.match(/\d+/g) ?? []).sort().join(",");
  const places = (s: string) =>
    [...new Set((s.match(PLACES) ?? []).map((p) => (p === "Zürich" ? "Züri" : p)))].sort().join(",");
  return digits(de) === digits(gsw) && places(de) === places(gsw);
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL tanımlı değil");

  const srcRows = JSON.parse(
    readFileSync(path.join(process.cwd(), "data", "app", "words.json"), "utf8"),
  ) as SrcRow[];
  const srcById = new Map(srcRows.map((r) => [r.id, r]));

  // Örnek cümle çevirileri kaynak id ile eşleşir: gsw beispiel'i çoğu maddede
  // Almanca cümlenin doğal karşılığıdır, o yüzden Türkçesi devralınabilir.
  // Yerelleştirilen/yeniden yazılan maddeler translationFits ile elenir.
  let beispielTr = new Map<number, string>();
  try {
    const trRows = JSON.parse(
      readFileSync(path.join(process.cwd(), "data", "app", "beispiel-tr.json"), "utf8"),
    ) as { id: number; tr: string }[];
    beispielTr = new Map(trRows.map((r) => [r.id, r.tr]));
  } catch {
    console.warn("beispiel-tr.json bulunamadı — örnek cümle çevirileri boş kalacak.");
  }

  const dir = path.join(process.cwd(), "data", "zurich");
  const chunkFiles = readdirSync(dir)
    .filter((f) => /^chunk-\d+\.json$/.test(f))
    .sort();
  const gswRows: GswRow[] = chunkFiles.flatMap(
    (f) => JSON.parse(readFileSync(path.join(dir, f), "utf8")) as GswRow[],
  );

  console.log(`${chunkFiles.length} parça, ${gswRows.length} gsw madde okundu.`);

  // Almanca havuz Zürih havuzundan hızlı büyüyebilir (B2/C1 genişlemesi). Eksik
  // karşılık artık yüklemeyi durdurmaz: Zürih kursu elindeki maddelerle çalışır,
  // eksikler seviye bazında raporlanır. Fazlalık ise gerçek bir hatadır —
  // kaynakta olmayan bir id, yanlış üretilmiş parça demektir.
  const srcIds = new Set(srcRows.map((r) => r.id));
  const orphan = gswRows.filter((g) => !srcIds.has(g.id));
  if (orphan.length) {
    throw new Error(
      `Kaynakta olmayan ${orphan.length} gsw id (ör. ${orphan.slice(0, 5).map((g) => g.id).join(", ")}).`,
    );
  }
  const have = new Set(gswRows.map((g) => g.id));
  const missing = srcRows.filter((r) => !have.has(r.id));
  if (missing.length) {
    const byLevel = missing.reduce<Record<string, number>>((a, r) => {
      const lv = r.niveau.startsWith("A1") ? "A1" : r.niveau;
      a[lv] = (a[lv] ?? 0) + 1;
      return a;
    }, {});
    console.warn(
      `UYARI: ${missing.length} kaynak maddenin Züritüütsch karşılığı yok ` +
        `(${Object.entries(byLevel).map(([k, v]) => `${k}: ${v}`).join(", ")}). ` +
        `Bu maddeler Zürih kursunda görünmez.`,
    );
  }

  // Karakter bütünlüğü: mojibake varsa hiç yükleme.
  const bad = /�|Ã.|â€|Ä±|Å./;
  for (const g of gswRows) {
    const m = JSON.stringify(g).match(bad);
    if (m) throw new Error(`Mojibake: id ${g.id} → "${m[0]}"`);
  }

  /**
   * Yenilenen Almanca anlamlar ve onlara denk gelen lehçe cümleleri.
   *
   * Kelime düzeyindeki karşılıklar (tr, en) iki kursta birebir aynı: aynı
   * kelimenin Türkçesi lehçeye göre değişmiyor. Cümle çevirileri ise ancak
   * lehçe cümlesi **aynı cümlenin** karşılığıysa devralınabiliyor; yeni hatta
   * bu bir kural (bkz. data/zurich/beispiel/SPEC.md), yani devralma orada
   * koşulsuz. Yenilenmemiş maddelerde eski ölçüt (sayı ve yer adı örtüşmesi)
   * yürürlükte kalıyor.
   */
  const meanings = new Map(readMeanings().map((m) => [m.id, m]));
  const zurichSentences = readZurichSentences();
  if (meanings.size) console.log(`${meanings.size} yenilenmiş anlam okundu.`);
  if (zurichSentences.size)
    console.log(`${zurichSentences.size} yenilenmiş Züritüütsch cümle okundu.`);

  let droppedTr = 0;
  const values = gswRows.map((g) => {
    const src = srcById.get(g.id);
    if (!src) throw new Error(`Kaynakta olmayan id: ${g.id}`);
    const meaning = meanings.get(g.id);
    const yeniCumle = zurichSentences.get(g.id)?.trim() || null;
    const gswSentence = yeniCumle ?? g.beispiel?.trim() ?? null;

    let tr: string | null;
    let en: string | null;
    if (yeniCumle && meaning) {
      // Yeni hatta lehçe cümlesi Almanca cümlenin karşılığı olmak zorunda:
      // çeviri koşulsuz devralınıyor.
      tr = meaning.beispielTr;
      en = meaning.beispielEn;
    } else {
      const deSentence = firstExample(src.beispiel);
      tr = gswSentence ? (beispielTr.get(g.id) ?? null) : null;
      en = null;
      if (tr && deSentence && !translationFits(deSentence, gswSentence!)) {
        tr = null;
        droppedTr++;
      }
    }

    return {
      id: ID_OFFSET + g.id,
      // Almanca tarafıyla aynı temizlik: tire bir ek işareti, kelimenin
      // parçası değil. İki kursta farklı davranmak öğrenciye aynı kavramı iki
      // biçimde gösteriyordu.
      de: cleanHeadword(g.gsw),
      artikel: g.artikel || null,
      tr: meaning?.tr ?? src.tr,
      en: meaning?.en ?? null,
      formen: `HD: ${cleanHeadword(src.de)}`,
      typ: inferTyp(meaning ? { ...src, tr: meaning.tr } : src),
      niveau: src.niveau.startsWith("A1") ? "A1" : src.niveau,
      beispiel: gswSentence,
      beispielTr: tr,
      beispielEn: en,
      rank: src.rank ?? null,
      course: "gsw-zh",
    };
  });

  const db = drizzle(neon(process.env.DATABASE_URL));
  const CHUNK = 400;
  for (let i = 0; i < values.length; i += CHUNK) {
    const chunk = values.slice(i, i + CHUNK);
    await db
      .insert(words)
      .values(chunk)
      .onConflictDoUpdate({
        target: words.id,
        set: {
          de: sql`excluded.de`,
          artikel: sql`excluded.artikel`,
          tr: sql`excluded.tr`,
          en: sql`excluded.en`,
          formen: sql`excluded.formen`,
          typ: sql`excluded.typ`,
          niveau: sql`excluded.niveau`,
          beispiel: sql`excluded.beispiel`,
          beispielTr: sql`excluded.beispiel_tr`,
          beispielEn: sql`excluded.beispiel_en`,
          rank: sql`excluded.rank`,
          course: sql`excluded.course`,
        },
      });
    console.log(`  ${Math.min(i + CHUNK, values.length)}/${values.length}`);
  }

  const removed = await db
    .delete(words)
    .where(and(eq(words.course, "gsw-zh"), notInArray(words.id, values.map((v) => v.id))))
    .returning({ id: words.id });
  if (removed.length) console.log(`Silinen eski gsw kelime: ${removed.length}`);

  console.log(
    `Züritüütsch havuzu yüklendi: ${values.length} kelime ` +
      `(${values.filter((v) => v.beispielTr).length} örnek cümle çevirisi, ` +
      `${droppedTr} madde yerelleştirildiği için çevirisiz).`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
