import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 5 — "Sert mektup, kısaca ne oldu, kim kim, son tarih
 * baskısı".
 *
 * Dört ders: A firm letter · What happened, briefly · Who is who ·
 * By the time you read this.
 *
 *   Kelime: severe, escalation, recipient, obliged, mild, sender,
 *           binding, liable, incident, prompt, dispatch, resume, freeze,
 *           circumstance, version, admission, tender, director,
 *           procedure, executive, mutual, entitle, criterion, norm,
 *           execute, bond, detailed, credibility, concise, ambiguous,
 *           implicit, informal.
 *   Kalıp:  Under no circumstances will we accept a severe delay. ·
 *           Not until the escalation did they reply. ·
 *           Only then will the recipient be obliged. ·
 *           Having reviewed the incident, we wrote the note. ·
 *           Being prompt, the team dispatched the goods. ·
 *           Delayed on Monday, the account was resumed later. ·
 *           Ana, who signed the tender, is the director. ·
 *           The procedure, which is why we waited, is slow. ·
 *           The executive to whom we report is new. ·
 *           By Friday we will have executed the order. ·
 *           This time next week we will be checking the bond. ·
 *           The detailed reply will have been sent by then.
 *
 * Ünitenin tek öğretme noktası DEVRİLEN ANA CÜMLE, ÖNE ÇIKAN ÖĞE DEĞİL.
 * Ünite 3 kapının dar olduğunu göstermişti; burada öne çıkan öğe bir
 * sözcük değil bir ÖBEK ya da bütün bir CÜMLECİK oluyor ve devrilme yine
 * arkadan gelende gerçekleşiyor: „Not until they had escalated it did
 * they reply“ — ilk yarı olduğu gibi duruyor, „did“ ana cümlede.
 */
