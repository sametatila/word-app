import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 25 — "Aktarmak, iki dilli olmak, değişen dil, varış".
 *
 * Dört ders: Jetzt hilfst du · In zwei Sprachen zu Hause ·
 * Sprache lebt · Angekommen — und weiter.
 *
 *   Kelime: weitergeben, der Rat, die Geduld, ermutigen, der Rückschlag,
 *           der Aufstieg, die Gabe, rekrutieren · zweisprachig, die Stimme,
 *           der Reichtum, der Riss, wechseln, die Identität, das Bewusstsein,
 *           die Loyalität · der Sprachwandel, der Anglizismus, die
 *           Jugendsprache, der Verfall, die Norm, die Evolution, verfallen,
 *           der Historiker · der Gipfel, das Zuhause, weitergehen, die Mühe,
 *           angekommen, die Vernunft, langfristig, unantastbar
 *
 * Ünitenin ve seviyenin çekirdeği: DİL ARTIK KONU DEĞİL, ZEMİN. C1'in
 * gerçek işareti kusursuzluk değil — her konuşmanın konusunun artık
 * Almanca olmaması. Bu yüzden son ünite dört yönü birden kapatıyor:
 * öğrendiğini aktarmak, iki dilliliği kayıp olarak görmemek, dilin
 * değiştiğini bilmek (norm kullanımı izliyor, yani müze Almancası
 * konuşman gerekmiyor) ve varışın son durak olmadığını kabul etmek.
 *
 * İki dillilik dersinde şekerli bir kapanıştan bilinçle kaçınıldı:
 * çatlak bazen gerçekten var. İddia çatlağın yokluğu değil, ne
 * yapıldığı. Aynı biçimde final metni de "bitti" demiyor — C1 bir
 * eşik, sertifika değil.
 */
