"use client";

import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { ArrowLeftIcon } from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/**
 * Yığın ekranlarının başlık çubuğu — mobil karşılığı her ekranın kendi
 * başındaki satır (`M/src/screens/ProfileScreen.tsx`, `SettingsScreen.tsx`,
 * `WordsScreen.tsx`… hepsi aynı üç parçadan kurulu).
 *
 * Ölçüler oradan: 44×44 kare düğme, `radius tile` (14), `surface-2` zemin ve
 * `h2` başlık. Önceki hali 40×40 çip ve `text-xl` başlıktı; fark küçük
 * görünüyor ama iki uygulamayı yan yana koyunca başlık satırının yüksekliği
 * ve düğmenin ağırlığı tutmuyordu. 44 ayrıca dokunma hedefi alt sınırı.
 */

/** Kare geri düğmesi — kendi başlığını çizen ekranlar için tek başına. */
export function BackButton({ fallback, label }: { fallback: string; label?: string }) {
  const router = useRouter();
  const t = useT();
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) router.back();
        else router.push(fallback);
      }}
      aria-label={label ?? t("common.back")}
      className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
      style={{ background: "var(--surface-2)", color: "var(--text)" }}
    >
      <ArrowLeftIcon size={24} />
    </button>
  );
}

/**
 * Alt sekmede olmayan ekranların geri düğmesi.
 *
 * Geri, GELİNEN yere döner — sabit bir adrese değil. İlk sürümde her düğme
 * `/learn`e gidiyordu ve bu, geri olmayan bir şeyi geri gibi göstermekti:
 * profilden Ayarlar'a giren kullanıcı geri deyince profile değil ana ekrana
 * düşüyor, sonra profili yeniden açıyordu. Kelimeler'e tur özetinden gelen
 * biri için de aynı — özete dönmek isterken tura dönüyordu.
 *
 * `fallback` yalnızca gerçekten dönülecek yer YOKKEN kullanılıyor: bağlantı
 * dışarıdan paylaşıldığında ya da sayfa doğrudan açıldığında. Ölçüsü tarayıcı
 * geçmişinin uzunluğu; tek girişlik bir geçmişte `back()` uygulamadan çıkardı.
 */
export function PageBack({
  fallback,
  title,
  subtitle,
  label,
  children,
}: {
  /** Geçmiş boşsa gidilecek yer. */
  fallback: string;
  title: string;
  subtitle?: string;
  label?: string;
  /** Başlığın sağına giren denetim — arama, eylem, ayar düğmesi. */
  children?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <BackButton fallback={fallback} label={label} />
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-h2">{title}</h1>
        {subtitle ? <p className="muted truncate text-caption">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}

/**
 * Başlığın sağındaki kare eylem — geri düğmesiyle aynı ölçüde.
 *
 * Mobilde Profil'in sağ üstünde Ayarlar dişlisi bu ölçüde duruyor; simetri
 * kasıtlı, iki uçtaki düğme başlığı ortalar.
 */
export function HeaderAction({
  children,
  ...rest
}: React.ComponentPropsWithoutRef<"button"> & { children: ReactNode }) {
  return (
    <button
      type="button"
      className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
      style={{ background: "var(--surface-2)", color: "var(--text)" }}
      {...rest}
    >
      {children}
    </button>
  );
}
