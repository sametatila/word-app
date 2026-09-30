import { NextResponse, type NextRequest } from "next/server";

/**
 * BAĞLANTI ÖNİZLEMESİ İÇİN AÇIK PROFİL.
 *
 * `/u/<ad>` oturum istiyor ((app) düzeni girişsizi `/login`e yolluyor) ve
 * önizleme servisleri girişsiz geliyor: paylaşılan profil bağlantısı
 * WhatsApp'ta giriş sayfası olarak görünüyordu. Yalnız bilinen önizleme
 * botları `/preview/u/<ad>`e YÖNLENDİRİLİYOR (307, göreli adres);
 * tarayıcıdan gelen herkes için hiçbir şey değişmiyor.
 *
 * YENİDEN YAZMA (rewrite) DEĞİL: sunucu nginx arkasında düz HTTP'de,
 * Next ise isteğin kökenini `https://localhost:<port>` görüyor ve aynı
 * uygulamaya yeniden yazmayı dış bir HTTPS isteği sanıyordu — canlıda TLS
 * hatasıyla 500 (2026-09-30). Göreli `Location` kökene hiç dokunmuyor;
 * robotlar yönlendirmeyi izliyor, kartın `og:url`i yine `/u/<ad>`.
 *
 * Liste bilerek dar: arama motoru botları yok (profil dizine girmemeli),
 * yalnız bağlantıya kart çizenler. iMessage `facebookexternalhit`, Signal
 * `WhatsApp` kimliğiyle geliyor.
 */
const PREVIEW_BOTS =
  /facebookexternalhit|facebot|whatsapp|twitterbot|telegrambot|slackbot|slack-imgproxy|discordbot|linkedinbot|skypeuripreview|vkshare|viber|pinterest|redditbot|embedly|mastodon|bluesky|iframely|snapchat|microsoftpreview|teams/i;

export function proxy(request: NextRequest) {
  if (!PREVIEW_BOTS.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();
  return new NextResponse(null, {
    status: 307,
    headers: { Location: `/preview${request.nextUrl.pathname}`, "Cache-Control": "no-store" },
  });
}

export const config = { matcher: "/u/:username" };
