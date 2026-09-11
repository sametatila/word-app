/**
 * Seçim durumu denetimi: `node scripts/check-selection-state.mjs`
 *
 * NEDEN VAR. Bir denetim "seçili" olduğunu yalnızca ZEMİN RENGİYLE
 * anlatıyorsa, ekran okuyucu kullanan biri hangisini seçtiğini hiçbir yoldan
 * öğrenemez; renk körü biri için de tek kanal kalmış olur. Ölçüt mutlak ve
 * her iki platformda aynı: seçime göre stil kuran bir denetim, seçimi bir
 * DURUMA da yazmak zorunda.
 *
 * Ölçüm (2026-09-11, §11.342) yedi web ve beş Android denetimi buldu:
 *   web    oyun şıkları (şık, boşluk, dinleme, çoğul, artikel), yerleştirme
 *          sınavı ve örnek yerleştirme - hiçbiri `aria-pressed` taşımıyordu
 *   Android `OptionButton` durumu YANLIŞ şeyden okuyordu (doğru şıkkı
 *          "seçili" diye okutuyordu), `skillQuiz` şık/sıralama, `ChoiceGame`,
 *          tepki çubuğu ve sosyal görünürlük hiç durum taşımıyordu
 *
 * Kapı açılış etiketini TIRNAK VE SÜSLÜ DERİNLİĞİNE bakarak buluyor: ilk `>`
 * `onClick={() => …}` içindeki ok işaretinde durur ve etiket yarım kalır
 * (`check:hit`in aynı hatası enjeksiyonla yakalanmıştı).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");

/** Seçime göre stil kurulduğunu söyleyen ifade. */
const SECIM = /\b(?:active|selected|isActive|mine|chosen|picked|isPicked)\s*(?:\?|===)/;
/** Web tarafında durumu SÖYLEYEN öznitelikler. */
const WEB_DURUM = /aria-(?:pressed|current|checked|selected)=|role="(?:switch|menuitemradio)"/;
/** Android tarafında durumu söyleyen tek yol. */
const MOBIL_DURUM = /accessibilityState=/;

const YUZEYLER = [
  { kok: "src", adlar: ["button", "Link", "motion.button"], durum: WEB_DURUM, ad: "web" },
  { kok: "mobile/src", adlar: ["PressableScale", "Pressable", "TouchableOpacity"], durum: MOBIL_DURUM, ad: "mobil" },
];

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + m.slice(p.length).replace(/[^\n]/g, " "));
}
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/node_modules/.test(p)) walk(p, out); }
    else if (/\.tsx$/.test(e.name)) out.push(p);
  }
  return out;
}
/** Açılış etiketinin bittiği yer — ilk `>` DEĞİL (bkz. dosya başı). */
function acilisSonu(blok) {
  let derinlik = 0, tirnak = null;
  for (let i = 0; i < blok.length; i++) {
    const c = blok[i];
    if (tirnak) { if (c === tirnak && blok[i - 1] !== "\\") tirnak = null; continue; }
    if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
    if (c === "{") derinlik++;
    else if (c === "}") derinlik--;
    else if (c === ">" && derinlik === 0) return i;
  }
  return -1;
}

/**
 * İKİNCİ ÖLÇÜT — DOSYA DÜZEYİ.
 *
 * Yukarıdaki ölçüt açılış etiketinin İÇİNE bakıyor ve orada kesin: `active ?`
 * ya da `picked ===` etikette yazılıysa durum da yazılmalı. Ama bir denetim
 * seçimini etiketin DIŞINDA hesaplayabiliyor - `ChoiceGame` renkleri etiketin
 * üstünde if/else ile kuruyor, `match-game` `state` değişkenini - ve o zaman
 * etikette hiçbir seçim ifadesi görünmez: ölçüt o denetimi HİÇ ÖLÇMEZ.
 * Enjeksiyonla yakalandı (Android `ChoiceGame`den durumu silmek kapıyı
 * yeşil bıraktı; §11.342).
 *
 * İkinci ölçüt bu yüzden dosya düzeyinde ve kaba: bir dosya SEÇİM
 * DEĞİŞKENİ tanımlıyorsa (`const isSelected = x === y` gibi) ve içinde
 * basılabilir bir şey varsa, o dosyada en az bir durum özniteliği
 * bulunmalı. Kaba olduğu için yanlış alarm verebilir; istisnalar SEBEBİYLE
 * aşağıda yazılı.
 */
