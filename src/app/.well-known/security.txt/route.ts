import { NextResponse } from "next/server";

/**
 * Güvenlik açığı bildirim kanalı — RFC 9116 (`/.well-known/security.txt`).
 *
 * İyi niyetli bir araştırmacı bir açık bulduğunda "kime söyleyeceğim" sorusuna
 * makinece okunabilir bir cevap. Yoksa bildirim ya hiç gelmiyor ya da destek
 * kuyruğunda kayboluyor. Güvenlik denetimi 2026-09-15, bulgu N8.
 *
 * `Expires` RFC'de ZORUNLU ve geçmişte olmamalı. Sabit bir tarih veriyoruz;
 * yaklaştığında elle yenilenmeli (yılda bir). Rolling/dinamik Expires bazı
 * katı doğrulayıcıları rahatsız ettiği için sabit tutuldu.
 *
 * Contact: `support@lernomi.app` — kesinlikle izlenen adres. İstenirse
 * Cloudflare Email Routing ile ayrı bir `security@lernomi.app` alias'ı açılıp
 * buradaki satır güncellenebilir.
 */
export const dynamic = "force-static";

const SECURITY_TXT = [
  "# Lernomi guvenlik iletisim kanali (RFC 9116)",
  "Contact: mailto:support@lernomi.app",
  "Expires: 2027-09-16T00:00:00.000Z",
  "Preferred-Languages: tr, en",
  "Canonical: https://www.lernomi.app/.well-known/security.txt",
  "",
].join("\n");

export async function GET() {
  return new NextResponse(SECURITY_TXT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
