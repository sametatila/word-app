"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * "Başka türlü oyna" bölümünün döşemesi.
 *
 * Dört mod önce alt alta dört satırdı: solda simge, ortada başlık ve açıklama,
 * sağda küçük bir düğme. Satır düzeninin iki sorunu vardı. Yer: dört satır
 * ekranın neredeyse üçte birini yiyordu. Ulaşım: dokunulabilir olan tek şey
 * sağdaki 90 piksellik düğmeydi — satırın kalan 300 pikseli ölü alandı ve
 * başparmağın rahat ulaştığı yer de tam olarak orası değildi.
 *
 * Döşemede DÖŞEMENİN TAMAMI dokunulabilir ve iki sütuna sığdığı için dört mod
 * iki satır tutuyor. Metin ikiye inmiyor: başlık ve tek satırlık durum kalıyor,
 * çünkü "bugünün turu"nun oynanıp oynanmadığı ya da rekorun kaç olduğu asıl
 * bilgi — döşemeye geçerken atılacak şey açıklama, veri değil.
 *
 * Kendi kartı yok: dördü tek bir bölümün ızgarasında duruyor, yani sayfadaki
 * diğer kartlarla aynı ağırlığı taşımıyorlar.
 */
export function ModeTile({
  icon,
  tone,
  title,
  status,
  onPlay,
  href,
  done = false,
}: {
  icon: ReactNode;
  /** Simgenin rengi — CSS değişkeni. */
  tone: string;
  title: string;
  /** Tek satır: ya durum ya davet. */
  status: string;
  onPlay?: () => void;
  href?: string;
  /** Bugün yapılmış olan mod — kenarlık nane, simge tik. */
  done?: boolean;
}) {
  const inner = (
    <>
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          background: `color-mix(in srgb, ${tone} 16%, transparent)`,
          color: tone,
        }}
      >
        {icon}
      </span>
      <span className="mt-2 block text-sm font-bold leading-tight">{title}</span>
      <span className="muted mt-0.5 block text-xs leading-snug">{status}</span>
    </>
  );

  const className = `option flex min-h-24 flex-col items-start px-3.5 py-3 text-left ${
    done ? "border-[color:var(--color-mint)]" : ""
  }`;

  if (href) {
    return (
      <Link href={href} prefetch={false} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onPlay} className={className}>
      {inner}
    </button>
  );
}

/** Yükleme sırasında döşemenin yeri duruyor — ızgara zıplamasın. */
export function ModeTileSkeleton() {
  return <div className="option min-h-24 animate-pulse" aria-hidden />;
}
