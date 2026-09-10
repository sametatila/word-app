import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { candoSummary } from "@/lib/cando-progress";
import { nativeCandoText } from "@/lib/lessons/native-server";
import { isNativeLang } from "@/lib/i18n/dict";

export const dynamic = "force-dynamic";

/** Yapabildiklerim (WP-43): ifade listesi + kullanıcının kanıt durumu. */
export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  try {
    const profile = await ensureProfile(userId);
    const summary = await candoSummary(userId, profile.course);
    /* İFADE METNİ ANA DİLDE. `Cando` tipinde yalnız `tr` var ve mobil ekran
       onu doğrudan basıyor — yani anadili Türkçe olmayan kullanıcı bu
       ekranda Türkçe bir liste görüyordu, kursu hangi dilde olursa olsun.
       Çeviri BURADA, `candoSummary`de değil: özet sayaçları dilden bağımsız
       ve tek çağıran bu uç. Karşılığı olmayan ifade Türkçe kalıyor (bkz.
       `nativeCandoText`) — satırı düşürmek kanıt sayacını gizlerdi. */
    const t = await nativeCandoText(isNativeLang(profile.nativeLang) ? profile.nativeLang : null);
    const items = summary.items.map((it) => ({ ...it, cando: { ...it.cando, tr: t(it.cando.id, it.cando.tr) } }));
    return NextResponse.json(
      { level: profile.level, byLevel: summary.byLevel, items },
      { headers: { "cache-control": "no-store" } },
    );
  } catch (err) {
    console.error("[cando]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
