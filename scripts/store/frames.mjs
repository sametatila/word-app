#!/usr/bin/env node
/*
  MAĞAZA KARELERİ: ham ekran görüntüsü + docs/store/plan/frames.json → PNG.

  Her mağaza, her yerelleştirme, her ekran için bir HTML sayfası kurar
  (`template.mjs`), Chrome'da (Playwright) tam piksel ölçüsünde çizer, alfa
  kanalını atar (Play 24 bit PNG ister, App Store saydamlık kabul etmez).

    npm run store:frames                                   # hepsi
    npm run store:frames -- --store appstore-iphone --locale tr-TR
    npm run store:frames -- --screen conversation --raw /yol/raw

  Girdi (`--raw`, varsayılan docs/store/raw): <cihaz>/<set>/light/<ekran>.png
  (ya da <cihaz>/<set>/<ekran>.png). cihaz: iphone, ipad, android-phone,
  android-tablet; set: tr-de, en-de, de-en. Çıktı (`--out`, varsayılan
  docs/store/out, git dışı): <mağaza>/<yerel>/NN-<ekran>.png ve _sheets/
  (kontrol için küçük önizleme tabakaları).

  Kural: App Store karesi yalnız iOS ham görüntüsünden, Play karesi yalnız
  Android'den (README "Kurallar"). `--fallback android-phone=iphone` yalnız
  yerleşim provası içindir; o kareler yüklenmez.
*/

import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL, fileURLToPath } from "node:url";
import { pageHTML, PALETTE } from "./template.mjs";

const require = createRequire(import.meta.url);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sharp = require(path.join(ROOT, "node_modules/sharp"));
const { chromium } = require(path.join(ROOT, "node_modules/playwright-core"));

const CHROME = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ICON = path.join(ROOT, "mobile/ios/Lernomi/Images.xcassets/AppIcon.appiconset/AppIcon-1024.png");

// ---------- argümanlar ----------
const argv = process.argv.slice(2);
const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : def;
};
const list = (v) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : null);
const CONFIG = path.resolve(ROOT, opt("config", "docs/store/plan/frames.json"));
const RAW = path.resolve(ROOT, opt("raw", process.env.STORE_RAW || "docs/store/raw"));
const OUT = path.resolve(ROOT, opt("out", "docs/store/out"));
const onlyStores = list(opt("store"));
const onlyLocales = list(opt("locale"));
const onlyScreens = list(opt("screen"));
const fallback = Object.fromEntries((list(opt("fallback")) || []).map((p) => p.split("=")));
const noSheets = argv.includes("--no-sheets");

const cfg = JSON.parse(fs.readFileSync(CONFIG, "utf8"));

// ---------- cihaz gövdeleri (oranlar ekran genişliğine göre) ----------
const DEVICES = {
  // iPhone 6.9": ince çerçeve, Dynamic Island, yan tuşlar. Ham görüntü iOS'un
  // kendi durum çubuğunu (9:41) taşıyor; ada ortada onun üstüne oturur.
  iphone: {
    bez: 0.03, radius: 0.13, edge: 0.006,
    island: { w: 0.286, h: 0.084, top: 0.025 },
    buttons: [
      { side: "l", y: 0.17, h: 0.035 }, { side: "l", y: 0.235, h: 0.07 }, { side: "l", y: 0.32, h: 0.07 },
      { side: "r", y: 0.26, h: 0.11 },
    ],
  },
  // Play telefon: nötr Android gövdesi (Apple cihazı değil), delik kamera.
  android: {
    bez: 0.028, radius: 0.075, edge: 0.005,
    camera: { d: 0.034, top: 0.022 },
    buttons: [{ side: "r", y: 0.2, h: 0.1 }, { side: "r", y: 0.34, h: 0.055 }],
    // Emülatörün durum çubuğu kenara yapışık (saat x≈12 px): gövdenin köşesi "9:41"i ":41" diye kesiyordu.
    // Gerçek telefonda köşe payı var; çubuğun iki yarısı içeri kaydırılır (içerik aynı). h: yüksekliğe, inset: genişliğe oran.
    statusBar: { h: 0.0265, inset: 0.04 },
  },
  ipad: { bez: 0.024, radius: 0.024, edge: 0.0028, camera: { d: 0.005, bezel: true } },
  "android-tablet": { bez: 0.02, radius: 0.02, edge: 0.0028, camera: { d: 0.005, bezel: true }, statusBar: { h: 0.03, inset: 0.016 } },
};

