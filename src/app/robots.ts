import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * Arama motorlarına ne açık, ne kapalı.
 *
 * Uygulamanın kendisi (`(app)` grubu: /learn, /profile, /skills…) oturum
 * istiyor; tarayıcı botu oraya girse giriş ekranını indeksler, yani hiçbir
 * kullanıcıya yaramayan bir sonuç üretir. Kapalı tutulanlar bu yüzden
 * "gizli" değil, ARAMADA ANLAMSIZ olanlar:
 *
 *   /api        makine ucu
 *   /admin      yönetim panosu
 *   /account    hesap silme — oturum gerektiriyor, herkese açık bir sayfa değil
 *   giriş akışı  parola sıfırlama ve doğrulama bağlantıları tek kullanımlık
 *
 * Geriye kalan (vitrin ve hukuki metinler) açık ve sitemap'te sayılı.
 * `Disallow` bir güvenlik önlemi DEĞİL: erişim denetimi sunucuda, burada
 * yalnız indeksleme tercihi var.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin",
        "/account/",
        "/login",
        "/setup",
        "/forgot-password",
        "/reset-password",
        "/verify-email",
        "/tts-bridge",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
