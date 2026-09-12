import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 22 — "Aramızdaki kişi, hiç bu kadar ağır gelmedi,
 * bir yıl sonra, yanlış anlamış olmalı".
 *
 * Dört ders: The person between us · Never felt so heavy ·
 * A year from now · He must have misunderstood.
 *
 *   Kelime: reserved, ambitious, composed, empathetic, considerate,
 *           impulsive, moody, sociable, burden, trauma, coping,
 *           subconscious, repression, willpower, puberty, obedience,
 *           empathize, unforgiving, lenient, modesty, stubbornness,
 *           generosity.
 *   Kalıp:  My friend, who is reserved, spoke first. ·
 *           My sister, who is ambitious, stayed calm. ·
 *           My colleague, whose manner is composed, asked once. ·
 *           Never has a burden felt so heavy. ·
 *           Rarely does a trauma pass quietly. ·
 *           Only after the talk does the coping begin. ·
 *           By next summer we will have passed the turning point. ·
 *           Next year we will be building a sense of security. ·
 *           By then the puberty will have ended. ·
 *           He must have failed to empathize. ·
 *           They can't have been unforgiving. ·
 *           We should have been more open-minded.
 *
 * Ünitenin tek öğretme noktası OLUMSUZU FİİLE TAŞIMAK. „must have“
 * olumsuzlanamıyor — çıkarımın olumsuzu „can't have“ — ama bazen söylenmek
 * istenen şey „olmadığından eminim“ değil, „olmadı sanırım“. İngilizce o
 * zaman kipi olumlu bırakıp olumsuzu ANA FİİLE taşıyor:
 * „must have failed to empathize“, „must have forgotten“, „must have
 * missed it“.
 */
