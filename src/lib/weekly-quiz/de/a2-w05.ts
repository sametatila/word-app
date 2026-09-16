import type { QuizWeek } from "../types";

/**
 * A2 · Hafta 5 · Transfer.
 *
 * ÖLÇÜLEN ŞEY: saf tekrar değil — W1–W4'ün hedefleri ve sözcükleri başka
 * bağlamlarda (yeni bir şehre taşınmak, otelde şikâyet, düğün, Bürgeramt).
 * Kural farklı bir cümlede tanınmıyorsa öğrenilmiş değil ezberlenmiştir.
 * Bazı maddelerde iki hedef üst üste biniyor (`sein` + `haben`, `weil` +
 * modal), çünkü transferin zor kısmı kuralların aynı cümlede buluşması.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w05-g1` (`sind … haben`): İngilizcede ikisi de `have`; Türk öğrenci ilk
 *    yardımcıyı ikinci Partizip'e taşıyor. İki farklı yoldan aynı yanlış.
 *  - `w05-g3` (`auf dem Tisch`): `liegen`/`legen` ayrımı, W3'teki `in die`/`in
 *    der` kuralının bir durum fiilinde yeniden yoklanması.
 *  - `w05-v2` (`mir fehlt`): Türkçe 'özlüyorum' kişiyi özne yapıyor; İngilizce
 *    `miss` ise `verpassen`e çekiyor — W3'teki `verb.verpassen` burada ters
 *    yönden sınanıyor.
 */
