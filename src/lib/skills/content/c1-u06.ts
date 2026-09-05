import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 6 — "Devrik cümle, üçleme, metafor, zor dinleyici".
 *
 * Dört ders: Selten habe ich so gelacht · Kurz, klar, überzeugend · Bilder im
 * Kopf · Das schwierige Publikum.
 *
 *   Kelime: die Hervorhebung, die Wirkung, die Wortstellung, verstärken,
 *           wirkungsvoll, hervorheben, verdeutlichen, die Verstärkung · die
 *           Pause, die Aufzählung, prägnant, einprägsam, das Muster, das
 *           Sprichwort, der Reiz, entsprechen · die Metapher, der rote Faden,
 *           veranschaulichen, das Bild, der Nenner, der Mythos, schweben,
 *           der Vers · gestatten, aufgreifen, entkräften, der Zwischenruf,
 *           souverän, provozieren, billigen, starr
 *
 * Ünitenin çekirdeği ŞU: Almancada vurgu ses tonuyla değil SÖZ DİZİMİYLE
 * yapılır. "Selten habe ich so gelacht" cümlesinde devrik yapı vurguyu
 * "selten"e yükler; Türkçede aynı şeyi tonlama yapar ve o yüzden Türkçe
 * konuşan yazarken vurgusuz kalır. Üçleme ve metafor aynı işin öteki
 * araçları — ritim ve imge.
 *
 * Zor dinleyici dersi bunları sınıyor: laf atmayı karşılamak, hazırlıklı
 * cümleyi bırakıp o anda yapı kurmak demek.
 */
