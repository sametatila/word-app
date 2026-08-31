import { auth, authEnabled } from "@/lib/auth/server";
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

/**
 * Better Auth uçları (/api/auth/*). Catch-all rota; Better Auth handler'ı tam
 * URL'e bakarak sign-in/email, sign-up/email, get-session, sign-out,
 * sign-in/social, request-password-reset vb. hepsini karşılar.
 */
export const dynamic = "force-dynamic";

/**
 * DATABASE_URL ya da BETTER_AUTH_SECRET tanımsızsa `auth` nesnesi derleme
 * geçsin diye herkesin bildiği bir yer tutucu sırla kurulur. O sırla oturum
 * imzalamak, oturumu hiç imzalamamak demek; bu yüzden uçlar kapalı kalır.
 */
const handler = toNextJsHandler(auth);
const disabled = () => NextResponse.json({ error: "auth_not_configured" }, { status: 503 });
export const GET = authEnabled ? handler.GET : disabled;
export const POST = authEnabled ? handler.POST : disabled;
