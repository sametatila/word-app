import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 13.
 *
 * B1 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 13 meslek değiştirme hattı: muhasebecilikten fırıncılığa geçen birinin
 * portresi, radyoda "mesleğini yeniden seçer miydin" sokak anketi, meslek
 * değiştirmek isteyen birine forumda cevap. Dil bilgisi ikili bağlaçlar —
 * entweder … oder, sowohl … als auch, weder … noch, nicht nur … sondern auch.
 */
export const deB1P13: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r13",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Vom Schreibtisch in die Backstube",
    genre: "profile",
    intro: "Bir portre yazısı: masa başı işini bırakıp fırıncı olan kırk iki yaşındaki biri neden değişti, bedeli ne oldu, bugün ne diyor.",
    gloss: [
      { de: "die Backstube", tr: "fırın atölyesi", en: "bakehouse" },
      { de: "der Buchhalter", tr: "muhasebeci", en: "accountant" },
      { de: "verkürzen", tr: "kısaltmak", en: "to shorten" },
      { de: "das Gehalt", tr: "maaş", en: "salary" },
      { de: "verzichten", tr: "vazgeçmek", en: "to do without" },
      { de: "zuverlässig", tr: "güvenilir", en: "reliable" },
    ],
    minutes: 6,
    text:
      "Vom Schreibtisch in die Backstube\n\n" +
      "Um halb vier Uhr morgens ist es in der Bäckerei Sommer noch dunkel, nur hinten in der Backstube " +
      "brennt Licht. Dort steht Markus Feld, zweiundvierzig, und formt Brötchen. Bis vor zwei Jahren war " +
      "er Buchhalter bei einer Versicherung.\n\n" +
      "„Ich hatte weder Probleme mit dem Chef noch mit dem Geld“, sagt er. „Ich hatte nur das Gefühl, " +
      "dass am Abend nichts da ist, was ich gemacht habe.“ Beim Backen ist das anders: Nach acht Stunden " +
      "liegen dreihundert Brote im Regal.\n\n" +
      "Leicht war der Weg nicht. Die Ausbildung dauert normalerweise drei Jahre; weil Feld schon einen " +
      "Beruf hatte, durfte er sie auf zwei Jahre verkürzen. Sein Gehalt ist in dieser Zeit auf ein " +
      "Drittel gefallen. Die Familie hat zwei Jahre lang auf Urlaub verzichtet.\n\n" +
      "Am schwersten war nicht die Arbeit, sondern der neue Rhythmus. „Ich gehe jetzt um acht ins Bett, " +
      "meine Kinder um halb neun. Das ist komisch, aber wir haben uns daran gewöhnt.“\n\n" +
      "Ob er es noch einmal machen würde? „Sofort. Aber ich würde vorher ein Praktikum machen, nicht nur " +
      "zwei Probetage wie ich.“ Seine Chefin Heike Sommer ist froh: Sie sucht seit Jahren Leute, die " +
      "sowohl zuverlässig als auch geduldig sind.",
    questions: [
      {
        text: "Warum hat Markus Feld den Beruf gewechselt?",
        options: [
          "Er hatte Streit mit seinem Chef.",
          "Er wollte am Abend ein Ergebnis sehen.",
          "Er hat bei der Versicherung zu wenig verdient.",
        ],
        answer: 1,
        explain: "„… dass am Abend nichts da ist, was ich gemacht habe.“ Şefle ve parayla sorunu yokmuş.",
      },
      {
        text: "Wie lange hat seine Ausbildung gedauert?",
        options: ["zwei Jahre", "drei Jahre", "ein Jahr"],
        answer: 0,
        explain: "Normalde üç yıl, ama zaten bir mesleği olduğu için iki yıla kısaltabilmiş.",
      },
      {
        kind: "truefalse",
        text: "Während der Ausbildung hat Feld deutlich weniger verdient als vorher.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Sein Gehalt ist in dieser Zeit auf ein Drittel gefallen.“",
      },
      {
        kind: "gapfill",
        text: "Sein Gehalt ist in der Ausbildung auf ein ___ gefallen.",
        options: [],
        answer: 0,
        accept: ["Drittel"],
        explain: "Maaşı üçte birine düşmüş: „auf ein Drittel gefallen“.",
      },
      {
        kind: "short_answer",
        text: "Was würde Feld heute vor dem Wechsel machen?",
        options: [],
        answer: 0,
        accept: ["ein Praktikum", "ein Praktikum machen", "Praktikum", "vorher ein Praktikum machen", "ein Praktikum vorher"],
        explain: "„Aber ich würde vorher ein Praktikum machen, nicht nur zwei Probetage wie ich.“",
      },
      {
        text: "Welche Leute sucht Frau Sommer seit Jahren?",
        options: [
          "Leute, die gern nachts arbeiten",
          "Leute mit einer Ausbildung als Buchhalter",
          "Leute, die zuverlässig und geduldig sind",
        ],
        answer: 2,
        explain: "Son cümle: „die sowohl zuverlässig als auch geduldig sind“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l13",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Umfrage: Noch einmal derselbe Beruf?",
    genre: "report",
    intro: "Radyoda bir sokak anketi: dört kişi mesleğini yeniden seçip seçmeyeceğini ve nedenini söylüyor.",
    gloss: [
      { de: "der Schichtdienst", tr: "vardiyalı çalışma", en: "shift work" },
      { de: "der Fahrgast", tr: "yolcu", en: "passenger" },
      { de: "die Entscheidung", tr: "karar", en: "decision" },
      { de: "die Verwaltung", tr: "idari işler", en: "administration" },
      { de: "auffällig", tr: "dikkat çekici", en: "striking" },
      { de: "die Sendung", tr: "program", en: "programme" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Reporter", text: "Unsere Frage heute auf dem Marktplatz: Würden Sie Ihren Beruf noch einmal wählen? Wir haben vier Menschen gefragt." },
      { speaker: "Frau Ünal", text: "Ich bin seit fünfzehn Jahren Krankenpflegerin. Ja, ich würde es wieder machen, aber nicht wieder im Schichtdienst. Die Nächte haben mich mehr gekostet, als ich damals dachte." },
      { speaker: "Herr Petrov", text: "Busfahrer, seit zweiundzwanzig Jahren. Ehrlich gesagt: nein. Nicht wegen der Fahrgäste, sondern wegen des Verkehrs. Für dieselbe Linie brauche ich heute zwanzig Minuten länger als früher." },
      { speaker: "Frau Barth", text: "Ich habe Jura studiert, weil meine Eltern das wollten, und arbeite jetzt als Tischlerin. Beide Entscheidungen würde ich wieder treffen. Ohne das Studium wüsste ich nicht so genau, was ich nicht will." },
      { speaker: "Herr Kunze", text: "Lehrer an einer Grundschule. Sowohl ja als auch nein. Die Kinder sind großartig, aber die Verwaltung frisst die Hälfte meiner Zeit." },
      { speaker: "Reporter", text: "Zweimal ja, einmal nein, einmal beides. Auffällig ist: Niemand hat über das Geld gesprochen, aber alle über die Zeit." },
      { speaker: "Reporter", text: "Und Sie? Schreiben Sie uns bis Freitag. Ihre Antworten lesen wir in der Sendung am Montag vor." },
    ],
    questions: [
      {
        text: "Was möchte Frau Ünal nicht noch einmal erleben?",
        options: ["die Arbeit mit Patienten", "den Schichtdienst mit den Nächten", "die lange Ausbildung"],
        answer: 1,
        explain: "Mesleği yine seçer „aber nicht wieder im Schichtdienst“ — geceler ona pahalıya patlamış.",
      },
      {
        text: "Warum würde Herr Petrov nicht wieder Busfahrer werden?",
        options: ["wegen des Verkehrs", "wegen der Fahrgäste", "wegen des Gehalts"],
        answer: 0,
        explain: "„Nicht wegen der Fahrgäste, sondern wegen des Verkehrs.“",
      },
      {
        kind: "truefalse",
        text: "Frau Barth hält ihr Studium im Rückblick nicht für verlorene Zeit.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Beide Entscheidungen würde ich wieder treffen“ — üniversite ona ne istemediğini göstermiş.",
      },
      {
        kind: "gapfill",
        text: "Die Verwaltung kostet Herrn Kunze die ___ seiner Zeit.",
        options: [],
        answer: 0,
        accept: ["Hälfte"],
        explain: "„aber die Verwaltung frisst die Hälfte meiner Zeit“.",
      },
      {
        kind: "short_answer",
        text: "Worüber hat keiner der vier gesprochen?",
        options: [],
        answer: 0,
        accept: ["über das Geld", "das Geld", "Geld", "übers Geld"],
        explain: "„Niemand hat über das Geld gesprochen, aber alle über die Zeit.“",
      },
      {
        text: "Bis wann sollen die Hörer schreiben?",
        options: ["bis Montag", "bis morgen früh", "bis Freitag"],
        answer: 2,
        explain: "„Schreiben Sie uns bis Freitag“; cevaplar pazartesi programında okunacak.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w13",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Antwort im Forum: Mit 45 noch umschulen?",
    genre: "forum",
    intro: "Bir forumda biri kırk beş yaşında meslek değiştirmek istediğini yazıyor: önce iki cümle kur, sonra deneyime dayanan dengeli bir cevap yaz.",
    gloss: [
      { de: "die Umschulung", tr: "meslek değiştirme eğitimi", en: "retraining" },
      { de: "das Praktikum", tr: "staj", en: "internship" },
      { de: "unterschätzen", tr: "hafife almak", en: "to underestimate" },
      { de: "die Rücklage", tr: "birikim", en: "savings" },
      { de: "erfahren", tr: "deneyimli", en: "experienced" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Ya şimdi yaparsın ya da hiç yapmazsın.",
        answer: "Entweder du machst es jetzt, oder du machst es nie.",
        alternatives: ["Entweder machst du es jetzt, oder du machst es nie."],
        hint: "„entweder“ başta iken hem „du machst“ hem „machst du“ doğrudur; „oder“ ise söz dizimini değiştirmez.",
      },
      {
        kind: "build",
        tr: "Hem aileni hem bankanı erkenden bilgilendirmelisin.",
        answer: "Du solltest sowohl deine Familie als auch deine Bank früh informieren.",
        alternatives: ["Du solltest früh sowohl deine Familie als auch deine Bank informieren."],
        hint: "„sowohl … als auch“ iki öğeyi birlikte bağlar; mastar yine cümlenin sonunda kalır.",
      },
      {
        kind: "free",
        prompt:
          "Sabine'ye forumda cevap yaz: kendi deneyimini ya da tanıdığın birinin deneyimini kısaca anlat, iki pratik öneri ver, dikkat etmesi gereken bir riski söyle ve cesaret veren bir cümleyle bitir.",
        stimulus:
          "Hallo zusammen, ich bin 45 und arbeite seit zwanzig Jahren im Einkauf einer großen Firma. " +
          "Seit Langem möchte ich Erzieherin werden. Meine Familie meint, dass ich dafür zu alt bin " +
          "und dass wir das Geld brauchen. Hat jemand von euch so etwas gemacht? Was muss ich bedenken?\n" +
          "— Sabine_K",
        checklist: [
          "Kendi ya da tanıdığın birinin deneyimini anlat",
          "İki somut öneri ver",
          "Bir riski dürüstçe söyle",
          "Cesaret veren bir cümleyle bitir",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich kann dich gut verstehen, denn …", tr: "Seni çok iyi anlıyorum çünkü …", en: "I can understand you well, because …" },
          { de: "Bei mir war es so, dass …", tr: "Bende durum şöyleydi: …", en: "In my case it was like this: …" },
          { de: "Ich würde dir raten, zuerst …", tr: "Sana önce … yapmanı tavsiye ederim", en: "I would advise you to first …" },
          { de: "Unterschätze aber nicht, dass …", tr: "Ama … olduğunu hafife alma", en: "But don't underestimate that …" },
          { de: "Du bist nicht zu alt, sondern …", tr: "Yaşlı değilsin, aksine …", en: "You are not too old, but rather …" },
        ],
        sample:
          "Hallo Sabine,\n\nich kann dich gut verstehen, denn ich habe mit 47 eine Umschulung zur " +
          "Altenpflegerin gemacht. Bei mir war es so, dass ich zwölf Jahre im Büro gearbeitet hatte und " +
          "abends nur noch müde und leer war. Ich würde dir raten, zuerst ein Praktikum in einer Kita zu " +
          "machen, am besten zwei Wochen in deinem Urlaub. Dann weißt du, ob dir der Lärm und das Tempo " +
          "wirklich gefallen. Außerdem solltest du sowohl deine Familie als auch deine Bank früh informieren " +
          "und eine Rücklage für ein Jahr planen. Unterschätze aber nicht, dass der Beruf auch den " +
          "Körper fordert: Man sitzt viel auf kleinen Stühlen und hebt Kinder hoch. Du bist nicht zu alt, " +
          "sondern erfahren. Entweder du probierst es jetzt, oder du ärgerst dich mit sechzig darüber.\n\n" +
          "Viele Grüße\nAyla",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s13",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Leidenschaft oder Sicherheit im Beruf?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: iki değer arasında seçim yap ve ikisini birleştirmenin yolunu söyle.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Meslek seçerken tutku mu yoksa güvence mi daha önemli? Görüşünü söyle, kendinden ya da tanıdığın birinden bir örnek ver ve iki değerin nasıl birleştirilebileceğini anlat.",
      bulletsTr: [
        "Tercihini tek cümleyle söyle",
        "Bir örnek anlat",
        "Öteki tarafın haklı olduğu bir noktayı kabul et",
        "İkisini birleştirmenin bir yolunu öner",
      ],
      targets: [
        { de: "Wenn ich mich entscheiden müsste, würde ich … wählen.", tr: "Seçmek zorunda kalsam …'i seçerdim." },
        { de: "Das beste Beispiel dafür ist …", tr: "Bunun en iyi örneği …" },
        { de: "Man muss allerdings zugeben, dass …", tr: "Ama şunu kabul etmek gerekir: …" },
        { de: "Weder … noch … reicht allein.", tr: "Ne … ne de … tek başına yeter." },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Wenn ich mich entscheiden müsste, würde ich die Sicherheit wählen, aber nur als Anfang. " +
        "Das beste Beispiel dafür ist meine Cousine. Sie wollte immer Musikerin werden und hat mit zwanzig " +
        "alles auf diese eine Karte gesetzt. Nach fünf Jahren hatte sie Schulden und keine Freude mehr an " +
        "der Musik, weil jedes Konzert Geld bringen musste. Man muss allerdings zugeben, dass ein sicherer " +
        "Job ohne Interesse auch krank machen kann; mein Vater hat dreißig Jahre in einem Beruf gearbeitet, " +
        "über den er zu Hause nie gesprochen hat. Meiner Meinung nach reicht weder die Leidenschaft noch " +
        "die Sicherheit allein. Man kann zum Beispiel sowohl eine solide Ausbildung machen als auch die " +
        "Leidenschaft am Wochenende pflegen, bis sie stark genug ist, um mehr daraus zu machen.",
      rubricHint:
        "Somut bir örnek ve iki tarafın dengesi beklenir; „weder … noch“, „sowohl … als auch“ ve Konjunktiv II („müsste“, „würde“) kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g13",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "entweder … oder, weder … noch",
    genre: "grammar",
    intro: "İki şeyi birlikte, seçenek olarak ya da ikisini birden olumsuz söylemek için Almancada iki parçalı bağlaçlar vardır.",
    focus: "İkili bağlaçlar: entweder … oder, sowohl … als auch, weder … noch, nicht nur … sondern auch",
    gloss: [
      { de: "die Ausbildung", tr: "meslek eğitimi", en: "vocational training" },
      { de: "das Studium", tr: "üniversite eğitimi", en: "studies" },
      { de: "verdienen", tr: "para kazanmak", en: "to earn" },
      { de: "die Stelle", tr: "pozisyon", en: "position" },
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Ya … ya da: entweder … oder",
        tr: "„entweder … oder“ iki seçenekten yalnız birinin olacağını söyler. „entweder“ cümle başındaysa iki sıra da doğrudur: fiil hemen arkasından gelebilir ya da önce özne gelebilir. „oder“ ise hiçbir zaman söz dizimini değiştirmez.",
        examples: [
          { de: "Entweder mache ich eine Ausbildung, oder ich studiere.", tr: "Ya mesleki eğitim alırım ya da üniversite okurum.", note: "entweder + fiil" },
          { de: "Wir treffen uns entweder am Montag oder am Dienstag.", tr: "Ya pazartesi ya salı buluşuruz.", note: "cümlenin içinde" },
          { de: "Entweder du kommst mit, oder du bleibst hier.", tr: "Ya benimle gelirsin ya da burada kalırsın.", note: "entweder + özne de olur" },
        ],
      },
      {
        heading: "Hem … hem de: sowohl … als auch, nicht nur … sondern auch",
        tr: "„sowohl … als auch“ iki öğeyi eşit ağırlıkla toplar. „nicht nur … sondern auch“ ikinci öğeyi vurgular: beklenenden fazlası vardır. İkisi de cümle öğelerinin arasında durur, fiilin yeri değişmez.",
        examples: [
          { de: "Sie spricht sowohl Deutsch als auch Türkisch.", tr: "Hem Almanca hem Türkçe konuşuyor.", note: "eşit ağırlık" },
          { de: "Er hat nicht nur studiert, sondern auch gearbeitet.", tr: "Yalnızca okumadı, çalıştı da.", note: "ikinci öğe vurgulu" },
          { de: "Die Stelle bringt sowohl Erfahrung als auch ein gutes Gehalt.", tr: "Bu iş hem deneyim hem iyi bir maaş getiriyor.", note: "iki özne değil, iki nesne" },
        ],
      },
      {
        heading: "Ne … ne de: weder … noch",
        tr: "„weder … noch“ iki öğeyi birden olumsuzlar; cümlede ayrıca „nicht“ ya da „kein“ kullanılmaz. Türkçedeki „ne … ne de“ yapısında olduğu gibi fiil olumlu biçimde kalır.",
        examples: [
          { de: "Ich habe weder Zeit noch Geld.", tr: "Ne vaktim var ne de param.", note: "kein yok" },
          { de: "Er verdient weder viel, noch arbeitet er gern dort.", tr: "Ne çok kazanıyor ne de orada severek çalışıyor.", note: "noch + fiil" },
          { de: "Weder die Ausbildung noch das Studium passt zu mir.", tr: "Ne mesleki eğitim ne de üniversite bana uyuyor.", note: "fiil olumlu" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich habe ___ Zeit noch Geld.",
        options: ["weder", "entweder", "sowohl"],
        answer: 0,
        explain: "„noch“ ile çift olan bağlaç weder'dir: ne … ne de.",
      },
      {
        text: "Sie spricht sowohl Deutsch ___ Türkisch.",
        options: ["oder", "als auch", "noch"],
        answer: 1,
        explain: "„sowohl“un ikinci parçası her zaman „als auch“tur.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Ich habe weder keine Zeit noch Geld.",
          "Ich habe entweder Zeit noch Geld.",
          "Ich habe weder Zeit noch Geld.",
        ],
        answer: 2,
        explain: "„weder … noch“ zaten olumsuzdur, yanına „kein“ gelmez; „entweder“ ise „oder“ ile çiftlenir.",
      },
      {
        kind: "gapfill",
        text: "___ mache ich eine Ausbildung, oder ich studiere. (nur eine von zwei Möglichkeiten)",
        options: [],
        answer: 0,
        accept: ["Entweder", "entweder"],
        explain: "İki seçenekten biri: entweder … oder.",
      },
      {
        kind: "gapfill",
        text: "Er hat nicht nur studiert, ___ auch gearbeitet.",
        options: [],
        answer: 0,
        accept: ["sondern"],
        explain: "„nicht nur“un ikinci parçası „sondern auch“tur.",
      },
      {
        kind: "gapfill",
        text: "Wir treffen uns entweder am Montag ___ am Dienstag.",
        options: [],
        answer: 0,
        accept: ["oder"],
        explain: "„entweder“ her zaman „oder“ ile tamamlanır.",
      },
      {
        kind: "gapfill",
        text: "Weder die Ausbildung ___ das Studium passt zu mir.",
        options: [],
        answer: 0,
        accept: ["noch"],
        explain: "„weder“in ikinci parçası noch'tur.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Die Stelle", "bringt", "sowohl Erfahrung", "als auch", "ein gutes Gehalt"],
        explain: "Fiil ikinci sırada; iki parçalı bağlaç iki nesnenin arasına yerleşir.",
      },
      {
        kind: "truefalse",
        text: "„Sie hat weder angerufen noch geschrieben.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "İki eylem birden olumsuzlanıyor; ayrıca „nicht“ gerekmiyor.",
      },
      {
        kind: "truefalse",
        text: "„Entweder kommst du mit, oder bleibst du hier.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„oder“ söz dizimini değiştirmez; doğrusu „…, oder du bleibst hier“.",
      },
    ],
  },
];
