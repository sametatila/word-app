"use client";

import { useEffect, useState } from "react";
import { onFx, type FxKind } from "@/lib/fx";

type Pulse = { key: number; kind: FxKind; ms: number };

/**
 * Cevap verildiği an başlayan ince geçiş çizgisi.
 *
 * Oyunlar doğru/yanlış geri bildirimini göstermek için bir süre bekliyor;
 * o boşlukta ekran hareketsiz kalınca kullanıcı "seçimim gitti mi?" diye
 * tereddüt ediyor. Bu çizgi, bekleme süresi boyunca dolarak sıradaki tura
 * geçildiğini sessizce haber verir.
 */
export function AnswerPulse() {
  const [pulse, setPulse] = useState<Pulse | null>(null);

  useEffect(
    () =>
      onFx((detail) => {
        if (detail.kind === "tap" || detail.ms <= 0) return;
        setPulse({ key: Date.now(), kind: detail.kind, ms: detail.ms });
      }),
    [],
  );

  useEffect(() => {
    if (!pulse) return;
    const t = setTimeout(() => setPulse(null), pulse.ms + 120);
    return () => clearTimeout(t);
  }, [pulse]);

  const tone =
    pulse?.kind === "wrong" ? "var(--color-rose)" : "var(--color-mint)";

  return (
    <div aria-hidden className="pointer-events-none relative h-0.5 w-full overflow-hidden rounded-full">
      {pulse ? (
        <span
          key={pulse.key}
          className="absolute inset-y-0 left-0 block rounded-full"
          style={{
            background: tone,
            width: "100%",
            transformOrigin: "left center",
            animation: `pulse-fill ${pulse.ms}ms linear forwards`,
          }}
        />
      ) : null}
    </div>
  );
}
