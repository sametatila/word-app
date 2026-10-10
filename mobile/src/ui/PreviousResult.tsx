import React from "react";
import { t, formatDay, formatPercent } from "../lib/i18n";
import type { ItemResult } from "../game/pathProgress";
import { FlowActions, FlowScreen, ResultHero, StatRow } from "./flow";

/**
 * ÖNCEKİ SONUCUN (Samet, 2026-10-07): daha önce yapılmış bir alıştırma açılınca sıfırdan
 * başlamıyor; önce son sonuç, en iyi puan, deneme sayısı ve son tarih. "Tekrar çöz"
 * alıştırmayı baştan açıyor, "Kapat" geldiği yere dönüyor. Beceri alıştırması
 * (`ItemScreen`), dil bilgisi/quiz (`QuizScreen`) ve konuşma (`ConversationScreen`)
 * aynı ekranı kullanıyor; web karşılığı `components/previous-result`.
 *
 * Görünüm sonuç ekranının kendisi (`ui/flow` `ResultHero` + `StatRow`): öğrenci
 * bitirdiğinde gördüğü şeyi bir sonraki açılışta da görüyor.
 *
 * ÜSTTEN BAŞLIYOR, ORTALI DEĞİL (Samet, 2026-10-10): bütün sonuç ekranları üstten başlıyor;
 * bu ekran `center` ile çiziliyordu ve aynı kutular yeniden açılışta ekranın ortasından
 * başlıyordu. Ortalı yalnız durum ekranları (yükleniyor, açılamadı). Web
 * `components/previous-result` zaten üstten. Kapı: `check:parity` "sonuc ekrani ortalanmiyor".
 */
export function PreviousResult({ eyebrow, result, passed, onRetry, onClose }: {
  eyebrow: string;
  result: ItemResult;
  /** Adım geçildi mi (eşik çağıranın: beceri, pratik, konuşma ayrı). */
  passed: boolean;
  onRetry: () => void;
  onClose: () => void;
}) {
  const at = result.at ? new Date(result.at) : null;
  const items = [
    { value: formatPercent(result.best), label: t("prev.best"), tone: passed ? ("ok" as const) : null },
    { value: String(result.attempts), label: t("prev.attempts") },
    at && !Number.isNaN(at.getTime()) ? { value: formatDay(at.toISOString()), label: t("prev.last_at") } : null,
  ].filter((x): x is NonNullable<typeof x> => x !== null);
  return (
    <FlowScreen actions={<FlowActions primary={{ label: t("prev.retry"), onPress: onRetry }} close={onClose} />}>
      <ResultHero
        eyebrow={eyebrow}
        title={t(passed ? "prev.title_passed" : "prev.title_tried")}
        figure={formatPercent(result.pct)}
        sub={t("prev.last")}
        quiet={!passed}
      />
      <StatRow items={items} />
    </FlowScreen>
  );
}
