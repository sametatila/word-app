import type { ReactNode } from "react";
import { CheckIcon } from "@/components/icons";

/**
 * Onay kutusu — mobil `AuthScreen` (cihaza güven) ve `DeleteAccountScreen`
 * (anladım) kutularının web karşılığı: 2 px kenarlık, işaretlenince dolgu +
 * onay işareti. `tone="danger"` geri dönüşü olmayan bir onay için (hesap silme).
 *
 * Gerçek `<input type="checkbox">` kalıyor, yalnız görünüşü siliniyor
 * (`appearance-none`): form, klavye (Space) ve ekran okuyucu tarayıcının.
 */
export function Checkbox({
  checked,
  onChange,
  tone = "primary",
  disabled,
  children,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  tone?: "primary" | "danger";
  disabled?: boolean;
  children: ReactNode;
}) {
  const fill = tone === "danger" ? "var(--color-rose)" : "var(--brand-fill)";
  const ink = tone === "danger" ? "var(--on-fill)" : "var(--on-brand)";
  return (
    <label className={`flex items-start gap-3 text-body ${disabled ? "opacity-60" : "cursor-pointer"}`}>
      <span className="relative flex h-6 w-6 shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer h-full w-full cursor-[inherit] appearance-none rounded-chip border-2 border-[var(--border)] transition-[background-color,border-color,box-shadow] duration-150 checked:border-[var(--cb-fill)] checked:bg-[var(--cb-fill)] focus-visible:border-[var(--color-brand-500)] focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-brand)_18%,transparent)] focus-visible:outline-none"
          style={{ "--cb-fill": fill } as React.CSSProperties}
        />
        <CheckIcon
          size={16}
          className="pointer-events-none absolute inset-0 m-auto opacity-0 peer-checked:opacity-100"
          style={{ color: ink }}
        />
      </span>
      <span className="min-w-0 flex-1">{children}</span>
    </label>
  );
}
