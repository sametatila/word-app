import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 37 — "Kim yaptı, kim yapmadı" (dersler 145–148).
 *
 * Dersler: Putzen teilen · Einen Einbruch melden · Eine Grafik lesen ·
 * Alte Technik.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   öznesiz edilgen  Almanca ÖZNESİ OLMAYAN bir edilgen kurabilir:
 *                    "Bei mir wurde eingebrochen" — eyleyen yok, nesne de
 *                    yok, cümle yine de tam. Türkçede edilgen bir özne
 *                    ister ('evime girildi' bile bir şeyi özne yapar),
 *                    o yüzden öğrenci kendini özne yapıyor:
 *                    "Ich wurde eingebrochen" — yani kendisi kırılmış olur.
 *   auch / nur'un    Türkçede 'de/da' bir ektir ve daima ilgili sözcüğün
 *   yeri             ARDINA gelir ('ben de gördüm'). Almancada auch ve nur
 *                    vurguladıkları öğenin ÖNÜNE gelir ve yeri değişince
 *                    anlam değişir: "Ich habe auch das Bild gesehen"
 *                    ≠ "Auch ich habe das Bild gesehen".
 *
 * Yeni 32 kelime: das Waschmittel, der Staub, der Schmutz, der Dreck,
 * feucht, gründlich, glatt, die Couch, der Einbruch, der Einbrecher,
 * einbrechen, stehlen, die Gewalt, der Täter, der Dieb, sichtbar,
 * die Grafik, die Zeichnung, die Abbildung, die Darstellung, das Symbol,
 * das Kreuz, vergrößern, die Zeile, die Kassette, der Sender, senden,
 * das Studio, der Hörer, vorläufig, mittlerweile, umgekehrt.
 */
