/*
  YÜRÜRKEN ALMANCA (Lacivert). Defne kelimenin Türkçesini söyler, 3 sn es (izleyen Almancasını söyler), sonra
  Almancası ve örnek cümle (kelimenin kendi kaydı). Her konu bir YouTube bölümü, konunun sonunda es vermeden hızlı
  tekrar. Veri (data/social/yatay/yuru-NNN.mjs):
    series, ep, hook{lab, lines[2], sub, pills[3], say}, how{say, steps[3]}, sections[{title, sub, say, words[H.walk]}],
    review{say}, app{lab, title, body, where, link, note, say, panel{tr, de, ok}}, end{lab, line, ask, sub, slot, say},
    cover{lab, lines[2], pill}, ui{…}
*/
(() => {
  const { el, esc, set, fit, scn, COL, SPAN, P, out3, inC, outExpo, artOf, stem, ICONS } = Y;
  const UI = {
    tr: "Türkçesi",
    de: "Almancası",
    wait: "Sen söyle…",
    wordOf: "Kelime {i} / {n}",
    partOf: "Bölüm {i} / {n}",
    words: "{n} kelime",
    review: "Hızlı tekrar · es yok",
    reviewSide: "Türkçesi → Almancası",
    howLab: "Nasıl çalışır",
    chapHow: "Nasıl çalışır",
    chapApp: "Yürüyüş modu",
    chapEnd: "Son",
    cardNote: "Tasarlanmış sahne · ekran kaydı değil",
  };
  const u = (d, k, vars = {}) => String((d.ui && d.ui[k]) ?? UI[k]).replace(/\{(\w+)\}/g, (m, x) => (vars[x] != null ? vars[x] : m));
  const word = (w) => {
    const art = artOf(w.de.t);
    return art ? `<span class="art-${art}">${art}</span> ${esc(stem(w.de.t))}` : esc(w.de.t);
  };

  Y.register("yuru", { title: "Yürürken Almanca", theme: "lacivert", series: "Yürürken Almanca", ui: UI }, (X, d) => {
    const secs = d.sections;
    const agenda = secs.map((s) => [s.title, u(d, "words", { n: s.words.length })]);

    // ---- kanca: solda başlık, sağda yürüyüş rotası (durakları ilk üç konunun ilk kelimesi)
    X.chap(0, u(d, "chapHow"));
    const hookEnd = Math.max(6.4, X.say(0.4, d.hook.say) + 0.6);
    {
      const S = scn(X, 0, hookEnd);
      Y.hookLeft(S, X, d.hook);
      const R = S.rg(7, 5);
      const svgW = SPAN(5);
      const svgH = 640;
      const path = "M 70 560 C 120 430, 420 470, 470 360 S 230 220, 300 130 S 560 60, 600 40";
      const box = S.add(el(R, "", `<svg width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" style="overflow:visible;display:block"><path d="${path}" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 22"/><path class="pr" d="${path}" fill="none" stroke="var(--acc)" stroke-width="10" stroke-linecap="round" opacity=".9"/><circle class="me" r="18" fill="var(--acc)" stroke="var(--bg)" stroke-width="8"/></svg>`, `position:relative;height:${svgH}px`), 0.1, { dy: 20 });
      const pth = box.querySelector(".pr");
      const me = box.querySelector(".me");
      const all = secs.flatMap((s) => s.words);
      const pick = (label) => all.find((w) => w.de.t === label);
      const stops = (d.hook.stops || []).map(pick).filter(Boolean).concat(secs.map((s) => s.words[0])).slice(0, 3).map((w, i) => [[0.18, 0.55, 0.9][i], w]);
      const labels = stops.map(([, w]) => el(box, "abs", word(w), "padding:14px 22px;border-radius:20px;background:var(--sf2);border:var(--bd);font-size:30px;font-weight:650;white-space:nowrap"));
      let LEN = 0;
      X.L.push(() => {
        LEN = pth.getTotalLength();
        pth.style.strokeDasharray = `${LEN}`;
        labels.forEach((e, i) => {
          const p = pth.getPointAtLength(LEN * stops[i][0]);
          e.style.left = `${Math.min(svgW - e.offsetWidth, Math.max(0, p.x + (p.x > svgW / 2 ? -e.offsetWidth - 40 : 40)))}px`;
          e.style.top = `${p.y - 30}px`;
        });
      });
      const run = Math.max(3, hookEnd - 1);
      S.on((tt) => {
        if (!LEN) return;
        const f = 0.08 + 0.84 * out3(P(tt, 0.3, run));
        pth.style.strokeDashoffset = `${LEN * (1 - f)}`;
        const p = pth.getPointAtLength(LEN * f);
        me.setAttribute("cx", p.x);
        me.setAttribute("cy", p.y);
        labels.forEach((e, i) => set(e, { o: out3(P(tt, 0.3 + ((stops[i][0] - 0.08) / 0.84) * run * 0.45, 0.4)) }));
      });
    }

    // ---- nasıl çalışır: üç adım, anlatım ilerledikçe sırayla yanar
    let t = hookEnd;
    {
      const a = t;
      const end = X.say(a + 0.4, d.how.say);
      const b = end + 0.6;
      const S = scn(X, a, b);
      const Wc = S.rg(0, 12);
      S.add(el(Wc, "lab", esc(u(d, "howLab"))), 0);
      const row = el(Wc, "row", "", "margin-top:40px;gap:32px;align-items:stretch");
      const icons = [ICONS.hp, ICONS.mic, ICONS.play];
      const cards = d.how.steps.map((s, i) =>
        S.add(el(row, "card", `<div class="row" style="gap:20px"><span style="flex:none;width:72px;height:72px;border-radius:36px;display:grid;place-items:center;background:var(--sf2);color:var(--acc)"><span class="ic" style="width:36px;height:36px">${icons[i]}</span></span><span class="mono" style="font-size:24px;letter-spacing:.14em;color:var(--sub)">0${i + 1}</span></div><div class="dsp t3 wr" style="margin-top:40px">${esc(s[0])}</div><div class="b2" style="margin-top:16px">${esc(s[1])}</div>`, `width:${SPAN(4)}px;padding:44px 48px;min-height:400px`), 0.12 + i * 0.1, { dy: 28 }),
      );
      const span = (end - a - 0.4) / 3;
      S.on((tt) => cards.forEach((c, i) => {
        const on = tt >= a + 0.4 + i * span;
        c.style.boxShadow = on ? "var(--sh), inset 0 0 0 2px var(--accLine)" : "var(--sh)";
      }));
      t = b;
    }

    // ---- konular
    const sched = [];
    secs.forEach((sec, si) => {
      X.chap(t, sec.title);
      X.sfx(t + 0.1, "chap");
      const cEnd = Math.max(t + 3.2, X.say(t + 0.6, sec.say) + 0.5);
      Y.chapterCard(X, t, cEnd, { idx: si, title: sec.title, sub: sec.sub, agenda, label: u(d, "partOf", { i: si + 1, n: secs.length }) });
      t = cEnd + 0.2;
      const list = sec.words.map((w, i) => {
        const a = t;
        const q = X.say(a + 0.3, w.tr, { sub: false }) + 0.25;
        const r = q + 2.8;
        const e = X.say(r, w.de, { sub: false }) + 0.5;
        const end = X.say(e, w.ex, { sub: false }) + 1.0;
        t = end;
        return { w, a, q, r, e, end, i, si };
      });
      sched.push(list);
      // kelime sahnesi: solda kart (Türkçesi → es → Almancası → örnek), sağda konunun listesi
      {
        const S = scn(X, list[0].a, list[list.length - 1].end);
        const H = 624;
        const Yy = X.MID - H / 2;
        const card = S.add(el(S.root, "card abs", "", `left:${COL(0)}px;top:${Yy}px;width:${SPAN(8)}px;height:${H}px;padding:56px 64px;display:flex;flex-direction:column`), 0, { dy: 20 });
        const r1 = el(card, "", `<div class="row"><span class="lab plain">${esc(u(d, "tr"))}</span><span style="margin-left:auto;height:40px;display:flex;align-items:center">${Y.waveBars(14)}</span></div>`);
        const mini = r1.querySelector(".wave");
        const trEl = el(r1, "dsp t2", "", "margin-top:16px;height:76px");
        el(card, "", "", "border-top:2px dotted var(--ln);margin:32px 0 28px");
        const r2 = el(card, "", `<div class="row"><span class="lab plain">${esc(u(d, "de"))}</span><span class="lv mono" style="margin-left:auto;font-size:22px;letter-spacing:.1em;padding:6px 14px;border-radius:10px;background:var(--sf2);color:var(--sub)"></span></div>`);
        const lv = r2.querySelector(".lv");
        const slot = el(r2, "", "", "position:relative;height:132px;margin-top:16px");
        const deEl = el(slot, "abs dsp d2", "", "left:0;top:0");
        const wait = el(slot, "abs row", `<span class="ring" style="width:120px;height:120px">${Y.ringHTML(12)}</span><span style="margin-left:32px;font-size:56px;font-weight:750;color:var(--sub)">${esc(u(d, "wait"))}</span>`, "left:0;top:6px");
        const ring = wait.querySelector(".ring");
        ring.querySelector(".num").style.fontSize = "52px";
        const exEl = el(card, "", "", "margin-top:auto");
        const R = S.rg(8, 4);
        const side = S.add(el(R, "card", "", `height:${H}px;padding:40px 40px;display:flex;flex-direction:column`), 0.12, { dy: 20 });
        side.innerHTML = `<div class="lab plain" style="overflow:hidden;text-overflow:ellipsis">${esc(sec.title)}</div><div class="dsp t3 sn" style="margin-top:10px;font-size:44px"></div>`;
        const sn = side.querySelector(".sn");
        const sList = el(side, "", "", "margin-top:16px;position:relative");
        const n = list.length;
        const rowH = Math.min(64, Math.floor(390 / n));
        const fs = Math.min(32, Math.round(rowH * 0.7));
        const items = list.map((x) => el(sList, "row", `<span class="nd" style="flex:none;width:${Math.min(32, rowH - 10)}px;height:${Math.min(32, rowH - 10)}px;border-radius:50%;display:grid;place-items:center;border:2px solid var(--ln);color:var(--bg)"></span><span style="margin-left:18px;font-size:${fs}px;font-weight:650;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(stem(x.w.de.t))}</span>`, `height:${rowH}px`));
        const prog = el(side, "", `<div class="row mono" style="justify-content:space-between;font-size:22px;color:var(--sub)"><span>${esc(u(d, "partOf", { i: si + 1, n: secs.length }))}</span><span class="pc"></span></div><div style="height:10px;border-radius:5px;background:var(--ln);margin-top:14px;overflow:hidden"><i style="display:block;height:100%;background:var(--acc);transform-origin:0 50%"></i></div>`, "margin-top:auto");
        const pc = prog.querySelector(".pc");
        const pf = prog.querySelector("i");
        S.on((tt) => {
          const s = list.find((x) => tt >= x.a && tt < x.end) || (tt < list[0].a ? list[0] : list[n - 1]);
          const w = s.w;
          if (card.dataset.k !== String(s.i)) {
            card.dataset.k = String(s.i);
            trEl.textContent = w.tr.t;
            delete trEl.dataset.fs;
            trEl.style.fontSize = "";
            fit(trEl, SPAN(8) - 128, 48);
            deEl.innerHTML = word(w);
            delete deEl.dataset.fs;
            deEl.style.fontSize = "";
            fit(deEl, SPAN(8) - 128, 64);
            lv.textContent = w.lv || "";
            exEl.innerHTML = `<div style="font-size:${w.ex.t.length > 60 ? 36 : 42}px;font-weight:600;line-height:1.25;font-style:italic">${w.ex.t.split(/\s+/).map((x) => `<span class="kw">${esc(x)}</span>`).join(" ")}</div><div class="b2 et" style="margin-top:12px;font-size:32px">${esc(w.exTr)}</div>`;
            exEl.kws = [...exEl.querySelectorAll(".kw")];
            exEl.et = exEl.querySelector(".et");
            sn.textContent = u(d, "wordOf", { i: s.i + 1, n });
          }
          const ko = s.i < n - 1 ? inC(P(tt, s.end - 0.35, 0.35)) : 0;
          const kt = outExpo(P(tt, s.a, 0.8));
          set(trEl, { o: Math.min(out3(Math.min(1, kt * 2)), 1 - ko), y: (1 - kt) * 18 - ko * 10 });
          const counting = tt >= s.q && tt < s.r;
          set(wait, { o: counting ? Math.min(out3(P(tt, s.q, 0.3)), 1 - P(tt, s.r - 0.15, 0.15)) : 0 });
          Y.setRing(ring, 1 - P(tt, s.q, s.r - s.q), Math.max(1, Math.ceil(s.r - s.q - (tt - s.q))));
          const kd = outExpo(P(tt, s.r, 0.8));
          set(deEl, { o: tt >= s.r ? Math.min(out3(Math.min(1, kd * 2)), 1 - ko) : 0, y: (1 - kd) * 22 - ko * 10 });
          set(lv, { o: tt >= s.r ? 1 - ko : 0 });
          const ke = outExpo(P(tt, s.e, 0.8));
          set(exEl, { o: tt >= s.e ? Math.min(out3(Math.min(1, ke * 2)), 1 - ko) : 0, y: (1 - ke) * 14 - ko * 10 });
          // örnek cümle: söylenen kelime yanar (süre harf sayısına göre, kaydın uzunluğu kadar)
          if (exEl.kws) {
            const dur = Y.dur(w.ex) * 0.92;
            const wts = exEl.kws.map((x) => x.textContent.length + 2);
            const tot = wts.reduce((p, q) => p + q, 0);
            let acc = s.e + 0.05;
            exEl.kws.forEach((x, j) => {
              const a1 = acc;
              const b1 = acc + (wts[j] / tot) * dur;
              acc = b1;
              x.classList.toggle("said", tt >= a1);
              x.classList.toggle("now", tt >= a1 && tt < b1 + 0.05 && tt < s.e + dur + 0.1);
            });
            set(exEl.et, { o: outExpo(P(tt, s.e + dur, 0.6)) });
          }
          Y.animWave(mini, tt, X.level(tt), { min: 4, max: 36 });
          const done = list.filter((x) => tt >= x.r).length;
          items.forEach((e, j) => {
            const x = list[j];
            const on = tt >= x.a && tt < x.end;
            const ok = tt >= x.r;
            const nd = e.querySelector(".nd");
            nd.style.background = ok ? "var(--acc)" : "transparent";
            nd.style.borderColor = ok || on ? "var(--acc)" : "rgba(255,255,255,.25)";
            nd.innerHTML = ok ? `<span class="ic" style="width:60%;height:60%">${ICONS.check}</span>` : "";
            e.style.opacity = on || ok ? 1 : 0.45;
            e.lastChild.style.color = on ? "var(--ink)" : "";
          });
          pc.textContent = `${done} / ${n}`;
          pf.style.transform = `scaleX(${done / n})`;
        });
      }
      // konunun hızlı tekrarı: Türkçesi, hemen ardından Almancası (es yok)
      {
        const a = t + 0.3;
        let x = X.say(a + 0.4, d.review.say) + 0.3;
        const rows = list.map((s) => {
          const r0 = x;
          const r1 = X.say(r0, s.w.tr, { sub: false }) + 0.15;
          x = X.say(r1, s.w.de, { sub: false }) + 0.45;
          return { r0, r1, r2: x };
        });
        const b = x + 0.4;
        const S = scn(X, a, b);
        const Wr = S.rg(0, 12);
        S.add(el(Wr, "row", `<span class="lab">${esc(u(d, "review"))}</span><span class="cap" style="margin-left:auto">${esc(u(d, "reviewSide"))}</span>`), 0);
        const grid = S.add(el(Wr, "", "", `margin-top:28px;display:grid;grid-template-columns:1fr 1fr;column-gap:32px`), 0.08, { dy: 20 });
        const per = Math.ceil(list.length / 2);
        const rh = Math.min(112, Math.floor(560 / per));
        const cells = list.map((s, i) => {
          const c = el(grid, "row", `<span style="flex:none;width:44%;font-size:${Math.round(rh * 0.36)}px;font-weight:600;color:var(--sub);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(s.w.tr.t)}</span><span class="dsp dd" style="font-size:${Math.round(rh * 0.46)}px;flex:none">${word(s.w)}</span>`, `height:${rh}px;padding:0 32px;border-radius:24px;grid-row:${(i % per) + 1};grid-column:${i < per ? 1 : 2}`);
          return c;
        });
        X.L.push(() => cells.forEach((c) => fit(c.querySelector(".dd"), c.clientWidth - c.firstChild.offsetWidth - 64, 30)));
        S.on((tt) => cells.forEach((c, i) => {
          const r = rows[i];
          const on = tt >= r.r0 && tt < r.r2;
          c.style.opacity = tt >= r.r0 ? 1 : 0.28;
          c.style.background = on ? "var(--sf2)" : "transparent";
          c.style.boxShadow = on ? "inset 6px 0 0 var(--acc)" : "none";
          const dd = c.querySelector(".dd");
          set(dd, { o: tt >= r.r1 ? out3(P(tt, r.r1, 0.3)) : 0, x: (1 - outExpo(P(tt, r.r1, 0.8))) * -20 });
        }));
        t = b + 0.2;
      }
    });

    // ---- uygulama ve son
    X.chap(t, u(d, "chapApp"));
    const p = d.app.panel;
    const appEnd = Math.max(t + 10.5, X.say(t + 0.4, d.app.say) + 0.8);
    Y.appCard(X, t, appEnd, {
      ...d.app,
      panel: `<div class="lab plain">${esc(p.tr)}</div><div class="dsp t1" style="margin-top:20px">${(() => { const a = artOf(p.de); return a ? `<span class="art-${a}">${a}</span> ${esc(stem(p.de))}` : esc(p.de); })()}</div><div style="margin-top:36px;height:96px;display:flex;align-items:center"><div class="wave">${Array.from({ length: 34 }, (_, i) => `<i style="height:${16 + Math.abs(Math.sin(i * 1.3) * Math.cos(i * 0.4)) * 70}px"></i>`).join("")}</div></div><div class="row" style="margin-top:32px;gap:16px"><span class="pill ok"><span class="ic" style="width:30px;height:30px">${ICONS.check}</span>${esc(p.ok)}</span></div>`,
      note: u(d, "cardNote"),
    });
    t = appEnd + 0.2;
    X.chap(t, u(d, "chapEnd"));
    X.say(t + 0.4, d.end.say);
    Y.endScreen(X, t, t + Y.END_LEN, d.end);

    // ---- kapak (1280×720'ye küçültülür; sahneden canlı)
    const cw = (d.cover.words || []).map((l) => secs.flatMap((s) => s.words).find((w) => w.de.t === l)).filter(Boolean);
    const w1 = cw[0] || secs[0].words[0];
    const w2 = cw[1] || secs[Math.min(1, secs.length - 1)].words[0];
    X.cover.innerHTML = `<div class="abs" style="inset:0;background:#101a36"></div><div class="abs" style="inset:0;background:radial-gradient(1100px 760px at 82% 18%,rgba(79,140,255,.28),transparent 70%)"></div>
      <div class="abs lab" style="left:112px;top:128px;font-size:30px;color:rgba(244,241,234,.66)">${esc(d.cover.lab)}</div>
      <div class="abs dsp cl" style="left:104px;top:210px;font-size:220px;line-height:.92;color:#f4f1ea">${esc(d.cover.lines[0])}<br><span style="color:#fb8f2a">${esc(d.cover.lines[1])}</span></div>
      <div class="abs card" style="left:1180px;top:200px;width:620px;padding:56px;background:rgba(255,255,255,.08);border:3px solid rgba(255,255,255,.18);color:#f4f1ea;border-radius:40px"><div style="font-size:38px;opacity:.65;font-weight:600">${esc(w1.tr.t)}</div><div class="dsp cw" style="font-size:96px;margin-top:12px">${word(w1)}</div><div style="border-top:3px dotted rgba(255,255,255,.2);margin:44px 0"></div><div style="font-size:38px;opacity:.65;font-weight:600">${esc(w2.tr.t)}</div><div class="dsp cw" style="font-size:96px;margin-top:12px">${word(w2)}</div></div>
      <div class="abs pill" style="left:112px;top:840px;font-size:44px;height:88px;padding:0 40px;border-radius:44px;background:rgba(251,143,42,.16);color:#fbb06a;box-shadow:inset 0 0 0 2px rgba(251,143,42,.6)">${esc(d.cover.pill)}</div>`;
    X.L.push(() => {
      X.cv.classList.add("show-cover");
      X.cover.querySelectorAll(".cw").forEach((e) => fit(e, 508, 56));
      fit(X.cover.querySelector(".cl"), 1000, 120);
      X.cv.classList.remove("show-cover");
    });
    return t + Y.END_LEN;
  });
})();
