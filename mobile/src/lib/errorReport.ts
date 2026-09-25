import { apiBase, fetchWithTimeout } from "../api/client";

/**
 * İstemci hata raporu (mobil JS) — web `lib/error-report` ile aynı uç ve kural.
 *
 * `/api/client-errors` mesajı ve yığını gruplayıp panele koyuyor; yeni grup
 * Telegram uyarısına düşüyor. Sürüm bilgisi `fetchWithTimeout`un eklediği
 * `x-lernomi-client` başlığından okunuyor. Native çökmeler (JS'e ulaşmayanlar)
 * bu yolun dışında; onlar için mağazaların kendi çökme raporları (Play Console
 * "ANR ve çökmeler", App Store Connect / Xcode Organizer) var. Crashlytics
 * 2026-09-23'te kaldırıldı: gizlilik beyanlarında yoktu.
 *
 * Uygulama ömrü başına en çok 10 rapor, aynı mesaj dakikada bir.
 */
const MAX = 10;
const SAME_MS = 60_000;
let sent = 0;
const seen = new Map<string, number>();

export function reportError(err: unknown, screen?: string): void {
  try {
    if (sent >= MAX) return;
    const e = err instanceof Error ? err : new Error(typeof err === "string" ? err : "unknown");
    const message = e.message || String(err);
    if (!message) return;
    const now = Date.now();
    if ((seen.get(message) ?? 0) > now - SAME_MS) return;
    seen.set(message, now);
    sent++;
    void fetchWithTimeout(`${apiBase()}/api/client-errors`, {
      method: "POST",
      headers: { "content-type": "application/json", origin: apiBase() },
      body: JSON.stringify({ name: e.name, message: message.slice(0, 500), stack: e.stack?.slice(0, 4000), screen }),
      timeoutMs: 10_000,
    }).catch(() => undefined);
  } catch {
    /* rapor hiçbir zaman hata üretmemeli */
  }
}
