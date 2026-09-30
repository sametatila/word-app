"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { BackIcon, CloseIcon } from "@/components/icons";
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
 * `WeeklyScreen`): 44x44, `surface-2` zemin, `tile` yarıçap, 22 px `CloseIcon`,
 * sönük renk. Adı da orada ne ise o (`common.go_back` / `common.back`).
 */
export function RoundExit({
  onExit,
  href,
  labelKey = "common.go_back",
  glyph = "close",
}: {
  /** Geri çağrıyla çıkış (boss, meydan okuma, günün turu). */
  onExit?: () => void;
  /** Bağlantıyla çıkış (haftalık sınav: `onExit` taşımıyor). */
  href?: string;
  labelKey?:
    | "common.go_back"
    | "common.back"
    | "walkmode.exit_walk_mode"
    | "exam.quit_title"
    | "plc.quit_title"
    | "mockexam.quit_title"
    | "game.quit_round"
    | "common.close";
  /**
   * Simge: `close` çarpı (22 px), `back` geri oku (24 px).
   *
   * Ayrım Android'den: bir ekranı KAPATAN düğme çarpı taşıyor
   * (`ExamScreen`, `GameScreen`, `PlacementScreen`, `WalkModeScreen`), listeye
   * GERİ DÖNEN düğme ok taşıyor (`MockExamScreen`). Web üçünde de çarpı
   * çiziyordu.
   */
  glyph?: "close" | "back";
}) {
  const t = useT();
  const ic = glyph === "back" ? <BackIcon size={24} /> : <CloseIcon size={22} />;
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
        {ic}
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
      {ic}
    </button>
  );
}

/**
 * SONUÇ EKRANININ ÜST ÇUBUĞU — yalnız sağ yuva (ör. paylaş).
 *
 * 2026-09-27'de solda bir çarpı vardı; 2026-09-30 (Samet) sonuç ekranları da
 * bilgi ekranlarının kuralına girdi: üstte X YOK, çıkış dipteki "Kapat"
 * (`flow` `FlowActions` `close`). Sağ yuva boşsa çubuk hiç çizilmiyor.
 * Android karşılığı `FlowTopBar` (`ui/flow`) `onClose` olmadan.
 */
export function ResultTopBar({ right }: { right?: ReactNode }) {
  if (!right) return null;
  return <div className="flex min-h-11 items-center justify-end gap-3">{right}</div>;
}
