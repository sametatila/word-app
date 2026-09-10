/// <reference types="node" />
import { readFileSync } from "node:fs";
import path from "node:path";

/**
 * Ham metin tarayıcısının ORTAK kuralı — iki dosyada iki kopya.
 *
 * NEDEN TEST: `mobile/scripts/i18n-scan.js` ve `scripts/i18n-hardcoded.mjs`
 * aynı sezgiyi uyguluyor (sözlük tabanlı ASCII kuralı) ve ikisi de kendi
 * platformunun kapısı. Kopyalar birbirini bilmiyor: birinde düzeltilen bir
 * kusur ötekinde kalıyor ve sonuç GÖRÜNMEZ bir kapı boşluğu oluyor - kapı
 * yeşil kalır, yalnız o platformdaki ham metni söylemez.
 *
 * Bu gerçekten oldu: sözlükteki dilbilgisi satırlarındaki ek parçaları
 * ("be-/ver-/-ieren") sözcük sayılıyor ve yabancı kümeyi zehirliyordu; web
 * tarafında "Tepki ver" bu yüzden hiç görünmedi. Parça yalnız web-özel
 * anahtarlarda geçtiği için mobil tarafta canlı bir hata değildi ama kural
 * ayrışmasın diye ikisi birlikte düzeltildi.
 *
 * Metin karşılaştırılmıyor, DAVRANIŞ karşılaştırılıyor: iki dosyadaki düzenli
 * ifadeler farklı kaçışlarla yazılabilir (web `\[`, mobil `[`) ve aynı şeyi
 * ifade edebilir.
 */
const REPO = path.join(__dirname, "..", "..");
const MOB = readFileSync(path.join(REPO, "mobile/scripts/i18n-scan.js"), "utf8");
const WEB = readFileSync(path.join(REPO, "scripts/i18n-hardcoded.mjs"), "utf8");

/** Dosyadaki `const <ad> = /.../<bayrak>;` düzenli ifadesini çıkarır. */
function namedRegex(src: string, name: string): RegExp {
  const m = src.match(new RegExp(`const ${name} = (/.*/[a-z]*);`));
  if (!m) throw new Error(`${name} bulunamadı`);
  const body = m[1].slice(1, m[1].lastIndexOf("/"));
  const flags = m[1].slice(m[1].lastIndexOf("/") + 1);
  return new RegExp(body, flags);
}

/** `dictTokens` içindeki sözcük bölme ifadesi. */
function tokenRegex(src: string): RegExp {
  const seg = src.slice(src.indexOf("function dictTokens"));
  const m = seg.match(/\.match\((\/.*?\/g)\)/);
  if (!m) throw new Error("dictTokens bölme ifadesi bulunamadı");
  return new RegExp(m[1].slice(1, -2), "g");
}

/** `asciiTurkish` gövdesi, boşluklar normalleştirilmiş. */
function asciiBody(src: string): string {
  const start = src.indexOf("function asciiTurkish");
  const body = src.slice(start, src.indexOf("\n}", start));
  return body.replace(/\s+/g, " ").trim();
}

const ORNEK = "be-/ver-/-ieren ohne ge- · Kaydedildi tekrar Anmelden spaced-repetition e-mail Mitglieder";

describe("iki tarayıcının ortak kuralı", () => {
  it("sözcük bölme aynı", () => {
    expect(ORNEK.toLocaleLowerCase("tr").match(tokenRegex(MOB))).toEqual(
      ORNEK.toLocaleLowerCase("tr").match(tokenRegex(WEB)),
    );
  });

  it("tire parçaları sözcük sayılmıyor", () => {
    const words = ORNEK.toLocaleLowerCase("tr").match(tokenRegex(MOB)) ?? [];
    // `ver`, `ieren`, `ge`, `spaced`, `mail` hepsi bir tirenin yanında.
    expect(words).not.toContain("ver");
    expect(words).not.toContain("ieren");
    expect(words).not.toContain("spaced");
    expect(words).not.toContain("mail");
    // Tireye komşu OLMAYAN sözcükler duruyor.
    expect(words).toContain("kaydedildi");
    expect(words).toContain("mitglieder");
  });

  it("kod noktalaması eleme ifadesi aynı davranıyor", () => {
    const a = namedRegex(MOB, "CODEY");
    const b = namedRegex(WEB, "CODEY");
    for (const s of ["Devam et", "{r.isMe ?", "/first-words", "if (--kalan === 0)", "Tepki ver", "50% indirim", "a|b"]) {
      expect(a.test(s)).toBe(b.test(s));
    }
  });

  it("karar gövdesi birebir aynı", () => {
    expect(asciiBody(MOB)).toBe(asciiBody(WEB));
  });
});