export const DE_A2_W05: QuizWeek = {
  id: "de-a2-w05",
  course: "de",
  level: "A2",
  no: 5,
  theme: "Alles zusammen: neue Situationen",
  themeTr: "Hepsi bir arada: yeni durumlar",
  canDo: ["A2.RD.1", "A2.WR.3", "A2.LS.3", "A2.SPK.7", "A2.GR.1", "A2.GR.2", "A2.GR.3", "A2.GR.5", "A2.GR.6"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Blog",
      genreTr: "Blog yazısı",
      title: "Meine erste Woche in Leipzig",
      body:
        "Am Montag bin ich mit zwei Koffern in Leipzig angekommen. Die Wohnung war kleiner als auf den Fotos, aber sehr hell. " +
        "Am Dienstag musste ich zum Bürgeramt. Ich habe den Weg nicht gefunden, weil mein Handy kaputt war. " +
        "Eine nette Frau hat mir geholfen und mich bis zur Tür gebracht. " +
        "Am Donnerstag sollte meine neue Arbeit beginnen, aber am Mittwoch hatte ich Halsschmerzen und Fieber. Der Arzt hat gesagt, dass ich drei Tage im Bett bleiben soll. " +
        "Deshalb habe ich meinen ersten Arbeitstag verschoben. Mein neuer Chef war am Telefon sehr freundlich. " +
        "Am Samstag ging es mir endlich besser, und ich bin lange durch die Altstadt spaziert. " +
        "Jetzt freue ich mich auf Montag!",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Telefongespräch",
      genreTr: "Telefon görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Sara", text: "Hallo Can, bist du gut in Wien angekommen?" },
        { speaker: "Can", text: "Ja, aber erst gestern Abend. Ich habe in Salzburg meinen Anschluss verpasst." },
        { speaker: "Sara", text: "Oh nein! Was hast du dann gemacht?" },
        { speaker: "Can", text: "Ich musste zwei Stunden warten. Dann bin ich mit dem nächsten Zug gefahren." },
        { speaker: "Sara", text: "Und wie ist das Hotel?" },
        { speaker: "Can", text: "Ganz gut, aber mein Zimmer ist sehr laut, weil es direkt an der Straße liegt." },
        { speaker: "Sara", text: "Kannst du nicht ein anderes Zimmer bekommen?" },
        { speaker: "Can", text: "Ich habe heute an der Rezeption gefragt. Morgen bekomme ich ein ruhiges Zimmer im vierten Stock." },
        { speaker: "Sara", text: "Super! Dann schläfst du morgen sicher besser." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-a2-w05-r1",
      block: "read",
      ref: "t1",
      stem: "Warum hat die Person den Weg zum Bürgeramt nicht gefunden?",
      options: ["Sie hatte Fieber.", "Eine Frau hat ihr den falschen Weg gezeigt.", "Ihr Handy ging nicht.", "Das Bürgeramt war geschlossen."],
      answer: 2,
      why: "Sebep `weil` yan cümlesinde ve fiil sonda (`kaputt war`). Metinde başka bir sorun da var (ateş) ama o çarşambaya ait; sebebi olayla aynı güne bağlamak gerekiyor. Kadın yardım etti, yanlış yol göstermedi.",
      targets: ["lesen.detail", "nebensatz.weil"],
    },
    {
      id: "de-a2-w05-r2",
      block: "read",
      ref: "t1",
      stem: "Wann ist der erste Arbeitstag jetzt wahrscheinlich?",
      options: ["am Mittwoch", "am Samstag", "am Donnerstag", "am nächsten Montag"],
      answer: 3,
      why: "`verschoben` 'ertelendi' demek: ilk iş günü artık planlanan `Donnerstag` değil. Yeni tarih açıkça yazılmıyor, son cümle (`freue mich auf Montag`) ima ediyor. Ertelemeyi atlayan okuyucu eski planı seçiyor.",
      targets: ["lesen.inferenz"],
    },
    {
      id: "de-a2-w05-r3",
      block: "read",
      ref: "t1",
      stem: "Was ist richtig über die Wohnung?",
      options: ["Sie ist kleiner als auf den Fotos, aber hell.", "Sie ist größer als auf den Fotos und dunkel.", "Sie ist dunkel und klein.", "Sie ist genau wie auf den Fotos."],
      answer: 0,
      why: "`kleiner als auf den Fotos` bir karşılaştırma: ev, fotoğraflarda göründüğünden küçük. `als`ın iki yanını ters okumak ('fotoğraflar daha küçük') karşılaştırmada sık hata; `aber sehr hell` de karanlık seçeneğini eliyor.",
      targets: ["lesen.detail", "vergleich.komparativ"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-a2-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "Warum ist Can erst gestern Abend angekommen?",
      options: ["Sein Zug hatte Verspätung.", "Das Hotel war voll.", "Er war krank.", "Er hat seinen Anschluss verpasst."],
      answer: 3,
      why: "Diyalogda gecikme (`Verspätung`) hiç söylenmiyor: Can aktarma trenini kaçırmış. Tren yolculuğunda 'geç varmak' deyince akla ilk gelen sözcük seçiliyor; duyulanı değil, beklenen hikâyeyi işaretlemek bu sorunun tuzağı.",
      targets: ["hoeren.detail", "verb.verpassen"],
    },
    {
      id: "de-a2-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "Was ist das Problem mit Cans Zimmer?",
      options: ["Es ist im vierten Stock.", "Es ist zu klein.", "Es ist sehr laut.", "Es ist zu teuer."],
      answer: 2,
      why: "Dördüncü kat sorun değil, çözüm: Can'in yarın geçeceği oda. Sorun ile çözüm aynı konuşmada geçince hangisinin hangisi olduğunu işaretler ayırıyor: sorun `weil` ile gerekçelendiriliyor, çözüm `morgen` ile geliyor.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-a2-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "Was passiert morgen?",
      options: ["Can fragt an der Rezeption.", "Can bekommt ein anderes Zimmer.", "Can fährt nach Salzburg.", "Can wartet zwei Stunden."],
      answer: 1,
      why: "`Ich habe gefragt` Perfekt: soru bugün zaten soruldu. Yarına ait olan yalnız `Morgen bekomme ich …` cümlesi; Almancada gelecek çoğu zaman Präsens ve bir zaman zarfıyla söylenir, `werden` gerekmez.",
      targets: ["hoeren.detail", "perfekt.haben"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-a2-w05-g1",
      block: "grammar",
      stem: "Letzten Sommer ___ wir nach Spanien geflogen und ___ viele Fotos gemacht.",
      options: ["haben … haben", "sind … haben", "sind … sind", "haben … sind"],
      answer: 1,
      why: "Tek cümlede iki yardımcı fiil kararı var: `fliegen` yer değiştirir → `sein`; `Fotos machen` nesneli bir eylem → `haben`. İkinci fiil birincinin yardımcısını devralmaz; her Partizip kendi yardımcısını seçer.",
      targets: ["perfekt.sein", "perfekt.haben", "kollokation.fotos-machen"],
      byNative: {
        en: {
          options: ["haben … haben", "sind … sind", "haben … sind", "sind … haben"],
          answer: 3,
          why: "İngilizcede ikisi de `have` alır (`have flown`, `have taken`). Almancada yardımcı her fiil için ayrı seçilir: uçmak yer değiştirir (`sind`), fotoğraf çekmek değiştirmez (`haben`).",
        },
      },
    },
    {
      id: "de-a2-w05-g2",
      block: "grammar",
      stem: "Ich kann heute Abend nicht zur Party kommen, weil ich länger ___.",
      options: ["muss arbeiten", "arbeiten muss", "muss ich arbeiten", "arbeite muss"],
      answer: 1,
      why: "Yan cümlede modal fiil + mastar varsa çekimli olan modal en sona gider, mastar hemen önünde kalır: `arbeiten muss`. `weil` kuralı modal fiille de aynı; değişen yalnız sona giden fiilin hangisi olduğu.",
      targets: ["nebensatz.weil", "modal.muessen"],
      byNative: {
        en: {
          options: ["arbeiten muss", "muss arbeiten", "muss ich arbeiten", "arbeite muss"],
          answer: 0,
          why: "İngilizcede `because I have to work` sırası korunur. Almancada `weil` çekimli fiili (`muss`) en sona iter, mastar onun önünde kalır: `weil ich arbeiten muss`.",
        },
      },
    },
    {
      id: "de-a2-w05-g3",
      block: "grammar",
      stem: "Wo sind meine Schlüssel? – Sie liegen auf ___ Tisch in der Küche.",
      options: ["den", "der", "die", "dem"],
      answer: 3,
      why: "`liegen` bir durum bildirir (nerede?), iki durumlu `auf` o zaman Dativ ister: `der Tisch` → `dem`. `legen` olsaydı yön bildirirdi (nereye?) ve `den` gelirdi. Yol tarifindeki `in die`/`in der` ayrımının aynısı.",
      targets: ["praeposition.wechsel", "kasus.dativ"],
      byNative: {
        en: {
          options: ["den", "dem", "der", "die"],
          answer: 1,
          why: "İngilizcede `on the table` hem `put` hem `lie` ile aynı kalır. Almancada `liegen` (durum) Dativ ister (`dem`), `legen` (hareket) Akkusativ (`den`).",
        },
      },
    },
    {
      id: "de-a2-w05-g4",
      block: "grammar",
      stem: "Anna, es ist kalt! ___ bitte das Fenster zu!",
      options: ["Machst", "Machen", "Mach", "Macht"],
      answer: 2,
      why: "`du` emrinde özne düşer ve `-st` eki gider: `du machst` → `Mach!`. Ayrılabilir önek (`zu`) yine sona gider. `Machen` tek başına kibar emir değildir, `Sie` olmadan eksik kalır; `Macht` ise `ihr` emri, tek kişiye (Anna) söylenmez.",
      targets: ["imperativ.du", "verb.trennbar"],
    },
    {
      id: "de-a2-w05-g5",
      block: "grammar",
      stem: "Wir haben drei Hotels verglichen. Das kleine Hotel am See war ___.",
      options: ["am billigsten", "billiger als", "mehr billig", "am billiger"],
      answer: 0,
      why: "Üç ya da daha fazla şey içinde 'en' → `am …sten`. `billiger` iki şeyi karşılaştırır ve arkasında bir `als` ile ikinci şeyi ister. `mehr billig` Almancada hiç kurulmaz: sıfat her zaman ekle derecelenir.",
      targets: ["vergleich.superlativ", "vergleich.komparativ"],
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-a2-w05-v1",
      block: "vocab",
      stem: "Für einen neuen Ausweis brauche ich ___ beim Bürgeramt.",
      options: ["ein Datum", "eine Uhrzeit", "einen Termin", "einen Plan"],
      answer: 2,
      why: "Bir dairede, doktorda, kuaförde ayrılan saat `Termin`. Sözcük muayenehaneye özgü değil, resmî kurumda da aynı. `Datum` takvimdeki tarih, `Uhrzeit` saat bilgisi: ikisi de randevunun bir parçası, randevunun kendisi değil.",
      targets: ["nomen.termin"],
      byNative: {
        en: {
          options: ["einen Termin", "ein Datum", "eine Uhrzeit", "einen Plan"],
          answer: 0,
          why: "İngilizce `date` ve `appointment` karışıyor: Almanca `Datum` yalnız tarih. Resmî dairede ya da doktorda randevu `Termin`.",
        },
      },
    },
    {
      id: "de-a2-w05-v2",
      block: "vocab",
      stem: "Seit ich in Leipzig wohne, ___ mir meine Familie sehr.",
      options: ["verpasst", "fehlt", "vergisst", "verliert"],
      answer: 1,
      why: "Cümlede `mir` var: özleyen kişi Dativ'de, özlenen `meine Familie` özne. Bu yapı `fehlen` ile kurulur. 'Kaçırmak' (`verpassen`), 'unutmak' ve 'kaybetmek' özlem bildirmez; Türkçe 'özlüyorum' kişiyi özne yaptığı için `mir`in işaret ettiği yapı tanınmıyor.",
      targets: ["verb.verpassen", "kasus.dativ"],
      byNative: {
        en: {
          options: ["fehlt", "verpasst", "vergisst", "verliert"],
          answer: 0,
          why: "İngilizce `miss` → `verpassen` aktarımı: `verpassen` yalnız treni, fırsatı kaçırmak. Özlem `mir fehlt meine Familie`; kişi Dativ'e geçer, özlenen özne olur.",
        },
      },
    },
    {
      id: "de-a2-w05-v3",
      block: "vocab",
      stem: "Auf der Hochzeit hat mein Bruder über 300 Fotos ___.",
      options: ["genommen", "getan", "gegeben", "gemacht"],
      answer: 3,
      why: "`Fotos machen` sabit bir kalıp: tatilde de düğünde de fiil aynı kalır, bağlama göre değişmez; `tun` genel 'yapmak' ama bu kalıba girmez.",
      targets: ["kollokation.fotos-machen"],
      byNative: {
        en: {
          options: ["gemacht", "genommen", "getan", "gegeben"],
          answer: 0,
          why: "İngilizce `take photos` kalıbından `nehmen` aktarılıyor. Almancada fotoğraf 'yapılır': `Fotos machen`.",
        },
      },
    },
  ],
};
