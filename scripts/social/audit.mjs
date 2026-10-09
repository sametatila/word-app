#!/usr/bin/env node
/*
  Yerleşim denetimi: bölümleri 0,2 sn'de bir tarar, görünen her öğeyi ölçer.

  npm run social:audit [-- <bölüm-id | şablon> …] [-- --engine webkit|chromium|both]   (varsayılan both)
  Bölüm verilmezse bütün bölümler; şablon adı o şablonun bütün bölümleri demek.

  Kurallar (sahne koordinatı, 1080×1920):
    GÜVENLİ ALAN DIŞI  yazı x 90–934, y 180–1535 dışına taşıyor (sağda TikTok/Reels düğmeleri, altta açıklama)
    ÇAKIŞMA            iki yazı üst üste (aynı metinli iki kopya, ör. çevrilen sayfalar, sayılmaz)
    KUTUDAN TAŞIYOR    yazı kendi kutusunun (en yakın arka planlı ata) kenarına 6 px'ten fazla yaklaşıyor/çıkıyor
    KUTU ALTTAN TAŞIYOR kutu 1540'ın altına iniyor
    KESİLİYOR          taşması gizlenen kutuda metin sığmıyor
    DOLGU AZ           kutulu yazıda yatay dolgu < 18 px ya da dikey < 6 px
  Kısa süren (0,6 sn'den az) durumlar geçiş sayılır, raporlanmaz. Bilerek yapılan durumlar (satır içi ek vurgusu,
  açılırken kırpılan artikel, bulanık zemin ışıkları, fişin henüz basılmamış kısmı) aşağıdaki listede atlanır.
  Gerekçesiz yeni istisna eklenmez.
*/
import fs from "node:fs";
import path from "node:path";
import { OUT, CHROME, playwright, buildPage, localDoc } from "./lib/page.mjs";
import { loadEpisodes } from "./lib/episodes.mjs";

const args = process.argv.slice(2);
const engArg = args.includes("--engine") ? args[args.indexOf("--engine") + 1] : "both";
const only = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--engine");
const engines = engArg === "both" ? ["chromium", "webkit"] : [engArg];
const all = (await loadEpisodes()).episodes;
const picked = only.length ? all.filter((e) => only.includes(e.id) || only.includes(e.template)) : all;
const missing = only.filter((a) => !all.some((e) => e.id === a || e.template === a));
if (missing.length) throw new Error(`bölüm/şablon yok: ${missing.join(", ")}`);
const { clips } = await loadEpisodes(picked.map((e) => e.id));
const EPISODES = Object.fromEntries(picked.map((e) => [e.id, { template: e.template, data: e.data }]));
const { page, ok } = buildPage("audit.html", { data: {}, clips, templates: picked.map((e) => e.template), meta: { EPISODES } });
for (const e of picked) if (!ok.includes(e.template)) throw new Error(`şablon yüklenemedi: ${e.template}`);
const LOCAL = path.join(OUT, `render/audit-${process.pid}.html`); // koşuya özel: paralel denetimler birbirini ezmesin
fs.mkdirSync(path.dirname(LOCAL), { recursive: true });
fs.writeFileSync(LOCAL, localDoc(page));

// bilerek yapılan durumlar (sınıf adı, gerekçeleriyle): engine.js E.AUDIT_SKIP

let total = 0;
for (const eng of engines) {
  const pw = playwright();
  const b = eng === "webkit" ? await pw.webkit.launch() : await pw.chromium.launch({ executablePath: CHROME });
  const pg = await b.newPage({ viewport: { width: 1200, height: 1000 } });
  await pg.goto(`file://${LOCAL}`);
  await pg.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const ids = picked.map((e) => e.id);
  for (const id of ids) {
    const res = await pg.evaluate((id) => {
      const d = document.createElement("div");
      d.style.cssText = "position:fixed;left:0;top:0;width:540px;height:960px;z-index:999";
      document.body.appendChild(d);
      try {
        return E.audit(d, E.mount(d, E.EPISODES[id].template, E.EPISODES[id].data));
      } catch (e) {
        return [`KURULAMADI ${e.message}`];
      } finally {
        d.remove();
      }
    }, id);
    total += res.length;
    console.log(`${res.length ? "✗" : "✓"} ${eng.padEnd(8)} ${id}${res.length ? "" : ""}`);
    res.forEach((l) => console.log(`    ${l}`));
  }
  await b.close();
}
fs.rmSync(LOCAL, { force: true });
console.log(total ? `\n${total} sorun` : "\nsorun yok");
process.exitCode = total ? 1 : 0;
