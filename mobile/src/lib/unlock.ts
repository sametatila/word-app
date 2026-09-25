import type { FreeUnlock, MockUnlock, TieredUnlock, UnlockOverview, WalkUnlock } from "./premium";

/**
 * KİLİT AÇMA DURUMUNUN CÜMLESİ — hangi anahtar, hangi parametre.
 *
 * Sayılar sunucudan (`/api/premium/status` › `unlock`, hesap `lib/premium/unlock`);
 * burası yalnız hangi cümlenin çizileceğini seçiyor. Web aynı kuralı
 * birebir uyguluyor: iki platform aynı durumda aynı
 * cümleyi göstermeli — "Deneme sınavını tamamladın ✓ · 7 günlük seri: 3/7 gün ·
 * 4 gün sonra açılır: +1 deneme sınavı".
 *
 * SAF: çeviri yok, React yok. Anahtar + parametre döner; `t()` çağıran tarafta.
 * `__tests__/unlock.test.ts` sınıyor.
 */

/** Kotalı yüzey — anahtar son ekleri sunucu sözlüğüyle aynı. */
export type UnlockSurface = "conv" | "write" | "skill_speak" | "skill_write" | "mock";

export type Line = { key: string; params?: Record<string, string | number> };

/** Bir koşul satırı: tamam mı, cümlesi, varsa ilerleme çubuğu (x/y). */
export type UnlockCondition = { ok: boolean; line: Line; bar?: { value: number; max: number } };

export type UnlockCopy = {
  /** Kalan hak ya da "bitti" cümlesi. */
  headline: Line;
  /** Hak kalmadı mı — kilit/rozet ve CTA buna bakıyor. */
  spent: boolean;
  /** Bir sonraki hakkın koşulları (yoksa boş). */
  conditions: UnlockCondition[];
  /** "Ne zaman" cümlesi — yoksa null (tavana varıldı / kademe kapalı). */
  when: Line | null;
  /** Kazanç cümlesi — kutlamada da kullanılıyor. */
  gain: Line | null;
};

/** Ücretsiz bir kademeli yüzeyin (Patika, Beceriler, ücretsiz deneme) cümleleri. */
export function freeUnlockCopy(u: FreeUnlock, surface: UnlockSurface): UnlockCopy {
  const spent = u.remaining <= 0;
  const headline: Line = spent ? { key: `unlock.spent_${surface}` } : { key: `unlock.left_${surface}`, params: { n: u.remaining } };
  const next = u.next;
  if (!next) {
    return { headline, spent, conditions: [], when: u.tier > 0 ? { key: "unlock.max" } : null, gain: null };
  }
  const completeOk = next.complete.done >= next.complete.needed;
  const streakOk = next.streak.met;
  const conditions: UnlockCondition[] = [
    completeOk
      ? { ok: true, line: { key: "unlock.cond_complete_ok" } }
      : { ok: false, line: { key: "unlock.cond_complete", params: { done: next.complete.done, needed: next.complete.needed } }, bar: { value: next.complete.done, max: next.complete.needed } },
    streakOk
      ? { ok: true, line: { key: "unlock.cond_streak_ok", params: { need: next.streak.needed } } }
      : { ok: false, line: { key: "unlock.cond_streak", params: { cur: next.streak.current, need: next.streak.needed } }, bar: { value: next.streak.current, max: next.streak.needed } },
  ];
  const gain: Line = { key: `unlock.gain_${surface}`, params: { n: next.gain } };
  let when: Line;
  if (completeOk && !streakOk) when = { key: "unlock.when_days", params: { n: next.days } };
  else if (!completeOk && streakOk) when = { key: "unlock.when_complete" };
  else if (!completeOk && !streakOk) when = { key: "unlock.when_both", params: { n: next.days } };
  // İkisi de tamam ama henüz açılmamış (sunucu bir sonraki okumada açacak): bitirme cümlesi.
  else when = { key: "unlock.when_complete" };
  return { headline, spent, conditions, when, gain };
}

/** Kademeli yüzey — premium'da cümle yok (null). */
export function tieredCopy(u: TieredUnlock | null | undefined, surface: UnlockSurface): UnlockCopy | null {
  if (!u || u.premium) return null;
  return freeUnlockCopy(u, surface);
}

