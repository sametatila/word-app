import type { SkillExercise } from "../types";

/**
 * EN · C1 · Ünite 8 — "Sözleşmeyi bir arada tutmak, kararda alay yoktur,
 * konuşulan ve yazılan, görüşmeyi yönetmek".
 *
 * Dört ders: Holding a contract together · No irony in a ruling ·
 * Spoken and written · Managing the conversation.
 *
 *   Kelime: affidavit of support, hardship case, federal agency,
 *           registry, lucrative, thrifty, cyclical, colloquial language,
 *           feel for language, emphatically, empty phrase, haltingly,
 *           accent-free, expressive power, streamline, circumvent,
 *           quick wit, fear of speaking, pay homage, become entrenched.
 *   Kalıp:  This clause alone binds the sponsor to the affidavit of support. ·
 *           Such a hardship case is rare. ·
 *           The latter falls to the federal agency. ·
 *           Not exactly lucrative, is it? ·
 *           I wouldn't call that thrifty. ·
 *           Hardly cyclical, is it? ·
 *           In colloquial language the same line lands differently. ·
 *           A feel for language tells you which register fits. ·
 *           Said emphatically, an empty phrase sounds like a claim. ·
 *           To streamline a talk is not to circumvent a question. ·
 *           A quick wit cannot cure a fear of speaking. ·
 *           What we pay homage to tends to become entrenched.
 *
 * Ünitenin tek öğretme noktası SORU EKİ. İngilizce onu her seferinde
 * yeniden HESAPLIYOR: hangi yardımcı fiil, cümle artı mı eksi mi, özne
 * hangi adıla iniyor. Komşu dil ise değişmez tek bir sözcük koyuyor
 * („oder?“) ve hiç hesap yapmıyor. Hesabın bedeli var ama karşılığı da
 * var: ek, cümlenin GİZLİ KUTBUNU açığa çıkaran tek görünür kanıt —
 * „Hardly cyclical, is it?“ içinde „not“ yokken ek artı kalıyor, çünkü
 * „hardly“ cümleyi çoktan olumsuz saymış. Almancanın böyle bir testi yok.
 * İkinci ölçü: ekin bir TABANI var — konuşmada her yerde, kararda ya da
 * raporda hiç. Yazı aynı işi başka yoldan görmek zorunda, ünite 3'teki
 * eksiltili söyleyiş de o yüzden yazının aracı.
 */
