"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/avatar";
import { FlameIcon } from "@/components/icons";
import { PersonRowSkeleton } from "@/components/skeleton";
import { errorText, social, type SearchHitView, type SuggestionView } from "@/lib/social/client";
import { UserAction } from "./user-action";
import { useT } from "@/lib/i18n/client";

/**
 * Bul: arama kutusu + öneriler. Arama iki karakterden sonra, 350 ms
 * beklemeli — her tuşta istek atmak hem sunucuyu hem dakikada 30 sınırını
 * boşa harcar. Kutu boşken öneriler görünür; yazınca sonuçlar onun yerine geçer.
 */
export function Find({ onChanged }: { onChanged?: () => void }) {
  const t = useT();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHitView[] | null>(null);
  const [sugg, setSugg] = useState<SuggestionView[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    social
      .suggestions()
      .then((r) => setSugg(r.suggestions))
      .catch(() => setSugg([]));
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const text = q.trim();
    if (text.length < 2) {
      setHits(null);
      setErr(null);
      return;
    }
    timer.current = setTimeout(() => {
      social
        .search(text)
        .then((r) => {
          setHits(r.hits);
          setErr(null);
        })
        .catch((e) => setErr(errorText(e)));
    }, 350);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [q]);

  return (
    <div className="flex flex-col gap-4">
      <label className="card flex items-center gap-2 px-4 py-2.5">
        <span className="muted text-caption">@</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t("find.username_or_name")}
          className="min-w-0 flex-1 bg-transparent text-body outline-none"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-label={t("find.search_users")}
        />
        {q ? (
          <button className="muted text-caption" onClick={() => setQ("")} aria-label={t("find.clear")}>
            {t("find.clear")}
          </button>
        ) : null}
      </label>

      {err ? <p className="px-1 text-caption" style={{ color: "var(--color-rose)" }}>{err}</p> : null}

      {q.trim().length >= 2 ? (
        hits === null ? (
          <PersonRowSkeleton rows={3} />
        ) : hits.length ? (
          <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
            {hits.map((h) => (
              <PersonRow key={h.userId} user={h} note={`${h.level}${h.currentStreak ? ` · ${t("social.days_streak", { n: h.currentStreak })}` : ""}`}>
                <UserAction userId={h.userId} relation={h.relation} compact onChange={onChanged} />
              </PersonRow>
            ))}
          </ol>
        ) : (
          <p className="muted px-1 text-body">{t("find.no_results_private_profiles_only")}</p>
        )
      ) : (
        <section>
          <h3 className="muted mb-2 px-1 text-micro uppercase tracking-wide">{t("find.you_may_know")}</h3>
          {sugg === null ? (
            <PersonRowSkeleton rows={3} />
          ) : sugg.length ? (
            <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
              {sugg.map((s) => (
                <PersonRow
                  key={s.userId}
                  user={s}
                  note={s.reason === "mutual" ? t("social.mutual", { n: s.mutual }) : s.reason === "level" ? t("find.same_level", { level: s.level }) : t("find.active_week")}
                  streak={s.currentStreak}
                >
                  <UserAction userId={s.userId} relation="none" compact onChange={onChanged} />
                </PersonRow>
              ))}
            </ol>
          ) : (
            <p className="muted px-1 text-body">{t("find.no_suggestions_yet_search_by")}</p>
          )}
        </section>
      )}
    </div>
  );
}

function PersonRow({
  user,
  note,
  streak,
  children,
}: {
  user: { userId: string; name: string | null; username: string | null; avatar: string | null };
  note: string;
  streak?: number;
  children: React.ReactNode;
}) {
  const t = useT();
  const href = user.username ? `/u/${user.username}` : null;
  return (
    <li className="flex items-center gap-3 px-4 py-3" style={{ borderColor: "var(--border)" }}>
      {/* Avatar da profile götürüyor: akış ve istek listelerinde öyle, burada
          değildi - "avatara bas" öğrenen kullanıcı bu listede karşılık
          bulamıyordu. Ekran okuyucudan gizli, çünkü hemen yanındaki ad aynı
          yere gidiyor ve adsız ikinci bir durak eklemesin. Android `Find` de
          ikisini birden basılabilir yapıp avatarı aynı gerekçeyle gizliyor. */}
      {href ? (
        <Link href={href} prefetch={false} aria-hidden tabIndex={-1} className="shrink-0">
          <Avatar userId={user.userId} name={user.name} avatar={user.avatar} size={40} />
        </Link>
      ) : (
        <Avatar userId={user.userId} name={user.name} avatar={user.avatar} size={40} />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-strong">
          {href ? <Link href={href} prefetch={false}>{user.name ?? t("social.unnamed")}</Link> : (user.name ?? t("social.unnamed"))}
          {user.username ? <span className="muted ml-1.5 text-caption">@{user.username}</span> : null}
        </p>
        <p className="muted flex items-center gap-2 text-micro">
          {note}
          {streak ? (
            <span className="flex items-center gap-0.5" style={{ color: "var(--color-flame)" }}>
              <FlameIcon size={11} />
              {streak}
            </span>
          ) : null}
        </p>
      </div>
      {children}
    </li>
  );
}
