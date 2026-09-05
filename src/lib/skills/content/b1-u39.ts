import type { SkillExercise } from "../types";

/**
 * B1 · Ünite 39 — "İş dünyasının resmî dili" (dersler 153–156).
 *
 * Dersler: Einen Experten fragen · Büroalltag · Arbeitsrecht ·
 * Gespräch mit der Chefin.
 *
 * İki aktarım hatası bu ünitenin diline düşüyor:
 *   sıfattan türeyen  der Angestellte, die Angestellte, ein Angestellter
 *   isim              — bu isimler SIFAT gibi çekilir ve biçimleri
 *                     artikele göre değişir. Türkçede isim hiç
 *                     değişmediği için "ein Angestellte" çıkıyor.
 *                     Ünite 34 zayıf erilleri çalışmıştı; bu ayrı bir
 *                     sınıf ve kuralı da ayrı.
 *   dass ↔ das        Türkçede ne bağlaç ne ilgi zamiri ayrı sözcüktür,
 *                     ikisi de ektir; o yüzden yazıda ikisi karışıyor.
 *                     dass BAĞLAÇTIR (yan cümle açar), das ise ARTİKEL
 *                     ya da İLGİ ZAMİRİDİR. Yalnız yazıda görünen,
 *                     konuşurken duyulmayan bir hata.
 *
 * Yeni 32 kelime: der Experte, der Spezialist, die Spezialistin,
 * der Fachmann, die Fachfrau, die Fachleute, das Institut, die Forschung,
 * der Sekretär, die Sekretärin, die Mitarbeiterin, die Praktikantin,
 * die Konferenz, die Präsentation, das Seminar, präsentieren,
 * die Gewerkschaft, der Betriebsrat, die Arbeitserlaubnis,
 * die Arbeitslosigkeit, die Entlassung, der Angestellte,
 * die Beschäftigung, die Tätigkeit, die Chefin, leiten, die Leitung,
 * einsetzen, anstellen, vorschlagen, mitteilen, ausrichten.
 */
