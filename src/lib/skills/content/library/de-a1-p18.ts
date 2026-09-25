import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 18.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri. Yeni bir şehirde ilk haftalar
 * hattı: ev sahibi ailenin e-postası, kuaförde saç kestirmek, kurs bloguna
 * en sevilen yer. Söyleyiş odağı İngilizceden gelen kelimeler (Handy, Team,
 * Job); dil bilgisi sein ve haben — Türkçede ek ya da „var“ olan yerde fiil.
 */
export const deA1P18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r18",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Eine E-Mail von der Gastfamilie",
    genre: "email",
    intro: "Dil kursu için Almanya'ya gidecek bir öğrenci, yanında kalacağı aileden e-posta alıyor: aile kimlerden oluşuyor, oda nasıl, okula nasıl gidilecek.",
    gloss: [
      { de: "die Gastfamilie", tr: "misafir eden aile", en: "host family" },
      { de: "die Tochter", tr: "kız evlat", en: "daughter" },
      { de: "die Angst", tr: "korku", en: "fear" },
      { de: "der Schreibtisch", tr: "çalışma masası", en: "desk" },
      { de: "hell", tr: "aydınlık", en: "bright" },
      { de: "abholen", tr: "gidip almak", en: "to pick up" },
    ],
    minutes: 4,
    text:
      "Liebe Deniz,\n\n" +
      "in zwei Wochen bist du bei uns in Freiburg!\n\n" +
      "Wir sind vier Personen: Peter, ich, unsere Tochter Mia und unser Sohn Ben. Mia ist zwölf Jahre alt und Ben neun. " +
      "Wir haben auch einen Hund, er heißt Bruno. Hast du Angst vor Hunden? Bitte schreib es uns.\n\n" +
      "Dein Zimmer ist im ersten Stock. Es ist klein, aber hell und hat einen Schreibtisch.\n\n" +
      "Die Sprachschule ist nicht weit: mit dem Bus fünfzehn Minuten, mit dem Fahrrad nur zehn. " +
      "Du kannst Mias altes Fahrrad nehmen.\n\n" +
      "Frühstück gibt es um sieben Uhr, Abendessen um halb sieben. Mittags isst du in der Schule.\n\n" +
      "Peter holt dich am Samstag vom Bahnhof ab. Bis bald!\n\nJulia Hoffmann",
    questions: [
      {
        text: "Wer schreibt die E-Mail?",
        options: ["die Sprachschule in Freiburg", "die Mutter in der Gastfamilie", "Deniz"],
        answer: 1,
        explain: "E-postayı Julia Hoffmann yazıyor; kızı Mia ve oğlu Ben'den söz ediyor, yani ailenin annesi.",
      },
      {
        text: "Wie kommt Deniz am schnellsten zur Schule?",
        options: ["mit dem Bus", "zu Fuß", "mit dem Fahrrad"],
        answer: 2,
        explain: "Otobüsle on beş dakika, „mit dem Fahrrad nur zehn“.",
      },
      {
        kind: "truefalse",
        text: "Deniz isst mittags bei der Familie.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Mittags isst du in der Schule“; ailede kahvaltı ve akşam yemeği var.",
      },
      {
        kind: "gapfill",
        text: "Ben ist ___ Jahre alt.",
        options: [],
        answer: 0,
        accept: ["neun", "9"],
        explain: "„Mia ist zwölf Jahre alt und Ben neun.“",
      },
      {
        kind: "short_answer",
        text: "Wer holt Deniz vom Bahnhof ab?",
        options: [],
        answer: 0,
        accept: ["Peter", "Peter Hoffmann"],
        explain: "„Peter holt dich am Samstag vom Bahnhof ab.“",
      },
      {
        text: "Warum fragt Julia: „Hast du Angst vor Hunden?“",
        options: ["Die Familie hat einen Hund.", "Deniz möchte einen Hund.", "In der Schule gibt es einen Hund."],
        answer: 0,
        explain: "„Wir haben auch einen Hund, er heißt Bruno“ — soru bu yüzden soruluyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l18",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Beim Friseur",
    genre: "dialogue",
    intro: "Bir adam kuaförde saçını kestiriyor: saçı nasıl istiyor, neyi istemiyor, ne kadar ödüyor.",
    gloss: [
      { de: "das Haar", tr: "saç", en: "hair" },
      { de: "kurz", tr: "kısa", en: "short" },
      { de: "schneiden", tr: "kesmek", en: "to cut" },
      { de: "der Bart", tr: "sakal", en: "beard" },
      { de: "hinten", tr: "arkada", en: "at the back" },
      { de: "das Trinkgeld", tr: "bahşiş", en: "tip" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Friseurin", text: "Guten Tag! Haben Sie einen Termin?" },
      { speaker: "Herr Aksu", text: "Ja, um vier Uhr. Mein Name ist Aksu." },
      { speaker: "Friseurin", text: "Richtig, bitte setzen Sie sich hier hin. Was machen wir heute?" },
      { speaker: "Herr Aksu", text: "Meine Haare sind zu lang. Bitte hinten und an den Seiten kurz, aber oben nicht so kurz." },
      { speaker: "Friseurin", text: "Gut. Soll ich die Haare zuerst waschen?" },
      { speaker: "Herr Aksu", text: "Ja, gern. Und bitte schneiden Sie den Bart nicht, der bleibt so." },
      { speaker: "Friseurin", text: "So, fertig. Wie gefällt es Ihnen?" },
      { speaker: "Herr Aksu", text: "Sehr gut, danke! Was kostet das?" },
      { speaker: "Friseurin", text: "Waschen und Schneiden kostet zweiundzwanzig Euro." },
      { speaker: "Herr Aksu", text: "Hier sind fünfundzwanzig. Der Rest ist für Sie." },
    ],
    questions: [
      {
        text: "Wann hat Herr Aksu seinen Termin?",
        options: ["um halb vier", "um fünf Uhr", "um vier Uhr"],
        answer: 2,
        explain: "„Ja, um vier Uhr. Mein Name ist Aksu.“",
      },
      {
        text: "Wie möchte er die Haare oben?",
        options: ["nicht so kurz", "ganz kurz", "lang wie vorher"],
        answer: 0,
        explain: "„hinten und an den Seiten kurz, aber oben nicht so kurz“.",
      },
      {
        kind: "truefalse",
        text: "Die Friseurin wäscht zuerst die Haare.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Soll ich die Haare zuerst waschen?“ — müşteri „Ja, gern“ diyor.",
      },
      {
        kind: "gapfill",
        text: "Waschen und Schneiden kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["zweiundzwanzig", "22"],
        explain: "„Waschen und Schneiden kostet zweiundzwanzig Euro.“",
      },
      {
        kind: "short_answer",
        text: "Wie viel Trinkgeld gibt Herr Aksu?",
        options: [],
        answer: 0,
        accept: ["drei Euro", "drei", "3 Euro", "3"],
        explain: "Yirmi beş veriyor, fiyat yirmi iki: „Der Rest ist für Sie“ — kalan üç avro bahşiş.",
      },
      {
        text: "Was soll die Friseurin nicht schneiden?",
        options: ["die Haare hinten", "den Bart", "die Haare an den Seiten"],
        answer: 1,
        explain: "„bitte schneiden Sie den Bart nicht, der bleibt so“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w18",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Mein Lieblingsort in der Stadt",
    genre: "blog",
    intro: "Kursun blogu için şehrinde en sevdiğin yeri anlatıyorsun: önce iki cümle kur, sonra kısa bir metin yaz.",
    gloss: [
      { de: "der Fluss", tr: "nehir", en: "river" },
      { de: "der Baum", tr: "ağaç", en: "tree" },
      { de: "ruhig", tr: "sakin", en: "quiet" },
      { de: "liegen", tr: "bulunmak", en: "to be located" },
      { de: "spazieren", tr: "yürüyüş yapmak", en: "to stroll" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "En sevdiğim yer nehir kenarındaki park.",
        answer: "Mein Lieblingsort ist der Park am Fluss.",
        alternatives: ["Der Park am Fluss ist mein Lieblingsort."],
        hint: "„ist“in iki yanında iki yalın hâl isim durur; hangisi başta olursa olsun fiil ikinci sırada kalır.",
      },
      {
        kind: "build",
        tr: "Pazar günleri orada sık sık yürüyüş yapıyorum.",
        answer: "Am Sonntag gehe ich dort oft spazieren.",
        alternatives: ["Ich gehe am Sonntag dort oft spazieren.", "Ich gehe am Sonntag oft dort spazieren.", "Dort gehe ich am Sonntag oft spazieren."],
        hint: "„spazieren gehen“: „gehen“ çekilir ve ikinci sırada durur, „spazieren“ en sonda kalır.",
      },
      {
        kind: "free",
        prompt:
          "Kurs blogu için şehrinde en sevdiğin yeri anlat: neresi ve nerede, orada neler var, ne zaman ve kiminle gidiyorsun, orada ne yapıyorsun ve neden seviyorsun.",
        checklist: [
          "Yerin adını ve nerede olduğunu yaz",
          "Orada neler olduğunu anlat",
          "Ne zaman, kiminle gittiğini ve ne yaptığını söyle",
          "Neden sevdiğini yaz",
        ],
        minWords: 35,
        phrases: [
          { de: "Mein Lieblingsort ist …", tr: "En sevdiğim yer …", en: "My favourite place is …" },
          { de: "Er liegt …", tr: "… bulunuyor.", en: "It is located …" },
          { de: "Dort gibt es …", tr: "Orada … var.", en: "There is … there." },
          { de: "Ich bin oft mit … dort.", tr: "Oraya sık sık … ile giderim.", en: "I'm often there with …" },
          { de: "Ich mag den Ort, denn …", tr: "Bu yeri seviyorum, çünkü …", en: "I like the place because …" },
        ],
        sample:
          "Mein Lieblingsort ist der Park am Fluss. Er liegt nicht weit von meiner Wohnung, nur zehn Minuten zu Fuß. " +
          "Dort gibt es viele alte Bäume, einen kleinen See und ein Café. " +
          "Am Sonntag gehe ich dort oft spazieren, manchmal mit meiner Freundin Selin. " +
          "Wir trinken Tee und sehen die Boote auf dem Wasser. Ich mag den Ort, denn dort ist es immer ruhig und grün.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s18",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "Handy, Team, Job",
    genre: "pronounce",
    intro: "Almancada İngilizceden gelen pek çok kelime var ve çoğu İngilizceye yakın okunur; ama anlamı değişebilir: „Handy“ cep telefonu demektir. Altı cümlede bu kelimeleri doğru söyle.",
    gloss: [
      { de: "das Handy", tr: "cep telefonu", en: "cell phone" },
      { de: "das Team", tr: "ekip", en: "team" },
      { de: "der Computer", tr: "bilgisayar", en: "computer" },
      { de: "das Baby", tr: "bebek", en: "baby" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Mein Handy ist leider kaputt.",
        tr: "Cep telefonum maalesef bozuk.",
        hint: "„Handy“ = HEN-di: a burada e gibi, y ise i gibi okunur.",
        confusions: [
          {
            heard: [],
            fix: "Almanca kural gibi „han-dü“ okuma; kelime İngilizce okunur.",
            expected: "Handy",
          },
        ],
      },
      {
        de: "Unser Team hat heute ein Meeting.",
        tr: "Ekibimizin bugün toplantısı var.",
        hint: "„Team“ = TİİM, „Meeting“ = Mİİ-ting: ea ve ee uzun i.",
        confusions: [
          {
            heard: [],
            fix: "ea'yı e-a diye ayırma; tek bir uzun i sesi.",
            expected: "Team",
          },
        ],
      },
      {
        de: "Mein Bruder sucht einen neuen Job.",
        tr: "Erkek kardeşim yeni bir iş arıyor.",
        hint: "„Job“ = COP: j burada Almanca y değil, c sesi; sondaki b p gibi.",
        confusions: [
          {
            heard: [],
            fix: "„yop“ okuma; İngilizce kökenli kelimede j = c.",
            expected: "Job",
          },
        ],
      },
      {
        de: "Das Baby schläft im Kinderzimmer.",
        tr: "Bebek çocuk odasında uyuyor.",
        hint: "„Baby“ = BEE-bi: a burada ee, y ise i.",
        confusions: [
          {
            heard: [],
            fix: "„ba-bü“ diye harf harf okuma; iki hece: BEE-bi.",
            expected: "Baby",
          },
        ],
      },
      {
        de: "Ich arbeite jeden Tag am Computer.",
        tr: "Her gün bilgisayarda çalışıyorum.",
        hint: "„Computer“ = kom-PYUU-ta: u yu gibi, sondaki -er a gibi.",
        confusions: [
          {
            heard: [],
            fix: "u'yu düz u okuma ve sondaki r'yi vurgulama: kom-PYUU-ta.",
            expected: "Computer",
          },
        ],
      },
      {
        de: "Kannst du mir deinen Laptop leihen?",
        tr: "Bana dizüstü bilgisayarını ödünç verir misin?",
        hint: "„Laptop“ = LEP-top: ilk hecedeki a, e gibi okunur.",
        confusions: [
          {
            heard: [],
            fix: "„lap-top“ diye Almanca okuma yapma; ilk hece LEP.",
            expected: "Laptop",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g18",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "Ich bin müde, ich habe Hunger",
    genre: "grammar",
    intro: "En sık iki fiil düzensizdir ve Türkçenin ek ya da „var“ kullandığı yerlerde gelir; çekimlerini ve nerede kullanıldıklarını öğren.",
    focus: "sein ve haben: çekim ve Türkçeden farklı kullanımlar (yaş, Hunger haben)",
    gloss: [
      { de: "müde", tr: "yorgun", en: "tired" },
      { de: "der Durst", tr: "susuzluk", en: "thirst" },
      { de: "die Angst", tr: "korku", en: "fear" },
      { de: "die Tochter", tr: "kız evlat", en: "daughter" },
      { de: "nett", tr: "cana yakın", en: "nice" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Ezberlenecek iki çekim",
        tr: "„sein“ ve „haben“ Almancanın en sık iki fiilidir ve düzensizdir. sein: ich bin, du bist, er/sie/es ist, wir sind, ihr seid, sie/Sie sind. haben: ich habe, du hast, er/sie/es hat, wir haben, ihr habt, sie/Sie haben.",
        examples: [
          { de: "Ich bin Lehrerin.", tr: "Öğretmenim.", note: "ich bin" },
          { de: "Du hast ein schönes Zimmer.", tr: "Güzel bir odan var.", note: "du hast: b düşer" },
          { de: "Ihr seid heute sehr nett.", tr: "Bugün çok tatlısınız.", note: "ihr seid" },
        ],
      },
      {
        heading: "Türkçede ek, Almancada sein",
        tr: "Türkçede „yorgunum, evdeyiz, öğretmenim“ derken ayrı bir fiil yoktur, ek yeter. Almancada her zaman „sein“ gerekir. Yaş da „sein“ ile söylenir: „yirmi yaşındayım“ = ich bin zwanzig Jahre alt.",
        examples: [
          { de: "Ich bin heute sehr müde.", tr: "Bugün çok yorgunum.", note: "Türkçe ek → sein" },
          { de: "Meine Tochter ist zehn Jahre alt.", tr: "Kızım on yaşında.", note: "yaş → sein" },
          { de: "Seid ihr schon zu Hause?", tr: "Evde misiniz artık?", note: "soru: fiil başta" },
        ],
      },
      {
        heading: "Türkçede „var“ ya da fiil, Almancada haben",
        tr: "Sahiplik „haben“ ile söylenir: „arabam var“ = ich habe ein Auto. Bazı durumlar da Türkçede fiilken Almancada „haben + isim“ olur: acıkmak = Hunger haben, susamak = Durst haben, korkmak = Angst haben.",
        examples: [
          { de: "Ich habe Durst.", tr: "Susadım.", note: "Durst haben" },
          { de: "Hast du heute Zeit?", tr: "Bugün vaktin var mı?", note: "var → haben" },
          { de: "Er hat Angst vor Hunden.", tr: "Köpeklerden korkuyor.", note: "Angst haben" },
        ],
      },
    ],
    questions: [
      {
        text: "Wir ___ heute sehr müde.",
        options: ["sind", "seid", "haben"],
        answer: 0,
        explain: "Türkçede ek olan durum Almancada sein ile söylenir; wir biçimi sind.",
      },
      {
        text: "Ich ___ Durst. Gibt es Wasser?",
        options: ["bin", "ist", "habe"],
        answer: 2,
        explain: "Susamak Almancada „Durst haben“ ile söylenir: ich habe Durst.",
      },
      {
        text: "Wie alt ___ du?",
        options: ["hast", "bist", "ist"],
        answer: 1,
        explain: "Yaş sein ile sorulur; du biçimi bist.",
      },
      {
        kind: "gapfill",
        text: "___ ihr morgen zu Hause? (sein)",
        options: [],
        answer: 0,
        accept: ["Seid", "seid"],
        explain: "ihr biçimi seid; soruda fiil başa geçer.",
      },
      {
        kind: "gapfill",
        text: "Mein Bruder ___ zwei Kinder. (haben)",
        options: [],
        answer: 0,
        accept: ["hat"],
        explain: "Üçüncü tekil: er hat.",
      },
      {
        kind: "gapfill",
        text: "Du ___ sehr nett. (sein)",
        options: [],
        answer: 0,
        accept: ["bist"],
        explain: "du biçimi bist.",
      },
      {
        kind: "gapfill",
        text: "___ ihr heute Abend Zeit? (haben)",
        options: [],
        answer: 0,
        accept: ["Habt", "habt"],
        explain: "ihr biçimi habt; „vaktiniz var mı“ haben ile sorulur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Meine Tochter", "ist", "zehn", "Jahre", "alt"],
        explain: "Yaş sein ile söylenir ve „Jahre alt“ sonda durur: Meine Tochter ist zehn Jahre alt.",
      },
      {
        kind: "truefalse",
        text: "„Ich habe zwanzig Jahre alt.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yaş haben ile değil sein ile söylenir: „Ich bin zwanzig Jahre alt.“",
      },
      {
        kind: "truefalse",
        text: "„Hast du Angst vor Hunden?“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Korkmak „Angst haben“ ile kurulur; du biçimi hast ve soruda başta.",
      },
    ],
  },
];
