import { SocialError } from "@/lib/social/errors";
import { dayParam, handleError, ok, readJson, requireUser } from "@/lib/social/http";
import { leagueBoard, markLeagueResultSeen } from "@/lib/social/leagues";
import { closeWeekIfNeeded } from "@/lib/social/weekly";

export const dynamic = "force-dynamic";

/** Bu haftanın lig tablosu: grubum, canlı XP, terfi/düşme kuşakları, gösterilmemiş geçen hafta sonucu. */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const today = dayParam(new URL(req.url).searchParams.get("day"));
  try {
    // Geçen haftanın kapanışı tabloyu okumadan ÖNCE: sonuç ekranı ilk bakışta çıksın.
    await closeWeekIfNeeded(today);
    return ok(await leagueBoard(user, today));
  } catch (err) {
    return handleError("social:league", err);
  }
}

/** Sonuç ekranı gösterildi: { action: "seen" }. */
export async function POST(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  try {
    if (body?.action !== "seen") throw new SocialError("bad_request", 400);
    await markLeagueResultSeen(user);
    return ok({ ok: true });
  } catch (err) {
    return handleError("social:league:seen", err);
  }
}
