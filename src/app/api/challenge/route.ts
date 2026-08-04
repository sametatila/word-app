import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { buildChallenge } from "@/lib/session";

export const dynamic = "force-dynamic";

/** Süreye karşı meydan okuma: öğrenilenlerden rastgele, karışık oyun türleriyle. */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  try {
    return NextResponse.json(await buildChallenge(userId));
  } catch (err) {
    console.error("[challenge]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
