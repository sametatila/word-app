import type { BetterAuthPlugin } from "better-auth";
import { APIError, createAuthEndpoint, getSessionFromCtx } from "better-auth/api";
import { setSessionCookie } from "better-auth/cookies";

/**
 * MİSAFİR OTURUMUNU CİHAZDAKİ JETONLA GERİ KUR — `POST /api/auth/guest/resume`.
 *
 *   POST { guestId, token }  →  200 { token, user: { id } }  + oturum çerezi
 *
 * Misafirin giriş yolu yok: çerezi bir kez kaybolursa kimliğine dönemiyor ve
 * giriş ekranındaki "Hesapsız devam et" YENİ bir misafir açıp eskisinin
 * ilerlemesini sahipsiz bırakıyordu. Çerezin kaybolduğu gerçek yollar:
 *
 *   - İKİ ADIMLI DOĞRULAMASI olan bir hesaba giriş. Parola kabul edilince
 *     2FA eklentisi yeni oturumun çerezini SİLİYOR (misafirin çerezinin yerine
 *     yazılmış olanı) ve kod bekliyor. Kod girilmezse cihazda hiçbir oturum
 *     kalmıyor. Misafirin çerezi kod beklenirken geri KONAMAZ: eklenti oturum
 *     varken kodu o oturumun kodu sayıyor (bkz. two-factor verify-two-factor).
 *   - Uygulama verisinin kısmen silinmesi / çerez deposunun sıfırlanması.
 *
 * Kanıt misafirin kendi oturum jetonu — misafir açılırken cihaza yazılan ve
 * `/api/account/guest/claim`in de istediği değer (bkz. lib/account/guest-merge
 * `verifyGuestToken`). Jeton zaten oturumun kendisi; bu uç ona yeni bir yetki
 * eklemiyor, yalnız çerez deposuna geri koyuyor.
 *
 * SÜRESİ GEÇMİŞ OTURUMDA yeni oturum açılıyor: misafir haftalık temizlik onu
 * silene dek duruyor (bkz. `purgeStaleGuests`) ve ilerlemesi ona bağlı.
 * Hesap oturumu açıkken çağrı reddediliyor: misafir çerezi hesabın çerezini
 * ezmemeli.
 */
export const guestResume = () =>
  ({
    id: "guest-resume",
    endpoints: {
      guestResume: createAuthEndpoint("/guest/resume", { method: "POST" }, async (ctx) => {
        const body = (ctx.body ?? {}) as { guestId?: unknown; token?: unknown };
        const guestId = typeof body.guestId === "string" && body.guestId.length > 0 && body.guestId.length <= 64 ? body.guestId : null;
        const token = typeof body.token === "string" && body.token.length >= 16 && body.token.length <= 128 ? body.token : null;
        if (!guestId || !token) throw new APIError("BAD_REQUEST", { code: "BAD_REQUEST", message: "guestId and token are required." });

        const current = await getSessionFromCtx(ctx, { disableRefresh: true });
        if (current && !(current.user as { isAnonymous?: boolean | null }).isAnonymous) {
          throw new APIError("CONFLICT", { code: "ACCOUNT_SESSION", message: "An account session is already active." });
        }

        const found = await ctx.context.internalAdapter.findSession(token);
        const guest = found?.user as { id: string; isAnonymous?: boolean | null } | undefined;
        if (!found || !guest || guest.id !== guestId || guest.isAnonymous !== true) {
          throw new APIError("NOT_FOUND", { code: "GUEST_NOT_FOUND", message: "Guest not found." });
        }

        let session = found.session;
        if (session.expiresAt.getTime() <= Date.now()) {
          const fresh = await ctx.context.internalAdapter.createSession(guest.id);
          if (!fresh) throw new APIError("INTERNAL_SERVER_ERROR", { code: "FAILED_TO_CREATE_SESSION", message: "Failed to create session." });
          await ctx.context.internalAdapter.deleteSession(token);
          session = fresh;
        }
        await setSessionCookie(ctx, { session, user: found.user });
        return ctx.json({ token: session.token, user: { id: guest.id } });
      }),
    },
  }) satisfies BetterAuthPlugin;
