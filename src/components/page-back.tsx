"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

/**
 * Alt sekmede olmayan ekranların geri düğmesi.
 *
 * Sekme sayısı üçe indi ve Kelimeler, Profil, Dilbilgisi gibi ekranlar
 * çubuktan çıktı. Çıkarken bir şey unutulmuştu: o ekranlara girildiğinde geri
 * dönmenin yolu kalmıyordu — çubukta karşılığı olmayan bir sayfaya girip
 * cihazın kendi geri hareketini bilmeyen kullanıcı orada sıkışıyordu.
 *
 * Başlık satırının solunda, ekranın adıyla birlikte: dokunma hedefi 40 piksel
 * ve göz zaten oraya bakıyor.
 */
export function PageBack({
  href,
  title,
  subtitle,
  label = "Geri dön",
}: {
  href: string;
  title: string;
  subtitle?: string;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Link
        href={href}
        prefetch={false}
        aria-label={label}
        className="chip flex h-10 w-10 shrink-0 items-center justify-center"
      >
        <ArrowLeftIcon size={18} />
      </Link>
      <div className="min-w-0">
        <h1 className="truncate text-xl font-bold">{title}</h1>
        {subtitle ? <p className="muted truncate text-xs font-semibold">{subtitle}</p> : null}
      </div>
    </div>
  );
}
