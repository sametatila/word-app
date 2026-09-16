import type { QuizWeek } from "../types";

/**
 * A2 · Hafta 2 · Sağlık ve randevu (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: randevu hatırlatma e-postasını ve randevu telefonunu anlamak;
 * `should` ile tavsiye, `don't have to`/`mustn't` ayrımı, bugüne uzanan durum
 * için present perfect + `since`/`for`, hastalıkta `a`. Geri dönüş:
 * `collocation.take` (W1, `take photos` → `take a pill`).
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w02-g2` (`don't have to`): Almanca `muss nicht` 'gerek yok' ama
 *    `mustn't`e benziyor — anlamı tersine çeviren sahte dost.
 *  - `w02-g3`/`g4` (`for`, `have lived`): Almanca `seit` hem süre hem başlangıç
 *    ve şimdiki zamanla kuruluyor; Türkçe '-den beri' de öyle. İki öğrenci
 *    de `I live here since…` kuruyor.
 *  - `w02-g5` (`a headache`): Türkçede belirsiz artikel zorunlu değil; Almanca
 *    `Kopfschmerzen` artikelsiz ve çoğul. Yanlış aynı, sebep farklı.
 *  - `w02-v1` (`appointment`): `term` şıkkı Almanca `Termin` sahte dostundan;
 *    Türk öğrenci için tuzak 'randevu'nun `date`e çekilmesi.
 */
