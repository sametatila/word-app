import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 6 — "Amaç ve anı" (dersler 21–24).
 *
 * Dersler: damit · um … zu · obwohl · als/wenn.
 *
 * Ünitenin tamamı iki AYRIM üzerine kurulu ve ikisi de Türkçede tek kalıpla
 * karşılandığı için Türkçe konuşanın doğal kör noktası:
 *   damit ↔ um…zu  — Türkçe "-mek/-mesi için" ikisini de karşılar; Almanca
 *                     özne aynı mı farklı mı diye ayırır.
 *   als ↔ wenn     — Türkçe "-diğinde" tek seferlik ile tekrarlananı ayırmaz;
 *                     Almanca geçmişte tek olay için als, tekrar için wenn.
 * Bu yüzden okuma/dinleme çiftleri kutupları ayrı ayrı çalıştırıyor
 * (r1+l1 amaç, r2+l2 anı) ve iki rewrite görevi tam bu iki ayrımı hedefliyor.
 *
 * Yeni 32 kelime: rechtzeitig, sich erholen, damit, der Zweck, unterstützen,
 * dafür, gelingen, eigentlich, das Wissen, erwarten, ständig, bisher, kaum,
 * perfekt, nämlich, der Zufall, die Erkältung, jedoch, allerdings,
 * unglaublich, ernst, wohl, überhaupt, bloß, die Kindheit, jedes Mal,
 * die Erinnerung, das Erlebnis, der Augenblick, irgendwann, damals, der Held.
 */
