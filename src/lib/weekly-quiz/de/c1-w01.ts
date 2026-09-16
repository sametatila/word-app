import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 1 · Kanıt ve iddia.
 *
 * ÖLÇÜLEN ŞEY C1'DE DEĞİŞİYOR. Alt seviyelerde madde "kuralı biliyor mu" diye
 * soruyordu; burada "bir iddiayı nasıl ele alıyor" diye soruyor. Okuma ve
 * dinleme maddeleri artık bilgiyi bulmayı değil, KAYNAĞI ve YÖNTEMİ
 * değerlendirmeyi ölçüyor — metnin söylediği şey ile metnin dayandığı şey
 * ayrı iki bilgi.
 *
 * DİLBİLGİSİ TARAFINDA da aynı kayma var: Konjunktiv I, `sich lassen` edilgen
 * karşılığı ve işlev fiili öbeği (`in Frage stellen`) seçilebilecek biçimler
 * değil, ÜSLUBUN gereği. C1'de yanlış cevap dilbilgisi hatası üretmiyor,
 * yanlış ton üretiyor.
 *
 * ÇELDİRİCİLER. `w01-g1` iki anadilde de ayrışıyor ve sebepleri bambaşka:
 * Türkçede aktarım `-miş` ile yapılır ve bu bir KANITSALLIK kipidir, yani
 * öğrenci Almancada da kipsiz bir aktarım bekliyor; İngilizcede aktarım zaman
 * kaydırmasıyla yapılır, yani öğrenci ayrı bir kip aramıyor. İkisi de
 * Indikativ seçiyor, farklı sebeplerle.
 */
