import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `en-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Türler: zanaat söyleşisi, radyo denemesi ve resmî görüş. Üçü de ortaç
 * öbekleriyle yoğun; dil bilgisi participle clauses.
 */
export const enC1P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r4",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "Tuning Is a Decision, Not a Measurement",
    genre: "interview",
    intro: "Kırk yıllık bir piyano akortçusuyla söyleşi okuyacaksın: işi neden ölçüm değil karar, neyi kimse duymuyor.",
    gloss: [
      { de: "tune", tr: "akort etmek" },
      { de: "key", tr: "ton" },
      { de: "arithmetic", tr: "aritmetik" },
      { de: "pin", tr: "burgu" },
      { de: "acceptable", tr: "kabul edilebilir" },
      { de: "unheated", tr: "ısıtılmamış" },
      { de: "edit", tr: "kurgulamak" },
      { de: "hold", tr: "tutmak" },
    ],
    minutes: 10,
    text:
      "“TUNING IS A DECISION, NOT A MEASUREMENT”\n" +
      "An interview with Halldór Reyn, piano tuner, forty-one years in the trade\n\n" +
      "People assume your job is to make the notes correct. Is it?\n" +
      "Having spent four decades doing this, I can tell you that there is no correct. A piano cannot be in tune " +
      "with itself in every key at once; that is arithmetic, not opinion. What I do is decide where to put the " +
      "error. Tuned for a Chopin evening, the instrument will sound slightly wrong in keys the pianist is not " +
      "going to use, and nobody will ever know.\n\n" +
      "How do you decide?\n" +
      "By asking who plays it. A piano in a school, played by thirty children a week, is tuned differently from " +
      "one in a house where somebody practices Bach. Told that the family also has a violinist, I would change " +
      "something again.\n\n" +
      "What do people get wrong when they buy a second-hand piano?\n" +
      "They listen to it. Sitting in a shop, having been tuned that morning, almost any piano sounds acceptable. " +
      "The things that matter cannot be heard in ten minutes: whether the frame has moved, whether the pins " +
      "still hold. A piano that has stood in a cold room for two winters may hold a tuning for three weeks, and " +
      "you will not discover that until you have paid for the delivery.\n\n" +
      "Has anything changed in forty years?\n" +
      "Two things. Central heating, which is much harder on instruments than cold ever was, and recordings. " +
      "Having grown up with recordings, people now expect a piano to sound like a recording, and a recording " +
      "has been edited.\n\n" +
      "Do you still enjoy it?\n" +
      "Most days. Ask me again in February, working in an unheated church, having driven ninety minutes with " +
      "the tools on the back seat. But there is a moment, usually about twenty minutes in, when the instrument " +
      "stops fighting. Whatever else the job is, that has not got old.",
    questions: [
      {
        text: "What does Halldór say his job really is?",
        options: [
          "deciding where to put the error",
          "making every note exactly correct",
          "repairing pianos that are broken",
        ],
        answer: 0,
        explain: "„What I do is decide where to put the error.“",
      },
      {
        text: "How does he decide how to tune an instrument?",
        options: [
          "by asking who plays it",
          "by listening to the instrument for ten minutes",
          "by checking whether the frame has moved",
        ],
        answer: 0,
        explain: "„By asking who plays it. A piano in a school … is tuned differently.“",
      },
      {
        kind: "truefalse",
        text: "For him a piano can never be in tune in every key at once.",
        options: ["True", "False"],
        answer: 0,
        explain: "„A piano cannot be in tune with itself in every key at once; that is arithmetic, not opinion.“",
      },
      {
        kind: "gapfill",
        text: "Central heating is much harder on instruments than ___ ever was.",
        options: [],
        answer: 0,
        accept: ["cold", "the cold"],
        explain: "„Central heating, which is much harder on instruments than cold ever was …“",
      },
      {
        kind: "short_answer",
        text: "What has changed what people expect a piano to sound like?",
        options: [],
        answer: 0,
        accept: ["recordings", "recorded music", "records"],
        explain: "„Having grown up with recordings, people now expect a piano to sound like a recording.“",
      },
      {
        text: "Why does he mention February?",
        options: [
          "to show that the work is not always pleasant",
          "because pianos go out of tune in winter",
          "because churches are closed in that month",
        ],
        answer: 0,
        explain: "„Ask me again in February, working in an unheated church, having driven ninety minutes …“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l4",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "The Last Mile",
    genre: "essay",
    intro: "Radyoda kısa bir deneme dinleyeceksin: bir kolinin en pahalı iki kilometresi ve bunun kimin için ne anlama geldiği.",
    gloss: [
      { de: "bulk", tr: "toplu" },
      { de: "schedule", tr: "tarife" },
      { de: "locker", tr: "emanet dolabı" },
      { de: "routing", tr: "güzergâh planlama" },
      { de: "equally", tr: "eşit biçimde" },
      { de: "attempt", tr: "girişim" },
    ],
    minutes: 10,
    segments: [
      { text: "There is a number in logistics that surprises everybody who hears it for the first time." },
      { text: "Of the total cost of moving a parcel from a factory in one country to a door in another, more than half is spent on the final two kilometers." },
      { text: "Having traveled nine thousand kilometers for a few euros, the parcel then costs several more to cross a town." },
      { text: "The reason is not distance. It is that everything before the last stage happens in bulk, on schedules, between places designed for it." },
      { text: "The last stage happens once, to one address, at a time nobody controls. A container ship is loaded by machine. A van is loaded by a person who has to decide, forty times a day, which parcel goes on top." },
      { text: "Considered from the outside, the obvious answer is efficiency: better routes, better software. That has been tried, and it works, up to a point." },
      { text: "The remaining cost is not a routing problem. It is that people are not at home, and that is not a scheduling failure. It is what a working day looks like." },
      { text: "This is why almost every serious attempt to fix the last mile has quietly stopped trying to reach the door. Lockers, shops, pick-up points: all of them move the problem to a place that is always open." },
      { text: "Having watched three of these systems grow, I would say that the interesting question is no longer technical." },
      { text: "It is who is expected to walk. A locker four streets away is nothing to me and a serious matter to my neighbor, who is eighty-one." },
      { text: "Which brings us to the thing that is rarely said out loud. Delivery to the door was never a service that everybody needed equally, and removing it will not be felt equally either." },
    ],
    questions: [
      {
        text: "What is the surprising number?",
        options: [
          "more than half the cost is the last two kilometers",
          "more than half of parcels arrive late",
          "more than half of the vans travel empty",
        ],
        answer: 0,
        explain: "„… more than half is spent on the final two kilometers.“",
      },
      {
        text: "Why is the last stage so expensive?",
        options: [
          "It happens once, to one address, at an uncontrolled time.",
          "A van is loaded by machine and not by a person.",
          "The routing software is still not good enough.",
        ],
        answer: 0,
        explain: "„The last stage happens once, to one address, at a time nobody controls.“",
      },
      {
        kind: "truefalse",
        text: "Better routing software has solved the problem.",
        options: ["True", "False"],
        answer: 1,
        explain: "„That has been tried, and it works, up to a point. The remaining cost is not a routing problem.“",
      },
      {
        kind: "short_answer",
        text: "What do lockers and pick-up points have in common?",
        options: [],
        answer: 0,
        accept: ["they are always open", "always open", "they never close"],
        explain: "„… all of them move the problem to a place that is always open.“",
      },
      {
        kind: "dictation",
        text: "Denemenin asıl sorusunu formüle eden cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["It is who is expected to walk.", "It is who is expected to walk"],
        explain: "„It is who is expected to walk.“ — vurgu cümlesi soruyu teknikten dağıtıma kaydırıyor.",
      },
      {
        text: "What is the final point of the essay?",
        options: [
          "The change will not be felt equally.",
          "Lockers should be banned in city centers.",
          "Delivery costs are certain to keep rising.",
        ],
        answer: 0,
        explain: "„… removing it will not be felt equally either.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w4",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "Response on Missed Appointments",
    genre: "opinion",
    intro: "Görüşe açılmış bir öneriye resmî yanıt yazacaksın; önce iki cümle kur, sonra görüşünü yaz.",
    gloss: [
      { de: "fee", tr: "ücret" },
      { de: "exempt", tr: "muaf tutmak" },
      { de: "deterrent", tr: "caydırıcı" },
      { de: "amendment", tr: "değişiklik önerisi" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Yeni sistemi altı ay denedikten sonra üç sorun görüyoruz.",
        answer: "Having tried the new system for six months, we see three problems.",
        alternatives: ["We see three problems, having tried the new system for six months."],
        hint: "„Having + üçüncü hâl“ önce olan eylemi kısaltır; öbek cümlenin sonuna da alınabilir.",
      },
      {
        kind: "build",
        tr: "Bize göre aynı gün iptal edilen randevular kapsam dışında tutulmalı.",
        answer: "In our view appointments canceled on the same day should be excluded.",
        alternatives: ["Appointments canceled on the same day should, in our view, be excluded."],
        hint: "Edilgen ortaç ismin arkasına gelerek ilgi cümlesini kısaltır.",
      },
      {
        kind: "free",
        prompt:
          "Görüşe açılmış öneriye resmî yanıt yaz: kabul ettiğin kısmı söyle, itirazını kanıtla destekle, somut bir değişiklik öner ve ne beklediğini belirt. Ortaç öbekleriyle sıkıştır.",
        stimulus:
          "Consultation: a fee of twenty euros is proposed for appointments missed without notice. The fee would " +
          "not apply where notice is given at least twenty-four hours in advance. Written responses are invited " +
          "until the thirtieth of September.",
        checklist: [
          "Kabul ettiğin kısmı ve nedenini yaz",
          "İtirazını rakam ya da örnekle destekle",
          "Somut bir değişiklik öner",
          "Ne beklediğini ve tarihi yaz",
        ],
        minWords: 120,
        phrases: [
          { de: "Having read the consultation, we accept that …", tr: "Metni okuduktan sonra … olduğunu kabul ediyoruz" },
          { de: "We object to … on two grounds.", tr: "…'e iki gerekçeyle itiraz ediyoruz" },
          { de: "Appointments canceled … should be excluded.", tr: "… iptal edilen randevular kapsam dışı olmalı" },
          { de: "We propose the following amendment: …", tr: "Şu değişikliği öneriyoruz: …" },
          { de: "We would ask for a written response by …", tr: "…'e kadar yazılı bir yanıt rica ederiz" },
        ],
        sample:
          "Having read the consultation, we accept that missed appointments are a genuine cost and that the " +
          "current situation is not sustainable. Our objection is not to a deterrent as such.\n\n" +
          "We object to the proposal as drafted on two grounds. First, the evidence in the consultation does not " +
          "separate the two groups it treats as one. Of the appointments recorded as missed last year, a little " +
          "over a third were at the first slot of the day, and the same pattern appears in every quarter. " +
          "Read together with the transport figures, that suggests a scheduling problem rather than a " +
          "behavioral one, and a fee will not correct it.\n\n" +
          "Second, the exemption is defined by notice rather than by circumstance. Appointments canceled on the " +
          "same day because a child is ill would be charged, while appointments canceled a month ahead for no " +
          "reason would not.\n\n" +
          "We propose the following amendment: that the fee apply only from the second missed appointment in " +
          "twelve months, that same-day cancellations for care or illness be exempt on a stated reason, and " +
          "that the figures be published by time of day so that the scheduling question can be settled.\n\n" +
          "We would ask for a written response by the thirtieth of September and would be glad to supply our own " +
          "data on first-slot attendance.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s4",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "To the Door or Not?",
    genre: "monologue",
    intro: "İki dakikaya kadar konuşacaksın: soruyu kolaylık sorusundan çıkar, dağılımı adlandır ve bir ölçüt öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Her şey kapıya teslim edilmeli mi, yoksa dolaplar ve teslim noktaları yaygınlaşmalı mı? Soruyu yalnız kolaylık sorusu olmaktan çıkar, kimin ne kaybettiğini söyle ve bir ölçüt öner.",
      bulletsTr: [
        "Soruyu kolaylıktan dağılıma taşı",
        "Teslim noktalarının gerçek kazancını söyle",
        "Bedeli kimin ödediğini somutla",
        "Ölçütünü koy ve nasıl uygulanacağını söyle",
      ],
      targets: [
        { de: "Framed as convenience, the question answers itself.", tr: "Kolaylık olarak kurulduğunda soru kendini yanıtlar." },
        { de: "Considered from the other side, …", tr: "Öteki taraftan bakıldığında, …" },
        { de: "What is rarely said is …", tr: "Nadiren söylenen şey …" },
        { de: "My criterion would be …", tr: "Benim ölçütüm … olurdu" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "Framed as convenience, the question answers itself: everybody prefers the door. Framed as distribution, " +
        "it becomes interesting. Pick-up points are genuinely better on almost every measure we usually care " +
        "about. Fewer vans, fewer failed attempts, fewer of those absurd second and third journeys made to " +
        "deliver one pair of shoes. Considered from the other side, though, the saving is produced by moving " +
        "work from a paid driver to an unpaid customer, and that work is not distributed evenly. Four streets " +
        "is nothing to me and an expedition to somebody with a stick, a stroller or a night shift ending at " +
        "seven. What is rarely said is that the door service was already unequal in the other direction: it was " +
        "cheapest to deliver in dense streets and most expensive in the places where people have least " +
        "alternative. So my criterion would not be a general rule but a floor. Let the default be a pick-up " +
        "point, because that is honest about the cost, but require every operator to deliver to the door, " +
        "without a surcharge, for anybody who registers a reason once and never has to explain it again. " +
        "The measure of a good system is not that it is cheap. It is that the people who need the exception do " +
        "not have to ask for it twice.",
      rubricHint:
        "Soru kolaylıktan dağılıma taşınmalı ve öneri bir istisna mekanizması içermeli; ortaç öbekleri beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g4",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "having said that",
    genre: "grammar",
    intro: "İngilizcenin yazıda cümleyi sıkıştırma yolu: bütün bir yan cümleyi tek bir ortaç öbeğine indirmek.",
    focus: "Participle clauses: -ing, -ed ve having + üçüncü hâl",
    gloss: [
      { de: "hurry", tr: "acele" },
      { de: "mistake", tr: "hata" },
      { de: "delay", tr: "gecikme" },
      { de: "agree", tr: "katılmak" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Yan cümleyi kısaltmak",
        tr: "Türkçede „-ip“, „-erek“ ve „-diği için“ bu işi görür. İngilizcede yan cümledeki özne ana cümleyle aynıysa özne ve yardımcı fiil düşer, geriye ortaç kalır: „After I had finished, I left“ → „Having finished, I left“.",
        examples: [
          { de: "Having finished the report, she went home.", tr: "Raporu bitirince eve gitti." },
          { de: "Sitting at the front, I could hear every word.", tr: "Önde oturduğum için her kelimeyi duyabildim." },
          { de: "Written in a hurry, the letter contained three mistakes.", tr: "Aceleyle yazıldığı için mektupta üç hata vardı." },
        ],
      },
      {
        heading: "Üç biçim, üç ilişki",
        tr: "„-ing“ etkin ve aynı zamanlı; „having + üçüncü hâl“ etkin ve daha önce olmuş; yalın üçüncü hâl edilgen. Hangisini seçtiğin iki olay arasındaki sırayı ve çatıyı belirler.",
        examples: [
          { de: "Walking home, I saw the shop was closed.", tr: "Eve yürürken dükkânın kapalı olduğunu gördüm.", note: "aynı anda" },
          { de: "Having lived here for ten years, he knows everybody.", tr: "On yıldır burada yaşadığı için herkesi tanıyor.", note: "önce olmuş" },
          { de: "Asked about the delay, the driver said nothing.", tr: "Gecikme sorulunca sürücü hiçbir şey söylemedi.", note: "edilgen" },
        ],
      },
      {
        heading: "Tek büyük tehlike",
        tr: "Ortacın öznesi ana cümlenin öznesiyle aynı olmak zorundadır. „Walking to the station, the rain started“ cümlesinde yürüyen yağmur olur. Bu hata İngilizcede o kadar yaygındır ki adı bile vardır: dangling participle.",
        examples: [
          { de: "Walking to the station, I saw the rain start.", tr: "İstasyona yürürken yağmurun başladığını gördüm.", note: "özne uyuyor" },
          { de: "Having been tuned that morning, the piano sounded fine.", tr: "O sabah akort edildiği için piyano iyi geliyordu." },
          { de: "Having read the report, I agree with the conclusion.", tr: "Raporu okuduktan sonra sonuca katılıyorum." },
        ],
      },
    ],
    questions: [
      {
        text: "___ the report, she went home.",
        options: ["Having finished", "Finishing had", "Finished"],
        answer: 0,
        explain: "Önce biten bir eylem: having + üçüncü hâl.",
      },
      {
        text: "___ in a hurry, the letter contained three mistakes.",
        options: ["Written", "Writing", "Having written"],
        answer: 0,
        explain: "Mektup yazılmıştır, yani edilgen: yalın üçüncü hâl.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "Walking to the station, I saw the rain start.",
          "Walking to the station, the rain started.",
          "Walking to the station, it started to rain heavily.",
        ],
        answer: 0,
        explain: "Ortacın öznesi ana cümlenin öznesiyle aynı olmalı; yürüyen kişi „I“dır.",
      },
      {
        kind: "gapfill",
        text: "___ (live) here for ten years, he knows everybody.",
        options: [],
        answer: 0,
        accept: ["Having lived"],
        explain: "Şimdiki duruma yol açan daha önceki bir süre: having lived.",
      },
      {
        kind: "gapfill",
        text: "___ (ask) about the delay, the driver said nothing.",
        options: [],
        answer: 0,
        accept: ["Asked"],
        explain: "Sürücüye soruluyor, yani edilgen: yalın üçüncü hâl.",
      },
      {
        kind: "gapfill",
        text: "___ (sit) at the front, I could hear every word.",
        options: [],
        answer: 0,
        accept: ["Sitting"],
        explain: "Aynı anda olan etkin bir durum: -ing biçimi.",
      },
      {
        kind: "gapfill",
        text: "“Because it had been tuned that morning, the piano sounded fine.” → “___ been tuned that morning, the piano sounded fine.”",
        options: [],
        answer: 0,
        accept: ["Having"],
        explain: "Daha önce olmuş edilgen bir olay: having been + üçüncü hâl.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Having", "read", "the", "report", "I", "agree"],
        explain: "Ortaç öbeği başta, ana cümle arkasından: Having read the report, I agree.",
      },
      {
        kind: "truefalse",
        text: "“Walking to the station, the rain started.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Ortacın öznesi yağmur olur; doğrusu „Walking to the station, I saw the rain start.“",
      },
      {
        kind: "truefalse",
        text: "“Written in a hurry, the letter contained three mistakes.” — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Edilgen ortaç doğru kullanılmış ve öznesi „the letter“ ile uyuyor.",
      },
    ],
  },
];
