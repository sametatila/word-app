/*
  "Cümleyi kur", mıknatıs kartlar (Gece). Sahne ve metinler bölüm dosyasından (copy), şablon her sahneye uyar.
  Tutma mantığı: kanca izleyene iş veriyor (sen diz) → kelimeler buzdolabı mıknatısı gibi dağınık, eğik düşüyor
  → üstte kum saati çubuğu, izleyen kafasında diziyor → kartlar "tık" sesiyle doğru sıraya yapışıyor → cümle
  sesle kelime kelime yanıyor, Türkçesi geliyor → ipucu kartı kuralı tek cümleyle söylüyor → özet + kapanış.
*/
E.register("kur-gece", { title: "Cümleyi kur · mıknatıs", approach: "kur", theme: "gece", ui: { counter: "{scene} · {n}/{total}", tip: "İPUCU", summary: "{scene} {total} cümle" } }, (X) => {
  const { h, set, p, ease, karaoke, segments } = E;
  const D = X.data;
  /*
    copy anahtarları (bölüm dosyası, D.copy):
      zorunlu    title, hook (2 satır: 1. beyaz 104 px, 2. turuncu 128 px), caption, outro { series, ask }, scene (sahne adı, ör. "Kafede")
      isteğe bağlı summary (kapanış başlığı; yoksa "<scene> <cümle sayısı> cümle")
      ui (sabit yazılar; bölüm copy.ui ile ezer): counter "{scene} · {n}/{total}" (sahne büyük harfle), tip "İPUCU",
                 summary "{scene} {total} cümle" (copy.summary yoksa)
    cümle sayısı: 2–4; cümle uzunluğu: en çok 8 kelime (daha uzunu yerleşime sığmıyor)
  */
  const C = D.copy;
  const need = (ok, msg) => {
    if (!ok) throw new Error(`kur-gece: ${msg}`);
  };
  need(C, "copy yok");
  for (const k of ["title", "caption", "scene"]) need(C[k], `copy.${k} yok`);
  need(Array.isArray(C.hook) && C.hook.length === 2, "copy.hook 2 satır olmalı");
  need(C.outro && C.outro.series && C.outro.ask, "copy.outro.series ve copy.outro.ask gerekli");
  need(Array.isArray(D.lines) && D.lines.length >= 2 && D.lines.length <= 4, "2–4 cümle olmalı");
  for (const l of D.lines) need(l.de.split(" ").length <= 8, `cümle en çok 8 kelime: ${l.de}`);
  const SUMMARY = C.summary || X.ui("summary", { scene: C.scene, total: D.lines.length });
  const T = X.theme;
  const G = E.G;
  const HOOK = 2.6;
  const THINK = 2.8;
  const TILE_H = 136;
  const GAP = 24;
  let L = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  let rounds = [];

  /** Son kelimedeki noktalama ayrılır (dağınıkken ipucu vermesin), dizilince geri gelir. */
  const tok = (s) => {
    const w = s.split(" ");
    const m = w[w.length - 1].match(/^(.*?)([.?!]?)$/);
    w[w.length - 1] = m[1];
    return { w, punct: m[2] };
  };
  /** Belirli karıştırma: ilk kelime başta kalmaz, sıra hiçbir zaman doğru sıra değil. */
  const shuffle = (n, seed) => {
    let sd = seed;
    const r = () => ((sd = (sd * 16807) % 2147483647) - 1) / 2147483646;
    let a;
    do {
      a = [...Array(n).keys()];
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
    } while (a[0] === 0 || a.every((v, i) => v === i));
    return { order: a, r };
  };
  /** Kartları yazı alanına satır satır sarar, her satırı 513 ekseninde ortalar. */
  const wrap = (widths, top) => {
    const rows = [[]];
    let w = 0;
    widths.forEach((cw, i) => {
      if (rows[rows.length - 1].length && w + GAP + cw > G.W) {
        rows.push([]);
        w = 0;
      }
      w += (rows[rows.length - 1].length ? GAP : 0) + cw;
      rows[rows.length - 1].push(i);
    });
    const pos = [];
    rows.forEach((row, ri) => {
      const rw = row.reduce((a, i) => a + widths[i], 0) + GAP * (row.length - 1);
      let x = G.CX - rw / 2;
      row.forEach((i) => {
        pos[i] = { x, y: top + ri * (TILE_H + GAP) };
        x += widths[i] + GAP;
      });
    });
    return { pos, h: rows.length * TILE_H + (rows.length - 1) * GAP };
  };

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.55, name: "pop", f: 600 }, { t: HOOK - 0.32, name: "whoosh", d: 0.45 }];
      let t = HOOK;
      L = D.lines.map((l) => {
        const n = tok(l.de).w.length;
        const r = { a: t };
        for (let k = 0; k < n; k++) sfx.push({ t: r.a + 0.1 + k * 0.07, name: "pop", f: 420 + k * 40, v: 0.5 });
        r.think = r.a + 0.8;
        [0, 1, 2].forEach((k) => sfx.push({ t: r.think + k * (THINK / 3), name: "tick", hi: k === 2 }));
        r.arr = r.think + THINK + 0.1;
        sfx.push({ t: r.arr - 0.05, name: "whoosh", d: 0.4, v: 0.7 });
        for (let k = 0; k < n; k++) sfx.push({ t: r.arr + 0.35 + k * 0.08, name: "tick", v: 0.6 });
        r.v = r.arr + 1.0;
        r.d = dur(l.de);
        voice.push({ t: r.v, text: l.de });
        r.tr = r.v + r.d + 0.1;
        r.tip = r.tr + 0.45;
        sfx.push({ t: r.tip, name: "pop", f: 820, v: 0.6 });
        r.b = r.tip + 1.9;
        sfx.push({ t: r.b - 0.38, name: "whoosh", d: 0.4, v: 0.6, down: true });
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      D.lines.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.14, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.0,
        voice,
        sfx,
        music: { style: "disco", bpm: 116, root: 57, mode: "min", gain: 0.42, seed: "kur-gece" },
        notes: [
          { t: 0, title: "Kanca: iş ver", why: "İkinci satır izleyene görev veriyor ('sen diz'), seyirci olmaktan çıkarıyor. Sahne herkesin girdiği bir yer olmalı, cümleler hemen işe yarasın." },
          { t: L[0].a, title: "Dağınık mıknatıslar", why: "Kelimeler eğik ve rastgele düşüyor; noktalama ve büyük harf saklı, ilk kelime belli olmuyor. Üstteki çubuk düşünme süresini gösteriyor." },
          { t: L[0].arr, title: "Tık tık yerine oturuyor", why: "Kartlar yaylı hareketle doğru sıraya yapışıyor, her biri küçük bir tık sesiyle. Ödül anı: izleyen tahminini kontrol ediyor." },
          { t: L[0].v, title: "Ses ve karaoke", why: "Defne cümleyi okurken kart kart turuncuya dönüyor; Türkçesi ses bittikten sonra geliyor." },
          { t: L[1].tip, title: "İpucu kartı", why: "Kural tek cümle ve kesin; ilgili kartlar vurgulu kalıyor." },
          { t: END, title: "Özet + kapanış", why: "Cümleler liste olarak kalıyor (kaydetme). Standart kapanış ve kutulu imza." },
        ],
        caption: C.caption,
        title: C.title,
      };
    },

    build(root) {
      X.style(`
        .glow{width:900px;height:900px;border-radius:50%;filter:blur(160px);background:${T.pill}}
        .rd{inset:0}
        .chip{left:${G.L}px;top:268px;height:64px;padding:0 28px;border-radius:32px;background:rgba(255,255,255,.1);color:${T.ink};font-size:32px;font-weight:800;letter-spacing:.08em;display:flex;align-items:center;white-space:nowrap}
        .bar{left:${G.L}px;top:360px;width:${G.W}px;height:10px;border-radius:5px;background:rgba(255,255,255,.12);overflow:hidden}
        .bar i{left:0;top:0;bottom:0;width:100%;background:${T.acc};transform-origin:0 50%}
        .mag{top:0;left:0;height:${TILE_H}px;padding:0 40px;border-radius:32px;background:linear-gradient(180deg,#34343b,#232328);box-shadow:inset 0 2px 0 rgba(255,255,255,.12),0 18px 30px -14px rgba(0,0,0,.8);display:flex;align-items:center;font-size:72px;font-weight:700;letter-spacing:-.01em;white-space:nowrap;color:${T.ink}}
        .mag.now{background:${T.pill};color:#141416;box-shadow:0 0 0 6px rgba(248,118,18,.25),0 18px 30px -14px rgba(0,0,0,.8)}
        .mag.said{box-shadow:inset 0 0 0 4px ${T.acc},0 18px 30px -14px rgba(0,0,0,.8)}
        .mag.mark{background:${T.acc};color:#141416}
        .tr{left:${G.L}px;width:${G.W}px;text-align:center;font-size:52px;font-weight:600;color:${T.sub}}
        .tip{left:${G.L}px;width:${G.W}px;padding:32px 40px;border-radius:32px;background:${T.surface};display:flex;flex-direction:column;gap:12px}
        .tip *{position:relative}
        .tip small{font-size:30px;font-weight:800;letter-spacing:.1em;color:${T.acc}}
        .tip span{font-size:44px;font-weight:700;line-height:1.25}
        .e1{left:${G.L}px;width:${G.W}px;top:316px;text-align:center;font-size:100px;font-weight:800;font-stretch:84%;letter-spacing:-.02em}
        .row{left:${G.L}px;width:${G.W}px;padding:20px 32px;border-radius:32px;background:${T.surface};display:flex;flex-direction:column;gap:6px}
        .row *{position:relative}
        .row b{font-size:42px;font-weight:700;line-height:1.2}
        .row small{font-size:34px;font-weight:500;color:${T.sub}}
      `);
      el.g1 = h("div", "glow", root);
      el.g2 = h("div", "glow", root);
      el.segs = segments(root, D.lines.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 104 }, { t: C.hook[1], size: 128, color: T.acc, delay: 0.5 }], { center: 760 });
      rounds = D.lines.map((l, i) => {
        const r = { l, root: h("div", "rd", root), tk: tok(l.de), plan: L[i] };
        r.chip = h("div", "chip", r.root, X.ui("counter", { scene: C.scene.toLocaleUpperCase("tr"), n: i + 1, total: D.lines.length }));
        r.bar = h("div", "bar", r.root, "<i></i>").firstChild;
        r.mags = r.tk.w.map((w, k) => {
          const m = h("div", "mag", r.root);
          const sp = h("span", null, m, k === 0 ? w.toLocaleLowerCase("de") : w);
          sp.style.position = "relative";
          return { m, sp, w };
        });
        r.tr = h("div", "tr", r.root, l.tr);
        r.tip = h("div", "tip", r.root, `<small>${X.ui("tip")}</small><span>${l.tip.text}</span>`);
        return r;
      });
      el.e1 = h("div", "e1", root, SUMMARY);
      el.rows = D.lines.map((l) => h("div", "row", root, `<b>${l.de}</b><small>${l.tr}</small>`));
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.hook.layout();
      // yerleşim: dizilmiş hâl (ölçülü) + dağınık hâl (belirli rastgele, alan içinde)
      rounds.forEach((r, i) => {
        // ölçüm son hâliyle (ilk harf büyük + noktalama), dağınıkta biraz daha dar: ortalama payı yeter
        r.mags.forEach((g, k) => {
          g.sp.textContent = g.w + (k === r.mags.length - 1 ? r.tk.punct : "");
          g.wFinal = g.m.offsetWidth;
          g.sp.textContent = k === 0 ? g.w.toLocaleLowerCase("de") : g.w;
          g.wLoose = g.m.offsetWidth;
        });
        // cümle + Türkçe + ipucu tek blok, dikeyde ~890 etrafında ortalanır (alt yarı boş kalmasın)
        const lay = wrap(r.mags.map((g) => g.wFinal), 0);
        const blockH = lay.h + 56 + r.tr.offsetHeight + 48 + r.tip.offsetHeight;
        const top = Math.max(430, Math.round(890 - blockH / 2));
        const lay2 = wrap(r.mags.map((g) => g.wFinal), top);
        r.mags.forEach((g, k) => (g.to = lay2.pos[k]));
        r.rowsBottom = top + lay2.h;
        // dağınık: 3 sütunlu ızgara yuvaları, karışık sırayla doldurulur, yuvanın içinde titreşir
        const { order, r: rnd } = shuffle(r.mags.length, 97 + i * 31);
        const cols = 2;
        const slotW = G.W / cols;
        order.forEach((k, s) => {
          const g = r.mags[k];
          const c = s % cols;
          const row = Math.floor(s / cols);
          const maxX = G.L + c * slotW + slotW - g.wLoose;
          const x = Math.min(maxX, G.L + c * slotW + rnd() * Math.max(0, slotW - g.wLoose));
          g.from = { x: Math.max(G.L, x), y: 430 + row * 180 + rnd() * 34, r: (rnd() - 0.5) * 22 };
        });
        r.trTop = r.rowsBottom + 56;
        r.tr.style.top = `${r.trTop}px`;
        r.tip.style.top = `${r.trTop + r.tr.offsetHeight + 48}px`;
      });
      // özet satırları alt alta; kapanışın (1176) üstünde bitmezse yazılar birlikte küçülür (2–4 cümle sığar)
      const stack = () => {
        let y = 440;
        el.rows.forEach((x) => {
          x.style.top = `${y}px`;
          y += x.offsetHeight + 16;
        });
        return y - 16;
      };
      for (let k = 0; k < 6 && stack() > 1140; k++)
        el.rows.forEach((x) => x.querySelectorAll("b,small").forEach((e) => (e.style.fontSize = `${Math.floor(parseFloat(getComputedStyle(e).fontSize) * 0.92)}px`)));
    },

    render(t) {
      set(el.g1, { o: 0.3, x: -320 + Math.sin(t * 0.5) * 120, y: -300 + Math.cos(t * 0.4) * 90 });
      set(el.g2, { o: 0.22, x: 420 + Math.cos(t * 0.45) * 120, y: 1200 + Math.sin(t * 0.35) * 110 });
      const ho = HOOK - 0.32;
      el.hook.render(t, 0.05, ho);
      const ci = L.findIndex((r) => t >= r.a && t < r.b);
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ci >= 0 ? ci : t >= END ? L.length : 0, ci >= 0 ? p(t, L[ci].a, L[ci].b - L[ci].a) : 0);

      rounds.forEach((r) => {
        const P = r.plan;
        const shown = t >= P.a - 0.05 && t <= P.b + 0.05;
        r.root.style.display = shown ? "" : "none";
        if (!shown) return;
        const out = ease.inCubic(p(t, P.b - 0.38, 0.38));
        set(r.root, { o: 1 - out, y: -out * 120, blur: out * 12 });
        set(r.chip, { o: p(t, P.a, 0.3), x: (1 - ease.outExpo(p(t, P.a, 0.5))) * -80 });
        set(r.bar.parentNode, { o: p(t, P.think - 0.2, 0.2) * (1 - p(t, P.arr, 0.3)) });
        r.bar.style.transform = `scaleX(${1 - p(t, P.think, THINK)})`;
        const placed = t >= P.arr + 0.2;
        r.mags.forEach((g, k) => {
          // düşüş: yukarıdan, eğik, yaylı
          const fk = p(t, P.a + 0.1 + k * 0.07, 0.6);
          // diziliş: sırayla (cümle sırası), yaylı, eğim sıfırlanır
          const ak = ease.spring(p(t, P.arr + k * 0.08, 0.7));
          const x = g.from.x + (g.to.x - g.from.x) * ak;
          const y = g.from.y + (g.to.y - g.from.y) * ak - (1 - ease.spring(fk)) * 260;
          const rot = g.from.r * (1 - ak) + Math.sin(t * 2 + k) * 1.5 * (1 - ak);
          set(g.m, { o: Math.min(1, fk * 3), x, y, r: rot, s: 1 + Math.sin(Math.PI * p(t, P.arr + 0.3 + k * 0.08, 0.25)) * 0.06 });
          const last = k === r.mags.length - 1;
          g.sp.textContent = placed ? g.w + (last ? r.tk.punct : "") : k === 0 ? g.w.toLocaleLowerCase("de") : g.w;
        });
        karaoke(r.mags.map((g) => g.m), t, P.v, P.d);
        const tipOn = t >= P.tip;
        r.mags.forEach((g, k) => g.m.classList.toggle("mark", tipOn && r.l.tip.mark.includes(k)));
        if (t < P.v) r.mags.forEach((g) => g.m.classList.remove("said", "now"));
        const tk = p(t, P.tr, 0.45);
        set(r.tr, { o: tk, y: (1 - ease.outCubic(tk)) * 20 });
        const pk = p(t, P.tip, 0.5);
        set(r.tip, { o: ease.outCubic(pk * 1.5), y: (1 - ease.spring(pk)) * 60 });
      });

      set(el.e1, { o: p(t, END, 0.4), y: (1 - ease.outCubic(p(t, END, 0.5))) * 30 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.5 + i * 0.14, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * 200 });
      });
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
