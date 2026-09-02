import { handleError, ok, requireUser } from "@/lib/social/http";
import { publicProfile } from "@/lib/social/profile";

export const dynamic = "force-dynamic";

/** Herkese açık profil — görünürlüğe ve ilişkiye göre kırpılmış. */
export async function GET(req: Request, ctx: { params: Promise<{ username: string }> }) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const { username } = await ctx.params;
  try {
    return ok(await publicProfile(user, username));
  } catch (err) {
    return handleError("social:profile", err);
  }
}
