import { NextResponse } from "next/server";
import { getUserInfo } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { consume } from "@/lib/social/ratelimit";
import { mergeGuestInto, verifyGuestToken } from "@/lib/account/guest-merge";

export const dynamic = "force-dynamic";

const NO_STORE = { "cache-control": "no-store" } as const;

/**
 * MİSAFİRİN İLERLEMESİNİ HESABA AL — mağaza ön inceleme B24.
 *
 *   POST { guestId, token }  →  200 { merged: true, targetHadProgress }
 *
 * Mobil uygulama gerçek bir oturum açılır açılmaz (kayıt, giriş, sosyal giriş,
 * Android'deki Apple devri, e-posta doğrulama bağlantısı) bu ucu çağırıyor.
 * Kimlik iki kanıta dayanıyor: istek GERÇEK hesabın oturumuyla geliyor, gövde
 * de misafirin kendi oturum jetonunu taşıyor — misafir kimliğini açarken
 * cihaza yazılan jeton (bkz. mobil `lib/guest`). Jeton olmadan başkasının
 * misafirini hesabına almak mümkün değil; jeton 32 karakterlik rastgele dizge.
 *
 * YENİ HESAP da VAR OLAN HESAP da bu uçtan geçiyor; ikisinde de misafirin
 * satırları hesaba birleşiyor ve misafir siliniyor (kurallar lib/account/
 * guest-merge). `targetHadProgress` istemcinin cümlesini seçiyor: "ilerlemen
 * hesabına taşındı" ya da "hesabındaki ilerlemeyle birleştirildi".
 *
 * Misafir bulunamazsa (jeton yanlış, temizlik silmiş, iki istek yarışmış)
 * 404 `guest_not_found`: istemci kaydını siliyor ve devam ediyor, çünkü
 * birleştirilecek bir şey kalmamış.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const who = await getUserInfo();
  if (!who) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  // Misafir oturumuyla misafir almak anlamsız: hedef gerçek bir hesap olmalı.
  if (who.guest) return NextResponse.json({ error: "guest_session" }, { status: 403 });

  let body: { guestId?: unknown; token?: unknown };
  try {
    body = (await req.json()) as { guestId?: unknown; token?: unknown };
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  const guestId = typeof body.guestId === "string" && body.guestId.length > 0 && body.guestId.length <= 64 ? body.guestId : null;
  const token = typeof body.token === "string" && body.token.length >= 16 && body.token.length <= 128 ? body.token : null;
  if (!guestId || !token) return NextResponse.json({ error: "bad_request" }, { status: 400 });

  /* Jeton tahmin edilemez, ama yine de hesap başına sınır: bir hesabın saatte
     onlarca misafir birleştirmesi meşru bir akış değil. Anahtar
     "<kapsam>:<userId>" — hesap silinince purge siliyor. */
  const rate = await consume(`guest_claim:${who.id}`, 10, 3600);
  if (!rate.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { ...NO_STORE, "retry-after": String(rate.retryAfterSec) } });
  }

  try {
    if (!(await verifyGuestToken(guestId, token))) {
      return NextResponse.json({ error: "guest_not_found" }, { status: 404, headers: NO_STORE });
    }
    const out = await mergeGuestInto(guestId, who.id);
    if (!out.merged) {
      return NextResponse.json({ error: out.reason }, { status: out.reason === "guest_not_found" ? 404 : 409, headers: NO_STORE });
    }
    return NextResponse.json({ merged: true, targetHadProgress: out.targetHadProgress }, { headers: NO_STORE });
  } catch (err) {
    console.error("[guest:claim]", err);
    return NextResponse.json({ error: "database" }, { status: 500, headers: NO_STORE });
  }
}
