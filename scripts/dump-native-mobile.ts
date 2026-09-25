/**
 * Ana dil çözücüsünü ve sözlüğünü mobil pakete döker — KAYNAKTAN.
 *
 * Kullanım: npx tsx scripts/dump-native-mobile.ts
 *
 * NEDEN İKİNCİ BİR KOPYA DEĞİL DE DÖKÜM. Mobil `src/`i göremiyor ve
 * `resolveConversation` / `resolveExercise` / `resolveMockPaper` orada da lazım.
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
 * içe aktarımı (`Conversation`/`LectureStep`/`Segment` ve `DialogueTurn`).
 * Gerçek tip dosyası `CefrLevel` üzerinden sunucu tarafının ağır ağacını
 * çekiyor; mobil kopyaya onun girmesi anlamsız. Çözücü zaten YAPISAL
 * okuyor (`ExamShape`, `MockShape`, `ExerciseShape` hep öyle yazıldı), o
 * yüzden döküm bu dört tipi kendi başına tanımlıyor.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src/lib/conversations/native.ts");
const DICT = join(ROOT, "src/lib/conversations/generated/native-en.json");
const OUT_TS = join(ROOT, "mobile/src/lib/native.ts");
const OUT_DIR = join(ROOT, "mobile/src/data/native");
const OUT_JSON = join(OUT_DIR, "en.json");

/* ALMANCA YÖN — ayrı çözücü, ayrı sözlük, aynı döküm kuralı. Anadili
   Almanca olan kullanıcı İNGİLİZCE kursu alıyor ve o dersler kendi kendine
   yeten JSON; `resolveConversation`ın şablon yapısı burada yok (gerekçe
   `src/lib/conversations/native-de.ts` başında). Beceri ve kâğıt için ikinci bir
   çözücü GEREKMİYOR: `resolveExercise`/`resolveMockPaper` yalnız
   `prose`/`mock` alanlarına bakıyor ve Almanca sözlükte o iki alan aynı
   biçimde duruyor — mobil de aynı işlevi çağırıyor. */
const SRC_DE = join(ROOT, "src/lib/conversations/native-de.ts");
const DICT_DE = join(ROOT, "src/lib/conversations/generated/native-de.json");
const OUT_TS_DE = join(ROOT, "mobile/src/lib/native-de.ts");
const OUT_JSON_DE = join(OUT_DIR, "de.json");

const IMPORTS = [
  'import type { Conversation, LectureStep, Segment } from "./types";',
  'import type { DialogueTurn } from "@/lib/dialogue";',
];
/* Almanca çözücünün tek bağımlılığı iki tip ve ikisi de kardeş dökümde
   ZATEN tanımlı — mobilde `./native`ten geliyor, ikinci bir kopya yok. */
const IMPORT_DE = 'import type { Conversation, Segment } from "./types";';
const IMPORT_DE_MOBILE = 'import type { Conversation, Segment } from "./native";';

const PRELUDE = `/* ÜRETİLEN DOSYA — ELLE DEĞİŞTİRME.
   Kaynak: src/lib/conversations/native.ts
   Üretici: npx tsx scripts/dump-native-mobile.ts
   Değişiklik kaynakta yapılır ve betik yeniden koşturulur. */

/* Çözücünün okuduğu dört tip, yapısal olarak. Gerçekleri
   \`src/lib/conversations/types.ts\` ve \`src/lib/dialogue.ts\` içinde; oradan içe
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
export type Conversation = {
  id: string;
  titleTr: string;
  summary: string;
  vocab: { de: string; tr: string }[];
  patterns: { de: string; tr: string }[];
  lecture: LectureStep[];
  chat: {
    scene: string;
    partner: string;
    opening: string;
    openingTr: string;
    goal: string;
    minTurns?: number;
  };
};
`;

/* Almanca çözücünün başlığı: tipleri kardeş dökümden alıyor, o yüzden
   kendi tip bloğu yok. */
const PRELUDE_DE = `/* ÜRETİLEN DOSYA — ELLE DEĞİŞTİRME.
   Kaynak: src/lib/conversations/native-de.ts
   Üretici: npx tsx scripts/dump-native-mobile.ts
   Değişiklik kaynakta yapılır ve betik yeniden koşturulur. */
`;

/**
 * Dökümün İÇERİĞİ — dosyaya yazmadan.
 *
 * `check:dumps` bunu çağırıp yazılmış dosyalarla BAYT BAYT karşılaştırıyor.
 * Öteki üç döküm yalnız kimlik kümesini karşılaştırıyor (metin sürekli
 * değişiyor ve tam eşitlik yarım kalmış her işte kırmızı yanardı); burada
 * tam eşitlik doğru ölçüt, çünkü iki dosya da tümüyle türetilmiş.
 */
export function buildNativeDump(): {
  ts: string;
  json: string;
  tsDe: string;
  jsonDe: string;
  lines: number;
} {
  let src = readFileSync(SRC, "utf8");
  for (const line of IMPORTS) {
    if (!src.includes(line)) throw new Error(`beklenen içe aktarım yok: ${line}`);
    src = src.replace(`${line}\n`, "");
  }
  let srcDe = readFileSync(SRC_DE, "utf8");
  if (!srcDe.includes(IMPORT_DE)) throw new Error(`beklenen içe aktarım yok: ${IMPORT_DE}`);
  srcDe = srcDe.replace(IMPORT_DE, IMPORT_DE_MOBILE);
  return {
    ts: PRELUDE + "\n" + src,
    json: readFileSync(DICT, "utf8"),
    tsDe: PRELUDE_DE + "\n" + srcDe,
    jsonDe: readFileSync(DICT_DE, "utf8"),
    lines: src.split("\n").length + srcDe.split("\n").length,
  };
}

export const NATIVE_DUMP_FILES = {
  ts: OUT_TS.replace(ROOT + "/", ""),
  json: OUT_JSON.replace(ROOT + "/", ""),
  tsDe: OUT_TS_DE.replace(ROOT + "/", ""),
  jsonDe: OUT_JSON_DE.replace(ROOT + "/", ""),
};

if (process.argv[1]?.endsWith("dump-native-mobile.ts")) {
  const out = buildNativeDump();
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_TS, out.ts);

  writeFileSync(OUT_TS_DE, out.tsDe);


  /* SÖZLÜKLER ARTIK YAZILMIYOR: mobil paketten çıktılar ve içerik hattından
     iniyorlar (`content:publish` → `native/en`, `native/de`). Buradan yalnız
     ÇÖZÜCÜLER dökülüyor; onlar kod ve pakette kalıyor.
     `buildNativeDump` sözlükleri yine döndürüyor — `content:publish` onları
     oradan alıyor, yani projeksiyon hâlâ tek yerde. */
  const mb = (bytes: number) => (bytes / 1024 / 1024).toFixed(2);
  const n = (o: Record<string, unknown>) => Object.keys(o).length;
  const say = (json: string) =>
    Object.entries(JSON.parse(json) as Record<string, Record<string, unknown>>)
      .map(([k, v]) => `  ${k} ${n(v)}`)
      .join(" ·");
  console.log(
    `çözücüler yazıldı  ${NATIVE_DUMP_FILES.ts} + ${NATIVE_DUMP_FILES.tsDe}  (${out.lines} satır)\n` +
      `sözlük (yayına gider, pakete değil)  en ${mb(Buffer.byteLength(out.json))} MB\n` +
      say(out.json) +
      `\nsözlük (yayına gider, pakete değil)  de ${mb(Buffer.byteLength(out.jsonDe))} MB\n` +
      say(out.jsonDe),
  );
}
