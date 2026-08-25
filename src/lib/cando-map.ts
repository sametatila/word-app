import { isCandoId, type CandoSkill } from "@/lib/cando";
import type { CefrLevel, SkillId } from "@/lib/skills/types";

/**
 * İçerik → yapabilirlik etiketi (WP-43, adım 3).
 *
 * 220 ders ve 344 egzersizi elle etiketlemek yerine ilk tur KURALLA
 * yapılıyor: dersin simgesi (konu ailesi) + seviyesi, egzersizin becerisi +
 * seviyesi + türü. İçeriğin kendi `cando` alanı varsa o kazanır; bu harita
 * yalnız boşlukları doldurur. WP-71/72 içerik gözden geçirmesinde etiketler
 * içeriğe yazılır ve bu harita küçülür. Bilinmeyen kimlik üretilmez: her
 * sonuç `isCandoId` süzgecinden geçer.
 */

type Theme = "social" | "service" | "work";

const ICON_THEME: Record<string, Theme> = {
  greet: "social", party: "social", family: "social", handshake: "social", gift: "social", ring: "social", baby: "social",
  feelings: "social", culture: "social", music: "social", art: "social", film: "social", media: "social", star: "social",
  question: "social", idea: "social", flower: "social", dog: "social",
  cafe: "service", food: "service", bread: "service", cake: "service", shopping: "service", shirt: "service", money: "service",
  ticket: "service", suitcase: "service", mail: "service", phone: "service", doctor: "service", tooth: "service", pill: "service",
  repair: "service", key: "service", home: "service", car: "service", bike: "service", train: "service", plane: "service",
  transport: "service", map: "service", camera: "service", clock: "service", calendar: "service", weather: "service",
  sun: "service", snow: "service", rain: "service", nature: "service", mountain: "service", recycle: "service", city: "service",
  vacation: "service", bed: "service",
  job: "work", office: "work", school: "work", book: "work", pen: "work", law: "work", chart: "work", tech: "work", flag: "work",
  run: "work", sport: "work",
};

/** Seviye × tema → konuşma ifadesi (dersin rol yapma sahnesi). */
const LESSON_SPK: Record<CefrLevel, Record<Theme, number>> = {
  A1: { social: 1, service: 3, work: 5 },
  A2: { social: 6, service: 1, work: 7 },
  B1: { social: 6, service: 3, work: 7 },
  B2: { social: 1, service: 4, work: 3 },
  C1: { social: 2, service: 3, work: 1 },
};

/** Dersin dilbilgisi odağı (focusId) → dilbilgisi ifadesi. */
const FOCUS_GR: [RegExp, Record<CefrLevel, number>][] = [
  [/artikel|plural|nomen|genus/i, { A1: 1, A2: 2, B1: 6, B2: 4, C1: 4 }],
  [/perfekt|partizip|vergangen|prateritum|präteritum/i, { A1: 2, A2: 1, B1: 5, B2: 6, C1: 3 }],
  [/akkusativ|dativ|genitiv|kasus|praeposition|präposition|preposition/i, { A1: 5, A2: 2, B1: 6, B2: 4, C1: 4 }],
  [/weil|dass|wenn|obwohl|nebensatz|relativ|konjunktion/i, { A1: 3, A2: 3, B1: 1, B2: 5, C1: 1 }],
  [/modal|konnen|können|mussen|müssen|wollen|sollen|durfen|dürfen/i, { A1: 4, A2: 4, B1: 2, B2: 2, C1: 3 }],
  [/konjunktiv|wurde|würde|hatte|hätte/i, { A1: 4, A2: 4, B1: 2, B2: 2, C1: 3 }],
  [/passiv/i, { A1: 3, A2: 3, B1: 3, B2: 1, C1: 1 }],
  [/imperativ|befehl/i, { A1: 3, A2: 5, B1: 1, B2: 5, C1: 2 }],
  [/komparativ|superlativ|vergleich|adjektiv/i, { A1: 5, A2: 6, B1: 4, B2: 3, C1: 1 }],
  [/trennbar|v2|satzbau|wortstellung|frage/i, { A1: 3, A2: 3, B1: 1, B2: 5, C1: 1 }],
  [/pronomen|possessiv/i, { A1: 5, A2: 2, B1: 4, B2: 4, C1: 2 }],
];

