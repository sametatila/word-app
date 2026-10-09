import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 24 — "Bir özgürlük istemek, görecelik tartışması,
 * kanıtın sözcükleri, bir iddiayı aktarmak".
 *
 * Dört ders: Demanding a freedom · The relativism debate ·
 * The vocabulary of evidence · Reporting a claim.
 *
 *   Kelime: freedom of conscience, academic freedom, artistic freedom,
 *           freedom of contract, judicial review, relativism, maxim, commandment,
 *           virtue, integrity, altruism, reference value, guideline value,
 *           significance level, outlier, repeatability, source of error,
 *           advocate, affirm, misrepresent, distortion, truism, knowingly.
 *   Kalıp:  Freedom of conscience demands that no one be forced to act against their beliefs. ·
 *           Were it not for freedom of information, the public would never see these files. ·
 *           They ask that freedom of contract be tested by judicial review. ·
 *           Much as relativism unsettles us, no maxim survives without doubt. ·
 *           A commandment, albeit ancient, is not a virtue. ·
 *           Although a form of integrity, altruism can be a duty too. ·
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
    title: "An air quality inquiry",
    genre: "article",
    intro: "Bir üniversite soruşturması: hava kirliliği çalışması nasıl çarpıtıldı?",
    gloss: [
      { de: "knowingly", tr: "bilerek" },
      { de: "misrepresent", tr: "yanlış aktarmak" },
      { de: "an outlier", tr: "aykırı değer" },
      { de: "a guideline value", tr: "kılavuz değer" },
      { de: "repeatability", tr: "tekrarlanabilirlik" },
      { de: "clearly", tr: "açıkça" },
      { de: "rarely", tr: "nadiren" },
      { de: "an inquiry", tr: "soruşturma" },
      { de: "senior", tr: "kıdemli" },
      { de: "a primary school", tr: "ilkokul" },
      { de: "dust", tr: "toz" },
      { de: "reversed", tr: "tersine çevrilmiş" },
      { de: "legitimate", tr: "meşru" },
      { de: "simply", tr: "düpedüz" },
      { de: "misunderstood", tr: "yanlış anlaşılmış" },
      { de: "independent", tr: "bağımsız" },
      { de: "a laboratory", tr: "laboratuvar" },
      { de: "an analysis", tr: "analiz" },
      { de: "beyond", tr: "ötesinde" },
      { de: "cited", tr: "atıf yapılan" },
      { de: "openness", tr: "açıklık" },
    ],
    minutes: 12,
    text:
      "INQUIRY: RESEARCHER KNOWINGLY MISREPRESENTED AIR QUALITY STUDY\n" +
      "A university inquiry has found that a senior researcher knowingly misrepresented the results of a study on air pollution near primary schools. The report, published on Thursday, clearly states that the error was not an accident.\n" +
      "The study measured fine dust outside twelve schools in the city over two winters. In the original data, three schools were above the guideline value set by the health authority. In the published paper, only one was. The inquiry found that two measurements had been removed as outliers after the results were known, although the team had never removed outliers in earlier studies.\n" +
      "„A significance level is chosen before a study starts; an outlier is found in the data. Here the order was reversed,“ the report says. Its authors also note that the other authors rarely checked the raw data and merely affirmed the final tables.\n" +
      "The researcher, who has not been named, denies the findings. Her lawyer argues that the changes were a legitimate correction and that the committee has simply misunderstood the method. The committee does not accept this. It points out that repeatability exposes the source of error: when an independent laboratory ran the same analysis, all three schools were again above the limit.\n" +
      "The case matters beyond one university. The paper was cited by the city council last year when it decided not to move a bus station away from two of the schools. Parents' groups say they will now ask the council to review that decision.\n" +
      "The university says it will always publish the results of such inquiries. Critics say the process took far too long: the first complaint was made two years ago, and hardly anyone outside the committee knew about it until this week. One advocates openness; another merely affirms it, as one parent wrote online.",
    questions: [
      {
        text: "What did the study measure?",
        options: ["fine dust outside schools", "noise near bus stations", "traffic in the city center"],
        answer: 0,
        explain: "„The study measured fine dust outside twelve schools in the city over two winters.“",
      },
      {
        text: "How many schools were above the guideline value in the original data?",
        options: ["three", "one", "twelve"],
        answer: 0,
        explain: "„In the original data, three schools were above the guideline value set by the health authority.“",
      },
      {
        kind: "truefalse",
        text: "The other authors did not check the raw data carefully.",
        options: ["True", "False"],
        answer: 0,
        explain: "„the other authors rarely checked the raw data and merely affirmed the final tables.“",
      },
      {
        kind: "gapfill",
        text: "Repeatability exposes the source of ___.",
        options: [],
        answer: 0,
        accept: ["error"],
        explain: "„repeatability exposes the source of error…“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The inquiry publishes its report on Thursday.",
          "Two measurements are removed as outliers.",
          "An independent laboratory repeats the analysis.",
          "Parents plan to ask the council for a review.",
        ],
        explain: "Bulgu, veriden çıkarılan ölçümler, bağımsız sınama; en sonda velilerin talebi.",
      },
      {
        kind: "short_answer",
        text: "When was the first complaint made?",
        options: [],
        answer: 0,
        accept: ["two years ago", "2 years ago"],
        explain: "„the first complaint was made two years ago…“",
      },
    ],
  },
  {
    id: "en-c1-u24-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 24,
    title: "Relativism and doubt",
    genre: "opinion",
    intro: "Hiçbir ilke kuşkuya uğramadan ayakta kalmıyor. Peki bu neyi bitiriyor?",
    gloss: [
      { de: "gloomy", tr: "karamsar" },
      { de: "legislated", tr: "yasayla konan" },
      { de: "moral", tr: "ahlaki" },
      { de: "goodness", tr: "iyilik" },
      { de: "currency", tr: "para birimi" },
      { de: "unsettles", tr: "huzursuz ediyor" },
      { de: "a maxim", tr: "ilke" },
      { de: "without doubt", tr: "sorgulanmadan" },
      { de: "a conclusion", tr: "sonuç" },
      { de: "equal", tr: "eşit" },
      { de: "a survivor", tr: "sağ kalan" },
      { de: "tested", tr: "sınanmış" },
      { de: "ancient", tr: "kadim" },
      { de: "an age", tr: "eskilik" },
      { de: "obeyed", tr: "uyulan" },
      { de: "a habit", tr: "alışkanlık" },
      { de: "a virtue", tr: "erdem" },
      { de: "practiced", tr: "uygulanan" },
      { de: "a duty", tr: "ödev" },
      { de: "chosen", tr: "seçilmiş" },
      { de: "a colleague", tr: "meslektaş" },
      { de: "a schedule", tr: "nöbet çizelgesi" },
      { de: "unpaid", tr: "ödenmemiş" },
      { de: "counted", tr: "sayılan" },
      { de: "honest", tr: "dürüst" },
      { de: "sharp", tr: "keskin" },
      { de: "produced", tr: "doğurdu" },
    ],
    minutes: 12,
    text:
      "Much as relativism unsettles us, no maxim survives without doubt. I heard that sentence at a hospital ethics meeting last spring, and it is less gloomy than it sounds.\n" +
      "„No maxim survives without doubt“ does not say that all maxims are equal. It says that a maxim which has never been doubted has never been tested, and a survivor of doubt is worth more than a rule nobody ever questioned.\n" +
      "That is the useful reading and it is the harder one, because the easy reading, that nothing is really right or wrong, is always available to a tired committee.\n" +
      "A commandment, albeit ancient, is not a virtue. Age is not an argument, and in ethics that point is at its sharpest: a rule that is obeyed out of habit has produced a habit and not a virtue.\n" +
      "A virtue is a thing practiced by somebody who could have done otherwise. That is why it cannot be legislated and why a list of rules is not a moral education, though it is a great deal easier to write.\n" +
      "Although a form of integrity, altruism can be a duty too. Nobody at the meeting denied that it is a form of integrity.\n" +
      "What is denied is that it is always chosen. A colleague who takes the night shift every December is being good and is also being used, and the second half of that sentence is the one nobody says in the room.\n" +
      "So the honest conclusion is short. Unpaid goodness is still work and it should be counted, and counting it does not make it smaller. A person who is thanked in a speech and never in a schedule has been paid in the wrong currency.",
    questions: [
      {
        text: "What does the second half say?",
        options: ["a maxim never doubted was never tested", "all maxims are equal", "doubt is a survivor"],
        answer: 0,
        explain: "„a maxim which has never been doubted has never been tested…“",
      },
      {
        text: "What is a virtue?",
        options: ["practiced by somebody who could have done otherwise", "a rule obeyed out of habit", "an ancient commandment"],
        answer: 0,
        explain: "„A virtue is a thing practiced by somebody who could have done otherwise.“",
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
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Much as relativism unsettles us, no maxim survives without doubt.",
          "A commandment, albeit ancient, is not a virtue.",
          "Although a form of integrity, altruism can be a duty too.",
          "Unpaid goodness is still work and it should be counted.",
        ],
        explain: "Kuşku, eskilik, seçim; en sonda sayılması gereken.",
      },
      {
        kind: "short_answer",
        text: "How has such a person been paid?",
        options: [],
        answer: 0,
        accept: ["in the wrong currency", "wrongly", "not in the schedule"],
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
    title: "Measured or decided",
    genre: "dialogue",
    intro: "Biri seçiliyor, öteki bulunuyor. Hangi sayı kimin kararı?",
    gloss: [
      { de: "picked", tr: "seçti" },
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
      { de: "produces", tr: "üretiyor" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Caitlin", text: "A reference value is not a guideline value. One is what a healthy population measures at; the other is what an authority has decided is acceptable." },
      { speaker: "Danny", text: "So one is a measurement and the other is a decision." },
      { speaker: "Caitlin", text: "Exactly that, and a report that puts them in the same table without saying which is which has made a political number look like a laboratory number." },
      { speaker: "Danny", text: "A significance level is chosen; an outlier is found." },
      { speaker: "Caitlin", text: "And there is the same difference again in a different field. Somebody picked the level before the study started, or should have." },
      { speaker: "Danny", text: "And if they picked it afterward?" },
      { speaker: "Caitlin", text: "Then the number is not a level at all; it is a description of the result. That is the single most common thing wrong with a bad paper and it is almost never visible." },
      { speaker: "Danny", text: "Repeatability exposes the source of error." },
      { speaker: "Caitlin", text: "Run it again with the same machine and you find the machine. Run it again in another laboratory and you find everything else." },
      { speaker: "Danny", text: "Which is more useful?" },
      { speaker: "Caitlin", text: "The second, by a long way, and it is the one nobody funds, because it produces no new finding and it is somebody else's building." },
      { speaker: "Danny", text: "So what would you change?" },
      { speaker: "Caitlin", text: "Fund the second study in the same grant as the first. It has been proposed for thirty years and it costs about a fifth of what a wrong finding costs." },
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
    title: "A chain of freedoms",
    genre: "monologue",
    intro: "Bir özgürlük ötekini nasıl taşıyor? Sınama neden gerekli?",
    gloss: [
      { de: "strange", tr: "tuhaf" },
      { de: "informing", tr: "bilgilendirme" },
      { de: "whatever", tr: "her ne" },
      { de: "trouble", tr: "sıkıntı" },
      { de: "conscience", tr: "vicdan" },
      { de: "forced", tr: "zorlanmış" },
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
      { de: "beliefs", tr: "inançlar" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Kayla", text: "Freedom of conscience demands that no one be forced to act against their beliefs. A strange sentence at first reading, because it seems to protect something nobody can see." },
      { speaker: "Kayla", text: "But it belongs to a chain. A conscience that cannot be informed is a conscience with nothing to work on, and informing it is what a university is for." },
      { speaker: "Kayla", text: "Were it not for freedom of information, the public would never see these files. The chain one link further, and the link that holds it surprises people." },
      { speaker: "Kayla", text: "The hardest cases are never about a journalist and a file. They are about a novel, a play or a picture, and they are decided first." },
      { speaker: "Kayla", text: "Whatever a court allows a painter, it will later allow a reporter, and whatever it refuses a painter it will refuse everybody quietly for thirty years." },
      { speaker: "Kayla", text: "They ask that freedom of contract be tested by judicial review. Now the other direction, and it is the half that gets forgotten." },
      { speaker: "Kayla", text: "A contract is a private thing and two people are free to write what they like in it. The trouble is that they are almost never equally free." },
      { speaker: "Kayla", text: "A tenant signs a clause because there are four apartments and two hundred people, and calling that freedom is a description of the paper rather than of the room." },
      { speaker: "Kayla", text: "So the review is not an attack on autonomy. It is the only thing that keeps the word honest where the two sides are unequal." },
      { speaker: "Kayla", text: "And a judge who says that out loud will be told they are against freedom, by somebody who has never signed anything they could not change." },
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
        text: "Freedom of conscience demands that no one be ___ to act against their beliefs.",
        options: [],
        answer: 0,
        accept: ["forced"],
        explain: "„Freedom of conscience demands that no one be forced to act against their beliefs.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["They ask that freedom of contract be tested by judicial review.", "They ask that freedom of contract be tested by judicial review"],
        explain: "Talep kipi: „be“, „is“ değil.",
      },
      {
        kind: "short_answer",
        text: "Why does a tenant sign the clause?",
        options: [],
        answer: 0,
        accept: ["there are four apartments", "too few apartments", "no other choice"],
        explain: "„because there are four apartments and two hundred people…“",
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
    title: "Studies and statistics",
    genre: "info",
    intro: "Hava kalitesi soruşturması: cümleler ve bir soruşturma kartı.",
    gloss: [
      { de: "to advocate", tr: "savunmak" },
      { de: "to affirm", tr: "doğrulamak" },
      { de: "to misrepresent", tr: "yanlış aktarmak" },
      { de: "a truism", tr: "herkesin bildiği gerçek" },
      { de: "a significance level", tr: "anlamlılık düzeyi" },
      { de: "repeatability", tr: "tekrarlanabilirlik" },
      { de: "a laboratory", tr: "laboratuvar" },
      { de: "independent", tr: "bağımsız" },
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
        prompt: "Soruşturma kartını doldur.",
        facts: "Araştırmacı çalışmayı bilerek yanlış aktardı; iki ölçüm sonradan aykırı değer diye çıkarıldı; bağımsız bir laboratuvar aynı analizi yeniden yaptı; ilk şikâyet iki yıl önce yapıldı.",
        fields: [
          { label: "What she did", answer: "misrepresented the study", accept: ["knowingly misrepresented it"] },
          { label: "Data removed", answer: "two measurements", accept: ["2 measurements"] },
          { label: "Independent check", answer: "a laboratory", accept: ["an independent laboratory"] },
          { label: "First complaint", answer: "two years ago", accept: ["2 years ago"] },
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
    title: "Freedoms and beliefs",
    genre: "info",
    intro: "Özgürlükler zinciri ve göreceliğin sınaması.",
    gloss: [
      { de: "freedom of conscience", tr: "vicdan özgürlüğü" },
      { de: "freedom of information", tr: "bilgi edinme özgürlüğü" },
      { de: "freedom of contract", tr: "sözleşme özgürlüğü" },
      { de: "relativism", tr: "görecelik" },
      { de: "a commandment", tr: "buyruk" },
      { de: "altruism", tr: "özgecilik" },
      { de: "beliefs", tr: "inançlar" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Vicdan özgürlüğü kimsenin inançlarına aykırı davranmaya zorlanmamasını talep eder.",
        answer: "Freedom of conscience demands that no one be forced to act against their beliefs.",
        hint: "„be forced“, „is forced“ değil: talep kipi.",
      },
      {
        kind: "build",
        tr: "Bilgi edinme özgürlüğü olmasaydı kamuoyu bu dosyaları hiç göremezdi.",
        answer: "Were it not for freedom of information, the public would never see these files.",
        hint: "En zor davalar önce sanatta karara bağlanıyor.",
      },
      {
        kind: "build",
        tr: "Sözleşme özgürlüğünün yargısal denetimle sınanmasını istiyorlar.",
        answer: "They ask that freedom of contract be tested by judicial review.",
        hint: "Taraflar neredeyse hiçbir zaman eşit özgür değil.",
      },
      {
        kind: "build",
        tr: "Görecelik bizi ne kadar huzursuz etse de hiçbir ilke kuşkuya uğramadan ayakta kalmaz.",
        answer: "Much as relativism unsettles us, no maxim survives without doubt.",
        hint: "Kuşkudan sağ çıkan ilke, hiç sorgulanmamış olandan değerli.",
      },
      {
        kind: "build",
        tr: "Bir buyruk, kadim olsa da, bir erdem değildir.",
        answer: "A commandment, albeit ancient, is not a virtue.",
        hint: "Eskilik bir sav değil.",
      },
    ],
  },
];
