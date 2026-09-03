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
    { key: "inappropriate", label: t("report.uygunsuz_icerik"), sub: t("report.cinsel_siddet_iceren_ya_da_yasa_di") },
    { key: "offensive", label: t("report.rahatsiz_edici"), sub: t("report.hakaret_asagilama_nefret_soylemi") },
    { key: "wrong", label: t("report.yanlis_bilgi"), sub: t("report.dil_bilgisi_ya_da_icerik_olarak_ha") },
    { key: "other", label: t("report.baska_bir_sey"), sub: t("report.yukaridakilere_uymuyor") },
  ];
}
function userReasons(): Reason[] {
  return [
    { key: "inappropriate", label: t("report.uygunsuz_ad"), sub: t("report.cinsel_siddet_iceren_ya_da_yasa_di") },
    { key: "offensive", label: t("report.hakaret_ya_da_nefret"), sub: t("report.asagilayici_ayrimci_ifade") },
    { key: "impersonation", label: t("report.kimlige_burunme"), sub: t("report.baskasinin_ya_da_bir_markanin_adi") },
    { key: "other", label: t("report.baska_bir_sey"), sub: t("report.yukaridakilere_uymuyor") },
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
