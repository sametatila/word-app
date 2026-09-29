/*
  Mağaza karesinin HTML'i. Ölçüler kare genişliğinin yüzdesi (`u`) üzerinden:
  aynı yerleşim 1320'lik iPhone karesinde de 1440'lık Play karesinde de aynı
  oranda durur. Yerleşimin hesabı (cihaz nerede, büyüteç nereye) `frames.mjs`te;
  burası yalnız çizim.

  Tasarım sistemi (bir kampanya gibi okunsun diye her karede aynı):
  · Tek yazı tipi: Bricolage Grotesque (tanıtım sayfasıyla aynı), başlıkta dar
    genişlik (wdth 78) + 800 ağırlık. Dar kesim uzun Almanca/Türkçe sözcükleri
    satırda tutuyor, küçük önizlemede (arama sonucu) hâlâ okunuyor.
  · Zemin dönüşümlü: turuncu / koyu nötr / açık nötr. Yan yana iki kare
    birbirine karışmasın; mağaza şeridinde ritim.
  · Büyüteç: ham ekrandan kesilmiş GERÇEK bir parça (düzeltme satırı, sınav
    yüzdesi, beceri sekmeleri) büyütülüp cihazın önüne çıkar; cihazdaki kaynağı
    ince bir halka gösterir. Uydurma arayüz çizilmez.
  · Seviye çizgisi A1–C1 yalnız açılış karesinde ve öne çıkan grafikte: hesap
    B1'de, geçilen yol dolu, kalan kesikli (tanıtım sayfasındaki iz ile aynı fikir).
  · Süs yok: konfeti, yıldız, balon, gradyan yıkama, maskot eklenmez.
*/

import { pathToFileURL } from "node:url";
import path from "node:path";

const FONT_DIR = path.join(path.dirname(new URL(import.meta.url).pathname), "fonts");
const fontUrl = (f) => pathToFileURL(path.join(FONT_DIR, f)).href;

