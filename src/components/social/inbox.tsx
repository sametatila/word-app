"use client";

import Link from "next/link";
import { EmptyCard } from "@/components/empty-card";
import { BellIcon, CheckIcon, ChevronRightIcon, FlameIcon, HandshakeIcon, InboxIcon, TargetIcon, UserPlusIcon } from "@/components/icons";
import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { SkeletonLine, SkeletonTile } from "@/components/skeleton";
import { errorText, notificationText, social, timeAgo, type NotificationView } from "@/lib/social/client";
import { REACTION_TONE, ReactionGlyph } from "./reaction-icons";
import type { ReactionKind } from "@/lib/social/types";
import { useT, useLang } from "@/lib/i18n/client";

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
 * Bildirim türü → ikon karosu — Android `InboxScreen` `tileFor` ile birebir
 * (info→sky, success→mint, streak→flame, primary→brand).
 *
 * Aktörü OLMAYAN satır (lig yükselişi) webde boş gri bir daire çiziyordu:
 * satır neyle ilgili olduğunu hiç söylemiyordu. Aktörü olan satırda da tür
 * hiç görünmüyordu - avatar kimi gösteriyor, neyi değil.
 */
function tileFor(n: NotificationView): { Icon: (p: { size?: number }) => React.JSX.Element; tint: string } {
  switch (n.type) {
    case "friend_request":
      return { Icon: UserPlusIcon, tint: "var(--color-sky)" };
    case "friend_accepted":
      return { Icon: HandshakeIcon, tint: "var(--color-mint)" };
    case "nudge":
      return { Icon: BellIcon, tint: "var(--color-flame)" };
    case "quest_invite":
    case "quest_accepted":
      return { Icon: TargetIcon, tint: "var(--color-brand)" };
    case "quest_completed":
      return { Icon: CheckIcon, tint: "var(--color-mint)" };
    case "friend_milestone":
      return { Icon: FlameIcon, tint: "var(--color-flame)" };
    default:
      return { Icon: InboxIcon, tint: "var(--color-brand)" };
  }
}

/** 34'lük yuvarlak tint kabı — satırın sağ ucundaki tür/tepki simgesi. */
function RowGlyph({ tint, children }: { tint: string; children: React.ReactNode }) {
  return (
    <span
      className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full"
      style={{ background: `color-mix(in srgb, ${tint} 13%, transparent)`, color: tint }}
    >
      {children}
    </span>
  );
}

/**
 * Gelen kutusu. Açılınca hepsi okundu sayılır (rozet sıfırlanır) — tek tek
 * "okundu" işaretlemek, sohbetsiz bir kutuda gereksiz iş. Satır tıklanınca
 * ilgili yere gider.
 */
export function Inbox() {
  const t = useT();
  const lang = useLang();
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

  /* İskelet satırın GERÇEK yapısında: yuvarlak avatar, altında iki metin
     satırı. Düz altmış piksellik bloklar veri gelince yerinden oynuyordu.
     Mobil `InboxScreen` de aynı parçaları kullanıyor. */
  if (items === null)
    return (
      <ol aria-hidden className="card divide-y divide-[color:var(--border)] overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="flex items-center gap-3 px-4 py-3" style={{ opacity: 1 - i * 0.12 }}>
            <SkeletonTile size={40} className="rounded-full" />
            <span className="min-w-0 flex-1">
              <SkeletonLine variant="body" width={`${72 - i * 6}%`} />
              <SkeletonLine variant="micro" width={64} className="mt-1" />
            </span>
            <SkeletonTile size={34} className="rounded-full" />
          </li>
        ))}
      </ol>
    );
  if (!items.length) {
    return (
      <>
        <EmptyCard
          icon={InboxIcon}
          title={t("inbox.no_notifications")}
          text={t("inbox.friend_requests_reactions_nudges")}
        />
        {err ? <p className="mt-2 text-center text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
      </>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
        {items.map((n) => {
          const { Icon, tint } = tileFor(n);
          const reaction = n.type === "reaction" && typeof n.detail.reaction === "string" ? (n.detail.reaction as ReactionKind) : null;
          return (
            <li key={n.id} style={{ borderColor: "var(--border)" }}>
              <Link href={hrefFor(n)} prefetch={false} className="flex items-center gap-3 px-4 py-3">
                {n.actor ? (
                  <Avatar userId={n.actor.userId} name={n.actor.name} size={40} />
                ) : (
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center"
                    style={{ borderRadius: "var(--radius-tile)", background: `color-mix(in srgb, ${tint} 13%, transparent)`, color: tint }}
                  >
                    <Icon size={20} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  {/* Okunmamış satır KALIN. Tek işaret satırın arka planıydı ve
                      Android okunmamışı yazı ağırlığı + nokta ile söylüyor. */}
                  <span className={`block ${n.read ? "text-body" : "text-strong"}`}>{notificationText(n, lang)}</span>
                  <span className="block text-micro" style={{ color: "var(--text-faint)" }}>{timeAgo(n.createdAt, lang)}</span>
                </span>
                {reaction ? (
                  <RowGlyph tint={REACTION_TONE[reaction]}>
                    <ReactionGlyph kind={reaction} size={18} />
                  </RowGlyph>
                ) : n.actor ? (
                  <RowGlyph tint={tint}>
                    <Icon size={18} />
                  </RowGlyph>
                ) : (
                  <span className="shrink-0" style={{ color: "var(--text-faint)" }}>
                    <ChevronRightIcon size={20} />
                  </span>
                )}
                {!n.read ? <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--color-brand)" }} /> : null}
              </Link>
            </li>
          );
        })}
      </ol>
      {cursor ? (
        <button className="btn btn-ghost h-9 text-xs" disabled={busy} onClick={() => void load(cursor)}>
          {t(busy ? "social.loading" : "social.older")}
        </button>
      ) : null}
      {err ? <p className="text-center text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
    </div>
  );
}
