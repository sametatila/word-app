import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

/**
 * Yenilenen beceri sözlükçesini içerik dosyalarına yazar:
 *   `npm run skills:apply -- [kurs|paket|all] [--dry]`
 *
 * Kelime hattından ayrıldığı yer burası. Orada kaynak JSON'du ve düzeltme
 * ayrı bir dosyada durup tohumlamada bindiriliyordu. Beceri içeriği ise
 * TypeScript ve **derlemeye gömülü** (bkz. lib/skills/bundled.ts): PWA
 * çevrimdışı çalışsın diye veritabanı gerektirmiyor. Dolayısıyla düzeltmenin
 * gideceği yer kaynağın kendisi.
 *
 * Ajanların 150 KB'lık TypeScript dosyalarını elle düzenlemesi istenmedi:
 * aynı dosyada çalışan iki ajan birbirinin yazdığını siler ve bu sessizce
 * olur. Onun yerine ajanlar JSON üretiyor, yazma işini bu betik yapıyor —
 * tek bir yerde, biçimi belli, doğrulanabilir.
 *
 * Yazma satır düzeyinde ve muhafazakâr: yalnızca `{ de: "…", tr: "…" }`
 * kalıbına birebir uyan satırlara ve konuşma görevlerindeki `tr:` satırına
 * dokunuyor. Kalıbı tanımadığı hiçbir satırı değiştirmiyor; tanınmayan varsa
 * sayısını bildirip yazmayı iptal ediyor.
 *
 * Sonunda doğrulama var: içerik yeniden yüklenip üretilen JSON ile
 * karşılaştırılıyor. Yazdığını okumadan "tamam" demiyor.
 */

const ROOT = process.cwd();
const OUT = path.join(ROOT, "data", "skills", "out");
const CONTENT = path.join(ROOT, "src", "lib", "skills", "content");
const HEDEF = (process.argv[2] ?? "all").toLowerCase();
const DRY = process.argv.includes("--dry");

type Alan = { de: string; tr: string; en?: string; hd?: string; note?: string };
type Kayit = {
  id: string;
  gloss?: Alan[];
  phrases?: Alan[];
  targets?: Alan[];
  tasks?: Alan[];
};

/** Bir egzersizin bütün alanları: `de` → yeni değerler. */
type Sozluk = Map<string, Alan>;

function oku(filtre: string): Map<string, Sozluk> {
  const out = new Map<string, Sozluk>();
  if (!existsSync(OUT)) return out;
  for (const f of readdirSync(OUT)
    .filter((f) => f.endsWith(".json"))
    .sort()) {
    const slug = f.replace(/\.json$/, "");
    if (filtre !== "all" && slug !== filtre && !slug.startsWith(`${filtre}-`))
      continue;
    for (const kayit of JSON.parse(
      readFileSync(path.join(OUT, f), "utf8"),
    ) as Kayit[]) {
      const s: Sozluk = out.get(kayit.id) ?? new Map();
      for (const alan of [
        kayit.gloss,
        kayit.phrases,
        kayit.targets,
        kayit.tasks,
      ]) {
        for (const a of alan ?? []) s.set(a.de, a);
      }
      out.set(kayit.id, s);
    }
  }
  return out;
}

/** TypeScript kaynağına gömülecek dize hâli. */
const lit = (s: string) => JSON.stringify(s);

/** `{ de: "…", tr: "…" }` — kaçışlı tırnakları da tanır. */
const TEK_SATIR =
  /^(\s*)\{\s*de:\s*("(?:[^"\\]|\\.)*")\s*,\s*tr:\s*("(?:[^"\\]|\\.)*")\s*(?:,\s*en:\s*"(?:[^"\\]|\\.)*"\s*)?(?:,\s*hd:\s*"(?:[^"\\]|\\.)*"\s*)?(?:,\s*note:\s*"(?:[^"\\]|\\.)*"\s*)?,?\s*\},?\s*$/;
const ID_SATIRI = /^\s*id:\s*"([^"]+)",\s*$/;
const DE_SATIRI = /^(\s*)de:\s*("(?:[^"\\]|\\.)*"),\s*$/;
const TR_SATIRI = /^(\s*)tr:\s*("(?:[^"\\]|\\.)*"),\s*$/;

