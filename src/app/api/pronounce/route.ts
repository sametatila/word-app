import { NextResponse } from "next/server";
import { requireAccount } from "@/lib/auth/guest";
import { DAILY_QUOTAS } from "@/lib/quotas";
import { sameOrigin } from "@/lib/auth/origin";
import { takeUsage } from "@/lib/premium";
import { scorePronunciation } from "@/lib/pronounce";
import { signScore, openKeyFor, examSpeakingTarget } from "@/lib/exam-grade";
import { track } from "@/lib/events";
import type { SpeechConfusion } from "@/lib/skills/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_TARGET = 200;
/** Tarayıcı tanıyıcısının metni — bir cümlenin birkaç katı yeter. */
const MAX_TRANSCRIPT = 600;

/**
 * Telaffuz puanı: tarayıcının tanıdığı metin + hedef cümle → kelime hizalaması
 * (`lib/pronounce.ts`). SES ALMIYOR (Samet, 2026-09-27): ekran açıkken ses
 * sunucuya gönderilmiyor; web tarayıcının kendi tanıyıcısını (Web Speech API)
 * kullanıyor ve buraya yalnız onun metnini yolluyor. Eskiden klip bu uçta bir
 * STT sağlayıcısına gidiyordu ve kelime zaman damgalarından akıcılık ölçülüyordu;
 * tarayıcı zaman damgası vermediği için `hasWordTiming` artık hep false ve
 * akıcılık/hız alanları boş dönüyor. Metin bir sağlayıcıya gitmediği için ses
 * rızası da istenmiyor. Sonuç `pronounce` olayı olarak düşer (kind = egzersiz
 * kimliği, value = puan) — profil ve KPI oradan okur.
 *
 * Kota: kullanıcı başına günlük sayaç (`DAILY_QUOTAS.pronounceRequests`).
 */
const DAILY_LIMIT = DAILY_QUOTAS.pronounceRequests;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  /* HESAP İSTER: puan profile ve sınav kaydına yazılıyor; misafire kapalı (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;

  let transcript = "";
  let target = "";
  let exerciseId = "";
  let language = "de";
  let confusions: SpeechConfusion[] = [];
  let examToken = "";
  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (typeof body.transcript === "string") transcript = body.transcript.trim().slice(0, MAX_TRANSCRIPT);
    if (typeof body.target === "string") target = body.target.trim().slice(0, MAX_TARGET);
    // Sınav madde id'leri büyük harf/nokta içerebiliyor (ör. s:A1.2:0); charset
    // genişletildi ki skor jetonu bağlaması (F7) çalışsın.
    if (typeof body.exerciseId === "string" && /^[A-Za-z0-9_:.-]{1,48}$/.test(body.exerciseId)) exerciseId = body.exerciseId;
    if (typeof body.examToken === "string") examToken = body.examToken;
    if (typeof body.language === "string" && /^[a-z]{2}$/.test(body.language)) language = body.language;
    if (Array.isArray(body.confusions)) {
      confusions = body.confusions.filter((x): x is SpeechConfusion => typeof x === "object" && x !== null && Array.isArray((x as SpeechConfusion).heard) && typeof (x as SpeechConfusion).fix === "string").slice(0, 8);
    }
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  // SINAV KONUŞMA OVERRIDE — güvenlik denetimi F7 (teorik açık kapatma):
  // geçerli examToken + exerciseId gelirse hedef cümle mühürlü kâğıttan alınır
  // (istemcinin gönderdiği kolay hedef değil). Skor jetonu YALNIZ o zaman imzalanır.
  let examVerified = false;
  if (examToken && exerciseId) {
    const key = openKeyFor(examToken, userId);
    const sealed = key ? examSpeakingTarget(key, exerciseId) : null;
    if (sealed) {
      target = sealed.slice(0, MAX_TARGET);
      examVerified = true;
    }
  }
  if (!target) return NextResponse.json({ error: "no_target" }, { status: 400 });

  if (!(await takeUsage(userId, "pronounce_requests", "day", DAILY_LIMIT))) {
    return NextResponse.json({ error: "quota" }, { status: 429 });
  }

  // Boş metin geçerli: tanıyıcı hiçbir şey duymadı → puan 0, bütün kelimeler eksik.
  const score = scorePronunciation(target, transcript, { confusions, lang: language === "en" ? "en" : "de" });
  if (exerciseId) void track(userId, "pronounce", new Date().toISOString().slice(0, 10), score.overall, exerciseId);
  // F7: konuşma puanını imzala — AMA yalnız hedef mühürlü kâğıttan geldiyse
  // (examVerified). Jeton = "sunucunun sınav hedefine karşı puanlandı".
  const scoreToken = examVerified && typeof score.overall === "number" ? signScore(userId, "speaking", exerciseId, score.overall) : undefined;
  return NextResponse.json({ ...score, provider: "browser", hasWordTiming: false, ...(scoreToken ? { scoreToken } : {}) });
}

export async function GET() {
  return NextResponse.json({ configured: true }, { headers: { "cache-control": "no-store" } });
}
