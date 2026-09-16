import type { QuizWeek } from "../types";

/**
 * A1 · Hafta 1 · Tanışma.
 *
 * ÖLÇÜLEN ŞEY: kendini tanıtan bir metni/konuşmayı anlamak ve tanışmanın
 * dilbilgisel çekirdeğini kurmak — `sein`/`haben` çekimi, artikel, V2 sözdizimi
 * ve soru sözcükleri.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ. Bu haftanın üç maddesi anadile göre ayrışıyor ve
 * üçü de gerçek bir karışmayı hedefliyor:
 *  - `w01-g2` (V2): Türkçede fiil cümlenin sonunda, İngilizcede özne fiilden
 *    önce sabit. İki öğrenci de "Heute ich treffe…" kuruyor ama SEBEPLERİ farklı,
 *    o yüzden açıklama da farklı.
 *  - `w01-g3` (artikel): Türkçede cinsiyet hiç yok; İngilizcede tek tanımlık var.
 *    Türk öğrenci için sorun "ezberlenecek bir şey olduğunu fark etmek",
 *    İngiliz öğrenci için "üçe ayrıldığını fark etmek".
 *  - `w01-v3` (`bekommen`): yalnız İngilizce konuşan için tuzak — `become`
 *    sanıyor. Türk öğrencide böyle bir çağrışım yok, taban açıklama sade kalıyor.
 */
