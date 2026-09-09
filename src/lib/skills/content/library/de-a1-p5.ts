import type { SkillExercise } from "../../types";

/**
 * DE · A1 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `de-a1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Son parti kalan türleri kapatıyor: kullanma talimatı, tanıtım konuşması ve
 * gelen mesaja cevap. Söyleyiş odağı uzun-kısa ünlü; dil bilgisi ayrılabilen
 * fiiller ve W-soruları.
 */
export const deA1P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a1-lib-r5",
    course: "de",
    level: "A1",
    skill: "reading",
    title: "Waschsalon Blau — so geht es",
    genre: "Kullanma talimatı",
    intro: "Çamaşırhanenin duvarındaki kullanım talimatını okuyacaksın: hangi sırayla ne yapılıyor, ne kadar tutuyor.",
    gloss: [
      { de: "der Waschsalon", tr: "çamaşırhane", en: "laundrette" },
      { de: "die Wäsche", tr: "çamaşır", en: "laundry" },
      { de: "das Waschmittel", tr: "deterjan", en: "detergent" },
      { de: "das Fach", tr: "göz", en: "compartment" },
      { de: "die Münze", tr: "madeni para", en: "coin" },
      { de: "der Trockner", tr: "kurutma makinesi", en: "dryer" },
    ],
    minutes: 4,
    text:
      "WASCHSALON BLAU — SO GEHT ES\n\n" +
      "1. Nimm einen Korb und lege deine Wäsche in eine freie Maschine. Die Maschinen mit dem grünen Licht sind frei.\n\n" +
      "2. Gib das Waschmittel in das kleine Fach oben links.\n\n" +
      "3. Wähle das Programm: Nummer eins für weiße Wäsche, Nummer zwei für Farben, Nummer drei für Wolle.\n\n" +
      "4. Bezahle am Automaten neben der Tür. Eine Wäsche kostet drei Euro fünfzig. Der Automat nimmt nur Münzen.\n\n" +
      "5. Nach fünfundvierzig Minuten ist die Wäsche fertig. Nimm sie dann bitte sofort heraus.\n\n" +
      "Der Trockner kostet einen Euro für zehn Minuten.",
    questions: [
      {
        text: "Was für ein Text ist das?",
        options: [
          "eine Anleitung für einen Waschsalon",
          "eine Anzeige für eine Waschmaschine",
          "eine Rechnung aus einem Waschsalon",
        ],
        answer: 0,
        explain: "Numaralı adımlar ve emir cümleleri („Nimm“, „Gib“, „Wähle“) var — bu bir kullanım talimatı.",
      },
      {
        text: "Wie sieht man, welche Maschine frei ist?",
        options: ["Sie hat ein grünes Licht.", "Sie steht neben der Tür.", "Sie hat die Nummer eins."],
        answer: 0,
        explain: "„Die Maschinen mit dem grünen Licht sind frei.“ Kapının yanında duran otomat, para ödeme yeri.",
      },
      {
        kind: "truefalse",
        text: "Man kann mit Karte bezahlen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Der Automat nimmt nur Münzen.“ — yalnız madeni para.",
      },
      {
        kind: "gapfill",
        text: "Eine Wäsche kostet drei Euro ___.",
        options: [],
        answer: 0,
        accept: ["fünfzig", "50"],
        explain: "„Eine Wäsche kostet drei Euro fünfzig.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange läuft eine Maschine?",
        options: [],
        answer: 0,
        accept: ["fünfundvierzig Minuten", "45 Minuten", "fünfundvierzig"],
        explain: "„Nach fünfundvierzig Minuten ist die Wäsche fertig.“",
      },
      {
        text: "Was soll man nach dem Waschen sofort machen?",
        options: ["die Wäsche herausnehmen", "den Trockner bezahlen", "den Korb zurückbringen"],
        answer: 0,
        explain: "„Nimm sie dann bitte sofort heraus.“ Kurutma makinesi ayrı ve isteğe bağlı.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a1-lib-l5",
    course: "de",
    level: "A1",
    skill: "listening",
    title: "Willkommen auf dem Bauernhof",
    genre: "Tanıtım konuşması",
    intro: "Bir çiftlikte rehber grubu karşılıyor: gün nasıl geçecek, nerede ne yapılacak, sonunda ne var.",
    gloss: [
      { de: "der Bauernhof", tr: "çiftlik", en: "farm" },
      { de: "der Stall", tr: "ahır", en: "stable" },
      { de: "die Kuh", tr: "inek", en: "cow" },
      { de: "das Huhn", tr: "tavuk", en: "hen" },
      { de: "sammeln", tr: "toplamak", en: "to collect" },
      { de: "der Honig", tr: "bal", en: "honey" },
    ],
    minutes: 4,
    segments: [
      { text: "Herzlich willkommen auf dem Bauernhof Lindenhof! Mein Name ist Ruth und ich zeige euch heute alles." },
      { text: "Wir beginnen im Stall. Dort leben zwanzig Kühe und drei Pferde." },
      { text: "Danach gehen wir zu den Hühnern. Ihr dürft dort Eier sammeln, aber bitte ganz vorsichtig." },
      { text: "Um zwölf Uhr essen wir zusammen im Garten. Es gibt Brot, Käse und frische Milch." },
      { text: "Bitte lasst die Taschen im Bus. Bleibt immer bei der Gruppe." },
      { text: "Am Ende könnt ihr im Hofladen Honig und Marmelade kaufen. Jetzt geht es los!" },
    ],
    questions: [
      {
        text: "Wer spricht?",
        options: ["eine Frau vom Bauernhof", "eine Lehrerin aus der Schule", "ein Kind aus der Gruppe"],
        answer: 0,
        explain: "„Mein Name ist Ruth und ich zeige euch heute alles“ — grubu çiftliğin kendi rehberi gezdiriyor.",
      },
      {
        text: "Was machen die Gäste bei den Hühnern?",
        options: ["Sie sammeln Eier.", "Sie füttern die Kühe.", "Sie kaufen Honig."],
        answer: 0,
        explain: "„Ihr dürft dort Eier sammeln, aber bitte ganz vorsichtig.“",
      },
      {
        kind: "truefalse",
        text: "Das Essen gibt es um ein Uhr.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Um zwölf Uhr essen wir zusammen im Garten.“ — saat birde değil, on ikide.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Kühe leben im Stall?",
        options: [],
        answer: 0,
        accept: ["zwanzig", "20", "zwanzig Kühe"],
        explain: "„Dort leben zwanzig Kühe und drei Pferde.“",
      },
      {
        kind: "dictation",
        text: "Rehberin çantalarla ilgili ricasını söylüyor: cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Bitte lasst die Taschen im Bus.", "Bitte lasst die Taschen im Bus"],
        explain: "„Bitte lasst die Taschen im Bus.“ — ihr biçiminde emir kipinde özne söylenmez.",
      },
      {
        text: "Was kann man am Ende kaufen?",
        options: ["Honig und Marmelade", "Eier und Käse", "Brot und Milch"],
        answer: 0,
        explain: "„Am Ende könnt ihr im Hofladen Honig und Marmelade kaufen.“ Ekmek, peynir ve süt öğle yemeğinde.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a1-lib-w5",
    course: "de",
    level: "A1",
    skill: "writing",
    title: "Glückwunsch zur neuen Stelle",
    genre: "Mesaj",
    intro: "Bir arkadaşın iş bulduğunu yazmış; önce iki cümle kur, sonra ona kısa bir cevap mesajı yaz.",
    gloss: [
      { de: "der Glückwunsch", tr: "tebrik", en: "congratulation" },
      { de: "die Stelle", tr: "iş", en: "job" },
      { de: "feiern", tr: "kutlamak", en: "to celebrate" },
      { de: "sich freuen", tr: "sevinmek", en: "to be glad" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Yeni işin için tebrikler!",
        answer: "Herzlichen Glückwunsch zur neuen Stelle!",
        alternatives: ["Herzlichen Glückwunsch zu der neuen Stelle!"],
        hint: "Kalıp „Herzlichen Glückwunsch zu …“; „zu der“ kaynaşıp „zur“ olur.",
      },
      {
        kind: "build",
        tr: "Cumartesi akşamı birlikte kutlayabilir miyiz?",
        answer: "Können wir am Samstagabend zusammen feiern?",
        alternatives: ["Können wir zusammen am Samstagabend feiern?"],
        hint: "Soruda modal fiil en başa geçer; asıl fiil (feiern) yine cümlenin sonunda kalır.",
      },
      {
        kind: "free",
        prompt:
          "Arkadaşın iş bulduğunu yazdı. Ona kısa bir mesajla cevap ver: tebrik et, sevincini söyle, işle ilgili bir iki soru sor, buluşma öner ve ne zaman vaktin olduğunu yaz.",
        stimulus:
          "Hallo! Ich habe endlich eine Stelle gefunden. Ab Montag arbeite ich in einer Apotheke in der Stadt. " +
          "Ich bin so froh! Wann sehen wir uns?",
        checklist: [
          "Tebrik et ve sevindiğini söyle",
          "İşle ilgili bir iki soru sor",
          "Buluşma öner",
          "Ne zaman vaktin olduğunu yaz ve vedalaş",
        ],
        minWords: 25,
        phrases: [
          { de: "Herzlichen Glückwunsch zu …!", tr: "… için tebrikler!" },
          { de: "Ich freue mich sehr für dich.", tr: "Senin için çok seviniyorum." },
          { de: "Wie lange arbeitest du …?", tr: "Ne kadar çalışıyorsun …?" },
          { de: "Können wir … feiern?", tr: "… kutlayabilir miyiz?" },
          { de: "Ich habe ab … Zeit.", tr: "… saatinden itibaren vaktim var." },
        ],
        sample:
          "Hallo Marie, herzlichen Glückwunsch zur neuen Stelle! Ich freue mich sehr für dich. " +
          "Wie lange arbeitest du jeden Tag? Und ist der Weg zur Apotheke weit? " +
          "Können wir am Samstagabend zusammen feiern? Ich habe ab sechs Uhr Zeit. " +
          "Schreib mir bitte kurz. Bis bald, Deniz",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a1-lib-s5",
    course: "de",
    level: "A1",
    skill: "speaking",
    title: "Kurzer oder langer Vokal?",
    genre: "Ses çalışması",
    intro: "Almancada ünlünün uzunluğu anlamı değiştirir; yedi cümlede kısa ve uzun ünlüyü ayırarak söyle.",
    gloss: [
      { de: "der Ofen", tr: "fırın", en: "oven" },
      { de: "offen", tr: "açık", en: "open" },
      { de: "der See", tr: "göl", en: "lake" },
      { de: "zumachen", tr: "kapatmak", en: "to close" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Der Ofen ist noch offen.",
        tr: "Fırın hâlâ açık.",
        hint: "„Ofen“ uzun o (OO-fen), „offen“ kısa o. Çift sessiz her zaman kısa ünlü demek.",
        confusions: [
          { heard: ["Der offen ist noch Ofen", "Der Ofen ist noch Ofen"], fix: "Tek sessizden önce ünlü uzar, çift sessizden önce kısalır: OO-fen ama O-fen değil, of-fen.", expected: "offen" },
        ],
      },
      {
        de: "Ich wohne mitten in der Stadt.",
        tr: "Şehrin ortasında oturuyorum.",
        hint: "„wohne“ uzun o (VOO-ne), „Stadt“ kısa a (ŞTAT). Sondaki dt tek t gibi okunur.",
        confusions: [
          { heard: ["Ich wonne", "in der Staat"], fix: "„wohne“ içindeki h ünlüyü uzatır; „Stadt“ kısa a — uzun söylersen „Staat“ (devlet) olur.", expected: "Stadt" },
        ],
      },
      {
        de: "Im Sommer fahren wir zum See.",
        tr: "Yazın göle gidiyoruz.",
        hint: "„Sommer“ kısa o, „See“ uzun e. İki ünlü yan yana geldiğinde ses uzar.",
        confusions: [
          { heard: ["Im Soomer", "zum se"], fix: "„Sommer“ çift m yüzünden kısa; „See“ çift e yüzünden uzun: zee.", expected: "See" },
        ],
      },
      {
        de: "Wir haben ihn in der Schule gesehen.",
        tr: "Onu okulda gördük.",
        hint: "„ihn“ uzun i (İİN), „in“ kısa i. Aradaki h sesi duyulmaz, yalnız uzatır.",
        confusions: [
          { heard: ["Wir haben in in der Schule", "Wir haben ihn ihn"], fix: "İlki uzun (iin), ikincisi kısa (in); ikisini aynı söylersen cümle anlamını yitirir.", expected: "ihn" },
        ],
      },
      {
        de: "Meine Oma kommt am Sonntag.",
        tr: "Babaannem pazar günü geliyor.",
        hint: "„Oma“ uzun o (OO-ma), „kommt“ ve „Sonntag“ kısa o.",
        confusions: [
          { heard: ["Meine Omma", "koomt"], fix: "Tek m'li „Oma“ uzun, çift m'li „kommt“ kısa okunur.", expected: "Oma" },
        ],
      },
      {
        de: "Wir gehen jetzt schlafen.",
        tr: "Şimdi uyumaya gidiyoruz.",
        hint: "„gehen“ uzun e, „jetzt“ kısa e, „schlafen“ uzun a.",
        confusions: [
          { heard: ["Wir gehn jetz schlaffen"], fix: "„schlafen“ tek f ile yazılır, bu yüzden a uzun: ŞLAA-fen.", expected: "schlafen" },
        ],
      },
      {
        de: "Bitte mach die Tür zu.",
        tr: "Lütfen kapıyı kapat.",
        hint: "„Tür“ uzun ü, „zu“ uzun u. „mach“ ise kısa a.",
        confusions: [
          { heard: ["mach die Tur zu", "Bitte mach die Tür tsuu"], fix: "„Tür“ uzun ü ile; ayrıca „zu“ burada fiile ait, ts sesiyle ve uzun u ile söylenir.", expected: "Tür" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a1-lib-g5",
    course: "de",
    level: "A1",
    skill: "grammar",
    title: "Wann stehst du auf?",
    genre: "Kural",
    intro: "Bazı fiiller cümlede ikiye ayrılır; ön ekin nereye gittiğini ve W-sorusunun sırasını öğren.",
    focus: "Ayrılabilen fiiller ve W-soruları",
    gloss: [
      { de: "anfangen", tr: "başlamak", en: "to begin" },
      { de: "abfahren", tr: "kalkmak", en: "to depart" },
      { de: "zumachen", tr: "kapatmak", en: "to close" },
      { de: "der Besuch", tr: "misafir", en: "visitor" },
    ],
    minutes: 6,
    explanation: [
      {
        heading: "Fiil ikiye ayrılıyor",
        tr: "Türkçede fiilin başına gelen bir parça asla kopmaz. Almancada ise bazı ön ekler cümlede fiilden ayrılır ve EN SONA gider. Sözlükte „aufstehen“ bitişik yazılır, cümlede ikiye bölünür.",
        examples: [
          { de: "Ich stehe um sechs Uhr auf.", tr: "Saat altıda kalkıyorum.", note: "aufstehen → stehe … auf" },
          { de: "Der Film fängt um acht an.", tr: "Film sekizde başlıyor.", note: "anfangen → fängt … an" },
          { de: "Wir kaufen am Samstag ein.", tr: "Cumartesi alışveriş yapıyoruz." },
        ],
      },
      {
        heading: "Hangi ön ek ayrılır?",
        tr: "Vurgulu ön ekler ayrılır: auf-, an-, ab-, aus-, ein-, mit-, zu-, vor-, fern-. Vurgusuz olanlar hiç ayrılmaz: be-, ver-, er-, ent-, ge-. Kelimeyi söylerken vurgu ön ekteyse ayrılır diye düşünebilirsin.",
        examples: [
          { de: "Der Zug fährt um zehn ab.", tr: "Tren onda kalkıyor.", note: "ab- ayrılır" },
          { de: "Wir bekommen morgen Besuch.", tr: "Yarın misafirimiz var.", note: "be- ayrılmaz" },
          { de: "Ich verstehe die Frage.", tr: "Soruyu anlıyorum.", note: "ver- ayrılmaz" },
        ],
      },
      {
        heading: "W-sorusunda sıra",
        tr: "Soru kelimesi başa gelir, çekimli fiil hemen arkasından İKİNCİ sırada durur, özne üçüncü olur. Ayrılan ön ek yine cümlenin sonunda kalır.",
        examples: [
          { de: "Wann stehst du auf?", tr: "Ne zaman kalkıyorsun?" },
          { de: "Wo kaufst du ein?", tr: "Nerede alışveriş yapıyorsun?" },
          { de: "Warum machst du das Fenster zu?", tr: "Pencereyi neden kapatıyorsun?" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich ___ jeden Tag um sechs Uhr auf.",
        options: ["stehe", "aufstehe", "stehe auf"],
        answer: 0,
        explain: "Ön ek zaten cümlenin sonunda duruyor; boşluğa yalnız çekimli fiil gelir: stehe.",
      },
      {
        text: "Wann ___ der Film an?",
        options: ["fängt", "anfängt", "fangt"],
        answer: 0,
        explain: "„anfangen“ ayrılır ve kök a → ä olur: fängt … an.",
      },
      {
        text: "___ kommst du her?",
        options: ["Woher", "Wohin", "Wo"],
        answer: 0,
        explain: "„herkommen“ kaynağı sorar; kaynak için soru kelimesi woher'dir.",
      },
      {
        kind: "gapfill",
        text: "Ich rufe dich heute Abend ___. (anrufen)",
        options: [],
        answer: 0,
        accept: ["an"],
        explain: "Ayrılan ön ek cümlenin sonuna gider: rufe … an.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ heute im Supermarkt ein. (einkaufen)",
        options: [],
        answer: 0,
        accept: ["kaufen"],
        explain: "Ön ek sonda duruyor, boşluğa çekimli kök gelir: wir kaufen … ein.",
      },
      {
        kind: "gapfill",
        text: "___ fährt der Bus ab? (Wann / Wo / Wer)",
        options: [],
        answer: 0,
        accept: ["Wann", "wann"],
        explain: "Saat soruluyorsa soru kelimesi wann'dır; fiil hemen arkasından gelir.",
      },
      {
        kind: "gapfill",
        text: "Er ___ das Fenster zu. (zumachen)",
        options: [],
        answer: 0,
        accept: ["macht"],
        explain: "„zumachen“ ayrılır: er macht … zu.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wann", "kommst", "du", "zurück"],
        explain: "Soru kelimesi başta, fiil ikinci sırada, ön ek sonda: Wann kommst du zurück?",
      },
      {
        kind: "truefalse",
        text: "„Ich aufstehe um sieben Uhr.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Ön ek fiile yapışık kalamaz; doğrusu „Ich stehe um sieben Uhr auf.“",
      },
      {
        kind: "truefalse",
        text: "„Wir bekommen morgen Besuch.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„be-“ vurgusuz bir ön ektir ve ayrılmaz; cümle doğru.",
      },
    ],
  },
];
