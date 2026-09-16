import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 1 · Görüş bildirme ve gerekçelendirme.
 *
 * ÖLÇÜLEN ŞEY: bir forum yazısında ve bir tartışmada kimin neyi savunduğunu,
 * görüşün NEDEN değiştiğini ve kısmi katılımı (`Fast`, `trotzdem`) izlemek;
 * görüşü kuran yan cümleler (`dass`, `weil`, `wenn`) ve Konjunktiv II ile
 * öneri/tavsiye.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ. B1'de hata bilgi eksikliğinden değil anadil
 * yapısının taşınmasından geliyor:
 *  - `w01-g1` (`dass` + fiil sonda): Türk öğrenci için fiilin sona gitmesi
 *    tanıdık; onun tuzağı bağlacın yeri, çünkü Türkçede bağlaç değil ek var
 *    (`-dığını`) ve o ek fiilin YANINDA duruyor. İngiliz öğrencinin tuzağı tam
 *    tersi: `that`tan sonra sıra değişmiyor, fiil özneden hemen sonra kalıyor.
 *  - `w01-g2` (`weil`/`denn`): Türkçede de iki yapı var (`çünkü` sırayı
 *    bozmaz, `-dığı için` fiili sona iter) ve eşleşme birebir; varyant bunu
 *    kullanıyor. İngilizcede tek `because` var ve sırayı hiç değiştirmiyor.
 *  - `w01-g5` (`könnten`): İngilizcede `could` hem geçmiş hem varsayım; Almancada
 *    ikisini umlaut ayırıyor ve `would be able to` → `würden können` aktarımı
 *    geliyor.
 *  - `w01-v2` (`eventuell`): yalnız İngilizce konuşan için sahte dost.
 */
