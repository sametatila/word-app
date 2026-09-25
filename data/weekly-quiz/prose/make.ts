/**
 * Haftalık quizin TÜRKÇE alanlarını paketler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/weekly-quiz/prose/make.ts [de|en]`
 *
 * Deneme sınavı hattının (`data/mock-exams/prose/`) birebir deseni:
 * `make` → `in/` → elle yazılan `out/` → `check`. Sözlüğü ayrı, çünkü
 * kaynağı ayrı (`QUIZ_WEEKS`) ve aynı Türkçe açıklama bir quizde ve bir
 * deneme sınavında farklı çevrilebilir.
 *
 * ÜÇ TÜR, küçükten büyüğe:
 *
 *   themeTr  haftanın teması — quiz kapağının başlığı
 *   genreTr  okuma/dinleme uyaranının tür etiketi ("Tanıtım yazısı")
 *   why      yanlıştan sonra gösterilen açıklama; tabandaki `why` ve
 *            O ANADİLİN `byNative` varyantındaki `why`
 *
 * YALNIZ O ANADİLİN GÖRDÜĞÜ. Almanca kursun quizleri İngilizce konuşana
 * (`PAIR_READY`: en → de), İngilizce kursunkiler Almanca konuşana gidiyor.
 * `byNative.tr.why` Türk öğrencinin açıklaması ve çevrilmiyor; öteki
 * anadilin varyantı ise bu okura hiç gösterilmiyor.
 *
 * KAPSAM DIŞI ve bilerek: `theme`, `genre`, `title`, `body`, `segments`,
 * `stem`, `options`. Hepsi ÖĞRENİLEN dilde; çevrilirse quiz ölçtüğü şeyi
 * ölçmez. Kişisel madde (`personal`) de yok: çalışma anında kuruluyor ve
 * açıklaması üç dilde koda yazılı (`build.ts` `PERSONAL_WHY`).
 */
import { writeFileSync, mkdirSync, rmSync } from "node:fs";
import { QUIZ_WEEKS } from "@/lib/weekly-quiz";
import type { QuizCourse, QuizNative } from "@/lib/weekly-quiz/types";

const DIR = new URL(".", import.meta.url).pathname;

/** Tür sırası — paket sınırlarını belirliyor, KARARLI olmak zorunda. */
export const KINDS = ["themeTr", "genreTr", "why"] as const;
export type QuizKind = (typeof KINDS)[number];

/** Kursun okuru: Almanca kursu İngilizce konuşan, İngilizce kursu Almanca konuşan. */
export const READER: Record<QuizCourse, Exclude<QuizNative, "tr">> = { de: "en", en: "de" };

export type QuizRow = {
  tr: string;
  kind: QuizKind;
  /** Kaç yerde geçiyor. */
  n: number;
  /** Bağlam: quiz ve madde kimliği. En çok üç tane. */
  ctx: string[];
  /**
   * Satırın İLGİLİ OLDUĞU hedef dil metni: `why`da maddenin kökü ve doğru
   * şıkkı, `genreTr`de özgün tür etiketi, `themeTr`de özgün tema.
   */
  de?: string;
};

const str = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v : undefined);

export function extractQuiz(course: QuizCourse): QuizRow[] {
  const reader = READER[course];
  const rows = new Map<string, QuizRow>();
  const add = (kind: QuizKind, tr: unknown, ctx: string, de?: string) => {
    const t = str(tr);
    if (!t) return;
    const key = kind + "|" + t;
    const r = rows.get(key) ?? { tr: t, kind, n: 0, ctx: [] };
    r.n++;
    if (r.ctx.length < 3) r.ctx.push(ctx);
    if (de && !r.de) r.de = de;
    rows.set(key, r);
  };

  for (const w of QUIZ_WEEKS.filter((x) => x.course === course)) {
    add("themeTr", w.themeTr, w.id, w.theme);
    for (const s of w.stimuli) add("genreTr", s.genreTr, `${w.id} ${s.id}`, s.genre);
    for (const it of w.items) {
      if (it.block === "personal") continue;
      const v = it.byNative?.[reader];
      const options = v?.options ?? it.options;
      const answer = v?.answer ?? it.answer;
      add("why", v?.why ?? it.why, it.id, `${it.stem} → ${options[answer] ?? ""}`);
    }
  }

  const rank = (r: QuizRow) => KINDS.indexOf(r.kind);
  return [...rows.values()].sort((a, b) => rank(a) - rank(b) || a.ctx[0].localeCompare(b.ctx[0]));
}

if (process.argv[1]?.endsWith("make.ts")) {
  /* Dizin adı YAZILACAK DİLİ söylüyor: `in/` İngilizce (Almanca kursun
     quizleri), `in-de/` Almanca (İngilizce kursun quizleri). */
  const course = (process.argv[2] === "en" ? "en" : "de") as QuizCourse;
  const suffix = course === "en" ? "-de" : "";
  const rows = extractQuiz(course);
  rmSync(`${DIR}in${suffix}`, { recursive: true, force: true });
  mkdirSync(`${DIR}in${suffix}`, { recursive: true });
  mkdirSync(`${DIR}out${suffix}`, { recursive: true });
  const SIZE = 60;
  let n = 0;
  for (let i = 0; i < rows.length; i += SIZE) {
    n++;
    const name = `q-${String(n).padStart(3, "0")}`;
    writeFileSync(
      `${DIR}in${suffix}/${name}.json`,
      `${JSON.stringify({ packet: name, words: rows.slice(i, i + SIZE) }, null, 1)}\n`,
    );
  }
  const kinds = rows.reduce<Record<string, number>>((a, r) => ((a[r.kind] = (a[r.kind] ?? 0) + 1), a), {});
  console.log(`${rows.length} benzersiz dize · ${n} paket\n` + KINDS.map((k) => `${k} ${kinds[k] ?? 0}`).join(" · "));
}
