import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 14 — "Masa başında pazarlık, esneklik pazarlığı,
 * nitelik sözcükleri, toplantıyı aktarmak".
 *
 * Dört ders: At the bargaining table · The flexibility bargain ·
 * The vocabulary of qualification · Reporting the meeting.
 *
 *   Kelime: collective bargaining autonomy, conduct of negotiations,
 *           consensus building, code of conduct, apprenticeship contract,
 *           spin off, permeable, status insecurity, deskilling,
 *           professionalization, labor reserve, lateral entry, competence
 *           orientation, obscure, segmentation, undermine, professional
 *           ethic, action pattern, everyday practice, platitude.
 *   Kalıp:  The collective bargaining autonomy demands that the conduct of negotiations be free. ·
 *           Were it not for consensus building, no code of conduct would hold. ·
 *           The female works council member asks that the firm make permanent every apprenticeship contract. ·
 *           Much as they spin off the unit, the work stays in-house. ·
 *           The border, albeit permeable, does not remove the status insecurity. ·
 *           Albeit gainfully employed, many still work as a sideline. ·
 *           Deskilling is not the opposite of professionalization. ·
 *           A skilled labor shortage is announced; a labor reserve is counted. ·
 *           Lateral entry and competence orientation arrive together. ·
 *           One obscures the segmentation; another undermines the professional ethic. ·
 *           The action pattern claims what the everyday practice assumes. ·
 *           To call it disciplining is not to call it a platitude.
 *
 * Ünitenin tek öğretme noktası AĞIR NESNENİN SONA KAYMASI. „…make
 * permanent every apprenticeship contract“ — olağan sıra „make something
 * permanent“ iken nesne, ne olacağını söyleyen sözcüğün ÜSTÜNDEN atlayıp
 * cümlenin sonuna inmiş. Atlama nedeni anlam değil UZUNLUK: İngilizce
 * uzun nesneyi sona atıyor, kısa parçayı fiilin yanında bırakıyor. Aynı
 * kural öbeksi fiilde de çalışıyor („spin off the unit“ ama „spin it
 * off“ — tek sözcük asla ağır değil). Almanca bunu ne yapabiliyor ne de
 * yapması gerekiyor: fiil ikiye ayrılıyor ve ikinci yarısı cümleciğin
 * sonunu zaten tutuyor, dolayısıyla sona kaydırılacak yer yok — nesne
 * ne kadar uzun olursa olsun fiilin önünde kalıyor. Ölçü: **HER İKİ DİLİN
 * DE CÜMLE SONU İÇİN BİR SIRA KURALI VAR, AMA İKİSİ AYRI ŞEYE BAKIYOR:
 * İNGİLİZCE AĞIRLIĞA, ALMANCA FİİL PARANTEZİNE** — Almanca yazarın
 * oynayabildiği şey sonu değil, başa neyin konduğu ve neyin bilinen
 * sayıldığı. Ünite 10'un bulgusunun devamı: isim öbeği arkadan büyüyordu,
 * burada cümle o büyüyen öbeğe sonda yer açıyor.
 */
