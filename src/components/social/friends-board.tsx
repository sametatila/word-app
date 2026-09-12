"use client";

import Link from "next/link";
import { EmptyCard } from "@/components/empty-card";
import { PodiumIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { FlameIcon } from "@/components/icons";
import { RowSkeleton } from "@/components/skeleton";
import { social, type BoardView } from "@/lib/social/client";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber } from "@/lib/i18n/dict";

const MEDAL: Record<number, string> = { 1: "var(--color-flame)", 2: "var(--color-sky)", 3: "var(--color-mint)" };

/**
 * Arkadaşlar arası haftalık tablo — genel tabloyla aynı biçim, küme farklı.
 * Genel tablo iki kişiden azsa hiç çizilmez; burada tek kişi de "arkadaş
 * ekle"yi görür, çünkü bu sayfanın kendisi arkadaş edinmek için var.
 */
export function FriendsBoard() {
  const t = useT();
  const lang = useLang();
  const [board, setBoard] = useState<BoardView | null>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    social.board().then(setBoard).catch(() => setErr(true));
  }, []);
  if (!board && !err) return <RowSkeleton rows={3} height={48} />;
  /*
   * AĞ HATASI "KİMSE YOK" DEĞİL.
   *
   * Hata boş bir tabloya çevriliyordu (`rows: []`) ve kart tam altındaki
   * "henüz yarışacak kimse yok"a düşüyordu: arkadaşı olan kullanıcı, ağ
   * koptuğunda arkadaşlarının kaybolduğunu görüyordu. Lig sekmesi aynı
   * durumu ayrı bir kartla söylüyor (`league-board`), iki sekme artık aynı.
   */
  if (err || !board)
    return (
      <EmptyCard
        role="alert"
        icon={PodiumIcon}
        tint="var(--color-sky)"
        title={t("leaderboard.couldn_t_load_leaderboard")}
        text={t("social.err_offline")}
      />
    );
  if (board.rows.length < 2) {
    return (
      <EmptyCard
        icon={PodiumIcon}
        tint="var(--color-sky)"
        title={t("friendsboard.no_one_to_compete_with_yet")}
        text={t("friendsboard.add_friends_to_see_each_other_in")}
      />
    );
  }
  const me = board.rows.find((r) => r.isMe);
  const above = me && me.rank > 1 ? board.rows.find((r) => r.rank === me.rank - 1) : null;
  const gap = me && above ? Math.max(0, above.xp - me.xp) : 0;
  return (
    <section className="card overflow-hidden">
      <div className="flex items-baseline justify-between border-b px-5 py-3" style={{ borderColor: "var(--border)" }}>
        <h2 className="text-strong">{t("friendsboard.among_friends_this_week")}</h2>
        <span className="muted text-caption">{board.daysLeft === 1 ? t("social.last_day") : t("social.days_left", { n: board.daysLeft })}</span>
      </div>
      <ol>
        {board.rows.map((r) => (
          <li
            key={r.userId}
            className="flex items-center gap-3 border-t px-5 py-2.5 first:border-t-0"
            style={{ borderColor: "var(--border)", background: r.isMe ? "var(--brand-soft)" : undefined }}
          >
            <span className="w-[30px] shrink-0 text-center text-h3 tabular-nums" style={{ color: MEDAL[r.rank] ?? "var(--text-muted)" }}>
              {r.rank}
            </span>
            <Avatar userId={r.userId} name={r.name} avatar={r.avatar} size={40} ring={MEDAL[r.rank] ?? null} />
            <span className="min-w-0 flex-1 truncate text-strong">
              {r.username && !r.isMe ? <Link href={`/u/${r.username}`} prefetch={false}>{r.name ?? t("social.student")}</Link> : (r.name ?? t("social.student"))}
              {/* "sen" GÖMÜLÜ TÜRKÇEYDİ: İngilizce ve Almanca arayüzde de
                  "sen" yazıyordu. Anahtar taban sözlükte hazırdı ve Android
                  aynı satırda onu kullanıyor. */}
              {r.isMe ? <span className="muted ml-1 text-caption">{t("social.you_paren")}</span> : null}
            </span>
            {r.streak > 0 ? (
              <span className="flex shrink-0 items-center gap-1 text-caption tabular-nums" style={{ color: "var(--color-flame)" }}>
                <FlameIcon size={13} />
                {r.streak}
              </span>
            ) : null}
            <span className="w-16 shrink-0 text-right text-strong tabular-nums" style={{ color: "var(--color-brand)" }}>
              {formatNumber(r.xp, lang)}
            </span>
          </li>
        ))}
      </ol>
      {me && gap > 0 ? (
        <p className="border-t px-5 py-2.5 text-center text-caption" style={{ borderColor: "var(--border)", color: "var(--color-brand)" }}>
          {t("friendsboard.gap", { name: above?.name?.split(" ")[0] ?? t("friendsboard.the_one_above"), xp: formatNumber(gap, lang) })}
        </p>
      ) : null}
    </section>
  );
}
