"use client";

import { useEffect, useRef, useState, useId } from "react";
import { CorrectIcon } from "@/components/icons";
import { useCourse } from "@/components/app-shell";
import {
  reasonsFor,
  sendReport,
  REPORT_DETAIL_MAX,
  type ReportKind,
  type ReportReason,
  type ReportSurface,
  type ReportTarget,
} from "@/lib/report";
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
 *
 * İÇERİK TÜRÜ (`kind="content"`): öğrenme içeriğindeki sorun (kelime, soru,
 * sınav maddesi). Sebep listesi ayrı (cevap anahtarı, yazım, çeviri, ses, …),
 * isteğe bağlı bir ayrıntı alanı var ve gövde yapısal hedef + yüzey + bağlam
 * taşıyor (`docs/plan/content-feedback.md`). Aynı hedef 24 saat içinde ikinci
 * kez bildirilirse sunucu `duplicate` diyor ve teşekkür yerine
 * `report.already` görünüyor.
 */
export function ReportDialog({
  open,
  kind,
  refId,
  content,
  surface,
  target,
  onClose,
}: {
  open: boolean;
  kind: ReportKind;
  /** Bildirilen şeyin kimliği: konuşma kimliği, yazı kimliği, kullanıcı kimliği. */
  refId: string;
  /** Bildirilen metnin kendisi — panoda okunacak olan bu. */
  content: string;
  /** Yalnız `content` türünde: bildirimin geldiği ekran. */
  surface?: ReportSurface;
  /** Yalnız `content` türünde: bildirilen öğenin kalıcı kimliği. */
  target?: ReportTarget;
  onClose: () => void;
}) {
  const t = useT();
  const lang = useLang();
  const course = useCourse();
  const isContent = kind === "content";
  /* DİYALOĞUN ADI. `<dialog>` açıldığında ekran okuyucu "diyalog" diyor ama
     ADINI söylemiyordu: kutunun ne sorduğu yalnız içeriği okunmaya
     başlayınca anlaşılıyordu. Başlık zaten ekranda; `aria-labelledby` onu
     kutunun adı yapıyor. Mobil karşılığı `accessibilityRole="alert"` +
     etiket (bkz. `ui/ConfirmDialog`). */
  const basligId = useId();
  const ref = useRef<HTMLDialogElement>(null);
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [detail, setDetail] = useState("");
  const [duplicate, setDuplicate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    // Her açılışta sıfırdan: bir önceki bildirimin sebebi seçili gelmemeli.
    if (open) {
      setReason(null);
      setState("idle");
      setDetail("");
      setDuplicate(false);
    }
  }, [open]);

  async function submit() {
    if (!reason || state === "sending") return;
    setState("sending");
    const res = await sendReport(
      kind,
      refId,
      reason,
      content,
      isContent ? { surface, target, detail, context: { course, nativeLang: lang } } : undefined,
    );
    setDuplicate(res === "duplicate");
    setState(res === "error" ? "error" : "done");
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby={basligId}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="card m-auto w-[min(27.5rem,calc(100vw-2rem))] p-5 backdrop:bg-black/55"
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
            <CorrectIcon size={26} />
          </span>
          <p className="text-h3">{t("reportsheet.reported")}</p>
          <p className="muted text-caption">{t(duplicate ? "report.already" : "reportsheet.thanks_we_ll_look_into_it")}</p>
          <button type="button" onClick={onClose} className="btn btn-ghost mt-2 px-5 py-2.5">
            {t("common.close")}
          </button>
        </div>
      ) : (
        <>
          <h2 id={basligId} className="text-h2">{t(isContent ? "reportsheet.content_title" : "reportsheet.report_this_content")}</h2>
          <p className="muted mt-1 text-caption">{t(isContent ? "reportsheet.content_lead" : "reportsheet.if_ai_reply_felt_inappropriate")}</p>

          {/* TEK SEÇİMLİK LİSTE RADYO GRUBUDUR. `aria-pressed` bir AÇ/KAPA
              düğmesi anlatıyor: ekran okuyucu "düğme, basılı" diyor ve
              kullanıcı ne kaç sebep olduğunu ne de birini seçmenin ötekini
              bıraktığını öğreniyor. Android aynı listeyi
              `accessibilityRole="radio"` ile veriyor (`ui/ReportSheet`) ve
              TalkBack "radyo düğmesi, 4 ögeden 2., seçili" diyor. Sarmalayan
              `<li>` gruba ait olmadığı için `role="none"`. */}
          <ul role="radiogroup" aria-labelledby={basligId} className="mt-3 space-y-2">
            {reasonsFor(kind, lang).map((r) => {
              const active = reason === r.key;
              return (
                <li key={r.key} role="none">
                  <button
                    type="button"
                    onClick={() => setReason(r.key)}
                    role="radio"
                    aria-checked={active}
                    /* HALKA DA VAR, YALNIZ RENK DEĞİL. Android aynı listede
                       satırın sağına gerçek bir radyo halkası çiziyor
                       (`ui/ReportSheet`: 20 piksel kutu, 2 piksel kenarlık,
                       seçiliyken 9 piksellik dolu nokta); web yalnız satırın
                       kenarlığını ve zeminini renklendiriyordu, yani seçim
                       tek kanaldan - RENKTEN - okunuyordu. Zemin de artık
                       ortak jetondan (`--brand-soft`, Android `primarySoft`
                       ile aynı değer). */
                    className="pressable flex w-full items-center gap-3 rounded-card p-3 text-left"
                    style={{
                      border: `1px solid ${active ? "var(--color-brand-500)" : "var(--border)"}`,
                      /* Seçiliyken dolgu yok, turuncu kenar (2026-09-29 Samet: seçim B). */
                      background: "var(--surface)",
                    }}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-strong" style={active ? { color: "var(--color-brand)" } : undefined}>
                        {r.label}
                      </span>
                      {r.sub ? <span className="muted block text-caption">{r.sub}</span> : null}
                    </span>
                    <span
                      aria-hidden
                      className="flex shrink-0 items-center justify-center rounded-full"
                      style={{
                        /* Ölçü mobil `ui/RadioDot` ile aynı: halka 22, nokta 10. */
                        width: 22,
                        height: 22,
                        border: `1.5px solid ${active ? "var(--color-brand)" : "var(--border)"}`,
                      }}
                    >
                      {active ? (
                        <span className="block rounded-full" style={{ width: 10, height: 10, background: "var(--color-brand)" }} />
                      ) : null}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* AYRINTI İSTEĞE BAĞLI ve yalnız içerikte: "cevap anahtarı yanlış"
              tek başına çoğu zaman yetiyor, ama "hangi şık doğruydu" gibi bir
              not panelde işi yarıya indiriyor. Düz metin; sınır sunucuyla aynı. */}
          {isContent ? (
            /* Alan bloğu: etiket → kutu 8 (`components/field.tsx`; 4'tü). */
            <label className="mt-3 block">
              <span className="muted mb-2 block text-caption">{t("reportsheet.detail_label")}</span>
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value.slice(0, REPORT_DETAIL_MAX))}
                maxLength={REPORT_DETAIL_MAX}
                rows={3}
                /* Ayrıntı öğrencinin kendi dilinde, cümle: baş harf büyüsün. */
                autoCapitalize="sentences"
                placeholder={t("reportsheet.detail_placeholder")}
                className="option w-full px-3.5 py-3 text-body leading-relaxed outline-none focus:border-[color:var(--color-brand)]"
              />
            </label>
          ) : null}

          {state === "error" ? (
            <p role="alert" className="mt-2 text-caption" style={{ color: "var(--color-rose)" }}>
              {t("reportsheet.couldn_t_send_try_again")}
            </p>
          ) : null}

          <div className="mt-4 flex gap-3">
            <button type="button" onClick={onClose} className="btn flex-1 py-3.5" style={{ background: "var(--surface-2)", color: "var(--text)" }}>
              {t("common.discard")}
            </button>
            <button
              type="button"
              onClick={() => void submit()}
              disabled={!reason || state === "sending"}
              className="btn btn-primary flex-1 py-3.5 disabled:opacity-60"
            >
              {state === "sending" ? "…" : t(isContent ? "reportsheet.send" : "common.send")}
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}
