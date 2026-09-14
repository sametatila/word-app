import "server-only";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { userConsents } from "@/lib/db/schema";
import { PROCESSORS, processorRow, type LegalLocale, type Processor } from "@/lib/legal";
import {
  AI_CONSENT_ERROR,
  AI_CONSENT_PURPOSES,
  AI_CONSENT_VERSIONS,
  aiConsentStateOf,
  isAiConsentPurpose,
  type AiConsentPurpose,
  type AiConsentRequired,
  type AiConsentState,
  type AiConsentStatus,
} from "@/lib/ai-consent-shared";

/**
 * Yapay zekâ işleme rızasının SUNUCU tarafı: okuma, yazma ve uç kapısı.
 * Neden ve kurallar `lib/ai-consent-shared.ts`in başında.
 *
 * KAPI UÇTA, İSTEMCİDE DEĞİL. Rıza ekranı iki istemcide de var ama tek başına
 * yetmezdi: eski bir sürüm, başka bir cihaz ya da doğrudan yapılan bir istek
 * ekranı hiç görmeden metni sağlayıcıya yollatabilirdi. Uç izni kendisi okuyor
 * ve izin yoksa isteği SAĞLAYICIYA HİÇ İLETMEDEN 403 ile döndürüyor. Gövdenin
 * bizim sunucumuza ulaşması bir paylaşım değil; sağlayıcıya gitmesi paylaşım.
 *
 * İstemciler 403'ü yakalayıp ekranı açıyor, onay gelirse aynı isteği bir kez
 * yeniden yolluyor (mobil `api/client`, web `lib/api-fetch`). Böylece kırk ayrı
 * çağrı yerine tek bir yerde duruyor.
 */

type Decision = { granted: boolean; version: number; decidedAt: Date };

/** Her amaç için SON karar. Defter eklemeli; en yeni satır geçerli. */
async function latestDecisions(userId: string): Promise<Map<AiConsentPurpose, Decision>> {
  const rows = await db
    .select({ purpose: userConsents.purpose, granted: userConsents.granted, version: userConsents.version, decidedAt: userConsents.decidedAt })
    .from(userConsents)
    .where(eq(userConsents.userId, userId))
    .orderBy(desc(userConsents.decidedAt), desc(userConsents.id));
  const out = new Map<AiConsentPurpose, Decision>();
  for (const r of rows) {
    if (isAiConsentPurpose(r.purpose) && !out.has(r.purpose)) out.set(r.purpose, r);
  }
  return out;
}

function statusOf(purpose: AiConsentPurpose, d: Decision | undefined): AiConsentStatus {
  const current = AI_CONSENT_VERSIONS[purpose];
  return {
    purpose,
    state: aiConsentStateOf(d, current),
    version: d?.version ?? null,
    current,
    decidedAt: d ? d.decidedAt.toISOString() : null,
  };
}

/** İki amacın yürürlükteki durumu. */
export async function aiConsentStatuses(userId: string): Promise<Record<AiConsentPurpose, AiConsentStatus>> {
  const latest = await latestDecisions(userId);
  return Object.fromEntries(AI_CONSENT_PURPOSES.map((p) => [p, statusOf(p, latest.get(p))])) as Record<AiConsentPurpose, AiConsentStatus>;
}

export type ConsentPlatform = "ios" | "android" | "web";

export function isConsentPlatform(v: unknown): v is ConsentPlatform {
  return v === "ios" || v === "android" || v === "web";
}

/**
 * Kararı deftere yazar. İzin HER ZAMAN yürürlükteki sürümle veriliyor: istemci
 * eski bir metni göstermiş olsa bile sunucu kabul ettiği sürümü kendisi yazıyor,
 * çünkü alıcı listesini de (GET) o sürüme göre sunuyor.
 */
export async function recordAiConsent(
  userId: string,
  purpose: AiConsentPurpose,
  granted: boolean,
  platform: ConsentPlatform | null,
): Promise<AiConsentStatus> {
  const [row] = await db
    .insert(userConsents)
    .values({ userId, purpose, granted, version: AI_CONSENT_VERSIONS[purpose], platform })
    .returning({ granted: userConsents.granted, version: userConsents.version, decidedAt: userConsents.decidedAt });
  return statusOf(purpose, row);
}