export const EN_A2_W02: QuizWeek = {
  id: "en-a2-w02",
  course: "en",
  level: "A2",
  no: 2,
  theme: "Health and appointments",
  themeTr: "Sağlık ve randevu",
  canDo: ["A2.SPK.1", "A2.SPK.4", "A2.LS.2", "A2.RD.1", "A2.GR.13", "A2.GR.16"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Email",
      genreTr: "E-posta",
      title: "Your appointment",
      body:
        "Dear Ms Green,\n\nThis is a reminder about your appointment with Dr Patel on Thursday, 12 March, at 10:30 in the morning. " +
        "Please arrive a bit early and bring your passport and a list of the pills you are taking at the moment. " +
        "If you have a fever or a bad cough, please call us before you come. Do not come into the waiting room. " +
        "If you can't come, you have to cancel your appointment at least one day before. If you don't, you will have to pay 20 pounds. " +
        "Dr Patel's room is on the second floor. The lift is next to the pharmacy on the ground floor.\n\n" +
        "Best wishes,\nRiverside Health Centre",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Phone call",
      genreTr: "Telefon görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Receptionist", text: "Good morning, Riverside Health Centre. How can I help you?" },
        { speaker: "Mr Kaya", text: "Hello, I'd like to make an appointment, please. I've had a bad headache since Monday." },
        { speaker: "Receptionist", text: "I'm sorry to hear that. Have you got a temperature?" },
        { speaker: "Mr Kaya", text: "No, I haven't. But I can't sleep well." },
        { speaker: "Receptionist", text: "We have a free appointment tomorrow at nine in the morning." },
        { speaker: "Mr Kaya", text: "I'm afraid I have to work in the morning. Is there anything in the afternoon?" },
        { speaker: "Receptionist", text: "Yes, tomorrow at a quarter past four. Is that OK?" },
        { speaker: "Mr Kaya", text: "Perfect. Thank you very much." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "en-a2-w02-r1",
      block: "read",
      ref: "t1",
      stem: "What should Ms Green bring?",
      options: [
        "only a list of her pills",
        "her passport and a list of her pills",
        "her passport and 20 pounds for the doctor",
        "a letter from the pharmacy and her passport",
      ],
      answer: 1,
      why: "`and` iki şeyi birlikte istiyor, yalnız birini seçmek eksik kalır. 20 pound bir koşula bağlı: yalnız randevu iptal edilmezse ödeniyor. `If you don't` ile gelen bilgiyi genel talimat sanmak bu metin türünde sık hata.",
      targets: ["reading.detail"],
    },
    {
      id: "en-a2-w02-r2",
      block: "read",
      ref: "t1",
      stem: "Ms Green has a bad cough. What should she do because of it?",
      options: ["arrive a bit early", "go to the pharmacy", "cancel her appointment", "call before she comes"],
      answer: 3,
      why: "`If you have a fever or a bad cough` koşulu onun durumuna uyuyor ve talimat hemen arkasında. Herkese verilen genel talimatı (`arrive a bit early`) seçmek, koşul cümlesini okumadan metnin başına dönmek demek.",
      targets: ["reading.detail"],
    },
    {
      id: "en-a2-w02-r3",
      block: "read",
      ref: "t1",
      stem: "Where is Dr Patel's room?",
      options: ["on the ground floor", "on the second floor", "next to the pharmacy", "next to the lift"],
      answer: 1,
      why: "Metin iki konum veriyor: muayenehanenin katı ve asansörün yeri. `next to the pharmacy` asansörü tarif ediyor. `The lift is…` cümlesinin öznesini atlayınca konum yanlış şeye bağlanıyor.",
      targets: ["reading.detail"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "en-a2-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "Why is Mr Kaya calling?",
      options: ["He has a temperature.", "He needs some pills.", "He has a headache.", "He can't go to work."],
      answer: 2,
      why: "`temperature` konuşmada geçiyor ama bir soruda, ve cevap `No, I haven't`. Duyulan her hastalık sözcüğü şikâyet değildir; olumsuz cevapla elenen sözcüğü işaretlemek bu sorunun tuzağı.",
      targets: ["listening.detail"],
    },
    {
      id: "en-a2-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "When is Mr Kaya's appointment?",
      options: ["tomorrow at 9:00", "tomorrow at 4:15", "tomorrow at 3:45", "today at 4:15"],
      answer: 1,
      why: "İlk önerilen saat (sabah) reddediliyor. `a quarter past four` 4'ü çeyrek geçe, yani 4:15; `a quarter to four` olsaydı 3:45 olurdu. Telefonda geçerli olan son onaylanan saattir.",
      targets: ["listening.detail", "time.clock"],
    },
    {
      id: "en-a2-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "Why can't Mr Kaya come in the morning?",
      options: ["He has to work.", "He can't sleep well.", "The doctor is busy.", "He has a headache."],
      answer: 0,
      why: "`I'm afraid` kibar bir ret açar ve gerekçe hemen arkasında: `I have to work`. Uyuyamamak ve baş ağrısı şikâyetin parçası, sabah gelememenin nedeni değil.",
      targets: ["listening.detail", "modal.have-to"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "en-a2-w02-g1",
      block: "grammar",
      stem: "You look ill. You ___ go to the doctor.",
      options: ["should to", "must to", "should", "have"],
      answer: 2,
      why: "Tavsiye `should` + yalın fiil ile verilir; modal fiilden (`should`, `must`, `can`) sonra `to` gelmez. `have` tek başına zorunluluk bildirmez, `have to` iki parçalıdır.",
      targets: ["modal.should"],
      byNative: {
        de: {
          options: ["shall", "should", "must to", "have"],
          answer: 1,
          why: "Almanca `sollen` → `shall` aktarımı yanıltıyor: `shall` tavsiye bildirmez; gündelik dilde çoğunlukla öneri sorusunda (`Shall I…?`) geçer. Tavsiye `should`, arkasından `to` almadan fiil.",
        },
      },
    },
    {
      id: "en-a2-w02-g2",
      block: "grammar",
      stem: "Tomorrow is Sunday, so I ___ go to work.",
      options: ["mustn't", "don't have to", "haven't to", "not have to"],
      answer: 1,
      why: "`don't have to` 'zorunda değilim', `mustn't` 'yasak'. Pazar günü işe gitmek yasak değil, gerekmiyor. Hata `must` = 'zorunda' ezberinden geliyor: 'zorunda değilim' `must`un olumsuzu sanılıp `mustn't` kuruluyor, oysa `mustn't` 'yapmamalı' demek.",
      targets: ["modal.have-to", "modal.must-not"],
      byNative: {
        de: {
          options: ["don't have to", "mustn't", "haven't to", "not have to"],
          answer: 0,
          why: "Almanca `muss nicht` 'gerek yok' demek ve `mustn't`e benziyor, ama İngilizce `mustn't` yasak (`darf nicht`). 'Gerek yok' `don't have to`.",
        },
      },
    },
    {
      id: "en-a2-w02-g3",
      block: "grammar",
      stem: "I've had this cough ___ three days.",
      options: ["since", "from", "for", "ago"],
      answer: 2,
      why: "Süre (`three days`) `for` ile, başlangıç anı (`Monday`) `since` ile gelir. Türkçe '-den beri' ikisini de karşıladığı için ('üç günden beri', 'pazartesiden beri') hangisinin süre, hangisinin başlangıç olduğu gözden kaçıyor.",
      targets: ["present-perfect.since-for"],
      byNative: {
        de: {
          options: ["since", "for", "from", "ago"],
          answer: 1,
          why: "Almanca `seit` hem süre (`seit drei Tagen`) hem başlangıç (`seit Montag`) için. İngilizcede ikiye ayrılır: `for three days`, `since Monday`. `seit` → `since` aktarımı burada yanlış.",
        },
      },
    },
    {
      id: "en-a2-w02-g4",
      block: "grammar",
      stem: "I ___ in this town since 2019.",
      options: ["have lived", "live", "am living", "lived"],
      answer: 0,
      why: "`since` bugüne uzanan bir süreyi ölçüyor ve İngilizce bunu present perfect ile söyler. Türkçe '2019'dan beri yaşıyorum' şimdiki zamanla kurulduğu için `live` ya da `am living` seçiliyor.",
      targets: ["present-perfect.since-for", "tense.present-perfect-vs-present"],
      byNative: {
        de: {
          options: ["live", "lived", "have lived", "am living"],
          answer: 2,
          why: "Almanca `Ich wohne seit 2019 hier` şimdiki zamanla kurulur. İngilizcede `since` ya da `for` ile bugüne uzanan durum present perfect ister: `have lived`.",
        },
      },
    },
    {
      id: "en-a2-w02-g5",
      block: "grammar",
      stem: "I can't come to work today. I've got ___ headache.",
      options: ["the", "a", "an", "(no word)"],
      answer: 1,
      why: "İngilizcede sayılabilen tekil isim çıplak durmaz; ağrıların ve hafif hastalıkların çoğu `a` alır: `a headache`, `a cold`. Türkçede belirsiz artikel zorunlu olmadığı için boşluk boş bırakılıyor.",
      targets: ["article.a-an"],
      byNative: {
        de: {
          options: ["(no word)", "the", "an", "a"],
          answer: 3,
          why: "Almanca `Ich habe Kopfschmerzen` artikelsiz ve çoğul. İngilizcede `headache` tekil ve sayılabilir, `a` alır: `I've got a headache`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "en-a2-w02-v1",
      block: "vocab",
      stem: "My ___ with the dentist is at three o'clock.",
      options: ["date", "meeting", "appointment", "term"],
      answer: 2,
      why: "Doktor, diş hekimi ya da kuaför için alınan saat `appointment`. `date` romantik buluşma ya da takvim tarihi, `meeting` iş toplantısı. Türkçe 'randevu' üçünü de çağırıyor.",
      targets: ["noun.appointment"],
      byNative: {
        de: {
          options: ["term", "appointment", "date", "meeting"],
          answer: 1,
          why: "Almanca `Termin` → `term` sahte dost: İngilizce `term` dönem ya da terim demek. Doktor randevusu `appointment`.",
        },
      },
    },
    {
      id: "en-a2-w02-v2",
      block: "vocab",
      stem: "I can't sit for long. My back ___.",
      options: ["pains", "has pain", "hurts", "makes pain"],
      answer: 2,
      why: "Vücudun bir yeri acıdığında özne o organdır ve fiil `hurt`: `My back hurts`. burada fiil `hurt`, `pain` ise isim olarak kullanılır; 'sırtım ağrıyor'u sözcük sözcük kurunca `pains` çıkıyor.",
      targets: ["verb.hurt"],
      byNative: {
        de: {
          options: ["hurts", "pains", "does pain", "makes pain"],
          answer: 0,
          why: "Almanca `Mein Rücken tut weh` → `does pain` ya da `makes pain` aktarımı. İngilizcede tek fiil var: `My back hurts`.",
        },
      },
    },
    {
      id: "en-a2-w02-v3",
      block: "vocab",
      stem: "The doctor said: \"___ one pill three times a day.\"",
      options: ["Drink", "Eat", "Take", "Make"],
      answer: 2,
      why: "İlaç Türkçede 'içilir' ama İngilizcede `take` ile kullanılır: `take a pill`, `take medicine`. `drink` yalnız sıvılar için. Fotoğrafta olduğu gibi (`take photos`) kalıbın fiili Türkçeden çevrilemiyor.",
      targets: ["collocation.take"],
      byNative: {
        de: {
          options: ["Take", "Drink", "Make", "Eat"],
          answer: 0,
          why: "Almancada da ilaç 'alınır' (`Tabletten nehmen`), bu sezgi İngilizcede de doğru: `take a pill`. `drink` yalnız şurup gibi sıvılar için; `make` ilacı yapmak olur.",
        },
      },
    },
  ],
};
