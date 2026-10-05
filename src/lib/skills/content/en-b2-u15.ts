import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 15 — "On yılın sonuna kadar, tutmayan kanun, fabrika
 * kalsaydı, bir grup hakkında konuşmak".
 *
 * Dört ders: By the end of the decade · The law that failed ·
 * If the plant had stayed · Speaking about a group.
 *
 *   Kelime: upturn, investment, market share, supply chain, stock market,
 *           workforce, job market, bill, regulation, enforcement,
 *           supervision, administration, authorize, prerequisite,
 *           bankruptcy, severance pay, dismissal, termination, employment,
 *           generalization, plausible, questionable, contradictory,
 *           undeniable, nonetheless, by no means, in a sense.
 *   Kalıp:  By spring the upturn will have started. ·
 *           Next year we will be watching the investment. ·
 *           By then the market share will have doubled. ·
 *           The bill must have been unclear. ·
 *           They can't have read the regulation. ·
 *           We should have funded enforcement. ·
 *           If the firm had avoided bankruptcy, we would have stayed. ·
 *           If the severance pay had been fair, the town would be calm now. ·
 *           If the dismissal had been legal, the case would have ended. ·
 *           It seems to be a generalization. ·
 *           Apparently the claim is plausible. ·
 *           On balance the figure is arguably questionable.
 *
 * Ünitenin tek öğretme noktası „BY NO MEANS“ OLUMSUZLUĞU KENDİ İÇİNDE
 * TAŞIYOR. „The claim is by no means settled“ cümlesinde hiçbir yerde
 * „not“ yok, ve öbeğin gücünü hisseden yazar bir „not“ ekleyince cümle
 * tersine dönüyor. A2'deki „unless“in aynısı, bir üst düzeyde. Yanında
 * çekince ölçeği duruyor: „by no means“ en sert, „in a sense“ en yumuşak,
 * „undeniable“ ise okuru konuşmanın dışına iten uç.
 */
