import { feed } from "@/lib/social/activity";
import { dayParam, handleError, ok, requireUser } from "@/lib/social/http";
import { closeWeekIfNeeded } from "@/lib/social/weekly";

export const dynamic = "force-dynamic";

/** Arkadaş akışı: ?cursor= ile sayfalı; her öğede tepki özeti ve benim tepkim. */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const url = new URL(req.url);
  const cursor = url.searchParams.get("cursor");
  const today = dayParam(url.searchParams.get("day"));
  try {
    await closeWeekIfNeeded(today);
    return ok(await feed(user, cursor && cursor.length < 80 ? cursor : null, 20));
  } catch (err) {
    return handleError("social:feed", err);
  }
}
