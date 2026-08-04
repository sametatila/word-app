import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth";
import { markKnown } from "@/lib/session";

export const dynamic = "force-dynamic";

/** "Bunu zaten biliyorum": kelime tekrar kuyruğuna girmeden pekişmiş sayılır. */
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const wordId = body.wordId;
  if (typeof wordId !== "number" || !Number.isInteger(wordId)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    const dueAt = await markKnown(userId, wordId);
    return NextResponse.json({ ok: true, dueAt });
  } catch (err) {
    console.error("[known]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
