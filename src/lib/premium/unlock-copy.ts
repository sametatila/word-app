import type { MockUnlock, TieredUnlock, WalkUnlock } from "./unlock";

/**
 * KİLİT AÇMA DURUMUNUN CÜMLELERİ — hangi anahtar, hangi parametre.
 *
 * Hesap sunucuda (`unlock.ts`), cümle burada. Mobil karşılığı birebir aynı
 * kuralla kuruyor (mobil `lib/` altındaki eşi): iki platform aynı sayıdan
 * aynı cümleyi göstermeli — "webde 4 gün, telefonda 3 gün" diye bir hata
 * sınıfı doğmasın. Saf: "server-only" yok, istemci bileşeni de kullanıyor.
 *
 * Kural (2026-09-25, `docs/premium/README.md` §2): kullanıcı hiçbir kilitte "ne
 * yapacağım" diye kalmamalı. Üç parça: ne kadar hakkın var (başlık), sonraki
 * hak için ne gerekiyor (✓ işaretli koşullar, seri çubuğu), ne zaman açılır
 * (tek cümle). Premium'la hemen açma seçeneği hep yanında.
 */

export type Line = { key: string; params?: Record<string, number> };

/** Yüzey son ekleri — sözlükte `unlock.left_<ek>`, `unlock.gain_<ek>` … */
export type UnlockSurfaceKey = "conv" | "write" | "skill_speak" | "skill_write" | "mock";

/*
  ANAHTARLAR DÜZ YAZILI, şablonla kurulmuyor: `i18n:check` ölü anahtar
  denetimi anahtarı kaynakta düz metin olarak arıyor; `unlock.left_${s}` gibi
  kurulan bir ad orada görünmez ve anahtar ölü sayılırdı.
*/
const LEFT: Record<UnlockSurfaceKey, string> = {
  conv: "unlock.left_conv",
  write: "unlock.left_write",
  skill_speak: "unlock.left_skill_speak",
  skill_write: "unlock.left_skill_write",
  mock: "unlock.left_mock",
};
const SPENT: Record<UnlockSurfaceKey, string> = {
  conv: "unlock.spent_conv",
  write: "unlock.spent_write",
  skill_speak: "unlock.spent_skill_speak",
  skill_write: "unlock.spent_skill_write",
  mock: "unlock.spent_mock",
};
const GAIN: Record<UnlockSurfaceKey, string> = {
  conv: "unlock.gain_conv",
  write: "unlock.gain_write",
  skill_speak: "unlock.gain_skill_speak",
  skill_write: "unlock.gain_skill_write",
  mock: "unlock.gain_mock",
};

export type UnlockCondition = {
  /** Koşul tamam mı — arayüz ✓ çiziyor. */
  ok: boolean;
  line: Line;
  /** Seri çubuğu: güncel / gereken. Yalnız tamamlanmamış seri koşulunda. */
  bar?: { cur: number; need: number };
};

export type UnlockCopy = {
  /** "Bu seviyede 1 Konuşma hakkın kaldı" / "… hakların bitti". */
  headline: Line | null;
  /** Kalan hak yok mu — kilit tonunda çizilir. */
  spent: boolean;
  conditions: UnlockCondition[];
  /** "4 gün sonra açılır: +1 deneme sınavı" — `gain` ayrıca çevrilip `{gain}`e konuyor. */
  when: { key: string; params: Record<string, number>; gain: Line } | null;
  /** Seriyle açılabilecek hakların hepsi açıldı. */
  max: boolean;
};

/**
 * Kademeli yüzeyin (ücretsiz) cümleleri. Premium'da null — premium'un kademesi
 * yok, söylenecek bir şey de yok (kötüye kullanım tavanı ayrı bir notta).
 */
export function tieredCopy(state: TieredUnlock | MockUnlock | null | undefined, surface: UnlockSurfaceKey): UnlockCopy | null {
  if (!state || state.premium) return null;
  const spent = state.remaining <= 0;
  const headline: Line = spent ? { key: SPENT[surface] } : { key: LEFT[surface], params: { n: state.remaining } };
  const next = state.next;
  if (!next) return { headline, spent, conditions: [], when: null, max: state.tier > 0 };
  const completeOk = next.complete.done >= next.complete.needed;
  const streakOk = next.streak.met;
  const conditions: UnlockCondition[] = [
    completeOk
      ? { ok: true, line: { key: "unlock.cond_complete_ok" } }
      : { ok: false, line: { key: "unlock.cond_complete", params: { done: next.complete.done, needed: next.complete.needed } } },
    streakOk
      ? { ok: true, line: { key: "unlock.cond_streak_ok", params: { need: next.streak.needed } } }
      : {
          ok: false,
          line: { key: "unlock.cond_streak", params: { cur: next.streak.current, need: next.streak.needed } },
          bar: { cur: next.streak.current, need: next.streak.needed },
        },
  ];
  const gain: Line = { key: GAIN[surface], params: { n: next.gain } };
  const when: UnlockCopy["when"] =
    completeOk && !streakOk ? { key: "unlock.when_days", params: { n: next.days }, gain }
    : !completeOk && streakOk ? { key: "unlock.when_complete", params: {}, gain }
    : !completeOk && !streakOk ? { key: "unlock.when_both", params: { n: next.days }, gain }
    : null;
  return { headline, spent, conditions, when, max: false };
}

/** Premium deneme sınavı paketinin tek satırı. */
export function packCopy(state: MockUnlock | null | undefined): Line | null {
  if (!state || !state.premium) return null;
  return state.next
    ? { key: "unlock.pack_next", params: { done: state.next.complete.done, needed: state.next.complete.needed } }
    : { key: "unlock.pack_all" };
}

/** Yürüyüş modunun günlük oturum satırı. Premium'da null (tavan ayrı notta). */
export function walkCopy(state: WalkUnlock | null | undefined): Line | null {
  if (!state || state.premium) return null;
  if (state.sessionOpen) return { key: "unlock.walk_open" };
  if (state.remaining > 0) return { key: "unlock.walk_left", params: { n: state.remaining } };
  return { key: "unlock.walk_spent" };
}

/** Bir yüzeyin sayfaya inen görünümü (web sunucu bileşenleri → istemci). */
export type SurfaceView = {
  copy: UnlockCopy | null;
  /** Açık hak sayısı — kutlama bunun artışına bakıyor. */
  open: number;
  remaining: number;
};

/** Patika ünitesinin Konuşma/Yazma kotası (`unlock-view` `pathQuota`). */
export type PathQuota = {
  /** Konuşma adımının hakkı bitti ve kilit çizilebilir (misafir/izni reddetmiş değil). */
  convLockable: boolean;
  /** Sahiplenilmiş Konuşma adımları (ders kimlikleri) — hak bitse de açık. */
  ownedLessons: string[];
  conv: SurfaceView | null;
  write: SurfaceView | null;
};
