import { api } from "../api/client";
import { todayStr } from "./session";

/**
 * Seviye testi — sunucu sözleşmesi (/api/placement). Test v2'den beri istemcide çözülüyor
 * (docs/plan/placement-v2.md); sunucuya yalnız durum sorulur ve cevaplar kaydedilir.
 * Eski 4 aşamalı test uçları (start/finish/accept) build 17 ve öncesi için sunucuda duruyor.
 */
export type PlacementRecord = {
  id: number;
  suggested: string;
  score: number;
  perSkill: Record<string, unknown>;
};

/**
 * SON ALMA + YENİDEN ALINABİLİR Mİ.
 *
 * `GET /api/placement` bunu baştan beri veriyor ve web soruyor: test 30 günde
 * bir alınabiliyor, arada "N gün sonra" deniyor. MOBİL HİÇ SORMUYORDU - ve
 * sunucu bu bekleme süresini ZORLAMIYOR (yalnız bildiriyor), yani Android'de
 * test istenildiği kadar tekrarlanabiliyor ve her bitiş yeni bir kayıt yazıp
 * seviyeyi değiştirebiliyordu. Sık tekrar seviye tahminini "ezber"e çevirir;
 * kuralın kendisi `RETAKE_DAYS` yorumunda yazılı.
 */
/** İlk hafta seviye önerisi (sunucu lib/placement-nudge); yoksa null. */
export type PlacementNudge = { direction: "up" | "down"; from: string; to: string };

export type PlacementStatus = {
  nudge?: PlacementNudge | null;
  last: (PlacementRecord & { at: string; accepted: string | null }) | null;
  canRetake: boolean;
  retakeDays: number;
};

export function fetchPlacementStatus(): Promise<PlacementStatus> {
  return api<PlacementStatus>("/api/placement");
}

/**
 * SEVİYE TESTİ v2 — cevapları sunucuya kaydeder (docs/plan/placement-v2.md). Sunucu sonucu
 * aynı motorla yeniden hesaplar; `accepted` önerilen ya da bir altı/üstüyse profile yazılır.
 * Misafirin cevapları onboarding tercihlerinde bekler, hesap açılınca buradan gider.
 */
export type PlacementV2Payload = {
  lang: "de" | "en";
  self: string;
  audio: boolean;
  known: Record<string, boolean>;
  responses: { id: string; choice: number | "dontknow" }[];
  accepted?: string | null;
};

export async function recordPlacementV2(p: PlacementV2Payload): Promise<PlacementRecord & { at: string; accepted: string | null }> {
  return api<PlacementRecord & { at: string; accepted: string | null }>("/api/placement", {
    method: "POST",
    body: JSON.stringify({ action: "record", ...p, day: todayStr() }),
  });
}

/** İlk hafta önerisine karar: kabulde profil seviyesi sunucuda değişir. */
export async function answerPlacementNudge(to: string, accept: boolean): Promise<{ ok: boolean; level?: string }> {
  return api<{ ok: boolean; level?: string }>("/api/placement", {
    method: "POST",
    body: JSON.stringify({ action: "nudge", to, accept }),
  });
}
