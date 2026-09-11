/**
 * MOBİL PAKET KAYNAKLA AYNI İÇERİĞİ TAŞIYOR MU.
 *
 * Üç içerik köprüsü web kaynağından mobil pakete dökülüyor (`dump-lessons-
 * mobile`, `dump-skills-mobile`, `dump-mock-exams-mobile`). Döküm ELLE
 * çalıştırılıyor: kaynağa yeni bir ders/egzersiz/kâğıt eklenip döküm
 * yenilenmezse mobil paket o içeriği sessizce taşımaz. Sonuç ekranda görünür -
 * Patika'da açılamayan bir ünite, listede olmayan bir kâğıt - ama hiçbir kapı
 * söylemez.
 *
 * Bu betik KİMLİK KÜMESİNİ karşılaştırıyor, içeriği değil. Sebep: içerik
 * metni sürekli değişiyor (çeviri hattı, anlatım adımları) ve tam eşitlik
 * isteyen bir kapı yarım kalmış her işte kırmızı yanardı. Kimlik kümesi ise
 * yalnız GERÇEK eksik varken ayrışıyor.
 *
 *   npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/check-dumps.ts
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { LESSONS } from "../src/lib/lessons";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { mockPapersFor } from "../src/lib/mock-exams";
import type { MockLevel } from "../src/lib/mock-exams/types";
import { buildNativeDump, NATIVE_DUMP_FILES } from "./dump-native-mobile";

const ROOT = path.join(__dirname, "..");
const read = (p: string) => JSON.parse(readFileSync(path.join(ROOT, p), "utf8")) as unknown;
const rows = (v: unknown): { id?: string }[] => (Array.isArray(v) ? (v as { id?: string }[]) : [v as { id?: string }]);

/** Bir dosya kümesindeki `id` alanlarını toplar; dosya yoksa atlar. */
function ids(files: string[]): Set<string> {
  const out = new Set<string>();
  for (const f of files) {
    let parsed: unknown;
    try {
      parsed = read(f);
    } catch {
      continue; // kurs paketi henüz yoksa (ör. yeni kurs) kümeye katkısı olmaz
    }
    for (const r of rows(parsed)) if (r?.id) out.add(r.id);
  }
  return out;
}

const LEVELS: MockLevel[] = ["A1", "A2", "B1", "B2", "C1"];
let fails = 0;

function compare(label: string, web: Set<string>, mob: Set<string>) {
  const onlyWeb = [...web].filter((x) => !mob.has(x)).sort();
  const onlyMob = [...mob].filter((x) => !web.has(x)).sort();
  if (!web.size || !mob.size) {
    fails++;
    console.error(`✗ ${label}: kume okunamadi (web ${web.size}, mobil ${mob.size})`);
    return;
  }
  if (!onlyWeb.length && !onlyMob.length) {
    console.log(`✓ ${label}: ${web.size} kimlik, iki tarafta ayni`);
    return;
  }
  fails++;
  console.error(`✗ ${label}: web ${web.size}, mobil ${mob.size}`);
  if (onlyWeb.length) console.error(`   dokumde EKSIK (${onlyWeb.length}): ${onlyWeb.slice(0, 8).join(", ")}${onlyWeb.length > 8 ? " …" : ""}`);
  if (onlyMob.length) console.error(`   dokumde FAZLA (${onlyMob.length}): ${onlyMob.slice(0, 8).join(", ")}${onlyMob.length > 8 ? " …" : ""}`);
  console.error("   dokumu yenile: npm run dump:lessons / dump:skills / dump:mock-exams (ve :en surumleri)");
}

const lessonFiles = ["de-a1", "de-a2", "de-b1", "de-b2", "de-c1", "en-a1", "en-a2", "en-b1", "en-b2", "en-c1"].map((n) => `mobile/src/data/lessons/${n}.json`);
compare("ders", new Set(LESSONS.map((l) => l.id)), ids(lessonFiles));

compare(
  "beceri egzersizi",
  new Set(BUNDLED_EXERCISES.map((e) => e.id)),
  ids(["mobile/src/data/skills/exercises.json", "mobile/src/data/skills/exercises-en.json"]),
);

compare(
  "deneme kagidi",
  new Set(LEVELS.flatMap((l) => [...mockPapersFor(l, "de"), ...mockPapersFor(l, "en")]).map((p) => p.id)),
  ids(["mobile/src/data/exams/papers.json", "mobile/src/data/exams/papers-en.json"]),
);

/*
  ANA DİL DÖKÜMÜ — burada ölçüt KİMLİK DEĞİL, BAYT EŞİTLİĞİ.

  Ötekilerde gevşek ölçüt doğruydu: içerik metni sürekli değişiyor ve tam
  eşitlik yarım kalmış her işte kırmızı yanardı. Burada iki dosya da tümüyle
  TÜRETİLMİŞ (çözücünün kopyası + sözlük), yani kaynakla aynı olmamaları
  ancak dökümün unutulması demek. Unutulursa mobil eski çözücüyle çalışır ve
  hata ekranda görünmez: yeni yazılmış bir çeviri sessizce Türkçe kalır.
*/
{
  const want = buildNativeDump();
  for (const [label, file, body] of [
    ["ana dil çözücüsü", NATIVE_DUMP_FILES.ts, want.ts],
    ["ana dil sözlüğü", NATIVE_DUMP_FILES.json, want.json],
    ["Almanca çözücü", NATIVE_DUMP_FILES.tsDe, want.tsDe],
    ["Almanca sözlük", NATIVE_DUMP_FILES.jsonDe, want.jsonDe],
  ] as const) {
    let have: string | null = null;
    try {
      have = readFileSync(path.join(ROOT, file), "utf8");
    } catch {
      have = null;
    }
    if (have === body) {
      console.log(`✓ ${label}`);
      continue;
    }
    fails++;
    console.error(`✗ ${label}: ${have === null ? "dosya yok" : "kaynakla ayrışmış"} (${file})`);
    console.error("   dokumu yenile: npm run dump:native");
  }
}

console.log(fails === 0 ? "\nDOKUMLER KAYNAKLA AYNI\n" : `\n${fails} DOKUM AYRISMASI\n`);
process.exit(fails === 0 ? 0 : 1);
