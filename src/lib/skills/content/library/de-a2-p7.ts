import type { SkillExercise } from "../../types";

/**
 * DE · A2 — Beceriler kütüphanesi, parti 7.
 *
 * Kurallar ve emsal: `de-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 7 iş hattı: iş ilanı, radyoda trafik bülteni, kısa bir başvuru yazısı.
 * Söyleyiş odağı s, ss ve ß; dil bilgisi Dativ isteyen edatlar — A2'nin en çok
 * kullanılan kapalı listesi.
 */
export const deA2P7: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-a2-lib-r7",
    course: "de",
    level: "A2",
    skill: "reading",
    title: "Stellenanzeige: Aushilfe im Gartencenter",
    genre: "ad",
    intro: "Bir iş ilanı: kim aranıyor, hangi günler, ne kadar ödeniyor, nasıl başvurulur.",
    gloss: [
      { de: "die Aushilfe", tr: "yardımcı eleman", en: "temporary help" },
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
      { de: "die Bewerbung", tr: "başvuru", en: "application" },
      { de: "der Lohn", tr: "ücret", en: "wage" },
      { de: "die Kundin", tr: "müşteri", en: "customer" },
      { de: "zuverlässig", tr: "güvenilir", en: "reliable" },
    ],
    minutes: 5,
    text:
      "Gartencenter Bloom sucht eine Aushilfe (m/w/d)\n\n" +
      "Wir sind ein kleines Gartencenter am Stadtrand und brauchen ab April Unterstützung für die Saison.\n\n" +
      "Ihre Aufgaben: Pflanzen gießen, Regale einräumen und Kunden beraten. " +
      "Sie helfen außerdem an der Kasse, wenn viel los ist.\n\n" +
      "Wir suchen jemanden, der freundlich und zuverlässig ist. " +
      "Erfahrung im Verkauf ist schön, aber nicht nötig — wir lernen Sie an. " +
      "Wichtig ist nur, dass Sie gern draußen arbeiten und auch bei Regen kommen.\n\n" +
      "Arbeitszeit: Freitag und Samstag, jeweils von neun bis sechzehn Uhr. " +
      "Der Lohn beträgt vierzehn Euro pro Stunde.\n\n" +
      "Ihre Bewerbung schicken Sie bitte per E-Mail an frau.bloom@gartencenter-bloom.de. " +
      "Ein kurzer Text über sich genügt, ein Foto brauchen wir nicht.",
    questions: [
      {
        text: "Was gehört NICHT zu den Aufgaben?",
        options: ["Pflanzen gießen", "Kunden beraten", "Pflanzen liefern"],
        answer: 2,
        explain: "İlanda sulama, raf düzenleme, müşteri danışmanlığı ve kasa var; teslimat yok.",
      },
      {
        text: "Was erwartet das Gartencenter von den Bewerbern?",
        options: [
          "dass man schon im Verkauf gearbeitet hat",
          "dass man freundlich und zuverlässig ist",
          "dass man ein gutes Foto schickt",
        ],
        answer: 1,
        explain: "Deneyim „schön, aber nicht nötig“; fotoğraf hiç istenmiyor.",
      },
      {
        kind: "truefalse",
        text: "Man arbeitet auch am Sonntag.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Freitag und Samstag, jeweils von neun bis sechzehn Uhr.“",
      },
      {
        kind: "gapfill",
        text: "Der Lohn beträgt ___ Euro pro Stunde.",
        options: [],
        answer: 0,
        accept: ["vierzehn", "14"],
        explain: "„Der Lohn beträgt vierzehn Euro pro Stunde.“",
      },
      {
        kind: "short_answer",
        text: "Wie schickt man die Bewerbung?",
        options: [],
        answer: 0,
        accept: ["per E-Mail", "E-Mail", "mit einer E-Mail"],
        explain: "„Ihre Bewerbung schicken Sie bitte per E-Mail“.",
      },
      {
        text: "Warum steht im Text „auch bei Regen“?",
        options: [
          "Die Arbeit ist zum Teil draußen.",
          "Bei Regen gibt es mehr Lohn.",
          "Das Gartencenter hat bei Regen zu.",
        ],
        answer: 0,
        explain: "„Sie gern draußen arbeiten“ cümlesi bunun gerekçesi.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-a2-lib-l7",
    course: "de",
    level: "A2",
    skill: "listening",
    title: "Verkehrsmeldungen am Morgen",
    genre: "info",
    intro: "Radyoda sabah trafik bülteni: hangi yol kapalı, nerede kaza var, hangi hat çalışmıyor.",
    gloss: [
      { de: "die Meldung", tr: "bildirim", en: "report" },
      { de: "die Baustelle", tr: "şantiye", en: "roadworks" },
      { de: "der Unfall", tr: "kaza", en: "accident" },
      { de: "die Umleitung", tr: "alternatif güzergâh", en: "diversion" },
      { de: "die Straßenbahn", tr: "tramvay", en: "tram" },
      { de: "der Stau", tr: "trafik sıkışıklığı", en: "traffic jam" },
    ],
    minutes: 5,
    segments: [
      { text: "Es ist sieben Uhr dreißig, hier sind die Verkehrsmeldungen für die Region." },
      { text: "Auf der Autobahn A2 zwischen Braunschweig und Hannover gibt es nach einem Unfall zwölf Kilometer Stau." },
      { text: "Die Polizei bittet alle Fahrer, die Umleitung über Peine zu nehmen. Der linke Fahrstreifen ist wieder frei." },
      { text: "In der Innenstadt ist die Berliner Straße wegen einer Baustelle bis Freitag gesperrt." },
      { text: "Die Straßenbahn Linie vier fährt heute nur bis zum Hauptbahnhof. Zwischen Bahnhof und Zoo fahren Busse." },
      { text: "Gute Nachricht für Radfahrer: Der neue Radweg am Fluss ist ab heute offen." },
      { text: "Die nächsten Meldungen hören Sie um acht Uhr. Kommen Sie gut an!" },
    ],
    questions: [
      {
        text: "Was ist auf der A2 passiert?",
        options: ["eine Baustelle", "ein Unfall", "eine Demonstration"],
        answer: 1,
        explain: "„nach einem Unfall zwölf Kilometer Stau“.",
      },
      {
        text: "Was sollen die Fahrer machen?",
        options: ["über Peine fahren", "zu Hause bleiben", "den linken Fahrstreifen nehmen"],
        answer: 0,
        explain: "„Die Polizei bittet alle Fahrer, die Umleitung über Peine zu nehmen.“",
      },
      {
        kind: "truefalse",
        text: "Die Berliner Straße ist wegen eines Unfalls gesperrt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Orada sebep şantiye: „wegen einer Baustelle bis Freitag gesperrt“.",
      },
      {
        kind: "gapfill",
        text: "Die Straßenbahn Linie ___ fährt nur bis zum Hauptbahnhof.",
        options: [],
        answer: 0,
        accept: ["vier", "4"],
        explain: "„Die Straßenbahn Linie vier fährt heute nur bis zum Hauptbahnhof.“",
      },
      {
        kind: "short_answer",
        text: "Was ist die gute Nachricht für Radfahrer?",
        options: [],
        answer: 0,
        accept: [
          "der neue Radweg ist offen",
          "der neue Radweg am Fluss ist offen",
          "der Radweg ist offen",
          "der Radweg am Fluss ist offen",
          "der neue Radweg",
        ],
        explain: "„Der neue Radweg am Fluss ist ab heute offen.“",
      },
      {
        text: "Wann kommen die nächsten Meldungen?",
        options: ["um sieben Uhr dreißig", "um acht Uhr", "am Freitag"],
        answer: 1,
        explain: "„Die nächsten Meldungen hören Sie um acht Uhr.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-a2-lib-w7",
    course: "de",
    level: "A2",
    skill: "writing",
    title: "Bewerbung als Aushilfe",
    genre: "formal",
    intro: "Bir iş ilanına cevap yazıyorsun: önce iki cümle kur, sonra kısa bir başvuru metni yaz.",
    gloss: [
      { de: "die Stelle", tr: "iş", en: "position" },
      { de: "die Anzeige", tr: "ilan", en: "advertisement" },
      { de: "die Erfahrung", tr: "deneyim", en: "experience" },
      { de: "zur Verfügung stehen", tr: "müsait olmak", en: "to be available" },
      { de: "das Vorstellungsgespräch", tr: "iş görüşmesi", en: "job interview" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "İlanınızı internette gördüm.",
        answer: "Ich habe Ihre Anzeige im Internet gesehen.",
        alternatives: ["Ihre Anzeige habe ich im Internet gesehen."],
        hint: "Perfekt: „habe“ ikinci sırada, Partizip „gesehen“ cümlenin sonunda.",
      },
      {
        kind: "build",
        tr: "İki yıl bir çiçekçide çalıştım.",
        answer: "Ich habe zwei Jahre in einem Blumenladen gearbeitet.",
        alternatives: ["Zwei Jahre habe ich in einem Blumenladen gearbeitet."],
        hint: "„in“ burada yer bildiriyor ve Dativ ister: in einem Blumenladen.",
      },
      {
        kind: "free",
        prompt:
          "İlana kısa bir başvuru yaz: hangi ilana yazdığını söyle, kim olduğunu tanıt, hangi deneyimin olduğunu yaz, hangi günler müsait olduğunu belirt ve görüşmeye çağrılmayı istediğini söyle.",
        checklist: [
          "Hangi ilana başvurduğunu yaz",
          "Kendini tanıt: ad, yaş, şu anki durumun",
          "Deneyimini ve neden uygun olduğunu yaz",
          "Ne zaman başlayabileceğini söyle ve kibarca bitir",
        ],
        minWords: 55,
        phrases: [
          { de: "Ich bewerbe mich um die Stelle als …", tr: "… işi için başvuruyorum", en: "I am applying for the position of …" },
          { de: "Ich habe Ihre Anzeige … gelesen.", tr: "İlanınızı … okudum", en: "I read your advertisement in …" },
          { de: "Zurzeit arbeite ich als …", tr: "Şu anda … olarak çalışıyorum", en: "At the moment I work as …" },
          { de: "Ich kann ab … anfangen.", tr: "…'den itibaren başlayabilirim", en: "I can start from …" },
          { de: "Über eine Einladung würde ich mich freuen.", tr: "Bir davet alırsam sevinirim.", en: "I would be glad to receive an invitation." },
        ],
        sample:
          "Sehr geehrte Frau Bloom, ich bewerbe mich um die Stelle als Aushilfe in Ihrem Gartencenter. " +
          "Ich habe Ihre Anzeige gestern im Internet gelesen. Mein Name ist Hande Yildiz, ich bin sechsundzwanzig Jahre alt " +
          "und wohne seit zwei Jahren in Peine. Zurzeit arbeite ich zwei Tage pro Woche in einem Café. " +
          "Vorher habe ich zwei Jahre in einem Blumenladen gearbeitet, deshalb kenne ich viele Pflanzen. " +
          "Ich arbeite gern draußen und der Regen stört mich nicht. Am Freitag und am Samstag stehe ich Ihnen zur Verfügung " +
          "und ich kann ab April anfangen. Über eine Einladung zu einem Vorstellungsgespräch würde ich mich freuen. " +
          "Mit freundlichen Grüßen, Hande Yildiz",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-a2-lib-s7",
    course: "de",
    level: "A2",
    skill: "speaking",
    title: "s, ss und ß",
    genre: "pronounce",
    intro: "Tek s bazen z gibi titrer, çift s ve ß hiç titremez; altı cümlede üçünü ayır.",
    gloss: [
      { de: "die Sonne", tr: "güneş", en: "sun" },
      { de: "das Wasser", tr: "su", en: "water" },
      { de: "die Straße", tr: "cadde", en: "street" },
      { de: "lesen", tr: "okumak", en: "to read" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Die Sonne scheint seit sieben Uhr.",
        tr: "Güneş saat yediden beri parlıyor.",
        hint: "Ünlüden önceki tek s TİTRER: ZO-ne, zayt, Zİİben. Türkçedeki z sesi gibi.",
        confusions: [
          {
            heard: [],
            fix: "Kelime başında ünlüden önce gelen s sessiz değil, ötümlüdür: z gibi.",
            expected: "Sonne",
          },
        ],
      },
      {
        de: "Das Wasser ist heiß.",
        tr: "Su sıcak.",
        hint: "Çift s ve ß hiç titremez: VA-ser, HAYS. İkisi de kısa ve sert.",
        confusions: [
          {
            heard: [],
            fix: "ss ve ß ötümlü olmaz; ses dilin ucundan sürtünerek çıkar, boğaz titremez.",
            expected: "Wasser",
          },
        ],
      },
      {
        de: "Wir wohnen in der Gartenstraße.",
        tr: "Gartenstraße'de oturuyoruz.",
        hint: "ß'den önceki ünlü UZUNDUR: ŞTRAA-se. Çift s'den önceki ünlü ise kısadır.",
        confusions: [
          {
            heard: [],
            fix: "ss yazımı ünlüyü kısaltır; burada a uzun kalmalı.",
            expected: "Straße",
          },
        ],
      },
      {
        de: "Ich lese diese Seite noch einmal.",
        tr: "Bu sayfayı bir kez daha okuyorum.",
        hint: "Üç tek s de ünlüler arasında ya da başta: LEE-ze, Dİİzı, ZAY-tı — üçü de titrer.",
        confusions: [
          {
            heard: [],
            fix: "Tek s iki ünlü arasında her zaman ötümlüdür; sertleştirmek başka kelime yapar.",
            expected: "lese",
          },
        ],
      },
      {
        de: "Der Bus hält vor dem Haus.",
        tr: "Otobüs evin önünde duruyor.",
        hint: "Kelime sonundaki s titremez: BUS, HAUS. Ötümlülük yalnız ünlüden ÖNCE olur.",
        confusions: [
          {
            heard: [],
            fix: "Sonda s her zaman sert çıkar; z sesi yalnız başta ve ünlüler arasında duyulur.",
            expected: "Haus",
          },
        ],
      },
      {
        de: "Wie heißt du, und was isst du gern?",
        tr: "Adın ne ve ne yemeyi seversin?",
        hint: "„heißt“ ß ile, uzun ay; „isst“ çift s ile, kısa i. İkisi de sert ama ünlüleri ayrı.",
        confusions: [
          {
            heard: ["Wie heisst du, und was ist du gern"],
            fix: "„isst“ (yiyorsun) ile „ist“ (-dir) aynı okunur: kısa i, sert s; fark yalnız yazıda ve anlamda.",
            expected: "isst",
          },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-a2-lib-g7",
    course: "de",
    level: "A2",
    skill: "grammar",
    title: "mit, bei, nach, von, seit, zu, aus",
    genre: "grammar",
    intro: "Yedi edat her zaman Dativ ister; listeyi ezberlemek yerine nerede kullanıldıklarını öğren.",
    focus: "Dativ isteyen edatlar ve artikel biçimleri",
    gloss: [
      { de: "der Arzt", tr: "doktor", en: "doctor" },
      { de: "die Arbeit", tr: "iş", en: "work" },
      { de: "die Freundin", tr: "kız arkadaş", en: "friend" },
      { de: "die Schule", tr: "okul", en: "school" },
      { de: "das Fahrrad", tr: "bisiklet", en: "bicycle" },
    ],
    minutes: 8,
    explanation: [
      {
        heading: "Liste kapalı, kural yok",
        tr: "Bu edatlar her durumda Dativ ister; anlamına bakmaya gerek yoktur. Dativ'de artikeller şöyle olur: der → dem, das → dem, die → der, çoğul → den (+ isme -n). „ein“ ise einem / einem / einer olur.",
        examples: [
          { de: "Ich fahre mit dem Fahrrad.", tr: "Bisikletle gidiyorum.", note: "das Fahrrad → dem" },
          { de: "Sie kommt aus der Türkei.", tr: "Türkiye'den geliyor.", note: "die Türkei → der" },
          { de: "Wir sprechen mit den Nachbarn.", tr: "Komşularla konuşuyoruz.", note: "çoğul → den + -n" },
        ],
      },
      {
        heading: "Sık kullanılan kaynaşmalar",
        tr: "Konuşmada bazı edatlar artikelle birleşir: bei dem → beim, von dem → vom, zu dem → zum, zu der → zur. Bunlar kısaltma değil, normal biçimdir; yazıda da böyle kullanılır.",
        examples: [
          { de: "Ich war gestern beim Arzt.", tr: "Dün doktordaydım.", note: "bei dem → beim" },
          { de: "Ich komme gerade von der Arbeit.", tr: "İşten yeni geliyorum.", note: "kaynaşma yok: von der" },
          { de: "Gehst du heute zur Schule?", tr: "Bugün okula gidiyor musun?", note: "zu der → zur" },
        ],
      },
      {
        heading: "Hangi edat ne söyler?",
        tr: "„mit“ araç ve birliktelik, „bei“ bir kişinin yanında ya da bir yerde çalışma, „nach“ şehir ve ülke adlarına yön (artikelsiz olanlar), „von“ kaynak ve sahiplik, „seit“ bir zamandan beri, „zu“ bir kişiye ya da kuruma yön, „aus“ içinden çıkış ve memleket.",
        examples: [
          { de: "Seit einem Jahr lerne ich Deutsch.", tr: "Bir yıldır Almanca öğreniyorum.", note: "seit + Dativ" },
          { de: "Wir fahren nach Italien.", tr: "İtalya'ya gidiyoruz.", note: "artikelsiz ülke → nach" },
          { de: "Ich gehe zu meiner Freundin.", tr: "Kız arkadaşıma gidiyorum.", note: "kişiye yön → zu" },
        ],
      },
    ],
    questions: [
      {
        text: "Ich fahre mit ___ Bus zur Arbeit.",
        options: ["den", "dem", "der"],
        answer: 1,
        explain: "„der Bus“ eril; „mit“ Dativ ister ve eril artikel dem olur.",
      },
      {
        text: "Sie kommt aus ___ Schweiz.",
        options: ["der", "dem", "die"],
        answer: 0,
        explain: "„die Schweiz“ dişil; Dativ'de der olur.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: ["Ich gehe nach dem Arzt.", "Ich gehe zum Arzt.", "Ich gehe zu dem Arzt hin."],
        answer: 1,
        explain: "Kişiye ya da kuruma yönde „zu“ kullanılır ve „zu dem“ → zum olur.",
      },
      {
        kind: "gapfill",
        text: "___ einem Jahr wohne ich in Bremen. (seit / aus)",
        options: [],
        answer: 0,
        accept: ["Seit", "seit"],
        explain: "Bir zamandan beri süren durum: seit + Dativ.",
      },
      {
        kind: "gapfill",
        text: "Ich komme gerade von ___ Arbeit. (die)",
        options: [],
        answer: 0,
        accept: ["der"],
        explain: "„die Arbeit“ dişil; Dativ'de der olur ve „von der“ kaynaşmaz.",
      },
      {
        kind: "gapfill",
        text: "Wir waren gestern ___ Arzt. (bei + dem)",
        options: [],
        answer: 0,
        accept: ["beim"],
        explain: "„bei dem“ kaynaşır: beim Arzt.",
      },
      {
        kind: "gapfill",
        text: "Sie spricht mit ___ Kindern. (die, Plural)",
        options: [],
        answer: 0,
        accept: ["den"],
        explain: "Çoğulda Dativ artikeli den'dir ve isim -n alır: den Kindern.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Nach", "dem", "Kurs", "gehe", "ich", "nach Hause"],
        explain: "Edat öbeği başta, fiil ikinci sırada: Nach dem Kurs gehe ich nach Hause.",
      },
      {
        kind: "truefalse",
        text: "„Ich fahre mit den Zug.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„der Zug“ tekil erildir; Dativ'i dem'dir: „mit dem Zug“.",
      },
      {
        kind: "truefalse",
        text: "„Wir fahren nach Italien.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Artikelsiz ülke adlarında yön için nach kullanılır.",
      },
    ],
  },
];
