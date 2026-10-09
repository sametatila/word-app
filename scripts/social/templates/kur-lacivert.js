/*
  "Cümleyi kur", mesaj yazma ekranı (Lacivert): kelimeler klavye önerisi. Sahne ve metinler bölüm dosyasından (copy).
  Tutma mantığı: tanıdık arayüz (mesajlaşma) → kelimeler öneri çipleri olarak karışık geliyor, gönder
  düğmesinin halkası süreyi sayıyor → çipler sırayla yazı kutusuna uçuyor, cümle harf harf yazılıyor →
  "gönder" → mesaj balonu sohbete çıkıyor ve sesle okunuyor → Türkçesi altında, ipucu sistem notu gibi →
  sohbet turdan tura birikiyor (ilerleme hissi) → özet + kapanış.
*/
E.register("kur-lacivert", { title: "Cümleyi kur · mesaj", approach: "kur", theme: "lacivert", ui: { tip: "İPUCU", placeholder: "Mesaj yaz…", summary: "{scene} {total} cümle" } }, (X) => {
  const { h, set, p, ease, words, karaoke, segments } = E;
  const D = X.data;
  /*
    copy anahtarları (bölüm dosyası, D.copy):
      zorunlu    title, hook (3 satır: 1. beyaz 128 px, 2. turuncu 128 px, 3. gri 72 px), caption, outro { series, ask }, scene (sahne adı, ör. "Kafede"); scene sohbet başlığında da görünür
      isteğe bağlı summary (kapanış başlığı; yoksa "<scene> <cümle sayısı> cümle")
      ui (sabit yazılar; bölüm copy.ui ile ezer): tip "İPUCU", placeholder "Mesaj yaz…" (yazı kutusu),
                 summary "{scene} {total} cümle" (copy.summary yoksa)
    cümle sayısı: 2–4; cümle uzunluğu: en çok 8 kelime (daha uzunu yerleşime sığmıyor)
  */
  const C = D.copy;
  const need = (ok, msg) => {
    if (!ok) throw new Error(`kur-lacivert: ${msg}`);
  };
  need(C, "copy yok");
  for (const k of ["title", "caption", "scene"]) need(C[k], `copy.${k} yok`);
  need(Array.isArray(C.hook) && C.hook.length === 3, "copy.hook 3 satır olmalı");
  need(C.outro && C.outro.series && C.outro.ask, "copy.outro.series ve copy.outro.ask gerekli");
  need(Array.isArray(D.lines) && D.lines.length >= 2 && D.lines.length <= 4, "2–4 cümle olmalı");
  for (const l of D.lines) need(l.de.split(" ").length <= 8, `cümle en çok 8 kelime: ${l.de}`);
  const SUMMARY = C.summary || X.ui("summary", { scene: C.scene, total: D.lines.length });
  const T = X.theme;
  const G = E.G;
  const OR = T.acc;
  const HOOK = 2.7;
  const THINK = 2.8;
  const CHIP_H = 104;
  const CGAP = 16;
  const IN_X = G.L; // yazı kutusu
  const IN_Y = 1330; // yazı kutusunun alt satırı (çok satırda yukarı büyür)
  const IN_H = 112;
  const SEND = 112;
  const IN_W = G.W - SEND - 24;
  const IN_FONT = 54;
  const CHAT_TOP = 420;
  const CHAT_BOT = 960; // sohbetin alt sınırı; çipler daha yükseğe çıkarsa render'da onların üstüne çekilir
  let L = [];
  let END = 0;
  let DUR = 0;
  let el = {};
  let rounds = [];
  let ctx2d = null;
  const tw = (s) => {
    ctx2d ||= document.createElement("canvas").getContext("2d");
    ctx2d.font = `700 ${IN_FONT}px "Bricolage Grotesque"`;
    return ctx2d.measureText(s).width;
  };

  const tok = (s) => {
    const w = s.split(" ");
    const m = w[w.length - 1].match(/^(.*?)([.?!]?)$/);
    w[w.length - 1] = m[1];
    return { w, punct: m[2] };
  };
  const shuffle = (n, seed) => {
    let sd = seed;
    const r = () => ((sd = (sd * 16807) % 2147483647) - 1) / 2147483646;
    let a;
    do {
      a = [...Array(n).keys()];
      for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
    } while (a[0] === 0 || a.every((v, i) => v === i));
    return a;
  };

  return {
    plan(dur) {
      const voice = [];
      const sfx = [{ t: 0.05, name: "impact", v: 0.6 }, { t: 0.55, name: "pop", f: 620 }, { t: HOOK - 0.35, name: "whoosh", d: 0.45 }];
      let t = HOOK;
      L = D.lines.map((l) => {
        const n = tok(l.de).w.length;
        const r = { a: t };
        for (let k = 0; k < n; k++) sfx.push({ t: r.a + 0.3 + k * 0.06, name: "pop", f: 700 + k * 30, v: 0.4 });
        r.think = r.a + 0.8;
        [0, 1, 2].forEach((k) => sfx.push({ t: r.think + k * (THINK / 3), name: "tick", hi: k === 2 }));
        r.type = r.think + THINK + 0.1;
        r.step = 0.2;
        for (let k = 0; k < n; k++) sfx.push({ t: r.type + k * r.step + 0.16, name: "tick", v: 0.5 });
        r.send = r.type + n * r.step + 0.3;
        sfx.push({ t: r.send, name: "whoosh", d: 0.35, v: 0.7 }, { t: r.send + 0.3, name: "pop", f: 900 });
        r.v = r.send + 0.55;
        r.d = dur(l.de);
        voice.push({ t: r.v, text: l.de });
        r.tr = r.v + r.d + 0.1;
        r.tip = r.tr + 0.45;
        sfx.push({ t: r.tip, name: "pop", f: 560, v: 0.5 });
        r.b = r.tip + 1.9;
        t = r.b;
        return r;
      });
      END = t;
      DUR = END + 1.4 + E.OUTRO_LEN;
      sfx.push({ t: END, name: "whoosh", d: 0.45, down: true });
      D.lines.forEach((_, i) => sfx.push({ t: END + 0.5 + i * 0.14, name: "count", n: 79 + i * 2 }));
      sfx.push({ t: END + 1.4, name: "pop", f: 700 });
      return {
        duration: DUR,
        poster: 2.1,
        voice,
        sfx,
        music: { style: "bounce", bpm: 90, root: 53, mode: "min", gain: 0.42, seed: "kur-lacivert" },
        notes: [
          { t: 0, title: "Kanca: soru", why: "Kanca 'bunu nasıl dersin?' diye soruyor; mesajlaşma ekranı tanıdık, ilk karede ne olacağı belli." },
          { t: L[0].a, title: "Öneri çipleri", why: "Kelimeler klavye önerisi gibi karışık geliyor; ilk harf küçük, noktalama yok. Gönder düğmesinin halkası süreyi sayıyor." },
          { t: L[0].type, title: "Yazılıyor", why: "Çipler sırayla yazı kutusuna uçuyor, cümle kelime kelime yazılıyor. İzleyen kendi tahminini canlı kontrol ediyor." },
          { t: L[0].send, title: "Gönder", why: "Mesaj balonu sohbete çıkıyor, Defne okurken kelimeler yanıyor; Türkçesi balonun altında." },
          { t: L[1].tip, title: "Sistem notu", why: "İpucu sohbetin içinde küçük bir not, kural kısa ve kesin. Sohbet turdan tura birikiyor." },
          { t: END, title: "Özet + kapanış", why: "Mesajlar Türkçeleriyle liste olarak kalıyor. Standart kapanış ve kutulu imza." },
        ],
        caption: C.caption,
        title: C.title,
      };
    },

    build(root) {
      X.style(`
        .glow{width:900px;height:900px;border-radius:50%;filter:blur(170px);background:#2b4fb8}
        .ui{inset:0}
        .head{left:${G.L}px;top:268px;width:${G.W}px;height:112px;padding:0 32px 0 20px;border-radius:32px;background:${T.surface};display:flex;align-items:center;gap:20px}
        .head *{position:relative}
        .head .av{width:72px;height:72px;border-radius:50%;background:${OR};display:flex;align-items:center;justify-content:center}
        .head .av svg{width:38px;height:38px}
        .head b{font-size:46px;font-weight:800}
        .head small{margin-left:auto;font-size:36px;font-weight:700;color:${T.sub};font-variant-numeric:tabular-nums}
        .inp{left:${IN_X}px;top:${IN_Y}px;width:${IN_W}px;height:${IN_H}px;border-radius:56px;background:${T.surface};box-shadow:inset 0 0 0 3px rgba(255,255,255,.08);overflow:hidden}
        .inp .ph{position:absolute;left:40px;top:0;bottom:0;display:flex;align-items:center;font-size:${IN_FONT}px;font-weight:600;color:rgba(244,241,234,.35)}
        .inp .tx{position:absolute;left:40px;top:24px;width:${IN_W - 80}px;font-size:${IN_FONT}px;line-height:64px;font-weight:700;color:${T.ink}}
        .inp .tx .t{position:relative}
        .inp .car{position:relative;display:inline-block;width:5px;height:56px;margin-left:4px;vertical-align:-10px;background:${OR}}
        .send{left:${G.R - SEND}px;top:${IN_Y}px;width:${SEND}px;height:${SEND}px;border-radius:50%;background:${OR};display:flex;align-items:center;justify-content:center}
        .send svg{position:relative;width:52px;height:52px}
        .ring{left:${G.R - SEND - 10}px;top:${IN_Y - 10}px;width:${SEND + 20}px;height:${SEND + 20}px}
        .ring circle{fill:none;stroke-width:6;stroke-linecap:round}
        .chip{top:0;left:0;height:${CHIP_H}px;padding:0 36px;border-radius:${CHIP_H / 2}px;background:rgba(255,255,255,.12);box-shadow:inset 0 0 0 2px rgba(255,255,255,.1);display:flex;align-items:center;font-size:62px;font-weight:700;white-space:nowrap;color:${T.ink}}
        .bub{max-width:720px;padding:30px 40px 32px;border-radius:40px 40px 12px 40px;background:${OR};color:#101a36}
        .bub *{position:relative}
        .bub .w{opacity:.35}.bub .w.said{opacity:1}.bub .w.now{opacity:1;color:#fff}
        .bub .tx2{font-size:62px;font-weight:700;line-height:1.18;letter-spacing:-.01em}
        .bub.mk .w.mark{color:#fff;text-decoration:underline 7px #101a36;text-underline-offset:10px;text-decoration-skip-ink:none;opacity:1}
        .btr{text-align:right;font-size:42px;font-weight:600;color:${T.sub}}
        .note{padding:24px 36px;border-radius:32px;max-width:834px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 2px rgba(251,143,42,.35);font-size:42px;font-weight:700;line-height:1.25;text-align:center}
        .note *{position:relative}
        .note small{display:block;font-size:26px;font-weight:800;letter-spacing:.1em;color:${OR};margin-bottom:6px}
        .e1{left:${G.L}px;width:${G.W}px;top:316px;text-align:center;font-size:96px;font-weight:800;font-stretch:84%;letter-spacing:-.02em}
        .row{left:${G.L}px;width:${G.W}px;padding:20px 32px;border-radius:32px;background:${T.surface};display:flex;flex-direction:column;gap:6px}
        .row *{position:relative}
        .row b{font-size:42px;font-weight:700;line-height:1.2}
        .row small{font-size:34px;font-weight:500;color:${T.sub}}
      `);
      el.g1 = h("div", "glow", root);
      el.g2 = h("div", "glow", root);
      el.g2.style.background = OR;
      el.segs = segments(root, D.lines.length);
      el.hook = E.hook(root, [{ t: C.hook[0], size: 128 }, { t: C.hook[1], size: 128, color: OR, delay: 0.4 }, { t: C.hook[2], size: 72, weight: 700, color: T.sub, delay: 0.9 }], { center: 760 });
      el.ui = h("div", "ui", root);
      el.head = h("div", "head", el.ui, `<i class="av"><svg viewBox="0 0 24 24"><path fill="#101a36" d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2a1 1 0 011-.25 11.4 11.4 0 003.6.6 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.6 3.6a1 1 0 01-.25 1z"/></svg></i><b>${C.scene}</b><small>1/${D.lines.length}</small>`);
      el.headN = el.head.querySelector("small");
      // sohbet: her tur bir blok (balon + Türkçe + not)
      rounds = D.lines.map((l, i) => {
        const r = { l, tk: tok(l.de), plan: L[i] };
        r.blk = h("div", null, el.ui);
        r.blk.style.cssText = `left:${G.L}px;width:${G.W}px;top:0`;
        r.bub = h("div", "bub", r.blk);
        const tx = h("div", "tx2", r.bub);
        r.sp = words(tx, l.de);
        r.btr = h("div", "btr", r.blk, l.tr);
        r.note = h("div", "note", r.blk, `<small>${X.ui("tip")}</small>${l.tip.text}`);
        r.chips = r.tk.w.map((w, k) => ({ el: h("div", "chip", el.ui, k === 0 ? w.toLocaleLowerCase("de") : w), w }));
        return r;
      });
      el.inp = h("div", "inp", el.ui, `<span class="ph">${X.ui("placeholder")}</span><span class="tx"><span class="t"></span><i class="car"></i></span>`);
      el.ph = el.inp.querySelector(".ph");
      el.tx = el.inp.querySelector(".tx");
      el.txt = el.inp.querySelector(".t");
      el.car = el.inp.querySelector(".car");
      el.ring = h("div", "ring", el.ui, `<svg viewBox="0 0 ${SEND + 20} ${SEND + 20}"><circle cx="${SEND / 2 + 10}" cy="${SEND / 2 + 10}" r="${SEND / 2 + 6}" stroke="rgba(255,255,255,.12)"/><circle class="fg" cx="${SEND / 2 + 10}" cy="${SEND / 2 + 10}" r="${SEND / 2 + 6}" stroke="${OR}"/></svg>`);
      el.fg = el.ring.querySelector(".fg");
      el.send = h("div", "send", el.ui, `<svg viewBox="0 0 24 24"><path fill="#101a36" d="M3 20.5l18-8.5L3 3.5v6.6l12 1.9-12 1.9z"/></svg>`);
      el.e1 = h("div", "e1", root, SUMMARY);
      el.rows = D.lines.map((l) => h("div", "row", root, `<b>${l.de}</b><small>${l.tr}</small>`));
      el.outro = E.outro(root, C.outro);
      el.fade = h("div", "fade", root);
      el.hook.layout();
      // ölçüler: balon sağa yaslı, blok yükseklikleri; çipler yazı kutusunun üstünde ortalı satırlar
      rounds.forEach((r, i) => {
        const bw = r.bub.offsetWidth;
        r.bub.style.left = `${G.W - bw}px`;
        r.btr.style.cssText += `;left:0;width:${G.W}px;top:${r.bub.offsetHeight + 14}px`;
        const nt = r.bub.offsetHeight + 14 + r.btr.offsetHeight + 24;
        const nw = r.note.offsetWidth;
        r.note.style.left = `${Math.round(G.W / 2 - nw / 2 + (G.CX - G.L - G.W / 2))}px`;
        r.note.style.top = `${nt}px`;
        r.bh = nt + r.note.offsetHeight;
        r.bubH = r.bub.offsetHeight;
        // çipler
        const order = shuffle(r.chips.length, 401 + i * 59);
        const ws = order.map((k) => r.chips[k].el.offsetWidth);
        const rowsA = [[]];
        let w = 0;
        order.forEach((k, s) => {
          if (rowsA[rowsA.length - 1].length && w + CGAP + ws[s] > G.W) {
            rowsA.push([]);
            w = 0;
          }
          w += (rowsA[rowsA.length - 1].length ? CGAP : 0) + ws[s];
          rowsA[rowsA.length - 1].push(s);
        });
        const top = IN_Y - 96 - rowsA.length * CHIP_H - (rowsA.length - 1) * CGAP; // kutu iki satıra büyüse de çiplere değmez
        rowsA.forEach((row, ri) => {
          const rw = row.reduce((a, s) => a + ws[s], 0) + CGAP * (row.length - 1);
          let x = G.CX - rw / 2;
          row.forEach((s) => {
            const g = r.chips[order[s]];
            g.x = x;
            g.y = top + ri * (CHIP_H + CGAP);
            g.w0 = ws[s];
            x += ws[s] + CGAP;
          });
        });
        r.chipTop = top;
        // yazılı metin: k kelime yazıldığında genişlik (ilk harf büyük, sonda noktalama)
        r.typed = (k, final) => {
          const ws2 = r.tk.w.slice(0, k);
          return ws2.join(" ") + (final ? r.tk.punct : "");
        };
      });
      // özet satırları alt alta; kapanışın (1176) üstünde bitmezse yazılar birlikte küçülür (2–4 cümle sığar)
      const stack = () => {
        let y = 440;
        el.rows.forEach((x) => {
          x.style.top = `${y}px`;
          y += x.offsetHeight + 16;
        });
        return y - 16;
      };
      for (let k = 0; k < 6 && stack() > 1140; k++)
        el.rows.forEach((x) => x.querySelectorAll("b,small").forEach((e) => (e.style.fontSize = `${Math.floor(parseFloat(getComputedStyle(e).fontSize) * 0.92)}px`)));
    },

    render(t) {
      set(el.g1, { o: 0.45, x: -300 + Math.sin(t * 0.4) * 140, y: -260 + Math.cos(t * 0.33) * 110 });
      set(el.g2, { o: 0.12, x: 420 + Math.cos(t * 0.37) * 120, y: 1150 + Math.sin(t * 0.41) * 120 });
      const ho = HOOK - 0.35;
      el.hook.render(t, 0.05, ho);
      const ci = L.findIndex((r) => t >= r.a && t < r.b);
      set(el.segs.el, { o: p(t, HOOK - 0.2, 0.3) * (1 - p(t, END - 0.2, 0.3)) });
      el.segs.set(ci >= 0 ? ci : t >= END ? L.length : 0, ci >= 0 ? p(t, L[ci].a, L[ci].b - L[ci].a) : 0);
      const uk = p(t, HOOK - 0.25, 0.6);
      const uo = ease.inCubic(p(t, END, 0.4));
      set(el.ui, { o: Math.min(ease.outCubic(uk * 2), 1 - uo), y: (1 - ease.spring(uk)) * 160 - uo * 120 });
      el.headN.textContent = `${Math.max(1, ci + 1 || (t >= END ? L.length : 1))}/${L.length}`;

      // sohbet blokları: başlamış turlar yukarıdan aşağı; taşarsa hepsi yukarı kayar, üstte kalan söner
      let y = CHAT_TOP;
      const tops = rounds.map((r) => {
        const k = ease.outExpo(p(t, r.plan.send, 0.5));
        const at = y;
        y += (r.bh + 40) * k;
        return at;
      });
      // alt sınır: o an dağınık duran çipler 3 satıra çıkıp yükselirse sohbet onların üstünde biter
      const live = rounds.find((r) => t >= r.plan.a && t < r.plan.send);
      const bot = live ? Math.min(CHAT_BOT, live.chipTop - 56) : CHAT_BOT;
      const shift = Math.max(0, y - 40 - bot);
      rounds.forEach((r, i) => {
        const P = r.plan;
        const top = tops[i] - shift;
        const sk = p(t, P.send, 0.55);
        const room = E.clamp((top + r.bubH - CHAT_TOP + 40) / 160);
        r.blk.style.display = t >= P.send - 0.02 ? "" : "none";
        // balon yazı kutusundan çıkıp yukarı süzülür
        const fromY = IN_Y - top;
        set(r.blk, { o: Math.min(1, sk * 3) * room, y: top + (1 - ease.spring(sk)) * (fromY * 0.6), x: 0 });
        set(r.bub, { o: 1, s: 0.85 + ease.spring(sk) * 0.15 });
        r.bub.style.transformOrigin = "100% 100%";
        karaoke(r.sp, t, P.v, P.d);
        if (t < P.v) r.sp.forEach((s) => s.classList.remove("said", "now"));
        const tipOn = t >= P.tip;
        r.bub.classList.toggle("mk", tipOn);
        r.sp.forEach((s, k) => s.classList.toggle("mark", r.l.tip.mark.includes(k)));
        const tk = p(t, P.tr, 0.4);
        set(r.btr, { o: tk, y: (1 - ease.outCubic(tk)) * 12 });
        const nk = p(t, P.tip, 0.45);
        set(r.note, { o: ease.outCubic(nk * 1.5), s: 0.8 + ease.spring(nk) * 0.2 });

        // çipler: düşünme sırasında karışık, yazarken sırayla kutuya uçar
        r.chips.forEach((g, k) => {
          const shown = t >= P.a && t < P.send;
          g.el.style.display = shown ? "" : "none";
          if (!shown) return;
          const ik = p(t, P.a + 0.3 + k * 0.06, 0.45);
          const fly = p(t, P.type + k * P.step, 0.22);
          // hedef: kelime yazılmadan önceki satır sonu (sığmazsa alt satırın başı), kutunun iç alanı
          const before = k ? tw(r.typed(k) + " ") : 0;
          const lineW = IN_W - 80;
          const wrapped = before + tw(g.w) > lineW && k > 0;
          const tx = IN_X + 40 + (wrapped ? 0 : before);
          const ty = IN_Y + (IN_H - CHIP_H) / 2 + (wrapped ? 32 : 0);
          const x = g.x + (tx - g.x) * ease.inOutCubic(fly);
          const yy = g.y + (ty - g.y) * ease.inOutCubic(fly) - Math.sin(Math.PI * fly) * 80;
          set(g.el, { o: Math.min(ease.outCubic(ik * 2), 1 - p(fly, 0.75, 0.25)), x, y: yy + (1 - ease.spring(ik)) * 60, s: 1 - fly * 0.25 });
        });
      });

      // yazı kutusu: o anki turun yazılan kısmı
      const cur = rounds.find((r) => t >= r.plan.a && t < r.plan.b);
      let text = "";
      if (cur) {
        const P = cur.plan;
        const k = Math.max(0, Math.min(cur.tk.w.length, Math.floor((t - P.type) / P.step + 0.15)));
        text = t >= P.send ? "" : t >= P.type ? cur.typed(k, k === cur.tk.w.length) : "";
        // gönder halkası: düşünme süresi
        const C = 2 * Math.PI * (SEND / 2 + 6);
        el.fg.style.strokeDasharray = `${C}`;
        el.fg.style.strokeDashoffset = `${C * p(t, P.think, THINK)}`;
        set(el.ring, { o: p(t, P.think - 0.2, 0.2) * (1 - p(t, P.type, 0.2)), r: -90 });
        set(el.send, { s: 1 - Math.sin(Math.PI * p(t, P.send - 0.1, 0.3)) * 0.18 });
      } else set(el.ring, { o: 0 });
      el.txt.textContent = text;
      // kutu satır sayısına göre yukarı büyür (alt kenar sabit), metin kesilmez
      const lines = Math.max(1, Math.round(el.tx.offsetHeight / 64));
      const ih = IN_H + (lines - 1) * 64;
      el.inp.style.height = `${ih}px`;
      el.inp.style.top = `${IN_Y + IN_H - ih}px`;
      el.ph.style.opacity = text ? "0" : "1";
      el.car.style.opacity = Math.floor(t * 2.4) % 2 === 0 ? "1" : "0";

      set(el.e1, { o: p(t, END + 0.2, 0.4), y: (1 - ease.outCubic(p(t, END + 0.2, 0.5))) * 30 });
      el.rows.forEach((x, i) => {
        const k = p(t, END + 0.5 + i * 0.14, 0.5);
        set(x, { o: ease.outCubic(k * 1.5), x: (1 - ease.spring(k)) * 200 });
      });
      el.outro(t, END + 1.4);
      set(el.fade, { o: ease.inOutCubic(p(t, DUR - 0.4, 0.4)) });
    },
  };
});
