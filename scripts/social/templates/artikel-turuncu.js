/*
  Kategori damgalı artikel tahmini + tuzak (Turuncu kutu: içerik açık panelde).
  Tutma mantığı: kanca bir iddia kuruyor (ilk üçü aynı artikel) → her turda kategori damgası iddiayı doğruluyor →
  izleyen 4.'nün de aynı olmasını bekliyor, tuzak kırıyor → kural kartı sebebi söylüyor → kapanışta özet ve yorum sorusu.

  Veri: items (tam 4; 4. kalem tuzak). Kelimenin Türkçesi baştan görünür.
  copy anahtarları (D.copy):
    title    zorunlu  galeri ve çıktı adı
    hook     zorunlu  tam 2 satır (1. beyaz, 2. koyu)
    stamps   zorunlu  tam 4 damga, turlara sırayla (ör. kategori adları; sonuncusu tuzak için soru olabilir)
    rule     zorunlu  tuzak kartı (HTML; <br> satır sonu, artikel renkleri için class="der|die|das")
    caption  zorunlu  paylaşım metni + etiketler
    outro    zorunlu  { series, ask }
    endTitle isteğe bağlı  özet başlığı (yoksa ui.endTitle)
  ui (sabit yazılar, copy.ui ile ezilir):
    tahminEt  "TAHMİN ET · {n}/{total}"   1–3. turların etiketi
    tuzak     "TUZAK SORU"                4. turun etiketi
    endTitle  "Kaçını bildin?"            özet başlığı (copy.endTitle yoksa)
    der / die / das                       şık kareleri
*/
E.register("artikel-turuncu", { title: "Artikel tahmini · kategori damgası", approach: "artikel", theme: "turuncu", ui: { tahminEt: "TAHMİN ET · {n}/{total}", tuzak: "TUZAK SORU", endTitle: "Kaçını bildin?", der: "der", die: "die", das: "das" } }, (X) => {
  const { h, set, p, ease, words, wordsIn, segments } = E;
  const D = X.data;
  const C = D.copy || {};
  for (const k of ["title", "hook", "stamps", "rule", "caption", "outro"]) if (!C[k]) throw new Error(`copy.${k} gerekli`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("copy.hook tam 2 satır olmalı");
  if (!Array.isArray(C.stamps) || C.stamps.length !== 4) throw new Error("copy.stamps tam 4 damga olmalı");
  if (!C.outro.series || !C.outro.ask) throw new Error("copy.outro.series ve copy.outro.ask gerekli");
  if (!Array.isArray(D.items) || D.items.length !== 4) throw new Error("items tam 4 kalem olmalı");
  const T = X.theme;
  const COL = E.ART;
  const STAMP = C.stamps;
  const HOOK = 2.6;
  const R = [4.6, 4.6, 4.6, 7.6];
  const starts = R.reduce((a, r, i) => (a.push(i ? a[i - 1] + R[i - 1] : HOOK), a), []);
  const END = starts[3] + R[3];
  const DUR = END + 1.3 + E.OUTRO_LEN;
  const COUNT = 0.5;
  const REVEAL = 3.5;
  const G = E.G;
  const CX = G.CX; // ızgaranın orta ekseni (sağ sütundan uzak)
  let el = {};
  let rounds = [];

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.55, name: "pop", f: 600 }, { t: HOOK - 0.45, name: "whoosh", d: 0.5 }];
      starts.forEach((s, i) => {
        if (i === 0) sfx.push({ t: s, name: "impact", v: 0.4 });
        if (i === 3) sfx.push({ t: s + 0.1, name: "impact", v: 0.6 });
        [0, 1, 2].forEach((k) => sfx.push({ t: s + COUNT + k, name: "tick", hi: k === 2 }));
        sfx.push({ t: s + REVEAL, name: "ding", k: i === 3 ? 0.84 : 1 });
        sfx.push({ t: s + REVEAL + 0.55, name: "impact", v: 0.35 });
        voice.push({ t: s + REVEAL + 0.12, text: `${D.items[i].artikel} ${D.items[i].de}` });
        if (i === 3) sfx.push({ t: s + REVEAL + 1.7, name: "pop", f: 520 });
        sfx.push({ t: s + R[i] - 0.38, name: "whoosh", d: 0.4, v: 0.7 });
      });
      D.items.forEach((_, i) => sfx.push({ t: END + 0.45 + i * 0.13, name: "count", n: 77 + i * 2 }));
      sfx.push({ t: END + 1.3, name: "pop", f: 700 });
      voice.forEach((v) => dur(v.text));
      return {
        duration: DUR,
        poster: 1.9,
        voice,
        sfx,
        music: { style: "pluck", bpm: 112, root: 60, mode: "lift", gain: 0.45, seed: "artikel-turuncu" },
        notes: [
          { t: 0, title: "Kanca: iddia", why: "Kanca cevabın yarısını veriyor (aynı artikel) ama hangisi olduğunu söylemiyor; turuncu zeminde beyaz, kısa ve sert." },
          { t: starts[0], title: "Panel: içerik kutuda", why: "Turuncu yalnız çerçeve. Kelime, Türkçesi ve üç kare şık açık panelin içinde; geri sayım sağ üstte." },
          { t: starts[0] + REVEAL + 0.5, title: "Kategori damgası", why: "Cevapla birlikte kategori damgası iniyor: tek kelime değil, bütün bir grup öğreniliyor." },
          { t: starts[3], title: "Tuzak", why: "İzleyen dördüncünün de aynı artikel olmasını bekliyor. Başkası çıkınca şaşırıyor; kural kartı sebebi söylüyor." },
          { t: END, title: "Özet + kapanış", why: "Dört kelime renkleriyle panelde kalıyor; standart kapanış ve kutulu imza paneli terk etmiyor." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .rd{inset:0}
        .lab{left:${G.L}px;top:316px;font-size:38px;font-weight:800;letter-spacing:.1em;color:${T.acc}}
        .lab.trap{color:${COL.die}}
        .cd{left:${G.R - 104}px;top:290px;width:104px;height:104px;border-radius:50%;background:${T.ink};color:#fff;font-size:62px;font-weight:800;display:flex;align-items:center;justify-content:center}
        .wd{left:${G.L}px;width:${G.W}px;top:500px;text-align:center;font-size:170px;font-weight:800;font-stretch:80%;letter-spacing:-.025em;line-height:1;white-space:nowrap}
        .tr{left:${G.L}px;width:${G.W}px;top:696px;text-align:center;font-size:58px;font-weight:600;color:${T.sub}}
        .tile{top:830px;width:236px;height:236px;border-radius:44px;background:${T.surface};display:flex;align-items:center;justify-content:center;font-size:84px;font-weight:800;color:${T.ink}}
        .stamp{left:${CX - 230}px;top:1130px;width:460px;height:120px;border-radius:24px;border:8px solid ${T.ink};color:${T.ink};font-size:62px;font-weight:800;letter-spacing:.06em;display:flex;align-items:center;justify-content:center;white-space:nowrap}
        .rule{left:${G.L}px;width:${G.W}px;top:1110px;padding:40px 48px;border-radius:32px;background:${T.ink};color:#fff;font-size:48px;font-weight:700;line-height:1.22}
        .rule *{position:relative!important}
        .rule i{font-style:normal}.rule .der{color:${COL.der}}.rule .die{color:${COL.die}}.rule .das{color:${COL.das}}
        .e1{left:${G.L}px;width:${G.W}px;top:330px;text-align:center;font-size:96px;font-weight:800;font-stretch:84%;letter-spacing:-.02em}
        .row{left:${G.L}px;width:${G.W}px;height:116px;border-radius:32px;background:${T.surface};display:flex;align-items:center;gap:24px;padding:0 40px;font-size:62px;font-weight:800}
        .row *{position:relative!important}
        .row i{font-style:normal}
        .row small{margin-left:auto;white-space:nowrap;font-size:40px;font-weight:600;color:${T.sub}}
      `);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 116, color: "#fff" }, { t: C.hook[1], size: 116, color: T.ink, delay: 0.55 }], { center: 720 });
      el.panel = E.panel(root);
      el.segs = segments(root, 4);
      rounds = D.items.map((it, i) => {
        const r = { it, root: h("div", "rd", root) };
        r.lab = h("div", `lab${i === 3 ? " trap" : ""}`, r.root, i === 3 ? X.ui("tuzak") : X.ui("tahminEt", { n: i + 1, total: 4 }));
        r.cd = h("div", "cd", r.root, "3");
        r.wd = h("div", "wd", r.root, it.de);
        r.tr = h("div", "tr", r.root, it.tr);
        r.tiles = ["der", "die", "das"].map((a, k) => {
          const x = h("div", "tile", r.root, X.ui(a));
          x.style.left = `${CX - 118 + (k - 1) * 262}px`;
          return { a, x };
        });
        r.stamp = h("div", "stamp", r.root, STAMP[i]);
        if (i === 3) r.rule = h("div", "rule", r.root, C.rule);
        return r;
      });
      el.e1 = h("div", "e1 flow", root);
      el.ew = words(el.e1, C.endTitle || X.ui("endTitle"));
      el.rows = D.items.map((it, i) => {
        const x = h("div", "row", root, `<i style="color:${COL[it.artikel]}">${it.artikel}</i><span>${it.de}</span><small>${it.tr}</small>`);
        x.style.top = `${500 + i * 140}px`;
        return x;
      });
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.hook.layout();
    },

    render(t) {
      const ho = HOOK - 0.45;
      el.hook.render(t, 0.05, ho);
      // panel alttan gelir, sonuna kadar kalır
      const pk = p(t, HOOK - 0.35, 0.65);
      set(el.panel, { o: ease.outCubic(pk * 2), y: (1 - ease.spring(pk)) * 900 });
      const cur = rounds.findIndex((_, i) => t >= starts[i] && t < starts[i] + R[i]);
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.1, 0.3)) });
      el.segs.set(cur >= 0 ? cur : t >= END ? 4 : 0, cur >= 0 ? p(t, starts[cur], R[cur]) : 0);

      rounds.forEach((r, i) => {
        const lt = t - starts[i];
        const vis = lt > -0.1 && lt < R[i] + 0.1;
        r.root.style.display = vis ? "" : "none";
        if (!vis) return;
        const inK = p(lt, 0, 0.5);
        const outK = ease.inCubic(p(lt, R[i] - 0.38, 0.38));
        set(r.root, { o: Math.min(ease.outCubic(inK * 2), 1 - outK), y: (1 - ease.outExpo(inK)) * 120 - outK * 120 });
        set(r.lab, { o: p(lt, 0.05, 0.3) });
        const n = Math.max(1, 3 - Math.floor(Math.max(0, lt - COUNT)));
        r.cd.textContent = String(n);
        const tk = p(lt - COUNT - Math.floor(Math.max(0, lt - COUNT)), 0, 0.3);
        set(r.cd, { o: p(lt, COUNT - 0.2, 0.2) * (1 - p(lt, REVEAL - 0.1, 0.15)), s: lt < COUNT ? 1 : 1.22 - ease.outBack(tk) * 0.22 });
        r.cd.style.background = n === 1 ? COL.die : T.ink;
        const wk = p(lt, 0.1, 0.6);
        const rv = p(lt, REVEAL, 0.5);
        set(r.wd, { o: ease.outCubic(wk), y: (1 - ease.spring(wk)) * 90, s: 1 + Math.sin(Math.PI * rv) * 0.06 });
        r.wd.style.color = rv > 0 ? COL[r.it.artikel] : T.ink;
        set(r.tr, { o: p(lt, 0.4, 0.5) });
        const ruleK = r.rule ? p(lt, REVEAL + 1.7, 0.6) : 0;
        r.tiles.forEach((x, k) => {
          const ok = x.a === r.it.artikel;
          const ik = p(lt, 0.25 + k * 0.08, 0.5);
          // doğru kare kart gibi döner (scaleX), arkası artikel rengi
          const fl = ok ? p(lt, REVEAL, 0.45) : 0;
          const sx = Math.abs(Math.cos(Math.PI * fl));
          set(x.x, { o: Math.min(ik * 2, ok ? 1 : 1 - p(lt, REVEAL, 0.4) * 0.65), y: (1 - ease.spring(ik)) * 140, sx: Math.max(0.02, sx) * (ok ? 1 + Math.sin(Math.PI * fl) * 0.08 : 1), sy: ok ? 1 + Math.sin(Math.PI * fl) * 0.08 : 1 });
          const back = fl > 0.5;
          x.x.style.background = back ? COL[x.a] : T.surface;
          x.x.style.color = back ? "#fff" : T.ink;
        });
        const sk = p(lt, REVEAL + 0.5, 0.35);
        set(r.stamp, { o: Math.min(sk * 3, 1 - ruleK), s: 1.6 - ease.outCubic(sk) * 0.6, r: -6 });
        if (r.rule) set(r.rule, { o: ruleK, y: (1 - ease.spring(ruleK)) * 100 });
      });

      wordsIn(el.ew, t, END + 0.05);
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.45 + i * 0.13, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * -200 });
      });
      el.outro(t, END + 1.3);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
