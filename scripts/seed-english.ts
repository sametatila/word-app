import "dotenv/config";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { and, eq, notInArray, sql } from "drizzle-orm";
import { words } from "../src/lib/db/schema";
import { cleanHeadword } from "../src/lib/headword";

/**
 * İngilizce kursunu (`course = "en"`) tohumlar: `npm run db:seed:en`
 *
 * Neden ayrı bir betik: Almanca tohumlaması (seed.ts) kaynak listeyi
 * `data/meanings/out` bindirmesiyle birleştiriyor ve artikel/formen/rank gibi
 * Almancaya özgü alanları taşıyor. İngilizce kaydın şekli farklı — bunları
 * ikisi de aynı dosyaya sıkıştırmak her iki tarafı da okunmaz yapardı.
 *
 * ŞEKİL (kolonlar 1 Ekim'e kadar yeniden adlandırılmadan kullanılıyor; web o
 * tarihe dek canlı ve `de` kolonunun adı değişirse kırılır):
 *   id           200000 + kaynak id — de (1-8267) ve gsw-zh (100001+) ile çakışmaz
 *   de           HEDEF TERİM = İngilizce kelime (kolon adı tarihsel yanlış ad)
 *   artikel      NULL — İngilizcede isim cinsiyeti yok. Artikel ve Çoğul turları
 *                `artikel` boşken zaten üretilmiyor, yani kendiliğinden kapanıyor.
 *   formen       NULL — Almanca çekim kuralları taşınmaz
 *   en           NULL — terim zaten İngilizce; doldurulsa anlam oyunlarda
 *                "tr · en" biçiminde iki kez görünürdü
 *   rank         NULL — mevcut rank ALMANCA frekansı, İngilizceye taşınmaz
 *   niveau       İNGİLİZCE CEFR seviyesi (Almanca kaynağın seviyesi değil)
 *   de_gloss     ALMANCA KARŞILIK — kaynak satırın başlığından TÜRETİLİYOR;
 *                kaynağı olmayan 200 maddede kaynak dosyada elle yazılı
 *   beispiel_de  ELLE ÇEVRİLİYOR — `data/en-de/out` (türetilemiyor, aşağıda)
 */

type Row = {
  id: number;
  /** Bu terimin türetildiği Almanca havuz satırının kimliği. */
  srcId?: number;
  de: string;
  tr: string;
  typ: string;
  niveau: string;
  beispiel: string;
  beispielTr: string;
  /**
   * Almanca karşılık — YALNIZ kaynağı olmayan maddelerde yazılı.
   *
   * 6.975 madde Almanca havuzdan türetilmiş ve karşılığı kaynak satırdan
   * geliyor; burada yazılı olan 200 madde İngilizceye özgü eklemeler
   * (`corner shop`, `queue`, `plaster`) ve türetecek bir kaynakları yok.
   * Elle yazılan değer türetilenden önce gelir — açık bilgi çıkarımı yener.
   */
  deGloss?: string;
};

type SrcRow = { id: number; de: string };

/**
 * ALMANCA KARŞILIK YAZILMIYOR, TÜRETİLİYOR.
 *
 * İngilizce havuz Almanca havuzdan türetildi: her satırın `srcId`si bir Almanca
 * satırı gösteriyor ve o satırın `en` alanı ile buradaki İngilizce başlık
 * 6.975/6.975 BİREBİR aynı (ölçüldü, sıfır fark). Yani Almanca karşılık zaten
 * elimizde — kaynak satırın başlığı. Elle yazmak aynı bilgiyi ikinci kez
 * üretmek ve iki kopyanın ayrışmasına kapı açmak olurdu.
 *
 * ARTİKELSİZ. `de_gloss` tek bir metin alanı ve yanında artikel sütunu yok;
 * "das Auto" yazılsaydı yazarak hatırlama turunda "Auto" yazan kullanıcı yanlış
 * sayılırdı (`meanings()` karşılığı virgülle bölüp olduğu gibi karşılaştırıyor).
 * Zaten karşılık ANADİLDE: artikel Alman kullanıcıya bilmediği bir şey
 * söylemiyor. gsw kursundaki "HD: …" köprüsü de artikelsiz.
 *
 * Kaynağı olmayan 200 madde `null` kalıyor ve `hasGloss` onları Almanca anadilli
 * kullanıcının havuzundan eliyor — Türkçe karşılık göstermektense hiç
 * göstermemek doğru (bkz. `option-label.ts`).
 */
function readGermanHeadwords(): Map<number, string> {
  const file = path.join(process.cwd(), "data", "app", "words.json");
  const rows = JSON.parse(readFileSync(file, "utf8")) as SrcRow[];
  return new Map(rows.map((r) => [r.id, cleanHeadword(r.de)]));
}

