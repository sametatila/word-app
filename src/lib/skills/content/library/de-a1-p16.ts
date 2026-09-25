import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 16.
 *
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri. Paylaşım ve mahalle hattı:
 * paylaşımlı evin temizlik planı, bit pazarında pazarlık, panoya asılan ders
 * ilanı. Söyleyiş odağı kelimeleri bağlamak (iki aynı ses tek söylenir); dil
 * bilgisi belirtme hâli isteyen edatlar für / ohne / gegen / um / durch.
 */
export const deA1P16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r16",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Unser Putzplan",
    genre: "info",
    intro: "Paylaşımlı bir evin buzdolabında temizlik planı asılı: hangi hafta kim ne yapıyor, neyi birlikte yapıyorlar, parayı kim topluyor.",
    gloss: [
      { de: "die WG", tr: "paylaşımlı ev", en: "shared flat" },
      { de: "putzen", tr: "temizlemek", en: "to clean" },
      { de: "der Müll", tr: "çöp", en: "trash" },
      { de: "das Geschirr", tr: "bulaşık", en: "dishes" },
      { de: "tauschen", tr: "takas etmek", en: "to swap" },
      { de: "das Putzmittel", tr: "temizlik malzemesi", en: "cleaning product" },
    ],
    minutes: 4,
    text:
      "PUTZPLAN — WG GARTENWEG 7\n\n" +
            "Woche 1: Lena putzt das Bad, Tarik die Küche und Jonas bringt den Müll raus.\n" +
      "Woche 2: Tarik putzt das Bad, Jonas die Küche und Lena bringt den Müll raus.\n" +
      "Woche 3: Jonas putzt das Bad, Lena die Küche und Tarik bringt den Müll raus.\n\n" +
      "Wichtig: Jeder wäscht sein Geschirr selbst, gleich nach dem Essen.\n\n" +
      "Den Kühlschrank putzen wir zusammen, am letzten Samstag im Monat um zehn Uhr.\n\n" +
      "Du hast keine Zeit? Dann tausch bitte mit einer anderen Person und schreib es hier auf.\n\n" +
      "Neu: Jeder bezahlt fünf Euro im Monat für Putzmittel. Lena kauft alles ein.",
    questions: [
      {
        text: "Wer putzt in Woche 2 das Bad?",
        options: ["Lena", "Tarik", "Jonas"],
        answer: 1,
        explain: "„Woche 2: Tarik putzt das Bad“; Lena o hafta çöpü çıkarıyor.",
      },
      {
        text: "Wann putzen alle zusammen den Kühlschrank?",
        options: ["am letzten Samstag im Monat", "jeden Sonntag um zehn Uhr", "in Woche 1"],
        answer: 0,
        explain: "„Den Kühlschrank putzen wir zusammen, am letzten Samstag im Monat um zehn Uhr.“",
      },
      {
        kind: "truefalse",
        text: "Jeder wäscht sein Geschirr selbst.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Jeder wäscht sein Geschirr selbst, gleich nach dem Essen.“",
      },
      {
        kind: "gapfill",
        text: "Jeder bezahlt ___ Euro im Monat für Putzmittel.",
        options: [],
        answer: 0,
        accept: ["fünf", "5"],
        explain: "„Jeder bezahlt fünf Euro im Monat für Putzmittel.“",
      },
      {
        kind: "short_answer",
        text: "Wer kauft die Putzmittel?",
        options: [],
        answer: 0,
        accept: ["Lena", "Lena kauft sie"],
        explain: "„Lena kauft alles ein.“",
      },
      {
        text: "Man hat keine Zeit für seine Arbeit. Was soll man machen?",
        options: ["die Arbeit einfach nicht machen", "Lena fünf Euro dafür bezahlen", "mit einer anderen Person tauschen"],
        answer: 2,
        explain: "„Du hast keine Zeit? Dann tausch bitte mit einer anderen Person und schreib es hier auf.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l16",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Auf dem Flohmarkt",
    genre: "dialogue",
    intro: "Bir kadın bit pazarında bir lamba beğeniyor ve satıcıyla pazarlık ediyor: fiyat ne, sonunda ne ödüyor, ne kadar para üstü alıyor.",
    gloss: [
      { de: "der Flohmarkt", tr: "bit pazarı", en: "flea market" },
      { de: "die Lampe", tr: "lamba", en: "lamp" },
      { de: "funktionieren", tr: "işlemek", en: "to function" },
      { de: "der Schein", tr: "banknot", en: "banknote" },
      { de: "das Kleingeld", tr: "bozuk para", en: "small change" },
      { de: "die Kleidung", tr: "kıyafet", en: "clothing" },
    ],
    minutes: 4,
    segments: [
      { speaker: "Frau Wiese", text: "Hallo! Was kostet die Lampe hier?" },
      { speaker: "Tim", text: "Die Lampe? Fünfzehn Euro. Sie ist fast neu, ich habe sie erst letztes Jahr gekauft." },
      { speaker: "Frau Wiese", text: "Funktioniert sie auch?" },
      { speaker: "Tim", text: "Ja, natürlich. Ich ziehe nur in eine kleine Wohnung, da habe ich keinen Platz." },
      { speaker: "Frau Wiese", text: "Fünfzehn Euro ist mir zu viel. Geht es auch für zehn?" },
      { speaker: "Tim", text: "Zwölf Euro, und Sie bekommen das Kinderbuch hier dazu. Das kostet sonst einen Euro." },
      { speaker: "Frau Wiese", text: "Gut, zwölf Euro mit dem Buch. Ich habe aber nur einen Schein, zwanzig Euro." },
      { speaker: "Tim", text: "Kein Problem, ich habe genug Kleingeld. Hier sind acht Euro zurück." },
      { speaker: "Frau Wiese", text: "Danke! Sind Sie nächsten Samstag auch hier?" },
      { speaker: "Tim", text: "Nein, der nächste Flohmarkt ist erst im Mai. Dann verkaufe ich auch Kleidung." },
    ],
    questions: [
      {
        text: "Was möchte Frau Wiese kaufen?",
        options: ["eine Lampe", "Kleidung", "einen Tisch"],
        answer: 0,
        explain: "İlk sorusu „Was kostet die Lampe hier?“; kıyafet mayısta satılacak.",
      },
      {
        text: "Wie viel bezahlt sie am Ende?",
        options: ["fünfzehn Euro", "zehn Euro", "zwölf Euro"],
        answer: 2,
        explain: "On beş fazla geliyor, on öneriyor; anlaştıkları fiyat „zwölf Euro mit dem Buch“.",
      },
      {
        kind: "truefalse",
        text: "Für das Kinderbuch bezahlt sie nichts extra.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Zwölf Euro, und Sie bekommen das Kinderbuch hier dazu“ — kitap fiyata dahil.",
      },
      {
        kind: "gapfill",
        text: "Frau Wiese bekommt ___ Euro zurück.",
        options: [],
        answer: 0,
        accept: ["acht", "8"],
        explain: "Yirmi avro veriyor, fiyat on iki: „Hier sind acht Euro zurück.“",
      },
      {
        kind: "short_answer",
        text: "Wann ist der nächste Flohmarkt?",
        options: [],
        answer: 0,
        accept: ["im Mai", "Mai", "erst im Mai"],
        explain: "„der nächste Flohmarkt ist erst im Mai“.",
      },
      {
        text: "Warum verkauft Tim die Lampe?",
        options: ["Sie funktioniert nicht.", "Er zieht in eine kleine Wohnung.", "Er braucht Geld für den Urlaub."],
        answer: 1,
        explain: "„Ich ziehe nur in eine kleine Wohnung, da habe ich keinen Platz.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w16",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Türkisch lernen? Ich helfe gern!",
    genre: "ad",
    intro: "Süpermarketin panosuna Türkçe dersi ilanı asıyorsun: önce iki cümle kur, sonra kısa bir ilan yaz.",
    gloss: [
      { de: "der Unterricht", tr: "ders", en: "class" },
      { de: "der Anfänger", tr: "yeni başlayan", en: "beginner" },
      { de: "online", tr: "çevrimiçi", en: "online" },
      { de: "die Stunde", tr: "saat", en: "hour" },
      { de: "der Erwachsene", tr: "yetişkin", en: "adult" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bir saat on beş avro.",
        answer: "Eine Stunde kostet fünfzehn Euro.",
        alternatives: ["Fünfzehn Euro kostet eine Stunde."],
        hint: "Fiyat „kosten“ fiiliyle söylenir; özne „eine Stunde“, fiil ikinci sırada.",
      },
      {
        kind: "build",
        tr: "Salı ve perşembe akşamları vaktim var.",
        answer: "Am Dienstag und am Donnerstag habe ich abends Zeit.",
        alternatives: ["Ich habe am Dienstag und am Donnerstag abends Zeit."],
        hint: "Günler „am“ alır; günler başa gelince fiil ikinci, özne arkasında kalır.",
      },
      {
        kind: "free",
        prompt:
          "Panoya kısa bir ilan yaz: ne öğrettiğini ve kimler için olduğunu söyle, kendini kısaca tanıt, ne zaman ve nerede ders verebileceğini yaz, ücreti ve nasıl ulaşılacağını belirt.",
        checklist: [
          "Ne öğrettiğini ve kimler için olduğunu yaz",
          "Kendini kısaca tanıt",
          "Gün, saat ve yeri söyle",
          "Ücreti ve iletişim bilgini yaz",
        ],
        minWords: 35,
        phrases: [
          { de: "Ich gebe …unterricht.", tr: "… dersi veriyorum.", en: "I give … lessons." },
          { de: "Der Unterricht ist für …", tr: "Ders … için.", en: "The lessons are for …" },
          { de: "Wir lernen bei mir oder online.", tr: "Bende ya da çevrimiçi çalışıyoruz.", en: "We study at my place or online." },
          { de: "Eine Stunde kostet …", tr: "Bir saat … tutuyor.", en: "One hour costs …" },
          { de: "Schreiben Sie mir: …", tr: "Bana yazın: …", en: "Write to me: …" },
        ],
        sample:
          "Türkisch lernen? Ich helfe gern! Ich heiße Aylin, ich komme aus Ankara und wohne seit zwei Jahren in Köln. " +
          "Ich gebe Türkischunterricht für Anfänger, für Kinder und für Erwachsene. " +
          "Am Dienstag und am Donnerstag habe ich abends Zeit. Wir lernen bei mir in der Südstadt oder online. " +
          "Eine Stunde kostet fünfzehn Euro. Schreiben Sie mir: aylin.t@post.de",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s16",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "und dann: Wörter verbinden",
    genre: "pronounce",
    intro: "Almanca konuşurken kelimeler tek tek değil gruplar hâlinde söylenir: iki aynı ses buluşunca bir tanesi söylenir ve araya ünlü girmez. Altı cümlede kelimeleri bağla.",
    gloss: [
      { de: "einkaufen", tr: "alışveriş yapmak", en: "to shop" },
      { de: "teuer", tr: "pahalı", en: "expensive" },
      { de: "warten", tr: "beklemek", en: "to wait" },
      { de: "die Zeit", tr: "zaman", en: "time" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Ich kaufe ein und dann koche ich.",
        tr: "Alışveriş yapıyorum, sonra yemek pişiriyorum.",
        hint: "„und dann“: iki d buluşur, tek ve biraz uzun bir d söylenir: un-DAN.",
        confusions: [
          {
            heard: [],
            fix: "İki d arasında durup araya ı ekleme; dil yerinde kalır, ses kesilmez.",
            expected: "und dann",
          },
        ],
      },
      {
        de: "Ich spiele mit Tom Tennis.",
        tr: "Tom'la tenis oynuyorum.",
        hint: "„mit Tom“: t ile t buluşur, bir kez söylenir: mi-TOM.",
        confusions: [
          {
            heard: [],
            fix: "„miti Tom“ gibi araya ünlü koyma; iki kelime tek hamlede.",
            expected: "mit Tom",
          },
        ],
      },
      {
        de: "Das Hotel ist teuer.",
        tr: "Otel pahalı.",
        hint: "„ist teuer“: iki t tek t olur: is-TOY-a.",
        confusions: [
          {
            heard: [],
            fix: "t'yi iki kez patlatma; bir t ve ardından hemen „teuer“.",
            expected: "ist teuer",
          },
        ],
      },
      {
        de: "Wir warten auf Frau Berg.",
        tr: "Bayan Berg'i bekliyoruz.",
        hint: "„auf Frau“: f ile f buluşur, tek ve uzunca bir f: au-FRAU.",
        confusions: [
          {
            heard: [],
            fix: "İki f arasında nefes alma; ses kesintisiz devam eder.",
            expected: "auf Frau",
          },
        ],
      },
      {
        de: "Wann kommt Tanja nach Hause?",
        tr: "Tanja eve ne zaman geliyor?",
        hint: "„kommt Tanja“: kom-TAN-ya, t bir kez söylenir.",
        confusions: [
          {
            heard: [],
            fix: "Kelimeler arasında durup t'yi iki kez söyleme; akış bozulmasın.",
            expected: "kommt Tanja",
          },
        ],
      },
      {
        de: "Hast du heute Zeit?",
        tr: "Bugün vaktin var mı?",
        hint: "„hast du“ konuşmada neredeyse „hastu“ gibi bağlanır: t ile d tek hamlede.",
        confusions: [
          {
            heard: [],
            fix: "t'yi bitirip d için yeniden başlama; iki ses kaynaşır.",
            expected: "hast du",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g16",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "für dich, ohne mich",
    genre: "grammar",
    intro: "Bazı edatlardan sonra isim ve zamir hep belirtme hâline geçer; beş edatı ve artikelin nasıl değiştiğini öğren.",
    focus: "Belirtme hâli (Akkusativ) isteyen edatlar: für, ohne, gegen, um, durch",
    gloss: [
      { de: "das Geschenk", tr: "hediye", en: "gift" },
      { de: "der Tisch", tr: "masa", en: "table" },
      { de: "der Wald", tr: "orman", en: "forest" },
      { de: "die Jacke", tr: "ceket", en: "jacket" },
      { de: "der Park", tr: "park", en: "park" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Beş edat, tek hâl",
        tr: "„für, ohne, gegen, um, durch“ edatlarından sonra isim hep belirtme hâlindedir. Bu hâl, fiil nesnesinde olduğu gibi, yalnız eril isimde görünür: der → den, ein → einen, mein → meinen. Dişil, nötr ve çoğul isimde artikel değişmez.",
        examples: [
          { de: "Das Geschenk ist für den Lehrer.", tr: "Hediye öğretmen için.", note: "der Lehrer → für den" },
          { de: "Er geht ohne seine Jacke raus.", tr: "Ceketi olmadan dışarı çıkıyor.", note: "die Jacke → değişmez" },
          { de: "Wir gehen durch den Park.", tr: "Parkın içinden geçiyoruz.", note: "der Park → durch den" },
        ],
      },
      {
        heading: "Hangisi ne anlatır?",
        tr: "„für“ için, „ohne“ olmadan ya da -siz, „durch“ içinden geçerek demektir. „um“ bir şeyin etrafını ve tam saati, „gegen“ karşıtlığı ve yaklaşık saati anlatır: „um acht“ tam sekizde, „gegen acht“ sekiz civarında.",
        examples: [
          { de: "Wir sitzen um den Tisch.", tr: "Masanın etrafında oturuyoruz.", note: "um: etrafında" },
          { de: "Ich komme gegen acht Uhr.", tr: "Saat sekiz civarında geliyorum.", note: "gegen: civarında" },
          { de: "Ich trinke Kaffee ohne Milch.", tr: "Kahveyi sütsüz içerim.", note: "ohne: -siz" },
        ],
      },
      {
        heading: "Zamirlerle",
        tr: "Bu edatlardan sonra zamirler de belirtme hâline geçer: für mich, für dich, ohne ihn, gegen uns. Türkçedeki „benim için“ ile aynı sıra: önce edat, sonra zamir.",
        examples: [
          { de: "Ist das für mich?", tr: "Bu benim için mi?", note: "ich → mich" },
          { de: "Ohne dich gehe ich nicht.", tr: "Sensiz gitmiyorum.", note: "du → dich" },
          { de: "Ich habe nichts gegen ihn.", tr: "Ona karşı bir şeyim yok.", note: "er → ihn" },
        ],
      },
    ],
    questions: [
      {
        text: "Das Geschenk ist für ___ Vater.",
        options: ["der", "den", "dem"],
        answer: 1,
        explain: "„für“ belirtme hâli ister; eril „der Vater“ → für den Vater.",
      },
      {
        text: "Er geht ohne ___ Jacke raus.",
        options: ["seine", "seinen", "seiner"],
        answer: 0,
        explain: "„die Jacke“ dişildir; belirtme hâlinde değişmez: ohne seine Jacke.",
      },
      {
        text: "Wir fahren mit dem Rad durch ___ Wald.",
        options: ["der", "dem", "den"],
        answer: 2,
        explain: "„durch“ belirtme hâli ister; eril „der Wald“ → durch den Wald.",
      },
      {
        kind: "gapfill",
        text: "Ist der Kaffee für ___? (ich)",
        options: [],
        answer: 0,
        accept: ["mich"],
        explain: "„für“dan sonra zamir de belirtme hâlinde: ich → mich.",
      },
      {
        kind: "gapfill",
        text: "Wir sitzen um ___ Tisch. (der Tisch)",
        options: [],
        answer: 0,
        accept: ["den"],
        explain: "„um“ belirtme hâli ister: der Tisch → um den Tisch.",
      },
      {
        kind: "gapfill",
        text: "Ohne ___ gehe ich nicht ins Kino. (du)",
        options: [],
        answer: 0,
        accept: ["dich"],
        explain: "„ohne“dan sonra zamir belirtme hâlinde: du → dich.",
      },
      {
        kind: "gapfill",
        text: "Ich komme ___ acht Uhr, vielleicht ein bisschen später.",
        options: [],
        answer: 0,
        accept: ["gegen"],
        explain: "Saat kesin değil, yaklaşık: gegen acht Uhr.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "kaufe", "Blumen", "für", "meinen Vater"],
        explain: "Fiil ikinci sırada; „für“dan sonra eril isim belirtme hâlinde: für meinen Vater.",
      },
      {
        kind: "truefalse",
        text: "„Ich habe ein Geschenk für dir.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„für“ belirtme hâli ister; doğrusu „für dich“.",
      },
      {
        kind: "truefalse",
        text: "„Die Blumen sind für meine Mutter.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Dişil isim belirtme hâlinde değişmez: für meine Mutter doğru.",
      },
    ],
  },
];
