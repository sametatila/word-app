import { NextResponse } from "next/server";
import { sameOrigin } from "@/lib/auth/origin";
import { recordClientError } from "@/lib/client-errors";
import { CLIENT_HEADER, parseClientHeader } from "@/lib/app-control-shared";
import { consume } from "@/lib/social/ratelimit";

export const dynamic = "force-dynamic";

/**
 * İstemci hata raporu — web ve mobil (bkz. `lib/client-errors`).
 *
 * OTURUM İSTEMİYOR, bilerek: hataların önemli kısmı giriş sayfasında ya da
 * oturum düşmüşken oluyor. Kişiye bağlanmıyor, yalnız gruplanıyor. Kapı:
 * web için aynı-köken, mobil için uygulamanın sürüm başlığı. Gövde 16 KB ile
 * sınırlı; cevap her zaman 204 (rapor istemcide hiçbir şeyi değiştirmemeli).
 *
 * IP BAŞINA SINIR (güvenlik denetimi 2026-10-03, O3). Kapı bir kimlik değil:
 * `Origin`siz istek (curl) aynı-köken sayılıyor, mobil başlığı da taklit
 * edilebiliyor. Sınır yokken tek IP mesajı her istekte değiştirerek saniyede
 * onlarca yeni grup açabiliyordu. İstemci zaten dakikada en çok bir rapor
 * gönderiyor; 10 dakikada 60, bir okul ya da kampüs NAT'ının arkasındaki
 * gerçek kullanıcılara yetiyor. Anahtar nginx'in yazdığı `x-real-ip`
 * (istemci yazamıyor, bkz. lib/auth/server). Yeni GRUP tavanı ayrıca
 * `recordClientError`ta.
 */
export async function POST(req: Request) {
  const client = parseClientHeader(req.headers.get(CLIENT_HEADER));
  if (!client && !sameOrigin(req)) return new NextResponse(null, { status: 204 });
  try {
    const ip = req.headers.get("x-real-ip") ?? "?";
    if (!(await consume(`cerr:${ip}`, 60, 600)).ok) return new NextResponse(null, { status: 204 });
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
    }, ip);
  } catch {
    /* rapor sessizce düşer */
  }
  return new NextResponse(null, { status: 204 });
}
