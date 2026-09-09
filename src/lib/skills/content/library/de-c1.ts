import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * C1 Patikası kurumsal iletişimin tonuyla uğraşıyor (ima, çekince, vurgu).
 * Kütüphane bu yüzden başka bir alana bakıyor: sayıların ve kayıtların
 * yorumlanması. Ortak nokta yine C1'in asıl işi — söylenenin arkasındaki
 * kararı görmek.
 *
 * Dil bilgisi odağı, C1'in kendi ölçütü: aynı içeriği isim öbeğiyle ya da
 * fiil cümlesiyle söyleyebilmek ve hangisinin nereye ait olduğunu bilmek.
 */
export const deC1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r1",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Der Durchschnitt und andere Halbwahrheiten",
    genre: "essay",
    intro: "Sayıların nasıl kurulduğunu anlatan bir deneme: hangi karar hangi rakamı üretiyor ve manşete ne kalıyor.",
    gloss: [
      { de: "der Median", tr: "ortanca", en: "median" },
      { de: "die Stichprobe", tr: "örneklem", en: "sample" },
      { de: "inszenieren", tr: "sahnelemek", en: "to stage" },
      { de: "belegen", tr: "kanıtlamak", en: "to prove" },
      { de: "der Rückgang", tr: "gerileme", en: "decline" },
      { de: "die Erhebung", tr: "veri toplama", en: "survey" },
      { de: "einräumen", tr: "kabul etmek", en: "to concede" },
    ],
    minutes: 10,
    text:
      "DER DURCHSCHNITT UND ANDERE HALBWAHRHEITEN\n\n" +
      "Sobald eine Zahl in einer Überschrift steht, wirkt sie wie ein Faktum. Tatsächlich ist sie das Ergebnis von " +
      "Entscheidungen: Was wurde gemessen, wen hat man gefragt, und welche Darstellung wurde am Ende gewählt? " +
      "Wer diese drei Fragen stellt, ist keine Skeptikerin und kein Skeptiker — sie oder er liest lediglich zu Ende.\n\n" +
      "Am häufigsten begegnet uns der Durchschnitt. Er ist bequem, weil er aus vielen Werten einen einzigen macht, " +
      "und genau darin liegt sein Problem. Betreten zehn Menschen mit gewöhnlichem Einkommen einen Raum und kommt " +
      "eine Milliardärin hinzu, so ist das durchschnittliche Vermögen im Raum plötzlich enorm, ohne dass irgendjemand " +
      "reicher geworden wäre. Der Median, also der Wert in der Mitte, wäre hier ehrlicher. In der Überschrift steht " +
      "er trotzdem selten, denn er klingt nach weniger.\n\n" +
      "Das zweite Problem ist die Auswahl. Eine Erhebung, die ausschließlich online stattfindet, erreicht Menschen, " +
      "die online sind — was harmlos wirkt, bis man bemerkt, dass gerade die Gruppe fehlt, über die berichtet wird. " +
      "Je kleiner die Stichprobe, desto größer zudem der Anteil des Zufalls. Eine Veränderung von zwei Prozentpunkten " +
      "ist bei tausend Befragten ein Signal und bei vierzig Befragten ein Geräusch.\n\n" +
      "Drittens die Darstellung. Beginnt die senkrechte Achse eines Diagramms nicht bei null, sondern bei 94 Prozent, " +
      "so wird aus einem Rückgang um zwei Punkte ein Absturz. Die Zahl ist dabei nicht gefälscht; sie ist inszeniert. " +
      "Genau deshalb lässt sich der Vorwurf so schwer belegen: Niemand hat gelogen.\n\n" +
      "Man könnte einwenden, dass all dies Fachleuten seit Langem bekannt sei. Das trifft zu, ändert aber nichts an " +
      "der Wirkung, denn Zahlen werden nicht in Fachzeitschriften gelesen, sondern in Überschriften. " +
      "Wer Statistik veröffentlicht, räumt das im Kleingedruckten meist ein — dort, wo niemand nachsieht.\n\n" +
      "Die Folgerung ist nicht, Zahlen zu misstrauen. Sie ist bescheidener: Eine Zahl ohne Angabe darüber, wie sie " +
      "zustande kam, ist keine Information, sondern eine Behauptung mit Ziffern.",
    questions: [
      {
        text: "Welche Haltung vertritt der Text?",
        options: [
          "Zahlen sind brauchbar, aber nur zusammen mit der Angabe, wie sie entstanden sind.",
          "Statistiken sind grundsätzlich manipuliert und sollten nicht veröffentlicht werden.",
          "Der Median sollte den Durchschnitt in allen Texten ersetzen.",
        ],
        answer: 0,
        explain: "Son paragraf bunu açıkça söylüyor: „Die Folgerung ist nicht, Zahlen zu misstrauen“ — eksik olan, sayının nasıl oluştuğu bilgisi.",
      },
      {
        text: "Warum steht der Median selten in Überschriften?",
        options: [
          "Weil er weniger dramatisch wirkt als der Durchschnitt.",
          "Weil er schwieriger zu berechnen ist.",
          "Weil er bei kleinen Stichproben nicht funktioniert.",
        ],
        answer: 0,
        explain: "„In der Überschrift steht er trotzdem selten, denn er klingt nach weniger.“ Hesap zorluğu ya da örneklem hiç gerekçe olarak geçmiyor.",
      },
      {
        text: "Was meint der Autor mit „sie ist inszeniert“?",
        options: [
          "Die Zahl stimmt, aber ihre Darstellung erzeugt einen falschen Eindruck.",
          "Die Zahl wurde nachträglich verändert.",
          "Die Zahl stammt aus einer erfundenen Erhebung.",
        ],
        answer: 0,
        explain: "Cümlenin kendisi ayrımı kuruyor: „Die Zahl ist dabei nicht gefälscht; sie ist inszeniert“ — sahtecilik değil, sunum.",
      },
      {
        kind: "truefalse",
        text: "Der Text hält den Einwand für falsch, dass Fachleute diese Probleme längst kennen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Das trifft zu, ändert aber nichts an der Wirkung“ — itirazı kabul ediyor, yalnız sonucunu reddediyor.",
      },
      {
        kind: "gapfill",
        text: "Eine Veränderung von zwei Prozentpunkten ist bei vierzig Befragten nur ein ___.",
        options: [],
        answer: 0,
        accept: ["Geräusch", "Zufall"],
        explain: "„… bei tausend Befragten ein Signal und bei vierzig Befragten ein Geräusch.“ — küçük örneklemde fark gürültüdür.",
      },
      {
        kind: "short_answer",
        text: "Wo räumen Veröffentlichende die Schwächen einer Statistik meist ein?",
        options: [],
        answer: 0,
        accept: ["im Kleingedruckten", "Kleingedruckten", "im Kleingedruckten, wo niemand nachsieht"],
        explain: "„… räumt das im Kleingedruckten meist ein — dort, wo niemand nachsieht.“ İroni tam bu ek cümlede.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l1",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Was ein Archiv wegwirft",
    genre: "interview",
    intro: "Bir arşiv yöneticisiyle söyleşi: neyin saklandığına kim karar veriyor ve bu kararın bedeli ne.",
    gloss: [
      { de: "der Bestand", tr: "koleksiyon", en: "holdings" },
      { de: "die Erschließung", tr: "tanımlama", en: "cataloguing" },
      { de: "kassieren", tr: "ayıklamak", en: "to weed out" },
      { de: "der Nachlass", tr: "kişisel arşiv", en: "personal papers" },
      { de: "unwiederbringlich", tr: "geri getirilemez", en: "irretrievable" },
      { de: "bereuen", tr: "pişman olmak", en: "to regret" },
    ],
    minutes: 10,
    segments: [
      { speaker: "Moderator", text: "Frau Dr. Lindqvist, Sie leiten ein Stadtarchiv. Fangen wir mit dem an, was die meisten überrascht: Sie werfen weg." },
      { speaker: "Dr. Lindqvist", text: "Wir sagen kassieren, aber ja. Von dem, was eine Verwaltung produziert, wird am Ende ungefähr ein bis zwei Prozent dauerhaft aufbewahrt." },
      { speaker: "Moderator", text: "Ein bis zwei Prozent. Wer entscheidet das?" },
      { speaker: "Dr. Lindqvist", text: "Wir, nach schriftlichen Kriterien. Aber ich möchte nicht so tun, als sei das ein rein technischer Vorgang. Jede Bewertung ist eine These darüber, was später jemanden interessieren wird." },
      { speaker: "Moderator", text: "Und wenn diese These falsch ist?" },
      { speaker: "Dr. Lindqvist", text: "Dann ist der Schaden unwiederbringlich. In den Sechzigern galten Personalakten kleiner Betriebe als unwichtig. Heute wären sie die beste Quelle zur Arbeitsmigration, die wir hätten." },
      { speaker: "Moderator", text: "Ließe sich das nicht durch Digitalisierung lösen? Speicher ist billig geworden." },
      { speaker: "Dr. Lindqvist", text: "Das höre ich oft. Speicher ist billig, Erschließung ist es nicht. Ein Bestand, den niemand beschrieben hat, ist digital genauso unauffindbar wie im Keller." },
      { speaker: "Moderator", text: "Sie bekommen auch private Nachlässe. Sagen Sie da je Nein?" },
      { speaker: "Dr. Lindqvist", text: "Häufiger, als Angehörigen lieb ist. Und das ist der unangenehmste Teil meiner Arbeit, weil ich dabei über etwas urteile, das für jemanden ein ganzes Leben war." },
      { speaker: "Moderator", text: "Gibt es Unterlagen, die Ihnen niemand anbietet, die Sie aber gern hätten?" },
      { speaker: "Dr. Lindqvist", text: "Ständig. Vereinsprotokolle, Kassenbücher kleiner Läden, die Korrespondenz von Nachbarschaftsinitiativen. Das Alltägliche wird weggeworfen, weil es niemandem wichtig erscheint, und genau das fehlt später." },
      { speaker: "Moderator", text: "Gibt es eine Entscheidung, die Sie bereuen?" },
      { speaker: "Dr. Lindqvist", text: "Bereuen wäre zu groß. Aber es gibt Kisten, an die ich denke. Man merkt erst zwanzig Jahre später, ob man richtig lag — und dann ist die Frage ohnehin nicht mehr zu ändern." },
    ],
    questions: [
      {
        text: "Was ist die zentrale Aussage von Frau Lindqvist?",
        options: [
          "Archivieren heißt auswählen, und jede Auswahl ist eine riskante Annahme über die Zukunft.",
          "Archive sollten grundsätzlich alles aufbewahren, was eine Verwaltung produziert.",
          "Die Digitalisierung hat das Problem der Auswahl weitgehend gelöst.",
        ],
        answer: 0,
        explain: "„Jede Bewertung ist eine These darüber, was später jemanden interessieren wird“ — söyleşinin geri kalanı bu tezin bedelini anlatıyor.",
      },
      {
        text: "Warum nennt sie die Personalakten der Sechziger?",
        options: [
          "Als Beispiel für eine Auswahlentscheidung, die sich später als falsch erwies.",
          "Um zu zeigen, dass kleine Betriebe schlecht dokumentiert haben.",
          "Weil diese Akten heute noch vollständig vorhanden sind.",
        ],
        answer: 0,
        explain: "O zaman önemsiz sayılmışlar; bugün göç tarihinin en iyi kaynağı olurlardı — „wären … die wir hätten“ Konjunktiv'i tam da yokluğu söylüyor.",
      },
      {
        kind: "truefalse",
        text: "Sie hält billigen Speicherplatz für eine ausreichende Lösung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Speicher ist billig, Erschließung ist es nicht.“ Tanımlanmamış bir koleksiyon dijital ortamda da bulunamaz.",
      },
      {
        kind: "short_answer",
        text: "Wie viel des Verwaltungsschriftguts wird dauerhaft aufbewahrt?",
        options: [],
        answer: 0,
        accept: ["ein bis zwei Prozent", "1 bis 2 Prozent", "ein bis zwei", "1-2 Prozent"],
        explain: "„… wird am Ende ungefähr ein bis zwei Prozent dauerhaft aufbewahrt.“",
      },
      {
        kind: "dictation",
        text: "Depolama ile tanımlama arasındaki farkı kuran cümleyi duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Speicher ist billig, Erschließung ist es nicht.", "Speicher ist billig Erschließung ist es nicht"],
        explain: "„Speicher ist billig, Erschließung ist es nicht.“ — ikinci cümlede yüklem „es“ ile geri gönderiliyor.",
      },
      {
        text: "Wie beantwortet sie die Frage nach dem Bereuen?",
        options: [
          "Sie weist das Wort zurück, gibt aber offene Zweifel zu.",
          "Sie nennt zwei Entscheidungen, die sie eindeutig bereut.",
          "Sie sagt, dass Zweifel in ihrem Beruf nicht vorkommen.",
        ],
        answer: 0,
        explain: "„Bereuen wäre zu groß. Aber es gibt Kisten, an die ich denke.“ — sözcüğü reddedip duyguyu kabul ediyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w1",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Eine Jurybegründung",
    genre: "review",
    intro: "Önce iki cümle kur, sonra bir ödül jürisi adına kararın gerekçesini yaz.",
    gloss: [
      { de: "die Begründung", tr: "gerekçe", en: "rationale" },
      { de: "würdigen", tr: "takdir etmek", en: "to honour" },
      { de: "der Maßstab", tr: "ölçüt", en: "criterion" },
      { de: "überzeugen", tr: "ikna etmek", en: "to convince" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Koleksiyonların dijitalleştirilmesinden sonra kullanım üç katına çıktı.",
        answer: "Nach der Digitalisierung der Bestände hat sich die Nutzung verdreifacht.",
        alternatives: ["Nach der Digitalisierung der Bestände verdreifachte sich die Nutzung."],
        hint: "Nominalstil: yan cümle yerine isim öbeği. „Nachdem die Bestände digitalisiert worden waren“ yerine „Nach der Digitalisierung der Bestände“.",
      },
      {
        kind: "build",
        tr: "Geçen yıl yayımlanan çalışma başka bir sonuca varıyor.",
        answer: "Die im vergangenen Jahr veröffentlichte Studie kommt zu einem anderen Ergebnis.",
        alternatives: ["Die im letzten Jahr veröffentlichte Studie kommt zu einem anderen Ergebnis."],
        hint: "Partizipialattribut: „die Studie, die veröffentlicht wurde“ sıfat öbeğine çekilir ve artikel ile isim ARASINA girer.",
      },
      {
        kind: "free",
        prompt:
          "Bir yerel ödülün jürisindesin. Aşağıdaki kısa dosyaya dayanarak kararın gerekçesini yaz: hangi ölçütü kullandığını açıkla, seçtiğin çalışmayı gerekçelendir, öteki adayı da hakkını vererek an ve kararı bir cümlede topla.",
        stimulus:
          "PREIS DER STADTBIBLIOTHEK — Kurzdossier der Jury\n\n" +
          "Maßstab laut Satzung: „Arbeiten, die den Zugang zu Wissen für Menschen ohne Vorkenntnisse erweitern.“\n\n" +
          "Nominiert A: „Aktenlage“ — ein Podcast, der jede Folge einem einzigen Verwaltungsdokument widmet " +
          "und daran erklärt, wie Entscheidungen zustande kommen. 14 Folgen, sehr genaue Recherche, kleine Hörerschaft.\n\n" +
          "Nominiert B: „Zettelkasten“ — ein Vorleseprojekt an drei Grundschulen; wöchentliche Termine, " +
          "60 beteiligte Kinder, wenig Dokumentation, sehr hohe Beteiligung der Eltern.",
        checklist: [
          "Ölçütü kendi cümlelerinle tanımla",
          "Seçtiğin adayı en az iki somut nedenle gerekçelendir",
          "Öteki adayı küçültmeden değerlendir",
          "Kararı tek bir cümleyle topla",
        ],
        minWords: 120,
        phrases: [
          { de: "Maßgeblich war für die Jury, dass …", tr: "Jüri için belirleyici olan …" },
          { de: "Die Arbeit überzeugt vor allem durch …", tr: "Çalışma özellikle … ile ikna ediyor" },
          { de: "Das schmälert nicht …", tr: "Bu, … değerini azaltmaz" },
          { de: "Ausschlaggebend war schließlich …", tr: "Sonuçta belirleyici olan …" },
          { de: "Die Jury spricht den Preis … zu.", tr: "Jüri ödülü …'ya verir." },
        ],
        sample:
          "Maßgeblich war für die Jury nicht die Größe des Publikums, sondern die Frage, ob eine Arbeit Menschen " +
          "ohne Vorkenntnisse tatsächlich einen Zugang eröffnet — und ob dieser Zugang über den Tag hinaus trägt.\n\n" +
          "Der Podcast „Aktenlage“ überzeugt vor allem durch seine Methode: Statt über Verwaltung zu sprechen, " +
          "legt er ein einzelnes Dokument auf den Tisch und macht daran nachvollziehbar, wie eine Entscheidung " +
          "entsteht. Wer eine Folge gehört hat, liest den nächsten Bescheid anders. Hinzu kommt die Sorgfalt der " +
          "Recherche, die in dieser Form ehrenamtlich kaum zu erwarten ist.\n\n" +
          "Das schmälert die Leistung von „Zettelkasten“ in keiner Weise. Sechzig Kinder wöchentlich zu erreichen " +
          "und dabei die Eltern einzubinden, ist eine organisatorische Leistung, die in keinem Bericht sichtbar wird. " +
          "Ausschlaggebend war schließlich, dass dieses Projekt bereits über eine gesicherte Finanzierung verfügt, " +
          "während der Podcast ohne den Preis vermutlich nicht fortgeführt würde.\n\n" +
          "Die Jury spricht den Preis daher „Aktenlage“ zu — nicht als Auszeichnung für Reichweite, " +
          "sondern für eine Form, die Wissen zugänglich macht, ohne es zu vereinfachen.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s1",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Übersetzen Maschinen uns weg?",
    genre: "monologue",
    intro: "İki dakikaya kadar konuşacaksın: bir konumu savun, karşı tarafı hakkıyla anlat ve kendi ölçütünü koy.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Çeviri araçları artık çoğu durumda anlaşılır sonuç veriyor. Bu, yabancı dil öğrenmeyi gereksiz kılar mı? Konumunu savun, en güçlü karşı argümanı da anlat ve nerede sınır çizdiğini söyle.",
      bulletsTr: [
        "Konumunu bir cümleyle koy",
        "En güçlü karşı argümanı kendi ağzınla anlat",
        "Kendi ölçütünü somut bir örnekle göster",
        "Sınırı ve koşulu söyleyerek bitir",
      ],
      targets: [
        { de: "Vorweg: Ich halte die Frage für falsch gestellt, weil …", tr: "Peşinen: Soruyu yanlış kurulmuş buluyorum, çünkü …" },
        { de: "Das stärkste Gegenargument lautet …", tr: "En güçlü karşı argüman şudur: …" },
        { de: "Entscheidend scheint mir …", tr: "Bana belirleyici görünen …" },
        { de: "Insofern gilt das nur unter der Bedingung, dass …", tr: "Bu bakımdan bu, ancak … koşuluyla geçerli" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "Vorweg: Ich halte die Frage für falsch gestellt, weil sie Sprache auf Informationsübertragung verkürzt. " +
        "Das stärkste Gegenargument lautet, dass niemand mehr Vokabeln lernen muss, um in Lissabon ein Zimmer zu " +
        "bekommen, und das stimmt auch. Wer nur ein Ergebnis braucht, bekommt es heute in zwei Sekunden. " +
        "Entscheidend scheint mir aber, was in dem Moment passiert, in dem man selbst spricht. Wer eine Sprache " +
        "kann, verhandelt anders: Er hört, dass der Satz eine Spur zu freundlich klang, er merkt, dass sein " +
        "Gegenüber ausweicht, und er kann sofort korrigieren. Ein Gerät liefert eine Übersetzung, aber es liefert " +
        "keine Beziehung. Hinzu kommt, dass jede Übersetzung eine Deutung ist; wer die Ausgangssprache nicht " +
        "beherrscht, kann nicht beurteilen, was gerade geglättet wurde. " +
        "Insofern gilt der Verzicht auf das Lernen nur unter der Bedingung, dass man sich mit dem Ergebnis " +
        "zufriedengibt und auf jede Nuance verzichtet. Für Reisen mag das genügen; für Arbeit, Recht oder " +
        "Freundschaft halte ich es für eine teure Bequemlichkeit.",
      rubricHint:
        "Konum, karşı argüman ve koşul üçü de bulunmalı; kayıt (Register) tutarlı ve C1 düzeyinde soyut olmalı.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g1",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Nominal oder verbal?",
    genre: "grammar",
    intro: "Aynı içeriği iki ayrı üslupta söyleyebilmek ve hangisinin nereye ait olduğunu bilmek.",
    focus: "Nominalstil ↔ Verbalstil ve Partizipialattribut",
    gloss: [
      { de: "die Einführung", tr: "yürürlüğe koyma", en: "introduction" },
      { de: "die Prüfung", tr: "inceleme", en: "review" },
      { de: "die Sanierung", tr: "onarım", en: "refurbishment" },
      { de: "vorliegen", tr: "mevcut olmak", en: "to be available" },
      { de: "beifügen", tr: "eklemek", en: "to attach" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Aynı içerik, iki üslup",
        tr: "Fiil cümlesi olayı zamanla ve failiyle anlatır; isim öbeği aynı olayı sıkıştırır ve ikisini de gizleyebilir. Türkçedeki „-mesi/-dıktan sonra“ dönüşümüne benzer, ama Almancada bu bir üslup kararıdır: kurumsal metin nominal, konuşma ve iyi gazetecilik verbal.",
        examples: [
          { de: "Nachdem die Regel eingeführt worden war, sanken die Kosten.", tr: "Kural yürürlüğe girdikten sonra maliyetler düştü.", note: "verbal" },
          { de: "Nach der Einführung der Regel sanken die Kosten.", tr: "Kuralın yürürlüğe girmesinden sonra maliyetler düştü.", note: "nominal" },
          { de: "Weil der Bericht fehlte, wurde die Sitzung verschoben.", tr: "Rapor eksik olduğu için toplantı ertelendi." },
          { de: "Wegen des fehlenden Berichts wurde die Sitzung verschoben.", tr: "Eksik rapor nedeniyle toplantı ertelendi." },
        ],
      },
      {
        heading: "Partizipialattribut: sıfat cümlesini öne çekmek",
        tr: "Bir sıfat cümlesi („die Studie, die im Mai veröffentlicht wurde“) sıkıştırılıp artikel ile ismin ARASINA yerleştirilebilir. Partizip I etken ve süren bir işi, Partizip II bitmiş ya da edilgen bir işi taşır.",
        examples: [
          { de: "die im Mai veröffentlichte Studie", tr: "mayısta yayımlanan çalışma", note: "Partizip II: edilgen, bitmiş" },
          { de: "die seit Jahren steigenden Kosten", tr: "yıllardır artan maliyetler", note: "Partizip I: etken, süren" },
          { de: "das dem Antrag beigefügte Gutachten", tr: "başvuruya eklenen bilirkişi raporu", note: "araya giren tümleç sırayı bozmaz" },
        ],
      },
      {
        heading: "Ne zaman hangisi",
        tr: "Nominal üslup yoğunlaştırır ama okuru yorar ve faili silmeye elverişlidir. Bir metni anlaşılır kılmanın en hızlı yolu, isimleşmiş eylemleri fiile geri çevirmektir: „zur Durchführung bringen“ yerine yalnızca „durchführen“.",
        examples: [
          { de: "Die Prüfung des Antrags erfolgt durch die Fachabteilung.", tr: "Başvurunun incelenmesi ilgili birim tarafından yapılır.", note: "ağır nominal" },
          { de: "Die Fachabteilung prüft den Antrag.", tr: "İlgili birim başvuruyu inceler.", note: "aynı bilgi, yarı uzunluk" },
        ],
      },
    ],
    questions: [
      {
        text: "„Nach Abschluss der Sanierung wird das Haus wieder geöffnet.“ — Hangi fiil cümlesi buna denk düşer?",
        options: [
          "Nachdem die Sanierung abgeschlossen worden ist, wird das Haus wieder geöffnet.",
          "Während die Sanierung abgeschlossen wird, öffnet das Haus.",
          "Bevor die Sanierung abgeschlossen wird, öffnet das Haus.",
        ],
        answer: 0,
        explain: "„nach + Abschluss“ önceliği anlatır: yan cümlesi „nachdem“ ile kurulur ve edilgen kalır.",
      },
      {
        text: "Hangisi doğru bir Partizipialattribut?",
        options: [
          "die gestern beschlossene Regelung",
          "die Regelung beschlossene gestern",
          "die beschlossene gestern Regelung",
        ],
        answer: 0,
        explain: "Sıra sabittir: artikel + tümleçler + ortaç + isim. Tümleç ortaçtan önce gelir.",
      },
      {
        text: "„die seit Monaten sinkenden Zahlen“ — Partizip I burada neyi söylüyor?",
        options: [
          "Sayıların düşüşü sürüyor (etken, bitmemiş).",
          "Sayılar birileri tarafından düşürüldü (edilgen).",
          "Sayıların düşüşü tamamlandı.",
        ],
        answer: 0,
        explain: "Partizip I etken ve süren bir işi taşır; edilgen ya da bitmiş bir iş Partizip II ile verilir.",
      },
      {
        kind: "gapfill",
        text: "Nominal yaz: „Weil die Kosten gestiegen sind, wurde das Projekt gestoppt.“ → „___ der Kosten wurde das Projekt gestoppt.“",
        options: [],
        answer: 0,
        accept: ["Wegen des Anstiegs", "Aufgrund des Anstiegs", "Wegen des Anstieges", "Aufgrund des Anstieges"],
        explain: "Sebep yan cümlesi isimleşince edat gerekir: „wegen/aufgrund + Genitiv“ ve fiil isme döner (steigen → der Anstieg).",
      },
      {
        kind: "gapfill",
        text: "Sıfat öbeğine çevir: „das Gutachten, das dem Antrag beigefügt wurde“ → „das ___ Gutachten“",
        options: [],
        answer: 0,
        accept: ["dem Antrag beigefügte", "dem Antrag beigefügte Gutachten"],
        explain: "Edilgen ve bitmiş iş → Partizip II; tümleç ortaçtan önce, hepsi artikel ile ismin arasına girer.",
      },
      {
        kind: "gapfill",
        text: "Fiile geri çevir: „Die Prüfung des Antrags erfolgt durch die Abteilung.“ → „Die Abteilung ___ den Antrag.“",
        options: [],
        answer: 0,
        accept: ["prüft"],
        explain: "„Prüfung … erfolgt durch X“ kalıbı tek fiile iner: X prüft. Kurumsal metni açmanın en hızlı yolu budur.",
      },
      {
        kind: "order",
        text: "Sıfat öbeğini doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["die", "im", "letzten", "Jahr", "eingereichten", "Anträge"],
        explain: "Artikel, tümleç, ortaç, isim: die im letzten Jahr eingereichten Anträge.",
      },
      {
        kind: "truefalse",
        text: "„Die im Mai veröffentlichende Studie liegt jetzt vor.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Çalışma yayımlanan taraftır, yayımlayan değil: „die im Mai veröffentlichte Studie“ (Partizip II).",
      },
      {
        kind: "truefalse",
        text: "„Nach der Prüfung des Antrags erhalten Sie einen Bescheid.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Doğru kurulmuş bir nominal öbek: „nach + Dativ“, ardından Genitiv tamlaması. Resmî yazının tipik cümlesi.",
      },
      {
        text: "Nominal üslubun asıl riski nedir?",
        options: [
          "Faili ve zamanı silmeye elverişli olması.",
          "Dilbilgisel olarak yanlış sayılması.",
          "Yalnız konuşma dilinde kullanılabilmesi.",
        ],
        answer: 0,
        explain: "İsimleşen eylem, kimin ne zaman yaptığını taşımak zorunda değildir; metin yoğunlaşırken sorumluluk kaybolur.",
      },
    ],
  },
];
