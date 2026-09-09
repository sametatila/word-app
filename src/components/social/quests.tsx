"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { EmptyCard } from "@/components/empty-card";
import { TargetIcon } from "@/components/icons";
import { RowSkeleton } from "@/components/skeleton";
import { errorText, social } from "@/lib/social/client";
import type { FriendRow, QuestView } from "@/lib/social/types";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber } from "@/lib/i18n/dict";

/**
 * Ortak görevler. Bu haftanın görevi üstte (davet ya da ilerleme çubuğu),
 * geçmiş haftalar altta. Yeni görev arkadaş listesinden başlatılır; burada
 * yalnız "kime" seçilir. Hedef sunucuda hesaplanır — kullanıcı seçmez, çünkü
 * kolay hedef seçen kişi kendi motivasyonunu boşaltır.
 */
export function Quests({ friends, onChanged, me }: { friends: FriendRow[]; onChanged?: () => void; me: string }) {
  const t = useT();
  const lang = useLang();
  const [quests, setQuests] = useState<QuestView[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [pick, setPick] = useState(false);

  async function load() {
    try {
      const r = await social.quests();
      setQuests(r.quests);
    } catch (e) {
      setErr(errorText(e));
      setQuests([]);
    }
  }
  useEffect(() => {
    void load();
  }, []);

  async function act(fn: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try {
      await fn();
      await load();
      onChanged?.();
      setPick(false);
    } catch (e) {
      setErr(errorText(e));
    } finally {
      setBusy(false);
    }
  }

  if (quests === null) return <RowSkeleton rows={2} height={96} />;
  const current = quests.filter((q) => q.status === "invited" || q.status === "active");
  const past = quests.filter((q) => q.status === "completed" || q.status === "failed");
  const canStart = !current.length && friends.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {current.map((q) => (
        <QuestCard key={q.id} q={q} me={me} busy={busy} onAct={act} />
      ))}
      {!current.length ? (
        <div>
          {/* METİN İKİSİNDEN BİRİ. Web ikisini birden yazıyordu: arkadaşı
              olmayan kullanıcı önce "bir arkadaşınla birlikte hedef XP topla"
              cümlesini, hemen altında da "önce bir arkadaş ekle"yi görüyordu —
              ilk cümle olmayan bir arkadaşı varsayıyor. Android bu ikisinden
              yalnız durumu anlatanı gösteriyor. */}
          <EmptyCard
            icon={TargetIcon}
            title={t("quests.no_shared_quest_this_week")}
            text={t(friends.length ? "quests.empty_with_friends" : "quests.empty_no_friends")}
            action={
              friends.length ? (
                <button className="btn btn-primary h-9 px-4 text-xs" onClick={() => setPick((p) => !p)} disabled={!canStart}>
                  {t(pick ? "common.discard" : "quests.choose_friend")}
                </button>
              ) : undefined
            }
          />
          {pick ? (
            <div className="mt-3">
              <p className="muted mb-1.5 px-1 text-caption font-semibold uppercase tracking-wide">{t("quests.with")}</p>
              <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
                {friends.map((f) => (
                  <li key={f.userId} className="flex items-center gap-3 px-4 py-2.5">
                    <Avatar userId={f.userId} name={f.name} size={32} />
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold">{f.name ?? t("social.unnamed")}</span>
                    <button className="btn btn-primary h-8 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.inviteQuest(f.userId))}>
                      {t("quests.invite")}
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      ) : null}
      {err ? <p className="text-center text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
      {past.length ? (
        <section>
          <h3 className="muted mb-2 px-1 text-xs font-bold uppercase tracking-wide">{t("quests.past_weeks")}</h3>
          <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
            {past.map((q) => (
              <li key={q.id} className="flex items-center gap-3 px-4 py-2.5 text-sm" style={{ borderColor: "var(--border)" }}>
                <Avatar userId={q.partner.userId} name={q.partner.name} size={28} />
                <span className="min-w-0 flex-1 truncate">
                  {t("quests.past_row", { name: q.partner.name ?? t("social.unnamed_short"), xp: formatNumber(q.targetXp, lang) })}
                </span>
                <span className="text-xs font-bold" style={{ color: q.status === "completed" ? "var(--color-mint)" : "var(--text-muted)" }}>
                  {q.status === "completed" ? t("quests.completed") : t("common.pct", { n: q.pct })}
                </span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}

export function QuestCard({ q, me, busy, onAct }: { q: QuestView; me: string; busy: boolean; onAct: (fn: () => Promise<unknown>) => Promise<void> }) {
  const t = useT();
  const lang = useLang();
  const invited = q.status === "invited";
  const myShare = q.totalXp ? Math.round((q.myXp / q.totalXp) * 100) : 0;
  return (
    <section className="card p-4">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          <Avatar userId={me} name={null} size={36} ring="var(--color-brand)" />
          <Avatar userId={q.partner.userId} name={q.partner.name} size={36} ring="var(--color-sky)" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold">
            {t(invited ? "quests.invite_title" : "quests.week_title")}
          </p>
          <p className="muted text-xs">
            {t("quests.with_partner", {
              name: q.partner.name ?? t("social.your_friend"),
              remaining: q.daysLeft === 1 ? t("social.last_day") : t("social.days_left", { n: q.daysLeft }),
            })}{" "}
            · {formatNumber(q.targetXp, lang)} XP
          </p>
        </div>
      </div>
      {invited ? (
        <div className="mt-3 flex gap-2">
          {q.invitedByMe ? (
            <>
              <span className="muted flex-1 self-center text-xs">{t("quests.awaiting_reply")}</span>
              <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => void onAct(() => social.questAction(q.id, "cancel"))}>
                {t("common.cancel")}
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary h-8 flex-1 text-xs" disabled={busy} onClick={() => void onAct(() => social.questAction(q.id, "accept"))}>
                {t("quests.accept")}
              </button>
              <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => void onAct(() => social.questAction(q.id, "decline"))}>
                {t("quests.decline")}
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }} aria-label={t("socialw.progress_pct", { n: q.pct })}>
            <div className="flex h-full" style={{ width: `${q.pct}%` }}>
              <div style={{ width: `${myShare}%`, background: "var(--color-brand)" }} />
              <div style={{ flex: 1, background: "var(--color-sky)" }} />
            </div>
          </div>
          <p className="muted mt-1.5 flex justify-between text-[11px] tabular-nums">
            <span style={{ color: "var(--color-brand)" }}>{t("quests.my_xp", { xp: formatNumber(q.myXp, lang) })}</span>
            <span className="font-bold">
              {formatNumber(q.totalXp, lang)} / {formatNumber(q.targetXp, lang)}
            </span>
            <span style={{ color: "var(--color-sky)" }}>
              {q.partner.name?.split(" ")[0] ?? t("quests.partner_short")} {formatNumber(q.partnerXp, lang)}
            </span>
          </p>
          <div className="mt-2 text-right">
            <button className="muted text-[11px]" onClick={() => { if (window.confirm(t("socialw.cancel_quest_confirm"))) void onAct(() => social.questAction(q.id, "cancel")); }}>
              {t("quests.leave_quest")}
            </button>
          </div>
        </>
      )}
    </section>
  );
}
