/*
  Kelime destesi, ilan kartı (Lacivert): bir ilan/belge kartı, satır satır fosforlu kalemle.
  Tutma mantığı: kanca gerçek bir derdi seçiyor (ör. ev aramak) → ilan kartı baştan görünüyor, satırlar soluk
  (sonu belli) → her turda bir satır fosforlu kalemle işaretleniyor, kelime sesle → "Ne demek?" düşünme çubuğu →
  anlam ve günlük bir cümle → işaretlenen satırın yanına Türkçesi yazılıyor (ilerleme) → özet + kapanış.

  İçerik: D.items 3–6 kelime (deck); 6 kelimede kart satırları daralır.
  copy anahtarları (hepsi zorunlu):
    title          galeri/kayıt adı
    hook           tam 3 satır: [küçük gri giriş (84 px), büyük satır (120 px), büyük turuncu satır (120 px)]
    caption        paylaşım metni + etiketler
    outro          { series, ask }
    cardLabel      kartın sol üst etiketi, büyük harf (ör. "ANZEIGE")
    summaryKicker  kapanışın küçük üst satırı (ör. "Kaydet, ev bakarken lazım olacak")
    summaryTitle   kapanış başlığı (ör. "İlandaki 5 kelime")
  ui anahtarları (sabit yazılar, copy.ui ile ezilir):
    ask            düşünme çubuğunun sorusu ("Ne demek?")
*/
E.register("kelime-lacivert", { title: "Kelime destesi · ilan kartı", approach: "kelime", theme: "lacivert", ui: { ask: "Ne demek?" } }, (X) => {
  const { h, set, p, ease, words, karaoke, segments } = E;
  const D = X.data;
  const C = D.copy;
  {
    const need = ["title", "hook", "caption", "outro", "cardLabel", "summaryKicker", "summaryTitle"];
    if (!C) throw new Error("kelime-lacivert: copy yok");
    for (const k of need) if (C[k] == null) throw new Error(`kelime-lacivert: copy.${k} eksik`);
    if (!Array.isArray(C.hook) || C.hook.length !== 3) throw new Error("kelime-lacivert: copy.hook tam 3 satır olmalı");
    if (!C.outro.series || !C.outro.ask) throw new Error("kelime-lacivert: copy.outro.series ve copy.outro.ask gerekli");
    if (!(D.items.length >= 3 && D.items.length <= 6)) throw new Error(`kelime-lacivert: 3–6 kelime desteklenir (${D.items.length})`);
  }
  const N = D.items.length;
  // kapanış listesi: 5'e kadar 540'tan 120 arayla; 6'da yukarı başlar, aralık ve satır boyu daralır
  const ROW_TOP = N <= 5 ? 540 : 500;
  const ROW_STEP = N <= 5 ? 120 : 110;
  const ROW_H = Math.min(104, ROW_STEP - 12);
  const T = X.theme;
  const G = E.G;
  const OR = T.acc;
  const NAVY = T.bg;
  const MONO = '"DM Mono", ui-monospace, Menlo, monospace';
  const HOOK = 2.9;
  const THINK = 1.2;
  const CARD = { top: 290, rowsTop: 330, rowH: N <= 5 ? 72 : 60 }; // 6 satırda kart alttaki anlam alanına binmesin
  let S = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  const lab = (w) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.6 }, { t: 0.45, name: "pop", f: 560 }, { t: 0.9, name: "pop", f: 700 }, { t: HOOK - 0.35, name: "whoosh", d: 0.5 }];
      let t = HOOK + 0.5;
      S = D.items.map((w, i) => {
        const r = { a: t, wv: t + 0.45, wd: dur(lab(w)) };
        r.think = r.wv + r.wd + 0.1;
        r.rev = r.think + THINK;
        r.sv = r.rev + 0.55;
        r.sd = dur(w.beispiel);
        r.b = r.sv + r.sd + 0.8;
        sfx.push({ t: r.a, name: "whoosh", d: 0.3, v: 0.45 });
        voice.push({ t: r.wv, text: lab(w) }, { t: r.sv, text: w.beispiel });
        sfx.push({ t: r.rev, name: "ding", k: 1 + i * 0.05, v: 0.6 }, { t: r.rev + 0.15, name: "pop", f: 900, v: 0.5 });
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.5 + E.OUTRO_LEN;
      sfx.push({ t: END, name: "whoosh", d: 0.45, down: true });
      D.items.forEach((_, i) => sfx.push({ t: END + 0.6 + i * 0.12, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.5, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.3,
        voice,
        sfx,
        music: { style: "harp", bpm: 92, root: 55, mode: "maj", gain: 0.45, seed: "kelime-lacivert" },
        title: C.title,
        notes: [
          { t: 0, title: "Kanca: gerçek bir dert", why: "Kanca herkesin yaşadığı bir derdi seçiyor ve bunun işe yarar bir şey olduğunu söylüyor." },
          { t: HOOK - 0.3, title: "İlan kartı", why: "Tanıdık bir nesne: ilan. Satırlar baştan görünüyor ama soluk; izleyen hepsinin açılmasını bekliyor." },
          { t: S[0].a, title: "Fosforlu kalem", why: "Sıradaki satır kalemle işaretleniyor, kelime sesle geliyor. Altta 'Ne demek?' çubuğu düşünme süresi veriyor." },
          { t: S[0].rev, title: "Anlam + günlük cümle", why: "Anlam büyük, altında günlük bir cümle kelime kelime yanıyor; işaretlenen satırın yanına Türkçesi yazılıyor." },
          { t: END, title: "Özet + kapanış", why: "Kelimeler liste olarak kalıyor (kaydetme). Standart kapanış, kutulu imza." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .glow{width:1000px;height:1000px;border-radius:50%;filter:blur(170px);background:#2a4bd0}
        .card{left:${G.L}px;width:${G.W}px;top:${CARD.top}px;border-radius:48px;background:${T.ink};color:${NAVY};box-shadow:0 40px 90px -40px rgba(0,0,0,.8);padding:40px 48px 36px}
        .card *{position:relative}
        .top{display:flex;justify-content:space-between;align-items:center;font-family:${MONO};font-size:26px;letter-spacing:.18em;color:rgba(16,26,54,.55)}
        .pic{margin-top:24px;height:184px;border-radius:32px;overflow:hidden;background:linear-gradient(180deg,#ffb15e,#ffdcb0)}
        .pic i{position:absolute;background:${T.ink}}
        .rows{margin-top:16px}
        .rw{height:${CARD.rowH}px;display:flex;align-items:center;gap:20px;border-bottom:3px dotted rgba(16,26,54,.18)}
        .rw:last-child{border-bottom:0}
        .rw .mk{position:absolute;left:-12px;top:12px;bottom:12px;width:calc(100% + 24px);border-radius:16px;background:rgba(251,143,42,.42);transform-origin:0 50%}
        .rw .de{font-size:${N <= 5 ? 46 : 40}px;font-weight:800;letter-spacing:-.01em;white-space:nowrap}
        .rw .de i{font-style:normal;color:rgba(16,26,54,.45);font-weight:700;margin-right:12px}
        .rw .tr{margin-left:auto;height:52px;padding:0 22px;border-radius:26px;background:${NAVY};color:#fff;font-size:30px;font-weight:700;display:flex;align-items:center;white-space:nowrap}
        .ex{left:${G.L}px;width:${G.W}px;top:1040px}
        .ex *{position:relative}
        .ask{display:block;font-size:44px;font-weight:700;color:${T.sub}}
        .tb{display:block;margin-top:20px;width:360px;height:12px;border-radius:6px;background:rgba(255,255,255,.12);overflow:hidden}
        .tb i{position:absolute;left:0;top:0;bottom:0;width:100%;background:${OR};transform-origin:0 50%}
        .mean{display:block;font-size:88px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1;color:${OR};white-space:nowrap}
        .sent{display:block;margin-top:28px;font-size:50px;font-weight:700;line-height:1.2}
        .sent .w{opacity:.3}.sent .w.said{opacity:1}.sent .w.now{color:${OR}}
        .stt{display:block;margin-top:14px;font-size:38px;font-weight:500;line-height:1.3;color:${T.sub}}
        .e1{left:${G.L}px;width:${G.W}px;top:320px;text-align:center;font-size:52px;font-weight:700;color:${T.sub}}
        .e2{left:${G.L}px;width:${G.W}px;top:396px;text-align:center;font-size:100px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1;white-space:nowrap}
        .row{left:${G.L}px;width:${G.W}px;height:${ROW_H}px;border-radius:32px;background:${T.surface};display:flex;align-items:center;gap:.38em;padding:0 40px;font-size:48px;font-weight:800;white-space:nowrap}
        .row *{position:relative}
        .row i{font-style:normal;color:${OR};font-size:.75em;font-weight:700}
        .row small{margin-left:auto;padding-left:.4em;font-size:.8em;font-weight:600;color:${T.sub}}
      `);
      el.g1 = h("div", "glow", root);
      el.g2 = h("div", "glow", root);
      el.segs = segments(root, D.items.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 84, weight: 700, color: T.sub }, { t: C.hook[1], size: 120, delay: 0.4 }, { t: C.hook[2], size: 120, color: OR, delay: 0.85 }], { center: 760 });
      el.card = h("div", "card", root);
      h("div", "top", el.card, `<span>${C.cardLabel}</span><span class="cnt">0 / ${D.items.length}</span>`);
      el.cnt = el.card.querySelector(".cnt");
      // basit pencere çizimi: ilanın fotoğrafı yerine
      el.pic = h("div", "pic", el.card, `<i style="left:50%;top:0;bottom:0;width:10px;margin-left:-5px"></i><i style="left:0;right:0;top:50%;height:10px;margin-top:-5px"></i>`);
      const rows = h("div", "rows", el.card);
      el.rows = D.items.map((w) => {
        const r = h("div", "rw", rows, `<i class="mk"></i><span class="de">${w.artikel ? `<i>${w.artikel}</i>` : ""}${w.de}</span><span class="tr">${w.tr}</span>`);
        return { r, mk: r.querySelector(".mk"), de: r.querySelector(".de"), tr: r.querySelector(".tr") };
      });
      el.exs = D.items.map((w) => {
        const x = h("div", "ex", root);
        const ask = h("span", "ask", x, X.ui("ask"));
        const tb = h("span", "tb", x, "<i></i>").firstChild;
        const mean = h("span", "mean", x, w.tr);
        const sent = h("span", "sent", x);
        const sp = words(sent, w.beispiel);
        const stt = h("span", "stt", x, w.beispielTr);
        return { x, ask, tb, mean, sent, sp, stt };
      });
      el.e1 = h("div", "e1", root, C.summaryKicker);
      el.e2 = h("div", "e2", root, C.summaryTitle);
      el.sum = D.items.map((w, i) => {
        const x = h("div", "row", root, `${w.artikel ? `<i>${w.artikel}</i>` : ""}<span>${w.de}</span><small>${w.tr}</small>`);
        x.style.top = `${ROW_TOP + i * ROW_STEP}px`;
        return x;
      });
      el.outro = E.outro(root, { series: C.outro.series, ask: C.outro.ask });
      el.fade = h("div", "fade", root);
      el.hook.layout();
      // özet satırı yazı alanına sığsın (uzun kelime + uzun Türkçe): satır içi boylar em, satırın boyu küçülür
      el.sum.forEach((x) => {
        const base = parseFloat(getComputedStyle(x).fontSize);
        const pr = parseFloat(getComputedStyle(x).paddingRight); // taşmada sağ dolgu scrollWidth'e girmiyor
        for (let k = 0; k < 4 && x.scrollWidth + pr > x.clientWidth + 1; k++) x.style.fontSize = `${Math.floor((parseFloat(x.style.fontSize || base) * x.clientWidth) / (x.scrollWidth + pr)) - 1}px`;
      });
      // anlam (88 px, tek satır) yazı alanına sığsın
      el.exs.forEach((x) => {
        const w = x.mean.scrollWidth;
        if (w > G.W) x.mean.style.fontSize = `${Math.floor((88 * G.W) / w)}px`;
      });
    },

    render(t) {
      set(el.g1, { o: 0.3, x: -420 + Math.sin(t * 0.4) * 140, y: -380 + Math.cos(t * 0.3) * 120 });
      set(el.g2, { o: 0.2, x: 360 + Math.cos(t * 0.35) * 140, y: 1150 + Math.sin(t * 0.42) * 140 });
      el.hook.render(t, 0.05, HOOK - 0.4);
      const ci = S.findIndex((r) => t >= r.a && t < r.b);
      set(el.segs.el, { o: p(t, HOOK, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ci >= 0 ? ci : t >= END ? S.length : 0, ci >= 0 ? p(t, S[ci].a, S[ci].b - S[ci].a) : 0);

      // ilan kartı: alttan gelir, sonda yukarı çıkıp söner
      const ck = p(t, HOOK - 0.3, 0.7);
      const cOut = ease.inCubic(p(t, END - 0.1, 0.45));
      set(el.card, { o: Math.min(ease.outCubic(ck * 2), 1 - cOut), y: (1 - ease.spring(ck)) * 900 - cOut * 200, s: 1 - cOut * 0.06 });
      const done = S.filter((r) => t >= r.rev).length;
      el.cnt.textContent = `${done} / ${D.items.length}`;
      el.rows.forEach((x, i) => {
        const r = S[i];
        const now = ci === i;
        const seen = t >= r.a;
        x.de.style.opacity = seen ? "1" : "0.32";
        // fosforlu kalem soldan sağa çekilir, satır bitince hafifler
        const mk = ease.outCubic(p(t, r.a + 0.05, 0.5));
        x.mk.style.transform = `scaleX(${mk.toFixed(3)})`;
        x.mk.style.opacity = (seen ? (now ? 1 : 0.45) : 0).toFixed(2);
        const tk = p(t, r.rev + 0.15, 0.4);
        set(x.tr, { o: tk, x: (1 - ease.outExpo(tk)) * 40, s: 0.8 + ease.spring(tk) * 0.2 });
      });

      el.exs.forEach((x, i) => {
        const r = S[i];
        const shown = t >= r.a - 0.05 && t <= r.b + 0.05;
        x.x.style.display = shown ? "" : "none";
        if (!shown) return;
        const k = p(t, r.a, 0.5);
        const out = ease.inCubic(p(t, r.b - 0.35, 0.35));
        set(x.x, { o: Math.min(ease.outCubic(k * 2), 1 - out), y: (1 - ease.spring(k)) * 60 - out * 40 });
        // düşünürken "Ne demek?" + çubuk, cevapta yerini anlam alır
        const thinkOn = p(t, r.think - 0.15, 0.3) * (1 - p(t, r.rev - 0.1, 0.2));
        x.ask.style.display = t < r.rev ? "" : "none";
        x.tb.parentNode.style.display = t < r.rev ? "" : "none";
        set(x.ask, { o: thinkOn });
        set(x.tb.parentNode, { o: thinkOn });
        x.tb.style.transform = `scaleX(${1 - p(t, r.think, THINK)})`;
        x.mean.style.display = t >= r.rev ? "" : "none";
        x.sent.style.display = t >= r.rev ? "" : "none";
        x.stt.style.display = t >= r.rev ? "" : "none";
        const mk = p(t, r.rev, 0.5);
        set(x.mean, { o: ease.outCubic(mk * 2), y: (1 - ease.spring(mk)) * 40 });
        set(x.sent, { o: p(t, r.rev + 0.25, 0.35) });
        karaoke(x.sp, t, r.sv, r.sd);
        const sk = p(t, r.sv + r.sd + 0.05, 0.4);
        set(x.stt, { o: sk, y: (1 - ease.outCubic(sk)) * 14 });
      });

      set(el.e1, { o: p(t, END + 0.3, 0.4) });
      const k2 = p(t, END + 0.25, 0.55);
      set(el.e2, { o: ease.outCubic(k2 * 2), y: (1 - ease.spring(k2)) * 50 });
      el.sum.forEach((x, i) => {
        const k = p(t, END + 0.6 + i * 0.12, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * 200 });
      });
      el.outro(t, END + 1.5);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