// ---------- yardımcılar ----------
function rawPath(device, set, screen) {
  const tries = [];
  // Bir kare birden çok ham ada razı olabilir (ör. günlük tur ekranı yoksa ana ekrandaki günlük tur kutusu).
  const names = cfg.screens[screen]?.sources || [screen];
  for (const dev of [device, fallback[device]].filter(Boolean)) {
    for (const n of names) tries.push(path.join(RAW, dev, set, "light", `${n}.png`), path.join(RAW, dev, set, `${n}.png`));
  }
  return tries.find((p) => fs.existsSync(p)) || null;
}

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ---------- büyüteç: metne çapalı kırpım (macOS Vision OCR) ----------
// Elle girilen oranlar her yeni çekimde kayıyordu (ekran yeniden çekilince düzeltme satırı başka
// yükseklikte). Ekranın `callout` tanımı bir çapa metni (düzenli ifade, üç dilin karşılığı) ve
// satır yüksekliği cinsinden bir alan veriyor; kırpım her ham görüntüde OCR'la bulunur. Önbellek
// dosya içeriğine göre (`os.tmpdir()/lernomi-ocr`). `callouts["<cihaz>/<set>/<ekran>"]` elle
// verilirse o geçerli (çapa bulunamayan ekran için kaçış yolu).
const OCR_DIR = path.join(os.tmpdir(), "lernomi-ocr");
let ocrBin = null;
function ocr(file) {
  const key = crypto.createHash("sha1").update(fs.readFileSync(file)).digest("hex");
  const cache = path.join(OCR_DIR, `${key}.json`);
  if (fs.existsSync(cache)) return JSON.parse(fs.readFileSync(cache, "utf8"));
  fs.mkdirSync(OCR_DIR, { recursive: true });
  if (!ocrBin) {
    const src = path.join(ROOT, "scripts/store/ocr.swift");
    ocrBin = path.join(OCR_DIR, `ocr-${crypto.createHash("sha1").update(fs.readFileSync(src)).digest("hex").slice(0, 10)}`);
    if (!fs.existsSync(ocrBin)) execFileSync("swiftc", ["-O", "-o", ocrBin, src], { stdio: "inherit" });
  }
  const rows = Object.values(JSON.parse(execFileSync(ocrBin, [file], { maxBuffer: 16 << 20 }).toString()))[0] || [];
  fs.writeFileSync(cache, JSON.stringify(rows));
  return rows;
}

// ---------- büyüteç: bileşen kutusu (piksel) ----------
// Kırpım OCR satırlarından tahmin edilince kartın kenarını ortadan kesiyor, yarım satır alıyordu
// (2026-10-01, Samet: "kaymış, kırpılmış"). Artık çapa metninin İÇİNDE DURDUĞU arayüz bileşeni
// (kart, balon, sekme kutusu) pikselden bulunuyor: sayfa zemininden ayrılan bağlı bölge. `row`:
// aynı satırda yan yana duran eş boy kutular (beceri sekmeleri) tek parça alınır.
const PIX = new Map();
async function loadPixels(file) {
  if (PIX.has(file)) return;
  const meta = await sharp(file).metadata();
  const w = Math.round(meta.width / 2), h = Math.round(meta.height / 2);
  const data = await sharp(file).resize(w, h).removeAlpha().raw().toBuffer();
  PIX.set(file, { data, w, h });
}

