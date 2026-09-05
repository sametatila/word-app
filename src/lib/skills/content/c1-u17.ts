import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 17 — "Ara açıklama, gönderme, eksilti, kasıtlı çift anlam".
 *
 * Dört ders: Berlin, die Hauptstadt · Darauf komme ich zurück ·
 * Weniger ist mehr · Absichtlich zweideutig.
 *
 *   Kelime: die Apposition, einschieben, der Einschub, das Komma, ergänzend,
 *           die Sichtweise, der Blickwinkel, aufschlussreich · der Verweis,
 *           diesbezüglich, Letzteres, sich beziehen auf, hinweisen auf,
 *           folglich, obgleich, zugunsten · die Ellipse, weglassen, die Kürze,
 *           verständlich, der Telegrammstil, preisgeben, vorschnell,
 *           kurzsichtig · die Zweideutigkeit, absichtlich, auslegen,
 *           offenlassen, beabsichtigt, die Anspielung, subtil, verschleiern
 *
 * Ünitenin çekirdeği: ANLAMIN BÜYÜK KISMI SÖYLENMEYENDE. Dördü de aynı
 * işlemin dereceleri — ara açıklama fazlayı araya sıkıştırır, gönderme
 * sözcüğü tekrar etmeden geri işaret eder, eksilti çıkarılabileni atar,
 * kasıtlı çift anlam ise bilerek açık bırakır.
 *
 * Türkçe konuşan için asıl sürtünme gönderme hattında: Türkçe ismi
 * rahatça tekrar eder ("bu konu … bu konuda …"), Almanca aynı tekrarı
 * acemilik sayar ve "diesbezüglich", "Letzteres", "darauf" ister. Eksiltide
 * ise ters yön: Türkçe eki düşürerek kısaltır, Almanca sözcüğü atar — ve
 * neyin atılabileceği kayıt meselesidir, kısalık meselesi değil.
 */
