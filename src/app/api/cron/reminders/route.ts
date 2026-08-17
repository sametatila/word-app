import { NextResponse } from "next/server";
import { runReminders } from "@/lib/push";

export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // web-push Node API'lerine dayanıyor
// Bildirim gönderimi kullanıcı sayısıyla doğru orantılı sürüyor; varsayılan
// 10 saniyelik sınır ilk yüz kullanıcıdan sonra turu ortasında keserdi.
export const maxDuration = 60;

/**
 * Günlük hatırlatma turu — Vercel Cron tetikler (bkz. vercel.json).
 *
 * Uç herkese açık bir adreste duruyor, bu yüzden sırla korunuyor: aksi hâlde
 * adresi bilen biri turu istediği kadar tetikleyip kullanıcılara bildirim
 * yağdırabilirdi. Vercel, `CRON_SECRET` tanımlıysa isteğe `Authorization`
 * başlığını kendiliğinden ekliyor.
 *
 * Kimin bildirim alacağına `runReminders` karar veriyor; burada yalnızca
 * yetki ve raporlama var.
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const header = req.headers.get("authorization");
    if (header !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // Sırsız bir üretim kurulumu açık bir bildirim musluğudur. Sessizce
    // çalışmaktansa görünür biçimde durması doğru.
    console.error("[cron/reminders] CRON_SECRET tanımsız — tur çalıştırılmadı.");
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    const result = await runReminders();
    console.log(`[cron/reminders] hedef ${result.targets} · gönderilen ${result.sent}`);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[cron/reminders]", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
