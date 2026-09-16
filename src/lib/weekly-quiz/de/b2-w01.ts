import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 1 · İş yerinde iletişim ve müzakere.
 *
 * ÖLÇÜLEN ŞEY: bir müzakere tutanağını ve bir çalışma saatleri pazarlığını
 * anlamak; resmî aktarım (Konjunktiv I), gerçek dışı geçmiş (Konjunktiv II),
 * `-ung` isimleştirmesi, `obwohl`/`um … zu`. B2'de ölçülen kural bilgisi değil,
 * anadilin kalıbına direnmek: çeldiriciler öğrencinin gerçekten yazacağı biçim.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w01-g1` (`könne`): Türkçe `-miş` zaten bir aktarım kipi ve öğrenci onu
 *    Almancada geçmiş zamana (`konnte`, `habe gekonnt`) eşliyor; İngilizce
 *    konuşan zaman kaydırmasına ve `würde`ye kaçıyor. Aynı doğru, iki ayrı yol.
 *  - `w01-g3` (`Entscheidung`): Türkçe `-me/-ma` her fiile eklendiği için mastar
 *    isim gibi kullanılıyor (`Entscheiden`); İngilizce `-ing` aynı yanlışı
 *    başka gerekçeyle üretiyor.
 *  - `w01-g4` (`Obwohl`): İngilizce `despite` → `trotz` (edat, cümle almaz);
 *    Türk öğrenci için tuzak 'buna rağmen' karşılığı olan zarf `trotzdem`.
 *  - `w01-v2` (`schließlich`): `eventuell` ↔ `eventually` sahte dostu yalnız
 *    İngilizce konuşan için gerçek; Türk öğrenci için taban açıklama anlamı ayırıyor.
 */
export const DE_B2_W01: QuizWeek = {
  id: "de-b2-w01",
  course: "de",
  level: "B2",
  no: 1,
  theme: "Kommunikation und Verhandlungen im Beruf",
  themeTr: "İş yerinde iletişim ve müzakere",
  canDo: ["B2.GR.2", "B2.GR.4", "B2.RD.2", "B2.LS.5", "B2.SPK.4"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Interne E-Mail",
      genreTr: "Şirket içi e-posta",
      title: "Zusammenfassung: Gespräch mit der Firma Berger",
      body:
        "Liebe Kolleginnen und Kollegen,\n\n" +
        "wie letzte Woche angekündigt, fasse ich das gestrige Gespräch mit Herrn Lorenz von der Firma Berger kurz zusammen. " +
        "Herr Lorenz erklärte zu Beginn, die Preise für Verpackungen seien seit Anfang des Jahres um fast zwölf Prozent gestiegen. " +
        "Sein Unternehmen könne die bisherigen Bedingungen deshalb nicht länger halten. " +
        "Er schlug vor, den Vertrag um zwei Jahre zu verlängern und dafür eine Erhöhung der Preise um acht Prozent zu akzeptieren.\n\n" +
        "Wir haben deutlich gemacht, dass eine Erhöhung in dieser Höhe für uns nicht in Frage kommt. " +
        "Frau Aksoy wies darauf hin, dass wir in den letzten drei Jahren alle Rechnungen pünktlich bezahlt und die bestellten Mengen regelmäßig erhöht hätten. " +
        "Hätte die Firma Berger uns früher informiert, hätten wir die höheren Kosten in unserer Planung beachten können.\n\n" +
        "Nach einer längeren Diskussion einigten wir uns auf einen Kompromiss: Die Preise steigen zunächst nur um vier Prozent. " +
        "Im Gegenzug verpflichten wir uns, die bestellte Menge im kommenden Jahr nicht zu reduzieren. " +
        "Über eine weitere Änderung soll im März verhandelt werden, sobald die neuen Zahlen vorliegen.\n\n" +
        "Herr Lorenz betonte am Ende, man sei an einer Zusammenarbeit über viele Jahre sehr interessiert. " +
        "Obwohl das Gespräch zeitweise angespannt war, halte ich das Ergebnis für akzeptabel. " +
        "Die Unterschrift unter den geänderten Vertrag ist für den 15. Oktober geplant. " +
        "Falls ihr Fragen oder Bedenken habt, meldet euch bitte bis Freitag bei mir.\n\n" +
        "Viele Grüße\nJana Scholz, Einkauf",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Mitarbeitergespräch",
      genreTr: "Yöneticiyle görüşme",
      plays: 2,
      segments: [
        { speaker: "Frau Weber", text: "Herr Brandt, Sie wollten mit mir über Ihre Arbeitszeiten sprechen?" },
        { speaker: "Herr Brandt", text: "Ja, genau. Seit wir das neue Projekt haben, bin ich jeden Tag fast zwei Stunden unterwegs. Ich würde gern drei Tage pro Woche von zu Hause arbeiten." },
        { speaker: "Frau Weber", text: "Drei Tage sind schwierig. Das Team trifft sich dienstags und donnerstags, und da müssen alle vor Ort sein." },
        { speaker: "Herr Brandt", text: "Das verstehe ich. Aber die Besprechungen könnten doch auch online stattfinden, oder?" },
        { speaker: "Frau Weber", text: "Theoretisch schon. Aber gerade am Anfang eines Projekts ist der persönliche Austausch wichtig, damit keine Missverständnisse entstehen." },
        { speaker: "Herr Brandt", text: "Wie wäre es dann mit zwei Tagen, Montag und Freitag? An diesen Tagen gibt es keine Termine." },
        { speaker: "Frau Weber", text: "Das klingt vernünftiger. Allerdings möchte ich, dass Sie an diesen Tagen telefonisch erreichbar sind." },
        { speaker: "Herr Brandt", text: "Selbstverständlich. Ich könnte außerdem jeden Freitag einen kurzen Bericht schicken, sodass Sie immer wissen, wie weit wir sind." },
        { speaker: "Frau Weber", text: "Gute Idee. Wir probieren es drei Monate aus und sprechen dann noch einmal darüber." },
        { speaker: "Herr Brandt", text: "Und wenn es gut funktioniert, könnten wir dann über einen dritten Tag reden?" },
        { speaker: "Frau Weber", text: "Das will ich nicht ausschließen. Aber versprechen kann ich nichts." },
        { speaker: "Herr Brandt", text: "Das ist fair. Vielen Dank, Frau Weber." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b2-w01-r1",
      block: "read",
      ref: "t1",
      stem: "Warum will die Firma Berger die Preise erhöhen?",
      options: [
        "Weil die Firma Scholz ihre Rechnungen zu spät bezahlt hat.",
        "Weil ihre eigenen Kosten gestiegen sind.",
        "Weil der Vertrag um zwei Jahre verlängert werden soll.",
        "Weil die bestellten Mengen in den letzten Jahren gesunken sind.",
      ],
      answer: 1,
      why: "Herr Lorenz'in gerekçesi Konjunktiv I ile aktarılıyor (`seien … gestiegen`, `könne … nicht halten`). Sözleşmeyi uzatmak onun önerisi, gerekçesi değil. Ödemeler ve sipariş miktarı ise karşı tarafın argümanı. Kimin konuştuğunu kip gösteriyor.",
      targets: ["lesen.detail", "indirekte-rede.konjunktiv1"],
    },
    {
      id: "de-b2-w01-r2",
      block: "read",
      ref: "t1",
      stem: "Welche Aussage über das Ergebnis des Gesprächs ist richtig?",
      options: [
        "Die Preise steigen um acht Prozent, dafür wird der Vertrag verlängert.",
        "Die Preise bleiben bis zu neuen Verhandlungen im März gleich.",
        "Die Preise steigen vorerst um vier Prozent.",
        "Die bestellte Menge wird im kommenden Jahr reduziert.",
      ],
      answer: 2,
      why: "Yüzde sekiz karşı tarafın ilk önerisiydi; uzlaşma ise `zunächst nur um vier Prozent`. Mart yeni bir pazarlık tarihi, fiyatların donduğu anlamına gelmiyor. Müzakere metinlerinde öneri ile sonuç ayrı yerlerde duruyor ve sonucu `einigten wir uns` haber veriyor.",
      targets: ["lesen.detail"],
    },
    {
      id: "de-b2-w01-r3",
      block: "read",
      ref: "t1",
      stem: "Was bedeutet der Satz „Hätte die Firma Berger uns früher informiert, …“?",
      options: [
        "Die Firma Berger wird im März früher informieren.",
        "Die Firma Berger hat rechtzeitig informiert, und die Planung wurde geändert.",
        "Die Firma Berger hat zu spät informiert, deshalb fehlten die Kosten in der Planung.",
        "Die Firma Berger möchte in Zukunft früher informiert werden.",
      ],
      answer: 2,
      why: "`Hätte … informiert, hätten … können` gerçekleşmemiş bir geçmişi anlatır (Konjunktiv II Vergangenheit): haber erken gelmedi, bu yüzden maliyetler planlamaya konamadı. Kipi dilek ya da gelecek gibi okumak cümlenin anlamını tersine çeviriyor.",
      targets: ["lesen.inferenz", "konjunktiv2.vergangenheit"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b2-w01-l1",
      block: "listen",
      ref: "a1",
      stem: "Warum möchte Herr Brandt von zu Hause arbeiten?",
      options: [
        "Er findet die Besprechungen am Dienstag nicht sinnvoll.",
        "Er arbeitet an dem neuen Projekt allein.",
        "Er möchte am Freitag nicht arbeiten.",
        "Er verbringt jeden Tag viel Zeit auf dem Weg zur Arbeit.",
      ],
      answer: 3,
      why: "`Seit wir das neue Projekt haben` yalnız bir zaman işareti; asıl gerekçe yolda geçen süre (`fast zwei Stunden unterwegs`). `seit` yan cümlesini gerekçe sanınca proje sebep gibi duyuluyor.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-b2-w01-l2",
      block: "listen",
      ref: "a1",
      stem: "Worauf einigen sich die beiden?",
      options: [
        "auf zwei Tage zu Hause, zunächst für drei Monate",
        "auf drei Tage zu Hause, und zwar ab sofort",
        "auf zwei Tage zu Hause, und zwar für immer",
        "auf Arbeit zu Hause nur dienstags und donnerstags",
      ],
      answer: 0,
      why: "`Wir probieren es drei Monate aus` bir deneme süresi. Üçüncü gün yalnız ileride konuşulabilecek bir ihtimal (`nicht ausschließen`, `versprechen kann ich nichts`). Müzakerede açık bırakılan kapıyı karar sanmak tipik hata.",
      targets: ["hoeren.zusammenhang"],
    },
    {
      id: "de-b2-w01-l3",
      block: "listen",
      ref: "a1",
      stem: "Warum sollen die Treffen am Dienstag und Donnerstag vor Ort stattfinden?",
      options: [
        "sodass Herr Brandt jeden Freitag einen Bericht schreiben kann",
        "damit keine Missverständnisse entstehen",
        "weil es für Online-Treffen keine Technik gibt",
        "weil Frau Weber nicht gern telefoniert",
      ],
      answer: 1,
      why: "`damit` amaç bildirir: yüz yüze görüşme yanlış anlaşılmaları önlemek için. `sodass` ise sonuç bildirir ve diyalogda başka bir öneriye, cuma raporuna bağlı. İki bağlacın işlevini ayırınca gerekçenin kime ait olduğu da ayrılıyor.",
      targets: ["hoeren.detail", "konnektor.damit"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b2-w01-g1",
      block: "grammar",
      stem: "Protokoll: Der Lieferant sagte, sein Unternehmen ___ die bisherigen Preise nicht halten.",
      options: ["kann", "könne", "konnte", "habe gekonnt"],
      answer: 1,
      why: "Tutanak ya da haber gibi resmî aktarımda başkasının sözü Konjunktiv I ile verilir: `es könne`. Türkçe `-miş` zaten 'söylendiğine göre' anlamı taşıdığı için Almancada geçmişe (`konnte`, `habe gekonnt`) çevrilmek isteniyor. Konjunktiv I ise zamanı değil kaynağı işaretler; söz şimdiki zamandaysa aktarımda da şimdiki zaman kalır.",
      targets: ["indirekte-rede.konjunktiv1"],
      byNative: {
        en: {
          options: ["würde können", "kann", "konnte", "könne"],
          answer: 3,
          why: "İngilizcede aktarım zaman kaydırmasıyla yapılır (`he said they could not`), bu yüzden `konnte` ya da `würde` akla geliyor. Almancada resmî aktarımın işareti zaman değil kiptir: Konjunktiv I `könne`. `würde` yalnız başka bir biçim ayırt edilemiyorsa yedek olarak kullanılır.",
        },
      },
    },
    {
      id: "de-b2-w01-g2",
      block: "grammar",
      stem: "Wenn wir das Angebot früher bekommen ___, hätten wir besser verhandeln können.",
      options: ["würden", "haben", "hätten", "wären"],
      answer: 2,
      why: "Gerçekleşmemiş geçmiş koşul `hätte`/`wäre` + Partizip II ile kurulur ve `bekommen` `haben` alır. Türkçe `-seydi` koşulu ve geçmişi tek ekte taşıdığı için ya gerçek geçmiş (`haben`) ya da gelecek gibi duran `würden` seçiliyor.",
      targets: ["konjunktiv2.vergangenheit"],
      byNative: {
        en: {
          options: ["haben", "hätten", "würden", "wären"],
          answer: 1,
          why: "İngilizce `if we had got` → `haben` (bildirme kipi) aktarımı. Almancada gerçek dışı geçmiş koşul tarafında da kip ister: `hätten`. İngilizce `would have`dan gelen `würden` ise koşul cümlesinde geçmişi karşılamaz.",
        },
      },
    },
    {
      id: "de-b2-w01-g3",
      block: "grammar",
      stem: "Die ___ fiel erst nach einer langen Diskussion.",
      options: ["Entscheiden", "Entscheid", "Entschied", "Entscheidung"],
      answer: 3,
      why: "Fiilden türeyen resmî isim çoğunlukla `-ung` ile yapılır ve dişildir: `die Entscheidung`. Türkçe `-me/-ma` her fiile eklenebildiği için mastar da isim gibi kullanılıyor (`Entscheiden`), ama mastardan türeyen isim nötrdür ve `die` ile uyuşmaz. `der Entscheid` eril, `entschied` çekimli fiil.",
      targets: ["nominalisierung.ung"],
      byNative: {
        en: {
          options: ["Entscheiden", "Entscheidung", "Entscheid", "Entschied"],
          answer: 1,
          why: "İngilizcede `-ing` biçimi (`the deciding`) isim olabiliyor, bu yüzden `Entscheiden` doğal geliyor. Almancada mastardan türeyen isim nötrdür (`das Entscheiden`) ve `die` ile uyuşmaz; resmî isim `die Entscheidung`.",
        },
      },
    },
    {
      id: "de-b2-w01-g4",
      block: "grammar",
      stem: "___ das Gespräch zeitweise angespannt war, sind wir mit dem Ergebnis zufrieden.",
      options: ["Trotzdem", "Obwohl", "Trotz", "Aber"],
      answer: 1,
      why: "Fiil sonda (`angespannt war`) olduğuna göre bir yan cümle bağlacı gerekiyor: `obwohl`. `trotzdem` zarftır; ana cümlede birinci yeri alır ve arkasından fiil gelir. Türkçedeki '-mesine rağmen' ile 'buna rağmen' ayrımı tam da bu: ilki yan cümle, ikincisi yeni bir cümle.",
      targets: ["konnektor.obwohl", "wortstellung.v2"],
      byNative: {
        en: {
          options: ["Trotz", "Trotzdem", "Obwohl", "Aber"],
          answer: 2,
          why: "İngilizce `despite` → `trotz` aktarımı. `trotz` bir edattır ve cümle değil isim ister (`trotz der Spannung`). Fiil sonda olduğuna göre yan cümle bağlacı gerekiyor: `obwohl` (`although`).",
        },
      },
    },
    {
      id: "de-b2-w01-g5",
      block: "grammar",
      stem: "Wir treffen uns eine Stunde früher, ___ die Präsentation noch einmal zu üben.",
      options: ["damit", "sodass", "um", "dass"],
      answer: 2,
      why: "Arkadan `zu` + mastar geliyor ve iki cümlenin öznesi aynı (`wir`): amaç `um … zu` ile kurulur. `damit` çekimli bir yan cümle ister. Türkçe 'için' tek kalıp olduğundan ayrımı özneye ve `zu`ya bakarak yapmak gerekiyor.",
      targets: ["konnektor.um-zu", "konnektor.damit"],
      byNative: {
        en: {
          options: ["sodass", "um", "damit", "dass"],
          answer: 1,
          why: "İngilizce `so that` → `sodass` aktarımı. `sodass` sonuç bildirir ve çekimli bir yan cümle ister. `to practise` gibi mastarlı amaç Almancada `um … zu` ile kurulur.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b2-w01-v1",
      block: "vocab",
      stem: "Nach zwei Stunden mussten wir endlich eine Entscheidung ___.",
      options: ["geben", "treffen", "machen", "nehmen"],
      answer: 1,
      why: "Almancada karar 'buluşulur': `eine Entscheidung treffen`. Türkçe 'karar vermek' `geben`e çekiyor. İsim–fiil kalıplarında fiil sözcük sözcük çeviriyle bulunmaz.",
      targets: ["kollokation.entscheidung-treffen"],
      byNative: {
        en: {
          options: ["machen", "nehmen", "treffen", "geben"],
          answer: 2,
          why: "İngilizce `make a decision` → `machen` aktarımı. Almanca kalıp `eine Entscheidung treffen`; `take` → `nehmen` de yanlış.",
        },
      },
    },
    {
      id: "de-b2-w01-v2",
      block: "vocab",
      stem: "Wir haben stundenlang verhandelt, aber ___ haben wir uns doch geeinigt.",
      options: ["eventuell", "aktuell", "schließlich", "vorher"],
      answer: 2,
      why: "Uzun bir sürecin sonunu `schließlich` bildirir. `eventuell` 'belki, duruma göre', `aktuell` 'şu anki, güncel' demek. `aber … doch` karşıtlığı bir sonuca işaret ediyor ve sonucu `schließlich` getiriyor.",
      targets: ["falschfreund.eventuell"],
      byNative: {
        en: {
          options: ["eventuell", "schließlich", "aktuell", "vorher"],
          answer: 1,
          why: "İngilizce `eventually` 'sonunda' demek, ama Almanca `eventuell` 'belki'. `actually` da `aktuell` değildir. Uzun bir sürecin sonu `schließlich`.",
        },
      },
    },
    {
      id: "de-b2-w01-v3",
      block: "vocab",
      stem: "Über eine weitere Anpassung der Preise wird im März noch einmal ___.",
      options: ["behandelt", "verhandelt", "gehandelt", "besprochen"],
      answer: 1,
      why: "Pazarlık etmek `verhandeln (über)`. `behandeln` bir konuyu işlemek ya da hastayı tedavi etmek ve doğrudan nesne ister, `handeln` ticaret yapmak ya da davranmak, `besprechen` doğrudan nesne alır ve `über` ile kurulmaz. Türkçe 'görüşülecek' ve 'ele alınacak' `besprochen`/`behandelt`e çekiyor; öznesiz edilgen (`wird … verhandelt`) de fiilin edatını göstermeyi zorlaştırıyor.",
      targets: ["verb.verhandeln", "passiv.unpersoenlich"],
      byNative: {
        en: {
          options: ["gehandelt", "behandelt", "besprochen", "verhandelt"],
          answer: 3,
          why: "İngilizce `negotiate` ile `handle`/`deal` çağrışımı `handeln`/`behandeln`e götürüyor. `handeln` 'ticaret yapmak, davranmak', `behandeln` 'işlemek, tedavi etmek'. Pazarlık `verhandeln`.",
        },
      },
    },
  ],
};
