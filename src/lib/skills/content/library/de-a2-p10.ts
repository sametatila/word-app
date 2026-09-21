import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 10.
 *
 * A2 hücresini ONA tamamlayan son parti. Kurallar ve emsal: `de-a2.ts`
 * (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 10 mahalle ve çevre hattı: yönetimden gelen mektup, tamir atölyesinde
 * konuşma, dernek bülteni için haber. Söyleyiş odağı cümle vurgusu; dil
 * bilgisi „wenn“ ile „als“ — Türkçede tek karşılığı olan iki ayrı bağlaç.
 */
export const deA2P10: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r10",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Information zur Heizkostenabrechnung",
    genre: "letter",
    intro: "Apartman yönetiminden gelen bir mektup: neden fark çıktı, ne zaman ödenecek, itiraz nasıl yapılır.",
    gloss: [
      { de: "die Abrechnung", tr: "hesap dökümü", en: "statement" },
      { de: "die Heizung", tr: "kalorifer", en: "heating" },
      { de: "die Nachzahlung", tr: "ek ödeme", en: "additional payment" },
      { de: "der Verbrauch", tr: "tüketim", en: "consumption" },
      { de: "überweisen", tr: "havale etmek", en: "to transfer" },
      { de: "der Widerspruch", tr: "itiraz", en: "objection" },
    ],
    minutes: 5,
    text:
      "Sehr geehrte Mieterinnen und Mieter,\n\n" +
      "anbei erhalten Sie die Abrechnung für die Heizung vom letzten Jahr.\n\n" +
      "Viele von Ihnen bekommen dieses Mal eine Nachzahlung. Das liegt nicht an einem Fehler: " +
      "Der Preis für Gas ist im Winter stark gestiegen. Ihr Verbrauch ist im Schnitt sogar " +
      "etwas niedriger als im Vorjahr.\n\n" +
      "Bitte überweisen Sie den Betrag bis zum 30. April. Wenn Sie den Betrag nicht auf einmal " +
      "zahlen können, melden Sie sich bei uns. Wir finden dann eine Lösung in drei Raten.\n\n" +
      "Sie haben das Recht, die Abrechnung zu prüfen. Einen Widerspruch können Sie bis zum " +
      "31. Mai schriftlich einreichen. Die Unterlagen liegen im Büro und Sie können sie nach " +
      "Absprache ansehen.\n\n" +
      "Ein Tipp für den nächsten Winter: Stellen Sie die Heizung nachts nicht ganz aus. " +
      "Ein kaltes Zimmer wieder warm zu machen kostet mehr Energie.\n\n" +
      "Mit freundlichen Grüßen\nHausverwaltung Sonnenhof",
    questions: [
      {
        text: "Warum müssen viele Mieter nachzahlen?",
        options: [
          "Sie haben mehr geheizt als früher.",
          "Der Gaspreis ist stark gestiegen.",
          "Die Verwaltung hat einen Fehler gemacht.",
        ],
        answer: 1,
        explain: "Metin hatayı açıkça eliyor: tüketim düşmüş, gaz fiyatı yükselmiş.",
      },
      {
        text: "Was kann man machen, wenn man nicht alles auf einmal zahlen kann?",
        options: [
          "sich bei der Verwaltung melden",
          "einen Widerspruch einreichen",
          "die Heizung abstellen",
        ],
        answer: 0,
        explain: "„melden Sie sich bei uns. Wir finden dann eine Lösung in drei Raten.“",
      },
      {
        kind: "truefalse",
        text: "Der Verbrauch der Mieter ist gestiegen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Ihr Verbrauch ist im Schnitt sogar etwas niedriger als im Vorjahr.“",
      },
      {
        kind: "gapfill",
        text: "Der Betrag muss bis zum 30. ___ überwiesen werden.",
        options: [],
        answer: 0,
        accept: ["April"],
        explain: "„Bitte überweisen Sie den Betrag bis zum 30. April.“",
      },
      {
        kind: "short_answer",
        text: "Bis wann kann man Widerspruch einreichen?",
        options: [],
        answer: 0,
        accept: ["bis zum 31. Mai", "31. Mai", "bis 31. Mai"],
        explain: "„Einen Widerspruch können Sie bis zum 31. Mai schriftlich einreichen.“",
      },
      {
        text: "Was rät die Verwaltung für den Winter?",
        options: [
          "die Heizung nachts ganz auszumachen",
          "die Heizung nachts nicht ganz auszumachen",
          "die Fenster nachts offen zu lassen",
        ],
        answer: 1,
        explain: "Soğuyan odayı yeniden ısıtmak daha çok enerji tüketiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l10",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "In der Reparaturwerkstatt",
    genre: "dialogue",
    intro: "Bozulan bir cihaz atölyeye götürülüyor: sorun ne, tamir mi daha ucuz yoksa yenisi mi.",
    gloss: [
      { de: "die Pumpe", tr: "pompa", en: "pump" },
      { de: "reparieren", tr: "tamir etmek", en: "to repair" },
      { de: "das Ersatzteil", tr: "yedek parça", en: "spare part" },
      { de: "die Garantie", tr: "garanti", en: "warranty" },
      { de: "der Kostenvoranschlag", tr: "fiyat teklifi", en: "cost estimate" },
      { de: "sich lohnen", tr: "değmek", en: "to be worth it" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Tekin", text: "Guten Tag. Meine Kaffeemaschine macht kein heißes Wasser mehr. Können Sie das reparieren?" },
      { speaker: "Herr Vogt", text: "Guten Tag. Wie alt ist das Gerät denn?" },
      { speaker: "Frau Tekin", text: "Vier Jahre. Die Garantie ist leider seit zwei Jahren vorbei." },
      { speaker: "Herr Vogt", text: "Das ist meistens die Pumpe. Ein Ersatzteil kostet etwa dreißig Euro, dazu kommt eine Stunde Arbeit." },
      { speaker: "Frau Tekin", text: "Und was kostet eine Stunde bei Ihnen?" },
      { speaker: "Herr Vogt", text: "Fünfundvierzig Euro. Wenn es nur die Pumpe ist, sind Sie bei etwa fünfundsiebzig Euro." },
      { speaker: "Frau Tekin", text: "Eine neue Maschine kostet hundertdreißig. Lohnt sich die Reparatur?" },
      { speaker: "Herr Vogt", text: "Ich finde ja. Das Gehäuse und der Motor sind gut, die halten noch Jahre." },
      { speaker: "Frau Tekin", text: "Gut, machen Sie bitte einen Kostenvoranschlag. Wann kann ich sie abholen?" },
      { speaker: "Herr Vogt", text: "Ich rufe Sie morgen an. Wenn das Teil da ist, ist sie am Freitag fertig." },
    ],
    questions: [
      {
        text: "Was ist das Problem mit der Maschine?",
        options: ["Sie macht kein heißes Wasser.", "Sie ist zu laut.", "Sie hat keinen Strom."],
        answer: 0,
        explain: "İlk cümle: „macht kein heißes Wasser mehr“.",
      },
      {
        text: "Warum hilft die Garantie nicht?",
        options: [
          "Die Maschine war ein Geschenk.",
          "Die Garantie ist seit zwei Jahren vorbei.",
          "Der Kassenbon fehlt.",
        ],
        answer: 1,
        explain: "Cihaz dört yaşında, garanti iki yıl önce bitmiş.",
      },
      {
        kind: "truefalse",
        text: "Herr Vogt rät zu einer neuen Maschine.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Ich finde ja“ — tamire değer diyor, gövde ve motor sağlam.",
      },
      {
        kind: "gapfill",
        text: "Eine Stunde Arbeit kostet ___ Euro.",
        options: [],
        answer: 0,
        accept: ["fünfundvierzig", "45"],
        explain: "„Fünfundvierzig Euro.“",
      },
      {
        kind: "short_answer",
        text: "Was kostet die Reparatur ungefähr insgesamt?",
        options: [],
        answer: 0,
        accept: ["fünfundsiebzig Euro", "75 Euro", "etwa fünfundsiebzig Euro"],
        explain: "Otuz euroluk parça artı kırk beş euroluk işçilik: „etwa fünfundsiebzig Euro“.",
      },
      {
        text: "Wann ist die Maschine fertig?",
        options: ["morgen", "am Freitag, wenn das Teil da ist", "in zwei Wochen"],
        answer: 1,
        explain: "„Wenn das Teil da ist, ist sie am Freitag fertig“; yarın yalnız telefon edecek.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w10",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Bericht vom Nachbarschaftsfest",
    genre: "report",
    intro: "Mahalle şenliğini dernek bülteni için anlatıyorsun: önce iki cümle kur, sonra kısa bir haber yaz.",
    gloss: [
      { de: "das Fest", tr: "şenlik", en: "festival" },
      { de: "der Besucher", tr: "ziyaretçi", en: "visitor" },
      { de: "aufbauen", tr: "kurmak", en: "to set up" },
      { de: "der Erlös", tr: "gelir", en: "proceeds" },
      { de: "sich bedanken", tr: "teşekkür etmek", en: "to say thank you" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Yaklaşık iki yüz kişi geldi.",
        answer: "Ungefähr zweihundert Leute sind gekommen.",
        alternatives: ["Es sind ungefähr zweihundert Leute gekommen."],
        hint: "„kommen“ hareket bildirir: Perfekt'i „sein“ ile kurulur.",
      },
      {
        kind: "build",
        tr: "Hava kötü olduğu için çadır kurduk.",
        answer: "Wir haben ein Zelt aufgebaut, weil das Wetter schlecht war.",
        alternatives: ["Weil das Wetter schlecht war, haben wir ein Zelt aufgebaut."],
        hint: "Ayrılabilen fiilin Partizip'i ge- ortaya alır: aufgebaut. „weil“ cümlesinde fiil sonda.",
      },
      {
        kind: "free",
        prompt:
          "Dernek bülteni için mahalle şenliğini anlat: ne zaman ve nerede olduğunu yaz, kaç kişi geldiğini ve neler yapıldığını söyle, bir aksaklıktan söz et, gelirin nereye gittiğini yaz ve yardım edenlere teşekkür et.",
        checklist: [
          "Ne zaman ve nerede olduğunu yaz",
          "Kaç kişi geldiğini ve neler olduğunu anlat",
          "Bir aksaklığı ve nasıl çözüldüğünü yaz",
          "Gelirin nereye gittiğini yaz ve teşekkür et",
        ],
        minWords: 55,
        phrases: [
          { de: "Am … fand unser Fest statt.", tr: "Şenliğimiz … günü yapıldı.", en: "Our festival took place on …" },
          { de: "Es kamen ungefähr … Besucher.", tr: "Yaklaşık … ziyaretçi geldi.", en: "About … visitors came." },
          { de: "Besonders beliebt war …", tr: "Özellikle … çok sevildi", en: "Especially popular was …" },
          { de: "Leider hat … nicht funktioniert.", tr: "Maalesef … çalışmadı", en: "Unfortunately … did not work." },
          { de: "Wir bedanken uns bei allen Helfern.", tr: "Bütün yardımcılara teşekkür ederiz.", en: "We thank all the helpers." },
        ],
        sample:
          "Am letzten Samstag fand unser Nachbarschaftsfest im Hof der Lindenstraße statt. " +
          "Es kamen ungefähr zweihundert Besucher, vom Kleinkind bis zur Nachbarin mit neunzig Jahren. " +
          "Besonders beliebt war der Kuchentisch: Nach zwei Stunden war nichts mehr da. " +
          "Leider hat die Musikanlage am Anfang nicht funktioniert, aber ein Nachbar hat schnell " +
          "seine eigene Box geholt. Weil das Wetter schlecht war, haben wir am Morgen noch ein Zelt aufgebaut. " +
          "Der Erlös von dreihundert Euro geht an den Spielplatz. " +
          "Wir bedanken uns bei allen Helfern und freuen uns schon auf das nächste Jahr.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s10",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Was betont man im Satz?",
    genre: "pronounce",
    intro: "Aynı cümlede vurguyu kaydırmak anlamı değiştirir; altı cümlede vurguyu doğru yere koy.",
    gloss: [
      { de: "betonen", tr: "vurgulamak", en: "to stress" },
      { de: "morgen", tr: "yarın", en: "tomorrow" },
      { de: "der Dienstag", tr: "salı", en: "Tuesday" },
      { de: "die Antwort", tr: "cevap", en: "answer" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ich komme morgen, nicht heute.",
        tr: "Yarın geliyorum, bugün değil.",
        hint: "Karşıtlık varsa vurgu karşılaştırılan sözcüğe gider: MORgen ve HEUte güçlü, geri kalanı zayıf.",
        confusions: [
          {
            heard: ["ICH komme morgen, nicht heute"],
            fix: "Burada kişi değil GÜN karşılaştırılıyor; özneyi vurgulamak yanlış bilgi verir.",
            expected: "morgen",
          },
        ],
      },
      {
        de: "Ich komme, nicht mein Bruder.",
        tr: "Ben geliyorum, kardeşim değil.",
        hint: "Şimdi kişi karşılaştırılıyor: İH ve BRUU-der vurgulu.",
        confusions: [
          {
            heard: ["Ich KOMme, nicht mein Bruder"],
            fix: "Fiili vurgulamak „geliyorum ama başka şey yapmıyorum“ demek olur; karşıtlık kişide.",
            expected: "Ich",
          },
        ],
      },
      {
        de: "Der Kurs beginnt am Dienstag.",
        tr: "Kurs salı günü başlıyor.",
        hint: "Yeni bilgi cümlenin sonunda: DİİNS-taag en güçlü. Almancada yeni bilgi genelde sona konur.",
        confusions: [
          {
            heard: ["Der KURS beginnt am Dienstag"],
            fix: "Kursun ne olduğu zaten biliniyorsa vurgu yeni bilgiye, yani güne gider.",
            expected: "Dienstag",
          },
        ],
      },
      {
        de: "Das habe ich nicht gesagt.",
        tr: "Ben bunu söylemedim.",
        hint: "Olumsuzlama vurgulu: NİHT güçlü söylenir, gerisi düz.",
        confusions: [
          {
            heard: ["Das habe ICH nicht gesagt"],
            fix: "Özneyi vurgularsan „başkası söylemiş olabilir“ anlamı çıkar; burada eylem yalanlanıyor.",
            expected: "nicht",
          },
        ],
      },
      {
        de: "Können Sie das bitte wiederholen?",
        tr: "Bunu tekrar edebilir misiniz?",
        hint: "Uzun kelimenin kendi vurgusu da var: wie-der-HOO-len, üçüncü hecede.",
        confusions: [
          {
            heard: ["Können Sie das bitte WIEderholen"],
            fix: "Ayrılmayan wieder- ön eki vurgusuzdur; vurgu köke düşer.",
            expected: "wiederholen",
          },
        ],
      },
      {
        de: "Die Antwort war richtig, aber zu kurz.",
        tr: "Cevap doğruydu ama fazla kısaydı.",
        hint: "„aber“ öncesi ve sonrası iki vurgu taşır: RİH-tih ve KURTS.",
        confusions: [
          {
            heard: ["Die ANTwort war richtig, aber zu kurz"],
            fix: "Karşıtlık iki sıfat arasında; vurgu onlara gider, özneye değil.",
            expected: "kurz",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g10",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "wenn oder als?",
    genre: "grammar",
    intro: "Türkçede ikisi de „-dığında“ diye çevrilir; Almancada hangisinin seçileceğini zaman belirler.",
    focus: "Zaman yan cümleleri: wenn, als ve tekrar eden olaylar",
    gloss: [
      { de: "das Kind", tr: "çocuk", en: "child" },
      { de: "umziehen", tr: "taşınmak", en: "to move house" },
      { de: "schwimmen", tr: "yüzmek", en: "to swim" },
      { de: "immer", tr: "her zaman", en: "always" },
      { de: "müde", tr: "yorgun", en: "tired" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "als: geçmişte BİR kez",
        tr: "Geçmişte bir kez olmuş, tek seferlik bir olay anlatılıyorsa „als“ kullanılır. Bu, Türkçede „…dığında“ ile çevrilir ama Almancada seçim zorunludur. Yan cümle olduğu için fiil sona gider.",
        examples: [
          { de: "Als ich sechs war, bin ich in die Schule gekommen.", tr: "Altı yaşındayken okula başladım.", note: "bir kez oldu" },
          { de: "Als wir umgezogen sind, hat es geregnet.", tr: "Taşındığımızda yağmur yağıyordu.", note: "tek bir gün" },
          { de: "Er hat gelacht, als er das Foto gesehen hat.", tr: "Fotoğrafı görünce güldü.", note: "tek bir an" },
        ],
      },
      {
        heading: "wenn: tekrar eden ya da gelecek",
        tr: "Geçmişte TEKRAR TEKRAR olan bir şey için ya da şimdiki ve gelecek zaman için „wenn“ kullanılır. Tekrarı belli etmek için genellikle „immer“ eklenir.",
        examples: [
          { de: "Immer wenn ich Zeit hatte, bin ich schwimmen gegangen.", tr: "Ne zaman vaktim olsa yüzmeye giderdim.", note: "geçmişte tekrar" },
          { de: "Wenn ich nach Hause komme, koche ich.", tr: "Eve gelince yemek yaparım.", note: "her seferinde" },
          { de: "Wenn das Wetter gut ist, fahren wir ans Meer.", tr: "Hava iyi olursa denize gideriz.", note: "gelecek" },
        ],
      },
      {
        heading: "Yan cümle önde durursa",
        tr: "Zaman cümlesi başa geçebilir. O zaman ana cümlenin çekimli fiili virgülden HEMEN sonra gelir ve özne arkaya düşer: fiil yine ikinci ögedir, çünkü birinci öge koca yan cümledir.",
        examples: [
          { de: "Wenn ich müde bin, trinke ich Tee.", tr: "Yorgun olduğumda çay içerim.", note: "fiil virgülden sonra" },
          { de: "Ich trinke Tee, wenn ich müde bin.", tr: "Yorgun olduğumda çay içerim.", note: "aynı anlam, ters sıra" },
          { de: "Als das Kind klein war, haben wir hier gewohnt.", tr: "Çocuk küçükken burada otururduk.", note: "als cümlesi başta" },
        ],
      },
    ],
    questions: [
      {
        text: "___ ich sechs war, bin ich in die Schule gekommen.",
        options: ["Wenn", "Als", "Wann"],
        answer: 1,
        explain: "Geçmişte bir kez olmuş bir olay: als.",
      },
      {
        text: "___ das Wetter gut ist, fahren wir ans Meer.",
        options: ["Wenn", "Als", "Wann"],
        answer: 0,
        explain: "Gelecek ve tekrar eden durum: wenn.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Wenn ich müde bin, ich trinke Tee.",
          "Wenn ich müde bin, trinke ich Tee.",
          "Wenn bin ich müde, trinke ich Tee.",
        ],
        answer: 1,
        explain: "Yan cümle başta olunca ana cümlenin fiili hemen virgülden sonra gelir.",
      },
      {
        kind: "gapfill",
        text: "Immer ___ ich Zeit hatte, bin ich schwimmen gegangen.",
        options: [],
        answer: 0,
        accept: ["wenn"],
        explain: "„immer“ tekrarı gösteriyor; geçmişte bile olsa wenn kullanılır.",
      },
      {
        kind: "gapfill",
        text: "___ wir umgezogen sind, hat es geregnet.",
        options: [],
        answer: 0,
        accept: ["Als", "als"],
        explain: "Taşınma geçmişte tek seferlik bir olay: als.",
      },
      {
        kind: "gapfill",
        text: "Wenn ich nach Hause ___, koche ich. (kommen)",
        options: [],
        answer: 0,
        accept: ["komme"],
        explain: "Yan cümlede çekimli fiil en sona gider: wenn ich nach Hause komme.",
      },
      {
        kind: "gapfill",
        text: "Er hat gelacht, als er das Foto gesehen ___. (haben)",
        options: [],
        answer: 0,
        accept: ["hat"],
        explain: "Perfekt yan cümlede: Partizip önce, çekimli yardımcı fiil en sonda.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Als", "das Kind", "klein", "war", "haben wir hier gewohnt"],
        explain: "Yan cümlede fiil sonda, sonra ana cümle fiille başlar: Als das Kind klein war, haben wir hier gewohnt.",
      },
      {
        kind: "truefalse",
        text: "„Wenn ich zehn Jahre alt war, sind wir nach Berlin gezogen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Geçmişte tek seferlik bir olay anlatılıyor; doğrusu „Als ich zehn Jahre alt war …“",
      },
      {
        kind: "truefalse",
        text: "„Wenn das Wetter gut ist, fahren wir ans Meer.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Gelecek ve tekrar eden durum wenn ister; ana cümlede fiil virgülden sonra.",
      },
    ],
  },
];
