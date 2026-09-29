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
 *           Suspended on Monday, the service was resumed on Wednesday. ·
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
    title: "A letter to the builder",
    genre: "letter",
    intro: "Tadilatı geciken bir şirkete yazılmış sert mektup. Hangi koşullar öne sürülüyor?",
    gloss: [
      { de: "a renovation", tr: "tadilat" },
      { de: "behind schedule", tr: "takvimin gerisinde" },
      { de: "an installment", tr: "taksit" },
      { de: "temporary", tr: "geçici" },
      { de: "unlocked", tr: "kilitsiz" },
      { de: "stolen", tr: "çalınmış" },
    ],
    minutes: 9,
    text:
      "Dear Mr. Walsh,\n" +
      "Renovation of our office at 22 Carter Road\n" +
      "I am writing about the renovation work, which is now five weeks behind schedule.\n" +
      "When we signed the contract in May, your company promised that the work would be finished by 1 September. It is now early October, the kitchen has no water, and our staff are working from home. Under no circumstances will we accept a further severe delay.\n" +
      "We have been patient. Not until we sent our third email did your team reply, and not until the escalation to your director did anyone visit the site. Only after that visit did we receive a new plan, and that plan has already failed.\n" +
      "Please note the following points.\n" +
      "First, the contract is binding for both sides. Only when all the work is finished and checked will we pay the final installment of 12,000 euros.\n" +
      "Second, under the contract you are liable for the extra costs we have had since 1 September. These include the rent for temporary desks, which comes to 2,300 euros so far.\n" +
      "Third, never again should your workers leave the site open at night. Last week the door was left unlocked, and only by luck was nothing stolen.\n" +
      "We would like to find a solution with you. Please send us a detailed schedule by Friday, 10 October. Only then will we be able to decide whether to continue the contract.\n" +
      "I would be grateful for a prompt reply.\n" +
      "Yours sincerely,\n" +
      "Sofia Brandt, Office Manager",
    questions: [
      {
        text: "When should the work have been finished?",
        options: ["by 1 September", "in May", "by 10 October"],
        answer: 0,
        explain: "„your company promised that the work would be finished by 1 September.“",
      },
      {
        text: "When did someone visit the site?",
        options: ["after the escalation to the director", "after the first email", "in May"],
        answer: 0,
        explain: "„not until the escalation to your director did anyone visit the site.“",
      },
      {
        kind: "truefalse",
        text: "The builder will receive the last payment only after the work is checked.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Only when all the work is finished and checked will we pay the final installment of 12,000 euros.“",
      },
      {
        kind: "gapfill",
        text: "Under no circumstances will we accept a further severe ___.",
        options: [],
        answer: 0,
        accept: ["delay"],
        explain: "„Under no circumstances will we accept a further severe delay.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The work is five weeks behind schedule.",
          "A new plan arrived after the visit.",
          "The contract is binding for both sides.",
          "The door was left unlocked last week.",
        ],
        explain: "Mektup gecikmeyle açılıyor, olayları sırayla anlatıyor, sonra maddeleri sayıyor.",
      },
      {
        kind: "short_answer",
        text: "What must the builder send by Friday?",
        options: [],
        answer: 0,
        accept: ["a detailed schedule", "a schedule", "a new schedule"],
        explain: "„Please send us a detailed schedule by Friday, 10 October.“",
      },
    ],
  },
  {
    id: "en-b2-u05-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 5,
    title: "The school cafeteria tender",
    genre: "info",
    intro: "Okul yemekhanesi ihalesinde kimin ne yaptığını anlatan bilgi notu. Sorular kime gidiyor?",
    gloss: [
      { de: "a cafeteria", tr: "yemekhane" },
      { de: "a bidder", tr: "teklif veren" },
      { de: "a panel", tr: "kurul" },
      { de: "responsible", tr: "sorumlu" },
      { de: "contact", tr: "başvurmak" },
      { de: "an evaluation", tr: "değerlendirme" },
      { de: "finance", tr: "finans" },
      { de: "a deputy mayor", tr: "belediye başkan yardımcısı" },
      { de: "criteria", tr: "ölçütler" },
      { de: "environmental", tr: "çevresel" },
      { de: "a standard", tr: "standart" },
      { de: "reach", tr: "ulaşmak" },
      { de: "a round", tr: "tur" },
      { de: "a finalist", tr: "finalist" },
    ],
    minutes: 9,
    text:
      "CITY OF RIVERTON: TENDER FOR SCHOOL CAFETERIA SERVICES\n" +
      "Information for bidders: who is responsible for what\n" +
      "This note explains who is responsible for each step of the tender procedure. Please read it before you contact the city. Bids must arrive by 28 February.\n" +
      "Ana Weber, who signed the tender notice, is the director of the Education Department. She will make the final decision, which is why she cannot answer questions from bidders during the procedure.\n" +
      "All questions should go to Paul Grant, who manages the procedure day to day. Paul, whose office is in the town hall, answers questions in writing only. Every answer is published on the tender website, which means that all bidders receive the same information.\n" +
      "The evaluation panel, which meets in the second week of March, has five members. Two of them are head teachers, one is a food expert, and two work in the finance office. The executive to whom the panel reports is the deputy mayor, Linda Moss.\n" +
      "The criteria, which were approved by the city council in January, are price (40 percent), quality of food (40 percent) and environmental standards (20 percent). Bidders who use local farms can receive extra points.\n" +
      "The procedure, which is slower than in previous years, has one more step this time: every bidder that reaches the final round will cook a lunch for the panel at one of the schools.\n" +
      "The mutual agreement between the city and the winning company will be signed in May. The contract, which is binding for three years, starts on 1 September.",
    questions: [
      {
        text: "Why can Ana Weber not answer questions from bidders?",
        options: ["She will make the final decision.", "She only works in writing.", "She is on the panel."],
        answer: 0,
        explain: "„She will make the final decision, which is why she cannot answer questions from bidders during the procedure.“",
      },
      {
        text: "How much is the quality of food worth?",
        options: ["40 percent", "20 percent", "60 percent"],
        answer: 0,
        explain: "„The criteria, which were approved by the city council in January, are price (40 percent), quality of food (40 percent) and environmental standards (20 percent).“",
      },
      {
        kind: "truefalse",
        text: "Paul Grant answers questions on the phone.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Paul, whose office is in the town hall, answers questions in writing only.“",
      },
      {
        kind: "gapfill",
        text: "The executive to ___ the panel reports is the deputy mayor, Linda Moss.",
        options: [],
        answer: 0,
        accept: ["whom"],
        explain: "„The executive to whom the panel reports is the deputy mayor, Linda Moss.“",
      },
      {
        kind: "order",
        text: "Tarafların sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Ana Weber will make the final decision.",
          "Paul Grant answers questions in writing.",
          "The panel has five members.",
          "The contract starts on 1 September.",
        ],
        explain: "Not kişileri görev sırasıyla tanıtıyor: karar veren, yürüten, değerlendiren, en sonda sözleşme.",
      },
      {
        kind: "short_answer",
        text: "What will every finalist do for the panel?",
        options: [],
        answer: 0,
        accept: ["cook a lunch", "cook lunch", "make a lunch"],
        explain: "„every bidder that reaches the final round will cook a lunch for the panel at one of the schools.“",
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
    title: "The weekend shop outage",
    genre: "dialogue",
    intro: "Hafta sonu yaşanan bir aksaklığın özeti hazırlanıyor. Ne oldu, ne değişmeli?",
    gloss: [
      { de: "a payment provider", tr: "ödeme hizmeti sağlayıcısı" },
      { de: "an emergency", tr: "acil durum" },
      { de: "a warehouse", tr: "depo" },
      { de: "a contact", tr: "irtibat kişisi" },
      { de: "an action", tr: "yapılacak iş" },
      { de: "deserve", tr: "hak etmek" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Hakan", text: "The director wants a short summary of the weekend incident before lunch. Can you tell me what happened?" },
      { speaker: "Ceren", text: "Sure. On Saturday morning our online shop stopped taking orders. Having noticed the problem at eight, the night team called me at home." },
      { speaker: "Hakan", text: "What was the cause?" },
      { speaker: "Ceren", text: "A payment provider changed its settings without telling us. Suspended on Saturday, the service was resumed on Sunday afternoon." },
      { speaker: "Hakan", text: "So we lost more than a day of sales." },
      { speaker: "Ceren", text: "About thirty hours. But the warehouse did well. Being prompt, the team dispatched all the orders from Friday before the problem started." },
      { speaker: "Hakan", text: "Did customers complain?" },
      { speaker: "Ceren", text: "Around forty did. Having reviewed the incident, we wrote to every customer. We offered free delivery on their next order." },
      { speaker: "Hakan", text: "Good. Anything we should change?" },
      { speaker: "Ceren", text: "Yes. Not knowing who to call at the payment provider, we lost two hours. We need an emergency contact there." },
      { speaker: "Hakan", text: "I will put that first in the list of actions. Anything else?" },
      { speaker: "Ceren", text: "Only one thing. Having worked all weekend, the night team deserves a personal thank-you from the director." },
    ],
    questions: [
      {
        text: "What stopped working on Saturday?",
        options: ["the online shop", "the warehouse", "the phone system"],
        answer: 0,
        explain: "„On Saturday morning our online shop stopped taking orders.“",
      },
      {
        text: "What caused the problem?",
        options: ["A payment provider changed its settings.", "The night team made a mistake.", "The warehouse closed."],
        answer: 0,
        explain: "„A payment provider changed its settings without telling us.“",
      },
      {
        kind: "truefalse",
        text: "The orders from Friday were sent before the problem started.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Being prompt, the team dispatched all the orders from Friday before the problem started.“",
      },
      {
        kind: "gapfill",
        text: "Suspended on Saturday, the service was resumed on Sunday ___.",
        options: [],
        answer: 0,
        accept: ["afternoon"],
        explain: "„Suspended on Saturday, the service was resumed on Sunday afternoon.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Having reviewed the incident, we wrote to every customer.", "Having reviewed the incident, we wrote to every customer"],
        explain: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "What does Ceren want at the payment provider?",
        options: [],
        answer: 0,
        accept: ["an emergency contact", "a contact", "an emergency contact there"],
        explain: "„We need an emergency contact there.“",
      },
    ],
  },
  {
    id: "en-b2-u05-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 5,
    title: "Update on the machine order",
    genre: "monologue",
    intro: "Lojistik firmasından müşteriye sesli mesaj. Makineler ne zaman yola çıkacak, ne zaman varacak?",
    gloss: [
      { de: "customs", tr: "gümrük" },
      { de: "insurance", tr: "sigorta" },
      { de: "a port", tr: "liman" },
      { de: "a factory", tr: "fabrika" },
      { de: "a ship", tr: "gemi" },
      { de: "load", tr: "yüklemek" },
      { de: "the twentieth", tr: "ayın yirmisi" },
      { de: "the tenth", tr: "ayın onu" },
      { de: "smooth", tr: "sorunsuz" },
      { de: "certainly", tr: "kesinlikle" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Görkem", text: "Hello Ms. Carter, this is your account manager at Nordline Logistics, with an update on your order of twelve printing machines." },
      { speaker: "Görkem", text: "First, the good news. By Friday we will have executed the order: all twelve machines will have left the factory in Hamburg." },
      { speaker: "Görkem", text: "This time next week we will be checking the bond with the customs office. That usually takes two or three days, so please do not worry if you hear nothing on Monday." },
      { speaker: "Görkem", text: "The detailed reply to your questions about insurance will have been sent by then. Our legal team is writing it at the moment." },
      { speaker: "Görkem", text: "There is one thing I cannot promise yet. The ship to your port leaves every ten days, and I do not know if we will be loading your machines on the first ship or the second." },
      { speaker: "Görkem", text: "If it is the second, the machines will arrive around the twentieth, not the tenth. I will know by Wednesday." },
      { speaker: "Görkem", text: "By the time the machines arrive, we will have been working on this order for two months, and I would like the last part to be the smoothest." },
      { speaker: "Görkem", text: "So I will call you on Wednesday either way. Thank you, and have a good afternoon." },
    ],
    questions: [
      {
        text: "How many machines are in the order?",
        options: ["twelve", "ten", "two"],
        answer: 0,
        explain: "„with an update on your order of twelve printing machines.“",
      },
      {
        text: "What will they be doing this time next week?",
        options: ["checking the bond with the customs office", "loading the ship", "writing about insurance"],
        answer: 0,
        explain: "„This time next week we will be checking the bond with the customs office.“",
      },
      {
        kind: "truefalse",
        text: "The machines will certainly arrive on the tenth.",
        options: ["True", "False"],
        answer: 1,
        explain: "„If it is the second, the machines will arrive around the twentieth, not the tenth.“",
      },
      {
        kind: "gapfill",
        text: "By Friday we will have ___ the order.",
        options: [],
        answer: 0,
        accept: ["executed"],
        explain: "„By Friday we will have executed the order: all twelve machines will have left the factory in Hamburg.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "The detailed reply to your questions about insurance will have been sent by then.",
          "The detailed reply to your questions about insurance will have been sent by then",
        ],
        explain: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "When will the account manager call again?",
        options: [],
        answer: 0,
        accept: ["on Wednesday", "Wednesday"],
        explain: "„So I will call you on Wednesday either way.“",
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
    title: "Firm lines for a letter",
    genre: "opinion",
    intro: "Gecikmeyi kabul etmeyen kararlı bir mektubun cümlelerini yaz.",
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
        tr: "Ancak mesele üst merciye taşındıktan sonra yanıt verdiler.",
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
        tr: "İhaleyi imzalayan Ana müdürdür.",
        answer: "Ana, who signed the tender, is the director.",
        hint: "Virgüller cümleciği fazladan yapıyor; ad seçim istemiyor.",
      },
      {
        kind: "form",
        prompt: "İnşaat şirketine yazılacak mektup için not kartını doldur.",
        facts: "İş eylül başında bitmeliydi ve beş hafta gecikti; şantiyeye ancak müdüre şikâyet edildikten sonra gelindi; son taksit ancak iş denetlendiğinde ödenecek; cumaya kadar ayrıntılı bir takvim isteniyor.",
        fields: [
          { label: "Delay", answer: "five weeks", accept: ["5 weeks"] },
          { label: "Site visit", answer: "only after the escalation", accept: ["after the escalation", "after we complained to the director"] },
          { label: "Final installment", answer: "only when the work is checked", accept: ["when the work is checked", "after the check"] },
          { label: "We ask for", answer: "a detailed schedule", accept: ["a schedule", "a detailed schedule by Friday"] },
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
    title: "The incident summary",
    genre: "info",
    intro: "Yönetici için bir aksaklığın kısa özetini ve takvimini yaz.",
    gloss: [
      { de: "having reviewed", tr: "inceledikten sonra" },
      { de: "being prompt", tr: "hızlı davranarak" },
      { de: "suspended", tr: "durdurulan" },
      { de: "will have executed", tr: "yerine getirmiş olacak" },
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
        tr: "Pazartesi durdurulan hizmet çarşamba yeniden başlatıldı.",
        answer: "Suspended on Monday, the service was resumed on Wednesday.",
        hint: "Üçüncü hâlle başlıyor: durduran söylenmiyor.",
      },
      {
        kind: "build",
        tr: "Cuma gününe kadar siparişi yerine getirmiş olacağız.",
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
