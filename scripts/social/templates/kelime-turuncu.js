/*
  Kelime destesi, kart çevirme (Turuncu kutu).
  Tutma mantığı: kanca bir vaat + baştan görünen kartlık deste (sonunu merak ettiren sayı) → her kartta
  önce kelime ve telaffuz, kısa düşünme süresi (izleyen kendini sınıyor) → kart dönüyor: anlam + günlük
  hayattan örnek cümle sesle → üstte ilerleme → kapanış: özet liste + seri sözü (takip sebebi) + yorum sorusu.

  İçerik: D.items 3–6 kelime (deck).
  copy anahtarları (hepsi zorunlu):
    title    galeri/kayıt adı
    hook     tam 3 satır: [beyaz giriş (84 px), beyaz büyük satır (148 px), koyu büyük satır (148 px)]
    caption  paylaşım metni + etiketler
    outro    { series, ask }
    summary  kapanış panelinin başlığı (ör. "Kaçını biliyordun?")
  ui anahtarları (sabit yazılar, copy.ui ile ezilir):
    ask      kart ön yüzündeki düşünme sorusu ("Ne demek?")
*/
E.register("kelime-turuncu", { title: "Kelime destesi · kart çevirme", approach: "kelime", theme: "turuncu", ui: { ask: "Ne demek?" } }, (X) => {
  const { h, set, p, ease, words, wordsIn, karaoke, segments } = E;
  const D = X.data;
  const C = D.copy;
  {
    const need = ["title", "hook", "caption", "outro", "summary"];
    if (!C) throw new Error("kelime-turuncu: copy yok");
    for (const k of need) if (C[k] == null) throw new Error(`kelime-turuncu: copy.${k} eksik`);
    if (!Array.isArray(C.hook) || C.hook.length !== 3) throw new Error("kelime-turuncu: copy.hook tam 3 satır olmalı");
    if (!C.outro.series || !C.outro.ask) throw new Error("kelime-turuncu: copy.outro.series ve copy.outro.ask gerekli");
    if (!(D.items.length >= 3 && D.items.length <= 6)) throw new Error(`kelime-turuncu: 3–6 kelime desteklenir (${D.items.length})`);
  }
  const N = D.items.length;
  const MID = (N - 1) / 2; // kancadaki deste yelpazesinin ortası
  // kapanış listesi: 5'e kadar 460'tan 128 arayla; 6'da aralık ve satır boyu daralır (seri hapına değmesin)
  const ROW_STEP = N <= 5 ? 128 : 116;
  const ROW_H = Math.min(112, ROW_STEP - 12);
  const BG = "#f87612";
  const INK = "#1b1b1d";
  const G = E.G;
  const HOOK = 2.8;
  const THINK = 1.3;
  let S = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  let cards = [];
  const lab = (w) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

  return {
    plan(dur) {
      const voice = [];
      const sfx = [
        { t: 0.05, name: "impact", v: 0.7 },
        { t: 0.45, name: "pop", f: 560 },
        { t: 0.9, name: "pop", f: 660 },
        ...D.items.map((_, i) => ({ t: 1.5 + i * 0.09, name: "flip" })),
        { t: HOOK - 0.32, name: "whoosh", d: 0.45 },
      ];
      let t = HOOK;
      S = D.items.map((w, i) => {
        const r = { a: t };
        r.wv = t + 0.4;
        r.wd = dur(lab(w));
        r.think = r.wv + r.wd + 0.1;
        r.flip = r.think + THINK;
        r.sv = r.flip + 0.6;
        r.sd = dur(w.beispiel);
        r.b = r.sv + r.sd + 0.75;
        voice.push({ t: r.wv, text: lab(w) }, { t: r.sv, text: w.beispiel });
        sfx.push({ t: r.a, name: "whoosh", d: 0.35, v: 0.6 });
        sfx.push({ t: r.flip - 0.7, name: "riser", d: 0.68 });
        sfx.push({ t: r.flip, name: "flip" }, { t: r.flip + 0.12, name: "ding", k: 1 + i * 0.06, v: 0.7 });
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.5 + E.OUTRO_LEN;
      D.items.forEach((_, i) => sfx.push({ t: END + 0.7 + i * 0.13, name: "count", n: 77 + i * 2 }));
      sfx.push({ t: END + 1.5, name: "impact", v: 0.45 });
      return {
        duration: DUR,
        poster: 2.15,
        bg: BG,
        voice,
        sfx,
        music: { style: "funk", bpm: 104, root: 55, mode: "soul", gain: 0.45, seed: "kelime-turuncu" },
        title: C.title,
        notes: [
          { t: 0, title: "Kanca: vaat + sayı", why: "Kanca somut bir fayda vaat ediyor ve hedef kitleyi ilk saniyede seçiyor. Kartlık deste ekranda: izleyen kaç tane kaldığını biliyor, sonuna kadar kalıyor." },
          { t: S[0].a, title: "Önce kelime ve telaffuz", why: "Kart ön yüzü yalnız Almanca + seviye rozeti. Defne kelimeyi söylüyor; 'Ne demek?' çubuğu izleyene kısa düşünme süresi veriyor." },
          { t: S[0].flip, title: "Kart dönüyor", why: "Ödül anı: dönüş + çan. Anlam büyük, altında günlük hayattan cümle kelime kelime yanıyor; Türkçesi altta." },
          { t: S[2].a, title: "Ritim", why: "Her kart aynı kalıp, ama zil sesi her kartta biraz yükseliyor: tekdüzelik yerine tırmanma hissi." },
          { t: END, title: "Özet + seri sözü", why: "Kelimeler liste olarak kalıyor (kaydetme). Seri sözü takip etmek için sebep veriyor; reklam cümlesi yok." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .glow{width:900px;height:900px;border-radius:50%;filter:blur(160px);background:#ffb15e}
        .glow2{width:800px;height:800px;border-radius:50%;filter:blur(160px);background:#e0560a}
        .mini{top:1000px;width:200px;height:270px;border-radius:32px;background:#fff;box-shadow:0 20px 40px -12px rgba(116,49,15,.55);display:flex;align-items:center;justify-content:center;font-size:90px;font-weight:800;color:${BG}}
        .card{left:${G.L}px;top:380px;width:${G.W}px;height:1010px}
        .face{inset:0;border-radius:48px;background:#fff;color:${INK};box-shadow:0 40px 80px -30px rgba(116,49,15,.7)}
        .face *{position:relative!important}
        .front,.back{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:64px;text-align:center}
        .lvl{position:absolute!important;left:56px;top:56px;height:72px;padding:0 28px;border-radius:36px;background:${INK};color:#fff;font-size:36px;font-weight:800;display:flex;align-items:center;letter-spacing:.04em}
        .num{position:absolute!important;right:56px;top:72px;font-size:40px;font-weight:700;color:rgba(27,27,29,.4)}
        .art{font-size:72px;font-weight:700;color:${BG};margin-bottom:6px}
        .wd{font-size:136px;font-weight:800;font-stretch:80%;letter-spacing:-.02em;line-height:1}
        .ask{margin-top:70px;font-size:48px;font-weight:700;color:rgba(27,27,29,.55)}
        .tb{margin-top:26px;width:440px;height:14px;border-radius:7px;background:rgba(27,27,29,.1);overflow:hidden}
        .tb i{position:absolute!important;left:0;top:0;bottom:0;width:100%;background:${BG};transform-origin:0 50%}
        .back{justify-content:center}
        .bde{font-size:58px;font-weight:700;color:${BG}}
        .btr{font-size:124px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1.02;margin:10px 0 60px}
        .hr{width:120px;height:8px;border-radius:4px;background:#f3e3d4;margin-bottom:56px}
        .ex{font-size:56px;font-weight:700;line-height:1.2;letter-spacing:-.01em}
        .ex .w{opacity:.28}.ex .w.said{opacity:1}.ex .w.now{color:${BG}}
        .ext{margin-top:28px;font-size:42px;font-weight:500;line-height:1.3;color:rgba(27,27,29,.6)}
        .e1{color:${INK};left:${G.L}px;width:${G.W}px;top:300px;text-align:center;font-size:108px;font-weight:800;font-stretch:84%;letter-spacing:-.02em}
        .row{left:${G.L}px;width:${G.W}px;height:${ROW_H}px;border-radius:32px;background:#fff1e4;color:${INK};display:flex;align-items:center;gap:.4em;padding:0 38px;font-size:54px;font-weight:800;white-space:nowrap}
        .row *{position:relative!important}
        .row i{font-style:normal;color:${BG};font-size:.78em;font-weight:700}
        .row small{margin-left:auto;padding-left:.4em;white-space:nowrap;font-size:.74em;font-weight:600;color:rgba(27,27,29,.55)}
                .segs i{background:#fff}
        .fade{inset:0;background:${BG}}
      `);
      el.g1 = h("div", "glow", root);
      el.g2 = h("div", "glow2", root);
      el.segs = segments(root, D.items.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 84, weight: 700, color: "#fff" }, { t: C.hook[1], size: 148, color: "#fff", delay: 0.35 }, { t: C.hook[2], size: 148, color: INK, delay: 0.8 }], { center: 640 });
      el.minis = D.items.map((_, i) => h("div", "mini", root, String(i + 1)));
      cards = D.items.map((w, i) => {
        const c = h("div", "card", root);
        const front = h("div", "face front", c);
        h("div", "lvl", front, w.niveau);
        h("div", "num", front, `${i + 1}/${D.items.length}`);
        if (w.artikel) h("div", "art", front, w.artikel);
        h("div", "wd", front, w.de);
        h("div", "ask", front, X.ui("ask"));
        const tb = h("div", "tb", front, "<i></i>").firstChild;
        const back = h("div", "face back", c);
        h("div", "lvl", back, w.niveau);
        h("div", "bde", back, lab(w));
        h("div", "btr", back, w.tr);
        h("div", "hr", back);
        const ex = h("div", "ex", back);
        const sp = words(ex, w.beispiel);
        const ext = h("div", "ext", back, w.beispielTr);
        return { w, c, front, back, tb, sp, ext, r: S[i] };
      });
      // turuncu tema: kapanış beyaz panelin içinde (logo turuncu zeminde kaybolmasın)
      el.panel = E.panel(root);
      el.e1 = h("div", "e1 flow", root);
      el.e1w = words(el.e1, C.summary);
      el.rows = D.items.map((w, i) => {
        const x = h("div", "row", root, `${w.artikel ? `<i>${w.artikel}</i>` : ""}<span>${w.de}</span><small>${w.tr}</small>`);
        x.style.top = `${460 + i * ROW_STEP}px`;
        return x;
      });
      el.outro = E.outro(root, { series: C.outro.series, ask: C.outro.ask });
      el.fade = h("div", "fade", root);
      el.hook.layout();
      // özet satırı yazı alanına sığsın (uzun kelime + uzun Türkçe): satır içi boylar em, satırın boyu küçülür
      el.rows.forEach((x) => {
        const base = parseFloat(getComputedStyle(x).fontSize);
        const pr = parseFloat(getComputedStyle(x).paddingRight); // taşmada sağ dolgu scrollWidth'e girmiyor
        for (let k = 0; k < 4 && x.scrollWidth + pr > x.clientWidth + 1; k++) x.style.fontSize = `${Math.floor((parseFloat(x.style.fontSize || base) * x.clientWidth) / (x.scrollWidth + pr)) - 1}px`;
      });
    },

    render(t) {
      set(el.g1, { x: -300 + Math.sin(t * 0.45) * 160, y: -250 + Math.cos(t * 0.33) * 120, o: 0.85 });
      set(el.g2, { x: 480 + Math.cos(t * 0.4) * 140, y: 1300 + Math.sin(t * 0.37) * 130, o: 0.7 });

      const ho = HOOK - 0.35;
      el.hook.render(t, 0.05, ho);
      el.minis.forEach((m, i) => {
        const k = p(t, 1.5 + i * 0.09, 0.6);
        const o = ease.inCubic(p(t, ho, 0.3));
        const fan = (i - MID) * 11;
        m.style.left = `${G.CX - 100 + (i - MID) * 120}px`;
        set(m, { o: Math.min(k * 3, 1 - o), y: (1 - ease.spring(k)) * 500 + Math.abs(i - MID) * 26 - o * 120, r: fan * ease.spring(k), s: 1 - o * 0.2 });
      });

      const ci = S.findIndex((r) => t >= r.a && t < r.b);
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ci >= 0 ? ci : t >= END ? S.length : 0, ci >= 0 ? p(t, S[ci].a, S[ci].b - S[ci].a) : 0);

      cards.forEach((c) => {
        const r = c.r;
        const shown = t >= r.a - 0.05 && t <= r.b + 0.05;
        c.c.style.display = shown ? "" : "none";
        if (!shown) return;
        const k = p(t, r.a, 0.65);
        const out = ease.inCubic(p(t, r.b - 0.38, 0.38));
        // geliş: alttan yaylı, hafif eğik; çıkış: sola yukarı fırlar
        const fk = p(t, r.flip, 0.5);
        const ang = ease.inOutCubic(fk) * 180;
        const sx = Math.max(0.02, Math.abs(Math.cos((ang * Math.PI) / 180)));
        set(c.c, {
          o: Math.min(ease.outCubic(k * 2), 1 - out),
          y: (1 - ease.spring(k)) * 700 - out * 300,
          x: -out * 500,
          r: (1 - ease.spring(k)) * 8 - out * 14 + Math.sin(Math.PI * fk) * -2,
          sx: sx * (1 + Math.sin(Math.PI * fk) * 0.06),
          sy: 1 + Math.sin(Math.PI * fk) * 0.06,
        });
        const back = ang > 90;
        c.front.style.visibility = back ? "hidden" : "visible";
        c.back.style.visibility = back ? "visible" : "hidden";
        // dönüşte yüzü hafif karart: ışık hissi
        const shade = Math.sin(Math.PI * fk) * 0.25;
        c.front.style.filter = c.back.style.filter = shade > 0.01 ? `brightness(${1 - shade})` : "none";
        c.tb.style.transform = `scaleX(${1 - p(t, r.think, THINK)})`;
        karaoke(c.sp, t, r.sv, r.sd);
        if (t < r.sv) c.sp.forEach((s) => s.classList.remove("said", "now"));
        if (t > r.sv + r.sd + 0.1) c.sp.forEach((s) => (s.classList.add("said"), s.classList.remove("now")));
        const xk = p(t, r.sv + r.sd + 0.05, 0.4);
        set(c.ext, { o: ease.outCubic(xk), y: (1 - ease.outCubic(xk)) * 16 });
      });

      wordsIn(el.e1w, t, END + 0.15, { stagger: 0.09 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.7 + i * 0.13, 0.55);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * (i % 2 ? 200 : -200) });
      });
      {
        const pk = p(t, END - 0.1, 0.6);
        set(el.panel, { o: ease.outCubic(pk * 2), y: (1 - ease.spring(pk)) * 400, s: 0.94 + ease.spring(pk) * 0.06 });
        el.outro(t, END + 1.5);
      }
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
