import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 18.
 *
 * Hücreyi YİRMİYE tamamlayan partilerden biri (11–20). Kurallar ve emsal:
 * `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 18 paylaşım ve sahiplik hattı: bir ödünç dükkânının blog bilançosu,
 * iki podcast sunucusunun tartışması, mahalle meclisine bir tasarı. Dil
 * bilgisi bekommen-edilgeni (Rezipientenpassiv) — işin nesnesi değil alıcısı
 * özne olur: Das Mitglied bekommt eine Erinnerung geschickt.
 */
export const deC1P18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r18",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Ein Jahr Leihladen: eine Bilanz",
    genre: "blog",
    intro: "Bir mahalle ödünç dükkânının blog yazısı: bir yılın sonunda ne işe yaradı, ne işe yaramadı.",
    gloss: [
      { de: "ausleihen", tr: "ödünç almak", en: "to borrow" },
      { de: "der Mitgliedsbeitrag", tr: "üyelik aidatı", en: "membership fee" },
      { de: "spenden", tr: "bağış yapmak", en: "to donate" },
      { de: "die Ausleihe", tr: "ödünç verme", en: "loan" },
      { de: "die Verspätung", tr: "gecikme", en: "delay" },
      { de: "die Bilanz", tr: "bilanço", en: "review, assessment" },
    ],
    minutes: 10,
    text:
      "Ein Jahr Leihladen: eine Bilanz\n\n" +
      "Vor genau einem Jahr haben wir in der ehemaligen Bäckerei am Marktplatz den Leihladen " +
      "eröffnet. Die Idee war schlicht: Wer eine Bohrmaschine, ein Zelt oder ein Waffeleisen " +
      "nur zweimal im Jahr braucht, soll es nicht kaufen müssen, sondern ausleihen können, und " +
      "zwar gegen einen Mitgliedsbeitrag von zwei Euro im Monat.\n\n" +
      "Die Zahlen zuerst. Wir haben inzwischen 412 Mitglieder und rund 600 Gegenstände, fast " +
      "alle gespendet. Am häufigsten ausgeliehen wurden der Hochdruckreiniger, das " +
      "Raclette-Gerät und, zu unserer Überraschung, eine Nähmaschine, die seit März nie länger " +
      "als zwei Tage im Regal stand.\n\n" +
      "Was nicht funktioniert hat, gehört ebenso in eine Bilanz. Unsere Annahme, dass die " +
      "Leute Dinge zurückbringen, ohne dass man sie daran erinnern muss, war zu optimistisch. " +
      "Etwa jede zehnte Ausleihe kam verspätet zurück, einige gar nicht. Gelöst haben wir das " +
      "nicht, indem wir Strafen eingeführt haben, sondern dadurch, dass jetzt am Tag vor jeder " +
      "Rückgabe eine kurze Erinnerung verschickt wird. Seitdem sind die Verspätungen um mehr als die " +
      "Hälfte zurückgegangen.\n\n" +
      "Überrascht hat uns auch, wer kommt. Wir hatten mit Studierenden gerechnet; gekommen " +
      "sind vor allem Familien und ältere Menschen. Viele bleiben nach der Rückgabe noch eine " +
      "halbe Stunde, statt gleich wieder zu gehen. Der Laden ist, ohne dass wir es geplant " +
      "hätten, zu einem Treffpunkt geworden.\n\n" +
      "Ob wir damit wirklich etwas für die Umwelt tun, können wir nicht beweisen. Wer eine " +
      "Bohrmaschine leiht, statt sie zu kaufen, spart zwar ein Gerät, fährt aber vielleicht mit " +
      "dem Auto zu uns. Ehrlich gesagt ist die Umweltbilanz das, was wir am wenigsten messen " +
      "können, und zugleich das, wonach wir am häufigsten gefragt werden.\n\n" +
      "Im zweiten Jahr wollen wir die Öffnungszeiten verlängern. Dafür brauchen wir vor allem " +
      "eines: Menschen, die samstags zwei Stunden hinter der Theke stehen.",
    questions: [
      {
        text: "Was kostet die Mitgliedschaft?",
        options: ["gar nichts", "zehn Euro im Jahr", "zwei Euro im Monat"],
        answer: 2,
        explain: "„gegen einen Mitgliedsbeitrag von zwei Euro im Monat“.",
      },
      {
        text: "Wie wurde das Problem der Verspätungen gelöst?",
        options: [
          "mit neuen Strafgebühren",
          "mit einer Nachricht am Vortag",
          "mit kürzeren Leihfristen",
        ],
        answer: 1,
        explain: "Ceza getirilmedi; her ödünç işlemi artık bir gün önce kısa bir mesajla hatırlatılıyor.",
      },
      {
        kind: "truefalse",
        text: "Der Leihladen wird vor allem von Studierenden genutzt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Öğrenci bekliyorlardı; gelenler çoğunlukla aileler ve yaşlılar oldu.",
      },
      {
        kind: "gapfill",
        text: "Etwa jede ___ Ausleihe kam verspätet zurück.",
        options: [],
        answer: 0,
        accept: ["zehnte", "10."],
        explain: "„Etwa jede zehnte Ausleihe kam verspätet zurück.“",
      },
      {
        kind: "short_answer",
        text: "Was ist der Laden geworden, ohne dass es geplant war?",
        options: [],
        answer: 0,
        accept: ["ein Treffpunkt", "Treffpunkt", "ein Ort zum Treffen"],
        explain: "İnsanlar iadeden sonra yarım saat daha kalıyor; dükkân bir buluşma yeri olmuş.",
      },
      {
        text: "Was kann der Leihladen am wenigsten messen?",
        options: [
          "die Umweltbilanz",
          "die Zahl der Mitglieder",
          "die beliebtesten Geräte",
        ],
        answer: 0,
        explain: "En az ölçebildikleri ve en sık sorulan şey çevreye etkisi.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l18",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Podcast: Besitzen wir zu viel?",
    genre: "dialogue",
    intro: "İki podcast sunucusu tartışıyor: sahip olmak mı, paylaşmak mı; paylaşmanın görünmeyen maliyetleri neler.",
    gloss: [
      { de: "besitzen", tr: "sahip olmak", en: "to own" },
      { de: "die Selbstverständlichkeit", tr: "doğallık", en: "matter of course" },
      { de: "die Abhängigkeit", tr: "bağımlılık", en: "dependency" },
      { de: "verlässlich", tr: "güvenilir", en: "reliable" },
      { de: "sich abnutzen", tr: "aşınmak", en: "to wear out" },
      { de: "die Verfügbarkeit", tr: "kullanılabilirlik", en: "availability" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Lea", text: "Jonas, du hast letzte Woche erzählt, dass du dein Auto verkauft hast. Vermisst du es?" },
      { speaker: "Jonas", text: "Seltener, als ich dachte. Was ich vermisse, ist nicht das Fahren, sondern die Selbstverständlichkeit. Früher habe ich mich einfach ins Auto gesetzt, heute plane ich." },
      { speaker: "Lea", text: "Und genau das ist für mich der Haken am Teilen. Man spart Geld und Platz, aber man bezahlt mit Planung und mit Abhängigkeit von anderen." },
      { speaker: "Jonas", text: "Stimmt, aber du rechnest den Aufwand beim Besitzen nicht mit: Reparaturen, Versicherung, Parkplatzsuche. Das ist auch Planung, sie fühlt sich nur nicht so an." },
      { speaker: "Lea", text: "Mag sein. Trotzdem gibt es Dinge, die ich nicht teilen möchte, mein Fahrrad zum Beispiel. Es ist auf mich eingestellt, und ich weiß, wie verlässlich die Bremsen sind." },
      { speaker: "Jonas", text: "Da hast du einen wichtigen Punkt. Geteilte Dinge nutzen sich schneller ab, weil sich niemand für sie verantwortlich fühlt. Diese Abnutzung steht in keiner Rechnung." },
      { speaker: "Lea", text: "Es gibt Untersuchungen dazu. Bei geteilten Rädern ist die Lebensdauer deutlich kürzer als bei privaten, teilweise beträgt sie nur ein Drittel." },
      { speaker: "Jonas", text: "Dann lautet die Frage vielleicht nicht: besitzen oder teilen, sondern welche Dinge sich überhaupt für das Teilen eignen." },
      { speaker: "Lea", text: "Mein Vorschlag wäre: Dinge, die man selten braucht und bei denen die Verfügbarkeit nicht kritisch ist. Eine Leiter, ja. Ein Kinderwagen um sieben Uhr morgens, nein." },
      { speaker: "Jonas", text: "Und das Auto?" },
      { speaker: "Lea", text: "Das hängt davon ab, ob du es brauchst, um zur Arbeit zu kommen, oder nur, um am Wochenende an den See zu fahren. Für Letzteres ist Teilen fast unschlagbar." },
      { speaker: "Jonas", text: "Dann habe ich wohl alles richtig gemacht, ohne es zu wissen." },
    ],
    questions: [
      {
        text: "Was vermisst Jonas seit dem Verkauf seines Autos?",
        options: ["die Selbstverständlichkeit", "das Fahren selbst", "seinen Parkplatz"],
        answer: 0,
        explain: "Özlediği şey sürmek değil, düşünmeden arabaya binebilmenin rahatlığı.",
      },
      {
        text: "Was ist für Lea der Haken am Teilen?",
        options: ["die höheren Kosten", "der fehlende Platz", "Planung und Abhängigkeit"],
        answer: 2,
        explain: "Para ve yer kazanılıyor ama bedeli planlama ve başkalarına bağımlılıkla ödeniyor.",
      },
      {
        kind: "truefalse",
        text: "Laut Jonas steht die Abnutzung geteilter Dinge in keiner Rechnung.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Kimse sorumlu hissetmediği için paylaşılan eşya daha çabuk aşınıyor ve bu hesaba girmiyor.",
      },
      {
        kind: "gapfill",
        text: "Geteilte Räder halten teilweise nur ein ___ so lange wie private.",
        options: [],
        answer: 0,
        accept: ["Drittel"],
        explain: "„teilweise beträgt sie nur ein Drittel“.",
      },
      {
        kind: "short_answer",
        text: "Welches Ding möchte Lea nicht teilen?",
        options: [],
        answer: 0,
        accept: ["ihr Fahrrad", "das Fahrrad", "Fahrrad"],
        explain: "Bisiklet ona göre ayarlı ve frenlerine güveniyor.",
      },
      {
        text: "Wofür ist Teilen laut Lea fast unschlagbar?",
        options: [
          "für den Weg zur Arbeit",
          "für Ausflüge am Wochenende",
          "für den Kinderwagen morgens",
        ],
        answer: 1,
        explain: "Hafta sonu göle gitmek gibi seyrek ihtiyaçlarda paylaşmak neredeyse rakipsiz.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w18",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Konzept für einen Leihladen im Viertel",
    genre: "formal",
    intro: "Mahalle meclisine yazıyorsun: önce iki cümle kur, sonra bir ödünç dükkânı fikrini amacı, işleyişi ve riskleriyle anlatan kısa bir tasarı yaz.",
    gloss: [
      { de: "der Quartiersrat", tr: "mahalle meclisi", en: "neighborhood council" },
      { de: "die Räumlichkeit", tr: "mekân", en: "premises" },
      { de: "ehrenamtlich", tr: "gönüllü", en: "voluntary" },
      { de: "die Kaution", tr: "depozito", en: "deposit" },
      { de: "der Zuschuss", tr: "sübvansiyon", en: "subsidy" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Her üyeye iadeden bir gün önce bir hatırlatma gönderilir.",
        answer: "Jedes Mitglied bekommt am Vortag der Rückgabe eine Erinnerung geschickt.",
        alternatives: ["Am Vortag der Rückgabe bekommt jedes Mitglied eine Erinnerung geschickt."],
        hint: "bekommen-edilgeninde alıcı özne olur; „bekommen“ çekimlenir, asıl fiilin Partizip II'si sona gider.",
      },
      {
        kind: "build",
        tr: "Rafları bir marangozhaneden hediye olarak aldık.",
        answer: "Die Regale haben wir von einer Schreinerei geschenkt bekommen.",
        alternatives: ["Wir haben die Regale von einer Schreinerei geschenkt bekommen."],
        hint: "Perfekt'te iki fiil sondadır: önce asıl fiilin Partizip II'si, en sonda „bekommen“.",
      },
      {
        kind: "free",
        prompt:
          "Mahalle meclisine, boş bir dükkânda bir ödünç dükkânı açmak için bir tasarı yaz: amacı ve hedef kitleyi tanımla, işleyişi iki üç somut adımla anlat, en büyük riski ve ona karşı önlemini yaz, meclisten ne istediğini açıkça belirt ve kısa bir kapanışla bitir.",
        checklist: [
          "Amacı ve hedef kitleyi tanımla",
          "İşleyişi somut adımlarla anlat",
          "En büyük riski ve önlemini yaz",
          "Meclisten ne istediğini açıkça belirt",
        ],
        minWords: 150,
        phrases: [
          { de: "Mit diesem Konzept beantragen wir …", tr: "Bu tasarıyla … talep ediyoruz", en: "With this proposal we apply for …" },
          { de: "Ziel ist es, … zu ermöglichen, ohne dass …", tr: "Amaç, … olmadan …'i mümkün kılmak", en: "The aim is to make … possible without …" },
          { de: "Der Ablauf ist bewusst einfach gehalten: …", tr: "İşleyiş bilerek basit tutuldu: …", en: "The procedure is deliberately kept simple: …" },
          { de: "Das größte Risiko sehen wir darin, dass …", tr: "En büyük riski … olmasında görüyoruz", en: "We see the greatest risk in the fact that …" },
          { de: "Vom Quartiersrat erbitten wir …", tr: "Mahalle meclisinden … rica ediyoruz", en: "From the neighborhood council we request …" },
        ],
        sample:
          "Mit diesem Konzept beantragen wir die Nutzung des leerstehenden Ladens in der " +
          "Kastanienallee 12 für einen Leihladen. " +
          "Ziel ist es, den Haushalten im Viertel Werkzeug, Küchengeräte und Freizeitausrüstung " +
          "zugänglich zu machen, ohne dass jeder diese Dinge kaufen muss. Wir denken dabei " +
          "besonders an Familien und an ältere Menschen mit wenig Platz. " +
          "Der Ablauf ist bewusst einfach gehalten: Wer Mitglied wird, kann bis zu drei " +
          "Gegenstände für eine Woche ausleihen; alle Ausleihen werden digital erfasst, und am " +
          "Vortag der Rückgabe bekommt jedes Mitglied eine Erinnerung geschickt. Hohe Gebühren verlangen wir " +
          "nicht; stattdessen setzen wir auf ehrenamtliche Mitarbeit: Zwölf Personen haben bereits zugesagt. " +
          "Das größte Risiko sehen wir darin, dass teure Geräte beschädigt oder nicht " +
          "zurückgegeben werden. Wir begegnen dem, indem wir für Geräte über hundert Euro eine " +
          "Kaution verlangen und eine Haftpflichtversicherung abschließen; andernfalls würde " +
          "ein einziger Schaden unser Budget übersteigen. " +
          "Vom Quartiersrat erbitten wir die mietfreie Überlassung der Räumlichkeit für zunächst " +
          "zwei Jahre sowie einen einmaligen Zuschuss von 3.000 Euro für Werkzeug und Versicherung; die Regale " +
          "haben wir bereits von einer Schreinerei geschenkt bekommen. " +
          "Für Rückfragen stehen wir gern zur Verfügung.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s18",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Besitzen oder leihen — was verändert sich?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: sahip olmanın görünmeyen bir işlevini adlandır ve kendi hayatınla sına.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Eşyaları satın almak yerine ödünç almak ya da paylaşmak insanı ve ilişkileri nasıl değiştirir? Sahip olmanın görünmeyen bir işlevini adlandır, paylaşmanın bunu nasıl değiştirdiğini söyle, kendi hayatından bir örnek ver ve bir sonuçla bitir.",
      bulletsTr: [
        "Sahip olmanın görünmeyen bir işlevini adlandır",
        "Paylaşmanın bunu nasıl değiştirdiğini söyle",
        "Kendi hayatından bir örnek ver",
        "Bir sonuçla bitir",
      ],
      targets: [
        { de: "Besitz erfüllt eine Funktion, über die selten gesprochen wird: …", tr: "Sahip olmanın pek konuşulmayan bir işlevi var: …" },
        { de: "Wer leiht, statt zu kaufen, …", tr: "Satın almak yerine ödünç alan …" },
        { de: "Bei mir selbst merke ich das daran, dass …", tr: "Bunu kendimde … olmasından anlıyorum" },
        { de: "Daraus ziehe ich den Schluss, dass …", tr: "Bundan … sonucunu çıkarıyorum" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Besitz erfüllt eine Funktion, über die selten gesprochen wird: Er erspart uns " +
        "Verabredungen. Wer eine eigene Leiter hat, muss niemanden fragen, niemandem danken und " +
        "sich nach niemandem richten. " +
        "Wer leiht, statt zu kaufen, tauscht diese Unabhängigkeit gegen etwas anderes ein, " +
        "nämlich gegen Kontakt, der nicht immer erwünscht ist. Das kann lästig sein, aber es ist " +
        "auch der Grund, warum Leihläden so oft zu Treffpunkten werden. " +
        "Bei mir selbst merke ich das daran, dass ich seit einem Jahr die Bohrmaschine meiner " +
        "Nachbarin benutze. Anfangs habe ich sie mir geholt, indem ich kurz geklingelt habe; " +
        "inzwischen trinken wir dabei meistens einen Kaffee, und ich weiß mehr über ihre Familie " +
        "als über meine Kollegen. Hätte ich mir eine eigene Maschine gekauft, wäre das nie " +
        "passiert. " +
        "Daraus ziehe ich den Schluss, dass Teilen nicht in erster Linie eine Frage des Geldes " +
        "oder der Umwelt ist, sondern eine Entscheidung darüber, wie viel Nähe man im Alltag " +
        "zulassen will.",
      rubricHint:
        "Görünmeyen bir işlevin adlandırılması, kişisel bir örnek ve genelleyen bir sonuç beklenir; „statt zu“, „indem“ ve Konjunktiv II kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g18",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Er bekommt das Gerät erklärt",
    genre: "grammar",
    intro: "Almancada edilgenin öznesi yalnız işin yapıldığı şey değil, ondan payını alan kişi de olabilir; bunun aracı „bekommen“dir.",
    focus: "bekommen-edilgeni (Rezipientenpassiv): Das Mitglied bekommt eine Erinnerung geschickt",
    gloss: [
      { de: "die Erinnerung", tr: "hatırlatma", en: "reminder" },
      { de: "das Regal", tr: "raf", en: "shelf" },
      { de: "die Kaution", tr: "depozito", en: "deposit" },
      { de: "erstatten", tr: "geri ödemek", en: "to reimburse" },
      { de: "die Mitgliedschaft", tr: "üyelik", en: "membership" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Alıcı özne olur: bekommen + Partizip II",
        tr: "Dativ nesnesi olan fiillerde (schicken, schenken, erklären, erstatten) işin ALICISI özne yapılabilir: „Man schickt dem Mitglied eine Erinnerung“ → „Das Mitglied bekommt eine Erinnerung geschickt.“ „werden“ edilgeninde alıcı Dativ'de kalır: „Dem Mitglied wird eine Erinnerung geschickt.“ bekommen-edilgeni alıcıyı öne çıkarır ve konuşmada çok daha doğal duyulur.",
        examples: [
          { de: "Jedes Mitglied bekommt am Vortag eine Erinnerung geschickt.", tr: "Her üyeye bir gün önce bir hatırlatma gönderiliyor.", note: "alıcı özne" },
          { de: "Dem Mitglied wird am Vortag eine Erinnerung geschickt.", tr: "Üyeye bir gün önce bir hatırlatma gönderiliyor.", note: "werden: alıcı Dativ'de" },
          { de: "Wir haben die Regale geschenkt bekommen.", tr: "Rafları hediye olarak aldık.", note: "Perfekt: bekommen en sonda" },
        ],
      },
      {
        heading: "Zamanlar ve kriegen / erhalten",
        tr: "Zaman „bekommen“ ile kurulur: bekommt … geschickt (Präsens), bekam … erklärt (Präteritum), hat … erstattet bekommen (Perfekt). Konuşmada „kriegen“, resmî yazıda „erhalten“ de kullanılır: „Sie erhalten die Kaution erstattet.“ Anlam değişmez, yalnız üslup değişir.",
        examples: [
          { de: "Bei der Ausleihe bekam ich das Gerät genau erklärt.", tr: "Ödünç alırken alet bana ayrıntılı açıklandı.", note: "Präteritum" },
          { de: "Sie haben die Kaution vollständig erstattet bekommen.", tr: "Depozito size tamamen iade edildi.", note: "Perfekt" },
          { de: "Die Bohrmaschine kriegst du morgen gebracht.", tr: "Matkap yarın sana getirilir.", note: "kriegen: konuşma dili" },
        ],
      },
      {
        heading: "Sınır: yalnız alıcısı olan fiillerde",
        tr: "bekommen-edilgeni ancak bir şey birine verildiğinde, gönderildiğinde, açıklandığında ya da ondan alındığında kurulur. Alıcısı olmayan fiillerle kurulmaz: „Die Leiter bekommt repariert“ yanlıştır; doğrusu „Die Leiter wird repariert.“ Olumsuz bir etkide de kullanılır: „Er bekam die Mitgliedschaft gekündigt.“",
        examples: [
          { de: "Die Leiter wird gerade repariert.", tr: "Merdiven şu anda tamir ediliyor.", note: "alıcı yok: werden" },
          { de: "Er bekam die Mitgliedschaft gekündigt.", tr: "Üyeliği feshedildi.", note: "olumsuz etki" },
          { de: "Neue Mitglieder bekommen die Regeln kurz vorgestellt.", tr: "Yeni üyelere kurallar kısaca tanıtılıyor.", note: "alıcı özne" },
        ],
      },
    ],
    questions: [
      {
        text: "„Man schickt dem Mitglied eine Erinnerung.“ — Welches Passiv stellt das Mitglied in den Vordergrund?",
        options: [
          "Eine Erinnerung wird geschickt.",
          "Das Mitglied bekommt eine Erinnerung geschickt.",
          "Das Mitglied wird eine Erinnerung geschickt.",
        ],
        answer: 1,
        explain: "bekommen-edilgeninde alıcı özne olur ve cümlenin başına geçer.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Wir haben die Regale geschenkt bekommen.",
          "Wir haben die Regale bekommen geschenkt.",
          "Wir haben die Regale geschenkt gekommen.",
        ],
        answer: 0,
        explain: "Perfekt'te önce asıl fiilin Partizip'i, en sonda „bekommen“ gelir.",
      },
      {
        text: "Bei welchem Satz ist das bekommen-Passiv NICHT möglich?",
        options: [
          "Man erklärt ihr das Gerät.",
          "Man erstattet ihm die Kaution.",
          "Man repariert die Leiter.",
        ],
        answer: 2,
        explain: "Tamirde bir alıcı yok; bu yüzden yalnız „werden“ edilgeni kurulur.",
      },
      {
        kind: "gapfill",
        text: "Jedes Mitglied ___ am Vortag eine Erinnerung geschickt. (bekommen)",
        options: [],
        answer: 0,
        accept: ["bekommt"],
        explain: "Çekimlenen fiil „bekommen“dir; asıl fiil Partizip II olarak sona gider.",
      },
      {
        kind: "gapfill",
        text: "Sie haben die Kaution erstattet ___. (bekommen, Partizip II)",
        options: [],
        answer: 0,
        accept: ["bekommen"],
        explain: "„bekommen“in Partizip II'si ge- almaz: hat … erstattet bekommen.",
      },
      {
        kind: "gapfill",
        text: "Bei der Ausleihe bekam ich das Gerät genau ___. (erklären)",
        options: [],
        answer: 0,
        accept: ["erklärt"],
        explain: "Asıl fiil Partizip II olur; -ieren ile biten ve ayrılmayan ön ekli (er-, be-, ver- …) fiillerde ge- gelmez.",
      },
      {
        kind: "gapfill",
        text: "Die Leiter ___ gerade repariert. (werden)",
        options: [],
        answer: 0,
        accept: ["wird"],
        explain: "Alıcısı olmayan bir işte edilgen „werden“ ile kurulur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Neue Mitglieder", "bekommen", "die Regeln", "kurz vorgestellt"],
        explain: "Alıcı özne başta, „bekommen“ ikinci sırada, Partizip II en sonda.",
      },
      {
        kind: "truefalse",
        text: "Im bekommen-Passiv steht der Empfänger im Dativ.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Alıcı burada öznedir, yani Nominativ'dedir; Dativ yalnız „werden“ edilgeninde kalır.",
      },
      {
        kind: "truefalse",
        text: "Im formellen Deutsch kann „erhalten“ an die Stelle von „bekommen“ treten.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Sie erhalten die Kaution erstattet“ resmî yazıda sık kullanılır.",
      },
    ],
  },
];
