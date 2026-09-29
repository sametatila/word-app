import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 12 — "Mayısta güncellenen yazılım, çalışmanın
 * gösterdiği, hiç böyle bir örüntü çıkmadı, başarısız olmuş olmalı".
 *
 * Dört ders: The software, which was updated · What the study shows ·
 * Never has a pattern emerged · It must have failed.
 *
 *   Kelime: software, interface, encryption, malware, surveillance,
 *           radiation, frequency, wavelength, determine, statistical,
 *           imply, specify, interpret, theoretical, numerous, credible,
 *           emerge, arise, extreme, occur, vanish, fluctuate, scarce,
 *           dense, neglect, misjudge, observe, exaggerate, downplay,
 *           contradict, perceive, reflect.
 *   Kalıp:  The software, which was updated in May, failed. ·
 *           The interface is old, which is why we stopped. ·
 *           The method to which we refer uses encryption. ·
 *           What the study determines is the limit. ·
 *           It was the statistical test that failed. ·
 *           What we imply is not what we say. ·
 *           Never has such a pattern emerged. ·
 *           Rarely does a question arise so early. ·
 *           Only under extreme heat does it occur. ·
 *           The team must have neglected one step. ·
 *           They can't have misjudged the scale. ·
 *           We should have observed it twice.
 *
 * Ünitenin tek öğretme noktası ŞİMDİKİ ZAMANDA DEVRİK SIRA „DOES“
 * İSTİYOR. Devrilecek bir yardımcı fiil yoksa „do/does“ yalnızca
 * taşınacak şey olmak için geliyor, ve ana fiil çekimini kaybediyor:
 * „Rarely does a question arise“, „arises“ değil. İki yaygın yanlış:
 * ana fiili doğrudan devirmek („rarely arises a question“) ve „does“
 * koyup „-s“yi de bırakmak.
 */
