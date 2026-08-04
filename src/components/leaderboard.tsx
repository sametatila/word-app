import { FlameIcon } from "@/components/icons";
import type { LeaderboardRow } from "@/lib/session";

/** İlk üç için madalya rengi; sonrası nötr kalır ki tablo yorucu olmasın. */
const MEDAL: Record<number, string> = {
  1: "var(--color-flame-500)",
  2: "var(--color-sky-400)",
  3: "var(--color-mint-500)",
};

function initials(name: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

/**
 * Öğren ekranındaki sıralama tablosu.
 *
 * Sıra XP'ye göredir (seri yalnızca eşitlik bozar), çünkü XP toplam emeği
 * gösterir; seri tek başına bir günü kaçırınca sıfırlanır ve haksız görünür.
 * Kullanıcının kendi satırı ilk 10'un dışındaysa altta ayrıca gösterilir.
 */
export function Leaderboard({ rows }: { rows: LeaderboardRow[] }) {
  if (rows.length < 2) return null; // tek kişilik sıralama sıralama değildir

  const top = rows.filter((r) => r.rank <= 10);
  const me = rows.find((r) => r.isMe && r.rank > 10);

  return (
    <section className="card mx-auto mt-4 w-full max-w-md overflow-hidden">
      <div
        className="flex items-baseline justify-between border-b px-5 py-3.5"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="font-bold">Sıralama</h2>
        <span className="muted text-xs">XP'ye göre · ilk 10</span>
      </div>

      <ol>
        {top.map((r) => (
          <Row key={`${r.rank}-${r.name ?? "x"}`} row={r} />
        ))}
      </ol>

      {me ? (
        <>
          <div className="muted px-5 py-1 text-center text-xs">···</div>
          <ol>
            <Row row={me} />
          </ol>
        </>
      ) : null}
    </section>
  );
}

function Row({ row }: { row: LeaderboardRow }) {
  const medal = MEDAL[row.rank];
  return (
    <li
      className="flex items-center gap-3 border-t px-5 py-2.5 first:border-t-0"
      style={{
        borderColor: "var(--border)",
        background: row.isMe
          ? "color-mix(in srgb, var(--color-brand-500) 8%, transparent)"
          : undefined,
      }}
    >
      <span
        className="w-6 shrink-0 text-center text-sm font-black tabular-nums"
        style={{ color: medal ?? "var(--text-muted)" }}
      >
        {row.rank}
      </span>

      <span
        className="surface-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
        style={medal ? { color: medal } : undefined}
      >
        {initials(row.name)}
      </span>

      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
        {row.name ?? "İsimsiz öğrenci"}
        {row.isMe ? (
          <span
            className="ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{
              background: "color-mix(in srgb, var(--color-brand-500) 16%, transparent)",
              color: "var(--color-brand-500)",
            }}
          >
            sen
          </span>
        ) : null}
      </span>

      {row.streak > 0 ? (
        <span
          className="flex shrink-0 items-center gap-1 text-xs font-semibold tabular-nums"
          style={{ color: "var(--color-flame-500)" }}
          title={`${row.streak} günlük seri`}
        >
          <FlameIcon size={13} />
          {row.streak}
        </span>
      ) : null}

      <span
        className="w-16 shrink-0 text-right text-sm font-bold tabular-nums"
        style={{ color: "var(--color-brand-500)" }}
      >
        {row.xp.toLocaleString("tr-TR")}
      </span>
    </li>
  );
}
