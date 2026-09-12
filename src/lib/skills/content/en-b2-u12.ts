import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 12 — "Mayısta güncellenen yazılım, çalışmanın
 * gösterdiği, hiç böyle bir örüntü çıkmadı, başarısız olmuş olmalı".
 *
 * Dört ders: The software, which was updated · What the study shows ·
 * Never has a pattern emerged · It must have failed.
 *
 *   Kelime: software, interface, encryption, malware, surveillance,
 *           radiation, frequency, wavelength, determine, statistical,
 *           imply, specify, interpret, theoretical, numerous, credible,
 *           emerge, arise, extreme, occur, vanish, fluctuate, scarce,
 *           dense, neglect, misjudge, observe, exaggerate, downplay,
 *           contradict, perceive, reflect.
 *   Kalıp:  The software, which was updated in May, failed. ·
 *           The interface, which is why we stopped, is old. ·
 *           The method to which we refer uses encryption. ·
 *           What the study determines is the limit. ·
 *           It was the statistical test that failed. ·
 *           What we imply is not what we say. ·
 *           Never has such a pattern emerged. ·
 *           Rarely does a question arise so early. ·
 *           Only under extreme heat does it occur. ·
 *           The team must have neglected one step. ·
 *           They can't have misjudged the scale. ·
 *           We should have observed it twice.
 *
 * Ünitenin tek öğretme noktası ŞİMDİKİ ZAMANDA DEVRİK SIRA „DOES“
 * İSTİYOR. Devrilecek bir yardımcı fiil yoksa „do/does“ yalnızca
 * taşınacak şey olmak için geliyor, ve ana fiil çekimini kaybediyor:
 * „Rarely does a question arise“, „arises“ değil. İki yaygın yanlış:
 * ana fiili doğrudan devirmek („rarely arises a question“) ve „does“
 * koyup „-s“yi de bırakmak.
 */
