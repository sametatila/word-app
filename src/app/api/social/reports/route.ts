import { reportUser } from "@/lib/social/blocks";
import { SocialError } from "@/lib/social/errors";
import { handleError, ok, readJson, requireUser, strParam } from "@/lib/social/http";
import { limited } from "@/lib/social/ratelimit";
import { REPORT_REASONS, type ReportReason } from "@/lib/social/types";

export const dynamic = "force-dynamic";

/** Şikayet: { userId, reason, detail? }. Kayıt alınır; insan okur. */
export async function POST(req: Request) {
  const user = await requireUser(req, true);
  if (typeof user !== "string") return user;
  const body = await readJson(req);
  const other = strParam(body?.userId, 64);
  const reason = body?.reason;
  const detail = typeof body?.detail === "string" ? body.detail.replace(/\s+/g, " ").trim().slice(0, 500) : null;
  try {
    if (!other || other === user || typeof reason !== "string" || !(REPORT_REASONS as readonly string[]).includes(reason)) {
      throw new SocialError("bad_request", 400);
    }
    const rl = await limited("report", user);
    if (!rl.ok) throw new SocialError("rate_limited", 429, rl.retryAfterSec);
    await reportUser(user, other, reason as ReportReason, detail || null);
    return ok({ ok: true });
  } catch (err) {
    return handleError("social:report", err);
  }
}
