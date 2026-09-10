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
import { resolveExercise, isProseQuote, isTurkishStem, type NativeDict } from "@/lib/lessons/native";
import { extractTasks } from "../data/skills/task/make.js";

const dict = JSON.parse(
  readFileSync("src/lib/lessons/generated/native-en.json", "utf8"),
) as NativeDict;

type Q = { explain?: string };
type G = { de?: string; tr?: string; en?: string; note?: string };
type Ex = {
  id: string;
  course?: string;
  intro?: string;
  questions?: Q[];
  gloss?: G[];
  tasks?: { phrases?: G[] }[];
};

/* Almanca kurs. İngilizce kursun egzersizlerinde de Türkçe yönerge var ama
   İngilizce konuşan biri İngilizce kursu almıyor — o eksen `PAIR_READY`de
   kapalı ve açıldığında kendi hattı kurulacak. */
const list = (BUNDLED_EXERCISES as unknown as Ex[]).filter((e) => (e.course ?? "de") === "de");

let strings = 0;
let quotes = 0;
let glosses = 0;
/* Görev metni AYRI sayılıyor: anahtarı `tür + AYRAÇ + tr` ve çıkarıcı zaten
   türe göre tekilleştiriyor, o yüzden ölçüm de oradan alınıyor. Kaynağı
   tarayıp aynı ayrımı burada tekrar kurmak ikinci bir doğruluk kaynağı
   açardı — hattın kendi kuralı bunu yasaklıyor. */
const taskRows = extractTasks();
const taskMissing = taskRows.filter((r) => dict.task[`${r.kind}\u0000${r.tr}`] === undefined);
const misses = new Map<string, { ex: string; n: number }>();
/* Sözlükçe KATLANIYOR, çevrilmiyor: `tr` yerine `en` konuyor. Karşılığı
   olmayan bir madde egzersizi tümden reddettiriyor ve bu "reddedildi"
   listesinde sebebi görünmüyor — o yüzden ayrıca sayılıyor. Bir kez
   yaşandı: kütüphanenin 25 yazma egzersizinde `phrases` alanının 125
   maddesi `en` taşımıyordu ve 25 egzersiz birden düşüyordu. */
const noEn = new Map<string, { de: string; ex: string }>();
const bad: string[] = [];
/** Çözüldükten SONRA hâlâ Türkçe görünen kök/şık/başlık/brifing → dize, egzersiz. */
const leftover = new Map<string, string>();

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
  for (const g of [...(e.gloss ?? []), ...(e.tasks ?? []).flatMap((t) => t.phrases ?? [])]) {
    glosses++;
    if (!g.en?.trim()) noEn.set(g.tr ?? g.de ?? "?", { de: g.de ?? "?", ex: e.id });
    if (g.note?.trim() && dict.prose[g.note] === undefined)
      misses.set(g.note, { ex: e.id, n: (misses.get(g.note)?.n ?? 0) + 1 });
  }
  const out = resolveExercise(
    dict,
    e as unknown as { intro: string; questions?: { explain: string }[] },
  ) as {
    title?: string;
    questions?: { text?: string; options?: string[] }[];
    tasks?: { stimulus?: string; source?: string }[];
  } | null;
  if (!out) {
    bad.push(e.id);
    continue;
  }
  /* ÇIKTIDA TÜRKÇE KALDI MI. Soru kökü, şıklar ve başlık uzun süre
     çözücünün dışındaydı ve o yüzden hiçbir kapı onlara bakmıyordu:
     4.100 kökün 246'sı Türkçe kalıyordu ve hata yalnız ekranda görünürdü.
     Sözlükte karşılık yoksa `resolveExercise` zaten `null` döner ve
     yukarıdaki dal yakalar; bu tarama ise ÖLÇÜTÜN kendisi kayarsa
     (`isTurkishStem` daralırsa) sessiz kalmayı önlüyor. */
  const leak = (t?: string) => {
    if (typeof t === "string" && isTurkishStem(t)) leftover.set(t, e.id);
  };
  leak(out.title);
  for (const q of out.questions ?? []) {
    leak(q.text);
    (q.options ?? []).forEach(leak);
  }
  for (const t of out.tasks ?? []) {
    leak(t.stimulus);
    leak(t.source);
  }
}

console.log(
  `egzersiz ${list.length} · düz metin ${strings} · alıntı (geçiş) ${quotes} · ` +
    `görev metni ${taskRows.length} · katlanan sözlükçe ${glosses} · ` +
    `çözülen egzersiz ${list.length - bad.length}`,
);

if (taskMissing.length) {
  console.log(`\nHATA: ${taskMissing.length} görev metni dizesi sözlükte yok\n`);
  for (const r of taskMissing.slice(0, 25)) console.log(`  [${r.kind}] ${JSON.stringify(r.tr.slice(0, 80))}`);
  process.exit(1);
}

if (noEn.size) {
  console.log(`\nHATA: ${noEn.size} sözlükçe maddesinin \`en\` karşılığı yok\n`);
  for (const [tr, m] of [...noEn].slice(0, 25)) console.log(`  [${m.ex}] ${m.de} — ${tr}`);
  process.exit(1);
}

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
if (leftover.size) {
  console.log(`\nHATA: çözüldükten sonra ${leftover.size} dize hâlâ Türkçe görünüyor\n`);
  for (const [text, id] of [...leftover].slice(0, 25))
    console.log(`  [${id}] ${JSON.stringify(text.slice(0, 90))}`);
  process.exit(1);
}
console.log(
  "\ntamam: her egzersizin yönergesi, açıklaması, soru kökü, şıkları," +
    " başlığı ve görev brifingi İngilizceye çözülüyor",
);
