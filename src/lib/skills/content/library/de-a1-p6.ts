import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 6.
 *
 * Hücre başına hedef ONA çıktı; bu dosya 6. seti taşır (kimlik sonu 6).
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 6 gündelik "komşuluk ve sağlık" hattını açıyor: kapıya bırakılan not,
 * muayenehaneden randevu, spor kulübü kaydı. Söyleyiş odağı ch sesinin iki
 * biçimi; dil bilgisi Perfekt — A1'in geçmiş zamanı.
 */
export const deA1P6: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r6",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Ein Brief von Frau Kunz",
    genre: "letter",
    intro: "Komşun birkaç günlüğüne gidiyor ve kapına bir not bırakmış: ne zaman dönüyor, senden ne istiyor.",
    gloss: [
      { de: "der Schlüssel", tr: "anahtar", en: "key" },
      { de: "gießen", tr: "sulamak", en: "to water" },
      { de: "die Pflanze", tr: "bitki", en: "plant" },
      { de: "die Post", tr: "posta", en: "mail" },
      { de: "der Briefkasten", tr: "posta kutusu", en: "letterbox" },
      { de: "der Postbote", tr: "postacı", en: "postman" },
    ],
    minutes: 4,
    text:
      "Liebe Familie Demir,\n\n" +
      "ich fahre am Freitag zu meiner Tochter nach Hamburg. Ich komme erst am Sonntagabend zurück.\n\n" +
      "Können Sie bitte meine Blumen gießen? Der Schlüssel liegt bei Frau Weber in Wohnung 4. " +
      "Die Blumen im Wohnzimmer brauchen wenig Wasser, die Pflanze auf dem Balkon braucht viel.\n\n" +
      "Bitte nehmen Sie auch meine Post aus dem Briefkasten. Am Samstag kommt ein Paket. " +
      "Der Postbote klingelt dann bei Ihnen.\n\n" +
      "Vielen Dank! Ich bringe Ihnen etwas aus Hamburg mit.\n\n" +
      "Ihre Nachbarin\nHanna Kunz",
    questions: [
      {
        text: "Warum schreibt Frau Kunz diesen Brief?",
        options: [
          "Sie sucht eine neue Wohnung.",
          "Sie fährt weg und braucht Hilfe.",
          "Sie möchte ein Paket schicken.",
        ],
        answer: 1,
        explain: "Cuma günü kızına gidiyor ve yokken çiçekleriyle postasının ilgilenilmesini istiyor.",
      },
      {
        text: "Wo liegt der Schlüssel?",
        options: ["im Briefkasten", "unter der Pflanze auf dem Balkon", "bei Frau Weber in Wohnung 4"],
        answer: 2,
        explain: "„Der Schlüssel liegt bei Frau Weber in Wohnung 4.“ Balkondaki bitkiden yalnız su ihtiyacı için söz ediliyor.",
      },
      {
        kind: "truefalse",
        text: "Die Pflanze auf dem Balkon braucht wenig Wasser.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Az su isteyen salondaki çiçekler; balkondaki bitki için „braucht viel“ yazıyor.",
      },
      {
        kind: "gapfill",
        text: "Frau Kunz kommt am ___ zurück.",
        options: [],
        answer: 0,
        accept: ["Sonntagabend", "Sonntag"],
        explain: "„Ich komme erst am Sonntagabend zurück.“",
      },
      {
        kind: "short_answer",
        text: "Was kommt am Samstag?",
        options: [],
        answer: 0,
        accept: ["ein Paket", "Paket"],
        explain: "„Am Samstag kommt ein Paket.“",
      },
      {
        text: "Was macht der Postbote am Samstag?",
        options: [
          "Er bringt den Schlüssel zurück.",
          "Er klingelt bei Familie Demir.",
          "Er legt das Paket in den Briefkasten.",
        ],
        answer: 1,
        explain: "„Der Postbote klingelt dann bei Ihnen“ — yani komşunun değil, notu okuyanın kapısında.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l6",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Ein Termin in der Praxis",
    genre: "dialogue",
    intro: "Bir hasta muayenehaneyi arayıp randevu istiyor: şikâyeti ne, hangi saat uyuyor, yanında ne getirecek.",
    gloss: [
      { de: "der Termin", tr: "randevu", en: "appointment" },
      { de: "die Praxis", tr: "muayenehane", en: "doctor's practice" },
      { de: "der Husten", tr: "öksürük", en: "cough" },
      { de: "das Fieber", tr: "ateş", en: "fever" },
      { de: "die Versichertenkarte", tr: "sağlık kartı", en: "health insurance card" },
      { de: "der Nachmittag", tr: "öğleden sonra", en: "afternoon" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Frau Berger", text: "Praxis Doktor Sommer, guten Morgen. Was kann ich für Sie tun?" },
      { speaker: "Herr Aydin", text: "Guten Morgen. Mein Name ist Kerem Aydin. Ich brauche einen Termin. Ich habe seit drei Tagen Husten und Fieber." },
      { speaker: "Frau Berger", text: "Das tut mir leid. Waren Sie schon einmal bei uns in der Praxis?" },
      { speaker: "Herr Aydin", text: "Nein, ich bin neu hier. Ich wohne erst seit einem Monat in Bonn." },
      { speaker: "Frau Berger", text: "Kein Problem. Bringen Sie dann bitte Ihre Versichertenkarte mit. Passt Ihnen morgen um halb neun?" },
      { speaker: "Herr Aydin", text: "Morgen früh ist leider schlecht. Ich arbeite bis zwölf Uhr. Geht es auch am Nachmittag?" },
      { speaker: "Frau Berger", text: "Einen Moment ... ja, um sechzehn Uhr ist noch etwas frei." },
      { speaker: "Herr Aydin", text: "Sehr gut, dann komme ich um vier. Vielen Dank!" },
      { speaker: "Frau Berger", text: "Bitte schön. Kommen Sie bitte zehn Minuten früher. Gute Besserung!" },
    ],
    questions: [
      {
        text: "Warum ruft Herr Aydin an?",
        options: ["Er sucht eine neue Wohnung.", "Er braucht die Adresse der Praxis.", "Er möchte einen Termin."],
        answer: 2,
        explain: "İlk cümlesi „Ich brauche einen Termin“ — üç günden beri öksürüğü ve ateşi var.",
      },
      {
        text: "Was soll Herr Aydin mitbringen?",
        options: ["ein Rezept vom Arzt", "seine Versichertenkarte", "einen Brief von der Arbeit"],
        answer: 1,
        explain: "İlk kez geldiği için „Bringen Sie dann bitte Ihre Versichertenkarte mit“ deniyor.",
      },
      {
        kind: "truefalse",
        text: "Herr Aydin war schon oft in dieser Praxis.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Nein, ich bin neu hier“ — bir aydır Bonn'da ve muayenehaneye ilk kez geliyor.",
      },
      {
        kind: "gapfill",
        text: "Herr Aydin bekommt einen Termin um ___ Uhr.",
        options: [],
        answer: 0,
        accept: ["sechzehn", "16", "vier"],
        explain: "„um sechzehn Uhr ist noch etwas frei“ — hasta da „dann komme ich um vier“ diyor.",
      },
      {
        kind: "short_answer",
        text: "Wie lange hat Herr Aydin schon Husten?",
        options: [],
        answer: 0,
        accept: ["seit drei Tagen", "drei Tage", "drei Tagen"],
        explain: "„Ich habe seit drei Tagen Husten und Fieber.“",
      },
      {
        text: "Warum passt der Termin am Morgen nicht?",
        options: ["Er arbeitet bis zwölf Uhr.", "Er hat kein Auto.", "Die Praxis ist morgens zu."],
        answer: 0,
        explain: "„Ich arbeite bis zwölf Uhr“ dediği için öğleden sonrasını soruyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w6",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Anmeldung im Sportverein",
    genre: "info",
    intro: "Spor kulübüne yazılıyorsun: önce bir cümle kur, sonra formu doldur, sonunda kısa bir mesaj yaz.",
    gloss: [
      { de: "der Sportverein", tr: "spor kulübü", en: "sports club" },
      { de: "die Anmeldung", tr: "kayıt", en: "registration" },
      { de: "das Mitglied", tr: "üye", en: "member" },
      { de: "der Beitrag", tr: "aidat", en: "membership fee" },
      { de: "das Training", tr: "antrenman", en: "training" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Haftada iki kez antrenmana gitmek istiyorum.",
        answer: "Ich möchte zweimal pro Woche zum Training gehen.",
        alternatives: ["Ich möchte zweimal in der Woche zum Training gehen."],
        hint: "„möchte“ modal fiil: ikinci sırada durur, asıl fiil („gehen“) cümlenin sonuna gider.",
      },
      {
        kind: "form",
        prompt: "Kayıt formunu Selin için doldur.",
        facts: "Selin Kara, 24 yaşında, Türkiye'den; Köln'de Gartenstraße 8'de oturuyor; voleybol oynamak istiyor.",
        fields: [
          { label: "Name", answer: "Selin Kara", accept: ["Selin", "Kara"] },
          { label: "Alter", answer: "24", accept: ["vierundzwanzig", "24 Jahre"] },
          { label: "Straße", answer: "Gartenstraße 8", accept: ["Gartenstrasse 8", "Gartenstraße"] },
          { label: "Stadt", answer: "Köln", accept: ["Koeln"] },
          { label: "Sportart", answer: "Volleyball", accept: ["volleyball"] },
        ],
      },
      {
        kind: "free",
        prompt:
          "Spor kulübüne kısa bir mesaj yaz: kim olduğunu söyle, hangi sporu yapmak istediğini yaz, hangi günler vaktin olduğunu belirt ve aidatı sor.",
        checklist: [
          "Kendini tanıt",
          "Hangi sporu yapmak istediğini yaz",
          "Hangi günler vaktin olduğunu söyle",
          "Aidatı sor ve teşekkür et",
        ],
        minWords: 30,
        phrases: [
          { de: "Ich möchte Mitglied werden.", tr: "Üye olmak istiyorum.", en: "I would like to become a member." },
          { de: "Ich spiele gern …", tr: "… oynamayı severim", en: "I like playing …" },
          { de: "Am … und am … habe ich Zeit.", tr: "… ve … günleri vaktim var.", en: "I'm free on … and on …" },
          { de: "Wie hoch ist der Beitrag?", tr: "Aidat ne kadar?", en: "How much is the membership fee?" },
          { de: "Vielen Dank für Ihre Antwort.", tr: "Cevabınız için teşekkürler.", en: "Many thanks for your reply." },
        ],
        sample:
          "Guten Tag, mein Name ist Selin Kara. Ich bin vierundzwanzig Jahre alt und wohne in Köln. " +
          "Ich möchte Mitglied in Ihrem Sportverein werden. Ich spiele gern Volleyball. " +
          "Am Dienstag und am Donnerstag habe ich Zeit, am Wochenende leider nicht. " +
          "Wie hoch ist der Beitrag pro Monat? Vielen Dank für Ihre Antwort. Freundliche Grüße, Selin Kara",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s6",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "ich oder ach?",
    genre: "pronounce",
    intro: "Almancada „ch“ iki ayrı sestir; hangi ünlüden sonra hangisinin geldiğini altı cümlede ayır.",
    gloss: [
      { de: "das Buch", tr: "kitap", en: "book" },
      { de: "die Küche", tr: "mutfak", en: "kitchen" },
      { de: "die Tochter", tr: "kız evlat", en: "daughter" },
      { de: "das Mädchen", tr: "kız çocuğu", en: "girl" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Ich suche mein Buch.",
        tr: "Kitabımı arıyorum.",
        hint: "„ich“ ve „suche“ yumuşak ch (dilin ortası damağa yakın); „Buch“ ise u'dan sonra boğazdan gelen sert ch.",
        confusions: [
          {
            heard: ["Ik suche mein Buk", "Ich suche mein Buh"],
            fix: "ch hiçbir zaman k değildir: „Buch“ sonunda hava sürtünerek çıkar, ses kesilmez.",
            expected: "Buch",
          },
        ],
      },
      {
        de: "Die Küche ist sehr klein.",
        tr: "Mutfak çok küçük.",
        hint: "ü, i, e, ä ve ünsüzden sonra ch YUMUŞAK: KÜ-şı gibi değil, KÜ-hı gibi ince bir sürtünme.",
        confusions: [
          {
            heard: ["Die Kuche ist sehr klein", "Die Küşe ist sehr klein"],
            fix: "ch Türkçedeki ş değildir; dil öne gelir ama dudaklar yuvarlanmaz.",
            expected: "Küche",
          },
        ],
      },
      {
        de: "Meine Tochter kocht heute.",
        tr: "Kızım bugün yemek pişiriyor.",
        hint: "„Tochter“ içinde o'dan sonra sert ch var; „kocht“ da öyle. İkisi de boğazdan.",
        confusions: [
          {
            heard: ["Meine Tokter kocht heute", "Meine Tochter kokt heute"],
            fix: "a, o, u ve au'dan sonra ch sert çıkar ama yine sürtünmeli bir sestir, k değil.",
            expected: "Tochter",
          },
        ],
      },
      {
        de: "Das Mädchen möchte Milch.",
        tr: "Kız çocuğu süt istiyor.",
        hint: "Üçünde de yumuşak ch var: „Mädchen“, „möchte“, „Milch“. Küçültme eki -chen her zaman yumuşaktır.",
        confusions: [
          {
            heard: ["Das Mädchen möchte Milk", "Das Mätchen möchte Milch"],
            fix: "-chen ekinden önceki d ayrı okunur: MEET-şın değil, MEET-hın.",
            expected: "Mädchen",
          },
        ],
      },
      {
        de: "Am Wochenende machen wir nichts.",
        tr: "Hafta sonu hiçbir şey yapmıyoruz.",
        hint: "„Wochenende“ ve „machen“ sert, „nichts“ yumuşak — aynı cümlede iki ses yan yana.",
        confusions: [
          {
            heard: ["Am Wochenende machen wir nicks"],
            fix: "„nichts“ içindeki ch yumuşaktır ve sondaki ts'den önce duyulur: NİHTS.",
            expected: "nichts",
          },
        ],
      },
      {
        de: "Der Koch sucht ein Buch.",
        tr: "Aşçı bir kitap arıyor.",
        hint: "„Koch“ ve „Buch“ sert, „sucht“ da sert — üçünde de ünlü arka ünlü.",
        confusions: [
          {
            heard: ["Der Kok sucht ein Buch", "Der Koch suht ein Buch"],
            fix: "„sucht“ içindeki ch söylenmeden yutulmaz; t'den önce kısa bir sürtünme duyulur.",
            expected: "sucht",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g6",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "Was hast du gestern gemacht?",
    genre: "grammar",
    intro: "Almancada gündelik geçmiş zaman iki parçadan kurulur; hangi yardımcı fiilin geldiğini ve ikinci parçanın nereye gittiğini öğren.",
    focus: "Perfekt: haben ya da sein + Partizip II",
    gloss: [
      { de: "gestern", tr: "dün", en: "yesterday" },
      { de: "das Wochenende", tr: "hafta sonu", en: "weekend" },
      { de: "besuchen", tr: "ziyaret etmek", en: "to visit" },
      { de: "telefonieren", tr: "telefonla konuşmak", en: "to talk on the phone" },
      { de: "früh", tr: "erken", en: "early" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "İki parça, iki yer",
        tr: "Türkçede geçmiş zaman tek ekle kurulur. Almancada ise iki parça vardır: çekimli yardımcı fiil İKİNCİ sırada durur, asıl fiilin geçmiş biçimi (Partizip II) cümlenin EN SONUNA gider. Arada ne varsa ortada kalır.",
        examples: [
          { de: "Ich habe gestern Brot gekauft.", tr: "Dün ekmek aldım.", note: "habe … gekauft" },
          { de: "Wir haben am Wochenende viel gearbeitet.", tr: "Hafta sonu çok çalıştık.", note: "haben … gearbeitet" },
          { de: "Hast du deine Mutter besucht?", tr: "Anneni ziyaret ettin mi?", note: "Soru: fiil başa geçer, Partizip yine sonda." },
        ],
      },
      {
        heading: "haben mi, sein mi?",
        tr: "Fiillerin çoğu „haben“ ister. „sein“ yalnız iki grupta gelir: yer değiştiren fiiller (gehen, fahren, kommen, fliegen) ve durum değiştirenler (aufstehen, einschlafen, werden). „sein“ ve „bleiben“ de kendileri bu gruba girer.",
        examples: [
          { de: "Ich bin um sechs Uhr aufgestanden.", tr: "Saat altıda kalktım.", note: "durum değişiyor → sein" },
          { de: "Sie ist nach Berlin gefahren.", tr: "Berlin'e gitti.", note: "yer değişiyor → sein" },
          { de: "Er hat lange telefoniert.", tr: "Uzun süre telefonda konuştu.", note: "hareket yok → haben" },
        ],
      },
      {
        heading: "Partizip nasıl kurulur?",
        tr: "Düzenli fiiller ge- … -t alır: kaufen → gekauft. Düzensizler ge- … -en alır ve kök sesi değişebilir: trinken → getrunken. İki grup ge- almaz: -ieren ile biten fiiller (telefonieren → telefoniert) ve ayrılmayan ön ekli fiiller (besuchen → besucht).",
        examples: [
          { de: "Wir haben Kaffee getrunken.", tr: "Kahve içtik.", note: "düzensiz: ge- … -en" },
          { de: "Ich habe die Stadt fotografiert.", tr: "Şehrin fotoğrafını çektim.", note: "-ieren: ge- yok" },
          { de: "Der Zug ist früh angekommen.", tr: "Tren erken geldi.", note: "ayrılabilen: ge- ortaya girer" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich ___ gestern einen Film gesehen.",
        options: ["habe", "bin", "war"],
        answer: 0,
        explain: "„sehen“ yer ya da durum değiştirmez, o yüzden yardımcı fiil haben'dir.",
      },
      {
        text: "Wir ___ am Sonntag nach Hamburg gefahren.",
        options: ["haben", "waren", "sind"],
        answer: 2,
        explain: "„fahren“ yer değiştiren bir fiil: Perfekt'i sein ile kurulur.",
      },
      {
        text: "Welches Partizip ist richtig? trinken → ?",
        options: ["getrinkt", "getrunken", "trinkt"],
        answer: 1,
        explain: "„trinken“ düzensizdir: ge- … -en alır ve kök ünlüsü i → u olur.",
      },
      {
        kind: "gapfill",
        text: "Sie hat ihre Freundin ___. (besuchen)",
        options: [],
        answer: 0,
        accept: ["besucht"],
        explain: "„besuchen“ ayrılmayan be- ön ekini taşır, bu yüzden ge- almaz: besucht.",
      },
      {
        kind: "gapfill",
        text: "Ich ___ um halb sieben aufgestanden. (sein)",
        options: [],
        answer: 0,
        accept: ["bin"],
        explain: "„aufstehen“ durum değiştirir; yardımcı fiili sein'dir.",
      },
      {
        kind: "gapfill",
        text: "Er hat zwei Stunden ___. (telefonieren)",
        options: [],
        answer: 0,
        accept: ["telefoniert"],
        explain: "-ieren ile biten fiiller ge- almaz: telefoniert.",
      },
      {
        kind: "gapfill",
        text: "___ du gestern gearbeitet? (haben)",
        options: [],
        answer: 0,
        accept: ["Hast", "hast"],
        explain: "Soruda yardımcı fiil başa geçer ve özneye göre çekilir: Hast du …?",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "habe", "gestern", "Fußball", "gespielt"],
        explain: "Yardımcı fiil ikinci sırada, Partizip en sonda: Ich habe gestern Fußball gespielt.",
      },
      {
        kind: "truefalse",
        text: "„Ich habe nach Köln gefahren.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„fahren“ sein ister; doğrusu „Ich bin nach Köln gefahren.“",
      },
      {
        kind: "truefalse",
        text: "„Wir haben am Wochenende viel gearbeitet.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„arbeiten“ düzenli bir fiil ve haben ister; Partizip sonda duruyor.",
      },
    ],
  },
];
