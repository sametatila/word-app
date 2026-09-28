import { Platform } from "react-native";
import { api } from "../api/client";
import { t, currentLang } from "./i18n";
import { currentCourseId } from "./courses";
import { contentRelease } from "../content/store";
import { APP_VERSION, APP_VERSION_CODE } from "../version";

/**
 * İçerik bildirimi — web POST /api/reports. Play "yapay zekâ ile üretilen içerik"
 * politikası: kullanıcı rahatsız edici bir yapay zekâ yanıtını uygulamadan çıkmadan
 * bildirebilmeli. Kayıt yönetim panosunda insan tarafından okunur.
 *
 * `content` türü öğrenme içeriğinin kendisi (kelime, alıştırma, sınav maddesi…):
 * cevaptan sonraki "⚑ Bildir" bağlantısı (`ui/ReportFlag`). Tel sözleşmesi
 * `docs/plan/content-feedback.md`; eski gövde (`{kind, ref, reason, content}`)
 * aynen gidiyor, yeni alanlar (surface, target, detail, context) yanına ekleniyor.
 */
export type ReportKind = "chat" | "assessment" | "user" | "content";
export type ReportReason =
  | "inappropriate" | "offensive" | "wrong" | "abuse" | "spam" | "impersonation" | "other"
  | "wrong_answer" | "typo" | "translation" | "audio" | "unclear" | "technical";

/** Bildirimin geldiği yüzey — sunucu ve panel listesiyle aynı dizgeler. */
export type ReportSurface =
  | "round" | "practice" | "walk" | "path" | "skill" | "conversation" | "scored"
  | "exam" | "mock" | "quiz" | "placement" | "words" | "writings";

export type ReportTargetType =
  | "word" | "exercise" | "conversation" | "exam_item" | "mock_task" | "quiz_item"
  | "placement_item" | "assessment" | "chat_turn";

/** Kalıcı hedef: panel aynı hedefe gelen bildirimleri bununla grupluyor. */
export type ReportTarget = { type: ReportTargetType; id: string; sub?: string; game?: string };

/** Bayrağın sayfaya verdiği paket: nerede, neyi, ekranda ne görünüyordu. */
export type ContentReport = { surface: ReportSurface; target: ReportTarget; snapshot: unknown };

export type ReportContext = {
  platform: string;
  appVersion: string;
  course: string;
  nativeLang: string;
  contentVersion?: number;
};

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
/* İçerik sebepleri tek satır: açıklama satırı yok, sıralama spec'teki gibi
   (en sık görülen üstte). */
function contentReasons(): Reason[] {
  return [
    { key: "wrong_answer", label: t("report.r_wrong_answer"), sub: "" },
    { key: "typo", label: t("report.r_typo"), sub: "" },
    { key: "translation", label: t("report.r_translation"), sub: "" },
    { key: "audio", label: t("report.r_audio"), sub: "" },
    { key: "unclear", label: t("report.r_unclear"), sub: "" },
    { key: "technical", label: t("report.r_technical"), sub: "" },
    { key: "inappropriate", label: t("report.inappropriate_content"), sub: "" },
    { key: "other", label: t("report.something_else"), sub: "" },
  ];
}
function userReasons(): Reason[] {
  return [
    { key: "inappropriate", label: t("report.inappropriate_name"), sub: t("report.sexual_violent_or_illegal") },
    { key: "abuse", label: t("report.insult_or_hate"), sub: t("report.degrading_or_discriminatory") },
    { key: "spam", label: t("user.report_spam"), sub: t("report.spam_sub") },
    { key: "impersonation", label: t("report.impersonation"), sub: t("report.someone_else_s_name_or_brand") },
    { key: "other", label: t("report.something_else"), sub: t("report.none_of_above_fits") },
  ];
}
export function reasonsFor(kind: ReportKind): Reason[] { return kind === "user" ? userReasons() : kind === "content" ? contentReasons() : aiReasons(); }

/** Eski `ref` alanı: `${type}:${id}` + varsa `:${sub}` (sunucu 120 karakterde kesiyor). */
export function targetRef(target: ReportTarget): string {
  return `${target.type}:${target.id}${target.sub ? `:${target.sub}` : ""}`;
}

/** Anlık görüntü düz metin ya da kısa JSON; 4000 karakter sınırı gövdede. */
export function snapshotText(snapshot: unknown): string {
  if (snapshot == null) return "";
  if (typeof snapshot === "string") return snapshot;
  try { return JSON.stringify(snapshot); } catch { return String(snapshot); }
}

/** Bildirimin bağlamı — panel kurs, anadil, platform ve sürüme göre süzüyor. */
export function reportContext(): ReportContext {
  const ctx: ReportContext = {
    platform: Platform.OS,
    appVersion: `${APP_VERSION} (${APP_VERSION_CODE})`,
    course: currentCourseId(),
    nativeLang: currentLang(),
  };
  const r = contentRelease();
  if (r > 0) ctx.contentVersion = r;
  return ctx;
}

/** Ayrıntı alanının tavanı — web `lib/report` ile aynı sayı, sunucu da aynı yerde kesiyor. */
export const REPORT_DETAIL_MAX = 500;

export type ReportExtra = { surface?: ReportSurface; target?: ReportTarget; detail?: string };

/**
 * `/api/reports` gövdesi. Eski dört alan her zaman ve eski anlamıyla gidiyor
 * (kurulu sunucu yalnız onları okuyor); yeni alanlar yalnız doluysa.
 * İçerik bildiriminde `ref` hedeften (`targetRef`), web ile aynı kural.
 */
export function buildReportBody(kind: Exclude<ReportKind, "user">, ref: string, reason: ReportReason, content: string, extra: ReportExtra = {}): Record<string, unknown> {
  const body: Record<string, unknown> = { kind, ref: extra.target ? targetRef(extra.target) : ref, reason, content: content.slice(0, 4000) };
  if (extra.surface) body.surface = extra.surface;
  if (extra.target) body.target = extra.target;
  const detail = extra.detail?.trim();
  if (detail) body.detail = detail.slice(0, REPORT_DETAIL_MAX);
  /* Bağlam yalnız içerik bildiriminde: yapay zekâ bildiriminin gövdesi eskisiyle
     birebir kalıyor (web `lib/report` de öyle). */
  if (kind === "content") body.context = reportContext();
  return body;
}

/** "ok" yeni kayıt, "duplicate" aynı hedef 24 saat içinde zaten bildirilmiş. */
export type ReportOutcome = "ok" | "duplicate" | "error";

export async function sendReport(kind: ReportKind, ref: string, reason: ReportReason, content: string, extra: ReportExtra = {}): Promise<ReportOutcome> {
  try {
    /* Kullanıcı şikâyeti sosyal uca: tek kuyruk (`user_reports`), web `lib/report` ile aynı. */
    if (kind === "user") {
      await api("/api/social/reports", { method: "POST", body: JSON.stringify({ userId: ref, reason, detail: content.slice(0, 500) || undefined }) });
      return "ok";
    }
    const res = await api<{ duplicate?: boolean } | null>("/api/reports", { method: "POST", body: JSON.stringify(buildReportBody(kind, ref, reason, content, extra)) });
    return res?.duplicate ? "duplicate" : "ok";
  } catch {
    return "error";
  }
}
