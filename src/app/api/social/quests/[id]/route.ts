import { SocialError } from "@/lib/social/errors";
import { handleError, intParam, ok, readJson, requireUser } from "@/lib/social/http";
import { cancelQuest, respondQuest } from "@/lib/social/quests";

export const dynamic = "force-dynamic";

/** Görev daveti: { action: "accept" | "decline" | "cancel" }. accept/decline yalnız davet edilen; cancel iki taraf. */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const { id: idRaw } = await ctx.params;
  const id = intParam(idRaw);
  const body = await readJson(req);
  const action = body?.action;
  try {
    if (!id) throw new SocialError("bad_request", 400);
    if (action === "accept" || action === "decline") await respondQuest(user, id, action === "accept");
    else if (action === "cancel") await cancelQuest(user, id);
    else throw new SocialError("bad_request", 400);
    return ok({ ok: true });
  } catch (err) {
    return handleError("social:quests:respond", err);
  }
}
