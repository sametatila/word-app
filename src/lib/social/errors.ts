/**
 * Sosyal katmanın iş kuralı hataları. Rota katmanı bunu `{ error: code }` +
 * HTTP durumuna çevirir (lib/social/http.ts); kütüphane `next/server` bilmez.
 * Kodlar kapalı sözlük: istemci bunlara göre Türkçe metin seçer.
 */
export type SocialErrorCode =
  | "self"
  | "not_found"
  | "forbidden"
  | "requests_closed"
  | "declined_recent"
  | "rate_limited"
  | "not_friends"
  | "already_exists"
  | "username_invalid"
  | "username_taken"
  | "username_cooldown"
  | "bad_request"
  | "week_over"
  | "database";

export class SocialError extends Error {
  constructor(
    public readonly code: SocialErrorCode,
    public readonly status = 400,
    public readonly retryAfterSec?: number,
  ) {
    super(code);
    this.name = "SocialError";
  }
}
