import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { studioGate } from "@/lib/studio-auth";

export const dynamic = "force-dynamic";

/**
 * Önizleme motoru: scripts/social/engine.js + bütün şablonlar, tek betik (sunucudaki üretimle aynı kod, aynı
 * checkout). Web CSP'si data: resmini kabul etmiyor: doku ve ikon sitenin kendi dosyalarından.
 */
let cache: { key: string; body: string; etag: string } | null = null;

function build() {
  const dir = path.join(process.cwd(), "scripts/social");
  const tpl = path.join(dir, "templates");
  const files = [path.join(dir, "engine.js"), ...readdirSync(tpl).filter((f) => f.endsWith(".js")).sort().map((f) => path.join(tpl, f))];
  const key = files.map((f) => `${f}:${statSync(f).mtimeMs}`).join("|");
  if (cache?.key === key) return cache;
  const [engine, ...templates] = files.map((f) => readFileSync(f, "utf8"));
  const body = `${engine}\nE.GRAIN = "/social/grain.svg"; E.ICON = "/icon-192.png";\n${templates.join("\n")}\nwindow.STUDIO_ENGINE_READY = true;\n`;
  cache = { key, body, etag: `"${createHash("sha1").update(body).digest("hex").slice(0, 16)}"` };
  return cache;
}

export async function GET(req: Request) {
  const g = await studioGate();
  if (!g.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const c = build();
  if (req.headers.get("if-none-match") === c.etag) return new NextResponse(null, { status: 304, headers: { etag: c.etag } });
  return new NextResponse(c.body, { headers: { "content-type": "text/javascript; charset=utf-8", "cache-control": "private, no-cache", etag: c.etag } });
}
