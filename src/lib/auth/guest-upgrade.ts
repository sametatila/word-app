import type { BetterAuthPlugin } from "better-auth";
import { APIError, createAuthEndpoint, createEmailVerificationToken, getSessionFromCtx } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";
import { GUEST_EMAIL_DOMAIN } from "@/lib/auth/guest-email";

/**
 * MİSAFİRİ YERİNDE HESABA ÇEVİR — `POST /api/auth/guest/upgrade`.
 *
 *   POST { name, email, password }  (misafir oturumuyla)
 *     → `/sign-up/email` ile AYNI yanıt: { token: null, user } doğrulama
 *       bekleniyorsa, { token, user } hesap hemen açıldıysa.
 *
 * NEDEN: e-postayla hesap açan misafir için eski yol yeni bir kullanıcı
 * açıp misafirin 37 tablodaki satırlarını ona KOPYALAMAKTI (bkz.
 * lib/account/guest-merge). Firebase'in `linkWithCredential`i gibi burada
 * kimliğe e-posta ve parola bağlanıyor; kullanıcı kimliği aynı kalıyor,
 * taşınacak satır yok. Birleştirme hâlâ gerekli ve duruyor: VAR OLAN bir
 * hesaba giriş ile sosyal giriş (hesabı sağlayıcının geri dönüşü açıyor)
 * onu kullanıyor.
 *
 * DOĞRULAMA KURALI KORUNUYOR. `requireEmailVerification` açıkken kayıt
 * doğrulanmadan oturum vermiyor; burada kimlik doğrulanana dek MİSAFİR
 * kalıyor (`isAnonymous`): e-posta ve parola bağlı ama hesap kapıları
 * (yapay zekâ, sosyal, satın alma) açılmıyor. Bayrağı doğrulama indiriyor
 * (server.ts `afterEmailVerification`). SMTP yokken kayıt doğrulamasız açıldığı gibi bu da
 * hemen hesap oluyor.
 *
 * VAR OLAN E-POSTA SIZDIRILMIYOR: kayıt ucuyla aynı genel yanıt dönüyor ve
 * adresin sahibine "bu adresle hesap var" postası gidiyor; misafir misafir
 * kalıyor, isterse hesabına giriş yapıp birleştiriyor. Parola kuralı kayıtla
 * aynı kancadan geçiyor (server.ts `GUARDED`).
 */
export const guestUpgrade = () =>
  ({
    id: "guest-upgrade",
    endpoints: {
      guestUpgrade: createAuthEndpoint("/guest/upgrade", { method: "POST" }, async (ctx) => {
        const current = await getSessionFromCtx(ctx, { disableRefresh: true });
        const guest = current?.user as { id: string; isAnonymous?: boolean | null } | undefined;
        if (!current || !guest || guest.isAnonymous !== true) {
          throw new APIError("FORBIDDEN", { code: "NOT_GUEST", message: "Only a guest session can be upgraded." });
        }

        const body = (ctx.body ?? {}) as { name?: unknown; email?: unknown; password?: unknown };
        const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
        const password = typeof body.password === "string" ? body.password : "";
        const name = typeof body.name === "string" ? body.name.trim() : "";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || email.endsWith(`@${GUEST_EMAIL_DOMAIN}`)) {
          throw new APIError("BAD_REQUEST", { code: "INVALID_EMAIL", message: "Invalid email" });
        }
        const cfg = ctx.context.password.config;
        if (password.length < cfg.minPasswordLength) throw new APIError("BAD_REQUEST", { code: "PASSWORD_TOO_SHORT", message: "Password too short" });
        if (password.length > cfg.maxPasswordLength) throw new APIError("BAD_REQUEST", { code: "PASSWORD_TOO_LONG", message: "Password too long" });

        const options = ctx.context.options;
        const verify = Boolean(options.emailAndPassword?.requireEmailVerification);
        const generic = (user: Record<string, unknown>) => ctx.json({ token: null, user: { id: guest.id, email, name, emailVerified: false, ...user } });

        const existing = await ctx.context.internalAdapter.findUserByEmail(email);
        if (existing?.user && existing.user.id !== guest.id) {
          // Zamanlama farkı kalmasın diye parola yine özetleniyor (kayıt ucuyla aynı).
          await ctx.context.password.hash(password);
          if (!verify) throw new APIError("UNPROCESSABLE_ENTITY", { code: "USER_ALREADY_EXISTS", message: "User already exists" });
          if (options.emailAndPassword?.onExistingUserSignUp) await options.emailAndPassword.onExistingUserSignUp({ user: existing.user }, ctx.request);
          return generic({});
        }

        const hash = await ctx.context.password.hash(password);
        const updated = await ctx.context.internalAdapter.updateUser(guest.id, {
          email,
          // E-posta öneki ad yapılmıyor: görünen ad herkese açık (içerik denetimi CNT-3).
          name: name || "",
          emailVerified: false,
          ...(verify ? {} : { isAnonymous: false }),
        });
        // Doğrulamadan önce e-posta değiştirilip yeniden denenirse ikinci bir parola satırı açılmıyor.
        const accounts = await ctx.context.internalAdapter.findAccounts(guest.id);
        if (accounts.some((a) => a.providerId === "credential")) await ctx.context.internalAdapter.updatePassword(guest.id, hash);
        else await ctx.context.internalAdapter.linkAccount({ userId: guest.id, providerId: "credential", accountId: guest.id, password: hash });

        if (verify) {
          const token = await createEmailVerificationToken(ctx.context.secret, email, undefined, options.emailVerification?.expiresIn);
          const url = `${ctx.context.baseURL}/verify-email?token=${token}&callbackURL=${encodeURIComponent("/")}`;
          await options.emailVerification?.sendVerificationEmail?.({ user: updated, url, token }, ctx.request);
          return generic({});
        }
        // Hemen hesap oldu: çerezdeki kullanıcı önbelleği misafir demesin.
        await setSessionCookie(ctx, { session: current.session, user: updated });
        return ctx.json({ token: current.session.token, user: updated });
      }),
    },
  }) satisfies BetterAuthPlugin;