const SECIM_DEGISKENI = /\bconst\s+(?:isPicked|isActive|isSelected|active|selected|mine|chosen)\s*=\s*[^;\n]*(?:===|!==|\.has\(|\.includes\()/;
const BASILABILIR = /<(?:button|Link|motion\.button|PressableScale|Pressable|TouchableOpacity)\b/;
/** Dosya düzeyi ölçütün MEŞRU istisnaları, sebepleriyle. */
const DOSYA_ALLOW = new Map([
  [
    "mobile/src/screens/WalkModeScreen.tsx",
    "`const active = phase === \"listening\"` bir ANIMASYON bayrağı (nabız efekti), " +
      "bir denetimin seçimi değil: yürüyüş kipinde seçilebilir şık yok.",
  ],
]);

const bulgular = [];
const dosyaBulgulari = [];
/** Ölçülen (seçime bağlı) denetim sayısı — kapının boşa geçmediğinin kanıtı. */
const olculen = { web: 0, mobil: 0 };
const olculenDosya = { web: 0, mobil: 0 };

for (const { kok, adlar, durum, ad } of YUZEYLER) {
  for (const abs of walk(path.join(ROOT, kok))) {
    const rel = path.relative(ROOT, abs);
    const src = stripComments(fs.readFileSync(abs, "utf8"));
    for (const etiketAdi of adlar) {
      for (let j = src.indexOf("<" + etiketAdi); j >= 0; j = src.indexOf("<" + etiketAdi, j + 1)) {
        /* `<button` ile `<buttonish` ayrimi. */
        if (/[A-Za-z0-9]/.test(src[j + 1 + etiketAdi.length] ?? "")) continue;
        const son = acilisSonu(src.slice(j));
        if (son < 0) break;
        const acilis = src.slice(j, j + son + 1);
        if (!SECIM.test(acilis)) continue;
        olculen[ad]++;
        if (durum.test(acilis)) continue;
        bulgular.push({ rel, satir: src.slice(0, j).split("\n").length, ad, metin: acilis.replace(/\s+/g, " ").slice(0, 110) });
      }
    }
    /* Dosya düzeyi ölçüt. */
    if (!SECIM_DEGISKENI.test(src) || !BASILABILIR.test(src)) continue;
    if (DOSYA_ALLOW.has(rel)) continue;
    olculenDosya[ad]++;
    if (!durum.test(src)) dosyaBulgulari.push({ rel, ad });
  }
}

if (bulgular.length || dosyaBulgulari.length) {
  if (bulgular.length) {
    console.error("check:selection — secime gore stil kuran ama durumu SOYLEMEYEN denetimler:\n");
    for (const b of bulgular) {
      console.error(`  ${b.rel}:${b.satir}  (${b.ad})`);
      console.error(`      ${b.metin}`);
    }
  }
  if (dosyaBulgulari.length) {
    console.error("\ncheck:selection — secim degiskeni tanimlayan ama hic durum ozniteligi tasimayan dosyalar:\n");
    for (const b of dosyaBulgulari) console.error(`  ${b.rel}  (${b.ad})`);
    console.error("\nMesru bir istisnaysa betikteki DOSYA_ALLOW listesine SEBEBIYLE ekle.");
  }
  console.error('\nWebde `aria-pressed` / `aria-current` / `aria-checked`; Android\'de `accessibilityState={{ selected }}`.');
  process.exit(1);
} else {
  console.log(
    `check:selection — secime gore stil kuran her denetim durumu da soyluyor: tamam ` +
      `(web ${olculen.web}+${olculenDosya.web}, mobil ${olculen.mobil}+${olculenDosya.mobil} olculdu; ` +
      `${DOSYA_ALLOW.size} kayitli istisna)`,
  );
}
