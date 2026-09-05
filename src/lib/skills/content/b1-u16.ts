import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 16 — "Görüş bildirmek ve tartışmak" (dersler 61–64).
 *
 * Dersler: Meine Meinung · Pro und Contra · Höflich diskutieren ·
 * Medienkonsum.
 *
 * Ünitenin dili TARTIŞMA. İki aktarım hatası buraya düşüyor ve ikisi de
 * Türkçede karşılığı olmayan yapılardan:
 *   es gibt + Akkusativ  Türkçede 'var' bir yüklemdir, öznesi yalın durur
 *                        ('büyük bir avantaj var'). Almancada es gibt'in
 *                        ardından gelen öğe NESNEDİR: einen großen Vorteil.
 *   da-bileşiği          Türkçede 'ona bağlı' derken edat isme yapışır;
 *                        Almanca bir yan cümleye gönderme yaparken edatı
 *                        DA- ile birleştirir: davon abhängen, darüber reden,
 *                        darauf achten. Bu yapının Türkçede eşi yok, o
 *                        yüzden bütünüyle düşüyor.
 *
 * Yeni 32 kelime: die Ansicht, widersprechen, zustimmen, offensichtlich,
 * die Meinung, behaupten, die Überzeugung, stimmen, der Vorteil,
 * der Nachteil, einerseits, der Vergleich, die Diskussion, daher, korrekt,
 * miteinander, der Kompromiss, vorsichtig, der Teilnehmer, die Rede,
 * auseinander, durcheinander, loben, kritisieren, abhängen, bewusst,
 * der Bildschirm, die Werbung, reduzieren, die Neuigkeit, das Magazin,
 * verursachen.
 */