function componentRect(file, a, spec) {
  const P = PIX.get(file);
  if (!P) return null;
  const { data, w, h } = P;
  const at = (x, y) => (y * w + x) * 3;
  // Sayfa zemini: sol kenar şeridinin ortancası (kartlar kenardan içeride).
  const xs = Math.max(1, Math.round(0.012 * w)), samples = [[], [], []];
  // Yerel zemin: çapanın çevresindeki kenar şeridi (zemin ekranın altına doğru açılabiliyor).
  const ay = (a.y + a.h / 2) * h;
  for (let y = Math.max(0, Math.round(ay - 0.08 * h)); y < Math.min(h, Math.round(ay + 0.08 * h)); y += 2) for (let c = 0; c < 3; c++) samples[c].push(data[at(xs, y) + c]);
  const bg = samples.map((v) => v.sort((p, q) => p - q)[v.length >> 1]);
  // Bileşen = zeminden AÇIK yüzey (kartlar beyaz). Gölge zeminden koyu olduğu için iki kartı
  // birleştirmiyor (günlük turda soru kartının gölgesi ilk şıkka değiyordu); karttaki koyu yazı
  // delik olarak kalıyor, kartın dış sınırını bozmuyor.
  const bgSum = bg[0] + bg[1] + bg[2];
  const inMask = (x, y) => { const i = at(x, y); return data[i] + data[i + 1] + data[i + 2] - bgSum > 21; };
  const seen = new Uint8Array(w * h);
  const fill = (sx, sy) => {
    if (!inMask(sx, sy) || seen[sy * w + sx]) return null;
    let x0 = sx, x1 = sx, y0 = sy, y1 = sy, n = 0;
    const st = [sy * w + sx]; seen[sy * w + sx] = 1;
    while (st.length) {
      const p = st.pop(), x = p % w, y = (p / w) | 0; n++;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const q = ny * w + nx;
        if (!seen[q] && inMask(nx, ny)) { seen[q] = 1; st.push(q); }
      }
    }
    return { x0, x1, y0, y1, n };
  };
  // Başlangıç: çapa satırının içinde maskeye düşen ilk nokta.
  // Başlangıç: çapa satırı, sonra yukarı doğru (düzeltme satırı balonun içinde gri bir şeritte:
  // beyaz yüzey satırın üstünde). Bulunan bileşen çapayı İÇERMELİ; yoksa aramaya devam.
  let box = null;
  const ax0 = a.x * w, ax1 = (a.x + a.w) * w, ay0 = a.y * h, ay1 = (a.y + a.h) * h, lh = a.h * h;
  const holds = (b) => b && b.x0 <= ax0 + 1 && b.x1 >= ax1 - 1 && b.y0 <= ay0 + 1 && b.y1 >= ay1 - 1;
  const starts = [ (ay0 + ay1) / 2, ay1 + 1, ay0 - 1 ];
  for (let k = 1; k <= 8; k++) starts.push(ay0 - k * 0.5 * lh, ay1 + k * 0.5 * lh);
  search: for (const yy0 of starts) {
    const yy = Math.round(yy0);
    if (yy < 0 || yy >= h) continue;
    for (let x = Math.round(ax0); x <= Math.round(ax1); x += 2) {
      const c = fill(x, yy);
      if (holds(c)) { box = c; break search; }
    }
  }
  if (!box) return null;
  if (spec.row) {
    // Aynı yükseklikteki komşu kutular: merkez satırı boyunca, en çok %5 genişlik boşlukla.
    const mid = Math.round((box.y0 + box.y1) / 2), bh = box.y1 - box.y0;
    for (const dir of [1, -1]) {
      let x = dir > 0 ? box.x1 + 1 : box.x0 - 1, gap = 0;
      while (x >= 0 && x < w && gap < 0.05 * w) {
        const c = !seen[mid * w + x] && fill(x, mid);
        if (c) {
          const ch = c.y1 - c.y0, ov = Math.min(c.y1, box.y1) - Math.max(c.y0, box.y0);
          if (Math.abs(ch - bh) <= 0.25 * bh && ov >= 0.7 * bh) {
            box = { x0: Math.min(box.x0, c.x0), x1: Math.max(box.x1, c.x1), y0: Math.min(box.y0, c.y0), y1: Math.max(box.y1, c.y1) };
            x = dir > 0 ? c.x1 + 1 : c.x0 - 1; gap = 0; continue;
          }
          break;
        }
        if (seen[mid * w + x] && !(x >= box.x0 && x <= box.x1)) { x += dir; continue; }
        x += dir; gap++;
      }
    }
  }
  const bw = (box.x1 - box.x0) / w, bhN = (box.y1 - box.y0) / h;
  // Akıl denetimi: ekranın tamamı ya da bir kırıntı bileşen değildir.
  if (bw > 0.97 || bw * bhN > 0.5 || bw < 0.15) return null;
  const pad = 0.014; // kartın gölgesi ve köşesi tam görünsün
  const rx0 = clamp(box.x0 / w - pad, 0, 1), ry0 = clamp(box.y0 / h - pad * (w / h), 0, 1);
  const rx1 = clamp(box.x1 / w + pad, 0, 1), ry1 = clamp(box.y1 / h + pad * (w / h), 0, 1);
  return { x: rx0, y: ry0, w: rx1 - rx0, h: ry1 - ry0 };
}

