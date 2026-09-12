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
  "/api/cron/streak-alert": "systemd timer (lernomi-cron-streak, saatlik 17-21 UTC)",
  "/api/cron/summary": "systemd timer",
  "/api/cron/weekly-reminder": "systemd timer (lernomi-cron-weekly, pazar 15-19 UTC)",
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
/*
 * UÇ DOSYASININ YOLU ÇAĞIRAN DEĞİLDİR.
 *
 * `src/app/api/cron/summary/route.ts` dizgisi `/api/cron/summary` önekini
 * İÇERİYOR; yani bir kapının o dosyayı `read()` etmesi, uç çağrılıyormuş gibi
 * görünüyordu. 2026-09-12'de tam bu oldu: `check:parity` 274 özet cron'unun
 * gövdesini okumaya başladı ve `check:endpoints` "listede olup artık çağrılan
 * uç" dedi — oysa çağıran hâlâ systemd timer'ı.
 *
 * Yol biçimi taramadan ÖNCE düşürülüyor. Gerçek çağıran `fetch("/api/…")`
 * yazıyor ve ondan etkilenmiyor; ölçü zayıflamıyor.
 */
const ROUTE_PATH = /\b(?:mobile\/)?src\/app\/api\/[\w[\]./-]*route\.ts\b/g;

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
              .replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1")
              .replace(ROUTE_PATH, " "),
          );
        }
      }
    };
    walk(abs);
  }
  return out;
}

/**
 * WEB CAGIRIYOR AMA MOBIL CAGIRMIYOR — sebebiyle.
 *
 * `ALLOW` "her ucun BIR cagirani var mi" diye soruyor; bu liste onun parite
 * hâli: "her ucun IKI cagirani var mi". Bir uc yalniz webden cagriliyorsa ya
 * bunun bir sebebi vardir (yonetim panosu, cron, magaza, tarayiciya ozel
 * tasima) ya da Android'de o yuzey HIC YOK - ve ikincisi sessizce oluyor.
 * Olculdugunde iki gercek ornek cikti: `/api/errors` (zayif noktalar karti,
 * web-parity 11.135'te kapatildi) ve `/api/growth` (asagida).
 *
 * Liste yalniz KISALABILIR: bir ucu buraya eklemek, mobilde karsiligi
 * olmadigini BELGELEMEKTIR.
 */
/* YONTEM DUZEYINDE. Ayni ucun bir YONTEMI tek platformda kalabiliyor ve bu,
   ucun tamamen tek platformda kalmasi kadar sessiz: `GET /api/skills` webde
   okunuyordu, mobilde okunmuyordu ve Android'de beceri ilerlemesi cihaza
   hapsolmustu (web-parity 11.144). Yol duzeyindeki liste bunu goremedi cunku
   mobil ayni yolu POST icin zaten aniyordu. */
const WEB_ONLY_METHOD = {
  "DELETE /api/push/subscribe": "TARAYICI push aboneligi; mobil FCM (/api/push/device)",
  "PUT /api/push/subscribe": "TARAYICI push aboneligi",
  "POST /api/push/subscribe": "TARAYICI push aboneligi",
  "POST /api/stt": "mobil ayni ucu NATIVE cagiriyor (Kotlin uploadStt) - JS kaynaginda gorunmez",
  "POST /api/session": "tur ORTASI ilerleme damgasi; mobil ilerlemeyi cevaplarla birlikte /api/answers'a yaziyor",
  "POST /api/pronounce": "telaffuz puani - karar bekliyor (web-parity 11.139)",
  "GET /api/premium/referral": "mobil ayni kodu /api/premium/status icinden aliyor",
  "POST /api/admin/legal": "yonetim panosu",
  "POST /api/admin/premium": "yonetim panosu",
};

const WEB_ONLY = {
  "/api/admin/legal": "yonetim panosu — mobilde yok, olmayacak",
  "/api/admin/premium": "yonetim panosu — mobilde yok, olmayacak",
  "/api/push/subscribe": "TARAYICI push aboneligi; mobil FCM ile /api/push/device cagiriyor",
  "/api/premium/referral": "mobil ayni kodu /api/premium/status icinden aliyor (usePremiumStatus().referral.code)",
  "/api/pronounce": "telaffuz PUANI; mobil konusmayi cihazdaki taniyici + spokenMatches ile metin olarak esliyor — web-parity 11.136",
};