export const b1U16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u16-r1",
    level: "B1",
    skill: "reading",
    unit: 16,
    title: "Bildschirmzeit: dafür und dagegen",
    genre: "Artı-eksi metni",
    intro: "Ekran süresi tartışılıyor. Hangi argüman hangi tarafta?",
    minutes: 5,
    gloss: [
      { de: "der Vorteil", tr: "avantaj", en: "advantage" },
      { de: "der Nachteil", tr: "dezavantaj", en: "disadvantage" },
      { de: "einerseits", tr: "bir yandan", en: "on the one hand" },
      { de: "der Bildschirm", tr: "ekran", en: "screen" },
      { de: "verursachen", tr: "yol açmak", en: "to cause" },
    ],
    text:
      "Soll man die Zeit vor dem Bildschirm reduzieren? Darüber wird viel " +
      "diskutiert, und es gibt gute Argumente auf beiden Seiten.\n\n" +
      "Einerseits gibt es einen klaren Vorteil: Wer weniger am Bildschirm sitzt, " +
      "schläft besser und bewegt sich mehr. Studien zeigen, dass zu viel Licht " +
      "am Abend Probleme beim Einschlafen verursacht.\n\n" +
      "Andererseits gibt es einen echten Nachteil: der Bildschirm ist heute " +
      "kein Spielzeug mehr, sondern Arbeitsgerät. Wer im Büro acht Stunden davor sitzt, kann seine Zeit nicht " +
      "einfach reduzieren. Der Vergleich mit Kindern ist daher nicht korrekt.\n\n" +
      "Es hängt also davon ab, worum es geht. Bewusst zu entscheiden bringt mehr " +
      "als eine feste Zahl. Wer den Abend ohne Werbung und ohne Neuigkeiten " +
      "verbringt, merkt den Unterschied schon nach einer Woche.",
    questions: [
      {
        text: "Welchen Vorteil nennt der Text?",
        options: ["Besserer Schlaf und mehr Bewegung", "Mehr Geld", "Bessere Arbeit"],
        answer: 0,
        explain: "„Wer weniger am Bildschirm sitzt, schläft besser und bewegt sich mehr.“",
      },
      {
        text: "Was ist das Gegenargument?",
        options: ["Der Bildschirm ist ein Spielzeug", "Der Bildschirm ist Arbeitsgerät", "Es gibt keine Studien"],
        answer: 1,
        explain: "„Andererseits gibt es einen echten Nachteil: der Bildschirm ist heute kein Spielzeug mehr …“",
      },
      {
        text: "Was bringt laut Text mehr als eine feste Zahl?",
        options: ["Bewusst zu entscheiden", "Ein Verbot", "Eine App"],
        answer: 0,
        explain: "„Bewusst zu entscheiden bringt mehr als eine feste Zahl.“",
      },
      {
        kind: "gapfill",
        text: "Einerseits gibt es ___ ___ Vorteil.",
        options: [],
        answer: 0,
        accept: ["einen klaren"],
        explain: "„es gibt“ sonrası NESNE gelir: einen klaren Vorteil (Akkusativ).",
      },
      {
        kind: "short_answer",
        text: "Wann merkt man den Unterschied?",
        options: [],
        answer: 0,
        accept: ["nach einer Woche", "eine Woche", "schon nach einer Woche"],
        explain: "„… merkt den Unterschied schon nach einer Woche.“",
      },
    ],
  },
  {
    id: "b1-u16-r2",
    level: "B1",
    skill: "reading",
    unit: 16,
    title: "Ich sehe das anders",
    genre: "Okur mektupları",
    intro: "Bir yazıya iki yanıt. Kim katılıyor, kim karşı çıkıyor?",
    minutes: 5,
    gloss: [
      { de: "die Ansicht", tr: "görüş", en: "view" },
      { de: "zustimmen", tr: "katılmak", en: "to agree" },
      { de: "widersprechen", tr: "karşı çıkmak", en: "to contradict" },
      { de: "behaupten", tr: "iddia etmek", en: "to claim" },
      { de: "der Ton", tr: "üslup", en: "tone" },
      { de: "offensichtlich", tr: "besbelli", en: "obviously" },
    ],
    text:
      "Leserbrief 1: Ich stimme dem Artikel zu. Es ist offensichtlich, dass wir " +
      "abends zu lange vor dem Bildschirm sitzen. Meiner Ansicht nach reicht " +
      "eine einfache Regel: nach zehn kein Gerät mehr. Das kostet nichts und " +
      "hilft sofort.\n\n" +
      "Leserbrief 2: Ich muss dem widersprechen. Der Artikel behauptet, dass " +
      "der Bildschirm schuld ist. Das stimmt so nicht. Wer um Mitternacht noch " +
      "arbeitet, schläft schlecht — mit oder ohne Gerät. Die Ursache ist die " +
      "Arbeit, nicht das Licht.\n\n" +
      "Leserbrief 3: Beide haben recht, und darin liegt das Problem jeder " +
      "Diskussion über dieses Thema. Man redet nicht über dasselbe, weil jeder " +
      "von einer anderen Situation spricht. Ein Kompromiss wäre, ehrlich zu " +
      "sagen, worüber man gerade redet.\n\n" +
      "Wir danken allen Teilnehmern und loben besonders den " +
      "höflichen Ton — kritisieren kann man auch, ohne jemanden zu beleidigen.",
    questions: [
      {
        text: "Was schlägt Leserbrief 1 vor?",
        options: ["Nach zehn kein Gerät mehr", "Gar keine Geräte", "Eine App"],
        answer: 0,
        explain: "„Meiner Ansicht nach reicht eine einfache Regel: nach zehn kein Gerät mehr.“",
      },
      {
        text: "Was ist die Ursache laut Leserbrief 2?",
        options: ["Das Licht", "Die Arbeit", "Das Alter"],
        answer: 1,
        explain: "„Die Ursache ist die Arbeit, nicht das Licht.“",
      },
      {
        text: "Was sagt Leserbrief 3 über die Diskussion?",
        options: ["Man redet nicht über dasselbe", "Alle sind sich einig", "Sie ist ohne Sinn"],
        answer: 0,
        explain: "„Man redet nicht über dasselbe, weil jeder von einer anderen Situation spricht.“",
      },
      {
        kind: "gapfill",
        text: "Ich muss dem ___.",
        options: [],
        answer: 0,
        accept: ["widersprechen"],
        explain: "„widersprechen“ Dativ ister: dem Artikel widersprechen.",
      },
      {
        kind: "short_answer",
        text: "Was wird besonders gelobt?",
        options: [],
        answer: 0,
        accept: ["den höflichen Ton", "der höfliche Ton", "den Ton"],
        explain: "„… loben besonders den höflichen Ton …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u16-l1",
    level: "B1",
    skill: "listening",
    unit: 16,
    title: "Wir kommen zu keinem Ergebnis",
    genre: "Toplantı tartışması",
    intro: "Bir toplantı dağılmak üzere. Kim hangi uzlaşmayı öneriyor?",
    minutes: 4,
    gloss: [
      { de: "der Kompromiss", tr: "uzlaşma", en: "compromise" },
      { de: "miteinander", tr: "birbiriyle", en: "with each other" },
      { de: "durcheinander", tr: "karmakarışık", en: "in disarray" },
      { de: "der Teilnehmer", tr: "katılımcı", en: "participant" },
    ],
    segments: [
      { text: "Wir reden seit einer Stunde und alles ist durcheinander." },
      { text: "Das liegt daran, dass jeder von etwas anderem spricht." },
      { text: "Da stimme ich dir zu. Sollen wir kurz sammeln, worum es geht?" },
      { text: "Gute Idee. Ich schreibe die Punkte auf." },
      { text: "Ich möchte hier widersprechen: Das Geld ist nicht das Problem." },
      { text: "Vorsichtig — vielleicht ist es für andere Teilnehmer doch eins." },
      { text: "Einverstanden. Dann suchen wir einen Kompromiss." },
      { text: "Wenn wir miteinander statt gegeneinander reden, geht das schnell." },
    ],
    questions: [
      {
        text: "Woran liegt das Durcheinander?",
        options: ["Jeder spricht von etwas anderem", "Es sind zu viele Leute", "Es ist zu spät"],
        answer: 0,
        explain: "„Das liegt daran, dass jeder von etwas anderem spricht.“",
      },
      {
        text: "Was schlägt die dritte Stimme vor?",
        options: ["Aufhören", "Kurz sammeln, worum es geht", "Abstimmen"],
        answer: 1,
        explain: "„Sollen wir kurz sammeln, worum es geht?“",
      },
      {
        text: "Was sagt die Person über das Geld?",
        options: ["Es ist das Hauptproblem", "Es ist nicht das Problem", "Es gibt kein Geld"],
        answer: 1,
        explain: "„Ich möchte hier widersprechen: Das Geld ist nicht das Problem.“",
      },
      {
        kind: "gapfill",
        text: "Das liegt ___, dass jeder von etwas anderem spricht.",
        options: [],
        answer: 0,
        accept: ["daran"],
        explain: "„liegen an“ + yan cümle → edat da- ile birleşir: „daran, dass …“.",
      },
      {
        kind: "short_answer",
        text: "Wie lange reden sie schon?",
        options: [],
        answer: 0,
        accept: ["seit einer Stunde", "eine Stunde"],
        explain: "„Wir reden seit einer Stunde …“",
      },
    ],
  },
  {
    id: "b1-u16-l2",
    level: "B1",
    skill: "listening",
    unit: 16,
    title: "Wie viel Nachrichten am Tag?",
    genre: "Günlük konuşma",
    intro: "İki kişi haber tüketimini konuşuyor. Kim ne kadar azaltmış?",
    minutes: 4,
    gloss: [
      { de: "die Neuigkeit", tr: "haber", en: "news item" },
      { de: "reduzieren", tr: "azaltmak", en: "to reduce" },
      { de: "die Werbung", tr: "reklam", en: "advertising" },
      { de: "das Magazin", tr: "dergi", en: "magazine" },
    ],
    segments: [
      { text: "Ich lese seit einem Monat nur noch morgens Nachrichten." },
      { text: "Und? Fehlt dir etwas?" },
      { text: "Nein. Am Abend war es sowieso immer dieselbe Neuigkeit." },
      { text: "Bei mir hängt das davon ab, wie der Tag war." },
      { text: "Verstehe. Ich habe vor allem die Werbung reduziert." },
      { text: "Ich lese lieber einmal pro Woche ein Magazin. Das reicht mir." },
      { text: "Das ist bewusster. Kurze Meldungen machen mich nur unruhig." },
      { text: "Genau. Und man erinnert sich am Ende an fast nichts davon." },
    ],
    questions: [
      {
        text: "Wann liest die erste Person Nachrichten?",
        options: ["Nur morgens", "Nur abends", "Den ganzen Tag"],
        answer: 0,
        explain: "„Ich lese seit einem Monat nur noch morgens Nachrichten.“",
      },
      {
        text: "Was hat sie vor allem reduziert?",
        options: ["Die Werbung", "Die Magazine", "Das Radio"],
        answer: 0,
        explain: "„Ich habe vor allem die Werbung reduziert.“",
      },
      {
        text: "Wie oft liest die zweite Person ein Magazin?",
        options: ["Täglich", "Einmal pro Woche", "Einmal im Monat"],
        answer: 1,
        explain: "„Ich lese lieber einmal pro Woche ein Magazin.“",
      },
      {
        kind: "gapfill",
        text: "Bei mir hängt das ___ ab, wie der Tag war.",
        options: [],
        answer: 0,
        accept: ["davon"],
        explain: "„abhängen von“ + yan cümle → „davon ab, wie …“.",
      },
      {
        kind: "short_answer",
        text: "Was machen kurze Meldungen mit der ersten Person?",
        options: [],
        answer: 0,
        accept: ["sie machen sie unruhig", "unruhig", "sie wird unruhig"],
        explain: "„Kurze Meldungen machen mich nur unruhig.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u16-w1",
    level: "B1",
    skill: "writing",
    unit: 16,
    title: "Pro und Contra",
    genre: "Tartışma metni",
    intro: "Bir konunun iki tarafını yaz. 'es gibt' sonrası hâle dikkat et.",
    minutes: 8,
    gloss: [
      { de: "der Vorteil", tr: "avantaj", en: "advantage" },
      { de: "der Nachteil", tr: "dezavantaj", en: "disadvantage" },
      { de: "der Vergleich", tr: "karşılaştırma", en: "comparison" },
      { de: "daher", tr: "bu nedenle", en: "therefore" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bunun açık bir avantajı var.",
        answer: "Es gibt dabei einen klaren Vorteil.",
        hint: "„es gibt“ nesne ister: einen klaren Vorteil.",
      },
      {
        kind: "build",
        tr: "Ama ciddi bir dezavantaj da var.",
        answer: "Es gibt aber auch einen ernsten Nachteil.",
        hint: "Yine Akkusativ.",
      },
      {
        kind: "build",
        tr: "Bu karşılaştırma bu nedenle doğru değil.",
        answer: "Dieser Vergleich ist daher nicht korrekt.",
        hint: "„daher“ cümle ortasında da durabilir.",
      },
      {
        kind: "form",
        prompt: "Tartışma kartını doldur.",
        facts: "Konu: ekran süresi; artı: daha iyi uyku; eksi: ekran iş aracı; sonuç: bilinçli kullanım; yazan: Leyla Kaya.",
        fields: [
          { label: "Thema", answer: "Bildschirmzeit", accept: ["die Bildschirmzeit", "Bildschirm"] },
          { label: "Vorteil", answer: "besserer Schlaf", accept: ["Schlaf", "man schläft besser"] },
          { label: "Nachteil", answer: "Arbeitsgerät", accept: ["Arbeit", "der Bildschirm ist Arbeitsgerät"] },
          { label: "Ergebnis", answer: "bewusst entscheiden", accept: ["bewusst", "bewusst entscheiden"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„es gibt“ sonrasındaki hâli düzelt.",
        source: "Es gibt ein großer Vorteil und ein kleiner Nachteil.",
        answer: "Es gibt einen großen Vorteil und einen kleinen Nachteil.",
        why: "Türkçede 'var' bir yüklemdir ve öznesi yalın durur ('büyük bir avantaj var'), o yüzden Almancada da özne biçimi seçiliyor. Almancada 'es' zaten öznedir; onun ardından gelen öğe NESNEDİR ve Akkusativ alır: einen großen Vorteil, einen kleinen Nachteil.",
      },
    ],
  },
  {
    id: "b1-u16-w2",
    level: "B1",
    skill: "writing",
    unit: 16,
    title: "Meine Meinung dazu",
    genre: "Yorum yazısı",
    intro: "Bir konuda görüşünü yaz. Yan cümleye gönderme yaparken 'da-' bileşiğini unutma.",
    minutes: 12,
    gloss: [
      { de: "abhängen", tr: "bağlı olmak", en: "to depend" },
      { de: "die Überzeugung", tr: "kanaat", en: "conviction" },
      { de: "bewusst", tr: "bilinçli", en: "conscious" },
      { de: "kritisieren", tr: "eleştirmek", en: "to criticise" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bu, ne kadar vaktin olduğuna bağlı.",
        answer: "Das hängt davon ab, wie viel Zeit du hast.",
        hint: "„abhängen von“ + yan cümle → davon.",
      },
      {
        kind: "build",
        tr: "Bunun sebebi herkesin başka bir şeyden söz etmesi.",
        answer: "Das liegt daran, dass jeder von etwas anderem spricht.",
        hint: "„liegen an“ → daran.",
      },
      {
        kind: "free",
        prompt: "Bir konuda görüşünü yaz: konuyu tanıt, en az bir artı ve bir eksi say, kendi görüşünü gerekçesiyle söyle, ve karşı görüşe nazikçe cevap ver. En az bir 'da-' bileşiği kullan (davon, daran, darüber).",
        checklist: [
          "Konu net tanıtılmış mı?",
          "En az bir artı ve bir eksi var mı?",
          "Kendi görüş gerekçeli mi?",
          "Karşı görüşe nazik bir cevap var mı?",
          "En az bir 'da-' bileşiği kullanılmış mı?",
        ],
        minWords: 70,
        sample:
          "In letzter Zeit wird viel darüber diskutiert, ob man die Zeit vor dem " +
          "Bildschirm reduzieren soll.\n\n" +
          "Einerseits gibt es einen klaren Vorteil: Wer abends früher aufhört, " +
          "schläft besser. Andererseits ist der Bildschirm für viele ein " +
          "Arbeitsgerät, und das kann man nicht einfach abschalten.\n\n" +
          "Meiner Ansicht nach hängt alles davon ab, worum es geht. Zwei Stunden " +
          "Arbeit sind etwas anderes als zwei Stunden Werbung. Bewusst zu " +
          "entscheiden bringt daher mehr als eine feste Zahl.\n\n" +
          "Wer meine Ansicht kritisiert und sagt, das sei zu einfach, hat teilweise recht. Ich möchte dem " +
          "auch nicht widersprechen. Aber eine Regel, an die sich niemand hält, " +
          "hilft am Ende niemandem.\n\n" +
          "Das ist meine Überzeugung, und ich bin gespannt auf andere Ansichten.",
        phrases: [
          { de: "Meiner Ansicht nach …", tr: "Bence …", en: "In my view …" },
          { de: "Das hängt davon ab, ob …", tr: "Bu … -e bağlı", en: "That depends on whether …" },
          { de: "Ich möchte dem nicht widersprechen.", tr: "Buna karşı çıkmak istemem.", en: "I don't want to contradict that." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Eksik 'da-' bileşiğini ekle.",
        source: "Das hängt ab, ob du Zeit hast, und ich denke oft.",
        answer: "Das hängt davon ab, ob du Zeit hast, und ich denke oft daran.",
        why: "Türkçede edat isme yapışır ('vaktine bağlı', 'onu düşünürüm') ve ayrı bir gönderme sözcüğü yoktur, o yüzden yapı bütünüyle düşüyor. Almancada fiilin istediği edat bir YAN CÜMLEYE ya da önceki bir şeye gönderme yapıyorsa da-/dar- ile birleşir: davon abhängen, daran denken, darüber reden.",
      },
    ],
  },
];
