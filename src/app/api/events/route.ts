import { NextResponse } from "next/server";
import { clampDay } from "@/lib/award";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { clampClientValue, isClientEventName, track } from "@/lib/events";
import { consume } from "@/lib/social/ratelimit";

export const dynamic = "force-dynamic";

/**
 * Olay yazma ucu.
 *
 * Ad kapalı listeden doğrulanıyor: istemciden gelen serbest metin tabloya
 * girseydi ölçüm tablosu er geç bir çöplük olurdu. Gün de istemciden geliyor
 * çünkü "bugün" kullanıcının yerel günü — sunucunun UTC günü gece yarısı
 * çalışan birini yanlış güne yazar.
 *
 * Cevap her zaman 204: ölçümün başarısız olması istemcide hiçbir şeyi
 * değiştirmemeli, hata gösterilecek bir şey de yok.
 *
 * Yalnız İSTEMCİ olayları (`isClientEventName`): sunucunun yazdığı işletim
 * olayları (`mail_sent`, `push_deliver` …) buradan yazılamıyor, `value`
 * sıkıştırılıyor ve hesap başına saatte 600 olay (gözlenen en yoğun kullanım
 * bunun çok altında). Bkz. `lib/events` `CLIENT`.
 */
const HOURLY = 600;
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    const userId = await getUserId();
    if (!userId) return new NextResponse(null, { status: 204 });
    const body = (await req.json()) as { name?: string; day?: string; value?: number; kind?: string };
    const day = clampDay(body.day);
    if (!body.name || !isClientEventName(body.name)) return new NextResponse(null, { status: 204 });
    if (!(await consume(`events:${userId}`, HOURLY, 3600)).ok) return new NextResponse(null, { status: 204 });
    await track(userId, body.name, day, clampClientValue(body.value), body.kind);
  } catch {
    /* ölçüm sessizce düşer */
  }
  return new NextResponse(null, { status: 204 });
}
