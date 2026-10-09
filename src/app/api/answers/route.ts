import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { profiles } from "@/lib/db/schema";
import { clampDay } from "@/lib/award";
import { cleanDetail, confusionKind, isErrorType } from "@/lib/errors";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { consume } from "@/lib/social/ratelimit";
import { claimBatch, isBatchId, releaseBatch, settleBatch } from "@/lib/answer-batches";
import { saveSessionProgress, submitAnswers } from "@/lib/session";
import { parseProgress } from "@/lib/progress";
import { GAME_LABEL_KEYS, type Answer, type GameId, type Wager } from "@/lib/types";

export const dynamic = "force-dynamic";

/**
 * Kabul edilen oyunlar — TEK KAYNAKTAN.
 *
 * Burada elle yazılmış bir liste vardı ve sürüklendi: "Çevir" oyunu eklendiğinde
 * kimse bu dosyayı açmadı. Sonucu şuydu — çeviri cevabı gelen her istek 400
 * dönüyor, istemci turu kaydedemiyor ve "bağlantın koptu" uyarısı çıkıyordu.
 * Bağlantı kopmamıştı; istek reddediliyordu.
 *
 * `GAME_LABEL_KEYS` bir `Record<GameId, string>`, yani anahtarları GameId'nin
 * TAMAMI ve derleyici eksik bırakmaya izin vermiyor. Listeyi ondan türetmek
 * aynı sürüklenmeyi bir daha imkânsız kılıyor.
 */
const GAMES = new Set(Object.keys(GAME_LABEL_KEYS));

/**
 * Hız sınırı — gerçek oyunun çok üstünde (bir tur birkaç saniyede bir POST
 * eder), yalnız otomatik kötüye kullanımı yakalar. XP'nin ASIL sınırı
 * submitAnswers'daki günlük tavan; bu, uydurma döngüsünün hızını keser
 * (güvenlik denetimi #2). Sayaç atomik + üç instance'ta ortak (Postgres).
 */
