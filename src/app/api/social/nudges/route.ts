import { SocialError } from "@/lib/social/errors";
import { handleError, ok, readJson, requireUser, strParam } from "@/lib/social/http";
import { isNudgeKind, sendNudge } from "@/lib/social/nudges";

export const dynamic = "force-dynamic";

/** Dürt: { userId, kind: "remind" | "cheer" }. Arkadaş başına günde bir. */
export async function POST(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const to = strParam(body?.userId, 64);
  const kind = body?.kind ?? "remind";
  try {
    if (!to || !isNudgeKind(kind)) throw new SocialError("bad_request", 400);
    return ok(await sendNudge(user, to, kind));
  } catch (err) {
    return handleError("social:nudge", err);
  }
}
