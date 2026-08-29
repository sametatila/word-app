/**
 * Patika track'ini CİHAZDA kurar — /api/immersion (henüz canlı değil) yerine.
 *
 * Web'in saf builder'ının (src/lib/immersion/build.ts) mobil karşılığı: aynı
 * slot deseni, aynı 4/2/2/2 + gramer + quiz + kontrol düzeni, aynı modül
 * temaları. Fark: beceri içeriği (read/listen/write) Neon'da ve daha canlı
 * değil; o slotlar "yayına alınınca" olarak işaretlenir (playable:false).
 * Dersler pakette olduğu için oynanabilir. /api/immersion açıldığında
 * usePatika onu tercih eder ve gerçek ilerleme/gating gelir.
 */
import { lessonsForLevel } from "../data/lessons";
import { listSkillMeta, type SkillMeta } from "../data/skills";
import type { Patika, PatikaItem, PatikaUnit } from "../lib/usePatika";

/** Track item türü → beceri kataloğu türü. */
const SKILL_OF: Record<string, "reading" | "listening" | "writing"> = {
  read: "reading", listen: "listening", write: "writing",
};

const UNIT_LESSONS = 4;
const GROUP_SIZE = 10;
const MODULE_SIZE = 10;

/** Her ünitenin deseni: 4 ders + 2 okuma + 2 dinleme + 2 yazma + gramer + quiz + kontrol. */
const BASE_PATTERN = ["lesson", "read", "lesson", "listen", "lesson", "write", "lesson", "read", "listen", "write"] as const;
function slotPlan(): string[] { return [...BASE_PATTERN, "grammar", "quiz", "checkpoint"]; }

const SKILL_TITLE: Record<string, string> = { read: "Okuma", listen: "Dinleme", write: "Yazma" };
const SLOT_TITLE: Record<string, { title: string; titleTr: string }> = {
  grammar: { title: "Dil bilgisi", titleTr: "Odak alıştırması" },
  quiz: { title: "Tekrar", titleTr: "Karışık hatırlama" },
  checkpoint: { title: "Kontrol Noktası", titleTr: "Üniteyi bitir" },
};

const MODULE_THEMES: Record<string, string[]> = {
  A1: ["Tanışma ve ben", "Aile ve insanlar", "Yeme-içme", "Günlük düzen", "Alışveriş", "Şehirde", "Ev ve yaşam", "Boş zaman", "Sağlık ve vücut", "İletişim ve geçmişe ilk adım"],
  A2: ["Geçmişi anlatmak", "Benim hikâyem", "Sağlık", "Ev ve mahalle", "İş hayatı", "Alışveriş ve hizmetler", "Seyahat", "Kutlamalar ve ilişkiler", "Medya ve teknoloji", "Şehir ve resmî işler"],
  B1: ["İş dünyası", "Ev ve kira dünyası", "Bağlaç ustalığı", "İlgi cümleleri", "Bürokrasi", "Eğitim ve gelişim", "Fikir ve tartışma", "Sağlık sistemi", "Çevre ve şehir yaşamı", "Duygular ve hayaller"],
  B2: ["Profesyonel iletişim", "Müzakere ve şikâyet", "Edilgenin bütün hâlleri", "Medya ve aktarılan söz", "Bilim ve teknoloji", "Toplum ve ekonomi", "Kültür ve sanat", "Para ve kariyer stratejisi", "İnsan ilişkileri ve psikoloji", "Resmî yazışma ve kapanış"],
  C1: ["Zarif iş iletişimi", "Kip parçacıkları", "Retorik ve sunum sanatı", "Deyimler ve mecazlar", "Basın ve akademik aktarım", "Hukuk ve sözleşme dili", "Karmaşık yapılar", "Toplumsal tartışma", "Mizah, ironi ve incelik", "Ustalık sahneleri"],
};

function unitTheme(level: string, firstLessonIndex: number, unitIndex: number): string {
  const theme = MODULE_THEMES[level]?.[Math.floor(firstLessonIndex / MODULE_SIZE)];
  return theme || `${level} · Ünite ${unitIndex}`;
}

