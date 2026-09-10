"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar } from "@/components/avatar";
import { errorText, social, timeAgo, type PendingView } from "@/lib/social/client";
import { useT, useLang } from "@/lib/i18n/client";

/**
 * Bekleyen istekler. `side` verilmezse ikisi de çizilir.
 *
 * Kendi sekmesi VARDI ve o sekme haftanın 361 günü boşta duruyordu: istek
 * gelmesi istisna, sekme ise kalıcı. Artık gelen istekler arkadaş listesinin
 * başında, giden istekler "Bul" ekranının altında — yani her biri ait olduğu
 * işin yanında. Boşken hiçbir şey çizilmiyor.
 */
export function Requests({
  incoming,
  outgoing,
  onChanged,
  side,
}: {
  incoming: PendingView[];
  outgoing: PendingView[];
  onChanged: () => void;
  side?: "incoming" | "outgoing";
}) {
  const t = useT();
  const showIn = side !== "outgoing" && incoming.length > 0;
  const showOut = side !== "incoming" && outgoing.length > 0;
  if (!showIn && !showOut) return null;
  return (
    <div className="flex flex-col gap-4">
      {showIn ? (
        <section>
          {/* Sayı başlıkta: Android `SectionTitle` sağ tarafta kaç istek
              olduğunu yazıyor ve listeye bakmadan bilinmesi gereken tek şey o. */}
          <div className="mb-2 flex items-baseline justify-between px-1">
            <h3 className="muted text-xs font-bold uppercase tracking-wide">{t("requests.incoming")}</h3>
            <span className="muted text-xs font-bold tabular-nums">{incoming.length}</span>
          </div>
          <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
            {incoming.map((r) => (
              <RequestRow key={r.friendshipId} r={r} incoming onChanged={onChanged} />
            ))}
          </ol>
        </section>
      ) : null}
      {showOut ? (
        <section>
          {/* Sayı başlıkta: Android `SectionTitle` sağ tarafta kaç istek
              olduğunu yazıyor ve listeye bakmadan bilinmesi gereken tek şey o. */}
          <div className="mb-2 flex items-baseline justify-between px-1">
            <h3 className="muted text-xs font-bold uppercase tracking-wide">{t("requests.sent")}</h3>
            <span className="muted text-xs font-bold tabular-nums">{outgoing.length}</span>
          </div>
          <ol className="card divide-y divide-[color:var(--border)] overflow-hidden">
            {outgoing.map((r) => (
              <RequestRow key={r.friendshipId} r={r} incoming={false} onChanged={onChanged} />
            ))}
          </ol>
        </section>
      ) : null}
    </div>
  );
}

function RequestRow({ r, incoming, onChanged }: { r: PendingView; incoming: boolean; onChanged: () => void }) {
  const t = useT();
  const lang = useLang();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function act(fn: () => Promise<unknown>) {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try {
      await fn();
      onChanged();
    } catch (e) {
      setErr(errorText(e));
      setBusy(false);
    }
  }
  const href = r.user.username ? `/u/${r.user.username}` : null;
  const name = r.user.name ?? t("social.unnamed");
  return (
    <li className="flex items-center gap-3 px-4 py-3" style={{ borderColor: "var(--border)" }}>
      {/* Profile giden tek yol AVATAR — akış kartının kuralı (`feed.tsx`) ve
          Android'in kuralı da o. Bağlantı addaydı: aynı uygulamanın iki
          listesinde aynı iş iki ayrı yerden yapılıyordu ve adın altı çizili
          hâli, adın kendisinin bir düğme olduğunu söylemiyordu. Bağlantının
          erişilebilir adı kişinin adı. */}
      {href ? (
        <Link href={href} prefetch={false} aria-label={name} className="shrink-0">
          <Avatar userId={r.user.userId} name={r.user.name} size={40} />
        </Link>
      ) : (
        <Avatar userId={r.user.userId} name={r.user.name} size={40} />
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">
          {name}
          {r.user.username ? <span className="muted ml-1.5 text-xs font-normal">@{r.user.username}</span> : null}
        </p>
        <p className="muted text-[11px]">
          {r.user.level} · {timeAgo(r.createdAt, lang)}
        </p>
        {err ? <p className="text-[11px]" style={{ color: "var(--color-rose)" }}>{err}</p> : null}
      </div>
      {incoming ? (
        <div className="flex shrink-0 gap-1.5">
          <button className="btn btn-primary h-8 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.respond(r.friendshipId, "accept"))}>
            {t("requests.accept")}
          </button>
          <button className="btn btn-ghost h-8 px-3 text-xs" disabled={busy} onClick={() => void act(() => social.respond(r.friendshipId, "decline"))}>
            {t("requests.decline")}
          </button>
        </div>
      ) : (
        /* Etiket "Vazgeç" idi ve gönderilmiş istekler listesinde neyden
           vazgeçildiğini söylemiyordu. Android aynı düğmeye "İsteği iptal et"
           diyor; anahtar taban sözlükte hazırdı. */
        <button className="btn btn-ghost h-8 shrink-0 whitespace-nowrap px-3 text-xs" disabled={busy} onClick={() => void act(() => social.remove(r.user.userId))}>
          {t("requests.cancel_request")}
        </button>
      )}
    </li>
  );
}
