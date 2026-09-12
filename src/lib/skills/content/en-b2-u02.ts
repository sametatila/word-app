import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 2 — "Tutanak, neyin yanlış gittiği, ya bilseydik,
 * noktayı geçirmek".
 *
 * Dört ders: Writing the minutes · What went wrong · If we had known ·
 * Making the point land.
 *
 *   Kelime: assign, minutes, objection, conclude, consensus, consequence,
 *           compromise, wording, fault, prevent, breakdown, alert, root,
 *           trigger, observation, assumption, scenario, loss, expense,
 *           expectation, intention, overrun, due, margin, highlight,
 *           circular, essential, critical, mainly, largely, forward,
 *           adjust.
 *   Kalıp:  The assignment of the task took ten minutes. ·
 *           The objection was noted without discussion. ·
 *           We conclude with the consensus of the group. ·
 *           The fault must have been there for weeks. ·
 *           We can't have prevented the breakdown. ·
 *           Someone should have raised the alert. ·
 *           If we had known, we would have changed the scenario. ·
 *           If we had planned better, the loss would be smaller now. ·
 *           If the expense had been clear, we would have waited. ·
 *           What I want to highlight is the cost. ·
 *           It was the circular that changed everything. ·
 *           What is essential is the timing.
 *
 * Ünitenin tek öğretme noktası KARIŞIK KOŞUL: koşul geçmişte, sonuç
 * ŞİMDİDE. „If we had known, we would have changed …“ kapalı bir kutu;
 * „If we had planned better, the loss would be smaller now“ ise ikinci
 * yarısını öne çekiyor, çünkü kayıp hâlâ bugünün sayfasında duruyor.
 * Sınama hangi yarının geçmişte olduğu değil, SONUCUN NEREDE YAŞADIĞI.
 */
