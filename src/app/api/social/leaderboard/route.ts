import { dayParam, handleError, ok, requireUser } from "@/lib/social/http";
import { friendsLeaderboard } from "@/lib/social/leaderboard";

export const dynamic = "force-dynamic";

/** Arkadaşlar arası haftalık tablo (ben + arkadaşlarım). */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const today = dayParam(new URL(req.url).searchParams.get("day"));
  try {
    return ok(await friendsLeaderboard(user, today));
  } catch (err) {
    return handleError("social:leaderboard", err);
  }
}
