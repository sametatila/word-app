import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 5.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 5. seti taşır (kimlik sonu 5).
 * Kurallar ve emsal: `de-c1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Kalan türler: popüler bilim yazısı, ders ve deneme. Üçünde de cümle
 * başlarının seçimi belirleyici; dil bilgisi Vorfeld ve bilgi sırası.
 */
export const deC1P5: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r5",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Warum niemand die Anleitung liest",
    genre: "article",
    intro: "Kullanma kılavuzlarının neden okunmadığını inceleyen bir yazı okuyacaksın: sorun uzunluk mu, sıra mı.",
    gloss: [
      { de: "einhellig", tr: "ağız birliğiyle", en: "unanimously" },
      { de: "die Gebrauchsanweisung", tr: "kullanma kılavuzu", en: "instruction manual" },
      { de: "der Lieferumfang", tr: "kutu içeriği", en: "package contents" },
      { de: "überspringen", tr: "atlamak", en: "to skip" },
      { de: "die Absicht", tr: "niyet", en: "intention" },
      { de: "die Nachlässigkeit", tr: "ihmal", en: "negligence" },
      { de: "abstellen", tr: "kapatmak", en: "to switch off" },
      { de: "abbrechen", tr: "yarıda kesmek", en: "to break off" },
    ],
    minutes: 10,
    text:
      "WARUM NIEMAND DIE ANLEITUNG LIEST\n\n" +
      "Über kaum einen Text wird so einhellig geklagt und so wenig nachgedacht wie über die " +
      "Gebrauchsanweisung. Der Vorwurf lautet meistens, sie sei zu lang. Zu lang ist sie fast nie. " +
      "Falsch geordnet ist sie fast immer.\n\n" +
      "Beginnen wir mit dem, was ein Leser in diesem Moment tut. Er hat das Gerät in der Hand, er will eine " +
      "einzige Sache erreichen, und er hat bereits angefangen. Er liest nicht, um zu lernen; er liest, um " +
      "weiterzukommen. Für diesen Leser ist der erste Satz einer Anleitung fast immer der falsche: Er " +
      "beschreibt den Lieferumfang.\n\n" +
      "Daraus folgt die erste Regel, und sie kostet nichts. Ganz nach vorn gehört, was in den nächsten " +
      "dreißig Sekunden gebraucht wird. Sicherheitshinweise sind wichtig, aber ein Hinweis, der vor der " +
      "ersten Handlung steht und mit ihr nichts zu tun hat, wird nicht gelesen, sondern übersprungen — und " +
      "mit ihm der nächste.\n\n" +
      "Die zweite Regel betrifft die Überschriften. In einer Anleitung sucht niemand nach Kapiteln, sondern " +
      "nach Absichten. „Anschluss“ ist eine Kategorie; „Wenn das Gerät nicht angeht“ ist eine Absicht, und " +
      "sie wird gefunden.\n\n" +
      "Interessanter als beide Regeln ist eine Beobachtung aus der Praxis. Getestet werden Anleitungen fast " +
      "nie mit Menschen, die das Gerät nicht kennen. Geschrieben werden sie von denen, die es am besten " +
      "kennen, und geprüft von denen, die es gebaut haben. Der Fehler ist deshalb nicht Nachlässigkeit; es " +
      "ist eine Perspektive, die man nicht abstellen, sondern nur durch jemand anderen ersetzen kann.\n\n" +
      "Am Ende bleibt eine unbequeme Einsicht. Wer eine Anleitung schreibt, entscheidet nicht darüber, ob " +
      "sie gelesen wird. Er entscheidet darüber, an welcher Stelle abgebrochen wird. Und abgebrochen wird " +
      "immer.",
    questions: [
      {
        text: "Was ist die These des Textes?",
        options: [
          "Anleitungen sind falsch geordnet, nicht zu lang.",
          "Anleitungen sollten deutlich kürzer werden.",
          "Sicherheitshinweise gehören ans Ende.",
        ],
        answer: 0,
        explain: "„Zu lang ist sie fast nie. Falsch geordnet ist sie fast immer.“",
      },
      {
        text: "Was tut der Leser laut Text in diesem Moment?",
        options: [
          "Er hat schon angefangen und will weiterkommen.",
          "Er liest den Text vorher einmal ganz durch.",
          "Er sucht zuerst nach den Überschriften.",
        ],
        answer: 0,
        explain: "„… und er hat bereits angefangen. Er liest nicht, um zu lernen; er liest, um weiterzukommen.“",
      },
      {
        kind: "truefalse",
        text: "Nach dem Text entscheidet der Verfasser nicht darüber, ob gelesen wird.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Wer eine Anleitung schreibt, entscheidet nicht darüber, ob sie gelesen wird.“",
      },
      {
        kind: "gapfill",
        text: "Ganz nach vorn gehört, was in den nächsten ___ Sekunden gebraucht wird.",
        options: [],
        answer: 0,
        accept: ["dreißig", "30"],
        explain: "„Ganz nach vorn gehört, was in den nächsten dreißig Sekunden gebraucht wird.“",
      },
      {
        kind: "short_answer",
        text: "Wonach sucht der Leser in einer Anleitung?",
        options: [],
        answer: 0,
        accept: ["nach Absichten", "Absichten", "nach einer Absicht"],
        explain: "„In einer Anleitung sucht niemand nach Kapiteln, sondern nach Absichten.“",
      },
      {
        text: "Warum werden Anleitungen selten getestet?",
        options: [
          "Sie werden von Leuten geprüft, die das Gerät kennen.",
          "Die Hinweise werden ohnehin übersprungen.",
          "Die Überschriften ändern sich zu oft.",
        ],
        answer: 0,
        explain: "„Geschrieben werden sie von denen, die es am besten kennen, und geprüft von denen, die es gebaut haben.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l5",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Patina: warum Dinge altern dürfen",
    genre: "monologue",
    intro: "Bir ders dinleyeceksin: aşınma neden bazen değer bazen kusur sayılıyor ve bu tasarım için ne anlama geliyor.",
    gloss: [
      { de: "die Abnutzung", tr: "aşınma", en: "wear" },
      { de: "der Mangel", tr: "kusur", en: "defect" },
      { de: "die Seltenheit", tr: "enderlik", en: "rarity" },
      { de: "abgerieben", tr: "aşınmış", en: "worn down" },
      { de: "gerichtet", tr: "yönlü", en: "directed" },
      { de: "die Lesbarkeit", tr: "okunabilirlik", en: "legibility" },
    ],
    minutes: 10,
    segments: [
      { text: "Guten Morgen. Wir beginnen heute mit einem Begriff, der aus der Restaurierung kommt und inzwischen weit darüber hinaus gebraucht wird: Patina." },
      { text: "Gemeint ist zunächst etwas ganz Materielles. Auf Kupfer bildet sich eine grüne Schicht, auf Leder eine dunklere Zone dort, wo die Hand liegt. Diese Schichten entstehen durch Gebrauch." },
      { text: "Interessant wird es bei der Bewertung. Bei einem Auto gilt Abnutzung als Mangel, bei einer Geige als Wert. Beide Male ist es physikalisch dasselbe." },
      { text: "Woran liegt das? Eine gängige Antwort lautet: an der Seltenheit. Diese Antwort greift zu kurz, denn abgenutzte Autos sind nicht seltener als abgenutzte Geigen." },
      { text: "Näher kommt man mit einer zweiten Überlegung. Patina wird dort geschätzt, wo sie Geschichte lesbar macht und wo diese Geschichte zum Gegenstand gehört." },
      { text: "Bei der Geige erzählt die abgeriebene Stelle, dass jemand gespielt hat, und Spielen ist der Zweck des Objekts. Beim Auto erzählt der Kratzer von einem Parkhaus, und Parken ist nicht der Zweck." },
      { text: "Daraus folgt eine Konsequenz für die Gestaltung, die in der Praxis oft übersehen wird. Wer ein Material wählt, wählt immer auch eine Alterungsform." },
      { text: "Manche Oberflächen altern gerichtet: Holz wird genau an den Stellen dunkler, an denen es berührt wird. Andere altern zufällig: Eine weiße Kunststoffkante wird an irgendeiner Stelle grau." },
      { text: "Gerichtetes Altern wird als Geschichte gelesen, zufälliges als Schaden. Das ist keine Frage des Geschmacks, sondern der Lesbarkeit." },
      { text: "Prüfen Sie das an Ihren eigenen Gegenständen. Welche sehen nach fünf Jahren gebraucht aus, welche einfach nur kaputt? Sie werden fast immer einen Materialwechsel finden." },
      { text: "In der nächsten Sitzung sehen wir uns Reparaturspuren an. Dort verschiebt sich die Frage noch einmal, denn eine sichtbare Reparatur behauptet etwas: Dieses Ding war es wert." },
    ],
    questions: [
      {
        text: "Worum geht es in der Vorlesung?",
        options: [
          "warum Abnutzung mal Wert und mal Mangel ist",
          "wie man Kupfer und Leder richtig pflegt",
          "welche Materialien am längsten halten",
        ],
        answer: 0,
        explain: "„Bei einem Auto gilt Abnutzung als Mangel, bei einer Geige als Wert. Beide Male ist es physikalisch dasselbe.“",
      },
      {
        text: "Warum reicht die Erklärung über die Seltenheit nicht?",
        options: [
          "Abgenutzte Autos sind nicht seltener.",
          "Seltenheit lässt sich gar nicht messen.",
          "Geigen sind insgesamt viel seltener.",
        ],
        answer: 0,
        explain: "„… denn abgenutzte Autos sind nicht seltener als abgenutzte Geigen.“",
      },
      {
        kind: "truefalse",
        text: "Für den Dozenten ist die Bewertung von Patina reine Geschmackssache.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Das ist keine Frage des Geschmacks, sondern der Lesbarkeit.“",
      },
      {
        kind: "short_answer",
        text: "Was wählt man laut Vorlesung mit dem Material immer mit?",
        options: [],
        answer: 0,
        accept: ["eine Alterungsform", "die Alterungsform", "Alterungsform"],
        explain: "„Wer ein Material wählt, wählt immer auch eine Alterungsform.“",
      },
      {
        kind: "dictation",
        text: "Dersin son cümlesindeki iddiayı duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Dieses Ding war es wert.", "Dieses Ding war es wert"],
        explain: "„Dieses Ding war es wert.“ — görünür bir tamir bunu iddia ediyor.",
      },
      {
        text: "Was unterscheidet gerichtetes von zufälligem Altern?",
        options: [
          "seine Lesbarkeit als Geschichte",
          "seine deutlich höhere Geschwindigkeit",
          "der Preis des verwendeten Materials",
        ],
        answer: 0,
        explain: "„Gerichtetes Altern wird als Geschichte gelesen, zufälliges als Schaden.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w5",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Was ich zu spät verstanden habe",
    genre: "essay",
    intro: "Geç anladığın bir şeyi anlatan kısa bir deneme yazacaksın; önce iki cümle kur, sonra denemeyi yaz.",
    gloss: [
      { de: "widerlegen", tr: "çürütmek", en: "to refute" },
      { de: "die Verständigung", tr: "anlaşma", en: "mutual understanding" },
      { de: "die Überzeugung", tr: "kanaat", en: "conviction" },
      { de: "hinreichend", tr: "yeterli", en: "sufficient" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bunu ancak yıllar sonra anladım.",
        answer: "Erst nach Jahren habe ich das verstanden.",
        alternatives: ["Das habe ich erst nach Jahren verstanden."],
        hint: "Cümle başına zaman ifadesi de nesne de gelebilir; seçtiğin öğe neyin öne çıktığını belirler.",
      },
      {
        kind: "build",
        tr: "Beni ikna eden argüman değildi, bir örnekti.",
        answer: "Überzeugt hat mich nicht das Argument, sondern ein Beispiel.",
        alternatives: ["Nicht das Argument hat mich überzeugt, sondern ein Beispiel."],
        hint: "Partizip'i başa almak vurguyu güçlendirir; ikinci diziliş ise olumsuzlanan öğeyi öne çıkarır.",
      },
      {
        kind: "free",
        prompt:
          "Geç anladığın bir şeyi anlat: o zaman neye inanıyordun, seni ne sarstı, bugün ne düşünüyorsun, neden bu kadar uzun sürdü ve eski görüşünden geriye ne kaldı.",
        checklist: [
          "Eski kanaatini ve neden makul göründüğünü yaz",
          "Seni sarsan somut olayı anlat",
          "Bugünkü ayrımını tek cümleyle koy",
          "Neden geç anladığını açıkla ve eski görüşten kalanı söyle",
        ],
        minWords: 120,
        phrases: [
          { de: "Lange habe ich geglaubt, dass …", tr: "Uzun süre … olduğuna inandım" },
          { de: "Widerlegt hat das …", tr: "Bunu çürüten şey … oldu" },
          { de: "Erst nach Jahren habe ich verstanden, …", tr: "Ancak yıllar sonra anladım …" },
          { de: "So lange gedauert hat es, weil …", tr: "Bu kadar uzun sürmesinin nedeni …" },
          { de: "Was bleibt, ist …", tr: "Geriye kalan …" },
        ],
        sample:
          "Lange habe ich geglaubt, dass Missverständnisse an mangelnder Genauigkeit liegen. Wer präzise " +
          "formuliert, dachte ich, wird verstanden; wer nicht verstanden wird, war unklar. Das klang vernünftig, " +
          "und es hatte den zusätzlichen Vorteil, dass die Verantwortung immer bei der anderen Seite lag, sobald " +
          "ich mir Mühe gegeben hatte.\n\n" +
          "Widerlegt hat das eine einzige Sitzung. Ich hatte einen Vorschlag in vier sauber getrennten Punkten " +
          "vorbereitet, mit Zahlen, mit Grenzen, mit einer offenen Frage. Der Vorschlag wurde abgelehnt, und " +
          "zwar aus einem Grund, der in keinem meiner vier Punkte vorkam: Zwei Kolleginnen befürchteten, ihre " +
          "Arbeit werde damit sichtbarer bewertet. Genauer hätte ich nicht werden können. Die Unklarheit lag " +
          "nicht im Text.\n\n" +
          "Erst nach Jahren habe ich verstanden, was ich verwechselt hatte. Verständlichkeit ist eine " +
          "Eigenschaft von Sätzen, Verständigung eine von Situationen. Man kann den einen Teil beliebig " +
          "verbessern, ohne den anderen zu berühren. Was gefehlt hatte, war keine Präzision, sondern eine " +
          "Frage: Was befürchtet ihr, wenn das kommt?\n\n" +
          "So lange gedauert hat es, weil die alte Überzeugung funktionierte — nur eben in den einfachen Fällen, " +
          "und die waren die meisten. Falsche Regeln überleben nicht trotz ihrer Ausnahmen, sondern wegen ihrer " +
          "Trefferquote.\n\n" +
          "Was bleibt, ist trotzdem etwas. Genauigkeit ist keine hinreichende Bedingung, aber sie bleibt eine " +
          "notwendige. Nur weiß ich inzwischen, dass sie der leichtere Teil der Arbeit ist.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s5",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Vor der Veröffentlichung testen?",
    genre: "monologue",
    intro: "İki dakikaya kadar konuşacaksın: soruyu yeniden çerçevele, en güçlü itirazı hakkıyla anlat ve ölçütünü koy.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Kurumların ürettiği metinler — yönergeler, formlar, bilgilendirmeler — yayımlanmadan önce o metni hiç bilmeyen insanlarla test edilmeli mi? Bir konum al, en güçlü itirazı anlat ve kendi ölçütünü koy.",
      bulletsTr: [
        "Test edilmemesinin ciddiye alınacak nedenini söyle",
        "Sorunun aslında ne sorusu olduğunu adlandır",
        "En güçlü itirazı hakkıyla anlat",
        "Ölçütünü koy ve iki uçtan örnekle sına",
      ],
      targets: [
        { de: "Getestet wird fast nie, und das hat einen Grund.", tr: "Neredeyse hiç test edilmiyor ve bunun bir nedeni var." },
        { de: "Sie wird als … behandelt; sie ist …", tr: "… olarak ele alınıyor; oysa …" },
        { de: "Dagegen steht ein starker Einwand.", tr: "Buna karşı güçlü bir itiraz var." },
        { de: "Mein Kriterium wäre nicht …, sondern …", tr: "Ölçütüm … değil, … olurdu" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "Getestet wird in diesem Bereich fast nie, und das hat einen Grund, den man ernst nehmen sollte: Ein " +
        "Test kostet Zeit, und Zeit ist genau das, was am Ende eines Projekts fehlt. Trotzdem halte ich die " +
        "Frage für falsch gestellt. Sie wird meistens als Qualitätsfrage behandelt; sie ist eine " +
        "Verantwortungsfrage. Wer einen Text veröffentlicht, den niemand außerhalb des Hauses gelesen hat, " +
        "verlagert die Prüfung nach außen: Sie findet trotzdem statt, nur später, einzeln und auf Kosten " +
        "derer, die den Text brauchen. Dagegen steht ein starker Einwand. Nicht jeder Text lohnt einen Test, " +
        "und ein Verfahren, das für jede Seite fünf Testpersonen verlangt, wird nach drei Monaten heimlich " +
        "umgangen. Mein Kriterium wäre deshalb nicht die Wichtigkeit, sondern die Zahl der Leser mal die " +
        "Folgen eines Missverständnisses. Ein internes Protokoll braucht nichts. Ein Formular, das " +
        "zweitausend Menschen ausfüllen und bei dem ein Fehler eine Ablehnung bedeutet, braucht drei " +
        "Personen und eine Stunde. Mehr verlange ich nicht, und weniger sollte nicht durchgehen.",
      rubricHint:
        "Soru yeniden çerçevelenmeli, en güçlü itiraz kabul edilmeli ve ölçüt iki uçtan örnekle sınanmalı; Vorfeld tercihleri belirgin olmalı.",
    },
  },
  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g5",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Was steht vorn?",
    genre: "grammar",
    intro: "Almanca cümlede fiilin yeri sabittir; oynayabildiğin tek şey onun önünde ne duracağıdır — ve bu seçim vurguyu kurar.",
    focus: "Vorfeld: bilgi sırası ve vurgu",
    gloss: [
      { de: "das Beispiel", tr: "örnek", en: "example" },
      { de: "überzeugen", tr: "ikna etmek", en: "to convince" },
      { de: "wiedersehen", tr: "tekrar görüşmek", en: "to see again" },
      { de: "die Regel", tr: "kural", en: "rule" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Fiilden önce tek bir öğe",
        tr: "Türkçede vurgulanan öğe fiile yaklaştırılır ve fiil sona gider. Almanca ana cümlede ise çekimli fiil ikinci sıradadır ve önünde YALNIZ BİR öğe durur. Bu yer Vorfeld'dir; oraya özne, nesne, zaman, yer, hatta bir yan cümle konabilir.",
        examples: [
          { de: "Ich habe das Beispiel gestern gelesen.", tr: "Örneği dün okudum.", note: "özne önde" },
          { de: "Gestern habe ich das Beispiel gelesen.", tr: "Dün örneği okudum.", note: "zaman önde" },
          { de: "Das Beispiel habe ich gestern gelesen.", tr: "Örneği dün okudum.", note: "nesne önde" },
        ],
      },
      {
        heading: "Bilinen önde, yeni arkada",
        tr: "Vorfeld genellikle önceki cümleye bağlanan, yani BİLİNEN bilgiyi taşır; asıl yeni bilgi cümlenin sonuna doğru gelir. „Daraus folgen zwei Regeln“ gibi cümleler bu yüzden akıcı durur: „daraus“ geriye bağlar, „zwei Regeln“ yeni haberdir.",
        examples: [
          { de: "Daraus folgen zwei praktische Regeln.", tr: "Bundan iki pratik kural çıkıyor." },
          { de: "Am Ende bleibt eine unbequeme Einsicht.", tr: "Sonunda rahatsız edici bir kavrayış kalıyor." },
          { de: "Es kamen viele Gäste.", tr: "Çok misafir geldi.", note: "„es“ yeri doldurur, yeni özne sona kalır" },
        ],
      },
      {
        heading: "Öne almak vurgulamaktır",
        tr: "Nesneyi, bir Partizip'i ya da bütün bir yan cümleyi Vorfeld'e almak onu öne çıkarır. Bu, Türkçedeki devrik cümlenin işine karşılık gelir ve yazıda tonu belirler.",
        examples: [
          { de: "Überzeugt hat mich das Beispiel.", tr: "Beni ikna eden örnek oldu.", note: "Partizip önde" },
          { de: "Widerlegt hat das eine einzige Sitzung.", tr: "Bunu tek bir toplantı çürüttü." },
          { de: "Dass er kommt, war klar.", tr: "Geleceği belliydi.", note: "yan cümle Vorfeld'de" },
        ],
      },
    ],
    questions: [
      {
        text: "___ habe ich das verstanden.",
        options: ["Erst nach Jahren", "Erst nach Jahren ich", "Ich erst nach Jahren"],
        answer: 0,
        explain: "Vorfeld'de yalnız bir öğe durabilir; özne fiilden sonraya geçer.",
      },
      {
        text: "Welcher Satz ist korrekt?",
        options: ["Daraus folgen zwei Regeln.", "Daraus zwei Regeln folgen.", "Zwei Regeln daraus folgen."],
        answer: 0,
        explain: "Çekimli fiil ikinci sırada olmalı; „daraus“ Vorfeld'i doldurunca fiil hemen arkasından gelir.",
      },
      {
        text: "Im Vorfeld eines Aussagesatzes steht …",
        options: ["genau ein Satzglied", "höchstens zwei Satzglieder", "immer das Subjekt"],
        answer: 0,
        explain: "Kural tek öğedir; özne olmak zorunda değildir, ama iki öğe olamaz.",
      },
      {
        kind: "gapfill",
        text: "„Ich habe den Brief gestern gelesen.“ → „Gestern ___ ich den Brief gelesen.“",
        options: [],
        answer: 0,
        accept: ["habe"],
        explain: "Vorfeld'e zaman ifadesi geçince çekimli fiil ikinci sırada kalır ve özne arkasına düşer.",
      },
      {
        kind: "gapfill",
        text: "Ergänze den Platzhalter: „___ kamen viele Gäste.“",
        options: [],
        answer: 0,
        accept: ["Es", "es"],
        explain: "„es“ Vorfeld'i doldurur, böylece yeni bilgi olan özne cümle sonunda kalır.",
      },
      {
        kind: "gapfill",
        text: "Betone das Objekt: „Ich habe das Beispiel gemeint.“ → „___ Beispiel habe ich gemeint.“",
        options: [],
        answer: 0,
        accept: ["Das", "das"],
        explain: "Nesne Vorfeld'e alınınca vurgulanır; fiil yine ikinci sırada durur.",
      },
      {
        kind: "gapfill",
        text: "„Wir haben uns nach Jahren wiedergesehen.“ → „Nach Jahren ___ wir uns wiedergesehen.“",
        options: [],
        answer: 0,
        accept: ["haben"],
        explain: "Vorfeld dolduğu için çekimli fiil hemen arkasından gelir: Nach Jahren haben wir …",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Daraus", "folgen", "zwei", "praktische", "Regeln"],
        explain: "Geriye bağlayan öğe önde, yeni bilgi sonda: Daraus folgen zwei praktische Regeln.",
      },
      {
        kind: "truefalse",
        text: "„Gestern ich war im Kino.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Vorfeld'de iki öğe olamaz; doğrusu „Gestern war ich im Kino.“",
      },
      {
        kind: "truefalse",
        text: "„Überzeugt hat mich nicht das Argument, sondern ein Beispiel.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Partizip Vorfeld'e alınmış, fiil ikinci sırada; vurgu bilinçli olarak kurulmuş.",
      },
    ],
  },
];
