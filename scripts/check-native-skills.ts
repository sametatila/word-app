/**
 * Çözücüyü GERÇEK egzersiz nesneleri üzerinde denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json scripts/check-native-skills.ts`
 *
 * Hattın kendi kapısı (`data/skills/prose/check.ts`) YAZILANI denetliyor:
 * çıkarıcının bulduğu her satırın karşılığı var mı, kurallara uyuyor mu.
 * Bu betik tersini yapıyor — üretilmiş sözlüğü açıp `resolveExercise`i
 * çalıştırıyor. İkisinin arası boş kalırsa görülmeyen şey şudur:
 *
 *   - `apply.mjs` `out/`u okumayı unutur ya da yanlış dizine bakar
 *   - üretilen sözlük sunucu derlemesinde YOKTUR (bkz. `derived.json`
 *     olayı: dosya .gitignore'daydı, sözlük 4.640 yerine 714 madde oldu,
 *     çözücü bütün dersleri reddetti ve İngilizce kurs sessizce Türkçeye
 *     düştü — hiçbir yerde hata görünmeden)
 *   - alıntı ölçütü ile paketleyicinin ölçütü ayrışır
 *
 * Ölçüt SERT, çözücününkiyle aynı: bir dize bile eksikse egzersiz reddedilir.
 */
import { readFileSync } from "node:fs";
import { BUNDLED_EXERCISES } from "@/lib/skills";
import { resolveExercise, isProseQuote, type NativeDict } from "@/lib/lessons/native";

const dict = JSON.parse(
  readFileSync("src/lib/lessons/generated/native-en.json", "utf8"),
) as NativeDict;

type Q = { explain?: string };
type Ex = { id: string; course?: string; intro?: string; questions?: Q[] };

/* Almanca kurs. İngilizce kursun egzersizlerinde de Türkçe yönerge var ama
   İngilizce konuşan biri İngilizce kursu almıyor — o eksen `PAIR_READY`de
   kapalı ve açıldığında kendi hattı kurulacak. */
const list = (BUNDLED_EXERCISES as unknown as Ex[]).filter((e) => (e.course ?? "de") === "de");

let strings = 0;
let quotes = 0;
const misses = new Map<string, { ex: string; n: number }>();
const bad: string[] = [];

for (const e of list) {
  for (const tr of [e.intro, ...(e.questions ?? []).map((q) => q.explain)]) {
    if (typeof tr !== "string" || !tr.trim()) continue;
    if (isProseQuote(tr)) {
      quotes++;
      continue;
    }
    strings++;
    if (dict.prose[tr] === undefined) {
      const m = misses.get(tr) ?? { ex: e.id, n: 0 };
      m.n++;
      misses.set(tr, m);
    }
  }
  if (!resolveExercise(dict, e as unknown as { intro: string; questions?: { explain: string }[] }))
    bad.push(e.id);
}

console.log(
  `egzersiz ${list.length} · çevrilecek dize ${strings} · alıntı (geçiş) ${quotes} · ` +
    `çözülen egzersiz ${list.length - bad.length}`,
);

if (misses.size) {
  const total = [...misses.values()].reduce((a, m) => a + m.n, 0);
  console.log(`\nHATA: ${misses.size} benzersiz dize çözülemedi (${total} geçiş)\n`);
  for (const [text, m] of [...misses].sort((a, b) => b[1].n - a[1].n).slice(0, 25))
    console.log(`  ${String(m.n).padStart(4)}x [${m.ex}] ${JSON.stringify(text.slice(0, 90))}`);
  process.exit(1);
}
if (bad.length) {
  console.log(`\nHATA: ${bad.length} egzersiz reddedildi: ${bad.slice(0, 10).join(", ")}`);
  process.exit(1);
}
console.log("\ntamam: her egzersizin yönergesi ve açıklaması İngilizceye çözülüyor");