/** Tek amacın son kararı. Okuma hatası çağırana fırlatılır. */
async function latestDecision(userId: string, purpose: AiConsentPurpose): Promise<Decision | undefined> {
  const [row] = await db
    .select({ granted: userConsents.granted, version: userConsents.version, decidedAt: userConsents.decidedAt })
    .from(userConsents)
    .where(and(eq(userConsents.userId, userId), eq(userConsents.purpose, purpose)))
    .orderBy(desc(userConsents.decidedAt), desc(userConsents.id))
    .limit(1);
  return row;
}

/**
 * Uç kapısı: izin geçerliyse `null`, değilse döndürülecek yanıt.
 *
 * VERİTABANI OKUNAMAZSA KAPI KAPALI (503). Öteki kapılar (kota, premium) hata
 * anında açık kalıyor, çünkü onların yanlış tarafı fazladan bir çağrı. Buranın
 * yanlış tarafı izinsiz bir paylaşım; o yüzden şüphede gönderilmiyor ve istemci
 * 503'ü "servis yok" olarak okuyup kural tabanlı yedeğine düşüyor.
 */
export async function aiConsentGate(userId: string, purpose: AiConsentPurpose): Promise<NextResponse | null> {
  let decision: Decision | undefined;
  try {
    decision = await latestDecision(userId, purpose);
  } catch (err) {
    console.error("[ai-consent] consent read failed", purpose, err);
    return NextResponse.json({ error: "database" }, { status: 503 });
  }
  const status = statusOf(purpose, decision);
  if (status.state === "granted") return null;
  const body: AiConsentRequired = { error: AI_CONSENT_ERROR, purpose, state: status.state, current: status.current };
  return NextResponse.json(body, { status: 403 });
}

/** Kapı ile aynı karar, yanıt üretmeden — cevabı engellemeyen yerler için. Hata = izin yok. */
export async function hasAiConsent(userId: string, purpose: AiConsentPurpose): Promise<boolean> {
  return (await aiConsentStateFor(userId, purpose)) === "granted";
}

/** Tek amacın durumu; okunamazsa `null` (çağıran "bilinmiyor" diye davranır). */
export async function aiConsentStateFor(userId: string, purpose: AiConsentPurpose): Promise<AiConsentState | null> {
  try {
    return aiConsentStateOf(await latestDecision(userId, purpose), AI_CONSENT_VERSIONS[purpose]);
  } catch {
    return null;
  }
}

/* ── alıcılar: rıza ekranı gizlilik politikasıyla AYNI listeyi gösteriyor ── */

/**
 * Hangi veri türü hangi amaca giriyor. Liste politikadaki alıcılar tablosundan
 * (`PROCESSORS`) SÜZÜLÜYOR, elle yazılmıyor: tabloya yeni bir dil modeli
 * eklenince rıza ekranı onu kendiliğinden sayar, sürüm parmak izi de değişir
 * ve `test-legal` sürümün artırılmasını ister.
 */
const PURPOSE_DATA: Record<AiConsentPurpose, readonly Processor["data"][]> = {
  ai_text: ["audioAndTexts", "texts"],
  ai_voice: ["audioAndTtsText", "audioAndTexts", "audio"],
};

export function aiConsentProcessorList(purpose: AiConsentPurpose): Processor[] {
  return PROCESSORS.filter((p) => PURPOSE_DATA[purpose].includes(p.data));
}

/** Sürümün bağlı olduğu alıcı kümesinin parmak izi (`AI_CONSENT_FINGERPRINT`). */
export function aiConsentFingerprintOf(purpose: AiConsentPurpose): string {
  return aiConsentProcessorList(purpose).map((p) => p.name).sort().join("|");
}

export type AiConsentProcessorRow = { name: string; purpose: string; region: string; safeguard: string };

export function aiConsentProcessors(purpose: AiConsentPurpose, locale: LegalLocale): AiConsentProcessorRow[] {
  return aiConsentProcessorList(purpose).map((p) => {
    const r = processorRow(p, locale);
    return { name: r.name, purpose: r.purpose, region: r.region, safeguard: r.safeguard };
  });
}
