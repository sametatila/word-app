import { SocialError } from "@/lib/social/errors";
import { handleError, ok, readJson, requireUser } from "@/lib/social/http";
import { socialMe, updateSocialSettings } from "@/lib/social/profile";

export const dynamic = "force-dynamic";

/** Sosyal profilim: kullanıcı adı, gizlilik, sayaçlar (arkadaş, istek, okunmamış). */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  try {
    return ok(await socialMe(user));
  } catch (err) {
    return handleError("social:me", err);
  }
}

/** Kullanıcı adı / bio / görünürlük / izinler. Alanlar tek tek doğrulanır. */
export async function PATCH(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  try {
    if (!body) throw new SocialError("bad_request", 400);
    return ok(await updateSocialSettings(user, body));
  } catch (err) {
    return handleError("social:me", err);
  }
}
