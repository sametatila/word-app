/**
 * Beceriler kütüphanesi yazarının GİRDİLERİNİ üretir: `npm run prep:library`
 *
 * Üç klasör yazar (`data/library/in/`, git'te izlenmez):
 *
 *   pools/<kurs>-<seviye>.txt   seviyenin kelime katmanı + alt seviyeler
 *   avoid/<kurs>-<seviye>.txt   Patika dersleri, ünite egzersizleri, deneme
 *                               kâğıtları — yazarın GİRMEYECEĞİ konular
 *   used/<kurs>-<seviye>.txt    kütüphanede o hücrede ZATEN VAR olan konular
 *
 * Neden üretiliyor da depoda durmuyor: üçü de mevcut içeriğin türevi ve her
 * partiden sonra değişiyor. Depoda tutulsalar ilk gün bayatlar, yazar da
 * bayat listeye bakıp aynı sahneyi ikinci kez yazardı.
 *
 * `used` en kritik olanı: kopya denetimi (report:library) metin örtüşmesini
 * yakalar ama KONU tekrarını yakalamaz — iki ayrı "kayıp eşya" diyaloğu tek
 * bir ortak pencere paylaşmayabilir.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import type { SkillExercise } from "../src/lib/skills/types";

const OUT = process.argv[2] ?? "data/library/in";
const LEVELS = ["A1", "A2", "B1", "B2", "C1"] as const;
const COURSES = ["de", "en"] as const;

for (const sub of ["pools", "avoid", "used"]) mkdirSync(`${OUT}/${sub}`, { recursive: true });

/* ── 1. Kelime havuzları ────────────────────────────────────────────────── */
type Word = { de: string; tr: string; artikel?: string; niveau: string };
function words(course: string): Word[] {
  const path = course === "en" ? "data/app/words-en.json" : "data/app/words.json";
  const raw = readFileSync(path, "utf8");
  // Almanca dosya tek bir JSON dizisi, İngilizce dosya satır satır JSON.
  return raw.trimStart().startsWith("[")
    ? (JSON.parse(raw) as Word[])
    : raw.split("\n").filter(Boolean).map((l) => JSON.parse(l) as Word);
}

for (const course of COURSES) {
  const rows = words(course);
  LEVELS.forEach((level, i) => {
    const own = rows
      .filter((r) => r.niveau === level)
      .map((r) => `${course === "de" && r.artikel ? r.artikel + " " : ""}${r.de} — ${r.tr}`);
    const lower = rows.filter((r) => LEVELS.indexOf(r.niveau as (typeof LEVELS)[number]) < i).map((r) => r.de);
    const txt =
      `# ${course.toUpperCase()} ${level} KELİME HAVUZU\n` +
      `# Bu seviyenin kendi katmanı (${own.length} madde). Metinler öncelikle buradan ve alt seviyelerden kelime kullanır.\n\n` +
      own.join("\n") +
      `\n\n# ALT SEVİYELERİN KELİMELERİ (${lower.length}; bilinen kabul edilir)\n` +
      lower.join(", ") +
      "\n";
    writeFileSync(`${OUT}/pools/${course}-${level.toLowerCase()}.txt`, txt);
  });
}

/* ── 2. Kaçınılacak konular ─────────────────────────────────────────────── */
const all = BUNDLED_EXERCISES as SkillExercise[];
const isLib = (e: SkillExercise) => e.id.includes("-lib-");
const courseOf = (e: SkillExercise) => e.course ?? "de";

for (const course of COURSES) {
  for (const level of LEVELS) {
    const lv = level.toLowerCase();
    let lessons: string[] = [];
    const lessonPath = `mobile/src/data/lessons/${course}-${lv}.json`;
    if (existsSync(lessonPath)) {
      lessons = (JSON.parse(readFileSync(lessonPath, "utf8")) as { title: string; titleTr: string }[]).map(
        (l) => `${l.title} (${l.titleTr})`,
      );
    }
    const units = all
      .filter((e) => courseOf(e) === course && e.level === level && !isLib(e))
      .map((e) => `${e.title} [${e.genre}]`);
    const mocks: string[] = [];
    const dir = `src/lib/mock-exams/${course}`;
    if (existsSync(dir)) {
      for (const f of readdirSync(dir).filter((f) => f.startsWith(lv))) {
        const t = readFileSync(`${dir}/${f}`, "utf8");
        const theme = /theme:\s*"([^"]+)"/.exec(t)?.[1] ?? "";
        const titles = [...t.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]).slice(0, 12);
        mocks.push(`${f}: ${theme} · ${titles.join(" · ")}`);
      }
    }
    const txt =
      `# ${course.toUpperCase()} ${level} — BU KONULARA/METİNLERE GİRME (kopya yasağı)\n\n` +
      `## Patika dersleri (${lessons.length})\n${lessons.join(" | ")}\n\n` +
      `## Patika ünite egzersizleri (${units.length})\n${units.join(" | ")}\n\n` +
      `## Deneme sınavı kâğıtları (tema · metin başlıkları)\n${mocks.join("\n")}\n`;
    writeFileSync(`${OUT}/avoid/${course}-${lv}.txt`, txt);
  }
}

/* ── 3. Kütüphanede kullanılmış konular ─────────────────────────────────── */
const cells = new Map<string, SkillExercise[]>();
for (const e of all.filter(isLib)) {
  const key = `${courseOf(e)}-${e.level.toLowerCase()}`;
  if (!cells.has(key)) cells.set(key, []);
  cells.get(key)!.push(e);
}
for (const course of COURSES) {
  for (const level of LEVELS) {
    const key = `${course}-${level.toLowerCase()}`;
    const list = cells.get(key) ?? [];
    const lines = [
      `# ${key.toUpperCase()} — kütüphanede ZATEN VAR olan konular (${list.length} egzersiz)`,
      "",
      "Aynı sahneyi, aynı metin türünü ve aynı dil bilgisi odağını TEKRARLAMA.",
      "Konu yakın olabilir; sahne, tür ve sorular yeni olacak.",
      "",
    ];
    for (const skill of ["reading", "listening", "writing", "speaking", "grammar"]) {
      const at = list.filter((e) => e.skill === skill);
      if (!at.length) continue;
      lines.push(`## ${skill}`);
      for (const e of at) {
        const extra =
          e.skill === "grammar" && "focus" in e
            ? ` · odak: ${e.focus}`
            : e.skill === "speaking" && "monologue" in e
              ? " · monolog"
              : e.skill === "speaking"
                ? " · söyleyiş drilli"
                : "";
        lines.push(`- ${e.id} · "${e.title}" [${e.genre}]${extra} — ${e.intro}`);
      }
      lines.push("");
    }
    writeFileSync(`${OUT}/used/${key}.txt`, lines.join("\n"));
  }
}

const libCount = all.filter(isLib).length;
console.log(`girdiler yazıldı → ${OUT}  (havuz ${COURSES.length * LEVELS.length} · kaçınma ${COURSES.length * LEVELS.length} · kullanılmış ${libCount} egzersizden)`);
