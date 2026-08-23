import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { isEventName, track } from "@/lib/events";

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
 */
export async function POST(req: Request) {
  try {
    const userId = await getUserId();
    if (!userId) return new NextResponse(null, { status: 204 });
    const body = (await req.json()) as { name?: string; day?: string; value?: number };
    const day = typeof body.day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(body.day)
      ? body.day
      : new Date().toISOString().slice(0, 10);
    if (!body.name || !isEventName(body.name)) return new NextResponse(null, { status: 204 });
    await track(userId, body.name, day, Number(body.value) || 0);
  } catch {
    /* ölçüm sessizce düşer */
  }
  return new NextResponse(null, { status: 204 });
}