const all = routes().sort();
const src = sources(["src", "scripts", "mobile/src", "mobile/scripts"]);
/* Dinamik parça (`[id]`) çağıranda değişken olarak duruyor: önek aranıyor. */
const prefix = (api) => api.replace(/\/\[[^\]]+\].*$/, "");
const called = (api) => src.some((t) => t.includes(prefix(api)));

const orphans = all.filter((a) => !called(a));
const undocumented = orphans.filter((a) => !ALLOW[a]);
const stale = Object.keys(ALLOW).filter((a) => !orphans.includes(a));

/* Web kaynagi ile mobil kaynagi AYRI okunuyor: "iki cagiran" sorusu ancak
   boyle sorulabiliyor. */
const webSrc = sources(["src"]);
const mobSrc = sources(["mobile/src"]);
const calledIn = (list, api) => list.some((t) => t.includes(prefix(api)));
const webOnly = all.filter((a) => calledIn(webSrc, a) && !calledIn(mobSrc, a));
const webOnlyUndoc = webOnly.filter((a) => !WEB_ONLY[prefix(a)] && !WEB_ONLY[a]);
const webOnlyStale = Object.keys(WEB_ONLY).filter((a) => !webOnly.some((x) => prefix(x) === a || x === a));

/* Cagri yerindeki YONTEM: `method: "X"` varsa o, yoksa GET. Pencere cagri
   ifadesinin sonunda kesiliyor - iki komsu cagri (once GET, sonra POST) ayni
   pencereye girip birbirinin yontemini gölgelemesin. */
function yontemler(text, yol) {
  const out = new Set();
  let i = 0;
  while ((i = text.indexOf(yol, i)) >= 0) {
    let son = text.length;
    for (const t of [";", "\n\n"]) { const j = text.indexOf(t, i); if (j >= 0 && j < son) son = j; }
    const w = text.slice(i, Math.min(son, i + 400));
    const m = w.match(/method:\s*"(GET|POST|PATCH|PUT|DELETE)"/);
    out.add(m ? m[1] : "GET");
    i += yol.length;
  }
  return out;
}
const routeMethods = (f) =>
  [...fs.readFileSync(f, "utf8").matchAll(/export async function (GET|POST|PATCH|PUT|DELETE)/g)].map((m) => m[1]);

const yontemSatirlari = [];
for (const ep of all) {
  const dosya = path.join(ROOT, "src", "app", ep, "route.ts");
  if (!fs.existsSync(dosya)) continue;
  const p = prefix(ep);
  for (const m of routeMethods(dosya)) {
    if (yontemler(webSrc.join("\n"), p).has(m) && !yontemler(mobSrc.join("\n"), p).has(m)) {
      yontemSatirlari.push(`${m} ${p}`);
    }
  }
}
const yontemUndoc = yontemSatirlari.filter((r) => !WEB_ONLY_METHOD[r]);
const yontemStale = Object.keys(WEB_ONLY_METHOD).filter((r) => !yontemSatirlari.includes(r));

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
if (webOnlyUndoc.length) {
  bad++;
  console.error("\nYALNIZ WEBİN ÇAĞIRDIĞI UÇ (mobilde karşılığı yok):");
  for (const a of webOnlyUndoc) console.error(`  ${a}`);
  console.error("\nMobil istemciye bağla ya da `WEB_ONLY` listesine SEBEBİYLE ekle.");
}
if (yontemUndoc.length) {
  bad++;
  console.error("\nYALNIZ WEBİN ÇAĞIRDIĞI YÖNTEM (mobilde o yöntem yok):");
  for (const r of yontemUndoc) console.error(`  ${r}`);
  console.error("\nMobil istemciye bağla ya da `WEB_ONLY_METHOD` listesine SEBEBİYLE ekle.");
}
if (yontemStale.length) {
  bad++;
  console.error("\nWEB_ONLY_METHOD LİSTESİNDE OLUP ARTIK MOBİLDE DE ÇAĞRILAN YÖNTEM (listeden çıkar):");
  for (const r of yontemStale) console.error(`  ${r}`);
}
if (webOnlyStale.length) {
  bad++;
  console.error("\nWEB_ONLY LİSTESİNDE OLUP ARTIK MOBİLDE DE ÇAĞRILAN UÇ (listeden çıkar):");
  for (const a of webOnlyStale) console.error(`  ${a}`);
}
if (!bad) console.log(check ? `tamam: ${all.length} uç, ${orphans.length} belgelenmiş çağıransız` : "\nHEPSİ YAZILI\n");
process.exit(bad ? 1 : 0);
