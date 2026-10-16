import type { EpisodeSummary } from "@/lib/studio";
import type { SocialPlatform, SocialStatus } from "@/lib/social-posts";
import type { Tone } from "../admin/_ui/ui";

/** Stüdyo sayfalarının ortak etiketleri ve durum hesapları (takvim + editör). */

export const PLATFORMS: { key: SocialPlatform; label: string; short: string }[] = [
  { key: "tiktok", label: "TikTok", short: "TT" },
  { key: "instagram", label: "Instagram", short: "IG" },
  { key: "youtube", label: "YouTube", short: "YT" },
];
export const APPROACH_TR: Record<string, string> = { artikel: "Artikel", diyalog: "Diyalog", kelime: "Kelime destesi", duy: "Hangisini duydun?", kur: "Cümleyi kur", yatay: "Uzun video (YouTube)" };
/** Yatay (YouTube uzun video) serileri: şablon → seri adı (videonun künyesindeki ad bölüm verisinde, burası takvim için). */
export const LONG_SERIES_TR: Record<string, string> = { yuru: "Yürürken Almanca", sinav: "A1 Sınavı", duy: "Hangisini Duydun?", gunluk: "Almanya'da Günlük Hayat", artikel: "Artikel Kuralları", hikaye: "Yavaş Almanca Hikâyeler" };
export const LONG_SERIES_SHORT: Record<string, string> = { yuru: "Yürürken", sinav: "Sınav", duy: "Duy", gunluk: "Günlük hayat", artikel: "Artikel", hikaye: "Hikâye" };
export const APPROACH_SHORT: Record<string, string> = { artikel: "Artikel", diyalog: "Diyalog", kelime: "Kelime", duy: "Duy", kur: "Kur" };
export const THEME_TR: Record<string, string> = { gece: "Gece", kagit: "Kâğıt", turuncu: "Turuncu", lacivert: "Lacivert" };

/** Takvimde bölümün haftası (`?hafta=`, takvim o günün pazartesisine yuvarlar); saati yoksa bu hafta. */
export const calendarHref = (slot: string | null | undefined) => (slot ? `/studio/takvim?hafta=${slot.slice(0, 10)}` : "/studio/takvim");
export const dayLabel = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString("tr-TR", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

/**
 * Platform durumu; saati geçmiş ve yayında/atlandı işaretlenmemiş = "overdue". Otomatik yayın (Instagram) saati
 * geçse de "Otomatik" kalır: işçi 3 saat dener, olmazsa "failed" yazar.
 */
export type PostShown = SocialStatus | "planned" | "overdue";
export const POST_STATE: Record<PostShown, { label: string; tone?: Tone }> = {
  planned: { label: "Planlandı" },
  scheduled: { label: "Zamanlandı", tone: "info" },
  auto: { label: "Otomatik", tone: "info" },
  publishing: { label: "Yayınlanıyor", tone: "info" },
  published: { label: "Yayında", tone: "ok" },
  failed: { label: "Yayınlanamadı", tone: "bad" },
  skipped: { label: "Atlandı" },
  overdue: { label: "Saati geçti", tone: "warn" },
};
export function postState(status: SocialStatus | undefined, past: boolean): PostShown {
  if (status === "published" || status === "skipped" || status === "auto" || status === "publishing" || status === "failed") return status;
  if (past) return "overdue";
  return status ?? "planned";
}
/** Platformda yeri belli (zamanlayıcıda, otomatik sırada ya da yayında). */
export const PLACED: PostShown[] = ["scheduled", "auto", "publishing", "published"];

/** İçerik durumu: önce sorun (hata, ses), sonra ilerleme (üretiliyor, hazır), en son düzenleme. */
export type ContentKey = "failed" | "audio" | "running" | "queued" | "ready" | "stale" | "edited" | "draft";
export const CONTENT_STATE: Record<ContentKey, { tone?: Tone }> = {
  failed: { tone: "bad" },
  audio: { tone: "warn" },
  running: { tone: "info" },
  queued: { tone: "info" },
  ready: { tone: "ok" },
  stale: { tone: "warn" },
  edited: {},
  draft: {},
};
export function contentState(e: EpisodeSummary): { key: ContentKey; label: string } {
  const r = e.render;
  if (r?.status === "failed") return { key: "failed", label: "Üretim hatası" };
  if (r?.status === "running") return { key: "running", label: `Üretiliyor %${Math.round((r.progress ?? 0) * 100)}` };
  if (r?.status === "queued") return { key: "queued", label: "Sırada" };
  if (r?.status === "done" && r.hasFiles) return { key: "ready", label: "Video hazır" };
  if (e.missingAudio) return { key: "audio", label: `Ses bekliyor (${e.missingAudio})` };
  if (e.video) return { key: "stale", label: "Değişti, yeniden onay" };
  if (e.edited) return { key: "edited", label: "Düzenlendi" };
  return { key: "draft", label: "Onay bekliyor" };
}
