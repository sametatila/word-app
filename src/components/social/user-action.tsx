"use client";

import { useState } from "react";
import { errorText, social } from "@/lib/social/client";
import type { Relation } from "@/lib/social/types";

/**
 * İlişkiye göre tek düğme: Ekle · İstek gönderildi (iptal) · Kabul et ·
 * Arkadaş (çıkar). Durum makinesi sunucuda; burada yalnız görünüm ve
 * iyimser geçiş. Hata metni düğmenin altında, sayfa yenilenmeden.
 */
export function UserAction({
  userId,
  relation,
  friendshipId,
  canRequest = true,
  onChange,
  compact = false,
}: {
  userId: string;
  relation: Relation;
  friendshipId?: number | null;
  canRequest?: boolean;
  onChange?: (next: Relation) => void;
  compact?: boolean;
}) {
  const [state, setState] = useState<Relation>(relation);
  const [fid, setFid] = useState<number | null>(friendshipId ?? null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function run(fn: () => Promise<Relation>) {
    if (busy) return;
    setBusy(true);
    setErr(null);
    try {
      const next = await fn();
      setState(next);
      onChange?.(next);
    } catch (e) {
      setErr(errorText(e));
    } finally {
      setBusy(false);
    }
  }

  const size = compact ? "h-8 px-3 text-xs" : "h-9 px-3.5 text-xs";
  if (state === "self") return null;
  if (state === "blocked") return <span className="muted text-xs">Engelli</span>;

  let button: React.ReactNode;
  if (state === "friends") {
    button = (
      <button
        className={`btn btn-ghost ${size}`}
        disabled={busy}
        onClick={() => {
          if (!window.confirm("Arkadaşlıktan çıkarılsın mı? Bildirim gitmez.")) return;
          void run(async () => {
            await social.remove(userId);
            return "none";
          });
        }}
      >
        Arkadaş
      </button>
    );
  } else if (state === "outgoing") {
    button = (
      <button
        className={`btn btn-ghost ${size}`}
        disabled={busy}
        onClick={() =>
          void run(async () => {
            await social.remove(userId);
            return "none";
          })
        }
      >
        İstek gönderildi
      </button>
    );
  } else if (state === "incoming") {
    button = (
      <button
        className={`btn btn-primary ${size}`}
        disabled={busy}
        onClick={() =>
          void run(async () => {
            if (fid) await social.respond(fid, "accept");
            else await social.request(userId);
            return "friends";
          })
        }
      >
        Kabul et
      </button>
    );
  } else if (state === "declined") {
    button = <span className="muted text-xs">Bir hafta sonra</span>;
  } else {
    button = (
      <button
        className={`btn btn-primary ${size}`}
        disabled={busy || !canRequest}
        title={canRequest ? undefined : "Bu kişi istek kabul etmiyor"}
        onClick={() =>
          void run(async () => {
            const r = await social.request(userId);
            setFid(r.friendshipId);
            return r.state;
          })
        }
      >
        Ekle
      </button>
    );
  }
  return (
    <span className="flex flex-col items-end gap-1">
      {button}
      {err ? <span className="text-[11px]" style={{ color: "var(--color-rose)" }}>{err}</span> : null}
    </span>
  );
}