/**
 * Çapa satırını bul, alanı kur: çapanın `above`/`below` satır yüksekliği yukarısı ve aşağısı;
 * merkezi bu aralıktaki OCR satırları yatayda birleşir (sekme sırası, ölçüt kartı), sonra `pad`.
 */
function anchoredRect(spec, file) {
  const re = new RegExp(spec.anchor, "iu");
  const rows = ocr(file);
  const a = rows.find((r) => re.test(r.t.trim()));
  if (!a) return null;
  if (spec.card) {
    const r = componentRect(file, a, spec);
    if (r) return { ...r, card: true };
  }
  const lh = a.h;
  // `chain`: kartın kalanı. Alttaki satırlar arada `chain` satır yüksekliğinden kısa boşluk kaldıkça
  // eklenir (ölçüt sayısı, cümle satırı ekrandan ekrana değişiyor; sabit yükseklik keserdi).
  let bottom = a.y + a.h;
  if (spec.chain) {
    for (const r of [...rows].sort((p, q) => p.y - q.y)) {
      if (r === a || r.y + r.h / 2 <= a.y + a.h / 2) continue;
      if (r.y - bottom > spec.chain * lh) break;
      bottom = Math.max(bottom, r.y + r.h);
    }
  }
  const y0 = a.y - (spec.above ?? 0) * lh, y1 = bottom + (spec.below ?? 0) * lh;
  let x0 = a.x, x1 = a.x + a.w;
  for (const r of rows) {
    const cy = r.y + r.h / 2;
    if (cy >= y0 && cy <= y1) { x0 = Math.min(x0, r.x); x1 = Math.max(x1, r.x + r.w); }
  }
  const [px, py] = spec.pad ?? [0.6, 0.6];
  const rx0 = clamp(x0 - px * lh, 0, 1), rx1 = clamp(x1 + px * lh, 0, 1);
  const ry0 = clamp(y0 - py * lh, 0, 1), ry1 = clamp(y1 + py * lh, 0, 1);
  return { x: rx0, y: ry0, w: rx1 - rx0, h: ry1 - ry0 };
}

function calloutFor(device, set, screen, src, name) {
  const c = cfg.callouts?.[`${device}/${set}/${screen}`] || (fallback[device] && cfg.callouts?.[`${fallback[device]}/${set}/${screen}`]);
  if (c) {
    const [x, y, w, h] = c.rect;
    return { rect: { x, y, w, h }, zoom: c.zoom ?? 1.4, dx: c.dx ?? 0, dy: c.dy ?? 0 };
  }
  // Ham adına göre (ör. günlük tur yoksa ana ekran) ilk tutan tanım; cihaz ayarı (`by`) üstüne biner.
  const base = name;
  const specs = [].concat(cfg.screens[screen]?.callout || []).filter((s) => !s.source || s.source === base);
  for (const s0 of specs) {
    const s = { ...s0, ...(s0.by?.[device] || {}) };
    const rect = anchoredRect(s, src);
    if (rect) return { rect, zoom: s.zoom ?? 1.4, dx: s.dx ?? 0, dy: s.dy ?? 0, card: !!rect.card };
  }
  return null;
}

