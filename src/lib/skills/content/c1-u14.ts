import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 14 — "Kiracı hakları, ihtar, veri koruma, tanık ifadesi".
 *
 * Dört ders: Mietminderung? · Die Abmahnung · Die Einwilligung ·
 * Die Zeugenaussage.
 *
 *   Kelime: Anspruch erheben, in Verzug geraten, die Mietminderung, die
 *           Beseitigung, geltend machen, die Wiedergutmachung, der
 *           Rechtsstreit, die Vergeltung · die Abmahnung, fristlos, der
 *           Einspruch, rechtens, einlegen, der Verband, eingestehen, die
 *           Übernahme · die Verarbeitung, widerruflich, die Zweckbindung, die
 *           Löschung, die Weitergabe, steuern, die Bezeichnung, besagen ·
 *           die Zeugenaussage, zu Protokoll geben, der Tathergang,
 *           wahrheitsgemäß, die Erinnerungslücke, die Notwehr, das
 *           Urteilsvermögen, vortäuschen
 *
 * Ünitenin çekirdeği: HAK BİR SÜREÇTİR, BİR CÜMLE DEĞİL. Kiracı ayıbı
 * bildirmeden indirim isteyemez, işveren ihtar vermeden fesih yapamaz, veri
 * işleyen amaç belirtmeden onay alamaz, tanık hatırlamadığını söylemek
 * zorundadır. Dördünde de sıra ve süre, içerikten daha belirleyici.
 *
 * Bu yüzden egzersizler tek tek kelimeleri değil ADIM SIRASINI ölçüyor:
 * önce ne yapılmalı, hangi süre işliyor, hangi hak ne zaman doğuyor.
 */
