"use client";

import { useEffect, useState } from "react";
import { Avatar } from "@/components/avatar";
import { RowSkeleton } from "@/components/skeleton";
import { errorText, social } from "@/lib/social/client";
import type { FriendRow, QuestView } from "@/lib/social/types";

/**
 * Ortak görevler. Bu haftanın görevi üstte (davet ya da ilerleme çubuğu),
 * geçmiş haftalar altta. Yeni görev arkadaş listesinden başlatılır; burada
 * yalnız "kime" seçilir. Hedef sunucuda hesaplanır — kullanıcı seçmez, çünkü
 * kolay hedef seçen kişi kendi motivasyonunu boşaltır.
 */
export function Quests({ friends, onChanged, me }: { friends: FriendRow[]; onChanged?: () => void; me: string }) {
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
        <div className="card p-5 text-center">
          <p className="font-bold">Bu hafta ortak görev yok</p>
          <p className="muted mt-1 text-sm">Bir arkadaşınla bu hafta birlikte hedef XP topla. Hedef, geçen haftanızın biraz üstü.</p>
          {friends.length ? (
            <button className="btn btn-primary mt-4 h-9 px-4 text-xs" onClick={() => setPick((p) => !p)} disabled={!canStart}>
              Arkadaş seç
            </button>
          ) : (
            <p className="muted mt-3 text-xs">Önce bir arkadaş ekle.</p>
          )}
          {pick ? (
            <ol className="mt-3 divide-y divide-[color:var(--border)] text-left">
              {friends.map((f) => (
                <li key={f.userId} className="flex items-center gap-3 py-2">
                  <Avatar userId={f.userId} name={f.name} size={32} />
                  <span className="min-w-0 flex-1 truncate text-sm font-semibold">{f.name ?? "İsimsiz öğrenci"}</span>
                  <button className="btn btn-primary h-8 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.inviteQuest(f.userId))}>
                    Davet et
                  </button>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      ) : null}
      {err ? <p className="text-center text-xs" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
      {past.length ? (
        <section>
          <h3 className="muted mb-2 px-1 text-xs font-bold uppercase tracking-wide">Geçmiş haftalar</h3>
          <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
            {past.map((q) => (
              <li key={q.id} className="flex items-center gap-3 px-4 py-2.5 text-sm" style={{ borderColor: "var(--border)" }}>
                <Avatar userId={q.partner.userId} name={q.partner.name} size={28} />
                <span className="min-w-0 flex-1 truncate">
                  <span className="font-semibold">{q.partner.name ?? "İsimsiz"}</span> ile {q.targetXp.toLocaleString("tr-TR")} XP
                </span>
                <span className="text-xs font-bold" style={{ color: q.status === "completed" ? "var(--color-mint)" : "var(--text-muted)" }}>
                  {q.status === "completed" ? "Tamamlandı" : `${q.pct}%`}
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
            {invited ? "Ortak görev daveti" : "Bu haftanın ortak görevi"}
          </p>
          <p className="muted text-xs">
            {q.partner.name ?? "Arkadaşın"} ile birlikte {q.targetXp.toLocaleString("tr-TR")} XP · {q.daysLeft === 1 ? "son gün" : `${q.daysLeft} gün kaldı`}
          </p>
        </div>
      </div>
      {invited ? (
        <div className="mt-3 flex gap-2">
          {q.invitedByMe ? (
            <>
              <span className="muted flex-1 self-center text-xs">Cevap bekleniyor</span>
              <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => void onAct(() => social.questAction(q.id, "cancel"))}>
                İptal
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-primary h-8 flex-1 text-xs" disabled={busy} onClick={() => void onAct(() => social.questAction(q.id, "accept"))}>
                Kabul et
              </button>
              <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => void onAct(() => social.questAction(q.id, "decline"))}>
                Reddet
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="mt-3 h-3 w-full overflow-hidden rounded-full" style={{ background: "var(--surface-2)" }} aria-label={`İlerleme yüzde ${q.pct}`}>
            <div className="flex h-full" style={{ width: `${q.pct}%` }}>
              <div style={{ width: `${myShare}%`, background: "var(--color-brand)" }} />
              <div style={{ flex: 1, background: "var(--color-sky)" }} />
            </div>
          </div>
          <p className="muted mt-1.5 flex justify-between text-[11px] tabular-nums">
            <span style={{ color: "var(--color-brand)" }}>Sen {q.myXp.toLocaleString("tr-TR")}</span>
            <span className="font-bold">{q.totalXp.toLocaleString("tr-TR")} / {q.targetXp.toLocaleString("tr-TR")}</span>
            <span style={{ color: "var(--color-sky)" }}>{q.partner.name?.split(" ")[0] ?? "O"} {q.partnerXp.toLocaleString("tr-TR")}</span>
          </p>
          <div className="mt-2 text-right">
            <button className="muted text-[11px]" onClick={() => { if (window.confirm("Görev iptal edilsin mi?")) void onAct(() => social.questAction(q.id, "cancel")); }}>
              Görevi bırak
            </button>
          </div>
        </>
      )}
    </section>
  );
}
