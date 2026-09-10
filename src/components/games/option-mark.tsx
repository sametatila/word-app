"use client";

import { CheckIcon, XIcon } from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/**
 * Şıkkın sonucu — simge + EKRAN OKUYUCUYA metin.
 *
 * Şıkkın doğru mu yanlış mı olduğu yedi oyunun beşinde yalnız RENKLE
 * anlatılıyordu; ikisinde simge vardı ama simgenin erişilebilir adı yoktu
 * (`icons.tsx` `aria-hidden` veriyor). Yani cevabını verdikten sonra
 * şıklara dönen ekran okuyucu kullanıcısı hangisinin doğru olduğunu hiçbir
 * yoldan öğrenemiyordu — sonuç şeridi (`round-sheet`) hükmü söylüyor ama
 * hangi ŞIKKIN doğru olduğunu söylemiyor.
 *
 * Android'de bu iş tek bir paylaşılan düğmede çözülü (`game/rounds`
 * `OptionButton`): her oyunda hem simge hem `accessibilityHint` var. Webde
 * ortak bir düğme yok, o yüzden ortak olan bu işaret.
 */
export function OptionMark({ state }: { state: "correct" | "wrong" | null }) {
  const t = useT();
  if (!state) return null;
  const label = t(state === "correct" ? "rounds.a11y_correct" : "rounds.a11y_wrong");
  const Icon = state === "correct" ? CheckIcon : XIcon;
  return (
    <Icon
      size={18}
      role="img"
      aria-hidden={false}
      aria-label={label}
      className={`shrink-0 ${state === "correct" ? "text-[color:var(--color-mint)]" : "text-[color:var(--color-rose)]"}`}
    />
  );
}
