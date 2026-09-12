import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 17 — "Şenlik nedir, hiç böyle bir infial olmadı,
 * açılışa kadar, ikinci perde".
 *
 * Dört ders: What the festival is · Never such an outrage ·
 * By the opening · The second act.
 *
 *   Kelime: custom, interpretation, varied, entertaining, idiom, defeat,
 *           outrage, supporter, grandstand, archive, approval, commission,
 *           preserve, documentation, hasty, shortcoming, revealing,
 *           undisputed, persistence.
 *   Kalıp:  The folk festival, which keeps an old custom, is free. ·
 *           The dress, which is a traditional costume, is new. ·
 *           My aunt, whose interpretation is varied, dances first. ·
 *           Never has a defeat caused such outrage. ·
 *           Rarely does a supporter leave the grandstand early. ·
 *           Only after the final do they cheer on the rest. ·
 *           By June we will have archived the letters. ·
 *           Next month we will be waiting for approval. ·
 *           By autumn we will have decided to commission the work. ·
 *           The ending must have been hasty. ·
 *           They can't have missed the shortcoming. ·
 *           We should have noticed the revealing line.
 *
 * Ünitenin tek öğretme noktası „WHICH IS“ DÜŞÜYOR. Virgüllü (fazladan)
 * bir ilgi cümlesinde „which is“ ya da „who is“ silinebiliyor ve geriye
 * ismin yanında ismi açıklayan bir öbek kalıyor: „The dress, a traditional
 * costume, is new“. Silme yalnız „be“ye kadar uzanıyor — „which keeps“
 * silinmiyor, „whose“ silinmiyor, ve seçim yapan (virgülsüz) cümlecikte
 * hiç olmuyor.
 */
