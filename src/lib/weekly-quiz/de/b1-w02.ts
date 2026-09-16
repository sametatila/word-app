import type { QuizWeek } from "../types";

/**
 * B1 · Hafta 2 · Medya ve haberler.
 *
 * ÖLÇÜLEN ŞEY: bir gazete haberinde planlananla olanı (`nicht … sondern`),
 * bilgiyle eleştiriyi ayırmak; bir radyo röportajında bulguyla değerlendirmeyi
 * ayırmak. Haber dilinin iki yapısı: Passiv (`wurde gebaut`, `von`) ve Genitiv
 * (`wegen des Wetters`, `die Rede der Politikerin`).
 *
 * ARALIKLI TEKRAR: `w02-g5` W1'in `nebensatz.dass` hedefine edilgen bir yan
 * cümleyle dönüyor — haber dili görüşü `kritisiert, dass …` diye aktarıyor.
 *
 * ÇELDİRİCİLERİN GEREKÇESİ:
 *  - `w02-g1` (`wurde gebaut`): İngilizce edilgen `be` ile kuruluyor
 *    (`was built`), o yüzden `war gebaut` geliyor. Türkçede edilgenlik bir ek
 *    (`-ıl`), ayrı yardımcı fiil hiç yok.
 *  - `w02-g4` (Genitiv tamlama): Türkçede tamlayan ÖNDE ve eki kendisi alıyor
 *    (`politikacının konuşması`); Almancada tamlayan ARKADA ve durumu tanımlık
 *    taşıyor. İngilizcenin `-'s`i ise Almancada yalnız özel adlarda var.
 *  - `w02-v1` (`aktuell`): İngilizce konuşan için `actually` sahte dostu.
 */
