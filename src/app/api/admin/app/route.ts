import { NextResponse } from "next/server";
import { adminGate, adminWriteGate, logAdminAction, type AdminWriter } from "@/lib/admin";
import { sameOrigin } from "@/lib/auth/origin";
import { getUserId } from "@/lib/auth/server";
import { saveAppControl } from "@/lib/app-control";
import { resolveErrorGroup } from "@/lib/client-errors";
import { cleanUrl, parseAudience, previewAudience, startBroadcast, type BroadcastText } from "@/lib/push-broadcast";

export const dynamic = "force-dynamic";

/**
 * Uygulama işletimi — panelin yazma ucu (/admin/app): zorunlu/önerilen
 * güncelleme, bakım modu, mağaza bağlantıları, toplu bildirim.
 *
 * Premium ucuyla aynı iki kapı, aynı sırada: önce aynı-köken, sonra yetki.
 */
/**
 * YAZMA KAPISI VE İŞLEM KAYDI (lib/admin `adminWriteGate`, `logAdminAction`).
 * Eylemin seviyesi gövdeden okunuyor: "read" yalnız admin olmayı, "normal"
 * ayrıca hesapta iki adımlı doğrulamayı, "sensitive" bunlara ek olarak son
 * 12 saatte açılmış oturumu istiyor. Başarılı her yazma kayda düşüyor.
 */
const levelOf: (action: string, body: Record<string, unknown>) => "read" | "normal" | "sensitive" = (a, b) => (a === "preview_broadcast" ? "read" : a === "resolve_error" ? "normal" : a === "send_broadcast" && (b.audience as { test?: unknown } | undefined)?.test === true ? "normal" : "sensitive");

export async function POST(req: Request) {
  const peek = ((await req.clone().json().catch(() => ({}))) ?? {}) as Record<string, unknown>;
  const action = String(peek.action ?? "");
  const level = levelOf(action, peek);
  let email: string;
  let writer: AdminWriter | null = null;
  if (level === "read") {
    if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    const g = await adminGate();
    if (!g.ok || !g.email) return NextResponse.json({ error: "forbidden" }, { status: 403 });
    email = g.email;
  } else {
    const g = await adminWriteGate(req, level);
    if (!g.ok) return g.response;
    writer = g.admin;
    email = g.admin.email;
  }
  const res = await handle(req, { ok: true, email });
  if (writer && res.status < 400) {
    const target = [peek.userId, peek.refId, peek.doc, peek.id, peek.code].find((v) => typeof v === "string" || typeof v === "number");
    void logAdminAction(writer, `app.${action || "save"}`, target == null ? null : String(target), {
      ...(peek.locale ? { locale: peek.locale } : {}),
      ...(peek.days ? { days: peek.days } : {}),
      ...(peek.reason ? { reason: String(peek.reason).slice(0, 120) } : {}),
      ...(peek.note ? { note: String(peek.note).slice(0, 120) } : {}),
      ...(peek.audience ? { audience: peek.audience } : {}),
    });
  }
  return res;
}

async function handle(req: Request, gate: { ok: true; email: string }): Promise<NextResponse> {

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  try {
    switch (String(body.action ?? "")) {
      case "save_control":
        return NextResponse.json({ ok: true, control: await saveAppControl(body.control, gate.email) });
      case "preview_broadcast": {
        const counts = await previewAudience(parseAudience(body.audience), await getUserId());
        return NextResponse.json({ ok: true, counts });
      }
      case "send_broadcast": {
        const raw = (body.text ?? {}) as Record<string, { title?: unknown; body?: unknown } | undefined>;
        const clip = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");
        const text: BroadcastText = {
          tr: { title: clip(raw.tr?.title, 60), body: clip(raw.tr?.body, 180) },
          en: { title: clip(raw.en?.title, 60), body: clip(raw.en?.body, 180) },
          de: { title: clip(raw.de?.title, 60), body: clip(raw.de?.body, 180) },
        };
        const r = await startBroadcast({
          text,
          url: cleanUrl(body.url),
          audience: parseAudience(body.audience),
          adminEmail: gate.email,
          adminUserId: await getUserId(),
        });
        if ("error" in r) return NextResponse.json({ error: r.error }, { status: 409 });
        return NextResponse.json({ ok: true, ...r });
      }
      case "resolve_error": {
        const id = typeof body.id === "string" ? body.id.slice(0, 64) : "";
        if (!id) return NextResponse.json({ error: "bad_input" }, { status: 400 });
        await resolveErrorGroup(id);
        return NextResponse.json({ ok: true });
      }
      default:
        return NextResponse.json({ error: "unknown_action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[admin/app]", body.action, err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
