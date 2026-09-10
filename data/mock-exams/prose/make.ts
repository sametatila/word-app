/**
 * Deneme kâğıtlarının TÜRKÇE alanlarını paketler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/mock-exams/prose/make.ts`
 *
 * Bu, ana dil ekseninin ders anlatımından sonraki EN BÜYÜK kalemi ve
 * bugüne kadar hiç ölçülmemişti: 60 Almanca kâğıtta 6.627 benzersiz Türkçe
 * dize. Ders ekseninin sınav hattı (1.781) bunun dörtte biri kadardı.
 *
 * NEDEN AYRI BİR HAT. Kaynağı ayrı (`MOCK_PAPERS`, ders ya da beceri
 * değil), birimi ayrı (kâğıt) ve bağlamı ayrı: bir `explain` maddenin
 * kökünü ve doğru şıkkını görmeden çevrilemez, bir `expect` karşı tarafın
 * söylediği repliği görmeden çevrilemez. Üç hat da aynı desende
 * (`make` → `in/` → elle yazılan `out/` → `check`) ama sözlükleri ayrı.
 *
 * SÖZLÜKÇE HATTIN DIŞINDA. `gloss` maddelerinin 857'sinin 857'sinde `en`
 * ZATEN dolu; çözücü onu katlıyor (`tr` ← `en`). Beceri ekseninde aynı
 * karar verildi ve orada 125 eksik ortaya çıkarmıştı — burada eksik yok.
 *
 * KAPSAM DIŞI ve bilerek: `body`, `segments[].text`, `title`, `genre`,
 * `sample`, `de` alanları ve şıklar. Hepsi ÖĞRENİLEN dilde; çevrilirse
 * kâğıt ölçtüğü şeyi ölçmez.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { MOCK_PAPERS } from "@/lib/mock-exams";

const DIR = new URL(".", import.meta.url).pathname;

/**
 * Tür sırası — paket sınırlarını bu belirliyor.
 *
 * Küçükten büyüğe: hat ilk paketlerde ucuz ve bağlamı dar satırlarla
 * sınanıyor, `explain` (3.060 satırla hattın yarısı) en sona kalıyor.
 * Sıra KARARLI olmak zorunda; değişirse paketler kayar.
 */
export const KINDS = [
  "themeTr",
  "instructionTr",
  "genreTr",
  "exchange.expect",
  "exchange.hint",
  "exchange.tr",
  "promptTr",
  "rubric.points.tr",
  "situation",
  "rubric.criteria",
  "explain",
] as const;

export type MockKind = (typeof KINDS)[number];

export type MockRow = {
  tr: string;
  kind: MockKind;
  /** Kaç yerde geçiyor — sıralama buna göre. */
  n: number;
  /** Bağlam: kâğıt ve görev kimliği. En çok üç tane. */
  ctx: string[];
  /**
   * Satırın İLGİLİ OLDUĞU Almanca. `explain`de maddenin kökü ve doğru
   * şıkkı, `exchange`de karşı tarafın repliği, `rubric.points`te içerik
   * noktasının Almancası. Bunu görmeden çeviri bağlamsız kalır.
   */
  de?: string;
  /** Üst bağlam: görevin biçimi ve hedefi, ya da metnin türü. */
  q?: string;
};

type Any = Record<string, unknown>;
const str = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() ? v : undefined;

export function extractMock(): MockRow[] {
  const rows = new Map<string, MockRow>();
  const add = (kind: MockKind, tr: unknown, ctx: string, de?: string, q?: string) => {
    const t = str(tr);
    if (!t) return;
    const key = kind + "|" + t;
    const r = rows.get(key) ?? { tr: t, kind, n: 0, ctx: [] };
    r.n++;
    if (r.ctx.length < 3) r.ctx.push(ctx);
    if (de && !r.de) r.de = de;
    if (q && !r.q) r.q = q;
    rows.set(key, r);
  };

  for (const p of (MOCK_PAPERS as unknown as Any[]).filter((x) => ((x.course as string) ?? "de") === "de")) {
    const paper = `${p.id} ${p.level ?? ""}`.trim();
    add("themeTr", p.themeTr, paper);

    for (const part of (p.parts as Any[]) ?? []) {
      const at = `${paper} · ${part.skill ?? "?"}`;
      add("instructionTr", part.instructionTr, at);

      for (const t of (part.tasks as Any[]) ?? []) {
        const task = `${str(t.id) ?? at}`;
        const shape = [str(t.format), str(t.goal)].filter(Boolean).join(" · ");
        add("promptTr", t.promptTr, task, undefined, shape);

        /* Metnin türü: `genreTr` Almanca `genre` etiketinin Türkçesi, yani
           karşılık o etiketin İngilizcesi olacak. */
        const texts = (t.texts as Any[]) ?? [];
        for (const x of texts) {
          add("genreTr", x.genreTr, task, str(x.genre));
          add("situation", x.situation, task, str(x.genre), str(x.title));
        }

        /* AÇIKLAMA maddenin kökünü ve doğru cevabını istiyor. Kök alan adı
           maddenin türüne göre değişiyor (`text`, `source`, `prompt`), üçü
           de denenip ilk dolan alınıyor. */
        for (const it of (t.items as Any[]) ?? []) {
          const stem = str(it.text) ?? str(it.source) ?? str(it.prompt);
          const ans = Array.isArray(it.options) && typeof it.answer === "number"
            ? str((it.options as unknown[])[it.answer])
            : str(it.answer) ?? (Array.isArray(it.accept) ? str((it.accept as unknown[])[0]) : undefined);
          add("explain", it.explain, task, [stem, ans].filter(Boolean).join(" → "), shape);
        }

        const rubric = t.rubric as Any | undefined;
        if (rubric) {
          for (const c of (rubric.criteria as unknown[]) ?? []) add("rubric.criteria", c, task, undefined, shape);
          for (const pt of (rubric.points as Any[]) ?? []) add("rubric.points.tr", pt.tr, task, str(pt.de));
        }

        /* Konuşma: `you` adımının bağlamı BİR ÖNCEKİ `partner` repliği.
           Onsuz "bir öneri sun" gibi bir beklenti neyin üstüne kurulacağını
           söylemiyor. */
        let last: string | undefined;
        for (const x of (t.exchange as Any[]) ?? []) {
          if (x.who === "partner") {
            add("exchange.tr", x.tr, task, str(x.de));
            last = str(x.de);
            continue;
          }
          add("exchange.hint", x.hint, task, last);
          add("exchange.expect", x.expect, task, last);
        }
      }
    }
  }

  const rank = (r: MockRow) => KINDS.indexOf(r.kind);
  return [...rows.values()].sort(
    (a, b) =>
      rank(a) - rank(b) || b.n - a.n || a.tr.length - b.tr.length || a.tr.localeCompare(b.tr, "tr"),
  );
}

if (process.argv[1]?.endsWith("make.ts")) {
  const rows = extractMock();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 150;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `m-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const kinds = rows.reduce<Record<string, number>>((a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a), {});
  console.log(
    `${rows.length} benzersiz dize · ${n} paket\n` +
      KINDS.filter((k) => kinds[k]).map((k) => `${k} ${kinds[k]}`).join(" · "),
  );
}
