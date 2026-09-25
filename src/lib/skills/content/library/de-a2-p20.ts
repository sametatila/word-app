import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 20.
 *
 * A2 hücresini YİRMİYE tamamlayan son parti. Kurallar ve emsal: `de-a2.ts`
 * (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 20 şehir ve ortak alan hattı: parktaki bankları isteyen bir okur
 * mektubu, belediye bahçıvanıyla radyo söyleşisi, pazar meydanına içme
 * çeşmesi öneren yazı. Söyleyiş odağı uzun sayıları gruplamak (yıl, fiyat,
 * telefon numarası); dil bilgisi schon, noch, erst ve olumsuzları noch nicht,
 * nicht mehr — Türkçede „daha, hâlâ, artık“ arasında dağılan küçük bir sistem.
 */
export const deA2P20: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r20",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Mehr Bänke im Stadtpark!",
    genre: "opinion",
    intro: "Yerel gazetede bir okur mektubu: yenilenen parkta neden yeterince bank yok ve bu kimi etkiliyor.",
    gloss: [
      { de: "die Bank", tr: "bank", en: "bench" },
      { de: "spazieren gehen", tr: "yürüyüşe çıkmak", en: "to go for a walk" },
      { de: "sich hinsetzen", tr: "oturmak", en: "to sit down" },
      { de: "sich ausruhen", tr: "dinlenmek", en: "to rest" },
      { de: "der Schatten", tr: "gölge", en: "shade" },
      { de: "das Rathaus", tr: "belediye binası", en: "town hall" },
    ],
    minutes: 5,
    text:
      "Ich wohne seit vierzig Jahren am Stadtpark und gehe fast jeden Tag dort spazieren. Letztes Jahr hat die Stadt " +
      "den Park neu gemacht. Es gibt jetzt schöne Wege, einen großen Spielplatz und junge Bäume. Das finde ich gut.\n\n" +
      "Aber es gibt ein Problem: Die alten Bänke sind weg, und es gibt nur noch vier neue, für den ganzen Park! " +
      "Für junge Leute ist das kein Problem. Aber viele ältere Menschen können nicht lange laufen. Sie müssen sich " +
      "alle paar hundert Meter kurz hinsetzen. Meine Nachbarin ist 82 und geht deshalb gar nicht mehr in den Park.\n\n" +
      "Auch Eltern mit kleinen Kindern fragen mich oft: Wo können wir uns ausruhen?\n\n" +
      "Ich habe schon zweimal an das Rathaus geschrieben, aber keine Antwort bekommen. Deshalb schreibe ich jetzt " +
      "an die Zeitung. Liebe Stadt, bitte stellen Sie mehr Bänke auf, am besten im Schatten!\n\n" +
      "Helga Brandt, Nordstadt",
    questions: [
      {
        text: "Was findet Frau Brandt am neuen Park gut?",
        options: ["die Wege und die jungen Bäume", "die vielen neuen Bänke", "die Parkplätze am Eingang"],
        answer: 0,
        explain: "„Es gibt jetzt schöne Wege, einen großen Spielplatz und junge Bäume. Das finde ich gut.“",
      },
      {
        text: "Warum geht die Nachbarin nicht mehr in den Park?",
        options: [
          "Der Park ist ihr zu laut.",
          "Sie wohnt jetzt in einer anderen Stadt.",
          "Sie kann nicht lange ohne Pause laufen.",
        ],
        answer: 2,
        explain: "Yaşlılar birkaç yüz metrede bir oturmak zorunda; bank olmadığı için 82 yaşındaki komşu artık gitmiyor.",
      },
      {
        kind: "truefalse",
        text: "Das Rathaus hat Frau Brandt schon geantwortet.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Ich habe schon zweimal an das Rathaus geschrieben, aber keine Antwort bekommen.“",
      },
      {
        kind: "gapfill",
        text: "Im ganzen Park gibt es nur noch ___ Bänke.",
        options: [],
        answer: 0,
        accept: ["vier", "4"],
        explain: "„es gibt nur noch vier neue, für den ganzen Park“.",
      },
      {
        kind: "short_answer",
        text: "Wie oft hat Frau Brandt an das Rathaus geschrieben?",
        options: [],
        answer: 0,
        accept: ["zweimal", "zwei Mal", "2-mal"],
        explain: "„Ich habe schon zweimal an das Rathaus geschrieben.“",
      },
      {
        text: "Was wünscht sich Frau Brandt?",
        options: ["einen zweiten Spielplatz", "mehr Bänke im Schatten", "weniger Bäume"],
        answer: 1,
        explain: "„bitte stellen Sie mehr Bänke auf, am besten im Schatten!“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l20",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Neue Bäume für die Kantstraße",
    genre: "interview",
    intro: "Radyoda belediyenin bahçıvanı anlatıyor: neden sonbaharda ağaç dikiliyor, hangi ağaçlar seçiliyor, mahalleli nasıl yardım edebilir.",
    gloss: [
      { de: "pflanzen", tr: "dikmek", en: "to plant" },
      { de: "trocken", tr: "kuru", en: "dry" },
      { de: "die Art", tr: "tür", en: "species" },
      { de: "der Eimer", tr: "kova", en: "bucket" },
      { de: "die Biene", tr: "arı", en: "bee" },
      { de: "pflücken", tr: "koparmak", en: "to pick" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Herr Weiß", text: "Frau Albrecht, Sie arbeiten als Gärtnerin für die Stadt. Was machen Sie gerade?" },
      { speaker: "Frau Albrecht", text: "Wir pflanzen neue Bäume in der Kantstraße. Insgesamt sind es dreißig, bis Ende November." },
      { speaker: "Herr Weiß", text: "Warum gerade jetzt, im Herbst?" },
      { speaker: "Frau Albrecht", text: "Im Herbst ist der Boden noch warm und es regnet oft. Dann wachsen die jungen Bäume besser an." },
      { speaker: "Herr Weiß", text: "Viele alte Bäume sind im Sommer krank geworden. Warum?" },
      { speaker: "Frau Albrecht", text: "Die Sommer sind zu heiß und zu trocken. Deshalb nehmen wir jetzt Arten aus dem Süden. Die brauchen weniger Wasser." },
      { speaker: "Herr Weiß", text: "Können die Leute in der Straße auch helfen?" },
      { speaker: "Frau Albrecht", text: "Ja, sehr gern! Wenn es heiß ist, geben Sie dem Baum vor Ihrer Tür einen Eimer Wasser. Das hilft viel." },
      { speaker: "Herr Weiß", text: "Und was kommt unter die Bäume?" },
      { speaker: "Frau Albrecht", text: "Dort säen wir Blumen für die Bienen. Bitte nicht pflücken, die Bienen brauchen sie!" },
    ],
    questions: [
      {
        text: "Wie viele Bäume pflanzt die Stadt in der Kantstraße?",
        options: ["zwanzig", "dreißig", "vierzig"],
        answer: 1,
        explain: "„Insgesamt sind es dreißig, bis Ende November.“",
      },
      {
        text: "Warum pflanzt man die Bäume im Herbst?",
        options: [
          "Dann ist es billiger.",
          "Dann haben die Gärtner mehr Zeit.",
          "Der Boden ist warm und es regnet oft.",
        ],
        answer: 2,
        explain: "„Im Herbst ist der Boden noch warm und es regnet oft.“",
      },
      {
        kind: "truefalse",
        text: "Die neuen Arten brauchen weniger Wasser.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Güneyden gelen türler seçiliyor: „Die brauchen weniger Wasser.“",
      },
      {
        kind: "gapfill",
        text: "Viele alte Bäume sind im ___ krank geworden.",
        options: [],
        answer: 0,
        accept: ["Sommer"],
        explain: "„Viele alte Bäume sind im Sommer krank geworden.“",
      },
      {
        kind: "short_answer",
        text: "Was sollen die Leute dem Baum an heißen Tagen geben?",
        options: [],
        answer: 0,
        accept: ["einen Eimer Wasser", "Wasser", "einen Eimer"],
        explain: "„geben Sie dem Baum vor Ihrer Tür einen Eimer Wasser“.",
      },
      {
        text: "Was soll man mit den Blumen nicht machen?",
        options: ["sie pflücken", "sie gießen", "sie fotografieren"],
        answer: 0,
        explain: "„Bitte nicht pflücken, die Bienen brauchen sie!“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w20",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Ein Trinkbrunnen für den Marktplatz",
    genre: "formal",
    intro: "Belediyenin öneri sayfasına yazıyorsun: önce iki cümle kur, sonra pazar meydanına bir içme çeşmesi öneren kısa bir metin yaz.",
    gloss: [
      { de: "der Trinkbrunnen", tr: "içme çeşmesi", en: "drinking fountain" },
      { de: "die Hitze", tr: "sıcak", en: "heat" },
      { de: "vorschlagen", tr: "önermek", en: "to suggest" },
      { de: "die Flasche", tr: "şişe", en: "bottle" },
      { de: "die Altstadt", tr: "eski şehir", en: "old town" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Yazın pazar meydanında içme suyu yok.",
        answer: "Im Sommer gibt es auf dem Marktplatz kein Trinkwasser.",
        alternatives: ["Auf dem Marktplatz gibt es im Sommer kein Trinkwasser."],
        hint: "„es gibt“ Akkusativ ister ve olumsuzu kein ile kurulur. Zaman başa gelince fiil yine ikinci sırada.",
      },
      {
        kind: "build",
        tr: "Bir içme çeşmesi herkese yardımcı olur.",
        answer: "Ein Trinkbrunnen hilft allen Menschen.",
        alternatives: ["Allen Menschen hilft ein Trinkbrunnen."],
        hint: "„helfen“ Dativ ister: allen Menschen — çoğul Dativ'de isim -n alır.",
      },
      {
        kind: "free",
        prompt:
          "Belediyenin „Fikirleriniz“ sayfasına yaz ve pazar meydanına bir içme çeşmesi konmasını öner: kendini kısaca tanıt, sorunu anlat, çeşmenin kimlere yarayacağını yaz, nereye konabileceğini söyle ve kibarca bitir.",
        checklist: [
          "Kendini kısaca tanıt",
          "Sorunu bir örnekle anlat",
          "Çeşmenin kimlere yarayacağını yaz",
          "Bir yer öner ve kibarca bitir",
        ],
        minWords: 55,
        phrases: [
          { de: "Ich wohne in … und bin oft …", tr: "…'da oturuyorum ve sık sık …", en: "I live in … and I am often …" },
          { de: "Im Sommer gibt es … kein …", tr: "Yazın …'da hiç … yok", en: "In summer there is no … at …" },
          { de: "Deshalb schlage ich … vor.", tr: "Bu yüzden … öneriyorum.", en: "That's why I suggest …" },
          { de: "Ein guter Platz ist …", tr: "İyi bir yer …", en: "A good place is …" },
          { de: "In anderen Städten gibt es das schon.", tr: "Başka şehirlerde bu zaten var.", en: "Other cities already have this." },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich wohne in der Altstadt und bin fast jeden Tag auf dem Marktplatz. Im Sommer gibt es auf dem Marktplatz " +
          "kein Trinkwasser. Die Cafés sind teuer, und viele Leute haben keine Flasche dabei. Letzten Juli ist dort " +
          "eine ältere Frau in der Hitze schwach geworden. Deshalb schlage ich einen Trinkbrunnen vor. " +
          "Ein Trinkbrunnen hilft allen Menschen: Kindern nach dem Spielen, Touristen, Radfahrern und alten Leuten. " +
          "Ein guter Platz ist neben dem Rathaus, dort gibt es schon Wasser. In anderen Städten gibt es das schon lange.\n\n" +
          "Mit freundlichen Grüßen\nEmre Kaya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s20",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Zahlen in Gruppen",
    genre: "pronounce",
    intro: "Uzun sayılar Almancada gruplar hâlinde söylenir: yıllar yüzlükle, fiyatlar euro ve sent diye, telefon numaraları rakam rakam. Altı cümlede doğru gruplarla söyle.",
    gloss: [
      { de: "die Nummer", tr: "numara", en: "number" },
      { de: "kosten", tr: "tutmak", en: "to cost" },
      { de: "geboren", tr: "doğmuş", en: "born" },
      { de: "umziehen", tr: "taşınmak", en: "to move" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ich bin neunzehnhundertachtundneunzig geboren.",
        tr: "1998'de doğdum.",
        hint: "2000'den önceki yıllar yüzlükle okunur: NEUN-zehn-hun-dert | ACHT-und-neun-zig. „tausend“ kullanılmaz.",
        confusions: [
          {
            heard: [],
            fix: "Yılı Türkçedeki gibi „bin dokuz yüz …“ diye tausend ile okuma; iki grup yeter: neunzehnhundert + achtundneunzig.",
            expected: "neunzehnhundertachtundneunzig",
          },
        ],
      },
      {
        de: "Wir sind zweitausendzwanzig umgezogen.",
        tr: "2020'de taşındık.",
        hint: "2000'den sonraki yıllar tausend ile: ZWEI-tau-send | ZWAN-zig. Tek başına yılın önüne „in“ gelmez.",
        confusions: [
          {
            heard: [],
            fix: "„zwanzig zwanzig“ İngilizce okuma biçimidir; Almancada zweitausendzwanzig denir.",
            expected: "zweitausendzwanzig",
          },
        ],
      },
      {
        de: "Das kostet zwölf Euro neunzig.",
        tr: "Bu on iki doksan tutuyor.",
        hint: "Fiyat iki grup: ZWÖLF Eu-ro | NEUN-zig. „Komma“ ya da „Cent“ söylenmez; kısa bir durak yeter.",
        confusions: [
          {
            heard: [],
            fix: "Euro'dan sonra küçük bir durak bırak; iki sayıyı birleştirirsen tek bir büyük sayı gibi duyulur.",
            expected: "neunzig",
          },
        ],
      },
      {
        de: "Meine Nummer ist null eins sieben sechs, zwei drei vier.",
        tr: "Numaram 0176, 234.",
        hint: "Telefon numarası rakam rakam ve gruplar hâlinde: null-eins-sieben-sechs | zwei-drei-vier. Grup sonunda ses askıda.",
        confusions: [
          {
            heard: [],
            fix: "Rakamları tek düz çizgide sıralama; gruplar arasında durak ver, son grupta sesi indir.",
            expected: "sechs",
          },
        ],
      },
      {
        de: "Der Zug fährt um siebzehn Uhr zweiundvierzig.",
        tr: "Tren 17.42'de kalkıyor.",
        hint: "Saat iki grup: SIEB-zehn Uhr | ZWEI-und-vier-zig. „Uhr“ iki grubun arasına girer.",
        confusions: [
          {
            heard: [],
            fix: "Uhr'u sona koyma; saat, Uhr, sonra dakika gelir.",
            expected: "Uhr",
          },
        ],
      },
      {
        de: "Wir wohnen in der Gartenstraße hundertzwölf.",
        tr: "Gartenstraße 112'de oturuyoruz.",
        hint: "Kapı numarası tek bir sayı olarak okunur: hun-dert-ZWÖLF. Rakam rakam bölünmez.",
        confusions: [
          {
            heard: [],
            fix: "Kapı numarasını telefon numarası gibi „eins eins zwei“ diye okuma; tek sayı: hundertzwölf.",
            expected: "hundertzwölf",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g20",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "schon, noch, erst",
    genre: "grammar",
    intro: "Türkçede „daha, hâlâ, artık, çoktan“ ile anlatılanlar Almancada küçük ama sıkı bir sisteme bağlı: schon, noch, erst ve olumsuzları.",
    focus: "Zaman zarfları: schon, noch, erst ve olumsuzları noch nicht, nicht mehr",
    gloss: [
      { de: "schon", tr: "çoktan", en: "already" },
      { de: "noch", tr: "hâlâ", en: "still" },
      { de: "erst", tr: "ancak", en: "only" },
      { de: "fertig", tr: "hazır", en: "ready" },
      { de: "rauchen", tr: "sigara içmek", en: "to smoke" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "schon ↔ noch nicht",
        tr: "schon bir şeyin olmuş olduğunu söyler: „çoktan, bile“. Olumsuzu „nicht schon“ değil, noch nicht'tir: „henüz … değil“.",
        examples: [
          { de: "Ich habe schon gegessen.", tr: "Ben yemek yedim bile.", note: "schon: olmuş" },
          { de: "Der Bus ist noch nicht da.", tr: "Otobüs henüz gelmedi.", note: "noch nicht: henüz değil" },
          { de: "Bist du schon fertig? — Nein, noch nicht.", tr: "Bitirdin mi? — Hayır, daha değil.", note: "soru ve cevap" },
        ],
      },
      {
        heading: "noch ↔ nicht mehr",
        tr: "noch bir durumun sürdüğünü söyler: „hâlâ“. Olumsuzu nicht mehr'dir: „artık … değil“. Türkçedeki „artık“ burada nicht mehr ile karşılanır.",
        examples: [
          { de: "Es regnet noch.", tr: "Hâlâ yağmur yağıyor.", note: "noch: sürüyor" },
          { de: "Ich rauche nicht mehr.", tr: "Artık sigara içmiyorum.", note: "nicht mehr: bitti" },
          { de: "Wohnt sie noch in Köln? — Nein, nicht mehr.", tr: "Hâlâ Köln'de mi oturuyor? — Hayır, artık değil.", note: "soru ve cevap" },
        ],
      },
      {
        heading: "erst: beklenenden az ya da geç",
        tr: "erst, bir şeyin beklenenden AZ ya da GEÇ olduğunu söyler: „daha, ancak, yalnızca“. schon ise tersini: beklenenden çok ya da erken. Aynı saat iki farklı duyguyla söylenebilir.",
        examples: [
          { de: "Es ist erst acht Uhr.", tr: "Saat daha sekiz.", note: "vakit erken" },
          { de: "Es ist schon acht Uhr!", tr: "Saat sekiz olmuş bile!", note: "vakit geç" },
          { de: "Er kommt erst morgen.", tr: "O ancak yarın geliyor.", note: "beklenenden geç" },
        ],
      },
    ],
    questions: [
      {
        text: "Bist du schon fertig? — Nein, ___.",
        options: ["nicht mehr", "noch nicht", "schon"],
        answer: 1,
        explain: "schon'un olumsuzu noch nicht'tir: henüz bitmedi.",
      },
      {
        text: "Wohnst du noch in Köln? — Nein, ___. Ich wohne jetzt in Bonn.",
        options: ["noch nicht", "schon", "nicht mehr"],
        answer: 2,
        explain: "noch'un olumsuzu nicht mehr'dir: artık orada oturmuyor.",
      },
      {
        text: "Es ist ___ sieben Uhr, wir haben noch viel Zeit.",
        options: ["erst", "schon", "nicht mehr"],
        answer: 0,
        explain: "Vakit beklenenden erken: erst sieben Uhr.",
      },
      {
        kind: "gapfill",
        text: "Ich rauche seit einem Jahr nicht ___. (noch / mehr)",
        options: [],
        answer: 0,
        accept: ["mehr"],
        explain: "Bir alışkanlık bitti: nicht mehr.",
      },
      {
        kind: "gapfill",
        text: "Der Bus ist ___ nicht da. Wir warten. (noch / schon)",
        options: [],
        answer: 0,
        accept: ["noch"],
        explain: "Henüz gelmedi: noch nicht.",
      },
      {
        kind: "gapfill",
        text: "Hast du ___ gegessen? — Ja, um zwölf. (schon / erst)",
        options: [],
        answer: 0,
        accept: ["schon"],
        explain: "Olmuş bir şey soruluyor: schon.",
      },
      {
        kind: "gapfill",
        text: "Er kommt nicht heute, er kommt ___ morgen. (erst / schon)",
        options: [],
        answer: 0,
        accept: ["erst"],
        explain: "Beklenenden geç: erst morgen.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Ich", "lerne", "erst seit drei Monaten", "Deutsch"],
        explain: "erst zaman öbeğinin önüne gelir: erst seit drei Monaten, „daha üç aydır“.",
      },
      {
        kind: "truefalse",
        text: "„Es ist schon Mitternacht, ich gehe ins Bett.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Vakit geç olmuş: schon. Cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Hast du schon gegessen? — Nein, schon nicht.“ — Bu cevap doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "schon'un olumsuzu noch nicht'tir: „Nein, noch nicht.“",
      },
    ],
  },
];
