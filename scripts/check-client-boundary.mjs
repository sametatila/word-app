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

if (found.size) {
  console.error("\nSUNUCUDAN İSTEMCİ İŞLEVİ ÇAĞRILIYOR:\n");
  for (const f of found) console.error("  " + f + "\n");
  console.error(
    "Bu çağrı çalışma zamanında fırlatır. İşlevi `\"use client\"` taşımayan\n" +
    "ayrı bir modüle taşıyın; iki taraf da oradan okusun.\n",
  );
  process.exit(1);
}

console.log(`check:client-boundary — ${entries.length} sunucu giriş noktası, sınır ihlali yok`);
