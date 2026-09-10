/**
 * Beceri egzersizlerinin GÖREV METİNLERİNİ paketler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/skills/task/make.ts`
 *
 * `data/skills/prose/` hattı `intro` ve `questions.explain` alanlarını
 * kapattı; ölçüm o ikisinin beceri ekseninin YARISI olduğunu gösterdi.
 * Geri kalanı burada: yazma görevleri, söyleyiş drilleri, monolog ve dil
 * bilgisi anlatımı — 3.426 benzersiz dize.
 *
 * Ayrı bir hat, çünkü BAĞLAM ayrı. `explain` kendi başına okunabilen bir
 * cümle; `build.tr` ise bir Almanca cümlenin ANLAMI ve öğrenci onu
 * parçalardan kuruyor. Karşılık "doğru İngilizce" olmakla kalmaz, aynı
 * Almanca dizilişi ima etmek zorunda:
 *
 *   tr      "Benim adım Lena."
 *   answer  "Ich heiße Lena."
 *   en      "My name is Lena."        ✓ aynı üç parça
 *           "I'm called Lena."        ✗ öğrenci "heiße"yi bulamaz
 *
 * O yüzden her satır ilgili ALMANCAYI da taşıyor (`de`) ve kapı onu
 * kullanıyor. Paketler türe göre öbeklenmiş: bir pakette hep aynı tür var,
 * çünkü türler arası bağlam sıçraması yazan tarafı yavaşlatıyor.
 *
 * KAPSAM DIŞI ve bilerek:
 *   `stimulus` / `sample` / `source`  öğrencinin okuyacağı ALMANCA metin
 *   `fields[].label`                  formun Almanca alan adı
 *   `genre`                           kapalı slug kümesi, arayüz sözlüğünde
 *   `gloss` / `phrases`               `en` alanı zaten dolu, çözücü katlıyor
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { BUNDLED_EXERCISES } from "@/lib/skills";

const DIR = new URL(".", import.meta.url).pathname;

/**
 * Tür sırası — paket sınırlarını bu belirliyor.
 *
 * Küçük ve bağlamı dar olanlar önde: hat ilk paketlerde ucuz satırlarla
 * sınanıyor, `build` ise (1.194 satırla hattın üçte biri ve en zoru) en
 * sona kalıyor. Sıra KARARLI olmak zorunda; değişirse paketler kayar.
 */
export const KINDS = [
  "focus",
  "explanation.heading",
  "explanation.tr",
  "explanation.examples.tr",
  "explanation.examples.note",
  "monologue.promptTr",
  "monologue.rubricHint",
  "monologue.bulletsTr",
  "monologue.targets.tr",
  "drill.tr",
  "drill.hint",
  "drill.fix",
  "form.prompt",
  "form.facts",
  "rewrite.prompt",
  "rewrite.why",
  "reply.prompt",
  "reply.checklist",
  "free.prompt",
  "free.checklist",
  "build.tr",
  "build.hint",
] as const;

export type TaskKind = (typeof KINDS)[number];

export type TaskRow = {
  tr: string;
  kind: TaskKind;
  /** Kaç egzersizde geçiyor — sıralama buna göre. */
  n: number;
  /** Bağlam: egzersizin kimliği ve becerisi. En çok üç tane. */
  ctx: string[];
  /**
   * Satırın İLGİLİ OLDUĞU Almanca. `build`te kurulacak cümle, `drill`de
   * söylenecek cümle, örnekte örneğin kendisi. Karşılık bunu görmeden
   * yazılamaz.
   */
  de?: string;
  /** Üst bağlam: kontrol listesinin görevi, örneğin başlığı. */
  q?: string;
};

type Any = Record<string, unknown>;
const str = (v: unknown): string | undefined =>
  typeof v === "string" && v.trim() ? v : undefined;

