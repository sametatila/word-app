import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 2 — "Kriz, müzakere, liderlik, ofis jargonu".
 *
 * Dört ders: Die Krise kommunizieren · Das Zünglein an der Waage · Führen ohne
 * Titel · Bürodeutsch entschlüsselt.
 *
 *   Kelime: bedauern, einleiten, die Aufarbeitung, die Transparenz, das
 *           Versäumnis, abwenden, abstreiten, eskalieren · zur Sprache bringen,
 *           in Kauf nehmen, die Gegenleistung, ausloten, hinauszögern,
 *           aushandeln, das Zugeständnis, unnachgiebig · anregen, sich
 *           empfehlen, übertragen, die Eigenverantwortung, der Rückhalt, die
 *           Befugnis, die Delegation, das Ermessen · im Nachgang, abstimmen,
 *           die Schnittstelle, aufsetzen, der Sachstand, übermitteln, der
 *           Ausschuss, die Tagung
 *
 * Ünitenin çekirdeği FAİLİN KAYBOLMASI. Kriz açıklaması "Maßnahmen wurden
 * eingeleitet" der, kim başlattı demez; ofis jargonu "im Nachgang zur
 * Abstimmung" der, kimin kiminle konuştuğunu söylemez. İsimleşme sorumluluğu
 * cümleden siler ve C1'de ölçülen tam bu: metni okurken faili geri koyabilmek,
 * yazarken de nereye kadar sileceğine karar verebilmek.
 */