export const enB2U17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u17-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 17,
    title: "What the festival is",
    genre: "info",
    intro: "İki sözcük silinince ne kalıyor?",
    gloss: [
      { de: "middle", tr: "orta" },
      { de: "whenever", tr: "her ne zaman" },
      { de: "commas", tr: "virgüller" },
      { de: "noun", tr: "isim" },
      { de: "verb", tr: "fiil" },
      { de: "shortens", tr: "kısaltıyor" },
      { de: "produces", tr: "üretiyor" },
      { de: "sentence", tr: "cümle" },
      { de: "shorten", tr: "kısaltmak" },
      { de: "comma", tr: "virgül" },
      { de: "deleted", tr: "silinmiş" },
      { de: "extra", tr: "fazladan" },
      { de: "beside", tr: "yanında" },
      { de: "explaining", tr: "açıklayan" },
      { de: "the deletion", tr: "silme" },
      { de: "reaches", tr: "uzanıyor" },
      { de: "possession", tr: "iyelik" },
      { de: "shortened", tr: "kısaltılmış" },
      { de: "twice", tr: "iki kez" },
      { de: "rhythm", tr: "tartım" },
      { de: "a gate", tr: "kapı" },
      { de: "a form", tr: "form" },
      { de: "filled in", tr: "doldurulmuş" },
      { de: "deserves", tr: "hak ediyor" },
      { de: "choosing", tr: "seçen" },
    ],
    minutes: 9,
    text:
      "The dress, which is a traditional costume, is new. Now take two words out of the middle and read it again.\n" +
      "The dress, a traditional costume, is new. Nothing has been lost. „Which is“ can be deleted whenever the relative clause is extra — the kind with commas — and what is left is a noun sitting beside another noun, explaining it.\n" +
      "That shape has a name, and the name matters less than the rule for using it. It works with „which is“ and „who is“, and it does not work with a clause that is choosing. „The dress which is red“ cannot become „the dress red“; the commas have to be there first.\n" +
      "The folk festival, which keeps an old custom, is free. That one cannot lose its two words, because „keeps“ is not „is“. The deletion only reaches as far as the verb „be“.\n" +
      "My aunt, whose interpretation is varied, dances first. Nor this one: „whose“ is carrying possession and there is nothing to delete.\n" +
      "So a paragraph about a festival can hold three relative clauses and only one of them can be shortened, and a writer who shortens the wrong one produces a sentence that a reader has to read twice.\n" +
      "When I do shorten it, the reason is rhythm rather than length. Two words is nothing. But a page in which every second sentence opens the same little gate — comma, which is, comma — sounds like a form being filled in, and a festival that is worth seeing deserves better than that.",
    questions: [
      {
        text: "When can „which is“ be deleted?",
        options: ["when the clause is extra", "when the clause is choosing", "always"],
        answer: 0,
        explain: "„„Which is“ can be deleted whenever the relative clause is extra — the kind with commas…“",
      },
      {
        text: "Why can the festival sentence not lose its words?",
        options: ["„keeps“ is not „is“", "there are no commas", "it is too long"],
        answer: 0,
        explain: "„That one cannot lose its two words, because „keeps“ is not „is“.“",
      },
      {
        kind: "truefalse",
        text: "„The dress which is red“ can become „the dress red“.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„The dress which is red“ cannot become „the dress red“…“",
      },
      {
        kind: "gapfill",
        text: "The dress, ___ is a traditional costume, is new.",
        options: [],
        answer: 0,
        accept: ["which"],
        explain: "„The dress, which is a traditional costume, is new.“",
      },
      {
        kind: "order",
        text: "Şenliğin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The dress, which is a traditional costume, is new.",
          "The folk festival, which keeps an old custom, is free.",
          "My aunt, whose interpretation is varied, dances first.",
          "Only one of them can be shortened.",
        ],
        explain: "Silinebilen, silinemeyen, iyelik taşıyan; en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "Why does the writer shorten it?",
        options: [],
        answer: 0,
        accept: ["for rhythm", "rhythm", "not for length"],
        explain: "„the reason is rhythm rather than length.“",
      },
    ],
  },
  {
    id: "en-b2-u17-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 17,
    title: "The second act",
    genre: "opinion",
    intro: "Üç kip, bir eleştiri. Hangisi eleştirmene dair?",
    gloss: [
      { de: "verb", tr: "fiil" },
      { de: "characters", tr: "kişiler" },
      { de: "prohibition", tr: "yasak" },
      { de: "sentence", tr: "cümle" },
      { de: "an instruction", tr: "yönerge" },
      { de: "resolve", tr: "çözüme bağlamak" },
      { de: "building towards", tr: "hazırlanan" },
      { de: "an explanation", tr: "açıklama" },
      { de: "survives", tr: "ayakta kalıyor" },
      { de: "a rehearsal", tr: "prova" },
      { de: "the stage", tr: "sahne" },
      { de: "rules out", tr: "dışarıda bırakıyor" },
      { de: "a reviewer", tr: "eleştirmen" },
      { de: "the temptation", tr: "ayartı" },
      { de: "the memory", tr: "bellek" },
      { de: "modesty", tr: "alçakgönüllülük" },
    ],
    minutes: 9,
    text:
      "The ending must have been hasty. Four words of verb, and the first is a conclusion rather than an instruction.\n" +
      "The evidence is in the text: two characters who have not spoken for an hour resolve everything in a page, and a line that the second act had been building towards is given to the wrong person. Only one explanation survives that.\n" +
      "They can't have missed the shortcoming. The negative of the same conclusion, and it is „can't have“ and never „mustn't have“ — the second is a prohibition and a prohibition cannot be sent back to a rehearsal.\n" +
      "We should have noticed the revealing line. The third one, and it is the only sentence in the review that is about us. It is not about what happened on the stage; it is about what we did not see, and a reader remembers that sentence and forgets the other two.\n" +
      "Those three carry a review of this kind. What the evidence shows, what it rules out, what the reviewer missed.\n" +
      "The temptation is to write only the first two, because they are about the play and the third is about the critic. A review written that way has an undisputed argument and no persistence in the memory.\n" +
      "So the third sentence goes in, once, near the end, in the first person, and the rest of the piece is built so that it does not sound like modesty.",
    questions: [
      {
        text: "What is „must have been“ here?",
        options: ["a conclusion", "an instruction", "a prohibition"],
        answer: 0,
        explain: "„the first is a conclusion rather than an instruction.“",
      },
      {
        text: "Which sentence does the reader remember?",
        options: ["the one about us", "the one about the ending", "the one about the shortcoming"],
        answer: 0,
        explain: "„a reader remembers that sentence and forgets the other two.“",
      },
      {
        kind: "truefalse",
        text: "A review of the first two only stays in the memory.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A review written that way has an undisputed argument and no persistence in the memory.“",
      },
      {
        kind: "gapfill",
        text: "We should have noticed the ___ line.",
        options: [],
        answer: 0,
        accept: ["revealing"],
        explain: "„We should have noticed the revealing line.“",
      },
      {
        kind: "order",
        text: "Eleştirinin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The ending must have been hasty.",
          "They can't have missed the shortcoming.",
          "We should have noticed the revealing line.",
          "The third sentence goes in near the end.",
        ],
        explain: "Kanıt, dışarıda bıraktığı, kendi payımız; en sonda yerleşim.",
      },
      {
        kind: "short_answer",
        text: "In which person is the third sentence written?",
        options: [],
        answer: 0,
        accept: ["the first person", "first person", "about us"],
        explain: "„near the end, in the first person…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u17-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 17,
    title: "Never such an outrage",
    genre: "dialogue",
    intro: "Devrik sırada parçacık nereye gidiyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "error", tr: "yanlış" },
      { de: "plain", tr: "yalın" },
      { de: "sentences", tr: "cümleler" },
      { de: "produces", tr: "üretiyor" },
      { de: "none", tr: "hiçbiri" },
      { de: "ordinary", tr: "olağan" },
      { de: "scanning", tr: "göz gezdiren" },
      { de: "an auxiliary", tr: "yardımcı fiil" },
      { de: "an ending", tr: "ek" },
      { de: "a particle", tr: "parçacık" },
      { de: "together", tr: "birlikte" },
      { de: "a crowd", tr: "kalabalık" },
      { de: "a season", tr: "sezon" },
      { de: "correct", tr: "düzeltmek" },
      { de: "loud", tr: "yüksek sesli" },
      { de: "the middle", tr: "orta" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Bora", text: "Never has a defeat caused such outrage. „Has“ in front of the subject, and the sentence is the first line of the piece." },
      { speaker: "Esin", text: "Why not the ordinary order?" },
      { speaker: "Bora", text: "„A defeat has never caused such outrage“ puts „never“ in the middle, and a reader scanning a sports page sees the middle of nothing." },
      { speaker: "Esin", text: "The second one has no auxiliary." },
      { speaker: "Bora", text: "Rarely does a supporter leave the grandstand early. Present simple, nothing to move, so „does“ arrives to be the thing that moves." },
      { speaker: "Esin", text: "And „leave“ loses its ending." },
      { speaker: "Bora", text: "„Leave“, not „leaves“. That is the error I correct most, and it is always in this second kind and never in the first." },
      { speaker: "Esin", text: "Only after the final do they cheer on the rest." },
      { speaker: "Bora", text: "The same shape, and notice that „cheer on“ stays together. The particle does not move with „do“; only the auxiliary goes to the front." },
      { speaker: "Esin", text: "Three of them on one page?" },
      { speaker: "Bora", text: "One. The first line, and then plain sentences about a sport that produces one of these evenings a season." },
      { speaker: "Esin", text: "And the stage fright piece?" },
      { speaker: "Bora", text: "That one has none at all, because being defeated in front of a crowd is already loud enough on the page." },
    ],
    questions: [
      {
        text: "What does the ordinary order do to „never“?",
        options: ["puts it in the middle", "puts it at the front", "removes it"],
        answer: 0,
        explain: "„puts „never“ in the middle, and a reader scanning a sports page sees the middle of nothing.“",
      },
      {
        text: "What happens to the particle?",
        options: ["it stays with „cheer“", "it moves with „do“", "it goes to the end"],
        answer: 0,
        explain: "„The particle does not move with „do“; only the auxiliary goes to the front.“",
      },
      {
        kind: "truefalse",
        text: "The error is in the first kind of sentence.",
        options: ["True", "False"],
        answer: 1,
        explain: "„it is always in this second kind and never in the first.“",
      },
      {
        kind: "gapfill",
        text: "Rarely ___ a supporter leave the grandstand early.",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "„Rarely does a supporter leave the grandstand early.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Never has a defeat caused such outrage.", "Never has a defeat caused such outrage"],
        explain: "„has“ özneden öne geçiyor; fiilin gerisi yerinde kalıyor.",
      },
      {
        kind: "short_answer",
        text: "Why does the stage fright piece have none?",
        options: [],
        answer: 0,
        accept: ["it is already loud", "loud enough", "it needs no help"],
        explain: "„being defeated in front of a crowd is already loud enough on the page.“",
      },
    ],
  },
  {
    id: "en-b2-u17-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 17,
    title: "By the opening",
    genre: "monologue",
    intro: "Planda bizim olan ve olmayan. Hangisi hangi biçimde?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "verbs", tr: "fiiller" },
      { de: "infinitive", tr: "mastar" },
      { de: "sentences", tr: "cümleler" },
      { de: "continuous", tr: "sürerli" },
      { de: "a state", tr: "durum" },
      { de: "a promise", tr: "söz" },
      { de: "stacked", tr: "üst üste" },
      { de: "the exception", tr: "istisna" },
      { de: "added to", tr: "üstüne eklenen" },
      { de: "signed off", tr: "son onayı verilen" },
      { de: "a line", tr: "satır" },
      { de: "watch", tr: "gözlemek" },
      { de: "ours", tr: "bizim" },
      { de: "control", tr: "denetlemek" },
      { de: "honest", tr: "dürüst" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ferda", text: "By June we will have archived the letters. A point in time, a finished state, and the sentence says nothing about who does the archiving." },
      { speaker: "Ferda", text: "That is right for a plan and wrong for a promise, and the difference is who reads it." },
      { speaker: "Ferda", text: "Next month we will be waiting for approval. Inside the work rather than after it, and honest: waiting is what we will be doing, and it is not a thing we control." },
      { speaker: "Ferda", text: "By autumn we will have decided to commission the work. Two verbs stacked — the future perfect of „decide“, which then takes an infinitive — and it is one of the longest true sentences in the plan." },
      { speaker: "Ferda", text: "It is true because the deciding is ours. Everything in that plan that is ours goes in the perfect and everything that is somebody else's goes in the continuous." },
      { speaker: "Ferda", text: "The documentation is the exception. It is ours and it is continuous, because it does not finish; it is preserved and added to and never signed off." },
      { speaker: "Ferda", text: "Something always arrives at short notice and the plan has a line for it, and that line has no future perfect in it at all." },
      { speaker: "Ferda", text: "So the page reads as on schedule even when it is not, which is a thing to watch rather than a thing to fix." },
    ],
    questions: [
      {
        text: "What goes in the perfect?",
        options: ["everything that is ours", "everything that is late", "everything in the plan"],
        answer: 0,
        explain: "„Everything in that plan that is ours goes in the perfect…“",
      },
      {
        text: "Why is the documentation the exception?",
        options: ["it does not finish", "it is not ours", "it is short"],
        answer: 0,
        explain: "„It is ours and it is continuous, because it does not finish…“",
      },
      {
        kind: "truefalse",
        text: "The line for things that arrive late has a future perfect in it.",
        options: ["True", "False"],
        answer: 1,
        explain: "„that line has no future perfect in it at all.“",
      },
      {
        kind: "gapfill",
        text: "By June we will have ___ the letters.",
        options: [],
        answer: 0,
        accept: ["archived"],
        explain: "„By June we will have archived the letters.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Next month we will be waiting for approval.", "Next month we will be waiting for approval"],
        explain: "İşin içinde olmak: sürerli biçim, denetimimizde olmayan iş.",
      },
      {
        kind: "short_answer",
        text: "How does the page read?",
        options: [],
        answer: 0,
        accept: ["as on schedule", "on schedule", "better than it is"],
        explain: "„So the page reads as on schedule even when it is not…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u17-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 17,
    title: "The dress, which is a traditional costume, is new",
    genre: "info",
    intro: "Üç ilgi cümlesi. Hangisinden iki sözcük silinebiliyor?",
    gloss: [
      { de: "possession", tr: "iyelik" },
      { de: "which is", tr: "olan" },
      { de: "which keeps", tr: "sürdüren" },
      { de: "whose interpretation", tr: "yorumlaması olan" },
      { de: "hasty", tr: "aceleye gelmiş" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Yöresel kıyafet olan elbise yeni.",
        answer: "The dress, which is a traditional costume, is new.",
        hint: "„which is“ buradan silinebilir; virgüller şart.",
      },
      {
        kind: "build",
        tr: "Eski bir göreneği sürdüren halk şenliği ücretsiz.",
        answer: "The folk festival, which keeps an old custom, is free.",
        hint: "„keeps“ silinmiyor; silme yalnız „be“ye kadar uzanıyor.",
      },
      {
        kind: "build",
        tr: "Yorumlaması çeşit çeşit olan teyzem ilk dansı ediyor.",
        answer: "My aunt, whose interpretation is varied, dances first.",
        hint: "„whose“ iyelik taşıyor; silinecek bir şey yok.",
      },
      {
        kind: "build",
        tr: "Sonun aceleye gelmiş olması gerek.",
        answer: "The ending must have been hasty.",
        hint: "Çıkarım: kanıt tek bir açıklama bırakıyor.",
      },
      {
        kind: "form",
        prompt: "Silme kartını doldur.",
        facts: "„which is“ siliniyor; „which keeps“ silinmiyor; „whose“ silinmiyor; seçim yapan cümlecikte hiç olmuyor.",
        fields: [
          { label: "which is", answer: "can go", accept: ["deleted"] },
          { label: "which keeps", answer: "stays", accept: ["not „be“"] },
          { label: "whose", answer: "stays", accept: ["possession"] },
          { label: "No commas", answer: "never", accept: ["not allowed"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u17-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 17,
    title: "Never has a defeat caused such outrage",
    genre: "opinion",
    intro: "Üç devrik cümle ve bir plan satırı.",
    gloss: [
      { de: "never has", tr: "hiç olmadı" },
      { de: "rarely does", tr: "nadiren" },
      { de: "only after the final", tr: "ancak finalden sonra" },
      { de: "will have archived", tr: "arşivlemiş olacak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bir yenilgi hiç bu kadar infial yaratmadı.",
        answer: "Never has a defeat caused such outrage.",
        hint: "„has“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Bir destekçi tribünü nadiren erken terk eder.",
        answer: "Rarely does a supporter leave the grandstand early.",
        hint: "„does“ geliyor; ana fiil çekimini kaybediyor.",
      },
      {
        kind: "build",
        tr: "Ancak finalden sonra gerisini tezahüratla destekliyorlar.",
        answer: "Only after the final do they cheer on the rest.",
        hint: "Parçacık „on“ fiille kalıyor; yalnız yardımcı fiil öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Haziranda mektupları arşivlemiş olacağız.",
        answer: "By June we will have archived the letters.",
        hint: "Gelecekte bir tarihten geriye bakış.",
      },
      {
        kind: "build",
        tr: "Eksikliği kaçırmış olamazlar.",
        answer: "They can't have missed the shortcoming.",
        hint: "Olumsuzu „can't have“.",
      },
    ],
  },
];
