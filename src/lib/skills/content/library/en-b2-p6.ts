import type { SkillExercise } from "../../types";

/**
 * EN · B2 — Beceriler kütüphanesi, parti 6.
 *
 * Kurallar ve emsal: `en-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 6 işe alım hattı: ret gerekçeleri üzerine bir haber, iki yönetici
 * arasında konuşma, adaya yazılan mektup. Dil bilgisi karşıtlık bağlaçları.
 */
export const enB2P6: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-lib-r6",
    course: "en",
    level: "B2",
    skill: "reading",
    title: "The Rejection That Says Nothing",
    genre: "article",
    intro: "Bir haber yazısı: neden şirketler ret gerekçesi vermiyor, verdiklerinde ne oluyor.",
    gloss: [
      { de: "rejection", tr: "ret" },
      { de: "applicant", tr: "aday" },
      { de: "feedback", tr: "geri bildirim" },
      { de: "liability", tr: "hukuki sorumluluk" },
      { de: "to shortlist", tr: "kısa listeye almak" },
      { de: "template", tr: "şablon" },
      { de: "hire", tr: "işe alınan kişi" },
      { de: "current", tr: "mevcut" },
      { de: "specific", tr: "belirli, somut" },
      { de: "general", tr: "genel" },
      { de: "sheet", tr: "form, çizelge" },
      { de: "match", tr: "uymak, örtüşmek" },
      { de: "lazy", tr: "tembel" },
      { de: "relationship", tr: "ilişki" },
      { de: "caution", tr: "uyarı" },
    ],
    minutes: 8,
    text:
      "The rejection that says nothing\n\n" +
      "“We have decided to go forward with other candidates whose experience more closely " +
      "matches our current needs.” Almost everyone who has applied for a job in the last " +
      "ten years has received this sentence, and almost nobody has learned anything from it.\n\n" +
      "Companies are not being lazy, at least not only. Legal departments discourage detailed " +
      "feedback because a specific reason can become evidence in a discrimination case, " +
      "and a vague template cannot. In a survey of two hundred employers last year, " +
      "sixty-one per cent said liability was their main reason for keeping rejections general. " +
      "Only nine per cent mentioned time.\n\n" +
      "Despite this, a small number of organisations have moved the other way. " +
      "A software firm in Manchester now sends every shortlisted applicant three sentences " +
      "written by the interviewer, and publishes the scoring sheet it uses. " +
      "Its head of recruitment argues that the risk works in reverse: a written score " +
      "is harder to challenge than a silence, because it can be shown to be consistent.\n\n" +
      "The results are not what either side predicted. Applicants who received reasons did not " +
      "complain more; they applied again. Nearly a third of the firm's hires last year had " +
      "been rejected by it before. Whereas the standard template produces no relationship at " +
      "all, a specific rejection apparently produces a candidate who comes back better prepared.\n\n" +
      "None of this makes feedback easy. Interviewers must write something defensible " +
      "within a day, and “you were fine but somebody was better” is harder to write " +
      "than it looks. Although the firm reports no legal problems in four years, " +
      "four years is not a long time, and one case would change the calculation for everyone.",
    questions: [
      {
        text: "What is the main reason employers give for vague rejections?",
        options: ["lack of time", "legal liability", "company policy on privacy"],
        answer: 1,
        explain: "Yüzde 61 hukuki sorumluluk dedi; yalnız yüzde 9 zamanı gösterdi.",
      },
      {
        text: "What does the Manchester firm's head of recruitment argue?",
        options: [
          "A written score is harder to challenge than silence.",
          "Feedback should be given by phone.",
          "Legal advice is usually wrong.",
        ],
        answer: 0,
        explain: "Tutarlı olduğu gösterilebildiği için risk ters yönde işliyor.",
      },
      {
        kind: "truefalse",
        text: "Applicants who received reasons applied again rather than complaining.",
        options: ["True", "False"],
        answer: 0,
        explain: "„did not complain more; they applied again“.",
      },
      {
        kind: "gapfill",
        text: "Nearly a ___ of the firm's hires had been rejected by it before.",
        options: [],
        answer: 0,
        accept: ["third"],
        explain: "„Nearly a third of the firm's hires last year had been rejected by it before.“",
      },
      {
        kind: "short_answer",
        text: "How many sentences does the firm send to shortlisted applicants?",
        options: [],
        answer: 0,
        accept: ["three", "3", "three sentences"],
        explain: "„three sentences written by the interviewer“.",
      },
      {
        text: "What caution does the article end with?",
        options: [
          "Four years without legal problems is not long.",
          "The firm is about to stop the policy.",
          "Most applicants prefer no feedback.",
        ],
        answer: 0,
        explain: "Tek bir dava herkes için hesabı değiştirir.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-lib-l6",
    course: "en",
    level: "B2",
    skill: "listening",
    title: "Do We Tell Her Why?",
    genre: "dialogue",
    intro: "İki yönetici bir adaya ne yazacaklarını tartışıyor: dürüstlük, risk ve iş yükü arasında.",
    gloss: [
      { de: "to draft", tr: "taslak yazmak" },
      { de: "template", tr: "şablon" },
      { de: "scoring sheet", tr: "puan tablosu" },
      { de: "defensible", tr: "savunulabilir" },
      { de: "to backfire", tr: "geri tepmek" },
      { de: "precedent", tr: "emsal" },
      { de: "presentation", tr: "sunum" },
      { de: "concern", tr: "kaygı" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ms Carr", text: "She asked why she didn't get it. I'd rather tell her than send the template again." },
      { speaker: "Mr Oduro", text: "So would I, in principle. But whatever we write becomes a precedent for the next forty people." },
      { speaker: "Ms Carr", text: "Then let's write something we're prepared to repeat. The honest version is that her presentation was the weakest of the four." },
      { speaker: "Mr Oduro", text: "That's honest, but it isn't useful. She can't do anything with it unless we say what a strong one looks like." },
      { speaker: "Ms Carr", text: "Fair. We could give her the scoring sheet. It's the same one for everyone, so there's nothing to hide." },
      { speaker: "Mr Oduro", text: "That I'd support. A number with a description behind it is defensible. A sentence about her personality is not." },
      { speaker: "Ms Carr", text: "Agreed. Although I'd add one line from me, so it doesn't read like it came out of a machine." },
      { speaker: "Mr Oduro", text: "As long as the line is about the work and not about her. That's where these things usually backfire." },
      { speaker: "Ms Carr", text: "I'll draft it this afternoon and send it to you before it goes. And if we're doing this, we should do it for all four, not just the one who asked." },
    ],
    questions: [
      {
        text: "What is Mr Oduro's first concern?",
        options: [
          "that the reply sets a precedent",
          "that the candidate will complain",
          "that there is no time",
        ],
        answer: 0,
        explain: "„whatever we write becomes a precedent for the next forty people“.",
      },
      {
        text: "Why is “the weakest presentation” not enough?",
        options: [
          "It is not true.",
          "It does not tell her what a strong one looks like.",
          "It is too personal.",
        ],
        answer: 1,
        explain: "„She can't do anything with it unless we say what a strong one looks like.“",
      },
      {
        kind: "truefalse",
        text: "They decide to send a sentence about the candidate's personality.",
        options: ["True", "False"],
        answer: 1,
        explain: "Kişilikle ilgili cümle savunulamaz sayılıyor; puan tablosu tercih ediliyor.",
      },
      {
        kind: "gapfill",
        text: "The precedent would apply to the next ___ people.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„a precedent for the next forty people“.",
      },
      {
        kind: "short_answer",
        text: "What does Ms Carr want to add to the scoring sheet?",
        options: [],
        answer: 0,
        accept: ["one line from her", "a line from her", "one personal line", "a personal line", "one line", "a line"],
        explain: "Makineden çıkmış gibi durmaması için kendinden bir satır.",
      },
      {
        text: "What does Ms Carr decide at the end?",
        options: [
          "to send feedback to all four candidates",
          "to phone the candidate instead",
          "to wait for legal advice",
        ],
        answer: 0,
        explain: "„we should do it for all four, not just the one who asked“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-lib-w6",
    course: "en",
    level: "B2",
    skill: "writing",
    title: "Feedback After an Interview",
    genre: "letter",
    intro: "Seçilmeyen bir adaya yazıyorsun: önce iki cümle kur, sonra dürüst, yararlı ve savunulabilir bir mektup yaz.",
    gloss: [
      { de: "to select", tr: "seçmek" },
      { de: "criteria", tr: "ölçütler" },
      { de: "strength", tr: "güçlü yan" },
      { de: "to encourage", tr: "yüreklendirmek" },
      { de: "vacancy", tr: "açık pozisyon" },
      { de: "sheet", tr: "çizelge" },
      { de: "presentation", tr: "sunum" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Sunumunuz açıktı ama örnekleriniz rolle ilgili değildi.",
        answer: "Although your presentation was clear, your examples were not related to the role.",
        alternatives: ["Your presentation was clear, but your examples were not related to the role."],
        hint: "„Although“ yan cümle kurar ve virgülle bağlanır; „but“ ile aynı anlamı verir.",
      },
      {
        kind: "build",
        tr: "Deneyim eksikliğine rağmen kısa listeye kaldınız.",
        answer: "Despite your lack of experience, you were shortlisted.",
        alternatives: ["In spite of your lack of experience, you were shortlisted."],
        hint: "„Despite“ arkasından isim ya da -ing gelir, yan cümle almaz.",
      },
      {
        kind: "free",
        prompt:
          "Seçilmeyen bir adaya mektup yaz: kararı açıkça söyle, iki güçlü yanını adlandır, seçilmeme sebebini ölçüte bağlayarak yaz, somut bir tavsiye ver ve gerçekçi bir kapanış yap.",
        checklist: [
          "Kararı baştan ve açıkça söyle",
          "İki güçlü yanı adlandır",
          "Sebebi kişiliğe değil ölçüte bağla",
          "Somut bir tavsiye ver ve gerçekçi biçimde kapat",
        ],
        minWords: 120,
        phrases: [
          { de: "Thank you for the time you gave us on …", tr: "… günü bize ayırdığınız vakit için teşekkürler", en: "" },
          { de: "I'm writing to let you know that …", tr: "Şunu bildirmek için yazıyorum: …", en: "" },
          { de: "Your strongest areas were …", tr: "En güçlü olduğunuz alanlar …", en: "" },
          { de: "Against the criteria we use, …", tr: "Kullandığımız ölçütlere göre …", en: "" },
          { de: "If you apply again, I would suggest …", tr: "Tekrar başvurursanız … öneririm", en: "" },
        ],
        sample:
          "Dear Ms Aydin, thank you for the time you gave us on 14 April. " +
          "I'm writing to let you know that we have offered the role to another candidate, " +
          "and to give you the reasons, since you asked for them. " +
          "Your strongest areas were the written task, where you scored highest of the four, " +
          "and the way you handled the questions about the failed project. " +
          "Against the criteria we use, the difference was in the presentation. " +
          "We score it on three things: structure, use of evidence and timekeeping. " +
          "Although your structure was clear, two of your three examples came from a different " +
          "kind of team, and you finished six minutes over. " +
          "I have attached the scoring sheet so that you can see it is the same for everyone. " +
          "If you apply again, I would suggest practising the presentation against a clock and " +
          "choosing examples from the setting you are applying to, even if they are smaller. " +
          "We expect a similar vacancy in the autumn, and I would be glad to see your name again. " +
          "Yours sincerely, R. Carr",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b2-lib-s6",
    course: "en",
    level: "B2",
    skill: "speaking",
    title: "Should Employers Give Reasons?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir konum al ve uygulamasını düşün.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "İşverenler ret gerekçesi vermeli mi? Konumunu söyle, en güçlü karşı argümanı kendin kur, ona cevap ver ve nasıl uygulanacağını somutla.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "En güçlü karşı argümanı kendin kur",
        "Ona cevap ver",
        "Uygulamayı somutla",
      ],
      targets: [
        { de: "My position is that they should, with one important limit.", tr: "Konumum: vermeliler, önemli bir sınırla." },
        { de: "The strongest argument against this is …", tr: "Buna karşı en güçlü argüman …" },
        { de: "I'd answer that by pointing out …", tr: "Buna … diyerek cevap verirdim" },
        { de: "In practice, what I'd require is …", tr: "Pratikte isteyeceğim şey …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "My position is that they should, with one important limit: reasons about the work, " +
        "never about the person. " +
        "The strongest argument against this is legal, and it is not imaginary. " +
        "A specific sentence can be used as evidence, while a template cannot, " +
        "and no legal department is going to recommend a policy that creates written records " +
        "of judgements about people. " +
        "I'd answer that by pointing out that the risk runs in both directions. " +
        "Silence is also evidence of a kind: if a company can show nothing about how it decided, " +
        "it cannot show that it decided consistently either. " +
        "A scoring sheet used for every candidate is a defence, not a danger. " +
        "In practice, what I'd require is that feedback comes from the sheet and not from " +
        "memory, that it goes to everyone who reached the same stage rather than only to those " +
        "who ask, and that it is written within two days, while the interviewer still remembers " +
        "what they actually saw. " +
        "Without those three conditions I would rather companies said nothing, " +
        "because feedback written from memory a month later is not honesty, it is invention.",
      rubricHint:
        "Dürüst bir karşı argüman ve uygulanabilir koşullar beklenir; „with one important limit“, „I'd answer that by pointing out“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b2-lib-g6",
    course: "en",
    level: "B2",
    skill: "grammar",
    title: "although, despite, however",
    genre: "grammar",
    intro: "Üçü de karşıtlık kurar ama dilbilgisel davranışları ayrıdır; hangisinin arkasına ne geldiği kuralın kendisidir.",
    focus: "Karşıtlık bağlaçları: although, despite, however, whereas",
    gloss: [
      { de: "to accept", tr: "kabul etmek" },
      { de: "design", tr: "tasarım" },
      { de: "salary", tr: "maaş" },
      { de: "deadline", tr: "son tarih" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "although + cümle, despite + isim",
        tr: "„although“ ve „though“ bir YAN CÜMLE başlatır: özne ve fiil gelir. „despite“ ve „in spite of“ ise bir İSİM ya da -ing biçimi alır. Bu ayrım kesindir: „despite he was late“ yanlıştır. İsim yoksa „the fact that“ eklenebilir: „despite the fact that he was late“.",
        examples: [
          { de: "Although the salary was low, she accepted.", tr: "Maaş düşük olmasına rağmen kabul etti.", note: "although + cümle" },
          { de: "Despite the low salary, she accepted.", tr: "Düşük maaşa rağmen kabul etti.", note: "despite + isim" },
          { de: "Despite being tired, he finished it.", tr: "Yorgun olmasına rağmen bitirdi.", note: "despite + -ing" },
        ],
      },
      {
        heading: "however: iki ayrı cümle",
        tr: "„however“ bir bağlaç değil bir ZARFTIR: iki cümleyi virgülle birleştiremez. Ya nokta ya noktalı virgül gerekir ve „however“ kendi virgülünü alır: „The salary was low. However, she accepted.“ „but“ ile karıştırılmamalıdır; „but“ tek cümle içinde kalabilir.",
        examples: [
          { de: "The salary was low. However, she accepted.", tr: "Maaş düşüktü. Yine de kabul etti.", note: "nokta + However," },
          { de: "The salary was low; however, she accepted.", tr: "Maaş düşüktü; yine de kabul etti.", note: "noktalı virgül" },
          { de: "The salary was low, but she accepted.", tr: "Maaş düşüktü ama kabul etti.", note: "but: tek cümle" },
        ],
      },
      {
        heading: "whereas ve while: karşılaştırma",
        tr: "„whereas“ iki şeyi KARŞILAŞTIRIR, bir beklentiyi bozmaz: „The first candidate had experience, whereas the second had none.“ Burada şaşırtıcı bir şey yoktur, yalnız bir fark vardır. „while“ hem bunu hem zamanı bildirebildiği için belirsiz kalabilir; yazıda „whereas“ daha nettir.",
        examples: [
          { de: "He works in sales, whereas she works in design.", tr: "O satışta çalışıyor, o ise tasarımda.", note: "yalnız fark" },
          { de: "Although he works in sales, he designed it.", tr: "Satışta çalışmasına rağmen onu o tasarladı.", note: "beklenti bozuluyor" },
          { de: "While I understand the problem, I disagree.", tr: "Sorunu anlasam da katılmıyorum.", note: "while = although" },
        ],
      },
    ],
    questions: [
      {
        text: "___ the low salary, she accepted the job.",
        options: ["Although", "Despite", "However"],
        answer: 1,
        explain: "Arkasından isim öbeği geliyor: despite.",
      },
      {
        text: "___ the salary was low, she accepted the job.",
        options: ["Despite", "In spite of", "Although"],
        answer: 2,
        explain: "Arkasından özne ve fiil geliyor: although.",
      },
      {
        text: "Which is punctuated correctly?",
        options: [
          "The salary was low, however she accepted.",
          "The salary was low. However, she accepted.",
          "The salary was low however, she accepted.",
        ],
        answer: 1,
        explain: "„however“ bir zarftır; iki cümleyi virgül birleştiremez.",
      },
      {
        kind: "gapfill",
        text: "___ being tired, he finished the report. (despite / although)",
        options: [],
        answer: 0,
        accept: ["Despite", "despite"],
        explain: "-ing biçimi geliyor, yan cümle değil.",
      },
      {
        kind: "gapfill",
        text: "He works in sales, ___ she works in design. (a comparison)",
        options: [],
        answer: 0,
        accept: ["whereas"],
        explain: "Beklenti bozulmuyor, yalnız iki durum karşılaştırılıyor.",
      },
      {
        kind: "gapfill",
        text: "Despite the ___ that he was late, they let him in. (fact)",
        options: [],
        answer: 0,
        accept: ["fact"],
        explain: "„despite“ cümle alamaz; „the fact that“ köprüsü gerekir.",
      },
      {
        kind: "gapfill",
        text: "The deadline was tight; ___, the team finished on time.",
        options: [],
        answer: 0,
        accept: ["however"],
        explain: "Noktalı virgülden sonra „however“ ve arkasından virgül gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Although", "your structure", "was clear", "your examples were weak"],
        explain: "although + yan cümle, virgül, ana cümle.",
      },
      {
        kind: "truefalse",
        text: "„Despite he was late, they let him in.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„despite“ arkasından cümle alamaz; „although he was late“ olmalı.",
      },
      {
        kind: "truefalse",
        text: "„He works in sales, whereas she works in design.“ — Bu cümle bir karşılaştırma mı?",
        options: ["True", "False"],
        answer: 0,
        explain: "„whereas“ beklenti bozmadan iki durumu karşılaştırır.",
      },
    ],
  },
];
