import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
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

/**
 * GERÇEK DURUM KODU (Search Console, 2026-10-07). Sayfalar akışla gidiyor; `redirect()` ve
 * `notFound()` akış başladıktan sonra çağrılınca durum 200 kalıyor ve yönlendirme sayfanın
 * İÇİNDE (meta refresh) yapılıyordu. Google bunları içeriksiz 200 sayfa olarak tarıyordu:
 * "Tarandı, dizine eklenmedi" 44, yumuşak 404'ler. Next'in önerisi (docs `not-found`
 * "Status codes"): kontrol akıştan önce, burada.
 *
 * 1. Uygulama (`(app)` grubu) oturum ister: oturum çerezi YOKSA gerçek 307 → /login.
 *    Yalnız çerezin varlığına bakılıyor (better-auth'un önerdiği iyimser yol); geçerliliği,
 *    misafir ve bakım kararı düzende (`(app)/layout`) kalıyor. Bölüm listesi `(app)`
 *    klasörleriyle aynı, kapı `npm run check:seo`.
 * 2. Hukuki belgelerin dil alt yolu: varsayılan dil ve bilinmeyen dil 308 → belgenin kökü
 *    (`/terms/tr`, `/privacy/xx` → kök; künyede varsayılan `de`). 404 için `rewrite` YOK:
 *    nginx arkasında canlıda 500 veriyor (aşağıdaki önizleme notu).
 */
export const APP_SECTIONS = [
  "analytics", "boss", "conversations", "exam", "friends", "immersion", "inbox", "leaderboard",
  "learn", "mock-exams", "notifications", "placement", "premium", "profile", "skills", "u", "words",
] as const;
const LEGAL_DOCS: Record<string, { locales: string[]; base: string }> = {
  privacy: { locales: ["en", "de"], base: "tr" },
  terms: { locales: ["en", "de"], base: "tr" },
  support: { locales: ["en", "de"], base: "tr" },
  impressum: { locales: ["tr", "en"], base: "de" },
};

/* Geliştirmede isteğin kendi kökeni: yerelde /learn canlı siteye yönlenmesin. */
const originOf = (request: NextRequest) =>
  process.env.NODE_ENV !== "production" ? request.nextUrl.origin : request.headers.get("host") === FALLBACK_HOST ? FALLBACK_ORIGIN : PRIMARY_ORIGIN;
/* Location MUTLAK ve sitenin kendi kökeniyle: `NextResponse.redirect(request.url)` nginx
   arkasında `https://localhost:<port>` görüyor (aşağıdaki önizleme notu). */
const go = (request: NextRequest, path: string, status: 307 | 308) =>
  new NextResponse(null, { status, headers: { Location: `${originOf(request)}${path}`, "Cache-Control": "no-store" } });

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const fixed = FIXED_LANG[path];
  if (fixed) {
    const headers = new Headers(request.headers);
    headers.set(LANG_HEADER, fixed);
    return NextResponse.next({ request: { headers } });
  }
  const [, first = "", second, ...rest] = path.split("/");
  const legal = LEGAL_DOCS[first];
  if (legal) {
    if (second && (second === legal.base || !legal.locales.includes(second) || rest.length)) return go(request, `/${first}`, 308);
    return NextResponse.next();
  }
  if (first === "u" && PREVIEW_BOTS.test(request.headers.get("user-agent") ?? "")) {
    return go(request, `/preview${path}`, 307);
  }
  if ((APP_SECTIONS as readonly string[]).includes(first) && !getSessionCookie(request)) {
    return go(request, "/login", 307);
  }
  return NextResponse.next();
}

/* Eşleştirici durağan olmalı (Next derlemede okuyor): `APP_SECTIONS` ve `LEGAL_DOCS` ile
   aynı liste, kapı `npm run check:seo`. `/en` ve `/de` `lib/landing-path` `LANDING_FIXED`. */
export const config = {
  matcher: [
    "/en", "/de",
    "/privacy/:locale", "/terms/:locale", "/support/:locale", "/impressum/:locale",
    "/analytics/:path*", "/boss/:path*", "/conversations/:path*", "/exam/:path*", "/friends/:path*",
    "/immersion/:path*", "/inbox/:path*", "/leaderboard/:path*", "/learn/:path*", "/mock-exams/:path*",
    "/notifications/:path*", "/placement/:path*", "/premium/:path*", "/profile/:path*", "/skills/:path*",
    "/u/:path*", "/words/:path*",
  ],
};
