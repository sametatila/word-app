"use client";

import { SparkIcon } from "@/components/icons";
import { useT } from "@/lib/i18n/client";

/**
 * "Karşındaki yapay zekâ" bildirimi — mobil `ui/AiNotice.tsx` karşılığı.
 *
 * Kullanım şartları §6 açık bir söz veriyor: "bir yapay zekâ ile etkileştiğin
 * uygulamada AÇIKÇA BELİRTİLİR." Mobil bunu üç ekranda yapıyordu; web hiç
 * yapmıyordu, yani söz yalnız bir platformda tutuluyordu. Play'in üretken
 * yapay zekâ politikası da aynı bildirimi istiyor.
 *
 * Bildirim bilerek KALICI ve kapatılamaz: bir kez görünüp akışta yukarı kayan
 * bir baloncuk, uzun bir konuşmanın ortasına giren kullanıcı için yok
 * hükmündedir.
 *
 * `variant`:
 *  - "character" — konuşulan taraf bir karakter (rol yapma). Gerçek kişi değil.
 *  - "output"    — metni/puanı üreten taraf model (değerlendirme). Yanılabilir.
 */
export function AiNotice({ variant, className = "" }: { variant: "character" | "output"; className?: string }) {
  const t = useT();
  const text = t(variant === "character" ? "ai.notice_character" : "ai.notice_output");
  return (
    <p
      className={`muted surface-2 flex items-center gap-2 px-3 py-2 text-micro ${className}`}
      style={{ borderRadius: "var(--radius-tile)" }}
    >
      <SparkIcon size={14} />
      <span className="flex-1">{text}</span>
    </p>
  );
}
