import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 2 · Bilim ve teknoloji.
 *
 * ÖLÇÜLEN ŞEY: bir bilim haberini ve geri dönüşüm üzerine bir radyo
 * söyleşisini anlamak; edilgenin bütün zamanları ve modal fiille kullanımı,
 * Partizipialattribut, Genitiv zinciri. Geri dönüş: `indirekte-rede.konjunktiv1`
 * (W1) çoğulda Konjunktiv II'ye kayan biçimiyle.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w02-g2` (Partizipialattribut): Türk öğrenciye yapı TANIDIK ('üniversitede
 *    yürütülen çalışma' da isimden önce), tuzak uzunlukta: araya giren tümleç
 *    sıfat ekini unutturuyor. İngilizce konuşan için yapı yabancı; Partizip
 *    ismin arkasına kaçıyor. Aynı madde, iki ayrı zorluk.
 *  - `w02-g1` (`gelöscht werden`): İngilizce `must be deleted` sırası
 *    `werden gelöscht` diye taşınıyor; Türkçe `-ilmeli` tek ekte birleşiyor.
 *  - `w02-g5` (`dürften`): çoğulda Konjunktiv I Indikativ'le aynı olduğu için
 *    Konjunktiv II'ye geçilir; `-miş` sezgisi geçmişe (`durften`), İngilizce
 *    sezgisi `würden`e götürüyor.
 *  - `w02-v1` (`Gift`): `gift` ↔ `Gift` İngilizce konuşan için sahte dost; İngilizce
 *    bilen Türk öğrenciye de (üçüncü dil girişimi) aynı tuzak çalışıyor.
 */
