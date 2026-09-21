import { NATIVE_LANGS, type NativeLang } from "@/lib/courses";
import { MODULE_THEMES, MODULE_THEMES_NATIVE, moduleCount, moduleTheme } from "@/lib/lessons/modules";
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

/**
 * MODÜL TEMALARI — Patika'nın en görünür metni.
 *
 * Ünite başlığı hub kartında, ünite sayfasında, quiz ve dilbilgisi alt
 * başlığında ve modül sınavı satırında çıkıyor. Tablo tek dildeyken anadili
 * İngilizce ya da Almanca olan kullanıcı ekranın ortasında Türkçe bir başlık
 * görüyordu — en→de paritesi açıkken de böyleydi.
 *
 * Ölçüt ÜÇ TANE. Kapsam: her kursun her temasının iki çevirisi olmalı, yoksa
 * `moduleTheme` sessizce Türkçeye düşer (B1 on sekize çıktığında mobil
 * listede tam bu oldu, sekiz ünite adsız kaldı). Harf: Türkçeye özgü bir harf
 * kalmışsa o satır çevrilmemiş, kopyalanmıştır. Ölü satır: sözlükte hiçbir
 * kursta geçmeyen bir tema varsa ya bir liste kısalmıştır ya da anahtar
 * yanlış yazılmıştır — ikisi de ekranda Türkçe başlık demek.
 *
 * Sözlük METNE göre anahtarlı (paralel dizi değil), çünkü tablo 2026-09-21'de
 * kursa göre bölündü ve iki kursun kırk teması birebir aynı.
 */
console.log("\nModül temaları üç dilde");
const TR_LETTER = /[ışğİŞĞ]/;
const ALL_THEMES = new Set(
  Object.values(MODULE_THEMES).flatMap((byLevel) => Object.values(byLevel).flat()),
);
for (const [course, byLevel] of Object.entries(MODULE_THEMES)) {
  const sizes = Object.entries(byLevel).map(([l, rows]) => `${l} ${rows.length}`).join(" · ");
  check(`${course}: ${sizes}`, Object.values(byLevel).every((rows) => rows.length > 0));
}
for (const lang of ["en", "de"] as const) {
  const dict = MODULE_THEMES_NATIVE[lang] ?? {};
  const missing = [...ALL_THEMES].filter((t) => !dict[t]?.trim());
  check(`${lang}: ${ALL_THEMES.size} temanın hepsi çevrilmiş`, missing.length === 0, missing.join(" · "));
  const copied = [...ALL_THEMES].filter((t) => TR_LETTER.test(dict[t] ?? ""));
  check(`${lang}: hiçbiri kopyalanmamış`, copied.length === 0, copied.join(" · "));
  const dead = Object.keys(dict).filter((t) => !ALL_THEMES.has(t));
  check(`${lang}: sözlükte ölü satır yok`, dead.length === 0, dead.join(" · "));
}
/* Çözücü de ölçülüyor, tablo değil: `tr` kendi kaynağını, ötekiler çeviriyi
   döndürmeli, bilinmeyen dilim üçünde de boş ve KURS ayrımı gerçekten
   yapılmalı — İngilizce C1'in on teması Almancasıyla aynı değil. */
check("tr → kaynak", moduleTheme("de", "A1", 0, "tr") === MODULE_THEMES.de.A1[0]);
check("de → çeviri", moduleTheme("de", "A1", 0, "de") === MODULE_THEMES_NATIVE.de?.[MODULE_THEMES.de.A1[0]]);
check("taşan dilim boş", moduleTheme("de", "A1", 99, "en") === "");
check("bilinmeyen kurs boş değil (hedef dile düşüyor)", moduleTheme("gsw-zh", "A1", 0, "tr") === MODULE_THEMES.de.A1[0]);
check(
  "kurs ayrımı: İngilizce C1 Almancadan farklı",
  MODULE_THEMES.en.C1.every((t, i) => t !== MODULE_THEMES.de.C1[i]),
);
check("kurs ayrımı: modül sayısı kursa göre", moduleCount("de", "B1") === 18 && moduleCount("en", "B1") === 10);

console.log(fails === 0 ? `\ntamam: hepsi geçti` : `\nKALDI: ${fails}`);
process.exit(fails === 0 ? 0 : 1);
