/**
 * Kullanıma göre ücretlenen servislerin tarifeleri ve kotaları — tek kaynak.
 *
 * Veritabanı bağımlılığı YOK (saf): panel, uyarı motoru ve `test:ai-budget`
 * aynı hesabı kullanıyor. Kullanım `ai_usage`dan ve `events` › `mail_sent`den
 * okunuyor (`lib/ai-budget`); buradaki sayılar o kullanımı paraya ve kotaya
 * çeviriyor.
 *
 * PLAN DEĞİŞİNCE BURASI DEĞİŞİR (Samet ödeme yapınca). Cloudflare hesabı Workers
 * Paid'de (Samet, 2026-10-02): günlük ücretsiz pay dolunca istek reddedilmiyor,
 * aşan kısım faturalanıyor ve aylık maliyete yazılıyor ("dolunca reddeder"
 * uyarısı yalnız `plan = "free"`de). Groq ücretli katmana geçince
 * `GROQ.plan = "paid"`; Resend Pro'ya geçince `RESEND`.
 * Devre kesici YOK (Samet, 2026-10-02): kota ya da bütçe dolunca uygulama hiçbir
 * şeyi kısmıyor, yalnız uyarı gidiyor ve ödemeyi Samet yapıyor.
 *
 * Kaynaklar (2026-10-02 okundu):
 *   Cloudflare  developers.cloudflare.com/workers-ai/platform/pricing
 *   Groq        ücretsiz katman sınırları canlı 429 gövdesinden (TPD 200.000, TPM 8.000);
 *               ücretli fiyat docs/premium/README.md §2.4
 *   Deepgram    deepgram.com/pricing (Nova-3 kayıtlı ses, tek dil)
 *   Resend      resend.com/pricing
 */

export type Plan = "free" | "paid";

export const CLOUDFLARE = {
  /** Workers Paid (ayda 5 $ sabit), Samet 2026-10-02. */
  plan: "paid" as Plan,
  /** Gün UTC 00:00'da sıfırlanıyor; ücretsiz planda aşınca istek reddediliyor. */
  freeNeuronsPerDay: 10_000,
  /** Workers Paid'de ücretsiz payı aşan kısım (ayrıca planın ayda 5 $ sabit ücreti var). */
  usdPer1kNeurons: 0.011,
  /** Model başına neuron / 1M jeton. Tabloda olmayan model uyarı üretir (maliyet bilinmez). */
  models: {
    "@cf/google/gemma-4-26b-a4b-it": { inPerM: 9_091, outPerM: 27_273 },
  } as Record<string, { inPerM: number; outPerM: number }>,
  /** Konuşma tanıma: dakika başına neuron (Whisper turbo 0,0005 $/dk). Deepgram'ın yedeği (lib/stt). */
  sttNeuronsPerMinute: {
    "@cf/openai/whisper-large-v3-turbo": 46.63,
  } as Record<string, number>,
};

export const GROQ = {
  plan: "free" as Plan,
  /** Ücretsiz katman, model başına günlük jeton (giriş + çıkış). */
  tokensPerDay: { "openai/gpt-oss-120b": 200_000 } as Record<string, number>,
  /** Ücretli katman fiyatı ($ / 1M jeton); ücretsizdeyken maliyet 0. */
  usdPerM: { "openai/gpt-oss-120b": { in: 0.15, out: 0.6 } } as Record<string, { in: number; out: number }>,
  /** Whisper ücretsiz katman: günde 2.000 istek, 28.800 sn ses. */
  sttRequestsPerDay: 2_000,
  sttSecondsPerDay: 28_800,
  /** Ücretli Whisper turbo: 0,04 $/saat, istek başı en az 10 sn. */
  sttUsdPerHour: 0.04,
  sttMinSeconds: 10,
};

