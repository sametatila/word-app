import { NextResponse } from "next/server";
import { authEnabled, googleConfigured } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

/**
 * Herkese açık istemci yapılandırması — oturum gerektirmez.
 *
 * Mobil giriş ekranı, sunucuda kapalı bir sağlayıcının düğmesini göstermesin diye
 * açılışta buraya bakar: Google OAuth ortam değişkenleri yoksa "Google ile devam et"
 * hiç çizilmez (çalışmayan düğme Play "bozuk işlevsellik" sayılır). Sır içermez.
 */
export async function GET() {
  return NextResponse.json(
    { auth: authEnabled, providers: { google: authEnabled && googleConfigured } },
    { headers: { "cache-control": "public, max-age=300" } },
  );
}
