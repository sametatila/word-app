/// <reference types="node" />
/**
 * A1 PAKETTEN, TOHUM YEDEK (denetim T20).
 *
 * Anadil sözlüğü sunucudan, Türkçe metne anahtarlı iniyor. A1 yalnız ikilideki
 * tohumdan okunurken A1 metni değişince eski build'de konuşma Türkçeye
 * düşüyordu. Paket inerse o kullanılmalı (sözlükle aynı sürüm); inemezse tohum.
 */
import de from "../src/data/conversations/de-a1.json";

const mockState = { ok: true };
jest.mock("../src/content/store", () => {
  const seed = require("../src/data/conversations/de-a1.json") as { id: string; title: string }[];
  const pack = Object.fromEntries(seed.map((c) => [c.id, { ...c, title: `${c.title} (paket)` }]));
  return {
    ensurePack: jest.fn(async () => mockState.ok),
    listContentItems: jest.fn(async () => Object.keys(pack)),
    getContentItem: jest.fn(async (_p: string, id: string) => pack[id] ?? null),
    syncContentPointer: jest.fn(async () => ({ r: 1, d: [] })),
    isContentDisabled: jest.fn(() => false),
    contentRelease: jest.fn(() => 1),
  };
});

type Conv = { id: string; title: string };
const first = (de as unknown as Conv[])[0];

type Mod = typeof import("../src/data/conversations");
function fresh(): Mod {
  let m: Mod | undefined;
  jest.isolateModules(() => {
    m = require("../src/data/conversations") as Mod;
  });
  return m!;
}

test("paket inerse A1 paketten okunuyor", async () => {
  mockState.ok = true;
  const m = fresh();
  expect(await m.ensureConversations("A1", "de")).toBe(true);
  expect(m.conversationsForLevel("A1", "de")[0].title).toBe(`${first.title} (paket)`);
});

test("paket inemezse A1 tohumdan açılıyor", async () => {
  mockState.ok = false;
  const m = fresh();
  expect(await m.ensureConversations("A1", "de")).toBe(true);
  expect(m.conversationsForLevel("A1", "de")[0].title).toBe(first.title);
});
