import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 13.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri (gerekçe: parti 11 başlığı).
 * Bu parti beş becerinin HEPSİNİ taşır; okuma ve dinleme hücreleri bu
 * partiyle yirmiye ulaşır. Kurallar ve emsal: `en-a2.ts` (parti 1) ve
 * `data/content/SPEC.md`.
 *
 * Parti 13 okul yolu ve çocuklar hattı: okulun "yürüyen otobüs" bilgi
 * yazısı, çocuk futbol antrenörünün antrenman sonunda velilere konuşması,
 * akşam gelecek bebek bakıcısına bırakılan not. Söyleyiş odağı konuşmada
 * düşen heceler (comfortable, vegetable, different); dil bilgisi dönüşlü
 * zamirler ve each other.
 */
export const enA2P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-lib-r13",
    course: "en",
    level: "A2",
    skill: "reading",
    title: "The Walking Bus",
    genre: "info",
    intro: "Bir ilkokulun, çocukların okula yetişkinlerle birlikte yürüyerek gittiği düzeni anlatan bilgi yazısını okuyacaksın.",
    gloss: [
      { de: "wheel", tr: "tekerlek" },
      { de: "route", tr: "güzergâh" },
      { de: "except", tr: "hariç" },
      { de: "pharmacy", tr: "eczane" },
      { de: "vest", tr: "yelek" },
      { de: "join", tr: "katılmak" },
      { de: "adult", tr: "yetişkin" },
    ],
    minutes: 5,
    text:
      "THE WALKING BUS — HILLSIDE SCHOOL\n\n" +
      "What is it?\n" +
      "A walking bus is a group of children who walk to school together with two adults. It has a route and " +
      "“bus stops”, just like a real bus, but it has no wheels.\n\n" +
      "When does it run?\n" +
      "Every school day except Friday. It leaves the first stop, next to the pharmacy on Oak Road, at 8:05 and " +
      "arrives at school at 8:30. The children wait at their stop, and the bus picks them up on the way.\n\n" +
      "What do children need?\n" +
      "Comfortable shoes and a coat for the rain. Every child gets a yellow vest on the first day and wears it on every walk.\n\n" +
      "Who walks with them?\n" +
      "Parents and grandparents. Each adult walks once or twice a month. We need three more people for a new route on Park Avenue.\n\n" +
      "How do I join?\n" +
      "Write your child's name on the list at the school office. It is free.",
    questions: [
      {
        text: "What is a walking bus?",
        options: [
          "a small school bus for young children",
          "a group of children who walk to school with adults",
          "a bus that takes parents to work",
        ],
        answer: 1,
        explain: "„A walking bus is a group of children who walk to school together with two adults.“",
      },
      {
        text: "Where is the first stop?",
        options: ["in front of the school office", "on Park Avenue", "next to the pharmacy"],
        answer: 2,
        explain: "„It leaves the first stop, next to the pharmacy on Oak Road, at 8:05 …“ Park Avenue yeni güzergâh.",
      },
      {
        kind: "truefalse",
        text: "The walking bus runs every day from Monday to Friday.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Every school day except Friday.“ — cuma günü yürüyüş yok.",
      },
      {
        kind: "gapfill",
        text: "Every child wears a yellow ___ on the walk.",
        options: [],
        answer: 0,
        accept: ["vest"],
        explain: "„Every child gets a yellow vest on the first day and wears it on every walk.“",
      },
      {
        kind: "short_answer",
        text: "How many more adults does the school need?",
        options: [],
        answer: 0,
        accept: ["three", "three more", "three people", "three more people"],
        explain: "„We need three more people for a new route on Park Avenue.“",
      },
      {
        text: "How can parents join?",
        options: [
          "They write the child's name on a list.",
          "They call the pharmacy on Oak Road.",
          "They come to the first stop on Friday.",
        ],
        answer: 0,
        explain: "„Write your child's name on the list at the school office.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-lib-l13",
    course: "en",
    level: "A2",
    skill: "listening",
    title: "Five Minutes After Training",
    genre: "info",
    intro: "Çocuk futbol takımının antrenörü antrenmandan sonra velilerle konuşuyor: yeni saat, getirilecekler, cumartesi turnuvası ve araba ihtiyacı.",
    gloss: [
      { de: "coach", tr: "antrenör" },
      { de: "field", tr: "saha" },
      { de: "bottle", tr: "şişe" },
      { de: "tournament", tr: "turnuva" },
      { de: "club", tr: "kulüp" },
      { de: "enjoy", tr: "tadını çıkarmak" },
    ],
    minutes: 5,
    segments: [
      { text: "Hello, everyone, thanks for waiting. I'm Leo, the coach of the Tuesday group. I only need five minutes." },
      { text: "First, from next week training starts at half past four, not at five. The older team needs the field after us." },
      { text: "Second, the children should bring a bottle of water with their name on it. Last week we found seven bottles with no names." },
      { text: "Please don't send them in their school shoes. They need football boots or sports shoes." },
      { text: "On Saturday the twelfth we have a small tournament with three other clubs. It starts at ten and finishes around one." },
      { text: "We need four parents with cars to take the children there. If you can drive, please tell me today or send me a message." },
      { text: "And one more thing: the kids played really well today. They enjoyed themselves, and so did I. See you next week." },
    ],
    questions: [
      {
        text: "Who is Leo?",
        options: ["the father of one of the children", "the man who owns the field", "the coach of the children's team"],
        answer: 2,
        explain: "„I'm Leo, the coach of the Tuesday group.“",
      },
      {
        text: "Why does training start earlier next week?",
        options: ["The children finish school earlier.", "Another team needs the field.", "It gets dark at five."],
        answer: 1,
        explain: "„The older team needs the field after us.“",
      },
      {
        kind: "truefalse",
        text: "The tournament is on a Saturday.",
        options: ["True", "False"],
        answer: 0,
        explain: "„On Saturday the twelfth we have a small tournament with three other clubs.“",
      },
      {
        kind: "short_answer",
        text: "How many parents with cars does Leo need?",
        options: [],
        answer: 0,
        accept: ["four", "four parents"],
        explain: "„We need four parents with cars to take the children there.“",
      },
      {
        kind: "dictation",
        text: "Leo'nun ayakkabılarla ilgili söylediği ikinci cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["They need football boots or sports shoes.", "They need football boots or sports shoes"],
        explain: "„They need football boots or sports shoes.“ — okul ayakkabısı olmaz.",
      },
      {
        text: "What should be on each water bottle?",
        options: ["the child's name", "the club's name", "the date of the training"],
        answer: 0,
        explain: "„… a bottle of water with their name on it.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w13",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "A Note for the Babysitter",
    genre: "message",
    intro: "Bu akşam çocuklarına bir bakıcı bakacak; önce iki cümle kur, sonra ona masaya bırakacağın notu yaz.",
    gloss: [
      { de: "babysitter", tr: "bebek bakıcısı" },
      { de: "allowed", tr: "izinli" },
      { de: "bowl", tr: "kase" },
      { de: "reach", tr: "ulaşmak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Çocuklar sabahları kendi kendilerine giyinebiliyor.",
        answer: "The children can dress themselves in the morning.",
        alternatives: ["In the morning the children can dress themselves."],
        hint: "Kişi işi kendine yapıyorsa dönüşlü zamir gelir: they → themselves.",
      },
      {
        kind: "build",
        tr: "Saat sekiz buçukta yatakta olmaları gerekiyor.",
        answer: "They have to be in bed at half past eight.",
        alternatives: ["At half past eight they have to be in bed."],
        hint: "Zorunluluk „have to“ + yalın fiil ile kurulur; saat bildirirken „at“ gelir.",
      },
      {
        kind: "free",
        prompt:
          "Bu akşam çocuklarına bir bakıcı bakacak. Ona masaya bırakacağın bir not yaz: çocuklar ne yiyecek, yemekten sonra neye izin var, ne zaman yatacaklar, bir sorun olursa kimi arayacak ve kaçta döneceksin.",
        checklist: [
          "Akşam yemeğinin nerede olduğunu ve nasıl ısıtılacağını yaz",
          "Neye izin olduğunu, neye olmadığını söyle",
          "Yatma saatini yaz",
          "Bir telefon numarası ve dönüş saatini ver",
        ],
        minWords: 40,
        phrases: [
          { de: "Dinner is in the …", tr: "Akşam yemeği …'de" },
          { de: "They are allowed to …", tr: "… yapabilirler" },
          { de: "They have to be in bed by …", tr: "Saat …'e kadar yatakta olmaları gerekiyor" },
          { de: "If there is a problem, call …", tr: "Bir sorun olursa … ara" },
          { de: "We'll be back at …", tr: "Saat …'de döneriz" },
        ],
        sample:
          "Hi Lina, thank you for coming tonight! Dinner is in the fridge: pasta for the kids, just warm it for three " +
          "minutes. Mert doesn't eat tomatoes, so give him the blue bowl. After dinner they are allowed to watch one " +
          "film, but not on the tablets. They can wash and dress themselves, but please check their teeth. They have to " +
          "be in bed by half past eight. Duru always asks for one more story, and one is enough. If there is a problem, " +
          "call me on 0532 118 40 27. If you can't reach me, call Mrs Hale in flat four. We'll be back at eleven. Thanks! Aylin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s13",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "comfortable, vegetable, different",
    genre: "pronounce",
    intro: "Bazı sık kelimelerde vurgusuz bir hece konuşmada tamamen düşer: „comfortable“ dört değil üç, „different“ üç değil iki hecedir. Yazıdaki her heceyi okumak kelimeyi uzatır.",
    gloss: [
      { de: "comfortable", tr: "rahat" },
      { de: "vegetable", tr: "sebze" },
      { de: "different", tr: "farklı" },
      { de: "restaurant", tr: "restoran" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "This chair is very comfortable.",
        tr: "Bu sandalye çok rahat.",
        hint: "„comfortable“ = KAMF-tı-bıl, üç hece. Ortadaki „or“ hiç okunmaz.",
        confusions: [
          { heard: ["this chair is very come for table"], fix: "Dört heceyi tek tek okuma; ortadaki hece düşer: kamftıbıl.", expected: "comfortable" },
        ],
      },
      {
        de: "We need some vegetables.",
        tr: "Biraz sebzeye ihtiyacımız var.",
        hint: "„vegetables“ = VEC-tı-bılz, üç hece. İkinci e yazılır ama söylenmez.",
        confusions: [
          { heard: [], fix: "Kelimeyi „vege + table“ diye bölme; vec-tı-bılz tek parça.", expected: "vegetables" },
        ],
      },
      {
        de: "Every family is different.",
        tr: "Her aile farklıdır.",
        hint: "„every“ = EV-ri, „family“ = FEM-li, „different“ = DİF-rınt. Üçü de bir hece kaybeder.",
        confusions: [
          { heard: [], fix: "Heceleri saymak yerine kelimeyi tek vuruşla söyle: evri, femli, difrınt.", expected: "different" },
        ],
      },
      {
        de: "It was an interesting evening.",
        tr: "İlginç bir akşamdı.",
        hint: "„interesting“ = İN-trıs-tiŋ, „evening“ = İİV-niŋ. Vurgusuz ünlüler düşer.",
        confusions: [
          { heard: [], fix: "„evening“ iki hece: iiv-niŋ; „interesting“ üç: in-trıs-tiŋ.", expected: "interesting" },
        ],
      },
      {
        de: "Is this restaurant expensive?",
        tr: "Bu restoran pahalı mı?",
        hint: "„restaurant“ = RES-trant, iki hece. „au“ harfleri ayrı bir hece yapmaz.",
        confusions: [
          { heard: [], fix: "Üç hece yapma; iki hece yeter: restrant.", expected: "restaurant" },
        ],
      },
      {
        de: "I usually see her on Wednesday.",
        tr: "Onu genelde çarşamba görürüm.",
        hint: "„usually“ = YUU-jı-li, „Wednesday“ = WENZ-dey. İkisinde de yazılan bir parça söylenmez.",
        confusions: [
          { heard: [], fix: "Wednesday'deki ilk d ve ortadaki e okunmaz: wenzdey.", expected: "Wednesday" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g13",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "Did you make it yourself?",
    genre: "grammar",
    intro: "Türkçedeki „kendim, kendin“ İngilizcede kişiye göre ayrı bir zamirdir; „birbirini“ ise hiç zamir değişmeden „each other“ olur.",
    focus: "Dönüşlü zamirler (myself, themselves), by myself ve each other",
    gloss: [
      { de: "knife", tr: "bıçak" },
      { de: "guitar", tr: "gitar" },
      { de: "paint", tr: "boyamak" },
      { de: "each other", tr: "birbirini" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "İş kişinin kendine dönüyorsa",
        tr: "Özne ile nesne aynı kişiyse nesnenin yerine dönüşlü zamir gelir: myself, yourself, himself, herself, itself, ourselves, yourselves, themselves. Çoğul „you“ için „yourselves“ kullanılır.",
        examples: [
          { de: "I cut myself in the kitchen.", tr: "Mutfakta elimi kestim.", note: "I → myself" },
          { de: "She taught herself to play the guitar.", tr: "Gitar çalmayı kendi kendine öğrendi." },
          { de: "Help yourselves to the cake!", tr: "Pastadan buyurun, kendiniz alın!", note: "çoğul you → yourselves" },
        ],
      },
      {
        heading: "Kimsenin yardımı olmadan",
        tr: "Aynı zamir „kendim yaptım“ vurgusu da taşır ve genelde cümlenin sonunda durur. „by myself“ ise „tek başıma“ demektir.",
        examples: [
          { de: "We painted the kitchen ourselves.", tr: "Mutfağı kendimiz boyadık.", note: "vurgu" },
          { de: "Did you make this cake yourself?", tr: "Bu pastayı kendin mi yaptın?" },
          { de: "My grandfather lives by himself.", tr: "Dedem tek başına yaşıyor.", note: "by himself = yalnız" },
        ],
      },
      {
        heading: "each other ve zamirsiz fiiller",
        tr: "İki kişi aynı şeyi birbirine yapıyorsa „each other“ gelir: „They help each other.“ Ayrıca Türkçede „-n-“ eki alan bazı fiiller İngilizcede genelde zamir almaz: wash, dress, relax („I washed and dressed“). Küçük bir çocuğun bunu kendi başına yapabildiği vurgulanırken „dress themselves“ denebilir. „feel“ ise hiç almaz: „I feel myself tired“ yanlıştır.",
        examples: [
          { de: "Ali and Sara help each other with homework.", tr: "Ali ile Sara ödevde birbirine yardım ediyor." },
          { de: "We wrote to each other every week.", tr: "Her hafta birbirimize yazdık." },
          { de: "I feel tired today.", tr: "Bugün kendimi yorgun hissediyorum.", note: "feel zamir almaz" },
        ],
      },
    ],
    questions: [
      {
        text: "She taught ___ to swim.",
        options: ["her", "herself", "she"],
        answer: 1,
        explain: "Öğreten ile öğrenen aynı kişi: herself.",
      },
      {
        text: "Tom and Nil send ___ messages every day.",
        options: ["each other", "themselves", "ourselves"],
        answer: 0,
        explain: "İki kişi birbirine mesaj atıyor: each other.",
      },
      {
        text: "Which sentence is correct?",
        options: ["I feel myself tired.", "I feel me tired.", "I feel tired."],
        answer: 2,
        explain: "„feel“ İngilizcede dönüşlü zamir almaz.",
      },
      {
        kind: "gapfill",
        text: "Be careful with that knife! You'll cut ___. (you, one person)",
        options: [],
        answer: 0,
        accept: ["yourself"],
        explain: "Tek kişiye hitap: you → yourself.",
      },
      {
        kind: "gapfill",
        text: "Nobody helped us. We built the table ___.",
        options: [],
        answer: 0,
        accept: ["ourselves"],
        explain: "Yardım yok, işi biz yaptık: ourselves.",
      },
      {
        kind: "gapfill",
        text: "The children are only four, but they can dress ___.",
        options: [],
        answer: 0,
        accept: ["themselves"],
        explain: "Küçük çocukların kendi başına giyinebildiği vurgulanıyor: they → themselves.",
      },
      {
        kind: "gapfill",
        text: "He doesn't have a roommate. He lives by ___.",
        options: [],
        answer: 0,
        accept: ["himself"],
        explain: "„by himself“ tek başına demektir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Help", "yourselves", "to", "the cake"],
        explain: "Misafirlere söylenen kalıp: Help yourselves to the cake.",
      },
      {
        kind: "truefalse",
        text: "„They looked at each other and laughed.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "İki kişi birbirine bakıyor; each other doğru.",
      },
      {
        kind: "truefalse",
        text: "„I cut me with the knife.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Özne ile nesne aynı kişi; doğrusu „I cut myself with the knife.“",
      },
    ],
  },
];
