import type { MockPaper, MockPart, MockSkill, MockTask } from "./types";

/**
 * KÂĞIDIN İSTEMCİYE GİDEN HÂLİ — cevap anahtarı çıkarılmış.
 *
 * Deneme sınavı kâğıtları bugüne kadar mobil ikilinin İÇİNDE duruyordu
 * (`mobile/src/data/exams/papers.json`, 5,4 MB). Kâğıtlar premium kapılı ama
 * kapı yalnız GÖRÜNÜRLÜĞÜ yönetiyordu: içerik zaten cihazdaydı ve içinde her
 * maddenin `answer` alanı ile `explain` gerekçesi vardı. `unzip` yetiyordu.
 *
 * Bu dosya iki projeksiyon tanımlıyor ve ikisi de KAYNAKTAN AZ veriyor:
 *
 *   `deliverPart`   sınava giren kullanıcıya, yalnız çözdüğü bölüm,
 *                   `answer` ve `explain` olmadan.
 *   `catalogEntry`  listede görünen künye: başlık, süre, bölümler ve puan —
 *                   görevler ve maddeler HİÇ yok.
 *
 * NEDEN `explain` DE ÇIKIYOR. `answer`ı çıkarıp gerekçeyi bırakmak açığı
 * kapatmaz: "B doğru, çünkü metinde saatin altıda kapandığı yazıyor" cümlesi
 * cevabın kendisidir. Gerekçe artık SONUÇLA birlikte gidiyor
 * (`MockScore.items[].explain`), yani kullanıcı kâğıdı bitirdikten sonra —
 * doğru yer zaten orası.
 *
 * NEDEN `key` KALIYOR. Şıkların `key` alanı "A/B/C" harfidir, cevap değil;
 * çıkarılırsa ekran şıkları çizemez. Adı benzediği için karıştırılmaya açık,
 * bu yüzden burada yazılı.
 *
 * NEDEN `rubric.sample` KALIYOR. Yazma ve konuşma görevlerinin örnek cevabı,
 * kâğıt bitince gösterilen bir ÖĞRETİM metni; nesnel bir maddenin anahtarı
 * değil. Ekran onu bugün de gösteriyor (bkz. MockExamScreen rubric kartı).
 */

/** Listede görünen künye — görev ve madde taşımıyor. */
export type MockCatalogPart = {
  skill: MockSkill;
  minutes: number;
  /** Puanlanan madde sayısı; yazma/konuşma bölümünde 0. */
  points: number;
};

export type MockCatalogEntry = {
  id: string;
  no: number;
  level: MockPaper["level"];
  course: MockPaper["course"];
  theme: string;
  themeTr: string;
  minutes: number;
  parts: MockCatalogPart[];
};

/**
 * Puan = puanlanan madde sayısı.
 *
 * `mobile/src/data/exams` `partPoints` ile AYNI kural; orada görevler
 * üzerinden hesaplanıyordu, burada önceden hesaplanıp künyeye yazılıyor —
 * istemcinin görevleri görmesine artık gerek yok.
 */
function pointsOf(part: MockPart): number {
  return part.tasks.reduce((a, t) => a + (t.format === "writing" || t.format === "speaking" ? 0 : t.items.length), 0);
}

export function catalogEntry(paper: MockPaper): MockCatalogEntry {
  return {
    id: paper.id,
    no: paper.no,
    level: paper.level,
    course: paper.course,
    theme: paper.theme,
    themeTr: paper.themeTr,
    minutes: paper.minutes,
    parts: paper.parts.map((part) => ({ skill: part.skill, minutes: part.minutes, points: pointsOf(part) })),
  };
}

/** Maddenin istemciye giden hâli: `answer` ve `explain` dışında her şey. */
function deliverItem(item: MockTask["items"][number]) {
  const { answer: _answer, explain: _explain, ...rest } = item as typeof item & { answer?: unknown };
  void _answer;
  void _explain;
  return rest;
}

function deliverTask(task: MockTask) {
  return { ...task, items: task.items.map(deliverItem) };
}

export type DeliveredPaper = {
  id: string;
  no: number;
  level: MockPaper["level"];
  course: MockPaper["course"];
  theme: string;
  themeTr: string;
  part: Omit<MockPart, "tasks"> & { tasks: ReturnType<typeof deliverTask>[] };
};

/**
 * Sınava giren kullanıcının aldığı kâğıt: YALNIZ çözdüğü bölüm.
 *
 * Tam kâğıt ortalama 43 KB; tek bölüm onun dörtte biri. Dört bölümü birden
 * göndermek, kullanıcının o oturumda açmayacağı üç bölümü de cihazına
 * bırakmak olurdu — hem gereksiz trafik hem gereksiz yüzey.
 *
 * Kâğıt buraya ÇEVRİLMİŞ geliyor (`localiseMockPaper`): çeviri kaynakta
 * yapılmalı, çünkü `instructionTr`/`promptTr` alanları kullanıcının anadiline
 * göre değişiyor.
 */
export function deliverPart(paper: MockPaper, skill: MockSkill): DeliveredPaper | null {
  const part = paper.parts.find((p) => p.skill === skill);
  if (!part) return null;
  return {
    id: paper.id,
    no: paper.no,
    level: paper.level,
    course: paper.course,
    theme: paper.theme,
    themeTr: paper.themeTr,
    part: { ...part, tasks: part.tasks.map(deliverTask) },
  };
}
