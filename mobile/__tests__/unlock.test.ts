/**
 * Kilit açma cümlesinin seçimi (`lib/unlock`). Sayılar sunucudan geliyor; burada
 * sınanan, aynı durumda HANGİ cümlenin çizildiği — web aynı kuralı uyguluyor ve
 * iki platform aynı durumda aynı cümleyi göstermeli.
 */
import {
  conversationLocked,
  freeUnlockCopy,
  mockCopy,
  newlyOpened,
  openCounts,
  pathWritingSpent,
  walkLine,
  whenText,
} from "../src/lib/unlock";
import type { FreeUnlock, UnlockOverview } from "../src/lib/premium";

const free = (o: Partial<FreeUnlock> & { next?: FreeUnlock["next"] }): FreeUnlock => ({
  premium: false, open: 2, used: 2, done: 2, remaining: 0, tier: 0, next: null, ...o,
});

describe("freeUnlockCopy", () => {
  test("örnek: deneme bitti, seri 3/7 → 4 gün sonra açılır", () => {
    const c = freeUnlockCopy(
      free({ open: 1, used: 1, done: 1, remaining: 0, next: { gain: 1, complete: { done: 1, needed: 1 }, streak: { current: 3, needed: 7, met: false }, days: 4 } }),
      "mock",
    );
    expect(c.spent).toBe(true);
    expect(c.headline).toEqual({ key: "unlock.spent_mock" });
    expect(c.conditions[0]).toEqual({ ok: true, line: { key: "unlock.cond_complete_ok" } });
    expect(c.conditions[1].line).toEqual({ key: "unlock.cond_streak", params: { cur: 3, need: 7 } });
    expect(c.conditions[1].bar).toEqual({ value: 3, max: 7 });
    expect(c.when).toEqual({ key: "unlock.when_days", params: { n: 4 } });
    expect(c.gain).toEqual({ key: "unlock.gain_mock", params: { n: 1 } });
    expect(whenText(c, (k, p) => `${k}${JSON.stringify(p ?? {})}`)).toBe('unlock.when_days{"n":4,"gain":"unlock.gain_mock{\\"n\\":1}"}');
  });

  test("kalan hak varken başlık kalan sayıyı söylüyor", () => {
    const c = freeUnlockCopy(free({ remaining: 1, used: 1, done: 1, next: { gain: 2, complete: { done: 1, needed: 2 }, streak: { current: 0, needed: 7, met: false }, days: 7 } }), "conv");
    expect(c.headline).toEqual({ key: "unlock.left_conv", params: { n: 1 } });
    expect(c.when).toEqual({ key: "unlock.when_both", params: { n: 7 } });
  });

  test("seri tamam, bitirme eksik → bitirince açılır", () => {
    const c = freeUnlockCopy(free({ next: { gain: 2, complete: { done: 1, needed: 2 }, streak: { current: 0, needed: 7, met: true }, days: 0 } }), "write");
    expect(c.conditions[1]).toEqual({ ok: true, line: { key: "unlock.cond_streak_ok", params: { need: 7 } } });
    expect(c.when).toEqual({ key: "unlock.when_complete" });
  });

  test("sonraki yok: kademe açıldıysa unlock.max, açılmadıysa hiçbir şey", () => {
    expect(freeUnlockCopy(free({ tier: 2 }), "skill_write").when).toEqual({ key: "unlock.max" });
    expect(freeUnlockCopy(free({ tier: 0 }), "skill_write").when).toBeNull();
  });
});

test("premium deneme: paket cümlesi", () => {
  expect(mockCopy({ premium: true, open: 3, done: 2, packSize: 3, next: { complete: { done: 2, needed: 3 } } })?.headline).toEqual({ key: "unlock.pack_next", params: { done: 2, needed: 3 } });
  expect(mockCopy({ premium: true, open: 6, done: 6, packSize: 3, next: null })?.headline).toEqual({ key: "unlock.pack_all" });
});

test("yürüyüş satırı", () => {
  const w = { premium: false, perDay: 3, used: 1, remaining: 2, pocket: false };
  expect(walkLine(w)).toEqual({ key: "unlock.walk_left", params: { n: 2 } });
  expect(walkLine({ ...w, used: 3, remaining: 0 })).toEqual({ key: "unlock.walk_spent" });
});

const overview = (conv: FreeUnlock): UnlockOverview => ({
  streak: { current: 0, longest: 0, step: 7 },
  walk: { premium: false, perDay: 3, used: 0, remaining: 3, pocket: false },
  levels: { A1: { conversation: conv, pathWriting: conv, skillSpeaking: conv, skillWriting: conv, mock: null } },
  owned: { conversation: ["l-owned"], pathWriting: ["w-owned"], skills: [] },
  chatTurnsPerDay: 300,
});

test("Konuşma kilidi: misafir ve izni reddeden hariç, sahiplenilmiş hariç", () => {
  const u = overview(free({ remaining: 0 }));
  const who = { guest: false, aiDeclined: false };
  expect(conversationLocked(u, "l-new", "A1", who)).toBe(true);
  expect(conversationLocked(u, "l-owned", "A1", who)).toBe(false);
  expect(conversationLocked(u, "l-new", "A1", { guest: true, aiDeclined: false })).toBe(false);
  expect(conversationLocked(u, "l-new", "A1", { guest: false, aiDeclined: true })).toBe(false);
  expect(conversationLocked(overview(free({ remaining: 1 })), "l-new", "A1", who)).toBe(false);
  expect(conversationLocked(null, "l-new", "A1", who)).toBe(false);
  expect(pathWritingSpent(u, "w-owned", "A1", false)).toBe(false);
  expect(pathWritingSpent(u, "w-new", "A1", false)).toBe(true);
});

test("kutlama: ilk okumada yok, artışta var", () => {
  const a = openCounts(overview(free({ open: 2 })));
  const b = openCounts(overview(free({ open: 4 })));
  expect(newlyOpened(null, a)).toEqual([]);
  expect(newlyOpened(a, a)).toEqual([]);
  expect(newlyOpened(a, b)).toContainEqual({ surface: "conv", level: "A1", gain: 2 });
});
