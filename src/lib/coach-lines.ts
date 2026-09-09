import { translate, DEFAULT_NATIVE, type NativeLang } from "@/lib/i18n/dict";
/**
 * Erdi'nin koç cümleleri (WP-66).
 *
 * Maskot şimdiye kadar yalnız kutluyordu; burada öğrenme ANLARINDA tek
 * cümlelik Türkçe bir şey söylüyor. Kurallar:
 *   - Cümle tek ve kısa: balon 4 saniye duruyor, okunması gereken bir paragraf
 *     değil bir laf.
 *   - Hata AÇIKLAMASI burada yok — o iş geri bildirim şeridinin (WP-13);
 *     Erdi öğretmen değil, yanında duran arkadaş.
 *   - Tekrar etmeyen seçim: aynı anda söylenen son birkaç cümle bir daha
 *     seçilmiyor (`pickCoachLine`), yoksa üçüncü sabahta ezberlenir.
 *
 * Yer tutucular: `{name}` (yoksa virgülüyle birlikte düşer), `{pct}`, `{level}`.
 */
export type CoachMoment =
  | "plan_morning"
  | "plan_day"
  | "plan_evening"
  | "exam_intro"
  | "exam_pass"
  | "exam_fail"
  | "weak_done"
  | "weekly";

/* Metin değil ANAHTAR: cümleler gösterildiği yerde çevriliyor. */
export const COACH_LINES: Record<CoachMoment, readonly string[]> = {
  plan_morning: [
    "coach.plan_morning_1",
    "coach.plan_morning_2",
    "coach.plan_morning_3",
    "coach.plan_morning_4",
    "coach.plan_morning_5",
  ],
  plan_day: [
    "coach.plan_day_1",
    "coach.plan_day_2",
    "coach.plan_day_3",
    "coach.plan_day_4",
    "coach.plan_day_5",
  ],
  plan_evening: [
    "coach.plan_evening_1",
    "coach.plan_evening_2",
    "coach.plan_evening_3",
    "coach.plan_evening_4",
    "coach.plan_evening_5",
  ],
  exam_intro: [
    "coach.exam_intro_1",
    "coach.exam_intro_2",
    "coach.exam_intro_3",
    "coach.exam_intro_4",
    "coach.exam_intro_5",
  ],
  exam_pass: [
    "coach.exam_pass_1",
    "coach.exam_pass_2",
    "coach.exam_pass_3",
    "coach.exam_pass_4",
    "coach.exam_pass_5",
  ],
  exam_fail: [
    "coach.exam_fail_1",
    "coach.exam_fail_2",
    "coach.exam_fail_3",
    "coach.exam_fail_4",
    "coach.exam_fail_5",
  ],
  weak_done: [
    "coach.weak_done_1",
    "coach.weak_done_2",
    "coach.weak_done_3",
    "coach.weak_done_4",
    "coach.weak_done_5",
  ],
  weekly: [
    "coach.weekly_1",
    "coach.weekly_2",
    "coach.weekly_3",
    "coach.weekly_4",
    "coach.weekly_5",
  ],
};

export type CoachVars = { name?: string | null; pct?: number; level?: string };

/** Yer tutucuları doldur; isim yoksa ", {name}" parçası tamamen düşer. */
export function fillCoachLine(line: string, vars: CoachVars = {}): string {
  let s = line;
  if (vars.name) s = s.replace(/\{name\}/g, vars.name);
  else s = s.replace(/,\s*\{name\}/g, "").replace(/\{name\}[,!.]?\s*/g, "");
  s = s.replace(/\{pct\}/g, String(vars.pct ?? ""));
  s = s.replace(/\{level\}/g, vars.level ?? "");
  // Yer tutucu düşünce cümle küçük harfle başlayabilir ("günaydın" gibi değil, ama garanti).
  return s.replace(/\s{2,}/g, " ").trim();
}

/** Son söylenenleri hesaba katıp tekrar etmeyen bir dizin seç (saf, test edilebilir). */
export function pickIndex(count: number, recent: readonly number[], random: () => number = Math.random): number {
  if (count <= 0) return 0;
  const avoid = new Set(recent.slice(-Math.min(recent.length, count - 1)));
  const options = [];
  for (let i = 0; i < count; i++) if (!avoid.has(i)) options.push(i);
  const pool = options.length ? options : [...Array(count).keys()];
  return pool[Math.floor(random() * pool.length)];
}

const SEEN_KEY = "lernomi-coach-seen";

function readSeen(): Partial<Record<CoachMoment, number[]>> {
  try {
    const raw = localStorage.getItem(SEEN_KEY);
    return raw ? (JSON.parse(raw) as Partial<Record<CoachMoment, number[]>>) : {};
  } catch {
    return {};
  }
}

/**
 * Bir an için cümle seç. Seçim cihazda hatırlanır: aynı anın son (n-1)
 * cümlesi tekrar seçilmez. Tarayıcı dışında (test) yalnız rastgele seçer.
 */
export function pickCoachLine(moment: CoachMoment, vars: CoachVars = {}, lang: NativeLang = DEFAULT_NATIVE): string {
  const lines = COACH_LINES[moment];
  const seen = typeof localStorage === "undefined" ? {} : readSeen();
  const recent = seen[moment] ?? [];
  const i = pickIndex(lines.length, recent);
  try {
    seen[moment] = [...recent, i].slice(-lines.length);
    localStorage.setItem(SEEN_KEY, JSON.stringify(seen));
  } catch {
    /* depolama yoksa tekrar korunmaz, cümle yine söylenir */
  }
  return fillCoachLine(translate(lang, lines[i]), vars);
}

/** Günün saatine göre plan selamı. */
export function planMoment(hour: number = new Date().getHours()): CoachMoment {
  if (hour < 12) return "plan_morning";
  if (hour < 18) return "plan_day";
  return "plan_evening";
}
