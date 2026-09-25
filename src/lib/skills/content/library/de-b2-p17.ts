import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 17.
 *
 * B2 hücresini YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 17 gündelik teknoloji hattı: navigasyonsuz geçen bir hafta üzerine
 * bir blog, akıllı ev üzerine iki sunucunun podcast sohbeti, büyükanneye
 * görüntülü arama tarifi. Dil bilgisi olumsuzlukta modal fiiller — nicht
 * müssen, nicht dürfen, nicht brauchen … zu ve nur brauchen … zu.
 */
export const deB2P17: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r17",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Sieben Tage ohne Navi",
    genre: "blog",
    intro: "Bir blog yazısı: yazar bir hafta boyunca navigasyon kullanmadan şehrinde dolaşıyor ve ne kaybedip ne kazandığını anlatıyor.",
    gloss: [
      { de: "das Navi", tr: "navigasyon", en: "satnav" },
      { de: "merken", tr: "aklında tutmak", en: "to memorize" },
      { de: "die Kreuzung", tr: "kavşak", en: "intersection" },
      { de: "zugeben", tr: "itiraf etmek", en: "to admit" },
      { de: "begleiten", tr: "eşlik etmek", en: "to accompany" },
      { de: "bemerken", tr: "fark etmek", en: "to notice" },
    ],
    minutes: 8,
    text:
      "Sieben Tage ohne Navi\n\n" +
      "Ich wohne seit sechs Jahren in Leipzig und hätte bis vor Kurzem nicht erklären können, wie " +
      "man vom Bahnhof zu meiner Wohnung kommt. Ich bin den Weg hundertmal gegangen, aber immer, " +
      "indem ich einem blauen Punkt auf dem Bildschirm gefolgt bin.\n\n" +
      "Letzte Woche habe ich deshalb ein Experiment gemacht: sieben Tage lang keine Navigation, " +
      "weder zu Fuß noch mit dem Rad. Stattdessen habe ich mir jeden Morgen zwei Minuten lang eine " +
      "Karte angesehen und mir drei Punkte gemerkt: eine Kirche, einen Fluss, eine große Kreuzung.\n\n" +
      "Die ersten beiden Tage waren anstrengend. Am Dienstag bin ich eine halbe Stunde im Kreis " +
      "gelaufen, statt einfach jemanden zu fragen — aus Stolz, wie ich zugeben muss. Am Mittwoch " +
      "habe ich dann gefragt, und eine ältere Dame hat mir den Weg nicht nur erklärt, sondern mich " +
      "bis zur Ecke begleitet.\n\n" +
      "Ab Donnerstag passierte etwas Merkwürdiges. Ich fing an, die Stadt anzusehen, statt nur durch " +
      "sie hindurchzugehen. Mir fiel zum Beispiel eine kleine Bäckerei auf, an der ich jahrelang " +
      "vorbeigelaufen war, ohne sie je zu bemerken.\n\n" +
      "Forscher erklären das so: Das Gehirn lernt einen Weg dadurch, dass es selbst Entscheidungen " +
      "trifft. Wer nur Anweisungen folgt, trifft keine.\n\n" +
      "Inzwischen benutze ich das Navi wieder, aber anders: für fremde Städte, nicht für meine " +
      "eigene. Und ich weiß jetzt, wie ich nach Hause komme.",
    questions: [
      {
        text: "Wie fand die Autorin früher den Weg nach Hause?",
        options: [
          "mit einem alten Stadtplan",
          "durch Fragen bei Nachbarn",
          "nur mit dem Navi im Handy",
        ],
        answer: 2,
        explain: "Yolu yüz kez yürümüş ama hep ekrandaki mavi noktayı izleyerek.",
      },
      {
        text: "Was machte sie jeden Morgen?",
        options: [
          "Sie fuhr eine neue Strecke mit dem Rad.",
          "Sie merkte sich drei Punkte auf einer Karte.",
          "Sie las Artikel über das Gehirn.",
        ],
        answer: 1,
        explain: "Her sabah iki dakika haritaya bakıp üç nokta aklında tutuyordu: kilise, nehir, kavşak.",
      },
      {
        kind: "truefalse",
        text: "Am Dienstag hat die Autorin sofort nach dem Weg gefragt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Salı günü gururundan sormadı ve yarım saat daireler çizdi; sormak çarşambaya kaldı.",
      },
      {
        kind: "gapfill",
        text: "Eine ältere Dame hat sie bis zur ___ begleitet.",
        options: [],
        answer: 0,
        accept: ["Ecke"],
        explain: "„mich bis zur Ecke begleitet“.",
      },
      {
        kind: "short_answer",
        text: "Wofür benutzt sie das Navi heute noch?",
        options: [],
        answer: 0,
        accept: ["für fremde Städte", "fremde Städte", "in fremden Städten"],
        explain: "„für fremde Städte, nicht für meine eigene“.",
      },
      {
        text: "Wie lernt das Gehirn laut Forschern einen Weg?",
        options: [
          "indem es selbst entscheidet",
          "indem es Anweisungen wiederholt",
          "indem es viele Bilder speichert",
        ],
        answer: 0,
        explain: "„dadurch, dass es selbst Entscheidungen trifft“ — yalnız talimat izleyen karar vermez.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l17",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Ein Jahr im vernetzten Zuhause",
    genre: "dialogue",
    intro: "Bir podcast sohbeti: evini bir yıl önce akıllı hâle getiren sunucu bilançosunu anlatıyor, öteki şüpheyle soruyor.",
    gloss: [
      { de: "vernetzen", tr: "ağa bağlamak", en: "to network" },
      { de: "die Heizung", tr: "kalorifer", en: "heating" },
      { de: "steuern", tr: "kontrol etmek", en: "to control" },
      { de: "der Schalter", tr: "şalter", en: "switch" },
      { de: "die Abhängigkeit", tr: "bağımlılık", en: "dependence" },
      { de: "der Lautsprecher", tr: "hoparlör", en: "speaker" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Herr Krüger", text: "Du hast letzten Winter deine ganze Wohnung vernetzt. Wie fällt deine Bilanz nach einem Jahr aus?" },
      { speaker: "Frau Weber", text: "Gemischt, aber eher positiv. Am meisten bringt die Heizung. Sie senkt die Temperatur automatisch, sobald ich das Haus verlasse, ohne dass ich daran denken muss." },
      { speaker: "Frau Weber", text: "Laut meiner Abrechnung habe ich dadurch etwa zwölf Prozent Energie gespart." },
      { speaker: "Herr Krüger", text: "Zwölf Prozent klingt gut. Aber das hättest du auch geschafft, indem du einfach die Heizung herunterdrehst, bevor du gehst." },
      { speaker: "Frau Weber", text: "Theoretisch ja. Praktisch habe ich das zehn Jahre lang nicht gemacht." },
      { speaker: "Herr Krüger", text: "Und was hat nicht funktioniert?" },
      { speaker: "Frau Weber", text: "Das Licht. Statt einen Schalter zu drücken, musste ich dem Lautsprecher etwas sagen, und der hat mich morgens oft nicht verstanden. Nach drei Monaten habe ich die normalen Schalter wieder eingebaut." },
      { speaker: "Herr Krüger", text: "Mich stört vor allem die Abhängigkeit. Letzten Monat war bei dir doch das Internet weg, oder?" },
      { speaker: "Frau Weber", text: "Zwei Tage lang. Die Heizung lief weiter, aber ich konnte sie nicht mehr steuern. Das war ärgerlich, aber nicht schlimm." },
      { speaker: "Herr Krüger", text: "Und weißt du eigentlich, was dein Lautsprecher alles aufnimmt?" },
      { speaker: "Frau Weber", text: "Ehrlich gesagt, nicht genau. Deshalb steht er inzwischen im Flur und nicht mehr im Schlafzimmer." },
      { speaker: "Herr Krüger", text: "Was würdest du jemandem raten, der anfangen will?" },
      { speaker: "Frau Weber", text: "Mit einer einzigen Sache anfangen, die wirklich nervt, statt gleich alles zu vernetzen. Und darauf achten, dass alles auch ohne App funktioniert." },
    ],
    questions: [
      {
        text: "Was hat bei Frau Weber am meisten gebracht?",
        options: ["die automatische Heizung", "das vernetzte Licht", "der neue Lautsprecher"],
        answer: 0,
        explain: "„Am meisten bringt die Heizung“ — yaklaşık yüzde on iki enerji tasarrufu.",
      },
      {
        text: "Was wendet Herr Krüger gegen die zwölf Prozent ein?",
        options: [
          "Die Zahl ist falsch berechnet.",
          "Die Technik ist viel zu teuer.",
          "Das ginge auch ohne Technik.",
        ],
        answer: 2,
        explain: "Çıkmadan önce kaloriferi kısarak aynı tasarruf sağlanabilirdi, diyor.",
      },
      {
        kind: "truefalse",
        text: "Frau Weber hat die normalen Lichtschalter wieder eingebaut.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Nach drei Monaten habe ich die normalen Schalter wieder eingebaut.“",
      },
      {
        kind: "gapfill",
        text: "Das Internet war ___ Tage lang weg.",
        options: [],
        answer: 0,
        accept: ["zwei", "2"],
        explain: "„Zwei Tage lang.“",
      },
      {
        kind: "short_answer",
        text: "Womit sollte man laut Frau Weber anfangen?",
        options: [],
        answer: 0,
        accept: ["mit einer einzigen Sache", "einer einzigen Sache", "mit einer Sache", "eine einzige Sache", "mit einer Sache, die nervt", "mit einer einzigen Sache, die wirklich nervt"],
        explain: "Her şeyi birden değil, gerçekten sinir bozan tek bir şeyle başlamak.",
      },
      {
        text: "Warum hat das Licht nicht gut funktioniert?",
        options: [
          "Die Lampen waren viel zu schwach.",
          "Der Lautsprecher verstand sie nicht.",
          "Die App stürzte ständig wieder ab.",
        ],
        answer: 1,
        explain: "Düğmeye basmak yerine hoparlöre konuşmak gerekiyordu ve o sabahları sık sık anlamıyordu.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w17",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Videoanruf für Oma",
    genre: "email",
    intro: "Büyükannene görüntülü aramayı anlatıyorsun: önce iki cümle kur, sonra sabırlı ve adım adım bir e-posta yaz.",
    gloss: [
      { de: "der Anruf", tr: "telefon araması", en: "phone call" },
      { de: "abnehmen", tr: "telefonu açmak", en: "to answer" },
      { de: "tippen", tr: "dokunmak", en: "to tap" },
      { de: "ausschalten", tr: "kapatmak", en: "to turn off" },
      { de: "der Knopf", tr: "düğme", en: "button" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Yeşil düğmeye basarak aramayı başlatıyorsun.",
        answer: "Du startest den Anruf, indem du auf den grünen Knopf drückst.",
        alternatives: ["Indem du auf den grünen Knopf drückst, startest du den Anruf."],
        hint: "„indem“ yöntemi bildirir (…arak) ve yan cümle kurar: fiil en sonda.",
      },
      {
        kind: "build",
        tr: "Yeni bir şey denemek yerine beni ara.",
        answer: "Ruf mich an, statt etwas Neues auszuprobieren.",
        alternatives: ["Statt etwas Neues auszuprobieren, ruf mich an."],
        hint: "„statt … zu“: iki eylemin öznesi aynı; ayrılabilen fiilde „zu“ araya girer: auszuprobieren.",
      },
      {
        kind: "free",
        prompt:
          "Büyükannen torunlarıyla görüntülü konuşmak istiyor. Ona bir e-posta yaz: neye ihtiyacı olduğunu söyle, aramayı nasıl başlatacağını ve gelen aramayı nasıl açacağını adım adım anlat, sık görülen bir sorunu ve çözümünü yaz, onu cesaretlendir.",
        checklist: [
          "Neye ihtiyacı olduğunu söyle",
          "Aramayı başlatmayı ve açmayı adım adım anlat",
          "Sık görülen bir sorunu ve çözümünü yaz",
          "Onu cesaretlendir",
        ],
        minWords: 120,
        phrases: [
          { de: "So funktioniert es: …", tr: "Şöyle çalışıyor: …", en: "This is how it works: …" },
          { de: "Du …, indem du …", tr: "…arak …yorsun.", en: "You … by …" },
          { de: "Ein häufiges Problem ist, dass …", tr: "Sık görülen bir sorun şu: …", en: "A common problem is that …" },
          { de: "…, ohne es zu merken.", tr: "… farkına varmadan.", en: "… without noticing." },
          { de: "Kaputt machen kannst du nichts!", tr: "Hiçbir şeyi bozamazsın!", en: "You can't break anything!" },
        ],
        sample:
          "Liebe Oma, du hast gefragt, wie du uns sonntags sehen kannst, statt nur mit uns zu telefonieren. " +
          "Das ist ganz leicht, und du brauchst nichts Neues dafür, nur dein Tablet und das WLAN, das Papa dir " +
          "eingerichtet hat. " +
          "So funktioniert es: Öffne die App mit dem grünen Symbol und such meinen Namen. Den Anruf startest du, " +
          "indem du dann auf das kleine Kamerabild oben rechts tippst. Wenn wir dich anrufen, klingelt das " +
          "Tablet, und du nimmst ab, indem du den grünen Kreis nach rechts schiebst. " +
          "Ein häufiges Problem ist, dass wir dich sehen, aber nicht hören. Dann hast du wahrscheinlich das " +
          "Mikrofon ausgeschaltet, ohne es zu merken. Tipp einmal auf das durchgestrichene Mikrofon, dann geht " +
          "es wieder. " +
          "Und wenn gar nichts klappt, ruf mich lieber ganz normal an, statt lange herumzuprobieren. Wir finden " +
          "es zusammen heraus. Hab keine Angst: Kaputt machen kannst du nichts! " +
          "Deine Mira",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s17",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Ein eigenes Smartphone unter vierzehn?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: yasak ile serbestlik arasında işleyen bir yol öner ve bedelini söyle.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Çocukların 14 yaşından önce kendi akıllı telefonu olmalı mı? Sabit bir yaş yerine bir ölçüt öner, çocuğu nasıl koruyacağını anlat, bu yolun bedelini kabul et ve anne babalar için somut bir ilk adım söyle.",
      bulletsTr: [
        "Sabit bir yaş yerine bir ölçüt öner",
        "Korumanın nasıl sağlanacağını anlat",
        "Bu yolun bedelini kabul et",
        "Anne babalar için somut bir ilk adım söyle",
      ],
      targets: [
        { de: "Statt eine feste Altersgrenze festzulegen, würde ich …", tr: "Sabit bir yaş sınırı koymak yerine … yapardım" },
        { de: "Das erreicht man eher, indem …", tr: "Buna daha çok … yoluyla ulaşılır" },
        { de: "Der Preis dafür ist, dass …", tr: "Bunun bedeli şu: …" },
        { de: "Ohne dass …, wird das nicht funktionieren.", tr: "… olmadan bu işlemez" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Statt eine feste Altersgrenze festzulegen, würde ich fragen, wofür ein Kind das Gerät braucht. Ein " +
        "Zehnjähriger, der allein mit dem Bus zur Schule fährt, braucht ein Telefon, mit dem er zu Hause anrufen " +
        "kann. Er braucht aber kein Gerät, mit dem er nachts um zwei Videos schaut. " +
        "Schutz erreicht man eher, indem man die Funktionen begrenzt, als indem man das Gerät verbietet: zuerst " +
        "ein einfaches Handy, später ein Smartphone mit wenigen Apps und festen Zeiten. " +
        "Der Preis dafür ist, dass sich das Kind eine Zeitlang ausgeschlossen fühlt, wenn in der Klassengruppe " +
        "alles über ein Programm läuft, das es nicht hat. Diesen Preis würde ich zahlen, aber nicht allein. " +
        "Ohne dass sich die Eltern einer Klasse absprechen, wird das nicht funktionieren, weil sonst jedes Kind " +
        "das erste mit einem Verbot ist. Mein erster Schritt wäre deshalb ein Elternabend mit einer gemeinsamen Regel.",
      rubricHint:
        "Somut bir ölçüt, açıkça kabul edilen bir bedel ve uygulanabilir bir adım beklenir; „statt … zu“, „indem“ ve „ohne dass“ kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g17",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Du brauchst nur zu tippen",
    genre: "grammar",
    intro: "„Gerek yok“ ile „yasak“ Almancada iki ayrı fiildir; yazılı ve kibar dilde „gerek yok“ çoğu zaman brauchen + zu ile söylenir.",
    focus: "Olumsuzlukta modal fiiller: nicht müssen / nicht brauchen … zu, nicht dürfen ve nur / erst … brauchen zu (A2'deki müssen–dürfen ayrımının bir adım ötesi)",
    gloss: [
      { de: "das Passwort", tr: "şifre", en: "password" },
      { de: "installieren", tr: "yüklemek", en: "to install" },
      { de: "das Update", tr: "güncelleme", en: "update" },
      { de: "tippen", tr: "dokunmak", en: "to tap" },
      { de: "das Konto", tr: "hesap", en: "account" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "nicht müssen ≠ nicht dürfen",
        tr: "A2'de gördüğün ayrımın özü: „nicht müssen“ gerek olmadığını, „nicht dürfen“ yasağı söyler. Türkçede ikisi de olumsuz ekle kurulabildiği için karışır: „şifreyi girmen gerekmiyor“ ile „şifreni kimseye söylememelisin“ Almancada iki ayrı fiildir.",
        examples: [
          { de: "Du musst die App nicht installieren, die Website reicht.", tr: "Uygulamayı yüklemen gerekmiyor, web sitesi yeter.", note: "gerek yok" },
          { de: "Du darfst dein Passwort niemandem sagen.", tr: "Şifreni kimseye söylememelisin.", note: "yasak" },
          { de: "Man muss das Gerät nicht ausschalten, es startet von selbst neu.", tr: "Cihazı kapatmak gerekmiyor, kendi kendine yeniden başlıyor.", note: "gerek yok" },
        ],
      },
      {
        heading: "nicht brauchen … zu = nicht müssen",
        tr: "Yazı dilinde ve kibar anlatımda „nicht müssen“ yerine sık sık „nicht / kein / nichts + brauchen + zu-mastar“ kullanılır; anlam aynıdır. Burada zu'yu atlama: konuşmada zu'suz biçim duyulur ama yazıda hata sayılır. Ayrılabilen fiilde zu araya girer: anzulegen.",
        examples: [
          { de: "Sie brauchen kein neues Konto anzulegen.", tr: "Yeni bir hesap açmanıza gerek yok.", note: "= müssen kein … anlegen" },
          { de: "Du brauchst nicht zu warten, das Update läuft im Hintergrund.", tr: "Beklemene gerek yok, güncelleme arka planda çalışıyor.", note: "zu zorunlu" },
          { de: "Wir brauchen dafür nichts zu bezahlen.", tr: "Bunun için hiçbir şey ödememize gerek yok.", note: "nichts + brauchen zu" },
        ],
      },
      {
        heading: "Olumlu cümlede yalnız nur ve erst ile",
        tr: "„brauchen … zu“ olumlu cümlede yalnız „nur“ (yalnızca) ya da „erst“ (ancak, daha önce değil) ile gelir: „Du brauchst nur zu tippen.“ Düz bir zorunluluk için „müssen“ kullanılır; „Du brauchst das Update zu installieren“ denmez.",
        examples: [
          { de: "Du brauchst nur auf das grüne Feld zu tippen.", tr: "Yalnızca yeşil alana dokunman yeterli.", note: "nur + brauchen zu" },
          { de: "Sie brauchen erst morgen zu antworten.", tr: "Yarından önce cevap vermenize gerek yok.", note: "erst: daha önce değil" },
          { de: "Du musst das Update heute installieren.", tr: "Güncellemeyi bugün yüklemen gerekiyor.", note: "düz zorunluluk: müssen" },
        ],
      },
    ],
    questions: [
      {
        text: "Die Website reicht, du ___ die App nicht installieren.",
        options: ["darfst", "musst", "willst"],
        answer: 1,
        explain: "Web sitesi yetiyor, yani gerek yok: nicht müssen. „nicht dürfen“ yasak olurdu.",
      },
      {
        text: "„Sie brauchen kein neues Konto anzulegen.“ — Was bedeutet das?",
        options: [
          "Ein neues Konto ist nicht nötig.",
          "Ein neues Konto ist verboten.",
          "Ein neues Konto kostet Geld.",
        ],
        answer: 0,
        explain: "„kein … brauchen zu“ = „kein … müssen“: gerek yok, yasak değil.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Du brauchst nur auf das Feld tippen.",
          "Du brauchst das Update zu installieren.",
          "Du brauchst nur auf das Feld zu tippen.",
        ],
        answer: 2,
        explain: "Olumlu cümlede „brauchen … zu“ yalnız „nur“ ile gelir ve yazıda zu atlanmaz.",
      },
      {
        kind: "gapfill",
        text: "Du ___ dein Passwort niemandem sagen.",
        options: [],
        answer: 0,
        accept: ["darfst", "sollst", "solltest"],
        explain: "Şifreyi paylaşmak yasak: nicht dürfen (burada niemandem ile).",
      },
      {
        kind: "gapfill",
        text: "Du brauchst nicht ___ warten, das Update läuft im Hintergrund.",
        options: [],
        answer: 0,
        accept: ["zu"],
        explain: "„nicht brauchen“ modal gibi kullanılınca mastar zu ile gelir.",
      },
      {
        kind: "gapfill",
        text: "Wir ___ dafür nichts zu bezahlen. (brauchen)",
        options: [],
        answer: 0,
        accept: ["brauchen"],
        explain: "„nichts + brauchen zu“: ödemeye gerek yok.",
      },
      {
        kind: "gapfill",
        text: "Man ___ das Gerät nicht ausschalten, es startet von selbst neu. (müssen)",
        options: [],
        answer: 0,
        accept: ["muss"],
        explain: "Kapatmak yasak değil, yalnız gereksiz: nicht müssen, man → muss.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Sie", "brauchen", "erst", "morgen", "zu", "antworten"],
        explain: "„brauchen“ ikinci sırada, „erst“ zamanın önünde, zu-mastar en sonda.",
      },
      {
        kind: "truefalse",
        text: "„Die Website reicht, du darfst die App nicht installieren.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Anlam „gerek yok“; bu yüzden „musst … nicht“ ya da „brauchst … nicht zu“ gerekir.",
      },
      {
        kind: "truefalse",
        text: "„Sie brauchen das Formular nicht auszudrucken.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„nicht brauchen … zu“ doğru; ayrılabilen fiilde zu araya girer: auszudrucken.",
      },
    ],
  },
];