/** Kare düzeni: portre telefon, yatay tablet ya da öne çıkan grafik. */
function layout({ st, screen, idx, lang, set, img, src, name, iw, ih }) {
  const W = st.w, H = st.h, u = W / 100;
  const sc = cfg.screens[screen];
  // Öne çıkan grafik kendi ekranının altyazısını değil, açılış cümlesini taşır.
  const cap = st.captionFrom ? cfg.screens[st.captionFrom].caption[lang] : sc.caption[lang];
  const kind = st.kind || (W > H ? "landscape" : "portrait");
  const bg = kind === "feature" ? st.bg || "orange" : cfg.backgrounds[idx % cfg.backgrounds.length];
  const spec = DEVICES[st.frame];
  const aspect = ih / iw;
  const pos = { ...(sc.pos || {}), ...((sc.posBy || {})[kind] || {}) };
  const f = { W, H, u, bg, lang, devices: [], ladderFollow: true };

  let dev, box; // box: büyütecin dolaşabileceği alan
  if (kind === "portrait") {
    const tall = H / W > 2; // iPhone 6.9" (2.17) ile Play 9:16 (1.78) arası fark
    const dw = (pos.w ?? (tall ? 78 : 70)) * u;
    const sw = dw / (1 + 2 * spec.bez);
    const sh = sw * aspect;
    const top = (sc.ladder ? (tall ? 0.335 : 0.4) : tall ? 0.285 : 0.33) * H + (pos.dy ?? 0) * u;
    const x = (W - dw) / 2 + (pos.dx ?? 0) * u;
    dev = { spec, img, sw, sh, x, y: top, rot: pos.rot ?? 0 };
    f.pull = { top, gap: (tall ? 9 : 7) * u, max: 30 * u };
    f.copy = { x: 7 * u, y: (tall ? 8.5 : 7) * u, w: 86 * u, h1: (tall ? 13 : 11.4) * u, sub: (tall ? 4.6 : 4.1) * u, maxLines: 3, maxH: top - (tall ? 12 : 11) * u - (sc.ladder ? 11 * u : 0) };
    if (sc.ladder) f.ladder = { levels: cfg.levels, current: cfg.currentLevel, x: 8.5 * u, y: 0, w: 83 * u, size: 3.4 * u, gap: 4.2 * u, line: PALETTE[bg].line };
    box = { x0: 3.5 * u, x1: W - 3.5 * u, y0: top + 2 * u, y1: H - 4 * u };
  } else if (kind === "landscape") {
    const wide = W / H > 1.5; // Play 16:9; iPad 4:3
    let sw, sh, x, y;
    if (aspect < 1) {
      // Cihaz karenin İÇİNDE (eskiden sağdan taşıyordu: konuşmada kullanıcının cümlesi ve
      // "Eller serbest" kesiliyordu). Yazı sütununun sağında kalan genişlik, dikeyde ortada.
      const dw = Math.min((pos.w ?? 62) * u, (0.86 * H * (1 + 2 * spec.bez)) / (aspect + 2 * spec.bez));
      sw = dw / (1 + 2 * spec.bez);
      sh = sw * aspect;
      x = W - 2.5 * u - dw + (pos.bleed ?? 0) * u;
      y = (H - sh - 2 * spec.bez * sw) / 2;
    } else {
      sh = 0.94 * H;
      sw = sh / aspect;
      x = 58 * u;
      y = 0.1 * H;
    }
    dev = { spec, img, sw, sh, x, y: y + (pos.dy ?? 0) * u, rot: 0 };
    f.copy = { x: 5.5 * u, y: (wide ? 0.13 : 0.15) * H, w: 28.5 * u, h1: (wide ? 5.3 : 5.9) * u, sub: (wide ? 1.95 : 2.15) * u, maxLines: 4, maxH: (sc.ladder ? 0.5 : 0.62) * H };
    if (sc.ladder) f.ladder = { levels: cfg.levels, current: cfg.currentLevel, x: 6 * u, y: 0, w: 28 * u, size: 1.6 * u, gap: 2.6 * u, line: PALETTE[bg].line };
    box = { x0: 35 * u, x1: W - 1.5 * u, y0: 0.04 * H, y1: H - 0.04 * H };
  } else {
    // Öne çıkan grafik 1024×500: solda marka + cümle + A1–C1, sağda telefonda gerçek ekran.
    const dw = 27 * u;
    const sw = dw / (1 + 2 * spec.bez);
    const sh = sw * aspect;
    dev = { spec, img, sw, sh, x: 64 * u, y: 5.2 * u, rot: pos.featureRot ?? 0 };
    f.copy = { x: 5.5 * u, y: 15.5 * u, w: 52 * u, h1: 7.4 * u, sub: 0, maxLines: 2, maxH: 22 * u };
    f.ladder = { levels: cfg.levels, current: cfg.currentLevel, x: 6 * u, y: 0, w: 40 * u, size: 2.3 * u, gap: 4.5 * u, line: PALETTE[bg].line };
    f.brand = { x: 5.5 * u, y: 4.5 * u, size: 2.6 * u, icon: pathToFileURL(ICON).href };
    box = { x0: 50 * u, x1: W - 2 * u, y0: 2 * u, y1: H - 2 * u };
  }

  const b = dev.spec.bez * dev.sw;
  const c = kind === "feature" ? null : calloutFor(st.device, set, screen, src, name);
  if (c && c.card) {
    // Büyütme sığacak kadar: mercek cihaz gövdesinden en çok biraz taşar, karenin alanından hiç.
    const maxW = Math.min(box.x1 - box.x0, (dev.sw + 2 * b) * 1.1), maxH = 0.5 * dev.sh;
    c.zoom = Math.max(1.1, Math.min(c.zoom, maxW / (c.rect.w * dev.sw), maxH / (c.rect.h * dev.sh)));
  }
  if (c) {
    const w = c.rect.w * dev.sw * c.zoom, h = c.rect.h * dev.sh * c.zoom;
    let sx = dev.x + b + (c.rect.x + c.rect.w / 2) * dev.sw;
    let sy = dev.y + b + (c.rect.y + c.rect.h / 2) * dev.sh;
    if (dev.rot) {
      // Eğik cihaz: kaynağın merkezini gövdenin dönme noktası (50% 40%) çevresinde döndür; büyüteç de aynı açıyla durur.
      const ox = dev.x + (dev.sw + 2 * b) / 2, oy = dev.y + (dev.sh + 2 * b) * 0.4;
      const a = (dev.rot * Math.PI) / 180, dx = sx - ox, dy = sy - oy;
      sx = ox + dx * Math.cos(a) - dy * Math.sin(a);
      sy = oy + dx * Math.sin(a) + dy * Math.cos(a);
    }
    let xC = clamp(sx - w / 2 + c.dx * u, box.x0, box.x1 - w);
    const r0Of = (rc) => ({ x: dev.x + b + rc.x * dev.sw, y: dev.y + b + rc.y * dev.sh });
    // Dikey yer: büyüteç kaynağın üstüne tam oturunca komşu satırları YARIM örtüyordu (üstte ve altta
    // kesik yazı). Kaynağın yakınında hiçbir satırı yarım kesmeyen ilk konum seçilir (önce aşağı);
    // kaynak ayrıca halkayla işaretli. Bulunamazsa ortalanır. `dy` elle kaydırma.
    const rows = ocr(src);
    const toScreen = (X, Y) => ({ x: (X - dev.x - b) / dev.sw, y: (Y - dev.y - b) / dev.sh });
    // Satır kutuları OCR'da sıkı: harf uçları taşmasın diye her satır yarım satır büyütülür.
    // Önce hiçbir satıra değmeyen konum; yoksa satırları ya tam örten ya hiç değmeyen konum.
    const src0 = c.rect;
    const cut = (Y, strict) => {
      const p0 = toScreen(xC, Y), p1 = toScreen(xC + w, Y + h);
      return rows.some((r) => {
        const m = 0.5 * r.h, ry0 = r.y - m, ry1 = r.y + r.h + m;
        // Kaynağın kendi satırı: tam örtülüyorsa sorun yok (strict'te bile), yarım örtülüyorsa kusur.
        const inSrc = r.y + r.h / 2 >= src0.y && r.y + r.h / 2 <= src0.y + src0.h;
        const ox = Math.min(p1.x, r.x + r.w) - Math.max(p0.x, r.x), oy = Math.min(p1.y, ry1) - Math.max(p0.y, ry0);
        if (ox <= 0 || oy <= 0) return false;
        const covered = ry0 >= p0.y && ry1 <= p1.y && r.x >= p0.x && r.x + r.w <= p1.x;
        return inSrc ? !covered : strict || !covered;
      });
    };
    const y0 = sy - h / 2 + c.dy * u, step = 0.004 * dev.sh;
    let y = clamp(y0, box.y0, box.y1 - h);
    // Kart modunda mercek kaynağın ÜSTÜNDE: kenarlardan biri kaynağın kenarıyla çakışır (üst/orta/alt ×
    // sol/orta/sağ hiza). Komşu yazıyı en az yarım kesen hiza seçilir, eşitlikte ortalı: ortadan
    // büyüyen mercek iPad'de üstteki kullanıcı mesajını yarım kesiyordu.
    if (c.card) {
      const sx0 = r0Of(c.rect).x, sy0 = r0Of(c.rect).y, sW = c.rect.w * dev.sw, sH = c.rect.h * dev.sh;
      const xsC = [sx - w / 2, sx0, sx0 + sW - w].map((v) => clamp(v, box.x0, box.x1 - w));
      const ysC = [sy - h / 2, sy0, sy0 + sH - h].map((v) => clamp(v, box.y0, box.y1 - h));
      const halfCut = (X, Y) => {
        const p0 = toScreen(X, Y), p1 = toScreen(X + w, Y + h);
        return rows.filter((r) => {
          const cyR = r.y + r.h / 2, cxR = r.x + r.w / 2;
          if (cxR >= src0.x && cxR <= src0.x + src0.w && cyR >= src0.y && cyR <= src0.y + src0.h) return false;
          const ox = Math.min(p1.x, r.x + r.w) - Math.max(p0.x, r.x), oy = Math.min(p1.y, r.y + r.h) - Math.max(p0.y, r.y);
          if (ox <= 0 || oy <= 0) return false;
          return !(r.y >= p0.y && r.y + r.h <= p1.y && r.x >= p0.x && r.x + r.w <= p1.x);
        }).length;
      };
      let best = null;
      ysC.forEach((Y, yi) => xsC.forEach((X, xi) => {
        const score = halfCut(X, Y) * 10 + (yi ? 1 : 0) + (xi ? 1 : 0);
        if (!best || score < best.score) best = { score, X, Y };
      }));
      y = best.Y; xC = best.X;
    }
    else if (!c.dy) {
      search: for (const strict of [true, false]) {
        for (let i = 0; i <= 80; i++) {
          const cand = clamp(y0 + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * step, box.y0, box.y1 - h);
          if (!cut(cand, strict)) { y = cand; break search; }
        }
      }
    }
    // Halka yalnız büyüteç kaynaktan AYRI durduğunda: üstüne bindiğinde kenarı altından taşıp kusur gibi görünüyordu.
    const r0 = { x: dev.x + b + c.rect.x * dev.sw, y: dev.y + b + c.rect.y * dev.sh, w: c.rect.w * dev.sw, h: c.rect.h * dev.sh };
    const m = 0.02 * dev.sw;
    const x = xC;
    const apart = y > r0.y + r0.h + m || y + h < r0.y - m || x > r0.x + r0.w + m || x + w < r0.x - m;
    if (apart) dev.ring = c.rect;
    const k = kind === "portrait" ? 1 : kind === "landscape" ? 0.45 : 0.5;
    f.callout = { img, sw: dev.sw, sh: dev.sh, rect: c.rect, zoom: c.zoom, x, y, radius: 2.2 * u * k, border: 0.55 * u * k, rot: dev.rot };
  }
  f.devices.push(dev);
  f.copy.h = cap.h;
  f.copy.s = kind === "feature" ? "" : cap.s;
  f.copy.pill = sc.premium && kind !== "feature" ? cfg.premium[lang] : null;
  return f;
}

