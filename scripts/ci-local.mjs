/**
 * CI'yi YERELDE, İŞ AKIŞINDAKİ SIRAYLA çalıştırır.
 *
 *   npm run ci:local              # web işi (ağır adımlar hariç)
 *   npm run ci:local -- mobile    # mobil işi
 *   npm run ci:local -- --all     # ağır adımlar dahil (next build, veritabanı)
 *   npm run ci:local -- --from 12 # 12. adımdan itibaren
 *
 * NEDEN VAR. 2026-09-12'de bu oturum 25 komutu CI'a ekledi ve hepsini TEK TEK
 * çalıştırdı; sonra adımları DOSYADAKİ SIRAYLA koşturunca daha önce hiç
 * çalıştırılmamış ÜÇ mevcut kapının kırmızı olduğu çıktı (`typecheck:scripts`,
 * `check:parity`, `check:lessons-swap`) — üçü de aynı oturumun imza
 * değişikliklerinden. Tek tek çalıştırmak bunu göstermiyordu, çünkü kapıların
 * hangisinin var olduğunu bilmek için iş akışını okumak gerekiyordu.
 *
 * KOMUT LİSTESİ ELLE YAZILMIYOR, `.github/workflows/checks.yml`den OKUNUYOR.
 * Kopyalanan bir liste kaçınılmaz olarak bayatlar ve o zaman bu betik "yeşil"
 * derken CI kırmızı yanar — yani tam olarak önlemeye çalıştığı şeyi üretir.
 *
 * AĞIR ADIMLAR VARSAYILAN OLARAK ATLANIR ve hangileri olduğu kodda yazılı:
 * `npm ci` (yerelde kurulum zaten var), `next build` (dakikalar sürüyor) ve
 * veritabanı isteyen adım (göç + şema + iki test). `--all` ile hepsi girer.
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const WF = ".github/workflows/checks.yml";

/* İş akışı YAML'ı — bağımlılık eklemeden okumak için küçük bir ayrıştırıcı.
   Yalnız `jobs.<ad>.steps[].{name,run,working-directory}` gerekiyor; tam bir
   YAML ayrıştırıcısı bu iş için fazla ve yeni bir paket demek. */
function isleriOku(metin) {
  const satirlar = metin.split("\n");
  const isler = {};
  let is = null;
  let adim = null;
  let runIcinde = false;
  let runGirinti = 0;
  let envIcinde = false;
  for (const ham of satirlar) {
    const satir = ham.replace(/\s+$/, "");
    if (!satir.trim()) { if (runIcinde) adim.run.push(""); continue; }
    const girinti = satir.length - satir.trimStart().length;
    const m = /^ {2}([A-Za-z0-9_-]+):\s*$/.exec(satir);
    if (m && girinti === 2) { is = m[1]; isler[is] = []; adim = null; runIcinde = false; envIcinde = false; continue; }
    if (!is) continue;
    if (runIcinde) {
      if (girinti >= runGirinti) { adim.run.push(satir.slice(runGirinti)); continue; }
      runIcinde = false;
    }
    const yeni = /^ {6}- (?:name: )?(.*)$/.exec(satir);
    if (yeni) {
      adim = { name: yeni[1], run: [], wd: null, env: {} };
      envIcinde = false;
      /* `- run: npm ci` gibi ADSIZ ve tek satırlık adımlar da var; komut
         `- `nin hemen ardında duruyor ve ayrı bir `run:` satırı gelmiyor.
         İlk sürüm bunu ad sanıp komutu HİÇ görmüyordu — sessizce atlanan bir
         adım, yanlış yeşil demektir. */
      const gomulu = /^run: (.*)$/.exec(yeni[1]);
      if (gomulu) { adim.name = gomulu[1]; adim.run.push(gomulu[1]); }
      isler[is].push(adim);
      continue;
    }
    if (!adim) continue;
    if (/^ {8}run: \|/.test(satir)) { runIcinde = true; runGirinti = 10; continue; }
    const tekSatir = /^ {8}run: (.*)$/.exec(satir);
    if (tekSatir) { adim.run.push(tekSatir[1]); continue; }
    const wd = /^ {8}working-directory: (.*)$/.exec(satir);
    if (wd) { adim.wd = wd[1].trim(); continue; }
    const ad = /^ {8}name: (.*)$/.exec(satir);
    if (ad) { adim.name = ad[1]; continue; }
    /* ADIMIN `env:` BLOĞU DA OKUNMALI. İlk sürüm okumuyordu ve mobil ESLint
       adımı yerelde kırmızı yanıyordu: o adım `ESLINT_USE_FLAT_CONFIG: "false"`
       taşıyor, çünkü ESLint 8 depo kökündeki düz yapılandırmayı bulup kipi
       değiştiriyor. CI'nin yeşil olduğu yerde kırmızı diyen bir yerel koşucu,
       hiç olmamasından kötü — insan ona güvenmeyi bırakır. */
    if (/^ {8}env:\s*$/.test(satir)) { envIcinde = true; continue; }
    if (envIcinde) {
      const kv = /^ {10}([A-Za-z_][A-Za-z0-9_]*): (.*)$/.exec(satir);
      if (kv) { adim.env[kv[1]] = kv[2].trim().replace(/^"(.*)"$/, "$1"); continue; }
      envIcinde = false;
    }
  }
  /* Adsız adımın etiketi ilk alt anahtarı ("working-directory: mobile")
     oluyordu; komutun kendisi daha okunur. */
  for (const adimlar of Object.values(isler))
    for (const a of adimlar)
      if (/^(working-directory|uses|env|with):/.test(a.name) && a.run.length)
        a.name = a.run.map((l) => l.trim()).filter(Boolean)[0] ?? a.name;
  return isler;
}

