import type { ReactNode } from "react";

/**
 * KUTU İÇİ YERLEŞİM KURALI (2026-09-30, Samet: ayar kutularında boşluklar
 * dağınıktı). Web px = mobil dp; mobil aynası `mobile/src/ui/Field.tsx`.
 *
 * - Kutu (ayar grubu kartı): her yandan 16. Web'de kartın `px-4`ü + `Row`un
 *   `py-4`ü, mobilde `Card padded`. Bölümler arası ayıracın iki yanı 16.
 * - Etiket → denetim: 8. Denetim → yardım/hata satırı: 8.
 * - Art arda alan blokları (ve blok → düğme satırı): 12.
 * - Kutu içi liste (anahtar, bağlı hesap, oturum satırları): satırın dikey
 *   payı 12, yatay payı YOK (kutunun 16'sı yetiyor); ilk satırın üstü ve son
 *   satırın altı 0 (bölümün 16'sı ya da etiketin 8'i zaten orada), satırlar
 *   arası ince çizginin iki yanı 12.
 *
 * Neden: satırlar kendi `px-4 py-3`ünü taşıyordu ve kutunun payının üstüne
 * biniyordu (kenarda 32, üstte 28), alan altı yardım satırı ise kutuya
 * yapışıktı (0-4). Sayılar artık tek yerde; bileşenler kendi payını yazmıyor.
 */

/** Tek alan bloğu: isteğe bağlı etiket, denetim, altında yardım ya da hata. */
export function Field({
  label,
  help,
  error,
  errorId,
  children,
  className = "",
}: {
  /** Bölümün `Row` etiketi varsa verilmez (aynı ad iki kez yazılmasın). */
  label?: ReactNode;
  help?: ReactNode;
  error?: ReactNode;
  /** Denetimin `aria-describedby`ı buna bağlanıyor. */
  errorId?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <span className="muted mb-2 block text-caption">{label}</span> : null}
      {children}
      {help ? <p className="muted mt-2 text-caption leading-snug">{help}</p> : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-2 text-caption" style={{ color: "var(--color-rose)" }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Kutu içi liste: çocuklar arasında ince çizgi, payları kuraldaki gibi
 * (`globals.css` `.inset-list`). `SettingRow` kendi `px-4 py-3`ünü kartsız
 * listelerde (Hatırlatmalar) koruyor; bu kabın içinde o pay kalkıyor.
 */
export function InsetList({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`inset-list ${className}`}>{children}</div>;
}
