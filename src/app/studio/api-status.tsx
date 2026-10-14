"use client";

import type { SocialPlatform } from "@/lib/social-posts";
import { TONE } from "../admin/_ui/ui";
import { PLATFORMS } from "./shared";

/**
 * Platform API bağlantıları tek satırda: platform başına renkli nokta + metriklerin yaşı ("2 dk": izlenme ve beğeniler
 * o an okundu; eski işçi `metricsAt` yazmıyorsa son eşitleme). Sorun varsa nokta ve yazı rengi değişir ("işçi durdu",
 * "hata", "bağlı değil"); ayrıntı (hesap, okuma sıklığı, belirteç, hata) üzerine gelince. Takvim ve Genel bakış aynı
 * göstergeyi kullanır.
 */
export type ApiHealth = { platform: SocialPlatform; connected: boolean; ok: boolean; retrying?: boolean; stale: boolean; lastSyncAt: string | null; metricsAt?: string | null; error?: string | null; username?: string | null; tokenDays?: number | null };

/** İşçilerin okuma sıklığı (scripts/social/*.mjs) */
const EVERY: Record<SocialPlatform, string> = { instagram: "15 dakikada bir", tiktok: "5 dakikada bir", youtube: "10 dakikada bir; izlenme süresi 6 saatte bir, 1–2 gün gecikmeli" };
const at = (iso: string) => new Date(iso).toLocaleString("tr-TR", { timeZone: "Europe/Berlin", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

const short = (iso: string | null) => {
  if (!iso) return "hiç";
  const m = Math.max(0, Math.round((Date.now() - Date.parse(iso)) / 60_000));
  return m < 1 ? "şimdi" : m < 60 ? `${m} dk` : m < 48 * 60 ? `${Math.round(m / 60)} sa` : `${Math.round(m / 1440)} gün`;
};

export function ApiStatus({ items }: { items: ApiHealth[] }) {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-1 text-caption">
      <span className="faint">Veri</span>
      {items.map((s) => {
        const label = PLATFORMS.find((p) => p.key === s.platform)?.label ?? s.platform;
        const problem = !s.connected ? "bağlı değil" : !s.ok ? "hata" : s.stale ? "işçi durdu" : null;
        const warn = !problem && (s.retrying || (s.tokenDays != null && s.tokenDays < 10));
        const color = !s.connected ? "var(--text-faint)" : problem ? TONE.bad : warn ? TONE.warn : TONE.ok;
        const read = s.metricsAt ?? s.lastSyncAt;
        const value = problem ?? (s.retrying ? "yeniden deneniyor" : short(read));
        const title = [
          s.username ? `@${s.username.replace(/^@/, "")}` : null,
          read ? `metrikler ${at(read)} okundu (${EVERY[s.platform]}; platformun kendi sayacı gecikmeli ilerleyebilir)` : null,
          s.metricsAt && s.lastSyncAt ? `gönderi eşleştirme ${at(s.lastSyncAt)}` : null,
          s.retrying ? "son deneme hata verdi (ağ kesintisi olabilir), işçi kendiliğinden yeniden deniyor" : null,
          s.tokenDays != null ? `belirteç ${s.tokenDays} gün (kendiliğinden yenilenir)` : null,
          s.error,
        ]
          .filter(Boolean)
          .join(" · ");
        return (
          <span key={s.platform} className="inline-flex items-center gap-1.5" suppressHydrationWarning title={title || undefined} aria-label={`${label}: ${value}${title ? ` · ${title}` : ""}`}>
            <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ background: color }} />
            <span>{label}</span>
            {/* göreli süre sunucuda ve tarayıcıda ayrı hesaplanıyor: dakika sınırında fark olabilir */}
            <span className="tabular-nums" style={problem ? { color } : { color: "var(--text-muted)" }} suppressHydrationWarning>{value}</span>
          </span>
        );
      })}
    </span>
  );
}
