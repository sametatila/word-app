import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 8.
 *
 * Kurallar ve emsal: `de-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 8 teknoloji hattı: uygulama değerlendirmesi, ekran süresi üzerine bir
 * podcast, ikinci el ilanı. Söyleyiş odağı pf, z ve tsch; dil bilgisi iki
 * nesneli fiiller — Almancanın sıralama kuralı burada görünür oluyor.
 */
export const deA2P8: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r8",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Drei Sterne für die Fahrplan-App",
    genre: "review",
    intro: "Bir kullanıcı ulaşım uygulamasını değerlendirmiş: nesi işe yarıyor, nesi sinir bozucu.",
    gloss: [
      { de: "die App", tr: "uygulama", en: "app" },
      { de: "der Fahrplan", tr: "sefer tarifesi", en: "schedule" },
      { de: "die Verbindung", tr: "bağlantı", en: "connection" },
      { de: "die Werbung", tr: "reklam", en: "advertising" },
      { de: "abstürzen", tr: "çökmek", en: "to crash" },
      { de: "das Update", tr: "güncelleme", en: "update" },
    ],
    minutes: 5,
    text:
      "Drei von fünf Sternen\n\n" +
      "Ich benutze die App seit einem halben Jahr, jeden Tag zweimal. " +
      "Sie zeigt mir schnell die nächste Verbindung und sagt auch, wenn ein Zug Verspätung hat. " +
      "Das funktioniert wirklich gut und hat mir schon oft geholfen.\n\n" +
      "Zwei Dinge stören mich aber sehr. Erstens die Werbung: Nach jeder Suche kommt ein Video, " +
      "und man kann es erst nach fünf Sekunden wegklicken. Zweitens stürzt die App manchmal ab, " +
      "wenn man den Fahrplan für den nächsten Monat sehen will.\n\n" +
      "Ich habe dem Support geschrieben und sie haben mir schnell geantwortet. " +
      "Sie sagen, dass das Problem im nächsten Update weg ist. Das hoffe ich.\n\n" +
      "Für Leute ohne Auto ist die App trotzdem wichtig. " +
      "Wenn die Werbung kürzer wird, gebe ich gern mehr Sterne.",
    questions: [
      {
        text: "Was findet die Person gut an der App?",
        options: ["die Werbung", "dass sie Verspätungen zeigt", "dass sie nichts kostet"],
        answer: 1,
        explain: "„sagt auch, wenn ein Zug Verspätung hat. Das funktioniert wirklich gut“.",
      },
      {
        text: "Wann stürzt die App ab?",
        options: [
          "wenn man den Fahrplan für den nächsten Monat sehen will",
          "nach jeder Suche",
          "wenn das Handy alt ist",
        ],
        answer: 0,
        explain: "Metin bu durumu açıkça veriyor; her aramadan sonra gelen şey reklam.",
      },
      {
        kind: "truefalse",
        text: "Der Support hat nicht geantwortet.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„sie haben mir schnell geantwortet“ — hatta bir sonraki güncellemeyi vaat etmişler.",
      },
      {
        kind: "gapfill",
        text: "Man kann das Werbevideo erst nach ___ Sekunden wegklicken.",
        options: [],
        answer: 0,
        accept: ["fünf", "5"],
        explain: "„man kann es erst nach fünf Sekunden wegklicken“.",
      },
      {
        kind: "short_answer",
        text: "Wann gibt die Person mehr Sterne?",
        options: [],
        answer: 0,
        accept: [
          "wenn die Werbung kürzer wird",
          "wenn die Werbung kürzer ist",
          "bei kürzerer Werbung",
        ],
        explain: "Son cümle: „Wenn die Werbung kürzer wird, gebe ich gern mehr Sterne.“",
      },
      {
        text: "Für wen ist die App besonders wichtig?",
        options: ["für Touristen", "für Leute ohne Auto", "für Leute mit Fahrrad"],
        answer: 1,
        explain: "„Für Leute ohne Auto ist die App trotzdem wichtig.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l8",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Podcast: Eine Woche ohne Handy",
    genre: "monologue",
    intro: "Bir podcast bölümünde biri bir haftalık denemesini anlatıyor: neyi zor buldu, ne kazandı.",
    gloss: [
      { de: "der Versuch", tr: "deneme", en: "experiment" },
      { de: "das Handy", tr: "cep telefonu", en: "cell phone" },
      { de: "langweilig", tr: "sıkıcı", en: "boring" },
      { de: "verabreden", tr: "sözleşmek", en: "to arrange to meet" },
      { de: "auffallen", tr: "dikkatini çekmek", en: "to notice" },
      { de: "empfehlen", tr: "tavsiye etmek", en: "to recommend" },
    ],
    minutes: 5,
    segments: [
      { text: "Willkommen zu einer neuen Folge. Heute erzähle ich euch von meinem Versuch: eine Woche ohne Handy." },
      { text: "Am Montag war es schrecklich. Ich habe zwanzigmal in die leere Tasche gegriffen, einfach aus Gewohnheit." },
      { text: "Am Dienstag habe ich gemerkt, wie lang ein Abend sein kann. Ich fand das erst langweilig." },
      { text: "Dann habe ich ein Buch zu Ende gelesen, das seit zwei Jahren auf dem Tisch lag." },
      { text: "Schwierig war nur das Verabreden. Man muss vorher genau sagen, wann und wo man sich trifft." },
      { text: "Am Wochenende ist mir etwas aufgefallen: Ich war viel weniger müde als sonst." },
      { text: "Eine ganze Woche empfehle ich niemandem. Aber einen Tag im Monat, das mache ich jetzt immer." },
    ],
    questions: [
      {
        text: "Was hat die Person eine Woche lang gemacht?",
        options: [
          "Sie hat ihr Handy nicht benutzt.",
          "Sie hat jeden Tag ein Buch gelesen.",
          "Sie hat einen Podcast aufgenommen.",
        ],
        answer: 0,
        explain: "Deneme „eine Woche ohne Handy“ — geri kalanı bunun sonuçları.",
      },
      {
        text: "Warum war der Montag schwer?",
        options: [
          "Sie hatte zu viel Arbeit.",
          "Sie hat aus Gewohnheit nach dem Handy gegriffen.",
          "Niemand hat sie angerufen.",
        ],
        answer: 1,
        explain: "„Ich habe zwanzigmal in die leere Tasche gegriffen, einfach aus Gewohnheit.“",
      },
      {
        kind: "truefalse",
        text: "Sie empfiehlt allen eine ganze Woche ohne Handy.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Eine ganze Woche empfehle ich niemandem“ — ayda bir gün öneriyor.",
      },
      {
        kind: "gapfill",
        text: "Das Buch lag seit ___ Jahren auf dem Tisch.",
        options: [],
        answer: 0,
        accept: ["zwei", "2"],
        explain: "„das seit zwei Jahren auf dem Tisch lag“.",
      },
      {
        kind: "short_answer",
        text: "Was war am schwierigsten?",
        options: [],
        answer: 0,
        accept: ["das Verabreden", "sich verabreden", "Verabreden"],
        explain: "„Schwierig war nur das Verabreden.“",
      },
      {
        text: "Was ist ihr am Wochenende aufgefallen?",
        options: ["Sie war weniger müde.", "Sie hatte mehr Geld.", "Ihre Freunde waren böse."],
        answer: 0,
        explain: "„Ich war viel weniger müde als sonst.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w8",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Anzeige: Fahrrad zu verkaufen",
    genre: "ad",
    intro: "İkinci el bir bisiklet satıyorsun: önce iki cümle kur, sonra kısa ve açık bir ilan yaz.",
    gloss: [
      { de: "verkaufen", tr: "satmak", en: "to sell" },
      { de: "der Zustand", tr: "durum", en: "condition" },
      { de: "die Bremse", tr: "fren", en: "brake" },
      { de: "der Kratzer", tr: "çizik", en: "scratch" },
      { de: "abholen", tr: "gelip almak", en: "to collect" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bisikleti üç yıl önce aldım.",
        answer: "Ich habe das Fahrrad vor drei Jahren gekauft.",
        alternatives: ["Vor drei Jahren habe ich das Fahrrad gekauft."],
        hint: "„vor + Dativ“ geçmişte bir süre önce demek; Perfekt'te Partizip sonda durur.",
      },
      {
        kind: "build",
        tr: "Frenler yeni çünkü onları geçen ay değiştirdim.",
        answer: "Die Bremsen sind neu, weil ich sie letzten Monat gewechselt habe.",
        alternatives: ["Weil ich sie letzten Monat gewechselt habe, sind die Bremsen neu."],
        hint: "„weil“ yan cümlesinde çekimli fiil en sona gider.",
      },
      {
        kind: "free",
        prompt:
          "Bir satış ilanı yaz: neyi sattığını ve ne kadar süredir kullandığını söyle, durumunu dürüstçe anlat (iyi ve kötü yanlarıyla), fiyatı yaz ve nasıl ulaşılacağını belirt.",
        checklist: [
          "Neyi sattığını ve kaç yaşında olduğunu yaz",
          "Durumu dürüstçe anlat, kusurunu da söyle",
          "Fiyatı ve pazarlık olup olmadığını yaz",
          "Nasıl ulaşılacağını ve nereden alınacağını yaz",
        ],
        minWords: 50,
        phrases: [
          { de: "Ich verkaufe mein …", tr: "… satıyorum", en: "I am selling my …" },
          { de: "Das Rad ist in gutem Zustand.", tr: "Bisiklet iyi durumda.", en: "The bike is in good condition." },
          { de: "Ein kleiner Kratzer ist am …", tr: "…'de küçük bir çizik var", en: "There is a small scratch on the …" },
          { de: "Der Preis ist … Euro, Verhandeln möglich.", tr: "Fiyat … euro, pazarlık payı var.", en: "The price is … euros, negotiable." },
          { de: "Abholung in …", tr: "…'den teslim alınır", en: "Collection in …" },
        ],
        sample:
          "Ich verkaufe mein Fahrrad, ein blaues Damenrad mit sieben Gängen. " +
          "Ich habe es vor drei Jahren gekauft und bin damit nur im Sommer gefahren. " +
          "Das Rad ist in gutem Zustand, die Bremsen sind neu, weil ich sie letzten Monat gewechselt habe. " +
          "Ein kleiner Kratzer ist am Rahmen, aber das sieht man fast nicht. Licht und Schloss sind dabei. " +
          "Der Preis ist 120 Euro, Verhandeln ist möglich. " +
          "Abholung in Leipzig-Süd, am besten am Wochenende. Schreiben Sie mir bitte hier eine Nachricht.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s8",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "pf, z und tsch",
    genre: "pronounce",
    intro: "pf ve z (ts) iki sesin birleşimidir, tsch ise Türkçedeki ç; altı cümlede üçünü de net duyur.",
    gloss: [
      { de: "der Apfel", tr: "elma", en: "apple" },
      { de: "die Zeit", tr: "zaman", en: "time" },
      { de: "deutsch", tr: "Almanca", en: "German" },
      { de: "der Kopf", tr: "kafa", en: "head" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Der Apfel liegt auf dem Tisch.",
        tr: "Elma masanın üstünde.",
        hint: "pf tek harf değil: önce dudaklar kapanır (p), hemen sonra hava sürtünür (f). AP-fel.",
        confusions: [
          {
            heard: ["Afel", "Appel"],
            fix: "İki sesin ikisi de duyulmalı; yalnız f ya da yalnız p yanlıştır.",
            expected: "Apfel",
          },
        ],
      },
      {
        de: "Ich habe keine Zeit für Zucker.",
        tr: "Şekere ayıracak vaktim yok.",
        hint: "z harfi TS verir: TSAYT, TSU-ker. Türkçedeki z ile hiç ilgisi yok.",
        confusions: [
          {
            heard: ["Zayt", "Sucker"],
            fix: "Almanca z her zaman ts'dir; ötümlü z sesi tek s harfiyle yazılır.",
            expected: "Zeit",
          },
        ],
      },
      {
        de: "Sprichst du schon gut Deutsch?",
        tr: "Almancayı şimdiden iyi konuşuyor musun?",
        hint: "tsch tek bir ç sesidir: DOYÇ. Dört harf, tek ses.",
        confusions: [
          {
            heard: ["Doyts", "Deuts"],
            fix: "tsch = ç; ts ile karıştırma, dil damağa daha geniş temas eder.",
            expected: "Deutsch",
          },
        ],
      },
      {
        de: "Mein Kopf tut weh.",
        tr: "Başım ağrıyor.",
        hint: "Sonda pf yine iki parça: KOPF. Ağız p için kapanır, f için hemen açılır.",
        confusions: [
          {
            heard: ["Kof", "Kopp"],
            fix: "Kelime sonundaki pf de tam söylenir; p atlanırsa kelime başka duyulur.",
            expected: "Kopf",
          },
        ],
      },
      {
        de: "Zwei Züge fahren um zehn.",
        tr: "İki tren saat onda kalkıyor.",
        hint: "Üç kelimede de z var: TSVAY, TSÜÜ-ge, TSEEN.",
        confusions: [
          {
            heard: ["Zvai", "Swei"],
            fix: "zw = tsv; iki ses arka arkaya gelir ve ikisi de duyulur.",
            expected: "Zwei",
          },
        ],
      },
      {
        de: "Die Tschechin pflegt ihren Garten.",
        tr: "Çek kadın bahçesine bakıyor.",
        hint: "Başta tsch (ÇE-hin), ortada pf (PFLEEKT). İki zor ses tek cümlede.",
        confusions: [
          {
            heard: ["Tsechin", "flegt"],
            fix: "tsch tek ç sesidir; pfl üçlüsünde p, f ve l sırayla duyulur.",
            expected: "pflegt",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g8",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "Ich schenke ihr das Buch",
    genre: "grammar",
    intro: "Bazı fiiller iki nesne alır: kime ve neyi. Hangisinin önce geleceğinin net bir kuralı var.",
    focus: "Dativ ve Akkusativ nesneler ve sıralama kuralı",
    gloss: [
      { de: "schenken", tr: "hediye etmek", en: "to give as a present" },
      { de: "erklären", tr: "açıklamak", en: "to explain" },
      { de: "zeigen", tr: "göstermek", en: "to show" },
      { de: "die Regel", tr: "kural", en: "rule" },
      { de: "der Ball", tr: "top", en: "ball" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Kime ve neyi",
        tr: "„geben, schenken, zeigen, erklären, schicken, bringen“ gibi fiiller iki nesne alır: kişi Dativ'de (kime), eşya Akkusativ'de (neyi). Türkçede bu ayrım „-e“ ve „-i“ ekleriyle yapılır; Almancada artikel değişir.",
        examples: [
          { de: "Ich schenke meiner Mutter ein Buch.", tr: "Anneme bir kitap hediye ediyorum.", note: "kişi Dativ, eşya Akkusativ" },
          { de: "Der Lehrer erklärt den Schülern die Regel.", tr: "Öğretmen kuralı öğrencilere açıklıyor.", note: "çoğul Dativ: den + -n" },
          { de: "Zeigst du mir das Foto?", tr: "Fotoğrafı bana gösterir misin?", note: "mir = kişi, das Foto = eşya" },
        ],
      },
      {
        heading: "İki isim: Dativ önce",
        tr: "İki nesne de İSİM ise kişi (Dativ) önce, eşya (Akkusativ) sonra gelir. Bu sıra Türkçedekiyle aynıdır ve kolay akılda kalır.",
        examples: [
          { de: "Ich gebe dem Kind den Ball.", tr: "Çocuğa topu veriyorum.", note: "Dativ isim → Akkusativ isim" },
          { de: "Sie schickt ihrer Freundin eine Karte.", tr: "Arkadaşına bir kart yolluyor.", note: "aynı sıra" },
          { de: "Wir bringen den Nachbarn Kuchen.", tr: "Komşulara kek götürüyoruz.", note: "çoğul Dativ" },
        ],
      },
      {
        heading: "Zamir varsa zamir önce",
        tr: "Nesnelerden biri ZAMİR ise o öne geçer. İkisi de zamirse sıra TERSİNE döner: önce Akkusativ, sonra Dativ. Kısa kural: „kısa olan öne“.",
        examples: [
          { de: "Ich gebe es dem Kind.", tr: "Onu çocuğa veriyorum.", note: "Akkusativ zamiri öne geçti" },
          { de: "Ich gebe ihm den Ball.", tr: "Topu ona veriyorum.", note: "Dativ zamiri öne geçti" },
          { de: "Ich gebe es ihm.", tr: "Onu ona veriyorum.", note: "iki zamir: Akkusativ önce" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich schenke ___ Bruder eine Uhr.",
        options: ["meinen", "meinem", "mein"],
        answer: 1,
        explain: "Kişi Dativ'de durur; eril „der Bruder“ Dativ'de meinem olur.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: ["Ich gebe den Ball das Kind.", "Ich gebe dem Kind den Ball.", "Ich gebe dem Ball das Kind."],
        answer: 1,
        explain: "Kişi Dativ'de (dem Kind), eşya Akkusativ'de (den Ball); iki nesne de isimse kişi önce gelir.",
      },
      {
        text: "Zeigst du ___ das Foto?",
        options: ["mich", "mir", "ich"],
        answer: 1,
        explain: "Fotoğraf gösterilen kişi Dativ'dedir: mir.",
      },
      {
        kind: "gapfill",
        text: "Der Lehrer erklärt ___ Schülern die Regel. (die, Plural)",
        options: [],
        answer: 0,
        accept: ["den"],
        explain: "Çoğul Dativ artikeli den'dir ve isim -n alır.",
      },
      {
        kind: "gapfill",
        text: "Ich gebe ___ dem Kind. (es / ihm)",
        options: [],
        answer: 0,
        accept: ["es"],
        explain: "Zamir isimden önce gelir; burada eşya zamiri es'tir.",
      },
      {
        kind: "gapfill",
        text: "Sie schickt ___ Freundin eine Karte. (ihre)",
        options: [],
        answer: 0,
        accept: ["ihrer"],
        explain: "Dişil isimde iyelik kelimesi Dativ'de -er alır: ihre → ihrer Freundin.",
      },
      {
        kind: "gapfill",
        text: "Kannst du ___ das Wort erklären? (ich)",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "„erklären“ kişiyi Dativ'de ister: mir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "gebe", "es", "ihm", "morgen"],
        explain: "İki zamir varsa önce Akkusativ, sonra Dativ: Ich gebe es ihm morgen.",
      },
      {
        kind: "truefalse",
        text: "„Ich schenke ein Buch meiner Mutter.“ — Bu sıra doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "İki isim varsa Dativ önce gelir: „Ich schenke meiner Mutter ein Buch.“",
      },
      {
        kind: "truefalse",
        text: "„Wir bringen den Nachbarn Kuchen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Çoğul Dativ „den Nachbarn“ önce, Akkusativ „Kuchen“ sonra.",
      },
    ],
  },
];
