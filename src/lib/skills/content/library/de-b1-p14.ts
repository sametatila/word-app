import type { SkillExercise } from "../../types";

/**
 * DE · B1 — Beceriler kütüphanesi, parti 14.
 *
 * B1 hücresini YİRMİYE tamamlayan partilerden biri. Kurallar ve emsal:
 * `de-b1.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 14 sıcak yaz hattı: asfaltı söküp ağaç diken bir okul bahçesi, sıcak
 * günlerde yaşlıları arayan gönüllü telefon hattı, güneye bakan daire için site
 * yönetimine resmî rica. Dil bilgisi sonuç yan cümlesi — so … dass ve sodass.
 */
export const deB1P14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b1-lib-r14",
    course: "de",
    level: "B1",
    skill: "reading",
    title: "Aus Asphalt wird Schatten",
    genre: "article",
    intro: "Yerel bir haber: bir ilkokul, bahçesindeki asfaltı söküp ağaç dikiyor; parayı kim veriyor, ne ölçülmüş, kim şikâyetçi.",
    gloss: [
      { de: "der Asphalt", tr: "asfalt", en: "asphalt" },
      { de: "aufbrechen", tr: "sökmek", en: "to break up" },
      { de: "das Sonnensegel", tr: "gölgelik", en: "shade sail" },
      { de: "übernehmen", tr: "üstlenmek", en: "to cover" },
      { de: "messen", tr: "ölçmek", en: "to measure" },
      { de: "der Hausmeister", tr: "okul görevlisi", en: "caretaker" },
    ],
    minutes: 6,
    text:
      "Aus Asphalt wird Schatten\n\n" +
      "Im Sommer war der Hof der Lessing-Grundschule so heiß, dass die Kinder in den Pausen lieber im " +
      "Flur blieben. Der Asphalt hatte an Nachmittagen im Juli über fünfzig Grad. Im letzten Herbst hat " +
      "die Schule zusammen mit den Eltern beschlossen, das zu ändern.\n\n" +
      "An drei Wochenenden haben Freiwillige ein Drittel des Asphalts aufgebrochen. Dort wachsen jetzt " +
      "zwölf junge Bäume, dazwischen gibt es Rasen und Sand. Über dem Klettergerüst hängt ein großes " +
      "Sonnensegel, bis die Bäume groß genug sind.\n\n" +
      "Die Kosten lagen bei rund achtzigtausend Euro. Die Hälfte hat die Stadt übernommen, den Rest haben " +
      "ein Förderprogramm und ein Sommerfest gebracht.\n\n" +
      "Der Hausmeister hat im August gemessen: Unter den Bäumen ist der Boden um fast zwanzig Grad kühler " +
      "als auf dem alten Asphalt. „Die Kinder bleiben wieder draußen, und es gibt weniger Streit, weil es " +
      "mehr Ecken zum Spielen gibt“, sagt Schulleiter Jens Wolter.\n\n" +
      "Ganz ohne Kritik ging es nicht. Einige Eltern finden den Sand zu schmutzig, und bei Regen ist der " +
      "Rasen schnell kaputt. Die Schule hat deshalb schmale Wege aus Holz gebaut, sodass die Schuhe auch " +
      "an nassen Tagen sauber bleiben.",
    questions: [
      {
        text: "Warum blieben die Kinder früher in den Pausen im Flur?",
        options: ["weil der Hof zu heiß war", "weil der Hof zu klein war", "weil es draußen zu viel Streit gab"],
        answer: 0,
        explain: "„so heiß, dass die Kinder in den Pausen lieber im Flur blieben“ — asfalt elli dereceyi geçiyordu.",
      },
      {
        text: "Wer hat den Asphalt aufgebrochen?",
        options: ["eine Baufirma der Stadt", "Freiwillige an drei Wochenenden", "die Kinder im Unterricht"],
        answer: 1,
        explain: "„An drei Wochenenden haben Freiwillige ein Drittel des Asphalts aufgebrochen.“",
      },
      {
        kind: "truefalse",
        text: "Die Stadt hat die Hälfte der Kosten bezahlt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Die Hälfte hat die Stadt übernommen“; gerisi bir destek programından ve yaz şenliğinden.",
      },
      {
        kind: "gapfill",
        text: "Unter den Bäumen ist der Boden um fast ___ Grad kühler.",
        options: [],
        answer: 0,
        accept: ["zwanzig", "20"],
        explain: "Okul görevlisi ağustosta ölçmüş: „um fast zwanzig Grad kühler als auf dem alten Asphalt“.",
      },
      {
        kind: "short_answer",
        text: "Was hängt über dem Klettergerüst?",
        options: [],
        answer: 0,
        accept: ["ein Sonnensegel", "ein großes Sonnensegel", "Sonnensegel"],
        explain: "Ağaçlar büyüyene kadar tırmanma aletinin üstünde büyük bir gölgelik asılı.",
      },
      {
        text: "Wie hat die Schule auf die Kritik reagiert?",
        options: [
          "Sie hat den Sand wieder entfernt.",
          "Sie hat einen Teil des Rasens geschlossen.",
          "Sie hat schmale Wege aus Holz gebaut.",
        ],
        answer: 2,
        explain: "„Die Schule hat deshalb schmale Wege aus Holz gebaut, sodass die Schuhe … sauber bleiben.“",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b1-lib-l14",
    course: "de",
    level: "B1",
    skill: "listening",
    title: "Anruf vom Hitzetelefon",
    genre: "phone",
    intro: "Sıcak günlerde yaşlıları arayan gönüllü hattından bir telefon: nasıl olduğu soruluyor, neler öneriliyor.",
    gloss: [
      { de: "vereinbaren", tr: "kararlaştırmak", en: "to arrange" },
      { de: "der Durst", tr: "susuzluk", en: "thirst" },
      { de: "der Vorhang", tr: "perde", en: "curtain" },
      { de: "lüften", tr: "havalandırmak", en: "to air out" },
      { de: "verschieben", tr: "ertelemek", en: "to postpone" },
      { de: "schwindlig", tr: "başı dönen", en: "dizzy" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Jansen", text: "Guten Tag, Herr Feldmann, hier ist Maria Jansen vom Hitzetelefon. Wir hatten ja vereinbart, dass ich bei über dreißig Grad jeden Tag anrufe." },
      { speaker: "Herr Feldmann", text: "Ach ja, das Hitzetelefon. Mir geht es ganz gut, nur die Wohnung ist so warm, dass ich nachts kaum schlafe." },
      { speaker: "Frau Jansen", text: "Wie viel haben Sie heute schon getrunken?" },
      { speaker: "Herr Feldmann", text: "Eine Tasse Kaffee und ein Glas Wasser. Ich habe einfach keinen Durst." },
      { speaker: "Frau Jansen", text: "Das ist leider typisch, im Alter merkt man den Durst später. Stellen Sie sich doch eine große Flasche auf den Tisch, sodass Sie sie immer sehen." },
      { speaker: "Frau Jansen", text: "Und lassen Sie tagsüber die Fenster und die Vorhänge zu. Lüften Sie lieber früh am Morgen, bevor die Sonne kommt." },
      { speaker: "Herr Feldmann", text: "Heute Nachmittag wollte ich eigentlich zum Friedhof, meine Frau besuchen." },
      { speaker: "Frau Jansen", text: "Können Sie das auf den Abend verschieben? Um drei Uhr ist es am heißesten, nach sieben ist es deutlich angenehmer." },
      { speaker: "Herr Feldmann", text: "Gut, dann gehe ich nach dem Abendessen. Rufen Sie morgen wieder an?" },
      { speaker: "Frau Jansen", text: "Morgen um zehn, wie heute. Und wenn Ihnen schwindlig wird, rufen Sie sofort die Nummer auf dem Zettel an." },
    ],
    questions: [
      {
        text: "Wann ruft Frau Jansen bei Herrn Feldmann an?",
        options: ["an jedem Tag im Sommer", "an Tagen mit über dreißig Grad", "nur am Wochenende"],
        answer: 1,
        explain: "„… dass ich bei über dreißig Grad jeden Tag anrufe.“",
      },
      {
        text: "Was rät sie ihm zum Trinken?",
        options: [
          "eine Flasche gut sichtbar auf den Tisch stellen",
          "zum Wasser immer einen Kaffee trinken",
          "jede Stunde einen Wecker stellen",
        ],
        answer: 0,
        explain: "„Stellen Sie sich doch eine große Flasche auf den Tisch, sodass Sie sie immer sehen.“",
      },
      {
        kind: "truefalse",
        text: "Herr Feldmann hat an diesem Tag noch wenig getrunken.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Yalnız bir fincan kahve ve bir bardak su içmiş; susamıyor.",
      },
      {
        kind: "gapfill",
        text: "Um ___ Uhr ist es am heißesten.",
        options: [],
        answer: 0,
        accept: ["drei", "3", "15"],
        explain: "„Um drei Uhr ist es am heißesten“; akşam yediden sonra daha rahat.",
      },
      {
        kind: "short_answer",
        text: "Wann soll Herr Feldmann lüften?",
        options: [],
        answer: 0,
        accept: ["früh am Morgen", "am frühen Morgen", "morgens früh", "früh morgens"],
        explain: "„Lüften Sie lieber früh am Morgen, bevor die Sonne kommt.“",
      },
      {
        text: "Was macht Herr Feldmann mit seinem Besuch auf dem Friedhof?",
        options: ["Er sagt ihn ganz ab.", "Er geht mit Frau Jansen hin.", "Er geht nach dem Abendessen."],
        answer: 2,
        explain: "Ziyareti akşama erteliyor: „dann gehe ich nach dem Abendessen“.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b1-lib-w14",
    course: "de",
    level: "B1",
    skill: "writing",
    title: "Bitte um Sonnenschutz",
    genre: "formal",
    intro: "Güneye bakan dairen yazın çok ısınıyor: önce iki cümle kur, sonra bina yönetimine resmî bir rica mektubu yaz.",
    gloss: [
      { de: "die Hausverwaltung", tr: "bina yönetimi", en: "property management" },
      { de: "der Sonnenschutz", tr: "güneşlik", en: "sun protection" },
      { de: "die Erlaubnis", tr: "izin", en: "permission" },
      { de: "anbringen", tr: "takmak", en: "to fit" },
      { de: "die Hälfte", tr: "yarı", en: "half" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Daire o kadar ısınıyor ki öğleden sonraları çalışamıyorum.",
        answer: "Die Wohnung wird so heiß, dass ich nachmittags nicht arbeiten kann.",
        alternatives: ["Die Wohnung wird nachmittags so heiß, dass ich nicht arbeiten kann."],
        hint: "„so + sıfat …, dass“ sonuç bildirir; „dass“ yan cümlesinde modal fiil en sona gider.",
      },
      {
        kind: "build",
        tr: "Masrafların yarısını üstlenebilirim.",
        answer: "Ich könnte die Hälfte der Kosten übernehmen.",
        alternatives: ["Die Hälfte der Kosten könnte ich übernehmen."],
        hint: "Konjunktiv II „könnte“ teklifi kibarlaştırır; mastar cümlenin sonunda durur.",
      },
      {
        kind: "free",
        prompt:
          "Bina yönetimine resmî bir mektup yaz: hangi dairede oturduğunu söyle, sorunu somut bilgilerle anlat, ne istediğini açıkça yaz, masrafla ilgili bir teklif yap ve bir cevap tarihi iste.",
        checklist: [
          "Adresini ve daireni belirt",
          "Sorunu somut bilgilerle anlat",
          "Ne istediğini net yaz ve bir teklif yap",
          "Cevap için bir tarih iste",
        ],
        minWords: 90,
        phrases: [
          { de: "Ich wohne seit … in der Wohnung …", tr: "…'den beri … numaralı dairede oturuyorum.", en: "I have been living in flat … since …" },
          { de: "Im Sommer steigt die Temperatur so stark, dass …", tr: "Yazın sıcaklık o kadar yükseliyor ki …", en: "In summer the temperature rises so much that …" },
          { de: "Ich bitte Sie deshalb um die Erlaubnis, …", tr: "Bu yüzden … için izninizi rica ediyorum.", en: "I therefore ask for your permission to …" },
          { de: "Selbstverständlich würde ich … übernehmen.", tr: "Elbette …'i üstlenirim.", en: "Of course I would take care of …" },
          { de: "Ich bitte um eine Rückmeldung bis zum …", tr: "…'e kadar bir geri dönüş rica ediyorum.", en: "I would ask for a reply by …" },
        ],
        sample:
          "Sehr geehrte Damen und Herren,\n\n" +
          "ich wohne seit drei Jahren in der Wohnung 12 im vierten Stock, Gartenstraße 5. Alle Fenster " +
          "liegen nach Süden und haben keinen Sonnenschutz. Im Sommer steigt die Temperatur so stark, dass " +
          "mein Thermometer im Juli fast jeden Nachmittag über dreißig Grad gezeigt hat. Die Wohnung wird " +
          "so heiß, dass ich nachmittags nicht arbeiten kann, und ich bin zwei Tage pro Woche im Homeoffice. " +
          "Ich bitte Sie deshalb um die Erlaubnis, außen an den beiden großen Fenstern Rollos anzubringen. " +
          "Ein Fachbetrieb hat mir ein Angebot über 1.400 Euro gemacht. Selbstverständlich würde ich die " +
          "Montage organisieren, und ich könnte die Hälfte der Kosten übernehmen. Ich bitte um eine " +
          "Rückmeldung bis zum 30. April, damit alles vor dem Sommer fertig ist.\n\n" +
          "Mit freundlichen Grüßen\nEmre Kaplan",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b1-lib-s14",
    course: "de",
    level: "B1",
    skill: "speaking",
    title: "Mittagspause wie im Süden?",
    genre: "monologue",
    intro: "Bir dakikaya yakın tek başına konuşacaksın: çalışma saatlerini sıcağa göre değiştirme fikrini tart.",
    gloss: [],
    minutes: 6,
    monologue: {
      promptTr:
        "Çok sıcak yaz günlerinde iş ve okul saatleri değişmeli mi, örneğin sabah erken başlanıp öğleden sonra ara mı verilmeli? Görüşünü söyle, bir örnek ver, kimin için zor olacağını düşün ve bir çözüm öner.",
      bulletsTr: [
        "Görüşünü tek cümleyle söyle",
        "Sıcakta yaşadığın somut bir örnek ver",
        "Kimin için zor olacağını söyle",
        "Uygulanabilir bir öneriyle bitir",
      ],
      targets: [
        { de: "Auf den ersten Blick klingt das …", tr: "İlk bakışta bu … geliyor" },
        { de: "Es war so heiß, dass …", tr: "O kadar sıcaktı ki …" },
        { de: "Das Problem wären vor allem …", tr: "Sorun özellikle … olurdu" },
        { de: "Ein Kompromiss könnte sein, dass …", tr: "Bir uzlaşma … olabilir" },
      ],
      minSeconds: 40,
      maxSeconds: 80,
      sampleDe:
        "Auf den ersten Blick klingt eine lange Mittagspause nach Urlaub im Süden, aber ich glaube, " +
        "wir werden sie auch hier brauchen. Letzten Juli war es in unserem Büro so heiß, dass nach dem " +
        "Mittagessen kaum noch jemand klar denken konnte. Wir haben Fehler gemacht, die uns morgens nie " +
        "passieren. Deshalb finde ich es sinnvoll, an sehr heißen Tagen früher anzufangen und die Arbeit " +
        "am Nachmittag zu unterbrechen. Das Problem wären vor allem Familien mit kleinen Kindern, denn " +
        "Kitas und Schulen haben feste Zeiten, und wer abends arbeitet, sieht seine Kinder kaum. " +
        "Ein Kompromiss könnte sein, dass jeder Betrieb eine eigene Hitzeregel festlegt: Ab dreißig Grad " +
        "beginnt die Arbeit um sieben, und ab vierzehn Uhr ist frei, sodass niemand in der größten Hitze " +
        "am Schreibtisch sitzen muss.",
      rubricHint:
        "Kişisel bir örnek ve bir uzlaşma önerisi beklenir; „so … dass“, „sodass“ ve Konjunktiv II („wären“, „könnte“) kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b1-lib-g14",
    course: "de",
    level: "B1",
    skill: "grammar",
    title: "So heiß, dass niemand schlafen konnte",
    genre: "grammar",
    intro: "Bir durumun sonucunu yan cümleyle söylemenin iki yolu var: vurguyu sıfata koyan so … dass ve bütün olaya bakan sodass.",
    focus: "Sonuç yan cümlesi: so … dass ve sodass",
    gloss: [
      { de: "die Hitze", tr: "sıcak", en: "heat" },
      { de: "das Gewitter", tr: "gök gürültülü fırtına", en: "thunderstorm" },
      { de: "ausfallen", tr: "iptal olmak", en: "to be cancelled" },
      { de: "der Schatten", tr: "gölge", en: "shade" },
      { de: "aufwachen", tr: "uyanmak", en: "to wake up" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Vurgu sıfatta: so … dass",
        tr: "„so“ bir sıfatın ya da zarfın önüne gelip derecesini vurgular; „dass“ yan cümlesi bu derecenin SONUCUNU söyler. Türkçedeki „o kadar … ki“ yapısının karşılığıdır. „dass“tan sonra çekimli fiil sona gider.",
        examples: [
          { de: "Es war so heiß, dass niemand schlafen konnte.", tr: "O kadar sıcaktı ki kimse uyuyamadı.", note: "so + sıfat" },
          { de: "Er ist so schnell gelaufen, dass er den Bus noch bekommen hat.", tr: "O kadar hızlı koştu ki otobüse yetişti.", note: "so + zarf" },
          { de: "Das Gewitter war so laut, dass die Kinder aufgewacht sind.", tr: "Fırtına o kadar gürültülüydü ki çocuklar uyandı.", note: "sind sonda" },
        ],
      },
      {
        heading: "Bütün olayın sonucu: sodass",
        tr: "„sodass“ (ayrı yazılışı „so dass“) tek bir sıfatı değil, önceki cümlenin tamamını sonuca bağlar: „öyle ki, bu yüzden“. Bu yan cümle her zaman ana cümleden SONRA gelir, başa geçemez.",
        examples: [
          { de: "Es hat stark geregnet, sodass das Fest ausgefallen ist.", tr: "Çok yağmur yağdı, öyle ki şenlik iptal oldu.", note: "ist sonda" },
          { de: "Wir hatten keinen Schatten, sodass wir früh nach Hause gegangen sind.", tr: "Gölge yoktu, bu yüzden erkenden eve gittik.", note: "sodass hep ikinci" },
          { de: "Die Bahn fuhr nicht, sodass viele zu spät kamen.", tr: "Tren işlemedi, bu yüzden birçok kişi geç kaldı.", note: "kamen sonda" },
        ],
      },
      {
        heading: "sodass mı, deshalb mı?",
        tr: "„deshalb“ da sonuç bildirir ama bir zarftır: çekimli fiil hemen arkasından gelir ve cümle bağımsız kalır. „sodass“ ise yan cümle kurar ve fiili sona gönderir. Anlam yakın, söz dizimi farklıdır.",
        examples: [
          { de: "Es war heiß, deshalb blieben wir im Schatten.", tr: "Hava sıcaktı, bu yüzden gölgede kaldık.", note: "deshalb + fiil" },
          { de: "Es war heiß, sodass wir im Schatten blieben.", tr: "Hava sıcaktı, öyle ki gölgede kaldık.", note: "sodass: fiil sonda" },
          { de: "Die Hitze war so groß, dass die Schule früher endete.", tr: "Sıcak o kadar büyüktü ki okul erken bitti.", note: "so groß, dass" },
        ],
      },
    ],
    questions: [
      {
        text: "Es war ___ heiß, dass niemand schlafen konnte.",
        options: ["sehr", "so", "zu"],
        answer: 1,
        explain: "Sonuç „dass“ ile geliyorsa önündeki derece sözcüğü so'dur: o kadar … ki.",
      },
      {
        text: "Es hat stark geregnet, ___ das Fest ausgefallen ist.",
        options: ["sodass", "deshalb", "weil"],
        answer: 0,
        explain: "Fiil (ist) sonda, yani bir yan cümle var; sonuç bildiren bağlaç sodass.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Es war heiß, sodass blieben wir drinnen.",
          "Es war heiß, deshalb wir blieben drinnen.",
          "Es war heiß, sodass wir drinnen blieben.",
        ],
        answer: 2,
        explain: "„sodass“tan sonra fiil sona gider; „deshalb“tan sonra ise fiil hemen gelir.",
      },
      {
        kind: "gapfill",
        text: "Das Gewitter war so laut, ___ die Kinder aufgewacht sind.",
        options: [],
        answer: 0,
        accept: ["dass"],
        explain: "„so laut“ derecesinin sonucu dass ile gelir.",
      },
      {
        kind: "gapfill",
        text: "Die Bahn fuhr nicht, sodass viele zu spät ___. (kommen, Präteritum)",
        options: [],
        answer: 0,
        accept: ["kamen"],
        explain: "„sodass“ yan cümlesinde çekimli fiil sonda: kamen.",
      },
      {
        kind: "gapfill",
        text: "Wir hatten keinen Schatten, ___ wir früh nach Hause gegangen sind. (sonuç bağlacı)",
        options: [],
        answer: 0,
        accept: ["sodass", "so dass"],
        explain: "Önceki cümlenin tamamının sonucu: sodass.",
      },
      {
        kind: "gapfill",
        text: "Es war heiß, deshalb ___ wir im Schatten. (bleiben, Präteritum)",
        options: [],
        answer: 0,
        accept: ["blieben"],
        explain: "„deshalb“ bir zarftır; çekimli fiil hemen arkasından gelir: blieben.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Die Hitze war", "so groß", "dass", "die Schule", "früher endete"],
        explain: "Ana cümlede „so groß“, sonra „dass“ yan cümlesi ve en sonda çekimli fiil: endete.",
      },
      {
        kind: "truefalse",
        text: "„Sodass es regnete, blieben wir zu Hause.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„sodass“ yan cümlesi başa geçemez; doğrusu „Es regnete, sodass wir zu Hause blieben.“",
      },
      {
        kind: "truefalse",
        text: "„Er ist so schnell gelaufen, dass er den Bus noch bekommen hat.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„so + zarf“ ardından „dass“; yan cümlede yardımcı fiil (hat) en sonda.",
      },
    ],
  },
];