export const enC1U14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u14-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 14,
    title: "At the bargaining table",
    genre: "info",
    intro: "Sıra yanlış görünüyor ama değil. Neye göre sıralanıyor?",
    gloss: [
      { de: "object", tr: "nesne" },
      { de: "pronoun", tr: "adıl" },
      { de: "simply", tr: "düpedüz" },
      { de: "bracket", tr: "parantez" },
      { de: "noun", tr: "isim" },
      { de: "vary", tr: "değiştirmek" },
      { de: "the wrong order", tr: "yanlış sıra" },
      { de: "the ordinary pattern", tr: "olağan kalıp" },
      { de: "jumped over", tr: "üstünden atladı" },
      { de: "landed", tr: "indi" },
      { de: "heavy", tr: "ağır" },
      { de: "length", tr: "uzunluk" },
      { de: "a name for it", tr: "bir ad" },
      { de: "a particle", tr: "parçacık" },
      { de: "reverses", tr: "tersine dönüyor" },
      { de: "absolute", tr: "kesin" },
      { de: "sorting", tr: "sıralıyor" },
      { de: "light", tr: "hafif" },
      { de: "handed", tr: "verilen" },
      { de: "short enough", tr: "yeterince kısa" },
      { de: "comes apart", tr: "ikiye ayrılıyor" },
      { de: "occupied", tr: "dolu" },
      { de: "however long", tr: "ne kadar uzun olursa olsun" },
      { de: "wait longer", tr: "daha uzun beklemek" },
      { de: "settled in advance", tr: "önceden belirlenmiş" },
      { de: "varies", tr: "değiştiriyor" },
      { de: "counts as known", tr: "bilinen sayılıyor" },
      { de: "the old mood", tr: "eski kip" },
      { de: "the test", tr: "sınama" },
    ],
    minutes: 12,
    text:
      "The female works council member asks that the firm make permanent every apprenticeship contract. Read the last six words, notice that they are in the wrong order, and then notice that they are not.\n" +
      "„Make permanent every apprenticeship contract.“ The ordinary pattern is „make something permanent“: the verb, then the object, then the word that says what the object becomes. Here the object has jumped over that word and landed at the end of the sentence.\n" +
      "It jumped because it is heavy. „Every apprenticeship contract“ is three words long and „it“ is one. English moves a long object to the end and leaves the short piece next to the verb, and the rule is not about meaning at all. It is about length.\n" +
      "You have already seen it twice in this level without a name for it. „Spin off the unit“ rather than „spin the unit off“: the object comes after the particle because it is not a single word. And with a pronoun the rule reverses and becomes absolute — „spin it off“ is the only order anybody writes, because one word is never heavy.\n" +
      "So English is sorting the end of a sentence by weight. Light first, heavy last, and the reader is handed the parts in the order that keeps each of them short enough to hold while the next one arrives.\n" +
      "German cannot do this and has no need to. Its verb comes apart and the second half of it sits at the end of the clause, so the end is already occupied. The object stays in front of the verb however long it is, and a German sentence that runs long moves nothing: it simply makes the reader wait longer for the piece that closes the bracket.\n" +
      "Which gives the measurement of this unit. Both languages have an order rule for the end of a sentence, and the two rules are looking at different things. English orders by weight. German's order is settled in advance by the verb, so what a German writer varies instead is what goes first and what counts as known already.\n" +
      "This is the other half of something met a few units ago. A noun phrase in English grows from the back; here the sentence makes room at the back for it to grow into.\n" +
      "The collective bargaining autonomy demands that the conduct of negotiations be free. And at the end of the lesson the old mood is back, many units after it was taught, on a subject it had never touched. That is the test: a shape you can use only on the paragraph you learned it in has not been learned.",
    questions: [
      {
        text: "Why did the object jump?",
        options: ["because it is heavy", "because it is short", "because it is new"],
        answer: 0,
        explain: "„It jumped because it is heavy.“",
      },
      {
        text: "What does English sort the end of a sentence by?",
        options: ["weight", "meaning", "the verb"],
        answer: 0,
        explain: "„English is sorting the end of a sentence by weight.“",
      },
      {
        kind: "truefalse",
        text: "A German sentence moves the object when it runs long.",
        options: ["True", "False"],
        answer: 1,
        explain: "„a German sentence that runs long moves nothing…“",
      },
      {
        kind: "gapfill",
        text: "Spin ___ off.",
        options: [],
        answer: 0,
        accept: ["it"],
        explain: "„„spin it off“ is the only order anybody writes…“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Make permanent every apprenticeship contract.",
          "It jumped because it is heavy.",
          "Spin it off is the only order anybody writes.",
          "German's order is settled in advance by the verb.",
        ],
        explain: "Cümle, neden, adıl, öteki dil.",
      },
      {
        kind: "short_answer",
        text: "What does a German writer vary instead?",
        options: [],
        answer: 0,
        accept: ["what goes first", "the first word", "the opening"],
        explain: "„what a German writer varies instead is what goes first…“",
      },
    ],
  },
  {
    id: "en-c1-u14-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 14,
    title: "The vocabulary of qualification",
    genre: "opinion",
    intro: "İki sözcük karşıt görünüyor. Peki aynı eksende mi?",
    gloss: [
      { de: "passives", tr: "edilgenler" },
      { de: "owners", tr: "sahipler" },
      { de: "belongs", tr: "ait" },
      { de: "whichever", tr: "hangisi olursa" },
      { de: "practical", tr: "işe dönük" },
      { de: "passive", tr: "edilgen" },
      { de: "the opposite", tr: "karşıtı" },
      { de: "an axis", tr: "eksen" },
      { de: "a trade", tr: "zanaat" },
      { de: "split", tr: "bölünmüş" },
      { de: "a licence", tr: "ruhsat" },
      { de: "an entry", tr: "giriş" },
      { de: "announced", tr: "ilan edilen" },
      { de: "counted", tr: "sayılan" },
      { de: "a press release", tr: "basın bülteni" },
      { de: "a statistician", tr: "istatistikçi" },
      { de: "a shortage", tr: "açık" },
      { de: "a wage", tr: "ücret" },
      { de: "a claim", tr: "iddia" },
      { de: "arrive together", tr: "birlikte geliyor" },
      { de: "a pair", tr: "çift" },
      { de: "unrelated", tr: "ilgisiz" },
      { de: "a door", tr: "kapı" },
      { de: "a measure", tr: "ölçüt" },
      { de: "cheaper", tr: "daha ucuz" },
      { de: "a year later", tr: "bir yıl sonra" },
    ],
    minutes: 12,
    text:
      "Deskilling is not the opposite of professionalization. The sentence looks like a correction of somebody's vocabulary and it is a correction of their whole picture.\n" +
      "Two words that end the same way are being taken off the same axis. One of them describes what happens to a trade when the work is split into pieces a new person can be taught in a week. The other describes what happens to a trade when it gets a licence, an entry exam and a name that has to be earned.\n" +
      "They are not two ends of one line. They can happen in the same firm, in the same year, to two rooms on the same floor, and they usually do, because the second one is what a trade does when the first one is coming for it.\n" +
      "A skilled labor shortage is announced; a labor reserve is counted. Two passives with two different owners: the first belongs to a press release and the second to a statistician.\n" +
      "That difference is the whole of the lesson. A shortage is a claim about a price nobody wants to pay, and it is announced in the same sentence in which the wage is described as already high. A reserve is a number of people who are not in the work and could be, and it can be counted from a form. A country can have both at once and most of them do.\n" +
      "Lateral entry and competence orientation arrive together. A pair that looks unrelated until you have watched it twice. One is a door that opens for people without the usual papers; the other is a measure that says papers were never the point.\n" +
      "Neither is a bad thing and both of them are also the cheaper thing, and a reader who cannot hold those two facts in one paragraph will end up defending whichever of them was said last to them.\n" +
      "So the practical rule for this vocabulary is short. Ask who says the word, ask what it costs, and ask what was in the same sentence. A word that arrives with a number attached is doing different work from the same word a year later with nothing attached.",
    questions: [
      {
        text: "What are the two words being taken off?",
        options: ["the same axis", "the same page", "the same trade"],
        answer: 0,
        explain: "„Two words that end the same way are being taken off the same axis.“",
      },
      {
        text: "Who owns the second passive?",
        options: ["a statistician", "a press release", "a trade"],
        answer: 0,
        explain: "„the first belongs to a press release and the second to a statistician.“",
      },
      {
        kind: "truefalse",
        text: "A country cannot have both at once.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A country can have both at once and most of them do.“",
      },
      {
        kind: "gapfill",
        text: "Deskilling is not the ___ of professionalization.",
        options: [],
        answer: 0,
        accept: ["opposite"],
        explain: "„Deskilling is not the opposite of professionalization.“",
      },
      {
        kind: "order",
        text: "Üç satırın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Deskilling is not the opposite of professionalization.",
          "A skilled labor shortage is announced; a labor reserve is counted.",
          "Lateral entry and competence orientation arrive together.",
          "Ask who says the word and what it costs.",
        ],
        explain: "Eksen, iki edilgen, çift; en sonda kural.",
      },
      {
        kind: "short_answer",
        text: "What can a reserve be counted from?",
        options: [],
        answer: 0,
        accept: ["a form", "forms", "a number of people"],
        explain: "„it can be counted from a form.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u14-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 14,
    title: "The flexibility bargain",
    genre: "dialogue",
    intro: "Birim ayrılıyor ama iş kalıyor. Sınır neyi kaldırmıyor?",
    gloss: [
      { de: "bottom", tr: "alt" },
      { de: "cross", tr: "geçmek" },
      { de: "crosses", tr: "geçiyor" },
      { de: "adjective", tr: "sıfat" },
      { de: "a unit", tr: "birim" },
      { de: "a border", tr: "sınır" },
      { de: "a badge", tr: "kimlik kartı" },
      { de: "the same desk", tr: "aynı masa" },
      { de: "a contract", tr: "sözleşme" },
      { de: "a notice period", tr: "ihbar süresi" },
      { de: "crossed", tr: "geçilen" },
      { de: "both ways", tr: "iki yönde" },
      { de: "a second job", tr: "ikinci iş" },
      { de: "employed", tr: "işte olan" },
      { de: "a figure", tr: "rakam" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Cem", text: "Much as they spin off the unit, the work stays in-house. Read that sentence to anybody who has been through one and watch their face." },
      { speaker: "Pelin", text: "The same desk, a new badge." },
      { speaker: "Cem", text: "The same desk, the same corridor, the same two people to ask, and a new contract with a different notice period at the bottom of page four." },
      { speaker: "Pelin", text: "The border, albeit permeable, does not remove the status insecurity." },
      { speaker: "Cem", text: "That is the line I would keep out of the whole debate. The border can be crossed both ways and it is still a border, and everybody knows which side of it they are standing on." },
      { speaker: "Pelin", text: "So permeable is not the same as gone." },
      { speaker: "Cem", text: "Permeable is what a border is called by the people who never have to cross it. Ask somebody who crosses it twice a week and you will get a different adjective." },
      { speaker: "Pelin", text: "Albeit gainfully employed, many still work as a sideline." },
      { speaker: "Cem", text: "And this is where the numbers stop helping. A person with a job is counted as having one, and the evening hours are in nobody's figure at all." },
      { speaker: "Pelin", text: "Because the form has one box." },
      { speaker: "Cem", text: "The form has one box and the second job is not in it, so a country can report that almost everybody is employed and be telling the truth about a picture nobody lives in." },
      { speaker: "Pelin", text: "What would you ask instead?" },
      { speaker: "Cem", text: "Ask how many hours, from how many sources, and whether the answer changed last year. Three questions, and no form in this country asks the third one." },
    ],
    questions: [
      {
        text: "What stays the same after they spin off the unit?",
        options: ["the desk", "the contract", "the notice period"],
        answer: 0,
        explain: "„The same desk, the same corridor, the same two people to ask…“",
      },
      {
        text: "Who calls a border permeable?",
        options: ["people who never cross it", "people who cross it twice a week", "people in the corridor"],
        answer: 0,
        explain: "„Permeable is what a border is called by the people who never have to cross it.“",
      },
      {
        kind: "truefalse",
        text: "The evening hours are in the figure.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the evening hours are in nobody's figure at all.“",
      },
      {
        kind: "gapfill",
        text: "Much as they spin off the unit, the work stays ___.",
        options: [],
        answer: 0,
        accept: ["in-house"],
        explain: "„Much as they spin off the unit, the work stays in-house.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The border, albeit permeable, does not remove the status insecurity.", "The border, albeit permeable, does not remove the status insecurity"],
        explain: "Fiilsiz taviz ortada; ana iddia ayakta.",
      },
      {
        kind: "short_answer",
        text: "How many questions would he ask?",
        options: [],
        answer: 0,
        accept: ["three", "3", "three questions"],
        explain: "„Three questions, and no form in this country asks the third one.“",
      },
    ],
  },
  {
    id: "en-c1-u14-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 14,
    title: "Reporting the meeting",
    genre: "monologue",
    intro: "Toplantı tutanağında hangi fiil kimi ele veriyor?",
    gloss: [
      { de: "underneath", tr: "altta" },
      { de: "whatever", tr: "her ne" },
      { de: "assumed", tr: "varsaydı" },
      { de: "a minute", tr: "tutanak" },
      { de: "two verbs", tr: "iki fiil" },
      { de: "an ethic", tr: "ahlak" },
      { de: "a pattern", tr: "kalıp" },
      { de: "an assumption", tr: "varsayım" },
      { de: "a defence", tr: "savunma" },
      { de: "worn out", tr: "yıpranmış" },
      { de: "empty", tr: "boş" },
      { de: "an agenda", tr: "gündem" },
      { de: "a decision", tr: "karar" },
      { de: "the last line", tr: "son satır" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Sevil", text: "One obscures the segmentation; another undermines the professional ethic. Two verbs in one line of a minute, and they are not two ways of saying the same thing." },
      { speaker: "Sevil", text: "To obscure is to leave something where it is and make it hard to see. To undermine is to take a piece out from underneath while the top of it still looks the same." },
      { speaker: "Sevil", text: "The first can be fixed by writing the thing down clearly. The second cannot, because by the time anybody notices, the part that was removed is a year gone." },
      { speaker: "Sevil", text: "The action pattern claims what the everyday practice assumes. The same shape from two units back, and here it is about a meeting rather than a text." },
      { speaker: "Sevil", text: "An assumption in a meeting is whatever nobody wrote on the agenda and everybody arrived with. It gets into the decision without ever being spoken." },
      { speaker: "Sevil", text: "So the useful minute is not the one that records what was said. It is the one that records what was assumed, and almost nobody writes that one." },
      { speaker: "Sevil", text: "To call it disciplining is not to call it a platitude. Eight words, and they are doing the work of a whole paragraph of defence." },
      { speaker: "Sevil", text: "A hard word is not made empty by being hard. „Disciplining“ is worn out from use and it still names something that happened in a room to a person." },
      { speaker: "Sevil", text: "The move to watch for is the one where somebody answers a description with a comment about the word rather than about the thing." },
      { speaker: "Sevil", text: "It works almost every time and it costs nothing, and the last line of that meeting will record a discussion of vocabulary and no decision at all." },
    ],
    questions: [
      {
        text: "What is it to undermine?",
        options: ["to take a piece from underneath", "to make it hard to see", "to write it down"],
        answer: 0,
        explain: "„To undermine is to take a piece out from underneath…“",
      },
      {
        text: "What does the useful minute record?",
        options: ["what was assumed", "what was said", "who was there"],
        answer: 0,
        explain: "„It is the one that records what was assumed…“",
      },
      {
        kind: "truefalse",
        text: "A hard word is made empty by being hard.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A hard word is not made empty by being hard.“",
      },
      {
        kind: "gapfill",
        text: "To call it disciplining is not to call it a ___.",
        options: [],
        answer: 0,
        accept: ["platitude"],
        explain: "„To call it disciplining is not to call it a platitude.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The action pattern claims what the everyday practice assumes.", "The action pattern claims what the everyday practice assumes"],
        explain: "İki katman: iddia ile varsayım.",
      },
      {
        kind: "short_answer",
        text: "What will that meeting record?",
        options: [],
        answer: 0,
        accept: ["no decision", "a discussion of vocabulary", "nothing decided"],
        explain: "„a discussion of vocabulary and no decision at all.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u14-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 14,
    title: "Make permanent every apprenticeship contract",
    genre: "info",
    intro: "Ağır nesne sona kayıyor; adıl asla kaymıyor.",
    gloss: [
      { de: "bracket", tr: "parantez" },
      { de: "an apprenticeship contract", tr: "çıraklık sözleşmesi" },
      { de: "consensus building", tr: "uzlaşı sağlama" },
      { de: "a code of conduct", tr: "davranış kuralları" },
      { de: "to spin off", tr: "bünyeden ayırmak" },
      { de: "permeable", tr: "geçirgen" },
      { de: "status insecurity", tr: "statü güvencesizliği" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kadın işçi temsilcisi şirketin her çıraklık sözleşmesini kalıcı hale getirmesini istiyor.",
        answer: "The female works council member asks that the firm make permanent every apprenticeship contract.",
        hint: "Ağır nesne sona kaymış; „make something permanent“ değil.",
      },
      {
        kind: "build",
        tr: "Toplu sözleşme özerkliği müzakere yönetiminin özgür olmasını talep eder.",
        answer: "The collective bargaining autonomy demands that the conduct of negotiations be free.",
        hint: "Eski kip yeni bir konuda: „be“, „is“ değil.",
      },
      {
        kind: "build",
        tr: "Uzlaşı sağlama olmasa hiçbir davranış kuralı tutmazdı.",
        answer: "Were it not for consensus building, no code of conduct would hold.",
        hint: "Fiil başta, bağlaç yok.",
      },
      {
        kind: "build",
        tr: "Birimi bünyeden ayırsalar da iş şirket içinde kalıyor.",
        answer: "Much as they spin off the unit, the work stays in-house.",
        hint: "Nesne tek sözcük olmadığı için parçacıktan sonra geliyor.",
      },
      {
        kind: "build",
        tr: "Sınır, geçirgen olsa da, statü güvencesizliğini kaldırmıyor.",
        answer: "The border, albeit permeable, does not remove the status insecurity.",
        hint: "Ara sözdeki taviz ana iddiayı düşürmüyor.",
      },
      {
        kind: "form",
        prompt: "Ağırlık kartını doldur.",
        facts: "İngilizce cümlenin sonunu ağırlığa göre sıralıyor; uzun nesne sona gidiyor; adıl asla ağır değil; Almancada sonu fiil parantezi tutuyor.",
        fields: [
          { label: "English sorts by", answer: "weight", accept: ["length"] },
          { label: "A long object", answer: "goes last", accept: ["to the end"] },
          { label: "A pronoun", answer: "never heavy", accept: ["stays close"] },
          { label: "In German", answer: "the verb holds the end", accept: ["the bracket"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u14-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 14,
    title: "Deskilling is not the opposite of professionalization",
    genre: "info",
    intro: "Nitelik sözcükleri ve toplantının iki fiili.",
    gloss: [
      { de: "deskilling", tr: "vasıfsızlaşma" },
      { de: "professionalization", tr: "profesyonelleşme" },
      { de: "lateral entry", tr: "alan dışından geçiş" },
      { de: "to obscure", tr: "perdelemek" },
      { de: "to undermine", tr: "baltalamak" },
      { de: "a platitude", tr: "klişe" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Vasıfsızlaşma profesyonelleşmenin karşıtı değildir.",
        answer: "Deskilling is not the opposite of professionalization.",
        hint: "İkisi aynı eksenin iki ucu değil.",
      },
      {
        kind: "build",
        tr: "Nitelikli eleman açığı ilan edilir; işgücü rezervi sayılır.",
        answer: "A skilled labor shortage is announced; a labor reserve is counted.",
        hint: "İki edilgenin iki ayrı sahibi var.",
      },
      {
        kind: "build",
        tr: "Alan dışından geçiş ile yetkinlik odaklılık birlikte geliyor.",
        answer: "Lateral entry and competence orientation arrive together.",
        hint: "Biri kapı, öteki kâğıdın hiç önemli olmadığını söyleyen ölçüt.",
      },
      {
        kind: "build",
        tr: "Biri segmentasyonu perdeliyor; bir başkası meslek ahlakını baltalıyor.",
        answer: "One obscures the segmentation; another undermines the professional ethic.",
        hint: "Biri görülmesini zorlaştırıyor, öteki alttan parça çekiyor.",
      },
      {
        kind: "build",
        tr: "Buna hizaya sokma demek klişe demek değildir.",
        answer: "To call it disciplining is not to call it a platitude.",
        hint: "Zor bir sözcük, zor olduğu için boşalmaz.",
      },
    ],
  },
];
