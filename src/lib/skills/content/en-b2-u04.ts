import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 4 — "Neyin kararlaştırıldığı, resmî şikâyet, yolun
 * yarısında buluşmak, anlaşsaydık".
 *
 * Dört ders: What was agreed · The formal complaint · Meeting halfway ·
 * If we had agreed.
 *
 *   Kelime: obligation, concession, acknowledge, settle, withdraw,
 *           goodwill, resolution, decline, enforce, reimburse, perform,
 *           violate, jurisdiction, representative, seal, dismiss, rigid,
 *           flexible, mediation, modest, sincere, aggressive, unfair,
 *           arbitration, settled, extension, void, suspend, terminate,
 *           prior, opponent, compensation.
 *   Kalıp:  You must have misread the obligation. ·
 *           We can't have made that concession. ·
 *           They should have acknowledged the letter. ·
 *           The enforcement of the rule took months. ·
 *           The reimbursement of the cost is due. ·
 *           The performance of the contract was late. ·
 *           Admittedly, our position was rather rigid. ·
 *           We are flexible; nevertheless, the date stands. ·
 *           Presumably mediation would be faster. ·
 *           If we had agreed, the matter would have been settled. ·
 *           If we had asked for an extension, we would be calmer now. ·
 *           If the clause had been void, we would have stopped.
 *
 * Ünitenin tek öğretme noktası FİİLDEN İSİM YAPMANIN KURALI YOK, LİSTESİ
 * VAR. „enforce“ → „enforcement“, „reimburse“ → „reimbursement“, ama
 * „perform“ → „performance“; „violate“ → „violation“, „dismiss“ →
 * „dismissal“. Ek fiilden türetilemiyor, çift çift ezberleniyor — ve
 * resmî şikâyet neredeyse tümüyle bu isimlerle yazılıyor.
 */
