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

// bilerek yapılan durumlar (sınıf adı): gerekçe yanında
const SKIP = {
  pad: ["sfx", "sx", "ok"], // satır içi ek vurgusu / daire içindeki onay işareti: dolgu kasıtlı dar
  clip: ["a"], // artikel açılırken genişliği 0'dan büyüyor: o sırada kırpılması kasıt
  box: ["blob", "glow", "paper"], // bulanık zemin ışıkları ve kırpılarak basılan fiş
};

let total = 0;
for (const eng of engines) {
  const pw = playwright();
  const b = eng === "webkit" ? await pw.webkit.launch() : await pw.chromium.launch({ executablePath: CHROME });
  const pg = await b.newPage({ viewport: { width: 1200, height: 1000 } });
  await pg.goto(`file://${LOCAL}`);
  await pg.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  const ids = picked.map((e) => e.id);
  for (const id of ids) {
    const res = await pg.evaluate(
      ([id, SKIP]) => {
        const d = document.createElement("div");
        d.style.cssText = "position:fixed;left:0;top:0;width:540px;height:960px;z-index:999";
        document.body.appendChild(d);
        let I;
        try {
          I = E.mount(d, E.EPISODES[id].template, E.EPISODES[id].data);
        } catch (e) {
          d.remove();
          return [`KURULAMADI ${e.message}`];
        }
        const sh = d.shadowRoot;
        const stage = sh.getElementById("stage");
        const scene = sh.getElementById("scene");
        const K = 0.5;
        const issues = {};
        const add = (k, t) => (issues[k] ||= []).push(+t.toFixed(1));
        const has = (el, list) => list.some((c) => el.classList?.contains(c));
        const anc = (el, list) => { for (let e = el; e && e !== scene; e = e.parentElement) if (has(e, list)) return true; return false; };
        const name = (el) => `${el.className && typeof el.className === "string" ? "." + el.className.split(" ").join(".") : el.tagName.toLowerCase()} «${(el.textContent || "").trim().slice(0, 28)}»`;
        const op = (el) => {
          let o = 1;
          for (let e = el; e && e !== scene; e = e.parentElement) {
            const cs = getComputedStyle(e);
            if (cs.display === "none" || cs.visibility === "hidden") return 0;
            o *= +cs.opacity;
          }
          return o;
        };
        const hasText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        const bg = (cs) => cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none";
        const els = [...scene.querySelectorAll("*")].filter((e) => !e.closest("svg"));
        const sr = stage.getBoundingClientRect();
        const S = (r) => ({ l: (r.left - sr.left) / K, t: (r.top - sr.top) / K, r: (r.right - sr.left) / K, b: (r.bottom - sr.top) / K });
        for (let t = 0; t <= I.plan.duration; t += 0.2) {
          I.render(t);
          const vis = [];
          for (const el of els) {
            if (op(el) < 0.9) continue;
            const r = el.getBoundingClientRect();
            if (r.width < 2 || r.height < 2) continue;
            const txt = hasText(el);
            let rr = r;
            if (txt) {
              const rg = document.createRange();
              let u = null;
              for (const n of el.childNodes)
                if (n.nodeType === 3 && n.textContent.trim()) {
                  rg.selectNodeContents(n);
                  for (const q of rg.getClientRects()) u = u ? { left: Math.min(u.left, q.left), top: Math.min(u.top, q.top), right: Math.max(u.right, q.right), bottom: Math.max(u.bottom, q.bottom) } : { left: q.left, top: q.top, right: q.right, bottom: q.bottom };
                }
              if (u) rr = u;
            }
            const R = S(rr);
            if (txt) { const hh = R.b - R.t; R.t += hh * 0.14; R.b -= hh * 0.14; } // satır kutusu → harf yüksekliğine yakın
            // taşması gizlenen ya da kırpılan (clip-path) atanın dışında kalan metin görünmez
            let hidden = false;
            for (let e = el.parentElement; e && e !== scene; e = e.parentElement) {
              const ce = getComputedStyle(e);
              if (ce.overflow === "hidden" || ce.clipPath !== "none") {
                const q = e.getBoundingClientRect();
                const m = ce.clipPath.match(/inset\(([\d.]+)px\s+([\d.]+)px\s+([\d.]+)px/);
                const bottom = m ? q.bottom - +m[3] * K : q.bottom;
                if (rr.bottom < q.top + 2 || rr.top > bottom - 2) hidden = true;
              }
            }
            if (hidden) continue;
            const cs = getComputedStyle(el);
            if (!txt && bg(cs) && R.b > 1540 && R.t < 1500 && R.r - R.l < 1000 && !anc(el, SKIP.box)) add(`KUTU ALTTAN TAŞIYOR ${name(el)} [alt ${R.b | 0}]`, t);
            if (!txt) continue;
            for (let e = el.parentElement; e && e !== scene; e = e.parentElement) {
              const ce = getComputedStyle(e);
              if (!bg(ce)) continue;
              const Q = S(e.getBoundingClientRect());
              if (Q.r - Q.l > 1000 || anc(e, SKIP.box)) break;
              const pad = Math.min(R.l - Q.l, Q.r - R.r, R.t - Q.t, Q.b - R.b);
              if (pad < 6) add(`KUTUDAN TAŞIYOR ${name(el)} ⊄ ${name(e).slice(0, 30)} (pay ${pad | 0})`, t);
              break;
            }
            if (R.r > 934 || R.l < 90 || R.b > 1535 || R.t < 180) add(`GÜVENLİ ALAN DIŞI ${name(el)} [${Math.round(R.l / 10) * 10},${Math.round(R.t / 10) * 10},${Math.round(R.r / 10) * 10},${Math.round(R.b / 10) * 10}]`, t);
            if (el.scrollWidth > el.clientWidth + 2 && cs.overflow !== "visible" && !has(el, SKIP.clip)) add(`KESİLİYOR ${name(el)}`, t);
            if (bg(cs) && el.clientWidth > 60 && !has(el, SKIP.pad)) {
              const pl = (rr.left - r.left) / K, pr = (r.right - rr.right) / K, pt = (rr.top - r.top) / K, pb = (r.bottom - rr.bottom) / K;
              if (Math.min(pl, pr) < 18 && cs.textAlign !== "center") add(`DOLGU AZ (yatay ${pl | 0}/${pr | 0}) ${name(el)}`, t);
              if (Math.min(pt, pb) < 6) add(`DOLGU AZ (dikey ${pt | 0}/${pb | 0}) ${name(el)}`, t);
            }
            vis.push({ el, R });
          }
          for (let i = 0; i < vis.length; i++)
            for (let j = i + 1; j < vis.length; j++) {
              const a = vis[i], c = vis[j];
              if (a.el.contains(c.el) || c.el.contains(a.el) || a.el.textContent.trim() === c.el.textContent.trim()) continue;
              const ox = Math.min(a.R.r, c.R.r) - Math.max(a.R.l, c.R.l);
              const oy = Math.min(a.R.b, c.R.b) - Math.max(a.R.t, c.R.t);
              if (ox > 6 && oy > 6) add(`ÇAKIŞMA ${name(a.el)} ⟷ ${name(c.el)}`, t);
            }
        }
        d.remove();
        for (const k of Object.keys(issues)) if (issues[k].length < 3) delete issues[k];
        return Object.entries(issues).map(([k, ts]) => `${k}  @ ${ts[0]}–${ts[ts.length - 1]} sn`);
      },
      [id, SKIP],
    );
    total += res.length;
    console.log(`${res.length ? "✗" : "✓"} ${eng.padEnd(8)} ${id}${res.length ? "" : ""}`);
    res.forEach((l) => console.log(`    ${l}`));
  }
  await b.close();
}
fs.rmSync(LOCAL, { force: true });
console.log(total ? `\n${total} sorun` : "\nsorun yok");
process.exitCode = total ? 1 : 0;