export const enB2U02: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u02-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 2,
    title: "If we had known",
    genre: "opinion",
    intro: "İki koşul, iki ayrı yer. Sonuç nerede yaşıyor?",
    gloss: [
      { de: "halves", tr: "yarılar" },
      { de: "sentence", tr: "cümle" },
      { de: "conditional", tr: "koşul cümlesi" },
      { de: "event", tr: "olay" },
      { de: "verb", tr: "fiil" },
      { de: "rather", tr: "epeyce" },
      { de: "version", tr: "sürüm" },
      { de: "wonder", tr: "merak etmek" },
      { de: "actually", tr: "aslında" },
      { de: "act", tr: "davranmak" },
      { de: "unreal", tr: "gerçek olmayan" },
      { de: "a box", tr: "kutu" },
      { de: "closed", tr: "kapalı" },
      { de: "mixed", tr: "karışık" },
      { de: "the cause", tr: "neden" },
      { de: "the shape", tr: "biçim" },
      { de: "history", tr: "tarih" },
      { de: "the balance", tr: "bakiye" },
      { de: "the screen", tr: "ekran" },
      { de: "available", tr: "elde olan" },
      { de: "relive", tr: "yeniden yaşamak" },
      { de: "the test", tr: "sınama" },
      { de: "a description", tr: "betimleme" },
    ],
    minutes: 9,
    text:
      "If we had known, we would have changed the scenario. Both halves in the past, both halves unreal, and the sentence is a closed box: nothing in it can be changed now.\n" +
      "If we had planned better, the loss would be smaller now. Look at the second half. It has moved. „Would be“, not „would have been“ — because the loss is not a thing that happened once in March; it is a number on today's page.\n" +
      "That is the mixed conditional, and it is the most useful sentence in a review after the event. The cause is finished and the result is still here, and English says so with the shape of the verb rather than with an extra word.\n" +
      "Most teams write the closed version by habit and then wonder why the meeting feels like history. „We would have had a smaller loss“ points at March. „The loss would be smaller now“ points at the balance on the screen, which is the thing somebody actually has to act on.\n" +
      "If the expense had been clear, we would have waited. Closed again, and correctly: the waiting was a decision available in one week only, and that week is over.\n" +
      "So the test is not which half is in the past. Both conditions are. The test is where the result lives. If the result is still running, the second half comes forward into the present, and the sentence stops being a story about a mistake and starts being a description of a situation.\n" +
      "The intention was never to relive the expense. It was to say that the overrun has not stopped and that the margin due next month is the same margin.",
    questions: [
      {
        text: "Why does the second sentence say „would be“?",
        options: ["the loss is still here", "the loss was in March", "the loss is smaller"],
        answer: 0,
        explain: "„because the loss is not a thing that happened once in March; it is a number on today's page.“",
      },
      {
        text: "What is the test?",
        options: ["where the result lives", "which half is in the past", "how long ago it was"],
        answer: 0,
        explain: "„The test is where the result lives.“",
      },
      {
        kind: "truefalse",
        text: "The expense sentence should be mixed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Closed again, and correctly: the waiting was a decision available in one week only…“",
      },
      {
        kind: "gapfill",
        text: "If we had planned better, the loss would be smaller ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If we had planned better, the loss would be smaller now.“",
      },
      {
        kind: "order",
        text: "Koşulların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "If we had known, we would have changed the scenario.",
          "If we had planned better, the loss would be smaller now.",
          "If the expense had been clear, we would have waited.",
          "The test is where the result lives.",
        ],
        explain: "Kapalı, karışık, yine kapalı, en sonda sınamanın kendisi.",
      },
      {
        kind: "short_answer",
        text: "What does the closed version make the meeting feel like?",
        options: [],
        answer: 0,
        accept: ["history", "like history", "the past"],
        explain: "„wonder why the meeting feels like history.“",
      },
    ],
  },
  {
    id: "en-b2-u02-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 2,
    title: "Writing the minutes",
    genre: "info",
    intro: "Tutanak isimlerle yazılıyor. Bedeli ne?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "nouns", tr: "isimler" },
      { de: "objected", tr: "itiraz etti" },
      { de: "verb", tr: "fiil" },
      { de: "dishonest", tr: "dürüst olmayan" },
      { de: "itself", tr: "kendisi" },
      { de: "real", tr: "gerçek" },
      { de: "existed", tr: "vardı" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "wherever", tr: "her nerede" },
      { de: "whole", tr: "bütün" },
      { de: "noun", tr: "isim" },
      { de: "rewrote", tr: "yeniden yazdı" },
      { de: "bury", tr: "gömmek" },
      { de: "a record", tr: "kayıt" },
      { de: "a column", tr: "sütun" },
      { de: "nominalisation", tr: "adlaştırma" },
      { de: "buries", tr: "gömüyor" },
      { de: "an agent", tr: "eyleyen" },
      { de: "survives", tr: "sağ kalıyor" },
      { de: "an individual", tr: "birey" },
      { de: "owns", tr: "sahiplenir" },
      { de: "minuted", tr: "tutanağa geçirilmiş" },
      { de: "useless", tr: "işe yaramaz" },
      { de: "timed", tr: "süresi tutulmuş" },
      { de: "take over", tr: "devralmak" },
      { de: "a story", tr: "hikâye" },
    ],
    minutes: 9,
    text:
      "The assignment of the task took ten minutes. Ten minutes of a meeting, and the sentence that records it has no person in it at all.\n" +
      "Minutes are written in nouns. „We assigned the task“ becomes „the assignment of the task“; „they objected“ becomes „the objection“; „we agreed“ becomes „the consensus“. The verb turns into a thing, and a thing can be counted, timed and put in a column.\n" +
      "That is why it is done, and it is not dishonest by itself. A record is not a story. Nobody reading the minutes in a year needs to know who spoke first.\n" +
      "But the cost is real and worth naming. Every nominalisation buries an agent. „The objection was noted without discussion“ does not say who objected, and it does not say who decided there would be no discussion. Both facts existed in the room; neither survives to the page.\n" +
      "So the wording matters more in minutes than anywhere else. I keep people in the sentence wherever a consequence follows from a choice, and I let the nouns take over wherever the group as a whole did something.\n" +
      "We conclude with the consensus of the group. There the noun is right: no individual reached it and no individual owns it.\n" +
      "The compromise on the third item is the only line I rewrote. It had been minuted as „a compromise was reached“, which is true and useless. It now names the two people who moved, because in six months the question will not be whether there was a compromise.",
    questions: [
      {
        text: "What does every nominalisation bury?",
        options: ["an agent", "a date", "a number"],
        answer: 0,
        explain: "„Every nominalisation buries an agent.“",
      },
      {
        text: "When does the writer keep people in the sentence?",
        options: ["when a consequence follows a choice", "when the group agreed", "when time was short"],
        answer: 0,
        explain: "„I keep people in the sentence wherever a consequence follows from a choice…“",
      },
      {
        kind: "truefalse",
        text: "Writing in nouns is dishonest by itself.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is why it is done, and it is not dishonest by itself.“",
      },
      {
        kind: "gapfill",
        text: "We conclude with the ___ of the group.",
        options: [],
        answer: 0,
        accept: ["consensus"],
        explain: "„We conclude with the consensus of the group.“",
      },
      {
        kind: "order",
        text: "Tutanağın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The assignment of the task took ten minutes.",
          "The objection was noted without discussion.",
          "We conclude with the consensus of the group.",
          "The compromise was the only line I rewrote.",
        ],
        explain: "Üç tutanak satırı, en sonda yazarın kendi düzeltmesi.",
      },
      {
        kind: "short_answer",
        text: "Why did the writer change the compromise line?",
        options: [],
        answer: 0,
        accept: ["it was useless", "to name the people", "it named nobody"],
        explain: "„which is true and useless. It now names the two people who moved…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u02-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 2,
    title: "What went wrong",
    genre: "dialogue",
    intro: "Geçmişe dönük üç kip. İkisi okuyor, biri yargılıyor.",
    gloss: [
      { de: "apart", tr: "ayrı" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "sentence", tr: "cümle" },
      { de: "prohibition", tr: "yasak" },
      { de: "fit", tr: "yerleşmek" },
      { de: "a log", tr: "günlük kaydı" },
      { de: "a conclusion", tr: "çıkarım" },
      { de: "certainty", tr: "kesinlik" },
      { de: "obligation", tr: "zorunluluk" },
      { de: "backwards", tr: "geriye" },
      { de: "evidence", tr: "kanıt" },
      { de: "a judgement", tr: "yargı" },
      { de: "blames", tr: "suçluyor" },
      { de: "a dashboard", tr: "gösterge paneli" },
      { de: "separate", tr: "ayrı" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Tuna", text: "The fault must have been there for weeks. Three separate logs point at the same hour on a Tuesday." },
      { speaker: "Merve", text: "„Must have“ — you are not giving an order there." },
      { speaker: "Tuna", text: "No. It is a conclusion. „Must“ stopped being about obligation somewhere in the last level and started being about certainty; this is that same „must“ pointed at the past." },
      { speaker: "Merve", text: "And the negative?" },
      { speaker: "Tuna", text: "„Can't have“. We can't have prevented the breakdown. Nothing on our side was reading that indicator at all." },
      { speaker: "Merve", text: "Not „mustn't have“?" },
      { speaker: "Tuna", text: "There is no such sentence. „Mustn't“ is a prohibition, and a prohibition cannot be aimed backwards." },
      { speaker: "Merve", text: "Then where does „should have“ fit?" },
      { speaker: "Tuna", text: "It is the third one and the only one that is not about evidence. Someone should have raised the alert. That is not a guess about what happened; it is a judgement about what did not." },
      { speaker: "Merve", text: "So two of them look and one of them blames." },
      { speaker: "Tuna", text: "That is the cleanest way to hold them apart. „Must have“ and „can't have“ read the evidence. „Should have“ reads the choice." },
      { speaker: "Merve", text: "And the root cause?" },
      { speaker: "Tuna", text: "An assumption nobody wrote down. The trigger was a change nobody logged, and the observation that would have caught it was on a dashboard two people can open." },
    ],
    questions: [
      {
        text: "What is „must have“ doing here?",
        options: ["reading the evidence", "giving an order", "making a rule"],
        answer: 0,
        explain: "„„Must have“ and „can't have“ read the evidence.“",
      },
      {
        text: "What is the negative of „must have“?",
        options: ["can't have", "mustn't have", "shouldn't have"],
        answer: 0,
        explain: "„„Can't have“. We can't have prevented the breakdown…“",
      },
      {
        kind: "truefalse",
        text: "„Should have“ is about evidence.",
        options: ["True", "False"],
        answer: 1,
        explain: "„It is the third one and the only one that is not about evidence.“",
      },
      {
        kind: "gapfill",
        text: "Someone ___ have raised the alert.",
        options: [],
        answer: 0,
        accept: ["should"],
        explain: "„Someone should have raised the alert.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["We can't have prevented the breakdown.", "We can't have prevented the breakdown"],
        explain: "Olumsuz çıkarım „can't have“ ile kuruluyor.",
      },
      {
        kind: "short_answer",
        text: "What was the root cause?",
        options: [],
        answer: 0,
        accept: ["an assumption", "an assumption nobody wrote", "a change"],
        explain: "„An assumption nobody wrote down.“",
      },
    ],
  },
  {
    id: "en-b2-u02-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 2,
    title: "Making the point land",
    genre: "monologue",
    intro: "Yarık cümle. Boşluk önce mi açılıyor?",
    gloss: [
      { de: "noun", tr: "isim" },
      { de: "sentence", tr: "cümle" },
      { de: "sentences", tr: "cümleler" },
      { de: "halves", tr: "yarılar" },
      { de: "sound", tr: "ses" },
      { de: "speech", tr: "konuşma" },
      { de: "exists", tr: "var" },
      { de: "a cleft", tr: "yarık cümle" },
      { de: "a slot", tr: "yuva" },
      { de: "the spotlight", tr: "ışık" },
      { de: "split", tr: "ikiye bölmek" },
      { de: "lean on", tr: "yaslanmak" },
      { de: "cleared", tr: "açılmış" },
      { de: "announce", tr: "duyurmak" },
      { de: "disputed", tr: "tartışmalı" },
      { de: "plain", tr: "yalın" },
      { de: "a trick", tr: "numara" },
      { de: "a paragraph", tr: "paragraf" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Yasemin", text: "What I want to highlight is the cost. I could have said „the cost is the important part“ and nobody would have remembered it." },
      { speaker: "Yasemin", text: "The shape does the work. Putting „what I want to highlight“ first makes the room wait, and the thing that arrives after „is“ arrives into a space that has already been cleared for it." },
      { speaker: "Yasemin", text: "It was the circular that changed everything. Same trick, different slot: this one puts the spotlight on a noun and pushes the rest of the sentence behind „that“." },
      { speaker: "Yasemin", text: "Both of them are called cleft sentences, because they split one plain sentence into two halves and let you choose which half the listener leans on." },
      { speaker: "Yasemin", text: "What is essential is the timing. I use that shape in a first paragraph and never in a third; more than one on a page and the writing starts to sound like a speech." },
      { speaker: "Yasemin", text: "The circular is a good example of why the second shape exists. Nobody disputed that things had changed. What was disputed was the reason, and „it was the circular“ answers exactly the question that was open." },
      { speaker: "Yasemin", text: "There is a quiet cost. A cleft is longer, and it announces that you are making a point, which is the thing you want in a meeting and not always the thing you want in a memo." },
      { speaker: "Yasemin", text: "So I adjust by room. In writing, largely plain sentences and one cleft where the argument turns. In speech, mainly clefts, because a listener cannot go back and read it again." },
    ],
    questions: [
      {
        text: "What does putting the first half first do?",
        options: ["it makes the room wait", "it saves time", "it hides the point"],
        answer: 0,
        explain: "„Putting „what I want to highlight“ first makes the room wait…“",
      },
      {
        text: "What was disputed?",
        options: ["the reason", "the change", "the circular"],
        answer: 0,
        explain: "„What was disputed was the reason…“",
      },
      {
        kind: "truefalse",
        text: "Yasemin uses clefts mainly in writing.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In writing, largely plain sentences… In speech, mainly clefts…“",
      },
      {
        kind: "gapfill",
        text: "What is essential is the ___.",
        options: [],
        answer: 0,
        accept: ["timing"],
        explain: "„What is essential is the timing.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It was the circular that changed everything.", "It was the circular that changed everything"],
        explain: "İkinci yarık biçim: ışık isme düşüyor.",
      },
      {
        kind: "short_answer",
        text: "Why does speech take more clefts?",
        options: [],
        answer: 0,
        accept: ["a listener cannot go back", "no second reading", "it is heard once"],
        explain: "„because a listener cannot go back and read it again.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u02-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 2,
    title: "If we had planned better, the loss would be smaller now",
    genre: "opinion",
    intro: "Kapalı koşul, karışık koşul. Sonuç nerede duruyor?",
    gloss: [
      { de: "would have changed", tr: "değiştirirdik" },
      { de: "would be smaller", tr: "daha küçük olurdu" },
      { de: "would have waited", tr: "beklerdik" },
      { de: "the assignment", tr: "görevlendirme" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bilseydik senaryoyu değiştirirdik.",
        answer: "If we had known, we would have changed the scenario.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Daha iyi planlasaydık kayıp şimdi daha küçük olurdu.",
        answer: "If we had planned better, the loss would be smaller now.",
        hint: "Karışık koşul: sonuç hâlâ sürüyor, ikinci yarı öne geliyor.",
      },
      {
        kind: "build",
        tr: "Masraf açık olsaydı beklerdik.",
        answer: "If the expense had been clear, we would have waited.",
        hint: "Yine kapalı: bekleme kararı o haftaya aitti.",
      },
      {
        kind: "build",
        tr: "Görevin dağıtımı on dakika sürdü.",
        answer: "The assignment of the task took ten minutes.",
        hint: "Fiil isme dönüyor; tutanak dili böyle kuruluyor.",
      },
      {
        kind: "form",
        prompt: "Koşul kartını doldur.",
        facts: "Bilseydik senaryo değişirdi; daha iyi planlasaydık kayıp şimdi küçük olurdu; masraf açık olsaydı beklerdik; sınama sonucun nerede yaşadığı.",
        fields: [
          { label: "Closed", answer: "would have changed", accept: ["the scenario"] },
          { label: "Mixed", answer: "would be smaller now", accept: ["the loss"] },
          { label: "Closed again", answer: "would have waited", accept: ["the expense"] },
          { label: "The test", answer: "where the result lives", accept: ["the result"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u02-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 2,
    title: "The fault must have been there for weeks",
    genre: "info",
    intro: "Geçmişe dönük kipler ve yarık cümle.",
    gloss: [
      { de: "must have been", tr: "olmalı" },
      { de: "can't have", tr: "olamaz" },
      { de: "should have raised", tr: "vermesi gerekirdi" },
      { de: "what I want to highlight", tr: "öne çıkarmak istediğim" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kusur haftalardır orada olmalı.",
        answer: "The fault must have been there for weeks.",
        hint: "Çıkarım: kanıt okunuyor, emir verilmiyor.",
      },
      {
        kind: "build",
        tr: "Çöküşü önlemiş olamayız.",
        answer: "We can't have prevented the breakdown.",
        hint: "Olumsuzu „can't have“; „mustn't have“ diye bir şey yok.",
      },
      {
        kind: "build",
        tr: "Birinin uyarı vermesi gerekirdi.",
        answer: "Someone should have raised the alert.",
        hint: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "build",
        tr: "Öne çıkarmak istediğim şey maliyet.",
        answer: "What I want to highlight is the cost.",
        hint: "Yarık cümle: önce boşluk açılıyor, sonra şey geliyor.",
      },
      {
        kind: "build",
        tr: "Her şeyi değiştiren genelgeydi.",
        answer: "It was the circular that changed everything.",
        hint: "İkinci yarık biçim: ışık isme düşüyor.",
      },
    ],
  },
];
