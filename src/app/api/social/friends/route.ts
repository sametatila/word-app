import { SocialError } from "@/lib/social/errors";
import { listFriends, pendingRequests, removeFriend, sendRequest } from "@/lib/social/friends";
import { dayParam, handleError, ok, readJson, requireUser, strParam } from "@/lib/social/http";
import { nudgedToday } from "@/lib/social/nudges";
import { closeWeekIfNeeded } from "@/lib/social/weekly";

export const dynamic = "force-dynamic";

/** Arkadaşlarım (seri, haftalık XP, arkadaş serisi) + bekleyen istekler + bugün dürttüklerim. */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const today = dayParam(new URL(req.url).searchParams.get("day"));
  try {
    await closeWeekIfNeeded(today);
    const [friends, pending] = await Promise.all([listFriends(user, today), pendingRequests(user)]);
    const nudged = await nudgedToday(user, friends.map((f) => f.userId));
    return ok({ friends, ...pending, nudgedToday: [...nudged], today });
  } catch (err) {
    return handleError("social:friends", err);
  }
}

/** Arkadaşlık isteği gönder: { userId }. Karşı taraf zaten istemişse anında arkadaş. */
export async function POST(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const other = strParam(body?.userId, 64);
  try {
    if (!other) throw new SocialError("bad_request", 400);
    return ok(await sendRequest(user, other));
  } catch (err) {
    return handleError("social:friends:request", err);
  }
}

/** Arkadaşlıktan çıkar / giden isteği iptal et: { userId }. Sessiz. */
export async function DELETE(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const other = strParam(body?.userId, 64);
  try {
    if (!other) throw new SocialError("bad_request", 400);
    await removeFriend(user, other);
    return ok({ ok: true });
  } catch (err) {
    return handleError("social:friends:remove", err);
  }
}
