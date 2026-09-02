import { suggestions } from "@/lib/social/friends";
import { dayParam, handleError, ok, requireUser } from "@/lib/social/http";

export const dynamic = "force-dynamic";

/** Tanıyor olabileceklerin: ortak arkadaş, aynı seviye, son yedi gün aktif. */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const today = dayParam(new URL(req.url).searchParams.get("day"));
  try {
    return ok({ suggestions: await suggestions(user, today) });
  } catch (err) {
    return handleError("social:suggestions", err);
  }
}
