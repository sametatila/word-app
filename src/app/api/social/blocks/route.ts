import { blockUser, listBlocked, unblockUser } from "@/lib/social/blocks";
import { SocialError } from "@/lib/social/errors";
import { handleError, ok, readJson, requireUser, strParam } from "@/lib/social/http";
import { limited } from "@/lib/social/ratelimit";
import { track } from "@/lib/events";
import { serverToday } from "@/lib/social/dates";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  try {
    return ok({ blocked: await listBlocked(user) });
  } catch (err) {
    return handleError("social:blocks", err);
  }
}

/** Engelle: { userId }. Arkadaşlık, istek ve görev silinir; karşı taraf bilgilendirilmez. */
export async function POST(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const other = strParam(body?.userId, 64);
  try {
    if (!other || other === user) throw new SocialError("bad_request", 400);
    const rl = await limited("block", user);
    if (!rl.ok) throw new SocialError("rate_limited", 429, rl.retryAfterSec);
    await blockUser(user, other);
    await track(user, "block_user", serverToday());
    return ok({ ok: true });
  } catch (err) {
    return handleError("social:block", err);
  }
}

export async function DELETE(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const other = strParam(body?.userId, 64);
  try {
    if (!other) throw new SocialError("bad_request", 400);
    await unblockUser(user, other);
    return ok({ ok: true });
  } catch (err) {
    return handleError("social:unblock", err);
  }
}