export const enB2U12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u12-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 12,
    title: "A battery that fails in heat",
    genre: "article",
    intro: "Bir üniversitenin haber bülteni: sıcakta bozulan bir batarya. Arıza ne zaman ortaya çıkıyor?",
    gloss: [
      { de: "a battery", tr: "batarya" },
      { de: "engineering", tr: "mühendislik" },
      { de: "a lab", tr: "laboratuvar" },
      { de: "power", tr: "güç" },
      { de: "appear", tr: "görünmek" },
      { de: "a researcher", tr: "araştırmacı" },
      { de: "expand", tr: "genleşmek" },
      { de: "rise", tr: "yükselmek" },
      { de: "science", tr: "bilim" },
    ],
    minutes: 9,
    text:
      "UNIVERSITY NEWS: A BATTERY THAT FAILS ONLY IN HEAT\n" +
      "For two years, a team at the engineering faculty has tested a new battery for electric buses. The results, published this week, surprised even the people who ran the tests.\n" +
      "„Never has such a pattern emerged in our lab,“ says Dr. Leyla Aksoy, who led the study. The batteries worked perfectly in cold and normal weather. Only under extreme heat does the fault occur: above 45 degrees, the power falls suddenly and then comes back after a few minutes.\n" +
      "Rarely does a problem appear so clearly in the data. The team observed the same drop in numerous tests, at different charging speeds, and always at the same temperature. Not once did it happen below 40 degrees.\n" +
      "What causes it has not been determined yet. The researchers think the material expands in the heat, but they do not want to exaggerate what they know. „Only after a year of further tests will we be able to say why,“ Aksoy explains.\n" +
      "The bus company that paid for the study is not worried. Its buses run in a city where temperatures rarely rise above 35 degrees. But the team has shared its data with two other universities, because such a clear fault is scarce, and rarely does a question arise so early in a project.\n" +
      "„In science, you usually wait years for a result like this,“ says Aksoy. „Never have I been happier to see something fail.“",
    questions: [
      {
        text: "When does the fault occur?",
        options: ["only under extreme heat", "only in cold weather", "only at night"],
        answer: 0,
        explain: "„Only under extreme heat does the fault occur: above 45 degrees, the power falls suddenly and then comes back after a few minutes.“",
      },
      {
        text: "Why is the bus company not worried?",
        options: ["Its city is rarely hotter than 35 degrees.", "The fault has been fixed.", "It has bought other batteries."],
        answer: 0,
        explain: "„Its buses run in a city where temperatures rarely rise above 35 degrees.“",
      },
      {
        kind: "truefalse",
        text: "The fault never happened below 40 degrees.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Not once did it happen below 40 degrees.“",
      },
      {
        kind: "gapfill",
        text: "Never has such a pattern ___ in our lab.",
        options: [],
        answer: 0,
        accept: ["emerged"],
        explain: "„Never has such a pattern emerged in our lab.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The team tested a new battery for two years.",
          "The power falls above 45 degrees.",
          "The cause has not been determined yet.",
          "The data is shared with two other universities.",
        ],
        explain: "Deney, arıza, henüz bilinmeyen neden, en sonda paylaşılan veri.",
      },
      {
        kind: "short_answer",
        text: "How long will the further tests take?",
        options: [],
        answer: 0,
        accept: ["a year", "one year", "about a year"],
        explain: "„Only after a year of further tests will we be able to say why.“",
      },
    ],
  },
  {
    id: "en-b2-u12-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 12,
    title: "Screens, sleep and headlines",
    genre: "blog",
    intro: "Bir araştırmacı, çalışmasının basında nasıl yanlış aktarıldığını anlatıyor. Çalışma aslında neyi gösteriyor?",
    gloss: [
      { de: "a headline", tr: "manşet" },
      { de: "a teenager", tr: "genç" },
      { de: "appear", tr: "çıkmak" },
      { de: "a journal", tr: "dergi" },
      { de: "on average", tr: "ortalama olarak" },
      { de: "simply", tr: "basitçe" },
      { de: "anyway", tr: "zaten" },
      { de: "a generation", tr: "kuşak" },
      { de: "real", tr: "gerçek" },
      { de: "affect", tr: "etkilemek" },
      { de: "an appendix", tr: "ek" },
      { de: "a researcher", tr: "araştırmacı" },
    ],
    minutes: 9,
    text:
      "Last month our study on teenagers, screens and sleep appeared in a journal, and within a day it was in every newspaper. Most of the articles got it wrong, so I want to say clearly what we found.\n" +
      "What the study determines is a limit. Teenagers who used a phone for more than two hours after nine in the evening slept, on average, forty minutes less. What it does not determine is the cause. It could be the light from the screen, the messages, or simply the fact that tired teenagers stay up anyway.\n" +
      "One headline said that phones destroy the sleep of a whole generation. What we imply in the paper is not what the newspapers say. We never wrote that phones are dangerous. What we wrote is that the link is real and small.\n" +
      "It was the statistical test in our second chapter that caused the confusion. A journalist read the number for the whole group and interpreted it as a number for every child. It was that headline, not our data, that traveled around the internet.\n" +
      "What parents should take from this is simple: numerous things affect sleep, and a phone is one of them. What they should not take from it is fear.\n" +
      "We have specified our methods in a free online appendix. It is long, but it is credible, and it is where the real story is.",
    questions: [
      {
        text: "How much less did the teenagers who used a phone late sleep?",
        options: ["forty minutes", "two hours", "one night a week"],
        answer: 0,
        explain: "„Teenagers who used a phone for more than two hours after nine in the evening slept, on average, forty minutes less.“",
      },
      {
        text: "What caused the confusion?",
        options: ["a statistical test in the second chapter", "a mistake in the data", "a wrong number in the journal"],
        answer: 0,
        explain: "„It was the statistical test in our second chapter that caused the confusion.“",
      },
      {
        kind: "truefalse",
        text: "The researchers wrote that phones are dangerous.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We never wrote that phones are dangerous.“",
      },
      {
        kind: "gapfill",
        text: "What the study determines is a ___.",
        options: [],
        answer: 0,
        accept: ["limit"],
        explain: "„What the study determines is a limit.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The study appeared in a journal.",
          "Most articles got it wrong.",
          "A journalist misread a number.",
          "The methods are in an online appendix.",
        ],
        explain: "Yayın, yanlış haberler, hatanın kaynağı, en sonda yöntemin yeri.",
      },
      {
        kind: "short_answer",
        text: "Where are the methods specified?",
        options: [],
        answer: 0,
        accept: ["in an online appendix", "online appendix", "in the appendix"],
        explain: "„We have specified our methods in a free online appendix.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u12-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 12,
    title: "A crash after the update",
    genre: "phone",
    intro: "Muhasebeden bir çalışan BT destek hattını arıyor. Program neden çöktü?",
    gloss: [
      { de: "a crash", tr: "çökme" },
      { de: "an invoice", tr: "fatura" },
      { de: "search", tr: "arama" },
      { de: "a function", tr: "işlev" },
      { de: "install", tr: "kurmak" },
      { de: "unlikely", tr: "olası değil" },
      { de: "a bug", tr: "yazılım hatası" },
      { de: "secure", tr: "güvenli" },
      { de: "encrypted", tr: "şifreli" },
      { de: "anyway", tr: "zaten" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Emir", text: "IT support, Emir speaking." },
      { speaker: "Ayça", text: "Hi Emir, it is Ayça from accounting. The software, which was updated in May, failed again this morning." },
      { speaker: "Emir", text: "The invoice program? Which version do you see on the start screen?" },
      { speaker: "Ayça", text: "Version four. The interface is very old, which is why we stopped using the search function last year." },
      { speaker: "Emir", text: "I see. Did the crash happen when you opened a file?" },
      { speaker: "Ayça", text: "When I saved one. I was using the method to which the manual refers, the one with encryption for customer data." },
      { speaker: "Emir", text: "That explains a lot. The encryption tool, which we installed in March, does not work well with version four." },
      { speaker: "Ayça", text: "So what should I do? My manager, who needs the report today, is already asking." },
      { speaker: "Emir", text: "I will connect to your computer remotely. Can you close every window except the program?" },
      { speaker: "Ayça", text: "Done. Should I worry about malware? A colleague, whose laptop was attacked last year, told me that crashes can be a sign." },
      { speaker: "Emir", text: "It is unlikely. The scan, which runs every night, found nothing on your machine. This is a known bug." },
      { speaker: "Ayça", text: "Good. And the report?" },
      { speaker: "Emir", text: "Save it without encryption for now, then send it through the secure folder, which is encrypted anyway." },
    ],
    questions: [
      {
        text: "When was the software updated?",
        options: ["in May", "in March", "last year"],
        answer: 0,
        explain: "„The software, which was updated in May, failed again this morning.“",
      },
      {
        text: "Why did they stop using the search function?",
        options: ["The interface is very old.", "It was attacked by malware.", "The manager asked them to."],
        answer: 0,
        explain: "„The interface is very old, which is why we stopped using the search function last year.“",
      },
      {
        kind: "truefalse",
        text: "The nightly scan found nothing on the machine.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The scan, which runs every night, found nothing on your machine.“",
      },
      {
        kind: "gapfill",
        text: "I was using the method to which the manual refers, the one with ___ for customer data.",
        options: [],
        answer: 0,
        accept: ["encryption"],
        explain: "„I was using the method to which the manual refers, the one with encryption for customer data.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "The software, which was updated in May, failed again this morning.",
          "The software, which was updated in May, failed again this morning",
        ],
        explain: "Virgüller cümleciği fazladan yapıyor; tek bir yazılım var.",
      },
      {
        kind: "short_answer",
        text: "How should Ayça send the report?",
        options: [],
        answer: 0,
        accept: ["through the secure folder", "the secure folder", "secure folder"],
        explain: "„then send it through the secure folder, which is encrypted anyway.“",
      },
    ],
  },
  {
    id: "en-b2-u12-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 12,
    title: "Why the sensor tests failed",
    genre: "monologue",
    intro: "Laboratuvar sorumlusu, başarısız ölçümleri ekibine anlatıyor. Sorun ne olmuş olmalı?",
    gloss: [
      { de: "a sensor", tr: "algılayıcı" },
      { de: "a log", tr: "kayıt defteri" },
      { de: "skip", tr: "atlamak" },
      { de: "calibration", tr: "kalibrasyon" },
      { de: "a protocol", tr: "protokol" },
      { de: "a lab", tr: "laboratuvar" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Tuğçe", text: "Good morning, everyone. I want to talk about the sensor tests from last week before we start the new series." },
      { speaker: "Tuğçe", text: "We ran the test three times, and three times the readings vanished after about ten minutes. The team must have neglected one step, because only one step is missing from the log." },
      { speaker: "Tuğçe", text: "Somebody must have skipped the calibration. It is the only thing that is not written down, and without it the frequency readings always fluctuate." },
      { speaker: "Tuğçe", text: "They can't have misjudged the scale. We fixed the scale in the protocol before the first test, and everybody signed it." },
      { speaker: "Tuğçe", text: "And it can't have been the equipment. The same sensors worked perfectly in the other lab on Thursday." },
      { speaker: "Tuğçe", text: "So this is not about blaming anyone. It is about us. We should have observed each run twice, with two people, as we did last year." },
      { speaker: "Tuğçe", text: "We should have checked the log before the second run, too. Then we would have lost one day, not a whole week." },
      { speaker: "Tuğçe", text: "From today, every run needs a second name on the log. It takes five minutes, and it would have saved us four days." },
    ],
    questions: [
      {
        text: "How many times did they run the test?",
        options: ["three times", "twice", "once"],
        answer: 0,
        explain: "„We ran the test three times, and three times the readings vanished after about ten minutes.“",
      },
      {
        text: "Why can the equipment not be the problem?",
        options: ["The sensors worked in the other lab.", "The equipment is new.", "Nobody used the equipment."],
        answer: 0,
        explain: "„The same sensors worked perfectly in the other lab on Thursday.“",
      },
      {
        kind: "truefalse",
        text: "The lab manager wants to find the person who made the mistake.",
        options: ["True", "False"],
        answer: 1,
        explain: "„So this is not about blaming anyone.“",
      },
      {
        kind: "gapfill",
        text: "The team must have ___ one step.",
        options: [],
        answer: 0,
        accept: ["neglected"],
        explain: "„The team must have neglected one step, because only one step is missing from the log.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["They can't have misjudged the scale.", "They can't have misjudged the scale"],
        explain: "Kanıt kapıyı kapatıyor: olumsuzu „can't have“.",
      },
      {
        kind: "short_answer",
        text: "What does every run need from today?",
        options: [],
        answer: 0,
        accept: ["a second name", "a second name on the log", "two names"],
        explain: "„From today, every run needs a second name on the log.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u12-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 12,
    title: "Unusual results",
    genre: "info",
    intro: "Batarya araştırmasının sonuçları için kısa notlar yaz: şaşırtıcı bulguyu öne çıkar.",
    gloss: [
      { de: "never has", tr: "hiç olmadı" },
      { de: "rarely does", tr: "nadiren" },
      { de: "only under extreme heat", tr: "yalnızca aşırı sıcakta" },
      { de: "neglected", tr: "ihmal etmiş" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Böyle bir örüntü daha önce hiç ortaya çıkmadı.",
        answer: "Never has such a pattern emerged.",
        hint: "„has“ özneyi atlıyor; fiilin gerisi yerinde.",
      },
      {
        kind: "build",
        tr: "Bir soru bu kadar erken nadiren doğar.",
        answer: "Rarely does a question arise so early.",
        hint: "Şimdiki zamanda „does“ giriyor; ana fiil çekimini kaybediyor.",
      },
      {
        kind: "build",
        tr: "Yalnızca aşırı sıcakta meydana gelir.",
        answer: "Only under extreme heat does it occur.",
        hint: "„only“ sınırlama; yine „does“ taşıyor.",
      },
      {
        kind: "build",
        tr: "Ekip bir adımı ihmal etmiş olmalı.",
        answer: "The team must have neglected one step.",
        hint: "Çıkarım: kanıt tek bir açıklama bırakıyor.",
      },
      {
        kind: "form",
        prompt: "Batarya araştırması için özet kartını doldur.",
        facts: "Laboratuvarda böyle bir örüntü daha önce hiç görülmedi; arıza yalnızca 45 derecenin üstündeki aşırı sıcakta ortaya çıkıyor; 40 derecenin altında bir kez bile olmadı; nedeni henüz belirlenmedi.",
        fields: [
          { label: "The pattern", answer: "never seen before", accept: ["never before", "new"] },
          { label: "When the fault occurs", answer: "only under extreme heat", accept: ["above 45 degrees", "in extreme heat"] },
          { label: "Below 40 degrees", answer: "not once", accept: ["never"] },
          { label: "Cause", answer: "not determined yet", accept: ["not determined", "not known yet"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u12-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 12,
    title: "The discussion section",
    genre: "opinion",
    intro: "Bir araştırma raporunun tartışma bölümü için cümleler kur: çalışmanın gerçekte neyi gösterdiğini açıkça söyle.",
    gloss: [
      { de: "what the study determines", tr: "çalışmanın belirlediği" },
      { de: "it was the statistical test", tr: "istatistiksel sınamaydı" },
      { de: "what we imply", tr: "ima ettiğimiz" },
      { de: "misjudged", tr: "yanlış değerlendirmiş" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Çalışmanın belirlediği şey sınır.",
        answer: "What the study determines is the limit.",
        hint: "Yarık cümle: önce boşluk, sonra tek bir şey.",
      },
      {
        kind: "build",
        tr: "Başarısız olan istatistiksel sınamaydı.",
        answer: "It was the statistical test that failed.",
        hint: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "build",
        tr: "İma ettiğimiz şey söylediğimiz şey değil.",
        answer: "What we imply is not what we say.",
        hint: "İki „what“ cümleciği karşı karşıya konuyor.",
      },
      {
        kind: "build",
        tr: "Mayısta güncellenen yazılım çöktü.",
        answer: "The software, which was updated in May, failed.",
        hint: "Virgüller cümleciği fazladan yapıyor.",
      },
      {
        kind: "build",
        tr: "Ölçeği yanlış değerlendirmiş olamazlar.",
        answer: "They can't have misjudged the scale.",
        hint: "Olumsuzu „can't have“; „mustn't have“ yok.",
      },
    ],
  },
];