/* Ağır adımlar: yerelde her seferinde çalıştırmak anlamsız ya da imkânsız. */
const AGIR = [
  { desen: /^npm ci$/m, neden: "yerelde kurulum zaten var" },
  { desen: /next build/, neden: "dakikalar sürüyor" },
  { desen: /migrate-all|schema-check|test:entitlement|test:legal-db/, neden: "veritabanı istiyor" },
];

const argv = process.argv.slice(2);
const hepsi = argv.includes("--all");
const fromIx = argv.includes("--from") ? Number(argv[argv.indexOf("--from") + 1]) : 0;
const isAdi = argv.find((a) => !a.startsWith("--") && !/^\d+$/.test(a)) ?? "web";

const isler = isleriOku(readFileSync(WF, "utf8"));
const adimlar = isler[isAdi];
if (!adimlar) {
  console.error(`bilinmeyen iş: ${isAdi} — bilinenler: ${Object.keys(isler).join(", ")}`);
  process.exit(2);
}

/* `--list`: hiçbir şey çalıştırmadan ayrıştırmayı göster. Koşucunun kendi
   ayrıştırıcısı iki kez sessizce yanıldı (adım `env:`i ve `- run:` biçimi),
   ikisi de "adım hiç görünmedi" diye ortaya çıktı — listeyi gözle görmek o
   sınıfı yakalamanın en ucuz yolu. */
if (argv.includes("--list")) {
  adimlar.forEach((adim, i) => {
    const k = adim.run.map((l) => l.trim()).filter(Boolean);
    const ek = [adim.wd ? `wd=${adim.wd}` : null, Object.keys(adim.env).length ? `env=${Object.keys(adim.env).join(",")}` : null].filter(Boolean).join(" ");
    console.log(`${String(i).padStart(2)}  ${k.length ? `${k.length} komut` : "komut yok"}  ${adim.name}${ek ? "  [" + ek + "]" : ""}`);
  });
  process.exit(0);
}

let kod = 0;
const atlanan = [];
adimlar.forEach((adim, i) => {
  const komutlar = adim.run.map((l) => l.trim()).filter(Boolean);
  if (!komutlar.length || i < fromIx) return;
  const metin = komutlar.join("\n");
  const agir = hepsi ? null : AGIR.find((a) => a.desen.test(metin));
  if (agir) { atlanan.push(`${String(i).padStart(2)} ${adim.name} — ${agir.neden}`); return; }
  const t0 = Date.now();
  process.stdout.write(`--- ${String(i).padStart(2)} ${adim.name} `);
  const r = spawnSync("bash", ["-e", "-c", metin], {
    cwd: adim.wd ?? process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    encoding: "utf8",
    env: { ...process.env, ...adim.env },
  });
  const sn = Math.round((Date.now() - t0) / 1000);
  if (r.status === 0) console.log(`✓ (${sn} sn)`);
  else {
    kod = 1;
    console.log(`✗ çıkış ${r.status} (${sn} sn)`);
    const ciktı = `${r.stdout ?? ""}${r.stderr ?? ""}`.trimEnd().split("\n");
    for (const l of ciktı.slice(-15)) console.log(`      ${l}`);
  }
});

if (atlanan.length) {
  console.log(`\natlanan (--all ile girer):`);
  for (const a of atlanan) console.log(`  ${a}`);
}
console.log(kod === 0 ? "\nYEREL CI GEÇTİ" : "\nYEREL CI BAŞARISIZ");
process.exit(kod);
