import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 24 — "Aracılık, büyük konuşma, final müzakeresi, sınav".
 *
 * Dört ders: Der Dolmetscher im Kopf · Die große Rede ·
 * Alles oder nichts · Die C1-Simulation.
 *
 *   Kelime: vermitteln, der Kontext, aufgeladen, gleichbedeutend, holprig,
 *           die Diplomatie, plädieren, spalten · die Rede, der Höhepunkt,
 *           der Bogen, packen, nachhallen, die Tugend, durchdringen, stiften ·
 *           der Abschluss, unterschriftsreif, nachbessern, endgültig,
 *           der Handschlag, untergraben, zurückschlagen, sofern ·
 *           die Simulation, der Prüfling, die Anforderung, die Bewertung,
 *           bestehen, systematisch, dokumentieren, die Verteilung
 *
 * Ünitenin çekirdeği: DİLİN BAŞKALARI İÇİN ARAÇ HÂLİNE GELDİĞİ AN.
 * Aracılık ederken iki tarafın da sözcüsü olmuyorsun, ikisinin de
 * anlaşılırlığından sorumlu oluyorsun; konuşma yaparken bir odayı
 * taşıyorsun; müzakerede tek cümle anlaşmayı kapatıyor ya da açıyor.
 *
 * Aracılık dersi Türkçe konuşanın çoğu zaman on yaşından beri yaptığı
 * işi ilk kez ADLANDIRIYOR: ailede, dairede, hastanede çeviri. Ve
 * merkezdeki tespit sözcük dağarcığıyla ilgili değil — birebir çeviri,
 * cümlenin NE YAPTIĞI aktarılmadığı için tökezliyor. Bu yüzden aracının
 * asıl cümlesi "Gemeint ist Folgendes: …" ve asıl kuralı kendi
 * görüşünü çeviriye karıştırmamak.
 */
