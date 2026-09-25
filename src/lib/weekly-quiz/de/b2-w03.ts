import type { QuizWeek } from "../types";

/**
 * B2 · Hafta 3 · Kültür, sanat ve kimlik.
 *
 * ÖLÇÜLEN ŞEY: bir sergi yazısını ve iki dilli bir oyun üzerine sohbeti
 * anlamak; `als` ile gerçek dışı karşılaştırma, Genitiv edatı, Partizip I
 * sıfat öbeği, durum edilgeni. Geri dönüş: `konjunktiv2.vergangenheit` (W1),
 * `nominalisierung.ung` (W1), `konnektor.obwohl` (W1), `passiv.perfekt` (W2).
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w03-g1` (`als wäre`): Türkçede gerçek dışılığı fiil değil 'gibi' taşıdığı
 *    için Almancada fiil düz bırakılıyor (`ist`, `war`); İngilizce `as if she was`
 *    aynı yanlışı başka yoldan üretiyor.
 *  - `w03-g3` (Partizip I): Türk öğrenciye '-en' ortacı tanıdık, tuzak etken
 *    (`wartend`) ile edilgen/bitmiş (`gewartet`) ortacın karışması ve ek;
 *    İngilizce konuşan için tuzak öbeği ilgi cümlesine çevirmek.
 *  - `w03-g2` (`Wegen`): İngilizce `because` → `weil` (cümle bağlacı) isim
 *    öbeğinin önüne geliyor; Türk öğrencide ise karışan şey anlam değil, cümle
 *    bağlacı ile edat ayrımı.
 */
