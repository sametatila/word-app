/*
  "Cümleyi kur", tren (Turuncu kutu: içerik açık panelde): kelimeler vagon, cümle bir tren. Sahne ve metinler bölüm dosyasından (copy).
  Tutma mantığı: kanca bir soru soruyor (dizebilir misin?) → vagonlar depoda karışık duruyor, geri sayım →
  vagonlar sırayla raya çıkıp sağdan gelerek lokomotife bağlanıyor (tren kuruluyor) → cümle sesle okunurken
  vagon pencereleri yanıyor, lokomotiften duman çıkıyor → Türkçesi + ipucu → özet + kapanış.
*/
E.register("kur-turuncu", { title: "Cümleyi kur · tren", approach: "kur", theme: "turuncu", ui: { counter: "{scene} · {n}/{total}", tip: "İPUCU", summary: "{scene} {total} cümle" } }, (X) => {
  const { h, set, p, ease, karaoke, segments } = E;
  const D = X.data;
  /*
    copy anahtarları (bölüm dosyası, D.copy):
      zorunlu    title, hook (3 satır: 1. beyaz 104 px, 2. ve 3. koyu 128 px), caption, outro { series, ask }, scene (sahne adı, ör. "Kafede")
      isteğe bağlı summary (kapanış başlığı; yoksa "<scene> <cümle sayısı> cümle")
      ui (sabit yazılar; bölüm copy.ui ile ezer): counter "{scene} · {n}/{total}" (sahne büyük harfle), tip "İPUCU",
                 summary "{scene} {total} cümle" (copy.summary yoksa)
    cümle sayısı: 2–4; cümle uzunluğu: en çok 7 kelime (daha uzunu yerleşime sığmıyor)
  */
  const C = D.copy;
  const need = (ok, msg) => {
    if (!ok) throw new Error(`kur-turuncu: ${msg}`);
  };
  need(C, "copy yok");
  for (const k of ["title", "caption", "scene"]) need(C[k], `copy.${k} yok`);
  need(Array.isArray(C.hook) && C.hook.length === 3, "copy.hook 3 satır olmalı");
  need(C.outro && C.outro.series && C.outro.ask, "copy.outro.series ve copy.outro.ask gerekli");
  need(Array.isArray(D.lines) && D.lines.length >= 2 && D.lines.length <= 4, "2–4 cümle olmalı");
  for (const l of D.lines) need(l.de.split(" ").length <= 7, `cümle en çok 7 kelime: ${l.de}`);
  const SUMMARY = C.summary || X.ui("summary", { scene: C.scene, total: D.lines.length });
  const T = X.theme;
  const G = E.G;
  const INK = T.ink;
  const OR = T.acc;
  const HOOK = 2.6;
  const THINK = 2.8;
  const CAR_H = 132; // vagon gövdesi
  const WHEEL = 32;
  const TRACK = CAR_H + WHEEL + 40; // ray satır aralığı
  const GAP = 18;
  const LOCO = 148;
  // panel kırpması: vagonlar raya sağdan girerken panelin dışına taşmasın
  const PX = 48;
  const PY = 250;
  let L = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  let rounds = [];

  const tok = (s) => {
    const w = s.split(" ");
    const m = w[w.length - 1].match(/^(.*?)([.?!]?)$/);
    w[w.length - 1] = m[1];
    return { w, punct: m[2] };
  };
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
  /** Tren satırları: ilk satırın başında lokomotif; satırlar sola yaslı, yazı alanına sığar. */
  const wrap = (widths, top) => {
    const rows = [[]];
    let w = LOCO + GAP;
    widths.forEach((cw, i) => {
      if (rows[rows.length - 1].length && w + cw > G.W) {
        rows.push([]);
        w = 0;
      }
      w += cw + GAP;
      rows[rows.length - 1].push(i);
    });
    const pos = [];
    rows.forEach((row, ri) => {
      let x = G.L + (ri === 0 ? LOCO + GAP : 0);
      row.forEach((i) => {
        pos[i] = { x, y: top + ri * TRACK, row: ri };
        x += widths[i] + GAP;
      });
    });
    return { pos, rows: rows.length, h: rows.length * TRACK - 40 };
  };

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.55, name: "pop", f: 600 }, { t: HOOK - 0.45, name: "whoosh", d: 0.5 }];
      let t = HOOK;
      L = D.lines.map((l) => {
        const n = tok(l.de).w.length;
        const r = { a: t };
        for (let k = 0; k < n; k++) sfx.push({ t: r.a + 0.3 + k * 0.08, name: "pop", f: 380 + k * 35, v: 0.45 });
        r.think = r.a + 0.9;
        [0, 1, 2].forEach((k) => sfx.push({ t: r.think + k * (THINK / 3), name: "tick", hi: k === 2 }));
        r.arr = r.think + THINK + 0.1;
        sfx.push({ t: r.arr, name: "ring" });
        for (let k = 0; k < n; k++) sfx.push({ t: r.arr + 0.55 + k * 0.16, name: "print", d: 0.12 });
        r.v = r.arr + 0.6 + n * 0.16 + 0.35;
        r.d = dur(l.de);
        voice.push({ t: r.v, text: l.de });
        r.tr = r.v + r.d + 0.1;
        r.tip = r.tr + 0.45;
        sfx.push({ t: r.tip, name: "pop", f: 820, v: 0.6 });
        r.b = r.tip + 1.9;
        sfx.push({ t: r.b - 0.45, name: "whoosh", d: 0.45, v: 0.65 });
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      D.lines.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.14, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 1.9,
        voice,
        sfx,
        music: { style: "afro", bpm: 104, root: 58, mode: "lift", gain: 0.45, seed: "kur-turuncu" },
        notes: [
          { t: 0, title: "Kanca: meydan okuma", why: "Son iki satır izleyene soru soruyor (dizebilir misin?). Sahne herkesin her gün yaşadığı bir an olmalı." },
          { t: L[0].a, title: "Depo", why: "Kelimeler vagon olarak depoda karışık duruyor, büyük harf ve noktalama saklı. Sağ üstte geri sayım." },
          { t: L[0].arr, title: "Tren kuruluyor", why: "Vagonlar sırayla raya çıkıp sağdan gelerek lokomotife bağlanıyor. Hareket cümlenin soldan sağa okunuşunu taklit ediyor." },
          { t: L[0].v, title: "Pencereler yanıyor", why: "Defne okurken vagon vagon turuncu yanıyor, lokomotif duman atıyor. Göz sesi takip ediyor." },
          { t: L[1].tip, title: "İpucu", why: "Kural kısa ve kesin; ilgili vagonlar vurgulu kalıyor." },
          { t: END, title: "Özet + kapanış", why: "Cümleler panelde Türkçeleriyle kalıyor. Standart kapanış, kutulu imza panelin içinde." },
        ],
        caption: C.caption,
        title: C.title,
      };
    },

    build(root) {
      X.style(`
        .clip{left:${PX}px;top:${PY}px;width:984px;height:${1530 - PY}px;overflow:hidden;border-radius:64px}
        .rd{inset:0}
        .lab{left:${G.L - PX}px;top:${300 - PY}px;font-size:34px;font-weight:800;letter-spacing:.1em;color:${OR}}
        .cd{left:${G.R - PX - 104}px;top:${280 - PY}px;width:104px;height:104px;border-radius:50%;background:${INK};color:#fff;font-size:60px;font-weight:800;display:flex;align-items:center;justify-content:center}
        .car{top:0;left:0;height:${CAR_H + WHEEL}px}
        .car .body{position:absolute;left:0;top:0;height:${CAR_H}px;padding:0 40px;border-radius:32px;background:${INK};color:#fff;display:flex;align-items:center;font-size:74px;font-weight:700;letter-spacing:-.01em;white-space:nowrap}
        .car .body span{position:relative}
        .car .wh{position:absolute;top:${CAR_H - 6}px;width:${WHEEL + 6}px;height:${WHEEL + 6}px;border-radius:50%;background:${INK};box-shadow:inset 0 0 0 8px #fffaf5,inset 0 0 0 12px ${INK}}
        .car .wh.l{left:24px}.car .wh.r{right:24px}
        .car.now .body{background:${OR};color:${INK}}
        .car.said .body{box-shadow:inset 0 0 0 5px ${OR}}
        .car.mark .body{background:${OR};color:#fff}
        .rail{left:${G.L - PX}px;width:${G.W}px;height:14px;border-top:4px solid rgba(27,27,29,.28);border-bottom:4px solid rgba(27,27,29,.28)}
        .loco{left:${G.L - PX}px;width:${LOCO}px;height:${CAR_H + WHEEL}px}
        .loco .cab{position:absolute;left:0;top:0;width:${LOCO}px;height:${CAR_H}px;border-radius:32px 48px 32px 32px;background:${OR}}
        .loco .win{position:absolute;left:28px;top:28px;width:60px;height:50px;border-radius:12px;background:#fffaf5}
        .loco .chim{position:absolute;left:96px;top:-28px;width:28px;height:36px;border-radius:8px 8px 0 0;background:${INK}}
        .loco .wh{position:absolute;top:${CAR_H - 6}px;width:${WHEEL + 6}px;height:${WHEEL + 6}px;border-radius:50%;background:${INK};box-shadow:inset 0 0 0 8px #fffaf5,inset 0 0 0 12px ${INK}}
        .loco .wh.l{left:20px}.loco .wh.r{right:20px}
        .puff{width:40px;height:40px;border-radius:50%;background:rgba(27,27,29,.18)}
        .tr{left:${G.L - PX}px;width:${G.W}px;text-align:center;font-size:52px;font-weight:600;color:${T.sub}}
        .tip{left:${G.L - PX}px;width:${G.W}px;padding:28px 40px;border-radius:32px;background:${INK};color:#fff;display:flex;flex-direction:column;gap:10px}
        .tip *{position:relative}
        .tip small{font-size:30px;font-weight:800;letter-spacing:.1em;color:${OR}}
        .tip span{font-size:44px;font-weight:700;line-height:1.25}
        .e1{left:${G.L}px;width:${G.W}px;top:316px;text-align:center;font-size:96px;font-weight:800;font-stretch:84%;letter-spacing:-.02em}
        .row{left:${G.L}px;width:${G.W}px;padding:20px 32px;border-radius:32px;background:${T.surface};display:flex;flex-direction:column;gap:6px}
        .row *{position:relative}
        .row b{font-size:42px;font-weight:700;line-height:1.2}
        .row small{font-size:34px;font-weight:500;color:${T.sub}}
      `);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 104, color: "#fff" }, { t: C.hook[1], size: 128, color: INK, delay: 0.5 }, { t: C.hook[2], size: 128, color: INK, delay: 0.8 }], { center: 760 });
      el.panel = E.panel(root);
      el.segs = segments(root, D.lines.length);
      el.clip = h("div", "clip", root);
      rounds = D.lines.map((l, i) => {
        const r = { l, root: h("div", "rd", el.clip), tk: tok(l.de), plan: L[i] };
        r.lab = h("div", "lab", r.root, X.ui("counter", { scene: C.scene.toLocaleUpperCase("tr"), n: i + 1, total: D.lines.length }));
        r.cd = h("div", "cd", r.root, "3");
        r.rails = [];
        r.loco = h("div", "loco", r.root, `<i class="chim"></i><i class="cab"></i><i class="win"></i><i class="wh l"></i><i class="wh r"></i>`);
        r.puffs = [0, 1, 2, 3].map(() => h("div", "puff", r.root));
        r.cars = r.tk.w.map((w) => {
          const c = h("div", "car", r.root, `<div class="body"><span></span></div><i class="wh l"></i><i class="wh r"></i>`);
          return { c, sp: c.querySelector("span"), w };
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
      rounds.forEach((r, i) => {
        r.cars.forEach((g, k) => {
          g.sp.textContent = g.w + (k === r.cars.length - 1 ? r.tk.punct : "");
          g.wFinal = g.c.querySelector(".body").offsetWidth;
          g.sp.textContent = k === 0 ? g.w.toLocaleLowerCase("de") : g.w;
          g.wLoose = g.c.querySelector(".body").offsetWidth;
          g.c.style.width = `${g.wFinal}px`;
          g.c.querySelector(".body").style.width = "100%"; // ölçüldükten sonra vagonu doldurur
        });
        // dizilmiş tren + Türkçe + ipucu tek blok, 430–1480 arasında ortalı (panel koordinatı = sahne − PY)
        const lay0 = wrap(r.cars.map((g) => g.wFinal), 0);
        const blockH = lay0.h + 56 + r.tr.offsetHeight + 40 + r.tip.offsetHeight;
        const top = Math.max(440, Math.round(930 - blockH / 2));
        const lay = wrap(r.cars.map((g) => g.wFinal), top);
        r.cars.forEach((g, k) => (g.to = { x: lay.pos[k].x - PX, y: lay.pos[k].y - PY, row: lay.pos[k].row }));
        r.loco.style.top = `${top - PY}px`;
        r.locoY = top - PY;
        for (let ri = 0; ri < lay.rows; ri++) {
          const rl = h("div", "rail", r.root);
          rl.style.top = `${top - PY + ri * TRACK + CAR_H + WHEEL - 4}px`;
          r.rails.push(rl);
        }
        const trTop = top + lay.h + 56;
        r.tr.style.top = `${trTop - PY}px`;
        r.tip.style.top = `${trTop + r.tr.offsetHeight + 40 - PY}px`;
        // depo: 2 sütun, satırlar 170 aralıklı, karışık
        const { order, r: rnd } = shuffle(r.cars.length, 331 + i * 53);
        const cols = 2;
        const slotW = G.W / cols;
        order.forEach((k, s) => {
          const g = r.cars[k];
          const c = s % cols;
          const row = Math.floor(s / cols);
          const free = Math.max(0, slotW - g.wFinal - 12);
          const x = G.L + c * slotW + rnd() * free;
          g.from = { x: Math.min(x, G.R - g.wFinal) - PX, y: 450 + row * 200 + rnd() * 24 - PY };
        });
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
      const ho = HOOK - 0.45;
      el.hook.render(t, 0.05, ho);
      const pk0 = p(t, HOOK - 0.35, 0.65);
      set(el.panel, { o: ease.outCubic(pk0 * 2), y: (1 - ease.spring(pk0)) * 900 });
      set(el.clip, { o: 1, y: (1 - ease.spring(pk0)) * 900 });
      const ci = L.findIndex((r) => t >= r.a && t < r.b);
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ci >= 0 ? ci : t >= END ? L.length : 0, ci >= 0 ? p(t, L[ci].a, L[ci].b - L[ci].a) : 0);

      rounds.forEach((r) => {
        const P = r.plan;
        const shown = t >= P.a - 0.05 && t <= P.b + 0.05;
        r.root.style.display = shown ? "" : "none";
        if (!shown) return;
        // çıkış: tren sola çekip gider
        const out = ease.inCubic(p(t, P.b - 0.45, 0.45));
        set(r.root, { o: 1 - out * 0.6, x: -out * 1100 });
        set(r.lab, { o: p(t, P.a, 0.3) });
        const n = Math.max(1, 3 - Math.floor(Math.max(0, t - P.think) / (THINK / 3)));
        r.cd.textContent = String(n);
        const tk2 = p((t - P.think) % (THINK / 3), 0, 0.3);
        set(r.cd, { o: p(t, P.think - 0.2, 0.2) * (1 - p(t, P.arr - 0.1, 0.15)), s: t < P.think ? 1 : 1.22 - ease.outBack(tk2) * 0.22 });
        r.cd.style.background = n === 1 ? E.ART.die : INK;
        const lk = p(t, P.arr, 0.5);
        set(r.loco, { o: ease.outCubic(lk * 2), x: (1 - ease.outExpo(lk)) * -300, y: 0 });
        r.rails.forEach((rl) => {
          rl.style.transformOrigin = "0 50%";
          const k = ease.outExpo(p(t, P.arr, 0.6));
          set(rl, { o: k, sx: k, sy: 1 });
        });
        const placed = t >= P.arr + 0.55;
        r.cars.forEach((g, k) => {
          const fk = p(t, P.a + 0.3 + k * 0.08, 0.5);
          // 1) raya çık: depo konumundan sağ kenarın dışına, hedef satır yüksekliğine; 2) sağdan kayıp bağlan
          const s0 = P.arr + 0.4 + k * 0.16;
          const k1 = ease.inOutCubic(p(t, s0, 0.3));
          const k2 = ease.spring(p(t, s0 + 0.25, 0.7));
          const offX = 1000;
          let x = g.from.x + (offX - g.from.x) * k1;
          let y = g.from.y + (g.to.y - g.from.y) * k1;
          if (t >= s0 + 0.25) {
            x = offX + (g.to.x - offX) * k2;
            y = g.to.y;
          }
          const bump = t > P.v && t < P.v + P.d ? Math.sin((t - P.v) * 18 + k) * 2 : 0;
          set(g.c, { o: Math.min(1, fk * 3), x, y: y + (1 - ease.spring(fk)) * -40 + bump });
          const last = k === r.cars.length - 1;
          g.sp.textContent = placed ? g.w + (last ? r.tk.punct : "") : k === 0 ? g.w.toLocaleLowerCase("de") : g.w;
        });
        // duman: konuşma sürerken bacadan yükselen halkalar
        r.puffs.forEach((pf, j) => {
          const on = t >= P.v - 0.2 && t < P.tip + 1;
          const ph = ((t - P.v) * 0.8 + j * 0.25) % 1;
          set(pf, { o: on ? (1 - ph) * 0.9 : 0, x: G.L - PX + 96 - 6 + ph * 40, y: r.locoY - 40 - ph * 140, s: 0.6 + ph * 1.4 });
        });
        karaoke(r.cars.map((g) => g.c), t, P.v, P.d);
        if (t < P.v) r.cars.forEach((g) => g.c.classList.remove("said", "now"));
        const tipOn = t >= P.tip;
        r.cars.forEach((g, k) => g.c.classList.toggle("mark", tipOn && r.l.tip.mark.includes(k)));
        const tk = p(t, P.tr, 0.45);
        set(r.tr, { o: tk, y: (1 - ease.outCubic(tk)) * 20 });
        const pk = p(t, P.tip, 0.5);
        set(r.tip, { o: ease.outCubic(pk * 1.5), y: (1 - ease.spring(pk)) * 60 });
      });

      set(el.e1, { o: p(t, END, 0.4), y: (1 - ease.outCubic(p(t, END, 0.5))) * 30 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.5 + i * 0.14, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * -200 });
      });
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
