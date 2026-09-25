import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 15.
 *
 * A2 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-a2.ts` (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 15 doğa hattı: koruma alanının girişindeki bilgi panosu, botanik
 * bahçesinde rehberin açılış konuşması, fırtınada devrilen ağacı orman
 * idaresine bildiren e-posta.
 * Söyleyiş odağı yabancı kökenli kelimelerde sona kayan vurgu (Natur, Musik,
 * Büro) — parti 5 ön ek ve birleşik kelime vurgusunu işledi; dil bilgisi orta
 * alanın sırası: zaman – sebep – tarz – yer (TeKaMoLo).
 */
export const deA2P15: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r15",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Willkommen in den Moorwiesen",
    genre: "info",
    intro: "Bir doğa koruma alanının girişindeki pano: hangi kurallar var, ne zaman neye dikkat edilmeli, rehberli yürüyüş ne zaman.",
    gloss: [
      { de: "die Wiese", tr: "çayır", en: "meadow" },
      { de: "der Vogel", tr: "kuş", en: "bird" },
      { de: "die Leine", tr: "tasma", en: "leash" },
      { de: "erlaubt", tr: "serbest", en: "allowed" },
      { de: "der Müll", tr: "çöp", en: "trash" },
      { de: "die Führung", tr: "rehberli tur", en: "guided tour" },
    ],
    minutes: 5,
    text:
      "Willkommen im Naturschutzgebiet Moorwiesen!\n\n" +
      "Hier leben über achtzig Arten von Vögeln und viele kleine Tiere. " +
      "Bitte beachten Sie deshalb diese Regeln:\n\n" +
      "Bleiben Sie auf den Wegen. Die Wiesen sind nass und manche Pflanzen wachsen nur hier.\n\n" +
      "Von März bis Juli bekommen die Vögel ihre Jungen. In dieser Zeit müssen Hunde an der Leine bleiben.\n\n" +
      "Feuer, Grillen und Zelten sind verboten. Radfahren ist nur auf dem breiten Weg am See erlaubt.\n\n" +
      "Bitte nehmen Sie Ihren Müll wieder mit. Im ganzen Gebiet gibt es keine Mülleimer.\n\n" +
      "Vom Turm am Nordufer sehen Sie das ganze Gebiet. Er ist von April bis Oktober jeden Tag " +
      "von 8 bis 20 Uhr geöffnet.\n\n" +
      "Jeden ersten Sonntag im Monat gibt es um 10 Uhr eine kostenlose Führung. " +
      "Treffpunkt ist der Parkplatz am Eingang.\n\n" +
      "Vielen Dank für Ihre Hilfe!",
    questions: [
      {
        text: "Warum soll man auf den Wegen bleiben?",
        options: ["Es ist dort sehr dunkel.", "Die Wege sind ganz neu.", "Manche Pflanzen wachsen nur hier."],
        answer: 2,
        explain: "„Die Wiesen sind nass und manche Pflanzen wachsen nur hier.“",
      },
      {
        text: "Wann müssen Hunde an der Leine sein?",
        options: ["von März bis Juli", "das ganze Jahr", "nur am Wochenende"],
        answer: 0,
        explain: "Kuşların yavruladığı dönem: „Von März bis Juli … müssen Hunde an der Leine bleiben.“",
      },
      {
        kind: "truefalse",
        text: "Auf dem breiten Weg am See darf man Rad fahren.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Radfahren ist nur auf dem breiten Weg am See erlaubt.“",
      },
      {
        kind: "gapfill",
        text: "Der Turm ist von April bis ___ geöffnet.",
        options: [],
        answer: 0,
        accept: ["Oktober"],
        explain: "„Er ist von April bis Oktober jeden Tag … geöffnet.“",
      },
      {
        kind: "short_answer",
        text: "Wo beginnt die Führung?",
        options: [],
        answer: 0,
        accept: ["am Parkplatz am Eingang", "am Parkplatz", "Parkplatz"],
        explain: "„Treffpunkt ist der Parkplatz am Eingang.“",
      },
      {
        text: "Was soll man mit seinem Müll machen?",
        options: ["in den Mülleimer am Turm werfen", "wieder mitnehmen", "am Eingang abgeben"],
        answer: 1,
        explain: "Alanda hiç çöp kovası yok: „Bitte nehmen Sie Ihren Müll wieder mit.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l15",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Führung im Botanischen Garten",
    genre: "monologue",
    intro: "Botanik bahçesinde rehber turu başlatıyor: tur ne kadar sürecek, sera nasıl, nelere dokunulmaz, fotoğraf kuralı ne.",
    gloss: [
      { de: "die Pflanze", tr: "bitki", en: "plant" },
      { de: "das Blatt", tr: "yaprak", en: "leaf" },
      { de: "anfassen", tr: "dokunmak", en: "to touch" },
      { de: "giftig", tr: "zehirli", en: "poisonous" },
      { de: "der Blitz", tr: "flaş", en: "flash" },
      { de: "der Ausgang", tr: "çıkış", en: "exit" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Herr Lorenz", text: "Herzlich willkommen im Botanischen Garten! Mein Name ist Paul Lorenz, und ich begleite Sie heute eine Stunde lang." },
      { speaker: "Herr Lorenz", text: "Wir beginnen hier im großen Glashaus. Drinnen sind es fast dreißig Grad, Sie können also gern die Jacke ausziehen." },
      { speaker: "Herr Lorenz", text: "Die Pflanzen hier kommen aus dem Regenwald. Diese Palme ist über hundert Jahre alt und fast zwanzig Meter hoch." },
      { speaker: "Herr Lorenz", text: "Bitte fassen Sie die Blätter nicht an. Manche Pflanzen sind giftig, und den anderen tut es auch nicht gut." },
      { speaker: "Herr Lorenz", text: "Danach gehen wir nach draußen in den Kräutergarten. Dort dürfen Sie gern riechen und auch mal ein Blatt probieren." },
      { speaker: "Herr Lorenz", text: "Unser Café ist heute leider geschlossen, weil die Küche kaputt ist. Am Ausgang gibt es aber einen Automaten mit Getränken." },
      { speaker: "Herr Lorenz", text: "Fotos sind überall erlaubt, nur bitte ohne Blitz. So, und jetzt kommen Sie bitte mit!" },
    ],
    questions: [
      {
        text: "Wie lange dauert die Führung?",
        options: ["eine Stunde", "eine halbe Stunde", "zwei Stunden"],
        answer: 0,
        explain: "„ich begleite Sie heute eine Stunde lang“.",
      },
      {
        text: "Was sagt Herr Lorenz über das Glashaus?",
        options: ["Es ist heute geschlossen.", "Dort darf man nicht fotografieren.", "Dort ist es sehr warm."],
        answer: 2,
        explain: "„Drinnen sind es fast dreißig Grad“ — ceketi çıkarmayı öneriyor.",
      },
      {
        kind: "truefalse",
        text: "Im Glashaus darf man die Blätter anfassen.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Bitte fassen Sie die Blätter nicht an.“ Yaprak tatmak yalnız dışarıdaki bitki bahçesinde serbest.",
      },
      {
        kind: "gapfill",
        text: "Die Palme ist über ___ Jahre alt.",
        options: [],
        answer: 0,
        accept: ["hundert", "100"],
        explain: "„Diese Palme ist über hundert Jahre alt.“",
      },
      {
        kind: "short_answer",
        text: "Wo gibt es heute Getränke?",
        options: [],
        answer: 0,
        accept: ["am Ausgang", "am Automaten", "an einem Automaten am Ausgang", "an einem Automaten", "am Automaten am Ausgang"],
        explain: "Kafe kapalı; „Am Ausgang gibt es aber einen Automaten mit Getränken.“",
      },
      {
        text: "Was ist beim Fotografieren nicht erlaubt?",
        options: ["Fotos im Kräutergarten", "Fotos mit Blitz", "Fotos von der Palme"],
        answer: 1,
        explain: "„Fotos sind überall erlaubt, nur bitte ohne Blitz.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w15",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Ein Baum liegt auf dem Weg",
    genre: "formal",
    intro: "Fırtınadan sonra ormandaki bir yürüyüş yolunu bir ağaç kapatmış: önce iki cümle kur, sonra orman idaresine durumu bildiren kısa bir e-posta yaz.",
    gloss: [
      { de: "der Sturm", tr: "fırtına", en: "storm" },
      { de: "der Ast", tr: "dal", en: "branch" },
      { de: "der Wanderweg", tr: "yürüyüş yolu", en: "hiking trail" },
      { de: "gefährlich", tr: "tehlikeli", en: "dangerous" },
      { de: "das Schild", tr: "tabela", en: "sign" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bu sabah köpeğimle ormanda yürüyüşe çıktım.",
        answer: "Ich bin heute Morgen mit meinem Hund im Wald spazieren gegangen.",
        alternatives: ["Heute Morgen bin ich mit meinem Hund im Wald spazieren gegangen."],
        hint: "Orta alanda sıra zaman – tarz – yer: heute Morgen, mit meinem Hund, im Wald. Perfekt: bin … spazieren gegangen.",
      },
      {
        kind: "build",
        tr: "Fırtınadan beri orada yolun üstünde büyük bir ağaç yatıyor.",
        answer: "Seit dem Sturm liegt dort ein großer Baum auf dem Weg.",
        alternatives: ["Dort liegt seit dem Sturm ein großer Baum auf dem Weg."],
        hint: "„seit“ Dativ ister: seit dem Sturm. Zaman başa gelince fiil ikinci sırada; yer bilgisi (auf dem Weg) sonda durur.",
      },
      {
        kind: "free",
        prompt:
          "Hafta sonu şehir ormanında yürürken fırtınanın devirdiği bir ağaç gördün. Orman idaresine (Forstamt) yaz: ne zaman ve kiminle orada olduğunu söyle, yerin tam olarak neresi olduğunu tarif et, ne gördüğünü ve neden tehlikeli olduğunu anlat, ne rica ettiğini yaz.",
        checklist: [
          "Ne zaman ve kiminle orada olduğunu yaz",
          "Yerin tam olarak neresi olduğunu tarif et",
          "Ne gördüğünü ve neden tehlikeli olduğunu anlat",
          "Ne rica ettiğini yaz ve kibarca bitir",
        ],
        minWords: 55,
        phrases: [
          { de: "Ich war am … mit … im Wald.", tr: "… günü … ile ormandaydım.", en: "I was in the forest with … on …" },
          { de: "Der Baum liegt zwischen … und …", tr: "Ağaç … ile … arasında yatıyor.", en: "The tree is lying between … and …" },
          { de: "Man kommt nicht mehr vorbei.", tr: "Artık yanından geçilemiyor.", en: "You can't get past any more." },
          { de: "Das ist besonders für Kinder gefährlich.", tr: "Bu özellikle çocuklar için tehlikeli.", en: "This is especially dangerous for children." },
          { de: "Könnten Sie bitte bald …?", tr: "Lütfen yakında … yapabilir misiniz?", en: "Could you please … soon?" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich war am Sonntagmorgen mit meiner Tochter zu Fuß im Stadtwald. Auf dem Wanderweg zwischen dem Waldbad " +
          "und der alten Hütte liegt seit dem Sturm ein großer Baum. Man kommt nicht mehr vorbei und muss durch das " +
          "nasse Feld gehen. Außerdem hängt direkt über dem Weg ein dicker Ast. Er kann jederzeit herunterfallen. " +
          "Das ist besonders für Kinder und ältere Leute gefährlich, denn am Wochenende sind dort viele Familien unterwegs. " +
          "Könnten Sie den Weg bitte bald frei machen oder wenigstens ein Schild aufstellen? Ein Foto schicke ich Ihnen im Anhang.\n\n" +
          "Mit freundlichen Grüßen\nDeniz Kaya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s15",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "Natur, Musik, Büro",
    genre: "pronounce",
    intro: "Almanca kelimelerin çoğu ilk hecede vurgulanır; -ur, -ik, -ei, -tät, -ieren gibi yabancı kökenli sonlar ise vurguyu sona çeker. Altı cümlede iki kuralı yan yana kullan.",
    gloss: [
      { de: "die Natur", tr: "doğa", en: "nature" },
      { de: "die Bäckerei", tr: "fırın", en: "bakery" },
      { de: "die Universität", tr: "üniversite", en: "university" },
      { de: "das Büro", tr: "ofis", en: "office" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Die Natur hier ist wunderschön.",
        tr: "Buradaki doğa çok güzel.",
        hint: "na-TUUR: vurgu sonda ve u uzun. wunderschön ise yerli kelime: WUN-der-schön, vurgu başta.",
        confusions: [
          {
            heard: [],
            fix: "Natur'u baştan vurgulama; -ur sonu vurguyu kendine çeker.",
            expected: "Natur",
          },
        ],
      },
      {
        de: "Ich höre gern klassische Musik.",
        tr: "Klasik müzik dinlemeyi severim.",
        hint: "mu-SİİK: vurgu sonda, i uzun. klassische ise KLAS-si-sche, vurgu başta.",
        confusions: [
          {
            heard: [],
            fix: "İki kelimenin vurgusu farklı yerde: klassische başta, Musik sonda.",
            expected: "Musik",
          },
        ],
      },
      {
        de: "Die Bäckerei öffnet um sechs.",
        tr: "Fırın altıda açılıyor.",
        hint: "bä-cke-RAY: -ei sonu hep vurgulu. öffnet ise yerli fiil: ÖFF-net.",
        confusions: [
          {
            heard: [],
            fix: "-ei ile biten isimlerde vurgu son hecededir; ilk heceye yüklenme.",
            expected: "Bäckerei",
          },
        ],
      },
      {
        de: "Sie studiert an der Universität.",
        tr: "Üniversitede okuyor.",
        hint: "stu-DİİRT ve u-ni-ver-si-TÄÄT: iki kelimede de vurgu en sonda, ondan önceki heceler kısa.",
        confusions: [
          {
            heard: [],
            fix: "Uzun kelimede bütün heceleri eşit söyleme; öndekiler hafif, -tät güçlü ve uzun.",
            expected: "Universität",
          },
        ],
      },
      {
        de: "Der Student wohnt im Zentrum.",
        tr: "Öğrenci merkezde oturuyor.",
        hint: "stu-DENT: -ent sonu vurgulu. Zentrum ise ZENT-rum, vurgu başta.",
        confusions: [
          {
            heard: [],
            fix: "Student ile Zentrum'un vurgusu ters yerde; ikisini aynı kalıpla okuma.",
            expected: "Student",
          },
        ],
      },
      {
        de: "Mein Büro ist im dritten Stock.",
        tr: "Ofisim üçüncü katta.",
        hint: "bü-ROO: vurgu ve uzunluk sondaki o'da. dritten ise DRİT-ten.",
        confusions: [
          {
            heard: [],
            fix: "Büro Fransızcadan gelir ve sonda vurgulanır; BÜ-ro dersen yerli kelime gibi duyulur.",
            expected: "Büro",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g15",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "morgen mit dem Zug nach Berlin",
    genre: "grammar",
    intro: "Cümlenin ortasında birden çok bilgi varsa Almancanın bir sırası var: önce ne zaman, sonra neden, sonra nasıl, en sonda nereye.",
    focus: "Orta alan sırası: zaman – sebep – tarz – yer (TeKaMoLo)",
    gloss: [
      { de: "morgen", tr: "yarın", en: "tomorrow" },
      { de: "der Zug", tr: "tren", en: "train" },
      { de: "zu Fuß", tr: "yürüyerek", en: "on foot" },
      { de: "wegen", tr: "yüzünden", en: "because of" },
      { de: "allein", tr: "yalnız", en: "alone" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Zaman önce, yer en sonda",
        tr: "Fiil ile cümlenin sonu arasında birden fazla bilgi varsa sıra çoğunlukla sabittir: önce ZAMAN (wann?), en sonda YER (wo? wohin?). Türkçede „trenle yarın Berlin'e“ de denebilir; Almancada zaman öne geçer, yer sona kalır.",
        examples: [
          { de: "Ich fahre morgen nach Berlin.", tr: "Yarın Berlin'e gidiyorum.", note: "zaman – yer" },
          { de: "Wir bleiben am Wochenende zu Hause.", tr: "Hafta sonu evde kalıyoruz.", note: "zaman – yer" },
          { de: "Sie fährt jeden Tag mit dem Rad zur Arbeit.", tr: "Her gün bisikletle işe gidiyor.", note: "zaman – tarz – yer" },
        ],
      },
      {
        heading: "Dört bilgi: TeKaMoLo",
        tr: "Sıranın adı TeKaMoLo: temporal (wann?), kausal (warum?), modal (wie?), lokal (wo? wohin?). Sebep bilgisi çoğunlukla „wegen …“ ile gelir: wegen des Regens. Hepsi bir cümlede nadiren bulunur; ama hangileri varsa bu sırayla gelir.",
        examples: [
          { de: "Ich fahre heute wegen des Regens mit dem Bus zur Arbeit.", tr: "Bugün yağmur yüzünden otobüsle işe gidiyorum.", note: "Te – Ka – Mo – Lo" },
          { de: "Wir gehen am Abend zu Fuß nach Hause.", tr: "Akşam eve yürüyerek gidiyoruz.", note: "Te – Mo – Lo" },
          { de: "Sie ist gestern allein ins Kino gegangen.", tr: "Dün tek başına sinemaya gitti.", note: "Perfekt'te de aynı sıra" },
        ],
      },
      {
        heading: "Biri başa geçerse",
        tr: "Vurgulamak istediğin bilgiyi cümlenin başına alabilirsin. Fiil yine ikinci sırada kalır, özne fiilin arkasına geçer; geride kalan bilgiler aynı sırayı korur.",
        examples: [
          { de: "Morgen fahre ich mit dem Zug nach Berlin.", tr: "Yarın trenle Berlin'e gidiyorum.", note: "zaman başta" },
          { de: "Mit dem Zug fahre ich morgen nach Berlin.", tr: "Berlin'e yarın trenle gidiyorum.", note: "tarz başta, zaman – yer korunur" },
          { de: "Am Abend gehen wir zu Fuß nach Hause.", tr: "Akşam eve yürüyerek gidiyoruz.", note: "fiil yine ikinci" },
        ],
      },
    ],
    questions: [
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Ich fahre nach Berlin morgen mit dem Zug.",
          "Ich fahre morgen mit dem Zug nach Berlin.",
          "Ich fahre mit dem Zug nach Berlin morgen.",
        ],
        answer: 1,
        explain: "Önce zaman (morgen), sonra tarz (mit dem Zug), en sonda yer (nach Berlin).",
      },
      {
        text: "Sie fährt ___.",
        options: ["jeden Tag mit dem Rad zur Arbeit", "zur Arbeit jeden Tag mit dem Rad", "mit dem Rad zur Arbeit jeden Tag"],
        answer: 0,
        explain: "Önce zaman (jeden Tag), sonra tarz (mit dem Rad), en sonda yer (zur Arbeit).",
      },
      {
        text: "Wir gehen ___.",
        options: ["nach Hause zu Fuß am Abend", "nach Hause am Abend zu Fuß", "am Abend zu Fuß nach Hause"],
        answer: 2,
        explain: "Te – Mo – Lo: am Abend – zu Fuß – nach Hause.",
      },
      {
        kind: "gapfill",
        text: "„mit dem Zug“ → ___? (wann / warum / wie / wohin)",
        options: [],
        answer: 0,
        accept: ["wie"],
        explain: "„mit dem Zug“ nasıl gidildiğini söyler: modal bilgi, soru sözcüğü wie.",
      },
      {
        kind: "gapfill",
        text: "„am Wochenende“ → ___? (wann / warum / wie / wohin)",
        options: [],
        answer: 0,
        accept: ["wann"],
        explain: "„am Wochenende“ zamanı söyler: temporal bilgi, soru sözcüğü wann.",
      },
      {
        kind: "gapfill",
        text: "„ins Kino“ → ___? (wann / warum / wie / wohin)",
        options: [],
        answer: 0,
        accept: ["wohin"],
        explain: "„ins Kino“ yönü söyler: lokal bilgi, soru sözcüğü wohin; sıranın en sonuna gider.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wir", "fahren", "am Samstag", "mit dem Auto", "ans Meer"],
        explain: "Fiil ikinci sırada; sonra zaman (am Samstag), tarz (mit dem Auto), yer (ans Meer).",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Er", "ist", "gestern", "mit dem Taxi", "nach Hause", "gefahren"],
        explain: "Zaman – tarz – yer, ortaç en sonda: gestern mit dem Taxi nach Hause gefahren.",
      },
      {
        kind: "truefalse",
        text: "„Ich gehe heute zu Fuß in die Stadt.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Zaman (heute) – tarz (zu Fuß) – yer (in die Stadt). Cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Wir fahren nach Hamburg morgen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Zaman yerden önce gelir: „Wir fahren morgen nach Hamburg.“",
      },
    ],
  },
];
