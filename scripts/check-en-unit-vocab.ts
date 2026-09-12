/**
 * İngilizce kursun ÜNİTE hizalı beceri egzersizleri, o üniteye kadar
 * ÖĞRETİLEN kelimelerin dışına çıkıyor mu?
 *
 *   npm run check:en-unitvocab            (bütün seviyeler)
 *   npm run check:en-unitvocab -- a1      (tek seviye)
 *
 * Almanca kardeşi `check-unit-vocab.ts`; ondan tek farkı ölçen makine
 * (`lib/en-gate.ts`, Almancada `lib/vocab-gate.cjs`) ve havuzun kaynağı.
 * Ölçü aynı: Patika'da ünite 1'i açan öğrenci HENÜZ dört ders görmüştür;
 * seviyenin tamamını bildiğini varsaymak o egzersizi ölçülemez kılar.
 * Kütüphane denetleyicisi (`check:libvocab`) seviye ölçüsünü kullanır ve
 * orada doğrudur: kütüphane egzersizinin ünitesi yok, öğrenci seviyeyi
 * kendi seçiyor.
 *
 * HAVUZ = bu seviyenin 1..4u. derslerinin kelime ve kalıpları + ALT
 * seviyelerin tamamı + serbest işlev sözcükleri + egzersizin KENDİ
 * sözlükçesi. Sonuncusu bilerek: sözlükçedeki kelime öğrenciye o ekranda
 * veriliyor, yani "bilinmeyen" değil. Almanca hat da aynısını yapıyor.
 *
 * Kapı DEĞİL, rapor: çıktı sıfır olmak zorunda değil, çıkanın sözlükçeye mi
 * gireceğine yoksa metinden mi çıkacağına yazar karar verir.
 */
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import type { SkillExercise } from "../src/lib/skills/types";
// Ölçülecek yüzey üç denetleyicide ORTAK; gerekçe `lib/skill-surface.ts`de.
import { englishSurface } from "./lib/skill-surface";
import { lessonsFor } from "../src/lib/lessons/index";
import { UNIT_LESSONS } from "../src/lib/immersion/build";
import { EN_FREE, LEVELS, measureEn, enNerede } from "./lib/en-gate";

/** Egzersizin kendi sözlükçesi öğrenciye verilmiştir — havuza eklenir. */
function allowed(e: SkillExercise): string[] {
  const ek = e.gloss.map((g) => g.de);
  if (e.skill === "writing") for (const t of e.tasks) {
    if ("phrases" in t) ek.push(...t.phrases.map((p) => p.de));
    if ("words" in t) ek.push(...t.words.map((p) => p.de));
  }
  return ek;
}

