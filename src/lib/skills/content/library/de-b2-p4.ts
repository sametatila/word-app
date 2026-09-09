import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 4.
 *
 * Hücre başına hedef beş egzersiz; bu dosya 4. seti taşır (kimlik sonu 4).
 * Kurallar ve emsal: `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Türler: hukuk rehberi, danışma görüşmesi ve dernek tartışmasına katkı.
 * Dil bilgisi zıtlık ve orantı bağlayıcıları.
 */
export const deB2P4: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r4",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Streit im Haus: was eine Schlichtung leistet",
    genre: "Bilgilendirme",
    intro: "Komşu anlaşmazlıklarında mahkeme öncesi uzlaştırmayı anlatan bir rehber okuyacaksın: kim yapıyor, nasıl işliyor, sınırı ne.",
    gloss: [
      { de: "die Schlichtung", tr: "uzlaştırma", en: "conciliation" },
      { de: "die Klage", tr: "dava", en: "lawsuit" },
      { de: "ehrenamtlich", tr: "gönüllü", en: "voluntary" },
      { de: "die Gebühr", tr: "harç", en: "fee" },
      { de: "laden", tr: "çağırmak", en: "to summon" },
      { de: "die Einigung", tr: "anlaşma", en: "agreement" },
      { de: "vollstreckbar", tr: "icra edilebilir", en: "enforceable" },
    ],
    minutes: 9,
    text:
      "STREIT IM HAUS: WAS EINE SCHLICHTUNG LEISTET\n\n" +
      "Der Kirschbaum wirft Schatten, der Grill zieht Rauch, die Waschmaschine läuft um halb elf. Solche " +
      "Konflikte enden erstaunlich oft vor Gericht, obwohl fast alle Beteiligten hinterher sagen, dass sie das " +
      "nie wollten. In vielen Bundesländern muss deshalb bei Nachbarstreitigkeiten zuerst eine Schlichtung " +
      "versucht werden, bevor eine Klage überhaupt angenommen wird.\n\n" +
      "Zuständig ist eine ehrenamtlich tätige Person im Stadtteil, oft Schiedsfrau oder Schiedsmann genannt. " +
      "Sie ist keine Richterin und entscheidet nichts. Ihre Aufgabe besteht darin, ein Gespräch zu ermöglichen, " +
      "das zwischen den Parteien seit Monaten nicht mehr stattfindet.\n\n" +
      "Der Ablauf ist schlicht. Wer einen Antrag stellt, zahlt eine Gebühr zwischen zehn und vierzig Euro. " +
      "Beide Seiten werden geladen; wer nicht erscheint, riskiert Kosten. Das Gespräch dauert selten länger als " +
      "eine Stunde und findet in einem neutralen Raum statt, nicht in einer der beiden Wohnungen.\n\n" +
      "Die Erfolgsquote liegt je nach Region zwischen vierzig und sechzig Prozent. Auffällig ist ein Muster: " +
      "Je konkreter der Streitpunkt ist, desto eher wird eine Einigung erreicht. Über Grillzeiten lässt sich " +
      "verhandeln, über die Frage, wer sich zuerst unhöflich verhalten hat, nicht.\n\n" +
      "Trotzdem hat das Verfahren Grenzen. Wo Gewalt im Spiel ist, gehört der Fall nicht in ein " +
      "Wohnzimmergespräch. Und wenn eine Seite die Schlichtung nur als Pflichtstation auf dem Weg zum Gericht " +
      "behandelt, bleibt sie eine Formalie.\n\n" +
      "Wer es ernst meint, sollte drei Dinge mitbringen: einen einzigen, klar formulierten Punkt, eine Zahl oder " +
      "Uhrzeit, über die man reden kann, und die Bereitschaft, das Ergebnis schriftlich festzuhalten. Eine " +
      "unterschriebene Vereinbarung ist dreißig Jahre lang vollstreckbar — mehr, als die meisten Urteile im " +
      "Alltag bewirken.",
    questions: [
      {
        text: "Was leistet eine Schlichtung?",
        options: [
          "Sie ermöglicht ein Gespräch, ohne zu entscheiden.",
          "Sie ersetzt das Urteil eines Gerichts.",
          "Sie prüft, wer von beiden im Recht ist.",
        ],
        answer: 0,
        explain: "„Sie ist keine Richterin und entscheidet nichts. Ihre Aufgabe besteht darin, ein Gespräch zu ermöglichen.“",
      },
      {
        text: "Wer führt die Schlichtung durch?",
        options: [
          "eine ehrenamtlich tätige Person aus dem Stadtteil",
          "eine hauptamtliche Richterin am Amtsgericht",
          "ein von der Stadt bezahlter Anwalt",
        ],
        answer: 0,
        explain: "„Zuständig ist eine ehrenamtlich tätige Person im Stadtteil, oft Schiedsfrau oder Schiedsmann genannt.“",
      },
      {
        kind: "truefalse",
        text: "Das Gespräch findet nicht in einer der beiden Wohnungen statt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„… findet in einem neutralen Raum statt, nicht in einer der beiden Wohnungen.“",
      },
      {
        kind: "gapfill",
        text: "Die Gebühr liegt zwischen zehn und ___ Euro.",
        options: [],
        answer: 0,
        accept: ["vierzig", "40"],
        explain: "„Wer einen Antrag stellt, zahlt eine Gebühr zwischen zehn und vierzig Euro.“",
      },
      {
        kind: "short_answer",
        text: "Wie lange bleibt eine unterschriebene Vereinbarung vollstreckbar?",
        options: [],
        answer: 0,
        accept: ["dreißig Jahre", "30 Jahre", "dreißig Jahre lang"],
        explain: "„Eine unterschriebene Vereinbarung ist dreißig Jahre lang vollstreckbar.“",
      },
      {
        text: "Welches Muster nennt der Text?",
        options: [
          "Konkrete Streitpunkte lassen sich eher lösen.",
          "Ältere Menschen einigen sich schneller.",
          "Im Sommer gibt es mehr Einigungen.",
        ],
        answer: 0,
        explain: "„Je konkreter der Streitpunkt ist, desto eher wird eine Einigung erreicht.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l4",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Beratung wegen eines Gebrauchtwagens",
    genre: "Danışma görüşmesi",
    intro: "Tüketici danışma merkezinde bir görüşme: sorun ne, hukuken kimin ne yapması gerekiyor, hangi sırayla.",
    gloss: [
      { de: "das Getriebe", tr: "şanzıman", en: "gearbox" },
      { de: "die Gewährleistung", tr: "garanti sorumluluğu", en: "warranty" },
      { de: "der Mangel", tr: "kusur", en: "defect" },
      { de: "die Frist", tr: "süre", en: "deadline" },
      { de: "mindern", tr: "indirmek", en: "to reduce" },
      { de: "das Einschreiben", tr: "taahhütlü posta", en: "registered letter" },
    ],
    minutes: 9,
    segments: [
      { speaker: "Beraterin", text: "Guten Tag, setzen Sie sich. Sie haben am Telefon von einem Gebrauchtwagen gesprochen." },
      { speaker: "Herr Weiler", text: "Ja. Ich habe den Wagen vor sechs Wochen bei einem Händler gekauft. Vor zehn Tagen ist das Getriebe ausgefallen." },
      { speaker: "Beraterin", text: "Bei einem Händler, nicht privat? Das ist wichtig. Dann haben Sie Gewährleistung, obwohl der Wagen gebraucht ist." },
      { speaker: "Herr Weiler", text: "Er sagt, ich hätte den Schaden selbst verursacht. Ich fahre seit dreißig Jahren, ich weiß, wie man schaltet." },
      { speaker: "Beraterin", text: "Das müssen Sie gar nicht beweisen. In den ersten zwölf Monaten wird vermutet, dass der Mangel schon beim Kauf da war. Der Händler muss das Gegenteil zeigen." },
      { speaker: "Herr Weiler", text: "Davon hat er nichts gesagt." },
      { speaker: "Beraterin", text: "Das überrascht mich nicht. Wichtig ist jetzt der Ablauf. Sie setzen ihm schriftlich eine Frist, zum Beispiel vierzehn Tage, und verlangen die Reparatur." },
      { speaker: "Herr Weiler", text: "Und wenn er nicht reagiert?" },
      { speaker: "Beraterin", text: "Dann können Sie vom Vertrag zurücktreten oder den Preis mindern. Aber je genauer Ihr Schreiben ist, desto weniger Spielraum hat er." },
      { speaker: "Beraterin", text: "Notieren Sie außerdem, wann Sie ihn angerufen haben und was er gesagt hat. Solche Notizen wiegen später mehr, als die meisten denken." },
      { speaker: "Herr Weiler", text: "Ich habe die Rechnung der Werkstatt dabei." },
      { speaker: "Beraterin", text: "Sehr gut. Machen Sie eine Kopie und schicken Sie den Brief per Einschreiben. Trotzdem ein Hinweis: Reparieren Sie nichts auf eigene Faust, bevor die Frist abgelaufen ist." },
      { speaker: "Herr Weiler", text: "Verstanden. Und was kostet mich das hier?" },
      { speaker: "Beraterin", text: "Die Erstberatung ist kostenlos. Wenn Sie danach eine Prüfung des Vertrags wünschen, sind es fünfundzwanzig Euro." },
    ],
    questions: [
      {
        text: "Worum geht es in dem Gespräch?",
        options: [
          "um einen Mangel an einem gekauften Auto",
          "um einen Unfall mit einem Mietwagen",
          "um die Kündigung einer Versicherung",
        ],
        answer: 0,
        explain: "„Ich habe den Wagen vor sechs Wochen bei einem Händler gekauft. Vor zehn Tagen ist das Getriebe ausgefallen.“",
      },
      {
        text: "Warum ist der Kauf beim Händler wichtig?",
        options: ["Dann gilt die Gewährleistung.", "Dann ist der Preis niedriger.", "Dann entfällt jede Frist."],
        answer: 0,
        explain: "„Dann haben Sie Gewährleistung, obwohl der Wagen gebraucht ist.“",
      },
      {
        kind: "truefalse",
        text: "Herr Weiler muss beweisen, dass der Schaden schon beim Kauf da war.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„In den ersten zwölf Monaten wird vermutet, dass der Mangel schon beim Kauf da war. Der Händler muss das Gegenteil zeigen.“",
      },
      {
        kind: "short_answer",
        text: "Welche Frist schlägt die Beraterin vor?",
        options: [],
        answer: 0,
        accept: ["vierzehn Tage", "14 Tage", "zwei Wochen"],
        explain: "„Sie setzen ihm schriftlich eine Frist, zum Beispiel vierzehn Tage.“",
      },
      {
        kind: "dictation",
        text: "Ücretle ilgili cevabın ilk cümlesini duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Die Erstberatung ist kostenlos.", "Die Erstberatung ist kostenlos"],
        explain: "„Die Erstberatung ist kostenlos.“ — ücret ancak sözleşme incelemesinde başlıyor.",
      },
      {
        text: "Wovor warnt die Beraterin?",
        options: [
          "vor einer Reparatur vor Ablauf der Frist",
          "vor einem Brief per Einschreiben",
          "vor einem weiteren Gespräch mit dem Händler",
        ],
        answer: 0,
        explain: "„Reparieren Sie nichts auf eigene Faust, bevor die Frist abgelaufen ist.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w4",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Acht Stunden oder achtzig Euro?",
    genre: "Tartışma katkısı",
    intro: "Derneğin forumunda bir öneri tartışılıyor; önce iki cümle kur, sonra gerekçeli katkını yaz.",
    gloss: [
      { de: "die Arbeitsstunde", tr: "çalışma saati", en: "work hour" },
      { de: "die Pflicht", tr: "zorunluluk", en: "obligation" },
      { de: "sich freikaufen", tr: "parayla muaf olmak", en: "to buy oneself out" },
      { de: "staffeln", tr: "kademelendirmek", en: "to tier" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Kural sert olsa da çoğu üye onu adil buluyor.",
        answer: "Obwohl die Regel hart ist, finden die meisten Mitglieder sie gerecht.",
        alternatives: ["Die meisten Mitglieder finden sie gerecht, obwohl die Regel hart ist."],
        hint: "„obwohl“ bir yan cümle açar ve fiili sona atar; yan cümle önde de arkada da durabilir.",
      },
      {
        kind: "build",
        tr: "Aidat zaten yüksek; buna rağmen çalışma saatleri isteniyor.",
        answer: "Der Beitrag ist schon hoch; trotzdem werden Arbeitsstunden verlangt.",
        alternatives: ["Der Beitrag ist schon hoch; Arbeitsstunden werden trotzdem verlangt."],
        hint: "„trotzdem“ yan cümle açmaz, ana cümlede bir öğedir; başa alınırsa fiil hemen arkasından gelir.",
      },
      {
        kind: "free",
        prompt:
          "Derneğin forumunda bir öneri tartışılıyor. Katkını yaz: net bir tutum al, iki gerekçe ver, ciddiye aldığın bir itirazı söyle ve öneriyi düzeltecek somut bir teklif yap.",
        stimulus:
          "Antrag zur Mitgliederversammlung: Ab dem nächsten Jahr leistet jedes Mitglied acht Arbeitsstunden " +
          "(Platzpflege, Feste, Kiosk). Wer das nicht kann, zahlt achtzig Euro. Diskussion im Forum bis Freitag.",
        checklist: [
          "Tutumunu ilk cümlede söyle",
          "İki gerekçeni sayılarla ya da örnekle destekle",
          "Ciddiye aldığın itirazı adlandır",
          "Öneriyi düzelten somut bir teklifle bitir",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich bin für den Antrag, aber …", tr: "Öneriye katılıyorum, ama …" },
          { de: "Zwei Gründe sprechen dafür.", tr: "Bunun iki gerekçesi var." },
          { de: "Je …, desto …", tr: "Ne kadar …, o kadar …" },
          { de: "Einen Einwand nehme ich ernst: …", tr: "Bir itirazı ciddiye alıyorum: …" },
          { de: "Mein Vorschlag: …", tr: "Önerim: …" },
        ],
        sample:
          "Ich bin für den Antrag, aber nicht in dieser Form. Zwei Gründe sprechen dafür. Erstens tragen im " +
          "Moment etwa fünfzehn Leute den ganzen Platz, obwohl wir dreihundert Mitglieder haben; das hält keine " +
          "drei Jahre. Zweitens ist eine klare Zahl ehrlicher als der ständige Aufruf im Newsletter, bei dem sich " +
          "immer dieselben melden. Je konkreter eine Pflicht formuliert ist, desto weniger schlechtes Gewissen " +
          "entsteht bei denen, die wirklich nicht können. Einen Einwand nehme ich trotzdem ernst: Achtzig Euro " +
          "sind für eine Familie mit drei Kindern etwas anderes als für mich. Wer sich freikauft, kauft sich " +
          "nicht gleich viel. Mein Vorschlag: Wir behalten die acht Stunden, staffeln aber den Ersatzbetrag nach " +
          "der Zahl der Mitgliedschaften im Haushalt und lassen Stunden auch außerhalb der Wochenenden zu, zum " +
          "Beispiel Buchhaltung oder Website. Dann ist es eine Pflicht, die man erfüllen kann, und nicht nur " +
          "eine, die man bezahlt.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s4",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Regeln oder Vertrauen?",
    genre: "Monolog",
    intro: "Bir buçuk dakikaya kadar konuşacaksın: iki yaklaşımı karşılaştır ve hangisinin nerede işe yaradığını ayır.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Bir toplulukta düzen ayrıntılı kurallarla mı yoksa güvenle mi sağlanır? İki yaklaşımı karşılaştır, ikisinin de zayıf yanını göster ve kendi ölçütünü söyle.",
      bulletsTr: [
        "Soruyu ikili karşıtlıktan çıkar",
        "Kuralın güçlü ve zayıf yanını söyle",
        "Güvenin güçlü ve zayıf yanını söyle",
        "Kendi ölçütünle bitir: hangi durumda hangisi",
      ],
      targets: [
        { de: "Regeln haben einen klaren Vorteil: …", tr: "Kuralların açık bir üstünlüğü var: …" },
        { de: "Je kleiner …, desto besser …", tr: "Ne kadar küçükse, o kadar iyi …" },
        { de: "Obwohl das stimmt, …", tr: "Bu doğru olsa da …" },
        { de: "Mein Kriterium wäre …", tr: "Benim ölçütüm … olurdu" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Ich glaube, die Frage ist falsch gestellt, weil Regeln und Vertrauen keine Gegensätze sind. " +
        "Regeln haben einen klaren Vorteil: Sie schützen die Schwächeren. Wer neu ist, kennt die ungeschriebenen " +
        "Gewohnheiten nicht und ist ohne Regeln immer im Nachteil. Je kleiner eine Gruppe ist, desto besser " +
        "funktioniert dagegen Vertrauen, weil jeder sieht, wer wie viel tut. Obwohl das stimmt, wächst mit der " +
        "Größe auch die Zahl derer, die sich unauffällig zurückziehen können. Trotzdem kippt zu viel Regelung " +
        "ins Gegenteil: Wenn jede Kleinigkeit geschrieben steht, hört man auf mitzudenken und fragt nur noch, " +
        "was erlaubt ist. Mein Kriterium wäre deshalb nicht die Größe, sondern die Folge eines Fehlers. " +
        "Wo ein Fehler nur ärgerlich ist, reicht Vertrauen. Wo er teuer oder gefährlich wird, braucht es eine " +
        "geschriebene Regel — und zwar eine kurze, die man auch liest.",
      rubricHint:
        "İki yaklaşımın da güçlü ve zayıf yanı geçmeli; „obwohl“, „trotzdem“ ve „je … desto“ beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g4",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "obwohl, trotzdem, je … desto",
    genre: "Kural",
    intro: "Aynı zıtlığı üç ayrı dizimle kurabilirsin; hangisini seçtiğin cümlenin sırasını tümüyle değiştirir.",
    focus: "Konnektoren: obwohl, trotzdem ve je … desto",
    gloss: [
      { de: "die Sitzung", tr: "oturum", en: "session" },
      { de: "müde", tr: "yorgun", en: "tired" },
      { de: "selten", tr: "nadir", en: "rare" },
      { de: "das Gerät", tr: "cihaz", en: "device" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Bir anlam, üç dizim",
        tr: "Türkçede zıtlığı „-mesine rağmen“ ya da „buna rağmen“ ile kurarsın. Almancada seçtiğin kelime cümlenin sırasını belirler: „obwohl“ yan cümle açar ve fiili sona atar, „trotzdem“ ana cümlede bir öğedir, „trotz“ ise Genitiv isteyen bir edattır.",
        examples: [
          { de: "Obwohl es regnete, sind wir gelaufen.", tr: "Yağmur yağmasına rağmen yürüdük.", note: "yan cümle, fiil sonda" },
          { de: "Es regnete. Trotzdem sind wir gelaufen.", tr: "Yağmur yağıyordu. Buna rağmen yürüdük.", note: "ana cümle, fiil ikinci" },
          { de: "Trotz des Regens sind wir gelaufen.", tr: "Yağmura rağmen yürüdük.", note: "edat + Genitiv" },
        ],
      },
      {
        heading: "je … desto",
        tr: "Orantı iki karşılaştırma derecesiyle kurulur. „je“ ile başlayan yarı bir YAN cümledir, yani fiili sona gider; „desto“ ile başlayan yarı ana cümledir ve fiil hemen „desto + sıfat“ öbeğinin arkasından gelir.",
        examples: [
          { de: "Je klarer die Regel ist, desto seltener gibt es Streit.", tr: "Kural ne kadar açıksa, tartışma o kadar az olur." },
          { de: "Je länger die Sitzung dauerte, desto weniger wurde gesagt.", tr: "Oturum uzadıkça daha az konuşuldu." },
          { de: "Je mehr man übt, desto sicherer wird man.", tr: "İnsan ne kadar çalışırsa o kadar emin olur." },
        ],
      },
      {
        heading: "İki sık hata",
        tr: "Birincisi: „obwohl“ ve „trotzdem“ aynı cümlede birlikte kullanılmaz; ikisi de zıtlığı kurar, biri yeter. İkincisi: „je … desto“ yapısında iki tarafta da karşılaştırma derecesi olmalı — „je klar“ değil „je klarer“.",
        examples: [
          { de: "Obwohl es spät war, sind wir geblieben.", tr: "Geç olmasına rağmen kaldık.", note: "trotzdem eklenmez" },
          { de: "Es war spät. Trotzdem sind wir geblieben.", tr: "Geç olmuştu. Yine de kaldık." },
          { de: "Je genauer, desto besser.", tr: "Ne kadar kesinse o kadar iyi.", note: "iki taraf da derece" },
        ],
      },
    ],
    questions: [
      {
        text: "___ es regnete, sind wir gelaufen.",
        options: ["Obwohl", "Trotzdem", "Trotz"],
        answer: 0,
        explain: "Arkasından özne ve sonda fiil gelen bir yan cümle var; bunu yalnız „obwohl“ açar.",
      },
      {
        text: "Es regnete. ___ sind wir gelaufen.",
        options: ["Trotzdem", "Obwohl", "Je"],
        answer: 0,
        explain: "Fiil hemen arkasından geliyor, yani ana cümle: „trotzdem“ birinci öğedir.",
      },
      {
        text: "Je länger die Sitzung dauerte, ___ weniger wurde gesagt.",
        options: ["desto", "trotzdem", "obwohl"],
        answer: 0,
        explain: "„je“ ile açılan orantının ikinci yarısı „desto“ ile gelir.",
      },
      {
        kind: "gapfill",
        text: "___ der Preis hoch ist, kaufen viele das Gerät.",
        options: [],
        answer: 0,
        accept: ["Obwohl", "obwohl"],
        explain: "Yan cümlenin fiili sonda („ist“), bu yüzden bağlaç obwohl olmalı.",
      },
      {
        kind: "gapfill",
        text: "Der Preis ist hoch. ___ kaufen viele das Gerät.",
        options: [],
        answer: 0,
        accept: ["Trotzdem", "trotzdem"],
        explain: "İkinci cümle ana cümle ve fiil ikinci sırada; başa gelen öğe trotzdem'dir.",
      },
      {
        kind: "gapfill",
        text: "Je klarer die Regel ist, ___ seltener gibt es Streit.",
        options: [],
        answer: 0,
        accept: ["desto", "umso"],
        explain: "Orantının ikinci yarısı „desto“ (ya da „umso“) ile başlar ve fiil hemen arkasından gelir.",
      },
      {
        kind: "gapfill",
        text: "Obwohl er müde ___, blieb er bis zum Ende. (sein, Präteritum)",
        options: [],
        answer: 0,
        accept: ["war"],
        explain: "Yan cümlede çekimli fiil en sona gider: obwohl er müde war.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Obwohl", "es", "kalt", "war", "blieben", "wir"],
        explain: "Yan cümle önce ve fiili sonda; ana cümle doğrudan fiille başlar: Obwohl es kalt war, blieben wir.",
      },
      {
        kind: "truefalse",
        text: "„Obwohl es spät war, trotzdem sind wir geblieben.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "İki zıtlık kelimesi birlikte kullanılmaz; biri seçilir.",
      },
      {
        kind: "truefalse",
        text: "„Je mehr ich lese, desto schneller werde ich.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İki tarafta da karşılaştırma derecesi var ve fiiller doğru yerde; cümle doğru.",
      },
    ],
  },
];
