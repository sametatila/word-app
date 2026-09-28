import { SocialError } from "@/lib/social/errors";
import { dayParam, handleError, ok, readJson, requireUser } from "@/lib/social/http";
import { leagueBoard, markLeagueResultSeen } from "@/lib/social/leagues";
import { closeWeekIfNeeded } from "@/lib/social/weekly";
import { leagueResultKeys, partsForKeys, profileLang } from "@/lib/avatar-items";

export const dynamic = "force-dynamic";

/** Bu haftanın lig tablosu: grubum, canlı XP, terfi/düşme kuşakları, gösterilmemiş geçen hafta sonucu. */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const today = dayParam(new URL(req.url).searchParams.get("day"));
  try {
    // Geçen haftanın kapanışı tabloyu okumadan ÖNCE: sonuç ekranı ilk bakışta çıksın.
    await closeWeekIfNeeded(today);
    const board = await leagueBoard(user, today);
    if (!board.result) return ok(board);
    /* Sonuç ekranı: bu hafta İLK KEZ açılan lig parçaları (`result.parts`).
       Aksesuar hesabı düşerse sonuç ekranı yine çıkar. */
    const parts = await leagueResultKeys(user, board.result)
      .then(async (keys) => (keys.length ? partsForKeys(keys, await profileLang(user)) : []))
      .catch(() => []);
    return ok(parts.length ? { ...board, result: { ...board.result, parts } } : board);
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
