/**
 * İÇERİĞİ YAYINLAR — git'teki kaynaktan veritabanındaki teslim hattına.
 *
 *   npm run content:publish              # yayınla ve canlıya al
 *   npm run content:publish -- --draft   # taslak bırak (panelden önizlenip alınır)
 *   npm run content:publish -- --dry     # hiçbir şey yazma, ne olacağını göster
 *   npm run content:publish -- --note "b2 dinleme düzeltmesi"
 *
 * NEDEN AYRI BİR BETİK VE NEDEN PANELDE DEĞİL. İçeriğin doğruluk kaynağı
 * `data/**` ve git: diff'i, review'ı ve 70+ `check:*` kapısı orada duruyor.
 * Panelden düzenlenen bir içerik bunların hepsini kaybederdi. Bu betik o
 * hattın SONU: aynı dökümü mobil ağacına yazmak yerine sunucuya yayınlıyor.
 *
 * DÖKÜM İŞLEVLERİ AYNEN KULLANILIYOR (`buildLessonDump`, `buildSkillDump`,
 * `buildPaperDump`, `buildNativeDump`). Yeniden projeksiyon yazmak, yayınlanan
 * içeriğin mobil pakettekinden sessizce ayrılması demekti; `check:dumps` de o
 * işlevlere bakıyor. Tek projeksiyon, tek doğruluk.
 *
 * KAPILI PAKET: deneme sınavı kâğıtları da buradan yayınlanıyor ama
 * `papers/` öneki `isGatedPack` ile kapılı — manifestte görünmüyorlar,
 * herkese açık gövde ucu onları reddediyor (bkz. `lib/content/ids`).
 */
import "dotenv/config";
import { execFileSync } from "node:child_process";
import { buildLessonDump } from "./dump-lessons-mobile";
import { buildSkillDump } from "./dump-skills-mobile";
import { buildPaperDump } from "./dump-mock-exams-mobile";
import { buildNativeDump } from "./dump-native-mobile";
import { catalogEntry } from "../src/lib/mock-exams/deliver";
import { publish, type PackInput } from "../src/lib/content/publish";

const COURSES = ["de", "en"] as const;

type WithId = { id: string };
/** `buildPaperDump` çıktısı JSON; künye üreticisi kâğıdın kendi tipini istiyor. */
type MockPaperRow = Parameters<typeof catalogEntry>[0];

function byId(rows: WithId[]): PackInput {
  const out: PackInput = new Map();
  for (const row of rows) {
    if (out.has(row.id)) throw new Error(`aynı kimlik iki kez: ${row.id}`);
    out.set(row.id, row);
  }
  return out;
}

/**
 * Paketleri kurar. Boş paket YAZILMIYOR: olmayan bir seviyeyi boş bir
 * paketle yayınlamak, istemciye "bu seviye var ama içi boş" demek olurdu —
 * "bu seviye yok"tan farklı ve yanlış bir cevap.
 */
