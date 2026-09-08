import { NextResponse } from "next/server";
import { getUserId } from "@/lib/auth/server";
import { sameOrigin } from "@/lib/auth/origin";
import { bumpUsage } from "@/lib/premium";
import { canAiPractice, canPocketWalk, canWeeklyExam } from "@/lib/premium/access";

export const dynamic = "force-dynamic";

/**
 * Kotalı bir eylemin BAŞLANGICI — kontrol eder ve sayar.
 *
 * Neden ayrı uç: kotanın birimi kullanıcıya söylenen şey olmalı. Cepte yürüyüş
 * "günde N TUR" diye duyuruluyor, "günde N kelime" diye değil; tur bir kez
 * burada sayılıyor, tur boyunca yapılan onlarca tanıma isteği sayılmıyor.
 * Aynı şey AI değerlendirmesi için de geçerli: bir yazma alıştırması tek hak,
 * içindeki her kaydetme değil.
 *
 * SAYMA KONTROLDEN SONRA. Hak yoksa sayaç artmıyor — yoksa kilide çarpan
 * kullanıcı kendi hakkını yakardı.
 */
const GATES = ["pocket_walk", "weekly_exam", "speaking", "writing"] as const;
type Gate = (typeof GATES)[number];

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  let gate: Gate | null = null;
  let scope: "lesson" | "skill" = "lesson";
  let level = "A1";
  try {
    const body = (await req.json()) as { gate?: string; scope?: string; level?: string };
    if (GATES.includes(body.gate as Gate)) gate = body.gate as Gate;
    if (body.scope === "skill") scope = "skill";
    if (typeof body.level === "string" && /^[A-C][12]$/.test(body.level)) level = body.level;
  } catch {
    return NextResponse.json({ error: "bad_json" }, { status: 400 });
  }
  if (!gate) return NextResponse.json({ error: "unknown_gate" }, { status: 400 });

  try {
    const access =
      gate === "pocket_walk"
        ? await canPocketWalk(userId)
        : gate === "weekly_exam"
          ? await canWeeklyExam(userId)
          : await canAiPractice(userId, gate, scope, level);

    if (!access.allowed) return NextResponse.json({ ok: false, ...access }, { status: 403 });

    // Hangi sayaç artacağını KARAR söylüyor (`access.counter`). Çağıran tarafta
    // yeniden türetmek, aynı kuralı iki yerde yazmak olurdu: ücretsiz kullanıcı
    // ömürlük hakkını mı yoksa haftalık yenilenen hakkını mı kullandı sorusu
    // yalnız kararın verildiği yerde biliniyor.
    if (access.counter) await bumpUsage(userId, access.counter.key, access.counter.period);
    return NextResponse.json({ ok: true, ...access });
  } catch (err) {
    console.error("[premium/consume]", err);
    // Sayaç yazılamadı: eylemi ENGELLEME. Kullanıcıyı altyapı hatası yüzünden
    // kendi hakkından etmek, birkaç fazladan çağrıdan daha pahalı.
    return NextResponse.json({ ok: true, reason: "counter_failed" });
  }
}