export const enB2U04: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u04-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 4,
    title: "The formal complaint",
    genre: "info",
    intro: "Üç fiil, üç ayrı ek. Hangisi kuraldan çıkarılabiliyor?",
    gloss: [
      { de: "nouns", tr: "isimler" },
      { de: "verbs", tr: "fiiller" },
      { de: "performment", tr: "yanlış biçim" },
      { de: "violation", tr: "ihlal" },
      { de: "dismissal", tr: "geçersiz sayma" },
      { de: "acknowledgement", tr: "kabul bildirimi" },
      { de: "anywhere", tr: "başka yerde" },
      { de: "entirely", tr: "tümüyle" },
      { de: "sentence", tr: "cümle" },
      { de: "appearing", tr: "görünen" },
      { de: "verb", tr: "fiil" },
      { de: "own", tr: "kendi" },
      { de: "version", tr: "sürüm" },
      { de: "noun", tr: "isim" },
      { de: "enforcement", tr: "uygulatma" },
      { de: "reimbursement", tr: "geri ödeme" },
      { de: "performance", tr: "ifa" },
      { de: "a pattern", tr: "örüntü" },
      { de: "an ending", tr: "ek" },
      { de: "convert", tr: "çevirmek" },
      { de: "numbered", tr: "numaralı" },
      { de: "a paragraph", tr: "paragraf" },
      { de: "dated", tr: "tarihlenmiş" },
      { de: "measured", tr: "ölçülmüş" },
      { de: "spelling", tr: "yazım" },
      { de: "argued", tr: "tartışılan" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "underneath", tr: "altta" },
      { de: "vocabulary", tr: "söz varlığı" },
      { de: "buries", tr: "gömüyor" },
      { de: "a pair", tr: "çift" },
    ],
    minutes: 9,
    text:
      "The enforcement of the rule took months. The reimbursement of the cost is due. The performance of the contract was late. Three nouns made from three verbs, and not one of them tells you how the next one will be made.\n" +
      "Enforce becomes enforcement. Reimburse becomes reimbursement. So far there is a pattern, and the pattern breaks at the third: perform does not become performment. It becomes performance.\n" +
      "There is no rule. There is a list, and it has to be learnt one pair at a time. Violate becomes violation. Dismiss becomes dismissal. Acknowledge becomes acknowledgement, and the spelling of that one is argued about in this office twice a year.\n" +
      "The reason it matters here rather than anywhere else is that a formal complaint is written almost entirely in these nouns. „We enforced the rule“ is a sentence about us. „The enforcement of the rule“ is a thing, and a thing can be dated, measured and put in a numbered paragraph without anybody appearing in it.\n" +
      "So a letter of this kind has two costs at once. It buries the people, which is usually the point, and it demands a vocabulary in which every second word has an ending you cannot work out from the verb.\n" +
      "My own habit is to write the verb first and convert afterwards. „They did not perform the contract on time“ goes down on the page, and then it becomes „the performance of the contract was late“ in the version that is sent. The sentence that goes out has no people in it. The one underneath still does, which is how I check that I know what I am claiming.",
    questions: [
      {
        text: "What does „perform“ become?",
        options: ["performance", "performment", "enforcement"],
        answer: 0,
        explain: "„perform does not become performment. It becomes performance.“",
      },
      {
        text: "How are the endings learnt?",
        options: ["one pair at a time", "from a single rule", "from the spelling"],
        answer: 0,
        explain: "„There is a list, and it has to be learnt one pair at a time.“",
      },
      {
        kind: "truefalse",
        text: "A thing can be dated and measured.",
        options: ["True", "False"],
        answer: 0,
        explain: "„a thing can be dated, measured and put in a numbered paragraph…“",
      },
      {
        kind: "gapfill",
        text: "The ___ of the cost is due.",
        options: [],
        answer: 0,
        accept: ["reimbursement"],
        explain: "„The reimbursement of the cost is due.“",
      },
      {
        kind: "order",
        text: "Eklerin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Enforce becomes enforcement.",
          "Reimburse becomes reimbursement.",
          "Perform becomes performance.",
          "There is no rule; there is a list.",
        ],
        explain: "İki düzenli örnek, sonra kırılma, en sonda kuralın kendisi.",
      },
      {
        kind: "short_answer",
        text: "What does the writer do first?",
        options: [],
        answer: 0,
        accept: ["writes the verb", "the verb first", "writes it with people"],
        explain: "„My own habit is to write the verb first and convert afterwards.“",
      },
    ],
  },
  {
    id: "en-b2-u04-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 4,
    title: "If we had agreed",
    genre: "opinion",
    intro: "Uyuşmazlıkta iki koşul. Hangisi bugüne dokunuyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "actually", tr: "aslında" },
      { de: "sentences", tr: "cümleler" },
      { de: "event", tr: "olay" },
      { de: "version", tr: "sürüm" },
      { de: "closed", tr: "kapalı" },
      { de: "calmer", tr: "daha sakin" },
      { de: "the calm", tr: "sakinlik" },
      { de: "mixed", tr: "karışık" },
      { de: "a state", tr: "durum" },
      { de: "available", tr: "elde olan" },
      { de: "the temptation", tr: "ayartı" },
      { de: "safer", tr: "daha güvenli" },
      { de: "contested", tr: "itiraz edilen" },
      { de: "an account", tr: "anlatım" },
      { de: "removed", tr: "ortadan kaldırırdı" },
      { de: "described", tr: "betimledi" },
      { de: "moved", tr: "etkiledi" },
      { de: "entirely", tr: "tümüyle" },
    ],
    minutes: 9,
    text:
      "If we had agreed, the matter would have been settled. A closed sentence about a closed week, and it is the one everybody writes first.\n" +
      "If we had asked for an extension, we would be calmer now. Look at what has moved. The asking is finished and the calm is not; the second half has come forward into the present, because that is where its result lives.\n" +
      "That is the sentence a mediation actually needs. Nobody in the room is going to change what happened in March. What they can change is the state everyone is in on the day of the meeting, and the mixed form is the only one that names it.\n" +
      "If the clause had been void, we would have stopped. Closed, and right to be closed: stopping was available in one week and that week ended.\n" +
      "The temptation in a dispute is to write only closed sentences, because they are safer. Nothing in them is claimed about now, so nothing in them can be contested. A letter made entirely of them reads as a complete account of a finished event, and it leaves the reader with nothing to do.\n" +
      "Our position was that a prior extension would have removed the need for arbitration. That is true and it is closed. The open version — an extension would leave both sides with a working contract now — is the one that moved the other side, and it moved them because it described a room they were sitting in rather than one they had left.",
    questions: [
      {
        text: "Why does the second sentence say „would be“?",
        options: ["the calm is not finished", "the asking is not finished", "it is more polite"],
        answer: 0,
        explain: "„The asking is finished and the calm is not…“",
      },
      {
        text: "Why do people write only closed sentences?",
        options: ["they are safer", "they are shorter", "they are older"],
        answer: 0,
        explain: "„The temptation in a dispute is to write only closed sentences, because they are safer.“",
      },
      {
        kind: "truefalse",
        text: "The closed version moved the other side.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The open version… is the one that moved the other side.“",
      },
      {
        kind: "gapfill",
        text: "If we had asked for an extension, we would be calmer ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If we had asked for an extension, we would be calmer now.“",
      },
      {
        kind: "order",
        text: "Uyuşmazlığın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "If we had agreed, the matter would have been settled.",
          "If we had asked for an extension, we would be calmer now.",
          "If the clause had been void, we would have stopped.",
          "A letter made only of closed sentences leaves nothing to do.",
        ],
        explain: "Kapalı, karışık, yine kapalı, en sonda bedeli.",
      },
      {
        kind: "short_answer",
        text: "What did the open version describe?",
        options: [],
        answer: 0,
        accept: ["a room they were in", "the present room", "where they were sitting"],
        explain: "„it described a room they were sitting in rather than one they had left.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u04-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 4,
    title: "What was agreed",
    genre: "dialogue",
    intro: "Üç kip, üç ayrı ağırlık. Hangisi özür davet ediyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "verb", tr: "fiil" },
      { de: "prohibition", tr: "yasak" },
      { de: "misread", tr: "yanlış okumak" },
      { de: "an accusation", tr: "suçlama" },
      { de: "a reading", tr: "okuma" },
      { de: "a signature", tr: "imza" },
      { de: "closed off", tr: "kapatılmış" },
      { de: "a judgement", tr: "yargı" },
      { de: "an apology", tr: "özür" },
      { de: "invite", tr: "davet etmek" },
      { de: "cheaper", tr: "daha ucuz" },
      { de: "carries away", tr: "yanında götürüyor" },
      { de: "backwards", tr: "geriye" },
      { de: "a draft", tr: "taslak" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Deniz", text: "You must have misread the obligation. There is no other way to get from that paragraph to the number in your letter." },
      { speaker: "Ufuk", text: "That is a strong sentence." },
      { speaker: "Deniz", text: "It is a conclusion, not an accusation, and the difference is in the verb. „Must have“ says the evidence leaves one reading." },
      { speaker: "Ufuk", text: "And the second line?" },
      { speaker: "Deniz", text: "We can't have made that concession. There is no minute, no letter and no signature, and „can't have“ is how English says a thing is closed off by the evidence." },
      { speaker: "Ufuk", text: "You did not write „mustn't have“." },
      { speaker: "Deniz", text: "There is no such form. A prohibition cannot point backwards, and every draft that tries it comes back." },
      { speaker: "Ufuk", text: "Then „should have“." },
      { speaker: "Deniz", text: "They should have acknowledged the letter. That one is different in kind: it is not about what happened but about what did not, and it carries a judgement the other two do not." },
      { speaker: "Ufuk", text: "Is that safe in a formal letter?" },
      { speaker: "Deniz", text: "It is the only one of the three that can be answered with goodwill. „Must have“ and „can't have“ invite an argument about facts. „Should have“ invites an apology, and an apology is cheaper than a resolution." },
      { speaker: "Ufuk", text: "So you keep it." },
      { speaker: "Deniz", text: "I keep exactly one, in the last paragraph, where it is the thing the reader carries away." },
    ],
    questions: [
      {
        text: "What does „must have“ say?",
        options: ["the evidence leaves one reading", "the reader is at fault", "the rule was broken"],
        answer: 0,
        explain: "„„Must have“ says the evidence leaves one reading.“",
      },
      {
        text: "Which one invites an apology?",
        options: ["should have", "must have", "can't have"],
        answer: 0,
        explain: "„„Should have“ invites an apology, and an apology is cheaper than a resolution.“",
      },
      {
        kind: "truefalse",
        text: "There is no „mustn't have“ for the past.",
        options: ["True", "False"],
        answer: 0,
        explain: "„There is no such form. A prohibition cannot point backwards…“",
      },
      {
        kind: "gapfill",
        text: "We ___ have made that concession.",
        options: [],
        answer: 0,
        accept: ["can't", "cannot"],
        explain: "„We can't have made that concession.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["They should have acknowledged the letter.", "They should have acknowledged the letter"],
        explain: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "short_answer",
        text: "Where does Deniz keep that sentence?",
        options: [],
        answer: 0,
        accept: ["in the last paragraph", "at the end", "the final paragraph"],
        explain: "„I keep exactly one, in the last paragraph…“",
      },
    ],
  },
  {
    id: "en-b2-u04-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 4,
    title: "Meeting halfway",
    genre: "monologue",
    intro: "Ödün vermek ve yine de durmak. İkisi aynı paragrafta.",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "own", tr: "kendi" },
      { de: "accusation", tr: "suçlama" },
      { de: "myself", tr: "kendime" },
      { de: "per", tr: "başına" },
      { de: "none", tr: "hiçbiri" },
      { de: "neither", tr: "ikisi de değil" },
      { de: "concedes", tr: "ödün veriyor" },
      { de: "won", tr: "kazanılmış" },
      { de: "a description", tr: "betimleme" },
      { de: "the turn", tr: "dönüş" },
      { de: "on purpose", tr: "bilerek" },
      { de: "necessary", tr: "gerekli" },
      { de: "an impression", tr: "izlenim" },
      { de: "avoid", tr: "kaçınmak" },
      { de: "soft", tr: "yumuşak" },
      { de: "holds", tr: "tutuyor" },
      { de: "alone", tr: "tek başına" },
      { de: "cost me", tr: "bana mal oldu" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Lale", text: "Admittedly, our position was rather rigid. That is the first sentence of the letter and it cost me three drafts." },
      { speaker: "Lale", text: "„Admittedly“ concedes something before anyone takes it from me, and a concession that is given is worth more than one that is won." },
      { speaker: "Lale", text: "„Rather rigid“ is doing the second half of the work. „Rigid“ on its own is an accusation I would be making about myself; „rather rigid“ is a description." },
      { speaker: "Lale", text: "We are flexible; nevertheless, the date stands. That is the turn, and it has to come in the same paragraph, or the concession starts to look like a position." },
      { speaker: "Lale", text: "Presumably mediation would be faster. „Presumably“ is the weakest word in the letter and it is there on purpose: I do not want to be the one who said mediation was necessary." },
      { speaker: "Lale", text: "The danger with all of these is the same. Four of them on a page and the reader hears somebody who will not say anything, which is exactly the impression the words were chosen to avoid." },
      { speaker: "Lale", text: "So the rule is one per paragraph, and none in the sentence that carries a number or a date." },
      { speaker: "Lale", text: "A modest, sincere letter is not a soft one. It concedes what is true, it holds what matters, and the two things sit in the same paragraph so that neither can be read alone." },
    ],
    questions: [
      {
        text: "Which concession is worth more?",
        options: ["one that is given", "one that is won", "one that is written"],
        answer: 0,
        explain: "„a concession that is given is worth more than one that is won.“",
      },
      {
        text: "Why is „presumably“ there?",
        options: ["on purpose, as the weakest word", "to name the source", "to close the letter"],
        answer: 0,
        explain: "„„Presumably“ is the weakest word in the letter and it is there on purpose…“",
      },
      {
        kind: "truefalse",
        text: "A modest letter is a soft one.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A modest, sincere letter is not a soft one.“",
      },
      {
        kind: "gapfill",
        text: "We are flexible; ___, the date stands.",
        options: [],
        answer: 0,
        accept: ["nevertheless"],
        explain: "„We are flexible; nevertheless, the date stands.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Admittedly, our position was rather rigid.", "Admittedly, our position was rather rigid"],
        explain: "Kimse almadan önce verilen ödün.",
      },
      {
        kind: "short_answer",
        text: "How many of these words per paragraph?",
        options: [],
        answer: 0,
        accept: ["one", "one per paragraph", "just one"],
        explain: "„So the rule is one per paragraph…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u04-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 4,
    title: "The enforcement of the rule took months",
    genre: "info",
    intro: "Üç isim, üç ayrı ek. Hangisi listeden geliyor?",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "the enforcement", tr: "uygulatılması" },
      { de: "the reimbursement", tr: "geri ödemesi" },
      { de: "the performance", tr: "ifası" },
      { de: "acknowledged", tr: "kabul ettiğini bildirdi" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kuralın uygulatılması aylar sürdü.",
        answer: "The enforcement of the rule took months.",
        hint: "Fiil isme dönüyor; eki ezberden geliyor: „-ment“.",
      },
      {
        kind: "build",
        tr: "Masrafın geri ödemesi gelmiş durumda.",
        answer: "The reimbursement of the cost is due.",
        hint: "Yine „-ment“; ama bu bir kural değil, liste.",
      },
      {
        kind: "build",
        tr: "Sözleşmenin ifası gecikti.",
        answer: "The performance of the contract was late.",
        hint: "Burada „-ance“ geliyor; „performment“ diye bir şey yok.",
      },
      {
        kind: "build",
        tr: "Mektubu kabul ettiklerini bildirmeleri gerekirdi.",
        answer: "They should have acknowledged the letter.",
        hint: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "form",
        prompt: "Adlaştırma kartını doldur.",
        facts: "„enforce“ „-ment“ alıyor; „reimburse“ de „-ment“ alıyor; „perform“ „-ance“ alıyor; kural yok, liste var.",
        fields: [
          { label: "Enforce", answer: "enforcement", accept: ["the enforcement"] },
          { label: "Reimburse", answer: "reimbursement", accept: ["the reimbursement"] },
          { label: "Perform", answer: "performance", accept: ["the performance"] },
          { label: "The rule", answer: "there is none", accept: ["a list"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u04-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 4,
    title: "If we had asked for an extension, we would be calmer now",
    genre: "opinion",
    intro: "Kapalı koşul, karışık koşul, iki çıkarım.",
    gloss: [
      { de: "would have been settled", tr: "çözüme bağlanmış olurdu" },
      { de: "would be calmer", tr: "daha sakin olurduk" },
      { de: "must have misread", tr: "yanlış okumuş olmalı" },
      { de: "can't have made", tr: "vermiş olamaz" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Anlaşsaydık mesele çözüme bağlanmış olurdu.",
        answer: "If we had agreed, the matter would have been settled.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Süre uzatımı isteseydik şimdi daha sakin olurduk.",
        answer: "If we had asked for an extension, we would be calmer now.",
        hint: "Karışık koşul: sonuç bugüne ait.",
      },
      {
        kind: "build",
        tr: "Hüküm hükümsüz olsaydı dururduk.",
        answer: "If the clause had been void, we would have stopped.",
        hint: "Yine kapalı: durma kararı o haftaya aitti.",
      },
      {
        kind: "build",
        tr: "Yükümlülüğü yanlış okumuş olmalısın.",
        answer: "You must have misread the obligation.",
        hint: "Çıkarım: kanıt tek bir okuma bırakıyor.",
      },
      {
        kind: "build",
        tr: "O ödünü vermiş olamayız.",
        answer: "We can't have made that concession.",
        hint: "Kanıt kapatıyor: olumsuzu „can't have“.",
      },
    ],
  },
];