export const c1U17: SkillExercise[] = [
  {
    id: "c1-u17-r1",
    level: "C1",
    skill: "reading",
    unit: 17,
    title: "Das Wort, das man nicht wiederholt",
    genre: "Dil yazısı",
    intro: "Gönderme sözcükleri: tekrar etmeden nasıl geri işaret edilir?",
    gloss: [
      { de: "der Verweis", tr: "gönderme, atıf", en: "reference" },
      { de: "diesbezüglich", tr: "bu konuda", en: "in this regard" },
      { de: "Letzteres", tr: "ikincisi, sonuncusu", en: "the latter" },
      { de: "sich beziehen auf", tr: "-e ilişkin olmak", en: "to refer to" },
      { de: "folglich", tr: "dolayısıyla", en: "consequently" },
      { de: "vorschnell", tr: "aceleci", en: "hasty" },
      { de: "aufschlussreich", tr: "aydınlatıcı", en: "revealing" },
    ],
    minutes: 7,
    text:
      "ZWEI ANGEBOTE, EIN SATZ\n\n" +
      "„Wir haben zwei Angebote geprüft. Das zweite Angebot erscheint uns günstiger, deshalb möchten wir das zweite Angebot annehmen.“\n\n" +
      "Grammatisch fehlerfrei, inhaltlich klar — und trotzdem liest es sich wie eine Übersetzung. Ein deutscher Muttersprachler schreibt: „Letzteres erscheint uns günstiger; wir möchten es annehmen.“\n\n" +
      "Der Unterschied ist nicht Stil, sondern Ökonomie. Deutsche Sachtexte gehen davon aus, dass der Leser sich das Vorherige merkt. Wer denselben Ausdruck wiederholt, signalisiert Misstrauen gegenüber dem Leser — oder Unsicherheit im eigenen Text.\n\n" +
      "Das Werkzeugkasten ist überschaubar. „Letzteres“ und „Ersteres“ greifen zwei zuvor genannte Dinge auf. „Diesbezüglich“ ersetzt eine ganze Nominalphrase („in Bezug auf diese Frage“). Die Verbindungen aus „da(r)-“ plus Präposition — darauf, damit, dafür, davon — nehmen einen ganzen Sachverhalt auf: „Darauf komme ich später zurück.“\n\n" +
      "Aufschlussreich ist, was passiert, wenn man sie weglässt. Der Text wird nicht falsch, er wird schwerfällig, und der Leser bekommt den Eindruck, jeder Satz beginne von vorn.\n\n" +
      "Eine Warnung gehört dazu. Verweise brauchen einen eindeutigen Bezug — der Leser muss ohne Nachdenken wissen, worauf sie sich beziehen. „Er sprach mit dem Kollegen über seinen Antrag“ — wessen Antrag? Wer vorschnell verweist, spart Wörter und kostet Klarheit. Folglich gilt: verweisen, ja — aber nur, wenn genau ein Bezug möglich ist.",
    questions: [
      {
        text: "Warum wirkt der Beispielsatz mit „das zweite Angebot“ wie eine Übersetzung?",
        options: [
          "Er enthält einen Grammatikfehler",
          "Er wiederholt den Ausdruck, statt zu verweisen",
          "Er ist zu kurz",
        ],
        answer: 1,
        explain: "Almanca metin okurun öncekini hatırladığını varsayıyor.",
      },
      {
        kind: "gapfill",
        text: "___ erscheint uns günstiger; wir möchten es annehmen.",
        options: [],
        answer: 0,
        accept: ["Letzteres"],
        explain: "İkisinden sonuncusu; Ersteres ilkini alır.",
      },
      {
        text: "Was ersetzt „diesbezüglich“?",
        options: [
          "Ein Verb",
          "Eine ganze Nominalphrase wie „in Bezug auf diese Frage“",
          "Einen Nebensatz",
        ],
        answer: 1,
        explain: "Tek sözcük bütün bir öbeği taşıyor.",
      },
      {
        kind: "short_answer",
        text: "Welche Bedingung nennt der Text für einen Verweis?",
        options: [],
        answer: 0,
        accept: [
          "es darf nur genau ein Bezug möglich sein",
          "der Bezug muss eindeutig sein",
          "nur wenn genau ein Bezug möglich ist",
        ],
        explain: "„Er sprach mit dem Kollegen über seinen Antrag“ — kimin başvurusu?",
      },
      {
        kind: "short_answer",
        text: "Was passiert mit einem Text ohne Verweiswörter?",
        options: [],
        answer: 0,
        accept: [
          "er wird schwerfällig, jeder Satz scheint von vorn zu beginnen",
          "er wird schwerfällig",
          "nicht falsch, aber schwerfällig",
        ],
        explain: "Yanlış olmuyor — ağırlaşıyor.",
      },
    ],
  },
  {
    id: "c1-u17-r2",
    level: "C1",
    skill: "reading",
    unit: 17,
    title: "Was man weglassen darf",
    genre: "Rehber yazısı",
    intro: "Eksilti: kısalık ne zaman ustalık, ne zaman kabalık?",
    gloss: [
      { de: "die Ellipse", tr: "eksilti", en: "ellipsis" },
      { de: "weglassen", tr: "atlamak, çıkarmak", en: "to omit" },
      { de: "die Kürze", tr: "kısalık", en: "brevity" },
      { de: "der Telegrammstil", tr: "telgraf üslubu", en: "telegraphic style" },
      { de: "kurzsichtig", tr: "kısa görüşlü", en: "short-sighted" },
      { de: "der Einschub", tr: "ara ekleme", en: "insertion" },
      { de: "verständlich", tr: "anlaşılır", en: "comprehensible" },
    ],
    minutes: 7,
    text:
      "„WIE BESPROCHEN.“\n\n" +
      "Zwei Wörter, kein Verb, ein vollständiger Beitrag. Die Ellipse lässt weg, was der Leser aus dem Zusammenhang ergänzen kann — und funktioniert genau so weit, wie dieser Zusammenhang trägt.\n\n" +
      "In der internen Kommunikation ist sie überall. „Anbei die Zahlen.“ „Wenn nötig, sofort.“ „Erledigt.“ Wer hier ganze Sätze baut, wirkt umständlich, nicht höflich.\n\n" +
      "Ein kurzer Einschub schließt die Lücke oft schon. „Wie besprochen — Punkt 3 von Montag“ ist drei Wörter länger und für jeden verständlich, auch für den, der die Mail weitergeleitet bekommt.\n\n" +
      "Die Grenze verläuft nicht bei der Kürze, sondern bei der gemeinsamen Grundlage. Zwischen zwei Kollegen, die dasselbe Projekt bearbeiten, ist „Wie besprochen“ präzise. In einer Mail an eine Behörde, die dreihundert Vorgänge führt, ist es unbrauchbar: Was wurde besprochen, mit wem, wann?\n\n" +
      "Hinzu kommt die Wirkung auf den Ton. Der Telegrammstil klingt effizient, wenn beide Seiten unter Druck stehen, und schroff, wenn nur eine Seite es tut. Eine Absage in vier Wörtern spart dem Absender Zeit und teilt dem Empfänger mit, wie viel Zeit er wert war. Das ist selten beabsichtigt und meist kurzsichtig.\n\n" +
      "Eine praktische Faustregel: Weglassen darf man, was der Empfänger ohne Nachdenken ergänzt. Muss er raten, war es keine Ellipse, sondern eine Lücke. Und in heiklen Nachrichten — Absagen, Kritik, Geldfragen — wird der eingesparte Satz fast immer teurer als er war.",
    questions: [
      {
        text: "Wo verläuft laut Text die Grenze der Ellipse?",
        options: [
          "Bei der Anzahl der Wörter",
          "Bei der gemeinsamen Grundlage zwischen Absender und Empfänger",
          "Bei der Textsorte",
        ],
        answer: 1,
        explain: "İki meslektaş arasında kesin olan, kuruma yazınca kullanılamaz oluyor.",
      },
      {
        kind: "gapfill",
        text: "___ besprochen.",
        options: [],
        answer: 0,
        accept: ["Wie"],
        explain: "Fiilsiz, iki sözcüklü tam bir katkı.",
      },
      {
        text: "Wann klingt der Telegrammstil schroff?",
        options: [
          "Wenn beide Seiten unter Druck stehen",
          "Wenn nur eine Seite unter Druck steht",
          "In E-Mails an Kollegen",
        ],
        answer: 1,
        explain: "Kısalık karşı tarafa ne kadar zaman değdiğini de söylüyor.",
      },
      {
        kind: "short_answer",
        text: "Wie lautet die Faustregel des Textes?",
        options: [],
        answer: 0,
        accept: [
          "weglassen darf man, was der Empfänger ohne Nachdenken ergänzt",
          "was der Empfänger ohne Nachdenken ergänzt",
          "wenn er raten muss, ist es eine Lücke",
        ],
        explain: "Tahmin gerekiyorsa eksilti değil, boşluk.",
      },
      {
        text: "Der Text empfiehlt Ellipsen besonders für Absagen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tersi: hassas mesajlarda tasarruf edilen cümle en pahalıya patlıyor.",
      },
    ],
  },
  {
    id: "c1-u17-l1",
    level: "C1",
    skill: "listening",
    unit: 17,
    title: "Das kann man so sehen",
    genre: "Diyalog",
    intro: "Kasıtlı çift anlam: söylemeden söylemek.",
    gloss: [
      { de: "die Zweideutigkeit", tr: "çift anlamlılık", en: "ambiguity" },
      { de: "auslegen", tr: "yorumlamak", en: "to interpret" },
      { de: "offenlassen", tr: "açık bırakmak", en: "to leave open" },
      { de: "beabsichtigt", tr: "kasıtlı", en: "intended" },
      { de: "die Anspielung", tr: "ima", en: "allusion" },
      { de: "subtil", tr: "ince", en: "subtle" },
      { de: "verschleiern", tr: "örtbas etmek", en: "to obscure" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nesrin", text: "Der Chef hat gesagt, meine Präsentation sei „bemerkenswert“. Ist das gut?" },
      { speaker: "Jonas", text: "Kommt darauf an, wie er es gesagt hat." },
      { speaker: "Nesrin", text: "Warum sagt er dann nicht einfach, was er meint?" },
      { speaker: "Jonas", text: "Weil er sich nicht festlegen will. „Bemerkenswert“ lässt sich in beide Richtungen auslegen — er kann später sagen, er habe es positiv gemeint." },
      { speaker: "Nesrin", text: "Also verschleiert er einfach seine Meinung." },
      { speaker: "Jonas", text: "Manchmal. Manchmal lässt er sie bewusst offen, weil er sie selbst noch prüft." },
      { speaker: "Nesrin", text: "Also Feigheit." },
      { speaker: "Jonas", text: "Manchmal. Manchmal Rücksicht. Wenn zwanzig Leute im Raum sitzen, ist offene Kritik etwas anderes als unter vier Augen." },
      { speaker: "Nesrin", text: "Und wie soll ich damit umgehen?" },
      { speaker: "Jonas", text: "Frag nach. Nicht vorwurfsvoll — einfach: „Woran haben Sie da besonders gedacht?“ Damit machst du die Zweideutigkeit sichtbar, ohne sie ihm vorzuwerfen." },
      { speaker: "Nesrin", text: "Und wenn er ausweicht?" },
      { speaker: "Jonas", text: "Dann war es beabsichtigt, und du hast deine Antwort." },
      { speaker: "Nesrin", text: "Ich hätte gedacht, so etwas gibt es nur bei uns zu Hause." },
      { speaker: "Jonas", text: "Es gibt es überall. Nur die Mittel sind andere. Hier läuft vieles über Untertreibung — je harmloser das Wort, desto schärfer manchmal die Anspielung." },
      { speaker: "Nesrin", text: "Und woran merke ich, ob es subtil gemeint war oder ich zu viel hineinlese?" },
      { speaker: "Jonas", text: "Nie ganz sicher. Deshalb fragt man." },
      { speaker: "Nesrin", text: "Das ist anstrengend." },
      { speaker: "Jonas", text: "Ist es. Aber es ist keine Geheimsprache. Wer nachfragt, kommt fast immer durch." },
    ],
    questions: [
      {
        text: "Warum sagt der Chef laut Jonas nicht direkt, was er meint?",
        options: [
          "Er weiß es selbst nicht",
          "Er will sich nicht festlegen",
          "Er hat die Präsentation nicht gesehen",
        ],
        answer: 1,
        explain: "„er kann später sagen, er habe es positiv gemeint“.",
      },
      {
        kind: "gapfill",
        text: "„Bemerkenswert“ lässt sich in beide Richtungen ___.",
        options: [],
        answer: 0,
        accept: ["auslegen"],
        explain: "auslegen: yorumlamak — çift anlamın tam fiili.",
      },
      {
        text: "Was rät Jonas?",
        options: [
          "Es ignorieren",
          "Nachfragen, ohne Vorwurf",
          "Selbst zweideutig antworten",
        ],
        answer: 1,
        explain: "„Woran haben Sie da besonders gedacht?“ — ima görünür oluyor, suçlama olmadan.",
      },
      {
        kind: "dictation",
        text: "Jonas'ın Almanca'daki ima mekanizmasını özetlediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Hier läuft vieles über Untertreibung — je harmloser das Wort, desto schärfer manchmal die Anspielung.",
          "je harmloser das Wort, desto schärfer manchmal die Anspielung",
        ],
        explain: "Sözcük ne kadar zararsızsa ima o kadar keskin olabiliyor.",
      },
    ],
  },
  {
    id: "c1-u17-l2",
    level: "C1",
    skill: "listening",
    unit: 17,
    title: "Der Einschub zwischen zwei Kommas",
    genre: "Ders",
    intro: "Ara açıklama: virgüller arasına ne sıkıştırılabilir?",
    gloss: [
      { de: "die Apposition", tr: "ara açıklama", en: "apposition" },
      { de: "einschieben", tr: "araya sıkıştırmak", en: "to insert" },
      { de: "das Komma", tr: "virgül", en: "comma" },
      { de: "ergänzend", tr: "tamamlayıcı", en: "supplementary" },
      { de: "die Sichtweise", tr: "bakış açısı", en: "viewpoint" },
      { de: "der Blickwinkel", tr: "bakış açısı, açı", en: "angle" },
      { de: "aufschlussreich", tr: "aydınlatıcı", en: "revealing" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Dozentin", text: "„Berlin, die Hauptstadt Deutschlands, wächst weiter.“ Was macht der Einschub hier?" },
      { speaker: "Teilnehmer", text: "Er erklärt, was Berlin ist." },
      { speaker: "Dozentin", text: "Ja — ergänzend, nicht einschränkend. Man könnte ihn streichen, und der Satz bliebe vollständig." },
      { speaker: "Teilnehmerin", text: "Und wenn man ihn nicht streichen kann?" },
      { speaker: "Dozentin", text: "Dann ist es keine Apposition. Der Test ist genau das: Streichen Sie ihn. Steht der Satz noch, war es einer." },
      { speaker: "Teilnehmer", text: "Die Kommas machen mir Probleme. Ich setze eins und vergesse das zweite." },
      { speaker: "Dozentin", text: "Das ist der häufigste Fehler überhaupt. Der Einschub steht zwischen zwei Kommas — nie zwischen einem." },
      { speaker: "Teilnehmerin", text: "Kann man damit auch eine Sichtweise einbringen?" },
      { speaker: "Dozentin", text: "Sehr gut möglich. Der Einschub verschiebt den Blickwinkel, ohne dass jemand widersprechen kann — dazu kommen wir gleich." },
      { speaker: "Teilnehmerin", text: "Gibt es einen Unterschied zum Relativsatz?" },
      { speaker: "Dozentin", text: "Im Ergebnis oft nicht, im Gewicht schon. „Berlin, das die Hauptstadt ist“ klingt schwerfällig. Die Apposition ist leichter und wirkt wie beiläufig erwähnt." },
      { speaker: "Teilnehmer", text: "Beiläufig — kann man das ausnutzen?" },
      { speaker: "Dozentin", text: "Ein aufschlussreicher Gedanke. Ja. „Der Antrag, ohnehin verspätet eingereicht, wurde abgelehnt.“ Die Wertung steckt im Einschub und wird nie behauptet." },
      { speaker: "Teilnehmerin", text: "Das ist fast unfair." },
      { speaker: "Dozentin", text: "Es ist Rhetorik. Und Sie sollten es erkennen, bevor Sie entscheiden, ob Sie es verwenden." },
    ],
    questions: [
      {
        text: "Wie testet man laut Dozentin eine Apposition?",
        options: [
          "Man zählt die Wörter",
          "Man streicht sie: Steht der Satz noch, war es eine",
          "Man ersetzt sie durch einen Relativsatz",
        ],
        answer: 1,
        explain: "Tamamlayıcı, sınırlandırıcı değil.",
      },
      {
        kind: "gapfill",
        text: "Der ___ steht zwischen zwei Kommas — nie zwischen einem.",
        options: [],
        answer: 0,
        accept: ["Einschub"],
        explain: "En yaygın hata ikinci virgülü unutmak.",
      },
      {
        text: "Was ist der Unterschied zum Relativsatz?",
        options: [
          "Die Bedeutung ist eine andere",
          "Das Gewicht: die Apposition ist leichter, wirkt beiläufig",
          "Der Relativsatz braucht kein Komma",
        ],
        answer: 1,
        explain: "„Berlin, das die Hauptstadt ist“ ağır duruyor.",
      },
      {
        kind: "short_answer",
        text: "Warum ist „Der Antrag, ohnehin verspätet eingereicht, wurde abgelehnt“ rhetorisch?",
        options: [],
        answer: 0,
        accept: [
          "die Wertung steckt im Einschub und wird nie behauptet",
          "die Bewertung wird nicht behauptet, nur eingeschoben",
          "die Wertung wird nie behauptet",
        ],
        explain: "İddia edilmeyen değerlendirme tartışılamıyor da.",
      },
    ],
  },
  {
    id: "c1-u17-w1",
    level: "C1",
    skill: "writing",
    unit: 17,
    title: "Tekrar etme, işaret et",
    genre: "Dil bilgisi",
    intro: "Gönderme sözcükleri, ara açıklama ve eksilti.",
    gloss: [
      { de: "Letzteres", tr: "ikincisi", en: "the latter" },
      { de: "diesbezüglich", tr: "bu konuda", en: "in this regard" },
      { de: "der Einschub", tr: "ara ekleme", en: "insertion" },
      { de: "einschieben", tr: "araya sıkıştırmak", en: "to insert" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "İkincisi bize daha uygun görünüyor.",
        answer: "Letzteres erscheint uns günstiger",
        hint: "Letzteres iki seçenekten sonuncusunu alır; büyük harfle yazılır.",
      },
      {
        kind: "build",
        tr: "Buna daha sonra döneceğim.",
        answer: "Darauf komme ich später zurück",
        hint: "da(r)- + edat bütün bir olguyu tek sözcükte taşır.",
      },
      {
        kind: "build",
        tr: "Almanya'nın başkenti Berlin büyümeye devam ediyor.",
        answer: "Berlin, die Hauptstadt Deutschlands, wächst weiter",
        hint: "Ara açıklama iki virgül arasında durur — biri değil, ikisi.",
      },
      {
        kind: "rewrite",
        prompt: "Metni düzelt: aynı öbek gereksiz tekrarlanıyor.",
        source: "Wir haben zwei Angebote geprüft. Das zweite Angebot erscheint uns günstiger, deshalb möchten wir das zweite Angebot annehmen.",
        answer: "Wir haben zwei Angebote geprüft. Letzteres erscheint uns günstiger; wir möchten es annehmen.",
        alternatives: [
          "Wir haben zwei Angebote geprüft. Letzteres erscheint uns günstiger; wir möchten es annehmen",
          "Wir haben zwei Angebote geprüft. Letzteres erscheint uns günstiger, daher möchten wir es annehmen.",
        ],
        why: "Türkçe ismi rahatça tekrar eder, Almanca sachtext etmez: okurun öncekini hatırladığı varsayılır. Aynı öbeği üçüncü kez yazmak dilbilgisi hatası değil ama metni çeviri gibi gösterir.",
      },
    ],
  },
  {
    id: "c1-u17-w2",
    level: "C1",
    skill: "writing",
    unit: 17,
    title: "Zu kurz war zu teuer",
    genre: "İş yazışması",
    intro: "Telgraf üslubuyla yazılmış bir ret mektubunu yeniden yaz.",
    gloss: [
      { de: "die Ellipse", tr: "eksilti", en: "ellipsis" },
      { de: "der Telegrammstil", tr: "telgraf üslubu", en: "telegraphic style" },
      { de: "preisgeben", tr: "açık etmek", en: "to reveal" },
      { de: "kurzsichtig", tr: "kısa görüşlü", en: "short-sighted" },
      { de: "die Sichtweise", tr: "bakış açısı", en: "viewpoint" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki ret mektubu dört satırda yazılmış ve alıcıda karşılık bulmamış. Aynı kararı veren ama okuyanı harcamayan bir metin yaz. Kararı yumuşatma — reddediyorsun; değiştirilecek olan bilgi değil, kayıt. En az bir gönderme sözcüğü (diesbezüglich / Letzteres / darauf) ve bir ara açıklama kullan.",
        stimulus:
          "GÖNDERİLEN METİN\n\n" +
          "Betreff: Ihre Bewerbung\n\n" +
          "Absage. Andere Kandidaten passten besser. Unterlagen vernichtet.\n\n" +
          "MfG\nK. Bauer\n\n" +
          "GELEN CEVAP\n\n" +
          "„Vielen Dank für die vier Wörter. Ich hatte zwei Tage in die Aufgabe investiert.“\n\n" +
          "DURUMUN: İki finalistten biri seçildi. Diğerinin teknik çözümü iyiydi, ekip liderliği deneyimi yetersiz kaldı. Altı ay içinde ikinci bir pozisyon açılacak ve bu kişiyi tekrar davet etmek istiyorsun.",
        checklist: [
          "Ret açık mı, yumuşatılıp belirsizleştirilmemiş mi?",
          "Gerekçe somut mu (teknik çözüm iyi, ekip liderliği deneyimi)?",
          "Altı ay sonraki pozisyon gerçekçi bir dille mi anıldı?",
          "En az bir gönderme sözcüğü ve bir ara açıklama var mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Wir haben uns für eine andere Bewerberin entschieden.", tr: "başka bir aday lehine karar verdik", en: "we have decided in favour of another candidate" },
          { de: "Diesbezüglich möchte ich offen sein:", tr: "bu konuda açık olmak isterim", en: "I want to be open about this" },
          { de: "Ihre Lösung, gerade im technischen Teil, hat uns überzeugt.", tr: "çözümünüz, özellikle teknik bölümde, bizi ikna etti", en: "your solution, particularly in the technical part, convinced us" },
        ],
        sample:
          "Betreff: Ihre Bewerbung als Teamleitung — Rückmeldung\n\n" +
          "Sehr geehrte Frau Kaya,\n\n" +
          "wir haben uns nach der zweiten Runde für eine andere Bewerberin entschieden. Das Ergebnis tut mir leid, und ich möchte Ihnen sagen, worauf es beruht.\n\n" +
          "Ihre Lösung, gerade im technischen Teil, hat uns überzeugt; sie war die durchdachteste der Runde. Ausschlaggebend war ein anderer Punkt: Die Stelle führt vom ersten Tag an ein Team von neun Personen, und diesbezüglich hatte die andere Kandidatin mehrere Jahre Erfahrung vorzuweisen.\n\n" +
          "Ihre Unterlagen löschen wir, wie vorgeschrieben, nach Abschluss des Verfahrens — es sei denn, Sie stimmen einer Speicherung zu. Letzteres würde ich mir wünschen: Im Frühjahr besetzen wir eine zweite Stelle im selben Bereich, und ich würde Sie gern erneut einladen.\n\n" +
          "Vielen Dank für die Zeit, die Sie in die Aufgabe investiert haben.\n\n" +
          "Mit freundlichen Grüßen\nK. Bauer",
      },
    ],
  },
];
