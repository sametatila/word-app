import { de, tr, type LectureStep, type Lesson } from "../types";

/**
 * B1 · Modül 1 — İş dünyası (001–010).
 *
 * A seviyeleri tek cümle kurdurdu, A2 geçmişi anlattırdı. B1'in işi cümleleri
 * **bağlamak ve inceltmek**: gerekçe vermek, çekince belirtmek, amaç söylemek,
 * kibarca pazarlık etmek. Bu modül bunu iş dünyasında çalıştırıyor çünkü orada
 * her cümle bir gerekçe ya da bir nezaket katmanı taşıyor.
 *
 * Modülün yan cümle ailesi sırayla açılıyor ve her biri Türkçe konuşan için
 * ayrı bir zorluk taşıyor — hepsinin ortak yanı fiili cümlenin sonuna atması:
 *
 *   - `weil` gerekçe, `obwohl` çekince, `wenn` koşul, `nachdem` önceki olay.
 *   - `um … zu` amaç: Türkçede „-mek için“ tek ek, Almancada cümle ikiye
 *     bölünüyor ve mastar sona gidiyor.
 *   - Dolaylı soru: Türkçede soru cümlesi olduğu gibi gömülür („nerede
 *     olduğunu biliyorum“), Almancada soru kelimesi bağlaca dönüşüyor ve fiil
 *     yine sona düşüyor.
 *   - `Konjunktiv II`: nezaketin dilbilgisel karşılığı. Türkçede rica tonla
 *     yumuşatılır, Almancada fiilin biçimi değişir.
 *
 * Ayrıca yazı dilinin geçmişi (Präteritum) burada tanıtılıyor: özgeçmiş ve
 * resmî metinler konuşma dilinin Perfekt'ini kullanmıyor.
 */
/**
 * Standart kelime adımı — b03…b10 ile aynı desen, metni b01in eskisiyle birebir
 * aynı. Sözlükçe 5ten 8e çıkarken aynı adımı on kez elle yazmak diffi
 * okunamaz hâle getiriyordu.
 */
function word(n: string, w: { de: string; tr: string }, note?: string): LectureStep {
  return {
    say: [
      tr(`${n} kelimemiz:`),
      de(w.de),
      tr(`Türkçesi '${w.tr}' demek${note ? ` — ${note}` : ""}. Lütfen`),
      de(w.de),
      tr("deyin."),
    ],
    expect: { kind: "repeat", target: w.de },
  };
}

