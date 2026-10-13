/*
  A1 SINAVI: BİRLİKTE ÇÖZÜYORUZ (Kâğıt). Deneme sınavının dinleme bölümü baştan sona: her maddede önce soru okunur
  (halka), kayıt sınavdaki gibi çalar (Teil 1 ve 3 iki kez, Teil 2 bir kez; altyazı yok), düşünme süresi, cevap ve
  Defne'nin açıklaması; kayıt metninde cevabı veren ifade vurgulu. Sonda cevap anahtarı. Sesler sınav dinleme
  kayıtları (x: "listen", uygulamanın kadrosu), anlatım Defne. Veri (data/social/yatay/sinav-NNN.mjs):
    series, ep, hook{lab, lines[2], sub, pills[3], say}, format{lab, title, say, parts[{name, count, what, how, plays}]},
    parts[{title, sub, label, say, items[{sit, q, opts[], ans, lines[{role, line}], plays, mark, say}]}],
    key{lab, title, say}, app{lab, title, body, where, link, say, panel{title, sub, rows[[ad, süre]], start}},
    end{lab, line, ask, sub, slot, say}, cover{lab, lines[2]}, ui{…}
*/
(() => {
  const { el, esc, set, fit, scn, COL, SPAN, P, out3, inC, outExpo, spring, ICONS } = Y;
  const UI = {
    read: "Soruyu oku",
    listen1: "1. dinleme",
    listen2: "2. dinleme",
    listenOnce: "Tek dinleme",
    think: "Cevabını işaretle",
    thinkSub: "Süre doluyor",
    answer: "Cevap",
    transcript: "Kayıt metni",
    item: "Aufgabe {i} / {n}",
    announce: "Anons",
    voice: "ses: {v}",
    playsTwo: "iki kez çalar",
    playsOne: "bir kez çalar",
    question: "soru",
    now: "Şimdi",
    keyCol: "Cevap",
    chapFormat: "Sınavın yapısı",
    chapKey: "Cevap anahtarı",
    chapApp: "Tam sınav uygulamada",
    chapEnd: "Son",
    cardNote: "Tasarlanmış sahne · ekran kaydı değil",
  };
  const u = (d, k, vars = {}) => String((d.ui && d.ui[k]) ?? UI[k]).replace(/\{(\w+)\}/g, (m, x) => (vars[x] != null ? vars[x] : m));
  const letter = (it, i) => (it.opts.length === 2 ? it.opts[i].slice(0, 1).toUpperCase() : "abc"[i]);
  /** Sınav kâğıdının küçük hâli (kanca ve kapak). marks: işaretli şık (−1 boş). */
  const sheetMini = (head, marks) =>
    `<div class="row mono" style="justify-content:space-between;font-size:20px;letter-spacing:.14em;color:var(--sub)"><span>${esc(head)}</span><span>A1</span></div><div style="height:2px;background:var(--ink);opacity:.7;margin:18px 0 8px"></div>${marks.map((m, i) => `<div class="row" style="gap:22px;padding:16px 0;border-bottom:2px dotted var(--ln)"><span class="mono" style="font-size:26px;width:40px">${i + 1}</span>${"abc".split("").map((x, j) => `<span class="mono" style="width:52px;height:52px;border-radius:26px;display:grid;place-items:center;font-size:24px;${j === m ? "background:var(--strong);color:var(--strongInk)" : "box-shadow:inset 0 0 0 2px var(--ln);color:var(--sub)"}">${x}</span>`).join("")}</div>`).join("")}`;

  Y.register("sinav", { title: "A1 Sınavı: Birlikte Çözüyoruz", theme: "kagit", series: "A1 Sınavı: Birlikte Çözüyoruz", ui: UI }, (X, d) => {
    const all = d.parts.flatMap((p) => p.items);
    const head = (p) => p.label || "";

    // ---- kanca
    X.chap(0, d.hook.chap || u(d, "chapFormat"));
    const hookEnd = Math.max(6.4, X.say(0.4, d.hook.say) + 0.6);
    {
      const S = scn(X, 0, hookEnd);
      Y.hookLeft(S, X, d.hook);
      const R = S.rg(7, 5);
      const marks = all.slice(0, 5).map((it) => it.ans);
      S.add(el(R, "card", sheetMini(head(d.parts[0]), marks), "position:absolute;left:56px;top:40px;width:560px;padding:40px 44px;opacity:.6"), 0.2, { r: 4, dy: 20 });
      S.add(el(R, "card", sheetMini(head(d.parts[0]), marks.map((m, i) => (i < 2 ? m : -1))), "position:absolute;left:24px;top:72px;width:600px;padding:44px 48px"), 0.1, { r: -2.5, dy: 24 });
    }
    // ---- format: bölümler yan yana
    let t = hookEnd;
    {
      const a = t;
      const b = Math.max(a + 6, X.say(a + 0.4, d.format.say) + 0.6);
      const S = scn(X, a, b);
      const W = S.rg(0, 12);
      S.add(el(W, "lab", esc(d.format.lab)), 0);
      const tt = S.add(el(W, "dsp t1", esc(d.format.title), "margin-top:24px"), 0.06);
      X.L.push(() => fit(tt, SPAN(12), 64));
      const row = S.add(el(W, "row", "", "margin-top:48px;gap:32px;align-items:stretch"), 0);
      const n = d.format.parts.length;
      const span = Math.floor(12 / n);
      d.format.parts.forEach((p, i) => {
        S.add(el(row, "card", `<div class="row" style="justify-content:space-between"><span class="mono" style="font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:${i ? "var(--sub)" : "var(--acc)"}">${esc(p.name)}</span>${i ? "" : `<span class="pill" style="height:44px;font-size:22px;padding:0 18px">${esc(u(d, "now"))}</span>`}</div><div class="row" style="align-items:baseline;gap:16px;margin-top:20px"><span class="dsp d2">${esc(p.count)}</span><span class="b1" style="font-weight:700">${esc(u(d, "question"))}</span></div><div style="font-size:40px;font-weight:700;margin-top:16px;line-height:1.15">${esc(p.what)}</div><div class="b2" style="margin-top:8px">${esc(p.how)}</div><div class="row" style="gap:12px;margin-top:auto;padding-top:32px;border-top:2px solid var(--ln)">${`<span style="width:44px;height:44px;border-radius:22px;background:var(--sf2);color:var(--ink);display:grid;place-items:center">${ICONS.play}</span>`.repeat(p.plays)}<span style="font-size:30px;font-weight:650;margin-left:8px">${esc(u(d, p.plays === 2 ? "playsTwo" : "playsOne"))}</span></div>`,
          `width:${SPAN(span)}px;padding:40px 44px;display:flex;flex-direction:column;${i ? "" : "box-shadow:var(--sh),inset 0 0 0 2px var(--accLine)"}`), 0.2 + i * 0.12, { dy: 28 });
      });
      t = b;
    }

    // ---- bölümler ve maddeler
    const agenda = d.parts.map((p) => [p.title, `${p.items.length} ${u(d, "question")}`]);
    let no = 0;
    d.parts.forEach((part, pi) => {
      X.chap(t, part.title);
      X.sfx(t + 0.1, "chap");
      const cEnd = Math.max(t + 3.4, X.say(t + 0.6, part.say) + 0.5);
      Y.chapterCard(X, t, cEnd, { idx: pi, title: part.title, sub: part.sub, agenda, label: head(part) });
      t = cEnd + 0.2;
      const items = part.items.map((it) => {
        no++;
        const a = t;
        const R0 = a + 0.6;
        const L1 = R0 + 4.4;
        const plays = it.plays === 2 ? 2 : 1;
        const lines = [];
        let lt = L1;
        for (let k = 0; k < plays; k++) {
          let prev = null;
          for (const ln of it.lines) {
            if (prev != null && prev !== ln.role) lt += 0.35;
            const e = X.say(lt, ln.line, { sub: false });
            lines.push({ s: lt, e, role: ln.role, pass: k });
            lt = e + 0.08;
            prev = ln.role;
          }
          if (k + 1 < plays) lt += 1.4;
        }
        const L2 = plays === 2 ? lines.find((x) => x.pass === 1).s : null;
        const C = lt + 0.5;
        for (let s = 0; s < 5; s++) X.sfx(C + s, "tick");
        const RV = C + 5;
        X.sfx(RV, "ok");
        const E = Math.max(RV + 6, X.say(RV + 0.7, it.say) + 1.0);
        t = E;
        return { it, no, a, R0, L1, L2, C, RV, E, lines };
      });
      // kâğıt ve dinleme paneli bölüm boyunca yerinde; yalnız içerik sayfa gibi değişir
      {
        const H = 640;
        const Yy = X.MID - H / 2;
        const S = scn(X, items[0].a, t);
        const sh = S.add(el(S.root, "card abs", "", `left:${COL(0)}px;top:${Yy}px;width:${SPAN(7)}px;height:${H}px;overflow:hidden`), 0, { dy: 20 });
        const lp = S.add(el(S.root, "card abs", "", `left:${COL(7)}px;top:${Yy}px;width:${SPAN(5)}px;height:${H}px;background:var(--sf2);box-shadow:none;overflow:hidden`), 0.1, { dy: 20 });
        items.forEach((m, mi) => {
          const { it } = m;
          m.sc = el(sh, "abs", "", "inset:0;padding:44px 56px;display:flex;flex-direction:column");
          el(m.sc, "row mono", `<span>${esc(head(part))}</span><span>${esc(u(d, "item", { i: m.no, n: all.length }))}</span>`, "justify-content:space-between;font-size:22px;letter-spacing:.14em;color:var(--sub)");
          el(m.sc, "", "", "height:2px;background:var(--ink);opacity:.75;margin-top:20px");
          el(m.sc, "", esc(it.sit), "margin-top:28px;font-size:30px;font-weight:600;color:var(--sub)");
          const q = el(m.sc, "dsp wr", esc(it.q), "font-size:60px;margin-top:12px;line-height:1.06");
          X.L.push(() => {
            let fs = 60;
            while (q.scrollHeight > 200 && fs > 40) q.style.fontSize = `${(fs -= 4)}px`;
          });
          const optBox = el(m.sc, "", "", "margin-top:auto");
          const oh = it.opts.length === 2 ? 104 : 92;
          m.opts = it.opts.map((o, i) => el(optBox, "row", `<span class="ob mono" style="flex:none;width:64px;height:64px;border-radius:32px;display:grid;place-items:center;font-size:28px;box-shadow:inset 0 0 0 2px var(--ln)">${letter(it, i)}</span><span class="ot" style="font-size:44px;font-weight:600;white-space:nowrap">${esc(o)}</span>`, `gap:28px;height:${oh}px;${i ? "border-top:2px dotted var(--ln)" : ""}`));
          X.L.push(() => m.opts.forEach((o) => fit(o.querySelector(".ot"), SPAN(7) - 112 - 92, 30)));
          // panel: üst satır (aşama + dinleme noktaları), üç katman (dinleme · süre · cevap)
          m.pc = el(lp, "abs", "", "inset:0;padding:44px 48px");
          const top = el(m.pc, "row", `<span class="lt mono" style="font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:var(--sub)"></span><span class="dots row" style="margin-left:auto;gap:10px">${"<i></i>".repeat(it.plays === 2 ? 2 : 1)}</span>`);
          m.dots = [...top.querySelectorAll(".dots i")];
          m.dots.forEach((x) => (x.style.cssText = "width:14px;height:14px;border-radius:7px;background:var(--ln)"));
          m.lab = top.querySelector(".lt");
          const layer = (css = "") => el(m.pc, "abs", "", `left:48px;right:48px;top:112px;bottom:44px;display:flex;flex-direction:column;${css}`);
          m.Lrd = layer("align-items:center;justify-content:center");
          m.Lsn = layer();
          m.Lch = layer("align-items:center;justify-content:center");
          m.Lrv = layer();
          m.ring0 = el(m.Lrd, "ring", Y.ringHTML(12), "width:200px;height:200px");
          m.ring0.querySelector(".num").style.fontSize = "84px";
          el(m.Lrd, "", esc(u(d, "read")), "margin-top:32px;font-size:44px;font-weight:700");
          const roles = [...new Map(it.lines.map((l) => [l.role, l.line.v])).entries()];
          m.spk = roles.map(([role, v]) => {
            const r = el(m.Lsn, "row", `<span style="flex:none;width:80px;height:80px;border-radius:40px;background:${(Y.VOICES[v] || {}).color};color:#fff;display:grid;place-items:center;font-size:36px;font-weight:750">${esc((role || u(d, "announce"))[0])}</span><span style="margin-left:24px;flex:1;min-width:0"><span style="display:block;font-size:38px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(role || u(d, "announce"))}</span><span class="mono" style="display:block;font-size:22px;letter-spacing:.06em;color:var(--sub);margin-top:2px">${esc(u(d, "voice", { v: (Y.VOICES[v] || { name: v }).name }))}</span></span>${Y.waveBars(7)}`, "height:116px;border-bottom:2px solid var(--ln)");
            return { role, r, wv: r.querySelector(".wave") };
          });
          m.bigW = el(m.Lsn, "", Y.waveBars(32), "margin-top:auto;height:150px;display:flex;align-items:center").firstChild;
          m.ring = el(m.Lch, "ring", Y.ringHTML(12), "width:220px;height:220px");
          m.ring.querySelector(".num").style.fontSize = "92px";
          el(m.Lch, "", esc(u(d, "think")), "margin-top:36px;font-size:46px;font-weight:700");
          el(m.Lch, "", esc(it.opts.map((_, i) => letter(it, i)).join(" · ")), "margin-top:8px;font-size:30px;color:var(--sub)");
          el(m.Lrv, "mono", esc(u(d, "transcript")), "font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:var(--acc)");
          const markIn = (s) => {
            const x = esc(s);
            const k = it.mark ? esc(it.mark) : "";
            return k && x.includes(k) ? x.replace(k, `<span class="hl">${k}</span>`) : x;
          };
          const tr = el(m.Lrv, "", it.lines.map((l) => `<div style="margin-top:16px"><span class="mono" style="font-size:20px;letter-spacing:.1em;text-transform:uppercase;color:var(--sub)">${esc(l.role || u(d, "announce"))}</span><div class="tl" style="font-size:29px;line-height:1.32;margin-top:2px">${markIn(l.line.t)}</div></div>`).join(""), "margin-top:2px");
          X.L.push(() => {
            let fs = 29;
            while (tr.scrollHeight > 440 && fs > 21) {
              fs -= 2;
              tr.querySelectorAll(".tl").forEach((e) => (e.style.fontSize = `${fs}px`));
            }
          });
          m.last = mi === items.length - 1;
        });
        S.on((tt, out) => {
          items.forEach((m) => {
            const { it, a, R0, L1, L2, C, RV, E, lines } = m;
            const kin = m === items[0] ? 1 : outExpo(P(tt, a, 0.7));
            const kout = m.last ? 0 : inC(P(tt, E - 0.35, 0.35));
            const vis = tt >= a - 0.01 && (m.last || tt < E);
            const o = vis ? Math.min(out3(Math.min(1, kin * 1.6)), 1 - kout) : 0;
            set(m.sc, { o, x: (1 - kin) * 60 - kout * 60 });
            set(m.pc, { o, x: (1 - kin) * 60 - kout * 60 });
            if (!vis) return;
            const ph = tt < L1 - 0.2 ? 0 : tt < C ? 1 : tt < RV ? 2 : 3;
            const lay = (e, on, at) => {
              const k = on ? outExpo(P(tt, at, 0.6)) : 0;
              set(e, { o: k * (1 - out), y: (1 - k) * 16 });
            };
            lay(m.Lrd, ph === 0, R0);
            lay(m.Lsn, ph === 1, L1 - 0.2);
            lay(m.Lch, ph === 2, C);
            lay(m.Lrv, ph === 3, RV);
            const label = ph === 0 ? u(d, "read") : ph === 3 ? u(d, "answer") : ph === 2 ? u(d, "thinkSub") : it.plays === 2 ? (L2 != null && tt >= L2 - 0.5 ? u(d, "listen2") : u(d, "listen1")) : u(d, "listenOnce");
            if (m.lab.textContent !== label) m.lab.textContent = label;
            m.dots.forEach((x, i) => (x.style.background = (i === 0 && tt >= L1) || (i === 1 && L2 != null && tt >= L2) ? "var(--acc)" : "var(--ln)"));
            Y.setRing(m.ring0, 1 - P(tt, R0, L1 - R0), Math.max(1, Math.ceil(L1 - tt)));
            const now = lines.find((x) => tt >= x.s && tt < x.e);
            const lvl = X.level(tt);
            m.spk.forEach((s) => {
              const on = now && now.role === s.role;
              s.r.style.opacity = on || !now ? 1 : 0.42;
              Y.animWave(s.wv, tt, on ? lvl : 0, { min: 8, max: 40 });
            });
            Y.animWave(m.bigW, tt, lvl, { min: 8, max: 120 });
            Y.setRing(m.ring, 1 - P(tt, C, RV - C), Math.max(1, Math.ceil(RV - tt)));
            m.opts.forEach((op, i) => {
              const ok = ph === 3 && i === it.ans;
              const ob = op.querySelector(".ob");
              ob.style.background = ok ? "var(--ok)" : "transparent";
              ob.style.color = ok ? "#fff" : "";
              ob.style.boxShadow = ok ? "none" : "inset 0 0 0 2px var(--ln)";
              ob.style.transform = ok ? `scale(${(0.6 + 0.4 * spring(P(tt, RV, 0.6))).toFixed(3)})` : "";
              const html = ok ? `<span class="ic" style="width:34px;height:34px">${ICONS.check}</span>` : letter(it, i);
              if (ob.dataset.h !== String(ok)) {
                ob.dataset.h = String(ok);
                ob.innerHTML = html;
              }
              op.style.opacity = ph === 3 && !ok ? Y.lerp(1, 0.4, out3(P(tt, RV, 0.5))) : 1;
            });
          });
        });
      }
      t += 0.3;
    });

    // ---- cevap anahtarı
    X.chap(t, u(d, "chapKey"));
    {
      const a = t;
      const b = Math.max(a + 10.5, X.say(a + 0.6, d.key.say) + 1); // YouTube bölümü en az 10 sn
      const S = scn(X, a, b);
      const W = S.rg(0, 12);
      S.add(el(W, "lab", esc(d.key.lab)), 0);
      const tt = S.add(el(W, "dsp t2", esc(d.key.title), "margin-top:20px"), 0.06);
      X.L.push(() => fit(tt, SPAN(12), 48));
      const cols = Math.min(8, Math.ceil(all.length / 2));
      const grid = S.add(el(W, "", "", `margin-top:44px;display:grid;grid-template-columns:repeat(${cols},1fr);gap:20px`), 0.12, { dy: 20 });
      const cells = all.map((it, i) => el(grid, "card", `<div class="mono" style="font-size:22px;color:var(--sub)">${i + 1}</div><div class="dsp" style="font-size:72px;margin-top:6px">${letter(it, it.ans)}</div>`, "padding:20px 24px;text-align:center"));
      S.on((t2) => cells.forEach((c, i) => {
        const k = outExpo(P(t2, a + 1 + i * 0.12, 0.6));
        set(c, { o: k, y: (1 - k) * 16 });
      }));
      t = b;
    }

    // ---- uygulama ve son
    X.chap(t, u(d, "chapApp"));
    const pn = d.app.panel;
    const appEnd = Math.max(t + 10.5, X.say(t + 0.4, d.app.say) + 0.8);
    Y.appCard(X, t, appEnd, {
      ...d.app,
      panel: `<div class="dsp t3">${esc(pn.title)}</div><div class="b2" style="margin-top:4px">${esc(pn.sub)}</div>${pn.rows.map((r, i) => `<div class="row" style="gap:20px;height:84px;border-top:2px solid var(--ln);margin-top:${i ? 0 : 28}px"><span style="width:16px;height:16px;border-radius:8px;background:${i ? "var(--ln)" : "var(--acc)"}"></span><span style="font-size:36px;font-weight:750;flex:1">${esc(r[0])}</span><span class="mono" style="font-size:22px;color:var(--sub)">${esc(r[1])}</span></div>`).join("")}<div class="row" style="margin-top:20px"><span class="pill dark" style="margin-left:auto"><span class="ic" style="width:22px;height:22px">${ICONS.play}</span>${esc(pn.start)}</span></div>`,
      note: u(d, "cardNote"),
    });
    t = appEnd + 0.2;
    X.chap(t, u(d, "chapEnd"));
    X.say(t + 0.4, d.end.say);
    Y.endScreen(X, t, t + Y.END_LEN, d.end);

    // ---- kapak
    X.cover.innerHTML = `<div class="abs" style="inset:0;background:#f1efe9"></div><div class="abs" style="inset:0;background:radial-gradient(1200px 800px at 75% 20%,#fff,transparent 70%)"></div>
      <div class="abs lab" style="left:112px;top:120px;font-size:30px;color:#7a6a5c">${esc(d.cover.lab)}</div>
      <div class="abs dsp cl" style="left:104px;top:200px;font-size:240px;line-height:.9;color:#1f1b18">${esc(d.cover.lines[0])}</div>
      <div class="abs dsp c2" style="left:112px;top:640px;font-size:120px;color:#e46a12">${esc(d.cover.lines[1])}</div>
      <div class="abs card" style="left:1180px;top:170px;width:620px;padding:48px 52px;transform:rotate(-3deg);background:#fff;color:#1f1b18">${sheetMini(head(d.parts[0]), all.slice(0, 4).map((it, i) => (i < 3 ? it.ans : -1)))}</div>
      ${Y.sig("left:112px;top:900px;box-shadow:0 10px 24px -16px rgba(60,40,20,.4)")}`;
    X.L.push(() => {
      X.cv.classList.add("show-cover");
      fit(X.cover.querySelector(".cl"), 1000, 120);
      fit(X.cover.querySelector(".c2"), 1000, 80);
      X.cv.classList.remove("show-cover");
    });
    return t + Y.END_LEN;
  });
})();
