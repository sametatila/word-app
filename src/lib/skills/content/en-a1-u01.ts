import type { SkillExercise } from "../types";

/**
 * EN · A1 · Ünite 1 — "Tanışma ve ben" (Patika tema-hizalı içerik).
 *
 * İNGİLİZCE KURSUN İLK ÜNİTE EGZERSİZLERİ. Almanca kursun `a1-u01.ts`
 * dosyasının karşılığı; ölçü de aynı: bu ünitenin dört dersi (Hello! ·
 * How are you? · I am, you are · Where are you from?) yalnızca şunları
 * öğretir ve içerik BUNUN DIŞINA çıkmaz:
 *
 *   Kelime: hello, name, from, live, meet, goodbye, excuse me, very, how,
 *           you, good, fine, thanks, happy, sad, ill, be, not, teacher,
 *           student, tired, married, hungry, thirsty, where, country, city,
 *           born, come, town, north, world.
 *   Kalıp:  My name is … · I'm from … · I live in … · How are you? ·
 *           I'm fine, thanks. · And you? · I am … / I'm … ·
 *           You are not … / You aren't … · Are you …? ·
 *           Where are you from? · Where do you live?
 *
 * Bunun dışında yalnız özel adlar (kişi, şehir, ülke) ve birkaç zorunlu bağ
 * sözcüğü geçer — hepsi sözlükçede verilir, ölçüsü `npm run
 * check:en-unitvocab -- a1`.
 *
 * Almanca dosyadan AYRILAN yer soru tipleri: orada ilk ünitede dikte yoktu,
 * burada var (`l1`). Gerekçe İngilizcenin kendi zorluğu: „I am a teacher“
 * söylendiğinde „I'm a teacher“ duyuluyor ve öğrenci bunu ilk günden ayırt
 * etmek zorunda — Almancada bu ünitede böyle bir büzülme yok.
 *
 * Yerleşim: `en-a1.ts` içinde EN BAŞTA durur → builder ünite 1'in
 * okuma/dinleme/yazma slotlarını (konuma göre) bunlarla doldurur.
 */
