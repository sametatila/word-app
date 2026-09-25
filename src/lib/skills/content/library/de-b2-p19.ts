import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 19.
 *
 * B2 hücresini YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 19 adlar hattı: Almanya'da bir çocuğa hangi ön adın verilebileceğini
 * anlatan bir bilgi metni, bir ad araştırmacısıyla radyo söyleşisi, çift
 * soyadı için nüfus dairesine e-posta. Dil bilgisi Futur I ve Futur II —
 * gelecek, tamamlanmış gelecek ve „wohl“ ile tahmin.
 */
export const deB2P19: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r19",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Was ein Vorname darf",
    genre: "info",
    intro: "Bir dergideki bilgi metni: Almanya'da bir çocuğa hangi adlar verilebilir, kim karar veriyor ve ret gelirse ne oluyor.",
    gloss: [
      { de: "der Vorname", tr: "ad", en: "first name" },
      { de: "das Standesamt", tr: "nüfus dairesi", en: "registry office" },
      { de: "das Wohl", tr: "yarar", en: "welfare" },
      { de: "ablehnen", tr: "reddetmek", en: "to reject" },
      { de: "der Nachname", tr: "soyadı", en: "surname" },
      { de: "der Doppelname", tr: "çift soyadı", en: "double surname" },
    ],
    minutes: 8,
    text:
      "Was ein Vorname darf\n\n" +
      "Eltern in Deutschland dürfen den Vornamen ihres Kindes weitgehend frei wählen. Eine Liste erlaubter " +
      "Namen gibt es nicht, und seit 2008 muss ein Vorname auch nicht mehr erkennen lassen, ob es sich um " +
      "einen Jungen oder ein Mädchen handelt.\n\n" +
      "Eine Grenze gibt es trotzdem: das Wohl des Kindes. Das Standesamt prüft, ob ein Name das Kind " +
      "lächerlich machen oder ihm später schaden könnte. Abgelehnt werden zum Beispiel Namen von Marken, " +
      "Bezeichnungen, die wie ein Titel klingen, oder Wörter, die gar nicht als Name erkennbar sind.\n\n" +
      "Die meisten Eltern merken davon nichts, denn nur ein sehr kleiner Teil der Namen wird abgelehnt. Wer " +
      "eine Absage bekommt, kann das Amtsgericht entscheiden lassen. Bis zur Geburt muss man sich übrigens " +
      "nicht festlegen: Für die Wahl des Vornamens haben Eltern danach noch einen Monat Zeit.\n\n" +
      "Beim Nachnamen hat sich zuletzt mehr bewegt. Seit Mai 2025 dürfen Kinder auch einen Doppelnamen aus " +
      "den Nachnamen beider Eltern tragen, was vorher nicht möglich war.\n\n" +
      "Namenforscher raten, einen Namen vor der Entscheidung einmal laut über einen Spielplatz zu rufen. Das " +
      "Kind wird ihn schließlich ein Leben lang tragen, und in dreißig Jahren wird es damit vielleicht eine " +
      "Bewerbung unterschreiben. Ein Name, der heute witzig wirkt, wird bis dahin womöglich niemandem mehr " +
      "gefallen.",
    questions: [
      {
        text: "Was prüft das Standesamt bei einem Vornamen?",
        options: [
          "ob er auf einer amtlichen Liste steht",
          "ob er dem Kind schaden könnte",
          "ob er zum Geschlecht des Kindes passt",
        ],
        answer: 1,
        explain: "Sınır çocuğun yararı: „ob ein Name das Kind lächerlich machen oder ihm später schaden könnte“.",
      },
      {
        text: "Was können Eltern tun, wenn ein Name abgelehnt wird?",
        options: [
          "das Amtsgericht entscheiden lassen",
          "einen zweiten Antrag beim Standesamt stellen",
          "den Namen im Ausland eintragen lassen",
        ],
        answer: 0,
        explain: "„Wer eine Absage bekommt, kann das Amtsgericht entscheiden lassen.“",
      },
      {
        kind: "truefalse",
        text: "Eltern müssen den Vornamen schon vor der Geburt festlegen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Doğuma kadar karar vermek gerekmiyor; doğumdan sonra bir ay süre var.",
      },
      {
        kind: "gapfill",
        text: "Für die Wahl des Vornamens haben Eltern nach der Geburt noch einen ___ Zeit.",
        options: [],
        answer: 0,
        accept: ["Monat"],
        explain: "„haben Eltern danach noch einen Monat Zeit“.",
      },
      {
        kind: "short_answer",
        text: "Was dürfen Kinder seit Mai 2025 tragen?",
        options: [],
        answer: 0,
        accept: ["einen Doppelnamen", "Doppelnamen", "einen Doppelnamen aus den Nachnamen beider Eltern"],
        explain: "„Seit Mai 2025 dürfen Kinder auch einen Doppelnamen … tragen.“",
      },
      {
        text: "Was raten Namenforscher?",
        options: [
          "einen Namen erst nach der Geburt zu wählen",
          "einen seltenen Namen zu vermeiden",
          "einen Namen vorher laut auszuprobieren",
        ],
        answer: 2,
        explain: "Karar vermeden önce adı bir oyun parkında bir kez yüksek sesle söyleyerek denemeyi öneriyorlar.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l19",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Emil und Ida sind zurück",
    genre: "interview",
    intro: "Radyo söyleşisi: bir ad araştırmacısı eski adların neden geri döndüğünü, anne babaların nasıl seçtiğini ve gelecekte hangi adları duyacağımızı anlatıyor.",
    gloss: [
      { de: "der Klang", tr: "tını", en: "sound" },
      { de: "der Konsonant", tr: "ünsüz", en: "consonant" },
      { de: "aussprechen", tr: "telaffuz etmek", en: "to pronounce" },
      { de: "buchstabieren", tr: "harf harf söylemek", en: "to spell" },
      { de: "auftauchen", tr: "ortaya çıkmak", en: "to turn up" },
      { de: "vorhersagen", tr: "öngörmek", en: "to forecast" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Moderatorin", text: "Herr Brückner, auf den Spielplätzen hört man wieder Emil, Ida und Frieda. Das klingt nach Urgroßeltern. Was ist da los?" },
      { speaker: "Herr Brückner", text: "Das ist ein ziemlich regelmäßiges Muster. Namen kommen ungefähr nach hundert Jahren zurück, also dann, wenn niemand mehr lebt, den man mit diesem Namen persönlich verbindet." },
      { speaker: "Moderatorin", text: "Und die Namen der heutigen Eltern?" },
      { speaker: "Herr Brückner", text: "Die wirken gerade am ältesten. Kaum jemand nennt seine Tochter heute Sabine oder Claudia, weil man dabei an Kolleginnen im Büro denkt und nicht an ein Baby." },
      { speaker: "Moderatorin", text: "Wonach entscheiden sich Eltern überhaupt?" },
      { speaker: "Herr Brückner", text: "Viel stärker nach dem Klang, als sie glauben. Seit Jahren sind kurze Namen mit vielen Vokalen beliebt, etwa Mia oder Noah. Harte Konsonanten wie in Gerd oder Kurt sind dagegen fast verschwunden." },
      { speaker: "Moderatorin", text: "Spielt es eine Rolle, woher eine Familie kommt?" },
      { speaker: "Herr Brückner", text: "Eine große. Viele Familien suchen Namen, die in zwei Sprachen funktionieren, zum Beispiel Elif, Aylin oder Deniz. Die Großeltern können sie aussprechen, und in der Schule muss niemand buchstabieren." },
      { speaker: "Moderatorin", text: "Kann man vorhersagen, was als Nächstes kommt?" },
      { speaker: "Herr Brückner", text: "Ungefähr. In zwanzig Jahren werden wohl Namen aus den Dreißigerjahren wieder auftauchen, also Namen, die dann kaum noch jemand mit einem bestimmten Menschen verbindet." },
      { speaker: "Moderatorin", text: "Und wenn einem der eigene Name gar nicht gefällt?" },
      { speaker: "Herr Brückner", text: "Dann wird es schwierig. Den Vornamen ändern kann man in Deutschland in der Regel nur aus einem wichtigen Grund, und Geschmack zählt nicht dazu. Deshalb rate ich Eltern: Lassen Sie sich Zeit." },
    ],
    questions: [
      {
        text: "Nach wie vielen Jahren kommen Namen laut Herrn Brückner zurück?",
        options: ["nach etwa dreißig Jahren", "nach etwa hundert Jahren", "nach etwa zwanzig Jahren"],
        answer: 1,
        explain: "„Namen kommen ungefähr nach hundert Jahren zurück.“",
      },
      {
        text: "Warum heißen heute kaum Mädchen Sabine oder Claudia?",
        options: [
          "weil man dabei an Kolleginnen im Büro denkt",
          "weil diese Namen schwer auszusprechen sind",
          "weil das Standesamt sie nicht mehr erlaubt",
        ],
        answer: 0,
        explain: "Bu adlar bir bebeği değil büro çalışma arkadaşlarını düşündürüyor.",
      },
      {
        kind: "truefalse",
        text: "Kurze Namen mit vielen Vokalen sind seit Jahren beliebt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Seit Jahren sind kurze Namen mit vielen Vokalen beliebt, etwa Mia oder Noah.“",
      },
      {
        kind: "gapfill",
        text: "Harte Konsonanten wie in Gerd oder ___ sind fast verschwunden.",
        options: [],
        answer: 0,
        accept: ["Kurt"],
        explain: "„Harte Konsonanten wie in Gerd oder Kurt sind dagegen fast verschwunden.“",
      },
      {
        kind: "short_answer",
        text: "Wer kann Namen wie Elif oder Deniz gut aussprechen?",
        options: [],
        answer: 0,
        accept: ["die Großeltern", "Großeltern", "auch die Großeltern"],
        explain: "„Die Großeltern können sie aussprechen.“",
      },
      {
        text: "Was sagt Herr Brückner über das Ändern des Vornamens?",
        options: [
          "Es ist mit einem Formular ganz einfach.",
          "Es ist nur bis zum achtzehnten Geburtstag erlaubt.",
          "Es geht in der Regel nur aus einem wichtigen Grund.",
        ],
        answer: 2,
        explain: "„in der Regel nur aus einem wichtigen Grund, und Geschmack zählt nicht dazu“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w19",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Ein Doppelname für unser Kind",
    genre: "formal",
    intro: "Çocuğunuz martta doğacak ve çift soyadı taşısın istiyorsunuz: önce iki cümle kur, sonra nüfus dairesine açık sorular soran resmî bir e-posta yaz.",
    gloss: [
      { de: "das Standesamt", tr: "nüfus dairesi", en: "registry office" },
      { de: "der Doppelname", tr: "çift soyadı", en: "double surname" },
      { de: "die Unterlagen", tr: "belgeler", en: "documents" },
      { de: "die Gebühr", tr: "ücret", en: "fee" },
      { de: "die Bearbeitung", tr: "işlem", en: "processing" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Çocuğumuz muhtemelen mart başında dünyaya gelecek.",
        answer: "Unser Kind wird wohl Anfang März zur Welt kommen.",
        alternatives: ["Anfang März wird unser Kind wohl zur Welt kommen."],
        hint: "Futur I + „wohl“: gelecekle ilgili bir tahmin; „wird“ ikinci sırada, mastar „kommen“ en sonda.",
      },
      {
        kind: "build",
        tr: "Doğuma kadar bütün belgeleri toplamış olacağız.",
        answer: "Bis zur Geburt werden wir alle Unterlagen gesammelt haben.",
        alternatives: ["Wir werden bis zur Geburt alle Unterlagen gesammelt haben."],
        hint: "Futur II: „werden“ + Partizip II + „haben“ — gelecekteki bir noktada tamamlanmış olacak iş.",
      },
      {
        kind: "free",
        prompt:
          "Nüfus dairesine (Standesamt) yaz: durumunuzu kısaca anlat (evlisiniz, soyadlarınız farklı, çocuk ne zaman doğacak), ne istediğinizi söyle, belgeler, süre ve ücret hakkında sorularını sor ve bir randevu iste.",
        checklist: [
          "Durumunuzu kısaca anlat",
          "Ne istediğinizi açıkça söyle",
          "Belgeler, süre ve ücret hakkında soru sor",
          "Bir randevu iste ve nazikçe bitir",
        ],
        minWords: 130,
        phrases: [
          { de: "Ich wende mich mit einer Frage zu … an Sie.", tr: "… hakkında bir soruyla size başvuruyorum.", en: "I am contacting you with a question about …" },
          { de: "Da …, möchten wir, dass …", tr: "… olduğu için … olmasını istiyoruz.", en: "Since …, we would like …" },
          { de: "Könnten Sie mir bitte mitteilen, …?", tr: "Bana … bildirebilir misiniz?", en: "Could you please let me know …?" },
          { de: "Bis … werden wir … erledigt haben.", tr: "…'e kadar …'i halletmiş olacağız.", en: "By … we will have taken care of …" },
          { de: "Für einen Termin wäre ich Ihnen dankbar.", tr: "Bir randevu verirseniz minnettar olurum.", en: "I would be grateful for an appointment." },
        ],
        sample:
          "Sehr geehrte Damen und Herren, ich wende mich mit einer Frage zum Nachnamen unseres Kindes an Sie. " +
          "Mein Mann und ich sind seit 2022 verheiratet, haben aber beide unseren Namen behalten: Ich heiße " +
          "Demir, er heißt Hoffmann. Unser erstes Kind wird wohl Anfang März zur Welt kommen. " +
          "Da seit Mai 2025 auch Doppelnamen möglich sind, möchten wir, dass unser Kind Demir-Hoffmann heißt. " +
          "Könnten Sie mir bitte mitteilen, welche Unterlagen Sie dafür brauchen und ob wir den Namen schon vor " +
          "der Geburt festlegen können? Außerdem würde mich interessieren, ob dafür eine Gebühr anfällt und wie " +
          "lange die Bearbeitung ungefähr dauert. " +
          "Bis zur Geburt werden wir alle Unterlagen gesammelt haben, damit danach nichts liegen bleibt. Wenn " +
          "es Ihnen die Arbeit erleichtert, schicken wir Ihnen die Kopien gern vorab per E-Mail. Für " +
          "einen kurzen Termin in den nächsten Wochen wäre ich Ihnen sehr dankbar. " +
          "Mit freundlichen Grüßen, Zeynep Demir",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s19",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Sollten Eltern bei Vornamen völlig frei sein?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: anne babanın hakkını ve çocuğun çıkarını tart, sınırını çiz ve geleceğe bak.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Anne babalar çocuklarının adını tamamen özgürce seçebilmeli mi, yoksa devlet bazı adları reddedebilmeli mi? Anne babanın hakkını ve çocuğun çıkarını karşılaştır, bir örnek ver, sınırın nerede olması gerektiğini söyle ve bu adın çocuğun geleceğinde ne anlama geleceğini tahmin et.",
      bulletsTr: [
        "Anne babanın hakkını ve çocuğun çıkarını karşılaştır",
        "Bir örnek ver",
        "Sınırın nerede olması gerektiğini söyle",
        "Adın çocuğun geleceğinde ne anlama geleceğini tahmin et",
      ],
      targets: [
        { de: "Der Name gehört am Ende nicht den Eltern, sondern …", tr: "Ad sonunda anne babaya değil …'e aittir" },
        { de: "Ein Beispiel dafür ist …", tr: "Buna bir örnek …" },
        { de: "Die Grenze würde ich dort ziehen, wo …", tr: "Sınırı … yerde çizerdim" },
        { de: "In zwanzig Jahren wird das Kind wohl …", tr: "Yirmi yıl sonra çocuk muhtemelen …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Eltern haben gute Gründe, einen Namen selbst auszusuchen: Mit einem Namen erzählen sie etwas über ihre " +
        "Familie, ihre Sprache oder einen Menschen, den sie lieben. Trotzdem gehört der Name am Ende nicht den " +
        "Eltern, sondern dem Kind. " +
        "Ein Beispiel dafür ist eine Bekannte von mir, die ihren Sohn nach einem Sänger benannt hat, den sie mit " +
        "zwanzig verehrt hat. Heute ist der Junge zwölf, niemand in seiner Klasse kennt diesen Sänger, und er " +
        "muss seinen Namen fast jeden Tag erklären. Verbieten würde ich so etwas trotzdem nicht. " +
        "Die Grenze würde ich dort ziehen, wo ein Name das Kind offensichtlich lächerlich macht oder gar nicht " +
        "als Name erkennbar ist. Alles andere ist Geschmackssache, und über Geschmack sollte kein Amt entscheiden. " +
        "In zwanzig Jahren wird das Kind wohl selbst Bewerbungen schreiben. Bis dahin wird es sich hoffentlich an " +
        "seinen Namen gewöhnt haben, oder es wird wenigstens eine gute Geschichte dazu erzählen können.",
      rubricHint:
        "Anne baba hakkı ile çocuğun çıkarının tartılması, somut bir örnek, açık bir sınır ve bir tahmin beklenir; Futur I ve II („wird … wohl“, „wird sich … gewöhnt haben“) kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g19",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Er wird es vergessen haben",
    genre: "grammar",
    intro: "„werden“ yalnız geleceği anlatmaz: tamamlanmış bir geleceği ve „wohl“ ile bugüne ya da geçmişe dair bir tahmini de kurar.",
    focus: "Futur I ve Futur II: gelecek, tamamlanmış gelecek ve „wohl“ ile tahmin",
    gloss: [
      { de: "der Name", tr: "isim", en: "name" },
      { de: "steigen", tr: "yükselmek", en: "to rise" },
      { de: "vergessen", tr: "unutmak", en: "to forget" },
      { de: "sich gewöhnen", tr: "alışmak", en: "to get used to" },
      { de: "das Paket", tr: "paket", en: "package" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Futur I: werden + mastar",
        tr: "Futur I, „werden“ + mastar ile kurulur. Almancada gelecek çoğu zaman şimdiki zamanla anlatılır („Morgen regnet es“); Futur I özellikle bir TAHMİN, bir söz ya da bir kararlılık vurgulanacaksa seçilir. Yan cümlede çekimli „werden“ en sona gider.",
        examples: [
          { de: "Die Zahl der Doppelnamen wird weiter steigen.", tr: "Çift soyadlarının sayısı artmaya devam edecek.", note: "tahmin" },
          { de: "Ich werde dich morgen früh anrufen.", tr: "Seni yarın sabah arayacağım.", note: "söz" },
          { de: "Ich glaube, dass sich die Oma bald an den Namen gewöhnen wird.", tr: "Büyükannenin bu isme yakında alışacağını düşünüyorum.", note: "yan cümle: wird sonda" },
        ],
      },
      {
        heading: "Futur II: werden + Partizip + haben/sein",
        tr: "Futur II, gelecekteki bir noktada TAMAMLANMIŞ olacak bir eylemi anlatır. Kuruluş: „werden“ + Partizip II + „haben“ ya da „sein“ (Perfekt'te hangisi alınıyorsa). Zaman noktası çoğunlukla „bis“ ile verilir.",
        examples: [
          { de: "Bis Juni wird das Team die Regeln getestet haben.", tr: "Haziran'a kadar ekip kuralları denemiş olacak.", note: "testen → haben" },
          { de: "Bis Mitternacht werden alle Gäste gegangen sein.", tr: "Gece yarısına kadar bütün konuklar gitmiş olacak.", note: "gehen → sein" },
          { de: "In zehn Jahren wird man sich an den Namen gewöhnt haben.", tr: "On yıl sonra bu isme alışılmış olacak.", note: "dönüşlü fiil" },
        ],
      },
      {
        heading: "wohl ile tahmin: bugün ve geçmiş",
        tr: "„werden“ + „wohl“ (ya da „sicher“, „vermutlich“) çoğu zaman gelecek değil, bugüne ya da geçmişe dair bir TAHMİN bildirir. Bugün için Futur I („Sie wird wohl im Büro sein“ = muhtemelen büroda), geçmiş için Futur II („Er wird es wohl vergessen haben“ = herhalde unutmuştur) kullanılır. Öznel modal fiillerden farkı: burada kesinlik derecesini modal fiil değil „wohl“ taşır.",
        examples: [
          { de: "Sie ist nicht da. Sie wird wohl noch im Büro sein.", tr: "Burada değil. Muhtemelen hâlâ büroda.", note: "bugüne dair tahmin" },
          { de: "Er wird den Termin wohl vergessen haben.", tr: "Randevuyu herhalde unutmuştur.", note: "geçmişe dair tahmin" },
          { de: "Das Paket wird wohl schon angekommen sein.", tr: "Paket muhtemelen çoktan gelmiştir.", note: "sein ile" },
        ],
      },
    ],
    questions: [
      {
        text: "Bis Juni ___ das Team die Regeln getestet haben.",
        options: ["hat", "wird", "würde"],
        answer: 1,
        explain: "Futur II: wird + Partizip II + haben.",
      },
      {
        text: "„Er wird den Termin wohl vergessen haben.“ — Was bedeutet das?",
        options: [
          "Er wird den Termin bald vergessen.",
          "Er hat den Termin sicher nicht vergessen.",
          "Wahrscheinlich hat er den Termin vergessen.",
        ],
        answer: 2,
        explain: "„wohl“ ile Futur II geçmişe dair bir tahmindir: muhtemelen unuttu.",
      },
      {
        text: "Welcher Satz steht im Futur II?",
        options: [
          "Bis Mitternacht werden alle gegangen sein.",
          "Morgen werden alle früher gehen.",
          "Alle sind schon nach Hause gegangen.",
        ],
        answer: 0,
        explain: "werden + Partizip II („gegangen“) + sein: Futur II.",
      },
      {
        kind: "gapfill",
        text: "Ich glaube, dass sich die Oma bald an den Namen gewöhnen ___.",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "Yan cümlede çekimli „werden“ en sona gider: gewöhnen wird.",
      },
      {
        kind: "gapfill",
        text: "Bis Mitternacht werden alle Gäste gegangen ___.",
        options: [],
        answer: 0,
        accept: ["sein"],
        explain: "„gehen“ Perfekt'te sein alır; Futur II'de de sein gelir.",
      },
      {
        kind: "gapfill",
        text: "In zehn Jahren wird man sich an den Namen gewöhnt ___.",
        options: [],
        answer: 0,
        accept: ["haben"],
        explain: "„sich gewöhnen“ Perfekt'te haben alır: gewöhnt haben.",
      },
      {
        kind: "gapfill",
        text: "Sie ist nicht da. Sie ___ wohl noch im Büro sein.",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "Bugüne dair tahmin: wird + wohl + mastar.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Das Paket", "wird", "wohl schon", "angekommen", "sein"],
        explain: "„wird“ ikinci sırada; Partizip ve „sein“ cümlenin sonunda.",
      },
      {
        kind: "truefalse",
        text: "„Bis Juni werden wir die Regeln getestet sein.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„testen“ Perfekt'te haben alır: „getestet haben“.",
      },
      {
        kind: "truefalse",
        text: "„Er wird wohl krank sein.“ — Bu cümle bugüne dair bir tahmin mi?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„wird wohl“ + mastar gelecek değil, şu anki durum hakkında bir tahmindir.",
      },
    ],
  },
];
