import type { QuizCourse, QuizLevel, QuizWeek } from "./types";
import { DE_A1_W01 } from "./de/a1-w01";
import { EN_A1_W01 } from "./en/a1-w01";
import { DE_A2_W01 } from "./de/a2-w01";
import { DE_A2_W02 } from "./de/a2-w02";
import { DE_A2_W03 } from "./de/a2-w03";
import { DE_A2_W04 } from "./de/a2-w04";
import { DE_A2_W05 } from "./de/a2-w05";
import { EN_A2_W01 } from "./en/a2-w01";
import { EN_A2_W02 } from "./en/a2-w02";
import { EN_A2_W03 } from "./en/a2-w03";
import { EN_A2_W04 } from "./en/a2-w04";
import { EN_A2_W05 } from "./en/a2-w05";

/**
 * Haftalık quiz kataloğu.
 *
 * BURADA OLMAYAN PAKET HİÇBİR YERDE YOK. Deneme sınavlarındaki `MOCK_PAPERS`
 * ile aynı kural: dosyayı yazmak yetmiyor, listeye girmesi gerekiyor. Kontrol
 * betiği de bu listeyi geziyor, dizini değil — diskte duran ama kayıtlı olmayan
 * bir paket sessizce doğrulanmamış kalmasın.
 *
 * Sıra önemsiz; seçim `course`, `level` ve `no` ile yapılıyor.
 */
export const QUIZ_WEEKS: QuizWeek[] = [
  DE_A1_W01,
  EN_A1_W01,
  DE_A2_W01,
  DE_A2_W02,
  DE_A2_W03,
  DE_A2_W04,
  DE_A2_W05,
  EN_A2_W01,
  EN_A2_W02,
  EN_A2_W03,
  EN_A2_W04,
  EN_A2_W05,
];

/** Bir kurs ve seviyedeki haftalar, `no` sırasıyla. */
export function quizWeeksFor(course: QuizCourse, level: QuizLevel): QuizWeek[] {
  return QUIZ_WEEKS.filter((w) => w.course === course && w.level === level).sort((a, b) => a.no - b.no);
}

/**
 * Takvim haftasına düşen paket.
 *
 * Karar (2026-09-16): herkes aynı hafta aynı quiz'i çözüyor. Sıra havuzun
 * boyuna göre DÖNÜYOR — havuz bittiğinde başa sarıyor. Dönmeseydi içerik
 * tükendiği hafta quiz hiç açılmazdı; dönmesi de aynı quiz'i yeniden göstermek
 * demek, yani yazım temposu takvimin önünde kalmak zorunda (bkz. plan).
 *
 * `weekIndex` ISO haftasının sabit bir başlangıçtan kaçıncı hafta olduğu —
 * sunucu saatinden türetiliyor, istemciden gelmiyor.
 */
export function quizForWeek(course: QuizCourse, level: QuizLevel, weekIndex: number): QuizWeek | null {
  const weeks = quizWeeksFor(course, level);
  if (!weeks.length) return null;
  const i = ((weekIndex % weeks.length) + weeks.length) % weeks.length;
  return weeks[i];
}
