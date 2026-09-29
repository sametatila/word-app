"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { EmptyCard } from "@/components/empty-card";
import { ShareIcon, UserPlusIcon, HandshakeIcon } from "@/components/icons";
import { PersonRowSkeleton } from "@/components/skeleton";
import { apiFetch } from "@/lib/api-fetch";
import { inviteText, shareInvite } from "@/lib/share";
import { errorText, social, type FriendsView, type SocialMeView } from "@/lib/social/client";
import { Feed } from "./feed";
import { Find } from "./find";
import { FriendList } from "./friend-list";
import { FriendsBoard } from "./friends-board";
import { LeagueBoard } from "./league-board";
import { Quests } from "./quests";
import { Requests } from "./requests";
import { useT, useLang } from "@/lib/i18n/client";
import { useShell } from "@/components/app-shell";
import { HUB_TABS, type HubTab } from "@/lib/social/hub-tab";
import { ErrorText } from "./error-text";

/* Sekme kimliği ve adres çözümü `lib/social/hub-tab`te: sunucu sayfası da
   okuyor ve buradan (istemci modülünden) okumak Next'te fırlatıyordu. */
const TABS = HUB_TABS;

/**
 * TOPLULUK — mobil `FriendsScreen` ile aynı kurgu (2026-09-28, Samet'in kararı;
 * `docs/plan/profil-ayarlar-topluluk.md`).
 *
 * Üç üst sekme: LİG (ilk açılan; "Grubum / Arkadaşlar" süzgeci, arkadaş
 * tablosunun tek yeri), ARKADAŞLAR (gelen istekler, ortak görev, liste,
 * arama, gönderilen istekler, tek davet `/r/KOD`) ve AKIŞ. Kimlik kartı ve
 * dişli kalktı: kimlik Profil'de, sosyal ayarlar Ayarlar › Hesap / Gizlilik'te.
 * Sekme adreste (`?tab=`) durur; eski `?tab=find` Arkadaşlar'a düşer.
 */
