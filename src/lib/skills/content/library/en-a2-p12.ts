import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 12.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri (gerekçe: parti 11 başlığı).
 * Bu parti beş becerinin HEPSİNİ taşır. Kurallar ve emsal: `en-a2.ts`
 * (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 12 gece hattı: bir gece otobüsü şoförünün portresi, bir
 * fırında deneme sabahı için yapılan telefon görüşmesi, gece kayan yıldız
 * izlemeye çağıran bir davet mesajı. Söyleyiş odağı hızlı konuşmada kısalan
 * going to / want to / got to (gonna, wanna, gotta); dil bilgisi zero
 * conditional: her seferinde aynı sonucu veren kural ve alışkanlık.
 */
export const enA2P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-lib-r12",
    course: "en",
    level: "A2",
    skill: "reading",
    title: "Driving the Night Bus",
    genre: "profile",
    intro: "Şehirde herkes uyurken çalışan bir gece otobüsü şoförünü anlatan kısa portreyi okuyacaksın.",
    gloss: [
      { de: "shift", tr: "vardiya" },
      { de: "passenger", tr: "yolcu" },
      { de: "nurse", tr: "hemşire" },
      { de: "empty", tr: "boş" },
      { de: "heater", tr: "ısıtıcı" },
      { de: "wake", tr: "uyandırmak" },
      { de: "loud", tr: "gürültülü" },
    ],
    minutes: 5,
    text:
      "DRIVING THE NIGHT BUS\n\n" +
      "Every night at eleven, when most people are going to bed, Tarik Aslan starts his shift. He drives the N7, the " +
      "night bus from the airport to the city center and back. He has done this job for six years.\n\n" +
      "His passengers are nurses, cooks, cleaners and students on their way home from parties. “At two o'clock the " +
      "bus is full and loud,” he says. “At four it is quiet, and people sleep. Then my job is to wake them at the right stop.”\n\n" +
      "Tarik likes the empty streets and the orange lights. He does not like the winter, because the heater in the old " +
      "buses does not always work.\n\n" +
      "Some passengers take the bus every night, so he knows them well. One nurse always brings him a cup of tea from " +
      "the hospital. “Her stop is the last one before the airport,” he laughs, “so the tea is still hot.”\n\n" +
      "He finishes at seven in the morning, has breakfast with his daughter before school and then sleeps until two.",
    questions: [
      {
        text: "What is Tarik's job?",
        options: [
          "He cleans the buses in the morning.",
          "He works at the airport at night.",
          "He drives a bus at night.",
        ],
        answer: 2,
        explain: "„He drives the N7, the night bus from the airport to the city center and back.“",
      },
      {
        text: "What does Tarik do at four o'clock?",
        options: [
          "He has a break at the airport.",
          "He wakes passengers at their stop.",
          "He brings tea to the nurses.",
        ],
        answer: 1,
        explain: "„At four it is quiet, and people sleep. Then my job is to wake them at the right stop.“",
      },
      {
        kind: "truefalse",
        text: "Tarik has driven the night bus for six years.",
        options: ["True", "False"],
        answer: 0,
        explain: "„He has done this job for six years.“",
      },
      {
        kind: "gapfill",
        text: "At two o'clock the bus is full and ___.",
        options: [],
        answer: 0,
        accept: ["loud"],
        explain: "„At two o'clock the bus is full and loud.“ Saat dörtte ise sessiz.",
      },
      {
        kind: "short_answer",
        text: "What does the nurse bring him?",
        options: [],
        answer: 0,
        accept: ["a cup of tea", "tea", "some tea", "hot tea"],
        explain: "„One nurse always brings him a cup of tea from the hospital.“",
      },
      {
        text: "Why does Tarik not like the winter?",
        options: [
          "The heater in the old buses does not always work.",
          "There are more passengers and more noise.",
          "The streets are dark and the lights are off.",
        ],
        answer: 0,
        explain: "„He does not like the winter, because the heater in the old buses does not always work.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-lib-l12",
    course: "en",
    level: "A2",
    skill: "listening",
    title: "A Trial Morning at the Bakery",
    genre: "phone",
    intro: "Emre bir fırından gelen deneme sabahı davetine telefonla dönüyor: gün ve saat, hangi kapı, ne giyilecek, sonuç ne zaman belli olacak.",
    gloss: [
      { de: "bakery", tr: "ekmek fırını" },
      { de: "trial", tr: "deneme" },
      { de: "bell", tr: "zil" },
      { de: "comfortable", tr: "rahat" },
      { de: "trousers", tr: "pantolon" },
      { de: "apron", tr: "önlük" },
      { de: "oven", tr: "fırın" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ola", text: "Good afternoon, Ola's Bakery, Ola speaking." },
      { speaker: "Emre", text: "Hi, this is Emre Demir. You sent me an email about a trial morning." },
      { speaker: "Ola", text: "Yes, Emre, thanks for calling back. Can you come on Thursday? We start at four." },
      { speaker: "Emre", text: "Four in the morning? Wow. Yes, I can do that. Which door should I use?" },
      { speaker: "Ola", text: "Not the shop door. Go around the building to the small green door at the back and ring the bell." },
      { speaker: "Emre", text: "Okay. What should I wear?" },
      { speaker: "Ola", text: "Comfortable shoes and trousers. We have aprons and hats here, so you don't need your own." },
      { speaker: "Emre", text: "Do I need to bring anything else?" },
      { speaker: "Ola", text: "Only something to drink. It gets very hot next to the ovens. You'll work with Marek; he has been here for twelve years." },
      { speaker: "Emre", text: "Great. How long is the trial?" },
      { speaker: "Ola", text: "Until nine. Then we talk for ten minutes, and I tell you my answer on Friday. We pay you for the morning, of course." },
      { speaker: "Emre", text: "Perfect. See you on Thursday at four, then." },
    ],
    questions: [
      {
        text: "Why does Emre call Ola?",
        options: [
          "to order bread for Thursday",
          "to ask about the price of a cake",
          "to answer her email about a trial morning",
        ],
        answer: 2,
        explain: "„You sent me an email about a trial morning.“ — „Thanks for calling back.“",
      },
      {
        text: "Which door should Emre use?",
        options: ["the green door at the back", "the shop door at the front", "the door next to the ovens"],
        answer: 0,
        explain: "„Not the shop door. Go around the building to the small green door at the back …“",
      },
      {
        kind: "truefalse",
        text: "Emre will get money for the trial morning.",
        options: ["True", "False"],
        answer: 0,
        explain: "„We pay you for the morning, of course.“",
      },
      {
        kind: "short_answer",
        text: "Who will Emre work with?",
        options: [],
        answer: 0,
        accept: ["Marek", "with Marek"],
        explain: "„You'll work with Marek; he has been here for twelve years.“",
      },
      {
        kind: "dictation",
        text: "Ola'nın içecek getirmenin nedenini söylediği cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["It gets very hot next to the ovens.", "It gets very hot next to the ovens"],
        explain: "„It gets very hot next to the ovens.“ — „get“ burada bir değişimi, ısınmayı anlatıyor.",
      },
      {
        text: "When will Emre hear Ola's answer?",
        options: ["at nine on Thursday", "on Friday", "after twelve days"],
        answer: 1,
        explain: "„Then we talk for ten minutes, and I tell you my answer on Friday.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w12",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "Shooting Stars on Saturday",
    genre: "message",
    intro: "Cumartesi gecesi şehir dışında kayan yıldız izlemeye gidiyorsun; önce iki cümle kur, sonra arkadaşlarına bir davet mesajı yaz.",
    gloss: [
      { de: "shooting star", tr: "kayan yıldız" },
      { de: "sky", tr: "gökyüzü" },
      { de: "blanket", tr: "battaniye" },
      { de: "cloudy", tr: "bulutlu" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Ay parlaksa daha az yıldız görürsün.",
        answer: "If the moon is bright, you see fewer stars.",
        alternatives: ["You see fewer stars if the moon is bright."],
        hint: "Her seferinde aynı sonuç: iki yan da present simple. Sayılabilen isimle „less“ değil „fewer“ gelir.",
      },
      {
        kind: "build",
        tr: "Cumartesi gecesi bizimle gelmek ister misin?",
        answer: "Would you like to come with us on Saturday night?",
        alternatives: ["Do you want to come with us on Saturday night?"],
        hint: "Kibar davet „Would you like to …?“ ile kurulur; gün adından önce „on“ gelir.",
      },
      {
        kind: "free",
        prompt:
          "Cumartesi gecesi gökyüzünde çok sayıda kayan yıldız görülecek ve sen şehir dışındaki bir tepeye gitmeyi planlıyorsun. Arkadaş grubuna mesaj yaz: nereye ve saat kaçta gideceğinizi söyle, nasıl gideceğinizi anlat, yanlarına ne almaları gerektiğini yaz ve hava bulutlu olursa ne olacağını söyle.",
        checklist: [
          "Nereye ve saat kaçta gideceğinizi yaz",
          "Nerede buluşacağınızı ve nasıl gideceğinizi söyle",
          "Yanlarına ne almaları gerektiğini ve nedenini yaz",
          "Bulutlu olursa ne olacağını ve ne zamana kadar cevap beklediğini söyle",
        ],
        minWords: 40,
        phrases: [
          { de: "Would you like to come …?", tr: "… gelmek ister misin?" },
          { de: "We're meeting at … at …", tr: "…'de saat …'te buluşuyoruz" },
          { de: "Bring … because …", tr: "… getir, çünkü …" },
          { de: "If it's cloudy, …", tr: "Hava bulutlu olursa …" },
          { de: "Tell me by …", tr: "…'e kadar bana söyle" },
        ],
        sample:
          "Hi everyone! On Saturday night there will be lots of shooting stars in the sky, and I want to watch them " +
          "from Bell Hill, twenty minutes out of town. Would you like to come with us? We're meeting at the bus stop " +
          "on Mill Road at ten, and my brother can take four people in his car. Bring a blanket and warm clothes, " +
          "because it gets very cold on the hill after midnight. Please don't use your phone lights: if the sky is " +
          "dark, you see more stars. If it's cloudy, we'll go on Sunday instead. Tell me by Friday, please! Deniz",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s12",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "gonna, wanna, gotta",
    genre: "pronounce",
    intro: "Hızlı konuşmada „going to“, „want to“ ve „got to“ tek bir parçaya iner: gonna, wanna, gotta. Yazıda kullanılmaz ama duyduğunu tanımak için bir kez kendin söyle.",
    gloss: [
      { de: "leave", tr: "ayrılmak" },
      { de: "early", tr: "erken" },
      { de: "call", tr: "aramak" },
      { de: "late", tr: "geç" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "I'm going to call her.",
        tr: "Onu arayacağım.",
        hint: "Hızlı söyleyişte „going to“ = GA-nı: aym-GA-nı-KOL-hır. Plan anlatan „going to“da olur, „gidiyorum“ anlamındaki „going to the shop“ta olmaz.",
        confusions: [
          { heard: [], fix: "Kelimeleri tek tek söylemek yanlış değil ama yavaş duyulur; iki kelimeyi tek hecede birleştir.", expected: "going to" },
        ],
      },
      {
        de: "We want to leave early.",
        tr: "Erken çıkmak istiyoruz.",
        hint: "„want to“ = WA-nı. t'ler düşer, n kalır.",
        confusions: [
          { heard: [], fix: "„want“ ile „to“ arasında durma; ikisi tek parça olur.", expected: "want to" },
        ],
      },
      {
        de: "He wants to leave early.",
        tr: "O erken çıkmak istiyor.",
        hint: "Dikkat: „wants to“ KISALMAZ. „wanna“ yalnız „want to“ için; burada WANTS-tı de.",
        confusions: [
          { heard: ["He wanna leave early"], fix: "Üçüncü tekilde -s var ve kısaltma yok: wants to.", expected: "wants to" },
        ],
      },
      {
        de: "I've got to go now.",
        tr: "Artık gitmem lazım.",
        hint: "„got to“ = GA-dı; t iki ünlü arasında yumuşar. „I've“ neredeyse duyulmaz: ayv-GA-dı-GOU.",
        confusions: [
          { heard: [], fix: "„got to“ zorunluluk bildirir; hızlı söyleyişte tek parça olur.", expected: "got to" },
        ],
      },
      {
        de: "Do you want to come?",
        tr: "Gelmek ister misin?",
        hint: "Üç kelime erir: dı-yı-WA-nı-KAM. Vurgu yalnız „want“ ve „come“da.",
        confusions: [
          { heard: [], fix: "Yardımcı fiil ve zamir zayıflar; güçlü kelimeler want ve come.", expected: "want to" },
        ],
      },
      {
        de: "She's going to be late.",
        tr: "Geç kalacak.",
        hint: "„going to be“ = GA-nı-bi. „She's“ ile birlikte: şiiz-GA-nı-bi-LEYT.",
        confusions: [
          { heard: [], fix: "Cümleyi tek nefeste söyle; vurgu „late“ta.", expected: "going to" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g12",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "If you heat ice, it melts",
    genre: "grammar",
    intro: "„If it rains, we'll stay“ tek bir gelecek durumunu anlatıyordu; her seferinde aynı sonucu veren kurallar ve alışkanlıklar için iki yan da şimdiki zamanda kalır.",
    focus: "Zero conditional: if + present, present — her zaman geçerli sonuçlar ve alışkanlıklar",
    gloss: [
      { de: "heat", tr: "ısıtmak" },
      { de: "melt", tr: "erimek" },
      { de: "mix", tr: "karıştırmak" },
      { de: "press", tr: "basmak" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Her zaman doğru olan sonuç",
        tr: "Bir koşul her gerçekleştiğinde aynı sonuç çıkıyorsa iki yan da present simple alır: „If you heat ice, it melts.“ Burada „will“ gerekmez, çünkü bir tahmin değil bir kural söylüyorsun.",
        examples: [
          { de: "If you heat ice, it melts.", tr: "Buzu ısıtırsan erir.", note: "doğa kuralı" },
          { de: "If you mix blue and yellow, you get green.", tr: "Maviyle sarıyı karıştırırsan yeşil elde edersin." },
          { de: "Plants die if they don't get water.", tr: "Bitkiler su almazsa ölür.", note: "if sonda: virgül yok" },
        ],
      },
      {
        heading: "Alışkanlık: if = when",
        tr: "Kendi düzenini anlatırken de aynı kalıp kullanılır: „Ne zaman … olursa, …“. Bu anlamda „if“ yerine „when“ ya da „whenever“ gelebilir ve anlam değişmez.",
        examples: [
          { de: "If I work nights, I sleep in the afternoon.", tr: "Gece çalışırsam öğleden sonra uyurum." },
          { de: "When I'm tired, I don't cook.", tr: "Yorgun olduğumda yemek yapmam.", note: "when = if" },
          { de: "If the bus is late, I walk.", tr: "Otobüs gecikirse yürürüm." },
        ],
      },
      {
        heading: "First conditional'dan farkı",
        tr: "Zero conditional GENEL bir kuralı, first conditional ise TEK ve belirli bir gelecek durumunu anlatır. „If I drink coffee at night, I can't sleep“ her gece için geçerlidir; „If I drink coffee now, I won't sleep tonight“ yalnız bu akşam için.",
        examples: [
          { de: "If I drink coffee at night, I can't sleep.", tr: "Gece kahve içersem uyuyamam.", note: "her zaman" },
          { de: "If I drink coffee now, I won't sleep tonight.", tr: "Şimdi kahve içersem bu gece uyuyamam.", note: "tek durum: will" },
          { de: "If you press this button, the machine stops.", tr: "Bu düğmeye basarsan makine durur.", note: "kullanım kuralı" },
        ],
      },
    ],
    questions: [
      {
        text: "If you heat ice, it ___.",
        options: ["melted", "melts", "is melt"],
        answer: 1,
        explain: "Her zaman geçerli bir sonuç: iki yan da present simple.",
      },
      {
        text: "If I ___ tired, I go to bed early.",
        options: ["am", "will be", "was"],
        answer: 0,
        explain: "Alışkanlık anlatılıyor; koşul yanı da present simple: am.",
      },
      {
        text: "Which sentence is a general rule, not one future situation?",
        options: [
          "If it rains tomorrow, we'll stay home.",
          "If I see Ali, I'll tell him.",
          "If you don't water plants, they die.",
        ],
        answer: 2,
        explain: "Bitkilerin susuz kalınca ölmesi her zaman doğru; iki yan da present simple.",
      },
      {
        kind: "gapfill",
        text: "If you mix red and white, you ___ (get) pink.",
        options: [],
        answer: 0,
        accept: ["get"],
        explain: "Kural bildiren sonuç yanı present simple: get.",
      },
      {
        kind: "gapfill",
        text: "Plants die if they ___ (not / get) water.",
        options: [],
        answer: 0,
        accept: ["don't get", "do not get"],
        explain: "Koşul yanı olumsuz present simple: don't get.",
      },
      {
        kind: "gapfill",
        text: "___ I work nights, I sleep in the afternoon. (every time)",
        options: [],
        answer: 0,
        accept: ["If", "When", "Whenever", "if", "when", "whenever"],
        explain: "Alışkanlıkta if, when ya da whenever aynı anlamı verir.",
      },
      {
        kind: "gapfill",
        text: "If the bus ___ (be) late, I walk to work.",
        options: [],
        answer: 0,
        accept: ["is"],
        explain: "Her seferinde olan durum: present simple, is.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["If", "you press", "this button,", "the machine", "stops"],
        explain: "Koşul başta ve virgülle ayrılır; sonuç yanı da present simple.",
      },
      {
        kind: "truefalse",
        text: "„If you heat water to 100 degrees, it boils.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Genel bir doğru; iki yan da present simple.",
      },
      {
        kind: "truefalse",
        text: "„If I will drink coffee at night, I can't sleep.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„if“ yanında will kullanılmaz: If I drink coffee at night …",
      },
    ],
  },
];
