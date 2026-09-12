/**
 * PATİKA BOŞLUĞU — havuzda olup patikanın hiç öğretmediği sözcükler.
 *
 *   npm run check:pathgap            (iki kurs)
 *   npm run check:pathgap -- en      (tek kurs)
 *
 * NEDEN AYRI BİR RAPOR. `check:unitvocab` ve `check:en-unitvocab` bir
 * EGZERSİZİ ölçüyor ("bu metin penceresinin dışına çıkıyor mu"). Bu betik
 * PATİKAYI ölçüyor ("bu sözcük hiç öğretiliyor mu"). İkisinin kesiştiği yerde
 * ünite raporları DERSSİZ sınıfını basıyor ve orası bir eğri değil bir liste
 * istiyor: yazarın sorusu "hangi sözcüğü hangi derse koyayım".
 *
 * SIRALAMA KULLANIMA GÖRE. Havuzun yarısı hiç öğretilmiyor ve hepsini derse
 * sokmak imkânsız (ders başına sekiz sözcük, sayı sabit). Ama bir sözcük
 * kursun KENDİ metinlerinde geçiyorsa öğrenci onunla zaten karşılaşıyor
 * demektir; öğretilmemesi orada gerçek bir boşluk. Liste o sıklığa göre
 * diziliyor — hiç geçmeyenler ayrı sayılıyor, onlar yalnız kart motorunun
 * işi ve sorun değil.
 *
 * SAYIM KURS GENELİ. Bir seviyenin satırındaki sıklık o seviyenin değil,
 * kursun TAMAMININ metinlerinden geliyor: A1 havuzundaki bir sözcük yalnız
 * B2 metninde geçiyorsa da öğrenci onunla karşılaşıyor demektir. (`Text`
 * kurs genelinde 230 kez geçiyor, A1 metinlerinde hiç.)
 *
 * EŞLEŞTİRME YAKLAŞIKTIR ve iki dilde ayrı: İngilizcede `enStems` (düzensiz
 * fiil, kısaltma, iyelik, türetme), Almancada kapının `kokAra`sı (ön ek
 * soyma + dört harfe kadar kısaltma). İkisi de ünite raporlarında kullanılan
 * ölçünün aynısı, yani iki rapor aynı sözcük için aynı cevabı veriyor.
 * Bilinen gürültü: İngilizcede kısaltma soyma `haven't`ı `haven` sözcüğüne
 * bağlıyor (C1'de ×25). Sayılar önceliklendirme içindir, bütçe için değil.
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { lessonsFor } from "../src/lib/lessons/index";
import type { SkillExercise } from "../src/lib/skills/types";
import { germanSurface, englishSurface, type LooseExercise } from "./lib/skill-surface";
import { enStems, LEVELS } from "./lib/en-gate";

const require = createRequire(import.meta.url);
const { kokAra, SERBEST } = require("./lib/vocab-gate.cjs") as {
  kokAra: <T>(m: Map<string, T>, w: string) => T | undefined;
  SERBEST: Set<string>;
};

/* Tek harfli parça atılıyor: havuz kaydı "U-turn" tirede bölününce "u" diye
   bir sözcük uyduruyor ve `enStems` "us"u ona indirgeyip B1 boşluğunun
   başına "u×120" yazıyordu. */
const kelime = (raw: string) =>
  raw.toLowerCase().replace(/\(.*?\)/g, "").split(/[\s/,-]+/).map((w) => w.replace(/^'+|'+$/g, "")).filter((w) => w.length >= 2);

type Kurs = "de" | "en";

/** Havuz: sözcük → ilk göründüğü seviye. */
function havuz(kurs: Kurs): Map<string, string> {
  const dosya = kurs === "en" ? "data/app/words-en.json" : "data/app/words.json";
  const ham = readFileSync(dosya, "utf8").trim();
  const rows: { de: string; niveau: string }[] = kurs === "en"
    ? ham.split("\n").filter(Boolean).map((l) => JSON.parse(l))
    : JSON.parse(ham);
  const m = new Map<string, string>();
  for (const r of rows) {
    const lv = r.niveau.toLowerCase();
    for (const w of kelime(r.de)) {
      const eski = m.get(w);
      if (eski === undefined || LEVELS.indexOf(lv) < LEVELS.indexOf(eski)) m.set(w, lv);
    }
  }
  return m;
}

