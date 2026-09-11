/**
 * SUNUCU SINIRI — sunucuda çizilen bir yol, istemci modülünün işlevini
 * ÇAĞIRIYOR mu?
 *
 * Bu kapı bir üretim kırığından doğdu. Arkadaşlar sayfası (sunucu bileşeni)
 * `hubTab()`i doğrudan çağırıyordu ve o işlev `"use client"` taşıyan
 * `components/social/friends-hub` içindeydi. Next böyle bir çağrıyı çalışma
 * zamanında reddediyor:
 *
 *   "Attempted to call hubTab() from the server but hubTab is on the client."
 *
 * Sayfanın kendi `try/catch`i hatayı yutup "Arkadaşlar yüklenemedi" kartını
 * çiziyordu, yani kusur GEÇİCİ BİR ARIZA gibi görünüyordu; oysa herkeste, her
 * istekte kırıktı ve sunucu günlüğüne her seferinde yazıyordu.
 *
 * NEDEN HİÇBİR KAPI GÖRMEDİ: tip denetimi için imza geçerli (aynı depo, aynı
 * modül), lint için sıradan bir içe alım, `check:parity` ise iki platformu
 * karşılaştırıyor — bu ise tek platformun kendi içindeki bir sınır ihlali.
 * Yalnız çalışma zamanında görünüyor ve ancak sayfayı AÇARSAN.
 *
 * ÖLÇÜM: `app/` altındaki sunucu giriş noktalarından (page/layout/route/…)
 * başlayıp içe alım ağacını sunucu dosyaları boyunca yürüyor; bir dalda
 * `"use client"` taşıyan bir modülden gelen KÜÇÜK HARFLE başlayan bir ad
 * çağrılıyorsa ihlal veriyor.
 *
 * SINIRLARI YAZILI:
 *  - Büyük harfle başlayan adlar (bileşenler) dışarıda: onlar JSX olarak
 *    çiziliyor ve sınır ihlali değil, Next'in desteklediği tek yol.
 *  - `type` içe alımları dışarıda: tip zaten derlemede siliniyor.
 *  - Yıldız (`import * as`) ve varsayılan içe alımlar taranmıyor; depoda
 *    kullanılmıyorlar. Kullanılırlarsa bu kapı onları GÖRMEZ - bilerek dar.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";

const walk = (d, out = []) => {
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = d + "/" + e.name;
    if (e.isDirectory()) {
      if (!/node_modules|\.next|__tests__/.test("/" + p)) walk(p, out);
    } else if (/\.tsx?$/.test(e.name)) out.push(p);
  }
  return out;
};

const read = (f) => readFileSync(f, "utf8");
const isClient = (f) => /^\s*["']use client["']/.test(read(f));

/** `@/x` ve `./x` içe alımını dosya yoluna çevirir; paket adlarında null. */
function resolve(from, spec) {
  let base =
    spec.startsWith("@/") ? "src/" + spec.slice(2)
    : spec.startsWith(".") ? from.split("/").slice(0, -1).join("/") + "/" + spec
    : null;
  if (!base) return null;
  const out = [];
  for (const p of base.split("/")) {
    if (p === ".") continue;
    if (p === "..") { out.pop(); continue; }
    out.push(p);
  }
  base = out.join("/");
  for (const ek of [".tsx", ".ts", "/index.tsx", "/index.ts"]) {
    if (existsSync(base + ek)) return base + ek;
  }
  return null;
}