export const c1U24: SkillExercise[] = [
  {
    id: "c1-u24-r1",
    level: "C1",
    skill: "reading",
    unit: 24,
    title: "Der Dolmetscher im Kopf",
    genre: "Deneme",
    intro: "Birebir çeviri neden tökezler? Sorun sözcüklerde değil.",
    gloss: [
      { de: "vermitteln", tr: "aracılık etmek", en: "to mediate" },
      { de: "aufgeladen", tr: "yüklü", en: "charged" },
      { de: "gleichbedeutend", tr: "eşanlamlı", en: "equivalent" },
      { de: "holprig", tr: "tökezleyen", en: "clumsy" },
      { de: "der Kontext", tr: "bağlam", en: "context" },
      { de: "plädieren", tr: "savunmak", en: "to argue for" },
      { de: "spalten", tr: "bölmek", en: "to split" },
    ],
    minutes: 8,
    text:
      "WAS EIN SATZ TUT\n\n" +
      "Viele, die zweisprachig aufgewachsen sind, haben mit zehn Jahren am Behördenschalter gedolmetscht. Kaum jemand hat es je Arbeit genannt, und fast niemand hat gelernt, wie es geht.\n\n" +
      "Der häufigste Irrtum ist, dass Übersetzen ein Wörterproblem sei. Ist es selten. Es scheitert daran, dass ein Satz nicht nur etwas bedeutet, sondern etwas tut.\n\n" +
      "Ein Beispiel aus dem Alltag. Auf die Frage, ob ein Termin früher möglich sei, antwortet die Sachbearbeiterin: „Da müsste ich schauen.“ Wörtlich übersetzt klingt das nach einem freundlichen Vielleicht. Tatsächlich ist es meist ein höfliches Nein mit offener Tür. Wer nur die Wörter überträgt, übermittelt Hoffnung, wo Zurückhaltung stand.\n\n" +
      "Umgekehrt genauso. Eine ausführliche, mehrfach abgesicherte Bitte — mit Entschuldigungen, mit Rückversicherungen — ist in vielen Sprachen normale Höflichkeit. Wörtlich ins Deutsche gebracht, klingt sie unsicher, manchmal sogar unaufrichtig. Die Zurückhaltung des Sprechers wird zur Schwäche des Anliegens.\n\n" +
      "Deshalb gehört zum Vermitteln ein Satz, den man laut sagen darf: „Das lässt sich nicht wörtlich übersetzen. Gemeint ist Folgendes: …“ Damit macht man die eigene Arbeit sichtbar, statt sie zu verstecken.\n\n" +
      "Bleibt die schwierigste Regel. Wer vermittelt, plädiert nicht. Die Versuchung ist groß, die Seite, die man für benachteiligt hält, ein wenig besser klingen zu lassen — eine mildere Formulierung hier, eine Auslassung dort. Es hilft nie lange. Sobald es auffällt, verliert man das Vertrauen beider Seiten, und dann steht die Person, der man helfen wollte, ohne Vermittler da.\n\n" +
      "Vermitteln heißt nicht, in der Mitte zu stehen. Es heißt, dafür zu sorgen, dass beide Seiten dasselbe hören.",
    questions: [
      {
        text: "Woran scheitert Übersetzen laut Text meistens?",
        options: [
          "An fehlenden Wörtern",
          "Daran, dass ein Satz nicht nur etwas bedeutet, sondern etwas tut",
          "An der Grammatik",
        ],
        answer: 1,
        explain: "Cümlenin işlevi aktarılmazsa anlam da taşınmıyor.",
      },
      {
        kind: "gapfill",
        text: "Das lässt sich nicht wörtlich übersetzen. ___ ist Folgendes: …",
        options: [],
        answer: 0,
        accept: ["Gemeint"],
        explain: "Aracı kendi işini görünür kılıyor.",
      },
      {
        text: "Was ist „Da müsste ich schauen“ meistens?",
        options: [
          "Ein freundliches Vielleicht",
          "Ein höfliches Nein mit offener Tür",
          "Eine Zusage",
        ],
        answer: 1,
        explain: "Birebir çeviri olmayan bir umut taşıyor.",
      },
      {
        kind: "short_answer",
        text: "Warum darf ein Vermittler nicht plädieren?",
        options: [],
        answer: 0,
        accept: [
          "sobald es auffällt, verliert er das Vertrauen beider Seiten",
          "man verliert das Vertrauen beider Seiten",
          "die Person, der man helfen wollte, steht dann ohne Vermittler da",
        ],
        explain: "Yardım edilmek istenen kişi aracısız kalıyor.",
      },
      {
        kind: "short_answer",
        text: "Wie klingt eine mehrfach abgesicherte Bitte wörtlich im Deutschen?",
        options: [],
        answer: 0,
        accept: [
          "unsicher, manchmal unaufrichtig",
          "unsicher",
          "die Zurückhaltung wird zur Schwäche des Anliegens",
        ],
        explain: "Nezaket biçimi başka dilde zayıflık olarak okunuyor.",
      },
    ],
  },
  {
    id: "c1-u24-r2",
    level: "C1",
    skill: "reading",
    unit: 24,
    title: "Die große Rede",
    genre: "Rehber yazısı",
    intro: "Bir konuşmayı taşıyan şey: yay, tek fikir, son cümle.",
    gloss: [
      { de: "der Bogen", tr: "yay, kavis", en: "arc" },
      { de: "der Höhepunkt", tr: "doruk", en: "climax" },
      { de: "nachhallen", tr: "yankılanmak", en: "to resonate" },
      { de: "packen", tr: "yakalamak, sarmak", en: "to grip" },
      { de: "durchdringen", tr: "nüfuz etmek", en: "to permeate" },
      { de: "stiften", tr: "yaratmak, bağışlamak", en: "to create, to endow" },
      { de: "die Tugend", tr: "erdem", en: "virtue" },
    ],
    minutes: 7,
    text:
      "EIN GEDANKE, NICHT SIEBEN\n\n" +
      "Die häufigste Schwäche einer Rede ist nicht schlechte Sprache, sondern zu viel Inhalt. Wer sieben Punkte mitbringt, hinterlässt keinen.\n\n" +
      "Eine gute Rede spannt einen Bogen: Sie beginnt bei etwas Konkretem, führt zu einem Gedanken und kommt am Ende dorthin zurück, wo sie angefangen hat. Der Zuhörer merkt den Bogen nicht, er spürt nur, dass die Rede zu Ende ist, bevor der Redner es sagt.\n\n" +
      "Der Anfang entscheidet über die ersten dreißig Sekunden. „Ich freue mich, heute hier zu sein“ ist kein Anfang, sondern eine Räusperung. Eine Szene, eine Zahl oder eine Frage packt zu; die Begrüßung kann danach kommen.\n\n" +
      "In der Mitte gilt die Regel der Konkretheit. Ein Beispiel trägt weiter als drei Behauptungen, und ein einziger Name — eine Kollegin, ein Kunde, ein Abend im November — bleibt hängen, wo Zahlen abfließen.\n\n" +
      "Der Schluss ist die schwierigste Stelle, und die meisten Reden sterben dort. Sie enden nicht, sie hören auf: „Ja, das war's dann von mir.“ Der letzte Satz sollte nachhallen — kurz, ohne neues Argument, ohne Dank an die Technik. Wer ihn vorher aufschreibt und auswendig kann, gewinnt mehr als durch jede andere Vorbereitung.\n\n" +
      "Und die Sprache? Kürzere Sätze als im Text, mehr Verben, weniger Substantive. Geschriebenes Deutsch verträgt Schachtelsätze, gesprochenes nicht — und ein Publikum kann nicht zurückblättern.",
    questions: [
      {
        text: "Was ist laut Text die häufigste Schwäche einer Rede?",
        options: [
          "Schlechte Sprache",
          "Zu viel Inhalt",
          "Zu wenig Vorbereitung",
        ],
        answer: 1,
        explain: "Yedi madde getiren hiçbirini bırakmıyor.",
      },
      {
        kind: "gapfill",
        text: "Eine gute Rede spannt einen ___.",
        options: [],
        answer: 0,
        accept: ["Bogen"],
        explain: "Başladığı yere dönüyor; dinleyici yayı fark etmiyor, bitişi hissediyor.",
      },
      {
        text: "Wie soll eine Rede laut Text beginnen?",
        options: [
          "Mit der Begrüßung",
          "Mit einer Szene, einer Zahl oder einer Frage",
          "Mit dem Dank an die Veranstalter",
        ],
        answer: 1,
        explain: "„Ich freue mich, heute hier zu sein“ bir başlangıç değil, boğaz temizleme.",
      },
      {
        kind: "short_answer",
        text: "Was sollte der letzte Satz nicht enthalten?",
        options: [],
        answer: 0,
        accept: [
          "kein neues Argument und keinen Dank an die Technik",
          "kein neues Argument",
          "nichts Neues, keinen Dank an die Technik",
        ],
        explain: "Kısa olacak ve yankılanacak.",
      },
      {
        kind: "short_answer",
        text: "Warum sind gesprochene Sätze kürzer als geschriebene?",
        options: [],
        answer: 0,
        accept: [
          "ein Publikum kann nicht zurückblättern",
          "man kann nicht zurückblättern",
          "gesprochenes Deutsch verträgt keine Schachtelsätze",
        ],
        explain: "Ünite 16'nın iç içe cümlesi burada doğrudan zarar veriyor.",
      },
    ],
  },
  {
    id: "c1-u24-l1",
    level: "C1",
    skill: "listening",
    unit: 24,
    title: "Alles oder nichts",
    genre: "Müzakere",
    intro: "Son teklif nasıl verilir — kapıyı kapatmadan.",
    gloss: [
      { de: "unterschriftsreif", tr: "imzaya hazır", en: "ready to sign" },
      { de: "nachbessern", tr: "iyileştirme yapmak", en: "to improve on" },
      { de: "der Abschluss", tr: "anlaşma, kapanış", en: "closing" },
      { de: "untergraben", tr: "zayıflatmak", en: "to undermine" },
      { de: "sofern", tr: "-diği takdirde", en: "provided that" },
      { de: "endgültig", tr: "nihai", en: "final" },
      { de: "der Handschlag", tr: "el sıkışma", en: "handshake" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Kral", text: "Wir sind bei 8 Prozent, Sie bei 12. Ich möchte heute abschließen." },
      { speaker: "Herr Vogt", text: "Ich auch. Nur nicht bei 8." },
      { speaker: "Frau Kral", text: "Kämen Sie uns bei der Laufzeit entgegen, könnten wir beim Preis etwas tun." },
      { speaker: "Herr Vogt", text: "Was heißt entgegenkommen?" },
      { speaker: "Frau Kral", text: "Drei Jahre statt zwei. Dann wären 10 Prozent darstellbar." },
      { speaker: "Herr Vogt", text: "Drei Jahre sind lang. Sofern eine Ausstiegsklausel nach achtzehn Monaten drin ist, kann ich damit arbeiten." },
      { speaker: "Frau Kral", text: "Eine Ausstiegsklausel untergräbt die Laufzeit. Dann zahle ich für Sicherheit, die ich nicht bekomme." },
      { speaker: "Herr Vogt", text: "Mit Frist. Sechs Monate Kündigungsfrist — Sie haben Planungssicherheit für zwei Jahre, ich habe eine Tür." },
      { speaker: "Frau Kral", text: "Das ist ein Vorschlag, mit dem ich in die Geschäftsführung gehen kann." },
      { speaker: "Herr Vogt", text: "Und der Preis?" },
      { speaker: "Frau Kral", text: "Unser letztes Wort wäre 10 Prozent, drei Jahre, Ausstieg nach achtzehn Monaten mit sechs Monaten Frist. Darunter habe ich kein Mandat." },
      { speaker: "Herr Vogt", text: "Dann machen wir es so. Schicken Sie es unterschriftsreif bis Donnerstag." },
      { speaker: "Frau Kral", text: "Donnerstag früh. Und Herr Vogt — nachbessern wir das dann nicht mehr." },
      { speaker: "Herr Vogt", text: "Einverstanden. Handschlag gilt." },
    ],
    questions: [
      {
        text: "Wie eröffnet Frau Kral den Handel?",
        options: [
          "Mit einem Ultimatum",
          "Mit einer Bedingung: Entgegenkommen bei der Laufzeit gegen Preis",
          "Mit einer Drohung",
        ],
        answer: 1,
        explain: "Kämen Sie …, könnten wir …: iki taraflı, kapıyı açık tutan yapı.",
      },
      {
        kind: "gapfill",
        text: "___ Sie uns bei der Laufzeit entgegen, könnten wir beim Preis etwas tun.",
        options: [],
        answer: 0,
        accept: ["Kämen"],
        explain: "Bağlaçsız irreal koşul, Konjunktiv II ile — diplomatik biçim.",
      },
      {
        text: "Warum lehnt Frau Kral die Ausstiegsklausel zunächst ab?",
        options: [
          "Weil sie zu teuer ist",
          "Weil sie die Laufzeit untergräbt: sie zahlt für Sicherheit, die sie nicht bekommt",
          "Weil sie unüblich ist",
        ],
        answer: 1,
        explain: "Uzlaşma fesih süresiyle geliyor.",
      },
      {
        kind: "dictation",
        text: "Frau Kral'ın son teklifini yetki sınırıyla birlikte verdiği cümlenin son bölümünü yaz.",
        options: [],
        answer: 0,
        accept: [
          "Darunter habe ich kein Mandat.",
          "Darunter habe ich kein Mandat",
        ],
        explain: "Yetki sınırını söylemek son sözü inandırıcı kılıyor.",
      },
    ],
  },
  {
    id: "c1-u24-l2",
    level: "C1",
    skill: "listening",
    unit: 24,
    title: "Die C1-Simulation",
    genre: "Bilgilendirme",
    intro: "Sınav ne ölçüyor, puanlar nasıl dağılıyor?",
    gloss: [
      { de: "der Prüfling", tr: "sınava giren", en: "candidate" },
      { de: "die Anforderung", tr: "gereklilik", en: "requirement" },
      { de: "die Bewertung", tr: "değerlendirme", en: "assessment" },
      { de: "bestehen", tr: "geçmek", en: "to pass" },
      { de: "systematisch", tr: "sistemli", en: "systematic" },
      { de: "die Verteilung", tr: "dağılım", en: "distribution" },
      { de: "dokumentieren", tr: "belgelemek", en: "to document" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Prüferin", text: "Vom Prüfling werden vier Teilleistungen verlangt: Lesen, Hören, Schreiben, Sprechen." },
      { speaker: "Teilnehmer", text: "Muss man in jedem Teil bestehen?" },
      { speaker: "Prüferin", text: "Zum Bestehen sind insgesamt sechzig Prozent nötig. Ein schwacher Teil lässt sich ausgleichen — aber nicht beliebig." },
      { speaker: "Teilnehmerin", text: "Worauf achten Sie beim Schreiben am meisten?" },
      { speaker: "Prüferin", text: "Auf drei Dinge: ob die Aufgabe vollständig bearbeitet ist, ob der Text gegliedert ist, und ob das Register zur Textsorte passt. Fehlerfreiheit kommt danach." },
      { speaker: "Teilnehmer", text: "Das überrascht mich." },
      { speaker: "Prüferin", text: "Es überrascht die meisten. Ein fehlerarmer Text, der einen von drei Punkten der Aufgabe auslässt, liegt unter einem Text mit Fehlern, der alles behandelt." },
      { speaker: "Teilnehmerin", text: "Und beim Sprechen?" },
      { speaker: "Prüferin", text: "Dort zählt, ob Sie auf Ihr Gegenüber eingehen. Ein auswendig gelernter Vortrag bringt weniger als eine echte Reaktion — auch mit Pausen." },
      { speaker: "Teilnehmer", text: "Was ist der häufigste vermeidbare Fehler?" },
      { speaker: "Prüferin", text: "Die Zeit. Viele schreiben eine sehr gute Einleitung und lassen den letzten Teil weg. Teilen Sie sich die Minuten systematisch ein, notfalls mit einem Blick auf die Uhr nach der Hälfte." },
      { speaker: "Teilnehmerin", text: "Und wenn man ein Wort nicht weiß?" },
      { speaker: "Prüferin", text: "Umschreiben Sie es. Das ist keine Schwäche — es ist genau die Fähigkeit, die auf diesem Niveau geprüft wird." },
    ],
    questions: [
      {
        text: "Worauf achtet die Prüferin beim Schreiben zuerst?",
        options: [
          "Auf Fehlerfreiheit",
          "Auf Vollständigkeit, Gliederung und Register",
          "Auf die Länge",
        ],
        answer: 1,
        explain: "Hatasızlık bunlardan sonra geliyor.",
      },
      {
        kind: "gapfill",
        text: "Zum ___ sind insgesamt sechzig Prozent nötig.",
        options: [],
        answer: 0,
        accept: ["Bestehen"],
        explain: "İsimleştirilmiş mastar, büyük harfle.",
      },
      {
        text: "Was zählt beim Sprechen laut Prüferin?",
        options: [
          "Ein auswendig gelernter Vortrag",
          "Ob man auf das Gegenüber eingeht",
          "Sprechen ohne Pausen",
        ],
        answer: 1,
        explain: "Gerçek tepki, duraklamalarla bile, ezberden değerli.",
      },
      {
        kind: "short_answer",
        text: "Was rät die Prüferin, wenn ein Wort fehlt?",
        options: [],
        answer: 0,
        accept: [
          "es umschreiben",
          "umschreiben; das ist die geprüfte Fähigkeit",
          "das Wort umschreiben",
        ],
        explain: "Bu düzeyde ölçülen beceri tam olarak bu.",
      },
    ],
  },
  {
    id: "c1-u24-w1",
    level: "C1",
    skill: "writing",
    unit: 24,
    title: "Aracılık ve müzakere kalıpları",
    genre: "Dil bilgisi",
    intro: "Aracılık cümlesi, koşullu diplomasi ve son teklif kalıbı.",
    gloss: [
      { de: "vermitteln", tr: "aracılık etmek", en: "to mediate" },
      { de: "sofern", tr: "-diği takdirde", en: "provided that" },
      { de: "unterschriftsreif", tr: "imzaya hazır", en: "ready to sign" },
      { de: "nachbessern", tr: "iyileştirmek", en: "to improve on" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Bu birebir çevrilemez. Kastedilen şu: …",
        answer: "Das lässt sich nicht wörtlich übersetzen. Gemeint ist Folgendes",
        hint: "sich lassen + mastar: edilgen anlamı taşır.",
      },
      {
        kind: "build",
        tr: "Süre konusunda bize yaklaşırsanız fiyatta bir şey yapabiliriz.",
        answer: "Kämen Sie uns bei der Laufzeit entgegen, könnten wir beim Preis etwas tun",
        hint: "Bağlaçsız irreal koşul: Konjunktiv II fiil başta.",
      },
      {
        kind: "build",
        tr: "Son sözümüz yüzde on olurdu.",
        answer: "Unser letztes Wort wäre 10 Prozent",
        hint: "wäre yumuşatıyor; kesin ama kapı kapatmıyor.",
      },
      {
        kind: "rewrite",
        prompt: "Aracılık cümlesini düzelt: çevirmen kendi görüşünü karıştırmış.",
        source: "Sie hat gesagt, sie müsste schauen — aber ehrlich gesagt glaube ich, die will einfach nicht, das ist immer so bei denen.",
        answer: "Sie hat gesagt: „Da müsste ich schauen.“ Das lässt sich nicht wörtlich übersetzen. Gemeint ist meist ein höfliches Nein mit offener Tür.",
        alternatives: [
          "Sie hat gesagt: „Da müsste ich schauen.“ Gemeint ist meist ein höfliches Nein mit offener Tür.",
          "Sie sagt: „Da müsste ich schauen.“ Das ist meist ein höfliches Nein, aber die Tür bleibt offen.",
        ],
        why: "Aracının işi cümlenin ne yaptığını aktarmak — birebir çeviri burada olmayan bir umut taşıyor, doğru çeviri ise kibar bir ret olduğunu söylüyor. Ama ikinci yarı bunun ötesine geçiyor: kişisel bir yorum ve bir genelleme çeviriye karışıyor. Fark edildiği anda iki taraf da güvenini çekiyor ve yardım edilmek istenen kişi aracısız kalıyor.",
      },
    ],
  },
  {
    id: "c1-u24-w2",
    level: "C1",
    skill: "writing",
    unit: 24,
    title: "Son teklif",
    genre: "İş yazışması",
    intro: "Kapıyı kapatmadan nihai teklifi yaz.",
    gloss: [
      { de: "unterschriftsreif", tr: "imzaya hazır", en: "ready to sign" },
      { de: "nachbessern", tr: "iyileştirmek", en: "to improve on" },
      { de: "sofern", tr: "-diği takdirde", en: "provided that" },
      { de: "der Abschluss", tr: "kapanış", en: "closing" },
      { de: "endgültig", tr: "nihai", en: "final" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Müzakere sonrası nihai teklifi yazılı olarak gönder. Kurallar: (1) mutabık kalınan üç maddeyi tek tek ve sayısıyla yaz; (2) bunun nihai olduğunu söyle ve YETKİ SINIRINI adlandır (kişisel inat gibi görünmesin); (3) en az bir yerde Konjunktiv II diplomasisi kullan; (4) kapıyı kapatma — reddedilmesi hâlinde ne olacağını sakin bir cümleyle yaz; (5) tarih ver. Tehdit dili kullanma.",
        stimulus:
          "GÖRÜŞME SONUCU\n\n" +
          "· Fiyat: %10 indirim (biz %8'den başladık, onlar %12 istedi).\n" +
          "· Süre: 3 yıl (2 yıl istiyorlardı).\n" +
          "· Çıkış: 18 ay sonra, 6 ay fesih ihbarıyla.\n" +
          "· Perşembe sabahına kadar imzaya hazır metin sözü verildi.\n" +
          "· Bu paketin altında yetkin yok; daha fazlası için yönetim kurulu kararı gerekir ve o da bu çeyrekte toplanmıyor.\n" +
          "· Karşı taraf reddederse mevcut sözleşme mayısta kendiliğinden bitiyor, kriz yok.",
        checklist: [
          "Üç madde sayılarıyla ve tek tek yazıldı mı?",
          "Nihailik yetki sınırıyla gerekçelendirildi mi?",
          "Konjunktiv II diplomasisi var mı?",
          "Ret hâli sakin bir cümleyle, tehdit olmadan yazıldı mı?",
        ],
        minWords: 110,
        phrases: [
          { de: "Unser letztes Wort wäre …", tr: "son sözümüz … olurdu", en: "our final word would be …" },
          { de: "Darüber hinaus habe ich kein Mandat.", tr: "bunun ötesinde yetkim yok", en: "beyond that I have no mandate" },
          { de: "Sollten Sie sich anders entscheiden, …", tr: "aksi yönde karar verirseniz …", en: "should you decide otherwise, …" },
        ],
        sample:
          "Betreff: Rahmenvertrag 2027 — abschließendes Angebot\n\n" +
          "Sehr geehrter Herr Vogt,\n\n" +
          "vielen Dank für das Gespräch am Dienstag. Ich fasse zusammen, worauf wir uns verständigt haben:\n\n" +
          "1. Preisnachlass von 10 Prozent auf die Listenpreise der Anlage 2.\n" +
          "2. Laufzeit von drei Jahren, beginnend am 1. Juni 2027.\n" +
          "3. Ausstiegsrecht nach achtzehn Monaten mit einer Kündigungsfrist von sechs Monaten.\n\n" +
          "Dieses Paket ist unser letztes Wort. Das ist keine Verhandlungsposition: Darüber hinaus habe ich kein Mandat, und eine Erweiterung müsste der Vorstand beschließen, der in diesem Quartal nicht mehr zusammentritt. Kämen wir Ihnen jetzt noch beim Preis entgegen, müsste ich Ihnen im September mitteilen, dass die Zusage nicht trägt — das wäre für beide Seiten schlechter als eine klare Antwort heute.\n\n" +
          "Den unterschriftsreifen Entwurf erhalten Sie am Donnerstag bis 9 Uhr. Nachbessern werden wir ihn danach nicht mehr.\n\n" +
          "Sollten Sie sich anders entscheiden, läuft der bestehende Vertrag wie vorgesehen bis Ende Mai weiter; wir würden das bedauern, kämen damit aber zurecht.\n\n" +
          "Mit freundlichen Grüßen\nA. Kral",
      },
    ],
  },
];
