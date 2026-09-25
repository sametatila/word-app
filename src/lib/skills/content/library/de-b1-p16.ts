import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 16.
 *
 * B1 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 16 müşteri ve hizmet hattı: bir kasiyerin köşe yazısı, müşteri
 * hizmetlerinde yeni çalışanlara verilen eğitim, iyi hizmet için firmaya
 * övgü mektubu. Dil bilgisi n-çekimi — der Kunde, den Kunden, dem Kollegen.
 */
export const deB1P16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r16",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Was man an der Kasse nicht sieht",
    genre: "opinion",
    intro: "Bir kasiyerin köşe yazısı: müşteriler neyi görmüyor, onu ne üzüyor, okurlardan ne istiyor.",
    gloss: [
      { de: "die Kasse", tr: "kasa", en: "checkout" },
      { de: "die Ware", tr: "mal", en: "goods" },
      { de: "die Schlange", tr: "kuyruk", en: "queue" },
      { de: "schimpfen", tr: "söylenmek", en: "to grumble" },
      { de: "entlasten", tr: "yükünü hafifletmek", en: "to relieve" },
      { de: "gleichzeitig", tr: "aynı anda", en: "at the same time" },
    ],
    minutes: 6,
    text:
      "Was man an der Kasse nicht sieht\n\n" +
      "Seit neun Jahren sitze ich an der Kasse eines großen Supermarkts. Viele halten das für eine " +
      "einfache Arbeit: Ware über den Scanner ziehen, Geld nehmen, fertig. Heute möchte ich erzählen, " +
      "was man von der anderen Seite des Bandes sieht.\n\n" +
      "Ein älterer Kunde kommt fast jeden Tag um halb acht und kauft nur ein Brötchen und eine Zeitung. " +
      "Seit dem Tod seiner Frau lebt er allein, und ich weiß, dass ich oft der einzige Mensch bin, mit dem " +
      "er an diesem Tag spricht. Deshalb nehme ich mir für diesen Kunden eine Minute Zeit, auch wenn die " +
      "Schlange lang ist.\n\n" +
      "Andere Kunden haben es eilig und schimpfen, wenn es langsam geht. Das verstehe ich. Was ich nicht " +
      "verstehe: Manche telefonieren weiter, während ich ihnen den Preis sage, und schauen mich nicht " +
      "einmal an.\n\n" +
      "Seit letztem Jahr gibt es bei uns vier Selbstbedienungskassen. Mein Chef sagt, sie sollen uns " +
      "entlasten. In Wahrheit betreue ich jetzt zwei Stellen gleichzeitig und löse ständig Probleme an " +
      "den Geräten.\n\n" +
      "Mein Wunsch an Sie ist klein: Legen Sie das Handy kurz weg und sagen Sie Guten Tag. Das kostet " +
      "keine Sekunde mehr.",
    questions: [
      {
        text: "Warum schreibt die Kassiererin diesen Text?",
        options: [
          "Sie will zeigen, was man an der Kasse erlebt.",
          "Sie sucht eine neue Stelle.",
          "Sie beschwert sich über ihren Lohn.",
        ],
        answer: 0,
        explain: "„Heute möchte ich erzählen, was man von der anderen Seite des Bandes sieht.“",
      },
      {
        text: "Warum nimmt sie sich für den älteren Kunden Zeit?",
        options: [
          "weil er jeden Morgen besonders viel einkauft",
          "weil sie oft die Einzige ist, mit der er spricht",
          "weil er ein alter Bekannter aus ihrer Straße ist",
        ],
        answer: 1,
        explain: "Eşi öldüğünden beri yalnız yaşıyor ve o gün konuştuğu tek kişi çoğu zaman kasiyer.",
      },
      {
        kind: "truefalse",
        text: "Die Kassiererin versteht, dass manche Kunden es eilig haben.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Andere Kunden haben es eilig … Das verstehe ich.“ Onu üzen şey telefonla konuşup bakmamak.",
      },
      {
        kind: "gapfill",
        text: "Seit letztem Jahr gibt es ___ Selbstbedienungskassen.",
        options: [],
        answer: 0,
        accept: ["vier", "4"],
        explain: "„Seit letztem Jahr gibt es bei uns vier Selbstbedienungskassen.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange arbeitet sie schon an der Kasse?",
        options: [],
        answer: 0,
        accept: ["seit neun Jahren", "neun Jahre", "9 Jahre", "seit 9 Jahren"],
        explain: "İlk cümle: „Seit neun Jahren sitze ich an der Kasse eines großen Supermarkts.“",
      },
      {
        text: "Was haben die neuen Kassen für sie verändert?",
        options: ["Sie hat weniger Arbeit.", "Sie hat längere Pausen.", "Sie hat mehr Aufgaben gleichzeitig."],
        answer: 2,
        explain: "Şefi yükü hafifletecek demiş, ama artık aynı anda iki yere bakıyor ve cihaz sorunlarını çözüyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l16",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Schulung: Wenn ein Kunde wütend ist",
    genre: "guide",
    intro: "Bir mobilya firmasının müşteri hizmetlerinde yeni çalışanlara eğitim: öfkeli bir müşteriyle nasıl konuşulur.",
    gloss: [
      { de: "wütend", tr: "öfkeli", en: "angry" },
      { de: "ausreden", tr: "sözünü bitirmek", en: "to finish speaking" },
      { de: "verlangen", tr: "talep etmek", en: "to demand" },
      { de: "der Gutschein", tr: "hediye çeki", en: "voucher" },
      { de: "versprechen", tr: "söz vermek", en: "to promise" },
      { de: "der Liefertermin", tr: "teslim tarihi", en: "delivery date" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Petrova", text: "Willkommen im Kundenservice. Heute geht es um eine Situation, die Sie jede Woche erleben werden: Ein Kunde ist wütend und will sofort den Chef sprechen." },
      { speaker: "Frau Petrova", text: "Regel eins: Lassen Sie den Kunden ausreden. Die meisten Menschen werden ruhiger, sobald sie merken, dass jemand wirklich zuhört." },
      { speaker: "Frau Petrova", text: "Regel zwei: Nennen Sie Ihren Namen. Dann spricht der Kunde nicht mehr mit einer Firma, sondern mit einem Menschen, und das ändert den Ton." },
      { speaker: "Teilnehmer", text: "Und wenn er trotzdem den Chef verlangt?" },
      { speaker: "Frau Petrova", text: "Dann sagen Sie ehrlich, was Sie selbst entscheiden dürfen. Bis zweihundert Euro dürfen Sie einen Gutschein geben, ohne jemanden zu fragen." },
      { speaker: "Frau Petrova", text: "Regel drei: Versprechen Sie nichts, was Sie nicht halten können. Ein falscher Liefertermin macht aus einem Kunden, der sich ärgert, einen Kunden, der nie wiederkommt." },
      { speaker: "Teilnehmer", text: "Sollen wir die Gespräche irgendwo notieren?" },
      { speaker: "Frau Petrova", text: "Ja, jedes Gespräch kommt ins System, mit Datum und dem Namen des Kollegen. So muss der Kunde beim nächsten Anruf nicht alles noch einmal erzählen." },
    ],
    questions: [
      {
        text: "Worum geht es in der Schulung?",
        options: [
          "um den Umgang mit wütenden Kunden",
          "um die neuen Möbel im Programm",
          "um die Arbeitszeiten im Service",
        ],
        answer: 0,
        explain: "„Ein Kunde ist wütend und will sofort den Chef sprechen“ — üç kural bu durum için.",
      },
      {
        text: "Warum sollen die Mitarbeiter ihren Namen nennen?",
        options: [
          "damit der Chef sie später findet",
          "damit der Kunde mit einem Menschen spricht",
          "weil es so im Vertrag steht",
        ],
        answer: 1,
        explain: "„… nicht mehr mit einer Firma, sondern mit einem Menschen, und das ändert den Ton.“",
      },
      {
        kind: "truefalse",
        text: "Bis zweihundert Euro dürfen die Mitarbeiter selbst einen Gutschein geben.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Bis zweihundert Euro dürfen Sie einen Gutschein geben, ohne jemanden zu fragen.“",
      },
      {
        kind: "gapfill",
        text: "Die meisten Menschen werden ruhiger, sobald jemand wirklich ___.",
        options: [],
        answer: 0,
        accept: ["zuhört"],
        explain: "Birinci kural: „sobald sie merken, dass jemand wirklich zuhört“.",
      },
      {
        kind: "short_answer",
        text: "Was kommt ins System?",
        options: [],
        answer: 0,
        accept: ["jedes Gespräch", "die Gespräche", "jedes Gespräch mit Datum", "alle Gespräche", "Gespräche", "jedes Gespräch mit Datum und Namen"],
        explain: "„Ja, jedes Gespräch kommt ins System, mit Datum und dem Namen des Kollegen.“",
      },
      {
        text: "Was passiert laut Frau Petrova nach einem falschen Liefertermin?",
        options: [
          "Der Kunde bekommt sein Geld zurück.",
          "Der Chef ruft den Kunden an.",
          "Der Kunde kommt nie wieder.",
        ],
        answer: 2,
        explain: "Tutulamayan söz, kızgın müşteriyi „einen Kunden, der nie wiederkommt“ yapıyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w16",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Lob für einen Mitarbeiter",
    genre: "letter",
    intro: "Bir mağazada çok iyi hizmet aldın: önce iki cümle kur, sonra firmaya bir çalışanı öven bir mektup yaz.",
    gloss: [
      { de: "die Filiale", tr: "şube", en: "branch" },
      { de: "beeindrucken", tr: "etkilemek", en: "to impress" },
      { de: "der Praktikant", tr: "stajyer", en: "intern" },
      { de: "der Kollege", tr: "iş arkadaşı", en: "colleague" },
      { de: "ausrichten", tr: "iletmek", en: "to pass on" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Genç stajyere teşekkür etmek istiyorum.",
        answer: "Ich möchte dem jungen Praktikanten danken.",
        alternatives: ["Dem jungen Praktikanten möchte ich danken."],
        hint: "„der Praktikant“ n-çekimine girer: Dativ'de „dem Praktikanten“; „danken“ Dativ ister.",
      },
      {
        kind: "build",
        tr: "İş arkadaşından da yardım istedi.",
        answer: "Er hat auch seinen Kollegen um Hilfe gebeten.",
        alternatives: ["Er hat seinen Kollegen auch um Hilfe gebeten."],
        hint: "„der Kollege“ Akkusativ'de -n alır: „seinen Kollegen“.",
      },
      {
        kind: "free",
        prompt:
          "Firmanın müşteri hizmetlerine bir övgü mektubu yaz: ne zaman ve neden mağazaya gittiğini söyle, sorunun ne olduğunu anlat, çalışanın ne yaptığını somut olarak yaz, bunun senin için neden önemli olduğunu söyle ve teşekkürünün kendisine iletilmesini rica et.",
        checklist: [
          "Tarihi, mağazayı ve sorunu yaz",
          "Çalışanın ne yaptığını somut anlat",
          "Bunun senin için anlamını söyle",
          "Övgünün iletilmesini rica et",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich möchte mich auf diesem Weg bei … bedanken.", tr: "Bu yolla …'e teşekkür etmek istiyorum.", en: "I would like to take this opportunity to thank …" },
          { de: "Am … war ich in Ihrer Filiale in …", tr: "…'de …'deki şubenizdeydim.", en: "On … I was in your branch in …" },
          { de: "Besonders beeindruckt hat mich, dass …", tr: "Beni özellikle etkileyen şey …", en: "What particularly impressed me was that …" },
          { de: "So einen Service erlebt man selten.", tr: "Böyle bir hizmete nadiren rastlanır.", en: "You rarely experience service like that." },
          { de: "Bitte richten Sie … meinen Dank aus.", tr: "Lütfen …'e teşekkürümü iletin.", en: "Please pass on my thanks to …" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "auf diesem Weg möchte ich mich bei einem Ihrer Mitarbeiter bedanken. Am 12. März war ich in " +
          "Ihrer Filiale in der Hafenstraße, weil meine neue Waschmaschine nach zwei Wochen Wasser verloren " +
          "hat. Ich war ziemlich verärgert, denn ich hatte schon zweimal bei der Hotline angerufen. " +
          "Der junge Praktikant an der Information, Herr Nowak, hat mir ruhig zugehört und sofort seinen " +
          "Kollegen aus der Technik geholt. Besonders beeindruckt hat mich, dass die beiden noch am selben " +
          "Tag einen Termin für die Reparatur gefunden haben. Am nächsten Morgen hat Herr Nowak sogar " +
          "angerufen und gefragt, ob der Techniker gekommen ist. So einen Service erlebt man selten. " +
          "Bitte richten Sie ihm und seinem Kollegen meinen Dank aus.\n\n" +
          "Mit freundlichen Grüßen\nSelin Öztürk",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s16",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Selbstbedienungskasse — Fortschritt oder Verlust?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: gündelik bir yeniliği değerlendir ve kimin için zor olduğunu düşün.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Süpermarketlerde giderek daha çok self-servis kasa var. Sence bu bir ilerleme mi, yoksa bir kayıp mı? Görüşünü söyle, kendi deneyiminden bir örnek ver, kimin için zor olduğunu düşün ve bir öneriyle bitir.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Kendi deneyiminden bir örnek ver",
        "Kimin için zor olduğunu söyle",
        "Mağazalara bir öneride bulun",
      ],
      targets: [
        { de: "Ich sehe darin eher …", tr: "Bunda daha çok … görüyorum" },
        { de: "Neulich habe ich erlebt, dass …", tr: "Geçenlerde şunu yaşadım: …" },
        { de: "Für ältere Kunden ist das kein …, sondern …", tr: "Yaşlı müşteriler için bu bir … değil, …" },
        { de: "Ein Supermarkt sollte immer …", tr: "Bir süpermarket her zaman … yapmalı" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Ich sehe darin eher einen Fortschritt, aber nur, wenn man die Wahl hat. Mit drei Sachen im Korb " +
        "bin ich an der Selbstbedienungskasse in einer Minute fertig, während ich an der normalen Kasse " +
        "manchmal zehn Minuten warte. Neulich habe ich aber erlebt, dass ein älterer Herr vor mir fast " +
        "verzweifelt ist. Das Gerät hat dreimal einen Fehler gemeldet, und kein Mitarbeiter war in der Nähe. " +
        "Für ältere Kunden und für Menschen, die schlecht sehen, ist das kein Fortschritt, sondern Stress. " +
        "Außerdem fällt ein kurzes Gespräch weg, das für manche wichtig ist. Ein Supermarkt sollte deshalb " +
        "immer mindestens eine normale Kasse offen haben, und bei den Geräten sollte ein Mitarbeiter stehen, " +
        "der Zeit hat und nicht gleichzeitig Regale auffüllt.",
      rubricHint:
        "Kişisel bir örnek ve bir öneri beklenir; „während“, „nicht … sondern“ ve „sollte“ kullanılabilir; n-çekimli isimler (den Kunden, dem Kollegen) doğru çekilmeli.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g16",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "den Kunden, dem Kollegen",
    genre: "grammar",
    intro: "Bazı eril isimler yalın hâl dışında her yerde -n ya da -en eki alır; bu küçük grup hem konuşmada hem yazıda çok sık geçer.",
    focus: "n-çekimi (n-Deklination): der Kunde → den Kunden",
    gloss: [
      { de: "der Kunde", tr: "müşteri", en: "customer" },
      { de: "der Nachbar", tr: "komşu", en: "neighbour" },
      { de: "der Student", tr: "üniversite öğrencisi", en: "student" },
      { de: "der Herr", tr: "bay", en: "gentleman" },
      { de: "der Junge", tr: "erkek çocuk", en: "boy" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Hangi isimler?",
        tr: "n-çekimi yalnız bazı ERİL isimlerde görülür: -e ile biten canlılar (der Kunde, der Kollege, der Junge), -ent, -ant ya da -ist ile biten kişi adları (der Student, der Praktikant, der Journalist) ve birkaç ayrı sözcük (der Mensch, der Nachbar, der Herr). Ortak kural: yalın tekil dışında her biçim -n ya da -en alır.",
        examples: [
          { de: "Der Kunde wartet an der Kasse.", tr: "Müşteri kasada bekliyor.", note: "yalın: ek yok" },
          { de: "Ich frage den Kunden nach seinem Namen.", tr: "Müşteriye adını soruyorum.", note: "Akkusativ: -n" },
          { de: "Sie hilft dem Studenten bei der Arbeit.", tr: "Öğrenciye çalışmasında yardım ediyor.", note: "Dativ: -en" },
        ],
      },
      {
        heading: "Artikel de değişir, isim de",
        tr: "Tekil Akkusativ, Dativ ve Genitiv'de ek gelir; çoğulda zaten -n ya da -en vardır. Türkçede hâli yalnız ek gösterir, burada ise hem artikel değişir hem isim -n alır: den Nachbarn, dem Nachbarn, des Nachbarn. Genitiv'de -s gelmez.",
        examples: [
          { de: "Kennst du den neuen Nachbarn?", tr: "Yeni komşuyu tanıyor musun?", note: "Akkusativ" },
          { de: "Ich habe gestern mit dem Nachbarn gesprochen.", tr: "Dün komşuyla konuştum.", note: "Dativ" },
          { de: "Das ist das Auto des Nachbarn.", tr: "Bu, komşunun arabası.", note: "Genitiv: -s yok, -n var" },
        ],
      },
      {
        heading: "İki tuzak: Herr ve Name",
        tr: "„der Herr“ tekilde -n, çoğulda -en alır: „Herrn Braun“, „die Herren“. Mektup başındaki „Sehr geehrter Herr Braun“ yalındır, ama „an Herrn Braun“ Akkusativ'dir. „der Name“ ise Genitiv'de -n'nin yanına bir de -s alır: „des Namens“.",
        examples: [
          { de: "Ich schreibe heute an Herrn Braun.", tr: "Bugün Bay Braun'a yazıyorum.", note: "an + Akkusativ → Herrn" },
          { de: "Wir haben dem Jungen ein Buch geschenkt.", tr: "Oğlana bir kitap hediye ettik.", note: "Dativ: -n" },
          { de: "Die Schreibweise des Namens war falsch.", tr: "Adın yazılışı yanlıştı.", note: "des Namens" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich frage den ___ nach seinem Namen.",
        options: ["Kunde", "Kunden", "Kundes"],
        answer: 1,
        explain: "„der Kunde“ n-çekimine girer; Akkusativ'de -n alır.",
      },
      {
        text: "Sie hilft dem ___ bei der Arbeit.",
        options: ["Studenten", "Student", "Studentes"],
        answer: 0,
        explain: "-ent ile biten kişi adları Dativ'de -en alır: dem Studenten.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Kennst du den neuen Nachbar?",
          "Kennst du den neue Nachbarn?",
          "Kennst du den neuen Nachbarn?",
        ],
        answer: 2,
        explain: "Akkusativ'de hem sıfat (-en) hem isim (-n) ek alır: den neuen Nachbarn.",
      },
      {
        kind: "gapfill",
        text: "Ich schreibe heute an ___ Braun. (Herr)",
        options: [],
        answer: 0,
        accept: ["Herrn"],
        explain: "„an“ burada Akkusativ ister; „der Herr“ tekilde -n alır: Herrn.",
      },
      {
        kind: "gapfill",
        text: "Wir haben dem ___ ein Buch geschenkt. (der Junge)",
        options: [],
        answer: 0,
        accept: ["Jungen"],
        explain: "-e ile biten eril canlı isim Dativ'de -n alır: dem Jungen.",
      },
      {
        kind: "gapfill",
        text: "Das ist das Auto des ___. (der Nachbar)",
        options: [],
        answer: 0,
        accept: ["Nachbarn"],
        explain: "n-çekimli isimler Genitiv'de -s değil -n alır: des Nachbarn.",
      },
      {
        kind: "gapfill",
        text: "Die Schreibweise des ___ war falsch. (der Name)",
        options: [],
        answer: 0,
        accept: ["Namens"],
        explain: "„der Name“ istisnadır: Genitiv'de -n'nin üstüne -s de gelir: des Namens.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Der Kunde", "gibt", "dem Kollegen", "seine Karte"],
        explain: "Yalın hâldeki „der Kunde“ ek almaz; Dativ'deki „dem Kollegen“ -n alır.",
      },
      {
        kind: "truefalse",
        text: "„Der Kunden wartet an der Kasse.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Özne yalın hâldedir ve yalın tekilde ek yoktur: „Der Kunde wartet …“",
      },
      {
        kind: "truefalse",
        text: "„Ich habe mit dem Praktikanten gesprochen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„mit“ Dativ ister ve -ant ile biten kişi adı -en alır: dem Praktikanten.",
      },
    ],
  },
];
