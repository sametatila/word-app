import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 7 — "Mayısta denetlenen, ne değişti, hiçbir yerde
 * yazmıyor, taşınmış olmalı".
 *
 * Dört ders: Which was checked in May · What was changed ·
 * Nowhere is it written · It must have been moved.
 *
 *   Kelime: sensor, manual, govern, trial, column, row, cell, footnote,
 *           entry, inventory, surplus, reserve, overtime, warehouse,
 *           workshop, align, safeguard, precaution, outage, guard,
 *           vulnerability, negligence, violation, omission, disruption,
 *           maintenance, lower, upkeep, restoration, collapse, jam,
 *           insert.
 *   Kalıp:  The sensor, which was checked in May, failed. ·
 *           The manual, which is why we stopped, is old. ·
 *           The rule to which we refer governs the trial. ·
 *           What was changed is the entry. ·
 *           It was the inventory that failed. ·
 *           What is missing is the surplus. ·
 *           Nowhere is it written that a safeguard is optional. ·
 *           Rarely has a precaution been so useful. ·
 *           Only after the outage did they act. ·
 *           The disruption must have been caused by the update. ·
 *           The maintenance can't have been done last week. ·
 *           Someone should have lowered the pressure.
 *
 * Ünitenin tek öğretme noktası KİPLİ EDİLGENİN GEÇMİŞE DÖNÜK HÂLİ. Ünite
 * 2 ve 4 geçmişe dönük kipleri, ünite 6 edilgeni ayrı ayrı öğretmişti;
 * burada ikisi üst üste biniyor ve dizilişte tek bir seçenek kalıyor:
 * „must“ + „have“ + „been“ + üçüncü hâl. Dört sözcük, tek sıra.
 */
