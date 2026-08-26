import type { CefrLevel } from "@/lib/skills/types";
import type { ErrorType } from "@/lib/errors";

/**
 * Drill şeması (WP-11/73) — içerik dosyaları (`drills-a1.ts`, …) buradan
 * beslenir; `drills.ts` hepsini toplar. Şema `drills.ts`'ten ayrıldı ki
 * içerik dosyaları toplayıcıyı içe aktarıp döngü kurmasın.
 */
export type DrillKind = "transform" | "fill" | "reorder" | "translate";

export type Drill = {
  id: string;
  tableId: string;
  level: CefrLevel;
  kind: DrillKind;
  prompt: {
    /** Verilen Almanca cümle/parça; `fill` türünde "___" boşluk; `reorder`da " · " ile ayrılmış parçalar. */
    de?: string;
    /** Türkçe yönerge: ne yapılacak. */
    tr: string;
  };
  /** Beklenen tam cümle. */
  answer: string;
  /** Kabul edilen başka biçimler (boşluk doldurmada yalnız boşluğun kendisi de). */
  alternatives?: string[];
  errorType: ErrorType;
  /** Gerekçe, Türkçe, tek cümle. */
  why: string;
};

export const d = (
  tableId: string,
  level: CefrLevel,
  n: number,
  kind: DrillKind,
  tr: string,
  de: string | undefined,
  answer: string,
  errorType: ErrorType,
  why: string,
  alternatives?: string[],
): Drill => ({
  id: `d:${tableId}:${String(n).padStart(2, "0")}`,
  tableId,
  level,
  kind,
  prompt: { de, tr },
  answer,
  alternatives,
  errorType,
  why,
});
