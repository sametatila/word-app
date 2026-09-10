/**
 * Sözlük denetimi — `npm run i18n:check`.
 *
 * İki şeyi doğruluyor:
 *
 *   1. Üç dilin ANAHTAR KÜMESİ birebir aynı. Eksik anahtar sessizce Türkçeye
 *      düşüyor (bkz. lib/i18n/dict `translate`) ve bu, İngilizce arayüzde
 *      Türkçe bir cümle demek — eksik çeviriden kötü, çünkü fark edilmiyor.
 *   2. Aynı anahtarın YER TUTUCULARI üç dilde aynı. `{n}` bir dilde varken
 *      ötekinde yoksa cümle sayıyı hiç göstermiyor ya da `{n}` yazısını
 *      ekrana basıyor.
 *   3. Kodda ÇAĞRILAN her anahtar sözlükte VAR. `translate` bulamadığı
 *      anahtarın kendisini döndürüyor, yani ekrana "socialw.load_failed"
 *      yazıyor — hata değil, sessiz bir arıza. İki anahtar tam da böyle
 *      kaçmıştı; denetim şimdi onu tutuyor.
 *
 * `src/i18n/base/*` mobilden üretiliyor (scripts/i18n-pull.mjs), `web/*` elle
 * yazılıyor; ikisi de denetleniyor.
 */
import { readFileSync, readdirSync } from "node:fs";

const LANGS = ["tr", "en", "de"];

const dupes = [];

function load(dir, lang) {
  const src = readFileSync(new URL(`../src/i18n/${dir}/${lang}.ts`, import.meta.url), "utf8");
  const out = new Map();
  // Anahtar satırları: `  "key": "value",` — çok satırlı değer yok.
  for (const m of src.matchAll(/^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)) {
    /*
      AYNI ANAHTAR İKİ KEZ: TypeScript bunu hata sayıyor ama denetim saymıyordu
      — Map ikincisini yazıyor ve ilki sessizce ölüyor. Aynı anahtarın iki
      farklı değeri olsaydı hangisinin kazandığı dosyadaki SIRAYA kalırdı.
    */
    if (out.has(m[1])) dupes.push(`${dir}/${lang}: "${m[1]}"`);
    out.set(m[1], m[2]);
  }
  return out;
}

