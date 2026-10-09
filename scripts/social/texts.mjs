#!/usr/bin/env node
/*
  Düzenlenebilirlik kapısı: her bölümün her karesinde görünen yazılar bölüm verisine ya da şablonun sabit
  yazılarına (E.register meta.ui) dayanıyor mu. Dayanmayan yazı web editöründe düzenlenemez (Samet, 2026-10-09:
  "videodaki tüm metinleri istisnasız düzenleyebilmeli").

  npm run social:texts [-- <bölüm-id | şablon> …]     verilmezse bütün bölümler

  Çıkış 1: düzenlenemeyen yazı. Çözüm: yazıyı şablonda meta.ui'ye taşı, X.ui(anahtar) ile oku.
*/
import fs from "node:fs";
import path from "node:path";
import { OUT, CHROME, playwright, buildPage, localDoc } from "./lib/page.mjs";
import { loadEpisodes } from "./lib/episodes.mjs";

const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const all = (await loadEpisodes()).episodes;
const picked = only.length ? all.filter((e) => only.includes(e.id) || only.includes(e.template)) : all;
const { clips } = await loadEpisodes(picked.map((e) => e.id));
const EPISODES = Object.fromEntries(picked.map((e) => [e.id, { template: e.template, data: e.data }]));
const { page } = buildPage("audit.html", { data: {}, clips, templates: picked.map((e) => e.template), meta: { EPISODES } });
const LOCAL = path.join(OUT, `render/texts-${process.pid}.html`);
fs.mkdirSync(path.dirname(LOCAL), { recursive: true });
fs.writeFileSync(LOCAL, localDoc(page));

const b = await playwright().chromium.launch({ executablePath: CHROME });
const pg = await b.newPage({ viewport: { width: 1200, height: 1000 } });
await pg.goto(`file://${LOCAL}`);
await pg.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
let total = 0;
for (const e of picked) {
  const bad = await pg.evaluate((id) => {
    const d = document.createElement("div");
    d.style.cssText = "position:fixed;left:0;top:0;width:540px;height:960px";
    document.body.appendChild(d);
    try {
      const ep = E.EPISODES[id];
      return E.untraced(d, E.mount(d, ep.template, ep.data), ep.data);
    } catch (err) {
      return [`KURULAMADI ${err.message}`];
    } finally {
      d.remove();
    }
  }, e.id);
  total += bad.length;
  console.log(`${bad.length ? "✗" : "✓"} ${e.id}${bad.length ? `  ${JSON.stringify(bad)}` : ""}`);
}
await b.close();
fs.rmSync(LOCAL, { force: true });
console.log(total ? `\n${total} düzenlenemeyen yazı` : "\nhepsi düzenlenebilir");
process.exitCode = total ? 1 : 0;
