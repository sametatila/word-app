import { SocialError } from "@/lib/social/errors";
import { handleError, intParam, ok, readJson, requireUser } from "@/lib/social/http";
import { isReactionKind, react, unreact } from "@/lib/social/reactions";

export const dynamic = "force-dynamic";

/** Tepki ver/değiştir: { eventId, kind }. Cevap: olayın güncel tepki özeti. */
export async function POST(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const eventId = intParam(body?.eventId);
  const kind = body?.kind;
  try {
    if (!eventId || !isReactionKind(kind)) throw new SocialError("bad_request", 400);
    return ok(await react(user, eventId, kind));
  } catch (err) {
    return handleError("social:react", err);
  }
}

/** Tepkiyi geri al: { eventId }. */
export async function DELETE(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const eventId = intParam(body?.eventId);
  try {
    if (!eventId) throw new SocialError("bad_request", 400);
    return ok(await unreact(user, eventId));
  } catch (err) {
    return handleError("social:unreact", err);
  }
}
