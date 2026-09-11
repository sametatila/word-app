/**
 * Renk kaynağı kapısı: `node scripts/check-colors.mjs`
 *
 * `palette-check.mjs` paletin KENDİSİNİ ölçüyor (kontrast, ayrışma) ve
 * `globals.css`ten okuyor. Bileşenlerin o paleti nasıl KULLANDIĞINI hiç
 * görmüyor - bu kapı o kör noktayı kapatıyor. Üç gerçek hata oradan geçti
 * (bkz. docs/plan/web-parity.md §11.36-38):
 *
 *   webde `premium-paywall` promosyon iletisi koyu temada 3.24,
 *   `analytics` istatistiği 2.83, `skills` puan çipi 2.43;
 *   mobilde artikel renkleri (üç ölçüm sınırın altında) ve günün turu
 *   madalyası (üçü de sınırın altında).
 *
 * Hepsinin şekli aynıydı: renk paletin dışından ya da yanlış katmandan
 * geliyordu ve derleme, lint, kontrast kapısı üçü de geçiyordu.
 *
 * ── İKİ KURAL ──────────────────────────────────────────────────────────────
 *
 * WEB: metin rengi ANLAMSAL jetondan gelmeli (`--color-mint`, `--color-danger`),
 * sabit BASAMAKTAN değil (`--color-mint-600`). Basamak dolgu için: temayla
 * değişmez, o yüzden koyu temada koyu kartın üstünde koyu yazı bırakır.
 *
 * MOBİL: renk tema jetonundan (`colors.*`) gelmeli, ham onaltılıktan değil.
 *
 * İkisinde de meşru istisnalar var ve hepsi aşağıda SEBEBİYLE yazılı: sabit
 * bir dolgunun üstündeki sabit yazı (zemin de temayla değişmiyorsa kontrast
 * sabittir), gölge tinti, illüstrasyon renkleri. Liste bir kabul kaydı, bir
 * bahane değil - yeni bir satır eklemek gerekçesini yazmayı gerektiriyor.
 *
 * Çıkış kodu ihlal sayısı.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

/* ── web: metin rengi olarak sabit basamak ─────────────────────────────── */

const STEP = /var\(--color-[a-z]+-(?:100|200|300|400|500|600|700|800|900)\)/;

/** Sabit dolgunun üstünde sabit yazı: zemin temayla değişmediği için geçerli. */
const WEB_ALLOW = new Map([
  ["src/app/page.tsx", "iniş sayfası CTA'sı: zemin `bg-white`, yani sabit dolgu üstünde sabit marka yazısı"],
  ["src/components/social/notification-bell.tsx", "sayaç rozeti: `flame-500` dolgu + `ink-900` yazı (6.04); anlamsal jeton koyu temada 300'e düşüp 1.49 veriyordu"],
  ["src/components/social/friends-hub.tsx", "aynı sayaç rozeti"],
]);

/* ── mobil: ham onaltılık ──────────────────────────────────────────────── */

/** Çizim dosyaları: renk bir jeton değil, illüstrasyonun kendisi. */
const MOBILE_SKIP = [
  "mobile/src/theme/",
  "mobile/src/ui/icons.tsx",
  "mobile/src/ui/avatarParts.tsx",
  "mobile/src/ui/PersonAvatar.tsx",
];

/** Paletin dışında kalması KABUL EDİLEN değerler, sebepleriyle. */
const MOBILE_ALLOW = new Map([
  ["#FA7C13", "avatar dairesinin zemini: Erdi çiziminin PNG zeminiyle aynı değer, webde de aynı satır"],
  ["#c0392b", "varsayılan şapka rengi: kullanıcının seçtiği aksesuar, palet değil"],
  /* Konfeti kimlik listesi - web `components/celebrate.tsx` `COLORS` ile birebir. */
  ["#eda45d", "konfeti (web listesiyle birebir)"],
  ["#ddb62c", "konfeti (web listesiyle birebir)"],
  ["#45b87a", "konfeti (web listesiyle birebir)"],
  ["#35b2cc", "konfeti (web listesiyle birebir)"],
  ["#ae79d4", "konfeti (web listesiyle birebir)"],
  ["#ee6b7c", "konfeti (web listesiyle birebir)"],
]);

