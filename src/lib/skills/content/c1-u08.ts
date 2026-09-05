import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 8 — "Veda konuşması, münazara, vücut ve yiyecek deyimleri".
 *
 * Dört ders: Die Rede zum Abschied · Die Streitfrage · Die Daumen drücken ·
 * Tomaten auf den Augen.
 *
 *   Kelime: der Weggefährte, der Abschnitt, würdigen, der Dank, bewegend,
 *           das Vermächtnis, die Weisheit, das Zitat · zugegeben, einräumen,
 *           die Streitfrage, stichhaltig, unterm Strich, rechtfertigen, sich
 *           berufen, stützen · die Redewendung, wörtlich, unter vier Augen,
 *           Hand und Fuß haben, die Daumen drücken, jemandem unter die Arme
 *           greifen, aus einer Mücke einen Elefanten machen, der Wolf im
 *           Schafspelz · Tomaten auf den Augen, Das ist mir Wurst, in den
 *           sauren Apfel beißen, die Extrawurst, das Haar in der Suppe, eine
 *           Extrawurst braten, die Hände in den Schoß legen, jemandem auf den
 *           Zahn fühlen
 *
 * Ünite iki uzak konuyu tek eksende birleştiriyor: SÖZÜN SAHİPLENİLMESİ.
 * Veda konuşması ödünç alınmış sözle (alıntı, klişe) mi kuruluyor yoksa
 * konuşanın kendi cümlesiyle mi; münazarada bir iddia dayanağa mı
 * dayandırılıyor yoksa otoriteye mi ("sich berufen auf"); deyimlerde ise hazır
 * kalıp söyleyeni rahatlatıyor ama dinleyene bir şey söylemeyebiliyor.
 *
 * Deyim dersleri bu yüzden yalnız anlam değil KULLANIM SINIRI öğretiyor:
 * hangi deyim iş yazışmasında durur, hangisi yalnız sözlü ve tanıdık arasında.
 */