export const PALETTE = {
  orange: { bg: "#f87612", ink: "#1b1b1d", sub: "rgba(27,27,29,.78)", accent: "#1b1b1d", line: "#1b1b1d", shadow: "rgba(116,49,15,.55)", pill: "#1b1b1d", pillInk: "#fb8f2a" },
  dark: { bg: "#141416", ink: "#f6f6f4", sub: "#fb8f2a", accent: "#fb8f2a", line: "#fb8f2a", shadow: "rgba(0,0,0,.7)", pill: "#f87612", pillInk: "#141416" },
  light: { bg: "#f1f0ec", ink: "#1b1b1d", sub: "#b44909", accent: "#f87612", line: "#db5f08", shadow: "rgba(40,30,20,.32)", pill: "#1b1b1d", pillInk: "#fb8f2a" },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const px = (n) => `${Math.round(n * 100) / 100}px`;

/** Cihaz gövdesi: ekran + çerçeve + (varsa) kamera adası/deliği + kaynak halkası. */
function deviceHTML(d) {
  const { spec, img, sw, sh, x, y, rot = 0, ring } = d;
  const b = spec.bez * sw;
  const rs = spec.radius * sw;
  const W = sw + 2 * b;
  const H = sh + 2 * b;
  const parts = [];
  parts.push(`<div class="screen" style="left:${px(b)};top:${px(b)};width:${px(sw)};height:${px(sh)};border-radius:${px(rs)}"><img src="${img}" style="width:${px(sw)};height:${px(sh)}"></div>`);
  if (spec.island) {
    const iw = spec.island.w * sw, ih = spec.island.h * sw;
    parts.push(`<div class="island" style="left:${px(b + (sw - iw) / 2)};top:${px(b + spec.island.top * sw)};width:${px(iw)};height:${px(ih)}"></div>`);
  }
  if (spec.camera) {
    const cd = spec.camera.d * sw;
    const onBezel = spec.camera.bezel;
    const cx = b + sw / 2 - cd / 2;
    const cy = onBezel ? (b - cd) / 2 : b + spec.camera.top * sw;
    parts.push(`<div class="cam" style="left:${px(cx)};top:${px(cy)};width:${px(cd)};height:${px(cd)}"></div>`);
  }
  for (const btn of spec.buttons || []) {
    // Yan tuşlar: gövdenin dışına taşan ince çubuklar (oranlar gövde yüksekliğine göre).
    const bw = 0.012 * sw;
    const left = btn.side === "l" ? -bw * 0.7 : W - bw * 0.3;
    parts.push(`<div class="btn" style="left:${px(left)};top:${px(btn.y * H)};width:${px(bw)};height:${px(btn.h * H)}"></div>`);
  }
  if (ring) {
    const pad = 0.012 * sw;
    parts.push(`<div class="ring" style="left:${px(b + ring.x * sw - pad)};top:${px(b + ring.y * sh - pad)};width:${px(ring.w * sw + 2 * pad)};height:${px(ring.h * sh + 2 * pad)};border-width:${px(0.008 * sw)};border-radius:${px(0.03 * sw)}"></div>`);
  }
  const edge = spec.edge * sw;
  return `<div class="dev" style="left:${px(x)};top:${px(y)};width:${px(W)};height:${px(H)};border-radius:${px(rs + b)};--edge:${px(edge)};transform:rotate(${rot}deg)">${parts.join("")}</div>`;
}

function calloutHTML(c) {
  const { img, sw, sh, rect, zoom, x, y, radius, border, rot = 0 } = c;
  const iw = sw * zoom, ih = sh * zoom;
  const w = rect.w * iw, h = rect.h * ih;
  return `<div class="callout" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${px(h)};border-radius:${px(radius)};border-width:${px(border)};transform:rotate(${rot}deg)"><img src="${img}" style="width:${px(iw)};height:${px(ih)};left:${px(-rect.x * iw)};top:${px(-rect.y * ih)}"></div>`;
}

/** A1 ● — A2 ● — B1 ◉ ‥ B2 ○ ‥ C1 ○ : geçilen yol dolu, kalan kesikli. */
function ladderHTML(l) {
  const { levels, current, x, y, w, size, line } = l;
  const n = levels.length;
  const ci = Math.max(0, levels.indexOf(current));
  const step = w / (n - 1);
  const node = size * 0.62;
  const stroke = size * 0.16;
  const cy = size * 1.9; // etiketlerin altında çizgi
  const parts = [];
  // dolu kısım
  parts.push(`<div class="lad-solid" style="left:0;top:${px(cy - stroke / 2)};width:${px(ci * step)};height:${px(stroke)};background:${line}"></div>`);
  // kesikli kısım
  parts.push(`<div class="lad-dash" style="left:${px(ci * step)};top:${px(cy - stroke / 2)};width:${px((n - 1 - ci) * step)};height:${px(stroke)};--c:${line};--d:${px(stroke * 1.6)}"></div>`);
  levels.forEach((lv, i) => {
    const cx = i * step;
    const done = i < ci, cur = i === ci;
    const d = cur ? node * 1.45 : node;
    const style = done
      ? `background:${line};border:0`
      : cur
        ? `background:${line};box-shadow:0 0 0 ${px(stroke * 1.1)} var(--bg), 0 0 0 ${px(stroke * 2.1)} ${line}`
        : `background:var(--bg);border:${px(stroke)} solid ${line}`;
    parts.push(`<div class="lad-node" style="left:${px(cx - d / 2)};top:${px(cy - d / 2)};width:${px(d)};height:${px(d)};${style}"></div>`);
    const align = i === 0 ? "left" : i === n - 1 ? "right" : "center";
    const lx = align === "left" ? cx - node / 2 : align === "right" ? cx + node / 2 - size * 3 : cx - size * 1.5;
    parts.push(`<div class="lad-label" style="left:${px(lx)};top:0;width:${px(size * 3)};text-align:${align};font-size:${px(size)};color:${line};font-weight:${cur ? 800 : 700}">${esc(lv)}</div>`);
  });
  return `<div class="ladder" style="left:${px(x)};top:${px(y)};width:${px(w)};height:${px(cy + node)}">${parts.join("")}</div>`;
}

export function pageHTML(f) {
  const P = PALETTE[f.bg];
  const copy = f.copy;
  const pill = copy.pill ? `<span class="pill" style="background:${P.pill};color:${P.pillInk};font-size:${px(copy.sub * 0.86)}">${esc(copy.pill)}</span>` : "";
  const brand = f.brand
    ? `<div class="brand" style="left:${px(f.brand.x)};top:${px(f.brand.y)};font-size:${px(f.brand.size)}"><img src="${f.brand.icon}" style="width:${px(f.brand.size * 1.9)};height:${px(f.brand.size * 1.9)};border-radius:${px(f.brand.size * 0.44)}"><span>Lernomi</span></div>`
    : "";
  return `<!doctype html><html lang="${f.lang}"><head><meta charset="utf-8"><style>
@font-face{font-family:"Bricolage";src:url("${fontUrl("bricolage-latin.woff2")}") format("woff2");font-weight:200 800;font-stretch:75% 100%;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:"Bricolage";src:url("${fontUrl("bricolage-latin-ext.woff2")}") format("woff2");font-weight:200 800;font-stretch:75% 100%;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:${f.W}px;height:${f.H}px;overflow:hidden}
body{--bg:${P.bg};background:${P.bg};color:${P.ink};font-family:"Bricolage",sans-serif;font-optical-sizing:auto;position:relative;-webkit-font-smoothing:antialiased}
.copy{position:absolute;display:flex;flex-direction:column;gap:0}
h1{font-weight:800;font-stretch:84%;letter-spacing:-0.012em;line-height:.94;text-wrap:balance;hyphens:manual;overflow-wrap:normal;word-break:keep-all}
.sub{font-weight:600;font-stretch:88%;letter-spacing:-0.005em;line-height:1.14;color:${P.sub};text-wrap:balance;display:flex;flex-wrap:wrap;align-items:center;gap:.4em}
.pill{display:inline-block;font-weight:800;font-stretch:90%;letter-spacing:.01em;padding:.16em .62em .2em;border-radius:999px;line-height:1.1}
.dev{position:absolute;background:#0d0d0f;box-shadow:inset 0 0 0 var(--edge) #3a3a3e, inset 0 0 0 calc(var(--edge)*2.2) #16161a, 0 ${px(f.u * 3)} ${px(f.u * 6)} ${px(-f.u)} ${P.shadow}, 0 ${px(f.u * 1)} ${px(f.u * 2)} ${P.shadow};transform-origin:50% 40%}
.dev .screen{position:absolute;overflow:hidden;background:#fff}
.dev .screen img{display:block}
.dev .island{position:absolute;background:#000;border-radius:999px}
.dev .cam{position:absolute;background:#050507;border-radius:50%;box-shadow:inset 0 0 0 1px #202026}
.dev .btn{position:absolute;background:#2a2a2e;border-radius:3px}
.dev .ring{position:absolute;border-style:solid;border-color:${P.accent === "#1b1b1d" ? "#f87612" : P.accent};box-shadow:0 0 0 ${px(f.u * 0.35)} rgba(248,118,18,.18)}
.callout{position:absolute;overflow:hidden;background:#fff;border-style:solid;border-color:${P.accent === "#1b1b1d" ? "#1b1b1d" : P.accent};box-shadow:0 ${px(f.u * 2.6)} ${px(f.u * 5)} ${px(-f.u * 0.6)} ${P.shadow}, 0 ${px(f.u * 0.6)} ${px(f.u * 1.2)} rgba(0,0,0,.22)}
.callout img{position:absolute;display:block;max-width:none}
.ladder{position:absolute}
.ladder>div{position:absolute}
.lad-dash{background:repeating-linear-gradient(90deg,var(--c) 0 var(--d),transparent var(--d) calc(var(--d)*2))}
.lad-node{border-radius:50%;box-sizing:border-box}
.lad-label{font-stretch:85%;line-height:1;letter-spacing:.01em}
.brand{position:absolute;display:flex;align-items:center;gap:.5em;font-weight:800;font-stretch:90%;letter-spacing:-.01em;color:${P.ink}}
</style></head><body>
<div id="stage" style="position:absolute;left:0;top:0;width:${f.W}px;height:${f.H}px">
${f.devices.map(deviceHTML).join("\n")}
${f.callout ? calloutHTML(f.callout) : ""}
</div>
<div class="copy" id="copy" style="left:${px(copy.x)};top:${px(copy.y)};width:${px(copy.w)};max-height:${px(copy.maxH)}">
<h1 id="h" style="font-size:${px(copy.h1)}">${esc(copy.h)}</h1>
<div class="sub" id="s" style="font-size:${px(copy.sub)};margin-top:${px(copy.sub * 0.7)}">${pill}<span>${esc(copy.s)}</span></div>
</div>
${f.ladder ? `<div id="ladwrap">${ladderHTML(f.ladder)}</div>` : ""}
${brand}
<script>
// Sığdır: başlık kutuya (yükseklik) ve en uzun sözcük satıra sığana dek küçülür.
(async () => {
  await document.fonts.ready;
  await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
  const copy = document.getElementById("copy"), h = document.getElementById("h"), s = document.getElementById("s");
  const maxH = ${copy.maxH}, minH1 = ${copy.h1 * 0.6};
  let fs = ${copy.h1};
  const words = () => { const r = document.createRange(); let over = false; r.selectNodeContents(h); for (const rect of r.getClientRects()) if (rect.right > h.getBoundingClientRect().right + 1) over = true; return over || h.scrollWidth > h.clientWidth + 1; };
  const lines = () => Math.round(h.getBoundingClientRect().height / (parseFloat(getComputedStyle(h).fontSize) * 0.93));
  while (fs > minH1 && (copy.scrollHeight > maxH + 1 || words() || lines() > ${copy.maxLines})) { fs -= 2; h.style.fontSize = fs + "px"; }
  const lad = document.querySelector(".ladder");
  if (lad && ${f.ladderFollow ? "true" : "false"}) lad.style.top = (copy.getBoundingClientRect().bottom + ${f.ladder ? f.ladder.gap || 0 : 0}) + "px";
  // Cihazı yazının altına çek: başlık kısa kaldıysa aradaki boşluk kapanır (yalnız yukarı).
  ${f.pull ? `{
    const last = (lad || copy).getBoundingClientRect().bottom;
    const delta = last + ${f.pull.gap} - ${f.pull.top};
    if (delta < 0) document.getElementById("stage").style.transform = "translateY(" + Math.max(delta, -${f.pull.max}) + "px)";
  }` : ""}
  window.__fit = { fs, lines: lines(), h: copy.scrollHeight, over: copy.scrollHeight > maxH + 1 || words() };
  window.__ready = true;
})();
</script>
</body></html>`;
}
