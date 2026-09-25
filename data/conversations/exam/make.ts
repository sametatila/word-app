/**
 * Modül sınavı kâğıtlarını paketler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/conversations/exam/make.ts`
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
import { courseExams } from "@/lib/conversations/module-exam";
import type { ModuleExamPlan } from "@/lib/conversations/module-exam/types";

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

/**
 * Çıkarıcı KURSA GÖRE — iki yön de aynı gövdeyi kullanıyor.
 *
 * `exam/` Almanca kursun Türkçesini İNGİLİZCEYE bağlıyor; kardeşi
 * `exam-de/` İngilizce kursun Türkçesini ALMANCAYA. Alanlar, anahtar biçimi
 * ve sıralama kuralı ikisinde de aynı; değişen yalnız hangi kursun kâğıtları
 * taranıyor ve `de` alanının hangi dili taşıdığı (adı tarihsel: "ölçülen
 * dildeki eş", bkz. `module-exam/en/a1.ts` başlığı). İkinci bir kopya
 * yazmak, iki çıkarıcının ayrı ayrı eskimesi demekti — sözlükçe hattında
 * tam bu olmuştu.
 */
export function extractExamFor(course: string, withGlosses = false): ExamRow[] {
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

  /* TEK KURSUN KÂĞITLARI. Bu hat Türkçeyi İNGİLİZCEYE çeviriyor, yani
     okuyucusu anadili İngilizce olan kullanıcı — o da yalnız Almanca kursu
     alıyor (`PAIR_READY.en`). İngilizce kursun kâğıtları buraya girseydi hiç
     okunmayacak ~1.500 dize hem sözlüğe hem kapsam kapısına binerdi; onların
     Almanca karşılığı kardeş hatta: `data/conversations/exam-de/`. */
  for (const p of courseExams(course) as ModuleExamPlan[]) {
    const at = `${p.code} ${p.titleDe}`;
    add("plan.title", p.titleTr, p.titleDe, at);
    for (const f of p.focus) add("focus", f.tr, f.de, at);
    /* `canDo` VE `writing.phrases` YALNIZ BİR YÖNDE ÇIKARILIYOR.
       Almanca kursun kâğıtlarında iki alanın da `en` karşılığı ZATEN dolu
       (290'ın 290'ı), yani İngilizceye çevirmek için sözlük gerekmiyor ve
       yazdırmak iki ayrı doğruluk kaynağı olurdu. İngilizce kursta ise `en`
       alanı hedef dilin kendisi (`de` ile aynı dize), yani Almanca okur için
       bir karşılık YOK — o yüzden bu yönde ikisi de sözlüğe giriyor.
       `resolveExam` hep-ya-hiç: biri eksik kalırsa kâğıt tümden Türkçeye
       düşer. */
    if (withGlosses) {
      for (const c of p.canDo) add("cando", c.tr, c.de, at);
      for (const g of p.writing.phrases) add("phrase", g.tr, g.de, `${at} · yazma kalıbı`);
    }
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

/** Bu hattın yönü: Almanca kursun kâğıtları → İngilizce sözlük. */
export function extractExam(): ExamRow[] {
  return extractExamFor("de");
}

/* Yol SONUNA KADAR karşılaştırılıyor: kardeş hat bu modülü içe alıyor ve
   yalnız "make.ts" ile biten bir kontrol iki çıkarıcıyı birden çalıştırıp
   ötekinin paketlerini de yeniden yazıyordu. */
if (process.argv[1]?.endsWith("exam/make.ts")) {
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
