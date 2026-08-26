"use client";

import { motion } from "framer-motion";

/**
 * Ayar satırı ve anahtarı.
 *
 * Ayarlar ekranındaki her bölüm kendi biçimini uyduruyordu: kimi başlık +
 * iki satır açıklama + tam genişlikte bir düğme, kimi tek satır + sağda iki
 * çip. Aynı ekranda beş farklı ritim vardı ve her biri 130 piksel civarı yer
 * kaplıyordu — dört ayar için yarım ekran.
 *
 * Tek biçim: solda ne olduğu, sağda onu değiştiren şey. Açıklama tek satıra
 * indi; yazıyla söylenmesi ZORUNLU olmayan her şey atıldı, çünkü anahtarı
 * çevirip sonucu görmek anlatmaktan hızlı. Kalan cümleler deneyerek
 * öğrenilemeyecek şeyleri söylüyor: telaffuz sesinin bu anahtardan ayrı
 * olması, günde en fazla kaç bildirim geleceği.
 */
export function SettingRow({
  title,
  sub,
  children,
}: {
  title: string;
  /** Tek satır — deneyerek öğrenilemeyecek şeyi söyler, yoksa hiç yazılmaz. */
  sub?: string;
  /** Sağdaki denetim: anahtar, çip ikilisi ya da düğme. */
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold">{title}</p>
        {sub ? <p className="muted mt-0.5 text-xs leading-snug">{sub}</p> : null}
      </div>
      {children ? <div className="flex shrink-0 items-center gap-1.5">{children}</div> : null}
    </div>
  );
}

/**
 * Aç/kapa anahtarı.
 *
 * Eskiden bunlar "Sesleri kapat" / "Hatırlatmaları aç" yazan tam genişlikte
 * düğmelerdi. İki sorunu vardı: satır kaplıyorlardı ve etiket MEVCUT durumu
 * değil YAPILACAK işi söylediği için, ekrana bakan kişi sesin açık mı kapalı
 * mı olduğunu düğmenin tersini alarak çıkarmak zorundaydı. Anahtar durumu
 * doğrudan gösteriyor.
 */
export function Switch({
  on,
  onChange,
  disabled = false,
  label,
}: {
  on: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
  /** Ekran okuyucu etiketi — satır başlığı görsel, bu ise erişilebilir ad. */
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className="relative h-7 w-12 shrink-0 rounded-full transition-opacity disabled:opacity-50"
      style={{ background: on ? "var(--color-brand-600)" : "var(--surface-2)" }}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 34 }}
        className="absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm"
        style={{ left: on ? 26 : 4 }}
      />
    </button>
  );
}
