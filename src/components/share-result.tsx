"use client";

import { useState } from "react";
import { CheckIcon, LinkIcon } from "@/components/icons";
import { track } from "@/lib/track";

/**
 * Tur sonucunu paylaşma.
 *
 * İki işi birden görüyor. Paylaşan kişi için sonucu bir kez daha görünür
 * kılıyor — söylenmiş bir hedef, sessiz bir hedeften daha çok takip ediliyor.
 * Görene ise uygulamanın varlığını duyuruyor: uygulamanın hiçbir yayılma
 * yolu yoktu, kullanıcılar yalnızca ağızdan duyanlardan ibaretti.
 *
 * Metnin biçimi Wordle'ın öğrettiği şeyi izliyor: sayı değil DESEN
 * paylaşılıyor. Kareler bakana ne olduğunu anlatmıyor, merak ettiriyor;
 * ayrıca kimsenin sırasını bozmuyor çünkü hangi kelimeler olduğu yazmıyor.
 */

const MAX_ROWS = 3;
const PER_ROW = 10;

/** Doğru/yanlış dizisini kare satırlarına çevirir. */
export function marksToGrid(marks: boolean[]): string {
  // Uzun turlarda ilk kareler değil SON kareler gösteriliyor: paylaşılan
  // şey turun nasıl bittiği, nasıl başladığı değil.
  const shown = marks.slice(-MAX_ROWS * PER_ROW);
  const rows: string[] = [];
  for (let i = 0; i < shown.length; i += PER_ROW) {
    rows.push(
      shown
        .slice(i, i + PER_ROW)
        .map((ok) => (ok ? "🟩" : "🟥"))
        .join(""),
    );
  }
  return rows.join("\n");
}

export function buildShareText(input: {
  marks: boolean[];
  total: number;
  accuracy: number;
  streak: number;
  level: string;
  origin: string;
}): string {
  const lines = [`Wortspiel · ${input.level}`, marksToGrid(input.marks)];
  const stats = [`${input.total} kelime`, `%${input.accuracy} doğru`];
  if (input.streak > 0) stats.push(`🔥 ${input.streak} gün`);
  lines.push(stats.join(" · "), "", input.origin);
  return lines.filter((l) => l !== undefined).join("\n");
}

export function ShareResult({
  marks,
  total,
  accuracy,
  streak,
  level,
}: {
  marks: boolean[];
  total: number;
  accuracy: number;
  streak: number;
  level: string;
}) {
  const [copied, setCopied] = useState(false);

  if (!total) return null;

  async function share() {
    track("share");
    const text = buildShareText({
      marks,
      total,
      accuracy,
      streak,
      level,
      origin: window.location.origin,
    });

    // Telefonda sistemin kendi paylaşım sayfası açılır — WhatsApp, Instagram
    // ve mesajlar oradan tek dokunuş. Masaüstünde böyle bir sayfa yok,
    // orada panoya kopyalamak en yakın karşılık.
    if (navigator.share) {
      try {
        await navigator.share({ text });
        return;
      } catch {
        // Kullanıcı vazgeçtiyse bir şey yapmıyoruz; hata değil, karar.
        return;
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* pano kapalıysa sessizce geçilir */
    }
  }

  return (
    <button
      onClick={() => void share()}
      className="btn btn-ghost flex w-full items-center justify-center gap-2 px-5 py-3"
    >
      {copied ? (
        <>
          <CheckIcon size={17} /> Kopyalandı
        </>
      ) : (
        <>
          <LinkIcon size={17} /> Sonucu paylaş
        </>
      )}
    </button>
  );
}
