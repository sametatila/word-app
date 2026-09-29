import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 8 — "Denetlenmiş olsaydı, öyle görünüyor, manşet
 * okumak, kaynak göstermek".
 *
 * Dört ders: Had it been checked · It seems to have been ·
 * Reading a headline · Quoting a source.
 *
 *   Kelime: factor, variable, premise, inference, parameter, correlation,
 *           hypothesis, angle, calibrate, tighten, perspective, loosen,
 *           unlock, rotate, swing, motor, outlet, circulation, broadcast,
 *           readership, publication, feed, network, algorithm, reporter,
 *           quotation, attribution, publisher, paraphrase, intern,
 *           embargo, transparency.
 *   Kalıp:  If the factor had been known, we would have stopped. ·
 *           If the variable had been fixed, the result would be clear now. ·
 *           If the premise had been wrong, the inference would have failed. ·
 *           It seems to have been calibrated last month. ·
 *           Apparently the bolt was tightened twice. ·
 *           From one perspective it is arguably enough. ·
 *           It is claimed that the outlet was wrong. ·
 *           The figures are said to show a fall in circulation. ·
 *           The story is thought to have been broadcast twice. ·
 *           The reporter, who checked the quotation, was new. ·
 *           The attribution was unclear, which is why we waited. ·
 *           The publisher to whom we wrote replied late.
 *
 * Ünitenin tek öğretme noktası „IF“SİZ KOŞUL: devrik sıra burada
 * olumsuzluk ya da sınırlama değil, KOŞUL işaretliyor. „Had the factor
 * been known, …“ — „if“ düşüyor, „had“ öznenin önüne geçiyor, anlam
 * değişmiyor. Yalnız üç fiil bunu yapabiliyor: „had“, „were“, „should“;
 * ve olumsuzun kısa biçimi yok, orada tam „if“ cümlesine dönülüyor.
 */
