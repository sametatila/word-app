import type { SkillExercise } from "../types";

/**
 * EN · B2 · Ünite 16 — "Katalog künyesi, sezon duyurusu, oyunun yaptığı,
 * sahnede bir ömür".
 *
 * Dört ders: The catalog entry · The season announcement ·
 * What the play does · A life on stage.
 *
 *   Kelime: canvas, artwork, exhibit, era, Renaissance, fragment,
 *           timeless, composer, screenplay, premiere, performer, critic,
 *           drama, tragedy, parody, context, worldview, contemporary,
 *           artistic, passion, rehearse, jury, fascinate, monotonous,
 *           applaud.
 *   Kalıp:  The restoration of the canvas took two years. ·
 *           The acquisition of the artwork is documented. ·
 *           The display of the exhibit begins in May. ·
 *           The composer is said to be sick. ·
 *           The screenplay is expected to change. ·
 *           The premiere is thought to have been delayed. ·
 *           What the drama does is name the cost. ·
 *           It was the tragedy that changed him. ·
 *           What a parody keeps is the context. ·
 *           Having watched her rehearse, the jury voted. ·
 *           Praised for years, the actor stayed modest. ·
 *           Wanting a new role, she left the company.
 *
 * Ünitenin tek öğretme noktası ORTAÇ SÜREKLİ ZAMAN DEĞİL. „I am wanting“
 * yanlış, çünkü „want“ bir durum fiili ve sürekli zaman almıyor; ama
 * „Wanting a new role, she left“ doğru, çünkü ortaç bir zaman değil.
 * Ortacın kendi zamanı yok; zamanını da öznesini de ana cümleden alıyor,
 * ve baştaki „-ing“ „she is leaving“deki „-ing“den başka bir iş görüyor.
 */
