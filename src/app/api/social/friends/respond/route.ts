import { SocialError } from "@/lib/social/errors";
import { respondRequest } from "@/lib/social/friends";
import { handleError, intParam, ok, readJson, requireUser } from "@/lib/social/http";

export const dynamic = "force-dynamic";

/** Gelen isteği cevapla: { id, action: "accept" | "decline" }. Yalnız alıcı. */
export async function POST(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const id = intParam(body?.id);
  const action = body?.action;
  try {
    if (!id || (action !== "accept" && action !== "decline")) throw new SocialError("bad_request", 400);
    await respondRequest(user, id, action);
    return ok({ ok: true, state: action === "accept" ? "friends" : "none" });
  } catch (err) {
    return handleError("social:friends:respond", err);
  }
}
