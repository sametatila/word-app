import type { Authored } from "./types";

/**
 * A1 · Ünite 1 "Tanışma ve ben" — elle yazılmış gramer / quiz / bitiş sınavı.
 *
 * Yalnızca bu ünitenin kelime + kalıplarıyla (bkz. a1-u01.ts başlığı). A1'in ilk
 * ünitesi: öğrenci neredeyse hiçbir şey bilmez, o yüzden her soru tek kavram
 * ölçer ve açıklaması sözlük gibi net. Sorular immersion quiz/gramer
 * oynatıcısında (QuestionList) render edilir.
 *
 * grammar → /immersion/grammar/[unit] · quiz → /immersion/quiz/[unit] ·
 * unitQuiz → /immersion/quiz/[unit]?mode=unitQuiz (elle yazılan öncelikli,
 * yoksa deriveQuiz devreye girer).
 *
 * ANADİLE GÖRE (2026-09-25). Soru kökü ve açıklama Türkçe yazılmıştı; anadili
 * İngilizce olan öğrenci bu ünitede Türkçe soru görüyordu. Kurs dilindeki
 * metin (Almanca cümle, Almanca şık) düz dize, anadildeki metin `{ tr, en }`.
 * Doğru şık HER ZAMAN ilk yazılıyor; yeri `unitQuestions` tohumla karıştırıyor
 * (eskiden bütün cevaplar A şıkkıydı).
 *
 * MOBİLDE AYNI VERİ: `mobile/src/data/authoredUnits.ts`. "VERİ BAŞI" ile
 * "VERİ SONU" arası iki dosyada birebir aynı olmak zorunda (`check:parity`).
 */

/* VERİ BAŞI */
/** Odak: fiil çekimi (ich/du/Sie), du↔Sie, W-soruları. */
export const grammar: Authored[] = [
  {
    text: "Ich ___ Mia.",
    options: ["heiße", "heißt", "heißen"],
    explain: {
      tr: "„ich“ ile fiil -e ile biter: ich heiße (du heißt, Sie heißen).",
      en: "With „ich“ the verb ends in -e: ich heiße (du heißt, Sie heißen).",
    },
  },
  {
    text: "Wie ___ du?",
    options: ["heißt", "heiße", "heißen"],
    explain: {
      tr: "„du“ ile fiil -st alır, heißen'de yalnız -t: du heißt. „Wie heißt du?“ adını sorar.",
      en: "With „du“ the verb takes -st, and heißen only adds -t: du heißt. „Wie heißt du?“ asks someone's name.",
    },
  },
  {
    text: "Ich ___ in Berlin.",
    options: ["wohne", "wohnst", "wohnen"],
    explain: {
      tr: "„ich“ ile -e: ich wohne. „Ich wohne in …“ nerede oturduğunu söyler.",
      en: "With „ich“ the ending is -e: ich wohne. „Ich wohne in …“ says where you live.",
    },
  },
  {
    text: { tr: "Woher ___ Sie? (resmî)", en: "Woher ___ Sie? (formal)" },
    options: ["kommen", "kommst", "komme"],
    explain: {
      tr: "Resmî „Sie“ ile fiil -en alır: Sie kommen. „Woher kommen Sie?“",
      en: "With formal „Sie“ the verb takes -en: Sie kommen. „Woher kommen Sie?“",
    },
  },
  {
    text: { tr: "Bir arkadaşına adını nasıl sorarsın?", en: "How do you ask a friend their name?" },
    options: ["Wie heißt du?", "Wie heißen Sie?", "Was ist das?"],
    explain: {
      tr: "Arkadaşa „du“ denir: „Wie heißt du?“. „Wie heißen Sie?“ resmîdir.",
      en: "You say „du“ to a friend: „Wie heißt du?“. „Wie heißen Sie?“ is formal.",
    },
  },
  {
    text: { tr: "Tanımadığın birine adını kibarca sormak istiyorsun. Hangisi?", en: "You want to ask a stranger their name politely. Which one?" },
    options: ["Wie heißen Sie?", "Wie heißt du?", "Und dir?"],
    explain: {
      tr: "Kibar hitap „Sie“: „Wie heißen Sie?“",
      en: "The polite form is „Sie“: „Wie heißen Sie?“",
    },
  },
  {
    text: { tr: "___ wohnst du? (nerede oturduğunu sorar)", en: "___ wohnst du? (asks where someone lives)" },
    options: ["Wo", "Woher", "Was"],
    explain: {
      tr: "„wo“ = nerede, „woher“ = nereden, „was“ = ne.",
      en: "„wo“ = where, „woher“ = where from, „was“ = what.",
    },
  },
  {
    text: { tr: "___ kommst du? (nereli olduğunu sorar)", en: "___ kommst du? (asks where someone is from)" },
    options: ["Woher", "Wo", "Wie"],
    explain: {
      tr: "„woher“ = nereden. „Woher kommst du?“ = Nerelisin?",
      en: "„woher“ = where from. „Woher kommst du?“ = Where are you from?",
    },
  },
];

