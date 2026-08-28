import assert from "node:assert";
import { buildTrack, UNIT_LESSONS, GROUP_SIZE } from "../src/lib/immersion/build";
import type { Lesson } from "../src/lib/lessons/types";
import type { CefrLevel } from "../src/lib/skills/types";
import type { SkillMeta } from "../src/lib/skills/index";
import type { ImmersionTrack } from "../src/lib/immersion/types";

let pass = 0;
const fail: string[] = [];
function check(name: string, cond: boolean) {
  if (cond) pass++;
  else fail.push(name);
}

function mkLesson(i: number, level: CefrLevel): Lesson {
  return {
    id: `de-${level.toLowerCase()}-b${String(i).padStart(2, "0")}`,
    level,
    course: "de",
    icon: "greet",
    title: `Lektion ${i}`,
    titleTr: `Ders ${i}`,
    summary: "x",
    minutes: 5,
    focusId: "x",
    vocab: [],
    patterns: [],
    lecture: [],
    roleplay: { scene: "", partner: "", opening: "", openingTr: "", goal: "", minTurns: 6 },
  };
}
function mkMeta(id: string, skill: SkillMeta["skill"], level: CefrLevel): SkillMeta {
  return { id, skill, level, title: `${skill}-${id}`, genre: "İlan", minutes: 4, items: 5 };
}

const lessons = Array.from({ length: 10 }, (_, i) => mkLesson(i + 1, "A1"));
const reading = Array.from({ length: 3 }, (_, i) => mkMeta(`a1-r${i + 1}`, "reading", "A1"));
const listening = Array.from({ length: 5 }, (_, i) => mkMeta(`a1-l${i + 1}`, "listening", "A1"));
const writing = Array.from({ length: 5 }, (_, i) => mkMeta(`a1-w${i + 1}`, "writing", "A1"));

const t: ImmersionTrack = buildTrack({ course: "de", level: "A1", lessons, reading, listening, writing });

// 1. unit sayısı = ceil(ders/4)
check("unit sayısı ceil(10/4)=3", t.units.length === Math.ceil(10 / UNIT_LESSONS) && t.units.length === 3);

// 2. her ünite checkpoint ile biter, tek checkpoint
check(
  "her ünite tam bir checkpoint ile biter",
  t.units.every((u) => u.items.at(-1)?.kind === "checkpoint" && u.items.filter((i) => i.kind === "checkpoint").length === 1),
);

// 3. dolu üniteler 4 ders + 2 read + 2 listen + 2 write taşır
const full = t.units.slice(0, 2);
check(
  "dolu ünitelerde 4/2/2/2 desen",
  full.every((u) => {
    const c = (k: string) => u.items.filter((i) => i.kind === k).length;
    return c("lesson") === 4 && c("read") === 2 && c("listen") === 2 && c("write") === 2;
  }),
);

// 4. kısmi son ünite (10 ders → 4+4+2): 2 ders, boş ders slotu yok
const last = t.units[2];
check("kısmi son ünitede 2 ders", last.lessonCount === 2 && last.items.filter((i) => i.kind === "lesson").length === 2);
check("hiçbir ders item'ı boş ref taşımaz", t.units.every((u) => u.items.filter((i) => i.kind === "lesson").every((i) => i.ref)));

// 5. ders ref'leri girdi sırasını korur
const lessonRefs = t.units.flatMap((u) => u.items.filter((i) => i.kind === "lesson").map((i) => i.ref));
check("ders ref'leri katalog sırasında", JSON.stringify(lessonRefs) === JSON.stringify(lessons.map((l) => l.id)));

// 6. beceri havuzu sırayla tükenir; bitince ref=null (reading 3 < ihtiyaç)
const readItems = t.units.flatMap((u) => u.items.filter((i) => i.kind === "read"));
check("reading ilk 3 slot dolu, kalan null", readItems.slice(0, 3).every((i) => i.ref) && readItems.slice(3).every((i) => i.ref === null));
check("reading ref sırası havuzu izler", JSON.stringify(readItems.slice(0, 3).map((i) => i.ref)) === JSON.stringify(reading.map((m) => m.id)));

// 7. item id'leri track genelinde benzersiz
const ids = t.units.flatMap((u) => u.items.map((i) => i.id));
check("item id'leri benzersiz", new Set(ids).size === ids.length);

// 8. grammar %3, quiz %2 ünitelerde
check("ünite 2'de quiz var, grammar yok", t.units[1].items.some((i) => i.kind === "quiz") && !t.units[1].items.some((i) => i.kind === "grammar"));
check("ünite 3'te grammar var, quiz yok", t.units[2].items.some((i) => i.kind === "grammar") && !t.units[2].items.some((i) => i.kind === "quiz"));
check("ünite 1'de ne grammar ne quiz", !t.units[0].items.some((i) => i.kind === "grammar" || i.kind === "quiz"));

// 9. group = floor((index-1)/groupSize)
check("group = floor((index-1)/GROUP_SIZE)", t.units.every((u) => u.group === Math.floor((u.index - 1) / GROUP_SIZE)));

// 10. tema ünitenin ilk dersinin modülünden (A1 ilk modül teması)
check("ünite 1 teması A1 ilk modül", t.units[0].theme === "Tanışma ve ben");

// 11. boş seviye → 0 ünite
check("dersi olmayan seviye 0 ünite", buildTrack({ course: "de", level: "C1", lessons: [] }).units.length === 0);

// 12. beceri hiç yoksa read/listen/write slotları null ama var
const noSkills = buildTrack({ course: "de", level: "A1", lessons });
check("beceri içeriği yoksa slotlar null yer tutucu", noSkills.units[0].items.filter((i) => i.kind === "read").every((i) => i.ref === null && i.title === "Okuma"));

if (fail.length) {
  console.error(`\n${fail.length} TEST BAŞARISIZ:`);
  for (const f of fail) console.error("  ✗ " + f);
  process.exit(1);
}
console.log(`\nTÜM TESTLER GEÇTİ — test:track (${pass} kontrol, buildTrack 4/2/2/2 + checkpoint + gating)`);