export const c1U08: SkillExercise[] = [
  {
    id: "c1-u08-r1",
    level: "C1",
    skill: "reading",
    unit: 8,
    title: "Was eine Abschiedsrede trägt",
    genre: "Rehber yazısı",
    intro: "Veda konuşması üstüne bir yazı. Alıntı ne zaman taşır, ne zaman gizler?",
    gloss: [
      { de: "der Weggefährte", tr: "yol arkadaşı", en: "companion" },
      { de: "würdigen", tr: "değerini teslim etmek", en: "to pay tribute" },
      { de: "das Vermächtnis", tr: "miras", en: "legacy" },
      { de: "bewegend", tr: "dokunaklı", en: "moving" },
      { de: "das Zitat", tr: "alıntı", en: "quotation" },
      { de: "die Weisheit", tr: "bilgelik", en: "wisdom" },
      { de: "der Abschnitt", tr: "bölüm, dönem", en: "chapter" },
    ],
    minutes: 7,
    text:
      "DIE REDE, DIE NIEMAND VORHER SCHREIBT\n\n" +
      "Abschiedsreden misslingen selten am Aufbau. Sie misslingen an der Leihgabe.\n\n" +
      "Fast jede beginnt mit einem Zitat. Ein Satz von Goethe, eine Weisheit über Türen, die sich schließen, und andere, die sich öffnen. Das ist bequem: Das Zitat trägt die Feierlichkeit, und der Redner muss sie nicht selbst erzeugen.\n\n" +
      "Der Preis ist hoch. Wer mit fremden Worten beginnt, sagt im ersten Satz: Ich habe nichts Eigenes für diesen Anlass. Die Anwesenden hören das, auch wenn sie es nicht benennen könnten.\n\n" +
      "Was stattdessen trägt, ist überraschend klein. Ein Detail, das nur der Redner kennt: die kalte Kanne im Vorzimmer, der Zettel an der Tür, der Satz, den die Verabschiedete in jeder zweiten Sitzung gesagt hat. Wer solche Dinge nennt, würdigt, ohne zu loben.\n\n" +
      "Und das Vermächtnis? Man soll es nicht ausrufen. „Ihr Vermächtnis wird bleiben“ ist eine Behauptung. „Der Ordner, den sie angelegt hat, wird uns noch zehn Jahre begleiten“ ist ein Beweis — und er ist bewegend, weil er wahr ist.\n\n" +
      "Ein Zitat darf durchaus vorkommen. Aber am Ende, nicht am Anfang: als Schlussstein auf etwas Eigenes, nicht als Ersatz dafür.",
    questions: [
      {
        text: "Woran misslingen Abschiedsreden laut Text?",
        options: ["Am Aufbau", "An der Leihgabe", "An der Länge"],
        answer: 1,
        explain: "„Sie misslingen an der Leihgabe“ — ödünç alınmış sözle başlamak.",
      },
      {
        kind: "gapfill",
        text: "Wer solche Dinge nennt, ___, ohne zu loben.",
        options: [],
        answer: 0,
        accept: ["würdigt"],
        explain: "würdigen: değerini teslim etmek. Övmekten farkı, iddia değil ayrıntı sunması.",
      },
      {
        text: "Warum ist „Der Ordner, den sie angelegt hat, wird uns noch zehn Jahre begleiten“ stärker?",
        options: [
          "Weil es länger ist",
          "Weil es ein Beweis statt einer Behauptung ist",
          "Weil es sachlicher klingt",
        ],
        answer: 1,
        explain: "„es ist bewegend, weil es wahr ist“ — iddia yerine kanıt.",
      },
      {
        kind: "short_answer",
        text: "Wo darf ein Zitat laut Text stehen und wo nicht?",
        options: [],
        answer: 0,
        accept: [
          "am Ende, nicht am Anfang",
          "als Schlussstein, nicht als Ersatz",
          "am Schluss statt am Beginn",
        ],
        explain: "„als Schlussstein auf etwas Eigenes, nicht als Ersatz dafür“.",
      },
      {
        kind: "short_answer",
        text: "Was hören die Anwesenden laut Text, wenn eine Rede mit einem Zitat beginnt?",
        options: [],
        answer: 0,
        accept: [
          "dass der Redner nichts Eigenes hat",
          "Ich habe nichts Eigenes für diesen Anlass",
          "dass nichts Eigenes da ist",
        ],
        explain: "„auch wenn sie es nicht benennen könnten“ — etki bilinçsiz ama gerçek.",
      },
    ],
  },
  {
    id: "c1-u08-r2",
    level: "C1",
    skill: "reading",
    unit: 8,
    title: "Wann ein Argument stichhaltig ist",
    genre: "Deneme",
    intro: "Münazara üstüne bir yazı. Kabul etmek neden güçlendirir?",
    gloss: [
      { de: "zugegeben", tr: "kabul, itiraf edeyim", en: "admittedly" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
      { de: "die Streitfrage", tr: "tartışma konusu", en: "the point at issue" },
      { de: "stichhaltig", tr: "sağlam, tutarlı", en: "cogent" },
      { de: "unterm Strich", tr: "nihayetinde", en: "at the end of the day" },
      { de: "rechtfertigen", tr: "haklı çıkarmak", en: "to justify" },
      { de: "sich berufen", tr: "dayanak göstermek", en: "to invoke" },
      { de: "stützen", tr: "desteklemek", en: "to support" },
    ],
    minutes: 7,
    text:
      "DAS ZUGESTÄNDNIS ALS WAFFE\n\n" +
      "In einer Debatte gilt Nachgeben als Schwäche. In einer guten Debatte ist es das Gegenteil.\n\n" +
      "Wer den stärksten Punkt der Gegenseite einräumt, bevor er widerlegt, nimmt ihr das Wichtigste: die Möglichkeit, ihn später als übersehen darzustellen. „Zugegeben, die Wartezeiten sind gestiegen. Dennoch …“ — dieser Satz kostet zwei Sekunden und spart zehn Minuten.\n\n" +
      "Wichtiger noch: Er verändert, worüber gestritten wird. Solange beide Seiten dieselbe Tatsache bestreiten, gibt es keine Streitfrage, sondern zwei Behauptungen. Erst wenn die Tatsache steht, wird sichtbar, was wirklich strittig ist — meist die Deutung, nicht die Zahl.\n\n" +
      "Ein Argument ist stichhaltig, wenn es sich auf etwas stützt, das der andere prüfen kann. Wer sich stattdessen auf eine Autorität beruft — „Alle Fachleute sagen …“ —, verlagert die Prüfung dorthin, wo sie niemand vornimmt.\n\n" +
      "Unterm Strich unterscheidet sich eine Debatte von einem Streit an einer Stelle: Im Streit will man recht behalten, in der Debatte will man wissen, wer recht hat. Der erste Satz verrät meist, welches von beidem läuft.\n\n" +
      "Man rechtfertigt eine Position nicht dadurch, dass man die Gegenposition schwach darstellt. Man rechtfertigt sie dadurch, dass man sie in ihrer stärksten Form widerlegt.",
    questions: [
      {
        text: "Warum ist das Einräumen laut Text eine Stärke?",
        options: [
          "Weil es höflich ist",
          "Weil es der Gegenseite die Möglichkeit nimmt, den Punkt als übersehen darzustellen",
          "Weil es Zeit spart",
        ],
        answer: 1,
        explain: "Zaman tasarrufu yan etki; asıl kazanç itirazın elinden alınması.",
      },
      {
        kind: "gapfill",
        text: "___, die Wartezeiten sind gestiegen. Dennoch …",
        options: [],
        answer: 0,
        accept: ["Zugegeben"],
        explain: "Kabul edip devam etme kalıbı: konzessiv yapının en kısa hâli.",
      },
      {
        text: "Was wird laut Text sichtbar, wenn die Tatsache unstrittig ist?",
        options: [
          "Dass eine Seite recht hat",
          "Was wirklich strittig ist — meist die Deutung",
          "Dass die Debatte beendet ist",
        ],
        answer: 1,
        explain: "„meist die Deutung, nicht die Zahl“.",
      },
      {
        kind: "short_answer",
        text: "Was ist das Problem daran, sich auf eine Autorität zu berufen?",
        options: [],
        answer: 0,
        accept: [
          "die Prüfung wird dorthin verlagert, wo sie niemand vornimmt",
          "niemand kann es prüfen",
          "die Prüfbarkeit geht verloren",
        ],
        explain: "Sağlam sav, karşı tarafın sınayabileceği bir şeye dayanır.",
      },
      {
        kind: "short_answer",
        text: "Worin unterscheidet sich laut Text eine Debatte von einem Streit?",
        options: [],
        answer: 0,
        accept: [
          "im Streit will man recht behalten, in der Debatte wissen, wer recht hat",
          "recht behalten gegenüber wissen wollen",
          "Streit: recht behalten; Debatte: herausfinden",
        ],
        explain: "„Der erste Satz verrät meist, welches von beidem läuft.“",
      },
    ],
  },
  {
    id: "c1-u08-l1",
    level: "C1",
    skill: "listening",
    unit: 8,
    title: "Unter vier Augen",
    genre: "Diyalog",
    intro: "Vücut deyimleri gerçek bir konuşmada. Hangisi ne kadar yakınlık istiyor?",
    gloss: [
      { de: "unter vier Augen", tr: "baş başa", en: "in private" },
      { de: "die Daumen drücken", tr: "şans dilemek", en: "to keep one's fingers crossed" },
      { de: "jemandem unter die Arme greifen", tr: "elinden tutmak", en: "to lend a hand" },
      { de: "Hand und Fuß haben", tr: "tutarlı olmak", en: "to make sense" },
      { de: "aus einer Mücke einen Elefanten machen", tr: "pireyi deve yapmak", en: "to make a mountain out of a molehill" },
      { de: "die Redewendung", tr: "deyim", en: "idiom" },
      { de: "wörtlich", tr: "kelimesi kelimesine", en: "literally" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Ela", text: "Hast du kurz Zeit? Am liebsten unter vier Augen." },
      { speaker: "Robert", text: "Klar. Setzen wir uns nach hinten." },
      { speaker: "Ela", text: "Ich bewerbe mich intern. Morgen ist das Gespräch." },
      { speaker: "Robert", text: "Dann drücke ich dir die Daumen." },
      { speaker: "Ela", text: "Danke. Ehrlich gesagt hätte ich lieber, dass du mir unter die Arme greifst als dass du sie drückst." },
      { speaker: "Robert", text: "Verstanden. Was brauchst du?" },
      { speaker: "Ela", text: "Jemanden, der mein Konzept liest und sagt, ob es Hand und Fuß hat." },
      { speaker: "Robert", text: "Schick es mir heute Abend. Zwei Bedingungen: Ich sage dir ehrlich, was schwach ist, und du machst daraus keine Mücke einen Elefanten." },
      { speaker: "Ela", text: "Umgekehrt, oder?" },
      { speaker: "Robert", text: "Stimmt. Aus einer Mücke einen Elefanten. Die Redewendungen sind das Erste, was mir abends abhandenkommt." },
      { speaker: "Ela", text: "Beruhigend. Ich dachte schon, ich hätte sie wieder wörtlich genommen." },
    ],
    questions: [
      {
        text: "Welchen Unterschied macht Ela zwischen zwei Redewendungen?",
        options: [
          "Zwischen Daumen drücken und unter die Arme greifen",
          "Zwischen unter vier Augen und offen reden",
          "Zwischen Hand und Fuß und Mücke und Elefant",
        ],
        answer: 0,
        explain: "Biri iyi dilek, öteki somut yardım — Ela ikincisini istiyor.",
      },
      {
        kind: "gapfill",
        text: "Ich bewerbe mich intern und hätte gern, dass du mir ___ die Arme greifst.",
        options: [],
        answer: 0,
        accept: ["unter"],
        explain: "unter die Arme greifen: yardım etmek. Edat sabit, değiştirilemez.",
      },
      {
        text: "Was verlangt Robert im Gegenzug?",
        options: [
          "Dass Ela ihm das Konzept morgen schickt",
          "Dass Ela aus seiner Kritik keine große Sache macht",
          "Dass Ela mit niemandem darüber spricht",
        ],
        answer: 1,
        explain: "„du machst daraus keine Mücke einen Elefanten“ — sonra kalıbı kendisi düzeltiyor.",
      },
      {
        kind: "short_answer",
        text: "Welchen Fehler macht Robert und wie erklärt er ihn?",
        options: [],
        answer: 0,
        accept: [
          "er verdreht die Redewendung und sagt, abends kommen sie ihm abhanden",
          "er sagt sie falsch herum",
          "die Redewendungen kommen ihm abends abhanden",
        ],
        explain: "Deyim en çok yorulunca bozuluyor — anadili konuşanda da böyle.",
      },
    ],
  },
  {
    id: "c1-u08-l2",
    level: "C1",
    skill: "listening",
    unit: 8,
    title: "Das ist mir nicht Wurst",
    genre: "Diyalog",
    intro: "Yiyecek deyimleri iş ortamında. Hangisi toplantıda durur?",
    gloss: [
      { de: "Tomaten auf den Augen", tr: "göz göre göre görmemek", en: "blind to the obvious" },
      { de: "Das ist mir Wurst", tr: "umurumda değil", en: "I could not care less" },
      { de: "in den sauren Apfel beißen", tr: "acı lokmayı yutmak", en: "to bite the bullet" },
      { de: "die Extrawurst", tr: "ayrıcalık", en: "special treatment" },
      { de: "das Haar in der Suppe", tr: "kusur arama", en: "nitpicking" },
      { de: "jemandem auf den Zahn fühlen", tr: "ağzını aramak", en: "to sound someone out" },
      { de: "die Hände in den Schoß legen", tr: "eli böğründe oturmak", en: "to sit back and do nothing" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Hanna", text: "In der Sitzung habe ich gesagt: „Das ist mir Wurst.“ Frau Roth hat mich angesehen wie einen Fremdkörper." },
      { speaker: "Kerem", text: "Kein Wunder. Der Satz ist richtig, aber der Raum war falsch." },
      { speaker: "Hanna", text: "Es ist doch eine ganz normale Redewendung." },
      { speaker: "Kerem", text: "Am Küchentisch ja. In der Leitungssitzung klingt sie, als wäre dir das Thema gleichgültig — und genau das hast du ja nicht gemeint." },
      { speaker: "Hanna", text: "Ich meinte: Mir ist egal, welche der beiden Varianten wir nehmen." },
      { speaker: "Kerem", text: "Dann sag das. Oder: „Da bin ich leidenschaftslos.“ Klingt gleich, wirkt anders." },
      { speaker: "Hanna", text: "Und wenn ich sage, wir müssen in den sauren Apfel beißen?" },
      { speaker: "Kerem", text: "Das geht. Die Redewendung beschreibt eine Entscheidung, keine Haltung. Deshalb hält sie den Raum aus." },
      { speaker: "Hanna", text: "Und „Tomaten auf den Augen“?" },
      { speaker: "Kerem", text: "Nur, wenn du über dich selbst sprichst. Über andere ist es eine Beleidigung mit Zwinkern — und das Zwinkern kommt schriftlich nie an." },
      { speaker: "Hanna", text: "Also: Entscheidungen ja, Menschen nein." },
      { speaker: "Kerem", text: "So ungefähr. Und wenn du dir unsicher bist, fühl vorher jemandem auf den Zahn, statt es auszuprobieren." },
    ],
    questions: [
      {
        text: "Warum war „Das ist mir Wurst“ in der Sitzung problematisch?",
        options: [
          "Die Redewendung ist veraltet.",
          "Sie klingt gleichgültig gegenüber dem Thema.",
          "Sie ist grammatisch falsch.",
        ],
        answer: 1,
        explain: "„als wäre dir das Thema gleichgültig — und genau das hast du ja nicht gemeint“.",
      },
      {
        kind: "gapfill",
        text: "Wir müssen in den ___ Apfel beißen.",
        options: [],
        answer: 0,
        accept: ["sauren"],
        explain: "Deyim içindeki sıfat da çekimli ve sabit; değiştirilemez.",
      },
      {
        text: "Warum hält „in den sauren Apfel beißen“ die Sitzung aus?",
        options: [
          "Weil sie höflicher ist",
          "Weil sie eine Entscheidung beschreibt, keine Haltung",
          "Weil sie seltener benutzt wird",
        ],
        answer: 1,
        explain: "Karar tarif eden deyim resmî ortamda durur; tutum bildiren durmaz.",
      },
      {
        kind: "short_answer",
        text: "Unter welcher Bedingung geht „Tomaten auf den Augen“ laut Kerem?",
        options: [],
        answer: 0,
        accept: [
          "nur über sich selbst",
          "wenn man über sich selbst spricht",
          "nur auf sich bezogen",
        ],
        explain: "„Über andere ist es eine Beleidigung mit Zwinkern — und das Zwinkern kommt schriftlich nie an.“",
      },
    ],
  },
  {
    id: "c1-u08-w1",
    level: "C1",
    skill: "writing",
    unit: 8,
    title: "Kabul et, sonra çürüt",
    genre: "Dil bilgisi",
    intro: "Konzessiv yapı: önce tavizi ver, sonra karşı çık.",
    gloss: [
      { de: "zugegeben", tr: "kabul", en: "admittedly" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
      { de: "stichhaltig", tr: "sağlam", en: "cogent" },
      { de: "sich berufen", tr: "dayanak göstermek", en: "to invoke" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Kabul, bekleme süreleri arttı. Yine de sayı yanıltıyor.",
        answer: "Zugegeben, die Wartezeiten sind gestiegen. Dennoch täuscht die Zahl",
        hint: "zugegeben tavizi verir, dennoch karşı çıkışı taşır.",
      },
      {
        kind: "build",
        tr: "Bu itirazı kabul ediyorum ama sonucu değiştirmiyor.",
        answer: "Diesen Einwand räume ich ein, aber er ändert das Ergebnis nicht",
        hint: "einräumen ayrılabilen: räume … ein.",
      },
      {
        kind: "build",
        tr: "İddia sınanabilir verilere dayanıyor.",
        answer: "Die Behauptung stützt sich auf überprüfbare Daten",
        hint: "sich stützen auf + Akkusativ.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: yazar dayanak yerine otoriteye başvurmuş.",
        source: "Alle Fachleute sagen, dass die Maßnahme wirkt.",
        answer: "Zwei unabhängige Studien belegen, dass die Maßnahme wirkt.",
        alternatives: [
          "Zwei unabhängige Studien belegen, dass die Maßnahme wirkt",
          "Die Auswertung von 2024 belegt, dass die Maßnahme wirkt.",
        ],
        why: "Otoriteye başvurmak denetimi kimsenin yapmadığı yere taşır. Sağlam sav, karşı tarafın sınayabileceği bir kaynağa dayanır — savın gücü kaynağın adında değil, erişilebilirliğinde.",
      },
    ],
  },
  {
    id: "c1-u08-w2",
    level: "C1",
    skill: "writing",
    unit: 8,
    title: "Eine Rede zum Abschied",
    genre: "Konuşma metni",
    intro: "Veda konuşması yaz: alıntıyla başlama, ayrıntıyla değerini teslim et.",
    gloss: [
      { de: "würdigen", tr: "değerini teslim etmek", en: "to pay tribute" },
      { de: "der Weggefährte", tr: "yol arkadaşı", en: "companion" },
      { de: "das Vermächtnis", tr: "miras", en: "legacy" },
      { de: "der Abschnitt", tr: "dönem", en: "chapter" },
      { de: "bewegend", tr: "dokunaklı", en: "moving" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Emekliye ayrılan bir meslektaş için kısa bir veda konuşması yaz (7-10 cümle). Kurallar: alıntıyla BAŞLAMA; en az iki somut ayrıntıyla değerini teslim et; bırakacağı izi iddia olarak değil kanıt olarak söyle; istersen sona bir alıntı koy. Klişelerden kaçın („Türen schließen sich“ gibi).",
        stimulus:
          "KİŞİ: Frau Halbach, 31 yıl, okul sekreterliği.\n\n" +
          "BİLDİKLERİN:\n" +
          "— Her sabah 6:40'ta gelir, kapıyı o açardı\n" +
          "— Öğrencilerin adlarını ezbere bilirdi, mezun olanları da\n" +
          "— Kayıp eşya dolabını kendi kurmuş, hâlâ onun sistemiyle işliyor\n" +
          "— Yeni öğretmenlere ilk haftada bir sayfalık \"gerçekten işe yarayan\" not verirdi\n" +
          "— Zor bir veliyi sakinleştirmekte kimse onun kadar iyi değildi",
        checklist: [
          "Alıntıyla başlamadın mı?",
          "En az iki somut ayrıntı var mı?",
          "İz, iddia değil kanıt olarak mı verildi?",
          "Klişelerden kaçındın mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich möchte etwas würdigen, das selten genannt wird.", tr: "az anılan bir şeyin değerini teslim etmek istiyorum", en: "I want to pay tribute to something rarely mentioned" },
          { de: "Wer morgens um zwanzig vor sieben kam, …", tr: "sabah yediye yirmi kala gelen …", en: "whoever arrived at twenty to seven …" },
          { de: "Das bleibt, auch ohne dass wir es sagen.", tr: "biz söylemesek de kalır", en: "that remains, even unspoken" },
        ],
        sample:
          "Liebe Frau Halbach,\n\n" +
          "wer morgens um zwanzig vor sieben kam, fand die Tür schon offen. Einunddreißig Jahre lang, und niemand hat je gefragt, wer sie aufschließt.\n\n" +
          "Ich möchte etwas würdigen, das selten genannt wird: Sie kannten die Namen. Nicht nur die der Kinder, die hier sind — auch die derer, die vor zwölf Jahren gegangen sind. Wer so etwas kann, verwaltet keine Schule, er kennt sie.\n\n" +
          "Zwei Dinge werden bleiben, und beide ohne Ihren Namen darauf. Der Fundschrank funktioniert nach Ihrem System; wir haben zweimal versucht, es zu verbessern, und sind beide Male zurückgegangen. Und jede neue Kollegin bekommt in der ersten Woche Ihren einen Zettel — den mit den Dingen, die wirklich helfen.\n\n" +
          "Was uns am meisten fehlen wird, ist schwerer zu beschreiben: Sie konnten einen aufgebrachten Vater in vier Minuten so weit bringen, dass er sich setzte. Ich habe nie herausgefunden, wie.\n\n" +
          "Ein Abschnitt endet, sagt man. Ich sage lieber: Die Tür geht ab Montag später auf, und wir werden es alle merken.",
      },
    ],
  },
];
