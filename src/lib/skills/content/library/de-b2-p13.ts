import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 13.
 *
 * B2 hücresini YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 13 kültür ve müze hattı: halkın getirdiği eşyalarla kurulan bir
 * sergi, sokak fotoğrafçısıyla bir podcast söyleşisi, bir kültür blogu için
 * sergi eleştirisi. Dil bilgisi Dativ'de dönüşlü zamir — sich etwas
 * vorstellen, leisten, merken, ansehen: mich mi, mir mi.
 */
export const deB2P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r13",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Dreihundert Dinge und ihre Geschichten",
    genre: "report",
    intro: "Bir şehir müzesi halktan birer eşya ve hikâyesini istedi: sergi nasıl oldu, hangi eleştiri geldi, müdür ne cevap veriyor.",
    gloss: [
      { de: "der Gegenstand", tr: "nesne", en: "object" },
      { de: "ausstellen", tr: "sergilemek", en: "to exhibit" },
      { de: "der Vorwurf", tr: "suçlama", en: "accusation" },
      { de: "die Auswahl", tr: "seçim", en: "selection" },
      { de: "der Besitzer", tr: "sahip", en: "owner" },
      { de: "die Fachleute", tr: "uzmanlar", en: "experts" },
    ],
    minutes: 8,
    text:
      "Dreihundert Dinge und ihre Geschichten\n\n" +
      "Als das Stadtmuseum Weilburg im Frühjahr alle Bürgerinnen und Bürger bat, einen Gegenstand " +
      "mit einer persönlichen Geschichte vorbeizubringen, rechnete die Leiterin mit fünfzig " +
      "Antworten. Es kamen über dreihundert.\n\n" +
      "Jetzt liegen sie in drei Räumen: eine Kaffeemühle, die eine Familie 1962 aus Anatolien " +
      "mitgebracht hat, der Schlüssel eines Ladens, den es nicht mehr gibt, ein Fußballtrikot, " +
      "das ein Junge seinem kranken Nachbarn geschenkt hatte. Neben jedem Gegenstand hängt ein " +
      "Text, geschrieben von dem Menschen, der ihn gebracht hat.\n\n" +
      "Nicht alle sind begeistert. Ein Kollege aus einem anderen Museum nennt das Projekt " +
      "„einen Flohmarkt mit Beschriftung“. Tatsächlich hat niemand geprüft, ob die Geschichten " +
      "stimmen, und eine Auswahl gab es nicht: Wer etwas brachte, wurde ausgestellt.\n\n" +
      "Die Leiterin kennt den Vorwurf. „Wir haben keinen Experten gefragt, was wichtig ist. " +
      "Wir haben die Leute gefragt, was ihnen wichtig ist. Das ist eine andere Frage, und sie " +
      "hat eine andere Antwort.“\n\n" +
      "Die Zahlen geben ihr zumindest teilweise recht. Die Ausstellung hatte in zwei Monaten " +
      "mehr Besucher als das Museum sonst im ganzen Jahr, und viele kamen mehrmals, oft mit " +
      "Verwandten. Ein Praktikant hat beobachtet, dass die Leute vor den Texten länger stehen " +
      "bleiben als vor den Gegenständen.\n\n" +
      "Offen bleibt, was nach dem Ende passiert. Die meisten Dinge gehen zurück an ihre " +
      "Besitzer. Etwa zwanzig will das Museum behalten — ausgewählt, diesmal, von Fachleuten.",
    questions: [
      {
        text: "Womit hatte die Leiterin des Museums gerechnet?",
        options: [
          "mit etwa fünfzig Antworten",
          "mit über dreihundert Antworten",
          "mit fast keiner Antwort",
        ],
        answer: 0,
        explain: "„rechnete die Leiterin mit fünfzig Antworten. Es kamen über dreihundert.“",
      },
      {
        text: "Was steckt hinter dem Ausdruck „Flohmarkt mit Beschriftung“?",
        options: [
          "Die Räume sind zu klein und zu voll.",
          "Die Gegenstände werden auch verkauft.",
          "Nichts wurde ausgewählt oder geprüft.",
        ],
        answer: 2,
        explain: "Hikâyeleri kimse denetlemedi ve seçim yapılmadı: getirilen her şey sergilendi.",
      },
      {
        kind: "truefalse",
        text: "Die Besucher bleiben vor den Texten länger stehen als vor den Gegenständen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Bir stajyer tam bunu gözlemlemiş.",
      },
      {
        kind: "gapfill",
        text: "Die Ausstellung hatte in zwei ___ mehr Besucher als das Museum sonst im ganzen Jahr.",
        options: [],
        answer: 0,
        accept: ["Monaten"],
        explain: "„in zwei Monaten mehr Besucher als das Museum sonst im ganzen Jahr“.",
      },
      {
        kind: "short_answer",
        text: "Wer wählt die Dinge aus, die das Museum behalten will?",
        options: [],
        answer: 0,
        accept: ["Fachleute", "die Fachleute", "Experten", "die Experten", "von Fachleuten", "von Experten"],
        explain: "Son cümle: bu sefer seçimi uzmanlar yapacak.",
      },
      {
        text: "Wie antwortet die Leiterin auf die Kritik?",
        options: [
          "Sie gibt zu, dass das Projekt gescheitert ist.",
          "Sie sagt, dass sie eine andere Frage gestellt hat.",
          "Sie will künftig nur noch Experten fragen.",
        ],
        answer: 1,
        explain: "Neyin önemli olduğunu değil, insanlar için neyin önemli olduğunu sormuşlar.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l13",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Erst das Bild, dann die Frage",
    genre: "interview",
    intro: "Bir podcast söyleşisi: sokakta yabancıları fotoğraflayan biri, izin sormayı neden ve nasıl değiştirdiğini anlatıyor.",
    gloss: [
      { de: "der Fotograf", tr: "fotoğrafçı", en: "photographer" },
      { de: "die Einwilligung", tr: "rıza", en: "consent" },
      { de: "erkennen", tr: "tanımak", en: "to recognize" },
      { de: "löschen", tr: "silmek", en: "to delete" },
      { de: "einverstanden", tr: "hemfikir", en: "agreed" },
      { de: "ansprechen", tr: "hitap etmek", en: "to approach" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Moderator", text: "Herr Sommer, Sie fotografieren seit zwanzig Jahren fremde Menschen auf der Straße. Fragen Sie eigentlich vorher?" },
      { speaker: "Herr Sommer", text: "Heute frage ich immer, nur nicht unbedingt vorher. Früher habe ich einfach abgedrückt. Ein gutes Bild entsteht in einer Sekunde, und wer erst fragt, verliert diese Sekunde." },
      { speaker: "Moderator", text: "Was hat Ihre Meinung geändert?" },
      { speaker: "Herr Sommer", text: "Ein Erlebnis vor acht Jahren. Ich hatte einen älteren Herrn auf einer Parkbank fotografiert, das Bild wurde in einer Ausstellung gezeigt, und seine Tochter hat ihn dort erkannt." },
      { speaker: "Herr Sommer", text: "Er war damals schon sehr krank, und die Familie wollte nicht, dass man ihn so sieht. Sie hatte völlig recht." },
      { speaker: "Moderator", text: "Aber verlieren Sie dadurch nicht genau das, was Straßenfotografie ausmacht?" },
      { speaker: "Herr Sommer", text: "Manchmal. Deshalb mache ich es inzwischen so: Ich fotografiere zuerst und spreche die Person dann sofort an. Wer nicht einverstanden ist, sieht zu, wie ich das Bild lösche." },
      { speaker: "Moderator", text: "Wie oft sagen die Leute Nein?" },
      { speaker: "Herr Sommer", text: "Seltener, als man denkt, vielleicht jeder Zehnte. Die meisten wollen das Bild sogar haben, und ich schicke es ihnen." },
      { speaker: "Moderator", text: "Und wie sieht es rechtlich aus?" },
      { speaker: "Herr Sommer", text: "Für eine Ausstellung brauche ich eine schriftliche Einwilligung. Ohne die zeige ich kein Gesicht, auch wenn es das beste Bild des Jahres ist." },
      { speaker: "Moderator", text: "Letzte Frage: Gibt es ein Bild, das Sie bereuen?" },
      { speaker: "Herr Sommer", text: "Keins, das ich gemacht habe. Aber eins, das ich gezeigt habe, ohne zu fragen. Es hängt nirgends mehr, und das ist gut so." },
    ],
    questions: [
      {
        text: "Warum hat Herr Sommer früher nicht gefragt?",
        options: [
          "weil es damals verboten war",
          "weil die Leute meistens ablehnten",
          "weil sonst der Moment verloren ging",
        ],
        answer: 2,
        explain: "„wer erst fragt, verliert diese Sekunde“ — iyi fotoğraf bir saniyede oluşuyor.",
      },
      {
        text: "Wer hat den älteren Herrn in der Ausstellung erkannt?",
        options: ["seine Frau", "seine Tochter", "sein Arzt"],
        answer: 1,
        explain: "„seine Tochter hat ihn dort erkannt“.",
      },
      {
        kind: "truefalse",
        text: "Heute fragt Herr Sommer die Leute, bevor er abdrückt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Önce çekiyor, sonra hemen soruyor: „nur nicht unbedingt vorher“.",
      },
      {
        kind: "gapfill",
        text: "Ungefähr jeder ___ sagt Nein.",
        options: [],
        answer: 0,
        accept: ["Zehnte", "zehnte", "10."],
        explain: "„Seltener, als man denkt, vielleicht jeder Zehnte.“",
      },
      {
        kind: "short_answer",
        text: "Was braucht er, um ein Bild auszustellen?",
        options: [],
        answer: 0,
        accept: ["eine schriftliche Einwilligung", "schriftliche Einwilligung", "eine Einwilligung", "Einwilligung", "eine schriftliche Erlaubnis", "schriftliche Erlaubnis"],
        explain: "Sergi için yazılı rıza şart; yoksa hiçbir yüzü göstermiyor.",
      },
      {
        text: "Was passiert, wenn jemand nicht einverstanden ist?",
        options: [
          "Das Bild wird sofort gelöscht.",
          "Das Bild wird ohne Gesicht gezeigt.",
          "Die Person bekommt das Bild geschickt.",
        ],
        answer: 0,
        explain: "Kabul etmeyen kişi fotoğrafın silindiğini kendi gözüyle görüyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w13",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Kritik: Eine Ausstellung zum Ausprobieren",
    genre: "review",
    intro: "Bir kültür blogu için sergi eleştirisi yazıyorsun: önce iki cümle kur, sonra güçlü ve zayıf yanlarıyla dengeli bir yazı yaz.",
    gloss: [
      { de: "die Ausstellung", tr: "sergi", en: "exhibition" },
      { de: "ausprobieren", tr: "denemek", en: "to try out" },
      { de: "gelungen", tr: "başarılı", en: "successful" },
      { de: "der Architekt", tr: "mimar", en: "architect" },
      { de: "sich lohnen", tr: "değmek", en: "to be worth it" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Küratör bir fotoğrafçıyla birlikte çalışmış.",
        answer: "Die Kuratorin hat mit einem Fotografen zusammengearbeitet.",
        alternatives: ["Mit einem Fotografen hat die Kuratorin zusammengearbeitet."],
        hint: "n-Deklination: „der Fotograf“ Dativ'de „einem Fotografen“ olur.",
      },
      {
        kind: "build",
        tr: "Ziyaretçi mimarın adını hiçbir yerde bulamıyor.",
        answer: "Der Besucher findet den Namen des Architekten nirgends.",
        alternatives: ["Den Namen des Architekten findet der Besucher nirgends."],
        hint: "„der Name“ ve „der Architekt“ n-Deklination'a girer: „den Namen“, „des Architekten“.",
      },
      {
        kind: "free",
        prompt:
          "Bir kültür blogu için gezdiğin bir sergiyi değerlendir: nerede ve ne olduğunu söyle, arkasındaki fikri anlat, bir güçlü ve bir zayıf yanı somut örnekle yaz, kimlere uygun olduğunu söyle ve kısa bir hükümle bitir.",
        checklist: [
          "Serginin ne ve nerede olduğunu söyle",
          "Arkasındaki fikri anlat",
          "Bir güçlü ve bir zayıf yanı somut örnekle yaz",
          "Kime uygun olduğunu söyle ve bir hükümle bitir",
        ],
        minWords: 120,
        phrases: [
          { de: "Wer glaubt, …, sollte sich … ansehen.", tr: "… sanan biri, …'e bir bakmalı.", en: "Anyone who thinks … should go and see …" },
          { de: "Die Idee dahinter ist …", tr: "Arkasındaki fikir …", en: "The idea behind it is …" },
          { de: "Besonders gelungen ist …", tr: "Özellikle başarılı olan …", en: "Particularly successful is …" },
          { de: "Weniger überzeugend sind …", tr: "Daha az ikna edici olan …", en: "Less convincing are …" },
          { de: "Der Besuch lohnt sich vor allem für …", tr: "Ziyaret özellikle … için değer.", en: "The visit is worthwhile above all for …" },
        ],
        sample:
          "Wer glaubt, über Stühle sei längst alles gesagt, sollte sich „Sitzen“ im Museum für Gestaltung " +
          "ansehen. Die Ausstellung zeigt achtzig Stühle aus hundert Jahren, und zwar nicht hinter Glas: " +
          "Fast jeden darf man ausprobieren. Die Idee dahinter ist einfach und überzeugend. Man soll nicht " +
          "nur sehen, wie ein Stuhl aussieht, sondern spüren, wie man darauf sitzt. " +
          "Besonders gelungen ist der Raum mit alten Schulstühlen, in dem man sofort merkt, wie unbequem " +
          "Lernen früher war. Für die Bilder an den Wänden hat die Kuratorin mit einem Fotografen " +
          "zusammengearbeitet; sie zeigen, wo solche Stühle heute stehen, im Wartezimmer oder auf dem Sperrmüll. " +
          "Weniger überzeugend sind die Texte. Sie sind klein gedruckt und hängen so tief, dass man sich bücken " +
          "muss, und bei manchen Stühlen sucht man den Namen des Architekten vergeblich. " +
          "Der Besuch lohnt sich vor allem für Familien und für alle, die ungern still vor Vitrinen stehen. " +
          "Ich gebe vier von fünf Sternen.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s13",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Sollten Museen keinen Eintritt verlangen?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: bir öneriyi kimin kazanıp kimin ödediğine bakarak değerlendir.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Müzeler giriş ücretini kaldırmalı mı? Bugün kimin gelip kimin gelmediğini düşün, lehine bir gerekçe ver, parasız girişin bedelini kimin ödeyeceğini söyle ve bir ara çözümü değerlendir.",
      bulletsTr: [
        "Bugün kimin gelip kimin gelmediğini söyle",
        "Lehine bir gerekçe ver",
        "Bedeli kimin ödeyeceğini anlat",
        "Bir ara çözüm öner",
      ],
      targets: [
        { de: "Entscheidend ist für mich nicht …, sondern …", tr: "Benim için belirleyici olan … değil, …" },
        { de: "Dafür spricht vor allem, dass …", tr: "Bunun lehine olan asıl şey …" },
        { de: "Bezahlen würde das am Ende …", tr: "Bunu sonunda … öderdi" },
        { de: "Ein Kompromiss könnte so aussehen: …", tr: "Bir uzlaşma şöyle olabilir: …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Entscheidend ist für mich nicht, ob ein Museum Geld verdient, sondern wer hineingeht. Heute sind " +
        "das vor allem Menschen, die ohnehin gern ins Museum gehen und sich den Eintritt leisten können; " +
        "für eine Familie mit drei Kindern sind vierzig Euro für einen Nachmittag viel Geld. " +
        "Dafür spricht vor allem, dass freier Eintritt die Schwelle senkt: Man geht auch einmal für zwanzig " +
        "Minuten hinein, ohne das Gefühl, sein Geld zu verschwenden. " +
        "Bezahlen würde das am Ende die Allgemeinheit über Steuern, und das finde ich vertretbar, weil auch " +
        "Bibliotheken und Parks keinen Eintritt kosten. Allerdings kann ein kleines Museum ohne diese " +
        "Einnahmen schnell in Schwierigkeiten geraten. " +
        "Ein Kompromiss könnte so aussehen: Die Dauerausstellung ist frei, für große Sonderausstellungen " +
        "zahlt man, und Kinder und Jugendliche zahlen nie. So bleibt das Haus offen, ohne dass es sich ruiniert.",
      rubricHint:
        "Kimin gelip kimin gelmediğine dair somut bir gözlem ve bir ara çözüm beklenir; „nicht …, sondern“, Konjunktiv II („würde“, „könnte“) ve „ohne dass“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g13",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Das kann ich mir vorstellen",
    genre: "grammar",
    intro: "Bazı dönüşlü fiiller mich değil mir ister: cümlede ayrı bir nesne varsa zamir Dativ'e geçer, bazen de anlam değişir.",
    focus: "Dativ'de dönüşlü zamir: sich etwas vorstellen, leisten, merken, ansehen — mich mi, mir mi (A2'deki Akkusativ dönüşlülerin bir adım ötesi)",
    gloss: [
      { de: "sich etwas vorstellen", tr: "hayal etmek", en: "to imagine" },
      { de: "sich etwas leisten", tr: "gücü yetmek", en: "to afford" },
      { de: "sich etwas merken", tr: "aklında tutmak", en: "to remember" },
      { de: "sich etwas ansehen", tr: "bakmak", en: "to look at" },
      { de: "der Katalog", tr: "katalog", en: "catalog" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Nesne varsa zamir Dativ'e geçer",
        tr: "A2'de „sich freuen“ gibi fiillerde zamir Akkusativ'di: mich, dich. Cümlede ayrıca bir Akkusativ nesnesi varsa dönüşlü zamir Dativ'e kayar: mir, dir. Fark yalnız ich ve du'da görünür; sich, uns, euch iki hâlde de aynıdır.",
        examples: [
          { de: "Ich wasche mich.", tr: "Yıkanıyorum.", note: "nesne yok → mich" },
          { de: "Ich wasche mir vor dem Essen die Hände.", tr: "Yemekten önce ellerimi yıkıyorum.", note: "die Hände nesne → mir" },
          { de: "Er sieht sich die Bilder genau an.", tr: "Resimlere dikkatle bakıyor.", note: "er: iki hâlde de sich" },
        ],
      },
      {
        heading: "vorstellen: kendini tanıtmak mı, hayal etmek mi?",
        tr: "Bazı fiillerde hâl anlamı değiştirir. „sich vorstellen“ Akkusativ'le kendini tanıtmaktır; Dativ ve bir nesneyle bir şeyi hayal etmek, gözünde canlandırmaktır. „Ich stelle mich vor“ ile „Ich stelle mir das vor“ iki ayrı cümledir.",
        examples: [
          { de: "Darf ich mich vorstellen? Ich bin die neue Kuratorin.", tr: "Kendimi tanıtabilir miyim? Yeni küratör benim.", note: "Akkusativ: tanıtmak" },
          { de: "Ich kann mir das Museum ohne die alte Treppe nicht vorstellen.", tr: "Müzeyi eski merdiven olmadan hayal edemiyorum.", note: "Dativ: hayal etmek" },
          { de: "Stell dir vor, der Eintritt ist heute frei!", tr: "Düşünsene, bugün giriş ücretsiz!", note: "du → dir" },
        ],
      },
      {
        heading: "Hep Dativ'le gelenler ve sıra",
        tr: "„sich etwas leisten“, „sich etwas merken“, „sich etwas ansehen“, „sich etwas überlegen“ hep bir nesneyle kullanılır, zamir hep Dativ'dir. Nesne bir isimse dönüşlü zamir önce gelir; nesne de bir zamirse (es, sie) önce Akkusativ zamiri gelir: „Ich sehe sie mir an.“",
        examples: [
          { de: "Den Katalog kann ich mir leider nicht leisten.", tr: "Kataloğa maalesef gücüm yetmiyor.", note: "leisten → mir" },
          { de: "Merk dir den Namen des Fotografen!", tr: "Fotoğrafçının adını aklında tut!", note: "emir: dir" },
          { de: "Die Ausstellung? Ich sehe sie mir am Sonntag an.", tr: "Sergi mi? Pazar günü gezeceğim.", note: "önce sie, sonra mir" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich wasche ___ vor dem Essen die Hände.",
        options: ["mich", "mir", "sich"],
        answer: 1,
        explain: "Cümlede ayrı bir nesne var (die Hände), bu yüzden dönüşlü zamir Dativ olur: mir.",
      },
      {
        text: "„Ich stelle mir das vor.“ — Was bedeutet das?",
        options: [
          "Ich sehe es im Kopf vor mir.",
          "Ich nenne anderen meinen Namen.",
          "Ich stelle es an die Wand.",
        ],
        answer: 0,
        explain: "Dativ zamir ve bir nesneyle „sich vorstellen“ hayal etmek demektir.",
      },
      {
        text: "Die Ausstellung? Ich sehe ___ am Sonntag an.",
        options: ["mir sie", "mich sie", "sie mir"],
        answer: 2,
        explain: "Nesne de zamir olunca önce Akkusativ zamiri (sie), sonra Dativ dönüşlü zamir (mir) gelir.",
      },
      {
        kind: "gapfill",
        text: "Den Katalog kann ich ___ leider nicht leisten.",
        options: [],
        answer: 0,
        accept: ["mir"],
        explain: "„sich etwas leisten“ hep Dativ zamir ister: ich → mir.",
      },
      {
        kind: "gapfill",
        text: "Merk ___ bitte den Namen des Fotografen!",
        options: [],
        answer: 0,
        accept: ["dir"],
        explain: "„sich etwas merken“ Dativ ister; du'ya emirde zamir dir olur.",
      },
      {
        kind: "gapfill",
        text: "Darf ich ___ vorstellen? Ich bin die neue Kuratorin.",
        options: [],
        answer: 0,
        accept: ["mich"],
        explain: "Burada ayrı bir nesne yok ve anlam kendini tanıtmak: Akkusativ, mich.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ uns morgen die neue Sammlung an. (ansehen)",
        options: [],
        answer: 0,
        accept: ["sehen"],
        explain: "Ayrılabilen fiil: çekimli „sehen“ ikinci sırada, „an“ sonda; wir'de zamir uns.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "kann", "mir", "ein Museum ohne Eintritt", "nicht", "vorstellen"],
        explain: "Modal ikinci sırada, dönüşlü zamir hemen arkasında, mastar sonda: kann mir … nicht vorstellen.",
      },
      {
        kind: "truefalse",
        text: "„Du musst dich die Bilder genau ansehen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Nesne (die Bilder) olduğu için Dativ gerekir: „Du musst dir die Bilder genau ansehen.“",
      },
      {
        kind: "truefalse",
        text: "„Das kann ich mir gut vorstellen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Hayal etmek anlamında „sich etwas vorstellen“ Dativ ister: mir.",
      },
    ],
  },
];
