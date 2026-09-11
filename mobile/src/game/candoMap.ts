/**
 * İçerik → yapabilirlik etiketi — web `src/lib/cando-map.ts`in ders kısmı.
 *
 * Yalnız DERS eşlemesi taşındı (`candoForLesson`); becerilerin tür/seviye
 * eşlemesi webde kaldı, mobilde çağıranı yok. Tablolar birebir aynı ve
 * `check:parity` "ders yapabilirlik eslemesi" ile ölçülüyor.
 */
type CefrLevel = "A1" | "A2" | "B1" | "B2" | "C1";

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

/**
 * Dersin yapabilirlik etiketleri. Webden tek farkı süzgeç: orada `isCandoId`
 * 213 satırlık veri dosyasına bakıyor, burada kimlikler `/api/cando`dan gelen
 * listeyle doğrulanıyor (o listenin metni de zaten gerekiyor).
 */
export function candoIdsForLesson(lesson: { level: string; icon: string; focusId: string; cando?: string[] }): string[] {
  if (lesson.cando?.length) return lesson.cando;
  const level = lesson.level as CefrLevel;
  const theme = ICON_THEME[lesson.icon] ?? "social";
  const out = [`${level}.SPK.${LESSON_SPK[level]?.[theme] ?? 1}`];
  const gr = FOCUS_GR.find(([re]) => re.test(lesson.focusId));
  if (gr) out.push(`${level}.GR.${gr[1][level]}`);
  return out;
}