export const enA1U01: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-u1-r1",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 1,
    title: "Three names",
    genre: "profile",
    intro: "Üç kişi kendini tanıtıyor. Herkes adını, nereli olduğunu ve nerede yaşadığını söylüyor.",
    gloss: [
      { de: "big", tr: "büyük" },
      { de: "Spain", tr: "İspanya" },
      { de: "Ireland", tr: "İrlanda" },
    ],
    minutes: 3,
    text:
      "Hello! My name is Deniz. I am from Turkey. I live in Izmir. Izmir is a big city. I am a student. I am not married.\n\n" +
      "Hello! My name is Ana. I am from Spain. I live in a town in the north. I am a teacher. I am very happy here.\n\n" +
      "Hello! My name is Tom. I am from Ireland. I am not from Turkey, but I live in Turkey now. My city is Izmir too. Deniz and I meet on Friday.",
    questions: [
      {
        text: "Where is Deniz from?",
        options: ["Turkey", "Spain", "Ireland"],
        answer: 0,
        explain: "„I am from Turkey.“ — Deniz Türkiye'den. Spain Ana'nın, Ireland Tom'un ülkesi.",
      },
      {
        text: "Who is a teacher?",
        options: ["Ana", "Deniz", "Tom"],
        answer: 0,
        explain: "„I am a teacher.“ satırı Ana'nın paragrafında. Deniz öğrenci, Tom ne olduğunu söylemiyor.",
      },
      {
        kind: "truefalse",
        text: "Deniz is not married.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I am not married.“ — „not“ cümleyi olumsuz yapıyor, yani evli değil.",
      },
      {
        kind: "gapfill",
        text: "Ana lives in a town in the ___.",
        options: [],
        answer: 0,
        accept: ["north"],
        explain: "„I live in a town in the north.“ — kuzeyde bir kasabada.",
      },
      {
        kind: "short_answer",
        text: "Where does Tom live now?",
        options: [],
        answer: 0,
        accept: ["Turkey", "in Turkey", "Izmir", "in Izmir"],
        explain: "„I am not from Turkey, but I live in Turkey now.“ — Tom İrlandalı ama Türkiye'de yaşıyor.",
      },
    ],
  },
  {
    id: "en-a1-u1-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    unit: 1,
    title: "Are you a student here?",
    genre: "dialogue",
    intro: "Mert ile Lena ilk kez tanışıyor. Kısa bir selamlaşma, tanışma ve hal hatır sorma.",
    gloss: [
      { de: "a little", tr: "biraz" },
      { de: "See you", tr: "görüşürüz" },
      { de: "Germany", tr: "Almanya" },
    ],
    minutes: 4,
    text:
      "Mert: Hello! Excuse me, are you a student here?\n" +
      "Lena: Hi! Yes, I am. My name is Lena.\n" +
      "Mert: I am Mert. Where are you from, Lena?\n" +
      "Lena: I am from Germany. I live in Bremen. And you?\n" +
      "Mert: I am from Turkey. I live in this town now.\n" +
      "Lena: How are you today?\n" +
      "Mert: I am fine, thanks. But I am very hungry! And you?\n" +
      "Lena: I am not hungry, I am thirsty. And I am a little tired.\n" +
      "Mert: Are you a teacher too?\n" +
      "Lena: No, I am not a teacher. I am a student.\n" +
      "Mert: Good! See you on Monday. Goodbye!\n" +
      "Lena: Goodbye, Mert!",
    questions: [
      {
        text: "Where is Lena from?",
        options: ["Germany", "Turkey", "Ireland"],
        answer: 0,
        explain: "„I am from Germany. I live in Bremen.“ — ülke Almanya, şehir Bremen.",
      },
      {
        text: "How is Mert today?",
        options: ["fine, but hungry", "ill and sad", "tired and thirsty"],
        answer: 0,
        explain: "„I am fine, thanks. But I am very hungry!“ — yorgun ve susamış olan Lena.",
      },
      {
        kind: "truefalse",
        text: "Lena is a teacher.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, I am not a teacher. I am a student.“ — öğretmen değil, öğrenci.",
      },
      {
        kind: "gapfill",
        text: "Lena lives in ___.",
        options: [],
        answer: 0,
        accept: ["Bremen"],
        explain: "„I live in Bremen.“ — Almanya ülkesi, Bremen şehri; boşluğa şehir giriyor.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Are you a student here?",
          "My name is Lena.",
          "Where are you from, Lena?",
          "I am from Germany.",
        ],
        explain: "Önce soru, sonra ad, sonra „nerelisin“, sonra ülke. Tanışma hep bu sırayla gidiyor.",
      },
      {
        kind: "short_answer",
        text: "Is Mert from Turkey?",
        options: [],
        answer: 0,
        accept: ["Yes", "Yes, he is", "yes he is", "Yes, I am"],
        explain: "„I am from Turkey.“ — evet. Kısa cevap „Yes, he is.“ biçiminde kurulur.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-u1-l1",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 1,
    title: "My name is Ava",
    genre: "profile",
    intro: "Ava kendini tanıtıyor. Dinlerken üç şeye dikkat et: nereli, nerede yaşıyor, ne iş yapıyor.",
    gloss: [
      { de: "small", tr: "küçük" },
      { de: "big", tr: "büyük" },
      { de: "was born", tr: "doğdu" },
      { de: "husband", tr: "koca" },
      { de: "a little", tr: "biraz" },
    ],
    minutes: 3,
    segments: [
      { speaker: "Ava", text: "Hello! My name is Ava. I am from Canada." },
      { speaker: "Ava", text: "I was born in a small town in the north. My town is not big." },
      { speaker: "Ava", text: "Now I live in Istanbul. Istanbul is a big city in Turkey." },
      { speaker: "Ava", text: "I am a teacher here. I am not a student." },
      { speaker: "Ava", text: "I am married. My husband is from Turkey." },
      { speaker: "Ava", text: "Today I am a little tired, but I am very happy. Goodbye!" },
    ],
    questions: [
      {
        text: "Where is Ava from?",
        options: ["Canada", "Turkey", "Germany"],
        answer: 0,
        explain: "„I am from Canada.“ — Türkiye yaşadığı yer, geldiği yer değil.",
      },
      {
        text: "What is Ava?",
        options: ["a teacher", "a student", "a teacher in Canada"],
        answer: 0,
        explain: "„I am a teacher here.“ — „here“ İstanbul demek, yani Kanada'da değil burada öğretmen.",
      },
      {
        kind: "truefalse",
        text: "Ava is married.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I am married. My husband is from Turkey.“ — evli; hüküm yanlış.",
      },
      {
        kind: "gapfill",
        text: "Ava lives in ___ now.",
        options: [],
        answer: 0,
        accept: ["Istanbul"],
        explain: "„Now I live in Istanbul.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I am a teacher here.", "I am a teacher here", "I'm a teacher here."],
        explain: "„I am a teacher here.“ Konuşmada „I am“ çoğu zaman „I'm“ gibi duyulur; ikisi de aynı cümle.",
      },
      {
        kind: "short_answer",
        text: "Where was Ava born?",
        options: [],
        answer: 0,
        accept: ["in a small town", "a small town", "in the north", "in a town in the north"],
        explain: "„I was born in a small town in the north.“ — kuzeyde küçük bir kasabada.",
      },
    ],
  },
  {
    id: "en-a1-u1-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    unit: 1,
    title: "Excuse me, are you Mr. Kaya?",
    genre: "dialogue",
    intro: "Resmî bir tanışma. Dikkat: burada ad değil, „Mr.“ ve „Ms.“ ile soyadı kullanılıyor.",
    gloss: [
      { de: "Nice to meet you", tr: "memnun oldum" },
      { de: "Italy", tr: "İtalya" },
      { de: "big", tr: "büyük" },
      { de: "a little", tr: "biraz" },
      { de: "See you", tr: "görüşürüz" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Woman", text: "Excuse me. Are you Mr. Kaya?" },
      { speaker: "Mr. Kaya", text: "Yes, I am. Good morning!" },
      { speaker: "Woman", text: "Good morning. My name is Sofia Rossi." },
      { speaker: "Mr. Kaya", text: "Nice to meet you, Ms. Rossi. Where are you from?" },
      { speaker: "Ms. Rossi", text: "I am from Italy, but I live in Ankara now." },
      { speaker: "Mr. Kaya", text: "Ankara is a big city. Are you a student here?" },
      { speaker: "Ms. Rossi", text: "No, I am not a student. I am a teacher." },
      { speaker: "Mr. Kaya", text: "And how are you today?" },
      { speaker: "Ms. Rossi", text: "I am fine, thanks. And you?" },
      { speaker: "Mr. Kaya", text: "I am a little tired, but I am happy." },
      { speaker: "Ms. Rossi", text: "Goodbye, Mr. Kaya." },
      { speaker: "Mr. Kaya", text: "Goodbye, Ms. Rossi. See you on Friday!" },
    ],
    questions: [
      {
        text: "What is the name of the teacher?",
        options: ["Sofia Rossi", "Mr. Kaya", "Ankara"],
        answer: 0,
        explain: "İki satırı birleştir: „I am a teacher.“ diyen kişi „My name is Sofia Rossi.“ diyen kişi. Ankara şehir, kişi değil.",
      },
      {
        text: "Where does Ms. Rossi live now?",
        options: ["in Ankara", "in Italy", "in Izmir"],
        answer: 0,
        explain: "„I am from Italy, but I live in Ankara now.“ — İtalya geldiği yer, Ankara yaşadığı yer.",
      },
      {
        kind: "truefalse",
        text: "Ms. Rossi is a student.",
        options: ["True", "False"],
        answer: 1,
        explain: "„No, I am not a student. I am a teacher.“",
      },
      {
        kind: "gapfill",
        text: "Ms. Rossi is from ___.",
        options: [],
        answer: 0,
        accept: ["Italy"],
        explain: "„I am from Italy…“ — ülke İtalya.",
      },
      {
        kind: "order",
        text: "Konuşmanın sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Excuse me. Are you Mr. Kaya?",
          "My name is Sofia Rossi.",
          "Where are you from?",
          "I am from Italy.",
        ],
        explain: "Önce kim olduğunu doğrular, sonra adını söyler, sonra soru gelir, en son ülke.",
      },
      {
        kind: "short_answer",
        text: "How is Mr. Kaya today?",
        options: [],
        answer: 0,
        accept: ["a little tired", "tired", "tired but happy", "a little tired but happy"],
        explain: "„I am a little tired, but I am happy.“ — biraz yorgun ama mutlu.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-u1-w1",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 1,
    title: "I introduce myself",
    genre: "profile",
    intro: "Kendini tanıtmayı yazarak çalış. Önce parçaları birleştir, sonra tanışma kartını doldur.",
    gloss: [
      { de: "My name is …", tr: "benim adım …" },
      { de: "I am from …", tr: "ben …'denim" },
      { de: "I live in …", tr: "…'de yaşıyorum" },
    ],
    minutes: 5,
    tasks: [
      {
        kind: "build",
        tr: "Benim adım Lena.",
        answer: "My name is Lena.",
        hint: "„My name is …“ + ad. İngilizcede özne düşmez: „My name“ olmadan cümle kurulmaz.",
      },
      {
        kind: "build",
        tr: "Ben Türkiye'denim.",
        answer: "I am from Turkey.",
        alternatives: ["I'm from Turkey."],
        hint: "Ülke için „from“: I am from + ülke. Kısası „I'm from …“.",
      },
      {
        kind: "build",
        tr: "İzmir'de yaşıyorum.",
        answer: "I live in Izmir.",
        hint: "Şehir için „in“: I live in + şehir. „from“ geldiğin yeri, „in“ yaşadığın yeri söyler.",
      },
      {
        kind: "build",
        tr: "Ben öğretmen değilim.",
        answer: "I am not a teacher.",
        alternatives: ["I'm not a teacher."],
        hint: "Olumsuzluk „not“ ile ve fiilden SONRA: am + not. Meslekten önce „a“ gerekir.",
      },
      {
        kind: "form",
        prompt: "Tanışma kartını Ali için doldur.",
        facts: "Ali Demir; Türkiye'den; şu an Bremen'de yaşıyor.",
        fields: [
          { label: "Name", answer: "Ali Demir", accept: ["Ali", "Demir"] },
          { label: "Country", answer: "Turkey" },
          { label: "City", answer: "Bremen" },
        ],
      },
    ],
  },
  {
    id: "en-a1-u1-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    unit: 1,
    title: "Questions and answers",
    genre: "profile",
    intro: "Soru sormayı ve olumsuz cümleyi yaz. İngilizcede soru, „be“ fiilinin öne geçmesiyle kurulur.",
    gloss: [
      { de: "How are you?", tr: "nasılsın" },
      { de: "Where are you from?", tr: "nerelisin" },
      { de: "thanks", tr: "teşekkürler" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Nasılsın?",
        answer: "How are you?",
        hint: "Soru sözcüğü „how“ başta, sonra „are you“. Sıra hep böyle.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi olumsuz yap.",
        source: "You are a student.",
        answer: "You are not a student.",
        alternatives: ["You aren't a student."],
        why: "„not“ fiilden sonra gelir: are + not. Konuşmada „aren't“ diye büzülür.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi soru yap.",
        source: "You are tired.",
        answer: "Are you tired?",
        why: "Soruda „be“ fiili özneden ÖNE geçer: You are → Are you? Türkçedeki „-mi“ eki gibi ayrı bir sözcük yok.",
      },
      {
        kind: "build",
        tr: "Nerelisin?",
        answer: "Where are you from?",
        hint: "„where“ + „are you“ + „from“. Türkçede tek sözcük olan soru, İngilizcede dört sözcük.",
      },
      {
        kind: "build",
        tr: "İyiyim, teşekkürler.",
        answer: "I am fine, thanks.",
        alternatives: ["I'm fine, thanks."],
        hint: "„fine“ hal hatır sorusunun hazır cevabı; „good“ da doğaldır.",
      },
    ],
  },
];