export const deB1B01: Lesson[] = [
  {
    id: "de-b1-bewerbung",
    icon: "job",
    level: "B1",
    course: "de",
    title: "Das Vorstellungsgespräch",
    titleTr: "İş görüşmesi",
    summary: "Sebep anlatmayı öğretir: weil yan cümlesi ve seit + Dativ.",
    minutes: 10,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "sich bewerben", tr: "başvurmak" },
      { de: "die Stärke", tr: "güçlü yön" },
      { de: "der Lebenslauf", tr: "özgeçmiş" },
      { de: "die Erfahrung", tr: "deneyim" },
      { de: "die Voraussetzung", tr: "ön koşul" },
      { de: "die Fähigkeit", tr: "yetenek" },
      { de: "verantwortlich", tr: "sorumlu" },
      { de: "die Gelegenheit", tr: "fırsat" },
    ],
    patterns: [
      { de: "…, weil …", tr: "sebep söylerken kullanılır; fiil yan cümlenin sonuna gider" },
      { de: "seit + Dativ", tr: "'…'den beri' derken kullanılır: seit drei Jahren" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün bir iş görüşmesindesin! Sebep bildiren 'weil' cümlelerini ve '…'den beri' anlamındaki 'seit' kalıbını öğreneceğiz. Başlamaya hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "İş görüşmesinin iki temel sorusu var: neden ve ne zamandır. İkisine de bu dersin kalıplarıyla cevap vereceksin. Önce kelimeler.",
          ),
        ],
      },
      word("İlk", { de: "sich bewerben", tr: "başvurmak" }),
      word("İkinci", { de: "die Stärke", tr: "güçlü yön" }),
      word("Üçüncü", { de: "der Lebenslauf", tr: "özgeçmiş" }),
      word("Dördüncü", { de: "die Erfahrung", tr: "deneyim" }),
      word("Beşinci", { de: "die Voraussetzung", tr: "ön koşul" }, "iş ilanlarında 'aranan nitelikler' başlığı altında geçer"),
      word("Altıncı", { de: "die Fähigkeit", tr: "yetenek" }),
      word("Yedinci", { de: "verantwortlich", tr: "sorumlu" }),
      word("Son", { de: "die Gelegenheit", tr: "fırsat" }),
      {
        say: [
          tr("İlk kalıbımız:"),
          de("weil"),
          tr(
            "'çünkü' demek. Ama dikkat: 'weil' ile başlayan yan cümlede fiil cümlenin SONUNA gider. Türkçedeki gibi ortada kalmaz.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Başvuruyorum çünkü yeni deneyimler istiyorum.' Almancası:"),
          de("Ich bewerbe mich, weil ich neue Erfahrungen möchte."),
          tr("Lütfen"),
          de("Ich bewerbe mich, weil ich neue Erfahrungen möchte"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Ich bewerbe mich, weil ich neue Erfahrungen möchte",
        },
      },
      {
        say: [
          tr(
            "Şimdi sıra sende: 'Bu pozisyonu istiyorum çünkü Almanca konuşuyorum.' nasıl dersin?",
          ),
        ],
        expect: {
          kind: "produce",
          target: "Ich möchte die Stelle, weil ich Deutsch spreche",
          accept: ["Ich möchte diese Stelle, weil ich Deutsch spreche"],
          hint: [
            tr("'weil'den sonra fiil en sona gider:"),
            de("Ich möchte die Stelle, weil ich Deutsch spreche."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız:"),
          de("seit"),
          tr(
            "'…'den beri' demek ve her zaman Dativ alır: seit einem Jahr, seit drei Jahren. Türkçeden farkı şu: Almanca hâlâ süren işler için şimdiki zaman kullanır.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Üç yıldır öğretmen olarak çalışıyorum.' Almancası:"),
          de("Ich arbeite seit drei Jahren als Lehrer."),
          tr("Lütfen"),
          de("Ich arbeite seit drei Jahren als Lehrer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich arbeite seit drei Jahren als Lehrer" },
      },
      {
        say: [tr("Peki 'Bir yıldır Almanca öğreniyorum.' nasıl dersin?")],
        expect: {
          kind: "produce",
          target: "Ich lerne seit einem Jahr Deutsch",
          hint: [
            tr("'seit' Dativ alır: 'ein Jahr' → 'einem Jahr'."),
            de("Ich lerne seit einem Jahr Deutsch."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich lerne Deutsch, weil ich arbeite in Berlin."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich lerne Deutsch, weil ich arbeite in Berlin.",
          answer: false,
          why: [
            de("weil"),
            tr("fiili yan cümlenin sonuna atar. Doğrusu:"),
            de("Ich lerne Deutsch, weil ich in Berlin arbeite."),
          ],
        },
      },
      {
        say: [
          tr(
            "Hazırsın! Şimdi görüşme odasındasın: neden başvurduğunu 'weil' ile, ne zamandır çalıştığını 'seit' ile anlatacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir şirkette iş görüşmesindesin. Neden başvurduğunu 'weil' ile, ne kadar süredir çalıştığını ya da öğrendiğini 'seit' ile anlat; güçlü yönlerinden bahset.",
      partner: "profesyonel ama samimi bir İK uzmanı",
      opening:
        "Guten Tag, schön, dass Sie da sind! Erzählen Sie mal: Warum bewerben Sie sich bei uns?",
      openingTr: "İyi günler, hoş geldiniz! Anlatın bakalım: Neden bize başvuruyorsunuz?",
      goal: "Neden başvurduğun, deneyimin ve güçlü yönlerin anlatılmış; görüşmeci sürecin nasıl devam edeceğini söylemiş olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-lebenslauf",
    icon: "pen",
    level: "B1",
    course: "de",
    title: "Der Lebenslauf",
    titleTr: "Özgeçmiş anlatımı",
    summary: "Kariyer geçmişini yazı dilinin geçmiş zamanıyla anlatmayı öğretir.",
    minutes: 10,
    focusId: "Präteritum",
    vocab: [
      { de: "der Abschluss", tr: "diploma, mezuniyet" },
      { de: "zuständig", tr: "sorumlu, yetkili" },
      { de: "die Ausbildung", tr: "meslek eğitimi" },
      { de: "die Karriere", tr: "kariyer" },
      { de: "die Abteilung", tr: "departman" },
      { de: "beruflich", tr: "mesleki" },
      { de: "die Qualifikation", tr: "nitelik" },
      { de: "die Leistung", tr: "performans" },
    ],
    patterns: [
      { de: "Ich arbeitete …", tr: "geçmişte nerede çalıştığını yazı diliyle söyler" },
      { de: "Danach wechselte ich …", tr: "sonra nereye geçtiğini söyler" },
      { de: "Ich war zuständig für …", tr: "neyden sorumlu olduğunu söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Merhaba! Bugün özgeçmişini anlatmayı öğreneceğiz. Burada yeni bir şey var: Almancada geçmişin iki biçimi var ve hangisini kullanacağın konuştuğun yere göre değişiyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Günlük konuşmada geçmiş iki parçalı kuruluyor, bunu biliyorsun. Ama özgeçmişte, resmî yazışmada ve iş görüşmesinin ciddi kısmında tek parçalı bir biçim kullanılıyor. Düzenli fiillerde kural basit: gövdeye kısa bir ek geliyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "der Abschluss", tr: "diploma, mezuniyet" }),
      word("İkinci", { de: "zuständig", tr: "sorumlu, yetkili" }),
      word("Üçüncü", { de: "die Ausbildung", tr: "meslek eğitimi" }),
      word("Dördüncü", { de: "die Karriere", tr: "kariyer" }),
      word("Beşinci", { de: "die Abteilung", tr: "departman" }),
      word("Altıncı", { de: "beruflich", tr: "mesleki" }),
      word("Yedinci", { de: "die Qualifikation", tr: "nitelik" }, "diploma ve sertifikaların toplamı"),
      word("Son", { de: "die Leistung", tr: "performans" }),
      {
        say: [
          tr("İlk kalıbımız:"),
          de("Ich arbeitete …"),
          tr(
            "'Çalışıyordum, çalıştım' demek. Konuşmada iki parçalı biçimi kullanırsın; burada tek kelime yeter ve bu, yazı dilinin sesidir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Beş yıl bir bankada çalıştım.' Almancası:"),
          de("Ich arbeitete fünf Jahre bei einer Bank."),
          tr("Lütfen"),
          de("Ich arbeitete fünf Jahre bei einer Bank"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich arbeitete fünf Jahre bei einer Bank" },
      },
      {
        say: [tr("Sıra sende: 'Üç yıl bir okulda çalıştım.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich arbeitete drei Jahre an einer Schule",
          hint: [
            tr("Fiil tek kelime kalıyor, gövdeye kısa bir ek geliyor:"),
            de("Ich arbeitete drei Jahre an einer Schule."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız geçişi anlatır:"),
          de("Danach wechselte ich in die Verwaltung."),
          tr("'Sonra idari birime geçtim' demek. Lütfen"),
          de("Danach wechselte ich in die Verwaltung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Danach wechselte ich in die Verwaltung" },
      },
      {
        say: [tr("Şimdi sen: 'Sonra başka bir şirkete geçtim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Danach wechselte ich zu einer anderen Firma",
          hint: [
            tr("Zaman başta olduğu için fiil hemen arkasından gelir:"),
            de("Danach wechselte ich zu einer anderen Firma."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız görevini anlatır:"),
          de("Ich war zuständig für den Einkauf."),
          tr("'Satın almadan sorumluydum' demek. Lütfen"),
          de("Ich war zuständig für den Einkauf"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich war zuständig für den Einkauf" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Danach wechselte ich in eine andere Abteilung."),
          tr("cümlesi doğru mu, yanlış mı? Lütfen 'doğru' ya da 'yanlış' olarak cevapla."),
        ],
        expect: {
          kind: "truefalse",
          statement: "Danach wechselte ich in eine andere Abteilung.",
          answer: true,
          why: [
            tr("Doğru. Zaman ifadesi başta duruyor, tek kelimelik geçmiş biçim ikinci sırada ve özne arkasına geçmiş."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kariyer geçmişini anlatabilirsin. Şimdi bir görüşmecinin karşısındasın ve özgeçmişini adım adım anlatacaksın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir iş görüşmesindesin ve görüşmeci özgeçmişini anlatmanı istiyor. Nerede çalıştığını, ne zaman geçiş yaptığını ve neyden sorumlu olduğunu sırayla anlat.",
      partner: "notlar alan, ayrıntı soran bir insan kaynakları uzmanı",
      opening: "Erzählen Sie uns bitte kurz von Ihrem Werdegang. Wo haben Sie angefangen?",
      openingTr: "Lütfen kariyer yolunuzdan kısaca bahsedin. Nerede başladınız?",
      goal: "Çalıştığın yerler, geçiş zamanların ve sorumlulukların sırayla anlatılmış olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-staerken",
    icon: "star",
    level: "B1",
    course: "de",
    title: "Stärken und Schwächen",
    titleTr: "Güçlü ve zayıf yönler",
    summary: "Çekince belirterek kendini anlatmayı öğretir: bir şey böyle olsa da şu doğru.",
    minutes: 10,
    focusId: "Nebensatz-obwohl",
    vocab: [
      { de: "die Schwäche", tr: "zayıf yön" },
      { de: "obwohl", tr: "-e rağmen" },
      { de: "sich verbessern", tr: "kendini geliştirmek" },
      { de: "die Geduld", tr: "sabır" },
      { de: "ehrlich", tr: "dürüst" },
      { de: "ordentlich", tr: "derli toplu" },
      { de: "kreativ", tr: "yaratıcı" },
      { de: "stolz", tr: "gururlu" },
    ],
    patterns: [
      { de: "Obwohl ich …, …", tr: "çekince belirterek bir şey söyler" },
      { de: "Meine Stärke liegt in …", tr: "güçlü yönünü söyler" },
      { de: "Ich arbeite daran.", tr: "bir eksiği üzerinde çalıştığını söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün iş görüşmesinin en zor sorusuna hazırlanacağız: güçlü ve zayıf yönlerin. İşin sırrı çekince belirtmeyi bilmekte. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bunun için bir bağlaç var ve Türkçedeki 'rağmen' gibi çalışıyor. Ama bir farkı var: Türkçede rağmen kelimesi cümlenin ortasında durur, Almancada bağlaç başa geçer ve fiili cümlenin sonuna atar. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "die Schwäche", tr: "zayıf yön" }),
      word("İkinci", { de: "obwohl", tr: "-e rağmen" }),
      word("Üçüncü", { de: "sich verbessern", tr: "kendini geliştirmek" }),
      word("Dördüncü", { de: "die Geduld", tr: "sabır" }),
      word("Beşinci", { de: "ehrlich", tr: "dürüst" }),
      word("Altıncı", { de: "ordentlich", tr: "derli toplu" }),
      word("Yedinci", { de: "kreativ", tr: "yaratıcı" }),
      word("Son", { de: "stolz", tr: "gururlu" }),
      {
        say: [
          tr(
            "Şimdi kural. Bağlaç cümlenin başına gelir ve o bölümün fiili en sona düşer. Virgülden sonra ana cümle gelir ve orada fiil hemen başta olur, çünkü baştaki bölüm birinci öğe sayılır.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Yeni olmama rağmen çok bağımsız çalışıyorum.' Almancası:"),
          de("Obwohl ich neu bin, arbeite ich sehr selbstständig."),
          tr("Lütfen"),
          de("Obwohl ich neu bin, arbeite ich sehr selbstständig"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Obwohl ich neu bin, arbeite ich sehr selbstständig",
        },
      },
      {
        say: [tr("Sıra sende: 'Genç olmama rağmen çok deneyimim var.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Obwohl ich jung bin, habe ich viel Erfahrung",
          hint: [
            tr("Bağlaçtan sonra fiil sona düşer, virgülden sonra fiil öne geçer:"),
            de("Obwohl ich jung bin, habe ich viel Erfahrung."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız güçlü yönünü söyler:"),
          de("Meine Stärke liegt in der Organisation."),
          tr("'Güçlü yönüm organizasyon' demek. Lütfen"),
          de("Meine Stärke liegt in der Organisation"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Meine Stärke liegt in der Organisation" },
      },
      {
        say: [tr("Şimdi sen: 'Zayıf yönüm üzerinde çalışıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich arbeite an meiner Schwäche",
          hint: [
            tr("Bu fiil bir edatla kullanılır ve arkasından gelen kelime hâl değiştirir:"),
            de("Ich arbeite an meiner Schwäche."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Kısa bir kalıp daha:"),
          de("Ich bin sehr belastbar und geduldig."),
          tr("Lütfen"),
          de("Ich bin sehr belastbar und geduldig"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bin sehr belastbar und geduldig" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Obwohl ich bin jung, habe ich viel Erfahrung."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Obwohl ich bin jung, habe ich viel Erfahrung.",
          answer: false,
          why: [
            tr("Bu bağlaçtan sonra fiil cümlenin sonuna düşmeli. Doğrusu"),
            de("Obwohl ich jung bin, habe ich viel Erfahrung."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık çekince belirterek kendini anlatabilirsin. Şimdi görüşmeci sana o zor soruyu soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İş görüşmesinde güçlü ve zayıf yönlerin soruluyor. Güçlü yönünü söyle, zayıf yönünü çekince belirterek anlat ve üzerinde çalıştığını ekle.",
      partner: "doğrudan soru soran ama önyargısız bir görüşmeci",
      opening: "Kommen wir zu einer klassischen Frage: Was sind Ihre Stärken und Schwächen?",
      openingTr: "Klasik bir soruya gelelim: Güçlü ve zayıf yönleriniz neler?",
      goal: "Güçlü yönün, zayıf yönün ve o zayıflık üzerinde ne yaptığın anlatılmış olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-anschreiben",
    icon: "idea",
    level: "B1",
    course: "de",
    title: "Warum gerade Sie?",
    titleTr: "Motivasyon anlatma",
    summary: "Amaç bildiren cümlelerle neden başvurduğunu anlatmayı öğretir.",
    minutes: 10,
    focusId: "Um-zu",
    vocab: [
      { de: "überzeugen", tr: "ikna etmek" },
      { de: "die Motivation", tr: "motivasyon" },
      { de: "die Herausforderung", tr: "meydan okuma, zorlu görev" },
      { de: "entwickeln", tr: "geliştirmek" },
      { de: "die Zusammenarbeit", tr: "iş birliği" },
      { de: "begeistert", tr: "hevesli, hayran" },
      { de: "bereit", tr: "hazır" },
      { de: "der Erfolg", tr: "başarı" },
    ],
    patterns: [
      { de: "Ich bewerbe mich, um … zu …", tr: "başvurma amacını söyler" },
      { de: "Mein Ziel ist es, … zu …", tr: "hedefini söyler" },
      { de: "Ich möchte Sie überzeugen.", tr: "ikna etme niyetini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün amaç bildirmeyi öğreneceğiz: bir şeyi neden yaptığını söylemek. Türkçede bunun için tek bir ek var, Almancada cümle ikiye bölünüyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede 'öğrenmek için' dersin ve iş biter. Almancada iki parça gerekiyor: başta bir bağlaç, sonda mastar. Aradaki her şey ortada kalıyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "überzeugen", tr: "ikna etmek" }),
      word("İkinci", { de: "die Motivation", tr: "motivasyon" }),
      word("Üçüncü", { de: "die Herausforderung", tr: "meydan okuma, zorlu görev" }),
      word("Dördüncü", { de: "entwickeln", tr: "geliştirmek" }),
      word("Beşinci", { de: "die Zusammenarbeit", tr: "iş birliği" }),
      word("Altıncı", { de: "begeistert", tr: "hevesli, hayran" }),
      word("Yedinci", { de: "bereit", tr: "hazır" }),
      word("Son", { de: "der Erfolg", tr: "başarı" }),
      {
        say: [
          tr(
            "Şimdi kural. Amaç bölümü virgülle başlar, bağlaç en başa gelir ve mastar en sona. İkiye bölünen bir fiil kullanıyorsan mastar işareti fiilin ortasına giriyor — geçmiş zamandaki gibi.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Kendimi geliştirmek için başvuruyorum.' Almancası:"),
          de("Ich bewerbe mich, um mich weiterzuentwickeln."),
          tr("Lütfen"),
          de("Ich bewerbe mich, um mich weiterzuentwickeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich bewerbe mich, um mich weiterzuentwickeln" },
      },
      {
        say: [tr("Sıra sende: 'Yeni şeyler öğrenmek için başvuruyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bewerbe mich, um Neues zu lernen",
          hint: [
            tr("Bağlaç başta, mastar en sonda, mastar işareti onun hemen önünde:"),
            de("Ich bewerbe mich, um Neues zu lernen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız hedefini söyler:"),
          de("Mein Ziel ist es, im Team zu arbeiten."),
          tr("'Hedefim takım içinde çalışmak' demek. Lütfen"),
          de("Mein Ziel ist es, im Team zu arbeiten"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Mein Ziel ist es, im Team zu arbeiten" },
      },
      {
        say: [tr("Şimdi sen: 'Sizi ikna etmek istiyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich möchte Sie überzeugen",
          hint: [
            tr("Burada amaç bölümü yok; asıl fiil doğrudan sona gidiyor:"),
            de("Ich möchte Sie überzeugen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Ich suche eine neue Herausforderung."),
          tr("'Yeni bir zorluk arıyorum' demek — başvurularda çok kullanılır. Lütfen"),
          de("Ich suche eine neue Herausforderung"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich suche eine neue Herausforderung" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Mein Ziel ist es, zu arbeiten im Team."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Mein Ziel ist es, zu arbeiten im Team.",
          answer: false,
          why: [
            tr("Mastar bölümünde fiil en sona gitmeli, ortada kalamaz. Doğrusu"),
            de("Mein Ziel ist es, im Team zu arbeiten."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık neden başvurduğunu anlatabilirsin. Şimdi görüşmeci sana doğrudan soracak: neden tam olarak sen?",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Görüşmede neden bu işi istediğin soruluyor. Başvurma amacını, hedefini ve seni neyin çektiğini amaç bildiren cümlelerle anlat.",
      partner: "gerekçe duymak isteyen, ikna olmaya açık bir bölüm yöneticisi",
      opening: "Warum bewerben Sie sich gerade bei uns? Was ist Ihre Motivation?",
      openingTr: "Neden tam da bize başvuruyorsunuz? Motivasyonunuz ne?",
      goal: "Başvurma amacın, hedefin ve seni bu işe çeken şey anlatılmış olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-probearbeit",
    icon: "job",
    level: "B1",
    course: "de",
    title: "Der erste Arbeitstag",
    titleTr: "İlk iş günü",
    summary: "Dolaylı soruyla kibarca bilgi istemeyi öğretir.",
    minutes: 10,
    focusId: "Indirekte-Frage",
    vocab: [
      { de: "sich wenden", tr: "başvurmak, birine yönelmek" },
      { de: "unsicher", tr: "emin olmayan" },
      { de: "der Praktikant", tr: "stajyer" },
      { de: "die Kollegin", tr: "kadın meslektaş" },
      { de: "das Personal", tr: "personel" },
      { de: "die Besprechung", tr: "toplantı" },
      { de: "die Organisation", tr: "organizasyon, düzen" },
      { de: "die Kommunikation", tr: "iletişim" },
    ],
    patterns: [
      { de: "Können Sie mir zeigen, wie …?", tr: "bir şeyin nasıl yapıldığını kibarca sorar" },
      { de: "Ich weiß noch nicht, wo …", tr: "bilmediğini kibarca söyler" },
      { de: "An wen wende ich mich?", tr: "kime başvuracağını sorar" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün ilk iş gününde işine yarayacak bir şey öğreneceğiz: soruyu doğrudan sormak yerine bir cümlenin içine gömmek. Bu, Almancada kibarlığın en sık yolu. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede soruyu olduğu gibi gömersin: 'nerede olduğunu biliyorum'. Almancada da gömülür ama bir şey değişir — soru kelimesi bağlaca dönüşür ve fiil cümlenin sonuna düşer. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "sich wenden", tr: "başvurmak, birine yönelmek" }),
      word("İkinci", { de: "unsicher", tr: "emin olmayan" }),
      word("Üçüncü", { de: "der Praktikant", tr: "stajyer" }, "kadın biçimi -in ekiyle kurulur"),
      word("Dördüncü", { de: "die Kollegin", tr: "kadın meslektaş" }),
      word("Beşinci", { de: "das Personal", tr: "personel" }),
      word("Altıncı", { de: "die Besprechung", tr: "toplantı" }),
      word("Yedinci", { de: "die Organisation", tr: "organizasyon, düzen" }),
      word("Son", { de: "die Kommunikation", tr: "iletişim" }),
      {
        say: [
          tr(
            "Şimdi kural. Doğrudan soruda fiil başta durur. Soruyu bir cümlenin içine gömdüğünde fiil en sona gider ve soru kelimesi bağlaç görevini üstlenir.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Bunun nasıl çalıştığını bana gösterebilir misiniz?' Almancası:"),
          de("Können Sie mir zeigen, wie das funktioniert?"),
          tr("Lütfen"),
          de("Können Sie mir zeigen, wie das funktioniert"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Können Sie mir zeigen, wie das funktioniert" },
      },
      {
        say: [tr("Sıra sende: 'Bunu nerede bulacağımı bilmiyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich weiß nicht, wo ich das finde",
          hint: [
            tr("Gömülü bölümde fiil en sona gider:"),
            de("Ich weiß nicht, wo ich das finde."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız doğrudan bir soru:"),
          de("An wen wende ich mich?"),
          tr("'Kime başvurayım?' demek. Lütfen"),
          de("An wen wende ich mich"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "An wen wende ich mich" },
      },
      {
        say: [tr("Şimdi aynı soruyu gömelim: 'Kime başvuracağımı bilmiyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich weiß nicht, an wen ich mich wende",
          hint: [
            tr("Gömülünce fiil sona düşer, dönüşlü zamir onun önünde kalır:"),
            de("Ich weiß nicht, an wen ich mich wende."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Die Einarbeitung dauert zwei Wochen."),
          tr("'Alıştırma dönemi iki hafta sürüyor' demek. Lütfen"),
          de("Die Einarbeitung dauert zwei Wochen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Einarbeitung dauert zwei Wochen" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Können Sie mir sagen, wo mein Platz ist?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Können Sie mir sagen, wo mein Platz ist?",
          answer: true,
          why: [
            tr("Doğru. Ana bölümde fiil başta, gömülü bölümde ise en sonda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık kibarca bilgi isteyebilirsin. Şimdi ilk günündesin ve sana yol gösteren bir iş arkadaşın var.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İlk iş günündesin ve bir iş arkadaşın sana yardımcı oluyor. Bilmediğin şeyleri gömülü soru kalıbıyla sor ve kime başvuracağını öğren.",
      partner: "sabırlı, her şeyi göstermeye hazır bir iş arkadaşı",
      opening: "Willkommen im Team! Haben Sie schon Fragen zum Ablauf?",
      openingTr: "Ekibe hoş geldiniz! İşleyişle ilgili sorunuz var mı?",
      goal: "Bilmediğin şeyler sorulmuş ve kime başvuracağın öğrenilmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-b1-arbeitszeiten",
    icon: "clock",
    level: "B1",
    course: "de",
    title: "Gleitzeit und Überstunden",
    titleTr: "Mesai düzeni",
    summary: "Esnek çalışma düzenini koşul cümleleriyle anlatmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-wenn",
    vocab: [
      { de: "die Überstunde", tr: "fazla mesai" },
      { de: "flexibel", tr: "esnek" },
      { de: "der Feierabend", tr: "iş çıkışı" },
      { de: "die Vollzeit", tr: "tam zamanlı çalışma" },
      { de: "die Erholung", tr: "dinlenme" },
      { de: "der Antrag", tr: "dilekçe, başvuru" },
      { de: "gelten", tr: "geçerli olmak" },
      { de: "regelmäßig", tr: "düzenli" },
    ],
    patterns: [
      { de: "Wenn ich früher anfange, …", tr: "koşula bağlı sonucu söyler" },
      { de: "Überstunden werden ausgeglichen.", tr: "fazla mesainin telafi edildiğini söyler" },
      { de: "Die Kernzeit ist von … bis …", tr: "zorunlu saatleri söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün Almanya'da çok yaygın bir çalışma düzenini konuşacağız: esnek mesai. Bunu anlatmak için koşul cümlesi gerekiyor ve o cümle fiili sona atıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Bu düzeni bilmek iş görüşmesinde de sözleşme okurken de lazım. Kelimelerin çoğu birleşik, yani parçalarını tanıyınca anlamı kendiliğinden çıkıyor. Önce onları öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "die Überstunde", tr: "fazla mesai" }),
      word("İkinci", { de: "flexibel", tr: "esnek" }),
      word("Üçüncü", { de: "der Feierabend", tr: "iş çıkışı" }),
      word("Dördüncü", { de: "die Vollzeit", tr: "tam zamanlı çalışma" }, "yarım gün çalışmanın karşıtı"),
      word("Beşinci", { de: "die Erholung", tr: "dinlenme" }),
      word("Altıncı", { de: "der Antrag", tr: "dilekçe, başvuru" }),
      word("Yedinci", { de: "gelten", tr: "geçerli olmak" }),
      word("Son", { de: "regelmäßig", tr: "düzenli" }),
      {
        say: [
          tr("İlk kalıbımız koşul kurar. Örnek: 'Erken başlarsam erken çıkabilirim.'"),
          de("Wenn ich früher anfange, kann ich früher gehen."),
          tr("Koşul bölümünde fiil sonda, ana bölümde hemen virgülden sonra. Lütfen"),
          de("Wenn ich früher anfange, kann ich früher gehen"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Wenn ich früher anfange, kann ich früher gehen",
        },
      },
      {
        say: [tr("Sıra sende: 'Fazla mesai yaparsam izin alıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wenn ich Überstunden mache, bekomme ich frei",
          hint: [
            tr("Koşul bölümünde fiil sonda, virgülden sonra fiil öne geçer:"),
            de("Wenn ich Überstunden mache, bekomme ich frei."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız sözleşmelerde geçer:"),
          de("Überstunden werden ausgeglichen."),
          tr("'Fazla mesai telafi edilir' demek. Lütfen"),
          de("Überstunden werden ausgeglichen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Überstunden werden ausgeglichen" },
      },
      {
        say: [tr("Şimdi sen: 'Çalışma saatlerimiz esnek.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Unsere Arbeitszeiten sind flexibel",
          hint: [
            tr("Çoğul özneyle fiil de çoğul biçimini alır:"),
            de("Unsere Arbeitszeiten sind flexibel."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız saatleri söyler:"),
          de("Die Kernzeit ist von neun bis fünfzehn Uhr."),
          tr("Lütfen"),
          de("Die Kernzeit ist von neun bis fünfzehn Uhr"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Kernzeit ist von neun bis fünfzehn Uhr" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wenn ich früher anfange, ich kann früher gehen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wenn ich früher anfange, ich kann früher gehen.",
          answer: false,
          why: [
            tr("Koşul bölümü birinci öğe sayılır, o yüzden virgülden sonra fiil öne geçmeli. Doğrusu"),
            de("Wenn ich früher anfange, kann ich früher gehen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık mesai düzenini konuşabilirsin. Şimdi yeni işinde çalışma saatlerini öğreneceksin.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yeni işinde çalışma saatlerini konuşuyorsun. Esnek mesainin nasıl işlediğini sor, fazla mesainin ne olduğunu öğren ve kendi tercihini koşul cümleleriyle anlat.",
      partner: "düzeni ayrıntılı anlatan bir takım lideri",
      opening: "Bei uns gibt es Gleitzeit. Wissen Sie schon, wie das funktioniert?",
      openingTr: "Bizde esnek mesai var. Nasıl işlediğini biliyor musunuz?",
      goal: "Esnek mesainin işleyişi ve fazla mesai öğrenilmiş, kendi tercihin söylenmiş olur.",
      minTurns: 8,
    },
  },
  {
    id: "de-b1-gehalt",
    icon: "money",
    level: "B1",
    course: "de",
    title: "Über das Gehalt sprechen",
    titleTr: "Maaş konuşması",
    summary: "Maaşı kibar biçimlerle konuşmayı öğretir; nezaketin dilbilgisini gösterir.",
    minutes: 10,
    focusId: "Konjunktiv-II",
    vocab: [
      { de: "das Gehalt", tr: "maaş" },
      { de: "der Lohn", tr: "ücret" },
      { de: "das Einkommen", tr: "gelir" },
      { de: "erhöhen", tr: "artırmak" },
      { de: "fordern", tr: "talep etmek" },
      { de: "die Kosten", tr: "masraf" },
      { de: "die Steuer", tr: "vergi" },
      { de: "die Rente", tr: "emekli maaşı" },
    ],
    patterns: [
      { de: "Ich hätte gern …", tr: "kibarca bir talep söyler" },
      { de: "Wäre … möglich?", tr: "bir şeyin mümkün olup olmadığını kibarca sorar" },
      { de: "Ich stelle mir … vor", tr: "aklındaki rakamı söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün maaş konuşmasını öğreneceğiz. Burada nezaket bir ton meselesi değil, dilbilgisi meselesi: fiilin biçimi değişiyor ve cümle yumuşuyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Türkçede ricayı sesinle yumuşatırsın. Almancada bunu yapamazsın; fiilin ayrı bir biçimi var ve o biçim olmadan cümle sert duyulur. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "das Gehalt", tr: "maaş" }),
      word("İkinci", { de: "der Lohn", tr: "ücret" }, "saat başı ödenen ücret; aylık sabit olanı maaş"),
      word("Üçüncü", { de: "das Einkommen", tr: "gelir" }),
      word("Dördüncü", { de: "erhöhen", tr: "artırmak" }),
      word("Beşinci", { de: "fordern", tr: "talep etmek" }),
      word("Altıncı", { de: "die Kosten", tr: "masraf" }, "hep çoğul kullanılır"),
      word("Yedinci", { de: "die Steuer", tr: "vergi" }),
      word("Son", { de: "die Rente", tr: "emekli maaşı" }),
      {
        say: [
          tr("İlk kalıbımız kibar talep:"),
          de("Ich hätte gern ein höheres Gehalt."),
          tr("'Daha yüksek bir maaş isterim' demek. Fiilin yumuşak biçimi kullanılıyor. Lütfen"),
          de("Ich hätte gern ein höheres Gehalt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich hätte gern ein höheres Gehalt" },
      },
      {
        say: [tr("Sıra sende: 'Bu mümkün olur muydu?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Wäre das möglich",
          hint: [
            tr("Fiilin yumuşak biçimi başa geçiyor:"),
            de("Wäre das möglich?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız rakam söyler:"),
          de("Ich stelle mir vierzigtausend Euro brutto vor."),
          tr("'Aklımda kırk bin euro brüt var' demek. Lütfen"),
          de("Ich stelle mir vierzigtausend Euro brutto vor"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich stelle mir vierzigtausend Euro brutto vor" },
      },
      {
        say: [tr("Şimdi sen: 'Bunu makul buluyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich finde das angemessen",
          hint: [
            tr("Önce fiil, sonra neyi değerlendirdiğin, sonra değerlendirme:"),
            de("Ich finde das angemessen."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Können wir darüber verhandeln?"),
          tr("'Bunu konuşabilir miyiz?' demek. Lütfen"),
          de("Können wir darüber verhandeln"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Können wir darüber verhandeln" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Wäre eine Erhöhung möglich?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Wäre eine Erhöhung möglich?",
          answer: true,
          why: [
            tr("Doğru. Fiilin yumuşak biçimi soruda başa geçiyor ve cümleyi kibarlaştırıyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık maaş konuşabilirsin. Şimdi görüşmenin o kısmındasın: beklentin soruluyor.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "İş görüşmesinde maaş beklentin soruluyor. Rakamını kibar biçimlerle söyle, pazarlık alanı olup olmadığını sor ve makul bulduğunu belirt.",
      partner: "bütçesi belli ama esnekliği olan bir işveren",
      opening: "Sprechen wir über das Gehalt. Welche Vorstellung haben Sie?",
      openingTr: "Maaş konusunu konuşalım. Beklentiniz nedir?",
      goal: "Maaş beklentin söylenmiş, pazarlık alanı sorulmuş ve bir aralıkta anlaşılmış olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-absage-bewerbung",
    icon: "mail",
    level: "B1",
    course: "de",
    title: "Die Absage",
    titleTr: "Ret ve yeni deneme",
    summary: "İki geçmiş olayı sıralamayı öğretir: önce olan bitmiş, sonra olan onun üstüne gelmiş.",
    minutes: 10,
    focusId: "Plusquamperfekt",
    vocab: [
      { de: "nachdem", tr: "-dikten sonra" },
      { de: "der Versuch", tr: "deneme" },
      { de: "melden", tr: "bildirmek, haber vermek" },
      { de: "die Absage", tr: "ret cevabı" },
      { de: "die Enttäuschung", tr: "hayal kırıklığı" },
      { de: "die Hoffnung", tr: "umut" },
      { de: "aufgeben", tr: "pes etmek" },
      { de: "das Pech", tr: "şanssızlık" },
    ],
    patterns: [
      { de: "Nachdem ich … geschickt hatte, …", tr: "önce olan olayı geriye alır" },
      { de: "Leider hat es nicht geklappt.", tr: "olmadığını kibarca söyler" },
      { de: "Ich versuche es weiter.", tr: "denemeye devam edeceğini söyler" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün iki geçmiş olayı sıralamayı öğreneceğiz. Türkçede '-dikten sonra' der ve geçersin; Almancada önce olan olay için ayrı bir geçmiş biçimi kullanılıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Mantığı şu: iki olaydan hangisinin daha önce olduğunu göstermek için, önceki olay bir kat daha geriye çekiliyor. Yardımcı fiilin kendisi de geçmiş biçimine giriyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "nachdem", tr: "-dikten sonra" }),
      word("İkinci", { de: "der Versuch", tr: "deneme" }),
      word("Üçüncü", { de: "melden", tr: "bildirmek, haber vermek" }, "dönüşlü kullanıldığında 'dönüş yapmak' demek"),
      word("Dördüncü", { de: "die Absage", tr: "ret cevabı" }),
      word("Beşinci", { de: "die Enttäuschung", tr: "hayal kırıklığı" }),
      word("Altıncı", { de: "die Hoffnung", tr: "umut" }),
      word("Yedinci", { de: "aufgeben", tr: "pes etmek" }),
      word("Son", { de: "das Pech", tr: "şanssızlık" }),
      {
        say: [
          tr("İlk örneğimiz. 'Başvuruyu gönderdikten sonra üç hafta bekledim.' Almancası:"),
          de("Nachdem ich die Bewerbung geschickt hatte, wartete ich drei Wochen."),
          tr("Önceki olayda yardımcı fiil de geçmişe girdi. Lütfen"),
          de("Nachdem ich die Bewerbung geschickt hatte, wartete ich drei Wochen"),
          tr("deyin."),
        ],
        expect: {
          kind: "repeat",
          target: "Nachdem ich die Bewerbung geschickt hatte, wartete ich drei Wochen",
        },
      },
      {
        say: [tr("Sıra sende: 'Ret cevabını aldıktan sonra tekrar denedim.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Nachdem ich die Absage bekommen hatte, versuchte ich es wieder",
          hint: [
            tr("Önceki olayda yardımcı fiil geçmiş biçimini alır ve bölümün sonunda durur:"),
            de("Nachdem ich die Absage bekommen hatte, versuchte ich es wieder."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız kibar bir kabullenme:"),
          de("Leider hat es nicht geklappt."),
          tr("'Maalesef olmadı' demek. Lütfen"),
          de("Leider hat es nicht geklappt"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Leider hat es nicht geklappt" },
      },
      {
        say: [tr("Şimdi sen: 'Denemeye devam ediyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich versuche es weiter",
          hint: [
            tr("Devam bildiren kelime cümlenin sonuna gelir:"),
            de("Ich versuche es weiter."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Die Firma hat sich nicht mehr gemeldet."),
          tr("'Şirket bir daha dönüş yapmadı' demek. Lütfen"),
          de("Die Firma hat sich nicht mehr gemeldet"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Firma hat sich nicht mehr gemeldet" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Nachdem ich die Bewerbung geschickt habe, wartete ich drei Wochen."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Nachdem ich die Bewerbung geschickt habe, wartete ich drei Wochen.",
          answer: false,
          why: [
            tr("Önce olan olay bir kat daha geriye çekilmeli, yani yardımcı fiil de geçmiş biçimini almalı. Doğrusu"),
            de("Nachdem ich die Bewerbung geschickt hatte, wartete ich drei Wochen."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık iki geçmiş olayı sıralayabilirsin. Şimdi bir arkadaşın başvurunun nasıl gittiğini soracak.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir arkadaşın başvurunun sonucunu soruyor ve ret geldi. Sürecin nasıl işlediğini sırayla anlat, ne hissettiğini söyle ve bundan sonra ne yapacağını belirt.",
      partner: "moral vermeye çalışan yakın bir arkadaş",
      opening: "Und? Hast du schon eine Antwort auf deine Bewerbung bekommen?",
      openingTr: "Ee? Başvurundan cevap geldi mi?",
      goal: "Sürecin nasıl işlediği anlatılmış, ne hissettiğin söylenmiş ve bundan sonraki adımın belirtilmiş olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-kuendigung",
    icon: "office",
    level: "B1",
    course: "de",
    title: "Ich kündige",
    titleTr: "İstifa",
    summary: "İşten ayrılma kararını gerekçesiyle birlikte anlatmayı öğretir.",
    minutes: 10,
    focusId: "Nebensatz-weil",
    vocab: [
      { de: "die Frist", tr: "süre, ihbar süresi" },
      { de: "kündigen", tr: "istifa etmek" },
      { de: "entlassen", tr: "işten çıkarmak" },
      { de: "die Bedingung", tr: "şart" },
      { de: "der Auftrag", tr: "görev" },
      { de: "die Sorge", tr: "endişe" },
      { de: "entscheiden", tr: "karar vermek" },
      { de: "das Verhältnis", tr: "ilişki" },
    ],
    patterns: [
      { de: "Ich kündige, weil …", tr: "ayrılma gerekçesini söyler" },
      { de: "zum nächsten Monat", tr: "ne zaman ayrılacağını söyler" },
      { de: "Ich bitte um ein Arbeitszeugnis.", tr: "çalışma belgesi ister" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bugün işten ayrılmayı konuşacağız. Almanya'da bu tamamen kurallı bir süreç ve doğru kelimelerle söylemek işini kolaylaştırıyor. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Gerekçe bildiren bağlacı biliyorsun ve o da fiili sona atıyor. Bugün onu ciddi bir konuşmada kullanacağız. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "die Frist", tr: "süre, ihbar süresi" }),
      word("İkinci", { de: "kündigen", tr: "istifa etmek" }),
      word("Üçüncü", { de: "entlassen", tr: "işten çıkarmak" }, "işveren yapar; çalışanın kendi ayrılması bu değil"),
      word("Dördüncü", { de: "die Bedingung", tr: "şart" }),
      word("Beşinci", { de: "der Auftrag", tr: "görev" }),
      word("Altıncı", { de: "die Sorge", tr: "endişe" }),
      word("Yedinci", { de: "entscheiden", tr: "karar vermek" }),
      word("Son", { de: "das Verhältnis", tr: "ilişki" }),
      {
        say: [
          tr("İlk kalıbımız gerekçeyi söyler:"),
          de("Ich kündige, weil ich eine neue Stelle habe."),
          tr("'İstifa ediyorum çünkü yeni bir işim var' demek; gerekçede fiil sonda. Lütfen"),
          de("Ich kündige, weil ich eine neue Stelle habe"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich kündige, weil ich eine neue Stelle habe" },
      },
      {
        say: [tr("Sıra sende: 'İstifa ediyorum çünkü başka şehre taşınıyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich kündige, weil ich in eine andere Stadt ziehe",
          hint: [
            tr("Gerekçe bölümünde fiil en sona gider:"),
            de("Ich kündige, weil ich in eine andere Stadt ziehe."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız tarihi söyler:"),
          de("Ich kündige zum nächsten Monat."),
          tr("'Gelecek aydan itibaren ayrılıyorum' demek. Lütfen"),
          de("Ich kündige zum nächsten Monat"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Ich kündige zum nächsten Monat" },
      },
      {
        say: [tr("Şimdi sen: 'Bir çalışma belgesi rica ediyorum.' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Ich bitte um ein Arbeitszeugnis",
          hint: [
            tr("Bu fiil bir edatla kullanılır ve arkasından gelen kelime belirtme hâline girer:"),
            de("Ich bitte um ein Arbeitszeugnis."),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Bir cümle daha:"),
          de("Die Kündigung muss schriftlich sein."),
          tr("'Fesih yazılı olmak zorunda' demek. Lütfen"),
          de("Die Kündigung muss schriftlich sein"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Die Kündigung muss schriftlich sein" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Ich kündige, weil ich eine neue Stelle habe."),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Ich kündige, weil ich eine neue Stelle habe.",
          answer: true,
          why: [
            tr("Doğru. Gerekçe bölümünde fiil cümlenin sonunda duruyor."),
          ],
        },
      },
      {
        say: [
          tr(
            "Artık ayrılma konuşmasını yapabilirsin. Şimdi yöneticinin karşısındasın.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Yöneticine istifa ettiğini söylüyorsun. Gerekçeni açıkla, ne zaman ayrılacağını belirt ve çalışma belgesi iste.",
      partner: "gitmeni istemeyen ama anlayışlı bir yönetici",
      opening: "Sie wollten mit mir sprechen? Worum geht es denn?",
      openingTr: "Benimle konuşmak mı istiyordunuz? Konu nedir?",
      goal: "İstifa gerekçen açıklanmış, ayrılış tarihi kararlaşmış ve çalışma belgesi istenmiş olur.",
      minTurns: 9,
    },
  },
  {
    id: "de-b1-networking",
    icon: "handshake",
    level: "B1",
    course: "de",
    title: "Auf der Jobmesse",
    titleTr: "Kariyer fuarı",
    summary: "Tanımadığın biriyle iş konuşması başlatmayı ve kibarca soru sormayı öğretir.",
    minutes: 10,
    focusId: "Indirekte-Frage",
    vocab: [
      { de: "sich beschäftigen", tr: "bir işle uğraşmak" },
      { de: "die Branche", tr: "sektör" },
      { de: "der Kontakt", tr: "bağlantı, temas" },
      { de: "die Verbindung", tr: "bağlantı" },
      { de: "ansprechen", tr: "konuşmaya başlamak" },
      { de: "die Visitenkarte", tr: "kartvizit" },
      { de: "die Unterhaltung", tr: "sohbet" },
      { de: "der Direktor", tr: "müdür" },
    ],
    patterns: [
      { de: "Darf ich fragen, ob …?", tr: "izin isteyerek soru sorar" },
      { de: "Womit beschäftigt sich …?", tr: "bir şirketin ne işle uğraştığını sorar" },
      { de: "Hier ist meine Nummer.", tr: "iletişim bilgisini verir" },
    ],
    lecture: [
      {
        say: [
          tr(
            "Bu modülün son dersi. Bugün tanımadığın biriyle iş konuşması başlatmayı öğreneceğiz. En işe yarayan şey soruyu izin isteyerek sormak. Hazır mısın?",
          ),
        ],
        expect: { kind: "confirm" },
      },
      {
        say: [
          tr(
            "Gömülü soru kalıbını biliyorsun. Bugün ona bir şey ekleyeceğiz: evet-hayır sorusu gömüldüğünde araya özel bir bağlaç giriyor. Önce kelimeleri öğrenelim.",
          ),
        ],
      },
      word("İlk", { de: "sich beschäftigen", tr: "bir işle uğraşmak" }),
      word("İkinci", { de: "die Branche", tr: "sektör" }),
      word("Üçüncü", { de: "der Kontakt", tr: "bağlantı, temas" }),
      word("Dördüncü", { de: "die Verbindung", tr: "bağlantı" }, "insan bağlantısı da, ulaşım bağlantısı da"),
      word("Beşinci", { de: "ansprechen", tr: "konuşmaya başlamak" }),
      word("Altıncı", { de: "die Visitenkarte", tr: "kartvizit" }),
      word("Yedinci", { de: "die Unterhaltung", tr: "sohbet" }),
      word("Son", { de: "der Direktor", tr: "müdür" }),
      {
        say: [
          tr(
            "Şimdi kural. Evet-hayır sorusunu gömerken soru kelimesi olmadığı için araya ayrı bir bağlaç konuyor ve fiil yine cümlenin sonuna gidiyor.",
          ),
        ],
      },
      {
        say: [
          tr("Örnek: 'Hâlâ eleman arıyor musunuz diye sorabilir miyim?' Almancası:"),
          de("Darf ich fragen, ob Sie noch Leute suchen?"),
          tr("Lütfen"),
          de("Darf ich fragen, ob Sie noch Leute suchen"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Darf ich fragen, ob Sie noch Leute suchen" },
      },
      {
        say: [tr("Sıra sende: 'Staj sunuyor musunuz diye sorabilir miyim?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Darf ich fragen, ob Sie Praktika anbieten",
          hint: [
            tr("Gömülü evet-hayır sorusunda bağlaç öne, fiil sona gider:"),
            de("Darf ich fragen, ob Sie Praktika anbieten?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("İkinci kalıbımız şirketi sorar:"),
          de("Womit beschäftigt sich Ihre Firma?"),
          tr("'Şirketiniz ne işle uğraşıyor?' demek. Lütfen"),
          de("Womit beschäftigt sich Ihre Firma"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Womit beschäftigt sich Ihre Firma" },
      },
      {
        say: [tr("Şimdi sen: 'Numaralarımızı paylaşabilir miyiz?' demek için ne dersin?")],
        expect: {
          kind: "produce",
          target: "Können wir Nummern austauschen",
          hint: [
            tr("Asıl fiil çekilmeden cümlenin sonunda kalır:"),
            de("Können wir Nummern austauschen?"),
            tr("Tekrar dene."),
          ],
        },
      },
      {
        say: [
          tr("Son kalıbımız kısa ve işe yarar:"),
          de("Hier ist meine Nummer."),
          tr("Lütfen"),
          de("Hier ist meine Nummer"),
          tr("deyin."),
        ],
        expect: { kind: "repeat", target: "Hier ist meine Nummer" },
      },
      {
        say: [
          tr("Son bir doğru-yanlış alıştırması:"),
          de("Darf ich fragen, ob suchen Sie noch Leute?"),
          tr("cümlesi doğru mu, yanlış mı?"),
        ],
        expect: {
          kind: "truefalse",
          statement: "Darf ich fragen, ob suchen Sie noch Leute?",
          answer: false,
          why: [
            tr("Gömülü bölümde fiil başta duramaz, sona gitmeli. Doğrusu"),
            de("Darf ich fragen, ob Sie noch Leute suchen?"),
          ],
        },
      },
      {
        say: [
          tr(
            "Modülü bitirdin. Şimdi bir kariyer fuarındasın ve bir şirket standına yaklaşıyorsun.",
          ),
        ],
      },
    ],
    roleplay: {
      scene:
        "Bir kariyer fuarında şirket standındasın. Kendini tanıt, şirketin ne iş yaptığını ve eleman arayıp aramadığını kibarca sor, sonunda iletişim bilgisi paylaş.",
      partner: "günde yüz kişiyle konuşan, enerjik bir stand görevlisi",
      opening: "Hallo! Interessieren Sie sich für unsere Firma?",
      openingTr: "Merhaba! Şirketimizle ilgileniyor musunuz?",
      goal: "Şirketin ne yaptığı ve eleman arayıp aramadığı öğrenilmiş, iletişim bilgisi paylaşılmış olur.",
      minTurns: 8,
    },
  },
];
