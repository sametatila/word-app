import { unitBriefs } from "../src/lib/immersion/brief";
import type { CefrLevel } from "../src/lib/skills/types";

/**
 * Ünite içerik brief'lerini döker — temalı read/listen/write/quiz/gramer içeriği
 * yazarken şartname olarak kullanılır. Kullanım: npm run briefs -- A1 de
 */
const level = ((process.argv[2] as CefrLevel) || "A1");
const course = process.argv[3] || "de";
const briefs = unitBriefs(course, level);

console.log(`# ${course} ${level} — ${briefs.length} ünite içerik brief'i\n`);
for (const b of briefs) {
  console.log(`## Ünite ${b.index} — ${b.theme}  (${b.unitId})`);
  console.log(`Dersler: ${b.lessonTitles.join(" · ")}`);
  console.log(`Cando: ${b.cando.join(", ") || "—"}`);
  console.log(`Kelime (${b.vocab.length}): ${b.vocab.slice(0, 12).map((v) => v.de).join(", ")}${b.vocab.length > 12 ? " …" : ""}`);
  console.log(`Kalıp (${b.patterns.length}): ${b.patterns.map((p) => p.de).join(" | ") || "—"}`);
  console.log(`Yeni içerik gerek: ${b.needs.read} okuma · ${b.needs.listen} dinleme · ${b.needs.write} yazma\n`);
}