export const c1U06: SkillExercise[] = [
  {
    id: "c1-u06-r1",
    level: "C1",
    skill: "reading",
    unit: 6,
    title: "Wo die Betonung im Satz sitzt",
    genre: "Dil yazısı",
    intro: "Almanca vurguyu nereye koyuyor? Ses değil, dizilim.",
    gloss: [
      { de: "die Hervorhebung", tr: "öne çıkarma", en: "emphasis" },
      { de: "die Wortstellung", tr: "kelime dizilimi", en: "word order" },
      { de: "verstärken", tr: "pekiştirmek", en: "to intensify" },
      { de: "wirkungsvoll", tr: "etkili", en: "effective" },
      { de: "hervorheben", tr: "öne çıkarmak", en: "to highlight" },
      { de: "verdeutlichen", tr: "açıkça göstermek", en: "to make clear" },
      { de: "die Verstärkung", tr: "pekiştirme", en: "reinforcement" },
      { de: "die Wirkung", tr: "etki", en: "effect" },
    ],
    minutes: 7,
    text:
      "DER SATZ HAT EINE VORDERTÜR\n\n" +
      "„Ich habe selten so gelacht“ und „Selten habe ich so gelacht“ enthalten dieselben Wörter. Ihre Wirkung ist verschieden.\n\n" +
      "Der Grund liegt in der ersten Position. Das deutsche Hauptsatzverb steht auf Platz zwei; alles, was davor steht, ist damit hervorgehoben. Wer „selten“ nach vorn zieht, zwingt den Zuhörer, mit der Seltenheit zu beginnen. Der Rest des Satzes lehnt sich daran an.\n\n" +
      "Das ist keine Stilfrage, sondern Grammatik im Dienst der Betonung. Sprachen mit freierer Wortstellung verteilen diese Aufgabe auf die Stimme; das Deutsche verlangt eine Entscheidung, bevor der Satz beginnt.\n\n" +
      "Zwei Beobachtungen dazu. Erstens: Die Hervorhebung nutzt sich ab. Wer jeden zweiten Satz invertiert, erzeugt keine Verstärkung mehr, sondern Manier. Zweitens: Die stärkste erste Position ist selten das Subjekt. „Erst dann verstand ich, worum es ging“ wirkt, weil der Zeitpunkt vorn steht und der Erkennende hinten.\n\n" +
      "Wer eine Rede schreibt, kann das verdeutlichen, indem er die ersten drei Wörter jedes Satzes untereinander schreibt. Steht dort dreimal „Wir“, ist die Rede noch nicht fertig.",
    questions: [
      {
        text: "Warum wirken die beiden Sätze verschieden?",
        options: [
          "Weil sie unterschiedliche Wörter enthalten",
          "Weil im Deutschen das erste Satzglied hervorgehoben ist",
          "Weil einer länger ist",
        ],
        answer: 1,
        explain: "„alles, was davor steht, ist damit hervorgehoben“ — vurgu ilk konumla kuruluyor.",
      },
      {
        kind: "gapfill",
        text: "___ dann verstand ich, worum es ging.",
        options: [],
        answer: 0,
        accept: ["Erst"],
        explain: "Zaman öne çekilince fiil ikinci sıraya, özne arkaya geçiyor — vurgu ana.",
      },
      {
        text: "Was passiert laut Text bei zu häufiger Inversion?",
        options: [
          "Der Text wird klarer",
          "Die Hervorhebung nutzt sich ab",
          "Die Grammatik wird falsch",
        ],
        answer: 1,
        explain: "„erzeugt keine Verstärkung mehr, sondern Manier“.",
      },
      {
        kind: "short_answer",
        text: "Welchen praktischen Test schlägt der Text für eine Rede vor?",
        options: [],
        answer: 0,
        accept: [
          "die ersten drei Wörter jedes Satzes untereinander schreiben",
          "die ersten drei Wörter untereinander schreiben",
          "prüfen, ob dort dreimal Wir steht",
        ],
        explain: "„Steht dort dreimal ‚Wir‘, ist die Rede noch nicht fertig.“",
      },
      {
        kind: "short_answer",
        text: "Warum ist die Betonung im Deutschen laut Text keine reine Stilfrage?",
        options: [],
        answer: 0,
        accept: [
          "weil sie über die Grammatik läuft",
          "es ist Grammatik im Dienst der Betonung",
          "die Wortstellung entscheidet, nicht die Stimme",
        ],
        explain: "„Grammatik im Dienst der Betonung“ — seçim cümle başlamadan yapılmak zorunda.",
      },
    ],
  },
  {
    id: "c1-u06-r2",
    level: "C1",
    skill: "reading",
    unit: 6,
    title: "Drei Sätze und ein Bild",
    genre: "Rehber yazısı",
    intro: "Üçleme ve metafor: neden işe yarıyor, ne zaman bozuyor?",
    gloss: [
      { de: "die Aufzählung", tr: "sıralama", en: "enumeration" },
      { de: "prägnant", tr: "özlü", en: "concise" },
      { de: "einprägsam", tr: "akılda kalıcı", en: "memorable" },
      { de: "das Muster", tr: "örüntü", en: "pattern" },
      { de: "die Metapher", tr: "metafor", en: "metaphor" },
      { de: "veranschaulichen", tr: "somutlaştırmak", en: "to illustrate" },
      { de: "der Nenner", tr: "payda, ortak nokta", en: "denominator" },
      { de: "der rote Faden", tr: "ana hat", en: "common thread" },
    ],
    minutes: 7,
    text:
      "WARUM DREI\n\n" +
      "„Kurz, klar, überzeugend.“ Drei Wörter, kein Komma zu viel. Die Dreierfigur ist die älteste Regel der Rhetorik und die einzige, die fast niemand bewusst lernt.\n\n" +
      "Der Grund ist wahrnehmungspsychologisch schlicht: Zwei Elemente bilden noch keinen Rhythmus, vier verlangen Aufmerksamkeit für die Aufzählung selbst. Drei genügen, damit das Ohr ein Muster erkennt — und ein erkanntes Muster wirkt einprägsam, auch wenn der Inhalt es nicht ist.\n\n" +
      "Genau darin liegt die Gefahr. Eine prägnante Dreierfigur kann eine schwache Aussage tragen, ohne sie besser zu machen. Wer „schneller, günstiger, nachhaltiger“ sagt, hat drei Behauptungen aufgestellt und keine belegt.\n\n" +
      "Ähnlich die Metapher. Sie veranschaulicht, indem sie zwei Bereiche auf einen Nenner bringt. „Wir haben den roten Faden verloren“ erklärt in vier Wörtern, wozu ein Absatz nötig wäre.\n\n" +
      "Doch jede Metapher bringt ihr eigenes Gepäck mit. Wer im Betrieb vom „Kampf um Marktanteile“ spricht, hat Gegner benannt und Verhandlung ausgeschlossen — meist ohne es zu wollen. Das Bild denkt weiter, wenn der Redner längst aufgehört hat.\n\n" +
      "Die Prüfung ist einfach: Lässt sich die Aussage ohne das Bild noch verteidigen? Wenn nicht, war es kein Bild, sondern ein Argumentersatz.",
    questions: [
      {
        text: "Warum funktioniert die Dreierfigur laut Text?",
        options: [
          "Drei Argumente sind überzeugender als zwei",
          "Drei Elemente genügen, damit das Ohr ein Muster erkennt",
          "Sie ist eine alte Tradition",
        ],
        answer: 1,
        explain: "„Zwei Elemente bilden noch keinen Rhythmus, vier verlangen Aufmerksamkeit für die Aufzählung selbst.“",
      },
      {
        kind: "gapfill",
        text: "Sie veranschaulicht, indem sie zwei Bereiche auf einen ___ bringt.",
        options: [],
        answer: 0,
        accept: ["Nenner"],
        explain: "auf einen Nenner bringen: iki alanı ortak bir noktada buluşturmak.",
      },
      {
        text: "Worin liegt die Gefahr der Dreierfigur?",
        options: [
          "Sie ist zu lang",
          "Sie kann eine schwache Aussage tragen, ohne sie besser zu machen",
          "Sie klingt altmodisch",
        ],
        answer: 1,
        explain: "„drei Behauptungen aufgestellt und keine belegt“.",
      },
      {
        kind: "short_answer",
        text: "Was bringt laut Text die Metapher „Kampf um Marktanteile“ ungewollt mit?",
        options: [],
        answer: 0,
        accept: [
          "sie benennt Gegner und schließt Verhandlung aus",
          "Gegner und keine Verhandlung",
          "das Bild denkt weiter",
        ],
        explain: "„Das Bild denkt weiter, wenn der Redner längst aufgehört hat.“",
      },
      {
        kind: "short_answer",
        text: "Wie lautet die vorgeschlagene Prüfung für eine Metapher?",
        options: [],
        answer: 0,
        accept: [
          "lässt sich die Aussage ohne das Bild noch verteidigen",
          "ob die Aussage ohne Bild hält",
          "Aussage ohne Bild prüfen",
        ],
        explain: "Tutmuyorsa imge değil, argüman yerine geçmiş demektir.",
      },
    ],
  },
  {
    id: "c1-u06-l1",
    level: "C1",
    skill: "listening",
    unit: 6,
    title: "Der Zwischenruf",
    genre: "Etkinlik",
    intro: "Sunumda laf atma. Konuşmacı nasıl karşılıyor?",
    gloss: [
      { de: "der Zwischenruf", tr: "laf atma", en: "heckling" },
      { de: "gestatten", tr: "izin vermek", en: "to permit" },
      { de: "aufgreifen", tr: "ele almak, üstüne gitmek", en: "to pick up" },
      { de: "entkräften", tr: "çürütmek", en: "to refute" },
      { de: "souverän", tr: "duruma hâkim", en: "composed" },
      { de: "provozieren", tr: "kışkırtmak", en: "to provoke" },
      { de: "starr", tr: "esnemez", en: "rigid" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Rednerin", text: "… und deshalb rechnen wir mit einer Amortisation nach vier Jahren." },
      { speaker: "Zwischenruf", text: "Bei welchem Zinssatz denn? Vier Jahre schafft das nie!" },
      { speaker: "Rednerin", text: "Ihre Frage greife ich gern auf. Bei 3,2 Prozent — das ist der Satz aus dem Angebot vom Februar." },
      { speaker: "Zwischenruf", text: "Und wenn er steigt?" },
      { speaker: "Rednerin", text: "Dann verschiebt sich die Amortisation auf fünf Jahre. Das steht auf Folie elf, ich springe kurz zurück." },
      { speaker: "Zwischenruf", text: "Hm." },
      { speaker: "Rednerin", text: "Gestatten Sie mir eine Rückfrage: Halten Sie fünf Jahre für zu lang, oder halten Sie die 3,2 Prozent für unrealistisch?" },
      { speaker: "Zwischenruf", text: "Das Zweite." },
      { speaker: "Rednerin", text: "Gut, dann reden wir über den Zinssatz und nicht über die Amortisation. Das ist die kürzere Diskussion." },
      { speaker: "Moderator", text: "Wir nehmen das nachher auf, ja? Sonst verlieren wir die Zeit." },
      { speaker: "Rednerin", text: "Einverstanden. Herr Kollege, ich komme nach dem Vortrag auf Sie zu." },
    ],
    questions: [
      {
        text: "Wie reagiert die Rednerin auf den ersten Zwischenruf?",
        options: [
          "Sie ignoriert ihn.",
          "Sie greift ihn auf und nennt die Zahl.",
          "Sie verweist auf den Moderator.",
        ],
        answer: 1,
        explain: "„Ihre Frage greife ich gern auf. Bei 3,2 Prozent …“ — savunma değil, veriyle karşılama.",
      },
      {
        kind: "gapfill",
        text: "___ Sie mir eine Rückfrage.",
        options: [],
        answer: 0,
        accept: ["Gestatten"],
        explain: "Resmî izin isteme kalıbı; soruyu geri çevirirken tonu düşürüyor.",
      },
      {
        text: "Was bewirkt die Rückfrage der Rednerin?",
        options: [
          "Sie beendet die Diskussion.",
          "Sie trennt zwei verschiedene Einwände voneinander.",
          "Sie provoziert den Zwischenrufer.",
        ],
        answer: 1,
        explain: "„Halten Sie fünf Jahre für zu lang, oder halten Sie die 3,2 Prozent für unrealistisch?“ — itirazın kapsamını daraltıyor.",
      },
      {
        kind: "dictation",
        text: "Konuşmacının tartışmayı hangi konuya çektiğini söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Gut, dann reden wir über den Zinssatz und nicht über die Amortisation.",
          "dann reden wir über den Zinssatz und nicht über die Amortisation",
        ],
        explain: "Doğru itirazı bulunca tartışma kısalıyor — „Das ist die kürzere Diskussion.“",
      },
    ],
  },
  {
    id: "c1-u06-l2",
    level: "C1",
    skill: "listening",
    unit: 6,
    title: "Ein Bild zu viel",
    genre: "Diyalog",
    intro: "Sunum provası. Hangi metafor taşıyor, hangisi ters tepiyor?",
    gloss: [
      { de: "die Metapher", tr: "metafor", en: "metaphor" },
      { de: "veranschaulichen", tr: "somutlaştırmak", en: "to illustrate" },
      { de: "das Bild", tr: "imge", en: "image" },
      { de: "der Mythos", tr: "efsane", en: "myth" },
      { de: "schweben", tr: "süzülmek, havada durmak", en: "to float" },
      { de: "prägnant", tr: "özlü", en: "concise" },
      { de: "der rote Faden", tr: "ana hat", en: "common thread" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Jonas", text: "Wie fandest du den Einstieg? „Unser Markt ist ein Schlachtfeld.“" },
      { speaker: "Frau Neumann", text: "Stark. Und falsch." },
      { speaker: "Jonas", text: "Das musst du erklären." },
      { speaker: "Frau Neumann", text: "Auf einem Schlachtfeld gibt es keine Verhandlung. Du sitzt danach mit genau diesen Leuten am Tisch." },
      { speaker: "Jonas", text: "Es sollte nur veranschaulichen, wie hart es ist." },
      { speaker: "Frau Neumann", text: "Das Bild veranschaulicht mehr, als du willst. Metaphern denken weiter." },
      { speaker: "Jonas", text: "Und was stattdessen?" },
      { speaker: "Frau Neumann", text: "Was ist die Sache wirklich? Enge Margen, viele Anbieter, dieselben Kunden." },
      { speaker: "Jonas", text: "Ein voller Wartesaal, in dem alle denselben Zug wollen." },
      { speaker: "Frau Neumann", text: "Besser. Da ist Konkurrenz drin, aber kein Feind. Und es ist prägnant." },
      { speaker: "Jonas", text: "Der Rest der Präsentation bleibt aber, oder? Der rote Faden stimmt?" },
      { speaker: "Frau Neumann", text: "Der Faden stimmt. Nur schwebt Folie sieben über allem und gehört nirgends dazu — die würde ich streichen." },
      { speaker: "Jonas", text: "Die mit dem Mythos vom Gründergeist." },
      { speaker: "Frau Neumann", text: "Genau die. Schöne Folie, falscher Vortrag." },
    ],
    questions: [
      {
        text: "Warum hält Frau Neumann „Schlachtfeld“ für falsch?",
        options: [
          "Es ist zu dramatisch.",
          "Auf einem Schlachtfeld gibt es keine Verhandlung.",
          "Es ist ein Klischee.",
        ],
        answer: 1,
        explain: "„Du sitzt danach mit genau diesen Leuten am Tisch.“ İmge sonraki ilişkiyi de belirliyor.",
      },
      {
        kind: "gapfill",
        text: "Das Bild veranschaulicht mehr, als du willst. Metaphern ___ weiter.",
        options: [],
        answer: 0,
        accept: ["denken"],
        explain: "Metafor kendi mantığını da getirir; konuşmacı sussa da imge çalışmaya devam eder.",
      },
      {
        text: "Was ist an Jonas' zweitem Bild besser?",
        options: [
          "Es ist kürzer.",
          "Es enthält Konkurrenz, aber keinen Feind.",
          "Es ist origineller.",
        ],
        answer: 1,
        explain: "„Da ist Konkurrenz drin, aber kein Feind. Und es ist prägnant.“",
      },
      {
        kind: "short_answer",
        text: "Was ist das Problem mit Folie sieben?",
        options: [],
        answer: 0,
        accept: [
          "sie schwebt über allem und gehört nirgends dazu",
          "sie passt nicht in den roten Faden",
          "schöne Folie, falscher Vortrag",
        ],
        explain: "„Schöne Folie, falscher Vortrag“ — tek başına iyi olması yeterli değil.",
      },
    ],
  },
  {
    id: "c1-u06-w1",
    level: "C1",
    skill: "writing",
    unit: 6,
    title: "Vurguyu dizilimle kurmak",
    genre: "Dil bilgisi",
    intro: "İlk konum vurguyu taşır; fiil her hâlükârda ikinci sırada kalır.",
    gloss: [
      { de: "hervorheben", tr: "öne çıkarmak", en: "to highlight" },
      { de: "die Wortstellung", tr: "kelime dizilimi", en: "word order" },
      { de: "einprägsam", tr: "akılda kalıcı", en: "memorable" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Nadiren bu kadar güldüm.",
        answer: "Selten habe ich so gelacht",
        hint: "Zarf öne çekilince fiil ikinci sırada kalır ve özne arkaya geçer.",
      },
      {
        kind: "build",
        tr: "Ancak o zaman neyin söz konusu olduğunu anladım.",
        answer: "Erst dann verstand ich, worum es ging",
        hint: "Zaman öne, özne fiilden sonra: vurgu ana.",
      },
      {
        kind: "build",
        tr: "Kısa, net, ikna edici.",
        answer: "Kurz, klar, überzeugend",
        hint: "Üçleme: virgülle, bağlaçsız — ritim böyle kuruluyor.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi devrik kur: vurgu zamanın üstünde olmalı, öznenin değil.",
        source: "Ich habe erst nach dem dritten Versuch verstanden, worum es ging.",
        answer: "Erst nach dem dritten Versuch habe ich verstanden, worum es ging.",
        alternatives: ["Erst nach dem dritten Versuch habe ich verstanden, worum es ging"],
        why: "Almancada vurgu ilk konumla verilir. Özneyle başlayan cümle nötr kalır; Türkçede aynı işi tonlama yaptığı için bu adım kolayca atlanır.",
      },
    ],
  },
  {
    id: "c1-u06-w2",
    level: "C1",
    skill: "writing",
    unit: 6,
    title: "Der Einstieg einer Rede",
    genre: "Konuşma metni",
    intro: "Bir konuşmanın ilk otuz saniyesi: devrik cümle, üçleme, taşıyan bir imge.",
    gloss: [
      { de: "die Hervorhebung", tr: "öne çıkarma", en: "emphasis" },
      { de: "veranschaulichen", tr: "somutlaştırmak", en: "to illustrate" },
      { de: "einprägsam", tr: "akılda kalıcı", en: "memorable" },
      { de: "der rote Faden", tr: "ana hat", en: "common thread" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Aşağıdaki durum için bir konuşma girişi yaz (6-9 cümle). Şunları kullan: en az bir devrik cümle (ilk konumda özne OLMAYACAK), bir üçleme, ve bir metafor — ama metaforun getirdiği mantığı da düşün, düşman üretme. Sonda ana hattı bir cümleyle söyle.",
        stimulus:
          "DURUM: Belediyenin kütüphane bütçesini üçte bir kısma önerisine karşı, kütüphane müdürü olarak meclis önünde konuşuyorsun.\n\n" +
          "ELİNDEKİ VERİ:\n" +
          "— Yıllık ziyaret 240.000, beş yılda %18 artmış\n" +
          "— Kullanıcıların %40'ı 18 yaş altı\n" +
          "— Bütçenin %70'i personel; kesinti doğrudan açılış saatlerine iniyor\n" +
          "— Kapanan iki şube komşu ilçede: ziyaret oradan da düşmüş",
        checklist: [
          "En az bir devrik cümle var mı (ilk konumda özne değil)?",
          "Bir üçleme var mı?",
          "Metafor düşman üretmiyor mu?",
          "Ana hattı bir cümleyle söyledin mi?",
        ],
        minWords: 90,
        phrases: [
          { de: "Selten haben wir …", tr: "nadiren …", en: "rarely have we …" },
          { de: "Erst dann zeigt sich, …", tr: "ancak o zaman ortaya çıkar", en: "only then does it become clear" },
          { de: "Der rote Faden dieser Sitzung ist …", tr: "bu oturumun ana hattı …", en: "the common thread of this session is …" },
        ],
        sample:
          "Selten hat eine Einrichtung dieser Stadt so deutlich zugelegt wie diese: 240.000 Besuche im Jahr, achtzehn Prozent mehr als vor fünf Jahren.\n\n" +
          "Vierzig Prozent davon sind unter achtzehn. Das heißt: Wir sprechen hier nicht über Regale, sondern über Nachmittage, über Hausaufgaben, über den einzigen warmen Raum, in dem Lernen nichts kostet.\n\n" +
          "Nun soll ein Drittel des Budgets entfallen. Siebzig Prozent unserer Mittel sind Personal — ein Drittel weniger Geld heißt darum nicht weniger Papier, sondern weniger Stunden. Erst dann zeigt sich, was gestrichen wurde: nicht ein Posten, sondern eine Öffnungszeit.\n\n" +
          "Im Nachbarkreis hat man das vor zwei Jahren versucht. Zwei Zweigstellen sind geschlossen, und die Besuche sind auch dort gesunken, wo geöffnet blieb. Ein Netz verliert nicht nur den Knoten, den man herausnimmt.\n\n" +
          "Der rote Faden meines Vorschlags ist deshalb einfach: Wir sparen an den Beständen, nicht an den Stunden.",
      },
    ],
  },
];
