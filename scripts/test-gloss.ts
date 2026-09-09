import { NATIVE_LANGS, type NativeLang } from "@/lib/courses";
import { exampleGlossFor, glossFor, hasGloss, optionLabel } from "@/lib/option-label";

/**
 * ANADİL EKSENİNİN KAPISI — veritabanı istemez.
 *
 * Buradaki hata sınıfı sessiz ve pahalı: anlam yanlış dilde geldiğinde uygulama
 * çalışmaya devam ediyor, yalnız kullanıcı anlamadığı bir dilde soru görüyor.
 * Tam olarak bu vardı — arayüzü İngilizce yapan kullanıcı menüleri İngilizce
 * görüyor ama alıştırmanın cevabı Türkçe geliyordu.
 *
 * En kritik kural: KARŞILIK YOKSA TÜRKÇEYE DÜŞÜLMEZ. Düşülseydi Alman
 * kullanıcıya Türkçe anlam gösterirdik ve bu, eksik çevirinin en kötü biçimi —
 * görünürde çalışan ama yanlış dilde bir alıştırma. Çözücü `null` döner,
 * çağıran kelimeyi turdan çıkarır.
 */
let fails = 0;
const check = (name: string, ok: boolean, detail = "") => {
  console.log(`  ${ok ? "✓" : "✗"} ${name}${ok || !detail ? "" : ` — ${detail}`}`);
  if (!ok) fails++;
};

const W = {
  full: { tr: "araba", en: "car", deGloss: "Auto" },
  noDe: { tr: "araba", en: "car" },
  onlyTr: { tr: "araba", en: null },
};

console.log("\nAna satır anadilde");
check("tr → Türkçe", glossFor(W.full, "tr")?.text === "araba");
check("en → İngilizce", glossFor(W.full, "en")?.text === "car");
check("de → Almanca", glossFor(W.full, "de")?.text === "Auto");

console.log("\nİkinci satır: İngilizce ayırt edici");
// er/sie/es üçü de "o" ama he/she/it — ikinci satırın tek varlık sebebi bu.
check("tr → alt satır İngilizce", glossFor(W.full, "tr")?.sub === "car");
check("de → alt satır İngilizce", glossFor(W.full, "de")?.sub === "car");
check("en → alt satır YOK (ana satır zaten İngilizce)", glossFor(W.full, "en")?.sub === null);

console.log("\nKarşılık yoksa Türkçeye DÜŞMEZ");
check("de, Almanca karşılık yok → null", glossFor(W.noDe, "de") === null);
check("en, İngilizce karşılık yok → null", glossFor(W.onlyTr, "en") === null);
check("tr her zaman var", glossFor(W.onlyTr, "tr")?.text === "araba");
check("hasGloss süzgeci de aynı kararı veriyor", hasGloss(W.noDe, "de") === false && hasGloss(W.noDe, "en") === true);

console.log("\nŞık etiketi");
const w = { ...W.full, de: "Auto", artikel: "das" };
check("de-tr yönünde anlam", optionLabel(w, "de-tr", "en")?.text === "car");
check("tr-de yönünde artikelli biçim", optionLabel(w, "tr-de", "en")?.text === "das Auto");
// Hedef dil sorulan yönde ikinci satır olmamalı: sorulan şey anlam değil.
check("tr-de yönünde alt satır yok", optionLabel(w, "tr-de", "tr")?.sub === null);
check("anadilde karşılık yoksa şık da yok", optionLabel({ ...W.noDe, de: "Auto", artikel: null }, "de-tr", "de") === null);

console.log("\nÖrnek cümlenin çevirisi");
const ex = { beispielTr: "Araba kırmızı.", beispielEn: "The car is red.", beispielDe: "Das Auto ist rot." };
for (const l of NATIVE_LANGS) {
  const got = exampleGlossFor(ex, l);
  const want = l === "tr" ? ex.beispielTr : l === "en" ? ex.beispielEn : ex.beispielDe;
  check(`${l} → kendi dilinde`, got === want, `${got}`);
}
// Cümle çevirisi yoksa ELEME YOK: örnek hedef dilde zaten anlamlı, çeviri bir ek.
check("çeviri yoksa null, kelime yine kullanılabilir", exampleGlossFor({ beispielTr: null, beispielEn: null }, "en") === null);

console.log("\nHer anadil için çözücü bir karar veriyor");
for (const l of NATIVE_LANGS as NativeLang[]) {
  const g = glossFor(W.full, l);
  check(`${l}: ana satır dolu`, Boolean(g?.text?.trim()));
}

console.log(fails === 0 ? `\ntamam: hepsi geçti` : `\nKALDI: ${fails}`);
process.exit(fails === 0 ? 0 : 1);
