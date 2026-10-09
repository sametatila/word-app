/*
  "Bunlar aynı değil": bölünmüş ekran, üstte A altta B, ortada ses dalgası çizgisi (Turuncu kutu).
  Tutma mantığı: kanca bir itiraz ("aynı değil") → panel ikiye bölünüyor, ayırıcı çizgi ses çalarken dalgaya
  dönüşüyor (göz ortada) → ortadaki düğme önce hoparlör, sonra geri sayım halkası, cevapta doğru yarıyı gösteren
  ok → çizgi kayıyor, doğru yarı büyüyüp turuncuya dönüyor → öteki kelime çalınırken o yarı nabız atıyor →
  özet + standart kapanış (panelin içinde).
  copy anahtarları (hepsi zorunlu): title, hook [2 satır: beyaz, koyu], recap (kapanış özet başlığı),
  caption, outro { series, ask }.
  Tur: 3–5 (rounds). Arayüz (A/B etiketleri, düğme, ok) şablonda.
  ui: yok (ekrandaki yazıların hepsi bölümden; A/B tek harf).
*/
E.register("duy-turuncu", { title: "Bunlar aynı değil", approach: "duy", theme: "turuncu" }, (X) => {
  const { h, set, p, ease, words, wordsIn, segments } = E;
  const D = X.data;
  // copy: bölüm dosyasından gelen ekran metinleri (sözleşme başlıktaki yorumda)
  const C = D.copy || {};
  for (const k of ["title", "hook", "recap", "caption", "outro"]) if (C[k] == null || C[k] === "") throw new Error(`duy-turuncu: copy.${k} eksik`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("duy-turuncu: copy.hook tam 2 satır olmalı");
  if (!C.outro.series || !C.outro.ask) throw new Error("duy-turuncu: copy.outro.series ve copy.outro.ask gerekli");
  if (!Array.isArray(D.rounds) || D.rounds.length < 3 || D.rounds.length > 5) throw new Error("duy-turuncu: 3–5 tur destekleniyor");
  // özet satırları: 5 turda biraz sıkışıp yukarı başlar, kapanış hapına (1176) değmesin
  const ROW0 = D.rounds.length > 4 ? 450 : 490;
  const STEP = D.rounds.length > 4 ? 132 : 136;
  const T = X.theme;
  const G = E.G;
  const OR = T.acc;
  const HOOK = 2.7;
  const THINK = 2.1;
  const PT = 250;
  const PB = 1530;
  const MID = 890;
  const NB = 34;
  let R = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  const wordHTML = (w) => `${w.artikel ? `<small>${w.artikel}</small>` : ""}<b>${w.parts.pre}<em>${w.parts.mid}</em>${w.parts.post}</b>`;
  const SPK = `<svg viewBox="0 0 24 24"><path fill="#fff" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z"/></svg>`;

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.6, name: "pop", f: 620 }, { t: HOOK - 0.4, name: "whoosh", d: 0.5 }];
      let t = HOOK + 0.3;
      R = D.rounds.map((r, i) => {
        const tgt = r.play ? r.b : r.a;
        const oth = r.play ? r.a : r.b;
        const o = { a: t, v1: t + 0.9, d1: dur(tgt.label) };
        o.think = o.v1 + o.d1 + 0.1;
        o.rev = o.think + THINK;
        o.v2 = o.rev + 1.0;
        o.d2 = dur(oth.label);
        o.b = o.v2 + o.d2 + 0.9;
        voice.push({ t: o.v1, text: tgt.label }, { t: o.v2, text: oth.label });
        sfx.push({ t: o.a, name: "whoosh", d: 0.35, v: 0.6 });
        [0.15, 0.85, 1.55].forEach((d, k) => sfx.push({ t: o.think + d, name: "tick", hi: k === 2 }));
        sfx.push({ t: o.rev, name: "impact", v: 0.45 }, { t: o.rev + 0.04, name: "ding", k: 0.94 + i * 0.05 });
        t = o.b;
        return o;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      D.rounds.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.13, name: "count", n: 77 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.0,
        voice,
        sfx,
        music: { style: "dembow", bpm: 96, root: 57, mode: "min", gain: 0.42, seed: "duy-turuncu" },
        notes: [
          { t: 0, title: "Kanca: itiraz", why: "Kanca izleyenin kafasındaki 'ikisi de aynı geliyor' düşüncesine cevap veriyor; ikinci satır görevi baştan veriyor." },
          { t: R[0].a, title: "Bölünmüş ekran", why: "Panel ikiye ayrılıyor: üstte A, altta B. Ayırıcı çizgi ses çalarken dalgaya dönüşüyor, göz ortada kalıyor." },
          { t: R[0].think, title: "Geri sayım", why: "Ortadaki düğme hoparlörden halkaya dönüyor, üç tık. İzleyen yukarı mı aşağı mı diye seçiyor." },
          { t: R[0].rev, title: "Ok ve büyüyen yarı", why: "Ok doğru yarıyı gösteriyor, çizgi kayıyor, kazanan yarı turuncuya dönüp büyüyor: cevap bütün ekrana yayılıyor." },
          { t: R[0].v2, title: "Öteki de çalınıyor", why: "Kaybeden yarı nabız atarken öteki kelime çalınıyor; iki ses arka arkaya, fark kulağa yerleşiyor." },
          { t: END, title: "Özet + kapanış", why: "Panelin içinde bütün çiftler ve Türkçeleri, standart kapanış ve kutulu imza." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .reg{left:48px;width:984px}
        .reg.a{top:${PT}px;border-radius:64px 64px 0 0}
        .reg.b{border-radius:0 0 64px 64px}
        .lab{left:${G.L}px;height:64px;padding:0 26px;border-radius:32px;background:${T.ink};color:#fff;font-size:34px;font-weight:800;display:flex;align-items:center;letter-spacing:.04em}
        .wbox{left:${G.L}px;width:${G.W}px;height:240px;display:flex;flex-direction:column;align-items:center;justify-content:center;white-space:nowrap}
        .wbox *{position:relative}
        .wbox small{display:block;font-size:42px;font-weight:700;color:${T.sub};margin-bottom:4px}
        .wbox b{display:inline-block;font-size:150px;font-weight:800;font-stretch:82%;letter-spacing:-.02em;line-height:1}
        .wbox em{font-style:normal;color:${OR}}
        .tr{left:${G.L}px;width:${G.W}px;text-align:center;white-space:nowrap;font-size:52px;font-weight:700}
        .line{left:${G.L}px;width:${G.W}px;height:140px;display:flex;align-items:center;justify-content:space-between}
        .line i{position:relative;width:12px;border-radius:6px;background:${T.ink}}
        .btn{left:${G.CX - 80}px;width:160px;height:160px;border-radius:50%;background:${T.ink};display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 16px ${T.panel}}
        .btn svg{position:absolute;left:40px;top:40px;width:80px;height:80px}
        .btn .ring{left:0;top:0;width:160px;height:160px}
        .btn .ring svg{left:0;top:0;width:160px;height:160px;transform:rotate(-90deg)}
        .btn .ring circle{fill:none;stroke-width:10;stroke-linecap:round}
        .btn .arw{left:0;top:0;width:160px;height:160px;display:flex;align-items:center;justify-content:center;font-size:84px;font-weight:800;color:${OR}}
        .e1{left:${G.L}px;width:${G.W}px;top:330px;text-align:center;font-size:100px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1}
        .row{left:${G.L}px;width:${G.W}px;height:120px;border-radius:32px;background:${T.surface};display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:0 32px;column-gap:24px}
        .row div{position:relative;display:flex;flex-direction:column;gap:2px;white-space:nowrap}
        .row div *{position:relative}
        .row b{font-size:46px;font-weight:800;line-height:1.1}
        .row span{font-size:30px;font-weight:600;color:${T.sub};line-height:1.2}
        .row div+div{border-left:2px solid rgba(27,27,29,.1);padding-left:24px}
      `);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 124, color: "#fff" }, { t: C.hook[1], size: 124, color: T.ink, delay: 0.55 }], { center: 780 });
      el.panel = E.panel(root);
      el.regA = h("div", "reg a", root);
      el.regB = h("div", "reg b", root);
      el.segs = segments(root, D.rounds.length);
      el.rounds = D.rounds.map((r) => {
        const o = { r };
        o.sides = [r.a, r.b].map((w, k) => {
          const lab = h("div", "lab", root, k ? "B" : "A");
          const wb = h("div", "wbox", root, wordHTML(w));
          const tr = h("div", "tr", root, w.tr);
          return { w, lab, wb, b: wb.querySelector("b"), tr };
        });
        return o;
      });
      el.line = h("div", "line", root);
      el.bars = Array.from({ length: NB }, () => h("i", null, el.line));
      el.btn = h("div", "btn", root, `${SPK}<div class="ring"><svg viewBox="0 0 160 160"><circle cx="80" cy="80" r="70" stroke="rgba(255,255,255,.18)"/><circle class="fg" cx="80" cy="80" r="70" stroke="${OR}"/></svg></div><div class="arw"></div>`);
      el.spk = el.btn.querySelector(":scope > svg");
      el.ring = el.btn.querySelector(".ring");
      el.fg = el.btn.querySelector(".fg");
      el.arw = el.btn.querySelector(".arw");
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
        o.sides.forEach((s) => {
          s.fit = Math.min(1, 760 / s.b.offsetWidth);
          if (s.tr.scrollWidth > G.W) s.tr.style.fontSize = `${Math.floor((52 * G.W) / s.tr.scrollWidth)}px`;
        }),
      );
    },

    render(t) {
      const ho = HOOK - 0.4;
      el.hook.render(t, 0.05, ho);
      const pk = p(t, HOOK - 0.35, 0.65);
      set(el.panel, { o: ease.outCubic(pk * 2), y: (1 - ease.spring(pk)) * 900 });
      const ri = R.findIndex((o) => t >= o.a && t < o.b);
      const cur = ri >= 0 ? R[ri] : null;
      const inRounds = t >= R[0].a - 0.3 && t < END;
      set(el.segs.el, { o: p(t, HOOK, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ri >= 0 ? ri : t >= END ? R.length : 0, cur ? p(t, cur.a, cur.b - cur.a) : 0);

      // ayırıcı: cevapta yanlış yarıya doğru kayar (doğru yarı büyür), tur sonunda ortaya döner
      let dv = MID;
      if (cur) {
        const win = el.rounds[ri].r.play; // 0: üst doğru, 1: alt doğru
        const go = ease.inOutCubic(p(t, cur.rev, 0.6)) * (1 - ease.inOutCubic(p(t, cur.b - 0.45, 0.45)));
        dv = MID + (win ? -1 : 1) * 90 * go;
      }
      const regO = Math.min(p(t, R[0].a - 0.3, 0.4), 1 - p(t, END - 0.2, 0.3));
      el.regA.style.height = `${dv - PT}px`;
      el.regB.style.top = `${dv}px`;
      el.regB.style.height = `${PB - dv}px`;
      set(el.regA, { o: regO });
      set(el.regB, { o: regO });
      const win = cur ? el.rounds[ri].r.play : -1;
      const rvG = cur ? p(t, cur.rev, 0.45) * (1 - p(t, cur.b - 0.45, 0.45)) : 0;
      el.regA.style.background = win === 0 && rvG > 0 ? `rgba(255,214,176,${(0.9 * rvG).toFixed(2)})` : "transparent";
      el.regB.style.background = win === 1 && rvG > 0 ? `rgba(255,214,176,${(0.9 * rvG).toFixed(2)})` : `rgba(27,27,29,${(0.04 * regO).toFixed(3)})`;
      if (win === 0 && rvG > 0) el.regB.style.background = `rgba(27,27,29,${(0.04 * regO).toFixed(3)})`;

      el.rounds.forEach((o, i) => {
        const r = R[i];
        const shown = t >= r.a - 0.05 && t < r.b + 0.05;
        o.sides.forEach((s) => [s.lab, s.wb, s.tr].forEach((e) => (e.style.display = shown ? "" : "none")));
        if (!shown) return;
        const k = p(t, r.a, 0.55);
        const out = ease.inCubic(p(t, r.b - 0.38, 0.38));
        const rv = p(t, r.rev, 0.5);
        o.sides.forEach((s, kk) => {
          const top = kk ? dv : PT;
          const bot = kk ? PB : dv;
          const c = (top + bot) / 2;
          const ok = kk === o.r.play;
          const echo = !ok && t >= r.v2 && t < r.v2 + r.d2 ? Math.sin(((t - r.v2) / r.d2) * Math.PI) : 0;
          s.lab.style.top = `${kk ? bot - 104 : top + 40}px`; // A üst köşede, B alt köşede: ortadaki dalgadan uzak
          set(s.lab, { o: Math.min(k * 2, 1 - out) });
          s.lab.style.background = ok && rv > 0 ? OR : T.ink;
          s.wb.style.top = `${c - 120 - (rv > 0 ? 30 * rv : 0)}px`;
          s.tr.style.top = `${c + 92}px`;
          set(s.wb, { o: Math.min(ease.outCubic(k * 2), 1 - out) * (ok ? 1 : 1 - rv * 0.4 + echo * 0.4), x: (1 - ease.outExpo(k)) * (kk ? -600 : 600) + out * (kk ? 600 : -600) });
          set(s.b, { s: s.fit * ((ok ? 1 + ease.spring(rv) * 0.08 : 1 - rv * 0.12) + echo * 0.06) });
          const tk = p(t, r.rev + 0.3, 0.4);
          set(s.tr, { o: tk * (1 - out) * (ok ? 1 : 0.75), y: (1 - ease.outCubic(tk)) * 18 });
        });
      });

      // dalga çizgisi + orta düğme
      const talking = cur && ((t >= cur.v1 && t < cur.v1 + cur.d1) || (t >= cur.v2 && t < cur.v2 + cur.d2));
      el.line.style.top = `${dv - 70}px`;
      set(el.line, { o: regO });
      el.bars.forEach((b, i) => {
        const nearBtn = Math.abs(i - (NB - 1) / 2) < 3.5;
        const amp = talking ? Math.abs(Math.sin(t * 14 + i * 0.8) * Math.sin(t * 5.3 + i * 0.41)) : 0;
        b.style.height = `${nearBtn ? 0 : (8 + amp * 112).toFixed(1)}px`;
        b.style.background = talking ? OR : "rgba(27,27,29,.22)";
      });
      el.btn.style.top = `${dv - 80}px`;
      set(el.btn, { o: regO, s: inRounds ? 1 + (talking ? Math.abs(Math.sin(t * 14)) * 0.05 : 0) : 0.8 });
      const C = 2 * Math.PI * 70;
      const ck = cur ? p(t, cur.think, THINK) : 0;
      el.fg.style.strokeDasharray = `${C}`;
      el.fg.style.strokeDashoffset = `${C * (1 - ck)}`;
      const thinking = cur && t >= cur.think - 0.1 && t < cur.rev;
      const revd = cur && t >= cur.rev;
      set(el.spk, { o: thinking || revd ? 0 : 1 });
      set(el.ring, { o: thinking ? 1 : 0 });
      el.arw.textContent = revd ? (el.rounds[ri].r.play ? "↓" : "↑") : "";
      set(el.arw, { o: revd ? 1 : 0, s: revd ? 0.5 + ease.spring(p(t, cur.rev, 0.5)) * 0.5 : 1 });

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
