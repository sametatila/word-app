import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 11 — "Bir kültüre üç ad, dışarıda bırakılanı öne almak,
 * eşitlik istemek, uyum tartışması".
 *
 * Dört ders: Three names for a culture · Fronting the excluded ·
 * Demanding equality · The integration debate.
 *
 *   Kelime: subculture, cultural policy, cultural scene, parallel society,
 *           high culture, dominant culture, marginalization, marginal group,
 *           demarcation line, xenophobia, statelessness, foreign rule,
 *           principle of equality, human dignity, educational inequality,
 *           class society, acculturation, assimilation, hybridity, adaptability.
 *   Kalıp:  In the arts section it is a subculture; in the ministry, cultural policy. ·
 *           What one calls a cultural scene, another calls a parallel society. ·
 *           High culture is a register; dominant culture is a claim. ·
 *           What marginalization does is create a marginal group. ·
 *           Behind the demarcation line stands xenophobia. ·
 *           Statelessness we inherit; foreign rule we remember. ·
 *           The principle of equality demands that human dignity be untouchable for all, not just for some. ·
 *           Were it not for educational inequality, class society would fade. ·
 *           They ask that every participation model give tenants a vote. ·
 *           Much as we like to call it acculturation, they mean assimilation. ·
 *           The integration course, albeit useful, is not a culture of welcome. ·
 *           Although a sign of hybridity, adaptability is asked of one side only.
 *
 * Ünitenin tek öğretme noktası GENEL ÖZNE. İngilizcede „hiç kimse“ demenin
 * dört yolu var — „one“ (resmî, yazarla iddia arasına duvar koyuyor), „we“
 * (yazarı konuşan öbeğin içine alıyor ve okurun da sorulmadan içeri
 * alındığı bir öbek), „you“ (cümleyi okura çeviriyor, en dostu ve en
 * tehlikelisi), edilgen (hiç kimseyi adlandırmıyor) — ve dördünün arasında
 * YANSIZ olan yok. Almanca tek bir sözcükle („man“) geçiyor: kısa,
 * işaretsiz, mutfakta da mahkemede de aynı, hiçbir konum taşımıyor.
 * Ölçünün adı: **bir dilde işaretsiz tek sözcük, ötekinde dört seçenek ve
 * her seçim yazarı betimlediği insanlara göre bir yere koyuyor.** İkinci
 * ölçü aynı kaçınmanın öteki yüzü: soyut bir ismi öne almak („What
 * marginalization does…“, „Behind the demarcation line stands xenophobia“)
 * faili hiç anmadan cümleyi kurmanın yolu.
 */
