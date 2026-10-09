/*
  Kelime destesi, zaman çizgisi (Gece): sıralı bir yolculuk anlatan kelimeler (ör. iş görüşmesinden zamma),
  üstte duraklı çizgi.
  Tutma mantığı: kanca bir yolculuk vaat ediyor ve duraklı çizgi baştan görünüyor (sonu merak edilir) →
  her durakta kelime + telaffuz → "Ne demek?" düşünme çubuğu → anlam soldan açılır, günlük cümle sesle →
  tamamlanan durağın altında Türkçesi kalıyor (ilerleme hissi) → özet + kapanış.

  İçerik: D.items 3–6 kelime (deck), sırası bir akış olmalı (büyük sıra numarası bunu söylüyor).
  copy anahtarları (hepsi zorunlu):
    title    galeri/kayıt adı
    hook     tam 2 satır: [küçük giriş satırı (96 px), büyük turuncu satır (150 px)]
    caption  paylaşım metni + etiketler
    outro    { series, ask }
    summary  kapanış listesinin üstündeki başlık (ör. "İş görüşmesinden zamma")
  ui anahtarları (sabit yazılar, copy.ui ile ezilir):
    ask      kart altındaki düşünme sorusu ("Ne demek?")
*/
E.register("kelime-gece", { title: "Kelime destesi · zaman çizgisi", approach: "kelime", theme: "gece", ui: { ask: "Ne demek?" } }, (X) => {
  const { h, set, p, ease, words, karaoke } = E;
  const D = X.data;
  const C = D.copy;
  {
    const need = ["title", "hook", "caption", "outro", "summary"];
    if (!C) throw new Error("kelime-gece: copy yok");
    for (const k of need) if (C[k] == null) throw new Error(`kelime-gece: copy.${k} eksik`);
    if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("kelime-gece: copy.hook tam 2 satır olmalı");
    if (!C.outro.series || !C.outro.ask) throw new Error("kelime-gece: copy.outro.series ve copy.outro.ask gerekli");
    if (!(D.items.length >= 3 && D.items.length <= 6)) throw new Error(`kelime-gece: 3–6 kelime desteklenir (${D.items.length})`);
  }
  const N = D.items.length;
  const T = X.theme;
  const OR = T.acc;
  const HOOK = 2.7;
  const THINK = 1.3;
  const G = E.G;
  const NX = (i) => 186 + (i * 648) / (N - 1); // çizgi durakları 186–834: etiketler 96–930 içinde kalır
  const LW = Math.min(160, 648 / (N - 1) - 8); // durak etiketi genişliği (komşusuna değmesin)
  let S = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  const lab = (w) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.6, name: "pop", f: 620 }, ...D.items.map((_, i) => ({ t: 1.3 + i * 0.11, name: "pop", f: 500 + i * 90, v: 0.6 })), { t: HOOK - 0.35, name: "whoosh", d: 0.45 }];
      let t = HOOK;
      S = D.items.map((w, i) => {
        const r = { a: t, wv: t + 0.35, wd: dur(lab(w)) };
        r.think = r.wv + r.wd + 0.1;
        r.rev = r.think + THINK;
        r.sv = r.rev + 0.5;
        r.sd = dur(w.beispiel);
        r.b = r.sv + r.sd + 0.7;
        voice.push({ t: r.wv, text: lab(w) }, { t: r.sv, text: w.beispiel });
        sfx.push({ t: r.a, name: "whoosh", d: 0.35, v: 0.5 }, { t: r.a + 0.05, name: "count", n: 72 + i * 2 });
        sfx.push({ t: r.rev - 0.6, name: "riser", d: 0.58 }, { t: r.rev, name: "ding", k: 1 + i * 0.06, v: 0.7 });
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      D.items.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.12, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.2,
        voice,
        sfx,
        music: { style: "synthpop", bpm: 108, root: 50, mode: "lift", gain: 0.42, seed: "kelime-gece" },
        title: C.title,
        notes: [
          { t: 0, title: "Kanca: bir yolculuk", why: "Kanca bir hikâye vaat ediyor; duraklar çizgide baştan görünüyor, izleyen sonuna gelmek istiyor." },
          { t: S[0].a, title: "Durak 01", why: "Büyük sıra numarası yolun neresinde olduğunu söylüyor (kelimelerin sırası gerçekten bir akış olmalı). Kelime ve telaffuz önce." },
          { t: S[0].think, title: "Ne demek?", why: "1,3 sn düşünme çubuğu: izleyen kendini sınıyor, sonra anlam soldan açılıyor." },
          { t: S[1].a, title: "İlerleme", why: "Biten durağın altında Türkçesi kalıyor; çizgi doldukça izleyen yarıda bırakmıyor." },
          { t: END, title: "Özet + kapanış", why: "Kelimeler sırasıyla kalıyor; standart kapanış, kutulu imza." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .glow{width:900px;height:900px;border-radius:50%;filter:blur(170px);background:${OR};opacity:.13}
        .tl{left:0;width:1080px;top:0;height:200px}
        .tl .ln{left:${NX(0)}px;width:${NX(N - 1) - NX(0)}px;top:22px;height:6px;border-radius:3px;background:rgba(255,255,255,.18)}
        .tl .fl{left:${NX(0)}px;width:${NX(N - 1) - NX(0)}px;top:22px;height:6px;border-radius:3px;background:${OR};transform-origin:0 50%}
        .nd{top:0;width:50px;height:50px;margin-left:-25px;border-radius:50%;border:6px solid rgba(255,255,255,.35);background:${T.bg}}
        .nl{top:66px;width:${LW}px;margin-left:-${LW / 2}px;text-align:center;font-size:26px;font-weight:600;color:${T.sub};line-height:1.15}
        .cd{inset:0}
        .idx{left:${G.L - 6}px;top:530px;font-size:190px;font-weight:800;font-stretch:80%;line-height:1;color:transparent;-webkit-text-stroke:4px ${OR};letter-spacing:-.02em}
        .lvl{left:330px;top:576px;height:64px;padding:0 26px;border-radius:32px;background:rgba(255,255,255,.1);font-size:34px;font-weight:800;display:flex;align-items:center;letter-spacing:.04em}
        .art{left:${G.L}px;top:766px;font-size:60px;font-weight:700;color:${OR}}
        .wd{left:${G.L}px;top:852px;font-size:124px;font-weight:800;font-stretch:80%;letter-spacing:-.02em;line-height:1;white-space:nowrap;transform-origin:0 0}
        .ask{left:${G.L}px;top:1024px;font-size:44px;font-weight:700;color:${T.sub}}
        .tb{left:${G.L}px;top:1092px;width:420px;height:12px;border-radius:6px;background:rgba(255,255,255,.12);overflow:hidden}
        .tb i{left:0;top:0;bottom:0;width:100%;background:${OR};transform-origin:0 50%}
        .mean{left:${G.L}px;top:1000px;font-size:92px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;color:${OR};white-space:nowrap}
        .ex{left:${G.L}px;width:${G.W}px;top:1140px}
        .ex *{position:relative!important}
        .exd{display:block;font-size:52px;font-weight:700;line-height:1.18}
        .exd .w{opacity:.3}.exd .w.said{opacity:1}.exd .w.now{color:${OR}}
        .ext{display:block;margin-top:14px;font-size:38px;font-weight:500;line-height:1.3;color:${T.sub}}
        .e1{left:${G.L}px;width:${G.W}px;top:320px;text-align:center;font-size:52px;font-weight:700;color:${T.sub}}
        .row{left:${G.L}px;width:${G.W}px;height:108px;border-radius:32px;background:${T.surface};display:flex;align-items:center;gap:.4em;padding:0 36px;font-size:46px;font-weight:800;white-space:nowrap}
        .row *{position:relative!important}
        .row em{font-style:normal;font-size:.74em;color:${OR};min-width:1.4em}
        .row i{font-style:normal;color:${OR};font-size:.78em;font-weight:700}
        .row small{margin-left:auto;padding-left:.4em;white-space:nowrap;font-size:.78em;font-weight:600;color:${T.sub}}
      `);
      el.g = h("div", "glow", root);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 96 }, { t: C.hook[1], size: 150, color: OR, delay: 0.55 }], { center: 660 });
      el.tl = h("div", "tl", root);
      h("div", "ln", el.tl);
      el.fl = h("div", "fl", el.tl);
      el.nodes = D.items.map((w, i) => {
        const n = h("div", "nd", el.tl);
        n.style.left = `${NX(i)}px`;
        const l = h("div", "nl", el.tl, w.tr);
        l.style.left = `${NX(i)}px`;
        return { n, l };
      });
      el.cards = D.items.map((w, i) => {
        const c = h("div", "cd", root);
        const idx = h("div", "idx", c, String(i + 1).padStart(2, "0"));
        const lvl = h("div", "lvl", c, w.niveau);
        const art = w.artikel ? h("div", "art", c, w.artikel) : null;
        const wd = h("div", "wd", c, w.de);
        const ask = h("div", "ask", c, X.ui("ask"));
        const tb = h("div", "tb", c, "<i></i>").firstChild;
        const mean = h("div", "mean", c, w.tr);
        const ex = h("div", "ex", c);
        const exd = h("span", "exd", ex);
        const sp = words(exd, w.beispiel);
        const ext = h("span", "ext", ex, w.beispielTr);
        return { c, idx, lvl, art, wd, ask, tb, mean, sp, ext, r: S[i] };
      });
      el.e1 = h("div", "e1", root, C.summary);
      el.rows = D.items.map((w, i) => {
        const x = h("div", "row", root, `<em>${String(i + 1).padStart(2, "0")}</em>${w.artikel ? `<i>${w.artikel}</i>` : ""}<span>${w.de}</span><small>${w.tr}</small>`);
        x.style.top = `${420 + i * 124}px`;
        return x;
      });
      el.outro = E.outro(root, { series: C.outro.series, ask: C.outro.ask });
      el.fade = h("div", "fade", root);
      el.hook.layout();
      // uzun kelime yazı alanına sığar
      el.cards.forEach((c) => {
        const k = Math.min(1, G.W / c.wd.offsetWidth);
        c.fit = k;
      });
      el.rows.forEach((x) => {
        const k = Math.min(1, (G.W - 12) / (x.scrollWidth + 36)); // sağ dolgu taşmada sayılmıyor: ekle
        if (k < 1) x.style.fontSize = `${Math.floor(46 * k)}px`;
      });
    },

    render(t) {
      set(el.g, { o: 0.14, x: 400 + Math.sin(t * 0.4) * 140, y: -300 + Math.cos(t * 0.31) * 120 });
      const ho = HOOK - 0.35;
      el.hook.render(t, 0.05, ho);
      // çizgi: kancada ortada belirir, sonra üste çıkar
      const up = ease.inOutCubic(p(t, HOOK - 0.4, 0.7));
      const tlIn = p(t, 1.25, 0.5);
      const tlOut = ease.inCubic(p(t, END - 0.2, 0.35));
      set(el.tl, { o: Math.min(tlIn * 2, 1 - tlOut), y: 900 - up * 620 });
      const ci = S.findIndex((r) => t >= r.a && t < r.b);
      const fillTo = ci >= 0 ? ci + p(t, S[ci].a, S[ci].b - S[ci].a) : t >= END ? N - 1 : 0;
      el.fl.style.transform = `scaleX(${E.clamp(fillTo / (N - 1))})`;
      el.nodes.forEach((n, i) => {
        const k = p(t, 1.3 + i * 0.11, 0.45);
        const done = t >= (S[i]?.b ?? 1e9);
        const now = ci === i;
        set(n.n, { o: ease.outCubic(k * 2), s: (0.4 + ease.spring(k) * 0.6) * (now ? 1.25 + Math.sin(t * 6) * 0.05 : 1) });
        n.n.style.borderColor = done || now ? OR : "rgba(255,255,255,.35)";
        n.n.style.background = done ? OR : T.bg;
        set(n.l, { o: done ? p(t, S[i].b - 0.3, 0.4) : 0 });
      });

      el.cards.forEach((c) => {
        const r = c.r;
        const shown = t >= r.a - 0.05 && t <= r.b + 0.05;
        c.c.style.display = shown ? "" : "none";
        if (!shown) return;
        const k = p(t, r.a, 0.6);
        const out = ease.inCubic(p(t, r.b - 0.35, 0.35));
        set(c.c, { o: Math.min(ease.outCubic(k * 2), 1 - out), x: (1 - ease.outExpo(k)) * 500 - out * 500 });
        const ik = p(t, r.a + 0.05, 0.6);
        set(c.idx, { o: ease.outCubic(ik), y: (1 - ease.spring(ik)) * 80 });
        set(c.lvl, { o: p(t, r.a + 0.25, 0.3) });
        const wk = p(t, r.a + 0.15, 0.55);
        if (c.art) set(c.art, { o: ease.outCubic(wk), y: (1 - ease.spring(wk)) * 50 });
        set(c.wd, { o: ease.outCubic(wk), y: (1 - ease.spring(wk)) * 70, s: c.fit });
        const thinkOn = p(t, r.think - 0.15, 0.3) * (1 - p(t, r.rev - 0.1, 0.2));
        set(c.ask, { o: thinkOn });
        set(c.tb.parentNode, { o: thinkOn });
        c.tb.style.transform = `scaleX(${1 - p(t, r.think, THINK)})`;
        // anlam soldan açılır
        const mk = ease.outExpo(p(t, r.rev, 0.6));
        c.mean.style.clipPath = `inset(0 ${(100 - mk * 100).toFixed(1)}% 0 0)`;
        set(c.mean, { o: mk > 0 ? 1 : 0, x: (1 - mk) * -30 });
        karaoke(c.sp, t, r.sv, r.sd);
        set(c.sp[0].parentNode.parentNode, { o: p(t, r.rev + 0.2, 0.4) });
        const xk = p(t, r.sv + r.sd + 0.05, 0.4);
        set(c.ext, { o: xk, y: (1 - ease.outCubic(xk)) * 14 });
      });

      set(el.e1, { o: p(t, END, 0.4) });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.5 + i * 0.12, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * 200 });
      });
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
