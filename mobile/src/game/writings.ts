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

/**
 * Yazıyı ve değerlendirmesini siler.
 *
 * Uç (`DELETE /api/assessments?id=`) aylardır duruyor ve web kartı onu
 * kullanıyordu; mobilde kendi yazısını silmenin HİÇBİR yolu yoktu. Kendi
 * ürettiği içeriği kaldıramamak, listenin uzunluğundan bağımsız olarak
 * kullanıcının kendi verisi üzerindeki en temel denetimi eksik bırakıyor.
 */
export function deleteWriting(id: number): Promise<unknown> {
  return api(`/api/assessments?id=${id}`, { method: "DELETE" });
}

export function fetchWritings(): Promise<Writing[]> {
  return api<{ items: Writing[] }>("/api/assessments").then((d) => d.items ?? []);
}
