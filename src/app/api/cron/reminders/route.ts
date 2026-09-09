import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { runReminders } from "@/lib/push";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // web-push Node API'lerine dayanıyor
// Bildirim gönderimi kullanıcı sayısıyla doğru orantılı sürüyor; varsayılan
// 10 saniyelik sınır ilk yüz kullanıcıdan sonra turu ortasında keserdi.
export const maxDuration = 60;

/**
 * Günlük hatırlatma turu — sunucudaki `lernomi-cron-reminders.timer` tetikler
 * (her gün 18:00 UTC, `/opt/lernomi/cron-call.sh` üzerinden; bkz. AGENTS.md).
 *
 * Uç herkese açık bir adreste duruyor, bu yüzden sırla korunuyor: aksi hâlde
 * adresi bilen biri turu istediği kadar tetikleyip kullanıcılara bildirim
 * yağdırabilirdi. `cron-call.sh` isteği `CRON_SECRET` taşıyan bir Bearer
 * başlığıyla atıyor.
 *
 * Kimin bildirim alacağına `runReminders` karar veriyor; burada yalnızca
 * yetki ve raporlama var.
 */
export async function GET(req: Request) {
  const denied = cronGate(req, "reminders");
  if (denied) return denied;

  try {
    const result = await runReminders();
    console.log(`[cron/reminders] hedef ${result.targets} · gönderilen ${result.sent}`);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[cron/reminders]", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
