import { NextResponse } from "next/server";
import { auth, getUserInfo } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { deleteGuest } from "@/lib/account/guest-merge";

export const dynamic = "force-dynamic";

/**
 * MİSAFİR VERİLERİNİ SİL — mobilde Profil › "Misafir verilerini sil".
 *
 *   DELETE  →  200 { deleted: true }
 *
 * Misafirin çıkış yapma yolu yok (giriş yöntemi yok, bir daha dönemez); bu
 * yüzden "çıkış" yerine bu var ve hesap silmenin misafirdeki karşılığı:
 * `purgeUserData` misafirin her satırını siliyor, sonra kullanıcı satırı ve
 * (FK ile) oturumları gidiyor. Better Auth'un kendi misafir silme ucu
 * temizlik yapmadığı için kapalı (bkz. lib/auth/server `anonymous`).
 *
 * Yanıt oturum çerezlerini de sona erdiriyor: satır silinse de çerez önbelleği
 * (60 sn) oturumu bir süre ayakta gösterirdi.
 */
export async function DELETE(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const who = await getUserInfo();
  if (!who) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  // Gerçek hesap bu uçla silinmez: hesap silme parola ya da taze giriş istiyor.
  if (!who.guest) return NextResponse.json({ error: "not_guest" }, { status: 403 });

  try {
    await deleteGuest(who.id);
  } catch (err) {
    console.error("[guest:delete]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }

  const res = NextResponse.json({ deleted: true }, { headers: { "cache-control": "no-store" } });
  const { authCookies } = await auth.$context;
  for (const c of [authCookies.sessionToken, authCookies.sessionData, authCookies.dontRememberToken]) {
    res.cookies.set(c.name, "", { path: "/", httpOnly: true, sameSite: "lax", secure: Boolean(c.attributes.secure), maxAge: 0 });
  }
  return res;
}
