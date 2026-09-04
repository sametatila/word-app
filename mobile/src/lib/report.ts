import { api } from "../api/client";
import { t } from "./i18n";

/**
 * İçerik bildirimi — web POST /api/reports. Play "yapay zekâ ile üretilen içerik"
 * politikası: kullanıcı rahatsız edici bir yapay zekâ yanıtını uygulamadan çıkmadan
 * bildirebilmeli. Kayıt yönetim panosunda insan tarafından okunur.
 */
export type ReportKind = "roleplay" | "assessment" | "user";
export type ReportReason = "inappropriate" | "offensive" | "wrong" | "impersonation" | "other";

export type Reason = { key: ReportReason; label: string; sub: string };

/**
 * Sebep listeleri FONKSİYON: modül düzeyinde kurulsalardı t() dil yüklenmeden
 * çağrılır ve etiketler her dilde Türkçe donardı (bkz. lib/i18n.ts loadLang).
 */
function aiReasons(): Reason[] {
  return [
    { key: "inappropriate", label: t("report.inappropriate_content"), sub: t("report.sexual_violent_or_illegal") },
    { key: "offensive", label: t("report.offensive"), sub: t("report.insults_degradation_hate_speech") },
    { key: "wrong", label: t("report.incorrect_information"), sub: t("report.wrong_grammar_or_wrong_content") },
    { key: "other", label: t("report.something_else"), sub: t("report.none_of_above_fits") },
  ];
}
function userReasons(): Reason[] {
  return [
    { key: "inappropriate", label: t("report.inappropriate_name"), sub: t("report.sexual_violent_or_illegal") },
    { key: "offensive", label: t("report.insult_or_hate"), sub: t("report.degrading_or_discriminatory") },
    { key: "impersonation", label: t("report.impersonation"), sub: t("report.someone_else_s_name_or_brand") },
    { key: "other", label: t("report.something_else"), sub: t("report.none_of_above_fits") },
  ];
}
export function reasonsFor(kind: ReportKind): Reason[] { return kind === "user" ? userReasons() : aiReasons(); }

export async function sendReport(kind: ReportKind, ref: string, reason: ReportReason, content: string): Promise<boolean> {
  try {
    await api("/api/reports", { method: "POST", body: JSON.stringify({ kind, ref, reason, content: content.slice(0, 4000) }) });
    return true;
  } catch {
    return false;
  }
}
