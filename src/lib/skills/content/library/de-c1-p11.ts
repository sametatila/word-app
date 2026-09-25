import type { SkillExercise } from "../../types";

/**
 * DE · C1 — Beceriler kütüphanesi, parti 11.
 *
 * Hücreyi YİRMİYE tamamlayan on partinin ilki (11–20). Kurallar ve emsal:
 * `de-c1.ts` (parti 1), `de-c1-p10.ts` ve `data/content/SPEC.md`.
 *
 * Parti 11 yargı ve yurttaş katılımı hattı: meslekten olmayan bir yargıcın
 * denemesi, bir bilgilendirme yayını, bir başvuru mektubu. Dil bilgisi
 * cümle değerinde ortaç öbekleri (Partizipialsätze) — g8'deki niteleyici
 * ortaçtan farkı, öbeğin bir ismi değil bütün cümleyi nitelemesi.
 */
export const deC1P11: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-c1-lib-r11",
    course: "de",
    level: "C1",
    skill: "reading",
    title: "Fünf Jahre auf der Richterbank",
    genre: "essay",
    intro: "Meslekten olmayan bir yargıcın denemesi: beş yıl boyunca mahkeme heyetinde oturmak ona neyi öğretti.",
    gloss: [
      { de: "die Schöffin", tr: "meslekten olmayan yargıç", en: "lay judge" },
      { de: "die Akte", tr: "dosya", en: "file" },
      { de: "die Verhandlung", tr: "duruşma", en: "hearing" },
      { de: "die Beratung", tr: "müzakere", en: "deliberation" },
      { de: "überstimmen", tr: "oylamada yenmek", en: "to outvote" },
      { de: "der Zweifel", tr: "kuşku", en: "doubt" },
    ],
    minutes: 10,
    text:
      "Fünf Jahre auf der Richterbank\n\n" +
      "Als mich der Brief des Amtsgerichts erreichte, hielt ich ihn für einen Irrtum. " +
      "Beworben hatte ich mich nicht, jedenfalls nicht bewusst; ein Nachbar hatte mich " +
      "vorgeschlagen, und die Gemeinde hatte die Liste weitergereicht. Fünf Jahre später " +
      "bin ich froh, dass ich damals nicht nach einem Ausweg gesucht habe.\n\n" +
      "Als Schöffin sitzt man neben zwei Berufsrichtern, ohne die Akte zu kennen. " +
      "Das klingt nach einem Mangel, ist aber so gewollt: Man soll nach dem urteilen, " +
      "was in der Verhandlung gesagt wird, nicht nach dem, was in den Unterlagen steht. " +
      "In den ersten Monaten habe ich das für eine Zumutung gehalten. Heute halte ich es " +
      "für den Kern der Sache.\n\n" +
      "Denn wer die Akte kennt, hört anders zu. Er hört vor allem, ob sich bestätigt, " +
      "was er schon weiß. Ich dagegen musste mir jedes Mal ein Bild aus dem machen, was " +
      "vor mir geschah — aus Aussagen, die einander widersprachen, und aus Pausen, die " +
      "manchmal mehr verrieten als die Antworten.\n\n" +
      "Das Schwierigste war nicht das Zuhören, sondern die Beratung danach. Zweimal war " +
      "ich anderer Meinung als die beiden Berufsrichter. Einmal habe ich sie tatsächlich " +
      "überzeugt; beim zweiten Mal wurde ich überstimmt, und ich habe nächtelang darüber " +
      "nachgedacht, ob ich meine Zweifel klar genug formuliert hatte.\n\n" +
      "Was ich gelernt habe, ist unspektakulär. Ein Zweifel, den man nicht begründen kann, " +
      "ist noch keiner. Aber ein Zweifel, den man aus Höflichkeit verschweigt, ist " +
      "schlimmer als ein unbegründeter.\n\n" +
      "Ob Laien vor Gericht mehr Gerechtigkeit bringen, weiß ich bis heute nicht. " +
      "Sicher bin ich nur, dass Berufsrichter anders erklären müssen, wenn jemand am Tisch " +
      "sitzt, der ihre Sprache nicht spricht. Und dass eine Begründung, die einer " +
      "Buchhändlerin standhält, meistens auch vor einer höheren Instanz besteht.",
    questions: [
      {
        text: "Wie ist die Autorin zu dem Amt gekommen?",
        options: [
          "Sie hatte sich gezielt beworben.",
          "Ein Nachbar hatte sie vorgeschlagen.",
          "Das Gericht hatte sie ausgelost.",
        ],
        answer: 1,
        explain: "Bir komşusu onu önermiş, belediye de listeyi mahkemeye iletmiş.",
      },
      {
        text: "Warum kennen Schöffen die Akte nicht?",
        options: [
          "weil nur die Verhandlung zählen soll",
          "weil die Akte zu kompliziert ist",
          "weil der Datenschutz es verbietet",
        ],
        answer: 0,
        explain: "Yalnız duruşmada söylenene göre karar verilmesi isteniyor: „so gewollt“.",
      },
      {
        kind: "truefalse",
        text: "Die Autorin hält das fehlende Aktenwissen heute für einen Mangel.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Bugün onu işin özü sayıyor: „Heute halte ich es für den Kern der Sache.“",
      },
      {
        kind: "gapfill",
        text: "Beim zweiten Mal wurde die Autorin in der Beratung ___.",
        options: [],
        answer: 0,
        accept: ["überstimmt"],
        explain: "„beim zweiten Mal wurde ich überstimmt“ — öteki iki oy ağır bastı.",
      },
      {
        kind: "short_answer",
        text: "Was ist laut Autorin schlimmer als ein unbegründeter Zweifel?",
        options: [],
        answer: 0,
        accept: [
          "ein verschwiegener Zweifel",
          "ein aus Höflichkeit verschwiegener Zweifel",
          "ein Zweifel, den man verschweigt",
          "ein Zweifel, den man aus Höflichkeit verschweigt",
          "verschwiegener Zweifel",
        ],
        explain: "Nezaketten susulan şüphe, gerekçesiz olandan daha kötü sayılıyor.",
      },
      {
        text: "Was ändert sich laut Autorin, wenn Laien mitentscheiden?",
        options: [
          "Die Urteile werden milder.",
          "Die Verfahren werden kürzer.",
          "Die Richter müssen anders erklären.",
        ],
        answer: 2,
        explain: "Masada onların dilini konuşmayan biri oturunca yargıçlar farklı açıklamak zorunda kalıyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-c1-lib-l11",
    course: "de",
    level: "C1",
    skill: "listening",
    title: "Wie man Schöffe wird",
    genre: "info",
    intro: "Bir bilgilendirme yayını: meslekten olmayan yargıçlar nasıl seçiliyor, görevi kim reddedebiliyor, işveren ne yapmak zorunda.",
    gloss: [
      { de: "die Amtszeit", tr: "görev süresi", en: "term of office" },
      { de: "die Vorschlagsliste", tr: "aday listesi", en: "list of nominees" },
      { de: "ablehnen", tr: "reddetmek", en: "to refuse" },
      { de: "freistellen", tr: "izinli saymak", en: "to release from work" },
      { de: "die Entschädigung", tr: "tazminat", en: "compensation" },
      { de: "die Unparteilichkeit", tr: "tarafsızlık", en: "impartiality" },
    ],
    minutes: 10,
    segments: [
      { text: "Alle fünf Jahre suchen die Gemeinden Menschen, die als Schöffinnen und Schöffen an Strafverfahren mitwirken. Viele wissen nicht einmal, dass es dieses Amt gibt." },
      { text: "Der Weg dorthin hat zwei Stufen: Die Gemeinde stellt eine Vorschlagsliste auf, und ein Ausschuss am Amtsgericht wählt daraus aus." },
      { speaker: "Herr Kessler", text: "Man kann sich selbst melden, man kann aber auch vorgeschlagen werden, ohne davon zu wissen. Das überrascht die meisten, und manche ärgert es auch." },
      { text: "Voraussetzungen sind die deutsche Staatsangehörigkeit und ein Alter zwischen fünfundzwanzig und neunundsechzig Jahren. Juristische Kenntnisse werden ausdrücklich nicht erwartet." },
      { speaker: "Herr Kessler", text: "Im Gegenteil. Wir suchen keine kleinen Juristen, sondern Menschen, die nachfragen, wenn sie etwas nicht verstehen. Diese Fragen sind oft die wichtigsten im ganzen Verfahren." },
      { text: "Ablehnen kann man das Amt nur aus bestimmten Gründen, etwa wegen des Alters, wegen der Pflege von Angehörigen oder wenn man schon in der vorigen Amtszeit tätig war." },
      { text: "Der Arbeitgeber muss Schöffen für die Sitzungstage freistellen und darf ihnen daraus keine Nachteile entstehen lassen. Den Verdienstausfall ersetzt das Gericht in Form einer Entschädigung." },
      { speaker: "Herr Kessler", text: "Was wir am häufigsten erleben, ist nicht Unwilligkeit, sondern Angst, falsch zu entscheiden. Dazu sage ich immer: Sie entscheiden nicht allein, aber Sie entscheiden mit." },
      { text: "Eine Grenze gibt es allerdings. Wer ein Verfahren nicht unvoreingenommen verfolgen kann, etwa weil er Beteiligte kennt, muss das melden. Die Unparteilichkeit geht jedem persönlichen Wunsch vor." },
      { speaker: "Herr Kessler", text: "Und noch etwas: Die Stimme einer Schöffin zählt genauso viel wie die eines Berufsrichters. Zwei Laien können eine Verurteilung also verhindern." },
      { text: "Die nächste Wahl findet im kommenden Jahr statt; Vorschläge nehmen die Gemeinden bis Ende März entgegen." },
    ],
    questions: [
      {
        text: "Wer stellt die Vorschlagsliste auf?",
        options: ["das Amtsgericht", "die Gemeinde", "die Staatsanwaltschaft"],
        answer: 1,
        explain: "Listeyi belediye hazırlıyor, seçimi mahkemedeki bir kurul yapıyor.",
      },
      {
        text: "Was wünscht sich Herr Kessler von Schöffen?",
        options: [
          "dass sie juristisch vorgebildet sind",
          "dass sie in der Verhandlung schweigen",
          "dass sie nachfragen, was sie nicht verstehen",
        ],
        answer: 2,
        explain: "Anlamadığını soran insanlar arıyorlar; bu sorular çoğu zaman en önemlileri.",
      },
      {
        kind: "truefalse",
        text: "Juristische Kenntnisse sind eine Voraussetzung für das Amt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Juristische Kenntnisse werden ausdrücklich nicht erwartet.“",
      },
      {
        kind: "gapfill",
        text: "Schöffen müssen zwischen fünfundzwanzig und ___ Jahre alt sein.",
        options: [],
        answer: 0,
        accept: ["neunundsechzig", "69"],
        explain: "„ein Alter zwischen fünfundzwanzig und neunundsechzig Jahren“.",
      },
      {
        kind: "short_answer",
        text: "Was ersetzt das Gericht in Form einer Entschädigung?",
        options: [],
        answer: 0,
        accept: ["den Verdienstausfall", "Verdienstausfall", "den Lohnausfall"],
        explain: "İşveren izin vermek zorunda, kaybedilen kazancı mahkeme karşılıyor.",
      },
      {
        text: "Was muss man dem Gericht melden?",
        options: [
          "dass man Beteiligte kennt",
          "dass man das Urteil ablehnt",
          "dass man umziehen wird",
        ],
        answer: 0,
        explain: "Tarafları tanıyan biri tarafsız izleyemeyeceği için bunu bildirmek zorunda.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-c1-lib-w11",
    course: "de",
    level: "C1",
    skill: "writing",
    title: "Bewerbung für das Schöffenamt",
    genre: "formal",
    intro: "Bir göreve başvuru mektubu yazıyorsun: önce iki cümle kur, sonra gerekçeli ve kendini abartmayan bir başvuru yaz.",
    gloss: [
      { de: "sich bewerben", tr: "başvurmak", en: "to apply" },
      { de: "befangen", tr: "taraflı", en: "biased" },
      { de: "der Widerspruch", tr: "çelişki", en: "contradiction" },
      { de: "ermutigen", tr: "cesaretlendirmek", en: "to encourage" },
      { de: "die Amtszeit", tr: "görev süresi", en: "term of office" },
    ],
    minutes: 16,
    tasks: [
      {
        kind: "build",
        tr: "Komşumun önerisiyle cesaretlenerek bu göreve başvuruyorum.",
        answer: "Durch den Vorschlag meines Nachbarn ermutigt, bewerbe ich mich um das Amt.",
        alternatives: ["Ermutigt durch den Vorschlag meines Nachbarn, bewerbe ich mich um das Amt."],
        hint: "Partizip II öbeği cümlenin başında durur ve virgülle ayrılır; hemen ardından çekimli fiil gelir.",
      },
      {
        kind: "build",
        tr: "Kendi deneyimimden yola çıkarak dinlemeyi konuşmaktan zor buluyorum.",
        answer: "Von meiner eigenen Erfahrung ausgehend, halte ich Zuhören für schwerer als Reden.",
        alternatives: ["Ausgehend von meiner eigenen Erfahrung, halte ich Zuhören für schwerer als Reden."],
        hint: "Partizip I öbeği (ausgehend) ana cümleyle aynı özneye bağlıdır; öbek bitince virgül gelir.",
      },
      {
        kind: "free",
        prompt:
          "Meslekten olmayan yargıçlık için bir başvuru mektubu yaz: görevden nasıl haberdar olduğunu söyle, bu göreve neden uygun olduğunu tek bir somut deneyimle göster, bir zayıf yanını dürüstçe adlandır, taraflı hissettiğinde ne yapacağını belirt ve kısa bir kapanışla bitir.",
        checklist: [
          "Görevden nasıl haberdar olduğunu yaz",
          "Uygunluğunu tek bir somut deneyimle göster",
          "Bir zayıf yanını dürüstçe adlandır",
          "Taraflılık durumunda ne yapacağını söyle ve kapat",
        ],
        minWords: 150,
        phrases: [
          { de: "Hiermit bewerbe ich mich um …", tr: "Bu yazıyla … için başvuruyorum", en: "I hereby apply for …" },
          { de: "Aufmerksam geworden bin ich durch …", tr: "… sayesinde haberdar oldum", en: "I became aware of it through …" },
          { de: "Geeignet macht mich weniger … als …", tr: "Beni uygun kılan …'den çok …", en: "What makes me suitable is less … than …" },
          { de: "Offen gesagt fällt es mir schwer, …", tr: "Açıkçası … bana zor geliyor", en: "Frankly, I find it hard to …" },
          { de: "Sollte ich mich befangen fühlen, würde ich …", tr: "Kendimi taraflı hissedersem … yapardım", en: "Should I feel biased, I would …" },
        ],
        sample:
          "Sehr geehrte Damen und Herren, hiermit bewerbe ich mich um das Amt einer Schöffin " +
          "für die kommende Amtszeit. " +
          "Aufmerksam geworden bin ich durch einen Aushang im Rathaus; durch den Vorschlag " +
          "meines Nachbarn ermutigt, habe ich mich schließlich entschieden. " +
          "Geeignet macht mich weniger ein besonderes Wissen als eine Gewohnheit aus meinem " +
          "Beruf: Ich arbeite seit zwölf Jahren in der Schuldnerberatung und höre täglich " +
          "Geschichten, die beim zweiten Erzählen anders klingen als beim ersten. " +
          "Von dieser Erfahrung ausgehend, halte ich Zuhören für schwerer als Reden, und ich " +
          "habe gelernt, einen Widerspruch zu bemerken, ohne ihn sofort zu bewerten. " +
          "Offen gesagt fällt es mir schwer, eine Entscheidung zu treffen, solange Zweifel " +
          "bleiben. Ich weiß aber, dass genau das zu diesem Amt gehört und dass ich eine " +
          "solche Entscheidung nicht allein treffe. " +
          "Sollte ich mich in einem Verfahren befangen fühlen, etwa weil ich eine beteiligte " +
          "Person aus der Beratung kenne, würde ich das sofort mitteilen, auch wenn es " +
          "unangenehm ist. " +
          "Für Rückfragen stehe ich gern zur Verfügung. Mit freundlichen Grüßen, Mira Hoffmann",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-c1-lib-s11",
    course: "de",
    level: "C1",
    skill: "speaking",
    title: "Sollten Laien über Schuld mitentscheiden?",
    genre: "monologue",
    intro: "Bir buçuk dakikaya kadar tek başına konuşacaksın: bir kurumu savun ve ona karşı en güçlü örneği kendin getir.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Meslekten olmayan yurttaşlar ceza davalarında karara katılmalı mı? Konumunu söyle, bu katılımın neyi değiştirdiğini açıkla, en güçlü karşı örneği kendin getir ve konumunu bir koşula bağlayarak bitir.",
      bulletsTr: [
        "Konumunu tek cümleyle söyle",
        "Katılımın somut olarak neyi değiştirdiğini açıkla",
        "En güçlü karşı örneği kendin getir",
        "Konumunu bir koşula bağlayarak bitir",
      ],
      targets: [
        { de: "Ich halte das für sinnvoll, und zwar nicht, weil …, sondern weil …", tr: "Bunu anlamlı buluyorum; … yüzünden değil, … yüzünden" },
        { de: "Was sich dadurch ändert, ist vor allem …", tr: "Bununla değişen şey her şeyden önce …" },
        { de: "Das stärkste Gegenbeispiel wäre …", tr: "En güçlü karşı örnek … olurdu" },
        { de: "Unter einer Bedingung allerdings: …", tr: "Ancak bir koşulla: …" },
      ],
      minSeconds: 60,
      maxSeconds: 100,
      sampleDe:
        "Ich halte die Beteiligung von Laien für sinnvoll, und zwar nicht, weil sie gerechter " +
        "urteilen würden als Fachleute, sondern weil sie die Fachleute zu einer anderen Sprache " +
        "zwingen. " +
        "Was sich dadurch ändert, ist vor allem die Begründung: Ein Richter, der einer " +
        "Krankenpflegerin erklären muss, warum ein Zweifel nicht ausreicht, prüft seine eigene " +
        "Begründung gründlicher als im Gespräch mit einem Kollegen. " +
        "Das stärkste Gegenbeispiel wäre ein Verfahren, bei dem die öffentliche Stimmung schon " +
        "vor der Verhandlung feststeht, etwa nach einer Tat, über die wochenlang berichtet wurde. " +
        "Dort bringen Laien nicht Abstand mit an den Tisch, sondern die Stimmung der Straße, " +
        "und die Berufsrichter müssen das Verfahren davor schützen. " +
        "Ich nehme dieses Risiko ernst, halte es aber für kleiner als das umgekehrte: " +
        "eine Justiz, die nur noch mit sich selbst spricht. " +
        "Unter einer Bedingung allerdings: Wer mitentscheidet, muss vorher lernen, was ein Beweis " +
        "ist und was nicht. Sonst verwechselt er seinen Eindruck mit einem Beweis, und dann " +
        "hätte die Beteiligung genau das Gegenteil von dem bewirkt, wofür sie gedacht ist.",
      rubricHint:
        "Bir konum, katılımın somut etkisi ve dürüstçe kurulmuş bir karşı örnek beklenir; „und zwar nicht, weil … sondern“, „das stärkste Gegenbeispiel wäre“ ve bir koşul cümlesi kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-c1-lib-g11",
    course: "de",
    level: "C1",
    skill: "grammar",
    title: "Von der Frage überrascht, …",
    genre: "grammar",
    intro: "Almanca bir yan cümleyi tek bir ortaç öbeğine indirebilir; yazılı anlatının sıkılığı buradan gelir.",
    focus: "Cümle değerinde ortaç öbekleri (Partizipialsätze): niteleyici değil, yan cümle yerine",
    gloss: [
      { de: "die Zeugin", tr: "tanık", en: "witness" },
      { de: "überraschen", tr: "şaşırtmak", en: "to surprise" },
      { de: "die Haft", tr: "tutukluluk", en: "custody" },
      { de: "ankommen", tr: "varmak", en: "to arrive" },
      { de: "die Beratung", tr: "müzakere", en: "deliberation" },
    ],
    minutes: 12,
    explanation: [
      {
        heading: "Yan cümle öbeğe dönüşür",
        tr: "„Weil sie von der Frage überrascht war, schwieg sie“ cümlesi kısaltılabilir: „Von der Frage überrascht, schwieg sie.“ Bağlaç, özne ve çekimli fiil düşer; geriye yalnız ortaç ve tümleçleri kalır. İsim önündeki niteleyiciden farkı şu: öbek bir ismi değil bütün cümleyi niteler ve ortaç çekim eki almaz.",
        examples: [
          { de: "Von der Frage überrascht, schwieg die Zeugin.", tr: "Sorudan şaşıran tanık sustu.", note: "= weil sie überrascht war" },
          { de: "In der Stadt angekommen, rief er sofort an.", tr: "Şehre varınca hemen aradı.", note: "= als er angekommen war" },
          { de: "Vom Urteil enttäuscht, verließ er den Saal.", tr: "Karardan hayal kırıklığına uğrayınca salonu terk etti.", note: "= weil er enttäuscht war" },
        ],
      },
      {
        heading: "Partizip I eşzamanlılık, Partizip II öncelik bildirir",
        tr: "Partizip I (beobachtend, ausgehend) ana cümleyle AYNI ANDA süren etken bir eylem bildirir. Partizip II (angekommen, entlassen) ya daha önce tamamlanmış bir eylemi ya da edilgen bir durumu bildirir. Bu yüzden seçim hem zamanı hem çatıyı belirler.",
        examples: [
          { de: "Den Zeugen aufmerksam beobachtend, machte sie sich Notizen.", tr: "Tanığı dikkatle izleyerek notlar aldı.", note: "Partizip I: aynı anda" },
          { de: "Aus der Haft freigelassen, suchte er eine Wohnung.", tr: "Tutukluluktan salıverildikten sonra bir ev aradı.", note: "Partizip II: önce ve edilgen" },
          { de: "Von seiner Erfahrung ausgehend, widersprach der Richter.", tr: "Deneyiminden yola çıkan yargıç itiraz etti.", note: "Partizip I + tümleç" },
        ],
      },
      {
        heading: "Tek kural: özne aynı olmalı",
        tr: "Öbeğin görünmeyen öznesi ana cümlenin öznesidir. „Im Gericht angekommen, begann die Verhandlung“ bu yüzden yanlıştır: mahkemeye varan duruşma değildir. Öbek virgülle ayrılır; Vorfeld'de durduğunda arkasından hemen çekimli fiil gelir.",
        examples: [
          { de: "Im Gericht angekommen, meldete sie sich an der Pforte.", tr: "Mahkemeye varınca kapıda kendini bildirdi.", note: "özne: sie" },
          { de: "Gut vorbereitet, gingen die Schöffen in die Beratung.", tr: "Meslekten olmayan yargıçlar iyi hazırlanmış olarak müzakereye geçti.", note: "öbek + fiil" },
          { de: "Die Akte, sorgfältig geprüft, lag auf dem Tisch.", tr: "Dikkatle incelenmiş dosya masada duruyordu.", note: "ara öbek" },
        ],
      },
    ],
    questions: [
      {
        text: "„Weil sie von der Frage überrascht war, schwieg sie.“ — Welche Kurzform ist richtig?",
        options: [
          "Von der Frage überraschend, schwieg sie.",
          "Von der Frage überrascht, sie schwieg.",
          "Von der Frage überrascht, schwieg sie.",
        ],
        answer: 2,
        explain: "Edilgen bir durum Partizip II ister; öbekten sonra hemen çekimli fiil gelir.",
      },
      {
        text: "Welcher Satz ist falsch gebildet?",
        options: [
          "Im Gericht angekommen, begann die Verhandlung.",
          "In der Stadt angekommen, rief er an.",
          "Gut vorbereitet, gingen sie in die Beratung.",
        ],
        answer: 0,
        explain: "Öbeğin öznesi ana cümlenin öznesi olmalı; mahkemeye varan duruşma olamaz.",
      },
      {
        text: "„Den Zeugen beobachtend, machte sie Notizen.“ — Was drückt das Partizip aus?",
        options: ["Vorzeitigkeit", "Gleichzeitigkeit", "Passiv"],
        answer: 1,
        explain: "Partizip I ana cümleyle aynı anda süren etken bir eylem bildirir.",
      },
      {
        kind: "gapfill",
        text: "In der Stadt ___, rief er sofort an. (ankommen)",
        options: [],
        answer: 0,
        accept: ["angekommen"],
        explain: "Varış telefondan önce tamamlanmış; Partizip II gelir ve çekimsiz kalır.",
      },
      {
        kind: "gapfill",
        text: "Von seiner Erfahrung ___, widersprach der Richter. (ausgehen, Partizip I)",
        options: [],
        answer: 0,
        accept: ["ausgehend"],
        explain: "Partizip I mastar + d ile kurulur: ausgehen → ausgehend.",
      },
      {
        kind: "gapfill",
        text: "Aus der Haft ___, suchte er eine Wohnung. (freilassen)",
        options: [],
        answer: 0,
        accept: ["freigelassen"],
        explain: "Edilgen ve önce tamamlanmış bir eylem: ayrılabilen fiilde ge- ortaya girer.",
      },
      {
        kind: "gapfill",
        text: "Von der Frage überrascht, ___ die Zeugin. (schweigen, Präteritum)",
        options: [],
        answer: 0,
        accept: ["schwieg"],
        explain: "Öbek Vorfeld'i doldurur; çekimli fiil hemen arkasından ikinci sırada gelir.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Gut vorbereitet", "gingen", "die Schöffen", "in die Beratung"],
        explain: "Ortaç öbeği ilk sırayı doldurur, ardından çekimli fiil ve özne gelir.",
      },
      {
        kind: "truefalse",
        text: "Im Partizipialsatz bekommt das Partizip eine Adjektivendung.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Cümle değerindeki öbekte ortaç çekimsiz kalır; ek yalnız isim önündeki niteleyicide gelir.",
      },
      {
        kind: "truefalse",
        text: "Der Partizipialsatz hat dasselbe Subjekt wie der Hauptsatz.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Öbeğin görünmeyen öznesi ana cümlenin öznesidir; özne farklıysa yan cümle kurulur.",
      },
    ],
  },
];
