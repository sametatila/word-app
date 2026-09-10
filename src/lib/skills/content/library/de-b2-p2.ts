import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 2.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 2. seti taşır (kimlik sonu 2).
 * Kurallar ve emsal: `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler parti 1'den ayrı: haber analizi, radyo haber bülteni ve aktarım
 * e-postası. Üçü de dolaylı aktarımın doğal yaşam alanı; dil bilgisi
 * Konjunktiv I.
 */
export const deB2P2: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r2",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Schöffen gesucht — und kaum gefunden",
    genre: "article",
    intro: "Az bilinen bir gönüllü görev için başvuru bulunamamasını inceleyen bir haber yazısı okuyacaksın.",
    gloss: [
      { de: "der Schöffe", tr: "halk jürisi üyesi", en: "lay judge" },
      { de: "das Stimmrecht", tr: "oy hakkı", en: "voting right" },
      { de: "erforderlich", tr: "gerekli", en: "required" },
      { de: "geeignet", tr: "uygun", en: "suitable" },
      { de: "die Belastung", tr: "yük", en: "burden" },
      { de: "die Freistellung", tr: "izin verilmesi", en: "release from work" },
      { de: "das Hindernis", tr: "engel", en: "obstacle" },
    ],
    minutes: 9,
    text:
      "SCHÖFFEN GESUCHT — UND KAUM GEFUNDEN\n\n" +
      "Alle fünf Jahre stellen die Kommunen Listen für ein Ehrenamt zusammen, das die wenigsten kennen: das " +
      "Schöffenamt. Schöffinnen und Schöffen sitzen im Strafprozess neben den Berufsrichtern und entscheiden " +
      "mit gleichem Stimmrecht über Schuld und Strafe. Juristische Kenntnisse sind dafür nicht erforderlich; " +
      "sie sind sogar ausdrücklich nicht verlangt.\n\n" +
      "In diesem Jahr melden mehrere Städte, sie hätten die vorgeschriebene Zahl an Bewerbungen nicht erreicht. " +
      "Eine Sprecherin der Stadt Rendsburg erklärte, man habe zweihundert Vorschläge gebraucht und knapp " +
      "neunzig bekommen. Die Gründe seien bekannt: Viele wüssten schlicht nicht, dass es das Amt gebe, und wer " +
      "davon höre, halte sich für nicht geeignet.\n\n" +
      "Der Richterbund weist seit Jahren darauf hin, dass gerade diese Sorge unbegründet sei. Ein Sprecher sagte, " +
      "das Gericht brauche keine zweite juristische Meinung, sondern eine andere: die Sicht von Menschen, die " +
      "den Alltag der Angeklagten und der Opfer kennen. Er räumte allerdings ein, die Belastung werde oft " +
      "unterschätzt. Ein Schöffe müsse mit etwa zwölf Sitzungstagen im Jahr rechnen, die der Arbeitgeber " +
      "freigeben muss.\n\n" +
      "Genau hier liegt nach Einschätzung der Kommunen das eigentliche Hindernis. Zwar ist die Freistellung " +
      "gesetzlich geregelt, doch in kleinen Betrieben fällt sie schwer, und Selbstständige verlieren Einkommen, " +
      "das nur teilweise ersetzt wird. Eine Personalberaterin, die selbst Schöffin war, formulierte es so: " +
      "Das Amt sei für alle offen, aber leicht sei es nur für manche.\n\n" +
      "Was hilft? Rendsburg hat in diesem Frühjahr zum ersten Mal an Betriebe geschrieben statt an Bürger. " +
      "Die Zahl der Bewerbungen stieg um ein Drittel. Andere Städte prüfen jetzt dasselbe.",
    questions: [
      {
        text: "Worum geht es in dem Bericht?",
        options: [
          "um zu wenige Bewerbungen für ein Ehrenamt",
          "um einen Streit über zu milde Strafen",
          "um die Ausbildung von Berufsrichtern",
        ],
        answer: 0,
        explain: "Başlık ve ikinci paragraf aynı şeyi söylüyor: gereken sayıya ulaşılamıyor.",
      },
      {
        text: "Welche Voraussetzung nennt der Text für das Amt?",
        options: [
          "Juristische Kenntnisse sind nicht nötig.",
          "Man muss vorher einen Kurs besuchen.",
          "Man muss in der Stadt geboren sein.",
        ],
        answer: 0,
        explain: "„Juristische Kenntnisse sind dafür nicht erforderlich; sie sind sogar ausdrücklich nicht verlangt.“",
      },
      {
        kind: "truefalse",
        text: "Selbstständige bekommen ihren Verdienstausfall nur zum Teil ersetzt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„… und Selbstständige verlieren Einkommen, das nur teilweise ersetzt wird.“",
      },
      {
        kind: "gapfill",
        text: "Ein Schöffe muss mit etwa ___ Sitzungstagen im Jahr rechnen.",
        options: [],
        answer: 0,
        accept: ["zwölf", "12"],
        explain: "„Ein Schöffe müsse mit etwa zwölf Sitzungstagen im Jahr rechnen …“",
      },
      {
        kind: "short_answer",
        text: "Was hat Rendsburg im Frühjahr anders gemacht?",
        options: [],
        answer: 0,
        accept: ["an Betriebe geschrieben", "Betriebe angeschrieben", "an Firmen geschrieben"],
        explain: "„Rendsburg hat … zum ersten Mal an Betriebe geschrieben statt an Bürger.“",
      },
      {
        text: "Was meint die Personalberaterin mit ihrem Satz?",
        options: [
          "Formal offen, praktisch nicht für jeden machbar.",
          "Das Amt sollte nur Juristen offenstehen.",
          "Kleine Betriebe stellen die besten Schöffen.",
        ],
        answer: 0,
        explain: "„Das Amt sei für alle offen, aber leicht sei es nur für manche“ — hemen öncesinde işveren ve gelir engeli anlatılıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l2",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Nachrichten am Mittag",
    genre: "article",
    intro: "Yerel radyonun öğle bültenini dinleyeceksin: birden fazla haber, aktarılan açıklamalar ve hava durumu.",
    gloss: [
      { de: "die Fernwärme", tr: "bölgesel ısıtma", en: "district heating" },
      { de: "der Anschluss", tr: "bağlantı", en: "connection" },
      { de: "sanieren", tr: "onarmak", en: "to renovate" },
      { de: "gesperrt", tr: "kapalı", en: "closed" },
      { de: "die Böe", tr: "rüzgâr hamlesi", en: "gust" },
      { de: "verdoppeln", tr: "ikiye katlamak", en: "to double" },
    ],
    minutes: 9,
    segments: [
      { text: "Es ist zwölf Uhr, Sie hören die Nachrichten." },
      { text: "Die Stadtwerke haben angekündigt, die Fernwärme im Süden der Stadt ab Oktober auszubauen. Eine Sprecherin sagte, rund tausendzweihundert Haushalte könnten angeschlossen werden." },
      { text: "Kritik kommt vom Mieterverein. Dessen Vorsitzender erklärte, die Kosten für den Anschluss seien bisher nicht öffentlich, und man erwarte Zahlen vor Beginn der Arbeiten." },
      { text: "Im Streit um die Sporthalle an der Feldstraße hat der Kreis mitgeteilt, das Dach werde saniert, nicht ersetzt. Die Halle bleibe deshalb nur vier Monate gesperrt." },
      { text: "Die Schulleitungen begrüßten die Entscheidung. Sie hätten mit einem ganzen Schuljahr gerechnet und könnten den Sportunterricht nun einfacher verteilen." },
      { text: "Der Kreis rechnet mit Kosten von einer Million Euro. Ein Sprecher betonte, die Summe sei im Haushalt bereits eingeplant." },
      { text: "In der Innenstadt bleibt die Marktstraße am Samstag gesperrt. Grund ist ein Lauf für den Kinderhospizverein; die Veranstalter erwarten nach eigenen Angaben zweitausend Teilnehmende." },
      { text: "Der Landkreis sucht weiter Prüferinnen und Prüfer für die Schwimmabzeichen. Wer helfen wolle, brauche keine besondere Ausbildung, hieß es, nur Zeit an drei Samstagen." },
      { text: "Zum Wetter: Am Nachmittag zieht Regen von Westen auf, dazu Wind mit Böen bis siebzig Kilometer pro Stunde. Morgen wird es freundlicher, aber deutlich kühler." },
      { text: "Und noch eine Meldung aus dem Fundbüro: Die Zahl der abgegebenen Schlüssel hat sich seit dem Frühjahr verdoppelt. Warum, konnte dort niemand erklären." },
      { text: "Die nächsten Nachrichten hören Sie um dreizehn Uhr." },
    ],
    questions: [
      {
        text: "Was haben die Stadtwerke angekündigt?",
        options: ["den Ausbau der Fernwärme", "eine Erhöhung der Preise", "den Abriss eines Heizwerks"],
        answer: 0,
        explain: "„Die Stadtwerke haben angekündigt, die Fernwärme im Süden der Stadt ab Oktober auszubauen.“",
      },
      {
        text: "Was kritisiert der Mieterverein?",
        options: [
          "Die Anschlusskosten sind nicht bekannt.",
          "Die Arbeiten beginnen viel zu spät.",
          "Zu wenige Haushalte werden angeschlossen.",
        ],
        answer: 0,
        explain: "„… die Kosten für den Anschluss seien bisher nicht öffentlich, und man erwarte Zahlen vor Beginn der Arbeiten.“",
      },
      {
        kind: "truefalse",
        text: "Die Sporthalle bekommt ein komplett neues Dach.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„… das Dach werde saniert, nicht ersetzt.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange bleibt die Sporthalle gesperrt?",
        options: [],
        answer: 0,
        accept: ["vier Monate", "4 Monate", "nur vier Monate"],
        explain: "„Die Halle bleibe deshalb nur vier Monate gesperrt.“",
      },
      {
        kind: "dictation",
        text: "Hava durumunun son cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Morgen wird es freundlicher, aber deutlich kühler.", "Morgen wird es freundlicher aber deutlich kühler"],
        explain: "„Morgen wird es freundlicher, aber deutlich kühler.“ — „aber“ iki yüklemi karşı karşıya koyar.",
      },
      {
        text: "Warum sind die Schulleitungen zufrieden?",
        options: [
          "Sie hatten mit einer längeren Sperrung gerechnet.",
          "Sie bekommen zusätzlich eine zweite Halle.",
          "Der Sportunterricht fällt jetzt ganz aus.",
        ],
        answer: 0,
        explain: "„Sie hätten mit einem ganzen Schuljahr gerechnet …“ — dört ay beklenenden kısa.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w2",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Bericht vom Informationsabend",
    genre: "email",
    intro: "Bir bilgilendirme toplantısına katıldın; önce iki cümle kur, sonra gelemeyenlere söylenenleri aktaran bir e-posta yaz.",
    gloss: [
      { de: "die Verwaltung", tr: "yönetim", en: "administration" },
      { de: "der Einwand", tr: "itiraz", en: "objection" },
      { de: "zusagen", tr: "söz vermek", en: "to promise" },
      { de: "der Ansprechpartner", tr: "muhatap", en: "contact person" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Yönetici, çalışmaların nisanda başlayacağını söyledi.",
        answer: "Der Verwalter sagte, die Arbeiten begännen im April.",
        alternatives: ["Die Arbeiten begännen im April, sagte der Verwalter."],
        hint: "Dolaylı aktarımda fiil Konjunktiv I'e geçer; çoğul biçim gösterge kipiyle aynı görünürse Konjunktiv II kullanılır.",
      },
      {
        kind: "build",
        tr: "Gürültünün ne kadar süreceğini kimse söyleyemedi.",
        answer: "Niemand konnte sagen, wie lange der Lärm dauern werde.",
        alternatives: ["Wie lange der Lärm dauern werde, konnte niemand sagen."],
        hint: "Aktarılan soruda da Konjunktiv I kullanılır ve yan cümlenin fiili sona gider.",
      },
      {
        kind: "free",
        prompt:
          "Bir bilgilendirme toplantısına katıldın. Gelemeyenlere e-posta yaz: neyin duyurulduğunu, kimin neye itiraz ettiğini, hangi sözün verildiğini, neyin açık kaldığını aktar ve bir öneriyle bitir. Söylenenleri dolaylı aktarımla ver.",
        checklist: [
          "Duyurulan planı tarih ve süreyle aktar",
          "En az bir itirazı ve kimden geldiğini yaz",
          "Verilen sözü ve tarihini belirt",
          "Açık kalan noktayı söyle ve bir öneri yap",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich fasse kurz zusammen, …", tr: "Kısaca özetliyorum, …", en: "To summarise briefly, …" },
          { de: "Der Verwalter sagte, …", tr: "Yönetici … dedi", en: "The manager said …" },
          { de: "Auf die Frage nach … antwortete er, …", tr: "… sorusuna … diye yanıt verdi", en: "Asked about …, he replied …" },
          { de: "Mehrere Anwesende hatten Einwände.", tr: "Katılanlardan birkaçının itirazı vardı.", en: "Several of those present had objections." },
          { de: "Offen blieb, …", tr: "… açık kaldı", en: "… was left open" },
        ],
        sample:
          "Liebe Nachbarinnen und Nachbarn, gestern war ich beim Informationsabend der Verwaltung und fasse kurz " +
          "zusammen, was gesagt wurde. Der Verwalter sagte, die Arbeiten am Dach begännen im April und dauerten " +
          "voraussichtlich fünf Monate. Das Gerüst werde auf der Hofseite stehen; die Balkone im zweiten und " +
          "dritten Stock seien in dieser Zeit nicht nutzbar. Auf die Frage nach der Miete antwortete er, eine " +
          "Minderung sei möglich, müsse aber schriftlich geltend gemacht werden. Mehrere Anwesende hatten " +
          "Einwände. Frau Kilic wies darauf hin, dass im Hof die Fahrräder stünden, und fragte, wohin diese " +
          "sollten; der Verwalter sagte zu, bis Ende Februar eine Lösung zu nennen. Offen blieb, wie lange der " +
          "Lärm täglich dauern werde, denn auch die Arbeitszeiten seien noch nicht festgelegt. Ich schlage vor, " +
          "dass wir bis Mitte Februar warten und dann gemeinsam schriftlich nachfragen. Als Ansprechpartner hat " +
          "die Verwaltung Herrn Alkan genannt. Viele Grüße, Deniz",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s2",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Straßennamen ändern?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: iki tarafın da en güçlü argümanını söyle, sonra kendi konumunu gerekçelendir.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Bazı sokaklar tartışmalı kişilerin adını taşıyor. Böyle adlar değiştirilmeli mi, yoksa açıklayıcı bir levha yeterli mi? İki tarafı da tart, sonra kendi konumunu söyle.",
      bulletsTr: [
        "Soruyu iki seçenekten fazlasına aç",
        "Değiştirme lehine en güçlü argümanı söyle",
        "Karşı tarafın en güçlü argümanını söyle",
        "Kendi konumunu ayrıştırarak bitir (hangi durumda ne)",
      ],
      targets: [
        { de: "Für … spricht, dass …", tr: "… lehine olan şu: …" },
        { de: "Dagegen spricht …", tr: "Buna karşı …" },
        { de: "Hinzu kommt, dass …", tr: "Buna bir de … ekleniyor" },
        { de: "Ich halte … für richtig.", tr: "… doğru buluyorum." },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Die Frage wird meistens so gestellt, als gäbe es nur zwei Möglichkeiten: umbenennen oder alles lassen. " +
        "Für die Umbenennung spricht, dass ein Straßenname keine Information ist, sondern eine Ehrung. Wer " +
        "täglich seine Adresse schreibt, wiederholt diese Ehrung, ob er will oder nicht. Dagegen spricht der " +
        "praktische Aufwand, und zwar mehr, als man denkt: Ausweise, Verträge und Firmenschilder müssen geändert " +
        "werden, und die Kosten trägt oft nicht die Stadt, sondern der Anwohner. Hinzu kommt, dass ein getilgter " +
        "Name gar nicht mehr diskutiert wird; ein Schild mit Erklärung dagegen zwingt zum Hinsehen. " +
        "Ich halte deshalb eine gestufte Lösung für richtig. Bei Personen, die für Verbrechen verantwortlich " +
        "waren, sollte ohne lange Debatte umbenannt werden. In allen anderen Fällen wäre eine Tafel mit Datum, " +
        "Amt und Kritik ehrlicher als ein neuer Name, der in zwanzig Jahren wieder überprüft wird.",
      rubricHint:
        "İki tarafın da en güçlü argümanı geçmeli ve sonuç ayrıştırılmalı (her durumda aynı cevap değil); bağlayıcılar beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g2",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Wer spricht hier eigentlich?",
    genre: "grammar",
    intro: "Haber ve rapor dilinin ayırt edici biçimi: söyleneni aktarırken doğruluğuna kefil olmadan bildirmek.",
    focus: "Konjunktiv I: dolaylı aktarım",
    gloss: [
      { de: "behaupten", tr: "iddia etmek", en: "to claim" },
      { de: "mitteilen", tr: "bildirmek", en: "to announce" },
      { de: "gesperrt", tr: "kapalı", en: "closed" },
      { de: "unterwegs", tr: "yolda", en: "on the way" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Türkçede -miş, Almancada fiil biçimi",
        tr: "Türkçede duyduğunu aktarırken fiile -miş takarsın: „gelecekmiş“. Almancada fiil başka bir biçime geçer: er sagt, er sei / er habe / er komme. Bu biçim aktaranın onayını da inkârını da içermez, yalnız „bu onun sözü“ der.",
        examples: [
          { de: "Er sagt, er sei unterwegs.", tr: "Yoldaymış diyor.", note: "sein → sei" },
          { de: "Sie erklärte, sie habe keine Zeit.", tr: "Vakti olmadığını açıkladı.", note: "haben → habe" },
          { de: "Die Stadt teilte mit, die Halle bleibe gesperrt.", tr: "Belediye salonun kapalı kalacağını bildirdi." },
        ],
      },
      {
        heading: "Biçim: çoğu zaman tek harf",
        tr: "Konjunktiv I kökten kurulur ve ek olarak -e, -est, -e, -en, -et, -en alır. Gösterge kipinden gerçekten ayrıldığı yer üçüncü tekildir: er kommt → er komme. „sein“ düzensizdir: ich sei, du seist, er sei, wir seien.",
        examples: [
          { de: "Er kommt später.", tr: "Sonra geliyor.", note: "gösterge kipi" },
          { de: "Er sagt, er komme später.", tr: "Sonra geleceğini söylüyor.", note: "Konjunktiv I" },
          { de: "Der Arzt sagte, ich müsse mehr trinken.", tr: "Doktor daha çok su içmem gerektiğini söyledi." },
        ],
      },
      {
        heading: "Biçim ayırt edilmiyorsa Konjunktiv II",
        tr: "Çoğul biçimlerde Konjunktiv I gösterge kipiyle aynı görünür (wir kommen). Aktarım anlaşılmaz kalmasın diye o zaman Konjunktiv II'ye geçilir: sie kämen, sie hätten, sie begännen. Geçmiş için tek bir biçim vardır: er habe … gesehen, sie sei … gekommen.",
        examples: [
          { de: "Sie sagten, sie hätten nichts gewusst.", tr: "Hiçbir şey bilmediklerini söylediler.", note: "haben → hätten" },
          { de: "Die Sprecherin sagte, die Arbeiten begännen im April.", tr: "Sözcü çalışmaların nisanda başlayacağını söyledi." },
          { de: "Er behauptet, er sei gestern dort gewesen.", tr: "Dün orada olduğunu iddia ediyor.", note: "geçmiş aktarım" },
        ],
      },
    ],
    questions: [
      {
        text: "Er sagt, er ___ krank.",
        options: ["sei", "ist", "wäre"],
        answer: 0,
        explain: "Dolaylı aktarımın temel biçimi Konjunktiv I'dir: er sei.",
      },
      {
        text: "Sie erklärte, sie ___ keine Zeit.",
        options: ["habe", "hat", "hätte"],
        answer: 0,
        explain: "Üçüncü tekilde Konjunktiv I gösterge kipinden ayrılır: sie habe.",
      },
      {
        text: "Die Sprecherin sagte, die Arbeiten ___ im April.",
        options: ["begännen", "beginnen", "begannen"],
        answer: 0,
        explain: "Çoğulda Konjunktiv I gösterge kipiyle aynı görünürdü, bu yüzden Konjunktiv II'ye geçilir.",
      },
      {
        kind: "gapfill",
        text: "Er sagt, er ___ (kommen) später.",
        options: [],
        answer: 0,
        accept: ["komme"],
        explain: "Üçüncü tekilde kök + e: er komme.",
      },
      {
        kind: "gapfill",
        text: "Sie behauptet, sie ___ (sein) gestern zu Hause gewesen.",
        options: [],
        answer: 0,
        accept: ["sei"],
        explain: "Geçmiş aktarımda yardımcı fiil Konjunktiv I olur: sie sei … gewesen.",
      },
      {
        kind: "gapfill",
        text: "Der Arzt sagte, ich ___ (müssen) mehr trinken.",
        options: [],
        answer: 0,
        accept: ["müsse"],
        explain: "Modal fiil de aynı kuralı izler: müsse.",
      },
      {
        kind: "gapfill",
        text: "Sie sagten, sie ___ (haben) nichts gewusst.",
        options: [],
        answer: 0,
        accept: ["hätten"],
        explain: "Çoğulda biçim ayırt edilmediği için Konjunktiv II gelir: hätten.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Er", "sagte", "er", "sei", "unterwegs"],
        explain: "Aktarım cümlesi virgülden sonra normal ana cümle sırasıyla kurulur: Er sagte, er sei unterwegs.",
      },
      {
        kind: "truefalse",
        text: "„In einem Bericht schreibt man: Er sagt, er hat keine Zeit.“ — Bu doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Rapor dilinde gösterge kipi aktaranın onayı gibi okunur; doğrusu „er habe keine Zeit“.",
      },
      {
        kind: "truefalse",
        text: "„Die Stadt teilte mit, die Halle bleibe vier Monate gesperrt.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Üçüncü tekilde Konjunktiv I doğru kurulmuş: bleiben → bleibe.",
      },
    ],
  },
];
