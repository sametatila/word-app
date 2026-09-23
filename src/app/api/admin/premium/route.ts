import { NextResponse } from "next/server";
import { adminGate, adminWriteGate, logAdminAction, type AdminWriter } from "@/lib/admin";
import { sameOrigin } from "@/lib/auth/origin";
import { savePremiumConfig, premiumConfig, grantPremiumDays, revokeEntitlement, findPremiumAccount } from "@/lib/premium";
import { createCodes, listCodes, setCodeDisabled } from "@/lib/premium/promo";
import { createStoreTrialCodes, listStoreTrialCodes } from "@/lib/premium/store-trial";
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
/**
 * YAZMA KAPISI VE İŞLEM KAYDI (lib/admin `adminWriteGate`, `logAdminAction`).
 * Eylemin seviyesi gövdeden okunuyor: "read" yalnız admin olmayı, "normal"
 * ayrıca hesapta iki adımlı doğrulamayı, "sensitive" bunlara ek olarak son
 * 12 saatte açılmış oturumu istiyor. Başarılı her yazma kayda düşüyor.
 */
const levelOf: (action: string, body: Record<string, unknown>) => "read" | "normal" | "sensitive" = (a) => (a === "find_user" ? "read" : a === "grant_days" || a === "revoke" ? "sensitive" : "normal");

export async function POST(req: Request) {
  /*
    Aynı-köken denetimi yetkiden ÖNCE: bu uç premium veriyor, promo kodu üretiyor
    ve yapılandırma yazıyor — yani en pahalı yazma yüzeyi admin'inki. Oturum
    çerezi `SameSite=Lax` olduğu için çapraz-site bir POST'ta çerez zaten
    gitmiyor; buradaki denetim o savunma tek başına kalmasın diye. Uygulamanın
    geri kalanındaki mutasyon uçlarının hepsinde bu katman vardı, admin'de yoktu.
  */
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
    void logAdminAction(writer, `premium.${action || "save"}`, target == null ? null : String(target), {
      ...(peek.locale ? { locale: peek.locale } : {}),
      ...(peek.days ? { days: peek.days } : {}),
      ...(peek.reason ? { reason: String(peek.reason).slice(0, 120) } : {}),
      ...(peek.note ? { note: String(peek.note).slice(0, 120) } : {}),
      ...(peek.audience ? { audience: peek.audience } : {}),
      ...(peek.campaign ? { campaign: String(peek.campaign).slice(0, 80) } : {}),
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
      /*
        GRUP KODLARI (mağaza denemesi) — kampanya başına, grup başına bir kod.
        Gün vermiyorlar (lib/premium/store-trial); kapatma `toggle_code` ile
        aynı yol, çünkü ikisi de `promo_codes` satırı.
      */
      case "create_trial_codes": {
        const groups = Array.isArray(body.groups) ? body.groups.map(String) : String(body.groups ?? "").split("\n");
        const campaign = String(body.campaign ?? "").trim();
        if (!campaign || !groups.some((g) => g.trim())) return NextResponse.json({ error: "bad_input" }, { status: 400 });
        const codes = await createStoreTrialCodes({
          campaign,
          groups,
          prefix: (body.prefix as string) || null,
          maxUses: Number(body.maxUses ?? 500),
          expiresAt: body.expiresAt ? new Date(String(body.expiresAt)) : null,
          createdBy: gate.email,
        });
        return NextResponse.json({ ok: true, codes, list: await listStoreTrialCodes() });
      }
      case "toggle_code": {
        await setCodeDisabled(Number(body.id), Boolean(body.disabled));
        return NextResponse.json({ ok: true });
      }
      /*
        HESAP ARAMA — yazma değil, ama aynı kapının arkasında: kimin premium
        olduğu ve kimin verdiği kişisel veri, herkese açık bir uç olamaz.

        Salt okunur olması ÖNEMLİ: `findPremiumAccount` `resolveEntitlement`
        çağırmıyor, çünkü o fonksiyon bekleyen bonusun penceresini başlatıyor.
        Bir hesaba BAKMAK, o hesabın hediye saatini çalıştırmamalı.
      */
      case "find_user": {
        const account = await findPremiumAccount(String(body.query ?? ""));
        if (!account) return NextResponse.json({ error: "not_found" }, { status: 404 });
        return NextResponse.json({ ok: true, account });
      }
      case "grant_days": {
        const userId = String(body.userId ?? "");
        const days = Number(body.days ?? 0);
        if (!userId || !Number.isFinite(days) || days <= 0) {
          return NextResponse.json({ error: "bad_input" }, { status: 400 });
        }
        await grantPremiumDays(userId, days, { actor: gate.email, note: (body.note as string) || null });
        // Yazmadan SONRAKİ hâli dönüyor: panel kendi hesabını tutmak zorunda
        // kalmasın. Aynı kaydı iki yerde hesaplamak, ikisinin ayrışması demek.
        return NextResponse.json({ ok: true, account: await findPremiumAccount(userId) });
      }
      case "revoke": {
        const userId = String(body.userId ?? "");
        if (!userId) return NextResponse.json({ error: "bad_input" }, { status: 400 });
        await revokeEntitlement(userId, gate.email, (body.note as string) || undefined);
        return NextResponse.json({ ok: true, account: await findPremiumAccount(userId) });
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