/** Bir dizeyi sözcüklerine ayırıp havuza ekler ("I'm from …" → i'm, from). */
function feed(pool: Set<string>, raw: string) {
  for (const w of raw.toLowerCase().replace(/[^\p{L}\p{N}'\s/-]/gu, " ").split(/[\s/]+/)) {
    const c = w.replace(/^'+|'+$/g, "");
    if (c) pool.add(c);
  }
}

/**
 * Seviyenin `unit`. ünitesine kadar öğretilmiş küme: alt seviyelerin tamamı +
 * bu seviyenin ilk `UNIT_LESSONS * unit` dersi.
 */
function unitPool(level: string, unit: number): Set<string> {
  const pool = new Set(EN_FREE);
  const lessons = lessonsFor("en");
  const upto = LEVELS.indexOf(level);
  for (const l of lessons) {
    const li = LEVELS.indexOf(l.level.toLowerCase());
    if (li > upto) continue;
    if (li === upto) {
      const n = lessons.filter((x) => x.level === l.level).indexOf(l);
      if (n >= UNIT_LESSONS * unit) continue;
    }
    for (const v of l.vocab) feed(pool, v.de);
    for (const p of l.patterns) feed(pool, p.de);
  }
  return pool;
}

/**
 * Seviyenin sözcük → İLK ÖĞRETİLDİĞİ ÜNİTE haritası.
 *
 * `unitPool` ile aynı veriden ama başka soruyla: o "bu üniteye kadar ne
 * öğretildi" der, bu "bu sözcük KAÇINCI ünitede öğretiliyor". Bulgu
 * sınıflandırması ikincisine muhtaç — "yirmi ünite sonra öğretiliyor" ile
 * "bir ünite sonra" aynı iş değil.
 */
function dersUnite(level: string): Map<string, number> {
  const m = new Map<string, number>();
  const lessons = lessonsFor("en").filter((l) => l.level.toLowerCase() === level);
  lessons.forEach((l, i) => {
    const u = Math.floor(i / UNIT_LESSONS) + 1;
    const koy = (raw: string) => {
      for (const w of raw.toLowerCase().replace(/[^\p{L}\p{N}'\s/-]/gu, " ").split(/[\s/]+/)) {
        const c = w.replace(/^'+|'+$/g, "");
        if (c && !m.has(c)) m.set(c, u);
      }
    };
    for (const v of l.vocab) koy(v.de);
    for (const p of l.patterns) koy(p.de);
  });
  return m;
}

const BASLIK: Record<string, string> = {
  ustu: "SEVİYE ÜSTÜ   — havuzda var ama üst seviyede; metin sadeleşmeli ya da sözlükçeye girmeli",
  erken: "ERKEN         — bu seviyenin dersi öğretiyor, ama daha sonraki ünitede",
  derssiz: "DERSSİZ       — havuzda var ama BU SEVİYENİN dersleri öğretmiyor (üst seviyede öğretiliyor olabilir; patika boşluğu)",
  turev: "TÜREV         — kök bu üniteye kadar öğretilmiş; kapı yüzey biçimini tanımadı (içerik kusuru DEĞİL)",
  yabanci: "HAVUZDA YOK   — ödünç sözcük, kısaltma, özel ad ya da yazım hatası",
};

const levelArg = (process.argv[2] ?? "all").toLowerCase();
const levels = levelArg === "all" ? LEVELS : [levelArg];
for (const level of levels) {
  const list = BUNDLED_EXERCISES.filter((e) => new RegExp(`^en-${level}-u\\d+-`).test(e.id));
  if (!list.length) continue;
  console.log(`\nEN ${level.toUpperCase()} · ünite hizalı egzersiz: ${list.length}`);
  const genel = new Map<string, number>();
  const du = dersUnite(level);
  const sinifSay = new Map<string, number>();
  const sinifKelime = new Map<string, Map<string, string>>();
  let tokT = 0;
  let disiT = 0;
  for (const e of list) {
    const r = measureEn(englishSurface(e), unitPool(level, e.unit ?? 1), allowed(e));
    tokT += r.tok.length;
    disiT += r.disi.length;
    const oran = r.tok.length ? ((r.disi.length / r.tok.length) * 100).toFixed(1) : "0";
    if (r.disi.length) {
      const say = new Map<string, number>();
      for (const w of r.disi) say.set(w, (say.get(w) ?? 0) + 1);
      console.log(`  ${e.id.padEnd(16)} %${oran.padStart(4)} dışı (${r.disi.length}/${r.tok.length}): ${[...say].map(([w, n]) => (n > 1 ? `${w}×${n}` : w)).join(", ")}`);
      for (const w of r.disi) {
        genel.set(w, (genel.get(w) ?? 0) + 1);
        const n = enNerede(w, level, e.unit ?? 1, du);
        sinifSay.set(n.sinif, (sinifSay.get(n.sinif) ?? 0) + 1);
        const t = sinifKelime.get(n.sinif) ?? new Map<string, string>();
        if (!t.has(w)) t.set(w, n.detay);
        sinifKelime.set(n.sinif, t);
      }
    } else console.log(`  ${e.id.padEnd(16)} temiz (${r.tok.length} belirteç)`);
  }
  console.log(`  toplam %${tokT ? ((disiT / tokT) * 100).toFixed(1) : "0"} · en sık dışarıda: ${[...genel].sort((a, b) => b[1] - a[1]).slice(0, 12).map(([w, n]) => `${w}×${n}`).join(" · ") || "—"}`);
  const toplam = [...sinifSay.values()].reduce((a, b) => a + b, 0);
  if (toplam) {
    console.log("  bulgu sınıfları:");
    for (const k of ["ustu", "erken", "derssiz", "turev", "yabanci"]) {
      const n = sinifSay.get(k) ?? 0;
      if (!n) continue;
      const ornek = [...(sinifKelime.get(k) ?? new Map())].slice(0, 6).map(([w, d]) => `${w} (${d})`).join(" · ");
      console.log(`    ${BASLIK[k]}`);
      console.log(`      ${String(n).padStart(4)} geçiş · %${((n / toplam) * 100).toFixed(0)} — ${ornek}`);
    }
  }
}
