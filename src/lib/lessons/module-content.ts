import { LESSONS } from "./index";
import { MODULE_SIZE, moduleTheme } from "./modules";
import { foldSentence } from "@/lib/sentence-match";
import type { Lesson, Segment } from "./types";

/**
 * Modülün kendi içeriği — sınav maddelerinin ham maddesi.
 *
 * Modül sınavı uzun süre modülle yalnızca KELİME düzeyinde ilgiliydi: sorular
 * `words` tablosundan kuruluyor, modül yalnızca hangi kelimelerin
 * seçileceğini söylüyordu. Oysa dersler kelime öğretmiyor — kalıp öğretiyor,
 * cümle kurdurüyor, hüküm verdiriyor, konuşturuyor. Modülü bitiren birinin
 * "şunları öğrendim" diyebileceği şey `Ich hätte gern einen Kaffee.`
 * cümlesini kurabilmesi; "der Kaffee" kelimesini tanıması değil.
 *
 * Bu modül dersin ürettiği dört tür ham maddeyi bir araya getiriyor:
 *
 *   - **üretim** (`produce`) — Türkçe cümle → Almanca kuruluş. Dersin
 *     puanlanan adımı zaten bu; sınavın omurgası da bu olmalı.
 *   - **hüküm** (`truefalse`) — bozuk bir Almanca cümle ve gerekçesi. Hazır
 *     yazılmış hata teşhisi: modülün tam olarak hangi yanlışı hedeflediğini
 *     içerikten daha iyi hiçbir kural söyleyemez.
 *   - **kalıp** (`patterns`) — modülün işlevsel dili ("bir şey isterken…").
 *   - **kelime** (`vocab`) — ders sırasıyla, artikelsiz köküyle.
 *
 * Hepsi SAF: veritabanı yok, `server-only` yok. Doğrulayıcı betiği
 * (`scripts/check-exams.ts`) ve sınav kurucusu aynı işlevleri çağırıyor.
 */

/** Ders başlığından artikeli ayırır: ders "der Name" yazar, tablo "Name" tutar. */
export function headword(de: string): string {
  return de.replace(/^(der|die|das)\s+/i, "").trim().toLocaleLowerCase("de-DE");
}

/**
 * Üretim adımının Türkçe yönergesinden sınav sorusu.
 *
 * Ders yönergesi sesli anlatım için yazılmış ve bir öğretmen ağzı taşıyor:
 * "Sıra sende: 'Bir kedim var.' nasıl dersin?". Sınavda öğretmen yok, kâğıt
 * var; bu yüzden yalnızca **çerçeve** cümleleri atılıyor ve geriye çevrilecek
 * cümle ile onu tek anlama sabitleyen ek bağlam kalıyor ("Burada 'o' bir
 * erkek komşu." gibi). Ek bağlam bilerek KALIYOR: onsuz madde ihm/ihr
 * arasında karar veremez hâle gelir, yani ipucu değil sorunun parçasıdır.
 *
 * Liste kapalı ve elle yazılı: kalıba uymayan yönerge kırpılmadan geçer.
 * Yanlış kırpmak, kırpmamaktan pahalı — cümlenin yarısını yutan bir düzenli
 * ifade soruyu cevaplanamaz hâle getirir.
 */
const LEAD_INS = [
  "Şimdi sıra sende:",
  "Sıra sende:",
  "Sıra sende.",
  "Şimdi sen söyle:",
  "Şimdi sen sor:",
  "Şimdi sen anlat:",
  "Şimdi sen tarif et:",
  "Şimdi sen kur:",
  "Şimdi sen:",
  "Şimdi sen",
  "Bir üretim daha:",
  "Bir tane daha:",
  "Son bir tane:",
  "Son:",
  "Peki",
];

/** Yönergenin sonuna eklenmiş ders ipuçları — sınavda kırpılır. */
const HINT_CLAUSES = ["Küçük bir ipucu:", "Küçük bir bilgi:", "İpucu:", "Unutma:", "Hatırlatma:"];

const TAIL_OUTS = [
  "nasıl dersin?",
  "nasıl söylersin?",
  "nasıl sorulur?",
  "nasıl sorarsın?",
  "demek için ne dersin?",
  "demek için hangi cümleyi kullanırsın?",
  "demek için hangi Almanca cümleyi kullanırsın?",
  "Lütfen söyle.",
  "Lütfen söyleyin.",
  "Lütfen deyin.",
];