const files = walk("src");
const isServerOnly = (f) => /import\s+["']server-only["']/.test(read(f));
const ENTRY = /^src\/app\/.*\/(page|layout|route|template|error|loading|not-found)\.tsx?$/;
const entries = files.filter((f) => ENTRY.test(f) && !isClient(f));

const found = new Set();
const seen = new Set();

function scan(file, entry, depth) {
  if (depth > 6 || seen.has(entry + "|" + file)) return;
  seen.add(entry + "|" + file);
  const src = read(file);
  /* Çağrı araması içe alım satırlarının DIŞINDA: `import { x }` satırının
     kendisi `x(` gibi görünmüyor ama uzun listelerde yanlış eşleşme riskini
     tümden kaldırmak ucuz. */
  const body = src.replace(/import[^;]+;/g, "");
  for (const m of src.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/g)) {
    const target = resolve(file, m[2]);
    if (!target) continue;
    const targetIsClient = isClient(target);
    for (const raw of m[1].split(",")) {
      const piece = raw.trim();
      if (!piece || piece.startsWith("type ")) continue;
      const name = piece.split(/\s+as\s+/).pop()?.trim();
      if (!name || /^[A-Z]/.test(name)) continue;
      if (targetIsClient && new RegExp("\\b" + name + "\\s*\\(").test(body)) {
        found.add(`${entry}\n      ${file} çağırıyor: ${name}()  <-  ${m[2]} ("use client")`);
      }
    }
    if (!targetIsClient && target.startsWith("src/")) scan(target, entry, depth + 1);
  }
}

for (const e of entries) scan(e, e, 0);

/**
 * İKİNCİ SINIR: istemciden görünen gizli env.
 *
 * `"use client"` taşıyan bir modül (ya da ondan ulaşılan herhangi bir modül)
 * `process.env.GIZLI` okursa, değer derleme sırasında paketin İÇİNE gömülür
 * ve her ziyaretçiye gider. `NEXT_PUBLIC_` öneki tam da "bu değer herkese
 * açık" demek; öneksiz olan her ad bir sırdır.
 *
 * Bunu NE KORUYOR: yalnız `server-only` işareti, o da modül işaretliyse.
 * İşaretsiz bir yardımcıya sızan tek bir okuma sessizce yayına çıkar —
 * derleme geçer, tip geçer, lint geçer. Bugün temiz; kapı temiz KALMASI için.
 */
const clientEntries = files.filter(isClient);
const leaks = new Set();
const leakSeen = new Set();

function scanEnv(file, entry, depth) {
  if (depth > 6 || leakSeen.has(entry + "|" + file)) return;
  leakSeen.add(entry + "|" + file);
  const src = read(file);
  for (const m of src.matchAll(/process\.env\.([A-Z][A-Z0-9_]*)/g)) {
    /* `NODE_ENV` istisna: Next onu zaten herkese açık sayıyor ve değeri sır
       değil ("production"/"development"). */
    if (m[1].startsWith("NEXT_PUBLIC_") || m[1] === "NODE_ENV") continue;
    leaks.add(`${entry}\n      ${file}: process.env.${m[1]}`);
  }
  for (const m of src.matchAll(/import\s*(?:\{[^}]*\}|[\w*]+)?\s*from\s*["']([^"']+)["']/g)) {
    const target = resolve(file, m[1]);
    /* `server-only` modülüne dalmıyoruz: oraya bir istemci dalından gelinmesi
       zaten Next'in derleme hatası ve bu kapının işi değil. */
    if (!target || isServerOnly(target) || !target.startsWith("src/")) continue;
    scanEnv(target, entry, depth + 1);
  }
}

for (const e of clientEntries) scanEnv(e, e, 0);

