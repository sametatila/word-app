import { NextResponse } from "next/server";
import { adminGate } from "@/lib/admin";
import { sameOrigin } from "@/lib/auth/origin";
import { getUserId } from "@/lib/auth/server";
import { saveAppControl } from "@/lib/app-control";
import { cleanUrl, parseAudience, previewAudience, startBroadcast, type BroadcastText } from "@/lib/push-broadcast";

export const dynamic = "force-dynamic";

/**
 * Uygulama işletimi — panelin yazma ucu (/admin/app): zorunlu/önerilen
 * güncelleme, bakım modu, mağaza bağlantıları, toplu bildirim.
 *
 * Premium ucuyla aynı iki kapı, aynı sırada: önce aynı-köken, sonra yetki.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const gate = await adminGate();
  if (!gate.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });

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
      default:
        return NextResponse.json({ error: "unknown_action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[admin/app]", body.action, err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