/**
 * Örnek cümlenin Almanca çevirisi — `data/en-de/out`.
 *
 * TÜRETİLEMİYOR ve bu ölçüldü: İngilizce örnek cümleler Almanca cümlenin
 * çevirisi değil, aynı kelime için BAĞIMSIZ yazılmış cümleler. «pflegen»
 * Almancada "Sie pflegt ihre kranke Mutter seit zwei Jahren", İngilizcede
 * "Nurses care for patients day and night". Devralınsaydı kullanıcı cümleyle
 * ilgisiz bir çeviri görürdü — eksik çevirinin en kötü biçimi, çünkü görünürde
 * çalışır.
 *
 * Yazılmamış paketler eksik değil, HENÜZ YOK: alan null kalıyor ve kullanıcı
 * çevirisiz bir örnek görüyor. `exampleGlossFor` bunu zaten kaldırıyor ve
 * kelime havuzdan DÜŞMÜYOR — örnek hedef dilde zaten anlamlı, çeviri bir ek.
 */
function readGermanSentences(): Map<number, string> {
  const dir = path.join(process.cwd(), "data", "en-de", "out");
  const out = new Map<number, string>();
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir).filter((f) => f.endsWith(".json")).sort()) {
    for (const r of JSON.parse(readFileSync(path.join(dir, f), "utf8")) as {
      id: number;
      beispielDe: string;
    }[]) {
      if (r.beispielDe?.trim()) out.set(r.id, r.beispielDe.trim());
    }
  }
  return out;
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL tanımlı değil");
  const db = drizzle(new Pool({ connectionString: process.env.DATABASE_URL }));

  const file = path.join(process.cwd(), "data", "app", "words-en.json");
  // Dosya JSONL: satır başına bir kayıt, sarmalayan dizi yok. Böyle okunuyor
  // çünkü havuza kelime eklerken tek satır ekleniyor ve diff tek satır kalıyor;
  // dizi biçiminde son kaydın virgülü de değişir ve her ekleme iki satır oynar.
  // Kapı (vocab-gate-en.cjs) ve kütüphane denetimi de dosyayı böyle okuyor.
  const rows = readFileSync(file, "utf8")
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l) as Row);
  console.log(`${rows.length} İngilizce kelime okundu.`);

  const german = readGermanHeadwords();
  const sentences = readGermanSentences();
  let derived = 0;
  let written = 0;
  const values = rows.map((r) => {
    // Elle yazılan değer türetilenden ÖNCE gelir.
    const deGloss = r.deGloss?.trim() || (r.srcId ? (german.get(r.srcId) ?? null) : null);
    if (r.deGloss?.trim()) written++;
    else if (deGloss) derived++;
    return {
      id: r.id,
      de: r.de,
      artikel: null,
      tr: r.tr,
      en: null,
      formen: null,
      typ: r.typ,
      niveau: r.niveau,
      beispiel: r.beispiel || null,
      beispielTr: r.beispielTr || null,
      beispielEn: null,
      deGloss,
      beispielDe: sentences.get(r.id) ?? null,
      rank: null,
      course: "en",
    };
  });
  console.log(
    `  Almanca karşılık: ${derived + written}/${rows.length} ` +
      `(${derived} türetildi, ${written} elle yazılmış)`,
  );
  console.log(`  Almanca örnek cümle çevirisi: ${sentences.size}/${rows.length}`);

  const CHUNK = 400;
  for (let i = 0; i < values.length; i += CHUNK) {
    await db
      .insert(words)
      .values(values.slice(i, i + CHUNK))
      .onConflictDoUpdate({
        target: words.id,
        set: {
          de: sql`excluded.de`,
          tr: sql`excluded.tr`,
          typ: sql`excluded.typ`,
          niveau: sql`excluded.niveau`,
          beispiel: sql`excluded.beispiel`,
          beispielTr: sql`excluded.beispiel_tr`,
          deGloss: sql`excluded.de_gloss`,
          beispielDe: sql`excluded.beispiel_de`,
        },
      });
    console.log(`  ${Math.min(i + CHUNK, values.length)}/${values.length}`);
  }

  // Kaynaktan çıkarılan maddeler kalmamalı. Silme YALNIZ `course = "en"` ile
  // sınırlı: Almanca ve Zürih kursları bu betikten hiç etkilenmemeli.
  const removed = await db
    .delete(words)
    .where(
      and(
        eq(words.course, "en"),
        notInArray(
          words.id,
          values.map((v) => v.id),
        ),
      ),
    )
    .returning({ id: words.id });
  if (removed.length) console.log(`Silinen eski kelime: ${removed.length}`);

  console.log("İngilizce tohumlama tamam.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