function collect(): Map<string, PackInput> {
  const packs = new Map<string, PackInput>();

  for (const course of COURSES) {
    /* DERSLER — seviye başına bir paket, madde başına bir ders.
       Granülerlik burada belirleniyor: bir derste değişen tek kelime, o
       kullanıcıya yalnız o dersin ~10 KB'ını indirtiyor. */
    for (const pack of buildLessonDump(course)) {
      const rows = JSON.parse(pack.json) as WithId[];
      if (rows.length === 0) continue;
      packs.set(`lessons/${course}-${pack.level.toLowerCase()}`, byId(rows));
    }

    /* BECERİ ALIŞTIRMALARI — seviye başına paket. Mobilde bugün tek dosya
       (4,7 MB); seviyeye bölmek kullanıcının yalnız çalıştığı dilimi
       indirmesi demek. */
    const skills = JSON.parse(buildSkillDump(course).json) as (WithId & { level: string })[];
    const byLevel = new Map<string, (WithId & { level: string })[]>();
    for (const row of skills) {
      const level = row.level.toLowerCase();
      const list = byLevel.get(level);
      if (list) list.push(row);
      else byLevel.set(level, [row]);
    }
    for (const [level, rows] of byLevel) packs.set(`skills/${course}-${level}`, byId(rows));

    /* DENEME SINAVI KÂĞITLARI — kapılı. Kurs başına tek paket: kâğıt zaten
       tek tek isteniyor, seviyeye bölmenin kazancı yok. */
    const papers = JSON.parse(buildPaperDump(course).json) as (WithId & { level: string })[];
    if (papers.length > 0) packs.set(`papers/${course}`, byId(papers));

    /* KÂĞIT KÜNYELERİ — kapılı DEĞİL ve bu bilinçli.
       Liste ekranı kilitli kâğıtları da göstermek zorunda: kilidi görmeden
       premium'un ne verdiği anlaşılmıyor. Künye başlık, süre ve puan taşıyor,
       tek bir madde bile taşımıyor (bkz. `mock-exams/deliver` catalogEntry) —
       kâğıt başına ~200 bayt, tamamı için ~25 KB. */
    const byLevelPapers = new Map<string, MockPaperRow[]>();
    for (const row of papers as unknown as MockPaperRow[]) {
      const level = row.level.toLowerCase();
      const list = byLevelPapers.get(level);
      if (list) list.push(row);
      else byLevelPapers.set(level, [row]);
    }
    for (const [level, rows] of byLevelPapers) {
      const index: PackInput = new Map();
      for (const row of rows) index.set(row.id, catalogEntry(row));
      packs.set(`mockindex/${course}-${level}`, index);
    }
  }

  /* ANADİL SÖZLÜKLERİ — çeviri yönü tek: anadili İngilizce olan `native/en`i,
     Almanca olan `native/de`yi kullanıyor, Türkçe kullanan HİÇBİRİNİ. Bugün
     her ikili ikisini birden taşıyor; 10,5 MB'ın tamamı bu yüzden boşa
     gidiyor. Maddeler sözlüğün üst anahtarları (lecture, vocab, exam…) —
     doğal ve hazır bir bölünme. */
  const native = buildNativeDump();
  for (const [lang, json] of [
    ["en", native.json],
    ["de", native.jsonDe],
  ] as const) {
    const dict = JSON.parse(json) as Record<string, unknown>;
    const items: PackInput = new Map();
    for (const [key, value] of Object.entries(dict)) items.set(key, value);
    if (items.size > 0) packs.set(`native/${lang}`, items);
  }

  return packs;
}

function commitSha(): string | null {
  try {
    return execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    /* Depo dışında ya da git yoksa sürüm yine açılıyor: künye eksik kalır,
       yayın engellenmez. */
    return null;
  }
}

function mb(bytes: number): string {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  const argv = process.argv.slice(2);
  const dry = argv.includes("--dry");
  const draft = argv.includes("--draft");
  const noteAt = argv.indexOf("--note");
  const note = noteAt >= 0 ? (argv[noteAt + 1] ?? null) : null;

  const packs = collect();
  let items = 0;
  let bytes = 0;
  const lines: string[] = [];
  for (const [pack, content] of [...packs].sort(([a], [b]) => a.localeCompare(b))) {
    let packBytes = 0;
    for (const value of content.values()) packBytes += Buffer.byteLength(JSON.stringify(value), "utf8");
    items += content.size;
    bytes += packBytes;
    lines.push(`  ${pack.padEnd(22)} ${String(content.size).padStart(5)} madde  ${mb(packBytes).padStart(9)}`);
  }
  console.log(lines.join("\n"));
  console.log(`  ${"TOPLAM".padEnd(22)} ${String(items).padStart(5)} madde  ${mb(bytes).padStart(9)}  (${packs.size} paket)`);

  if (dry) {
    console.log("\n--dry: hiçbir şey yazılmadı.");
    return;
  }

  const started = Date.now();
  const result = await publish(packs, {
    commit: commitSha(),
    note,
    by: "content:publish",
    live: !draft,
  });
  const seconds = ((Date.now() - started) / 1000).toFixed(1);

  if (result.unchanged) {
    console.log(`\nİçerik canlı sürüm ${result.version} ile birebir aynı — yeni sürüm açılmadı (${seconds} sn).`);
    return;
  }
  console.log(
    `\nSürüm ${result.version} ${draft ? "TASLAK olarak yayınlandı" : "canlıya alındı"} (${seconds} sn).\n` +
      `  yeni gövde: ${result.fresh}   yeniden kullanılan: ${result.reused}`,
  );
}

main().catch((err) => {
  /* Drizzle hatanın kendisini `cause`ta taşıyor; yalnız `message` basmak
     "Failed query: select …" yazıp asıl sebebi (izin, eksik tablo, bağlantı)
     yutuyordu. */
  console.error(err instanceof Error ? err.message : err);
  const cause = err instanceof Error ? err.cause : null;
  if (cause instanceof Error) console.error("sebep:", cause.message);
  process.exit(1);
});