/** Ders sözlükçesi: sözcük → öğretildiği ilk seviye. Kaynak `lessonsFor`. */
function ders(kurs: Kurs): Map<string, string> {
  const m = new Map<string, string>();
  for (const l of lessonsFor(kurs)) {
    const lv = l.level.toLowerCase();
    const koy = (raw: string) => {
      for (const w of kelime(raw)) {
        const eski = m.get(w);
        if (eski === undefined || LEVELS.indexOf(lv) < LEVELS.indexOf(eski)) m.set(w, lv);
      }
    };
    for (const v of l.vocab) koy(v.de);
    for (const p of l.patterns) koy(p.de);
  }
  return m;
}

/**
 * Kursun kendi egzersiz metinlerinde sözcük sıklığı — KURS GENELİNDE, seviye
 * seviye değil. Soru "bu sözcük öğrenciye hiç görünüyor mu"; A1 havuzundaki
 * bir sözcük B2 metninde geçiyorsa da öğretilmemiş olması bir boşluktur.
 * Ölçüldü ve doğrulandı: `Text*` kurs genelinde 230, A1 metinlerinde 0.
 */
function kullanim(kurs: Kurs): Map<string, number> {
  const m = new Map<string, number>();
  const onek = kurs === "en" ? /^en-(a1|a2|b1|b2|c1)-/ : /^(a1|a2|b1|b2|c1)-/;
  for (const e of BUNDLED_EXERCISES as unknown as LooseExercise[]) {
    if (!onek.test(e.id)) continue;
    const metin = kurs === "en" ? englishSurface(e as unknown as SkillExercise) : germanSurface(e);
    const tok = kurs === "en"
      ? (metin.toLowerCase().match(/[\p{L}'-]{2,}/gu) ?? [])
      : (metin.toLowerCase().match(/[a-zäöüßéèêáàóúï]{2,}/g) ?? []);
    for (const w of tok) m.set(w, (m.get(w) ?? 0) + 1);
  }
  return m;
}

/**
 * Belirteç → havuz sözcüğü, sonra havuz sözcüğü → toplam geçiş.
 *
 * İLK YAZIMDA TERS YÖNE BAKIYORDUM — her havuz sözcüğü için "hangi
 * belirteçler buna indirgeniyor" diye, tek anahtarlı bir haritayla. Felaketti:
 * tek anahtarla kapının eşleştiricisi (son iki harf serbest) `bitte`yi
 * `bitter`a bağladı ve A1'in en acil boşluğu "bitter×204" çıktı. Doğru yön bu:
 * her belirteç havuzun TAMAMINA karşı bir kez çözülüyor, yani `bitte` kendi
 * kaydına gidiyor ve `bitter`ı şişirmiyor.
 */
function kokSayimi(kurs: Kurs, kul: Map<string, number>, hv: Map<string, string>): Map<string, number> {
  const kendi = new Map<string, string>();
  for (const w of hv.keys()) kendi.set(w, w);
  const out = new Map<string, number>();
  for (const [t, c] of kul) {
    const kok = kurs === "en" ? enStems(t).find((st) => hv.has(st)) : kokAra(kendi, t);
    if (!kok) continue;
    out.set(kok, (out.get(kok) ?? 0) + c);
  }
  return out;
}

const arg = (process.argv[2] ?? "").toLowerCase();
const kurslar: Kurs[] = arg === "en" || arg === "de" ? [arg as Kurs] : ["de", "en"];

for (const kurs of kurslar) {
  const hv = havuz(kurs);
  const ds = ders(kurs);
  const kul = kokSayimi(kurs, kullanim(kurs), hv);
  console.log(`\n=== ${kurs.toUpperCase()} kursu — patika boşluğu ===`);
  for (const lv of LEVELS) {
    const seviyeHavuz = [...hv].filter(([, l]) => l === lv).map(([w]) => w);
    if (!seviyeHavuz.length) continue;
    const ogretilen = seviyeHavuz.filter((w) => ds.has(w));
    const bosluk = seviyeHavuz.filter((w) => !ds.has(w) && !SERBEST.has(w));
    const kullanilan = bosluk
      .map((w) => [w, kul.get(w) ?? 0] as const)
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1]);
    console.log(
      `  ${lv.toUpperCase()}  havuz ${String(seviyeHavuz.length).padStart(4)} · patika öğretiyor ${String(ogretilen.length).padStart(4)} (%${((ogretilen.length / seviyeHavuz.length) * 100).toFixed(0)})` +
      ` · hiç öğretilmeyen ${String(bosluk.length).padStart(4)}, bunların ${kullanilan.length}'i kurs metinlerinde GEÇİYOR`,
    );
    if (kullanilan.length) {
      console.log(`      önce bunlar (sayım kurs geneli): ${kullanilan.slice(0, 15).map(([w, n]) => `${w}×${n}`).join(" · ")}`);
    }
  }
}
