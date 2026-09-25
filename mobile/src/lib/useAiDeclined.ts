import { useEffect, useState } from "react";
import { fetchAiConsent } from "./aiConsent";

/**
 * Kullanıcı yapay zekâ (metin) iznini REDDETTİ mi — Patika Konuşma kilidi için.
 *
 * İzni reddeden kullanıcı senaryolu konuşmaya gidiyor ve adım kilitlenmiyor
 * (sunucu `/api/roleplay`). Durum kısa süre süreç içinde tutuluyor: Patika'daki
 * her kart ayrı istek atmasın. Okunamazsa `false` — kilit sunucunun kararıyla
 * zaten ekranda doğrulanıyor.
 */
let cache: { at: number; declined: boolean } | null = null;
const TTL_MS = 60_000;

export function useAiDeclined(enabled: boolean): boolean {
  const [declined, setDeclined] = useState(cache?.declined ?? false);
  useEffect(() => {
    if (!enabled) return;
    if (cache && Date.now() - cache.at < TTL_MS) { setDeclined(cache.declined); return; }
    let alive = true;
    void fetchAiConsent()
      .then((info) => {
        const d = info.statuses.ai_text?.state === "declined";
        cache = { at: Date.now(), declined: d };
        if (alive) setDeclined(d);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [enabled]);
  return declined;
}

