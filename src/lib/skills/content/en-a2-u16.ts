import type { SkillExercise } from "../types";

/**
 * EN · A2 · Ünite 16 — "Oda ayırtma, havaalanı, otel girişi, yol sorma".
 *
 * Dört ders: Booking a room · At the airport · Hotel check-in ·
 * Finding your way abroad.
 *
 *   Kelime: book, double, night, include, confirm, reservation,
 *           double room, single room, gate, boarding, luggage, passport,
 *           delay, terminal, seat belt, land, reception, key, breakfast,
 *           floor, towel, hotel room, room key, check in, straight,
 *           corner, opposite, far, follow, city map, direction, across.
 *   Kalıp:  I'd like to book a room. · Could I have …, please? ·
 *           Does the price include …? · Put your bag on the belt. ·
 *           You have to show your boarding pass. ·
 *           Excuse me, where is gate twelve? ·
 *           I have a reservation under the name … ·
 *           There aren't any … in my room. ·
 *           Excuse me, how do I get to …? ·
 *           Go straight and turn left at the corner. ·
 *           It's opposite the museum.
 *
 * Ünitenin tek öğretme noktası SOME/ANY BÖLÜŞÜMÜ: olumlu cümlede „some“,
 * olumsuzda ve soruda „any“. Otel odasında eksik bir şeyi söylemek bu
 * kuralın en sık kullanıldığı yer — „There aren't any towels“ — ve yol
 * sorarken de aynı bölüşüm geçerli: „Do you have any …?“ Türkçe bu ayrımı
 * hiç yapmıyor, tek bir "hiç" sözcüğü iki işi de görüyor.
 */
