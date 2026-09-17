"use client";

import { useEffect, useState } from "react";
import { pickCoachLine, type CoachMoment, type CoachVars } from "@/lib/coach-lines";
import { track } from "@/lib/track";
import { useLang } from "@/lib/i18n/client";

/**
 * KOÇUN CÜMLESİ — maskotsuz.
 *
 * Koç balonu (`components/coach-bubble`) Erdi + balon demek ve Erdi artık
 * yalnız günlük turda oynuyor (bkz. `components/mascot` dosya başı). Ama
 * cümlenin kendisi animasyon değil İÇERİK: kırk cümlelik tablo sözlükte
 * duruyor (`coach.*`) ve sınav girişinde "hazırsan başlayalım", sonucunda
 * "bunu hak ettin" demek ekranın işine yarıyor. Balon turda kaldı, cümle
 * dışarı çıktı. Android karşılığı `mobile/src/ui/CoachLine.tsx`.
 *
 * Cümle SUNUCUDA seçilmiyor: `pickCoachLine` rastgele ve hidrasyon
 * uyuşmazlığı çıkarırdı; balon da baştan beri etkide seçiyor.
 */
export function CoachLine({ moment, vars, text, tone = "muted", className = "" }: {
  moment: CoachMoment;
  vars?: CoachVars;
  /** Verilirse listeden seçim yapılmaz, bu cümle söylenir. */
  text?: string;
  tone?: "muted" | "strong";
  className?: string;
}) {
  const lang = useLang();
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    setLine(text ?? pickCoachLine(moment, vars, lang));
    track("coach_show", 0, moment);
    // vars nesnesi her çizimde yeni; cümle an değişince seçilir (balonla aynı kural).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moment, text]);

  if (!line) return null;
  return (
    <p role="status" className={`text-body leading-snug ${tone === "strong" ? "" : "muted"} ${className}`}>
      {line}
    </p>
  );
}
