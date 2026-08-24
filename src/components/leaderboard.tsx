import { FlameIcon } from "@/components/icons";
import { Avatar } from "@/components/avatar";
import type { LeaderboardWeek } from "@/lib/session";

/** İlk üç için madalya rengi; sonrası nötr kalır ki tablo yorucu olmasın. */
const MEDAL: Record<number, string> = {
  1: "var(--color-flame)",
  2: "var(--color-sky)",
  3: "var(--color-mint)",
};

/**
 * Öğren ekranındaki haftalık sıralama.
 *
 * Tablo bu haftanın XP'sini gösteriyor ve pazartesi sıfırlanıyor. Tüm
 * zamanların toplamı burada değil profilde: orası "ne kadar yol geldim",
 * burası "bu hafta kim çalışıyor".
 *
 * İki ayrıntı tabloyu bir tablodan öteye taşıyor:
 *
 *   - **Geri sayım.** Sıralamanın kaç gün sonra sıfırlanacağı yazıyor.
 *     Sıfırlanacağını bilmeyen kullanıcı için tablo bir durum; bilen için
 *     bir süre. Aciliyet buradan geliyor, bildirimden değil.
 *   - **Bir üsttekine mesafe.** Sırf sıra numarası "6. sıradasın" der ve
 *     biter. "Bir üsttekine 140 XP" ise ulaşılabilir, bugün kapatılabilir
 *     bir hedeftir — üstelik kullanıcının kendi elindeki ölçüyle.
 */
export function Leaderboard({ week }: { week: LeaderboardWeek }) {
  const { rows, daysLeft } = week;
  if (rows.length < 2) return null; // tek kişilik sıralama sıralama değildir

  const top = rows.filter((r) => r.rank <= 10);
  const me = rows.find((r) => r.isMe);
  const outside = me && me.rank > 10 ? me : null;

  // Bir üstteki satır: kullanıcı listedeyse doğrudan, dışarıdaysa sonuncu.
  const above = me && me.rank > 1 ? rows.find((r) => r.rank === me.rank - 1) ?? top.at(-1) : null;
  const gap = me && above ? Math.max(0, above.xp - me.xp) : 0;

  return (
    <section className="card mx-auto mt-4 w-full max-w-md overflow-hidden">
      <div
        className="flex items-baseline justify-between border-b px-5 py-3.5"
        style={{ borderColor: "var(--border)" }}
      >
        <h2 className="font-bold">Bu haftanın sıralaması</h2>
        <span className="muted text-xs">
          {daysLeft === 1 ? "son gün" : `${daysLeft} gün kaldı`}
        </span>
      </div>

      <ol>
        {top.map((r) => (
          <Row key={r.userId} row={r} />
        ))}
      </ol>

      {outside ? (
        <>
          <div className="muted px-5 py-1 text-center text-xs">···</div>
          <ol>
            <Row row={outside} />
          </ol>
        </>
      ) : null}

      {me && gap > 0 ? (
        <p
          className="border-t px-5 py-2.5 text-center text-xs font-semibold"
          style={{ borderColor: "var(--border)", color: "var(--color-brand)" }}
        >
          Bir üsttekine {gap.toLocaleString("tr-TR")} XP — bir turluk mesafe.
        </p>
      ) : me && me.rank === 1 ? (
        <p
          className="border-t px-5 py-2.5 text-center text-xs font-semibold"
          style={{ borderColor: "var(--border)", color: "var(--color-flame)" }}
        >
          Zirvedesin. Pazartesi herkes sıfırdan başlıyor.
        </p>
      ) : null}
    </section>
  );
}

function Row({ row }: { row: { rank: number; userId: string; name: string | null; xp: number; streak: number; isMe: boolean } }) {
  const medal = MEDAL[row.rank];
  return (
    <li
      className="flex items-center gap-3 border-t px-5 py-2.5 first:border-t-0"
      style={{
        borderColor: "var(--border)",
        background: row.isMe
          ? "color-mix(in srgb, var(--color-brand) 8%, transparent)"
          : undefined,
      }}
    >
      <span
        className="w-6 shrink-0 text-center text-sm font-black tabular-nums"
        style={{ color: medal ?? "var(--text-muted)" }}
      >
        {row.rank}
      </span>

      <Avatar userId={row.userId} name={row.name} size={32} ring={medal ?? null} />

      <span className="min-w-0 flex-1 truncate text-sm font-semibold">
        {row.name ?? "İsimsiz öğrenci"}
        {row.isMe ? (
          <span
            className="ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
            style={{
              background: "color-mix(in srgb, var(--color-brand) 16%, transparent)",
              color: "var(--color-brand)",
            }}
          >
            sen
          </span>
        ) : null}
      </span>

      {row.streak > 0 ? (
        <span
          className="flex shrink-0 items-center gap-1 text-xs font-semibold tabular-nums"
          style={{ color: "var(--color-flame)" }}
          title={`${row.streak} günlük seri`}
        >
          <FlameIcon size={13} />
          {row.streak}
        </span>
      ) : null}

      <span
        className="w-16 shrink-0 text-right text-sm font-bold tabular-nums"
        style={{ color: "var(--color-brand)" }}
      >
        {row.xp.toLocaleString("tr-TR")}
      </span>
    </li>
  );
}