/** Kelime + kalıp hatırlama (temiz çeldiricili). */
export const quiz: Authored[] = [
  {
    text: { tr: "«danke» ne demek?", en: "What does «danke» mean?" },
    options: [{ tr: "teşekkürler", en: "thank you" }, { tr: "merhaba", en: "hello" }, { tr: "yorgun", en: "tired" }],
    explain: { tr: "danke = teşekkürler.", en: "danke = thank you." },
  },
  {
    text: { tr: "«müde» ne demek?", en: "What does «müde» mean?" },
    options: [{ tr: "yorgun", en: "tired" }, { tr: "kibar", en: "polite" }, { tr: "iyi", en: "good" }],
    explain: { tr: "müde = yorgun.", en: "müde = tired." },
  },
  {
    text: { tr: "«schlecht» ne demek?", en: "What does «schlecht» mean?" },
    options: [{ tr: "kötü", en: "bad" }, { tr: "iyi", en: "good" }, { tr: "şehir", en: "city" }],
    explain: { tr: "schlecht = kötü; zıddı gut (iyi).", en: "schlecht = bad; its opposite is gut (good)." },
  },
  {
    text: { tr: "«die Stadt» ne demek?", en: "What does «die Stadt» mean?" },
    options: [{ tr: "şehir", en: "city" }, { tr: "ülke", en: "country" }, { tr: "isim", en: "name" }],
    explain: { tr: "die Stadt = şehir; das Land = ülke.", en: "die Stadt = city; das Land = country." },
  },
  {
    text: { tr: "«woher» ne demek?", en: "What does «woher» mean?" },
    options: [{ tr: "nereden", en: "where from" }, { tr: "nerede", en: "where" }, { tr: "ne", en: "what" }],
    explain: { tr: "woher = nereden; wo = nerede.", en: "woher = where from; wo = where." },
  },
  {
    text: { tr: "«der Chef» ne demek?", en: "What does «der Chef» mean?" },
    options: [{ tr: "patron", en: "boss" }, { tr: "iş arkadaşı", en: "colleague" }, { tr: "isim", en: "name" }],
    explain: { tr: "der Chef = patron; die Kollegin = (kadın) iş arkadaşı.", en: "der Chef = boss; die Kollegin = (female) colleague." },
  },
  {
    text: { tr: "Bir arkadaşına «Nasılsın?» Almanca nasıl denir?", en: "How do you say «How are you?» to a friend in German?" },
    options: ["Wie geht es dir?", "Woher kommst du?", "Was ist das?"],
    explain: { tr: "„Wie geht es dir?“ arkadaşa sorulan „Nasılsın?“dır.", en: "„Wie geht es dir?“ is the informal „How are you?“." },
  },
  {
    text: { tr: "«İyiyim» Almanca nasıl denir?", en: "How do you say «I'm fine» in German?" },
    options: ["Mir geht es gut.", "Wie geht es dir?", "Und dir?"],
    explain: { tr: "„Mir geht es gut.“ = İyiyim.", en: "„Mir geht es gut.“ = I'm fine." },
  },
];

