import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 15.
 *
 * B2 hücresini YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 15 gece ve ışık hattı: sokak lambalarını gece kısan bir kasabanın
 * bir yıllık bilançosu, bir yıldız parkında gece rehberiyle söyleşi, bahçe
 * projektörü yüzünden komşuya mektup. Dil bilgisi karşıtlık (adversatif)
 * bağlaçları — karşıtlık anlamında während, wohingegen, dagegen, stattdessen,
 * jedoch; obwohl/trotzdem gibi ödün değil, karşılaştırma.
 */
export const deB2P15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r15",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Ab eins wird es dunkel",
    genre: "report",
    intro: "Yerel bir haber: bir kasaba geceleri sokak lambalarını söndürüyor; bir yılın sonunda ne kazanıldı, kim itiraz etti, ne düzeltildi.",
    gloss: [
      { de: "die Laterne", tr: "sokak lambası", en: "street lamp" },
      { de: "der Befürworter", tr: "destekçi", en: "supporter" },
      { de: "die Spätschicht", tr: "akşam vardiyası", en: "evening shift" },
      { de: "widerlegen", tr: "çürütmek", en: "to refute" },
      { de: "nachbessern", tr: "sonradan düzeltmek", en: "to rework" },
      { de: "der Bewegungsmelder", tr: "hareket sensörü", en: "motion sensor" },
    ],
    minutes: 8,
    text:
      "Ab eins wird es dunkel\n\n" +
      "Seit einem Jahr gehen in Lindach nachts die Lichter aus — nicht alle, aber die meisten. Zwischen " +
      "ein und fünf Uhr brennen in den Wohnstraßen keine Laternen mehr, wohingegen die Hauptstraße, die " +
      "Unterführung am Bahnhof und die Wege zur Klinik weiter beleuchtet sind.\n\n" +
      "Die Bilanz der Gemeinde fällt nüchtern aus. Die Stromkosten für die Straßenbeleuchtung sind um ein " +
      "Drittel gesunken, das sind rund achtzehntausend Euro im Jahr. Während die Befürworter vor allem mit " +
      "diesem Geld argumentiert hatten, spielte es in der Debatte bald kaum noch eine Rolle.\n\n" +
      "Gestritten wurde stattdessen über Sicherheit. Mehrere Frauen, die nachts aus der Spätschicht kommen, " +
      "schrieben an den Bürgermeister, sie fühlten sich auf dem dunklen Heimweg unwohl. Die Polizei meldet " +
      "dagegen keine Zunahme von Einbrüchen oder Überfällen. Beides kann gleichzeitig stimmen: Ein Gefühl " +
      "lässt sich mit einer Statistik nicht widerlegen.\n\n" +
      "Die Gemeinde hat deshalb nachgebessert. Auf drei Wegen, die viele Schichtarbeiterinnen nehmen, gibt " +
      "es jetzt Laternen mit Bewegungsmeldern. Sie bleiben dunkel, bis jemand kommt, und schalten sich nach " +
      "zwei Minuten wieder aus.\n\n" +
      "Überrascht hat jedoch etwas anderes: Seit dem Frühjahr kommen Hobbyastronomen aus der ganzen Region, " +
      "weil der Himmel über Lindach wieder voller Sterne ist. Der Bürgermeister, der am Anfang eher " +
      "skeptisch war, spricht inzwischen gern vom „dunkelsten Ort im Landkreis“.",
    questions: [
      {
        text: "Welche Wege bleiben nachts beleuchtet?",
        options: [
          "alle Wohnstraßen im Zentrum",
          "die Hauptstraße und wichtige Wege",
          "nur die Straßen mit Geschäften",
        ],
        answer: 1,
        explain: "„wohingegen die Hauptstraße, die Unterführung am Bahnhof und die Wege zur Klinik weiter beleuchtet sind“.",
      },
      {
        text: "Worüber wurde in Lindach vor allem gestritten?",
        options: [
          "über die Sicherheit auf dem Heimweg",
          "über die Höhe der Stromkosten",
          "über die Arbeit der Polizei",
        ],
        answer: 0,
        explain: "Para kısa sürede önemini yitirdi; „Gestritten wurde stattdessen über Sicherheit.“",
      },
      {
        kind: "truefalse",
        text: "Die Polizei hat seit der Abschaltung mehr Einbrüche gezählt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Die Polizei meldet dagegen keine Zunahme von Einbrüchen oder Überfällen.“",
      },
      {
        kind: "gapfill",
        text: "Die Gemeinde spart rund ___ Euro im Jahr.",
        options: [],
        answer: 0,
        accept: ["achtzehntausend", "18.000", "18000"],
        explain: "„das sind rund achtzehntausend Euro im Jahr“.",
      },
      {
        kind: "short_answer",
        text: "Wann schalten sich die Laternen mit Bewegungsmelder wieder aus?",
        options: [],
        answer: 0,
        accept: ["nach zwei Minuten", "nach 2 Minuten", "zwei Minuten später", "zwei Minuten", "nach zwei Minuten wieder"],
        explain: "„und schalten sich nach zwei Minuten wieder aus“.",
      },
      {
        text: "Warum kommen seit dem Frühjahr Hobbyastronomen nach Lindach?",
        options: [
          "weil die Gemeinde eine Sternwarte gebaut hat",
          "weil der Bürgermeister sie eingeladen hat",
          "weil man dort wieder viele Sterne sieht",
        ],
        answer: 2,
        explain: "„weil der Himmel über Lindach wieder voller Sterne ist“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l15",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Nachts im Sternenpark",
    genre: "interview",
    intro: "Radyo söyleşisi: bir yıldız parkında gece turları yapan bir rehber, karanlığın neden korunduğunu ve bölgede yaşayanlardan ne istendiğini anlatıyor.",
    gloss: [
      { de: "mit bloßem Auge", tr: "çıplak gözle", en: "with the naked eye" },
      { de: "umrüsten", tr: "dönüştürmek", en: "to retrofit" },
      { de: "der Strahler", tr: "projektör", en: "floodlight" },
      { de: "anlocken", tr: "cezbetmek", en: "to attract" },
      { de: "die Erschöpfung", tr: "bitkinlik", en: "exhaustion" },
      { de: "die Taschenlampe", tr: "el feneri", en: "torch" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Moderator", text: "Frau Albers, Sie führen Besucher nachts durch einen Sternenpark. Was unterscheidet so einen Park von einem ganz normalen Wald?" },
      { speaker: "Frau Albers", text: "Auf den ersten Blick nichts. Der Unterschied liegt über uns: Der Himmel ist hier so dunkel, dass man mit bloßem Auge mehrere tausend Sterne sieht, während es in der Stadt oft nur ein paar Dutzend sind." },
      { speaker: "Moderator", text: "Müssen die Menschen, die hier wohnen, dafür auf etwas verzichten?" },
      { speaker: "Frau Albers", text: "Kaum. Sie sollen nicht im Dunkeln sitzen, sondern ihre Lampen anders einsetzen: nach unten gerichtet, mit warmem Licht und nicht die ganze Nacht. Die Gemeinden haben ihre Straßenlaternen schon umgerüstet." },
      { speaker: "Moderator", text: "Und die privaten Haushalte?" },
      { speaker: "Frau Albers", text: "Da geht es nur mit Überzeugung, ein Gesetz gibt es dafür nicht. Wir bieten eine kostenlose Beratung an. Viele merken dabei erst, dass ihr Strahler im Garten bis ins Schlafzimmer der Nachbarn leuchtet." },
      { speaker: "Moderator", text: "Warum ist Dunkelheit überhaupt schützenswert?" },
      { speaker: "Frau Albers", text: "Wegen der Insekten zum Beispiel. Eine einzige Lampe kann in einer Sommernacht Hunderte anlocken, die dann bis zur Erschöpfung um sie kreisen. Auch Zugvögel verlieren über hell erleuchteten Städten die Orientierung." },
      { speaker: "Moderator", text: "Wie reagieren die Besucher bei Ihren Führungen?" },
      { speaker: "Frau Albers", text: "Viele sind erst einmal still. Neulich hat eine Frau geweint, weil sie mit sechzig zum ersten Mal die Milchstraße gesehen hat. Kinder dagegen wollen sofort wissen, wie weit das alles weg ist." },
      { speaker: "Moderator", text: "Was sollte man mitbringen, wenn man mitkommen möchte?" },
      { speaker: "Frau Albers", text: "Warme Kleidung, auch im Sommer, und Geduld. Die Augen brauchen etwa zwanzig Minuten, bis sie sich an die Dunkelheit gewöhnt haben. Taschenlampen bitte nur mit rotem Licht, sonst beginnt alles von vorn." },
    ],
    questions: [
      {
        text: "Wie viele Sterne sieht man im Sternenpark mit bloßem Auge?",
        options: ["ein paar Dutzend", "mehrere tausend", "etwa zwanzig"],
        answer: 1,
        explain: "„dass man mit bloßem Auge mehrere tausend Sterne sieht“; birkaç düzine şehirde görülenler.",
      },
      {
        text: "Was sollen die Bewohner mit ihren Lampen tun?",
        options: [
          "sie anders einsetzen, etwa nach unten gerichtet",
          "sie ab zehn Uhr abends ganz ausschalten",
          "sie nur noch am Wochenende benutzen",
        ],
        answer: 0,
        explain: "Karanlıkta oturmaları istenmiyor; lambalar aşağı dönük, sıcak ışıklı ve bütün gece yanmayacak.",
      },
      {
        kind: "truefalse",
        text: "Eine einzige Lampe kann in einer Sommernacht Hunderte Insekten anlocken.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Eine einzige Lampe kann in einer Sommernacht Hunderte anlocken.“",
      },
      {
        kind: "gapfill",
        text: "Die Augen brauchen etwa ___ Minuten, um sich an die Dunkelheit zu gewöhnen.",
        options: [],
        answer: 0,
        accept: ["zwanzig", "20"],
        explain: "„Die Augen brauchen etwa zwanzig Minuten.“",
      },
      {
        kind: "short_answer",
        text: "Welches Licht dürfen die Taschenlampen haben?",
        options: [],
        answer: 0,
        accept: ["rotes Licht", "nur rotes Licht", "rot", "Rot", "mit rotem Licht", "nur mit rotem Licht"],
        explain: "„Taschenlampen bitte nur mit rotem Licht.“",
      },
      {
        text: "Warum hat eine Besucherin geweint?",
        options: [
          "weil sie sich im Dunkeln verlaufen hatte",
          "weil ihr die Führung zu lang war",
          "weil sie zum ersten Mal die Milchstraße sah",
        ],
        answer: 2,
        explain: "„weil sie mit sechzig zum ersten Mal die Milchstraße gesehen hat“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w15",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Der Strahler im Hof",
    genre: "letter",
    intro: "Komşunun yeni projektörü bütün gece yatak odana vuruyor: önce iki cümle kur, sonra kibar ama açık bir mektup yaz.",
    gloss: [
      { de: "der Strahler", tr: "projektör", en: "floodlight" },
      { de: "der Bewegungsmelder", tr: "hareket sensörü", en: "motion sensor" },
      { de: "blenden", tr: "gözü kamaştırmak", en: "to dazzle" },
      { de: "ausrichten", tr: "yönlendirmek", en: "to point" },
      { de: "der Rollladen", tr: "panjur", en: "roller shutter" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Eski lamba yalnız hareket olunca yanarken yenisi bütün gece yanıyor.",
        answer: "Während die alte Lampe nur bei Bewegung anging, leuchtet die neue die ganze Nacht.",
        alternatives: ["Die neue leuchtet die ganze Nacht, während die alte Lampe nur bei Bewegung anging."],
        hint: "Karşıtlık bildiren „während“ yan cümle kurar ve fiili sona atar; arkasındaki ana cümle fiille başlar: leuchtet die neue.",
      },
      {
        kind: "build",
        tr: "Lambanın kapalı olması gerekmiyor; bunun yerine bir hareket sensörü takılabilir.",
        answer: "Die Lampe muss nicht aus sein; stattdessen könnte man einen Bewegungsmelder anbringen.",
        alternatives: ["Die Lampe muss nicht aus sein; man könnte stattdessen einen Bewegungsmelder anbringen."],
        hint: "„stattdessen“ bir zarftır: birinci konumdaysa arkasından hemen çekimli fiil gelir (stattdessen könnte man).",
      },
      {
        kind: "free",
        prompt:
          "Komşun Herr Brandt'a mektup yaz: sorunu ve ne zamandan beri sürdüğünü anlat, sana ve ailene etkisini söyle, iki somut çözüm öner ve yüz yüze konuşmayı teklif et.",
        checklist: [
          "Sorunu ve ne zamandan beri sürdüğünü anlat",
          "Sana ve ailene etkisini söyle",
          "İki somut çözüm öner",
          "Kibar bir kapanışla konuşmayı teklif et",
        ],
        minWords: 120,
        phrases: [
          { de: "Seit … ist es bei uns nachts …", tr: "…'den beri bizde geceleri …", en: "Since …, it has been … at our place at night." },
          { de: "Ich verstehe gut, dass Sie …", tr: "…'i çok iyi anlıyorum.", en: "I fully understand that you …" },
          { de: "Stattdessen könnte man …", tr: "Bunun yerine … yapılabilir.", en: "Instead, one could …" },
          { de: "Eine zweite Möglichkeit wäre, … zu …", tr: "İkinci bir seçenek … olurdu.", en: "A second option would be to …" },
          { de: "Vielleicht können wir … kurz darüber sprechen?", tr: "Belki … bunu kısaca konuşabiliriz?", en: "Perhaps we could talk about it briefly …?" },
        ],
        sample:
          "Lieber Herr Brandt, seit Sie vor drei Wochen den neuen Strahler im Hof angebracht haben, ist es bei uns " +
          "nachts im Schlafzimmer fast so hell wie am Tag. Während die alte Lampe nur bei Bewegung anging, leuchtet " +
          "die neue die ganze Nacht, und sie ist so ausgerichtet, dass sie direkt in unser Fenster blendet. Unsere " +
          "Tochter wacht seitdem mehrmals auf, und auch ich schlafe deutlich schlechter. " +
          "Ich verstehe gut, dass Sie sich einen hellen Hof wünschen, gerade im Winter. Die Lampe muss auch gar " +
          "nicht aus sein; stattdessen könnte man einen Bewegungsmelder anbringen. Eine zweite Möglichkeit wäre, " +
          "den Strahler etwas weiter nach unten zu richten. Die Kosten dafür würden wir gern mit Ihnen teilen. " +
          "Den Rollladen ganz zu schließen, haben wir schon " +
          "versucht, im Sommer ist das jedoch keine Lösung. " +
          "Vielleicht können wir am Wochenende kurz im Hof darüber sprechen? Viele Grüße, Ihre Nachbarin Sibel Kaya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s15",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Sollten Städte nachts das Licht ausschalten?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: kazancı ve bedeli karşılaştır, kimin etkilendiğini söyle ve bir orta yol öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Şehirler ve kasabalar gece yarısından sonra sokak lambalarını söndürmeli ya da kısmalı mı? Kazancı ve bedeli karşılaştır, en çok kimin etkileneceğini söyle, bir örnek ver ve kendi önerini anlat.",
      bulletsTr: [
        "Kazancı ve bedeli karşılaştır",
        "En çok kimin etkileneceğini söyle",
        "Bir örnek ver",
        "Kendi önerini anlat",
      ],
      targets: [
        { de: "Während die einen …, befürchten die anderen …", tr: "Bir kısmı … derken ötekiler …'den korkuyor" },
        { de: "Dagegen spricht jedoch, dass …", tr: "Ancak buna karşı …" },
        { de: "Ein Beispiel aus meiner Familie: …", tr: "Ailemden bir örnek: …" },
        { de: "Stattdessen würde ich vorschlagen, …", tr: "Bunun yerine … önerirdim" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Während die einen im Abschalten der Straßenlaternen vor allem eine Sparmaßnahme sehen, befürchten die " +
        "anderen, dass die Straßen nachts unsicher werden. Ich glaube, beide Seiten haben teilweise recht. " +
        "Für ein nächtliches Dunkel spricht mehr als nur das Geld: Insekten werden nicht von jeder Lampe " +
        "angelockt, und viele Menschen schlafen besser, wenn es draußen wirklich dunkel ist. " +
        "Dagegen spricht jedoch, dass manche Menschen nachts unterwegs sein müssen, etwa Pflegekräfte oder " +
        "Leute aus der Spätschicht. Ein Beispiel aus meiner Familie: Meine Tante arbeitet im Krankenhaus und " +
        "kommt um halb zwei nach Hause. Auf einer dunklen Straße würde sie lieber ein Taxi nehmen, das sie sich " +
        "aber nicht jede Woche leisten kann. " +
        "Ich würde deshalb nicht alles abschalten. Stattdessen würde ich vorschlagen, die Hauptwege hell zu " +
        "lassen und in den Wohnstraßen Lampen aufzustellen, die nur angehen, wenn jemand kommt, wohingegen " +
        "Parks und Felder ruhig ganz dunkel bleiben dürfen.",
      rubricHint:
        "Kazanç ile bedelin karşılaştırılması, etkilenen somut bir grup ve bir orta yol beklenir; karşıtlık bağlaçları („während“, „wohingegen“, „dagegen“, „stattdessen“, „jedoch“) kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g15",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Gegensatz statt Einräumung: während, dagegen, stattdessen",
    genre: "grammar",
    intro: "İki durumu yan yana koyup karşılaştırmanın araçları: hangisi yan cümle kurar, hangisi fiili öne çeker ve obwohl/trotzdem'den farkları ne.",
    focus: "Karşıtlık (adversatif) bağlaçları: karşıtlık anlamında während, wohingegen, dagegen, stattdessen, jedoch — obwohl/trotzdem gibi ödün (beklentiye rağmen) değil, iki durumu karşılaştırma",
    gloss: [
      { de: "der Gegensatz", tr: "zıtlık", en: "contrast" },
      { de: "der Anwohner", tr: "mahalle sakini", en: "local resident" },
      { de: "die Laterne", tr: "sokak lambası", en: "street lamp" },
      { de: "dimmen", tr: "kısmak", en: "to dim" },
      { de: "die Nebenstraße", tr: "ara sokak", en: "side street" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "während ve wohingegen: yan cümlede karşıtlık",
        tr: "„während“ yalnız zaman bildirmez (-irken); iki durumu karşılaştırırken de kullanılır: „A aydınlıkken B karanlık“. Hangi anlamın kastedildiğini bağlam söyler. „wohingegen“ ise yalnız karşıtlık bildirir ve çoğunlukla ana cümleden SONRA gelir. İkisi de yan cümle kurar: çekimli fiil sona gider.",
        examples: [
          { de: "Während die Hauptstraße hell bleibt, sind die Nebenstraßen dunkel.", tr: "Ana cadde aydınlık kalırken ara sokaklar karanlık.", note: "karşıtlık" },
          { de: "Während ich koche, deckt er den Tisch.", tr: "Ben yemek yaparken o sofrayı kuruyor.", note: "zaman: aynı anda" },
          { de: "Die Stadt spart Strom, wohingegen die Anwohner sich Sorgen machen.", tr: "Şehir elektrikten tasarruf ediyor, sakinler ise endişeleniyor.", note: "fiil sonda" },
        ],
      },
      {
        heading: "dagegen ve jedoch: zarflar",
        tr: "„dagegen“ ve „jedoch“ zarftır, yan cümle kurmaz. Birinci konuma geçerlerse arkalarından doğrudan çekimli fiil gelir; orta alanda da, vurgulanan öğeden hemen sonra da durabilirler. „aber“den farkı: „aber“ sıfır konumdadır ve sırayı değiştirmez („…, aber die Nebenstraßen sind dunkel“).",
        examples: [
          { de: "Im Zentrum brennt das Licht. Dagegen sind die Wohnstraßen dunkel.", tr: "Merkezde ışık yanıyor. Buna karşılık oturma sokakları karanlık.", note: "birinci konumda: fiil hemen arkada" },
          { de: "Die Wohnstraßen dagegen sind ab eins dunkel.", tr: "Oturma sokakları ise saat birden itibaren karanlık.", note: "öğeden sonra: vurgu" },
          { de: "Der Plan klang gut, jedoch fehlte das Geld.", tr: "Plan iyi görünüyordu, ancak para yoktu.", note: "jedoch birinci konumda" },
        ],
      },
      {
        heading: "stattdessen ve obwohl/trotzdem neden ödün bildirir",
        tr: "„stattdessen“ bir şeyin YERİNE başka bir şeyin geldiğini söyler; zarftır ve birinci konumda fiili hemen arkasına çeker. Buraya kadarki araçların hepsi iki durumu karşılaştırır. „obwohl“ ve „trotzdem“ ise bir beklentinin boşa çıktığını söyler: karanlığa rağmen yalnız yürümek bir ödündür, karşıtlık değil.",
        examples: [
          { de: "Die Stadt schaltet die Laternen nicht ab. Stattdessen dimmt sie sie.", tr: "Şehir lambaları söndürmüyor. Bunun yerine ışıklarını kısıyor.", note: "yerine geçen çözüm" },
          { de: "Es ist dunkel, trotzdem geht sie allein nach Hause.", tr: "Hava karanlık, yine de eve yalnız gidiyor.", note: "ödün: beklentiye rağmen" },
          { de: "Obwohl es dunkel ist, fühlt er sich sicher.", tr: "Karanlık olmasına rağmen kendini güvende hissediyor.", note: "ödün, karşıtlık değil" },
        ],
      },
    ],
    questions: [
      {
        text: "Die Hauptstraße bleibt hell, ___ die Nebenstraßen dunkel sind.",
        options: ["wohingegen", "dagegen", "trotzdem"],
        answer: 0,
        explain: "Çekimli fiil sonda („sind“), yani yan cümle bağlacı gerekir: wohingegen.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Im Zentrum ist es hell. Dagegen die Wohnstraßen sind dunkel.",
          "Im Zentrum ist es hell. Dagegen sind die Wohnstraßen dunkel.",
          "Im Zentrum ist es hell. Dagegen die Wohnstraßen dunkel sind.",
        ],
        answer: 1,
        explain: "„dagegen“ birinci konumu doldurur; arkasından çekimli fiil, sonra özne gelir.",
      },
      {
        text: "„Während Anna Tee mag, trinkt ihr Bruder nur Kaffee.“ — Was drückt „während“ hier aus?",
        options: [
          "einen Grund",
          "eine gleichzeitige Handlung",
          "einen Gegensatz",
        ],
        answer: 2,
        explain: "Burada zaman değil iki kişinin farkı anlatılıyor: „während“ karşıtlık bildiriyor.",
      },
      {
        kind: "gapfill",
        text: "Die Stadt schaltet die Laternen nicht ab. ___ dimmt sie sie.",
        options: [],
        answer: 0,
        accept: ["Stattdessen", "stattdessen"],
        explain: "Bir şeyin yerine geleni „stattdessen“ bildirir; arkasından fiil gelir: Stattdessen dimmt sie.",
      },
      {
        kind: "gapfill",
        text: "Im Dorf sieht man tausend Sterne, in der Stadt ___ nur ein paar.",
        options: [],
        answer: 0,
        accept: ["dagegen", "jedoch", "hingegen", "aber"],
        explain: "İkinci kısım ilkiyle karşılaştırılıyor: „dagegen“ (buna karşılık) vurgulanan öğeden sonra durur.",
      },
      {
        kind: "gapfill",
        text: "___ die alte Lampe nur bei Bewegung anging, leuchtet die neue die ganze Nacht.",
        options: [],
        answer: 0,
        accept: ["Während", "während"],
        explain: "Başta yan cümle ve iki lambanın karşılaştırılması var: karşıtlık anlamında „während“.",
      },
      {
        kind: "gapfill",
        text: "Der Plan klang gut, das Geld fehlte ___.",
        options: [],
        answer: 0,
        accept: ["jedoch", "aber", "allerdings"],
        explain: "„jedoch“ orta alanda, cümlenin sonunda da durabilir: … fehlte jedoch.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Die Hauptstraße", "bleibt hell,", "wohingegen", "die Nebenstraßen", "dunkel sind"],
        explain: "„wohingegen“ yan cümle kurar; çekimli fiil „sind“ en sona gider.",
      },
      {
        kind: "truefalse",
        text: "„Obwohl es dunkel ist, geht sie allein nach Hause.“ — Bu cümle bir karşıtlık değil, bir ödün mü bildiriyor?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„obwohl“ bir beklentinin boşa çıktığını söyler: karanlığa rağmen gidiyor. Bu bir ödündür.",
      },
      {
        kind: "truefalse",
        text: "„Stattdessen die Stadt dimmt das Licht.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„stattdessen“ birinci konumdaysa fiil hemen arkasından gelir: Stattdessen dimmt die Stadt das Licht.",
      },
    ],
  },
];
