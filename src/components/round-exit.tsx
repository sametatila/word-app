"use client";

import Link from "next/link";
import { XIcon } from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/**
 * Turdan çıkış karosu — Android'in tur başlıklarındaki düğmenin karşılığı.
 *
 * Boss, Meydan Okuma, Günün Turu ve Haftalık Sınav web'de ÇIKIŞI OLMAYAN
 * ekranlardı: tur başlayınca başlıkta hiçbir düğme yoktu ve tek çıkış
 * tarayıcının geri düğmesiydi — ana ekrana eklenmiş uygulamada o da yok.
 * Aynı kapan tur ve deneme sınavında daha önce kapatılmıştı
 * (`session-player`, `mock-exam-player`); bu dördü açık kalmıştı.
 *
 * Ölçüler Android'den (`BossScreen`, `ChallengeScreen`, `DailyScreen`,
 * `WeeklyScreen`): 44x44, `surface-2` zemin, `tile` yarıçap, 22 px `XIcon`,
 * sönük renk. Adı da orada ne ise o (`common.go_back` / `common.back`).
 */
export function RoundExit({
  onExit,
  href,
  labelKey = "common.go_back",
}: {
  /** Geri çağrıyla çıkış (boss, meydan okuma, günün turu). */
  onExit?: () => void;
  /** Bağlantıyla çıkış (haftalık sınav: `onExit` taşımıyor). */
  href?: string;
  labelKey?: "common.go_back" | "common.back" | "walkmode.exit_walk_mode";
}) {
  const t = useT();
  /* Sınıf DEĞİŞKENDEN GELMİYOR, iki dalda da elle yazılı: `check:hit`
     kapısı dokunma hedefini sınıf adından okuyor ve bir değişkene konulan
     sınıf o kapı için ölçülemez oluyor - kapıya kör nokta açmamak için iki
     kopya daha iyi. */
  const stil = { background: "var(--surface-2)", color: "var(--text-muted)" };
  if (href) {
    return (
      <Link
        href={href}
        prefetch={false}
        aria-label={t(labelKey)}
        className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
        style={stil}
      >
        <XIcon size={22} />
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onExit}
      aria-label={t(labelKey)}
      className="pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile"
      style={stil}
    >
      <XIcon size={22} />
    </button>
  );
}
