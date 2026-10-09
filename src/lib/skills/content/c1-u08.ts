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
 *           Schafspelz · Tomaten auf den Augen haben, Das ist mir Wurst, in den
 *           sauren Apfel beißen, die Extrawurst, das Haar in der Suppe suchen, eine
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
    genre: "guide",
    intro: "Veda konuşması üstüne bir yazı. Alıntı ne zaman taşır, ne zaman gizler?",
    gloss: [
      { de: "der Weggefährte", tr: "yol arkadaşı", en: "companion" },
      { de: "würdigen", tr: "değerini teslim etmek", en: "to pay tribute" },
      { de: "das Vermächtnis", tr: "miras", en: "legacy" },
      { de: "bewegend", tr: "dokunaklı", en: "moving" },
      { de: "das Zitat", tr: "alıntı", en: "quotation" },
      { de: "die Weisheit", tr: "bilgelik", en: "wisdom" },
      { de: "der Abschnitt", tr: "bölüm / dönem", en: "chapter" },
      { de: "scheitern an", tr: "…yüzünden başarısız olmak", en: "to fail because of" },
      { de: "schließen", tr: "kapatmak", en: "to close" },
      { de: "erzeugen", tr: "üretmek", en: "to generate" },
      { de: "fremd", tr: "yabancı", en: "unfamiliar" },
      { de: "die Sitzung", tr: "oturum", en: "session" },
      { de: "solche", tr: "böyle", en: "such" },
      { de: "wahr", tr: "gerçek", en: "true" },
      { de: "verallgemeinern", tr: "genellemek", en: "to generalize" },
      { de: "die Länge", tr: "uzunluk", en: "length" },
      { de: "sich orientieren an", tr: "örnek almak", en: "to model oneself on" },
      { de: "vorkommen", tr: "yer almak", en: "to appear" },
      { de: "der Text", tr: "metin", en: "text" },
      { de: "stärken", tr: "güçlendirmek", en: "to strengthen" },
    ],
    minutes: 7,
    text:
      "DIE REDE, DIE NIEMAND VORHER SCHREIBT\n\n" +
      "Abschiedsreden scheitern selten am Aufbau. Sie scheitern an der Leihgabe.\n\n" +
      "Fast jede beginnt mit einem Zitat. Ein Satz von Goethe, eine Weisheit über Türen, die sich schließen, und andere, die sich öffnen. Das ist bequem: Das Zitat trägt die Feierlichkeit, und der Redner muss sie nicht selbst erzeugen.\n\n" +
      "Der Preis ist hoch. Wer mit fremden Worten beginnt, sagt im ersten Satz: Ich habe nichts Eigenes für diesen Anlass. Die Anwesenden hören das, auch wenn sie es nicht benennen könnten.\n\n" +
      "Was stattdessen trägt, ist überraschend klein. Ein Detail, das nur der Redner kennt: die kalte Kanne im Vorzimmer, der Zettel an der Tür, der Satz, den die Verabschiedete in jeder zweiten Sitzung gesagt hat. Wer solche Dinge nennt, würdigt, ohne zu loben.\n\n" +
      "Und das Vermächtnis? Man soll es nicht ausrufen. „Ihr Vermächtnis wird bleiben“ ist eine Behauptung. „Der Ordner, den sie angelegt hat, wird uns noch zehn Jahre begleiten“ ist ein Beweis — und er ist bewegend, weil er wahr ist.\n\n" +
      "Wer über einen langen Abschnitt gemeinsamer Arbeit spricht, sollte ihn benennen statt zu verallgemeinern: die vier Jahre im selben Büro, das eine Projekt, das beide fast zerrieben hat. Ein Weggefährte ist man in einem Zeitraum, nicht im Allgemeinen.\n\n" +
      "Auch die Länge ist ein Zeichen von Respekt: Vier Minuten sind fast immer genug, und niemand hat je eine Rede zu kurz gefunden.\n\n" +
      "Wer im Zweifel ist, welchen Ton er treffen soll, orientiert sich an dem, was der Verabschiedete selbst über sich gesagt hätte.\n\n" +
      "Ein Zitat darf durchaus vorkommen. Aber am Ende, nicht am Anfang: als Schlussstein auf etwas Eigenes, nicht als Ersatz dafür.",
    questions: [
      {
        text: "Woran scheitern Abschiedsreden laut Text?",
        options: ["Am Aufbau", "An der Leihgabe", "An der Länge"],
        answer: 1,
        explain: "„Sie scheitern an der Leihgabe“ — ödünç alınmış sözle başlamak.",
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
        explain: "„er ist bewegend, weil er wahr ist“ — iddia yerine kanıt.",
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
          "dass nichts Eigenes da ist",
          "dass der Redner nichts Eigenes hat",
          "Ich habe nichts Eigenes für diesen Anlass",
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
    genre: "essay",
    intro: "Münazara üstüne bir yazı. Kabul etmek neden güçlendirir?",
    gloss: [
      { de: "zugegeben", tr: "kabul / itiraf edeyim", en: "admittedly" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
      { de: "die Streitfrage", tr: "tartışma konusu", en: "the point at issue" },
      { de: "stichhaltig", tr: "sağlam / tutarlı", en: "cogent" },
      { de: "unterm Strich", tr: "nihayetinde", en: "at the end of the day" },
      { de: "rechtfertigen", tr: "haklı çıkarmak", en: "to justify" },
      { de: "sich berufen", tr: "dayanak göstermek", en: "to invoke" },
      { de: "stützen", tr: "desteklemek", en: "to support" },
      { de: "die Debatte", tr: "tartışma", en: "debate" },
      { de: "sehen", tr: "görmek", en: "to see" },
      { de: "die Wartezeit", tr: "bekleme süresi", en: "waiting time" },
      { de: "strittig", tr: "ihtilaflı", en: "disputed" },
      { de: "meiste", tr: "çoğu", en: "most" },
      { de: "die Zahl", tr: "sayı", en: "number" },
      { de: "die Autorität", tr: "otorite", en: "authority" },
      { de: "verlagern", tr: "kaydırmak", en: "to shift" },
      { de: "der Text", tr: "metin", en: "text" },
      { de: "verlieren", tr: "kaybetmek", en: "to lose" },
      { de: "gestiegen", tr: "yükselmiş", en: "risen" },
      { de: "gestritten", tr: "tartışılmış", en: "argued" },
      { de: "unstrittig", tr: "tartışmasız", en: "undisputed" },
    ],
    minutes: 7,
    text:
      "DAS ZUGESTÄNDNIS ALS WAFFE\n\n" +
      "In einer Debatte gilt Nachgeben als Schwäche. In einer guten Debatte ist es das Gegenteil.\n\n" +
      "Wer den stärksten Punkt der Gegenseite einräumt, bevor er widerlegt, nimmt ihr das Wichtigste: die Möglichkeit, ihn später als übersehen darzustellen. „Zugegeben, die Wartezeiten sind gestiegen. Dennoch …“ — dieser Satz kostet zwei Sekunden und spart zehn Minuten.\n\n" +
      "Wichtiger noch: Er verändert, worüber gestritten wird. Solange beide Seiten über dieselbe Tatsache streiten, gibt es keine Streitfrage, sondern zwei Behauptungen. Erst wenn die Tatsache steht, wird sichtbar, was wirklich strittig ist — meist die Deutung, nicht die Zahl.\n\n" +
      "Ein Argument ist stichhaltig, wenn es sich auf etwas stützt, das der andere prüfen kann. Wer sich stattdessen auf eine Autorität beruft — „Alle Fachleute sagen …“ —, verlagert die Prüfung dorthin, wo sie niemand vornimmt.\n\n" +
      "Unterm Strich unterscheidet sich eine Debatte von einem Streit an einer Stelle: Im Streit will man recht behalten, in der Debatte will man wissen, wer recht hat. Der erste Satz verrät meist, welches von beidem läuft.\n\n" +
      "Praktisch gibt es dafür eine Probe, die im Gespräch selbst funktioniert: Man fasst die Gegenposition zusammen, bis das Gegenüber zustimmt, dass sie richtig wiedergegeben ist. Erst danach widerspricht man. Der Umweg kostet zwei Sätze und nimmt der Debatte den größten Teil ihrer Hitze.\n\n" +
      "Der Unterschied wird an einer Kleinigkeit sichtbar: daran, ob jemand die eigene Position im Lauf des Gesprächs verändern kann, ohne das Gesicht zu verlieren.\n\n" +
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
          "niemand kann es prüfen",
          "die Prüfung wird dorthin verlagert, wo sie niemand vornimmt",
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
          "recht behalten gegenüber wissen wollen",
          "im Streit will man recht behalten, in der Debatte wissen, wer recht hat",
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
    genre: "dialogue",
    intro: "Vücut deyimleri gerçek bir konuşmada. Hangisi ne kadar yakınlık istiyor?",
    gloss: [
      { de: "unter vier Augen", tr: "baş başa", en: "in private" },
      { de: "die Daumen drücken", tr: "şans dilemek", en: "to keep one's fingers crossed" },
      { de: "jemandem unter die Arme greifen", tr: "elinden tutmak", en: "to lend a hand" },
      { de: "Hand und Fuß haben", tr: "tutarlı olmak", en: "to make sense" },
      { de: "aus einer Mücke einen Elefanten machen", tr: "pireyi deve yapmak", en: "to make a mountain out of a molehill" },
      { de: "die Redewendung", tr: "deyim", en: "idiom" },
      { de: "wörtlich", tr: "kelimesi kelimesine", en: "literally" },
      { de: "lesen", tr: "okumak", en: "to read" },
      { de: "Schick es mir", tr: "bana gönder", en: "send it to me" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nele", text: "Hast du kurz Zeit? Am liebsten unter vier Augen." },
      { speaker: "Robert", text: "Klar. Setzen wir uns nach hinten." },
      { speaker: "Nele", text: "Ich bewerbe mich intern. Morgen ist das Gespräch." },
      { speaker: "Robert", text: "Dann drücke ich dir die Daumen." },
      { speaker: "Nele", text: "Danke. Ehrlich gesagt hätte ich lieber, dass du mir unter die Arme greifst, als dass du sie drückst." },
      { speaker: "Robert", text: "Verstanden. Was brauchst du?" },
      { speaker: "Nele", text: "Jemanden, der mein Konzept liest und sagt, ob es Hand und Fuß hat." },
      { speaker: "Robert", text: "Schick es mir heute Abend. Zwei Bedingungen: Ich sage dir ehrlich, was schwach ist, und du machst daraus keine Mücke einen Elefanten." },
      { speaker: "Nele", text: "Umgekehrt, oder?" },
      { speaker: "Robert", text: "Stimmt. Aus einer Mücke einen Elefanten. Die Redewendungen sind das Erste, was mir abends abhandenkommt." },
      { speaker: "Nele", text: "Beruhigend. Ich dachte schon, ich hätte sie wieder wörtlich genommen." },
    ],
    questions: [
      {
        text: "Welchen Unterschied macht Nele zwischen zwei Redewendungen?",
        options: [
          "Zwischen Daumen drücken und unter die Arme greifen",
          "Zwischen unter vier Augen und offen reden",
          "Zwischen Hand und Fuß und Mücke und Elefant",
        ],
        answer: 0,
        explain: "Biri iyi dilek, öteki somut yardım — Nele ikincisini istiyor.",
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
          "Dass Nele ihm das Konzept morgen schickt",
          "Dass Nele aus seiner Kritik keine große Sache macht",
          "Dass Nele mit niemandem darüber spricht",
        ],
        answer: 1,
        explain: "„du machst daraus keine Mücke einen Elefanten“ — yani eleştirisini büyütmemesini, pireyi deve yapmamasını istiyor; deyimi sonra kendisi düzeltiyor.",
      },
      {
        kind: "short_answer",
        text: "Welchen Fehler macht Robert und wie erklärt er ihn?",
        options: [],
        answer: 0,
        accept: [
          "er sagt sie falsch herum",
          "er verdreht die Redewendung und sagt, abends kommen sie ihm abhanden",
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
    title: "Der Urlaubsplan für August",
    genre: "dialogue",
    intro: "Ağustos izin planı neredeyse hazır; tek sorun fuar haftası. İki meslektaş bunu nasıl çözüyor?",
    gloss: [
      { de: "Tomaten auf den Augen haben", tr: "apaçık olanı görmemek", en: "to be blind to the obvious" },
      { de: "Das ist mir Wurst", tr: "umurumda değil", en: "I could not care less" },
      { de: "in den sauren Apfel beißen", tr: "acı lokmayı yutmak", en: "to bite the bullet" },
      { de: "die Extrawurst", tr: "ayrıcalık", en: "special treatment" },
      { de: "das Haar in der Suppe suchen", tr: "kusur aramak", en: "to nitpick" },
      { de: "unter vier Augen", tr: "baş başa", en: "in private" },
      { de: "am Stück", tr: "aralıksız", en: "in a row" },
      { de: "die Fortbildung", tr: "hizmet içi eğitim", en: "training course" },
      { de: "die Aushilfe", tr: "geçici yardımcı", en: "temporary help" },
      { de: "entbehren", tr: "vazgeçebilmek", en: "to spare" },
      { de: "der Stand", tr: "fuar standı", en: "booth" },
      { de: "das Publikum", tr: "seyirci", en: "audience" },
      { de: "vernünftig", tr: "makul", en: "reasonable" },
      { de: "zu sechst", tr: "altı kişi", en: "six of us" },
      { de: "egal", tr: "fark etmez", en: "doesn't matter" },
      { de: "genau", tr: "tam olarak", en: "exactly" },
      { de: "das Glück", tr: "şans", en: "luck" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Hanna", text: "Der Urlaubsplan für August ist fast fertig. Nur Tobias will wieder eine Extrawurst: drei Wochen am Stück, genau in der Messewoche." },
      { speaker: "Julian", text: "Hatte er nicht letztes Jahr schon die Messewoche frei?" },
      { speaker: "Hanna", text: "Doch. Und keinem ist es aufgefallen. Da hatten wir alle Tomaten auf den Augen." },
      { speaker: "Julian", text: "Oder niemand wollte Streit. Was schlägst du vor?" },
      { speaker: "Hanna", text: "Einer von uns muss in den sauren Apfel beißen und die Messe übernehmen. Ich habe zwei Kinder, ich brauche die Schulferien." },
      { speaker: "Julian", text: "Dann mache ich die Messe. Das ist mir Wurst, ob ich im August oder im September fahre. Ich habe keine Schulkinder, und im September ist das Meer sowieso wärmer." },
      { speaker: "Hanna", text: "Danke. Aber Tobias bekommt trotzdem keine drei Wochen. Zwei, und die zweite erst nach der Messe." },
      { speaker: "Julian", text: "Er wird sagen, dass du das Haar in der Suppe suchst." },
      { speaker: "Hanna", text: "Soll er. Wir sind im August zu viert statt zu sechst, und am Stand brauchen wir drei Leute." },
      { speaker: "Julian", text: "Rechnen wir mal: Du bist weg, Tobias ist weg, Lena hat ihre Fortbildung. Dann bleiben Jan und ich." },
      { speaker: "Hanna", text: "Und Jan fängt erst im Juli an. Den können wir nicht allein an den Stand stellen." },
      { speaker: "Julian", text: "Dann brauchen wir für zwei Tage eine Aushilfe aus dem Vertrieb." },
      { speaker: "Hanna", text: "Gute Idee. Ich frage Frau Roth morgen, ob sie jemanden entbehren kann." },
      { speaker: "Julian", text: "Und Tobias sagst du es selbst?" },
      { speaker: "Hanna", text: "Heute noch, unter vier Augen. Nicht in der Teamsitzung, da hätte er ein Publikum." },
      { speaker: "Julian", text: "Klingt vernünftig. Viel Glück." },
    ],
    questions: [
      {
        text: "Was möchte Tobias?",
        options: [
          "Einen Platz am Messestand",
          "Drei Wochen Urlaub am Stück in der Messewoche",
          "Eine Fortbildung im August",
        ],
        answer: 1,
        explain: "„Nur Tobias will wieder eine Extrawurst: drei Wochen am Stück, genau in der Messewoche.“",
      },
      {
        kind: "gapfill",
        text: "Einer von uns muss in den ___ Apfel beißen und die Messe übernehmen.",
        options: [],
        answer: 0,
        accept: ["sauren"],
        explain: "Hoş olmayan görevi birinin üstlenmesi gerekiyor; sonunda Julian fuarı üstleniyor.",
      },
      {
        text: "Warum ist es Julian egal, wann er Urlaub macht?",
        options: [
          "Er hat keine Schulkinder und fährt gern im September",
          "Er fährt dieses Jahr gar nicht weg",
          "Er muss ohnehin zur Fortbildung",
        ],
        answer: 0,
        explain: "„Ich habe keine Schulkinder, und im September ist das Meer sowieso wärmer.“",
      },
      {
        kind: "short_answer",
        text: "Wie will Hanna mit Tobias sprechen?",
        options: [],
        answer: 0,
        accept: [
          "unter vier Augen",
          "allein mit ihm",
          "nicht in der Teamsitzung",
          "heute noch unter vier Augen",
        ],
        explain: "„Heute noch, unter vier Augen. Nicht in der Teamsitzung, da hätte er ein Publikum.“",
      },
    ],
  },
  {
    id: "c1-u08-w1",
    level: "C1",
    skill: "writing",
    unit: 8,
    title: "Argumente für die Debatte",
    genre: "grammar",
    intro: "Konzessiv yapı: önce tavizi ver, sonra karşı çık.",
    gloss: [
      { de: "zugegeben", tr: "kabul", en: "admittedly" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
      { de: "stichhaltig", tr: "sağlam", en: "cogent" },
      { de: "sich berufen", tr: "dayanak göstermek", en: "to invoke" },
      { de: "die Wartezeit", tr: "bekleme süresi", en: "waiting time" },
      { de: "täuschen", tr: "aldatmak", en: "to deceive" },
      { de: "die Zahl", tr: "sayı", en: "number" },
      { de: "gestiegen", tr: "yükselmiş", en: "risen" },
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
    genre: "monologue",
    intro: "Veda konuşması yaz: alıntıyla başlama, ayrıntıyla değerini teslim et.",
    gloss: [
      { de: "würdigen", tr: "değerini teslim etmek", en: "to pay tribute" },
      { de: "der Weggefährte", tr: "yol arkadaşı", en: "companion" },
      { de: "das Vermächtnis", tr: "miras", en: "legacy" },
      { de: "der Abschnitt", tr: "dönem", en: "chapter" },
      { de: "bewegend", tr: "dokunaklı", en: "moving" },
      { de: "offen", tr: "açık", en: "open" },
      { de: "aufschließen", tr: "kilidi açmak", en: "to unlock" },
      { de: "heraus", tr: "dışarı", en: "out" },
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
          "— Her sabah 6.40'ta gelir, kapıyı o açardı\n" +
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
