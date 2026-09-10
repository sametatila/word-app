"use client";

import { useState } from "react";
import { CheckIcon, LinkIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { useLang } from "@/lib/i18n/client";
import { formatNumber, formatPercent, translate, type NativeLang } from "@/lib/i18n/dict";

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
/**
 * Paylaşım metni. DİL DIŞARIDAN geliyor: metin panoya ya da başka bir
 * uygulamaya gidiyor, yani onu okuyan kişi ARAYÜZ dilini seçmiş olan kişi.
 * Metnin tamamı sabit Türkçe yazılıydı — İngilizce arayüzdeki bir kullanıcı
 * "12 kelime · %80 doğru" paylaşıyordu.
 */
export function buildShareText(input: {
  marks: boolean[];
  total: number;
  accuracy: number;
  streak: number;
  level: string;
  origin: string;
  lang: NativeLang;
  kind?: "session" | "daily";
  /** Günün turunun puanı — yalnızca `kind: "daily"` için anlamlı. */
  score?: number;
}): string {
  const { lang } = input;
  const tr = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
  const daily = input.kind === "daily";
  const head = daily
    ? tr("sharew.head_daily", { level: input.level })
    : tr("sharew.head", { level: input.level });
  const lines = [head, marksToGrid(input.marks)];

  const pct = formatPercent(input.accuracy, lang);
  const stats = daily
    ? [tr("sharew.points", { n: formatNumber(input.score ?? 0, lang) }), tr("sharew.of_questions", { n: input.total, pct })]
    : [tr("sharew.n_words", { n: input.total }), tr("sharew.pct_correct", { pct })];
  if (input.streak > 0) {
    stats.push(daily ? tr("sharew.streak_short", { n: input.streak }) : tr("social.days_streak", { n: input.streak }));
  }
  lines.push(stats.join(" · "));

  if (daily) lines.push("", tr("sharew.daily_cta", { level: input.level }));
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
  const lang = useLang();
  const [copied, setCopied] = useState(false);

  if (!total) return null;

  async function share() {
    /*
     * KIND VE DEĞER MOBİLLE AYNI. Burada yalnız `track("share")` yazıyordu:
     * kind boş, değer boş. Mobil `lib/share` `shareResult` baştan beri
     * `track("share", correct, "result")` yazıyor, yani paylaşımın hangi
     * yoldan geldiği (sonuç / davet / profil) ve kaç doğruyla paylaşıldığı
     * ölçülüyor. Webin kind'sız çağrısı raporda ayrışmıyordu - davet ve
     * profil paylaşımları kendi kind'ıyla dururken tur sonucu "boş kind"
     * kovasına düşüyordu (bkz. web-parity §11.30).
     *
     * Doğru sayısı `marks`tan geliyor; `total` ayrı bir alan ve mobil de
     * değer olarak DOĞRU sayısını gönderiyor.
     */
    track("share", marks.filter(Boolean).length, "result");
    const text = buildShareText({
      marks,
      total,
      accuracy,
      streak,
      level,
      origin: window.location.origin,
      lang,
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
