import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 12.
 *
 * A2 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-a2.ts` (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 12 aile ve kuşaklar hattı: „ödünç büyükanne-büyükbaba“ projesinin
 * duyurusu, ebeveyn iznindeki bir babayla radyo söyleşisi, iş arkadaşına doğum
 * tebriği. Söyleyiş odağı sondaki zayıf e ve -en; dil bilgisi dürfen, sollen ve
 * wollen — A1'in können/müssen/möchten üçlüsünden sonra kalan üç modal fiilin
 * anlam farkı (parti 4 yalnız modal fiillerin Präteritum'unu işledi).
 */
export const deA2P12: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r12",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Leihgroßeltern gesucht",
    genre: "info",
    intro: "Aile bürosunun bir duyurusu: yakınında büyükanne-büyükbabası olmayan ailelerle vakti olan yaşlıları buluşturan bir proje.",
    gloss: [
      { de: "die Großeltern", tr: "büyükanne ve büyükbaba", en: "grandparents" },
      { de: "verbringen", tr: "geçirmek", en: "to spend" },
      { de: "vorlesen", tr: "yüksek sesle okumak", en: "to read aloud" },
      { de: "die Aufgabe", tr: "görev", en: "task" },
      { de: "kostenlos", tr: "ücretsiz", en: "free of charge" },
      { de: "der Ausflug", tr: "gezi", en: "trip" },
    ],
    minutes: 5,
    text:
      "Leihgroßeltern gesucht!\n\n" +
      "Viele Familien in unserer Stadt haben keine Großeltern in der Nähe. Oma und Opa wohnen in einer " +
      "anderen Stadt oder in einem anderen Land. Gleichzeitig gibt es viele ältere Menschen, die gern Zeit " +
      "mit Kindern verbringen möchten.\n\n" +
      "Unser Projekt bringt beide Seiten zusammen. Leihgroßeltern besuchen „ihre“ Familie etwa einmal pro Woche " +
      "für zwei bis drei Stunden. Sie spielen mit den Kindern, lesen vor oder gehen zusammen auf den Spielplatz. " +
      "Sie sind aber keine Babysitter: Putzen und Kochen gehören nicht zu ihren Aufgaben.\n\n" +
      "Zuerst lernen sich alle bei einem Treffen im Familienbüro kennen. Erst wenn beide Seiten zufrieden sind, " +
      "beginnt die Partnerschaft. Das Projekt ist kostenlos. Die Familien bezahlen nur die Kosten für Ausflüge, " +
      "zum Beispiel den Eintritt in den Zoo.\n\n" +
      "Haben Sie Interesse? Rufen Sie uns an: montags bis donnerstags von 9 bis 12 Uhr.",
    questions: [
      {
        text: "Für wen ist das Projekt?",
        options: [
          "für Kinder ohne Eltern",
          "für Großeltern mit vielen Enkeln",
          "für Familien ohne Großeltern in der Nähe",
        ],
        answer: 2,
        explain: "„Viele Familien … haben keine Großeltern in der Nähe“ — proje bu ailelerle yaşlıları buluşturuyor.",
      },
      {
        text: "Was machen Leihgroßeltern nicht?",
        options: ["putzen und kochen", "mit den Kindern spielen", "auf den Spielplatz gehen"],
        answer: 0,
        explain: "„Putzen und Kochen gehören nicht zu ihren Aufgaben.“",
      },
      {
        kind: "truefalse",
        text: "Am Anfang gibt es ein Treffen im Familienbüro.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Zuerst lernen sich alle bei einem Treffen im Familienbüro kennen.“",
      },
      {
        kind: "gapfill",
        text: "Die Leihgroßeltern besuchen die Familie etwa einmal pro ___.",
        options: [],
        answer: 0,
        accept: ["Woche"],
        explain: "„etwa einmal pro Woche für zwei bis drei Stunden“.",
      },
      {
        kind: "short_answer",
        text: "Was bezahlen die Familien?",
        options: [],
        answer: 0,
        accept: ["die Kosten für Ausflüge", "Kosten für Ausflüge", "Ausflüge", "den Eintritt"],
        explain: "Proje ücretsiz; aileler yalnız „die Kosten für Ausflüge“ ödüyor.",
      },
      {
        text: "Wann kann man im Büro anrufen?",
        options: ["jeden Tag, auch am Wochenende", "montags bis donnerstags vormittags", "nur freitags am Nachmittag"],
        answer: 1,
        explain: "„montags bis donnerstags von 9 bis 12 Uhr“ — yani hafta içi dört gün, öğleden önce.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l12",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Papa in Elternzeit",
    genre: "interview",
    intro: "Radyoda kısa bir söyleşi: ebeveyn iznine çıkan bir baba neden evde kaldığını, neyi zor bulduğunu ve ne zaman işe döneceğini anlatıyor.",
    gloss: [
      { de: "die Elternzeit", tr: "ebeveyn izni", en: "parental leave" },
      { de: "anstrengend", tr: "yorucu", en: "exhausting" },
      { de: "überrascht", tr: "şaşırmış", en: "surprised" },
      { de: "komisch", tr: "tuhaf", en: "strange" },
      { de: "die Kita", tr: "kreş", en: "daycare" },
      { de: "vermissen", tr: "özlemek", en: "to miss" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Brückner", text: "Herr Wendt, Sie sind seit vier Monaten in Elternzeit. Wie ist das?" },
      { speaker: "Tobias Wendt", text: "Anstrengender als mein Job! Meine Tochter Mila ist ein Jahr alt und schläft mittags nur eine halbe Stunde." },
      { speaker: "Frau Brückner", text: "Warum sind Sie zu Hause geblieben und nicht Ihre Frau?" },
      { speaker: "Tobias Wendt", text: "Meine Frau hatte die ersten acht Monate Elternzeit. Jetzt arbeitet sie wieder, und ich bin dran." },
      { speaker: "Frau Brückner", text: "Was hat Ihr Chef gesagt?" },
      { speaker: "Tobias Wendt", text: "Er war zuerst überrascht, weil ich der erste Mann in der Firma mit Elternzeit bin. Aber dann fand er es gut." },
      { speaker: "Frau Brückner", text: "Was war am Anfang schwierig?" },
      { speaker: "Tobias Wendt", text: "Auf dem Spielplatz waren nur Mütter, und die haben mich komisch angeschaut. Heute trinken wir jeden Dienstag zusammen Kaffee." },
      { speaker: "Frau Brückner", text: "Und wann gehen Sie zurück ins Büro?" },
      { speaker: "Tobias Wendt", text: "Im März. Dann geht Mila in die Kita. Ich freue mich darauf, aber ich vermisse diese Zeit bestimmt." },
    ],
    questions: [
      {
        text: "Wie lange ist Tobias schon in Elternzeit?",
        options: ["seit vier Monaten", "seit acht Monaten", "seit einem Jahr"],
        answer: 0,
        explain: "Soru hemen başta: „seit vier Monaten in Elternzeit“. Sekiz ay annenin izniydi.",
      },
      {
        text: "Wie hat der Chef zuerst reagiert?",
        options: ["Er war dagegen.", "Er war überrascht.", "Er hat nichts gesagt."],
        answer: 1,
        explain: "„Er war zuerst überrascht“ — firmada izne çıkan ilk erkek o.",
      },
      {
        kind: "truefalse",
        text: "Auf dem Spielplatz waren am Anfang viele Väter.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Auf dem Spielplatz waren nur Mütter.“",
      },
      {
        kind: "gapfill",
        text: "Mila schläft mittags nur eine halbe ___.",
        options: [],
        answer: 0,
        accept: ["Stunde"],
        explain: "„schläft mittags nur eine halbe Stunde“.",
      },
      {
        kind: "short_answer",
        text: "Wann trinkt Tobias jetzt mit den Müttern Kaffee?",
        options: [],
        answer: 0,
        accept: ["jeden Dienstag", "am Dienstag", "dienstags"],
        explain: "„Heute trinken wir jeden Dienstag zusammen Kaffee.“",
      },
      {
        text: "Was passiert im März?",
        options: [
          "Tobias bekommt einen neuen Job.",
          "Seine Frau geht in Elternzeit.",
          "Mila geht in die Kita.",
        ],
        answer: 2,
        explain: "„Im März. Dann geht Mila in die Kita.“ — Tobias da o zaman büroya dönüyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w12",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Glückwunsch zur Geburt",
    genre: "personal",
    intro: "İş arkadaşının bebeği doğdu: önce iki cümle kur, sonra ekip adına kısa bir tebrik kartı yaz.",
    gloss: [
      { de: "die Geburt", tr: "doğum", en: "birth" },
      { de: "der Glückwunsch", tr: "tebrik", en: "congratulations" },
      { de: "der Gutschein", tr: "hediye çeki", en: "voucher" },
      { de: "genießen", tr: "tadını çıkarmak", en: "to enjoy" },
      { de: "die Nachricht", tr: "haber", en: "news" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Kızınız için çok seviniyoruz.",
        answer: "Wir freuen uns sehr über eure Tochter.",
        alternatives: ["Über eure Tochter freuen wir uns sehr."],
        hint: "„sich freuen über“ olmuş bir şeye sevinmektir ve Akkusativ ister; zamir „uns“ fiilden hemen sonra.",
      },
      {
        kind: "build",
        tr: "Bir şeye ihtiyacınız olursa bizi arayın.",
        answer: "Wenn ihr etwas braucht, ruft uns an.",
        alternatives: ["Ruft uns an, wenn ihr etwas braucht."],
        hint: "„wenn“ cümlesinde fiil sona gider. ihr'e emir kipi: ruft … an, ön ek en sonda.",
      },
      {
        kind: "free",
        prompt:
          "İş arkadaşın Jana'nın bebeği doğdu. Ekip adına bir tebrik kartı yaz: tebrik et, haberi nasıl duyduğunuzu söyle, ekibin hediyesinden bahset, yardım teklif et ve yeni aileye iyi dileklerini ekle.",
        checklist: [
          "Bebeğin adıyla tebrik et",
          "Haberi ne zaman ve kimden duyduğunuzu yaz",
          "Ekibin hediyesini anlat",
          "Yardım teklif et ve iyi dileklerle bitir",
        ],
        minWords: 50,
        phrases: [
          { de: "Herzlichen Glückwunsch zur Geburt von …!", tr: "…'nın doğumu kutlu olsun!", en: "Congratulations on the birth of …!" },
          { de: "Wir haben uns alle sehr gefreut.", tr: "Hepimiz çok sevindik.", en: "We were all very happy." },
          { de: "Mit dieser Karte bekommt ihr …", tr: "Bu kartla birlikte … alıyorsunuz", en: "With this card you get …" },
          { de: "Wenn ihr etwas braucht, …", tr: "Bir şeye ihtiyacınız olursa …", en: "If you need anything, …" },
          { de: "Genießt die Zeit zu dritt!", tr: "Üç kişilik zamanın tadını çıkarın!", en: "Enjoy the time as a family of three!" },
        ],
        sample:
          "Liebe Jana, lieber Marco,\n\n" +
          "herzlichen Glückwunsch zur Geburt von Emma! Wir haben die schöne Nachricht am Montag von Frau Keller " +
          "gehört und uns alle sehr gefreut. Das Foto hängt jetzt an unserer Bürotür. " +
          "Mit dieser Karte bekommt ihr ein kleines Geschenk vom ganzen Team: einen Gutschein für das " +
          "Kindergeschäft in der Bahnhofstraße. Wenn ihr etwas braucht, ruft uns an. Wir kochen auch gern mal für euch. " +
          "Genießt die Zeit zu dritt und schlaft, so viel es geht! Wir freuen uns schon auf euren ersten Besuch mit Emma.\n\n" +
          "Viele Grüße\neure Kolleginnen und Kollegen",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s12",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Das leise e am Wortende",
    genre: "pronounce",
    intro: "Sondaki -e kısa ve gevşek söylenir ama yutulmaz: çoğulu, fiil ekini ve artikeli o taşır. Altı cümlede hafif ama duyulur bir e kur.",
    gloss: [
      { de: "die Pause", tr: "mola", en: "break" },
      { de: "warten", tr: "beklemek", en: "to wait" },
      { de: "der Hund", tr: "köpek", en: "dog" },
      { de: "die Karte", tr: "kart", en: "card" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Die Tage im Winter sind kurz.",
        tr: "Kışın günler kısa.",
        hint: "TAA-ge: sondaki e Türkçe e kadar açık değil, kısa ve gevşek bir ses. Ama düşmez.",
        confusions: [
          {
            heard: ["Die Tag im Winter sind kurz"],
            fix: "Çoğul eki -e düşerse tekil duyulur; kısa da olsa e'yi bırak.",
            expected: "Tage",
          },
        ],
      },
      {
        de: "Ich kaufe heute Brot.",
        tr: "Bugün ekmek alıyorum.",
        hint: "kaufe: KAU-fe, e ile biter. Arkasına n ekleme: ich ile fiil -e alır.",
        confusions: [
          {
            heard: ["Ich kaufen heute Brot"],
            fix: "ich'li fiil -e ile biter; sona n eklersen „wir“ biçimine dönüşür.",
            expected: "kaufe",
          },
        ],
      },
      {
        de: "Wir machen eine kleine Pause.",
        tr: "Kısa bir mola veriyoruz.",
        hint: "eine, kleine, Pause: üçü de hafif bir e ile biter. machen'de e neredeyse duyulmaz, n hece taşır: MAH-n.",
        confusions: [
          {
            heard: ["Wir machen ein klein Pause"],
            fix: "Artikel ve sıfattaki -e yutulursa ek kaybolur; her birinin sonunda kısa bir e bırak.",
            expected: "kleine",
          },
        ],
      },
      {
        de: "Ich warte seit einer Stunde.",
        tr: "Bir saattir bekliyorum.",
        hint: "warte ve Stunde: sondaki e kısa ama net. Önündeki t açıkça duyulur.",
        confusions: [
          {
            heard: ["Ich wart seit einer Stund"],
            fix: "e düşünce kelime t'de kesiliyor; t'den sonra kısa ve gevşek bir e ekle.",
            expected: "Stunde",
          },
        ],
      },
      {
        de: "Sie haben zwei Hunde und eine Katze.",
        tr: "İki köpekleri ve bir kedileri var.",
        hint: "HUN-de, KAT-se: ikisinde de son hece zayıf, vurgu ilk hecede.",
        confusions: [
          {
            heard: ["Sie haben zwei Hund und eine Katze"],
            fix: "Hunde'deki -e çoğul ekidir; düşerse „zwei“ ile isim uyuşmaz.",
            expected: "Hunde",
          },
        ],
      },
      {
        de: "Ich schreibe dir eine Karte.",
        tr: "Sana bir kart yazıyorum.",
        hint: "schreibe, eine, Karte: üç kısa e. Vurgu hep ilk hecede: ŞRAY-be, AY-ne, KAR-te.",
        confusions: [
          {
            heard: ["Ich schreib dir ein Karte"],
            fix: "„ein Karte“ yanlış artikel gibi duyulur; eine'nin sonundaki e'yi yutma.",
            expected: "eine",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g12",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "darf ich, soll ich, will ich?",
    genre: "grammar",
    intro: "können, müssen ve möchten'den sonra üç modal fiil daha: izin mi, başkasının isteği mi, kendi kararın mı?",
    focus: "Modal fiiller: dürfen, sollen, wollen — izin, başkasının isteği ve kendi isteğin",
    gloss: [
      { de: "dürfen", tr: "izinli olmak", en: "to be allowed" },
      { de: "sollen", tr: "-meli", en: "should" },
      { de: "wollen", tr: "istemek", en: "to want" },
      { de: "verboten", tr: "yasak", en: "forbidden" },
      { de: "benutzen", tr: "kullanmak", en: "to use" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "dürfen: izin ve yasak",
        tr: "„dürfen“ izin anlatır: ich darf, du darfst, er darf, wir dürfen. Olumsuzu „nicht dürfen“ YASAK demektir. Dikkat: „nicht müssen“ yasak değil, „gerek yok“ anlamına gelir. Modal fiil ikinci sırada çekilir, asıl fiil mastar olarak sona gider.",
        examples: [
          { de: "Darf ich kurz dein Handy benutzen?", tr: "Telefonunu kısa bir süre kullanabilir miyim?", note: "izin istemek" },
          { de: "Hier darf man nicht parken.", tr: "Burada park etmek yasak.", note: "nicht dürfen = yasak" },
          { de: "Am Sonntag dürfen die Kinder länger aufbleiben.", tr: "Pazar günü çocuklar daha geç yatabilir.", note: "izin var" },
        ],
      },
      {
        heading: "sollen: başkasının isteği",
        tr: "„sollen“ ile söylenen istek senden değil, BAŞKASINDAN gelir: doktor, şef, anne. Soru olarak „Soll ich …?“ ise bir teklif ya da ne yapacağını sormaktır. Çekim: ich soll, du sollst, er soll.",
        examples: [
          { de: "Der Arzt sagt, ich soll mehr schlafen.", tr: "Doktor daha çok uyumam gerektiğini söylüyor.", note: "istek doktordan" },
          { de: "Du sollst Oma anrufen.", tr: "Nineni araman gerekiyor.", note: "istek annenden geliyor" },
          { de: "Soll ich dir beim Tragen helfen?", tr: "Taşımana yardım edeyim mi?", note: "teklif" },
        ],
      },
      {
        heading: "wollen: kendi isteğin",
        tr: "„wollen“ güçlü bir istek ya da kararlı bir plandır: ich will, du willst, er will. „möchten“ daha kibardır; bir şey isterken çoğunlukla o kullanılır. Dikkat: „will“ İngilizcedeki gibi gelecek zaman DEĞİLDİR.",
        examples: [
          { de: "Ich will nächstes Jahr Spanisch lernen.", tr: "Seneye İspanyolca öğrenmek istiyorum.", note: "kararlı plan" },
          { de: "Willst du wirklich schon gehen?", tr: "Gerçekten şimdiden gitmek mi istiyorsun?", note: "du willst" },
          { de: "Ich möchte bitte einen Tee.", tr: "Bir çay rica ediyorum.", note: "kibar istek: möchten" },
        ],
      },
    ],
    questions: [
      {
        text: "Hier ___ man nicht parken. Das ist verboten.",
        options: ["soll", "will", "darf"],
        answer: 2,
        explain: "Yasak „nicht dürfen“ ile söylenir: Hier darf man nicht parken.",
      },
      {
        text: "Der Arzt sagt, ich ___ mehr Wasser trinken.",
        options: ["darf", "soll", "will"],
        answer: 1,
        explain: "İstek doktordan geliyor, yani başkasının isteği: sollen.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Er will nächstes Jahr nach Kanada ziehen.",
          "Er wollt nächstes Jahr nach Kanada ziehen.",
          "Er willt nächstes Jahr nach Kanada ziehen.",
        ],
        answer: 0,
        explain: "er ile wollen'in biçimi „will“ olur, ek almaz.",
      },
      {
        kind: "gapfill",
        text: "___ ich kurz dein Handy benutzen? (dürfen)",
        options: [],
        answer: 0,
        accept: ["Darf", "darf"],
        explain: "İzin istemek: Darf ich …? ich ile dürfen'in biçimi darf.",
      },
      {
        kind: "gapfill",
        text: "___ ich dir beim Tragen helfen? (sollen)",
        options: [],
        answer: 0,
        accept: ["Soll", "soll"],
        explain: "„Soll ich …?“ bir yardım teklifidir.",
      },
      {
        kind: "gapfill",
        text: "Meine Kinder ___ im Sommer ans Meer. (wollen)",
        options: [],
        answer: 0,
        accept: ["wollen"],
        explain: "Çoğul özneyle çekimli biçim mastarla aynıdır: sie wollen. Hareket fiili (fahren) söylenmese de anlaşılır.",
      },
      {
        kind: "gapfill",
        text: "Du ___ Oma anrufen, sagt Mama. (sollen)",
        options: [],
        answer: 0,
        accept: ["sollst"],
        explain: "İstek annenden geliyor; du ile sollen'in biçimi sollst.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Am Sonntag", "dürfen", "die Kinder", "länger", "aufbleiben"],
        explain: "Modal fiil ikinci sırada, özne arkasında, asıl fiil mastar olarak en sonda.",
      },
      {
        kind: "truefalse",
        text: "„Du musst hier nicht rauchen.“ „Burada sigara içmek yasak“ demektir. — Bu doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„nicht müssen“ gerek yok demektir; yasak „Du darfst hier nicht rauchen.“ ile söylenir.",
      },
      {
        kind: "truefalse",
        text: "„Soll ich das Fenster zumachen?“ bir teklif olabilir. — Bu doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Soll ich …?“ karşıdakine ne istediğini sorar; çoğu zaman bir yardım teklifidir.",
      },
    ],
  },
];
