/**
 * Almanca takas tablosunu denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/lessons/swap/check.ts`
 *
 * KARDEŞ HATLARDAN FARKI: burada çeviri yok. `en.json` bir KARAR TABLOSU —
 * öğrenciye kendisi hakkında yanlış bir şey söyleten Almanca cümleleri
 * İngilizce konuşan öğrenci için değiştiriyor. On bir satır, beş ders.
 *
 * Kapının tek işi tablonun kaynakla TUTMASI. Bir ders düzenlendiğinde
 * takas edilecek dize kayarsa takas sessizce hiçbir şey yapmaz ve öğrenci
 * yine "Ich komme aus der Türkei" der. Sessiz kalmak en kötüsü olduğu için
 * kapı her `from` dizesinin kaynakta GERÇEKTEN durduğunu ölçüyor.
 *
 * İkinci ölçüt: takas yeni bir Türkçe/Türkiye izi bırakmamalı. `to`
 * tarafında Türkiye kalırsa satır yazılmış ama işini yapmamış demektir.
 */
import { readFileSync } from "node:fs";
import { LESSONS } from "@/lib/lessons";
import type { Segment } from "@/lib/lessons/types";
import { resolveSegments, type NativeDict } from "@/lib/lessons/native";

type Row = { lesson: string; why: string; de: [string, string][]; en: [string, string][] };

const DIR = new URL(".", import.meta.url).pathname;
const rows = JSON.parse(readFileSync(`${DIR}en.json`, "utf8")) as Row[];
const dict = JSON.parse(
  readFileSync("src/lib/lessons/generated/native-en.json", "utf8"),
) as NativeDict;
const SEP = String.fromCharCode(0);

/*
  İKİ SÖZLÜK. `raw` takas UYGULANMADAN çözüyor: `from` dizesinin gerçekten
  var olduğu ancak orada görülebilir. `dict` takaslı: iz kalıp kalmadığı
  ancak orada görülebilir. Tek sözlükle ölçülseydi kapı ya her `from`u
  "yok" sayardı (takas onları çoktan değiştirmiş olurdu) ya da hiçbir izi
  yakalayamazdı.
*/
const raw: NativeDict = { ...dict, swap: {}, swapEn: {} };

const errors: string[] = [];
const warnings: string[] = [];
const H = (m: string) => errors.push(`  ${m}`);
const U = (m: string) => warnings.push(`  ${m}`);
/** `to` tarafında kalmış Türkiye izi — takas yazılmış ama işini yapmamış. */
const LEFTOVER = /Türk|Turkish|Turkey|Izmir|Istanbul|Ankara/i;

/** Satırın Almanca takasını uygular — senaryo taraması için. */
const sw = (r: Row, x: string): string => r.de.find(([f]) => f === x)?.[1] ?? x;

let de = 0;
let en = 0;
for (const r of rows) {
  const lesson = LESSONS.find((l) => l.id === r.lesson);
  if (!lesson) {
    H(`[${r.lesson}] ders yok`);
    continue;
  }
  if (!r.why?.trim()) H(`[${r.lesson}] gerekçe yazılmamış`);

  /* Kaynaktaki bütün Almanca dizeler: anlatım parçaları, tanıma hedefi,
     sözlükçe maddesi ve rol yapma açılışı. Takas hepsine uygulanacağı için
     kapı da hepsine bakıyor. */
  const source = new Set<string>();
  for (const st of lesson.lecture ?? []) {
    const e = st.expect as { hint?: Segment[]; why?: Segment[]; target?: string } | undefined;
    for (const segs of [st.say, e?.hint, e?.why])
      for (const s of segs ?? []) if (s.lang !== "tr") source.add(s.text);
    if (e?.target) source.add(e.target);
  }
  for (const v of lesson.vocab ?? []) source.add(v.de);
  const rp = lesson.roleplay as { opening?: string } | undefined;
  if (rp?.opening) source.add(rp.opening);

  for (const [from, to] of r.de) {
    de++;
    if (!source.has(from)) H(`[${r.lesson}] kaynakta yok: «${from}»`);
    if (LEFTOVER.test(to)) H(`[${r.lesson}] takas iz bırakıyor: «${to}»`);
    if (from === to) H(`[${r.lesson}] takas aynı: «${from}»`);
  }

  /* İngilizce taraf: çözülmüş anlatım parçaları ve sözlükçe karşılıkları.
     Almanca değişince onu ALINTILAYAN İngilizce satır da değişmeli. */
  const english = (d: NativeDict): Set<string> => {
    const set = new Set<string>();
    for (const st of lesson.lecture ?? []) {
      const e = st.expect as { hint?: Segment[]; why?: Segment[] } | undefined;
      for (const segs of [st.say, e?.hint, e?.why])
        for (const s of resolveSegments(d, lesson.id, segs ?? []) ?? [])
          if (s.lang === "en") set.add(s.text);
    }
    for (const v of lesson.vocab ?? []) {
      const g = d.vocab[lesson.id + SEP + v.de];
      if (g) set.add(d.swapEn[lesson.id + SEP + g] ?? g);
    }
    return set;
  };
  const before = english(raw);
  const after = english(dict);

  for (const [from, to] of r.en) {
    en++;
    if (!before.has(from)) H(`[${r.lesson}] çözülmüş İngilizcede yok: «${from}»`);
    if (LEFTOVER.test(to)) H(`[${r.lesson}] takas iz bırakıyor: «${to}»`);
  }

  /* Almanca takas edilip İngilizce alıntısı unutulmuş olabilir: takastan
     SONRA kalan her iz bildiriliyor. Bunlar `en` listesine girmeli. */
  for (const t of after) if (LEFTOVER.test(t)) H(`[${r.lesson}] İngilizcede iz kaldı: «${t}»`);

  /*
    ROL YAPMA SENARYOSU UYARI, HATA DEĞİL. `de-a1-sprachen`in senaryosu
    1:1 takasla düzelmiyor: muhatap "ich spreche Spanisch und Englisch.
    Sprichst du auch Englisch?" diyor ve sonra "Sprichst du Türkisch?"
    sorusunu bekliyor. Öğrencinin ana dili İngilizce olunca konuşma
    kendi kendini yiyor — "İngilizce biliyor musun?" sorusuna "o benim
    dilim" cevabı akışı bitirir. Burada gereken takas değil BAŞKA BİR
    SENARYO. Kapı bunu susarak geçmiyor ama iş bitene kadar da
    durdurmuyor: bilinen ve yazılı bir açık.
  */
  const sc = (lesson.roleplay as unknown as { script?: { ask: string; replies?: { say: string }[]; fallback?: { say: string } }[] }).script;
  for (const t of sc ?? []) {
    for (const x of [t.ask, ...(t.replies ?? []).map((y) => y.say), t.fallback?.say])
      if (x && LEFTOVER.test(sw(r, x))) U(`[${r.lesson}] senaryoda iz kaldı: «${x}»`);
  }
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.join("\n"));
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.join("\n"));
}
console.log(
  `\nözet: ${rows.length} ders · ${de} Almanca · ${en} İngilizce takas · ${errors.length} hata · ${warnings.length} uyarı`,
);
process.exit(errors.length ? 1 : 0);
