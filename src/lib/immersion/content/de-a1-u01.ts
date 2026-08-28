import type { SkillQuestion } from "@/lib/skills/types";

/**
 * A1 · Ünite 1 "Tanışma ve ben" — elle yazılmış gramer / quiz / bitiş sınavı.
 *
 * Yalnızca bu ünitenin kelime + kalıplarıyla (bkz. a1-u01.ts başlığı). A1'in ilk
 * ünitesi: öğrenci neredeyse hiçbir şey bilmez, o yüzden her soru tek kavram
 * ölçer ve açıklaması Türkçe, sözlük gibi net. Sorular immersion quiz/gramer
 * oynatıcısında (QuestionList) render edilir.
 *
 * grammar → /immersion/grammar/[unit] · quiz → /immersion/quiz/[unit] ·
 * checkpoint → /immersion/quiz/[unit]?mode=checkpoint (elle yazılan öncelikli,
 * yoksa deriveQuiz devreye girer).
 */

/** Odak: fiil çekimi (ich/du/Sie), du↔Sie, W-soruları. */
export const grammar: SkillQuestion[] = [
  {
    kind: "mcq",
    text: "Ich ___ Mia.",
    options: ["heiße", "heißt", "heißen"],
    answer: 0,
    explain: "„ich“ ile fiil -e ile biter: ich heiße. (du heißt, Sie heißen)",
  },
  {
    kind: "mcq",
    text: "Wie ___ du?",
    options: ["heißt", "heiße", "heißen"],
    answer: 0,
    explain: "„du“ ile fiil -st/-t alır: du heißt. „Wie heißt du?“ = adını sorar.",
  },
  {
    kind: "mcq",
    text: "Ich ___ in Berlin.",
    options: ["wohne", "wohnst", "wohnen"],
    answer: 0,
    explain: "„ich wohne“ — „ich“ ile -e. „Ich wohne in …“ = nerede oturduğun.",
  },
  {
    kind: "mcq",
    text: "Woher ___ Sie? (resmî)",
    options: ["kommen", "kommst", "komme"],
    answer: 0,
    explain: "Resmî „Sie“ ile fiil -en: Sie kommen. „Woher kommen Sie?“",
  },
  {
    kind: "mcq",
    text: "Bir arkadaşına adını nasıl sorarsın? (samimi)",
    options: ["Wie heißt du?", "Wie heißen Sie?", "Was ist das?"],
    answer: 0,
    explain: "Samimi hâl „du“: „Wie heißt du?“. „Wie heißen Sie?“ resmîdir (Sie).",
  },
  {
    kind: "mcq",
    text: "Tanımadığın birine kibarca sormak istersin. Hangisi?",
    options: ["Wie heißen Sie?", "Wie heißt du?", "Und dir?"],
    answer: 0,
    explain: "Resmî/kibar hâl „Sie“: „Wie heißen Sie?“",
  },
  {
    kind: "mcq",
    text: "___ wohnst du?  (nerede oturduğunu sorar)",
    options: ["Wo", "Woher", "Was"],
    answer: 0,
    explain: "„wo“ = nerede (yer). „woher“ = nereden (memleket). „was“ = ne.",
  },
  {
    kind: "mcq",
    text: "___ kommst du?  (memleketini sorar)",
    options: ["Woher", "Wo", "Wie"],
    answer: 0,
    explain: "„woher“ = nereden. „Woher kommst du?“ = nerelisin.",
  },
];

/** Kelime + kalıp hatırlama (temiz distraktörlü). */
export const quiz: SkillQuestion[] = [
  { kind: "mcq", text: "«danke» ne demek?", options: ["teşekkürler", "merhaba", "yorgun"], answer: 0, explain: "danke = teşekkürler." },
  { kind: "mcq", text: "«müde» ne demek?", options: ["yorgun", "kibar", "iyi"], answer: 0, explain: "müde = yorgun." },
  { kind: "mcq", text: "«schlecht» ne demek?", options: ["kötü", "iyi", "şehir"], answer: 0, explain: "schlecht = kötü (gut = iyi'nin zıddı)." },
  { kind: "mcq", text: "«die Stadt» ne demek?", options: ["şehir", "ülke", "isim"], answer: 0, explain: "die Stadt = şehir. das Land = ülke." },
  { kind: "mcq", text: "«woher» ne demek?", options: ["nereden", "nerede", "ne"], answer: 0, explain: "woher = nereden. wo = nerede." },
  { kind: "mcq", text: "«der Chef» ne demek?", options: ["patron", "iş arkadaşı", "isim"], answer: 0, explain: "der Chef = patron. die Kollegin = (kadın) iş arkadaşı." },
  { kind: "mcq", text: "«Nasılsın?» (bir arkadaşına) Almanca nasıl denir?", options: ["Wie geht es dir?", "Woher kommst du?", "Was ist das?"], answer: 0, explain: "„Wie geht es dir?“ — samimi „nasılsın“." },
  { kind: "mcq", text: "«Kendi hâlini söyler: iyiyim» hangisi?", options: ["Mir geht es gut.", "Wie geht es dir?", "Und dir?"], answer: 0, explain: "„Mir geht es gut.“ = iyiyim." },
];

/** Bitiş sınavı — ünitenin tamamı (kelime + gramer + kalıp + mini okuma). ≥%70 geç. */
export const checkpoint: SkillQuestion[] = [
  {
    kind: "mcq",
    text: "Lisa sagt: „Ich komme aus Österreich.“ Woher kommt Lisa?",
    options: ["aus Österreich", "aus der Türkei", "aus Italien"],
    answer: 0,
    explain: "„Ich komme aus Österreich“ — Lisa Avusturya'dan.",
  },
  {
    kind: "mcq",
    text: "„Ich wohne in Berlin.“ ne anlama gelir?",
    options: ["Berlin'de oturuyorum.", "Berlin'den geliyorum.", "Adım Berlin."],
    answer: 0,
    explain: "wohnen in = -de oturmak. „Ich wohne in Berlin.“ = Berlin'de otururum.",
  },
  { kind: "mcq", text: "Ich ___ Ali.", options: ["heiße", "heißt", "heißen"], answer: 0, explain: "ich heiße — „ich“ ile -e." },
  { kind: "mcq", text: "Wie ___ du?", options: ["heißt", "heiße", "heißen"], answer: 0, explain: "du heißt — „du“ ile -st/-t." },
  { kind: "mcq", text: "Woher ___ Sie? (resmî)", options: ["kommen", "kommst", "komme"], answer: 0, explain: "Sie kommen — resmî „Sie“ ile -en." },
  { kind: "mcq", text: "___ wohnst du?", options: ["Wo", "Woher", "Was"], answer: 0, explain: "wo = nerede (yer sorar)." },
  { kind: "mcq", text: "«gut» ne demek?", options: ["iyi", "kötü", "yorgun"], answer: 0, explain: "gut = iyi." },
  { kind: "mcq", text: "«das Land» ne demek?", options: ["ülke", "şehir", "patron"], answer: 0, explain: "das Land = ülke." },
  { kind: "mcq", text: "Bir arkadaşına adını sormak istersin. Hangisi?", options: ["Wie heißt du?", "Wie heißen Sie?", "Wo wohnst du?"], answer: 0, explain: "Samimi: „Wie heißt du?“" },
  { kind: "mcq", text: "„___ Sie Frau Yılmaz?“ (kibarca 'siz … misiniz')", options: ["Sind", "Bist", "Ist"], answer: 0, explain: "„Sind Sie …?“ = kibarca 'siz … misiniz'." },
];
