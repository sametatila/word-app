import { SocialError } from "@/lib/social/errors";
import { handleError, intParam, ok, readJson, requireUser } from "@/lib/social/http";
import { listNotifications, markRead, unreadCount } from "@/lib/social/notify";

export const dynamic = "force-dynamic";

/**
 * Gelen kutusu: ?cursor=<id> ile sayfalı; okunmamış sayısıyla birlikte.
 *
 * `?only=unread`: YALNIZ SAYI. Zil rozetleri (web `notification-bell`, mobil
 * `useUnread`) listeyi hiç kullanmıyordu ama her yoklamada 30 satırlık liste
 * sorgusunu da çalıştırıyordu; ölçümde bu uç 14 günde 10.646 istekle en yoğun
 * API'ydi (2026-09-17).
 */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const params = new URL(req.url).searchParams;
  if (params.get("only") === "unread") {
    try {
      return ok({ unread: await unreadCount(user) });
    } catch (err) {
      return handleError("social:notifications:unread", err);
    }
  }
  const cursor = intParam(params.get("cursor"));
  try {
    const [page, unread] = await Promise.all([listNotifications(user, cursor, 30), unreadCount(user)]);
    return ok({ ...page, unread });
  } catch (err) {
    return handleError("social:notifications", err);
  }
}

/** Okundu işaretle: { ids: number[] } ya da { all: true }. */
export async function POST(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  try {
    if (body?.all === true) await markRead(user, "all");
    else if (Array.isArray(body?.ids)) {
      const ids = (body.ids as unknown[]).map(intParam).filter((n): n is number => n !== null).slice(0, 200);
      await markRead(user, ids);
    } else throw new SocialError("bad_request", 400);
    return ok({ ok: true, unread: await unreadCount(user) });
  } catch (err) {
    return handleError("social:notifications:read", err);
  }
}
