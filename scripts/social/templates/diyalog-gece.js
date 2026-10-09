/*
  Telefon araması şablonu: film altyazısı gibi karaoke (Gece). Örnek bölüm: diyalog-gece-001 (kalorifer, ev sahibi).
  Tutma mantığı: kanca bir dert + çalan telefon (izleyen aramanın içine giriyor) → konuşan tarafa göre renk
  değiştiren ses dalgası → altyazı kelime kelime yanıyor, Türkçesi sonra → senin cümlelerinde sesli tekrar →
  kırmızı düğmeyle arama biter → anahtar kelimelerin özeti + kapanış.

  İçerik (D): lines [{ who: "me"|"them", alt?, de, tr, keyDe, keyTr }] (H.line), copy:
  copy anahtarları
    zorunlu: title, hook (tam 2 satır: 1. beyaz, 2. turuncu), caption, outro { series, ask },
             callee (ekrandaki aranan adı, ör. "Ev sahibi"), calleeTag (konuşan etiketi, büyük harf, ör. "EV SAHİBİ"),
             endTitle (kapanış başlığı, ör. "3 cümlede hallettin.")
    isteğe bağlı: avatar ("home" | "person" | "clinic" | "work" | "shop", varsayılan "person")
  sabit yazılar (copy.ui ile ezilir): calling "Aranıyor…", ended "Arama bitti", endedTime "Arama bitti · {sure}"
    (sure: "00:18"), sayNow "Şimdi sen söyle", me "SEN", meAlt "SEN · YA DA"
*/
E.register(
  "diyalog-gece",
  {
    title: "Telefon araması",
    approach: "diyalog",
    theme: "gece",
    ui: { calling: "Aranıyor…", ended: "Arama bitti", endedTime: "Arama bitti · {sure}", sayNow: "Şimdi sen söyle", me: "SEN", meAlt: "SEN · YA DA" },
  },
  (X) => {
  const { h, set, p, ease, words, karaoke } = E;
  const D = X.data;
  const C = D.copy;
  for (const k of ["title", "hook", "caption", "outro", "callee", "calleeTag", "endTitle"]) if (C?.[k] == null) throw new Error(`diyalog-gece: copy.${k} eksik`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("diyalog-gece: copy.hook tam 2 satır olmalı");
  const T = X.theme;
  const OR = T.acc;
  const G = E.G;
  const CX = G.CX;
  const HOOK = 2.5;
  const CONNECT = HOOK + 1.3;
  const SVG = {
    home: "M12 3l9 8h-3v9h-5v-6h-2v6H6v-9H3z",
    person: "M12 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9zm0 2c-4.4 0-8 2.2-8 5v2h16v-2c0-2.8-3.6-5-8-5z",
    clinic: "M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7z",
    work: "M9 3h6a2 2 0 012 2v2h3a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V9a2 2 0 012-2h3V5a2 2 0 012-2zm0 4h6V5H9z",
    shop: "M4 7h16l-1.5 13h-13zM8 7V6a4 4 0 018 0v1h-2V6a2 2 0 00-4 0v1z",
    mic: "M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-3.1A7 7 0 0019 11z",
    spk: "M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 00-2.5-4v8a4.5 4.5 0 002.5-4zM14 3.2v2.1a7 7 0 010 13.4v2.1a9 9 0 000-17.6z",
    end: "M12 9c-1.6 0-3.2.3-4.6.7v3.1c0 .4-.2.7-.6.9-1 .5-1.9 1.1-2.7 1.8a1 1 0 01-1.4 0L.3 13.1a1 1 0 010-1.4C3.3 8.8 7.5 7 12 7s8.7 1.8 11.7 4.7a1 1 0 010 1.4l-2.4 2.4a1 1 0 01-1.4 0c-.8-.7-1.7-1.3-2.7-1.8-.4-.2-.6-.5-.6-.9V9.7C15.2 9.3 13.6 9 12 9z",
  };
  const icon = (k, c = "#fff") => `<svg viewBox="0 0 24 24"><path d="${SVG[k]}" fill="${c}"/></svg>`;
  let L = [];
  let END = 0;
  let DUR = 0;
  let el = {};

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.6, name: "pop", f: 560 }, { t: HOOK - 0.1, name: "ring" }, { t: CONNECT, name: "pop", f: 900, v: 0.6 }];
      let t = CONNECT + 0.5;
      L = D.lines.map((l) => {
        const r = { a: t, v: t + 0.3, d: dur(l.de) };
        r.tr = r.v + r.d + 0.1;
        r.key = r.tr + 0.4;
        voice.push({ t: r.v, text: l.de });
        sfx.push({ t: r.key, name: "pop", f: 880, v: 0.55 });
        if (l.who === "me") {
          r.rep = r.key + 0.6;
          r.repD = r.d + 1;
          sfx.push({ t: r.rep, name: "count", n: 76 });
          r.b = r.rep + r.repD + 0.2;
        } else r.b = r.key + 1.5;
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.5 + E.OUTRO_LEN;
      sfx.push({ t: END - 0.25, name: "pop", f: 300, v: 0.8 }, { t: END + 0.2, name: "whoosh", d: 0.45, down: true });
      D.lines.forEach((_, i) => sfx.push({ t: END + 0.75 + i * 0.14, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.5, name: "pop", f: 700 });
      const meAt = D.lines.findIndex((l) => l.who === "me");
      const themAt = D.lines.findIndex((l) => l.who === "them");
      return {
        duration: DUR,
        poster: 1.9,
        voice,
        sfx,
        music: { style: "lofi", bpm: 80, root: 52, mode: "min", gain: 0.4, seed: "diyalog-gece" },
        notes: [
          { t: 0, title: "Kanca: gerçek bir dert", why: "Almanya'da herkesin başına gelen bir an. Kısa iki satır ve telefon çalıyor: izleyen aramanın içine giriyor." },
          { t: CONNECT, title: "Arama ekranı", why: "Tanıdık bir arayüz, süre sayacı canlılık veriyor. Ses dalgası konuşana göre renk değiştiriyor: turuncu sen, beyaz karşı taraf." },
          { t: L[0].v, title: "Film altyazısı", why: "Cümle ekranın ortasında, kelime kelime yanıyor; Türkçe ses bittikten sonra. Anahtar kelime ayrı hap." },
          ...(meAt >= 0 ? [{ t: L[meAt].rep, title: "Sıra sende", why: "Senin cümlelerinde sesli tekrar arası; izleyen konuşmaya katılıyor." }] : []),
          ...(themAt >= 0 ? [{ t: L[themAt].a, title: "Karşı taraf", why: "Karşı tarafın cümlesi: duyunca tanıman için; gerçek hayattan bir cevap yorum yazdırır ('bende de aynısı')." }] : []),
          { t: END - 0.3, title: "Arama biter", why: "Kırmızı düğme basılıyor, ekran kapanıyor: net bir son, ardından anahtar kelimelerin özeti ve standart kapanış." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .glow{width:900px;height:900px;border-radius:50%;filter:blur(160px);background:${OR};opacity:.17}
        .call{inset:0}
        .av{left:${CX - 120}px;top:290px;width:240px;height:240px;border-radius:50%;background:#26262b;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px rgba(255,255,255,.08)}
        .av svg{position:relative!important;width:120px;height:120px}
        .rip{left:${CX - 120}px;top:290px;width:240px;height:240px;border-radius:50%;border:4px solid ${OR}}
        .nm{left:${G.L}px;width:${G.W}px;top:572px;text-align:center;font-size:66px;font-weight:800;letter-spacing:-.01em}
        .st{left:${G.L}px;width:${G.W}px;top:660px;text-align:center;font-size:40px;font-weight:600;color:${T.sub};font-variant-numeric:tabular-nums}
        .wave{left:${CX - 300}px;top:740px;width:600px;height:130px;display:flex;align-items:center;justify-content:space-between}
        .wave i{position:relative!important;width:12px;border-radius:6px;background:#fff}
        .who{left:${G.L}px;top:920px;height:64px;padding:0 28px;border-radius:32px;font-size:32px;font-weight:800;letter-spacing:.08em;display:flex;align-items:center}
        .sub{left:${G.L}px;width:${G.W}px;top:1008px}
        .sub *{position:relative!important}
        .de{display:block;font-size:64px;font-weight:700;line-height:1.16;letter-spacing:-.01em}
        .de .w{opacity:.3}.de .w.said{opacity:1}.de .w.now{color:${OR}}
        .trl{display:block;margin-top:16px;font-size:42px;font-weight:500;line-height:1.28;color:${T.sub}}
        .key{display:inline-flex!important;margin-top:24px;align-items:center;height:68px;padding:0 28px;border-radius:34px;background:rgba(251,143,42,.16);color:${OR};font-size:34px;font-weight:700;gap:10px}
        .key b{color:#fff}
        .rep{left:${G.L}px;width:${G.W}px;height:96px;border-radius:48px;background:rgba(255,255,255,.08);display:flex;align-items:center;gap:20px;padding:0 30px;overflow:hidden}
        .rep *{position:relative!important}
        .rep svg{width:54px;height:54px}
        .rep span{font-size:40px;font-weight:800}
        .rep .bar{position:absolute!important;left:0;bottom:0;height:8px;width:100%;background:${OR};transform-origin:0 50%}
        .ctl{left:${CX - 270}px;top:1395px;width:540px;display:flex;justify-content:space-between}
        .ctl div{position:relative!important;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center}
        .ctl div.end{background:#e5484d}
        .ctl svg{position:relative!important;width:58px;height:58px}
        .e1{left:${G.L}px;width:${G.W}px;top:330px;text-align:center;font-size:52px;font-weight:700;color:${T.sub};font-variant-numeric:tabular-nums}
        .e2{left:${G.L}px;width:${G.W}px;top:412px;text-align:center;font-size:104px;font-weight:800;font-stretch:84%;letter-spacing:-.02em}
        .row{left:${G.L}px;width:${G.W}px;height:116px;border-radius:32px;background:${T.surface};display:flex;align-items:center;gap:20px;padding:0 38px;font-size:52px;font-weight:800}
        .row *{position:relative!important}
        .row small{margin-left:auto;font-size:40px;font-weight:600;color:${T.sub}}
      `);
      el.g = h("div", "glow", root);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 118 }, { t: C.hook[1], size: 118, color: OR, delay: 0.55 }], { center: 760 });
      el.call = h("div", "call", root);
      el.rips = [h("div", "rip", el.call), h("div", "rip", el.call)];
      el.av = h("div", "av", el.call, icon(SVG[C.avatar] ? C.avatar : "person", OR));
      el.nm = h("div", "nm", el.call, C.callee);
      el.st = h("div", "st", el.call, X.ui("calling"));
      el.wave = h("div", "wave", el.call);
      el.bars = Array.from({ length: 30 }, () => h("i", null, el.wave));
      el.who = h("div", "who", el.call);
      el.subs = D.lines.map((l) => {
        const s = h("div", "sub", el.call);
        const de = h("span", "de", s);
        const sp = words(de, l.de);
        const tr = h("span", "trl", s, l.tr);
        const key = h("span", "key", s, `<b>${l.keyDe}</b> = ${l.keyTr}`);
        return { s, sp, tr, key };
      });
      el.rep = h("div", "rep", el.call, `${icon("mic", OR)}<span>${X.ui("sayNow")}</span><i class="bar"></i>`);
      el.repBar = el.rep.querySelector(".bar");
      el.ctl = h("div", "ctl", el.call, `<div>${icon("mic")}</div><div>${icon("spk")}</div><div class="end">${icon("end")}</div>`);
      el.endBtn = el.ctl.querySelector(".end");
      el.e1 = h("div", "e1", root, "");
      el.e2 = h("div", "e2", root, C.endTitle);
      el.rows = D.lines.map((l, i) => {
        const x = h("div", "row", root, `<b>${l.keyDe}</b><small>${l.keyTr}</small>`);
        x.style.top = `${600 + i * 140}px`;
        return x;
      });
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.subH = el.subs.map((s) => s.s.offsetHeight);
      el.hook.layout();
    },

    render(t) {
      set(el.g, { o: 0.16, x: -200 + Math.sin(t * 0.4) * 120, y: 1100 + Math.cos(t * 0.33) * 140 });
      const ho = HOOK - 0.3;
      el.hook.render(t, 0.05, ho);

      const ck = p(t, HOOK - 0.15, 0.6);
      const off = ease.inCubic(p(t, END, 0.4));
      set(el.call, { o: Math.min(ck * 2, 1 - off), y: (1 - ease.outExpo(ck)) * 120, s: 1 - off * 0.06 });
      // aranıyor: halkalar; bağlanınca durur
      el.rips.forEach((r, i) => {
        const ph = ((t - HOOK) * 0.9 + i * 0.5) % 1;
        set(r, { o: t < CONNECT && t > HOOK ? (1 - ph) * 0.7 : 0, s: 1 + ph * 0.7 });
      });
      set(el.av, { s: t < CONNECT ? 1 + Math.sin(t * 9) * 0.02 : 1 });
      if (t < CONNECT) el.st.textContent = X.ui("calling");
      else if (t < END - 0.25) {
        const s = Math.floor(t - CONNECT);
        el.st.textContent = `00:${String(s).padStart(2, "0")}`;
      } else el.st.textContent = X.ui("ended");

      const li = L.findIndex((r, i) => t >= r.a && t < (L[i + 1]?.a ?? END));
      const l = li >= 0 ? D.lines[li] : null;
      const r = li >= 0 ? L[li] : null;
      // ses dalgası: konuşma sürerken canlı, konuşana göre renk
      const talking = r && t >= r.v && t < r.v + r.d;
      el.bars.forEach((b, i) => {
        const amp = talking ? Math.abs(Math.sin(t * 13 + i * 1.7) * Math.sin(t * 7.3 + i * 0.6)) : 0;
        b.style.height = `${14 + amp * (60 + 50 * Math.sin(i * 0.37))}px`;
        b.style.background = talking ? (l.who === "me" ? OR : "#fff") : "rgba(255,255,255,.25)";
      });
      if (l) {
        el.who.textContent = l.who === "me" ? X.ui(l.alt ? "meAlt" : "me") : C.calleeTag;
        el.who.style.background = l.who === "me" ? OR : "#fff";
        el.who.style.color = "#141416";
      }
      const wk = r ? p(t, r.a, 0.35) : 0;
      set(el.who, { o: r ? Math.min(wk * 2, 1 - p(t, (L[li + 1]?.a ?? END) - 0.25, 0.25)) : 0, x: (1 - ease.outExpo(wk)) * -60 });
      el.subs.forEach((s, i) => {
        const rr = L[i];
        const nextA = L[i + 1]?.a ?? END;
        const shown = t >= rr.a - 0.05 && t < nextA + 0.05;
        s.s.style.display = shown ? "" : "none";
        if (!shown) return;
        const k = p(t, rr.a, 0.45);
        const out = ease.inCubic(p(t, nextA - 0.3, 0.3));
        set(s.s, { o: Math.min(ease.outCubic(k * 2), 1 - out), y: (1 - ease.spring(k)) * 60 - out * 40, blur: (1 - ease.outCubic(k)) * 10 + out * 8 });
        karaoke(s.sp, t, rr.v, rr.d);
        const tk = p(t, rr.tr, 0.45);
        set(s.tr, { o: tk, y: (1 - ease.outCubic(tk)) * 16 });
        const kk = p(t, rr.key, 0.45);
        const kOut = rr.rep ? p(t, rr.rep - 0.1, 0.25) : 0;
        set(s.key, { o: ease.outCubic(kk * 1.5) * (1 - kOut), s: 0.7 + ease.spring(kk) * 0.3 });
        if (rr.rep && t >= rr.rep - 0.1 && t < rr.rep + rr.repD + 0.25) {
          const rk = p(t, rr.rep, 0.4);
          const ro = p(t, rr.rep + rr.repD, 0.25);
          el.rep.style.top = `${1008 + el.subH[i] - 68 - 14}px`; // anahtar kelime hapının yerine, ortalı
          set(el.rep, { o: Math.min(rk * 2, 1 - ro), s: 0.9 + ease.spring(rk) * 0.1 });
          el.repBar.style.transform = `scaleX(${1 - p(t, rr.rep + 0.25, rr.repD - 0.25)})`;
        }
      });
      if (!L.some((rr) => rr.rep && t >= rr.rep - 0.1 && t < rr.rep + rr.repD + 0.25)) set(el.rep, { o: 0 });
      // kapatma düğmesi: sonda basılır
      const pr = p(t, END - 0.3, 0.3);
      set(el.endBtn, { s: 1 - Math.sin(Math.PI * pr) * 0.15 });
      set(el.ctl, { o: p(t, CONNECT - 0.2, 0.4) });

      {
        const s = Math.floor(END - 0.25 - CONNECT);
        el.e1.textContent = X.ui("endedTime", { sure: `00:${String(s).padStart(2, "0")}` });
        set(el.e1, { o: p(t, END + 0.3, 0.4) });
        const k = p(t, END + 0.35, 0.55);
        set(el.e2, { o: ease.outCubic(k * 2), y: (1 - ease.spring(k)) * 60 });
        el.rows.forEach((x, i) => {
          const kk = p(t, END + 0.75 + i * 0.14, 0.5);
          set(x, { o: ease.outCubic(kk * 1.5), x: (1 - ease.spring(kk)) * 200 });
        });
      }
      el.outro(t, END + 1.5);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