export const b1U39: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "b1-u39-r1",
    level: "B1",
    skill: "reading",
    unit: 39,
    title: "Wer hilft bei Problemen im Betrieb?",
    genre: "İş hukuku bilgilendirmesi",
    intro: "İşyerinde sorun çıkarsa kime gidilir? Üç adres.",
    minutes: 5,
    gloss: [
      { de: "der Betriebsrat", tr: "işyeri kurulu", en: "works council" },
      { de: "die Gewerkschaft", tr: "sendika", en: "trade union" },
      { de: "die Entlassung", tr: "işten çıkarma", en: "dismissal" },
      { de: "der Angestellte", tr: "çalışan", en: "employee" },
      { de: "die Tätigkeit", tr: "faaliyet / iş", en: "activity" },
    ],
    text:
      "Wenn es im Betrieb Streit gibt, geht ein Angestellter zuerst zum " +
      "Betriebsrat. Das kostet nichts und bleibt intern.\n\n" +
      "Der Betriebsrat ist selbst aus dem Betrieb: ein Kollege oder eine " +
      "Kollegin, gewählt für vier Jahre. Er darf bei einer Entlassung " +
      "gehört werden und kennt die Tätigkeit, um die es geht. " +
      "Das ist ein Vorteil, den ein Anwalt von außen nicht hat.\n\n" +
      "Die Gewerkschaft kommt danach. Sie ist nicht im Betrieb, sondern " +
      "größer, und sie hilft vor allem, wenn viele dasselbe Problem haben. " +
      "Mitglied wird man vorher, nicht am Tag des Streits.\n\n" +
      "Und drittens: Alles, was Sie sagen, sollten Sie auch aufschreiben. " +
      "Ein Angestellter, der ein Datum nennen kann, steht besser da als " +
      "einer, der sich nur erinnert.",
    questions: [
      {
        text: "Zu wem geht man zuerst?",
        options: ["Zur Gewerkschaft", "Zum Betriebsrat", "Zum Anwalt"],
        answer: 1,
        explain: "„… geht ein Angestellter zuerst zum Betriebsrat.“",
      },
      {
        text: "Was ist der Vorteil des Betriebsrats?",
        options: ["Er kennt die Tätigkeit", "Er ist billiger als ein Anwalt", "Er entscheidet allein"],
        answer: 0,
        explain: "„… kennt die Tätigkeit, um die es geht. Das ist ein Vorteil, den ein Anwalt von außen nicht hat.“",
      },
      {
        text: "Wann soll man Mitglied der Gewerkschaft werden?",
        options: ["Am Tag des Streits", "Vorher", "Nie"],
        answer: 1,
        explain: "„Mitglied wird man vorher, nicht am Tag des Streits.“",
      },
      {
        kind: "gapfill",
        text: "Wenn es Streit gibt, geht ___ ___ zuerst zum Betriebsrat.",
        options: [],
        answer: 0,
        accept: ["ein Angestellter"],
        explain: "Sıfattan türeyen isim: „ein Angestellter“, „ein Angestellte“ değil.",
      },
      {
        kind: "short_answer",
        text: "Für wie lange wird der Betriebsrat gewählt?",
        options: [],
        answer: 0,
        accept: ["für vier Jahre", "vier Jahre"],
        explain: "„… gewählt für vier Jahre.“",
      },
    ],
  },
  {
    id: "b1-u39-r2",
    level: "B1",
    skill: "reading",
    unit: 39,
    title: "Einen Experten fragen",
    genre: "Rehber metin",
    intro: "Uzmana nasıl soru sorulur? Neye dikkat etmeli?",
    minutes: 5,
    gloss: [
      { de: "der Experte", tr: "uzman", en: "expert" },
      { de: "die Fachfrau", tr: "uzman (kadın)", en: "specialist" },
      { de: "das Institut", tr: "enstitü", en: "institute" },
      { de: "die Forschung", tr: "araştırma", en: "research" },
      { de: "die Fachleute", tr: "uzmanlar", en: "specialists" },
    ],
    text:
      "Wer einen Experten fragt, bekommt eine bessere Antwort, wenn er " +
      "seine Frage vorher aufschreibt. Das klingt einfach und wird fast " +
      "nie gemacht.\n\n" +
      "Sagen Sie zuerst, was Sie schon wissen. Eine Fachfrau muss sonst " +
      "raten, wo sie anfangen soll, und erklärt entweder zu viel oder zu " +
      "wenig. Sagen Sie danach, wofür Sie die Antwort brauchen.\n\n" +
      "Fragen Sie ruhig nach, wenn Sie etwas nicht verstanden haben. " +
      "Fachleute vergessen oft, dass ein Wort für sie normal ist und " +
      "für andere nicht. Das ist keine Unhöflichkeit, sondern ein Dienst.\n\n" +
      "Und glauben Sie nicht alles, nur weil jemand an einem Institut " +
      "arbeitet. Fragen Sie, woher die Zahl kommt. Gute Forschung hält " +
      "diese Frage aus; schlechte nicht.",
    questions: [
      {
        text: "Was soll man vorher tun?",
        options: ["Die Frage aufschreiben", "Ein Buch lesen", "Einen Termin machen"],
        answer: 0,
        explain: "„… bekommt eine bessere Antwort, wenn er seine Frage vorher aufschreibt.“",
      },
      {
        text: "Was soll man zuerst sagen?",
        options: ["Was man schon weiß", "Wie viel Zeit man hat", "Wer man ist"],
        answer: 0,
        explain: "„Sagen Sie zuerst, was Sie schon wissen.“",
      },
      {
        text: "Was soll man bei einer Zahl fragen?",
        options: ["Woher sie kommt", "Wie alt sie ist", "Wer sie gesagt hat"],
        answer: 0,
        explain: "„Fragen Sie, woher die Zahl kommt.“",
      },
      {
        kind: "gapfill",
        text: "Fachleute vergessen oft, ___ ein Wort für sie normal ist.",
        options: [],
        answer: 0,
        accept: ["dass"],
        explain: "Yan cümle açan BAĞLAÇ → dass (çift s). Artikel olsaydı „das“.",
      },
      {
        kind: "short_answer",
        text: "Was hält gute Forschung aus?",
        options: [],
        answer: 0,
        accept: ["die Frage, woher die Zahl kommt", "die Frage", "woher die Zahl kommt"],
        explain: "„Gute Forschung hält diese Frage aus; schlechte nicht.“",
      },
    ],
  },
  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "b1-u39-l1",
    level: "B1",
    skill: "listening",
    unit: 39,
    title: "Vor der Konferenz",
    genre: "Ofis konuşması",
    intro: "Bir konferans hazırlığı. Kim ne getiriyor?",
    minutes: 4,
    gloss: [
      { de: "die Konferenz", tr: "konferans", en: "conference" },
      { de: "die Präsentation", tr: "sunum", en: "presentation" },
      { de: "die Praktikantin", tr: "stajyer (kadın)", en: "intern" },
      { de: "ausrichten", tr: "iletmek", en: "to pass on" },
    ],
    segments: [
      { text: "Ist die Präsentation für morgen fertig?" },
      { text: "Fast. Die Zahlen fehlen noch, die kommen um vier." },
      { text: "Gut. Die Konferenz beginnt um neun im großen Raum." },
      { text: "Kommt die Praktikantin mit?" },
      { text: "Ja, sie schreibt mit. Das hilft ihr mehr als ein Seminar." },
      { text: "Kann jemand der Sekretärin ausrichten, dass wir den Raum brauchen?" },
      { text: "Mache ich gleich. Soll ich auch Getränke bestellen?" },
      { text: "Ja, bitte. Und das Kabel für den Monitor nicht vergessen." },
    ],
    questions: [
      {
        text: "Was fehlt noch an der Präsentation?",
        options: ["Die Zahlen", "Die Bilder", "Der Text"],
        answer: 0,
        explain: "„Fast. Die Zahlen fehlen noch, die kommen um vier.“",
      },
      {
        text: "Wann beginnt die Konferenz?",
        options: ["Um vier", "Um neun", "Um zehn"],
        answer: 1,
        explain: "„Die Konferenz beginnt um neun im großen Raum.“",
      },
      {
        text: "Was macht die Praktikantin?",
        options: ["Sie präsentiert", "Sie schreibt mit", "Sie bestellt Getränke"],
        answer: 1,
        explain: "„Ja, sie schreibt mit. Das hilft ihr mehr als ein Seminar.“",
      },
      {
        kind: "gapfill",
        text: "Kann jemand der Sekretärin ausrichten, ___ wir den Raum brauchen?",
        options: [],
        answer: 0,
        accept: ["dass"],
        explain: "Bağlaç → dass. „das“ burada olmaz, çünkü bir isim yerine geçmiyor.",
      },
      {
        kind: "short_answer",
        text: "Was soll man nicht vergessen?",
        options: [],
        answer: 0,
        accept: ["das Kabel für den Monitor", "das Kabel", "Kabel"],
        explain: "„Und das Kabel für den Monitor nicht vergessen.“",
      },
    ],
  },
  {
    id: "b1-u39-l2",
    level: "B1",
    skill: "listening",
    unit: 39,
    title: "Gespräch mit der Chefin",
    genre: "Yönetici görüşmesi",
    intro: "Bir öneri sunuluyor. Nasıl karşılanıyor?",
    minutes: 4,
    gloss: [
      { de: "die Chefin", tr: "yönetici (kadın)", en: "boss" },
      { de: "vorschlagen", tr: "önermek", en: "to suggest" },
      { de: "leiten", tr: "yönetmek", en: "to lead" },
      { de: "anstellen", tr: "işe almak", en: "to employ" },
    ],
    segments: [
      { text: "Sie wollten mir etwas vorschlagen?" },
      { text: "Ja. Ich möchte das kleine Projekt im Herbst selbst leiten." },
      { text: "Interessant. Warum Sie?" },
      { text: "Ich kenne die Kunden, und die Mitarbeiterin dort arbeitet gern mit mir." },
      { text: "Das stimmt, das habe ich auch gehört." },
      { text: "Wenn es gut läuft, könnten wir danach jemanden anstellen." },
      { text: "Langsam. Erst das Projekt, dann die Leitung, dann neue Leute." },
      { text: "Einverstanden. Ich teile Ihnen bis Freitag einen Plan mit." },
    ],
    questions: [
      {
        text: "Was möchte die Person?",
        options: ["Das Projekt selbst leiten", "Mehr Geld", "Ein Seminar besuchen"],
        answer: 0,
        explain: "„Ich möchte das kleine Projekt im Herbst selbst leiten.“",
      },
      {
        text: "Welche zwei Gründe nennt sie?",
        options: ["Sie kennt die Kunden und arbeitet gut mit der Mitarbeiterin", "Sie hat mehr Zeit", "Sie ist länger da"],
        answer: 0,
        explain: "„Ich kenne die Kunden, und die Mitarbeiterin dort arbeitet gern mit mir.“",
      },
      {
        text: "Was sagt die Chefin?",
        options: ["Nein", "Erst das Projekt, dann die Leitung", "Sofort einstellen"],
        answer: 1,
        explain: "„Langsam. Erst das Projekt, dann die Leitung, dann neue Leute.“",
      },
      {
        kind: "gapfill",
        text: "Ich teile Ihnen bis Freitag einen Plan ___.",
        options: [],
        answer: 0,
        accept: ["mit"],
        explain: "„mitteilen“ ayrılabilen fiildir: önek sona gider.",
      },
      {
        kind: "short_answer",
        text: "Bis wann kommt der Plan?",
        options: [],
        answer: 0,
        accept: ["bis Freitag", "Freitag"],
        explain: "„Ich teile Ihnen bis Freitag einen Plan mit.“",
      },
    ],
  },
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "b1-u39-w1",
    level: "B1",
    skill: "writing",
    unit: 39,
    title: "Meine Situation im Betrieb",
    genre: "Durum yazısı",
    intro: "İş durumunu anlat. Sıfattan türeyen isimler artikele göre değişir.",
    minutes: 8,
    gloss: [
      { de: "der Angestellte", tr: "çalışan", en: "employee" },
      { de: "die Beschäftigung", tr: "istihdam", en: "employment" },
      { de: "die Arbeitserlaubnis", tr: "çalışma izni", en: "work permit" },
      { de: "die Arbeitslosigkeit", tr: "işsizlik", en: "unemployment" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bu firmada üç yıldır çalışanım.",
        answer: "Ich bin seit drei Jahren Angestellter in dieser Firma.",
        alternatives: ["Ich bin seit drei Jahren Angestellte in dieser Firma."],
        hint: "Artikelsiz kullanımda da sıfat çekimi geçerli.",
      },
      {
        kind: "build",
        tr: "Sorun çıkarsa bir çalışan önce işyeri kuruluna gider.",
        answer: "Bei Problemen geht ein Angestellter zuerst zum Betriebsrat.",
        hint: "„ein“ ile eril biçim -er alır.",
      },
      {
        kind: "build",
        tr: "Çalışma iznim mayısta doluyor.",
        answer: "Meine Arbeitserlaubnis läuft im Mai ab.",
        hint: "Ayrılabilen fiil: önek sonda.",
      },
      {
        kind: "form",
        prompt: "Durum kartını doldur.",
        facts: "Kişi: Nuri Öz; statü: çalışan; süre: 3 yıl; sorun: işten çıkarma tehdidi; ilk adres: işyeri kurulu.",
        fields: [
          { label: "Name", answer: "Nuri Öz", accept: ["Nuri", "Öz"] },
          { label: "Status", answer: "Angestellter", accept: ["Angestellte", "Angestellter seit 3 Jahren"] },
          { label: "Dauer", answer: "3 Jahre", accept: ["drei Jahre"] },
          { label: "Erste Stelle", answer: "Betriebsrat", accept: ["der Betriebsrat", "zum Betriebsrat"] },
        ],
      },
      {
        kind: "rewrite",
        prompt: "Sıfattan türeyen ismin biçimini düzelt.",
        source: "Ich bin ein Angestellte und mein Bruder ist auch ein Angestellte.",
        answer: "Ich bin ein Angestellter und mein Bruder ist auch ein Angestellter.",
        why: "Türkçede isim hiç değişmez, o yüzden Almancada da tek biçim kullanılıyor. Ama Angestellte(r), Verwandte(r), Jugendliche(r), Deutsche(r) sıfattan türemiştir ve SIFAT gibi çekilir: der Angestellte, ein Angestellter, die Angestellte, eine Angestellte. Ünite 34'ün zayıf erilleri (der Neffe) ayrı bir sınıftı — bunlar hep -n alır, bunlar ise artikele göre değişir.",
      },
    ],
  },
  {
    id: "b1-u39-w2",
    level: "B1",
    skill: "writing",
    unit: 39,
    title: "Ein Vorschlag an die Leitung",
    genre: "Resmî öneri",
    intro: "Yönetime bir öneri yaz. Yazıda 'dass' ile 'das' karışmasın.",
    minutes: 12,
    gloss: [
      { de: "vorschlagen", tr: "önermek", en: "to suggest" },
      { de: "die Leitung", tr: "yönetim", en: "management" },
      { de: "mitteilen", tr: "bildirmek", en: "to inform" },
      { de: "einsetzen", tr: "görevlendirmek", en: "to deploy" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Projeyi kendim yönetmeyi öneriyorum.",
        answer: "Ich schlage vor, dass ich das Projekt selbst leite.",
        hint: "Bağlaç → dass; nesne artikeli → das.",
      },
      {
        kind: "build",
        tr: "Beğendiğim proje sonbaharda başlıyor.",
        answer: "Das Projekt, das mir gefällt, beginnt im Herbst.",
        hint: "İlgi zamiri → das (tek s).",
      },
      {
        kind: "free",
        prompt: "Yönetime bir öneri yaz: ne öneriyorsun, neden (en az iki gerekçe), ne gerekiyor, riski ne ve ne zamana kadar yanıt istiyorsun. Resmî hitap ve kapanış kullan. En az iki 'dass' cümlesi kullan.",
        checklist: [
          "Öneri tek cümlede net mi?",
          "En az iki gerekçe var mı?",
          "Gereken kaynak ya da izin söylenmiş mi?",
          "Bir risk dürüstçe adlandırılmış mı?",
          "En az iki 'dass' cümlesi var mı ve 'das' ile karışmamış mı?",
        ],
        minWords: 70,
        sample:
          "Sehr geehrte Frau Berger,\n\n" +
          "ich schlage vor, dass ich das kleine Projekt im Herbst selbst " +
          "leite.\n\n" +
          "Dafür sprechen zwei Gründe. Erstens kenne ich die Kunden seit " +
          "drei Jahren. Zweitens habe ich von der Mitarbeiterin dort " +
          "gehört, dass sie gern mit mir arbeitet. Das Projekt, das im " +
          "September beginnt, ist klein genug für einen ersten Versuch.\n\n" +
          "Ich brauche dafür keine neue Stelle. Nötig wären nur zwei Tage " +
          "im Monat, die ich aus der jetzigen Tätigkeit nehmen kann.\n\n" +
          "Ein Risiko will ich nicht verschweigen: wenn im Herbst mehrere " +
          "Aufträge gleichzeitig kommen, wird es eng. Deshalb teile ich " +
          "Ihnen bis Freitag einen Plan mit, der genau diesen Fall regelt.\n\n" +
          "Mit freundlichen Grüßen\nNuri Öz",
        phrases: [
          { de: "Ich schlage vor, dass …", tr: "… önerisinde bulunuyorum.", en: "I suggest that …" },
          { de: "Dafür sprechen zwei Gründe.", tr: "Bunun iki gerekçesi var.", en: "Two reasons speak for it." },
          { de: "Ein Risiko will ich nicht verschweigen.", tr: "Bir riski saklamak istemem.", en: "I don't want to hide one risk." },
        ],
      },
      {
        kind: "rewrite",
        prompt: "„dass“ ve „das“ ayrımını düzelt.",
        source: "Ich habe gehört, das du kommst, und dass Projekt beginnt im Herbst.",
        answer: "Ich habe gehört, dass du kommst, und das Projekt beginnt im Herbst.",
        why: "Türkçede ne bağlaç ne ilgi zamiri ayrı bir sözcüktür — ikisi de ektir — o yüzden yazıda ikisi karışıyor ve konuşurken fark duyulmaz. Almanca ayırır: dass BAĞLAÇTIR ve bir yan cümle açar (ich weiß, dass …); das ise ARTİKEL (das Projekt) ya da İLGİ ZAMİRİDİR (das Projekt, das beginnt). Kısa sınama: yerine 'welches' konabiliyorsa das, konamıyorsa dass.",
      },
    ],
  },
];
