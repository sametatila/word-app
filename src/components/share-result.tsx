"use client";

import { useState } from "react";
import { CheckIcon, LinkIcon } from "@/components/icons";
import { track } from "@/lib/track";
import { useLang, useT } from "@/lib/i18n/client";
import { formatPercent, translate, type NativeLang } from "@/lib/i18n/dict";

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
}): string {
  const { lang } = input;
  const tr = (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars);
  const lines = [tr("share.head", { level: input.level }), marksToGrid(input.marks)];

  const pct = formatPercent(input.accuracy, lang);
  const stats = [tr("share.n_words", { n: input.total }), tr("share.pct_correct", { pct })];
  if (input.streak > 0) stats.push(tr("social.days_streak", { n: input.streak }));
  lines.push(stats.join(" · "));
  lines.push("");
  lines.push(input.origin);
  return lines.join("\n");
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
  const lang = useLang();
  const t = useT();
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
      {/*
        Etiketler SÖZLÜKTEN. İkisi de elle Türkçe yazılıydı, yani arayüzü
        İngilizce ya da Almanca olan kullanıcı bu düğmede Türkçe okuyordu.
        Ad Android'den: orada aynı düğme `common.share` ("Paylaş") diyor,
        "Sonucu paylaş" değil. Kopyalandı durumu webe özgü (Web Share API
        yoksa panoya düşülüyor) ve karşılığı iki sözlükte de duran
        `referral.copied`.
      */}
      {copied ? (
        <>
          <CheckIcon size={17} /> {t("referral.copied")}
        </>
      ) : (
        <>
          <LinkIcon size={17} /> {t("common.share")}
        </>
      )}
    </button>
  );
}
