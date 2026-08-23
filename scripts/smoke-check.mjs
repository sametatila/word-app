import { chromium } from "playwright-core";

const BASE = process.env.BASE ?? "http://localhost:3001";
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome-stable" });
const page = await browser.newPage({ viewport: { width: 430, height: 1200 }, deviceScaleFactor: 2 });
const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message.split("\n")[0]}`));

async function shot(path, name, wait = 2500) {
  await page.goto(`${BASE}${path}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(wait);
  await page.screenshot({ path: `${process.env.OUT}/${name}.png`, fullPage: true });
  console.log(`${path} → ${name}.png`);
}

await shot("/learn", "learn");
await shot("/profile", "profile", 3500);
console.log(errors.length ? `HATALAR:\n${[...new Set(errors)].join("\n")}` : "konsol temiz");
await browser.close();
