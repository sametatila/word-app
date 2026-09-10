import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Kalan türler: köşe yazısı, veli toplantısı tartışması ve yönerge metni.
 * Monolog kişisel deneyimle tartışır; dil bilgisi zu'lu mastar, um…zu ve damit.
 */
export const deB1P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r5",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Lob der Langeweile",
    genre: "opinion",
    intro: "Can sıkıntısını savunan kısa bir köşe yazısı okuyacaksın: yazar neyi iddia ediyor, hangi kanıtı kullanıyor, ne öneriyor.",
    gloss: [
      { de: "die Langeweile", tr: "can sıkıntısı", en: "boredom" },
      { de: "aushalten", tr: "dayanmak", en: "to endure" },
      { de: "die Lücke", tr: "boşluk", en: "gap" },
      { de: "der Leerlauf", tr: "boşta kalma", en: "idle time" },
      { de: "das Gehirn", tr: "beyin", en: "brain" },
      { de: "blühen", tr: "çiçek açmak", en: "to bloom" },
      { de: "unangenehm", tr: "rahatsız edici", en: "unpleasant" },
    ],
    minutes: 7,
    text:
      "LOB DER LANGEWEILE\n\n" +
      "Als Kind habe ich im Sommer manchmal eine Stunde auf dem Balkon gesessen, ohne irgendetwas zu tun. " +
      "Es war nicht schön. Es war langweilig, und genau deshalb ist danach etwas passiert: Ich habe angefangen, " +
      "aus alten Zeitschriften eine Stadt zu bauen.\n\n" +
      "Heute ist es fast unmöglich geworden, sich zu langweilen. Zwischen der Haltestelle und dem Bus liegen " +
      "vier Minuten, und diese vier Minuten sind gefüllt. Wir haben gelernt, jede Lücke zu schließen, um sie " +
      "nicht aushalten zu müssen.\n\n" +
      "Wissenschaftler beschreiben, was in solchen Pausen im Kopf passiert. Sobald von außen nichts mehr kommt, " +
      "beginnt das Gehirn, Erlebtes zu ordnen und Neues zu verbinden. Viele kennen das: Die Lösung fällt einem " +
      "unter der Dusche ein, nicht am Schreibtisch. Damit das passiert, braucht es aber Leerlauf.\n\n" +
      "Ich schlage deshalb kein Verbot vor. Ich habe nur eine kleine Regel, um die Sache zu üben: eine Strecke " +
      "am Tag ohne Bildschirm. Der Weg zur Arbeit reicht.\n\n" +
      "Die ersten Tage sind unangenehm. Man greift zehnmal in die Tasche, ohne es zu merken. Nach einer Woche " +
      "aber fällt einem auf, wie viele Läden neu sind, welche Bäume schon blühen und was einem seit Monaten " +
      "durch den Kopf geht, ohne dass man es je zu Ende gedacht hätte.",
    questions: [
      {
        text: "Was ist die These des Textes?",
        options: ["Langeweile hat einen Nutzen.", "Bildschirme sollten verboten werden.", "Kinder spielen heute zu wenig."],
        answer: 0,
        explain: "Başlık „Lob der Langeweile“ ve metin can sıkıntısının ardından ne olduğunu anlatıyor; yasak açıkça reddediliyor.",
      },
      {
        text: "Was passiert laut Text im Kopf, wenn von außen nichts kommt?",
        options: [
          "Das Gehirn ordnet und verbindet.",
          "Das Gehirn schaltet vollständig ab.",
          "Das Gehirn merkt sich Zahlen besser.",
        ],
        answer: 0,
        explain: "„… beginnt das Gehirn, Erlebtes zu ordnen und Neues zu verbinden.“",
      },
      {
        kind: "truefalse",
        text: "Der Autor schlägt ein Verbot vor.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Ich schlage deshalb kein Verbot vor.“ — yerine küçük bir alışkanlık öneriyor.",
      },
      {
        kind: "gapfill",
        text: "Der Autor empfiehlt eine ___ am Tag ohne Bildschirm.",
        options: [],
        answer: 0,
        accept: ["Strecke"],
        explain: "„… eine Strecke am Tag ohne Bildschirm. Der Weg zur Arbeit reicht.“",
      },
      {
        kind: "short_answer",
        text: "Was hat der Autor als Kind gebaut?",
        options: [],
        answer: 0,
        accept: ["eine Stadt", "eine Stadt aus Zeitschriften", "Stadt"],
        explain: "„Ich habe angefangen, aus alten Zeitschriften eine Stadt zu bauen.“",
      },
      {
        text: "Wie beschreibt der Autor die ersten Tage?",
        options: ["unangenehm, aber lohnend", "leicht und von Anfang an angenehm", "gefährlich und sehr stressig"],
        answer: 0,
        explain: "„Die ersten Tage sind unangenehm“ — ama bir hafta sonra kazanılanlar sıralanıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l5",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Der letzte Meter vor dem Schultor",
    genre: "opinion",
    intro: "Veli toplantısında okul önündeki trafik konuşuluyor: sorun ne, kim itiraz ediyor, hangi karar çıkıyor.",
    gloss: [
      { de: "das Schultor", tr: "okul kapısı", en: "school gate" },
      { de: "der Übergang", tr: "geçit", en: "crossing" },
      { de: "die Ampel", tr: "trafik ışığı", en: "traffic light" },
      { de: "beantragen", tr: "başvurmak", en: "to apply for" },
      { de: "aushängen", tr: "asmak", en: "to put up" },
      { de: "verbieten", tr: "yasaklamak", en: "to forbid" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Frau Alt", text: "Kommen wir zum letzten Punkt: der Verkehr vor dem Schultor. Um acht Uhr stehen dort täglich vierzig Autos." },
      { speaker: "Herr Kunze", text: "Ich fahre auch. Ich arbeite ab halb neun in Bergheim, und zu Fuß schafft meine Tochter das nicht." },
      { speaker: "Frau Alt", text: "Das versteht hier jeder. Das Problem ist nicht das Fahren, sondern der letzte Meter. Alle wollen direkt vor dem Tor halten." },
      { speaker: "Frau Sander", text: "Genau. Ich bin Fahrlehrerin, und ich sehe dort jeden Morgen Sachen, die ich meinen Schülern verbieten würde." },
      { speaker: "Herr Kunze", text: "Und was soll ich machen? Eine halbe Stunde früher losfahren?" },
      { speaker: "Frau Sander", text: "Nein. Es gibt den Parkplatz am Sportheim, dreihundert Meter weiter. Die Kinder laufen von dort in vier Minuten." },
      { speaker: "Frau Alt", text: "Damit das funktioniert, brauchen wir zwei Dinge: einen sicheren Übergang und Eltern, die den Anfang machen." },
      { speaker: "Herr Kunze", text: "Wenn die Ampel kommt, mache ich mit. Ohne Ampel schicke ich meine Tochter da nicht über die Straße." },
      { speaker: "Frau Alt", text: "Dann halten wir das so fest: Wir beantragen den Übergang, und ab Mai starten wir mit den Familien, die schon jetzt wollen." },
      { speaker: "Frau Sander", text: "Ich hänge einen Plan aus, damit alle den Weg vom Sportheim kennen." },
    ],
    questions: [
      {
        text: "Worum geht es in der Diskussion?",
        options: [
          "um den Verkehr vor der Schule",
          "um die Anfangszeiten der Schule",
          "um einen neuen Parkplatz für Lehrer",
        ],
        answer: 0,
        explain: "„Kommen wir zum letzten Punkt: der Verkehr vor dem Schultor.“",
      },
      {
        text: "Was ist laut Frau Alt das eigentliche Problem?",
        options: [
          "dass alle direkt am Tor halten",
          "dass die Eltern zu spät kommen",
          "dass es gar keinen Parkplatz gibt",
        ],
        answer: 0,
        explain: "„Das Problem ist nicht das Fahren, sondern der letzte Meter.“",
      },
      {
        kind: "truefalse",
        text: "Frau Sander urteilt aus beruflicher Erfahrung.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Ich bin Fahrlehrerin, und ich sehe dort jeden Morgen Sachen, die ich meinen Schülern verbieten würde.“",
      },
      {
        kind: "short_answer",
        text: "Wie weit ist der Parkplatz am Sportheim entfernt?",
        options: [],
        answer: 0,
        accept: ["dreihundert Meter", "300 Meter", "dreihundert"],
        explain: "„Es gibt den Parkplatz am Sportheim, dreihundert Meter weiter.“",
      },
      {
        kind: "dictation",
        text: "Frau Alt sorunun özünü söylüyor: son cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Alle wollen direkt vor dem Tor halten.", "Alle wollen direkt vor dem Tor halten"],
        explain: "„Alle wollen direkt vor dem Tor halten.“ — modal fiil ikinci, mastar sonda.",
      },
      {
        text: "Unter welcher Bedingung macht Herr Kunze mit?",
        options: [
          "wenn eine Ampel gebaut wird",
          "wenn die Schule später beginnt",
          "wenn andere Eltern zuerst anfangen",
        ],
        answer: 0,
        explain: "„Wenn die Ampel kommt, mache ich mit. Ohne Ampel schicke ich meine Tochter da nicht über die Straße.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w5",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Anleitung für zwei Wochen",
    genre: "guide",
    intro: "Evine iki hafta bakacak birine yönerge yazacaksın; önce iki cümle kur, sonra yönergeyi yaz.",
    gloss: [
      { de: "gießen", tr: "sulamak", en: "to water" },
      { de: "die Mülltonne", tr: "çöp kutusu", en: "bin" },
      { de: "leeren", tr: "boşaltmak", en: "to empty" },
      { de: "der Zweitschlüssel", tr: "yedek anahtar", en: "spare key" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bitkileri sulamak için sadece iki dakikaya ihtiyacın var.",
        answer: "Um die Pflanzen zu gießen, brauchst du nur zwei Minuten.",
        alternatives: ["Du brauchst nur zwei Minuten, um die Pflanzen zu gießen."],
        hint: "„um … zu“ amaç bildirir; başa alınırsa ana cümle doğrudan fiille başlar.",
      },
      {
        kind: "build",
        tr: "Çöp kutusunu salı akşamı çıkarıyorum ki çarşamba boşaltılsın.",
        answer: "Ich stelle die Mülltonne am Dienstagabend raus, damit sie am Mittwoch geleert wird.",
        alternatives: ["Damit sie am Mittwoch geleert wird, stelle ich die Mülltonne am Dienstagabend raus."],
        hint: "İki yarının öznesi farklıysa „um … zu“ değil „damit“ kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Bir arkadaşın iki hafta evine bakacak. Ona yönerge yaz: bitkiler, posta, çöp, bir aletin özel hâli, acil durumda ne yapacağı ve sana nasıl ulaşacağı.",
        checklist: [
          "Bitkiler ve posta için ne yapılacağını yaz",
          "Çöp gününü ve nedenini söyle",
          "Evdeki bir tuhaflığı uyar",
          "Acil durum kişisini ve sana ulaşma yolunu yaz",
        ],
        minWords: 60,
        phrases: [
          { de: "Hier das Wichtigste:", tr: "En önemlisi şu:", en: "Here's the main thing:" },
          { de: "Um … zu …, brauchst du nur …", tr: "… için sadece … gerekiyor", en: "To …, all you need is …" },
          { de: "…, damit …", tr: "… olsun diye …", en: "…, so that …" },
          { de: "Falls etwas kaputtgeht, …", tr: "Bir şey bozulursa …", en: "If something breaks, …" },
          { de: "Schreib mir einfach, statt lange zu überlegen.", tr: "Uzun uzun düşünmek yerine bana yaz.", en: "Just write to me instead of puzzling over it." },
        ],
        sample:
          "Liebe Nour, danke, dass du das machst! Hier das Wichtigste. Um die Pflanzen zu gießen, brauchst du nur " +
          "zwei Minuten: die drei am Fenster einmal pro Woche, den großen Farn im Bad zweimal. Die Post kannst du " +
          "einfach auf dem Küchentisch sammeln, ich sortiere sie später selbst. Ich stelle die Mülltonne am " +
          "Dienstagabend raus, damit sie am Mittwoch geleert wird; wenn du das einmal vergisst, ist es kein Drama. " +
          "Zwei Dinge noch: Der Backofen wird sehr heiß, stell ihn immer zwanzig Grad niedriger ein. Und die " +
          "Wohnungstür fällt zu, nimm den Schlüssel also auch mit, wenn du nur zum Briefkasten gehst. " +
          "Falls etwas kaputtgeht, ruf Herrn Weiss aus dem Erdgeschoss an; er hat Werkzeug und einen " +
          "Zweitschlüssel. Mich erreichst du fast immer abends. Schreib mir einfach, statt lange zu überlegen.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s5",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Lohnt sich eine dritte Sprache?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: kendi deneyiminden yola çıkarak bir soruyu yanıtla.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Üçüncü bir yabancı dil öğrenmeye değer mi? Görüşünü söyle, kendi deneyiminden bir örnek ver ve hangi durumda değmeyeceğini de söyle.",
      bulletsTr: [
        "Sorunun cevabını tek cümleyle ver",
        "Beklenen gerekçe yerine kendi gerekçeni söyle",
        "Kendi deneyiminden somut bir örnek anlat",
        "Hangi durumda değmeyeceğini söyle",
      ],
      targets: [
        { de: "Es lohnt sich, aber nicht deshalb, weil …", tr: "Değer, ama … olduğu için değil" },
        { de: "Der eigentliche Gewinn ist, dass …", tr: "Asıl kazanç … olması" },
        { de: "Man muss allerdings ehrlich sein: …", tr: "Ancak dürüst olmak gerek: …" },
        { de: "Wenn Zeit da ist, würde ich …", tr: "Vakit varsa … yapardım" },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "Ich finde, es lohnt sich, aber nicht deshalb, weil man damit mehr verdient. Der eigentliche Gewinn ist, " +
        "dass man beim dritten Mal weiß, wie Lernen bei einem selbst funktioniert. Deutsch habe ich mühsam " +
        "gelernt, mit langen Listen und mit Angst vor Fehlern. Als ich dann mit Spanisch angefangen habe, war " +
        "ich nach vier Monaten weiter als damals nach einem Jahr, einfach weil ich viel früher zu sprechen " +
        "begonnen habe. Man muss allerdings ehrlich sein: Wer nur zwei Stunden im Monat hat, sollte lieber die " +
        "zweite Sprache festigen, statt eine dritte anzufangen. Wenn Zeit da ist, würde ich aber immer wieder " +
        "anfangen, schon um zu sehen, wie viel schneller es diesmal geht.",
      rubricHint:
        "Kendi deneyiminden somut bir örnek beklenir ve bir sınırlama söylenmelidir; „um … zu“ ve „statt … zu“ yapıları kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g5",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "zu, um … zu oder damit?",
    genre: "grammar",
    intro: "Üç yapı da cümlenin ikinci yarısını taşır; hangisini seçeceğini özne ve amaç belirler.",
    focus: "Infinitiv mit zu · um … zu · damit",
    gloss: [
      { de: "vorhaben", tr: "niyetinde olmak", en: "to intend" },
      { de: "erreichen", tr: "yetişmek", en: "to catch" },
      { de: "vergessen", tr: "unutmak", en: "to forget" },
      { de: "aufschreiben", tr: "not almak", en: "to write down" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "zu'lu mastar",
        tr: "Türkçede mastar eki fiile yapışır: gel-mek, çalış-mak. Almancada mastarın önüne ayrı bir „zu“ gelir ve öbek cümlenin sonunda durur. Ayrılabilen fiillerde „zu“ ortaya girer: anzufangen, mitzukommen.",
        examples: [
          { de: "Ich habe vor, im Sommer nach Kiel zu fahren.", tr: "Yazın Kiel'e gitmeyi düşünüyorum.", note: "vorhaben + zu" },
          { de: "Es macht Spaß, mit Kindern zu arbeiten.", tr: "Çocuklarla çalışmak keyifli." },
          { de: "Vergiss nicht, das Fenster zuzumachen.", tr: "Pencereyi kapatmayı unutma.", note: "zu ortada" },
        ],
      },
      {
        heading: "um … zu: amaç, aynı özne",
        tr: "Bir işi NİÇİN yaptığını söylerken, iki yarının öznesi AYNIYSA „um … zu“ kullanılır. Türkçedeki „-mek için“ karşılığıdır.",
        examples: [
          { de: "Ich rufe an, um einen Termin zu bekommen.", tr: "Randevu almak için arıyorum." },
          { de: "Er geht früher, um den Zug zu erreichen.", tr: "Trene yetişmek için erken çıkıyor." },
          { de: "Sie spart, um ein Auto zu kaufen.", tr: "Araba almak için para biriktiriyor." },
        ],
      },
      {
        heading: "damit: amaç, farklı özne",
        tr: "İkinci yarının öznesi başkasıysa „um … zu“ olmaz, „damit“ gerekir. „damit“ bir yan cümle açar, yani çekimli fiil sona gider.",
        examples: [
          { de: "Ich spreche langsam, damit mich alle verstehen.", tr: "Herkes anlasın diye yavaş konuşuyorum.", note: "özneler farklı" },
          { de: "Ich schreibe es auf, damit ich es nicht vergesse.", tr: "Unutmayayım diye not alıyorum.", note: "aynı özne de olabilir" },
          { de: "Sie erklärt es noch einmal, damit keine Frage offen bleibt.", tr: "Soru kalmasın diye bir daha açıklıyor." },
        ],
      },
    ],
    questions: [
      {
        text: "Ich habe vor, im Sommer nach Kiel ___.",
        options: ["zu fahren", "fahren", "zu fahre"],
        answer: 0,
        explain: "„vorhaben“ zu'lu mastar ister ve mastar çekilmez: zu fahren.",
      },
      {
        text: "Ich rufe an, ___ einen Termin zu bekommen.",
        options: ["um", "damit", "dass"],
        answer: 0,
        explain: "Amaç var ve iki yarının öznesi aynı: um … zu.",
      },
      {
        text: "Ich schreibe es auf, ___ ich es nicht vergesse.",
        options: ["damit", "um", "zu"],
        answer: 0,
        explain: "Arkasından çekimli bir fiil geliyor, mastar değil; bu durumda damit kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Vergiss nicht, das Fenster ___ (zumachen).",
        options: [],
        answer: 0,
        accept: ["zuzumachen"],
        explain: "Ayrılabilen fiilde „zu“ ön ekle kökün arasına girer: zu-zu-machen.",
      },
      {
        kind: "gapfill",
        text: "Er geht früher, ___ den Zug zu erreichen.",
        options: [],
        answer: 0,
        accept: ["um"],
        explain: "Aynı kişi hem erken çıkıyor hem trene yetişiyor: um … zu.",
      },
      {
        kind: "gapfill",
        text: "Ich spreche langsam, ___ mich alle verstehen.",
        options: [],
        answer: 0,
        accept: ["damit"],
        explain: "İkinci yarının öznesi „alle“, yani farklı: damit.",
      },
      {
        kind: "gapfill",
        text: "Es macht Spaß, mit Kindern ___ (arbeiten).",
        options: [],
        answer: 0,
        accept: ["zu arbeiten"],
        explain: "„Es macht Spaß“ kalıbı zu'lu mastar ister.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "hoffe", "bald", "wieder", "zu", "kommen"],
        explain: "Zu'lu mastar öbeği cümlenin sonunda durur: Ich hoffe, bald wieder zu kommen.",
      },
      {
        kind: "truefalse",
        text: "„Ich lerne Deutsch, um meine Kinder besser zu verstehen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Amaç bildiriliyor ve iki yarının öznesi aynı kişi; um … zu doğru kullanılmış.",
      },
      {
        kind: "truefalse",
        text: "„Ich schreibe es auf, um ich es nicht vergesse.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„um“ mastar ister, çekimli fiil alamaz; doğrusu „damit ich es nicht vergesse“.",
      },
    ],
  },
];
