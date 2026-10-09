import { useEffect, useState } from "react";
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

/**
 * Konuşmanın "Yapabildiklerim" etiketleri (metinleri `/api/cando`dan).
 *
 * `null` = YÜKLENİYOR, `[]` = yok ya da alınamadı. Ayrım şunun için var:
 * konuşma özeti etiketi açılırken çekiyordu ve satır özet ekrandayken
 * sonradan araya giriyor, altındaki her şeyi aşağı itiyordu (QA F-0070).
 * Artık konuşma AÇILIRKEN çekiliyor (özete gelindiğinde hazır) ve hâlâ
 * yükleniyorsa özet satırın yerini iskeletle tutuyor.
 */
export function useCandoLabels(ids: string[] | null): string[] | null {
  const key = ids ? ids.join("|") : null;
  const [labels, setLabels] = useState<string[] | null>(null);
  useEffect(() => {
    if (key === null) return;
    const want = key ? key.split("|") : [];
    if (!want.length) { setLabels([]); return; }
    let alive = true;
    setLabels(null);
    fetchCando()
      .then((d) => {
        if (!alive) return;
        const byId = new Map(d.items.map((it) => [it.cando.id, it.cando.tr]));
        setLabels(want.map((c) => byId.get(c)).filter((x): x is string => Boolean(x)));
      })
      .catch(() => { if (alive) setLabels([]); /* etiket bir süs; alınamazsa satır çizilmez */ });
    return () => { alive = false; };
  }, [key]);
  return labels;
}