export function examStem(say: Segment[]): string {
  let text = say
    .map((s) => (s.lang === "tr" ? s.text : s.text))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  for (const lead of LEAD_INS) {
    if (text.startsWith(lead)) {
      text = text.slice(lead.length).trim();
      break;
    }
  }
  for (const tail of TAIL_OUTS) {
    const at = text.toLocaleLowerCase("tr-TR").lastIndexOf(tail.toLocaleLowerCase("tr-TR"));
    if (at >= 0 && at > text.length - tail.length - 3) {
      text = text.slice(0, at).trim();
      break;
    }
  }
  // Ders ipuçları sınav kâğıdına geçmez: anlatımda "ilk yanlıştan sonra
  // söylenecek şey" olarak yazılmışlar, sınavda ise kural gereği ipucu yok.
  for (const hint of HINT_CLAUSES) {
    const at = text.indexOf(hint);
    if (at > 10) text = text.slice(0, at).trim();
  }
  // Çerçeve atılınca başta kalan bağlaç ya da sonda kalan noktalama.
  text = text.replace(/^[,;:–—-]\s*/, "").replace(/[,;:–—]\s*$/, "").trim();
  return text.charAt(0).toLocaleUpperCase("tr-TR") + text.slice(1);
}

/**
 * Cevabı ele veren madde sınava girmez.
 *
 * Anlatımda bazı üretim adımları cümleyi önce ÖRNEK olarak veriyor, sonra
 * söyletiyor ("Almancası: Ich hole dich um acht ab. Şimdi sen söyle: …").
 * Derste bu doğru bir basamak; sınavda cevabın soruda yazılı olması demek.
 */
export function selfAnswering(item: { prompt: string; de: string }): boolean {
  const prompt = foldSentence(item.prompt);
  const words = foldSentence(item.de).split(" ").filter(Boolean);
  if (!words.length) return true;
  // Hedefin soruda geçen en uzun kesintisiz parçası. Eşik %70: bağlaç
  // modülünde yönerge cümlenin başını İSKELE olarak veriyor ("Nachdem ich
  // die Zusage bekommen hatte, …") ve kalanı öğrenci kuruyor — bu geçerli
  // bir üretim maddesi. Cümlenin neredeyse tamamı yazılıysa değil.
  let longest = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = words.length; j > i + longest; j--) {
      if (prompt.includes(words.slice(i, j).join(" "))) {
        longest = j - i;
        break;
      }
    }
  }
  return longest / words.length >= 0.7;
}

/** Segment dizisini düz metne çevirir — Almanca parçalar korunur. */
export function flatten(segments: Segment[]): string {
  return segments.map((s) => s.text).join(" ").replace(/\s+([.,!?;:])/g, "$1").replace(/\s+/g, " ").trim();
}

export type ProduceItem = {
  id: string;
  lessonId: string;
  lessonTitle: string;
  focusId: string;
  /** Türkçe yönerge — çevrilecek cümle ve varsa onu sabitleyen bağlam. */
  prompt: string;
  /** Beklenen Almanca cümle. */
  de: string;
  /** Eşdeğer kabul edilen kuruluşlar. */
  accept: string[];
};

export type JudgeItem = {
  id: string;
  lessonId: string;
  focusId: string;
  /** Hakkında hüküm verilecek Almanca cümle. */
  statement: string;
  answer: boolean;
  /** Gerekçe — sınav bitince açılır, sırasında değil. */
  why: Segment[];
};

export type PatternItem = {
  id: string;
  lessonId: string;
  lessonTitle: string;
  focusId: string;
  de: string;
  tr: string;
};

export type WordItem = { de: string; tr: string; head: string; lessonId: string };

export type ModuleContent = {
  course: string;
  level: string;
  index: number;
  theme: string;
  lessons: Lesson[];
  /** Modülün dilbilgisi odakları, ders sırasıyla ve tekrarsız. */
  focus: string[];
  produce: ProduceItem[];
  judge: JudgeItem[];
  patterns: PatternItem[];
  words: WordItem[];
  /** Derslerin rol yapma sahneleri — durum maddelerinin kaynağı. */
  scenes: { lessonId: string; scene: string; partner: string; opening: string; openingTr: string }[];
};

/** Modülün dersleri — katalog sırasıyla on ders. */
export function moduleLessons(course: string, level: string, index: number): Lesson[] {
  const inLevel = LESSONS.filter((l) => l.course === course && l.level === level);
  return inLevel.slice(index * MODULE_SIZE, (index + 1) * MODULE_SIZE);
}

