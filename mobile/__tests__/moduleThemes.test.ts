/// <reference types="node" />
import { readFileSync } from "node:fs";
import path from "node:path";
import { moduleTheme } from "../src/data/moduleThemes";
import { setLang } from "../src/lib/i18n";

/**
 * Patika ünite başlıkları — iki kopya, üç dil.
 *
 * Tema listesi web'de (`src/lib/lessons/modules.ts`) ve mobilde
 * (`src/data/moduleThemes.ts`) ayrı ayrı duruyor; mobil React Native'e bağlı
 * olduğu için web'inkini içe aktaramıyor. Kopyalar SESSİZCE ayrıştı ve bunun
 * bedeli ölçüldü: web B1'i 2026-09-05'te on sekiz modüle çıkardı, mobil
 * listede on tema kaldı ve Patika'nın 11-18. üniteleri adını bulamayıp
 * "B1 Ünite 11" gibi jenerik etikete düştü. Hiçbir kapı bunu söylemedi.
 *
 * İki ölçüt:
 *
 * 1. **Türkçe listeler birebir aynı.** Karşılaştırma Almanca kursun listesi
 *    üzerinden: mobil tablo kursa göre bölünmüş, web yalnız seviyeye göre ve
 *    web listesi Almanca kursun müfredatı.
 * 2. **Her temanın iki çevirisi var.** Eksik çeviri ekranı bozmuyor (başlık
 *    Türkçe kalıyor, kaybolmuyor) ve tam bu yüzden sessiz: yalnız o dili
 *    kullanan görüyor.
 */
const REPO = path.join(__dirname, "..", "..");
const MOB = readFileSync(path.join(REPO, "mobile/src/data/moduleThemes.ts"), "utf8");
const WEB = readFileSync(path.join(REPO, "src/lib/lessons/modules.ts"), "utf8");

/** `A1: [ "a", "b" ]` — tek satır ya da çok satır, dizeleri sırayla verir. */
function levels(source: string): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const m of source.matchAll(/\b(A1|A2|B1|B2|C1):\s*\[([\s\S]*?)\]/g))
    out[m[1]] = [...m[2].matchAll(/"([^"]*)"/g)].map((q) => q[1]);
  return out;
}

/** Web'in Türkçe tablosu — `MODULE_THEMES_NATIVE` başlayınca biter. */
const webTr = levels(WEB.slice(WEB.indexOf("export const MODULE_THEMES:"), WEB.indexOf("MODULE_THEMES_NATIVE")));
/** Mobilin Almanca kurs tablosu — İngilizce kursun bölümü başlayınca biter. */
const mobDe = levels(MOB.slice(MOB.indexOf("  de: {"), MOB.indexOf("  en: {")));

test("web ile mobil Türkçe tema listeleri birebir aynı", () => {
  expect(Object.keys(mobDe).sort()).toEqual(Object.keys(webTr).sort());
  for (const level of Object.keys(webTr)) expect(mobDe[level]).toEqual(webTr[level]);
});

test("her temanın İngilizcesi ve Almancası var", () => {
  const native = MOB.slice(MOB.indexOf("const NATIVE"), MOB.indexOf("function themesFor"));
  const dict = (lang: "en" | "de") => {
    const start = native.indexOf(`  ${lang}: {`);
    const body = native.slice(start, native.indexOf("},", start));
    return new Map([...body.matchAll(/"([^"]+)":\s*"([^"]+)"/g)].map((m) => [m[1], m[2]] as const));
  };
  const all = new Set([...Object.values(webTr).flat()]);
  expect(all.size).toBe(58);
  for (const lang of ["en", "de"] as const) {
    const map = dict(lang);
    const missing = [...all].filter((t) => !map.get(t)?.trim());
    expect({ lang, missing }).toEqual({ lang, missing: [] });
    // Türkçeye özgü harf kalmışsa o satır çevrilmemiş, kopyalanmıştır.
    const copied = [...all].filter((t) => /[ışğİŞĞ]/.test(map.get(t) ?? ""));
    expect({ lang, copied }).toEqual({ lang, copied: [] });
  }
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
