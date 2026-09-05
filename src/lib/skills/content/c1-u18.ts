import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 18 — "Tür ve kayıt, kelime hassasiyeti, als-ob, imtiyaz".
 *
 * Dört ders: Ein Inhalt, drei Töne · Das treffende Wort ·
 * Als wäre nichts geschehen · Wenngleich und dennoch.
 *
 *   Kelime: die Textsorte, das Register, umschreiben, der Adressat, die
 *           Tonlage, herablassend, anmaßend, überheblich · scheinbar,
 *           anscheinend, effektiv, effizient, unterscheiden, die Genauigkeit,
 *           der Anschein, die Interpretation · verdrängen, die Illusion,
 *           aufrechterhalten, die Normalität, der Bruch, die Identifikation,
 *           die Emotion, die Unsicherheit · ungeachtet, nichtsdestotrotz,
 *           einschränken, abschwächen, die Gegenposition, tolerieren,
 *           beanspruchen, die Übereinkunft
 *
 * Ünitenin çekirdeği: BİR CÜMLE NE KADAR İDDİA EDİYOR? Dört ders bunun
 * dört ayarı — "scheinbar" görünüşün yanıltıcı olduğunu iddia eder,
 * "anscheinend" doğru olabileceğini; "als ob" gerçek dışı olduğunu
 * işaretler; konzessiv bağlaç karşı görüşü kabul edip iddiayı bırakmaz;
 * kayıt ise ilişki hakkında ne iddia ettiğini belirler.
 *
 * Türkçe konuşan için ilginç olan şu: scheinbar/anscheinend ayrımının
 * Türkçe karşılığı ZATEN VAR — "sözde" ve "görünüşe göre". Ama scheinbar
 * biçim olarak "görünüş"e (Schein) benzediği için eşleşme ters kuruluyor
 * ve tam tersi anlam çıkıyor. Ders bunu doğrudan adlandırıyor.
 */
