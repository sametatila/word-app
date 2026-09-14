/**
 * Yapay zekâ işleme rızası — İSTEMCİDE DE KULLANILAN parça (tipler, sabitler,
 * saf kararlar). Sunucu tarafı `lib/ai-consent.ts`; mobil karşılığı
 * `M/src/lib/aiConsent.ts` ve adlar orada da aynı.
 *
 * NEDEN VAR. Kullanıcının yazdığı ve söylediği metin dil modeli sağlayıcılarına
 * (Groq, Mistral, Cerebras), ekran kapalı yürüyüşteki ve telaffuz puanındaki ses
 * konuşma tanıma sağlayıcılarına gidiyor. Uygulamada bunu anlatan bir bilgi
 * notu vardı ama İZİN İSTENMİYORDU:
 *
 *   - App Store 5.1.2(i) (13 Kasım 2025): kişisel verinin "üçüncü taraf yapay
 *     zekâ dahil" üçüncü taraflarla paylaşılacağı yer açıkça söylenmeli ve
 *     BUNDAN ÖNCE açık izin alınmalı. Şubat 2026'dan beri gelen retler aynı dört
 *     şeyi istiyor: ne gönderiliyor, kime, göndermeden önce izin, politikada
 *     karşılığı.
 *   - Google Play Kullanıcı Verileri politikası (15 Temmuz 2026 açıklaması,
 *     yürürlük 26 Ağustos 2026): açıklama ve rıza kuralları üçüncü taraf yapay
 *     zekâ entegrasyonlarına da uygulanıyor.
 *
 * İKİ AMAÇ, İKİ AYRI RIZA. Metin ile ses aynı alıcıya gitmiyor ve aynı şey için
 * gitmiyor; tek bir "yapay zekâ" onayı, mikrofon ekranında yalnız sesi anlatıp
 * metnin gönderilmesine de izin almış olurdu (paketlenmiş rıza).
 *
 *   ai_text   yazdığın ve söylediğin METİN → dil modeli (değerlendirme, rol
 *             yapma, sınav geri bildirimi)
 *   ai_voice  SES KAYDI → konuşma tanıma (ekran kapalı yürüyüş, telaffuz puanı)
 *
 * SÜRÜM. Alıcı listesi değişirse rıza verildiği metin artık doğru değildir;
 * sürüm artar ve eski sürümle verilmiş rıza "outdated" sayılıp yeniden sorulur.
 * Liste ile sürüm arasındaki bağı `scripts/test-legal.ts` bir parmak iziyle
 * tutuyor: alıcı eklenip sürüm artırılmazsa kapı kırılır.
 */

export const AI_CONSENT_PURPOSES = ["ai_text", "ai_voice"] as const;
export type AiConsentPurpose = (typeof AI_CONSENT_PURPOSES)[number];

/** Yürürlükteki metin sürümü — rıza bu sayı ve üstüyle verilmişse geçerli. */
export const AI_CONSENT_VERSIONS: Record<AiConsentPurpose, number> = {
  ai_text: 1,
  ai_voice: 1,
};

/**
 * Sürümün bağlı olduğu alıcı kümesi (adlar, alfabetik). `PROCESSORS` değişip
 * burası değişmezse `test-legal` kırılır; burası değişirken sürüm de artmalı.
 */
export const AI_CONSENT_FINGERPRINT: Record<AiConsentPurpose, string> = {
  ai_text: "Cerebras|Groq|Mistral AI",
  ai_voice: "Cloudflare Workers AI|Deepgram|Groq|Microsoft Azure Speech|Mistral AI|Speechmatics",
};

/** Uçların rıza yokken döndürdüğü hata kodu (403 gövdesinde `error`). */
export const AI_CONSENT_ERROR = "ai_consent_required";

/**
 *   granted   geçerli sürümle izin var
 *   unset     hiç karar verilmedi → sorulur
 *   declined  kullanıcı "yapay zekâ olmadan devam" dedi ya da geri aldı → SORULMAZ
 *   outdated  izin eski sürümle verildi, alıcılar değişti → yeniden sorulur
 */
export type AiConsentState = "granted" | "unset" | "declined" | "outdated";

export type AiConsentStatus = {
  purpose: AiConsentPurpose;
  state: AiConsentState;
  /** Kararın verildiği sürüm; hiç karar yoksa null. */
  version: number | null;
  /** Yürürlükteki sürüm. */
  current: number;
  /** Son kararın zamanı (ISO); hiç karar yoksa null. */
  decidedAt: string | null;
};

/** 403 gövdesi: istemci bununla ekranı açıp açmayacağına karar veriyor. */
export type AiConsentRequired = {
  error: typeof AI_CONSENT_ERROR;
  purpose: AiConsentPurpose;
  state: Exclude<AiConsentState, "granted">;
  current: number;
};

export function isAiConsentPurpose(v: unknown): v is AiConsentPurpose {
  return typeof v === "string" && (AI_CONSENT_PURPOSES as readonly string[]).includes(v);
}

/** Kayıttaki son karardan durum. */
export function aiConsentStateOf(
  row: { granted: boolean; version: number } | null | undefined,
  current: number,
): AiConsentState {
  if (!row) return "unset";
  if (!row.granted) return "declined";
  return row.version >= current ? "granted" : "outdated";
}

/**
 * Ekran kendiliğinden açılır mı?
 *
 * "Hayır" diyen kullanıcıya her yapay zekâ çağrısında aynı soruyu yeniden
 * sormak, rızayı yıpratarak koparmaktır (rıza yorgunluğu; App Store 5.1.1(iv)
 * da kullanıcıyı zorlamayı yasaklıyor). Reddedilen amaç yalnız Ayarlar'dan
 * açılıyor; metin değişince (outdated) yeniden sorulması ise zorunlu, çünkü
 * önceki izin başka bir alıcı listesine verilmişti.
 */
export function aiConsentShouldPrompt(state: AiConsentState): boolean {
  return state === "unset" || state === "outdated";
}

/** Bir 403 gövdesi rıza isteği mi? */
export function asAiConsentRequired(body: unknown): AiConsentRequired | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (b.error !== AI_CONSENT_ERROR || !isAiConsentPurpose(b.purpose)) return null;
  const state = b.state === "declined" || b.state === "outdated" ? b.state : "unset";
  return { error: AI_CONSENT_ERROR, purpose: b.purpose, state, current: typeof b.current === "number" ? b.current : AI_CONSENT_VERSIONS[b.purpose] };
}