/**
 * Beyaz ve siyah, saydamlıkları dahil (`#ffffffcc` gibi). Marka gradyanının
 * üstündeki yarı saydam beyaz katmanlar bir palet jetonu DEĞİL: zemin
 * gradyanın kendisi ve her iki temada aynı, yani yazı da sabit olmalı.
 */
const WHITE_BLACK = /^#(?:fff|ffff|ffffff|ffffff[0-9a-f]{2}|000|0000|000000|000000[0-9a-f]{2})$/i;

/**
 * DOLGU FARKINDALIĞI — beyaz her yerde masum değil.
 *
 * Beyaz yazı sabit bir dolgunun üstünde (marka gradyanı, kademe rengi)
 * doğru; ANLAMSAL bir dolgunun üstünde yanlış, çünkü o dolgular temayla
 * basamak değiştiriyor ve koyu temada açılıyorlar - beyaz orada 1.76-2.32
 * veriyor, grafik eşiği 3.0 bile değil (§11.41). Paletin karşılığı hazır:
 * `onPrimary` ve `onFill`.
 *
 * Kural, satırın ÜSTÜNDEKİ en yakın `backgroundColor`a bakıyor. Sekiz satırlık
 * pencere ölçülerek seçildi: altı satır sekiz gerçek ihlali kaçırıyordu
 * (hepsi `<koşul> ? colors.primary : colors.surface` biçiminde dolgular).
 * Kesin bir çözümleme değil - JSX ağacını çözmüyor - ama bu depoda gürültü
 * tabanı SIFIR: bugün hiçbir meşru kullanım bu kalıba düşmüyor, o yüzden
 * istisna listesi de yok.
 */
const SEMANTIC_FILL = /backgroundColor:\s*([^,\n}]+)/g;

/**
 * Webin aynı kuralı. Tema duyarlı jetonlar (`var(--color-brand)` gibi, basamak
 * numarası OLMADAN) açık temada 600/700, koyu temada 300/400 çiziyor; beyaz
 * içerik orada 1.76-2.32'ye düşüyor. Karşılığı `--on-fill` jetonu ve `.on-fill`
 * sınıfı - ikisi de zaten vardı ve tek bir yerde kullanılıyordu (§11.43).
 * Sabit basamaklı dolgular (`--color-mint-600`) bu kuralın dışında: onlarda
 * beyaz iki temada da aynı ölçümü veriyor.
 */
const WEB_SEM_FILL = /var\(--color-(?:brand|mint|rose|sky|violet|flame|success|danger)\)/;
const WEB_FILL = /(?:background|background-color)\s*:\s*([^,;\n}]+)/g;
const WEB_WHITE = /text-white|color:\s*"#fff"|color:\s*"#ffffff"/;

/**
 * YUMUŞAK TİNTİN ORANI %14 - ÇÜNKÜ ÖLÇÜLEN O.
 *
 * `palette-check.mjs` 12. bölümü ("yumuşak rozet") altı ailenin metin
 * varyantını KENDİ %14 TİNTİ üstünde ölçüyor ve geçtiğini söylüyor. Bileşenler
 * %16 ve %18'e kaymıştı: mint %18'de 4.34, mint %16'da 4.44, flame %16'da
 * 4.47 - eşik 4.5. Marka ailesi %16'da 4.59 ile tesadüfen geçiyor ama garanti
 * edilen oran %14, o yüzden o da eşitlendi (§11.44).
 *
 * Yazısız tint yüzeylerinde (yalnız zemin) oran serbest - kural ancak aynı
 * stilde bir `color:` varsa işliyor.
 */
