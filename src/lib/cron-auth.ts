import "server-only";
import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

/**
 * Cron uçlarının (/api/cron/*) ortak kapısı.
 *
 * Sır `CRON_SECRET`; karşılaştırma sabit zamanlı (timingSafeEqual) — düz `!==`
 * karşılaştırması ilk farklı bayttan sonra durur ve bu, ağ gürültüsüne rağmen
 * ölçülebilir bir sızıntıdır. Üretimde sır tanımsızsa uç 503 döner: herkese
 * açık bir adresin bildirim musluğu olarak durmasındansa çalışmaması doğru.
 * Geliştirmede sırsız çalışmaya izin verilir.
 */
export function cronGate(req: Request, label: string): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const expected = Buffer.from(`Bearer ${secret}`);
    const given = Buffer.from(req.headers.get("authorization") ?? "");
    const ok = expected.length === given.length && timingSafeEqual(expected, given);
    if (!ok) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    return null;
  }
  if (process.env.NODE_ENV === "production") {
    console.error(`[cron/${label}] CRON_SECRET tanımsız — tur çalıştırılmadı.`);
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }
  return null;
}
