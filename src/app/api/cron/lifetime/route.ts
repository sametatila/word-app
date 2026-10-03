import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { recordCronRun } from "@/lib/cron-runs";
import { runLifetimeGrants } from "@/lib/premium/lifetime";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Ömür boyu Premium turu — test kullanıcıları (`lib/premium/lifetime-policy`).
 * Zamanlayıcı sunucuda: `lernomi-cron-lifetime`, saatte bir. Listede olup henüz
 * kayıt olmamış kişi, doğrulanmış hesap açtıktan sonraki ilk turda alır.
 * Cevaptaki `"done":true` sunucudaki sarmalayıcıya timer'ı kapatmasını söylüyor
 * (en fazla 14 gün ya da herkes katılınca; `lifetime-policy`).
 */
export async function GET(req: Request) {
  const basladi = Date.now();
  const denied = cronGate(req, "lifetime");
  if (denied) { void recordCronRun("lifetime", false, Date.now() - basladi, "denied"); return denied; }

  try {
    const r = await runLifetimeGrants();
    const ozet = `liste ${r.listed} · hesap ${r.accounts} · verilen ${r.granted} · kayıt bekleyen ${r.waiting}${r.done ? ` · TUR BİTTİ (${r.reason})` : ""}`;
    console.log(`[cron/lifetime] ${ozet}`);
    void recordCronRun("lifetime", true, Date.now() - basladi, ozet);
    return NextResponse.json(r);
  } catch (err) {
    console.error("[cron/lifetime]", err);
    void recordCronRun("lifetime", false, Date.now() - basladi, String((err as Error).message ?? err));
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