/** Kursun bir seviyesindeki modül sayısı. */
export function moduleCount(course: string, level: string): number {
  return Math.ceil(LESSONS.filter((l) => l.course === course && l.level === level).length / MODULE_SIZE);
}

/** Kursun bütün modülleri — `{ level, index }` çiftleri, katalog sırasıyla. */
export function allModules(course: string): { level: string; index: number }[] {
  const out: { level: string; index: number }[] = [];
  const levels: string[] = [];
  for (const l of LESSONS) if (l.course === course && !levels.includes(l.level)) levels.push(l.level);
  for (const level of levels) for (let i = 0; i < moduleCount(course, level); i++) out.push({ level, index: i });
  return out;
}

const CACHE = new Map<string, ModuleContent>();

export function moduleContent(course: string, level: string, index: number): ModuleContent {
  const key = `${course}|${level}|${index}`;
  const hit = CACHE.get(key);
  if (hit) return hit;

  const lessons = moduleLessons(course, level, index);
  const focus: string[] = [];
  const produce: ProduceItem[] = [];
  const judge: JudgeItem[] = [];
  const patterns: PatternItem[] = [];
  const words: WordItem[] = [];
  const scenes: ModuleContent["scenes"] = [];
  const seenWord = new Set<string>();
  const seenPattern = new Set<string>();

  for (const lesson of lessons) {
    if (!focus.includes(lesson.focusId)) focus.push(lesson.focusId);
    let p = 0;
    let j = 0;
    for (const step of lesson.lecture) {
      if (step.expect?.kind === "produce") {
        produce.push({
          id: `${lesson.id}#p${p++}`,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          focusId: lesson.focusId,
          prompt: examStem(step.say),
          de: step.expect.target,
          accept: step.expect.accept ?? [],
        });
      } else if (step.expect?.kind === "truefalse") {
        judge.push({
          id: `${lesson.id}#j${j++}`,
          lessonId: lesson.id,
          focusId: lesson.focusId,
          statement: step.expect.statement,
          answer: step.expect.answer,
          why: step.expect.why,
        });
      }
    }
    for (const pattern of lesson.patterns) {
      const dedup = pattern.de.toLocaleLowerCase("de-DE");
      if (seenPattern.has(dedup)) continue;
      seenPattern.add(dedup);
      patterns.push({
        id: `${lesson.id}#k${patterns.length}`,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        focusId: lesson.focusId,
        de: pattern.de,
        tr: pattern.tr,
      });
    }
    for (const v of lesson.vocab) {
      const head = headword(v.de);
      if (!head || seenWord.has(head)) continue;
      seenWord.add(head);
      words.push({ de: v.de, tr: v.tr, head, lessonId: lesson.id });
    }
    scenes.push({
      lessonId: lesson.id,
      scene: lesson.roleplay.scene,
      partner: lesson.roleplay.partner,
      opening: lesson.roleplay.opening,
      openingTr: lesson.roleplay.openingTr,
    });
  }

  const content: ModuleContent = {
    course,
    level,
    index,
    theme: moduleTheme(level, index),
    lessons,
    focus,
    produce,
    judge,
    patterns,
    words,
    scenes,
  };
  CACHE.set(key, content);
  return content;
}

/**
 * Ders odağı → cheatsheet sayfası.
 *
 * Modülün dilbilgisi bölümü seviye havuzundan değil MODÜLÜN konularından
 * kuruluyor; bunun için derslerin `focusId` etiketleriyle tablo sayfalarını
 * birbirine bağlayan bir köprü gerekiyor. Köprü elle yazılı, çünkü iki taraf
 * ayrı sözlükler: ders "Akkusativ-einen" diyor, tablo "a1-artikel".
 *
 * Bir odak birden çok sayfaya bağlanabilir (Perfekt hem ortaç tablosunda hem
 * fiil listesinde geçer). Eşleşmeyen odak sessizce düşmez —
 * `scripts/check-exams.ts` haritada olmayan bir focusId'yi hata sayıyor.
 */
