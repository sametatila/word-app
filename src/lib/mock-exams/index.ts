import type { MockLevel, MockPaper } from "./types";
import { A1_01 } from "./de/a1-01";
import { A1_02 } from "./de/a1-02";
import { A2_01 } from "./de/a2-01";
import { A2_02 } from "./de/a2-02";
import { B1_01 } from "./de/b1-01";
import { B1_02 } from "./de/b1-02";
import { B2_01 } from "./de/b2-01";
import { B2_02 } from "./de/b2-02";
import { C1_01 } from "./de/c1-01";
import { C1_02 } from "./de/c1-02";

export * from "./types";

/**
 * Elle yazılmış deneme sınavları — tek kaynak.
 *
 * Buraya girmeyen kâğıt hiçbir yerde görünmez: web de mobil de bu listeyi
 * okur, mobil paketi `scripts/dump-mock-exams-mobile.ts` bundan üretilir.
 * Sıra listedeki sıradır; `no` alanı kâğıdın kaçıncı deneme olduğunu söyler.
 */
export const MOCK_PAPERS: readonly MockPaper[] = [A1_01, A1_02, A2_01, A2_02, B1_01, B1_02, B2_01, B2_02, C1_01, C1_02];

export function mockPapersFor(level: MockLevel, course = "de"): MockPaper[] {
  return MOCK_PAPERS.filter((p) => p.level === level && p.course === course).slice().sort((a, b) => a.no - b.no);
}

export function mockPaperById(id: string): MockPaper | null {
  return MOCK_PAPERS.find((p) => p.id === id) ?? null;
}