export const DE_B2_W02: QuizWeek = {
  id: "de-b2-w02",
  course: "de",
  level: "B2",
  no: 2,
  theme: "Wissenschaft und Technik",
  themeTr: "Bilim ve teknoloji",
  canDo: ["B2.GR.1", "B2.GR.2", "B2.GR.3", "B2.RD.3", "B2.LS.4"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Wissenschaftsartikel",
      genreTr: "Bilim haberi",
      title: "Macht das Handy am Abend wach?",
      body:
        "Dass helles Licht am Abend den Schlaf stört, ist seit Langem bekannt. Weniger klar war bisher, wie stark dieser Effekt bei Jugendlichen tatsächlich ist. " +
        "Eine an der Universität Basel durchgeführte Studie liefert nun neue Daten.\n\n" +
        "Acht Wochen lang wurden 120 Schülerinnen und Schüler zwischen 14 und 18 Jahren begleitet. " +
        "Die Hälfte der Teilnehmer musste das Smartphone eine Stunde vor dem Schlafengehen ausschalten; die andere Hälfte durfte es wie gewohnt benutzen. " +
        "Gemessen wurden unter anderem die Zeit bis zum Einschlafen, die Dauer des Schlafs und die Konzentration am nächsten Morgen.\n\n" +
        "Das Ergebnis überraschte die Forscher teilweise. Zwar schliefen die Jugendlichen ohne Smartphone im Durchschnitt nur elf Minuten früher ein. " +
        "Ihre Leistung in den Tests zur Konzentration am Morgen verbesserte sich jedoch deutlich. " +
        "Die Leiterin der Studie, Dr. Miriam Keller, vermutet, dass nicht allein das Licht entscheidend sei, sondern vor allem der Inhalt: " +
        "Wer kurz vor dem Einschlafen Nachrichten liest oder Videos schaut, sei im Kopf noch aktiv.\n\n" +
        "Kritiker weisen darauf hin, dass die Zahl der Teilnehmer relativ klein war und die Ergebnisse deshalb nicht auf alle Jugendlichen übertragen werden dürften. " +
        "Außerdem sei nicht kontrolliert worden, ob sich die Jugendlichen tatsächlich an die Regeln gehalten hätten.\n\n" +
        "Die Forscher planen deshalb eine größere Studie, in der die Nutzung der Geräte automatisch gemessen werden soll. " +
        "Bis die Ergebnisse vorliegen, empfehlen sie Eltern, das Thema mit ihren Kindern zu besprechen, statt das Handy einfach zu verbieten.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Radiointerview",
      genreTr: "Radyo söyleşisi",
      plays: 2,
      segments: [
        { speaker: "Moderator", text: "Frau Dr. Nowak, jedes Jahr werden sehr viele alte Handys weggeworfen. Warum ist das ein Problem?" },
        { speaker: "Dr. Nowak", text: "Weil in den Geräten wertvolle Rohstoffe stecken, zum Beispiel seltene Metalle. Die meisten davon könnten wiederverwendet werden, wenn die Geräte richtig gesammelt würden." },
        { speaker: "Moderator", text: "Und das passiert nicht?" },
        { speaker: "Dr. Nowak", text: "Nur zu einem kleinen Teil. Man schätzt, dass allein in deutschen Haushalten mehr als hundert Millionen alte Handys in Schubladen liegen." },
        { speaker: "Moderator", text: "Warum geben die Leute ihre Geräte nicht ab?" },
        { speaker: "Dr. Nowak", text: "Viele haben Angst um ihre Daten. Andere wissen einfach nicht, wo man die Geräte abgeben kann." },
        { speaker: "Moderator", text: "Ihr Institut hat ein neues Verfahren entwickelt. Was ist daran neu?" },
        { speaker: "Dr. Nowak", text: "Bisher wurden die Akkus meistens geschmolzen, was sehr viel Energie kostet. Bei unserem Verfahren werden die Materialien mit Wasser und Strom voneinander getrennt." },
        { speaker: "Moderator", text: "Das klingt einfach. Wann kann es eingesetzt werden?" },
        { speaker: "Dr. Nowak", text: "In kleinen Versuchen funktioniert es bereits. Bevor es in großen Anlagen genutzt werden kann, muss es allerdings noch drei bis vier Jahre getestet werden." },
        { speaker: "Moderator", text: "Was können unsere Hörerinnen und Hörer heute schon tun?" },
        { speaker: "Dr. Nowak", text: "Alte Geräte zurückbringen, die meisten Geschäfte für Elektronik nehmen sie kostenlos an. Und vorher die Daten löschen, dann muss man sich auch keine Sorgen machen." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b2-w02-r1",
      block: "read",
      ref: "t1",
      stem: "Was ist das wichtigste Ergebnis der Studie?",
      options: [
        "Ohne Smartphone schliefen die Jugendlichen viel früher ein.",
        "Das Licht des Bildschirms ist der einzige wichtige Faktor.",
        "Die meisten Jugendlichen hielten sich nicht an die Regeln.",
        "Ohne Smartphone konnten sich die Jugendlichen morgens besser konzentrieren.",
      ],
      answer: 3,
      why: "`Zwar … jedoch` yapısı ağırlığı ikinci kısma veriyor: uykuya dalma yalnız biraz öne kaydı (`nur elf Minuten`), belirgin değişen sabah konsantrasyonu. `zwar`lı cümleyi ana bulgu sanmak bu metin türünün tipik tuzağı.",
      targets: ["lesen.detail", "konnektor.zwar-jedoch"],
    },
    {
      id: "de-b2-w02-r2",
      block: "read",
      ref: "t1",
      stem: "Was vermutet Dr. Keller?",
      options: [
        "Vor allem das, was man auf dem Handy liest oder sieht, hält wach.",
        "Das helle Licht des Bildschirms allein ist für schlechten Schlaf verantwortlich.",
        "Die Studie war zu klein, um sichere Aussagen zu machen.",
        "Eltern sollten das Handy am Abend verbieten.",
      ],
      answer: 0,
      why: "Keller'in görüşü Konjunktiv I ile aktarılıyor (`entscheidend sei`) ve `nicht allein …, sondern vor allem` ağırlığı içeriğe veriyor. 'Çalışma küçük' eleştirmenlerin görüşü, 'yasaklamak' ise metnin reddettiği bir fikir. Aktarılan sözün sahibini kip ve özne birlikte gösteriyor.",
      targets: ["lesen.detail", "indirekte-rede.konjunktiv1"],
    },
    {
      id: "de-b2-w02-r3",
      block: "read",
      ref: "t1",
      stem: "Welche Kritik wird an der Studie geäußert?",
      options: [
        "Die Konzentration wurde nur am Abend gemessen.",
        "Die Jugendlichen waren für eine solche Studie zu jung.",
        "Man weiß nicht sicher, ob die Regeln eingehalten wurden.",
        "Die Studie hat nur eine Woche gedauert.",
      ],
      answer: 2,
      why: "`Außerdem sei nicht kontrolliert worden, ob …` hem edilgen hem aktarılmış bir cümle: kurallara uyulup uyulmadığı denetlenmedi. Edilgen Perfekt'in Konjunktiv I biçimi (`sei … worden`) uzun olduğu için olumsuzluk ve cümlenin konusu gözden kaçıyor.",
      targets: ["lesen.detail", "passiv.perfekt"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b2-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "Warum geben viele Menschen ihre alten Handys nicht ab?",
      options: [
        "Sie haben Angst um ihre Daten oder wissen nicht, wo sie die Geräte abgeben können.",
        "Die Geschäfte verlangen Geld, wenn man alte Geräte zurückgibt.",
        "Das Schmelzen der Akkus kostet in großen Anlagen zu viel Energie.",
        "Die Rohstoffe in den Geräten sind nicht mehr viel wert.",
      ],
      answer: 0,
      why: "İki neden sayılıyor (`Viele …`, `Andere …`). Ücret konuşmanın sonunda geçiyor ve tersini söylüyor: mağazalar cihazı `kostenlos` alıyor. Enerji maliyeti eski geri dönüşüm yönteminin sorunu, insanların cihaz vermemesinin değil.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-b2-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "Was ist neu an dem Verfahren des Instituts?",
      options: [
        "Die Akkus werden bei niedriger Temperatur geschmolzen.",
        "Die Geräte werden automatisch gesammelt.",
        "Die Materialien werden mit Wasser und Strom getrennt.",
        "Die Daten werden vor dem Recycling gelöscht.",
      ],
      answer: 2,
      why: "`Bisher wurden … geschmolzen` Präteritum edilgen: eski yöntem. Yeni yöntem Präsens edilgenle geliyor (`werden … getrennt`). Edilgende zamanı yardımcı fiil (`wurden`/`werden`) taşıyor; onu kaçırınca eski ve yeni yöntem karışıyor.",
      targets: ["hoeren.detail", "passiv.praeteritum"],
    },
    {
      id: "de-b2-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "Wann kann das Verfahren voraussichtlich in großen Anlagen genutzt werden?",
      options: [
        "schon jetzt, weil es in Versuchen bereits funktioniert",
        "nach weiteren Tests, in etwa drei bis vier Jahren",
        "im nächsten Jahr, sobald die Geräte gesammelt sind",
        "erst, wenn alle alten Handys zurückgegeben wurden",
      ],
      answer: 1,
      why: "`In kleinen Versuchen funktioniert es bereits` yalnız küçük denemeler için geçerli. `muss … noch drei bis vier Jahre getestet werden` modal edilgen: büyük tesiste kullanım bu sürenin sonunda. Modal + edilgen zincirinde asıl anlam son sözcükte (`getestet werden`) tamamlanıyor.",
      targets: ["hoeren.detail", "passiv.modal"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b2-w02-g1",
      block: "grammar",
      stem: "Vor der Rückgabe müssen alle persönlichen Daten ___.",
      options: ["werden gelöscht", "gelöscht werden", "gelöscht worden", "löschen werden"],
      answer: 1,
      why: "Modal fiilli edilgen cümlenin sonunda Partizip II + `werden` (mastar) sırasıyla biter: `müssen … gelöscht werden`. Türkçe `-ilmeli` tek ekte birleştiği için sıralama sezilemiyor. `worden` yalnız Perfekt'te `sein` ile gelir.",
      targets: ["passiv.modal"],
      byNative: {
        en: {
          options: ["werden gelöscht", "löschen werden", "gelöscht worden", "gelöscht werden"],
          answer: 3,
          why: "İngilizce `must be deleted` sırasında `be` önde; bu yüzden `werden gelöscht` kuruluyor. Almancada cümle sonundaki fiil öbeği ters sırada: önce Partizip, en sonda mastar `werden`.",
        },
      },
    },
    {
      id: "de-b2-w02-g2",
      block: "grammar",
      stem: "Die ___ Studie liefert neue Daten.",
      options: [
        "an der Universität durchgeführten",
        "an der Universität durchgeführte",
        "an der Universität durchführende",
        "durchgeführte an der Universität",
      ],
      answer: 1,
      why: "Ortaçlı sıfat öbeği Türkçede de isimden önce gelir ('üniversitede yürütülen çalışma'), yani yapı tanıdık. Tuzak uzunlukta: araya giren `an der Universität` sıfat ekini unutturuyor. `die Studie` yalın hâlde, belirli artikelden sonra `-e` alır. `durchführende` ise 'yürüten', yani etken anlam verir.",
      targets: ["partizipialattribut.partizip2"],
      byNative: {
        en: {
          options: [
            "durchgeführte an der Universität",
            "an der Universität durchführende",
            "an der Universität durchgeführte",
            "an der Universität durchgeführten",
          ],
          answer: 2,
          why: "İngilizcede bu bilgi ismin arkasına gelir (`the study carried out at the university`), o yüzden Partizip tümlecin önüne ya da arkasına kaçıyor. Almancada bütün öbek artikelle isim arasına girer ve sıfat gibi çekimlenir: `die an der Universität durchgeführte Studie`.",
        },
      },
    },
    {
      id: "de-b2-w02-g3",
      block: "grammar",
      stem: "Die Ergebnisse ___ Studie ___ Universität wurden gestern veröffentlicht.",
      options: ["der … der", "von die … von die", "die … die", "der … von die"],
      answer: 0,
      why: "Genitiv tamlayanında dişil isim `der` alır ve zincir sağa doğru uzar: `die Ergebnisse der Studie der Universität`. Türkçede tamlama sola doğru kurulur ('üniversitenin çalışmasının sonuçları'); sıra ters çevrilince durum eki kayboluyor.",
      targets: ["genitiv.kette"],
      byNative: {
        en: {
          options: ["von die … von die", "der … der", "der … von die", "die … die"],
          answer: 1,
          why: "İngilizce `of the` her yerde aynı kaldığı için `von die` kuruluyor. Bunda iki hata var: `von` Dativ ister (`von der`) ve yazı dilinde Genitiv yeğlenir: `der Studie der Universität`.",
        },
      },
    },
    {
      id: "de-b2-w02-g4",
      block: "grammar",
      stem: "Das neue Verfahren ist in Versuchen bereits erfolgreich getestet ___.",
      options: ["geworden", "wurde", "worden", "werden"],
      answer: 2,
      why: "Edilgen Perfekt'te `werden`in Partizip'i `ge-` almaz: `ist … getestet worden`. `geworden` yalnız 'olmak' anlamındaki `werden` için (`Sie ist Ärztin geworden`). Türkçede edilgen tek ekle kurulduğu için bu iki biçimin ayrı olduğu görünmüyor.",
      targets: ["passiv.perfekt"],
      byNative: {
        en: {
          options: ["worden", "geworden", "wurde", "werden"],
          answer: 0,
          why: "İngilizce `has been tested` için `been`in karşılığı aranıyor ve `geworden` seçiliyor. Almancada edilgen Perfekt `ist … getestet worden`; `geworden` yalnız `become` anlamında.",
        },
      },
    },
    {
      id: "de-b2-w02-g5",
      block: "grammar",
      stem: "Die Kritiker sagten, die Ergebnisse ___ nicht auf alle Jugendlichen übertragen werden.",
      options: ["dürfen", "durften", "dürften", "würden"],
      answer: 2,
      why: "Konjunktiv I çoğulda çoğunlukla bildirme kipiyle aynıdır (`sie dürfen`); aktarımı belli etmek için Konjunktiv II'ye geçilir: `dürften`. `-miş` sezgisiyle geçmişe (`durften`) kaymak aktarımı bir zaman bilgisine çeviriyor.",
      targets: ["indirekte-rede.konjunktiv1", "modal.duerfen"],
      byNative: {
        en: {
          options: ["würden", "dürfen", "durften", "dürften"],
          answer: 3,
          why: "İngilizce aktarımdaki `would` yüzünden `würden` yedek biçim sanılıyor, ama modal fiilin kendi Konjunktiv II'si var: `dürften`. Konjunktiv I (`dürfen`) burada bildirme kipiyle aynı olduğu için aktarımı göstermez.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b2-w02-v1",
      block: "vocab",
      stem: "Der Stoff in den alten Akkus ist für Menschen ein gefährliches ___.",
      options: ["Geschenk", "Gerät", "Gift", "Getränk"],
      answer: 2,
      why: "Almanca `das Gift` 'zehir' demek. İngilizceden `gift` = hediye bilen öğrenci bu sözcüğü `Geschenk` ile aynı sanıyor ve bağlamda zehir anlamını kaçırıyor. Akülerdeki madde ne cihaz (`Gerät`) ne içecek (`Getränk`).",
      targets: ["falschfreund.gift"],
      byNative: {
        en: {
          options: ["Gift", "Geschenk", "Gerät", "Getränk"],
          answer: 0,
          why: "İngilizce `gift` 'hediye', Almanca `das Gift` ise 'zehir'. Hediye `das Geschenk`; tehlikeli bir madde için doğru sözcük `Gift`.",
        },
      },
    },
    {
      id: "de-b2-w02-v2",
      block: "vocab",
      stem: "Aus alten Handys können wertvolle Rohstoffe ___ werden.",
      options: ["verdient", "gewonnen", "gezogen", "gespart"],
      answer: 1,
      why: "Atıktan ya da doğadan madde elde etmek de `gewinnen`: `Rohstoffe gewinnen`. Türkçe 'kazanmak/elde etmek' çağrışımı para kazanmak anlamındaki `verdienen`e götürüyor; `ziehen` fiziksel olarak çekmek, `sparen` biriktirmek.",
      targets: ["verb.gewinnen"],
      byNative: {
        en: {
          options: ["gezogen", "verdient", "gespart", "gewonnen"],
          answer: 3,
          why: "İngilizce `extract` ('çekip çıkarmak') → `ziehen` aktarımı. Almancada hammadde elde etmek `gewinnen`; `win` ile aynı fiil burada 'elde etmek' anlamında.",
        },
      },
    },
    {
      id: "de-b2-w02-v3",
      block: "vocab",
      stem: "Wer ___ die Verantwortung, wenn in einer Studie Fehler gemacht werden?",
      options: ["nimmt", "macht", "trägt", "gibt"],
      answer: 2,
      why: "Almancada sorumluluk 'taşınır': `Verantwortung tragen` (ya da `übernehmen`). Türkçe 'sorumluluk almak' `nehmen`e çekiyor. İsim–fiil kalıbında fiil çeviriyle değil kalıpla öğreniliyor.",
      targets: ["kollokation.verantwortung-tragen"],
      byNative: {
        en: {
          options: ["trägt", "nimmt", "macht", "gibt"],
          answer: 0,
          why: "İngilizce `take responsibility` → `nehmen` aktarımı. Almanca kalıp `Verantwortung tragen` ya da `übernehmen`.",
        },
      },
    },
  ],
};
