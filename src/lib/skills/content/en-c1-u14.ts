import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 14 — "Masa başında pazarlık, esneklik pazarlığı,
 * nitelik sözcükleri, toplantıyı aktarmak".
 *
 * Dört ders: At the bargaining table · The flexibility bargain ·
 * The vocabulary of qualification · Reporting the meeting.
 *
 *   Kelime: collective bargaining rights, conduct of negotiations,
 *           consensus building, code of conduct, apprenticeship contract,
 *           spin off, permeable, job insecurity, deskilling,
 *           professionalization, labor reserve, lateral hiring, competency-based approach
 *           orientation, obscure, segmentation, undermine, professional
 *           ethic, action pattern, everyday practice, platitude.
 *   Kalıp:  Collective bargaining rights demand that the conduct of negotiations be free from state interference. ·
 *           Were it not for consensus building, no code of conduct would hold. ·
 *           The union representative asks that the firm make every apprenticeship contract permanent. ·
 *           Much as they would like to spin off the unit, the real work stays in-house. ·
 *           The border, albeit permeable, does not remove the job insecurity. ·
 *           Although gainfully employed, many still work on the side. ·
 *           Deskilling is not the opposite of professionalization. ·
 *           A skilled labor shortage is announced; a labor reserve is counted. ·
 *           Lateral hiring and a competency-based approach arrive together. ·
 *           One obscures the segmentation; another undermines the professional ethic. ·
 *           The written rule openly claims what everyday practice merely assumes. ·
 *           To call it disciplining is not to call it a platitude.
 *
 * Ünitenin tek öğretme noktası AĞIR NESNENİN SONA KAYMASI. „…make
 * permanent every apprenticeship contract signed since the merger“ — olağan sıra „make something
 * permanent“ iken nesne, ne olacağını söyleyen sözcüğün ÜSTÜNDEN atlayıp
 * cümlenin sonuna inmiş. Atlama nedeni anlam değil UZUNLUK: İngilizce
 * uzun nesneyi sona atıyor, kısa parçayı fiilin yanında bırakıyor. Aynı
 * kural öbeksi fiilde de çalışıyor („spin off the unit“ ama „spin it
 * off“ — tek sözcük asla ağır değil). Almanca bunu ne yapabiliyor ne de
 * yapması gerekiyor: fiil ikiye ayrılıyor ve ikinci yarısı cümleciğin
 * sonunu zaten tutuyor, dolayısıyla sona kaydırılacak yer yok — nesne
 * ne kadar uzun olursa olsun fiilin önünde kalıyor. Ölçü: **HER İKİ DİLİN
 * DE CÜMLE SONU İÇİN BİR SIRA KURALI VAR, AMA İKİSİ AYRI ŞEYE BAKIYOR:
 * İNGİLİZCE AĞIRLIĞA, ALMANCA FİİL PARANTEZİNE** — Almanca yazarın
 * oynayabildiği şey sonu değil, başa neyin konduğu ve neyin bilinen
 * sayıldığı. Ünite 10'un bulgusunun devamı: isim öbeği arkadan büyüyordu,
 * burada cümle o büyüyen öbeğe sonda yer açıyor.
 */