/** Deneme sınavı: ücretsizde kademe, premium'da paket. */
export function mockCopy(u: MockUnlock | null | undefined): UnlockCopy | null {
  if (!u) return null;
  if (!u.premium) return freeUnlockCopy(u, "mock");
  const when: Line = u.next
    ? { key: "unlock.pack_next", params: { done: u.next.complete.done, needed: u.next.complete.needed } }
    : { key: "unlock.pack_all" };
  return { headline: when, spent: false, conditions: [], when: null, gain: null };
}

/** Yürüyüş modu: bugünün oturumları. */
export function walkLine(w: WalkUnlock): Line {
  if (w.sessionOpen) return { key: "unlock.walk_open" };
  if (w.remaining > 0) return { key: "unlock.walk_left", params: { n: w.remaining } };
  return { key: "unlock.walk_spent" };
}

/**
 * "when" cümlesinin `{gain}` parametresi çevrilmiş kazanç metni — iki adımda
 * kuruluyor çünkü kazanç kendi çoğul biçimini (`.one`) taşıyor.
 */
export function whenText(copy: UnlockCopy, tr: (key: string, params?: Record<string, string | number>) => string): string | null {
  if (!copy.when) return null;
  const gain = copy.gain ? tr(copy.gain.key, copy.gain.params) : "";
  return tr(copy.when.key, { ...(copy.when.params ?? {}), gain });
}

/** Açık hak sayıları — kutlama için yüzey+seviye başına son bilinen `open`. */
export function openCounts(u: UnlockOverview): Record<string, number> {
  const out: Record<string, number> = {};
  for (const [level, v] of Object.entries(u.levels)) {
    const pairs: [string, TieredUnlock | MockUnlock | null][] = [
      ["conv", v.conversation],
      ["write", v.pathWriting],
      ["skill_speak", v.skillSpeaking],
      ["skill_write", v.skillWriting],
      ["mock", v.mock],
    ];
    for (const [k, s] of pairs) {
      if (s && !s.premium) out[`${k}:${level}`] = s.open;
    }
  }
  return out;
}

/**
 * Hangi yüzeylerde hak AÇILDI — önceki ve yeni sayılardan. İlk okumada (önceki
 * yok) boş: uygulama açılışında kutlama olmaz, yalnız gerçek bir artışta.
 */
export function newlyOpened(prev: Record<string, number> | null, next: Record<string, number>): { surface: UnlockSurface; level: string; gain: number }[] {
  if (!prev) return [];
  const out: { surface: UnlockSurface; level: string; gain: number }[] = [];
  for (const [key, n] of Object.entries(next)) {
    const before = prev[key];
    if (before === undefined || n <= before) continue;
    const [surface, level] = key.split(":");
    out.push({ surface: surface as UnlockSurface, level, gain: n - before });
  }
  return out;
}

/**
 * Patika Konuşma adımı KİLİTLİ mi (sunucu `/api/roleplay` kapısının aynası).
 *
 * Kilit YALNIZ yapay zekâ yolunu kullanacak kullanıcıda: misafir ve yapay zekâ
 * iznini REDDEDEN kullanıcı senaryolu (maliyetsiz) konuşmaya gidiyor ve adım
 * kilitlenmiyor — izin zorlanamaz. Sahiplenilmiş (hakkı düşmüş) adım her zaman
 * açık. Durum okunamadıysa kilit çizilmiyor: kapıyı sunucu tutuyor.
 */
export function conversationLocked(
  u: UnlockOverview | null | undefined,
  lessonId: string,
  level: string,
  who: { guest: boolean; aiDeclined: boolean },
): boolean {
  if (!u || who.guest || who.aiDeclined) return false;
  const c = u.levels[level]?.conversation;
  if (!c || c.premium) return false;
  if (u.owned.conversation.includes(lessonId)) return false;
  return c.remaining <= 0;
}

/**
 * Patika Yazma adımında değerlendirme hakkı yok mu. Adım KİLİTLENMİYOR (yazı
 * yine yazılır ve adım puansız tamamlanır); kartta rozet, ekranda ilerleme.
 */
export function pathWritingSpent(u: UnlockOverview | null | undefined, exerciseId: string, level: string, guest: boolean): boolean {
  if (!u || guest) return false;
  const w = u.levels[level]?.pathWriting;
  if (!w || w.premium) return false;
  if (u.owned.pathWriting.includes(exerciseId)) return false;
  return w.remaining <= 0;
}
