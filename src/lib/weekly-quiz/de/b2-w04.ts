import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 4 · Ekonomi, tüketim ve etik.
 *
 * ÖLÇÜLEN ŞEY: ucuz giyimin gerçek maliyeti üzerine bir yorum yazısını ve bir
 * tüketici danışma hattı görüşmesini anlamak; `je … desto`, `nicht nur …
 * sondern auch`, fiil üslubundan isim üslubuna geçiş. Geri dönüş:
 * `passiv.perfekt` (W2), `partizipialattribut.partizip2` (W2), `genitiv.kette`
 * (W2), `indirekte-rede.konjunktiv1` (W1), `kollokation.verantwortung-tragen` (W2).
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w04-g5` (isim üslubu): fiil isimleşince nesne Genitiv'e, özne `durch`
 *    öbeğine geçer. Türk öğrenci `-me` isimleştirmesinde nesneyi kendi durum ekiyle bırakıyor
 *    ('kurallara uyma'), İngilizce konuşan `of`/`by` edatlarını `von` diye taşıyor.
 *  - `w04-g2` (`je … desto`): Türkçede fiil iki yarıda da sonda; ikinci yarı da
 *    yan cümle gibi kurulup fiil sona atılıyor. İngilizce `the …, the …` ikinci yarıda
 *    özne–fiil sırasını koruyor.
 *  - `w04-g1` (`sondern`): İngilizce `but also` → `aber auch`.
 */
export const DE_B2_W04: QuizWeek = {
  id: "de-b2-w04",
  course: "de",
  level: "B2",
  no: 4,
  theme: "Wirtschaft, Konsum und Verantwortung",
  themeTr: "Ekonomi, tüketim ve etik",
  canDo: ["B2.GR.4", "B2.GR.5", "B2.RD.1", "B2.RD.2", "B2.LS.5"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Kommentar",
      genreTr: "Yorum yazısı",
      title: "Billig, aber zu welchem Preis?",
      body:
        "Ein T-Shirt für fünf Euro – für viele Kunden klingt das nach einem guten Geschäft. Wer aber an der Kasse steht, denkt selten darüber nach, wie dieser Preis möglich ist. " +
        "Doch je niedriger der Preis ist, desto höher sind oft die Kosten, die an anderer Stelle bezahlt werden: von Näherinnen in Bangladesch, die für wenige Euro am Tag arbeiten, oder von der Umwelt, die durch giftige Stoffe belastet wird.\n\n" +
        "Seit 2023 gilt in Deutschland ein Gesetz, nach dem große Unternehmen die Arbeitsbedingungen bei ihren Lieferanten überprüfen müssen. " +
        "Werden dort Probleme gefunden, muss das Unternehmen handeln; sonst drohen hohe Strafen. " +
        "Befürworter sprechen von einem historischen Schritt. Vertreter der Wirtschaft warnen dagegen, das Gesetz verursache viel Arbeit mit Formularen und schade vor allem kleineren Firmen.\n\n" +
        "Doch auch die Verbraucher tragen Verantwortung. Umfragen zeigen, dass die meisten Menschen nachhaltige Kleidung eigentlich gut finden. " +
        "Beim Einkauf entscheiden sie sich dann aber doch für das günstigere Produkt. " +
        "Forscher nennen diesen Widerspruch die Lücke zwischen Einstellung und Verhalten.\n\n" +
        "Einige Unternehmen versuchen, diese Lücke zu schließen. Ein Berliner Start-up verkauft zum Beispiel gebrauchte Kleidung, die vorher gereinigt und repariert worden ist. " +
        "Die Kleidung ist nicht nur günstiger als neue Ware, sondern verursacht auch deutlich weniger CO₂. " +
        "Seit der Gründung vor drei Jahren hat sich der Umsatz jedes Jahr verdoppelt.\n\n" +
        "Ob solche Modelle den Markt tatsächlich verändern können, wird sich erst zeigen. " +
        "Klar ist jedoch: Die Frage, wer den wahren Preis eines T-Shirts bezahlt, wird uns noch lange beschäftigen.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Beratungsgespräch am Telefon",
      genreTr: "Telefonla danışma",
      plays: 2,
      segments: [
        { speaker: "Beraterin", text: "Beratung für Verbraucher, guten Tag. Wie kann ich Ihnen helfen?" },
        { speaker: "Herr Kühn", text: "Guten Tag. Ich habe vor vier Monaten online einen Staubsauger gekauft, und seit letzter Woche funktioniert er nicht mehr." },
        { speaker: "Beraterin", text: "Haben Sie sich schon an den Händler gewandt?" },
        { speaker: "Herr Kühn", text: "Ja, aber der Händler sagt, ich solle mich direkt an den Hersteller wenden. Er sei nicht zuständig." },
        { speaker: "Beraterin", text: "Das stimmt so nicht. In den ersten zwei Jahren ist der Händler Ihr Ansprechpartner, nicht der Hersteller." },
        { speaker: "Herr Kühn", text: "Wirklich? Auch wenn ich das Gerät im Internet gekauft habe?" },
        { speaker: "Beraterin", text: "Ja, das spielt keine Rolle. Und weil Sie das Gerät vor weniger als einem Jahr gekauft haben, müssen nicht Sie beweisen, dass der Fehler schon beim Kauf da war, sondern der Händler muss das Gegenteil beweisen." },
        { speaker: "Herr Kühn", text: "Das wusste ich nicht. Was soll ich jetzt tun?" },
        { speaker: "Beraterin", text: "Schreiben Sie dem Händler eine E-Mail und geben Sie ihm zwei Wochen Zeit. Er muss das Gerät dann reparieren oder ersetzen." },
        { speaker: "Herr Kühn", text: "Und wenn er nicht reagiert?" },
        { speaker: "Beraterin", text: "Dann können Sie vom Vertrag zurücktreten und bekommen Ihr Geld zurück. Heben Sie auf jeden Fall die Rechnung auf." },
        { speaker: "Herr Kühn", text: "Vielen Dank, das hat mir sehr geholfen." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b2-w04-r1",
      block: "read",
      ref: "t1",
      stem: "Was meint der Autor mit „je niedriger der Preis ist, desto höher sind oft die Kosten“?",
      options: [
        "Günstige Kleidung wird für die Kunden am Ende immer teurer als teure Kleidung.",
        "Die eigentlichen Kosten tragen andere, zum Beispiel Arbeiterinnen und die Umwelt.",
        "Nur Kleidung mit hohen Preisen wird unter fairen Bedingungen produziert.",
        "Die Kunden bezahlen in Geschäften oft mehr, als die Kleidung wert ist.",
      ],
      answer: 1,
      why: "`je … desto` iki şeyin birlikte değiştiğini söyler: fiyat düştükçe başka yerde ödenen maliyet artar. Hemen arkasından gelen `an anderer Stelle bezahlt werden` ve iki örnek (dikiş işçileri, çevre) bu maliyeti kimin ödediğini açıklıyor. 'Pahalı ürün adildir' gibi ters bir çıkarımı metin yapmıyor.",
      targets: ["lesen.detail", "konnektor.je-desto"],
    },
    {
      id: "de-b2-w04-r2",
      block: "read",
      ref: "t1",
      stem: "Was befürchten die Vertreter der Wirtschaft?",
      options: [
        "dass das Gesetz nicht streng genug ist",
        "dass die Strafen für große Unternehmen zu niedrig sind",
        "dass die Verbraucher weniger Kleidung kaufen",
        "dass das Gesetz vor allem kleinere Firmen belastet",
      ],
      answer: 3,
      why: "Kaygı Konjunktiv I ile aktarılıyor: `verursache viel Arbeit … und schade vor allem kleineren Firmen`. `dagegen` bu görüşü destekçilerin görüşüyle karşılaştırıyor; kimin ne dediğini bağlaç ve kip birlikte gösteriyor.",
      targets: ["lesen.detail", "indirekte-rede.konjunktiv1"],
    },
    {
      id: "de-b2-w04-r3",
      block: "read",
      ref: "t1",
      stem: "Was ist mit der „Lücke zwischen Einstellung und Verhalten“ gemeint?",
      options: [
        "Menschen finden nachhaltige Kleidung gut, kaufen aber trotzdem billig.",
        "Unternehmen halten sich nicht an das, was das Gesetz verlangt.",
        "Nachhaltige Kleidung ist in normalen Geschäften schwer zu finden.",
        "Forscher und Verbraucher haben verschiedene Meinungen über Mode.",
      ],
      answer: 0,
      why: "İfade hemen önceki iki cümleyi adlandırıyor: tutum (`eigentlich gut finden`) ile davranış (`entscheiden sich … für das günstigere Produkt`) arasındaki boşluk. Soyut bir kavramı metindeki örneğe bağlamadan sözcüklerinden tahmin etmek yanıltıyor.",
      targets: ["lesen.inferenz"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b2-w04-l1",
      block: "listen",
      ref: "a1",
      stem: "Was hat der Händler zu Herrn Kühn gesagt?",
      options: [
        "Er bekomme sein Geld sofort zurück.",
        "Er solle sich an den Hersteller wenden.",
        "Der Staubsauger werde repariert.",
        "Er müsse zwei Wochen warten.",
      ],
      answer: 1,
      why: "Herr Kühn satıcının sözünü Konjunktiv I ile aktarıyor (`ich solle`, `er sei nicht zuständig`). Onarım, iki hafta ve para iadesi ise danışmanın anlattığı haklar. Aktarılan konuşmayı ikinci konuşmacının tavsiyesinden ayırmak gerekiyor.",
      targets: ["hoeren.detail", "indirekte-rede.konjunktiv1"],
    },
    {
      id: "de-b2-w04-l2",
      block: "listen",
      ref: "a1",
      stem: "Wer muss in diesem Fall etwas beweisen?",
      options: [
        "Herr Kühn muss beweisen, dass der Fehler schon beim Kauf da war.",
        "Der Hersteller muss beweisen, dass der Fehler neu ist.",
        "Der Händler muss beweisen, dass der Fehler beim Kauf nicht da war.",
        "Niemand muss etwas beweisen, weil online gekauft wurde.",
      ],
      answer: 2,
      why: "`nicht Sie …, sondern der Händler` ispat yükünü satıcıya veriyor. `nicht … sondern` cümlesinin ilk yarısını duyup bırakınca tam tersi anlaşılıyor.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-b2-w04-l3",
      block: "listen",
      ref: "a1",
      stem: "Was soll Herr Kühn zuerst tun?",
      options: [
        "dem Händler schreiben und ihm zwei Wochen Zeit geben",
        "sofort vom Vertrag zurücktreten",
        "den Hersteller anrufen",
        "das Gerät ohne Nachricht zurückschicken",
      ],
      answer: 0,
      why: "Danışman bir sıra veriyor: önce e-posta ve iki haftalık süre, cevap gelmezse (`Und wenn er nicht reagiert?` → `Dann …`) sözleşmeden dönme. Bir koşula bağlı ikinci adımı ilk adım sanmak tavsiye dinlerken sık yapılan hata.",
      targets: ["hoeren.zusammenhang"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b2-w04-g1",
      block: "grammar",
      stem: "Die Kleidung ist nicht nur günstig, ___ auch gut für die Umwelt.",
      options: ["aber", "sondern", "sowohl", "doch"],
      answer: 1,
      why: "`nicht nur`un standart eşi `sondern auch`. `aber` bir karşıtlık kurar, burada ise bir ekleme var: ucuz olmanın üstüne çevre dostu olmak. Türkçe 'ama' ile 'aynı zamanda' arasındaki fark burada da geçerli.",
      targets: ["konnektor.nicht-nur-sondern"],
      byNative: {
        en: {
          options: ["sondern", "aber", "sowohl", "doch"],
          answer: 0,
          why: "İngilizce `not only … but also` → `but` = `aber` aktarımı. Almancada olumsuzlamadan sonra düzeltme ve ekleme `sondern` ile gelir: `nicht nur …, sondern auch`.",
        },
      },
    },
    {
      id: "de-b2-w04-g2",
      block: "grammar",
      stem: "Je billiger ein Produkt ist, desto ___.",
      options: [
        "die Arbeitsbedingungen sind oft schlechter",
        "schlechter die Arbeitsbedingungen oft sind",
        "schlechter sind oft die Arbeitsbedingungen",
        "oft schlechter sind die Arbeitsbedingungen",
      ],
      answer: 2,
      why: "`je` yan cümlesinde fiil sonda (`ist`); `desto` ise ana cümleyi karşılaştırmayla başlatır ve fiil hemen arkasından gelir: `desto schlechter sind`. Türkçede fiil iki yarıda da sonda ('ucuzladıkça … kötüleşir') olduğu için ikinci yarı da yan cümle gibi kurulup fiil sona atılıyor.",
      targets: ["konnektor.je-desto", "wortstellung.v2"],
      byNative: {
        en: {
          options: [
            "schlechter sind oft die Arbeitsbedingungen",
            "die Arbeitsbedingungen sind oft schlechter",
            "schlechter die Arbeitsbedingungen oft sind",
            "oft schlechter sind die Arbeitsbedingungen",
          ],
          answer: 0,
          why: "İngilizce `the cheaper …, the worse the conditions are` ikinci yarıda özne–fiil sırasını korur. Almancada `desto` + karşılaştırmadan sonra hemen fiil gelir, özne arkaya geçer: `desto schlechter sind … die Arbeitsbedingungen`.",
        },
      },
    },
    {
      id: "de-b2-w04-g3",
      block: "grammar",
      stem: "Das Start-up verkauft Kleidung, die vorher gereinigt ___.",
      options: ["geworden ist", "worden ist", "ist worden", "wurde worden"],
      answer: 1,
      why: "Yan cümlede edilgen Perfekt `Partizip II + worden + ist` sırasıyla biter; çekimli `ist` en sona gider. `geworden` 'olmak' anlamındaki `werden`in Partizip'i. Türkçede edilgen ve geçmiş fiile eklerle bağlandığı ve yardımcı fiil olmadığı için ('temizlenmiş') Almancadaki üç parçanın sırası sezilemiyor.",
      targets: ["passiv.perfekt"],
      byNative: {
        en: {
          options: ["ist worden", "geworden ist", "worden ist", "wurde worden"],
          answer: 2,
          why: "İngilizce `that has been cleaned` sırası (`has` önde) `ist worden` diye taşınıyor. Almanca yan cümlede çekimli fiil en sona gider: `gereinigt worden ist`; `geworden` ise `become` anlamında.",
        },
      },
    },
    {
      id: "de-b2-w04-g4",
      block: "grammar",
      stem: "Welche Formulierung bedeutet dasselbe wie „die Kleidung, die vorher repariert worden ist“?",
      options: [
        "die vorher reparierende Kleidung",
        "die Kleidung vorher repariert",
        "die vorher repariert Kleidung",
        "die vorher reparierte Kleidung",
      ],
      answer: 3,
      why: "Edilgen ve bitmiş eylemi Partizip II taşır (`repariert`) ve isimden önce sıfat gibi ek alır: `die … reparierte Kleidung`. Partizip I (`reparierende`) 'onaran' demek; giysi bir şey onarmaz. Türkçe 'onarılmış giysi' yapısı tanıdık, tuzak etken ve edilgen ortacın karışması.",
      targets: ["partizipialattribut.partizip2"],
      byNative: {
        en: {
          options: [
            "die Kleidung vorher repariert",
            "die vorher repariert Kleidung",
            "die vorher reparierte Kleidung",
            "die vorher reparierende Kleidung",
          ],
          answer: 2,
          why: "İngilizcede `the clothing repaired before` öbeği ismin arkasında kalır ve Partizip ek almaz. Almancada Partizip isimden önce durur ve sıfat eki alır: `die vorher reparierte Kleidung`.",
        },
      },
    },
    {
      id: "de-b2-w04-g5",
      block: "grammar",
      stem: "Unternehmen müssen prüfen, ob die Lieferanten die Regeln einhalten. → Unternehmen müssen ___ prüfen.",
      options: [
        "das Einhalten die Regeln von den Lieferanten",
        "die Lieferanten die Regeln einhaltend",
        "die Einhaltung der Regeln durch die Lieferanten",
        "die Einhaltung von die Regeln der Lieferanten",
      ],
      answer: 2,
      why: "Fiil isimleşince nesnesi Genitiv'e (`der Regeln`), öznesi `durch` öbeğine geçer: `die Einhaltung der Regeln durch die Lieferanten`. Türkçe `-me` isimleştirmesinde nesne kendi hâlinde kalabildiği için ('kurallara uyulması') Almancada da Akkusativ korunuyor (`die Regeln`).",
      targets: ["nominalisierung.ung", "genitiv.kette"],
      byNative: {
        en: {
          options: [
            "die Einhaltung von die Regeln der Lieferanten",
            "die Einhaltung der Regeln durch die Lieferanten",
            "das Einhalten die Regeln von den Lieferanten",
            "die Lieferanten die Regeln einhaltend",
          ],
          answer: 1,
          why: "İngilizce `compliance with the rules by the suppliers` edatlarla kurulur ve `of` → `von` diye taşınıyor. Almancada isimleşen fiilin nesnesi Genitiv'e (`der Regeln`), yapan kişi `durch` öbeğine geçer.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b2-w04-v1",
      block: "vocab",
      stem: "Das Unternehmen produziert ___: Es verbraucht nur so viel, wie die Natur wiederherstellen kann.",
      options: ["haltbar", "nachhaltig", "dauernd", "gleichzeitig"],
      answer: 1,
      why: "'Sürdürülebilir' `nachhaltig`. `haltbar` ürünün dayanıklılığı, `dauernd` 'sürekli', `gleichzeitig` 'aynı anda'. Karışma Almancanın kendi içinde: `nachhaltig` ile `haltbar` aynı `halt` kökünü paylaşıyor ve ikisi de 'uzun süre dayanan' gibi duruyor.",
      targets: ["adjektiv.nachhaltig"],
      byNative: {
        en: {
          options: ["nachhaltig", "haltbar", "gleichzeitig", "dauernd"],
          answer: 0,
          why: "İngilizce `sustainable` ile `durable` ayrımı Almancada `nachhaltig` ile `haltbar`. `sustain` → `halten` çağrışımı `haltbar`a götürüyor, ama `haltbar` yalnız dayanıklılık bildirir.",
        },
      },
    },
    {
      id: "de-b2-w04-v2",
      block: "vocab",
      stem: "Nicht nur die Unternehmen, auch die Verbraucher ___ Verantwortung.",
      options: ["nehmen", "machen", "tragen", "halten"],
      answer: 2,
      why: "Sorumluluk Almancada 'taşınır': `Verantwortung tragen`. Türkçe 'sorumluluk almak' `nehmen`e çekiyor; kalıp bağlamdan bağımsız aynı kalıyor.",
      targets: ["kollokation.verantwortung-tragen"],
      byNative: {
        en: {
          options: ["tragen", "nehmen", "halten", "machen"],
          answer: 0,
          why: "İngilizce `take responsibility` → `nehmen` aktarımı. Almanca kalıp `Verantwortung tragen` ya da `übernehmen`.",
        },
      },
    },
    {
      id: "de-b2-w04-v3",
      block: "vocab",
      stem: "Am Ende entscheiden sich viele Kunden doch ___ das günstigere Produkt.",
      options: ["zu", "über", "für", "auf"],
      answer: 2,
      why: "Bir seçeneği tercih etmek `sich für etwas entscheiden`. `zu` mastarlı bir yapı ister (`sich entscheiden, … zu kaufen`), `über etwas entscheiden` bir konuda yetkiyle karar vermek, seçeneklerden birini seçmek değil. Türkçe '-de karar kılmak' ya da '-e karar vermek' `auf`/`zu`ya çekiyor.",
      targets: ["verb.entscheiden-fuer"],
      byNative: {
        en: {
          options: ["über", "für", "auf", "zu"],
          answer: 1,
          why: "İngilizce `decide on` → `über`/`auf` aktarımı. Almancada bir seçeneği tercih etmek `sich für etwas entscheiden`.",
        },
      },
    },
  ],
};
