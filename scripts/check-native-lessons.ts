/**
 * Çözücüyü GERÇEK ders nesneleri üzerinde denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/check-native-lessons.ts`
 *
 * Hatların kendi kapıları (her hattın `check.mjs`'i) yazılanı denetliyor
 * ama hepsi ÇIKARIM üzerinden çalışıyor: `make.mjs` içerik dosyalarını
 * düzenli ifadeyle tarıyor. Bu betik tersini yapıyor — dersleri import edip
 * çalışma anındaki parçaları geziyor. İkisi arasındaki her sapma burada
 * görünür:
 *
 *   - şablonun ürettiği dize (`word()`), taramanın hiç görmediği metin
 *   - kaçış karakteri yüzünden farklı çıkan dize
 *   - `say` dışındaki diziler (`hint`, `why`)
 *
 * Ölçüt SERT: bir parça bile çözülemezse ders reddediliyor. Yarım ders —
 * içinde tek bir Türkçe cümle kalmış İngilizce anlatım — çalışıyor görünen
 * en kötü biçim.
 */
import { readFileSync } from "node:fs";
import { LESSONS } from "@/lib/lessons";
import { resolveSegments, type NativeDict } from "@/lib/lessons/native";
import type { Segment } from "@/lib/lessons/types";

const dict = JSON.parse(
  readFileSync("src/lib/lessons/generated/native-en.json", "utf8"),
) as NativeDict;

/** Sözlükçe/kalıp/başlık ayrı hatların işi; burada YALNIZ anlatım denetleniyor. */
const lessons = LESSONS.filter((l) => l.course === "de");

let segs = 0;
let ok = 0;
const misses = new Map<string, { lesson: string; prev: string | null; n: number }>();

for (const l of lessons) {
  for (const step of l.lecture ?? []) {
    const arrays: (Segment[] | undefined)[] = [step.say];
    const e = step.expect as { hint?: Segment[]; why?: Segment[] } | undefined;
    if (e?.hint) arrays.push(e.hint);
    if (e?.why) arrays.push(e.why);
    for (const arr of arrays) {
      if (!arr) continue;
      // Parça parça deneniyor: `resolveSegments` ilk hatada duruyor, oysa
      // rapor bütün eksikleri göstermeli.
      let prev: string | null = null;
      for (const s of arr) {
        if (s.lang !== "tr") {
          prev = s.text;
          continue;
        }
        segs++;
        const r = resolveSegments(dict, l.id, prev ? [{ lang: "de", text: prev }, s] : [s]);
        if (r) ok++;
        else {
          const k = s.text;
          const m = misses.get(k) ?? { lesson: l.id, prev, n: 0 };
          m.n++;
          misses.set(k, m);
        }
        prev = null;
      }
    }
  }
}

console.log(`ders ${lessons.length} · tr parça ${segs} · çözülen ${ok}`);
if (misses.size) {
  const total = [...misses.values()].reduce((a, m) => a + m.n, 0);
  console.log(`\nHATA: ${misses.size} benzersiz dize çözülemedi (${total} parça)\n`);
  for (const [text, m] of [...misses].sort((a, b) => b[1].n - a[1].n).slice(0, 25))
    console.log(`  ${String(m.n).padStart(4)}x [${m.lesson}] önce:${m.prev ?? "—"}\n       ${JSON.stringify(text.slice(0, 90))}`);
  process.exit(1);
}
console.log("\ntamam: her Türkçe parçanın İngilizcesi var");
