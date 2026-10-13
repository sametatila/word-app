import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { studioGate } from "@/lib/studio-auth";

export const dynamic = "force-dynamic";

/**
 * Önizleme motoru: scripts/social/engine.js + bütün şablonlar, tek betik (sunucudaki üretimle aynı kod, aynı
 * checkout). ?f=yatay: yatay motor (scripts/social/yatay/motor.js) + yatay şablonlar (window.Y). Web CSP'si data:
 * resmini kabul etmiyor: doku ve ikon sitenin kendi dosyalarından.
 */
const cache = new Map<string, { key: string; body: string; etag: string }>();

function build(long: boolean) {
  const dir = path.join(process.cwd(), "scripts/social");
  const tpl = long ? path.join(dir, "yatay/sablonlar") : path.join(dir, "templates");
  const files = [path.join(dir, long ? "yatay/motor.js" : "engine.js"), ...readdirSync(tpl).filter((f) => f.endsWith(".js")).sort().map((f) => path.join(tpl, f))];
  const key = files.map((f) => `${f}:${statSync(f).mtimeMs}`).join("|");
  const hit = cache.get(String(long));
  if (hit?.key === key) return hit;
  const [engine, ...templates] = files.map((f) => readFileSync(f, "utf8"));
  const body = long
    ? `window.Y = { GRAIN: "/social/grain.svg", ICON: "/icon-192.png" };\n${engine}\n${templates.join("\n")}\nwindow.STUDIO_LONG_READY = true;\n`
    : `${engine}\nE.GRAIN = "/social/grain.svg"; E.ICON = "/icon-192.png";\n${templates.join("\n")}\nwindow.STUDIO_ENGINE_READY = true;\n`;
  const c = { key, body, etag: `"${createHash("sha1").update(body).digest("hex").slice(0, 16)}"` };
  cache.set(String(long), c);
  return c;
}

export async function GET(req: Request) {
  const g = await studioGate();
  if (!g.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const c = build(new URL(req.url).searchParams.get("f") === "yatay");
  if (req.headers.get("if-none-match") === c.etag) return new NextResponse(null, { status: 304, headers: { etag: c.etag } });
  return new NextResponse(c.body, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "private, no-cache", etag: c.etag } });
}
