"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { RowSkeleton } from "@/components/skeleton";
import { errorText, notificationText, social, timeAgo, type NotificationView } from "@/lib/social/client";
import { ReactionGlyph } from "./reaction-icons";
import type { ReactionKind } from "@/lib/social/types";

/** Bildirimin götürdüğü yer — her satırın bir işi var. */
function hrefFor(n: NotificationView): string {
  switch (n.type) {
    case "friend_request":
      return "/friends?tab=requests";
    case "friend_accepted":
      return n.actor?.username ? `/u/${n.actor.username}` : "/friends";
    case "quest_invite":
    case "quest_accepted":
    case "quest_completed":
      return "/friends?tab=quests";
    case "nudge":
      return "/learn";
    default:
      return "/friends?tab=feed";
  }
}

/**
 * Gelen kutusu. Açılınca hepsi okundu sayılır (rozet sıfırlanır) — tek tek
 * "okundu" işaretlemek, sohbetsiz bir kutuda gereksiz iş. Satır tıklanınca
 * ilgili yere gider.
 */
export function Inbox() {
  const [items, setItems] = useState<NotificationView[] | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function load(after: number | null) {
    setBusy(true);
    try {
      const page = await social.notifications(after);
      setItems((prev) => (after && prev ? [...prev, ...page.items] : page.items));
      setCursor(page.nextCursor);
      if (!after && page.unread > 0) {
        await social.markRead("all");
        window.dispatchEvent(new CustomEvent("lernomi:inbox-read"));
      }
    } catch (e) {
      setErr(errorText(e));
      setItems((prev) => prev ?? []);
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    void load(null);
  }, []);

  if (items === null) return <RowSkeleton rows={5} height={60} />;
  if (!items.length) {
    return (
      <div className="card p-6 text-center">
        <p className="font-bold">Bildirim yok</p>
        <p className="muted mt-1 text-sm">Arkadaşlık istekleri, tepkiler, dürtmeler ve görev haberleri burada toplanır.</p>
        {err ? <p className="mt-2 text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
        {items.map((n) => (
          <li key={n.id} style={{ borderColor: "var(--border)", background: n.read ? undefined : "color-mix(in srgb, var(--color-brand) 7%, transparent)" }}>
            <Link href={hrefFor(n)} prefetch={false} className="flex items-center gap-3 px-4 py-3">
              {n.actor ? <Avatar userId={n.actor.userId} name={n.actor.name} size={36} /> : <span className="h-9 w-9 rounded-full" style={{ background: "var(--surface-2)" }} />}
              <span className="min-w-0 flex-1">
                <span className="block text-sm leading-snug">{notificationText(n)}</span>
                <span className="muted block text-[11px]">{timeAgo(n.createdAt)}</span>
              </span>
              {n.type === "reaction" && typeof n.detail.reaction === "string" ? <ReactionGlyph kind={n.detail.reaction as ReactionKind} size={18} /> : null}
            </Link>
          </li>
        ))}
      </ol>
      {cursor ? (
        <button className="btn btn-ghost h-9 text-xs" disabled={busy} onClick={() => void load(cursor)}>
          {busy ? "Yükleniyor" : "Daha eski"}
        </button>
      ) : null}
      {err ? <p className="text-center text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
    </div>
  );
}
