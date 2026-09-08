import type { MockLevel, MockPaper } from "./types";
import { A1_01 } from "./de/a1-01";
import { A1_02 } from "./de/a1-02";
import { A1_03 } from "./de/a1-03";
import { A1_04 } from "./de/a1-04";
import { A1_05 } from "./de/a1-05";
import { A1_06 } from "./de/a1-06";
import { A2_01 } from "./de/a2-01";
import { A2_02 } from "./de/a2-02";
import { A2_03 } from "./de/a2-03";
import { A2_04 } from "./de/a2-04";
import { A2_05 } from "./de/a2-05";
import { A2_06 } from "./de/a2-06";
import { B1_01 } from "./de/b1-01";
import { B1_02 } from "./de/b1-02";
import { B1_03 } from "./de/b1-03";
import { B1_04 } from "./de/b1-04";
import { B1_05 } from "./de/b1-05";
import { B1_06 } from "./de/b1-06";
import { B2_01 } from "./de/b2-01";
import { B2_02 } from "./de/b2-02";
import { B2_03 } from "./de/b2-03";
import { B2_04 } from "./de/b2-04";
import { B2_06 } from "./de/b2-06";
import { C1_01 } from "./de/c1-01";
import { C1_02 } from "./de/c1-02";
import { C1_03 } from "./de/c1-03";
import { C1_04 } from "./de/c1-04";
import { C1_05 } from "./de/c1-05";
import { C1_06 } from "./de/c1-06";
import { EN_A1_01 } from "./en/a1-01";
import { EN_A1_02 } from "./en/a1-02";
import { EN_A1_03 } from "./en/a1-03";
import { EN_A1_04 } from "./en/a1-04";
import { EN_A2_01 } from "./en/a2-01";
import { EN_A2_02 } from "./en/a2-02";
import { EN_A2_03 } from "./en/a2-03";
import { EN_A2_04 } from "./en/a2-04";
import { EN_B1_01 } from "./en/b1-01";
import { EN_B1_02 } from "./en/b1-02";
import { EN_B1_03 } from "./en/b1-03";
import { EN_B1_04 } from "./en/b1-04";
import { EN_B2_01 } from "./en/b2-01";
import { EN_B2_02 } from "./en/b2-02";
import { EN_C1_01 } from "./en/c1-01";
import { EN_C1_02 } from "./en/c1-02";

export * from "./types";

/**
 * Elle yazılmış deneme sınavları — tek kaynak.
 *
 * Buraya girmeyen kâğıt hiçbir yerde görünmez: web de mobil de bu listeyi
 * okur, mobil paketi `scripts/dump-mock-exams-mobile.ts` bundan üretilir.
 * Sıra listedeki sıradır; `no` alanı kâğıdın kaçıncı deneme olduğunu söyler.
 */
export const MOCK_PAPERS: readonly MockPaper[] = [A1_01, A1_02, A1_03, A1_04, A1_05, A1_06, A2_01, A2_02, A2_03, A2_04, A2_05, A2_06, B1_01, B1_02, B1_03, B1_04, B1_05, B1_06, B2_01, B2_02, B2_03, B2_04, B2_05, B2_06, C1_01, C1_02, C1_03, C1_04, C1_05, C1_06, EN_A1_01, EN_A1_02, EN_A1_03, EN_A1_04, EN_A2_01, EN_A2_02, EN_A2_03, EN_A2_04, EN_B1_01, EN_B1_02, EN_B1_03, EN_B1_04, EN_B2_01, EN_B2_02, EN_C1_01, EN_C1_02];

export function mockPapersFor(level: MockLevel, course = "de"): MockPaper[] {
  return MOCK_PAPERS.filter((p) => p.level === level && p.course === course).slice().sort((a, b) => a.no - b.no);
}

export function mockPaperById(id: string): MockPaper | null {
  return MOCK_PAPERS.find((p) => p.id === id) ?? null;
}

/**
 * Kursun deneme sınavı KATALOĞU var mı.
 *
 * Seviyeden bağımsız: Öğren merkezindeki "Deneme Sınavları" kaması, o kursta
 * böyle bir şey OLDUĞU için çiziliyor. İngilizce kursunun karşılığı yok ve
 * kama orada açık kalsaydı, o kursta hiç olmayan bir şeyin kapısı olurdu.
 * Katalog var ama seçili seviyede kâğıt yoksa kama yine çiziliyor — liste
 * ekranı o zaman "bu seviyede sınav yok" diyor, ki bu doğru cevap.
 *
 * Mobil karşılığı `M/src/data/exams/index.ts` `supportsMockExams`.
 */
export function supportsMockExams(course: string): boolean {
  return MOCK_PAPERS.some((p) => p.course === course);
}
