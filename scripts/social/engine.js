/*
  Sosyal video motoru: 1080×1920 sahne, belirli kare, sentez ses, tek sayfada çok video.

  Video kaydı:
    E.register(id, { title, approach, theme, desc }, (X) => ({ plan(dur), build(scene, plan), render(t) }))
      X.data   → bu videonun verisi (build.mjs, words.json'dan)
      X.style  → yalnız bu sahnenin gölge DOM'una CSS ekler (videolar sınıf adlarında çakışmaz)
      X.theme  → E.THEMES'ten tema jetonları
    plan(dur)  → { duration, poster, voice:[{t,text}], sfx:[{t,name,...}], music, notes:[{t,title,why}], caption }
    render(t)  → yalnız t'ye bakarak bütün stilleri yazar (CSS animasyonu yok: aynı t, aynı kare)

  Her E.mount yeni bir örnek kurar (galeri küçük resmi ve oynatıcı ayrı örnekler).
*/
(() => {
  const E = (window.E = {});
  E.W = 1080;
  E.H = 1920;
  E.FONT = '"Bricolage Grotesque", "Bricolage", system-ui, sans-serif';

  /* TEMA STANDARDI. Logo turuncu bir kare: turuncu zeminde kaybolur. Bu yüzden imza her temada kendi kutusunda,
     turuncu temada da içerik beyaz bir panelin içinde duruyor. */
  E.THEMES = {
    gece: { name: "Gece", bg: "#141416", ink: "#f6f6f4", sub: "rgba(246,246,244,.66)", acc: "#fb8f2a", surface: "rgba(255,255,255,.07)", line: "rgba(255,255,255,.22)", pill: "#f87612", pillInk: "#141416", sigBg: "rgba(255,255,255,.09)", sigInk: "#ffffff", seg: "rgba(255,255,255,.22)", segFill: "#ffffff" },
    kagit: { name: "Kâğıt", bg: "#f1f0ec", ink: "#1b1b1d", sub: "#7a6a5c", acc: "#f87612", surface: "#ffffff", line: "rgba(27,27,29,.16)", pill: "#1b1b1d", pillInk: "#ffffff", sigBg: "#ffffff", sigInk: "#1b1b1d", seg: "rgba(27,27,29,.14)", segFill: "#1b1b1d" },
    lacivert: { name: "Lacivert", bg: "#101a36", ink: "#f4f1ea", sub: "rgba(244,241,234,.66)", acc: "#fb8f2a", surface: "rgba(255,255,255,.08)", line: "rgba(255,255,255,.22)", pill: "#f87612", pillInk: "#101a36", sigBg: "rgba(255,255,255,.1)", sigInk: "#ffffff", seg: "rgba(255,255,255,.25)", segFill: "#ffffff" },
    turuncu: { name: "Turuncu kutu", bg: "#f87612", panel: "#fffaf5", ink: "#1b1b1d", sub: "#8a6a52", acc: "#f87612", surface: "#fff1e4", line: "rgba(27,27,29,.14)", pill: "#1b1b1d", pillInk: "#ffffff", sigBg: "#ffffff", sigInk: "#1b1b1d", seg: "rgba(255,255,255,.35)", segFill: "#ffffff" },
  };
  E.ART = { der: "#4f8cff", die: "#ff5a6e", das: "#2fcf7b" };

  // ---------- zaman ve yumuşatma ----------
  E.clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x);
  E.p = (t, a, d) => E.clamp((t - a) / d);
  E.lerp = (a, b, x) => a + (b - a) * x;
  E.ease = {
    outExpo: (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
    outCubic: (x) => 1 - Math.pow(1 - x, 3),
    outQuint: (x) => 1 - Math.pow(1 - x, 5),
    inCubic: (x) => x * x * x,
    inOutCubic: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
    outBack: (x, s = 1.6) => 1 + (s + 1) * Math.pow(x - 1, 3) + s * Math.pow(x - 1, 2),
    spring: (x) => (x >= 1 ? 1 : 1 - Math.exp(-6.5 * x) * Math.cos(9.5 * x)),
  };
  const ease = E.ease;

  // ---------- DOM ----------
  E.h = (tag, cls, parent, html) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html != null) el.innerHTML = html;
    if (parent) parent.appendChild(el);
    return el;
  };
  const h = E.h;
  /** Dönüşüm + saydamlık (+ verilirse bulanıklık) tek çağrıda. */
  E.set = (el, { o = 1, x = 0, y = 0, s = 1, sx, sy, r = 0, blur } = {}) => {
    el.style.opacity = o.toFixed(3);
    el.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${r.toFixed(2)}deg) scale(${(sx ?? s).toFixed(4)},${(sy ?? s).toFixed(4)})`;
    if (blur !== undefined) el.style.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : "none";
    el.style.visibility = o <= 0.001 ? "hidden" : "visible";
  };
  E.words = (el, text) => {
    el.innerHTML = "";
    return text.split(/\s+/).map((w, i) => {
      if (i) el.appendChild(document.createTextNode(" "));
      return h("span", "w", el, w);
    });
  };
  E.wordsIn = (spans, t, start, { stagger = 0.09, dur = 0.55, dy = 70, out = null } = {}) => {
    spans.forEach((sp, i) => {
      const k = E.p(t, start + i * stagger, dur);
      const o = out ? 1 - E.p(t, out, 0.25) : 1;
      E.set(sp, { o: Math.min(ease.outCubic(k * 1.6), o), y: (1 - ease.spring(k)) * dy - (out ? ease.inCubic(E.p(t, out, 0.25)) * 40 : 0), blur: (1 - ease.outCubic(k)) * 14 });
    });
  };
  /** Baştan görünen kelimelerde vurgu dalgası: sırayla hafif kabarıp yerine oturur; `out` verilirse söner. */
  // Büyütme (grow) varsayılan 0: %8 büyüyen uzun kelime aradaki boşluğu yutuyordu ("Oturmaizninbitiyor.", 2026-10-09).
  E.wordsPulse = (spans, t, start, { stagger = 0.08, dur = 0.5, lift = 14, grow = 0, out = null } = {}) => {
    spans.forEach((sp, i) => {
      const k = E.p(t, start + i * stagger, dur);
      const bump = Math.sin(Math.PI * k);
      const ko = out ? E.p(t, out, 0.25) : 0;
      E.set(sp, { o: 1 - ko, y: -bump * lift - ease.inCubic(ko) * 40, s: 1 + bump * grow, blur: 0 });
    });
  };
  /** Karaoke: konuşulan kelime vurgulu, geçenler dolu, gelenler soluk; süre harf sayısına göre. */
  E.karaoke = (spans, t, start, dur) => {
    const wts = spans.map((s) => s.textContent.length + 2);
    const total = wts.reduce((a, b) => a + b, 0);
    let acc = start + 0.04;
    const done = t > start + dur + 0.1;
    spans.forEach((sp, i) => {
      const a = acc;
      const b = acc + (wts[i] / total) * dur * 0.9;
      acc = b;
      sp.classList.toggle("said", t >= a || done);
      sp.classList.toggle("now", !done && t >= a && t < b + 0.06);
    });
  };

  // ---------- ortak sahne parçaları ----------
  E.segments = (parent, n) => {
    const el = h("div", "segs", parent);
    const fills = Array.from({ length: n }, () => h("i", null, h("b", null, el)));
    return { el, set: (i, f) => fills.forEach((x, j) => (x.style.transform = `scaleX(${j < i ? 1 : j > i ? 0 : E.clamp(f)})`)) };
  };
  /**
   * IZGARA (bütün videolar): yazı alanı x 96–930 (sağda TikTok düğme sütunu), orta eksen 513, dikeyde
   * 250–1530 (üstte sekmeler ve bölüm çubuğu, altta açıklama). Boşluk ölçüsü 8'in katları; köşe: kart 48,
   * kutu 32, hap = yüksekliğin yarısı; iç içe kutuda dış köşe = iç köşe + dolgu (eş merkezli).
   */
  E.G = { L: 96, R: 930, W: 834, CX: 513, TOP: 250, BOT: 1530 };
  /**
   * KANCA: satırlar alt alta, satır aralığı yazı boyunun 1,16 katı, blok dikeyde `center` etrafında ortalanır.
   * Sığmayan satır 834 px'e küçülür. lines: [{ t, size, color, weight }]. render(t, start, out): metin 0. karede
   * tam okunur (akışta otomatik oynayan ilk kare ve kapak; kaydırma kararı ilk saniyede), hareket yalnız vurgu:
   * satırlar 0,4 sn arayla, kelime kelime kısa bir kabarma dalgası (2026-10-09; önceden kelimeler bulanıktan
   * 0,4–1 sn'de geliyordu ve ilk kare boştu).
   */
  E.hook = (parent, lines, { center = 780, gap = 1.16 } = {}) => {
    const els = lines.map((l) => {
      const el = h("div", "hk flow", parent);
      el.style.cssText = `left:${E.G.L}px;width:${E.G.W}px;text-align:center;white-space:nowrap;font-weight:${l.weight || 800};font-stretch:84%;letter-spacing:-.02em;line-height:1;font-size:${l.size}px;${l.color ? `color:${l.color};` : ""}`;
      const spans = E.words(el, l.t);
      return { el, spans, size: l.size, delay: l.delay };
    });
    return {
      els,
      layout() {
        // optik boyut puntoyla değiştiği için genişlik doğrusal değil: sığana dek (en çok 5 kez) küçült
        els.forEach((x) => {
          for (let k = 0; k < 5; k++) {
            x.el.style.fontSize = `${x.size}px`;
            const w = x.el.scrollWidth;
            if (w <= E.G.W) break;
            x.size = Math.floor((x.size * E.G.W) / w) - 1;
          }
          x.el.style.fontSize = `${x.size}px`;
        });
        const total = els.reduce((a, x, i) => a + x.size * (i ? gap : 1), 0);
        let y = center - total / 2;
        els.forEach((x, i) => {
          if (i) y += x.size * (gap - 1); // satırlar arası boşluk: yazı boyunun %16sı
          x.el.style.top = `${Math.round(y - x.size * 0.08)}px`;
          y += x.size;
        });
      },
      render(t, start, out) {
        els.forEach((x, i) => E.wordsPulse(x.spans, t, start + (x.delay ?? i * 0.42), { out }));
      },
    };
  };
  /** Turuncu tema: içerik bu açık panelin içinde. */
  E.panel = (parent, { top = 250, bottom = 1530 } = {}) => {
    const p = h("div", "panel", parent);
    p.style.top = `${top}px`;
    p.style.height = `${bottom - top}px`;
    return p;
  };
  /**
   * STANDART KAPANIŞ (bütün videolarda aynı yer, aynı sıra, ölçülü): seri sözü (tek hap) → yorum sorusu →
   * kutulu imza. Video kendi özetini bunun üstüne (y < 1150) koyar. Döndürdüğü fonksiyon render(t, başlangıç).
   */
  E.outro = (parent, { series, ask }) => {
    const s = h("div", "o-series", parent, series);
    const a = h("div", "o-ask", parent, ask);
    const g = h("div", "o-sig", parent, `<img src="${E.ICON}" alt=""><span>lernomi</span>`);
    let laid = false;
    /* Yerleşim ilk karede ölçülerek: hap ve soru tek satıra sığana dek küçülür (en az 34 / 32 px); soru yine de
       sarılırsa üçü alttan yukarı dizilir, imza hep sorunun altında kalır ve 1512'yi geçmez. */
    const layout = () => {
      laid = true;
      const fit = (el, size, min) => {
        el.style.whiteSpace = "nowrap";
        for (let k = 0; k < 6 && el.scrollWidth > el.clientWidth + 1 && size > min; k++) {
          size = Math.max(min, Math.floor((size * el.clientWidth) / el.scrollWidth) - 1);
          el.style.fontSize = `${size}px`;
        }
        if (el.scrollWidth > el.clientWidth + 1) el.style.whiteSpace = "normal";
      };
      fit(s, 52, 34);
      fit(a, 42, 32);
      const sigTop = 1512 - g.offsetHeight;
      const askTop = Math.min(1328, sigTop - 24 - a.offsetHeight);
      a.style.top = `${askTop}px`;
      s.style.top = `${Math.min(1176, askTop - 32 - s.offsetHeight)}px`;
      g.style.top = `${Math.max(askTop + a.offsetHeight + 24, 1408)}px`;
    };
    return (t, at) => {
      if (!laid) layout();
      const k1 = E.p(t, at, 0.55);
      E.set(s, { o: ease.outCubic(k1 * 2), s: 0.75 + ease.spring(k1) * 0.25 });
      const k2 = E.p(t, at + 0.45, 0.5);
      E.set(a, { o: k2, y: (1 - ease.outCubic(k2)) * 24 });
      const k3 = E.p(t, at + 0.85, 0.6);
      E.set(g, { o: k3, y: (1 - ease.outCubic(k3)) * 20, x: E.G.CX - g.offsetWidth / 2 });
    };
  };
  E.OUTRO_LEN = 3.8; // kapanış ekranda en az bu kadar: imza ~2,5 sn okunur kalsın

  // ---------- ses ----------
  const b64ToAb = (b64) => {
    const bin = atob(b64);
    const u = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return u.buffer;
  };
  const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
  let seed = 1;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

  /**
   * MÜZİK TARZLARI. Hepsi osilatör ve gürültüden sentez (örnek yok, telif yok). m = { style, bpm, root, gain, seed }.
   *   lofi    : yumuşak pad + arpej + boom-bap davul
   *   pulse   : 16'lık nabız bas (synthwave), dörtlük kick, kapılı pad
   *   keys    : elektrik piyano akorları + fırça shaker, davul yok denecek kadar az
   *   pluck   : marimba benzeri melodi + el çırpma, hafif dörtlük
   *   bounce  : sallantılı (swing) hip-hop, rhodes akorları, plak cızırtısı
   *   house   : dörtlük kick, ara vuruşta açık hi-hat, org vuruşları
   *   ambient : sıcak pad + seyrek çan melodisi, davul yok
   */
  const PROGS = {
    maj: [[0, 4, 7, 11], [-3, 0, 4, 7], [-7, -3, 0, 4], [-5, -1, 2, 7]],
    min: [[0, 3, 7, 10], [-4, 0, 3, 7], [-2, 2, 5, 9], [-5, -2, 2, 5]],
    lift: [[0, 4, 7, 11], [5, 9, 12, 16], [2, 5, 9, 12], [-5, -1, 2, 7]],
    soul: [[2, 5, 9, 12], [-5, -1, 2, 5], [0, 4, 7, 11], [-3, 0, 4, 7]],
  };
  /** Tarz başına seviye: ölçülen ortalama ses (rms) birbirine yakın olsun diye (8 sn'lik ölçüm, 2026-10-08). */
  const LEVEL = { keys: 1.35, ambient: 1.2, bossa: 1.8, jazz: 1.7, harp: 1.7, chip: 1.4, folk: 1.5, pluck: 1.1 };
  E.music = (m, duration, A) => {
    const { ctx, osc, gain, env, filt, noiseSrc, midi } = A;
    const style = m.style || "lofi";
    const out = ctx.createGain();
    out.gain.value = LEVEL[style] || 1;
    out.connect(A.out);
    const beat = 60 / m.bpm;
    const bar = beat * 4;
    const bars = Math.ceil(duration / bar) + 1;
    const prog = m.prog || PROGS[m.mode || "maj"];
    // videoya özgü tohum: aynı video hep aynı ezgi, farklı videolar farklı
    let sd = 0;
    for (const c of String(m.seed || style)) sd = (sd * 31 + c.charCodeAt(0)) % 2147483647;
    sd = sd || 11;
    const r = () => ((sd = (sd * 16807) % 2147483647) - 1) / 2147483646;
    const swing = style === "bounce" || style === "lofi" ? beat * 0.09 : 0;
    const at = (b, i8) => b * bar + i8 * beat * 0.5 + (i8 % 2 ? swing : 0); // sekizlik ızgara (swing'li)

    const ksCache = new Map();
    function ksBuf(freq, d, bright, damp) {
      const key = `${freq.toFixed(1)}|${d}|${bright}|${damp}`;
      if (ksCache.has(key)) return ksCache.get(key);
      const SR = ctx.sampleRate;
      const n = Math.floor(SR * d);
      const N = Math.max(2, Math.round(SR / freq));
      const buf = ctx.createBuffer(1, n, SR);
      const out_ = buf.getChannelData(0);
      const ring = new Float32Array(N);
      let pr = 0;
      for (let i = 0; i < N; i++) { pr += (r() * 2 - 1 - pr) * bright; ring[i] = pr; }
      let ix = 0;
      for (let i = 0; i < n; i++) {
        const a0 = ring[ix];
        const a1 = ring[(ix + 1) % N];
        out_[i] = a0;
        ring[ix] = (a0 + a1) * 0.5 * damp;
        ix = (ix + 1) % N;
      }
      ksCache.set(key, buf);
      return buf;
    }
    const sat = ctx.createWaveShaper();
    sat.curve = Float32Array.from({ length: 1024 }, (_, i) => Math.tanh(((i / 1023) * 2 - 1) * 2.2) / Math.tanh(2.2));
    sat.connect(out);
    const at16 = (b, i, sw = 0) => b * bar + i * beat * 0.25 + (i % 2 ? sw : 0); // onaltılık ızgara

    // ---- enstrümanlar ----
    const I = {
      kick(t, v = 0.55, hi = 150) {
        const g = gain(out);
        env(g, t, 0.002, v, 0.3);
        osc("sine", hi, t, 0.35, g).frequency.exponentialRampToValueAtTime(42, t + 0.13);
      },
      snare(t, v = 0.22) {
        const g = gain(filt("bandpass", 1800, 0.8, out));
        env(g, t, 0.002, v, 0.16);
        noiseSrc(t, 0.2, g);
        const b = gain(out);
        env(b, t, 0.002, v * 0.5, 0.08);
        osc("triangle", 190, t, 0.1, b);
      },
      clap(t, v = 0.22) {
        [0, 0.011, 0.023].forEach((d) => {
          const g = gain(filt("bandpass", 1300, 1.2, out));
          env(g, t + d, 0.001, v, d === 0.023 ? 0.14 : 0.02);
          noiseSrc(t + d, 0.16, g);
        });
      },
      hat(t, v = 0.06, open = false) {
        const g = gain(filt("highpass", 7600, 0.7, out));
        env(g, t, 0.001, v, open ? 0.2 : 0.035);
        noiseSrc(t, open ? 0.24 : 0.05, g);
      },
      shaker(t, v = 0.05) {
        const g = gain(filt("bandpass", 6500, 1.6, out));
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(v, t + 0.03);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
        noiseSrc(t, 0.1, g);
      },
      bass(t, n, d, v = 0.3, type = "sine", cut = 0) {
        const g = gain(cut ? filt("lowpass", cut, 1.5, out) : out);
        env(g, t, 0.008, v, d);
        osc(type, midi(n), t, d + 0.05, g);
      },
      pad(t, notes, d, v = 0.03, type = "sawtooth", cut = 1100) {
        const f = filt("lowpass", cut, 0.6, out);
        for (const n of notes)
          for (const det of [-7, 7]) {
            const g = gain(f);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.linearRampToValueAtTime(v, t + Math.min(0.4, d / 3));
            g.gain.setValueAtTime(v, t + d - 0.25);
            g.gain.linearRampToValueAtTime(0.0001, t + d + 0.15);
            osc(type, midi(n), t, d + 0.2, g).detune.value = det;
          }
      },
      pluck(t, n, v = 0.12) {
        // marimba: temel + 4 kat üst ses, hızlı sönüm
        const g = gain(out);
        env(g, t, 0.002, v, 0.32);
        osc("sine", midi(n), t, 0.36, g);
        const g2 = gain(out);
        env(g2, t, 0.001, v * 0.35, 0.06);
        osc("sine", midi(n) * 4, t, 0.08, g2);
      },
      keys(t, notes, d, v = 0.05) {
        // elektrik piyano: sinüs + 2. harmonik, tremolo
        const trem = ctx.createOscillator();
        trem.frequency.value = 4.6;
        const tg = ctx.createGain();
        tg.gain.value = v * 0.25;
        trem.connect(tg);
        trem.start(t);
        trem.stop(t + d + 0.6);
        for (const n of notes) {
          const g = gain(out);
          env(g, t, 0.005, v, d + 0.4);
          tg.connect(g.gain);
          osc("sine", midi(n), t, d + 0.5, g);
          const g2 = gain(out);
          env(g2, t, 0.003, v * 0.28, 0.35);
          osc("sine", midi(n) * 2, t, 0.4, g2);
        }
      },
      bell(t, n, v = 0.07) {
        const g = gain(out);
        env(g, t, 0.003, v, 1.6);
        osc("sine", midi(n), t, 1.7, g);
        const g2 = gain(out);
        env(g2, t, 0.002, v * 0.3, 0.7);
        osc("sine", midi(n) * 2.76, t, 0.8, g2);
      },
      stab(t, notes, v = 0.045) {
        const f = filt("lowpass", 1400, 1, out);
        for (const n of notes) {
          const g = gain(f);
          env(g, t, 0.004, v, 0.18);
          osc("square", midi(n), t, 0.22, g);
        }
      },
      /** Karplus-Strong telli çalgı (gitar, arp, naylon): gürültü tamponu süzülerek titreşir. choke: erken susturma (funk vuruşu). */
      ks(t, n, v = 0.2, d = 1.4, bright = 0.5, damp = 0.996, choke = 0) {
        const s = ctx.createBufferSource();
        s.buffer = ksBuf(midi(n), d, bright, damp);
        const g = gain(out);
        g.gain.setValueAtTime(v, t);
        if (choke) g.gain.setTargetAtTime(0.0001, t + choke, 0.015);
        s.connect(g);
        s.start(t);
        s.stop(t + d);
      },
      /** Akor vuruşu (gitar): teller 12 ms arayla, aşağı ya da yukarı. */
      strum(t, notes, v = 0.12, up = false, d = 1.2, bright = 0.55, choke = 0) {
        (up ? [...notes].reverse() : notes).forEach((n, i) => I.ks(t + i * 0.012, n, v, d, bright, 0.995, choke));
      },
      /** FM: elektrik piyano / çan. ratio, index: tını; decay: parlaklığın sönmesi. */
      fm(t, n, d, v = 0.06, ratio = 1, index = 2.5, decay = 0.6) {
        const g = gain(out);
        env(g, t, 0.004, v, d);
        const car = osc("sine", midi(n), t, d + 0.05, g);
        const mod = ctx.createOscillator();
        mod.frequency.value = midi(n) * ratio;
        const mg = ctx.createGain();
        mg.gain.setValueAtTime(midi(n) * index, t);
        mg.gain.exponentialRampToValueAtTime(1, t + decay);
        mod.connect(mg).connect(car.frequency);
        mod.start(t);
        mod.stop(t + d + 0.05);
      },
      /** 808: perdeden süzülerek inen, hafif doygun alt bas. */
      sub(t, n, d, v = 0.42) {
        v *= 0.2; // doygunluk katı sesi büyütüyor: diğer tarzlarla aynı seviyeye
        const g = gain(sat);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(v, t + 0.006);
        g.gain.setTargetAtTime(0.0001, t + d * 0.6, d * 0.25);
        const o = osc("sine", midi(n + 12), t, d + 0.3, g);
        o.frequency.exponentialRampToValueAtTime(midi(n), t + 0.07);
      },
      /** Yaylılar: üç ayar farkı, yavaş giriş, vibrato. */
      strings(t, notes, d, v = 0.02, cut = 1800) {
        const f = filt("lowpass", cut, 0.5, out);
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 5.2;
        const lg = ctx.createGain();
        lg.gain.value = 9;
        lfo.connect(lg);
        lfo.start(t);
        lfo.stop(t + d + 0.6);
        for (const n of notes)
          for (const det of [-9, 0, 9]) {
            const g = gain(f);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.linearRampToValueAtTime(v, t + Math.min(0.9, d * 0.4));
            g.gain.setValueAtTime(v, t + d - 0.3);
            g.gain.linearRampToValueAtTime(0.0001, t + d + 0.5);
            const o = osc("sawtooth", midi(n), t, d + 0.55, g);
            o.detune.value = det;
            lg.connect(o.detune);
          }
      },
      taiko(t, v = 0.6) {
        const g = gain(out);
        env(g, t, 0.003, v, 0.7);
        osc("sine", 82, t, 0.75, g).frequency.exponentialRampToValueAtTime(48, t + 0.5);
        const n = gain(filt("lowpass", 700, 0.7, out));
        env(n, t, 0.002, v * 0.5, 0.18);
        noiseSrc(t, 0.2, n);
      },
      tom(t, f = 160, v = 0.3) {
        const g = gain(out);
        env(g, t, 0.002, v, 0.22);
        osc("sine", f, t, 0.25, g).frequency.exponentialRampToValueAtTime(f * 0.55, t + 0.2);
      },
      conga(t, hi = false, v = 0.22) {
        const g = gain(out);
        env(g, t, 0.002, v, 0.16);
        osc("sine", hi ? 330 : 220, t, 0.18, g).frequency.exponentialRampToValueAtTime(hi ? 290 : 190, t + 0.05);
      },
      rim(t, v = 0.12) {
        const g = gain(filt("bandpass", 2200, 3, out));
        env(g, t, 0.001, v * 2, 0.03);
        noiseSrc(t, 0.04, g);
        const b = gain(out);
        env(b, t, 0.001, v, 0.04);
        osc("triangle", 820, t, 0.05, b);
      },
      ride(t, v = 0.035) {
        const g = gain(filt("highpass", 5200, 0.6, out));
        env(g, t, 0.001, v, 0.45);
        noiseSrc(t, 0.5, g);
        const p = gain(out);
        env(p, t, 0.001, v * 0.5, 0.3);
        osc("triangle", 5400, t, 0.32, p);
      },
      brush(t, v = 0.05, d = 0.22) {
        const g = gain(filt("bandpass", 3800, 0.6, out));
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(v, t + d * 0.6);
        g.gain.linearRampToValueAtTime(0.0001, t + d);
        noiseSrc(t, d, g);
      },
      square(t, n, d, v = 0.035, type = "square") {
        const g = gain(filt("lowpass", 5000, 0.4, out));
        g.gain.setValueAtTime(v, t);
        g.gain.setValueAtTime(v, t + d * 0.85);
        g.gain.linearRampToValueAtTime(0.0001, t + d);
        osc(type, midi(n), t, d, g);
      },
      lead(t, n, d, v = 0.04, cut = 2600) {
        const f = filt("lowpass", cut, 2, out);
        for (const det of [-8, 8]) {
          const g = gain(f);
          g.gain.setValueAtTime(0.0001, t);
          g.gain.linearRampToValueAtTime(v, t + 0.015);
          g.gain.setTargetAtTime(v * 0.6, t + 0.05, 0.1);
          g.gain.setTargetAtTime(0.0001, t + d, 0.06);
          osc("sawtooth", midi(n), t, d + 0.3, g).detune.value = det;
        }
      },
      crackle(t0, d) {
        for (let x = t0; x < t0 + d; x += 0.05 + r() * 0.22) {
          const g = gain(filt("highpass", 2500, 0.7, out));
          env(g, x, 0.0005, 0.02 + r() * 0.03, 0.006);
          noiseSrc(x, 0.01, g);
        }
      },
    };
    /** Akor tonlarından 2 ölçülük motif (sekizlik ızgarada, susmalı), sonra tekrar eder. */
    const motif = Array.from({ length: 16 }, (_, i) => (r() < (i % 4 === 0 ? 0.85 : 0.45) ? Math.floor(r() * 4) : -1));
    const ch = (b) => prog[b % prog.length].map((x) => m.root + x);

    for (let b = 0; b < bars; b++) {
      const t0 = b * bar;
      const c = ch(b);
      if (style === "lofi") {
        I.pad(t0, c, bar, 0.028);
        [0, 2.5].forEach((x) => I.bass(t0 + x * beat, c[0] - 24, beat * 1.3, 0.3));
        for (let i = 0; i < 8; i++) I.pluck(at(b, i), c[[0, 2, 1, 3, 2, 1, 3, 2][i]] + 12, i % 2 ? 0.05 : 0.07);
        I.kick(t0); I.kick(t0 + beat * 2); if (b % 2) I.kick(t0 + beat * 3.5, 0.4);
        I.snare(t0 + beat); I.snare(t0 + beat * 3);
        for (let i = 0; i < 8; i++) I.hat(at(b, i), i % 2 ? 0.07 : 0.035);
      } else if (style === "pulse") {
        I.pad(t0, c, bar, 0.022, "sawtooth", 1500);
        for (let i = 0; i < 16; i++) I.bass(t0 + i * beat * 0.25, c[0] - 24, beat * 0.2, i % 4 === 0 ? 0.26 : 0.17, "sawtooth", 520);
        for (let i = 0; i < 4; i++) I.kick(t0 + i * beat, 0.5);
        I.clap(t0 + beat); I.clap(t0 + beat * 3);
        for (let i = 0; i < 8; i++) if (i % 2) I.hat(at(b, i), 0.07, true);
        if (b % 2 === 1) for (let i = 0; i < 16; i++) { const k = motif[i]; if (k >= 0) I.bell(at(b - 1, i), c[k] + 24, 0.035); }
      } else if (style === "keys") {
        I.keys(t0, c.map((n) => n + 12), bar * 0.95, 0.045);
        I.bass(t0, c[0] - 12, bar * 0.9, 0.22);
        for (let i = 0; i < 8; i++) I.shaker(at(b, i), i % 2 ? 0.05 : 0.03);
        if (b % 2) I.kick(t0 + beat * 2, 0.25);
        for (let i = 0; i < 8; i++) { const k = motif[(b % 2) * 8 + i]; if (k >= 0 && i % 2 === 0) I.bell(at(b, i), c[k] + 24, 0.028); }
      } else if (style === "pluck") {
        for (let i = 0; i < 8; i++) { const k = motif[(b % 2) * 8 + i]; if (k >= 0) I.pluck(at(b, i), c[k] + 24, 0.11); }
        [0, 1.5, 2.5].forEach((x) => I.bass(t0 + x * beat, c[0] - 12, beat * 0.8, 0.24, "triangle"));
        for (let i = 0; i < 4; i++) I.kick(t0 + i * beat, 0.38);
        I.clap(t0 + beat, 0.2); I.clap(t0 + beat * 3, 0.2);
        for (let i = 0; i < 8; i++) I.shaker(at(b, i), 0.04);
        I.pad(t0, c, bar, 0.012, "triangle", 2000);
      } else if (style === "bounce") {
        I.keys(t0, c, beat * 1.6, 0.05);
        I.keys(t0 + beat * 2.5, c, beat * 1.2, 0.035);
        I.bass(t0, c[0] - 24, beat * 0.9, 0.34); I.bass(t0 + beat * 1.75, c[0] - 24, beat * 0.4, 0.26); I.bass(t0 + beat * 2.5, c[2] - 24, beat * 0.8, 0.28);
        I.kick(t0, 0.6); I.kick(at(b, 3), 0.4); I.kick(t0 + beat * 2.5, 0.5);
        I.snare(t0 + beat, 0.26); I.snare(t0 + beat * 3, 0.26);
        for (let i = 0; i < 8; i++) I.hat(at(b, i), i % 2 ? 0.05 : 0.03);
        I.crackle(t0, bar);
      } else if (style === "house") {
        for (let i = 0; i < 4; i++) I.kick(t0 + i * beat, 0.5, 130);
        for (let i = 0; i < 4; i++) I.hat(t0 + i * beat + beat * 0.5, 0.07, true);
        I.clap(t0 + beat, 0.17); I.clap(t0 + beat * 3, 0.17);
        [0.5, 1.75, 2.5].forEach((x) => I.stab(t0 + x * beat, c.map((n) => n + 12), 0.04));
        [0, 0.75, 2, 2.75].forEach((x) => I.bass(t0 + x * beat, c[0] - 24, beat * 0.45, 0.3, "triangle"));
      } else if (style === "ambient") {
        I.pad(t0, c, bar, 0.026, "triangle", 900);
        I.pad(t0, [c[0] + 12, c[2] + 12], bar, 0.012, "sine", 3000);
        I.bass(t0, c[0] - 24, bar * 0.95, 0.18);
        for (let i = 0; i < 8; i++) { const k = motif[(b % 2) * 8 + i]; if (k >= 0 && (i === 0 || i === 3 || i === 6)) I.bell(at(b, i), c[k] + 24, 0.045); }
        for (let i = 0; i < 4; i++) I.shaker(t0 + i * beat + beat * 0.5, 0.022);
      } else if (style === "trap") {
        // yarım tempo: trampet 3. vuruşta, hi-hat onaltılık + yuvarlanmalar, 808 bas, FM çan ezgisi
        I.sub(t0, c[0] - 24, beat * 1.4, 0.42); I.sub(t0 + beat * 2.5, c[0] - 24, beat * 0.9, 0.36); if (b % 2) I.sub(t0 + beat * 3.5, c[2] - 24, beat * 0.4, 0.3);
        I.kick(t0, 0.5); I.kick(t0 + beat * 2.5, 0.35);
        I.clap(t0 + beat * 2, 0.24); I.snare(t0 + beat * 2, 0.12);
        for (let i = 0; i < 16; i++) {
          const roll = (b % 2 === 1 && (i === 14 || i === 15)) || (i === 6 && b % 4 === 3);
          if (roll) [0, 1, 2].forEach((k) => I.hat(at16(b, i) + k * beat / 12, 0.05));
          else I.hat(at16(b, i), i % 4 === 2 ? 0.06 : 0.035);
        }
        for (let i = 0; i < 8; i++) { const k = motif[(b % 2) * 8 + i]; if (k >= 0 && i % 2 === 0) I.fm(at(b, i), c[k] + 24, 0.5, 0.035, 3.5, 2, 0.3); }
      } else if (style === "chip") {
        // 8-bit: kare dalga arpejleri, üçgen bas, gürültü davul
        for (let i = 0; i < 16; i++) I.square(at16(b, i), c[[0, 1, 2, 3, 2, 1, 0, 2][i % 8]] + 12 + (i >= 8 ? 12 : 0), beat * 0.22, 0.026);
        [0, 1, 2, 3].forEach((x) => I.square(t0 + x * beat, c[0] - 12 + (x % 2 ? 7 : 0), beat * 0.45, 0.06, "triangle"));
        I.kick(t0, 0.4, 180); I.kick(t0 + beat * 2, 0.4, 180);
        I.hat(t0 + beat, 0.09, true); I.hat(t0 + beat * 3, 0.09, true);
        for (let i = 0; i < 8; i++) { const k = motif[(b % 2) * 8 + i]; if (k >= 0) I.square(at(b, i), c[k] + 24, beat * 0.4, 0.022, "square"); }
      } else if (style === "bossa") {
        // naylon gitar akorları (bossa ritmi), kenar vuruşu, kök–beşli bas, fırça
        [0, 1.5, 2.5, 3.5].forEach((x, k) => I.strum(t0 + x * beat, c.map((n) => n + 12), 0.075, k % 2 === 1, 1.0, 0.35));
        I.bass(t0, c[0] - 12, beat * 1.4, 0.22, "triangle"); I.bass(t0 + beat * 2, c[2] - 12, beat * 1.4, 0.2, "triangle");
        [0, 1.5, 3].forEach((x) => I.rim(t0 + x * beat + (b % 2 ? beat * 0.5 : 0), 0.09));
        I.kick(t0, 0.25); I.kick(t0 + beat * 2.5, 0.2);
        for (let i = 0; i < 8; i++) I.brush(at(b, i), 0.03, 0.12);
      } else if (style === "afro") {
        // afrobeat: KS gitar riffi, konga deseni, shaker onaltılık, senkoplu kick
        for (let i = 0; i < 16; i++) { if ([0, 3, 6, 10, 12].includes(i)) I.ks(at16(b, i), c[[0, 2, 1, 3, 2][[0, 3, 6, 10, 12].indexOf(i)]] + 24, 0.13, 0.5, 0.7, 0.993, 0.18); I.shaker(at16(b, i), i % 4 === 2 ? 0.05 : 0.028); }
        [0, 3, 6, 11].forEach((i) => I.conga(at16(b, i), i % 2 === 1));
        I.kick(t0, 0.5); I.kick(at16(b, 6), 0.35); I.kick(t0 + beat * 2, 0.45); I.kick(at16(b, 14), 0.3);
        I.clap(t0 + beat, 0.16); I.clap(t0 + beat * 3, 0.16);
        [0, 0.75, 2, 2.75, 3.5].forEach((x) => I.bass(t0 + x * beat, c[x === 2 ? 2 : 0] - 24, beat * 0.4, 0.28));
      } else if (style === "garage") {
        // 2-step: kayık kick, 2 ve 4'te trampet, swing'li onaltılık hi-hat, kesik akorlar, alt bas
        const sw = beat * 0.08;
        I.kick(t0, 0.5); I.kick(at16(b, 7, sw), 0.35); I.kick(at16(b, 10), 0.45);
        I.snare(t0 + beat, 0.2); I.clap(t0 + beat * 3, 0.2);
        for (let i = 0; i < 16; i++) if (i % 2) I.hat(at16(b, i, sw), 0.05); else if (i % 4) I.hat(at16(b, i), 0.03);
        [1.5, 2.25, 3.5].forEach((x) => I.fm(t0 + x * beat, c[1] + 12, beat * 0.35, 0.04, 1, 1.6, 0.15));
        I.sub(t0, c[0] - 24, beat * 1.2, 0.32); I.sub(at16(b, 10), c[0] - 24, beat * 0.8, 0.28);
      } else if (style === "cinema") {
        // sinematik: yaylılar, taiko, alçak brass, çan ezgisi
        I.strings(t0, c, bar, 0.016, 1600);
        I.strings(t0, [c[0] - 12], bar, 0.02, 700);
        I.taiko(t0, 0.55); I.taiko(t0 + beat * 2, 0.4); if (b % 2) { I.tom(t0 + beat * 3.25, 140); I.tom(t0 + beat * 3.5, 120); I.tom(t0 + beat * 3.75, 100); }
        for (let i = 0; i < 8; i++) { const k = motif[(b % 2) * 8 + i]; if (k >= 0 && i % 2 === 0) I.bell(at(b, i), c[k] + 24, 0.035); }
      } else if (style === "jazz") {
        // caz: yürüyen bas (çeyreklik, akor tonları + yaklaşım), ride + fırça, rhodes açık akorlar
        const walk = [c[0], c[1], c[2], c[2] + 1];
        walk.forEach((n, x) => I.bass(t0 + x * beat, n - 24, beat * 0.9, 0.26, "triangle"));
        [0, 1, 1.66, 2, 3, 3.66].forEach((x) => I.ride(t0 + x * beat, x % 1 ? 0.022 : 0.032));
        I.brush(t0 + beat, 0.05); I.brush(t0 + beat * 3, 0.05);
        [1.66, 3.33].forEach((x) => c.slice(1).forEach((n) => I.fm(t0 + x * beat, n + 12, beat * 0.9, 0.022, 1, 1.4, 0.25)));
      } else if (style === "dembow") {
        // reggaeton: dembow deseni, alt bas, pluck ezgi
        for (let i = 0; i < 16; i += 4) I.kick(at16(b, i), 0.5);
        [3, 6, 11, 14].forEach((i) => { I.snare(at16(b, i), 0.16); I.rim(at16(b, i), 0.06); });
        for (let i = 0; i < 8; i++) I.hat(at(b, i), 0.035);
        I.sub(t0, c[0] - 24, beat * 1.4, 0.34); I.sub(t0 + beat * 2, c[0] - 24, beat * 1.4, 0.3);
        for (let i = 0; i < 8; i++) { const k = motif[(b % 2) * 8 + i]; if (k >= 0) I.pluck(at(b, i), c[k] + 24, 0.08); }
      } else if (style === "harp") {
        // arp: iki oktav yukarı aşağı KS arpejleri, yumuşak pad
        const run = [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 2, 3].map((k) => c[k % 4] + 12 + Math.floor(k / 4) * 12);
        run.forEach((n, i) => I.ks(at16(b, i), n, 0.09, 1.6, 0.45, 0.997));
        I.pad(t0, c, bar, 0.012, "sine", 1500);
        I.bass(t0, c[0] - 24, bar * 0.9, 0.16);
        if (b % 2) I.shaker(t0 + beat * 3.5, 0.03);
      } else if (style === "funk") {
        // funk: kısa susturulan gitar vuruşları, oktavlı bas, senkoplu davul, clav
        [0, 2, 3, 6, 8, 10, 11, 14].forEach((i) => I.strum(at16(b, i), c.slice(1).map((n) => n + 12), 0.06, i % 2 === 1, 0.3, 0.8, 0.07));
        [0, 3, 7, 8, 10, 13].forEach((i, k) => I.bass(at16(b, i), c[0] - 24 + (k % 3 === 2 ? 12 : 0), beat * 0.22, 0.32, "triangle"));
        I.kick(t0, 0.55); I.kick(at16(b, 7), 0.4); I.kick(at16(b, 10), 0.45);
        I.snare(t0 + beat, 0.24); I.snare(t0 + beat * 3, 0.24); I.snare(at16(b, 15), 0.08);
        for (let i = 0; i < 16; i++) I.hat(at16(b, i), i % 2 ? 0.025 : 0.045);
      } else if (style === "synthpop") {
        // synthpop: sekizlik arpej bas, testere ezgi, 2 ve 4'te el çırpma, dörtlük kick
        for (let i = 0; i < 8; i++) I.bass(at(b, i), c[0] - 12 + (i % 2 ? 12 : 0), beat * 0.42, 0.22, "sawtooth", 900);
        for (let i = 0; i < 4; i++) I.kick(t0 + i * beat, 0.45);
        I.clap(t0 + beat, 0.22); I.clap(t0 + beat * 3, 0.22);
        for (let i = 0; i < 8; i++) if (i % 2) I.hat(at(b, i), 0.05, true);
        for (let i = 0; i < 8; i++) { const k = motif[(b % 2) * 8 + i]; if (k >= 0) I.lead(at(b, i), c[k] + 24, beat * 0.42, 0.028); }
        I.pad(t0, c, bar, 0.012, "sawtooth", 2200);
      } else if (style === "folk") {
        // akustik: çelik telli gitar vuruşları (A A Y Y A Y), ayak + el çırpma
        [[0, 0], [1, 0], [1.5, 1], [2.5, 1], [3, 0], [3.5, 1]].forEach(([x, up]) => I.strum(t0 + x * beat, c.map((n) => n + 12), up ? 0.05 : 0.08, !!up, 1.1, 0.6));
        I.bass(t0, c[0] - 12, beat * 1.6, 0.2, "triangle"); I.bass(t0 + beat * 2, c[2] - 12, beat * 1.6, 0.18, "triangle");
        I.kick(t0, 0.4, 110); I.kick(t0 + beat * 2, 0.35, 110);
        I.clap(t0 + beat, 0.15); I.clap(t0 + beat * 3, 0.15);
        for (let i = 0; i < 8; i++) { const k = motif[(b % 2) * 8 + i]; if (k >= 0 && i % 2 === 1) I.ks(at(b, i), c[k] + 24, 0.07, 1.2, 0.7); }
      } else if (style === "disco") {
        // disco: oktav zıplayan bas, dörtlük kick, açık hi-hat ara vuruşta, yaylı vuruşlar
        for (let i = 0; i < 8; i++) I.bass(at(b, i), c[0] - 24 + (i % 2 ? 12 : 0), beat * 0.4, 0.3, "sawtooth", 1100);
        for (let i = 0; i < 4; i++) { I.kick(t0 + i * beat, 0.5); I.hat(t0 + i * beat + beat * 0.5, 0.08, true); }
        I.clap(t0 + beat, 0.2); I.clap(t0 + beat * 3, 0.2);
        for (let i = 0; i < 16; i++) I.hat(at16(b, i), 0.02);
        if (b % 2 === 0) [0.5, 1.5].forEach((x) => I.strings(t0 + x * beat, c.map((n) => n + 12), beat * 0.35, 0.02, 3000));
        else I.strings(t0, c.map((n) => n + 12), bar * 0.9, 0.012, 2400);
      }
    }
  };

  /** Bütün ses izi (konuşma + müzik + efekt) tek AudioBuffer. */
  E.soundtrack = async (plan) => {
    const SR = 48000;
    const ctx = new OfflineAudioContext(2, Math.ceil(plan.duration * SR), SR);
    seed = 7;
    const noise = ctx.createBuffer(1, SR, SR);
    noise.getChannelData(0).forEach((_, i, a) => (a[i] = rnd() * 2 - 1));
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -12;
    comp.ratio.value = 3;
    comp.attack.value = 0.004;
    comp.release.value = 0.18;
    // son katta sert sınırlayıcı: üst üste binen sesler tepeyi 1'in üstüne taşımasın
    const lim = ctx.createDynamicsCompressor();
    lim.threshold.value = -3;
    lim.knee.value = 0;
    lim.ratio.value = 20;
    lim.attack.value = 0.001;
    lim.release.value = 0.08;
    const out = ctx.createGain();
    out.gain.value = 0.72;
    comp.connect(out).connect(lim).connect(ctx.destination);
    const bus = (g) => {
      const n = ctx.createGain();
      n.gain.value = g;
      n.connect(comp);
      return n;
    };
    const voiceBus = bus(1.15);
    const sfxBus = bus(0.7);
    const musicBus = bus(0);
    const env = (node, t, a, peak, d) => {
      node.gain.setValueAtTime(0.0001, t);
      node.gain.linearRampToValueAtTime(peak, t + a);
      node.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
    };
    const osc = (type, f, t, dur, o) => {
      const x = ctx.createOscillator();
      x.type = type;
      x.frequency.setValueAtTime(f, t);
      x.connect(o);
      x.start(t);
      x.stop(t + dur + 0.05);
      return x;
    };
    const gain = (o) => {
      const g = ctx.createGain();
      g.connect(o);
      return g;
    };
    const noiseSrc = (t, dur, o) => {
      const s = ctx.createBufferSource();
      s.buffer = noise;
      s.loop = true;
      s.connect(o);
      s.start(t, rnd() * 0.5);
      s.stop(t + dur + 0.05);
    };
    const filt = (type, f, q, o) => {
      const b = ctx.createBiquadFilter();
      b.type = type;
      b.frequency.value = f;
      b.Q.value = q;
      b.connect(o);
      return b;
    };
    const S = {
      pop(t, o = {}) {
        const f = o.f || 620;
        const g = gain(sfxBus);
        env(g, t, 0.005, 0.42 * (o.v ?? 1), 0.14);
        osc("sine", f, t, 0.16, g).frequency.exponentialRampToValueAtTime(f * 1.9, t + 0.07);
      },
      tick(t, o = {}) {
        const g = gain(sfxBus);
        env(g, t, 0.002, o.hi ? 0.32 : 0.22, 0.06);
        osc("triangle", o.hi ? 2350 : 1760, t, 0.08, g);
        const n = gain(filt("highpass", 6000, 0.7, sfxBus));
        env(n, t, 0.001, 0.25, 0.02);
        noiseSrc(t, 0.03, n);
      },
      whoosh(t, o = {}) {
        const d = o.d || 0.4;
        const g = gain(sfxBus);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.32 * (o.v ?? 1), t + d * 0.55);
        g.gain.linearRampToValueAtTime(0.0001, t + d);
        const b = filt("bandpass", 300, 1.1, g);
        b.frequency.setValueAtTime(o.down ? 3500 : 280, t);
        b.frequency.exponentialRampToValueAtTime(o.down ? 300 : 3800, t + d);
        noiseSrc(t, d, b);
      },
      riser(t, o = {}) {
        const d = o.d || 1;
        const g = gain(sfxBus);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.13, t + d);
        g.gain.linearRampToValueAtTime(0.0001, t + d + 0.03);
        const b = filt("highpass", 250, 2, g);
        b.frequency.exponentialRampToValueAtTime(5200, t + d);
        noiseSrc(t, d, b);
        const s = gain(sfxBus);
        s.gain.setValueAtTime(0.0001, t);
        s.gain.linearRampToValueAtTime(0.05, t + d);
        s.gain.linearRampToValueAtTime(0.0001, t + d + 0.03);
        osc("sine", 220, t, d, s).frequency.exponentialRampToValueAtTime(880, t + d);
      },
      ding(t, o = {}) {
        [
          [1046.5, 0.24],
          [1568, 0.14],
          [2093, 0.06],
        ].forEach(([f, v], i) => {
          const g = gain(sfxBus);
          env(g, t + i * 0.035, 0.004, v * (o.v ?? 1), 1.1);
          osc("sine", f * (o.k || 1), t + i * 0.035, 1.2, g);
        });
      },
      flip(t) {
        [0, 0.055].forEach((dt, i) => {
          const g = gain(filt("bandpass", i ? 2400 : 1300, 0.9, sfxBus));
          env(g, t + dt, 0.002, 0.5, 0.07);
          noiseSrc(t + dt, 0.09, g);
        });
      },
      impact(t, o = {}) {
        const g = gain(sfxBus);
        env(g, t, 0.003, 0.75 * (o.v ?? 1), 0.42);
        osc("sine", 120, t, 0.45, g).frequency.exponentialRampToValueAtTime(36, t + 0.4);
        const n = gain(filt("lowpass", 1400, 0.7, sfxBus));
        env(n, t, 0.001, 0.35 * (o.v ?? 1), 0.09);
        noiseSrc(t, 0.12, n);
      },
      count(t, o = {}) {
        [0, 0.06].forEach((dt, i) => {
          const g = gain(sfxBus);
          env(g, t + dt, 0.003, 0.2, 0.25);
          osc("triangle", midi((o.n || 84) + i * 7), t + dt, 0.3, g);
        });
      },
      print(t, o = {}) {
        // fiş yazıcısı: kısa, sık tıkırtılar
        const d = o.d || 0.5;
        for (let x = 0; x < d; x += 0.035) {
          const g = gain(filt("bandpass", 3200 + rnd() * 800, 2, sfxBus));
          env(g, t + x, 0.001, 0.16, 0.018);
          noiseSrc(t + x, 0.025, g);
        }
      },
      ring(t) {
        // telefon çalması: iki tonlu kısa zil, iki kez
        [0, 0.42].forEach((dt) =>
          [440, 480].forEach((f) => {
            const g = gain(sfxBus);
            g.gain.setValueAtTime(0.0001, t + dt);
            g.gain.linearRampToValueAtTime(0.08, t + dt + 0.02);
            g.gain.setValueAtTime(0.08, t + dt + 0.3);
            g.gain.linearRampToValueAtTime(0.0001, t + dt + 0.34);
            osc("sine", f, t + dt, 0.36, g);
          }),
        );
      },
    };
    for (const e of plan.sfx) S[e.name](e.t, e);

    // ---- müzik: tarz başına ayrı enstrüman ve ritim; melodi videonun tohumundan (her videonun kendi ezgisi) ----
    const m = plan.music;
    E.music(m, plan.duration, { ctx, out: musicBus, osc, gain, env, filt, noiseSrc, midi });
    const voices = [...plan.voice].sort((a, b) => a.t - b.t);
    const g = musicBus.gain;
    g.setValueAtTime(0.0001, 0);
    g.linearRampToValueAtTime(m.gain, 0.06);
    for (const v of voices) {
      const buf = await ctx.decodeAudioData(b64ToAb(window.CLIPS[v.text].b64));
      const s = ctx.createBufferSource();
      s.buffer = buf;
      s.connect(voiceBus);
      s.start(v.t);
      g.setTargetAtTime(m.gain * 0.3, Math.max(0, v.t - 0.15), 0.04);
      g.setTargetAtTime(m.gain, v.t + window.CLIPS[v.text].dur + 0.1, 0.18);
    }
    g.setTargetAtTime(0.0001, plan.duration - 0.6, 0.15);
    return ctx.startRendering();
  };

  // ---------- kayıt ve sahne ----------
  E.videos = {};
  E.data = {};
  /**
   * meta: { title, approach, theme, ui? }. `ui`: şablonun SABİT YAZILARI ({ anahtar: "varsayılan" }), ekranda görünen
   * her yazı ya bölüm verisinden ya buradan gelir (2026-10-09, Samet: "videodaki tüm metinleri istisnasız
   * düzenleyebilmeli"). Bölüm `copy.ui[anahtar]` ile ezer; "{n}" gibi yer tutucular X.ui(anahtar, { n }) ile dolar.
   * Kapı: social:texts (ekrandaki her yazı veriye ya da ui'ye dayanmalı).
   */
  E.register = (id, meta, factory) => (E.videos[id] = { id, ui: {}, ...meta, factory });
  /** Sabit yazı: bölümün `copy.ui`'si, yoksa şablonun varsayılanı; {ad} yer tutucuları vars'tan. */
  E.uiText = (V, data, key, vars = {}) => {
    const own = data && data.copy && data.copy.ui && data.copy.ui[key];
    const s = own != null && own !== "" ? own : V.ui[key];
    if (s == null) throw new Error(`${V.id}: ui.${key} tanımlı değil (E.register meta.ui)`);
    return String(s).replace(/\{(\w+)\}/g, (m, k) => (vars[k] != null ? String(vars[k]) : m));
  };
  /** used: okunan ui anahtarları (editör yalnız ekrana gerçekten çıkanları gösterir; bölüm copy'si önce gelebilir). */
  const makeX = (V, data, sh, used = new Set()) => ({
    data,
    theme: E.THEMES[V.theme],
    style: sh ? (css) => h("style", null, sh, css) : () => null,
    ui: (key, vars) => {
      used.add(key);
      return E.uiText(V, data, key, vars);
    },
  });
  /**
   * Seslendirilecek metinler (sahne kurmadan): plan'ın istediği her klip metni. Editör, düzenlenen veride Defne
   * kaydı olmayan Almanca sesi buradan bilir; sunucu üretimi ve önizleme yalnız bu klipleri yükler.
   */
  E.spoken = (id, data) => {
    const V = E.videos[id];
    const texts = new Set();
    V.factory(makeX(V, data, null)).plan((text) => {
      texts.add(text);
      return 1.2;
    });
    return [...texts];
  };

  /** Doku (grain) deseni. Web panelinin CSP'si data: resmi kabul etmiyor: stüdyo bunu /social/grain.svg yapar. */
  E.GRAIN = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";
  const BASE_CSS = (T) => `
    :host{display:block;position:relative;overflow:hidden;background:${T.bg}}
    #stage{position:absolute;left:0;top:0;width:1080px;height:1920px;transform-origin:0 0;overflow:hidden}
    #scene{position:absolute;inset:0;overflow:hidden;font-family:${E.FONT};color:${T.ink};background:${T.bg};-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
    /* sıfır özgüllük (:where): videoların kendi sınıf kuralları (dolgu, konum) bunu her zaman ezer */
    :where(#scene *){position:absolute;box-sizing:border-box;margin:0;padding:0}
    :where(#scene .w,#scene .flow *){position:relative;display:inline-block}
    svg{display:block}
    .grain{position:absolute;inset:0;pointer-events:none;opacity:.07;mix-blend-mode:overlay;background-image:url("${E.GRAIN}")}
    .segs{left:96px;width:834px;top:196px;height:10px;display:flex;gap:10px}
    .segs b{position:relative!important;flex:1;height:10px;border-radius:5px;background:${T.seg};overflow:hidden}
    .segs i{left:0;top:0;bottom:0;width:100%;background:${T.segFill};transform-origin:0 50%;transform:scaleX(0)}
    .panel{left:48px;width:984px;border-radius:64px;background:${T.panel || T.surface};box-shadow:0 40px 90px -40px rgba(116,49,15,.75)}
    .o-series{left:96px;width:834px;top:1176px;height:120px;border-radius:60px;background:${T.pill};color:${T.pillInk};display:flex;align-items:center;justify-content:center;padding:0 48px;font-size:52px;font-weight:800;font-stretch:90%;letter-spacing:-.01em;white-space:nowrap}
    .o-ask{left:96px;width:834px;top:1328px;text-align:center;font-size:42px;font-weight:600;line-height:1.25;color:${T.sub}}
    /* imza: logo köşesi 20, dolgu 12 → kutu köşesi 32 (eş merkezli, logoyla aynı eğri) */
    .o-sig{left:0;top:1408px;display:flex;align-items:center;gap:20px;padding:12px 32px 12px 12px;border-radius:32px;background:${T.sigBg};color:${T.sigInk};white-space:nowrap;box-shadow:0 12px 30px -16px rgba(0,0,0,.4)}
    .o-sig *{position:relative!important}
    .o-sig img{width:80px;height:80px;border-radius:20px;display:block}
    .o-sig span{font-size:46px;font-weight:700;font-stretch:88%;letter-spacing:-.01em;line-height:1}
    .fade{inset:0;background:${T.bg}}
    #ui{position:absolute;inset:0;pointer-events:none;color:#fff;font-family:system-ui,sans-serif;background:linear-gradient(transparent 70%,rgba(0,0,0,.35))}
    #ui[hidden]{display:none}
    #ui .tabs{position:absolute;top:92px;left:0;right:0;display:flex;justify-content:center;gap:44px;font-size:38px;text-shadow:0 1px 4px rgba(0,0,0,.4)}
    #ui .tabs span{opacity:.7}#ui .tabs b{border-bottom:5px solid #fff;padding-bottom:8px}
    #ui .rail{position:absolute;right:22px;bottom:330px;display:flex;flex-direction:column;align-items:center;gap:34px}
    #ui .av img{width:104px;height:104px;border-radius:50%;border:4px solid #fff;display:block}
    #ui .rb{display:flex;flex-direction:column;align-items:center;gap:4px;filter:drop-shadow(0 2px 6px rgba(0,0,0,.45))}
    #ui .rb small{font-size:28px;font-weight:600}
    #ui .cap{position:absolute;left:36px;right:190px;bottom:150px;font-size:36px;line-height:1.35;text-shadow:0 2px 6px rgba(0,0,0,.55)}
    #ui .cap b{font-size:40px}#ui .cap p{margin:10px 0 14px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    #ui .cap small{font-size:32px;opacity:.9}
    #ui .v-tt,#ui .v-ig{position:absolute;inset:0;display:none}
    #ui[data-v="tt"] .v-tt,#ui[data-v="ig"] .v-ig{display:block}
    #ui .ig-top{position:absolute;top:96px;left:44px;font-size:52px}
    #ui .rail.ig{bottom:300px;gap:38px}
    #ui .cap.ig{bottom:190px;right:170px}
    #ui .cap.ig .who{display:flex;align-items:center;gap:18px;font-size:38px}
    #ui .cap.ig .who img{width:72px;height:72px;border-radius:50%;display:block}
    #ui .cap.ig .who span{border:2px solid rgba(255,255,255,.8);border-radius:14px;padding:4px 18px;font-size:30px}
    #ui .ig-nav{position:absolute;left:0;right:0;bottom:0;height:150px;background:#000}`;

  /** Platform arayüzlerinin kabaca konumu (yalnız önizleme; videoya girmez): yazıların düğmelere ve açıklamaya girmediği görülsün. */
  const UI_HTML = (caption) => {
    const ic = (d, c) => `<div class="rb"><svg viewBox="0 0 24 24" width="76" height="76"><path d="${d}" fill="#fff"/></svg><small>${c}</small></div>`;
    const heart = "M12 21s-7.5-4.6-10-9.3C.4 8.4 2.3 4.5 6 4.5c2.1 0 3.5 1.2 4 2.3.5-1.1 1.9-2.3 4-2.3 3.7 0 5.6 3.9 4 7.2C19.5 16.4 12 21 12 21z";
    const bubble = "M12 3C6.5 3 2 6.8 2 11.5c0 2.4 1.2 4.6 3.1 6.1L4.5 21l4-2c1.1.3 2.3.5 3.5.5 5.5 0 10-3.8 10-8.5S17.5 3 12 3z";
    const save = "M6 3h12v18l-6-4-6 4z";
    const share = "M14 4l8 7-8 7v-4c-5 0-8.5 1.5-11 5 1-5 4-9.5 11-10.5z";
    const send = "M2 21l21-9L2 3v7l15 2-15 2z";
    const first = caption.split("\n")[0];
    return `<div class="v-tt"><div class="tabs"><span>Takip edilenler</span><b>Sana Özel</b></div>
      <div class="rail"><div class="av"><img src="${E.ICON}" alt=""></div>${ic(heart, "12,4 B")}${ic(bubble, "843")}${ic(save, "2.951")}${ic(share, "611")}</div>
      <div class="cap"><b>@lernomi</b><p>${first}</p><small>♫ orijinal ses · lernomi</small></div></div>
      <div class="v-ig"><div class="ig-top"><b>Reels</b></div>
      <div class="rail ig">${ic(heart, "12,4 B")}${ic(bubble, "843")}${ic(send, "611")}${ic(save, "")}</div>
      <div class="cap ig"><div class="who"><img src="${E.ICON}" alt=""><b>lernomi</b><span>Takip et</span></div><p>${first}</p><small>♫ lernomi · Orijinal ses</small></div>
      <div class="ig-nav"></div></div>`;
  };

  /**
   * YERLEŞİM DENETİMİ (sahne koordinatı, 1080×1920): kurulmuş bir videoyu (`E.mount` dönüşü, `host` içinde) baştan sona
   * 0,2 sn'de bir tarar. Kurallar ve istisnalar: scripts/social/audit.mjs başındaki açıklama. social:audit, sunucudaki
   * üretim ve web editörü aynı fonksiyonu kullanır. Dönüş: sorun satırları (boşsa temiz).
   */
  E.AUDIT_SKIP = {
    pad: ["sfx", "sx", "ok"], // satır içi ek vurgusu / daire içindeki onay işareti: dolgu kasıtlı dar
    clip: ["a"], // artikel açılırken genişliği 0'dan büyüyor: o sırada kırpılması kasıt
    box: ["blob", "glow", "paper"], // bulanık zemin ışıkları ve kırpılarak basılan fiş
  };
  E.audit = (host, I, SKIP = E.AUDIT_SKIP) => {
    const sh = host.shadowRoot;
    const stage = sh.getElementById("stage");
    const scene = sh.getElementById("scene");
    const K = stage.getBoundingClientRect().width / E.W;
    const issues = {};
    const add = (k, t) => (issues[k] ||= []).push(+t.toFixed(1));
    const has = (el, list) => list.some((c) => el.classList?.contains(c));
    const anc = (el, list) => { for (let e = el; e && e !== scene; e = e.parentElement) if (has(e, list)) return true; return false; };
    const name = (el) => `${el.className && typeof el.className === "string" ? "." + el.className.split(" ").join(".") : el.tagName.toLowerCase()} «${(el.textContent || "").trim().slice(0, 28)}»`;
    const op = (el) => {
      let o = 1;
      for (let e = el; e && e !== scene; e = e.parentElement) {
        const cs = getComputedStyle(e);
        if (cs.display === "none" || cs.visibility === "hidden") return 0;
        o *= +cs.opacity;
      }
      return o;
    };
    const hasText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    const bg = (cs) => cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none";
    const els = [...scene.querySelectorAll("*")].filter((e) => !e.closest("svg"));
    const sr = stage.getBoundingClientRect();
    const S = (r) => ({ l: (r.left - sr.left) / K, t: (r.top - sr.top) / K, r: (r.right - sr.left) / K, b: (r.bottom - sr.top) / K });
    for (let t = 0; t <= I.plan.duration; t += 0.2) {
      I.render(t);
      const vis = [];
      for (const el of els) {
        if (op(el) < 0.9) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 2 || r.height < 2) continue;
        const txt = hasText(el);
        let rr = r;
        if (txt) {
          const rg = document.createRange();
          let u = null;
          for (const n of el.childNodes)
            if (n.nodeType === 3 && n.textContent.trim()) {
              rg.selectNodeContents(n);
              for (const q of rg.getClientRects()) u = u ? { left: Math.min(u.left, q.left), top: Math.min(u.top, q.top), right: Math.max(u.right, q.right), bottom: Math.max(u.bottom, q.bottom) } : { left: q.left, top: q.top, right: q.right, bottom: q.bottom };
            }
          if (u) rr = u;
        }
        const R = S(rr);
        if (txt) { const hh = R.b - R.t; R.t += hh * 0.14; R.b -= hh * 0.14; } // satır kutusu → harf yüksekliğine yakın
        // taşması gizlenen ya da kırpılan (clip-path) atanın dışında kalan metin görünmez
        let hidden = false;
        for (let e = el.parentElement; e && e !== scene; e = e.parentElement) {
          const ce = getComputedStyle(e);
          if (ce.overflow === "hidden" || ce.clipPath !== "none") {
            const q = e.getBoundingClientRect();
            const m = ce.clipPath.match(/inset\(([\d.]+)px\s+([\d.]+)px\s+([\d.]+)px/);
            const bottom = m ? q.bottom - +m[3] * K : q.bottom;
            if (rr.bottom < q.top + 2 || rr.top > bottom - 2) hidden = true;
          }
        }
        if (hidden) continue;
        const cs = getComputedStyle(el);
        if (!txt && bg(cs) && R.b > 1540 && R.t < 1500 && R.r - R.l < 1000 && !anc(el, SKIP.box)) add(`KUTU ALTTAN TAŞIYOR ${name(el)} [alt ${R.b | 0}]`, t);
        if (!txt) continue;
        for (let e = el.parentElement; e && e !== scene; e = e.parentElement) {
          const ce = getComputedStyle(e);
          if (!bg(ce)) continue;
          const Q = S(e.getBoundingClientRect());
          if (Q.r - Q.l > 1000 || anc(e, SKIP.box)) break;
          const pad = Math.min(R.l - Q.l, Q.r - R.r, R.t - Q.t, Q.b - R.b);
          if (pad < 6) add(`KUTUDAN TAŞIYOR ${name(el)} ⊄ ${name(e).slice(0, 30)} (pay ${pad | 0})`, t);
          break;
        }
        if (R.r > 934 || R.l < 90 || R.b > 1535 || R.t < 180) add(`GÜVENLİ ALAN DIŞI ${name(el)} [${Math.round(R.l / 10) * 10},${Math.round(R.t / 10) * 10},${Math.round(R.r / 10) * 10},${Math.round(R.b / 10) * 10}]`, t);
        if (el.scrollWidth > el.clientWidth + 2 && cs.overflow !== "visible" && !has(el, SKIP.clip)) add(`KESİLİYOR ${name(el)}`, t);
        if (bg(cs) && el.clientWidth > 60 && !has(el, SKIP.pad)) {
          const pl = (rr.left - r.left) / K, pr = (r.right - rr.right) / K, pt = (rr.top - r.top) / K, pb = (r.bottom - rr.bottom) / K;
          if (Math.min(pl, pr) < 18 && cs.textAlign !== "center") add(`DOLGU AZ (yatay ${pl | 0}/${pr | 0}) ${name(el)}`, t);
          if (Math.min(pt, pb) < 6) add(`DOLGU AZ (dikey ${pt | 0}/${pb | 0}) ${name(el)}`, t);
        }
        vis.push({ el, R });
      }
      for (let i = 0; i < vis.length; i++)
        for (let j = i + 1; j < vis.length; j++) {
          const a = vis[i], c = vis[j];
          if (a.el.contains(c.el) || c.el.contains(a.el) || a.el.textContent.trim() === c.el.textContent.trim()) continue;
          const ox = Math.min(a.R.r, c.R.r) - Math.max(a.R.l, c.R.l);
          const oy = Math.min(a.R.b, c.R.b) - Math.max(a.R.t, c.R.t);
          if (ox > 6 && oy > 6) add(`ÇAKIŞMA ${name(a.el)} ⟷ ${name(c.el)}`, t);
        }
    }
    for (const k of Object.keys(issues)) if (issues[k].length < 3) delete issues[k];
    return Object.entries(issues).map(([k, ts]) => `${k}  @ ${ts[0]}–${ts[ts.length - 1]} sn`);
  };

  /**
   * DÜZENLENEBİLİRLİK DENETİMİ: ekranda görünen her yazı bölüm verisinden ya da şablonun sabit yazılarından (`ui`)
   * gelmeli; şablona gömülü yazı editörde düzenlenemez. Her karedeki metin düğümü bilinen bir dizginin (veri
   * yaprakları, ui yazılarının yer tutucusuz parçaları) parçasıysa geçer; değilse bilinen dizgiler çıkarılır, harf
   * kalırsa sorun. Muaf: harfsiz
   * (sayı, ok, ✓), tek harf (çevrilen tabela harfleri) ve marka (lernomi). Dönüş: düzenlenemeyen yazılar.
   */
  E.untraced = (host, I, data) => {
    const known = [];
    const walk = (v) => {
      if (typeof v === "string") known.push(v);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    walk(data);
    for (const k of Object.keys(I.V.ui)) for (const part of E.uiText(I.V, data, k).split(/\{\w+\}/)) known.push(part);
    // dilden bağımsız küçük harf: "Ich".toLocaleLowerCase("tr") "ıch" olur ve şablonun yazdığı "ich" ile eşleşmezdi
    const norm = (x) => x.toLowerCase().replace(/ı/g, "i").replace(/i̇/g, "i").normalize("NFC");
    const parts = [...new Set(known.map((x) => norm(x.trim())).filter(Boolean))].sort((a, b) => b.length - a.length);
    const scene = host.shadowRoot.getElementById("scene");
    const bad = new Set();
    for (let t = 0; t <= I.plan.duration; t += 0.25) {
      I.render(t);
      const w = document.createTreeWalker(scene, NodeFilter.SHOW_TEXT);
      for (let n = w.nextNode(); n; n = w.nextNode()) {
        const s = n.textContent.trim();
        if (!s || n.parentElement.closest("style")) continue;
        const low = norm(s);
        if (parts.some((p) => p.includes(low))) continue; // bilinen bir dizginin parçası (kelime kelime, harf harf yazılan)
        let rest = low.replace(/lernomi/g, " "); // marka, önce: tek harflik veri parçaları ("e") onu bölmesin
        for (const p of parts) if (p.length > 1 && rest.includes(p)) rest = rest.split(p).join(" ");
        const letters = rest.match(/\p{L}+/gu) || [];
        if (letters.some((x) => x.length > 1)) bad.add(s);
      }
    }
    return [...bad];
  };

  /**
   * Videonun ekranda görünen yazıları ve İLK göründükleri an ({ s, t }, 0,25 sn'de bir). Editör görünmeyen veri alanını
   * ayırır, alana tıklanınca önizlemeyi o ana götürür.
   */
  E.texts = (host, I) => {
    const scene = host.shadowRoot.getElementById("scene");
    const out = new Map();
    for (let t = 0; t <= I.plan.duration; t += 0.25) {
      I.render(t);
      const w = document.createTreeWalker(scene, NodeFilter.SHOW_TEXT);
      for (let n = w.nextNode(); n; n = w.nextNode()) {
        const s = n.textContent.trim();
        if (!s || out.has(s) || n.parentElement.closest("style")) continue;
        let o = 1;
        for (let e = n.parentElement; e && e !== scene; e = e.parentElement) o *= +getComputedStyle(e).opacity;
        if (o > 0.5) out.set(s, Math.round(t * 100) / 100);
      }
    }
    return [...out].map(([s, t]) => ({ s, t }));
  };

  /** Bir videoyu host içine kurar; host genişliğine göre ölçeklenir. */
  E.mount = (host, id, data = E.data[id]) => {
    const V = E.videos[id];
    const T = E.THEMES[V.theme];
    const sh = host.shadowRoot || host.attachShadow({ mode: "open" });
    sh.innerHTML = `<style>${BASE_CSS(T)}</style><div id="stage"><div id="scene"></div><div class="grain"></div><div id="ui" hidden data-v="tt"></div></div>`;
    const uiUsed = new Set();
    const X = makeX(V, data, sh, uiUsed);
    const inst = V.factory(X);
    const plan = inst.plan((text) => {
      if (!window.CLIPS[text]) throw new Error(`ses yok: ${text}`);
      return window.CLIPS[text].dur;
    });
    const stage = sh.getElementById("stage");
    const scene = sh.getElementById("scene");
    const grain = sh.querySelector(".grain");
    const ui = sh.getElementById("ui");
    inst.build(scene, plan);
    ui.innerHTML = UI_HTML(plan.caption);
    const fit = () => (stage.style.transform = `scale(${host.clientWidth / E.W})`);
    new ResizeObserver(fit).observe(host);
    fit();
    const render = (t) => {
      t = E.clamp(t, 0, plan.duration);
      inst.render(t);
      const f = Math.floor(t * 12);
      grain.style.backgroundPosition = `${(f * 137) % 400}px ${(f * 251) % 400}px`;
    };
    render(plan.poster);
    return { id, V, plan, render, ui, stage, uiUsed };
  };
})();
