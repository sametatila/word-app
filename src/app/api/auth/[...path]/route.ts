import { auth } from "@/lib/auth/server";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Better Auth uçları (/api/auth/*). Catch-all rota; Better Auth handler'ı tam
 * URL'e bakarak sign-in/email, sign-up/email, get-session, sign-out,
 * sign-in/social, request-password-reset vb. hepsini karşılar.
 */
export const dynamic = "force-dynamic";
export const { GET, POST } = toNextJsHandler(auth);
