/*
  İki ek kuralı, kart doğru kutuya uçar (Lacivert).
  Tutma mantığı: kanca bir vaat (iki kural) → altta üç kutu baştan duruyor (oyun belli) → her turda 3 sn → cevapta
  kelimenin eki yanıyor, kart kavis çizerek kutusuna uçuyor, kutuda birikiyor (ilerleme görünür) → son ekranda iki
  kural ve kutudaki örnekler → kapanış.

  Veri: items (her kalemde `stem` + `sfx`: kelimenin eksiz kısmı ve vurgulanan ek; her ek copy.rules'tan birine düşer
  ve kalemin artikeli o kuralın artikeli olur).
  copy anahtarları (D.copy):
    title    zorunlu  galeri ve çıktı adı
    hook     zorunlu  tam 2 satır; 2. satır vurgu renginde
    rules    zorunlu  tam 2 kural: [{ label: "-heit · -keit", sfx: ["heit", "keit"], artikel: "die" }, …]
    caption  zorunlu  paylaşım metni + etiketler
    outro    zorunlu  { series, ask }
    pill     isteğe bağlı  kancadaki hap (yoksa ui.pill)
    endKicker isteğe bağlı  son ekran başlığı (yoksa ui.endKicker)
  ui (sabit yazılar, copy.ui ile ezilir):
    pill       "Kartı doğru kutuya at"   kancadaki hap (copy.pill yoksa)
    soru       "Hangi kutuya?"           her turda kartın altındaki soru
    endKicker  "Aklında kalsın"          son ekran başlığı (copy.endKicker yoksa)
    der / die / das                      kutu etiketleri
*/
E.register("artikel-lacivert", { title: "İki ek kuralı · kutuya at", approach: "artikel", theme: "lacivert", ui: { pill: "Kartı doğru kutuya at", soru: "Hangi kutuya?", endKicker: "Aklında kalsın", der: "der", die: "die", das: "das" } }, (X) => {
  const { h, set, p, ease, segments } = E;
  const D = X.data;
  const C = D.copy || {};
  for (const k of ["title", "hook", "rules", "caption", "outro"]) if (!C[k]) throw new Error(`copy.${k} gerekli`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("copy.hook tam 2 satır olmalı");
  if (!Array.isArray(C.rules) || C.rules.length !== 2) throw new Error("copy.rules tam 2 kural olmalı");
  if (!C.outro.series || !C.outro.ask) throw new Error("copy.outro.series ve copy.outro.ask gerekli");
  const ruleFor = (it) => {
    const r = C.rules.find((x) => x.sfx.includes(it.sfx));
    if (!r) throw new Error(`"${it.de}" eki (${it.sfx}) hiçbir kurala düşmüyor`);
    if (r.artikel !== it.artikel) throw new Error(`"${it.de}" ${it.artikel} alıyor, kural ${r.artikel} diyor`);
    return r;
  };
  D.items.forEach(ruleFor);
  const T = X.theme;
  const G = E.G;
  const COL = E.ART;
  const ARTS = ["der", "die", "das"];
  const HOOK = 2.6;
  const R = 6.5; // inişten sonra kural hapı ~1,4 sn okunur kalsın
  const starts = D.items.map((_, i) => HOOK + i * R);
  const END = HOOK + D.items.length * R;
  const DUR = END + 1.6 + E.OUTRO_LEN;
  const COUNT = 0.6;
  const REVEAL = 3.6;
  const FLY = REVEAL + 1.15; // uçuş başı
  const FLYD = 0.55;
  const BIN = { top: 1010, h: 300, w: 262, gap: 24 };
  const binX = (k) => G.L + k * (BIN.w + BIN.gap);
  const CARD = { w: 640, h: 380, top: 430 };
  let el = {};
  let rounds = [];

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.7 }, { t: 0.5, name: "pop", f: 560 }, { t: 1.3, name: "pop", f: 640 }, { t: 1.45, name: "pop", f: 720 }, { t: 1.6, name: "pop", f: 800 }, { t: HOOK - 0.3, name: "whoosh", d: 0.45 }];
      starts.forEach((s, i) => {
        sfx.push({ t: s, name: "whoosh", d: 0.35, v: 0.5 });
        [0, 1, 2].forEach((k) => sfx.push({ t: s + COUNT + k, name: "tick", hi: k === 2 }));
        sfx.push({ t: s + REVEAL, name: "ding", k: 1 + i * 0.05 });
        voice.push({ t: s + REVEAL + 0.1, text: `${D.items[i].artikel} ${D.items[i].de}` });
        sfx.push({ t: s + FLY, name: "whoosh", d: FLYD, v: 0.8 }, { t: s + FLY + FLYD, name: "impact", v: 0.4 }, { t: s + FLY + FLYD + 0.05, name: "count", n: 76 + i * 2 });
      });
      sfx.push({ t: END, name: "whoosh", d: 0.45, down: true }, { t: END + 0.5, name: "pop", f: 620 }, { t: END + 0.85, name: "pop", f: 760 }, { t: END + 1.6, name: "pop", f: 700 });
      voice.forEach((v) => dur(v.text));
      return {
        duration: DUR,
        poster: 2.05,
        voice,
        sfx,
        music: { style: "chip", bpm: 116, root: 60, mode: "maj", gain: 0.42, seed: "artikel-lacivert" },
        notes: [
          { t: 0, title: "Kanca: iki kural", why: "Kısa ve iddialı bir vaat. Altta üç kutu hemen beliriyor: oyunun ne olduğu ilk iki saniyede anlaşılıyor." },
          { t: starts[0], title: "Kart ortada, kutular altta", why: "İzleyen kartı aklında bir kutuya atıyor. Kartın altındaki çizgi 3 saniyeyi sayıyor, sağ üstte rakam." },
          { t: starts[0] + REVEAL, title: "Ek yanıyor", why: "Cevapla birlikte kelimenin eki renkleniyor ve telaffuz geliyor: kural kelimenin içinde görünüyor." },
          { t: starts[0] + FLY, title: "Kart kutuya uçuyor", why: "Kavisli uçuş, iniş sesi ve kutuda biriken kelime: her turda ilerleme somut olarak görünüyor." },
          { t: END, title: "İki kural, örnekleriyle", why: "Öğrenilen şey iki satıra iniyor; ekran görüntüsü alınacak kart. Sonra standart kapanış." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .glow{width:1000px;height:1000px;border-radius:50%;filter:blur(170px);background:#2a4bd0}
        .pill{top:840px;height:104px;padding:0 44px;border-radius:52px;background:${T.pill};color:${T.pillInk};font-size:48px;font-weight:800;display:flex;align-items:center;white-space:nowrap}
        .bin{top:${BIN.top}px;width:${BIN.w}px;height:${BIN.h}px;border-radius:32px;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 3px rgba(255,255,255,.1);overflow:hidden}
        .bin .bar{left:0;right:0;top:0;height:10px}
        .bin b{left:0;right:0;top:34px;text-align:center;font-size:76px;font-weight:800;line-height:1}
        .bin .got{left:16px;right:16px;top:136px;display:flex;flex-direction:column;align-items:center;gap:12px}
        .bin .got span{position:relative;height:52px;padding:0 20px;border-radius:26px;background:rgba(255,255,255,.12);font-size:26px;font-weight:700;display:flex;align-items:center;white-space:nowrap}
        .tag{left:${G.L}px;top:300px;height:72px;padding:0 32px;border-radius:36px;background:rgba(255,255,255,.1);font-size:36px;font-weight:800;letter-spacing:.06em;display:flex;align-items:center}
        .cd{left:${G.R - 96}px;top:288px;width:96px;height:96px;border-radius:50%;background:#fff;color:${T.bg};font-size:56px;font-weight:800;display:flex;align-items:center;justify-content:center}
        .card{left:${G.CX - CARD.w / 2}px;top:${CARD.top}px;width:${CARD.w}px;height:${CARD.h}px;border-radius:48px;background:${T.ink};color:${T.bg};box-shadow:0 40px 80px -30px rgba(0,0,0,.7);transform-origin:50% 50%}
        .card .wd{left:0;right:0;top:110px;text-align:center;font-size:132px;font-weight:800;font-stretch:82%;letter-spacing:-.02em;line-height:1;white-space:nowrap}
        .card .wd *{position:relative}
        .card .a{display:inline-block;overflow:hidden;vertical-align:bottom}
        .card .sx{display:inline-block;border-radius:18px;padding:0 10px;margin:0 -10px}
        .card .tr{left:0;right:0;top:268px;text-align:center;font-size:48px;font-weight:600;color:rgba(16,26,54,.6)}
        .card .fuse{left:64px;right:64px;bottom:36px;height:10px;border-radius:5px;background:rgba(16,26,54,.1);overflow:hidden}
        .card .fuse i{left:0;top:0;bottom:0;width:100%;background:${T.acc};transform-origin:0 50%}
        .ask{left:${G.L}px;width:${G.W}px;top:870px;text-align:center;font-size:44px;font-weight:700;color:${T.sub}}
        .rule{top:860px;height:96px;padding:0 40px;border-radius:48px;font-size:46px;font-weight:800;display:flex;align-items:center;gap:16px;white-space:nowrap;color:#fff}
        .rule *{position:relative}
        .e1{left:${G.L}px;width:${G.W}px;top:330px;text-align:center;font-size:52px;font-weight:700;color:${T.sub}}
        .rc{left:${G.L}px;width:${G.W}px;height:280px;border-radius:48px;background:${T.surface};padding:44px 48px}
        .rc *{position:relative}
        .rc .k{display:flex;align-items:baseline;gap:24px;font-size:96px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1}
        .rc .k i{font-style:normal;font-size:60px;color:${T.sub}}
        .rc .ex{margin-top:36px;display:flex;gap:16px;flex-wrap:wrap}
        .rc .ex span{height:64px;padding:0 26px;border-radius:32px;background:rgba(255,255,255,.1);font-size:36px;font-weight:700;display:flex;align-items:center}
      `);
      el.g1 = h("div", "glow", root);
      el.g2 = h("div", "glow", root);
      el.segs = segments(root, D.items.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 112 }, { t: C.hook[1], size: 112, color: T.acc, delay: 0.45 }], { center: 600 });
      el.pill = h("div", "pill", root, C.pill || X.ui("pill"));
      el.bins = ARTS.map((a, k) => {
        const b = h("div", "bin", root, `<i class="bar" style="background:${COL[a]}"></i><b style="color:${COL[a]}">${X.ui(a)}</b><div class="got"></div>`);
        b.style.left = `${binX(k)}px`;
        return { a, b, got: b.querySelector(".got"), chips: [] };
      });
      rounds = D.items.map((it, i) => {
        const r = { it, k: ARTS.indexOf(it.artikel) };
        r.tag = h("div", "tag", root, `${i + 1} / ${D.items.length}`);
        r.cd = h("div", "cd", root, "3");
        r.card = h("div", "card", root);
        r.wd = h("div", "wd", r.card, `<span class="a" style="color:${COL[it.artikel]}">${it.artikel}&nbsp;</span><span>${it.stem}</span><span class="sx">${it.sfx}</span>`);
        r.a = r.wd.querySelector(".a");
        r.sx = r.wd.querySelector(".sx");
        r.tr = h("div", "tr", r.card, it.tr);
        r.fuse = h("div", "fuse", r.card, "<i></i>").firstChild;
        r.ask = h("div", "ask", root, X.ui("soru"));
        r.rule = h("div", "rule", root, `<span>${ruleFor(it).label}</span><span>→</span><span>${it.artikel}</span>`);
        r.rule.style.background = COL[it.artikel];
        const bin = el.bins[r.k];
        r.chip = h("span", null, bin.got, `${it.de}`);
        return r;
      });
      el.e1 = h("div", "e1", root, C.endKicker || X.ui("endKicker"));
      const byRule = C.rules.map((r) => ({ k: r.label, a: r.artikel, ex: D.items.filter((x) => r.sfx.includes(x.sfx)) }));
      el.rcs = byRule.map((g, i) => {
        const c = h("div", "rc", root, `<div class="k"><span>${g.k}</span><i>→</i><span style="color:${COL[g.a]}">${g.a}</span></div><div class="ex">${g.ex.map((x) => `<span>${x.artikel} ${x.de}</span>`).join("")}</div>`);
        c.style.top = `${430 + i * 320}px`;
        return c;
      });
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.hook.layout();
      el.pillW = el.pill.offsetWidth;
      rounds.forEach((r) => {
        const k = Math.min(1, (CARD.w - 80) / r.wd.scrollWidth);
        if (k < 1) r.wd.style.fontSize = `${Math.floor(132 * k)}px`;
        r.aw = r.a.scrollWidth;
        r.ruleW = r.rule.offsetWidth;
      });
    },

    render(t) {
      set(el.g1, { o: 0.32, x: -420 + Math.sin(t * 0.4) * 140, y: -380 + Math.cos(t * 0.3) * 120 });
      set(el.g2, { o: 0.22, x: 360 + Math.cos(t * 0.35) * 140, y: 1100 + Math.sin(t * 0.42) * 140 });
      const out = HOOK - 0.32;
      el.hook.render(t, 0.05, out);
      {
        const k = p(t, 0.95, 0.5);
        set(el.pill, { o: Math.min(k * 3, 1 - p(t, out, 0.25)), x: G.CX - el.pillW / 2, s: 0.7 + ease.spring(k) * 0.3 });
      }
      const cur = rounds.findIndex((_, i) => t >= starts[i] && t < starts[i] + R);
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(cur >= 0 ? cur : t >= END ? D.items.length : 0, cur >= 0 ? p(t, starts[cur], R) : 0);

      // kutular: kancada alttan gelir, sonda iner
      const binOut = ease.inCubic(p(t, END - 0.1, 0.45));
      el.bins.forEach((b, k) => {
        const kk = p(t, 1.3 + k * 0.15, 0.6);
        const land = rounds.filter((r) => r.k === k).map((r) => p(t, starts[rounds.indexOf(r)] + FLY + FLYD, 0.35));
        const pulse = land.reduce((m, x) => Math.max(m, Math.sin(Math.PI * x)), 0);
        set(b.b, { o: Math.min(ease.outCubic(kk * 2), 1 - binOut), y: (1 - ease.spring(kk)) * 300 + binOut * 200, s: 1 + pulse * 0.06 });
        b.b.style.boxShadow = `inset 0 0 0 ${3 + pulse * 3}px ${pulse > 0.05 ? COL[b.a] : "rgba(255,255,255,.1)"}`;
      });

      rounds.forEach((r, i) => {
        const lt = t - starts[i];
        const vis = lt > -0.1 && lt < R + 0.1;
        [r.tag, r.cd, r.card, r.ask, r.rule].forEach((x) => (x.style.display = vis ? "" : "none"));
        // kutudaki kelime: inişten sonra kalıcı
        const ck = p(t, starts[i] + FLY + FLYD, 0.4);
        set(r.chip, { o: ck, s: 0.6 + ease.spring(ck) * 0.4 });
        if (!vis) return;
        const inK = p(lt, 0, 0.5);
        const outK = ease.inCubic(p(lt, R - 0.3, 0.3));
        set(r.tag, { o: Math.min(inK * 2, 1 - outK) });
        const n = Math.max(1, 3 - Math.floor(Math.max(0, lt - COUNT)));
        r.cd.textContent = String(n);
        const tk = p(lt - COUNT - Math.floor(Math.max(0, lt - COUNT)), 0, 0.3);
        set(r.cd, { o: p(lt, COUNT - 0.2, 0.2) * (1 - p(lt, REVEAL - 0.1, 0.15)), s: lt < COUNT ? 1 : 1.22 - ease.outBack(tk) * 0.22 });
        r.cd.style.background = n === 1 ? COL.die : "#fff";
        r.cd.style.color = n === 1 ? "#fff" : T.bg;
        r.fuse.style.transform = `scaleX(${1 - p(lt, COUNT, 3)})`;
        // kart: yukarıdan iner; cevapta artikel açılır, ek yanar; sonra kutusuna kavisle uçar
        const rv = p(lt, REVEAL, 0.55);
        r.a.style.maxWidth = `${r.aw * ease.outExpo(rv)}px`;
        r.sx.style.background = `rgba(255,90,110,${(0.2 * rv).toFixed(3)})`;
        r.sx.style.color = rv > 0.3 ? COL[r.it.artikel] : T.bg;
        set(r.tr, { o: p(lt, REVEAL + 0.3, 0.4) });
        const fk = ease.inOutCubic(p(lt, FLY, FLYD));
        const sx0 = G.CX;
        const sy0 = CARD.top + CARD.h / 2;
        const tx = binX(r.k) + BIN.w / 2;
        const ty = BIN.top + 190; // etiketin altına, kelimelerin toplandığı yere
        // ikinci derece Bezier: önce biraz yukarı, sonra kutuya
        const cx = (sx0 + tx) / 2;
        const cy = sy0 - 220;
        const bx = (1 - fk) * (1 - fk) * sx0 + 2 * (1 - fk) * fk * cx + fk * fk * tx;
        const by = (1 - fk) * (1 - fk) * sy0 + 2 * (1 - fk) * fk * cy + fk * fk * ty;
        const drop = ease.spring(inK);
        set(r.card, {
          o: Math.min(ease.outCubic(inK * 2), 1 - p(lt, FLY + FLYD - 0.12, 0.12)),
          x: bx - sx0,
          y: by - sy0 - (1 - drop) * 260,
          s: (0.9 + drop * 0.1) * (1 - fk * 0.78) * (1 + Math.sin(Math.PI * p(lt, REVEAL, 0.4)) * 0.04),
          r: fk * (r.k - 1 || 1) * 14 + (1 - drop) * -6,
        });
        set(r.ask, { o: Math.min(p(lt, 0.4, 0.4), 1 - p(lt, REVEAL - 0.1, 0.2)) });
        const rk = p(lt, FLY + FLYD, 0.45);
        set(r.rule, { o: Math.min(rk * 2, 1 - outK), x: G.CX - r.ruleW / 2, s: 0.7 + ease.spring(rk) * 0.3 });
      });

      set(el.e1, { o: p(t, END + 0.3, 0.4) });
      el.rcs.forEach((c, i) => {
        const k = p(t, END + 0.45 + i * 0.35, 0.6);
        set(c, { o: ease.outCubic(k * 2), y: (1 - ease.spring(k)) * 120 });
      });
      el.outro(t, END + 1.6);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