/**
 * Cihazda kurulan Patika. `done` seti biten ders id'leri (yerel + sunucu).
 * Gating YOK: sunucu ilerlemesi olmadan kilit yanıltıcı olur ve kullanıcıyı
 * ilk ünitede kilitler; onun yerine hepsi açık, ilerleme derse göre.
 */
export function buildLocalPatika(level: string, done: Set<string>): Patika {
  const lessons = lessonsForLevel(level);
  // Beceri havuzları — web builder gibi sırayla tüketilir (2/ünite/tür);
  // biterse slot boş (ref=null → "Yakında"). Erken üniteler dolu.
  const pools: Record<string, SkillMeta[]> = {
    read: listSkillMeta(level, "reading"),
    listen: listSkillMeta(level, "listening"),
    write: listSkillMeta(level, "writing"),
  };
  const cursors: Record<string, number> = { read: 0, listen: 0, write: 0 };
  const unitCount = Math.ceil(lessons.length / UNIT_LESSONS) || 1;
  const units: PatikaUnit[] = [];

  for (let u = 0; u < unitCount; u++) {
    const index = u + 1;
    const unitId = `de-${level.toLowerCase()}-u${String(index).padStart(2, "0")}`;
    const unitLessons = lessons.slice(u * UNIT_LESSONS, u * UNIT_LESSONS + UNIT_LESSONS);
    const items: PatikaItem[] = [];
    const counters: Record<string, number> = {};
    let lessonCursor = 0;

    for (const kind of slotPlan()) {
      const n = (counters[kind] = (counters[kind] ?? 0) + 1);
      const id = `${unitId}-${kind}${n}`;
      if (kind === "lesson") {
        const lesson = unitLessons[lessonCursor++];
        if (!lesson) continue; // kısmi son ünitede boş ders slotu üretilmez
        items.push({ id, kind, title: lesson.title, titleTr: lesson.titleTr, playable: true, done: done.has(lesson.id), ref: lesson.id });
      } else if (kind === "read" || kind === "listen" || kind === "write") {
        const meta = pools[kind][cursors[kind]++];
        items.push({
          id, kind,
          title: meta?.title ?? SKILL_TITLE[kind],
          titleTr: meta?.genre ?? SKILL_TITLE[kind],
          playable: !!meta,
          done: meta ? done.has(meta.id) : false,
          ref: meta?.id ?? null,
        });
      } else if (kind === "quiz" || kind === "checkpoint") {
        // Quiz/checkpoint ünitenin ders içeriğinden CİHAZDA türetilir → oynanır.
        const t = SLOT_TITLE[kind];
        items.push({ id, kind, title: t.title, titleTr: t.titleTr, playable: true, done: done.has(id), ref: unitId });
      } else {
        // grammar — elle yazılmış içerik gerekir, henüz yok → "Yakında".
        const t = SLOT_TITLE[kind];
        items.push({ id, kind, title: t.title, titleTr: t.titleTr, playable: false, done: false, ref: null });
      }
    }

    const lessonItems = items.filter((it) => it.kind === "lesson");
    const lessonsDone = lessonItems.filter((it) => it.done).length;
    const doneCount = items.filter((it) => it.done).length;
    units.push({
      id: unitId, index, group: Math.floor(u / GROUP_SIZE),
      theme: unitTheme(level, u * UNIT_LESSONS, index),
      locked: false,
      complete: lessonItems.length > 0 && lessonsDone === lessonItems.length,
      done: doneCount, total: items.length,
      lessonsDone, lessonsTotal: lessonItems.length,
      items,
    });
  }

  const firstOpen = units.find((u) => !u.complete);
  const doneUnits = units.filter((u) => u.complete).length;
  return {
    level,
    units,
    currentIndex: firstOpen?.index ?? units.length,
    doneUnits,
    totalUnits: units.length,
  };
}
