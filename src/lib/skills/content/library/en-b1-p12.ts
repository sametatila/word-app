import type { SkillExercise } from "../../types";

/**
 * EN · B1 — Beceriler kütüphanesi, parti 12.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `en-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 12 sahne ve yarışma hattı: amatör bir oyuncunun ilk gecesi, kupa
 * finaline çıkan bir köy takımı, bir dergi yarışması için öykü. Dil bilgisi
 * past perfect — geçmişteki iki olayın sırası.
 */
export const enB1P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-b1-lib-r12",
    course: "en",
    level: "B1",
    skill: "reading",
    title: "The Line I Had Practiced on the Bus",
    genre: "blog",
    intro: "Kırk dört yaşında ilk kez sahneye çıkan birinin blog yazısı: neden katıldı, ikinci perdede ne oldu, kim durumu kurtardı.",
    gloss: [
      { de: "stage", tr: "sahne" },
      { de: "play", tr: "oyun" },
      { de: "to drop out", tr: "bırakmak" },
      { de: "line", tr: "replik" },
      { de: "by accident", tr: "yanlışlıkla" },
      { de: "script", tr: "metin" },
      { de: "audience", tr: "seyirci" },
    ],
    minutes: 6,
    text:
      "Three weeks ago I stood on a stage for the first time in my life. I am forty-four, I work " +
      "in an accounts office, and until last spring I had never acted in anything, not even " +
      "a school play.\n\n" +
      "Our group performs two plays a year in the hall behind the library. I joined because " +
      "a friend had dropped out and they needed someone tall to play a policeman. I had four " +
      "lines. I practiced them on the bus, in the shower and, once, by accident, out loud " +
      "in a meeting.\n\n" +
      "On the first night everything went well until the second act. I walked on, opened my " +
      "mouth, and realized that the actor in front of me had already said half of my first line. " +
      "He had jumped a whole page. For about three seconds nobody on stage knew what to do.\n\n" +
      "Then the woman playing my wife did something I will never forget. She looked at me and " +
      "said, “You were going to tell me about the car, weren't you?” It wasn't in the script. " +
      "It gave me my second line, and the play continued as if nothing had happened.\n\n" +
      "Afterwards people in the audience told us it was the best scene of the evening. " +
      "Nobody had noticed a thing. I have signed up for the next play and asked for more lines, " +
      "but I have also asked to stand next to her.",
    questions: [
      {
        text: "What acting experience did the writer have before last spring?",
        options: ["none at all", "a few school plays", "one small part"],
        answer: 0,
        explain: "„until last spring I had never acted in anything, not even a school play“.",
      },
      {
        text: "Why did the writer join the group?",
        options: [
          "He wanted to meet new people.",
          "His office asked him to.",
          "Someone had left and they needed a tall actor.",
        ],
        answer: 2,
        explain: "Bir arkadaş gruptan ayrılmış ve polis rolü için uzun boylu biri gerekiyormuş.",
      },
      {
        kind: "truefalse",
        text: "The problem in the second act was the writer's mistake.",
        options: ["True", "False"],
        answer: 1,
        explain: "Hatayı karşısındaki oyuncu yapmış: bir sayfayı atlayıp onun repliğinin yarısını söylemiş.",
      },
      {
        kind: "gapfill",
        text: "The writer had ___ lines in the play.",
        options: [],
        answer: 0,
        accept: ["four", "4"],
        explain: "„I had four lines.“",
      },
      {
        kind: "short_answer",
        text: "Who saved the scene?",
        options: [],
        answer: 0,
        accept: ["the woman playing his wife", "the actress playing his wife", "his stage wife"],
        explain: "Karısını oynayan kadın metinde olmayan bir soru sorup ona ikinci repliğini vermiş.",
      },
      {
        text: "What did the audience think?",
        options: [
          "They noticed the mistake immediately.",
          "It was the best scene of the evening.",
          "The second act was too long.",
        ],
        answer: 1,
        explain: "„it was the best scene of the evening. Nobody had noticed a thing.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-b1-lib-l12",
    course: "en",
    level: "B1",
    skill: "listening",
    title: "Nine Hundred People and a Cup Final",
    genre: "interview",
    intro: "Bir spor programında küçük bir köyün antrenörü konuşuyor: takım finale nasıl çıktı, kulüp neden neredeyse kapanıyordu.",
    gloss: [
      { de: "coach", tr: "antrenör" },
      { de: "final", tr: "final" },
      { de: "to mind", tr: "umursamak" },
      { de: "season", tr: "sezon" },
      { de: "training", tr: "antrenman" },
      { de: "pitch", tr: "saha" },
      { de: "goalkeeper", tr: "kaleci" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Host", text: "This week: Little Ashby, a village of nine hundred people, whose football team reached the county cup final on Saturday. Their coach, Mr Barnes, is with me." },
      { speaker: "Mr Barnes", text: "Thanks. I should say first that we lost the final three–one. But nobody in the village seems to mind." },
      { speaker: "Host", text: "Why not?" },
      { speaker: "Mr Barnes", text: "Because until this season we had never won a single cup game. Two years ago we almost closed the club, because only eleven players had come to the first training." },
      { speaker: "Host", text: "So what changed?" },
      { speaker: "Mr Barnes", text: "A teacher at the school had started a girls' team, and the parents who came to watch their daughters started watching us as well. Suddenly there were people along the pitch." },
      { speaker: "Mr Barnes", text: "By the day of the final, the bus company had put on three extra buses. I'd never seen so many people from the village in one place, not even at a wedding." },
      { speaker: "Host", text: "And the final itself?" },
      { speaker: "Mr Barnes", text: "The other team came from a town of forty thousand. We were winning one–nil at half-time, which nobody had expected, least of all me." },
      { speaker: "Host", text: "And next season?" },
      { speaker: "Mr Barnes", text: "Same players, one new goalkeeper, and a promise to the girls' team: from now on they get the good pitch on Sundays." },
    ],
    questions: [
      {
        text: "What happened in the final?",
        options: ["The village won three–one.", "The village lost three–one.", "The game was canceled."],
        answer: 1,
        explain: "„we lost the final three–one“ — ama köyde kimse bunu dert etmiyor.",
      },
      {
        text: "Why did the club almost close two years ago?",
        options: [
          "Too few players came to training.",
          "The pitch was sold.",
          "The coach wanted to leave.",
        ],
        answer: 0,
        explain: "„only eleven players had come to the first training“.",
      },
      {
        kind: "truefalse",
        text: "Before this season, the team had never won a cup game.",
        options: ["True", "False"],
        answer: 0,
        explain: "„until this season we had never won a single cup game“.",
      },
      {
        kind: "gapfill",
        text: "The bus company put on ___ extra buses.",
        options: [],
        answer: 0,
        accept: ["three", "3"],
        explain: "„the bus company had put on three extra buses“.",
      },
      {
        kind: "short_answer",
        text: "Who started watching the men's team?",
        options: [],
        answer: 0,
        accept: ["the parents", "the girls' parents", "parents of the girls"],
        explain: "Kızlarını izlemeye gelen veliler erkek takımını da izlemeye başlamış.",
      },
      {
        text: "What has the club promised the girls' team?",
        options: ["new shirts for every player", "a second coach for training", "the good pitch on Sundays"],
        answer: 2,
        explain: "„from now on they get the good pitch on Sundays“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-b1-lib-w12",
    course: "en",
    level: "B1",
    skill: "writing",
    title: "Someone Had Been in the Flat",
    genre: "story",
    intro: "Bir dergi öykü yarışmasına katılıyorsun: önce iki cümle kur, sonra verilen cümleyle başlayan kısa bir öykü yaz.",
    gloss: [
      { de: "to realize", tr: "fark etmek" },
      { de: "to water", tr: "sulamak" },
      { de: "neat", tr: "düzenli" },
      { de: "missing", tr: "kayıp" },
      { de: "handwriting", tr: "el yazısı" },
      { de: "to lock", tr: "kilitlemek" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Eve geldiğimde birinin dairede bulunmuş olduğunu fark ettim.",
        answer: "When I got home, I realized that someone had been in the flat.",
        alternatives: ["I realized that someone had been in the flat when I got home."],
        hint: "Fark etmekten ÖNCE olan iş bir basamak geriye çekilir: had + üçüncü hâl.",
      },
      {
        kind: "build",
        tr: "O sabah kapıyı kilitlemeyi unutmuştum.",
        answer: "I had forgotten to lock the door that morning.",
        alternatives: ["That morning I had forgotten to lock the door."],
        hint: "Anlatının anından önceki unutma: had + forgotten; ardından „to“ + yalın fiil.",
      },
      {
        kind: "free",
        prompt:
          "Bir dergi yarışması için kısa bir öykü yaz. Öykün şu cümleyle başlamalı: „When I got home, I realized that someone had been in the flat.“ Neyin değiştiğini anlat, okuru kimin gelmiş olabileceği üzerine düşündür, bir sürprizle çöz ve kısa bir cümleyle bitir.",
        checklist: [
          "Verilen cümleyle başla",
          "Neyin değiştiğini somut ayrıntılarla anlat",
          "Daha önce olanları had + üçüncü hâl ile geriye çek",
          "Bir sürprizle çöz ve kısa bir cümleyle bitir",
        ],
        minWords: 100,
        phrases: [
          { de: "The first thing I noticed was …", tr: "İlk fark ettiğim şey …", en: "" },
          { de: "Someone had …", tr: "Biri …-mişti", en: "" },
          { de: "For a moment I thought …", tr: "Bir an … sandım", en: "" },
          { de: "It was only when … that I understood.", tr: "Ancak … olunca anladım.", en: "" },
          { de: "In the end, …", tr: "Sonunda …", en: "" },
        ],
        sample:
          "When I got home, I realized that someone had been in the flat. The first thing I noticed " +
          "was the smell of coffee, and I never drink coffee. Then I saw that someone had watered " +
          "the plants by the window, which had looked almost dead that morning, and had put my shoes " +
          "in a neat line by the door. " +
          "For a moment I thought I should call the police. Nothing was missing, though. My laptop " +
          "was still on the sofa, and my wallet was exactly where I had left it. " +
          "On the kitchen table there was a note in handwriting I knew very well: “You forgot our " +
          "lunch. I waited an hour. The key under the plant pot is not a secret, by the way.” " +
          "It was only when I read it a second time that I understood. My sister had come to town " +
          "for the day, and I had completely forgotten. " +
          "In the end, I bought her dinner, and I moved the key.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-b1-lib-s12",
    course: "en",
    level: "B1",
    skill: "speaking",
    title: "Should Children's Sport Keep Score?",
    genre: "monologue",
    intro: "Yaklaşık bir dakika tek başına konuşacaksın: tartışmalı bir kuralı kendi deneyiminle tart ve bir orta yol öner.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Çocuk sporlarında skor tutulmalı ve kazanan ilan edilmeli mi? Görüşünü söyle, kendi çocukluğundan ya da çevrenden bir örnek ver, karşı tarafın haklı olduğu noktayı kabul et ve bir orta yol öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Kendi çocukluğundan ya da çevrenden bir örnek ver",
        "Karşı tarafın haklı olduğu noktayı kabul et",
        "Bir orta yol öner",
      ],
      targets: [
        { de: "I think keeping score is fine, as long as …", tr: "Bence … olduğu sürece skor tutmak sorun değil" },
        { de: "When I was about ten, …", tr: "On yaşlarındayken …" },
        { de: "The other side has a point when they say …", tr: "Karşı taraf … dediğinde haklı" },
        { de: "A sensible middle way would be …", tr: "Makul bir orta yol … olurdu" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "I think keeping score is fine, as long as the adults care about it less than the children do. " +
        "Children count goals anyway. If you tell them the score doesn't exist, they simply keep it " +
        "in their heads and argue about it in the car on the way home. " +
        "When I was about ten, I played in a team that lost every game for a whole season. " +
        "I had expected to hate it, but I didn't, because our coach talked about one thing after " +
        "every match: what we had done better than the week before. By the spring we were losing " +
        "by fewer goals each time, and that felt almost like winning. " +
        "The other side has a point when they say that some parents shout at referees who are " +
        "twelve years old. That is a real problem, but it is a problem with parents, not with numbers. " +
        "A sensible middle way would be to keep the score but not to publish league tables for " +
        "children under eleven, so that nobody grows up at the bottom of a list.",
      rubricHint:
        "Görüş, kişisel bir örnek (past perfect ile geriye bakış), karşı görüşe ödün ve bir orta yol beklenir; „as long as“, „has a point when“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-b1-lib-g12",
    course: "en",
    level: "B1",
    skill: "grammar",
    title: "The train had already left",
    genre: "grammar",
    intro: "Geçmişi anlatırken ondan da ÖNCE olan bir şeyi göstermek gerekir; İngilizce bunu had + üçüncü hâl ile yapar.",
    focus: "Past perfect (simple): had + üçüncü hâl ve geçmişteki iki olayın sırası — continuous biçimi değil",
    gloss: [
      { de: "station", tr: "istasyon" },
      { de: "to recognize", tr: "tanımak" },
      { de: "to book", tr: "yer ayırtmak" },
      { de: "speech", tr: "konuşma" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Geçmişin geçmişi",
        tr: "Past perfect, geçmişteki bir andan ÖNCE tamamlanmış bir işi anlatır. Yapı her öznede aynıdır: „had + üçüncü hâl“, kısaltması „'d“. Türkçedeki „-mişti“ ekine yakındır: „Vardığımızda tren kalkmıştı.“",
        examples: [
          { de: "When we got to the station, the train had left.", tr: "İstasyona vardığımızda tren kalkmıştı.", note: "önce tren kalktı" },
          { de: "She'd already eaten, so she didn't come with us.", tr: "Zaten yemişti, bu yüzden bizimle gelmedi.", note: "'d = had" },
          { de: "I had never seen snow before that winter.", tr: "O kıştan önce hiç kar görmemiştim.", note: "o ana kadarki deneyim" },
        ],
      },
      {
        heading: "Sıra değişince anlam değişir",
        tr: "„When we arrived, the film started“ dersen önce vardınız, sonra film başladı. „When we arrived, the film had started“ dersen film siz gelmeden başlamıştı. Olaylar anlatıldığı sırayla oluyorsa past perfect gerekmez; yalnız sıra karışacaksa kullanılır.",
        examples: [
          { de: "When we arrived, the film started.", tr: "Biz varınca film başladı.", note: "sırayla" },
          { de: "When we arrived, the film had started.", tr: "Vardığımızda film başlamıştı.", note: "film daha önce" },
          { de: "I got up, had a shower and left.", tr: "Kalktım, duş aldım ve çıktım.", note: "sıra belli → past simple yeter" },
        ],
      },
      {
        heading: "Sebep, olumsuz ve soru",
        tr: "Geçmişteki bir durumun daha önceki sebebini verirken de kullanılır: „I was tired because I had slept badly.“ Olumsuzu „hadn't“, sorusu „Had you …?“ biçimindedir; üçüncü hâl düzensiz fiillerde ayrıca öğrenilir (see → seen, eat → eaten).",
        examples: [
          { de: "I was tired because I had slept badly.", tr: "Kötü uyuduğum için yorgundum.", note: "önceki sebep" },
          { de: "They hadn't booked a table, so they waited.", tr: "Masa ayırtmamışlardı, bu yüzden beklediler.", note: "olumsuz: hadn't" },
          { de: "Had you met her before the party?", tr: "Partiden önce onunla tanışmış mıydın?", note: "soru: had başa" },
        ],
      },
    ],
    questions: [
      {
        text: "When we got to the cinema, the film ___.",
        options: ["already starts", "has already started", "had already started"],
        answer: 2,
        explain: "Film bizim varışımızdan ÖNCE başlamıştı: had + üçüncü hâl.",
      },
      {
        text: "I didn't recognize him because he ___ his hair.",
        options: ["cuts", "had cut", "has cut"],
        answer: 1,
        explain: "Saç kesimi tanımamaktan önce oldu ve sebebini veriyor.",
      },
      {
        text: "Which sentence means the speech began BEFORE they arrived?",
        options: [
          "When they arrived, the speech had begun.",
          "When they arrived, the speech began.",
          "They arrived, and then the speech began.",
        ],
        answer: 0,
        explain: "„had begun“ konuşmanın onlar gelmeden başladığını söyler.",
      },
      {
        kind: "gapfill",
        text: "She ___ never flown before that trip. (have)",
        options: [],
        answer: 0,
        accept: ["had"],
        explain: "O yolculuğa kadarki deneyim: had + never + üçüncü hâl.",
      },
      {
        kind: "gapfill",
        text: "They ___ booked a table, so they had to wait. (negative)",
        options: [],
        answer: 0,
        accept: ["hadn't", "had not"],
        explain: "Past perfect olumsuzu „hadn't“ ile kurulur.",
      },
      {
        kind: "gapfill",
        text: "I was hungry because I hadn't ___ breakfast. (eat)",
        options: [],
        answer: 0,
        accept: ["eaten"],
        explain: "„eat“ fiilinin üçüncü hâli „eaten“dır.",
      },
      {
        kind: "gapfill",
        text: "___ you met her before the party?",
        options: [],
        answer: 0,
        accept: ["Had"],
        explain: "Soruda „had“ öznenin önüne geçer.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["When we got", "to the station,", "the train", "had left"],
        explain: "Varıştan önce olan kalkış past perfect ile söylenir.",
      },
      {
        kind: "truefalse",
        text: "„I got up, had a shower and left.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Olaylar anlatıldığı sırayla oluyor; past simple yeterli.",
      },
      {
        kind: "truefalse",
        text: "„She had never saw the sea before.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„had“ arkasından üçüncü hâl gelir: „She had never seen the sea before.“",
      },
    ],
  },
];