export const DE_B1_W01: QuizWeek = {
  id: "de-b1-w01",
  course: "de",
  level: "B1",
  no: 1,
  theme: "Meinungen äußern und begründen",
  themeTr: "Görüş bildirme ve gerekçelendirme",
  canDo: ["B1.SPK.1", "B1.SPK.6", "B1.RD.1", "B1.LS.3", "B1.GR.1", "B1.GR.2"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Forumsbeitrag",
      genreTr: "Forum yazısı",
      title: "Brauchen Kinder ein eigenes Handy?",
      body:
        "Meine Tochter ist zehn Jahre alt und fragt jeden Tag, ob sie ein Handy bekommt. " +
        "Sie erzählt, dass alle in ihrer Klasse schon eins haben, aber das glaube ich nicht ganz. Ich habe lange darüber nachgedacht, und meine Meinung hat sich geändert.\n\n" +
        "Früher war ich dagegen, weil Kinder heute sowieso zu viel Zeit vor dem Bildschirm verbringen. " +
        "Außerdem glaube ich, dass viele Spiele und Videos nicht für Kinder gemacht sind. " +
        "Aber im letzten Winter hat meine Tochter nach dem Training den Bus verpasst, und sie konnte uns nicht anrufen. " +
        "Wir haben eine Stunde lang nicht gewusst, wo sie war. Seitdem denke ich anders.\n\n" +
        "Ich finde trotzdem nicht, dass ein Kind ein teures Smartphone braucht. " +
        "Ein einfaches Handy, mit dem man telefonieren und Nachrichten schreiben kann, reicht völlig. " +
        "Wenn meine Tochter älter ist, können wir noch einmal darüber sprechen. " +
        "Natürlich muss jede Familie selbst entscheiden, und ich verstehe auch Eltern, die ganz anders denken.\n\n" +
        "Was würdet ihr an meiner Stelle machen? Ich bin auf eure Meinungen gespannt!\n\nSandra",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Diskussion",
      genreTr: "Tartışma",
      plays: 2,
      segments: [
        { speaker: "David", text: "Hast du das gelesen? Die Stadt will die Geschäfte auch am Sonntag öffnen." },
        { speaker: "Sara", text: "Ja, und ich finde das keine gute Idee." },
        { speaker: "David", text: "Warum denn nicht? Ich arbeite die ganze Woche und habe nur am Wochenende Zeit zum Einkaufen." },
        { speaker: "Sara", text: "Das verstehe ich. Aber denk mal an die Leute, die in den Geschäften arbeiten. Die brauchen auch einen freien Tag." },
        { speaker: "David", text: "Stimmt, daran habe ich nicht gedacht. Aber sie könnten doch an einem anderen Tag frei haben." },
        { speaker: "Sara", text: "Theoretisch schon. Aber dann sehen sie ihre Familie nicht mehr, weil die Kinder am Montag in die Schule gehen." },
        { speaker: "David", text: "Hm. Vielleicht wäre ein Sonntag im Monat ein guter Kompromiss?" },
        { speaker: "Sara", text: "Das finde ich besser. Dann ist es etwas Besonderes und nicht ganz normal." },
        { speaker: "David", text: "Also sind wir uns am Ende doch einig." },
        { speaker: "Sara", text: "Fast. Ich würde trotzdem lieber am Samstag einkaufen gehen." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b1-w01-r1",
      block: "read",
      ref: "t1",
      stem: "Warum war die Autorin früher gegen ein Handy für ihre Tochter?",
      options: [
        "Kinder verbringen schon zu viel Zeit vor dem Bildschirm.",
        "Ein Smartphone ist zu teuer für ein Kind.",
        "Ihre Tochter hat den Bus verpasst.",
        "In der Klasse hat niemand ein Handy.",
      ],
      answer: 0,
      why: "Metin iki zaman katmanı kuruyor: `Früher` eski görüşü, `Seitdem` yenisini açıyor. Otobüs olayı görüşü DEĞİŞTİREN sebep, eski görüşün sebebi değil; pahalı telefon ise bugünkü sınırlama. Gerekçeyi hangi zamana ait olduğuna bakarak eşleştirmek gerekiyor.",
      targets: ["lesen.meinung", "konnektor.weil-denn"],
    },
    {
      id: "de-b1-w01-r2",
      block: "read",
      ref: "t1",
      stem: "Was denkt die Autorin heute?",
      options: [
        "Ihre Tochter braucht gar kein Handy.",
        "Ein einfaches Handy ist genug.",
        "Ihre Tochter soll ein Smartphone bekommen.",
        "Sie hat noch keine Meinung.",
      ],
      answer: 1,
      why: "`Ich finde trotzdem nicht, dass…` cümlesindeki olumsuzluk yalnız pahalı akıllı telefonu kapsıyor, telefonun kendisini değil; hemen ardından `reicht völlig` geliyor. `nicht`i bütün görüşe yaymak yazarı olduğundan daha karşı gösteriyor.",
      targets: ["lesen.meinung", "nebensatz.dass"],
    },
    {
      id: "de-b1-w01-r3",
      block: "read",
      ref: "t1",
      stem: "Warum hat sich die Meinung der Autorin geändert?",
      options: [
        "Ihre Tochter hat jeden Tag gefragt.",
        "Alle Kinder in der Klasse haben ein Handy.",
        "Sie hat eine Stunde lang nicht gewusst, wo ihre Tochter war.",
        "Andere Eltern haben ihr einen Rat gegeben.",
      ],
      answer: 2,
      why: "Görüşü değiştiren olay `Seitdem` ile bağlanan otobüs günü. Kızın her gün sorması metinde geçiyor ama bir sebep olarak sunulmuyor; sınıftakiler bilgisine ise yazar `das glaube ich nicht ganz` diyerek pek inanmıyor. Metinde geçen her bilgi gerekçe değil.",
      targets: ["lesen.detail"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b1-w01-l1",
      block: "listen",
      ref: "a1",
      stem: "Warum ist Sara gegen offene Geschäfte am Sonntag?",
      options: [
        "Sie kauft nie am Sonntag ein.",
        "Sie hat am Wochenende keine Zeit.",
        "Die Geschäfte verdienen am Sonntag zu wenig.",
        "Die Verkäufer brauchen einen freien Tag.",
      ],
      answer: 3,
      why: "Sara'nın gerekçesi `denk mal an die Leute, die in den Geschäften arbeiten` ile başlıyor. Hafta sonu dışında zamanı olmayan kişi David; bir tartışmada iki tarafın gerekçelerini ayrı ayrı takip etmek gerekiyor.",
      targets: ["hoeren.meinung"],
    },
    {
      id: "de-b1-w01-l2",
      block: "listen",
      ref: "a1",
      stem: "Welchen Vorschlag macht David am Ende?",
      options: [
        "Die Geschäfte öffnen jeden Sonntag.",
        "Die Verkäufer haben am Montag frei.",
        "Die Geschäfte öffnen einen Sonntag im Monat.",
        "Alle kaufen am Samstag ein.",
      ],
      answer: 2,
      why: "Öneri Konjunktiv II ile geliyor: `Vielleicht wäre … ein guter Kompromiss`. `wäre` bir öneriyi yumuşatır, kesin bir planı bildirmez. Cumartesi alışverişi Sara'nın kendi tercihi, başka gün izin ise tartışmanın ortasında reddedilen bir fikir.",
      targets: ["hoeren.detail"],
    },
    {
      id: "de-b1-w01-l3",
      block: "listen",
      ref: "a1",
      stem: "Was sagt Sara zu Davids Vorschlag?",
      options: [
        "Sie findet den Vorschlag gut, geht aber selbst lieber samstags einkaufen.",
        "Sie stimmt ihm ganz zu und ändert ihre Meinung.",
        "Sie findet den Vorschlag schlecht und bleibt dagegen.",
        "Sie möchte nicht mehr darüber sprechen.",
      ],
      answer: 0,
      why: "David `einig` diyor ama Sara `Fast` ile düzeltiyor: katılım kısmi. `trotzdem` de öneriyi kabul ettiği hâlde kendi alışkanlığını değiştirmediğini gösteriyor. Son sözü kimin söylediğine ve onun neyi düzelttiğine dikkat etmek gerekiyor.",
      targets: ["hoeren.meinung", "konnektor.trotzdem"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b1-w01-g1",
      block: "grammar",
      stem: "Welcher Satz ist richtig?",
      options: [
        "Ich finde, dass Kinder brauchen kein Smartphone.",
        "Ich finde, dass brauchen Kinder kein Smartphone.",
        "Ich finde, Kinder dass kein Smartphone brauchen.",
        "Ich finde, dass Kinder kein Smartphone brauchen.",
      ],
      answer: 3,
      why: "`dass` bir yan cümle açar: bağlaç yan cümlenin EN BAŞINDA durur, çekimli fiil en sona gider. Ana cümle (`Ich finde`) ile yan cümle virgülle ayrılır.",
      targets: ["nebensatz.dass", "nebensatz.verbend"],
      byNative: {
        tr: {
          options: [
            "Ich finde, dass Kinder brauchen kein Smartphone.",
            "Ich finde, dass brauchen Kinder kein Smartphone.",
            "Ich finde, Kinder dass kein Smartphone brauchen.",
            "Ich finde, dass Kinder kein Smartphone brauchen.",
          ],
          answer: 3,
          why: "Fiilin sona gitmesi Türkçeye benziyor, asıl tuzak bağlacın yeri. Türkçede bağlaç yok, ek var ve fiilin yanında duruyor (`ihtiyaç duymadığını`); Almancada `dass` ayrı bir sözcük ve yan cümlenin en başına, virgülün hemen arkasına gelir.",
        },
        en: {
          options: [
            "Ich finde, dass Kinder brauchen kein Smartphone.",
            "Ich finde, dass brauchen Kinder kein Smartphone.",
            "Ich finde, Kinder dass kein Smartphone brauchen.",
            "Ich finde, dass Kinder kein Smartphone brauchen.",
          ],
          answer: 3,
          why: "İngilizcede `that`ten sonra sıra değişmez (`that children don't need`), o yüzden fiil özneden hemen sonra kalıyor. Almancada `dass` yan cümle açar ve çekimli fiili cümlenin en SONUNA iter.",
        },
      },
    },
    {
      id: "de-b1-w01-g2",
      block: "grammar",
      stem: "Ich bin dagegen, ___ die Verkäufer auch einen freien Tag brauchen.",
      options: ["denn", "weil", "deshalb", "trotzdem"],
      answer: 1,
      why: "Fiil (`brauchen`) sonda, yani boşluğa yan cümle bağlacı gelmeli. `denn` aynı anlamı taşır ama ana cümle sırası ister (`denn die Verkäufer brauchen…`); `deshalb` ve `trotzdem` zarftır, arkalarından fiil gelir ve sebep değil sonuç/karşıtlık bildirir.",
      targets: ["konnektor.weil-denn", "nebensatz.verbend"],
      byNative: {
        tr: {
          options: ["denn", "weil", "deshalb", "trotzdem"],
          answer: 1,
          why: "Türkçede de iki yapı var ve eşleşme birebir: `çünkü` sırayı bozmaz (= `denn`), `-dığı için` fiili sona iter (= `weil`). Buradaki cümlede fiil sonda, yani `-dığı için` yapısı: `weil`.",
        },
        en: {
          options: ["denn", "weil", "deshalb", "trotzdem"],
          answer: 1,
          why: "İngilizcede tek bir `because` var ve sırayı hiç değiştirmiyor. Almancada iki karşılık var: `denn` sırayı korur, `weil` fiili sona iter. Fiil sonda olduğu için yalnız `weil` uyuyor.",
        },
      },
    },
    {
      id: "de-b1-w01-g3",
      block: "grammar",
      stem: "An deiner Stelle ___ ich ein einfaches Handy kaufen.",
      options: ["werde", "würde", "wurde", "wäre"],
      answer: 1,
      why: "Tavsiye ve varsayım Konjunktiv II ile kurulur: `würde` + mastar. `werde` gerçek bir gelecek planı bildirir, `wurde` geçmiş zamandır; `wäre` `sein`in Konjunktiv II'si ve `kaufen` gibi bir mastarla birleşmez.",
      targets: ["konjunktiv2.wuerde"],
      byNative: {
        tr: {
          options: ["werde", "würde", "wurde", "wäre"],
          answer: 1,
          why: "Türkçede `senin yerinde olsam alırdım` -sa/-se ve -ırdı ile kuruluyor; `alırdım` kısmının karşılığı `würde … kaufen`. `werde` ise `alacağım` demek, gerçek bir plan. `-sa`yı görüp koşul biçimi aramaya gerek yok: `An deiner Stelle` şartı zaten taşıyor.",
        },
        en: {
          options: ["werde", "würde", "wurde", "wäre"],
          answer: 1,
          why: "`I would buy` → `ich würde kaufen` burada birebir tutuyor. Tuzak umlaut: `wurde` (noktasız) geçmiş zaman, `was/became` demek; varsayım yalnız `ü` ile.",
        },
      },
    },
    {
      id: "de-b1-w01-g4",
      block: "grammar",
      stem: "Welcher Satz ist richtig?",
      options: [
        "Wenn meine Tochter älter ist, wir sprechen noch einmal darüber.",
        "Wenn meine Tochter ist älter, sprechen wir noch einmal darüber.",
        "Wenn meine Tochter älter ist, sprechen wir noch einmal darüber.",
        "Wenn ist meine Tochter älter, wir sprechen noch einmal darüber.",
      ],
      answer: 2,
      why: "İki kural aynı anda çalışıyor: `wenn` yan cümlesinde fiil sonda; yan cümle bütünüyle ana cümlenin BİRİNCİ konumunu doldurduğu için ana cümlenin fiili virgülden hemen sonra gelir, özne arkasına geçer.",
      targets: ["nebensatz.wenn", "wortstellung.v2"],
      byNative: {
        tr: {
          options: [
            "Wenn meine Tochter älter ist, wir sprechen noch einmal darüber.",
            "Wenn meine Tochter ist älter, sprechen wir noch einmal darüber.",
            "Wenn meine Tochter älter ist, sprechen wir noch einmal darüber.",
            "Wenn ist meine Tochter älter, wir sprechen noch einmal darüber.",
          ],
          answer: 2,
          why: "Yan cümlede fiilin sonda olması Türkçeye benziyor, o kısım çoğu zaman zorlamıyor. Tuzak ana cümle: Türkçede `kızım büyüyünce, biz yine konuşuruz` dizilişi doğal, ama Almancada yan cümle birinci konumu kapladığı için ana cümlenin fiili ikinci sırada, virgülün hemen arkasında olmalı.",
        },
        en: {
          options: [
            "Wenn meine Tochter älter ist, wir sprechen noch einmal darüber.",
            "Wenn meine Tochter ist älter, sprechen wir noch einmal darüber.",
            "Wenn meine Tochter älter ist, sprechen wir noch einmal darüber.",
            "Wenn ist meine Tochter älter, wir sprechen noch einmal darüber.",
          ],
          answer: 2,
          why: "İngilizcede `When she is older, we will talk` iki cümlede de aynı sırayı koruyor. Almancada iki şey değişiyor: `wenn` fiili sona iter, ve yan cümle birinci konumu doldurduğu için ana cümlede fiil özneden ÖNCE gelir.",
        },
      },
    },
    {
      id: "de-b1-w01-g5",
      block: "grammar",
      stem: "Wenn die Geschäfte am Sonntag offen wären, ___ die Verkäufer an einem anderen Tag frei haben.",
      options: ["können", "konnten", "könnten", "würden können"],
      answer: 2,
      why: "Koşul varsayımsal (`wären`), yani ana cümle de Konjunktiv II ister. Modal fiillerde bu biçim doğrudan kurulur: `können` → `könnten`. `würden können` biçimi yerine modalın kendi Konjunktiv II'si kullanılır; `konnten` ise düz geçmiş zaman.",
      targets: ["konjunktiv2.modal"],
      byNative: {
        en: {
          options: ["können", "konnten", "könnten", "würden können"],
          answer: 2,
          why: "İngilizce `could` hem geçmişi hem varsayımı karşılıyor; Almancada ikisini umlaut ayırıyor: `konnten` geçmiş, `könnten` varsayım. `would be able to` → `würden können` birebir aktarımı da tutmaz: modal fiil kendi Konjunktiv II'sini alır.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b1-w01-v1",
      block: "vocab",
      stem: "Du hast recht, ich bin ganz deiner ___.",
      options: ["Idee", "Gedanke", "Grund", "Meinung"],
      answer: 3,
      why: "Katılmayı bildiren kalıp `jemandes Meinung sein`: sahiplik bildiren zamir (`deiner`) ve `sein` fiiliyle kurulur. `Idee` yeni bir düşünce ya da plan, `Gedanke` tek bir düşünce, `Grund` bir gerekçe; hiçbiri bu kalıba girmez.",
      targets: ["wortfeld.meinung"],
      byNative: {
        tr: {
          options: ["Idee", "Gedanke", "Grund", "Meinung"],
          answer: 3,
          why: "Türkçedeki `fikir` iki Almanca sözcüğe bölünüyor: bir görüş `Meinung`, yeni bir düşünce ya da plan `Idee`. `Aynı fikirdeyim` kalıbının karşılığı görüş olan: `Ich bin deiner Meinung`.",
        },
      },
    },
    {
      id: "de-b1-w01-v2",
      block: "vocab",
      stem: "Ich komme ___ etwas später – oder vielleicht bin ich doch pünktlich.",
      options: ["eventuell", "endlich", "schließlich", "sicher"],
      answer: 0,
      why: "Cümlenin ikinci yarısı geç kalmayı da açık bırakıyor (`oder vielleicht … pünktlich`), yani boşluğa bir olasılık sözcüğü gelmeli: `eventuell` = belki. `sicher` kesinlik bildirir, `endlich` ve `schließlich` ise geç kalmanın OLDUĞUNU söyler; üçü de dakik gelme ihtimaliyle çelişir.",
      targets: ["falsefriend.eventuell"],
      byNative: {
        en: {
          options: ["eventuell", "endlich", "schließlich", "sicher"],
          answer: 0,
          why: "`eventuell` İngilizce `eventually` DEĞİL — sahte dost. `eventuell` = maybe/possibly; `eventually` Almancada `schließlich`. Şıklarda ikisi yan yana duruyor ve cümlenin ikinci yarısı dakik gelmeyi de mümkün sayıyor.",
        },
      },
    },
    {
      id: "de-b1-w01-v3",
      block: "vocab",
      stem: "Das ist ein gutes Argument. Da kann ich dir nur ___.",
      options: ["stimmen", "zustimmen", "bestimmen", "abstimmen"],
      answer: 1,
      why: "Birine katılmak `jemandem zustimmen` (Dativ: `dir`). `doğru olmak` anlamındaki `stimmen`in öznesi kişi değil bilgidir (`Das stimmt`) ve kişiyi Dativ'de almaz; `bestimmen` karar vermek, `abstimmen` oy vermek demek.",
      targets: ["verb.zustimmen", "wortfeld.meinung"],
    },
  ],
};
