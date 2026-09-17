import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 4 · Çevre ve toplum.
 *
 * ÖLÇÜLEN ŞEY: bir bilgi metninden kendini ilgilendiren şartları ve yasakları
 * seçmek (`muss allerdings`, `darf nicht`); bir sokak röportajında üç kişinin
 * görüşünü ve KOŞULLU katılımı ayırmak. Dilbilgisi: modal fiilli edilgen,
 * `trotz`/`obwohl` ayrımı, `während` + Genitiv.
 *
 * ARALIKLI TEKRAR: `w04-g1` W2'nin `passiv.praesens` hedefine modal fiille
 * dönüyor; `w04-g4` W3'ün `relativsatz.nominativ` hedefini, cümle başındaki tekil
 * ismin (`Verein`) YANLIŞ öncül olduğu bir cümlede yokluyor; `w04-g2`/`w04-g5` W2'nin
 * `genitiv.praeposition` hedefini başka iki edatla sınıyor.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w04-g2` (`trotz`/`obwohl`): Türkçede `-e rağmen` hem isimle hem fiille
 *    aynı (`yağmura rağmen`, `yağmur yağmasına rağmen`); Almancada isim öbeği
 *    `trotz`, yan cümle `obwohl` ister. İngilizcede aynı ayrım
 *    (`despite`/`although`) zaten var, varyant gerekmiyor.
 *  - `w04-g1` (`verkauft werden`): İngilizce `be sold` → `sein`.
 *  - `w04-v1` (`schützen`): İngilizce `save the environment` → `sparen`.
 *
 * EK TEKRAR: `w04-g6` W2'nin `passiv.von` ve W3'ün `praeposition.dativ`
 * hedeflerini aynı boşlukta yokluyor.
 */
export const DE_B1_W04: QuizWeek = {
  id: "de-b1-w04",
  course: "de",
  level: "B1",
  no: 4,
  theme: "Umwelt und Gesellschaft",
  themeTr: "Çevre ve toplum",
  canDo: ["B1.RD.3", "B1.LS.3", "B1.SPK.6", "B1.GR.1", "B1.GR.3", "B1.GR.6"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Informationstext",
      genreTr: "Bilgilendirme yazısı",
      title: "Gemeinsam gärtnern – mitten in der Stadt",
      body:
        "Seit dem Frühling gibt es im Stadtteil Süd einen neuen Garten, der von Nachbarn gemeinsam gepflegt wird. " +
        "Auf einem alten Parkplatz, den niemand mehr benutzt hat, wachsen jetzt Gemüse und Blumen.\n\n" +
        "Die Idee kam von einer Gruppe junger Familien. Während des Winters haben sie Pläne gemacht und mit der Stadt gesprochen. " +
        "Die Stadt gibt das Grundstück kostenlos, Erde und Werkzeug wurden von einem Verein bezahlt.\n\n" +
        "Jeder kann mitmachen, auch ohne Erfahrung. Wer einen eigenen kleinen Garten möchte, muss allerdings Mitglied im Verein werden " +
        "und zwei Stunden pro Monat bei der gemeinsamen Arbeit helfen. Das Gemüse darf nicht verkauft werden; es ist für die Familien und die Nachbarn.\n\n" +
        "Trotz des großen Interesses gibt es auch Probleme. Im Sommer muss jeden Abend gegossen werden, und nicht alle halten sich an den Plan. " +
        "Außerdem wurde im Juli zweimal Werkzeug gestohlen. Der Verein sucht deshalb Freiwillige, die abends eine Stunde Zeit haben.\n\n" +
        "Treffen: jeden ersten Montag im Monat um 19 Uhr im Haus des Vereins.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Straßenumfrage",
      genreTr: "Sokak röportajı",
      plays: 2,
      segments: [
        { speaker: "Reporterin", text: "Die Stadt möchte ab nächstem Jahr Autos im Zentrum verbieten. Was halten Sie davon?" },
        { speaker: "Paul", text: "Ich finde das super. Die Luft ist schlecht, und mit dem Fahrrad ist es im Moment richtig gefährlich." },
        { speaker: "Reporterin", text: "Und Sie? Sie haben hier ein Geschäft, oder?" },
        { speaker: "Nina", text: "Ja, einen kleinen Laden für Kleidung. Ich habe Angst, dass meine Kunden dann nicht mehr kommen." },
        { speaker: "Reporterin", text: "Viele Städte sagen aber, dass die Geschäfte am Ende sogar mehr verkaufen." },
        { speaker: "Nina", text: "Das mag sein. Aber wenn es nicht funktioniert, verliere ich mein Geschäft, nicht die Politiker." },
        { speaker: "Reporterin", text: "Und Sie? Sie kommen gerade mit dem Auto." },
        { speaker: "Ercan", text: "Ja, weil meine Mutter nicht gut laufen kann. Für Menschen wie sie müsste es Ausnahmen geben." },
        { speaker: "Reporterin", text: "Sind Sie also dagegen?" },
        { speaker: "Ercan", text: "Nein, eigentlich nicht. Wenn es gute Busse und Parkplätze am Rand gibt, bin ich dafür." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b1-w04-r1",
      block: "read",
      ref: "t1",
      stem: "Was war früher an diesem Ort?",
      options: ["ein Garten", "ein Parkplatz", "ein Spielplatz", "das Haus des Vereins"],
      answer: 1,
      why: "`Auf einem alten Parkplatz, den niemand mehr benutzt hat` ilgi cümlesi yerin ESKİ hâlini anlatıyor; `wachsen jetzt` bugünü. İlk cümledeki `Garten` sözcüğü bugünkü duruma ait.",
      targets: ["lesen.detail", "relativsatz.akkusativ"],
    },
    {
      id: "de-b1-w04-r2",
      block: "read",
      ref: "t1",
      stem: "Was muss man tun, wenn man einen eigenen kleinen Garten möchte?",
      options: [
        "sein Gemüse verkaufen",
        "Erfahrung im Garten haben",
        "Mitglied werden und regelmäßig helfen",
        "Erde und Werkzeug selbst bezahlen",
      ],
      answer: 2,
      why: "Şart `muss allerdings` ile geliyor; `allerdings` hemen önceki `Jeder kann mitmachen, auch ohne Erfahrung` cümlesini sınırlıyor. Deneyim açıkça gerekmiyor, satış ise `darf nicht` ile yasak. `müssen` ile `nicht dürfen`i karıştırmamak gerekiyor.",
      targets: ["lesen.detail", "passiv.modal"],
    },
    {
      id: "de-b1-w04-r3",
      block: "read",
      ref: "t1",
      stem: "Warum sucht der Verein Freiwillige?",
      options: [
        "Das Gemüse soll verkauft werden.",
        "Die Stadt möchte den Garten schließen.",
        "Es gibt zu wenig Interesse.",
        "Nicht alle gießen regelmäßig, und Werkzeug wurde gestohlen.",
      ],
      answer: 3,
      why: "`Trotz des großen Interesses` ilginin az değil ÇOK olduğunu söylüyor. Sorunlar `und` ve `Außerdem` ile sıralanıyor, `deshalb` da onları arama kararına bağlıyor. `trotz`u `wegen` gibi okumak anlamı tersine çeviriyor.",
      targets: ["lesen.detail", "genitiv.praeposition"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b1-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "Warum hat Nina Angst?",
      options: [
        "Ihre Kunden kommen vielleicht nicht mehr.",
        "Die Luft im Zentrum wird schlechter.",
        "Sie kann nicht mehr mit dem Auto kommen.",
        "Die Politiker wollen ihren Laden schließen.",
      ],
      answer: 0,
      why: "Korku `Ich habe Angst, dass …` yan cümlesinde. Politikacılar Nina'nın ikinci cümlesinde geçiyor ama bir tehdit olarak değil: dükkânı kaybederse bedeli onların ödemeyeceğini söylüyor. Aynı konuşmacının iki cümlesini birbirine karıştırmamak gerekiyor.",
      targets: ["hoeren.meinung", "nebensatz.dass"],
    },
    {
      id: "de-b1-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "Was denkt Ercan über den Plan?",
      options: [
        "Er ist ganz dagegen.",
        "Er ist dafür, wenn es gute Busse gibt.",
        "Alle sollen weiter mit dem Auto ins Zentrum fahren dürfen.",
        "Er findet den Plan ohne Bedingung gut.",
      ],
      answer: 1,
      why: "Ercan arabayla geliyor, bu yüzden karşı sanılıyor; ama `Sind Sie also dagegen?` sorusuna `Nein, eigentlich nicht` diyor. Katılımı `wenn` ile bir koşula bağlı. Bir kişinin DURUMUNDAN görüşünü çıkarmak yerine söylediğine bakmak gerekiyor.",
      targets: ["hoeren.meinung", "nebensatz.wenn"],
    },
    {
      id: "de-b1-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "Wer ist ohne Bedingung für den Plan?",
      options: ["Nina", "Ercan", "die Reporterin", "Paul"],
      answer: 3,
      why: "Paul `super` diyor ve hiçbir koşul koymuyor. Ercan'ın katılımı koşullu; muhabir ise yalnız başka şehirlerden bir bilgi aktarıyor, kendi görüşünü söylemiyor. Aktarılan bilgiyi aktaranın görüşü sanmak tuzak.",
      targets: ["hoeren.meinung"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b1-w04-g1",
      block: "grammar",
      stem: "Das Gemüse darf nicht ___.",
      options: ["verkauft sein", "verkaufen werden", "verkauft werden", "verkauft worden"],
      answer: 2,
      why: "Modal fiilli edilgen üç parçalı: modal çekimli ve ikinci sırada, en sonda Partizip + `werden` mastarı. `worden` yalnız Perfekt edilgende kullanılır; `verkaufen werden` ise gelecek zamanın parçası.",
      targets: ["passiv.modal", "passiv.praesens"],
      byNative: {
        tr: {
          options: ["verkauft sein", "verkaufen werden", "verkauft werden", "verkauft worden"],
          answer: 2,
          why: "Türkçede `satılmamalı` tek sözcük: edilgen ek ve gereklilik eki fiile yapışıyor. Almancada her biri ayrı parça: `darf nicht` ikinci sırada, en sonda Partizip ve edilgenin yardımcı fiili `werden`.",
        },
        en: {
          options: ["verkauft sein", "verkaufen werden", "verkauft werden", "verkauft worden"],
          answer: 2,
          why: "İngilizcede `must not be sold` → `be` → `sein` aktarımı geliyor. Almancada edilgen bir işlemin yardımcı fiili `werden`: `verkauft werden`. `verkauft sein` bir durum bildirir, satış işlemini değil.",
        },
      },
    },
    {
      id: "de-b1-w04-g2",
      block: "grammar",
      stem: "___ des Regens sind viele Nachbarn zum Treffen gekommen.",
      options: ["Trotz", "Wegen", "Obwohl", "Seit"],
      answer: 0,
      why: "Yağış insanların gelmesini beklenmedik kılıyor, yani beklentiye karşıt bir durum ve arkasından Genitiv bir isim öbeği geliyor: `trotz`. `obwohl` aynı anlamı taşır ama bir bağlaçtır ve fiili sonda bir yan cümle ister. `wegen` yağışı gelmenin SEBEBİ yapar; `seit` ise Dativ ister ve bir başlangıç noktası bildirir.",
      targets: ["genitiv.praeposition", "konnektor.obwohl-trotz"],
      byNative: {
        tr: {
          options: ["Trotz", "Wegen", "Obwohl", "Seit"],
          answer: 0,
          why: "Türkçede `-e rağmen` hem isimle hem fiille aynı kalıyor (`yağmura rağmen`, `yağmur yağmasına rağmen`). Almancada ikisi ayrı sözcük: isim öbeğinden önce `trotz` + Genitiv, fiilli bir yan cümleden önce `obwohl`.",
        },
      },
    },
    {
      id: "de-b1-w04-g3",
      block: "grammar",
      stem: "Welcher Satz ist richtig?",
      options: [
        "Obwohl es viele Probleme gibt, der Garten ist ein Erfolg.",
        "Obwohl es viele Probleme gibt, ist der Garten ein Erfolg.",
        "Obwohl gibt es viele Probleme, ist der Garten ein Erfolg.",
        "Obwohl es gibt viele Probleme, der Garten ist ein Erfolg.",
      ],
      answer: 1,
      why: "`obwohl` bir yan cümle açar ve çekimli fiili sona iter. Yan cümle öne geçince ana cümlenin birinci konumunu doldurur, bu yüzden ana cümlede fiil virgülden hemen sonra gelir.",
      targets: ["konnektor.obwohl-trotz", "nebensatz.verbend", "wortstellung.v2"],
      byNative: {
        en: {
          options: [
            "Obwohl es viele Probleme gibt, der Garten ist ein Erfolg.",
            "Obwohl es viele Probleme gibt, ist der Garten ein Erfolg.",
            "Obwohl gibt es viele Probleme, ist der Garten ein Erfolg.",
            "Obwohl es gibt viele Probleme, der Garten ist ein Erfolg.",
          ],
          answer: 1,
          why: "`Although there are many problems, the garden is a success` iki cümlede de İngilizce sırayı koruyor. Almancada iki şey değişir: `obwohl` fiili (`gibt`) sona iter, ana cümlede de fiil özneden önce gelir.",
        },
      },
    },
    {
      id: "de-b1-w04-g4",
      block: "grammar",
      stem: "Der Verein sucht Freiwillige, ___ abends eine Stunde Zeit haben.",
      options: ["der", "denen", "deren", "die"],
      answer: 3,
      why: "İlgi zamiri anlamca nitelediği isme bağlanır: vakti olan `Freiwillige` (çoğul), `Verein` değil. Yan cümlede özne görevinde olduğu için çoğul Nominativ. Cümlenin başındaki tekil eril isim `der`i çağırıyor; fiilin çoğul olması (`haben`) doğru öncülü ele veriyor.",
      targets: ["relativsatz.nominativ"],
    },
    {
      id: "de-b1-w04-g5",
      block: "grammar",
      stem: "Welcher Satz ist richtig?",
      options: [
        "Während des Winters haben sie Pläne gemacht.",
        "Während des Winters sie haben Pläne gemacht.",
        "Während der Winter haben sie Pläne gemacht.",
        "Während der Winter sie haben Pläne gemacht.",
      ],
      answer: 0,
      why: "Edat olarak `während` Genitiv ister: `der Winter` → `des Winters`. Edat öbeği cümlenin birinci konumunu doldurduğu için çekimli fiil (`haben`) hemen arkasından, özne ondan sonra gelir.",
      targets: ["genitiv.praeposition", "wortstellung.v2"],
      byNative: {
        tr: {
          options: [
            "Während des Winters haben sie Pläne gemacht.",
            "Während des Winters sie haben Pläne gemacht.",
            "Während der Winter haben sie Pläne gemacht.",
            "Während der Winter sie haben Pläne gemacht.",
          ],
          answer: 0,
          why: "Türkçede `kış boyunca` edatı ismin ARKASINDA ve ismi değiştirmiyor. Almancada `während` önde duruyor ve arkasındaki tanımlığı Genitiv'e çekiyor: `des Winters`. Edat öbeği birinci konumu aldığı için fiil ikinci sırada.",
        },
        en: {
          options: [
            "Während des Winters haben sie Pläne gemacht.",
            "Während des Winters sie haben Pläne gemacht.",
            "Während der Winter haben sie Pläne gemacht.",
            "Während der Winter sie haben Pläne gemacht.",
          ],
          answer: 0,
          why: "`During the winter they made plans` sırası Almancaya taşınınca özne fiilden önce kalıyor. Almancada birinci konumu edat öbeği aldığında fiil hemen arkasından gelir; `während` da tanımlığı Genitiv'e çeker: `des Winters`.",
        },
      },
    },
    {
      id: "de-b1-w04-g6",
      block: "grammar",
      stem: "Erde und Werkzeug wurden ___ Verein bezahlt.",
      options: ["von einen", "mit einem", "von einem", "bei einem"],
      answer: 2,
      why: "Edilgen cümlede işi yapan `von` ile verilir ve `von` her zaman Dativ ister: `ein Verein` → `von einem Verein`. `mit` bir araç, `bei` bir yer ya da kurum bildirir; `einen` ise Akkusativ biçimi.",
      targets: ["passiv.von", "passiv.praeteritum", "praeposition.dativ"],
      byNative: {
        en: {
          options: ["von einen", "mit einem", "von einem", "bei einem"],
          answer: 2,
          why: "İngilizcede edilgenin yapanı `by` ile gelir ve ses benzerliği `bei`i çağırır; ama `bei` bir yer ya da kurum bildirir. Yapan `von` ile verilir, `von` da Dativ ister: `von einem Verein`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b1-w04-v1",
      block: "vocab",
      stem: "Wir sollten weniger Plastik benutzen, um die Umwelt zu ___.",
      options: ["sparen", "putzen", "schützen", "halten"],
      answer: 2,
      why: "Çevreyi korumak `die Umwelt schützen`. `sparen` para, enerji ya da zaman gibi harcanan bir şeyle kullanılır; `putzen` bir yeri temizlemek, `halten` ise tutmak demek.",
      targets: ["wortfeld.umwelt"],
      byNative: {
        en: {
          options: ["sparen", "putzen", "schützen", "halten"],
          answer: 2,
          why: "İngilizce `save` Almancada ikiye bölünür: para ya da enerji biriktirmek `sparen`, bir şeyi tehlikeden korumak `schützen`. `save the environment` → `die Umwelt schützen`.",
        },
      },
    },
    {
      id: "de-b1-w04-v2",
      block: "vocab",
      stem: "Bei der Umfrage waren 70 von 100 Menschen dafür – also die ___.",
      options: ["Hälfte", "Mehrheit", "Gesellschaft", "Gruppe"],
      answer: 1,
      why: "Yarıdan fazlası `Mehrheit`. `Hälfte` tam yarı demek, yani 50; `Gesellschaft` bütün toplum, `Gruppe` ise sayı bildirmeyen bir topluluk.",
      targets: ["wortfeld.gesellschaft"],
    },
    {
      id: "de-b1-w04-v3",
      block: "vocab",
      stem: "Nina ist nicht für den Plan. Sie ist eine ___ des Plans.",
      options: ["Gegnerin", "Kundin", "Mitglied", "Nachbarin"],
      answer: 0,
      why: "Bir plana ya da fikre karşı olan kişi `Gegner`/`Gegnerin`. `Kundin` bir dükkândan alışveriş yapan, `Mitglied` bir grubun üyesi; ikisi de karşı olmayı bildirmez.",
      targets: ["wortfeld.meinung", "genitiv.attribut"],
    },
  ],
};
