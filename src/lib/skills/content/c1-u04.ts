import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 4 — "Kabullenme, tahmin, teselli, sabırsızlık".
 *
 * Dört ders: So ist es eben · Das wird wohl stimmen · Das wird schon! ·
 * Nun mach doch endlich!
 *
 *   Kelime: sich abfinden, die Gegebenheit, resigniert, unabänderlich, die
 *           Einsicht, hinnehmen, sich fügen, freilich · die Mutmaßung,
 *           annehmen, der Anhaltspunkt, zweifellos, kaum, die
 *           Wahrscheinlichkeit, die Skepsis, vermeintlich · die Zuversicht,
 *           trösten, die Gelassenheit, aufmuntern, zuversichtlich, die
 *           Nachsicht, wohlwollend, die Ungewissheit · die Ungeduld, drängen,
 *           die Zurechtweisung, unterlassen, endlich, voreilig, angespannt,
 *           beharrlich
 *
 * Dört ders dört DUYGU TONU öğretiyor ve hepsi tek heceyle taşınıyor: eben,
 * wohl, schon, endlich. Türkçede bu tonlar yüklem çekimine ya da ayrı
 * cümlelere dağılır ("olmuş bir kere", "herhâlde", "geçer canım"), Almancada
 * cümlenin ortasına tek sözcük olarak girer.
 *
 * Ölçülen şey parçacığın adı değil, tonun HANGİSİ olduğunu ayırt edebilmek:
 * "Das wird schon" teselli mi kayıtsızlık mı, "eben" kabulleniş mi bıkkınlık
 * mı — bunu bağlam belirler ve C1'de yanlış okumak ilişkiyi bozar.
 */