export const FOCUS_SHEETS: Record<string, string[]> = {
  "Vorstellung": ["a1-praesens", "a1-sein-haben"],
  "Konjugation-Präsens": ["a1-praesens"],
  "W-Fragen": ["a1-wfragen"],
  "Ja-Nein-Fragen": ["a1-satzbau", "a1-wfragen"],
  "Zahlen-Preise": ["a1-zahlen"],
  "Uhrzeit": ["a1-zahlen"],
  "Sein-Haben": ["a1-sein-haben"],
  "Possessiv": ["a1-possessiv"],
  "Artikel": ["a1-artikel"],
  "Akkusativ": ["a1-artikel"],
  "Akkusativ-einen": ["a1-artikel"],
  "Dativ": ["a1-artikel", "a1-pronomen"],
  "Personalpronomen-Dativ": ["a1-pronomen"],
  "Negation-kein": ["a1-negation"],
  "Negation-nicht": ["a1-negation"],
  "Plural": ["a1-plural"],
  "Modalverb-möchten": ["a1-modalverben"],
  "Modalverb-können": ["a1-modalverben"],
  "Modalverb-müssen": ["a1-modalverben"],
  "Modalverb-dürfen": ["a1-modalverben"],
  "Modalverb-wollen": ["a1-modalverben"],
  "Modalverb-sollen": ["a1-modalverben"],
  "Gern-lieber": ["a2-komparativ"],
  "Dativ-gefallen": ["a2-dativverben"],
  "Imperativ-Sie": ["a2-imperativ"],
  "Imperativ-du": ["a2-imperativ"],
  "Präposition-mit": ["a1-praepositionen"],
  "Präposition-in-an-auf": ["a1-praepositionen"],
  "Dativ-Präpositionen": ["a1-praepositionen"],
  "Temporal-am-um": ["a1-praepositionen", "a1-zahlen"],
  "Es-gibt": ["a1-artikel", "a1-satzbau"],
  "Trennbare-Verben": ["a1-trennbar"],
  "V2-Regel": ["a1-satzbau"],
  "Perfekt-Einstieg": ["a1-perfekt"],
  "Perfekt": ["a2-perfekt-partizip", "a1-perfekt"],
  "Perfekt-unregelmäßig": ["a2-perfekt-partizip", "a2-verben"],
  "Perfekt-trennbar": ["a2-perfekt-partizip", "a1-trennbar"],
  "Präteritum": ["a2-praeteritum", "a2-verben"],
  "Präteritum-sein-haben": ["a2-praeteritum"],
  "Präteritum-Modal": ["a2-praeteritum"],
  "Plusquamperfekt": ["b1-plusquamperfekt"],
  "Reflexivverben": ["a2-reflexiv"],
  "Wechselpräpositionen": ["a2-wechselpraepositionen"],
  "Verben-mit-Präpositionen": ["a2-verben-praeposition"],
  "Komparativ": ["a2-komparativ"],
  "Superlativ": ["a2-komparativ"],
  "Adjektivdeklination-Einstieg": ["a2-adjektive"],
  "Adjektivdeklination": ["a2-adjektive", "b1-adjektiv-nomen"],
  "Ordinalzahlen-Datum": ["a2-ordinalzahlen"],
  "Futur-werden": ["b1-futur"],
  "Konjunktiv-II": ["b1-konjunktiv2", "a2-hoeflich"],
  "Passiv-Präsens": ["b1-passiv"],
  "Passiv-Präteritum": ["b1-passiv"],
  "Um-zu": ["b1-infinitiv-zu"],
  "Relativsatz-Nominativ": ["b1-relativsatz"],
  "Relativsatz-Akkusativ": ["b1-relativsatz"],
  "Relativsatz-Dativ": ["b1-relativsatz"],
  "Relativsatz-Präposition": ["b1-relativsatz", "b1-da-wo"],
  "Indirekte-Frage": ["a2-nebensatz", "b1-konnektoren"],
  "Konnektor-denn": ["a2-nebensatz", "b1-konnektoren"],
  "Zweiteilige-Konnektoren": ["b1-konnektoren"],
  "Nebensatz-weil": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-dass": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-wenn": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-obwohl": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-als": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-nachdem": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-bevor-während": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-damit": ["a2-nebensatz", "b1-konnektoren"],
};

/** Modülün odaklarının açtığı tablo sayfaları — tekrarsız. */
export function moduleSheets(content: Pick<ModuleContent, "focus">): string[] {
  const out: string[] = [];
  for (const focus of content.focus) for (const sheet of FOCUS_SHEETS[focus] ?? []) if (!out.includes(sheet)) out.push(sheet);
  return out;
}