// ---------- çizim ----------
async function render(page, f, outFile) {
  const html = pageHTML(f);
  const tmp = path.join(os.tmpdir(), `lernomi-frame-${process.pid}.html`);
  fs.writeFileSync(tmp, html);
  await page.setViewportSize({ width: f.W, height: f.H });
  await page.goto(pathToFileURL(tmp).href);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
  const fit = await page.evaluate(() => window.__fit);
  const buf = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: f.W, height: f.H } });
  const bg = PALETTE[f.bg].bg;
  await sharp(buf).flatten({ background: bg }).removeAlpha().png({ compressionLevel: 9 }).toFile(outFile);
  const meta = await sharp(outFile).metadata();
  if (meta.width !== f.W || meta.height !== f.H || meta.channels !== 3) throw new Error(`${outFile}: ${meta.width}x${meta.height} ch${meta.channels}`);
  return fit;
}

async function sheet(files, outFile, h, cols) {
  if (!files.length) return;
  const thumbs = await Promise.all(files.map((f) => sharp(f).resize({ height: h }).png().toBuffer({ resolveWithObject: true })));
  const gap = Math.round(h * 0.06);
  const tw = Math.max(...thumbs.map((t) => t.info.width));
  const rows = Math.ceil(thumbs.length / cols);
  const W = cols * tw + (cols + 1) * gap, H = rows * h + (rows + 1) * gap;
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } })
    .composite(thumbs.map((t, i) => ({ input: t.data, left: gap + (i % cols) * (tw + gap), top: gap + Math.floor(i / cols) * (h + gap) })))
    .png()
    .toFile(outFile);
}

