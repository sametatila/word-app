"use client";

import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons";

/** Yalnız düğme — kendi başlığını çizen ekranlar için. */
export function BackButton({ fallback, label = "Geri dön" }: { fallback: string; label?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) router.back();
        else router.push(fallback);
      }}
      aria-label={label}
      className="chip flex h-10 w-10 shrink-0 items-center justify-center"
    >
      <ArrowLeftIcon size={18} />
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
  label = "Geri dön",
  children,
}: {
  /** Geçmiş boşsa gidilecek yer. */
  fallback: string;
  title: string;
  subtitle?: string;
  label?: string;
  /** Başlığın sağına giren denetim — arama, eylem. */
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => {
          if (typeof window !== "undefined" && window.history.length > 1) router.back();
          else router.push(fallback);
        }}
        aria-label={label}
        className="chip flex h-10 w-10 shrink-0 items-center justify-center"
      >
        <ArrowLeftIcon size={18} />
      </button>
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-xl font-bold">{title}</h1>
        {subtitle ? <p className="muted truncate text-xs font-semibold">{subtitle}</p> : null}
      </div>
      {children}
    </div>
  );
}
