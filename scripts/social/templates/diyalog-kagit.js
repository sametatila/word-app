/*
  Sahneli diyalog şablonu: birkaç sahnelik küçük bir hikâye, sohbet balonlarıyla (Kâğıt).
  Örnek bölüm: diyalog-kagit-001 (doktor randevusu: telefonda, muayenehanede, iş yerine).
  Tutma mantığı: izleyenin gerçek bir derdine dokunan kanca → sahneler sohbet balonu olarak akıyor,
  cümle konuşuldukça kelime kelime yanıyor (göz metne kilitleniyor) → "senin" cümlelerinde sesli
  tekrar arası (izleyen katılıyor) → her cümleden bir anahtar kelime → kapanışta kaydetme çağrısı + sıradaki
  konuyu yorumda seçtiren soru.

  İçerik (D): lines [{ scene, who: "me"|"them", de, tr, keyDe, keyTr }] (H.line; scene = copy.scenes anahtarı), copy:
  copy anahtarları
    zorunlu: title, hook (tam 3 satır: 1. küçük, 2. büyük, 3. büyük turuncu), caption, outro { series, ask },
             scenes { <sahne>: { label, icon } } (icon: "phone" | "clinic" | "work" | "home" | "shop"; her satırın
             sahnesi burada olmalı; kancadaki haplar sahnelerin satır sırasıyla),
             them (karşı tarafın balon etiketi, ör. "Sekreter"),
             endTitle (kapanış başlığı, ör. "Kaydet, lazım olacak."),
             options (kapanışta 1–3 seçenek hapı: sıradaki konu)
    isteğe bağlı: me (senin balon etiketin; yoksa ui.me); scenes.<sahne>.me / .them (o sahnede etiket, ör. "Sen, iş yerine")
  sabit yazılar (copy.ui ile ezilir): me "Sen" (balon etiketi, copy.me / scenes.<sahne>.me yoksa), sayNow "Şimdi sen söyle"
*/
E.register("diyalog-kagit", { title: "Sahneli diyalog", approach: "diyalog", theme: "kagit", ui: { me: "Sen", sayNow: "Şimdi sen söyle" } }, (X) => {
  const { h, set, p, ease, words, wordsIn, karaoke, segments } = E;
  const D = X.data;
  const C = D.copy;
  for (const k of ["title", "hook", "caption", "outro", "scenes", "them", "endTitle", "options"]) if (C?.[k] == null) throw new Error(`diyalog-kagit: copy.${k} eksik`);
  if (!Array.isArray(C.hook) || C.hook.length !== 3) throw new Error("diyalog-kagit: copy.hook tam 3 satır olmalı");
  if (!Array.isArray(C.options) || C.options.length < 1 || C.options.length > 3) throw new Error("diyalog-kagit: copy.options 1–3 öğe olmalı");
  for (const l of D.lines) if (!C.scenes[l.scene]) throw new Error(`diyalog-kagit: copy.scenes.${l.scene} eksik`);
  const INK = "#1b1b1d";
  const OR = "#f87612";
  const G = E.G;
  const SVG = {
    phone: "M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.6 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.6 3.6a1 1 0 01-.25 1z",
    clinic: "M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z",
    work: "M9 3h6a2 2 0 012 2v2h3a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h3V5a2 2 0 012-2zm0 4h6V5H9z",
    home: "M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z",
    shop: "M4 7h16l-1.5 13h-13zM8 7V6a4 4 0 018 0v1h-2V6a2 2 0 00-4 0v1z",
    mic: "M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-3.1A7 7 0 0019 11z",
    save: "M6 3h12v18l-6-4-6 4z",
  };
  const icon = (k, c = "currentColor") => `<svg viewBox="0 0 24 24"><path d="${SVG[k]}" fill="${c}"/></svg>`;
  const sceneIcon = (k) => (SVG[C.scenes[k].icon] ? C.scenes[k].icon : "phone");
  const WHO = (l) => (l.who === "me" ? C.scenes[l.scene].me || C.me || X.ui("me") : C.scenes[l.scene].them || C.them);
  const SCENES = [...new Set(D.lines.map((l) => l.scene))]; // satır sırasıyla

  const HOOK = 2.6;
  let T = []; // her satırın zaman planı
  let DUR = 0;
  let END = 0;
  let el = {};
  let bubbles = [];
  let chapters = [];

  return {
    plan(dur) {
      const voice = [];
      const sfx = [
        { t: 0.05, name: "impact", v: 0.7 },
        { t: 0.5, name: "pop", f: 520 },
        { t: 0.95, name: "pop", f: 640 },
        { t: 1.45, name: "pop", f: 600 },
        { t: 1.6, name: "pop", f: 700 },
        { t: 1.75, name: "pop", f: 800 },
        { t: HOOK - 0.32, name: "whoosh", d: 0.45 },
      ];
      let t = HOOK;
      let scene = null;
      T = D.lines.map((l, i) => {
        const d = dur(l.de);
        const r = { i, chapter: l.scene !== scene };
        if (r.chapter) {
          if (scene) sfx.push({ t: t, name: "whoosh", d: 0.45, down: true });
          r.chap = t;
          sfx.push({ t: t + 0.12, name: "pop", f: 480 });
          t += 0.75;
        }
        scene = l.scene;
        r.a = t; // balon girer
        r.v = t + 0.42; // ses
        r.d = d;
        r.tr = r.v + d + 0.12;
        r.key = r.tr + 0.45;
        sfx.push({ t: r.a, name: "pop", f: l.who === "me" ? 760 : 560 });
        voice.push({ t: r.v, text: l.de });
        sfx.push({ t: r.key, name: "pop", f: 900, v: 0.6 });
        if (l.who === "me") {
          r.rep = r.key + 0.65; // tekrar arası
          r.repD = d + 1.0;
          sfx.push({ t: r.rep, name: "count", n: 76 });
          r.b = r.rep + r.repD + 0.25;
        } else r.b = r.key + 1.35;
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.6 + E.OUTRO_LEN;
      sfx.push({ t: END, name: "whoosh", d: 0.45, down: true });
      sfx.push({ t: END + 0.75, name: "impact", v: 0.4 });
      sfx.push({ t: END + 1.0, name: "pop", f: 600 }, { t: END + 1.15, name: "pop", f: 760 }, { t: END + 1.6, name: "pop", f: 700 });
      const meAt = D.lines.findIndex((l) => l.who === "me");
      const themAt = D.lines.findIndex((l) => l.who === "them");
      const chap2 = T.filter((r) => r.chapter)[1];
      return {
        duration: DUR,
        poster: 1.95,
        bg: "#f1f0ec",
        voice,
        sfx,
        music: { style: "jazz", bpm: 112, root: 53, mode: "soul", gain: 0.45, seed: "diyalog-kagit" },
        notes: [
          { t: 0, title: "Kanca: gerçek bir dert", why: "Almanya'daki izleyicinin bu hafta yaşadığı bir durum. 'Ders' değil 'işini hallet' vaadi; üç sahne baştan görünüyor, yol haritası belli." },
          { t: T[0].a, title: "İlk sahne", why: "Sohbet balonu tanıdık bir arayüz. Cümle söylenirken kelime kelime yanıyor, göz metne kilitleniyor; Türkçe ses bittikten sonra geliyor (önce dinle, sonra anla)." },
          ...(meAt >= 0 ? [{ t: T[meAt].rep, title: "Sıra sende", why: "Senin söyleyeceğin cümlelerde sesli tekrar arası: izleyen pasif kalmıyor, mikrofon halkası süreyi gösteriyor." }] : []),
          ...(themAt >= 0 ? [{ t: T[themAt].a, title: "Karşı taraf", why: "Duyacağın cümle: anahtar kelime kartla ayrılıyor, öğrenilen şey tek kelimeye iniyor." }] : []),
          ...(chap2 ? [{ t: chap2.chap, title: "Sahne değişimi", why: "Mekân değişince ekran temizleniyor ve bölüm etiketi kayıyor: ritim tazeleniyor, düşüş noktası kırılıyor." }] : []),
          { t: END, title: "Kaydet + sıradaki konu", why: "Kaydetme çağrısı kaydetme sinyali toplar. Sıradaki konuyu yorumda seçtirmek seriyi izleyiciye kurduruyor." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        #scene{color:${INK}}
        .blob{width:820px;height:820px;border-radius:50%;filter:blur(150px)}
        .sc{top:990px;height:76px;padding:0 24px 0 18px;border-radius:38px;background:#fff;display:flex;align-items:center;gap:10px;font-size:32px;font-weight:700;box-shadow:0 10px 30px -8px rgba(40,30,20,.25);white-space:nowrap}
        .sc *,.chap *,.bub *,.mic *,.end *{position:relative!important}
        .sc svg{width:36px;height:36px}.chap svg{width:52px;height:52px}
        .chap{left:${G.L}px;top:262px;height:88px;padding:0 32px 0 24px;border-radius:44px;background:${INK};color:#fff;display:flex;align-items:center;gap:16px;font-size:44px;font-weight:700;white-space:nowrap}
        .chap svg path{fill:${OR}}
        .bub{width:760px;padding:32px 40px 36px;border-radius:48px;box-shadow:0 18px 40px -14px rgba(40,30,20,.3)}
        .bub.them{left:${G.L}px;background:#fff;border-bottom-left-radius:12px}
        .bub.me{left:${G.R - 760}px;background:${OR};color:#fff;border-bottom-right-radius:12px}
        .who{display:block;font-size:32px;font-weight:700;opacity:.6;margin-bottom:10px}
        .de{display:block;font-size:60px;font-weight:700;line-height:1.16;letter-spacing:-.01em}
        .de .w{opacity:.32;transition:none}
        .de .w.said{opacity:1}
        .de .w.now{opacity:1}
        .bub.them .de .w.now{color:${OR}}
        .bub.me .de .w.now{color:${INK}}
        .trl{display:block;font-size:40px;font-weight:500;line-height:1.25;margin-top:14px;opacity:.75}
        .key{display:inline-flex!important;margin-top:24px;align-items:center;gap:12px;height:68px;padding:0 28px;border-radius:34px;font-size:34px;font-weight:700}
        .bub.them .key{background:#fdeee0;color:#b44909}
        .bub.me .key{background:rgba(255,255,255,.95);color:#b44909}
        .key b{color:${INK}}
        .mic{left:${G.L}px;width:${G.W}px;top:0;display:flex;flex-direction:column;align-items:center;gap:22px}
        .mic .disc{width:150px;height:150px;border-radius:50%;background:${INK};display:flex;align-items:center;justify-content:center}
        .mic .disc svg{width:76px;height:76px}
        .mic .disc svg path{fill:#fff}
        .mic .rg{position:absolute!important;left:50%;top:75px;width:150px;height:150px;margin:-75px 0 0 -75px;border-radius:50%;border:5px solid ${OR}}
        .mic span{font-size:46px;font-weight:800}
        .mic .bar{width:420px;height:12px;border-radius:6px;background:rgba(27,27,29,.12);overflow:hidden}
        .mic .bar i{position:absolute!important;left:0;top:0;bottom:0;width:100%;background:${OR};transform-origin:0 50%}
        .segs b{background:rgba(27,27,29,.14)!important}.segs i{background:${INK}!important}
        .end{left:${G.L}px;width:${G.W}px;text-align:center}
        .e1{top:420px;font-size:116px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1;white-space:nowrap}
        .bm{left:${G.CX - 90}px;top:610px;width:180px;height:180px;border-radius:50%;background:${OR};display:flex;align-items:center;justify-content:center}
        .bm svg{width:96px;height:96px}
        .opt{top:870px;height:110px;padding:0 44px;border-radius:55px;background:#fff;border:4px solid ${INK};font-size:52px;font-weight:800;display:flex;align-items:center;white-space:nowrap}
        .fade{inset:0;background:#f1f0ec}
      `);
      el.b1 = h("div", "blob", root);
      el.b2 = h("div", "blob", root);
      el.b1.style.background = "#ffd2a8";
      el.b2.style.background = "#ffe6c9";
      el.segs = segments(root, D.lines.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 76, weight: 600, color: "#b44909" }, { t: C.hook[1], size: 124, delay: 0.35 }, { t: C.hook[2], size: 124, color: OR, delay: 0.85 }], { center: 700 });
      el.sc = SCENES.map((k) => h("div", "sc", root, `${icon(sceneIcon(k), OR)}<span>${C.scenes[k].label}</span>`));
      // bölüm etiketleri
      chapters = T.filter((r) => r.chapter).map((r) => ({ t: r.chap, scene: D.lines[r.i].scene, el: h("div", "chap", root, `${icon(sceneIcon(D.lines[r.i].scene))}<span>${C.scenes[D.lines[r.i].scene].label}</span>`) }));
      chapters.forEach((c, i) => (c.end = chapters[i + 1]?.t ?? END));
      // balonlar
      bubbles = D.lines.map((l, i) => {
        const b = h("div", `bub ${l.who}`, root);
        h("span", "who", b, WHO(l));
        const de = h("span", "de", b);
        const sp = words(de, l.de);
        const tr = h("span", "trl", b, l.tr);
        const key = h("span", "key", b, `<b>${l.keyDe}</b> = ${l.keyTr}`);
        return { l, b, sp, tr, key, r: T[i] };
      });
      el.mic = h("div", "mic", root, `<div class="rg"></div><div class="rg"></div><div class="disc">${icon("mic")}</div><span>${X.ui("sayNow")}</span><div class="bar"><i></i></div>`);
      el.rg = [...el.mic.querySelectorAll(".rg")];
      el.bar = el.mic.querySelector(".bar i");
      // kapanış
      el.e1 = h("div", "end e1 flow", root);
      el.e1w = words(el.e1, C.endTitle);
      el.bm = h("div", "bm", root, icon("save", "#fff"));
      el.opts = C.options.map((s) => h("div", "opt", root, s));
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      // ölçüler
      el.scW = el.sc.map((x) => x.offsetWidth);
      bubbles.forEach((x) => (x.hgt = x.b.offsetHeight));
      el.optW = el.opts.map((x) => x.offsetWidth);
      el.hook.layout();
      { const w = el.e1.scrollWidth; if (w > G.W) el.e1.style.fontSize = `${Math.floor((116 * G.W) / w)}px`; }
    },

    render(t) {
      set(el.b1, { x: -300 + Math.sin(t * 0.4) * 140, y: -260 + Math.cos(t * 0.3) * 100 });
      set(el.b2, { x: 520 + Math.cos(t * 0.35) * 120, y: 1300 + Math.sin(t * 0.45) * 120 });

      // kanca
      const ho = HOOK - 0.35;
      el.hook.render(t, 0.05, ho);
      const gap = 12;
      const tot = el.scW.reduce((a, b) => a + b, 0) + gap * (el.scW.length - 1);
      let x = G.CX - tot / 2;
      el.sc.forEach((s, i) => {
        s.style.left = `${x}px`;
        x += el.scW[i] + gap;
        const k = p(t, 1.45 + i * 0.15, 0.55);
        const o = ease.inCubic(p(t, ho, 0.3));
        set(s, { o: Math.min(ease.outCubic(k * 2), 1 - o), y: (1 - ease.spring(k)) * 120 - o * 60, s: 0.8 + ease.spring(k) * 0.2 });
      });

      // ilerleme
      const li = T.findIndex((r, i) => t >= (r.chap ?? r.a) && t < (T[i + 1] ? T[i + 1].chap ?? T[i + 1].a : END));
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(li >= 0 ? li : t >= END ? T.length : 0, li >= 0 ? p(t, T[li].a, T[li].b - T[li].a) : 0);

      // bölüm etiketi
      chapters.forEach((c) => {
        const k = p(t, c.t, 0.55);
        const o = ease.inCubic(p(t, c.end - 0.3, 0.3));
        set(c.el, { o: Math.min(k * 2, 1 - o), x: (1 - ease.outExpo(k)) * -300 - o * 200 });
      });

      // balonlar: bölüm içinde yukarıdan aşağı akar (sohbet gibi); alt sınırı aşınca hepsi birlikte yukarı kayar,
      // bölüm etiketine yaklaşan en eski balon söner; bölüm değişince sahne temizlenir
      const TOPY = 384;
      const BOTTOM = 1230; // altında mikrofon istemi (260 px) 1530'a kadar sığar
      const lay = {};
      chapters.forEach((c) => {
        const list = bubbles.filter((x) => x.r.a >= c.t && x.r.a < c.end);
        let y = TOPY;
        const ys = list.map((x) => {
          const at = y;
          y += (x.hgt + 32) * ease.outExpo(p(t, x.r.a, 0.6));
          return at;
        });
        const shift = Math.max(0, y - 32 - BOTTOM);
        list.forEach((x, j) => (lay[bubbles.indexOf(x)] = { y: ys[j] - shift, newer: list[j + 1] ? p(t, list[j + 1].r.a, 0.6) : 0 }));
        c.bottom = y - 32 - shift;
      });
      bubbles.forEach((x, i) => {
        const r = x.r;
        const chapEnd = chapters.find((c) => c.t <= r.a && c.end > r.a)?.end ?? END;
        const shown = t >= r.a - 0.05 && t <= chapEnd + 0.05;
        x.b.style.display = shown ? "" : "none"; // display: çocukların visibility'si üst gizlemeyi delmesin
        if (!shown) return;
        const k = p(t, r.a, 0.6);
        const exit = ease.inCubic(p(t, chapEnd - 0.3, 0.3));
        const older = lay[i].newer;
        const y = lay[i].y + (1 - ease.spring(k)) * 100 - exit * 220;
        const room = E.clamp((y - 290) / 70); // bölüm hapının (262–350) altına girmeden söner
        set(x.b, { o: Math.min(ease.outCubic(k * 1.8), 1 - older * 0.45) * (1 - exit) * room, y, s: 0.92 + ease.spring(k) * 0.08, blur: exit * 10 });
        x.b.style.transformOrigin = x.l.who === "me" ? "100% 0" : "0 0";
        karaoke(x.sp, t, r.v, r.d);
        if (t < r.v) x.sp.forEach((s) => s.classList.remove("said", "now"));
        if (t > r.v + r.d + 0.1) x.sp.forEach((s) => (s.classList.add("said"), s.classList.remove("now")));
        const tk = p(t, r.tr, 0.45);
        set(x.tr, { o: ease.outCubic(tk) * 0.78, y: (1 - ease.outCubic(tk)) * 20 });
        const kk = p(t, r.key, 0.5);
        set(x.key, { o: ease.outCubic(kk * 1.5), s: 0.7 + ease.spring(kk) * 0.3 });
      });

      // sesli tekrar
      const rep = T.find((r) => r.rep && t >= r.rep - 0.1 && t < r.rep + r.repD + 0.3);
      if (rep) {
        const k = p(t, rep.rep, 0.45);
        const o = ease.inCubic(p(t, rep.rep + rep.repD, 0.3));
        const ch = chapters.find((c) => c.t <= rep.rep && c.end > rep.rep);
        el.mic.style.top = `${(ch?.bottom ?? 1190) + 40}px`; // son balonun hemen altında
        set(el.mic, { o: Math.min(k * 2, 1 - o), y: (1 - ease.spring(k)) * 80 });
        el.rg.forEach((g, i) => {
          const ph = ((t - rep.rep) * 0.9 + i * 0.5) % 1;
          set(g, { o: (1 - ph) * 0.8, s: 1 + ph * 0.9 });
        });
        el.bar.style.transform = `scaleX(${1 - p(t, rep.rep + 0.3, rep.repD - 0.3)})`;
      } else set(el.mic, { o: 0 });

      // kapanış
      wordsIn(el.e1w, t, END + 0.25, { stagger: 0.1 });
      {
        const k = p(t, END + 0.75, 0.6);
        set(el.bm, { o: ease.outCubic(k * 2), s: 0.4 + ease.spring(k) * 0.6, r: (1 - ease.spring(k)) * -20, y: Math.sin(Math.max(0, t - END - 1.4) * 4) * 8 });
        const tot2 = el.optW.reduce((a, b) => a + b, 0) + 30 * (el.optW.length - 1);
        let ox = G.CX - tot2 / 2;
        el.opts.forEach((o, i) => {
          o.style.left = `${ox}px`;
          ox += el.optW[i] + 30;
          const kk = p(t, END + 1.0 + i * 0.15, 0.5);
          set(o, { o: ease.outCubic(kk * 2), s: 0.6 + ease.spring(kk) * 0.4 });
        });
        el.outro(t, END + 1.6);
      }
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
