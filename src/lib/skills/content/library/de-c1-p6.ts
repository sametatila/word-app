import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 6.
 *
 * Kurallar ve emsal: `de-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 6 bilim iletişimi hattı: bir kurumun iç raporu, iki araştırmacının
 * konuşması, bir tutanak metni. Dil bilgisi işlev fiili öbekleri — C1'de
 * resmî dilin taşıyıcısı.
 */
export const deC1P6: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r6",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Zwischenbericht: Wie wir über Unsicherheit sprechen",
    genre: "report",
    intro: "Bir enstitünün iç raporu: belirsizlik nasıl aktarılmalı, hangi biçim güveni artırıyor, hangisi azaltıyor.",
    gloss: [
      { de: "die Unsicherheit", tr: "belirsizlik", en: "uncertainty" },
      { de: "die Schätzung", tr: "tahmin", en: "estimate" },
      { de: "das Vertrauen", tr: "güven", en: "trust" },
      { de: "die Spannbreite", tr: "aralık", en: "range" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
      { de: "der Befund", tr: "bulgu", en: "finding" },
    ],
    minutes: 10,
    text:
      "Zwischenbericht der Arbeitsgruppe „Kommunikation von Unsicherheit“\n\n" +
      "Die Arbeitsgruppe hat im vergangenen Halbjahr untersucht, wie sich die Darstellung " +
      "von Unsicherheit auf das Vertrauen in wissenschaftliche Aussagen auswirkt. " +
      "Grundlage sind drei Befragungswellen mit insgesamt viertausendzweihundert Teilnehmenden.\n\n" +
      "Der zentrale Befund widerspricht einer verbreiteten Annahme. " +
      "Die Sorge, dass die Angabe einer Spannbreite als Schwäche gelesen wird und das Vertrauen " +
      "senkt, hat sich nicht bestätigt. Im Gegenteil: Aussagen, die eine Spannbreite nennen " +
      "(„zwischen zwei und vier Grad“), wurden durchweg als glaubwürdiger bewertet als " +
      "Aussagen mit einer einzelnen Zahl, und zwar unabhängig davon, ob die Befragten dem " +
      "Thema vorher zustimmend oder ablehnend gegenüberstanden.\n\n" +
      "Zwei Einschränkungen sind allerdings zu berücksichtigen.\n\n" +
      "Erstens verliert dieser Effekt seine Wirkung, sobald die Spannbreite so weit wird, " +
      "dass sie keine Entscheidung mehr zulässt. Eine Schätzung zwischen null und vierzig Prozent " +
      "wurde von der Mehrheit als Ausweichen gelesen, nicht als Genauigkeit.\n\n" +
      "Zweitens kommt es entscheidend darauf an, WER die Unsicherheit einräumt. " +
      "Räumt die Forschungsgruppe sie selbst ein, wirkt es souverän; wird dieselbe Einschränkung " +
      "erst von außen nachgetragen, sinkt das Vertrauen messbar — auch dann, wenn der Inhalt " +
      "identisch ist. Der Zeitpunkt der Offenlegung wiegt demnach schwerer als ihr Umfang.\n\n" +
      "Die Arbeitsgruppe empfiehlt daher, Unsicherheit nicht am Ende einer Mitteilung zu " +
      "erwähnen, sondern in dem Satz, der das Ergebnis nennt. " +
      "Ob sich diese Empfehlung im Alltag der Pressestellen durchsetzen lässt, bleibt offen: " +
      "Sie steht in unmittelbarem Widerspruch zu der Erwartung, eine Meldung müsse mit einer " +
      "klaren Zahl beginnen.",
    questions: [
      {
        text: "Welche verbreitete Annahme widerlegt der Bericht?",
        options: [
          "dass Spannbreiten das Vertrauen senken",
          "dass Zahlen überhaupt verstanden werden",
          "dass Pressestellen zu vorsichtig formulieren",
        ],
        answer: 0,
        explain: "Aralık verenler tek sayı verenlerden daha inandırıcı bulunmuş.",
      },
      {
        text: "Wann verliert der Effekt seine Wirkung?",
        options: [
          "wenn die Befragten dem Thema ablehnend gegenüberstehen",
          "wenn die Spannbreite keine Entscheidung mehr zulässt",
          "wenn der Text zu lang ist",
        ],
        answer: 1,
        explain: "Sıfır ile kırk arasındaki bir tahmin kaçamak olarak okunmuş.",
      },
      {
        kind: "truefalse",
        text: "Der Effekt trat unabhängig von der vorherigen Haltung der Befragten auf.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„unabhängig davon, ob die Befragten dem Thema vorher zustimmend oder ablehnend gegenüberstanden“.",
      },
      {
        kind: "gapfill",
        text: "An den Befragungen haben insgesamt ___ Personen teilgenommen.",
        options: [],
        answer: 0,
        accept: ["viertausendzweihundert", "4200"],
        explain: "„drei Befragungswellen mit insgesamt viertausendzweihundert Teilnehmenden“.",
      },
      {
        kind: "short_answer",
        text: "Was wiegt laut Bericht schwerer als der Umfang der Offenlegung?",
        options: [],
        answer: 0,
        accept: ["der Zeitpunkt", "der Zeitpunkt der Offenlegung", "wann sie erfolgt"],
        explain: "„Der Zeitpunkt der Offenlegung wiegt demnach schwerer als ihr Umfang.“",
      },
      {
        text: "Warum bleibt die Umsetzung der Empfehlung offen?",
        options: [
          "Sie widerspricht der Erwartung an den ersten Satz einer Meldung.",
          "Sie ist wissenschaftlich umstritten.",
          "Sie kostet die Pressestellen zu viel Zeit.",
        ],
        answer: 0,
        explain: "Son cümle bu çelişkiyi açıkça adlandırıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l6",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Zwei Meinungen über eine Zahl",
    genre: "dialogue",
    intro: "İki araştırmacı bir basın bülteninin ilk cümlesini tartışıyor: ne kadar sadeleştirme dürüst kalır.",
    gloss: [
      { de: "die Vereinfachung", tr: "sadeleştirme", en: "simplification" },
      { de: "der Vorbehalt", tr: "çekince", en: "reservation" },
      { de: "die Genauigkeit", tr: "kesinlik", en: "precision" },
      { de: "der Kompromiss", tr: "uzlaşma", en: "compromise" },
      { de: "vertretbar", tr: "savunulabilir", en: "defensible" },
      { de: "die Reichweite", tr: "erişim", en: "reach" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Frau Dr. Reimann", text: "Der erste Satz lautet jetzt: „Die Belastung sinkt um dreißig Prozent.“ Das steht so in keiner unserer Tabellen." },
      { speaker: "Herr Prof. Adler", text: "Es steht im Median. Die Spannbreite kommt im dritten Absatz, mit allen Vorbehalten." },
      { speaker: "Frau Dr. Reimann", text: "Den dritten Absatz liest niemand. Was hängen bleibt, ist der erste Satz, und der behauptet eine Genauigkeit, die wir nicht haben." },
      { speaker: "Herr Prof. Adler", text: "Und wenn wir mit der Spannbreite beginnen, wird die Meldung nicht übernommen. Dann bleibt gar nichts hängen." },
      { speaker: "Frau Dr. Reimann", text: "Das ist ein Argument über Reichweite, nicht über Redlichkeit. Die beiden dürfen wir nicht verwechseln." },
      { speaker: "Herr Prof. Adler", text: "Ich verwechsle sie nicht, ich wäge ab. Eine Vereinfachung, die in die richtige Richtung zeigt, halte ich für vertretbar." },
      { speaker: "Frau Dr. Reimann", text: "Bis jemand mit unserem Satz Politik macht und wir erklären müssen, dass wir das so nie gesagt haben." },
      { speaker: "Herr Prof. Adler", text: "Ein Kompromiss: „um rund ein Drittel, je nach Region deutlich weniger“. Das ist immer noch ein Satz, aber keine falsche Genauigkeit mehr." },
      { speaker: "Frau Dr. Reimann", text: "Damit kann ich leben. Und die Tabelle verlinken wir gleich im ersten Absatz, nicht erst am Ende." },
    ],
    questions: [
      {
        text: "Was kritisiert Frau Dr. Reimann am ersten Satz?",
        options: [
          "Er ist zu lang.",
          "Er behauptet eine Genauigkeit, die nicht belegt ist.",
          "Er nennt die falsche Zahl.",
        ],
        answer: 1,
        explain: "Medyandan gelen bir sayı ama cümle bir kesinlik iddia ediyor.",
      },
      {
        text: "Womit begründet Herr Prof. Adler die Vereinfachung?",
        options: ["mit der Reichweite", "mit dem Zeitdruck", "mit einer Vorgabe der Leitung"],
        answer: 0,
        explain: "Aralıkla başlarsa haberin alınmayacağını söylüyor.",
      },
      {
        kind: "truefalse",
        text: "Am Ende bleibt der ursprüngliche Satz unverändert.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„um rund ein Drittel, je nach Region deutlich weniger“ biçiminde uzlaşılıyor.",
      },
      {
        kind: "gapfill",
        text: "Die Spannbreite steht bisher im ___ Absatz.",
        options: [],
        answer: 0,
        accept: ["dritten", "3."],
        explain: "„Die Spannbreite kommt im dritten Absatz, mit allen Vorbehalten.“",
      },
      {
        kind: "short_answer",
        text: "Welche zwei Dinge dürfen laut Reimann nicht verwechselt werden?",
        options: [],
        answer: 0,
        accept: [
          "Reichweite und Redlichkeit",
          "Redlichkeit und Reichweite",
          "Reichweite, Redlichkeit",
        ],
        explain: "„Das ist ein Argument über Reichweite, nicht über Redlichkeit.“",
      },
      {
        text: "Was wird zusätzlich beschlossen?",
        options: [
          "Die Tabelle wird im ersten Absatz verlinkt.",
          "Die Meldung wird zurückgezogen.",
          "Die Zahlen werden neu berechnet.",
        ],
        answer: 0,
        explain: "Son replik: tablo sona değil ilk paragrafa bağlanacak.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w6",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Protokoll mit Empfehlung",
    genre: "report",
    intro: "Bir tartışmanın tutanağını yazıyorsun: önce iki cümle kur, sonra tarafsız bir özet ve gerekçeli bir öneri yaz.",
    gloss: [
      { de: "das Protokoll", tr: "tutanak", en: "minutes" },
      { de: "die Abwägung", tr: "tartma", en: "weighing up" },
      { de: "der Dissens", tr: "görüş ayrılığı", en: "disagreement" },
      { de: "wiedergeben", tr: "aktarmak", en: "to render" },
      { de: "die Formulierung", tr: "ifade", en: "wording" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Kurum tabloyu kamuoyuna açıyor.",
        answer: "Das Institut stellt die Tabelle der Öffentlichkeit zur Verfügung.",
        alternatives: ["Die Tabelle wird der Öffentlichkeit zur Verfügung gestellt."],
        hint: "„zur Verfügung stellen“ bir işlev fiili öbeğidir; anlam isimde, çekim fiildedir.",
      },
      {
        kind: "build",
        tr: "Bu ifade söz konusu bile olamaz.",
        answer: "Diese Formulierung kommt nicht in Frage.",
        alternatives: ["Diese Formulierung kommt nicht infrage."],
        hint: "„in Frage kommen“ kalıbı „möglich sein“ anlamına gelir ve parçalanmaz.",
      },
      {
        kind: "free",
        prompt:
          "Bir tartışmanın tutanağını yaz: konuyu ve katılanları belirt, iki tarafın konumunu tarafsızca aktar, anlaşılan noktayı ve süren görüş ayrılığını ayır, kararı ve sorumluyu yaz, sonunda kendi önerini ayrı bir bölümde ekle.",
        checklist: [
          "Konuyu, tarihi ve katılanları belirt",
          "İki konumu tarafsız biçimde aktar",
          "Anlaşılan nokta ile süren ayrılığı ayır",
          "Kararı, sorumluyu ve son tarihi yaz; öneriyi ayrı bölümde ver",
        ],
        minWords: 140,
        phrases: [
          { de: "Gegenstand der Sitzung war …", tr: "Toplantının konusu …", en: "The subject of the meeting was …" },
          { de: "Frau … vertrat die Auffassung, dass …", tr: "… Hanım, … görüşünü savundu", en: "Ms … took the view that …" },
          { de: "Einigkeit bestand darüber, dass …", tr: "… konusunda görüş birliği vardı", en: "There was agreement that …" },
          { de: "Der Dissens betraf ausschließlich …", tr: "Görüş ayrılığı yalnız … ile ilgiliydi", en: "The disagreement concerned solely …" },
          { de: "Zur Umsetzung wird empfohlen, …", tr: "Uygulama için … tavsiye edilir", en: "For implementation it is recommended …" },
        ],
        sample:
          "Gegenstand der Sitzung vom 14. März war die Formulierung des ersten Satzes der " +
          "geplanten Pressemitteilung; anwesend waren Frau Dr. Reimann, Herr Prof. Adler und " +
          "die Pressestelle. " +
          "Frau Dr. Reimann vertrat die Auffassung, dass die bisherige Fassung eine Genauigkeit " +
          "behauptet, die durch die Daten nicht gedeckt ist, und dass ein Vorbehalt im dritten " +
          "Absatz praktisch wirkungslos bleibt. " +
          "Herr Prof. Adler hielt dem entgegen, dass eine Meldung ohne eingängige Zahl kaum " +
          "aufgegriffen wird und die geringere Reichweite in Kauf zu nehmen sei. " +
          "Einigkeit bestand darüber, dass die Aussage inhaltlich zutrifft und dass die " +
          "Datengrundlage öffentlich zugänglich gemacht wird. " +
          "Der Dissens betraf ausschließlich die Frage, an welcher Stelle die Spannbreite " +
          "genannt wird. " +
          "Beschlossen wurde die Fassung „um rund ein Drittel, je nach Region deutlich weniger“; " +
          "die Verlinkung der Tabelle im ersten Absatz übernimmt die Pressestelle bis zum 20. März.\n\n" +
          "Empfehlung: Für künftige Mitteilungen sollte eine kurze Regel schriftlich festgehalten " +
          "werden, wonach jede Zahl im Eingangssatz eine Angabe zur Streuung enthält. " +
          "Damit entfällt die Einzelfalldiskussion, die in dieser Sitzung zwei Stunden " +
          "in Anspruch genommen hat.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s6",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Wie viel Vereinfachung ist redlich?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir ölçüt öner ve onu bir örnekle sına.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bir uzman, kamuoyuna anlatırken ne kadar sadeleştirebilir? Bir ölçüt öner, onu bir örnekle sına, ölçütünün başarısız olduğu bir durumu kabul et ve kendini nasıl bağlayacağını söyle.",
      bulletsTr: [
        "Bir ölçüt öner ve tek cümleyle tanımla",
        "Ölçütü somut bir örnekle sına",
        "Ölçütünün yetmediği bir durumu kabul et",
        "Kendini nasıl bağlayacağını söyle",
      ],
      targets: [
        { de: "Als Maßstab schlage ich vor: …", tr: "Ölçüt olarak şunu öneriyorum: …" },
        { de: "Daran gemessen wäre … noch vertretbar, … dagegen nicht.", tr: "Buna göre … savunulabilir, … ise değil." },
        { de: "Der Maßstab versagt allerdings dort, wo …", tr: "Ancak ölçüt … olduğu yerde tökezliyor" },
        { de: "Ich würde mich selbst darauf verpflichten, …", tr: "Kendimi … ile bağlardım" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Als Maßstab schlage ich vor: Eine Vereinfachung ist so lange redlich, wie sie eine " +
        "Entscheidung nicht in eine Richtung lenkt, die die Daten nicht tragen. " +
        "Nicht die Ungenauigkeit ist das Problem, sondern die Richtung, in die sie zieht. " +
        "Daran gemessen wäre „um rund ein Drittel“ noch vertretbar, „um dreißig Prozent“ dagegen " +
        "nicht, weil die zweite Formulierung eine Messung suggeriert, die es nicht gibt, " +
        "und weil jemand auf dieser Grundlage eine Grenze festlegen könnte. " +
        "Der Maßstab versagt allerdings dort, wo sich die Folgen einer Aussage gar nicht " +
        "absehen lassen. Bei einem Befund zu Ernährung weiß ich heute nicht, welche Entscheidung " +
        "morgen darauf gestützt wird, und dann kann ich die Richtung auch nicht prüfen. " +
        "Ich würde mich deshalb weniger auf ein Ergebnis als auf ein Verfahren verpflichten: " +
        "Jede Zahl, die ich nach außen gebe, bekommt im selben Satz eine Angabe zur Streuung, " +
        "und zwar unabhängig davon, ob ich das Ergebnis für wichtig halte oder nicht. " +
        "Eine Regel, die nur gilt, wenn sie mir gerade passt, ist keine.",
      rubricHint:
        "Bir ölçüt, bir sınama ve kendine getirilen bir bağ beklenir; „daran gemessen“, „versagen dort, wo“ ve işlev fiili öbekleri kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g6",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "in Frage kommen, zur Verfügung stehen",
    genre: "grammar",
    intro: "Resmî Almancada anlamı fiil değil isim taşır; fiil yalnız çekimi üstlenir. Bu kalıpları tanımak metni açar.",
    focus: "İşlev fiili öbekleri (Funktionsverbgefüge) ve karşılık gelen tek fiiller",
    gloss: [
      { de: "die Verfügung", tr: "tasarruf", en: "disposal" },
      { de: "die Entscheidung", tr: "karar", en: "decision" },
      { de: "der Antrag", tr: "başvuru", en: "application" },
      { de: "die Anwendung", tr: "uygulama", en: "application" },
      { de: "die Methode", tr: "yöntem", en: "method" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Anlam isimde, çekim fiilde",
        tr: "„eine Entscheidung treffen“ ile „entscheiden“ aynı şeyi söyler. Farkları üsluptur: isimli biçim resmî metinlerin taşıyıcısıdır ve isme sıfat eklemeye izin verir — „eine schwierige Entscheidung treffen“. Fiil (treffen, stellen, kommen, nehmen) burada kendi anlamını yitirir; sözlükten çevrilmez, kalıp olarak öğrenilir.",
        examples: [
          { de: "Wir treffen morgen eine Entscheidung.", tr: "Yarın karar vereceğiz.", note: "= entscheiden" },
          { de: "Der Antrag kommt nicht in Frage.", tr: "Başvuru söz konusu değil.", note: "= ist nicht möglich" },
          { de: "Die Tabelle steht allen zur Verfügung.", tr: "Tablo herkesin kullanımına açık.", note: "= ist verfügbar" },
        ],
      },
      {
        heading: "stehen ↔ stellen: durum ve değişim",
        tr: "Birçok kalıpta ikili vardır: „zur Verfügung STEHEN“ bir durumu, „zur Verfügung STELLEN“ o duruma getirmeyi anlatır. Aynı ayrım „in Frage stehen / stellen“, „zur Diskussion stehen / stellen“ ikililerinde de geçerlidir. Türkçede ikisi de çoğu zaman tek fiille karşılanır, bu yüzden ayrım gözden kaçar.",
        examples: [
          { de: "Der Termin steht noch zur Diskussion.", tr: "Tarih hâlâ tartışmaya açık.", note: "durum" },
          { de: "Ich stelle den Termin zur Diskussion.", tr: "Tarihi tartışmaya açıyorum.", note: "değişim" },
          { de: "Das Ergebnis stellt die Methode in Frage.", tr: "Sonuç yöntemi sorgulatıyor.", note: "değişim" },
        ],
      },
      {
        heading: "Edat ve artikel donmuştur",
        tr: "Bu kalıplarda edat ve artikel sabittir ve değiştirilemez: „in Frage“ artikelsiz, „zur Verfügung“ kaynaşmış, „in Kauf nehmen“ artikelsiz. „eine Frage stellen“ ise kalıp değil, düz bir cümledir — aradaki fark artikeldedir. Bu yüzden bu öbekler bir bütün olarak ezberlenir.",
        examples: [
          { de: "Wir nehmen den Aufwand in Kauf.", tr: "Zahmeti göze alıyoruz.", note: "artikelsiz, donmuş" },
          { de: "Die Regel findet hier keine Anwendung.", tr: "Kural burada uygulanmıyor.", note: "= wird nicht angewendet" },
          { de: "Sie stellt eine Frage.", tr: "Bir soru soruyor.", note: "kalıp DEĞİL: normal nesne" },
        ],
      },
    ],
    questions: [
      {
        text: "„Wir entscheiden morgen.“ — Welche Form ist formeller und gleichbedeutend?",
        options: [
          "Wir treffen morgen eine Entscheidung.",
          "Wir stellen morgen eine Entscheidung.",
          "Wir nehmen morgen eine Entscheidung.",
        ],
        answer: 0,
        explain: "Kalıp „eine Entscheidung treffen“dir; fiil değiştirilemez.",
      },
      {
        text: "Der Antrag kommt nicht ___ Frage.",
        options: ["in", "zur", "auf"],
        answer: 0,
        explain: "„in Frage kommen“ artikelsiz ve donmuş bir kalıptır.",
      },
      {
        text: "Welcher Satz beschreibt eine VERÄNDERUNG?",
        options: [
          "Der Termin steht zur Diskussion.",
          "Ich stelle den Termin zur Diskussion.",
          "Der Termin ist zur Diskussion.",
        ],
        answer: 1,
        explain: "„stellen“ duruma getirmeyi, „stehen“ durumu anlatır.",
      },
      {
        kind: "gapfill",
        text: "Die Tabelle steht allen ___ Verfügung.",
        options: [],
        answer: 0,
        accept: ["zur"],
        explain: "„zu der“ kaynaşır ve kalıpta sabittir: zur Verfügung.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ den zusätzlichen Aufwand in Kauf. (nehmen)",
        options: [],
        answer: 0,
        accept: ["nehmen"],
        explain: "„in Kauf nehmen“ kalıbında fiil nehmen'dir.",
      },
      {
        kind: "gapfill",
        text: "Die Regel findet hier keine ___. (anwenden)",
        options: [],
        answer: 0,
        accept: ["Anwendung"],
        explain: "Fiil isimleşir ve „finden“ ile kalıplaşır: Anwendung finden.",
      },
      {
        kind: "gapfill",
        text: "Das Ergebnis ___ die bisherige Methode in Frage. (stellen)",
        options: [],
        answer: 0,
        accept: ["stellt"],
        explain: "Sorgulatma bir değişimdir; „stellen“ gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Das Institut", "stellt", "die Tabelle", "der Öffentlichkeit", "zur Verfügung"],
        explain: "İşlev fiili ikinci sırada, donmuş öbek cümlenin sonunda durur.",
      },
      {
        kind: "truefalse",
        text: "„Wir nehmen morgen eine Entscheidung.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Kalıp „eine Entscheidung treffen“dir; „nehmen“ başka öbeklere aittir.",
      },
      {
        kind: "truefalse",
        text: "„Sie stellt eine Frage.“ — Bu bir işlev fiili öbeği mi?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Burada artikel var ve „Frage“ gerçek bir nesnedir; kalıp „in Frage stellen“dir.",
      },
    ],
  },
];
