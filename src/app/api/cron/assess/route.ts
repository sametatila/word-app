import { NextResponse } from "next/server";
import { cronGate } from "@/lib/cron-auth";
import { recordCronRun } from "@/lib/cron-runs";
import { runAssessQueue } from "@/lib/assess";
import { purgeExpiredChatLogs } from "@/lib/conversations/log";
import { purgeClosedReports } from "@/lib/moderation-admin";
import { purgeExpiredGuestAttestations } from "@/lib/auth/play-integrity";
import { purgeExpiredAnswerBatches } from "@/lib/answer-batches";
import { purgeClientErrorGroups } from "@/lib/client-errors";
import { purgeStaleUnverifiedAccounts } from "@/lib/account/unverified-cleanup";
import { purgeExpiredSessions, purgeHeardTranscripts } from "@/lib/account/retention";
import { retryRevenueCatDeletions } from "@/lib/account/revenuecat-delete";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Kuyruktaki değerlendirmeleri işler (WP-30). Hatırlatma cron'uyla aynı
 * yetki kuralı: `CRON_SECRET` Bearer; üretimde sırsız çalışmaz.
 *
 * GÜNLÜK SAKLAMA TEMİZLİĞİ DE BURADA, çünkü bu uç her gün (04:15 UTC) çağrılan
 * tek iş (systemd `lernomi-cron-assess`):
 *   - süresi dolan konuşma kayıtları (Gizlilik §9 "30 gün"; hukuk denetimi
 *     LEG-12 — eskiden haftalık özete asılıydı, satır 37 güne kadar yaşıyordu)
 *   - kapanıştan 1 yıl geçmiş şikâyet kayıtları (LEG-17)
 *   - 90 günü dolan cihaz doğrulaması kayıtları (`guest_attestations`,
 *     Gizlilik §9; süre `lib/auth/attestation-const`)
 *   - 7 günü dolan cevap gönderimi tekrar kimlikleri (`answer_batches`,
 *     içeriksiz ayıklama kaydı; süre `lib/answer-batches`)
 *   - giderilmiş ya da 90 gündür görülmeyen istemci hata grupları
 *     (Gizlilik §9 "hata grubu giderilene kadar"; `lib/client-errors`)
 *   - 30 gündür doğrulanmamış, hiç kullanılmamış kayıtlar
 *     (`lib/account/unverified-cleanup`)
 *   - süresi 7 günden önce dolmuş oturum kayıtları (IP, cihaz) ve 30 günü
 *     geçen yürüyüş modu tanınan metni (Gizlilik §9; `lib/account/retention`)
 *   - hesap silmede düşen RevenueCat müşteri silmelerinin yeniden denenmesi
 *     (`vendor_deletion_retries`; `lib/account/revenuecat-delete`)
 * Kuyruktan ÖNCE ve kendi hatasını yutarak: model sağlayıcısı düşse de
 * saklama sözü tutulsun. Hepsi tekrar çalışmaya dayanıklı.
 */
export async function GET(req: Request) {
  const basladi = Date.now();
  const denied = cronGate(req, "assess");
  if (denied) { void recordCronRun("assess", false, Date.now() - basladi, "denied"); return denied; }
  const purgedLogs = await purgeExpiredChatLogs();
  const purgedReports = await purgeClosedReports().catch((err) => {
    console.error("[cron/assess] report purge", err);
    return { content: 0, user: 0 };
  });
  const purgedAttestations = await purgeExpiredGuestAttestations();
  const purgedBatches = await purgeExpiredAnswerBatches().catch((err) => {
    console.error("[cron/assess] answer batch purge", err);
    return 0;
  });
  const purgedErrors = await purgeClientErrorGroups().catch((err) => {
    console.error("[cron/assess] client error purge", err);
    return 0;
  });
  const purgedUnverified = await purgeStaleUnverifiedAccounts();
  const purgedSessions = await purgeExpiredSessions();
  const purgedHeard = await purgeHeardTranscripts();
  const vendorDeleted = await retryRevenueCatDeletions();
  try {
    const result = await runAssessQueue(20);
    /* Cümle tek yerde (bkz. cron/reminders). */
    const ozet = `bekleyen ${result.pending} · puanlanan ${result.done} · başarısız ${result.failed} · silinen konuşma kaydı ${purgedLogs} · silinen şikâyet ${purgedReports.content + purgedReports.user} · silinen cihaz doğrulaması ${purgedAttestations} · silinen cevap kimliği ${purgedBatches} · silinen hata grubu ${purgedErrors} · silinen doğrulanmamış kayıt ${purgedUnverified} · silinen oturum ${purgedSessions} · boşaltılan tanınan metin ${purgedHeard} · tamamlanan RevenueCat silmesi ${vendorDeleted}`;
    console.log(`[cron/assess] ${ozet}`);
    void recordCronRun("assess", true, Date.now() - basladi, ozet);
    return NextResponse.json({ ...result, purgedLogs, purgedReports, purgedAttestations, purgedBatches, purgedErrors, purgedUnverified, purgedSessions, purgedHeard, vendorDeleted });
  } catch (err) {
    console.error("[cron/assess]", err);
    void recordCronRun("assess", false, Date.now() - basladi, String((err as Error).message ?? err));
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
