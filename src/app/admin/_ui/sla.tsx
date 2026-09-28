import { RESPONSE_GUIDE, RESPONSE_SLA, slaState, slaText, type QueueId } from "@/lib/response-sla";
import { TONE } from "./ui";

/**
 * Geri dönüş süresi rozeti ve "nasıl dönülür" rehberi (`lib/response-sla`).
 * Kanca yok: sunucu ve istemci bileşenleri ortak kullanıyor.
 */

/**
 * "31 sa kaldı" / "5 sa gecikti". Metin çizim anına bağlı: sunucu ve tarayıcı
 * çizimi arasında dakika değişebilir, o yüzden hidrasyon uyarısı bu düğümde
 * susturuluyor (tarih biçimi değil, yalnız kalan süre).
 */
export function SlaBadge({ queue, at }: { queue: QueueId; at: string }) {
  const s = slaState(queue, at);
  if (!s) return null;
  const tone = s.level === "late" ? TONE.bad : s.level === "soon" ? TONE.warn : undefined;
  const label = s.level === "late" ? `Süre aşıldı · ${slaText(s)}` : slaText(s);
  return (
    <span
      suppressHydrationWarning
      aria-label={`${label} (hedef ${RESPONSE_SLA[queue].target})`}
      className="inline-flex h-5 items-center rounded-chip border px-1.5 text-micro whitespace-nowrap tabular-nums"
      style={tone ? { borderColor: tone, color: tone } : { borderColor: "var(--border)", color: "var(--text-muted)" }}
    >
      {label}
    </span>
  );
}

/** Katlanır rehber: hedef süre, dayanağı ve adım adım ne yapılacağı. */
export function ResponseGuide({ queue, open = false }: { queue: QueueId; open?: boolean }) {
  const g = RESPONSE_GUIDE[queue];
  const def = RESPONSE_SLA[queue];
  return (
    <details open={open} className="rounded-tile border px-4 py-3 text-caption" style={{ borderColor: "var(--border)", background: "var(--surface-2)" }}>
      <summary className="cursor-pointer text-strong">
        {g.title} · hedef {def.target}
      </summary>
      <p className="muted mt-2">{def.basis}</p>
      <ol className="mt-2 list-decimal space-y-1 pl-5">
        {g.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </details>
  );
}
