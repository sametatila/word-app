import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 2 — "Hikâye, eskiden, çocukluk, tatil".
 *
 * Dört ders: Telling a story · I used to... · My childhood ·
 * A holiday I remember.
 *
 *   Kelime: first, then, after that, finally, because, at first,
 *           afterwards, that's why, use, school, child, play, live,
 *           primary school, kindergarten, grown-up, grow up, village,
 *           neighbour, toy, remember, memory, doll, yard, travel, beach,
 *           flight, hotel, enjoy, suitcase, island, hostel.
 *   Kalıp:  First I …, then I … · After that, … · I was tired, so I … ·
 *           I used to play football. · I didn't use to like coffee. ·
 *           Did you use to play the guitar? · I used to … ·
 *           When I was a child, … · I grew up in … ·
 *           I went to Antalya last summer. ·
 *           We stayed at a hotel for five days. ·
 *           The weather was hot and the beach was beautiful.
 *
 * „used to“ geçmişte SÜRMÜŞ ama artık olmayan bir alışkanlık anlatıyor ve
 * İngilizcede başka hiçbir şey bu işi görmüyor. Türkçede „-ardı/-erdi“ eki
 * aynı işi görüyor ama geniş zamanla aynı köke bağlı, o yüzden öğrenci
 * „I played football“ diyip alışkanlık anlamını kaybediyor. İçerik ikisini
 * karşılaştırmıyor — yalnız „used to“yu üç biçimde de kuruyor.
 */