const ANSWERS_RATE_LIMIT = 120;
const ANSWERS_RATE_WINDOW_SEC = 60;

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const rl = await consume(`answers:${userId}`, ANSWERS_RATE_LIMIT, ANSWERS_RATE_WINDOW_SEC);
  if (!rl.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "retry-after": String(rl.retryAfterSec) } });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  /*
    TEKRAR KİMLİĞİ (`batch`, bkz. schema `answerBatches`). Aynı tur ikinci kez
    geldiyse işlenmiyor, ilkinin yanıtı dönüyor: bağlantı yanıttan önce
    koptuğunda istemci yeniden gönderiyor (anlık tekrar, kuyruk, sendBeacon)
    ve tur iki kez sayılıyordu. Kimliksiz istek (eski istemci) eskisi gibi.
  */
  const batch = parsed.batch;
  if (batch) {
    const claim = await claimBatch(userId, batch);
    if (!claim.claimed) {
      return claim.result
        ? NextResponse.json({ ...claim.result, duplicate: true })
        : NextResponse.json({ error: "in_progress" }, { status: 409 });
    }
  }

  try {
    /*
      SERİ ANI İÇİN "ÖNCE". Tur sonundaki kısa sahne (web `streak-moment`,
      mobil `ui/StreakMoment`) yalnız serinin BU istekte arttığı günde
      oynuyor. Yanıttaki `currentStreak` tek başına bunu söylemiyor: günün
      ikinci turunda da aynı sayı dönüyor. Gün, `lastActiveDay` bu istekten
      önce bugünden GERİDEYSE sayıldı (`nextStreak` o durumda seriyi ya bir
      artırıyor ya da 1'den başlatıyor); ileri tarihli ya da bugünkü değer
      seriye dokunmuyor. Profil satırı yoksa ilk etkinlik, o da sayılır.
    */
    const [before] = await db
      .select({ lastActiveDay: profiles.lastActiveDay })
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);
    const result = await submitAnswers(
      userId,
      parsed.answers,
      parsed.day,
      parsed.seconds,
      parsed.wager,
    );
    // Turun nerede kalındığı cevaplarla aynı istekte gider: her turda iki ayrı
    // ağ isteği yapmak mobilde gereksiz bir gecikme olurdu.
    if (parsed.progress) await saveSessionProgress(userId, parsed.day, parsed.progress);
    const streakUp = !before?.lastActiveDay || before.lastActiveDay < parsed.day;
    const payload = { ...result, streakUp };
    /* Yazılamazsa tur YİNE işlenmiş sayılıyor: kimlik bırakılmıyor (aşağıdaki
       catch'e düşmesin), kopya 409 alır ve tur ikinci kez sayılmaz. */
    if (batch) await settleBatch(userId, batch, payload).catch((err) => console.error("[answers] batch", err));
    return NextResponse.json(payload);
  } catch (err) {
    console.error("[answers]", err);
    if (batch) await releaseBatch(userId, batch).catch(() => {});
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

function parseBody(body: unknown) {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.answers) || b.answers.length === 0 || b.answers.length > 100) return null;

  const answers: Answer[] = [];
  for (const raw of b.answers) {
    if (typeof raw !== "object" || raw === null) return null;
    const a = raw as Record<string, unknown>;
    if (typeof a.wordId !== "number" || !Number.isInteger(a.wordId)) return null;
    if (typeof a.game !== "string" || !GAMES.has(a.game)) return null;
    if (typeof a.correct !== "boolean") return null;
    // "Hatırlamadım" yalnız doğru-değil cevapta anlamlı; hata tipi taşımaz.
    const selfMiss = a.selfMiss === true && a.correct === false;
    answers.push({
      wordId: a.wordId,
      game: a.game as GameId,
      correct: a.correct,
      latencyMs: typeof a.latencyMs === "number" ? Math.max(0, Math.round(a.latencyMs)) : 0,
      hintUsed: a.hintUsed === true,
      quality: typeof a.quality === "number" && Number.isFinite(a.quality) ? a.quality : undefined,
      ...(selfMiss ? { selfMiss: true } : {}),
      // Hata tipi yalnız yanlış cevapta ve yalnız listeden; gerisi düşer.
      errorType: a.correct === false && !selfMiss && isErrorType(a.errorType) ? a.errorType : undefined,
      /* "Anlam" hatasında ayrıntı karıştırma çiftinin kaynağı: yalnız iki kelime
         arasındaki karıştırma saklanıyor (QA F-0059; çeviri cümlesi, "x" gibi
         ayrıntılar "Karıştırdıkların"a düşüyordu). */
      detail:
        a.correct === false && !selfMiss && (a.errorType !== "meaning" || confusionKind(a.game, cleanDetail(a.detail)))
          ? (cleanDetail(a.detail) ?? undefined)
          : undefined,
    });
  }

  const day = clampDay(b.day);
  const seconds = typeof b.seconds === "number" ? Math.max(0, Math.round(b.seconds)) : 0;
  // İlerleme isteğe bağlıdır: meydan okuma turu cevap gönderir ama kayıtlı bir
  // oturuma ait değildir.
  return { answers, day, seconds, progress: parseProgress(b.progress), wager: parseWager(b.wager), batch: isBatchId(b.batch) ? b.batch : null };
}

/**
 * Bahis sonucu.
 *
 * Doğrulama dar: etap beş turluk olduğu için `total` 1–10 arasında, `correct`
 * ondan büyük olamaz, `stake` tavanlı. Bozuk ya da abartılı bir istek puan
 * basamaz; hesabın kendisi de `xpForWager` içinde ayrıca sınırlanıyor.
 */
function parseWager(raw: unknown): Wager | null {
  if (typeof raw !== "object" || raw === null) return null;
  const w = raw as Record<string, unknown>;
  if (typeof w.correct !== "number" || typeof w.total !== "number" || typeof w.stake !== "number") {
    return null;
  }
  const total = Math.round(w.total);
  const correct = Math.round(w.correct);
  if (!Number.isFinite(total) || total < 1 || total > 10) return null;
  if (!Number.isFinite(correct) || correct < 0 || correct > total) return null;
  return { total, correct, stake: Math.max(0, Math.min(250, Math.round(w.stake))) };
}
