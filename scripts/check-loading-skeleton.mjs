/**
 * Yükleme iskeleti denetimi: `node scripts/check-loading-skeleton.mjs`
 *
 * NEDEN VAR. Bir rota sunucuda veri bekliyorsa ve `loading.tsx`i yoksa,
 * kullanıcı o süre boyunca BOŞ EKRAN görüyor — dokunduğu şeyin çalıştığına
 * dair hiçbir işaret yok. Android'de karşılığı ekranın kendi iskelet dalı
 * (`Skeleton*`, `RoundSkeleton`) ve orada bu dal neredeyse her ekranda var.
 *
 * Ölçüm (2026-09-11, §11.343): `(app)` altında veri bekleyen 23 sayfa var ve
 * ONUNUN iskeleti yoktu — aralarında beceri alıştırması (sunucuda on istek),
 * deneme sınavı bölümü, rol yapma sınavı, premium (beş okuma birden), herkese
 * açık profil ve yönetim hunisi. Dördünün Android karşılığı iskelet çiziyordu
 * (`PaywallScreen`, `UserScreen`, `SocialSettingsScreen`, `PlacementScreen`);
 * geri kalanda içerik Android'de YERELDE paketli olduğu için iskelete gerek
 * yok, yani orada ölçüt karşılaştırma değil MUTLAK: sunucudan içerik bekleyen
 * sayfa boş kalmaz.
 *
 * "Veri bekliyor" ölçütü: `page.tsx` UCUZ olmayan bir şeyi `await` ediyor.
 * Ucuz olanlar aşağıda sayılı ve hepsi her sayfada var (sözlük, dil, yol
 * parçaları, oturum); ayrıştırıcı olamazlar.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const KOK = path.join(ROOT, "src/app/(app)");

/** Her sayfada bulunan, beklemeye sebep olmayan çağrılar. */
const UCUZ = new Set(["getT", "getLang", "getUserId", "params", "searchParams", "cookies", "headers", "props"]);

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + m.slice(p.length).replace(/[^\n]/g, " "));
}
function walkDirs(dir, out = []) {
  out.push(dir);
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walkDirs(path.join(dir, e.name), out);
  }
  return out;
}

const eksik = [];
let olculen = 0;
for (const dir of walkDirs(KOK)) {
  const sayfa = path.join(dir, "page.tsx");
  if (!fs.existsSync(sayfa)) continue;
  const src = stripComments(fs.readFileSync(sayfa, "utf8"));
  const cagrilar = new Set([...src.matchAll(/await\s+([A-Za-z_$][\w$.]*)/g)].map((m) => m[1]));
  const agir = [...cagrilar].filter((c) => !UCUZ.has(c.split(".")[0]));
  if (!agir.length) continue;
  olculen++;
  if (!fs.existsSync(path.join(dir, "loading.tsx"))) {
    eksik.push({ rel: path.relative(ROOT, dir), agir: agir.slice(0, 4) });
  }
}

if (eksik.length) {
  console.error("check:loading — veri bekleyen ama `loading.tsx`i olmayan rotalar:\n");
  for (const e of eksik) console.error(`  ${e.rel}\n      await: ${e.agir.join(", ")}`);
  console.error("\nKalıp: `LoadingRegion` + sayfanın kendi ilk karesinin iskeleti (bkz. mevcut `loading.tsx`ler).");
  process.exit(1);
} else {
  console.log(`check:loading — veri bekleyen ${olculen} rotanin hepsinde iskelet var: tamam`);
}