export const enA2U16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-a2-u16-r1",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 16,
    title: "Booking a room",
    genre: "phone",
    intro: "Telefonda oda ayırtılıyor. Fiyata ne dahil, ne değil?",
    gloss: [
      { de: "parking", tr: "otopark" },
      { de: "promise", tr: "söz vermek" },
      { de: "away from", tr: "uzakta" },
      { de: "the fourth", tr: "dördü" },
      { de: "fifth", tr: "beşi" },
      { de: "extra", tr: "fazladan" },
    ],
    minutes: 6,
    text:
      "Hotel: Good afternoon, Hotel Marmara.\n" +
      "Ela: Hello. I'd like to book a room for two nights.\n" +
      "Hotel: Of course. Single or double?\n" +
      "Ela: A double room, please. From the fourth of May.\n" +
      "Hotel: Fourth and fifth. We have a room on the second floor.\n" +
      "Ela: Does the price include breakfast?\n" +
      "Hotel: Yes, from seven to ten. But the parking is extra: eight euros a night.\n" +
      "Ela: We come by train, so no parking. Are there any rooms with a balcony?\n" +
      "Hotel: On the second floor, no. On the fourth there are two, but they cost fifteen euros more.\n" +
      "Ela: Then the second floor is fine. How much is it for everything?\n" +
      "Hotel: A hundred and forty for two nights, with breakfast.\n" +
      "Ela: Could I have a room away from the street?\n" +
      "Hotel: I write it here. I can't promise, but usually it works.\n" +
      "Ela: Thank you. Could you confirm it by email?\n" +
      "Hotel: Of course. What is your address?",
    questions: [
      {
        text: "What does the price include?",
        options: ["breakfast", "parking", "a balcony"],
        answer: 0,
        explain: "„Does the price include breakfast? — Yes, from seven to ten.“ Otopark ayrı ücret.",
      },
      {
        text: "Why does Ela not want parking?",
        options: ["they come by train", "it is too expensive", "the hotel has no parking"],
        answer: 0,
        explain: "„We come by train, so no parking.“",
      },
      {
        kind: "truefalse",
        text: "The rooms with a balcony are on the fourth floor.",
        options: ["True", "False"],
        answer: 0,
        explain: "„On the second floor, no. On the fourth there are two…“",
      },
      {
        kind: "gapfill",
        text: "Two nights with breakfast cost a hundred and ___.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„A hundred and forty for two nights, with breakfast.“",
      },
      {
        kind: "short_answer",
        text: "What does Ela ask for at the end?",
        options: [],
        answer: 0,
        accept: ["an email", "email", "an email from the hotel"],
        explain: "„Could you confirm it by email?“",
      },
    ],
  },
  {
    id: "en-a2-u16-r2",
    course: "en",
    level: "A2",
    skill: "reading",
    unit: 16,
    title: "At the airport",
    genre: "info",
    intro: "Havaalanı yönergesi. Ne zorunlu, nerede bakılır?",
    gloss: [
      { de: "local time", tr: "yerel saat" },
      { de: "above", tr: "üstünde" },
      { de: "the belt", tr: "bant" },
      { de: "this point", tr: "bu nokta" },
    ],
    minutes: 5,
    text:
      "Before the gate\n" +
      "Put your bag on the belt. Big luggage goes at the desk, small bags go with you. Water is not allowed after this point — drink it or leave it here.\n" +
      "At the gate you have to show your boarding pass and your passport. Both. Every time.\n" +
      "Boarding starts forty minutes before the flight. If there is a delay, you see it on the screen in the terminal, not on your phone. The screen is always first.\n" +
      "In the plane: bag under the seat or above you, phone off, seat belt closed until the light is off.\n" +
      "We land at ten past two. Local time is one hour later than here.\n" +
      "If you have any questions, ask at the desk before the gate. After the gate there is nobody.",
    questions: [
      {
        text: "What do you show at the gate?",
        options: ["your boarding pass and your passport", "only your passport", "your luggage"],
        answer: 0,
        explain: "„At the gate you have to show your boarding pass and your passport. Both. Every time.“",
      },
      {
        text: "Where do you see a delay?",
        options: ["on the screen in the terminal", "on your phone", "at the gate"],
        answer: 0,
        explain: "„…you see it on the screen in the terminal, not on your phone.“",
      },
      {
        kind: "truefalse",
        text: "You can take water after this point.",
        options: ["True", "False"],
        answer: 1,
        explain: "„Water is not allowed after this point — drink it or leave it here.“",
      },
      {
        kind: "gapfill",
        text: "Boarding starts ___ minutes before the flight.",
        options: [],
        answer: 0,
        accept: ["forty", "40"],
        explain: "„Boarding starts forty minutes before the flight.“",
      },
      {
        kind: "short_answer",
        text: "Where can you ask questions?",
        options: [],
        answer: 0,
        accept: ["at the desk", "before the gate", "at the desk before the gate"],
        explain: "„If you have any questions, ask at the desk before the gate.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-a2-u16-l1",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 16,
    title: "Hotel check-in",
    genre: "dialogue",
    intro: "Resepsiyonda giriş. Odada ne eksik?",
    gloss: [
      { de: "wifi", tr: "kablosuz ağ" },
      { de: "on the back", tr: "arkasında" },
      { de: "empty", tr: "boş" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Deniz", text: "Good evening. I have a reservation under the name Kaya." },
      { speaker: "Reception", text: "Kaya… yes, two nights, a double room. Could I have your passport?" },
      { speaker: "Deniz", text: "Here you are." },
      { speaker: "Reception", text: "Thank you. Room three hundred and four, on the third floor." },
      { speaker: "Deniz", text: "Is there any breakfast tomorrow? We leave early." },
      { speaker: "Reception", text: "From half past six. Your train is at eight?" },
      { speaker: "Deniz", text: "At twenty past eight." },
      { speaker: "Reception", text: "Then it works. Here is the room key. The wifi name is on the back." },
      { speaker: "Deniz", text: "Thank you. One thing: there aren't any towels in the room." },
      { speaker: "Reception", text: "In the room? That is not possible." },
      { speaker: "Deniz", text: "I looked twice. The bathroom is empty." },
      { speaker: "Reception", text: "I am sorry. I send some up now. Anything else?" },
      { speaker: "Deniz", text: "Is there a shop nearby? We have no water." },
      { speaker: "Reception", text: "Opposite the hotel, open until eleven." },
    ],
    questions: [
      {
        text: "What is missing in the room?",
        options: ["towels", "the key", "the wifi"],
        answer: 0,
        explain: "„One thing: there aren't any towels in the room.“",
      },
      {
        text: "When does breakfast start?",
        options: ["at half past six", "at eight", "at eleven"],
        answer: 0,
        explain: "„From half past six. Your train is at eight?“",
      },
      {
        kind: "truefalse",
        text: "The room is on the third floor.",
        options: ["True", "False"],
        answer: 0,
        explain: "„Room three hundred and four, on the third floor.“",
      },
      {
        kind: "gapfill",
        text: "The shop is ___ the hotel.",
        options: [],
        answer: 0,
        accept: ["opposite"],
        explain: "„Opposite the hotel, open until eleven.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["I have a reservation under the name Kaya.", "I have a reservation under the name Kaya"],
        explain: "Otelde adı „under the name“ ile veriyorsun.",
      },
      {
        kind: "short_answer",
        text: "Where is the wifi name?",
        options: [],
        answer: 0,
        accept: ["on the back", "on the key", "on the back of the key"],
        explain: "„Here is the room key. The wifi name is on the back.“",
      },
    ],
  },
  {
    id: "en-a2-u16-l2",
    course: "en",
    level: "A2",
    skill: "listening",
    unit: 16,
    title: "Finding your way abroad",
    genre: "dialogue",
    intro: "Yol tarifi. Dört adım, tek yön.",
    gloss: [
      { de: "cross", tr: "karşıya geçmek" },
      { de: "bridge", tr: "köprü" },
      { de: "Good luck", tr: "bol şans" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Sena", text: "Excuse me, how do I get to the post office?" },
      { speaker: "Man", text: "On foot or by bus?" },
      { speaker: "Sena", text: "On foot, if it isn't far." },
      { speaker: "Man", text: "Twelve minutes. Go straight to the end of this street and turn left at the corner." },
      { speaker: "Sena", text: "Left at the corner. And then?" },
      { speaker: "Man", text: "Then you cross the bridge. After the bridge you see a big bank." },
      { speaker: "Sena", text: "Is the post office behind the bank?" },
      { speaker: "Man", text: "No, it's opposite the bank. It is easy to find — the door is yellow." },
      { speaker: "Sena", text: "Do you have a city map?" },
      { speaker: "Man", text: "In the shop at the station. But this direction is easy: straight, left, bridge, bank." },
      { speaker: "Sena", text: "Straight, left, bridge, bank. Thank you very much." },
      { speaker: "Man", text: "One more thing: it closes at half past five. It is five now." },
      { speaker: "Sena", text: "Then I run." },
      { speaker: "Man", text: "Then you are there in ten minutes. Good luck!" },
    ],
    questions: [
      {
        text: "How long does it take on foot?",
        options: ["twelve minutes", "twenty minutes", "five minutes"],
        answer: 0,
        explain: "„Twelve minutes. Go straight to the end of this street…“",
      },
      {
        text: "Where is the post office?",
        options: ["opposite the bank", "behind the bank", "at the station"],
        answer: 0,
        explain: "„No, it's opposite the bank. It is easy to find — the door is yellow.“",
      },
      {
        kind: "truefalse",
        text: "The man gives Sena a city map.",
        options: ["True", "False"],
        answer: 1,
        explain: "„In the shop at the station.“ — haritayı satan dükkân, adamın kendisi değil.",
      },
      {
        kind: "gapfill",
        text: "Turn left at the ___.",
        options: [],
        answer: 0,
        accept: ["corner"],
        explain: "„Go straight to the end of this street and turn left at the corner.“",
      },
      {
        kind: "dictation",
        text: "Duyduğun cümleyi yaz.",
        options: [],
        answer: 0,
        accept: ["Excuse me, how do I get to the post office?", "Excuse me, how do I get to the post office"],
        explain: "Yol sorarken „get to“ kalıbı kullanılıyor.",
      },
      {
        kind: "short_answer",
        text: "When does the post office close?",
        options: [],
        answer: 0,
        accept: ["at half past five", "half past five", "5.30"],
        explain: "„One more thing: it closes at half past five. It is five now.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-u16-w1",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 16,
    title: "I'd like to book a room",
    genre: "formal",
    intro: "Otel cümleleri. Olumluda „some“, olumsuz ve soruda „any“.",
    gloss: [
      { de: "book a room", tr: "oda ayırtmak" },
      { de: "include", tr: "içermek" },
      { de: "any towels", tr: "hiç havlu" },
      { de: "the fourth of May", tr: "dört mayıs" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Bir oda ayırtmak istiyorum.",
        answer: "I'd like to book a room.",
        alternatives: ["I would like to book a room."],
        hint: "„book“ burada fiil: ayırtmak demek, kitap değil.",
      },
      {
        kind: "build",
        tr: "Fiyat kahvaltıyı içeriyor mu?",
        answer: "Does the price include breakfast?",
        hint: "Üçüncü tekilde soru „does“ ile; asıl fiil eksiz kalıyor.",
      },
      {
        kind: "build",
        tr: "Odamda hiç havlu yok.",
        answer: "There aren't any towels in my room.",
        alternatives: ["There are not any towels in my room."],
        hint: "Olumsuzda „any“ geliyor; „some“ yalnız olumlu cümlede durur.",
      },
      {
        kind: "build",
        tr: "İki havlu alabilir miyim, lütfen?",
        answer: "Could I have two towels, please?",
        hint: "Otelde „Could I have“ kalıbı; „give me“ kaba durur.",
      },
      {
        kind: "form",
        prompt: "Rezervasyon kartını doldur.",
        facts: "Çift kişilik oda; iki gece; dört mayıstan; kahvaltı dahil; toplam yüz kırk euro.",
        fields: [
          { label: "Room", answer: "a double room", accept: ["double"] },
          { label: "Nights", answer: "two", accept: ["2"] },
          { label: "From", answer: "the fourth of May", accept: ["4 May", "May"] },
          { label: "Price", answer: "a hundred and forty", accept: ["140"] },
        ],
      },
    ],
  },
  {
    id: "en-a2-u16-w2",
    course: "en",
    level: "A2",
    skill: "writing",
    unit: 16,
    title: "Excuse me, how do I get to …?",
    genre: "personal",
    intro: "Yol ve havaalanı cümleleri. „any“ sayılamayanla da çalışıyor.",
    gloss: [
      { de: "get to", tr: "varmak" },
      { de: "opposite", tr: "karşısında" },
      { de: "boarding pass", tr: "biniş kartı" },
    ],
    minutes: 7,
    tasks: [
      {
        kind: "build",
        tr: "Affedersiniz, postaneye nasıl giderim?",
        answer: "Excuse me, how do I get to the post office?",
        hint: "Yol sorarken „get to“ kalıp; „go to“ da doğru ama daha seyrek.",
      },
      {
        kind: "build",
        tr: "Dosdoğru git ve köşeden sola dön.",
        answer: "Go straight and turn left at the corner.",
        hint: "Emir cümlesi öznesiz; noktayı „at the corner“ gösteriyor.",
      },
      {
        kind: "build",
        tr: "Bankanın karşısında.",
        answer: "It's opposite the bank.",
        alternatives: ["It is opposite the bank."],
        hint: "„opposite“ önüne edat almıyor: „opposite to“ olmaz.",
      },
      {
        kind: "build",
        tr: "Biniş kartını göstermen gerekiyor.",
        answer: "You have to show your boarding pass.",
        hint: "Kuraldan gelen zorunluluk „have to“ ile.",
      },
      {
        kind: "build",
        tr: "Odada hiç su yok.",
        answer: "There isn't any water in the room.",
        alternatives: ["There is not any water in the room."],
        hint: "„water“ sayılamaz: „isn't any“ geliyor, „aren't any“ değil.",
      },
    ],
  },
];
