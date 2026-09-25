import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 17.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri (gerekçe: parti 11 başlığı).
 * Bu parti YAZMA, KONUŞMA ve DİL BİLGİSİ hücrelerini taşır; yazma hücresi
 * bu partiyle yirmiye ulaşır. Kurallar ve emsal: `en-a2.ts` (parti 1) ve
 * `data/content/SPEC.md`.
 *
 * Parti 17 kulüp ve dernek hattı: kulübün bilgi yarışması gecesini bülten
 * için anlatan kısa yazı. Söyleyiş odağı vurgusuz -age / -ate / -ous ekleri
 * (village, chocolate, famous); dil bilgisi özne ve nesne soruları
 * (Who called? / Who did you call?).
 */
export const enA2P17: SkillExercise[] = [
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w17",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "Quiz Night at the Club",
    genre: "report",
    intro: "Kulübün geçen cuma düzenlediği bilgi yarışması gecesini bülten için anlatacaksın; önce iki cümle kur, sonra yazını yaz.",
    gloss: [
      { de: "quiz", tr: "kısa sınav" },
      { de: "team", tr: "takım" },
      { de: "winner", tr: "kazanan" },
      { de: "prize", tr: "ödül" },
      { de: "collect", tr: "toplamak" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Birincilik ödülünü kim kazandı?",
        answer: "Who won the first prize?",
        alternatives: ["Who won first prize?"],
        hint: "Özneyi soruyorsan „did“ gelmez ve fiil geçmiş biçimde kalır: Who won …? („Who did win“ değil).",
      },
      {
        kind: "build",
        tr: "Gecenin sonunda iki yüz avro topladık.",
        answer: "At the end of the night we collected two hundred euros.",
        alternatives: ["We collected two hundred euros at the end of the night."],
        hint: "Zaman ifadesi cümlenin başında ya da sonunda durabilir; düzenli fiil geçmişte -ed alır: collected.",
      },
      {
        kind: "free",
        prompt:
          "Kulübünüz geçen cuma bir bilgi yarışması gecesi düzenledi. Kulüp bülteni için kısa bir yazı yaz: kaç kişi ve kaç takım vardı, hangi takım kazandı, en zor soru neydi, toplanan para ne için kullanılacak ve kime teşekkür ediyorsun.",
        checklist: [
          "Kaç kişinin ve kaç takımın geldiğini yaz",
          "Kazanan takımı ve puanını söyle",
          "En zor ya da en komik soruyu anlat",
          "Paranın ne için kullanılacağını yaz ve birine teşekkür et",
        ],
        minWords: 40,
        phrases: [
          { de: "Last Friday … people came to …", tr: "Geçen cuma …'e … kişi geldi" },
          { de: "The winners were …", tr: "Kazananlar … oldu" },
          { de: "The hardest question was …", tr: "En zor soru … idi" },
          { de: "The money will pay for …", tr: "Para …'e harcanacak" },
          { de: "A big thank-you to …", tr: "…'e kocaman bir teşekkür" },
        ],
        sample:
          "QUIZ NIGHT: A GREAT EVENING. Last Friday forty-two people came to our quiz night in the club room. There were " +
          "eight teams, and the questions were about music, sport, food and our town. The winners were The Late Ones, a " +
          "team of three sisters and two neighbors. They answered thirty-one of the forty questions. The hardest question " +
          "was: How many bridges are there in our town? Nobody knew the answer, and it's eleven! In the end we collected " +
          "two hundred and ten euros. The money will pay for new chairs in the club room. A big thank-you to Rosa, who " +
          "wrote all the questions!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s17",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "village, chocolate, famous",
    genre: "pronounce",
    intro: "Kelime sonundaki -age, -ate ve -ous yazıldığı gibi okunmaz: vurgusuz kalır ve kısa bir ı'ya iner. „village“ vi-LEYC değil Vİ-lıc'tir.",
    gloss: [
      { de: "village", tr: "köy" },
      { de: "chocolate", tr: "çikolata" },
      { de: "famous", tr: "meşhur" },
      { de: "message", tr: "mesaj" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "We live in a small village.",
        tr: "Küçük bir köyde yaşıyoruz.",
        hint: "„village“ = Vİ-lıc. -age burada „eyc“ değil, kısa ve zayıf „ıc“.",
        confusions: [
          { heard: ["We live in a small villadge", "a small vill age"], fix: "Vurgu ilk hecede; -age'i uzatma, kısa ıc ile bitir.", expected: "village" },
        ],
      },
      {
        de: "Can I leave a message?",
        tr: "Mesaj bırakabilir miyim?",
        hint: "„message“ = ME-sıc. Sonu uzatırsan „massage“ (masaj, mı-SAAJ) duyulur.",
        confusions: [
          { heard: ["Can I leave a massage"], fix: "Vurgu başta, son hece kısa: MEsıc.", expected: "message" },
        ],
      },
      {
        de: "This chocolate is very good.",
        tr: "Bu çikolata çok güzel.",
        hint: "„chocolate“ iki hecedir: ÇOK-lıt. Ortadaki o yutulur, -ate „eyt“ değil kısa „ıt“.",
        confusions: [
          { heard: ["This choco late is very good", "this chocolat is very good"], fix: "Üç hece yapma; ortadaki ünlü düşer: çoklıt.", expected: "chocolate" },
        ],
      },
      {
        de: "It was a private party.",
        tr: "Özel bir partiydi.",
        hint: "„private“ = PRAY-vıt. Vurgu başta, -ate zayıf.",
        confusions: [
          { heard: ["It was a pri vate party", "it was a privet party"], fix: "Son heceyi „veyt“ diye uzatma: prayvıt.", expected: "private" },
        ],
      },
      {
        de: "She is a famous singer.",
        tr: "O ünlü bir şarkıcı.",
        hint: "„famous“ = FEY-mıs. -ous tek hece ve kısa „ıs“; „ous“ harflerini tek tek okuma.",
        confusions: [
          { heard: ["She is a famoose singer", "a fam ous singer"], fix: "Son hece zayıf ve kısa: feymıs.", expected: "famous" },
        ],
      },
      {
        de: "Be careful, the road is dangerous.",
        tr: "Dikkatli ol, yol tehlikeli.",
        hint: "„careful“ = KER-fıl, „dangerous“ = DEYN-cı-rıs. -ful ve -ous ikisi de zayıf.",
        confusions: [
          { heard: ["Be care full, the road is danger ous"], fix: "Ekleri ayrı kelime gibi söyleme; vurgusuz ve kısa bırak.", expected: "dangerous" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g17",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "Who called? Who did you call?",
    genre: "grammar",
    intro: "A1'de soru sözcüklerini ve soru sırasını öğrendin; bu kez aynı „who“ ve „what“ın kimi zaman „did“ aldığını, kimi zaman almadığını göreceksin.",
    focus: "Özne ve nesne soruları: who / what ile do'lu ve do'suz soru",
    gloss: [
      { de: "happen", tr: "meydana gelmek" },
      { de: "upstairs", tr: "üst katta" },
      { de: "news", tr: "haber" },
      { de: "window", tr: "pencere" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Nesneyi soruyorsan: did / do gelir",
        tr: "Cevap cümlenin NESNESİ ise soru bildiğin sırayla kurulur: soru sözcüğü + did/do + özne + yalın fiil. „You called someone. — Who did you call?“",
        examples: [
          { de: "Who did you call last night?", tr: "Dün akşam kimi aradın?", note: "cevap: nesne" },
          { de: "What did she buy?", tr: "Ne satın aldı?" },
          { de: "Who does he live with?", tr: "Kiminle yaşıyor?" },
        ],
      },
      {
        heading: "Özneyi soruyorsan: did yok",
        tr: "Cevap cümlenin ÖZNESİ ise soru sözcüğü öznenin yerine geçer ve did/do kullanılmaz; fiil olumlu cümledeki gibi çekilir. Şimdiki zamanda üçüncü tekil -s alır: „Who lives here?“",
        examples: [
          { de: "Who called you last night?", tr: "Dün akşam seni kim aradı?", note: "cevap: özne" },
          { de: "What happened after the match?", tr: "Maçtan sonra ne oldu?" },
          { de: "Who lives in the flat upstairs?", tr: "Üst kattaki dairede kim oturuyor?", note: "lives: -s" },
        ],
      },
      {
        heading: "Aynı cümleden iki soru",
        tr: "„Ali saw Mia.“ cümlesinden iki ayrı soru çıkar. Ali'yi soruyorsan „Who saw Mia?“, Mia'yı soruyorsan „Who did Ali see?“ Anlamı ayıran tek şey „did“dir. „which“ ve „whose“ ile kurulan öbekler de özne olabilir.",
        examples: [
          { de: "Who saw Mia? — Ali did.", tr: "Mia'yı kim gördü? — Ali.", note: "özne sorusu" },
          { de: "Who did Ali see? — Mia.", tr: "Ali kimi gördü? — Mia'yı.", note: "nesne sorusu" },
          { de: "Which bus goes to the station?", tr: "Hangi otobüs istasyona gidiyor?", note: "which bus = özne" },
        ],
      },
    ],
    questions: [
      {
        text: "___ happened at the party?",
        options: ["What", "What did", "What does"],
        answer: 0,
        explain: "Olanı soruyor, yani özneyi: did gelmez. What happened …?",
      },
      {
        text: "Kerem met somebody. — Who ___ Kerem meet?",
        options: ["does", "did", "was"],
        answer: 1,
        explain: "Kerem özne, sorulan kişi nesne: Who did Kerem meet?",
      },
      {
        text: "Somebody broke the window. — Who ___ the window?",
        options: ["did break", "does break", "broke"],
        answer: 2,
        explain: "Sorulan kişi özne: did yok, fiil geçmiş biçimde: Who broke …?",
      },
      {
        kind: "gapfill",
        text: "Who ___ (live) in the flat upstairs?",
        options: [],
        answer: 0,
        accept: ["lives"],
        explain: "Özne sorusu şimdiki zamanda üçüncü tekil gibi çekilir: lives.",
      },
      {
        kind: "gapfill",
        text: "What ___ you buy at the market? (past)",
        options: [],
        answer: 0,
        accept: ["did"],
        explain: "Sen aldın, sorulan şey nesne: What did you buy?",
      },
      {
        kind: "gapfill",
        text: "Which bus ___ (go) to the airport?",
        options: [],
        answer: 0,
        accept: ["goes"],
        explain: "„which bus“ öznedir; do yok, fiil -es alır: goes.",
      },
      {
        kind: "gapfill",
        text: "Who ___ (tell) you the news yesterday?",
        options: [],
        answer: 0,
        accept: ["told"],
        explain: "Haberi veren kişi soruluyor, yani özne: Who told you?",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Who", "did", "you", "invite?"],
        explain: "Nesne sorusu: Who + did + özne + yalın fiil.",
      },
      {
        kind: "truefalse",
        text: "„Who did write this letter?“ — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Yazanı soruyor, yani özneyi: Who wrote this letter?",
      },
      {
        kind: "truefalse",
        text: "„What did Sara cook for dinner?“ — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Sara özne, yemek nesne: did kullanılır ve fiil yalın kalır.",
      },
    ],
  },
];