/** Bitiş sınavı — ünitenin tamamı (kelime + gramer + kalıp + mini okuma). ≥%70 geç. */
export const unitQuiz: Authored[] = [
  {
    text: "Lisa sagt: „Ich komme aus Österreich.“ Woher kommt Lisa?",
    options: ["aus Österreich", "aus der Türkei", "aus Italien"],
    explain: { tr: "„Ich komme aus Österreich.“ Lisa Avusturyalı.", en: "„Ich komme aus Österreich.“ Lisa is from Austria." },
  },
  {
    text: { tr: "„Ich wohne in Berlin.“ ne demek?", en: "What does „Ich wohne in Berlin.“ mean?" },
    options: [
      { tr: "Berlin'de oturuyorum.", en: "I live in Berlin." },
      { tr: "Berlin'den geliyorum.", en: "I come from Berlin." },
      { tr: "Adım Berlin.", en: "My name is Berlin." },
    ],
    explain: { tr: "wohnen in = -de oturmak: Berlin'de oturuyorum.", en: "wohnen in = to live in: I live in Berlin." },
  },
  {
    text: "Ich ___ Moritz.",
    options: ["heiße", "heißt", "heißen"],
    explain: { tr: "„ich“ ile -e: ich heiße.", en: "With „ich“ the ending is -e: ich heiße." },
  },
  {
    text: "Wie ___ du?",
    options: ["heißt", "heiße", "heißen"],
    explain: { tr: "„du“ ile -st, heißen'de yalnız -t: du heißt.", en: "With „du“ the ending is -st, for heißen only -t: du heißt." },
  },
  {
    text: { tr: "Woher ___ Sie? (resmî)", en: "Woher ___ Sie? (formal)" },
    options: ["kommen", "kommst", "komme"],
    explain: { tr: "Resmî „Sie“ ile -en: Sie kommen.", en: "With formal „Sie“ the ending is -en: Sie kommen." },
  },
  {
    text: "___ wohnst du?",
    options: ["Wo", "Woher", "Was"],
    explain: { tr: "„wo“ = nerede; yer sorar.", en: "„wo“ = where; it asks about a place." },
  },
  {
    text: { tr: "«gut» ne demek?", en: "What does «gut» mean?" },
    options: [{ tr: "iyi", en: "good" }, { tr: "kötü", en: "bad" }, { tr: "yorgun", en: "tired" }],
    explain: { tr: "gut = iyi.", en: "gut = good." },
  },
  {
    text: { tr: "«das Land» ne demek?", en: "What does «das Land» mean?" },
    options: [{ tr: "ülke", en: "country" }, { tr: "şehir", en: "city" }, { tr: "patron", en: "boss" }],
    explain: { tr: "das Land = ülke.", en: "das Land = country." },
  },
  {
    text: { tr: "Bir arkadaşına adını sormak istiyorsun. Hangisi?", en: "You want to ask a friend their name. Which one?" },
    options: ["Wie heißt du?", "Wie heißen Sie?", "Wo wohnst du?"],
    explain: { tr: "Arkadaşa „du“: „Wie heißt du?“", en: "To a friend you say „du“: „Wie heißt du?“" },
  },
  {
    text: { tr: "„___ Sie Frau Lutz?“ (kibarca: Lutz Hanım siz misiniz?)", en: "„___ Sie Frau Lutz?“ (politely: Are you Ms Lutz?)" },
    options: ["Sind", "Bist", "Ist"],
    explain: { tr: "„Sind Sie …?“ kibarca „Siz … misiniz?“ diye sorar.", en: "„Sind Sie …?“ is the polite way to ask „Are you …?“." },
  },
];
/* VERİ SONU */
