/*
  "Kulaklığını tak": tek harfle anlamı değişen 4 çift, dairesel ses dalgası (Gece).
  Tutma mantığı: kanca bir meydan okuma (kulaklık tak, tek harf fark) → ortada ses çalarken tepki veren
  dairesel dalga, altında A/B kartları; iki kelimenin farklı harfi baştan işaretli (neye kulak vereceğin belli)
  → 2 sn düşünme halkası → cevapta dalganın ortasına o harf oturuyor, kartlarda Türkçeler → "bir de şunu dinle"
  ile öteki kelime çalınıyor (fark kulağa yerleşiyor) → özet + standart kapanış.
  copy anahtarları (hepsi zorunlu): title (galeri/kayıt adı), hook [2 satır: büyük beyaz, küçük turuncu],
  recap (kapanış özet başlığı), caption (paylaşım metni + etiketler), outro { series, ask }.
  Tur: 3–5 (rounds).
  ui (sabit yazılar; bölüm copy.ui ile ezer): roundTag "{n} / {total} · NE DUYDUN?" (tur etiketi),
  hint "Bir de şunu dinle" (öteki kelime çalınırken).
*/
E.register("duy-gece", { title: "Kulaklığını tak: tek harf", approach: "duy", theme: "gece", ui: { roundTag: "{n} / {total} · NE DUYDUN?", hint: "Bir de şunu dinle" } }, (X) => {
  const { h, set, p, ease, words, wordsIn, segments } = E;
  const D = X.data;
  // copy: bölüm dosyasından gelen ekran metinleri (sözleşme başlıktaki yorumda)
  const C = D.copy || {};
  for (const k of ["title", "hook", "recap", "caption", "outro"]) if (C[k] == null || C[k] === "") throw new Error(`duy-gece: copy.${k} eksik`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("duy-gece: copy.hook tam 2 satır olmalı");
  if (!C.outro.series || !C.outro.ask) throw new Error("duy-gece: copy.outro.series ve copy.outro.ask gerekli");
  if (!Array.isArray(D.rounds) || D.rounds.length < 3 || D.rounds.length > 5) throw new Error("duy-gece: 3–5 tur destekleniyor");
  // özet satırları: 5 turda biraz sıkışıp yukarı başlar, kapanış hapına (1176) değmesin
  const ROW0 = D.rounds.length > 4 ? 450 : 490;
  const STEP = D.rounds.length > 4 ? 132 : 136;
  const T = X.theme;
  const G = E.G;
  const OR = T.acc;
  const HOOK = 2.7;
  const THINK = 2.1;
  const VY = 640; // dalganın merkezi
  const NB = 56; // dalga çubuğu sayısı
  let R = [];
  let END = 0;
  let DUR = 0;
  let el = {};

  const wordHTML = (w) => `${w.artikel ? `<small>${w.artikel}</small>` : ""}<b>${w.parts.pre}<em>${w.parts.mid}</em>${w.parts.post}</b>`;

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.55, name: "pop", f: 600 }, { t: HOOK - 0.35, name: "whoosh", d: 0.45 }];
      let t = HOOK;
      R = D.rounds.map((r, i) => {
        const tgt = r.play ? r.b : r.a;
        const oth = r.play ? r.a : r.b;
        const o = { a: t, v1: t + 0.95, d1: dur(tgt.label) };
        o.think = o.v1 + o.d1 + 0.1;
        o.rev = o.think + THINK;
        o.v2 = o.rev + 1.0;
        o.d2 = dur(oth.label);
        o.b = o.v2 + o.d2 + 0.9;
        voice.push({ t: o.v1, text: tgt.label }, { t: o.v2, text: oth.label });
        sfx.push({ t: o.a, name: "whoosh", d: 0.4, v: 0.6 });
        [0.15, 0.85, 1.55].forEach((d, k) => sfx.push({ t: o.think + d, name: "tick", hi: k === 2 }));
        sfx.push({ t: o.rev, name: "ding", k: 1 + i * 0.05 }, { t: o.rev + 0.05, name: "impact", v: 0.35 });
        sfx.push({ t: o.v2 - 0.25, name: "pop", f: 500, v: 0.6 });
        t = o.b;
        return o;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      D.rounds.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.13, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.0,
        voice,
        sfx,
        music: { style: "trap", bpm: 140, root: 50, mode: "min", gain: 0.4, seed: "duy-gece" },
        notes: [
          { t: 0, title: "Kanca: meydan okuma", why: "İlk satır izleyene bir hazırlık yaptırıyor (kulaklık), ikinci satır 'tek harf' merakını kuruyor. Dalga baştan ekranda, ses odaklı bir video olduğu ilk saniyede belli." },
          { t: R[0].a, title: "A mı, B mi?", why: "İki kart ve farklı harf işaretli: izleyen neye kulak vereceğini biliyor. Ses çalarken dalga canlanıyor, göz ortada kalıyor." },
          { t: R[0].think, title: "2 saniye", why: "Halka dolarken üç tık: izleyen kafasında seçiyor. Görev veren an, kaydırma ihtimalini düşürüyor." },
          { t: R[0].rev, title: "Cevap ve fark", why: "Doğru kart turuncu çerçeve alıyor, dalganın ortasına o harf oturuyor, iki kelimenin Türkçesi açılıyor." },
          { t: R[0].v2, title: "Bir de şunu dinle", why: "Öteki kelime de çalınıyor: iki ses arka arkaya, fark kulağa yerleşiyor. Öğrenilen şey tam bu." },
          { t: END, title: "Özet + kapanış", why: "Bütün çiftler Türkçeleriyle liste olarak kalıyor (kaydetme). Standart kapanış ve kutulu imza." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .glow{width:900px;height:900px;border-radius:50%;filter:blur(160px);background:${OR}}
        .viz{left:${G.CX - 300}px;top:${VY - 300}px;width:600px;height:600px}
        .viz i{left:298px;top:300px;width:6px;height:40px;border-radius:3px;background:#fff;transform-origin:3px 0}
        .ring{left:${G.CX - 170}px;top:${VY - 170}px;width:340px;height:340px}
        .ring svg{width:100%;height:100%;transform:rotate(-90deg)}
        .ring circle{fill:none;stroke-width:8;stroke-linecap:round}
        .core{left:${G.CX - 136}px;top:${VY - 136}px;width:272px;height:272px;border-radius:50%;background:#222227;box-shadow:inset 0 0 0 2px rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center}
        .core b{position:relative;font-size:150px;font-weight:800;font-stretch:84%;line-height:1;color:#fff}
        .core svg{position:absolute;left:76px;top:76px;width:120px;height:120px}
        .tag{top:262px;height:72px;padding:0 32px;border-radius:36px;background:rgba(255,255,255,.1);color:#fff;font-size:34px;font-weight:800;letter-spacing:.06em;display:flex;align-items:center;white-space:nowrap}
        .card{top:1000px;width:400px;height:320px;border-radius:48px;background:${T.surface};box-shadow:inset 0 0 0 4px rgba(255,255,255,.08)}
        .card .ab{left:32px;top:28px;width:56px;height:56px;border-radius:28px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;font-size:32px;font-weight:800}
        .card .ok{right:28px;top:28px;width:56px;height:56px;border-radius:28px;background:${OR};color:#141416;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:800}
        .card .wbox{left:32px;right:32px;top:92px;height:150px;display:flex;flex-direction:column;align-items:center;justify-content:center;white-space:nowrap}
        .card .wbox *{position:relative}
        .card small{display:block;font-size:36px;font-weight:700;color:${T.sub};margin-bottom:4px}
        .card .wbox b{display:inline-block;font-size:100px;font-weight:800;font-stretch:84%;letter-spacing:-.01em;line-height:1;transform-origin:50% 50%}
        .card em{font-style:normal;color:${OR}}
        .card .tr{left:24px;right:24px;bottom:30px;text-align:center;white-space:nowrap;font-size:40px;font-weight:600;color:${T.sub}}
        .hint{left:${G.L}px;width:${G.W}px;top:1372px;text-align:center;font-size:42px;font-weight:700;color:${T.sub}}
        .e1{left:${G.L}px;width:${G.W}px;top:330px;text-align:center;font-size:104px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1}
        .row{left:${G.L}px;width:${G.W}px;height:120px;border-radius:32px;background:${T.surface};display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:0 32px;column-gap:24px}
        .row div{position:relative;display:flex;flex-direction:column;gap:2px;white-space:nowrap}
        .row div *{position:relative}
        .row b{font-size:46px;font-weight:800;line-height:1.1}
        .row span{font-size:30px;font-weight:600;color:${T.sub};line-height:1.2}
        .row div+div{border-left:2px solid rgba(255,255,255,.12);padding-left:24px}
      `);
      el.g = h("div", "glow", root);
      el.segs = segments(root, D.rounds.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 120 }, { t: C.hook[1], size: 80, color: OR, delay: 0.55 }], { center: 300 + 70 });
      el.viz = h("div", "viz", root);
      el.bars = Array.from({ length: NB }, (_, i) => {
        const b = h("i", null, el.viz);
        b.dataset.a = String((i / NB) * 360);
        return b;
      });
      el.ring = h("div", "ring", root, `<svg viewBox="0 0 340 340"><circle cx="170" cy="170" r="160" stroke="rgba(255,255,255,.1)"/><circle class="fg" cx="170" cy="170" r="160" stroke="${OR}"/></svg>`);
      el.fg = el.ring.querySelector(".fg");
      el.core = h("div", "core", root, `<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 3a9 9 0 00-9 9v5a3 3 0 003 3h1a1 1 0 001-1v-5a1 1 0 00-1-1H5v-1a7 7 0 0114 0v1h-2a1 1 0 00-1 1v5a1 1 0 001 1h1a3 3 0 003-3v-5a9 9 0 00-9-9z"/></svg><b></b>`);
      el.coreIcon = el.core.querySelector("svg");
      el.coreTxt = el.core.querySelector("b");
      el.rounds = D.rounds.map((r, i) => {
        const o = { r, tag: h("div", "tag", root, X.ui("roundTag", { n: i + 1, total: D.rounds.length })) };
        o.cards = [r.a, r.b].map((w, k) => {
          const c = h("div", "card", root, `<div class="ab">${k ? "B" : "A"}</div><div class="ok">✓</div><div class="wbox">${wordHTML(w)}</div><div class="tr">${w.tr}</div>`);
          c.style.left = `${k ? G.R - 400 : G.L}px`;
          return { c, ok: c.querySelector(".ok"), tr: c.querySelector(".tr"), wb: c.querySelector(".wbox b") };
        });
        return o;
      });
      el.hint = h("div", "hint", root, X.ui("hint"));
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
      // kelime kartın iç genişliğine (336 px) sığar
      el.rounds.forEach((o) => {
        o.tw = o.tag.offsetWidth;
        o.cards.forEach((c) => {
          c.fit = Math.min(1, 336 / c.wb.offsetWidth);
          if (c.tr.scrollWidth > 352) c.tr.style.fontSize = `${Math.floor((40 * 352) / c.tr.scrollWidth)}px`;
        });
      });
    },

    render(t) {
      set(el.g, { o: 0.14, x: -250 + Math.sin(t * 0.4) * 140, y: 900 + Math.cos(t * 0.33) * 140 });
      const ho = HOOK - 0.35;
      el.hook.render(t, 0.05, ho);
      const ri = R.findIndex((o) => t >= o.a && t < o.b);
      const cur = ri >= 0 ? R[ri] : null;
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ri >= 0 ? ri : t >= END ? R.length : 0, cur ? p(t, cur.a, cur.b - cur.a) : 0);

      // dalga: kancada sakin nefes alır, ses çalarken canlanır; kapanışta kaybolur
      const vIn = p(t, 0.9, 0.7);
      const vOut = ease.inCubic(p(t, END - 0.2, 0.4));
      const talking = cur && ((t >= cur.v1 && t < cur.v1 + cur.d1) || (t >= cur.v2 && t < cur.v2 + cur.d2));
      const vy = ri < 0 && t < HOOK ? 380 : 0; // kancada dalga aşağıda, turlarda yerinde
      const up = ease.inOutCubic(p(t, HOOK - 0.4, 0.6));
      const dy = (1 - up) * 380;
      el.bars.forEach((b, i) => {
        const a = +b.dataset.a;
        const amp = talking ? Math.abs(Math.sin(t * 15 + i * 0.9) * Math.sin(t * 6.1 + i * 0.37)) : 0;
        const idle = 0.18 + 0.12 * Math.sin(t * 2.2 + i * 0.5);
        const len = 26 + (talking ? amp * 120 : idle * 60);
        b.style.height = `${len.toFixed(1)}px`;
        b.style.transform = `rotate(${a}deg) translateY(150px)`;
        b.style.background = talking ? OR : "rgba(255,255,255,.55)";
      });
      void vy;
      set(el.viz, { o: Math.min(ease.outCubic(vIn), 1 - vOut), y: dy, s: 0.8 + ease.spring(vIn) * 0.2 });
      set(el.core, { o: Math.min(ease.outCubic(vIn), 1 - vOut), y: dy, s: 0.8 + ease.spring(vIn) * 0.2 + (talking ? 0.03 * Math.sin(t * 20) : 0) });
      // halka: düşünme süresi
      const C = 2 * Math.PI * 160;
      const ck = cur ? p(t, cur.think, THINK) : 0;
      el.fg.style.strokeDasharray = `${C}`;
      el.fg.style.strokeDashoffset = `${C * (1 - ck)}`;
      set(el.ring, { o: cur ? p(t, cur.think - 0.1, 0.2) * (1 - p(t, cur.rev, 0.25)) : 0 });
      // ortadaki işaret: kulaklık → cevapta farklı harf
      if (cur) {
        const o = el.rounds[ri];
        const tgt = o.r.play ? o.r.b : o.r.a;
        const rv = p(t, cur.rev, 0.5);
        el.coreTxt.textContent = tgt.parts.mid || "·";
        set(el.coreIcon, { o: 1 - p(t, cur.rev - 0.05, 0.15) });
        set(el.coreTxt, { o: ease.outCubic(rv * 2), s: 0.4 + ease.spring(rv) * 0.6 });
        el.coreTxt.style.color = OR;
      } else {
        set(el.coreIcon, { o: 1 });
        set(el.coreTxt, { o: 0 });
      }

      el.rounds.forEach((o, i) => {
        const r = R[i];
        const shown = t >= r.a - 0.05 && t < r.b + 0.05;
        o.tag.style.display = shown ? "" : "none";
        o.cards.forEach((c) => (c.c.style.display = shown ? "" : "none"));
        if (!shown) return;
        const k = p(t, r.a, 0.55);
        const out = ease.inCubic(p(t, r.b - 0.35, 0.35));
        set(o.tag, { o: Math.min(k * 2, 1 - out), x: G.CX - o.tw / 2, y: (1 - ease.outExpo(k)) * -40 });
        const rv = p(t, r.rev, 0.5);
        o.cards.forEach((c, kk) => {
          const ok = kk === o.r.play;
          const ck2 = p(t, r.a + 0.15 + kk * 0.1, 0.55);
          const echo = !ok && t >= r.v2 && t < r.v2 + r.d2 ? Math.sin(((t - r.v2) / r.d2) * Math.PI) : 0;
          set(c.c, { o: Math.min(ease.outCubic(ck2 * 2), 1 - out) * (ok ? 1 : 1 - rv * 0.35 + echo * 0.35), y: (1 - ease.spring(ck2)) * 160 + out * 60, s: (ok ? 1 + Math.sin(Math.PI * rv) * 0.05 : 1) + echo * 0.04 });
          c.c.style.boxShadow = ok && rv > 0 ? `inset 0 0 0 5px ${OR}` : echo > 0 ? "inset 0 0 0 5px rgba(255,255,255,.5)" : "inset 0 0 0 4px rgba(255,255,255,.08)";
          set(c.ok, { o: ok ? ease.outCubic(rv * 2) : 0, s: ok ? 0.4 + ease.spring(rv) * 0.6 : 1 });
          set(c.tr, { o: p(t, r.rev + 0.3, 0.4) * (ok ? 1 : 0.8) });
          set(c.wb, { s: c.fit });
        });
      });
      const hk = cur ? p(t, cur.v2 - 0.35, 0.3) * (1 - p(t, cur.b - 0.4, 0.3)) : 0;
      set(el.hint, { o: hk, y: (1 - ease.outCubic(hk)) * 16 });

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