function yaz(dosya: string, sozlukler: Map<string, Sozluk>) {
  const satirlar = readFileSync(dosya, "utf8").split("\n");
  let exId: string | null = null;
  let sonDe: string | null = null;
  let degisen = 0;
  const cikti: string[] = [];

  for (const satir of satirlar) {
    const idm = satir.match(ID_SATIRI);
    if (idm) {
      exId = idm[1];
      sonDe = null;
      cikti.push(satir);
      continue;
    }
    const s = exId ? sozlukler.get(exId) : undefined;

    const tekm = satir.match(TEK_SATIR);
    if (tekm && s) {
      const de = JSON.parse(tekm[2]) as string;
      const yeni = s.get(de);
      if (yeni) {
        const parca = [`de: ${lit(de)}`, `tr: ${lit(yeni.tr)}`];
        if (yeni.en) parca.push(`en: ${lit(yeni.en)}`);
        if (yeni.hd) parca.push(`hd: ${lit(yeni.hd)}`);
        if (yeni.note) parca.push(`note: ${lit(yeni.note)}`);
        cikti.push(`${tekm[1]}{ ${parca.join(", ")} },`);
        degisen++;
        continue;
      }
    }

    // Konuşma görevi: `de:` ve `tr:` ayrı satırlarda, arada başka alan yok.
    const dem = satir.match(DE_SATIRI);
    if (dem) {
      sonDe = JSON.parse(dem[2]) as string;
      cikti.push(satir);
      continue;
    }
    const trm = satir.match(TR_SATIRI);
    if (trm && sonDe && s) {
      const yeni = s.get(sonDe);
      if (yeni) {
        cikti.push(`${trm[1]}tr: ${lit(yeni.tr)},`);
        if (yeni.en) cikti.push(`${trm[1]}en: ${lit(yeni.en)},`);
        degisen++;
        sonDe = null;
        continue;
      }
    }
    // `en:` satırı zaten varsa ve yeniden yazıyorsak tekrarı önle.
    if (/^\s*en:\s*"/.test(satir) && sonDe === null && degisen) continue;

    cikti.push(satir);
  }

  return { metin: cikti.join("\n"), degisen };
}

async function main() {
  try {
    execFileSync("node", ["data/skills/check.mjs", HEDEF], {
      stdio: "inherit",
    });
  } catch {
    console.error("\nDenetleyici hata bildirdi — yazma yapılmadı.");
    process.exit(1);
  }

  const sozlukler = oku(HEDEF);
  if (!sozlukler.size) {
    console.log("Uygulanacak egzersiz yok.");
    return;
  }
  const beklenen = [...sozlukler.values()].reduce((s, m) => s + m.size, 0);
  console.log(
    `\n${sozlukler.size} egzersiz, ${beklenen} alan${DRY ? " (deneme)" : ""}.`,
  );

  let toplam = 0;
  const yazilacak: [string, string][] = [];
  for (const f of readdirSync(CONTENT).filter((f) => f.endsWith(".ts"))) {
    const yol = path.join(CONTENT, f);
    const { metin, degisen } = yaz(yol, sozlukler);
    if (!degisen) continue;
    toplam += degisen;
    yazilacak.push([yol, metin]);
    console.log(`  ${f}: ${degisen} alan`);
  }

  if (toplam !== beklenen) {
    console.error(
      `\nUYUŞMAZLIK: ${beklenen} alan bekleniyordu, ${toplam} satır eşleşti. ` +
        `Kaynakta tanınmayan biçim var — yazma iptal.`,
    );
    process.exit(1);
  }
  if (DRY) return;

  for (const [yol, metin] of yazilacak) writeFileSync(yol, metin);

  // Yazdığını oku: içerik yeniden yüklenip üretilen JSON ile karşılaştırılıyor.
  const dump = path.join(ROOT, "data", "skills", ".verify.json");
  execFileSync(
    "npx",
    [
      "tsx",
      "-e",
      `import { BUNDLED_EXERCISES } from "./src/lib/skills/bundled";
       import { writeFileSync } from "node:fs";
       writeFileSync(${JSON.stringify(dump)}, JSON.stringify(BUNDLED_EXERCISES));`,
    ],
    { cwd: ROOT, stdio: ["ignore", "ignore", "inherit"] },
  );
  const yuklenen = JSON.parse(readFileSync(dump, "utf8")) as Record<
    string,
    unknown
  >[];
  const sapma: string[] = [];
  for (const e of yuklenen as any[]) {
    const s = sozlukler.get(e.id as string);
    if (!s) continue;
    const hepsi: Alan[] = [
      ...(e.gloss ?? []),
      ...(e.targets ?? []),
      // Konuşma görevlerinin `de` alanı var; yazma görevlerinin yok, onların
      // sözlükçesi `phrases` içinde duruyor.
      ...(e.skill === "speaking" ? (e.tasks ?? []) : []),
      ...(e.skill === "writing"
        ? (e.tasks ?? []).flatMap((t: any) =>
            t.kind === "free" ? (t.phrases ?? []) : [],
          )
        : []),
    ];
    for (const a of hepsi) {
      const y = s.get(a.de);
      if (!y) continue;
      // Dört alan da karşılaştırılıyor. Önce yalnızca `tr` ile `en` bakılıyordu
      // ve bu, Züritüütsch'ün tam da yeni olan kısmını doğrulama dışında
      // bırakıyordu: `hd` köprüsü ya da `note` yazılmasa doğrulama yine
      // "tamam" derdi. Yazdığını okumayan doğrulama doğrulama değil.
      for (const alan of ["tr", "en", "hd", "note"] as const) {
        if ((y[alan] ?? null) !== ((a[alan] as string | undefined) ?? null))
          sapma.push(
            `${e.id} ${a.de} · ${alan}: yazılan "${a[alan] ?? "—"}" ≠ beklenen "${y[alan] ?? "—"}"`,
          );
      }
    }
  }
  if (sapma.length) {
    console.error(`\nDOĞRULAMA BAŞARISIZ (${sapma.length} sapma):`);
    sapma.slice(0, 10).forEach((s) => console.error("  " + s));
    process.exit(1);
  }

  console.log(
    `Uygulama tamam: ${toplam} alan yazıldı ve geri okunarak doğrulandı.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
