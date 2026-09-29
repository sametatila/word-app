import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 21 — "Değerlendirme, onun hakkında söylenenler, asıl
 * acıtan, nasıl bozuştuk".
 *
 * Dört ders: The assessment · What is said about her · What really hurt ·
 * How we fell out.
 *
 *   Kelime: perception, self-confidence, self-esteem, characteristic,
 *           sensitivity, inclination, distrust, admiration, appreciation,
 *           backing, exclusion, belonging, loneliness, rage, jealousy,
 *           remorse, envy, embarrassment, despair, impatience, mediate,
 *           reconcile, adapt, endure, repress.
 *   Kalıp:  The measurement of perception takes an hour. ·
 *           The building of self-confidence is slow. ·
 *           The naming of a pattern helps. ·
 *           She is said to feel distrust. ·
 *           The admiration is expected to fade. ·
 *           The appreciation is thought to have been genuine. ·
 *           What really hurt was not the rage. ·
 *           It was the jealousy that ended it. ·
 *           What stays is the remorse. ·
 *           Having tried to mediate, she stopped. ·
 *           Asked to reconcile, they refused. ·
 *           Wanting to adapt, he said nothing.
 *
 * Ünitenin tek öğretme noktası „-ING“ ADLAŞTIRMASI: ÜRETKEN KAPI.
 * Ünite 4, 10 ve 16 ekin fiilden türetilemediğini göstermişti — liste var,
 * kural yok. Burada listenin yanındaki ikinci yol açılıyor: fiile „-ing“
 * takmak İSTİSNASIZ her fiilde çalışıyor („the building of“, „the naming
 * of“, „the repressing of“). Yani İngilizcede biri kuralsız bir liste,
 * öteki listesiz bir kural olan iki yol var ve ikincisi her zaman açık.
 */
