import { NextResponse, type NextRequest } from "next/server";
import { FALLBACK_HOST, FALLBACK_ORIGIN, PRIMARY_ORIGIN } from "@/lib/site";
import { LANG_HEADER } from "@/lib/i18n/cookie";

/**
 * BAĞLANTI ÖNİZLEMESİ İÇİN AÇIK PROFİL.
 *
 * `/u/<ad>` oturum istiyor ((app) düzeni girişsizi `/login`e yolluyor) ve
 * önizleme servisleri girişsiz geliyor: paylaşılan profil bağlantısı
 * WhatsApp'ta giriş sayfası olarak görünüyordu. Yalnız bilinen önizleme
 * botları `/preview/u/<ad>`e YÖNLENDİRİLİYOR (307, sitenin kendi kökeniyle);
 * tarayıcıdan gelen herkes için hiçbir şey değişmiyor.
 *
 * YENİDEN YAZMA (rewrite) DEĞİL: sunucu nginx arkasında düz HTTP'de,
 * Next ise isteğin kökenini `https://localhost:<port>` görüyor ve aynı
 * uygulamaya yeniden yazmayı dış bir HTTPS isteği sanıyordu — canlıda TLS
 * hatasıyla 500 (2026-09-30). Göreli `Location` da olmuyor (ara katman onu
 * URL olarak ayrıştırıyor, "Invalid URL"). Köken `lib/site`tan: yedek
 * adresten gelen yedekte kalıyor. Robotlar yönlendirmeyi izliyor, kartın
 * `og:url`i yine `/u/<ad>`.
 *
 * Liste bilerek dar: arama motoru botları yok (profil dizine girmemeli),
 * yalnız bağlantıya kart çizenler. iMessage `facebookexternalhit`, Signal
 * `WhatsApp` kimliğiyle geliyor.
 */
const PREVIEW_BOTS =
  /facebookexternalhit|facebot|whatsapp|twitterbot|telegrambot|slackbot|slack-imgproxy|discordbot|linkedinbot|skypeuripreview|vkshare|viber|pinterest|redditbot|embedly|mastodon|bluesky|iframely|snapchat|microsoftpreview|teams/i;

/**
 * DİLE SABİT TANITIM ADRESLERİ (`/en`, `/de`; bkz. `lib/landing-path`).
 *
 * Sayfa kökteki tanıtım sayfasının aynısı; dili adresten geliyor. Dil, isteğe
 * başlık olarak yazılıyor ki kök düzen (`<html lang>`, sözlük sağlayıcısı) ve
 * künye de aynı dili görsün: yalnız sayfaya parametre geçmek düzeni çerezin
 * dilinde bırakırdı.
 */
const FIXED_LANG: Record<string, string> = { "/en": "en", "/de": "de" };

export function proxy(request: NextRequest) {
  const fixed = FIXED_LANG[request.nextUrl.pathname];
  if (fixed) {
    const headers = new Headers(request.headers);
    headers.set(LANG_HEADER, fixed);
    return NextResponse.next({ request: { headers } });
  }
  if (!PREVIEW_BOTS.test(request.headers.get("user-agent") ?? "")) return NextResponse.next();
  return new NextResponse(null, {
    status: 307,
    headers: {
      Location: `${request.headers.get("host") === FALLBACK_HOST ? FALLBACK_ORIGIN : PRIMARY_ORIGIN}/preview${request.nextUrl.pathname}`,
      "Cache-Control": "no-store",
    },
  });
}

// `/en` ve `/de` `lib/landing-path` `LANDING_FIXED` ile aynı (eşleştirici durağan olmalı).
export const config = { matcher: ["/u/:username", "/en", "/de"] };
