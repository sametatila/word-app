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
        // Dolu/boş kare, renkli emoji değil: emoji her platformda ayrı
        // çiziliyor ve bazı istemcilerde hiç çizilmiyor. Desen dolulukla
        // okunuyor, renge ihtiyacı yok.
        .map((ok) => (ok ? "■" : "□"))
        .join(""),
    );
  }
  return rows.join("\n");
}

/**
 * Paylaşılan metin.
 *
 * Günün turu ayrı bir metin alıyor ve bunun sebebi tek bir cümlede: o tur
 * herkese AYNI kelimeleri aynı sırayla veriyor. Sıradan bir tur paylaşıldığında
 * karşı taraf yalnızca bir sonuç görüyor; günün turu paylaşıldığında
 * karşılaştırabileceği bir şey görüyor. Aradaki fark, bir sonuç ile bir meydan
 * okuma arasındaki fark — ve paylaşımın işe yaradığı tek yer orası.
 *
 * Metinde skor da var çünkü günün turunda kıyaslanan şey doğru sayısı değil
 * puan: hız ve seri puana giriyor, iki kişi 18/20 yapıp farklı puan alabiliyor.
 */
export function buildShareText(input: {
  marks: boolean[];
  total: number;
  accuracy: number;
  streak: number;
  level: string;
  origin: string;
  kind?: "session" | "daily";
  /** Günün turunun puanı — yalnızca `kind: "daily"` için anlamlı. */
  score?: number;
}): string {
  const daily = input.kind === "daily";
  const head = daily ? `Nomi · Günün turu · ${input.level}` : `Nomi · ${input.level}`;
  const lines = [head, marksToGrid(input.marks)];

  const stats = daily
    ? [`${input.score?.toLocaleString("tr-TR") ?? 0} puan`, `${input.total} soruda %${input.accuracy}`]
    : [`${input.total} kelime`, `%${input.accuracy} doğru`];
  if (input.streak > 0) stats.push(daily ? `${input.streak} seri` : `${input.streak} gün seri`);
  lines.push(stats.join(" · "));

  if (daily) lines.push("", `Aynı sorular ${input.level} seviyesindeki herkese aynı. Sen de dene:`);
  else lines.push("");
  lines.push(input.origin);
  return lines.join("\n");
}

export function ShareResult({
  marks,
  total,
  accuracy,
  streak,
  level,
  kind = "session",
  score,
}: {
  marks: boolean[];
  total: number;
  accuracy: number;
  streak: number;
  level: string;
  /** Günün turu farklı bir metin üretir — bkz. `buildShareText`. */
  kind?: "session" | "daily";
  score?: number;
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
      kind,
      score,
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