export function extractTasks(): TaskRow[] {
  const rows = new Map<string, TaskRow>();
  const add = (kind: TaskKind, tr: unknown, ctx: string, de?: string, q?: string) => {
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

  for (const e of (BUNDLED_EXERCISES as unknown as Any[]).filter(
    (x) => ((x.course as string) ?? "de") === "de",
  )) {
    const at = `${e.id} · ${e.skill ?? "?"} ${e.level ?? ""}`.trim();
    add("focus", e.focus, at);

    for (const b of (e.explanation as Any[]) ?? []) {
      const head = str(b.heading);
      add("explanation.heading", b.heading, at);
      add("explanation.tr", b.tr, at, undefined, head);
      for (const x of (b.examples as Any[]) ?? []) {
        add("explanation.examples.tr", x.tr, at, str(x.de), head);
        add("explanation.examples.note", x.note, at, str(x.de), head);
      }
    }

    const m = e.monologue as Any | undefined;
    if (m) {
      const p = str(m.promptTr);
      add("monologue.promptTr", m.promptTr, at);
      add("monologue.rubricHint", m.rubricHint, at, undefined, p);
      for (const b of (m.bulletsTr as unknown[]) ?? []) add("monologue.bulletsTr", b, at, undefined, p);
      for (const t of (m.targets as Any[]) ?? []) add("monologue.targets.tr", t.tr, at, str(t.de));
    }

    for (const t of (e.tasks as Any[]) ?? []) {
      // Söyleyiş drilinin `kind`ı YOK — konuşma egzersizinin görevleri tek
      // biçimde ve ayırıcı alan gerekmemiş.
      const k = str(t.kind);
      const de = str(t.answer) ?? str(t.de);
      const p = str(t.prompt);
      if (!k) {
        add("drill.tr", t.tr, at, de);
        add("drill.hint", t.hint, at, de);
        for (const c of (t.confusions as Any[]) ?? []) add("drill.fix", c.fix, at, str(c.expected) ?? de);
        continue;
      }
      if (k === "build") {
        add("build.tr", t.tr, at, de);
        add("build.hint", t.hint, at, de);
      } else if (k === "form") {
        add("form.prompt", t.prompt, at);
        /* FORMUN CEVAPLARI DA KANIT. `facts` öğrencinin forma yazacağı
           bilgiyi Türkçe anlatıyor; alanların `answer`ı ise ALMANCA ve
           birebir eşleşme isteniyor. Ad Türkçe yazımıyla saklanmışsa
           ("Ayla Yıldız", "Emre Şahin") İngilizce anlatım da onu aynen
           taşımak zorunda — "Yildiz" yazan öğrenci formu geçemez. Kapı bunu
           ölçebilsin diye cevaplar satıra iliştiriliyor. */
        const answers = ((t.fields as Any[]) ?? [])
          .map((f) => str(f.answer))
          .filter((x): x is string => Boolean(x))
          .join(" · ");
        add("form.facts", t.facts, at, answers || undefined, p);
      } else if (k === "rewrite") {
        add("rewrite.prompt", t.prompt, at, str(t.source));
        add("rewrite.why", t.why, at, `${str(t.source) ?? ""} → ${de ?? ""}`.trim(), p);
      } else if (k === "reply" || k === "free") {
        add(`${k}.prompt` as TaskKind, t.prompt, at);
        for (const c of (t.checklist as unknown[]) ?? []) add(`${k}.checklist` as TaskKind, c, at, undefined, p);
      }
    }
  }

  /* Önce TÜR (paketler öbekli olsun), sonra sıklık azalan, sonra kısa
     önce, sonra alfabetik. Sıra KARARLI olmalı: değişirse paketler kayar
     ve yazılanlar tutmaz. */
  const rank = (r: TaskRow) => KINDS.indexOf(r.kind);
  return [...rows.values()].sort(
    (a, b) =>
      rank(a) - rank(b) || b.n - a.n || a.tr.length - b.tr.length || a.tr.localeCompare(b.tr, "tr"),
  );
}

if (process.argv[1]?.endsWith("make.ts")) {
  const rows = extractTasks();
  mkdirSync(`${DIR}in`, { recursive: true });
  mkdirSync(`${DIR}out`, { recursive: true });
  const SIZE = 150;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `t-${String(n).padStart(3, "0")}`;
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