/** Durum çubuğunu köşeden içeri al (bkz. DEVICES.android.statusBar). Sonuç geçici dosya, ham görüntüye dokunulmaz. */
async function insetStatusBar(file, sb) {
  if (!sb) return file;
  const { width: iw, height: ih } = await sharp(file).metadata();
  const band = Math.round(sb.h * ih), dx = Math.round(sb.inset * iw), half = Math.floor(iw / 2);
  const { data } = await sharp(file).extract({ left: 1, top: band - 2, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true });
  const [r, g, b] = data;
  const left = await sharp(file).extract({ left: 0, top: 0, width: half - dx, height: band }).png().toBuffer();
  const right = await sharp(file).extract({ left: half + dx, top: 0, width: iw - half - dx, height: band }).png().toBuffer();
  const out = path.join(os.tmpdir(), "lernomi-sb", `${crypto.createHash("sha1").update(fs.readFileSync(file)).digest("hex")}-${sb.h}-${sb.inset}.png`);
  if (fs.existsSync(out)) return out;
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const fill = await sharp({ create: { width: iw, height: band, channels: 3, background: { r, g, b } } }).png().toBuffer();
  await sharp(file).composite([{ input: fill, left: 0, top: 0 }, { input: left, left: dx, top: 0 }, { input: right, left: half, top: 0 }]).png().toFile(out);
  return out;
}

