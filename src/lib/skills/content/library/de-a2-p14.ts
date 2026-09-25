import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 14.
 *
 * A2 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-a2.ts` (parti 1), son partiler `de-a2-p6.ts` … `de-a2-p10.ts` ve
 * `data/content/SPEC.md`.
 *
 * Parti 14 para hattı: üç aylık harcama defteri tutan birinin blogu, bisiklet
 * kiralama dükkânında fiyat ve depozito, eski ev sahibinden depozitoyu geri
 * isteyen e-posta. Söyleyiş odağı kısaltmalar (WG, LKW): harflerin Almanca
 * adları ve sondaki vurgu; dil bilgisi deshalb, darum ve deswegen — parti 6'daki
 * „weil“in tersi: sebep değil sonuç, fiil sona değil ikinci sıraya.
 */
export const deA2P14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r14",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Drei Monate Haushaltsbuch",
    genre: "blog",
    intro: "Bir blog yazısı: parasının nereye gittiğini bilmeyen biri üç ay boyunca her harcamasını yazıyor.",
    gloss: [
      { de: "das Konto", tr: "banka hesabı", en: "bank account" },
      { de: "ausgeben", tr: "harcamak", en: "to spend" },
      { de: "die Kleinigkeit", tr: "ufak şey", en: "small thing" },
      { de: "das Abo", tr: "abonelik", en: "subscription" },
      { de: "kündigen", tr: "iptal etmek", en: "to cancel" },
      { de: "übrig bleiben", tr: "artmak", en: "to be left over" },
    ],
    minutes: 5,
    text:
      "Im Januar war mein Konto wieder am 20. leer, und ich wusste nicht, wohin mein Geld geht. " +
      "Deshalb schreibe ich seit drei Monaten alles auf: jeden Kaffee, jede Busfahrt, jede Rechnung.\n\n" +
      "Das Ergebnis hat mich überrascht. Für Essen gebe ich gar nicht so viel aus, ich koche ja fast jeden Abend. " +
      "Aber für Kleinigkeiten unterwegs habe ich im Monat fast 140 Euro bezahlt: Kaffee zum Mitnehmen, " +
      "ein Brötchen am Bahnhof, hier eine Zeitschrift, da ein Eis.\n\n" +
      "Außerdem hatte ich noch drei Abos für Apps und Filme. Zwei davon habe ich seit Monaten nicht benutzt. " +
      "Ich habe sie sofort gekündigt.\n\n" +
      "Jetzt nehme ich meinen Kaffee von zu Hause mit und kaufe Brötchen beim Bäcker in meiner Straße, " +
      "dort sind sie billiger. Im März sind am Ende des Monats 180 Euro übrig geblieben.\n\n" +
      "Mein Tipp: Probiert es einen Monat lang aus. Ein Heft und ein Stift sind genug.\n\nJana",
    questions: [
      {
        text: "Warum schreibt Jana alles auf?",
        options: [
          "Sie wusste nicht, wohin ihr Geld geht.",
          "Ihre Bank hat es ihr geraten.",
          "Sie möchte ein Auto kaufen.",
        ],
        answer: 0,
        explain: "„ich wusste nicht, wohin mein Geld geht. Deshalb schreibe ich … alles auf“.",
      },
      {
        text: "Wofür hat Jana überraschend viel Geld ausgegeben?",
        options: ["für Essen zu Hause", "für die Miete", "für Kleinigkeiten unterwegs"],
        answer: 2,
        explain: "Yolda aldığı ufak şeylere ayda neredeyse 140 euro gitmiş; yemeğe fazla harcamıyor.",
      },
      {
        kind: "truefalse",
        text: "Jana hat alle drei Abos gekündigt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Yalnız aylardır kullanmadığı ikisini iptal etmiş: „Zwei davon … Ich habe sie sofort gekündigt.“",
      },
      {
        kind: "gapfill",
        text: "Im März sind am Ende des Monats ___ Euro übrig geblieben.",
        options: [],
        answer: 0,
        accept: ["180", "hundertachtzig"],
        explain: "„Im März sind am Ende des Monats 180 Euro übrig geblieben.“",
      },
      {
        kind: "short_answer",
        text: "Was braucht man laut Jana für ein Haushaltsbuch?",
        options: [],
        answer: 0,
        accept: ["ein Heft und einen Stift", "ein Heft und ein Stift", "Heft und Stift"],
        explain: "„Ein Heft und ein Stift sind genug.“",
      },
      {
        text: "Warum kauft Jana Brötchen jetzt in ihrer Straße?",
        options: ["Der Bahnhof ist zu weit weg.", "Dort sind sie billiger.", "Dort gibt es auch Kaffee."],
        answer: 1,
        explain: "„kaufe Brötchen beim Bäcker in meiner Straße, dort sind sie billiger“.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l14",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Im Fahrradverleih",
    genre: "dialogue",
    intro: "Hafta sonu için iki bisiklet kiralanıyor: fiyat, depozito, kask ve geri getirme saati konuşuluyor.",
    gloss: [
      { de: "mieten", tr: "kiralamak", en: "to rent" },
      { de: "die Kaution", tr: "depozito", en: "deposit" },
      { de: "der Helm", tr: "kask", en: "helmet" },
      { de: "das Schloss", tr: "kilit", en: "lock" },
      { de: "reservieren", tr: "rezervasyon yapmak", en: "to reserve" },
      { de: "zurückbringen", tr: "geri getirmek", en: "to bring back" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Kemal", text: "Hallo! Ich möchte für das Wochenende zwei Fahrräder mieten. Was kostet das?" },
      { speaker: "Frau Jansen", text: "Ein normales Rad kostet zwölf Euro am Tag. Von Freitag bis Sonntag sind es dreißig Euro." },
      { speaker: "Kemal", text: "Dreißig pro Rad, also sechzig. Haben Sie auch E-Bikes?" },
      { speaker: "Frau Jansen", text: "Leider sind schon alle weg. Am Wochenende sind sie immer schnell reserviert." },
      { speaker: "Kemal", text: "Schade. Dann nehmen wir zwei normale. Muss ich etwas dalassen?" },
      { speaker: "Frau Jansen", text: "Ja, hundert Euro Kaution pro Rad oder Ihren Ausweis. Das Geld bekommen Sie am Sonntag zurück." },
      { speaker: "Kemal", text: "Wir zahlen lieber die Kaution. Sind Helme dabei?" },
      { speaker: "Frau Jansen", text: "Ein Helm kostet zwei Euro extra, ein Schloss ist immer dabei. Bitte bringen Sie die Räder bis achtzehn Uhr zurück." },
      { speaker: "Kemal", text: "Und wenn wir später kommen?" },
      { speaker: "Frau Jansen", text: "Dann kostet es einen Tag mehr. Rufen Sie einfach an, wenn es ein Problem gibt." },
    ],
    questions: [
      {
        text: "Wie viel kostet ein normales Rad für das ganze Wochenende?",
        options: ["zwölf Euro", "dreißig Euro", "sechzig Euro"],
        answer: 1,
        explain: "„Von Freitag bis Sonntag sind es dreißig Euro“; altmış euro iki bisikletin toplamı.",
      },
      {
        text: "Warum nimmt Kemal keine E-Bikes?",
        options: ["Es gibt keine mehr.", "Sie sind zu teuer.", "Er fährt nicht gern damit."],
        answer: 0,
        explain: "„Leider sind schon alle weg.“",
      },
      {
        kind: "truefalse",
        text: "Für einen Helm muss man extra bezahlen.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Ein Helm kostet zwei Euro extra“; kilit ise her zaman dahil.",
      },
      {
        kind: "gapfill",
        text: "Die Kaution ist ___ Euro pro Rad.",
        options: [],
        answer: 0,
        accept: ["hundert", "100"],
        explain: "„hundert Euro Kaution pro Rad oder Ihren Ausweis“.",
      },
      {
        kind: "short_answer",
        text: "Bis wann muss Kemal die Räder zurückbringen?",
        options: [],
        answer: 0,
        accept: ["bis achtzehn Uhr", "bis 18 Uhr", "achtzehn Uhr", "18 Uhr"],
        explain: "„Bitte bringen Sie die Räder bis achtzehn Uhr zurück.“",
      },
      {
        text: "Was passiert, wenn Kemal zu spät kommt?",
        options: ["Er verliert die Kaution.", "Er muss nichts bezahlen.", "Er bezahlt einen Tag mehr."],
        answer: 2,
        explain: "„Dann kostet es einen Tag mehr.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w14",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Wo ist meine Kaution?",
    genre: "formal",
    intro: "Eski ev sahibin depozitonu hâlâ geri ödemedi: önce iki cümle kur, sonra kibar ama açık bir e-posta yaz.",
    gloss: [
      { de: "die Kaution", tr: "depozito", en: "deposit" },
      { de: "ausziehen", tr: "evden çıkmak", en: "to move out" },
      { de: "überweisen", tr: "havale etmek", en: "to transfer" },
      { de: "die Übergabe", tr: "teslim", en: "handover" },
      { de: "unterschreiben", tr: "imzalamak", en: "to sign" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "31 Mart'ta daireden çıktım.",
        answer: "Ich bin am 31. März ausgezogen.",
        alternatives: ["Am 31. März bin ich ausgezogen."],
        hint: "ausziehen yer değiştirmeyi anlatır: Perfekt'i sein ile, ortaç aus-ge-zogen.",
      },
      {
        kind: "build",
        tr: "Bu yüzden depozitomu geri istiyorum.",
        answer: "Deshalb möchte ich meine Kaution zurück.",
        alternatives: ["Ich möchte deshalb meine Kaution zurück."],
        hint: "„deshalb“ başa gelince çekimli fiil hemen arkasından gelir, özne ondan sonra.",
      },
      {
        kind: "free",
        prompt:
          "Eski dairenden üç ay önce çıktın ama ev sahibi depozitonu hâlâ geri ödemedi. Ev sahibi Herr Wolff'a yaz: ne zaman çıktığını ve teslimde dairenin durumunu söyle, depozitonun miktarını yaz, parayı ne zamana kadar beklediğini belirt ve hesap bilgini ver.",
        checklist: [
          "Ne zaman ve hangi adresten çıktığını yaz",
          "Teslimde dairenin durumunu anlat",
          "Depozitonun miktarını ve son tarihi yaz",
          "Hesap bilgini ver ve kibarca bitir",
        ],
        minWords: 55,
        phrases: [
          { de: "Ich bin am … ausgezogen.", tr: "… tarihinde evden çıktım.", en: "I moved out on …" },
          { de: "Bei der Übergabe war alles in Ordnung.", tr: "Teslimde her şey yolundaydı.", en: "Everything was fine at the handover." },
          { de: "Meine Kaution habe ich noch nicht bekommen.", tr: "Depozitomu henüz almadım.", en: "I have not received my deposit yet." },
          { de: "Bitte überweisen Sie das Geld bis zum …", tr: "Lütfen parayı …'a kadar havale edin.", en: "Please transfer the money by …" },
          { de: "Vielen Dank im Voraus.", tr: "Şimdiden çok teşekkürler.", en: "Thank you in advance." },
        ],
        sample:
          "Sehr geehrter Herr Wolff,\n\n" +
          "ich habe vier Jahre in Ihrer Wohnung in der Gartenstraße 12 gewohnt und bin am 31. März ausgezogen. " +
          "Bei der Übergabe haben wir die Wohnung zusammen angesehen. Alles war sauber und nichts war kaputt, " +
          "das haben Sie auch unterschrieben. Meine Kaution von 1.200 Euro habe ich aber bis heute nicht bekommen. " +
          "Deshalb schreibe ich Ihnen heute. Bitte überweisen Sie mir das Geld bis zum 15. Juli. " +
          "Ich habe jetzt ein neues Konto, die Nummer finden Sie unter meinem Namen.\n\n" +
          "Vielen Dank im Voraus.\n\n" +
          "Mit freundlichen Grüßen\nDeniz Arslan\nIBAN: DE00 1234 5678 9012 3456 78",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s14",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "WG, LKW, ICE",
    genre: "pronounce",
    intro: "Almanca kısaltmalar harf harf okunur: harflerin Almanca adlarıyla ve vurgu hep son harfte. Altı cümlede kısaltmaları doğru söyle.",
    gloss: [
      { de: "die WG", tr: "ortak ev", en: "shared flat" },
      { de: "der LKW", tr: "kamyon", en: "truck" },
      { de: "die SMS", tr: "kısa mesaj", en: "text message" },
      { de: "das Kabel", tr: "kablo", en: "cable" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ich wohne seit Mai in einer WG.",
        tr: "Mayıstan beri ortak bir evde oturuyorum.",
        hint: "WG: vee-GEE. W'nin Almanca adı „vee“, G'ninki „gee“; vurgu son harfte.",
        confusions: [
          {
            heard: [],
            fix: "Harfleri Türkçe adlarıyla okuma; Almanca adlarını söyle ve sondaki harfi daha güçlü vurgula.",
            expected: "WG",
          },
        ],
      },
      {
        de: "Der LKW steht vor der Tür.",
        tr: "Kamyon kapının önünde duruyor.",
        hint: "LKW: el-kaa-VEE. Üç harf; ilk ikisi hafif, üçüncüsü vurgulu.",
        confusions: [
          {
            heard: [],
            fix: "Vurgu ilk harfe kayarsa kısaltma zor tanınır; ses sona doğru güçlenir.",
            expected: "LKW",
          },
        ],
      },
      {
        de: "Mein Auto ist ein alter VW.",
        tr: "Arabam eski bir Volkswagen.",
        hint: "VW: fau-VEE. V'nin Almanca adı „fau“, f sesiyle başlar.",
        confusions: [
          {
            heard: ["WW"],
            fix: "V'yi Türkçe „ve“ diye okursan Almanca kulak W duyar; V'nin adı fau.",
            expected: "VW",
          },
        ],
      },
      {
        de: "Wir fahren mit dem ICE nach Köln.",
        tr: "Köln'e hızlı trenle gidiyoruz.",
        hint: "ICE: ii-tsee-EE. C'nin Almanca adı ts ile başlar: „tsee“.",
        confusions: [
          {
            heard: [],
            fix: "C'yi Türkçe „ce“ diye okuma; Almancada adı „tsee“ ve vurgu sondaki E'de.",
            expected: "ICE",
          },
        ],
      },
      {
        de: "Schick mir bitte eine SMS.",
        tr: "Bana lütfen bir kısa mesaj at.",
        hint: "SMS: es-em-ES. S'nin adı „es“, M'ninki „em“; son harf uzun ve güçlü.",
        confusions: [
          {
            heard: [],
            fix: "Üç harfi eşit söyleme; son harfte ses yükselir ve uzar.",
            expected: "SMS",
          },
        ],
      },
      {
        de: "Hast du ein Kabel für USB?",
        tr: "USB için bir kablon var mı?",
        hint: "USB: uu-es-BEE. U uzun „uu“, B'nin adı „bee“; vurgu yine sonda.",
        confusions: [
          {
            heard: [],
            fix: "Harf adlarındaki ünlüler uzundur: uu, bee; kısa söylersen harfler birbirine karışır.",
            expected: "USB",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g14",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "deshalb, darum, deswegen",
    genre: "grammar",
    intro: "„weil“ sebebi söyler ve fiili sona atar; „deshalb“ ise sonucu söyler ve fiili ikinci sırada tutar.",
    focus: "Sonuç bildiren zarflar: deshalb, darum, deswegen ve ardından gelen devrik sıra",
    gloss: [
      { de: "deshalb", tr: "bu yüzden", en: "that's why" },
      { de: "darum", tr: "o yüzden", en: "therefore" },
      { de: "deswegen", tr: "bu yüzden", en: "therefore" },
      { de: "regnen", tr: "yağmur yağmak", en: "to rain" },
      { de: "krank", tr: "hasta", en: "sick" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Önce sebep, sonra sonuç",
        tr: "deshalb, darum ve deswegen aynı anlamdadır: „bu yüzden“. İki ana cümleyi bağlar; birincisi sebebi, ikincisi sonucu söyler. İkinci cümle virgülden ya da noktadan sonra bu kelimeyle başlar.",
        examples: [
          { de: "Es regnet, deshalb nehme ich den Bus.", tr: "Yağmur yağıyor, bu yüzden otobüse biniyorum.", note: "deshalb + fiil" },
          { de: "Der Kurs ist voll. Darum warte ich bis März.", tr: "Kurs dolu. O yüzden marta kadar bekliyorum.", note: "yeni cümle darum ile" },
          { de: "Mein Handy war leer, deswegen habe ich nicht angerufen.", tr: "Telefonumun şarjı bitmişti, bu yüzden aramadım.", note: "Perfekt'te de aynı" },
        ],
      },
      {
        heading: "Fiil hemen arkasında",
        tr: "deshalb bir bağlaç değil, cümlenin bir ögesidir. Başa gelirse birinci yeri doldurur; çekimli fiil ikinci sırada kalır ve özne fiilden SONRA gelir. deshalb cümlenin ortasına da girebilir; o zaman sıra normaldir.",
        examples: [
          { de: "Deshalb fahre ich heute mit dem Rad.", tr: "Bu yüzden bugün bisikletle gidiyorum.", note: "deshalb – fiil – özne" },
          { de: "Ich fahre deshalb heute mit dem Rad.", tr: "Bugün bu yüzden bisikletle gidiyorum.", note: "ortada: özne – fiil – deshalb" },
          { de: "Deshalb haben wir keine Zeit.", tr: "Bu yüzden vaktimiz yok.", note: "özne wir fiilden sonra" },
        ],
      },
      {
        heading: "weil ile karşılaştır",
        tr: "Aynı durumu iki yoldan anlatabilirsin. „weil“ sebep cümlesini başlatır ve fiili sona gönderir. „deshalb“ sonuç cümlesini başlatır ve fiili ikinci sırada tutar. Sebep ile sonucun yeri de değişir.",
        examples: [
          { de: "Ich bleibe zu Hause, weil ich krank bin.", tr: "Evde kalıyorum, çünkü hastayım.", note: "weil: sebep, fiil sonda" },
          { de: "Ich bin krank, deshalb bleibe ich zu Hause.", tr: "Hastayım, bu yüzden evde kalıyorum.", note: "deshalb: sonuç, fiil ikinci" },
          { de: "Die Wohnung ist zu teuer, darum suchen wir weiter.", tr: "Daire çok pahalı, o yüzden aramaya devam ediyoruz.", note: "darum = deshalb" },
        ],
      },
    ],
    questions: [
      {
        text: "Es regnet, deshalb ___ den Bus.",
        options: ["ich nehme", "nehme ich", "ich nehmen"],
        answer: 1,
        explain: "deshalb birinci yeri doldurur; fiil ikinci sırada, özne arkasında: nehme ich.",
      },
      {
        text: "Ich habe Hunger, …",
        options: ["deshalb ich esse ein Brot.", "weil esse ich ein Brot.", "deshalb esse ich ein Brot."],
        answer: 2,
        explain: "deshalb'dan sonra fiil gelir, özne onu izler: deshalb esse ich.",
      },
      {
        text: "Mein Handy war leer, ___ habe ich nicht angerufen.",
        options: ["deswegen", "weil", "dass"],
        answer: 0,
        explain: "İkinci cümle sonucu söylüyor ve fiil ikinci sırada: deswegen. weil olsaydı fiil sona giderdi.",
      },
      {
        kind: "gapfill",
        text: "Der Kurs ist voll, darum ___ ich bis März. (warten)",
        options: [],
        answer: 0,
        accept: ["warte"],
        explain: "darum'dan hemen sonra çekimli fiil gelir: darum warte ich.",
      },
      {
        kind: "gapfill",
        text: "Ich hatte keine Zeit, deshalb ___ ich nicht gekommen. (sein)",
        options: [],
        answer: 0,
        accept: ["bin"],
        explain: "kommen Perfekt'te sein alır; yardımcı fiil deshalb'dan hemen sonra: deshalb bin ich …",
      },
      {
        kind: "gapfill",
        text: "Die Wohnung ist zu teuer. ___ suchen wir eine neue. (weil / darum)",
        options: [],
        answer: 0,
        accept: ["Darum", "darum"],
        explain: "Arkasından hemen fiil geliyor ve cümle sonucu söylüyor: Darum. weil fiili sona atardı.",
      },
      {
        kind: "gapfill",
        text: "Ich bin krank, ___ bleibe ich im Bett. (weil / deshalb)",
        options: [],
        answer: 0,
        accept: ["deshalb"],
        explain: "Fiil ikinci sırada ve cümle sonucu söylüyor: deshalb. weil fiili sona atardı.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Der Bus kommt nicht,", "deshalb", "gehen", "wir", "zu Fuß"],
        explain: "Önce sebep, sonra deshalb; ardından fiil, sonra özne: deshalb gehen wir zu Fuß.",
      },
      {
        kind: "truefalse",
        text: "„Ich fahre deshalb heute mit dem Rad.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "deshalb cümlenin ortasında da durabilir; özne başta, fiil ikinci sırada. Cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„Ich bin müde, deshalb ich gehe ins Bett.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "deshalb'dan sonra fiil gelmeli: „deshalb gehe ich ins Bett.“",
      },
    ],
  },
];
