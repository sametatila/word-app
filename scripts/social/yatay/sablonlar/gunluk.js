/*
  ALMANYA'DA GÜNLÜK HAYAT (Turuncu kutu). Bir Almanya durumu baştan sona: kelimeler → kalıplar (parça parça) →
  konuşmanın tamamı (memur ve sen, iki dilli altyazı) → satır satır açılım → "Sen ol" (senin satırların susar, Türkçe
  ipucu ve geri sayım, sonra doğrusu) → doğru mu yanlış mı → cep kartı → uygulama (yapay zekâ konuşmasının
  tasarlanmış sahnesi). Kaynak Patika konuşması (kelime, kalıp, "sıra sende" cümleleri, memurun açılış cümlesi);
  memurun öteki cümlelerini Claude yazar, editör düzeltir. Veri (data/social/yatay/gunluk-NNN.mjs):
    series, ep, hook{lab, lines[3], sub, say, ticket{office, label, num, rows[[ad, değer]]}},
    vocab[{title, sub, say, words[H.walk]}] (her grup bir bölüm), patterns[{lab, title, say, tiles[[de, rol, not]], ex, exTr,
    more[{line, tr}]}], dialog{sub, say, again, lines[{who: "memur"|"sen", line, tr}]}, explain{say, items[{at, mark, tag, note, say}]},
    roleplay{title, sub, say}, quiz{title, say, items[{text, ok, fix?, say}]}, pocket{title, sub, say, rows[[de, tr]]},
    app{…, panel{them, me, fix}}, end{…}, cover{lab, lines[2], pill}, ui{…}
*/
(() => {
  const { el, esc, set, fit, scn, COL, SPAN, P, out3, inC, outExpo, spring, lerp, ICONS, artOf, stem } = Y;
  const UI = {
    them: "Memur",
    me: "Sen",
    meTurn: "Sen · sıra sende",
    deAsk: "Almancası?",
    wordOf: "Kelime {i} / {n}",
    patternOf: "Kalıp {i} / {n}",
    trLab: "Türkçesi",
    right: "Doğru",
    wrong: "Yanlış",
    quizLab: "Doğru mu, yanlış mı?",
    lineOf: "Satır {i} / {n}",
    pocketNote: "Ekran görüntüsü al",
    verb: "fiil",
    chapVocab: "Kelimeler",
    chapAgain: "Altyazısız dinle",
    chapDialog: "Konuşmanın tamamı",
    chapExplain: "Satır satır",
    chapRole: "Sen ol",
    chapQuiz: "Doğru mu yanlış mı",
    chapPocket: "Cep kartı",
    chapApp: "Uygulamada konuş",
    chapEnd: "Son",
    cardNote: "Tasarlanmış sahne · ekran kaydı değil",
  };
  const u = (d, k, vars = {}) => String((d.ui && d.ui[k]) ?? UI[k]).replace(/\{(\w+)\}/g, (m, x) => (vars[x] != null ? vars[x] : m));
  const ME = "#d2783a";
  const THEM = "#5d80c4";
  /** Sıra fişi (Wartemarke): kanca ve kapak nesnesi. */
  const ticket = (tk, w, big = 128) => {
    const bars = Array.from({ length: 34 }, (_, i) => `<i style="width:${[3, 6, 3, 9, 3, 4][(i * 7) % 6]}px;height:52px;background:#3d342e;display:block"></i>`).join("");
    return `<div style="width:${w}px;background:#fffdfa;border-radius:32px;box-shadow:0 1px 0 rgba(116,49,15,.04),0 22px 44px -28px rgba(116,49,15,.42);overflow:hidden;color:#2c2520">
      <div style="padding:40px 44px 32px"><div class="mono" style="font-size:22px;letter-spacing:.16em">${esc(tk.office)}</div><div style="font-size:30px;font-weight:600;color:#8a6a52;margin-top:28px">${esc(tk.label)}</div><div class="dsp" style="font-size:${big}px;margin-top:4px;letter-spacing:-.03em">${esc(tk.num)}</div></div>
      <div style="height:0;border-top:4px dashed rgba(27,27,29,.18);margin:0 28px"></div>
      <div style="padding:24px 44px 36px;display:grid;gap:10px;font-size:30px">${tk.rows.map((r) => `<div class="row" style="justify-content:space-between"><span style="color:#8a6a52">${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join("")}<div class="row" style="gap:4px;margin-top:14px">${bars}</div></div></div>`;
  };
  const wordLab = (t) => {
    const a = artOf(t);
    return a ? `<span class="art-${a}">${a}</span> ${esc(stem(t))}` : esc(t);
  };

  Y.register("gunluk", { title: "Almanya'da Günlük Hayat", theme: "turuncu", series: "Almanya'da Günlük Hayat", ui: UI }, (X, d) => {
    // ---- kanca: solda söz, sağda sıra fişi
    X.chap(0, d.hook.chap);
    const hookEnd = Math.max(6.6, X.say(0.4, d.hook.say) + 0.6);
    {
      const S = scn(X, 0, hookEnd);
      const L = S.rg(0, 7);
      S.add(el(L, "lab", esc(d.hook.lab)), 0);
      d.hook.lines.forEach((x, i) => S.add(el(L, `dsp t1${i === d.hook.lines.length - 1 ? " acc" : ""}`, esc(x), `margin-top:${i ? 12 : 32}px`), 0.06 + i * 0.06));
      S.add(el(L, "b1 muted", esc(d.hook.sub), "margin-top:36px"), 0.28);
      X.L.push(() => [...L.querySelectorAll(".dsp")].forEach((e) => fit(e, SPAN(7), 64)));
      const R = S.rg(8, 4, { align: "center" });
      S.add(el(R, "", ticket(d.hook.ticket, SPAN(4) - 40, 144)), 0.1, { r: 3, dy: 32 });
    }
    let t = hookEnd + 0.2;

    // ---- kelimeler: her grup bir bölüm; solda liste (sayfa sayfa, en çok 8), sağda büyük kart
    (Array.isArray(d.vocab) ? d.vocab : [d.vocab]).forEach((grp) => {
      X.chap(t, grp.title);
      const ws = grp.words;
      const introEnd = X.say(t + 0.4, grp.say) + 0.3;
      const steps = ws.map((w) => {
        const a = introEnd > 0 ? 0 : 0;
        return { w, a };
      });
      let x = introEnd;
      steps.forEach((s) => {
        s.a = x;
        const e1 = X.say(x + 0.2, s.w.de, { sub: false }) + 0.3;
        s.tr = e1;
        const e2 = X.say(e1, s.w.tr, { sub: false }) + 0.5;
        s.ex = e2;
        s.end = X.say(e2, s.w.ex, { sub: false }) + 0.8;
        x = s.end;
      });
      const pages = [];
      for (let i = 0; i < ws.length; i += 8) pages.push(steps.slice(i, i + 8));
      pages.forEach((pg, pi) => {
        const a = pi ? pg[0].a : t;
        const b = pg[pg.length - 1].end;
        const S = scn(X, a, b);
        const Wv = S.rg(0, 12);
        S.add(el(Wv, "row", `<span class="lab">${esc(grp.title)}</span><span class="cap" style="margin-left:auto">${esc(grp.sub)}</span>`), 0);
        const pair = el(Wv, "row", "", "margin-top:28px;gap:32px;align-items:stretch");
        const list = S.add(el(pair, "card", "", `width:${SPAN(5)}px;padding:12px 0;overflow:hidden`), 0.1, { dy: 20 });
        const rh = 72;
        const rows = pg.map((s, i) => el(list, "row", `<span class="mono" style="width:96px;flex:none;font-size:22px;letter-spacing:.06em" class2>${artOf(s.w.de.t) ? `<span class="art-${artOf(s.w.de.t)}">${artOf(s.w.de.t)}</span>` : `<span class="muted">${esc(u(d, "verb"))}</span>`}</span><span style="flex:1;min-width:0;font-size:34px;font-weight:750;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(stem(s.w.de.t))}</span>`, `height:${rh}px;padding:0 32px;${i ? "border-top:2px solid var(--ln)" : ""}`));
        const big = S.add(el(pair, "card", "", `width:${SPAN(7)}px;padding:44px 52px;display:flex;flex-direction:column;position:relative;overflow:hidden`), 0.16, { dy: 20, s0: 0.97 });
        const bk = el(big, "row", `<span class="k1 mono" style="font-size:22px;letter-spacing:.14em;text-transform:uppercase;color:var(--sub)"></span><span style="margin-left:auto">${Y.waveBars(16)}</span>`);
        const bW = bk.querySelector(".wave");
        const bWord = el(big, "dsp t1", "", "margin-top:auto");
        const bTr = el(big, "", "", "margin-top:16px;font-size:44px;font-weight:600;color:var(--sub)");
        const bEx = el(big, "", "", "margin-top:28px;padding-top:24px;border-top:2px dotted var(--ln)");
        S.on((tt) => {
          const i = Math.max(0, pg.findIndex((s) => tt >= s.a && tt < s.end));
          const cur = tt < pg[0].a ? -1 : pg.findIndex((s) => tt >= s.a && tt < s.end);
          rows.forEach((r, j) => {
            const on = j === cur;
            r.style.background = on ? "var(--sf2)" : "transparent";
            r.style.boxShadow = on ? "inset 6px 0 0 var(--acc)" : "none";
            r.style.opacity = cur >= 0 && j > cur ? 0.45 : 1;
          });
          const s = pg[cur >= 0 ? cur : i];
          const key = String(steps.indexOf(s));
          if (big.dataset.k !== key) {
            big.dataset.k = key;
            bk.querySelector(".k1").textContent = u(d, "wordOf", { i: steps.indexOf(s) + 1, n: steps.length });
            bWord.innerHTML = wordLab(s.w.de.t);
            delete bWord.dataset.fs;
            bWord.style.fontSize = "";
            fit(bWord, SPAN(7) - 104, 56);
            bTr.textContent = s.w.tr.t;
            bEx.innerHTML = `<div style="font-size:34px;font-weight:600;font-style:italic;line-height:1.25">${esc(s.w.ex.t)}</div><div class="b2" style="margin-top:8px;font-size:28px">${esc(s.w.exTr)}</div>`;
          }
          const ko = cur >= 0 && s !== pg[pg.length - 1] ? inC(P(tt, s.end - 0.3, 0.3)) : 0;
          const k = cur < 0 ? 0 : outExpo(P(tt, s.a, 0.7));
          const o = cur < 0 ? 0 : Math.min(out3(Math.min(1, k * 2)), 1 - ko);
          set(bWord, { o, y: (1 - k) * 22 - ko * 12 });
          set(bTr, { o: cur < 0 ? 0 : Math.min(outExpo(P(tt, s.tr, 0.6)), 1 - ko), y: -ko * 12 });
          set(bEx, { o: cur < 0 ? 0 : Math.min(outExpo(P(tt, s.ex, 0.6)), 1 - ko), y: -ko * 12 });
          Y.animWave(bW, tt, X.level(tt), { min: 4, max: 40 });
        });
      });
      t = steps[steps.length - 1].end + 0.2;
    });

    // ---- kalıplar: parçalar yan yana, görevleri altlarında; örnek cümle seslendirilir
    d.patterns.forEach((pt, pi) => {
      X.chap(t, pt.title);
      const a = t;
      const sayEnd = X.say(a + 0.5, pt.say);
      const exA = sayEnd + 0.4;
      let exEnd = X.say(exA, pt.ex, { tr: pt.exTr });
      const more = (pt.more || []).map((m) => {
        const at = exEnd + 0.8;
        exEnd = X.say(at, m.line, { tr: m.tr });
        return { m, at };
      });
      const b = Math.max(a + 9, exEnd + 1.2);
      const S = scn(X, a, b);
      const W = S.rg(0, 12, { align: "center" });
      S.add(el(W, "row", `<span class="lab">${esc(u(d, "patternOf", { i: pi + 1, n: d.patterns.length }))} · ${esc(pt.lab)}</span>`), 0);
      const row = el(W, "row", "", "margin-top:48px;gap:24px;align-items:flex-start");
      const n = pt.tiles.length;
      const dur = Math.max(0.6, (sayEnd - a - 1) / n);
      const tiles = pt.tiles.map((p, i) => {
        const c = S.add(el(row, "", `<div class="tl dsp" style="font-size:80px;padding:32px 40px;border-radius:32px;background:var(--sf);box-shadow:var(--sh);white-space:nowrap">${esc(p[0])}</div><div style="width:4px;height:36px;background:var(--ln);margin:0 auto"></div><div style="text-align:center;max-width:360px"><div class="mono acc" style="font-size:22px;letter-spacing:.12em;text-transform:uppercase">${esc(p[1])}</div><div style="font-size:30px;font-weight:500;color:var(--sub);margin-top:8px">${esc(p[2])}</div></div>`, "display:flex;flex-direction:column;align-items:center"), 0.5 + i * 0.5, { dy: 28 });
        return { e: c.querySelector(".tl"), at: a + 0.6 + i * dur };
      });
      X.L.push(() => {
        const wsum = () => [...row.children].reduce((s, c) => s + c.offsetWidth, 0) + 24 * (n - 1);
        let fs = 80;
        while (wsum() > SPAN(12) && fs > 44) {
          fs -= 4;
          tiles.forEach((x) => (x.e.style.fontSize = `${fs}px`));
        }
      });
      S.add(el(W, "card", `<span class="lab plain" style="display:inline-flex">${esc(u(d, "trLab"))}</span><span class="dsp t3" style="margin-left:32px;white-space:normal">${esc(pt.exTr)}</span>`, `margin-top:${more.length ? 40 : 56}px;padding:28px 48px;display:flex;align-items:baseline`), exA - a);
      more.forEach(({ m, at }, i) => S.add(el(W, "row", `<span style="font-size:34px;font-weight:650;font-style:italic">${esc(m.line.t)}</span><span class="b2" style="margin-left:auto;font-size:28px">${esc(m.tr)}</span>`, `width:100%;gap:24px;padding:18px 48px;${i ? "" : "margin-top:16px;"}border-top:2px solid var(--ln)`), at - a));
      S.on((tt) => tiles.forEach((x, i) => {
        const on = tt >= x.at && tt < (tiles[i + 1] ? tiles[i + 1].at : exA);
        x.e.style.background = on ? "var(--sf2)" : "var(--sf)";
        x.e.style.boxShadow = on ? "inset 0 0 0 2px var(--accLine)" : "var(--sh)";
        x.e.style.color = on ? "var(--acc)" : "";
      }));
      t = b + 0.2;
    });

    // ---- sohbet balonları (tam konuşma ve "Sen ol" aynı düzende)
    const bubbleScene = (a, list, { lab, role, plain }) => {
      const S = scn(X, a, list[list.length - 1].end + 0.4);
      const L = S.rg(0, 4, { align: "center" });
      S.add(el(L, "", ticket(d.hook.ticket, SPAN(4) - 48, 112)), 0, { r: -2, dy: 24 });
      S.add(el(L, "cap", esc(lab), "margin-top:24px;text-align:center"), 0.2);
      const CW = SPAN(8);
      const box = el(S.root, "abs", "", `left:${COL(4)}px;top:${X.TOP}px;width:${CW}px;height:${X.BOT - X.TOP}px`);
      list.forEach((m) => {
        const me = m.l.who === "sen";
        m.e = el(box, "abs", "", `${me ? "right:0" : "left:0"};top:0;display:flex;gap:20px;align-items:flex-end;${me ? "flex-direction:row-reverse" : ""}`);
        el(m.e, "", esc((me ? u(d, "me") : u(d, "them"))[0]), `flex:none;width:72px;height:72px;border-radius:36px;display:grid;place-items:center;font-size:30px;font-weight:750;color:#fff;background:${me ? ME : THEM}`);
        const bb = el(m.e, "", "", `max-width:${CW - 120}px;padding:26px 34px 28px;border-radius:36px;${me ? "border-bottom-right-radius:10px;background:var(--me);color:var(--meInk)" : "border-bottom-left-radius:10px;background:var(--sf);box-shadow:var(--sh)"}`);
        el(bb, "mono", esc(me && role ? u(d, "meTurn") : me ? u(d, "me") : u(d, "them")), "font-size:20px;letter-spacing:.14em;text-transform:uppercase;opacity:.55");
        if (plain) {
          el(bb, "", esc(m.l.line.t), "font-size:38px;font-weight:700;line-height:1.2;font-style:italic;margin-top:10px");
        } else if (me && role) {
          const g = el(bb, "", "", "display:grid;margin-top:10px");
          m.q1 = el(g, "", `<div style="font-size:40px;font-weight:700;line-height:1.2">${esc(m.l.ask || m.l.tr)}</div><div class="row" style="gap:16px;margin-top:16px"><span style="font-size:28px;color:var(--sub)">${esc(u(d, "deAsk"))}</span><span style="flex:1;height:6px;border-radius:3px;background:rgba(44,37,32,.1);overflow:hidden"><i style="display:block;height:100%;background:var(--acc);transform-origin:0 50%"></i></span></div>`, "grid-area:1/1");
          m.q2 = el(g, "", `<div style="font-size:40px;font-weight:700;line-height:1.2;font-style:italic">${esc(m.l.line.t)}</div><div style="font-size:28px;font-weight:500;color:var(--sub);margin-top:10px">${esc(m.l.tr)}</div>`, "grid-area:1/1");
          m.bar = m.q1.querySelector("i");
        } else {
          el(bb, "", esc(m.l.line.t), "font-size:38px;font-weight:700;line-height:1.2;font-style:italic;margin-top:10px");
          el(bb, "", esc(m.l.tr), "font-size:28px;font-weight:500;color:var(--sub);margin-top:10px");
        }
      });
      X.L.push(() => list.forEach((m) => (m.hgt = m.e.offsetHeight)));
      const GAP = 24;
      const AH = X.BOT - X.TOP;
      const lay = (n) => {
        const pos = new Map();
        let y = AH;
        for (let i = n - 1; i >= Math.max(0, n - 3); i--) {
          if (y - list[i].hgt < 0) break;
          y -= list[i].hgt;
          pos.set(list[i], y);
          y -= GAP;
        }
        const off = (y + GAP) / 2;
        pos.forEach((v, k) => pos.set(k, v - off));
        return pos;
      };
      S.on((tt, out) => {
        const n = list.filter((m) => tt >= m.a).length;
        const now = lay(n);
        const prev = lay(n - 1);
        const k = n ? out3(P(tt, list[n - 1].a, 0.6)) : 1;
        list.forEach((m) => {
          const y1 = now.get(m);
          const y0 = prev.get(m);
          if (y1 == null && y0 == null) return set(m.e, { o: 0 });
          if (y1 == null) return set(m.e, { o: Math.max(0, 1 - k * 1.6) * 0.5 * (1 - out), y: y0 - k * 80 });
          const isNew = y0 == null;
          const y = isNew ? y1 + (1 - k) * 60 : lerp(y0, y1, k);
          const last = m === list[n - 1];
          set(m.e, { o: (isNew ? Math.min(1, k * 1.6) : 1) * (last ? 1 : m === list[n - 2] ? lerp(1, 0.55, k) : 0.55) * (1 - out), y });
          if (m.q1) {
            const ok = tt >= m.rv;
            m.q1.style.visibility = ok ? "hidden" : "visible";
            m.q2.style.visibility = ok ? "visible" : "hidden";
            m.bar.style.transform = `scaleX(${1 - P(tt, m.a, m.rv - m.a)})`;
          }
        });
      });
    };

    // ---- konuşmanın tamamı (altyazı iki dilli)
    X.chap(t, u(d, "chapDialog"));
    {
      const a = t;
      let x = X.say(a + 0.4, d.dialog.say) + 0.4;
      const list = d.dialog.lines.map((l) => {
        const m = { l, a: x };
        m.end = X.say(x, l.line, { who: l.who === "sen" ? u(d, "me") : u(d, "them"), tr: l.tr }) + 0.5;
        x = m.end;
        return m;
      });
      bubbleScene(a, list, { lab: d.dialog.sub });
      t = list[list.length - 1].end + 0.6;
    }
    // ---- bir kez daha, altyazısız ve Türkçesiz: yalnız kulak
    if (d.dialog.again) {
      X.chap(t, u(d, "chapAgain"));
      const a = t;
      let x = X.say(a + 0.4, d.dialog.again) + 0.4;
      const list = d.dialog.lines.map((l) => {
        const m = { l, a: x };
        m.end = X.say(x, l.line, { sub: false }) + 0.45;
        x = m.end;
        return m;
      });
      bubbleScene(a, list, { lab: d.dialog.sub, plain: true });
      t = list[list.length - 1].end + 0.6;
    }

    // ---- satır satır: memurun cümleleri, vurgulu kısım ve not
    X.chap(t, u(d, "chapExplain"));
    {
      const a = t;
      let x = X.say(a + 0.4, d.explain.say) + 0.3;
      const items = d.explain.items.map((it) => {
        const l = d.dialog.lines[it.at];
        const m = { it, l, a: x };
        const e1 = X.say(x + 0.3, l.line, { sub: false }) + 0.4;
        m.sayAt = e1;
        m.end = Math.max(e1 + 3, X.say(e1, it.say) + 0.6);
        x = m.end;
        return m;
      });
      const b = x;
      const S = scn(X, a, b);
      const W = S.rg(1, 10, { align: "center" });
      const head = S.add(el(W, "lab c", ""), 0);
      const card = S.add(el(W, "card", "", `margin-top:36px;width:${SPAN(10)}px;padding:56px 64px;text-align:center`), 0.1, { dy: 20 });
      const lineEl = el(card, "dsp wr", "", "font-size:68px;line-height:1.1");
      const trEl = el(card, "b1 muted", "", "margin-top:24px");
      const noteEl = S.add(el(W, "card", "", "margin-top:28px;padding:28px 40px;font-size:36px;line-height:1.35;font-weight:500;text-align:left;width:100%"), 0.2, { dy: 16 });
      S.on((tt) => {
        const m = items.find((q) => tt >= q.a && tt < q.end) || (tt < items[0].a ? items[0] : items[items.length - 1]);
        const idx = items.indexOf(m);
        if (card.dataset.k !== String(idx)) {
          card.dataset.k = String(idx);
          head.textContent = u(d, "lineOf", { i: idx + 1, n: items.length });
          lineEl.innerHTML = Y.md(m.l.line.t.replace(m.it.mark, `**${m.it.mark}**`));
          trEl.textContent = m.l.tr;
          noteEl.innerHTML = `<span class="mono acc" style="font-size:22px;letter-spacing:.14em;text-transform:uppercase;margin-right:20px">${esc(m.it.tag)}</span>${esc(m.it.note)}`;
        }
        const ko = m !== items[items.length - 1] ? inC(P(tt, m.end - 0.35, 0.35)) : 0;
        const k = outExpo(P(tt, m.a, 0.7));
        set(lineEl, { o: Math.min(k, 1 - ko), y: (1 - k) * 18 - ko * 10 });
        set(trEl, { o: Math.min(k, 1 - ko), y: -ko * 10 });
        set(noteEl, { o: Math.min(outExpo(P(tt, m.sayAt, 0.6)), 1 - ko), y: (1 - outExpo(P(tt, m.sayAt, 0.6))) * 12 });
      });
      t = b + 0.2;
    }

    // ---- sen ol: senin satırların susar; ipucu, geri sayım, sonra doğrusu
    X.chap(t, u(d, "chapRole"));
    {
      const a = t;
      let x = X.say(a + 0.4, d.roleplay.say) + 0.5;
      const list = d.dialog.lines.map((l) => {
        const m = { l, a: x };
        if (l.who === "sen") {
          m.rv = x + 4.2;
          for (let s = 0; s < 4; s++) X.sfx(x + 0.2 + s, "tick");
          m.end = X.say(m.rv, l.line, { who: u(d, "me"), tr: l.tr }) + 0.8;
        } else {
          m.rv = x;
          m.end = X.say(x, l.line, { who: u(d, "them"), tr: l.tr }) + 0.5;
        }
        x = m.end;
        return m;
      });
      bubbleScene(a, list, { lab: d.roleplay.sub, role: true });
      t = list[list.length - 1].end + 0.6;
    }

    // ---- doğru mu yanlış mı
    X.chap(t, u(d, "chapQuiz"));
    {
      const a = t;
      let x = X.say(a + 0.4, d.quiz.say) + 0.4;
      const items = d.quiz.items.map((q) => {
        const m = { q, a: x, rv: x + 4.5 };
        for (let s = 0; s < 4; s++) X.sfx(x + 0.5 + s, "tick");
        X.sfx(m.rv, "ok");
        m.end = Math.max(m.rv + 3, X.say(m.rv + 0.4, q.say) + 0.8);
        x = m.end;
        return m;
      });
      const b = x;
      const S = scn(X, a, b);
      const W = S.rg(1, 10, { align: "center" });
      S.add(el(W, "lab", esc(u(d, "quizLab"))), 0);
      const card = S.add(el(W, "card", "", `margin-top:40px;width:${SPAN(10)}px;padding:96px 64px 64px;text-align:center`), 0.1, { dy: 20 });
      const txt = el(card, "dsp t1 wr", "", "position:relative");
      const bar = el(card, "", "<i style='display:block;height:100%;background:var(--acc);transform-origin:0 50%'></i>", "margin:40px auto 0;width:480px;height:8px;border-radius:4px;background:var(--ln);overflow:hidden").firstChild;
      const btns = S.add(el(W, "row", `<span class="pill out b-ok" style="height:96px;padding:0 56px;font-size:40px;border-radius:48px">${esc(u(d, "right"))}</span><span class="pill out b-no" style="height:96px;padding:0 56px;font-size:40px;border-radius:48px">${esc(u(d, "wrong"))}</span>`, "margin-top:48px;gap:32px"), 0.3);
      const bOk = btns.querySelector(".b-ok");
      const bNo = btns.querySelector(".b-no");
      S.on((tt) => {
        const m = items.find((q) => tt >= q.a && tt < q.end) || (tt < items[0].a ? items[0] : items[items.length - 1]);
        const idx = items.indexOf(m);
        const rv = tt >= m.rv;
        const k = `${idx}:${rv}`;
        if (card.dataset.k !== k) {
          card.dataset.k = k;
          txt.innerHTML = rv && !m.q.ok && m.q.fix ? `<s style="color:var(--bad);text-decoration-thickness:5px">${esc(m.q.text)}</s><div style="color:var(--ok);margin-top:20px">${esc(m.q.fix)}</div>` : esc(m.q.text);
        }
        const ko = m !== items[items.length - 1] ? inC(P(tt, m.end - 0.3, 0.3)) : 0;
        set(txt, { o: Math.min(outExpo(P(tt, m.a, 0.6)), 1 - ko) });
        bar.style.transform = `scaleX(${1 - P(tt, m.a + 0.4, m.rv - m.a - 0.4)})`;
        bar.parentNode.style.opacity = rv ? 0 : 1;
        const good = m.q.ok ? bOk : bNo;
        const bad = m.q.ok ? bNo : bOk;
        const kr = rv ? spring(P(tt, m.rv, 0.6)) : 0;
        good.style.background = rv ? "var(--okSoft)" : "transparent";
        good.style.color = rv ? "var(--ok)" : "";
        good.style.boxShadow = rv ? "inset 0 0 0 2px var(--ok)" : "";
        good.style.transform = `scale(${(1 + 0.04 * Math.sin(Math.PI * Math.min(1, kr))).toFixed(3)})`;
        bad.style.background = "transparent";
        bad.style.color = "";
        bad.style.boxShadow = "";
        bad.style.transform = "";
        bad.style.opacity = rv ? 0.4 : 1;
        good.style.opacity = 1;
      });
      t = b + 0.2;
    }

    // ---- cep kartı
    X.chap(t, u(d, "chapPocket"));
    {
      const a = t;
      const b = Math.max(a + 10.5, X.say(a + 0.5, d.pocket.say) + 1.5);
      const S = scn(X, a, b);
      const W = S.rg(1, 10, { align: "center" });
      S.add(el(W, "row", `<span class="lab">${esc(d.pocket.title)}</span><span class="cap" style="margin-left:auto">${esc(u(d, "pocketNote"))}</span>`, "width:100%"), 0);
      const card = S.add(el(W, "card", "", `margin-top:28px;width:${SPAN(10)}px;padding:20px 0`), 0.1, { dy: 20 });
      const prh = Math.min(88, Math.floor(440 / d.pocket.rows.length));
      d.pocket.rows.forEach((r, i) => el(card, "row", `<span style="flex:1.2;font-size:${Math.min(36, Math.round(prh * 0.46))}px;font-weight:700;font-style:italic">${esc(r[0])}</span><span style="flex:1;font-size:${Math.min(30, Math.round(prh * 0.4))}px;color:var(--sub);text-align:right">${esc(r[1])}</span>`, `height:${prh}px;padding:0 48px;gap:24px;${i ? "border-top:2px solid var(--ln)" : ""}`));
      S.add(el(W, "b2", esc(d.pocket.sub), "margin-top:20px;text-align:center"), 0.3);
      t = b;
    }

    // ---- uygulama ve son
    X.chap(t, u(d, "chapApp"));
    const pn = d.app.panel;
    const appEnd = Math.max(t + 10.5, X.say(t + 0.4, d.app.say) + 0.8);
    Y.appCard(X, t, appEnd, {
      ...d.app,
      panel: `<div style="display:grid;gap:20px;font-size:30px;line-height:1.3"><div style="background:var(--sf2);border-radius:28px;border-bottom-left-radius:8px;padding:22px 26px;max-width:90%"><div class="mono" style="font-size:18px;letter-spacing:.12em;opacity:.55">${esc(u(d, "them").toUpperCase())}</div><i>${esc(pn.them)}</i></div><div style="background:var(--me);color:var(--meInk);border-radius:28px;border-bottom-right-radius:8px;padding:22px 26px;max-width:90%;justify-self:end"><div class="mono" style="font-size:18px;letter-spacing:.12em;opacity:.55">${esc(u(d, "me").toUpperCase())}</div><i>${esc(pn.me)}</i></div><div class="row" style="justify-self:end;gap:12px;font-size:26px;font-weight:650;padding:10px 18px;border-radius:14px;background:var(--okSoft);color:var(--ok)"><span class="ic" style="width:26px;height:26px">${ICONS.check}</span>${esc(pn.fix)}</div></div>`,
      note: u(d, "cardNote"),
    });
    t = appEnd + 0.2;
    X.chap(t, u(d, "chapEnd"));
    X.say(t + 0.4, d.end.say);
    Y.endScreen(X, t, t + Y.END_LEN, d.end);

    // ---- kapak
    X.cover.innerHTML = `<div class="abs" style="inset:0;background:#f87612"></div><div class="abs" style="left:48px;top:48px;right:48px;bottom:48px;background:#fffaf5;border-radius:56px"></div>
      <div class="abs lab" style="left:120px;top:128px;font-size:30px;color:#8a6a52">${esc(d.cover.lab)}</div>
      <div class="abs dsp cl" style="left:112px;top:200px;font-size:150px;color:#1f1b18;line-height:1">${esc(d.cover.lines[0])}</div>
      <div class="abs dsp c2" style="left:112px;top:430px;font-size:104px;color:#e46a12;line-height:1.02;white-space:normal;width:1100px">${esc(d.cover.lines[1])}</div>
      ${d.cover.pill ? `<div class="abs pill" style="left:112px;top:780px;font-size:44px;height:88px;padding:0 40px;border-radius:44px">${esc(d.cover.pill)}</div>` : ""}
      <div class="abs" style="left:1310px;top:150px;transform:rotate(3deg)">${ticket(d.hook.ticket, 480, 132)}</div>`;
    X.L.push(() => {
      X.cv.classList.add("show-cover");
      fit(X.cover.querySelector(".cl"), 1150, 90);
      X.cv.classList.remove("show-cover");
    });
    return t + Y.END_LEN;
  });
})();