async function main() {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  const gaps = [];
  const warn = [];
  const noCallout = new Set();
  const produced = {};
  for (const [store, st] of Object.entries(cfg.stores)) {
    if (onlyStores && !onlyStores.includes(store)) continue;
    for (const [locale, loc] of Object.entries(cfg.locales)) {
      if (onlyLocales && !onlyLocales.includes(locale)) continue;
      const dir = path.join(OUT, store, locale);
      fs.mkdirSync(dir, { recursive: true });
      // Dile özgü sıra (ör. en/de'de sınav karesi arama sonucundaki ilk üçün dışında): `screensByLocale`.
      const screens = st.screensByLocale?.[locale] || st.screens;
      for (const [i, screen] of screens.entries()) {
        if (onlyScreens && !onlyScreens.includes(screen)) continue;
        const src0 = rawPath(st.device, loc.set, screen);
        if (!src0) {
          gaps.push(`${store}/${locale}: ${st.device}/${loc.set}/${screen}.png yok`);
          continue;
        }
        const src = await insetStatusBar(src0, DEVICES[st.frame].statusBar);
        const meta = await sharp(src).metadata();
        for (const n of cfg.screens[screen]?.sources || [screen]) {
          const p = rawPath(st.device, loc.set, n);
          if (p) await loadPixels(p === src0 ? src : p);
        }
        await loadPixels(src);
        const f = layout({ st, screen, idx: i, lang: loc.lang, set: loc.set, img: pathToFileURL(fs.realpathSync(src)).href, src, name: path.basename(src0, ".png"), iw: meta.width, ih: meta.height });
        if (!f.callout && st.kind !== "feature" && !cfg.screens[screen].noCallout) noCallout.add(`${st.device}/${loc.set}/${screen}`);
        const name = st.kind === "feature" ? "feature.png" : `${String(i + 1).padStart(2, "0")}-${screen}.png`;
        const outFile = path.join(dir, name);
        const fit = await render(page, f, outFile);
        if (fit.over) warn.push(`${store}/${locale}/${screen}: başlık sığmadı (${fit.fs}px)`);
        (produced[store] ||= []).push(outFile);
        console.log(`${path.relative(ROOT, outFile)}  h1=${fit.fs}px ${fit.lines} satır${src0.includes(`/${st.device}/`) ? "" : "  [YEDEK CİHAZ]"}`);
      }
    }
  }
  await browser.close();

  if (!noSheets) {
    const sd = path.join(OUT, "_sheets");
    fs.mkdirSync(sd, { recursive: true });
    for (const [store, files] of Object.entries(produced)) {
      const st = cfg.stores[store];
      const n = st.screens.length;
      await sheet(files, path.join(sd, `${store}.png`), st.w > st.h ? 360 : 640, st.kind === "feature" ? 1 : n);
      if (st.kind !== "feature") {
        // Arama sonucu boyu: ilk üç kare ~200 px yükseklikte okunuyor mu?
        const first3 = files.filter((f) => /\/0[123]-/.test(f));
        await sheet(first3, path.join(sd, `${store}-search.png`), st.w > st.h ? 140 : 220, 3);
      }
    }
  }
  if (noCallout.size) console.log(`\nBÜYÜTEÇSİZ (çapa metni bulunamadı; frames.json "callout" / "callouts"): ${[...noCallout].join(", ")}`);
  if (warn.length) console.log("\nUYARI:\n  " + warn.join("\n  "));
  if (gaps.length) console.log("\nEKSİK HAM GÖRÜNTÜ:\n  " + gaps.join("\n  "));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
