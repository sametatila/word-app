import type { SkillExercise } from "../../types";

/**
 * EN · A1 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `en-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Parti 1'den farkı tür: kural metni, telesekreter mesajı ve resmî bir soru
 * e-postası. Söyleyiş odağı „th“ değil kısa-uzun i; dil bilgisi to be.
 */
export const enA1P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a1-lib-r2",
    course: "en",
    level: "A1",
    skill: "reading",
    title: "Green Corner — Garden Rules",
    genre: "Kural metni",
    intro: "Ortak bahçenin girişindeki kural yazısını okuyacaksın: kapı ne zaman açık, ne yapılabilir, ne yapılamaz.",
    gloss: [
      { de: "gate", tr: "bahçe kapısı" },
      { de: "bed", tr: "parsel" },
      { de: "water", tr: "sulamak" },
      { de: "tool", tr: "alet" },
      { de: "adult", tr: "yetişkin" },
      { de: "take care of", tr: "bakmak" },
    ],
    minutes: 4,
    text:
      "GREEN CORNER — GARDEN RULES\n\n" +
      "Welcome to our garden! Please read these rules.\n\n" +
      "1. The gate is open from eight in the morning to eight in the evening.\n" +
      "2. Every family has one bed. Please take care of your own bed only.\n" +
      "3. Water the plants before ten or after six. Water is expensive.\n" +
      "4. Children are welcome, but they must stay with an adult.\n" +
      "5. Please put your tools back in the small house.\n" +
      "6. No music and no dogs.\n\n" +
      "We meet every first Saturday of the month at eleven for coffee and work.\n\n" +
      "Questions? Ask Rosa in bed number four.",
    questions: [
      {
        text: "What is this text?",
        options: ["rules for a garden", "an ad for a new garden", "a letter to one family"],
        answer: 0,
        explain: "Başlık „GARDEN RULES“ ve altında numaralı kurallar var — ilan ya da mektup değil.",
      },
      {
        text: "When can you water the plants?",
        options: ["before ten or after six", "any time in the morning", "only on Saturday"],
        answer: 0,
        explain: "„Water the plants before ten or after six.“ Cumartesi buluşma günü.",
      },
      {
        kind: "truefalse",
        text: "You can bring your dog to the garden.",
        options: ["True", "False"],
        answer: 1,
        explain: "Altıncı kural: „No music and no dogs.“",
      },
      {
        kind: "gapfill",
        text: "The gate is open until ___ in the evening.",
        options: [],
        answer: 0,
        accept: ["eight", "8"],
        explain: "„The gate is open from eight in the morning to eight in the evening.“",
      },
      {
        kind: "short_answer",
        text: "Where do the tools go?",
        options: [],
        answer: 0,
        accept: ["in the small house", "the small house", "back in the small house"],
        explain: "„Please put your tools back in the small house.“",
      },
      {
        text: "What happens on the first Saturday?",
        options: ["People meet for coffee and work.", "The garden is closed all day.", "New families get a bed."],
        answer: 0,
        explain: "„We meet every first Saturday of the month at eleven for coffee and work.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a1-lib-l2",
    course: "en",
    level: "A1",
    skill: "listening",
    title: "Your Shoes Are Ready",
    genre: "Sesli mesaj",
    intro: "Ayakkabı tamircisi telesekretere mesaj bırakıyor: ne yapıldı, ne kadar tuttu, ne getirmek gerekiyor.",
    gloss: [
      { de: "heel", tr: "topuk" },
      { de: "repair", tr: "tamir" },
      { de: "ticket", tr: "fiş" },
      { de: "keep", tr: "saklamak" },
      { de: "clean", tr: "temizlemek" },
      { de: "close", tr: "kapanmak" },
    ],
    minutes: 4,
    segments: [
      { text: "Hello, this is a message for Mr. Karaca. My name is Piotr from Fix It Shoe Repair." },
      { text: "Your black shoes are ready. We changed both heels and cleaned them." },
      { text: "The price is twenty-two euros. That is two euros less than we said, because one heel was fine." },
      { text: "We are open from nine to six, but on Wednesday we close at one." },
      { text: "Please bring the little yellow ticket. Without the ticket we cannot give you the shoes." },
      { text: "If you cannot come this week, no problem. We keep them for one month. Thank you and goodbye!" },
    ],
    questions: [
      {
        text: "Why does Piotr call?",
        options: ["The shoes are ready.", "The shoes are not ready.", "He needs more money."],
        answer: 0,
        explain: "„Your black shoes are ready.“ Fiyat da söylenenden iki euro daha az.",
      },
      {
        text: "How much is the repair?",
        options: ["twenty-two euros", "twenty-four euros", "two euros"],
        answer: 0,
        explain: "„The price is twenty-two euros.“ İki euro, söylenen fiyattan olan farktır.",
      },
      {
        kind: "truefalse",
        text: "On Wednesday the shop is open until six.",
        options: ["True", "False"],
        answer: 1,
        explain: "„… but on Wednesday we close at one.“",
      },
      {
        kind: "short_answer",
        text: "What must Mr. Karaca bring?",
        options: [],
        answer: 0,
        accept: ["the yellow ticket", "the little yellow ticket", "a ticket", "the ticket"],
        explain: "„Please bring the little yellow ticket.“",
      },
      {
        kind: "dictation",
        text: "Ayakkabıların ne kadar saklanacağını söyleyen cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["We keep them for one month.", "We keep them for one month"],
        explain: "„We keep them for one month.“ — „for“ süre uzunluğunu gösterir.",
      },
      {
        text: "What did the shop do?",
        options: ["changed the heels and cleaned the shoes", "made a new pair of shoes", "changed the color of the shoes"],
        answer: 0,
        explain: "„We changed both heels and cleaned them.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a1-lib-w2",
    course: "en",
    level: "A1",
    skill: "writing",
    title: "An Email to a Repair Shop",
    genre: "E-posta",
    intro: "Telefonun bozuldu; önce iki cümle kur, sonra tamirciye kısa bir e-posta yaz.",
    gloss: [
      { de: "broken", tr: "kırık" },
      { de: "screen", tr: "ekran" },
      { de: "cost", tr: "tutmak" },
      { de: "take", tr: "sürmek" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Telefonumun ekranı kırık.",
        answer: "The screen of my phone is broken.",
        alternatives: ["My phone's screen is broken."],
        hint: "İyelik iki yolla kurulur: „of“ ile ya da „'s“ ile; kısa biçim daha doğaldır.",
      },
      {
        kind: "build",
        tr: "Tamir ne kadar sürer?",
        answer: "How long does the repair take?",
        alternatives: ["How long will the repair take?"],
        hint: "Soru sırası: soru kelimesi + yardımcı fiil + özne + yalın fiil.",
      },
      {
        kind: "free",
        prompt:
          "Telefonun bozuldu. Tamirciye e-posta yaz: ne bozuldu, ne zaman oldu, hangi model, fiyatı ve süreyi sor, ne zaman gelebileceğini yaz ve iletişim bilgini ver.",
        checklist: [
          "Neyin bozuk olduğunu yaz",
          "Ne zaman olduğunu ve modeli söyle",
          "Fiyatı ve süreyi sor",
          "Ne zaman gelebileceğini ve numaranı yaz",
        ],
        minWords: 25,
        phrases: [
          { de: "My … is broken.", tr: "…'m bozuk." },
          { de: "It happened on …", tr: "… günü oldu." },
          { de: "How much does it cost?", tr: "Ne kadar tutar?" },
          { de: "How long does it take?", tr: "Ne kadar sürer?" },
          { de: "You can call me on …", tr: "Beni … numaradan arayabilirsiniz." },
        ],
        sample:
          "Hello, my phone fell on the street on Saturday and now the screen is broken. It is a Nova 5, two years old. " +
          "The phone works, but I cannot see the top of the screen. How much does the repair cost and how long does it take? " +
          "Can I come on Friday afternoon? You can call me on 0176 44 21 03. Thank you! Aylin Karaca",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a1-lib-s2",
    course: "en",
    level: "A1",
    skill: "speaking",
    title: "ship or sheep?",
    genre: "Ses çalışması",
    intro: "İngilizcede kısa „i“ ile uzun „ii“ iki ayrı sestir ve kelimeyi değiştirir; yedi cümlede ikisini ayır.",
    gloss: [
      { de: "ship", tr: "gemi" },
      { de: "cheap", tr: "ucuz" },
      { de: "sea", tr: "deniz" },
      { de: "fill", tr: "doldurmak" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "This ship is very big.",
        tr: "Bu gemi çok büyük.",
        hint: "„this“ ve „ship“ kısa i: dil biraz aşağıda, ses gevşek. Türkçedeki i'den daha kapalı.",
        confusions: [
          { heard: ["these sheep", "this sheep"], fix: "Uzun söylersen „sheep“ (koyun) olur; sesi kısa ve gevşek tut.", expected: "ship" },
        ],
      },
      {
        de: "I need three cheap tickets.",
        tr: "Üç ucuz bilete ihtiyacım var.",
        hint: "„need“, „three“ ve „cheap“ uzun ii; „tickets“ kısa i. Aynı cümlede iki ses var.",
        confusions: [
          { heard: ["I need three chip tickets", "chip"], fix: "„cheap“ uzun ii ile: çiiip. „chip“ başka bir kelimedir.", expected: "cheap" },
        ],
      },
      {
        de: "Please sit down and eat.",
        tr: "Lütfen otur ve ye.",
        hint: "„sit“ kısa, „eat“ uzun. Aradaki fark cümlenin anlamını taşıyor.",
        confusions: [
          { heard: ["Please seat down", "and it"], fix: "„sit“ kısa i, „eat“ uzun ii; ikisini aynı söyleme.", expected: "sit" },
        ],
      },
      {
        de: "My sister lives near the sea.",
        tr: "Kız kardeşim denizin yakınında oturuyor.",
        hint: "„lives“ kısa i, „sea“ uzun ii. „leaves“ demek istemiyorsun.",
        confusions: [
          { heard: ["leaves near", "see"], fix: "„lives“ kısa: livz. Uzun söylersen „leaves“ (ayrılır) olur.", expected: "lives" },
        ],
      },
      {
        de: "It is six o'clock now.",
        tr: "Saat şimdi altı.",
        hint: "„it“, „is“ ve „six“ üçü de kısa i; sesi uzatma.",
        confusions: [
          { heard: ["eat is six", "seeks"], fix: "Üç kelimede de kısa i var; ağzını fazla germe.", expected: "six" },
        ],
      },
      {
        de: "These children live here.",
        tr: "Bu çocuklar burada oturuyor.",
        hint: "„these“ uzun ii, „children“ ve „live“ kısa i. İlk kelime çoğul olduğu için uzun.",
        confusions: [
          { heard: ["This children", "leave here"], fix: "„these“ uzun ii ve çoğul; „live“ ise kısa.", expected: "These" },
        ],
      },
      {
        de: "Can you fill my cup, please?",
        tr: "Bardağımı doldurur musun lütfen?",
        hint: "„fill“ kısa i. Uzun söylersen „feel“ (hissetmek) olur.",
        confusions: [
          { heard: ["feel my cup", "fell"], fix: "Kısa ve gevşek: fil. „feel“ uzun, „fell“ ise e sesiyle.", expected: "fill" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a1-lib-g2",
    course: "en",
    level: "A1",
    skill: "grammar",
    title: "am, is, are — and there is",
    genre: "Kural",
    intro: "Türkçede olmayan bir zorunluluk: İngilizce cümlede fiil hep bulunur, „var“ ise ayrı bir kalıpla söylenir.",
    focus: "to be ve there is / there are",
    gloss: [
      { de: "ready", tr: "hazır" },
      { de: "near", tr: "yakın" },
      { de: "garden", tr: "bahçe" },
      { de: "milk", tr: "süt" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Fiilsiz cümle olmaz",
        tr: "Türkçede „Ben öğretmenim“ derken ayrı bir fiil yoktur, ek yeter. İngilizcede her cümlede bir fiil bulunmak zorundadır ve burada o fiil „be“dir: I am, you are, he / she / it is, we / you / they are.",
        examples: [
          { de: "I am a teacher.", tr: "Öğretmenim.", note: "„I teacher“ olmaz" },
          { de: "She is from Poland.", tr: "Polonyalı." },
          { de: "We are ready.", tr: "Hazırız." },
        ],
      },
      {
        heading: "Olumsuz ve soru",
        tr: "Olumsuzda „not“ fiilden SONRA gelir: I am not, he is not (isn't), they are not (aren't). Soruda ise fiil ile özne yer değiştirir: Are you …? Is she …? Ayrı bir yardımcı fiil eklenmez.",
        examples: [
          { de: "He isn't at home.", tr: "Evde değil.", note: "is + not" },
          { de: "Are you ready?", tr: "Hazır mısın?" },
          { de: "Is she your sister?", tr: "O senin kız kardeşin mi?" },
        ],
      },
      {
        heading: "„var“ demek: there is / there are",
        tr: "Türkçedeki „var“ İngilizcede „have“ ile değil, „there is“ ve „there are“ ile söylenir. Tekilde is, çoğulda are gelir; olumsuzu there isn't / there aren't, sorusu Is there …? / Are there …?",
        examples: [
          { de: "There is a bank near here.", tr: "Buranın yakınında bir banka var." },
          { de: "There are two cats in the garden.", tr: "Bahçede iki kedi var.", note: "çoğul → are" },
          { de: "There isn't any milk.", tr: "Hiç süt yok." },
        ],
      },
    ],
    questions: [
      {
        text: "She ___ from Poland.",
        options: ["is", "are", "am"],
        answer: 0,
        explain: "„she“ üçüncü tekildir ve „is“ alır.",
      },
      {
        text: "___ you ready?",
        options: ["Are", "Is", "Am"],
        answer: 0,
        explain: "„you“ ile „are“ kullanılır; soruda fiil başa geçer.",
      },
      {
        text: "___ a bank near here?",
        options: ["Is there", "There is", "Has there"],
        answer: 0,
        explain: "„var mı?“ sorusu „Is there …?“ ile kurulur; „have“ kullanılmaz.",
      },
      {
        kind: "gapfill",
        text: "I ___ a student.",
        options: [],
        answer: 0,
        accept: ["am", "'m"],
        explain: "Birinci tekil kişi „am“ alır: I am a student.",
      },
      {
        kind: "gapfill",
        text: "There ___ two cats in the garden.",
        options: [],
        answer: 0,
        accept: ["are"],
        explain: "Arkasından çoğul isim geliyor: there are.",
      },
      {
        kind: "gapfill",
        text: "My brother ___ not at home.",
        options: [],
        answer: 0,
        accept: ["is", "isn't", "is not"],
        explain: "„my brother“ = he, yani „is“; olumsuzda „not“ arkasından gelir.",
      },
      {
        kind: "gapfill",
        text: "___ there any milk?",
        options: [],
        answer: 0,
        accept: ["Is", "is"],
        explain: "„milk“ sayılamaz ve tekil sayılır: Is there any milk?",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["There", "is", "a", "park", "near", "here"],
        explain: "Varlık bildiren kalıp başta durur: There is a park near here.",
      },
      {
        kind: "truefalse",
        text: "„There have two chairs in the room.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„var“ için „have“ kullanılmaz; doğrusu „There are two chairs in the room.“",
      },
      {
        kind: "truefalse",
        text: "„My parents are teachers.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Özne çoğul olduğu için „are“ doğru; meslek adı da çoğul yazılır.",
      },
    ],
  },
];