export const enB2U21: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u21-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 21,
    title: "Measuring self-confidence",
    genre: "info",
    intro: "Bir danışma merkezinin özgüven programı broşürü. Program nasıl işliyor, kaça mal oluyor?",
    gloss: [
      { de: "a referral", tr: "sevk" },
      { de: "a participant", tr: "katılımcı" },
      { de: "an assessment", tr: "değerlendirme" },
      { de: "a counselor", tr: "danışman" },
      { de: "individual", tr: "bireysel" },
      { de: "simply", tr: "sadece" },
      { de: "real", tr: "gerçek" },
      { de: "reduced", tr: "indirimli" },
      { de: "a weekday", tr: "hafta içi" },
      { de: "currently", tr: "şu anda" },
      { de: "counseling", tr: "danışmanlık" },
    ],
    minutes: 9,
    text:
      "THE SELF-CONFIDENCE PROGRAM AT THE CITY COUNSELING CENTER\n" +
      "Who is it for?\n" +
      "The program is for adults who find it hard to speak up at work, in groups or in their families. You do not need a referral from a doctor.\n" +
      "How does it start?\n" +
      "Every participant begins with an assessment. The measurement of perception takes an hour: you answer questions about how you see yourself and how you think others see you. A counselor then talks through the results with you. There is no pass or fail.\n" +
      "What happens next?\n" +
      "The building of self-confidence is slow, and we do not promise quick results. The program runs for ten weeks, with one group session and one short individual meeting per week. In the group, the sharing of experiences is an important part of the work, but nobody has to speak before they are ready.\n" +
      "Why does it work?\n" +
      "The naming of a pattern helps. Many participants tell us that simply noticing their own habits, for example apologizing all the time, was the first real change. Practicing small steps between sessions does the rest.\n" +
      "What does it cost?\n" +
      "The first assessment is free. The program costs 120 euros, and a reduced price is available for students and people without an income.\n" +
      "How do I sign up?\n" +
      "Call us or visit the center on a weekday between nine and five. The waiting list is currently about three weeks.",
    questions: [
      {
        text: "How long does the measurement of perception take?",
        options: ["an hour", "ten weeks", "three weeks"],
        answer: 0,
        explain: "„The measurement of perception takes an hour…“",
      },
      {
        text: "How long does the program run?",
        options: ["ten weeks", "one week", "a year"],
        answer: 0,
        explain: "„The program runs for ten weeks…“",
      },
      {
        kind: "truefalse",
        text: "The first assessment is free.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The first assessment is free.“",
      },
      {
        kind: "gapfill",
        text: "The building of self-confidence is ___.",
        options: [],
        answer: 0,
        accept: ["slow"],
        explain: "„The building of self-confidence is slow, and we do not promise quick results.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "You do not need a referral from a doctor.",
          "Every participant begins with an assessment.",
          "The program runs for ten weeks.",
          "The waiting list is about three weeks.",
        ],
        explain: "Kimin için olduğu, başlangıç, programın kendisi, en sonda kayıt.",
      },
      {
        kind: "short_answer",
        text: "How long is the waiting list?",
        options: [],
        answer: 0,
        accept: ["about three weeks", "three weeks"],
        explain: "„The waiting list is currently about three weeks.“",
      },
    ],
  },
  {
    id: "en-b2-u21-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 21,
    title: "Gossip about a new colleague",
    genre: "letter",
    intro: "İş yeri tavsiye köşesine bir mektup ve cevabı. Ofiste Nora hakkında ne konuşuluyor?",
    gloss: [
      { de: "criticize", tr: "eleştirmek" },
      { de: "unfriendly", tr: "soğuk" },
      { de: "a rumor", tr: "dedikodu" },
    ],
    minutes: 9,
    text:
      "ASK ANNA: ADVICE FOR THE WORKPLACE\n" +
      "Dear Anna,\n" +
      "Nora joined our team three months ago, and the whole office is already talking about her. She is said to feel distrust toward the rest of us, because she eats lunch alone and never joins us after work. The manager's admiration for her is expected to fade soon, according to a colleague who has worked here for years. Her appreciation of our old team leader is thought to have been genuine, but people say she criticizes his methods now.\n" +
      "I do not know what to believe. I like Nora, and I have never seen her be unfriendly. Should I say something to the others, or stay out of it?\n" +
      "Tom\n" +
      "Dear Tom,\n" +
      "Notice that nothing in your letter has a source. She is said to feel distrust: by whom? The admiration is expected to fade: who expects it, and why?\n" +
      "Rumors like these are rarely about the person. They are usually about a team that has not yet made room for someone new. The exclusion of a new colleague often starts exactly like this, with small comments that nobody has to stand behind.\n" +
      "My advice: do not repeat anything you cannot check. Invite Nora for coffee and ask her how she is finding the job. And if someone tells you what she is said to think, ask whether she told them herself. You will be surprised how often the answer is no.\n" +
      "Anna",
    questions: [
      {
        text: "When did Nora join the team?",
        options: ["three months ago", "three years ago", "last week"],
        answer: 0,
        explain: "„Nora joined our team three months ago…“",
      },
      {
        text: "Why do people say Nora feels distrust?",
        options: ["She eats lunch alone.", "She criticized the manager.", "She is always late."],
        answer: 0,
        explain: "„because she eats lunch alone and never joins us after work.“",
      },
      {
        kind: "truefalse",
        text: "Tom has seen Nora be unfriendly.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I like Nora, and I have never seen her be unfriendly.“",
      },
      {
        kind: "gapfill",
        text: "She is said to feel ___ toward the rest of us.",
        options: [],
        answer: 0,
        accept: ["distrust"],
        explain: "„She is said to feel distrust toward the rest of us…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Nora joined the team three months ago.",
          "Tom asks what he should do.",
          "Anna notices that nothing has a source.",
          "Anna suggests inviting Nora for coffee.",
        ],
        explain: "Durum, Tom'un sorusu, Anna'nın gözlemi, en sonda öneri.",
      },
      {
        kind: "short_answer",
        text: "What should Tom not repeat?",
        options: [],
        answer: 0,
        accept: ["anything he cannot check", "what he cannot check", "rumors"],
        explain: "„My advice: do not repeat anything you cannot check.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u21-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 21,
    title: "Two old friends talk",
    genre: "dialogue",
    intro: "Bahar, eski arkadaşı Ece ile neden küs olduğunu anlatıyor. Asıl kırıcı olan neydi?",
    gloss: [
    ],
    minutes: 7,
    segments: [
      { speaker: "Toprak", text: "I heard you and Ece are not speaking anymore. What happened?" },
      { speaker: "Bahar", text: "It is a long story. What really hurt was not the rage. We shouted at each other, fine, that happens." },
      { speaker: "Toprak", text: "Then what was it?" },
      { speaker: "Bahar", text: "It was the jealousy that ended it. When I got the job in Berlin, she stopped calling. Not a message for three months." },
      { speaker: "Toprak", text: "Maybe she was just busy." },
      { speaker: "Bahar", text: "That is what I told myself. But what I found out later was that she had told our friends I only got the job through connections." },
      { speaker: "Toprak", text: "Ouch. Did you talk to her about it?" },
      { speaker: "Bahar", text: "Once, in May. What she said was that she had been joking. What I heard was envy." },
      { speaker: "Toprak", text: "And now?" },
      { speaker: "Bahar", text: "What stays is the remorse. I should have called her earlier, before it got so big." },
      { speaker: "Toprak", text: "It is not too late, you know. Her birthday is next week." },
      { speaker: "Bahar", text: "It is her birthday that I have been thinking about all morning, actually." },
    ],
    questions: [
      {
        text: "Where did Bahar get a job?",
        options: ["in Berlin", "in Ankara", "in London"],
        answer: 0,
        explain: "„When I got the job in Berlin, she stopped calling.“",
      },
      {
        text: "What did Ece tell their friends?",
        options: ["that Bahar got the job through connections", "that Bahar was moving away", "that she was busy"],
        answer: 0,
        explain: "„she had told our friends I only got the job through connections.“",
      },
      {
        kind: "truefalse",
        text: "Ece did not send a message for three months.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Not a message for three months.“",
      },
      {
        kind: "gapfill",
        text: "It was the ___ that ended it.",
        options: [],
        answer: 0,
        accept: ["jealousy"],
        explain: "„It was the jealousy that ended it.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["What really hurt was not the rage.", "What really hurt was not the rage"],
        explain: "Bahar asıl sebebin öfke olmadığını baştan söylüyor; sebebi bir sonraki cümlede veriyor.",
      },
      {
        kind: "short_answer",
        text: "When is Ece having her birthday?",
        options: [],
        answer: 0,
        accept: ["next week", "in a week"],
        explain: "„Her birthday is next week.“",
      },
    ],
  },
  {
    id: "en-b2-u21-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 21,
    title: "A failed attempt to mediate",
    genre: "monologue",
    intro: "Bir arabulucunun iki komşu aile hakkındaki raporu. Uzlaşma neden tutmadı?",
    gloss: [
      { de: "peace", tr: "huzur" },
      { de: "a recommendation", tr: "öneri" },
      { de: "directly", tr: "doğrudan" },
      { de: "mediation", tr: "arabuluculuk" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Kaya", text: "This is my report for the housing office on the mediation between the two families in building C." },
      { speaker: "Kaya", text: "Having tried to mediate three times since March, I have to say that we have not reached an agreement." },
      { speaker: "Kaya", text: "The problem started with noise. Wanting to keep the peace, the older couple said nothing for almost a year. Then they called the police twice in one week." },
      { speaker: "Kaya", text: "Asked to reconcile at our first meeting, both families refused. Asked again in April, they agreed to talk, but only through me." },
      { speaker: "Kaya", text: "The second meeting went better. Having listened to each other for an hour, they agreed on quiet hours after ten in the evening." },
      { speaker: "Kaya", text: "Unfortunately, the agreement lasted two weeks. Feeling that the rules applied only to them, the younger family stopped following them." },
      { speaker: "Kaya", text: "My recommendation: the housing office should now speak to both families directly. Having done what I can, I am closing the file." },
    ],
    questions: [
      {
        text: "What did the problem start with?",
        options: ["noise", "money", "parking"],
        answer: 0,
        explain: "„The problem started with noise.“",
      },
      {
        text: "What did the families agree on at the second meeting?",
        options: ["quiet hours after ten", "moving out", "calling the police"],
        answer: 0,
        explain: "„they agreed on quiet hours after ten in the evening.“",
      },
      {
        kind: "truefalse",
        text: "The agreement is still working.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Unfortunately, the agreement lasted two weeks.“",
      },
      {
        kind: "gapfill",
        text: "___ tried to mediate three times since March, I have to say that we have not reached an agreement.",
        options: [],
        answer: 0,
        accept: ["Having", "having"],
        explain: "„Having tried to mediate three times since March, I have to say that we have not reached an agreement.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Asked to reconcile at our first meeting, both families refused.",
          "Asked to reconcile at our first meeting, both families refused",
        ],
        explain: "Edilgen ortaç: „asked“, ailelere sorulduğunu söylüyor.",
      },
      {
        kind: "short_answer",
        text: "Who should speak to the families now?",
        options: [],
        answer: 0,
        accept: ["the housing office", "housing office"],
        explain: "„the housing office should now speak to both families directly.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u21-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 21,
    title: "A psychology report",
    genre: "info",
    intro: "Danışma merkezi için kısa bir değerlendirme raporu: ne ölçülüyor, ne söyleniyor?",
    gloss: [
      { de: "the measurement", tr: "ölçülmesi" },
      { de: "the building", tr: "inşası" },
      { de: "the naming", tr: "adlandırılması" },
      { de: "is said to feel", tr: "duyduğu söyleniyor" },
      { de: "an assessment", tr: "değerlendirme" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Algının ölçülmesi bir saat sürüyor.",
        answer: "The measurement of perception takes an hour.",
        hint: "Listeden gelen ek: „measure“ → „measurement“.",
      },
      {
        kind: "build",
        tr: "Özgüvenin inşası yavaş.",
        answer: "The building of self-confidence is slow.",
        hint: "Üretken kapı: her fiile „-ing“ takılabiliyor.",
      },
      {
        kind: "build",
        tr: "Bir örüntünün adlandırılması yardımcı oluyor.",
        answer: "The naming of a pattern helps.",
        hint: "Yine „-ing“; liste değil, kural.",
      },
      {
        kind: "build",
        tr: "Güvensizlik duyduğu söyleniyor.",
        answer: "She is said to feel distrust.",
        hint: "En zayıf aktarma: biri söyledi.",
      },
      {
        kind: "form",
        prompt: "Özgüven programı için bilgi kartını doldur.",
        facts: "Algının ölçülmesi bir saat sürüyor; program on hafta sürüyor; ilk değerlendirme ücretsiz; program 120 avro; bekleme listesi yaklaşık üç hafta.",
        fields: [
          { label: "Measurement of perception", answer: "an hour", accept: ["one hour", "1 hour"] },
          { label: "Program length", answer: "ten weeks", accept: ["10 weeks"] },
          { label: "First assessment", answer: "free", accept: ["no cost"] },
          { label: "Program price", answer: "120 euros", accept: ["120"] },
          { label: "Waiting list", answer: "about three weeks", accept: ["three weeks", "3 weeks"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u21-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 21,
    title: "The end of a friendship",
    genre: "opinion",
    intro: "Biten bir arkadaşlık üzerine cümleler: asıl acıtan neydi, kim ne denedi?",
    gloss: [
      { de: "what really hurt", tr: "asıl acıtan" },
      { de: "it was the jealousy", tr: "kıskançlıktı" },
      { de: "what stays", tr: "kalan şey" },
      { de: "asked to reconcile", tr: "barışması istenince" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Asıl acıtan öfke değildi.",
        answer: "What really hurt was not the rage.",
        hint: "Yarık cümle bir adayı listeden çıkarıyor.",
      },
      {
        kind: "build",
        tr: "Onu bitiren kıskançlıktı.",
        answer: "It was the jealousy that ended it.",
        hint: "Işık isme düşüyor.",
      },
      {
        kind: "build",
        tr: "Kalan şey pişmanlık.",
        answer: "What stays is the remorse.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Arabuluculuk yapmayı denedikten sonra vazgeçti.",
        answer: "Having tried to mediate, she stopped.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Barışmaları istenince reddettiler.",
        answer: "Asked to reconcile, they refused.",
        hint: "Edilgen ortaç: „having been“ düşüyor.",
      },
    ],
  },
];