export const b1U06: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u6-r1",
    level: "B1",
    skill: "reading",
    unit: 6,
    title: "Warum machen Sie den Kurs?",
    genre: "Kurs bilgisi ve not",
    intro: "Bir kurs duyurusu ve bir katılımcının notu. Her cümlede amacın kime ait olduğuna dikkat et.",
    minutes: 5,
    gloss: [
      { de: "der Zweck", tr: "amaç", en: "purpose" },
      { de: "damit", tr: "… diye / -mesi için", en: "so that" },
      { de: "unterstützen", tr: "desteklemek", en: "to support" },
      { de: "rechtzeitig", tr: "zamanında", en: "on time" },
      { de: "gelingen", tr: "başarılı olmak", en: "to succeed" },
    ],
    text:
      "Der Kurs „Deutsch im Büro“ beginnt im Oktober. Der Zweck ist einfach: Sie sollen bei " +
      "der Arbeit sicher sprechen können.\n\n" +
      "Viele kommen zu uns, um sich beruflich zu verbessern. Andere lernen, damit ihre Kinder " +
      "in der Schule Hilfe bekommen. Beides ist richtig. Wichtig ist bloß, dass Sie sich " +
      "rechtzeitig melden, denn die Plätze sind schnell weg.\n\n" +
      "Wir unterstützen Sie auch nach dem Kurs. Wer bisher kaum geschrieben hat, bekommt " +
      "zusätzlich eine Stunde pro Woche. Sie müssen nicht perfekt sein. Sie müssen " +
      "überhaupt erst einmal anfangen.\n\n" +
      "Notiz von Emre: Ich arbeite ständig mit Kunden und mein Wissen reicht eigentlich, " +
      "aber am Telefon werde ich unsicher. Ich mache den Kurs, damit meine Kollegin mir " +
      "nicht jedes Mal helfen muss. Wenn das gelingt, bin ich zufrieden.",
    questions: [
      {
        text: "Was ist der Zweck des Kurses?",
        options: ["Bei der Arbeit sicher sprechen", "Einen Abschluss machen", "Englisch lernen"],
        answer: 0,
        explain: "„Der Zweck ist einfach: Sie sollen bei der Arbeit sicher sprechen können.“",
      },
      {
        text: "Warum lernen manche Teilnehmer?",
        options: ["Damit die Kinder Hilfe bekommen", "Weil der Kurs billig ist", "Um zu reisen"],
        answer: 0,
        explain: "„Andere lernen, damit ihre Kinder in der Schule Hilfe bekommen.“",
      },
      {
        text: "Was bekommt jemand, der bisher kaum geschrieben hat?",
        options: ["Einen zweiten Kurs", "Eine Stunde pro Woche zusätzlich", "Ein Buch"],
        answer: 1,
        explain: "„Wer bisher kaum geschrieben hat, bekommt zusätzlich eine Stunde pro Woche.“",
      },
      {
        kind: "gapfill",
        text: "Ich mache den Kurs, ___ meine Kollegin mir nicht jedes Mal helfen muss.",
        options: [],
        answer: 0,
        accept: ["damit"],
        explain: "İki ayrı özne var (ich · meine Kollegin), o yüzden „damit“.",
      },
      {
        kind: "short_answer",
        text: "In welchem Monat beginnt der Kurs?",
        options: [],
        answer: 0,
        accept: ["im Oktober", "Oktober"],
        explain: "„Der Kurs „Deutsch im Büro“ beginnt im Oktober.“",
      },
    ],
  },
  {
    id: "b1-u6-r2",
    level: "B1",
    skill: "reading",
    unit: 6,
    title: "Meine Kindheit",
    genre: "Anı yazısı",
    intro: "Bir çocukluk anısı. Hangi olay bir kez oldu, hangisi her yaz tekrarlandı?",
    minutes: 5,
    gloss: [
      { de: "die Kindheit", tr: "çocukluk", en: "childhood" },
      { de: "die Erinnerung", tr: "anı", en: "memory" },
      { de: "das Erlebnis", tr: "yaşantı", en: "experience" },
      { de: "der Augenblick", tr: "an", en: "moment" },
      { de: "der Held", tr: "kahraman", en: "hero" },
    ],
    text:
      "Meine Kindheit war laut und voll. Wir wohnten damals in einem kleinen Haus mit " +
      "einem Garten.\n\n" +
      "Jedes Mal, wenn im Sommer die Ferien anfingen, fuhren wir zu meiner Großmutter. " +
      "Wenn wir ankamen, stand sie schon vor der Tür. Das ist eine Erinnerung, die ich " +
      "nie verliere.\n\n" +
      "Ein Erlebnis war anders. Als ich acht war, fiel ich vom Fahrrad und konnte nicht " +
      "mehr laufen. Mein Bruder trug mich den ganzen Weg nach Hause. In diesem Augenblick " +
      "war er für mich ein Held. Später lachten wir oft darüber.\n\n" +
      "Irgendwann zogen wir in die Stadt und alles wurde ruhiger. Unglaublich, wie schnell " +
      "das ging. Ich denke jedoch gern zurück.",
    questions: [
      {
        text: "Wohin fuhr die Familie in den Ferien?",
        options: ["Ans Meer", "Zur Großmutter", "In die Stadt"],
        answer: 1,
        explain: "„… fuhren wir zu meiner Großmutter.“",
      },
      {
        text: "Was passierte, als der Erzähler acht war?",
        options: ["Er fiel vom Fahrrad", "Er zog um", "Er bekam ein Fahrrad"],
        answer: 0,
        explain: "„Als ich acht war, fiel ich vom Fahrrad …“",
      },
      {
        text: "Warum war der Bruder ein Held?",
        options: ["Er kaufte ein Fahrrad", "Er trug ihn nach Hause", "Er rief den Arzt"],
        answer: 1,
        explain: "„Mein Bruder trug mich den ganzen Weg nach Hause.“",
      },
      {
        kind: "gapfill",
        text: "___ ich acht war, fiel ich vom Fahrrad.",
        options: [],
        answer: 0,
        accept: ["Als"],
        explain: "Geçmişte TEK KEZ olan olay: „Als“. Tekrarlanan için „wenn“ olurdu.",
      },
      {
        kind: "short_answer",
        text: "Wer stand schon vor der Tür, wenn die Familie ankam?",
        options: [],
        answer: 0,
        accept: ["die Großmutter", "meine Großmutter", "Großmutter"],
        explain: "„Wenn wir ankamen, stand sie schon vor der Tür.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u6-l1",
    level: "B1",
    skill: "listening",
    unit: 6,
    title: "Damit du früher gehen kannst",
    genre: "İş yerinde konuşma",
    intro: "İki meslektaş işi paylaşıyor. Her yardımın amacı kim için, dinle.",
    minutes: 4,
    gloss: [
      { de: "sich erholen", tr: "dinlenmek", en: "to recover" },
      { de: "rechtzeitig", tr: "zamanında", en: "on time" },
      { de: "dafür", tr: "bunun karşılığında", en: "in return" },
      { de: "gelingen", tr: "başarılı olmak", en: "to succeed" },
    ],
    segments: [
      { text: "Du siehst müde aus. Willst du dich nicht mal erholen?" },
      { text: "Ich kann nicht. Die Arbeit muss rechtzeitig fertig sein." },
      { text: "Gib mir einen Teil davon, damit du heute früher gehen kannst." },
      { text: "Wirklich? Das würde mir sehr helfen." },
      { text: "Klar. Dafür bist du nächste Woche dran." },
      { text: "Einverstanden. Ich schicke dir die Zahlen, damit du sofort anfangen kannst." },
      { text: "Gut. Und ruf den Kunden an, um den Termin zu ändern." },
      { text: "Mache ich. Wenn das gelingt, sind wir am Freitag fertig." },
    ],
    questions: [
      {
        text: "Warum will die erste Person einen Teil übernehmen?",
        options: ["Damit die andere früher gehen kann", "Weil sie Zeit hat", "Weil sie mehr verdient"],
        answer: 0,
        explain: "„Gib mir einen Teil davon, damit du heute früher gehen kannst.“",
      },
      {
        text: "Was ist die Gegenleistung?",
        options: ["Ein Essen", "Nächste Woche ist die andere dran", "Nichts"],
        answer: 1,
        explain: "„Dafür bist du nächste Woche dran.“",
      },
      {
        text: "Warum soll der Kunde angerufen werden?",
        options: ["Um zu bezahlen", "Um den Termin zu ändern", "Um sich zu beschweren"],
        answer: 1,
        explain: "„Und ruf den Kunden an, um den Termin zu ändern.“",
      },
      {
        kind: "gapfill",
        text: "Ich schicke dir die Zahlen, ___ du sofort anfangen kannst.",
        options: [],
        answer: 0,
        accept: ["damit"],
        explain: "Özneler farklı (ich · du), o yüzden „damit“ — „um … zu“ olamaz.",
      },
      {
        kind: "short_answer",
        text: "An welchem Tag sind die beiden fertig?",
        options: [],
        answer: 0,
        accept: ["am Freitag", "Freitag"],
        explain: "„Wenn das gelingt, sind wir am Freitag fertig.“",
      },
    ],
  },
  {
    id: "b1-u6-l2",
    level: "B1",
    skill: "listening",
    unit: 6,
    title: "Das alte Foto",
    genre: "Anı konuşması",
    intro: "İki arkadaş eski bir fotoğrafa bakıyor. Bir kez olan ile her seferinde olanı ayır.",
    minutes: 4,
    gloss: [
      { de: "damals", tr: "o zamanlar", en: "back then" },
      { de: "die Erkältung", tr: "soğuk algınlığı", en: "cold" },
      { de: "nämlich", tr: "çünkü / şöyle ki", en: "namely" },
      { de: "der Zufall", tr: "tesadüf", en: "coincidence" },
    ],
    segments: [
      { text: "Schau mal, das Foto. Weißt du noch?" },
      { text: "Natürlich. Das war damals in den Ferien." },
      { text: "Als wir dort ankamen, hatte ich eine Erkältung." },
      { text: "Ja, richtig. Du bliebst drei Tage im Zimmer." },
      { text: "Eigentlich wollte ich schwimmen. Es war nämlich sehr warm." },
      { text: "Jedes Mal, wenn ich das Foto sehe, muss ich lachen." },
      { text: "Ich auch. Es war ein Zufall, dass wir uns dort trafen." },
      { text: "Ein schöner Augenblick. Wir sollten wieder dorthin fahren." },
    ],
    questions: [
      {
        text: "Was hatte die erste Person bei der Ankunft?",
        options: ["Eine Erkältung", "Kein Geld", "Kein Zimmer"],
        answer: 0,
        explain: "„Als wir dort ankamen, hatte ich eine Erkältung.“",
      },
      {
        text: "Was wollte sie eigentlich machen?",
        options: ["Lesen", "Schwimmen", "Arbeiten"],
        answer: 1,
        explain: "„Eigentlich wollte ich schwimmen.“",
      },
      {
        text: "Wie trafen sich die beiden damals?",
        options: ["Sie waren verabredet", "Durch Zufall", "Über die Familie"],
        answer: 1,
        explain: "„Es war ein Zufall, dass wir uns dort trafen.“",
      },
      {
        kind: "gapfill",
        text: "Jedes Mal, ___ ich das Foto sehe, muss ich lachen.",
        options: [],
        answer: 0,
        accept: ["wenn"],
        explain: "Tekrarlanan olay: „jedes Mal, wenn …“ — burada „als“ olmaz.",
      },
      {
        kind: "short_answer",
        text: "Wie viele Tage blieb sie im Zimmer?",
        options: [],
        answer: 0,
        accept: ["drei Tage", "drei", "3"],
        explain: "„Du bliebst drei Tage im Zimmer.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u6-w1",
    level: "B1",
    skill: "writing",
    unit: 6,
    title: "Wozu brauchen Sie das?",
    genre: "Gerekçeli istek",
    intro: "Bir kurs için destek istiyorsun. Her cümlede amacın kime ait olduğunu göster.",
    minutes: 8,
    gloss: [
      { de: "der Zweck", tr: "amaç", en: "purpose" },
      { de: "unterstützen", tr: "desteklemek", en: "to support" },
      { de: "das Wissen", tr: "bilgi", en: "knowledge" },
      { de: "erwarten", tr: "beklemek", en: "to expect" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bilgimi geliştirmek için bir kurs yapıyorum.",
        answer: "Ich mache einen Kurs, um mein Wissen zu verbessern.",
        hint: "Özne aynı kalıyor: um … zu.",
      },
      {
        kind: "build",
        tr: "Firma beni destekliyor ki müşterilerle daha emin konuşayım.",
        answer: "Die Firma unterstützt mich, damit ich mit Kunden sicherer spreche.",
        hint: "Özne değişiyor (Firma → ich): damit.",
      },
      {
        kind: "build",
        tr: "Zamanında bitirmeyi bekliyorum.",
        answer: "Ich erwarte, dass ich rechtzeitig fertig werde.",
        alternatives: ["Ich erwarte, rechtzeitig fertig zu werden."],
        hint: "„erwarten“ sonrası dass yan cümlesi ya da zu-mastarı.",
      },
      {
        kind: "form",
        prompt: "Kurs başvuru kartını doldur.",
        facts: "Katılımcı: Emre Şahin; şu anki iş: telefonla müşteri hizmetleri; amaç: telefonda daha emin konuşmak; başlangıç: ekim; haftada ek saat: evet.",
        fields: [
          { label: "Teilnehmer", answer: "Emre Şahin", accept: ["Emre", "Şahin"] },
          { label: "Zweck", answer: "sicher am Telefon sprechen", accept: ["sicherer sprechen", "am Telefon sprechen"] },
          { label: "Beginn", answer: "Oktober", accept: ["im Oktober"] },
          { label: "Zusätzliche Stunde", answer: "ja", accept: ["Ja", "eine Stunde pro Woche"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Amaç cümlesini düzelt.",
        source: "Ich mache den Kurs, um meine Kinder in der Schule Hilfe zu bekommen.",
        answer: "Ich mache den Kurs, damit meine Kinder in der Schule Hilfe bekommen.",
        why: "Türkçe '-mesi için' tek kalıptır, Almanca ikiye ayırır: özne AYNI kalırsa um … zu, DEĞİŞİRSE damit. Burada özne ich'ten meine Kinder'e geçiyor, o yüzden damit.",
      },
    ],
  },
  {
    id: "b1-u6-w2",
    level: "B1",
    skill: "writing",
    unit: 6,
    title: "Ein Erlebnis aus der Kindheit",
    genre: "Anı metni",
    intro: "Çocukluğundan bir anı yaz. Bir kez olanı ve her seferinde olanı ayrı ayrı anlat.",
    minutes: 12,
    gloss: [
      { de: "damals", tr: "o zamanlar", en: "back then" },
      { de: "jedes Mal", tr: "her seferinde", en: "every time" },
      { de: "das Erlebnis", tr: "yaşantı", en: "experience" },
      { de: "irgendwann", tr: "bir zaman", en: "at some point" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Her yaz tatile gittiğimizde büyükannem kapıda beklerdi.",
        answer: "Jedes Mal, wenn wir im Sommer in die Ferien fuhren, wartete meine Großmutter an der Tür.",
        hint: "Tekrarlanan olay: jedes Mal, wenn …",
      },
      {
        kind: "build",
        tr: "On yaşındayken ilk kez yalnız seyahat ettim.",
        answer: "Als ich zehn war, reiste ich zum ersten Mal allein.",
        hint: "Geçmişte tek seferlik: als.",
      },
      {
        kind: "free",
        prompt: "Çocukluğundan bir anı yaz. Nerede ve ne zaman olduğunu söyle, her seferinde tekrarlanan bir şeyi anlat (jedes Mal, wenn …), sonra bir kez olan bir olayı anlat (als …), ve o anın senin için neden önemli olduğunu yaz.",
        checklist: [
          "Yer ve dönem belirtilmiş mi (damals, als Kind)?",
          "Tekrarlanan bir şey 'wenn' ile anlatılmış mı?",
          "Tek seferlik bir olay 'als' ile anlatılmış mı?",
          "Olay geçmiş zamanda mı yazılmış?",
          "Neden önemli olduğu söylenmiş mi?",
        ],
        minWords: 70,
        sample:
          "Als Kind wohnte ich damals in einem kleinen Ort mit meiner Familie.\n\n" +
          "Jedes Mal, wenn im Winter der erste Schnee kam, gingen mein Bruder und ich " +
          "sofort nach draußen. Meine Mutter rief ständig, wir sollten warme Sachen " +
          "anziehen, aber wir hörten kaum zu.\n\n" +
          "Ein Erlebnis vergesse ich nie. Als ich neun war, fiel ich in den Schnee und " +
          "verlor einen Schuh. Ich lief den ganzen Weg mit einem Schuh nach Hause. " +
          "Meine Mutter war zuerst ernst, aber dann lachte sie. In diesem Augenblick " +
          "war ich nicht mehr unsicher.\n\n" +
          "Irgendwann zogen wir weg. Diese Erinnerung ist mir jedoch geblieben, weil " +
          "ich damals gelernt habe, dass ein Fehler nicht schlimm ist.",
        phrases: [
          { de: "Jedes Mal, wenn …", tr: "Her seferinde …", en: "Every time …" },
          { de: "Als ich … war, …", tr: "… yaşındayken …", en: "When I was …" },
          { de: "Diese Erinnerung ist mir geblieben.", tr: "Bu anı bende kaldı.", en: "This memory has stayed with me." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Zaman bağlacını düzelt.",
        source: "Wenn ich acht war, fiel ich vom Fahrrad.",
        answer: "Als ich acht war, fiel ich vom Fahrrad.",
        why: "Türkçe '-diğinde' tek seferlik ile tekrarlananı ayırmaz. Almancada geçmişte BİR KEZ olan olay als ister; wenn tekrarlananı anlatır (jedes Mal, wenn …).",
      },
    ],
  },
];
