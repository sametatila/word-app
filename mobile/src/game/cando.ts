import { api } from "../api/client";

/** "Neler yapabilirim" — web /api/cando (DEPLOY'LU). CEFR can-do ifadeleri;
    kanıtlı (proven) / ilerliyor / yok, seviye başına özet. */
export type CandoItem = {
  cando: { id: string; level: string; skill: string; tr: string; de?: string };
  state: "proven" | "progressing" | "none";
  done: number;
  total: number;
};
export type CandoData = { level: string; items: CandoItem[]; byLevel: Record<string, { proven: number; total: number }> };

export function fetchCando(): Promise<CandoData> {
  return api<CandoData>("/api/cando");
}
