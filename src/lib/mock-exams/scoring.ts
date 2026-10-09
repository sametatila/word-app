import type { MockCourse, MockItem, MockPaper, MockPart, MockSkill, MockTask } from "./types";
import { MOCK_PASS_PCT, mockBoolLabels } from "./types";
import { MIN_ASSESS_WORDS } from "@/lib/assess-const";

/**
 * Deneme sınavının puanlanması — SAF, sunucuya bağlı değil.
 *
 * Puanlama sunucuda yapılıyor (`/api/mock-exam` action:"finish"): istemci
 * yalnız cevapları gönderiyor, puanı kendisi hesaplayıp göndermiyor. Sebep
 * basit — istemcinin hesapladığı puan istatistiğe girerse istatistik hiçbir
 * şey ölçmez.
 *
 * Mobil oynatıcı aynı kuralın bir kopyasını taşıyor ama yalnız EKRAN için:
 * "kaç madde cevaplandı" göstergesi ve ağ yokken gösterilen geçici sonuç.
 * Resmî sayı buradan çıkanıdır.
 */

/**
 * Cevap karşılaştırma katlaması.
 *
 * Mobil tarafta `MockExamScreen` içinde AYNI kural bir kez daha yazılı
 * (paket `src/` göremiyor). İkisi birlikte değişir; ayrılırlarsa öğrenci
 * ekranda doğru görünen bir cevabın sunucuda yanlış sayıldığını görür.
 *
 * Umlaut açılıyor çünkü telefonda `ä` yazmak zahmetli ve boşluk doldurma
 * maddelerinde ölçülen şey imla değil, doğru sözcüğü bulmak.
 *
 * KESME İŞARETİ SİLİNİYOR, boşluğa çevrilmiyor. Önceki kural bütün noktalama
 * ile birlikte onu da boşluk yapıyordu: "don't" → "don t", "dont" → "dont" ve
 * ikisi eşleşmiyordu. Almancada kesme işareti neredeyse hiç geçmediği için
 * görünmeyen bir kusurdu; İngilizce açık boşluk ve dönüştürme maddelerinde
 * kısaltma her cümlede var ve doğru yazılmış cevabı yanlış sayıyordu.
 */
