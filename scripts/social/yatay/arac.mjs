#!/usr/bin/env node
/*
  Yatay bölüm aracı (yerel): yükle, sesleri bul, sayfayı kur; isteğe göre kare al, yerleşimi denetle, çizelgeyi bas.

  node scripts/social/yatay/arac.mjs                       bütün yatay bölümler: yüklenir mi, tekrar/takvim, eksik ses
  node scripts/social/yatay/arac.mjs <id> --sunucudan      sesleri sunucudan çek (Mac'te dinleme kayıtları yok)
  node scripts/social/yatay/arac.mjs <id> --denetle        yerleşim denetimi (Y.audit, sunucunun üretimden önceki kuralı)
  node scripts/social/yatay/arac.mjs <id> --kare 2,30,95   o saniyelerin kareleri → .shots/social/yatay/<id>/kare-<t>.png
  node scripts/social/yatay/arac.mjs <id> --kapak          kapak (1280×720) → .shots/social/yatay/<id>/kapak.jpg
  node scripts/social/yatay/arac.mjs <id> --cizelge        bölümler, süre, YouTube açıklaması
*/
import fs from "node:fs";
import path from "node:path";
import { loadLong, longDuplicates, longSchedule } from "./icerik.mjs";
import { OUT, pullFromServer, renderPage, resolveClips } from "./sayfa.mjs";
import { launchBrowser } from "../lib/page.mjs";
import { describe } from "./aciklama.mjs";

const args = process.argv.slice(2);
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const ids = args.filter((a, i) => !a.startsWith("--") && !["--kare"].includes(args[i - 1]));
const all = await loadLong();

if (!ids.length) {
  const errors = [...longDuplicates(all), ...longSchedule(all).errors];
  for (const w of longSchedule(all).warnings) console.warn(`~ ${w}`);
  for (const e of all) {
    const { missing } = resolveClips(e.spoken, { b64: false });
    console.log(`${e.id.padEnd(22)} ${e.status.padEnd(7)} ${e.slot ? `▸ ${e.slot}` : "".padEnd(18)} ${String(e.spoken.length).padStart(4)} ses, eksik ${missing.length}`);
  }
  for (const e of errors) console.error(`✗ ${e}`);
  console.log(errors.length ? `\n${errors.length} hata` : `\n✓ ${all.length} yatay bölüm`);
  process.exit(errors.length ? 1 : 0);
}

for (const id of ids) {
  const ep = all.find((e) => e.id === id);
  if (!ep) throw new Error(`yatay bölüm yok: ${id}`);
  if (args.includes("--sunucudan")) pullFromServer(ep.spoken);
  const { clips, missing } = resolveClips(ep.spoken);
  const dir = path.join(OUT, id);
  fs.mkdirSync(dir, { recursive: true });
  const html = path.join(dir, "sayfa.html");
  fs.writeFileSync(html, renderPage({ template: ep.template, data: ep.data, clips }));
  const browser = await launchBrowser();
  const pg = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const errs = [];
  pg.on("pageerror", (e) => errs.push(String(e)));
  await pg.goto(`file://${html}`);
  await pg.waitForFunction(() => window.READY || window.FAILED, null, { timeout: 120000 });
  const failed = await pg.evaluate(() => window.FAILED || null);
  if (failed) throw new Error(`${id}: sahne kurulamadı: ${failed}`);
  const plan = await pg.evaluate(() => window.I.plan);
  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
  console.log(`${id}: ${fmt(plan.duration)} (${plan.duration.toFixed(1)} sn), ${plan.voice.length} ses ipucu, ${plan.chapters.length} bölüm; kaydı eksik ${missing.length}/${ep.spoken.length}`);
  for (const m of missing.slice(0, 40)) console.log(`   ses yok: ${m}`);
  if (args.includes("--cizelge")) {
    for (const c of plan.chapters) console.log(`   ${fmt(c.t)}  ${c.title}`);
    console.log("\n" + describe({ id, data: ep.data, plan }));
  }
  if (args.includes("--denetle")) {
    const issues = await pg.evaluate(() => Y.audit(window.I));
    console.log(issues.length ? `✗ ${issues.length} yerleşim sorunu` : "✓ yerleşim temiz");
    for (const l of issues.slice(0, 60)) console.log(`   ${l}`);
    process.exitCode = issues.length ? 1 : process.exitCode;
  }
  const kare = opt("--kare");
  if (kare) {
    for (const t of kare.split(",").map(Number)) {
      await pg.evaluate((t) => window.I.render(t), t);
      await pg.screenshot({ path: path.join(dir, `kare-${String(t).padStart(6, "0")}.png`) });
    }
    console.log(`   kareler: ${dir}`);
  }
  if (args.includes("--kapak")) {
    await pg.evaluate(() => window.I.showCover(true));
    const png = path.join(dir, "kapak.png");
    await pg.screenshot({ path: png });
    console.log(`   kapak: ${png}`);
  }
  if (errs.length) console.error(`sayfa hatası: ${errs.join(" | ")}`);
  await browser.close();
}
