"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CheckIcon, MicIcon } from "@/components/icons";
import { LEGAL_PATHS } from "@/lib/legal";
import { useT } from "@/lib/i18n/client";

/**
 * Belirgin açıklama ve rıza — mobil `M/src/ui/MicDisclosure.tsx`in karşılığı.
 *
 * Tarayıcı mikrofon izni "bu site mikrofonu kullanabilir mi" diye soruyor;
 * SESİN NEREYE GİTTİĞİNİ sormuyor. Yürüyüş modunda ses kısa kayıtlar hâlinde
 * sunucuya ve konuşma tanıma sağlayıcılarına gidiyor, yani asıl anlatılması
 * gereken şey sistem diyaloğunun dışında kalıyor. Android bunu izinden ÖNCE
 * anlatıyor (Play "prominent disclosure"); web'de o mağaza kuralı yok ama
 * toplanan veri aynı, dolayısıyla söylenen de aynı olmalı.
 *
 * Onay OLUMLU bir eylemle veriliyor; "Vazgeç" mikrofonu hiç açmıyor. Odak
 * tuzağı, Esc ve arka planın etkisizleşmesi `<dialog>`un işi (bkz.
 * `confirm-dialog`, `report-dialog`).
 */
export function MicDisclosure({
  open,
  onAccept,
  onCancel,
}: {
  open: boolean;
  onAccept: () => void;
  onCancel: () => void;
}) {
  const t = useT();
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  /* Dördüncü madde web'e özel: Android'in metni "sürekli bir bildirimden
     bunu görürsün" diyor ve o bildirim ön plan servisinin kendisi. Web'de
     öyle bir bildirim yok; tutulmayacak bir söz verilmiyor, aynı şey
     tarayıcıda doğru olan biçimiyle yazılıyor. */
  const points = [
    t("micdw.you_start_it"),
    t("micdisclosure.it_keeps_listening_while_screen"),
    t("micdisclosure.while_screen_is_off_what_you_say"),
    t("micdisclosure.audio_is_not_stored_only"),
  ];

  return (
    <dialog
      ref={ref}
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onCancel();
      }}
      className="card m-auto w-[min(30rem,calc(100vw-2rem))] p-5 backdrop:bg-black/55"
      style={{ color: "var(--text)" }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span
          className="flex h-[72px] w-[72px] items-center justify-center rounded-card on-fill shadow-soft"
          style={{ background: "var(--color-brand)" }}
        >
          <MicIcon size={36} />
        </span>
        <h2 className="text-h2">{t("micdisclosure.microphone_and_voice_data")}</h2>
        <p className="muted text-body">{t("micdisclosure.walk_mode_works_with_your_voice")}</p>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
              style={{ background: "var(--brand-soft)", color: "var(--on-brand-soft)" }}
            >
              <CheckIcon size={14} />
            </span>
            <span className="text-body">{p}</span>
          </li>
        ))}
      </ul>

      <Link
        href={LEGAL_PATHS.privacy}
        prefetch={false}
        className="mt-4 block text-center text-strong"
        style={{ color: "var(--color-brand)" }}
      >
        {t("micdisclosure.read_privacy_policy")}
      </Link>

      <button type="button" onClick={onAccept} className="btn btn-primary mt-4 w-full px-5 py-3.5">
        {t("micdisclosure.i_agree_start")}
      </button>
      <button type="button" onClick={onCancel} className="btn btn-ghost mt-2 w-full px-5 py-3">
        {t("common.discard")}
      </button>
    </dialog>
  );
}
