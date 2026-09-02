import { api } from "../api/client";

/**
 * İçerik bildirimi — web POST /api/reports. Play "yapay zekâ ile üretilen içerik"
 * politikası: kullanıcı rahatsız edici bir yapay zekâ yanıtını uygulamadan çıkmadan
 * bildirebilmeli. Kayıt yönetim panosunda insan tarafından okunur.
 */
export type ReportKind = "roleplay" | "assessment";
export type ReportReason = "inappropriate" | "offensive" | "wrong" | "other";

export const REPORT_REASONS: { key: ReportReason; label: string; sub: string }[] = [
  { key: "inappropriate", label: "Uygunsuz içerik", sub: "Cinsel, şiddet içeren ya da yasa dışı" },
  { key: "offensive", label: "Rahatsız edici", sub: "Hakaret, aşağılama, nefret söylemi" },
  { key: "wrong", label: "Yanlış bilgi", sub: "Dil bilgisi ya da içerik olarak hatalı" },
  { key: "other", label: "Başka bir şey", sub: "Yukarıdakilere uymuyor" },
];

export async function sendReport(kind: ReportKind, ref: string, reason: ReportReason, content: string): Promise<boolean> {
  try {
    await api("/api/reports", { method: "POST", body: JSON.stringify({ kind, ref, reason, content: content.slice(0, 4000) }) });
    return true;
  } catch {
    return false;
  }
}