/**
 * ÜÇÜNCÜ SINIR: sunucudan istemciye SERİ HÂLE GELMEYEN prop.
 *
 * Sunucu bileşeninin istemci bileşenine geçirdiği her prop JSON'a
 * çevriliyor. Fonksiyon, `Date`, `Map`, `Set` çevrilemiyor ve Next çizim
 * sırasında fırlatıyor ("Functions cannot be passed directly to Client
 * Components"). Derleme geçer, tip geçer — sayfayı AÇANA kadar görünmez;
 * §11.302'deki `hubTab` kırığının tam kardeşi.
 *
 * TARAMA BİR KEZ HİÇBİR ŞEY ÖLÇMEDİ ve sebebi kayda değer: açılış etiketini
 * `[\s\S]{0,700}?/?>` ile kesiyordum ve ilk `>` OKUN içindeydi
 * (`onPick={() => …}`), yani etiket tam da aranan prop'un ÖNÜNDE bitiyordu.
 * Enjeksiyon yakalanmayınca ortaya çıktı. Bu tuzağın kaydı depoda zaten
 * vardı (`check:parity` §138 civarı, "ok işaretinde bitmeyen ilk `>`");
 * çözüm de oradan: `[^=]>`.
 */
const serialize = new Set();
for (const file of files) {
  if (isClient(file) || !file.endsWith(".tsx")) continue;
  const src = read(file);
  const fromClient = new Map();
  for (const m of src.matchAll(/import\s*\{([^}]+)\}\s*from\s*["']([^"']+)["']/g)) {
    const target = resolve(file, m[2]);
    if (!target || !isClient(target)) continue;
    for (const raw of m[1].split(",")) {
      const name = raw.trim().replace(/^type\s+/, "").split(/\s+as\s+/).pop()?.trim();
      if (name && /^[A-Z]/.test(name)) fromClient.set(name, m[2]);
    }
  }
  for (const [name, mod] of fromClient) {
    const tag = new RegExp("<" + name + "\\b[\\s\\S]{0,700}?[^=]>", "g");
    for (const m of src.matchAll(tag)) {
      for (const p of m[0].matchAll(/(\w+)=\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/g)) {
        const value = p[2].trim();
        /* `new Date()` ihlal, `new Date().toISOString()` DEĞİL: ikincisi
           dizgi döndürüyor ve seri hâle geliyor. Kalıp bu yüzden kurucunun
           kapanışında BİTMEYİ şart koşuyor. */
        const nonSerializable =
          /^\(.*\)\s*=>/.test(value) ||
          /^function\b/.test(value) ||
          /^async\s/.test(value) ||
          /^new (?:Date|Map|Set)\([^)]*\)$/.test(value);
        if (nonSerializable) {
          serialize.add(`${file}\n      <${name} ${p[1]}={${value.slice(0, 48)}…}>  <-  ${mod}`);
        }
      }
    }
  }
}

if (serialize.size) {
  console.error("\nSUNUCUDAN İSTEMCİYE SERİ HÂLE GELMEYEN PROP:\n");
  for (const x of serialize) console.error("  " + x + "\n");
  console.error(
    "Next bu prop'u JSON'a çeviremiyor ve çizim sırasında fırlatır.\n" +
    "Değeri istemci tarafında üretin ya da seri hâle gelen bir biçimde geçirin\n" +
    "(tarih için ISO dizgi, eşleme için dizi).\n",
  );
  process.exit(1);
}

if (leaks.size) {
  console.error("\nİSTEMCİDEN GİZLİ ENV OKUNUYOR:\n");
  for (const l of leaks) console.error("  " + l + "\n");
  console.error(
    "Bu değer derleme sırasında pakete gömülür ve her ziyaretçiye gider.\n" +
    "Okumayı sunucu tarafına taşıyın; istemciye yalnız sonucu geçirin.\n",
  );
  process.exit(1);
}

if (found.size) {
  console.error("\nSUNUCUDAN İSTEMCİ İŞLEVİ ÇAĞRILIYOR:\n");
  for (const f of found) console.error("  " + f + "\n");
  console.error(
    "Bu çağrı çalışma zamanında fırlatır. İşlevi `\"use client\"` taşımayan\n" +
    "ayrı bir modüle taşıyın; iki taraf da oradan okusun.\n",
  );
  process.exit(1);
}

console.log(
  `check:client-boundary — ${entries.length} sunucu girişi, ${clientEntries.length} istemci girişi: sınır ihlali yok`,
);
