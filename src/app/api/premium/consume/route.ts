import { NextResponse } from "next/server";
import { requireAccount } from "@/lib/auth/guest";
import { sameOrigin } from "@/lib/auth/origin";
import { canPocketWalk, tieredState } from "@/lib/premium/access";

export const dynamic = "force-dynamic";

/*
  ÇAĞIRANI OLMAYAN UÇ — bilerek duruyor, kaydı burada.

  Tasarım: gated bir etkinliğin BAŞINDA istemci bu ucu çağırıp bir hak
  harcıyordu; özellik uçları yalnız "hakkı var mı" diye bakıyordu.

  ÖLÇÜM (2026-09-12): ne web ne mobil bu ucu çağırıyor.

  ARADAN GEÇEN KARARLAR: konuşma/yazma hakkı 2026-09-17'den, yürüyüş turu
  2026-09-25'ten beri SUNUCUDA, özellik ucunun kendi içinde harcanıyor
  (`claimTiered` — `/api/assess`, `/api/chat`; `openWalkRound` —
  `/api/session?walk=1`). İstemcinin "başlıyorum" demesine gerek kalmadı ve
  istemcinin söylediği bir başlangıca dayanan sayaç sayaç değil.

  Uç artık SAYMIYOR, yalnız kararı söylüyor (eski bir istemci çağırırsa hak
  yakmasın, çift saymasın). Silinmedi: kaldırmak ayrı bir karar ve kapı bu
  durumu ölçüyor (`check:parity` §346) ki kayıt sessizce bayatlamasın.
*/
/**
 * Kotalı bir eylemin kararı — SAYMAZ.
 */
const GATES = ["pocket_walk", "speaking", "writing"] as const;
type Gate = (typeof GATES)[number];

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "forbidden" }, { status: 403 });
  /* HESAP İSTER: kota kararı yapay zekâ ve Premium özellikleri için; misafire kapalı (bkz. lib/auth/guest). */
  const who = await requireAccount();
  if (who instanceof NextResponse) return who;
  const userId = who;

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
    if (gate === "pocket_walk") {
      const access = await canPocketWalk(userId);
      return NextResponse.json({ ok: access.allowed, ...access }, { status: access.allowed ? 200 : 403 });
    }
    const surface = scope === "skill" ? (gate === "writing" ? "skill_writing" : "skill_speaking") : "path_writing";
    const state = await tieredState(userId, surface, level);
    const allowed = state.premium || state.remaining > 0;
    return NextResponse.json({ ok: allowed, allowed, reason: state.premium ? "premium" : allowed ? "free_quota" : "quota_spent", gate }, { status: allowed ? 200 : 403 });
  } catch (err) {
    console.error("[premium/consume]", err);
    // Karar okunamadı: eylemi ENGELLEME (kapıyı özellik ucu tutuyor).
    return NextResponse.json({ ok: true, reason: "counter_failed" });
  }
}