export const enB2U08: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u08-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 8,
    title: "The greenhouse trial",
    genre: "report",
    intro: "Bir araştırma istasyonunun yarıda kesilen sera denemesi hakkındaki notu. Deneme neden durduruldu?",
    gloss: [
      { de: "a greenhouse", tr: "sera" },
      { de: "a fertilizer", tr: "gübre" },
      { de: "produce", tr: "üretmek" },
      { de: "die", tr: "ölmek" },
      { de: "a fungus", tr: "mantar" },
      { de: "soil", tr: "toprak" },
      { de: "on arrival", tr: "gelir gelmez" },
      { de: "a control group", tr: "kontrol grubu" },
      { de: "enter", tr: "girmek" },
      { de: "a heater", tr: "ısıtıcı" },
      { de: "inform", tr: "bilgilendirmek" },
      { de: "spring", tr: "ilkbahar" },
    ],
    minutes: 9,
    text:
      "GREENHOUSE TRIAL 7: FINAL NOTE\n" +
      "In April we stopped the trial of the new fertilizer after nine weeks instead of the planned sixteen. This note explains why, and what we will do differently.\n" +
      "The trial compared two groups of tomato plants. Our hypothesis was simple: plants with the new fertilizer would grow faster and produce more fruit. For six weeks the correlation looked strong.\n" +
      "Then the plants in greenhouse B started to die. The cause was a fungus that came in with a delivery of soil. Had this factor been known, we would have stopped the trial much earlier. Had the soil been tested on arrival, the fungus would have been found in the first week.\n" +
      "The second problem was the temperature. One heater was broken for ten days, so a variable that we had planned to keep fixed was not fixed at all. Had the variable been fixed, the results would be clear now.\n" +
      "We have also looked again at our premise. Were the premise wrong, the whole inference would fail. We do not think it is wrong: the plants in greenhouse A, which had no fungus and no broken heater, grew 15 percent faster than the control group.\n" +
      "For the next trial we will change three things. All soil will be tested before it enters a greenhouse. The heaters will be checked every morning. And should any parameter change during the trial, the team will record it on the same day and inform the head of research.\n" +
      "Had we done all this last spring, this note would be much shorter.\n" +
      "Dr. Mina Aksoy, Head of Research",
    questions: [
      {
        text: "Why did the plants in greenhouse B start to die?",
        options: ["a fungus in the soil", "a broken heater", "the new fertilizer"],
        answer: 0,
        explain: "„The cause was a fungus that came in with a delivery of soil.“",
      },
      {
        text: "How much faster did the plants in greenhouse A grow?",
        options: ["15 percent", "6 percent", "16 percent"],
        answer: 0,
        explain: "„grew 15 percent faster than the control group.“",
      },
      {
        kind: "truefalse",
        text: "The trial was stopped earlier than planned.",
        options: ["True", "False"],
        answer: 0,
        explain: "„In April we stopped the trial of the new fertilizer after nine weeks instead of the planned sixteen.“",
      },
      {
        kind: "gapfill",
        text: "___ the soil been tested on arrival, the fungus would have been found in the first week.",
        options: [],
        answer: 0,
        accept: ["Had", "had"],
        explain: "„Had the soil been tested on arrival, the fungus would have been found in the first week.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The trial was stopped after nine weeks.",
          "The plants in greenhouse B started to die.",
          "One heater was broken for ten days.",
          "All soil will be tested before it enters a greenhouse.",
        ],
        explain: "Karar, iki sorun, en sonda bir sonraki deneme için değişiklikler.",
      },
      {
        kind: "short_answer",
        text: "How often will the heaters be checked?",
        options: [],
        answer: 0,
        accept: ["every morning", "each morning", "daily"],
        explain: "„The heaters will be checked every morning.“",
      },
    ],
  },
  {
    id: "en-b2-u08-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 8,
    title: "Trouble at City FM",
    genre: "article",
    intro: "Yerel bir radyo istasyonu hakkında haber. Hangi bilgi iddia, hangisi kesin?",
    gloss: [
      { de: "independent", tr: "bağımsız" },
      { de: "a region", tr: "bölge" },
      { de: "a businessman", tr: "iş insanı" },
      { de: "a listener", tr: "dinleyici" },
      { de: "senior", tr: "kıdemli" },
      { de: "a presenter", tr: "sunucu" },
      { de: "an owner", tr: "sahip" },
      { de: "a professor", tr: "profesör" },
      { de: "airtime", tr: "yayın süresi" },
      { de: "an advertiser", tr: "reklam veren" },
    ],
    minutes: 9,
    text:
      "LOCAL RADIO STATION UNDER PRESSURE\n" +
      "City FM, the oldest independent radio station in the region, is facing its most difficult month in thirty years.\n" +
      "It is claimed that the station broadcast an interview with a local businessman without telling listeners that he had paid for the time. The station denies this. The recording is thought to have been broadcast twice, on the Monday and Wednesday morning shows, and it is said to have reached around 40,000 listeners.\n" +
      "The station is also losing money. Its sister newspaper, the Evening Post, is said to be losing readers fast: the latest figures are reported to show a fall in circulation of 12 percent in one year. Advertisers are thought to be moving to online outlets, where an algorithm decides what people see in their news feed.\n" +
      "Staff at the station are said to be worried about their jobs. Two senior presenters are believed to have left last month, although neither has spoken publicly.\n" +
      "The owner, Carla Rossi, is expected to answer questions at a public meeting on Thursday. In a short statement, she said that the station had always been open with its listeners and that an independent review of the interview had already started.\n" +
      "Media experts are less sure. Professor Hakan Ural of the city university said that a small network like this depends completely on trust. If listeners believe that airtime can be bought, he added, the damage will be much bigger than any fall in readership.\n" +
      "The review is expected to be published by the end of May.",
    questions: [
      {
        text: "How many times is the recording thought to have been broadcast?",
        options: ["twice", "once", "three times"],
        answer: 0,
        explain: "„The recording is thought to have been broadcast twice, on the Monday and Wednesday morning shows…“",
      },
      {
        text: "What do the latest figures show?",
        options: ["a fall in circulation", "more listeners", "new advertisers"],
        answer: 0,
        explain: "„the latest figures are reported to show a fall in circulation of 12 percent in one year.“",
      },
      {
        kind: "truefalse",
        text: "The two senior presenters have spoken publicly about leaving.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Two senior presenters are believed to have left last month, although neither has spoken publicly.“",
      },
      {
        kind: "gapfill",
        text: "Advertisers are thought to be moving to online ___.",
        options: [],
        answer: 0,
        accept: ["outlets"],
        explain: "„Advertisers are thought to be moving to online outlets…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The station is said to have hidden a paid interview.",
          "The Evening Post is losing readers.",
          "Two presenters are believed to have left.",
          "The owner will answer questions on Thursday.",
        ],
        explain: "İddia, para sorunu, çalışanlar, en sonda istasyon sahibinin yanıtı.",
      },
      {
        kind: "short_answer",
        text: "When is the review expected to be published?",
        options: [],
        answer: 0,
        accept: ["by the end of May", "the end of May", "end of May", "May"],
        explain: "„The review is expected to be published by the end of May.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u08-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 8,
    title: "Inspecting a wind turbine",
    genre: "dialogue",
    intro: "İki mühendis bir rüzgâr türbinini denetliyor. Türbin yeniden çalıştırılabilir mi?",
    gloss: [
      { de: "a turbine", tr: "türbin" },
      { de: "a log", tr: "kayıt defteri" },
      { de: "a photocopy", tr: "fotokopi" },
      { de: "a blade", tr: "kanat" },
      { de: "loose", tr: "gevşek" },
      { de: "unusual", tr: "alışılmadık" },
      { de: "the top", tr: "tepe" },
      { de: "calibration", tr: "ayar" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Efe", text: "So, what do you think? Is turbine six safe to start again?" },
      { speaker: "Nehir", text: "I think so. The speed sensor seems to have been replaced recently. The part is new and the label is from this year." },
      { speaker: "Efe", text: "And the motor?" },
      { speaker: "Nehir", text: "It seems to have been calibrated last month. There is a note in the log, but it is only a photocopy, so I am not completely sure." },
      { speaker: "Efe", text: "What about the noise the farmer reported?" },
      { speaker: "Nehir", text: "Apparently the bolts on one blade were loose. They seem to have been tightened twice since then, once in May and once last week." },
      { speaker: "Efe", text: "Twice? That is unusual." },
      { speaker: "Nehir", text: "It is. It suggests something is still moving. From one perspective the repair is good enough, but I would like to watch it rotate before we sign." },
      { speaker: "Efe", text: "How long do you need?" },
      { speaker: "Nehir", text: "About an hour. Can you unlock the door at the top? I want to see the bolts myself." },
      { speaker: "Efe", text: "Sure. Apparently the key was left in the office, but I have a spare one." },
      { speaker: "Nehir", text: "Perfect. If the blade swings the way it should, we can restart it this afternoon." },
    ],
    questions: [
      {
        text: "What seems to have been replaced recently?",
        options: ["the speed sensor", "the motor", "the blade"],
        answer: 0,
        explain: "„The speed sensor seems to have been replaced recently.“",
      },
      {
        text: "What does Nehir want to do before they sign?",
        options: ["watch it rotate", "call the farmer", "replace the bolts"],
        answer: 0,
        explain: "„I would like to watch it rotate before we sign.“",
      },
      {
        kind: "truefalse",
        text: "Nehir is not completely sure about the calibration.",
        options: ["True", "False"],
        answer: 0,
        explain: "„There is a note in the log, but it is only a photocopy, so I am not completely sure.“",
      },
      {
        kind: "gapfill",
        text: "They seem to have been tightened ___ since then.",
        options: [],
        answer: 0,
        accept: ["twice", "two times"],
        explain: "„They seem to have been tightened twice since then, once in May and once last week.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It seems to have been calibrated last month.", "It seems to have been calibrated last month"],
        explain: "Mastarın kendi zamanı var: iş görünmeden önce olmuş.",
      },
      {
        kind: "short_answer",
        text: "When can they restart the turbine?",
        options: [],
        answer: 0,
        accept: ["this afternoon", "in the afternoon", "today"],
        explain: "„we can restart it this afternoon.“",
      },
    ],
  },
  {
    id: "en-b2-u08-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 8,
    title: "Correcting a quotation",
    genre: "monologue",
    intro: "Bir editör, yanlış kişiye verilen alıntıyı ekibine anlatıyor. Bundan sonra ne değişecek?",
    gloss: [
      { de: "incorrectly", tr: "yanlış" },
      { de: "to trace", tr: "izini sürmek" },
      { de: "to appear", tr: "yer almak" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Beren", text: "Good morning, everyone. Before we start, I want to talk about the hospital story, because we made a mistake and you should hear it from me." },
      { speaker: "Beren", text: "We printed a quotation and gave it to the wrong person. The words were said by a nurse, not by the hospital director, which is why the director called me at seven this morning." },
      { speaker: "Beren", text: "The reporter, who checked the quotation, was new. She did what she was told: she compared it with the recording that an intern had sent her." },
      { speaker: "Beren", text: "The problem is that the intern who sent it had named the files incorrectly. We have four interns, and I am not going to say which one, because it could have been any of us." },
      { speaker: "Beren", text: "The attribution was unclear, which is why we should have waited. A quotation that cannot be traced to a named recording does not go on the front page." },
      { speaker: "Beren", text: "The publisher, to whom I wrote last night, agrees that we print a correction tomorrow, on page two, with a headline of the same size." },
      { speaker: "Beren", text: "From today, every quotation that goes into a story needs a second person to listen to the recording. Yes, it takes time. Transparency always does." },
      { speaker: "Beren", text: "Right. Let us move on to the budget story, which, I am told, has no quotations at all." },
    ],
    questions: [
      {
        text: "Who really said the words?",
        options: ["a nurse", "the hospital director", "the intern"],
        answer: 0,
        explain: "„The words were said by a nurse, not by the hospital director…“",
      },
      {
        text: "Where will the correction appear?",
        options: ["on page two", "on the front page", "only online"],
        answer: 0,
        explain: "„we print a correction tomorrow, on page two, with a headline of the same size.“",
      },
      {
        kind: "truefalse",
        text: "Beren names the intern who made the mistake.",
        options: ["True", "False"],
        answer: 1,
        explain: "„We have four interns, and I am not going to say which one, because it could have been any of us.“",
      },
      {
        kind: "gapfill",
        text: "The publisher, to ___ I wrote last night, agrees that we print a correction tomorrow.",
        options: [],
        answer: 0,
        accept: ["whom"],
        explain: "„The publisher, to whom I wrote last night, agrees that we print a correction tomorrow…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The reporter, who checked the quotation, was new.", "The reporter, who checked the quotation, was new"],
        explain: "Virgüller cümleciği fazladan yapıyor; tek bir muhabir var.",
      },
      {
        kind: "short_answer",
        text: "What does every quotation need from today?",
        options: [],
        answer: 0,
        accept: ["a second person", "a second listener", "another person"],
        explain: "„every quotation that goes into a story needs a second person to listen to the recording.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u08-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 8,
    title: "A study, looking back",
    genre: "info",
    intro: "Yarıda kalan denemeye geriye dönük bak: ne bilinseydi ne olurdu?",
    gloss: [
      { de: "had the factor been known", tr: "etken bilinseydi" },
      { de: "had the variable been fixed", tr: "değişken sabitlenseydi" },
      { de: "would have failed", tr: "çökerdi" },
      { de: "to have been calibrated", tr: "ayarlanmış" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Etken bilinseydi dururduk.",
        answer: "Had the factor been known, we would have stopped.",
        hint: "„if“ düşüyor, „had“ öznenin önüne geçiyor.",
      },
      {
        kind: "build",
        tr: "Değişken sabitlenseydi sonuç şimdi açık olurdu.",
        answer: "Had the variable been fixed, the result would be clear now.",
        hint: "Karışık koşul, üstelik „if“siz.",
      },
      {
        kind: "build",
        tr: "Öncül yanlış olsaydı çıkarım çökerdi.",
        answer: "If the premise had been wrong, the inference would have failed.",
        hint: "„if“li tam biçim: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Geçen ay ayarlanmış görünüyor.",
        answer: "It seems to have been calibrated last month.",
        hint: "Mastarın kendi zamanı var: „to have been“.",
      },
      {
        kind: "form",
        prompt: "Deneme için geriye dönük değerlendirme kartını doldur.",
        facts: "Etken bilinseydi deneme durdurulurdu; değişken sabitlenseydi sonuç şimdi açık olurdu; öncülün yanlış olduğunu düşünmüyoruz; cihaz geçen ay ayarlanmış görünüyor.",
        fields: [
          { label: "Had the factor been known", answer: "we would have stopped", accept: ["stopped", "we would have stopped earlier"] },
          { label: "Had the variable been fixed", answer: "the result would be clear now", accept: ["clear now", "the result would be clear"] },
          { label: "The premise", answer: "not wrong", accept: ["right", "correct"] },
          { label: "Last calibration", answer: "last month", accept: ["a month ago", "seems to have been last month"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u08-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 8,
    title: "Headlines with no source",
    genre: "info",
    intro: "Kaynağını söylemeyen manşetler yaz: ne iddia ediliyor, ne söyleniyor?",
    gloss: [
      { de: "apparently", tr: "görünüşe göre" },
      { de: "it is claimed that", tr: "ileri sürülüyor ki" },
      { de: "are said to show", tr: "gösterdiği söyleniyor" },
      { de: "to have been broadcast", tr: "yayımlandığı" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Cıvatanın iki kez sıkıldığı anlaşılıyor.",
        answer: "Apparently the bolt was tightened twice.",
        hint: "Bildiriyor ve aynı anda geri çekiliyor.",
      },
      {
        kind: "build",
        tr: "Yayın organının yanıldığı ileri sürülüyor.",
        answer: "It is claimed that the outlet was wrong.",
        hint: "Uzun yol: „it“ özne, rapor „that“ cümleciğinde.",
      },
      {
        kind: "build",
        tr: "Rakamların tirajda bir düşüş gösterdiği söyleniyor.",
        answer: "The figures are said to show a fall in circulation.",
        hint: "Kısa yol: özne öne çıkıyor, mastar geriye kalıyor.",
      },
      {
        kind: "build",
        tr: "Haberin iki kez yayımlandığı düşünülüyor.",
        answer: "The story is thought to have been broadcast twice.",
        hint: "Mastar geçmişe bakıyor: iş düşünmeden önce olmuş.",
      },
      {
        kind: "build",
        tr: "Alıntıyı denetleyen muhabir yeniydi.",
        answer: "The reporter, who checked the quotation, was new.",
        hint: "Virgüller cümleciği fazladan yapıyor.",
      },
    ],
  },
];
