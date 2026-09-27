import { NextResponse } from "next/server";
import { adminGate } from "@/lib/admin";
import { contentFeedbackCsv, parseContentQuery } from "@/lib/moderation-admin";

export const dynamic = "force-dynamic";

/**
 * İçerik geri bildirimi CSV'si — /admin/moderation/content'in "CSV" bağlantısı.
 *
 * Süzgeç sayfanınkiyle AYNI adres parametreleri (`parseContentQuery`), sayfalama
 * yok: süzgecin tamamı iner. Yalnız okuma: admin olmak yeter (2FA yazma kapısı
 * değil), ama sayfa gibi yetkisiz açılışta 403.
 */
export async function GET(req: Request) {
  const g = await adminGate();
  if (!g.ok) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const sp = Object.fromEntries(new URL(req.url).searchParams.entries());
  try {
    const csv = await contentFeedbackCsv(parseContentQuery(sp));
    const day = new Date().toISOString().slice(0, 10);
    return new NextResponse(csv, {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="icerik-bildirimleri-${day}.csv"`,
        "cache-control": "no-store",
      },
    });
  } catch (err) {
    console.error("[admin/moderation/export]", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
