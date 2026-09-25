import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 20.
 *
 * B1 hücresini YİRMİYE tamamlayan son parti. Kurallar ve emsal: `de-b1.ts`
 * (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 20 alışkanlık ve kendi kendine öğrenme hattı: küçük adımlarla
 * alışkanlık kurma rehberi, kütüphaneciden radyoda okuma önerileri, sınava
 * çalışamayan bir arkadaşa mesaj. Dil bilgisi indem, ohne … zu ve statt … zu —
 * parti 5'teki um … zu yapısının üç kardeşi.
 */
export const deB1P20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r20",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Kleine Schritte statt großer Vorsätze",
    genre: "guide",
    intro: "Bir rehber yazı: yeni yıl kararları neden tutmuyor, bir psikolog yeni bir alışkanlığı nasıl kurmayı öneriyor.",
    gloss: [
      { de: "der Vorsatz", tr: "karar", en: "resolution" },
      { de: "die Gewohnheit", tr: "alışkanlık", en: "habit" },
      { de: "ersetzen", tr: "yerine koymak", en: "to replace" },
      { de: "verpassen", tr: "kaçırmak", en: "to miss" },
      { de: "aussetzen", tr: "ara vermek", en: "to skip" },
      { de: "das Häkchen", tr: "onay işareti", en: "tick" },
    ],
    minutes: 6,
    text:
      "Kleine Schritte statt großer Vorsätze\n\n" +
      "Jedes Jahr im Januar nehmen sich Millionen Menschen etwas vor, und im Februar ist das meiste schon " +
      "vergessen. Die Psychologin Dr. Lea Hartmann erklärt, woran das liegt und wie es besser geht.\n\n" +
      "Das Hauptproblem: Wir planen zu groß. Wer eine Gewohnheit ändern will, sollte nicht mit einer " +
      "Stunde Sport am Tag anfangen, sondern mit fünf Minuten. „Man baut eine Gewohnheit auf, indem man " +
      "sie so klein macht, dass man sie nicht absagen kann“, sagt Hartmann.\n\n" +
      "Zweitens hilft es, die neue Handlung an eine alte zu hängen. Wer nach dem Zähneputzen zehn Wörter " +
      "lernt, muss sich nicht extra daran erinnern.\n\n" +
      "Drittens: Statt sich etwas zu verbieten, ersetzt man es besser. Wer abends nicht mehr am Handy " +
      "sitzen will, legt ein Buch auf das Kopfkissen.\n\n" +
      "Und was ist, wenn man einen Tag verpasst? „Das ist kein Problem“, sagt Hartmann. „Gefährlich wird " +
      "es erst, wenn man zwei Tage hintereinander aussetzt. Viele geben dann ganz auf, ohne zu merken, " +
      "wie weit sie schon gekommen sind.“\n\n" +
      "Ihr letzter Tipp klingt fast zu einfach: Machen Sie jeden Abend ein Häkchen in den Kalender. " +
      "Eine lange Reihe von Häkchen motiviert mehr als jedes Versprechen.",
    questions: [
      {
        text: "Was ist laut Dr. Hartmann das Hauptproblem?",
        options: ["Wir planen zu groß.", "Wir haben zu wenig Zeit.", "Wir fangen zu spät im Jahr an."],
        answer: 0,
        explain: "„Das Hauptproblem: Wir planen zu groß.“ Bir saat yerine beş dakikayla başlamayı öneriyor.",
      },
      {
        text: "Wie baut man laut Hartmann eine Gewohnheit auf?",
        options: [
          "indem man jeden Tag eine Stunde übt",
          "indem man sie sehr klein macht",
          "indem man allen Freunden davon erzählt",
        ],
        answer: 1,
        explain: "„… indem man sie so klein macht, dass man sie nicht absagen kann“.",
      },
      {
        kind: "truefalse",
        text: "Hartmann empfiehlt, eine neue Handlung an eine alte zu hängen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Örneği: diş fırçaladıktan sonra on kelime öğrenmek; ayrıca hatırlamak gerekmiyor.",
      },
      {
        kind: "gapfill",
        text: "Nach dem Zähneputzen kann man zehn ___ lernen.",
        options: [],
        answer: 0,
        accept: ["Wörter"],
        explain: "„Wer nach dem Zähneputzen zehn Wörter lernt, muss sich nicht extra daran erinnern.“",
      },
      {
        kind: "short_answer",
        text: "Wann wird es laut Hartmann gefährlich?",
        options: [],
        answer: 0,
        accept: ["nach zwei Tagen Pause", "wenn man zwei Tage aussetzt", "zwei Tage hintereinander"],
        explain: "Tek gün sorun değil: „… erst, wenn man zwei Tage hintereinander aussetzt“.",
      },
      {
        text: "Was soll man jeden Abend machen?",
        options: [
          "zehn Seiten in einem Buch lesen",
          "fünf Minuten Sport machen",
          "ein Häkchen in den Kalender machen",
        ],
        answer: 2,
        explain: "Son öneri: her akşam takvime bir işaret; uzun bir dizi her sözden çok motive ediyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l20",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Radiotipp: Mehr lesen ohne mehr Zeit",
    genre: "monologue",
    intro: "Radyoda bir kütüphaneci üç öneri veriyor: vakti olmadığını söyleyenler nasıl daha çok okuyabilir.",
    gloss: [
      { de: "die Wartezeit", tr: "bekleme süresi", en: "waiting time" },
      { de: "nutzen", tr: "yararlanmak", en: "to make use of" },
      { de: "unhöflich", tr: "nezaketsiz", en: "impolite" },
      { de: "das Hörbuch", tr: "sesli kitap", en: "audiobook" },
      { de: "ausleihen", tr: "ödünç vermek", en: "to lend" },
      { de: "der Ausweis", tr: "üyelik kartı", en: "library card" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Vogt", text: "Guten Morgen, ich bin Karin Vogt von der Stadtbibliothek. Viele sagen mir: Ich würde gern mehr lesen, aber ich habe keine Zeit. Heute drei Ideen dagegen." },
      { speaker: "Frau Vogt", text: "Erstens: Tragen Sie immer ein Buch bei sich. Man liest nicht mehr, indem man Zeit sucht, sondern indem man kurze Wartezeiten nutzt, beim Arzt oder an der Haltestelle." },
      { speaker: "Frau Vogt", text: "Zweitens: Lesen Sie ein Buch nicht nur deshalb zu Ende, weil Sie es angefangen haben. Wenn es Sie nach fünfzig Seiten langweilt, nehmen Sie ein anderes." },
      { speaker: "Frau Vogt", text: "Das klingt unhöflich gegenüber dem Autor, ist aber der häufigste Grund, warum Menschen monatelang gar nichts lesen." },
      { speaker: "Frau Vogt", text: "Drittens: Statt abends noch schnell die Nachrichten zu lesen, lesen Sie im Bett zehn Seiten aus einem Roman. Danach schlafen die meisten auch besser." },
      { speaker: "Frau Vogt", text: "Und wer mit dem Auto zur Arbeit fährt, kann Hörbücher ausprobieren. Die Bibliothek leiht sie kostenlos aus, man braucht nur einen Ausweis." },
      { speaker: "Frau Vogt", text: "Übrigens: Ein Ausweis kostet bei uns zwölf Euro im Jahr, für Schüler nichts. Wir haben von Montag bis Samstag geöffnet." },
    ],
    questions: [
      {
        text: "Welches Problem nennen viele Leute?",
        options: [
          "Sie haben keine Zeit zum Lesen.",
          "Bücher sind ihnen zu teuer.",
          "Die Bibliothek ist zu weit weg.",
        ],
        answer: 0,
        explain: "„Ich würde gern mehr lesen, aber ich habe keine Zeit.“",
      },
      {
        text: "Was soll man tun, wenn ein Buch langweilig ist?",
        options: [
          "es trotzdem zu Ende lesen",
          "ein anderes Buch nehmen",
          "eine Woche Pause machen",
        ],
        answer: 1,
        explain: "„Wenn es Sie nach fünfzig Seiten langweilt, nehmen Sie ein anderes.“",
      },
      {
        kind: "truefalse",
        text: "Hörbücher kann man in der Bibliothek kostenlos ausleihen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Die Bibliothek leiht sie kostenlos aus, man braucht nur einen Ausweis.“",
      },
      {
        kind: "gapfill",
        text: "Frau Vogt empfiehlt, im Bett zehn ___ aus einem Roman zu lesen.",
        options: [],
        answer: 0,
        accept: ["Seiten"],
        explain: "Akşam haber okumak yerine yatakta bir romandan on sayfa.",
      },
      {
        kind: "short_answer",
        text: "Was kostet der Ausweis für Schüler?",
        options: [],
        answer: 0,
        accept: ["nichts", "gar nichts", "er ist kostenlos"],
        explain: "„Ein Ausweis kostet bei uns zwölf Euro im Jahr, für Schüler nichts.“",
      },
      {
        text: "Wann soll man laut Frau Vogt vor allem lesen?",
        options: [
          "nur am Wochenende",
          "in der Mittagspause im Büro",
          "in kurzen Wartezeiten",
        ],
        answer: 2,
        explain: "„… indem man kurze Wartezeiten nutzt, beim Arzt oder an der Haltestelle.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w20",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Antwort an Jonas: Lernen für die Theorieprüfung",
    genre: "message",
    intro: "Bir arkadaşın ehliyet sınavına çalışmayı sürekli erteliyor: önce iki cümle kur, sonra ona kendi deneyimine dayanan öneriler yaz.",
    gloss: [
      { de: "die Prüfung", tr: "sınav", en: "exam" },
      { de: "aufschieben", tr: "sonraya bırakmak", en: "to put off" },
      { de: "sich konzentrieren", tr: "odaklanmak", en: "to concentrate" },
      { de: "die Serie", tr: "dizi", en: "series" },
      { de: "schaffen", tr: "başarmak", en: "to manage" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Telefonu başka bir odaya koyarak dikkatimi topladım.",
        answer: "Ich habe mich konzentriert, indem ich das Handy in ein anderes Zimmer gelegt habe.",
        alternatives: ["Indem ich das Handy in ein anderes Zimmer gelegt habe, habe ich mich konzentriert."],
        hint: "„indem“ bir şeyin NASIL yapıldığını söyler (Türkçede „-arak“); yan cümlede çekimli fiil sona gider.",
      },
      {
        kind: "build",
        tr: "Hafta sonu her şeyi öğrenmek yerine her gün biraz çalış.",
        answer: "Lern jeden Tag ein bisschen, statt am Wochenende alles zu lernen.",
        alternatives: ["Statt am Wochenende alles zu lernen, lern jeden Tag ein bisschen."],
        hint: "„statt … zu“ yapılmayan seçeneği söyler („-mek yerine“); mastar zu ile en sonda durur.",
      },
      {
        kind: "free",
        prompt:
          "Jonas'a bir mesaj yaz: onu anladığını söyle, kendi sınav hazırlığını kısaca anlat, en az iki somut yöntem öner (indem, statt … zu, ohne … zu), bir uyarıda bulun ve cesaret ver.",
        stimulus:
          "Hey, ich muss in fünf Wochen die Theorieprüfung für den Führerschein machen und habe noch fast " +
          "nichts gelernt. Jeden Abend will ich anfangen, und dann schaue ich doch wieder eine Serie. " +
          "Wie hast du das damals geschafft? Jonas",
        checklist: [
          "Onu anladığını göster",
          "Kendi deneyimini kısaca anlat",
          "En az iki somut yöntem öner",
          "Bir uyarı yap ve cesaret ver",
        ],
        minWords: 90,
        phrases: [
          { de: "Das kenne ich nur zu gut.", tr: "Bunu çok iyi bilirim.", en: "I know that only too well." },
          { de: "Bei mir hat es funktioniert, indem …", tr: "Bende … yaparak işe yaradı.", en: "It worked for me by …" },
          { de: "Statt …, würde ich …", tr: "… yerine ben … yapardım", en: "Instead of …, I would …" },
          { de: "Versuch mal, … ohne … zu …", tr: "… olmadan … yapmayı bir dene", en: "Try to … without …" },
          { de: "Du schaffst das bestimmt!", tr: "Kesin başaracaksın!", en: "You'll definitely manage it!" },
        ],
        sample:
          "Hallo Jonas, das kenne ich nur zu gut! Vor zwei Jahren war ich genau in deiner Situation und habe " +
          "die Theorie drei Wochen lang aufgeschoben. Bei mir hat es am Ende funktioniert, indem ich jeden Tag " +
          "nach dem Abendessen zwanzig Fragen in der App gemacht habe, nicht mehr und nicht weniger. " +
          "Ich habe mich konzentriert, indem ich das Handy in ein anderes Zimmer gelegt habe; die App war " +
          "auf dem Tablet. Lern jeden Tag ein bisschen, statt am Wochenende alles zu lernen, so bleibt viel " +
          "mehr hängen. Versuch außerdem mal, die schweren Fragen laut zu erklären, ohne auf die Lösung zu " +
          "schauen. Nur eine Warnung: Mach die Probeprüfungen nicht zu früh, sonst verlierst du die Lust. " +
          "Fünf Wochen sind genug. Du schaffst das bestimmt! Liebe Grüße, Selma",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s20",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Mit sechzig noch etwas ganz Neues lernen?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: yaş ile öğrenme arasındaki ilişkiyi bir örnekle tart.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "İleri yaşta tamamen yeni bir şey — bir dil, bir enstrüman, bir spor — öğrenmek mümkün mü? Görüşünü söyle, tanıdığın birinden bir örnek ver, neyin gerçekten daha zor olduğunu kabul et ve nasıl öğrenilmesi gerektiğini öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Tanıdığın birinden bir örnek ver",
        "Neyin gerçekten daha zor olduğunu söyle",
        "Nasıl öğrenilmesi gerektiğini öner",
      ],
      targets: [
        { de: "Ich bin überzeugt, dass …", tr: "…'e inanıyorum" },
        { de: "Das beste Beispiel ist …", tr: "En iyi örnek …" },
        { de: "Zugegeben, … fällt schwerer.", tr: "Kabul etmek gerek, … daha zor oluyor." },
        { de: "Am besten lernt man, indem man …", tr: "En iyi … yaparak öğrenilir" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Ich bin überzeugt, dass man mit sechzig fast alles noch lernen kann, nur anders als mit zwanzig. " +
        "Das beste Beispiel ist meine Tante. Sie hat mit dreiundsechzig angefangen, Klavier zu spielen, " +
        "ohne vorher eine einzige Note lesen zu können. Heute, fünf Jahre später, spielt sie bei " +
        "Familienfesten kleine Stücke, und alle sind still. Zugegeben, manches fällt schwerer: Die Finger " +
        "sind langsamer, und neue Wörter vergisst man schneller. Dafür hat sie mehr Geduld als ich und übt " +
        "jeden Tag zur selben Zeit, statt auf Lust zu warten. Am besten lernt man in diesem Alter, indem man " +
        "sich kleine, feste Ziele setzt und sich nicht mit jungen Leuten vergleicht. Wer das schafft, hat am " +
        "Ende oft mehr Freude am Lernen als früher in der Schule.",
      rubricHint:
        "Kişisel bir örnek ve bir öneri beklenir; „indem“, „ohne … zu“ ve „statt … zu“ yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g20",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "indem, ohne … zu, statt … zu",
    genre: "grammar",
    intro: "Bir şeyi NASIL yaptığını, neyi YAPMADAN yaptığını ya da neyin YERİNE yaptığını üç yapıyla söylersin.",
    focus: "indem (-arak), ohne … zu (-meden), statt … zu (-mek yerine)",
    gloss: [
      { de: "sparen", tr: "biriktirmek", en: "to save" },
      { de: "das Wörterbuch", tr: "sözlük", en: "dictionary" },
      { de: "verlassen", tr: "çıkmak", en: "to leave" },
      { de: "üben", tr: "alıştırma yapmak", en: "to practise" },
      { de: "fragen", tr: "sormak", en: "to ask" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Nasıl? indem",
        tr: "„indem“ bir sonuca hangi yolla ulaşıldığını söyler; Türkçedeki „-arak, -erek“ ekinin karşılığıdır. Yan cümle bağlacıdır: çekimli fiil sona gider. „Wie …?“ sorusunun cevabı çoğu zaman „indem“ ile gelir.",
        examples: [
          { de: "Ich lerne Wörter, indem ich sie laut sage.", tr: "Kelimeleri yüksek sesle söyleyerek öğreniyorum.", note: "sage sonda" },
          { de: "Wir sparen Geld, indem wir selbst kochen.", tr: "Kendimiz yemek yaparak para biriktiriyoruz.", note: "yol → indem" },
          { de: "Wie hast du so gut Deutsch gelernt? — Indem ich jeden Tag geübt habe.", tr: "Almancayı nasıl bu kadar iyi öğrendin? — Her gün alıştırma yaparak.", note: "Wie? → indem" },
        ],
      },
      {
        heading: "Yapmadan: ohne … zu",
        tr: "„ohne … zu + mastar“ beklenen bir şeyin OLMADIĞINI söyler: Türkçedeki „-meden, -madan“. Mastar zu ile en sona gider; ayrılabilen fiillerde zu araya girer: „ohne anzurufen“. İki cümlenin öznesi aynı olmalıdır.",
        examples: [
          { de: "Er ist gegangen, ohne sich zu verabschieden.", tr: "Vedalaşmadan gitti.", note: "ohne … zu" },
          { de: "Sie hat das Formular ausgefüllt, ohne das Wörterbuch zu benutzen.", tr: "Formu sözlük kullanmadan doldurdu.", note: "mastar sonda" },
          { de: "Er hat das Haus verlassen, ohne anzurufen.", tr: "Aramadan evden çıktı.", note: "an + zu + rufen" },
        ],
      },
      {
        heading: "Yerine: statt … zu",
        tr: "„statt … zu + mastar“ (ya da „anstatt … zu“) yapılmayan seçeneği söyler: „-mek yerine“. Yapısı „ohne … zu“ ile aynıdır: bağlaç başta, mastar zu ile sonda, iki cümlede aynı özne.",
        examples: [
          { de: "Statt zu fragen, hat er einfach angefangen.", tr: "Sormak yerine hemen başladı.", note: "statt zu + mastar" },
          { de: "Wir sollten mehr üben, statt nur Regeln zu lernen.", tr: "Yalnızca kural öğrenmek yerine daha çok alıştırma yapmalıyız.", note: "mastar sonda" },
          { de: "Statt fernzusehen, lese ich abends.", tr: "Akşamları televizyon izlemek yerine okuyorum.", note: "fern + zu + sehen" },
        ],
      },
    ],
    questions: [
      {
        text: "Wir sparen Geld, ___ wir selbst kochen.",
        options: ["indem", "ohne", "statt"],
        answer: 0,
        explain: "Para biriktirmenin YOLU anlatılıyor ve fiil sonda: indem.",
      },
      {
        text: "Er ist gegangen, ohne sich zu ___.",
        options: ["verabschiedet", "verabschieden", "verabschiedet hat"],
        answer: 1,
        explain: "„ohne … zu“dan sonra çekimsiz mastar gelir: zu verabschieden.",
      },
      {
        text: "Welcher Satz bedeutet „Sormak yerine hemen başladı.“?",
        options: [
          "Er hat gefragt, statt anzufangen.",
          "Ohne zu fragen, hat er nicht angefangen.",
          "Statt zu fragen, hat er einfach angefangen.",
        ],
        answer: 2,
        explain: "Yapılmayan şey sormak: „statt zu fragen“; yapılan şey başlamak.",
      },
      {
        kind: "gapfill",
        text: "Ich lerne Wörter, ___ ich sie laut sage. (Mittel: so lerne ich)",
        options: [],
        answer: 0,
        accept: ["indem"],
        explain: "Öğrenmenin yolu: indem; fiil (sage) sonda.",
      },
      {
        kind: "gapfill",
        text: "Er hat das Haus verlassen, ohne ___. (anrufen)",
        options: [],
        answer: 0,
        accept: ["anzurufen"],
        explain: "Ayrılabilen fiilde zu araya girer: an-zu-rufen.",
      },
      {
        kind: "gapfill",
        text: "___ fernzusehen, lese ich abends. (das eine nicht, das andere schon)",
        options: [],
        answer: 0,
        accept: ["Statt", "Anstatt", "statt", "anstatt"],
        explain: "Yapılmayan seçenek: statt (ya da anstatt) … zu.",
      },
      {
        kind: "gapfill",
        text: "Sie hat das Formular ausgefüllt, ohne das Wörterbuch zu ___. (benutzen)",
        options: [],
        answer: 0,
        accept: ["benutzen"],
        explain: "„ohne … zu“ yapısında mastar zu'dan sonra en sonda.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wir", "sollten", "mehr üben", "statt", "nur Regeln zu lernen"],
        explain: "Ana cümle önce, ardından „statt“ ve sonda zu + mastar: statt nur Regeln zu lernen.",
      },
      {
        kind: "truefalse",
        text: "„Er hat gegessen, ohne etwas zu sagen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Özne aynı, „ohne“ ile zu + mastar sonda: yapı doğru.",
      },
      {
        kind: "truefalse",
        text: "„Ich lerne, indem ich höre Podcasts.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„indem“ yan cümle kurar, fiil sona gider: „…, indem ich Podcasts höre.“",
      },
    ],
  },
];
