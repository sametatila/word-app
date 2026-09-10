/**
 * Modül sınavı kâğıtlarını paketler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/lessons/exam/make.ts`
 *
 * KARDEŞ HATLARDAN TEK FARKI: bu çıkarıcı TypeScript ve kaynağı IMPORT
 * ediyor, düzenli ifadeyle taramıyor. Sebep veri yapısı: 58 kâğıt, on üç
 * ayrı alan, iç içe nesneler ve `tr:` adı beş ayrı yerde geçiyor
 * (`focus.tr`, `canDo.tr`, `turns.tr`, `questions.tr`, `speaking.tr`).
 * Alan adına bakan bir tarama bunları ayıramaz; ayıramayınca da bir
 * kısmı sessizce düşer. Senaryo hattında tam bu yüzden hiçbir şey
 * bulunamamıştı — orada da alan adı yoktu, sırası vardı.
 *
 * `canDo` DIŞARIDA. `ExamCando` tipinde `en` alanı ZATEN var ve 290'ın
 * 290'ı dolu: kâğıtları yazan taraf İngilizceyi baştan düşünmüş. Onları
 * yeniden yazdırmak hem israf hem de iki ayrı doğruluk kaynağı olurdu.
 *
 * BAĞLAM ALMANCA KARŞILIK. Sınav metninin çoğu bir Almanca eşi olan
 * Türkçe: replik, soru kökü, konuşma cümlesi, ölçülen yapı. Türkçesi tek
 * başına çevrilebilir ama Almancasıyla birlikte DOĞRU çevrilebilir —
 * "Wie hoch sind die Gebühren?" ile eşleşen "Ücretler ne kadar?" farklı
 * bir şey söylemez, ama "geçmiş" gibi bir sözcük eşi olmadan üç ayrı
 * şeye çevrilebilirdi.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { MODULE_EXAMS } from "@/lib/lessons/module-exam";
import type { ModuleExamPlan } from "@/lib/lessons/module-exam/types";

const DIR = new URL(".", import.meta.url).pathname;

export type ExamRow = {
  tr: string;
  kind: string;
  n: number;
  /** Almanca eşi, varsa — çevirinin dayanağı. */
  de: string[];
  ctx: string[];
  /**
   * Soru kökünün ALMANCA şıkları. Kapı bunları kullanıyor: çeviri şıkkı
   * ele verirse soru ölçmeyi bırakır.
   */
  options?: string[];
};

export function extractExam(): ExamRow[] {
  const rows = new Map<string, ExamRow>();
  const add = (kind: string, tr: string | undefined, de: string | null, ctx: string, options?: string[]) => {
    if (typeof tr !== "string" || !tr.trim()) return;
    const r = rows.get(tr) ?? { tr, kind, n: 0, de: [], ctx: [] };
    r.n++;
    if (de && !r.de.includes(de) && r.de.length < 3) r.de.push(de);
    if (r.ctx.length < 3) r.ctx.push(ctx);
    if (options) r.options = [...new Set([...(r.options ?? []), ...options])];
    rows.set(tr, r);
  };

  for (const p of Object.values(MODULE_EXAMS).flat() as ModuleExamPlan[]) {
    const at = `${p.code} ${p.titleDe}`;
    add("plan.title", p.titleTr, p.titleDe, at);
    for (const f of p.focus) add("focus", f.tr, f.de, at);
    add("listening.title", p.listening.titleTr, p.listening.title, at);
    add("listening.situation", p.listening.situation, null, `${at} · dinleme`);
    for (const t of p.listening.turns) add("turn", t.tr, t.de, `${at} · ${t.speaker}`);
    for (const q of p.listening.questions) add("question", q.tr, q.de, `${at} · dinleme sorusu`, q.options);
    add("reading.title", p.reading.titleTr, p.reading.title, at);
    add("reading.genre", p.reading.genre, null, `${at} · okuma türü`);
    for (const q of p.reading.questions) add("question", q.tr, q.de, `${at} · okuma sorusu`, q.options);
    for (const s of p.speaking) {
      add("speaking.situation", s.situation, null, `${at} · konuşma`);
      add("speaking", s.tr, s.de, `${at} · konuşma`);
    }
    add("writing.prompt", p.writing.prompt, null, `${at} · yazma`);
    for (const c of p.writing.checklist) add("writing.checklist", c, null, `${at} · yazma`);
  }

  // Sıklık azalan; eşitlikte kısa önce, sonra alfabetik — sıra KARARLI
  // olmalı, yoksa paketler her `make`te kayar ve yazılanlar tutmaz.
  return [...rows.values()].sort(
    (a, b) => b.n - a.n || a.tr.length - b.tr.length || a.tr.localeCompare(b.tr, "tr"),
  );
}

if (process.argv[1]?.endsWith("make.ts")) {
  const rows = extractExam();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 150;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `e-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const kinds = rows.reduce<Record<string, number>>((a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a), {});
  console.log(
    `${rows.length} benzersiz dize · ${n} paket\n` +
      Object.entries(kinds)
        .sort((a, b) => b[1] - a[1])
        .map(([k, v]) => `${k} ${v}`)
        .join(" · "),
  );
}