export const c1U02: SkillExercise[] = [
  {
    id: "c1-u02-r1",
    level: "C1",
    skill: "reading",
    unit: 2,
    title: "Stellungnahme nach dem Datenvorfall",
    genre: "Basın açıklaması",
    intro: "Kurumsal kriz açıklaması. Ne kabul ediliyor, ne söylenmeden geçiliyor?",
    gloss: [
      { de: "bedauern", tr: "üzüntü duymak", en: "to regret" },
      { de: "einleiten", tr: "başlatmak", en: "to initiate" },
      { de: "die Aufarbeitung", tr: "hesaplaşma, inceleme", en: "review, reckoning" },
      { de: "die Transparenz", tr: "şeffaflık", en: "transparency" },
      { de: "das Versäumnis", tr: "ihmal", en: "omission" },
      { de: "abwenden", tr: "savuşturmak", en: "to avert" },
      { de: "abstreiten", tr: "inkâr etmek", en: "to deny" },
      { de: "eskalieren", tr: "çığırından çıkmak", en: "to escalate" },
    ],
    minutes: 7,
    text:
      "STELLUNGNAHME DER GESCHÄFTSFÜHRUNG\n\n" +
      "Wir bedauern zutiefst, dass es am 14. März zu einem unberechtigten Zugriff auf Kundendaten gekommen ist.\n\n" +
      "Unmittelbar nach Bekanntwerden wurden umfassende Maßnahmen eingeleitet. Die betroffenen Systeme wurden vom Netz genommen, die zuständigen Behörden informiert und eine externe Prüfung beauftragt. Die Aufarbeitung des Vorfalls dauert an.\n\n" +
      "Nach derzeitigem Kenntnisstand konnte ein Abfluss von Zahlungsdaten abgewendet werden. Betroffen sind Namen und Adressen von rund 4.000 Kundinnen und Kunden.\n\n" +
      "Wir wollen nicht abstreiten, dass die Meldung an die Aufsicht später erfolgt ist als vorgesehen. Ein Versäumnis in der internen Meldekette wird derzeit geprüft.\n\n" +
      "Transparenz ist uns wichtig. Aus diesem Grund werden wir in der kommenden Woche einen ausführlichen Bericht vorlegen, sobald die Prüfung abgeschlossen ist.\n\n" +
      "Betroffene Kundinnen und Kunden werden ab dem 20. März schriftlich benachrichtigt. Eine gesonderte Sperrung von Konten ist nach derzeitigem Kenntnisstand nicht erforderlich; wir empfehlen dennoch, Zugangsdaten zu ändern, sofern sie auch bei anderen Diensten verwendet werden.\n\n" +
      "Zum Ablauf: Der unberechtigte Zugriff erfolgte über ein Dienstkonto eines externen Dienstleisters. Ob die Zugangsdaten dort abgeflossen sind oder bei uns, ist Gegenstand der laufenden Prüfung. Wir bitten um Verständnis, dass wir vor deren Abschluss keine Zwischenstände nennen.\n\n" +
      "Die Zusammenarbeit mit dem betreffenden Dienstleister ruht bis auf Weiteres. Sämtliche Dienstkonten externer Partner wurden überprüft und auf ein neues Verfahren umgestellt.\n\n" +
      "Eine Eskalation der Lage ist aus heutiger Sicht nicht zu erwarten.",
    questions: [
      {
        text: "Wer hat die Maßnahmen eingeleitet?",
        options: [
          "Die Geschäftsführung — der Text sagt es ausdrücklich.",
          "Die Behörden.",
          "Der Text nennt keinen Handelnden.",
        ],
        answer: 2,
        explain: "„wurden … eingeleitet“ edilgen ve failsiz. Kriz dilinin temel aracı bu: eylem var, fail yok.",
      },
      {
        kind: "gapfill",
        text: "Ein ___ in der internen Meldekette wird derzeit geprüft.",
        options: [],
        answer: 0,
        accept: ["Versäumnis"],
        explain: "Hata kabul ediliyor ama isimleştirilerek; „Wir haben zu spät gemeldet“ demiyor.",
      },
      {
        text: "Was gibt der Text zu?",
        options: [
          "Dass Zahlungsdaten abgeflossen sind.",
          "Dass die Meldung an die Aufsicht zu spät erfolgt ist.",
          "Dass die Lage eskaliert.",
        ],
        answer: 1,
        explain: "„Wir wollen nicht abstreiten, dass die Meldung … später erfolgt ist“ — dolaylı bir itiraf.",
      },
      {
        kind: "short_answer",
        text: "Der Bericht wird nicht einfach „nächste Woche“ zugesagt. An welche Bedingung ist er geknüpft?",
        options: [],
        answer: 0,
        accept: [
          "sobald die Prüfung abgeschlossen ist",
          "an den Abschluss der Prüfung",
          "wenn die Prüfung fertig ist",
        ],
        explain: "„in der kommenden Woche … sobald die Prüfung abgeschlossen ist“ — tarih koşula bağlı, yani bağlayıcı değil.",
      },
      {
        kind: "short_answer",
        text: "Welche zwei Formulierungen relativieren die Aussagen über den Schaden?",
        options: [],
        answer: 0,
        accept: [
          "nach derzeitigem Kenntnisstand und aus heutiger Sicht",
          "nach derzeitigem Kenntnisstand / aus heutiger Sicht",
          "derzeitigem Kenntnisstand, heutiger Sicht",
        ],
        explain: "İkisi de ifadeyi bugüne hapsediyor; yarın başka çıkarsa açıklama yanlış olmuş sayılmaz.",
      },
    ],
  },
  {
    id: "c1-u02-r2",
    level: "C1",
    skill: "reading",
    unit: 2,
    title: "Protokollnotiz: Verhandlungsstand",
    genre: "Tutanak notu",
    intro: "Müzakere tutanağı. Kim taviz verdi, kim vermiş gibi göründü?",
    gloss: [
      { de: "zur Sprache bringen", tr: "gündeme getirmek", en: "to bring up" },
      { de: "in Kauf nehmen", tr: "göze almak", en: "to accept (a downside)" },
      { de: "die Gegenleistung", tr: "karşılık", en: "quid pro quo" },
      { de: "ausloten", tr: "yoklamak", en: "to sound out" },
      { de: "hinauszögern", tr: "sürüncemede bırakmak", en: "to delay" },
      { de: "aushandeln", tr: "müzakere ederek varmak", en: "to negotiate" },
      { de: "das Zugeständnis", tr: "taviz", en: "concession" },
      { de: "unnachgiebig", tr: "taviz vermeyen", en: "unyielding" },
    ],
    minutes: 7,
    text:
      "PROTOKOLLNOTIZ — VERHANDLUNGSRUNDE 3\n\n" +
      "Die Gegenseite hat zu Beginn erneut die Laufzeit zur Sprache gebracht. Wir haben das Thema aufgenommen, ohne uns festzulegen.\n\n" +
      "Im weiteren Verlauf wurde ausgelotet, ob eine Verlängerung um zwölf Monate gegen eine Anpassung der Preisklausel in Frage kommt. Ein förmliches Angebot lag nicht vor.\n\n" +
      "Zugeständnisse: Wir haben angeboten, die Kündigungsfrist von drei auf sechs Monate zu verlängern. Als Gegenleistung wurde eine Nachverhandlung der Servicepauschale erwartet; diese ist bislang nicht zugesagt.\n\n" +
      "Die Gegenseite zeigt sich bei der Haftungsobergrenze weiterhin unnachgiebig. Hier wäre zu prüfen, ob wir ein höheres Risiko in Kauf nehmen können, um an anderer Stelle voranzukommen.\n\n" +
      "Auffällig: Der Termin für Runde 4 wurde von der Gegenseite zweimal verschoben. Ob damit bewusst hinausgezögert wird, lässt sich nicht belegen.\n\n" +
      "Zum Verfahren: In Runde 2 war vereinbart worden, die Anlagen 4 und 5 auf Arbeitsebene auszuhandeln und erst das Ergebnis in die Hauptrunde zu geben. Die Gegenseite hat diese Anlagen gleichwohl erneut aufgerufen. Wir haben auf die Vereinbarung verwiesen und die Erörterung zurückgestellt.\n\n" +
      "Personelles: Die Gegenseite war erstmals ohne ihre Justiziarin vertreten. Ob dies mit dem Verschieben des Termins zusammenhängt, ist offen; für Runde 4 wurde ihre Teilnahme zugesagt.\n\n" +
      "Zeitliche Lage: Der bestehende Vertrag läuft am 31. Mai aus. Ab Mitte April verschiebt sich der Druck auf unsere Seite, weil eine Anschlusslösung dann kurzfristig beschafft werden müsste. Dieser Umstand ist der Gegenseite bekannt.\n\n" +
      "Empfehlung: vor Runde 4 intern abstimmen, welche Punkte tatsächlich verhandelbar sind.",
    questions: [
      {
        text: "Was hat unsere Seite tatsächlich angeboten?",
        options: [
          "Eine Anpassung der Preisklausel",
          "Eine Verlängerung der Kündigungsfrist",
          "Eine höhere Haftungsobergrenze",
        ],
        answer: 1,
        explain: "„Wir haben angeboten, die Kündigungsfrist … zu verlängern.“ Öteki maddeler yalnız yoklandı.",
      },
      {
        kind: "gapfill",
        text: "Im weiteren Verlauf wurde ___, ob eine Verlängerung in Frage kommt.",
        options: [],
        answer: 0,
        accept: ["ausgelotet"],
        explain: "ausloten: teklif vermeden zemin yoklamak. Tutanak bunu bilerek „angeboten“ demiyor.",
      },
      {
        text: "Was ist mit der Gegenleistung passiert?",
        options: [
          "Sie wurde zugesagt.",
          "Sie wurde erwartet, aber nicht zugesagt.",
          "Sie wurde abgelehnt.",
        ],
        answer: 1,
        explain: "„Als Gegenleistung wurde … erwartet; diese ist bislang nicht zugesagt.“ Beklenti ile taahhüt ayrı.",
      },
      {
        kind: "short_answer",
        text: "Wie bewertet die Notiz die zweimalige Terminverschiebung?",
        options: [],
        answer: 0,
        accept: [
          "als auffällig, aber nicht belegbar",
          "auffällig, lässt sich nicht belegen",
          "verdächtig, aber ohne Beweis",
        ],
        explain: "„Auffällig … Ob damit bewusst hinausgezögert wird, lässt sich nicht belegen.“ Şüphe kayda geçiyor, iddia edilmiyor.",
      },
      {
        text: "Die Gegenseite hat bei der Haftungsobergrenze nachgegeben.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: „zeigt sich … weiterhin unnachgiebig“.",
      },
    ],
  },
  {
    id: "c1-u02-l1",
    level: "C1",
    skill: "listening",
    unit: 2,
    title: "Führen ohne Anweisung",
    genre: "Diyalog",
    intro: "Bir ekip lideri iş devrediyor — ama emir vermeden. Yetki nereye kadar?",
    gloss: [
      { de: "anregen", tr: "önermek, teşvik etmek", en: "to suggest" },
      { de: "sich empfehlen", tr: "tavsiye edilir olmak", en: "to be advisable" },
      { de: "übertragen", tr: "devretmek", en: "to delegate" },
      { de: "die Eigenverantwortung", tr: "kendi sorumluluğu", en: "personal responsibility" },
      { de: "der Rückhalt", tr: "arka çıkma, destek", en: "backing" },
      { de: "die Befugnis", tr: "yetki", en: "authority" },
      { de: "das Ermessen", tr: "takdir yetkisi", en: "discretion" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Roth", text: "Ich würde anregen, dass Sie die Abstimmung mit dem Labor selbst übernehmen." },
      { speaker: "Herr Kaya", text: "Gern. Heißt das, ich entscheide auch über die Termine?" },
      { speaker: "Frau Roth", text: "Das läge in Ihrem Ermessen, ja." },
      { speaker: "Herr Kaya", text: "Und wenn das Labor eine Zusatzprüfung verlangt, die Geld kostet?" },
      { speaker: "Frau Roth", text: "Bis fünftausend haben Sie die Befugnis. Darüber sprechen wir vorher." },
      { speaker: "Herr Kaya", text: "Gut zu wissen. Ehrlich gesagt war mir bisher nicht klar, wo die Grenze liegt." },
      { speaker: "Frau Roth", text: "Das ist mein Versäumnis. Eine übertragene Aufgabe ohne klare Grenze ist keine Übertragung, sondern ein Risiko." },
      { speaker: "Herr Kaya", text: "Und wenn etwas schiefgeht?" },
      { speaker: "Frau Roth", text: "Dann stehe ich davor, nicht dahinter. Den Rückhalt haben Sie." },
      { speaker: "Herr Kaya", text: "Das macht die Eigenverantwortung leichter." },
      { speaker: "Frau Roth", text: "So ist es gedacht. Es empfiehlt sich trotzdem, mir wöchentlich kurz den Sachstand zu schicken." },
    ],
    questions: [
      {
        text: "Wie formuliert Frau Roth die Übertragung?",
        options: [
          "Als Anweisung",
          "Als Anregung im Konjunktiv",
          "Als Bitte um Zustimmung des Teams",
        ],
        answer: 1,
        explain: "„Ich würde anregen, dass …“ — dilek kipi emri öneriye çeviriyor, ama içerik yine de bir görevlendirme.",
      },
      {
        kind: "gapfill",
        text: "Bis fünftausend haben Sie die ___.",
        options: [],
        answer: 0,
        accept: ["Befugnis"],
        explain: "Yetkinin sayısal sınırı; bu cümle olmadan devretme belirsiz kalıyor.",
      },
      {
        text: "Was nennt Frau Roth ihr eigenes Versäumnis?",
        options: [
          "Dass sie zu wenig kontrolliert hat",
          "Dass sie die Grenze der Befugnis nicht klar gemacht hat",
          "Dass sie die Aufgabe zu spät übertragen hat",
        ],
        answer: 1,
        explain: "„Eine übertragene Aufgabe ohne klare Grenze ist keine Übertragung, sondern ein Risiko.“",
      },
      {
        kind: "dictation",
        text: "Frau Roth'un sorumluluğu üstlendiğini söylediği kısa cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Dann stehe ich davor, nicht dahinter.",
          "Dann stehe ich davor, nicht dahinter",
        ],
        explain: "İki edat tek cümlede liderlik tanımı yapıyor: önünde durmak korumak, arkasında durmak saklanmaktır.",
      },
    ],
  },
  {
    id: "c1-u02-l2",
    level: "C1",
    skill: "listening",
    unit: 2,
    title: "Im Nachgang zur Abstimmung",
    genre: "Diyalog",
    intro: "Ofis jargonu çözülüyor. Cümleler ne diyor, ne kastediyor?",
    gloss: [
      { de: "im Nachgang", tr: "sonrasında", en: "subsequently" },
      { de: "abstimmen", tr: "kararlaştırmak, mutabakat sağlamak", en: "to coordinate" },
      { de: "die Schnittstelle", tr: "arayüz, temas noktası", en: "interface" },
      { de: "aufsetzen", tr: "taslak yazmak, kurmak", en: "to draft, to set up" },
      { de: "der Sachstand", tr: "durum, mevcut hâl", en: "status" },
      { de: "übermitteln", tr: "iletmek", en: "to transmit" },
      { de: "der Ausschuss", tr: "komite", en: "committee" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Deniz", text: "Ich habe eine Mail bekommen, die ich nicht verstehe. „Im Nachgang zur Abstimmung setze ich gern einen Termin auf.“" },
      { speaker: "Marek", text: "Das heißt: Wir haben geredet, jetzt macht er einen Termin." },
      { speaker: "Deniz", text: "Warum sagt er das nicht so?" },
      { speaker: "Marek", text: "Weil „im Nachgang“ höflich klingt und weil niemand schreibt, wer mit wem geredet hat." },
      { speaker: "Deniz", text: "Und „an der Schnittstelle zum Vertrieb“?" },
      { speaker: "Marek", text: "Da, wo zwei Abteilungen sich berühren. Meistens da, wo etwas liegen bleibt." },
      { speaker: "Deniz", text: "Der letzte Satz war: „Den Sachstand übermittle ich dem Ausschuss.“" },
      { speaker: "Marek", text: "Also: Er schreibt dem Gremium, wie weit wir sind. Klingt harmlos, ist aber der wichtigste Satz." },
      { speaker: "Deniz", text: "Wieso?" },
      { speaker: "Marek", text: "Weil der Sachstand, den er übermittelt, die Version ist, die zählt. Wer den Sachstand schreibt, bestimmt die Geschichte." },
      { speaker: "Deniz", text: "Dann sollte ich vorher lesen, was er schreibt." },
      { speaker: "Marek", text: "Sag es freundlich: dass du dich gern vorher dazu abstimmst." },
    ],
    questions: [
      {
        text: "Was bedeutet „im Nachgang zur Abstimmung“?",
        options: [
          "Vor dem Gespräch",
          "Nach dem Gespräch",
          "Statt eines Gesprächs",
        ],
        answer: 1,
        explain: "„Wir haben geredet, jetzt macht er einen Termin.“ Kalıp yalnız sırayı bildiriyor.",
      },
      {
        kind: "gapfill",
        text: "Den ___ übermittle ich dem Ausschuss.",
        options: [],
        answer: 0,
        accept: ["Sachstand"],
        explain: "Ofis jargonunun en zararsız görünen, en etkili cümlesi.",
      },
      {
        text: "Warum nennt Marek diesen Satz den wichtigsten?",
        options: [
          "Weil der Ausschuss selten tagt",
          "Weil wer den Sachstand schreibt, die Darstellung bestimmt",
          "Weil eine Übermittlung verbindlich ist",
        ],
        answer: 1,
        explain: "„Wer den Sachstand schreibt, bestimmt die Geschichte.“",
      },
      {
        kind: "short_answer",
        text: "Was ist laut Marek meistens an einer Schnittstelle los?",
        options: [],
        answer: 0,
        accept: [
          "da bleibt etwas liegen",
          "dort bleibt Arbeit liegen",
          "meistens da, wo etwas liegen bleibt",
        ],
        explain: "„Meistens da, wo etwas liegen bleibt.“ Jargonun nötr sözcüğü bir sorunu adlandırıyor.",
      },
    ],
  },
  {
    id: "c1-u02-w1",
    level: "C1",
    skill: "writing",
    unit: 2,
    title: "Faili silmek ve geri koymak",
    genre: "Dil bilgisi",
    intro: "İsimleşme ve edilgen sorumluluğu cümleden çıkarır; C1'de her ikisi de araçtır.",
    gloss: [
      { de: "einleiten", tr: "başlatmak", en: "to initiate" },
      { de: "das Versäumnis", tr: "ihmal", en: "omission" },
      { de: "zur Sprache bringen", tr: "gündeme getirmek", en: "to bring up" },
      { de: "in Kauf nehmen", tr: "göze almak", en: "to accept" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Önlemler derhâl başlatıldı.",
        answer: "Maßnahmen wurden unmittelbar eingeleitet",
        hint: "Edilgen: fail söylenmiyor, eylem öne çıkıyor.",
      },
      {
        kind: "build",
        tr: "Bu konuyu bir sonraki turda gündeme getireceğiz.",
        answer: "Wir werden das Thema in der nächsten Runde zur Sprache bringen",
        hint: "İşlev fiili öbeği belirteçsiz; mastar cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "Bu riski göze alabilir miyiz?",
        answer: "Können wir dieses Risiko in Kauf nehmen",
        hint: "Nesne fiille öbek arasına girer.",
      },
      {
        kind: "rewrite",
        prompt: "Cümledeki faili geri koy: kim ihmal etti, açıkça yaz.",
        source: "Ein Versäumnis in der Meldekette wird derzeit geprüft.",
        answer: "Wir haben zu spät gemeldet und prüfen das derzeit.",
        alternatives: [
          "Wir haben zu spät gemeldet und prüfen das derzeit",
          "Wir haben die Meldung zu spät gemacht und prüfen das derzeit.",
        ],
        why: "İsimleşmiş hâlde hata var ama yapan yok. Faili geri koymak cümleyi kısaltır ve sorumluluğu görünür kılar — C1'de bu iki hâl arasında bilerek seçim yapılır.",
      },
    ],
  },
  {
    id: "c1-u02-w2",
    level: "C1",
    skill: "writing",
    unit: 2,
    title: "Eine Krisenmeldung nach innen",
    genre: "Kurum yazısı",
    intro: "Aynı olayı ekibe yaz: dışa açıklamadan farklı olarak fail görünsün.",
    gloss: [
      { de: "die Aufarbeitung", tr: "inceleme, hesaplaşma", en: "review" },
      { de: "abwenden", tr: "savuşturmak", en: "to avert" },
      { de: "der Sachstand", tr: "durum", en: "status" },
      { de: "abstimmen", tr: "kararlaştırmak", en: "to coordinate" },
      { de: "die Transparenz", tr: "şeffaflık", en: "transparency" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "free",
        prompt:
          "Aşağıdaki basın açıklamasının aynı olayı anlatan İÇ yazısını yaz — ekibe. Dışa dönük metinden farklı olarak: her önemli cümlede faili adlandır, ne yapıldığını ve kimin yaptığını söyle, açık kalan noktayı gizleme ve ekipten ne beklediğini yaz. En az bir işlev fiili öbeği kullan.",
        stimulus:
          "DIŞA AÇIKLAMA (basın):\n\n" +
          "Wir bedauern zutiefst, dass es am 14. März zu einem unberechtigten Zugriff auf Kundendaten gekommen ist. Unmittelbar nach Bekanntwerden wurden umfassende Maßnahmen eingeleitet. Die Aufarbeitung des Vorfalls dauert an. Nach derzeitigem Kenntnisstand konnte ein Abfluss von Zahlungsdaten abgewendet werden. Ein Versäumnis in der internen Meldekette wird derzeit geprüft.",
        checklist: [
          "Her önemli cümlede fail adlandırıldı mı (kim yaptı)?",
          "Açık kalan nokta gizlenmeden yazıldı mı?",
          "Ekipten beklenen somut olarak söylendi mi?",
          "En az bir işlev fiili öbeği var mı, belirteçsiz?",
        ],
        minWords: 90,
        phrases: [
          { de: "Das Sicherheitsteam hat … abgeschaltet.", tr: "güvenlik ekibi …-i kapattı", en: "the security team shut down …" },
          { de: "Ich habe die Aufsicht zu spät informiert.", tr: "denetim kurumunu geç bilgilendirdim", en: "I informed the authority too late" },
          { de: "Den Sachstand stimme ich täglich mit euch ab.", tr: "durumu her gün sizinle kararlaştırıyorum", en: "I coordinate the status with you daily" },
        ],
        sample:
          "Liebes Team,\n\n" +
          "ihr habt die Pressemitteilung gelesen; hier steht, was tatsächlich passiert ist.\n\n" +
          "Am 14. März hat jemand von außen auf unsere Kundendatenbank zugegriffen. Aylin hat den Zugriff um 6:40 Uhr in den Logs entdeckt und sofort das Sicherheitsteam alarmiert. Das Team hat die betroffenen Systeme innerhalb von zwanzig Minuten vom Netz genommen. Damit konnten wir einen Abfluss von Zahlungsdaten abwenden — Namen und Adressen von rund 4.000 Personen sind allerdings betroffen.\n\n" +
          "Ein Punkt geht auf mich: Ich habe die Aufsichtsbehörde erst am Nachmittag informiert, vorgeschrieben wären vier Stunden gewesen. Das war mein Fehler, nicht der der Meldekette.\n\n" +
          "Die externe Prüfung läuft. Bis sie abgeschlossen ist, bringt bitte jede Auffälligkeit sofort zur Sprache, auch wenn sie klein wirkt. Den Sachstand stimme ich täglich um 9 Uhr kurz mit euch ab.\n\n" +
          "Danke für die schnelle Reaktion am Freitag.\nJ. Ostermann",
      },
    ],
  },
];