export const enA2U02: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u2-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 2,
    title: "My childhood",
    genre: "personal",
    intro: "Bir çocukluk anlatısı. Eskiden ne vardı, sonra ne değişti?",
    gloss: [
      { de: "move", tr: "taşınmak" },
      { de: "winter", tr: "kış" },
      { de: "know", tr: "bilmek" },
      { de: "loud", tr: "gürültülü" },
      { de: "library", tr: "kütüphane" },
    ],
    minutes: 5,
    text:
      "I grew up in a small village near the sea. When I was a child, we didn't have a computer and I didn't use to watch television.\n\n" +
      "First I went to kindergarten in the village, then to the primary school in the next town. Every morning we walked twenty minutes, and in the winter it was very cold.\n\n" +
      "I used to play football in the yard with the children of our neighbours. My sister used to play with her doll and she used to shout at us because we were loud.\n\n" +
      "After that, when I was ten, we moved to the city. At first I didn't like it. The new school was big and I didn't know anybody.\n\n" +
      "But I remember one good thing: the city had a library. I used to read there every afternoon.",
    questions: [
      {
        text: "Where did the writer grow up?",
        options: ["in a small village", "in the city", "in the next town"],
        answer: 0,
        explain: "„I grew up in a small village near the sea.“ — ilkokul yan kasabada, şehir sonra geliyor.",
      },
      {
        text: "What did the writer's sister use to do?",
        options: ["play with her doll", "play football", "read in the library"],
        answer: 0,
        explain: "„My sister used to play with her doll…“ — futbol ve kütüphane yazarın.",
      },
      {
        kind: "truefalse",
        text: "The writer did not like the city at first.",
        options: ["True", "False"],
        answer: 0,
        explain: "„At first I didn't like it.“ — „at first“ sonradan değiştiğini söylüyor.",
      },
      {
        kind: "gapfill",
        text: "The family moved to the city when the writer was ___.",
        options: [],
        answer: 0,
        accept: ["ten", "10"],
        explain: "„After that, when I was ten, we moved to the city.“",
      },
      {
        kind: "short_answer",
        text: "What did the writer use to do in the library?",
        options: [],
        answer: 0,
        accept: ["read", "read every afternoon", "he used to read"],
        explain: "„I used to read there every afternoon.“",
      },
    ],
  },
  {
    id: "en-a2-u2-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 2,
    title: "A holiday I remember",
    genre: "story",
    intro: "Bir tatil anlatısı. Sıralama sözcüklerini takip et: first, then, after that, finally.",
    gloss: [
      { de: "shade", tr: "gölge" },
      { de: "holiday", tr: "tatil" },
      { de: "island", tr: "ada" },
    ],
    minutes: 5,
    text:
      "I went to Antalya last summer with two friends. It was my first flight.\n\n" +
      "First we took a taxi to the airport. Then we waited two hours because the plane was late. At first I was angry, but afterwards it was fine.\n\n" +
      "We stayed at a small hotel for five days. The weather was hot and the beach was beautiful. Every morning we swam in the sea, and after that we ate fruit in the shade.\n\n" +
      "One day we took a boat to an island. While we were on the boat, a big fish jumped out of the water. My friend was wearing a white shirt and the water made it wet. That's why we have a funny photo of that day.\n\n" +
      "I enjoyed the holiday very much. Next year I want to go again.",
    questions: [
      {
        text: "Why did they wait two hours?",
        options: ["the plane was late", "the taxi was late", "the hotel was full"],
        answer: 0,
        explain: "„Then we waited two hours because the plane was late.“",
      },
      {
        text: "How long did they stay at the hotel?",
        options: ["five days", "two hours", "one day"],
        answer: 0,
        explain: "„We stayed at a small hotel for five days.“ — iki saat uçağın rötarı.",
      },
      {
        kind: "truefalse",
        text: "It was the writer's first flight.",
        options: ["True", "False"],
        answer: 0,
        explain: "„It was my first flight.“",
      },
      {
        kind: "gapfill",
        text: "They took a boat to an ___.",
        options: [],
        answer: 0,
        accept: ["island"],
        explain: "„One day we took a boat to an island.“",
      },
      {
        kind: "order",
        text: "Tatilin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "First we took a taxi to the airport.",
          "Then we waited two hours.",
          "We stayed at a small hotel for five days.",
          "One day we took a boat to an island.",
        ],
        explain: "„First“, „then“ ve „one day“ sırayı açıkça veriyor.",
      },
      {
        kind: "short_answer",
        text: "What jumped out of the water?",
        options: [],
        answer: 0,
        accept: ["a big fish", "a fish", "fish"],
        explain: "„While we were on the boat, a big fish jumped out of the water.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u2-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 2,
    title: "I used to …",
    genre: "dialogue",
    intro: "Eski alışkanlıklar konuşuluyor. „used to“nun üç biçimi de geçiyor.",
    gloss: [
      { de: "used to", tr: "eskiden" },
      { de: "memory", tr: "hafıza" },
      { de: "coach", tr: "antrenör" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Mert", text: "Did you use to play the guitar?" },
      { speaker: "Ela", text: "Yes, when I was a child. I used to play every day." },
      { speaker: "Mert", text: "And now?" },
      { speaker: "Ela", text: "Now I don't have time. But my son plays." },
      { speaker: "Mert", text: "I used to play football, but I didn't use to like it." },
      { speaker: "Ela", text: "Really? Why did you play?" },
      { speaker: "Mert", text: "Because my father was the coach! Every Saturday we went to the field." },
      { speaker: "Ela", text: "And your mother?" },
      { speaker: "Mert", text: "She used to make big dinners for the team. Twenty children in our yard!" },
      { speaker: "Ela", text: "That is a good memory." },
      { speaker: "Mert", text: "Yes. I didn't use to like football, but I remember those days." },
      { speaker: "Ela", text: "Then come with us on Sunday. My son has a game." },
    ],
    questions: [
      {
        text: "What did Ela use to do?",
        options: ["play the guitar", "play football", "make dinners"],
        answer: 0,
        explain: "„Yes, when I was a child. I used to play every day.“ — futbol Mert'in.",
      },
      {
        text: "Why did Mert play football?",
        options: ["his father was the coach", "he liked it", "his mother wanted it"],
        answer: 0,
        explain: "„Because my father was the coach!“ — sevmediğini iki kez söylüyor.",
      },
      {
        kind: "truefalse",
        text: "Mert used to play football without liking it.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I used to play football, but I didn't use to like it.“",
      },
      {
        kind: "gapfill",
        text: "Mert's mother used to make big ___.",
        options: [],
        answer: 0,
        accept: ["dinners"],
        explain: "„She used to make big dinners for the team.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I used to play every day.", "I used to play every day"],
        explain: "„I used to play every day.“ — olumluda „used“, olumsuz ve soruda „use“.",
      },
      {
        kind: "short_answer",
        text: "What does Ela's son have on Sunday?",
        options: [],
        answer: 0,
        accept: ["a game", "game", "a football game"],
        explain: "„Then come with us on Sunday. My son has a game.“",
      },
    ],
  },
  {
    id: "en-a2-u2-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 2,
    title: "First, then, after that",
    genre: "monologue",
    intro: "Uzun bir günün anlatısı. Sıralama sözcükleri hikâyeyi taşıyor.",
    gloss: [
      { de: "flat", tr: "daire" },
      { de: "book", tr: "kitap" },
      { de: "suitcase", tr: "bavul" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Kaan", text: "Last Saturday was a long day. First I got up at six." },
      { speaker: "Kaan", text: "Then I took the bus to the airport. My sister was coming from Italy." },
      { speaker: "Kaan", text: "The flight was two hours late, so I waited in a café and I read a book." },
      { speaker: "Kaan", text: "After that she came out with two suitcases. One was very heavy!" },
      { speaker: "Kaan", text: "We took a taxi to the hotel because her flat was not ready." },
      { speaker: "Kaan", text: "Finally we ate in a small restaurant near the beach. I was tired, so I went home at nine." },
    ],
    questions: [
      {
        text: "What did Kaan do first?",
        options: ["he got up at six", "he took the bus", "he read a book"],
        answer: 0,
        explain: "„First I got up at six.“ — otobüs ikinci, kitap bekleme sırasında.",
      },
      {
        text: "Why did they go to the hotel?",
        options: ["her flat was not ready", "the airport was closed", "the restaurant was full"],
        answer: 0,
        explain: "„We took a taxi to the hotel because her flat was not ready.“",
      },
      {
        kind: "truefalse",
        text: "The flight was on time.",
        options: ["True", "False"],
        answer: 1,
        explain: "„The flight was two hours late, so I waited in a café…“",
      },
      {
        kind: "gapfill",
        text: "His sister came out with two ___.",
        options: [],
        answer: 0,
        accept: ["suitcases"],
        explain: "„After that she came out with two suitcases. One was very heavy!“",
      },
      {
        kind: "order",
        text: "Günün sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "First I got up at six.",
          "Then I took the bus to the airport.",
          "After that she came out with two suitcases.",
          "Finally we ate in a small restaurant.",
        ],
        explain: "Dört sıralama sözcüğü dört adımı işaretliyor: first, then, after that, finally.",
      },
      {
        kind: "short_answer",
        text: "When did Kaan go home?",
        options: [],
        answer: 0,
        accept: ["at nine", "nine", "9"],
        explain: "„I was tired, so I went home at nine.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u2-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 2,
    title: "I used to …",
    genre: "personal",
    intro: "Eski alışkanlıkları yaz. Olumluda „used“, olumsuz ve soruda „use“.",
    gloss: [
      { de: "I used to …", tr: "eskiden … ederdim" },
      { de: "I didn't use to …", tr: "eskiden … etmezdim" },
      { de: "I grew up in …", tr: "…'de büyüdüm" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Eskiden futbol oynardım.",
        answer: "I used to play football.",
        hint: "„used to“ artık olmayan bir alışkanlık söylüyor; sonrası eksiz fiil.",
      },
      {
        kind: "build",
        tr: "Eskiden kahveyi sevmezdim.",
        answer: "I didn't use to like coffee.",
        hint: "Olumsuzda „didn't“ geçmişi taşıyor ve „used“ → „use“ olur.",
      },
      {
        kind: "build",
        tr: "Eskiden gitar çalar mıydın?",
        answer: "Did you use to play the guitar?",
        hint: "Soruda da aynı: „did“ varken „use“, „used“ değil.",
      },
      {
        kind: "build",
        tr: "Bir köyde büyüdüm.",
        answer: "I grew up in a village.",
        hint: "„grow up“ iki parçalı ve „grow“ düzensiz: grew.",
      },
      {
        kind: "form",
        prompt: "Çocukluk kartını doldur.",
        facts: "Deniz kenarında küçük bir köy; anaokulu köyde; ilkokul yan kasabada; on yaşında şehre taşındı.",
        fields: [
          { label: "Place", answer: "a small village", accept: ["village"] },
          { label: "Kindergarten", answer: "in the village", accept: ["village"] },
          { label: "School", answer: "in the next town", accept: ["the next town"] },
          { label: "Moved", answer: "at ten", accept: ["ten", "at the age of ten"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u2-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 2,
    title: "First I …, then I …",
    genre: "story",
    intro: "Bir tatil anlat. Sıralama sözcükleri cümleleri birbirine bağlıyor.",
    gloss: [
      { de: "First I …, then I …", tr: "önce …, sonra …" },
      { de: "We stayed at …", tr: "…'de kaldık" },
      { de: "so", tr: "bu yüzden" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Geçen yaz Antalya'ya gittim.",
        answer: "I went to Antalya last summer.",
        hint: "Zaman ifadesi sonda: „last summer“. „go“ düzensiz: went.",
      },
      {
        kind: "build",
        tr: "Beş gün bir otelde kaldık.",
        answer: "We stayed at a hotel for five days.",
        hint: "Otelde kalmak „stay at“ ile; süre „for“ ile geliyor.",
      },
      {
        kind: "build",
        tr: "Hava sıcaktı ve plaj güzeldi.",
        answer: "The weather was hot and the beach was beautiful.",
        hint: "İki tekil özne, iki „was“. „weather“ hep „the“ ile.",
      },
      {
        kind: "build",
        tr: "Önce yürüdüm, sonra otobüse bindim.",
        answer: "First I walked, then I took the bus.",
        hint: "„first“ ve „then“ virgülle ayrılıyor; her ikisinde de özne tekrarlanıyor.",
      },
      {
        kind: "build",
        tr: "Yorgundum, bu yüzden eve gittim.",
        answer: "I was tired, so I went home.",
        hint: "„so“ sonucu söylüyor; „because“ ise sebebi. İkisi ters yönde.",
      },
    ],
  },
];
