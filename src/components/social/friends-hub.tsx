"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { HandshakeIcon, WrenchIcon } from "@/components/icons";
import { RowSkeleton } from "@/components/skeleton";
import { track } from "@/lib/track";
import { errorText, social, type FriendsView, type SocialMeView } from "@/lib/social/client";
import { Feed } from "./feed";
import { Find } from "./find";
import { FriendList } from "./friend-list";
import { FriendsBoard } from "./friends-board";
import { Quests } from "./quests";
import { Requests } from "./requests";

export type HubTab = "friends" | "feed" | "quests" | "requests" | "find";
const TABS: { key: HubTab; label: string }[] = [
  { key: "friends", label: "Arkadaşlar" },
  { key: "feed", label: "Akış" },
  { key: "quests", label: "Görevler" },
  { key: "requests", label: "İstekler" },
  { key: "find", label: "Bul" },
];

/**
 * Sosyal merkez — tek sayfa, beş sekme. Üstte kimlik kartı: kullanıcı adı
 * ilk kez burada görülür (otomatik atanır) ve profil bağlantısı buradan
 * paylaşılır; davetin adresi bu. Sekme URL'de (`?tab=`) durur ki bildirimden
 * gelen kişi doğrudan isteklere düşsün.
 */
export function FriendsHub({ me, initialTab }: { me: SocialMeView; initialTab: HubTab }) {
  const [tab, setTab] = useState<HubTab>(initialTab);
  const [data, setData] = useState<FriendsView | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [incoming, setIncoming] = useState(me.counts.incoming);

  const reload = useCallback(async () => {
    try {
      const d = await social.friends();
      setData(d);
      setIncoming(d.incoming.length);
      setErr(null);
    } catch (e) {
      setErr(errorText(e));
      setData((prev) => prev ?? { friends: [], incoming: [], outgoing: [], nudgedToday: [], today: "" });
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  function go(next: HubTab) {
    setTab(next);
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", next);
      window.history.replaceState(null, "", url.toString());
    } catch {
      /* URL güncellenemezse sekme yine değişir */
    }
  }

  async function share() {
    const url = `${window.location.origin}/u/${me.username}`;
    const text = `Lernomi'de Almanca çalışıyorum. Arkadaş ol, birlikte hedef tutturalım: ${url}`;
    track("share", 0, "profile");
    try {
      if (navigator.share) {
        await navigator.share({ text, url });
        return;
      }
    } catch {
      /* paylaşım kapatıldı */
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* pano yok */
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <section className="card flex items-center gap-3 px-4 py-3">
        <Avatar userId={me.userId} name={me.name} size={44} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold">{me.name ?? "İsimsiz öğrenci"}</p>
          <p className="muted truncate text-xs">
            @{me.username} · {me.counts.friends} arkadaş
          </p>
        </div>
        <button className="btn btn-primary h-9 px-3 text-xs" onClick={() => void share()}>
          <HandshakeIcon size={15} />
          <span className="ml-1.5">{copied ? "Kopyalandı" : "Davet et"}</span>
        </button>
        <Link href="/profile/settings#social" prefetch={false} className="btn btn-ghost h-9 w-9 px-0" aria-label="Sosyal ayarlar">
          <WrenchIcon size={16} />
        </Link>
      </section>

      <nav className="mt-3 flex gap-1.5 overflow-x-auto pb-1" aria-label="Sosyal sekmeler">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`chip shrink-0 ${tab === t.key ? "chip-active" : ""}`}
            aria-current={tab === t.key ? "page" : undefined}
            onClick={() => go(t.key)}
          >
            {t.label}
            {t.key === "requests" && incoming > 0 ? (
              <span className="ml-1.5 rounded-full px-1.5 text-[10px] font-black" style={{ background: "var(--color-flame)", color: "#fff" }}>
                {incoming}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="mt-3">
        {err ? <p className="mb-2 text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
        {tab === "friends" ? (
          data === null ? (
            <RowSkeleton rows={3} height={64} />
          ) : (
            <div className="flex flex-col gap-4">
              {data.friends.length ? (
                <FriendList friends={data.friends} nudgedToday={data.nudgedToday} onChanged={() => void reload()} />
              ) : (
                <div className="card p-6 text-center">
                  <p className="font-bold">Henüz arkadaşın yok</p>
                  <p className="muted mt-1 text-sm">Kullanıcı adıyla ara ya da davet bağlantını gönder. Arkadaşlar birbirinin serisini görür, tepki verir, birlikte görev yapar.</p>
                  <button className="btn btn-primary mt-4 h-9 px-4 text-xs" onClick={() => go("find")}>
                    Arkadaş bul
                  </button>
                </div>
              )}
              <FriendsBoard />
            </div>
          )
        ) : null}
        {tab === "feed" ? <Feed onFindFriends={() => go("find")} /> : null}
        {tab === "quests" ? (
          data === null ? <RowSkeleton rows={2} height={96} /> : <Quests friends={data.friends} me={me.userId} onChanged={() => void reload()} />
        ) : null}
        {tab === "requests" ? (
          data === null ? <RowSkeleton rows={2} height={64} /> : <Requests incoming={data.incoming} outgoing={data.outgoing} onChanged={() => void reload()} />
        ) : null}
        {tab === "find" ? <Find onChanged={() => void reload()} /> : null}
      </div>
    </div>
  );
}
