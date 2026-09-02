"use client";

import { useState } from "react";
import { errorText, social } from "@/lib/social/client";
import { REACTION_KINDS, REACTION_LABELS, type ReactionKind, type ReactionSummary } from "@/lib/social/types";
import { ReactionGlyph, REACTION_TONE } from "./reaction-icons";

/**
 * Tepki çubuğu: mevcut tepkiler sayılarıyla, "+" ile altı seçenek. Kendi
 * tepkim vurgulu; aynı ikona ikinci dokunuş geri alır. Sohbetin yerine geçen
 * TEK ifade biçimi bu olduğu için altı tür de her zaman erişilebilir.
 */
export function ReactionBar({
  eventId,
  summary,
  disabled = false,
  onChange,
}: {
  eventId: number;
  summary: ReactionSummary;
  /** Kendi olayım ya da arkadaş değil — bakılır, dokunulmaz. */
  disabled?: boolean;
  onChange?: (next: ReactionSummary) => void;
}) {
  const [s, setS] = useState<ReactionSummary>(summary);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function pick(kind: ReactionKind) {
    if (busy || disabled) return;
    setBusy(true);
    setErr(null);
    try {
      const next = s.mine === kind ? await social.unreact(eventId) : await social.react(eventId, kind);
      setS(next);
      onChange?.(next);
      setOpen(false);
    } catch (e) {
      setErr(errorText(e));
    } finally {
      setBusy(false);
    }
  }

  const present = REACTION_KINDS.filter((k) => (s.counts[k] ?? 0) > 0);
  const who = s.names.length ? `${s.names.join(", ")}${s.total > s.names.length ? ` ve ${s.total - s.names.length} kişi` : ""}` : "";

  return (
    <div className="mt-2 flex flex-wrap items-center gap-1.5">
      {present.map((k) => (
        <button
          key={k}
          type="button"
          disabled={disabled || busy}
          onClick={() => void pick(k)}
          className="chip flex h-7 items-center gap-1 px-2 text-xs"
          style={
            s.mine === k
              ? { background: `color-mix(in srgb, ${REACTION_TONE[k]} 18%, transparent)`, color: REACTION_TONE[k], borderColor: REACTION_TONE[k] }
              : undefined
          }
          aria-pressed={s.mine === k}
          aria-label={`${REACTION_LABELS[k]} ${s.counts[k]}`}
        >
          <ReactionGlyph kind={k} size={14} />
          <span className="tabular-nums">{s.counts[k]}</span>
        </button>
      ))}
      {!disabled ? (
        <div className="relative">
          <button
            type="button"
            className="chip h-7 px-2.5 text-xs"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Tepki ver"
            disabled={busy}
          >
            {s.mine ? "Değiştir" : "Tepki ver"}
          </button>
          {open ? (
            <div
              className="card absolute left-0 z-10 mt-1 flex gap-1 p-1.5 shadow-lg"
              role="menu"
              onMouseLeave={() => setOpen(false)}
            >
              {REACTION_KINDS.map((k) => (
                <button
                  key={k}
                  type="button"
                  role="menuitem"
                  title={REACTION_LABELS[k]}
                  aria-label={REACTION_LABELS[k]}
                  onClick={() => void pick(k)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-transform hover:scale-110"
                  style={s.mine === k ? { background: `color-mix(in srgb, ${REACTION_TONE[k]} 18%, transparent)` } : undefined}
                >
                  <ReactionGlyph kind={k} size={20} />
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      {who ? <span className="muted text-[11px]">{who}</span> : null}
      {err ? <span className="text-[11px]" style={{ color: "var(--color-rose)" }}>{err}</span> : null}
    </div>
  );
}
