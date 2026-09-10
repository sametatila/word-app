/**
 * HER UCUN BİR ÇAĞIRANI VAR MI.
 *
 * NEDEN VAR: bir uç yazılıp istemciye hiç bağlanmadığında kimse fark etmiyor.
 * Derleme geçiyor, lint geçiyor, tipler tutuyor; uç sessizce çürüyor ve
 * yaptığı iş HİÇ yapılmıyor. Bu depoda ölçüldüğünde iki gerçek örnek çıktı:
 * `/api/plan` (istemcisi bir parite turunda kaldırıldı) ve
 * `/api/premium/consume` (tur başına kotayı sayan tek yer; çağıran olmadığı
 * için sayaç hiç artmıyor).
 *
 * Kural: `src/app/api/**\/route.ts` altındaki her uç ya web/mobil kaynağında
 * çağrılıyor olacak ya da aşağıdaki listede SEBEBİYLE yazılı olacak. Liste
 * yalnız KISALABİLİR: bir ucu listeye eklemek, onu bağlamamayı belgelemektir.
 *
 *   node scripts/check-endpoints.mjs          # döküm
 *   node scripts/check-endpoints.mjs --check  # listede olmayan çağıransız uç varsa hata (CI)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Çağıranı REPODA OLMAYAN uçlar — sebebiyle.
 *
 * İlk beşi dışarıdan çağrılıyor (bizim kodumuz onları çağırmaz, çağırmamalı).
 * Son ikisi gerçekten çağıransız ve ikisi de belgelenmiş durumda; kalıcı
 * olarak atılıp atılmayacakları ürün kararı.
 */
const ALLOW = {
  "/api/auth/apple/notifications": "Apple sunucudan sunucuya bildirim gönderiyor; bizim kodumuz çağırmaz",
  "/api/cron/reminders": "systemd timer + /opt/lernomi/cron-call.sh (repo dışı, bkz. AGENTS.md)",
  "/api/cron/streak-alert": "systemd timer (deploy sonrası kurulacak, bkz. AGENTS.md)",
  "/api/cron/summary": "systemd timer",
  "/api/cron/weekly-reminder": "systemd timer (deploy sonrası kurulacak)",
  "/api/plan": "istemcisi parite turunda kaldırıldı (web-parity §7); e2e `buildPlan`i doğrudan deniyor",
  "/api/premium/consume": "tur başına kotayı sayan uç, çağıranı yok (web-parity §11.24)",
  "/api/cron/assess": "systemd timer (lernomi-cron-assess, her gün 04:15 UTC)",
  "/api/premium/webhook/[[...provider]]": "mağaza (Play/RevenueCat) sunucudan sunucuya çağırıyor",
};

/** Bütün uç yolları. */
function routes(dir = path.join(ROOT, "src", "app", "api"), out = []) {
  for (const entry of fs.readdirSync(dir)) {
    const p = path.join(dir, entry);
    if (fs.statSync(p).isDirectory()) routes(p, out);
    else if (entry === "route.ts") {
      out.push("/" + path.relative(path.join(ROOT, "src", "app"), dir).split(path.sep).join("/"));
    }
  }
  return out;
}

/**
 * Kaynak dosyaları. İki şey hariç: uç dosyalarının KENDİSİ (uç kendini
 * çağırmış sayılmaz) ve BU BETİK (`ALLOW` listesindeki yollar kaynakta
 * geçtiği için her ucu "çağrılıyor" yapardı).
 */
function sources(dirs, out = []) {
  for (const d of dirs) {
    const abs = path.join(ROOT, d);
    if (!fs.existsSync(abs)) continue;
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir)) {
        const p = path.join(dir, entry);
        if (entry === "node_modules") continue;
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (
          /\.(ts|tsx|js|mjs)$/.test(entry) &&
          !(p.includes(`${path.sep}api${path.sep}`) && entry === "route.ts") &&
          p !== fileURLToPath(import.meta.url)
        ) {
          /* YORUMLAR ATILIYOR. Uç yolları yorumlarda da geçiyor (ör. `/api/stt`
             kendi yorumunda `/api/premium/consume`a atıf yapıyor) ve yorumdaki
             bir atıf çağıran DEĞİL. Yorumlar sayılırsa denetim her ucu
             "çağrılıyor" sanar ve hiçbir şey söylemez. */
          out.push(
            fs
              .readFileSync(p, "utf8")
              .replace(/\/\*[\s\S]*?\*\//g, " ")
              .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1"),
          );
        }
      }
    };
    walk(abs);
  }
  return out;
}

const all = routes().sort();
const src = sources(["src", "scripts", "mobile/src", "mobile/scripts"]);
/* Dinamik parça (`[id]`) çağıranda değişken olarak duruyor: önek aranıyor. */
const prefix = (api) => api.replace(/\/\[[^\]]+\].*$/, "");
const called = (api) => src.some((t) => t.includes(prefix(api)));

const orphans = all.filter((a) => !called(a));
const undocumented = orphans.filter((a) => !ALLOW[a]);
const stale = Object.keys(ALLOW).filter((a) => !orphans.includes(a));

const check = process.argv.includes("--check");
if (!check) {
  console.log(`${all.length} uç, ${orphans.length} tanesinin repoda çağıranı yok:\n`);
  for (const a of orphans) console.log(`  ${a}\n      ${ALLOW[a] ?? "SEBEP YAZILI DEĞİL"}`);
}

let bad = 0;
if (undocumented.length) {
  bad++;
  console.error("\nÇAĞIRANI OLMAYAN VE LİSTEDE YAZILI OLMAYAN UÇ:");
  for (const a of undocumented) console.error(`  ${a}`);
  console.error("\nUcu bir istemciye bağla ya da `ALLOW` listesine SEBEBİYLE ekle.");
}
if (stale.length) {
  bad++;
  console.error("\nLİSTEDE OLUP ARTIK ÇAĞRILAN UÇ (listeden çıkar):");
  for (const a of stale) console.error(`  ${a}`);
}
if (!bad) console.log(check ? `tamam: ${all.length} uç, ${orphans.length} belgelenmiş çağıransız` : "\nHEPSİ YAZILI\n");
process.exit(bad ? 1 : 0);