/** Mobil KAYNAK sözlüğü — `base/*` bundan üretiliyor. */
function loadMobile(lang) {
  const src = readFileSync(new URL(`../mobile/src/i18n/${lang}.ts`, import.meta.url), "utf8");
  const out = new Map();
  for (const m of src.matchAll(/^\s*"([^"]+)":\s*"((?:[^"\\]|\\.)*)",?\s*$/gm)) out.set(m[1], m[2]);
  return out;
}

const placeholders = (s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");

let bad = 0;
for (const dir of ["base", "web"]) {
  const dicts = Object.fromEntries(LANGS.map((l) => [l, load(dir, l)]));
  const ref = dicts.tr;
  for (const lang of LANGS.slice(1)) {
    const missing = [...ref.keys()].filter((k) => !dicts[lang].has(k));
    const extra = [...dicts[lang].keys()].filter((k) => !ref.has(k));
    if (missing.length) { bad++; console.error(`${dir}/${lang}: ${missing.length} eksik anahtar → ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? " …" : ""}`); }
    if (extra.length) { bad++; console.error(`${dir}/${lang}: ${extra.length} fazla anahtar → ${extra.slice(0, 5).join(", ")}${extra.length > 5 ? " …" : ""}`); }
    for (const [k, v] of ref) {
      const other = dicts[lang].get(k);
      if (other === undefined) continue;
      if (placeholders(v) !== placeholders(other)) {
        bad++;
        console.error(`${dir}/${lang}: "${k}" yer tutucuları uyuşmuyor — tr {${placeholders(v)}} / ${lang} {${placeholders(other)}}`);
      }
    }
  }
  console.log(`${dir}: ${ref.size} anahtar × ${LANGS.length} dil`);
}

/*
  Kodda çağrılan anahtarlar. Yalnız DÜZ metin anahtarlar taranıyor:
  `t("a.b")`, `tx("a.b")`, `translate(lang, "a.b")`. Değişkenden gelen
  anahtarlar (`t(KEYS[kind])`) burada görünmüyor ve görünmemeli — statik
  olarak çözülemezler; onların güvencesi TypeScript'teki anahtar haritaları.
*/
const KEY_CALL = /\b(?:t|tx|tt|translate)\(\s*(?:[A-Za-z_$][\w$]*\s*,\s*)?"([a-z][\w]*(?:\.[\w]+)+)"/g;

/*
  UCNOKTA ICINDEKI ANAHTAR. Ustteki desen anahtari `t(`in HEMEN ardinda
  ariyor ve `t(x ? "a.b" : "c.d")` bicimini hic gormuyor. Bedeli olculdu:
  ilk pratik ekraninin birincil dugmesi uc anahtari boyle cagiriyordu, ucu de
  hicbir sozlukte yoktu ve `translate` bulamadigi anahtari OLDUGU GIBI
  donduruyor - kullanici kayit yolunun ortasinda "fp.see_meaning" yazan bir
  dugme goruyordu (docs/plan/web-parity.md 11.133).

  Ikinci desen `t(` ile kapanan parantez arasindaki BUTUN duz anahtarlari
  aliyor. Cagri govdesi tek satirda; cok satirli cagrilar ustteki desene
  kaliyor ve bugune dek oyle bir kacak cikmadi.
*/
const KEY_CALL_TERNARY = /\b(?:t|tx|tt|translate)\(([^()\n]*)\)/g;

const known = new Set();
for (const dir of ["base", "web"]) for (const k of load(dir, "tr").keys()) known.add(k);

const roots = ["src"];
const files = [];
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = `${dir}/${e.name}`;
    if (e.isDirectory()) walk(full);
    else if (/\.(ts|tsx)$/.test(e.name) && !full.includes("/i18n/")) files.push(full);
  }
};
for (const r of roots) walk(new URL(`../${r}`, import.meta.url).pathname);

/*
  YEREL `t` YARDIMCISI OLAN DOSYALAR.

  Tarayıcı `t("a.b")` biçimini arıyor ve bir dosya kendi içinde `t` adında
  BAŞKA bir yardımcı tanımlarsa (ör. içerik sözlüğünden okuyan bir arama)
  onun ilk argümanı da anahtar sanılıyor. `native-de.ts` böyle: `t("vocab.tr",
  v.tr)` bir çeviri anahtarı değil, alan adı.

  Muafiyet DOSYA düzeyinde ve gerekçeli; asıl çözüm yerel yardımcının adını
  çevirmenden ayırmak (o dosya başka bir oturumun elinde).
*/
const YEREL_T = ["lib/lessons/native-de.ts"];

const missingUse = new Map();
for (const file of files) {
  if (YEREL_T.some((y) => file.replace(/\\/g, "/").endsWith(y))) continue;
  const src = readFileSync(file, "utf8");
  const gorulen = [];
  for (const m of src.matchAll(KEY_CALL)) gorulen.push(m[1]);
  for (const m of src.matchAll(KEY_CALL_TERNARY)) {
    for (const k of m[1].matchAll(/"([a-z][\w]*(?:\.[\w]+)+)"/g)) gorulen.push(k[1]);
  }
  /*
    TABLO ANAHTARLARI. Yüzeylerin çoğu etiketi bir sabit tabloda tutuyor
    (`{ labelKey: "leaderboard.league" }`) ve `t()` o tabloyu okuyor — anahtar
    hiçbir çağrının içinde geçmiyor. Yalnız çağrılara bakan bir denetim, tablo
    anahtarının YANLIŞ YAZILMASINI görmüyordu: ekranda ham anahtar çıkar ve
    kapı susar. Ölü anahtar denetimi (5) düz literalleri zaten tarıyordu; eksik
    anahtar denetimi taramıyordu — iki denetim aynı metni iki farklı gözle
    okuyordu. Mobil kapısına da aynı satır yazıldı.
  */
  for (const m of src.matchAll(/\b(?:label|labelKey|titleKey|subKey|promptKey|descKey|noteKey)\s*:\s*"([a-z][\w]*(?:\.[\w]+)+)"/g)) {
    gorulen.push(m[1]);
  }
  for (const k of gorulen) {
    if (!known.has(k)) {
      const rel = file.slice(file.indexOf("/src/") + 1);
      if (!missingUse.has(k)) missingUse.set(k, rel);
    }
  }
}
/*
  4. `base/*` GERÇEKTEN mobilden üretilmiş mi.

  Köprü (`scripts/i18n-pull.mjs`) ELLE çalıştırılıyor. Mobil sözlükte bir cümle
  değişip pull unutulursa - ya da `base/*` elle düzenlenirse - web ile Android
  aynı anahtarda AYRI cümle gösterir ve hiçbir denetim bunu söylemez. Üç içerik
  köprüsünün aynı sınıfı `npm run check:dumps` ile kapandı; bu, dördüncüsü.

  Karşılaştırma değere kadar: pull birebir kopyalıyor (ölçüldü, 1158 anahtar ×
  3 dil, sıfır fark), yani katı eşitlik doğru ölçüt. `web/*` elle yazılıyor ve
  bu denetimin dışında - orası zaten web'e özel.
*/
for (const lang of LANGS) {
  const base = load("base", lang);
  const mob = loadMobile(lang);
  const onlyBase = [...base.keys()].filter((k) => !mob.has(k));
  const onlyMob = [...mob.keys()].filter((k) => !base.has(k));
  const differs = [...base.keys()].filter((k) => mob.has(k) && mob.get(k) !== base.get(k));
  if (onlyBase.length || onlyMob.length || differs.length) {
    bad++;
    console.error(`✗ base/${lang} mobil kaynakla aynı değil (npm çalıştır: node scripts/i18n-pull.mjs)`);
    if (onlyMob.length) console.error(`   tabanda EKSİK (${onlyMob.length}): ${onlyMob.slice(0, 6).join(", ")}`);
    if (onlyBase.length) console.error(`   tabanda FAZLA (${onlyBase.length}): ${onlyBase.slice(0, 6).join(", ")}`);
    if (differs.length) console.error(`   DEĞERİ FARKLI (${differs.length}): ${differs.slice(0, 6).join(", ")}`);
  }
}
if (!bad) console.log(`base: mobil kaynakla birebir (${load("base", "tr").size} anahtar × ${LANGS.length} dil)`);

if (dupes.length) {
  bad += dupes.length;
  for (const d of dupes) console.error(`yinelenen anahtar → ${d}`);
}

/*
  4b. Bir anahtar HEM `base` HEM `web` içinde tanımlı olmamalı.

  Sözlük `{ ...base, ...web }` diye kuruluyor: aynı anahtar iki yerde tanımlıysa
  WEB KAZANIYOR ve base'deki (mobil kaynaklı) metin sessizce gölgeleniyor. Aynı
  anahtar iki platformda iki ayrı cümle gösteriyor ve hiçbir denetim bunu
  söylemiyordu. Ölçüldü: yirmi sekiz anahtar iki yerde birden tanımlıydı,
  dördünün metni farklıydı (docs/plan/web-parity.md 11.128).

  Kural KOPYAYA bakıyor, değere değil: aynı metni iki yere yazmak bugün zararsız
  görünse de yarın birini düzeltip ötekini unutmanın yolu. Web'e özel bir metin
  gerekiyorsa web'e özel bir AD alır (ör. `assessw.fail_quota`) - o zaman fark
  görünür olur.
*/
{
  const b = load("base", "tr");
  const w = load("web", "tr");
  const golge = [...w.keys()].filter((k) => b.has(k));
  if (golge.length) {
    bad += golge.length;
    for (const k of golge) {
      const ayni = b.get(k) === w.get(k);
      console.error(`anahtar HEM base HEM web'de → ${k}${ayni ? " (aynı metin)" : " (METİN FARKLI — web gölgeliyor)"}`);
    }
  }
}

/*
  5. `web/*` içinde ÖLÜ anahtar var mı — çağrılan-ama-yok'un TERSİ.

  Bu denetim "kodda çağrıldı, sözlükte yok"u yakalıyordu; sözlükte durup hiç
  çağrılmayan anahtarı kimse görmüyordu. Bedeli ölçüldü: web sözlüğü mobil
  kaynaklı `progress.*` anahtarlarına geçirilince geride kalan dokuz
  `prog.*`/`progw.*` kopyası ölü kaldı, sonra "yanlışlıkla silinmiş" sanılıp
  geri kondu ve hiçbir kapı itiraz etmedi (docs/plan/web-parity.md 11.126).
  Aynı cümlenin iki kopyası tek başına zararsız görünüyor ama biri düzeltilip
  ötekinin eski kalması için bir yol açıyor.

  ARAMA `t()` ÇAĞRISINA BAKMIYOR, düz metne bakıyor: anahtarların çoğu bir
  tabloda duruyor (`titleKey: "ach.streak3.title"`) ve sonra çözülüyor. `t()`
  ile sınırlı bir arama bunların hepsini "ölü" sayardı - yüz sekiz rozet
  anahtarı dahil. Ölçüldü: düz metin araması on altı aday bırakıyor.

  MUAF olanlar ÇALIŞMA ANINDA kuruluyor ve dosyada tam adıyla hiç geçmiyor;
  ikisi de kaynağıyla birlikte yazılı:
    - `band.*`      → `lib/proficiency.ts`: `band.${band}`
    - `push.rem_*_named` → `lib/push.ts`: `${base}_named`
  Yeni bir dinamik aile eklenirse buraya da eklenir; liste kısa kalmalı,
  çünkü her muafiyet kapının gördüğü alanı daraltıyor.

  `base/*` denetlenmiyor: orası mobil sözlükten birebir üretiliyor ve orada
  kullanılmayan anahtar Android'in kendi meselesi.
*/
const DYNAMIC_WEB = [/^band\./, /^push\.rem_.*_named$/];
{
  const webKeys = load("web", "tr");
  const src = files.map((f) => readFileSync(f, "utf8")).join("\n");
  const dead = [...webKeys.keys()].filter(
    (k) => !DYNAMIC_WEB.some((re) => re.test(k)) && !src.includes(`"${k}"`) && !src.includes(`'${k}'`) && !src.includes(`${k}\``),
  );
  if (dead.length) {
    bad += dead.length;
    for (const k of dead) console.error(`web sözlüğünde ÖLÜ anahtar (hiçbir yerde çağrılmıyor) → ${k}`);
  }
}

if (missingUse.size) {
  bad += missingUse.size;
  for (const [k, file] of missingUse) console.error(`kod: "${k}" sözlükte yok — ${file}`);
}
console.log(`kod: ${files.length} dosyada çağrılan anahtarlar denetlendi`);

if (bad) { console.error(`\n${bad} sorun bulundu.`); process.exit(1); }
console.log("Sözlükler tutarlı.");