export const enC1U11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u11-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 11,
    title: "The community center on Carter Street",
    genre: "article",
    intro: "Bir mahalledeki kültür merkezi üzerine gazete yazısı. Merkeze kim hangi adı veriyor?",
    gloss: [
      { de: "simply", tr: "sadece" },
      { de: "charmed", tr: "etkilenmiş" },
      { de: "a newcomer", tr: "yeni gelen" },
      { de: "eventually", tr: "sonunda" },
      { de: "a teenager", tr: "genç" },
      { de: "an opera house", tr: "opera binası" },
      { de: "practical", tr: "pratik" },
      { de: "a roof", tr: "çatı" },
    ],
    minutes: 12,
    text:
      "Ask ten people in Eastfield about the community center on Carter Street and you will get at least three answers. What one calls a cultural scene, another calls a parallel society, and a third simply calls „the place where my daughter learned to dance“.\n" +
      "The center opened in 2009 in a former bakery. Today it offers music lessons, a homework club, a small library in four languages and, on Friday evenings, concerts that regularly fill the street. In the arts section of the local paper it is a subculture worth visiting; in the ministry, a line in the cultural policy budget.\n" +
      "You notice the difference as soon as you walk in. One is greeted in Turkish, Arabic or German, depending on who is behind the desk, and nobody asks where you are from. „We do not check passports at the door,“ says Leyla Demir, who has run the center for eleven years. „We check whether you brought a cake.“\n" +
      "Not everyone is charmed. A local council member recently described the center as proof that newcomers refuse to join the dominant culture. What marginalization does, Demir replies, is create a marginal group: „If one is told for twenty years that one does not belong, one eventually builds a room of one's own.“\n" +
      "The numbers do not support the council member's fears. According to the center's own survey, two thirds of its visitors also use the public library, and half of the teenagers in the homework club go on to university.\n" +
      "Behind the argument stands an older question: who decides what counts as culture at all? High culture is a register; dominant culture is a claim. The first describes an opera house. The second tells everybody else what to do.\n" +
      "For now, the center's biggest problem is more practical. The roof leaks, and the city has not yet said who will pay for it.",
    questions: [
      {
        text: "What was the building before it became a community center?",
        options: ["a bakery", "a library", "an opera house"],
        answer: 0,
        explain: "„The center opened in 2009 in a former bakery.“",
      },
      {
        text: "How does the local paper describe the center?",
        options: ["as a subculture worth visiting", "as a parallel society", "as a line in the budget"],
        answer: 0,
        explain: "„In the arts section of the local paper it is a subculture worth visiting…“",
      },
      {
        kind: "truefalse",
        text: "Visitors are not asked where they are from.",
        options: ["True", "False"],
        answer: 0,
        explain: "„nobody asks where you are from.“",
      },
      {
        kind: "gapfill",
        text: "What marginalization does, Demir replies, is create a ___ group.",
        options: [],
        answer: 0,
        accept: ["marginal"],
        explain: "„What marginalization does, Demir replies, is create a marginal group…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The center opened in a former bakery.",
          "Leyla Demir talks about passports and cake.",
          "A council member speaks against the center.",
          "The roof leaks.",
        ],
        explain: "Tarihçe, merkezin içi, eleştiri ve yanıt; en sonda çatı sorunu.",
      },
      {
        kind: "short_answer",
        text: "What do two thirds of the visitors also use?",
        options: [],
        answer: 0,
        accept: ["the public library", "the library", "public library"],
        explain: "„two thirds of its visitors also use the public library…“",
      },
    ],
  },
  {
    id: "en-c1-u11-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 11,
    title: "A line through the school district",
    genre: "opinion",
    intro: "Okul bölgesi sınırını eleştiren bir öğretmenin köşe yazısı. Yeni çizgi kimi nereye koyuyor?",
    gloss: [
      { de: "redrew", tr: "yeniden çizdi" },
      { de: "a stroke", tr: "çizgi" },
      { de: "science", tr: "fen bilimleri" },
      { de: "a lab", tr: "laboratuvar" },
      { de: "a housing estate", tr: "toplu konut" },
      { de: "a canal", tr: "kanal" },
      { de: "an arrival", tr: "yeni gelen" },
      { de: "a refugee", tr: "mülteci" },
      { de: "stateless", tr: "vatansız" },
      { de: "unexamined", tr: "sorgulanmamış" },
      { de: "produce", tr: "ortaya çıkarmak" },
      { de: "hostile", tr: "düşmanca" },
      { de: "history", tr: "tarih" },
    ],
    minutes: 12,
    text:
      "Last spring the city redrew the line between two school districts in the north of town. On the map it is a thin blue stroke along Canal Road. On the ground it decides which children go to the new school with the science labs and which go to the old one with the broken heating.\n" +
      "What the new line does is put almost every family from the Canal Road housing estate on the wrong side of it. The planning office says the line follows the canal because canals are easy to see. That is true. It is also true that the families on the far side are mostly recent arrivals, many of them refugees, and some of them stateless.\n" +
      "Behind the demarcation line stands something nobody in the office will name. I will not call it xenophobia, because I have no evidence that anybody meant harm. But what an unexamined decision produces is often the same as what a hostile one would have produced, and the children cannot tell the difference.\n" +
      "Statelessness these families inherit; the school they are sent to, we choose. The first is history. The second is a vote of the city council, taken on a Tuesday evening, and it can be taken again.\n" +
      "Marginalization is rarely a single act. It is a line here, a bus route there, a form that is only available in one language. What such small decisions create together is a group that learns, slowly, that the city was drawn without it.\n" +
      "I teach at the old school, and I like it. The teachers are good and the children are better. But a school should not be the place where a child first finds out which side of a line they live on.\n" +
      "The council meets again on May 12. Parents who want the line reviewed can sign the letter at the school office.",
    questions: [
      {
        text: "What does the new line follow?",
        options: ["the canal", "a bus route", "the old school"],
        answer: 0,
        explain: "„The planning office says the line follows the canal because canals are easy to see.“",
      },
      {
        text: "Why does the writer not call it xenophobia?",
        options: ["There is no evidence that anybody meant harm.", "The families are not refugees.", "The council has changed the line."],
        answer: 0,
        explain: "„I will not call it xenophobia, because I have no evidence that anybody meant harm.“",
      },
      {
        kind: "truefalse",
        text: "The writer wants the old school to be closed.",
        options: ["True", "False"],
        answer: 1,
        explain: "„I teach at the old school, and I like it.“",
      },
      {
        kind: "gapfill",
        text: "Behind the demarcation line ___ something nobody in the office will name.",
        options: [],
        answer: 0,
        accept: ["stands"],
        explain: "„Behind the demarcation line stands something nobody in the office will name.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The city redrew the line last spring.",
          "Most families from the housing estate are on the wrong side.",
          "The vote can be taken again.",
          "Parents can sign the letter at the school office.",
        ],
        explain: "Karar, sonucu, değiştirilebilir oluşu; en sonda çağrı.",
      },
      {
        kind: "short_answer",
        text: "When does the council meet again?",
        options: [],
        answer: 0,
        accept: ["on May 12", "May 12", "May 12th"],
        explain: "„The council meets again on May 12.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u11-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 11,
    title: "After the town hall on integration",
    genre: "dialogue",
    intro: "Uyum programı üzerine yapılan halk toplantısının ardından bir sohbet. Salondakiler programı nasıl duydu?",
    gloss: [
      { de: "dislike", tr: "sevmemek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Defne", text: "So, how was the town hall? I only saw the last twenty minutes." },
      { speaker: "Onur", text: "Loud. A woman in the front row put it in one sentence. Much as we like to call it acculturation, they mean assimilation." },
      { speaker: "Defne", text: "Who did she mean by they?" },
      { speaker: "Onur", text: "The city. The mayor calls the new program acculturation, and most people in the room heard assimilation." },
      { speaker: "Defne", text: "Why? The program itself is not bad." },
      { speaker: "Onur", text: "No. The integration course, albeit useful, is not a culture of welcome. People said that again and again." },
      { speaker: "Defne", text: "What did they mean by that?" },
      { speaker: "Onur", text: "A course ends after six months and you get a certificate. Being welcome does not end, and nobody hands you a paper for it." },
      { speaker: "Defne", text: "Fair. Did anyone defend the program?" },
      { speaker: "Onur", text: "A teacher did. Although tired of the debate, she spoke very calmly. Her students learn fast, she said, much as they complain about the homework." },
      { speaker: "Defne", text: "And the critics?" },
      { speaker: "Onur", text: "An older man asked why no course teaches the neighbors anything about the people moving in next door. Although a sign of hybridity, he said, adaptability is asked of one side only." },
      { speaker: "Defne", text: "That is actually a good idea. We could run evening sessions at the library." },
      { speaker: "Onur", text: "Put it in writing and send it to the mayor. Much as she dislikes long letters, she reads them all." },
    ],
    questions: [
      {
        text: "What did most people in the room hear?",
        options: ["assimilation", "acculturation", "a certificate"],
        answer: 0,
        explain: "„The mayor calls the new program acculturation, and most people in the room heard assimilation.“",
      },
      {
        text: "How long does the course last?",
        options: ["six months", "one year", "twenty minutes"],
        answer: 0,
        explain: "„A course ends after six months and you get a certificate.“",
      },
      {
        kind: "truefalse",
        text: "The teacher spoke calmly.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Although tired of the debate, she spoke very calmly.“",
      },
      {
        kind: "gapfill",
        text: "The integration course, ___ useful, is not a culture of welcome.",
        options: [],
        answer: 0,
        accept: ["albeit"],
        explain: "„The integration course, albeit useful, is not a culture of welcome.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Much as we like to call it acculturation, they mean assimilation.", "Much as we like to call it acculturation, they mean assimilation"],
        explain: "Bir satırda iki özne: „we“ ve „they“.",
      },
      {
        kind: "short_answer",
        text: "Where could the evening sessions take place?",
        options: [],
        answer: 0,
        accept: ["at the library", "the library", "in the library"],
        explain: "„We could run evening sessions at the library.“",
      },
    ],
  },
  {
    id: "en-c1-u11-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 11,
    title: "The tenants of Linden Park",
    genre: "monologue",
    intro: "Kiracılar derneği sözcüsünün bir halk toplantısındaki konuşması. Kiracılar ne talep ediyor?",
    gloss: [
      { de: "an estate", tr: "site" },
      { de: "a household", tr: "hane" },
      { de: "top", tr: "en üst" },
      { de: "a wheelchair", tr: "tekerlekli sandalye" },
      { de: "a renovation", tr: "tadilat" },
      { de: "concern", tr: "ilgilendirmek" },
      { de: "propose", tr: "önermek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Ela", text: "Good evening. My name is Ela Kaplan, and I speak for the tenants of the Linden Park estate: three hundred and twenty households." },
      { speaker: "Ela", text: "The principle of equality demands that human dignity be untouchable for all, not just for some. That includes the people who live on the top floors of Block C." },
      { speaker: "Ela", text: "Since March, the elevators in Block C have been out of order. Families with small children and a man in a wheelchair have been carrying their shopping up nine floors." },
      { speaker: "Ela", text: "The owner has now announced a renovation. We welcome it. But we ask that every participation model give tenants a vote, not just a seat at the back of the room." },
      { speaker: "Ela", text: "Our second demand concerns the rents. We insist that any increase after the renovation be limited to what the law allows, and that it be explained in writing." },
      { speaker: "Ela", text: "Our third demand is about the children. Were it not for the homework room in Block A, many of them would have nowhere quiet to study. We ask that it stay open during the works." },
      { speaker: "Ela", text: "Some call these small things. Were it not for small things like these, educational inequality would be a phrase in a report and not a fact on our stairs." },
      { speaker: "Ela", text: "We have collected four hundred signatures. We propose that the city and the owner meet us before the end of the month." },
      { speaker: "Ela", text: "Thank you. Our full list of demands is on the table by the door." },
    ],
    questions: [
      {
        text: "How many households does Ela speak for?",
        options: ["three hundred and twenty", "four hundred", "nine"],
        answer: 0,
        explain: "„I speak for the tenants of the Linden Park estate: three hundred and twenty households.“",
      },
      {
        text: "What is wrong in Block C?",
        options: ["The elevators are out of order.", "The heating is broken.", "The rent has doubled."],
        answer: 0,
        explain: "„Since March, the elevators in Block C have been out of order.“",
      },
      {
        kind: "truefalse",
        text: "The tenants are against the renovation.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The owner has now announced a renovation. We welcome it.“",
      },
      {
        kind: "gapfill",
        text: "We ask that every participation model ___ tenants a vote.",
        options: [],
        answer: 0,
        accept: ["give"],
        explain: "„But we ask that every participation model give tenants a vote, not just a seat at the back of the room.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The principle of equality demands that human dignity be untouchable for all, not just for some.", "The principle of equality demands that human dignity be untouchable for all, not just for some"],
        explain: "Talep eden bir ilke; „be“, „is“ değil.",
      },
      {
        kind: "short_answer",
        text: "Where is the full list of demands?",
        options: [],
        answer: 0,
        accept: ["by the door", "on the table by the door", "on the table"],
        explain: "„Our full list of demands is on the table by the door.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u11-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 11,
    title: "Culture and its labels",
    genre: "info",
    intro: "Kültür merkezi haberinden cümleler: önce cümleleri kur, sonra haber için bilgi kartını doldur.",
    gloss: [
      { de: "a cultural scene", tr: "kültür sahnesi" },
      { de: "a parallel society", tr: "paralel toplum" },
      { de: "dominant culture", tr: "başat kültür" },
      { de: "marginalization", tr: "ötekileştirme" },
      { de: "a demarcation line", tr: "ayrım hattı" },
      { de: "statelessness", tr: "vatansızlık" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Birinin kültür sahnesi dediğine bir başkası paralel toplum diyor.",
        answer: "What one calls a cultural scene, another calls a parallel society.",
        hint: "„One“ hiç kimse: yazarla iddia arasında duvar.",
      },
      {
        kind: "build",
        tr: "Sanat sayfasında alt kültür, bakanlıkta kültür politikası.",
        answer: "In the arts section it is a subculture; in the ministry, cultural policy.",
        hint: "İki oda konuşanların yerini tutuyor.",
      },
      {
        kind: "build",
        tr: "Yüksek kültür bir üsluptur, başat kültür bir iddiadır.",
        answer: "High culture is a register; dominant culture is a claim.",
        hint: "Biri betimleme, öteki yönerge.",
      },
      {
        kind: "build",
        tr: "Ötekileştirmenin yaptığı şey bir marjinal grup yaratmaktır.",
        answer: "What marginalization does is create a marginal group.",
        hint: "Soyut isim baştaki yuvada ve kendi fiili var.",
      },
      {
        kind: "build",
        tr: "Ayrım hattının arkasında yabancı düşmanlığı duruyor.",
        answer: "Behind the demarcation line stands xenophobia.",
        hint: "Baştaki yuvayı bir yer almış.",
      },
      {
        kind: "form",
        prompt: "Kültür merkezi haberi için bilgi kartını doldur.",
        facts: "Merkez 2009'da eski bir fırında açıldı; on bir yıldır Leyla Demir yönetiyor; ziyaretçilerin üçte ikisi halk kütüphanesini de kullanıyor; onarımın masrafını kimin ödeyeceği henüz belli değil.",
        fields: [
          { label: "Opened", answer: "in 2009", accept: ["2009"] },
          { label: "Building", answer: "a former bakery", accept: ["a bakery", "an old bakery"] },
          { label: "Run by", answer: "Leyla Demir", accept: ["Demir"] },
          { label: "Also use the public library", answer: "two thirds of visitors", accept: ["two thirds"] },
          { label: "Open question", answer: "who pays for the repair", accept: ["the repair", "who will pay"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u11-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 11,
    title: "Equal rights for all",
    genre: "info",
    intro: "Eşitlik ve uyum tartışmasından cümleler: tarafların taleplerini İngilizce yaz.",
    gloss: [
      { de: "human dignity", tr: "insan onuru" },
      { de: "educational inequality", tr: "eğitim eşitsizliği" },
      { de: "a participation model", tr: "katılım modeli" },
      { de: "acculturation", tr: "kültürleşme" },
      { de: "assimilation", tr: "asimilasyon" },
      { de: "hybridity", tr: "melezlik" },
      { de: "fade", tr: "solmak" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Eşitlik ilkesi insan onurunun yalnız bazıları için değil, herkes için dokunulmaz olmasını talep eder.",
        answer: "The principle of equality demands that human dignity be untouchable for all, not just for some.",
        hint: "Talep eden bir ilke; „be“ olduğu gibi kalıyor.",
      },
      {
        kind: "build",
        tr: "Eğitim eşitsizliği olmasa sınıflı toplum silinirdi.",
        answer: "Were it not for educational inequality, class society would fade.",
        hint: "Varsayım: savın dayanağı burada.",
      },
      {
        kind: "build",
        tr: "Her katılım modelinin kiracılara oy hakkı tanımasını istiyorlar.",
        answer: "They ask that every participation model give tenants a vote.",
        hint: "Tek eksik harf raporu talebe çeviriyor.",
      },
      {
        kind: "build",
        tr: "Ona ne kadar kültürleşme demeyi sevsek de onlar asimilasyonu kastediyor.",
        answer: "Much as we like to call it acculturation, they mean assimilation.",
        hint: "Bir satırda iki özne, aradaki boşlukta bütün tartışma.",
      },
      {
        kind: "build",
        tr: "Melezlik işareti olsa da uyum yeteneği yalnız tek taraftan isteniyor.",
        answer: "Although a sign of hybridity, adaptability is asked of one side only.",
        hint: "Her şey son üç sözcükte.",
      },
    ],
  },
];