export const c1U18: SkillExercise[] = [
  {
    id: "c1-u18-r1",
    level: "C1",
    skill: "reading",
    unit: 18,
    title: "Scheinbar oder anscheinend",
    genre: "Dil yazısı",
    intro: "İki sözcük, zıt iddialar. Türkçede ayrım zaten var — eşleşme ters.",
    gloss: [
      { de: "scheinbar", tr: "sözde, görünürde (ama değil)", en: "seemingly (but not)" },
      { de: "anscheinend", tr: "görünüşe göre (muhtemelen öyle)", en: "apparently" },
      { de: "der Anschein", tr: "görünüş, izlenim", en: "appearance" },
      { de: "die Genauigkeit", tr: "kesinlik", en: "precision" },
      { de: "unterscheiden", tr: "ayırt etmek", en: "to distinguish" },
      { de: "die Interpretation", tr: "yorum", en: "interpretation" },
      { de: "effizient", tr: "verimli", en: "efficient" },
    ],
    minutes: 7,
    text:
      "ZWEI WÖRTER, ZWEI BEHAUPTUNGEN\n\n" +
      "„Er ist scheinbar krank“ und „Er ist anscheinend krank“ klingen fast gleich. Sie sagen das Gegenteil.\n\n" +
      "„Anscheinend“ heißt: Dem Anschein nach ist es so, und vermutlich stimmt es. Die Sprecherin hat Hinweise und nimmt an, dass sie tragen.\n\n" +
      "„Scheinbar“ heißt: Es sieht so aus, aber es ist nicht so. Wer „scheinbar krank“ sagt, unterstellt, dass jemand die Krankheit vorschiebt.\n\n" +
      "Der Unterschied ist keine Feinheit. Er entscheidet, ob ein Satz eine Vermutung oder einen Vorwurf enthält. In einer Personalakte ist das ein juristisch relevanter Unterschied.\n\n" +
      "Bemerkenswert ist, dass viele Muttersprachler die beiden ebenfalls vermischen — „scheinbar“ wird umgangssprachlich oft für „anscheinend“ verwendet. In geschriebener Sprache und in Prüfungen gilt die Unterscheidung gleichwohl.\n\n" +
      "Ein ähnliches Paar: effektiv und effizient. Effektiv ist, was das Ziel erreicht. Effizient ist, was es mit geringem Aufwand erreicht. Eine Maßnahme kann effektiv und zugleich völlig ineffizient sein — sie wirkt, kostet aber das Zehnfache. Wer beides gleichsetzt, verliert genau die Aussage, auf die es in einem Bericht ankommt.\n\n" +
      "Der Unterschied ist auch keine Frage der Interpretation. Er steht im Wörterbuch, und er steht in jedem Kommentar zum Arbeitsrecht.\n\n" +
      "Genauigkeit auf dieser Ebene wirkt kleinlich, solange nichts davon abhängt. Sie fällt erst auf, wenn ein Satz anders ausgelegt wird, als er gemeint war — und dann fällt sie zurück auf den, der ihn geschrieben hat.",
    questions: [
      {
        text: "Was bedeutet „Er ist scheinbar krank“?",
        options: [
          "Vermutlich ist er krank",
          "Es sieht so aus, aber er ist es nicht",
          "Er ist sicher krank",
        ],
        answer: 1,
        explain: "Suçlama içeriyor: hastalığı öne sürdüğü ima ediliyor.",
      },
      {
        kind: "gapfill",
        text: "Dem Anschein nach stimmt es: Er ist ___ krank.",
        options: [],
        answer: 0,
        accept: ["anscheinend"],
        explain: "anscheinend: elde ipucu var ve taşıdığı varsayılıyor.",
      },
      {
        text: "Worin unterscheiden sich effektiv und effizient?",
        options: [
          "Effektiv erreicht das Ziel, effizient erreicht es mit geringem Aufwand",
          "Sie bedeuten dasselbe",
          "Effizient ist stärker als effektiv",
        ],
        answer: 0,
        explain: "Bir önlem etkili ama son derece verimsiz olabiliyor.",
      },
      {
        kind: "short_answer",
        text: "Warum ist der Unterschied in einer Personalakte wichtig?",
        options: [],
        answer: 0,
        accept: [
          "Vermutung oder Vorwurf",
          "er entscheidet, ob der Satz eine Vermutung oder einen Vorwurf enthält",
          "es ist ein juristisch relevanter Unterschied",
        ],
        explain: "Aynı cümle ya tahmin ya isnat oluyor.",
      },
      {
        text: "Der Text sagt, Muttersprachler machen diesen Fehler nie.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yanlış: konuşma dilinde sık karıştırılıyor, yazıda ayrım geçerli.",
      },
    ],
  },
  {
    id: "c1-u18-r2",
    level: "C1",
    skill: "reading",
    unit: 18,
    title: "Ein Inhalt, drei Töne",
    genre: "Rehber yazısı",
    intro: "Aynı bilgi üç metin türünde. Değişen ne, değişmeyen ne?",
    gloss: [
      { de: "die Textsorte", tr: "metin türü", en: "text type" },
      { de: "das Register", tr: "kayıt, dil düzeyi", en: "register" },
      { de: "der Adressat", tr: "muhatap", en: "addressee" },
      { de: "umschreiben", tr: "yeniden yazmak", en: "to rewrite" },
      { de: "herablassend", tr: "tepeden bakan", en: "condescending" },
      { de: "überheblich", tr: "kibirli", en: "arrogant" },
      { de: "die Tonlage", tr: "ton", en: "tone" },
    ],
    minutes: 7,
    text:
      "DREIMAL DIESELBE STÖRUNG\n\n" +
      "Ein Serverausfall, vier Stunden, zweitausend Nutzer betroffen. Drei Texte.\n\n" +
      "Die interne Meldung: „Ausfall Node 3, 09:12–13:04, Ursache Speicherleck im Cache-Dienst. Fix eingespielt, Monitoring angepasst.“ Kein vollständiger Satz, keine Entschuldigung. Der Adressat kennt das System und braucht Daten.\n\n" +
      "Die Kundenmitteilung: „Am Dienstagvormittag war unser Dienst rund vier Stunden nicht erreichbar. Die Ursache lag bei uns; wir haben sie behoben und die Überwachung erweitert, damit sie sich nicht wiederholt. Für die Unterbrechung entschuldigen wir uns.“ Ganze Sätze, Verantwortung benannt, keine technischen Details.\n\n" +
      "Die Pressemeldung: „Nach einer technischen Störung am Dienstag ist der Dienst seit Dienstagnachmittag wieder uneingeschränkt verfügbar.“ Kürzer als beide, und auffällig: Der Ausfall steht im Nebensatz, die Wiederherstellung im Hauptsatz.\n\n" +
      "Wer denselben Vorgang für eine andere Textsorte umschreibt, ändert also nicht den Stil, sondern die Auswahl.\n\n" +
      "Der Inhalt ist derselbe. Was sich ändert, ist der Adressat — und mit ihm, welche Information tragend ist.\n\n" +
      "Zwei Fehler sind typisch. Der erste: die interne Tonlage nach außen tragen. Ein Kunde, der „Speicherleck im Cache-Dienst“ liest, fühlt sich nicht informiert, sondern abgefertigt. Der zweite ist subtiler: die Kundensprache nach innen tragen. Wer im Team schreibt „Wir bedauern die entstandenen Unannehmlichkeiten“, klingt nicht höflich, sondern überheblich — als spräche er nicht mit Kollegen, sondern über sie.\n\n" +
      "Register ist deshalb keine Frage der Höflichkeit, sondern der Adressierung. Zu hoch gegriffen wirkt herablassend, zu tief gegriffen respektlos. Beides sagt dasselbe: Ich habe nicht daran gedacht, wer das liest.",
    questions: [
      {
        text: "Was ist an der Pressemeldung auffällig?",
        options: [
          "Sie enthält technische Details",
          "Der Ausfall steht im Nebensatz, die Wiederherstellung im Hauptsatz",
          "Sie entschuldigt sich am ausführlichsten",
        ],
        answer: 1,
        explain: "Ağırlık cümle yapısıyla kaydırılıyor.",
      },
      {
        kind: "gapfill",
        text: "Das ___ richtet sich nach dem Adressaten.",
        options: [],
        answer: 0,
        accept: ["Register"],
        explain: "Kayıt nezaket meselesi değil, muhatap meselesi.",
      },
      {
        text: "Warum wirkt Kundensprache im Team überheblich?",
        options: [
          "Sie ist zu lang",
          "Es klingt, als spräche man über die Kollegen statt mit ihnen",
          "Sie enthält Fremdwörter",
        ],
        answer: 1,
        explain: "Fazla yüksek kayıt tepeden bakma etkisi yaratıyor.",
      },
      {
        kind: "short_answer",
        text: "Was sagen laut Text beide Register-Fehler gemeinsam aus?",
        options: [],
        answer: 0,
        accept: [
          "man hat den Leser vergessen", "ich habe nicht daran gedacht, wer das liest",
          "dass man den Adressaten nicht bedacht hat",
          "man hat nicht an den Leser gedacht",
        ],
        explain: "Fazla yüksek de fazla alçak da aynı ihmali gösteriyor.",
      },
      {
        kind: "short_answer",
        text: "Warum enthält die interne Meldung keine ganzen Sätze?",
        options: [],
        answer: 0,
        accept: [
          "die Leser kennen das System",
          "der Adressat kennt das System und braucht Daten",
          "es werden nur Daten gebraucht",
        ],
        explain: "Orada tam cümle kurmak zaman kaybı, nezaket değil.",
      },
    ],
  },
  {
    id: "c1-u18-l1",
    level: "C1",
    skill: "listening",
    unit: 18,
    title: "Als wäre nichts geschehen",
    genre: "Diyalog",
    intro: "als ob / als wäre: gerçek dışını işaretlemek.",
    gloss: [
      { de: "verdrängen", tr: "bastırmak", en: "to suppress" },
      { de: "die Illusion", tr: "yanılsama", en: "illusion" },
      { de: "aufrechterhalten", tr: "sürdürmek", en: "to maintain" },
      { de: "die Normalität", tr: "olağanlık", en: "normality" },
      { de: "der Bruch", tr: "kopuş, kırılma", en: "rupture" },
      { de: "die Unsicherheit", tr: "belirsizlik", en: "uncertainty" },
      { de: "die Emotion", tr: "duygu", en: "emotion" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Deniz", text: "Er kam heute rein und hat gegrüßt, als wäre nichts geschehen." },
      { speaker: "Miriam", text: "Nach der Sitzung letzte Woche?" },
      { speaker: "Deniz", text: "Ja. Er hat mich vor allen unterbrochen, dreimal. Und heute: „Morgen, alles gut?“" },
      { speaker: "Miriam", text: "Vielleicht hat er es verdrängt. Manche merken es wirklich nicht." },
      { speaker: "Deniz", text: "Das macht es nicht besser. Und es hält die Illusion aufrecht, dass nichts passiert ist." },
      { speaker: "Miriam", text: "Nein. Aber es ändert, was du tun kannst. Wenn er es nicht gemerkt hat, hilft ein Gespräch. Wenn er so tut, als ob, hilft es nicht." },
      { speaker: "Deniz", text: "Wie unterscheide ich das?" },
      { speaker: "Miriam", text: "An der Reaktion. Sag ihm sachlich, was passiert ist. Wer es verdrängt hat, erschrickt. Wer die Normalität bewusst aufrechterhält, weicht aus." },
      { speaker: "Deniz", text: "Und wenn er ausweicht?" },
      { speaker: "Miriam", text: "Dann weißt du, woran du bist, und das ist mehr wert als eine Entschuldigung, die keine ist." },
      { speaker: "Deniz", text: "Ich will keinen Bruch. Ich will nur, dass es benannt wird." },
      { speaker: "Miriam", text: "Dann sag genau das. Ohne Emotion in der Stimme, mit dem Satz, den du dir vorher zurechtgelegt hast." },
      { speaker: "Deniz", text: "Ich hasse diese Unsicherheit." },
      { speaker: "Miriam", text: "Die verschwindet erst, wenn du fragst. Solange du es dir selbst erklärst, erklärst du es dir immer schlechter." },
    ],
    questions: [
      {
        text: "Was unterscheidet laut Miriam Verdrängung vom bewussten Tun-als-ob?",
        options: [
          "Die Wortwahl",
          "Die Reaktion: Erschrecken gegen Ausweichen",
          "Die Zeit, die vergangen ist",
        ],
        answer: 1,
        explain: "Bunu ancak konuşarak ayırt edebiliyorsun.",
      },
      {
        kind: "gapfill",
        text: "Er hat gegrüßt, als ___ nichts geschehen.",
        options: [],
        answer: 0,
        accept: ["wäre"],
        explain: "als + Konjunktiv II, fiil hemen als'ın ardında.",
      },
      {
        text: "Warum ist Ausweichen laut Miriam trotzdem nützlich?",
        options: [
          "Weil es eine Entschuldigung ist",
          "Weil man dann weiß, woran man ist",
          "Weil es das Problem löst",
        ],
        answer: 1,
        explain: "Sahte bir özürden daha değerli bilgi.",
      },
      {
        kind: "dictation",
        text: "Miriam'ın kendi kendine açıklamanın neden işe yaramadığını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "Solange du es dir selbst erklärst, erklärst du es dir immer schlechter.",
          "Solange du es dir selbst erklärst, erklärst du es dir immer schlechter",
        ],
        explain: "Belirsizlik ancak sorulunca dağılıyor.",
      },
    ],
  },
  {
    id: "c1-u18-l2",
    level: "C1",
    skill: "listening",
    unit: 18,
    title: "Ungeachtet aller Einwände",
    genre: "Toplantı",
    intro: "İmtiyaz bağlaçları: kabul et, ama iddianı bırakma.",
    gloss: [
      { de: "ungeachtet", tr: "-e rağmen", en: "notwithstanding" },
      { de: "nichtsdestotrotz", tr: "yine de", en: "nonetheless" },
      { de: "einschränken", tr: "sınırlamak", en: "to qualify" },
      { de: "abschwächen", tr: "yumuşatmak", en: "to soften" },
      { de: "die Gegenposition", tr: "karşı görüş", en: "counter-position" },
      { de: "beanspruchen", tr: "talep etmek", en: "to claim" },
      { de: "die Übereinkunft", tr: "mutabakat", en: "agreement" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Frau Arslan", text: "Ungeachtet der Einwände aus der Technik halte ich am Termin fest." },
      { speaker: "Herr Weiß", text: "Sie haben die Einwände gehört und ändern nichts?" },
      { speaker: "Frau Arslan", text: "Ich habe sie gehört und für berechtigt gehalten. Das ist der Unterschied zwischen „ungeachtet“ und „trotz Ihrer falschen Bedenken“." },
      { speaker: "Herr Weiß", text: "Das ist ein feiner Unterschied." },
      { speaker: "Frau Arslan", text: "Es ist der ganze Unterschied. Ich schwäche Ihre Position nicht ab, ich stelle sie nur hinter eine andere." },
      { speaker: "Herr Weiß", text: "Obgleich Sie damit das Risiko übernehmen." },
      { speaker: "Frau Arslan", text: "Genau deshalb steht mein Name unter der Entscheidung und nicht Ihrer." },
      { speaker: "Herr Weiß", text: "Sie beanspruchen also, meine Gegenposition zu kennen und trotzdem anders zu entscheiden." },
      { speaker: "Frau Arslan", text: "Ja. Genau das ist meine Aufgabe." },
      { speaker: "Herr Weiß", text: "Und welche Position steht dahinter?" },
      { speaker: "Frau Arslan", text: "Die Vertragsstrafe. Wir verschieben um drei Wochen und zahlen vierzigtausend. Nichtsdestotrotz nehme ich Ihre Bedenken ins Protokoll auf." },
      { speaker: "Herr Weiß", text: "Was bringt mir das Protokoll?" },
      { speaker: "Frau Arslan", text: "Wenn es schiefgeht, war es meine Entscheidung, nicht Ihr Versäumnis. Das ist keine Höflichkeit, das ist die Verteilung der Verantwortung." },
      { speaker: "Herr Weiß", text: "Dann brauche ich eine Einschränkung darin: Der Test der Migration bleibt unvollständig." },
      { speaker: "Frau Arslan", text: "Einverstanden. Formulieren Sie ihn, ich unterschreibe. Damit haben wir keine Übereinkunft in der Sache, aber eine über das Verfahren — und das genügt heute." },
    ],
    questions: [
      {
        text: "Worin liegt für Frau Arslan der Unterschied bei „ungeachtet“?",
        options: [
          "Es ist höflicher formuliert",
          "Die Einwände werden als berechtigt anerkannt, nur nachgeordnet",
          "Es bedeutet, dass sie die Einwände nicht kennt",
        ],
        answer: 1,
        explain: "„Ich schwäche Ihre Position nicht ab, ich stelle sie nur hinter eine andere.“",
      },
      {
        kind: "gapfill",
        text: "___ der Einwände aus der Technik halte ich am Termin fest.",
        options: [],
        answer: 0,
        accept: ["Ungeachtet"],
        explain: "ungeachtet + Genitiv; edat, bağlaç değil.",
      },
      {
        text: "Wozu dient die Aufnahme ins Protokoll?",
        options: [
          "Zur Höflichkeit",
          "Zur Verteilung der Verantwortung",
          "Zur Vertragsstrafe",
        ],
        answer: 1,
        explain: "Ters giderse karar onun, ihmal Herr Weiß'ın değil.",
      },
      {
        kind: "short_answer",
        text: "Worüber besteht am Ende Einigkeit?",
        options: [],
        answer: 0,
        accept: [
          "über das Verfahren",
          "über das Verfahren, nicht in der Sache",
          "keine Übereinkunft in der Sache, aber über das Verfahren",
        ],
        explain: "Usulde mutabakat, esasta değil — ve bugünlük yetiyor.",
      },
    ],
  },
  {
    id: "c1-u18-w1",
    level: "C1",
    skill: "writing",
    unit: 18,
    title: "Doğru sözcük, doğru iddia",
    genre: "Dil bilgisi",
    intro: "Görünüş bildiren iki zarf, imtiyaz edatı ve gerçek dışı kıyas.",
    gloss: [
      { de: "anscheinend", tr: "görünüşe göre", en: "apparently" },
      { de: "scheinbar", tr: "sözde", en: "seemingly (but not)" },
      { de: "ungeachtet", tr: "-e rağmen", en: "notwithstanding" },
      { de: "nichtsdestotrotz", tr: "yine de", en: "nonetheless" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Görünüşe göre hasta — sabahtan beri kimse ondan haber almadı.",
        answer: "Anscheinend ist er krank",
        hint: "Elde ipucu var ve muhtemelen doğru: anscheinend.",
      },
      {
        kind: "build",
        tr: "Teknik biriminden gelen itirazlara rağmen tarihte ısrar ediyorum.",
        answer: "Ungeachtet der Einwände aus der Technik halte ich am Termin fest",
        hint: "ungeachtet Genitiv ister; ardından ana cümle fiille başlar.",
      },
      {
        kind: "build",
        tr: "Hiçbir şey olmamış gibi selam verdi.",
        answer: "Er hat gegrüßt, als wäre nichts geschehen",
        hint: "als + Konjunktiv II; fiil doğrudan als'ın ardında.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: sözcük seçimi kastedilmeyen bir suçlama taşıyor.",
        source: "Der Mitarbeiter war scheinbar krank; wir haben ihn deshalb entschuldigt.",
        answer: "Der Mitarbeiter war anscheinend krank; wir haben ihn deshalb entschuldigt.",
        alternatives: [
          "Der Mitarbeiter war anscheinend krank; wir haben ihn deshalb entschuldigt",
          "Der Mitarbeiter war anscheinend krank, wir haben ihn deshalb entschuldigt.",
        ],
        why: "„scheinbar“ hastalığın numara olduğunu ima ediyor, ikinci yarıysa mazur gördüğünü söylüyor — cümle kendi içinde çelişiyor. Türkçede ayrım zaten var (sözde / görünüşe göre); tuzak scheinbar'ın biçim olarak „görünüş“e benzemesi.",
      },
    ],
  },
  {
    id: "c1-u18-w2",
    level: "C1",
    skill: "writing",
    unit: 18,
    title: "Aynı olay, iki muhatap",
    genre: "Kurum yazışması",
    intro: "Bir arıza, iki metin: ekip içi ve müşteriye.",
    gloss: [
      { de: "die Textsorte", tr: "metin türü", en: "text type" },
      { de: "der Adressat", tr: "muhatap", en: "addressee" },
      { de: "umschreiben", tr: "yeniden yazmak", en: "to rewrite" },
      { de: "die Tonlage", tr: "ton", en: "tone" },
      { de: "einschränken", tr: "sınırlamak", en: "to qualify" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki olay notundan İKİ ayrı metin yaz. (A) Ekip kanalına kısa iç bildirim — eksiltili, teknik, özür yok. (B) Etkilenen müşterilere bildirim — tam cümleler, sorumluluk adlandırılmış, teknik ayrıntı yok, ne yapıldığı ve tekrar etmemesi için ne değiştiği açık. İkisinde de aynı olguları ver; uydurma bilgi ekleme, olanı da gizleme.",
        stimulus:
          "OLAY NOTU (ham)\n\n" +
          "12.03., 09:12–13:04 (3 sa 52 dk). Node 3 kaynaklı kesinti.\n" +
          "Neden: cache servisinde bellek sızıntısı, üç haftadır birikiyormuş, izleme eşiği yanlış ayarlıymış.\n" +
          "Etki: ~2.000 kullanıcı giriş yapamadı. Veri kaybı YOK.\n" +
          "Yapılan: düzeltme yayınlandı, izleme eşiği düşürüldü, haftalık bellek raporu eklendi.\n" +
          "Açık kalan: aynı sızıntı Node 5'te de olabilir, kontrol 15.03.'te.",
        checklist: [
          "İç bildirim eksiltili ve verili mi, özür içermiyor mu?",
          "Müşteri bildirimi tam cümlelerle mi, teknik terimsiz mi?",
          "Sorumluluk müşteri metninde açıkça üstlenildi mi?",
          "Veri kaybı olmadığı söylendi, açık kalan nokta gizlenmedi mi?",
        ],
        minWords: 110,
        phrases: [
          { de: "Fix eingespielt, Monitoring angepasst.", tr: "düzeltme yayınlandı, izleme ayarlandı", en: "fix deployed, monitoring adjusted" },
          { de: "Die Ursache lag bei uns.", tr: "sebep bizdeydi", en: "the cause was on our side" },
          { de: "Kundendaten waren zu keinem Zeitpunkt betroffen.", tr: "müşteri verileri hiçbir anda etkilenmedi", en: "customer data was never affected" },
        ],
        sample:
          "A — INTERN (#incidents)\n\n" +
          "Ausfall Node 3, 12.03., 09:12–13:04. Ursache: Speicherleck im Cache-Dienst, Aufbau über drei Wochen, Monitoring-Schwelle zu hoch gesetzt. Rund 2.000 Nutzer ohne Login, kein Datenverlust.\n" +
          "Fix eingespielt, Schwelle gesenkt, wöchentlicher Speicherreport ergänzt.\n" +
          "Offen: gleiches Leck auf Node 5 möglich — Prüfung am 15.03.\n\n" +
          "B — AN DIE KUNDEN\n\n" +
          "Betreff: Störung am 12. März — was passiert ist\n\n" +
          "Sehr geehrte Kundinnen und Kunden,\n\n" +
          "am 12. März war die Anmeldung bei unserem Dienst zwischen 9:12 und 13:04 Uhr nicht möglich. Etwa 2.000 Nutzerinnen und Nutzer waren betroffen.\n\n" +
          "Die Ursache lag bei uns: Ein Fehler in einem internen Dienst hatte sich über mehrere Wochen aufgebaut, ohne dass unsere Überwachung rechtzeitig Alarm geschlagen hat. Kundendaten waren zu keinem Zeitpunkt betroffen, und es sind keine Daten verloren gegangen.\n\n" +
          "Wir haben den Fehler behoben und unsere Überwachung so umgestellt, dass ein solcher Aufbau künftig früh auffällt. Eine weitere Komponente prüfen wir am 15. März vorsorglich auf denselben Fehler.\n\n" +
          "Für die Unterbrechung entschuldigen wir uns.\n\n" +
          "Mit freundlichen Grüßen\nIhr Team von Aventis Digital",
      },
    ],
  },
];