export function FriendsHub({ me, initialTab }: { me: SocialMeView; initialTab: HubTab }) {
  const t = useT();
  const lang = useLang();
  const { course } = useShell();
  const [tab, setTab] = useState<HubTab>(initialTab);
  const [board, setBoard] = useState<"group" | "friends">("group");
  /*
   * SEKME ŞERİDİ, BAĞLANTI ŞERİDİ DEĞİL: `tablist`/`tab`/`tabpanel`; Android'de
   * aynısı (`FriendsScreen`).
   */
  const kok = useId();
  const sekmeId = (k: string) => `${kok}-${k}`;
  const panelId = `${kok}-panel`;
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
      /* AĞ HATASI "KİMSE YOK" DEĞİL: önceki veri varsa o kalıyor; hiç yoksa
         sekme hata kartını gösteriyor (Android `FriendsScreen` ile aynı). */
      setErr(errorText(e));
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

  /* TEK DAVET — ödüllü kod bağlantısı (`/r/KOD`): katılan kişi davet edene
     arkadaşlık isteği gönderir, kabul edince ortak seri başlar. Kod okunamazsa
     bağlantı yine paylaşılıyor. */
  async function invite() {
    let code: string | null = null;
    try {
      const res = await apiFetch("/api/premium/referral", { cache: "no-store" });
      if (res.ok) code = ((await res.json()) as { code?: string }).code ?? null;
    } catch {
      /* kod olmadan da davet edilebilir */
    }
    if ((await shareInvite(inviteText(lang, course, code))) === "copied") {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div role="tablist" aria-label={t("socialw.tabs")} className="flex gap-1 rounded-panel p-1" style={{ background: "var(--surface-2)" }}>
        {TABS.map((tb) => (
          <button
            key={tb.key}
            id={sekmeId(tb.key)}
            role="tab"
            type="button"
            aria-selected={tab === tb.key}
            aria-controls={panelId}
            className="pressable flex flex-1 items-center justify-center gap-1.5 rounded-tile px-3 py-2 text-strong"
            /* Seçili sekme DOLU turuncu + beyaz, gölgesiz (2026-09-29 Samet:
               seçim B, dolu turuncu çip; mobil `FriendsScreen` aynı). Rozet
               turuncunun üstünde beyaza döner. */
            style={tab === tb.key ? { background: "var(--brand-fill)", color: "var(--on-brand)" } : { color: "var(--text-muted)" }}
            onClick={() => go(tb.key)}
          >
            {t(tb.label)}
            {tb.key === "friends" && incoming > 0 ? (
              <span className="rounded-full px-1.5 text-micro" style={tab === tb.key ? { background: "var(--on-brand)", color: "var(--on-brand-inv)" } : { background: "var(--brand-fill)", color: "var(--on-brand)" }}>
                {incoming}
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={sekmeId(tab)} tabIndex={0} className="mt-4">
        {/* Hata metninin yanında YERİNDE tekrar deneme (Android `FriendsScreen`). */}
        {err && tab !== "league" ? (
          <div className="mb-2 flex items-center gap-2">
            <ErrorText text={err} className="text-caption" />
            <button type="button" onClick={() => void reload()} className="chip px-3 py-1 text-caption">
              {t("friends.try_again")}
            </button>
          </div>
        ) : null}

        {tab === "league" ? (
          <div>
            {/* Grubum / Arkadaşlar — aynı haftanın iki tablosu; arkadaş tablosu yalnız burada. */}
            <div role="tablist" aria-label={t("leaderboard.league")} className="mb-3 flex gap-1.5">
              {(["group", "friends"] as const).map((k) => (
                <button
                  key={k}
                  role="tab"
                  type="button"
                  aria-selected={board === k}
                  className={`chip px-3.5 py-2 text-caption ${board === k ? "chip-active" : ""}`}
                  onClick={() => setBoard(k)}
                >
                  {t(k === "group" ? "community.my_group" : "social.tab_friends")}
                </button>
              ))}
            </div>
            {board === "group" ? <LeagueBoard /> : <FriendsBoard />}
          </div>
        ) : null}

        {tab === "friends" ? (
          <div className="flex flex-col gap-4">
            {err && data === null ? (
              <EmptyCard role="alert" icon={HandshakeIcon} tint="var(--color-sky)" title={t("friends.couldn_t_load")} text={t("social.err_offline")} />
            ) : data === null ? (
              <PersonRowSkeleton rows={2} />
            ) : (
              <>
                {/* Sıra bilinçli: cevap bekleyen iş (gelen istek), bu haftanın
                    taahhüdü (ortak görev), liste, sonra arama. */}
                <Requests incoming={data.incoming} outgoing={data.outgoing} side="incoming" onChanged={() => void reload()} />
                {data.friends.length ? <Quests friends={data.friends} me={me.userId} onChanged={() => void reload()} /> : null}
                {data.friends.length ? (
                  <FriendList friends={data.friends} nudgedToday={data.nudgedToday} onChanged={() => void reload()} />
                ) : (
                  <EmptyCard icon={UserPlusIcon} tint="var(--color-mint)" title={t("friends.no_friends_yet")} text={t("friends.search_by_username_or_send_your")} />
                )}
                <Find onChanged={() => void reload()} />
                <Requests incoming={data.incoming} outgoing={data.outgoing} side="outgoing" onChanged={() => void reload()} />
              </>
            )}
            <button
              type="button"
              onClick={() => void invite()}
              className="pressable flex w-full items-center gap-3 rounded-card p-4 text-left"
              style={{ border: "1px dashed var(--color-brand)", color: "var(--color-brand)" }}
            >
              <ShareIcon size={22} />
              <span className="min-w-0 flex-1">
                <span className="block text-strong">{t(copied ? "referral.copied" : "friends.invite_friend")}</span>
                <span className="muted block text-caption">{t("community.invite_sub")}</span>
              </span>
            </button>
          </div>
        ) : null}

        {tab === "feed" ? <Feed onFindFriends={() => go("friends")} /> : null}
      </div>
    </div>
  );
}
