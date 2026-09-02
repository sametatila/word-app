"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/avatar";
import { FlameIcon, HandshakeIcon, TargetIcon } from "@/components/icons";
import { errorText, social } from "@/lib/social/client";
import type { FriendRow } from "@/lib/social/types";

/**
 * Arkadaş satırı: kimlik + bu haftaki emeği + ortak seri + iki eylem
 * (dürt, ortak görev). Çıkarma menüde değil, satırın sonunda küçük — az
 * kullanılır ama saklanmaz. Dürtme günde bir: düğme gönderilince kapanır,
 * 429 beklenmez.
 */
export function FriendList({
  friends,
  nudgedToday,
  onChanged,
}: {
  friends: FriendRow[];
  nudgedToday: string[];
  onChanged: () => void;
}) {
  if (!friends.length) return null;
  return (
    <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
      {friends.map((f) => (
        <FriendItem key={f.userId} f={f} nudged={nudgedToday.includes(f.userId)} onChanged={onChanged} />
      ))}
    </ol>
  );
}

function FriendItem({ f, nudged, onChanged }: { f: FriendRow; nudged: boolean; onChanged: () => void }) {
  const [sent, setSent] = useState(nudged);
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function nudge() {
    if (busy || sent) return;
    setBusy(true);
    setMsg(null);
    try {
      await social.nudge(f.userId, "remind");
      setSent(true);
      setMsg("Dürttün");
    } catch (e) {
      setMsg(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  async function quest() {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    try {
      await social.inviteQuest(f.userId);
      setMsg("Görev daveti gitti");
      onChanged();
    } catch (e) {
      setMsg(errorText(e));
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!window.confirm(`${f.name ?? "Bu kişi"} arkadaşlıktan çıkarılsın mı? Bildirim gitmez.`)) return;
    try {
      await social.remove(f.userId);
      onChanged();
    } catch (e) {
      setMsg(errorText(e));
    }
  }

  const href = f.username ? `/u/${f.username}` : null;
  return (
    <li className="flex items-center gap-3 px-4 py-3" style={{ borderColor: "var(--border)" }}>
      {href ? (
        <Link href={href} prefetch={false} className="shrink-0">
          <Avatar userId={f.userId} name={f.name} size={40} />
        </Link>
      ) : (
        <Avatar userId={f.userId} name={f.name} size={40} />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">
          {href ? <Link href={href} prefetch={false}>{f.name ?? "İsimsiz öğrenci"}</Link> : f.name ?? "İsimsiz öğrenci"}
          {f.username ? <span className="muted ml-1.5 text-xs font-normal">@{f.username}</span> : null}
        </p>
        <p className="muted mt-0.5 flex flex-wrap items-center gap-x-3 text-[11px]">
          <span className="font-semibold" style={{ color: "var(--color-brand)" }}>
            {f.weeklyXp.toLocaleString("tr-TR")} XP bu hafta
          </span>
          {f.currentStreak > 0 ? (
            <span className="flex items-center gap-0.5" style={{ color: "var(--color-flame)" }}>
              <FlameIcon size={12} />
              {f.currentStreak}
            </span>
          ) : null}
          {f.friendStreak > 0 ? (
            <span className="flex items-center gap-0.5" style={{ color: "var(--color-mint)" }} title="Birlikte çalıştığınız ardışık gün">
              <HandshakeIcon size={12} />
              {f.friendStreak} gün birlikte
            </span>
          ) : null}
          <span>{f.level}</span>
        </p>
        {msg ? <p className="mt-1 text-[11px]" style={{ color: msg === "Dürttün" || msg.startsWith("Görev") ? "var(--color-mint)" : "var(--color-rose)" }}>{msg}</p> : null}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button className="btn btn-ghost h-8 px-2.5 text-xs" disabled={busy || sent} onClick={() => void nudge()} title="Bugün çalışmasını hatırlat">
          {sent ? "Dürtüldü" : "Dürt"}
        </button>
        <button className="btn btn-ghost h-8 px-2 text-xs" disabled={busy} onClick={() => void quest()} title="Bu hafta ortak görev" aria-label="Ortak görev daveti">
          <TargetIcon size={15} />
        </button>
        <button className="muted h-8 px-1.5 text-[11px]" onClick={() => void remove()} aria-label="Arkadaşlıktan çıkar">
          Çıkar
        </button>
      </div>
    </li>
  );
}
