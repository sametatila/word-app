/// <reference types="node" />
import { readFileSync } from "node:fs";
import path from "node:path";
import { moduleTheme } from "../src/data/moduleThemes";
import { setLang } from "../src/lib/i18n";

/**
 * Patika ünite başlıkları — iki kopya, üç dil.
 *
 * Tema listesi web'de (`src/lib/conversations/modules.ts`) ve mobilde
 * (`src/data/moduleThemes.ts`) ayrı ayrı duruyor; mobil React Native'e bağlı
 * olduğu için web'inkini içe aktaramıyor. Kopyalar SESSİZCE ayrıştı ve bunun
 * bedeli ölçüldü: web B1'i 2026-09-05'te on sekiz modüle çıkardı, mobil
 * listede on tema kaldı ve Patika'nın 11-18. üniteleri adını bulamayıp
 * "B1 Ünite 11" gibi jenerik etikete düştü. Hiçbir kapı bunu söylemedi.
 *
 * İki ölçüt:
 *
 * 1. **Türkçe listeler birebir aynı** — KURS KURS. Karşılaştırma 2026-09-21'e
 *    kadar yalnız Almanca kurs üzerindendi, çünkü webin tablosu yalnız
 *    seviyeye göre anahtarlıydı; o gün web de kursa göre bölündü ve iki
 *    tablo artık aynı şekle sahip.
 * 2. **Her temanın iki çevirisi var.** Eksik çeviri ekranı bozmuyor (başlık
 *    Türkçe kalıyor, kaybolmuyor) ve tam bu yüzden sessiz: yalnız o dili
 *    kullanan görüyor.
 */
const REPO = path.join(__dirname, "..", "..");
const MOB = readFileSync(path.join(REPO, "mobile/src/data/moduleThemes.ts"), "utf8");
const WEB = readFileSync(path.join(REPO, "src/lib/conversations/modules.ts"), "utf8");

/** `A1: [ "a", "b" ]` — tek satır ya da çok satır, dizeleri sırayla verir. */
function levels(source: string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const m of source.matchAll(/\b(A1|A2|B1|B2|C1):\s*\[([\s\S]*?)\]/g))
    out[m[1]] = [...m[2].matchAll(/"([^"]*)"/g)].map((q) => q[1]);
  return out;
}

/** Bir kursun bloğu: `  <kurs>: {` ile başlar, ilk `\n  },` ile biter. */
function course(source: string, id: string): Record<string, string[]> {
  const i = source.indexOf(`\n  ${id}: {`);
  if (i < 0) return {};
  return levels(source.slice(i, source.indexOf("\n  },", i)));
}

const webTable = WEB.slice(WEB.indexOf("export const MODULE_THEMES:"), WEB.indexOf("MODULE_THEMES_NATIVE"));
const mobTable = MOB.slice(MOB.indexOf("const BY_COURSE"), MOB.indexOf("const NATIVE"));

test.each(["de", "en"])("web ile mobil Türkçe tema listeleri birebir aynı: %s", (id) => {
  const web = course(webTable, id);
  const mob = course(mobTable, id);
  expect(Object.keys(web).length).toBeGreaterThan(0);
  expect(Object.keys(mob).sort()).toEqual(Object.keys(web).sort());
  for (const level of Object.keys(web)) expect(mob[level]).toEqual(web[level]);
});

test("her temanın İngilizcesi ve Almancası var", () => {
  const native = MOB.slice(MOB.indexOf("const NATIVE"), MOB.indexOf("function themesFor"));
  const dict = (lang: "en" | "de") => {
    const start = native.indexOf(`  ${lang}: {`);
    const body = native.slice(start, native.indexOf("},", start));
    return new Map([...body.matchAll(/"([^"]+)":\s*"([^"]+)"/g)].map((m) => [m[1], m[2]] as const));
  };
  const all = new Set(["de", "en"].flatMap((id) => Object.values(course(webTable, id)).flat()));
  /* 69: İngilizce B1'in 3. ve 4. modülü 2026-09-25'te içeriklerine göre
     adlandırıldı ("Cümleleri bağlamak", "Tarif etmek ve karar vermek");
     Almanca kurs eski adlarını taşıdığı için benzersiz tema iki arttı. */
  expect(all.size).toBe(69);
  for (const lang of ["en", "de"] as const) {
    const map = dict(lang);
    const missing = [...all].filter((t) => !map.get(t)?.trim());
    expect({ lang, missing }).toEqual({ lang, missing: [] });
    // Türkçeye özgü harf kalmışsa o satır çevrilmemiş, kopyalanmıştır.
    const copied = [...all].filter((t) => /[ışğİŞĞ]/.test(map.get(t) ?? ""));
    expect({ lang, copied }).toEqual({ lang, copied: [] });
  }
});

// İngilizce C1 müfredatı Almancadan ayrışıyor; tablo kursa göre bölünmeseydi
// bu on ünite Patika'da başka bir konuşmanın adını taşırdı.
test("kurs ayrımı gerçek: İngilizce C1 Almancadan farklı", () => {
  const de = course(mobTable, "de").C1;
  const en = course(mobTable, "en").C1;
  expect(en).toHaveLength(10);
  expect(en.filter((t, i) => t === de[i])).toEqual([]);
});

test("çözücü dile göre karar veriyor", async () => {
  await setLang("tr");
  expect(moduleTheme("de", "A1", 0)).toBe("Tanışma ve ben");
  await setLang("en");
  expect(moduleTheme("de", "A1", 0)).toBe("Introductions and me");
  await setLang("de");
  expect(moduleTheme("de", "A1", 0)).toBe("Vorstellen und ich");
  // Kursun listesi yoksa çağıran kendi yedeğini kullanır: burası boş döner.
  expect(moduleTheme("de", "A1", 99)).toBeUndefined();
  await setLang("tr");
});
