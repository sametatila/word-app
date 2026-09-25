import { NextResponse } from "next/server";
import { clampDay } from "@/lib/award";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { isEventName, track } from "@/lib/events";
import { legacyEventKind, legacyEventName } from "@/lib/legacy-names";

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
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  try {
    const userId = await getUserId();
    if (!userId) return new NextResponse(null, { status: 204 });
    const body = (await req.json()) as { name?: string; day?: string; value?: number; kind?: string };
    const day = clampDay(body.day);
    /* Eski build'in adları yeni adla yazılıyor (geçici, bkz. lib/legacy-names). */
    const name = body.name ? legacyEventName(body.name) : body.name;
    if (!name || !isEventName(name)) return new NextResponse(null, { status: 204 });
    await track(userId, name, day, Number(body.value) || 0, legacyEventKind(body.kind));
  } catch {
    /* ölçüm sessizce düşer */
  }
  return new NextResponse(null, { status: 204 });
}
