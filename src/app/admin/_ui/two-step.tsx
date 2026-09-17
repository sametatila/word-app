"use client";

import { useState } from "react";
import { BTN, DANGER } from "./ui";

/**
 * Geri alınamayan ya da herkesi etkileyen eylem: ilk basış silahı kurar,
 * ikincisi yapar. Sistem onay kutusu yok (parite §255); panelin bütün yıkıcı
 * düğmeleri (bakım, toplu bildirim, premium sıfırlama, ad sıfırlama, yetki
 * kaldırma) bu tek bileşenden geçiyor.
 */
export function TwoStep({ label, confirm, onConfirm, danger = true, disabled = false, small = false }: {
  label: string;
  confirm: string;
  onConfirm: () => void;
  danger?: boolean;
  disabled?: boolean;
  small?: boolean;
}) {
  const [armed, setArmed] = useState(false);
  const cls = small ? BTN.small : BTN.secondary;
  const style = danger ? DANGER : undefined;
  if (!armed) {
    return <button type="button" disabled={disabled} onClick={() => setArmed(true)} className={cls} style={style}>{label}</button>;
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <button type="button" disabled={disabled} onClick={() => { setArmed(false); onConfirm(); }} className={cls} style={danger ? { ...DANGER, background: "color-mix(in srgb, var(--color-rose) 10%, var(--surface))" } : undefined}>
        {confirm}
      </button>
      <button type="button" onClick={() => setArmed(false)} className={cls}>Vazgeç</button>
    </span>
  );
}