export const enB2U22: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u22-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 22,
    title: "He must have misunderstood",
    genre: "info",
    intro: "Kip olumlu kalıyor. Olumsuz nereye gidiyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "modal", tr: "kip" },
      { de: "impossible", tr: "olanaksız" },
      { de: "positive", tr: "olumlu" },
      { de: "verb", tr: "fiil" },
      { de: "round", tr: "dolaşarak" },
      { de: "verdict", tr: "hüküm" },
      { de: "a conclusion", tr: "çıkarım" },
      { de: "the negative", tr: "olumsuz" },
      { de: "moves", tr: "taşınıyor" },
      { de: "carries", tr: "taşıyor" },
      { de: "a gap", tr: "boşluk" },
      { de: "softer", tr: "daha yumuşak" },
      { de: "blame", tr: "suçlamak" },
    ],
    minutes: 9,
    text:
      "He must have failed to empathize. Look at what is not in that sentence: there is no „not“ anywhere, and yet it says something negative about him.\n" +
      "The reason is a gap in the modal system. „Must have“ is a conclusion drawn from evidence, and its negative is „can't have“ — but „can't have“ is very strong. It says the thing is impossible.\n" +
      "Often what a writer means is weaker than that: not „it is impossible that he understood“ but „I think he did not“. English has no modal for that, so it leaves the modal positive and moves the negative into the main verb.\n" +
      "„Failed to“ is the usual word for it. So are „forgot to“, „missed“, „left out“ and „never got round to“. Each of them carries a negative inside a positive sentence, and the modal in front stays as it was.\n" +
      "They can't have been unforgiving. That is the strong negative, and it is right here because the evidence is strong: they wrote twice and offered to meet.\n" +
      "We should have been more open-minded. The third form again, about us rather than about them, and it is the sentence people remember from a note like this.\n" +
      "There is a cost to the softer version and it is worth knowing. „Must have failed to“ sounds like a description and „can't have“ sounds like a verdict, and a reader who wants to blame somebody will quote the first one as if it were the second.",
    questions: [
      {
        text: "Why does the modal stay positive?",
        options: ["„can't have“ is too strong", "„must have“ cannot be used", "the sentence is shorter"],
        answer: 0,
        explain: "„its negative is „can't have“ — but „can't have“ is very strong.“",
      },
      {
        text: "Where does the negative go?",
        options: ["into the main verb", "into the modal", "to the end"],
        answer: 0,
        explain: "„it leaves the modal positive and moves the negative into the main verb.“",
      },
      {
        kind: "truefalse",
        text: "„Can't have“ is the weaker of the two.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That is the strong negative…“",
      },
      {
        kind: "gapfill",
        text: "He must have ___ to empathize.",
        options: [],
        answer: 0,
        accept: ["failed"],
        explain: "„He must have failed to empathize.“",
      },
      {
        kind: "order",
        text: "Üç kipin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "He must have failed to empathize.",
          "They can't have been unforgiving.",
          "We should have been more open-minded.",
          "The softer version can be quoted as the stronger one.",
        ],
        explain: "Yumuşak olumsuz, sert olumsuz, kendi payımız; en sonda bedeli.",
      },
      {
        kind: "short_answer",
        text: "What does „must have failed to“ sound like?",
        options: [],
        answer: 0,
        accept: ["a description", "description", "not a verdict"],
        explain: "„„Must have failed to“ sounds like a description…“",
      },
    ],
  },
  {
    id: "en-b2-u22-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 22,
    title: "Never felt so heavy",
    genre: "opinion",
    intro: "Üç devrik cümle. Hangisinde „does“ giriyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "phrase", tr: "öbek" },
      { de: "sentences", tr: "cümleler" },
      { de: "theatre", tr: "tiyatro" },
      { de: "plain", tr: "yalın" },
      { de: "inverted", tr: "devrik" },
      { de: "an auxiliary", tr: "yardımcı fiil" },
      { de: "an ending", tr: "ek" },
      { de: "quietly", tr: "sessizce" },
      { de: "restrictive", tr: "sınırlayıcı" },
      { de: "the first line", tr: "ilk satır" },
      { de: "a leaflet", tr: "broşür" },
      { de: "loud", tr: "yüksek sesli" },
      { de: "shouts", tr: "bağırıyor" },
      { de: "a reader in trouble", tr: "sıkıntıdaki okur" },
      { de: "ordinary", tr: "olağan" },
      { de: "earns", tr: "hak ediyor" },
    ],
    minutes: 9,
    text:
      "Never has a burden felt so heavy. „Has“ in front of the subject, and the sentence is the first line of the leaflet.\n" +
      "Rarely does a trauma pass quietly. Present simple, nothing to move, so „does“ arrives to be the thing that moves, and „pass“ loses its ending.\n" +
      "Only after the talk does the coping begin. A time phrase with „only“, and the same „does“ doing the same job.\n" +
      "Three sentences, and the rule has not changed: negative or restrictive at the front, auxiliary before subject, and the change happens in what follows.\n" +
      "What has changed is the reader. A page about a burden is read by somebody who is carrying one, and the shape that earns its place on a sports page can sound like theatre here.\n" +
      "So one, at the top, and then plain sentences. Repression, self-control and willpower are words that already carry a great deal, and a reader in trouble is not looking for a page that shouts.\n" +
      "The subconscious is the word I take out most often. It is loud in an ordinary sentence and louder in an inverted one, and a leaflet that uses both in the same paragraph has stopped talking to a person and started talking about a subject.",
    questions: [
      {
        text: "What happens to „pass“?",
        options: ["it loses its ending", "it keeps its ending", "it moves forward"],
        answer: 0,
        explain: "„„does“ arrives to be the thing that moves, and „pass“ loses its ending.“",
      },
      {
        text: "Who reads a page about a burden?",
        options: ["somebody carrying one", "a reviewer", "a student"],
        answer: 0,
        explain: "„A page about a burden is read by somebody who is carrying one…“",
      },
      {
        kind: "truefalse",
        text: "The shape works the same on every page.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the shape that earns its place on a sports page can sound like theatre here.“",
      },
      {
        kind: "gapfill",
        text: "Only after the talk ___ the coping begin.",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "„Only after the talk does the coping begin.“",
      },
      {
        kind: "order",
        text: "Broşürün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Never has a burden felt so heavy.",
          "Rarely does a trauma pass quietly.",
          "Only after the talk does the coping begin.",
          "So one, at the top, and then plain sentences.",
        ],
        explain: "Üç örnek, en sonda yazarın kendi kuralı.",
      },
      {
        kind: "short_answer",
        text: "Which word does the writer take out most often?",
        options: [],
        answer: 0,
        accept: ["the subconscious", "subconscious", "the loud one"],
        explain: "„The subconscious is the word I take out most often.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u22-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 22,
    title: "The person between us",
    genre: "dialogue",
    intro: "„who is“ + sıfat. Burada silme neden işlemiyor?",
    gloss: [
      { de: "commas", tr: "virgüller" },
      { de: "deletion", tr: "silme" },
      { de: "adjective", tr: "sıfat" },
      { de: "sentence", tr: "cümle" },
      { de: "either", tr: "ikisinden biri" },
      { de: "units", tr: "üniteler" },
      { de: "extra", tr: "fazladan" },
      { de: "a noun phrase", tr: "isim öbeği" },
      { de: "on its own", tr: "tek başına" },
      { de: "sounds odd", tr: "kulağa tuhaf geliyor" },
      { de: "in front of", tr: "önünde" },
      { de: "possession", tr: "iyelik" },
      { de: "a manner", tr: "tavır" },
      { de: "a limit", tr: "sınır" },
    ],
    minutes: 7,
    segments: [
      { speaker: "İnci", text: "My friend, who is reserved, spoke first. Two commas, so the clause is extra, and you would think the two words can go." },
      { speaker: "Barkın", text: "They cannot?" },
      { speaker: "İnci", text: "„My friend, reserved, spoke first“ sounds odd. The deletion works when „be“ is followed by a noun phrase, not by a single adjective on its own." },
      { speaker: "Barkın", text: "So where does the adjective go?" },
      { speaker: "İnci", text: "In front of the noun. „My reserved friend spoke first“, and the sentence is shorter than either of the others." },
      { speaker: "Barkın", text: "And if the adjective is longer?" },
      { speaker: "İnci", text: "Then it works again. „My friend, always reserved with strangers, spoke first“ is fine, because the adjective now has something with it." },
      { speaker: "Barkın", text: "The second line is the same shape." },
      { speaker: "İnci", text: "My sister, who is ambitious, stayed calm. The same limit, and the same answer: an ambitious sister, or a longer clause." },
      { speaker: "Barkın", text: "And the third?" },
      { speaker: "İnci", text: "My colleague, whose manner is composed, asked once. „Whose“ carries possession and nothing can be deleted, which is the rule from three units ago and it has not moved." },
      { speaker: "Barkın", text: "So the deletion has two limits." },
      { speaker: "İnci", text: "Two limits. Only after „be“, and only when what follows is a noun phrase." },
    ],
    questions: [
      {
        text: "When does the deletion work?",
        options: ["before a noun phrase", "before an adjective", "always"],
        answer: 0,
        explain: "„The deletion works when „be“ is followed by a noun phrase, not by a single adjective on its own.“",
      },
      {
        text: "Where does a single adjective go?",
        options: ["in front of the noun", "after the noun", "at the end"],
        answer: 0,
        explain: "„In front of the noun. „My reserved friend spoke first“…“",
      },
      {
        kind: "truefalse",
        text: "A longer adjective phrase cannot sit between commas.",
        options: ["True", "False"],
        answer: 1,
        explain: "„„My friend, always reserved with strangers, spoke first“ is fine…“",
      },
      {
        kind: "gapfill",
        text: "My colleague, ___ manner is composed, asked once.",
        options: [],
        answer: 0,
        accept: ["whose"],
        explain: "„My colleague, whose manner is composed, asked once.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["My sister, who is ambitious, stayed calm.", "My sister, who is ambitious, stayed calm"],
        explain: "Tek sıfat ortada duramıyor; ya isimden önce ya uzun bir öbek içinde.",
      },
      {
        kind: "short_answer",
        text: "How many limits does the deletion have?",
        options: [],
        answer: 0,
        accept: ["two", "2", "two limits"],
        explain: "„Two limits. Only after „be“, and only when what follows is a noun phrase.“",
      },
    ],
  },
  {
    id: "en-b2-u22-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 22,
    title: "A year from now",
    genre: "monologue",
    intro: "Bir yıl sonrası. Hangi cümle bitmişi anlatıyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "somewhere", tr: "bir yerde" },
      { de: "verb", tr: "fiil" },
      { de: "a state", tr: "durum" },
      { de: "inside", tr: "içinde" },
      { de: "a turning point", tr: "dönüm noktası" },
      { de: "a sense of security", tr: "güvenlik duygusu" },
      { de: "arranged", tr: "ayarlanmış" },
      { de: "a promise", tr: "söz" },
      { de: "a calendar", tr: "takvim" },
      { de: "honest", tr: "dürüst" },
      { de: "control", tr: "denetlemek" },
      { de: "a diary", tr: "günlük" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ceren Su", text: "By next summer we will have passed the turning point. A point in time, a finished state, and nobody in the sentence." },
      { speaker: "Ceren Su", text: "That is the shape for a plan and it is the wrong shape for a promise, and a family diary is somewhere between the two." },
      { speaker: "Ceren Su", text: "Next year we will be building a sense of security. Inside the work rather than after it, and honest: building is not a thing that finishes on a date." },
      { speaker: "Ceren Su", text: "By then the puberty will have ended. Four words of verb, and it is the only sentence on the page that I do not control at all." },
      { speaker: "Ceren Su", text: "That is the interesting one. A future perfect about something nobody arranged reads like a plan and is a hope." },
      { speaker: "Ceren Su", text: "So I keep it, because the page is a diary and not a contract, and a diary is allowed to hope on a calendar." },
      { speaker: "Ceren Su", text: "The obedience line came out. It was written in the same shape and it was not a hope; it was an instruction with a date on it." },
      { speaker: "Ceren Su", text: "What is left is one finished state, one thing in progress, and one hope, and I can tell you which is which without looking at the page." },
    ],
    questions: [
      {
        text: "Which sentence does she not control?",
        options: ["the one about puberty", "the one about summer", "the one about security"],
        answer: 0,
        explain: "„it is the only sentence on the page that I do not control at all.“",
      },
      {
        text: "What does a future perfect about that read like?",
        options: ["a plan, but it is a hope", "a promise", "an instruction"],
        answer: 0,
        explain: "„A future perfect about something nobody arranged reads like a plan and is a hope.“",
      },
      {
        kind: "truefalse",
        text: "The obedience line is still on the page.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The obedience line came out.“",
      },
      {
        kind: "gapfill",
        text: "Next year we will be ___ a sense of security.",
        options: [],
        answer: 0,
        accept: ["building"],
        explain: "„Next year we will be building a sense of security.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By then the puberty will have ended.", "By then the puberty will have ended"],
        explain: "Edilgen değil ama bitmiş: „will have“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What is left on the page?",
        options: [],
        answer: 0,
        accept: ["one of each", "three things", "a state and a hope"],
        explain: "„one finished state, one thing in progress, and one hope…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u22-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 22,
    title: "He must have failed to empathize",
    genre: "info",
    intro: "Üç kip. Olumsuz hangisinde fiile geçiyor?",
    gloss: [
      { de: "must have failed", tr: "başaramamış olmalı" },
      { de: "can't have been", tr: "olmuş olamaz" },
      { de: "should have been", tr: "olmamız gerekirdi" },
      { de: "who is reserved", tr: "mesafeli olan" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Empati kurmayı başaramamış olmalı.",
        answer: "He must have failed to empathize.",
        hint: "Kip olumlu kalıyor; olumsuz ana fiile taşınıyor.",
      },
      {
        kind: "build",
        tr: "Affetmez olmuş olamazlar.",
        answer: "They can't have been unforgiving.",
        hint: "Sert olumsuz: „can't have“.",
      },
      {
        kind: "build",
        tr: "Daha açık fikirli olmamız gerekirdi.",
        answer: "We should have been more open-minded.",
        hint: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "build",
        tr: "Mesafeli olan arkadaşım ilk konuştu.",
        answer: "My friend, who is reserved, spoke first.",
        hint: "Tek sıfat ortada duruyor; silinemiyor.",
      },
      {
        kind: "form",
        prompt: "Kip kartını doldur.",
        facts: "„must have“ olumsuzlanamıyor; sert olumsuz „can't have“; yumuşak olumsuz ana fiile taşınıyor; ikisi aynı şey değil.",
        fields: [
          { label: "Strong", answer: "can't have", accept: ["the strong one"] },
          { label: "Soft", answer: "must have failed to", accept: ["failed to"] },
          { label: "The modal", answer: "does not change", accept: ["it stays"] },
          { label: "The risk", answer: "quoted as the strong one", accept: ["a wrong reading"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u22-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 22,
    title: "Never has a burden felt so heavy",
    genre: "opinion",
    intro: "Üç devrik cümle ve bir takvim.",
    gloss: [
      { de: "never has", tr: "hiç olmadı" },
      { de: "rarely does", tr: "nadiren" },
      { de: "only after the talk", tr: "ancak konuşmadan sonra" },
      { de: "will have passed", tr: "geçmiş olacak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bir yük hiç bu kadar ağır gelmedi.",
        answer: "Never has a burden felt so heavy.",
        hint: "„has“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Bir travma nadiren sessizce geçer.",
        answer: "Rarely does a trauma pass quietly.",
        hint: "„does“ geliyor; ana fiil çekimini kaybediyor.",
      },
      {
        kind: "build",
        tr: "Ancak konuşmadan sonra başa çıkma başlıyor.",
        answer: "Only after the talk does the coping begin.",
        hint: "„only“ sınırlama; yine „does“ taşıyor.",
      },
      {
        kind: "build",
        tr: "Gelecek yaza kadar dönüm noktasını geçmiş olacağız.",
        answer: "By next summer we will have passed the turning point.",
        hint: "Gelecekte bir tarihten geriye bakış.",
      },
      {
        kind: "build",
        tr: "Gelecek yıl bir güvenlik duygusu inşa ediyor olacağız.",
        answer: "Next year we will be building a sense of security.",
        hint: "İşin içinde olmak: sürerli biçim.",
      },
    ],
  },
];
