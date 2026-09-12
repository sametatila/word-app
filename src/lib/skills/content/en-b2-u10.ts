import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 10 — "Basmış olsalardı, daha önce hiç yayımlanmamış,
 * yayına girene kadar, raporların karşılaştırılması".
 *
 * Dört ders: If they had printed it · Never before published ·
 * By the time it airs · The comparison of the reports.
 *
 *   Kelime: consent, copyright, indictment, precedent, justification,
 *           motive, urgency, duty, landmark, legacy, memorial,
 *           collection, imprint, autonomy, sovereignty, competence,
 *           merger, takeover, investor, shareholder, funding, subsidy,
 *           alliance, partnership, comparison, distinction, contrast,
 *           parallel, ritual, monument, quarterly, narrative.
 *   Kalıp:  If they had asked for consent, we would have agreed. ·
 *           If the copyright had been clear, the case would be closed now. ·
 *           If the indictment had come earlier, the story would have changed. ·
 *           Never before has such a landmark been shown. ·
 *           Not once did the legacy reach the public. ·
 *           Only in the memorial is the name written. ·
 *           By Friday the merger will have been announced. ·
 *           This time next week we will be covering the takeover. ·
 *           The investors will have been informed by then. ·
 *           The comparison of the two reports took a week. ·
 *           The distinction between the cases is clear. ·
 *           The contrast between the versions is sharp.
 *
 * Ünitenin tek öğretme noktası ADLAŞTIRMA KENDİ EDATINI DA GETİRİYOR.
 * Ünite 4 ekin fiilden türetilemediğini göstermişti; bu ikinci fatura:
 * „comparison OF“, „distinction BETWEEN“, „contrast BETWEEN“,
 * „parallel WITH“ — edat da çift çift ezberleniyor ve fiilin aldığı
 * edatla hiç ilgisi yok („compare one thing WITH another“ ama „the
 * comparison OF two things“).
 */