export const DE_B1_W02: QuizWeek = {
  id: "de-b1-w02",
  course: "de",
  level: "B1",
  no: 2,
  theme: "Medien und Nachrichten",
  themeTr: "Medya ve haberler",
  canDo: ["B1.LS.2", "B1.LS.3", "B1.RD.3", "B1.GR.3", "B1.GR.6", "B1.GR.1"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Zeitungsartikel",
      genreTr: "Gazete haberi",
      title: "Neue Bibliothek im Zentrum eröffnet",
      body:
        "Am Samstag wurde im Zentrum die neue Bibliothek der Stadt eröffnet. " +
        "Das Gebäude wurde in nur zwei Jahren gebaut und war sehr teuer. " +
        "Wegen des schlechten Wetters fand die Feier nicht wie geplant auf dem Platz vor dem Haus statt, sondern in der großen Halle im Erdgeschoss. " +
        "Trotzdem kamen über tausend Besucher.\n\n" +
        "Eine Politikerin der Stadt sagte in ihrer Rede, dass die Bibliothek ein Ort für alle Bürger sein soll. " +
        "Neben Büchern werden auch Filme, Spiele und Kurse am Computer angeboten. " +
        "Jeden Mittwoch wird Kindern vorgelesen. Das Programm wird von Studenten organisiert.\n\n" +
        "Nicht alle sind zufrieden. Einige Leser haben in den letzten Wochen kritisiert, dass die alte Bibliothek im Stadtteil Nord geschlossen wurde. " +
        "Besonders für ältere Menschen ist der Weg ins Zentrum weit. " +
        "Die Stadt hat deshalb angekündigt, dass ab Oktober zweimal pro Woche ein Bücherbus in den Stadtteil fährt.\n\n" +
        "Die Bibliothek ist von Dienstag bis Samstag geöffnet. Der Ausweis ist für Schüler kostenlos, Erwachsene bezahlen zehn Euro im Jahr.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Radiointerview",
      genreTr: "Radyo röportajı",
      plays: 2,
      segments: [
        { speaker: "Moderatorin", text: "Herr Brandt, Sie haben eine Studie über junge Leute und Nachrichten gemacht. Was war das wichtigste Ergebnis?" },
        { speaker: "Brandt", text: "Dass fast niemand unter 25 noch eine Zeitung kauft. Die meisten informieren sich über soziale Medien." },
        { speaker: "Moderatorin", text: "Ist das ein Problem?" },
        { speaker: "Brandt", text: "Nicht automatisch. Viele junge Leute sind sehr gut informiert. Aber sie sehen oft nur die Überschrift und lesen den Artikel nicht." },
        { speaker: "Moderatorin", text: "Und was passiert dann?" },
        { speaker: "Brandt", text: "Dann wird eine Nachricht an Freunde geschickt, obwohl sie vielleicht falsch ist. Das haben wir sehr oft beobachtet." },
        { speaker: "Moderatorin", text: "Was würden Sie unseren Hörern raten?" },
        { speaker: "Brandt", text: "Immer fragen: Wer hat das geschrieben? Und wenn eine Nachricht sehr überraschend ist, sollte man sie noch in einer anderen Zeitung prüfen." },
        { speaker: "Moderatorin", text: "Und Sie selbst? Lesen Sie noch Zeitung?" },
        { speaker: "Brandt", text: "Ehrlich gesagt, auf Papier nicht mehr. Aber ich habe zwei Zeitungen im Internet abonniert." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ───────────────────────────────────────────────── */
    {
      id: "de-b1-w02-r1",
      block: "read",
      ref: "t1",
      stem: "Wo war die Feier?",
      options: [
        "auf dem Platz vor der Bibliothek",
        "in der Halle im Erdgeschoss",
        "im Stadtteil Nord",
        "in der alten Bibliothek",
      ],
      answer: 1,
      why: "`nicht wie geplant auf dem Platz …, sondern in der Halle`: `nicht … sondern` kalıbında ilk bilgi plan, ikincisi gerçekte olan. Cümlede ilk geçen yeri cevap sanmak bu yapının tuzağı.",
      targets: ["lesen.detail", "konnektor.sondern"],
    },
    {
      id: "de-b1-w02-r2",
      block: "read",
      ref: "t1",
      stem: "Warum sind einige Leser nicht zufrieden?",
      options: [
        "Die alte Bibliothek in ihrem Stadtteil wurde geschlossen.",
        "Die neue Bibliothek hat zu viel Geld gekostet.",
        "Es gibt keine Kurse für ältere Menschen.",
        "Die Bibliothek ist am Sonntag geöffnet.",
      ],
      answer: 0,
      why: "Haber eleştiriyi `kritisiert, dass …` yan cümlesiyle aktarıyor. Binanın pahalı olduğu metinde yalnız bir bilgi olarak geçiyor, kimse ondan şikâyet etmiyor. Bir haberde bir bilginin geçmesi, onun eleştirildiği anlamına gelmez.",
      targets: ["lesen.detail", "nebensatz.dass"],
    },
    {
      id: "de-b1-w02-r3",
      block: "read",
      ref: "t1",
      stem: "Was macht die Stadt für die Menschen im Stadtteil Nord?",
      options: [
        "Sie öffnet die alte Bibliothek wieder.",
        "Sie bietet dort Kurse am Computer an.",
        "Ein Bücherbus fährt regelmäßig dorthin.",
        "Alle bekommen einen kostenlosen Ausweis.",
      ],
      answer: 2,
      why: "Önlem `angekündigt, dass ab Oktober …` ile duyuruluyor. Ücretsiz kart yalnız öğrenciler için, kurslar da yeni binada. Metnin son paragrafındaki genel bilgiyi belirli bir gruba verilen sözle karıştırmamak gerekiyor.",
      targets: ["lesen.detail"],
    },

    /* ── Dinlediğini anlama ─────────────────────────────────────────────── */
    {
      id: "de-b1-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "Was ist für Brandt das eigentliche Problem?",
      options: [
        "Junge Leute kaufen keine Zeitung mehr.",
        "Soziale Medien sind nicht gut für junge Leute.",
        "Junge Leute interessieren sich nicht für Nachrichten.",
        "Junge Leute lesen oft nur die Überschrift.",
      ],
      answer: 3,
      why: "Gazete almamak araştırmanın BULGUSU; `Ist das ein Problem?` sorusuna cevap `Nicht automatisch` ve asıl sorun `Aber` ile geliyor. Bir röportajda bulgu ile değerlendirmeyi ayırmak gerekiyor.",
      targets: ["hoeren.meinung"],
    },
    {
      id: "de-b1-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "Was rät Brandt den Hörern?",
      options: [
        "keine sozialen Medien mehr zu benutzen",
        "eine Zeitung auf Papier zu kaufen",
        "überraschende Nachrichten noch einmal zu prüfen",
        "keine Nachrichten mehr an Freunde zu schicken",
      ],
      answer: 2,
      why: "Tavsiye `sollte man` ile geliyor ve bir koşula bağlı: `wenn eine Nachricht sehr überraschend ist`. Brandt hiçbir şeyi tamamen bırakmayı önermiyor; `keine … mehr` içeren şıklar onun söylediğinden çok daha kesin.",
      targets: ["hoeren.detail", "nebensatz.wenn"],
    },
    {
      id: "de-b1-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "Wie liest Brandt selbst Nachrichten?",
      options: [
        "nur in sozialen Medien",
        "in Zeitungen im Internet",
        "in Zeitungen auf Papier",
        "gar nicht mehr",
      ],
      answer: 1,
      why: "`auf Papier nicht mehr. Aber …`: olumsuzlanan yol elenmeli, doğru bilgi `Aber`dan sonra geliyor. `abonniert` gazeteyi düzenli okuduğunu gösteriyor; `nicht mehr`i bütün okumaya yaymak tuzak.",
      targets: ["hoeren.detail"],
    },

    /* ── Dilbilgisi ─────────────────────────────────────────────────────── */
    {
      id: "de-b1-w02-g1",
      block: "grammar",
      stem: "Das Gebäude ___ zwischen 2022 und 2024 gebaut.",
      options: ["wird", "hat", "wurde", "war"],
      answer: 2,
      why: "Geçmişte yapılmış bir işlem Passiv Präteritum ile anlatılır: `werden`in geçmişi `wurde` + Partizip. `hat gebaut` etkendir ve inşa edeni özne ister; `war gebaut` bir işlemi değil bir DURUMU bildirir ve iki yıllık süreyle birleşmez.",
      targets: ["passiv.praeteritum"],
      byNative: {
        tr: {
          options: ["wird", "hat", "wurde", "war"],
          answer: 2,
          why: "Türkçede edilgenlik fiile eklenen bir ekle kuruluyor (`inşa edildi`), ayrı bir yardımcı fiil yok. Almancada yardımcı fiil zorunlu ve bu iş `werden`in: geçmişte `wurde`. `war` bir işlemi değil bir durumu anlatır.",
        },
        en: {
          options: ["wird", "hat", "wurde", "war"],
          answer: 2,
          why: "İngilizce edilgen `be` ile kurulur (`was built`), o yüzden `war gebaut` doğru görünür. Almancada edilgen işlemin yardımcı fiili `werden`: `wurde gebaut`. `war gebaut` yalnız sonuçtaki durumu anlatır, inşa sürecini değil.",
        },
      },
    },
    {
      id: "de-b1-w02-g2",
      block: "grammar",
      stem: "Das Programm für Kinder wird ___ Studenten organisiert.",
      options: ["mit", "durch", "bei", "von"],
      answer: 3,
      why: "Edilgen cümlede işi yapan KİŞİ `von` + Dativ ile verilir. `mit` bir araç ya da birliktelik bildirir, `bei` bir yer ya da kurum; `durch` daha çok bir araç ya da süreç için kullanılır, düzenleyen kişiler için değil.",
      targets: ["passiv.von", "passiv.praesens"],
      byNative: {
        en: {
          options: ["mit", "durch", "bei", "von"],
          answer: 3,
          why: "İngilizcede yapan `by` ile gelir ve ses benzerliği `bei`i çağırıyor; ama `bei` bir yer ya da kurum bildirir (`bei der Stadt`). Edilgen cümlede işi yapan kişi `von` ile verilir.",
        },
      },
    },
    {
      id: "de-b1-w02-g3",
      block: "grammar",
      stem: "Wegen ___ Wetters fand die Feier in der Halle statt.",
      options: ["des schlechten", "dem schlechten", "das schlechte", "der schlechten"],
      answer: 0,
      why: "Yazı dilinde `wegen` Genitiv ister: eril ve nötr isimde tanımlık `des`, sıfat `-en` alır ve ismin kendisine `-s` eklenir (`Wetters`). Günlük konuşmada `wegen dem` de duyulur ama `Wetters` biçimi Genitiv'den başka bir şeyle birleşmez.",
      targets: ["genitiv.praeposition"],
    },
    {
      id: "de-b1-w02-g4",
      block: "grammar",
      stem: "Die Rede ___ war kurz, aber gut.",
      options: ["die Politikerin", "der Politikerin", "von die Politikerin", "Politikerins"],
      answer: 1,
      why: "Bir ismin kime ait olduğu Genitiv'le, ismin ARKASINDAN verilir. Dişil isimde Genitiv tanımlığı `der`dir ve isim ek almaz.",
      targets: ["genitiv.attribut"],
      byNative: {
        tr: {
          options: ["die Politikerin", "der Politikerin", "von die Politikerin", "Politikerins"],
          answer: 1,
          why: "Türkçede tamlayan ÖNDE durur ve eki kendisi alır (`politikacının konuşması`). Almancada sıra tersine döner: tamlayan arkaya geçer ve durumu tanımlık taşır. Dişil isimde bu tanımlık `der`, isim ise ek almaz.",
        },
        en: {
          options: ["die Politikerin", "der Politikerin", "von die Politikerin", "Politikerins"],
          answer: 1,
          why: "İngilizcedeki `the politician's speech` kalıbı Almancada yalnız özel adlarla kurulur (`Annas Rede`). Tanımlıklı bir isimde tamlayan arkaya geçer ve Genitiv tanımlığı alır; dişil isimde bu `der`.",
        },
      },
    },
    {
      id: "de-b1-w02-g5",
      block: "grammar",
      stem: "Einige Leser haben kritisiert, dass die alte Bibliothek ___.",
      options: ["wurde geschlossen", "geschlossen geworden", "hat geschlossen", "geschlossen wurde"],
      answer: 3,
      why: "Yan cümlede çekimli fiil EN SONA gider; edilgen cümlede çekimli fiil `wurde` olduğu için Partizip ondan önce gelir. `geworden` edilgende kullanılmaz, `hat geschlossen` ise etken bir cümle.",
      targets: ["nebensatz.dass", "nebensatz.verbend", "passiv.praeteritum"],
      byNative: {
        en: {
          options: ["wurde geschlossen", "geschlossen geworden", "hat geschlossen", "geschlossen wurde"],
          answer: 3,
          why: "İngilizcede `that the library was closed` sırası ana cümleyle aynı, bu yüzden `wurde geschlossen` doğru görünür. Almancada `dass` çekimli fiili sona iter: önce Partizip, en sonda `wurde`.",
        },
      },
    },

    /* ── Bağlamda kelime ────────────────────────────────────────────────── */
    {
      id: "de-b1-w02-v1",
      block: "vocab",
      stem: "Die ___ Nachrichten hören Sie jede Stunde im Radio.",
      options: ["tatsächlichen", "aktuellen", "eigentlichen", "echten"],
      answer: 1,
      why: "Her saat yenilenen haberler `aktuell`dir: güncel, şu anki. `tatsächlich` gerçekten olmuş, `eigentlich` asıl; ikisi de bir haberin yeni olduğunu söylemez.",
      targets: ["falsefriend.aktuell", "wortfeld.medien"],
      byNative: {
        en: {
          options: ["tatsächlichen", "aktuellen", "eigentlichen", "echten"],
          answer: 1,
          why: "`aktuell` İngilizce `actual` ya da `actually` DEĞİL — sahte dost. `aktuell` = current, up to date; `actually` Almancada `eigentlich` ya da `tatsächlich`. Her saat yenilenen haber güncel haberdir.",
        },
      },
    },
    {
      id: "de-b1-w02-v2",
      block: "vocab",
      stem: "Viele lesen nur die ___ und nicht den ganzen Artikel.",
      options: ["Sendung", "Werbung", "Überschrift", "Seite"],
      answer: 2,
      why: "Bir yazının tamamıyla karşılaştırılan kısa parça başlıktır. `Sendung` radyo ya da televizyon programıdır ve okunmaz; `Seite` bir makaleden büyük olabilir, `Werbung` ise reklam.",
      targets: ["wortfeld.medien"],
    },
    {
      id: "de-b1-w02-v3",
      block: "vocab",
      stem: "Die Zeitung ___ heute über die neue Bibliothek.",
      options: ["berichtet", "erzählt", "sagt", "spricht"],
      answer: 0,
      why: "Bir haber organının bir olay hakkında bilgi vermesi `über etwas berichten`. `erzählen` kişisel bir anlatı ya da hikâyedir; `sagen` `über` ile birleşmez, `sprechen`in öznesi ise konuşan bir insandır, gazete değil.",
      targets: ["verb.berichten", "wortfeld.medien"],
    },
  ],
};