export const c1U14: SkillExercise[] = [
  {
    id: "c1-u14-r1",
    level: "C1",
    skill: "reading",
    unit: 14,
    title: "Erst melden, dann mindern",
    genre: "Bilgilendirme",
    intro: "Kira indirimi rehberi. Hangi adım hangi hakkı doğuruyor?",
    gloss: [
      { de: "die Mietminderung", tr: "kira indirimi", en: "rent reduction" },
      { de: "Anspruch erheben", tr: "hak iddia etmek", en: "to lay claim" },
      { de: "die Beseitigung", tr: "giderme", en: "rectification" },
      { de: "in Verzug geraten", tr: "temerrüde düşmek", en: "to fall into default" },
      { de: "geltend machen", tr: "ileri sürmek", en: "to assert" },
      { de: "der Rechtsstreit", tr: "hukuki uyuşmazlık", en: "legal dispute" },
      { de: "die Wiedergutmachung", tr: "telafi", en: "restitution" },
    ],
    minutes: 7,
    text:
      "MIETMINDERUNG — DIE REIHENFOLGE ENTSCHEIDET\n\n" +
      "Ein Mangel allein begründet noch keine Mietminderung. Entscheidend ist, was der Mieter tut, nachdem er ihn bemerkt hat.\n\n" +
      "SCHRITT EINS: die Anzeige. Der Mangel muss dem Vermieter gemeldet werden, nachweisbar und mit Datum. Wer drei Monate schweigt und dann rückwirkend mindert, verliert für diese drei Monate — nicht, weil der Mangel kleiner wäre, sondern weil der Vermieter keine Gelegenheit hatte, ihn zu beseitigen.\n\n" +
      "SCHRITT ZWEI: die Frist. Mit der Anzeige wird eine angemessene Frist zur Beseitigung gesetzt. Erst wenn sie verstreicht, gerät der Vermieter in Verzug. Vorher besteht kein Anspruch, den man geltend machen könnte.\n\n" +
      "SCHRITT DREI: die Minderung selbst. Sie tritt kraft Gesetzes ein, muss also nicht beantragt werden. Wer dennoch die volle Miete unter Vorbehalt zahlt, verliert nichts und behält seine Position — ein Rat, den viele Beratungsstellen geben, weil eine falsch berechnete Minderung selbst zum Kündigungsgrund werden kann.\n\n" +
      "Zwei Irrtümer halten sich hartnäckig. Erstens: Die Minderung ist keine Wiedergutmachung für Ärger, sondern eine Anpassung des Preises an die tatsächliche Nutzbarkeit. Zweitens: Sie ist kein Druckmittel. Wer sie so einsetzt, produziert einen Rechtsstreit, den er auch bei berechtigtem Mangel verlieren kann.\n\n" +
      "Wer Anspruch auf Minderung erheben will, sollte ihn deshalb beziffern und begründen, statt ihn anzudeuten. Ein unbezifferter Anspruch ist für die Gegenseite kein Anspruch, sondern eine Beschwerde.\n\n" +
      "Der Weg ist also unspektakulär: melden, Frist setzen, rechnen — und alles schriftlich.",
    questions: [
      {
        text: "Warum verliert man bei verspäteter Meldung die Minderung für die Zwischenzeit?",
        options: [
          "Weil der Mangel dann kleiner ist",
          "Weil der Vermieter keine Gelegenheit zur Beseitigung hatte",
          "Weil die Frist abgelaufen ist",
        ],
        answer: 1,
        explain: "Hak, karşı tarafa giderme fırsatı verildikten sonra doğuyor.",
      },
      {
        kind: "gapfill",
        text: "Erst wenn die Frist verstreicht, ___ der Vermieter in Verzug.",
        options: [],
        answer: 0,
        accept: ["gerät"],
        explain: "in Verzug geraten: temerrüt bir olay değil, sürenin geçmesiyle doğan bir durum.",
      },
      {
        text: "Warum raten Beratungsstellen, unter Vorbehalt voll zu zahlen?",
        options: [
          "Weil die Minderung beantragt werden muss",
          "Weil eine falsch berechnete Minderung zum Kündigungsgrund werden kann",
          "Weil der Vermieter sonst kündigen darf",
        ],
        answer: 1,
        explain: "İndirim kendiliğinden doğuyor ama yanlış hesaplamak riskli.",
      },
      {
        kind: "short_answer",
        text: "Was ist die Minderung laut Text NICHT?",
        options: [],
        answer: 0,
        accept: [
          "keine Entschädigung für Ärger",
          "keine Wiedergutmachung für Ärger und kein Druckmittel",
          "kein Druckmittel",
        ],
        explain: "„eine Anpassung des Preises an die tatsächliche Nutzbarkeit“.",
      },
      {
        kind: "short_answer",
        text: "Fasse den Weg in drei Wörtern zusammen, wie der Text es tut.",
        options: [],
        answer: 0,
        accept: [
          "melden, Frist setzen, rechnen",
          "melden Frist rechnen",
          "anzeigen, Frist, Minderung",
        ],
        explain: "„— und alles schriftlich.“",
      },
    ],
  },
  {
    id: "c1-u14-r2",
    level: "C1",
    skill: "reading",
    unit: 14,
    title: "Einwilligung ist kein Häkchen",
    genre: "Rehber yazısı",
    intro: "Veri koruma dili: geçerli onay hangi koşulları taşıyor?",
    gloss: [
      { de: "die Verarbeitung", tr: "işleme", en: "processing" },
      { de: "die Zweckbindung", tr: "amaca bağlılık", en: "purpose limitation" },
      { de: "widerruflich", tr: "geri alınabilir", en: "revocable" },
      { de: "die Löschung", tr: "silme", en: "erasure" },
      { de: "die Weitergabe", tr: "üçüncü tarafa aktarım", en: "disclosure" },
      { de: "besagen", tr: "şunu söylemek", en: "to state" },
      { de: "die Bezeichnung", tr: "adlandırma", en: "designation" },
    ],
    minutes: 7,
    text:
      "WAS EINE EINWILLIGUNG WIRKSAM MACHT\n\n" +
      "Ein Häkchen im Formular ist noch keine Einwilligung. Vier Bedingungen müssen zusammenkommen, und jede einzelne kann sie unwirksam machen.\n\n" +
      "FREIWILLIG. Wer ohne die Einwilligung den Dienst nicht nutzen kann, hat nicht frei entschieden. Bei einem Newsletter ist die Kopplung an einen Kauf deshalb unzulässig — beim Kauf selbst braucht es keine Einwilligung, weil die Verarbeitung dort zur Vertragserfüllung gehört.\n\n" +
      "BESTIMMT. Die Zweckbindung verlangt, dass der Zweck benannt ist, bevor die Daten erhoben werden. „Zur Verbesserung unserer Angebote“ ist keine Bezeichnung eines Zwecks, sondern eine Formel. Wer später einen anderen Zweck verfolgt, braucht eine neue Einwilligung.\n\n" +
      "INFORMIERT. Der Betroffene muss wissen, wer verarbeitet, was verarbeitet wird und ob eine Weitergabe stattfindet. Eine Datenschutzerklärung, die man erst nach dem Absenden erreicht, erfüllt das nicht.\n\n" +
      "WIDERRUFLICH. Die Einwilligung ist jederzeit widerruflich, und der Widerruf muss so einfach sein wie die Erteilung. Ein Häkchen zum Setzen und ein Brief zum Widerrufen ist unzulässig.\n\n" +
      "Der Widerruf wirkt allerdings nur nach vorn: Was bis dahin rechtmäßig verarbeitet wurde, bleibt rechtmäßig. Wer auch das beseitigt haben will, muss die Löschung gesondert verlangen — ein Recht, das unabhängig von der Einwilligung besteht.\n\n" +
      "Das alles besagt nichts über die Qualität eines Dienstes. Es besagt nur, wer worüber entscheidet.",
    questions: [
      {
        text: "Warum ist die Kopplung an einen Kauf unzulässig?",
        options: [
          "Weil der Zweck fehlt",
          "Weil die Entscheidung dann nicht freiwillig ist",
          "Weil der Widerruf erschwert wird",
        ],
        answer: 1,
        explain: "„Wer ohne die Einwilligung den Dienst nicht nutzen kann, hat nicht frei entschieden.“",
      },
      {
        kind: "gapfill",
        text: "Die Einwilligung ist jederzeit ___.",
        options: [],
        answer: 0,
        accept: ["widerruflich"],
        explain: "Ve geri alma, verme kadar kolay olmak zorunda.",
      },
      {
        text: "Was sagt der Text über „Zur Verbesserung unserer Angebote“?",
        options: [
          "Es ist ein zulässiger Zweck.",
          "Es ist keine Zweckbezeichnung, sondern eine Formel.",
          "Es genügt bei Newslettern.",
        ],
        answer: 1,
        explain: "Amaç, veri toplanmadan önce ADLANDIRILMIŞ olmalı.",
      },
      {
        kind: "short_answer",
        text: "Wie weit wirkt der Widerruf?",
        options: [],
        answer: 0,
        accept: [
          "nur nach vorn",
          "nicht rückwirkend",
          "was bis dahin rechtmäßig war, bleibt rechtmäßig",
        ],
        explain: "Geçmişi de temizlemek için ayrıca silme talebi gerekiyor.",
      },
      {
        text: "Beim Kauf selbst braucht es laut Text eine Einwilligung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: orada işleme sözleşmenin ifasına dâhil.",
      },
    ],
  },
  {
    id: "c1-u14-l1",
    level: "C1",
    skill: "listening",
    unit: 14,
    title: "Die Abmahnung",
    genre: "Danışma görüşmesi",
    intro: "İhtar aldı. Ne yapmalı, ne yapmamalı?",
    gloss: [
      { de: "die Abmahnung", tr: "ihtar", en: "formal warning" },
      { de: "fristlos", tr: "ihbarsız", en: "without notice" },
      { de: "der Einspruch", tr: "itiraz", en: "objection" },
      { de: "einlegen", tr: "(itiraz) sunmak", en: "to lodge" },
      { de: "rechtens", tr: "hukuka uygun", en: "lawful" },
      { de: "eingestehen", tr: "kabul etmek", en: "to admit" },
      { de: "der Verband", tr: "sendika, birlik", en: "union, association" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Herr Bilir", text: "Ich habe eine Abmahnung bekommen. Zwei verspätete Schichten im Mai." },
      { speaker: "Frau Dr. Kern", text: "Stimmt der Vorwurf?" },
      { speaker: "Herr Bilir", text: "Einmal ja. Beim zweiten Mal war ich da, habe mich aber nicht eingestempelt." },
      { speaker: "Frau Dr. Kern", text: "Dann ist die Abmahnung in einem Punkt sachlich falsch. Das ist wichtig." },
      { speaker: "Herr Bilir", text: "Soll ich Einspruch einlegen?" },
      { speaker: "Frau Dr. Kern", text: "Sie können eine Gegendarstellung zur Personalakte geben. Ein förmlicher Einspruch ist im Arbeitsrecht nicht vorgesehen." },
      { speaker: "Herr Bilir", text: "Und wenn ich gar nichts mache?" },
      { speaker: "Frau Dr. Kern", text: "Dann steht die Darstellung des Arbeitgebers unwidersprochen in der Akte. Bei einer zweiten Abmahnung zählt sie mit." },
      { speaker: "Herr Bilir", text: "Kann er mir fristlos kündigen?" },
      { speaker: "Frau Dr. Kern", text: "Wegen Verspätung nach einer Abmahnung: nein. Fristlos setzt eine schwere Pflichtverletzung voraus." },
      { speaker: "Herr Bilir", text: "Und ist die Abmahnung insgesamt rechtens?" },
      { speaker: "Frau Dr. Kern", text: "Der Anwalt des Verbands sagte, sie müsse den Vorwurf konkret benennen — Datum, Uhrzeit, Vorfall. Prüfen Sie das." },
      { speaker: "Herr Bilir", text: "Das steht drin. Nur das zweite Datum stimmt eben nicht." },
      { speaker: "Frau Dr. Kern", text: "Dann schreiben Sie genau das. Gestehen Sie den ersten Vorfall ein und widersprechen Sie dem zweiten. Halbe Widersprüche wirken stärker als pauschale." },
    ],
    questions: [
      {
        text: "Was rät Frau Dr. Kern statt eines förmlichen Einspruchs?",
        options: [
          "Eine Klage",
          "Eine Gegendarstellung zur Personalakte",
          "Ein Gespräch mit dem Vorgesetzten",
        ],
        answer: 1,
        explain: "„Ein förmlicher Einspruch ist im Arbeitsrecht nicht vorgesehen.“",
      },
      {
        kind: "gapfill",
        text: "___ setzt eine schwere Pflichtverletzung voraus.",
        options: [],
        answer: 0,
        accept: ["Fristlos", "Fristlose Kündigung"],
        explain: "İhbarsız fesih için gecikme yetmiyor; ağır ihlal gerekiyor.",
      },
      {
        text: "Was passiert, wenn Herr Bilir nichts unternimmt?",
        options: [
          "Die Abmahnung verfällt nach einem Jahr.",
          "Die Darstellung des Arbeitgebers steht unwidersprochen in der Akte.",
          "Es hat keine Folgen.",
        ],
        answer: 1,
        explain: "„Bei einer zweiten Abmahnung zählt sie mit.“",
      },
      {
        kind: "dictation",
        text: "Frau Dr. Kern'in itirazın nasıl yazılacağına dair son öğüdünü yaz.",
        options: [],
        answer: 0,
        accept: [
          "Halbe Widersprüche wirken stärker als pauschale.",
          "Halbe Widersprüche wirken stärker als pauschale",
        ],
        explain: "Doğru olanı kabul etmek, yanlış olanın reddini inandırıcı kılıyor.",
      },
    ],
  },
  {
    id: "c1-u14-l2",
    level: "C1",
    skill: "listening",
    unit: 14,
    title: "Zu Protokoll gegeben",
    genre: "İfade alma",
    intro: "Tanık ifadesi. Hatırlamamak nasıl kayda geçiyor?",
    gloss: [
      { de: "die Zeugenaussage", tr: "tanık ifadesi", en: "witness statement" },
      { de: "zu Protokoll geben", tr: "tutanağa geçirtmek", en: "to state for the record" },
      { de: "der Tathergang", tr: "olayın seyri", en: "course of events" },
      { de: "wahrheitsgemäß", tr: "gerçeğe uygun", en: "truthful" },
      { de: "die Erinnerungslücke", tr: "hafıza boşluğu", en: "gap in memory" },
      { de: "das Urteilsvermögen", tr: "muhakeme yetisi", en: "judgement" },
      { de: "vortäuschen", tr: "numara yapmak", en: "to feign" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Beamtin", text: "Bitte schildern Sie den Tathergang, so wie Sie ihn erinnern." },
      { speaker: "Frau Renner", text: "Gegen halb acht hörte ich Glas. Ich ging ans Fenster und sah zwei Personen wegrennen." },
      { speaker: "Beamtin", text: "Können Sie die Personen beschreiben?" },
      { speaker: "Frau Renner", text: "Eine trug eine helle Jacke. Bei der zweiten bin ich unsicher." },
      { speaker: "Beamtin", text: "Unsicher heißt was genau?" },
      { speaker: "Frau Renner", text: "Ich habe später ein Foto in der Nachbarschaftsgruppe gesehen. Jetzt weiß ich nicht mehr, ob ich die Person gesehen oder das Foto erinnert habe." },
      { speaker: "Beamtin", text: "Danke, dass Sie das sagen. Genau das nehme ich so auf." },
      { speaker: "Frau Renner", text: "Ist das ein Problem?" },
      { speaker: "Beamtin", text: "Im Gegenteil. Eine benannte Erinnerungslücke ist verwertbar. Eine vorgetäuschte Sicherheit ist es nicht." },
      { speaker: "Frau Renner", text: "Und wenn ich mich beim Zeitpunkt irre?" },
      { speaker: "Beamtin", text: "Dann sagen Sie „gegen halb acht“, nicht „um 19:32“. Sie müssen wahrheitsgemäß aussagen, nicht präzise." },
      { speaker: "Frau Renner", text: "Ich hatte Sorge, dass meine Zeugenaussage dadurch wertlos wird." },
      { speaker: "Beamtin", text: "Sie wird dadurch erst brauchbar. Über Ihr Urteilsvermögen entscheidet nicht, wie sicher Sie klingen, sondern ob Sie Sicheres von Unsicherem trennen." },
      { speaker: "Frau Renner", text: "Das beruhigt mich." },
      { speaker: "Beamtin", text: "Ich gebe zu Protokoll: Die Zeugin erklärt, sie habe eine Person mit heller Jacke gesehen; hinsichtlich der zweiten Person bestehe eine Erinnerungslücke, da ein Lichtbild in sozialen Medien wahrgenommen wurde." },
    ],
    questions: [
      {
        text: "Warum ist die benannte Erinnerungslücke laut Beamtin gut?",
        options: [
          "Weil sie das Verfahren verkürzt",
          "Weil sie verwertbar ist, vorgetäuschte Sicherheit nicht",
          "Weil sie die Zeugin schützt",
        ],
        answer: 1,
        explain: "Kaydedilen belirsizlik, uydurma kesinlikten değerli.",
      },
      {
        kind: "gapfill",
        text: "Sie müssen ___ aussagen, nicht präzise.",
        options: [],
        answer: 0,
        accept: ["wahrheitsgemäß"],
        explain: "Gerçeğe uygunluk kesinlik değil; „gegen halb acht“ doğru bir ifade.",
      },
      {
        text: "Was hat die Erinnerung der Zeugin beeinflusst?",
        options: [
          "Ein Gespräch mit der Polizei",
          "Ein Foto in einer Nachbarschaftsgruppe",
          "Die Dunkelheit",
        ],
        answer: 1,
        explain: "Ve tanık bunu kendisi söylüyor — ifadeyi zayıflatmıyor, kullanılabilir kılıyor.",
      },
      {
        kind: "short_answer",
        text: "In welcher Form gibt die Beamtin die Aussage zu Protokoll?",
        options: [],
        answer: 0,
        accept: [
          "im Konjunktiv, als Wiedergabe",
          "Konjunktiv I: sie habe gesehen, bestehe eine Lücke",
          "als Wiedergabe im Konjunktiv",
        ],
        explain: "„Die Zeugin erklärt, sie habe … bestehe …“ — tutanak taraf tutmuyor.",
      },
    ],
  },
  {
    id: "c1-u14-w1",
    level: "C1",
    skill: "writing",
    unit: 14,
    title: "Hak doğuran sıra",
    genre: "Dil bilgisi",
    intro: "Bildirim, süre, temerrüt, talep — dördü de fiil kalıbıyla kuruluyor.",
    gloss: [
      { de: "Anspruch erheben", tr: "hak iddia etmek", en: "to lay claim" },
      { de: "in Verzug geraten", tr: "temerrüde düşmek", en: "to fall into default" },
      { de: "geltend machen", tr: "ileri sürmek", en: "to assert" },
      { de: "die Beseitigung", tr: "giderme", en: "rectification" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Ayıbın giderilmesi için bir süre belirliyoruz.",
        answer: "Wir setzen eine Frist zur Beseitigung des Mangels",
        hint: "eine Frist setzen: süre belirlemek; ayıp Genitiv ile bağlanıyor.",
      },
      {
        kind: "build",
        tr: "Süre geçtikten sonra kiraya veren temerrüde düşer.",
        answer: "Nach Ablauf der Frist gerät der Vermieter in Verzug",
        hint: "in Verzug geraten: öbek belirteç almaz.",
      },
      {
        kind: "build",
        tr: "Haklarımızı üç yıl daha ileri sürebiliriz.",
        answer: "Wir können unsere Ansprüche noch drei Jahre geltend machen",
        hint: "geltend machen: sabit öbek, nesne araya girer.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: hak henüz doğmadan iddia ediliyor.",
        source: "Der Mangel besteht seit Montag, deshalb mindern wir ab sofort die Miete.",
        answer: "Wir haben den Mangel heute angezeigt und setzen eine Frist zur Beseitigung bis zum 20. Mai.",
        alternatives: [
          "Wir haben den Mangel heute angezeigt und setzen eine Frist zur Beseitigung bis zum 20. Mai",
          "Wir zeigen den Mangel hiermit an und setzen eine Frist zur Beseitigung.",
        ],
        why: "İndirim hakkı ayıbın varlığından değil, bildirim ve sürenin geçmesinden doğar. Sırayı atlayan kiracı haklı olduğu hâlde kaybedebilir — hukuk dilinde adımın yeri içerikten önemlidir.",
      },
    ],
  },
  {
    id: "c1-u14-w2",
    level: "C1",
    skill: "writing",
    unit: 14,
    title: "Mängelanzeige mit Frist",
    genre: "Resmî yazı",
    intro: "Ayıbı bildir, süre koy, sonucu şimdiden söyle — ama tehdit etme.",
    gloss: [
      { de: "die Beseitigung", tr: "giderme", en: "rectification" },
      { de: "in Verzug geraten", tr: "temerrüde düşmek", en: "to fall into default" },
      { de: "die Mietminderung", tr: "kira indirimi", en: "rent reduction" },
      { de: "geltend machen", tr: "ileri sürmek", en: "to assert" },
      { de: "unter Vorbehalt", tr: "ihtirazi kayıtla", en: "under reservation" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki duruma dayanarak kiraya verene resmî bir ayıp bildirimi yaz. Sırayı tut: ayıbı tarihiyle ve somut olarak tarif et, gidermek için makul bir süre belirle, sürenin geçmesi hâlinde ne olacağını bildir, ve ödemeyi ihtirazi kayıtla sürdüreceğini söyle. Tehdit dili kullanma; sonucu hukuki bir sonuç olarak yaz.",
        stimulus:
          "DURUM\n\n" +
          "— Daire: Lindenstraße 8, 3. kat, kira 940 € + 180 € yan gider\n" +
          "— 6 Mayıs'tan beri banyoda sıcak su yok; sabahları 15 dakika akıtınca ılık geliyor\n" +
          "— 7 Mayıs'ta yöneticiye telefon edildi, kayıt yok\n" +
          "— 12 Mayıs'ta tesisatçı geldi, \"parça gerekiyor\" dedi, o gün bugündür haber yok\n" +
          "— Bugün 24 Mayıs\n" +
          "— Komşu dairede de aynı sorun var",
        checklist: [
          "Ayıp tarih ve ayrıntıyla tarif edildi mi?",
          "Makul bir süre belirlendi mi?",
          "Sürenin geçmesinin sonucu hukuki dille yazıldı mı?",
          "Ödeme ihtirazi kayıtla mı sürdürülüyor, tehdit var mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Hiermit zeige ich folgenden Mangel an: …", tr: "işbu yazıyla şu ayıbı bildiriyorum", en: "I hereby report the following defect" },
          { de: "Ich setze Ihnen eine Frist bis zum …", tr: "size …-e kadar süre veriyorum", en: "I set you a deadline until …" },
          { de: "Die Miete zahle ich weiterhin unter Vorbehalt.", tr: "kirayı ihtirazi kayıtla ödemeyi sürdürüyorum", en: "I continue to pay the rent under reservation" },
        ],
        sample:
          "Sehr geehrte Frau Hartmann,\n\n" +
          "hiermit zeige ich folgenden Mangel an der Wohnung Lindenstraße 8, 3. OG, an:\n\n" +
          "Seit dem 6. Mai steht in der Wohnung kein Warmwasser zur Verfügung. Erst nach etwa fünfzehn Minuten Laufzeit erreicht das Wasser eine lauwarme Temperatur. Am 7. Mai habe ich die Hausverwaltung telefonisch informiert. Am 12. Mai war ein Installateur vor Ort und teilte mit, ein Ersatzteil sei erforderlich; seither habe ich keine Rückmeldung erhalten. In der Nachbarwohnung besteht derselbe Mangel.\n\n" +
          "Ich setze Ihnen hiermit eine Frist zur Beseitigung bis zum 3. Juni. Nach fruchtlosem Ablauf dieser Frist geraten Sie in Verzug; ich behalte mir vor, ab dem 6. Mai eine Mietminderung geltend zu machen und die Beseitigung auf Ihre Kosten zu veranlassen.\n\n" +
          "Die Miete zahle ich bis dahin weiterhin in voller Höhe, ausdrücklich unter Vorbehalt.\n\n" +
          "Für eine kurze Bestätigung des Termins wäre ich Ihnen dankbar.\n\n" +
          "Mit freundlichen Grüßen\nA. Renner",
      },
    ],
  },
];
