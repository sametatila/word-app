import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 16.
 *
 * A2 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-a2.ts` (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 16 gönüllülük ve komşuluk hattı: ilkokulda okuma gönüllüsünün
 * portresi, mahalle temizlik gününde düzenleyicinin talimatları, yeni taşınan
 * komşuya hoş geldin notu. Söyleyiş odağı başta duran yan cümlenin ezgisi:
 * virgüle kadar ses askıda kalır, düşüş cümlenin sonunda gelir; dil bilgisi
 * asıl fiil olarak werden („olmak, -leşmek“, ist … geworden). Futur I'in
 * yardımcısı olarak werden B1'in konusu; burada bilerek dışarıda.
 */
export const deA2P16: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r16",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Jeden Mittwoch in der Klasse 2b",
    genre: "profile",
    intro: "Okul bülteninde bir portre: emekli bir kadın her hafta ilkokulda çocuklarla kitap okuyor.",
    gloss: [
      { de: "die Grundschule", tr: "ilkokul", en: "primary school" },
      { de: "vorlesen", tr: "yüksek sesle okumak", en: "to read aloud" },
      { de: "die Silbe", tr: "hece", en: "syllable" },
      { de: "klatschen", tr: "alkışlamak", en: "to clap" },
      { de: "die Geduld", tr: "sabır", en: "patience" },
      { de: "die Ausbildung", tr: "meslek eğitimi", en: "training" },
    ],
    minutes: 5,
    text:
      "Jeden Mittwoch um halb neun sitzt Ingrid Maurer in einem kleinen Raum der Lindengrundschule. " +
      "Vor ihr liegen drei Bücher, neben ihr sitzt Emir, acht Jahre alt.\n\n" +
      "Ingrid ist 67 und hatte früher eine Buchhandlung. Seit zwei Jahren ist sie Lesepatin. " +
      "Das heißt: Sie liest mit Kindern aus der Grundschule. Viele von ihnen bekommen zu Hause " +
      "wenig Hilfe beim Lesen.\n\n" +
      "Jedes Kind kommt für zwanzig Minuten zu ihr. Zuerst liest Ingrid eine Seite vor, dann liest das Kind. " +
      "Wenn ein Wort schwer ist, klatschen die beiden zusammen die Silben.\n\n" +
      "„Am Anfang wollte Emir gar nicht lesen“, erzählt sie. „Er hat nur aus dem Fenster geschaut. " +
      "Dann habe ich ein Buch über Fußball mitgebracht. Jetzt fragt er jede Woche: Haben Sie das nächste?“\n\n" +
      "Die Schule sucht noch fünf Lesepaten. Man braucht keine Ausbildung, nur Zeit und Geduld. " +
      "Bei Interesse melden Sie sich bitte bei Frau Ekinci im Sekretariat.",
    questions: [
      {
        text: "Was hat Ingrid früher gemacht?",
        options: ["Sie war Lehrerin.", "Sie hat Bücher verkauft.", "Sie hat in einer Bibliothek gearbeitet."],
        answer: 1,
        explain: "„hatte früher eine Buchhandlung“ — yani kitap satıyordu.",
      },
      {
        text: "Was machen Ingrid und das Kind bei schweren Wörtern?",
        options: ["Sie schreiben sie auf.", "Sie suchen sie im Wörterbuch.", "Sie klatschen die Silben."],
        answer: 2,
        explain: "„Wenn ein Wort schwer ist, klatschen die beiden zusammen die Silben.“",
      },
      {
        kind: "truefalse",
        text: "Emir wollte am Anfang gern lesen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Am Anfang wollte Emir gar nicht lesen“ — yalnız pencereden bakıyormuş.",
      },
      {
        kind: "gapfill",
        text: "Jedes Kind bleibt ___ Minuten bei Ingrid.",
        options: [],
        answer: 0,
        accept: ["zwanzig", "20"],
        explain: "„Jedes Kind kommt für zwanzig Minuten zu ihr.“",
      },
      {
        kind: "short_answer",
        text: "Was hat Ingrid für Emir mitgebracht?",
        options: [],
        answer: 0,
        accept: ["ein Buch über Fußball", "Buch über Fußball", "ein Fußballbuch"],
        explain: "„Dann habe ich ein Buch über Fußball mitgebracht.“",
      },
      {
        text: "Was braucht man als Lesepate?",
        options: ["Zeit und Geduld", "eine Ausbildung", "eigene Kinder"],
        answer: 0,
        explain: "„Man braucht keine Ausbildung, nur Zeit und Geduld.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l16",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Stadtputz am Samstag",
    genre: "monologue",
    intro: "Mahalle temizlik günü başlıyor: düzenleyici grupları, malzemeyi, güvenlik kuralını ve öğlen buluşmasını anlatıyor.",
    gloss: [
      { de: "der Handschuh", tr: "eldiven", en: "glove" },
      { de: "der Sack", tr: "torba", en: "bag" },
      { de: "die Zange", tr: "maşa", en: "tongs" },
      { de: "der Fluss", tr: "nehir", en: "river" },
      { de: "kaputt", tr: "kırık", en: "broken" },
      { de: "das Getränk", tr: "içecek", en: "drink" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Herr Brandl", text: "Guten Morgen und danke, dass ihr so früh gekommen seid! Wir sind heute über vierzig Leute, super." },
      { speaker: "Herr Brandl", text: "Wir machen vier Gruppen. Gruppe eins geht zum Spielplatz, Gruppe zwei zum Ufer am Fluss." },
      { speaker: "Herr Brandl", text: "Gruppe drei macht den Park, und Gruppe vier bleibt hier am Bahnhof. Hier liegt leider am meisten." },
      { speaker: "Herr Brandl", text: "Jeder bekommt Handschuhe und einen Sack. Glas kommt in die blauen Säcke, alles andere in die grauen." },
      { speaker: "Herr Brandl", text: "Ganz wichtig: Fasst kaputtes Glas nicht mit der Hand an, nehmt dafür die Zange." },
      { speaker: "Herr Brandl", text: "Um zwölf treffen wir uns wieder hier. Dann gibt es Suppe und Getränke, das bezahlt die Stadt." },
      { speaker: "Herr Brandl", text: "Und bitte macht Fotos! Die schönsten kommen nächste Woche in die Zeitung." },
    ],
    questions: [
      {
        text: "Wie viele Leute sind gekommen?",
        options: ["ungefähr zwanzig", "genau vier", "über vierzig"],
        answer: 2,
        explain: "„Wir sind heute über vierzig Leute.“ Dört, grupların sayısı.",
      },
      {
        text: "Wohin geht Gruppe zwei?",
        options: ["zum Ufer am Fluss", "zum Spielplatz", "zum Bahnhof"],
        answer: 0,
        explain: "„Gruppe zwei zum Ufer am Fluss.“",
      },
      {
        kind: "truefalse",
        text: "Glas kommt in die blauen Säcke.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Glas kommt in die blauen Säcke, alles andere in die grauen.“",
      },
      {
        kind: "gapfill",
        text: "Um ___ Uhr treffen sich alle wieder am Bahnhof.",
        options: [],
        answer: 0,
        accept: ["zwölf", "12"],
        explain: "„Um zwölf treffen wir uns wieder hier.“",
      },
      {
        kind: "short_answer",
        text: "Was bezahlt die Stadt?",
        options: [],
        answer: 0,
        accept: ["Suppe und Getränke", "die Suppe und die Getränke", "das Essen"],
        explain: "„Dann gibt es Suppe und Getränke, das bezahlt die Stadt.“",
      },
      {
        text: "Wie soll man kaputtes Glas aufheben?",
        options: ["mit der Hand", "mit der Zange", "gar nicht"],
        answer: 1,
        explain: "„Fasst kaputtes Glas nicht mit der Hand an, nehmt dafür die Zange.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w16",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Willkommen im Haus!",
    genre: "message",
    intro: "Binana yeni biri taşındı: önce iki cümle kur, sonra kapısına bırakacağın kısa bir hoş geldin notu yaz.",
    gloss: [
      { de: "die Müllabfuhr", tr: "çöp toplama", en: "garbage collection" },
      { de: "der Keller", tr: "bodrum", en: "basement" },
      { de: "der Hof", tr: "avlu", en: "courtyard" },
      { de: "klingeln", tr: "zil çalmak", en: "to ring the bell" },
      { de: "der Karton", tr: "karton kutu", en: "cardboard box" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bir şeye ihtiyacın olursa zilimi çal.",
        answer: "Wenn du etwas brauchst, klingle einfach bei mir.",
        alternatives: ["Klingle einfach bei mir, wenn du etwas brauchst."],
        hint: "„wenn“ cümlesinde fiil sona gider; ardından du'ya emir kipi gelir: klingle (mastarı klingeln).",
      },
      {
        kind: "build",
        tr: "Çöp her salı toplanıyor.",
        answer: "Die Müllabfuhr kommt jeden Dienstag.",
        alternatives: ["Jeden Dienstag kommt die Müllabfuhr."],
        hint: "Almancada burada edilgen gerekmez: „çöp toplama geliyor“ denir. Zaman başa gelirse fiil yine ikinci sırada.",
      },
      {
        kind: "free",
        prompt:
          "Apartmanına yeni biri taşındı. Kapısına kısa bir hoş geldin notu bırak: kendini tanıt ve kaçıncı katta oturduğunu söyle, binayla ilgili iki pratik bilgi ver (çöp, çamaşır makinesi, bisiklet yeri gibi), yardım teklif et ve onu bir kahveye davet et.",
        checklist: [
          "Kendini tanıt ve nerede oturduğunu söyle",
          "Binayla ilgili iki pratik bilgi ver",
          "Yardım teklif et",
          "Bir kahveye davet et",
        ],
        minWords: 50,
        phrases: [
          { de: "Herzlich willkommen im Haus!", tr: "Binaya hoş geldin!", en: "Welcome to the building!" },
          { de: "Ich wohne im … Stock.", tr: "… katta oturuyorum.", en: "I live on the … floor." },
          { de: "Die Müllabfuhr kommt jeden …", tr: "Çöp her … günü toplanıyor.", en: "The rubbish is collected every …" },
          { de: "Wenn du etwas brauchst, …", tr: "Bir şeye ihtiyacın olursa …", en: "If you need anything, …" },
          { de: "Hast du am … Zeit für einen Kaffee?", tr: "… günü bir kahveye vaktin var mı?", en: "Do you have time for a coffee on …?" },
        ],
        sample:
          "Hallo und herzlich willkommen im Haus!\n\n" +
          "Ich heiße Aylin und wohne im zweiten Stock, direkt über dir. Ich habe gestern die vielen Kartons gesehen " +
          "und möchte dir ein paar Tipps geben. Die Müllabfuhr kommt jeden Dienstag, die Tonnen stehen im Hof links. " +
          "Die Waschmaschinen sind im Keller, an der Tür hängt eine Liste für die Termine. " +
          "Fahrräder dürfen nicht im Flur stehen, aber hinter dem Haus gibt es einen Raum dafür. " +
          "Wenn du etwas brauchst, klingle einfach bei mir, ich habe auch eine Leiter. " +
          "Hast du am Samstag Zeit für einen Kaffee? Ich freue mich!\n\n" +
          "Viele Grüße\nAylin",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s16",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Wenn …, dann: die Stimme bleibt oben",
    genre: "pronounce",
    intro: "Yan cümle başta durursa virgüle kadar ses inmez, askıda kalır; asıl düşüş cümlenin en sonunda gelir. Altı cümlede bu ezgiyi kur.",
    gloss: [
      { de: "regnen", tr: "yağmur yağmak", en: "to rain" },
      { de: "müde", tr: "yorgun", en: "tired" },
      { de: "klein", tr: "küçük", en: "small" },
      { de: "vorbei", tr: "bitmiş", en: "over" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Wenn es regnet, bleibe ich zu Hause.",
        tr: "Yağmur yağarsa evde kalırım.",
        hint: "„Wenn es REG-net →“ virgülde ses yukarıda bekler; „bleibe ich zu HAU-se ↘“ sonda iner.",
        confusions: [
          {
            heard: [],
            fix: "Virgülde sesi düşürürsen dinleyen cümle bitti sanır; yan cümlenin sonunu askıda bırak.",
            expected: "regnet",
          },
        ],
      },
      {
        de: "Weil ich müde war, bin ich früh gegangen.",
        tr: "Yorgun olduğum için erken gittim.",
        hint: "„Weil ich MÜ-de war →“ askıda; ardından küçük bir durak, sonra „bin ich früh ge-GAN-gen ↘“.",
        confusions: [
          {
            heard: [],
            fix: "İki parçayı tek düz çizgide okuma; birinci parça yukarıda, ikinci aşağıda biter.",
            expected: "müde",
          },
        ],
      },
      {
        de: "Als ich klein war, hatten wir einen Hund.",
        tr: "Ben küçükken bir köpeğimiz vardı.",
        hint: "„Als ich KLEIN war →“ ses taşınır; „hatten wir einen HUND ↘“ cümleyi kapatır.",
        confusions: [
          {
            heard: [],
            fix: "Virgülde uzun bir sessizlik değil, kısa bir durak yeter; ses yine de yukarıda kalır.",
            expected: "klein",
          },
        ],
      },
      {
        de: "Wenn du Zeit hast, ruf mich an.",
        tr: "Vaktin olursa beni ara.",
        hint: "„Wenn du ZEIT hast →“ askıda; emir kısmı „ruf mich AN ↘“ kısa ve inerek biter.",
        confusions: [
          {
            heard: [],
            fix: "Emir kısmını soru gibi yükseltme; yükselme yalnız virgülden önceki parçada.",
            expected: "Zeit",
          },
        ],
      },
      {
        de: "Wenn der Kurs vorbei ist, gehen wir essen.",
        tr: "Kurs bitince yemeğe gidiyoruz.",
        hint: "„Wenn der Kurs vor-BEI ist →“ askıda; „gehen wir ES-sen ↘“ sonda iner.",
        confusions: [
          {
            heard: [],
            fix: "Uzun yan cümlede ses ortada kaybolmasın; en yüksek nokta vorbei'de, virgüle kadar orada kalır.",
            expected: "vorbei",
          },
        ],
      },
      {
        de: "Ich bleibe zu Hause, wenn es regnet.",
        tr: "Yağmur yağarsa evde kalırım.",
        hint: "Ters sıra: „Ich bleibe zu HAU-se →“ virgülde hafifçe askıda, „wenn es REG-net ↘“ en sonda iner.",
        confusions: [
          {
            heard: [],
            fix: "Ana cümle önde olsa da virgülde ses tamamen inmez; son düşüş cümlenin en sonunda.",
            expected: "Hause",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g16",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "Es wird kalt",
    genre: "grammar",
    intro: "werden tek başına bir değişimi anlatır: hava soğur, fiyatlar artar, biri doktor olur, çocuk on yaşına girer.",
    focus: "werden asıl fiil olarak: „olmak, -leşmek“ ve geçmişte ist … geworden",
    gloss: [
      { de: "werden", tr: "olmak", en: "to become" },
      { de: "bestimmt", tr: "kesinlikle", en: "definitely" },
      { de: "dunkel", tr: "karanlık", en: "dark" },
      { de: "teuer", tr: "pahalı", en: "expensive" },
      { de: "der Vater", tr: "baba", en: "father" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "werden = olmak, -leşmek",
        tr: "sein bir durumu, werden ise bir DEĞİŞİMİ anlatır: „soğuk“ ile „soğuyor“ arasındaki fark. Çekimi düzensizdir: ich werde, du wirst, er wird, wir werden, ihr werdet, sie werden.",
        examples: [
          { de: "Im November wird es früh dunkel.", tr: "Kasımda hava erken kararır.", note: "es wird" },
          { de: "Du wirst ja ganz rot!", tr: "Kıpkırmızı oldun!", note: "du wirst" },
          { de: "Ihr werdet immer größer.", tr: "Gittikçe büyüyorsunuz.", note: "ihr werdet" },
        ],
      },
      {
        heading: "Ne olunur? Sıfat, meslek, yaş",
        tr: "werden'den sonra bir sıfat (kalt, teurer), bir meslek ya da bir yaş gelir. Meslekte artikel kullanılmaz: „Sie wird Ärztin“, „eine Ärztin“ değil; meslek bir sıfatla nitelenirse artikel gelir: „eine gute Ärztin“. Karşılaştırma ekiyle birlikte „gittikçe“ anlamı çıkar.",
        examples: [
          { de: "Die Wohnungen werden immer teurer.", tr: "Daireler gittikçe pahalanıyor.", note: "werden + Komparativ" },
          { de: "Meine Tochter will Ärztin werden.", tr: "Kızım doktor olmak istiyor.", note: "meslek, artikel yok" },
          { de: "Mein Sohn wird im Mai zehn.", tr: "Oğlum mayısta on yaşına giriyor.", note: "yaş" },
        ],
      },
      {
        heading: "Geçmişte: ist … geworden",
        tr: "werden'in Perfekt'i sein ile kurulur, ortaç geworden'dir: „Er ist Vater geworden.“ Yazıda Präteritum wurde de sık görülür. Dikkat: werden bir mastarla gelirse gelecek zaman kurar; bu ayrı bir konu ve burada işlenmiyor.",
        examples: [
          { de: "Er ist letztes Jahr Vater geworden.", tr: "Geçen yıl baba oldu.", note: "sein + geworden" },
          { de: "Es ist plötzlich kalt geworden.", tr: "Hava birden soğudu.", note: "değişim geçmişte" },
          { de: "Als Kind wurde ich im Auto immer krank.", tr: "Çocukken arabada hep hastalanırdım.", note: "Präteritum: wurde" },
        ],
      },
    ],
    questions: [
      {
        text: "Du ___ bestimmt eine gute Lehrerin.",
        options: ["werde", "werdet", "wirst"],
        answer: 2,
        explain: "du ile werden'in biçimi wirst'tir.",
      },
      {
        text: "Im Herbst ___ die Tage kürzer.",
        options: ["werden", "wird", "werdet"],
        answer: 0,
        explain: "Özne „die Tage“ çoğul: werden.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Er hat letztes Jahr Vater geworden.",
          "Er ist letztes Jahr Vater geworden.",
          "Er ist letztes Jahr Vater gewordet.",
        ],
        answer: 1,
        explain: "werden'in Perfekt'i sein ile, ortacı geworden.",
      },
      {
        kind: "gapfill",
        text: "Mein Sohn ___ im Mai zehn Jahre alt. (werden)",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "er ile werden'in biçimi wird; yaş değişimi anlatılıyor.",
      },
      {
        kind: "gapfill",
        text: "Die Wohnungen ___ immer teurer. (werden)",
        options: [],
        answer: 0,
        accept: ["werden"],
        explain: "Çoğul özne ve bir değişim: werden + teurer, „gittikçe pahalanıyor“.",
      },
      {
        kind: "gapfill",
        text: "Ihr ___ ja ganz rot! Ist euch kalt? (werden)",
        options: [],
        answer: 0,
        accept: ["werdet"],
        explain: "ihr ile werden'in biçimi werdet'tir.",
      },
      {
        kind: "gapfill",
        text: "Meine Schwester ist letztes Jahr Mutter ___. (werden)",
        options: [],
        answer: 0,
        accept: ["geworden"],
        explain: "Perfekt: ist … geworden, ortaç en sonda.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Mit dem Kurs", "wird", "mein Deutsch", "immer", "besser"],
        explain: "werden ikinci sırada; değişimi anlatan sıfat (besser) en sonda.",
      },
      {
        kind: "truefalse",
        text: "„Im Winter wird es früh dunkel.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "werden burada „olmak“ anlamında bir değişim: es wird dunkel. Cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Sie will eine Ärztin werden.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Meslekte artikel kullanılmaz: „Sie will Ärztin werden.“",
      },
    ],
  },
];
