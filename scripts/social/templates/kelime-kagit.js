/*
  Kelime destesi, küçük sözlük (Kâğıt): her kelime bir sözlük maddesi, sayfa çevirerek.
  Tutma mantığı: kanca kullanışlı bir şey vaat ediyor (kaydedilecek sözlük) → madde başı + telaffuz →
  dilbilgisi satırı (tür, seviye, çoğul: sözlük gösterimi, konuya özgü ayrıntı) → "1. …" boşluğu düşünme
  süresi, anlam daktiloyla yazılıyor → örnek cümle sesle → sayfa çevrilir → özet + kapanış.

  İçerik: D.items 3–6 kelime (deck).
  copy anahtarları (hepsi zorunlu):
    title          galeri/kayıt adı
    hook           tam 3 satır: [küçük gri giriş (76 px), büyük satır (128 px), büyük turuncu satır (128 px)]
    caption        paylaşım metni + etiketler
    outro          { series, ask }
    runningHead    sayfanın üst başlığı, büyük harf (ör. "RESMÎ İŞLER")
    summaryKicker  kapanışın küçük üst satırı (ör. "Kaydet, dairede lazım olacak")
    summaryTitle   kapanış başlığı (ör. "5 kelimelik mini sözlük")
  ui anahtarları (sabit yazılar, copy.ui ile ezilir; sözlük satırı words.json typ/formen'den bunlarla kurulur):
    typeNoun       Nomen kelime türü ("isim")
    typeVerb       Verb kelime türü ("fiil"); başka türler verideki adıyla yazılır
    pluralSuffix   çoğul eki, {ek} = formen'deki ek ("çoğul {ek}" → "çoğul -en")
    pluralOnly     yalnız çoğul kullanılan isim ("yalnız çoğul")
    pluralNone     çoğulu olmayan isim ("çoğulu yok")
*/
E.register("kelime-kagit", { title: "Kelime destesi · küçük sözlük", approach: "kelime", theme: "kagit", ui: { typeNoun: "isim", typeVerb: "fiil", pluralSuffix: "çoğul {ek}", pluralOnly: "yalnız çoğul", pluralNone: "çoğulu yok" } }, (X) => {
  const { h, set, p, ease, words, karaoke, segments } = E;
  const D = X.data;
  const C = D.copy;
  {
    const need = ["title", "hook", "caption", "outro", "runningHead", "summaryKicker", "summaryTitle"];
    if (!C) throw new Error("kelime-kagit: copy yok");
    for (const k of need) if (C[k] == null) throw new Error(`kelime-kagit: copy.${k} eksik`);
    if (!Array.isArray(C.hook) || C.hook.length !== 3) throw new Error("kelime-kagit: copy.hook tam 3 satır olmalı");
    if (!C.outro.series || !C.outro.ask) throw new Error("kelime-kagit: copy.outro.series ve copy.outro.ask gerekli");
    if (!(D.items.length >= 3 && D.items.length <= 6)) throw new Error(`kelime-kagit: 3–6 kelime desteklenir (${D.items.length})`);
  }
  const N = D.items.length;
  // kapanış listesi: 5'e kadar 540'tan 120 arayla; 6'da yukarı başlar, aralık ve satır boyu daralır
  const ROW_TOP = N <= 5 ? 540 : 500;
  const ROW_STEP = N <= 5 ? 120 : 110;
  const ROW_H = Math.min(104, ROW_STEP - 12);
  const T = X.theme;
  const OR = T.acc;
  const G = E.G;
  const MONO = '"DM Mono", ui-monospace, Menlo, monospace';
  const HOOK = 2.8;
  const THINK = 1.3;
  let S = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  const lab = (w) => (w.artikel ? `${w.artikel} ${w.de}` : w.de);
  const TYP = { Nomen: X.ui("typeNoun"), Verb: X.ui("typeVerb") };
  /** words.json `formen` → sözlük satırı (yalnız verideki bilgi). */
  const plural = (f) => {
    if (!f) return "";
    if (f === "(Pl.)") return X.ui("pluralOnly");
    if (f === "(Sg.)") return X.ui("pluralNone");
    return X.ui("pluralSuffix", { ek: f.replace(/^die /, "") });
  };

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.6 }, { t: 0.5, name: "pop", f: 560 }, { t: 1.0, name: "pop", f: 700 }, { t: HOOK - 0.35, name: "flip" }];
      let t = HOOK;
      S = D.items.map((w, i) => {
        const r = { a: t, wv: t + 0.45, wd: dur(lab(w)) };
        r.think = r.wv + r.wd + 0.1;
        r.rev = r.think + THINK;
        r.type = 0.04 * w.tr.length + 0.15;
        r.sv = r.rev + r.type + 0.35;
        r.sd = dur(w.beispiel);
        r.b = r.sv + r.sd + 0.75;
        if (i) sfx.push({ t: r.a - 0.1, name: "flip" }, { t: r.a - 0.05, name: "whoosh", d: 0.35, v: 0.45 });
        voice.push({ t: r.wv, text: lab(w) }, { t: r.sv, text: w.beispiel });
        sfx.push({ t: r.rev, name: "print", d: r.type }, { t: r.rev + r.type, name: "ding", v: 0.45, k: 1 + i * 0.05 });
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      sfx.push({ t: END - 0.1, name: "flip" });
      D.items.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.12, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.3,
        voice,
        sfx,
        music: { style: "ambient", bpm: 76, root: 53, mode: "maj", gain: 0.5, seed: "kelime-kagit" },
        title: C.title,
        notes: [
          { t: 0, title: "Kanca: işe yarar bir şey", why: "Kanca kaydedilecek bir şey vaat ediyor (küçük sözlük). Kâğıt zemin ve sayfa, evrak ve sözlük dünyasına uyuyor." },
          { t: S[0].a, title: "Sözlük maddesi", why: "Madde başı, telaffuz, altında tür · seviye · çoğul satırı (verideki sözlük gösterimiyle). Konuya özgü ayrıntı güven veriyor." },
          { t: S[0].think, title: "1. …", why: "Anlam satırı boş bekliyor: izleyen tahmin ediyor. Sonra anlam daktiloyla yazılıyor, sesle örnek cümle geliyor." },
          { t: S[1].a - 0.1, title: "Sayfa çevirme", why: "Her kelime yeni sayfa: kağıt sesi ve hafif dönüşle ritim tazeleniyor; üstte kaç sayfa kaldığı görünüyor." },
          { t: END, title: "Özet + kapanış", why: "Maddeler liste olarak kalıyor (kaydetme). Standart kapanış, kutulu imza." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .pg{left:${G.L}px;width:${G.W}px;top:320px;height:1000px;border-radius:32px;background:#fff;box-shadow:0 30px 70px -36px rgba(40,30,20,.45);transform-origin:50% 100%}
        .pg *{position:absolute}
        .run{left:56px;right:56px;top:48px;display:flex;justify-content:space-between;font-family:${MONO};font-size:28px;letter-spacing:.14em;color:${T.sub}}
        .run *{position:relative!important}
        .rl{left:56px;right:56px;top:100px;height:3px;background:${T.ink}}
        .ini{right:56px;top:120px;font-size:200px;font-weight:800;line-height:1;color:transparent;-webkit-text-stroke:3px rgba(27,27,29,.16)}
        .art{left:56px;top:196px;font-size:58px;font-weight:700;color:${OR}}
        .wd{left:56px;top:276px;font-size:124px;font-weight:800;font-stretch:80%;letter-spacing:-.02em;line-height:1;white-space:nowrap;transform-origin:0 0}
        .gr{left:56px;top:424px;font-family:${MONO};font-size:32px;color:${T.sub};letter-spacing:.02em}
        .gr b{position:relative;color:${T.ink};font-weight:500}
        .hr{left:56px;right:56px;top:496px;height:0;border-top:3px dotted rgba(27,27,29,.25)}
        .sn{left:56px;top:544px;font-size:84px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;white-space:nowrap}
        .sn *{position:relative!important}.sn em{font-style:normal;color:${T.sub};margin-right:20px}
        .car{position:relative;display:inline-block;width:6px;height:72px;background:${OR};vertical-align:-8px;margin-left:6px}
        .tb{left:56px;top:668px;width:360px;height:10px;border-radius:5px;background:rgba(27,27,29,.08);overflow:hidden}
        .tb i{left:0;top:0;bottom:0;width:100%;background:${T.ink};transform-origin:0 50%}
        .ex{left:56px;right:56px;top:728px}
        .ex *{position:relative!important}
        .exd{display:block;font-size:52px;font-weight:600;line-height:1.2;padding-left:40px}
        .exd::before{content:"▸";position:absolute;left:0;color:${OR}}
        .exd .w{opacity:.28}.exd .w.said{opacity:1}.exd .w.now{color:${OR}}
        .ext{display:block;margin-top:16px;padding-left:40px;font-size:40px;font-weight:500;line-height:1.3;color:${T.sub}}
        .e1{left:${G.L}px;width:${G.W}px;top:310px;text-align:center;font-size:52px;font-weight:700;color:${T.sub}}
        .e2{left:${G.L}px;width:${G.W}px;top:385px;text-align:center;font-size:96px;font-weight:800;font-stretch:84%;letter-spacing:-.02em}
        .row{left:${G.L}px;width:${G.W}px;height:${ROW_H}px;border-radius:32px;background:#fff;display:flex;align-items:center;gap:.35em;padding:0 34px;font-size:46px;font-weight:800;white-space:nowrap;box-shadow:0 10px 24px -18px rgba(40,30,20,.5)}
        .row *{position:relative!important}
        .row i{font-style:normal;color:${OR};font-size:.78em;font-weight:700}
        .row small{margin-left:auto;padding-left:.4em;white-space:nowrap;font-size:.78em;font-weight:600;color:${T.sub}}
      `);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 76, weight: 700, color: T.sub }, { t: C.hook[1], size: 128, delay: 0.4 }, { t: C.hook[2], size: 128, color: OR, delay: 0.85 }], { center: 720 });
      el.segs = segments(root, D.items.length);
      el.pages = D.items.map((w, i) => {
        const pg = h("div", "pg", root);
        h("div", "run", pg, `<span>${C.runningHead}</span><span>${i + 1} / ${D.items.length}</span>`);
        h("div", "rl", pg);
        h("div", "ini", pg, w.de[0]);
        const art = w.artikel ? h("div", "art", pg, w.artikel) : null;
        const wd = h("div", "wd", pg, w.de);
        h("div", "gr", pg, `<b>${TYP[w.typ] || w.typ}</b> · ${w.niveau}${plural(w.formen) ? ` · ${plural(w.formen)}` : ""}`);
        h("div", "hr", pg);
        const sn = h("div", "sn", pg, `<em>1.</em><span class="txt"></span><i class="car"></i>`);
        const tb = h("div", "tb", pg, "<i></i>").firstChild;
        const ex = h("div", "ex", pg);
        const exd = h("span", "exd", ex);
        const sp = words(exd, w.beispiel);
        const ext = h("span", "ext", ex, w.beispielTr);
        return { w, pg, art, wd, txt: sn.querySelector(".txt"), car: sn.querySelector(".car"), tb, ex, sp, ext, r: S[i] };
      });
      el.e1 = h("div", "e1", root, C.summaryKicker);
      el.e2 = h("div", "e2", root, C.summaryTitle);
      el.rows = D.items.map((w, i) => {
        const x = h("div", "row", root, `${w.artikel ? `<i>${w.artikel}</i>` : ""}<span>${w.de}</span><small>${w.tr}</small>`);
        x.style.top = `${ROW_TOP + i * ROW_STEP}px`;
        return x;
      });
      el.outro = E.outro(root, { series: C.outro.series, ask: C.outro.ask });
      el.fade = h("div", "fade", root);
      el.hook.layout();
      // özet satırı yazı alanına sığsın
      el.rows.forEach((x) => {
        const base = parseFloat(getComputedStyle(x).fontSize);
        const pr = parseFloat(getComputedStyle(x).paddingRight); // taşmada sağ dolgu scrollWidth'e girmiyor
        for (let k = 0; k < 4 && x.scrollWidth + pr > x.clientWidth + 1; k++) x.style.fontSize = `${Math.floor((parseFloat(x.style.fontSize || base) * x.clientWidth) / (x.scrollWidth + pr)) - 1}px`;
      });
      el.pages.forEach((g) => (g.fit = Math.min(1, (G.W - 112 - 150) / g.wd.offsetWidth))); // baş harf süsüne değmesin
    },

    render(t) {
      const ho = HOOK - 0.35;
      el.hook.render(t, 0.05, ho);
      const ci = S.findIndex((r) => t >= r.a && t < r.b);
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ci >= 0 ? ci : t >= END ? S.length : 0, ci >= 0 ? p(t, S[ci].a, S[ci].b - S[ci].a) : 0);

      el.pages.forEach((g, i) => {
        const r = g.r;
        const shown = t >= r.a - 0.45 && t <= r.b + 0.4;
        g.pg.style.display = shown ? "" : "none";
        if (!shown) return;
        // gelen sayfa sağdan döne döne gelir, giden sola kayıp söner (bir sonraki üstüne biner)
        const k = p(t, r.a - 0.4, 0.6);
        const out = ease.inCubic(p(t, r.b - 0.1, 0.5));
        set(g.pg, { o: Math.min(ease.outCubic(k * 2), 1 - out), x: (1 - ease.outExpo(k)) * 900 - out * 260, r: (1 - ease.outExpo(k)) * 8 - out * 3, s: 1 - out * 0.05 });
        g.pg.style.zIndex = String(10 + i);
        const wk = p(t, r.a + 0.1, 0.55);
        if (g.art) set(g.art, { o: ease.outCubic(wk), y: (1 - ease.spring(wk)) * 40 });
        set(g.wd, { o: ease.outCubic(wk), y: (1 - ease.spring(wk)) * 50, s: g.fit });
        // anlam: düşünme sırasında boş + yanıp sönen imleç, sonra daktilo
        const n = Math.floor(E.clamp((t - r.rev) / 0.04, 0, g.w.tr.length));
        g.txt.textContent = g.w.tr.slice(0, n);
        const typing = t >= r.rev && n < g.w.tr.length;
        g.car.style.opacity = t < r.think - 0.2 ? "0" : typing || Math.floor(t * 2.5) % 2 === 0 ? (t > r.rev + r.type + 0.6 ? "0" : "1") : "0";
        const thinkOn = p(t, r.think - 0.15, 0.25) * (1 - p(t, r.rev - 0.05, 0.2));
        set(g.tb.parentNode, { o: thinkOn });
        g.tb.style.transform = `scaleX(${1 - p(t, r.think, THINK)})`;
        set(g.ex, { o: p(t, r.sv - 0.3, 0.35) });
        karaoke(g.sp, t, r.sv, r.sd);
        const xk = p(t, r.sv + r.sd + 0.05, 0.4);
        set(g.ext, { o: xk, y: (1 - ease.outCubic(xk)) * 14 });
      });

      set(el.e1, { o: p(t, END + 0.3, 0.4) });
      const k2 = p(t, END + 0.2, 0.55);
      set(el.e2, { o: ease.outCubic(k2 * 2), y: (1 - ease.spring(k2)) * 50 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.5 + i * 0.12, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), y: (1 - ease.spring(k)) * 80 });
      });
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
