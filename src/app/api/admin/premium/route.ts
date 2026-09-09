import { NextResponse } from "next/server";
import { adminGate } from "@/lib/admin";
import { sameOrigin } from "@/lib/auth/origin";
import { savePremiumConfig, premiumConfig, grantPremiumDays, revokeEntitlement, resolveEntitlement } from "@/lib/premium";
import { createCodes, listCodes, setCodeDisabled } from "@/lib/premium/promo";
import { topReferrers } from "@/lib/premium/referral";

export const dynamic = "force-dynamic";

/**
 * Premium yönetimi — panelin yazma ucu.
 *
 * TEK UÇ, `action` ile ayrılıyor. Sebep: hepsi aynı yetkiye (ADMIN_EMAILS) ve
 * aynı denetim satırına bağlı; altı ayrı rota dosyası aynı kapı kontrolünü altı
 * kez kopyalamak olurdu ve kopyalanan bir yetki kontrolü er geç birinde eksik
 * kalır.
 *
 * Her yazma `premium_grants` defterine kim yaptığını yazıyor (`actor` = admin
 * e-postası): elle verilen premium'un kim tarafından verildiği sorulabilir olmalı.
 */
export async function POST(req: Request) {
  /*
    Aynı-köken denetimi yetkiden ÖNCE: bu uç premium veriyor, promo kodu üretiyor
    ve yapılandırma yazıyor — yani en pahalı yazma yüzeyi admin'inki. Oturum
    çerezi `SameSite=Lax` olduğu için çapraz-site bir POST'ta çerez zaten
    gitmiyor; buradaki denetim o savunma tek başına kalmasın diye. Uygulamanın
    geri kalanındaki mutasyon uçlarının hepsinde bu katman vardı, admin'de yoktu.
  */
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const gate = await adminGate();
  if (!gate.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const action = String(body.action ?? "");

  try {
    switch (action) {
      case "save_config": {
        const cfg = await savePremiumConfig(body.config, gate.email);
        return NextResponse.json({ ok: true, config: cfg });
      }
      case "reset_config": {
        // Boş nesne = her alan varsayılana düşer (parse ediciye bakılırsa).
        const cfg = await savePremiumConfig({}, gate.email);
        return NextResponse.json({ ok: true, config: cfg });
      }
      case "create_codes": {
        const codes = await createCodes({
          days: Number(body.days ?? 90),
          count: Number(body.count ?? 1),
          maxUses: Number(body.maxUses ?? 1),
          campaign: (body.campaign as string) || null,
          note: (body.note as string) || null,
          code: (body.code as string) || null,
          expiresAt: body.expiresAt ? new Date(String(body.expiresAt)) : null,
          createdBy: gate.email,
        });
        return NextResponse.json({ ok: true, codes });
      }
      case "toggle_code": {
        await setCodeDisabled(Number(body.id), Boolean(body.disabled));
        return NextResponse.json({ ok: true });
      }
      case "grant_days": {
        const userId = String(body.userId ?? "");
        const days = Number(body.days ?? 0);
        if (!userId || !Number.isFinite(days) || days <= 0) {
          return NextResponse.json({ error: "bad_input" }, { status: 400 });
        }
        await grantPremiumDays(userId, days, { actor: gate.email, note: (body.note as string) || null });
        return NextResponse.json({ ok: true, entitlement: await resolveEntitlement(userId) });
      }
      case "revoke": {
        const userId = String(body.userId ?? "");
        if (!userId) return NextResponse.json({ error: "bad_input" }, { status: 400 });
        await revokeEntitlement(userId, gate.email, (body.note as string) || undefined);
        return NextResponse.json({ ok: true });
      }
      default:
        return NextResponse.json({ error: "unknown_action" }, { status: 400 });
    }
  } catch (err) {
    console.error("[admin/premium]", action, err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}

/** Panelin okuduğu her şey: yapılandırma, kodlar, davet sıralaması. */
export async function GET() {
  const gate = await adminGate();
  if (!gate.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const [config, codes, referrers] = await Promise.all([
    premiumConfig(),
    listCodes().catch(() => []),
    topReferrers().catch(() => []),
  ]);
  return NextResponse.json({ config, codes, referrers }, { headers: { "cache-control": "no-store" } });
}
