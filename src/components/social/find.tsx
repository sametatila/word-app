"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar } from "@/components/avatar";
import { FlameIcon } from "@/components/icons";
import { RowSkeleton } from "@/components/skeleton";
import { errorText, social, type SearchHitView, type SuggestionView } from "@/lib/social/client";
import { UserAction } from "./user-action";

/**
 * Bul: arama kutusu + öneriler. Arama iki karakterden sonra, 350 ms
 * beklemeli — her tuşta istek atmak hem sunucuyu hem dakikada 30 sınırını
 * boşa harcar. Kutu boşken öneriler görünür; yazınca sonuçlar onun yerine geçer.
 */
export function Find({ onChanged }: { onChanged?: () => void }) {
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
        <span className="muted text-xs font-bold">@</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Kullanıcı adı ya da isim"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Kullanıcı ara"
        />
        {q ? (
          <button className="muted text-xs" onClick={() => setQ("")} aria-label="Temizle">
            Temizle
          </button>
        ) : null}
      </label>

      {err ? <p className="px-1 text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}

      {q.trim().length >= 2 ? (
        hits === null ? (
          <RowSkeleton rows={3} height={60} />
        ) : hits.length ? (
          <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
            {hits.map((h) => (
              <PersonRow key={h.userId} user={h} note={`${h.level}${h.currentStreak ? ` · ${h.currentStreak} günlük seri` : ""}`} onChanged={onChanged}>
                <UserAction userId={h.userId} relation={h.relation} compact onChange={onChanged} />
              </PersonRow>
            ))}
          </ol>
        ) : (
          <p className="muted px-1 text-sm">Sonuç yok. Gizli profiller yalnız tam kullanıcı adıyla bulunur.</p>
        )
      ) : (
        <section>
          <h3 className="muted mb-2 px-1 text-xs font-bold uppercase tracking-wide">Tanıyor olabilirsin</h3>
          {sugg === null ? (
            <RowSkeleton rows={3} height={60} />
          ) : sugg.length ? (
            <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
              {sugg.map((s) => (
                <PersonRow
                  key={s.userId}
                  user={s}
                  note={s.reason === "mutual" ? `${s.mutual} ortak arkadaş` : s.reason === "level" ? `Aynı seviye (${s.level})` : "Bu hafta aktif"}
                  streak={s.currentStreak}
                  onChanged={onChanged}
                >
                  <UserAction userId={s.userId} relation="none" compact onChange={onChanged} />
                </PersonRow>
              ))}
            </ol>
          ) : (
            <p className="muted px-1 text-sm">Şimdilik öneri yok. Kullanıcı adıyla ara ya da profil bağlantını paylaş.</p>
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
  user: { userId: string; name: string | null; username: string | null };
  note: string;
  streak?: number;
  onChanged?: () => void;
  children: React.ReactNode;
}) {
  const href = user.username ? `/u/${user.username}` : null;
  return (
    <li className="flex items-center gap-3 px-4 py-3" style={{ borderColor: "var(--border)" }}>
      <Avatar userId={user.userId} name={user.name} size={40} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">
          {href ? <Link href={href} prefetch={false}>{user.name ?? "İsimsiz öğrenci"}</Link> : user.name ?? "İsimsiz öğrenci"}
          {user.username ? <span className="muted ml-1.5 text-xs font-normal">@{user.username}</span> : null}
        </p>
        <p className="muted flex items-center gap-2 text-[11px]">
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
