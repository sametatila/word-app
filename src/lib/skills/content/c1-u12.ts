import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 12 — "Özet, kolokyum, uzman tartışması, sadeleştirme".
 *
 * Dört ders: Das Abstract · Das Kolloquium · Unter Experten · Einfach erklärt.
 *
 *   Kelime: sich stützen auf, nahelegen, die Fragestellung, die Vorgehensweise,
 *           aufzeigen, untermauern, erwägen, die Aufklärung · einwenden,
 *           entgegenhalten, mit Verlaub, die These, schlüssig, widerlegen,
 *           begutachten, das Gutachten · zugrunde liegen, verkürzt, der
 *           Diskurs, die Prämisse, differenzieren, die Kommission, die
 *           Aufsicht, die Berufung · vereinfachen, anschaulich, die Faustregel,
 *           zugänglich, greifbar, die Anklage, die Klage, anklagen
 *
 * Ünitenin çekirdeği: BİLİMSEL DİL KESİNLİK İÇİN DEĞİL, İDDİANIN GÜCÜNÜ
 * ÖLÇMEK İÇİN VARDIR. "Die Ergebnisse legen nahe" ile "Die Ergebnisse zeigen"
 * arasındaki fark üslup değil, ne kadar ileri gidildiğidir. Türkçe konuşan
 * akademik yazıda çoğu zaman fazla ileri gider, çünkü çekingen fiiller
 * Türkçede zayıflık gibi duyulur.
 *
 * Sadeleştirme dersi bunun aynası: basitleştirirken hangi kayıp kabul
 * edilebilir? "Der Vergleich hinkt, aber …" kalıbı tam bu dürüstlüğü taşıyor.
 */
