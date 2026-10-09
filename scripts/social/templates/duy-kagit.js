/*
  "Kulağına güveniyor musun?": iki uzun kart yan yana, A mı B mi (Kâğıt).
  Tutma mantığı: kanca kişisel bir soru (kulağına güveniyor musun) → iki kart, farklı harf vurgulu, altta
  hoparlör ve durum yazısı (Dinle → A mı, B mi? → cevap → bir de ötekini dinle) → doğru kart öne çıkar,
  yanlış söner, Türkçeler kartın dibinde → kartlar kayarak değişir → özet + standart kapanış.
  copy anahtarları (hepsi zorunlu): title, hook [2 satır: siyah, turuncu], pill (kancanın altındaki koyu hap),
  recap (kapanış özet başlığı), caption, outro { series, ask }.
  Tur: 3–5 (rounds).
  ui (sabit yazılar, hoparlör altındaki durum yazısı; bölüm copy.ui ile ezer): listen "Dinle", ask "A mı, B mi?",
  answerA "Cevap: A", answerB "Cevap: B", againA "Bir de A'yı dinle", againB "Bir de B'yi dinle" (ek uyumu harfe
  göre değiştiği için A ve B ayrı).
*/
E.register("duy-kagit", {
  title: "Kulağına güveniyor musun?",
  approach: "duy",
  theme: "kagit",
  ui: { listen: "Dinle", ask: "A mı, B mi?", answerA: "Cevap: A", answerB: "Cevap: B", againA: "Bir de A'yı dinle", againB: "Bir de B'yi dinle" },
}, (X) => {
  const { h, set, p, ease, words, wordsIn, segments } = E;
  const D = X.data;
  // copy: bölüm dosyasından gelen ekran metinleri (sözleşme başlıktaki yorumda)
  const C = D.copy || {};
  for (const k of ["title", "hook", "pill", "recap", "caption", "outro"]) if (C[k] == null || C[k] === "") throw new Error(`duy-kagit: copy.${k} eksik`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("duy-kagit: copy.hook tam 2 satır olmalı");
  if (!C.outro.series || !C.outro.ask) throw new Error("duy-kagit: copy.outro.series ve copy.outro.ask gerekli");
  if (!Array.isArray(D.rounds) || D.rounds.length < 3 || D.rounds.length > 5) throw new Error("duy-kagit: 3–5 tur destekleniyor");
  // özet satırları: 5 turda biraz sıkışıp yukarı başlar, kapanış hapına (1176) değmesin
  const ROW0 = D.rounds.length > 4 ? 450 : 490;
  const STEP = D.rounds.length > 4 ? 132 : 136;
  const T = X.theme;
  const G = E.G;
  const OR = T.acc;
  const HOOK = 2.8;
  const THINK = 2.1;
  const CW = 404; // kart genişliği
  let R = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  const wordHTML = (w) => `${w.artikel ? `<small>${w.artikel}</small>` : ""}<b>${w.parts.pre}<em>${w.parts.mid}</em>${w.parts.post}</b>`;
  const SPK = `<svg viewBox="0 0 24 24"><path fill="#fff" d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z"/></svg>`;

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.6 }, { t: 0.5, name: "pop", f: 560 }, { t: 1.2, name: "pop", f: 760 }, { t: HOOK - 0.35, name: "whoosh", d: 0.45 }];
      let t = HOOK;
      R = D.rounds.map((r, i) => {
        const tgt = r.play ? r.b : r.a;
        const oth = r.play ? r.a : r.b;
        const o = { a: t, v1: t + 1.0, d1: dur(tgt.label) };
        o.think = o.v1 + o.d1 + 0.1;
        o.rev = o.think + THINK;
        o.v2 = o.rev + 1.1;
        o.d2 = dur(oth.label);
        o.b = o.v2 + o.d2 + 0.9;
        voice.push({ t: o.v1, text: tgt.label }, { t: o.v2, text: oth.label });
        sfx.push({ t: o.a, name: "flip" }, { t: o.a + 0.12, name: "flip" });
        [0.2, 0.9, 1.6].forEach((d) => sfx.push({ t: o.think + d, name: "pop", f: 900, v: 0.35 }));
        sfx.push({ t: o.rev, name: "ding", k: 1 + i * 0.04 });
        t = o.b;
        return o;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      D.rounds.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.13, name: "count", n: 77 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.1,
        voice,
        sfx,
        music: { style: "folk", bpm: 96, root: 55, mode: "maj", gain: 0.45, seed: "duy-kagit" },
        notes: [
          { t: 0, title: "Kanca: kişisel soru", why: "Kanca izleyeni kendini sınamaya çağıran kişisel bir soru. Altındaki hap işin küçük olduğunu söylüyor: fark tek harf." },
          { t: R[0].a, title: "İki kart", why: "Kartlar yan yana ve farklı harf turuncu zeminle işaretli: göz iki kelimeyi karşılaştırıyor, kulak neye odaklanacağını biliyor." },
          { t: R[0].think, title: "A mı, B mi?", why: "Hoparlörün altındaki üç nokta 2 saniyeyi sayıyor. Kısa ve net bir görev." },
          { t: R[0].rev, title: "Cevap", why: "Doğru kart öne çıkıyor, yanlış soluyor; Türkçeler kartın dibinde açılıyor." },
          { t: R[0].v2, title: "Bir de ötekini dinle", why: "İki ses arka arkaya: fark kulağa yerleşiyor. Durum yazısı izleyeni hangi karta bakacağına yönlendiriyor." },
          { t: END, title: "Özet + kapanış", why: "Bütün çiftler liste olarak kalıyor (kaydetme). Standart kapanış ve kutulu imza." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .pill{top:850px;height:104px;padding:0 44px;border-radius:52px;background:${T.ink};color:#fff;font-size:48px;font-weight:800;display:flex;align-items:center;white-space:nowrap}
        .tag{left:${G.L}px;top:268px;height:72px;padding:0 32px;border-radius:36px;background:${T.ink};color:#fff;font-size:34px;font-weight:800;letter-spacing:.06em;display:flex;align-items:center}
        .card{top:372px;width:${CW}px;height:600px;border-radius:48px;background:#fff;box-shadow:0 24px 60px -30px rgba(40,30,20,.4)}
        .card .ab{left:36px;top:24px;font-size:120px;font-weight:800;line-height:1;color:transparent;-webkit-text-stroke:3px rgba(27,27,29,.18)}
        .card .ok{right:32px;top:36px;width:72px;height:72px;border-radius:36px;background:${OR};color:#fff;display:flex;align-items:center;justify-content:center;font-size:42px;font-weight:800}
        .card .wbox{left:32px;right:32px;top:190px;height:200px;display:flex;flex-direction:column;align-items:center;justify-content:center;white-space:nowrap}
        .card .wbox *{position:relative}
        .card small{display:block;font-size:40px;font-weight:700;color:${T.sub};margin-bottom:6px}
        .card .wbox b{display:inline-block;font-size:110px;font-weight:800;font-stretch:84%;letter-spacing:-.01em;line-height:1}
        .card em{font-style:normal;color:${OR};background:linear-gradient(transparent 50%,#ffd9b5 50%,#ffd9b5 80%,transparent 80%);padding:0 4px;margin:0 -4px}
        .card .hr{left:48px;right:48px;top:440px;height:0;border-top:3px dotted rgba(27,27,29,.2)}
        .card .tr{left:24px;right:24px;top:476px;text-align:center;white-space:nowrap;font-size:44px;font-weight:700}
        .spk{left:${G.CX - 76}px;top:1032px;width:152px;height:152px;border-radius:50%;background:${T.ink};display:flex;align-items:center;justify-content:center}
        .spk svg{position:relative;width:76px;height:76px}
        .rip{left:${G.CX - 76}px;top:1032px;width:152px;height:152px;border-radius:50%;border:5px solid ${OR}}
        .st{left:${G.L}px;width:${G.W}px;top:1220px;text-align:center;font-size:52px;font-weight:800;letter-spacing:-.01em}
        .dots{left:${G.CX - 64}px;top:1310px;width:128px;height:24px;display:flex;justify-content:space-between}
        .dots i{position:relative;width:24px;height:24px;border-radius:12px;background:rgba(27,27,29,.14)}
        .e1{left:${G.L}px;width:${G.W}px;top:330px;text-align:center;font-size:104px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1}
        .row{left:${G.L}px;width:${G.W}px;height:120px;border-radius:32px;background:#fff;display:grid;grid-template-columns:1fr 1fr;align-items:center;padding:0 32px;column-gap:24px;box-shadow:0 10px 24px -18px rgba(40,30,20,.5)}
        .row div{position:relative;display:flex;flex-direction:column;gap:2px;white-space:nowrap}
        .row div *{position:relative}
        .row b{font-size:46px;font-weight:800;line-height:1.1}
        .row span{font-size:30px;font-weight:600;color:${T.sub};line-height:1.2}
        .row div+div{border-left:2px solid rgba(27,27,29,.1);padding-left:24px}
      `);
      el.segs = segments(root, D.rounds.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 128 }, { t: C.hook[1], size: 128, color: OR, delay: 0.4 }], { center: 680 });
      el.pill = h("div", "pill", root, C.pill);
      el.rounds = D.rounds.map((r, i) => {
        const o = { r, tag: h("div", "tag", root, `${i + 1} / ${D.rounds.length}`) };
        o.cards = [r.a, r.b].map((w, k) => {
          const c = h("div", "card", root, `<div class="ab">${k ? "B" : "A"}</div><div class="ok">✓</div><div class="wbox">${wordHTML(w)}</div><div class="hr"></div><div class="tr">${w.tr}</div>`);
          c.style.left = `${k ? G.R - CW : G.L}px`;
          return { c, ok: c.querySelector(".ok"), tr: c.querySelector(".tr"), wb: c.querySelector(".wbox b"), hr: c.querySelector(".hr") };
        });
        return o;
      });
      el.rips = [h("div", "rip", root), h("div", "rip", root)];
      el.spk = h("div", "spk", root, SPK);
      el.st = h("div", "st", root, "");
      el.dots = h("div", "dots", root, "<i></i><i></i><i></i>");
      el.dotEls = [...el.dots.children];
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
      el.pw = el.pill.offsetWidth;
      el.rounds.forEach((o) =>
        o.cards.forEach((c) => {
          c.fit = Math.min(1, (CW - 64) / c.wb.offsetWidth);
          if (c.tr.scrollWidth > CW - 48) c.tr.style.fontSize = `${Math.floor((44 * (CW - 48)) / c.tr.scrollWidth)}px`;
        }),
      );
    },

    render(t) {
      const ho = HOOK - 0.35;
      el.hook.render(t, 0.05, ho);
      {
        const k = p(t, 1.2, 0.5);
        set(el.pill, { o: Math.min(k * 3, 1 - p(t, ho, 0.25)), x: G.CX - el.pw / 2, s: 0.7 + ease.spring(k) * 0.3, r: (1 - ease.spring(k)) * 3 });
      }
      const ri = R.findIndex((o) => t >= o.a && t < o.b);
      const cur = ri >= 0 ? R[ri] : null;
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ri >= 0 ? ri : t >= END ? R.length : 0, cur ? p(t, cur.a, cur.b - cur.a) : 0);

      el.rounds.forEach((o, i) => {
        const r = R[i];
        const shown = t >= r.a - 0.05 && t < r.b + 0.05;
        o.tag.style.display = shown ? "" : "none";
        o.cards.forEach((c) => (c.c.style.display = shown ? "" : "none"));
        if (!shown) return;
        const out = ease.inCubic(p(t, r.b - 0.4, 0.4));
        set(o.tag, { o: p(t, r.a, 0.3) * (1 - out) });
        const rv = p(t, r.rev, 0.55);
        o.cards.forEach((c, k) => {
          const ok = k === o.r.play;
          const ik = p(t, r.a + k * 0.12, 0.6);
          const other = !ok && t >= r.v2 - 0.2 && t < r.v2 + r.d2 + 0.2 ? 1 : 0;
          set(c.c, {
            o: Math.min(ease.outCubic(ik * 2), 1 - out) * (ok ? 1 : 1 - rv * 0.5 + other * 0.5),
            x: (1 - ease.outExpo(ik)) * 700 - out * 700,
            y: ok ? -ease.spring(rv) * 18 : 0,
            r: (1 - ease.outExpo(ik)) * 6,
            s: ok ? 1 + ease.spring(rv) * 0.03 : 1,
          });
          c.c.style.boxShadow = ok && rv > 0 ? `inset 0 0 0 6px ${OR},0 30px 60px -28px rgba(40,30,20,.5)` : other ? `inset 0 0 0 6px ${T.ink},0 24px 60px -30px rgba(40,30,20,.4)` : "0 24px 60px -30px rgba(40,30,20,.4)";
          set(c.ok, { o: ok ? ease.outCubic(rv * 2) : 0, s: ok ? 0.4 + ease.spring(rv) * 0.6 : 1 });
          const tk = p(t, r.rev + 0.3, 0.4);
          set(c.tr, { o: tk, y: (1 - ease.outCubic(tk)) * 14 });
          set(c.hr, { o: tk });
          set(c.wb, { s: c.fit });
        });
      });

      // hoparlör, durum yazısı, sayaç
      const on = p(t, HOOK - 0.1, 0.4) * (1 - p(t, END - 0.2, 0.3));
      const talking = cur && ((t >= cur.v1 && t < cur.v1 + cur.d1) || (t >= cur.v2 && t < cur.v2 + cur.d2));
      set(el.spk, { o: on, s: 1 + (talking ? Math.abs(Math.sin(t * 14)) * 0.06 : 0) });
      el.rips.forEach((g, i) => {
        const ph = ((t * 1.3 + i * 0.5) % 1);
        set(g, { o: talking ? (1 - ph) * 0.7 * on : 0, s: 1 + ph * 0.8 });
      });
      let st = "";
      if (cur) {
        const oth = cur && (el.rounds[ri].r.play ? "A" : "B");
        st = X.ui(t < cur.think ? "listen" : t < cur.rev ? "ask" : t < cur.v2 - 0.2 ? (el.rounds[ri].r.play ? "answerB" : "answerA") : `again${oth}`);
      }
      if (el.st.textContent !== st) el.st.textContent = st;
      set(el.st, { o: on * (cur ? 1 : 0) });
      el.dotEls.forEach((d, k) => {
        const lit = cur && t >= cur.think + 0.2 + k * 0.7 && t < cur.rev + 0.2;
        d.style.background = lit ? OR : "rgba(27,27,29,.14)";
      });
      set(el.dots, { o: cur ? p(t, cur.think - 0.2, 0.2) * (1 - p(t, cur.rev + 0.2, 0.25)) : 0 });

      wordsIn(el.ew, t, END + 0.1, { stagger: 0.08 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.5 + i * 0.13, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), y: (1 - ease.spring(k)) * 80 });
      });
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