export const enC1U14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u14-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 14,
    title: "Talks at the Hartmann engine plant",
    genre: "article",
    intro: "Bir motor fabrikasındaki toplu sözleşme görüşmelerine dair haber. Sendika ne istiyor, yönetim ne öneriyor?",
    gloss: [
      { de: "an engine", tr: "motor" },
      { de: "a pause", tr: "ara" },
      { de: "concern", tr: "ilgilendirmek" },
      { de: "an apprentice", tr: "çırak" },
      { de: "affected", tr: "etkilenen" },
      { de: "outsourcing", tr: "dış kaynak kullanımı" },
      { de: "logistics", tr: "lojistik" },
      { de: "external", tr: "dış" },
      { de: "transport", tr: "taşımacılık" },
      { de: "regional", tr: "bölgesel" },
      { de: "a government", tr: "hükûmet" },
      { de: "a minister", tr: "bakan" },
      { de: "an observer", tr: "gözlemci" },
      { de: "a round", tr: "tur" },
      { de: "a proposal", tr: "öneri" },
    ],
    minutes: 12,
    text:
      "Talks between the union and the management of the Hartmann engine plant resumed on Monday after a two-week pause. Both sides say an agreement is possible before the summer, but several points remain open.\n" +
      "The union's central demand concerns young workers. The union representative, Pelin Aksoy, asks that the firm make permanent every apprenticeship contract signed since the merger with Norden Motors in 2022. About 180 apprentices are affected. Management has offered to make permanent only those contracts that end this year.\n" +
      "The second issue is outsourcing. Management would like to spin off the logistics unit and hand over to an external company all the transport jobs currently done by plant staff. The union rejects this. „Much as they would like to spin it off, the real work stays in the building,“ Aksoy said.\n" +
      "Collective bargaining rights demand that the conduct of negotiations be free from state interference, and neither side has asked the regional government to step in. However, the state labor minister visited the plant last week and said she hoped for „a fair result for everybody“.\n" +
      "Were it not for the consensus building of recent years, observers say, the talks would already have failed. A code of conduct agreed in 2020 requires both sides to publish a short joint statement after every round, and so far both have kept to it.\n" +
      "The next round is planned for Thursday. On the table: a proposal to bring into the plant's own pay system the forty cleaning and security staff hired through agencies, and a request that management put in writing its promise not to cut jobs before 2027.",
    questions: [
      {
        text: "When did the talks resume?",
        options: ["on Monday", "on Thursday", "last week"],
        answer: 0,
        explain: "„Talks between the union and the management of the Hartmann engine plant resumed on Monday after a two-week pause.“",
      },
      {
        text: "How many apprentices are affected?",
        options: ["about 180", "about 40", "about 400"],
        answer: 0,
        explain: "„About 180 apprentices are affected.“",
      },
      {
        kind: "truefalse",
        text: "Neither side has asked the regional government to step in.",
        options: ["True", "False"],
        answer: 0,
        explain: "„neither side has asked the regional government to step in.“",
      },
      {
        kind: "gapfill",
        text: "Aksoy asks that the firm make ___ every apprenticeship contract signed since the merger.",
        options: [],
        answer: 0,
        accept: ["permanent"],
        explain: "„The union representative, Pelin Aksoy, asks that the firm make permanent every apprenticeship contract signed since the merger with Norden Motors in 2022.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The talks resumed after a pause.",
          "Management wants to spin off the logistics unit.",
          "A code of conduct was agreed in 2020.",
          "The next round is planned for Thursday.",
        ],
        explain: "Görüşmeler, dış kaynak tartışması, davranış kuralları; en sonda sonraki tur.",
      },
      {
        kind: "short_answer",
        text: "Before which year should no jobs be cut?",
        options: [],
        answer: 0,
        accept: ["2027", "before 2027", "until 2027"],
        explain: "„its promise not to cut jobs before 2027.“",
      },
    ],
  },
  {
    id: "en-c1-u14-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 14,
    title: "Hiring carers without the usual papers",
    genre: "opinion",
    intro: "Bir huzurevi müdürünün bakım personeli alımı üzerine yazısı. Diploma yerine ne sınandı?",
    gloss: [
      { de: "an association", tr: "dernek" },
      { de: "regional", tr: "bölgesel" },
      { de: "combine", tr: "bağdaştırmak" },
      { de: "medication", tr: "ilaç" },
      { de: "pretend", tr: "öyleymiş gibi yapmak" },
      { de: "senior", tr: "kıdemli" },
    ],
    minutes: 12,
    text:
      "Every week another association announces a skilled labor shortage in care. It is real: our nursing home in Riverside has had eleven open positions since January. But the shortage is not the whole picture, and I want to describe what we did about it.\n" +
      "A skilled labor shortage is announced; a labor reserve is counted. When our regional employment office counted, it found more than 2,000 people who had worked in care, left, and might return under better conditions. Most of them were women who had stopped because the shifts could not be combined with children.\n" +
      "Last year we tried two things at once: lateral hiring and a competency-based approach. We invited people from other fields, among them a former bus driver, two shop assistants and a hairdresser, and instead of asking for certificates, we tested what they could actually do with residents.\n" +
      "Seven of them are still with us. They follow a two-year training program while they work, and they are paid from the first day.\n" +
      "Critics say this is deskilling: care work split into simple tasks that anybody can learn in a week. I understand the fear, but deskilling is not the opposite of professionalization, and in our house the two happened side by side. While the new colleagues took over meals and daily walks, our experienced nurses gained time for wound care and medication, which they had been doing in a hurry for years.\n" +
      "I will not pretend it was cheap. Training costs money, and senior staff spent many hours teaching. But the alternative was eleven empty positions, and residents do not wait for certificates.\n" +
      "If other houses want to try it, our training plan is free. Ask for it at the front desk.",
    questions: [
      {
        text: "How many positions have been open since January?",
        options: ["eleven", "seven", "two"],
        answer: 0,
        explain: "„our nursing home in Riverside has had eleven open positions since January.“",
      },
      {
        text: "Why did most people in the labor reserve stop working in care?",
        options: ["The shifts did not fit with children.", "The pay was too low.", "They moved away."],
        answer: 0,
        explain: "„Most of them were women who had stopped because the shifts could not be combined with children.“",
      },
      {
        kind: "truefalse",
        text: "The new colleagues are paid only after their training.",
        options: ["True", "False"],
        answer: 1,
        explain: "„they are paid from the first day.“",
      },
      {
        kind: "gapfill",
        text: "A skilled labor shortage is announced; a labor reserve is ___.",
        options: [],
        answer: 0,
        accept: ["counted"],
        explain: "„A skilled labor shortage is announced; a labor reserve is counted.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The home has had open positions since January.",
          "The employment office counted a labor reserve.",
          "Seven new colleagues are still there.",
          "The training plan is free.",
        ],
        explain: "Açık kadrolar, işgücü rezervi, sonuçlar; en sonda bir öneri.",
      },
      {
        kind: "short_answer",
        text: "Where can other houses ask for the training plan?",
        options: [],
        answer: 0,
        accept: ["at the front desk", "the front desk", "front desk"],
        explain: "„Ask for it at the front desk.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u14-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 14,
    title: "Same desk, new badge",
    genre: "dialogue",
    intro: "Birim ayrılıyor ama iş kalıyor. Sınır neyi kaldırmıyor?",
    gloss: [
      { de: "bottom", tr: "alt" },
      { de: "cross", tr: "geçmek" },
      { de: "crosses", tr: "geçiyor" },
      { de: "adjective", tr: "sıfat" },
      { de: "a unit", tr: "birim" },
      { de: "a border", tr: "sınır" },
      { de: "a badge", tr: "kimlik kartı" },
      { de: "the same desk", tr: "aynı masa" },
      { de: "a contract", tr: "sözleşme" },
      { de: "a notice period", tr: "ihbar süresi" },
      { de: "crossed", tr: "geçilen" },
      { de: "both ways", tr: "iki yönde" },
      { de: "a second job", tr: "ikinci iş" },
      { de: "employed", tr: "işte olan" },
      { de: "a figure", tr: "rakam" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Cem", text: "Much as they would like to spin off the unit, the real work stays in-house. Read that sentence to anybody who has been through one and watch their face." },
      { speaker: "Pelin", text: "The same desk, a new badge." },
      { speaker: "Cem", text: "The same desk, the same corridor, the same two people to ask, and a new contract with a different notice period at the bottom of page four." },
      { speaker: "Pelin", text: "The border, albeit permeable, does not remove the job insecurity." },
      { speaker: "Cem", text: "That is the one line from the whole debate I would keep. The border can be crossed both ways and it is still a border, and everybody knows which side of it they are standing on." },
      { speaker: "Pelin", text: "So permeable is not the same as gone." },
      { speaker: "Cem", text: "Permeable is what a border is called by the people who never have to cross it. Ask somebody who crosses it twice a week and you will get a different adjective." },
      { speaker: "Pelin", text: "Although gainfully employed, many still work on the side." },
      { speaker: "Cem", text: "And this is where the numbers stop helping. A person with a job is counted as having one, and the evening hours are in nobody's figure at all." },
      { speaker: "Pelin", text: "Because the form has one box." },
      { speaker: "Cem", text: "The form has one box and the second job is not in it, so a country can report that almost everybody is employed and be telling the truth about a picture nobody lives in." },
      { speaker: "Pelin", text: "What would you ask instead?" },
      { speaker: "Cem", text: "Ask how many hours, from how many sources, and whether the answer changed last year. Three questions, and no form in this country asks the third one." },
    ],
    questions: [
      {
        text: "What stays the same after they spin off the unit?",
        options: ["the desk", "the contract", "the notice period"],
        answer: 0,
        explain: "„The same desk, the same corridor, the same two people to ask…“",
      },
      {
        text: "Who calls a border permeable?",
        options: ["people who never cross it", "people who cross it twice a week", "people in the corridor"],
        answer: 0,
        explain: "„Permeable is what a border is called by the people who never have to cross it.“",
      },
      {
        kind: "truefalse",
        text: "The evening hours are in nobody's figure.",
        options: ["True", "False"],
        answer: 0,
        explain: "„the evening hours are in nobody's figure at all.“",
      },
      {
        kind: "gapfill",
        text: "Much as they would like to spin off the unit, the real work stays ___.",
        options: [],
        answer: 0,
        accept: ["in-house"],
        explain: "„Much as they would like to spin off the unit, the real work stays in-house.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The border, albeit permeable, does not remove the job insecurity.", "The border, albeit permeable, does not remove the job insecurity"],
        explain: "Fiilsiz taviz ortada; ana iddia ayakta.",
      },
      {
        kind: "short_answer",
        text: "How many questions would he ask?",
        options: [],
        answer: 0,
        accept: ["three", "3", "three questions"],
        explain: "„Three questions, and no form in this country asks the third one.“",
      },
    ],
  },
  {
    id: "en-c1-u14-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 14,
    title: "A staff meeting at the call center",
    genre: "monologue",
    intro: "Bir çağrı merkezindeki personel toplantısının sesli özeti. Yeni puanlama sistemine hangi itirazlar geldi?",
    gloss: [
      { de: "a concern", tr: "kaygı" },
      { de: "a parcel", tr: "koli" },
      { de: "a death", tr: "ölüm" },
      { de: "confused", tr: "kafası karışık" },
      { de: "elderly", tr: "yaşlı" },
      { de: "a caller", tr: "arayan" },
      { de: "a failure", tr: "başarısızlık" },
      { de: "visible", tr: "görünür" },
      { de: "anonymously", tr: "isimsiz olarak" },
      { de: "the fifteenth", tr: "ayın on beşi" },
      { de: "affect", tr: "etkilemek" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Sevil", text: "Hi everyone, this is Sevil with a short summary of yesterday's staff meeting, for those of you on the early shift." },
      { speaker: "Sevil", text: "Management presented the new call rating system. Every call will be scored by software, and team leaders will see the scores every morning." },
      { speaker: "Sevil", text: "Two concerns were raised. One colleague said the system obscures the segmentation of our work: a question about a lost parcel gets the same time limit as a call about a death in the family." },
      { speaker: "Sevil", text: "Another colleague said it undermines our professional ethic. We are trained to take time with confused or elderly callers, and the software counts that time as a failure." },
      { speaker: "Sevil", text: "Management replied with a line from the policy paper. The written rule openly claims what everyday practice merely assumes." },
      { speaker: "Sevil", text: "In other words, every call should already be answered within four minutes, and the software only makes that visible." },
      { speaker: "Sevil", text: "Several of us called the scores a form of disciplining, and management called that a platitude. To call it disciplining is not to call it a platitude, and we asked that this be recorded in the minutes." },
      { speaker: "Sevil", text: "Two decisions were made. First, the system will run as a test for three months without any effect on pay." },
      { speaker: "Sevil", text: "Second, the team leaders will read out at the next meeting all the comments submitted anonymously by staff." },
      { speaker: "Sevil", text: "If you want to add a comment, the box is next to the coffee machine. The next meeting is on the fifteenth." },
    ],
    questions: [
      {
        text: "Who will see the scores every morning?",
        options: ["team leaders", "all staff", "the callers"],
        answer: 0,
        explain: "„team leaders will see the scores every morning.“",
      },
      {
        text: "Within how many minutes should every call be answered?",
        options: ["four", "three", "fifteen"],
        answer: 0,
        explain: "„every call should already be answered within four minutes…“",
      },
      {
        kind: "truefalse",
        text: "The test will affect pay.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the system will run as a test for three months without any effect on pay.“",
      },
      {
        kind: "gapfill",
        text: "Another colleague said it ___ our professional ethic.",
        options: [],
        answer: 0,
        accept: ["undermines"],
        explain: "„Another colleague said it undermines our professional ethic.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The written rule openly claims what everyday practice merely assumes.", "The written rule openly claims what everyday practice merely assumes"],
        explain: "İki katman: iddia ile varsayım.",
      },
      {
        kind: "short_answer",
        text: "Where is the comment box?",
        options: [],
        answer: 0,
        accept: ["next to the coffee machine", "by the coffee machine", "the coffee machine"],
        explain: "„the box is next to the coffee machine.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u14-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 14,
    title: "Demands in the pay talks",
    genre: "info",
    intro: "Fabrikadaki toplu sözleşme görüşmelerinden cümleler: talepleri yaz, sonra durum kartını doldur.",
    gloss: [
      { de: "an apprenticeship contract", tr: "çıraklık sözleşmesi" },
      { de: "consensus building", tr: "uzlaşı sağlama" },
      { de: "a code of conduct", tr: "davranış kuralları" },
      { de: "to spin off", tr: "bünyeden ayırmak" },
      { de: "permeable", tr: "geçirgen" },
      { de: "job insecurity", tr: "iş güvencesizliği" },
      { de: "logistics", tr: "lojistik" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Sendika temsilcisi, şirketin her çıraklık sözleşmesini kalıcı hâle getirmesini istiyor.",
        answer: "The union representative asks that the firm make every apprenticeship contract permanent.",
        hint: "Üç sözcüklük nesne ağır sayılmıyor; olağan sıra: „make something permanent“.",
      },
      {
        kind: "build",
        tr: "Toplu sözleşme hakkı, müzakerelerin devlet müdahalesi olmadan yürütülmesini gerektirir.",
        answer: "Collective bargaining rights demand that the conduct of negotiations be free from state interference.",
        hint: "Eski kip yeni bir konuda: „be“, „is“ değil.",
      },
      {
        kind: "build",
        tr: "Uzlaşı sağlama olmasa hiçbir davranış kuralı tutmazdı.",
        answer: "Were it not for consensus building, no code of conduct would hold.",
        hint: "Fiil başta, bağlaç yok.",
      },
      {
        kind: "build",
        tr: "Birimi bünyeden ayırmayı ne kadar isteseler de asıl iş şirket içinde kalıyor.",
        answer: "Much as they would like to spin off the unit, the real work stays in-house.",
        hint: "Nesne tek sözcük olmadığı için parçacıktan sonra geliyor.",
      },
      {
        kind: "build",
        tr: "Sınır, geçirgen olsa da, iş güvencesizliğini ortadan kaldırmıyor.",
        answer: "The border, albeit permeable, does not remove the job insecurity.",
        hint: "Ara sözdeki taviz ana iddiayı düşürmüyor.",
      },
      {
        kind: "form",
        prompt: "Görüşmeler için durum kartını doldur.",
        facts: "Hartmann motor fabrikasında görüşmeler iki haftalık aradan sonra pazartesi yeniden başladı; sendika 2022'deki birleşmeden bu yana imzalanan her çıraklık sözleşmesinin kalıcı hâle getirilmesini istiyor; bu yaklaşık 180 çırağı ilgilendiriyor; yönetim lojistik birimini bünyeden ayırmak istiyor; sonraki tur perşembe günü.",
        fields: [
          { label: "Talks resumed", answer: "on Monday", accept: ["Monday"] },
          { label: "Union demand", answer: "make permanent every apprenticeship contract", accept: ["make the contracts permanent", "permanent contracts"] },
          { label: "Apprentices affected", answer: "about 180", accept: ["180"] },
          { label: "Management plan", answer: "spin off the logistics unit", accept: ["spin off logistics", "spin off the unit"] },
          { label: "Next round", answer: "on Thursday", accept: ["Thursday"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u14-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 14,
    title: "Skills and the labor market",
    genre: "info",
    intro: "Nitelik ve iş piyasası üzerine cümleler: bir toplantıda söylenenleri İngilizce yaz.",
    gloss: [
      { de: "deskilling", tr: "vasıfsızlaşma" },
      { de: "professionalization", tr: "profesyonelleşme" },
      { de: "lateral hiring", tr: "alan dışından geçiş" },
      { de: "to obscure", tr: "perdelemek" },
      { de: "to undermine", tr: "baltalamak" },
      { de: "a platitude", tr: "klişe" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Vasıfsızlaşma profesyonelleşmenin karşıtı değildir.",
        answer: "Deskilling is not the opposite of professionalization.",
        hint: "İkisi aynı eksenin iki ucu değil.",
      },
      {
        kind: "build",
        tr: "Nitelikli eleman açığı ilan edilir; işgücü rezervi sayılır.",
        answer: "A skilled labor shortage is announced; a labor reserve is counted.",
        hint: "İki edilgenin iki ayrı sahibi var.",
      },
      {
        kind: "build",
        tr: "Alan dışından geçiş ile yetkinlik odaklı yaklaşım birlikte geliyor.",
        answer: "Lateral hiring and a competency-based approach arrive together.",
        hint: "Biri kapı, öteki kâğıdın hiç önemli olmadığını söyleyen ölçüt.",
      },
      {
        kind: "build",
        tr: "Biri segmentasyonu perdeliyor; bir başkası meslek ahlakını baltalıyor.",
        answer: "One obscures the segmentation; another undermines the professional ethic.",
        hint: "Biri görülmesini zorlaştırıyor, öteki alttan parça çekiyor.",
      },
      {
        kind: "build",
        tr: "Buna hizaya sokma demek klişe demek değildir.",
        answer: "To call it disciplining is not to call it a platitude.",
        hint: "Zor bir sözcük, zor olduğu için boşalmaz.",
      },
    ],
  },
];