export const DE_A1_W01: QuizWeek = {
  id: "de-a1-w01",
  course: "de",
  level: "A1",
  no: 1,
  theme: "Sich vorstellen",
  themeTr: "Tanışma",
  canDo: ["A1.SPK.1", "A1.LS.5", "A1.RD.4", "A1.GR.2", "A1.GR.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Profiltext",
      genreTr: "Tanıtım yazısı",
      title: "Hallo!",
      body:
        "Hallo! Ich heiße Lena. Ich komme aus Österreich und wohne jetzt in Berlin. " +
        "Ich bin 24 Jahre alt. Ich bin Studentin und lerne Deutsch und Englisch. " +
        "Meine Familie wohnt nicht hier. Mein Vater und meine Mutter leben in Wien. " +
        "Ich habe einen Bruder. Er heißt Tim und ist noch jung. " +
        "Ich spiele gern Musik und lese viel. " +
        "Heute treffe ich eine Freundin in der Stadt. Wir trinken Kaffee und sprechen über die Arbeit.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Gespräch",
      genreTr: "Konuşma",
      plays: 2,
      segments: [
        { speaker: "Tim", text: "Hallo, ich bin Tim. Wie heißt du?" },
        { speaker: "Ayşe", text: "Ich heiße Ayşe. Hallo Tim!" },
        { speaker: "Tim", text: "Woher kommst du?" },
        { speaker: "Ayşe", text: "Ich komme aus der Türkei. Und du?" },
        { speaker: "Tim", text: "Ich komme aus Berlin. Was machst du hier?" },
        { speaker: "Ayşe", text: "Ich lerne Deutsch. Ich bin Studentin." },
        { speaker: "Tim", text: "Gut! Wo wohnst du?" },
        { speaker: "Ayşe", text: "Ich wohne jetzt in der Stadt." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "de-a1-w01-r1",
      block: "read",
      ref: "t1",
      stem: "Woher kommt Lena?",
      options: ["Aus Deutschland", "Aus England", "Aus Österreich", "Aus der Türkei"],
      answer: 2,
      why: "Metin \"Ich komme aus Österreich\" diyor. Berlin onun ŞU AN OTURDUĞU yer; nereden geldiği ile nerede oturduğu ayrı iki bilgi ve metin ikisini arka arkaya veriyor.",
      targets: ["lesen.detail", "fragewort.woher"],
    },
    {
      id: "de-a1-w01-r2",
      block: "read",
      ref: "t1",
      stem: "Wer lebt in Wien?",
      options: ["Ihr Bruder", "Ihre Eltern", "Lena", "Ihre Freundin"],
      answer: 1,
      why: "\"Mein Vater und meine Mutter leben in Wien\" — yani annesi ve babası. Metin kardeşinin nerede yaşadığını hiç söylemiyor; söylenmeyen bir şeyi çıkarım yapmadan işaretlemek gerekiyor.",
      targets: ["lesen.detail", "wortfeld.familie"],
    },
    {
      id: "de-a1-w01-r3",
      block: "read",
      ref: "t1",
      stem: "Was macht Lena heute?",
      options: ["Sie arbeitet", "Sie fährt nach Wien", "Sie lernt Englisch", "Sie trifft eine Freundin"],
      answer: 3,
      why: "\"Heute treffe ich eine Freundin\" cümlesi bugünü anlatıyor. Englisch lernen ve Arbeit metinde geçiyor ama bugüne bağlı değil — doğru sözcüğü görmek yetmiyor, hangi cümlede geçtiği önemli.",
      targets: ["lesen.detail", "zeitangabe.heute"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "de-a1-w01-l1",
      block: "listen",
      ref: "a1",
      stem: "Woher kommt Ayşe?",
      options: ["Aus der Türkei", "Aus Berlin", "Aus Österreich", "Aus Wien"],
      answer: 0,
      why: "Ayşe \"Ich komme aus der Türkei\" diyor. Berlin, Tim'in geldiği yer — iki kişi arka arkaya konuşurken hangi bilginin kime ait olduğunu takip etmek gerekiyor.",
      targets: ["hoeren.detail", "fragewort.woher"],
    },
    {
      id: "de-a1-w01-l2",
      block: "listen",
      ref: "a1",
      stem: "Was macht Ayşe in Berlin?",
      options: ["Sie arbeitet", "Sie spielt Musik", "Sie lernt Deutsch", "Sie liest Bücher"],
      answer: 2,
      why: "\"Ich lerne Deutsch. Ich bin Studentin.\" Soru mesleğini değil, ne YAPTIĞINI soruyor ve konuşmada ikisi tek nefeste geçiyor.",
      targets: ["hoeren.detail", "verb.lernen"],
    },
    {
      id: "de-a1-w01-l3",
      block: "listen",
      ref: "a1",
      stem: "Wo wohnt Ayşe jetzt?",
      options: ["In der Türkei", "In der Stadt", "Bei Tim", "In Österreich"],
      answer: 1,
      why: "Son cümle: \"Ich wohne jetzt in der Stadt.\" `jetzt` sözcüğü bilginin şimdiki duruma ait olduğunu söylüyor, geldiği yere değil.",
      targets: ["hoeren.detail", "fragewort.wo"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "de-a1-w01-g1",
      block: "grammar",
      stem: "Ich ___ Studentin.",
      options: ["bist", "ist", "sind", "bin"],
      answer: 3,
      why: "`sein` fiili kişiye göre tamamen değişiyor: ich bin, du bist, er/sie ist. `ich` ile her zaman `bin`.",
      targets: ["sein.praesens", "sein.1sg"],
      byNative: {
        en: {
          options: ["bist", "ist", "sind", "bin"],
          answer: 3,
          why: "İngilizcede de `am/are/is` değişiyor, ama Almancada biçimler kişiye daha sıkı bağlı ve `ich` için tek seçenek `bin` — `I am` ile birebir eşleşir.",
        },
      },
    },
    {
      id: "de-a1-w01-g2",
      block: "grammar",
      stem: "Welcher Satz ist richtig?",
      options: [
        "Heute ich treffe eine Freundin.",
        "Ich heute treffe eine Freundin.",
        "Heute treffe ich eine Freundin.",
        "Treffe heute ich eine Freundin.",
      ],
      answer: 2,
      why: "Almancada ana cümlede çekimli fiil HER ZAMAN ikinci sırada. Başa `heute` gelince o yeri o kapıyor ve özne fiilin arkasına geçiyor.",
      targets: ["wortstellung.v2"],
      byNative: {
        tr: {
          options: [
            "Heute ich treffe eine Freundin.",
            "Ich heute treffe eine Freundin.",
            "Heute treffe ich eine Freundin.",
            "Treffe heute ich eine Freundin.",
          ],
          answer: 2,
          why: "Türkçede fiil cümlenin sonunda ve sıra serbest; Almancada çekimli fiilin yeri sabit — ikinci sıra. Başa `heute` gelince özne fiilin ARKASINA düşüyor.",
        },
        en: {
          options: [
            "Heute ich treffe eine Freundin.",
            "Ich heute treffe eine Freundin.",
            "Heute treffe ich eine Freundin.",
            "Treffe heute ich eine Freundin.",
          ],
          answer: 2,
          why: "İngilizcede özne fiilden önce sabittir (\"Today I meet…\"), o yüzden `Heute ich treffe` doğru görünür. Almancada ikinci sırayı fiil tutuyor, özne geriye geçiyor.",
        },
      },
    },
    {
      id: "de-a1-w01-g3",
      block: "grammar",
      stem: "___ Buch ist neu.",
      options: ["Der", "Das", "Die", "Den"],
      answer: 1,
      why: "`Buch` nötr: `das Buch`. Artikel kelimenin parçası, kuraldan çıkarılamaz — kelimeyle birlikte ezberlenir.",
      targets: ["artikel.nominativ", "nomen.buch"],
      byNative: {
        tr: {
          options: ["Der", "Das", "Die", "Den"],
          answer: 1,
          why: "Türkçede isimlerin cinsiyeti yok, o yüzden burada ezberlenecek fazladan bir bilgi var: `Buch` nötr, `das Buch`. Kelimeyi artikeliyle birlikte öğren.",
        },
        en: {
          options: ["Der", "Das", "Die", "Den"],
          answer: 1,
          why: "İngilizcede tek tanımlık var (`the`); Almancada üç (`der/die/das`) ve seçim kelimenin cinsiyetine bağlı. `Buch` nötr: `das Buch`.",
        },
      },
    },
    {
      id: "de-a1-w01-g4",
      block: "grammar",
      stem: "___ du einen Hund?",
      options: ["Hast", "Habst", "Hat", "Habt"],
      answer: 0,
      why: "`haben` düzensiz: `du hast`, `habst` değil. Düzenli çekim beklenince üretilen biçim tam olarak `habst` oluyor.",
      targets: ["haben.praesens", "haben.2sg"],
    },
    {
      id: "de-a1-w01-g5",
      block: "grammar",
      stem: "___ kommst du?",
      options: ["Wo", "Wohin", "Wer", "Woher"],
      answer: 3,
      why: "`woher` kaynağı sorar (nereden), `wo` yeri (nerede), `wohin` yönü (nereye). `kommen` fiili kaynak istiyor.",
      targets: ["fragewort.woher", "fragewort.wo"],
      byNative: {
        en: {
          options: ["Wo", "Wohin", "Wer", "Woher"],
          answer: 3,
          why: "İngilizcede üçü de `where` ile kuruluyor (`where from`, `where`, `where to`), o yüzden ayrım görünmez oluyor. Almancada üç ayrı sözcük var ve `kommen` `woher` ister.",
        },
      },
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "de-a1-w01-v1",
      block: "vocab",
      stem: "Mein Vater und meine Mutter sind meine ___.",
      options: ["Kinder", "Leute", "Eltern", "Freunde"],
      answer: 2,
      why: "`Eltern` anne ve babanın ikisi birden demek ve yalnız çoğul kullanılır. `Leute` genel olarak insanlar, akrabalık bildirmez.",
      targets: ["wortfeld.familie", "nomen.eltern"],
    },
    {
      id: "de-a1-w01-v2",
      block: "vocab",
      stem: "— Wie ist dein ___? — Ich heiße Lena.",
      options: ["Name", "Land", "Jahr", "Beruf"],
      answer: 0,
      why: "Cevap bir isim olduğuna göre soru `Name` sormuş olmalı. Şıkların hepsi tanışma alanından, ayırt eden şey cevabın kendisi.",
      targets: ["wortfeld.vorstellung", "nomen.name"],
    },
    {
      id: "de-a1-w01-v3",
      block: "vocab",
      stem: "Ich ___ ein Buch von meinem Bruder.",
      options: ["werde", "bekomme", "komme", "nehme"],
      answer: 1,
      why: "`bekommen` almak demek. `werden` olmak, `kommen` gelmek — üçü benzer görünse de farklı fiiller.",
      targets: ["verb.bekommen", "wortfeld.geben-nehmen"],
      byNative: {
        en: {
          options: ["werde", "bekomme", "komme", "nehme"],
          answer: 1,
          why: "`bekommen` İngilizce `become` DEĞİL — klasik sahte dost. `bekommen` = to get, `become` ise Almancada `werden`. Şıklarda ikisi yan yana duruyor.",
        },
      },
    },
  ],
};
