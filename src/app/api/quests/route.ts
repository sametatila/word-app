import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { awardActivity, clampDay } from "@/lib/award";
import { claimQuest, questBoard } from "@/lib/quests";
import { ensureProfile } from "@/lib/session";
import { isNativeLang, DEFAULT_NATIVE } from "@/lib/i18n/dict";

export const dynamic = "force-dynamic";

/** Günün görevleri ve ilerlemeleri. */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const day = normalizeDay(new URL(req.url).searchParams.get("day"));
  try {
    /*
      Etiketler SUNUCUDA çevriliyor ve dil PROFİLDEN okunuyor — çerezden değil.
      Sebep çağıran: bu ucu mobil uygulama da kullanıyor ve orada bizim dil
      çerezimiz yok. Profil iki istemcinin de paylaştığı tek kaynak, yani
      mobilin yayınlanmış sürümleri bile bu düzeltmeden yararlanıyor.
    */
    const profile = await ensureProfile(userId).catch(() => null);
    const lang = isNativeLang(profile?.nativeLang) ? profile.nativeLang : DEFAULT_NATIVE;
    return NextResponse.json(await questBoard(userId, day, lang));
  } catch (err) {
    console.error("[quests]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/**
 * Ödül talebi.
 *
 * Tamamlanma sunucuda yeniden doğrulanıyor (bkz. lib/quests.ts) — istemcinin
 * iddiası tek başına XP kazandırmıyor.
 */
export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }

  const questId = typeof body.questId === "string" ? body.questId : "";
  if (!questId || questId.length > 20) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const day = normalizeDay(body.day);

  try {
    const { xp } = await claimQuest(userId, day, questId);
    // Görev ödülü de ortak geçitten geçiyor: XP, günlük istatistik ve seri
    // tek yerden işleniyor (bkz. lib/award.ts). Süre eklenmiyor — görevin
    // kendisi zaten yapılan işin süresini saymıştı.
    const award = xp > 0 ? await awardActivity(userId, day, xp, 0) : null;
    // Ödül sonrası dönen tahtanın etiketleri de kullanıcının dilinde olmalı;
    // aksi hâlde bir görevi tamamlamak listeyi Türkçeye çeviriyordu.
    const profile = await ensureProfile(userId).catch(() => null);
    const lang = isNativeLang(profile?.nativeLang) ? profile.nativeLang : DEFAULT_NATIVE;
    const board = await questBoard(userId, day, lang);
    return NextResponse.json({
      xp,
      totalXp: award?.totalXp ?? null,
      currentStreak: award?.currentStreak ?? null,
      ...board,
    });
  } catch (err) {
    console.error("[quests:claim]", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}

/*
 * Gün istemciden geliyor ve `clampDay` ile SINIRLANIYOR - üç kardeş uç
 * (daily, session, weekly) baştan beri öyle yapıyor, burası yapmıyordu:
 * yalnız biçim denetleniyor, tarihin makul olup olmadığına bakılmıyordu.
 *
 * Fark önemli çünkü gün yalnız okuma anahtarı değil: görev ödülü
 * `awardActivity(userId, day, ...)` ile O GÜNE yazılıyor ve günlük istatistik
 * ile seri oradan hesaplanıyor. Biçimi doğru ama uzak bir tarih göndermek
 * (bozuk saatli cihaz ya da elle kurulmuş istek) etkinliği başka bir güne
 * yazdırabiliyordu. `clampDay` sunucunun gününe ±1 gün uzaklıktakini kabul
 * ediyor, ötesini bugüne çekiyor.
 */
function normalizeDay(value: unknown) {
  return clampDay(value);
}
