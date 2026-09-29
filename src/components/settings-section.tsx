import type { ReactNode } from "react";
import type { SettingsSection } from "@/components/profile-form";

/**
 * Grupların sayfa başlığı (sözlük anahtarı). Tek yerde: sayfa başlığı
 * (`metadata`), formun `PageBack`i ve yükleme iskeleti aynı adı yazıyor.
 */
export const SETTINGS_TITLE: Record<SettingsSection, string> = {
  learning: "settings.group_learning",
  app: "settings.group_app",
  account: "settings.group_account",
  security: "settings.group_security",
  privacy: "settings.group_privacy",
  about: "settings.group_about",
};

/**
 * Ayar sayfasının iki yapı taşı: GRUP (başlık + tek kart) ve SATIR.
 *
 * Eskiden her bölümün kendi kartı vardı ve sayfa alt alta on beş kutuya
 * dönüşmüştü: kart, bölümleri ayırsın diye vardı ama bölüm sayısı artınca
 * ayırmayı bıraktı, yalnız gürültü ekledi. Şimdi kart GRUBU çiziyor, bölümler
 * kartın içinde ince bir çizgiyle ayrılıyor.
 *
 * Satırların bir kısmı koşullu (parolasız hesapta PAROLA satırı hiç yok);
 * ayıraç `divide-y` ile kartın kendisinde durduğu için gizlenen satır ortada
 * asılı bir çizgi bırakmıyor — çizilmeyen çocuk DOM'a hiç girmiyor.
 */
export function Group({
  title,
  id,
  children,
}: {
  /** Bölüm sayfasında başlık sayfanın kendisi; grup ayrıca başlık çizmiyor. */
  /* Düğüm de alıyor: iskelet başlığın yerine görünmez metin çiziyor. */
  title?: ReactNode;
  id?: string;
  children: ReactNode;
}) {
  return (
    /* ÖLÇÜLER ANDROID'İN (`SettingsScreen` `Group`): grubun üst payı
       `spacing.xxl` (28, web'de 32 idi), kart `Card padded` yani her yandan
       16 (web'de yatay 20, dikey 20 idi). Başlık zaten eşti: `h3`, altında 8,
       solda 4. */
    <section id={id} className="mx-auto mt-7 w-full max-w-3xl first:mt-0">
      {title ? <h2 className="mb-2 ml-1 text-h3">{title}</h2> : null}
      <div className="card divide-y divide-[color:var(--hairline)] px-4">{children}</div>
    </section>
  );
}

/** Grup kartının içindeki bir bölüm: küçük etiket ve altında içeriği. */
export function Row({
  label,
  children,
}: {
  label?: ReactNode;
  children: ReactNode;
}) {
  return (
    /* Bölümün dikey payı Android'de `spacing.lg` (16): ayıracın iki yanında
       16 var, webde 20 idi. Etiketin harf aralığı da Android'in 0.5
       pikseli - `tracking-wide` 0.025em, yani 12.5 puntoda 0.31 px. */
    <div className="py-4 first:pt-4 last:pb-4">
      {label ? <p className="muted mb-2 text-caption tracking-[0.5px]">{label}</p> : null}
      {children}
    </div>
  );
}
