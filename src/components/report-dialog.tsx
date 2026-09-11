"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@/components/icons";
import { reasonsFor, sendReport, type ReportKind, type ReportReason } from "@/lib/report";
import { useT, useLang } from "@/lib/i18n/client";

/**
 * İçerik bildirme kartı — mobil `M/src/ui/ReportSheet.tsx`in karşılığı.
 *
 * `<dialog>` üstünde: odak tuzağı, Esc ve arka planın etkisizleşmesi
 * tarayıcının işi (bkz. `confirm-dialog`).
 *
 * GÖNDERDİKTEN SONRA KENDİ KAPANMIYOR, önce teşekkür ediyor. Bildirim bir
 * yaptırım değil bir kayıt; kullanıcının merak ettiği tek şey "gitti mi".
 * Kart hemen kapansaydı cevap yalnızca yokluk olurdu.
 */
export function ReportDialog({
  open,
  kind,
  refId,
  content,
  onClose,
}: {
  open: boolean;
  kind: ReportKind;
  /** Bildirilen şeyin kimliği: ders kimliği, yazı kimliği, kullanıcı kimliği. */
  refId: string;
  /** Bildirilen metnin kendisi — panoda okunacak olan bu. */
  content: string;
  onClose: () => void;
}) {
  const t = useT();
  const lang = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    // Her açılışta sıfırdan: bir önceki bildirimin sebebi seçili gelmemeli.
    if (open) {
      setReason(null);
      setState("idle");
    }
  }, [open]);

  async function submit() {
    if (!reason || state === "sending") return;
    setState("sending");
    setState((await sendReport(kind, refId, reason, content)) ? "done" : "error");
  }

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="card m-auto w-[min(27rem,calc(100vw-2rem))] p-5 backdrop:bg-black/55"
      style={{ color: "var(--text)" }}
    >
      {state === "done" ? (
        /* SONUÇ DUYURULUYOR. Diyalog AÇIK kalıyor ve içeriği yerinde
           değişiyor: "Bildirildi" kartı gelince ekran okuyucu hiçbir şey
           söylemiyordu, çünkü ne odak taşınıyor ne de canlı bir bölge var.
           Ekran DEĞİŞSE gerek olmazdı (yeni ekran kendiliğinden okunur) —
           burada değişen şey açık bir kutunun içi. */
        <div role="status" className="flex flex-col items-center gap-2 py-4 text-center">
          <span
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: "color-mix(in srgb, var(--color-mint-500) 14%, transparent)", color: "var(--color-mint)" }}
          >
            <CheckIcon size={26} />
          </span>
          <p className="text-h3">{t("reportsheet.reported")}</p>
          <p className="muted text-caption">{t("reportsheet.thanks_we_ll_look_into_it")}</p>
          <button type="button" onClick={onClose} className="btn btn-ghost mt-2 px-5 py-2.5">
            {t("common.close")}
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-h2">{t("reportsheet.report_this_content")}</h2>
          <p className="muted mt-1 text-caption">{t("reportsheet.if_ai_reply_felt_inappropriate")}</p>

          <ul className="mt-3 space-y-2">
            {reasonsFor(kind, lang).map((r) => {
              const active = reason === r.key;
              return (
                <li key={r.key}>
                  <button
                    type="button"
                    onClick={() => setReason(r.key)}
                    aria-pressed={active}
                    className="pressable w-full rounded-card p-3 text-left"
                    style={{
                      border: `1.5px solid ${active ? "var(--color-brand-500)" : "var(--border)"}`,
                      background: active ? "color-mix(in srgb, var(--color-brand-500) 10%, transparent)" : "var(--surface)",
                    }}
                  >
                    <span className="block text-strong" style={active ? { color: "var(--color-brand)" } : undefined}>
                      {r.label}
                    </span>
                    <span className="muted block text-caption">{r.sub}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          {state === "error" ? (
            <p role="alert" className="mt-2 text-caption" style={{ color: "var(--color-rose)" }}>
              {t("reportsheet.couldn_t_send_try_again")}
            </p>
          ) : null}

          <div className="mt-4 flex gap-3">
            <button type="button" onClick={onClose} className="btn flex-1 py-3" style={{ background: "var(--surface-2)", color: "var(--text)" }}>
              {t("common.discard")}
            </button>
            <button
              type="button"
              onClick={() => void submit()}
              disabled={!reason || state === "sending"}
              className="btn btn-primary flex-1 py-3 disabled:opacity-60"
            >
              {state === "sending" ? "…" : t("common.send")}
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
