import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 3 · Eğitim ve kariyer planları.
 *
 * ÖLÇÜLEN ŞEY: kişisel bir anlatıda kararın gerekçesini ve GERÇEKLEŞMEMİŞ
 * durumu (`Wenn ich gekündigt hätte …`) olmuş bir olaydan ayırmak; bir meslek
 * danışmanlığı görüşmesinde tavsiyeyi, düzeltmeyi ve son tarihi izlemek.
 * Dilbilgisi: ilgi cümlesi (Nominativ, Akkusativ, edatlı Dativ) ve gerçek dışı
 * koşulda `hätte`.
 *
 * ARALIKLI TEKRAR: `w03-g5` W1'in `konjunktiv2.wuerde` ve `wortstellung.v2`
 * hedeflerini bu kez `wenn`li bir varsayımda birlikte yokluyor.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w03-g1`/`w03-g3` (ilgi zamiri): Türkçede ilgi cümlesi bir ekle ismin
 *    ÖNÜNDE kuruluyor ve zamir hiç yok (`konuştuğum danışman`), `ile` de fiilin
 *    içinde eriyor. İngilizcede zamir cinsiyetsiz (`who`) ve düşebiliyor, edat
 *    sona kayabiliyor (`the advisor I talked to`). Almancada üçü de yasak.
 *  - `w03-g4` (`hätte`): Türkçede `-sa` eki varsayımı tek başına taşıyor;
 *    İngilizcede varsayım geçmiş zaman biçimiyle kuruluyor (`If I had`) ve
 *    bu yüzden `hatte` geliyor.
 *  - `w03-v2` (`werden`): İngilizce konuşan için `become` → `bekommen`.
 */
export const DE_B1_W03: QuizWeek = {
  id: "de-b1-w03",
  course: "de",
  level: "B1",
  no: 3,
  theme: "Ausbildung, Studium und Beruf",
  themeTr: "Eğitim ve kariyer planları",
  canDo: ["B1.RD.4", "B1.LS.1", "B1.SPK.5", "B1.GR.4", "B1.GR.2"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Erfahrungsbericht",
      genreTr: "Deneyim yazısı",
      title: "Von der Bank an die Uni",
      body:
        "Nach der Schule habe ich eine Ausbildung bei einer Bank gemacht. Meine Eltern fanden das sicher, " +
        "und ich wusste damals nicht, was ich wirklich wollte. Die Arbeit war nicht schlecht, aber nach fünf Jahren " +
        "hatte ich das Gefühl, dass ich jeden Tag das Gleiche mache.\n\n" +
        "Eine Kollegin, die abends an der Universität studierte, hat mir dann von ihrem Studium erzählt. Ich war sofort interessiert. " +
        "Das Problem war das Geld: Wenn ich meine Stelle gekündigt hätte, hätte ich meine Wohnung nicht mehr bezahlen können. " +
        "Deshalb arbeite ich jetzt nur noch drei Tage pro Woche und besuche an zwei Abenden Kurse an der Uni.\n\n" +
        "Einfach ist das nicht. Die Kurse, die ich am Abend besuche, sind anstrengend, und für Freunde bleibt wenig Zeit. " +
        "Trotzdem finde ich meine Entscheidung richtig.\n\n" +
        "Allen, die auch über eine Veränderung nachdenken, möchte ich sagen: Sprecht mit Leuten, die diesen Weg schon gegangen sind. " +
        "Und wartet nicht zu lange. Hätte ich früher angefangen, wäre ich heute schon fertig.\n\nJulia, 29",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Beratungsgespräch",
      genreTr: "Danışmanlık görüşmesi",
      plays: 2,
      segments: [
        { speaker: "Berater", text: "Guten Tag, Lukas. Sie machen dieses Jahr Abitur. Wissen Sie schon, was Sie danach machen möchten?" },
        { speaker: "Lukas", text: "Nicht genau. Ich interessiere mich für Technik, aber ich möchte nicht den ganzen Tag am Schreibtisch sitzen." },
        { speaker: "Berater", text: "Haben Sie schon mal an eine Ausbildung als Mechaniker gedacht? Da arbeitet man viel mit den Händen." },
        { speaker: "Lukas", text: "Ja, aber meine Eltern möchten, dass ich studiere. Sie sagen, dass man mit einem Studium mehr verdient." },
        { speaker: "Berater", text: "Das stimmt nicht immer. Viele Handwerker verdienen heute sehr gut, und sie werden überall gesucht." },
        { speaker: "Lukas", text: "Wirklich? Das wusste ich nicht." },
        { speaker: "Berater", text: "Es gibt auch ein Studium, bei dem Sie gleichzeitig in einer Firma arbeiten und Geld verdienen." },
        { speaker: "Lukas", text: "Das klingt gut. Dann hätte ich Praxis und einen Abschluss." },
        { speaker: "Berater", text: "Genau. Die Frist für die Bewerbung endet allerdings schon im Dezember." },
        { speaker: "Lukas", text: "Im Dezember? Dann sollte ich mich wohl bald informieren." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b1-w03-r1",
      block: "read",
      ref: "t1",
      stem: "Warum hat die Autorin eine Ausbildung bei der Bank gemacht?",
      options: [
        "Sie wollte schon immer in einer Bank arbeiten.",
        "Ihre Eltern fanden das sicher, und sie hatte keinen eigenen Plan.",
        "Eine Kollegin hat ihr das empfohlen.",
        "Sie wollte schnell viel Geld verdienen.",
      ],
      answer: 1,
      why: "Metin iki gerekçeyi yan yana veriyor: ailenin görüşü ve `ich wusste damals nicht, was ich wirklich wollte`. `damals` bunun o zamanki durum olduğunu söylüyor. Meslektaş ise yıllar sonraki ikinci kararla ilgili; iki kararın gerekçelerini karıştırmamak gerekiyor.",
      targets: ["lesen.detail"],
    },
    {
      id: "de-b1-w03-r2",
      block: "read",
      ref: "t1",
      stem: "Warum hat die Autorin ihre Stelle nicht ganz gekündigt?",
      options: [
        "Ihre Chefin wollte das nicht.",
        "Sie mag ihre Arbeit bei der Bank sehr.",
        "Ohne Gehalt könnte sie ihre Wohnung nicht bezahlen.",
        "Die Kurse an der Universität sind nur am Abend.",
      ],
      answer: 2,
      why: "`Wenn ich gekündigt hätte, hätte ich … nicht bezahlen können` Konjunktiv II ile GERÇEKLEŞMEMİŞ bir durumu anlatıyor: işinden ayrılmamış, çünkü o zaman kirasını ödeyemeyecekti. Bu yapıyı olmuş bir olay gibi okumak metnin tamamını ters çeviriyor.",
      targets: ["lesen.detail", "konjunktiv2.haette"],
    },
    {
      id: "de-b1-w03-r3",
      block: "read",
      ref: "t1",
      stem: "Was rät die Autorin anderen Menschen?",
      options: [
        "mit Leuten zu sprechen, die das schon gemacht haben",
        "zuerst eine Ausbildung bei einer Bank zu machen",
        "ihre Stelle nicht zu kündigen",
        "nur noch am Abend zu studieren",
      ],
      answer: 0,
      why: "Tavsiye `ihr` emir kipiyle geliyor: `Sprecht mit Leuten, die …`. Haftada üç gün çalışmak ve akşam kursları yazarın KENDİ çözümü, başkalarına önerdiği şey değil. Anlatıdaki kişisel yolu genel bir öğütle karıştırmamak gerekiyor.",
      targets: ["lesen.meinung", "relativsatz.nominativ"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b1-w03-l1",
      block: "listen",
      ref: "a1",
      stem: "Was möchte Lukas nicht?",
      options: [
        "mit Technik arbeiten",
        "den ganzen Tag am Schreibtisch sitzen",
        "mit dem Berater sprechen",
        "etwas Neues lernen",
      ],
      answer: 1,
      why: "Lukas `ich interessiere mich für Technik, aber …` diyor: teknik ilgisini söylüyor, `aber`dan sonra da istemediği şeyi. Olumsuzluğun cümlenin hangi yarısına ait olduğunu izlemek gerekiyor.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-b1-w03-l2",
      block: "listen",
      ref: "a1",
      stem: "Was sagt der Berater über Handwerker?",
      options: [
        "Sie verdienen weniger als Leute mit Studium.",
        "Sie müssen zuerst studieren.",
        "Sie arbeiten meistens am Schreibtisch.",
        "Sie finden leicht eine Stelle.",
      ],
      answer: 3,
      why: "`sie werden überall gesucht` edilgen bir cümle: zanaatkârları ARAYAN firmalar, yani iş bulmaları kolay. Daha az kazanma fikri Lukas'ın ailesine ait ve danışman `Das stimmt nicht immer` diyerek ona itiraz ediyor.",
      targets: ["hoeren.meinung", "passiv.praesens"],
    },
    {
      id: "de-b1-w03-l3",
      block: "listen",
      ref: "a1",
      stem: "Warum sollte sich Lukas bald informieren?",
      options: [
        "Seine Eltern wollen schnell eine Antwort.",
        "Er macht im Dezember Abitur.",
        "Man muss sich bis Dezember bewerben.",
        "Das Studium beginnt schon im Dezember.",
      ],
      answer: 2,
      why: "Aralık ayı `die Frist für die Bewerbung` ile bağlı: son başvuru tarihi. Çalışmanın ya da okulun o ay başladığı söylenmiyor. Bir tarihi duyunca onun NEYİN tarihi olduğuna bakmak gerekiyor.",
      targets: ["hoeren.detail"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b1-w03-g1",
      block: "grammar",
      stem: "Eine Kollegin, ___ abends studiert, hat mir von ihrem Studium erzählt.",
      options: ["der", "wer", "was", "die"],
      answer: 3,
      why: "İlgi zamiri cinsiyetini ve sayısını ÖNCEKİ isimden alır (`Kollegin` dişil tekil), durumunu yan cümledeki görevinden (özne → Nominativ). `wer` ve `was` soru ya da genel anlamlı zamirdir, belli bir ismi nitelemez.",
      targets: ["relativsatz.nominativ"],
      byNative: {
        tr: {
          options: ["der", "wer", "was", "die"],
          answer: 3,
          why: "Türkçede ilgi cümlesi bir ekle ismin ÖNÜNE gelir ve zamir yoktur (`akşamları okuyan bir meslektaş`). Almancada yan cümle ismin ARKASINA gelir ve bir zamirle başlar; zamir de ismin cinsiyetini taşır: `Kollegin` dişil.",
        },
        en: {
          options: ["der", "wer", "was", "die"],
          answer: 3,
          why: "İngilizcede `who` cinsiyet taşımaz ve `who` → `wer` benzerliği çekici. Ama `wer` soru zamiri; Almancada ilgi zamiri öncül ismin cinsiyetini alır: `Kollegin` dişil.",
        },
      },
    },
    {
      id: "de-b1-w03-g2",
      block: "grammar",
      stem: "Die Kurse, ___ ich am Abend besuche, sind anstrengend.",
      options: ["den", "die", "denen", "der"],
      answer: 1,
      why: "İki ayrı bilgi birleşiyor: sayıyı öncül isim veriyor (`Kurse` çoğul), durumu yan cümle (`besuche`nin nesnesi → Akkusativ). Çoğul Akkusativ `die`. `den` tekil `der Kurs` için olurdu; `denen` çoğul Dativ.",
      targets: ["relativsatz.akkusativ"],
      byNative: {
        en: {
          options: ["den", "die", "denen", "der"],
          answer: 1,
          why: "İngilizcede `that`/`which` hiç değişmez, hatta düşebilir (`the courses I attend`). Almancada zamir zorunludur ve çekimlidir: çoğul isim (`Kurse`) + nesne görevi → `die`.",
        },
      },
    },
    {
      id: "de-b1-w03-g3",
      block: "grammar",
      stem: "Der Berater, mit ___ ich gesprochen habe, war sehr nett.",
      options: ["den", "der", "dem", "dessen"],
      answer: 2,
      why: "Edat ilgi zamirinin ÖNÜNE gelir ve durumunu o belirler: `mit` her zaman Dativ ister, `Berater` eril → `dem`. `den` Akkusativ, `dessen` ise sahiplik bildirir.",
      targets: ["relativsatz.dativ", "praeposition.dativ"],
      byNative: {
        tr: {
          options: ["den", "der", "dem", "dessen"],
          answer: 2,
          why: "Türkçede `konuştuğum danışman` yapısında ne edat ne zamir görünür; `ile` fiilin içinde erir. Almancada edat (`mit`) ilgi zamirinin önünde durmak zorunda ve zamirin durumunu belirler: `mit` + Dativ, eril → `dem`.",
        },
        en: {
          options: ["den", "der", "dem", "dessen"],
          answer: 2,
          why: "İngilizcede `the advisor I talked to` doğal: zamir düşüyor, edat sona kayıyor. Almancada ikisi de yapılamaz: edat zamirin önüne gelir ve durumu belirler. `whom` → `den` aktarımı da tutmaz; `mit` Dativ ister.",
        },
      },
    },
    {
      id: "de-b1-w03-g4",
      block: "grammar",
      stem: "Wenn ich mehr Zeit ___, würde ich auch studieren.",
      options: ["habe", "hatte", "würde haben", "hätte"],
      answer: 3,
      why: "Gerçek olmayan bir şimdiki durum: `wenn` kısmı da Konjunktiv II'ye girer. `haben` ve `sein` için `würde` ile değil kendi biçimleriyle kurulur: `hätte`, `wäre`. `habe` gerçek bir koşul, `hatte` düz geçmiş zaman.",
      targets: ["konjunktiv2.haette"],
      byNative: {
        tr: {
          options: ["habe", "hatte", "würde haben", "hätte"],
          answer: 3,
          why: "Türkçede varsayımı `-sa` eki tek başına taşıyor (`zamanım olsa`). Almancada şart kısmında fiilin kendisi Konjunktiv II'ye girmek zorunda: `hätte`. `habe` ise `zamanım varsa` demek, gerçekleşebilecek bir koşul.",
        },
        en: {
          options: ["habe", "hatte", "würde haben", "hätte"],
          answer: 3,
          why: "İngilizcede varsayım geçmiş zaman biçimiyle kurulur (`If I had more time`), o yüzden `hatte` birebir karşılık gibi görünür. Almancada `hatte` yalnız geçmiş zaman; varsayımın ayrı bir biçimi var ve umlautla ayrılıyor: `hätte`.",
        },
      },
    },
    {
      id: "de-b1-w03-g5",
      block: "grammar",
      stem: "Welcher Satz ist richtig?",
      options: [
        "Wenn ich du wäre, würde ich eine Ausbildung machen.",
        "Wenn ich du wäre, ich würde eine Ausbildung machen.",
        "Wenn ich du wäre, würde ich machen eine Ausbildung.",
        "Wenn ich wäre du, würde ich eine Ausbildung machen.",
      ],
      answer: 0,
      why: "Üç sıra kuralı aynı cümlede: `wenn` yan cümlesinde fiil sonda; yan cümle birinci konumu doldurduğu için ana cümlede `würde` hemen virgülden sonra; mastar (`machen`) ana cümlenin en sonunda.",
      targets: ["konjunktiv2.wuerde", "wortstellung.v2", "nebensatz.wenn"],
      byNative: {
        tr: {
          options: [
            "Wenn ich du wäre, würde ich eine Ausbildung machen.",
            "Wenn ich du wäre, ich würde eine Ausbildung machen.",
            "Wenn ich du wäre, würde ich machen eine Ausbildung.",
            "Wenn ich wäre du, würde ich eine Ausbildung machen.",
          ],
          answer: 0,
          why: "Türkçede `senin yerinde olsam, ben bir meslek eğitimi yapardım` dizilişinde özne başta kalıyor. Almancada yan cümle birinci konumu kapladığı için ana cümlede önce `würde`, sonra özne gelir; mastar da en sona gider.",
        },
        en: {
          options: [
            "Wenn ich du wäre, würde ich eine Ausbildung machen.",
            "Wenn ich du wäre, ich würde eine Ausbildung machen.",
            "Wenn ich du wäre, würde ich machen eine Ausbildung.",
            "Wenn ich wäre du, würde ich eine Ausbildung machen.",
          ],
          answer: 0,
          why: "`If I were you, I would do an apprenticeship` üç yerde Almancaya uymuyor: `wenn` fiili sona iter, ana cümlede `würde` özneden önce gelir, ve `machen` nesnenin arkasına, en sona geçer.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b1-w03-v1",
      block: "vocab",
      stem: "Ich habe mich letzte Woche um eine Stelle als Mechanikerin ___.",
      options: ["gefragt", "angemeldet", "angewendet", "beworben"],
      answer: 3,
      why: "Bir işe başvurmak `sich um eine Stelle bewerben`. `sich anmelden` bir kursa ya da resmî bir yere kayıt olmaktır; `anwenden` bir kuralı ya da yöntemi uygulamak demek.",
      targets: ["verb.bewerben", "wortfeld.beruf"],
      byNative: {
        en: {
          options: ["gefragt", "angemeldet", "angewendet", "beworben"],
          answer: 3,
          why: "İngilizce `apply` Almancada ikiye bölünür: bir işe başvurmak `sich bewerben`, bir kuralı uygulamak `anwenden`. `apply for a job` → `sich um eine Stelle bewerben`.",
        },
      },
    },
    {
      id: "de-b1-w03-v2",
      block: "vocab",
      stem: "Nach dem Studium möchte ich Lehrerin ___.",
      options: ["bekommen", "werden", "lernen", "machen"],
      answer: 1,
      why: "Bir mesleğe girmek, bir şey hâline gelmek `werden`. `bekommen` bir şey almak demek; `Koch lernen` gibi `lernen` + meslek adı yalnız çıraklıkla öğrenilen mesleklerde kullanılır ve bir eğitimi anlatır; burada sorulan eğitim değil mesleğe GİRMEK. `machen` ise meslek adıyla kurulmaz.",
      targets: ["verb.werden", "falsefriend.bekommen"],
      byNative: {
        en: {
          options: ["bekommen", "werden", "lernen", "machen"],
          answer: 1,
          why: "`bekommen` İngilizce `become` DEĞİL — klasik sahte dost. `bekommen` = to get; `become a teacher` Almancada `Lehrerin werden`. Bu cümle `bekommen` ile `öğretmen almak` gibi bir anlama kayıyor.",
        },
      },
    },
    {
      id: "de-b1-w03-v3",
      block: "vocab",
      stem: "Ohne ___ ist es heute schwer, eine gute Stelle zu finden.",
      options: ["Abschluss", "Schluss", "Ende", "Ausgang"],
      answer: 0,
      why: "Bir eğitimi bitirip alınan derece ya da belge `Abschluss`. `Schluss` ve `Ende` yalnız bir şeyin bitiş anını bildirir, `Ausgang` ise çıkış kapısı; hiçbiri iş başvurusunda istenen bir şey değil.",
      targets: ["wortfeld.ausbildung"],
    },
  ],
};