export const enB2U07: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u07-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 7,
    title: "It must have been moved",
    genre: "info",
    intro: "Dört sözcüklük fiil. Başka bir sırası var mı?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "whole", tr: "bütün" },
      { de: "unit", tr: "ünite" },
      { de: "modal", tr: "kip" },
      { de: "passive", tr: "edilgen" },
      { de: "sentence", tr: "cümle" },
      { de: "active", tr: "etken" },
      { de: "produces", tr: "üretiyor" },
      { de: "event", tr: "olay" },
      { de: "unknown", tr: "bilinmeyen" },
      { de: "build", tr: "kurmak" },
      { de: "stacked", tr: "üst üste bindirilmiş" },
      { de: "a conclusion", tr: "çıkarım" },
      { de: "drawn", tr: "çıkarılmış" },
      { de: "an arrangement", tr: "diziliş" },
      { de: "allowed", tr: "izinli" },
      { de: "an investigation", tr: "soruşturma" },
      { de: "an agent", tr: "eyleyen" },
      { de: "at face value", tr: "olduğu gibi" },
      { de: "the field", tr: "alan" },
      { de: "the tower", tr: "kule" },
      { de: "poor", tr: "kötü" },
      { de: "the test", tr: "sınama" },
      { de: "the third form", tr: "üçüncü hâl" },
      { de: "count", tr: "saymak" },
    ],
    minutes: 9,
    text:
      "The disruption must have been caused by the update. Count the verb: must, have, been, caused. Four words, and they cannot be put in any other order.\n" +
      "That is the whole of this unit and it is worth being slow about. Two things have been stacked on top of each other. „Must have“ is the modal pointed at the past — a conclusion drawn from evidence. „Been caused“ is the passive — the thing that acted is not the subject.\n" +
      "Put them together and the order is fixed: the modal first, then „have“, then „been“, then the third form. Nothing is allowed to move, and no other arrangement of those four words is a sentence in English.\n" +
      "The maintenance can't have been done last week. The same four words with a negative conclusion, and again nothing has changed position. „Can't have been done“ is the only order there is.\n" +
      "Someone should have lowered the pressure. That one is shorter because it is active, and it is doing the third job: not reading the evidence but naming what was not done.\n" +
      "Why does a report need this shape at all? Because the two things it joins are exactly what an investigation produces. There is a conclusion from evidence, and there is an event whose agent is unknown. „The update caused the disruption“ claims to know who. „The disruption must have been caused by the update“ claims only that the evidence points there, and a reader in this field takes it at face value.\n" +
      "The upkeep on that line has been poor for a year. A restoration is planned. Neither sentence needs a modal, and that is the test: if the evidence is not being read, do not build the tower.",
    questions: [
      {
        text: "How many words are in that verb?",
        options: ["four", "three", "five"],
        answer: 0,
        explain: "„Count the verb: must, have, been, caused. Four words…“",
      },
      {
        text: "What does the active version claim?",
        options: ["to know who", "to have evidence", "to be shorter"],
        answer: 0,
        explain: "„„The update caused the disruption“ claims to know who.“",
      },
      {
        kind: "truefalse",
        text: "The four words can be arranged in another order.",
        options: ["True", "False"],
        answer: 1,
        explain: "„no other arrangement of those four words is a sentence in English.“",
      },
      {
        kind: "gapfill",
        text: "The maintenance can't have been ___ last week.",
        options: [],
        answer: 0,
        accept: ["done"],
        explain: "„The maintenance can't have been done last week.“",
      },
      {
        kind: "order",
        text: "Fiilin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: ["must", "have", "been", "caused"],
        explain: "Kip, „have“, „been“, üçüncü hâl. Tek sıra.",
      },
      {
        kind: "short_answer",
        text: "When should you not build the tower?",
        options: [],
        answer: 0,
        accept: ["if no evidence is read", "when there is no reading", "if nothing is read"],
        explain: "„if the evidence is not being read, do not build the tower.“",
      },
    ],
  },
  {
    id: "en-b2-u07-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 7,
    title: "Nowhere is it written",
    genre: "opinion",
    intro: "Üç tetikleyici, tek kural. Olumsuz nerede duruyor?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "element", tr: "öğe" },
      { de: "phrase", tr: "öbek" },
      { de: "appears", tr: "beliriyor" },
      { de: "inversion", tr: "devrik sıra" },
      { de: "sentences", tr: "cümleler" },
      { de: "reaches", tr: "ulaşıyor" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "middle", tr: "orta" },
      { de: "plain", tr: "yalın" },
      { de: "bury", tr: "gömüyor" },
      { de: "the auxiliary", tr: "yardımcı fiil" },
      { de: "jumps", tr: "atlıyor" },
      { de: "fronted", tr: "öne çıkarılmış" },
      { de: "a restriction", tr: "sınırlama" },
      { de: "a trigger", tr: "tetikleyici" },
      { de: "restrictive", tr: "sınırlayıcı" },
      { de: "buries", tr: "gömüyor" },
      { de: "skimming", tr: "göz gezdiren" },
      { de: "quoted", tr: "alıntılanmış" },
      { de: "a recommendation", tr: "öneri" },
      { de: "slightly", tr: "biraz" },
      { de: "turns up", tr: "ortaya çıkıyor" },
      { de: "in between", tr: "aralarında" },
    ],
    minutes: 9,
    text:
      "Nowhere is it written that a safeguard is optional. „Nowhere“ at the front, and „is“ has moved ahead of „it“ — the same door that „rarely“ and „never“ open.\n" +
      "Rarely has a precaution been so useful. Here the auxiliary is „has“ and it jumps over „a precaution“, which is the subject. The rest of the verb stays where it was.\n" +
      "Only after the outage did they act. The fronted element is a phrase about time, „only“ makes it a restriction, and „did“ appears in the main clause to carry the inversion — the same „do“ that turns up in a question when there is nothing else to move.\n" +
      "Three sentences, three triggers, one rule: negative or restrictive at the front, auxiliary before subject, and the change always happens in the clause that follows.\n" +
      "The reason a report about an outage reaches for this shape is that it is the only way to put the negative first. „It is not written anywhere that a safeguard is optional“ says the same thing and buries the „not“ in the middle, where a reader skimming a page of findings will not see it.\n" +
      "There is a cost and it is the same as always. The shape is formal, it is slightly old, and a page with four of them reads as a page written by somebody who wants to be quoted. One at the top of the findings, one at the end if the end is a recommendation, and plain sentences in between.",
    questions: [
      {
        text: "Why use this shape in a report?",
        options: ["to put the negative first", "to make it shorter", "to hide the source"],
        answer: 0,
        explain: "„it is the only way to put the negative first.“",
      },
      {
        text: "What makes „after the outage“ a trigger?",
        options: ["the word „only“", "the word „after“", "the word „outage“"],
        answer: 0,
        explain: "„„only“ makes it a restriction…“",
      },
      {
        kind: "truefalse",
        text: "Four of them on a page is good practice.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a page with four of them reads as a page written by somebody who wants to be quoted.“",
      },
      {
        kind: "gapfill",
        text: "Rarely ___ a precaution been so useful.",
        options: [],
        answer: 0,
        accept: ["has"],
        explain: "„Rarely has a precaution been so useful.“",
      },
      {
        kind: "order",
        text: "Üç tetikleyicinin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Nowhere is it written that a safeguard is optional.",
          "Rarely has a precaution been so useful.",
          "Only after the outage did they act.",
          "Negative or restrictive at the front, auxiliary before subject.",
        ],
        explain: "Üç örnek, en sonda tek kural.",
      },
      {
        kind: "short_answer",
        text: "Where does the plain version bury the „not“?",
        options: [],
        answer: 0,
        accept: ["in the middle", "the middle", "not at the front"],
        explain: "„buries the „not“ in the middle…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u07-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 7,
    title: "Which was checked in May",
    genre: "dialogue",
    intro: "Bir bulgu cümlesi. Virgüller neyi değiştiriyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "whole", tr: "bütün" },
      { de: "a finding", tr: "bulgu" },
      { de: "extra", tr: "fazladan" },
      { de: "several", tr: "birkaç" },
      { de: "a preposition", tr: "edat" },
      { de: "the register", tr: "dil düzeyi" },
      { de: "traced", tr: "izi sürülmüş" },
      { de: "whatever", tr: "her ne" },
      { de: "governed", tr: "düzenlenen" },
      { de: "miss", tr: "kaçırmak" },
      { de: "a comma", tr: "virgül" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Sinem", text: "The sensor, which was checked in May, failed. Two commas, and everything between them is extra." },
      { speaker: "Tarık", text: "Extra meaning not needed?" },
      { speaker: "Sinem", text: "Extra meaning not choosing. There is one sensor on that line. Take the commas out and the sentence says there are several and we mean the May one, which would be a different finding." },
      { speaker: "Tarık", text: "And the manual?" },
      { speaker: "Sinem", text: "The manual, which is why we stopped, is old. „Which“ there is pointing at the whole idea — the manual being old is the reason — and „that“ cannot do it." },
      { speaker: "Tarık", text: "The third line is the one I never write." },
      { speaker: "Sinem", text: "The rule to which we refer governs the trial. The preposition has gone in front of „which“, and that is the only place it can be in this register." },
      { speaker: "Tarık", text: "In speech?" },
      { speaker: "Sinem", text: "„The rule we refer to“, and it is correct. The difference is who is reading, not what is right." },
      { speaker: "Tarık", text: "So the footnote." },
      { speaker: "Sinem", text: "The footnote carries the column and the row. A finding that cannot be traced to a cell is not a finding, whatever the grammar around it is doing." },
      { speaker: "Tarık", text: "And the trial?" },
      { speaker: "Sinem", text: "The trial is governed by the rule in that footnote, which is why the sentence puts „to which we refer“ where a reader cannot miss it." },
    ],
    questions: [
      {
        text: "How many sensors are on that line?",
        options: ["one", "several", "two"],
        answer: 0,
        explain: "„There is one sensor on that line.“",
      },
      {
        text: "Where does the preposition go in that register?",
        options: ["in front of „which“", "at the end", "after the comma"],
        answer: 0,
        explain: "„The preposition has gone in front of „which“…“",
      },
      {
        kind: "truefalse",
        text: "„The rule we refer to“ is wrong.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„The rule we refer to“, and it is correct.“",
      },
      {
        kind: "gapfill",
        text: "The rule to ___ we refer governs the trial.",
        options: [],
        answer: 0,
        accept: ["which"],
        explain: "„The rule to which we refer governs the trial.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The sensor, which was checked in May, failed.", "The sensor, which was checked in May, failed"],
        explain: "Virgüller cümleciği fazladan yapıyor; tek bir algılayıcı var.",
      },
      {
        kind: "short_answer",
        text: "What is not a finding?",
        options: [],
        answer: 0,
        accept: ["one without a cell", "one with no row", "one with no source"],
        explain: "„A finding that cannot be traced to a cell is not a finding…“",
      },
    ],
  },
  {
    id: "en-b2-u07-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 7,
    title: "What was changed",
    genre: "monologue",
    intro: "Yarık cümle bir memoda. Kaç tane yeter?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "exists", tr: "var" },
      { de: "plain", tr: "yalın" },
      { de: "noun", tr: "isim" },
      { de: "cleft", tr: "yarık cümle" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "ninth", tr: "ayın dokuzu" },
      { de: "the light", tr: "ışık" },
      { de: "a gap", tr: "boşluk" },
      { de: "a tool", tr: "araç" },
      { de: "wondering", tr: "merak etmek" },
      { de: "flat", tr: "düz" },
      { de: "a table", tr: "çizelge" },
      { de: "above", tr: "üstünde" },
      { de: "allow", tr: "izin vermek" },
      { de: "free", tr: "serbest" },
      { de: "at all", tr: "hiç" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ozan", text: "What was changed is the entry. Not the inventory, not the warehouse count, not the reserve: the entry." },
      { speaker: "Ozan", text: "That sentence exists because the plain one does not work here. „The entry was changed“ is true, and it leaves the reader free to go on wondering about the warehouse." },
      { speaker: "Ozan", text: "It was the inventory that failed. The second shape, and it puts the light on a noun instead of opening a gap first." },
      { speaker: "Ozan", text: "The two are not the same tool. The first says what the subject of this paragraph is. The second answers a question somebody has already asked." },
      { speaker: "Ozan", text: "What is missing is the surplus. Three weeks of overtime in the workshop and a number that does not align, and the sentence names the thing and nothing else." },
      { speaker: "Ozan", text: "I allow one in a memo and two in a report, and the reason is not style." },
      { speaker: "Ozan", text: "A cleft is a claim about what the reader should be looking at, and a page full of them will not let anyone look anywhere." },
      { speaker: "Ozan", text: "The entry was changed on the ninth. That is the flat version and it goes in the table." },
      { speaker: "Ozan", text: "What was changed is the entry. That is the version that goes at the top, above the table, where somebody decides whether to read the table at all." },
    ],
    questions: [
      {
        text: "What was changed?",
        options: ["the entry", "the inventory", "the reserve"],
        answer: 0,
        explain: "„What was changed is the entry.“",
      },
      {
        text: "What does the second shape do?",
        options: ["answers a question already asked", "opens a gap first", "names the paragraph"],
        answer: 0,
        explain: "„The second answers a question somebody has already asked.“",
      },
      {
        kind: "truefalse",
        text: "Ozan allows three in a memo.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I allow one in a memo and two in a report…“",
      },
      {
        kind: "gapfill",
        text: "The entry was changed on the ___.",
        options: [],
        answer: 0,
        accept: ["ninth", "9th"],
        explain: "„The entry was changed on the ninth.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It was the inventory that failed.", "It was the inventory that failed"],
        explain: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "short_answer",
        text: "Where does the flat version go?",
        options: [],
        answer: 0,
        accept: ["in the table", "the table", "with the date"],
        explain: "„That is the flat version and it goes in the table.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u07-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 7,
    title: "The disruption must have been caused by the update",
    genre: "info",
    intro: "Kip ve edilgen üst üste. Sıra hiç değişmiyor.",
    gloss: [
      { de: "must have been caused", tr: "yol açmış olmalı" },
      { de: "can't have been done", tr: "yapılmış olamaz" },
      { de: "should have lowered", tr: "indirmesi gerekirdi" },
      { de: "which was checked", tr: "denetlenen" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Aksamaya güncelleme yol açmış olmalı.",
        answer: "The disruption must have been caused by the update.",
        hint: "Dört sözcük, tek sıra: must, have, been, üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Bakım geçen hafta yapılmış olamaz.",
        answer: "The maintenance can't have been done last week.",
        hint: "Olumsuz çıkarım ve edilgen üst üste; sıra yine aynı.",
      },
      {
        kind: "build",
        tr: "Birinin basıncı indirmesi gerekirdi.",
        answer: "Someone should have lowered the pressure.",
        hint: "Etken ve kısa: yargı, kanıt okuması değil.",
      },
      {
        kind: "build",
        tr: "Mayısta denetlenen algılayıcı arızalandı.",
        answer: "The sensor, which was checked in May, failed.",
        hint: "Virgüller cümleciği fazladan yapıyor.",
      },
      {
        kind: "form",
        prompt: "Aksama kartını doldur.",
        facts: "Aksamanın nedeni güncelleme; bakım geçen hafta yapılmadı; basınç indirilmeliydi; sıra hiç değişmiyor.",
        fields: [
          { label: "Cause", answer: "must have been caused", accept: ["the update"] },
          { label: "Maintenance", answer: "can't have been done", accept: ["not last week"] },
          { label: "Pressure", answer: "should have lowered", accept: ["someone"] },
          { label: "The order", answer: "never moves", accept: ["fixed"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u07-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 7,
    title: "Nowhere is it written that a safeguard is optional",
    genre: "opinion",
    intro: "Üç tetikleyici ve iki yarık cümle.",
    gloss: [
      { de: "nowhere", tr: "hiçbir yerde" },
      { de: "rarely", tr: "nadiren" },
      { de: "only after", tr: "ancak … sonra" },
      { de: "what was changed", tr: "değişen şey" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Güvence önleminin isteğe bağlı olduğu hiçbir yerde yazmıyor.",
        answer: "Nowhere is it written that a safeguard is optional.",
        hint: "Olumsuz zarf başta; „is“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Bir tedbir nadiren bu kadar yararlı oldu.",
        answer: "Rarely has a precaution been so useful.",
        hint: "„has“ özneyi atlıyor, fiilin gerisi yerinde kalıyor.",
      },
      {
        kind: "build",
        tr: "Ancak kesintiden sonra harekete geçtiler.",
        answer: "Only after the outage did they act.",
        hint: "Taşınacak yardımcı fiil yoksa „did“ geliyor.",
      },
      {
        kind: "build",
        tr: "Değişen şey kayıt satırı.",
        answer: "What was changed is the entry.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Başarısız olan envanterdi.",
        answer: "It was the inventory that failed.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
    ],
  },
];
