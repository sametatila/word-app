/*
  "Cümleyi kur", defter (Kâğıt): Türkçesi görev kartında, Almancası bantlı notlarda. Sahne ve metinler bölüm dosyasından (copy).
  Tutma mantığı: üstte Türkçe cümle bir görev gibi duruyor ("Bunu Almanca nasıl dersin?") → altta bantlı
  yapışkan notlar dağınık asılı → izleyen kafasında kuruyor → notlar defter çizgisine sırayla iniyor → cümle
  sesle okunurken fosforlu kalem notların altından geçiyor → ipucu kenar notu olarak düşüyor → özet + kapanış.
*/
E.register("kur-kagit", { title: "Cümleyi kur · defter", approach: "kur", theme: "kagit", ui: { task: "{n}/{total} · ALMANCA NASIL DERSİN?", tip: "KÜÇÜK NOT", summary: "{scene} {total} cümle" } }, (X) => {
  const { h, set, p, ease, karaoke, segments } = E;
  const D = X.data;
  /*
    copy anahtarları (bölüm dosyası, D.copy):
      zorunlu    title, hook (3 satır: 1. gri 92 px, 2. siyah 128 px, 3. turuncu 128 px), caption, outro { series, ask }, scene (sahne adı, ör. "Kafede")
      isteğe bağlı summary (kapanış başlığı; yoksa "<scene> <cümle sayısı> cümle")
      ui (sabit yazılar; bölüm copy.ui ile ezer): task "{n}/{total} · ALMANCA NASIL DERSİN?", tip "KÜÇÜK NOT",
                 summary "{scene} {total} cümle" (copy.summary yoksa)
    cümle sayısı: 2–4; cümle uzunluğu: en çok 8 kelime (daha uzunu yerleşime sığmıyor)
  */
  const C = D.copy;
  const need = (ok, msg) => {
    if (!ok) throw new Error(`kur-kagit: ${msg}`);
  };
  need(C, "copy yok");
  for (const k of ["title", "caption", "scene"]) need(C[k], `copy.${k} yok`);
  need(Array.isArray(C.hook) && C.hook.length === 3, "copy.hook 3 satır olmalı");
  need(C.outro && C.outro.series && C.outro.ask, "copy.outro.series ve copy.outro.ask gerekli");
  need(Array.isArray(D.lines) && D.lines.length >= 2 && D.lines.length <= 4, "2–4 cümle olmalı");
  for (const l of D.lines) need(l.de.split(" ").length <= 8, `cümle en çok 8 kelime: ${l.de}`);
  const SUMMARY = C.summary || X.ui("summary", { scene: C.scene, total: D.lines.length });
  const T = X.theme;
  const G = E.G;
  const OR = T.acc;
  const HOOK = 2.8;
  const THINK = 3.0;
  const NOTE_H = 128;
  const GAP = 24;
  const ROWGAP = 40; // defter satır aralığı: notların altında çizgi
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
  /** Notları satırlara sarar (yazı alanı 834), satırlar sola yaslı: defterde yazı soldan başlar. */
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
      let x = G.L;
      row.forEach((i) => {
        pos[i] = { x, y: top + ri * (NOTE_H + ROWGAP) };
        x += widths[i] + GAP;
      });
    });
    return { pos, rows: rows.length, h: rows.length * NOTE_H + (rows.length - 1) * ROWGAP };
  };

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.6 }, { t: 0.5, name: "pop", f: 560 }, { t: 1.0, name: "pop", f: 700 }, { t: HOOK - 0.35, name: "whoosh", d: 0.45 }];
      let t = HOOK;
      L = D.lines.map((l) => {
        const n = tok(l.de).w.length;
        const r = { a: t };
        sfx.push({ t: r.a + 0.05, name: "flip" });
        for (let k = 0; k < n; k++) sfx.push({ t: r.a + 0.55 + k * 0.08, name: "flip" });
        r.think = r.a + 1.1;
        [0, 1, 2].forEach((k) => sfx.push({ t: r.think + k, name: "tick", hi: k === 2 }));
        r.arr = r.think + THINK + 0.1;
        for (let k = 0; k < n; k++) sfx.push({ t: r.arr + 0.3 + k * 0.1, name: "pop", f: 500 + k * 45, v: 0.45 });
        r.v = r.arr + 0.4 + n * 0.1 + 0.3;
        r.d = dur(l.de);
        voice.push({ t: r.v, text: l.de });
        r.tip = r.v + r.d + 0.35;
        sfx.push({ t: r.tip, name: "print", d: 0.3 });
        r.b = r.tip + 2.0;
        sfx.push({ t: r.b - 0.38, name: "whoosh", d: 0.4, v: 0.55 });
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      D.lines.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.14, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.3,
        voice,
        sfx,
        music: { style: "bossa", bpm: 92, root: 55, mode: "soul", gain: 0.45, seed: "kur-kagit" },
        notes: [
          { t: 0, title: "Kanca: her gün lazım", why: "İlk iki satır cümleleri işe yarar kılıyor (her gün kurulan cümleler), son satır izleyene görev veriyor." },
          { t: L[0].a, title: "Önce Türkçesi", why: "Görev kartı Türkçe cümleyi veriyor: izleyen 'bunu Almanca nasıl derim' diye düşünüyor, notlar dağınık asılı." },
          { t: L[0].arr, title: "Deftere iniyor", why: "Notlar sırayla defter çizgisine iniyor, her biri kâğıt sesiyle. Satırlar soldan başlıyor, gerçek bir defter gibi." },
          { t: L[0].v, title: "Fosforlu kalem", why: "Cümle okunurken turuncu kalem notların altından geçiyor; göz sesi takip ediyor." },
          { t: L[0].tip, title: "Kenar notu", why: "Kural kısa ve kesin; ilgili notlar turuncuya dönüyor." },
          { t: END, title: "Özet + kapanış", why: "Cümleler Türkçeleriyle liste olarak kalıyor (kaydetme). Standart kapanış ve kutulu imza." },
        ],
        caption: C.caption,
        title: C.title,
      };
    },

    build(root) {
      X.style(`
        .rd{inset:0}
        .task{left:${G.L}px;width:${G.W}px;top:280px;padding:32px 40px 36px;border-radius:32px;background:#fff;box-shadow:0 20px 50px -30px rgba(40,30,20,.45);display:flex;flex-direction:column;gap:12px}
        .task *{position:relative}
        .task small{font-size:30px;font-weight:800;letter-spacing:.1em;color:${T.sub}}
        .task b{font-size:56px;font-weight:800;font-stretch:88%;letter-spacing:-.01em;line-height:1.15}
        .bar{left:40px;right:40px;bottom:0;height:8px;border-radius:4px;background:rgba(27,27,29,.08);overflow:hidden;position:absolute!important}
        .bar i{position:absolute;left:0;top:0;bottom:0;width:100%;background:${OR};transform-origin:0 50%}
        .note{top:0;left:0;height:${NOTE_H}px;padding:0 40px;border-radius:32px;background:#fff;box-shadow:0 16px 30px -18px rgba(40,30,20,.55);display:flex;align-items:center;font-size:70px;font-weight:700;letter-spacing:-.01em;white-space:nowrap;color:${T.ink}}
        .note .tape{position:absolute;left:50%;top:-14px;width:72px;height:28px;margin-left:-36px;border-radius:6px;background:rgba(248,118,18,.55);transform:rotate(-4deg)}
        .note span{position:relative}
        .note .mk{position:absolute;left:28px;right:28px;bottom:22px;height:16px;border-radius:8px;background:rgba(248,118,18,.45);transform-origin:0 50%;transform:scaleX(0)}
        .note.now .mk,.note.said .mk{transform:scaleX(1)}
        .note.mark{background:${OR};color:#fff}
        .note.mark .tape{background:rgba(27,27,29,.35)}
        .note.mark .mk{background:rgba(255,255,255,.45)}
        .rule{left:${G.L}px;width:${G.W}px;height:0;border-top:3px solid rgba(27,27,29,.12)}
        .tip{left:${G.L}px;width:${G.W}px;padding:28px 36px;border-radius:32px;border:4px dashed rgba(248,118,18,.6);display:flex;flex-direction:column;gap:10px}
        .tip *{position:relative}
        .tip small{font-size:30px;font-weight:800;letter-spacing:.1em;color:${OR}}
        .tip span{font-size:46px;font-weight:700;line-height:1.25}
        .e1{left:${G.L}px;width:${G.W}px;top:320px;text-align:center;font-size:96px;font-weight:800;font-stretch:84%;letter-spacing:-.02em}
        .row{left:${G.L}px;width:${G.W}px;padding:20px 32px;border-radius:32px;background:#fff;box-shadow:0 10px 24px -18px rgba(40,30,20,.5);display:flex;flex-direction:column;gap:6px}
        .row *{position:relative}
        .row b{font-size:42px;font-weight:700;line-height:1.2}
        .row small{font-size:34px;font-weight:500;color:${T.sub}}
      `);
      el.segs = segments(root, D.lines.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 92, weight: 700, color: T.sub }, { t: C.hook[1], size: 128, delay: 0.4 }, { t: C.hook[2], size: 128, color: OR, delay: 0.85 }], { center: 760 });
      rounds = D.lines.map((l, i) => {
        const r = { l, root: h("div", "rd", root), tk: tok(l.de), plan: L[i] };
        r.task = h("div", "task", r.root, `<small>${X.ui("task", { n: i + 1, total: D.lines.length })}</small><b>${l.tr}</b><div class="bar"><i></i></div>`);
        r.bar = r.task.querySelector(".bar i");
        r.rules = [];
        r.notes = r.tk.w.map((w) => {
          const n = h("div", "note", r.root, `<i class="tape"></i><span></span><i class="mk"></i>`);
          return { n, sp: n.querySelector("span"), w };
        });
        r.tip = h("div", "tip", r.root, `<small>${X.ui("tip")}</small><span>${l.tip.text}</span>`);
        return r;
      });
      el.e1 = h("div", "e1", root, SUMMARY);
      el.rows = D.lines.map((l) => h("div", "row", root, `<b>${l.de}</b><small>${l.tr}</small>`));
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.hook.layout();
      rounds.forEach((r, i) => {
        r.taskB = 280 + r.task.offsetHeight;
        r.notes.forEach((g, k) => {
          g.sp.textContent = g.w + (k === r.notes.length - 1 ? r.tk.punct : "");
          g.wFinal = g.n.offsetWidth;
          g.sp.textContent = k === 0 ? g.w.toLocaleLowerCase("de") : g.w;
          g.wLoose = g.n.offsetWidth;
        });
        // dizilmiş: görev kartının altında, ipucuyla birlikte kalan alanda ortalı blok
        const lay0 = wrap(r.notes.map((g) => g.wFinal), 0);
        const blockH = lay0.h + 64 + r.tip.offsetHeight;
        const top = Math.max(r.taskB + 96, Math.round((r.taskB + 1500) / 2 - blockH / 2));
        const lay = wrap(r.notes.map((g) => g.wFinal), top);
        r.notes.forEach((g, k) => (g.to = lay.pos[k]));
        for (let ri = 0; ri < lay.rows; ri++) {
          const ln = h("div", "rule", r.root);
          ln.style.top = `${top + ri * (NOTE_H + ROWGAP) + NOTE_H + 18}px`;
          r.rules.push(ln);
        }
        r.tip.style.top = `${top + lay.h + 64}px`;
        // dağınık: görev kartının altındaki alanda 3 sütun, satırlar arası 168
        const { order, r: rnd } = shuffle(r.notes.length, 211 + i * 47);
        // dağınık: karışık sırayla gerçek genişliklere göre satırlara dizilir (araya rastgele boşluk, satır
        // kayık ve eğik); yuvalar sabit genişlikte olmadığı için geniş not komşusuna binemez
        const y0 = r.taskB + 96;
        const rowsS = [[]];
        let wsum = 0;
        order.forEach((k) => {
          const g = r.notes[k];
          const gap = 28 + rnd() * 36;
          if (rowsS[rowsS.length - 1].length && wsum + gap + g.wLoose > G.W) {
            rowsS.push([]);
            wsum = 0;
          }
          const row = rowsS[rowsS.length - 1];
          wsum += (row.length ? gap : 0) + g.wLoose;
          row.push({ g, gap: row.length ? gap : 0 });
        });
        rowsS.forEach((row, ri) => {
          const rw = row.reduce((a, c) => a + c.gap + c.g.wLoose, 0);
          let x = G.L + rnd() * (G.W - rw);
          row.forEach((c) => {
            x += c.gap;
            c.g.from = { x, y: y0 + ri * 176 + rnd() * 28, r: (rnd() - 0.5) * 12 };
            x += c.g.wLoose;
          });
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
      const ho = HOOK - 0.35;
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
        set(r.root, { o: 1 - out, x: -out * 260 });
        const tk = p(t, P.a, 0.55);
        set(r.task, { o: ease.outCubic(tk * 2), y: (1 - ease.spring(tk)) * -80, r: (1 - ease.spring(tk)) * -2 });
        set(r.bar.parentNode, { o: p(t, P.think - 0.2, 0.2) * (1 - p(t, P.arr, 0.3)) });
        r.bar.style.transform = `scaleX(${1 - p(t, P.think, THINK)})`;
        const placed = t >= P.arr + 0.3;
        r.notes.forEach((g, k) => {
          // asılma: üstten aşağı açılarak (bant yerinde), hafif sallanma
          const fk = p(t, P.a + 0.55 + k * 0.08, 0.5);
          const ak = ease.spring(p(t, P.arr + 0.2 + k * 0.1, 0.65));
          const x = g.from.x + (g.to.x - g.from.x) * ak;
          const y = g.from.y + (g.to.y - g.from.y) * ak;
          const sway = Math.sin(t * 2.2 + k * 1.3) * 1.6 * (1 - ak);
          set(g.n, { o: Math.min(1, fk * 3), x, y, r: g.from.r * (1 - ak) + sway + (k % 2 ? 0.6 : -0.6) * ak, sx: 1, sy: 0.2 + ease.spring(fk) * 0.8 });
          g.n.style.transformOrigin = "50% 0";
          const last = k === r.notes.length - 1;
          g.sp.textContent = placed ? g.w + (last ? r.tk.punct : "") : k === 0 ? g.w.toLocaleLowerCase("de") : g.w;
        });
        r.rules.forEach((ln, ri) => {
          const k = ease.outExpo(p(t, P.arr + ri * 0.12, 0.6));
          ln.style.transformOrigin = "0 50%";
          set(ln, { o: k, sx: k, sy: 1 });
        });
        karaoke(r.notes.map((g) => g.n), t, P.v, P.d);
        if (t < P.v) r.notes.forEach((g) => g.n.classList.remove("said", "now"));
        r.notes.forEach((g) => {
          const mk = g.n.querySelector(".mk");
          mk.style.transition = "none";
        });
        const tipOn = t >= P.tip;
        r.notes.forEach((g, k) => g.n.classList.toggle("mark", tipOn && r.l.tip.mark.includes(k)));
        const pk = p(t, P.tip, 0.5);
        set(r.tip, { o: ease.outCubic(pk * 1.5), y: (1 - ease.spring(pk)) * 50, r: (1 - ease.spring(pk)) * 3 });
      });

      set(el.e1, { o: p(t, END, 0.4), y: (1 - ease.outCubic(p(t, END, 0.5))) * 30 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.5 + i * 0.14, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), y: (1 - ease.spring(k)) * 80 });
      });
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
