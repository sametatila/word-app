import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 1 — "İş dünyası" (immersion tema-hizalı içerik).
 *
 * Ünitenin dört dersi: Das Vorstellungsgespräch · Der Lebenslauf ·
 * Stärken und Schwächen · Warum gerade Sie?
 *
 * İzin verilen küme A1'den farklı çalışıyor: B1 öğrencisi A1 ile A2'nin
 * TAMAMINI bilir, o yüzden buradaki sınır "A1 + A2 + bu ünitenin 32 B1
 * kelimesi". `npm run check:unitvocab -- b1` bunu ölçüyor.
 *
 * Ünitenin B1 kelimeleri: sich bewerben, die Stärke, der Lebenslauf,
 * die Erfahrung, die Voraussetzung, die Fähigkeit, verantwortlich,
 * die Gelegenheit, der Abschluss, zuständig, die Ausbildung, die Karriere,
 * die Abteilung, beruflich, die Qualifikation, die Leistung, die Schwäche,
 * obwohl, sich verbessern, die Geduld, ehrlich, ordentlich, kreativ, stolz,
 * überzeugen, die Motivation, die Herausforderung, entwickeln,
 * die Zusammenarbeit, begeistert, bereit, der Erfolg.
 * Kalıplar: weil · seit + Dativ · Präteritum · obwohl · um … zu.
 *
 * Yerleşim: dizinin BAŞINDA spread edilir — builder ünite slotlarını konuma
 * göre dolduruyor.
 */
