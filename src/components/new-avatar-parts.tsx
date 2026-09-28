import type { UnlockedPart } from "@/lib/avatar-layers";
import { useT } from "@/lib/i18n/client";

/** Gösterilen en fazla ikon; gerisi sayı olarak. */
const SHOWN = 4;

/**
 * Bir kazanımla açılan avatar parçaları — kutlamanın ikinci ödülü
 * (rozet kartı, lig sonucu). Sunucu yalnız 3B katalog açıkken ve gerçekten
 * yeni açılan parça varken `parts` gönderiyor; yoksa hiçbir şey çizilmez.
 * Mobil karşılığı `ui/NewAvatarParts`.
 */
export function NewAvatarParts({ parts, compact = false }: { parts?: UnlockedPart[]; compact?: boolean }) {
  const t = useT();
  if (!parts?.length) return null;
  const shown = parts.slice(0, SHOWN);
  const rest = parts.length - shown.length;
  const px = compact ? 32 : 48;
  return (
    <div className={compact ? "mt-2" : "mt-4 rounded-panel px-3 py-3"} style={compact ? undefined : { background: "var(--surface-2)" }}>
      <p className="text-micro uppercase tracking-eyebrow" style={{ color: "var(--color-brand)" }}>
        {t("achu.new_parts")}
      </p>
      <div className={`mt-1.5 flex items-center gap-1.5 ${compact ? "" : "justify-center"}`}>
        {shown.map((p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.id} src={p.icon} alt="" width={px} height={px} loading="lazy" style={{ width: px, height: px }} className="object-contain" />
        ))}
      </div>
      <p className="muted mt-1 text-caption">
        {shown.map((p) => p.name).join(", ")}
        {rest > 0 ? ` +${rest}` : ""}
      </p>
    </div>
  );
}
