"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/avatar";
import { AlertIcon, FlameIcon, HandshakeIcon, TargetIcon } from "@/components/icons";
import { errorText, social } from "@/lib/social/client";
import type { FriendRow } from "@/lib/social/types";
import { useT, useLang } from "@/lib/i18n/client";
import { formatNumber } from "@/lib/i18n/dict";

/**
 * Arkadaş satırı: kimlik + bu haftaki emeği + ortak seri + iki eylem
 * (dürt, ortak görev). Çıkarma menüde değil, satırın sonunda küçük — az
 * kullanılır ama saklanmaz. Dürtme günde bir: düğme gönderilince kapanır,
 * 429 beklenmez.
 *
 * DÜRTMENİN TÜRÜ duruma göre: arkadaş bugün çalıştıysa "alkışla" (cheer),
 * çalışmadıysa "hatırlat" (remind). İki tür de sunucuda vardı ama arayüz
 * yalnız birini gönderiyordu — "aferin" demenin yolu yoktu, oysa tebrik
 * hatırlatmadan daha çok geri getiriyor.
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
  const t = useT();
  const lang = useLang();
  const [sent, setSent] = useState(nudged);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [busy, setBusy] = useState(false);

  const cheer = f.friendActiveToday;

  async function nudge() {
    if (busy || sent) return;
    setBusy(true);
    setMsg(null);
    try {
      await social.nudge(f.userId, cheer ? "cheer" : "remind");
      setSent(true);
      setMsg({ text: t(cheer ? "social.cheered_you" : "social.nudged_you"), ok: true });
    } catch (e) {
      setMsg({ text: errorText(e, lang), ok: false });
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
      setMsg({ text: t("social.quest_sent"), ok: true });
      onChanged();
    } catch (e) {
      setMsg({ text: errorText(e, lang), ok: false });
    } finally {
      setBusy(false);
    }
  }
  async function remove() {
    if (!window.confirm(`${f.name ?? t("social.this_person")} arkadaşlıktan çıkarılsın mı? Bildirim gitmez.`)) return;
    try {
      await social.remove(f.userId);
      onChanged();
    } catch (e) {
      setMsg({ text: errorText(e, lang), ok: false });
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
          {href ? <Link href={href} prefetch={false}>{f.name ?? t("social.unnamed")}</Link> : (f.name ?? t("social.unnamed"))}
          {f.username ? <span className="muted ml-1.5 text-xs font-normal">@{f.username}</span> : null}
        </p>
        <p className="muted mt-0.5 flex flex-wrap items-center gap-x-3 text-[11px]">
          <span className="font-semibold" style={{ color: "var(--color-brand)" }}>
            {t("social.xp_this_week", { xp: formatNumber(f.weeklyXp, lang) })}
          </span>
          {f.currentStreak > 0 ? (
            <span className="flex items-center gap-0.5" style={{ color: "var(--color-flame)" }}>
              <FlameIcon size={12} />
              {f.currentStreak}
            </span>
          ) : null}
          {f.friendStreak > 0 ? (
            <span
              className="flex items-center gap-0.5"
              style={{ color: f.streakAtRisk ? "var(--color-flame)" : "var(--color-mint)" }}
              title={t(f.streakAtRisk ? "socialw.costreak_risk_hint" : "socialw.costreak_hint")}
            >
              <HandshakeIcon size={12} />
              {t("social.days_together", { n: f.friendStreak })}
            </span>
          ) : null}
          <span>{f.level}</span>
        </p>
        {/* Aciliyet BİR satır: zincir bugün kırılıyorsa yaz, kırılmıyorsa
            hiçbir şey yazma. Her gün duran bir uyarı uyarı olmaktan çıkar. */}
        {f.streakAtRisk ? (
          <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold" style={{ color: "var(--color-flame)" }}>
            <AlertIcon size={12} />
            {t("social.costreak_risk")}
          </p>
        ) : null}
        {/* Ton mesajın METNİNDEN değil kendi alanından okunuyor: metni Türkçe
            sözcüklere göre sınamak çeviriyle birlikte bozuluyordu. */}
        {msg ? (
          <p className="mt-1 text-[11px]" style={{ color: msg.ok ? "var(--color-mint)" : "var(--color-rose)" }}>
            {msg.text}
          </p>
        ) : null}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button
          className="btn btn-ghost h-8 px-2.5 text-xs"
          disabled={busy || sent}
          onClick={() => void nudge()}
          title={t(cheer ? "socialw.cheer_hint" : "socialw.nudge_hint")}
        >
          {t(sent ? (cheer ? "socialw.cheered" : "socialw.nudged") : cheer ? "socialw.cheer" : "user.nudge")}
        </button>
        <button className="btn btn-ghost h-8 px-2 text-xs" disabled={busy} onClick={() => void quest()} title={t("socialw.quest_hint")} aria-label={t("quests.invite_title")}>
          <TargetIcon size={15} />
        </button>
        <button className="muted h-8 px-1.5 text-[11px]" onClick={() => void remove()} aria-label={t("social.unfriend")}>
          {t("social.remove")}
        </button>
      </div>
    </li>
  );
}
