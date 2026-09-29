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
 *           By then his puberty will have ended. ·
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
    title: "A missed wedding",
    genre: "letter",
    intro: "Bir okur mektubu ve köşe yazarının yanıtı. Kardeş düğüne neden gelmemiş olabilir?",
    gloss: [
      { de: "a wedding", tr: "düğün" },
      { de: "hardly", tr: "neredeyse hiç" },
      { de: "hurt", tr: "kırgın" },
      { de: "gently", tr: "nazikçe" },
      { de: "manage", tr: "becermek" },
      { de: "simply", tr: "düpedüz" },
      { de: "forever", tr: "sonsuza dek" },
      { de: "deserve", tr: "hak etmek" },
    ],
    minutes: 9,
    text:
      "Dear Nadia,\n" +
      "My brother did not come to my wedding in June. He sent a short message the night before, and since then we have hardly spoken. My mother says he must have had a good reason. My husband says he must have forgotten how much it meant to me. I think he simply did not care. Am I being unforgiving?\n" +
      "Selin, Izmir\n" +
      "Dear Selin,\n" +
      "I cannot tell you what your brother was thinking, but I can tell you what the facts suggest. He sent a message the night before, so he can't have forgotten the date. He must have known that you would be hurt, and he must have decided that staying away was still easier than coming. That is not the same as not caring.\n" +
      "You describe him as reserved, and reserved people often find it hard to explain themselves. He must have failed to find the words, and a short message was the only thing he could manage. That does not make it right. He should have called you, and he should have called earlier.\n" +
      "But look at your own part too, gently. You have hardly spoken since June. You must have been waiting for him to take the first step, and he must have been waiting for you. Two people who are waiting can wait for years.\n" +
      "So be lenient with him once, not forever. Write to him and ask one question: what happened that night? Do not ask why he did not care; that question already has an answer inside it.\n" +
      "If he can't have meant to hurt you, his reply will show it. If he did mean to, you will know that too, and you can decide then how much generosity he deserves.\n" +
      "Nadia",
    questions: [
      {
        text: "What did the brother do the night before the wedding?",
        options: ["He sent a short message.", "He called his mother.", "He came to the house."],
        answer: 0,
        explain: "„He sent a short message the night before, and since then we have hardly spoken.“",
      },
      {
        text: "How does Selin describe her brother?",
        options: ["reserved", "moody", "ambitious"],
        answer: 0,
        explain: "„You describe him as reserved…“",
      },
      {
        kind: "truefalse",
        text: "Nadia thinks the brother should have called.",
        options: ["True", "False"],
        answer: 0,
        explain: "„He should have called you, and he should have called earlier.“",
      },
      {
        kind: "gapfill",
        text: "He must have ___ to find the words.",
        options: [],
        answer: 0,
        accept: ["failed"],
        explain: "„He must have failed to find the words…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Selin asks if she is being unforgiving.",
          "Nadia says he must have known Selin would be hurt.",
          "Nadia says he should have called earlier.",
          "Nadia suggests asking one question.",
        ],
        explain: "Önce Selin'in sorusu, sonra Nadia'nın çıkarımı, eleştirisi ve en sonda önerisi.",
      },
      {
        kind: "short_answer",
        text: "What question should Selin ask her brother?",
        options: [],
        answer: 0,
        accept: ["what happened that night", "what happened"],
        explain: "„what happened that night?“",
      },
    ],
  },
  {
    id: "en-b2-u22-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 22,
    title: "A guide after the fire",
    genre: "guide",
    intro: "Yangından sonra ailelere yazılmış bir danışma merkezi broşürü. Neler yardımcı oluyor?",
    gloss: [
      { de: "counseling", tr: "danışmanlık" },
      { de: "a fire", tr: "yangın" },
      { de: "destroy", tr: "yok etmek" },
      { de: "a neighbor", tr: "komşu" },
      { de: "smoke", tr: "duman" },
      { de: "a noise", tr: "gürültü" },
      { de: "a counselor", tr: "danışman" },
      { de: "seldom", tr: "nadiren" },
      { de: "afraid", tr: "korkmuş" },
      { de: "a teenager", tr: "ergen" },
      { de: "rely on", tr: "güvenmek" },
      { de: "a session", tr: "görüşme" },
      { de: "turn away", tr: "geri çevirmek" },
      { de: "die", tr: "ölmek" },
      { de: "a smell", tr: "koku" },
      { de: "sudden", tr: "ani" },
      { de: "real", tr: "gerçek" },
      { de: "unusually", tr: "alışılmadık ölçüde" },
      { de: "individual", tr: "bireysel" },
      { de: "react", tr: "tepki vermek" },
    ],
    minutes: 9,
    text:
      "AFTER THE FIRE: A GUIDE FOR FAMILIES\n" +
      "Community Counseling Center, Riverside\n" +
      "Three months ago, a fire destroyed twelve homes on Oak Street. Nobody died, but many families lost almost everything. This guide is for them, and for their friends and neighbors.\n" +
      "What people told us. „Never has a burden felt so heavy,“ one father told us. „We had insurance and a place to stay, and still I could not sleep.“ His experience is common. Rarely does a trauma pass quietly. It comes back at night, in a smell of smoke, or in a sudden noise in the kitchen.\n" +
      "What helps. Talk, even if it is hard. Only after the first talk with a counselor does the real coping begin, and many parents said the same: only after they had spoken about that night did they start to sleep again.\n" +
      "Be patient with children. Seldom do children say that they are afraid. More often they become moody, impulsive or unusually quiet. Teenagers going through puberty may seem angry rather than sad. Try to be lenient and considerate, and do not expect obedience in the first weeks.\n" +
      "Do not rely on willpower alone. Repression works for a while, and then it stops working. Ask for help early.\n" +
      "Where to find us. Free group meetings are held every Tuesday at six in the evening in the school library. Individual sessions can be booked by phone. Not once have we turned away a family, and you do not need an appointment for your first visit.",
    questions: [
      {
        text: "How many homes did the fire destroy?",
        options: ["twelve", "three", "six"],
        answer: 0,
        explain: "„Three months ago, a fire destroyed twelve homes on Oak Street.“",
      },
      {
        text: "How may teenagers react?",
        options: ["They may seem angry.", "They say they are afraid.", "They sleep more."],
        answer: 0,
        explain: "„Teenagers going through puberty may seem angry rather than sad.“",
      },
      {
        kind: "truefalse",
        text: "The guide says that willpower alone is enough.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Do not rely on willpower alone.“",
      },
      {
        kind: "gapfill",
        text: "Only after the first talk with a counselor does the real ___ begin.",
        options: [],
        answer: 0,
        accept: ["coping"],
        explain: "„Only after the first talk with a counselor does the real coping begin…“",
      },
      {
        kind: "order",
        text: "Broşürün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "A fire destroyed twelve homes.",
          "A father could not sleep.",
          "Children may become moody or quiet.",
          "Group meetings are held every Tuesday.",
        ],
        explain: "Önce olay ve bir babanın sözleri, sonra öneriler, en sonda merkezin bilgileri.",
      },
      {
        kind: "short_answer",
        text: "When are the free group meetings?",
        options: [],
        answer: 0,
        accept: ["every Tuesday", "on Tuesdays", "Tuesday"],
        explain: "„Free group meetings are held every Tuesday at six in the evening in the school library.“",
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
    title: "Seats for a dinner party",
    genre: "dialogue",
    intro: "İki kişi cumartesi yemeğinde kimin nereye oturacağını planlıyor. Kim kimin yanına?",
    gloss: [
      { de: "the seating", tr: "oturma düzeni" },
      { de: "enjoy", tr: "keyif almak" },
      { de: "a cousin", tr: "kuzen" },
      { de: "bored", tr: "sıkılmış" },
      { de: "lately", tr: "son zamanlarda" },
      { de: "famous", tr: "ünlü" },
      { de: "feed", tr: "doyurmak" },
      { de: "a bit", tr: "biraz" },
    ],
    minutes: 7,
    segments: [
      { speaker: "İnci", text: "Can you help me with the seating for Saturday? Ten people, one long table, and I want everybody to enjoy it." },
      { speaker: "Barkın", text: "Sure. Who is the difficult one?" },
      { speaker: "İnci", text: "Nobody is difficult, but my friend Leyla, who is very reserved, will not talk to anyone she does not know." },
      { speaker: "Barkın", text: "Then put her next to someone sociable. What about your cousin Emir?" },
      { speaker: "İnci", text: "Emir, who is sociable but a bit impulsive, might tell her his whole life story in ten minutes." },
      { speaker: "Barkın", text: "That could work, actually. Reserved people often like people who do the talking for them." },
      { speaker: "İnci", text: "True. Then there is my sister, who is ambitious and wants to talk about work all evening." },
      { speaker: "Barkın", text: "Put her next to my colleague Deniz, whose manner is composed. He can listen to anything without getting bored." },
      { speaker: "İnci", text: "And your brother, who has been so moody lately?" },
      { speaker: "Barkın", text: "He is going through a hard time. Put him near the end, next to Mom, who is the most considerate person I know." },
      { speaker: "İnci", text: "Your mother, whose generosity is famous, will feed him all night." },
      { speaker: "Barkın", text: "Exactly. That is her way of helping." },
      { speaker: "İnci", text: "Good. I think we have a table." },
    ],
    questions: [
      {
        text: "Why could Leyla be a problem at the table?",
        options: ["She will not talk to strangers.", "She talks about work.", "She is always late."],
        answer: 0,
        explain: "„my friend Leyla, who is very reserved, will not talk to anyone she does not know.“",
      },
      {
        text: "Who will sit next to the ambitious sister?",
        options: ["Deniz", "Emir", "Leyla"],
        answer: 0,
        explain: "„Put her next to my colleague Deniz, whose manner is composed.“",
      },
      {
        kind: "truefalse",
        text: "Barkın's brother is having a hard time.",
        options: ["True", "False"],
        answer: 0,
        explain: "„He is going through a hard time.“",
      },
      {
        kind: "gapfill",
        text: "Put him near the end, next to Mom, who is the most ___ person I know.",
        options: [],
        answer: 0,
        accept: ["considerate"],
        explain: "„Put him near the end, next to Mom, who is the most considerate person I know.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Your mother, whose generosity is famous, will feed him all night.", "Your mother, whose generosity is famous, will feed him all night"],
        explain: "Virgüller arasındaki bilgi kişiyi seçmiyor, ona bir şey ekliyor; „whose“ iyeliği taşıyor.",
      },
      {
        kind: "short_answer",
        text: "How many people are coming on Saturday?",
        options: [],
        answer: 0,
        accept: ["ten", "10", "ten people"],
        explain: "„Ten people, one long table, and I want everybody to enjoy it.“",
      },
    ],
  },
  {
    id: "en-b2-u22-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 22,
    title: "A family plan for next year",
    genre: "monologue",
    intro: "Bir anne, zor bir yılın ardından ailesinin planını anlatıyor. Bir yıl sonra ne değişmiş olacak?",
    gloss: [
      { de: "exhausted", tr: "bitkin" },
      { de: "a turning point", tr: "dönüm noktası" },
      { de: "a sense of security", tr: "güvenlik duygusu" },
      { de: "the worst", tr: "en kötüsü" },
      { de: "honesty", tr: "dürüstlük" },
      { de: "real", tr: "gerçek" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Ceren Su", text: "Last year was the hardest year our family has had. My son Arda was fourteen, angry and hardly at home, and my husband and I were exhausted." },
      { speaker: "Ceren Su", text: "So in January we sat down and made a plan, and I want to tell you where we will be a year from now if it works." },
      { speaker: "Ceren Su", text: "By next summer we will have passed the turning point. Arda will have finished his first year at the new school, and he will have made at least one real friend there." },
      { speaker: "Ceren Su", text: "Next year we will be building a sense of security at home. That means we will be eating dinner together four nights a week, phones off." },
      { speaker: "Ceren Su", text: "My husband will be working from home on Fridays, so somebody will always be there when Arda comes back from school." },
      { speaker: "Ceren Su", text: "By then his puberty will have ended. Or at least the worst of it will be over. I say that as a hope, not as a fact." },
      { speaker: "Ceren Su", text: "We will also have stopped asking for obedience. We will be asking for honesty instead, which is harder for us and easier for him." },
      { speaker: "Ceren Su", text: "Will it work? I do not know. But this time next year I will be sitting here again, and I will tell you." },
    ],
    questions: [
      {
        text: "How old was Arda last year?",
        options: ["fourteen", "sixteen", "twelve"],
        answer: 0,
        explain: "„My son Arda was fourteen, angry and hardly at home…“",
      },
      {
        text: "What will the family be doing four nights a week?",
        options: ["eating dinner together", "working from home", "visiting the school"],
        answer: 0,
        explain: "„we will be eating dinner together four nights a week, phones off.“",
      },
      {
        kind: "truefalse",
        text: "The family will keep asking Arda for obedience.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We will also have stopped asking for obedience.“",
      },
      {
        kind: "gapfill",
        text: "Next year we will be building a sense of ___ at home.",
        options: [],
        answer: 0,
        accept: ["security"],
        explain: "„Next year we will be building a sense of security at home.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By then his puberty will have ended.", "By then his puberty will have ended"],
        explain: "Edilgen değil ama bitmiş: „will have“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "Who will be at home on Fridays?",
        options: [],
        answer: 0,
        accept: ["her husband", "the father", "husband"],
        explain: "„My husband will be working from home on Fridays…“",
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
    title: "Looking back at a conflict",
    genre: "info",
    intro: "Bir aile anlaşmazlığına geriye dönüp bakıyorsun. Cümleleri kur, sonra köşe yazısı için kısa bir vaka kartı doldur.",
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
        tr: "Affetmez davranmış olamazlar.",
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
        prompt: "Tavsiye köşesi için vaka kartını doldur.",
        facts: "Selin'in kardeşi haziranda düğüne gelmedi; düğünden önceki akşam kısa bir mesaj gönderdi; köşe yazarına göre onu aramalıydı; öneri: ona tek bir soru sormak.",
        fields: [
          { label: "What happened", answer: "he missed the wedding", accept: ["he did not come", "he missed the wedding in June"] },
          { label: "His message", answer: "the night before", accept: ["the night before the wedding", "a short message"] },
          { label: "What he should have done", answer: "he should have called", accept: ["called her", "called earlier"] },
          { label: "Advice", answer: "ask one question", accept: ["ask what happened", "ask what happened that night"] },
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
    title: "Coping with trauma",
    genre: "opinion",
    intro: "Zor bir dönemden geçen bir aile için broşür cümleleri yaz: ne yaşandı, önümüzdeki yıl neler olacak?",
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
        hint: "İşin içinde olmak: sürekli biçim.",
      },
    ],
  },
];
