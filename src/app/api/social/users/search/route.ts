import { handleError, ok, requireUser } from "@/lib/social/http";
import { searchUsers } from "@/lib/social/profile";

export const dynamic = "force-dynamic";

/** Kullanıcı arama: ?q= (kullanıcı adı öneki ya da görünen ad parçası). */
export async function GET(req: Request) {
  const user = await requireUser(req, false);
  if (typeof user !== "string") return user;
  const q = (new URL(req.url).searchParams.get("q") ?? "").slice(0, 60);
  try {
    return ok({ q, hits: await searchUsers(user, q) });
  } catch (err) {
    return handleError("social:search", err);
  }
}