export const enB2U12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u12-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 12,
    title: "Never has a pattern emerged",
    genre: "info",
    intro: "Taşınacak yardımcı fiil yoksa ne oluyor?",
    gloss: [
      { de: "plain", tr: "yalın" },
      { de: "sentence", tr: "cümle" },
      { de: "verb", tr: "fiil" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "invert", tr: "devirmek" },
      { de: "appears", tr: "beliriyor" },
      { de: "phrase", tr: "öbek" },
      { de: "error", tr: "yanlış" },
      { de: "inverts", tr: "deviriyor" },
      { de: "directly", tr: "doğrudan" },
      { de: "appear", tr: "belirmek" },
      { de: "the sole purpose", tr: "tek amaç" },
      { de: "an ending", tr: "ek" },
      { de: "deliberate", tr: "kasıtlı" },
      { de: "inserts", tr: "araya sokuyor" },
      { de: "wrongly", tr: "yanlış biçimde" },
      { de: "a results section", tr: "bulgular bölümü" },
      { de: "worth", tr: "değer" },
      { de: "disputes", tr: "itiraz ediyor" },
      { de: "plainly", tr: "yalın biçimde" },
      { de: "a restriction", tr: "sınırlama" },
      { de: "an auxiliary", tr: "yardımcı fiil" },
      { de: "the shape", tr: "biçim" },
    ],
    minutes: 9,
    text:
      "Never has such a pattern emerged. „Has“ has moved in front of the subject, and that is the shape this course has shown four times now.\n" +
      "Rarely does a question arise so early. Look at what has happened here instead. The plain sentence is „a question rarely arises so early“ — present simple, one verb, no auxiliary anywhere. Move „rarely“ to the front and there is nothing to invert, so „does“ appears for the sole purpose of being the thing that moves.\n" +
      "And then the main verb changes. „Arise“, not „arises“. The ending has gone, because „does“ is now carrying it, exactly as it does in a question: does a question arise, not does a question arises.\n" +
      "Only under extreme heat does it occur. The same again, with a phrase of condition at the front and „only“ making it a restriction.\n" +
      "This is where the shape is most often written wrongly, and the error is always one of two. Either the writer inverts the main verb directly — rarely arises a question — which is not English, or the writer inserts „does“ and leaves the ending on, which is worse because it looks deliberate.\n" +
      "A results section reaches for this because a pattern that has never been seen is the only kind worth a first line. Use it once, at the top, where the reader is deciding whether the numbers are worth an hour. After that, write plainly: patterns that emerge, questions that arise, and values that fluctuate between two figures nobody disputes.",
    questions: [
      {
        text: "Why does „does“ appear?",
        options: ["to be the thing that moves", "to make it formal", "to add a meaning"],
        answer: 0,
        explain: "„„does“ appears for the sole purpose of being the thing that moves.“",
      },
      {
        text: "What happens to the main verb?",
        options: ["it loses its ending", "it keeps its ending", "it doubles"],
        answer: 0,
        explain: "„„Arise“, not „arises“. The ending has gone…“",
      },
      {
        kind: "truefalse",
        text: "„Rarely arises a question“ is not English.",
        options: ["True", "False"],
        answer: 0,
        explain: "„rarely arises a question — which is not English…“",
      },
      {
        kind: "gapfill",
        text: "Rarely ___ a question arise so early.",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "„Rarely does a question arise so early.“",
      },
      {
        kind: "order",
        text: "Bulgular bölümünün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Never has such a pattern emerged.",
          "Rarely does a question arise so early.",
          "Only under extreme heat does it occur.",
          "After that, write plainly.",
        ],
        explain: "Yardımcı fiilli, „does“lu, sınırlamalı, en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "Which error looks deliberate?",
        options: [],
        answer: 0,
        accept: ["leaving the ending on", "keeping the ending", "does with the ending"],
        explain: "„the writer inserts „does“ and leaves the ending on, which is worse because it looks deliberate.“",
      },
    ],
  },
  {
    id: "en-b2-u12-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 12,
    title: "What the study shows",
    genre: "opinion",
    intro: "Üçüncü yarık cümle ötekilerden ne yapıyor fazla?",
    gloss: [
      { de: "plain", tr: "yalın" },
      { de: "sentence", tr: "cümle" },
      { de: "cleft", tr: "yarık cümle" },
      { de: "noun", tr: "isim" },
      { de: "halves", tr: "yarılar" },
      { de: "plainly", tr: "yalın biçimde" },
      { de: "the mechanism", tr: "işleyiş" },
      { de: "the effect", tr: "etki" },
      { de: "specific", tr: "belirli" },
      { de: "a discussion section", tr: "tartışma bölümü" },
      { de: "the light", tr: "ışık" },
      { de: "against each other", tr: "karşı karşıya" },
      { de: "admitting", tr: "kabul eden" },
      { de: "a gap", tr: "açık" },
      { de: "an accusation", tr: "suçlama" },
      { de: "a comparison", tr: "karşılaştırma" },
      { de: "an object", tr: "nesne" },
      { de: "specified", tr: "belirtilmiş" },
      { de: "interpreted", tr: "yorumlanmış" },
    ],
    minutes: 9,
    text:
      "What the study determines is the limit. Not the cause, not the mechanism, not the size of the effect: the limit.\n" +
      "The plain version is weaker and it is weaker in a specific way. „The study determines the limit“ is a sentence about the study. The cleft is a sentence about the word „limit“, and in a discussion section that difference decides what the next paragraph is allowed to say.\n" +
      "It was the statistical test that failed. The second shape: the light falls on a noun and everything else goes behind „that“. It answers a question somebody has already asked — something failed, and this says which.\n" +
      "What we imply is not what we say. Now look at this one, because it is doing something the first two are not. Both halves are „what“ clauses, and the sentence is putting them against each other. „Imply“ and „say“ are both ours, both in the paper, and the sentence is admitting a gap between them.\n" +
      "That is a hard thing to write plainly. „We imply something we do not say“ sounds like an accusation. The cleft makes it a comparison, and a comparison is something a reader can check.\n" +
      "Numerous papers would be more credible with one of these and less credible with four. A theoretical claim that has been specified and a result that has been interpreted are different objects, and only one of them needs a sentence telling the reader where to look.",
    questions: [
      {
        text: "What is the cleft a sentence about?",
        options: ["the word „limit“", "the study", "the next paragraph"],
        answer: 0,
        explain: "„The cleft is a sentence about the word „limit“…“",
      },
      {
        text: "What does the third one put against each other?",
        options: ["two „what“ clauses", "two studies", "two tests"],
        answer: 0,
        explain: "„Both halves are „what“ clauses, and the sentence is putting them against each other.“",
      },
      {
        kind: "truefalse",
        text: "Four of these make a paper more credible.",
        options: ["True", "False"],
        answer: 1,
        explain: "„more credible with one of these and less credible with four.“",
      },
      {
        kind: "gapfill",
        text: "What the study determines is the ___.",
        options: [],
        answer: 0,
        accept: ["limit"],
        explain: "„What the study determines is the limit.“",
      },
      {
        kind: "order",
        text: "Tartışmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "What the study determines is the limit.",
          "It was the statistical test that failed.",
          "What we imply is not what we say.",
          "The cleft makes it a comparison.",
        ],
        explain: "Birinci biçim, ikinci biçim, karşı karşıya koyan, en sonda yargı.",
      },
      {
        kind: "short_answer",
        text: "What does the plain version sound like?",
        options: [],
        answer: 0,
        accept: ["an accusation", "a charge", "blame"],
        explain: "„„We imply something we do not say“ sounds like an accusation.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u12-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 12,
    title: "The software, which was updated",
    genre: "dialogue",
    intro: "Bir hata kaydı. Virgüller neyi belirliyor?",
    gloss: [
      { de: "commas", tr: "virgüller" },
      { de: "sentence", tr: "cümle" },
      { de: "whole", tr: "bütün" },
      { de: "able", tr: "muktedir" },
      { de: "preposition", tr: "edat" },
      { de: "comma", tr: "virgül" },
      { de: "installed", tr: "kurulu" },
      { de: "a bug report", tr: "hata kaydı" },
      { de: "a specification", tr: "teknik belge" },
      { de: "a class", tr: "sınıf" },
      { de: "dividing", tr: "bölen" },
      { de: "a policy", tr: "ilke metni" },
      { de: "argued", tr: "tartışılan" },
      { de: "the machine", tr: "makine" },
      { de: "live", tr: "yaşamak" },
      { de: "care", tr: "özen" },
      { de: "describing", tr: "betimleyen" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ayça", text: "The software, which was updated in May, failed. One piece of software on that machine, and the commas say so." },
      { speaker: "Emir", text: "And without them?" },
      { speaker: "Ayça", text: "Without them the sentence says there are several versions installed and the May one is the one that failed. That is a different bug report." },
      { speaker: "Emir", text: "The interface?" },
      { speaker: "Ayça", text: "The interface, which is why we stopped, is old. „Which“ is pointing at the whole of the first half, and „that“ has never been able to do that." },
      { speaker: "Emir", text: "And the third line." },
      { speaker: "Ayça", text: "The method to which we refer uses encryption. The preposition is in front of „which“, which is the only place it goes in a specification." },
      { speaker: "Emir", text: "Nobody says it." },
      { speaker: "Ayça", text: "Nobody says it. In the room it is „the method we refer to“, and both are right; the difference is who is reading and how long the document will live." },
      { speaker: "Emir", text: "Does the surveillance section need the same care?" },
      { speaker: "Ayça", text: "It needs more. A comma there decides whether we are describing one system or dividing a class of them, and a reader who gets that wrong has read a different policy." },
      { speaker: "Emir", text: "And the frequency table?" },
      { speaker: "Ayça", text: "The frequency table has no relative clauses at all, which is why nobody has ever argued about it." },
    ],
    questions: [
      {
        text: "How much software is on that machine?",
        options: ["one piece", "several versions", "two"],
        answer: 0,
        explain: "„One piece of software on that machine, and the commas say so.“",
      },
      {
        text: "Where does the preposition go in a specification?",
        options: ["in front of „which“", "at the end", "after the method"],
        answer: 0,
        explain: "„The preposition is in front of „which“, which is the only place it goes in a specification.“",
      },
      {
        kind: "truefalse",
        text: "Nobody has ever argued about the frequency table.",
        options: ["True", "False"],
        answer: 0,
        explain: "„which is why nobody has ever argued about it.“",
      },
      {
        kind: "gapfill",
        text: "The method to which we refer uses ___.",
        options: [],
        answer: 0,
        accept: ["encryption"],
        explain: "„The method to which we refer uses encryption.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The software, which was updated in May, failed.", "The software, which was updated in May, failed"],
        explain: "Virgüller cümleciği fazladan yapıyor; tek bir yazılım var.",
      },
      {
        kind: "short_answer",
        text: "What does a wrong comma make the reader read?",
        options: [],
        answer: 0,
        accept: ["a different policy", "another policy", "the wrong policy"],
        explain: "„a reader who gets that wrong has read a different policy.“",
      },
    ],
  },
  {
    id: "en-b2-u12-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 12,
    title: "It must have failed",
    genre: "monologue",
    intro: "Üç kip, üç iş. Hangisi birinci tekil şahısta?",
    gloss: [
      { de: "log", tr: "kayıt" },
      { de: "sentence", tr: "cümle" },
      { de: "contains", tr: "içeriyor" },
      { de: "whole", tr: "bütün" },
      { de: "temptation", tr: "ayartı" },
      { de: "a charge", tr: "suçlama" },
      { de: "an explanation", tr: "açıklama" },
      { de: "standing", tr: "ayakta" },
      { de: "a protocol", tr: "yönerge" },
      { de: "a door", tr: "kapı" },
      { de: "a review", tr: "gözden geçirme" },
      { de: "an incident note", tr: "olay notu" },
      { de: "contradicted", tr: "yalanlanmış" },
      { de: "the first person", tr: "birinci tekil" },
      { de: "rules out", tr: "dışarıda bırakıyor" },
      { de: "a run", tr: "koşum" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Tuğçe", text: "The team must have neglected one step. Three runs, the same result, and only one step is not in the log." },
      { speaker: "Tuğçe", text: "That is a conclusion and not a charge. „Must have“ reads the evidence; it says the evidence leaves one explanation standing." },
      { speaker: "Tuğçe", text: "They can't have misjudged the scale. The scale was fixed in the protocol before anybody saw a number, and „can't have“ is how English closes a door with evidence." },
      { speaker: "Tuğçe", text: "Not „mustn't have“. There is no such sentence, and a review that contains one comes back before anybody reads the finding." },
      { speaker: "Tuğçe", text: "We should have observed it twice. The third form, and the only one that is about us rather than about the world." },
      { speaker: "Tuğçe", text: "Those three do the whole of an incident note. What the evidence shows, what it rules out, what we did not do." },
      { speaker: "Tuğçe", text: "The temptation is to exaggerate the first and downplay the third, and a note written that way is contradicted by the next note six weeks later." },
      { speaker: "Tuğçe", text: "So I write the third sentence first, in the first person, and then I go back and see how much of the evidence I still need. It is usually less than I thought." },
    ],
    questions: [
      {
        text: "How many runs were there?",
        options: ["three", "one", "six"],
        answer: 0,
        explain: "„Three runs, the same result…“",
      },
      {
        text: "Which one is about us?",
        options: ["should have observed", "must have neglected", "can't have misjudged"],
        answer: 0,
        explain: "„the only one that is about us rather than about the world.“",
      },
      {
        kind: "truefalse",
        text: "„Mustn't have“ is used in a review.",
        options: ["True", "False"],
        answer: 1,
        explain: "„There is no such sentence, and a review that contains one comes back…“",
      },
      {
        kind: "gapfill",
        text: "The team must have ___ one step.",
        options: [],
        answer: 0,
        accept: ["neglected"],
        explain: "„The team must have neglected one step.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["They can't have misjudged the scale.", "They can't have misjudged the scale"],
        explain: "Kanıt kapıyı kapatıyor: olumsuzu „can't have“.",
      },
      {
        kind: "short_answer",
        text: "Which sentence does Tuğçe write first?",
        options: [],
        answer: 0,
        accept: ["the third one", "the one about us", "should have observed"],
        explain: "„So I write the third sentence first, in the first person…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u12-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 12,
    title: "Never has such a pattern emerged",
    genre: "info",
    intro: "Üç devrik cümle. İkisinde „does“ neden var?",
    gloss: [
      { de: "never has", tr: "hiç olmadı" },
      { de: "rarely does", tr: "nadiren" },
      { de: "only under extreme heat", tr: "yalnızca aşırı sıcakta" },
      { de: "neglected", tr: "ihmal etmiş" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Böyle bir örüntü daha önce hiç ortaya çıkmadı.",
        answer: "Never has such a pattern emerged.",
        hint: "„has“ özneyi atlıyor; fiilin gerisi yerinde.",
      },
      {
        kind: "build",
        tr: "Bir soru bu kadar erken nadiren doğar.",
        answer: "Rarely does a question arise so early.",
        hint: "Şimdiki zamanda „does“ giriyor; ana fiil çekimini kaybediyor.",
      },
      {
        kind: "build",
        tr: "Yalnızca aşırı sıcakta meydana gelir.",
        answer: "Only under extreme heat does it occur.",
        hint: "„only“ sınırlama; yine „does“ taşıyor.",
      },
      {
        kind: "build",
        tr: "Ekip bir adımı ihmal etmiş olmalı.",
        answer: "The team must have neglected one step.",
        hint: "Çıkarım: kanıt tek bir açıklama bırakıyor.",
      },
      {
        kind: "form",
        prompt: "Devrik sıra kartını doldur.",
        facts: "„never“ yardımcı fiili taşıyor; „rarely“ şimdiki zamanda „does“ istiyor; ana fiil eki kaybediyor; iki yaygın yanlış var.",
        fields: [
          { label: "Never", answer: "has such a pattern emerged", accept: ["has"] },
          { label: "Rarely", answer: "does a question arise", accept: ["does"] },
          { label: "The main verb", answer: "loses its ending", accept: ["arise"] },
          { label: "The errors", answer: "two", accept: ["two of them"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u12-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 12,
    title: "What the study determines is the limit",
    genre: "opinion",
    intro: "İki yarık cümle, bir karşıtlık, iki çıkarım.",
    gloss: [
      { de: "what the study determines", tr: "çalışmanın belirlediği" },
      { de: "it was the statistical test", tr: "istatistiksel sınamaydı" },
      { de: "what we imply", tr: "ima ettiğimiz" },
      { de: "misjudged", tr: "yanlış değerlendirmiş" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Çalışmanın belirlediği şey sınır.",
        answer: "What the study determines is the limit.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Başarısız olan istatistiksel sınamaydı.",
        answer: "It was the statistical test that failed.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "build",
        tr: "İma ettiğimiz şey söylediğimiz şey değil.",
        answer: "What we imply is not what we say.",
        hint: "İki „what“ cümleciği karşı karşıya konuyor.",
      },
      {
        kind: "build",
        tr: "Mayısta güncellenen yazılım çöktü.",
        answer: "The software, which was updated in May, failed.",
        hint: "Virgüller cümleciği fazladan yapıyor.",
      },
      {
        kind: "build",
        tr: "Ölçeği yanlış değerlendirmiş olamazlar.",
        answer: "They can't have misjudged the scale.",
        hint: "Olumsuzu „can't have“; „mustn't have“ yok.",
      },
    ],
  },
];
