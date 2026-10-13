/*
  YATAY MOTOR (YouTube, 1920×1080, 10–15 dk; 2026-10-13). Dikey motorun (../engine.js) mantığı: içerik bölüm
  verisinden, şablon yalnız yerleşim ve zaman; render(t) yalnız t'ye bakar (aynı t, aynı kare), video kare kare çıkar.

  Kayıt:
    Y.register(id, { title, theme, series }, build)      build(X, data) → toplam süre (sn)
  X (zaman çizelgesi + sahne):
    X.say(t, satır, o)  satır = { v: "defne"|"aras"|"can"|"mira", l: "tr"|"de", t: "metin", x?: "listenSlow" }:
                        sesi t'de başlatır, altyazıyı koyar, BİTİŞ zamanını döner. Süre kaydın süresi; kaydı yoksa
                        metin uzunluğundan tahmin (önizlemede "ses bekliyor"), kayıt gelince çizelge kendiliğinden kayar.
    X.chap(t, ad)       YouTube bölümü (açıklamadaki zaman damgaları ve üstteki bölüm şeridi buradan)
    X.sfx(t, tür)       tick · ok · chap (sentez, ses izinde)
    scn(X, a, b)        [a, b) sahnesi; S.add(el, gecikme, o) sırayla, sönümlü girer
  Seslendirilecek her metin bölüm verisinde bir SATIR nesnesi: Y.spoken veriyi dolaşıp hepsini bulur (stüdyo ses
  talebi ve onay bunlara bakar). Satırın v/l/x alanları kimlik (stüdyoda kilitli), t metni düzenlenir.

  IZGARA: 12 sütun, kenar 112, sütun 112, oluk 32 → COL(c) = 112 + 144c, SPAN(n) = 144n − 32. Dikeyde bölüm şeridi 40,
  künye 80–144, içerik alanı 208–864 (turuncuda 232–856), altyazı alanı 876–1016 (en çok iki satır).
  YAZI ÖLÇEĞİ: d1 168 · d2 128 · t1 96 · t2 72 · t3 56 · b1 44 · b2 34 · etiket 24 (mono, büyük harf).
  RENK: zıtlık ölçülü (Samet, 2026-10-13: "renk zıtlıklarında aşırılık"): saf siyah/beyaz yüzey yok, vurgu sahne başına
  bir iki yerde, seçili durum dolgu değil yumuşak zemin + ince çizgi; artikel renkleri temaya göre. Kapak daha canlı.
  HAREKET: büyük yüzey sönümlü (üstel) ve kısa mesafeli girer, yay yalnız küçük vurguda; sahneler üst üste biner.
*/
(() => {
  const Y = (window.Y = window.Y || {});
  Y.W = 1920;
  Y.H = 1080;
  Y.videos = {};
  Y.ICON = Y.ICON || "";
  Y.GRAIN = Y.GRAIN || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";
  Y.VOICES = { defne: { name: "Defne", color: "#d2783a" }, aras: { name: "Aras", color: "#5d80c4" }, can: { name: "Can", color: "#4f9a7c" }, mira: { name: "Mira", color: "#8f7bc4" } };

  // ---------- yardımcılar ----------
  const clamp = (Y.clamp = (x, a = 0, b = 1) => (x < a ? a : x > b ? b : x));
  const P = (Y.P = (t, a, d) => clamp((t - a) / d));
  const out3 = (Y.out3 = (x) => 1 - Math.pow(1 - x, 3));
  Y.inC = (x) => x * x * x;
  const spring = (Y.spring = (x) => (x >= 1 ? 1 : 1 - Math.exp(-6.5 * x) * Math.cos(9.5 * x)));
  const outExpo = (Y.outExpo = (x) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)));
  Y.lerp = (a, b, x) => a + (b - a) * x;
  const h = (Y.h = (tag, cls, parent, html) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    if (parent) parent.appendChild(e);
    return e;
  });
  const el = (Y.el = (p, cls, html, css) => {
    const e = h("div", cls, p, html);
    if (css) e.style.cssText += css;
    return e;
  });
  const esc = (Y.esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"));
  /** Bölüm verisindeki işaretli yazı: **kalın** → vurgu (hl), başka biçim yok (veri HTML taşımaz). */
  Y.md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<span class="hl">$1</span>');
  const set = (Y.set = (e, { o = 1, x = 0, y = 0, s = 1, r = 0 } = {}) => {
    e.style.opacity = o.toFixed(3);
    e.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${r.toFixed(2)}deg) scale(${s.toFixed(4)})`;
    e.style.visibility = o <= 0.001 ? "hidden" : "visible";
  });
  const COL = (Y.COL = (c) => 112 + c * 144);
  const SPAN = (Y.SPAN = (n) => n * 144 - 32);
  const AREA = { gece: [208, 864], kagit: [208, 864], lacivert: [208, 864], turuncu: [232, 856] };
  /** Tek satırlık yazıyı genişliğe sığana dek küçültür (optik boyut puntoyla değiştiği için birkaç tur). */
  const fit = (Y.fit = (e, maxW, min = 40) => {
    let size = parseFloat(e.dataset.fs || getComputedStyle(e).fontSize);
    e.dataset.fs = size;
    e.style.fontSize = `${size}px`;
    for (let k = 0; k < 6 && e.scrollWidth > maxW + 1 && size > min; k++) {
      size = Math.max(min, Math.floor((size * maxW) / e.scrollWidth) - 1);
      e.style.fontSize = `${size}px`;
    }
  });
  /** Altyazı en çok iki satır: uzun cümle cümle sınırından parçalanır, süre harf sayısına göre bölünür. */
  const chunks = (text, max = 96) => {
    if (text.length <= max) return [text];
    const parts = (text.match(/[^.!?:;]+[.!?:;]+[”"»]?(\s+|$)|[^.!?:;]+$/g) || [text]).map((s) => s.trim()).filter(Boolean);
    const out = [];
    let cur = "";
    for (const p of parts.flatMap((p) => (p.length <= max ? [p] : splitComma(p, max)))) {
      if (!cur) cur = p;
      else if ((cur + " " + p).length <= max) cur += " " + p;
      else {
        out.push(cur);
        cur = p;
      }
    }
    if (cur) out.push(cur);
    return out;
  };
  const splitComma = (s, max) => {
    const bits = s.split(/(?<=,)\s+/);
    const out = [];
    let cur = "";
    for (const b of bits) {
      if (!cur) cur = b;
      else if ((cur + " " + b).length <= max) cur += " " + b;
      else {
        out.push(cur);
        cur = b;
      }
    }
    if (cur) out.push(cur);
    return out;
  };
  Y.ICONS = {
    hp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4.5" height="7" rx="2" fill="currentColor" stroke="none"/><rect x="16.5" y="14" width="4.5" height="7" rx="2" fill="currentColor" stroke="none"/></svg>`,
    play: `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>`,
    mic: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" stroke="none"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>`,
    bell: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>`,
  };
  Y.ringHTML = (sw = 12, num = "") => {
    const r = 100 - sw / 2 - 2;
    return `<svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="${r}" fill="none" stroke="var(--ln)" stroke-width="${sw}"/><circle class="arc" cx="100" cy="100" r="${r}" fill="none" stroke="var(--acc)" stroke-width="${sw}" stroke-linecap="round" transform="rotate(-90 100 100)" stroke-dasharray="${(2 * Math.PI * r).toFixed(1)}"/></svg><span class="num">${num}</span>`;
  };
  Y.setRing = (ring, k, n) => {
    const arc = ring.querySelector(".arc");
    const C = parseFloat(arc.getAttribute("stroke-dasharray"));
    arc.style.strokeDashoffset = (C * (1 - k)).toFixed(1);
    const num = ring.querySelector(".num");
    if (num.textContent !== String(n)) num.textContent = n;
  };
  Y.waveBars = (n, cls = "") => `<div class="wave ${cls}">${"<i></i>".repeat(n)}</div>`;
  /** Dalga: lvl 0–1 ses düzeyi (kaydın zarfı ya da konuşma benzeri sentez). Ortası yüksek, kenarlar alçak. */
  Y.animWave = (wv, t, lvl, { min = 10, max = 80 } = {}) => {
    const bars = wv.children;
    const n = bars.length;
    const L = +lvl || 0;
    for (let i = 0; i < n; i++) {
      const bell = 0.35 + 0.65 * Math.sqrt(Math.max(0, 1 - Math.pow((i - (n - 1) / 2) / ((n + 1) / 2), 2)));
      const tex = 0.45 + 0.55 * Math.abs(Math.sin(i * 1.93 + t * 5.3) * Math.cos(i * 0.71 - t * 2.9));
      bars[i].style.height = `${(min + L * bell * tex * (max - min)).toFixed(1)}px`;
    }
  };
  /** Kaydı olmayan konuşma için hece ritminde sentez düzey: [a, b) içinde yumuşak giriş/çıkış. */
  const talk = (Y.talk = (t, a, b) => (t < a || t >= b ? 0 : Math.min(1, (t - a) / 0.12, (b - t) / 0.2) * (0.4 + 0.6 * Math.abs(Math.sin(t * 10.7) * Math.cos(t * 3.7 + 1)))));
  Y.artOf = (label) => (String(label).match(/^(der|die|das) /) || [])[1] || "";
  Y.stem = (label) => String(label).replace(/^(der|die|das) /, "");
  /** İki kelimenin farklı kısmı vurgulu (ortak baş ve son düz). */
  Y.diffParts = (a, b) => {
    const x = a.toLowerCase();
    const y = b.toLowerCase();
    let p = 0;
    while (p < x.length && p < y.length && x[p] === y[p]) p++;
    let s = 0;
    while (s < x.length - p && s < y.length - p && x[x.length - 1 - s] === y[y.length - 1 - s]) s++;
    const cut = (w) => `${esc(w.slice(0, p))}<span class="acc">${esc(w.slice(p, w.length - s))}</span>${esc(w.slice(w.length - s))}`;
    return [cut(a), cut(b)];
  };

  // ---------- ses: kayıtlar, süre, zarf ----------
  /** window.CLIPS: { "ses|dil|metin[#tür]": { dur, b64? } }. Önizleme ve üretim sayfası doldurur. */
  const clips = () => window.CLIPS || {};
  Y.keyOf = (line) => `${line.v}|${line.l}|${line.t}${line.x ? `#${line.x}` : ""}`;
  /** Kaydı olmayan satırın tahmini süresi: Türkçe ~15, Almanca ~13 harf/sn (+ nefes). */
  Y.estimate = (line) => Math.round((0.5 + String(line.t).length * (line.l === "de" ? (line.x === "listenSlow" ? 0.1 : 0.075) : 0.064)) * 1000) / 1000;
  Y.has = (line) => !!clips()[Y.keyOf(line)];
  Y.dur = (line) => {
    const c = clips()[Y.keyOf(line)];
    return c ? c.dur : Y.estimate(line);
  };
  /** Zarf (60 kare/sn), önizleme AudioBuffer'dan, üretim sayfası b64'ten çözer: Y.ENV[anahtar] = Float32Array. */
  Y.ENV = Y.ENV || {};
  Y.envFrom = (buf) => {
    const ch = buf.getChannelData(0);
    const step = Math.floor(buf.sampleRate / 60);
    const e = new Float32Array(Math.ceil(ch.length / step));
    let mx = 1e-6;
    for (let j = 0; j < e.length; j++) {
      let q = 0;
      const o = j * step;
      for (let x = 0; x < step && o + x < ch.length; x++) q += ch[o + x] * ch[o + x];
      e[j] = Math.sqrt(q / step);
      mx = Math.max(mx, e[j]);
    }
    for (let j = 0; j < e.length; j++) e[j] = Math.min(1, Math.pow(e[j] / mx, 0.7));
    return e;
  };
  /** Üretim sayfası: CLIPS'teki b64 kayıtların zarfları (sahne kurulmadan önce, bir kez). */
  Y.decodeEnvelopes = async () => {
    const C = clips();
    const ctx = new OfflineAudioContext(1, 48000, 48000);
    for (const [k, c] of Object.entries(C)) {
      if (Y.ENV[k] || !c.b64) continue;
      try {
        const bin = atob(c.b64);
        const bytes = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        Y.ENV[k] = Y.envFrom(await ctx.decodeAudioData(bytes.buffer));
      } catch {
        /* zarf yoksa sentez düzey */
      }
    }
  };
  /** Satır nesneleri (seslendirilen her metin): veriyi dolaşıp { v, l, t } taşıyan nesneleri toplar. */
  const isLine = (o) => o && typeof o === "object" && !Array.isArray(o) && typeof o.v === "string" && typeof o.l === "string" && typeof o.t === "string";
  Y.lines = (data) => {
    const out = [];
    const walk = (o) => {
      if (Array.isArray(o)) o.forEach(walk);
      else if (isLine(o)) {
        if (o.t.trim()) out.push(o);
      } else if (o && typeof o === "object") Object.values(o).forEach(walk);
    };
    walk(data);
    return out;
  };
  Y.spoken = (id, data) => [...new Set(Y.lines(data).map(Y.keyOf))];

  /** Efekt sentezi (ses izi ve önizleme aynı formül; Node tarafı yatay/ses.mjs'de eşi). */
  Y.SFX = {
    tick: { dur: 0.06, f: (t) => Math.sin(2 * Math.PI * 1320 * t) * Math.exp(-t * 70) * 0.18 },
    ok: { dur: 0.7, f: (t) => (Math.sin(2 * Math.PI * 880 * t) * 0.6 + Math.sin(2 * Math.PI * 1320 * t) * 0.3 * (t > 0.08 ? 1 : 0)) * Math.exp(-t * 6) * 0.16 },
    chap: { dur: 1.1, f: (t) => (Math.sin(2 * Math.PI * 523.25 * t) + 0.6 * Math.sin(2 * Math.PI * 783.99 * t) * (t > 0.12 ? 1 : 0)) * Math.exp(-t * 3.6) * 0.09 },
  };

  // ---------- CSS (gölge DOM'da; stüdyonun sınıfları sahneye sızmaz) ----------
  const CSS = () => `
  :host { all: initial; display: block }
  .cv { position: absolute; left: 0; top: 0; width: 1920px; height: 1080px; transform-origin: 0 0; overflow: hidden; font-family: "Bricolage Grotesque", system-ui, sans-serif; -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; line-height: 1.2;
    --mono: "DM Mono", ui-monospace, Menlo, monospace;
    --bg: #161618; --ink: #efede8; --sub: rgba(239,237,232,.56); --acc: #ef8a3e; --accInk: #1a1a1c; --accSoft: rgba(239,138,62,.14); --accLine: rgba(239,138,62,.55);
    --sf: rgba(255,255,255,.045); --sf2: rgba(255,255,255,.07); --bd: 1px solid rgba(255,255,255,.08); --ln: rgba(255,255,255,.11);
    --sh: 0 24px 48px -30px rgba(0,0,0,.75); --strong: #2a2a2e; --strongInk: #efede8; --pill: rgba(239,138,62,.16); --pillInk: #f3a768; --sigBg: rgba(255,255,255,.07); --sigInk: #efede8;
    --seg: rgba(255,255,255,.12); --segFill: rgba(239,237,232,.8); --ok: #4fb985; --okSoft: rgba(79,185,133,.14); --bad: #e06a78; --badSoft: rgba(224,106,120,.14);
    --der: #7fa4ee; --die: #ee8592; --das: #66c79a; --hd: var(--ink); --hdSub: var(--sub); --subBg: rgba(10,10,12,.72); --subInk: #f3f1ec; --me: #3a2a1e; --meInk: #f3e3d4;
    background: var(--bg); color: var(--ink) }
  .cv.kagit { --bg: #f0ede7; --ink: #2a2622; --sub: #7d7166; --acc: #dc6d22; --accInk: #fff; --accSoft: rgba(220,109,34,.1); --accLine: rgba(220,109,34,.5);
    --sf: #fbf9f5; --sf2: #ebe6dd; --bd: 1px solid rgba(42,38,34,.06); --ln: rgba(42,38,34,.1);
    --sh: 0 1px 0 rgba(60,40,20,.03), 0 18px 40px -28px rgba(60,40,20,.32); --strong: #3b3530; --strongInk: #fbf9f5; --pill: #3b3530; --pillInk: #fbf9f5; --sigBg: #fbf9f5; --sigInk: #2a2622;
    --seg: rgba(42,38,34,.09); --segFill: #4a433d; --ok: #2f8f63; --okSoft: rgba(47,143,99,.1); --bad: #c0505d; --badSoft: rgba(192,80,93,.1);
    --der: #3e6dc4; --die: #c24b5c; --das: #2c8a5c; --subBg: rgba(42,38,34,.88); --me: #fbe7d6; --meInk: #2a2622 }
  .cv.lacivert { --bg: #131d38; --ink: #f0ede7; --sub: rgba(240,237,231,.58); --sf: rgba(255,255,255,.05); --sf2: rgba(255,255,255,.08); --bd: 1px solid rgba(255,255,255,.09); --ln: rgba(255,255,255,.12);
    --sh: 0 24px 48px -30px rgba(0,0,14,.7); --strong: #223052; --sigBg: rgba(255,255,255,.08); --seg: rgba(255,255,255,.14); --subBg: rgba(8,13,30,.74); --me: #33304a; --meInk: #f0ede7 }
  .cv.turuncu { --bg: #f2792a; --ink: #2c2520; --sub: #8a7262; --acc: #dc6d22; --accInk: #fff; --accSoft: rgba(220,109,34,.1); --accLine: rgba(220,109,34,.5);
    --sf: #fffdfa; --sf2: #f6ece2; --bd: 1px solid rgba(44,37,32,.06); --ln: rgba(44,37,32,.09);
    --sh: 0 1px 0 rgba(116,49,15,.03), 0 18px 40px -28px rgba(116,49,15,.34); --strong: #3d342e; --strongInk: #fff8f1; --pill: #3d342e; --pillInk: #fff8f1; --sigBg: #fff8f1; --sigInk: #2c2520;
    --seg: rgba(255,255,255,.3); --segFill: #fff8f1; --ok: #2f8f63; --okSoft: rgba(47,143,99,.1); --bad: #c0505d; --badSoft: rgba(192,80,93,.1);
    --der: #3e6dc4; --die: #c24b5c; --das: #2c8a5c; --hd: #2c2520; --hdSub: rgba(44,37,32,.66); --subBg: rgba(44,37,32,.88); --me: #fbe7d6; --meInk: #2c2520 }
  .cv * { box-sizing: border-box }
  .cv .abs, .cv .scn, .cv .rg { position: absolute }
  .cv .scn { inset: 0 }
  .cv .rg { display: flex; flex-direction: column }
  .cv.measure .scn { display: block !important }
  .cv .bgfx { position: absolute; inset: 0 }
  .cv.gece .bgfx { background: radial-gradient(1000px 640px at 50% 56%, rgba(239,138,62,.09), transparent 70%) }
  .cv.lacivert .bgfx { background: radial-gradient(1100px 760px at 82% 18%, rgba(79,140,255,.14), transparent 70%), radial-gradient(900px 600px at 0% 100%, rgba(239,138,62,.05), transparent 70%) }
  .cv.kagit .bgfx { background: radial-gradient(1400px 900px at 72% 10%, rgba(255,255,255,.55), transparent 70%) }
  .cv .pan { position: absolute; left: 48px; top: 176px; width: 1824px; height: 864px; border-radius: 56px; background: #fff8f1; box-shadow: 0 30px 70px -44px rgba(116,49,15,.55) }
  .cv .grain { position: absolute; inset: 0; pointer-events: none; z-index: 40; opacity: .07; mix-blend-mode: overlay; background-image: url("${Y.GRAIN}") }
  .cv.kagit .grain, .cv.turuncu .grain { opacity: .08; mix-blend-mode: multiply }
  .cv .segs { position: absolute; left: 112px; width: 1696px; top: 40px; height: 8px; display: flex; gap: 8px; z-index: 30 }
  .cv .segs b { position: relative; height: 8px; border-radius: 4px; background: var(--seg); overflow: hidden; min-width: 8px }
  .cv .segs i { position: absolute; inset: 0; background: var(--segFill); transform-origin: 0 50%; transform: scaleX(0) }
  .cv .hdr { position: absolute; left: 112px; width: 1696px; top: 80px; height: 64px; display: flex; align-items: center; gap: 24px; z-index: 30; color: var(--hd) }
  .cv .hdr .sp { height: 52px; padding: 0 24px; border-radius: 26px; background: var(--pill); color: var(--pillInk); display: flex; align-items: center; font: 500 22px var(--mono); letter-spacing: .12em; text-transform: uppercase; white-space: nowrap }
  .cv .hdr .ep { font-size: 30px; font-weight: 600; color: var(--hdSub); white-space: nowrap }
  .cv .hdr .ch { font-size: 30px; font-weight: 700; white-space: nowrap; display: flex; align-items: center; gap: 24px; overflow: hidden; text-overflow: ellipsis; min-width: 0 }
  .cv .hdr .ch::before { content: ""; flex: none; width: 8px; height: 8px; border-radius: 4px; background: var(--hdSub) }
  .cv .hdr .ch:empty { display: none }
  .cv .sig { display: flex; align-items: center; gap: 14px; padding: 8px 24px 8px 8px; border-radius: 24px; background: var(--sigBg); color: var(--sigInk); font-size: 30px; font-weight: 700; font-stretch: 88%; letter-spacing: -.01em; white-space: nowrap; flex: none }
  .cv .sig img { width: 48px; height: 48px; border-radius: 16px; display: block }
  .cv .hdr .sig { margin-left: auto }
  .cv.kagit .hdr .sig { box-shadow: 0 8px 20px -16px rgba(60,40,20,.3) }
  .cv .sub { position: absolute; left: 50%; bottom: 64px; transform: translateX(-50%); width: max-content; max-width: 1440px; display: flex; gap: 20px; align-items: baseline; z-index: 35;
    padding: 20px 32px 22px; border-radius: 28px; background: var(--subBg); color: var(--subInk); font-size: 38px; line-height: 1.3; font-weight: 500; box-shadow: 0 16px 36px -24px rgba(0,0,0,.45); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); opacity: 0 }
  .cv .sub b { flex: none; position: relative; top: -5px; font: 500 20px var(--mono); letter-spacing: .12em; text-transform: uppercase; padding: 7px 14px; border-radius: 10px; background: rgba(239,138,62,.22); color: #f6b07a }
  .cv .sub b.norec { background: transparent; outline: 2px dashed rgba(239,138,62,.75); outline-offset: -2px }
  .cv .sub b.de { background: rgba(127,164,238,.22); color: #b4cbf6 }
  .cv .sub b.de.norec { background: transparent; outline-color: rgba(127,164,238,.75) }
  .cv .sub span.de { font-style: italic }
  .cv .sub small { display: block; font-size: 28px; opacity: .7; font-style: normal; margin-top: 4px }
  .cv .lab { display: flex; align-items: center; gap: 16px; font: 500 24px var(--mono); letter-spacing: .14em; text-transform: uppercase; color: var(--sub); white-space: nowrap }
  .cv .lab::before { content: ""; flex: none; width: 32px; height: 3px; border-radius: 2px; background: var(--accLine) }
  .cv .lab.plain::before { display: none }
  .cv .lab.c { justify-content: center }
  .cv .dsp { font-weight: 760; font-stretch: 86%; letter-spacing: -.022em; line-height: .98; white-space: nowrap }
  .cv .wr { white-space: normal; text-wrap: balance; line-height: 1.02 }
  .cv .d1 { font-size: 168px; font-weight: 800; font-stretch: 84%; letter-spacing: -.028em } .cv .d2 { font-size: 128px; font-weight: 790; letter-spacing: -.026em } .cv .t1 { font-size: 96px } .cv .t2 { font-size: 72px; font-weight: 730; font-stretch: 90%; letter-spacing: -.016em } .cv .t3 { font-size: 56px; font-weight: 720; font-stretch: 92%; letter-spacing: -.012em }
  .cv .b1 { font-size: 44px; line-height: 1.3; font-weight: 500 }
  .cv .b2 { font-size: 34px; line-height: 1.35; font-weight: 500; color: var(--sub) }
  .cv .acc { color: var(--acc) }
  .cv .muted { color: var(--sub) }
  .cv .cap { font: 500 22px var(--mono); letter-spacing: .06em; color: var(--sub) }
  .cv .mono { font-family: var(--mono); font-weight: 500 }
  .cv .art-der { color: var(--der) } .cv .art-die { color: var(--die) } .cv .art-das { color: var(--das) }
  .cv .bg-der { background: var(--der) } .cv .bg-die { background: var(--die) } .cv .bg-das { background: var(--das) }
  .cv .card { background: var(--sf); border: var(--bd); border-radius: 40px; box-shadow: var(--sh) }
  .cv .strong { background: var(--strong); color: var(--strongInk) }
  .cv .pill { display: inline-flex; align-items: center; gap: 14px; height: 64px; padding: 0 28px; border-radius: 32px; font-weight: 650; font-size: 30px; background: var(--accSoft); color: var(--acc); box-shadow: inset 0 0 0 2px var(--accLine); white-space: nowrap }
  .cv .pill.out { background: transparent; color: var(--ink); box-shadow: inset 0 0 0 2px var(--ln) }
  .cv .pill.dark { background: var(--strong); color: var(--strongInk); box-shadow: none }
  .cv .pill.ok { background: var(--okSoft); color: var(--ok); box-shadow: inset 0 0 0 2px var(--ok) }
  .cv .pill.bad { background: var(--badSoft); color: var(--bad); box-shadow: inset 0 0 0 2px var(--bad) }
  .cv .pill i { font-style: normal; font: 500 22px var(--mono); width: 36px; height: 36px; border-radius: 18px; display: grid; place-items: center; background: rgba(127,127,127,.16) }
  .cv .ic { display: block; flex: none }
  .cv .row { display: flex; align-items: center }
  .cv .hl { border-radius: 6px; padding: 0 6px; background: var(--accSoft); box-shadow: inset 0 -3px 0 var(--accLine) }
  .cv .kw { opacity: .32 } .cv .kw.said { opacity: 1 } .cv .kw.now { color: var(--acc) }
  .cv .ring { position: relative; flex: none }
  .cv .ring svg { position: absolute; inset: 0; width: 100%; height: 100% }
  .cv .ring .num { position: absolute; inset: 0; display: grid; place-items: center; font-weight: 800; font-stretch: 84% }
  .cv .wave { display: flex; gap: 8px; align-items: center }
  .cv .wave i { flex: none; width: 8px; border-radius: 4px; background: var(--acc); opacity: .85; height: 10px }
  .cv .cover { position: absolute; inset: 0; z-index: 60; display: none; overflow: hidden }
  .cv.show-cover .cover { display: block }
  .cv.show-cover > :not(.cover) { visibility: hidden }
  `;

  // ---------- sahne ----------
  /** [a, b + tail) aralığında görünür. Öğeler sırayla, sönümlü 24 px kayarak girer (o.pop: yay); çıkış sıradakiyle biner. */
  const scn = (Y.scn = (X, a, b, { fade = 0.4, tail = 0.3 } = {}) => {
    const root = h("div", "scn", X.scene);
    root.dataset.a = a;
    root.dataset.b = b;
    const items = [];
    const fx = [];
    const S = {
      root,
      a,
      b,
      X,
      add(e, d = 0, o = {}) {
        items.push({ e, d, o });
        return e;
      },
      on(f) {
        fx.push(f);
        return S;
      },
      rg(c, n, o = {}) {
        const e = h("div", "rg", root);
        const top = o.top ?? X.TOP;
        const bot = o.bot ?? X.BOT;
        e.style.cssText = `left:${COL(c)}px;width:${SPAN(n)}px;top:${top}px;height:${bot - top}px;justify-content:${o.justify || "center"};align-items:${o.align || "stretch"}`;
        return e;
      },
    };
    X.scenes.push(S);
    X.R.push((t) => {
      const on = t >= a && t < b + tail;
      root.style.display = on ? "" : "none";
      if (!on) return;
      const out = tail ? P(t, b + tail - fade, fade) : P(t, b - fade, fade);
      for (const it of items) {
        if (it.o.still) {
          set(it.e, { o: 1 - out, r: it.o.r || 0 });
          continue;
        }
        const k = P(t, a + it.d, it.o.dur || (it.o.pop ? 0.7 : 0.9));
        const e = it.o.pop ? spring(k) : outExpo(k);
        set(it.e, { o: Math.min(out3(Math.min(1, k * 2.2)), 1 - out), x: (1 - e) * (it.o.dx || 0), y: (1 - e) * (it.o.dy ?? 24) - out3(out) * 8, s: it.o.s0 ? it.o.s0 + (1 - it.o.s0) * e : 1, r: it.o.r || 0 });
      }
      fx.forEach((f) => f(t, out));
    });
    return S;
  });

  // ---------- ortak sahneler ----------
  /** Kanca: solda başlık (etiket, iki üç satır büyük yazı, alt cümle, haplar), sağda şablonun nesnesi. */
  Y.hookLeft = (S, X, { lab, lines, sub, pills }, { span = 7, size = "d1" } = {}) => {
    const L = S.rg(0, span);
    if (lab) S.add(el(L, "lab", esc(lab)), 0);
    (lines || []).forEach((ln, i) => S.add(el(L, `dsp ${size}${i === lines.length - 1 && lines.length > 1 ? " acc" : ""}`, esc(ln), `margin-top:${i ? 8 : 32}px`), 0.06 + i * 0.08));
    if (sub) S.add(el(L, "b1 muted", esc(sub), "margin-top:36px"), 0.24);
    if (pills && pills.length) S.add(el(L, "row", pills.map((x, i) => `<span class="pill ${i ? "out" : ""}"><i>${i + 1}</i>${esc(x)}</span>`).join(""), "margin-top:44px;gap:16px;flex-wrap:wrap"), 0.32);
    X.L.push(() => [...L.querySelectorAll(".dsp")].forEach((e) => fit(e, SPAN(span), 72)));
    return L;
  };
  /** Bölüm kartı: solda numara + ad + alt satır, sağda videonun içindekiler listesi (şimdiki satır vurgulu). */
  Y.chapterCard = (X, a, b, { idx, title, sub, agenda, label }) => {
    const S = scn(X, a, b);
    const L = S.rg(0, 6);
    S.add(el(L, "lab", esc(label || `Bölüm ${idx + 1} / ${agenda.length}`)), 0);
    const tt = S.add(el(L, "dsp t1 wr", esc(title), "margin-top:28px"), 0.08);
    if (sub) S.add(el(L, "b1 muted", esc(sub), "margin-top:28px"), 0.18);
    const R = S.rg(7, 5);
    const card = S.add(el(R, "card", "", "padding:24px 0;overflow:hidden"), 0.12, { dy: 24, s0: 0.97 });
    const rowH = agenda.length > 6 ? 64 : 76;
    agenda.forEach((g, i) => {
      const on = i === idx;
      const done = i < idx;
      el(card, "row", `<span style="font:500 22px var(--mono);width:56px;flex:none;color:${on ? "var(--acc)" : "var(--sub)"}">${String(i + 1).padStart(2, "0")}</span><span style="flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:${agenda.length > 6 ? 28 : 32}px;font-weight:${on ? 750 : 600};color:${on ? "var(--ink)" : "var(--sub)"}">${esc(g[0])}</span><span style="flex:none;font:500 22px var(--mono);color:var(--sub);margin-left:12px">${done ? "✓" : esc(g[1] || "")}</span>`,
        `height:${rowH}px;padding:0 40px;gap:8px;${on ? "background:var(--sf2);box-shadow:inset 6px 0 0 var(--acc)" : ""}`);
    });
    X.L.push(() => fit(tt, SPAN(6), 64));
    return S;
  };
  /** Uygulama kartı: solda söz, sağda uygulamanın TASARLANMIŞ paneli (ekran kaydı değil). */
  Y.appCard = (X, a, b, { lab, title, body, where, panel, link, note }) => {
    const S = scn(X, a, b);
    const L = S.rg(0, 6);
    S.add(el(L, "lab", esc(lab)), 0);
    S.add(el(L, "dsp t1 wr", esc(title), "margin-top:28px"), 0.08);
    S.add(el(L, "b1 muted", esc(body), "margin-top:32px;max-width:800px"), 0.18);
    S.add(el(L, "row", `<span class="sig" style="box-shadow:var(--sh)"><img src="${Y.ICON}" alt=""><span>lernomi.app</span></span><span class="b2" style="margin-left:24px">${esc(link)}</span>`, "margin-top:48px"), 0.28);
    const R = S.rg(7, 5);
    const card = S.add(el(R, "card", `<div class="row" style="gap:16px;padding:28px 36px;border-bottom:2px solid var(--ln)"><img src="${Y.ICON}" alt="" style="width:44px;height:44px;border-radius:14px"><b style="font-size:30px">Lernomi</b><span class="cap" style="margin-left:auto">${esc(where)}</span></div><div style="padding:36px">${panel}</div>`), 0.16, { dy: 20, s0: 0.96 });
    card.style.overflow = "hidden";
    if (note) S.add(el(R, "cap", esc(note), "margin-top:20px;text-align:center"), 0.4);
    return S;
  };
  /**
   * Bitiş ekranı: YouTube'un bitiş öğeleri (abone ol + sıradaki video) son 20 sn'de bu boş alanların ÜSTÜNE konur.
   * Sol: söz ve abone yuvası (daire, 2026-10 YouTube boyutu ~ yüksekliğin %20'si), sağ: video yuvası (16:9).
   */
  Y.END_LEN = 20;
  Y.endScreen = (X, a, b, { lab, line, ask, sub, slot }) => {
    const S = scn(X, a, b + 1, { fade: 0.01 });
    const L = S.rg(0, 5);
    S.add(el(L, "lab", esc(lab)), 0);
    const ln = S.add(el(L, "dsp t1 wr", esc(line), "margin-top:28px"), 0.08);
    S.add(el(L, "b1 muted", esc(ask), "margin-top:28px"), 0.16);
    S.add(el(L, "row", `<div style="flex:none;width:208px;height:208px;border-radius:104px;background:var(--sf2);box-shadow:inset 0 0 0 2px var(--ln)"></div><div style="margin-left:36px;min-width:0"><div style="font-size:36px;font-weight:750">${esc(sub)}</div></div>`, "margin-top:56px"), 0.26);
    const R = S.rg(6, 6);
    S.add(el(R, "cap", esc(slot), "margin-bottom:20px"), 0.2);
    S.add(el(R, "", "", `height:${Math.round((SPAN(6) * 9) / 16)}px;border-radius:28px;background:var(--sf2);box-shadow:inset 0 0 0 2px var(--ln)`), 0.12, { s0: 0.98, dy: 20 });
    X.L.push(() => fit(ln, SPAN(5), 64));
    return S;
  };
  /** Kapak sahnesi için imza (her temada kendi kutusunda). */
  Y.sig = (css = "") => `<div class="abs sig" style="${css}"><img src="${Y.ICON}" alt=""><span>lernomi</span></div>`;

  // ---------- kurulum ----------
  /** meta: { title, theme, series }. build(X, data) zaman çizelgesini ve sahneleri kurar, toplam süreyi döner. */
  Y.register = (id, meta, build) => (Y.videos[id] = { id, ...meta, build });

  /**
   * Sahneyi kur: host'a gölge DOM, 1920×1080 tuval (host genişliğine ölçeklenir). Dönüş:
   * { plan: { duration, chapters, voice, sfx, subs }, render(t), showCover(on), cv, texts }. Yazı tipleri yüklü olmalı.
   */
  Y.mount = (host, id, data, { scale = true } = {}) => {
    const V = Y.videos[id];
    if (!V) throw new Error(`yatay şablon yok: ${id}`);
    const theme = V.theme;
    const sh = host.shadowRoot || host.attachShadow({ mode: "open" });
    sh.innerHTML = `<style>${CSS()}</style>`;
    const cv = h("div", `cv ${theme}`, sh);
    h("div", "bgfx", cv);
    if (theme === "turuncu") h("div", "pan", cv);
    const segsEl = h("div", "segs", cv);
    const hdr = h("div", "hdr", cv, `<span class="sp"></span><span class="ep"></span><span class="ch"></span><span class="sig"><img src="${Y.ICON}" alt=""><span>lernomi</span></span>`);
    hdr.querySelector(".sp").textContent = data.series || V.series || "";
    hdr.querySelector(".ep").textContent = data.ep || "";
    const chapEl = hdr.querySelector(".ch");
    const scene = h("div", null, cv);
    scene.style.cssText = "position:absolute;inset:0";
    const subEl = h("div", "sub", cv);
    const grain = h("div", "grain", cv);
    const cover = h("div", "cover", cv);
    const [TOP, BOT] = AREA[theme];
    const X = {
      V, data, scene, cover, cv, TOP, BOT, MID: (TOP + BOT) / 2, R: [], L: [], scenes: [],
      subs: [], voice: [], sfxs: [], chaps: [],
      /** Altyazı: [a, b), en çok iki satırlık parçalara bölünür. o.de: Almanca (italik, mavi etiket), o.tr: altında Türkçesi. */
      sub(a, b, who, text, o = {}) {
        const cs = chunks(String(text));
        const total = cs.reduce((s, c) => s + c.length, 0);
        let x = a;
        cs.forEach((c, i) => {
          const d = ((b - a) * c.length) / total;
          X.subs.push({ a: x, b: x + d - (cs.length > 1 ? 0.05 : 0), who, text: c, rec: o.rec !== false, de: !!o.de, tr: i === cs.length - 1 ? o.tr || "" : "" });
          x += d;
        });
      },
      /** Satırı seslendir (bkz. dosya başı). o.sub=false: altyazısız; o.who: etiket; o.tr: Almanca satırın altında Türkçesi. */
      say(t, line, o = {}) {
        if (!line || !String(line.t || "").trim()) return t;
        const d = Y.dur(line);
        const key = Y.keyOf(line);
        X.voice.push({ t, d, key, v: line.v, l: line.l, text: line.t, x: line.x || null });
        if (o.sub !== false) X.sub(t, t + d, o.who || (Y.VOICES[line.v] || { name: line.v }).name, line.t, { de: line.l === "de", rec: Y.has(line), tr: o.tr });
        return t + d;
      },
      sfx(t, kind) {
        X.sfxs.push({ t, kind });
      },
      chap(t, title) {
        X.chaps.push({ t, title: String(title) });
      },
      /** t anında çalan kaydın düzeyi (0–1): zarf varsa ondan, yoksa konuşma benzeri sentez. */
      level(t) {
        for (let i = X.voice.length - 1; i >= 0; i--) {
          const c = X.voice[i];
          if (t < c.t || t >= c.t + c.d) continue;
          const e = Y.ENV[c.key];
          if (e) return e[Math.min(e.length - 1, Math.floor((t - c.t) * 60))];
          return talk(t, c.t, c.t + c.d);
        }
        return 0;
      },
    };
    let duration = V.build(X, data);
    duration = Math.round(duration * 1000) / 1000;
    X.voice.sort((p, q) => p.t - q.t);
    X.chaps.sort((p, q) => p.t - q.t);
    // bölüm şeridi: her bölüm süresi oranında
    const segs = X.chaps.map((c, i) => {
      const end = i + 1 < X.chaps.length ? X.chaps[i + 1].t : duration;
      const b = h("b", null, segsEl);
      b.style.flex = `${Math.max(0.5, end - c.t)} 1 0`;
      return { a: c.t, b: end, fill: h("i", null, b) };
    });
    const layout = () => {
      cv.classList.add("measure");
      X.L.forEach((f) => f());
      cv.classList.remove("measure");
    };
    layout();
    const fitHost = () => {
      if (scale) cv.style.transform = `scale(${host.clientWidth / Y.W})`;
    };
    if (scale && typeof ResizeObserver !== "undefined") new ResizeObserver(fitHost).observe(host);
    fitHost();
    const render = (t) => {
      t = clamp(t, 0, duration);
      X.R.forEach((f) => f(t));
      segs.forEach((s) => (s.fill.style.transform = `scaleX(${clamp((t - s.a) / (s.b - s.a)).toFixed(4)})`));
      const s = X.subs.find((x) => t >= x.a && t < x.b);
      if (s) {
        const k = `${s.a}`;
        if (subEl.dataset.k !== k) {
          subEl.dataset.k = k;
          subEl.innerHTML = `<b class="${s.rec ? "" : "norec"} ${s.de ? "de" : ""}">${esc(s.who)}</b><span class="${s.de ? "de" : ""}">${esc(s.text)}${s.tr ? `<small>${esc(s.tr)}</small>` : ""}</span>`;
        }
        const kk = Math.min(P(t, s.a, 0.18), 1 - P(t, s.b - 0.18, 0.18));
        subEl.style.opacity = kk;
        subEl.style.transform = `translateX(-50%) translateY(${((1 - kk) * 12).toFixed(1)}px)`;
      } else subEl.style.opacity = 0;
      let ci = -1;
      X.chaps.forEach((c, i) => {
        if (t >= c.t) ci = i;
      });
      const title = ci >= 0 ? X.chaps[ci].title : "";
      if (chapEl.textContent !== title) chapEl.textContent = title;
      const kc = ci >= 0 ? out3(P(t, X.chaps[ci].t, 0.5)) : 0;
      chapEl.style.opacity = kc.toFixed(3);
      chapEl.style.transform = `translateX(${((1 - kc) * -12).toFixed(1)}px)`;
      const f = Math.floor(t * 12);
      grain.style.backgroundPosition = `${(f * 137) % 220}px ${(f * 251) % 220}px`;
    };
    const showCover = (on) => cv.classList.toggle("show-cover", !!on);
    render(0);
    const plan = {
      duration,
      chapters: X.chaps.map((c) => ({ t: Math.round(c.t * 1000) / 1000, title: c.title })),
      voice: X.voice.map((v) => ({ t: Math.round(v.t * 1000) / 1000, d: v.d, key: v.key, v: v.v, l: v.l, text: v.text })),
      sfx: X.sfxs.sort((p, q) => p.t - q.t).map((s) => ({ t: Math.round(s.t * 1000) / 1000, kind: s.kind })),
    };
    return { id, V, plan, render, showCover, cv, root: sh, X, layout };
  };

  /** YouTube bölüm listesi: ilk 0:00, her bölüm en az 10 sn (kısa olan bir öncekine katılır), en az 3 bölüm. */
  Y.chapterList = (plan) => {
    const fmt = (s) => {
      const m = Math.floor(s / 60);
      const hh = Math.floor(m / 60);
      const ss = String(Math.floor(s % 60)).padStart(2, "0");
      return hh ? `${hh}:${String(m % 60).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
    };
    const out = [];
    plan.chapters.forEach((c, i) => {
      const end = i + 1 < plan.chapters.length ? plan.chapters[i + 1].t : plan.duration;
      if (!out.length) out.push({ t: 0, title: c.title, end });
      else if (end - c.t < 10) out[out.length - 1].end = end;
      else out.push({ t: Math.floor(c.t), title: c.title, end });
    });
    return out.map((c) => `${fmt(c.t)} ${c.title}`);
  };

  /**
   * YERLEŞİM DENETİMİ (sunucu üretimden önce ve stüdyo onaydan önce aynı kuralı koşar). Her sahnenin ortasında ve
   * sonuna yakın: görünen öğe tuvalden taşmasın, içerik alanından (künye ile altyazı arası) dışarı çıkmasın; tek satır
   * yazı kutusundan taşmasın; altyazı iki satırı geçmesin. Dönüş: sorun satırları.
   */
  Y.audit = (I) => {
    const issues = new Set();
    const cv = I.cv;
    const base = cv.getBoundingClientRect();
    const k = base.width / Y.W || 1;
    const rel = (e) => {
      const r = e.getBoundingClientRect();
      return { l: (r.left - base.left) / k, t: (r.top - base.top) / k, r: (r.right - base.left) / k, b: (r.bottom - base.top) / k, w: r.width / k, h: r.height / k };
    };
    const name = (e) => (e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40) || e.className || e.tagName;
    for (const S of I.X.scenes) {
      for (const t of [S.a + Math.min(1.6, (S.b - S.a) / 2), (S.a + S.b) / 2, S.b - 0.35]) {
        if (t < S.a) continue;
        I.render(t);
        if (S.root.style.display === "none") continue;
        for (const e of S.root.querySelectorAll("*")) {
          if (e.closest("svg") && e.tagName !== "svg") continue;
          const cs = getComputedStyle(e);
          if (cs.visibility === "hidden" || +cs.opacity < 0.05 || cs.display === "none") continue;
          const r = rel(e);
          if (!r.w || !r.h) continue;
          if (r.l < -2 || r.t < -2 || r.r > Y.W + 2 || r.b > Y.H + 2) issues.add(`${S.a.toFixed(1)} sn: tuvalden taşıyor: ${name(e)}`);
          else if (r.t < 150 || r.b > I.X.BOT + 24) {
            if (!e.children.length && (e.textContent || "").trim()) issues.add(`${S.a.toFixed(1)} sn: içerik alanı dışında: ${name(e)}`);
          }
          if (!e.children.length && cs.whiteSpace === "nowrap" && e.scrollWidth > e.clientWidth + 2 && cs.overflow !== "visible" && cs.textOverflow !== "ellipsis") issues.add(`${S.a.toFixed(1)} sn: yazı kutusuna sığmıyor: ${name(e)}`);
        }
      }
    }
    const sub = I.cv.querySelector(".sub");
    for (const s of I.X.subs) {
      I.render((s.a + s.b) / 2);
      const r = rel(sub);
      if (r.h > (s.tr ? 190 : 150)) issues.add(`${s.a.toFixed(1)} sn: altyazı iki satırı geçiyor: ${s.text.slice(0, 40)}`);
    }
    I.render(0);
    return [...issues];
  };

  /** Ekrandaki yazılar ve sahnenin başladığı an (stüdyo: alana tıklayınca önizleme o ana gider). */
  Y.texts = (I) => {
    const out = [];
    for (const S of I.X.scenes) {
      const seen = new Set();
      const walker = document.createTreeWalker(S.root, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const s = n.textContent.trim();
        if (s.length > 1 && !seen.has(s)) {
          seen.add(s);
          out.push({ s, t: S.a });
        }
      }
    }
    for (const s of I.X.subs) out.push({ s: s.text, t: s.a });
    return out;
  };
})();