export const enB2U16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b2-u16-r1",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 16,
    title: "An actress leaves",
    genre: "article",
    intro: "Bir tiyatro haberi: tanınmış bir oyuncu on iki yıl sonra topluluktan ayrılıyor. Neden?",
    gloss: [
      { de: "a character", tr: "karakter" },
      { de: "throughout", tr: "boyunca" },
      { de: "a rehearsal", tr: "prova" },
      { de: "a scene", tr: "sahne" },
      { de: "a prize", tr: "ödül" },
      { de: "a production", tr: "yapım" },
      { de: "the stage", tr: "sahne" },
      { de: "autumn", tr: "sonbahar" },
      { de: "a farewell", tr: "veda" },
      { de: "famous", tr: "ünlü" },
    ],
    minutes: 9,
    text:
      "CITY THEATER: MAYA ROSS LEAVES AFTER TWELVE YEARS\n" +
      "Wanting a new role, Maya Ross has left the City Theater company, where she has performed since 2014. The news surprised many in the audience, but not her colleagues.\n" +
      "„Having played the same kind of character for years, she was ready for a change,“ says the director, Omar Bell. „Nobody here is angry. We are sad, but we understand.“\n" +
      "Praised for years by critics, Ross stayed modest throughout her career. She rarely gave interviews, and she always arrived first at rehearsals. Knowing the text perfectly, she often helped younger performers with their lines.\n" +
      "Her last performance, a tragedy set in a small fishing village, ended with ten minutes of applause. Having watched her rehearse the final scene, the jury of the national theater prize voted for her last spring.\n" +
      "Ross will join a film production in Canada next year. Asked about her plans, she said only: „I want to be afraid again. On stage here, I was never afraid.“\n" +
      "The theater has not yet named a replacement. Having lost its most famous performer, the company faces a difficult season, but ticket sales for the autumn remain strong.\n" +
      "A farewell evening, with scenes from her most famous roles, will take place on 3 June. Tickets are free but must be booked in advance.",
    questions: [
      {
        text: "Why did Maya Ross leave the company?",
        options: ["She wanted a new role.", "She was angry with the director.", "She wanted to teach."],
        answer: 0,
        explain: "„Wanting a new role, Maya Ross has left the City Theater company, where she has performed since 2014.“",
      },
      {
        text: "Where will Ross work next year?",
        options: ["in a film production in Canada", "in a theater in London", "at a drama school"],
        answer: 0,
        explain: "„Ross will join a film production in Canada next year.“",
      },
      {
        kind: "truefalse",
        text: "Ross often helped younger performers with their lines.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Knowing the text perfectly, she often helped younger performers with their lines.“",
      },
      {
        kind: "gapfill",
        text: "___ for years by critics, Ross stayed modest throughout her career.",
        options: [],
        answer: 0,
        accept: ["Praised", "praised"],
        explain: "„Praised for years by critics, Ross stayed modest throughout her career.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Maya Ross has left the company.",
          "The director says nobody is angry.",
          "Her last performance ended with long applause.",
          "A farewell evening will take place in June.",
        ],
        explain: "Ayrılık haberi, yönetmenin sözleri, son oyunu, en sonda veda gecesi.",
      },
      {
        kind: "short_answer",
        text: "When is the farewell evening?",
        options: [],
        answer: 0,
        accept: ["on 3 June", "3 June", "in June"],
        explain: "„A farewell evening, with scenes from her most famous roles, will take place on 3 June.“",
      },
    ],
  },
  {
    id: "en-b2-u16-r2",
    course: "en",
    level: "B2",
    skill: "reading",
    unit: 16,
    title: "Restoring a canvas",
    genre: "article",
    intro: "Müzenin duyurusu: iki yıllık restorasyondan sonra bir tablo geri dönüyor. Restorasyonda ne bulundu?",
    gloss: [
      { de: "a harbor", tr: "liman" },
      { de: "a restorer", tr: "restoratör" },
      { de: "an artist", tr: "ressam" },
      { de: "a sum", tr: "miktar" },
      { de: "education", tr: "eğitim" },
      { de: "varnish", tr: "vernik" },
      { de: "unexpected", tr: "beklenmedik" },
      { de: "a discovery", tr: "keşif" },
      { de: "nineteenth", tr: "on dokuzuncu" },
      { de: "a century", tr: "yüzyıl" },
      { de: "perhaps", tr: "belki" },
      { de: "a scene", tr: "sahne" },
      { de: "removal", tr: "kaldırılması" },
      { de: "a foundation", tr: "vakıf" },
      { de: "an analysis", tr: "analiz" },
      { de: "a stage", tr: "aşama" },
      { de: "discover", tr: "keşfetmek" },
    ],
    minutes: 9,
    text:
      "MUSEUM NEWS: THE RETURN OF THE HARBOR PAINTING\n" +
      "After two years in the workshop, the painting „The Harbor at Dawn“ is back on the wall of Room 4. The restoration of the canvas took longer than planned, and the result has surprised even our own experts.\n" +
      "The painting arrived at the museum in 1956. The acquisition of the artwork is documented in a letter from the daughter of the artist, who sold it for a small sum because she needed money for the education of her children.\n" +
      "When the restorers removed the old varnish, they made an unexpected discovery: a small boat, painted over by someone in the nineteenth century, perhaps to make the scene more peaceful. The removal of the later paint has brought the boat, and a tiny figure inside it, back into view.\n" +
      "The cost of the work was covered by a local foundation. The analysis of the paint, carried out at the university, also showed that the artist used cheaper colors than previously thought, which suggests that the painting was made at a difficult time in his life.\n" +
      "The display of the exhibit begins in May, together with photographs of each stage of the restoration. Visitors can also watch a short film about the discovery of the boat.\n" +
      "Entry to the room is free on Sundays. Guided tours in English and German take place every Saturday at 11:00.",
    questions: [
      {
        text: "What did the restorers discover?",
        options: ["a small boat", "a second signature", "a hidden letter"],
        answer: 0,
        explain: "„When the restorers removed the old varnish, they made an unexpected discovery: a small boat, painted over by someone in the nineteenth century…“",
      },
      {
        text: "Who paid for the work?",
        options: ["a local foundation", "the university", "the family of the artist"],
        answer: 0,
        explain: "„The cost of the work was covered by a local foundation.“",
      },
      {
        kind: "truefalse",
        text: "The artist used more expensive colors than people thought.",
        options: ["True", "False"],
        answer: 1,
        explain: "„the artist used cheaper colors than previously thought…“",
      },
      {
        kind: "gapfill",
        text: "The ___ of the canvas took longer than planned.",
        options: [],
        answer: 0,
        accept: ["restoration"],
        explain: "„The restoration of the canvas took longer than planned, and the result has surprised even our own experts.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "The painting is back in Room 4.",
          "The painting arrived at the museum in 1956.",
          "The restorers found a hidden boat.",
          "The display begins in May.",
        ],
        explain: "Dönüş, eserin geçmişi, keşif, en sonda sergi.",
      },
      {
        kind: "short_answer",
        text: "When are the guided tours?",
        options: [],
        answer: 0,
        accept: ["every Saturday at 11:00", "every Saturday", "on Saturdays"],
        explain: "„Guided tours in English and German take place every Saturday at 11:00.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b2-u16-l1",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 16,
    title: "News of a sick composer",
    genre: "dialogue",
    intro: "Bir orkestranın basın ofisinde iki çalışan açıklama hazırlıyor. Cuma konseri ne olacak?",
    gloss: [
      { de: "a statement", tr: "açıklama" },
      { de: "autumn", tr: "sonbahar" },
      { de: "an orchestra", tr: "orkestra" },
      { de: "a symphony", tr: "senfoni" },
      { de: "a rehearsal", tr: "prova" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Arda", text: "Pelin, the phones have not stopped. Everybody wants to know about the concert on Friday." },
      { speaker: "Pelin", text: "I know. What have we heard from the family of the composer?" },
      { speaker: "Arda", text: "Not much. The composer is said to be sick. Nobody has told us how serious it is." },
      { speaker: "Pelin", text: "Then we cannot say more than that. What about his new piece?" },
      { speaker: "Arda", text: "The screenplay for the film version is expected to change, so the music will probably be shorter. The director is thought to have asked for twenty minutes, not forty." },
      { speaker: "Pelin", text: "And the premiere of the piece?" },
      { speaker: "Arda", text: "The premiere is thought to have been delayed until the autumn. The concert hall has not confirmed it yet." },
      { speaker: "Pelin", text: "So the concert on Friday still happens?" },
      { speaker: "Arda", text: "Yes. The orchestra will play a Brahms symphony instead. Tickets remain valid, and anyone who wants a refund can have one." },
      { speaker: "Pelin", text: "Good. And the performers?" },
      { speaker: "Arda", text: "They were told this morning, together with the new rehearsal times. Rehearsals start at ten tomorrow." },
      { speaker: "Pelin", text: "Then let us write the statement. Short, polite, and no guessing about his health." },
    ],
    questions: [
      {
        text: "What is said about the composer?",
        options: ["He is sick.", "He has left the orchestra.", "He is writing a film."],
        answer: 0,
        explain: "„The composer is said to be sick.“",
      },
      {
        text: "What will the orchestra play on Friday?",
        options: ["a Brahms symphony", "the new piece", "music from the film"],
        answer: 0,
        explain: "„The orchestra will play a Brahms symphony instead.“",
      },
      {
        kind: "truefalse",
        text: "People who want their money back can get a refund.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Tickets remain valid, and anyone who wants a refund can have one.“",
      },
      {
        kind: "gapfill",
        text: "The screenplay for the film version is ___ to change.",
        options: [],
        answer: 0,
        accept: ["expected"],
        explain: "„The screenplay for the film version is expected to change, so the music will probably be shorter.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["The composer is said to be sick.", "The composer is said to be sick"],
        explain: "En zayıf aktarma: biri söyledi, o kadar.",
      },
      {
        kind: "short_answer",
        text: "When do rehearsals start tomorrow?",
        options: [],
        answer: 0,
        accept: ["at ten", "ten", "at 10"],
        explain: "„Rehearsals start at ten tomorrow.“",
      },
    ],
  },
  {
    id: "en-b2-u16-l2",
    course: "en",
    level: "B2",
    skill: "listening",
    unit: 16,
    title: "A new play about leaving home",
    genre: "review",
    intro: "Radyoda bir tiyatro eleştirisi: yeni oyun Salt. Eleştirmen neyi beğenmedi?",
    gloss: [
      { de: "salt", tr: "tuz" },
      { de: "appear", tr: "çıkmak" },
      { de: "a scene", tr: "sahne" },
      { de: "humor", tr: "mizah" },
      { de: "a comedy", tr: "komedi" },
      { de: "the stage", tr: "sahne" },
      { de: "history", tr: "tarih" },
      { de: "an actress", tr: "kadın oyuncu" },
    ],
    minutes: 7,
    segments: [
      { speaker: "İdil", text: "Good evening. Tonight I saw Salt, the new play at the Bristol Theater, and I want to tell you about it before the reviews appear in the papers." },
      { speaker: "İdil", text: "What the drama does is name the cost of leaving home. A family of four moves to a big city, and every scene shows what each of them loses." },
      { speaker: "İdil", text: "It was the tragedy in the second act that changed me. I will not tell you what happens, but the whole audience went silent." },
      { speaker: "İdil", text: "What surprised me was the humor. The first half is almost a parody of a family comedy, with jokes about the cooking of the mother and the old car of the father." },
      { speaker: "İdil", text: "And what a parody keeps is the context. Because we laugh at the family first, we know them, and the second act hurts much more." },
      { speaker: "İdil", text: "It is the young actor playing the son who carries the evening. He is on stage for almost two hours and never loses our attention." },
      { speaker: "İdil", text: "What I did not like was the ending. It is too long, and the final speech explains what we have already understood." },
      { speaker: "İdil", text: "But go and see it. It runs until the end of March, and tickets on Tuesdays are half price." },
    ],
    questions: [
      {
        text: "What does the play show?",
        options: ["the cost of leaving home", "a family holiday", "the history of the theater"],
        answer: 0,
        explain: "„What the drama does is name the cost of leaving home.“",
      },
      {
        text: "Who carries the evening?",
        options: ["the young actor playing the son", "the actress playing the mother", "the director"],
        answer: 0,
        explain: "„It is the young actor playing the son who carries the evening.“",
      },
      {
        kind: "truefalse",
        text: "The reviewer liked the ending.",
        options: ["True", "False"],
        answer: 1,
        explain: "„What I did not like was the ending.“",
      },
      {
        kind: "gapfill",
        text: "What the drama does is ___ the cost of leaving home.",
        options: [],
        answer: 0,
        accept: ["name"],
        explain: "„What the drama does is name the cost of leaving home.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["It was the tragedy in the second act that changed me.", "It was the tragedy in the second act that changed me"],
        explain: "Işık isme düşüyor, gerisi „that“ın arkasına gidiyor.",
      },
      {
        kind: "short_answer",
        text: "When are tickets half price?",
        options: [],
        answer: 0,
        accept: ["on Tuesdays", "Tuesdays", "Tuesday"],
        explain: "„It runs until the end of March, and tickets on Tuesdays are half price.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b2-u16-w1",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 16,
    title: "Life in a theater company",
    genre: "info",
    intro: "Tiyatro bülteni için notlar yaz: bir oyuncunun ayrılışını ve orkestradan gelen haberi aktar.",
    gloss: [
      { de: "none", tr: "hiçbiri" },
      { de: "wanting", tr: "istediği için" },
      { de: "having watched", tr: "izledikten sonra" },
      { de: "praised", tr: "övülen" },
      { de: "is said to be", tr: "olduğu söyleniyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Yeni bir rol istediği için topluluktan ayrıldı.",
        answer: "Wanting a new role, she left the company.",
        hint: "Ortaç sürekli zaman değil; durum fiili burada „-ing“ alabiliyor.",
      },
      {
        kind: "build",
        tr: "Onun provasını izledikten sonra jüri oy verdi.",
        answer: "Having watched her rehearse, the jury voted.",
        hint: "Önce olan iş: „having“ + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "Yıllarca övülen oyuncu alçakgönüllü kaldı.",
        answer: "Praised for years, the actor stayed modest.",
        hint: "Üçüncü hâlle başlıyor: edilgen ortaç.",
      },
      {
        kind: "build",
        tr: "Bestecinin hasta olduğu söyleniyor.",
        answer: "The composer is said to be sick.",
        hint: "„is said to“: biri söyledi, o kadar.",
      },
      {
        kind: "form",
        prompt: "Tiyatro bülteni için ayrılık kartını doldur.",
        facts: "Maya Ross yeni bir rol istediği için on iki yıl sonra topluluktan ayrıldı; eleştirmenler onu yıllarca övdü ama o hep alçakgönüllü kaldı; seneye Kanada'da bir filmde oynayacak; veda gecesi 3 Haziran'da.",
        fields: [
          { label: "Actress", answer: "Maya Ross", accept: ["Ross"] },
          { label: "Reason for leaving", answer: "wanting a new role", accept: ["a new role", "she wanted a new role"] },
          { label: "Critics", answer: "praised her for years", accept: ["praised her", "praise"] },
          { label: "Next job", answer: "a film in Canada", accept: ["film in Canada", "Canada"] },
          { label: "Farewell evening", answer: "3 June", accept: ["on 3 June", "June 3"] },
        ],
      },
    ],
  },
  {
    id: "en-b2-u16-w2",
    course: "en",
    level: "B2",
    skill: "writing",
    unit: 16,
    title: "Museum notes",
    genre: "info",
    intro: "Müze ve tiyatro duyuruları için cümleler kur: restorasyonu, sergiyi ve ertelenen galayı bildir.",
    gloss: [
      { de: "the restoration", tr: "restorasyonu" },
      { de: "the acquisition", tr: "edinimi" },
      { de: "the display", tr: "teşhiri" },
      { de: "is expected to", tr: "olması bekleniyor" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Tuvalin restorasyonu iki yıl sürdü.",
        answer: "The restoration of the canvas took two years.",
        hint: "Fiil isme dönüyor: „restore“ → „restoration“.",
      },
      {
        kind: "build",
        tr: "Sanat eserinin edinimi belgelenmiş durumda.",
        answer: "The acquisition of the artwork is documented.",
        hint: "„acquire“ → „acquisition“; kimse bunu tahmin etmiyor.",
      },
      {
        kind: "build",
        tr: "Sergi eserinin teşhiri mayısta başlıyor.",
        answer: "The display of the exhibit begins in May.",
        hint: "Üçüncü tür: fiil zaten isim, eki yok.",
      },
      {
        kind: "build",
        tr: "Film senaryosunun değişmesi bekleniyor.",
        answer: "The screenplay is expected to change.",
        hint: "„is expected to“ ileriye bakıyor.",
      },
      {
        kind: "build",
        tr: "Galanın ertelendiği düşünülüyor.",
        answer: "The premiere is thought to have been delayed.",
        hint: "Tutulan bir görüş; mastar geçmişe bakıyor.",
      },
    ],
  },
];
