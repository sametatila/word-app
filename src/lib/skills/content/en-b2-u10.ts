import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 10 — "Basmış olsalardı, daha önce hiç yayımlanmamış,
 * yayına girene kadar, raporların karşılaştırılması".
 *
 * Dört ders: If they had printed it · Never before published ·
 * By the time it airs · The comparison of the reports.
 *
 *   Kelime: consent, copyright, indictment, precedent, justification,
 *           motive, urgency, duty, landmark, legacy, memorial,
 *           collection, imprint, autonomy, sovereignty, competence,
 *           merger, takeover, investor, shareholder, funding, subsidy,
 *           alliance, partnership, comparison, distinction, contrast,
 *           parallel, ritual, monument, quarterly, narrative.
 *   Kalıp:  If they had asked for consent, we would have agreed. ·
 *           If the copyright had been clear, the case would be closed now. ·
 *           If the indictment had come earlier, the story would have changed. ·
 *           Never before has such a landmark been shown. ·
 *           Not once did the legacy reach the public. ·
 *           Only in the memorial is the name written. ·
 *           By Friday the merger will have been announced. ·
 *           This time next week we will be covering the takeover. ·
 *           The investors will have been informed by then. ·
 *           The comparison of the two reports took a week. ·
 *           The distinction between the cases is clear. ·
 *           The contrast between the versions is sharp.
 *
 * Ünitenin tek öğretme noktası ADLAŞTIRMA KENDİ EDATINI DA GETİRİYOR.
 * Ünite 4 ekin fiilden türetilemediğini göstermişti; bu ikinci fatura:
 * „comparison OF“, „distinction BETWEEN“, „contrast BETWEEN“,
 * „parallel WITH“ — edat da çift çift ezberleniyor ve fiilin aldığı
 * edatla hiç ilgisi yok („compare one thing WITH another“ ama „the
 * comparison OF two things“).
 */
