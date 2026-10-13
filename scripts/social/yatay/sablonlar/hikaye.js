/*
  YAVAŞ ALMANCA HİKÂYELER (Lacivert). Okuma kütüphanesindeki A2 metinleri: her hikâyede kelimeler → paragraf paragraf
  yavaş okuma (söylenen kelime yanar; ardından Türkçesi) → sorular (5 sn, cevap ve Defne'nin açıklaması) → hikâyenin
  tamamı normal hızda. Sesler okuma katmanının kayıtları (Defne; x: "listenSlow" yavaş, normal hız eki yok).
  Paragrafların Türkçesi elle yazıldı (editör düzeltir). Veri (data/social/yatay/hikaye-NNN.mjs):
    series, ep, hook{lab, lines[2], sub, say}, wordsSay, quizSay, fullSay,
    stories[{title, titleTr, lv, say, words[H.walk], paras[{slow, normal, tr}], questions[{q, opts, ans, say}]}],
    app{…, panel{title, lv, rows[[ad, süre]], slow, normal}}, end{…}, cover{lines[2], pill}, ui{…}
*/
(() => {
  const { el, esc, set, fit, scn, SPAN, P, out3, inC, outExpo, spring, ICONS, artOf, stem } = Y;
  const UI = {
    story: "Hikâye {i} / {n}",
    words: "Önce kelimeler",
    para: "Paragraf {i} / {n}",
    slow: "Yavaş okuma",
    trLab: "Türkçesi",
    quiz: "Soru {i} / {n}",
    think: "Düşün",
    full: "Normal hızda, baştan sona",
    chapWords: "{t}: kelimeler",
    chapRead: "{t}: yavaş okuma",
    chapQuiz: "{t}: sorular",
    chapFull: "{t}: normal hızda",
    chapApp: "Uygulamada okuma",
    chapEnd: "Son",
    cardNote: "Tasarlanmış sahne · ekran kaydı değil",
  };
  const u = (d, k, vars = {}) => String((d.ui && d.ui[k]) ?? UI[k]).replace(/\{(\w+)\}/g, (m, x) => (vars[x] != null ? vars[x] : m));
  const wordLab = (t) => {
    const a = artOf(t);
    return a ? `<span class="art-${a}">${a}</span> ${esc(stem(t))}` : esc(t);
  };
  /** Söylenen kelimeyi yakar: süre harf sayısına göre bölünür (kaydın uzunluğu kadar). */
  const karaoke = (kws, t, a, dur) => {
    const wts = kws.map((x) => x.textContent.length + 2);
    const tot = wts.reduce((p, q) => p + q, 0);
    let acc = a + 0.1;
    kws.forEach((x, j) => {
      const a1 = acc;
      const b1 = acc + (wts[j] / tot) * dur * 0.94;
      acc = b1;
      x.classList.toggle("said", t >= a1);
      x.classList.toggle("now", t >= a1 && t < b1 + 0.05 && t < a + dur);
    });
  };

  Y.register("hikaye", { title: "Yavaş Almanca Hikâyeler", theme: "lacivert", series: "Yavaş Almanca Hikâyeler", ui: UI }, (X, d) => {
    const n = d.stories.length;
    // ---- kanca: solda başlık, sağda iki hikâyenin kartı
    X.chap(0, d.hook.chap);
    const hookEnd = Math.max(6.4, X.say(0.4, d.hook.say) + 0.6);
    {
      const S = scn(X, 0, hookEnd);
      Y.hookLeft(S, X, d.hook);
      const R = S.rg(7, 5);
      d.stories.forEach((st, i) => S.add(el(R, "card", `<div class="row mono" style="justify-content:space-between;font-size:22px;letter-spacing:.14em;color:var(--sub)"><span>${esc(u(d, "story", { i: i + 1, n }).toUpperCase())}</span><span>${esc(st.lv)}</span></div><div class="dsp t3 wr" style="margin-top:16px">${esc(st.title)}</div><div class="b2" style="margin-top:8px">${esc(st.titleTr)}</div>`, `padding:36px 44px;${i ? "margin-top:24px" : ""}`), 0.12 + i * 0.12, { dy: 20, r: i ? 1.5 : -1.5 }));
    }
    let t = hookEnd;

    d.stories.forEach((st, si) => {
      // hikâye kartı + kelimeler (Almancası, Türkçesi)
      X.chap(t, u(d, "chapWords", { t: st.title }));
      X.sfx(t + 0.1, "chap");
      {
        const a = t;
        const intro = X.say(a + 0.6, st.say) + 0.4;
        const b0 = Math.max(a + 4, intro);
        Y.chapterCard(X, a, b0, { idx: si, title: st.title, sub: st.titleTr, agenda: d.stories.map((x) => [x.title, x.lv]), label: u(d, "story", { i: si + 1, n }) });
        let x = X.say(b0 + 0.3, d.wordsSay) + 0.3;
        const rows = st.words.map((w) => {
          const s0 = x;
          const s1 = X.say(s0, w.de, { sub: false }) + 0.25;
          x = X.say(s1, w.tr, { sub: false }) + 0.6;
          return { w, s0, s1, e: x };
        });
        const b = x + 0.3;
        const S = scn(X, b0 + 0.1, b);
        const W = S.rg(0, 12);
        S.add(el(W, "row", `<span class="lab">${esc(u(d, "words"))}</span><span class="cap" style="margin-left:auto">${esc(st.title)}</span>`), 0);
        const grid = S.add(el(W, "", "", "margin-top:28px;display:grid;grid-template-columns:1fr 1fr;column-gap:32px"), 0.08, { dy: 20 });
        const per = Math.ceil(rows.length / 2);
        const rh = Math.min(116, Math.floor(560 / per));
        const cells = rows.map((r, i) => el(grid, "row", `<span class="dsp dd" style="font-size:${Math.round(rh * 0.44)}px;flex:none">${wordLab(r.w.de.t)}</span><span class="tt" style="margin-left:auto;font-size:${Math.round(rh * 0.32)}px;font-weight:600;color:var(--sub);white-space:nowrap">${esc(r.w.tr.t)}</span>`, `height:${rh}px;padding:0 32px;border-radius:24px;gap:24px;grid-row:${(i % per) + 1};grid-column:${i < per ? 1 : 2}`));
        X.L.push(() => cells.forEach((c) => fit(c.querySelector(".dd"), (SPAN(12) - 32) / 2 - 64 - c.querySelector(".tt").offsetWidth - 24, 30)));
        S.on((tt) => cells.forEach((c, i) => {
          const r = rows[i];
          const on = tt >= r.s0 && tt < r.e;
          c.style.opacity = tt >= r.s0 ? 1 : 0.25;
          c.style.background = on ? "var(--sf2)" : "transparent";
          c.style.boxShadow = on ? "inset 6px 0 0 var(--acc)" : "none";
          set(c.querySelector(".tt"), { o: tt >= r.s1 ? out3(P(tt, r.s1, 0.35)) : 0 });
        }));
        t = b + 0.2;
      }

      // paragraf paragraf yavaş okuma: söylenen kelime yanar, sonra Türkçesi
      X.chap(t, u(d, "chapRead", { t: st.title }));
      {
        const a = t;
        let x = a + 0.4;
        const ps = st.paras.map((p) => {
          const s0 = x;
          const e = X.say(s0 + 0.5, p.slow, { sub: false });
          const trAt = e + 0.3;
          x = trAt + Math.max(5, p.tr.length * 0.055) + 0.6;
          return { p, s0, a: s0 + 0.5, dur: e - s0 - 0.5, trAt, e: x };
        });
        const b = x;
        const S = scn(X, a, b);
        const W = S.rg(1, 10);
        const head = S.add(el(W, "row", `<span class="lab hd"></span><span class="cap" style="margin-left:auto">${esc(u(d, "slow"))} · ${esc(st.title)}</span>`), 0);
        const box = S.add(el(W, "card", "", "margin-top:28px;padding:48px 56px;min-height:300px"), 0.08, { dy: 20 });
        const deEl = el(box, "", "", "font-size:46px;line-height:1.38;font-weight:600");
        const trBox = S.add(el(W, "", "", "margin-top:28px;padding:0 8px"), 0.1);
        const trEl = el(trBox, "", "", "font-size:38px;line-height:1.38;font-weight:500;color:var(--sub)");
        X.L.push(() => {
          // en uzun paragraf sığsın: yazı boyu bir kez ayarlanır
          let fs = 46;
          for (const q of ps) {
            deEl.innerHTML = esc(q.p.slow.t);
            while (deEl.scrollHeight > 380 && fs > 32) deEl.style.fontSize = `${(fs -= 2)}px`;
          }
          deEl.innerHTML = "";
        });
        S.on((tt) => {
          const q = ps.find((y) => tt >= y.s0 && tt < y.e) || (tt < ps[0].s0 ? ps[0] : ps[ps.length - 1]);
          const i = ps.indexOf(q);
          if (box.dataset.k !== String(i)) {
            box.dataset.k = String(i);
            head.querySelector(".hd").textContent = u(d, "para", { i: i + 1, n: ps.length });
            deEl.innerHTML = q.p.slow.t.split(/\s+/).map((w) => `<span class="kw">${esc(w)}</span>`).join(" ");
            deEl.kws = [...deEl.querySelectorAll(".kw")];
            trEl.innerHTML = `<span class="mono" style="font-size:22px;letter-spacing:.14em;color:var(--acc);margin-right:16px">${esc(u(d, "trLab").toUpperCase())}</span>${esc(q.p.tr)}`;
          }
          karaoke(deEl.kws, tt, q.a, q.dur);
          const ko = q !== ps[ps.length - 1] ? inC(P(tt, q.e - 0.35, 0.35)) : 0;
          const k = outExpo(P(tt, q.s0, 0.6));
          set(deEl, { o: Math.min(k, 1 - ko), y: (1 - k) * 14 - ko * 8 });
          set(trEl, { o: Math.min(outExpo(P(tt, q.trAt, 0.6)), 1 - ko), y: (1 - outExpo(P(tt, q.trAt, 0.6))) * 12 });
        });
        t = b + 0.2;
      }

      // sorular: 5 sn, cevap, açıklama
      X.chap(t, u(d, "chapQuiz", { t: st.title }));
      {
        const a = t;
        let x = X.say(a + 0.4, d.quizSay) + 0.4;
        const qs = st.questions.map((q) => {
          const s0 = x;
          for (let s = 0; s < 5; s++) X.sfx(s0 + 0.8 + s, "tick");
          const rv = s0 + 5.8;
          X.sfx(rv, "ok");
          x = Math.max(rv + 3, X.say(rv + 0.5, q.say) + 0.8);
          return { q, s0, rv, e: x };
        });
        const b = x;
        const S = scn(X, a, b);
        const L = S.rg(0, 8);
        const lab = S.add(el(L, "lab", ""), 0);
        const qEl = S.add(el(L, "dsp t2 wr", "", "margin-top:24px"), 0.06);
        const opts = S.add(el(L, "", "", "margin-top:36px"), 0.12);
        const R = S.rg(8, 4, { align: "center" });
        const ring = S.add(el(R, "ring", Y.ringHTML(12), "width:220px;height:220px"), 0.1, { s0: 0.9 });
        ring.querySelector(".num").style.fontSize = "92px";
        const thk = S.add(el(R, "", esc(u(d, "think")), "margin-top:28px;font-size:44px;font-weight:700"), 0.16);
        S.on((tt) => {
          const q = qs.find((y) => tt >= y.s0 && tt < y.e) || (tt < qs[0].s0 ? qs[0] : qs[qs.length - 1]);
          const i = qs.indexOf(q);
          if (S.root.dataset.k !== String(i)) {
            S.root.dataset.k = String(i);
            lab.textContent = u(d, "quiz", { i: i + 1, n: qs.length });
            qEl.textContent = q.q.q;
            const tf = q.q.opts.length === 2;
            opts.innerHTML = q.q.opts.map((o, j) => `<div class="row op" style="gap:24px;height:84px;${j ? "border-top:2px dotted var(--ln)" : ""}"><span class="ob mono" style="flex:none;width:60px;height:60px;border-radius:30px;display:grid;place-items:center;font-size:26px;box-shadow:inset 0 0 0 2px var(--ln)">${tf ? o[0] : "abc"[j]}</span><span class="ot" style="font-size:40px;font-weight:600;white-space:nowrap">${esc(o)}</span></div>`).join("");
            opts.querySelectorAll(".ot").forEach((e) => fit(e, SPAN(8) - 90, 26));
            fit(qEl, SPAN(8), 44);
          }
          const rv = tt >= q.rv;
          opts.querySelectorAll(".op").forEach((op, j) => {
            const ok = rv && j === q.q.ans;
            const ob = op.querySelector(".ob");
            ob.style.background = ok ? "var(--ok)" : "transparent";
            ob.style.color = ok ? "#fff" : "";
            ob.style.boxShadow = ok ? "none" : "inset 0 0 0 2px var(--ln)";
            ob.style.transform = ok ? `scale(${(0.6 + 0.4 * spring(P(tt, q.rv, 0.6))).toFixed(3)})` : "";
            op.style.opacity = rv && !ok ? Y.lerp(1, 0.4, out3(P(tt, q.rv, 0.5))) : 1;
          });
          Y.setRing(ring, rv ? 0 : 1 - P(tt, q.s0 + 0.8, 5), rv ? "✓" : Math.max(1, Math.ceil(q.rv - tt)));
          ring.style.opacity = rv ? 0.35 : 1;
          thk.style.opacity = rv ? 0 : 1;
        });
        t = b + 0.2;
      }

      // baştan sona normal hızda: o an okunan paragraf vurgulu
      X.chap(t, u(d, "chapFull", { t: st.title }));
      {
        const a = t;
        let x = X.say(a + 0.4, d.fullSay) + 0.4;
        const ps = st.paras.map((p) => {
          const s0 = x;
          x = X.say(s0, p.normal, { sub: false }) + 0.5;
          return { s0, e: x };
        });
        const b = x + 0.4;
        const S = scn(X, a, b);
        const W = S.rg(0, 12);
        S.add(el(W, "row", `<span class="lab">${esc(u(d, "full"))}</span><span class="cap" style="margin-left:auto">${esc(st.title)}</span>`), 0);
        const box = S.add(el(W, "card", "", "margin-top:24px;padding:36px 48px"), 0.08, { dy: 20 });
        const pEls = st.paras.map((p, i) => el(box, "", esc(p.normal.t), `font-size:30px;line-height:1.4;font-weight:550;${i ? "margin-top:16px" : ""}`));
        X.L.push(() => {
          let fs = 30;
          while (box.scrollHeight > 600 && fs > 20) pEls.forEach((e) => (e.style.fontSize = `${(fs -= 1)}px`));
        });
        S.on((tt) => pEls.forEach((e, i) => {
          const on = tt >= ps[i].s0 && tt < ps[i].e;
          e.style.opacity = on ? 1 : tt >= ps[i].e ? 0.7 : 0.4;
          e.style.color = on ? "var(--ink)" : "var(--sub)";
        }));
        t = b + 0.2;
      }
    });

    // ---- uygulama ve son
    X.chap(t, u(d, "chapApp"));
    const pn = d.app.panel;
    const appEnd = Math.max(t + 10.5, X.say(t + 0.4, d.app.say) + 0.8);
    Y.appCard(X, t, appEnd, {
      ...d.app,
      panel: `<div class="row" style="justify-content:space-between"><span class="dsp t3">${esc(pn.title)}</span><span class="pill out" style="height:48px;font-size:24px;padding:0 18px">${esc(pn.lv)}</span></div>${pn.rows.map((r, i) => `<div class="row" style="gap:20px;height:80px;border-top:2px solid var(--ln);margin-top:${i ? 0 : 24}px"><span style="width:14px;height:14px;border-radius:7px;background:${i ? "var(--ln)" : "var(--acc)"}"></span><span style="font-size:32px;font-weight:700;flex:1">${esc(r[0])}</span><span class="mono" style="font-size:22px;color:var(--sub)">${esc(r[1])}</span></div>`).join("")}<div class="row" style="margin-top:20px;gap:12px"><span class="pill"><span class="ic" style="width:22px;height:22px">${ICONS.play}</span>${esc(pn.slow)}</span><span class="pill out">${esc(pn.normal)}</span></div>`,
      note: u(d, "cardNote"),
    });
    t = appEnd + 0.2;
    X.chap(t, u(d, "chapEnd"));
    X.say(t + 0.4, d.end.say);
    Y.endScreen(X, t, t + Y.END_LEN, d.end);

    // ---- kapak
    X.cover.innerHTML = `<div class="abs" style="inset:0;background:#101a36"></div><div class="abs" style="inset:0;background:radial-gradient(1100px 760px at 82% 18%,rgba(79,140,255,.28),transparent 70%)"></div>
      <div class="abs lab" style="left:112px;top:128px;font-size:30px;color:rgba(244,241,234,.66)">${esc(d.cover.lab)}</div>
      <div class="abs dsp cl" style="left:104px;top:210px;font-size:190px;line-height:.94;color:#f4f1ea">${esc(d.cover.lines[0])}<br><span style="color:#fb8f2a">${esc(d.cover.lines[1])}</span></div>
      <div class="abs card" style="left:1180px;top:200px;width:620px;padding:52px;background:rgba(255,255,255,.08);border:3px solid rgba(255,255,255,.18);color:#f4f1ea;border-radius:40px">${d.stories.map((s, i) => `<div style="${i ? "border-top:3px dotted rgba(255,255,255,.2);margin-top:36px;padding-top:36px" : ""}"><div style="font-size:30px;opacity:.65;font-weight:600">${esc(s.titleTr)}</div><div class="dsp cw" style="font-size:64px;margin-top:10px">${esc(s.title)}</div></div>`).join("")}</div>
      <div class="abs pill" style="left:112px;top:840px;font-size:44px;height:88px;padding:0 40px;border-radius:44px;background:rgba(251,143,42,.16);color:#fbb06a;box-shadow:inset 0 0 0 2px rgba(251,143,42,.6)">${esc(d.cover.pill)}</div>`;
    X.L.push(() => {
      X.cv.classList.add("show-cover");
      X.cover.querySelectorAll(".cw").forEach((e) => fit(e, 516, 40));
      fit(X.cover.querySelector(".cl"), 1000, 110);
      X.cv.classList.remove("show-cover");
    });
    return t + Y.END_LEN;
  });
})();
