import { NextResponse } from "next/server";
import { sameOrigin } from "@/lib/auth/origin";
import { recordClientError } from "@/lib/client-errors";
import { CLIENT_HEADER, parseClientHeader } from "@/lib/app-control-shared";

export const dynamic = "force-dynamic";

/**
 * İstemci hata raporu — web ve mobil (bkz. `lib/client-errors`).
 *
 * OTURUM İSTEMİYOR, bilerek: hataların önemli kısmı giriş sayfasında ya da
 * oturum düşmüşken oluyor. Kişiye bağlanmıyor, yalnız gruplanıyor. Kapı:
 * web için aynı-köken, mobil için uygulamanın sürüm başlığı. Gövde 16 KB ile
 * sınırlı; cevap her zaman 204 (rapor istemcide hiçbir şeyi değiştirmemeli).
 */
export async function POST(req: Request) {
  const client = parseClientHeader(req.headers.get(CLIENT_HEADER));
  if (!client && !sameOrigin(req)) return new NextResponse(null, { status: 204 });
  try {
    const raw = await req.text();
    if (raw.length > 16_000) return new NextResponse(null, { status: 204 });
    const b = JSON.parse(raw) as Record<string, unknown>;
    const str = (v: unknown) => (typeof v === "string" ? v : undefined);
    const message = str(b.message);
    if (!message) return new NextResponse(null, { status: 204 });
    await recordClientError({
      platform: client ? client.platform : "web",
      name: str(b.name),
      message,
      stack: str(b.stack),
      screen: str(b.screen),
      appVersion: client ? `${client.version}/${client.build}` : undefined,
    });
  } catch {
    /* rapor sessizce düşer */
  }
  return new NextResponse(null, { status: 204 });
}