export const c1U04: SkillExercise[] = [
  {
    id: "c1-u04-r1",
    level: "C1",
    skill: "reading",
    unit: 4,
    title: "Zwischen Einsicht und Aufgeben",
    genre: "essay",
    intro: "Kabullenmenin iki yüzü üstüne bir yazı. Nerede olgunluk, nerede pes ediş?",
    gloss: [
      { de: "sich abfinden", tr: "razı olmak", en: "to come to terms with" },
      { de: "die Gegebenheit", tr: "verili durum", en: "circumstance" },
      { de: "resigniert", tr: "boyun eğmiş", en: "resigned" },
      { de: "unabänderlich", tr: "değiştirilemez", en: "unalterable" },
      { de: "die Einsicht", tr: "kavrayış / idrak", en: "insight" },
      { de: "hinnehmen", tr: "kabullenmek", en: "to accept" },
      { de: "sich fügen", tr: "boyun eğmek", en: "to submit" },
      { de: "freilich", tr: "gerçi", en: "admittedly" },
      { de: "klingen", tr: "kulağa gelmek", en: "to sound" },
      { de: "die Zahl", tr: "sayı", en: "number" },
      { de: "leicht", tr: "kolay", en: "easy" },
      { de: "außen", tr: "dıştan", en: "on the outside" },
      { de: "sehen", tr: "görmek", en: "to see" },
      { de: "meiste", tr: "çoğu", en: "most" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "aufhören", tr: "bırakmak", en: "to stop" },
      { de: "einheitlich", tr: "tek tip", en: "uniform" },
      { de: "der Text", tr: "metin", en: "text" },
    ],
    minutes: 7,
    text:
      "„DAS IST EBEN SO“ — ZWEI SÄTZE, DIE GLEICH KLINGEN\n\n" +
      "Wer sagt „Das ist eben so“, kann zweierlei meinen. Im einen Fall spricht Einsicht: Man hat geprüft, was änderbar ist, und den Rest hingenommen. Im anderen Fall spricht Erschöpfung: Man hat nicht mehr geprüft.\n\n" +
      "Die Sprache unterscheidet die beiden kaum. Beide sagen „eben“, beide klingen ruhig. Der Unterschied liegt darin, was vorher passiert ist.\n\n" +
      "Der Psychologe Frank Retzlaff nennt das erste „begründetes Hinnehmen“ und das zweite „vorzeitiges Sichfügen“. Wer sich vorzeitig fügt, spart sich die Anstrengung des Prüfens — und zahlt später dafür, weil er auch dort nachgibt, wo Spielraum bestanden hätte.\n\n" +
      "Freilich ist das leichter beschrieben als erkannt. Von außen sieht ein resignierter Mensch oft gelassen aus. Ein Anhaltspunkt: Wer aus Einsicht hinnimmt, kann meist genau sagen, WAS unabänderlich ist. Wer aufgegeben hat, sagt „alles“.\n\n" +
      "Andere Sätze trennen beides schärfer als „eben“. „Ich habe mich damit abgefunden“ setzt einen Abschluss und klingt ruhig; „ich kann nichts machen“ setzt keinen und klingt es auch nicht. Wer den zweiten Satz häufig sagt, hat meist nicht geprüft, sondern aufgehört — und hört es sich selbst nicht an.\n\n" +
      "Auffällig ist, wie unterschiedlich die beiden Zustände sich anfühlen und wie ähnlich sie klingen.\n\n" +
      "Sich abfinden ist deshalb kein einheitlicher Vorgang. Wer sich mit einer geprüften Lage abfindet, hat entschieden; wer sich mit einer ungeprüften abfindet, hat nur aufgehört zu fragen.\n\n" +
      "Die Gegebenheiten ändern sich damit nicht. Aber die Frage, ob man sie geprüft hat, ändert alles daran, wie man mit ihnen lebt.",
    questions: [
      {
        text: "Worin liegt laut Text der Unterschied zwischen den beiden Bedeutungen von „Das ist eben so“?",
        options: [
          "Im Tonfall",
          "Darin, was vorher passiert ist",
          "In der Wortwahl",
        ],
        answer: 1,
        explain: "„Der Unterschied liegt darin, was vorher passiert ist.“ Cümle aynı, tarih farklı.",
      },
      {
        kind: "gapfill",
        text: "Man hat geprüft, was änderbar ist, und den Rest ___.",
        options: [],
        answer: 0,
        accept: ["hingenommen"],
        explain: "hinnehmen: sınamadan sonra kabul. Ayrılabilen fiilin ortacı hin-ge-nommen.",
      },
      {
        text: "Was ist laut Text der praktische Anhaltspunkt?",
        options: [
          "Wie ruhig jemand wirkt",
          "Ob jemand genau sagen kann, was unabänderlich ist",
          "Wie lange jemand nachgedacht hat",
        ],
        answer: 1,
        explain: "„Wer aus Einsicht hinnimmt, kann meist genau sagen, WAS unabänderlich ist. Wer aufgegeben hat, sagt ‚alles‘.“",
      },
      {
        kind: "short_answer",
        text: "Was kostet laut Text das „vorzeitige Sichfügen“ später?",
        options: [],
        answer: 0,
        accept: [
          "Nachgeben trotz Spielraum",
          "man gibt auch dort nach, wo Spielraum bestanden hätte",
          "man gibt nach, wo es Spielraum gab",
        ],
        explain: "„weil er auch dort nachgibt, wo Spielraum bestanden hätte“.",
      },
      {
        kind: "short_answer",
        text: "Warum sagt der Text, von außen sehe ein resignierter Mensch oft gelassen aus?",
        options: [],
        answer: 0,
        accept: [
          "weil beide Haltungen ruhig wirken",
          "weil Resignation und Gelassenheit gleich aussehen",
          "beide klingen ruhig",
        ],
        explain: "Ayrım dışarıdan görünmüyor — bu yüzden parçacık tek başına yeterli bilgi vermiyor.",
      },
    ],
  },
  {
    id: "c1-u04-r2",
    level: "C1",
    skill: "reading",
    unit: 4,
    title: "Einbruch im Werkzeuglager",
    genre: "article",
    intro: "Yerel gazetede bir hırsızlık haberi. Hangi bilgi kesin, hangisi yalnız tahmin?",
    gloss: [
      { de: "die Mutmaßung", tr: "tahmin / varsayım", en: "conjecture" },
      { de: "annehmen", tr: "varsaymak", en: "to assume" },
      { de: "der Anhaltspunkt", tr: "ipucu / dayanak", en: "indication" },
      { de: "zweifellos", tr: "kuşkusuz", en: "undoubtedly" },
      { de: "die Wahrscheinlichkeit", tr: "olasılık", en: "probability" },
      { de: "die Skepsis", tr: "kuşku", en: "skepticism" },
      { de: "vermeintlich", tr: "sözde / güya", en: "supposed" },
      { de: "kaum", tr: "neredeyse hiç", en: "hardly" },
      { de: "vermutlich", tr: "muhtemelen", en: "presumably" },
      { de: "der Einbruch", tr: "hırsızlık", en: "burglary" },
      { de: "das Gewerbegebiet", tr: "sanayi bölgesi", en: "industrial park" },
      { de: "das Oberlicht", tr: "çatı penceresi", en: "skylight" },
      { de: "die Spur", tr: "iz", en: "trace" },
      { de: "der Lieferwagen", tr: "kamyonet", en: "van" },
      { de: "das Akkugerät", tr: "şarjlı alet", en: "cordless tool" },
      { de: "der Filialleiter", tr: "şube müdürü", en: "branch manager" },
      { de: "auslösen", tr: "tetiklemek", en: "to trigger" },
      { de: "der Gutachter", tr: "bilirkişi", en: "expert" },
      { de: "auffällig", tr: "göze batan", en: "conspicuous" },
      { de: "gezielt", tr: "hedefli olarak", en: "specifically" },
      { de: "die Halle", tr: "depo binası", en: "warehouse" },
      { de: "niedrig", tr: "düşük", en: "low" },
      { de: "offen", tr: "belirsiz", en: "unresolved" },
      { de: "rund", tr: "yaklaşık", en: "about, roughly" },
      { de: "die sozialen Netzwerke", tr: "sosyal ağlar", en: "social networks" },
    ],
    minutes: 7,
    text:
      "EINBRUCH IM WERKZEUGLAGER — ERMITTLER SUCHEN ZEUGEN\n\n" +
      "Aus dem Lager eines Baumarkts im Gewerbegebiet Süd sind in der Nacht zum Sonntag Werkzeuge im Wert von rund 40.000 Euro verschwunden. Bemerkt wurde der Einbruch erst am Montagmorgen, als die ersten Mitarbeiter die Halle öffneten.\n\n" +
      "Wie die Täter ins Gebäude gekommen sind, ist noch offen. Die Polizei nimmt an, dass sie wohl über das Dach eingestiegen sind: Ein Oberlicht stand offen, und auf dem Boden darunter fanden die Ermittler Schmutzspuren. Ein weiterer Anhaltspunkt ist ein Lieferwagen, den eine Anwohnerin gegen drei Uhr vor dem Tor gesehen haben will.\n\n" +
      "Vermutlich handelte es sich um mindestens drei Personen. Eine einzelne Person hätte die schweren Kisten kaum in so kurzer Zeit wegtragen können, sagt ein Sprecher der Polizei. Dass die Täter das Lager kannten, gilt als wahrscheinlich: Sie nahmen gezielt nur die teuren Akkugeräte mit, billigere Ware blieb liegen.\n\n" +
      "Mit Skepsis begegnen die Ermittler dagegen einem vermeintlichen Hinweis aus den sozialen Netzwerken. Dort hatte ein Nutzer ein Foto veröffentlicht, das die Täter angeblich beim Verladen zeigt. Das Bild stammt jedoch zweifellos aus einem anderen Jahr: Auf dem Parkplatz liegt Schnee.\n\n" +
      "Der Filialleiter, Herr Wendt, ist verärgert. Die Alarmanlage sei kaum zwei Jahre alt, habe in der Nacht aber keinen Alarm ausgelöst. Ob sie ausgeschaltet oder beschädigt wurde, soll ein Gutachter klären. Bis dahin bleibt es bei Mutmaßungen.\n\n" +
      "Die Polizei bittet Zeugen, die in der Nacht zum Sonntag im Gewerbegebiet etwas beobachtet haben, sich zu melden. Wer Werkzeug zu auffällig niedrigen Preisen angeboten bekommt, sollte ebenfalls Bescheid geben. Mit großer Wahrscheinlichkeit, so der Sprecher, tauchen die Geräte in den nächsten Wochen auf Online-Marktplätzen auf.",
    questions: [
      {
        text: "Wie sind die Täter nach Einschätzung der Polizei ins Lager gelangt?",
        options: [
          "Wohl über das Dach",
          "Durch das offene Tor",
          "Mit einem Schlüssel",
        ],
        answer: 0,
        explain: "Açık kalan çatı penceresi ve altındaki kir izleri bu tahmini destekliyor.",
      },
      {
        kind: "gapfill",
        text: "Mit Skepsis begegnen die Ermittler einem ___ Hinweis aus den sozialen Netzwerken.",
        options: [],
        answer: 0,
        accept: ["vermeintlichen"],
        explain: "Fotoğraf ipucu gibi görünüyor ama polis ona inanmıyor: „vermeintlich“ tam bunu söylüyor.",
      },
      {
        text: "Warum glaubt die Polizei, dass die Täter das Lager kannten?",
        options: [
          "Eine Mitarbeiterin hat es gestanden",
          "Sie hatten einen Schlüssel",
          "Sie nahmen gezielt nur die teuren Geräte mit",
        ],
        answer: 2,
        explain: "„Sie nahmen gezielt nur die teuren Akkugeräte mit, billigere Ware blieb liegen.“",
      },
      {
        kind: "short_answer",
        text: "Woran erkennt man, dass das Foto aus einem anderen Jahr stammt?",
        options: [],
        answer: 0,
        accept: [
          "am Schnee",
          "am Schnee auf dem Parkplatz",
          "auf dem Parkplatz liegt Schnee",
          "Schnee",
        ],
        explain: "„Auf dem Parkplatz liegt Schnee.“",
      },
      {
        text: "Die Polizei geht davon aus, dass mehrere Personen beteiligt waren.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Vermutlich handelte es sich um mindestens drei Personen.“",
      },
    ],
  },
  {
    id: "c1-u04-l1",
    level: "C1",
    skill: "listening",
    unit: 4,
    title: "Das wird schon",
    genre: "dialogue",
    intro: "Teselli mi, geçiştirme mi? Aynı cümle iki kez, iki farklı etkiyle.",
    gloss: [
      { de: "trösten", tr: "teselli etmek", en: "to console" },
      { de: "die Zuversicht", tr: "umut / güven", en: "confidence" },
      { de: "aufmuntern", tr: "neşelendirmek", en: "to cheer up" },
      { de: "die Gelassenheit", tr: "sükûnet", en: "composure" },
      { de: "die Nachsicht", tr: "hoşgörü", en: "forbearance" },
      { de: "die Ungewissheit", tr: "bilinmezlik", en: "uncertainty" },
      { de: "wohlwollend", tr: "iyi niyetli", en: "benevolent" },
      { de: "außer", tr: "hariç", en: "except" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "verordnen", tr: "reçete yazmak", en: "to prescribe" },
      { de: "bieten", tr: "sağlamak", en: "to provide" },
      { de: "anzubieten", tr: "sunmak", en: "to offer" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Luisa", text: "Ich habe die Zusage immer noch nicht. Seit elf Tagen." },
      { speaker: "Timo", text: "Ach, das wird schon." },
      { speaker: "Luisa", text: "Hm." },
      { speaker: "Timo", text: "Das war jetzt falsch, oder?" },
      { speaker: "Luisa", text: "Nicht falsch. Nur — du hast das Thema damit zugemacht." },
      { speaker: "Timo", text: "Ich wollte dich aufmuntern." },
      { speaker: "Luisa", text: "Ich weiß. Aber „das wird schon“ heißt auch: Reden wir über etwas anderes." },
      { speaker: "Timo", text: "Dann noch mal. Was ist das Schlimmste an den elf Tagen?" },
      { speaker: "Luisa", text: "Die Ungewissheit. Eine Absage könnte ich einordnen." },
      { speaker: "Timo", text: "Das verstehe ich. Und du kannst nichts tun außer warten." },
      { speaker: "Luisa", text: "Genau das." },
      { speaker: "Timo", text: "Dann sage ich es jetzt anders: Ich glaube, es wird gut ausgehen. Und wenn nicht, gehen wir das durch." },
      { speaker: "Luisa", text: "Siehst du, das tröstet. Das andere war wohlwollend, aber nur nett gemeint." },
      { speaker: "Timo", text: "Der Unterschied ist mir vorher nie aufgefallen." },
      { speaker: "Luisa", text: "Zuversicht kann man teilen. Gelassenheit muss jeder selbst finden — und wer sie mir verordnet, verlangt sie, statt sie anzubieten." },
      { speaker: "Timo", text: "Dann bitte ich um Nachsicht für die ersten drei Sätze." },
    ],
    questions: [
      {
        text: "Warum wirkt Timos erstes „Das wird schon“ nicht tröstend?",
        options: [
          "Weil es unfreundlich klingt",
          "Weil es das Thema schließt",
          "Weil es zu spät kam",
        ],
        answer: 1,
        explain: "„du hast das Thema damit zugemacht“ — parçacık teselli gibi görünüp konuşmayı bitiriyor.",
      },
      {
        kind: "gapfill",
        text: "Die ___. Eine Absage könnte ich einordnen.",
        options: [],
        answer: 0,
        accept: ["Ungewissheit"],
        explain: "Sorun ret değil, belirsizlik — bu ayrım tesellinin nereye yapılacağını belirliyor.",
      },
      {
        text: "Was macht Timos zweiten Versuch tröstend?",
        options: [
          "Er ist optimistischer",
          "Er benennt das Problem und bleibt für den schlechten Fall da",
          "Er ist kürzer",
        ],
        answer: 1,
        explain: "„Ich glaube, es wird gut ausgehen. Und wenn nicht, gehen wir das durch.“ İyi ihtimal ve kötü ihtimal birlikte.",
      },
      {
        kind: "dictation",
        text: "Luisa'nın iki teselliyi ayırdığı cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Das andere war wohlwollend, aber nur nett gemeint.",
          "Siehst du, das tröstet. Das andere war wohlwollend, aber nur nett gemeint.",
        ],
        explain: "„nett gemeint“ Almancada çoğu zaman gizli bir eleştiridir: niyet iyi, etki değil.",
      },
    ],
  },
  {
    id: "c1-u04-l2",
    level: "C1",
    skill: "listening",
    unit: 4,
    title: "Nun mach doch endlich",
    genre: "dialogue",
    intro: "Sabırsızlık dile nasıl sızıyor? Baskı hangi sözcükte başlıyor?",
    gloss: [
      { de: "die Ungeduld", tr: "sabırsızlık", en: "impatience" },
      { de: "drängen", tr: "sıkıştırmak", en: "to press" },
      { de: "die Zurechtweisung", tr: "azarlama", en: "reprimand" },
      { de: "unterlassen", tr: "yapmaktan kaçınmak", en: "to refrain from" },
      { de: "voreilig", tr: "aceleci", en: "hasty" },
      { de: "angespannt", tr: "gergin", en: "tense" },
      { de: "beharrlich", tr: "ısrarlı", en: "persistent" },
      { de: "die Auswertung", tr: "analiz", en: "analysis" },
      { de: "priorisieren", tr: "önceliklendirmek", en: "to prioritize" },
      { de: "tippen", tr: "klavyede yazmak", en: "to type" },
      { de: "also", tr: "yani", en: "so" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Adler", text: "Herr Voss, die Auswertung. Nun machen Sie doch endlich." },
      { speaker: "Herr Voss", text: "Ich sitze seit acht Uhr daran." },
      { speaker: "Frau Adler", text: "Das habe ich gestern auch gehört." },
      { speaker: "Herr Voss", text: "Darf ich kurz etwas sagen? Das war eben eine Zurechtweisung, keine Nachfrage." },
      { speaker: "Frau Adler", text: "Ich bin angespannt. Der Ausschuss tagt um vier." },
      { speaker: "Herr Voss", text: "Das wusste ich nicht. Sie haben mich gedrängt, ohne den Termin zu nennen." },
      { speaker: "Frau Adler", text: "Stimmt. Das war voreilig von mir — meine Ungeduld gehört nicht auf Ihren Schreibtisch." },
      { speaker: "Herr Voss", text: "Ich frage deshalb beharrlich nach, auch wenn es lästig wirkt." },
      { speaker: "Herr Voss", text: "Wenn Sie mir den Termin sagen, kann ich priorisieren. Wenn Sie „endlich“ sagen, kann ich nur schneller tippen." },
      { speaker: "Frau Adler", text: "Verstanden. Also: Ich brauche bis halb vier die zwei Kernzahlen, den Rest danach." },
      { speaker: "Herr Voss", text: "Das ist machbar." },
      { speaker: "Frau Adler", text: "Und ich unterlasse künftig das „endlich“." },
      { speaker: "Herr Voss", text: "Nicht nötig — nur nicht ohne den Grund dahinter." },
    ],
    questions: [
      {
        text: "Wie beschreibt Herr Voss den ersten Satz von Frau Adler?",
        options: [
          "Als Nachfrage",
          "Als Zurechtweisung",
          "Als Bitte",
        ],
        answer: 1,
        explain: "„Das war eben eine Zurechtweisung, keine Nachfrage.“ Parçacıklar cümleyi soru olmaktan çıkarmış.",
      },
      {
        kind: "gapfill",
        text: "Sie haben mich ___, ohne den Termin zu nennen.",
        options: [],
        answer: 0,
        accept: ["gedrängt"],
        explain: "drängen: gerekçesiz baskı. Gerekçe eklenince aynı istek priorisieren'e dönüşüyor.",
      },
      {
        text: "Was ist laut Herrn Voss der Unterschied zwischen einem Termin und dem Wort „endlich“?",
        options: [
          "Der Termin ist höflicher",
          "Mit dem Termin kann er priorisieren, mit „endlich“ nur schneller tippen",
          "„endlich“ ist unklar formuliert",
        ],
        answer: 1,
        explain: "Sabırsızlık bilgi taşımıyor; tarih ise taşıyor. Ünitenin asıl dersi bu.",
      },
      {
        kind: "short_answer",
        text: "Was antwortet Herr Voss auf Frau Adlers Vorsatz, das „endlich“ zu unterlassen?",
        options: [],
        answer: 0,
        accept: [
          "nur nicht ohne den Grund",
          "nicht nötig, nur nicht ohne den Grund dahinter",
          "es sei nicht nötig, aber mit Grund",
        ],
        explain: "Sorun parçacığın kendisi değil, gerekçesiz kullanılması.",
      },
    ],
  },
  {
    id: "c1-u04-w1",
    level: "C1",
    skill: "writing",
    unit: 4,
    title: "Ein langer Tag im Büro",
    genre: "grammar",
    intro: "eben, wohl, schon, endlich — dördü de cümlenin ortasında durur ve tonu taşır.",
    gloss: [
      { de: "hinnehmen", tr: "kabullenmek", en: "to accept" },
      { de: "die Mutmaßung", tr: "tahmin", en: "conjecture" },
      { de: "vermeintlich", tr: "sözde", en: "supposed" },
      { de: "drängen", tr: "sıkıştırmak", en: "to press" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bu böyle işte. Bunu kabullenmek zorundayız.",
        answer: "Das ist eben so. Das müssen wir hinnehmen",
        hint: "eben burada tartışmayı kapatıyor: değiştirilemez olana işaret.",
      },
      {
        kind: "build",
        tr: "Herhâlde çoktan gitmiştir.",
        answer: "Er ist wohl schon weg",
        hint: "wohl dayanağı olan bir tahmin; cümlenin ortasında, fiilden sonra.",
      },
      {
        kind: "build",
        tr: "Sözde çözüm sorunu daha da büyüttü.",
        answer: "Die vermeintliche Lösung hat das Problem noch vergrößert",
        hint: "vermeintlich iddiaya mesafe koyar; tahmin bildirmez.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: yazar tahmin etmek isterken kuşku bildirmiş.",
        source: "Der Kollege ist vermeintlich im Urlaub, deshalb rufe ich morgen an.",
        answer: "Der Kollege ist wohl im Urlaub, deshalb rufe ich morgen an.",
        alternatives: [
          "Der Kollege ist wohl im Urlaub, deshalb rufe ich morgen an",
          "Der Kollege ist vermutlich im Urlaub, deshalb rufe ich morgen an.",
        ],
        why: "vermeintlich „öyle deniyor ama değil“ demektir; cümlenin gerisi buna uymuyor. Dayanağı olan tahmin için wohl ya da vermutlich gerekir — bu karışıklık tutanakta pahalıya patlar.",
      },
    ],
  },
  {
    id: "c1-u04-w2",
    level: "C1",
    skill: "writing",
    unit: 4,
    title: "Trösten, ohne das Thema zu schließen",
    genre: "message",
    intro: "Kötü haber alan birine yaz: sorunu adlandır, kapatma, kötü ihtimalde de kal.",
    gloss: [
      { de: "die Ungewissheit", tr: "belirsizlik", en: "uncertainty" },
      { de: "trösten", tr: "teselli etmek", en: "to console" },
      { de: "die Nachsicht", tr: "hoşgörü", en: "forbearance" },
      { de: "die Zuversicht", tr: "umut", en: "confidence" },
      { de: "hinnehmen", tr: "kabullenmek", en: "to accept" },
      { de: "nirgends", tr: "hiçbir yerde", en: "nowhere" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "sich anmelden", tr: "kaydolmak", en: "to register" },
      { de: "die Länge", tr: "uzunluk", en: "length" },
      { de: "der Pass", tr: "pasaport", en: "passport" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Arkadaşının mesajına cevap yaz. Onu teselli et ama konuyu KAPATMA: sorunun tam olarak ne olduğunu adlandır, bir soru sor, iyi ihtimali söylerken kötü ihtimalde de yanında olacağını belirt. „Das wird schon“ türü kapatıcı kalıplardan kaçın.",
        stimulus:
          "Hey,\n\n" +
          "die Sache mit der Wohnung ist geplatzt. Der Eigentümer hat an jemand anderen vermietet, drei Tage vor dem Umzug.\n\n" +
          "Ich habe gekündigt, die Kartons stehen im Flur, und ab dem Ersten habe ich formal keine Adresse mehr. Meine Schwester sagt, das wird schon.\n\n" +
          "Ich weiß gerade nicht, wo ich anfangen soll.\n\nMarie",
        checklist: [
          "Sorunun tam olarak ne olduğunu adlandırdın mı (belirsizlik mi, adres mi, süre mi)?",
          "Bir soru sordun mu — konuyu açık tuttun mu?",
          "İyi ihtimalle birlikte kötü ihtimali de üstlendin mi?",
          "Kapatıcı kalıplardan kaçındın mı?",
        ],
        minWords: 80,
        phrases: [
          { de: "Was davon drückt gerade am meisten?", tr: "şu an en çok hangisi ağır geliyor", en: "which part weighs on you most right now" },
          { de: "Wenn es nicht klappt, gehen wir das zusammen durch.", tr: "olmazsa birlikte bakarız", en: "if it does not work out, we will go through it together" },
          { de: "Das musst du nicht allein hinnehmen.", tr: "bunu tek başına kabullenmek zorunda değilsin", en: "you do not have to accept this alone" },
        ],
        sample:
          "Marie,\n\n" +
          "drei Tage vorher — das ist nicht Pech, das ist eine Frechheit.\n\n" +
          "Ich glaube, das Schlimmste ist gerade nicht die Wohnung, sondern dass du ab dem Ersten formal nirgends gemeldet bist. Ist das der Punkt, oder drückt etwas anderes mehr? Sag es mir genau, dann sortieren wir es der Reihe nach.\n\n" +
          "Für die Meldeadresse habe ich eine Idee: Du kannst dich vorübergehend bei mir anmelden, das ist geregelt und dauert einen Vormittag. Damit fällt schon mal die Ungewissheit weg, die nichts mit der Wohnungssuche zu tun hat.\n\n" +
          "Ich bin ziemlich zuversichtlich, dass sich in vier Wochen etwas findet; die Lage ist im Frühjahr besser. Und wenn es länger dauert, ziehst du zu mir, bis es passt — das ist keine Floskel, das Zimmer steht leer.\n\n" +
          "Ruf mich heute Abend an, ja? Dann machen wir eine Liste statt eines Gefühls.\n\nSascha",
      },
    ],
  },
];
