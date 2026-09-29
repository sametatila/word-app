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
    title: "Fünfzig Jahre TSV Nordheim",
    genre: "text",
    intro: "Bir spor kulübünün ellinci yıl dönümünde yapılan konuşma. Kulüp nasıl büyüdü, bugün neye ihtiyacı var?",
    gloss: [
      { de: "wirkungsvoll", tr: "etkili", en: "effective" },
      { de: "das Jubiläum", tr: "yıl dönümü", en: "anniversary" },
      { de: "das Mitglied", tr: "üye", en: "member" },
      { de: "der Hausmeister", tr: "kapıcı", en: "caretaker" },
      { de: "die Laune", tr: "heves", en: "whim" },
      { de: "die Turnhalle", tr: "spor salonu", en: "gym" },
      { de: "der Durchbruch", tr: "atılım", en: "breakthrough" },
      { de: "die Kreismeisterschaft", tr: "ilçe şampiyonluğu", en: "district championship" },
      { de: "der Spielfeldrand", tr: "saha kenarı", en: "sideline" },
      { de: "die Anzeigetafel", tr: "skor tabelası", en: "scoreboard" },
      { de: "die Spende", tr: "bağış", en: "donation" },
      { de: "die Fliese", tr: "fayans", en: "tile" },
      { de: "der Schiedsrichter", tr: "hakem", en: "referee" },
      { de: "beschimpfen", tr: "sövmek", en: "to insult" },
      { de: "der Pokal", tr: "kupa", en: "trophy" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "die Halle", tr: "salon", en: "hall" },
      { de: "leicht", tr: "kolay", en: "easy" },
      { de: "vorbei", tr: "bitmiş", en: "over" },
      { de: "zählen", tr: "saymak", en: "to count" },
    ],
    minutes: 7,
    text:
      "FESTREDE ZUM JUBILÄUM\n\n" +
      "Liebe Mitglieder, liebe Gäste,\n\n" +
      "selten habe ich so viele Menschen in dieser Halle gesehen. Vor fünfzig Jahren standen hier zwölf junge Leute, zwei Bälle und ein Hausmeister, der um neun das Licht ausschaltete. Aus diesen zwölf sind heute über tausend Mitglieder geworden.\n\n" +
      "Leicht war der Anfang nicht. Kein Geld gab es, keine eigene Halle, und die Stadt hielt einen Sportverein für eine Laune, die nach einem Winter vorbei sein würde. Trainiert wurde deshalb in der Turnhalle der Grundschule, abends nach acht, wenn die Kinder weg waren.\n\n" +
      "Erst im dritten Jahr kam der Durchbruch. Unsere Frauenmannschaft gewann die Kreismeisterschaft, und plötzlich stand der Bürgermeister am Spielfeldrand. Ich war damals vierzehn und habe die Tore gezählt, weil die Anzeigetafel kaputt war. Erst dann verstand ich, worum es ging: Ein Verein ist nicht die Halle und nicht der Pokal, sondern die Leute, die abends wiederkommen.\n\n" +
      "Nie hätte damals jemand gedacht, dass wir einmal eine eigene Halle bauen würden. Genau das haben wir vor zwanzig Jahren getan, mit Spenden, mit Krediten und mit Wochenenden, an denen Mitglieder selbst Fliesen gelegt haben.\n\n" +
      "Besonders danken möchte ich heute denen, die man selten sieht: den Trainerinnen, die jeden Dienstag um sechs in der Halle stehen, den Eltern, die Kuchen backen, und den Schiedsrichtern, die sich jedes Wochenende beschimpfen lassen.\n\n" +
      "Viel liegt noch vor uns. Die Halle braucht ein neues Dach, und für die Jugend fehlen uns Trainer. Wirkungsvoll helfen kann jeder, der zwei Stunden in der Woche übrig hat.\n\n" +
      "Heute aber feiern wir. Auf die nächsten fünfzig Jahre!",
    questions: [
      {
        text: "Wo wurde in den ersten Jahren trainiert?",
        options: [
          "In der Turnhalle der Grundschule",
          "Auf einem Sportplatz im Freien",
          "In einer Halle der Stadt",
        ],
        answer: 0,
        explain: "„Trainiert wurde deshalb in der Turnhalle der Grundschule, abends nach acht, wenn die Kinder weg waren.“",
      },
      {
        kind: "gapfill",
        text: "___ dann verstand ich, worum es ging.",
        options: [],
        answer: 0,
        accept: ["Erst"],
        explain: "Zaman öne çekilince fiil ikinci sıraya, özne arkaya geçiyor — vurgu o ana düşüyor.",
      },
      {
        text: "Was brachte im dritten Jahr den Durchbruch?",
        options: [
          "Eine große Spende",
          "Die Kreismeisterschaft der Frauenmannschaft",
          "Die neue Halle",
        ],
        answer: 1,
        explain: "„Unsere Frauenmannschaft gewann die Kreismeisterschaft, und plötzlich stand der Bürgermeister am Spielfeldrand.“",
      },
      {
        kind: "short_answer",
        text: "Womit hat der Verein seine eigene Halle gebaut?",
        options: [],
        answer: 0,
        accept: [
          "mit Spenden und Krediten",
          "Spenden, Kredite und Eigenarbeit",
          "mit Spenden, Krediten und eigener Arbeit",
          "Spenden und Kredite",
        ],
        explain: "Bağışlar, krediler ve üyelerin kendi emeğiyle geçen hafta sonları.",
      },
      {
        kind: "short_answer",
        text: "Was braucht der Verein heute?",
        options: [],
        answer: 0,
        accept: [
          "ein neues Dach und Trainer",
          "Trainer für die Jugend",
          "ein neues Dach",
          "neues Dach, Trainer für die Jugend",
        ],
        explain: "„Die Halle braucht ein neues Dach, und für die Jugend fehlen uns Trainer.“",
      },
    ],
  },
  {
    id: "c1-u06-r2",
    level: "C1",
    skill: "reading",
    unit: 6,
    title: "Drei Sätze und ein Bild",
    genre: "guide",
    intro: "Üçleme ve metafor: neden işe yarıyor, ne zaman bozuyor?",
    gloss: [
      { de: "die Aufzählung", tr: "sıralama", en: "enumeration" },
      { de: "prägnant", tr: "özlü", en: "concise" },
      { de: "einprägsam", tr: "akılda kalıcı", en: "memorable" },
      { de: "das Muster", tr: "örüntü", en: "pattern" },
      { de: "die Metapher", tr: "metafor", en: "metaphor" },
      { de: "veranschaulichen", tr: "somutlaştırmak", en: "to illustrate" },
      { de: "der Nenner", tr: "payda / ortak nokta", en: "denominator" },
      { de: "der rote Faden", tr: "ana hat", en: "common thread" },
      { de: "einzige", tr: "tek", en: "only" },
      { de: "genügen", tr: "yetmek", en: "to be enough" },
      { de: "das Ohr", tr: "kulak", en: "ear" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "die Aussage", tr: "ifade", en: "statement" },
      { de: "nachhaltig", tr: "sürdürülebilir", en: "sustainable" },
      { de: "verlobt", tr: "nişanlı", en: "engaged" },
      { de: "der Absatz", tr: "paragraf", en: "paragraph" },
      { de: "der Kampf", tr: "mücadele", en: "fight" },
      { de: "meiste", tr: "çoğu", en: "most" },
      { de: "aufgehen", tr: "doğmak", en: "to rise" },
      { de: "besonders", tr: "özellikle", en: "especially" },
      { de: "solche", tr: "böyle", en: "such" },
      { de: "natürlich", tr: "doğal", en: "natural" },
      { de: "abbauen", tr: "azaltmak", en: "to reduce" },
      { de: "die Zahl", tr: "sayı", en: "number" },
      { de: "strittig", tr: "ihtilaflı", en: "disputed" },
      { de: "nüchtern", tr: "sade / yavan", en: "plain, dry" },
      { de: "der Pass", tr: "pasaport", en: "passport" },
      { de: "lesen", tr: "okumak", en: "to read" },
      { de: "der Text", tr: "metin", en: "text" },
      { de: "schließen", tr: "kapatmak", en: "to close" },
      { de: "bestritten", tr: "reddedilmiş", en: "denied" },
    ],
    minutes: 7,
    text:
      "WARUM DREI\n\n" +
      "„Kurz, klar, überzeugend.“ Drei Wörter, kein Komma zu viel. Die Dreierfigur ist die älteste Regel der Rhetorik und die einzige, die fast niemand bewusst lernt.\n\n" +
      "Der Grund ist wahrnehmungspsychologisch schlicht: Zwei Elemente bilden noch keinen Rhythmus, vier verlangen Aufmerksamkeit für die Aufzählung selbst. Drei genügen, damit das Ohr ein Muster erkennt — und ein erkanntes Muster wirkt einprägsam, auch wenn der Inhalt es nicht ist.\n\n" +
      "Genau darin liegt die Gefahr. Eine prägnante Dreierfigur kann eine schwache Aussage tragen, ohne sie besser zu machen. Wer „schneller, günstiger, nachhaltiger“ sagt, hat drei Behauptungen aufgestellt und keine belegt.\n\n" +
      "Ähnlich die Metapher. Sie veranschaulicht, indem sie zwei Bereiche auf einen Nenner bringt. „Wir haben den roten Faden verloren“ erklärt in einem Satz, wozu ein Absatz nötig wäre.\n\n" +
      "Doch jede Metapher bringt ihr eigenes Gepäck mit. Wer im Betrieb vom „Kampf um Marktanteile“ spricht, hat Gegner benannt und Verhandlung ausgeschlossen — meist ohne es zu wollen. Das Bild denkt weiter, wenn der Redner längst aufgehört hat.\n\n" +
      "Besonders zäh sind Metaphern, die niemand mehr als solche hört. „Wachstum“ kommt aus der Biologie und legt nahe, dass mehr immer natürlich sei; „Schulden abbauen“ kommt aus dem Bergbau und macht aus einer Zahl einen Berg. Beide Bilder tragen eine Wertung, die nie ausgesprochen und deshalb auch nie bestritten wird.\n\n" +
      "Wer Metaphern prüfen will, ersetzt sie testweise durch das nüchternste Wort, das passt, und liest den Satz noch einmal.\n\n" +
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
          "Gegner und keine Verhandlung",
          "sie benennt Gegner und schließt Verhandlung aus",
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
          "Aussage ohne Bild prüfen",
          "lässt sich die Aussage ohne das Bild noch verteidigen",
          "ob die Aussage ohne Bild hält",
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
    genre: "info",
    intro: "Sunumda laf atma. Konuşmacı nasıl karşılıyor?",
    gloss: [
      { de: "der Zwischenruf", tr: "laf atma", en: "heckling" },
      { de: "gestatten", tr: "izin vermek", en: "to permit" },
      { de: "aufgreifen", tr: "ele almak / üstüne gitmek", en: "to pick up" },
      { de: "entkräften", tr: "çürütmek", en: "to refute" },
      { de: "souverän", tr: "duruma hâkim", en: "composed" },
      { de: "provozieren", tr: "kışkırtmak", en: "to provoke" },
      { de: "starr", tr: "esnemez", en: "rigid" },
      { de: "rechnen", tr: "hesaplamak", en: "to calculate" },
      { de: "die Amortisation", tr: "amortisman", en: "amortization" },
      { de: "der Zinssatz", tr: "faiz oranı", en: "interest rate" },
      { de: "reagieren", tr: "tepki vermek", en: "to react" },
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
      { speaker: "Moderator", text: "Wir nehmen das nachher auf, ja? Sonst läuft uns die Zeit davon." },
      { speaker: "Rednerin", text: "Einen Satz noch: Der Einwand ist damit nicht entkräftet, nur eingegrenzt." },
      { speaker: "Moderator", text: "Sie bleiben bemerkenswert souverän." },
      { speaker: "Rednerin", text: "Ein Zwischenruf ist kein Angriff. Wer starr am Manuskript hängt, wirkt getroffen; wer aufgreift, hat den Raum." },
      { speaker: "Moderator", text: "Und wenn jemand nur provozieren will?" },
      { speaker: "Rednerin", text: "Dann merkt es der Saal vor mir. Ich muss es nicht sagen." },
      { speaker: "Moderator", text: "Dann machen wir hier weiter." },
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
    genre: "dialogue",
    intro: "Sunum provası. Hangi metafor taşıyor, hangisi ters tepiyor?",
    gloss: [
      { de: "die Metapher", tr: "metafor", en: "metaphor" },
      { de: "veranschaulichen", tr: "somutlaştırmak", en: "to illustrate" },
      { de: "das Bild", tr: "imge", en: "image" },
      { de: "der Mythos", tr: "efsane", en: "myth" },
      { de: "schweben", tr: "süzülmek / havada durmak", en: "to float" },
      { de: "prägnant", tr: "özlü", en: "concise" },
      { de: "der rote Faden", tr: "ana hat", en: "common thread" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "nirgends", tr: "hiçbir yerde", en: "nowhere" },
      { de: "der Pass", tr: "pasaport", en: "passport" },
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
          "schöne Folie, falscher Vortrag",
          "sie schwebt über allem und gehört nirgends dazu",
          "sie passt nicht in den roten Faden",
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
    title: "Sätze für eine Festrede",
    genre: "grammar",
    intro: "İlk konum vurguyu taşır; fiil her hâlükârda ikinci sırada kalır.",
    gloss: [
      { de: "hervorheben", tr: "öne çıkarmak", en: "to highlight" },
      { de: "die Wortstellung", tr: "kelime dizilimi", en: "word order" },
      { de: "einprägsam", tr: "akılda kalıcı", en: "memorable" },
      { de: "der Verstand", tr: "zihin", en: "mind" },
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
        hint: "Zaman öne, özne fiilden sonra: vurgu o ana düşüyor.",
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
    genre: "monologue",
    intro: "Bir konuşmanın ilk otuz saniyesi: devrik cümle, üçleme, taşıyan bir imge.",
    gloss: [
      { de: "die Hervorhebung", tr: "öne çıkarma", en: "emphasis" },
      { de: "veranschaulichen", tr: "somutlaştırmak", en: "to illustrate" },
      { de: "einprägsam", tr: "akılda kalıcı", en: "memorable" },
      { de: "der rote Faden", tr: "ana hat", en: "common thread" },
      { de: "einzige", tr: "tek", en: "only" },
      { de: "geschlossen sein", tr: "kapalı olmak", en: "to be closed" },
      { de: "knoten", tr: "düğümlemek", en: "to knot" },
      { de: "heraus", tr: "dışarı", en: "out" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Aşağıdaki durum için bir konuşma girişi yaz (6-9 cümle). Şunları kullan: en az bir devrik cümle (ilk konumda özne OLMAYACAK), bir üçleme ve bir metafor — ama metaforun getirdiği mantığı da düşün, düşman üretme. Sonda ana hattı bir cümleyle söyle.",
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
