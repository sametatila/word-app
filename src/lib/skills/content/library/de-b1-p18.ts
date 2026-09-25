import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 18.
 *
 * B1 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 18 gelecek ve tahmin hattı: köylerin yirmi yıl sonrası üzerine bir
 * söyleşi, bir okul müdürünün mezuniyet konuşması, on yıl sonraki kendine
 * mektup. Dil bilgisi Futur I — werden + mastarla tahmin, söz ve plan.
 */
export const deB1P18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r18",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "„Das Dorf wird nicht sterben, aber anders“",
    genre: "interview",
    intro: "Bir bölge plancısıyla söyleşi: köylerde yirmi yıl sonra hayat nasıl olacak, dükkân ve otobüs ne olacak, kim zorlanacak.",
    gloss: [
      { de: "das Land", tr: "kırsal", en: "countryside" },
      { de: "entscheidend", tr: "belirleyici", en: "decisive" },
      { de: "das Personal", tr: "personel", en: "staff" },
      { de: "verschwinden", tr: "kaybolmak", en: "to disappear" },
      { de: "abholen", tr: "gidip almak", en: "to pick up" },
      { de: "die Gemeinde", tr: "belediye", en: "municipality" },
    ],
    minutes: 6,
    text:
      "„Das Dorf wird nicht sterben, aber anders“\n\n" +
      "Viele Dörfer verlieren seit Jahren Läden, Ärzte und junge Leute. Wir haben die Regionalplanerin " +
      "Dr. Anja Roth gefragt, wie das Leben auf dem Land in zwanzig Jahren aussehen wird.\n\n" +
      "Frage: Werden die Dörfer leer?\n" +
      "Roth: Nein. Einige werden kleiner, andere wachsen sogar wieder. Seit viele Menschen zu Hause " +
      "arbeiten können, ziehen Familien aus der Stadt zurück aufs Land. Entscheidend wird sein, ob es " +
      "schnelles Internet und eine Kita gibt.\n\n" +
      "Frage: Und der Dorfladen?\n" +
      "Roth: Den klassischen Laden mit Verkäuferin wird es selten geben. Ich rechne eher mit kleinen " +
      "Läden ohne Personal, die rund um die Uhr offen sind und mit einer Karte funktionieren. Einige gibt " +
      "es schon heute.\n\n" +
      "Frage: Wie kommt man ohne Auto zum Arzt?\n" +
      "Roth: Das ist die schwierigste Frage. Busse, die nach Fahrplan leer durch die Gegend fahren, werden " +
      "verschwinden. Stattdessen wird man einen kleinen Bus per App bestellen, der einen zu Hause abholt.\n\n" +
      "Frage: Was macht Ihnen Sorgen?\n" +
      "Roth: Die Älteren. Wer kein Smartphone hat, wird es schwer haben. Die Gemeinden werden deshalb " +
      "Menschen brauchen, die dabei helfen, und ohne Ehrenamt wird das nicht gehen.",
    questions: [
      {
        text: "Warum ziehen manche Familien wieder aufs Land?",
        options: [
          "weil viele Menschen zu Hause arbeiten können",
          "weil die Mieten in der Stadt fallen",
          "weil es auf dem Land mehr Ärzte gibt",
        ],
        answer: 0,
        explain: "„Seit viele Menschen zu Hause arbeiten können, ziehen Familien aus der Stadt zurück aufs Land.“",
      },
      {
        text: "Wie wird der Dorfladen laut Roth oft aussehen?",
        options: [
          "wie früher, mit einer Verkäuferin",
          "ohne Personal und rund um die Uhr offen",
          "nur noch als Laden im Internet",
        ],
        answer: 1,
        explain: "„… kleinen Läden ohne Personal, die rund um die Uhr offen sind und mit einer Karte funktionieren.“",
      },
      {
        kind: "truefalse",
        text: "Roth glaubt, dass Busse mit festem Fahrplan verschwinden werden.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Busse, die nach Fahrplan leer durch die Gegend fahren, werden verschwinden.“",
      },
      {
        kind: "gapfill",
        text: "Man wird einen kleinen Bus per ___ bestellen.",
        options: [],
        answer: 0,
        accept: ["App"],
        explain: "„Stattdessen wird man einen kleinen Bus per App bestellen, der einen zu Hause abholt.“",
      },
      {
        kind: "short_answer",
        text: "Um wen macht sich Roth Sorgen?",
        options: [],
        answer: 0,
        accept: ["um die Älteren", "die Älteren", "ältere Menschen", "um ältere Menschen", "Ältere", "die älteren Menschen", "um die älteren Menschen"],
        explain: "„Die Älteren. Wer kein Smartphone hat, wird es schwer haben.“",
      },
      {
        text: "Was werden die Gemeinden laut Roth brauchen?",
        options: ["mehr Geld vom Staat", "neue Straßen zwischen den Dörfern", "Menschen, die ehrenamtlich helfen"],
        answer: 2,
        explain: "„… Menschen brauchen, die dabei helfen, und ohne Ehrenamt wird das nicht gehen.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l18",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Rede zum Schulabschluss",
    genre: "monologue",
    intro: "Bir okul müdürü mezuniyet töreninde konuşuyor: mezunlara ne söylüyor, kendinden ne anlatıyor, neyi rica ediyor.",
    gloss: [
      { de: "der Absolvent", tr: "mezun", en: "graduate" },
      { de: "die Rede", tr: "konuşma", en: "speech" },
      { de: "das Unglück", tr: "felaket", en: "disaster" },
      { de: "neugierig", tr: "meraklı", en: "curious" },
      { de: "die Reihe", tr: "sıra", en: "row" },
      { de: "das Klassentreffen", tr: "sınıf buluşması", en: "class reunion" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Dr. Winter", text: "Liebe Absolventinnen und Absolventen, liebe Eltern, heute ist Ihr letzter Tag an dieser Schule, und ich verspreche Ihnen: Meine Rede wird kürzer als eine Mathestunde." },
      { speaker: "Frau Dr. Winter", text: "Sie werden in den nächsten Jahren viele Entscheidungen treffen. Manche davon werden falsch sein. Das ist kein Unglück, sondern der ganz normale Weg." },
      { speaker: "Frau Dr. Winter", text: "Ich habe selbst zuerst Chemie studiert und nach drei Semestern gemerkt, dass ich lieber mit Menschen als mit Flaschen arbeite." },
      { speaker: "Frau Dr. Winter", text: "Einige von Ihnen werden studieren, andere eine Ausbildung machen, und ein paar werden erst einmal reisen. Keiner dieser Wege ist besser als der andere." },
      { speaker: "Frau Dr. Winter", text: "Eine Bitte habe ich trotzdem. Bleiben Sie neugierig. Die Welt wird sich schneller ändern als Ihre Schulbücher." },
      { speaker: "Frau Dr. Winter", text: "Und rufen Sie ab und zu Ihre Eltern an. Sie sitzen heute in der dritten Reihe und werden gleich wahrscheinlich weinen." },
      { speaker: "Frau Dr. Winter", text: "In zehn Jahren laden wir Sie zum Klassentreffen ein. Dann werden Sie mir erzählen, was aus Ihnen geworden ist. Ich freue mich schon darauf." },
    ],
    questions: [
      {
        text: "Was verspricht Frau Dr. Winter am Anfang?",
        options: ["Die Rede wird kurz.", "Gleich gibt es Essen.", "Alle bekommen ein Geschenk."],
        answer: 0,
        explain: "„Meine Rede wird kürzer als eine Mathestunde.“",
      },
      {
        text: "Was sagt sie über falsche Entscheidungen?",
        options: [
          "Man sollte sie unbedingt vermeiden.",
          "Sie gehören zum normalen Weg.",
          "Die Eltern sollen sie verhindern.",
        ],
        answer: 1,
        explain: "„Das ist kein Unglück, sondern der ganz normale Weg.“",
      },
      {
        kind: "truefalse",
        text: "Frau Dr. Winter hat zuerst ein anderes Fach studiert.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Önce kimya okumuş, üç dönem sonra insanlarla çalışmak istediğini anlamış.",
      },
      {
        kind: "dictation",
        text: "Müdürün „Eine Bitte habe ich trotzdem.“ dedikten sonraki ricasını duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Bleiben Sie neugierig.", "Bleiben Sie neugierig"],
        explain: "„Bleiben Sie neugierig.“ — gerekçesi: dünya ders kitaplarından hızlı değişecek.",
      },
      {
        kind: "gapfill",
        text: "Das Klassentreffen soll in ___ Jahren sein.",
        options: [],
        answer: 0,
        accept: ["zehn", "10"],
        explain: "„In zehn Jahren laden wir Sie zum Klassentreffen ein.“",
      },
      {
        text: "Wo sitzen die Eltern?",
        options: ["in der ersten Reihe", "ganz hinten im Saal", "in der dritten Reihe"],
        answer: 2,
        explain: "„Sie sitzen heute in der dritten Reihe und werden gleich wahrscheinlich weinen.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w18",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Brief an mich in zehn Jahren",
    genre: "personal",
    intro: "Bir kursun kapanışında on yıl sonra açılacak bir mektup yazıyorsun: önce iki cümle kur, sonra geleceğe bir mektup yaz.",
    gloss: [
      { de: "vermuten", tr: "sanmak", en: "to suppose" },
      { de: "inzwischen", tr: "artık", en: "by now" },
      { de: "wahrscheinlich", tr: "muhtemelen", en: "probably" },
      { de: "versprechen", tr: "söz vermek", en: "to promise" },
      { de: "neugierig", tr: "meraklı", en: "curious" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "On yıl sonra muhtemelen başka bir şehirde yaşıyor olacağım.",
        answer: "In zehn Jahren werde ich wahrscheinlich in einer anderen Stadt wohnen.",
        alternatives: ["Ich werde in zehn Jahren wahrscheinlich in einer anderen Stadt wohnen."],
        hint: "Futur I: çekimli „werden“ ikinci sırada, asıl fiil mastar olarak en sonda.",
      },
      {
        kind: "build",
        tr: "Umarım hâlâ her gün Almanca konuşuyorsundur.",
        answer: "Ich hoffe, dass du immer noch jeden Tag Deutsch sprichst.",
        alternatives: ["Ich hoffe, dass du noch immer jeden Tag Deutsch sprichst."],
        hint: "„dass“ yan cümlesinde fiil sona gider; umut bildirirken Präsens de geleceği anlatır.",
      },
      {
        kind: "free",
        prompt:
          "On yıl sonraki kendine bir mektup yaz: bugünkü hayatını kısaca anlat, on yıl içinde neyin değişeceğini tahmin et, kendine iki soru sor, kendine bir söz ver ve bir dilekle bitir.",
        checklist: [
          "Bugünkü durumunu kısaca anlat",
          "En az iki tahminde bulun (werden + mastar)",
          "Kendine iki soru sor",
          "Bir söz ver ve bir dilekle bitir",
        ],
        minWords: 90,
        phrases: [
          { de: "Wenn du diesen Brief liest, …", tr: "Bu mektubu okuduğunda …", en: "When you read this letter, …" },
          { de: "Im Moment wohne ich …", tr: "Şu an …'de oturuyorum", en: "At the moment I live …" },
          { de: "Ich vermute, dass du inzwischen …", tr: "Sanırım sen artık …", en: "I suspect that by now you …" },
          { de: "Hast du eigentlich …?", tr: "Acaba … yaptın mı?", en: "Have you actually …?" },
          { de: "Ich verspreche dir, dass ich …", tr: "Sana … diye söz veriyorum.", en: "I promise you that I will …" },
        ],
        sample:
          "Liebe Aylin in zehn Jahren,\n\nwenn du diesen Brief liest, bist du achtunddreißig. Im Moment wohne " +
          "ich mit zwei Freundinnen in einer kleinen Wohnung in Leipzig und mache eine Ausbildung zur " +
          "Physiotherapeutin. Mein Deutsch ist gut, aber am Telefon werde ich immer noch nervös. Ich vermute, " +
          "dass du inzwischen in einer großen Praxis arbeitest oder sogar eine eigene hast. Vielleicht wirst du sogar schon Kinder haben. In zehn Jahren " +
          "werde ich wahrscheinlich in einer anderen Stadt wohnen, vielleicht am Meer. Hast du eigentlich den " +
          "Führerschein gemacht? Und telefonierst du ohne Angst? Ich hoffe, dass du immer noch jeden Tag " +
          "Deutsch sprichst und dass du Oma in Izmir öfter besuchst als ich heute. Ich verspreche dir, dass " +
          "ich ab jetzt jedes Jahr eine Reise allein mache. Bleib neugierig!\n\nDeine Aylin von heute",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s18",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Wird das Bargeld verschwinden?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: bir tahminde bulun ve sonucunun kimi nasıl etkileyeceğini tart.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Sence nakit para yakında ortadan kalkacak mı? Tahminini söyle, kendi ödeme alışkanlığından bir örnek ver, nakitsiz bir dünyada kimin zorlanacağını düşün ve ne yapılması gerektiğini söyle.",
      bulletsTr: [
        "Tahminini tek cümleyle söyle",
        "Kendi ödeme alışkanlığını anlat",
        "Kimin zorlanacağını söyle",
        "Ne yapılması gerektiğini öner",
      ],
      targets: [
        { de: "Ich bin mir ziemlich sicher, dass …", tr: "…'den oldukça eminim." },
        { de: "Ich selbst bezahle inzwischen fast nur …", tr: "Ben artık neredeyse yalnız … ile ödüyorum" },
        { de: "Schwer haben werden es vor allem …", tr: "Özellikle … zorlanacak" },
        { de: "Deshalb sollte man …", tr: "Bu yüzden … yapılmalı" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Ich bin mir ziemlich sicher, dass Bargeld immer seltener wird, aber ganz verschwinden wird es nicht. " +
        "Ich selbst bezahle inzwischen fast nur mit dem Handy, sogar beim Bäcker. Mein Portemonnaie liegt " +
        "meistens zu Hause, und ich vermisse es nicht. Trotzdem werde ich nie vergessen, wie im letzten " +
        "Winter das Netz in unserem Supermarkt ausgefallen ist: Eine halbe Stunde konnte niemand bezahlen, " +
        "nur die Leute mit Bargeld. Schwer haben werden es vor allem ältere Menschen und Kinder, die ihr " +
        "Taschengeld noch in der Hand halten wollen. Auch wer wenig Geld hat, behält mit Scheinen und Münzen " +
        "oft einen besseren Überblick. Deshalb sollte man digital bezahlen dürfen, aber jedes Geschäft " +
        "sollte auch in Zukunft Bargeld annehmen müssen.",
      rubricHint:
        "Bir tahmin, kişisel bir örnek ve bir öneri beklenir; Futur I („wird verschwinden“, „werden es schwer haben“) ve „sollte“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g18",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Morgen wird es regnen",
    genre: "grammar",
    intro: "Almancada gelecek çoğu zaman şimdiki zamanla söylenir; werden + mastar ise özellikle tahmin, ciddi söz ve güçlü niyet bildirir.",
    focus: "Futur I: werden + mastar — tahmin, söz ve plan",
    gloss: [
      { de: "regnen", tr: "yağmur yağmak", en: "to rain" },
      { de: "wahrscheinlich", tr: "muhtemelen", en: "probably" },
      { de: "pünktlich", tr: "dakik", en: "punctual" },
      { de: "anrufen", tr: "telefon etmek", en: "to call" },
      { de: "krank", tr: "hasta", en: "sick" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Biçim",
        tr: "„werden“ çekimlenir (ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden) ve asıl fiil mastar olarak EN SONA gider. Dikkat: „werden“ tek başına „olmak“ demektir; „Er wird Arzt“ gelecek zaman değil, „doktor oluyor“ anlamındadır.",
        examples: [
          { de: "Morgen wird es regnen.", tr: "Yarın yağmur yağacak.", note: "wird … regnen" },
          { de: "Ich werde dich heute Abend anrufen.", tr: "Bu akşam seni arayacağım.", note: "söz" },
          { de: "Er wird Arzt.", tr: "Doktor oluyor.", note: "tek başına werden: olmak" },
        ],
      },
      {
        heading: "Ne zaman Präsens yeter?",
        tr: "Zaman sözcüğü geleceği zaten gösteriyorsa günlük dilde Präsens kullanılır: „Morgen fahre ich nach Köln.“ Futur I özellikle tahminde (wahrscheinlich, sicher), ciddi bir sözde ya da resmî bir planda öne çıkar.",
        examples: [
          { de: "Morgen fahre ich nach Köln.", tr: "Yarın Köln'e gidiyorum.", note: "plan: Präsens yeter" },
          { de: "Wir werden wahrscheinlich zu spät kommen.", tr: "Muhtemelen geç kalacağız.", note: "tahmin" },
          { de: "Ich werde ab jetzt pünktlich sein, versprochen!", tr: "Bundan sonra dakik olacağım, söz!", note: "ciddi söz" },
        ],
      },
      {
        heading: "Şimdiye dair tahmin ve yan cümle",
        tr: "Futur I ŞİMDİ olan bir şey hakkında tahmin de bildirebilir: „Sie wird noch im Büro sein.“ yani „Herhâlde hâlâ bürodadır.“ Yan cümlede çekimli „werden“ en sona, mastarın arkasına gider.",
        examples: [
          { de: "Er ist nicht da. Er wird krank sein.", tr: "Burada değil. Herhâlde hasta.", note: "şimdiye dair tahmin" },
          { de: "Sie wird noch im Büro sein.", tr: "Herhâlde hâlâ bürodadır.", note: "vermutlich anlamı" },
          { de: "Ich glaube, dass es morgen regnen wird.", tr: "Yarın yağmur yağacağını düşünüyorum.", note: "wird sonda" },
        ],
      },
    ],
    questions: [
      {
        text: "Morgen ___ es wahrscheinlich regnen.",
        options: ["wird", "werdet", "wirst"],
        answer: 0,
        explain: "Özne „es“: üçüncü tekil kişi biçimi wird.",
      },
      {
        text: "Welcher Satz steht im Futur I?",
        options: [
          "Ich werde Lehrerin.",
          "Ich werde dich morgen anrufen.",
          "Ich wurde gestern angerufen.",
        ],
        answer: 1,
        explain: "Futur I = werden + mastar. İlk cümlede werden „olmak“, üçüncüsü geçmiş edilgen.",
      },
      {
        text: "Er ist nicht gekommen. Er ___ krank sein.",
        options: ["hat", "ist", "wird"],
        answer: 2,
        explain: "Şimdiye dair tahmin: wird … sein = herhâlde … dır.",
      },
      {
        kind: "gapfill",
        text: "Ich glaube, dass es morgen regnen ___.",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "Yan cümlede çekimli „werden“ en sona, mastardan sonraya gider.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ wahrscheinlich zu spät kommen. (werden)",
        options: [],
        answer: 0,
        accept: ["werden"],
        explain: "Özne „wir“: werden; mastar (kommen) sonda.",
      },
      {
        kind: "gapfill",
        text: "___ du mich heute Abend anrufen? (werden)",
        options: [],
        answer: 0,
        accept: ["Wirst", "wirst"],
        explain: "„du“ için „werden“ düzensizdir: wirst.",
      },
      {
        kind: "gapfill",
        text: "Ich werde ab jetzt pünktlich ___. (sein)",
        options: [],
        answer: 0,
        accept: ["sein"],
        explain: "„werden“in yanında asıl fiil çekimsiz mastar kalır: sein.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "werde", "dich", "heute Abend", "anrufen"],
        explain: "Çekimli „werde“ ikinci sırada, mastar „anrufen“ en sonda.",
      },
      {
        kind: "truefalse",
        text: "„Morgen fahre ich nach Köln.“ — Bu cümle gelecek için doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Zaman sözcüğü (morgen) geleceği gösterdiği için Präsens yeterli ve doğal.",
      },
      {
        kind: "truefalse",
        text: "„Ich werde morgen anrufen dich.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Mastar en sona gider: „Ich werde dich morgen anrufen.“",
      },
    ],
  },
];
