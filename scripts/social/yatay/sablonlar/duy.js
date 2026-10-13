/*
  HANGİSİNİ DUYDUN? (Gece). Kısa video serisinin uzun hâli: turlar ses farkına göre (tek ünsüz, e/i, a/e/ä, uzun/kısa,
  umlaut). Her çiftte iki kelime (aynı tür, aynı artikel; artikel cevabı ele vermesin), Defne birini iki kez söyler,
  3 sn düşünme, cevap; turun sonunda çiftler yan yana (önce A, sonra B). Sesler Defne'nin kelime kayıtları.
  Veri (data/social/yatay/duy-NNN.mjs):
    series, ep, hook{lab, lines[2], sub, say, demo[2]}, how{lab, title, steps[[ad, alt]×3], say},
    rounds[{name, sub, say, pairs[{a{w, tr}, b{w, tr}, play}]}], compare{say}, score{lab, title, sub, say},
    app{lab, title, body, where, link, say, panel{w, tr, ok}}, end{…}, cover{lines[2], pill}, ui{…}
*/
(() => {
  const { el, esc, set, fit, scn, COL, SPAN, P, out3, inC, outExpo, spring, lerp, ICONS, artOf, stem, diffParts } = Y;
  const UI = {
    round: "Tur {i} / {n}",
    pair: "{r} · çift {i} / {n}",
    listen: "Dinle",
    again: "Bir kez daha",
    which: "Hangisi? A mı, B mi?",
    right: "Doğrusu {x}: {w} · bildiysen +1",
    compare: "Yan yana · önce A, sonra B",
    chapRules: "Kurallar",
    chapScore: "Puan",
    chapApp: "Uygulamada söyle",
    chapEnd: "Son",
    cardNote: "Tasarlanmış sahne · ekran kaydı değil",
  };
  const u = (d, k, vars = {}) => String((d.ui && d.ui[k]) ?? UI[k]).replace(/\{(\w+)\}/g, (m, x) => (vars[x] != null ? vars[x] : m));

  /** Kulaklık kadranı: çalarken çizgiler dalgalanır, düşünürken yay geri sayar, sonunda doğru harf. */
  const dialHTML = (dd) => {
    const ticks = Array.from({ length: 64 }, (_, i) => {
      const a = (i / 64) * Math.PI * 2;
      return `<line x1="${(120 + Math.cos(a) * 92).toFixed(1)}" y1="${(120 + Math.sin(a) * 92).toFixed(1)}" x2="${(120 + Math.cos(a) * 104).toFixed(1)}" y2="${(120 + Math.sin(a) * 104).toFixed(1)}" data-a="${a.toFixed(4)}"/>`;
    }).join("");
    return `<div class="dial" style="position:relative;width:${dd}px;height:${dd}px"><svg viewBox="0 0 240 240" style="position:absolute;inset:0;width:100%;height:100%;overflow:visible"><g class="tk" stroke="rgba(255,255,255,.26)" stroke-width="2.5" stroke-linecap="round">${ticks}</g><circle class="arc" cx="120" cy="120" r="112" fill="none" stroke="var(--acc)" stroke-width="5" stroke-linecap="round" transform="rotate(-90 120 120)" stroke-dasharray="703.7" stroke-dashoffset="703.7"/></svg><div class="core" style="position:absolute;inset:${dd * 0.2}px;border-radius:50%;background:#1f1f23;box-shadow:0 0 0 2px rgba(255,255,255,.1),0 30px 60px -20px rgba(0,0,0,.8);display:grid;place-items:center;color:#fff"><span class="ico" style="width:${dd * 0.26}px;height:${dd * 0.26}px;display:block">${ICONS.hp}</span><span class="lt dsp" style="position:absolute;font-size:${dd * 0.3}px;opacity:0">A</span></div></div>`;
  };
  const animDial = (dl, t, { lvl = 0, k = 0, rv = 0, letter = "" }) => {
    dl.querySelectorAll(".tk line").forEach((ln, i) => {
      const a = +ln.dataset.a;
      const L = 104 + lvl * (6 + Math.abs(Math.sin(i * 1.7 + t * 4.2) * Math.cos(i * 0.45 - t * 2.3)) * 20);
      ln.setAttribute("x2", (120 + Math.cos(a) * L).toFixed(1));
      ln.setAttribute("y2", (120 + Math.sin(a) * L).toFixed(1));
    });
    const m = Math.min(1, lvl * 1.5);
    dl.querySelector(".tk").setAttribute("stroke", `rgba(${Math.round(lerp(255, 239, m))},${Math.round(lerp(255, 160, m))},${Math.round(lerp(255, 100, m))},${(0.26 + 0.5 * m).toFixed(2)})`);
    dl.querySelector(".arc").style.strokeDashoffset = (703.7 * (1 - k)).toFixed(1);
    const lt = dl.querySelector(".lt");
    if (lt.textContent !== letter) lt.textContent = letter;
    lt.style.opacity = rv.toFixed(3);
    lt.style.transform = `scale(${(0.7 + 0.3 * spring(rv)).toFixed(3)})`;
    dl.querySelector(".ico").style.opacity = (1 - rv).toFixed(3);
    const core = dl.querySelector(".core");
    core.style.background = `rgba(${Math.round(lerp(31, 44, rv))},${Math.round(lerp(31, 92, rv))},${Math.round(lerp(35, 70, rv))},1)`;
    core.style.boxShadow = `0 0 0 2px ${rv > 0 ? "rgba(79,185,133,.5)" : "rgba(255,255,255,.08)"}, 0 24px 48px -24px rgba(0,0,0,.7)`;
  };
  const wordHTML = (label, html) => {
    const art = artOf(label);
    return `${art ? `<div class="art-${art}" style="font-size:44px;font-weight:700;margin-bottom:4px">${art}</div>` : ""}<div class="dsp d2 ww">${html}</div>`;
  };

  Y.register("duy", { title: "Hangisini Duydun?", theme: "gece", series: "Hangisini Duydun?", ui: UI }, (X, d) => {
    const total = d.rounds.reduce((s, r) => s + r.pairs.length, 0);
    // ---- kanca: büyük soru + örnek çift ve kadran
    X.chap(0, u(d, "chapRules"));
    const hookEnd = Math.max(6.4, X.say(0.4, d.hook.say) + 0.6);
    {
      const S = scn(X, 0, hookEnd);
      const Wc = S.rg(0, 12, { align: "center" });
      S.add(el(Wc, "lab", esc(d.hook.lab)), 0);
      const t1 = S.add(el(Wc, "dsp d1", esc(d.hook.lines[0]), "margin-top:28px"), 0.06);
      S.add(el(Wc, "dsp t2 acc", esc(d.hook.lines[1]), "margin-top:16px"), 0.16);
      X.L.push(() => fit(t1, SPAN(12), 96));
      const row = S.add(el(Wc, "row", "", "margin-top:56px;gap:0;align-items:center"), 0.26, { dy: 20 });
      const [da, db] = diffParts(stem(d.hook.demo[0]), stem(d.hook.demo[1]));
      el(row, "card", `<span class="dsp d2">${da}</span>`, "width:480px;height:240px;display:grid;place-items:center");
      el(row, "", dialHTML(220), "margin:0 -32px;position:relative;z-index:2");
      el(row, "card", `<span class="dsp d2">${db}</span>`, "width:480px;height:240px;display:grid;place-items:center");
      const dl = row.querySelector(".dial");
      S.on((tt) => animDial(dl, tt, { lvl: 0.35 + 0.25 * Math.abs(Math.sin(tt * 1.3)) }));
    }
    // ---- kurallar: üç adım
    let t = hookEnd;
    {
      const a = t;
      const end = X.say(a + 0.4, d.how.say);
      const b = Math.max(a + 6, end + 0.6);
      const S = scn(X, a, b);
      const Wc = S.rg(0, 12);
      S.add(el(Wc, "lab", esc(d.how.lab)), 0);
      const tt = S.add(el(Wc, "dsp t2", esc(d.how.title), "margin-top:20px"), 0.06);
      X.L.push(() => fit(tt, SPAN(12), 48));
      const row = el(Wc, "row", "", "margin-top:40px;gap:32px;align-items:stretch");
      const icons = [ICONS.hp, ICONS.check, ICONS.bell];
      const cards = d.how.steps.map((s, i) =>
        S.add(el(row, "card", `<div class="row" style="gap:20px"><span style="flex:none;width:72px;height:72px;border-radius:36px;display:grid;place-items:center;background:var(--sf2);color:var(--acc)"><span class="ic" style="width:36px;height:36px">${icons[i]}</span></span><span class="mono" style="font-size:24px;letter-spacing:.14em;color:var(--sub)">0${i + 1}</span></div><div class="dsp t3 wr" style="margin-top:36px">${esc(s[0])}</div><div class="b2" style="margin-top:14px">${esc(s[1])}</div>`, `width:${SPAN(4)}px;padding:40px 44px;min-height:360px`), 0.12 + i * 0.1, { dy: 28 }),
      );
      const span = (end - a - 0.4) / 3;
      S.on((t2) => cards.forEach((c, i) => (c.style.boxShadow = t2 >= a + 0.4 + i * span ? "var(--sh), inset 0 0 0 2px var(--accLine)" : "var(--sh)")));
      t = b;
    }

    // ---- turlar
    let n = 0;
    d.rounds.forEach((r, ri) => {
      X.chap(t, `${u(d, "round", { i: ri + 1, n: d.rounds.length })}: ${r.name}`);
      X.sfx(t + 0.1, "chap");
      // tur kartı: ortada ad, altında turların sırası
      {
        const a = t;
        const b = Math.max(a + 3.2, X.say(a + 0.6, r.say) + 0.5);
        const S = scn(X, a, b);
        const Wc = S.rg(0, 12, { align: "center" });
        S.add(el(Wc, "lab", esc(u(d, "round", { i: ri + 1, n: d.rounds.length }))), 0);
        const nm = S.add(el(Wc, "dsp d1", esc(r.name), "margin-top:24px"), 0.06);
        X.L.push(() => fit(nm, SPAN(12), 80));
        S.add(el(Wc, "b1 muted", esc(r.sub), "margin-top:20px"), 0.14);
        S.add(el(Wc, "row", d.rounds.map((x, j) => `${j ? `<span style="width:72px;height:2px;background:${j <= ri ? "var(--accLine)" : "var(--ln)"}"></span>` : ""}<span class="pill ${j === ri ? "" : "out"}" style="${j < ri ? "color:var(--sub)" : ""};height:56px;font-size:26px;padding:0 22px">${j < ri ? `<span class="ic" style="width:24px;height:24px">${ICONS.check}</span>` : ""}${esc(x.name)}</span>`).join(""), "margin-top:56px"), 0.22);
        t = b + 0.2;
      }
      // çiftler: kartlar ve kadran yerinde, kelimeler söner/gelir
      const items = r.pairs.map((p) => {
        n++;
        const a = t;
        const key = p.play === 1 ? p.b.w : p.a.w;
        const s1 = a + 0.9;
        const e1 = X.say(s1, key, { sub: false });
        const s2 = e1 + 0.8;
        const e2 = X.say(s2, key, { sub: false });
        const c = e2 + 0.3;
        for (let s = 0; s < 3; s++) X.sfx(c + s, "tick");
        const rv = c + 3;
        X.sfx(rv, "ok");
        const end = rv + 2.6;
        t = end + 0.1;
        return { p, a, s1, e1, s2, e2, c, rv, end, n };
      });
      {
        const S = scn(X, items[0].a, items[items.length - 1].end);
        const CH = 440;
        const CY = X.MID - CH / 2 + 8;
        const head = S.add(el(S.root, "abs", "", `left:${COL(0)}px;width:${SPAN(12)}px;top:${X.TOP}px;display:flex;flex-direction:column;align-items:center`), 0);
        const hl = el(head, "lab", "");
        const dots = el(head, "row", "<i></i>".repeat(total), "margin-top:20px;gap:10px");
        [...dots.children].forEach((x) => (x.style.cssText = `width:${Math.max(14, Math.min(32, Math.floor(1500 / total) - 10))}px;height:8px;border-radius:4px;background:var(--ln)`));
        const mk = (ch) => el(S.root, "card abs", `<span class="abs mono" style="left:32px;top:32px;width:56px;height:56px;border-radius:28px;display:grid;place-items:center;font-size:26px;background:var(--sf2);color:var(--sub)">${ch}</span><div class="w" style="text-align:center"></div><div class="tr" style="position:absolute;left:0;right:0;bottom:40px;text-align:center;font-size:38px;font-weight:500;color:var(--sub)"></div>`, `left:${COL(ch === "A" ? 0 : 7)}px;top:${CY}px;width:${SPAN(5)}px;height:${CH}px;display:grid;place-items:center`);
        const cA = S.add(mk("A"), 0.1, { dx: -60, dy: 0 });
        const cB = S.add(mk("B"), 0.1, { dx: 60, dy: 0 });
        const dlw = S.add(el(S.root, "abs", dialHTML(256), `left:${960 - 128}px;top:${CY + CH / 2 - 128}px;z-index:2`), 0.2, { s0: 0.85, dy: 0 });
        const dl = dlw.querySelector(".dial");
        const status = S.add(el(S.root, "abs row", "", `left:${COL(0)}px;width:${SPAN(12)}px;top:${CY + CH + 32}px;justify-content:center`), 0.3);
        S.on((tt) => {
          const it = items.find((x) => tt >= x.a && tt < x.end) || (tt < items[0].a ? items[0] : items[items.length - 1]);
          const okA = it.p.play !== 1;
          if (S.root.dataset.k !== String(it.n)) {
            S.root.dataset.k = String(it.n);
            hl.textContent = u(d, "pair", { r: r.name, i: it.n, n: total });
            const [da, db] = diffParts(stem(it.p.a.w.t), stem(it.p.b.w.t));
            [[cA, it.p.a, da], [cB, it.p.b, db]].forEach(([c, w, html]) => {
              const wEl = c.querySelector(".w");
              wEl.innerHTML = wordHTML(w.w.t, html);
              fit(wEl.querySelector(".ww"), SPAN(5) - 96, 64);
              c.querySelector(".tr").textContent = w.tr;
            });
          }
          const rev = tt >= it.rv;
          const kr = rev ? outExpo(P(tt, it.rv, 0.7)) : 0;
          const kin = outExpo(P(tt, it.a, 0.8));
          const kout = it !== items[items.length - 1] ? inC(P(tt, it.end - 0.3, 0.3)) : 0;
          [[cA, okA], [cB, !okA]].forEach(([c, ok]) => {
            c.style.boxShadow = ok && kr > 0 ? `0 0 0 ${(3 * kr).toFixed(1)}px var(--ok), 0 0 70px -28px rgba(79,185,133,${(0.4 * kr).toFixed(2)}), var(--sh)` : "";
            c.style.opacity = (+c.style.opacity * (!ok ? lerp(1, 0.4, kr) : 1)).toFixed(3);
            set(c.querySelector(".w"), { o: Math.min(out3(Math.min(1, kin * 2)), 1 - kout), y: (1 - kin) * 16 - kout * 10, s: ok ? 1 + 0.03 * Math.sin(Math.PI * P(tt, it.rv, 0.5)) : 1 });
            set(c.querySelector(".tr"), { o: Math.min(kr, 1 - kout), y: (1 - kr) * 10 });
          });
          [...dots.children].forEach((x, i) => (x.style.background = i + 1 < it.n || (i + 1 === it.n && rev) ? "var(--accLine)" : i + 1 === it.n ? "rgba(255,255,255,.5)" : "var(--ln)"));
          const playing = (tt >= it.s1 && tt < it.e1) || (tt >= it.s2 && tt < it.e2);
          animDial(dl, tt, { lvl: X.level(tt), k: tt >= it.c && !rev ? P(tt, it.c, it.rv - it.c) : 0, rv: kr * (1 - kout), letter: okA ? "A" : "B" });
          const word = stem((okA ? it.p.a : it.p.b).w.t);
          const st = rev
            ? `<span class="pill ok" style="height:72px;font-size:34px"><span class="ic" style="width:32px;height:32px">${ICONS.check}</span>${esc(u(d, "right", { x: okA ? "A" : "B", w: word }))}</span>`
            : tt >= it.c
              ? `<span class="pill out" style="height:72px;font-size:34px">${esc(u(d, "which"))} ${Math.max(1, Math.ceil(it.rv - tt))}</span>`
              : `<span class="pill ${playing ? "" : "out"}" style="height:72px;font-size:34px"><span class="ic" style="width:30px;height:30px">${ICONS.hp}</span>${esc(tt >= it.s2 - 0.3 ? u(d, "again") : u(d, "listen"))}</span>`;
          if (status.dataset.k !== st) {
            status.dataset.k = st;
            status.innerHTML = st;
          }
        });
      }
      // turun çiftleri yan yana: önce A, sonra B
      {
        const a = t + 0.2;
        let x = X.say(a + 0.4, d.compare.say) + 0.3;
        const rows = r.pairs.map((p) => {
          const r0 = x;
          const r1 = X.say(r0, p.a.w, { sub: false }) + 0.3;
          x = X.say(r1, p.b.w, { sub: false }) + 0.6;
          return { r0, r1, r2: x };
        });
        const b = x + 0.3;
        const S = scn(X, a, b);
        const Wr = S.rg(0, 12);
        S.add(el(Wr, "row", `<span class="lab">${esc(r.name)}</span><span class="cap" style="margin-left:auto">${esc(u(d, "compare"))}</span>`), 0);
        const per = Math.ceil(r.pairs.length / 2);
        const rh = Math.min(116, Math.floor(560 / per));
        const grid = S.add(el(Wr, "", "", "margin-top:28px;display:grid;grid-template-columns:1fr 1fr;column-gap:32px"), 0.08, { dy: 20 });
        const cells = r.pairs.map((p, i) => {
          const [da, db] = diffParts(stem(p.a.w.t), stem(p.b.w.t));
          return el(grid, "row", `<span class="dsp ca" style="font-size:${Math.round(rh * 0.42)}px;flex:1;min-width:0">${da}</span><span class="mono" style="font-size:22px;color:var(--sub);margin:0 20px">·</span><span class="dsp cb" style="font-size:${Math.round(rh * 0.42)}px;flex:1;min-width:0;text-align:right">${db}</span>`, `height:${rh}px;padding:0 32px;border-radius:24px;grid-row:${(i % per) + 1};grid-column:${i < per ? 1 : 2}`);
        });
        X.L.push(() => cells.forEach((c) => {
          fit(c.querySelector(".ca"), (c.clientWidth - 64) / 2 - 30, 28);
          fit(c.querySelector(".cb"), (c.clientWidth - 64) / 2 - 30, 28);
        }));
        S.on((tt) => cells.forEach((c, i) => {
          const q = rows[i];
          const on = tt >= q.r0 && tt < q.r2;
          c.style.opacity = tt >= q.r0 ? 1 : 0.3;
          c.style.background = on ? "var(--sf2)" : "transparent";
          c.style.boxShadow = on ? "inset 6px 0 0 var(--acc)" : "none";
          c.querySelector(".ca").style.color = on && tt < q.r1 ? "var(--acc)" : "";
          c.querySelector(".cb").style.color = on && tt >= q.r1 ? "var(--acc)" : "";
        }));
        t = b + 0.2;
      }
    });

    // ---- puan
    X.chap(t, u(d, "chapScore"));
    {
      const a = t;
      const b = Math.max(a + 10.5, X.say(a + 0.5, d.score.say) + 1);
      const S = scn(X, a, b);
      const Wc = S.rg(0, 12, { align: "center" });
      S.add(el(Wc, "lab", esc(d.score.lab)), 0);
      const tt = S.add(el(Wc, "dsp d1", esc(d.score.title), "margin-top:24px"), 0.06);
      X.L.push(() => fit(tt, SPAN(12), 80));
      S.add(el(Wc, "b1 muted", esc(d.score.sub), "margin-top:24px"), 0.14);
      S.add(el(Wc, "row", d.rounds.map((x) => `<span class="pill out" style="height:56px;font-size:26px;padding:0 22px">${esc(x.name)} · ${x.pairs.length}</span>`).join(""), "margin-top:48px;gap:16px;flex-wrap:wrap;justify-content:center"), 0.22);
      t = b;
    }

    // ---- uygulama ve son
    X.chap(t, u(d, "chapApp"));
    const pn = d.app.panel;
    const appEnd = Math.max(t + 10.5, X.say(t + 0.4, d.app.say) + 0.8);
    Y.appCard(X, t, appEnd, {
      ...d.app,
      panel: `<div class="lab plain">${esc(pn.lab)}</div><div class="dsp d2" style="margin-top:20px">${esc(pn.w)}</div><div class="b2" style="margin-top:8px">${esc(pn.tr)}</div><div style="margin-top:32px;height:96px;display:flex;align-items:center"><div class="wave">${Array.from({ length: 34 }, (_, i) => `<i style="height:${16 + Math.abs(Math.cos(i * 1.1) * Math.sin(i * 0.37)) * 70}px"></i>`).join("")}</div></div><div class="row" style="margin-top:28px;gap:16px"><span class="pill ok"><span class="ic" style="width:30px;height:30px">${ICONS.check}</span>${esc(pn.ok)}</span></div>`,
      note: u(d, "cardNote"),
    });
    t = appEnd + 0.2;
    X.chap(t, u(d, "chapEnd"));
    X.say(t + 0.4, d.end.say);
    Y.endScreen(X, t, t + Y.END_LEN, d.end);

    // ---- kapak
    const [ca, cb] = diffParts(stem(d.hook.demo[0]), stem(d.hook.demo[1]));
    X.cover.innerHTML = `<div class="abs" style="inset:0;background:#141416"></div><div class="abs" style="inset:0;background:radial-gradient(900px 600px at 72% 50%,rgba(251,143,42,.22),transparent 70%)"></div>
      <div class="abs dsp cl" style="left:104px;top:150px;font-size:210px;line-height:.92;color:#f6f6f4">${esc(d.cover.lines[0])}<br>${esc(d.cover.lines[1])}</div>
      <div class="abs dsp" style="left:112px;top:640px;font-size:96px;color:#fb8f2a">${esc(d.cover.pill)}</div>
      <div class="abs row" style="left:1008px;top:400px;width:800px;align-items:center"><div class="card" style="width:340px;height:260px;display:grid;place-items:center;background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.12);border-radius:40px;color:#f6f6f4"><span class="dsp cw" style="font-size:110px">${ca.replace('class="acc"', 'style="color:#fb8f2a"')}</span></div><div style="margin:0 -40px;position:relative;z-index:2">${dialHTML(200)}</div><div class="card" style="width:340px;height:260px;display:grid;place-items:center;background:rgba(255,255,255,.07);border-radius:40px;box-shadow:0 0 0 4px #4fb985,0 0 80px -24px rgba(79,185,133,.45);color:#f6f6f4"><span class="dsp cw" style="font-size:110px">${cb.replace('class="acc"', 'style="color:#fb8f2a"')}</span></div></div>
      ${Y.sig("left:112px;top:880px;background:rgba(255,255,255,.09);color:#fff")}`;
    X.L.push(() => {
      X.cv.classList.add("show-cover");
      X.cover.querySelectorAll(".cw").forEach((e) => fit(e, 280, 56));
      fit(X.cover.querySelector(".cl"), 860, 120);
      X.cv.classList.remove("show-cover");
    });
    return t + Y.END_LEN;
  });
})();
