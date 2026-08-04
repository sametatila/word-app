import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { submitAnswers } from "@/lib/session";
import type { Answer, GameId } from "@/lib/types";

export const dynamic = "force-dynamic";

const GAMES: GameId[] = ["intro", "match", "choice", "artikel", "cloze", "scramble", "typing"];

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
    const result = await submitAnswers(userId, parsed.answers, parsed.day, parsed.seconds);
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
    if (typeof a.game !== "string" || !GAMES.includes(a.game as GameId)) return null;
    if (typeof a.correct !== "boolean") return null;
    answers.push({
      wordId: a.wordId,
      game: a.game as GameId,
      correct: a.correct,
      latencyMs: typeof a.latencyMs === "number" ? Math.max(0, Math.round(a.latencyMs)) : 0,
      hintUsed: a.hintUsed === true,
    });
  }

  const day =
    typeof b.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(b.day)
      ? b.day
      : new Date().toISOString().slice(0, 10);
  const seconds = typeof b.seconds === "number" ? Math.max(0, Math.round(b.seconds)) : 0;
  return { answers, day, seconds };
}
