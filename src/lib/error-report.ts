/**
 * İstemci hata raporu (web) — `/api/client-errors`e mesaj ve yığın.
 *
 * `client_error` OLAYI ayrıca yazılmaya devam ediyor (ekran başına sayı,
 * huni ve oranlar için); bu rapor "hangi hata" sorusunun cevabı. İkisi ayrı
 * çünkü olay tablosu serbest metin almıyor (bkz. lib/events).
 *
 * Sayfa ömrü başına en çok 10 rapor, aynı mesaj dakikada bir: döngüye giren
 * bir hata sunucuyu doldurmasın. `keepalive`: sayfa kapanırken de gitsin.
 */
import { apiFetch } from "@/lib/api-fetch";

const MAX_PER_PAGE = 10;
const SAME_MS = 60_000;
let sent = 0;
const seen = new Map<string, number>();

export function reportError(err: unknown, screen?: string): void {
  try {
    if (typeof window === "undefined" || sent >= MAX_PER_PAGE) return;
    const e = err instanceof Error ? err : new Error(typeof err === "string" ? err : JSON.stringify(err)?.slice(0, 300) ?? "unknown");
    const message = e.message || String(err);
    if (!message || /^Script error/.test(message) || /ResizeObserver loop/.test(message)) return;
    const now = Date.now();
    if ((seen.get(message) ?? 0) > now - SAME_MS) return;
    seen.set(message, now);
    sent++;
    void apiFetch("/api/client-errors", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: e.name, message: message.slice(0, 500), stack: e.stack?.slice(0, 4000), screen }),
      keepalive: true,
      timeoutMs: 10_000,
    }).catch(() => undefined);
  } catch {
    /* rapor hiçbir zaman hata üretmemeli */
  }
}
