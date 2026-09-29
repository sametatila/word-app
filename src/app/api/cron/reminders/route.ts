import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { recordCronRun } from "@/lib/cron-runs";
import { runReminders } from "@/lib/push";
import { runTrialReminders } from "@/lib/premium/trial-reminder";

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
  const basladi = Date.now();
  const denied = cronGate(req, "reminders");
  /* KAPIDA DÜŞEN ÇAĞRI DA YAZILIYOR: `CRON_SECRET` kayarsa iş hiç başlamaz
     ve eski hâlde bunun tek izi 401'lik bir yanıt olurdu (bkz. lib/cron-runs). */
  if (denied) { void recordCronRun("reminders", false, Date.now() - basladi, "denied"); return denied; }

  try {
    const result = await runReminders();
    /* Deneme bitiş hatırlatması aynı günlük turda (lib/premium/trial-reminder).
       Kendi hatası öteki hatırlatmaları düşürmesin: ayrı yakalanıyor. */
    const trial = await runTrialReminders().catch((err) => {
      console.error("[cron/reminders] trial", err);
      return null;
    });
    /* Cümle TEK YERDE kuruluyor: hem log hem koşu kaydı aynı metni
       kullanıyor, iki kopya iki yerde bakım demekti. */
    const deneme = trial ? `${trial.targets} (push ${trial.push}, mail ${trial.mail})` : "ERR";
    const ozet = `hedef ${result.targets} · gönderilen ${result.sent} · deneme sonu ${deneme}`;
    console.log(`[cron/reminders] ${ozet}`);
    void recordCronRun("reminders", true, Date.now() - basladi, ozet);
    return NextResponse.json({ ...result, trial });
  } catch (err) {
    console.error("[cron/reminders]", err);
    void recordCronRun("reminders", false, Date.now() - basladi, String((err as Error).message ?? err));
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