export const enB2U05: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u05-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 5,
    title: "A firm letter",
    genre: "opinion",
    intro: "Öne çıkan öbek uzuyor. Devrilen hangi yarı?",
    gloss: [
      { de: "phrase", tr: "öbek" },
      { de: "itself", tr: "kendisi" },
      { de: "appears", tr: "beliriyor" },
      { de: "whole", tr: "bütün" },
      { de: "own", tr: "kendi" },
      { de: "verb", tr: "fiil" },
      { de: "reaches", tr: "uzanıyor" },
      { de: "noun", tr: "isim" },
      { de: "fronted", tr: "öne çıkarılmış" },
      { de: "jumped", tr: "atladı" },
      { de: "the inversion", tr: "devrik sıra" },
      { de: "a restriction", tr: "sınırlama" },
      { de: "excluded", tr: "dışarıda bırakılmış" },
      { de: "the register", tr: "dil düzeyi" },
      { de: "grateful", tr: "müteşekkir" },
      { de: "shouting", tr: "bağıran" },
      { de: "shouts", tr: "bağırıyor" },
      { de: "ordinary", tr: "olağan" },
      { de: "the element", tr: "öğe" },
      { de: "harder", tr: "daha zor" },
      { de: "waiting", tr: "bekleyen" },
      { de: "the door", tr: "kapı" },
    ],
    minutes: 9,
    text:
      "Under no circumstances will we accept a severe delay. The fronted phrase is four words long, and what it moves is not inside itself: „will“ has jumped in front of „we“ in the part that comes after.\n" +
      "That is the thing to hold on to. The inversion never happens in the fronted element. It happens in the clause that follows it, and the longer the fronted element gets, the easier it is to forget.\n" +
      "Not until the escalation did they reply. Here the first half is a phrase about time, and the second half is where „did“ appears, in front of „they“, exactly as it would in a question.\n" +
      "Now take the harder version. Not until they had escalated it did they reply. The first half is a whole clause with its own subject and verb, and that clause keeps its ordinary order — they had escalated, nothing moved. The inversion is still waiting in the main clause, where it always was.\n" +
      "Only then will the recipient be obliged. The same shape, and „only“ is the third of the words that open this door: a restriction, like a negative, because it says that everything outside the named case is excluded.\n" +
      "The register is severe, and that is the point of using it in a letter that has already been mild twice. A sender who has written „we would be grateful“ in two letters and then writes „under no circumstances“ in the third has said something with the grammar before the reader reaches the noun.\n" +
      "Once is enough. Twice and the letter is shouting, and a letter that shouts is answered by somebody whose job is to answer letters that shout.",
    questions: [
      {
        text: "Where does the inversion happen?",
        options: ["in the clause that follows", "in the fronted element", "in the question"],
        answer: 0,
        explain: "„The inversion never happens in the fronted element. It happens in the clause that follows it…“",
      },
      {
        text: "What happens to „they had escalated it“?",
        options: ["it keeps its ordinary order", "it moves as well", "it loses its subject"],
        answer: 0,
        explain: "„that clause keeps its ordinary order — they had escalated, nothing moved.“",
      },
      {
        kind: "truefalse",
        text: "„Only“ is a restriction that works like a negative.",
        options: ["True", "False"],
        answer: 0,
        explain: "„a restriction, like a negative, because it says that everything outside the named case is excluded.“",
      },
      {
        kind: "gapfill",
        text: "Only then ___ the recipient be obliged.",
        options: [],
        answer: 0,
        accept: ["will"],
        explain: "„Only then will the recipient be obliged.“",
      },
      {
        kind: "order",
        text: "Sertliğin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Under no circumstances will we accept a severe delay.",
          "Not until the escalation did they reply.",
          "Not until they had escalated it did they reply.",
          "Only then will the recipient be obliged.",
        ],
        explain: "Öbek, zaman öbeği, bütün bir cümlecik, en sonda sınırlama.",
      },
      {
        kind: "short_answer",
        text: "How often should the writer use it?",
        options: [],
        answer: 0,
        accept: ["once", "once is enough", "one time"],
        explain: "„Once is enough. Twice and the letter is shouting…“",
      },
    ],
  },
  {
    id: "en-b2-u05-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 5,
    title: "Who is who",
    genre: "info",
    intro: "Tarafları sayan paragraf. Virgüller ne yapıyor?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "whole", tr: "bütün" },
      { de: "writers", tr: "yazarlar" },
      { de: "own", tr: "kendi" },
      { de: "either", tr: "ikisinden biri" },
      { de: "whatever", tr: "her ne" },
      { de: "a comma", tr: "virgül" },
      { de: "the parties", tr: "taraflar" },
      { de: "attached", tr: "iliştirilmiş" },
      { de: "avoid", tr: "kaçınmak" },
      { de: "impossible", tr: "olanaksız" },
      { de: "a diagram", tr: "çizim" },
      { de: "failed", tr: "başarısız oldu" },
      { de: "out loud", tr: "sesli olarak" },
      { de: "several", tr: "birkaç" },
      { de: "extra", tr: "fazladan" },
      { de: "claim later", tr: "sonradan ileri sürmek" },
      { de: "the section", tr: "bölüm" },
    ],
    minutes: 9,
    text:
      "Ana, who signed the tender, is the director. Two commas, and the clause between them is not choosing anybody: there is one Ana, and we are telling you something about her.\n" +
      "Take the commas out and the sentence says there are several people called Ana in this procedure and we mean the one who signed. In a document that lists the parties, that is not a small mistake.\n" +
      "The procedure, which is why we waited, is slow. „Which“ is pointing at the whole of the first half — the procedure being slow is the reason — and „that“ cannot do that job. In a formal letter this is how a reason gets attached without a second sentence and without the word „because“, which some writers avoid in a document of this kind.\n" +
      "The executive to whom we report is new. Nobody says this out loud. In speech it is „the executive we report to“, and both are correct; the difference is the room the sentence is written for.\n" +
      "So the section naming the parties has a shape of its own. Every clause is extra, every clause takes commas, and the whole paragraph is doing one job: making it impossible for either side to claim later that they did not know who was who.\n" +
      "The criterion I use is mutual. If a reader on the other side could not draw the same diagram from my paragraph, the paragraph has failed, whatever the grammar is doing.",
    questions: [
      {
        text: "What does removing the commas say?",
        options: ["there are several people called Ana", "Ana did not sign", "the tender is slow"],
        answer: 0,
        explain: "„the sentence says there are several people called Ana in this procedure…“",
      },
      {
        text: "What is „which“ pointing at?",
        options: ["the whole first half", "the procedure only", "the writer"],
        answer: 0,
        explain: "„„Which“ is pointing at the whole of the first half…“",
      },
      {
        kind: "truefalse",
        text: "„The executive we report to“ is wrong.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In speech it is „the executive we report to“, and both are correct…“",
      },
      {
        kind: "gapfill",
        text: "Ana, ___ signed the tender, is the director.",
        options: [],
        answer: 0,
        accept: ["who"],
        explain: "„Ana, who signed the tender, is the director.“",
      },
      {
        kind: "order",
        text: "Tarafların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Ana, who signed the tender, is the director.",
          "The procedure, which is why we waited, is slow.",
          "The executive to whom we report is new.",
          "The criterion I use is mutual.",
        ],
        explain: "Kişi, bütün bir düşünce, resmî biçim, en sonda ölçüt.",
      },
      {
        kind: "short_answer",
        text: "When has the paragraph failed?",
        options: [],
        answer: 0,
        accept: ["if they cannot draw it", "if the diagram is not the same", "if the reader cannot"],
        explain: "„If a reader on the other side could not draw the same diagram from my paragraph, the paragraph has failed…“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u05-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 5,
    title: "What happened, briefly",
    genre: "dialogue",
    intro: "Özet ortaçla yazılıyor. Özne hangi yarıya ait?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "conjunction", tr: "bağlaç" },
      { de: "passive", tr: "edilgen" },
      { de: "events", tr: "olaylar" },
      { de: "participle", tr: "ortaç" },
      { de: "whoever", tr: "her kim" },
      { de: "actually", tr: "aslında" },
      { de: "except", tr: "dışında" },
      { de: "belong", tr: "ait olmak" },
      { de: "a summary", tr: "özet" },
      { de: "a breath", tr: "nefes" },
      { de: "promptness", tr: "hız" },
      { de: "evasive", tr: "kaçamak" },
      { de: "hands", tr: "devrediyor" },
      { de: "doubt", tr: "kuşku duymak" },
      { de: "an ambiguity", tr: "belirsizlik" },
      { de: "in full", tr: "tam olarak" },
      { de: "belongs", tr: "ait" },
      { de: "seen twice", tr: "iki kez görülmüş" },
      { de: "costs", tr: "mal oluyor" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ceren", text: "Having reviewed the incident, we wrote the note. One sentence, and it puts the reviewing before the writing without a single conjunction." },
      { speaker: "Hakan", text: "Why does that matter in a summary?" },
      { speaker: "Ceren", text: "Because a summary is read by somebody who will decide something in ninety seconds. Every „after we had“ costs three words and a breath." },
      { speaker: "Hakan", text: "And the second line?" },
      { speaker: "Ceren", text: "Being prompt, the team dispatched the goods. No time gap this time: the promptness and the dispatching are the same fact seen twice." },
      { speaker: "Hakan", text: "The third one is passive." },
      { speaker: "Ceren", text: "Delayed on Monday, the account was resumed later. It starts with the third form, so somebody delayed it and we are not saying who. In a summary of events that is often honest rather than evasive; nobody knows yet." },
      { speaker: "Hakan", text: "What goes wrong most often?" },
      { speaker: "Ceren", text: "The subject. The participle belongs to whoever the main clause is about. „Having reviewed the incident, the note was written“ hands the reviewing to the note." },
      { speaker: "Hakan", text: "Does anybody actually misread it?" },
      { speaker: "Ceren", text: "Nobody misreads it, and everybody sees it. In a document that will be read by people looking for a reason to doubt you, that is worse than an ambiguity." },
      { speaker: "Hakan", text: "So the freeze on the account." },
      { speaker: "Ceren", text: "The freeze goes in the last line, in full words, with a date. A summary can be short everywhere except at the place where somebody lost money." },
    ],
    questions: [
      {
        text: "How long does the reader have?",
        options: ["ninety seconds", "nine seconds", "nine minutes"],
        answer: 0,
        explain: "„a summary is read by somebody who will decide something in ninety seconds.“",
      },
      {
        text: "Who does the participle belong to?",
        options: ["whoever the main clause is about", "the nearest name", "the writer"],
        answer: 0,
        explain: "„The participle belongs to whoever the main clause is about.“",
      },
      {
        kind: "truefalse",
        text: "Nobody misreads the broken sentence.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Nobody misreads it, and everybody sees it.“",
      },
      {
        kind: "gapfill",
        text: "___ prompt, the team dispatched the goods.",
        options: [],
        answer: 0,
        accept: ["Being", "being"],
        explain: "„Being prompt, the team dispatched the goods.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Having reviewed the incident, we wrote the note.", "Having reviewed the incident, we wrote the note"],
        explain: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "Where can a summary not be short?",
        options: [],
        answer: 0,
        accept: ["where money was lost", "at the freeze", "the last line"],
        explain: "„A summary can be short everywhere except at the place where somebody lost money.“",
      },
    ],
  },
  {
    id: "en-b2-u05-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 5,
    title: "By the time you read this",
    genre: "monologue",
    intro: "Söz veren iki biçim. Hangisi denetlenecek bir tarih?",
    gloss: [
      { de: "sentence", tr: "cümle" },
      { de: "stand", tr: "durmak" },
      { de: "control", tr: "denetlemek" },
      { de: "continuous", tr: "sürerli" },
      { de: "passive", tr: "edilgen" },
      { de: "a stretch", tr: "süre aralığı" },
      { de: "a covering letter", tr: "üst yazı" },
      { de: "a schedule", tr: "takvim" },
      { de: "accurate", tr: "isabetli" },
      { de: "a promise", tr: "söz" },
      { de: "a state", tr: "durum" },
      { de: "stronger", tr: "daha güçlü" },
      { de: "activity", tr: "etkinlik" },
      { de: "probably", tr: "büyük olasılıkla" },
      { de: "writes", tr: "yazıyor" },
      { de: "fixed", tr: "sabit" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Görkem", text: "By Friday we will have executed the order. That is a sentence about a point and not a stretch: stand in Friday, look back, and the order is done." },
      { speaker: "Görkem", text: "This time next week we will be checking the bond. That one puts us inside the work instead of after it, and it is the honest form when a thing takes days rather than minutes." },
      { speaker: "Görkem", text: "The detailed reply will have been sent by then. Passive and future perfect together, and the order is fixed: will, have, been, third form." },
      { speaker: "Görkem", text: "I use the first in a covering letter and the second in the schedule, and the difference is credibility rather than grammar." },
      { speaker: "Görkem", text: "A concise letter that promises a finished state is stronger than a detailed one that promises activity — but only if the state is one I control." },
      { speaker: "Görkem", text: "Where I do not control it, the continuous form is not a weaker sentence. It is a more accurate one, and an ambiguous promise costs more later than a modest one does now." },
      { speaker: "Görkem", text: "There is one implicit rule in all of this and nobody writes it down. Every future perfect in a letter is a date somebody will check." },
      { speaker: "Görkem", text: "So the informal version I send to the team says „Friday, probably“. The letter says Friday, and I do not write that sentence until the schedule says the same thing." },
    ],
    questions: [
      {
        text: "Which form puts us inside the work?",
        options: ["we will be checking", "we will have executed", "it will have been sent"],
        answer: 0,
        explain: "„That one puts us inside the work instead of after it…“",
      },
      {
        text: "What is every future perfect in a letter?",
        options: ["a date somebody will check", "a polite form", "a passive"],
        answer: 0,
        explain: "„Every future perfect in a letter is a date somebody will check.“",
      },
      {
        kind: "truefalse",
        text: "The continuous form is a weaker sentence.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the continuous form is not a weaker sentence. It is a more accurate one…“",
      },
      {
        kind: "gapfill",
        text: "By Friday we will have ___ the order.",
        options: [],
        answer: 0,
        accept: ["executed"],
        explain: "„By Friday we will have executed the order.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The detailed reply will have been sent by then.", "The detailed reply will have been sent by then"],
        explain: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What does the informal version say?",
        options: [],
        answer: 0,
        accept: ["Friday, probably", "probably Friday", "Friday"],
        explain: "„the informal version I send to the team says „Friday, probably“.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u05-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 5,
    title: "Under no circumstances will we accept a severe delay",
    genre: "opinion",
    intro: "Üç kapı: olumsuzluk, „not until“, „only then“.",
    gloss: [
      { de: "under no circumstances", tr: "hiçbir koşulda" },
      { de: "not until", tr: "ancak … sonra" },
      { de: "only then", tr: "ancak o zaman" },
      { de: "the tender", tr: "ihale" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Hiçbir koşulda ağır bir gecikmeyi kabul etmeyiz.",
        answer: "Under no circumstances will we accept a severe delay.",
        hint: "Devrilen ana cümle: „will“ özneden öne geçiyor.",
      },
      {
        kind: "build",
        tr: "Ancak üst mercie taşındıktan sonra yanıt verdiler.",
        answer: "Not until the escalation did they reply.",
        hint: "Öne çıkan öbek devrilmiyor; devrilen arkasından gelen.",
      },
      {
        kind: "build",
        tr: "Ancak o zaman alıcı yükümlü olacak.",
        answer: "Only then will the recipient be obliged.",
        hint: "„only“ da bir sınırlama; kapıyı o da açıyor.",
      },
      {
        kind: "build",
        tr: "İhaleyi imzalayan Ana müdür.",
        answer: "Ana, who signed the tender, is the director.",
        hint: "Virgüller cümleciği fazladan yapıyor; ad seçim istemiyor.",
      },
      {
        kind: "form",
        prompt: "Devrik sıra kartını doldur.",
        facts: "Öne çıkan öbek devrilmiyor; devrilen arkasından gelen; „only“ da bir sınırlama; bir mektupta bir tane yeter.",
        fields: [
          { label: "Under no circumstances", answer: "will we accept", accept: ["a severe delay"] },
          { label: "Not until", answer: "did they reply", accept: ["the escalation"] },
          { label: "Only then", answer: "will the recipient be obliged", accept: ["obliged"] },
          { label: "How often", answer: "once", accept: ["once is enough"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u05-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 5,
    title: "Not until the escalation did they reply",
    genre: "info",
    intro: "Özette ortaç, takvimde gelecek. Hangi özne kime ait?",
    gloss: [
      { de: "having reviewed", tr: "inceledikten sonra" },
      { de: "being prompt", tr: "hızlı davranarak" },
      { de: "delayed", tr: "geciktirilen" },
      { de: "will have executed", tr: "yürütmüş olacak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Olayı inceledikten sonra notu yazdık.",
        answer: "Having reviewed the incident, we wrote the note.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Hızlı davrandığı için ekip malı sevk etti.",
        answer: "Being prompt, the team dispatched the goods.",
        hint: "Aynı anda olan iş: yalın „-ing“.",
      },
      {
        kind: "build",
        tr: "Pazartesi geciktirilen hesap sonra yeniden başlatıldı.",
        answer: "Delayed on Monday, the account was resumed later.",
        hint: "Üçüncü hâlle başlıyor: geciktiren söylenmiyor.",
      },
      {
        kind: "build",
        tr: "Cuma gününe kadar siparişi yürütmüş olacağız.",
        answer: "By Friday we will have executed the order.",
        hint: "Gelecekte bir tarihten geriye bakış.",
      },
      {
        kind: "build",
        tr: "Ayrıntılı yanıt o zamana kadar gönderilmiş olacak.",
        answer: "The detailed reply will have been sent by then.",
        hint: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
    ],
  },
];