export const b1U01: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u1-r1",
    level: "B1",
    skill: "reading",
    unit: 1,
    title: "Die Stellenanzeige",
    genre: "İş ilanı",
    intro: "Bir iş ilanı ve altında adayın kendi notu. İlanın ne istediğini ve adayın neyi karşıladığını oku.",
    minutes: 5,
    gloss: [
      { de: "die Voraussetzung", tr: "ön koşul", en: "requirement" },
      { de: "abgeschlossen", tr: "tamamlanmış", en: "completed" },
      { de: "die Qualifikation", tr: "nitelik", en: "qualification" },
      { de: "die Abteilung", tr: "departman", en: "department" },
      { de: "zuständig", tr: "sorumlu / yetkili", en: "responsible for" },
      { de: "die Zusammenarbeit", tr: "iş birliği", en: "cooperation" },
    ],
    text:
      "Wir suchen eine Kollegin oder einen Kollegen für unsere kleine Abteilung im Zentrum von Bremen. " +
      "Sie sind zuständig für die Kunden am Telefon und für die Zusammenarbeit mit dem Lager. " +
      "Voraussetzung ist eine abgeschlossene Ausbildung und mindestens zwei Jahre Erfahrung im Büro. " +
      "Gute Deutschkenntnisse sind wichtig, weil Sie jeden Tag mit Kunden sprechen. " +
      "Wir bieten eine feste Stelle, dreißig Tage Urlaub und die Gelegenheit, sich beruflich zu entwickeln.\n\n" +
      "Notiz von Yasemin: Ich arbeite seit vier Jahren im Büro, also habe ich genug Erfahrung. " +
      "Meinen Abschluss habe ich in der Türkei gemacht, aber das war kein Problem. " +
      "Meine Qualifikation passt gut, obwohl ich noch nie im Lager gearbeitet habe. " +
      "Am Telefon bin ich ruhig und geduldig, das ist meine Stärke. " +
      "Meine Schwäche ist der Computer, aber ich lerne gerade und ich will mich verbessern. " +
      "Ich bewerbe mich morgen, weil die Stelle wirklich zu mir passt.",
    questions: [
      {
        text: "Für welche Aufgaben ist die neue Kollegin zuständig?",
        options: ["Für die Kunden und das Lager", "Nur für den Computer", "Für die Ausbildung"],
        answer: 0,
        explain: "„Sie sind zuständig für die Kunden am Telefon und für die Zusammenarbeit mit dem Lager.“",
      },
      {
        text: "Welche Voraussetzung nennt die Anzeige?",
        options: ["Ein Studium", "Eine abgeschlossene Ausbildung", "Erfahrung im Lager"],
        answer: 1,
        explain: "„Voraussetzung ist eine abgeschlossene Ausbildung und mindestens zwei Jahre Erfahrung im Büro.“",
      },
      {
        text: "Warum passt Yasemins Erfahrung?",
        options: ["Weil sie im Lager gearbeitet hat", "Weil sie seit vier Jahren im Büro arbeitet", "Weil sie den Computer gut kennt"],
        answer: 1,
        explain: "„Ich arbeite seit vier Jahren im Büro, also habe ich genug Erfahrung.“ — seit + Dativ.",
      },
      {
        text: "Was sagt Yasemin über ihre Schwäche?",
        options: ["Sie hat keine Schwäche", "Der Computer, aber sie lernt gerade", "Das Telefon"],
        answer: 1,
        explain: "„Meine Schwäche ist der Computer, aber ich lerne gerade und ich will mich verbessern.“",
      },
      {
        kind: "gapfill",
        text: "Yasemin bewirbt sich, ___ die Stelle zu ihr passt.",
        options: [],
        answer: 0,
        accept: ["weil"],
        explain: "Gerekçe bağlacı: „weil“. Yan cümlede fiil sona gider.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Tage Urlaub bietet die Firma?",
        options: [],
        answer: 0,
        accept: ["dreißig Tage", "dreißig", "30 Tage", "30"],
        explain: "„… eine feste Stelle, dreißig Tage Urlaub …“",
      },
    ],
  },
  {
    id: "b1-u1-r2",
    level: "B1",
    skill: "reading",
    unit: 1,
    title: "Zwei Lebensläufe",
    genre: "Özgeçmiş",
    intro: "İki kısa özgeçmiş. Yazı dilinin geçmiş zamanına dikkat et: arbeitete, wechselte, machte.",
    minutes: 5,
    gloss: [
      { de: "die Leistung", tr: "performans", en: "performance" },
      { de: "der Abschluss", tr: "diploma / mezuniyet", en: "degree" },
      { de: "die Karriere", tr: "kariyer", en: "career" },
      { de: "die Leistung", tr: "performans", en: "performance" },
      { de: "die Herausforderung", tr: "zorlu görev", en: "challenge" },
    ],
    text:
      "Markus Bauer wurde 1990 in Kassel geboren. Nach der Schule machte er eine Ausbildung als Koch. " +
      "Danach arbeitete er fünf Jahre in einem Hotel in Hamburg. 2018 wechselte er in eine kleine Firma " +
      "und war dort für den Einkauf zuständig. Seine Leistung war gut, aber er suchte eine neue " +
      "Herausforderung. Deshalb bewarb er sich 2024 bei einer größeren Firma. Heute arbeitet er mit " +
      "vier Personen zusammen und ist stolz auf seine Karriere.\n\n" +
      "Leyla Kaya kam 2016 nach Deutschland. Ihren Abschluss machte sie in Izmir, aber der Weg " +
      "zur ersten Stelle war lang. Das dauerte fast zwei Jahre und brauchte viel Geduld. Danach arbeitete " +
      "sie zuerst in einem Laden, obwohl das nicht ihr Beruf war. Seit 2021 ist sie in einer Abteilung " +
      "für Kunden und entwickelt dort neue Ideen. Ihre Kollegen sagen, sie sei kreativ und ordentlich. " +
      "Sie will sich beruflich weiter verbessern und lernt abends noch Englisch.",
    questions: [
      {
        text: "Was machte Markus nach der Schule?",
        options: ["Eine Ausbildung als Koch", "Ein Studium", "Er arbeitete im Einkauf"],
        answer: 0,
        explain: "„Nach der Schule machte er eine Ausbildung als Koch.“",
      },
      {
        text: "Warum bewarb sich Markus 2024?",
        options: ["Weil seine Leistung schlecht war", "Weil er eine neue Herausforderung suchte", "Weil die Firma zumachte"],
        answer: 1,
        explain: "„Seine Leistung war gut, aber er suchte eine neue Herausforderung.“",
      },
      {
        text: "Wie lange dauerte Leylas Weg zur ersten Stelle?",
        options: ["Zwei Monate", "Fast zwei Jahre", "Fünf Jahre"],
        answer: 1,
        explain: "„Das dauerte fast zwei Jahre und brauchte viel Geduld.“",
      },
      {
        text: "Was sagen Leylas Kollegen über sie?",
        options: ["Sie sei kreativ und ordentlich", "Sie sei müde", "Sie sei neu"],
        answer: 0,
        explain: "„Ihre Kollegen sagen, sie sei kreativ und ordentlich.“",
      },
      {
        kind: "gapfill",
        text: "Leyla arbeitete zuerst in einem Laden, ___ das nicht ihr Beruf war.",
        options: [],
        answer: 0,
        accept: ["obwohl"],
        explain: "Çekince bağlacı: „obwohl“. Beklentiye aykırı durumu bildirir.",
      },
      {
        kind: "short_answer",
        text: "In welcher Stadt wurde Markus geboren?",
        options: [],
        answer: 0,
        accept: ["in Kassel", "Kassel"],
        explain: "„Markus Bauer wurde 1990 in Kassel geboren.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u1-l1",
    level: "B1",
    skill: "listening",
    unit: 1,
    title: "Das Telefoninterview",
    genre: "Telefon görüşmesi",
    intro: "Bir firma adayı telefonla arıyor. Dinle: aday ne kadar deneyimli, neden başvurdu, ne zaman başlayabilir?",
    minutes: 4,
    gloss: [
      { de: "sich bewerben", tr: "başvurmak", en: "to apply" },
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
      { de: "die Motivation", tr: "motivasyon", en: "motivation" },
      { de: "bereit", tr: "hazır", en: "ready" },
    ],
    segments: [
      { text: "Guten Tag, Frau Demir. Sie haben sich bei uns beworben. Haben Sie kurz Zeit?" },
      { text: "Ja, natürlich. Ich freue mich, dass Sie anrufen." },
      { text: "Sie arbeiten seit drei Jahren im Verkauf. Warum wollen Sie wechseln?" },
      { text: "Ich möchte mich beruflich entwickeln. Bei Ihnen sehe ich eine gute Gelegenheit." },
      { text: "Was ist Ihre größte Stärke?" },
      { text: "Ich habe viel Geduld mit Kunden, auch wenn es schwierig wird." },
      { text: "Und wann könnten Sie anfangen?" },
      { text: "Ab dem ersten Mai bin ich bereit." },
    ],
    questions: [
      {
        text: "Wie lange arbeitet Frau Demir schon im Verkauf?",
        options: ["Seit einem Jahr", "Seit drei Jahren", "Seit fünf Jahren"],
        answer: 1,
        explain: "„Sie arbeiten seit drei Jahren im Verkauf.“ — seit + Dativ.",
      },
      {
        text: "Warum will sie wechseln?",
        options: ["Sie verdient zu wenig", "Sie möchte sich beruflich entwickeln", "Der Weg ist zu weit"],
        answer: 1,
        explain: "„Ich möchte mich beruflich entwickeln.“",
      },
      {
        text: "Was nennt sie als ihre Stärke?",
        options: ["Geduld mit Kunden", "Schnelles Arbeiten", "Gute Computerkenntnisse"],
        answer: 0,
        explain: "„Ich habe viel Geduld mit Kunden.“",
      },
      {
        kind: "gapfill",
        text: "Frau Demir ist ab dem ersten ___ bereit.",
        options: [],
        answer: 0,
        accept: ["Mai"],
        explain: "„Ab dem ersten Mai bin ich bereit.“",
      },
      {
        kind: "gapfill",
        text: "Bei Ihnen sehe ich eine gute ___.",
        options: [],
        answer: 0,
        accept: ["Gelegenheit"],
        explain: "„Bei Ihnen sehe ich eine gute Gelegenheit.“",
      },
    ],
  },
  {
    id: "b1-u1-l2",
    level: "B1",
    skill: "listening",
    unit: 1,
    title: "Nach dem Gespräch",
    genre: "Sohbet",
    intro: "İki arkadaş görüşmeden sonra konuşuyor. Dinle: görüşme nasıl geçti, hangi soru zor geldi?",
    minutes: 4,
    gloss: [
      { de: "die Schwäche", tr: "zayıf yön", en: "weakness" },
      { de: "ehrlich", tr: "dürüst", en: "honest" },
      { de: "überzeugen", tr: "ikna etmek", en: "to convince" },
      { de: "der Erfolg", tr: "başarı", en: "success" },
    ],
    segments: [
      { text: "Und? Wie war das Vorstellungsgespräch?" },
      { text: "Ganz gut, glaube ich. Aber eine Frage war schwierig." },
      { text: "Welche denn?" },
      { text: "Sie haben nach meiner Schwäche gefragt." },
      { text: "Und was hast du gesagt?" },
      { text: "Ich war ehrlich. Ich sagte, dass ich manchmal zu langsam bin, obwohl ich ordentlich arbeite." },
      { text: "Das war gut. Ehrlichkeit überzeugt mehr als eine schöne Antwort." },
      { text: "Hoffentlich. In zwei Wochen weiß ich, ob es ein Erfolg war." },
    ],
    questions: [
      {
        text: "Welche Frage war schwierig?",
        options: ["Die Frage nach dem Gehalt", "Die Frage nach der Schwäche", "Die Frage nach der Ausbildung"],
        answer: 1,
        explain: "„Sie haben nach meiner Schwäche gefragt.“",
      },
      {
        text: "Was antwortete er auf die schwierige Frage?",
        options: ["Dass er keine Schwäche hat", "Dass er manchmal zu langsam ist", "Dass er nicht ordentlich ist"],
        answer: 1,
        explain: "„Ich sagte, dass ich manchmal zu langsam bin, obwohl ich ordentlich arbeite.“",
      },
      {
        text: "Was findet die Freundin gut?",
        options: ["Dass er ehrlich war", "Dass er schnell geantwortet hat", "Dass er nichts gesagt hat"],
        answer: 0,
        explain: "„Das war gut. Ehrlichkeit überzeugt mehr als eine schöne Antwort.“",
      },
      {
        kind: "gapfill",
        text: "In zwei ___ weiß er, ob es ein Erfolg war.",
        options: [],
        answer: 0,
        accept: ["Wochen"],
        explain: "„In zwei Wochen weiß ich, ob es ein Erfolg war.“",
      },
      {
        kind: "short_answer",
        text: "Wann weiß er, ob es ein Erfolg war?",
        options: [],
        answer: 0,
        accept: ["in zwei Wochen", "zwei Wochen"],
        explain: "„In zwei Wochen weiß ich, ob es ein Erfolg war.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u1-w1",
    level: "B1",
    skill: "writing",
    unit: 1,
    title: "Stärken und Schwächen",
    genre: "Görüşme hazırlığı",
    intro: "Görüşmenin en zor sorusuna hazırlan. Önce cümle kur, sonra hazırlık kartını doldur.",
    minutes: 8,
    gloss: [
      { de: "die Stärke", tr: "güçlü yön", en: "strength" },
      { de: "die Schwäche", tr: "zayıf yön", en: "weakness" },
      { de: "sich verbessern", tr: "kendini geliştirmek", en: "to improve" },
      { de: "die Geduld", tr: "sabır", en: "patience" },
      { de: "verantwortlich", tr: "sorumlu", en: "responsible" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "En güçlü yönüm sabırlı olmam.",
        answer: "Meine größte Stärke ist meine Geduld.",
        hint: "En üstün derece belirli artikelle değil, sıfat çekimiyle: „meine größte Stärke“.",
      },
      {
        kind: "build",
        tr: "Yavaş olsam da çok düzenli çalışıyorum.",
        answer: "Obwohl ich langsam bin, arbeite ich sehr ordentlich.",
        alternatives: ["Ich arbeite sehr ordentlich, obwohl ich langsam bin."],
        hint: "Çekince bağlacı sona atar; yan cümle başta olursa ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Kendimi geliştirmek için bir kurs alıyorum.",
        answer: "Ich mache einen Kurs, um mich zu verbessern.",
        alternatives: ["Um mich zu verbessern, mache ich einen Kurs."],
        hint: "Amaç kalıbı „um … zu“; dönüşlü zamir mastardan önce.",
      },
      {
        kind: "form",
        prompt: "Görüşme hazırlık kartını doldur.",
        facts: "Aday: iki güçlü yön (sabır, düzenli çalışma), bir zayıf yön (bilgisayar), zayıf yön için bir plan (akşam kursu).",
        fields: [
          { label: "Stärke 1", answer: "Geduld", accept: ["die Geduld", "meine Geduld"] },
          { label: "Stärke 2", answer: "ordentlich", accept: ["ordentlich arbeiten", "Ordnung"] },
          { label: "Schwäche", answer: "Computer", accept: ["der Computer", "Computerkenntnisse"] },
          { label: "Plan", answer: "ein Kurs am Abend", accept: ["Kurs", "ein Kurs", "Abendkurs"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi doğru sırayla yeniden yaz.",
        source: "Obwohl ich bin manchmal langsam, ich arbeite sehr ordentlich.",
        answer: "Obwohl ich manchmal langsam bin, arbeite ich sehr ordentlich.",
        why: "Türkçede '-e rağmen' fiilin yerini değiştirmez. Almancada obwohl yan cümle kurar: çekimli fiil (bin) sona gider. Yan cümle önde olduğu için ana cümle de fiille başlar (arbeite ich).",
      },
    ],
  },
  {
    id: "b1-u1-w2",
    level: "B1",
    skill: "writing",
    unit: 1,
    title: "Warum gerade Sie?",
    genre: "Ön yazı",
    intro: "Bir başvuru ön yazısı yaz. Önce iki cümle kur, sonra kısa bir mektup.",
    minutes: 12,
    gloss: [
      { de: "sich bewerben", tr: "başvurmak", en: "to apply" },
      { de: "die Motivation", tr: "motivasyon", en: "motivation" },
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
      { de: "die Herausforderung", tr: "zorlu görev", en: "challenge" },
      { de: "begeistert", tr: "hevesli", en: "enthusiastic" },
      { de: "abgeschlossen", tr: "tamamlanmış", en: "completed" },
      { de: "Mit freundlichen Grüßen", tr: "Saygılarımla", en: "Kind regards" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Deneyimimi kullanabilmek için bu pozisyona başvuruyorum.",
        answer: "Ich bewerbe mich auf diese Stelle, um meine Erfahrung zu zeigen.",
        alternatives: ["Um meine Erfahrung zu zeigen, bewerbe ich mich auf diese Stelle."],
        hint: "Amaç kalıbı „um … zu“; dönüşlü fiilin zamiri özneden hemen sonra.",
      },
      {
        kind: "build",
        tr: "Üç yıldır bu alanda çalışıyorum.",
        answer: "Ich arbeite seit drei Jahren in diesem Bereich.",
        hint: "„seit“ + Dativ; Almancada şimdiki zaman kullanılır, geçmiş değil.",
      },
      {
        kind: "free",
        prompt: "Bir firmadaki açık pozisyona ön yazı yaz. Kendini tanıt, hangi deneyime sahip olduğunu söyle, neden bu işi istediğini gerekçelendir ve bir görüşme talep et.",
        checklist: [
          "Resmî hitap (Sehr geehrte Damen und Herren) ve kapanış (Mit freundlichen Grüßen) var mı?",
          "Deneyimini „seit + Dativ“ ile söyledin mi?",
          "Başvuru gerekçeni „weil“ ya da „um … zu“ ile verdin mi?",
          "Bir güçlü yönünü somut bir örnekle bağladın mı?",
          "Sonunda bir görüşme talep ettin mi?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich bewerbe mich auf die Stelle in Ihrer Abteilung, weil sie sehr gut zu meiner " +
          "Erfahrung passt. Seit drei Jahren arbeite ich im Büro und bin dort für die Kunden " +
          "zuständig. Meine Ausbildung habe ich 2019 abgeschlossen.\n\n" +
          "Meine größte Stärke ist meine Geduld: auch wenn ein Kunde laut wird, bleibe ich " +
          "ruhig und suche eine Lösung. Obwohl ich mit dem Computer noch nicht schnell bin, " +
          "lerne ich gerade und will mich verbessern.\n\n" +
          "Ich bewerbe mich bei Ihnen, um mich beruflich zu entwickeln. Die Zusammenarbeit in " +
          "einem kleinen Team ist für mich eine schöne Herausforderung.\n\n" +
          "Über ein Gespräch würde ich mich sehr freuen.\n\n" +
          "Mit freundlichen Grüßen\nLeyla Kaya",
        phrases: [
          { de: "Ich bewerbe mich auf die Stelle als …", tr: "… pozisyonuna başvuruyorum", en: "I am applying for the position as …" },
          { de: "Seit … arbeite ich …", tr: "…'den beri … çalışıyorum", en: "I have been working … since …" },
          { de: "Ich bin begeistert von …", tr: "… beni heyecanlandırıyor", en: "I am enthusiastic about …" },
          { de: "Über ein Gespräch würde ich mich sehr freuen.", tr: "Bir görüşmeye çok sevinirim.", en: "I would be delighted about an interview." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Fiilin edatını düzelt.",
        source: "Ich bewerbe mich für die Stelle in Ihrer Abteilung.",
        answer: "Ich bewerbe mich um die Stelle in Ihrer Abteilung.",
        why: "Türkçedeki 'için' doğrudan 'für' olmuyor: sich bewerben fiili 'um' edatını ister (bir firmaya başvururken 'bei').",
      },
    ],
  },
];
