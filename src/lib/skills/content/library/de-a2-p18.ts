import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 18.
 *
 * A2 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-a2.ts` (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 18 zaman ve günlük düzen hattı: „sabahçı mı gececi mi“ dergi yazısı,
 * bakımevinde iki meslektaşın vardiya takası, erken vardiyaya geçen birinin
 * yeni gününü anlatan mesaj. Söyleyiş odağı konuşma kelimelerinin ezgisi
 * (ach so, na ja, echt): anlam sesin inip çıkmasında; dil bilgisi isim yerine
 * geçen einer, keiner, welche — artikel sözcüğü tek başına kalınca der-ekini alır.
 */
export const deA2P18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r18",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Lerche oder Eule?",
    genre: "article",
    intro: "Bir dergi yazısı: bazı insanlar sabah, bazıları akşam daha dinçtir; iki okur kendi günlerini anlatıyor.",
    gloss: [
      { de: "die Lerche", tr: "tarla kuşu", en: "lark" },
      { de: "die Eule", tr: "baykuş", en: "owl" },
      { de: "wach", tr: "uyanık", en: "awake" },
      { de: "die Gewohnheit", tr: "alışkanlık", en: "habit" },
      { de: "der Körper", tr: "vücut", en: "body" },
      { de: "die Frühschicht", tr: "sabah vardiyası", en: "early shift" },
    ],
    minutes: 5,
    text:
      "Manche Menschen sind um sechs Uhr morgens wach und fit. Andere sind erst am Abend richtig wach. " +
      "Man nennt die erste Gruppe „Lerchen“ und die zweite „Eulen“, wie die Vögel.\n\n" +
      "Das ist nicht nur eine Gewohnheit. Unser Körper hat eine innere Uhr, und die geht nicht bei allen gleich. " +
      "Mit dem Alter ändert sie sich außerdem: Jugendliche sind oft Eulen, ältere Menschen eher Lerchen.\n\n" +
      "Wir haben zwei Leser gefragt. Katrin Voss, 34, Krankenschwester: „Ich stehe um fünf auf und gehe um zehn " +
      "ins Bett. Die Frühschicht ist für mich kein Problem, aber von Partys gehe ich immer als Erste nach Hause.“\n\n" +
      "Jonas Hartmann, 27, Programmierer: „Vor elf kann ich nicht klar denken. Zum Glück darf ich in meiner Firma " +
      "um zwölf anfangen. Dafür arbeite ich oft bis acht Uhr abends.“\n\n" +
      "Der Tipp der Experten für beide Gruppen: Gehen Sie jeden Tag zur gleichen Zeit ins Bett, " +
      "auch am Wochenende.",
    questions: [
      {
        text: "Was ist eine „Eule“ im Text?",
        options: [
          "Jemand ist morgens sehr fit.",
          "Jemand arbeitet in der Frühschicht.",
          "Jemand ist abends richtig wach.",
        ],
        answer: 2,
        explain: "„Andere sind erst am Abend richtig wach“ — ikinci gruba „Eulen“ deniyor.",
      },
      {
        text: "Wie ändert sich die innere Uhr mit dem Alter?",
        options: ["Alle werden zu Eulen.", "Ältere Menschen sind eher Lerchen.", "Sie ändert sich nicht."],
        answer: 1,
        explain: "„Jugendliche sind oft Eulen, ältere Menschen eher Lerchen.“",
      },
      {
        kind: "truefalse",
        text: "Jonas fängt in seiner Firma um zwölf Uhr an.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Zum Glück darf ich in meiner Firma um zwölf anfangen.“",
      },
      {
        kind: "gapfill",
        text: "Katrin steht um ___ Uhr auf.",
        options: [],
        answer: 0,
        accept: ["fünf", "5"],
        explain: "„Ich stehe um fünf auf und gehe um zehn ins Bett.“",
      },
      {
        kind: "short_answer",
        text: "Bis wann arbeitet Jonas oft?",
        options: [],
        answer: 0,
        accept: ["bis acht Uhr abends", "bis acht Uhr", "bis 20 Uhr", "acht Uhr abends"],
        explain: "„Dafür arbeite ich oft bis acht Uhr abends.“",
      },
      {
        text: "Was raten die Experten?",
        options: [
          "jeden Tag zur gleichen Zeit ins Bett gehen",
          "am Wochenende lange schlafen",
          "abends nicht mehr arbeiten",
        ],
        answer: 0,
        explain: "„Gehen Sie jeden Tag zur gleichen Zeit ins Bett, auch am Wochenende.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l18",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Tauschst du mit mir?",
    genre: "dialogue",
    intro: "Bir bakımevinde iki meslektaş vardiya değiştirmek istiyor: kim ne zaman çalışacak, karşılığında ne yapılacak.",
    gloss: [
      { de: "tauschen", tr: "değiş tokuş etmek", en: "to swap" },
      { de: "der Dienstplan", tr: "vardiya çizelgesi", en: "shift schedule" },
      { de: "die Frühschicht", tr: "sabah vardiyası", en: "early shift" },
      { de: "die Spätschicht", tr: "akşam vardiyası", en: "late shift" },
      { de: "heiraten", tr: "evlenmek", en: "to marry" },
      { de: "Bescheid sagen", tr: "haber vermek", en: "to let someone know" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Hanna", text: "Dilek, hast du kurz Zeit? Ich habe eine Frage zum Dienstplan." },
      { speaker: "Dilek", text: "Klar. Was ist los?" },
      { speaker: "Hanna", text: "Mein Sohn hat am Donnerstag Geburtstag, und ich habe Spätschicht. Kannst du mit mir tauschen?" },
      { speaker: "Dilek", text: "Am Donnerstag habe ich Frühschicht, von sechs bis zwei. Dann mache ich deine Spätschicht und du meine Frühschicht?" },
      { speaker: "Hanna", text: "Genau. Das heißt, du arbeitest dann von zwei bis zehn." },
      { speaker: "Dilek", text: "Hm, am Donnerstagabend habe ich eigentlich Yoga. Aber gut, dann gehe ich einmal nicht hin." },
      { speaker: "Dilek", text: "Kannst du dafür an einem Samstag für mich arbeiten? Am 21. heiratet meine Cousine." },
      { speaker: "Hanna", text: "Am 21.? Ja, das passt, da habe ich sowieso frei." },
      { speaker: "Dilek", text: "Super. Sagst du Frau Pohl Bescheid? Sie muss den Dienstplan ändern." },
      { speaker: "Hanna", text: "Mache ich heute noch. Danke dir, du rettest mir den Geburtstag!" },
    ],
    questions: [
      {
        text: "Warum möchte Hanna tauschen?",
        options: ["Ihr Sohn hat Geburtstag.", "Sie ist krank.", "Sie hat einen Arzttermin."],
        answer: 0,
        explain: "„Mein Sohn hat am Donnerstag Geburtstag, und ich habe Spätschicht.“",
      },
      {
        text: "Wann arbeitet Dilek am Donnerstag nach dem Tausch?",
        options: ["von sechs bis zwei", "gar nicht", "von zwei bis zehn"],
        answer: 2,
        explain: "Hanna'nın akşam vardiyasını alıyor: „du arbeitest dann von zwei bis zehn.“",
      },
      {
        kind: "truefalse",
        text: "Dilek hat am Donnerstagabend keine Pläne.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„am Donnerstagabend habe ich eigentlich Yoga“ — ama bir kez gitmemeyi kabul ediyor.",
      },
      {
        kind: "gapfill",
        text: "Dileks Cousine heiratet am ___.",
        options: [],
        answer: 0,
        accept: ["21.", "21", "einundzwanzigsten"],
        explain: "„Am 21. heiratet meine Cousine.“",
      },
      {
        kind: "short_answer",
        text: "Wer muss den Dienstplan ändern?",
        options: [],
        answer: 0,
        accept: ["Frau Pohl"],
        explain: "„Sagst du Frau Pohl Bescheid? Sie muss den Dienstplan ändern.“",
      },
      {
        text: "Was macht Hanna für Dilek?",
        options: [
          "Sie geht mit ihr zum Yoga.",
          "Sie arbeitet für sie an einem Samstag.",
          "Sie kauft ein Geschenk für die Hochzeit.",
        ],
        answer: 1,
        explain: "Karşılığında Hanna, Dilek'in yerine kuzeninin düğün günü olan cumartesi çalışıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w18",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Mein Tag beginnt jetzt um halb fünf",
    genre: "personal",
    intro: "Bir aydır erken vardiyada çalışıyorsun: önce iki cümle kur, sonra eski bir arkadaşına yeni gününü anlatan bir mesaj yaz.",
    gloss: [
      { de: "aufstehen", tr: "kalkmak", en: "to get up" },
      { de: "der Feierabend", tr: "iş çıkışı", en: "end of work" },
      { de: "backen", tr: "fırında pişirmek", en: "to bake" },
      { de: "der Tagesablauf", tr: "günlük program", en: "daily routine" },
      { de: "müde", tr: "yorgun", en: "tired" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Artık her sabah dört buçukta kalkıyorum.",
        answer: "Jetzt stehe ich jeden Morgen um halb fünf auf.",
        alternatives: ["Ich stehe jetzt jeden Morgen um halb fünf auf."],
        hint: "aufstehen ayrılabilen bir fiil: stehe … auf, ön ek en sonda. „halb fünf“ dört buçuk demektir.",
      },
      {
        kind: "build",
        tr: "Öğleden sonra bir saat uyuyorum, çünkü çok yorgunum.",
        answer: "Nachmittags schlafe ich eine Stunde, weil ich sehr müde bin.",
        alternatives: ["Weil ich sehr müde bin, schlafe ich nachmittags eine Stunde."],
        hint: "„weil“ cümlesinde fiil sona gider; yan cümle başa geçerse ana cümle fiille başlar.",
      },
      {
        kind: "free",
        prompt:
          "Bir aydır bir fırında erken vardiyada çalışıyorsun. Eski arkadaşın Sara'ya yeni günlük düzenini anlatan bir mesaj yaz: ne zaman kalkıp ne zaman çalıştığını, öğleden sonra ne yaptığını, neyin zor ve neyin güzel olduğunu yaz, sonra onu bir hafta sonu için davet et.",
        checklist: [
          "Ne zamandan beri ve nerede çalıştığını yaz",
          "Kalkma ve çalışma saatlerini anlat",
          "Zor olan bir şeyi ve güzel olan bir şeyi yaz",
          "Arkadaşını bir hafta sonu için davet et",
        ],
        minWords: 55,
        phrases: [
          { de: "Seit einem Monat arbeite ich …", tr: "Bir aydır … çalışıyorum", en: "I have been working … for a month." },
          { de: "Jeden Morgen stehe ich um … auf.", tr: "Her sabah …'da kalkıyorum.", en: "Every morning I get up at …" },
          { de: "Um … habe ich Feierabend.", tr: "…'da işten çıkıyorum.", en: "I finish work at …" },
          { de: "Schwer ist …, aber schön ist …", tr: "Zor olan …, ama güzel olan …", en: "The hard part is …, but the nice part is …" },
          { de: "Hast du im … mal ein Wochenende Zeit?", tr: "…'da bir hafta sonu boş musun?", en: "Are you free one weekend in …?" },
        ],
        sample:
          "Liebe Sara,\n\n" +
          "entschuldige, dass ich so lange nicht geschrieben habe. Seit einem Monat arbeite ich in der Bäckerei am Markt, " +
          "und mein Tagesablauf ist jetzt ganz anders. Jetzt stehe ich jeden Morgen um halb fünf auf. " +
          "Um fünf fange ich an und um eins habe ich Feierabend. Nachmittags schlafe ich eine Stunde, weil ich sehr müde bin. " +
          "Danach gehe ich einkaufen oder treffe Freunde. Schwer ist das Aufstehen im Winter, es ist ja noch ganz dunkel. " +
          "Aber schön ist der freie Nachmittag. Hast du im Mai mal ein Wochenende Zeit? " +
          "Komm doch zu mir, ich backe auch Brötchen für dich!\n\n" +
          "Viele Grüße\nNora",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s18",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Ach so! Na ja! Echt?",
    genre: "pronounce",
    intro: "Kısa konuşma kelimelerinin anlamı ezgide saklıdır: „ach so“ inerse „anladım“, çıkarsa „öyle mi?“ demektir. Altı cümlede doğru ezgiyi kur.",
    gloss: [
      { de: "verstehen", tr: "anlamak", en: "to understand" },
      { de: "echt", tr: "gerçekten", en: "really" },
      { de: "genau", tr: "aynen", en: "exactly" },
      { de: "leidtun", tr: "üzülmek", en: "to be sorry" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ach so, jetzt verstehe ich.",
        tr: "Haa, şimdi anladım.",
        hint: "„Ach SO ↘“: ses so'da iner, bu „anladım“ demektir. Ardından cümle sakin devam eder.",
        confusions: [
          {
            heard: [],
            fix: "so'yu yükseltirsen „öyle mi?“ diye şaşırmış gibi olursun; anladığını söylerken sesi indir.",
            expected: "so",
          },
        ],
      },
      {
        de: "Na ja, es geht.",
        tr: "Eh işte, idare eder.",
        hint: "„Na JAA →“: ja uzar ve düz kalır, kararsızlık taşır. „es GEHT ↘“ hafif iner.",
        confusions: [
          {
            heard: [],
            fix: "„na ja“yı kısa ve sert söylersen evet gibi duyulur; ja'yı uzat, sesi düz tut.",
            expected: "ja",
          },
        ],
      },
      {
        de: "Echt? Das wusste ich nicht.",
        tr: "Gerçekten mi? Bunu bilmiyordum.",
        hint: "„ECHT ↗“: tek kelimelik soru, ses belirgin biçimde yükselir. Sonraki cümle düz iner.",
        confusions: [
          {
            heard: [],
            fix: "Echt'i düşük söylersen „gerçek“ diye onaylamış olursun; şaşkınlık için sesi yukarı çek.",
            expected: "Echt",
          },
        ],
      },
      {
        de: "Genau, so machen wir das.",
        tr: "Aynen, böyle yapıyoruz.",
        hint: "„ge-NAU ↘“: vurgu ikinci hecede, ses kararlı biçimde iner; tam onay.",
        confusions: [
          {
            heard: [],
            fix: "genau'yu yükselirsen „emin misin?“ gibi soru olur; onaylarken net bir düşüş gerekir.",
            expected: "Genau",
          },
        ],
      },
      {
        de: "Oje, das tut mir leid.",
        tr: "Eyvah, buna üzüldüm.",
        hint: "„o-JE ↘“: yumuşak ve alçalan bir ses, üzüntü paylaşır. „tut mir LEID“ sakin iner.",
        confusions: [
          {
            heard: [],
            fix: "Oje'yi neşeli ve yüksek söyleme; alçak başla, daha da alçakta bitir.",
            expected: "Oje",
          },
        ],
      },
      {
        de: "Hm, ich weiß nicht genau.",
        tr: "Hmm, tam bilmiyorum.",
        hint: "„Hm →“ düz ve biraz uzun: düşünüyorsun. Sonra „nicht ge-NAU“ hafif askıda kalabilir.",
        confusions: [
          {
            heard: [],
            fix: "Hm'yi kısa ve yükselen söylersen „efendim?“ gibi duyulur; düz ve uzun tut.",
            expected: "genau",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g18",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "Hast du einen? — Nein, keinen.",
    genre: "grammar",
    intro: "İsmi tekrar etmemek için ein ve kein tek başına kullanılabilir; o zaman sonlarına der'deki ek gelir.",
    focus: "Artikel sözcükleri zamir olarak: einer, keiner ve çoğulda welche",
    gloss: [
      { de: "der Stift", tr: "kalem", en: "pen" },
      { de: "der Regenschirm", tr: "şemsiye", en: "umbrella" },
      { de: "die Milch", tr: "süt", en: "milk" },
      { de: "der Stuhl", tr: "sandalye", en: "chair" },
      { de: "die Apotheke", tr: "eczane", en: "pharmacy" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "einer, eine, eins",
        tr: "İsim zaten biliniyorsa tekrar edilmez; „ein“ tek başına kalır ve sonuna der, die, das'taki ek eklenir: eril einer (Akkusativ: einen), dişil eine, nötr eins. Türkçede „bir tane“ deriz.",
        examples: [
          { de: "Ist hier ein Stuhl frei? — Ja, da ist einer.", tr: "Burada boş bir sandalye var mı? — Evet, orada bir tane var.", note: "eril, Nominativ: einer" },
          { de: "Ich brauche einen Stift. Hast du einen?", tr: "Bir kaleme ihtiyacım var. Sende var mı?", note: "eril, Akkusativ: einen" },
          { de: "Hast du ein Handy dabei? — Ja, ich habe eins.", tr: "Yanında telefon var mı? — Evet, var.", note: "nötr: eins" },
        ],
      },
      {
        heading: "keiner, keine, keins",
        tr: "Olumsuzda aynı ekler kein'e gelir: keiner, keinen, keine, keins. „Keiner“ tek başına „hiç kimse“ anlamında da kullanılır.",
        examples: [
          { de: "Hast du einen Regenschirm? — Nein, ich habe keinen.", tr: "Şemsiyen var mı? — Hayır, yok.", note: "eril, Akkusativ: keinen" },
          { de: "Gibt es noch Brot? — Nein, es ist keins mehr da.", tr: "Ekmek kaldı mı? — Hayır, hiç kalmadı.", note: "nötr: keins" },
          { de: "Keiner hat angerufen.", tr: "Kimse aramadı.", note: "keiner = niemand" },
        ],
      },
      {
        heading: "Çoğulda welche",
        tr: "ein'in çoğulu yoktur. Çoğul ya da sayılamayan bir şey için „biraz, birkaç tane“ anlamında welche kullanılır. Olumsuzu keine'dir.",
        examples: [
          { de: "Brauchst du Eier? — Nein, ich habe noch welche.", tr: "Yumurta lazım mı? — Hayır, daha var.", note: "çoğul: welche" },
          { de: "Möchtest du Milch? — Danke, ich habe noch welche.", tr: "Süt ister misin? — Sağ ol, daha var.", note: "sayılamayan: welche" },
          { de: "Gibt es hier Toiletten? — Ja, hinten sind welche.", tr: "Burada tuvalet var mı? — Evet, arkada var.", note: "sind welche" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich brauche einen Stift. Hast du ___?",
        options: ["einen", "eins", "eine"],
        answer: 0,
        explain: "der Stift eril ve Akkusativ'de: einen.",
      },
      {
        text: "Hast du ein Handy dabei? — Ja, ich habe ___.",
        options: ["einer", "einen", "eins"],
        answer: 2,
        explain: "das Handy nötr; tek başına kalınca eins olur.",
      },
      {
        text: "Gibt es noch Eier? — Ja, im Kühlschrank sind noch ___.",
        options: ["keine", "welche", "eins"],
        answer: 1,
        explain: "Çoğul bir şey var diyoruz: welche.",
      },
      {
        kind: "gapfill",
        text: "Hast du einen Regenschirm? — Nein, ich habe ___. (kein-)",
        options: [],
        answer: 0,
        accept: ["keinen"],
        explain: "der Regenschirm eril ve Akkusativ'de: keinen.",
      },
      {
        kind: "gapfill",
        text: "Ist hier ein Stuhl frei? — Ja, da ist ___. (ein-)",
        options: [],
        answer: 0,
        accept: ["einer"],
        explain: "der Stuhl eril ve özne (Nominativ): einer.",
      },
      {
        kind: "gapfill",
        text: "Ich suche eine Apotheke. Gibt es hier ___? (ein-)",
        options: [],
        answer: 0,
        accept: ["eine"],
        explain: "die Apotheke dişil; Akkusativ'de de eine.",
      },
      {
        kind: "gapfill",
        text: "Möchtest du Milch? — Danke, ich habe noch ___. (welch-)",
        options: [],
        answer: 0,
        accept: ["welche"],
        explain: "Sayılamayan bir şey: welche.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Nein,", "ich", "habe", "leider", "keinen"],
        explain: "Fiil ikinci sırada, keinen isim yerine sonda duruyor.",
      },
      {
        kind: "truefalse",
        text: "„Brauchst du ein Messer? — Ja, ich brauche eins.“ — Bu cevap doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "das Messer nötr; tek başına kalınca eins. Cevap doğru.",
      },
      {
        kind: "truefalse",
        text: "„Hast du einen Stift? — Nein, ich habe kein.“ — Bu cevap doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "İsim olmadan kein ek alır: der Stift → keinen.",
      },
    ],
  },
];