export const b1U37: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u37-r1",
    level: "B1",
    skill: "reading",
    unit: 37,
    title: "Wer putzt was?",
    genre: "Ev arkadaşı anlaşması",
    intro: "Ortak evde temizlik paylaşımı. Kim ne yapıyor, kim ne yapmıyor?",
    minutes: 5,
    gloss: [
      { de: "der Staub", tr: "toz", en: "dust" },
      { de: "der Schmutz", tr: "kir", en: "dirt" },
      { de: "gründlich", tr: "iyice", en: "thoroughly" },
      { de: "feucht", tr: "nemli", en: "damp" },
      { de: "das Waschmittel", tr: "deterjan", en: "detergent" },
    ],
    text:
      "Wir haben lange diskutiert und dann einen Plan gemacht. Er hängt " +
      "an der Tür und hat drei Zeilen: Küche, Bad, Flur.\n\n" +
      "Die Küche macht jede Woche eine andere Person, und zwar gründlich — " +
      "nicht nur feucht drüberwischen. Der Schmutz auf dem Boden ist das " +
      "eine, der Staub oben auf dem Schrank das andere. Beides gehört dazu.\n\n" +
      "Das Bad ist die kürzeste Arbeit und trotzdem die schlimmste. " +
      "Wir machen es abwechselnd, und wer es macht, kauft auch das " +
      "Waschmittel. So merkt jeder, wie schnell das leer wird.\n\n" +
      "Für die Couch im Flur gilt eine andere Regel: Wer dort isst, räumt " +
      "sofort auf. Nicht am Abend, sofort. Der Rest hat mittlerweile ganz " +
      "gut funktioniert, aber das war der Punkt, an dem es immer wieder " +
      "Streit gab.",
    questions: [
      {
        text: "Wo hängt der Plan?",
        options: ["An der Tür", "In der Küche", "Im Bad"],
        answer: 0,
        explain: "„Er hängt an der Tür und hat drei Zeilen: Küche, Bad, Flur.“",
      },
      {
        text: "Was gehört beim Küchenputzen dazu?",
        options: ["Nur der Boden", "Boden und Staub oben", "Nur der Schrank"],
        answer: 1,
        explain: "„Der Schmutz auf dem Boden ist das eine, der Staub oben auf dem Schrank das andere.“",
      },
      {
        text: "Wer kauft das Waschmittel?",
        options: ["Wer das Bad macht", "Alle zusammen", "Niemand"],
        answer: 0,
        explain: "„… wer es macht, kauft auch das Waschmittel.“",
      },
      {
        kind: "gapfill",
        text: "Die Küche macht jede Woche eine andere Person, und zwar gründlich — nicht ___ feucht drüberwischen.",
        options: [],
        answer: 0,
        accept: ["nur"],
        explain: "„nur“ vurguladığı öğenin ÖNÜNE gelir: nur feucht.",
      },
      {
        kind: "short_answer",
        text: "Welche Regel gilt für die Couch?",
        options: [],
        answer: 0,
        accept: ["sofort aufräumen", "sofort", "wer isst, räumt auf"],
        explain: "„Wer dort isst, räumt sofort auf. Nicht am Abend, sofort.“",
      },
    ],
  },
  {
    id: "b1-u37-r2",
    level: "B1",
    skill: "reading",
    unit: 37,
    title: "Nach dem Einbruch",
    genre: "Bilgilendirme metni",
    intro: "Eve hırsız girmiş. İlk saatlerde ne yapılır?",
    minutes: 5,
    gloss: [
      { de: "der Einbruch", tr: "hırsızlık (eve girme)", en: "burglary" },
      { de: "einbrechen", tr: "eve girmek", en: "to break in" },
      { de: "stehlen", tr: "çalmak", en: "to steal" },
      { de: "der Täter", tr: "fail", en: "perpetrator" },
      { de: "sichtbar", tr: "görünür", en: "visible" },
    ],
    text:
      "Wenn bei Ihnen eingebrochen wurde, gehen Sie nicht sofort in die Wohnung. " +
      "Rufen Sie von draußen an und warten Sie. Die meisten Täter sind " +
      "schon lange weg, aber sicher wissen Sie das nicht.\n\n" +
      "Räumen Sie nichts auf. Jeder sichtbare Fingerabdruck kann helfen, " +
      "und einmal geputzt ist er weg. Das fällt schwer, weil man den " +
      "Dreck sofort loswerden will.\n\n" +
      "Schreiben Sie auf, was gestohlen wurde. Nicht nur die teuren " +
      "Sachen — auch alte Kassetten, alte Papiere, Kleinigkeiten. " +
      "Die Versicherung fragt später genau danach.\n\n" +
      "Vorläufig sollten Sie nicht allein schlafen, wenn es Ihnen " +
      "schwerfällt. Das ist keine Schwäche. Bei einem Einbruch wird " +
      "fast nie Gewalt gebraucht, aber das Gefühl bleibt trotzdem lange.",
    questions: [
      {
        text: "Was soll man zuerst tun?",
        options: ["Sofort in die Wohnung gehen", "Von draußen anrufen und warten", "Aufräumen"],
        answer: 1,
        explain: "„Rufen Sie von draußen an und warten Sie.“",
      },
      {
        text: "Warum soll man nichts aufräumen?",
        options: ["Wegen der Versicherung", "Wegen der Fingerabdrücke", "Wegen der Nachbarn"],
        answer: 1,
        explain: "„Jeder sichtbare Fingerabdruck kann helfen, und einmal geputzt ist er weg.“",
      },
      {
        text: "Was soll man aufschreiben?",
        options: ["Nur die teuren Sachen", "Alles, auch Kleinigkeiten", "Nichts"],
        answer: 1,
        explain: "„Nicht nur die teuren Sachen — auch alte Kassetten, alte Papiere, Kleinigkeiten.“",
      },
      {
        kind: "gapfill",
        text: "Wenn bei Ihnen ___ ___, gehen Sie nicht sofort in die Wohnung.",
        options: [],
        answer: 0,
        accept: ["eingebrochen wurde"],
        explain: "Öznesiz edilgen: „bei Ihnen wurde eingebrochen“ — özne yok.",
      },
      {
        kind: "short_answer",
        text: "Was wird bei einem Einbruch fast nie gebraucht?",
        options: [],
        answer: 0,
        accept: ["Gewalt", "die Gewalt"],
        explain: "„Bei einem Einbruch wird fast nie Gewalt gebraucht …“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u37-l1",
    level: "B1",
    skill: "listening",
    unit: 37,
    title: "Was zeigt die Grafik?",
    genre: "Sunum konuşması",
    intro: "Bir grafik okunuyor. Hangi işaret ne demek?",
    minutes: 4,
    gloss: [
      { de: "die Grafik", tr: "grafik", en: "chart" },
      { de: "die Darstellung", tr: "gösterim", en: "representation" },
      { de: "das Symbol", tr: "simge", en: "symbol" },
      { de: "vergrößern", tr: "büyütmek", en: "to enlarge" },
    ],
    segments: [
      { text: "Können Sie die Grafik kurz vergrößern? Ich sehe die Zeilen nicht." },
      { text: "Natürlich. So besser?" },
      { text: "Ja, danke. Was bedeutet das Kreuz oben rechts?" },
      { text: "Das Symbol steht für fehlende Werte, nicht für null." },
      { text: "Gut zu wissen. Das ist ein wichtiger Unterschied." },
      { text: "Genau. Und die Darstellung zeigt nur die letzten fünf Jahre." },
      { text: "Also nicht die ganze Zeit. Gibt es eine Abbildung davor?" },
      { text: "Ja, auf der nächsten Seite. Die zeigt zwanzig Jahre." },
    ],
    questions: [
      {
        text: "Warum soll die Grafik vergrößert werden?",
        options: ["Sie ist zu klein für die Zeilen", "Sie ist alt", "Sie ist falsch"],
        answer: 0,
        explain: "„Können Sie die Grafik kurz vergrößern? Ich sehe die Zeilen nicht.“",
      },
      {
        text: "Was bedeutet das Kreuz?",
        options: ["Null", "Fehlende Werte", "Einen Fehler"],
        answer: 1,
        explain: "„Das Symbol steht für fehlende Werte, nicht für null.“",
      },
      {
        text: "Wie viele Jahre zeigt die nächste Abbildung?",
        options: ["Fünf", "Zwanzig", "Zehn"],
        answer: 1,
        explain: "„Ja, auf der nächsten Seite. Die zeigt zwanzig Jahre.“",
      },
      {
        kind: "gapfill",
        text: "Die Darstellung zeigt ___ die letzten fünf Jahre.",
        options: [],
        answer: 0,
        accept: ["nur"],
        explain: "„nur“ hangi öğeyi sınırlıyorsa onun önünde durur.",
      },
      {
        kind: "short_answer",
        text: "Wo ist die andere Abbildung?",
        options: [],
        answer: 0,
        accept: ["auf der nächsten Seite", "nächste Seite"],
        explain: "„Ja, auf der nächsten Seite.“",
      },
    ],
  },
  {
    id: "b1-u37-l2",
    level: "B1",
    skill: "listening",
    unit: 37,
    title: "Die alten Kassetten",
    genre: "Eski teknoloji sohbeti",
    intro: "Eski kayıtlar konuşuluyor. Kim ne saklamış?",
    minutes: 4,
    gloss: [
      { de: "die Kassette", tr: "kaset", en: "cassette" },
      { de: "der Sender", tr: "radyo istasyonu", en: "station" },
      { de: "der Hörer", tr: "dinleyici", en: "listener" },
      { de: "mittlerweile", tr: "artık", en: "by now" },
    ],
    segments: [
      { text: "Im Keller stehen noch zwei Kisten mit Kassetten." },
      { text: "Wirklich? Kann man die mittlerweile überhaupt noch hören?" },
      { text: "Mit dem alten Gerät schon. Es funktioniert sogar noch." },
      { text: "Was ist denn darauf?" },
      { text: "Musik aus dem Radio. Ich habe damals den Sender aufgenommen." },
      { text: "Auch die Stimme der Moderatorin?" },
      { text: "Ja, und die Werbung. Das ist heute fast das Beste." },
      { text: "Umgekehrt als früher: damals hat die Werbung nur gestört." },
    ],
    questions: [
      {
        text: "Wo stehen die Kassetten?",
        options: ["Im Keller", "Im Studio", "Im Flur"],
        answer: 0,
        explain: "„Im Keller stehen noch zwei Kisten mit Kassetten.“",
      },
      {
        text: "Was ist auf den Kassetten?",
        options: ["Musik aus dem Radio", "Gespräche", "Nichts"],
        answer: 0,
        explain: "„Musik aus dem Radio. Ich habe damals den Sender aufgenommen.“",
      },
      {
        text: "Was ist heute fast das Beste?",
        options: ["Die Musik", "Die Werbung", "Die Stimme"],
        answer: 1,
        explain: "„Ja, und die Werbung. Das ist heute fast das Beste.“",
      },
      {
        kind: "gapfill",
        text: "___ die Stimme der Moderatorin?",
        options: [],
        answer: 0,
        accept: ["Auch"],
        explain: "„Auch“ vurguladığı öğenin önünde: auch die Stimme.",
      },
      {
        kind: "short_answer",
        text: "Was hat die Werbung damals gemacht?",
        options: [],
        answer: 0,
        accept: ["gestört", "sie hat gestört", "nur gestört"],
        explain: "„… damals hat die Werbung nur gestört.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u37-w1",
    level: "B1",
    skill: "writing",
    unit: 37,
    title: "Einen Einbruch melden",
    genre: "Resmî bildirim",
    intro: "Bir hırsızlığı bildir. Almanca öznesiz edilgen kurabilir.",
    minutes: 8,
    gloss: [
      { de: "der Einbrecher", tr: "eve giren hırsız", en: "burglar" },
      { de: "der Dieb", tr: "hırsız", en: "thief" },
      { de: "die Gewalt", tr: "şiddet", en: "force" },
      { de: "vorläufig", tr: "şimdilik", en: "for the time being" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Dün gece evime girildi.",
        answer: "Gestern Nacht wurde bei mir eingebrochen.",
        hint: "Öznesiz edilgen: bei mir wurde eingebrochen.",
      },
      {
        kind: "build",
        tr: "Dizüstü bilgisayarım ve iki kutu çalındı.",
        answer: "Mein Laptop und zwei Kisten wurden gestohlen.",
        hint: "Burada gerçek özne var → çoğul fiil.",
      },
      {
        kind: "build",
        tr: "Şimdilik hiçbir şeye dokunmadım.",
        answer: "Vorläufig habe ich nichts angefasst.",
        hint: "Zaman zarfı öne alınınca fiil ikinci sırada.",
      },
      {
        kind: "form",
        prompt: "Bildirim kartını doldur.",
        facts: "Bildiren: Sedef Aydın; olay: eve girme; zaman: dün gece; çalınan: dizüstü ve iki kutu; şiddet: yok.",
        fields: [
          { label: "Name", answer: "Sedef Aydın", accept: ["Sedef", "Aydın"] },
          { label: "Vorfall", answer: "Einbruch", accept: ["ein Einbruch", "der Einbruch"] },
          { label: "Zeit", answer: "gestern Nacht", accept: ["in der Nacht", "gestern"] },
          { label: "Gestohlen", answer: "Laptop und zwei Kisten", accept: ["Laptop", "ein Laptop, zwei Kisten"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Edilgen cümlenin öznesini düzelt.",
        source: "Ich wurde gestern eingebrochen und mein Laptop wurde gestohlen.",
        answer: "Bei mir wurde gestern eingebrochen und mein Laptop wurde gestohlen.",
        why: "Türkçede edilgen daima bir özne ister ('evime girildi' bile evi özne yapar), o yüzden Almancada konuşan kendini özne yapıyor — ama 'ich wurde eingebrochen' KİŞİNİN kırıldığını söyler. Almanca özneSİZ edilgen kurabilir: eyleyen de nesne de yoktur, cümle yine tamdır — bei mir wurde eingebrochen, hier wird gearbeitet, heute wird nicht geputzt.",
      },
    ],
  },
  {
    id: "b1-u37-w2",
    level: "B1",
    skill: "writing",
    unit: 37,
    title: "Der Putzplan",
    genre: "Ev içi anlaşma",
    intro: "Bir temizlik planı yaz. 'de/da' Almancada sözcüğün önüne geçer.",
    minutes: 12,
    gloss: [
      { de: "der Dreck", tr: "pislik", en: "muck" },
      { de: "gründlich", tr: "iyice", en: "thoroughly" },
      { de: "die Couch", tr: "kanepe", en: "couch" },
      { de: "glatt", tr: "kaygan / düz", en: "smooth" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Ben de banyoyu temizliyorum.",
        answer: "Auch ich putze das Bad.",
        hint: "Vurgu BEN'de → auch özneden önce.",
      },
      {
        kind: "build",
        tr: "Ben banyoyu da temizliyorum.",
        answer: "Ich putze auch das Bad.",
        hint: "Vurgu BANYO'da → auch nesneden önce.",
      },
      {
        kind: "free",
        prompt: "Ortak bir evde temizlik planı yaz: hangi alanlar var, kim ne yapıyor, hangi sıklıkta, hangi kural en çok tartışma yaratıyor ve bunu nasıl çözdünüz. En az iki 'auch' ya da 'nur' cümlesi kullan ve yerlerine dikkat et.",
        checklist: [
          "Alanlar sayılmış mı?",
          "Kimin ne yaptığı net mi?",
          "Sıklık verilmiş mi?",
          "Tartışmalı bir nokta ve çözümü var mı?",
          "auch/nur doğru yerde kullanılmış mı?",
        ],
        minWords: 70,
        sample:
          "Wir wohnen zu dritt und haben drei Bereiche: Küche, Bad und Flur.\n\n" +
          "Die Küche macht jede Woche eine andere Person, und zwar gründlich. " +
          "Nicht nur feucht drüberwischen — der Staub oben auf dem Schrank " +
          "gehört dazu. Das Bad machen wir abwechselnd, und wer es macht, " +
          "kauft auch das Waschmittel.\n\n" +
          "Der Flur war lange das Problem. Auf der Couch wird gegessen, und " +
          "am nächsten Morgen liegt der Dreck noch da. Auch ich habe das " +
          "früher gemacht, das gebe ich zu.\n\n" +
          "Mittlerweile gilt eine einfache Regel: Wer dort isst, räumt " +
          "sofort auf. Nicht am Abend, sofort. Seitdem gibt es fast keinen " +
          "Streit mehr — und wir putzen alle nur halb so oft wie vorher.",
        phrases: [
          { de: "und zwar gründlich", tr: "hem de iyice", en: "and thoroughly at that" },
          { de: "Auch ich habe das gemacht.", tr: "Ben de yapmıştım.", en: "I did that too." },
          { de: "Wer dort isst, räumt sofort auf.", tr: "Orada yiyen hemen toplar.", en: "Whoever eats there tidies up straight away." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„auch“ ve „nur“un yerini anlamına göre düzelt.",
        source: "Ich auch putze das Bad, und ich putze die Küche nur.",
        answer: "Auch ich putze das Bad, und ich putze nur die Küche.",
        why: "Türkçede 'de/da' bir EKTİR ve daima ilgili sözcüğün ARDINA gelir ('ben de'), o yüzden Almancada da sözcüğün arkasına konuyor. Almancada auch ve nur vurguladıkları öğenin ÖNÜNE gelir — ve yeri değişince anlam değişir: 'Auch ich putze das Bad' (başkaları da yapıyor) ≠ 'Ich putze auch das Bad' (başka yerleri de yapıyorum).",
      },
    ],
  },
];
