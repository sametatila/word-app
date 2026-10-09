import type { EpisodeSummary } from "@/lib/studio";
import type { SocialPlatform, SocialStatus } from "@/lib/social-posts";
import type { Tone } from "../admin/_ui/ui";

/** Stüdyo sayfalarının ortak etiketleri ve durum hesapları (takvim + editör). */

export const PLATFORMS: { key: SocialPlatform; label: string; short: string }[] = [
  { key: "tiktok", label: "TikTok", short: "TT" },
  { key: "instagram", label: "Instagram", short: "IG" },
];
export const APPROACH_TR: Record<string, string> = { artikel: "Artikel", diyalog: "Diyalog", kelime: "Kelime destesi", duy: "Hangisini duydun?", kur: "Cümleyi kur" };
export const APPROACH_SHORT: Record<string, string> = { artikel: "Artikel", diyalog: "Diyalog", kelime: "Kelime", duy: "Duy", kur: "Kur" };
export const THEME_TR: Record<string, string> = { gece: "Gece", kagit: "Kâğıt", turuncu: "Turuncu", lacivert: "Lacivert" };

export const dayLabel = (day: string) => new Date(`${day}T12:00:00Z`).toLocaleDateString("tr-TR", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

/** Platform durumu; saati geçmiş ve yayında/atlandı işaretlenmemiş = "overdue". */
export type PostShown = SocialStatus | "planned" | "overdue";
export const POST_STATE: Record<PostShown, { label: string; tone?: Tone }> = {
  planned: { label: "Planlandı" },
  scheduled: { label: "Zamanlandı", tone: "info" },
  published: { label: "Yayında", tone: "ok" },
  skipped: { label: "Atlandı" },
  overdue: { label: "Saati geçti", tone: "warn" },
};
export function postState(status: SocialStatus | undefined, past: boolean): PostShown {
  if (status === "published" || status === "skipped") return status;
  if (past) return "overdue";
  return status ?? "planned";
}

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
