"use client";

import { useEffect, useState } from "react";
import { COACH_LINES, fillCoachLine, pickCoachLine, type CoachMoment, type CoachVars } from "@/lib/coach-lines";
import { translate } from "@/lib/i18n/dict";
import { track } from "@/lib/track";
import { useLang } from "@/lib/i18n/client";

/**
 * KOÇUN CÜMLESİ — maskotsuz.
 *
 * Koç balonu (`components/coach-bubble`) Nomi + balon demek ve Nomi artık
 * yalnız günlük turda oynuyor (bkz. `components/mascot` dosya başı). Ama
 * cümlenin kendisi animasyon değil İÇERİK: kırk cümlelik tablo sözlükte
 * duruyor (`coach.*`) ve sınav girişinde "hazırsan başlayalım", sonucunda
 * "bunu hak ettin" demek ekranın işine yarıyor. Balon turda kaldı, cümle
 * dışarı çıktı. Android karşılığı `mobile/src/ui/CoachLine.tsx`.
 *
 * Cümle SUNUCUDA seçilmiyor: `pickCoachLine` rastgele ve hidrasyon
 * uyuşmazlığı çıkarırdı; balon da baştan beri etkide seçiyor.
 *
 * YERİ İLK ÇİZİMDE TUTULUYOR. Cümle etkide seçildiği için satır sayfa
 * yüklendikten SONRA beliriyor ve altındaki her şeyi aşağı itiyordu (QA F-0070
 * sınıfı). Artık anın bütün adayları aynı ızgara hücresinde görünmez çiziliyor:
 * kutu en uzun adayın boyunda baştan duruyor, seçilen cümle onun üstüne yazılıyor.
 * Görünmez adaylar ekran okuyucuya gitmiyor (`visibility: hidden`).
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

  const candidates = text ? [text] : COACH_LINES[moment].map((k) => fillCoachLine(translate(lang, k), vars));
  return (
    <div className={`grid ${className}`}>
      {candidates.map((c, i) => (
        <p key={i} aria-hidden="true" className="invisible col-start-1 row-start-1 text-body leading-snug">
          {c}
        </p>
      ))}
      <p role="status" className={`col-start-1 row-start-1 text-body leading-snug ${tone === "strong" ? "" : "muted"}`}>
        {line}
      </p>
    </div>
  );
}
