import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 24 — "Bir özgürlük istemek, görecelik tartışması,
 * kanıtın sözcükleri, bir iddiayı aktarmak".
 *
 * Dört ders: Demanding a freedom · The relativism debate ·
 * The vocabulary of evidence · Reporting a claim.
 *
 *   Kelime: freedom of conscience, academic freedom, artistic freedom,
 *           private autonomy, judicial review, relativism, maxim, commandment,
 *           virtue, integrity, altruism, reference value, guideline value,
 *           significance level, outlier, repeatability, source of error,
 *           advocate, affirm, misrepresent, distortion, truism, knowingly.
 *   Kalıp:  Freedom of conscience demands that academic freedom be untouched. ·
 *           Were it not for artistic freedom, no freedom of information would hold. ·
 *           They ask that private autonomy be tested by judicial review. ·
 *           Much as relativism unsettles us, no maxim survives without doubt. ·
 *           A commandment, albeit ancient, is not a virtue. ·
 *           Albeit a form of integrity, altruism can be a duty too. ·
 *           A reference value is not a guideline value. ·
 *           A significance level is chosen; an outlier is found. ·
 *           Repeatability exposes the source of error. ·
 *           One advocates the claim; another merely affirms it. ·
 *           To misrepresent a study is a distortion, not a truism. ·
 *           Persuasiveness is not the same as being justifiable.
 *
 * Ünitenin tek öğretme noktası ORTA KONUM BELİRTECİ. „Another merely
 * affirms it“ — „merely“ özne ile fiilin arasında duruyor ve o aralıkta
 * başka hiçbir şey yok. İngilizce orada bir YUVA tutuyor: küçük, bir iki
 * sözcük alıyor, ve içine konan hemen her şey betimleme değil HÜKÜM
 * (merely, probably, clearly, knowingly, rarely, always, hardly). Komşu
 * dilde böyle bir yuva yok, çünkü çekimli fiil cümleciğin ikinci öğesi
 * olmak zorunda; özne ile fiil arasına giren her şey fiili dil bilgisinin
 * ona ayırdığı konumdan çıkarır. Belirteç fiilden SONRAYA, orta alana
 * gitmek zorunda. Ölçü: **İNGİLİZCEDE HÜKÜM FİİLDEN ÖNCE GELİYOR — OKUR
 * HABERİ ALMADAN ÖNCE ONU NASIL ALACAĞINI ÖĞRENİYOR; ÖTEKİ SIRADA HABER
 * ÖNCE GELİYOR VE HÜKÜM ONA ÇOKTAN İNANMAYA BAŞLAMIŞ BİR OKURA İNİYOR.**
 * Aynı yuva hukuk cümlesinin en güçlü sözcüğünün yeri: „She knowingly
 * misrepresented the study“ başka bir suçlamadır ve bütün fark tek bir
 * sözcüğün tek bir konumdaki varlığıdır.
 */
