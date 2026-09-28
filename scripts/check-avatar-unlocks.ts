/**
 * AVATAR KİLİTLERİ TUTARLI MI (`src/lib/avatar-unlocks.ts`).
 *
 * Tablo 105 satır ve yazım hatası sessiz: rozet kimliği yanlış yazılırsa parça
 * kimsenin açamayacağı biçimde kilitli kalır, sıradan olmayan bir parça
 * tabloda unutulursa herkese bedava olur. Derleyici ikisini de görmez.
 *
 *   - her anahtar gerçek bir rozet (ACHIEVEMENTS) ya da özel anahtar
 *   - her parça kimliği katalogda var (public/avatar/v1/katalog.json)
 *   - kataloğun sıradan olmayan her parçası tabloda
 *   - kapı bütün yuvalarda eliyor, açık parçaya dokunmuyor, ayrıca verilen parçayı tanıyor
 *
 *   npm run check:avatar-unlocks
 */
import fs from "node:fs";
import path from "node:path";
import { PART_UNLOCKS, SPECIAL_UNLOCK_KEYS, stripLockedParts } from "../src/lib/avatar-unlocks";
import { DEFAULT_AVATAR, type AvatarConfig } from "../src/lib/avatar-config";

const ROOT = path.join(__dirname, "..");
const read = (p: string) => fs.readFileSync(path.join(ROOT, p), "utf8");
const ach = new Set([...read("src/lib/achievements.ts").matchAll(/\{ id: "(\w+)", titleKey/g)].map((m) => m[1]));
const cat = JSON.parse(read("public/avatar/v1/katalog.json")) as { parcalar: { id: string; nadir: string }[] };
const ids = new Set(cat.parcalar.map((p) => p.id));
const special = new Set<string>(SPECIAL_UNLOCK_KEYS);

const errors: string[] = [];
for (const [id, key] of Object.entries(PART_UNLOCKS)) {
  if (!ids.has(id)) errors.push(`${id}: katalogda yok`);
  if (!ach.has(key) && !special.has(key)) errors.push(`${id}: "${key}" ne rozet ne özel anahtar`);
}
for (const p of cat.parcalar) if (p.nadir !== "common" && !PART_UNLOCKS[p.id]) errors.push(`${p.id} (${p.nadir}): kilit koşulu yok, herkese açık kalır`);

/* KAPI DAVRANIŞI */
const full: AvatarConfig = { ...DEFAULT_AVATAR, hat: "crown", glasses: "round", mustache: "walrus", bg: "bg_aurora", extra: { neck: { id: "medal", color: null }, face: { id: "blush", color: null } } };
const none = stripLockedParts(full, new Set());
const expect = (ad: string, ok: boolean) => { if (!ok) errors.push(`kapı: ${ad}`); };
expect("kilitli şapka düşüyor", none.hat === null);
expect("açık gözlük kalıyor", none.glasses === "round");
expect("kilitli bıyık düşüyor", none.mustache === null);
expect("kilitli arka plan düşüyor", none.bg === null);
expect("kilitli boyun düşüyor", !none.extra.neck);
expect("açık yüz kalıyor", none.extra.face?.id === "blush");
const all = stripLockedParts(full, new Set(["league_win", "speak100", "conversation100", "conversation50"]));
expect("koşulu sağlanınca dokunulmuyor", JSON.stringify(all) === JSON.stringify(full));
expect("ayrıca verilen parça açık", stripLockedParts(full, new Set(), new Set(["crown"])).hat === "crown");

if (errors.length) {
  console.error(`avatar kilitleri: ${errors.length} sorun`);
  for (const e of errors) console.error("  " + e);
  process.exit(1);
}
const keys = new Set(Object.values(PART_UNLOCKS));
console.log(`tamam: ${Object.keys(PART_UNLOCKS).length} kilitli parça, ${keys.size} koşul (${[...keys].filter((k) => special.has(k)).length} özel); kapı 8 durumda doğru`);
