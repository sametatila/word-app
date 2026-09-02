"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/avatar";
import { FlameIcon, HandshakeIcon, TargetIcon, TrophyIcon } from "@/components/icons";
import { errorText, social, type PublicProfileView } from "@/lib/social/client";
import type { Relation } from "@/lib/social/types";
import { FeedCard } from "./feed";
import { UserAction } from "./user-action";

/**
 * Herkese açık profil. Sunucu görünürlüğü uygulayıp kırpılmış veriyi verir;
 * burada yalnız düzen ve eylemler. Engelle/şikayet küçük ve altta — nadir
 * ama bulunabilir. Şikayet sebebi kapalı liste, serbest metin isteğe bağlı.
 */
export function PublicProfile({ data, me }: { data: PublicProfileView; me: string }) {
  const router = useRouter();
  const [rel, setRel] = useState<Relation>(data.relation);
  const [msg, setMsg] = useState<string | null>(null);
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
      setMsg(done);
    } catch (e) {
      setMsg(errorText(e));
    } finally {
      setBusy(false);
    }
  }

  async function block() {
    if (!window.confirm(`${u.name ?? "Bu kişi"} engellensin mi? Arkadaşlık ve görevler silinir; kendisine bildirim gitmez.`)) return;
    await act(async () => {
      await social.block(u.userId);
      router.replace("/friends");
    }, "Engellendi");
  }
  async function report(reason: string) {
    await act(() => social.report(u.userId, reason), "Şikayet alındı");
    setReporting(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-3">
      <section className="card p-5">
        <div className="flex items-start gap-4">
          <Avatar userId={u.userId} name={u.name} size={64} ring={friends ? "var(--color-mint)" : null} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold">{u.name ?? "İsimsiz öğrenci"}</h1>
            <p className="muted text-sm">
              @{u.username} · {u.level}
            </p>
            {data.bio ? <p className="mt-2 text-sm leading-snug">{data.bio}</p> : null}
            <p className="muted mt-2 flex flex-wrap gap-x-3 text-[11px]">
              {data.mutual > 0 ? <span>{data.mutual} ortak arkadaş</span> : null}
              {data.friendStreak > 0 ? (
                <span className="flex items-center gap-0.5" style={{ color: "var(--color-mint)" }}>
                  <HandshakeIcon size={12} /> {data.friendStreak} gün birlikte
                </span>
              ) : null}
              <span>Katılım {new Date(data.joined).toLocaleDateString("tr-TR", { month: "short", year: "numeric" })}</span>
            </p>
          </div>
        </div>
        {!isSelf ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <UserAction userId={u.userId} relation={rel} friendshipId={data.friendshipId} canRequest={data.canRequest} onChange={setRel} />
            {friends ? (
              <>
                <button className="btn btn-ghost h-9 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.nudge(u.userId, "remind"), "Dürttün")}>
                  Dürt
                </button>
                <button className="btn btn-ghost h-9 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.inviteQuest(u.userId), "Görev daveti gitti")}>
                  <TargetIcon size={14} />
                  <span className="ml-1">Ortak görev</span>
                </button>
              </>
            ) : null}
            <button className="muted ml-auto text-[11px]" onClick={() => setMore((m) => !m)} aria-expanded={more}>
              Daha fazla
            </button>
          </div>
        ) : null}
        {msg ? <p className="mt-2 text-xs" style={{ color: msg.includes("gitti") || msg === "Dürttün" || msg.includes("alındı") ? "var(--color-mint)" : "var(--color-rose)" }}>{msg}</p> : null}
        {more && !isSelf ? (
          <div className="mt-3 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: "var(--border)" }}>
            <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => void block()}>
              Engelle
            </button>
            <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => setReporting((r) => !r)}>
              Şikayet et
            </button>
            {reporting ? (
              <div className="flex w-full flex-wrap gap-1.5">
                {[
                  ["spam", "Spam"],
                  ["abuse", "Taciz"],
                  ["impersonation", "Sahte hesap"],
                  ["other", "Başka"],
                ].map(([k, l]) => (
                  <button key={k} className="chip text-xs" disabled={busy} onClick={() => void report(k)}>
                    {l}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      {data.stats ? (
        <section className="grid grid-cols-3 gap-2">
          <Stat label="Seri" value={data.stats.currentStreak} icon={<FlameIcon size={14} />} tone="var(--color-flame)" />
          <Stat label="Bu hafta" value={data.stats.weeklyXp} suffix=" XP" tone="var(--color-brand)" />
          <Stat label="Toplam" value={data.stats.totalXp} suffix=" XP" tone="var(--color-brand)" />
          <Stat label="En uzun seri" value={data.stats.longestStreak} tone="var(--color-flame)" />
          <Stat label="Rozet" value={data.stats.achievements} icon={<TrophyIcon size={14} />} tone="var(--color-violet)" />
          <Stat label="Son aktif" text={data.stats.lastActiveDay ? new Date(`${data.stats.lastActiveDay}T00:00:00`).toLocaleDateString("tr-TR", { day: "numeric", month: "short" }) : "—"} tone="var(--text-muted)" />
        </section>
      ) : (
        <section className="card p-4 text-center">
          <p className="muted text-sm">{data.visibility === "friends" ? "İstatistikler yalnız arkadaşlarına açık." : "Bu profil gizli."}</p>
        </section>
      )}

      {data.recent.length ? (
        <section>
          <h2 className="muted mb-2 px-1 text-xs font-bold uppercase tracking-wide">Son kilometre taşları</h2>
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
  return (
    <div className="card px-3 py-2.5 text-center">
      <p className="flex items-center justify-center gap-1 text-base font-black tabular-nums" style={{ color: tone }}>
        {icon}
        {text ?? `${(value ?? 0).toLocaleString("tr-TR")}${suffix}`}
      </p>
      <p className="muted text-[11px]">{label}</p>
    </div>
  );
}
