import { NextResponse } from "next/server";

/**
 * Apple ile Giriş — alan adı doğrulaması.
 *
 * Services ID'ye bir alan adı eklenirken Apple bu dosyayı
 * `https://<alan>/.well-known/apple-developer-domain-association.txt`
 * adresinden okuyor ve içeriği kendi verdiği belirteçle eşleşmezse alan adı
 * "unverified" kalıyor. Doğrulanmamış alan adında tarayıcı akışı hiç
 * başlamıyor: Apple `invalid_client` diyor.
 *
 * İÇERİK APPLE'DAN GELİYOR. Portalda "Download" düğmesiyle inen dosyanın
 * gövdesi env'e (`APPLE_DOMAIN_ASSOCIATION`) yazılıyor. Depoya konmamasının
 * sebebi: alan adına özel bir belirteç ve depo public.
 *
 * Boşken 404 — `assetlinks.json` ile aynı duruş: eksik beyan sessizce
 * "doğrulanmamış"a düşer, bir şeyi bozmaz.
 *
 * Dosya adı bir DİZİN adı (route.ts içinde): Next'te uzantılı bir yol ancak
 * böyle karşılanıyor. `content-type` düz metin olmalı; Apple JSON beklemiyor.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const body = (process.env.APPLE_DOMAIN_ASSOCIATION ?? "").trim();
  if (!body) return new NextResponse("not configured", { status: 404 });
  return new NextResponse(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
