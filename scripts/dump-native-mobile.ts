/**
 * Ana dil çözücüsünü ve sözlüğünü mobil pakete döker — KAYNAKTAN.
 *
 * Kullanım: npx tsx scripts/dump-native-mobile.ts
 *
 * NEDEN İKİNCİ BİR KOPYA DEĞİL DE DÖKÜM. Mobil `src/`i göremiyor ve
 * `resolveLesson` / `resolveExercise` / `resolveMockPaper` orada da lazım.
 * İki seçenek vardı ve ikisi de ölçüldü:
 *
 *   çözülmüş ikinci paket (`exercises.en.json`, `de-a1.en.json`, …)  +8,40 MB
 *   sözlük + çözücü mobile taşınır                                   +4,62 MB
 *
 * İkincisi küçük çünkü Almanca içeriği İKİNCİ KEZ taşımıyor — yalnız
 * Türkçe→İngilizce eşlemelerini, tekilleştirilmiş. Bedeli çözücünün iki
 * yerde durması olurdu; döküm tam da onu ortadan kaldırıyor: mobil dosya
 * ELLE YAZILMIYOR, bu betik üretiyor. `taskSeconds` iki yerde elle duruyor
 * ve kural yazılı ("ikisi birlikte değişir"); burada kural gerekmiyor,
 * çünkü ikinci kopya kaynağın türevi.
 *
 * TİPLER SATIR İÇİNE ALINIYOR. `native.ts`in tek bağımlılığı iki TİP
 * içe aktarımı (`Lesson`/`LectureStep`/`Segment` ve `DialogueTurn`).
 * Gerçek tip dosyası `CefrLevel` üzerinden sunucu tarafının ağır ağacını
 * çekiyor; mobil kopyaya onun girmesi anlamsız. Çözücü zaten YAPISAL
 * okuyor (`ExamShape`, `MockShape`, `ExerciseShape` hep öyle yazıldı), o
 * yüzden döküm bu dört tipi kendi başına tanımlıyor.
 */
import { readFileSync, writeFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src/lib/lessons/native.ts");
const DICT = join(ROOT, "src/lib/lessons/generated/native-en.json");
const OUT_TS = join(ROOT, "mobile/src/lib/native.ts");
const OUT_DIR = join(ROOT, "mobile/src/data/native");
const OUT_JSON = join(OUT_DIR, "en.json");

const IMPORTS = [
  'import type { Lesson, LectureStep, Segment } from "./types";',
  'import type { DialogueTurn } from "@/lib/dialogue";',
];

const PRELUDE = `/* ÜRETİLEN DOSYA — ELLE DEĞİŞTİRME.
   Kaynak: src/lib/lessons/native.ts
   Üretici: npx tsx scripts/dump-native-mobile.ts
   Değişiklik kaynakta yapılır ve betik yeniden koşturulur. */

/* Çözücünün okuduğu dört tip, yapısal olarak. Gerçekleri
   \`src/lib/lessons/types.ts\` ve \`src/lib/dialogue.ts\` içinde; oradan içe
   aktarmak mobil pakete sunucu tarafının tip ağacını sokardı. */
export type Segment = { lang: "tr" | "de" | "en"; text: string };
export type Expectation =
  | { kind: "confirm" }
  | { kind: "repeat"; target: string }
  | { kind: "produce"; target: string; accept?: string[]; hint: Segment[] }
  | { kind: "truefalse"; statement: string; answer: boolean; why: Segment[] };
export type LectureStep = { say: Segment[]; expect?: Expectation };
export type DialogueReply = {
  match: string[];
  say: string;
  sayTr: string;
  next?: string;
  uses?: string[];
};
export type DialogueTurn = {
  id: string;
  ask: string;
  askTr: string;
  cue: string;
  replies: DialogueReply[];
  fallback: { say: string; sayTr: string; example: string };
};
export type Lesson = {
  id: string;
  titleTr: string;
  summary: string;
  vocab: { de: string; tr: string }[];
  patterns: { de: string; tr: string }[];
  lecture: LectureStep[];
  roleplay: {
    scene: string;
    partner: string;
    opening: string;
    openingTr: string;
    goal: string;
    minTurns?: number;
  };
};
`;

/**
 * Dökümün İÇERİĞİ — dosyaya yazmadan.
 *
 * `check:dumps` bunu çağırıp yazılmış dosyalarla BAYT BAYT karşılaştırıyor.
 * Öteki üç döküm yalnız kimlik kümesini karşılaştırıyor (metin sürekli
 * değişiyor ve tam eşitlik yarım kalmış her işte kırmızı yanardı); burada
 * tam eşitlik doğru ölçüt, çünkü iki dosya da tümüyle türetilmiş.
 */
export function buildNativeDump(): { ts: string; json: string; lines: number } {
  let src = readFileSync(SRC, "utf8");
  for (const line of IMPORTS) {
    if (!src.includes(line)) throw new Error(`beklenen içe aktarım yok: ${line}`);
    src = src.replace(`${line}\n`, "");
  }
  return {
    ts: PRELUDE + "\n" + src,
    json: readFileSync(DICT, "utf8"),
    lines: src.split("\n").length,
  };
}

export const NATIVE_DUMP_FILES = {
  ts: OUT_TS.replace(ROOT + "/", ""),
  json: OUT_JSON.replace(ROOT + "/", ""),
};

if (process.argv[1]?.endsWith("dump-native-mobile.ts")) {
  const out = buildNativeDump();
  writeFileSync(OUT_TS, out.ts);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_JSON, out.json);

  const mb = (p: string) => (statSync(p).size / 1024 / 1024).toFixed(2);
  const n = (o: Record<string, unknown>) => Object.keys(o).length;
  const parsed = JSON.parse(out.json) as Record<string, Record<string, unknown>>;
  console.log(
    `çözücü yazıldı  ${NATIVE_DUMP_FILES.ts}  (${out.lines} satır)\n` +
      `sözlük yazıldı  ${NATIVE_DUMP_FILES.json}  (${mb(OUT_JSON)} MB)\n` +
      Object.entries(parsed)
        .map(([k, v]) => `  ${k} ${n(v)}`)
        .join(" ·"),
  );
}
