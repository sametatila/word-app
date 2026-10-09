/*
  Anons panosu şablonu: harf harf dönen kalkış tabelası + anonslar (Lacivert). Örnek bölüm: diyalog-lacivert-001 (tren gecikiyor).
  Tutma mantığı: kanca herkesin yaşadığı bir an + soru (izleyen kendini sınıyor) → tabela tıkırtıyla dönüyor
  (not satırı her anonsta değişir, uyarı kırmızı) → her anons altyazı gibi kelime kelime yanıyor, Türkçesi
  sonra, anahtar kelime hapı → senin cümlende sesli tekrar → özet + yorum sorusu.

  İçerik (D): lines [{ who: "me"|"them", board?, alert?, de, tr, keyDe, keyTr }] (H.line). board: o anonsla tabelanın
  not satırına yazılan metin (büyük harf, en çok ~12 harf); alert: true ise kırmızı (yoksa "FÄLLT" içeren kırmızı, diğerleri sarı).
  copy anahtarları
    zorunlu: title, hook (tam 2 satır: 1. büyük, 2. küçük turuncu), caption, outro { series, ask },
             board { time, dest, track } (tabelanın üst satırı, ör. "14:32", "KÖLN", " 3"; uzunsa hücreler küçülür),
             them (anons etiketi, büyük harf, ör. "ANONS"), recapTitle (özet üst satırı), endTitle (özet başlığı)
    isteğe bağlı: boardLabels (4 alan adı; yoksa ui.labelTime/labelDest/labelTrack/labelNote)
  sabit yazılar (copy.ui ile ezilir): labelTime "ZEIT", labelDest "ZIEL", labelTrack "GLEIS", labelNote "HINWEIS"
    (tabela alan adları), sayNow "Şimdi sen söyle", me "SEN" (canlı etiket)
*/
E.register(
  "diyalog-lacivert",
  {
    title: "Anons panosu",
    approach: "diyalog",
    theme: "lacivert",
    ui: { labelTime: "ZEIT", labelDest: "ZIEL", labelTrack: "GLEIS", labelNote: "HINWEIS", sayNow: "Şimdi sen söyle", me: "SEN" },
  },
  (X) => {
  const { h, set, p, ease, words, karaoke, segments } = E;
  const D = X.data;
  const C = D.copy;
  for (const k of ["title", "hook", "caption", "outro", "board", "them", "recapTitle", "endTitle"]) if (C?.[k] == null) throw new Error(`diyalog-lacivert: copy.${k} eksik`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("diyalog-lacivert: copy.hook tam 2 satır olmalı");
  for (const k of ["time", "dest", "track"]) if (typeof C.board[k] !== "string") throw new Error(`diyalog-lacivert: copy.board.${k} eksik`);
  const LAB = C.boardLabels || [X.ui("labelTime"), X.ui("labelDest"), X.ui("labelTrack"), X.ui("labelNote")];
  const T = X.theme;
  const G = E.G;
  const MONO = '"DM Mono", ui-monospace, Menlo, monospace';
  const HOOK = 2.6;
  const BOARD_IN = HOOK - 0.2; // tabela dolmaya başlar
  // hücre boyu: üst satır (saat + yön + peron) ve not satırı tabelaya sığsın diye gerekirse küçülür
  const NOTE_N = Math.max(12, ...D.lines.map((l) => (l.board || "").length));
  const FIT = Math.min(1, 702 / ((C.board.time.length + C.board.dest.length + C.board.track.length) * 62), 744 / (NOTE_N * 62));
  const CELL = { w: Math.floor(56 * FIT), h: Math.floor(84 * FIT), gap: Math.max(3, Math.round(6 * FIT)) };
  const CH = " ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜ0123456789:+";
  const FLAP = 0.05; // bir harf değişimi
  const RED = "#ff5a6e";
  const AMBER = "#ffb020";
  let L = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  let flaps = []; // { el, ch, changes:[{t, to, color}] }
  const isAlert = (txt, l) => (l.alert != null ? !!l.alert : /FÄLLT/.test(txt || ""));

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.55, name: "pop", f: 560 }, { t: BOARD_IN, name: "print", d: 0.9 }];
      let t = HOOK + 1.0;
      let prev = "";
      L = D.lines.map((l) => {
        const board = l.board ?? prev; // board verilmeyen satırda tabela aynı kalır
        const r = { a: t, flip: board !== prev ? t + 0.05 : null };
        prev = board;
        if (r.flip) sfx.push({ t: r.flip, name: "print", d: 0.85 });
        r.v = t + (r.flip ? 1.05 : 0.4);
        r.d = dur(l.de);
        r.tr = r.v + r.d + 0.1;
        r.key = r.tr + 0.4;
        voice.push({ t: r.v, text: l.de });
        sfx.push({ t: r.key, name: "pop", f: 880, v: 0.55 });
        if (r.flip && isAlert(l.board, l)) sfx.push({ t: r.flip + 0.9, name: "impact", v: 0.45 }); // tabela kırmızıya dönünce
        if (l.who === "me") {
          r.rep = r.key + 0.6;
          r.repD = r.d + 1.0;
          sfx.push({ t: r.rep, name: "count", n: 76 });
          r.b = r.rep + r.repD + 0.2;
        } else r.b = r.key + 1.4;
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.5 + E.OUTRO_LEN;
      sfx.push({ t: END, name: "whoosh", d: 0.45, down: true });
      D.lines.forEach((_, i) => sfx.push({ t: END + 0.7 + i * 0.13, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.5, name: "pop", f: 700 });
      const alertAt = D.lines.findIndex((l) => isAlert(l.board, l));
      const meAt = D.lines.findIndex((l) => l.who === "me");
      return {
        duration: DUR,
        poster: 2.1,
        voice,
        sfx,
        music: { style: "cinema", bpm: 84, root: 50, mode: "min", gain: 0.45, seed: "diyalog-lacivert" },
        notes: [
          { t: 0, title: "Kanca: soru", why: "Herkesin başına gelen bir an ve doğrudan bir soru: izleyen anonsu anlayıp anlamayacağını merak ediyor." },
          { t: BOARD_IN, title: "Tabela", why: "Harfler tıkırdayarak dönüyor: mekânın kendi dili. Saat, yön ve yer tek bakışta okunuyor." },
          { t: L[0].a, title: "İlk anons", why: "Tabela değişirken aynı cümle anonsta duyuluyor; altyazı kelime kelime yanıyor, Türkçesi sonra geliyor." },
          ...(alertAt > 0 ? [{ t: L[alertAt].a, title: "Tabela kırmızı", why: "Durum kötüleşiyor, tabela kırmızıya dönüyor. Gerçek hayattan bir an, gülümsetiyor ve yorum yazdırıyor." }] : []),
          ...(meAt >= 0 ? [{ t: L[meAt].a, title: "Söz senin", why: "Bu cümleyi izleyen söylüyor: sesli tekrar arası, ilerleme çubuğuyla." }] : []),
          { t: END, title: "Özet + kapanış", why: "Anahtar kelimeler kalıyor; herkesin anlatacak bir hikâyesi olan bir yorum sorusu." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .glow{width:1000px;height:1000px;border-radius:50%;filter:blur(170px);background:#2a4bd0}
        .board{left:${G.L}px;width:${G.W}px;top:340px;height:356px;border-radius:32px;background:#070c1f;box-shadow:inset 0 0 0 3px rgba(255,255,255,.06),0 30px 70px -30px rgba(0,0,0,.8)}
        .lab{font-family:${MONO};font-size:26px;letter-spacing:.18em;color:rgba(244,241,234,.5)}
        .cell{width:${CELL.w}px;height:${CELL.h}px;border-radius:10px;background:#1a2444;overflow:hidden}
        .cell::after{content:"";position:absolute;left:0;right:0;top:50%;height:3px;margin-top:-1px;background:#070c1f}
        .cell b{left:0;right:0;top:0;bottom:0;display:flex;align-items:center;justify-content:center;font-family:${MONO};font-size:${Math.round(54 * FIT)}px;font-weight:500;color:#f4f1ea;transform-origin:50% 50%}
        .live{left:${G.L}px;top:760px;height:64px;padding:0 28px 0 20px;border-radius:32px;display:flex;align-items:center;gap:14px;font-size:30px;font-weight:800;letter-spacing:.1em;white-space:nowrap}
        .live *{position:relative}
        .live svg{width:40px;height:40px}
        .sub{left:${G.L}px;width:${G.W}px;top:852px}
        .sub *{position:relative}
        .de{display:block;font-size:62px;font-weight:700;line-height:1.16;letter-spacing:-.01em}
        .de .w{opacity:.3}.de .w.said{opacity:1}.de .w.now{color:${T.acc}}
        .trl{display:block;margin-top:18px;font-size:42px;font-weight:500;line-height:1.28;color:${T.sub}}
        .key{display:inline-flex;margin-top:24px;align-items:center;gap:12px;height:68px;padding:0 28px;border-radius:34px;background:rgba(251,143,42,.16);color:${T.acc};font-size:34px;font-weight:700}
        .key b{color:#fff}
        .rep{left:${G.L}px;width:${G.W}px;height:96px;border-radius:48px;background:rgba(255,255,255,.08);display:flex;align-items:center;gap:20px;padding:0 32px;overflow:hidden}
        .rep *{position:relative}
        .rep svg{width:52px;height:52px}
        .rep span{font-size:40px;font-weight:800}
        .rep .bar{position:absolute;left:0;bottom:0;height:8px;width:100%;background:${T.acc};transform-origin:0 50%}
        .e1{left:${G.L}px;width:${G.W}px;top:330px;text-align:center;font-size:52px;font-weight:700;color:${T.sub}}
        .e2 span{position:relative}.e2{left:${G.L}px;width:${G.W}px;top:410px;text-align:center;white-space:nowrap;font-size:104px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1}
        .row{left:${G.L}px;width:${G.W}px;height:112px;border-radius:32px;background:${T.surface};display:flex;align-items:center;gap:20px;padding:0 40px;font-size:50px;font-weight:800;white-space:nowrap}
        .row *{position:relative}
        .row small{margin-left:auto;font-size:38px;font-weight:600;color:${T.sub}}
      `);
      el.g1 = h("div", "glow", root);
      el.g2 = h("div", "glow", root);
      el.segs = segments(root, D.lines.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 124 }, { t: C.hook[1], size: 92, color: T.acc, delay: 0.55 }], { center: 1020 });
      // tabela: üst sıra saat · yön · peron, alt sıra not
      el.board = h("div", "board", root);
      const field = (label, x, y, text, n) => {
        const lb = h("div", "lab", el.board, label);
        lb.style.left = `${x}px`;
        lb.style.top = `${y}px`;
        return Array.from({ length: n }, (_, i) => {
          const c = h("div", "cell", el.board, "<b></b>");
          c.style.left = `${x + i * (CELL.w + CELL.gap)}px`;
          c.style.top = `${y + 40}px`; // etiketin altında
          const f = { b: c.firstChild, changes: [{ t: BOARD_IN + 0.1 + flaps.length * 0.025, to: (text[i] || " ").toUpperCase(), color: "#f4f1ea" }] };
          flaps.push(f);
          return f;
        });
      };
      // saat solda, yön saatin ardından, peron sağa yaslı (iç kenar 790)
      const step = CELL.w + CELL.gap;
      const B = C.board;
      field(LAB[0], 40, 40, B.time, B.time.length);
      field(LAB[1], 40 + B.time.length * step - CELL.gap + 28, 40, B.dest, B.dest.length);
      field(LAB[2], 790 - B.track.length * step + CELL.gap, 40, B.track, B.track.length);
      const note = field(LAB[3], 40, 196, "", NOTE_N);
      // not satırı her anonsta değişir
      L.forEach((r, i) => {
        if (!r.flip) return;
        const txt = D.lines[i].board || "";
        const color = isAlert(txt, D.lines[i]) ? RED : AMBER;
        note.forEach((f, k) => f.changes.push({ t: r.flip + k * 0.035, to: (txt[k] || " ").toUpperCase(), color }));
      });
      // her hücre için belirli harf dizisi: başlangıçtan hedefe karakter setinde ileri sayar (gerçek tabela gibi)
      flaps.forEach((f) => {
        let cur = " ";
        let prevColor = "#f4f1ea";
        f.steps = f.changes.map((c) => {
          const a = Math.max(0, CH.indexOf(cur));
          const b = Math.max(0, CH.indexOf(c.to));
          const dist = (b - a + CH.length) % CH.length;
          const n = c.to === cur ? 0 : Math.min(10, Math.max(4, dist)); // en az 4, en çok 10 harf döner
          const seq = Array.from({ length: n }, (_, k) => CH[(b - (n - 1 - k) + CH.length) % CH.length]);
          const step = { t: c.t, seq, to: c.to, color: c.color, prevColor };
          cur = c.to;
          prevColor = c.color;
          return step;
        });
      });
      el.live = h("div", "live", root);
      el.subs = D.lines.map((l) => {
        const s = h("div", "sub", root);
        const de = h("span", "de", s);
        const sp = words(de, l.de);
        h("span", "trl", s, l.tr);
        const tr = s.lastChild;
        const key = h("span", "key", s, `<b>${l.keyDe}</b> = ${l.keyTr}`);
        return { s, sp, tr, key };
      });
      const mic = `<svg viewBox="0 0 24 24"><path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-3.1A7 7 0 0019 11z" fill="${T.acc}"/></svg>`;
      el.rep = h("div", "rep", root, `${mic}<span>${X.ui("sayNow")}</span><i class="bar"></i>`);
      el.repBar = el.rep.querySelector(".bar");
      el.e1 = h("div", "e1", root, C.recapTitle);
      el.e2 = h("div", "e2", root, `<span>${C.endTitle}</span>`);
      el.rows = D.lines.map((l, i) => {
        const x = h("div", "row", root, `<b>${l.keyDe}</b><small>${l.keyTr}</small>`);
        x.style.top = `${580 + i * 130}px`;
        return x;
      });
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.hook.layout();
      el.subH = el.subs.map((s) => s.s.offsetHeight);
      // ortalı metin: iç span ölçülür; optik boyut büyüklüğe göre değiştiği için ölçüm doğrusal değil, sığana dek küçült
      for (let fs = 104, i = 0; i < 6 && el.e2.firstChild.offsetWidth > G.W; i++) {
        fs = Math.floor((fs * G.W) / el.e2.firstChild.offsetWidth) - 1;
        el.e2.style.fontSize = `${fs}px`;
      }
    },

    render(t) {
      set(el.g1, { o: 0.3, x: -420 + Math.sin(t * 0.4) * 140, y: -380 + Math.cos(t * 0.3) * 120 });
      set(el.g2, { o: 0.2, x: 360 + Math.cos(t * 0.35) * 140, y: 1150 + Math.sin(t * 0.42) * 140 });
      el.hook.render(t, 0.05, HOOK - 0.35);
      const bk = p(t, BOARD_IN - 0.5, 0.6);
      const bOut = ease.inCubic(p(t, END, 0.4));
      set(el.board, { o: Math.min(ease.outCubic(bk * 2), 1 - bOut), y: (1 - ease.spring(bk)) * -160 - bOut * 120 });
      // tabela hücreleri
      flaps.forEach((f) => {
        let ch = " ";
        let color = "#f4f1ea";
        let flip = 0;
        for (const s of f.steps) {
          if (t < s.t) break;
          const i = Math.floor((t - s.t) / FLAP);
          if (i >= s.seq.length) {
            ch = s.to;
            color = s.color;
          } else {
            ch = s.seq[i];
            color = s.prevColor;
            flip = ((t - s.t) % FLAP) / FLAP;
          }
        }
        if (f.b.textContent !== ch) f.b.textContent = ch;
        f.b.style.color = color;
        f.b.style.transform = `scaleY(${flip ? Math.abs(Math.cos(Math.PI * flip)).toFixed(3) : 1})`;
      });

      const li = L.findIndex((r, i) => t >= r.a && t < (L[i + 1]?.a ?? END));
      set(el.segs.el, { o: p(t, HOOK, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(li >= 0 ? li : t >= END ? L.length : 0, li >= 0 ? p(t, L[li].a, (L[li + 1]?.a ?? END) - L[li].a) : 0);

      // canlı etiket: ANONS (hoparlör dalgası) ya da SEN
      if (li >= 0) {
        const l = D.lines[li];
        const r = L[li];
        const talking = t >= r.v && t < r.v + r.d;
        const wave = [0, 1, 2].map((k) => `<path d="M${14 + k * 3.2} ${8 - k * 2.2}a${6 + k * 3} ${6 + k * 3} 0 010 ${8 + k * 4.4}" stroke="${T.bg}" stroke-width="2" fill="none" opacity="${talking ? (0.35 + 0.65 * Math.abs(Math.sin(t * 7 - k))).toFixed(2) : 0.35}"/>`).join("");
        const html = l.who === "me" ? `<span>${X.ui("me")}</span>` : `<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3z" fill="${T.bg}"/>${wave}</svg><span>${C.them}</span>`;
        if (el.live.dataset.k !== `${li}-${talking ? Math.floor(t * 12) : "s"}`) {
          el.live.innerHTML = html;
          el.live.dataset.k = `${li}-${talking ? Math.floor(t * 12) : "s"}`;
        }
        el.live.style.background = l.who === "me" ? T.acc : T.ink;
        el.live.style.color = T.bg;
        const k = p(t, r.a, 0.35);
        set(el.live, { o: Math.min(k * 2, 1 - p(t, (L[li + 1]?.a ?? END) - 0.25, 0.25)), x: (1 - ease.outExpo(k)) * -60 });
      } else set(el.live, { o: 0 });

      el.subs.forEach((s, i) => {
        const r = L[i];
        const nextA = L[i + 1]?.a ?? END;
        const shown = t >= r.a - 0.05 && t < nextA + 0.05;
        s.s.style.display = shown ? "" : "none";
        if (!shown) return;
        const k = p(t, r.v - 0.35, 0.45);
        const out = ease.inCubic(p(t, nextA - 0.3, 0.3));
        set(s.s, { o: Math.min(ease.outCubic(k * 2), 1 - out), y: (1 - ease.spring(k)) * 60 - out * 40, blur: (1 - ease.outCubic(k)) * 10 + out * 8 });
        karaoke(s.sp, t, r.v, r.d);
        const tk = p(t, r.tr, 0.45);
        set(s.tr, { o: tk, y: (1 - ease.outCubic(tk)) * 16 });
        const kk = p(t, r.key, 0.45);
        const kOut = r.rep ? p(t, r.rep - 0.1, 0.25) : 0;
        set(s.key, { o: ease.outCubic(kk * 1.5) * (1 - kOut), s: 0.7 + ease.spring(kk) * 0.3 });
      });
      const rr = L.find((r) => r.rep && t >= r.rep - 0.1 && t < r.rep + r.repD + 0.25);
      if (rr) {
        const i = L.indexOf(rr);
        const rk = p(t, rr.rep, 0.4);
        el.rep.style.top = `${852 + el.subH[i] - 68 - 14}px`; // anahtar kelime hapının yerine
        set(el.rep, { o: Math.min(rk * 2, 1 - p(t, rr.rep + rr.repD, 0.25)), s: 0.9 + ease.spring(rk) * 0.1 });
        el.repBar.style.transform = `scaleX(${1 - p(t, rr.rep + 0.25, rr.repD - 0.25)})`;
      } else set(el.rep, { o: 0 });

      set(el.e1, { o: p(t, END + 0.3, 0.4) });
      const k2 = p(t, END + 0.35, 0.55);
      set(el.e2, { o: ease.outCubic(k2 * 2), y: (1 - ease.spring(k2)) * 60 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.7 + i * 0.13, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * 200 });
      });
      el.outro(t, END + 1.5);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
