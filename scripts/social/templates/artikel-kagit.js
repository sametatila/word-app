/*
  Ortak ek kuralı, anket düzeni (Kâğıt): aynı ekle biten ve aynı artikeli alan 4 kelime.
  Tutma mantığı: kanca bir sır vaat ediyor → her tur anket gibi üç şık + 3 sn → cevap hep aynı artikel çıkıyor
  ve kelimenin eki her turda biraz daha belirginleşiyor (izleyen deseni kendisi yakalıyor) → son turda kural
  kartı → kapanışta kural formülü + izleyenden yeni örnek isteniyor (yorum).

  Veri: items (tam 4; hepsi aynı artikel, hepsi copy.suffix ile biter).
  copy anahtarları (D.copy):
    title    zorunlu  galeri ve çıktı adı
    hook     zorunlu  tam 2 satır
    pill     zorunlu  kancanın altındaki hap (sır vaadi)
    suffix   zorunlu  vurgulanan ek, tiresiz (ör. "ung"); kapanış formülü "-ek = artikel" buradan ve veriden
    rule     zorunlu  { kicker, text, examples }: kural kartının üst satırı, ana metni (HTML; <i> vurgu, <br>), örnekler
    caption  zorunlu  paylaşım metni + etiketler
    outro    zorunlu  { series, ask }
    endKicker isteğe bağlı  formülün üstündeki küçük başlık (yoksa ui.endKicker)
  ui (sabit yazılar, copy.ui ile ezilir):
    endKicker  "Kural"   formülün üstündeki küçük başlık (copy.endKicker yoksa)
    der / die / das      anket şıkları
*/
E.register("artikel-kagit", { title: "Ortak ek kuralı · anket", approach: "artikel", theme: "kagit", ui: { endKicker: "Kural", der: "der", die: "die", das: "das" } }, (X) => {
  const { h, set, p, ease, segments } = E;
  const D = X.data;
  const C = D.copy || {};
  for (const k of ["title", "hook", "pill", "suffix", "rule", "caption", "outro"]) if (!C[k]) throw new Error(`copy.${k} gerekli`);
  if (!Array.isArray(C.hook) || C.hook.length !== 2) throw new Error("copy.hook tam 2 satır olmalı");
  for (const k of ["kicker", "text", "examples"]) if (!C.rule[k]) throw new Error(`copy.rule.${k} gerekli`);
  if (!C.outro.series || !C.outro.ask) throw new Error("copy.outro.series ve copy.outro.ask gerekli");
  if (!Array.isArray(D.items) || D.items.length !== 4) throw new Error("items tam 4 kalem olmalı");
  const ART = D.items[0].artikel;
  for (const it of D.items) {
    if (it.artikel !== ART) throw new Error(`items aynı artikeli almalı: ${it.artikel} ${it.de}`);
    if (!it.de.toLowerCase().endsWith(C.suffix.toLowerCase())) throw new Error(`"${it.de}" -${C.suffix} ile bitmiyor`);
  }
  const T = X.theme;
  const G = E.G;
  const COL = E.ART;
  const HOOK = 2.7;
  const R = [4.7, 4.7, 4.7, 7.4];
  const starts = R.reduce((a, r, i) => (a.push(i ? a[i - 1] + R[i - 1] : HOOK), a), []);
  const END = starts[3] + R[3];
  const DUR = END + 1.4 + E.OUTRO_LEN;
  const COUNT = 0.55;
  const REVEAL = 3.55;
  let el = {};
  let rounds = [];

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.6 }, { t: 0.5, name: "pop", f: 560 }, { t: 1.25, name: "pop", f: 760 }, { t: HOOK - 0.3, name: "whoosh", d: 0.45 }];
      starts.forEach((s, i) => {
        [0, 1, 2].forEach((k) => sfx.push({ t: s + COUNT + k, name: "tick", hi: k === 2 }));
        sfx.push({ t: s + REVEAL, name: "ding", k: 1 + i * 0.05 });
        voice.push({ t: s + REVEAL + 0.12, text: `${D.items[i].artikel} ${D.items[i].de}` });
        if (i === 3) sfx.push({ t: s + REVEAL + 1.3, name: "riser", d: 0.5 }, { t: s + REVEAL + 1.8, name: "impact", v: 0.5 });
        sfx.push({ t: s + R[i] - 0.38, name: "whoosh", d: 0.4, v: 0.7 });
      });
      D.items.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.12, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      voice.forEach((v) => dur(v.text));
      return {
        duration: DUR,
        poster: 2.1,
        voice,
        sfx,
        music: { style: "keys", bpm: 84, root: 60, mode: "maj", gain: 0.5, seed: "artikel-kagit" },
        notes: [
          { t: 0, title: "Kanca: bir sır", why: "Hap bir sır vaat ediyor ama cevabı vermiyor, izleyeni sona kadar bekletiyor. Kâğıt zemin, sakin ve okunur." },
          { t: starts[0], title: "Anket düzeni", why: "Üç şık alt alta, TikTok anketine benziyor: parmakla seçecekmiş gibi hissettiriyor. Kart altındaki çizgi 3 sn'yi gösteriyor." },
          { t: starts[1] + REVEAL, title: "Desen belirginleşiyor", why: "Cevap yine aynı artikel. Ortak ek her turda biraz daha renkleniyor; izleyen kuralı kendisi yakalıyor, bu da 'aha' anı ve paylaşım sebebi." },
          { t: starts[3] + REVEAL + 1.4, title: "Kural kartı", why: "Kural kısa ve kesin: ek = artikel. Öğrenilen tek cümle, ekran görüntüsü alınacak kart." },
          { t: END, title: "Kapanış: izleyenden örnek", why: "Yorum sorusu izleyene aynı ekle biten kendi örneğini yazdırıyor; standart kapanış ve kutulu imza." },
        ],
        caption: C.caption,
      };
    },

    build(root) {
      X.style(`
        .pill{top:820px;height:112px;padding:0 48px;border-radius:56px;background:${T.acc};color:#fff;font-size:54px;font-weight:800;display:flex;align-items:center;white-space:nowrap}
        .rd{inset:0}
        .tag{left:${G.L}px;top:268px;height:72px;padding:0 32px;border-radius:36px;background:${T.ink};color:#fff;font-size:36px;font-weight:800;display:flex;align-items:center;letter-spacing:.06em}
        .num{left:${G.R - 80}px;top:264px;width:80px;height:80px;border-radius:50%;background:${T.ink};color:#fff;font-size:48px;font-weight:800;display:flex;align-items:center;justify-content:center}
        .card{left:${G.L}px;top:372px;width:${G.W}px;height:416px;border-radius:48px;background:#fff;box-shadow:0 24px 60px -30px rgba(40,30,20,.35)}
        .line{left:64px;right:64px;bottom:40px;height:10px;border-radius:5px;background:rgba(27,27,29,.08);overflow:hidden}
        .line i{left:0;top:0;bottom:0;width:100%;background:${T.ink};transform-origin:0 50%}
        .wd{left:0;right:0;top:96px;text-align:center;font-size:150px;font-weight:800;font-stretch:82%;letter-spacing:-.02em;line-height:1;white-space:nowrap}
        .wd *{position:relative}
        .wd .a{display:inline-block;overflow:hidden;vertical-align:bottom;white-space:nowrap}
        .wd .sfx{display:inline-block;border-radius:20px;padding:0 10px;margin:0 -10px}
        .tr{left:0;right:0;top:280px;text-align:center;font-size:54px;font-weight:600;color:${T.sub}}
        .opt{left:${G.L}px;width:${G.W}px;height:128px;border-radius:64px;background:#fff;box-shadow:inset 0 0 0 4px rgba(27,27,29,.12);overflow:hidden}
        .opt .fill{left:0;top:0;bottom:0;width:100%;transform-origin:0 50%}
        .opt b{left:56px;top:0;bottom:0;display:flex;align-items:center;font-size:64px;font-weight:800}
        .opt em{right:56px;top:0;bottom:0;display:flex;align-items:center;font-style:normal;font-size:56px;font-weight:800;color:#fff}
        .rule{left:${G.L}px;width:${G.W}px;top:828px;padding:48px 56px;border-radius:48px;background:${T.ink};color:#fff}
        .rule *{position:relative}
        .rule small{display:block;font-size:40px;font-weight:600;color:rgba(255,255,255,.7);margin-bottom:16px}
        .rule b{display:block;font-size:80px;font-weight:800;font-stretch:84%;letter-spacing:-.02em;line-height:1.05}
        .rule b i{font-style:normal;color:${COL[ART]}}
        .rule span{display:block;margin-top:24px;font-size:40px;font-weight:600;color:rgba(255,255,255,.75)}
        .e1{left:${G.L}px;width:${G.W}px;top:460px;text-align:center;font-size:52px;font-weight:700;color:${T.sub}}
        .e2{left:${G.L}px;width:${G.W}px;top:540px;text-align:center;font-size:170px;font-weight:800;font-stretch:80%;letter-spacing:-.03em;line-height:1}
        .e2 i{position:relative;font-style:normal;color:${COL[ART]}}
        .chips{left:${G.L}px;width:${G.W}px;top:820px;display:flex;flex-wrap:wrap;gap:20px;justify-content:center}
        .chips span{position:relative;height:96px;padding:0 36px;border-radius:48px;background:#fff;display:flex;align-items:center;font-size:48px;font-weight:800;box-shadow:0 10px 26px -16px rgba(40,30,20,.4)}
        .chips span i{position:relative;font-style:normal;color:${COL[ART]};margin-right:12px}
      `);
      el.segs = segments(root, 4);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 120 }, { t: C.hook[1], size: 120 }], { center: 640 });
      el.hk3 = h("div", "pill", root, C.pill);
      rounds = D.items.map((it, i) => {
        const r = { it, root: h("div", "rd", root) };
        r.tag = h("div", "tag", r.root, `${i + 1} / 4`);
        r.num = h("div", "num", r.root, "3");
        r.card = h("div", "card", r.root);
        r.line = h("div", "line", r.card, "<i></i>").firstChild;
        const stem = it.de.slice(0, -C.suffix.length);
        r.wd = h("div", "wd", r.card, `<span class="a" style="color:${COL[it.artikel]}">${it.artikel}&nbsp;</span><span>${stem}</span><span class="sfx">${it.de.slice(-C.suffix.length)}</span>`);
        r.a = r.wd.querySelector(".a");
        r.sfx = r.wd.querySelector(".sfx");
        r.tr = h("div", "tr", r.card, it.tr);
        r.opts = ["der", "die", "das"].map((a, k) => {
          const o = h("div", "opt", r.root, `<div class="fill"></div><b>${X.ui(a)}</b><em>✓</em>`);
          o.style.top = `${828 + k * 152}px`;
          return { a, o, fill: o.querySelector(".fill"), b: o.querySelector("b"), em: o.querySelector("em") };
        });
        if (i === 3) r.rule = h("div", "rule", r.root, `<small>${C.rule.kicker}</small><b>${C.rule.text}</b><span>${C.rule.examples}</span>`);
        return r;
      });
      el.e1 = h("div", "e1", root, C.endKicker || X.ui("endKicker"));
      el.e2 = h("div", "e2", root, `-${C.suffix} = <i>${ART}</i>`);
      el.chips = h("div", "chips", root, D.items.map((it) => `<span><i>${it.artikel}</i>${it.de}</span>`).join(""));
      el.chipEls = [...el.chips.children];
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.hook.layout();
      el.hk3w = el.hk3.offsetWidth;
      rounds.forEach((r) => (r.aw = r.a.scrollWidth));
    },

    render(t) {
      const ho = HOOK - 0.35;
      el.hook.render(t, 0.05, ho);
      {
        const k = p(t, 1.25, 0.5);
        set(el.hk3, { o: Math.min(k * 3, 1 - p(t, ho, 0.25)), x: G.CX - el.hk3w / 2, s: 0.7 + ease.spring(k) * 0.3, r: (1 - ease.spring(k)) * -4 });
      }
      const cur = rounds.findIndex((_, i) => t >= starts[i] && t < starts[i] + R[i]);
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.1, 0.3)) });
      el.segs.set(cur >= 0 ? cur : t >= END ? 4 : 0, cur >= 0 ? p(t, starts[cur], R[cur]) : 0);

      rounds.forEach((r, i) => {
        const lt = t - starts[i];
        const vis = lt > -0.1 && lt < R[i] + 0.1;
        r.root.style.display = vis ? "" : "none";
        if (!vis) return;
        const inK = p(lt, 0, 0.55);
        const outK = ease.inCubic(p(lt, R[i] - 0.38, 0.38));
        set(r.root, { o: 1 - outK, x: (1 - ease.outExpo(inK)) * 700 - outK * 700 });
        set(r.tag, { o: p(lt, 0.05, 0.3) });
        const n = Math.max(1, 3 - Math.floor(Math.max(0, lt - COUNT)));
        r.num.textContent = String(n);
        const tk = p(lt - COUNT - Math.floor(Math.max(0, lt - COUNT)), 0, 0.3);
        set(r.num, { o: p(lt, COUNT - 0.2, 0.2) * (1 - p(lt, REVEAL - 0.1, 0.15)), s: lt < COUNT ? 1 : 1.2 - ease.outBack(tk) * 0.2 });
        r.num.style.background = n === 1 ? COL.die : T.ink;
        r.line.style.transform = `scaleX(${1 - p(lt, COUNT, 3)})`;
        const rv = p(lt, REVEAL, 0.6);
        // artikel kelimenin önüne açılır (genişlik 0 → tam)
        r.a.style.maxWidth = `${r.aw * ease.outExpo(rv)}px`;
        // ortak ek: her turda daha belirgin (desen), cevapta artikelin renginde parlar
        const strength = [0.25, 0.5, 0.75, 1][i];
        const glow = rv * strength;
        r.sfx.style.background = `color-mix(in srgb, ${COL[ART]} ${(18 * glow).toFixed(1)}%, transparent)`;
        r.sfx.style.color = glow > 0.4 ? COL[ART] : T.ink;
        set(r.wd, { s: 1 + Math.sin(Math.PI * p(lt, REVEAL, 0.5)) * 0.05 });
        const trk = p(lt, REVEAL + 0.35, 0.45);
        set(r.tr, { o: trk, y: (1 - ease.outCubic(trk)) * 20 });
        const ruleK = r.rule ? p(lt, REVEAL + 1.8, 0.6) : 0;
        r.opts.forEach((o, k) => {
          const ok = o.a === r.it.artikel;
          const ik = p(lt, 0.25 + k * 0.08, 0.5);
          const hit = p(lt, REVEAL, 0.55);
          set(o.o, { o: Math.min(ik * 2, ok ? 1 : 1 - hit * 0.6) * (1 - ruleK), x: (1 - ease.spring(ik)) * 200, s: ok ? 1 + Math.sin(Math.PI * hit) * 0.04 : 1 });
          o.fill.style.background = COL[o.a];
          o.fill.style.transform = `scaleX(${ok ? ease.outExpo(hit) : 0})`;
          o.b.style.color = ok && hit > 0.3 ? "#fff" : T.ink;
          set(o.em, { o: ok ? p(lt, REVEAL + 0.3, 0.3) : 0, s: ok ? 0.5 + ease.spring(p(lt, REVEAL + 0.3, 0.5)) * 0.5 : 1 });
        });
        if (r.rule) set(r.rule, { o: ruleK, y: (1 - ease.spring(ruleK)) * 120 });
      });

      {
        const k = p(t, END, 0.5);
        set(el.e1, { o: k });
        const k2 = p(t, END + 0.1, 0.6);
        set(el.e2, { o: ease.outCubic(k2 * 2), s: 0.6 + ease.spring(k2) * 0.4 });
        el.chipEls.forEach((c, i) => {
          const kk = p(t, END + 0.5 + i * 0.12, 0.5);
          set(c, { o: ease.outCubic(kk * 2), y: (1 - ease.spring(kk)) * 80 });
        });
      }
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
