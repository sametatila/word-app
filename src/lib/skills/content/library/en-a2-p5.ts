import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Alan adı `de` İngilizce metni taşır; `en` alanı bu kursta yazılmaz.
 * Kalan türler: forum, röportaj ve devir mektubu. Söyleyiş odağı kelimelerin
 * birbirine bağlanması; dil bilgisi zaman edatları ve plan için şimdiki zaman.
 */
export const enA2P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-lib-r5",
    course: "en",
    level: "A2",
    skill: "reading",
    title: "What Do You Do With Your Old Phone?",
    genre: "forum",
    intro: "Bir forumda eski telefonların ne yapıldığı soruluyor; soruyu ve üç farklı cevabı okuyacaksın.",
    gloss: [
      { de: "battery", tr: "pil" },
      { de: "drawer", tr: "çekmece" },
      { de: "delete", tr: "silmek" },
      { de: "worth it", tr: "değer" },
      { de: "completely", tr: "tamamen" },
      { de: "second-hand", tr: "ikinci el" },
    ],
    minutes: 5,
    text:
      "FORUM: WHAT DO YOU DO WITH YOUR OLD PHONE?\n\n" +
      "Question from Nils:\n" +
      "My old phone still works, but the battery is bad and it is slow. It is in a drawer with two others. " +
      "What do you do with yours?\n\n" +
      "Selin:\n" +
      "I sold mine on a second-hand site. It took three weeks and a lot of messages, but I got sixty euros. " +
      "Important: delete everything first and take the card out. I forgot that once.\n\n" +
      "Marcus:\n" +
      "A new battery cost me thirty euros and now my phone is four years old and fine. If you have a repair café " +
      "near you, go there. They also tell you if it is not worth it.\n\n" +
      "Rana:\n" +
      "Ours go to my mother. She uses one phone until it stops working completely. My old one is now in Izmir, " +
      "and it takes better photos than her new one.",
    questions: [
      {
        text: "What is the question in this forum?",
        options: ["what to do with an old phone", "which phone is the best", "how to repair a battery"],
        answer: 0,
        explain: "Başlık ve Nils'in son cümlesi aynı soruyu soruyor: „What do you do with yours?“",
      },
      {
        text: "What does Selin say is important?",
        options: [
          "delete everything and take the card out",
          "sell the phone in three weeks",
          "keep all the old messages",
        ],
        answer: 0,
        explain: "„Important: delete everything first and take the card out.“",
      },
      {
        kind: "truefalse",
        text: "Marcus bought a new phone.",
        options: ["True", "False"],
        answer: 1,
        explain: "„A new battery cost me thirty euros and now my phone is four years old and fine.“",
      },
      {
        kind: "gapfill",
        text: "A new battery cost Marcus ___ euros.",
        options: [],
        answer: 0,
        accept: ["thirty", "30"],
        explain: "„A new battery cost me thirty euros …“",
      },
      {
        kind: "short_answer",
        text: "Where is Rana's old phone now?",
        options: [],
        answer: 0,
        accept: ["in Izmir", "Izmir", "with her mother"],
        explain: "„My old one is now in Izmir, and it takes better photos than her new one.“",
      },
      {
        text: "What does the repair café also do?",
        options: [
          "It says when a repair is not worth it.",
          "It sells second-hand phones cheaply.",
          "It takes all the old phones away.",
        ],
        answer: 0,
        explain: "„They also tell you if it is not worth it.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-lib-l5",
    course: "en",
    level: "A2",
    skill: "listening",
    title: "A Café Without Phones",
    genre: "interview",
    intro: "Telefonsuz bir kafeyi işleten kadınla söyleşi dinleyeceksin: kural nasıl işliyor, neden başladı, sonuç ne.",
    gloss: [
      { de: "joke", tr: "şaka" },
      { de: "punishment", tr: "ceza" },
      { de: "wooden", tr: "ahşap" },
      { de: "customer", tr: "müşteri" },
      { de: "against", tr: "karşı" },
      { de: "beginning", tr: "başlangıç" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Reporter", text: "You have a sign on the door: no phones. Is that a joke?" },
      { speaker: "Ilva", text: "No, it's real. But it is not a rule with a punishment. Nobody takes your phone away." },
      { speaker: "Reporter", text: "So what happens if I take mine out?" },
      { speaker: "Ilva", text: "Nothing. Somebody comes and brings you a small wooden box for the table. Most people laugh and put the phone in." },
      { speaker: "Reporter", text: "Why did you start this?" },
      { speaker: "Ilva", text: "Because of the noise. Not the loud noise, the other one: twenty people alone at twenty tables. It was very quiet and very sad." },
      { speaker: "Reporter", text: "And now?" },
      { speaker: "Ilva", text: "Now it is louder. People talk to the people at the next table. We also lost customers, that is true. Some come for work and need a screen." },
      { speaker: "Reporter", text: "Would you do it again?" },
      { speaker: "Ilva", text: "Yes, but I would explain it better at the beginning. In the first month people thought we were against something. We are for something." },
    ],
    questions: [
      {
        text: "What is the rule in the café?",
        options: ["You do not use your phone.", "You cannot bring a phone in.", "You pay more if you use a phone."],
        answer: 0,
        explain: "„It is not a rule with a punishment. Nobody takes your phone away.“ — telefon içeri girebiliyor, kullanılmıyor.",
      },
      {
        text: "What happens if you take your phone out?",
        options: ["Somebody brings a wooden box.", "The sign on the door is explained to you.", "You are asked to sit at the next table."],
        answer: 0,
        explain: "„Somebody comes and brings you a small wooden box for the table.“",
      },
      {
        kind: "truefalse",
        text: "Ilva would introduce the rule again.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Would you do it again?“ — „Yes, but I would explain it better at the beginning.“",
      },
      {
        kind: "short_answer",
        text: "Why did Ilva start this?",
        options: [],
        answer: 0,
        accept: ["because of the noise", "the noise", "the quiet noise"],
        explain: "„Because of the noise. Not the loud noise, the other one …“",
      },
      {
        kind: "dictation",
        text: "Ilva'nın son cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["We are for something.", "We are for something"],
        explain: "„We are for something.“ — bir önceki cümledeki „against“ ile karşıtlık kuruyor.",
      },
      {
        text: "What would Ilva do differently?",
        options: [
          "explain the idea better at the start",
          "put the sign somewhere else",
          "open a second café in the town",
        ],
        answer: 0,
        explain: "„… but I would explain it better at the beginning.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w5",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "Handover Letter",
    genre: "letter",
    intro: "Gönüllü olduğun işi devrediyorsun; önce iki cümle kur, sonra devralacak kişiye bir mektup yaz.",
    gloss: [
      { de: "shift", tr: "vardiya" },
      { de: "key", tr: "anahtar" },
      { de: "heater", tr: "ısıtıcı" },
      { de: "broken", tr: "bozuk" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Vardiya salı günü saat beşte başlıyor.",
        answer: "The shift starts at five on Tuesday.",
        alternatives: ["On Tuesday the shift starts at five."],
        hint: "Saat için „at“, gün için „on“, ay ve yıl için „in“ kullanılır.",
      },
      {
        kind: "build",
        tr: "Gelecek ay Portekiz'e taşınıyorum.",
        answer: "I am moving to Portugal next month.",
        alternatives: ["Next month I am moving to Portugal."],
        hint: "Kesinleşmiş bir plan için şimdiki zaman biçimi gelecek anlamı taşır.",
      },
      {
        kind: "free",
        prompt:
          "Gönüllü olduğun işi devrediyorsun. Devralacak kişiye mektup yaz: vardiya ne zaman, anahtar kimde, ilk ne yapılmalı, sık çıkan bir aksaklık ve kime ulaşılacağı. Sıcak bir kapanış yaz.",
        checklist: [
          "Vardiya gününü ve saatini yaz",
          "Anahtarın kimde olduğunu söyle",
          "İlk yapılacak işi ve nedenini yaz",
          "Sık çıkan aksaklığı ve iletişim kişisini yaz",
        ],
        minWords: 40,
        phrases: [
          { de: "Here is everything I know.", tr: "Bildiğim her şey burada." },
          { de: "The shift starts at … on …", tr: "Vardiya … günü saat …'de başlıyor" },
          { de: "First, …", tr: "Önce …" },
          { de: "If something is broken, call …", tr: "Bir şey bozulursa … ara" },
          { de: "Good luck!", tr: "Bol şans!" },
        ],
        sample:
          "Dear Ferhat, welcome to the Thursday team! Here is everything I know. The shift starts at five on " +
          "Tuesday and Thursday and finishes at eight. The key is with Mrs. Lang in flat two; she is at home " +
          "after four. First, turn on the two heaters in the back room, because it takes an hour to get warm. " +
          "The coffee machine often stops in the middle. Do not open it; just turn it off and on again. " +
          "If something is really broken, call Deniz on 0176 33 88 12. She answers late in the evening too. " +
          "I am moving to Portugal next month, but write to me if you have questions. Good luck!",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s5",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "Words that hold hands",
    genre: "pronounce",
    intro: "İngilizcede kelimeler tek tek değil, birbirine bağlanarak söylenir; bu yüzden bildiğin kelimeleri duymak zorlaşır.",
    gloss: [
      { de: "turn off", tr: "kapatmak" },
      { de: "idea", tr: "fikir" },
      { de: "cup", tr: "fincan" },
      { de: "sit down", tr: "oturmak" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Pick it up, please.",
        tr: "Onu yerden al lütfen.",
        hint: "Sessizle biten kelime ünlüyle başlayan kelimeye yapışır: pi-ki-tap.",
        confusions: [
          { heard: ["Pick. It. Up.", "pick up it"], fix: "Üç kelimeyi ayrı ayrı söyleme; tek bir öbek gibi bağla.", expected: "Pick it up" },
        ],
      },
      {
        de: "What time is it?",
        tr: "Saat kaç?",
        hint: "„is it“ birleşir ve „i-zit“ olur; baştaki t de neredeyse düşer.",
        confusions: [
          { heard: ["What time is it separately", "wat taym is it"], fix: "Son iki kelimeyi birleştir: wat-taym-i-zit.", expected: "is it" },
        ],
      },
      {
        de: "I want a cup of tea.",
        tr: "Bir fincan çay istiyorum.",
        hint: "„cup of“ = ka-pıv. „want a“ da birleşir: wo-nı.",
        confusions: [
          { heard: ["cup off tea", "want ey cup"], fix: "„of“ vurgusuzdur ve önceki kelimeye yapışır: kapıv tii.", expected: "cup of" },
        ],
      },
      {
        de: "Look at this idea.",
        tr: "Şu fikre bak.",
        hint: "„look at“ = lu-kıt; „this idea“ da bağlanır: dhi-say-DİA.",
        confusions: [
          { heard: ["Look. At. This.", "look et"], fix: "„at“ vurgusuz ve önceki k'ye yapışır: lukıt.", expected: "Look at" },
        ],
      },
      {
        de: "Turn it off, please.",
        tr: "Kapat lütfen.",
        hint: "Üç kelime tek öbek olur: tör-ni-tof.",
        confusions: [
          { heard: ["Turn off it", "turn it. off"], fix: "Zamir araya girer ve her şey birbirine bağlanır: törnitof.", expected: "Turn it off" },
        ],
      },
      {
        de: "It is an old idea.",
        tr: "Bu eski bir fikir.",
        hint: "„an old“ = ı-NOULD. Ünlüyle başlayan kelimeden önce „a“ değil „an“ gelir ve yapışır.",
        confusions: [
          { heard: ["a old idea", "an. old. idea."], fix: "„an“ sonraki kelimeye bağlanır ve tek hece gibi duyulur.", expected: "an old" },
        ],
      },
      {
        de: "Come in and sit down.",
        tr: "İçeri gel ve otur.",
        hint: "„come in“ = ka-min; „and“ vurgusuz olduğu için „ın“ gibi kısalır.",
        confusions: [
          { heard: ["Come. In. And.", "kam in end"], fix: "„and“ tam söylenmez; bağlaçlar cümlede erir.", expected: "Come in and" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g5",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "at, on, in — and plans",
    genre: "grammar",
    intro: "Zaman edatlarının üçü de Türkçede „-de“ ile karşılanır; hangisinin geleceğini zaman biriminin büyüklüğü belirler.",
    focus: "Zaman edatları ve gelecek için present continuous",
    gloss: [
      { de: "meeting", tr: "toplantı" },
      { de: "birthday", tr: "doğum günü" },
      { de: "tonight", tr: "bu gece" },
      { de: "party", tr: "parti" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Küçükten büyüğe: at, on, in",
        tr: "Türkçede hepsi „-de“ ekidir: beşte, salıda, mayısta. İngilizcede zaman birimi büyüdükçe edat değişir: saat için „at“, gün ve tarih için „on“, ay, mevsim ve yıl için „in“.",
        examples: [
          { de: "The film starts at half past eight.", tr: "Film sekiz buçukta başlıyor.", note: "saat → at" },
          { de: "My birthday is on the fifth of May.", tr: "Doğum günüm beş Mayıs.", note: "tarih → on" },
          { de: "We are going to Rome in July.", tr: "Temmuzda Roma'ya gidiyoruz.", note: "ay → in" },
        ],
      },
      {
        heading: "Ezberlenecek birkaç istisna",
        tr: "Günün bölümleri „in“ alır (in the morning, in the afternoon), ama „at night“ ve „at noon“ istisnadır. Amerikan kullanımında hafta sonu „on the weekend“tir.",
        examples: [
          { de: "She works better in the morning.", tr: "Sabahları daha iyi çalışıyor." },
          { de: "I don't drive at night.", tr: "Geceleri araba kullanmam.", note: "istisna" },
          { de: "We are free on the weekend.", tr: "Hafta sonu boşuz." },
        ],
      },
      {
        heading: "Plan için şimdiki zaman",
        tr: "Kesinleşmiş bir randevu ya da bilet için gelecek zaman yerine present continuous kullanılır. Cümlede bir zaman ifadesi bulunması gerekir, yoksa cümle „şu an“ anlaşılır.",
        examples: [
          { de: "I am meeting Ali at six tonight.", tr: "Bu akşam altıda Ali ile buluşuyorum.", note: "randevu var" },
          { de: "We are flying to Rome tomorrow.", tr: "Yarın Roma'ya uçuyoruz.", note: "bilet alınmış" },
          { de: "She is starting her new job on Monday.", tr: "Pazartesi yeni işine başlıyor." },
        ],
      },
    ],
    questions: [
      {
        text: "The meeting is ___ Monday.",
        options: ["on", "at", "in"],
        answer: 0,
        explain: "Gün adlarıyla „on“ kullanılır.",
      },
      {
        text: "I get up ___ seven o'clock.",
        options: ["at", "on", "in"],
        answer: 0,
        explain: "Saatle „at“ kullanılır.",
      },
      {
        text: "We are going to Rome ___ July.",
        options: ["in", "on", "at"],
        answer: 0,
        explain: "Ay adlarıyla „in“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "The film starts ___ half past eight.",
        options: [],
        answer: 0,
        accept: ["at"],
        explain: "Saat bildiren ifadelerde „at“ gelir.",
      },
      {
        kind: "gapfill",
        text: "My birthday is ___ the fifth of May.",
        options: [],
        answer: 0,
        accept: ["on"],
        explain: "Tam bir tarih verildiğinde „on“ kullanılır.",
      },
      {
        kind: "gapfill",
        text: "I ___ (meet) Ali at six tonight.",
        options: [],
        answer: 0,
        accept: ["am meeting", "'m meeting"],
        explain: "Randevu kesinleşmiş; plan için present continuous kullanılır.",
      },
      {
        kind: "gapfill",
        text: "She works better ___ the morning.",
        options: [],
        answer: 0,
        accept: ["in"],
        explain: "Günün bölümleri „in the“ alır: in the morning.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["We", "are", "flying", "to", "Rome", "tomorrow"],
        explain: "Kesin plan present continuous ile: We are flying to Rome tomorrow.",
      },
      {
        kind: "truefalse",
        text: "„I am meeting the doctor at four tomorrow.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Randevu var ve zaman ifadesi verilmiş; plan için doğru biçim.",
      },
      {
        kind: "truefalse",
        text: "„The party is in Saturday.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Gün adıyla „on“ gelir; doğrusu „The party is on Saturday.“",
      },
    ],
  },
];
