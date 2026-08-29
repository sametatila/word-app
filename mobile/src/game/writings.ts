import { api } from "../api/client";

/** Yazılarım — web /api/assessments (DEPLOY'LU). Kullanıcının yazma/konuşma
    değerlendirmeleri: yazdığı metin + puan (0-100) + geri bildirim. */
export type Writing = {
  id: number;
  kind: string;
  level: string;
  day: string;
  answer: string;
  result: { score?: { overall?: number }; [k: string]: unknown } | null;
  createdAt: string;
};

export function fetchWritings(): Promise<Writing[]> {
  return api<{ items: Writing[] }>("/api/assessments").then((d) => d.items ?? []);
}