export function foldAnswer(s: string): string {
  return s
    .toLocaleLowerCase("de-DE")
    .replace(/ß/g, "ss")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/['’‘`´]/g, "")
    .replace(/[.,!?;:"„“”()[\]{}\-–—/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Tek maddenin doğruluğu. Boş cevap her zaman yanlış. */
export function isItemCorrect(item: MockItem, ans: string | undefined): boolean {
  if (ans == null || ans.trim() === "") return false;
  if (item.kind === "mcq") return Number(ans) === item.answer;
  if (item.kind === "bool") return (ans === "true") === item.answer;
  if (item.kind === "match") return ans === item.answer;
  return item.accept.some((a) => foldAnswer(a) === foldAnswer(ans));
}

/** Yazma/konuşma görevi mi — nesnel puanı olmayan görevler. */
export const isOpenTask = (t: MockTask) => t.format === "writing" || t.format === "speaking";

export type ScoredItem = {
  id: string;
  no: number;
  taskId: string;
  taskNo: number;
  goal: string;
  correct: boolean;
  /** Öğrencinin verdiği cevap, ham hâliyle. */
  given: string;
  /**
   * Verilen cevabın okunur hâli (şıklı maddede şıkkın metni, doğru/yanlışta
   * kâğıdın etiketi, eşleştirmede harf + metin); boş bırakılan maddede "".
   * Yapay zekâ geri bildirimi ham dizini ("0") görüyordu ve "ilk söyleneni
   * seçiyor" gibi uydurma örüntüler çıkarıyordu (QA F-0050).
   */
  givenLabel?: string;
  /** Doğru cevabın okunur hâli — dökümde gösterilir. */
  expected: string;
  /**
   * Maddenin gerekçesi — SONUÇLA BİRLİKTE gidiyor, kâğıtla değil.
   *
   * Eskiden istemci bunu elindeki kâğıttan okuyordu; kâğıt da ikilinin
   * içindeydi, yani gerekçe sınav başlamadan önce de oradaydı. "B doğru,
   * çünkü metinde saatin altıda kapandığı yazıyor" cümlesi cevabın kendisi.
   * Artık kâğıt `answer` gibi `explain` de taşımadan iniyor (bkz. `deliver`)
   * ve gerekçe ancak kâğıt bitince, burada geliyor.
   *
   * `scorePart` bunu DOLDURMUYOR: gerekçe kullanıcının anadiline çevrilmiş
   * olmalı ve çeviri uçta yapılıyor (`localiseMockPaper`). Saf kalması,
   * puanlamanın veritabanına ve dile bağımsız kalması demek.
   */
  explain?: string;
};

export type MockScore = {
  paperId: string;
  level: string;
  skill: MockSkill;
  correct: number;
  total: number;
  /** 0–100. Nesnel madde yoksa 0. */
  pct: number;
  passed: boolean;
  /** Ölçüm hedefine göre kırılım — zayıf beceriyi burası gösteriyor. */
  byGoal: { goal: string; correct: number; total: number }[];
  /** Teil'e göre kırılım. */
  byTask: { taskId: string; taskNo: number; format: string; goal: string; correct: number; total: number }[];
  items: ScoredItem[];
  /**
   * Açık görevi olan bölümde (yazma/konuşma) puanın nereden geldiği; okuma
   * ve dinlemede YOK. Varsa `correct`/`total` madde değil yüzde: `total`
   * 100, `correct` bölüm yüzdesi (bkz. `scoreSection`).
   */
  open?: OpenBreakdown;
};

/**
 * Açık görevin kayıtlı yapay zekâ sonucu (`mock_exam_attempts.open_scores`).
 *
 * Hata maddesinde doğru biçimin adı `fix` (değerlendirme şeması,
 * `AssessError`). Uç istemciye `right` adıyla da veriyor, çünkü yayındaki
 * build 9/10 onu okuyor (denetim T14); iki ad da burada kabul ediliyor.
 */
export type OpenScoreEntry = {
  score: number | null;
  tip?: string;
  praise?: string;
  corrected?: string;
  errors?: { wrong?: string; fix?: string; right?: string; why_tr?: string; type?: string; span?: [number, number] }[];
  reason?: string;
};

/**
 * Bölümdeki bir görevin sonuca giren durumu.
 *
 *   objective  nesnel görev (ör. A1 Schreiben'daki form): maddelerinden yüzde
 *   scored     açık görev, yapay zekâ puanı var
 *   empty      açık görev, boş ya da değerlendirilemeyecek kadar kısa: 0 sayılır
 *   unscored   açık görev, metin var ama puan yok (Değerlendir'e basılmadı,
 *              izin yok, kota, sağlayıcı hatası): ortalamaya GİRMİYOR
 */
export type OpenTaskState = "objective" | "scored" | "empty" | "unscored";

export type OpenBreakdown = {
  tasks: { taskId: string; taskNo: number; goal: string; format: string; state: OpenTaskState; pct: number | null }[];
  /** Yapay zekâ puanı alan açık görev sayısı. */
  scored: number;
  /** Boş kalıp 0 sayılan açık görev sayısı. */
  empty: number;
  /** Metni olduğu hâlde puanı olmayan, ortalamaya girmeyen açık görev sayısı. */
  unscored: number;
};

function expectedLabel(item: MockItem, task: MockTask, course: MockCourse): string {
  if (item.kind === "mcq") return item.options[item.answer] ?? "";
  // Doğru cevabın okunur hâli kâğıdın dilinde yazılıyor: İngilizce bir kâğıdın
  // dökümünde "richtig" görmek öğrenciye sınavda görmediği bir sözcük gösterir.
  if (item.kind === "bool") {
    const [yes, no] = mockBoolLabels(course, task.format);
    return item.answer ? yes : no;
  }
  if (item.kind === "match") {
    const o = task.options?.find((x) => x.key === item.answer);
    return o ? `${o.key}) ${o.label}` : item.answer;
  }
  return item.accept[0];
}

function givenLabel(item: MockItem, task: MockTask, course: MockCourse, raw: string | undefined): string {
  if (raw == null || !raw.trim()) return "";
  if (item.kind === "mcq") {
    const n = Number(raw);
    return Number.isInteger(n) ? (item.options[n] ?? raw) : raw;
  }
  if (item.kind === "bool") {
    const [yes, no] = mockBoolLabels(course, task.format);
    return raw === "true" ? yes : raw === "false" ? no : raw;
  }
  if (item.kind === "match") {
    const o = task.options?.find((x) => x.key === raw);
    return o ? `${o.key}) ${o.label}` : raw;
  }
  return raw;
}

export function findPart(paper: MockPaper, skill: MockSkill): MockPart | null {
  return paper.parts.find((p) => p.skill === skill) ?? null;
}

/**
 * Bir bölümün cevaplarını puanlar.
 *
 * `answers` madde kimliğinden cevaba: şıklı maddede dizin ("2"), doğru/yanlış
 * maddesinde "true"/"false", eşleştirmede şık harfi, boşlukta yazılan metin.
 */
/**
 * KÂĞIT PARAMETRE OLARAK GELİYOR, kimlikle değil.
 *
 * Puanlama SAF kalmak zorunda: bu dosyayı istemci oynatıcısı da içe alıyor
 * (`foldAnswer`, `isOpenTask`) ve veritabanına bakan bir içe alım derlemeyi
 * kırıyor. Kâğıdı çağıran getiriyor — sunucu onu denemenin sabitlenmiş
 * sürümünden okuyor (`mockPaperAt`), yani sınav hangi kâğıtla açıldıysa
 * onunla bitiyor.
 */
export function scorePart(
  paper: MockPaper,
  skill: MockSkill,
  answers: Record<string, string>,
): MockScore | null {
  const part = paper ? findPart(paper, skill) : null;
  if (!paper || !part) return null;

  const items: ScoredItem[] = [];
  const byTask: MockScore["byTask"] = [];
  const goals = new Map<string, { correct: number; total: number }>();

  for (const task of part.tasks) {
    if (isOpenTask(task)) continue;
    let c = 0;
    for (const it of task.items) {
      const ok = isItemCorrect(it, answers[it.id]);
      if (ok) c++;
      const g = goals.get(task.goal) ?? { correct: 0, total: 0 };
      g.total++;
      if (ok) g.correct++;
      goals.set(task.goal, g);
      items.push({
        id: it.id,
        no: it.no,
        taskId: task.id,
        taskNo: task.no,
        goal: task.goal,
        correct: ok,
        given: answers[it.id] ?? "",
        givenLabel: givenLabel(it, task, paper.course, answers[it.id]),
        expected: expectedLabel(it, task, paper.course),
      });
    }
    byTask.push({ taskId: task.id, taskNo: task.no, format: task.format, goal: task.goal, correct: c, total: task.items.length });
  }

  const total = items.length;
  const correct = items.filter((i) => i.correct).length;
  const pct = total ? Math.round((100 * correct) / total) : 0;
  return {
    paperId: paper.id,
    level: paper.level,
    skill,
    correct,
    total,
    pct,
    // Nesnel maddesi olmayan bölüm (yazma/konuşma) "geçti" diye işaretlenmez;
    // orada geçme kararı rubrikle verilir, sayıyla değil.
    passed: total > 0 && pct >= MOCK_PASS_PCT,
    byGoal: [...goals.entries()].map(([goal, v]) => ({ goal, ...v })),
    byTask,
    items,
  };
}

const kelime = (s: string | undefined) => (s ?? "").trim().split(/\s+/).filter(Boolean).length;

/** Kayıtlı puan gerçekten bir sayı mı; değilse null (sağlayıcı yoktu, hata). */
function aiPct(entry: OpenScoreEntry | undefined): number | null {
  const s = entry?.score;
  return typeof s === "number" && Number.isFinite(s) ? Math.max(0, Math.min(100, s)) : null;
}

/**
 * Bölümün RESMÎ puanı — açık görevler dahil (denetim T15).
 *
 * `scorePart` yalnız nesnel maddeleri sayıyor ve yazma/konuşma görevlerini
 * atlıyor. Görev başına yapay zekâ puanı `assess` eyleminde zaten üretilip
 * `open_scores`a yazılıyordu ama bitişte hiç okunmuyordu: iki görevi %84 ve
 * %71 alan öğrenci bölüm sonunda "makinece puanlanmıyor" görüyordu. Vitrin
 * metni "yazma ve konuşma cevaplarını yapay zekâ puanlar … sonunda başarı
 * yüzdeni alırsın" diyor; o sözün karşılığı burası.
 *
 * NASIL BİRLEŞİYOR. Her görev (Teil) eşit ağırlıkta: nesnel görevin yüzdesi
 * maddelerinden, açık görevinki yapay zekâ puanından. Bölüm yüzdesi sayılan
 * görevlerin ortalaması. Madde ağırlığı burada anlamsız — bir mektubun
 * "madde sayısı" yok ve 5 maddelik bir form 1 maddelik bir mektubu ezmemeli.
 *
 * HANGİ GÖREV SAYILIYOR — adil olan seçildi:
 *   - BOŞ görev (MIN_ASSESS_WORDS altı) 0 sayılıyor. Gerçek sınavda da yazılmamış
 *     mektup sıfır puan; saymamak, tek görevi yazıp bölümden %90 almak olurdu.
 *   - METNİ OLUP PUANI OLMAYAN görev ortalamaya GİRMİYOR. Öğrenci işi yaptı;
 *     eksik olan puan onun performansı değil (izin, kota, sağlayıcı hatası ya
 *     da basılmamış bir düğme). 0 saymak yazdığı metni cezalandırırdı.
 *     Bitişte bu görevler için model ÇAĞRILMIYOR: bitiş zaten bir çağrı
 *     yapıyor (özet) ve istemcinin bitiş isteği 25 sn'de kesiliyor; önüne
 *     görev başına bir değerlendirme daha eklemek sınırı aşabilir ve kotadan
 *     görev başına "Değerlendir"in ötesinde yer. Kaç görevin dışarıda kaldığı
 *     `open.unscored` ile ekranda söyleniyor.
 *
 * PUANSIZ BÖLÜM. Hiçbir açık görev yapay zekâ puanı almadıysa ve nesnel
 * görev de yoksa bölüm PUANSIZ kalıyor (`total` 0): misafir, izin vermeyen ya
 * da hiç değerlendirmeyen öğrenci için dürüst cevap "yüzde yok", %0 değil.
 * Nesnel görevli karışık bölümde (A1 Schreiben: form + mektup) mektup
 * puansızsa sonuç eskisi gibi formun maddelerinden.
 *
 * `correct`/`total` BİÇİMİ. Açık görevli bölümde `total` 100, `correct`
 * bölüm yüzdesi. Yayındaki istemciler (build 9/10) sonucu `correct/total`
 * ve `pct` ile çiziyor: "78/100 doğru · eşik %60" okunur bir cümle ve
 * "geçmek için kaç eksik" hesabı (`shortBy`) puan cinsinden doğru çıkıyor.
 * İstatistiğin beceri kırılımı (`mockStats`, Σcorrect/Σtotal) da böylece
 * denemelerin yüzde ortalaması oluyor.
 */
export function scoreSection(
  paper: MockPaper,
  skill: MockSkill,
  answers: Record<string, string>,
  open: Record<string, string>,
  openScores: Record<string, OpenScoreEntry | undefined>,
): MockScore | null {
  const base = scorePart(paper, skill, answers);
  const part = findPart(paper, skill);
  if (!base || !part || !part.tasks.some(isOpenTask)) return base;

  const tasks: OpenBreakdown["tasks"] = [];
  for (const task of part.tasks) {
    const row = { taskId: task.id, taskNo: task.no, goal: task.goal, format: task.format };
    if (!isOpenTask(task)) {
      const t = base.byTask.find((x) => x.taskId === task.id);
      const pct = t && t.total ? (100 * t.correct) / t.total : null;
      tasks.push({ ...row, state: "objective", pct });
      continue;
    }
    const ai = aiPct(openScores[task.id]);
    if (ai !== null) tasks.push({ ...row, state: "scored", pct: ai });
    else if (kelime(open[task.id]) < MIN_ASSESS_WORDS) tasks.push({ ...row, state: "empty", pct: 0 });
    else tasks.push({ ...row, state: "unscored", pct: null });
  }
  const breakdown: OpenBreakdown = {
    tasks,
    scored: tasks.filter((t) => t.state === "scored").length,
    empty: tasks.filter((t) => t.state === "empty").length,
    unscored: tasks.filter((t) => t.state === "unscored").length,
  };

  /* Ne yapay zekâ puanı ne nesnel madde: puansız bölüm. */
  const hasObjective = tasks.some((t) => t.state === "objective" && t.pct !== null);
  if (!breakdown.scored && !hasObjective) {
    return { ...base, correct: 0, total: 0, pct: 0, passed: false, byGoal: [], open: breakdown };
  }
  /* Karışık bölümde mektup puansız VE boş değilse: sonuç formun maddelerinden
     (eski davranış), yalnız dökümü ekleniyor. */
  if (!breakdown.scored && !breakdown.empty) return { ...base, open: breakdown };

  const counted = tasks.filter((t): t is typeof t & { pct: number } => t.pct !== null);
  const mean = (xs: number[]) => xs.reduce((a, x) => a + x, 0) / xs.length;
  const pct = Math.round(mean(counted.map((t) => t.pct)));
  const goals = new Map<string, number[]>();
  for (const t of counted) goals.set(t.goal, [...(goals.get(t.goal) ?? []), t.pct]);
  return {
    ...base,
    correct: pct,
    total: 100,
    pct,
    passed: pct >= MOCK_PASS_PCT,
    /* Hedef kırılımı da aynı birimde (x/100): eski istemci onu "78/100" diye,
       çubuğu yüzdesiyle çiziyor. */
    byGoal: [...goals.entries()].map(([goal, xs]) => ({ goal, correct: Math.round(mean(xs)), total: 100 })),
    byTask: counted.map((t) => ({ taskId: t.taskId, taskNo: t.taskNo, format: t.format, goal: t.goal, correct: Math.round(t.pct), total: 100 })),
    open: breakdown,
  };
}
