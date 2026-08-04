import { and, asc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { db } from "@/lib/db";
import { userWords, words } from "@/lib/db/schema";
import { getUserId } from "@/lib/auth/server";
import { ensureProfile } from "@/lib/session";
import { WordList, type WordRow } from "@/components/word-list";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 40;

type Search = { q?: string; level?: string; status?: string; page?: string };

export default async function WordsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const userId = await getUserId();
  if (!userId) return null;

  const q = (sp.q ?? "").trim().slice(0, 40);
  // B2 ve C1 listeye eklendiğinde bu beyaz liste güncellenmemişti: o iki çipe
  // basınca filtre sessizce yok sayılıyor, tüm kelimeler geliyordu.
  const level = ["A1", "A2", "B1", "B2", "C1"].includes(sp.level ?? "") ? sp.level! : "";
  const status = ["new", "learning", "mastered"].includes(sp.status ?? "") ? sp.status! : "";
  const page = Math.max(0, Number(sp.page ?? 0) || 0);

  const filters: SQL[] = [];
  // Liste yalnızca aktif kursun kelimelerini gösterir (de ↔ gsw-zh).
  try {
    const profile = await ensureProfile(userId);
    filters.push(eq(words.course, profile.course));
  } catch {
    filters.push(eq(words.course, "de"));
  }
  if (q) {
    const like = `%${q}%`;
    const cond = or(ilike(words.de, like), ilike(words.tr, like));
    if (cond) filters.push(cond);
  }
  if (level) filters.push(eq(words.niveau, level));
  if (status === "new") filters.push(sql`${userWords.wordId} is null`);
  if (status === "learning")
    filters.push(sql`${userWords.wordId} is not null and ${userWords.intervalDays} < 21`);
  if (status === "mastered") filters.push(sql`${userWords.intervalDays} >= 21`);

  try {
    const rows = await db
      .select({
        id: words.id,
        de: words.de,
        artikel: words.artikel,
        tr: words.tr,
        typ: words.typ,
        niveau: words.niveau,
        beispiel: words.beispiel,
        formen: words.formen,
        intervalDays: userWords.intervalDays,
        dueAt: userWords.dueAt,
        lapses: userWords.lapses,
        leech: userWords.leech,
      })
      .from(words)
      .leftJoin(userWords, and(eq(userWords.wordId, words.id), eq(userWords.userId, userId)))
      .where(filters.length ? and(...filters) : undefined)
      .orderBy(sql`${words.rank} asc nulls last`, asc(words.id))
      .limit(PAGE_SIZE + 1)
      .offset(page * PAGE_SIZE);

    const [{ total }] = await db
      .select({ total: sql<number>`count(*)::int` })
      .from(words)
      .leftJoin(userWords, and(eq(userWords.wordId, words.id), eq(userWords.userId, userId)))
      .where(filters.length ? and(...filters) : undefined);

    const hasMore = rows.length > PAGE_SIZE;
    const list: WordRow[] = rows.slice(0, PAGE_SIZE).map((r) => ({
      id: r.id,
      de: r.de,
      artikel: r.artikel,
      tr: r.tr,
      typ: r.typ,
      niveau: r.niveau,
      beispiel: r.beispiel,
      formen: r.formen,
      intervalDays: r.intervalDays,
      dueAt: r.dueAt ? r.dueAt.toISOString() : null,
      lapses: r.lapses,
      leech: r.leech ?? false,
    }));

    return (
      <WordList
        rows={list}
        total={total}
        page={page}
        hasMore={hasMore}
        query={{ q, level, status }}
      />
    );
  } catch (err) {
    console.error("[words]", err);
    return (
      <div className="card mx-auto w-full max-w-md p-6 text-center">
        <h2 className="text-lg font-bold">Kelimeler yüklenemedi</h2>
        <p className="muted mt-2 text-sm">
          Veritabanı bağlantısını kontrol et: <code>npm run db:push</code>.
        </p>
      </div>
    );
  }
}
