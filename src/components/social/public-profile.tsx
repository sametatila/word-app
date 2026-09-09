"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { FlameIcon, HandshakeIcon, TargetIcon, TrophyIcon } from "@/components/icons";
import { errorText, social, type PublicProfileView } from "@/lib/social/client";
import type { Relation } from "@/lib/social/types";
import { FeedCard } from "./feed";
import { UserAction } from "./user-action";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber, localeOf } from "@/lib/i18n/dict";

/**
 * Herkese açık profil. Sunucu görünürlüğü uygulayıp kırpılmış veriyi verir;
 * burada yalnız düzen ve eylemler. Engelle/şikayet küçük ve altta — nadir
 * ama bulunabilir. Şikayet sebebi kapalı liste, serbest metin isteğe bağlı.
 */
export function PublicProfile({ data, me }: { data: PublicProfileView; me: string }) {
  const t = useT();
  const lang = useLang();
  const router = useRouter();
  const [rel, setRel] = useState<Relation>(data.relation);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const [more, setMore] = useState(false);
  const [reporting, setReporting] = useState(false);
  const u = data.user;
  const isSelf = u.userId === me;
  const friends = rel === "friends";

  async function act(fn: () => Promise<unknown>, done: string) {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    try {
      await fn();
      setMsg({ text: done, ok: true });
    } catch (e) {
      setMsg({ text: errorText(e, lang), ok: false });
    } finally {
      setBusy(false);
    }
  }

  async function block() {
    if (!window.confirm(t("user.block_confirm", { name: u.name ?? t("social.this_person") }))) return;
    await act(async () => {
      await social.block(u.userId);
      router.replace("/friends");
    }, t("user.blocked_done"));
  }
  async function report(reason: string) {
    await act(() => social.report(u.userId, reason), t("user.report_done"));
    setReporting(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <section className="card p-5">
        <div className="flex items-start gap-4">
          <Avatar userId={u.userId} name={u.name} size={64} ring={friends ? "var(--color-mint)" : null} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold">{u.name ?? t("social.unnamed")}</h1>
            <p className="muted text-sm">
              @{u.username} · {u.level}
            </p>
            {data.bio ? <p className="mt-2 text-sm leading-snug">{data.bio}</p> : null}
            <p className="muted mt-2 flex flex-wrap gap-x-3 text-[11px]">
              {data.mutual > 0 ? <span>{t("social.mutual", { n: data.mutual })}</span> : null}
              {data.friendStreak > 0 ? (
                <span className="flex items-center gap-0.5" style={{ color: "var(--color-mint)" }}>
                  <HandshakeIcon size={12} /> {t("social.days_together", { n: data.friendStreak })}
                </span>
              ) : null}
              <span>{t("socialw.joined", { date: new Date(data.joined).toLocaleDateString(localeOf(lang), { month: "short", year: "numeric" }) })}</span>
            </p>
          </div>
        </div>
        {!isSelf ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <UserAction userId={u.userId} relation={rel} friendshipId={data.friendshipId} canRequest={data.canRequest} onChange={setRel} />
            {friends ? (
              <>
                <button className="btn btn-ghost h-9 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.nudge(u.userId, "remind"), t("social.nudged_you"))}>
                  {t("user.nudge")}
                </button>
                <button className="btn btn-ghost h-9 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.inviteQuest(u.userId), t("social.quest_sent"))}>
                  <TargetIcon size={14} />
                  <span className="ml-1">{t("socialw.shared_quest")}</span>
                </button>
              </>
            ) : null}
            <button className="muted ml-auto text-[11px]" onClick={() => setMore((m) => !m)} aria-expanded={more}>
              {t("socialw.more")}
            </button>
          </div>
        ) : null}
        {/* Ton mesajın metninden değil kendi alanından: Türkçe sözcük aramak
            çeviriyle birlikte her başarı iletisini kırmızıya çeviriyordu. */}
        {msg ? (
          <p className="mt-2 text-xs" style={{ color: msg.ok ? "var(--color-mint)" : "var(--color-rose)" }}>
            {msg.text}
          </p>
        ) : null}
        {more && !isSelf ? (
          <div className="mt-3 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => void block()}>
              {t("user.block")}
            </button>
            <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => setReporting((r) => !r)}>
              {t("user.report")}
            </button>
            {reporting ? (
              <div className="flex w-full flex-wrap gap-1.5">
                {[
                  ["spam", "user.report_spam"],
                  ["abuse", "user.report_abuse"],
                  ["impersonation", "user.report_fake"],
                  ["other", "report.something_else"],
                ].map(([k, l]) => (
                  <button key={k} className="chip px-3 py-1.5 text-caption" disabled={busy} onClick={() => void report(k)}>
                    {t(l)}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      {data.stats ? (
        <section className="grid grid-cols-3 gap-2">
          <Stat label={t("user.day_streak")} value={data.stats.currentStreak} icon={<FlameIcon size={14} />} tone="var(--color-flame)" />
          <Stat label={t("user.xp_this_week")} value={data.stats.weeklyXp} tone="var(--color-brand)" />
          <Stat label={t("user.total_xp")} value={data.stats.totalXp} tone="var(--color-brand)" />
          <Stat label={t("socialw.stat_longest")} value={data.stats.longestStreak} tone="var(--color-flame)" />
          <Stat label={t("user.badge")} value={data.stats.achievements} icon={<TrophyIcon size={14} />} tone="var(--color-violet)" />
          <Stat label={t("socialw.stat_last_active")} text={data.stats.lastActiveDay ? new Date(`${data.stats.lastActiveDay}T00:00:00`).toLocaleDateString(localeOf(lang), { day: "numeric", month: "short" }) : "—"} tone="var(--text-muted)" />
        </section>
      ) : (
        <section className="card p-4 text-center">
          <p className="muted text-sm">{t(data.visibility === "friends" ? "user.friends_see_stats" : "user.private_profile")}</p>
        </section>
      )}

      {data.recent.length ? (
        <section>
          <h2 className="muted mb-2 px-1 text-xs font-bold uppercase tracking-wide">{t("user.recent_milestones")}</h2>
          <div className="flex flex-col gap-2">
            {data.recent.map((it) => (
              <FeedCard key={it.id} item={friends || isSelf ? it : { ...it, isMine: true }} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Stat({ label, value, text, suffix = "", icon, tone }: { label: string; value?: number; text?: string; suffix?: string; icon?: React.ReactNode; tone: string }) {
  const lang = useLang();
  return (
    <div className="card px-3 py-2.5 text-center">
      <p className="flex items-center justify-center gap-1 text-base font-black tabular-nums" style={{ color: tone }}>
        {icon}
        {text ?? `${formatNumber(value ?? 0, lang)}${suffix}`}
      </p>
      <p className="muted text-[11px]">{label}</p>
    </div>
  );
}
