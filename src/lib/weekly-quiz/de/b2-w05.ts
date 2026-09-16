import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 5 · Transfer.
 *
 * ÖLÇÜLEN ŞEY: saf tekrar değil. W1–W4'ün hedefleri yeni bağlamlarda ve BAŞKA
 * metin türlerinde (okur mektubu, bir yazılım ekibinin toplantısı) karşılanıyor.
 * Maddelerin çoğu iki kuralı üst üste bindiriyor (gerçek dışı geçmiş + edilgen,
 * modal edilgen + aktarım), çünkü B2'de transferin zor kısmı kuralların aynı
 * cümlede buluşması.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w05-g1` (`gefragt worden wären`): üç parçalı zincir; Türkçe `-seydi`
 *    tek ek olduğu için ya gerçek geçmişe (`wurden`) ya `würden`e kaçılıyor,
 *    İngilizce `had been` için `geworden` aranıyor.
 *  - `w05-g2` (`seien`): `-miş` sezgisi aktarımı kipsiz (`sind`) ya da geçmişle
 *    (`waren`) kurduruyor; İngilizce konuşan zaman kaydırıyor.
 *  - `w05-g3` (Partizipialattribut, nötr `-es`): Türk öğrenciye yapı tanıdık,
 *    ek değil; İngilizce konuşan öbeği ilgi cümlesine çeviriyor.
 *  - `w05-v3` (`Gift`): sahte dost bu kez okurun beklemediği bir bağlamda.
 */
export const DE_B2_W05: QuizWeek = {
  id: "de-b2-w05",
  course: "de",
  level: "B2",
  no: 5,
  theme: "Alles zusammen: neue Situationen",
  themeTr: "Hepsi bir arada: yeni durumlar",
  canDo: ["B2.GR.1", "B2.GR.2", "B2.GR.3", "B2.RD.1", "B2.LS.5", "B2.WR.4"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Leserbrief",
      genreTr: "Okur mektubu",
      title: "Leserbrief: Kein Einkaufszentrum statt Kulturhaus!",
      body:
        "Zu Ihrem Artikel „Kulturhaus soll Einkaufszentrum weichen“ vom 3. Mai\n\n" +
        "Mit großer Enttäuschung habe ich gelesen, dass das Kulturhaus am Hafen abgerissen werden soll. " +
        "Der Bürgermeister wird in Ihrem Artikel mit den Worten zitiert, das Gebäude sei zu alt und eine Renovierung würde die Stadt mehr als acht Millionen Euro kosten. " +
        "Ein privater Investor habe dagegen angeboten, an derselben Stelle ein modernes Einkaufszentrum zu bauen.\n\n" +
        "Ich will gar nicht bestreiten, dass das alte Haus renoviert werden müsste. Doch die Rechnung des Bürgermeisters ist nicht vollständig, denn sie zählt nur die Kosten und nicht den Nutzen. " +
        "Im Kulturhaus finden jede Woche Sprachkurse, Konzerte und Lesungen statt, die von Menschen aller Generationen und Herkunftsländer besucht werden. " +
        "Wo sollen diese Angebote in Zukunft stattfinden? Ein weiteres Geschäft für Kleidung, die nach wenigen Monaten weggeworfen wird, brauchen wir jedenfalls nicht.\n\n" +
        "Hätte die Stadt die Bürgerinnen und Bürger rechtzeitig gefragt, wäre vielleicht eine andere Lösung gefunden worden. " +
        "Andere Städte haben gezeigt, dass alte Gebäude mithilfe von Stiftungen und Spenden über das Internet gerettet werden können. " +
        "Obwohl solche Projekte Zeit kosten, lohnen sie sich: Ein von der Nachbarschaft getragenes Kulturhaus schafft Begegnungen, die kein Einkaufszentrum ersetzen kann.\n\n" +
        "Ich fordere den Stadtrat deshalb auf, die Entscheidung zu verschieben, bis alle Alternativen geprüft worden sind. " +
        "Die Verantwortung für die Zukunft des Hauses tragen nicht nur die Politiker, sondern wir alle.\n\n" +
        "Mit freundlichen Grüßen\nDr. Helga Brunner",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Teambesprechung",
      genreTr: "Ekip toplantısı",
      plays: 2,
      segments: [
        { speaker: "Frau Roth", text: "Gut, dann kommen wir zur App für das Museum. Jonas, wie weit seid ihr?" },
        { speaker: "Jonas", text: "Die wichtigsten Funktionen sind fertig. Die Besucher können Bilder scannen und bekommen Informationen in zwölf Sprachen." },
        { speaker: "Frau Roth", text: "Sehr schön. Und wann könnte die App veröffentlicht werden?" },
        { speaker: "Jonas", text: "Frühestens im Juni. Die Prüfung des Datenschutzes ist noch nicht abgeschlossen." },
        { speaker: "Aylin", text: "Juni ist zu spät. Das Museum eröffnet im Mai die neue Ausstellung, und das wäre die perfekte Gelegenheit." },
        { speaker: "Jonas", text: "Das verstehe ich. Aber wenn wir die App ohne Prüfung veröffentlichen und Daten verloren gehen, haben wir ein viel größeres Problem." },
        { speaker: "Frau Roth", text: "Da hat Jonas recht. Gibt es einen Kompromiss?" },
        { speaker: "Aylin", text: "Wir könnten im Mai eine Version ohne Anmeldung anbieten. Dann werden keine persönlichen Daten gespeichert." },
        { speaker: "Jonas", text: "Das wäre machbar. Die Funktion für Kommentare käme dann erst im Juni dazu." },
        { speaker: "Frau Roth", text: "Gut. Aylin, klär bitte mit dem Museum, ob das für sie in Ordnung ist." },
        { speaker: "Aylin", text: "Mache ich. Das Museum hat übrigens gesagt, die Übersetzungen müssten noch einmal geprüft werden." },
        { speaker: "Frau Roth", text: "Dann sprechen wir nächste Woche darüber. Danke euch." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b2-w05-r1",
      block: "read",
      ref: "t1",
      stem: "Was hat der Bürgermeister laut dem Artikel gesagt?",
      options: [
        "Die Bürger sollten über die Zukunft des Kulturhauses abstimmen.",
        "Das Kulturhaus könne mithilfe einer Stiftung gerettet werden.",
        "Das Gebäude sei zu alt und eine Renovierung zu teuer.",
        "Ein Einkaufszentrum sei für die Stadt nicht notwendig.",
      ],
      answer: 2,
      why: "Belediye başkanının sözü dolaylı aktarımla veriliyor (`sei zu alt`, `würde … kosten`). Vakıf ve bağış fikri mektup yazarının kendi önerisi. Okur mektubunda yazarın görüşü ile aktardığı görüş iç içe geçiyor; ayırıcı işaret kip.",
      targets: ["lesen.detail", "indirekte-rede.konjunktiv1"],
    },
    {
      id: "de-b2-w05-r2",
      block: "read",
      ref: "t1",
      stem: "Was meint die Autorin mit dem Satz „Hätte die Stadt die Bürgerinnen und Bürger rechtzeitig gefragt, …“?",
      options: [
        "Die Stadt hat die Bürger nicht rechtzeitig gefragt.",
        "Die Stadt hat die Bürger rechtzeitig gefragt.",
        "Die Stadt wird die Bürger bald fragen.",
        "Die Bürger wollten nicht gefragt werden.",
      ],
      answer: 0,
      why: "Konjunktiv II Vergangenheit geçmişte olmayanı anlatır: halka sorulmadı, bu yüzden başka bir çözüm de bulunmadı. Cümlenin ikinci yarısı edilgen ve uzun (`wäre … gefunden worden`), ama anlamı ilk yarıdaki kip belirliyor.",
      targets: ["lesen.inferenz", "konjunktiv2.vergangenheit"],
    },
    {
      id: "de-b2-w05-r3",
      block: "read",
      ref: "t1",
      stem: "Was fordert die Autorin?",
      options: [
        "dass die Stadt das Kulturhaus sofort und auf eigene Kosten renovieren lässt",
        "dass der Stadtrat mit der Entscheidung wartet, bis Alternativen geprüft sind",
        "dass statt des Kulturhauses ein kleineres Einkaufszentrum gebaut wird",
        "dass allein die Politiker über die Zukunft des Hauses entscheiden",
      ],
      answer: 1,
      why: "`auffordern, … zu verschieben, bis …` bir erteleme istiyor, hemen onarım değil. Son cümle sorumluluğu herkese yayıyor (`nicht nur die Politiker, sondern wir alle`); politikacıların tek başına karar vermesi yazarın söylediğinin tersi.",
      targets: ["lesen.detail", "konnektor.nicht-nur-sondern"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b2-w05-l1",
      block: "listen",
      ref: "a1",
      stem: "Warum kann die App nicht schon im Mai mit allen Funktionen veröffentlicht werden?",
      options: [
        "Die Übersetzungen in zwölf Sprachen fehlen noch.",
        "Das Museum eröffnet die Ausstellung erst im Juni.",
        "Der Datenschutz ist noch nicht vollständig geprüft.",
        "Die wichtigsten Funktionen sind noch nicht fertig.",
      ],
      answer: 2,
      why: "Engel `Die Prüfung des Datenschutzes ist noch nicht abgeschlossen`. Çeviriler toplantının sonunda ek bir iş olarak geçiyor, yayın tarihini belirleyen neden değil. Ana işlevler ise zaten `fertig`.",
      targets: ["hoeren.detail", "nominalisierung.ung"],
    },
    {
      id: "de-b2-w05-l2",
      block: "listen",
      ref: "a1",
      stem: "Welchen Kompromiss schlägt Aylin vor?",
      options: [
        "Die App kommt erst im Juni, dafür mit allen Funktionen.",
        "Die Ausstellung wird verschoben, bis die App fertig ist.",
        "Die App wird im Mai ohne Prüfung veröffentlicht.",
        "Im Mai gibt es eine Version, die keine persönlichen Daten speichert.",
      ],
      answer: 3,
      why: "Öneri `eine Version ohne Anmeldung`; sonucu edilgenle geliyor: `werden keine persönlichen Daten gespeichert`. Kontrolsüz yayın Jonas'ın reddettiği bir ihtimal, uzlaşma değil. Uzlaşma iki tarafın koşulunu da karşılıyor: mayıs tarihi ve veri güvenliği.",
      targets: ["hoeren.zusammenhang"],
    },
    {
      id: "de-b2-w05-l3",
      block: "listen",
      ref: "a1",
      stem: "Was soll laut Museum noch passieren?",
      options: [
        "Die Übersetzungen sollen noch einmal geprüft werden.",
        "Aylin soll sich für die App anmelden.",
        "Die Eröffnung der Ausstellung soll verschoben werden.",
        "Die App soll schon im Mai Kommentare erlauben.",
      ],
      answer: 0,
      why: "Müzenin isteği Aylin'in ağzından aktarılıyor ve Konjunktiv II'ye kayıyor (`müssten … geprüft werden`), çünkü çoğulda Konjunktiv I (`müssen`) bildirme kipiyle aynı. Modal edilgen zincirinde asıl eylem en sonda: `geprüft werden`.",
      targets: ["hoeren.detail", "passiv.modal", "indirekte-rede.konjunktiv1"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b2-w05-g1",
      block: "grammar",
      stem: "Wenn die Bürger rechtzeitig gefragt ___, wäre eine andere Lösung gefunden worden.",
      options: ["würden", "worden wären", "wurden", "geworden wären"],
      answer: 1,
      why: "Gerçek dışı geçmiş edilgen üç parçadır: Partizip II + `worden` + `wären`. Türkçe 'sorulsaydı' tek ekle kurulduğu için ya gerçek geçmişe (`wurden`) ya da `würden`e kaçılıyor. `geworden` yalnız 'olmak' anlamındaki `werden`in Partizip'i.",
      targets: ["konjunktiv2.vergangenheit", "passiv.perfekt"],
      byNative: {
        en: {
          options: ["geworden wären", "würden", "wurden", "worden wären"],
          answer: 3,
          why: "İngilizce `if they had been asked` → `been` için `geworden` aranıyor. Almancada edilgenin Partizip'i `worden`, gerçek dışı kip `wären`: `gefragt worden wären`.",
        },
      },
    },
    {
      id: "de-b2-w05-g2",
      block: "grammar",
      stem: "Das Museum teilte mit, die Übersetzungen ___ an einigen Stellen fehlerhaft.",
      options: ["sind", "waren", "seien", "würden sein"],
      answer: 2,
      why: "Resmî aktarımda `sein`in Konjunktiv I'i `seien`; `sein` her kişide Konjunktiv I'i ayrı biçimle kurduğu için yedeğe gerek yok. Türkçe 'hatalıymış' kanıtsallık ekiyle kurulduğu için ya kipsiz (`sind`) ya da geçmişle (`waren`) çevriliyor; oysa aktarım zamanı değil kaynağı işaretliyor.",
      targets: ["indirekte-rede.konjunktiv1"],
      byNative: {
        en: {
          options: ["waren", "würden sein", "sind", "seien"],
          answer: 3,
          why: "İngilizcede `they said the translations were …` zaman kaydırması yapar, bu yüzden `waren` ya da `würden sein` kuruluyor. Almancada aktarımın işareti kip: `seien`; zaman değişmez.",
        },
      },
    },
    {
      id: "de-b2-w05-g3",
      block: "grammar",
      stem: "Ein ___ Kulturhaus schafft Begegnungen zwischen Generationen.",
      options: [
        "von der Nachbarschaft getragene",
        "von der Nachbarschaft tragendes",
        "getragenes von der Nachbarschaft",
        "von der Nachbarschaft getragenes",
      ],
      answer: 3,
      why: "Öbek uzun ama yapı tanıdık ('mahallenin sahip çıktığı kültür evi'). Tuzak ekte: `ein` + nötr isim yalın hâlde sıfata `-es` verir. `tragendes` ise etken anlam taşır ('taşıyan'); evi mahalle taşıyor, ev bir şey taşımıyor.",
      targets: ["partizipialattribut.partizip2"],
      byNative: {
        en: {
          options: [
            "getragenes von der Nachbarschaft",
            "von der Nachbarschaft tragendes",
            "das von der Nachbarschaft getragen wird",
            "von der Nachbarschaft getragenes",
          ],
          answer: 3,
          why: "İngilizce `a cultural centre supported by the neighbourhood` öbeği ismin arkasına koyar ya da ilgi cümlesine çevirir. Almancada Partizip öbeği `ein` ile isim arasına girer ve nötr yalın hâlde `-es` eki alır.",
        },
      },
    },
    {
      id: "de-b2-w05-g4",
      block: "grammar",
      stem: "Solche Projekte kosten viel Zeit. ___ lohnen sie sich.",
      options: ["Obwohl", "Trotz", "Trotzdem", "Weil"],
      answer: 2,
      why: "Noktadan sonra yeni bir ana cümle başlıyor ve fiil hemen arkada (`lohnen sie`): birinci konumu dolduran bir zarf gerekiyor, `trotzdem`. `obwohl` yan cümle kurar ve fiili sona iter. Türkçe 'buna rağmen' ile '-mesine rağmen' ayrımı burada da geçerli.",
      targets: ["konnektor.obwohl", "wortstellung.v2"],
      byNative: {
        en: {
          options: ["Trotz", "Trotzdem", "Obwohl", "Weil"],
          answer: 1,
          why: "İngilizce `despite`/`although` → `trotz`/`obwohl` aktarımı burada olmaz: noktadan sonra fiil hemen geliyor, yani birinci konumda bir zarf gerekiyor: `trotzdem` (`nevertheless`).",
        },
      },
    },
    {
      id: "de-b2-w05-g5",
      block: "grammar",
      stem: "Die Übersetzungen waren fehlerhaft, ___ die Veröffentlichung verschoben werden musste.",
      options: ["damit", "um", "sodass", "obwohl"],
      answer: 2,
      why: "Sonuç `sodass`, amaç `damit` ile. Yayının ertelenmesi hatanın sonucu, kimsenin amacı değil. Türkçe '-sın diye' ve 'bu yüzden' farklı olsa da ikisi de 'için' gibi algılandığı için `damit` seçiliyor.",
      targets: ["konnektor.sodass", "konnektor.damit", "passiv.modal"],
      byNative: {
        en: {
          options: ["sodass", "damit", "um", "obwohl"],
          answer: 0,
          why: "İngilizce `so that` hem amaç hem sonuç için kullanılabildiği için `damit` seçiliyor. Almancada ikisi ayrılır: sonuç `sodass`, amaç `damit`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b2-w05-v1",
      block: "vocab",
      stem: "Die App kommt ___ schon im Mai heraus – das hängt vom Museum ab.",
      options: ["schließlich", "eventuell", "tatsächlich", "endlich"],
      answer: 1,
      why: "`das hängt vom Museum ab` henüz kesin olmayan bir durumu işaret ediyor: `eventuell` 'belki, duruma göre'. `schließlich` ve `endlich` uzun bir sürecin sonunu, `tatsächlich` gerçekleşmiş bir şeyi anlatır.",
      targets: ["falschfreund.eventuell"],
      byNative: {
        en: {
          options: ["eventuell", "schließlich", "tatsächlich", "endlich"],
          answer: 0,
          why: "Burada sahte dost ters yönde çalışıyor: İngilizce `eventually` 'sonunda' olduğu için `eventuell`den kaçınılıyor, ama cümle bir belirsizlik bildiriyor ve Almanca `eventuell` tam olarak 'belki' demek.",
        },
      },
    },
    {
      id: "de-b2-w05-v2",
      block: "vocab",
      stem: "Der Stadtrat soll erst dann eine Entscheidung ___, wenn alle Alternativen geprüft sind.",
      options: ["machen", "treffen", "geben", "nehmen"],
      answer: 1,
      why: "Kalıp bağlam değişse de aynı: `eine Entscheidung treffen`. Türkçe 'karar vermek' `geben`e çekiyor; resmî bir metinde de fiil çeviriyle değil kalıpla gelir.",
      targets: ["kollokation.entscheidung-treffen"],
      byNative: {
        en: {
          options: ["treffen", "machen", "geben", "nehmen"],
          answer: 0,
          why: "İngilizce `make a decision` → `machen` aktarımı. Almanca kalıp `eine Entscheidung treffen`.",
        },
      },
    },
    {
      id: "de-b2-w05-v3",
      block: "vocab",
      stem: "Für das Kulturhaus war der Plan des Investors reines ___.",
      options: ["Geschenk", "Gift", "Glück", "Gewinn"],
      answer: 1,
      why: "Mecazî anlamda bir şeye çok zarar veren şey `Gift`: 'zehir gibi'. `Geschenk` hediye, `Gewinn` kazanç; yazarın plana karşı olduğunu bilen okur olumsuz anlamı arıyor. İngilizceden `gift` = hediye bilgisi `Geschenk`i doğru gösteriyor.",
      targets: ["falschfreund.gift"],
      byNative: {
        en: {
          options: ["Gift", "Geschenk", "Gewinn", "Glück"],
          answer: 0,
          why: "İngilizce `gift` 'hediye', Almanca `Gift` ise 'zehir' ve mecazî olarak 'çok zararlı'. Plan kültür evi için bir tehdit; hediye `Geschenk`.",
        },
      },
    },
  ],
};
