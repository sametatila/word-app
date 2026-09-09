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
import { useT, useLang } from "@/lib/i18n/client";

export type HubTab = "friends" | "feed" | "quests" | "requests" | "find";
const TABS: { key: HubTab; label: string }[] = [
  { key: "friends", label: "social.tab_friends" },
  { key: "feed", label: "friends.tab_feed" },
  { key: "quests", label: "friends.tab_quests" },
  { key: "requests", label: "friends.tab_requests" },
  { key: "find", label: "friends.tab_find" },
];

/**
 * Sosyal merkez — tek sayfa, beş sekme. Üstte kimlik kartı: kullanıcı adı
 * ilk kez burada görülür (otomatik atanır) ve profil bağlantısı buradan
 * paylaşılır; davetin adresi bu. Sekme URL'de (`?tab=`) durur ki bildirimden
 * gelen kişi doğrudan isteklere düşsün.
 */
export function FriendsHub({ me, initialTab }: { me: SocialMeView; initialTab: HubTab }) {
  const t = useT();
  const lang = useLang();
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
      {/*
        KİMLİK KARTI — Profil'deki kartla aynı kurgu (mobil `FriendsScreen`
        de öyle): ortalanmış arma, ad, kullanıcı adı ve rozetler.

        Önce tek satırlık sıkışık bir şeritti: 44px arma, iki satır metin, bir
        buton ve bir dişli yan yana. 360 piksellik bir ekranda davet düğmesinin
        etiketi ("Davet et") armanın altına düşüyordu ve kullanıcı adı —
        davetin ADRESİ, bu ekranın var oluş sebebi — kırpılıyordu.
      */}
      <section className="card flex flex-col items-center p-5">
        <Avatar userId={me.userId} name={me.name} size={64} />
        <p className="mt-3 text-h3">{me.name ?? t("social.unnamed")}</p>
        <p className="muted text-caption">@{me.username}</p>
        <div className="mt-3 flex gap-2">
          <span
            className="rounded-full px-3 py-1.5 text-caption"
            style={{
              background: "color-mix(in srgb, var(--color-mint-500) 16%, transparent)",
              color: "var(--color-mint)",
            }}
          >
            {t("friends.count_friends", { n: me.counts.friends })}
          </span>
          {/* Bekleyen istek ve okunmamış rozetleri mobilde de burada; web'de
              hiç çizilmiyordu ve "3 istek var" bilgisi yalnız sekme
              rozetinde kalıyordu. */}
          {me.counts.incoming > 0 ? (
            <span
              className="rounded-full px-3 py-1.5 text-caption"
              style={{
                background: "color-mix(in srgb, var(--color-flame-500) 16%, transparent)",
                color: "var(--color-flame)",
              }}
            >
              {t("friends.count_requests", { n: me.counts.incoming })}
            </span>
          ) : null}
          {me.counts.unread > 0 ? (
            <span
              className="rounded-full px-3 py-1.5 text-caption"
              style={{
                background: "color-mix(in srgb, var(--color-brand-500) 16%, transparent)",
                color: "var(--color-brand)",
              }}
            >
              {t("friends.count_new", { n: me.counts.unread })}
            </span>
          ) : null}
        </div>
      </section>

      {/* Davet — premium bandıyla aynı dil: tam genişlikte, dolu zemin.
          Bu ekranın tek asıl eylemi o ve satır sonunda bir düğme olarak
          durduğunda öyle görünmüyordu. */}
      <button
        onClick={() => void share()}
        className="pressable mt-3 flex w-full items-center gap-3 rounded-card p-4 text-white shadow-soft"
        style={{ background: "var(--color-brand-500)" }}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-tile bg-white/20">
          <HandshakeIcon size={22} />
        </span>
        <span className="min-w-0 flex-1 text-left">
          <span className="block text-h3">{t(copied ? "socialw.link_copied" : "friends.invite_friend")}</span>
          <span className="block text-caption text-white/85">{t("socialw.invite_sub")}</span>
        </span>
      </button>

      {/* Sekmeler çipti ama DOLGUSU yoktu: `.chip` yalnız kenarlık, yarıçap
          ve renk veriyor, ölçüyü kullanan yer seçiyor. Sonuç, yan yana yapışık
          beş etiketti — seçili olan dolu zeminliyken bile nerede bittiği
          okunmuyordu. */}
      <nav className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto pb-1" aria-label={t("socialw.tabs")}>
        {TABS.map((tb) => (
          <button
            key={tb.key}
            className={`chip shrink-0 px-3.5 py-2 text-caption ${tab === tb.key ? "chip-active" : ""}`}
            aria-current={tab === tb.key ? "page" : undefined}
            onClick={() => go(tb.key)}
          >
            {t(tb.label)}
            {tb.key === "requests" && incoming > 0 ? (
              <span className="ml-1.5 rounded-full px-1.5 text-micro" style={{ background: "var(--color-flame)", color: "#fff" }}>
                {incoming}
              </span>
            ) : null}
          </button>
        ))}
      </nav>

      <div className="mt-3">
        {err ? <p className="mb-2 text-caption" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
        {tab === "friends" ? (
          data === null ? (
            <RowSkeleton rows={3} height={64} />
          ) : (
            <div className="flex flex-col gap-4">
              {data.friends.length ? (
                <FriendList friends={data.friends} nudgedToday={data.nudgedToday} onChanged={() => void reload()} />
              ) : (
                <div className="card p-6 text-center">
                  <p className="text-h3">{t("friends.no_friends_yet")}</p>
                  <p className="muted mt-1 text-body">{t("friends.search_by_username_or_send_your")}</p>
                  <button className="btn btn-primary mt-4 px-4 py-2.5" onClick={() => go("find")}>
                    {t("friends.find_friends")}
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
