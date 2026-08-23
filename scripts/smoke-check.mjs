import { chromium } from "playwright-core";

/**
 * Gerçek tarayıcıda sayfa açar, ekran görüntüsü alır ve konsol hatalarını
 * toplar. Tip denetimi bir bileşenin ÇİZİLDİĞİNİ söylemiyor.
 *
 *   BASE=http://localhost:3001 OUT=/tmp PATHS=/learn,/profile node scripts/smoke-check.mjs
 */
const BASE = process.env.BASE ?? "http://localhost:3000";
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome-stable" });
const page = await browser.newPage({ viewport: { width: 430, height: 1000 }, deviceScaleFactor: 2 });

for (const path of (process.env.PATHS ?? "/learn").split(",")) {
  const errs = [];
  page.removeAllListeners("pageerror");
  page.removeAllListeners("console");
  page.on("pageerror", (e) => errs.push(e.message.split("\n")[0]));
  page.on("console", (m) => { if (m.type() === "error") errs.push("console: " + m.text().split("\n")[0]); });

  await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  const name = path.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "root";
  await page.screenshot({ path: `${process.env.OUT}/${name}.png`, fullPage: true });
  const hyd = errs.filter((e) => /[Hh]ydrat/.test(e));
  console.log(
    `${path} → ${name}.png · ${hyd.length ? "HİDRASYON ×" + hyd.length : errs.length ? "hata: " + errs[0].slice(0, 90) : "temiz"}`,
  );
}
await browser.close();