const WEB_TINT = /color-mix\(in srgb,\s*var\(--color-[a-z]+-\d+\)\s*(\d+)%/;
const TINT_MAX = 14;
const PLAIN_WHITE = /"#fff"|"#ffffff"/;

function fillIsSemantic(fill) {
  if (/colors\.primary\b/.test(fill)) return true;
  return /colors\.(success|danger|info|accent|streak)\b/.test(fill);
}

/* ── tarama ────────────────────────────────────────────────────────────── */

async function sources(root) {
  const out = [];
  async function walk(d) {
    for (const e of await readdir(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (/\.tsx?$/.test(e.name)) out.push(p);
    }
  }
  await walk(root);
  return out.sort();
}

/**
 * Yorumları boşlukla değiştiriyor, SATIR SAYISINI korumak için satır sonları
 * duruyor. Satır satır "yorum mu" diye bakmak yetmiyordu: `{/* ... *\/}`
 * bloğunun ortasındaki satırlar düz metinle başlıyor ve kaydın kendisinde
 * geçen bir onaltılık (ör. "okunabilir bir gümüş #7b746a") ihlal sayılıyordu.
 */
function stripComments(src) {
  let out = "";
  let i = 0;
  while (i < src.length) {
    if (src.startsWith("//", i)) {
      while (i < src.length && src[i] !== "\n") i++;
      continue;
    }
    if (src.startsWith("/*", i)) {
      const end = src.indexOf("*/", i + 2);
      const stop = end === -1 ? src.length : end + 2;
      for (; i < stop; i++) out += src[i] === "\n" ? "\n" : " ";
      continue;
    }
    out += src[i];
    i++;
  }
  return out;
}

const problems = [];

for (const f of await sources("src")) {
  const src = stripComments(await readFile(f, "utf8"));
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    /* Tema duyarlı dolgunun üstünde beyaz içerik: `--on-fill` bekleniyor. */
    if (WEB_WHITE.test(line)) {
      const win = lines.slice(Math.max(0, i - 4), i + 5).join("\n");
      const fills = [...win.matchAll(WEB_FILL)].map((x) => x[1]);
      if (fills.some((x) => WEB_SEM_FILL.test(x)) && !WEB_ALLOW.has(f)) {
        problems.push(`${f}:${i + 1}  tema duyarlı dolgu üstünde beyaz (--on-fill / .on-fill bekleniyordu)`);
        return;
      }
    }
    const tint = WEB_TINT.exec(line);
    if (tint && Number(tint[1]) > TINT_MAX) {
      /* Aynı stil nesnesinde bir içerik rengi var mı: yoksa zemin yazısız. */
      const win = lines.slice(i, i + 4).join("\n");
      if (/(^|[^-a-zA-Z])color:\s*"/.test(win)) {
        problems.push(`${f}:${i + 1}  yazı taşıyan tint %${tint[1]} (en çok %${TINT_MAX})`);
        return;
      }
    }
    const m = /(^|[^-a-zA-Z])color:\s*([^,;}]+)/.exec(line);
    if (!m || !STEP.test(m[2])) return;
    if (WEB_ALLOW.has(f)) return;
    problems.push(`${f}:${i + 1}  metin rengi sabit basamak: ${m[2].trim().slice(0, 80)}`);
  });
}

for (const f of await sources("mobile/src")) {
  if (MOBILE_SKIP.some((s) => f.startsWith(s))) continue;
  const src = stripComments(await readFile(f, "utf8"));
  const lines = src.split("\n");
  lines.forEach((line, i) => {
    /* Beyazın üstünde durduğu dolgu anlamsal mı: öyleyse `onPrimary`/`onFill`
       bekleniyor. Sabit dolgular (gradyan, kademe rengi) beyazı hak ediyor. */
    const near = lines.slice(Math.max(0, i - 8), i + 1).join("\n");
    const fills = [...near.matchAll(SEMANTIC_FILL)];
    const fill = fills.length ? fills[fills.length - 1][1].trim() : "";
    if (fillIsSemantic(fill) && (PLAIN_WHITE.test(line) || /#ffffff[0-9a-fA-F]{2}/.test(line))) {
      problems.push(`${f}:${i + 1}  anlamsal dolgu üstünde beyaz (colors.onPrimary / onFill bekleniyordu): ${fill.slice(0, 50)}`);
      return;
    }
    for (const hex of line.match(/#[0-9a-fA-F]{3,8}\b/g) ?? []) {
      if (WHITE_BLACK.test(hex)) continue;
      if (MOBILE_ALLOW.has(hex)) continue;
      problems.push(`${f}:${i + 1}  ham renk: ${hex} (tema jetonu bekleniyordu)`);
    }
  });
}

if (problems.length) {
  console.error("check:colors — paletin dışına kaçan renkler:");
  for (const p of problems) console.error("  " + p);
  console.error(`\n${problems.length} ihlal. Meşru bir istisnaysa betikteki listeye SEBEBİYLE ekle.`);
} else {
  console.log(`check:colors — web metin renkleri anlamsal jetondan, mobil renkler tema jetonundan: tamam (${WEB_ALLOW.size} + ${MOBILE_ALLOW.size} kayıtlı istisna)`);
}
process.exit(problems.length);
