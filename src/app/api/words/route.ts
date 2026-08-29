import { NextResponse } from "next/server";
import { and, asc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { userWords, words } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";

export const dynamic = "force-dynamic";
const PAGE_SIZE = 30;

/**
 * Kelime listesi (mobil "Kelimelerim"). Web'in words sayfasındaki satır-içi
 * sorgunun REST karşılığı: aktif kursun kelimeleri, arama (de/tr/en), seviye ve
 * durum süzgeci, sayfalama. Durum SRS aralığından türer: kayıt yok → new,
 * <21 gün → learning, ≥21 → mastered. Yalnız okur, oturumsuz 401.
 */
export async function GET(req: Request) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const sp = new URL(req.url).searchParams;
  const q = (sp.get("q") ?? "").trim().slice(0, 40);
  const level = ["A1", "A2", "B1", "B2", "C1"].includes(sp.get("level") ?? "") ? sp.get("level")! : "";
  const status = ["new", "learning", "mastered"].includes(sp.get("status") ?? "") ? sp.get("status")! : "";
  const page = Math.max(0, Number(sp.get("page") ?? 0) || 0);

  const filters: SQL[] = [];
  try {
    const profile = await ensureProfile(userId);
    filters.push(eq(words.course, profile.course));
  } catch {
    filters.push(eq(words.course, "de"));
  }
  if (q) {
    const like = `%${q}%`;
    const cond = or(ilike(words.de, like), ilike(words.tr, like), ilike(words.en, like));
    if (cond) filters.push(cond);
  }
  if (level) filters.push(eq(words.niveau, level));
  if (status === "new") filters.push(sql`${userWords.wordId} is null`);
  if (status === "learning") filters.push(sql`${userWords.wordId} is not null and ${userWords.intervalDays} < 21`);
  if (status === "mastered") filters.push(sql`${userWords.intervalDays} >= 21`);

  try {
    const rows = await db
      .select({
        id: words.id,
        de: words.de,
        artikel: words.artikel,
        tr: words.tr,
        niveau: words.niveau,
        intervalDays: userWords.intervalDays,
      })
      .from(words)
      .leftJoin(userWords, and(eq(userWords.wordId, words.id), eq(userWords.userId, userId)))
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(sql`${words.rank} asc nulls last`, asc(words.id))
      .limit(PAGE_SIZE + 1)
      .offset(page * PAGE_SIZE);

    const hasMore = rows.length > PAGE_SIZE;
    const list = rows.slice(0, PAGE_SIZE).map((r) => ({
      id: r.id,
      de: r.de,
      artikel: r.artikel,
      tr: r.tr,
      niveau: r.niveau,
      status: r.intervalDays == null ? "new" : r.intervalDays >= 21 ? "mastered" : "learning",
    }));

    return NextResponse.json({ words: list, page, hasMore }, { headers: { "cache-control": "no-store" } });
  } catch (err) {
    console.error("[words] liste okunamadı", err);
    return NextResponse.json({ error: "database" }, { status: 500 });
  }
}