export const DE_C1_W01: QuizWeek = {
  id: "de-c1-w01",
  course: "de",
  level: "C1",
  no: 1,
  theme: "Beweis und Behauptung",
  themeTr: "Kanıt ve iddia",
  canDo: ["C1.RD.1", "C1.LS.1", "C1.GR.1", "C1.SPK.2"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Kommentar",
      genreTr: "Köşe yazısı",
      title: "Was eine Studie beweist — und was nicht",
      body:
        "Eine neue Studie behauptet, kurze Pausen verbesserten die Konzentration deutlich. " +
        "Die Autoren erklärten, sie hätten über zwei Jahre hinweg mehr als tausend Mitarbeiter beobachtet. " +
        "Das Ergebnis klingt zunächst überzeugend; bei genauerem Lesen bleiben allerdings Fragen offen.\n\n" +
        "Zum einen wurde die Untersuchung von einer Firma finanziert, die Software für die Planung von Pausen verkauft. " +
        "Das macht die Erkenntnisse nicht falsch, wirft aber die Frage auf, wie unabhängig sie sind. " +
        "Zum anderen beruht ein erheblicher Teil der Daten auf eigenen Angaben: " +
        "Die Teilnehmer gaben selbst an, wie konzentriert sie sich fühlten. Solche Angaben lassen sich kaum überprüfen.\n\n" +
        "Kritiker räumen ein, dass Pausen sinnvoll seien. Sie bezweifeln jedoch, dass der nachgewiesene " +
        "Zusammenhang so stark sei wie behauptet — zumal andere Untersuchungen zu anderen Ergebnissen kommen.\n\n" +
        "Wer eine Behauptung prüfen will, sollte deshalb nicht nur auf das Ergebnis schauen, sondern auch darauf, " +
        "wer die Untersuchung bezahlt hat und wie die Daten entstanden sind.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Radiogespräch",
      genreTr: "Radyo tartışması",
      plays: 2,
      segments: [
        { speaker: "Moderator", text: "Frau Berger, die Studie wird viel zitiert. Überzeugt sie Sie?" },
        { speaker: "Berger", text: "Teilweise. Die Frage ist interessant, die Methode aber schwach." },
        { speaker: "Moderator", text: "Was genau meinen Sie damit?" },
        { speaker: "Berger", text: "Die Daten beruhen auf eigenen Angaben der Teilnehmer. Das ist kein Beleg, das ist ein Eindruck." },
        { speaker: "Moderator", text: "Herr Klein, Sie sehen das anders." },
        { speaker: "Klein", text: "Ich räume ein, dass die Methode Schwächen hat. Dennoch halte ich das Ergebnis für plausibel." },
        { speaker: "Berger", text: "Plausibel heißt nicht nachgewiesen." },
        { speaker: "Klein", text: "Zugegeben. Aber wir verlangen von keiner Untersuchung den endgültigen Beweis." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama — kaynağı değerlendirme ──────────────────────── */
    {
      id: "de-c1-w01-r1",
      block: "read",
      ref: "t1",
      stem: "Worin besteht der Haupteinwand des Textes gegen die Studie?",
      options: [
        "Die Studie wurde nie veröffentlicht",
        "Die Zahl der Teilnehmer war zu klein",
        "Finanzierung und Datengrundlage werfen Fragen auf",
        "Pausen wirken sich negativ auf die Konzentration aus",
      ],
      answer: 2,
      why: "Metin iki itiraz sıralıyor: kim finanse etti (`zum einen`) ve veriler nasıl toplandı (`zum anderen`). Sonucu yanlışlamıyor — DAYANAĞINI sorguluyor. Katılımcı sayısı metinde bin'den fazla diye geçiyor, yani itiraz orada değil.",
      targets: ["lesen.quellenkritik", "argumentation.einwand"],
    },
    {
      id: "de-c1-w01-r2",
      block: "read",
      ref: "t1",
      stem: "Wie stehen die Kritiker zu Pausen?",
      options: [
        "Sie lehnen jede Untersuchung zum Thema ab",
        "Sie halten Pausen für wirkungslos",
        "Sie fordern längere Pausen",
        "Sie halten Pausen für sinnvoll, bezweifeln aber die Stärke des Zusammenhangs",
      ],
      answer: 3,
      why: "\"Kritiker räumen ein, dass Pausen sinnvoll seien\" — yani konunun kendisine karşı değiller. İtiraz iddianın GÜCÜNE: `so stark … wie behauptet`. C1'de en sık kaçırılan ayrım budur: bir iddiayı zayıflatmak onu reddetmek değildir.",
      targets: ["lesen.differenzierung", "argumentation.einwand"],
    },
    {
      id: "de-c1-w01-r3",
      block: "read",
      ref: "t1",
      stem: "Worauf sollte man laut Text bei einer Behauptung achten?",
      options: [
        "Nur auf das veröffentlichte Ergebnis",
        "Auf Finanzierung und Entstehung der Daten",
        "Auf die Dauer der Untersuchung",
        "Auf die Zahl der zitierenden Zeitungen",
      ],
      answer: 1,
      why: "Son paragraf açıkça söylüyor: `nicht nur auf das Ergebnis …, sondern auch darauf, wer … bezahlt hat und wie die Daten entstanden sind`. İki yıllık süre metinde geçiyor ama ölçüt olarak değil, bilgi olarak.",
      targets: ["lesen.detail", "argumentation.kriterium"],
    },

    /* ── Dinlediğini anlama — konumları ayırt etme ─────────────────────── */
    {
      id: "de-c1-w01-l1",
      block: "listen",
      ref: "a1",
      stem: "Wie beurteilt Frau Berger die Studie?",
      options: [
        "Die Fragestellung ist interessant, die Methode schwach",
        "Sie überzeugt sie vollständig",
        "Sie hält die Studie für gefälscht",
        "Sie kennt die Studie nicht",
      ],
      answer: 0,
      why: "\"Teilweise. Die Frage ist interessant, die Methode aber schwach.\" `teilweise` ve `aber` birlikte bölünmüş bir değerlendirme kuruyor — ne tam onay ne tam ret. Sahtecilik suçlaması hiç yapılmıyor.",
      targets: ["hoeren.haltung", "konnektor.aber"],
    },
    {
      id: "de-c1-w01-l2",
      block: "listen",
      ref: "a1",
      stem: "Was wirft Frau Berger den Daten vor?",
      options: [
        "Sie seien erfunden",
        "Sie stammten aus einem anderen Land",
        "Sie beruhten auf Eindrücken statt auf Belegen",
        "Sie seien zu alt",
      ],
      answer: 2,
      why: "\"Das ist kein Beleg, das ist ein Eindruck.\" Cümle bir karşıtlık kuruyor ve eleştirinin tamamı o karşıtlıkta: veri yanlış değil, KANIT değerinde değil.",
      targets: ["hoeren.argument", "wortfeld.argumentation"],
    },
    {
      id: "de-c1-w01-l3",
      block: "listen",
      ref: "a1",
      stem: "Worin stimmen beide Gesprächspartner überein?",
      options: [
        "Dass die Studie wertlos ist",
        "Dass Pausen der Konzentration schaden",
        "Dass mehr Geld für Forschung nötig ist",
        "Dass die Methode Schwächen hat",
      ],
      answer: 3,
      why: "Klein \"Ich räume ein, dass die Methode Schwächen hat\" diyor; Berger zaten yöntemi eleştiriyor. Anlaşma noktası burası — tartışma yöntemin zayıflığında değil, o zayıflığın sonucu geçersiz kılıp kılmadığında.",
      targets: ["hoeren.konsens", "verb.einraeumen"],
    },

    /* ── Dilbilgisi — üslubun gereği ───────────────────────────────────── */
    {
      id: "de-c1-w01-g1",
      block: "grammar",
      stem: "Die Autoren erklärten, sie ___ mehr als tausend Mitarbeiter beobachtet.",
      options: ["haben", "hätten", "hatten", "habe"],
      answer: 1,
      why: "Dolaylı anlatımda Konjunktiv kullanılır. Üçüncü çoğulda Konjunktiv I (`haben`) Indikativ ile aynı göründüğü için ayırt edici değildir; bu durumda Konjunktiv II'ye geçilir: `hätten`.",
      targets: ["konjunktiv1.indirekte-rede", "verb.haben"],
      byNative: {
        tr: {
          options: ["haben", "hätten", "hatten", "habe"],
          answer: 1,
          why: "Türkçede aktarım `-miş` ile yapılır ve bu bir KANITSALLIK kipidir — 'gözlemlemişler'. Almancada karşılığı ayrı bir kanıtsallık eki değil, Konjunktiv. `-miş` sezgisiyle Indikativ `haben` seçiliyor.",
        },
        en: {
          options: ["haben", "hätten", "hatten", "habe"],
          answer: 1,
          why: "İngilizcede dolaylı anlatım zaman KAYDIRMASIYLA kurulur (`said they had observed`), ayrı bir kip yok. O yüzden `hatten` (Plusquamperfekt) doğru görünüyor; Almancada kaydırma değil Konjunktiv gerekiyor.",
        },
      },
    },
    {
      id: "de-c1-w01-g2",
      block: "grammar",
      stem: "Solche Angaben ___ kaum überprüfen.",
      options: ["lassen sich", "werden sich", "sind sich", "haben sich"],
      answer: 0,
      why: "`sich lassen + Infinitiv` edilgenin yerini tutar ve 'yapılabilirlik' bildirir: doğrulanamaz. Werden-Passiv kurulsaydı fiil mastar kalmazdı (`werden kaum überprüft`).",
      targets: ["passiversatz.sich-lassen", "passiv"],
      byNative: {
        en: {
          options: ["lassen sich", "werden sich", "sind sich", "haben sich"],
          answer: 0,
          why: "İngilizcede bu anlam `can hardly be checked` ile kurulur, yani edilgen + modal. Almancada `sich lassen` tek başına ikisini birden taşıyor; `werden` arayınca cümle bozuluyor.",
        },
      },
    },
    {
      id: "de-c1-w01-g3",
      block: "grammar",
      stem: "Die Methode hat Schwächen. ___ halte ich das Ergebnis für plausibel.",
      options: ["Deshalb", "Sofern", "Dennoch", "Zumal"],
      answer: 2,
      why: "`dennoch` bir karşıtlık kurar: zayıflığa RAĞMEN. `deshalb` sonuç bildirir ve cümleyi tersine çevirir; `zumal` gerekçe ekler; `sofern` koşul kurar ve tek başına cümle başında bu anlamı vermez.",
      targets: ["konnektor.dennoch", "konnektor.gegensatz"],
    },
    {
      id: "de-c1-w01-g4",
      block: "grammar",
      stem: "Welcher Satz sagt dasselbe wie: „Die Überprüfung der Angaben ist kaum möglich.\"?",
      options: [
        "Die Überprüfung hat kaum stattgefunden.",
        "Die Angaben überprüfen sich kaum.",
        "Die Angaben sind kaum überprüft worden.",
        "Die Angaben lassen sich kaum überprüfen.",
      ],
      answer: 3,
      why: "Özgün cümle isim üslubuyla bir İMKÂNSIZLIK bildiriyor. `sich lassen` onu fiil üslubuna çevirir ve aynı anlamı verir. Öteki üçü anlamı kaydırıyor: biri olayın gerçekleşmediğini, biri geçmişte yapılmadığını söylüyor, biri de kurulamaz bir yapı.",
      targets: ["nominalstil", "passiversatz.sich-lassen"],
      byNative: {
        tr: {
          options: [
            "Die Überprüfung hat kaum stattgefunden.",
            "Die Angaben überprüfen sich kaum.",
            "Die Angaben sind kaum überprüft worden.",
            "Die Angaben lassen sich kaum überprüfen.",
          ],
          answer: 3,
          why: "Türkçe '-ebilir' eki imkânı doğrudan fiile ekler ('doğrulanamaz'), o yüzden Almancada da fiilin kendisinde bir dönüşlülük aranıyor ve `überprüfen sich` kuruluyor. Almancada imkân `sich lassen` öbeğiyle taşınır.",
        },
      },
    },
    {
      id: "de-c1-w01-g5",
      block: "grammar",
      stem: "___ der schwachen Methode wird die Studie häufig zitiert.",
      options: ["Wegen", "Trotz", "Während", "Statt"],
      answer: 1,
      why: "`trotz` Genitiv alır ve karşıtlık kurar: zayıf yönteme rağmen alıntılanıyor. `wegen` de Genitiv alır ama sebep bildirir ve cümleyi anlamsızlaştırır — zayıf yöntem alıntılanmanın sebebi olamaz.",
      targets: ["praeposition.genitiv", "konnektor.gegensatz"],
    },

    /* ── Bağlamda kelime — argümantasyon sözlüğü ───────────────────────── */
    {
      id: "de-c1-w01-v1",
      block: "vocab",
      stem: "Die Autoren ___ ein, dass die Methode Schwächen hat.",
      options: ["geben", "stellen", "räumen", "nehmen"],
      answer: 2,
      why: "`einräumen` bir itirazı kabul etmek demek ve `dass` cümlesi alır. Öteki üçü de `ein-` önekiyle gerçek fiiller kurar (eingeben, einstellen, einnehmen) ama hiçbiri bu anlamda `dass` cümlesi almaz — tuzak önekte değil, gövdede.",
      targets: ["verb.einraeumen", "verb.trennbar"],
    },
    {
      id: "de-c1-w01-v2",
      block: "vocab",
      stem: "Der ___ zwischen Pausen und Konzentration ist schwächer als behauptet.",
      options: ["Zusammenhang", "Unterschied", "Vergleich", "Wechsel"],
      answer: 0,
      why: "`Zusammenhang` iki şey arasındaki BAĞ demek ve `schwach/stark` ile ölçülür. `Unterschied` farktır ve `groß/klein` ile ölçülür; cümledeki sıfat hangi ismin aranadığını söylüyor.",
      targets: ["wortfeld.argumentation", "kollokation.zusammenhang"],
    },
    {
      id: "de-c1-w01-v3",
      block: "vocab",
      stem: "Die Ergebnisse werden von mehreren Fachleuten ___ Frage gestellt.",
      options: ["zur", "in", "unter", "auf"],
      answer: 1,
      why: "`in Frage stellen` yerleşik bir işlev fiili öbeğidir: sorgulamak. Öbeğin edatı değişmez ve tek tek anlamlardan türetilemez — `zur Frage stellen` ya da `unter Frage stellen` diye bir kalıp yoktur.",
      targets: ["funktionsverbgefuege", "praeposition.feste-wendung"],
      byNative: {
        en: {
          options: ["zur", "in", "unter", "auf"],
          answer: 1,
          why: "İngilizcede `call into question` deniyor ve `into` → `in` eşlemesi burada tutuyor; asıl tuzak `under` sezgisi (`under question` diye bir kalıp yok). Öbek bir bütündür, sözcük sözcük çevrilmez.",
        },
      },
    },
  ],
};
