import { NextResponse } from "next/server";
import { and, eq, sql } from "drizzle-orm";
import { adminWriteGate, logAdminAction } from "@/lib/admin";
import { db } from "@/lib/db";
import { contentReleaseItems, contentReleases } from "@/lib/db/schema";
import { isItemId, isPackId, FULL_PACK, ORDER_ITEM } from "@/lib/content/ids";
import { disableItem, enableItem, promote } from "@/lib/content/publish";
import { pointer } from "@/lib/content/read";

export const dynamic = "force-dynamic";

/**
 * İçerik yayını — panelin yazma ucu (/admin/content, /admin/learning).
 *
 * PANEL İÇERİK YAZMIYOR (AGENTS.md "İçerik teslim hattı"). Üç eylem var:
 *   disable  bozuk maddeyi kapatır (sürümden bağımsız, göstergeye anında düşer)
 *   enable   kapatmayı kaldırır
 *   promote  bir sürümü canlıya alır — geri almanın tek yolu
 *
 * Kapatma "normal" (geri alınabilir, tek madde), sürüm çevirmek "sensitive":
 * bütün kullanıcıların içeriğini değiştiriyor. Kapılar ve işlem kaydı öteki
 * admin uçlarıyla aynı (lib/admin `adminWriteGate`, `logAdminAction`).
 *
 * YAZIM HATASINA KARŞI: kapatılacak madde canlı sürümde gerçekten var mı diye
 * bakılıyor. Yanlış yazılmış bir kimlik "kapatıldı" deyip hiçbir şeyi
 * kapatmamalı. Tek istisna `quiz/` paketi: haftalık quiz yayın hattında değil
 * (`lib/content/packs` `quizPack`), maddeleri sürüm tablosunda hiç yok.
 */
const REASONS = new Set(["broken", "reported", "legal", "other"]);

export async function POST(req: Request) {
  const peek = ((await req.clone().json().catch(() => ({}))) ?? {}) as Record<string, unknown>;
  const action = String(peek.action ?? "");
  const g = await adminWriteGate(req, action === "promote" ? "sensitive" : "normal");
  if (!g.ok) return g.response;
  const res = await handle(peek, g.admin.email);
  if (res.status < 400) {
    const target = action === "promote" ? String(peek.version ?? "") : `${String(peek.pack ?? "")}:${String(peek.item ?? "")}`;
    void logAdminAction(g.admin, `content.${action}`, target, peek.reason ? { reason: String(peek.reason).slice(0, 40) } : undefined);
  }
  return res;
}

async function handle(body: Record<string, unknown>, email: string): Promise<NextResponse> {
  const action = String(body.action ?? "");
  try {
    if (action === "promote") {
      const version = Number(body.version);
      if (!Number.isInteger(version) || version <= 0) return NextResponse.json({ error: "bad_input" }, { status: 400 });
      const ok = await promote(version, email);
      if (!ok) return NextResponse.json({ error: "not_found" }, { status: 404 });
      return NextResponse.json({ ok: true, live: version });
    }

    const pack = body.pack;
    const item = body.item;
    if (!isPackId(pack) || !isItemId(item) || item === FULL_PACK || item === ORDER_ITEM) {
      return NextResponse.json({ error: "bad_input" }, { status: 400 });
    }

    if (action === "disable") {
      const reason = REASONS.has(String(body.reason)) ? String(body.reason) : "other";
      if (!pack.startsWith("quiz/")) {
        const { r } = await pointer();
        const [live] = r
          ? [{ version: r }]
          : await db.select({ version: contentReleases.version }).from(contentReleases).where(eq(contentReleases.status, "live")).limit(1);
        if (!live) return NextResponse.json({ error: "not_found" }, { status: 404 });
        const [found] = await db
          .select({ n: sql<number>`1` })
          .from(contentReleaseItems)
          .where(and(eq(contentReleaseItems.release, live.version), eq(contentReleaseItems.pack, pack), eq(contentReleaseItems.item, item)))
          .limit(1);
        if (!found) return NextResponse.json({ error: "not_found" }, { status: 404 });
      }
      await disableItem(pack, item, reason, email);
      return NextResponse.json({ ok: true });
    }

    if (action === "enable") {
      await enableItem(pack, item);
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "bad_action" }, { status: 400 });
  } catch (err) {
    console.error("[admin/content]", action, err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