export const enB2U10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u10-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 10,
    title: "Two reports on the theater",
    genre: "report",
    intro: "Kültür komisyonu için şehir tiyatrosunun geleceği hakkında özet. İki rapor neyi öneriyor?",
    gloss: [
      { de: "a consultant", tr: "danışman" },
      { de: "finances", tr: "mali durum" },
      { de: "rise", tr: "artmak" },
      { de: "stable", tr: "sabit" },
      { de: "independent", tr: "bağımsız" },
      { de: "a stage", tr: "sahne" },
      { de: "reduce", tr: "azaltmak" },
      { de: "identity", tr: "kimlik" },
      { de: "a recommendation", tr: "öneri" },
      { de: "a search", tr: "arayış" },
      { de: "lead to", tr: "yol açmak" },
    ],
    minutes: 9,
    text:
      "SUMMARY FOR THE CULTURE COMMITTEE\n" +
      "Subject: the future funding of the City Theater\n" +
      "In January the committee asked two consultants to report on the finances of the theater. The comparison of the two reports took our team a week, and this summary gives the main results.\n" +
      "Both reports agree on the facts. The subsidy from the city has not changed since 2018, while the costs of the theater have risen by about a third. Ticket sales are stable, and the partnership with the university brings in a small but regular income.\n" +
      "The distinction between the two reports lies in their advice. The first report recommends a merger with the concert hall: one building, one box office and one technical team. The second report recommends keeping the theater independent but finding private investors for a new studio stage.\n" +
      "The contrast between the two plans is sharp. The merger would save money quickly but would reduce the autonomy of the theater. The investor plan would protect its identity, but it depends on funding that nobody has promised yet.\n" +
      "There is also a useful parallel with the city of Linz, where a similar merger in 2016 saved money in the first two years and then led to a fall in audiences.\n" +
      "Our recommendation is a decision in two steps: a six-month search for investors, followed by a review of the merger plan if the search fails.\n" +
      "The committee will discuss this summary at its quarterly meeting on 14 June.",
    questions: [
      {
        text: "How long did the comparison of the two reports take?",
        options: ["a week", "a month", "two years"],
        answer: 0,
        explain: "„The comparison of the two reports took our team a week…“",
      },
      {
        text: "What does the first report recommend?",
        options: ["a merger with the concert hall", "private investors", "a new studio stage"],
        answer: 0,
        explain: "„The first report recommends a merger with the concert hall…“",
      },
      {
        kind: "truefalse",
        text: "The subsidy from the city has not changed since 2018.",
        options: ["True", "False"],
        answer: 0,
        explain: "„The subsidy from the city has not changed since 2018…“",
      },
      {
        kind: "gapfill",
        text: "The distinction ___ the two reports lies in their advice.",
        options: [],
        answer: 0,
        accept: ["between"],
        explain: "„The distinction between the two reports lies in their advice.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Both reports agree on the facts.",
          "The first report recommends a merger.",
          "The second report recommends private investors.",
          "The committee will discuss the summary in June.",
        ],
        explain: "Ortak bulgular, iki öneri, en sonda toplantı tarihi.",
      },
      {
        kind: "short_answer",
        text: "In which city did a similar merger lead to a fall in audiences?",
        options: [],
        answer: 0,
        accept: ["Linz", "in Linz"],
        explain: "„There is also a useful parallel with the city of Linz…“",
      },
    ],
  },
  {
    id: "en-b2-u10-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 10,
    title: "A forgotten architect",
    genre: "article",
    intro: "Müzenin basın bülteni: unutulmuş bir mimarın çizimleri. Sergi neden önemli?",
    gloss: [
      { de: "an architect", tr: "mimar" },
      { de: "a drawing", tr: "çizim" },
      { de: "design", tr: "tasarlamak" },
      { de: "famous", tr: "ünlü" },
      { de: "a railway", tr: "demiryolu" },
      { de: "a granddaughter", tr: "kız torun" },
      { de: "national", tr: "ulusal" },
      { de: "an archive", tr: "arşiv" },
      { de: "a researcher", tr: "araştırmacı" },
    ],
    minutes: 9,
    text:
      "PRESS RELEASE: CITY MUSEUM\n" +
      "The architect nobody remembers: the drawings of Selma Archie, 1921 to 1978\n" +
      "Never before has such a collection of drawings been shown to the public. For forty years, 212 drawings by the architect Selma Archie lay in boxes in the basement of her family home, and not once did anybody outside the family see them.\n" +
      "Archie designed some of the most famous buildings in the city, including the central library and the old railway station. Yet rarely was her name mentioned at the openings. The buildings were presented under the name of her business partner, and only on a small memorial at the library is her name written today.\n" +
      "Only after her granddaughter found the boxes in 2022 did the museum learn how much of the city she had shaped. Among the drawings are plans for a concert hall that was never built and for a landmark bridge that was built, but under the name of another architect.\n" +
      "Not until the exhibition opens will visitors be able to compare her original plans with the buildings they know. The museum has placed each drawing next to a photograph of the finished building, so the contrast is easy to see.\n" +
      "Nowhere else will the collection be shown. After the exhibition closes on 30 September, the drawings will go to the national archive, where they will be kept for researchers.\n" +
      "The exhibition opens on 3 May. Entry is free on Sundays.\n" +
      "With this exhibition, the museum says, the legacy of Selma Archie is finally being returned to her.",
    questions: [
      {
        text: "Where were the drawings kept for forty years?",
        options: ["in boxes in a basement", "in the national archive", "in the central library"],
        answer: 0,
        explain: "„For forty years, 212 drawings by the architect Selma Archie lay in boxes in the basement of her family home…“",
      },
      {
        text: "Who found the boxes?",
        options: ["her granddaughter", "the museum", "her business partner"],
        answer: 0,
        explain: "„Only after her granddaughter found the boxes in 2022 did the museum learn how much of the city she had shaped.“",
      },
      {
        kind: "truefalse",
        text: "The collection will travel to other museums after September.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Nowhere else will the collection be shown.“",
      },
      {
        kind: "gapfill",
        text: "Not once did anybody outside the family ___ them.",
        options: [],
        answer: 0,
        accept: ["see"],
        explain: "„and not once did anybody outside the family see them.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The drawings lay in boxes for forty years.",
          "Her buildings were presented under another name.",
          "Her granddaughter found the boxes in 2022.",
          "The drawings will go to the national archive.",
        ],
        explain: "Kayıp yıllar, unutulan ad, bulunuş, en sonda çizimlerin geleceği.",
      },
      {
        kind: "short_answer",
        text: "When is entry free?",
        options: [],
        answer: 0,
        accept: ["on Sundays", "Sundays", "Sunday"],
        explain: "„Entry is free on Sundays.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u10-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 10,
    title: "A photo used without permission",
    genre: "dialogue",
    intro: "Bir dergi ajansın fotoğrafını izinsiz kapağa koymuş. Ajans ne istiyor?",
    gloss: [
      { de: "a harbor", tr: "liman" },
      { de: "possibly", tr: "belki" },
      { de: "a court", tr: "mahkeme" },
      { de: "a lawyer", tr: "avukat" },
      { de: "an archive", tr: "arşiv" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Arthur", text: "Did you see the cover of City Life this month? That is the photo Charlie took of the old harbor." },
      { speaker: "Kayla", text: "I saw it. Nobody asked us. If they had asked for consent, we would have agreed. We usually say yes to local magazines." },
      { speaker: "Arthur", text: "So why are we angry?" },
      { speaker: "Kayla", text: "Because they did not ask and they did not pay. If the copyright had been clear to them, the case would be closed now, but they say they found the photo on a free website." },
      { speaker: "Arthur", text: "Did they?" },
      { speaker: "Kayla", text: "Possibly. Someone put it there without our permission. If we had added our name to the file, that would never have happened." },
      { speaker: "Arthur", text: "So part of this is our fault." },
      { speaker: "Kayla", text: "A small part. But a magazine has a duty to check. If they had checked, they would know the photo is ours." },
      { speaker: "Arthur", text: "What do we want from them?" },
      { speaker: "Kayla", text: "A normal fee and a line on page two saying who took the picture. If they agree by Friday, there will be no court case." },
      { speaker: "Arthur", text: "And if they refuse?" },
      { speaker: "Kayla", text: "Then our lawyer sends the letter on Monday. I hope it does not come to that. I like that magazine." },
    ],
    questions: [
      {
        text: "Where does the magazine say it found the photo?",
        options: ["on a free website", "in the agency archive", "on the phone of Charlie"],
        answer: 0,
        explain: "„they say they found the photo on a free website.“",
      },
      {
        text: "What do they want from the magazine?",
        options: ["a normal fee and a line on page two", "a new cover", "an apology in court"],
        answer: 0,
        explain: "„A normal fee and a line on page two saying who took the picture.“",
      },
      {
        kind: "truefalse",
        text: "They usually say yes to local magazines.",
        options: ["True", "False"],
        answer: 0,
        explain: "„We usually say yes to local magazines.“",
      },
      {
        kind: "gapfill",
        text: "If the copyright had been clear to them, the case would be closed ___.",
        options: [],
        answer: 0,
        accept: ["now"],
        explain: "„If the copyright had been clear to them, the case would be closed now…“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["If they had asked for consent, we would have agreed.", "If they had asked for consent, we would have agreed"],
        explain: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "short_answer",
        text: "When will the lawyer send the letter if they refuse?",
        options: [],
        answer: 0,
        accept: ["on Monday", "Monday"],
        explain: "„Then our lawyer sends the letter on Monday.“",
      },
    ],
  },
  {
    id: "en-b2-u10-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 10,
    title: "Covering the bank merger",
    genre: "monologue",
    intro: "Ekonomi editörü gelecek haftanın birleşme haberini planlıyor. Kim nerede olacak?",
    gloss: [
      { de: "a press release", tr: "basın bülteni" },
      { de: "the stock exchange", tr: "borsa" },
      { de: "an insurer", tr: "sigorta şirketi" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Wendy", text: "Morning, everyone. A quick plan for the bank merger, because next week is going to be busy." },
      { speaker: "Wendy", text: "By Friday the merger will have been announced. The two banks are meeting on Thursday night, and our sources say the press release is ready." },
      { speaker: "Wendy", text: "The investors will have been informed by then. The shareholders get a letter on Thursday afternoon, so expect the share price to move before the announcement." },
      { speaker: "Wendy", text: "This time next week we will be covering the takeover from three places: the stock exchange, the head office and the two biggest branches." },
      { speaker: "Wendy", text: "Connor, you will be sitting outside the head office from seven. Julia, you will be talking to customers at the branches." },
      { speaker: "Wendy", text: "By the end of the month, around four hundred jobs will have been cut. That is the story our readers care about, not the share price." },
      { speaker: "Wendy", text: "One warning. Last year a partnership between two insurers was announced two days late, so do not print a date until you have seen it in writing." },
      { speaker: "Wendy", text: "I will be updating the plan every morning at nine. Questions to me, please, not to the group chat." },
    ],
    questions: [
      {
        text: "When will the merger have been announced?",
        options: ["by Friday", "by Thursday night", "by the end of the month"],
        answer: 0,
        explain: "„By Friday the merger will have been announced.“",
      },
      {
        text: "Where will Julia be talking to customers?",
        options: ["at the branches", "at the stock exchange", "outside the head office"],
        answer: 0,
        explain: "„Julia, you will be talking to customers at the branches.“",
      },
      {
        kind: "truefalse",
        text: "The partnership between two insurers was announced on time.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Last year a partnership between two insurers was announced two days late…“",
      },
      {
        kind: "gapfill",
        text: "By the end of the month, around four hundred jobs will have been ___.",
        options: [],
        answer: 0,
        accept: ["cut"],
        explain: "„By the end of the month, around four hundred jobs will have been cut.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The investors will have been informed by then.", "The investors will have been informed by then"],
        explain: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "short_answer",
        text: "When will Wendy update the plan?",
        options: [],
        answer: 0,
        accept: ["every morning at nine", "every morning", "at nine"],
        explain: "„I will be updating the plan every morning at nine.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u10-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 10,
    title: "Comparing two reports",
    genre: "info",
    intro: "İki raporu karşılaştıran bir özet için cümleler kur ve karşılaştırma kartını doldur.",
    gloss: [
      { de: "the comparison", tr: "karşılaştırılması" },
      { de: "the distinction", tr: "ayrım" },
      { de: "the contrast", tr: "karşıtlık" },
      { de: "consent", tr: "rıza" },
      { de: "sharp", tr: "keskin" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "İki raporun karşılaştırılması bir hafta sürdü.",
        answer: "The comparison of the two reports took a week.",
        hint: "„comparison“ „of“ istiyor; edat da ezberden geliyor.",
      },
      {
        kind: "build",
        tr: "Davalar arasındaki ayrım açık.",
        answer: "The distinction between the cases is clear.",
        hint: "„distinction“ „between“ istiyor.",
      },
      {
        kind: "build",
        tr: "Sürümler arasındaki karşıtlık keskin.",
        answer: "The contrast between the versions is sharp.",
        hint: "„contrast“ da „between“ alıyor; ikinci şey tek başına anılınca „with“.",
      },
      {
        kind: "build",
        tr: "Keith isteselerdi kabul ederdik.",
        answer: "If they had asked for consent, we would have agreed.",
        hint: "Kapalı kutu: iki yarı da geçmişte.",
      },
      {
        kind: "form",
        prompt: "Kültür komisyonu için karşılaştırma kartını doldur.",
        facts: "İki raporun karşılaştırılması bir hafta sürdü; iki dava arasındaki ayrım açık; iki sürüm arasındaki karşıtlık keskin; izin istenseydi kabul ederdik.",
        fields: [
          { label: "Comparison of the reports", answer: "took a week", accept: ["a week", "one week"] },
          { label: "Distinction between the cases", answer: "clear", accept: ["is clear", "it is clear"] },
          { label: "Contrast between the versions", answer: "sharp", accept: ["is sharp", "it is sharp"] },
          { label: "If they had asked for consent", answer: "we would have agreed", accept: ["agreed", "we would have said yes"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u10-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 10,
    title: "A memorial and its legacy",
    genre: "opinion",
    intro: "Müze ve haber masası için cümleler kur: ne hiç görülmedi, cumaya kadar ne duyurulacak?",
    gloss: [
      { de: "never before", tr: "daha önce hiç" },
      { de: "not once", tr: "bir kez olsun" },
      { de: "only in the memorial", tr: "yalnızca anıtta" },
      { de: "will have been announced", tr: "duyurulmuş olacak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Böyle bir dönüm noktası daha önce hiç gösterilmedi.",
        answer: "Never before has such a landmark been shown.",
        hint: "„has“ özneyi atlıyor, fiilin gerisi yerinde kalıyor.",
      },
      {
        kind: "build",
        tr: "Miras bir kez olsun kamuya ulaşmadı.",
        answer: "Not once did the legacy reach the public.",
        hint: "„did“ geliyor, ana fiil yalın hâline dönüyor.",
      },
      {
        kind: "build",
        tr: "Ad yalnızca anıtta yazılı.",
        answer: "Only in the memorial is the name written.",
        hint: "Öne çıkan bir yer; „only“ onu sınırlamaya çeviriyor.",
      },
      {
        kind: "build",
        tr: "Cuma gününe kadar birleşme duyurulmuş olacak.",
        answer: "By Friday the merger will have been announced.",
        hint: "Edilgen ve gelecek bitmiş: will, have, been, üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Telif hakkı açık olsaydı dava şimdi kapanmış olurdu.",
        answer: "If the copyright had been clear, the case would be closed now.",
        hint: "Karışık koşul: sonuç bugünün masasında.",
      },
    ],
  },
];
