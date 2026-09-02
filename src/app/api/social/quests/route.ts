import { SocialError } from "@/lib/social/errors";
import { dayParam, handleError, ok, readJson, requireUser, strParam } from "@/lib/social/http";
import { inviteQuest, questViews } from "@/lib/social/quests";

export const dynamic = "force-dynamic";

/** Ortak görevlerim: bu haftanın davet/aktif olanları + son dört haftanın sonuçları. */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const today = dayParam(new URL(req.url).searchParams.get("day"));
  try {
    return ok({ quests: await questViews(user, today), today });
  } catch (err) {
    return handleError("social:quests", err);
  }
}

/** Arkadaşı bu haftanın görevine davet et: { userId, day? }. */
export async function POST(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const friendId = strParam(body?.userId, 64);
  const today = dayParam(body?.day);
  try {
    if (!friendId) throw new SocialError("bad_request", 400);
    return ok(await inviteQuest(user, friendId, today), 201);
  } catch (err) {
    return handleError("social:quests:invite", err);
  }
}
