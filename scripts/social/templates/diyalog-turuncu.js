/*
  Fiş şablonu: cümleler bir fişe basılıyor (Turuncu kutu: fiş = açık kutu). Örnek bölüm: diyalog-turuncu-001 (market kasası).
  Tutma mantığı: kanca gündelik ve kısa → fiş yazıcı sesiyle satır satır büyüyor (izleyen sonunu, TOPLAM'ı
  görmek istiyor) → her cümlenin anahtar kelimesi fişte ürün satırı gibi duruyor (noktalı çizgi, karşılığı) →
  senin cümlelerinde sesli tekrar → TOPLAM: N cümle → panelde özet + kapanış.

  İçerik (D): lines [{ who: "me"|"them", alt?, de, tr, keyDe, keyTr }] (H.line; alt: "SEN · YA DA"), copy:
  copy anahtarları
    zorunlu: title, hook (tam 2 satır: 1. beyaz, 2. koyu), caption, outro { series, ask },
             them (karşı tarafın fiş etiketi, büyük harf, ör. "KASİYER"),
             receiptNo (fişin üst satırı, ör. "KASSE 3"), receiptTitle (fiş başlığı, ör. "Markette kasada"),
             saveLine (paneldeki üst satır, ör. "Kaydet, kasada işine yarar."), endTitle (panel başlığı, ör. "Bugünün 4 kelimesi")
    isteğe bağlı: thanks (fişin son satırı; yoksa ui.thanks)
  sabit yazılar (copy.ui ile ezilir): me "SEN", meAlt "SEN · YA DA", sayNow "şimdi sen söyle", total "TOPLAM",
    totalCount "{n} cümle", thanks "DANKE · TEŞEKKÜRLER"
*/
E.register(
  "diyalog-turuncu",
  {
    title: "Fişe basılan diyalog",
    approach: "diyalog",
    theme: "turuncu",
    ui: { me: "SEN", meAlt: "SEN · YA DA", sayNow: "şimdi sen söyle", total: "TOPLAM", totalCount: "{n} cümle", thanks: "DANKE · TEŞEKKÜRLER" },
  },
  (X) => {
  const { h, set, p, ease, words, karaoke, segments } = E;
  const D = X.data;
  const T = X.theme;
  const MONO = '"DM Mono", ui-monospace, Menlo, monospace';
  const HOOK = 2.5;
  const G = E.G;
  const TOP = 260; // fişin üst kenarı
  const FLOOR = 1480; // baskı ucu bunun altına inmez; fiş yukarı kayar
  const C = D.copy;
  for (const k of ["title", "hook", "caption", "outro", "them", "receiptNo", "receiptTitle", "saveLine", "endTitle"]) if (C?.[k] == null) throw new Error(`diyalog-turuncu: copy.${k} eksik`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("diyalog-turuncu: copy.hook tam 2 satır olmalı");
  const WHO = (l) => (l.who === "me" ? X.ui(l.alt ? "meAlt" : "me") : C.them);
  let L = [];
  let END = 0;
  let DUR = 0;
  let el = {};

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.55, name: "pop", f: 620 }, { t: HOOK - 0.35, name: "whoosh", d: 0.45 }, { t: HOOK, name: "print", d: 0.55 }];
      let t = HOOK + 0.8;
      L = D.lines.map((l) => {
        const r = { a: t, v: t + 0.45, d: dur(l.de) };
        sfx.push({ t: r.a, name: "print", d: 0.4 });
        r.tr = r.v + r.d + 0.1;
        r.key = r.tr + 0.4;
        voice.push({ t: r.v, text: l.de });
        sfx.push({ t: r.key, name: "print", d: 0.25 });
        if (l.who === "me") {
          r.rep = r.key + 0.55;
          r.repD = r.d + 0.9;
          sfx.push({ t: r.rep, name: "count", n: 76 });
          r.b = r.rep + r.repD + 0.2;
        } else r.b = r.key + 1.3;
        t = r.b;
        return r;
      });
      END = t + 1.1; // TOPLAM satırı
      sfx.push({ t: t, name: "print", d: 0.6 }, { t: t + 0.65, name: "ding", v: 0.6 });
      DUR = END + 1.4 + E.OUTRO_LEN;
      sfx.push({ t: END - 0.1, name: "whoosh", d: 0.45 });
      D.lines.forEach((_, i) => sfx.push({ t: END + 0.6 + i * 0.12, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      const altAt = D.lines.findIndex((l) => l.alt);
      const themAt = D.lines.findIndex((l) => l.who === "them");
      return {
        duration: DUR,
        poster: 1.9,
        voice,
        sfx,
        music: { style: "house", bpm: 116, root: 57, mode: "maj", gain: 0.4, seed: "diyalog-turuncu" },
        notes: [
          { t: 0, title: "Kanca: gündelik an", why: "Herkesin her hafta yaşadığı kısa bir durum; işin küçük olduğunu söyleyen kanca, izleyen kaçırmak istemiyor." },
          { t: HOOK, title: "Fiş basılıyor", why: "Açık kutu burada bir kasa fişi: yazıcı sesiyle satır satır uzuyor. TOPLAM satırını görmek için izleyen sonuna kadar kalıyor." },
          { t: L[0].key, title: "Ürün satırı", why: "Anahtar kelime fişte ürün gibi: noktalı çizgi, karşılığı sağda. Konuya özgü bir ayrıntı, ekran görüntüsü alınır." },
          ...(altAt >= 0 ? [{ t: L[altAt].a, title: "Ya da", why: "Aynı yere iki yol: izleyen kendi durumunu seçiyor." }] : []),
          ...(themAt >= 0 ? [{ t: L[themAt].a, title: "Karşı taraftan duyacakların", why: "Karşı tarafın en sık sorduğu şeyler: duyunca tanıman için." }] : []),
          { t: END, title: "TOPLAM + kapanış", why: "Fiş 'TOPLAM: N cümle' ile kapanıyor, panelde özet ve standart kapanış." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .clip{left:0;right:0;top:${TOP - 20}px;height:${1530 - TOP + 20}px;overflow:hidden}
        .slot{left:${G.L - 16}px;width:${G.W + 32}px;top:${TOP - 34}px;height:30px;border-radius:15px;background:${T.ink}}
        .paper{left:${G.L}px;width:${G.W}px;top:20px;background:#fffdf8;box-shadow:0 30px 60px -30px rgba(116,49,15,.7)}
        .paper *{position:relative!important}
        .in{padding:48px 56px 40px}
        .hd{text-align:center;font-family:${MONO};font-size:32px;letter-spacing:.2em;color:${T.sub}}
        .ttl{text-align:center;font-size:60px;font-weight:800;font-stretch:86%;letter-spacing:-.01em;margin:6px 0 4px}
        .dash{height:0;border-top:4px dashed rgba(27,27,29,.22);margin:26px 0}
        .blk{display:block}
        .lab{display:flex;align-items:center;gap:14px;font-family:${MONO};font-size:30px;letter-spacing:.14em;color:${T.sub};height:44px}
        .lab .say{display:flex;align-items:center;gap:10px;margin-left:auto;color:${T.acc};letter-spacing:.04em;font-weight:500}
        .lab .dot{width:18px;height:18px;border-radius:50%;background:${T.acc}}
        .de{display:block;margin-top:8px;font-size:54px;font-weight:700;line-height:1.16;letter-spacing:-.01em}
        .de .w{opacity:.28}.de .w.said{opacity:1}.de .w.now{color:${T.acc}}
        .trl{display:block;margin-top:10px;font-size:38px;font-weight:500;line-height:1.28;color:${T.sub}}
        .item{display:flex;align-items:baseline;gap:12px;margin-top:18px;font-family:${MONO};font-size:32px;font-weight:500}
        .item b{font-weight:500;color:${T.ink}}
        .item i{flex:1;border-bottom:4px dotted rgba(27,27,29,.28);transform:translateY(-8px)}
        .item span{color:${T.acc}}
        .tot{display:flex;align-items:baseline;gap:12px;font-family:${MONO};font-size:44px;font-weight:500}
        .tot i{flex:1;border-bottom:5px dotted rgba(27,27,29,.35);transform:translateY(-10px)}
        .bye{text-align:center;font-family:${MONO};font-size:30px;letter-spacing:.2em;color:${T.sub};margin-top:22px}
        .zig{left:${G.L}px;width:${G.W}px;height:22px;background:linear-gradient(-45deg,transparent 16px,#fffdf8 0) 0 0/32px 22px repeat-x,linear-gradient(45deg,transparent 16px,#fffdf8 0) 0 0/32px 22px repeat-x}
        .e1{left:${G.L}px;width:${G.W}px;top:320px;text-align:center;font-size:52px;font-weight:700;color:${T.sub}}
        .e2{left:${G.L}px;width:${G.W}px;top:400px;text-align:center;font-size:100px;font-weight:800;font-stretch:84%;letter-spacing:-.02em}
        .row{left:${G.L}px;width:${G.W}px;height:112px;border-radius:32px;background:${T.surface};display:flex;align-items:center;gap:18px;padding:0 36px;font-size:50px;font-weight:800}
        .row *{position:relative!important}
        .row small{margin-left:auto;white-space:nowrap;font-size:38px;font-weight:600;color:${T.sub}}
      `);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 120, color: "#fff" }, { t: C.hook[1], size: 120, color: T.ink, delay: 0.5 }], { center: 760 });
      el.segs = segments(root, D.lines.length);
      el.clip = h("div", "clip", root);
      el.paper = h("div", "paper", el.clip);
      const inner = h("div", "in", el.paper);
      el.head = h("div", "blk", inner, `<div class="hd">${C.receiptNo}</div><div class="ttl">${C.receiptTitle}</div><div class="dash"></div>`);
      el.blocks = D.lines.map((l, i) => {
        const b = h("div", "blk", inner);
        const lab = h("div", "lab", b, `<span>${WHO(l)}</span>${l.who === "me" ? `<span class="say"><i class="dot"></i>${X.ui("sayNow")}</span>` : ""}`);
        const de = h("span", "de", b);
        const sp = words(de, l.de);
        const tr = h("span", "trl", b, l.tr);
        const item = h("div", "item", b, `<b>${l.keyDe}</b><i></i><span>${l.keyTr}</span>`);
        if (i < D.lines.length - 1) h("div", "dash", b);
        return { b, sp, tr, item, say: lab.querySelector(".say"), dot: lab.querySelector(".dot") };
      });
      el.tail = h("div", "blk", inner, `<div class="dash"></div><div class="tot"><b>${X.ui("total")}</b><i></i><span>${X.ui("totalCount", { n: D.lines.length })}</span></div><div class="bye">${C.thanks || X.ui("thanks")}</div>`);
      el.zig = h("div", "zig", el.clip);
      el.slot = h("div", "slot", root);
      el.panel = E.panel(root);
      el.e1 = h("div", "e1", root, C.saveLine);
      el.e2 = h("div", "e2", root, C.endTitle);
      el.rows = D.lines.map((l, i) => {
        const x = h("div", "row", root, `<b>${l.keyDe}</b><small>${l.keyTr}</small>`);
        x.style.top = `${560 + i * 128}px`;
        return x;
      });
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      // bölümlerin fiş içindeki alt kenarları (baskı ucu buralara kadar iner)
      // offsetTop .in'e göre (üst dolgu dahil), .in de fişin tepesinde
      el.headEnd = el.head.offsetTop + el.head.offsetHeight;
      el.blockEnd = el.blocks.map((b) => b.b.offsetTop + b.b.offsetHeight);
      el.tailEnd = el.paper.offsetHeight;
      el.paperH = el.paper.offsetHeight;
      el.hook.layout();
    },

    render(t) {
      const ho = HOOK - 0.35;
      el.hook.render(t, 0.05, ho);
      const li = L.findIndex((r, i) => t >= r.a && t < (L[i + 1]?.a ?? END));
      set(el.segs.el, { o: p(t, HOOK, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(li >= 0 ? li : t >= END ? L.length : 0, li >= 0 ? p(t, L[li].a, (L[li + 1]?.a ?? END) - L[li].a) : 0);

      // baskı ucu: başlık, sonra her blok, sonda TOPLAM; her adım 0,5 sn'de yazıcı hızıyla iner
      const stepTo = (from, to, at) => from + (to - from) * ease.outCubic(p(t, at, 0.5));
      let front = 20 + el.headEnd * ease.outCubic(p(t, HOOK, 0.55));
      let prev = el.headEnd;
      L.forEach((r, i) => {
        if (t >= r.a) front = 20 + stepTo(prev, el.blockEnd[i], r.a);
        prev = el.blockEnd[i];
      });
      const tTot = L[L.length - 1].b;
      if (t >= tTot) front = 20 + stepTo(prev, el.tailEnd, tTot);
      const shift = Math.max(0, front + TOP - 20 - FLOOR); // uç tabana gelince fiş yukarı kayar
      el.paper.style.top = `${20 - shift}px`;
      el.paper.style.clipPath = `inset(0 0 ${Math.max(0, el.paperH - (front - 20))}px 0)`;
      el.zig.style.top = `${front - shift}px`;
      const pOut = ease.inCubic(p(t, END - 0.1, 0.45));
      const pIn = p(t, HOOK - 0.1, 0.3);
      set(el.clip, { o: Math.min(pIn * 3, 1 - pOut), y: -pOut * 300 });
      set(el.slot, { o: Math.min(pIn * 3, 1 - pOut) });

      el.blocks.forEach((b, i) => {
        const r = L[i];
        karaoke(b.sp, t, r.v, r.d);
        const tk = p(t, r.tr, 0.4);
        b.tr.style.opacity = tk.toFixed(3);
        const kk = p(t, r.key, 0.35);
        b.item.style.opacity = kk.toFixed(3);
        if (b.say) {
          const on = t >= r.rep && t < r.rep + r.repD;
          b.say.style.opacity = (on ? 1 : t >= r.rep + r.repD ? 0.35 : 0).toFixed(2);
          b.dot.style.transform = `scale(${on ? 1 + Math.abs(Math.sin((t - r.rep) * 5)) * 0.5 : 1})`;
        }
      });

      const pk = p(t, END + 0.1, 0.6);
      set(el.panel, { o: ease.outCubic(pk * 2), y: (1 - ease.spring(pk)) * 700 });
      set(el.e1, { o: p(t, END + 0.4, 0.4) });
      const k2 = p(t, END + 0.45, 0.5);
      set(el.e2, { o: ease.outCubic(k2 * 2), y: (1 - ease.spring(k2)) * 50 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.6 + i * 0.12, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * 200 });
      });
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
