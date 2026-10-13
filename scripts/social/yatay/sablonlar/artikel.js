/*
  ARTİKEL KURALLARI (Kâğıt). Kelimenin sonundan artikel: her kural Lernomi sözlüğünden sayılarla (sayım ızgarasında
  her nokta sözlükteki bir kelime), dört örnek (önce boşluk, sonra artikel ve Defne'nin kaydı), istisnalar. Kurallar
  gruplar hâlinde (die kesin, die eğilim, das, der), bir tuzak sahnesi, sonda hız turu. Sayılar bölüm dosyasında
  H.stats ile sözlükten hesaplanır ve anlatımdaki sayıyla denetlenir. Veri (data/social/yatay/artikel-NNN.mjs):
    series, ep, hook{lab, lines[2], sub, say, card{suf, word, tr, hit, all, art}}, groups[{title, sub, say,
    rules[{suf, say, stats{art, hit, all, exceptions}, examples[H.art]}]}], trap{after, lab, title, say, rule, words[H.art]},
    compound{title, lab, sub, say, items[{first?, last, whole}]} (bileşik isimde artikeli son kelime belirler),
    speed{title, sub, say, words[H.art]}, app{…, panel{rows[[art, word, tr]], next, note}}, end{…}, cover{line}, ui{…}
*/
(() => {
  const { el, esc, set, fit, scn, SPAN, P, out3, outExpo, spring, artOf, stem } = Y;
  const UI = {
    rule: "Kural {i} / {n}",
    dict: "/ {n} kelime · Lernomi sözlüğünde",
    fromDict: "Sözlükten",
    examples: "{n} örnek",
    exceptions: "İstisna",
    none: "İstisna yok",
    blank: "___",
    trapLab: "Tuzak",
    speedLab: "Hız turu · 2 saniye",
    dictHead: "LERNOMİ SÖZLÜĞÜ",
    chapHook: "Ezber yerine kelimenin sonu",
    chapSpeed: "Hız turu",
    chapApp: "Uygulamada artikel",
    chapEnd: "Son",
    cardNote: "Tasarlanmış sahne · ekran kaydı değil",
  };
  const u = (d, k, vars = {}) => String((d.ui && d.ui[k]) ?? UI[k]).replace(/\{(\w+)\}/g, (m, x) => (vars[x] != null ? vars[x] : m));
  /** Kelimenin sonu (kuraldaki eklerden hangisiyse) artikel renginde, altı çizili. */
  const sufHTML = (word, sufs, art) => {
    const s = sufs.find((x) => word.toLowerCase().endsWith(x)) || "";
    return `${esc(word.slice(0, word.length - s.length))}<span class="art-${art}" style="text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:10px">${esc(word.slice(word.length - s.length))}</span>`;
  };

  Y.register("artikel", { title: "Artikel Kuralları", theme: "kagit", series: "Artikel Kuralları", ui: UI }, (X, d) => {
    const rules = d.groups.flatMap((g) => g.rules);
    // ---- kanca: solda söz, sağda sözlük kartı
    X.chap(0, u(d, "chapHook"));
    const hookEnd = Math.max(6.4, X.say(0.4, d.hook.say) + 0.6);
    {
      const S = scn(X, 0, hookEnd);
      const L = S.rg(0, 7);
      S.add(el(L, "lab", esc(d.hook.lab)), 0);
      S.add(el(L, "dsp d1", `<span class="art-der">der</span> <span class="art-die">die</span> <span class="art-das">das</span>`, "margin-top:32px"), 0.06);
      d.hook.lines.forEach((x, i) => S.add(el(L, `dsp t1${i ? " acc" : ""}`, esc(x), `margin-top:${i ? 8 : 24}px`), 0.14 + i * 0.06));
      S.add(el(L, "b1 muted", esc(d.hook.sub), "margin-top:36px"), 0.28);
      const c = d.hook.card;
      const R = S.rg(7, 5);
      S.add(el(R, "card", `<div class="row mono" style="justify-content:space-between;font-size:22px;letter-spacing:.14em;color:var(--sub)"><span>${esc(u(d, "dictHead"))}</span><span>${esc(stem(c.word)[0])}</span></div><div style="height:2px;background:var(--ink);opacity:.7;margin:18px 0 40px"></div><div style="font-size:52px;font-weight:700" class="art-${c.art}">${c.art}</div><div class="dsp t1" style="margin-top:8px">${sufHTML(stem(c.word), [c.suf], c.art)}</div><div class="mono" style="font-size:26px;color:var(--sub);margin-top:20px">${esc(c.tr)}</div><div style="border-top:3px dotted var(--ln);margin:40px 0 32px"></div><div class="row" style="align-items:baseline;gap:20px"><span class="dsp t2 art-${c.art}">${c.hit}</span><span class="b2">/ ${c.all} · -${esc(c.suf)} → ${c.art}</span></div>`, "padding:48px 56px"), 0.12, { r: 2, dy: 24 });
    }
    let t = hookEnd;
    let ri = 0;
    d.groups.forEach((g, gi) => {
      // grup kartı
      X.chap(t, g.title);
      X.sfx(t + 0.1, "chap");
      const cEnd = Math.max(t + 3.4, X.say(t + 0.6, g.say) + 0.5);
      Y.chapterCard(X, t, cEnd, { idx: gi, title: g.title, sub: g.sub, agenda: d.groups.map((x) => [x.title, `${x.rules.length}`]), label: `${gi + 1} / ${d.groups.length}` });
      t = cEnd + 0.2;
      g.rules.forEach((r) => {
        ri++;
        const a = t;
        const st = r.stats;
        const sufs = r.suf.split("/").map((x) => x.trim().replace(/^-/, "").toLowerCase());
        const sEnd = X.say(a + 0.5, r.say);
        let x = sEnd + 0.3;
        const ex = r.examples.map((w) => {
          const s0 = x;
          const s1 = s0 + 1.1;
          x = X.say(s1, w.w, { sub: false }) + 0.6;
          return { w, s0, s1, e: x };
        });
        const end = Math.max(a + 8, x + 0.4);
        const S = scn(X, a, end);
        const L = S.rg(0, 5);
        S.add(el(L, "lab", esc(u(d, "rule", { i: ri, n: rules.length }))), 0);
        const suf = S.add(el(L, "dsp d1", esc(r.suf), "margin-top:20px"), 0.06);
        X.L.push(() => fit(suf, SPAN(5), 80));
        S.add(el(L, "row", `<span style="font-size:56px;font-weight:700;color:var(--sub)">→</span><span class="pill" style="background:var(--${st.art});height:84px;padding:0 40px;border-radius:42px;font-size:52px;color:#fff;box-shadow:none;margin-left:24px">${st.art}</span>`, "margin-top:20px"), 0.16);
        const cnt = S.add(el(L, "row", `<span class="dsp t2 art-${st.art} cnt" style="font-variant-numeric:tabular-nums">0</span><span class="b2" style="margin-left:20px;line-height:1.2">${esc(u(d, "dict", { n: st.all }))}</span>`, "margin-top:32px;align-items:center"), 0.26);
        const q = cnt.querySelector(".cnt");
        const GW = SPAN(5);
        const GH = 176;
        const pitch = Math.max(12, Math.min(64, Math.floor(Math.sqrt((GW * GH) / st.all))));
        const cols = Math.floor(GW / pitch);
        const sz = Math.max(7, pitch - Math.max(3, Math.round(pitch * 0.22)));
        const waffle = S.add(el(L, "", "", `margin-top:24px;display:grid;grid-template-columns:repeat(${cols},${sz}px);gap:${pitch - sz}px;height:${Math.ceil(st.all / cols) * pitch}px;align-content:start`), 0.3, { dy: 20 });
        const cells = Array.from({ length: st.all }, () => el(waffle, "", "", `width:${sz}px;height:${sz}px;border-radius:${Math.max(2, sz / 4)}px;background:var(--ln)`));
        const exc = S.add(el(L, "b2", st.exceptions.length ? `<b style="color:var(--ink)">${esc(u(d, "exceptions"))}:</b> ${esc(st.exceptions.slice(0, 4).join(", "))}${st.exceptions.length > 4 ? " …" : ""}` : esc(u(d, "none")), "margin-top:24px;font-size:30px"), 1.2);
        void exc;
        const R = S.rg(5, 7);
        const card = S.add(el(R, "card", `<div class="row mono" style="justify-content:space-between;font-size:22px;letter-spacing:.14em;color:var(--sub);padding:0 52px"><span>${esc(u(d, "fromDict").toUpperCase())}</span><span>${esc(u(d, "examples", { n: ex.length }))}</span></div>`, "padding:36px 0 12px;margin-left:32px"), 0.12, { dy: 20 });
        const rows = ex.map((q2, i) => el(card, "row", `<span class="ar dsp" style="width:140px;flex:none;font-size:56px"></span><span class="dsp ww" style="font-size:60px;flex:1;min-width:0">${sufHTML(stem(q2.w.w.t), sufs, st.art)}</span><span class="tr" style="font-size:28px;font-weight:500;color:var(--sub);flex:none;margin-left:16px">${esc(q2.w.tr)}</span>`, `height:${Math.min(116, Math.floor(480 / ex.length))}px;padding:0 52px;margin-top:${i ? 0 : 12}px;border-top:2px solid var(--ln)`));
        X.L.push(() => rows.forEach((rw) => fit(rw.querySelector(".ww"), SPAN(7) - 32 - 104 - 140 - rw.querySelector(".tr").offsetWidth - 16, 34)));
        S.on((tt) => {
          const fill = out3(P(tt, a + 0.8, Math.max(1.5, sEnd - a - 1)));
          const n = Math.round(fill * st.all);
          const hit = Math.min(n, st.hit);
          cells.forEach((c, i) => {
            const on = i < hit;
            const cls = on ? `bg-${st.art}` : "";
            if (c.className !== cls) c.className = cls;
            c.style.background = on ? "" : i < n ? "#b9aea3" : "var(--ln)";
            c.style.opacity = on ? ".82" : "1";
          });
          if (q.textContent !== String(hit)) q.textContent = hit;
          rows.forEach((rw, i) => {
            const e = ex[i];
            const on = tt >= e.s1;
            set(rw, { o: 0.22 + 0.78 * out3(P(tt, e.s0, 0.3)), x: (1 - spring(P(tt, e.s0, 0.6))) * 16 });
            const ar = rw.querySelector(".ar");
            const txt = on ? st.art : u(d, "blank");
            if (ar.textContent !== txt) {
              ar.textContent = txt;
              ar.className = `ar dsp ${on ? `art-${st.art}` : "muted"}`;
            }
            rw.style.background = tt >= e.s0 && tt < e.e ? "var(--sf2)" : "transparent";
          });
        });
        t = end + 0.2;
        // tuzak sahnesi (kuraldan hemen sonra)
        if (d.trap && d.trap.after === r.suf) {
          const ta = t;
          X.chap(ta, d.trap.title);
          let x2 = ta + 1;
          const ws = d.trap.words.map((w) => {
            const s0 = x2;
            x2 = X.say(s0 + 0.4, w.w, { sub: false }) + 1.0;
            return { w, s0 };
          });
          const sayAt = x2 + 0.2;
          const tb = Math.max(ta + 10, X.say(sayAt, d.trap.say) + 0.8);
          const S2 = scn(X, ta, tb);
          const Wt = S2.rg(0, 12);
          S2.add(el(Wt, "lab", esc(d.trap.lab)), 0);
          const row = el(Wt, "row", "", "margin-top:32px;gap:32px;align-items:stretch");
          const span = Math.floor(12 / ws.length);
          ws.forEach((q2) => {
            const art = artOf(q2.w.w.t);
            const word = stem(q2.w.w.t);
            S2.add(el(row, "card", `<div class="row" style="gap:24px;align-items:baseline"><s style="font-size:48px;font-weight:700;color:#c9a98f;text-decoration-thickness:6px">${esc(st.art)}</s><span style="font-size:48px;font-weight:700" class="art-${art}">${art}</span></div><div class="dsp t1 ww" style="margin-top:16px">${sufHTML(word, sufs, "das").replace("art-das", "acc")}</div><div style="font-size:32px;font-weight:600;color:var(--sub);margin-top:20px">${esc(q2.w.tr)}</div>`, `width:${SPAN(span)}px;padding:44px 48px`), q2.s0 - ta, { dy: 24 });
          });
          X.L.push(() => row.querySelectorAll(".ww").forEach((e) => fit(e, SPAN(span) - 96, 48)));
          S2.add(el(Wt, "card", `<span class="mono" style="font-size:22px;letter-spacing:.14em;color:var(--acc);box-shadow:inset 0 0 0 2px var(--accLine);border-radius:10px;padding:8px 14px;margin-right:28px">KURAL</span><span>${Y.md(d.trap.rule)}</span>`, "margin-top:32px;padding:32px 48px;font-size:38px;line-height:1.3;font-weight:500"), sayAt - ta);
          t = tb + 0.2;
        }
      });
    });

    // ---- bileşik isimler: artikeli son kelime belirler (ilk kelimenin artikeli önemsiz)
    if (d.compound) {
      const cp = d.compound;
      X.chap(t, cp.title);
      X.sfx(t + 0.1, "chap");
      const a = t;
      let x = X.say(a + 0.5, cp.say) + 0.4;
      const its = cp.items.map((it) => {
        const s0 = x;
        let y = s0 + 0.3;
        if (it.first) y = X.say(y, it.first.w, { sub: false }) + 0.35;
        const sl = y;
        y = X.say(y, it.last.w, { sub: false }) + 0.5;
        const sw = y;
        y = X.say(y, it.whole.w, { sub: false }) + 0.9;
        x = y;
        return { it, s0, sl, sw, e: y };
      });
      const b = x + 0.3;
      const S = scn(X, a, b);
      const W = S.rg(0, 12);
      S.add(el(W, "row", `<span class="lab">${esc(cp.lab)}</span><span class="cap" style="margin-left:auto">${esc(cp.sub)}</span>`), 0);
      const list = S.add(el(W, "card", "", "margin-top:28px;padding:8px 0"), 0.08, { dy: 20 });
      const rh = Math.min(84, Math.floor(540 / its.length));
      const piece = (q) => {
        const ar = artOf(q.w.t);
        return `<span class="art-${ar}" style="font-weight:700">${ar}</span> ${esc(stem(q.w.t))}`;
      };
      const rows = its.map(({ it }, i) => {
        const ar = artOf(it.whole.w.t);
        const whole = stem(it.whole.w.t);
        const lastStem = stem(it.last.w.t).toLowerCase();
        const cut = whole.toLowerCase().endsWith(lastStem) ? whole.length - lastStem.length : whole.length;
        return el(list, "row", `<span class="pa" style="flex:1.1;font-size:${Math.round(rh * 0.42)}px;color:var(--sub);white-space:nowrap">${it.first ? `${piece(it.first)} <span style="margin:0 10px">+</span>` : ""}${piece(it.last)}</span><span style="font-size:${Math.round(rh * 0.42)}px;color:var(--sub);margin:0 24px">=</span><span class="dsp pw" style="flex:1;font-size:${Math.round(rh * 0.56)}px;white-space:nowrap"><span class="art-${ar}">${ar}</span> ${esc(whole.slice(0, cut))}<span class="art-${ar}" style="text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:8px">${esc(whole.slice(cut))}</span></span><span class="tr" style="font-size:${Math.round(rh * 0.34)}px;color:var(--sub);flex:none;margin-left:16px">${esc(it.whole.tr)}</span>`, `height:${rh}px;padding:0 48px;${i ? "border-top:2px solid var(--ln)" : ""}`);
      });
      S.on((tt) => rows.forEach((rw, i) => {
        const q = its[i];
        const on = tt >= q.s0 && tt < q.e;
        rw.style.opacity = tt >= q.s0 ? 1 : 0.22;
        rw.style.background = on ? "var(--sf2)" : "transparent";
        rw.style.boxShadow = on ? "inset 6px 0 0 var(--acc)" : "none";
        set(rw.querySelector(".pw"), { o: tt >= q.sw ? out3(P(tt, q.sw, 0.35)) : 0, x: (1 - outExpo(P(tt, q.sw, 0.8))) * -16 });
        set(rw.querySelector(".tr"), { o: tt >= q.sw ? out3(P(tt, q.sw + 0.3, 0.4)) : 0 });
      }));
      t = b + 0.2;
    }

    // ---- hız turu: kelime artikelsiz gelir, 2 sn sonra artikel ve ses
    X.chap(t, u(d, "chapSpeed"));
    {
      const a = t;
      let x = X.say(a + 0.4, d.speed.say) + 0.4;
      const ws = d.speed.words.map((w) => {
        const s0 = x;
        const s1 = s0 + 2;
        x = X.say(s1, w.w, { sub: false }) + 0.5;
        return { w, s0, s1 };
      });
      const b = x + 0.4;
      const S = scn(X, a, b);
      const W = S.rg(0, 12);
      S.add(el(W, "row", `<span class="lab">${esc(u(d, "speedLab"))}</span><span class="cap" style="margin-left:auto">${esc(d.speed.sub)}</span>`), 0);
      const cols = ws.length > 16 ? 6 : 4;
      const big = cols === 4;
      const grid = S.add(el(W, "", "", `margin-top:28px;display:grid;grid-template-columns:repeat(${cols},1fr);gap:${big ? 20 : 16}px`), 0.08, { dy: 20 });
      const cells = ws.map((q2) => {
        const c = el(grid, "card", `<div class="ar" style="font-size:${big ? 34 : 28}px;font-weight:700;height:${big ? 42 : 34}px"></div><div class="dsp ww" style="font-size:${big ? 52 : 40}px">${esc(stem(q2.w.w.t))}</div>`, `padding:${big ? "22px 28px" : "16px 18px"};text-align:center`);
        return c;
      });
      X.L.push(() => cells.forEach((c) => fit(c.querySelector(".ww"), (SPAN(12) - (cols - 1) * (big ? 20 : 16)) / cols - (big ? 56 : 36), 24)));
      S.on((tt) => ws.forEach((q2, i) => {
        const c = cells[i];
        const on = tt >= q2.s0;
        const rv = tt >= q2.s1;
        const art = artOf(q2.w.w.t);
        c.style.opacity = on ? 1 : 0.25;
        c.style.boxShadow = on && tt < (ws[i + 1] ? ws[i + 1].s0 : b) ? "var(--sh), inset 0 0 0 2px var(--accLine)" : "var(--sh)";
        const ar = c.querySelector(".ar");
        const txt = rv ? art : on ? "?" : "";
        if (ar.textContent !== txt) {
          ar.textContent = txt;
          ar.className = `ar ${rv ? `art-${art}` : "muted"}`;
        }
        c.querySelector(".ww").className = `dsp ww${rv ? ` art-${art}` : ""}`;
      }));
      t = b + 0.2;
    }

    // ---- uygulama ve son
    X.chap(t, u(d, "chapApp"));
    const pn = d.app.panel;
    const appEnd = Math.max(t + 10.5, X.say(t + 0.4, d.app.say) + 0.8);
    Y.appCard(X, t, appEnd, {
      ...d.app,
      panel: pn.rows.map((x, i) => `<div class="row" style="height:108px;gap:24px;${i ? "border-top:2px solid var(--ln)" : ""}"><span style="width:12px;height:60px;border-radius:6px" class="bg-${x[0]}"></span><span class="dsp art-${x[0]}" style="font-size:52px;width:110px">${x[0]}</span><span class="dsp" style="font-size:56px;flex:1">${esc(x[1])}</span><span style="font-size:28px;color:var(--sub)">${esc(x[2])}</span></div>`).join("") + `<div class="row" style="margin-top:20px;gap:16px"><span class="pill dark">${esc(pn.next)}</span><span class="cap">${esc(pn.note)}</span></div>`,
      note: u(d, "cardNote"),
    });
    t = appEnd + 0.2;
    X.chap(t, u(d, "chapEnd"));
    X.say(t + 0.4, d.end.say);
    Y.endScreen(X, t, t + Y.END_LEN, d.end);

    // ---- kapak
    const c = d.hook.card;
    X.cover.innerHTML = `<div class="abs" style="inset:0;background:#f1efe9"></div><div class="abs" style="inset:0;background:radial-gradient(1200px 800px at 75% 20%,#fff,transparent 70%)"></div>
      <div class="abs dsp" style="left:104px;top:130px;font-size:220px;line-height:.9"><span style="color:#3e6dc4">der</span><br><span style="color:#c24b5c">die</span><br><span style="color:#2c8a5c">das</span></div>
      <div class="abs dsp cl" style="left:112px;top:790px;font-size:100px;color:#1f1b18">${esc(d.cover.line)}</div>
      <div class="abs card" style="left:1120px;top:150px;width:680px;padding:56px 60px;background:#fff;color:#1f1b18;transform:rotate(2deg)"><div class="dsp" style="font-size:150px">-${esc(c.suf)}</div><div class="row" style="align-items:baseline;gap:20px;margin-top:16px"><span class="dsp" style="font-size:110px;color:#c24b5c">${c.hit}</span><span style="font-size:44px;font-weight:700;color:#7a6a5c">/ ${c.all} → ${c.art}</span></div></div>
      ${Y.sig("left:1120px;top:880px")}`;
    X.L.push(() => {
      X.cv.classList.add("show-cover");
      fit(X.cover.querySelector(".cl"), 960, 60);
      X.cv.classList.remove("show-cover");
    });
    return t + Y.END_LEN;
  });
})();
