import { translate, type NativeLang } from "@/lib/i18n/dict";
import { apiFetch } from "@/lib/api-fetch";

/**
 * İçerik bildirimi — mobil `M/src/lib/report.ts`in karşılığı.
 *
 * UÇ AYLARDIR VARDI, ÇAĞIRAN YOKTU. `POST /api/reports` yazıldı, sınırları
 * kondu, yönetim panosuna bağlandı; ama web'de hiçbir düğme onu çağırmıyordu.
 * Mobilde üç yerde var: rol yapma yanıtı, yazma değerlendirmesi ve sıralamada
 * bir kullanıcı adı. Play'in "yapay zekâ ile üretilen içerik" politikası da
 * bunu istiyor: kullanıcı rahatsız edici bir yanıtı uygulamadan çıkmadan
 * bildirebilmeli.
 */
export type ReportKind = "roleplay" | "assessment" | "user";
export type ReportReason = "inappropriate" | "offensive" | "wrong" | "impersonation" | "other";
export type Reason = { key: ReportReason; label: string; sub: string };

/**
 * Sebepler türe göre değişiyor: bir yapay zekâ yanıtı "yanlış bilgi"
 * verebilir ama kimliğe bürünemez; bir kullanıcı adı bunun tersi.
 */
export function reasonsFor(kind: ReportKind, lang: NativeLang): Reason[] {
  const r = (key: ReportReason, label: string, sub: string): Reason => ({
    key,
    label: translate(lang, label),
    sub: translate(lang, sub),
  });
  return kind === "user"
    ? [
        r("inappropriate", "report.inappropriate_name", "report.sexual_violent_or_illegal"),
        r("offensive", "report.insult_or_hate", "report.degrading_or_discriminatory"),
        r("impersonation", "report.impersonation", "report.someone_else_s_name_or_brand"),
        r("other", "report.something_else", "report.none_of_above_fits"),
      ]
    : [
        r("inappropriate", "report.inappropriate_content", "report.sexual_violent_or_illegal"),
        r("offensive", "report.offensive", "report.insults_degradation_hate_speech"),
        r("wrong", "report.incorrect_information", "report.wrong_grammar_or_wrong_content"),
        r("other", "report.something_else", "report.none_of_above_fits"),
      ];
}

export async function sendReport(
  kind: ReportKind,
  ref: string,
  reason: ReportReason,
  content: string,
): Promise<boolean> {
  try {
    const res = await apiFetch("/api/reports", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ kind, ref, reason, content: content.slice(0, 4000) }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