export const enB2U10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u10-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 10,
    title: "The comparison of the reports",
    genre: "info",
    intro: "İsim kendi edatını getiriyor. Fiilinkiyle aynı mı?",
    gloss: [
      { de: "nouns", tr: "isimler" },
      { de: "verbs", tr: "fiiller" },
      { de: "verb", tr: "fiil" },
      { de: "either", tr: "ikisinden biri" },
      { de: "noun", tr: "isim" },
      { de: "sentence", tr: "cümle" },
      { de: "a preposition", tr: "edat" },
      { de: "separately", tr: "ayrıca" },
      { de: "catches", tr: "yakalıyor" },
      { de: "a bill", tr: "fatura" },
      { de: "worked out", tr: "çıkarılan" },
      { de: "underneath", tr: "altta" },
      { de: "no help", tr: "yardımı yok" },
      { de: "a heading", tr: "başlık" },
      { de: "the board", tr: "yönetim kurulu" },
      { de: "look up", tr: "bakıp bulmak" },
      { de: "an ending", tr: "ek" },
      { de: "a nominalisation", tr: "adlaştırma" },
    ],
    minutes: 9,
    text:
      "The comparison of the two reports took a week. The distinction between the cases is clear. The contrast between the versions is sharp. Three nouns made from three verbs, and each of them has brought a preposition with it.\n" +
      "„Comparison“ takes „of“. „Distinction“ takes „between“. „Contrast“ takes „between“ as well, and „with“ when the second thing is named separately: a contrast with last year's narrative. „Parallel“ takes „with“ and never „between“, which is the one that catches people.\n" +
      "So a nominalisation costs twice. Unit 4 showed that the ending cannot be worked out from the verb — enforce, enforcement; perform, performance. This is the second bill: the preposition cannot be worked out either, and the two have nothing to do with each other.\n" +
      "The verb underneath is no help. You compare one thing with another, but you write the comparison of two things. The preposition changes when the verb becomes a noun, and there is no rule saying it should.\n" +
      "Why does a quarterly report live on these? Because the noun can be counted and dated and put in a heading, and because „we compared the reports“ names us. In a document that will be read by the board, the week that the comparison took is a fact and we are not.\n" +
      "The ritual of the thing is that every one of these headings was a sentence first. I write the sentence, I turn it into the noun, and then I look up the preposition, every time, because I have been wrong about „parallel“ twice.",
    questions: [
      {
        text: "Which preposition does „comparison“ take?",
        options: ["of", "between", "with"],
        answer: 0,
        explain: "„„Comparison“ takes „of“.“",
      },
      {
        text: "Which one never takes „between“?",
        options: ["parallel", "distinction", "contrast"],
        answer: 0,
        explain: "„„Parallel“ takes „with“ and never „between“…“",
      },
      {
        kind: "truefalse",
        text: "The verb underneath is no help with the preposition.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The verb underneath is no help.“",
      },
      {
        kind: "gapfill",
        text: "The distinction ___ the cases is clear.",
        options: [],
        answer: 0,
        accept: ["between"],
        explain: "„The distinction between the cases is clear.“",
      },
      {
        kind: "order",
        text: "Edatların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The comparison of the two reports took a week.",
          "The distinction between the cases is clear.",
          "The contrast between the versions is sharp.",
          "The verb underneath is no help.",
        ],
        explain: "Üç isim, üç edat, en sonda kuralın kendisi.",
      },
      {
        kind: "short_answer",
        text: "What does the writer do every time?",
        options: [],
        answer: 0,
        accept: ["looks up the preposition", "checks the preposition", "looks it up"],
        explain: "„and then I look up the preposition, every time…“",
      },
    ],
  },
  {
    id: "en-b2-u10-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 10,
    title: "Never before published",
    genre: "opinion",
    intro: "Üç tetikleyici. Hangisinde ana fiil yalın hâline dönüyor?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "plain", tr: "yalın" },
      { de: "sentence", tr: "cümle" },
      { de: "appears", tr: "beliriyor" },
      { de: "inversion", tr: "devrik sıra" },
      { de: "unit", tr: "ünite" },
      { de: "element", tr: "öğe" },
      { de: "sentences", tr: "cümleler" },
      { de: "restrictive", tr: "sınırlayıcı" },
      { de: "appear", tr: "belirmek" },
      { de: "ordinary", tr: "olağan" },
      { de: "the auxiliary", tr: "yardımcı fiil" },
      { de: "bare", tr: "yalın" },
      { de: "the commonest", tr: "en yaygın" },
      { de: "fronted", tr: "öne çıkarılmış" },
      { de: "a restriction", tr: "sınırlama" },
      { de: "the thread", tr: "ip ucu" },
      { de: "stated", tr: "söylenmiş" },
      { de: "a catalogue", tr: "katalog" },
      { de: "an entry", tr: "kayıt" },
      { de: "flat", tr: "düz" },
      { de: "shouts", tr: "bağırıyor" },
      { de: "waiting", tr: "bekleyen" },
      { de: "an error", tr: "yanlış" },
    ],
    minutes: 9,
    text:
      "Never before has such a landmark been shown. „Never before“ at the front, „has“ ahead of „such a landmark“, and the rest of the verb waiting where it was.\n" +
      "Not once did the legacy reach the public. Here there is no auxiliary in the plain sentence — the legacy reached the public — so „did“ appears to carry the inversion, and the main verb goes back to its bare form. „Did reached“ is the error, and it is the commonest one in this unit.\n" +
      "Only in the memorial is the name written. The fronted element is a place, „only“ makes it a restriction, and what moves is „is“. Notice how long the subject is: „the name written“ has to wait, and a reader who loses the thread has lost it at the front and not at the end.\n" +
      "Three sentences, three triggers, and one rule that has not changed since it was first stated: negative or restrictive at the front, auxiliary before subject, and the change happens in the clause that follows.\n" +
      "The register is the point. A catalogue entry for a collection uses this shape to say, without saying, that the imprint knows what it has. Autonomy, sovereignty and competence are all words that appear on the same page, and all of them would be flat in an ordinary sentence.\n" +
      "Once, in the first line. After that a catalogue is a list, and a list that shouts is a list nobody reads to the end.",
    questions: [
      {
        text: "What happens to the main verb after „did“?",
        options: ["it goes back to its bare form", "it keeps its ending", "it moves as well"],
        answer: 0,
        explain: "„the main verb goes back to its bare form.“",
      },
      {
        text: "What moves in the third sentence?",
        options: ["is", "written", "the name"],
        answer: 0,
        explain: "„„only“ makes it a restriction, and what moves is „is“.“",
      },
      {
        kind: "truefalse",
        text: "A catalogue should use the shape in every entry.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Once, in the first line. After that a catalogue is a list…“",
      },
      {
        kind: "gapfill",
        text: "Not once ___ the legacy reach the public.",
        options: [],
        answer: 0,
        accept: ["did"],
        explain: "„Not once did the legacy reach the public.“",
      },
      {
        kind: "order",
        text: "Katalogun sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Never before has such a landmark been shown.",
          "Not once did the legacy reach the public.",
          "Only in the memorial is the name written.",
          "Once, in the first line.",
        ],
        explain: "Üç örnek, en sonda yazarın kendi kuralı.",
      },
      {
        kind: "short_answer",
        text: "Where does a reader lose the thread?",
        options: [],
        answer: 0,
        accept: ["at the front", "the front", "not at the end"],
        explain: "„a reader who loses the thread has lost it at the front and not at the end.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u10-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 10,
    title: "If they had printed it",
    genre: "dialogue",
    intro: "İki kapalı, bir karışık. Hangisine kimse dokunamıyor?",
    gloss: [
      { de: "halves", tr: "yarılar" },
      { de: "sentence", tr: "cümle" },
      { de: "closed", tr: "kapalı" },
      { de: "available", tr: "elde olan" },
      { de: "the desk", tr: "masa" },
      { de: "printed", tr: "basılmış" },
      { de: "attached", tr: "iliştirilmiş" },
      { de: "act on", tr: "gereğini yapmak" },
      { de: "history", tr: "tarih" },
      { de: "mixed", tr: "karışık" },
      { de: "the cause", tr: "neden" },
      { de: "a lawyer", tr: "avukat" },
      { de: "exists", tr: "var" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Aslı", text: "If they had asked for consent, we would have agreed. Both halves closed, and that is the sentence the lawyer wanted." },
      { speaker: "Berat", text: "Why closed?" },
      { speaker: "Aslı", text: "Because the agreeing was available for one afternoon in March and it is not available now. Nothing in that sentence touches today." },
      { speaker: "Berat", text: "And the second line?" },
      { speaker: "Aslı", text: "If the copyright had been clear, the case would be closed now. Look at the second half: „would be“, not „would have been“." },
      { speaker: "Berat", text: "Because the case is still open." },
      { speaker: "Aslı", text: "Because the case is still open. The cause is finished and the result is on today's desk, and the mixed form is the only shape that says both." },
      { speaker: "Berat", text: "The indictment?" },
      { speaker: "Aslı", text: "If the indictment had come earlier, the story would have changed. Closed again, correctly: the story ran, it is printed, nobody can change it." },
      { speaker: "Berat", text: "So two closed and one mixed." },
      { speaker: "Aslı", text: "And the mixed one is the only one anybody in that room will act on. The other two are history with a justification attached." },
      { speaker: "Berat", text: "Does the motive matter?" },
      { speaker: "Aslı", text: "Not to the grammar. The urgency does, because urgency is a thing that exists now, and a sentence about now needs a second half that lives there." },
    ],
    questions: [
      {
        text: "Why is the first sentence closed?",
        options: ["the agreeing is no longer available", "the lawyer said so", "the consent was given"],
        answer: 0,
        explain: "„the agreeing was available for one afternoon in March and it is not available now.“",
      },
      {
        text: "Which one will the room act on?",
        options: ["the mixed one", "the first one", "the last one"],
        answer: 0,
        explain: "„the mixed one is the only one anybody in that room will act on.“",
      },
      {
        kind: "truefalse",
        text: "The motive does not matter to the grammar; the urgency does.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Not to the grammar. The urgency does…“",
      },
      {
        kind: "gapfill",
        text: "If the copyright had been clear, the case would be closed ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If the copyright had been clear, the case would be closed now.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If they had asked for consent, we would have agreed.", "If they had asked for consent, we would have agreed"],
        explain: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "short_answer",
        text: "What are the other two?",
        options: [],
        answer: 0,
        accept: ["history", "history with a reason", "the past"],
        explain: "„The other two are history with a justification attached.“",
      },
    ],
  },
  {
    id: "en-b2-u10-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 10,
    title: "By the time it airs",
    genre: "monologue",
    intro: "Takvimde iki biçim. Hangisi benim elimde?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "sentence", tr: "cümle" },
      { de: "continuous", tr: "sürerli" },
      { de: "passive", tr: "edilgen" },
      { de: "a schedule", tr: "takvim" },
      { de: "a state", tr: "durum" },
      { de: "the announcement", tr: "duyuru" },
      { de: "polite", tr: "kibar" },
      { de: "promised", tr: "söz verilmiş" },
      { de: "against", tr: "karşısında" },
      { de: "my own file", tr: "kendi dosyam" },
      { de: "covering", tr: "haberini yapmak" },
      { de: "control", tr: "denetlemek" },
      { de: "informed", tr: "bilgilendirilmiş" },
      { de: "honest", tr: "dürüst" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Sıla", text: "By Friday the merger will have been announced. A point in time, a finished state, and nobody named as the one who announces it." },
      { speaker: "Sıla", text: "That is the right shape for a schedule, because the schedule is about what will be true and not about who will be at the desk." },
      { speaker: "Sıla", text: "This time next week we will be covering the takeover. Inside the work rather than after it, and honest: covering something takes days." },
      { speaker: "Sıla", text: "The investors will have been informed by then. Four words of verb and the order does not move: will, have, been, third form." },
      { speaker: "Sıla", text: "The difference between the first sentence and the third is who is doing the checking. I control the covering. I do not control the announcement." },
      { speaker: "Sıla", text: "So the covering goes in the continuous and the announcement goes in the perfect with a passive, which is the polite way of saying the date is not mine." },
      { speaker: "Sıla", text: "A partnership was announced last year on a Thursday that had been promised as a Tuesday, and the funding line in that story still has the Tuesday in it." },
      { speaker: "Sıla", text: "Which is why every future perfect in a published schedule has a name against it in my own file, even when the sentence does not." },
    ],
    questions: [
      {
        text: "What is a schedule about?",
        options: ["what will be true", "who will be there", "who decided"],
        answer: 0,
        explain: "„the schedule is about what will be true and not about who will be at the desk.“",
      },
      {
        text: "Which one does Sıla control?",
        options: ["the covering", "the announcement", "the funding"],
        answer: 0,
        explain: "„I control the covering. I do not control the announcement.“",
      },
      {
        kind: "truefalse",
        text: "The partnership was announced on the promised day.",
        options: ["True", "False"],
        answer: 1,
        explain: "„announced last year on a Thursday that had been promised as a Tuesday…“",
      },
      {
        kind: "gapfill",
        text: "By Friday the ___ will have been announced.",
        options: [],
        answer: 0,
        accept: ["merger"],
        explain: "„By Friday the merger will have been announced.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The investors will have been informed by then.", "The investors will have been informed by then"],
        explain: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What does every future perfect have in her file?",
        options: [],
        answer: 0,
        accept: ["a name", "a name against it", "somebody's name"],
        explain: "„every future perfect in a published schedule has a name against it in my own file…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u10-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 10,
    title: "The comparison of the two reports took a week",
    genre: "info",
    intro: "Üç isim, üç edat. Hangisi „between“ almıyor?",
    gloss: [
      { de: "the comparison", tr: "karşılaştırılması" },
      { de: "the distinction", tr: "ayrım" },
      { de: "the contrast", tr: "karşıtlık" },
      { de: "consent", tr: "rıza" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "İki raporun karşılaştırılması bir hafta sürdü.",
        answer: "The comparison of the two reports took a week.",
        hint: "„comparison“ „of“ istiyor; edat da ezberden geliyor.",
      },
      {
        kind: "build",
        tr: "Davalar arasındaki ayrım açık.",
        answer: "The distinction between the cases is clear.",
        hint: "„distinction“ „between“ istiyor.",
      },
      {
        kind: "build",
        tr: "Sürümler arasındaki karşıtlık keskin.",
        answer: "The contrast between the versions is sharp.",
        hint: "„contrast“ da „between“ alıyor; „parallel“ almıyor.",
      },
      {
        kind: "build",
        tr: "Rıza isteselerdi kabul ederdik.",
        answer: "If they had asked for consent, we would have agreed.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "form",
        prompt: "Karşılaştırma kartını doldur.",
        facts: "„comparison“ „of“ alıyor; „distinction“ „between“ alıyor; „contrast“ da „between“ alıyor; „parallel“ „with“ alıyor.",
        fields: [
          { label: "Comparison", answer: "of", accept: ["of the reports"] },
          { label: "Distinction", answer: "between", accept: ["between the cases"] },
          { label: "Contrast", answer: "between", accept: ["between the versions"] },
          { label: "Parallel", answer: "with", accept: ["never between"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u10-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 10,
    title: "Never before has such a landmark been shown",
    genre: "opinion",
    intro: "Üç tetikleyici, bir takvim, bir karışık koşul.",
    gloss: [
      { de: "never before", tr: "daha önce hiç" },
      { de: "not once", tr: "bir kez olsun" },
      { de: "only in the memorial", tr: "yalnızca anıtta" },
      { de: "will have been announced", tr: "duyurulmuş olacak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Böyle bir dönüm noktası daha önce hiç gösterilmedi.",
        answer: "Never before has such a landmark been shown.",
        hint: "„has“ özneyi atlıyor, fiilin gerisi yerinde kalıyor.",
      },
      {
        kind: "build",
        tr: "Miras bir kez olsun kamuya ulaşmadı.",
        answer: "Not once did the legacy reach the public.",
        hint: "„did“ geliyor, ana fiil yalın hâline dönüyor.",
      },
      {
        kind: "build",
        tr: "Ad yalnızca anıtta yazılı.",
        answer: "Only in the memorial is the name written.",
        hint: "Öne çıkan bir yer; „only“ onu sınırlamaya çeviriyor.",
      },
      {
        kind: "build",
        tr: "Cuma gününe kadar birleşme duyurulmuş olacak.",
        answer: "By Friday the merger will have been announced.",
        hint: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Telif hakkı açık olsaydı dava şimdi kapanmış olurdu.",
        answer: "If the copyright had been clear, the case would be closed now.",
        hint: "Karışık koşul: sonuç bugünün masasında.",
      },
    ],
  },
];