export const DEEPGRAM = {
  /** Kayıtlı ses, tek dil. Hesaptaki 200 $ başlangıç kredisinden düşüyor; bakiye API'den okunamıyor (anahtarda billing:read yok). */
  usdPerMin: { "nova-3": 0.0043 } as Record<string, number>,
  /**
   * Bakiye ölçümü: Samet'in Deepgram konsolunda okuduğu kalan kredi ve okuma anı. Uyarı
   * motoru (lib/alerts `deepgram`) bu andan sonraki kullanımı tarifeyle düşüp kalanı
   * TAHMİN ediyor; Samet yeni bir bakiye okuduğunda ikisi birlikte güncellenir.
   * Not (2026-10-02): o güne dek kayıtlı 384 sn için kredi ~0,05 $ düşmüştü (≈0,0078 $/dk);
   * tarife 0,0043 $/dk. Fark yerel denemelerden ya da yuvarlamadan olabilir: tahmin
   * iyimser kalmasın diye uyarı eşikleri geniş tutuldu.
   */
  creditUsd: 199.95,
  creditAt: "2026-10-02T18:00:00+02:00",
};

export const RESEND = {
  plan: "free" as Plan,
  /** Ücretsiz plan: günde 100, ayda 3.000; aşımda gönderim reddediliyor (doğrulama postası dahil). */
  perDay: 100,
  perMonth: 3_000,
};

/** Kota uyarısı eşiği (pay). */
export const WARN_AT = 0.8;

/** Cloudflare neuron sayısı; model tarifede yoksa null. */
export function cloudflareNeurons(model: string, promptTokens: number, completionTokens: number): number | null {
  const r = CLOUDFLARE.models[model];
  if (!r) return null;
  return (promptTokens * r.inPerM + completionTokens * r.outPerM) / 1_000_000;
}

/** Cloudflare konuşma tanıma neuron'u; model tarifede yoksa null. */
export function cloudflareSttNeurons(model: string, seconds: number): number | null {
  const perMin = CLOUDFLARE.sttNeuronsPerMinute[model];
  return perMin == null ? null : (seconds / 60) * perMin;
}

/** Bir günün Cloudflare maliyeti: ücretsiz planda 0 (aşım reddedilir), ücretlide ücretsiz payın üstü. */
export function cloudflareDayUsd(neurons: number, plan: Plan = CLOUDFLARE.plan): number {
  if (plan === "free") return 0;
  return (Math.max(0, neurons - CLOUDFLARE.freeNeuronsPerDay) / 1000) * CLOUDFLARE.usdPer1kNeurons;
}

/** Groq dil modeli maliyeti; ücretsiz katmanda ya da tarifede olmayan modelde 0. */
export function groqChatUsd(model: string, promptTokens: number, completionTokens: number, plan: Plan = GROQ.plan): number {
  const r = GROQ.usdPerM[model];
  if (plan === "free" || !r) return 0;
  return (promptTokens * r.in + completionTokens * r.out) / 1_000_000;
}

/** Faturalanan Whisper saniyesi: istek başı en az 10 sn. */
export function groqSttBilledSeconds(clipSeconds: number[]): number {
  return clipSeconds.reduce((a, s) => a + Math.max(s, GROQ.sttMinSeconds), 0);
}

/** Groq Whisper maliyeti (`billedSeconds` istek başı en az 10 sn sayılmış); ücretsiz katmanda 0. */
export function groqSttUsd(billedSeconds: number, plan: Plan = GROQ.plan): number {
  if (plan === "free") return 0;
  return (billedSeconds / 3600) * GROQ.sttUsdPerHour;
}

/** Deepgram maliyeti; tarifede olmayan model nova-3 fiyatıyla (en yakın tahmin). */
export function deepgramUsd(model: string, seconds: number): number {
  const perMin = DEEPGRAM.usdPerMin[model] ?? DEEPGRAM.usdPerMin["nova-3"];
  return (seconds / 60) * perMin;
}

/** Ay sonu tahmini: bugüne kadarki harcama, geçen gün sayısına göre (UTC). */
export function projectMonth(monthUsd: number, now: Date = new Date()): number {
  const day = now.getUTCDate();
  const days = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0)).getUTCDate();
  const elapsed = Math.max(day - 1 + (now.getUTCHours() * 60 + now.getUTCMinutes()) / 1440, 0.5);
  return (monthUsd / elapsed) * days;
}

/** Aylık bütçe eşiği ($), `AI_MONTHLY_BUDGET_USD`; boş ya da geçersizse null (bütçe uyarısı yok). */
export function monthlyBudgetUsd(): number | null {
  const n = Number(process.env.AI_MONTHLY_BUDGET_USD);
  return Number.isFinite(n) && n > 0 ? n : null;
}