export function candoForLesson(lesson: { level: CefrLevel; icon: string; focusId: string; cando?: string[] }): string[] {
  if (lesson.cando?.length) return lesson.cando.filter(isCandoId);
  const theme = ICON_THEME[lesson.icon] ?? "social";
  const out = [`${lesson.level}.SPK.${LESSON_SPK[lesson.level][theme]}`];
  const gr = FOCUS_GR.find(([re]) => re.test(lesson.focusId));
  if (gr) out.push(`${lesson.level}.GR.${gr[1][lesson.level]}`);
  return out.filter(isCandoId);
}

const SKILL_CODE: Record<SkillId, CandoSkill> = { reading: "RD", listening: "LS", writing: "WR", speaking: "SPK" };

/** Tür anahtarı → (seviye başına) ifade numarası; eşleşmezse 1. */
const GENRE_INDEX: [RegExp, Partial<Record<CandoSkill, Record<CefrLevel, number>>>][] = [
  [/mesaj|e-posta|not\b|kartpostal|yarı resmi/i, { RD: { A1: 2, A2: 1, B1: 2, B2: 2, C1: 1 }, WR: { A1: 2, A2: 1, B1: 2, B2: 2, C1: 2 } }],
  [/ilan|duyuru|anons|program|tarife/i, { RD: { A1: 1, A2: 2, B1: 5, B2: 5, C1: 2 }, LS: { A1: 2, A2: 1, B1: 2, B2: 5, C1: 1 } }],
  [/köşe|forum|okur mektubu|deneme|tartışma|yorum/i, { RD: { A1: 4, A2: 4, B1: 1, B2: 1, C1: 4 }, WR: { A1: 5, A2: 3, B1: 1, B2: 1, C1: 1 }, LS: { A1: 5, A2: 3, B1: 3, B2: 2, C1: 2 } }],
  [/resmî|resmi|iş yazışması|tutanak|şikâyet|başvuru/i, { RD: { A1: 3, A2: 3, B1: 2, B2: 2, C1: 2 }, WR: { A1: 1, A2: 4, B1: 2, B2: 2, C1: 2 }, LS: { A1: 4, A2: 5, B1: 4, B2: 5, C1: 3 } }],
  [/rehber|bilgi yazısı|kültür|günlük yaşam/i, { RD: { A1: 4, A2: 5, B1: 3, B2: 3, C1: 2 } }],
  [/telefon|telesekreter|sesli mesaj/i, { LS: { A1: 3, A2: 2, B1: 5, B2: 5, C1: 1 } }],
  [/diyalog|sohbet|tanışma|danışma/i, { LS: { A1: 5, A2: 3, B1: 1, B2: 3, C1: 4 }, SPK: { A1: 1, A2: 1, B1: 3, B2: 4, C1: 3 } }],
  [/radyo|podcast|panel|konferans|röportaj|uzman/i, { LS: { A1: 5, A2: 4, B1: 3, B2: 1, C1: 3 } }],
  [/toplantı/i, { LS: { A1: 4, A2: 5, B1: 4, B2: 5, C1: 3 } }],
  [/ses çalışması/i, { SPK: { A1: 6, A2: 6, B1: 6, B2: 6, C1: 4 } }],
];

export function candoForExercise(ex: { skill: SkillId; level: CefrLevel; genre: string; cando?: string[] }): string[] {
  if (ex.cando?.length) return ex.cando.filter(isCandoId);
  const code = SKILL_CODE[ex.skill];
  const hit = GENRE_INDEX.find(([re, map]) => re.test(ex.genre) && map[code]);
  const n = hit ? hit[1][code]![ex.level] : 1;
  const id = `${ex.level}.${code}.${n}`;
  return isCandoId(id) ? [id] : [`${ex.level}.${code}.1`].filter(isCandoId);
}