export const c1U12: SkillExercise[] = [
  {
    id: "c1-u12-r1",
    level: "C1",
    skill: "reading",
    unit: 12,
    title: "Was ein Abstract verspricht",
    genre: "Rehber yazısı",
    intro: "Özet yazma dili: hangi fiil ne kadar iddia taşıyor?",
    gloss: [
      { de: "nahelegen", tr: "düşündürmek, işaret etmek", en: "to suggest" },
      { de: "aufzeigen", tr: "göstermek, ortaya koymak", en: "to demonstrate" },
      { de: "sich stützen auf", tr: "dayanmak", en: "to be based on" },
      { de: "untermauern", tr: "kanıtlarla desteklemek", en: "to underpin" },
      { de: "die Fragestellung", tr: "araştırma sorusu", en: "research question" },
      { de: "die Vorgehensweise", tr: "yöntem", en: "methodology" },
      { de: "erwägen", tr: "değerlendirmek", en: "to consider" },
    ],
    minutes: 7,
    text:
      "DIE LEITER DER BEHAUPTUNG\n\n" +
      "Ein Abstract ist kein Werbetext, sondern ein Versprechen. Wer darin mehr behauptet, als die Arbeit einlöst, verliert die Leser genau dort, wo er sie gewinnen wollte.\n\n" +
      "Die deutsche Wissenschaftssprache hat für diesen Zweck eine feine Abstufung entwickelt, und sie steht in den Verben.\n\n" +
      "„Die Ergebnisse legen nahe, dass …“ ist die vorsichtigste Stufe: Es gibt einen Zusammenhang, aber die Arbeit erklärt ihn nicht. „Die Ergebnisse deuten darauf hin“ liegt gleichauf. „Die Untersuchung zeigt auf, dass …“ geht weiter — hier wird ein Befund beansprucht. „Die Daten belegen“ steht am oberen Ende und verlangt, dass jemand die Daten prüfen kann.\n\n" +
      "Wer die Stufen verwechselt, wird im Kolloquium zuverlässig gefragt: Ist das gezeigt oder vermutet?\n\n" +
      "Ein zweiter Punkt betrifft die Vorgehensweise. Sie gehört ins Abstract, aber in einem Satz. „Die Arbeit stützt sich auf 34 leitfadengestützte Interviews“ genügt; wer die Methode ausführt, nimmt den Platz, den die Fragestellung braucht.\n\n" +
      "Ebenso wichtig ist, was ein Abstract nicht leisten kann: Es untermauert nichts. Belege stehen im Text, nicht in der Zusammenfassung — wer dort Zahlen häuft, verliert die Aussage, die sie tragen sollen.\n\n" +
      "Auch die Länge ist geregelt und wird trotzdem regelmäßig überschritten: 150 bis 250 Wörter sind üblich, und wer darüber liegt, wird meist nicht ausführlicher, sondern unentschlossener.\n\n" +
      "Wer sein Abstract prüfen will, streicht probeweise alles bis auf zwei Sätze und sieht nach, welche übrig bleiben.\n\n" +
      "Und der häufigste Fehler? Das Abstract nennt, was untersucht wurde, aber nicht, was herauskam. Ein Abstract ohne Ergebnis ist eine Ankündigung, kein Abstract — und der Leser erwägt in diesem Moment, ob er weiterliest.",
    questions: [
      {
        text: "Welches Verb steht laut Text am oberen Ende der Leiter?",
        options: ["nahelegen", "aufzeigen", "belegen"],
        answer: 2,
        explain: "„verlangt, dass jemand die Daten prüfen kann“ — en güçlü iddia, en yüksek kanıt yükü.",
      },
      {
        kind: "gapfill",
        text: "Die Ergebnisse ___ nahe, dass ein Zusammenhang besteht.",
        options: [],
        answer: 0,
        accept: ["legen"],
        explain: "nahelegen ayrılabilen: legen … nahe. En temkinli basamak.",
      },
      {
        text: "Wie viel Raum soll die Vorgehensweise laut Text bekommen?",
        options: [
          "Einen Absatz",
          "Einen Satz",
          "Gar keinen",
        ],
        answer: 1,
        explain: "„wer die Methode ausführt, nimmt den Platz, den die Fragestellung braucht“.",
      },
      {
        kind: "short_answer",
        text: "Was ist laut Text der häufigste Fehler in Abstracts?",
        options: [],
        answer: 0,
        accept: [
          "das Ergebnis fehlt",
          "es nennt, was untersucht wurde, aber nicht was herauskam",
          "kein Ergebnis genannt",
        ],
        explain: "„Ein Abstract ohne Ergebnis ist eine Ankündigung, kein Abstract.“",
      },
      {
        kind: "short_answer",
        text: "Welche Frage folgt im Kolloquium, wenn die Stufen verwechselt werden?",
        options: [],
        answer: 0,
        accept: [
          "Ist das gezeigt oder vermutet?",
          "ob es gezeigt oder vermutet ist",
          "gezeigt oder vermutet",
        ],
        explain: "Fiil seçimi savunmada doğrudan sınanıyor.",
      },
    ],
  },
  {
    id: "c1-u12-r2",
    level: "C1",
    skill: "reading",
    unit: 12,
    title: "Der Vergleich hinkt",
    genre: "Deneme",
    intro: "Bilimi sadeleştirmek: hangi kayıp kabul edilebilir, hangisi değil?",
    gloss: [
      { de: "vereinfachen", tr: "basitleştirmek", en: "to simplify" },
      { de: "anschaulich", tr: "somut, canlı", en: "vivid" },
      { de: "die Faustregel", tr: "kaba kural", en: "rule of thumb" },
      { de: "zugänglich", tr: "erişilebilir", en: "accessible" },
      { de: "greifbar", tr: "elle tutulur", en: "tangible" },
      { de: "verkürzt", tr: "indirgenmiş", en: "abridged" },
      { de: "differenzieren", tr: "ayrım yapmak", en: "to differentiate" },
    ],
    minutes: 7,
    text:
      "WANN EIN BILD LÜGT\n\n" +
      "Jede Vereinfachung verliert etwas. Die Frage ist nie, ob etwas verloren geht, sondern was.\n\n" +
      "Ein Beispiel. „Das Immunsystem ist eine Armee“ macht einen Vorgang greifbar und erklärt sofort, warum es Angreifer und Verteidiger gibt. Was verloren geht: dass dieses System keinen Befehlshaber hat und dass es sich auch gegen den eigenen Körper richten kann. Wer später Autoimmunerkrankungen erklären will, muss das Bild erst wieder abräumen — es steht im Weg.\n\n" +
      "Nützlich ist deshalb eine Faustregel: Ein Bild darf vereinfachen, aber es darf nicht in die falsche Richtung führen. Verkürzung ist erlaubt, Fehlrichtung nicht.\n\n" +
      "Wissenschaftsjournalisten haben dafür eine Formel, die man ruhig laut sagen kann: „Der Vergleich hinkt, aber …“. Sie kostet vier Wörter und macht den Text zugänglich, ohne ihn falsch zu machen. Sie signalisiert dem Fachpublikum, dass der Autor die Grenze kennt, und dem Laienpublikum, dass es sich auf ein Bild einlässt, nicht auf eine Tatsache.\n\n" +
      "Was dagegen nicht funktioniert, ist die Vereinfachung ohne Kennzeichnung. Sie erzeugt beim Publikum ein Gefühl von Verständnis, das die nächste Nachricht sofort zerstört. Wer dreimal so erklärt wurde, glaubt beim vierten Mal nichts mehr — und differenziert dann in die andere Richtung: Alles sei ohnehin ungewiss.\n\n" +
      "Eine Grenze verläuft dort, wo die Vereinfachung eine Einschränkung tilgt. „In einer Studie an 300 Männern zwischen 50 und 60“ darf zu „in einer Studie“ werden; zu „bei Menschen“ nicht mehr.\n\n" +
      "Diese Grenze zu halten kostet oft nur vier oder fünf Wörter mehr.\n\n" +
      "Anschaulich zu sein ist keine Herablassung. Es unsauber zu tun schon.",
    questions: [
      {
        text: "Was ist laut Text die entscheidende Frage bei einer Vereinfachung?",
        options: [
          "Ob etwas verloren geht",
          "Was verloren geht",
          "Wie viel verloren geht",
        ],
        answer: 1,
        explain: "„Die Frage ist nie, ob etwas verloren geht, sondern was.“",
      },
      {
        kind: "gapfill",
        text: "Der Vergleich ___, aber er macht den Vorgang greifbar.",
        options: [],
        answer: 0,
        accept: ["hinkt"],
        explain: "Der Vergleich hinkt: benzetmenin sınırını kabul eden hazır kalıp.",
      },
      {
        text: "Was geht beim Bild „Immunsystem als Armee“ verloren?",
        options: [
          "Dass es Angreifer gibt",
          "Dass es keinen Befehlshaber gibt und sich gegen den eigenen Körper richten kann",
          "Dass es schnell reagiert",
        ],
        answer: 1,
        explain: "Ve bu kayıp sonradan otoimmün hastalıkları anlatmayı zorlaştırıyor.",
      },
      {
        kind: "short_answer",
        text: "Wie lautet die Faustregel des Textes?",
        options: [],
        answer: 0,
        accept: [
          "Verkürzung ist erlaubt, Fehlrichtung nicht",
          "vereinfachen ja, in die falsche Richtung führen nein",
          "ein Bild darf verkürzen, aber nicht fehlleiten",
        ],
        explain: "Kayıp değil, yön belirleyici.",
      },
      {
        kind: "short_answer",
        text: "Welche Folge hat wiederholte Vereinfachung ohne Kennzeichnung?",
        options: [],
        answer: 0,
        accept: [
          "alles erscheint ungewiss",
          "das Publikum glaubt am Ende nichts mehr",
          "man differenziert in die andere Richtung: alles sei ungewiss",
        ],
        explain: "Aşırı güvenden aşırı kuşkuya geçiş — ikisi de aynı kaynaktan.",
      },
    ],
  },
  {
    id: "c1-u12-l1",
    level: "C1",
    skill: "listening",
    unit: 12,
    title: "Im Kolloquium",
    genre: "Akademik oturum",
    intro: "Tez savunması. İtiraz nasıl geliyor, nasıl karşılanıyor?",
    gloss: [
      { de: "einwenden", tr: "itiraz etmek", en: "to object" },
      { de: "entgegenhalten", tr: "karşı çıkmak", en: "to counter" },
      { de: "mit Verlaub", tr: "kusura bakmayın ama", en: "with respect" },
      { de: "die These", tr: "tez", en: "thesis" },
      { de: "schlüssig", tr: "tutarlı", en: "coherent" },
      { de: "widerlegen", tr: "çürütmek", en: "to refute" },
      { de: "die Prämisse", tr: "öncül", en: "premise" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Prof. Reinhardt", text: "Ihre These ist schlüssig aufgebaut. Einerseits ließe sich aber einwenden, dass die Stichprobe nur städtisch ist." },
      { speaker: "Frau Kilic", text: "Das ist richtig. Dem ist entgegenzuhalten, dass die Fragestellung ausdrücklich städtische Mobilität betrifft." },
      { speaker: "Prof. Reinhardt", text: "Ihre Schlussfolgerung im letzten Kapitel geht aber darüber hinaus." },
      { speaker: "Frau Kilic", text: "Da haben Sie recht. Der Satz auf Seite 112 ist zu weit formuliert." },
      { speaker: "Dr. Weber", text: "Mit Verlaub — mich interessiert eher die Prämisse. Sie setzen voraus, dass Wegezeit der wichtigste Faktor ist." },
      { speaker: "Frau Kilic", text: "Das setze ich voraus, ja. Ich stütze mich dabei auf drei ältere Studien." },
      { speaker: "Dr. Weber", text: "Die sind zehn Jahre alt und stammen aus der Zeit vor den Sharing-Diensten." },
      { speaker: "Frau Kilic", text: "Das kann ich nicht widerlegen. Ich würde die Prämisse in der Endfassung als solche kennzeichnen statt sie als gesichert zu behandeln." },
      { speaker: "Prof. Reinhardt", text: "Das wäre die saubere Lösung." },
      { speaker: "Dr. Weber", text: "Und es schwächt Ihre Arbeit nicht. Eine benannte Prämisse ist stärker als eine versteckte." },
    ],
    questions: [
      {
        text: "Wie reagiert Frau Kilic auf den ersten Einwand?",
        options: [
          "Sie weist ihn zurück.",
          "Sie räumt ihn ein und verweist auf die Fragestellung.",
          "Sie verändert ihre These.",
        ],
        answer: 1,
        explain: "„Das ist richtig. Dem ist entgegenzuhalten, dass …“ — kabul artı sınırlandırma.",
      },
      {
        kind: "gapfill",
        text: "Einerseits ließe sich ___, dass die Stichprobe nur städtisch ist.",
        options: [],
        answer: 0,
        accept: ["einwenden"],
        explain: "Dilek kipi itirazı kişiselleştirmeden ortaya koyuyor.",
      },
      {
        text: "Was ist Dr. Webers eigentlicher Einwand?",
        options: [
          "Die Stichprobe",
          "Die Prämisse, dass Wegezeit der wichtigste Faktor sei",
          "Der Umfang der Arbeit",
        ],
        answer: 1,
        explain: "İtiraz veriye değil, verinin altındaki varsayıma.",
      },
      {
        kind: "dictation",
        text: "Dr. Weber'in adlandırılmış öncül hakkındaki son cümlesini yaz.",
        options: [],
        answer: 0,
        accept: [
          "Eine benannte Prämisse ist stärker als eine versteckte.",
          "Eine benannte Prämisse ist stärker als eine versteckte",
        ],
        explain: "Zayıflığı adlandırmak akademik yazıda güç kaynağı.",
      },
    ],
  },
  {
    id: "c1-u12-l2",
    level: "C1",
    skill: "listening",
    unit: 12,
    title: "Für Laien erklärt",
    genre: "Diyalog",
    intro: "Bir araştırmacı ile gazeteci. Sadeleştirme nerede duruyor?",
    gloss: [
      { de: "vereinfachen", tr: "basitleştirmek", en: "to simplify" },
      { de: "zugänglich", tr: "erişilebilir", en: "accessible" },
      { de: "die Faustregel", tr: "kaba kural", en: "rule of thumb" },
      { de: "greifbar", tr: "elle tutulur", en: "tangible" },
      { de: "verkürzt", tr: "indirgenmiş", en: "abridged" },
      { de: "anschaulich", tr: "somut", en: "vivid" },
      { de: "differenzieren", tr: "ayrım yapmak", en: "to differentiate" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Journalist", text: "Kann ich schreiben: Das Medikament senkt das Risiko um die Hälfte?" },
      { speaker: "Dr. Sander", text: "Nein. Es halbiert das relative Risiko. Absolut sind das zwei von hundert statt vier von hundert." },
      { speaker: "Journalist", text: "Für die Leser ist das derselbe Satz." },
      { speaker: "Dr. Sander", text: "Eben nicht. „Die Hälfte“ klingt nach fünfzig von hundert. Ihre Formulierung ist nicht verkürzt, sie ist falsch." },
      { speaker: "Journalist", text: "Und wie mache ich es greifbar, ohne zu lügen?" },
      { speaker: "Dr. Sander", text: "Sagen Sie: Von hundert Behandelten erkranken statt vier nur zwei. Das ist anschaulich und stimmt." },
      { speaker: "Journalist", text: "Das klingt viel weniger spektakulär." },
      { speaker: "Dr. Sander", text: "Es ist auch weniger spektakulär. Genau deshalb steht es so in der Studie." },
      { speaker: "Journalist", text: "Unsere Leser wollen es aber zugänglich." },
      { speaker: "Dr. Sander", text: "Zugänglich heißt nicht ungenau. Der Satz „von zwei auf drei von tausend“ ist beides." },
      { speaker: "Journalist", text: "Gibt es eine Faustregel?" },
      { speaker: "Dr. Sander", text: "Ja. Nennen Sie immer beide Zahlen — vorher und nachher. Prozentangaben ohne Ausgangswert sind der häufigste Fehler in Gesundheitsmeldungen." },
      { speaker: "Journalist", text: "Und wenn der Platz nicht reicht?" },
      { speaker: "Dr. Sander", text: "Dann lassen Sie die Prozentzahl weg, nicht den Ausgangswert. Man kann vereinfachen, ohne zu differenzieren — aber nicht, ohne zu stimmen." },
    ],
    questions: [
      {
        text: "Warum lehnt Dr. Sander „um die Hälfte“ ab?",
        options: [
          "Es ist zu lang.",
          "Es klingt nach fünfzig von hundert und ist damit falsch.",
          "Es ist zu wissenschaftlich.",
        ],
        answer: 1,
        explain: "„Ihre Formulierung ist nicht verkürzt, sie ist falsch.“",
      },
      {
        kind: "gapfill",
        text: "Von hundert Behandelten erkranken statt vier nur ___.",
        options: [],
        answer: 0,
        accept: ["zwei"],
        explain: "Mutlak sayılar hem doğru hem somut; göreli oran ikisini de kaybettiriyor.",
      },
      {
        text: "Wie lautet die Faustregel?",
        options: [
          "Immer Prozentzahlen nennen",
          "Immer beide Zahlen nennen — vorher und nachher",
          "Nie Zahlen nennen",
        ],
        answer: 1,
        explain: "„Prozentangaben ohne Ausgangswert sind der häufigste Fehler.“",
      },
      {
        kind: "short_answer",
        text: "Was soll man weglassen, wenn der Platz nicht reicht?",
        options: [],
        answer: 0,
        accept: [
          "die Prozentzahl, nicht den Ausgangswert",
          "die Prozentangabe",
          "den Prozentwert weglassen",
        ],
        explain: "„Man kann vereinfachen, ohne zu differenzieren — aber nicht, ohne zu stimmen.“",
      },
    ],
  },
  {
    id: "c1-u12-w1",
    level: "C1",
    skill: "writing",
    unit: 12,
    title: "İddianın basamağı",
    genre: "Dil bilgisi",
    intro: "nahelegen, aufzeigen, belegen — aynı bulgu, üç ayrı iddia gücü.",
    gloss: [
      { de: "nahelegen", tr: "işaret etmek", en: "to suggest" },
      { de: "aufzeigen", tr: "ortaya koymak", en: "to demonstrate" },
      { de: "untermauern", tr: "desteklemek", en: "to underpin" },
      { de: "die Prämisse", tr: "öncül", en: "premise" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Sonuçlar bir bağlantı olduğunu düşündürüyor.",
        answer: "Die Ergebnisse legen einen Zusammenhang nahe",
        hint: "nahelegen ayrılabilen; en temkinli basamak.",
      },
      {
        kind: "build",
        tr: "Bu çalışma 34 görüşmeye dayanıyor.",
        answer: "Die Arbeit stützt sich auf 34 Interviews",
        hint: "sich stützen auf + Akkusativ; yöntem tek cümlede.",
      },
      {
        kind: "build",
        tr: "Öncülü gizlemek yerine adlandırırdım.",
        answer: "Ich würde die Prämisse kennzeichnen statt sie zu verstecken",
        hint: "statt … zu: iki seçeneği karşı karşıya koyar.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: veri bu kadar güçlü bir iddiayı taşımıyor.",
        source: "Die Befragung von 40 Personen belegt, dass Wegezeit der wichtigste Faktor ist.",
        answer: "Die Befragung von 40 Personen legt nahe, dass Wegezeit ein wichtiger Faktor ist.",
        alternatives: [
          "Die Befragung von 40 Personen legt nahe, dass Wegezeit ein wichtiger Faktor ist",
          "Die Befragung von 40 Personen deutet darauf hin, dass Wegezeit ein wichtiger Faktor ist.",
        ],
        why: "belegen kanıt yükü en yüksek fiildir ve kırk kişilik bir anket onu taşımaz. Türkçe konuşan burada sık fazla ileri gider, çünkü çekingen fiiller Türkçede zayıflık gibi duyulur — Almanca akademik yazıda ise tam tersi, ölçüsüz iddia güvenilirliği düşürür.",
      },
    ],
  },
  {
    id: "c1-u12-w2",
    level: "C1",
    skill: "writing",
    unit: 12,
    title: "Ein Abstract, das hält",
    genre: "Akademik metin",
    intro: "Soru, yöntem, sonuç — ve her fiil kendi kanıt yükünü taşısın.",
    gloss: [
      { de: "die Fragestellung", tr: "araştırma sorusu", en: "research question" },
      { de: "die Vorgehensweise", tr: "yöntem", en: "methodology" },
      { de: "nahelegen", tr: "işaret etmek", en: "to suggest" },
      { de: "sich stützen auf", tr: "dayanmak", en: "to draw on" },
      { de: "aufzeigen", tr: "ortaya koymak", en: "to demonstrate" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki çalışma için bir abstract yaz (5-7 cümle). Kurallar: araştırma sorusunu bir cümlede söyle, yöntemi bir cümlede geç, SONUCU mutlaka yaz ve her iddia için doğru basamaktaki fiili seç (nahelegen / aufzeigen / belegen). Verinin taşımadığı bir iddia kurma; bir sınırı da kendin adlandır.",
        stimulus:
          "ÇALIŞMA\n\n" +
          "Konu: Küçük belediyelerde kütüphane açılış saatlerinin kullanım üstündeki etkisi\n" +
          "Yöntem: 12 belediyede 2019-2024 ziyaret verisi + 34 yönlendirilmiş görüşme\n" +
          "Bulgu 1: Akşam 19'a kadar açık olan kütüphanelerde 18 yaş altı ziyaret %23 daha yüksek\n" +
          "Bulgu 2: Görüşmelerde en sık gerekçe ulaşım değil, ödev yapacak sessiz yer\n" +
          "Sınır: 12 belediyenin 9'u aynı eyalette; bütçe verisi yalnız 7'sinde tam\n" +
          "Bulgu 2 nedensellik göstermiyor, yalnız gerekçe beyanı",
        checklist: [
          "Araştırma sorusu tek cümlede mi?",
          "Yöntem tek cümlede mi?",
          "Sonuç yazıldı mı?",
          "Fiiller doğru basamakta mı ve bir sınır adlandırıldı mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Die vorliegende Arbeit untersucht, …", tr: "bu çalışma …-i inceliyor", en: "the present study examines …" },
          { de: "Die Untersuchung stützt sich auf …", tr: "çalışma …-e dayanıyor", en: "the study draws on …" },
          { de: "Die Ergebnisse legen nahe, dass …", tr: "sonuçlar …-i düşündürüyor", en: "the results suggest that …" },
        ],
        sample:
          "Die vorliegende Arbeit untersucht, in welchem Verhältnis die Öffnungszeiten kommunaler Bibliotheken zu deren Nutzung durch Jugendliche stehen.\n\n" +
          "Die Untersuchung stützt sich auf Besuchsdaten aus zwölf Kommunen für den Zeitraum 2019 bis 2024 sowie auf 34 leitfadengestützte Interviews.\n\n" +
          "Die Auswertung zeigt auf, dass Einrichtungen mit Öffnung bis 19 Uhr eine um 23 Prozent höhere Nutzung durch unter Achtzehnjährige verzeichnen. Die Interviews legen darüber hinaus nahe, dass nicht die Erreichbarkeit, sondern das Fehlen eines ruhigen Arbeitsplatzes als Hauptgrund genannt wird; ein kausaler Zusammenhang lässt sich daraus nicht ableiten.\n\n" +
          "Die Reichweite der Befunde ist begrenzt: Neun der zwölf Kommunen liegen im selben Bundesland, und vollständige Haushaltsdaten lagen nur für sieben vor.\n\n" +
          "Die Arbeit schließt mit der Frage, ob die beobachtete Differenz auch dort auftritt, wo schulische Lernräume vorhanden sind.",
      },
    ],
  },
];
