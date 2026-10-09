/*
  Sayfa birleştirici: motor + veri + şablonlar tek HTML'de (atölye galerisi ve kare kare dışa aktarma aynı motoru
  kullanır). Her şablon ayrı <script>: birinin hatası ötekileri düşürmesin; sözdizimi bozuk olan uyarıyla atlanır.
*/
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";
import { ROOT } from "./content.mjs";
import { TPL_DIR } from "./episodes.mjs";

export const SRC = path.join(ROOT, "scripts/social");
export const OUT = path.join(ROOT, ".shots/social"); // git dışı
// Mac'te sistem Chrome'u; sunucuda (Linux) Playwright'ın kendi tarayıcısı (PLAYWRIGHT_BROWSERS_PATH), executablePath yok.
export const CHROME = process.env.CHROME_PATH || (process.platform === "darwin" ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" : undefined);
export const playwright = () => createRequire(import.meta.url)(path.join(ROOT, "node_modules/playwright-core"));
/**
 * Video üretimi ve denetim için tarayıcı. Mac: sistem Chrome'u; Linux sunucusu: Playwright'ın TAM Chromium'u
 * (channel "chromium"; sadeleştirilmiş headless shell degil, Mac'le aynı çizim). Renk profili iki yerde de sRGB sabit.
 */
export const launchBrowser = () => playwright().chromium.launch({ ...(CHROME ? { executablePath: CHROME } : { channel: "chromium" }), args: ["--force-color-profile=srgb"] });

const esc = (s) => s.replaceAll("</script", "<\\/script");

/**
 * Yazı tipleri, sayfaya gömülü (public/social/fonts, web stüdyosuyla aynı dosyalar). Dış ağ yok: sunucudaki üretim ve
 * yerel araçlar her yerde aynı kareyi çizer; Google Fonts yanıt vermese de video bozulmaz.
 */
export function fontCss() {
  const dir = path.join(ROOT, "public/social/fonts");
  return fs.readFileSync(path.join(dir, "fonts.css"), "utf8").replace(/url\(([\w.-]+\.woff2)\)/g, (m, f) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(dir, f)).toString("base64")})`);
}

/** Uygulama ikonu (imza ve TikTok katmanı), 160 px PNG veri adresi. */
export function iconUri() {
  // sunucuda (SOCIAL_DIR) checkout'a yazılmaz; Mac'te .shots/social/cache
  const png = path.join(process.env.SOCIAL_DIR ? path.join(process.env.SOCIAL_DIR, "cache") : path.join(OUT, "cache"), "icon-160.png");
  if (!fs.existsSync(png)) {
    fs.mkdirSync(path.dirname(png), { recursive: true });
    const src = path.join(ROOT, "mobile/ios/Lernomi/Images.xcassets/AppIcon.appiconset/AppIcon-1024.png");
    // macOS: sips (önceki videolarla birebir aynı ikon); Linux sunucusu: ffmpeg (sips yok)
    const r = process.platform === "darwin" ? spawnSync("sips", ["-Z", "160", src, "--out", png]) : spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-i", src, "-vf", "scale=160:160:flags=lanczos", png]);
    if (r.status !== 0 || !fs.existsSync(png)) throw new Error(`ikon küçültülemedi: ${r.stderr?.toString() || r.error?.message || ""}`);
  }
  return `data:image/png;base64,${fs.readFileSync(png).toString("base64")}`;
}

/** Şablon betikleri; dönüş: { html, ok: [şablon] }. */
export function templateScripts(templates) {
  const ok = [];
  const html = [...new Set(templates)]
    .sort()
    .map((t) => {
      const src = fs.readFileSync(path.join(TPL_DIR, `${t}.js`), "utf8");
      try {
        new Function(src);
      } catch (e) {
        console.warn(`! sözdizimi hatası, atlandı: ${t}.js: ${e.message}`);
        return "";
      }
      ok.push(t);
      return esc(src);
    })
    .filter(Boolean)
    .join("\n</script>\n<script>\n");
  return { html, ok };
}

/**
 * shell: scripts/social/ altındaki kabuk (gallery.html / render.html), yer tutucular /*ENGINE*\/, /*DATA*\/, /*VIDEOS*\/.
 * data: şablon kimliği → içerik (sayfada E.data); meta: sayfaya ek alanlar (E.POSTERS, E.EPISODES…).
 */
export function buildPage(shell, { data, clips, templates, meta = {} }) {
  const { html, ok } = templateScripts(templates);
  for (const t of Object.keys(data)) if (!ok.includes(t)) delete data[t];
  const extra = Object.entries(meta).map(([k, v]) => `E.${k}=${JSON.stringify(v)};`).join("");
  const page = fs
    .readFileSync(path.join(SRC, shell), "utf8")
    .replace("/*FONTS*/", () => fontCss())
    .replace("/*ENGINE*/", () => esc(fs.readFileSync(path.join(SRC, "engine.js"), "utf8")))
    .replace("/*DATA*/", () => esc(`window.CLIPS=${JSON.stringify(clips)};E.data=${JSON.stringify(data)};E.ICON=${JSON.stringify(iconUri())};${extra}`))
    .replace("/*VIDEOS*/", () => html);
  return { page, ok };
}

/** Yerelde açılacak tam belge (yayında iskeleti Artifact ekliyor). */
export const localDoc = (page) => `<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>\n${page}\n</body></html>`;
