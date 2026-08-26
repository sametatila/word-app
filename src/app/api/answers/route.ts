import { NextResponse } from "next/server";
import { cleanDetail, isErrorType } from "@/lib/errors";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { saveSessionProgress, submitAnswers } from "@/lib/session";
import { parseProgress } from "@/lib/progress";
import { GAME_LABELS, type Answer, type GameId, type Wager } from "@/lib/types";

export const dynamic = "force-dynamic";

/**
 * Kabul edilen oyunlar — TEK KAYNAKTAN.
 *
 * Burada elle yazılmış bir liste vardı ve sürüklendi: "Çevir" oyunu eklendiğinde
 * kimse bu dosyayı açmadı. Sonucu şuydu — çeviri cevabı gelen her istek 400
 * dönüyor, istemci turu kaydedemiyor ve "bağlantın koptu" uyarısı çıkıyordu.
 * Bağlantı kopmamıştı; istek reddediliyordu.
 *
 * `GAME_LABELS` bir `Record<GameId, string>`, yani anahtarları GameId'nin
 * TAMAMI ve derleyici eksik bırakmaya izin vermiyor. Listeyi ondan türetmek
 * aynı sürüklenmeyi bir daha imkânsız kılıyor.
 */
const GAMES = new Set(Object.keys(GAME_LABELS));

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  try {
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
    return NextResponse.json(result);
  } catch (err) {
    console.error("[answers]", err);
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
    answers.push({
      wordId: a.wordId,
      game: a.game as GameId,
      correct: a.correct,
      latencyMs: typeof a.latencyMs === "number" ? Math.max(0, Math.round(a.latencyMs)) : 0,
      hintUsed: a.hintUsed === true,
      quality: typeof a.quality === "number" && Number.isFinite(a.quality) ? a.quality : undefined,
      // Hata tipi yalnız yanlış cevapta ve yalnız listeden; gerisi düşer.
      errorType: a.correct === false && isErrorType(a.errorType) ? a.errorType : undefined,
      detail: a.correct === false ? (cleanDetail(a.detail) ?? undefined) : undefined,
    });
  }

  const day =
    typeof b.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.day)
      ? b.day
      : new Date().toISOString().slice(0, 10);
  const seconds = typeof b.seconds === "number" ? Math.max(0, Math.round(b.seconds)) : 0;
  // İlerleme isteğe bağlıdır: meydan okuma turu cevap gönderir ama kayıtlı bir
  // oturuma ait değildir.
  return { answers, day, seconds, progress: parseProgress(b.progress), wager: parseWager(b.wager) };
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