export const enB2U15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u15-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 15,
    title: "A teacher defends her students",
    genre: "letter",
    intro: "Bir öğretmenin gazeteye mektubu: gençler gerçekten çalışmak istemiyor mu?",
    gloss: [
      { de: "lazy", tr: "tembel" },
      { de: "vocational", tr: "meslekî" },
      { de: "a college", tr: "okul" },
      { de: "based on", tr: "dayanan" },
      { de: "slightly", tr: "biraz" },
      { de: "a region", tr: "bölge" },
      { de: "a closure", tr: "kapanma" },
      { de: "a factory", tr: "fabrika" },
      { de: "sudden", tr: "ani" },
      { de: "an attitude", tr: "tutum" },
      { de: "deserve", tr: "hak etmek" },
    ],
    minutes: 9,
    text:
      "LETTERS: ARE YOUNG PEOPLE REALLY LAZY?\n" +
      "Your article last Monday claimed that young people no longer want to work. As a teacher at a vocational college, I would like to reply.\n" +
      "It seems to be a generalization based on one survey. Apparently the survey asked 500 employers, but not a single young person. On balance, the figure you quoted is arguably questionable: it tells us what managers believe, not what young people do.\n" +
      "The claim is by no means settled. In my college, eighty percent of the students who finished last year found a job within six months. Many of them work evenings and weekends while they study. That is by no means a picture of a lazy generation.\n" +
      "In a sense, your article is right about one thing: young people are less willing to accept low pay and long hours without complaint. Nonetheless, that is not the same as not wanting to work. It is a different idea of what fair work is.\n" +
      "Some of the evidence is contradictory, I admit. Employment among people under twenty-five has fallen slightly in our region. But the reason seems to be the closure of two large factories, not a sudden change in attitude.\n" +
      "I would invite your reporter to spend a day at our college. The students are by no means perfect, but they are working hard, and they deserve a fairer headline.\n" +
      "Imogen Lloyd, Izmir",
    questions: [
      {
        text: "Whom did the survey ask?",
        options: ["500 employers", "500 young people", "500 teachers"],
        answer: 0,
        explain: "„Apparently the survey asked 500 employers, but not a single young person.“",
      },
      {
        text: "What seems to be the reason for lower employment in the region?",
        options: ["the closure of two large factories", "a change in attitude", "low pay"],
        answer: 0,
        explain: "„But the reason seems to be the closure of two large factories, not a sudden change in attitude.“",
      },
      {
        kind: "truefalse",
        text: "Most students from the college found a job within six months.",
        options: ["True", "False"],
        answer: 0,
        explain: "„In my college, eighty percent of the students who finished last year found a job within six months.“",
      },
      {
        kind: "gapfill",
        text: "The claim is by no ___ settled.",
        options: [],
        answer: 0,
        accept: ["means"],
        explain: "„The claim is by no means settled.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The survey asked only employers.",
          "Most students from the college found jobs.",
          "Young people want fairer pay.",
          "The writer invites a reporter to the college.",
        ],
        explain: "Anketin kusuru, okuldan kanıt, küçük bir kabul, en sonda davet.",
      },
      {
        kind: "short_answer",
        text: "Where does the writer teach?",
        options: [],
        answer: 0,
        accept: ["at a vocational college", "a vocational college", "vocational college"],
        explain: "„As a teacher at a vocational college, I would like to reply.“",
      },
    ],
  },
  {
    id: "en-b2-u15-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 15,
    title: "The scooter law one year on",
    genre: "article",
    intro: "Bir yıl önce çıkan elektrikli scooter yasası neden işe yaramadı? Bir haber analizi.",
    gloss: [
      { de: "a scooter", tr: "scooter" },
      { de: "control", tr: "denetlemek" },
      { de: "a sidewalk", tr: "kaldırım" },
      { de: "rise", tr: "artmak" },
      { de: "ban", tr: "yasaklamak" },
      { de: "produce", tr: "ortaya çıkarmak" },
      { de: "rental", tr: "kiralık" },
      { de: "a rider", tr: "sürücü" },
      { de: "forbid", tr: "yasaklamak" },
      { de: "transport", tr: "ulaşım" },
      { de: "a minister", tr: "bakan" },
      { de: "an officer", tr: "polis memuru" },
    ],
    minutes: 9,
    text:
      "THE SCOOTER LAW: ONE YEAR ON\n" +
      "A year ago, parliament passed a bill to control electric scooters in city centers. Today, almost nothing has changed. Scooters still block sidewalks, and accidents have risen by twelve percent. What went wrong?\n" +
      "The bill must have been unclear. Three city administrations applied the same regulation in three different ways: one banned scooters at night, one limited their speed, and one did nothing at all. Only a text that leaves too much room could produce such different results.\n" +
      "Then there are the rental companies. They can't have read the regulation, or they would not still rent scooters to riders under sixteen, which the law clearly forbids. One official suggests another reason: they may have read it and decided that nobody would check.\n" +
      "And nobody did. The law required supervision by local police, but no extra money came with it. „We should have funded enforcement from the first day,“ admits the transport minister. „Without officers on the street, a law is only a piece of paper.“\n" +
      "There were warning signs. The city of Bursa, which tested a similar rule in 2022, reported the same problems. The ministry must have seen that report, but it was not mentioned in the debate.\n" +
      "A new version of the bill is expected in the spring. This time, the minister promises, it will include a budget, clear rules for all cities, and a prerequisite for rental companies: no license without a working age check.",
    questions: [
      {
        text: "How much have accidents risen?",
        options: ["by twelve percent", "by sixteen percent", "by twenty percent"],
        answer: 0,
        explain: "„Scooters still block sidewalks, and accidents have risen by twelve percent.“",
      },
      {
        text: "Why did nobody check the rental companies?",
        options: ["No money came for the police.", "The police refused.", "The companies closed."],
        answer: 0,
        explain: "„The law required supervision by local police, but no extra money came with it.“",
      },
      {
        kind: "truefalse",
        text: "All three cities applied the rule in the same way.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Three city administrations applied the same regulation in three different ways…“",
      },
      {
        kind: "gapfill",
        text: "They ___ have read the regulation.",
        options: [],
        answer: 0,
        accept: ["can't", "cannot"],
        explain: "„They can't have read the regulation.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Parliament passed the bill a year ago.",
          "Three cities applied it differently.",
          "The minister admits a mistake.",
          "A new bill is expected in the spring.",
        ],
        explain: "Yasa, farklı uygulamalar, bakanın itirafı, en sonda yeni tasarı.",
      },
      {
        kind: "short_answer",
        text: "What will rental companies need for a license?",
        options: [],
        answer: 0,
        accept: ["a working age check", "an age check", "age check"],
        explain: "„no license without a working age check.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u15-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 15,
    title: "The town after the bankruptcy",
    genre: "dialogue",
    intro: "Fabrikanın kapanmasından bir yıl sonra iki kasabalı kafede konuşuyor. Dava ne durumda?",
    gloss: [
      { de: "a chimney", tr: "baca" },
      { de: "a factory", tr: "fabrika" },
      { de: "a court", tr: "mahkeme" },
      { de: "a judge", tr: "hâkim" },
      { de: "a weekday", tr: "hafta içi" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Connor", text: "Did you see the old factory this morning? They have started taking down the chimney." },
      { speaker: "Becky", text: "I saw it. If the firm had avoided bankruptcy, we would have stayed in the town. My husband had worked there for nineteen years." },
      { speaker: "Connor", text: "Where did you go?" },
      { speaker: "Becky", text: "To my sister in the city. But we come back every weekend. If the severance pay had been fair, we would still be living here now." },
      { speaker: "Connor", text: "How much did you get?" },
      { speaker: "Becky", text: "Three months of pay after nineteen years. If the union had been stronger, they would never have accepted that." },
      { speaker: "Connor", text: "And the court case?" },
      { speaker: "Becky", text: "Still running. If the dismissal had been legal, the case would have ended last year. The judge says the company broke the rules on notice." },
      { speaker: "Connor", text: "So there is still hope?" },
      { speaker: "Becky", text: "A little. If we win, the workers will get another six months of pay. That would not bring the jobs back, but it would help." },
      { speaker: "Connor", text: "The town feels empty on weekdays." },
      { speaker: "Becky", text: "It does. If the factory were still open, this café would be full at lunch. Now it is you, me and the waiter." },
    ],
    questions: [
      {
        text: "How long had the husband of Becky worked at the factory?",
        options: ["nineteen years", "nine years", "three months"],
        answer: 0,
        explain: "„My husband had worked there for nineteen years.“",
      },
      {
        text: "What did the workers get as severance pay?",
        options: ["three months of pay", "six months of pay", "nothing at all"],
        answer: 0,
        explain: "„Three months of pay after nineteen years.“",
      },
      {
        kind: "truefalse",
        text: "The court case is still running.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Still running.“",
      },
      {
        kind: "gapfill",
        text: "If the severance pay had been fair, we would still be living here ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If the severance pay had been fair, we would still be living here now.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "If the dismissal had been legal, the case would have ended last year.",
          "If the dismissal had been legal, the case would have ended last year",
        ],
        explain: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "short_answer",
        text: "What will the workers get if they win?",
        options: [],
        answer: 0,
        accept: ["six months of pay", "another six months of pay", "six months"],
        explain: "„If we win, the workers will get another six months of pay.“",
      },
    ],
  },
  {
    id: "en-b2-u15-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 15,
    title: "The outlook for next year",
    genre: "monologue",
    intro: "Bir ekonomist bölge için gelecek yılın öngörüsünü sunuyor. İlkbaharda ne başlamış olacak?",
    gloss: [
      { de: "a region", tr: "bölge" },
      { de: "react", tr: "tepki vermek" },
      { de: "a port", tr: "liman" },
      { de: "a billion", tr: "milyar" },
      { de: "the government", tr: "hükûmet" },
      { de: "logistics", tr: "lojistik" },
      { de: "compete", tr: "rekabet etmek" },
      { de: "shipping", tr: "deniz taşımacılığı" },
      { de: "rise", tr: "yükselmek" },
      { de: "tourism", tr: "turizm" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Sean", text: "Good morning. You asked me for a forecast for the region, so here are the numbers, with the usual warning that forecasts can be wrong." },
      { speaker: "Sean", text: "First, the good news. By spring the upturn will have started. Orders from abroad are already rising, and the stock market has reacted well." },
      { speaker: "Sean", text: "By the end of next year, investment in the port will have reached two billion euros. Most of that money has already been approved." },
      { speaker: "Sean", text: "Next year we will be watching the investment closely, because a third of it depends on one company, and that company is still negotiating with the government." },
      { speaker: "Sean", text: "The job market will be changing too. By then about three thousand new jobs will have been created, mostly in logistics and energy." },
      { speaker: "Sean", text: "But the workforce will not have grown at the same speed. Companies will be competing for skilled workers, and wages will be rising." },
      { speaker: "Sean", text: "Our biggest risk is the supply chain. If shipping costs rise again, the upturn will have lost much of its strength by the summer." },
      { speaker: "Sean", text: "If everything goes to plan, the picture is good. By then the market share of local firms will have doubled. I will be presenting the full report in March." },
    ],
    questions: [
      {
        text: "How has the stock market reacted?",
        options: ["It has reacted well.", "It has fallen.", "It has not changed."],
        answer: 0,
        explain: "„Orders from abroad are already rising, and the stock market has reacted well.“",
      },
      {
        text: "In which areas will most new jobs be?",
        options: ["logistics and energy", "tourism and shops", "banks and insurance"],
        answer: 0,
        explain: "„By then about three thousand new jobs will have been created, mostly in logistics and energy.“",
      },
      {
        kind: "truefalse",
        text: "The workforce will grow as fast as the number of jobs.",
        options: ["True", "False"],
        answer: 1,
        explain: "„But the workforce will not have grown at the same speed.“",
      },
      {
        kind: "gapfill",
        text: "By spring the ___ will have started.",
        options: [],
        answer: 0,
        accept: ["upturn"],
        explain: "„By spring the upturn will have started.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["By then the market share of local firms will have doubled.", "By then the market share of local firms will have doubled"],
        explain: "Gelecekte bir tarihten geriye bakış: „will have“ + üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "When will the full report be presented?",
        options: [],
        answer: 0,
        accept: ["in March", "March"],
        explain: "„I will be presenting the full report in March.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u15-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 15,
    title: "Doubts about a claim",
    genre: "opinion",
    intro: "Bir okur mektubu için cümleler kur: bir iddiaya temkinli ama net biçimde itiraz et.",
    gloss: [
      { de: "flat", tr: "kesin" },
      { de: "refusal", tr: "ret" },
      { de: "it seems to be", tr: "gibi görünüyor" },
      { de: "apparently", tr: "görünüşe göre" },
      { de: "on balance", tr: "her şey tartıldığında" },
      { de: "by no means", tr: "hiç de değil" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Bu bir genelleme gibi görünüyor.",
        answer: "It seems to be a generalization.",
        hint: "Tek çekince yeter; „seems“ işi yapıyor.",
      },
      {
        kind: "build",
        tr: "Görünüşe göre iddia akla yatkın.",
        answer: "Apparently the claim is plausible.",
        hint: "Bildiriyor ve kaynağı üstlenmiyor.",
      },
      {
        kind: "build",
        tr: "Her şey tartıldığında rakam belki de şüpheli.",
        answer: "On balance the figure is arguably questionable.",
        hint: "„on balance“ bir tartma yapıldığını söylüyor; „arguably“ hiçbir şey söylemiyor.",
      },
      {
        kind: "build",
        tr: "İddia hiç de kesinleşmiş değil.",
        answer: "The claim is by no means settled.",
        hint: "„by no means“ olumsuzluğu kendi içinde taşıyor; ikinci bir „not“ olmaz.",
      },
      {
        kind: "form",
        prompt: "Okur mektubu için özet kartını doldur.",
        facts: "Anket yalnızca 500 işverene sorulmuş, tek bir gence bile sorulmamış; iddia hiç de kesinleşmiş değil; geçen yıl bitiren öğrencilerin yüzde sekseni altı ay içinde iş buldu; bölgede işlerin azalmasının nedeni iki büyük şirketin kapanması gibi görünüyor.",
        fields: [
          { label: "Survey", answer: "only 500 employers", accept: ["500 employers", "only employers"] },
          { label: "The claim", answer: "by no means settled", accept: ["not settled"] },
          { label: "Students with a job", answer: "eighty percent", accept: ["80 percent"] },
          { label: "Reason for fewer jobs", answer: "two large companies closed", accept: ["two companies closed", "companies closed"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u15-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 15,
    title: "Why the regulation failed",
    genre: "info",
    intro: "Başarısız bir yasa ve kapanan bir fabrika üzerine cümleler kur: ne olmuş olmalı, ne yapılmalıydı?",
    gloss: [
      { de: "must have been unclear", tr: "belirsiz olmuş olmalı" },
      { de: "can't have read", tr: "okumuş olamaz" },
      { de: "should have funded", tr: "fonlamamız gerekirdi" },
      { de: "bankruptcy", tr: "iflas" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kanun tasarısı belirsiz olmuş olmalı.",
        answer: "The bill must have been unclear.",
        hint: "Çıkarım: kanıt tek bir açıklama bırakıyor.",
      },
      {
        kind: "build",
        tr: "Yönetmeliği okumuş olamazlar.",
        answer: "They can't have read the regulation.",
        hint: "Olumsuzu „can't have“; „mustn't have“ yok.",
      },
      {
        kind: "build",
        tr: "Uygulatmayı fonlamamız gerekirdi.",
        answer: "We should have funded enforcement.",
        hint: "Yargı: olanı değil, olmayanı anlatıyor.",
      },
      {
        kind: "build",
        tr: "Firma iflastan kaçınsaydı kalırdık.",
        answer: "If the firm had avoided bankruptcy, we would have stayed.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "build",
        tr: "Kıdem tazminatı adil olsaydı kasaba şimdi sakin olurdu.",
        answer: "If the severance pay had been fair, the town would be calm now.",
        hint: "Karışık koşul: sonuç bu sabahın sokağında.",
      },
    ],
  },
];