export const enC1U24: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u24-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 24,
    title: "Reporting a claim",
    genre: "info",
    intro: "Özne ile fiil arasında bir yuva var. İçine ne konuyor?",
    gloss: [
      { de: "adverb", tr: "zarf" },
      { de: "among", tr: "arasında" },
      { de: "infinitive", tr: "mastar" },
      { de: "noun", tr: "isim" },
      { de: "a slot", tr: "yuva" },
      { de: "a judgement", tr: "hüküm" },
      { de: "a description", tr: "betimleme" },
      { de: "clearly", tr: "açıkça" },
      { de: "rarely", tr: "seyrek" },
      { de: "the finite verb", tr: "çekimli fiil" },
      { de: "the second element", tr: "ikinci öğe" },
      { de: "pushing", tr: "iterek" },
      { de: "reserves", tr: "ayırıyor" },
      { de: "the middle field", tr: "orta alan" },
      { de: "carrying", tr: "taşıdığı" },
      { de: "the news", tr: "haber" },
      { de: "lands", tr: "iniyor" },
      { de: "a charge", tr: "suçlama" },
      { de: "one position", tr: "tek konum" },
      { de: "miss it", tr: "kaçırmak" },
      { de: "a defence", tr: "savunma" },
      { de: "anyway", tr: "zaten" },
      { de: "a gerund", tr: "eylemlik" },
      { de: "a word of warning", tr: "uyarı sözcüğü" },
      { de: "measured", tr: "ölçülen" },
      { de: "survive", tr: "dayanmak" },
      { de: "agree", tr: "katılmak" },
    ],
    minutes: 12,
    text:
      "One advocates the claim; another merely affirms it. Look at where „merely“ is standing: between the subject and the verb, with nothing else in that space.\n" +
      "English keeps a slot there. It is small, it holds a word or two, and almost everything a writer puts in it is a judgement rather than a description: merely, probably, clearly, knowingly, rarely, always, hardly.\n" +
      "A neighbouring language has no such slot. Its finite verb has to be the second element of the clause, so nothing can stand between the subject and the verb without pushing the verb out of the position the grammar reserves for it. The adverb goes after the verb instead, into the middle field, where it sits among the other things the sentence is carrying.\n" +
      "That sounds like a small difference and it is not. In English the judgement arrives before the verb, so the reader has it before they know what happened. „Another merely affirms it“ tells you how to take the news and then gives you the news. In the other order the news comes first, and the judgement lands on a reader who has already begun to believe it.\n" +
      "The same slot is where the strongest word in a legal sentence lives. „She knowingly misrepresented the study“ is a different charge from „She misrepresented the study“, and the whole difference is one word in one position, sitting in front of the verb where nobody can miss it.\n" +
      "To misrepresent a study is a distortion, not a truism. Here is the infinitive shape again, and the second half denies the wrong defence rather than the fact: a paper that answers „everybody knows that anyway“ has not answered the charge at all.\n" +
      "Persuasiveness is not the same as being justifiable. And the closing line of the lesson: a noun on one side and a gerund on the other, which English allows without a word of warning.\n" +
      "The two sides are measured by two different people. One is measured by the reader, and the other has to survive somebody who does not want to agree.",
    questions: [
      {
        text: "What does English put in that slot?",
        options: ["a judgement", "a description", "the verb"],
        answer: 0,
        explain: "„almost everything a writer puts in it is a judgement rather than a description…“",
      },
      {
        text: "Why is there no such slot in the other language?",
        options: ["the finite verb must be second", "adverbs are longer", "the subject moves"],
        answer: 0,
        explain: "„Its finite verb has to be the second element of the clause…“",
      },
      {
        kind: "truefalse",
        text: "That is not a small difference.",
        options: ["True", "False"],
        answer: 0,
        explain: "„That sounds like a small difference and it is not.“",
      },
      {
        kind: "gapfill",
        text: "One advocates the claim; another ___ affirms it.",
        options: [],
        answer: 0,
        accept: ["merely"],
        explain: "„One advocates the claim; another merely affirms it.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "One advocates the claim; another merely affirms it.",
          "English keeps a slot between the subject and the verb.",
          "The judgement arrives before the verb.",
          "She knowingly misrepresented the study.",
        ],
        explain: "Cümle, yuva, sıra; en sonda hukuk cümlesi.",
      },
      {
        kind: "short_answer",
        text: "What must the second side survive?",
        options: [],
        answer: 0,
        accept: ["somebody who disagrees", "a reader who disagrees", "an opponent"],
        explain: "„the other has to survive somebody who does not want to agree.“",
      },
    ],
  },
  {
    id: "en-c1-u24-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 24,
    title: "The relativism debate",
    genre: "opinion",
    intro: "Hiçbir ilke kuşkusuz ayakta kalmıyor. Peki bu neyi bitiriyor?",
    gloss: [
      { de: "halves", tr: "yarılar" },
      { de: "legislated", tr: "yasayla konan" },
      { de: "moral", tr: "ahlaki" },
      { de: "goodness", tr: "iyilik" },
      { de: "currency", tr: "para birimi" },
      { de: "unsettles", tr: "huzursuz ediyor" },
      { de: "a maxim", tr: "ilke" },
      { de: "without doubt", tr: "kuşkusuz" },
      { de: "a conclusion", tr: "sonuç" },
      { de: "equal", tr: "eşit" },
      { de: "a survivor", tr: "sağ kalan" },
      { de: "tested", tr: "sınanmış" },
      { de: "ancient", tr: "kadim" },
      { de: "an age", tr: "yaş" },
      { de: "obeyed", tr: "uyulan" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "a virtue", tr: "erdem" },
      { de: "practised", tr: "uygulanan" },
      { de: "a duty", tr: "ödev" },
      { de: "chosen", tr: "seçilmiş" },
      { de: "a colleague", tr: "meslektaş" },
      { de: "a rota", tr: "nöbet çizelgesi" },
      { de: "unpaid", tr: "ödenmemiş" },
      { de: "counted", tr: "sayılan" },
      { de: "honest", tr: "dürüst" },
    ],
    minutes: 12,
    text:
      "Much as relativism unsettles us, no maxim survives without doubt. Two halves and the second is not the conclusion the first one looks like it is heading for.\n" +
      "„No maxim survives without doubt“ does not say that all maxims are equal. It says that a maxim which has never been doubted has never been tested, and a survivor of doubt is worth more than a rule nobody ever questioned.\n" +
      "That is the useful reading and it is the harder one, because the easy reading is available in the same words and a tired reader will take it.\n" +
      "A commandment, albeit ancient, is not a virtue. Age is not an argument, which this level has now said three times in three fields, and here it is at its sharpest: a rule that is obeyed out of habit has produced a habit and not a virtue.\n" +
      "A virtue is a thing practised by somebody who could have done otherwise. That is why it cannot be legislated and why a list of rules is not a moral education, though it is a great deal easier to write.\n" +
      "Albeit a form of integrity, altruism can be a duty too. And the concession at the front is doing real work: nobody is denying that it is a form of integrity.\n" +
      "What is denied is that it is always chosen. A colleague who takes the night rota every December is being good and is also being used, and the second half of that sentence is the one nobody says in the room.\n" +
      "So the honest version of the lesson is short. Unpaid goodness is still work and it should be counted, and counting it does not make it smaller. A person who is thanked in a speech and never in a rota has been paid in the wrong currency.",
    questions: [
      {
        text: "What does the second half say?",
        options: ["a maxim never doubted was never tested", "all maxims are equal", "doubt is a survivor"],
        answer: 0,
        explain: "„a maxim which has never been doubted has never been tested…“",
      },
      {
        text: "What is a virtue?",
        options: ["practised by somebody who could have done otherwise", "a rule obeyed out of habit", "an ancient commandment"],
        answer: 0,
        explain: "„A virtue is a thing practised by somebody who could have done otherwise.“",
      },
      {
        kind: "truefalse",
        text: "Counting unpaid goodness makes it smaller.",
        options: ["True", "False"],
        answer: 1,
        explain: "„counting it does not make it smaller.“",
      },
      {
        kind: "gapfill",
        text: "A commandment, albeit ancient, is not a ___.",
        options: [],
        answer: 0,
        accept: ["virtue"],
        explain: "„A commandment, albeit ancient, is not a virtue.“",
      },
      {
        kind: "order",
        text: "Dersin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Much as relativism unsettles us, no maxim survives without doubt.",
          "A commandment, albeit ancient, is not a virtue.",
          "Albeit a form of integrity, altruism can be a duty too.",
          "Unpaid goodness is still work and it should be counted.",
        ],
        explain: "Kuşku, yaş, seçim; en sonda sayılması gereken.",
      },
      {
        kind: "short_answer",
        text: "How has such a person been paid?",
        options: [],
        answer: 0,
        accept: ["in the wrong currency", "wrongly", "not in the rota"],
        explain: "„has been paid in the wrong currency.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u24-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 24,
    title: "The vocabulary of evidence",
    genre: "dialogue",
    intro: "Biri seçiliyor, öteki bulunuyor. Hangi sayı kimin kararı?",
    gloss: [
      { de: "picked", tr: "aldı" },
      { de: "visible", tr: "görünür" },
      { de: "funds", tr: "fonluyor" },
      { de: "proposed", tr: "önerilen" },
      { de: "fifth", tr: "beşinci" },
      { de: "fund", tr: "fonlamak" },
      { de: "a reference value", tr: "referans değer" },
      { de: "a guideline value", tr: "kılavuz değer" },
      { de: "a laboratory", tr: "laboratuvar" },
      { de: "an authority", tr: "kurum" },
      { de: "chosen", tr: "seçilen" },
      { de: "found", tr: "bulunan" },
      { de: "a level", tr: "düzey" },
      { de: "an outlier", tr: "aykırı değer" },
      { de: "a run", tr: "deney turu" },
      { de: "a machine", tr: "cihaz" },
      { de: "exposes", tr: "açığa çıkarıyor" },
      { de: "a source", tr: "kaynak" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Öykü", text: "A reference value is not a guideline value. One is what a healthy population measures at; the other is what an authority has decided is acceptable." },
      { speaker: "Poyraz", text: "So one is a measurement and the other is a decision." },
      { speaker: "Öykü", text: "Exactly that, and a report that puts them in the same table without saying which is which has made a political number look like a laboratory number." },
      { speaker: "Poyraz", text: "A significance level is chosen; an outlier is found." },
      { speaker: "Öykü", text: "And there is the same difference again in a different field. Somebody picked the level before the study started, or should have." },
      { speaker: "Poyraz", text: "And if they picked it afterwards?" },
      { speaker: "Öykü", text: "Then the number is not a level at all; it is a description of the result. That is the single most common thing wrong with a bad paper and it is almost never visible." },
      { speaker: "Poyraz", text: "Repeatability exposes the source of error." },
      { speaker: "Öykü", text: "Run it again with the same machine and you find the machine. Run it again in another laboratory and you find everything else." },
      { speaker: "Poyraz", text: "Which is more useful?" },
      { speaker: "Öykü", text: "The second, by a long way, and it is the one nobody funds, because it produces no new finding and it is somebody else's building." },
      { speaker: "Poyraz", text: "So what would you change?" },
      { speaker: "Öykü", text: "Fund the second study in the same grant as the first. It has been proposed for thirty years and it costs about a fifth of what a wrong finding costs." },
    ],
    questions: [
      {
        text: "What is a guideline value?",
        options: ["what an authority decided is acceptable", "what a healthy population measures", "an outlier"],
        answer: 0,
        explain: "„the other is what an authority has decided is acceptable.“",
      },
      {
        text: "What do you find in another laboratory?",
        options: ["everything else", "the machine", "the level"],
        answer: 0,
        explain: "„Run it again in another laboratory and you find everything else.“",
      },
      {
        kind: "truefalse",
        text: "The second study is the one nobody funds.",
        options: ["True", "False"],
        answer: 0,
        explain: "„it is the one nobody funds…“",
      },
      {
        kind: "gapfill",
        text: "A significance level is chosen; an outlier is ___.",
        options: [],
        answer: 0,
        accept: ["found"],
        explain: "„A significance level is chosen; an outlier is found.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["A reference value is not a guideline value.", "A reference value is not a guideline value"],
        explain: "Biri ölçüm, öteki karar.",
      },
      {
        kind: "short_answer",
        text: "What would she change?",
        options: [],
        answer: 0,
        accept: ["fund both together", "one grant for both", "fund the second"],
        explain: "„Fund the second study in the same grant as the first.“",
      },
    ],
  },
  {
    id: "en-c1-u24-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 24,
    title: "Demanding a freedom",
    genre: "monologue",
    intro: "Bir özgürlük ötekini nasıl taşıyor? Sınama neden gerekli?",
    gloss: [
      { de: "strange", tr: "tuhaf" },
      { de: "informing", tr: "bilgilendirme" },
      { de: "whatever", tr: "her ne" },
      { de: "trouble", tr: "sıkıntı" },
      { de: "conscience", tr: "vicdan" },
      { de: "untouched", tr: "el değmemiş" },
      { de: "a court", tr: "mahkeme" },
      { de: "a chain", tr: "zincir" },
      { de: "a journalist", tr: "gazeteci" },
      { de: "a file", tr: "dosya" },
      { de: "tested", tr: "sınanmış" },
      { de: "a review", tr: "denetim" },
      { de: "a contract", tr: "sözleşme" },
      { de: "unequal", tr: "eşitsiz" },
      { de: "a tenant", tr: "kiracı" },
      { de: "a judge", tr: "yargıç" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Aslı", text: "Freedom of conscience demands that academic freedom be untouched. A strange sentence at first reading, because the two look like different subjects." },
      { speaker: "Aslı", text: "They are one chain. A conscience that cannot be informed is a conscience with nothing to work on, and informing it is what a university is for." },
      { speaker: "Aslı", text: "Were it not for artistic freedom, no freedom of information would hold. The same chain one link further, and this one surprises people." },
      { speaker: "Aslı", text: "The hardest cases are never about a journalist and a file. They are about a novel, a play or a picture, and they are decided first." },
      { speaker: "Aslı", text: "Whatever a court allows a painter, it will later allow a reporter, and whatever it refuses a painter it will refuse everybody quietly for thirty years." },
      { speaker: "Aslı", text: "They ask that private autonomy be tested by judicial review. Now the other direction, and it is the half that gets forgotten." },
      { speaker: "Aslı", text: "A contract is a private thing and two people are free to write what they like in it. The trouble is that they are almost never equally free." },
      { speaker: "Aslı", text: "A tenant signs a clause because there are four flats and two hundred people, and calling that freedom is a description of the paper rather than of the room." },
      { speaker: "Aslı", text: "So the review is not an attack on autonomy. It is the only thing that keeps the word honest where the two sides are unequal." },
      { speaker: "Aslı", text: "And a judge who says that out loud will be told they are against freedom, by somebody who has never signed anything they could not change." },
    ],
    questions: [
      {
        text: "What is informing a conscience?",
        options: ["what a university is for", "a private thing", "a court decision"],
        answer: 0,
        explain: "„informing it is what a university is for.“",
      },
      {
        text: "Which cases are decided first?",
        options: ["a novel, a play or a picture", "a journalist and a file", "a contract"],
        answer: 0,
        explain: "„They are about a novel, a play or a picture, and they are decided first.“",
      },
      {
        kind: "truefalse",
        text: "The review is an attack on autonomy.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the review is not an attack on autonomy.“",
      },
      {
        kind: "gapfill",
        text: "Freedom of conscience demands that academic freedom be ___.",
        options: [],
        answer: 0,
        accept: ["untouched"],
        explain: "„Freedom of conscience demands that academic freedom be untouched.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["They ask that private autonomy be tested by judicial review.", "They ask that private autonomy be tested by judicial review"],
        explain: "Eski kip: „be“, „is“ değil.",
      },
      {
        kind: "short_answer",
        text: "Why does a tenant sign the clause?",
        options: [],
        answer: 0,
        accept: ["there are four flats", "too few flats", "no other choice"],
        explain: "„because there are four flats and two hundred people…“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u24-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 24,
    title: "One advocates the claim; another merely affirms it",
    genre: "info",
    intro: "Orta konum belirteci ve kanıtın iki sayısı.",
    gloss: [
      { de: "judgement", tr: "yargı" },
      { de: "to advocate", tr: "savunmak" },
      { de: "to affirm", tr: "doğrulamak" },
      { de: "to misrepresent", tr: "yanlış aktarmak" },
      { de: "a truism", tr: "herkesin bildiği gerçek" },
      { de: "a significance level", tr: "anlamlılık düzeyi" },
      { de: "repeatability", tr: "tekrarlanabilirlik" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Biri iddiayı savunuyor; bir başkası onu yalnızca doğruluyor.",
        answer: "One advocates the claim; another merely affirms it.",
        hint: "Belirteç özne ile fiilin arasında duruyor.",
      },
      {
        kind: "build",
        tr: "Bir çalışmayı yanlış aktarmak bir çarpıtmadır, herkesin bildiği bir gerçek değil.",
        answer: "To misrepresent a study is a distortion, not a truism.",
        hint: "İkinci yarı olguyu değil yanlış savunmayı reddediyor.",
      },
      {
        kind: "build",
        tr: "İkna gücü savunulabilir olmakla aynı şey değildir.",
        answer: "Persuasiveness is not the same as being justifiable.",
        hint: "Bir yanda isim, öteki yanda eylemlik.",
      },
      {
        kind: "build",
        tr: "Referans değer bir kılavuz değer değildir.",
        answer: "A reference value is not a guideline value.",
        hint: "Biri ölçüm, öteki karar.",
      },
      {
        kind: "build",
        tr: "Anlamlılık düzeyi seçilir; aykırı değer bulunur.",
        answer: "A significance level is chosen; an outlier is found.",
        hint: "Biri çalışmadan önce seçilmiş olmalı.",
      },
      {
        kind: "form",
        prompt: "Orta konum kartını doldur.",
        facts: "Yuva özne ile fiilin arasında; içine hüküm konuyor; Almancada yuva yok çünkü fiil ikinci öğe; İngilizcede hüküm haberden önce geliyor.",
        fields: [
          { label: "Where the slot is", answer: "between subject and verb", accept: ["before the verb"] },
          { label: "What goes in it", answer: "a judgement", accept: ["judgement"] },
          { label: "In German", answer: "no slot", accept: ["after the verb"] },
          { label: "The reader gets", answer: "the judgement first", accept: ["judgement first"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u24-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 24,
    title: "Freedom of conscience demands that academic freedom be untouched",
    genre: "info",
    intro: "Özgürlükler zinciri ve göreceliğin sınaması.",
    gloss: [
      { de: "freedom of conscience", tr: "vicdan özgürlüğü" },
      { de: "artistic freedom", tr: "sanat özgürlüğü" },
      { de: "private autonomy", tr: "irade serbestisi" },
      { de: "relativism", tr: "görecelik" },
      { de: "a commandment", tr: "buyruk" },
      { de: "altruism", tr: "özgecilik" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Vicdan özgürlüğü akademik özgürlüğe el değmemesini talep eder.",
        answer: "Freedom of conscience demands that academic freedom be untouched.",
        hint: "İkisi tek bir zincir.",
      },
      {
        kind: "build",
        tr: "Sanat özgürlüğü olmasa hiçbir bilgi edinme özgürlüğü tutmazdı.",
        answer: "Were it not for artistic freedom, no freedom of information would hold.",
        hint: "En zor davalar önce sanatta karara bağlanıyor.",
      },
      {
        kind: "build",
        tr: "İrade serbestisinin yargısal denetimle sınanmasını istiyorlar.",
        answer: "They ask that private autonomy be tested by judicial review.",
        hint: "Taraflar neredeyse hiçbir zaman eşit özgür değil.",
      },
      {
        kind: "build",
        tr: "Görecelik bizi ne kadar huzursuz etse de hiçbir ilke kuşkusuz ayakta kalmaz.",
        answer: "Much as relativism unsettles us, no maxim survives without doubt.",
        hint: "Kuşkudan sağ çıkan ilke, hiç sorgulanmamış olandan değerli.",
      },
      {
        kind: "build",
        tr: "Bir buyruk, kadim olsa da, bir erdem değildir.",
        answer: "A commandment, albeit ancient, is not a virtue.",
        hint: "Yaş bir sav değil.",
      },
    ],
  },
];
