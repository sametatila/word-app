import { NextResponse, type NextRequest } from "next/server";

/**
 * BAĞLANTI ÖNİZLEMESİ İÇİN AÇIK PROFİL.
 *
 * `/u/<ad>` oturum istiyor ((app) düzeni girişsizi `/login`e yolluyor) ve
 * önizleme servisleri girişsiz geliyor: paylaşılan profil bağlantısı
 * WhatsApp'ta giriş sayfası olarak görünüyordu. Yalnız bilinen önizleme
 * botları `/preview/u/<ad>`e YENİDEN YAZILIYOR (adres aynı kalıyor);
 * tarayıcıdan gelen herkes için hiçbir şey değişmiyor.
 *
 * Liste bilerek dar: arama motoru botları yok (profil dizine girmemeli),
 * yalnız bağlantıya kart çizenler. iMessage `facebookexternalhit`, Signal
 * `WhatsApp` kimliğiyle geliyor.
 */
const PREVIEW_BOTS =
  /facebookexternalhit|facebot|whatsapp|twitterbot|telegrambot|slackbot|slack-imgproxy|discordbot|linkedinbot|skypeuripreview|vkshare|viber|pinterest|redditbot|embedly|mastodon|bluesky|iframely|snapchat|microsoftpreview|teams/i;

export function proxy(request: NextRequest) {
  if (!PREVIEW_BOTS.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = `/preview${url.pathname}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: "/u/:username" };
