"use client";

import { useState } from "react";
import { FlagIcon } from "@/components/icons";
import { ReportDialog } from "@/components/report-dialog";
import { targetRef, type ReportSurface, type ReportTarget } from "@/lib/report";
import type { Round } from "@/lib/types";
import { useT } from "@/lib/i18n/client";

/**
 * İçerik bildirimi bayrağı — her öğe/soru kartında aynı küçük düğme
 * (`docs/plan/content-feedback.md` › Arayüz).
 *
 * Yapay zekâ çıktılarındaki "Bildir" bağlantısı ayrı ve yerinde kalıyor; bu
 * bayrak ÖĞRENME İÇERİĞİ için: kelime, soru, sınav maddesi. Cevaptan önce de
 * sonra da görünüyor, çünkü sorunların çoğu (yanlış cevap anahtarı, eksik
 * çeviri) ancak cevaptan sonra fark ediliyor.
 *
 * ANLIK GÖRÜNTÜ AÇILIŞTA ALINIYOR. `content` bir işlev olabilir: soru,
 * şıklar ve kullanıcının cevabı bayrağa basıldığı andaki hâliyle panele
 * gidiyor; her çizimde JSON kurmak gerekmiyor.
 *
 * İki ölçü, sınıflar iki dalda da ELLE yazılı (`check:hit` sınıftan okuyor):
 *   `tile`   başlık satırında, çıkış karosunun (`RoundExit`) eşi: 44x44.
 *   `inline` kart içinde, sönük ve zeminsiz: 36x36 + `hit-8`.
 */
export function ReportFlag({
  surface,
  target,
  content,
  variant = "inline",
  className = "",
}: {
  surface: ReportSurface;
  /** Hedef henüz yoksa (soru yükleniyor) bayrak çizilmiyor. */
  target: ReportTarget | null | undefined;
  content: string | (() => string);
  variant?: "tile" | "inline";
  className?: string;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [snap, setSnap] = useState("");
  if (!target) return null;
  const openSheet = () => {
    let text = "";
    try {
      text = typeof content === "function" ? content() : content;
    } catch {
      /* Anlık görüntü kurulamasa da bildirim gidebilmeli: hedef yeterli. */
    }
    setSnap(text);
    setOpen(true);
  };
  return (
    <>
      {variant === "tile" ? (
        <button
          type="button"
          onClick={openSheet}
          aria-label={t("report.flag_a11y")}
          aria-haspopup="dialog"
          className={`pressable flex h-11 w-11 shrink-0 items-center justify-center rounded-tile ${className}`}
          style={{ background: "var(--surface-2)", color: "var(--text-muted)" }}
        >
          <FlagIcon size={20} />
        </button>
      ) : (
        <button
          type="button"
          onClick={openSheet}
          aria-label={t("report.flag_a11y")}
          aria-haspopup="dialog"
          className={`pressable hit-8 flex h-9 w-9 shrink-0 items-center justify-center rounded-tile ${className}`}
          style={{ color: "var(--text-muted)" }}
        >
          <FlagIcon size={18} />
        </button>
      )}
      <ReportDialog
        open={open}
        kind="content"
        refId={targetRef(target)}
        content={snap}
        surface={surface}
        target={target}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

/** Anlık görüntü: kısa JSON, boş alanlar atılmış, 4000 karakterle sınırlı. */
export function snapshot(data: Record<string, unknown>): string {
  const clean: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v === undefined || v === null || v === "") continue;
    clean[k] = v;
  }
  return JSON.stringify(clean).slice(0, 4000);
}

/**
 * Kelime turunun hedefi — tur, pratik, yürüyüş ve sınavların kelime bölümü
 * aynı kimliği kullanıyor: `word` + `game`. Eşleştirmede ilk kelime (anlık
 * görüntü turun bütününü taşıyor).
 */
export function roundTarget(round: Round): ReportTarget {
  const w = round.game === "match" ? round.words[0] : round.word;
  return { type: "word", id: String(w?.id ?? round.id), game: round.game };
}