export const DE_B2_W03: QuizWeek = {
  id: "de-b2-w03",
  course: "de",
  level: "B2",
  no: 3,
  theme: "Kultur, Kunst und Identität",
  themeTr: "Kültür, sanat ve kimlik",
  canDo: ["B2.GR.1", "B2.GR.3", "B2.RD.1", "B2.LS.3", "B2.SPK.2"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Ausstellungsbericht",
      genreTr: "Sergi yazısı",
      title: "Fremde Heimat – eine Ausstellung über Familienalben",
      body:
        "Wer in diesen Wochen das Museum der Stadt besucht, sieht zunächst keine berühmten Gemälde, sondern ganz gewöhnliche Fotos von Familien: Hochzeiten, erste Schultage, Picknicks am Rhein. " +
        "Die Bilder stammen von Familien, die vor etwa sechzig Jahren aus der Türkei, Italien und Griechenland nach Köln gekommen sind.\n\n" +
        "Die Idee zur Ausstellung entstand, als die Leiterin der Ausstellung, Selin Akgül, im Keller ihrer Großmutter einen Karton mit alten Fotos fand. " +
        "„Ich hatte das Gefühl, als würde ich meine Stadt zum ersten Mal sehen“, erzählt sie. " +
        "Nach einem Aufruf in der Zeitung meldeten sich mehr als 200 Familien, die ihre privaten Bilder zur Verfügung stellten.\n\n" +
        "Besonders beeindruckend ist ein Raum, in dem Fotos derselben Straße aus fünfzig Jahren in einer Reihe hängen. " +
        "Man sieht, wie sich Geschäfte, Kleidung und Gesichter verändern, sodass die Geschichte der Einwanderung fast wie ein Film wirkt. " +
        "Ergänzt werden die Bilder durch Aufnahmen, in denen die Kinder und Enkel der Fotografierten erzählen, was die Fotos heute für sie bedeuten.\n\n" +
        "Nicht alle Besucher sind begeistert. Einige kritisieren, die Ausstellung zeige ein zu freundliches Bild und verschweige die Schwierigkeiten, mit denen die Familien damals zu kämpfen hatten. " +
        "Akgül weist diesen Vorwurf zurück: Die Fotos seien nun einmal an glücklichen Tagen entstanden; über die Probleme werde in den Aufnahmen offen gesprochen.\n\n" +
        "Trotz dieser Diskussion ist die Ausstellung ein großer Erfolg. Wegen der großen Nachfrage wird sie bis Ende März verlängert. Für Schüler ist der Eintritt frei.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Gespräch nach dem Theater",
      genreTr: "Oyun sonrası sohbet",
      plays: 2,
      segments: [
        { speaker: "Emma", text: "Und, wie hat dir das Stück gefallen?" },
        { speaker: "Deniz", text: "Ehrlich gesagt hatte ich am Anfang Zweifel. Ein Theaterstück in zwei Sprachen, ich dachte, das würde anstrengend werden." },
        { speaker: "Emma", text: "Mir ging es genauso. Aber die Übersetzungen über der Bühne haben ja gut funktioniert." },
        { speaker: "Deniz", text: "Die habe ich fast nie gelesen. Die Hälfte war Türkisch, das verstehe ich sowieso." },
        { speaker: "Emma", text: "Stimmt, du hattest einen Vorteil. Ich musste ständig nach oben schauen, sodass ich manche Szenen verpasst habe." },
        { speaker: "Deniz", text: "Welche Szene hat dich am meisten beeindruckt?" },
        { speaker: "Emma", text: "Die, in der die Tochter mit ihrer Mutter streitet und mitten im Satz die Sprache wechselt. Als wäre sie plötzlich eine andere Person." },
        { speaker: "Deniz", text: "Genau das kenne ich von mir. Wenn ich mit meinen Eltern über Gefühle spreche, rede ich Türkisch, über die Arbeit eher Deutsch." },
        { speaker: "Emma", text: "So habe ich das nie gesehen. Hättest du mir das früher erzählt, hätte ich das Stück wahrscheinlich besser verstanden." },
        { speaker: "Deniz", text: "Das Ende fand ich allerdings schwach. Die Konflikte wurden viel zu schnell gelöst." },
        { speaker: "Emma", text: "Da bin ich anderer Meinung. Mir hat gefallen, dass es kein glückliches Ende gab, sondern nur eine offene Frage." },
        { speaker: "Deniz", text: "Vielleicht sollten wir es uns noch einmal anschauen. Diesmal tauschen wir die Plätze, und ich lese die Übersetzungen." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b2-w03-r1",
      block: "read",
      ref: "t1",
      stem: "Wie kam Selin Akgül an die meisten Bilder der Ausstellung?",
      options: [
        "Sie fand sie im Keller ihrer Großmutter.",
        "Viele Familien schickten ihr Fotos, nachdem in der Zeitung ein Aufruf erschienen war.",
        "Sie kaufte die Fotos von berühmten Fotografen, die vor sechzig Jahren gearbeitet haben.",
        "Das Museum hatte die Bilder schon seit vielen Jahren selbst gesammelt.",
      ],
      answer: 1,
      why: "Büyükannenin kutusu serginin fikrinin doğduğu yer (`Die Idee … entstand, als …`); fotoğrafların büyük kısmı ise gazetedeki çağrıya cevap veren 200'den fazla aileden geliyor. `entstand, als` yan cümlesi bir başlangıç anını anlatıyor; onu kaynağın kendisi sanmak sık hata.",
      targets: ["lesen.detail"],
    },
    {
      id: "de-b2-w03-r2",
      block: "read",
      ref: "t1",
      stem: "Was kritisieren einige Besucher?",
      options: [
        "Die Ausstellung stelle das Leben der Familien zu positiv dar.",
        "Die Ausstellung zeige die Probleme der Familien zu deutlich.",
        "Die Aufnahmen seien für Schüler zu lang.",
        "Die Ausstellung werde zu lange gezeigt.",
      ],
      answer: 0,
      why: "`ein zu freundliches Bild` ve `verschweige die Schwierigkeiten` aynı eleştirinin iki yüzü: zorluklar gösterilmiyor. `zu deutlich` diyen şık eleştiriyi tersine çeviriyor. `verschweigen` 'söylememek, gizlemek' demek; bilinmezse cümle ters okunuyor.",
      targets: ["lesen.detail", "indirekte-rede.konjunktiv1"],
    },
    {
      id: "de-b2-w03-r3",
      block: "read",
      ref: "t1",
      stem: "Wie reagiert Selin Akgül auf die Kritik?",
      options: [
        "Sie gibt den Kritikern recht und will die Ausstellung ändern.",
        "Sie sagt, es habe damals keine Probleme gegeben.",
        "Sie meint, über die Probleme werde in den Aufnahmen offen gesprochen.",
        "Sie verlängert die Ausstellung, damit mehr Probleme gezeigt werden.",
      ],
      answer: 2,
      why: "`weist … zurück` eleştiriyi reddetmek demek. Gerekçesi Konjunktiv I ile aktarılıyor: fotoğraflar mutlu günlerde çekilmiş, sorunlar ise kayıtlarda açıkça konuşuluyor. Sorun olmadığını söylemiyor. Serginin uzatılması da eleştiriyle değil talep yüzünden.",
      targets: ["lesen.detail", "passiv.unpersoenlich"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b2-w03-l1",
      block: "listen",
      ref: "a1",
      stem: "Warum hat Emma einige Szenen verpasst?",
      options: [
        "Sie hatte am Anfang so viele Zweifel, dass sie nicht richtig zugehört hat.",
        "Ihr Platz war so weit hinten, dass sie die Bühne kaum sehen konnte.",
        "Sie musste ständig die Übersetzungen lesen.",
        "Das Stück war so lang, dass sie müde wurde.",
      ],
      answer: 2,
      why: "`sodass` sonucu getiriyor: sürekli yukarıya, çevirilere bakmak → bazı sahneleri kaçırmak. Başlangıçtaki şüphe (`Zweifel`) ikisinin de duygusu, sahne kaçırmanın nedeni değil. Sonuç bağlacından önceki cümle nedeni taşıyor.",
      targets: ["hoeren.detail", "konnektor.sodass"],
    },
    {
      id: "de-b2-w03-l2",
      block: "listen",
      ref: "a1",
      stem: "Was sagt Deniz über seine beiden Sprachen?",
      options: [
        "Er spricht mit seinen Eltern nur Deutsch.",
        "Er wechselt nie mitten im Gespräch die Sprache.",
        "Er liest lieber Türkisch als Deutsch.",
        "Er wählt die Sprache je nach Thema.",
      ],
      answer: 3,
      why: "Deniz dili konuya göre seçiyor: duygular Türkçe, iş daha çok Almanca. `eher` 'daha çok' demek, kesin bir kural değil. Tek bir örneği (anne babayla konuşmayı) genellemek konuşmadaki ince ayrımı siliyor.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-b2-w03-l3",
      block: "listen",
      ref: "a1",
      stem: "Wie bewerten die beiden das Ende des Stücks?",
      options: [
        "Beide finden es schwach.",
        "Emma findet es zu schnell, Deniz gefällt es.",
        "Beide finden die offene Frage gut.",
        "Deniz findet es schwach, Emma gefällt es.",
      ],
      answer: 3,
      why: "`Da bin ich anderer Meinung` karşıt bir görüş açıyor: Deniz sonu zayıf buluyor, Emma açık sonu beğeniyor. `zu schnell` diyen şık görüşlerin sahiplerini yer değiştiriyor; iki kişilik bir tartışmada asıl iş kimin ne dediğini takip etmek.",
      targets: ["hoeren.zusammenhang"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b2-w03-g1",
      block: "grammar",
      stem: "Sie sprach so, als ___ sie plötzlich eine andere Person.",
      options: ["ist", "wäre", "war", "würde"],
      answer: 1,
      why: "`als` ile kurulan gerçek dışı karşılaştırmada ('sanki … gibi') çekimli fiil hemen `als`ın arkasına gelir ve Konjunktiv ister: `als wäre sie`. Türkçede gerçek dışılığı fiil değil 'gibi' sözcüğü taşıdığı için Almancada fiil düz bırakılıyor (`ist`, `war`). `würde` tek başına fiilsiz kalır.",
      targets: ["konjunktiv2.als-ob"],
      byNative: {
        en: {
          options: ["war", "würde", "wäre", "ist"],
          answer: 2,
          why: "İngilizce `as if she was` → `war` aktarımı. Almancada `als`tan sonra fiil hemen gelir ve Konjunktiv ister (II ya da I): `als wäre sie`. `würde` burada bir mastar olmadan eksik kalır.",
        },
      },
    },
    {
      id: "de-b2-w03-g2",
      block: "grammar",
      stem: "___ der großen Nachfrage wird die Ausstellung bis Ende März verlängert.",
      options: ["Obwohl", "Weil", "Wegen", "Trotz"],
      answer: 2,
      why: "Neden bir isim öbeğiyle verildiğinde Genitiv edatı gelir: `wegen der Nachfrage`. `obwohl` ve `weil` isim değil yan cümle bağlar; `trotz` da bir Genitiv edatı ama karşıtlık bildirir, oysa talep uzatmanın nedeni. Türkçe 'talep yüzünden' ile 'talep olduğu için' aynı şeyi söylese de Almancada biri edat, öteki bağlaç ister.",
      targets: ["genitiv.praeposition", "konnektor.obwohl"],
      byNative: {
        en: {
          options: ["Weil", "Wegen", "Deshalb", "Trotz"],
          answer: 1,
          why: "İngilizce `because` → `weil` aktarımı. `weil` bir yan cümle kurar ve fiil ister; isim öbeğinden önce (`because of`) Genitiv edatı `wegen` gelir.",
        },
      },
    },
    {
      id: "de-b2-w03-g3",
      block: "grammar",
      stem: "Die vor dem Museum ___ Besucher diskutierten lange über die Fotos.",
      options: ["gewarteten", "wartenden", "warteten", "wartende"],
      answer: 1,
      why: "Etken ve o sırada süren eylem Partizip I (`-end`) ile anlatılır: 'müzenin önünde bekleyen ziyaretçiler'. Türkçede '-en' ortacı da isimden önce geldiği için yapı tanıdık; tuzak çoğul belirli artikelden sonraki `-en` eki ve bitmiş/edilgen anlam veren `gewartet`.",
      targets: ["partizipialattribut.partizip1"],
      byNative: {
        en: {
          options: ["warteten", "wartend", "wartenden", "wartende"],
          answer: 2,
          why: "İngilizce `the visitors waiting outside the museum` öbeği ismin arkasına koyar. Almancada öbek isimden önce durur ve sıfat gibi çekimlenir: `die … wartenden Besucher`. İngilizce ortaç ek almadığı için eksiz `wartend` kuruluyor; `warteten` ise çekimli bir fiil ve ancak bir ilgi cümlesinde (`die … warteten`) kullanılabilir.",
        },
      },
    },
    {
      id: "de-b2-w03-g4",
      block: "grammar",
      stem: "Die Ausstellung ___ seit Montag wieder geöffnet.",
      options: ["wird", "worden", "ist", "wurde"],
      answer: 2,
      why: "Bir işlemin sonucu olan durum `sein` + Partizip II ile anlatılır (Zustandspassiv): sergi açık. `wird geöffnet` açılma eylemini anlatır ve `seit` ile süren bir durumu karşılamaz. Türkçedeki 'açıldı' ile 'açık' ayrımı bunun karşılığı.",
      targets: ["passiv.zustand", "passiv.perfekt"],
      byNative: {
        en: {
          options: ["ist", "wird", "worden", "wurde"],
          answer: 0,
          why: "İngilizce `is opened` hem eylemi hem durumu anlatabilir. Almancada ikisi ayrı: durum `ist geöffnet`, eylem `wird geöffnet`. `seit Montag` süren bir durumu işaret ediyor.",
        },
      },
    },
    {
      id: "de-b2-w03-g5",
      block: "grammar",
      stem: "Wenn ich die Ausstellung früher gesehen ___, hätte ich meine Großmutter mitgenommen.",
      options: ["würde", "habe", "wäre", "hätte"],
      answer: 3,
      why: "Gerçekleşmemiş geçmiş koşul iki tarafta da Konjunktiv II ister ve `sehen` Perfekt'i `haben` ile kurar: `gesehen hätte`. Türkçede gerçek dışılık ve geçmiş aynı fiil kümesinde toplandığı ve yardımcı fiil olmadığı için ('görseydim') koşul tarafında kip unutuluyor (`habe`) ya da `würde`ye kaçılıyor.",
      targets: ["konjunktiv2.vergangenheit"],
      byNative: {
        en: {
          options: ["hätte", "hatte", "würde", "wäre"],
          answer: 0,
          why: "İngilizce `if I had seen` → `hatte` (bildirme kipinde Plusquamperfekt) aktarımı; `had` birebir `hatte` diye çevriliyor. Almancada koşul tarafı da Konjunktiv II ister: `gesehen hätte`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b2-w03-v1",
      block: "vocab",
      stem: "Nach dem Abitur am ___ hat sie in Berlin Kunst studiert.",
      options: ["Fitnessstudio", "Gymnasium", "Turnhalle", "Sportverein"],
      answer: 1,
      why: "Almanca `das Gymnasium` üniversiteye hazırlayan lise. Türkçe 'jimnastik' çağrışımı spor mekânlarına götürüyor. Cümledeki `Abitur` bir okul bitirme sınavı olduğunu gösteriyor.",
      targets: ["falschfreund.gymnasium"],
      byNative: {
        en: {
          options: ["Gymnasium", "Turnhalle", "Fitnessstudio", "Sportverein"],
          answer: 0,
          why: "İngilizce `gym`/`gymnasium` spor salonu, Almanca `das Gymnasium` ise lise. Spor salonu `Turnhalle` ya da `Fitnessstudio`; `Abitur` burada okul olduğunu gösteriyor.",
        },
      },
    },
    {
      id: "de-b2-w03-v2",
      block: "vocab",
      stem: "Deniz fühlt sich in beiden Kulturen ___.",
      options: ["nach Hause", "zu Hause", "im Haus", "zum Haus"],
      answer: 1,
      why: "Bir yerde bulunmak `zu Hause`, bir yere gitmek `nach Hause`; 'kendini evinde hissetmek' de bir bulunma hâli: `sich zu Hause fühlen`. Türkçede '-e' ve '-de' ekleri ayrı, ama iki kalıbın ikisi de 'ev' sözcüğüyle kurulduğu için edat karışıyor. `im Haus` somut bir binanın içi.",
      targets: ["kollokation.zu-hause"],
      byNative: {
        en: {
          options: ["im Haus", "nach Hause", "zum Haus", "zu Hause"],
          answer: 3,
          why: "İngilizce `feel at home` → `am/im Haus` aktarımı somut bir binayı anlatır. Almanca kalıp `sich zu Hause fühlen`; `nach Hause` ise eve doğru gitmek.",
        },
      },
    },
    {
      id: "de-b2-w03-v3",
      block: "vocab",
      stem: "Die ___ enthält mehr als 3.000 Fotos von Familien.",
      options: ["Sammeln", "Sammlung", "Gesammelte", "Sammel"],
      answer: 1,
      why: "Toplama işinin sonucu olan bütün, yani 'koleksiyon' `die Sammlung`. `das Sammeln` toplama eyleminin kendisi ve nötr olduğu için `die` ile uyuşmaz; eylem fotoğraf 'içermez'. Türkçe '-me' eki her fiile eklendiği için mastar isim gibi kullanılıyor.",
      targets: ["nominalisierung.ung"],
      byNative: {
        en: {
          options: ["Gesammelte", "Sammeln", "Sammel", "Sammlung"],
          answer: 3,
          why: "İngilizce `the collecting` → `das Sammeln` aktarımı; mastardan türeyen isim nötr ve `die` ile uyuşmaz. Dişil isim `die Sammlung`.",
        },
      },
    },
  ],
};
