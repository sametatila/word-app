"use client";

import type { SocialPlatform } from "@/lib/social-posts";
import { TONE } from "../admin/_ui/ui";
import { PLATFORMS } from "./shared";

/**
 * Platform API bağlantıları tek satırda: platform başına renkli nokta + son eşitleme ("2 dk"). Sorun varsa nokta ve
 * yazı rengi değişir ("işçi durdu", "hata", "bağlı değil"); ayrıntı (hesap, belirteç, hata) üzerine gelince.
 * Takvim ve Genel bakış aynı göstergeyi kullanır.
 */
export type ApiHealth = { platform: SocialPlatform; connected: boolean; ok: boolean; stale: boolean; lastSyncAt: string | null; error?: string | null; username?: string | null; tokenDays?: number | null };

const short = (iso: string | null) => {
  if (!iso) return "hiç";
  const m = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60_000));
  return m < 1 ? "şimdi" : m < 60 ? `${m} dk` : m < 48 * 60 ? `${Math.round(m / 60)} sa` : `${Math.round(m / 1440)} gün`;
};

export function ApiStatus({ items }: { items: ApiHealth[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-caption">
      <span className="faint">Eşitleme</span>
      {items.map((s) => {
        const label = PLATFORMS.find((p) => p.key === s.platform)?.label ?? s.platform;
        const problem = !s.connected ? "bağlı değil" : !s.ok ? "hata" : s.stale ? "işçi durdu" : null;
        const warn = !problem && s.tokenDays != null && s.tokenDays < 10;
        const color = !s.connected ? "var(--text-faint)" : problem ? TONE.bad : warn ? TONE.warn : TONE.ok;
        const value = problem ?? short(s.lastSyncAt);
        const title = [s.username ? `@${s.username.replace(/^@/, "")}` : null, s.lastSyncAt ? `son eşitleme ${new Date(s.lastSyncAt).toLocaleString("tr-TR", { timeZone: "Europe/Berlin" })}` : null, s.tokenDays != null ? `belirteç ${s.tokenDays} gün (kendiliğinden yenilenir)` : null, s.error].filter(Boolean).join(" · ");
        return (
          <span key={s.platform} className="inline-flex items-center gap-1.5" title={title || undefined} aria-label={`${label}: ${value}${title ? ` · ${title}` : ""}`}>
            <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: color }} />
            <span>{label}</span>
            <span className="tabular-nums" style={problem ? { color } : { color: "var(--text-muted)" }}>{value}</span>
          </span>
        );
      })}
    </span>
  );
}
