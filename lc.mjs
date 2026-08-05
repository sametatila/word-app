import { chromium, devices } from "playwright-core";

const BASE = "http://localhost:3200";
// Küçük ve alt güvenli alanı büyük olan cihazlar: sorunun göründüğü yer.
const PROFILES = [
  { name: "iPhone SE     ", ...devices["iPhone SE"] },
  { name: "iPhone 14 Pro ", ...devices["iPhone 14 Pro"] },
  { name: "Pixel 5       ", ...devices["Pixel 5"] },
  { name: "Galaxy S9+    ", ...devices["Galaxy S9+"] },
];
const PAGES = ["/learn", "/dersler", "/skills", "/words", "/profile"];

const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome-stable", headless: true, args: ["--no-sandbox"] });
for (const p of PROFILES) {
  const ctx = await browser.newContext({ ...p });
  const page = await ctx.newPage();
  const rows = [];
  for (const path of PAGES) {
    try {
      await page.goto(BASE + path, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(2500);
      const r = await page.evaluate(() => {
        const main = document.querySelector("main");
        const nav = document.querySelector("nav.fixed");
        if (!main) return null;
        const navTop = nav ? nav.getBoundingClientRect().top : window.innerHeight;
        // Gezinmenin altında kalan görünür içerik var mı?
        let hidden = 0;
        for (const el of main.querySelectorAll("*")) {
          if (!el.textContent?.trim()) continue;
          if (el.children.length) continue;
          const b = el.getBoundingClientRect();
          if (b.height === 0) continue;
          if (b.top < navTop && b.bottom > navTop + 2) hidden++;
        }
        return {
          scrollable: main.scrollHeight > main.clientHeight + 1,
          overflow: main.scrollHeight - main.clientHeight,
          hidden,
          navH: nav ? Math.round(nav.getBoundingClientRect().height) : 0,
          padBottom: Math.round(parseFloat(getComputedStyle(main).paddingBottom)),
        };
      });
      rows.push(`${path.padEnd(9)} kayan:${r.scrollable ? "E" : "H"} taşma:${String(r.overflow).padStart(4)}px altta-kalan:${r.hidden} nav:${r.navH}px pad:${r.padBottom}px`);
    } catch (e) {
      rows.push(`${path.padEnd(9)} HATA ${String(e.message).slice(0, 40)}`);
    }
  }
  console.log(`\n${p.name}`);
  for (const r of rows) console.log("  " + r);
  await ctx.close();
}
await browser.close();
