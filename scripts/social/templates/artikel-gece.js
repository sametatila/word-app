/*
  Artikel tahmini, simgeli tabak (Gece): 4 tur, her tur 3 sn'lik geri sayım, cevap sesle; 4. tur tuzak + kural kartı.
  Tutma mantığı: kanca bir bilmece kuruyor → her tur geri sayım izleyeni cevap vermeye zorluyor → üstte kaç tur
  kaldığı görünüyor → son tur tuzak, kural kartı öğretiyor → kapanışta özet liste + yorum sorusu → döngü.
  Yerleşim E.G ızgarasında: her şey x 96–930 içinde, ortalananlar 513 ekseninde.

  Veri: items (tam 4; simgesi olanlar `icon`: spoon | fork | knife; kancada simgeli ilk 3 kalem düşer, simgesiz
  kalemde tabakta "?" görünür).
  copy anahtarları (D.copy):
    title    zorunlu  galeri ve çıktı adı
    hook     zorunlu  tam 2 satır; 2. satır vurgu renginde
    rule     zorunlu  son turdaki kural kartı (HTML; <b> vurgu, <br> satır sonu)
    caption  zorunlu  paylaşım metni + etiketler
    outro    zorunlu  { series, ask }
    pill     isteğe bağlı  kancadaki hap (yoksa ui.pill)
    endTitle isteğe bağlı  özet başlığı (yoksa ui.endTitle)
  ui (sabit yazılar, copy.ui ile ezilir):
    pill      "3 saniyen var"   kancadaki hap (copy.pill yoksa)
    tuzak     "TUZAK SORU"      4. turun etiketi
    endTitle  "İşte cevaplar"   özet başlığı (copy.endTitle yoksa)
    der / die / das             şık çipleri
*/
E.register("artikel-gece", { title: "Artikel tahmini · simgeli tabak", approach: "artikel", theme: "gece", ui: { pill: "3 saniyen var", tuzak: "TUZAK SORU", endTitle: "İşte cevaplar", der: "der", die: "die", das: "das" } }, (X) => {
  const { h, set, p, lerp, ease, words, wordsIn, segments } = E;
  const D = X.data;
  const C = D.copy || {};
  for (const k of ["title", "hook", "rule", "caption", "outro"]) if (!C[k]) throw new Error(`copy.${k} gerekli`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("copy.hook tam 2 satır olmalı");
  if (!C.outro.series || !C.outro.ask) throw new Error("copy.outro.series ve copy.outro.ask gerekli");
  if (!Array.isArray(D.items) || D.items.length !== 4) throw new Error("items tam 4 kalem olmalı");
  const T = X.theme;
  const G = E.G;
  const COL = E.ART;
  const ICON = {
    spoon: `<svg viewBox="0 0 100 180"><ellipse cx="50" cy="34" rx="24" ry="32"/><rect x="44" y="60" width="12" height="114" rx="6"/></svg>`,
    fork: `<svg viewBox="0 0 100 180"><rect x="26" y="6" width="9" height="50" rx="4.5"/><rect x="39" y="6" width="9" height="50" rx="4.5"/><rect x="52" y="6" width="9" height="50" rx="4.5"/><rect x="65" y="6" width="9" height="50" rx="4.5"/><path d="M26 48h48v8c0 20-12 28-19 30h-10c-7-2-19-10-19-30z"/><rect x="44" y="80" width="12" height="94" rx="6"/></svg>`,
    knife: `<svg viewBox="0 0 100 180"><path d="M43 6c26 10 28 52 26 92H43z"/><rect x="41" y="98" width="17" height="78" rx="8"/></svg>`,
  };
  const HOOK = 2.45;
  const R = [5.0, 5.0, 5.0, 6.9]; // son tur uzun: kural kartı var
  const starts = R.reduce((a, r, i) => (a.push(i ? a[i - 1] + R[i - 1] : HOOK), a), []);
  const END = starts[3] + R[3];
  const DUR = END + 1.3 + E.OUTRO_LEN;
  const COUNT = 0.6;
  const REVEAL = 3.6;
  const PLATE = 500; // tabak çapı
  const GAP = 32; // artikel ile kelime arası
  let el = {};
  let rounds = [];

  return {
    plan(dur) {
      const voice = [];
      const sfx = [
        { t: 0.05, name: "impact" },
        { t: 0.5, name: "pop", f: 520 },
        { t: 0.95, name: "pop", f: 600 },
        { t: 1.1, name: "pop", f: 700 },
        { t: 1.25, name: "pop", f: 800 },
        { t: 1.6, name: "pop", f: 900, v: 0.8 },
        { t: HOOK - 0.3, name: "whoosh", d: 0.45 },
      ];
      starts.forEach((s, i) => {
        if (i === 3) sfx.push({ t: s + 0.15, name: "impact", v: 0.6 });
        [0, 1, 2].forEach((k) => sfx.push({ t: s + COUNT + k, name: "tick", hi: k === 2 }));
        sfx.push({ t: s + COUNT + 2.05, name: "riser", d: 0.95 });
        sfx.push({ t: s + REVEAL, name: "ding" });
        voice.push({ t: s + REVEAL + 0.12, text: `${D.items[i].artikel} ${D.items[i].de}` });
        if (i === 3) sfx.push({ t: s + REVEAL + 1.5, name: "pop", f: 500 });
        sfx.push({ t: s + R[i] - 0.38, name: "whoosh", d: 0.4, v: 0.8 });
      });
      D.items.forEach((_, i) => sfx.push({ t: END + 0.6 + i * 0.14, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.3, name: "pop", f: 700 });
      voice.forEach((v) => dur(v.text));
      return {
        duration: DUR,
        poster: 1.95,
        voice,
        sfx,
        music: { style: "pulse", bpm: 100, root: 57, mode: "min", gain: 0.42, seed: "artikel-gece" },
        notes: [
          { t: 0, title: "Kanca: bilmece", why: "İlk karede soru var, logo yok. Kanca merak boşluğu açıyor; simgeli eşyalar hemen düşüyor." },
          { t: 1.6, title: "Kural: 3 saniye", why: "İzleyene görev veriyor. Görevi olan izleyici kaydırmıyor." },
          { t: starts[0], title: "Tur 1–3: der · die · das", why: "Geri sayım + tik sesi gerilim kuruyor, cevapla birlikte çan ve gerçek telaffuz. Üstteki çubuk kaç tur kaldığını gösteriyor." },
          { t: starts[3], title: "Tuzak soru", why: "Ritim kırılıyor (darbe sesi, kırmızı etiket). İzleyen beklemediği artikelle yanılıyor ve kural kartıyla bir şey öğrenip çıkıyor." },
          { t: END, title: "Özet + kapanış", why: "Dört cevap renkli liste olarak kalıyor (ekran görüntüsü, kaydetme). Altında standart kapanış: seri sözü, yorum sorusu, kutulu imza." },
          { t: DUR - 0.4, title: "Döngü", why: "Son kare zemine kararıyor, ilk kare aynı zeminden başlıyor: video ikinci kez dönüyor, izlenme süresi uzuyor." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .glow{width:900px;height:900px;border-radius:50%;filter:blur(150px)}
        .icons{left:0;width:1080px;top:830px;height:300px}
        .icons .ic{top:0;width:170px;height:300px}
        svg{width:100%;height:100%;fill:#fff;display:block}
        .pill{left:${G.CX - 240}px;top:1210px;width:480px;height:104px;border-radius:52px;background:${T.pill};color:${T.pillInk};font-weight:800;font-size:54px;font-stretch:88%;display:flex;align-items:center;justify-content:center}
        .rd{inset:0}
        .tag{left:0;top:280px;height:72px;padding:0 32px;border-radius:36px;font-weight:800;font-size:36px;letter-spacing:.08em;display:flex;align-items:center;white-space:nowrap;color:#fff}
        .plate{left:${G.CX - PLATE / 2}px;top:384px;width:${PLATE}px;height:${PLATE}px;border-radius:50%;background:radial-gradient(circle at 50% 35%,rgba(255,255,255,.10),rgba(255,255,255,.02) 70%);box-shadow:inset 0 0 0 2px rgba(255,255,255,.08)}
        .plate .ic{left:${PLATE / 2 - 105}px;top:${PLATE / 2 - 185}px;width:210px;height:370px}
        .plate .q{left:${PLATE / 2 - 100}px;top:${PLATE / 2 - 150}px;width:200px;height:300px;display:flex;align-items:center;justify-content:center;font-size:280px;font-weight:800;line-height:1;color:rgba(255,255,255,.9)}
        .ring{left:-28px;top:-28px;width:${PLATE + 56}px;height:${PLATE + 56}px}
        .ring circle{fill:none;stroke-width:14;stroke-linecap:round}
        .badge{left:${PLATE - 96}px;top:-16px;width:120px;height:120px;border-radius:50%;background:#fff;color:#141416;font-weight:800;font-size:68px;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(0,0,0,.4)}
        .art,.wd{top:960px;font-size:176px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1;white-space:nowrap}
        .tr{left:${G.L}px;width:${G.W}px;top:1170px;text-align:center;font-size:60px;font-weight:600;color:${T.sub}}
        .chip{top:1300px;width:240px;height:116px;border-radius:58px;display:flex;align-items:center;justify-content:center;font-size:64px;font-weight:800;border:5px solid rgba(255,255,255,.28);background:rgba(255,255,255,.06)}
        .rule{left:${G.L}px;width:${G.W}px;top:1280px;padding:36px 48px;border-radius:32px;background:#fff;color:#141416;font-size:48px;font-weight:700;line-height:1.25;text-align:center}
        .rule *{position:relative}
        .rule b{color:#1f9d5c;font-weight:800}
        .end1{left:${G.L}px;width:${G.W}px;top:330px;text-align:center;font-size:120px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1}
        .recap{left:${G.L}px;width:${G.W}px;height:116px;border-radius:32px;background:${T.surface};display:flex;align-items:center;gap:24px;padding:0 40px;font-size:62px;font-weight:800}
        .recap *{position:relative}
        .recap i{font-style:normal}
        .recap small{margin-left:auto;font-size:42px;font-weight:600;color:${T.sub}}
      `);
      el.g1 = h("div", "glow", root);
      el.g2 = h("div", "glow", root);
      el.segs = segments(root, 4);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 124 }, { t: C.hook[1], size: 124, color: T.acc, delay: 0.5 }], { center: 610 });
      el.icons = h("div", "icons", root);
      el.hicons = D.items.filter((it) => it.icon).slice(0, 3).map((it) => it.icon).map((k, i, all) => {
        const x = h("div", "ic", el.icons, ICON[k]);
        x.style.left = `${G.CX - 85 + (i - (all.length - 1) / 2) * 250}px`;
        return x;
      });
      el.pill = h("div", "pill", root, C.pill || X.ui("pill"));
      rounds = D.items.map((it, i) => {
        const r = { it, root: h("div", "rd", root) };
        r.tag = h("div", "tag", r.root, i === 3 ? X.ui("tuzak") : `${i + 1} / 4`);
        r.tag.style.background = i === 3 ? COL.die : "rgba(255,255,255,.1)";
        r.plate = h("div", "plate", r.root);
        r.ic = it.icon ? h("div", "ic", r.plate, ICON[it.icon]) : h("div", "q", r.plate, "?");
        r.ring = h("div", "ring", r.plate, `<svg viewBox="0 0 ${PLATE + 56} ${PLATE + 56}"><circle cx="${PLATE / 2 + 28}" cy="${PLATE / 2 + 28}" r="${PLATE / 2 + 18}" stroke="rgba(255,255,255,.1)"/><circle class="fg" cx="${PLATE / 2 + 28}" cy="${PLATE / 2 + 28}" r="${PLATE / 2 + 18}"/></svg>`);
        r.fg = r.ring.querySelector(".fg");
        r.badge = h("div", "badge", r.plate, "3");
        r.art = h("div", "art", r.root, it.artikel);
        r.wd = h("div", "wd", r.root, it.de);
        r.tr = h("div", "tr", r.root, it.tr);
        r.chip = ["der", "die", "das"].map((a, k) => {
          const c = h("div", "chip", r.root, X.ui(a));
          c.style.left = `${G.CX - 120 + (k - 1) * 264}px`;
          return c;
        });
        if (i === 3) r.rule = h("div", "rule", r.root, C.rule);
        return r;
      });
      el.end1 = h("div", "end1 flow", root);
      el.ew = words(el.end1, C.endTitle || X.ui("endTitle"));
      el.recap = D.items.map((it, i) => {
        const x = h("div", "recap", root, `<i style="color:${COL[it.artikel]}">${it.artikel}</i><span>${it.de}</span><small>${it.tr}</small>`);
        x.style.top = `${500 + i * 136}px`;
        return x;
      });
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.hook.layout();
      // artikel + kelime satırı yazı alanına (834 px) sığar, 513 ekseninde ortalanır
      rounds.forEach((r) => {
        const k = Math.min(1, G.W / (r.art.offsetWidth + GAP + r.wd.offsetWidth));
        if (k < 1) r.art.style.fontSize = r.wd.style.fontSize = `${Math.floor(176 * k)}px`;
        r.aw = r.art.offsetWidth;
        r.ww = r.wd.offsetWidth;
        r.tw = r.tag.offsetWidth;
      });
    },

    render(t) {
      const cur = rounds.findIndex((_, i) => t >= starts[i] && t < starts[i] + R[i]);
      const revealed = cur >= 0 && t >= starts[cur] + REVEAL;
      set(el.g1, { x: -300 + Math.sin(t * 0.5) * 120, y: -250 + Math.cos(t * 0.4) * 90, o: 0.45 });
      set(el.g2, { x: 400 + Math.cos(t * 0.45) * 120, y: 1250 + Math.sin(t * 0.35) * 110, o: revealed ? 0.55 : 0.3 });
      el.g1.style.background = T.pill;
      el.g2.style.background = revealed ? COL[rounds[cur].it.artikel] : T.pill;

      const out = HOOK - 0.32;
      el.hook.render(t, 0.05, out);
      el.hicons.forEach((x, i) => {
        const k = p(t, 0.95 + i * 0.15, 0.6);
        const o = 1 - p(t, out, 0.25);
        set(x, { o: Math.min(ease.outCubic(k * 2), o), y: (1 - ease.spring(k)) * -260, r: (1 - ease.spring(k)) * (i - 1) * 25 + Math.sin(t * 2 + i) * 3, s: 1 - ease.inCubic(p(t, out, 0.25)) * 0.3 });
      });
      {
        const k = p(t, 1.6, 0.5);
        set(el.pill, { o: Math.min(k * 3, 1 - p(t, out, 0.2)), s: 0.6 + ease.spring(k) * 0.4, y: (1 - ease.outCubic(k)) * 40 });
      }
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.1, 0.3)) });
      el.segs.set(cur >= 0 ? cur : t >= END ? 4 : 0, cur >= 0 ? p(t, starts[cur], R[cur]) : 0);

      rounds.forEach((r, i) => {
        const lt = t - starts[i];
        const vis = lt > -0.1 && lt < R[i] + 0.1;
        r.root.style.display = vis ? "" : "none";
        if (!vis) return;
        const inK = p(lt, 0, 0.55);
        const outK = ease.inCubic(p(lt, R[i] - 0.38, 0.38));
        set(r.root, { o: 1 - outK, y: (1 - ease.outExpo(inK)) * 220 - outK * 160, blur: (1 - ease.outCubic(inK)) * 18 + outK * 16 });
        const tg = p(lt, 0.05, 0.5);
        set(r.tag, { o: tg, s: 0.7 + ease.spring(tg) * 0.3, x: G.CX - r.tw / 2 });
        const ck = p(lt, COUNT, 3);
        const C = 2 * Math.PI * (PLATE / 2 + 18);
        r.fg.style.strokeDasharray = `${C}`;
        r.fg.style.strokeDashoffset = `${C * ck}`;
        r.fg.style.stroke = ck > 0.66 ? COL.die : ck > 0.33 ? T.acc : "#ffffff";
        const rv = p(lt, REVEAL, 0.6);
        set(r.ring, { o: 1 - p(lt, REVEAL - 0.05, 0.2), r: -90, s: 1 + ease.outCubic(p(lt, REVEAL - 0.05, 0.3)) * 0.12 });
        const n = Math.max(1, 3 - Math.floor(Math.max(0, lt - COUNT)));
        r.badge.textContent = String(n);
        const tickK = p(lt - COUNT - Math.floor(Math.max(0, lt - COUNT)), 0, 0.3);
        set(r.badge, { o: p(lt, COUNT - 0.2, 0.2) * (1 - p(lt, REVEAL - 0.1, 0.15)), s: lt < COUNT ? 1 : 1.25 - ease.outBack(tickK) * 0.25 });
        r.badge.style.background = n === 1 ? COL.die : "#fff";
        r.badge.style.color = n === 1 ? "#fff" : "#141416";
        const bob = Math.sin(lt * 3.2) * 6;
        set(r.ic, { y: bob - Math.sin(Math.PI * p(lt, REVEAL, 0.5)) * 40, s: 1 + Math.sin(Math.PI * p(lt, REVEAL, 0.5)) * 0.08, r: Math.sin(lt * 2) * 3 });
        r.ic.style.color = rv > 0 ? COL[r.it.artikel] : "#fff";
        r.ic.querySelectorAll("svg").forEach((s) => (s.style.fill = rv > 0 ? COL[r.it.artikel] : "#fff"));
        // kelime önce tek başına ortada; cevapta artikel solda belirir, kelime sağa kayar
        const x0 = G.CX - (r.aw + GAP + r.ww) / 2;
        const mv = ease.outExpo(rv);
        r.wd.style.left = `${lerp(G.CX - r.ww / 2, x0 + r.aw + GAP, mv)}px`;
        r.art.style.left = `${x0}px`;
        r.art.style.color = COL[r.it.artikel];
        const wk = p(lt, 0.15, 0.6);
        set(r.wd, { o: ease.outCubic(wk), y: (1 - ease.spring(wk)) * 80, blur: (1 - ease.outCubic(wk)) * 12 });
        set(r.art, { o: ease.outCubic(rv * 1.5), y: (1 - ease.spring(rv)) * -120, s: 0.6 + ease.spring(rv) * 0.4 });
        const trk = p(lt, REVEAL + 0.3, 0.5);
        set(r.tr, { o: trk, y: (1 - ease.outCubic(trk)) * 30 });
        const ruleK = r.rule ? p(lt, REVEAL + 1.45, 0.6) : 0;
        r.chip.forEach((c, k) => {
          const a = ["der", "die", "das"][k];
          const ok = a === r.it.artikel;
          const ck2 = p(lt, 0.3 + k * 0.08, 0.5);
          const hit = p(lt, REVEAL, 0.5);
          const shake = !ok && hit > 0 && hit < 1 ? Math.sin(hit * 40) * (1 - hit) * 14 : 0;
          set(c, { o: Math.min(ck2 * 2, ok ? 1 : 1 - hit * 0.72) * (1 - ruleK), y: (1 - ease.spring(ck2)) * 90 + ruleK * 40, x: shake, s: ok ? 1 + ease.spring(hit) * 0.12 : 1 - hit * 0.06 });
          c.style.background = ok && hit > 0 ? COL[a] : "rgba(255,255,255,.06)";
          c.style.borderColor = ok && hit > 0 ? COL[a] : "rgba(255,255,255,.28)";
        });
        if (r.rule) set(r.rule, { o: ruleK, y: (1 - ease.spring(ruleK)) * 80, s: 0.92 + ease.spring(ruleK) * 0.08 });
      });

      wordsIn(el.ew, t, END + 0.1, { stagger: 0.09 });
      el.recap.forEach((x, i) => {
        const k = p(t, END + 0.6 + i * 0.14, 0.55);
        set(x, { o: ease.outCubic(k), x: (1 - ease.spring(k)) * 160 });
      });
      el.outro(t, END + 1.3);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
