import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * B1 Patikası 180 ders ve 270 egzersizle gündelik hayatın çoğunu tutuyor;
 * kütüphane bu yüzden başka bir yerden bakıyor: bir kurumun kendi kuralları
 * (hobi bahçesi derneği), uzun soluklu bir iş (orman) ve öğrencinin kendi
 * konumunu kurması gereken iki üretim görevi.
 *
 * B1'in ölçtüğü şey artık "anladın mı" değil: metinde söylenmeyeni çıkarmak,
 * bir görüşü gerekçesiyle savunmak ve yan cümleyi doğru kurmak.
 */
export const deB1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r1",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Warten auf ein Stück Grün",
    genre: "Gazete yazısı",
    intro: "Şehirdeki hobi bahçelerini anlatan bir gazete yazısı: neden sıra bekleniyor, kim başvuruyor, kavga neden çıkıyor.",
    gloss: [
      { de: "die Warteliste", tr: "bekleme listesi", en: "waiting list" },
      { de: "der Vorstand", tr: "yönetim kurulu", en: "board" },
      { de: "die Parzelle", tr: "parsel", en: "plot" },
      { de: "vergeben", tr: "dağıtılmış", en: "allocated" },
      { de: "abgeben", tr: "geri vermek", en: "to give up" },
      { de: "die Vorschrift", tr: "kural", en: "regulation" },
      { de: "anbauen", tr: "yetiştirmek", en: "to grow" },
    ],
    minutes: 7,
    text:
      "KLEINGÄRTEN: WARTEN AUF EIN STÜCK GRÜN\n\n" +
      "In vielen deutschen Städten braucht man Geduld, wenn man einen Kleingarten möchte. Die Wartelisten sind lang, " +
      "in manchen Vereinen dauert es fünf bis sieben Jahre. Gleichzeitig klagen andere Vereine, dass ihnen die Mitglieder fehlen.\n\n" +
      "Wie passt das zusammen? Frau Özdemir sitzt seit zwölf Jahren im Vorstand eines Vereins in Hannover und erklärt es so: " +
      "„Bei uns in der Stadt ist jede Parzelle vergeben. Zwanzig Kilometer weiter draußen steht die Hälfte leer, " +
      "weil niemand so weit fahren will.“\n\n" +
      "Verändert hat sich auch, wer kommt. Früher waren es vor allem Rentnerinnen und Rentner. Heute bewerben sich junge " +
      "Familien, die in ihrer Wohnung keinen Balkon haben, und Leute, die ihr Gemüse selbst anbauen möchten.\n\n" +
      "Nicht alle bleiben lange. „Manche denken, ein Garten ist ein Café mit Blumen“, sagt Frau Özdemir. „Dann kommt der " +
      "erste heiße Sommer, und sie merken, dass sie jede Woche kommen müssen.“ Rund ein Fünftel gibt die Parzelle schon " +
      "im ersten Jahr wieder ab.\n\n" +
      "Streit gibt es meistens nicht um Pflanzen, sondern um Regeln. Wie hoch darf die Hütte sein? Darf man grillen? " +
      "Ein Drittel der Fläche soll für Obst und Gemüse genutzt werden — das steht in den Vorschriften vieler Vereine, " +
      "und genau diese Regel überrascht neue Mitglieder am häufigsten.",
    questions: [
      {
        text: "Worum geht es in dem Text vor allem?",
        options: [
          "Kleingärten sind in der Stadt sehr gefragt, außerhalb aber nicht.",
          "Kleingärten werden in ganz Deutschland immer teurer.",
          "Immer weniger Menschen interessieren sich für Kleingärten.",
        ],
        answer: 0,
        explain: "İlk iki paragrafın çelişkisi bu: şehirde her parsel dolu, yirmi kilometre ötede yarısı boş. Fiyat hiç geçmiyor.",
      },
      {
        text: "Warum bleiben draußen viele Parzellen leer?",
        options: [
          "Die Leute wollen nicht so weit fahren.",
          "Dort sind die Vorschriften strenger.",
          "Dort ist der Boden schlechter.",
        ],
        answer: 0,
        explain: "„… steht die Hälfte leer, weil niemand so weit fahren will.“ Toprak ve kurallar bu cümlede hiç geçmiyor.",
      },
      {
        text: "Was meint Frau Özdemir mit „ein Café mit Blumen“?",
        options: [
          "Manche unterschätzen, wie viel Arbeit ein Garten macht.",
          "Manche möchten in ihrem Garten Kaffee verkaufen.",
          "In den Vereinen gibt es zu wenige Sitzplätze.",
        ],
        answer: 0,
        explain: "Cümlenin devamı yorumu veriyor: „Dann kommt der erste heiße Sommer, und sie merken, dass sie jede Woche kommen müssen.“",
      },
      {
        kind: "truefalse",
        text: "Der Streit in den Vereinen geht meistens um die Pflanzen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Streit gibt es meistens nicht um Pflanzen, sondern um Regeln.“ — yükseklik, mangal, kullanım oranı.",
      },
      {
        kind: "gapfill",
        text: "Rund ___ gibt die Parzelle schon im ersten Jahr wieder ab.",
        options: [],
        answer: 0,
        accept: ["ein Fünftel", "Fünftel"],
        explain: "„Rund ein Fünftel gibt die Parzelle schon im ersten Jahr wieder ab.“ — beşte biri.",
      },
      {
        kind: "short_answer",
        text: "Wie viel von der Fläche ist für Obst und Gemüse vorgeschrieben?",
        options: [],
        answer: 0,
        accept: ["ein Drittel", "Drittel", "ein Drittel der Fläche"],
        explain: "Son cümle: „Ein Drittel der Fläche soll für Obst und Gemüse genutzt werden“ — ve yazı bunu en çok şaşırtan kural sayıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l1",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Führung durch den Stadtwald",
    genre: "Rehberli gezi",
    intro: "Bir orman görevlisi gruba ormanı gezdiriyor: neyin değiştiğini, ne diktiklerini ve ziyaretçilerden ne beklediğini anlatıyor.",
    gloss: [
      { de: "der Förster", tr: "orman görevlisi", en: "forester" },
      { de: "die Buche", tr: "kayın", en: "beech" },
      { de: "die Eiche", tr: "meşe", en: "oak" },
      { de: "die Art", tr: "tür", en: "species" },
      { de: "mischen", tr: "karıştırmak", en: "to mix" },
      { de: "der Müll", tr: "çöp", en: "rubbish" },
    ],
    minutes: 7,
    segments: [
      { speaker: "Herr Krause", text: "Herzlich willkommen im Stadtwald. Ich bin Andreas Krause, Förster hier seit achtzehn Jahren. Wir gehen jetzt ungefähr eine Stunde." },
      { speaker: "Herr Krause", text: "Sehen Sie die Buchen dort links? Vor zehn Jahren waren das die stärksten Bäume in diesem Wald. Heute ist mehr als die Hälfte davon krank." },
      { speaker: "Teilnehmerin", text: "Liegt das an der Hitze im Sommer?" },
      { speaker: "Herr Krause", text: "Vor allem an der Trockenheit. Ein großer Baum braucht an einem heißen Tag mehrere hundert Liter Wasser, und die bekommt er nicht mehr." },
      { speaker: "Herr Krause", text: "Deshalb pflanzen wir heute andere Arten. Eichen zum Beispiel, und Bäume, die mit wenig Wasser zurechtkommen." },
      { speaker: "Teilnehmer", text: "Ist das nicht gefährlich? Wenn diese Bäume hier nicht heimisch sind, fehlt den Tieren doch etwas." },
      { speaker: "Herr Krause", text: "Eine berechtigte Frage. Deshalb mischen wir: Wir setzen nie nur eine Art, sondern immer fünf oder sechs zusammen." },
      { speaker: "Herr Krause", text: "Was wir heute pflanzen, sieht erst meine Enkelin. Ein Wald denkt nicht in Jahren, sondern in Generationen." },
      { speaker: "Teilnehmerin", text: "Und was können wir als Besucher tun?" },
      { speaker: "Herr Krause", text: "Bleiben Sie auf den Wegen und nehmen Sie Ihren Müll wieder mit. Das klingt klein, aber bei zweihunderttausend Besuchern im Jahr ist es viel." },
    ],
    questions: [
      {
        text: "Worum geht es in der Führung vor allem?",
        options: [
          "Wie sich der Wald verändert und was jetzt gepflanzt wird.",
          "Wie man im Wald wandern und Tiere beobachten kann.",
          "Warum der Wald für Besucher gesperrt werden soll.",
        ],
        answer: 0,
        explain: "Görevli önce hasta kayınları, sonra yeni dikilen türleri anlatıyor; yürüyüş tarifi ya da kapatma hiç geçmiyor.",
      },
      {
        text: "Warum sind viele Buchen krank?",
        options: [
          "Sie bekommen im Sommer zu wenig Wasser.",
          "Sie sind zu alt geworden.",
          "Es gibt zu viele Besucher im Wald.",
        ],
        answer: 0,
        explain: "„Vor allem an der Trockenheit … und die bekommt er nicht mehr.“ Yaş ve ziyaretçi başka bağlamda geçiyor.",
      },
      {
        kind: "truefalse",
        text: "Der Förster pflanzt immer nur eine einzige Baumart.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Wir setzen nie nur eine Art, sondern immer fünf oder sechs zusammen.“ — karışık dikim tam da itiraza verdiği cevap.",
      },
      {
        kind: "short_answer",
        text: "Wie lange arbeitet Herr Krause schon in diesem Wald?",
        options: [],
        answer: 0,
        accept: ["seit achtzehn Jahren", "achtzehn Jahre", "18 Jahre", "seit 18 Jahren"],
        explain: "İlk bölümde kendini tanıtırken söylüyor: „Förster hier seit achtzehn Jahren.“",
      },
      {
        kind: "dictation",
        text: "Görevlinin ormanın zamanı hakkındaki cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Ein Wald denkt nicht in Jahren, sondern in Generationen.",
          "Ein Wald denkt nicht in Jahren sondern in Generationen",
        ],
        explain: "„Ein Wald denkt nicht in Jahren, sondern in Generationen.“ — „nicht … sondern“ ikilisi karşıtlığı kurar.",
      },
      {
        text: "Was erwartet der Förster von den Besuchern?",
        options: [
          "Auf den Wegen bleiben und den Müll mitnehmen.",
          "Beim Pflanzen der jungen Bäume helfen.",
          "Nur im Winter in den Wald kommen.",
        ],
        answer: 0,
        explain: "Son cevabı bu iki şeyi istiyor ve gerekçesini de veriyor: yılda iki yüz bin ziyaretçi.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w1",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Antwort auf eine Anzeige",
    genre: "Resmî e-posta",
    intro: "Önce iki cümle kur, sonra bir gönüllülük ilanına yarı resmî bir e-postayla cevap ver.",
    gloss: [
      { de: "das Ehrenamt", tr: "gönüllü iş", en: "voluntary work" },
      { de: "die Geduld", tr: "sabır", en: "patience" },
      { de: "sich bewerben", tr: "başvurmak", en: "to apply" },
      { de: "die Anzeige", tr: "ilan", en: "advert" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bahçeyi geri verdi çünkü hiç zamanı yoktu.",
        answer: "Er hat den Garten abgegeben, weil er keine Zeit hatte.",
        alternatives: ["Er hat den Garten abgegeben, weil er keine Zeit gehabt hat."],
        hint: "„weil“ yan cümle kurar: çekimli fiil (hatte) cümlenin SONUNA gider. Türkçedeki „çünkü“ ise söz dizimini değiştirmez.",
      },
      {
        kind: "build",
        tr: "Umarım önümüzdeki yıl bir parsel alırım.",
        answer: "Ich hoffe, dass ich nächstes Jahr eine Parzelle bekomme.",
        alternatives: ["Ich hoffe, dass ich im nächsten Jahr eine Parzelle bekomme."],
        hint: "„dass“ de yan cümle kurar: özne başta, çekimli fiil (bekomme) sonda. Virgül zorunlu.",
      },
      {
        kind: "free",
        prompt:
          "Aşağıdaki ilana e-postayla cevap ver. Kendini tanıt, neden katılmak istediğini açıkla, hangi günler uygun olduğunu söyle ve bir soru sor.",
        stimulus:
          "Lesepaten gesucht!\n\n" +
          "Die Stadtbibliothek sucht Menschen, die einmal pro Woche eine Stunde mit Kindern lesen. " +
          "Sie brauchen keine Ausbildung — wichtig sind Geduld und gutes Deutsch. " +
          "Termine: dienstags oder donnerstags, 15 bis 17 Uhr.\n\n" +
          "Schreiben Sie uns kurz, wer Sie sind, warum Sie mitmachen möchten und wann Sie Zeit haben.\n" +
          "lesepaten@stadtbibliothek.de",
        checklist: [
          "Hangi ilana yazdığını söyle",
          "Kendini kısaca tanıt (iş, durum, deneyim)",
          "Neden katılmak istediğini gerekçelendir",
          "Uygun günü yaz ve bir soru sor",
        ],
        minWords: 60,
        phrases: [
          { de: "Ich habe Ihre Anzeige … gelesen.", tr: "İlanınızı … okudum." },
          { de: "Ich interessiere mich für …", tr: "… ile ilgileniyorum" },
          { de: "Zurzeit arbeite ich als …", tr: "Şu anda … olarak çalışıyorum" },
          { de: "Dienstags hätte ich Zeit.", tr: "Salı günleri vaktim olur." },
          { de: "Über eine Antwort würde ich mich freuen.", tr: "Cevabınızı beklerim." },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich habe Ihre Anzeige für Lesepaten auf der Internetseite der Bibliothek gelesen und interessiere mich sehr dafür. " +
          "Mein Name ist Elif Yalçın, ich bin 34 Jahre alt und arbeite zurzeit halbtags in einem Büro. " +
          "Ich möchte mitmachen, weil ich selbst als Kind kaum Bücher zu Hause hatte und weiß, wie viel eine Stunde Vorlesen " +
          "bedeuten kann. Außerdem habe ich zwei Jahre lang meiner Nichte beim Lesen geholfen.\n\n" +
          "Dienstags hätte ich immer Zeit, donnerstags nur jede zweite Woche. Eine Frage habe ich noch: " +
          "Wie viele Kinder betreut man an einem Nachmittag?\n\n" +
          "Über eine Antwort würde ich mich freuen.\n" +
          "Mit freundlichen Grüßen\nElif Yalçın",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s1",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Zu Hause oder im Büro?",
    genre: "Monolog",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: görüşünü söyle ve gerekçelendir.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Bazı işler evden de yapılabiliyor. Sence insanlar evden mi yoksa iş yerinden mi çalışmalı? Görüşünü söyle ve en az iki gerekçe ver.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "En az iki gerekçe ver (zaman, para, iletişim, aile…)",
        "Karşı tarafın bir argümanını da söyle",
        "Kendi sonucunla bitir",
      ],
      targets: [
        { de: "Meiner Meinung nach …", tr: "Bence …" },
        { de: "Der größte Vorteil ist, dass …", tr: "En büyük avantajı … olması" },
        { de: "Auf der anderen Seite …", tr: "Öte yandan …" },
        { de: "Deshalb finde ich, dass …", tr: "Bu yüzden … olduğunu düşünüyorum" },
      ],
      minSeconds: 40,
      maxSeconds: 75,
      sampleDe:
        "Meiner Meinung nach sollte man beides mischen. Der größte Vorteil vom Homeoffice ist, dass man keine Zeit " +
        "auf dem Weg verliert. Ich brauche jeden Tag fast eine Stunde ins Büro, und diese Stunde fehlt mir abends. " +
        "Außerdem kann ich zu Hause ruhiger arbeiten, weil niemand alle zehn Minuten etwas fragt. " +
        "Auf der anderen Seite verliert man den Kontakt zu den Kollegen. Viele Probleme löst man in drei Minuten " +
        "in der Küche, per E-Mail dauert das drei Tage. Deshalb finde ich, dass zwei Tage im Büro und drei Tage " +
        "zu Hause die beste Lösung sind.",
      rubricHint:
        "Görüş gerekçesiyle birlikte gelmeli ve en az bir karşı argüman bulunmalı; „weil“ ve „dass“ yan cümlelerinde fiil sonda olmalı.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g1",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "Das Verb wandert ans Ende",
    genre: "Kural",
    intro: "Yan cümlenin tek büyük kuralı ve onun üç sık bağlacı: weil, dass, wenn.",
    focus: "Nebensatz: weil / dass / wenn — çekimli fiil sona",
    gloss: [
      { de: "abholen", tr: "almaya gitmek", en: "to pick up" },
      { de: "umziehen", tr: "taşınmak", en: "to move house" },
      { de: "regnen", tr: "yağmur yağmak", en: "to rain" },
      { de: "die Adresse", tr: "adres", en: "address" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Tek kural, üç bağlaç",
        tr: "Türkçede yan cümle ekle kurulur ve fiil zaten sondadır: „vaktim olmadığı için“. Almancada ana cümlede fiil ikinci sıradadır, ama bir bağlaç geldiği anda çekimli fiil cümlenin en sonuna gider. Virgül zorunludur.",
        examples: [
          { de: "Ich komme nicht, weil ich keine Zeit habe.", tr: "Gelmiyorum, çünkü vaktim yok.", note: "habe sonda" },
          { de: "Ich hoffe, dass du bald kommst.", tr: "Umarım yakında gelirsin.", note: "kommst sonda" },
          { de: "Wenn es morgen regnet, bleiben wir zu Hause.", tr: "Yarın yağmur yağarsa evde kalırız.", note: "regnet sonda" },
        ],
      },
      {
        heading: "İki fiil varsa hangisi sona gider",
        tr: "Sona giden şey ÇEKİMLİ fiildir. Modal fiilli cümlede mastar sondan bir önceye, modal en sona geçer. Ayrılabilen fiil ise yan cümlede tekrar birleşir.",
        examples: [
          { de: "Ich weiß, dass er heute nicht kommen kann.", tr: "Bugün gelemeyeceğini biliyorum.", note: "kommen kann: modal en sonda" },
          { de: "Sie sagt, dass sie mich um acht abholt.", tr: "Beni sekizde alacağını söylüyor.", note: "ab + holt birleşti" },
          { de: "Weil wir umgezogen sind, ist die Adresse neu.", tr: "Taşındığımız için adres yeni.", note: "Perfekt'te yardımcı fiil sonda" },
        ],
      },
      {
        heading: "Yan cümle başa gelirse",
        tr: "Yan cümle önce gelirse, tamamı birinci öğe sayılır: ana cümlenin fiili hemen virgülden sonra gelir ve özne fiilin arkasına düşer. Kısaca: fiil, virgül, fiil.",
        examples: [
          { de: "Weil ich krank war, bin ich zu Hause geblieben.", tr: "Hasta olduğum için evde kaldım.", note: "war, bin — iki fiil yan yana" },
          { de: "Wenn du Zeit hast, ruf mich an.", tr: "Vaktin olursa beni ara." },
        ],
      },
    ],
    questions: [
      {
        text: "Ich bleibe heute zu Hause, weil ich krank ___.",
        options: ["bin", "bin nicht", "war bin"],
        answer: 0,
        explain: "„weil“ yan cümle kurar, çekimli fiil sona gider: … weil ich krank bin.",
      },
      {
        text: "Hangi cümle doğru?",
        options: [
          "Ich glaube, dass er morgen kommt.",
          "Ich glaube, dass kommt er morgen.",
          "Ich glaube, dass er kommt morgen.",
        ],
        answer: 0,
        explain: "„dass“dan sonra sıra özne + tümleçler + çekimli fiil: dass er morgen kommt.",
      },
      {
        text: "Wenn ich Zeit habe, ___ ich dich.",
        options: ["besuche", "ich besuche", "besuchen"],
        answer: 0,
        explain: "Yan cümle başta olduğu için ana cümlede önce fiil gelir: Wenn …, besuche ich dich.",
      },
      {
        kind: "gapfill",
        text: "Ich weiß, dass sie heute nicht kommen ___. (können)",
        options: [],
        answer: 0,
        accept: ["kann"],
        explain: "Modal fiil çekimlidir, o yüzden en sonda: … nicht kommen kann.",
      },
      {
        kind: "gapfill",
        text: "Sie hat gesagt, dass sie mich um acht ___. (abholen)",
        options: [],
        answer: 0,
        accept: ["abholt"],
        explain: "Ayrılabilen fiil yan cümlede birleşir ve sonda çekimlenir: abholt.",
      },
      {
        kind: "gapfill",
        text: "___ wir umgezogen sind, ist die Adresse neu. (sebep bağlacı)",
        options: [],
        answer: 0,
        accept: ["Weil", "weil", "Da", "da"],
        explain: "Sebep bağlacı „weil“ (resmî yazıda „da“); yan cümle başta olduğu için ana cümle „ist“ ile başlıyor.",
      },
      {
        kind: "order",
        text: "Yan cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["weil", "ich", "morgen", "arbeiten", "muss"],
        explain: "Bağlaç, özne, tümleç, mastar, çekimli modal: weil ich morgen arbeiten muss.",
      },
      {
        kind: "truefalse",
        text: "„Ich komme nicht, weil ich habe keine Zeit.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„habe“ sona gitmeli: … weil ich keine Zeit habe.",
      },
      {
        kind: "truefalse",
        text: "„Wenn du willst, können wir zusammen lernen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Yan cümlede „willst“ sonda, ana cümle fiille başlıyor: iki kural da tutuyor.",
      },
      {
        text: "Yan cümle cümlenin başında durursa ana cümlede ne olur?",
        options: [
          "Önce fiil, sonra özne gelir.",
          "Sıra değişmez, özne başta kalır.",
          "Ana cümlede de fiil sona gider.",
        ],
        answer: 0,
        explain: "Yan cümle birinci öğedir; ikinci sıra fiilindir, özne fiilin arkasına düşer: Weil ich krank war, bin ich zu Hause geblieben.",
      },
    ],
  },
];
