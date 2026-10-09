"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useLang, useT } from "@/lib/i18n/client";
import { formatDay, formatPercent } from "@/lib/i18n/dict";
import type { ItemResult } from "@/lib/immersion/state";
import { FlowActions, FlowColumn, ResultHero, StatRow } from "@/components/flow";

/**
 * ÖNCEKİ SONUCUN (Samet, 2026-10-07): daha önce yapılmış alıştırma sıfırdan açılmıyor;
 * önce son sonuç, en iyi puan, deneme sayısı ve son tarih. "Tekrar çöz" baştan açıyor,
 * "Kapat" geldiği yere dönüyor. Beceri alıştırması (`skills/player-shell`), dil
 * bilgisi/quiz ve konuşma aynı kartı kullanıyor; mobil karşılığı `ui/PreviousResult`.
 * Görünüm sonuç kartının kendisi (`ResultHero` + `StatRow`).
 */
export function PreviousResult({ eyebrow, result, passed, onRetry, close }: {
  eyebrow: string;
  result: ItemResult;
  passed: boolean;
  onRetry: () => void;
  /** Geldiği yer (adres) ya da geri dönüş işlevi. */
  close: string | (() => void);
}) {
  const t = useT();
  const lang = useLang();
  const at = result.at ? new Date(result.at) : null;
  const stats = [
    { value: formatPercent(result.best, lang), label: t("prev.best"), tone: passed ? ("ok" as const) : null },
    { value: String(result.attempts), label: t("prev.attempts") },
    at && !Number.isNaN(at.getTime())
      ? { value: formatDay(at.toISOString(), lang), label: t("prev.last_at") }
      : null,
  ].filter((x): x is NonNullable<typeof x> => x !== null);
  return (
    <div className="mt-5">
      <FlowColumn>
        <ResultHero
          eyebrow={eyebrow}
          title={t(passed ? "prev.title_passed" : "prev.title_tried")}
          figure={formatPercent(result.pct, lang)}
          sub={t("prev.last")}
          quiet={!passed}
        />
        <StatRow items={stats} />
        <FlowActions primary={{ label: t("prev.retry"), onClick: onRetry }} close={close} />
      </FlowColumn>
    </div>
  );
}

/**
 * Oynatıcıyı saran kapı (sunucu sayfaları için): önceki sonuç varsa kart, "Tekrar çöz"
 * oynatıcıyı SIFIRDAN bağlar (önceki durumu taşımaz). Başlık sunucuda çevrilemediği için
 * anahtar + ek olarak geliyor ("Okuma · A1").
 */
export function PreviousGate({ result, eyebrowKey, eyebrowSuffix, passed, close, resumeKey, children }: {
  result: ItemResult | null;
  eyebrowKey: string;
  eyebrowSuffix?: string;
  passed: boolean;
  close: string;
  /** Tarayıcıda yarım kalmış kaydın anahtarı (konuşma): varsa kart atlanır, oynatıcı kaldığı yerden sürer. */
  resumeKey?: string;
  children: ReactNode;
}) {
  const t = useT();
  const [retry, setRetry] = useState(false);
  useEffect(() => {
    if (!resumeKey) return;
    try {
      if (localStorage.getItem(resumeKey)) setRetry(true);
    } catch {
      /* depo kapalı: kart kalır */
    }
  }, [resumeKey]);
  if (result && !retry) {
    return (
      <PreviousResult
        eyebrow={[t(eyebrowKey), eyebrowSuffix].filter(Boolean).join(" · ")}
        result={result}
        passed={passed}
        onRetry={() => setRetry(true)}
        close={close}
      />
    );
  }
  return <>{children}</>;
}
