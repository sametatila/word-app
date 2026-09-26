import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 17.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Bu parti YAZMA, KONUŞMA ve DİL BİLGİSİ taşır; yazma hücresinin son
 * partisidir. Parti 17 misafir ve boş zaman hattı: evine ilk kez gelecek bir arkadaşa
 * yol tarifi mesajı. Söyleyiş odağı „i“ harfinin kayan /aɪ/ sesi
 * (fine/fin); dil bilgisi spor ve etkinlik fiilleri: play, go + -ing ve
 * do.
 */
export const enA1P17: SkillExercise[] = [
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w17",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "How to Get to My House",
    genre: "message",
    intro: "Bir arkadaşın evine ilk kez geliyor; önce iki cümle kur, sonra ona istasyondan evine nasıl geleceğini anlatan kısa bir mesaj yaz.",
    gloss: [
      { de: "bakery", tr: "ekmek fırını" },
      { de: "corner", tr: "köşe" },
      { de: "opposite", tr: "karşısında" },
      { de: "get off", tr: "inmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Köşedeki fırında sola dön.",
        answer: "Turn left at the bakery on the corner.",
        alternatives: ["At the bakery on the corner turn left."],
        hint: "Emir cümlesi fiille başlar ve özne almaz; „köşede“ „on the corner“ ile söylenir. Yer ifadesi başa da alınabilir.",
      },
      {
        kind: "build",
        tr: "Evimin karşısında bir süpermarket var.",
        answer: "There is a supermarket opposite my house.",
        alternatives: ["Opposite my house there is a supermarket."],
        hint: "„var“ için there is; „karşısında“ anlamındaki „opposite“ ismin önüne gelir ve ayrıca edat istemez.",
      },
      {
        kind: "free",
        prompt:
          "Bir arkadaşın ilk kez evine geliyor. Ona mesaj yaz: adresini ver, istasyondan evine nasıl geleceğini adım adım anlat, yakındaki bir yeri ve kaçıncı katta oturduğunu söyle ve kaybolursa seni aramasını iste.",
        checklist: [
          "Adresini yaz",
          "Yolu adım adım anlat (first, then …)",
          "Yakındaki bir yeri ve katını söyle",
          "Kaybolursa seni aramasını iste",
        ],
        minWords: 30,
        phrases: [
          { de: "My address is …", tr: "Adresim …" },
          { de: "Take bus number … and get off at …", tr: "… numaralı otobüse bin ve …'de in." },
          { de: "Then turn left / right at …", tr: "Sonra …'de sola / sağa dön." },
          { de: "I live on the … floor.", tr: "… katta oturuyorum." },
          { de: "Call me if you are lost.", tr: "Kaybolursan beni ara." },
        ],
        sample:
          "Hi Zoe! My address is 12 Lime Road. From the station, take bus number 5 and get off at City Park. " +
          "Then walk to the bakery on the corner and turn left there. My house is the third one on the right. " +
          "There is a supermarket opposite my house. I live on the second floor. Call me if you are lost! See you at seven. Mira",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s17",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "fine or fin?",
    genre: "pronounce",
    intro: "İngilizcede „i“ harfi çoğu zaman a'dan i'ye kayan bir ses verir: time = TAYM. Türkçedeki gibi düz bir i okunursa kelime değişir.",
    gloss: [
      { de: "to like", tr: "sevmek" },
      { de: "time", tr: "zaman" },
      { de: "white", tr: "beyaz" },
      { de: "to hide", tr: "saklamak" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "I like this bike.",
        tr: "Bu bisikleti seviyorum.",
        hint: "„like“ ve „bike“ = LAYK, BAYK; „this“ ise kısa bir i. Aynı harf, iki ayrı ses.",
        confusions: [
          { heard: ["lick"], fix: "Düz i ile „lick“ (yalamak) duyulur; a'dan başlayıp i'ye kay.", expected: "like" },
        ],
      },
      {
        de: "It's time to go.",
        tr: "Gitme zamanı.",
        hint: "„time“ = TAYM: ağzı a için aç, sonra i'ye doğru kapat.",
        confusions: [
          { heard: ["Tim"], fix: "Kısa bir i ile özel ad „Tim“ duyulur; ünlü iki parçalı kalsın.", expected: "time" },
        ],
      },
      {
        de: "I'm fine, thanks.",
        tr: "İyiyim, teşekkürler.",
        hint: "„fine“ = FAYN; „I'm“ de aynı sesle başlar: AYM.",
        confusions: [
          { heard: ["fin"], fix: "Düz i ile „fin“ (yüzgeç) olur; sesi a'dan başlat.", expected: "fine" },
        ],
      },
      {
        de: "The white shirt is nice.",
        tr: "Beyaz gömlek güzel.",
        hint: "„white“ ve „nice“ AY sesiyle söylenir; aradaki „shirt“ başka bir ses taşır.",
        confusions: [
          { heard: ["wit", "niece"], fix: "Kısa i ile „wit“, uzun i ile „niece“ (yeğen) duyulur; iki kelimede de a'dan i'ye kay.", expected: "white" },
        ],
      },
      {
        de: "Turn on the light, please.",
        tr: "Işığı aç lütfen.",
        hint: "„light“ = LAYT: ağzı a için aç, sonra i'ye kay; „please“ ise uzun ve düz bir i taşır.",
        confusions: [
          { heard: ["lit"], fix: "Düz i ile geçmiş zaman „lit“ duyulur; lamba için ses iki parçalı.", expected: "light" },
        ],
      },
      {
        de: "Hide the key in the yard.",
        tr: "Anahtarı bahçeye sakla.",
        hint: "„hide“ = HAYD; „key“ ise uzun bir i taşır, kaymaz.",
        confusions: [
          { heard: ["hid"], fix: "Kısa i ile geçmiş zaman „hid“ duyulur; emirde ses a'dan başlar.", expected: "hide" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g17",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "go swimming, play tennis, do yoga",
    genre: "grammar",
    intro: "Türkçede sporların çoğu „oynamak“ ya da „yapmak“ ile söylenir; İngilizcede üç ayrı fiil var ve hangisinin geleceğini etkinliğin türü belirler.",
    focus: "Spor ve etkinlik fiilleri: play, go + -ing ve do",
    gloss: [
      { de: "soccer", tr: "futbol" },
      { de: "karate", tr: "karate" },
      { de: "yoga", tr: "yoga" },
      { de: "homework", tr: "ev ödevi" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "play: topla ve karşılıklı oynanan oyunlar",
        tr: "Topla ya da raketle, karşılıklı oynanan oyunlar „play“ ile söylenir: play soccer, play tennis. Oyunun adından önce „the“ konmaz: „play the tennis“ yanlıştır.",
        examples: [
          { de: "We play soccer on Sundays.", tr: "Pazar günleri futbol oynarız." },
          { de: "Do you play tennis?", tr: "Tenis oynar mısın?" },
          { de: "My grandpa plays cards every evening.", tr: "Dedem her akşam kâğıt oynar.", note: "play → plays" },
        ],
      },
      {
        heading: "go + -ing: adı -ing ile biten etkinlikler",
        tr: "Adı -ing ile biten ve bir yere gidilerek yapılan etkinlikler „go“ ile söylenir: go swimming, go running, go shopping. Arada „to“ kullanılmaz: „go to swimming“ yanlıştır.",
        examples: [
          { de: "I go swimming on Mondays.", tr: "Pazartesileri yüzmeye giderim." },
          { de: "They go running in the park.", tr: "Parkta koşuya giderler." },
          { de: "She goes shopping on Saturdays.", tr: "Cumartesileri alışverişe gider.", note: "go → goes" },
        ],
      },
      {
        heading: "do: top kullanılmayan egzersizler",
        tr: "Top kullanılmayan, çoğunlukla tek başına yapılan egzersizler „do“ ile söylenir: do yoga, do karate. Aynı fiil ev ödevi için de kullanılır: do homework.",
        examples: [
          { de: "I do yoga in the morning.", tr: "Sabahları yoga yaparım." },
          { de: "He does karate at school.", tr: "Okulda karate yapar.", note: "do → does" },
          { de: "We do our homework after dinner.", tr: "Ödevimizi akşam yemeğinden sonra yaparız." },
        ],
      },
    ],
    questions: [
      {
        text: "We ___ soccer on Sundays.",
        options: ["go", "play", "do"],
        answer: 1,
        explain: "Futbol topla ve karşılıklı oynanır, bu yüzden play.",
      },
      {
        text: "I ___ yoga in the morning.",
        options: ["play", "go", "do"],
        answer: 2,
        explain: "Yoga top kullanılmayan bir egzersiz, bu yüzden do.",
      },
      {
        text: "They go ___ in the park.",
        options: ["running", "to run", "run"],
        answer: 0,
        explain: "go arkasından -ing alan etkinlik adı gelir: go running.",
      },
      {
        kind: "gapfill",
        text: "She ___ shopping on Saturdays. (go)",
        options: [],
        answer: 0,
        accept: ["goes"],
        explain: "„she“ ile go → goes; alışveriş go + -ing ile söylenir.",
      },
      {
        kind: "gapfill",
        text: "Do you ___ tennis?",
        options: [],
        answer: 0,
        accept: ["play"],
        explain: "Tenis raketle karşılıklı oynanır, bu yüzden play.",
      },
      {
        kind: "gapfill",
        text: "He ___ karate at school. (do)",
        options: [],
        answer: 0,
        accept: ["does"],
        explain: "„he“ ile do → does; karate do ile söylenir.",
      },
      {
        kind: "gapfill",
        text: "I go ___ on Mondays. (swim)",
        options: [],
        answer: 0,
        accept: ["swimming"],
        explain: "go + -ing: swim → swimming (m ikizleşir).",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["My grandpa", "plays", "cards", "every evening"],
        explain: "Özne + play + oyun + zaman; oyunun önünde the yok.",
      },
      {
        kind: "truefalse",
        text: "„I go to swimming every week.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "go + -ing arasına to girmez: „I go swimming every week.“",
      },
      {
        kind: "truefalse",
        text: "„We do our homework after dinner.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Ev ödevi do ile söylenir; cümle doğru.",
      },
    ],
  },
];