export const c1U25: SkillExercise[] = [
  {
    id: "c1-u25-r1",
    level: "C1",
    skill: "reading",
    unit: 25,
    title: "Wandel ist kein Verfall",
    genre: "Deneme",
    intro: "Dil bozuluyor mu? Tarih başka bir şey söylüyor.",
    gloss: [
      { de: "der Sprachwandel", tr: "dil değişimi", en: "language change" },
      { de: "der Verfall", tr: "çöküş, bozulma", en: "decay" },
      { de: "die Norm", tr: "norm, ölçün", en: "norm" },
      { de: "der Anglizismus", tr: "İngilizce kökenli sözcük", en: "anglicism" },
      { de: "die Jugendsprache", tr: "gençlik dili", en: "youth language" },
      { de: "der Historiker", tr: "tarihçi", en: "historian" },
      { de: "die Evolution", tr: "evrim", en: "evolution" },
    ],
    minutes: 8,
    text:
      "SEIT ZWEIHUNDERT JAHREN GEHT ES BERGAB\n\n" +
      "Das ist keine Übertreibung, sondern ein Befund: Seit mindestens zwei Jahrhunderten schreibt jede Generation, die Sprache verfalle. Die Klagen sind erhalten, und sie lesen sich alle gleich. Nur die beklagten Wörter wechseln.\n\n" +
      "Im 19. Jahrhundert war es das Französische — „Trottoir“, „Bureau“, „Chaussee“ galten als Zeichen des Niedergangs. Heute stört sich niemand mehr an ihnen; einige sind verschwunden, andere sind so deutsch geworden, dass ihre Herkunft nicht mehr auffällt. Dieselbe Bewegung läuft gerade mit Anglizismen, und sie wird ähnlich ausgehen: Ein Teil bleibt, ein Teil verschwindet, und was bleibt, wird angepasst — man sagt „gedownloadet“ und beugt es, als hätte es das Wort immer gegeben.\n\n" +
      "Sprachhistoriker beschreiben den Sprachwandel ohne Dramatik. Die Norm folgt dem Gebrauch, nicht umgekehrt. Was heute korrekt ist, war einmal ein Fehler: „wegen“ mit Dativ galt lange als grober Verstoß und steht inzwischen in jedem Wörterbuch als umgangssprachlich zulässig.\n\n" +
      "Der Vergleich mit der Evolution trägt dabei nur ein Stück weit. Sprachen werden nicht besser, sie passen sich an — was gebraucht wird, bleibt, was niemand mehr benutzt, verschwindet. Ein Fortschritt ist damit nicht behauptet.\n\n" +
      "Das heißt nicht, dass alles gleich gut ist. Innerhalb eines Sprachstands gibt es sehr wohl Unterschiede in Klarheit und Angemessenheit, und ein Text kann schlecht sein. Nur ist das ein Urteil über den Text, nicht über die Epoche.\n\n" +
      "Für Lernende hat dieser Befund einen praktischen Wert, der selten ausgesprochen wird. Man muss kein Museumsdeutsch sprechen. Wer die Formen der Gegenwart verwendet — auch die, über die sich jemand ärgert —, spricht nicht schlechter, sondern in seiner Zeit. Und wer die Jugendsprache seiner Kinder nicht mehr versteht, erlebt keinen Verfall, sondern das Normalste, was einer Sprache passieren kann.",
    questions: [
      {
        text: "Was ist der Befund über die Klagen?",
        options: [
          "Sie sind neu",
          "Jede Generation seit zwei Jahrhunderten erhebt sie, nur die Wörter wechseln",
          "Sie kommen nur von Historikern",
        ],
        answer: 1,
        explain: "Şikâyetler korunmuş ve hepsi aynı okunuyor.",
      },
      {
        kind: "gapfill",
        text: "Die Norm folgt dem ___, nicht umgekehrt.",
        options: [],
        answer: 0,
        accept: ["Gebrauch"],
        explain: "Bugün doğru olan bir zamanlar hataydı.",
      },
      {
        text: "Was sagt der Text über Anglizismen?",
        options: [
          "Sie werden alle bleiben",
          "Ein Teil bleibt, ein Teil verschwindet, und was bleibt, wird angepasst",
          "Sie sind ein Zeichen des Verfalls",
        ],
        answer: 1,
        explain: "19. yüzyıldaki Fransızca sözcüklerle aynı hareket.",
      },
      {
        kind: "short_answer",
        text: "Welchen praktischen Wert hat der Befund für Lernende?",
        options: [],
        answer: 0,
        accept: [
          "man muss kein Museumsdeutsch sprechen",
          "man darf die Formen der Gegenwart verwenden",
          "kein Museumsdeutsch",
        ],
        explain: "Bugünün biçimlerini kullanan kötü değil, kendi zamanında konuşuyor.",
      },
      {
        kind: "short_answer",
        text: "Was räumt der Text trotzdem ein?",
        options: [],
        answer: 0,
        accept: [
          "ein Text kann schlecht sein",
          "ein einzelner Text kann schlecht sein; das ist ein Urteil über den Text, nicht über die Epoche",
          "es gibt Unterschiede in Klarheit und Angemessenheit",
        ],
        explain: "Değişimi savunmak her metni savunmak değil.",
      },
    ],
  },
  {
    id: "c1-u25-r2",
    level: "C1",
    skill: "reading",
    unit: 25,
    title: "Angekommen — und weiter",
    genre: "Deneme",
    intro: "C1 ne demek, ne demek değil?",
    gloss: [
      { de: "der Gipfel", tr: "zirve", en: "summit" },
      { de: "das Zuhause", tr: "yuva", en: "home" },
      { de: "die Mühe", tr: "emek, zahmet", en: "effort" },
      { de: "angekommen", tr: "varmış", en: "arrived" },
      { de: "langfristig", tr: "uzun vadede", en: "in the long run" },
      { de: "die Vernunft", tr: "akıl, sağduyu", en: "reason" },
      { de: "unantastbar", tr: "dokunulmaz", en: "inviolable" },
    ],
    minutes: 7,
    text:
      "WORAN MAN ES MERKT\n\n" +
      "Es gibt keinen Tag, an dem man eine Sprache kann. Es gibt einen Tag, an dem man merkt, dass sie nicht mehr das Thema ist.\n\n" +
      "Das ist das brauchbarste Zeichen für C1. Nicht Fehlerfreiheit — die kommt nie ganz, auch bei Muttersprachlern nicht. Sondern: Man führt ein Gespräch über eine Vertragsklausel, und hinterher erinnert man sich an die Klausel, nicht an die Sprache.\n\n" +
      "Was auf diesem Niveau tatsächlich noch fehlt, ist gut zu benennen. Wortspiele kommen zuletzt. Ironie erkennt man meist, aber nicht immer. Bei Müdigkeit oder Stress fällt man auf einfachere Strukturen zurück — das ist normal und passiert Muttersprachlern in ihrer zweiten Sprache genauso. Und es gibt Bereiche, in denen man weiterhin nichts versteht: ein Handwerkerdialekt, ein Fachgespräch unter Ärzten, drei Jugendliche in der U-Bahn. Das ist kein Rückschritt, sondern eine zutreffende Beschreibung jeder Sprachkenntnis, auch der eigenen ersten.\n\n" +
      "Wer bis hierher gekommen ist, ist angekommen — nur nicht am Ende. Der Gipfel ist erreicht, aber der Weg geht weiter, und das ist keine Floskel, sondern eine Beschreibung des Aufwands. Was jetzt hilft, ist weniger Ehrgeiz als Vernunft: lesen, was einen interessiert; schreiben, was ohnehin geschrieben werden muss; korrigiert werden, ohne es als Urteil zu nehmen. Langfristig hält das mehr als jedes Programm.\n\n" +
      "Bleibt das, was sich schwer messen lässt. Eine Sprache, in der man gestritten, gearbeitet, sich entschuldigt und jemanden getröstet hat, ist kein Werkzeug mehr. Sie ist ein Zuhause — ein Ort, an dem man auch dann noch steht, wenn niemand nach dem Zertifikat fragt.\n\n" +
      "Und eines bleibt unantastbar, gleich wie eine Prüfung ausgeht: Die Mühe, die dorthin geführt hat, gehört einem.",
    questions: [
      {
        text: "Was ist laut Text das brauchbarste Zeichen für C1?",
        options: [
          "Fehlerfreiheit",
          "Dass die Sprache nicht mehr das Thema ist",
          "Ein bestandenes Zertifikat",
        ],
        answer: 1,
        explain: "Sonradan maddeyi hatırlıyorsun, dili değil.",
      },
      {
        kind: "gapfill",
        text: "Der ___ ist erreicht, aber der Weg geht weiter.",
        options: [],
        answer: 0,
        accept: ["Gipfel"],
        explain: "Süsleme değil, kalan emeğin tarifi.",
      },
      {
        text: "Wie bewertet der Text Bereiche, die man weiterhin nicht versteht?",
        options: [
          "Als Rückschritt",
          "Als zutreffende Beschreibung jeder Sprachkenntnis, auch der ersten",
          "Als Zeichen für fehlendes C1",
        ],
        answer: 1,
        explain: "Kendi ana dilinde de anlaşılmayan alanlar var.",
      },
      {
        kind: "short_answer",
        text: "Was kommt laut Text nach C1?",
        options: [],
        answer: 0,
        accept: [
          "lesen, schreiben, sich korrigieren lassen",
          "lesen, was einen interessiert; schreiben, was ohnehin nötig ist; korrigiert werden",
          "weniger anstrengend und weniger sichtbar weitermachen",
        ],
        explain: "Program değil, süreklilik.",
      },
      {
        kind: "short_answer",
        text: "Warum ist die Sprache am Ende kein Werkzeug mehr?",
        options: [],
        answer: 0,
        accept: [
          "sie ist ein Ort geworden",
          "weil man darin gestritten, gearbeitet, sich entschuldigt und jemanden getröstet hat",
          "weil man darin gelebt hat",
        ],
        explain: "Araç değil, durulan bir yer.",
      },
    ],
  },
  {
    id: "c1-u25-l1",
    level: "C1",
    skill: "listening",
    unit: 25,
    title: "Jetzt hilfst du",
    genre: "Mentorluk sohbeti",
    intro: "Öğrendiğini aktarmak: hangi öğüt işe yarar?",
    gloss: [
      { de: "weitergeben", tr: "aktarmak", en: "to pass on" },
      { de: "der Rückschlag", tr: "geri tepme, aksilik", en: "setback" },
      { de: "ermutigen", tr: "cesaretlendirmek", en: "to encourage" },
      { de: "die Geduld", tr: "sabır", en: "patience" },
      { de: "der Aufstieg", tr: "yükseliş", en: "ascent" },
      { de: "die Gabe", tr: "yetenek, armağan", en: "gift" },
      { de: "der Rat", tr: "öğüt", en: "advice" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Milad", text: "Ich bin seit acht Monaten hier und komme nicht weiter. Bei dir hat es doch auch geklappt." },
      { speaker: "Selin", text: "Nach vier Jahren. Und die ersten zwei waren die schlechtesten." },
      { speaker: "Milad", text: "Das hilft mir gerade wenig. Alle ermutigen mich, und es ändert nichts." },
      { speaker: "Selin", text: "Doch, ein bisschen. Du vergleichst dich mit meinem heutigen Stand, nicht mit meinem damaligen." },
      { speaker: "Milad", text: "Was hat dir am meisten geholfen? Gib mir einen Rat, keinen Trost." },
      { speaker: "Selin", text: "Etwas Unspektakuläres, und es braucht Geduld — der Satz, den ich damals selbst gehasst habe. Ich habe aufgehört, jedes unbekannte Wort nachzuschlagen, und angefangen, eine Serie zweimal zu sehen — einmal mit Untertiteln, einmal ohne." },
      { speaker: "Milad", text: "Das ist alles?" },
      { speaker: "Selin", text: "Und ich habe angefangen zu telefonieren. An deiner Stelle würde ich genau damit anfangen — Telefon ist unangenehm, deshalb bringt es am meisten." },
      { speaker: "Milad", text: "Ich habe Angst, dass die Leute genervt sind." },
      { speaker: "Selin", text: "Manche sind es. Die meisten nicht. Und die Genervten wären es auch bei einem Muttersprachler." },
      { speaker: "Milad", text: "Manchmal denke ich, ich habe einfach keine Gabe für Sprachen." },
      { speaker: "Selin", text: "Das habe ich auch gedacht. Was mir geholfen hat, war ein Satz von meiner Chefin: „Sie sprechen jeden Tag besser Deutsch als ich Türkisch.“ Sie hatte recht, und ich hatte es nie so gerechnet." },
      { speaker: "Milad", text: "Und wenn ich einen Rückschlag habe?" },
      { speaker: "Selin", text: "Dann fällst du zurück. Es gibt keinen stetigen Aufstieg, es geht in Sprüngen und mit Pausen dazwischen." },
      { speaker: "Milad", text: "Warum erzählst du mir das alles?" },
      { speaker: "Selin", text: "Weil es mir jemand erzählt hat und ich es weitergebe. Meld dich, wenn es so weit ist — ich habe dieselben Wochen gehabt." },
    ],
    questions: [
      {
        text: "Welchen Vergleichsfehler benennt Selin?",
        options: [
          "Milad vergleicht sich mit Muttersprachlern",
          "Milad vergleicht sich mit ihrem heutigen Stand statt mit ihrem damaligen",
          "Milad vergleicht zu wenig",
        ],
        answer: 1,
        explain: "Sekiz ay ile dört yıl karşılaştırılıyor.",
      },
      {
        kind: "gapfill",
        text: "An deiner ___ würde ich mit dem Telefonieren anfangen.",
        options: [],
        answer: 0,
        accept: ["Stelle"],
        explain: "An deiner Stelle + Konjunktiv II: öğüt vermenin standart biçimi.",
      },
      {
        text: "Warum empfiehlt Selin gerade das Telefonieren?",
        options: [
          "Weil es leicht ist",
          "Weil es unangenehm ist und deshalb am meisten bringt",
          "Weil es billig ist",
        ],
        answer: 1,
        explain: "Görüntü olmadan konuşmak en zorlayıcı biçim.",
      },
      {
        kind: "dictation",
        text: "Selin'in patronundan aktardığı, kendisine en çok yardımı dokunan cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Sie sprechen jeden Tag besser Deutsch als ich Türkisch.",
          "Sie sprechen jeden Tag besser Deutsch als ich Türkisch",
        ],
        explain: "Hesap hiç o yönden yapılmamıştı.",
      },
    ],
  },
  {
    id: "c1-u25-l2",
    level: "C1",
    skill: "listening",
    unit: 25,
    title: "In zwei Sprachen zu Hause",
    genre: "Söyleşi",
    intro: "İki dillilik: zenginlik mi, çatlak mı — yoksa ikisi de mi?",
    gloss: [
      { de: "zweisprachig", tr: "iki dilli", en: "bilingual" },
      { de: "die Stimme", tr: "ses", en: "voice" },
      { de: "der Reichtum", tr: "zenginlik", en: "richness" },
      { de: "der Riss", tr: "çatlak", en: "rift" },
      { de: "die Identität", tr: "kimlik", en: "identity" },
      { de: "die Loyalität", tr: "sadakat", en: "loyalty" },
      { de: "das Bewusstsein", tr: "bilinç", en: "awareness" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Moderatorin", text: "Frau Aydin, Sie sind zweisprachig aufgewachsen und schreiben, Sie hätten zwei Stimmen." },
      { speaker: "Frau Aydin", text: "Es ist, als hätte ich zwei Stimmen. Auf Türkisch bin ich wärmer und ungenauer, auf Deutsch genauer und kälter." },
      { speaker: "Moderatorin", text: "Klingt nach einem Verlust." },
      { speaker: "Frau Aydin", text: "Manchmal ist es einer. Ich kann meiner Mutter auf Deutsch nichts erklären und meiner Steuerberaterin auf Türkisch nichts." },
      { speaker: "Moderatorin", text: "Viele sagen an dieser Stelle, es sei ein Reichtum." },
      { speaker: "Frau Aydin", text: "Das ist es auch. Nur wird der Satz oft benutzt, um den Riss wegzureden. Beides stimmt: Es ist ein Reichtum, und es gibt Momente, in denen etwas fehlt." },
      { speaker: "Moderatorin", text: "Wann fehlt etwas?" },
      { speaker: "Frau Aydin", text: "Bei Trauer. Da will man die erste Sprache, und wenn niemand da ist, der sie spricht, hilft die zweite nicht." },
      { speaker: "Moderatorin", text: "Und im Alltag?" },
      { speaker: "Frau Aydin", text: "Im Alltag überwiegt der Gewinn deutlich. Es bleibt ein Bewusstsein dafür, dass jeder deutsche Satz auch anders sein könnte. Einsprachige halten ihre Sprache für die Welt; ich kann das nicht mehr." },
      { speaker: "Moderatorin", text: "Wird von Ihnen erwartet, dass Sie Ihre Identität erklären?" },
      { speaker: "Frau Aydin", text: "Ständig, und immer als Frage nach einer Entscheidung. Dabei erklärt niemand sonst seine, er hat sie einfach." },
      { speaker: "Moderatorin", text: "Fühlen Sie sich manchmal zur Loyalität gezwungen?" },
      { speaker: "Frau Aydin", text: "Von beiden Seiten, ja. Aber das ist deren Frage, nicht meine. Ich beantworte sie seit ein paar Jahren nicht mehr." },
      { speaker: "Moderatorin", text: "Was sagen Sie jemandem, der gerade anfängt?" },
      { speaker: "Frau Aydin", text: "Dass die zweite Sprache die erste nicht wegnimmt. Sie stellt sich daneben. Es wird enger, und dann wird es weiter." },
    ],
    questions: [
      {
        text: "Wie beschreibt Frau Aydin den Unterschied zwischen ihren Sprachen?",
        options: [
          "Türkisch genauer, Deutsch wärmer",
          "Türkisch wärmer und ungenauer, Deutsch genauer und kälter",
          "Es gibt keinen Unterschied",
        ],
        answer: 1,
        explain: "İki ses, iki kayıt.",
      },
      {
        kind: "gapfill",
        text: "Das ist ein Reichtum, kein ___ — aber der Satz wird oft benutzt, um etwas wegzureden.",
        options: [],
        answer: 0,
        accept: ["Riss"],
        explain: "Kalıbın kendisi doğru, kullanımı bazen kaçış.",
      },
      {
        text: "Wann fehlt laut Frau Aydin etwas?",
        options: [
          "Im Beruf",
          "Bei Trauer",
          "Beim Lesen",
        ],
        answer: 1,
        explain: "Orada ilk dil isteniyor ve ikincisi yardım etmiyor.",
      },
      {
        kind: "short_answer",
        text: "Was sagt sie jemandem, der gerade anfängt?",
        options: [],
        answer: 0,
        accept: [
          "sie stellt sich daneben", "die zweite Sprache nimmt die erste nicht weg, sie stellt sich daneben",
          "sie stellt sich daneben; es wird enger und dann weiter",
          "die zweite nimmt die erste nicht weg",
        ],
        explain: "Önce daralıyor, sonra genişliyor.",
      },
    ],
  },
  {
    id: "c1-u25-w1",
    level: "C1",
    skill: "writing",
    unit: 25,
    title: "Öğüt vermenin dili",
    genre: "Dil bilgisi",
    intro: "Öğüt verme kalıpları ve gerçek dışı kıyas.",
    gloss: [
      { de: "weitergeben", tr: "aktarmak", en: "to pass on" },
      { de: "ermutigen", tr: "cesaretlendirmek", en: "to encourage" },
      { de: "der Rückschlag", tr: "aksilik", en: "setback" },
      { de: "der Reichtum", tr: "zenginlik", en: "richness" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Senin yerinde olsam telefonla başlardım.",
        answer: "An deiner Stelle würde ich mit dem Telefonieren anfangen",
        hint: "An deiner Stelle + würde: öğüdü kişisel suçlamadan uzak tutar.",
      },
      {
        kind: "build",
        tr: "Bana yardımı dokunan şey patronumun bir cümlesiydi.",
        answer: "Was mir geholfen hat, war ein Satz meiner Chefin",
        hint: "Was-cümlesi özne olur; ana cümle war ile devam eder.",
      },
      {
        kind: "build",
        tr: "Sanki iki sesim varmış gibi.",
        answer: "Es ist, als hätte ich zwei Stimmen",
        hint: "als + Konjunktiv II, fiil hemen als'ın ardında.",
      },
      {
        kind: "rewrite",
        prompt: "Öğüdü düzelt: iyi niyetli ama karşı tarafı küçültüyor.",
        source: "Du musst einfach mehr üben, dann klappt das schon. Bei mir hat es auch funktioniert, das ist keine große Sache.",
        answer: "An deiner Stelle würde ich mit dem Telefonieren anfangen. Was mir geholfen hat, war genau das — und es hat bei mir vier Jahre gedauert.",
        alternatives: [
          "An deiner Stelle würde ich mit dem Telefonieren anfangen. Was mir geholfen hat, war genau das.",
          "An deiner Stelle würde ich mit dem Telefonieren anfangen; bei mir hat das am meisten gebracht, und es hat vier Jahre gedauert.",
        ],
        why: "„Du musst einfach“ zorluğu küçültüyor, „das ist keine große Sache“ ise karşı tarafın yaşadığını geçersiz kılıyor. İşe yarayan öğüt somut bir adım veriyor ve kendi süresini dürüstçe söylüyor — karşılaştırma ancak o zaman cesaret veriyor, aksi hâlde mesafe açıyor.",
      },
    ],
  },
  {
    id: "c1-u25-w2",
    level: "C1",
    skill: "writing",
    unit: 25,
    title: "Sonraki kişiye mektup",
    genre: "Kişisel metin",
    intro: "Bugün başlayan birine yaz — abartmadan, küçültmeden.",
    gloss: [
      { de: "weitergeben", tr: "aktarmak", en: "to pass on" },
      { de: "der Rückschlag", tr: "aksilik", en: "setback" },
      { de: "die Mühe", tr: "emek", en: "effort" },
      { de: "der Reichtum", tr: "zenginlik", en: "richness" },
      { de: "angekommen", tr: "varmış", en: "arrived" },
    ],
    minutes: 15,
    tasks: [
      {
        kind: "free",
        prompt:
          "Bugün Almancaya başlayan birine mektup yaz. Kurallar: (1) en az iki SOMUT tavsiye ver — genel cesaretlendirme değil, yapılabilir adım; (2) zorluğu küçültme, kendi süreni dürüstçe söyle; (3) bir aksiliği anlat ve nasıl geçtiğini değil, o sırada ne düşündüğünü yaz; (4) iki dilliliğe dair bir cümle kur, ama „bu bir zenginlik“ klişesini olduğu gibi kullanma — kendi sözcüklerinle söyle; (5) son cümle yankılansın, yeni argüman taşımasın. Ders sonu bildirisi gibi değil, mektup gibi yaz.",
        stimulus:
          "İSTERSEN KULLAN\n\n" +
          "· C1'in gerçek işareti: dilin artık konuşmanın konusu olmaması.\n" +
          "· Kelime oyunları en sona kalıyor; ironi çoğu zaman anlaşılıyor ama her zaman değil.\n" +
          "· Yorgunken ve stresliyken daha basit yapılara düşmek normal.\n" +
          "· Anlaşılmayan alanlar (usta lehçesi, doktorların kendi arasındaki konuşması) her dil bilgisinde var — ana dilde de.\n" +
          "· „Rückschläge gehören dazu und sagen nichts über das Ende.“\n" +
          "· „Die zweite Sprache nimmt die erste nicht weg. Sie stellt sich daneben.“",
        checklist: [
          "En az iki somut, yapılabilir tavsiye var mı?",
          "Kendi süre ve zorluğu dürüstçe verildi mi?",
          "Aksiliğin içindeki düşünce yazıldı mı (sonucu değil)?",
          "Son cümle kısa ve yankılı mı, yeni argüman taşımıyor mu?",
        ],
        minWords: 180,
        phrases: [
          { de: "An deiner Stelle würde ich …", tr: "senin yerinde olsam …", en: "in your place I would …" },
          { de: "Was mir geholfen hat, war …", tr: "bana yardımı dokunan şey … oldu", en: "what helped me was …" },
          { de: "Rückschläge sagen nichts über das Ende.", tr: "aksilikler sonu hakkında bir şey söylemez", en: "setbacks say nothing about the outcome" },
        ],
        sample:
          "Hallo,\n\n" +
          "du fängst heute an, und irgendwer wird dir in den nächsten Wochen sagen, dass Deutsch schwer ist. Das stimmt. Ich schreibe dir trotzdem, weil mir damals niemand die zwei oder drei Dinge gesagt hat, die tatsächlich etwas geändert haben.\n\n" +
          "Das Erste: Hör auf, jedes unbekannte Wort nachzuschlagen. Nimm eine Serie, die du magst, und sieh jede Folge zweimal — einmal mit Untertiteln, einmal ohne. Es fühlt sich wie Faulheit an und ist es nicht.\n\n" +
          "Das Zweite, und das ist das unangenehme: Telefoniere. Ohne Gesicht, ohne Hände, ohne die Möglichkeit, auf etwas zu zeigen. Genau deshalb bringt es mehr als alles andere. An deiner Stelle würde ich mit etwas Belanglosem anfangen — einen Termin verschieben, nach Öffnungszeiten fragen.\n\n" +
          "Und damit du weißt, worauf du dich einlässt: Bei mir hat es vier Jahre gedauert, und die ersten zwei waren die schlechtesten. Im dritten Winter habe ich in einer Sitzung einen Satz angefangen und mittendrin nicht mehr gewusst, wie er zu Ende geht. Ich habe damals nicht gedacht „das wird schon“. Ich habe gedacht, ich sei bis hierher gekommen und weiter gehe es nicht. Sechs Wochen später ist mir aufgefallen, dass ich die ganze Sitzung mitgeschrieben hatte, ohne es zu merken. Rückschläge sagen nichts über das Ende, auch wenn sie sich in dem Moment wie das Ende anfühlen.\n\n" +
          "Noch etwas, das dir vielleicht Angst macht: Du wirst nichts verlieren. Deine erste Sprache geht nicht weg, wenn die zweite kommt — sie rückt zur Seite und macht Platz. Eine Zeit lang wird es eng sein. Danach hast du zwei Räume statt einem.\n\n" +
          "Du wirst nicht merken, an welchem Tag du es kannst. Du wirst merken, dass niemand mehr darüber redet.",
      },
    ],
  },
];