export const enC1U08: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-u08-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 8,
    title: "Running a small bookshop",
    genre: "interview",
    intro: "Babasının kitapçısını devralan Hana ile bir söyleşi. Dükkân nasıl kâra geçti?",
    gloss: [
      { de: "a bookshop", tr: "kitapçı" },
      { de: "an accountant", tr: "muhasebeci" },
      { de: "an employee", tr: "çalışan" },
      { de: "nodded", tr: "başını salladı" },
      { de: "the trade", tr: "sektör" },
      { de: "simply", tr: "sadece" },
      { de: "lucrative", tr: "kârlı" },
      { de: "thrifty", tr: "tutumlu" },
      { de: "cyclical", tr: "dönemsel" },
      { de: "a receipt", tr: "makbuz" },
      { de: "a supplier", tr: "tedarikçi" },
    ],
    minutes: 12,
    text:
      "When Hana Sato took over her father's bookshop on Canal Street in 2019, her accountant looked at the numbers and laughed. „Not exactly lucrative, is it?“ he said. She laughed too. It wasn't.\n" +
      "Five years later, the shop pays two salaries and its own rent, which is more than many bookshops can say. I asked her how.\n" +
      "„Mostly by being boring,“ she said. „People expect a bookshop owner to be a dreamer, don't they? I'm not. I read the numbers every Monday morning before I read anything else.“\n" +
      "The first thing she changed was the stock. Her father had bought what he liked. Hana buys what the neighborhood reads, and she keeps a notebook of every book a customer asks for and cannot find. „That notebook is my best employee, isn't it?“ she said, and her assistant, Leo, nodded from behind the counter.\n" +
      "The second change was the café corner. It takes up four square meters and brings in almost a third of the income. „Coffee isn't why people come, is it?“ she said. „But it's why they stay, and people who stay buy books.“\n" +
      "Her father still visits every Friday. He admits that he never kept receipts and paid suppliers whenever he remembered. „I wouldn't call that thrifty,“ Hana said, smiling. „He'd call it trusting.“\n" +
      "Is the book trade simply going through a bad period that will pass? Hana doesn't think so. „Hardly cyclical, is it? People haven't stopped reading. They've stopped buying books from shops that don't know them.“\n" +
      "She has no plans to open a second shop. „Two shops, two sets of problems. One is enough, isn't it?“",
    questions: [
      {
        text: "What did the accountant think of the shop in 2019?",
        options: ["It did not make much money.", "It made a lot of money.", "It needed a café."],
        answer: 0,
        explain: "„Not exactly lucrative, is it?“",
      },
      {
        text: "How much of the income does the café corner bring in?",
        options: ["almost a third", "almost half", "four percent"],
        answer: 0,
        explain: "„It takes up four square meters and brings in almost a third of the income.“",
      },
      {
        kind: "truefalse",
        text: "Hana keeps a notebook of books that customers could not find.",
        options: ["True", "False"],
        answer: 0,
        explain: "„she keeps a notebook of every book a customer asks for and cannot find.“",
      },
      {
        kind: "gapfill",
        text: "Her father never kept ___ and paid suppliers whenever he remembered.",
        options: [],
        answer: 0,
        accept: ["receipts"],
        explain: "„He admits that he never kept receipts and paid suppliers whenever he remembered.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Hana took over her father's bookshop.",
          "She changed the stock.",
          "She opened a café corner.",
          "She has no plans for a second shop.",
        ],
        explain: "Devralma, stok, kafe köşesi, en sonda gelecek planı.",
      },
      {
        kind: "short_answer",
        text: "When does Hana read the numbers?",
        options: [],
        answer: 0,
        accept: ["every Monday morning", "Monday morning", "on Mondays"],
        explain: "„I read the numbers every Monday morning before I read anything else.“",
      },
    ],
  },
  {
    id: "en-c1-u08-r2",
    course: "en",
    level: "C1",
    skill: "reading",
    unit: 8,
    title: "Coaching nurses to speak up",
    genre: "article",
    intro: "Yurt dışında eğitim almış hemşirelere konuşma koçluğu yapan Ruth'un portresi. Hemşireler en çok neyi öğrenmek istiyor?",
    gloss: [
      { de: "a ward", tr: "servis" },
      { de: "a decade", tr: "on yıl" },
      { de: "an accent", tr: "aksan" },
      { de: "enter", tr: "girmek" },
      { de: "intensive care", tr: "yoğun bakım" },
      { de: "haltingly", tr: "kekeleyerek" },
      { de: "accent-free", tr: "aksansız" },
      { de: "emphatically", tr: "vurgulayarak" },
      { de: "a pharmacy", tr: "eczane" },
    ],
    minutes: 12,
    text:
      "Every Tuesday evening, in a small room above a pharmacy, Ruth Okafor coaches nurses who trained abroad and now work in the hospitals of the city. Most of them passed their language exams years ago. What they want now is harder to test.\n" +
      "„They can write a perfect report,“ Ruth says. „Then the son of a patient shouts at them in the corridor, and they answer haltingly, or not at all.“\n" +
      "Ruth arrived from Lagos twenty years ago and worked on a children's ward for a decade. She does not promise anyone an accent-free voice. „That was never the goal, was it? Half the doctors in this building have an accent. Nobody listens for it once you sound sure of yourself.“\n" +
      "Sounding sure of yourself is what she trains. In one exercise, a nurse has to tell an angry visitor that he cannot enter the ward. Said quietly, with an apology at the start, the message invites an argument. Said calmly and emphatically, with the reason first, it usually ends one.\n" +
      "Her students say the change shows quickly. Amira, who came from Cairo three years ago, used to hand difficult phone calls to a colleague. Last month she called a family at midnight to tell them that their father had been moved to intensive care. „I didn't read from a card,“ she says. „I just told them what had happened and what would happen next.“\n" +
      "Ruth thinks the hospitals should pay for this kind of training, and she has written to all three of them. So far, one has replied. It offered her a room. „A room is nice,“ she says. „Not exactly a budget, is it?“\n" +
      "The course is free, and there is a waiting list of forty names.",
    questions: [
      {
        text: "Where does Ruth coach the nurses?",
        options: ["in a room above a pharmacy", "on a hospital ward", "at a language school"],
        answer: 0,
        explain: "„Every Tuesday evening, in a small room above a pharmacy, Ruth Okafor coaches nurses who trained abroad…“",
      },
      {
        text: "What does Ruth not promise?",
        options: ["an accent-free voice", "a job in a hospital", "a language exam"],
        answer: 0,
        explain: "„She does not promise anyone an accent-free voice.“",
      },
      {
        kind: "truefalse",
        text: "All three hospitals have offered to pay for the course.",
        options: ["True", "False"],
        answer: 1,
        explain: "„So far, one has replied. It offered her a room.“",
      },
      {
        kind: "gapfill",
        text: "Said calmly and ___, with the reason first, it usually ends one.",
        options: [],
        answer: 0,
        accept: ["emphatically"],
        explain: "„Said calmly and emphatically, with the reason first, it usually ends one.“",
      },
      {
        kind: "order",
        text: "Metnin sırası: doğru sıraya koy.",
        options: [],
        answer: 0,
        items: [
          "Ruth arrived from Lagos twenty years ago.",
          "A nurse practices telling a visitor to stay out.",
          "Amira called a family at midnight.",
          "Ruth wrote to three hospitals.",
        ],
        explain: "Koçun geçmişi, bir alıştırma, bir öğrencinin deneyimi, en sonda para sorunu.",
      },
      {
        kind: "short_answer",
        text: "How many people are on the waiting list?",
        options: [],
        answer: 0,
        accept: ["forty", "40", "forty people"],
        explain: "„The course is free, and there is a waiting list of forty names.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-u08-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 8,
    title: "Chairing a meeting",
    genre: "dialogue",
    intro: "Görüşmeyi kısaltmak ile soruyu atlatmak arasındaki fark.",
    gloss: [
      { de: "visible", tr: "görünür" },
      { de: "shortened", tr: "kısaltılmış" },
      { de: "efficient", tr: "verimli" },
      { de: "fourth", tr: "dördüncü" },
      { de: "compliment", tr: "iltifat" },
      { de: "a question", tr: "soru" },
      { de: "the difference", tr: "fark" },
      { de: "an agenda", tr: "gündem" },
      { de: "unanswered", tr: "cevapsız" },
      { de: "cure", tr: "iyileştirmek" },
      { de: "speed", tr: "hız" },
      { de: "silence", tr: "sessizlik" },
      { de: "worse", tr: "daha kötü" },
      { de: "repeated", tr: "yinelenen" },
      { de: "a phrase", tr: "kalıp" },
      { de: "furniture", tr: "mobilya" },
      { de: "a reprimand", tr: "azar" },
      { de: "softened", tr: "yumuşatılmış" },
      { de: "on record", tr: "kayıtlı" },
      { de: "at the top", tr: "en üstte" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Deniz", text: "To streamline a talk is not to circumvent a question. I put that line at the top of the page before every meeting I chair." },
      { speaker: "Kaan", text: "Is the difference always visible?" },
      { speaker: "Deniz", text: "Afterward it is. A shortened talk leaves the agenda finished and one question still unanswered, and everyone in the room can name which one." },
      { speaker: "Kaan", text: "Not exactly efficient, is it?" },
      { speaker: "Deniz", text: "Say that at the table and you will get an answer. Write it in the minutes and you will get a complaint about the minutes." },
      { speaker: "Kaan", text: "A quick wit cannot cure a fear of speaking." },
      { speaker: "Deniz", text: "It cannot, and it often makes it worse, because speed in the chair teaches the quiet half of the room that silence is cheaper than being cut off." },
      { speaker: "Kaan", text: "So what do you do instead?" },
      { speaker: "Deniz", text: "I ask the question twice and wait the second time. Nothing else has ever worked, and it costs about forty seconds." },
      { speaker: "Kaan", text: "And the last line on your page?" },
      { speaker: "Deniz", text: "What we pay homage to tends to become entrenched. A phrase repeated in three meetings is furniture by the fourth, and nobody can argue with furniture." },
      { speaker: "Kaan", text: "Even a reprimand?" },
      { speaker: "Deniz", text: "A reprimand most of all. Softened once it is polite; softened four times it is on record as a compliment, and the person it was meant for has heard nothing." },
    ],
    questions: [
      {
        text: "What does a shortened talk leave?",
        options: ["one question unanswered", "one question repeated", "no minutes"],
        answer: 0,
        explain: "„A shortened talk leaves the agenda finished and one question still unanswered…“",
      },
      {
        text: "Why does speed make it worse?",
        options: ["silence becomes cheaper", "it saves time", "the chair is quiet"],
        answer: 0,
        explain: "„silence is cheaper than being cut off.“",
      },
      {
        kind: "truefalse",
        text: "Deniz asks the question twice and waits the second time.",
        options: ["True", "False"],
        answer: 0,
        explain: "„I ask the question twice and wait the second time.“",
      },
      {
        kind: "gapfill",
        text: "A quick wit cannot ___ a fear of speaking.",
        options: [],
        answer: 0,
        accept: ["cure"],
        explain: "„A quick wit cannot cure a fear of speaking.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["To streamline a talk is not to circumvent a question.", "To streamline a talk is not to circumvent a question"],
        explain: "Mastar özne; olumsuz biçim bir çıkarımı reddediyor.",
      },
      {
        kind: "short_answer",
        text: "What is a phrase by the fourth meeting?",
        options: [],
        answer: 0,
        accept: ["furniture", "it is furniture", "part of the room"],
        explain: "„A phrase repeated in three meetings is furniture by the fourth…“",
      },
    ],
  },
  {
    id: "en-c1-u08-l2",
    course: "en",
    level: "C1",
    skill: "listening",
    unit: 8,
    title: "An evening on family visas",
    genre: "monologue",
    intro: "Bir göç danışmanı, aile vizesi için verilen kefalet taahhüdünü anlatıyor. Kefil neyi imzalıyor?",
    gloss: [
      { de: "die", tr: "ölmek" },
      { de: "ill", tr: "hasta" },
      { de: "involved", tr: "dahil" },
      { de: "poverty", tr: "yoksulluk" },
      { de: "a pay slip", tr: "maaş bordrosu" },
      { de: "general", tr: "genel" },
      { de: "bind", tr: "bağlamak" },
      { de: "an affidavit of support", tr: "kefalet taahhüdü" },
      { de: "a sponsor", tr: "kefil" },
      { de: "a clause", tr: "madde" },
      { de: "a hardship case", tr: "mağduriyet durumu" },
      { de: "the registry", tr: "nüfus müdürlüğü" },
      { de: "a federal agency", tr: "federal kurum" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Tuna", text: "Good evening. Tonight is about one document: the affidavit of support, the promise a sponsor signs when a family member moves here." },
      { speaker: "Tuna", text: "Most of the form is dates and addresses. One clause is not. This clause alone binds the sponsor to support the relative for ten years, even if the family later falls apart." },
      { speaker: "Tuna", text: "I have seen sponsors sign it in five minutes at a kitchen table. Please read that clause twice, and ask a lawyer if you are not sure." },
      { speaker: "Tuna", text: "People often ask me about exceptions. There is one: if the sponsor dies or becomes seriously ill, a hardship case can be opened." },
      { speaker: "Tuna", text: "Such a hardship case is rare, and it takes months." },
      { speaker: "Tuna", text: "Two offices are involved. The registry in your town checks your address and income, and a second office decides on the visa. The latter falls to the federal agency, so do not ask the town hall about it." },
      { speaker: "Tuna", text: "The most common mistake is money. Your income must be one and a quarter times the poverty line, and bonuses do not count." },
      { speaker: "Tuna", text: "Bring three recent pay slips and a letter from your employer. Copies are fine, but the letter must be signed." },
      { speaker: "Tuna", text: "We have ten minutes for questions. Please keep them general; personal cases I can discuss next week, by appointment." },
    ],
    questions: [
      {
        text: "How long does the clause bind the sponsor?",
        options: ["ten years", "five years", "one year"],
        answer: 0,
        explain: "„This clause alone binds the sponsor to support the relative for ten years, even if the family later falls apart.“",
      },
      {
        text: "Who decides on the visa?",
        options: ["the federal agency", "the registry", "the town hall"],
        answer: 0,
        explain: "„The latter falls to the federal agency, so do not ask the town hall about it.“",
      },
      {
        kind: "truefalse",
        text: "Hardship cases are common and quick.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Such a hardship case is rare, and it takes months.“",
      },
      {
        kind: "gapfill",
        text: "Your income must be one and a quarter times the poverty ___.",
        options: [],
        answer: 0,
        accept: ["line"],
        explain: "„Your income must be one and a quarter times the poverty line, and bonuses do not count.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Such a hardship case is rare, and it takes months.", "Such a hardship case is rare, and it takes months"],
        explain: "„Such“ bir önceki cümledeki durumu geri gösteriyor.",
      },
      {
        kind: "short_answer",
        text: "How many pay slips should people bring?",
        options: [],
        answer: 0,
        accept: ["three", "3", "three recent pay slips"],
        explain: "„Bring three recent pay slips and a letter from your employer.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-u08-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 8,
    title: "Remarks about money",
    genre: "info",
    intro: "Para ve işletme üzerine kısa yorumlar yaz, sonra kitapçı söyleşisinin kartını doldur.",
    gloss: [
      { de: "lucrative", tr: "kazançlı" },
      { de: "thrifty", tr: "tutumlu" },
      { de: "cyclical", tr: "döngüsel" },
      { de: "to streamline", tr: "sadeleştirmek" },
      { de: "to circumvent", tr: "atlatmak" },
      { de: "a quick wit", tr: "hazırcevaplık" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Pek kazançlı sayılmaz, değil mi?",
        answer: "Not exactly lucrative, is it?",
        hint: "Az söyleme, sonra hesaplanan ek.",
      },
      {
        kind: "build",
        tr: "Ben buna tutumlu demezdim.",
        answer: "I wouldn't call that thrifty.",
        hint: "Ek yok: bu satır yazıya ait.",
      },
      {
        kind: "build",
        tr: "Pek döngüsel değil, değil mi?",
        answer: "Hardly cyclical, is it?",
        hint: "„Hardly“ cümleyi olumsuz saydırıyor; ek artı kalıyor.",
      },
      {
        kind: "build",
        tr: "Bir görüşmeyi sadeleştirmek bir soruyu atlatmak değildir.",
        answer: "To streamline a talk is not to circumvent a question.",
        hint: "Mastar özne; olumsuz biçim çıkarımı reddediyor.",
      },
      {
        kind: "build",
        tr: "Hazırcevaplık konuşma çekingenliğini iyileştiremez.",
        answer: "A quick wit cannot cure a fear of speaking.",
        hint: "Hız çekingenliği büyütüyor.",
      },
      {
        kind: "form",
        prompt: "Kitapçı söyleşisi için bilgi kartını doldur.",
        facts: "Hana dükkânı 2019'da babasından devraldı; muhasebecinin ilk yorumu: pek kazançlı sayılmaz, değil mi? Dükkân bugün iki maaşı ve kirasını karşılıyor; kafe köşesi gelirin neredeyse üçte birini getiriyor; ikinci bir dükkân açmayı düşünmüyor.",
        fields: [
          { label: "Taken over in", answer: "2019", accept: ["in 2019"] },
          { label: "First remark of the accountant", answer: "Not exactly lucrative, is it?", accept: ["not exactly lucrative"] },
          { label: "Pays for", answer: "two salaries and the rent", accept: ["two salaries", "salaries and rent"] },
          { label: "Café corner", answer: "almost a third of the income", accept: ["almost a third", "a third"] },
          { label: "Second shop", answer: "no plans", accept: ["not planned", "none"] },
        ],
      },
    ],
  },
  {
    id: "en-c1-u08-w2",
    course: "en",
    level: "C1",
    skill: "writing",
    unit: 8,
    title: "Notes from the visa office",
    genre: "info",
    intro: "Vize bürosunda konuşulanlar ve yazılanlar: notların cümlelerini kur.",
    gloss: [
      { de: "colloquial language", tr: "günlük konuşma dili" },
      { de: "a feel for language", tr: "dil sezgisi" },
      { de: "emphatically", tr: "üstüne basa basa" },
      { de: "an empty phrase", tr: "içi boş söz" },
      { de: "an affidavit of support", tr: "taahhütname" },
      { de: "a hardship case", tr: "mağduriyet durumu" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Günlük konuşma dilinde aynı satır başka türlü karşılanıyor.",
        answer: "In colloquial language the same line lands differently.",
        hint: "Dil düzeyi sözcükleri değil etkiyi değiştiriyor.",
      },
      {
        kind: "build",
        tr: "Hangi dil düzeyinin uyduğunu dil sezgisi söyler.",
        answer: "A feel for language tells you which register fits.",
        hint: "Kurala yazılamayan bilgi.",
      },
      {
        kind: "build",
        tr: "Üstüne basa basa söylenince içi boş bir söz iddia gibi duyuluyor.",
        answer: "Said emphatically, an empty phrase sounds like a claim.",
        hint: "Sözcükler değişmedi; söyleyiş değişti.",
      },
      {
        kind: "build",
        tr: "Sponsoru taahhütnameye bağlayan tek şey bu madde.",
        answer: "This clause alone binds the sponsor to the affidavit of support.",
        hint: "„Alone“ öznenin ardında: yazılı alışkanlık.",
      },
      {
        kind: "build",
        tr: "Böyle bir mağduriyet durumu seyrektir.",
        answer: "Such a hardship case is rare.",
        hint: "Geriye işaret ediyor; betimlemenin kesin olduğuna söz veriyor.",
      },
    ],
  },
];
