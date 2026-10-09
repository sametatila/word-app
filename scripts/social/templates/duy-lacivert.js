/*
  "Frekansı yakala": radyo kadranı, iki istasyon, iğne doğru kelimeye oturuyor (Lacivert).
  Tutma mantığı: kanca bir oyun ("frekansı yakala") → radyo gövdesi: ekran, kadran, iki istasyon düğmesi →
  ses çalarken iğne frekans arıyor, hoparlör ızgarası yanıyor → 2 sn iğne iki istasyon arasında gidip geliyor
  (izleyen seçiyor) → cevapta iğne doğru istasyona oturuyor, ekranda Türkçesi → öteki istasyona geçip o kelime
  çalınıyor → özet + standart kapanış.
  copy anahtarları (hepsi zorunlu): title, hook [2 satır: büyük beyaz, küçük turuncu], recap (kapanış özet
  başlığı), caption, outro { series, ask }.
  Tur: 3–5 (rounds).
  ui (sabit yazılar; bölüm copy.ui ile ezer): listen "dinle…" ve ask "A mı, B mi?" (ekranın büyük yazısı),
  hint "Şimdi öbür istasyon", station "FM {f}  ·  {n}/{total}" (tur sırasında ekranın üst satırı; f iğnenin
  frekansı), stationIdle "FM {f}" (turlar dışında, f = 98.0).
*/
E.register("duy-lacivert", {
  title: "Frekansı yakala",
  approach: "duy",
  theme: "lacivert",
  ui: { listen: "dinle…", ask: "A mı, B mi?", hint: "Şimdi öbür istasyon", station: "FM {f}  ·  {n}/{total}", stationIdle: "FM {f}" },
}, (X) => {
  const { h, set, p, lerp, ease, words, wordsIn, segments } = E;
  const D = X.data;
  // copy: bölüm dosyasından gelen ekran metinleri (sözleşme başlıktaki yorumda)
  const C = D.copy || {};
  for (const k of ["title", "hook", "recap", "caption", "outro"]) if (C[k] == null || C[k] === "") throw new Error(`duy-lacivert: copy.${k} eksik`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("duy-lacivert: copy.hook tam 2 satır olmalı");
  if (!C.outro.series || !C.outro.ask) throw new Error("duy-lacivert: copy.outro.series ve copy.outro.ask gerekli");
  if (!Array.isArray(D.rounds) || D.rounds.length < 3 || D.rounds.length > 5) throw new Error("duy-lacivert: 3–5 tur destekleniyor");
  // özet satırları: 5 turda biraz sıkışıp yukarı başlar, kapanış hapına (1176) değmesin
  const ROW0 = D.rounds.length > 4 ? 450 : 490;
  const STEP = D.rounds.length > 4 ? 132 : 136;
  const T = X.theme;
  const G = E.G;
  const OR = T.acc;
  const MONO = '"DM Mono", ui-monospace, Menlo, monospace';
  const HOOK = 2.7;
  const THINK = 2.1;
  const BT = 340; // gövde üstü
  const DL = 176; // kadran sol
  const DR = 850; // kadran sağ
  const ST = [334, 692]; // istasyonlar (düğme ortaları)
  let R = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  const wordHTML = (w) => `${w.artikel ? `<small>${w.artikel}</small>` : ""}<b>${w.parts.pre}<em>${w.parts.mid}</em>${w.parts.post}</b>`;

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.6, name: "pop", f: 640 }, { t: HOOK - 0.45, name: "riser", d: 0.5 }];
      let t = HOOK + 0.2;
      R = D.rounds.map((r, i) => {
        const tgt = r.play ? r.b : r.a;
        const oth = r.play ? r.a : r.b;
        const o = { a: t, v1: t + 0.9, d1: dur(tgt.label) };
        o.think = o.v1 + o.d1 + 0.1;
        o.rev = o.think + THINK;
        o.v2 = o.rev + 1.1;
        o.d2 = dur(oth.label);
        o.b = o.v2 + o.d2 + 0.9;
        voice.push({ t: o.v1, text: tgt.label }, { t: o.v2, text: oth.label });
        sfx.push({ t: o.a, name: "riser", d: 0.6 });
        [0.15, 0.85, 1.55].forEach((d, k) => sfx.push({ t: o.think + d, name: "tick", hi: k === 2 }));
        sfx.push({ t: o.rev, name: "ding", k: 1.06 + i * 0.04 }, { t: o.v2 - 0.45, name: "whoosh", d: 0.35, v: 0.5 });
        t = o.b;
        return o;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      D.rounds.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.13, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.1,
        voice,
        sfx,
        music: { style: "garage", bpm: 132, root: 53, mode: "min", gain: 0.4, seed: "duy-lacivert" },
        notes: [
          { t: 0, title: "Kanca: oyun", why: "Kanca dinlemeyi bir oyuna çeviriyor. Radyo gövdesi alttan geliyor: ne yapılacağı ilk saniyede belli." },
          { t: R[0].a, title: "Radyo", why: "Ekran, kadran ve iki istasyon düğmesi: farklı harf düğmelerde işaretli. Ses çalarken iğne frekans arıyor, hoparlör ızgarası yanıyor." },
          { t: R[0].think, title: "İğne kararsız", why: "İğne iki istasyon arasında gidip geliyor, üç tık: izleyen kendi cevabını seçiyor." },
          { t: R[0].rev, title: "İstasyon bulundu", why: "İğne doğru istasyona oturuyor, düğme yanıyor, ekranda Türkçesi yazıyor. Tatmin edici bir 'klik' anı." },
          { t: R[0].v2, title: "Öbür istasyon", why: "İğne ötekine geçiyor ve o kelime çalınıyor: iki ses arka arkaya, fark kulağa yerleşiyor." },
          { t: END, title: "Özet + kapanış", why: "Bütün çiftler ve Türkçeleri liste olarak kalıyor (kaydetme). Standart kapanış ve kutulu imza." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      const ticks = Array.from({ length: 41 }, (_, i) => {
        const x = DL + ((DR - DL) * i) / 40;
        const big = i % 8 === 0;
        return `<i style="left:${x - BT * 0 - 2}px;height:${big ? 44 : 22}px;opacity:${big ? 0.8 : 0.4}"></i>${big ? `<span style="left:${x - 40}px">${88 + i / 2}</span>` : ""}`;
      }).join("");
      X.style(`
        .glow{width:900px;height:900px;border-radius:50%;filter:blur(170px);background:${OR}}
        .body{left:${G.L}px;top:${BT}px;width:${G.W}px;height:1010px;border-radius:48px;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 3px rgba(255,255,255,.08),0 40px 90px -40px rgba(0,0,0,.6)}
        .lcd{left:${G.L + 40}px;top:${BT + 40}px;width:${G.W - 80}px;height:190px;border-radius:32px;background:#070d1f;box-shadow:inset 0 0 0 2px rgba(251,143,42,.22)}
        .lcd .fm{left:36px;top:30px;font-family:${MONO};font-size:28px;letter-spacing:.14em;color:rgba(251,143,42,.7)}
        .lcd .big{left:36px;right:36px;top:80px;font-family:${MONO};font-size:62px;font-weight:500;color:${OR};white-space:nowrap;text-shadow:0 0 18px rgba(251,143,42,.45)}
        .dial{left:0;top:${BT + 300}px;width:1080px;height:150px}
        .dial i{top:0;width:4px;border-radius:2px;background:#fff}
        .dial span{top:58px;width:80px;text-align:center;font-family:${MONO};font-size:24px;color:${T.sub}}
        .mk{top:${BT + 262}px;width:56px;height:30px;font-size:26px;font-weight:800;text-align:center;color:${T.sub}}
        .needle{top:${BT + 276}px;width:8px;height:150px;margin-left:-4px;border-radius:4px;background:${OR};box-shadow:0 0 24px rgba(251,143,42,.8)}
        .btn{top:${BT + 486}px;width:357px;height:340px;border-radius:32px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 3px rgba(255,255,255,.08)}
        .btn .ab{left:24px;top:22px;width:52px;height:52px;border-radius:26px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:30px;font-weight:800}
        .btn .wbox{left:24px;right:24px;top:84px;height:170px;display:flex;flex-direction:column;align-items:center;justify-content:center;white-space:nowrap}
        .btn .wbox *{position:relative}
        .btn small{display:block;font-size:36px;font-weight:700;color:${T.sub};margin-bottom:2px}
        .btn .wbox b{display:inline-block;font-size:100px;font-weight:800;font-stretch:84%;letter-spacing:-.01em;line-height:1}
        .btn em{font-style:normal;color:${OR}}
        .btn .tr{left:24px;right:24px;top:270px;text-align:center;white-space:nowrap;font-size:40px;font-weight:600;color:${T.sub}}
        .grill{left:${G.L + 40}px;top:${BT + 900}px;width:${G.W - 80}px;height:40px;display:flex;justify-content:space-between;align-items:center}
        .grill i{position:relative;width:16px;height:16px;border-radius:8px;background:rgba(255,255,255,.14)}
        .hint{left:${G.L}px;width:${G.W}px;top:1392px;text-align:center;font-size:44px;font-weight:700;color:${T.sub}}
        .e1{left:${G.L}px;width:${G.W}px;top:330px;text-align:center;font-size:100px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1}
        .row{left:${G.L}px;width:${G.W}px;height:120px;border-radius:32px;background:${T.surface};display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:0 32px;column-gap:24px}
        .row div{position:relative;display:flex;flex-direction:column;gap:2px;white-space:nowrap}
        .row div *{position:relative}
        .row b{font-size:46px;font-weight:800;line-height:1.1}
        .row span{font-size:30px;font-weight:600;color:${T.sub};line-height:1.2}
        .row div+div{border-left:2px solid rgba(255,255,255,.12);padding-left:24px}
      `);
      el.g = h("div", "glow", root);
      el.segs = segments(root, D.rounds.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 124 }, { t: C.hook[1], size: 84, color: OR, delay: 0.5 }], { center: 780 });
      el.radio = h("div", "radio", root);
      el.radio.style.cssText = "left:0;top:0;width:1080px;height:1920px";
      el.body = h("div", "body", el.radio);
      el.lcd = h("div", "lcd", el.radio, `<div class="fm"></div><div class="big"></div>`);
      el.fm = el.lcd.querySelector(".fm");
      el.big = el.lcd.querySelector(".big");
      el.dial = h("div", "dial", el.radio, ticks);
      el.mks = ["A", "B"].map((l, k) => {
        const m = h("div", "mk", el.radio, l);
        m.style.left = `${ST[k] - 28}px`;
        return m;
      });
      el.needle = h("div", "needle", el.radio);
      el.grill = h("div", "grill", el.radio);
      el.dots = Array.from({ length: 30 }, () => h("i", null, el.grill));
      el.rounds = D.rounds.map((r) => ({
        r,
        btns: [r.a, r.b].map((w, k) => {
          const c = h("div", "btn", el.radio, `<div class="ab">${k ? "B" : "A"}</div><div class="wbox">${wordHTML(w)}</div><div class="tr">${w.tr}</div>`);
          c.style.left = `${k ? G.R - 40 - 357 : G.L + 40}px`;
          return { c, ab: c.querySelector(".ab"), wb: c.querySelector(".wbox b"), tr: c.querySelector(".tr") };
        }),
      }));
      el.hint = h("div", "hint", root, X.ui("hint"));
      el.e1 = h("div", "e1 flow", root);
      el.ew = words(el.e1, C.recap);
      el.rows = D.rounds.map((r, i) => {
        const x = h("div", "row", root, `<div><b>${r.a.de}</b><span>${r.a.tr}</span></div><div><b>${r.b.de}</b><span>${r.b.tr}</span></div>`);
        x.style.top = `${ROW0 + i * STEP}px`;
        return x;
      });
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.hook.layout();
      el.rounds.forEach((o) =>
        o.btns.forEach((b) => {
          b.fit = Math.min(1, 309 / b.wb.offsetWidth);
          if (b.tr.scrollWidth > 309) b.tr.style.fontSize = `${Math.floor((40 * 309) / b.tr.scrollWidth)}px`;
        }),
      );
    },

    render(t) {
      set(el.g, { o: 0.12, x: 300 + Math.sin(t * 0.37) * 140, y: 1100 + Math.cos(t * 0.3) * 120 });
      const ho = HOOK - 0.45;
      el.hook.render(t, 0.05, ho);
      const rk = p(t, HOOK - 0.4, 0.7);
      const rOut = ease.inCubic(p(t, END - 0.2, 0.4));
      set(el.radio, { o: Math.min(ease.outCubic(rk * 1.5), 1 - rOut), y: (1 - ease.spring(rk)) * 1100 - rOut * 80 });
      const ri = R.findIndex((o) => t >= o.a && t < o.b);
      const cur = ri >= 0 ? R[ri] : null;
      set(el.segs.el, { o: p(t, HOOK, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ri >= 0 ? ri : t >= END ? R.length : 0, cur ? p(t, cur.a, cur.b - cur.a) : 0);

      // iğne: ses çalarken arar, düşünürken iki istasyon arasında gidip gelir, cevapta oturur, sonra ötekine geçer
      const mid = (DL + DR) / 2;
      let nx = mid + Math.sin(t * 1.3) * 120;
      const talking = cur && ((t >= cur.v1 && t < cur.v1 + cur.d1) || (t >= cur.v2 && t < cur.v2 + cur.d2));
      if (cur) {
        const win = el.rounds[ri].r.play;
        if (t < cur.think) nx = mid + Math.sin((t - cur.a) * 2.4) * 260 * p(t, cur.a, 0.6) + Math.sin(t * 23) * 6 * (talking ? 1 : 0);
        else if (t < cur.rev) {
          const u = (t - cur.think) / THINK;
          nx = lerp(ST[0], ST[1], 0.5 + 0.5 * Math.sin(u * Math.PI * 4.5)) ;
        } else {
          const a = lerp(lerp(ST[0], ST[1], 0.5 + 0.5 * Math.sin(Math.PI * 4.5)), ST[win], ease.outBack(p(t, cur.rev, 0.5), 1.2));
          nx = t < cur.v2 - 0.45 ? a : lerp(ST[win], ST[1 - win], ease.inOutCubic(p(t, cur.v2 - 0.45, 0.4)));
          if (t > cur.b - 0.45) nx = lerp(ST[1 - win], mid, ease.inOutCubic(p(t, cur.b - 0.45, 0.45)));
        }
      }
      el.needle.style.left = `${nx.toFixed(1)}px`;
      el.dots.forEach((d, i) => {
        const a = talking ? Math.abs(Math.sin(t * 12 + i * 0.7) * Math.sin(t * 4.7 + i * 0.3)) : 0;
        d.style.background = a > 0.25 ? `rgba(251,143,42,${(0.3 + a * 0.7).toFixed(2)})` : "rgba(255,255,255,.14)";
      });
      // ekran
      if (cur) {
        const o = el.rounds[ri];
        const tgt = o.r.play ? o.r.b : o.r.a;
        const oth = o.r.play ? o.r.a : o.r.b;
        el.fm.textContent = X.ui("station", { f: (88 + ((nx - DL) / (DR - DL)) * 20).toFixed(1), n: ri + 1, total: R.length });
        const txt = t < cur.think ? X.ui("listen") : t < cur.rev ? X.ui("ask") : t < cur.v2 - 0.45 ? `${tgt.de} = ${tgt.tr}` : `${oth.de} = ${oth.tr}`;
        if (el.big.textContent !== txt) el.big.textContent = txt;
        const w = el.big.scrollWidth;
        el.big.style.transform = w > G.W - 152 ? `scale(${((G.W - 152) / w).toFixed(3)})` : "none";
        el.big.style.transformOrigin = "0 50%";
      } else {
        el.fm.textContent = X.ui("stationIdle", { f: "98.0" });
        el.big.textContent = "…";
        el.big.style.transform = "none";
      }

      el.rounds.forEach((o, i) => {
        const r = R[i];
        const shown = t >= r.a - 0.05 && t < r.b + 0.05;
        o.btns.forEach((b) => (b.c.style.display = shown ? "" : "none"));
        if (!shown) return;
        const k = p(t, r.a, 0.5);
        const out = ease.inCubic(p(t, r.b - 0.35, 0.35));
        const rv = p(t, r.rev, 0.45);
        o.btns.forEach((b, kk) => {
          const ok = kk === o.r.play;
          const tuned = (ok && t >= r.rev && t < r.v2 - 0.45) || (!ok && t >= r.v2 - 0.1 && t < r.b - 0.45);
          set(b.c, { o: Math.min(ease.outCubic(k * 2), 1 - out) * (ok || tuned ? 1 : 1 - rv * 0.4), y: (1 - ease.spring(p(t, r.a + kk * 0.08, 0.55))) * 60 });
          b.c.style.boxShadow = tuned ? `inset 0 0 0 5px ${OR},0 0 40px -6px rgba(251,143,42,.55)` : "inset 0 0 0 3px rgba(255,255,255,.08)";
          b.ab.style.background = tuned ? OR : "rgba(255,255,255,.12)";
          b.ab.style.color = tuned ? "#101a36" : "#fff";
          set(b.wb, { s: b.fit });
          set(b.tr, { o: p(t, r.rev + 0.3, 0.4) * (ok ? 1 : 0.8) });
        });
      });
      el.mks.forEach((m, k) => (m.style.color = cur && Math.abs(nx - ST[k]) < 14 ? OR : T.sub));
      const hk = cur ? p(t, cur.v2 - 0.45, 0.3) * (1 - p(t, cur.b - 0.4, 0.3)) : 0;
      set(el.hint, { o: hk, y: (1 - ease.outCubic(hk)) * 16 });

      wordsIn(el.ew, t, END + 0.1, { stagger: 0.08 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.5 + i * 0.13, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * 200 });
      });
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
