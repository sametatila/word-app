import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 3 · Toplum ve değişim.
 *
 * ÖLÇÜLEN ŞEY: uzun, katmanlı cümleleri çözebilmek ve gerçek dışı bir durumu
 * kurabilmek — genişletilmiş ortaç sıfatı, Genitiv ve Konjunktiv II.
 *
 * GENİŞLETİLMİŞ ORTAÇ SIFATI (`w03-g1`) iki anadilde tam ters durumda:
 * Türkçede isimden önce gelen ortaçlı sıfat cümlesi NORMAL yapıdır
 * ("geçen yıl yayımlanan rapor"), yani Türk öğrenci için yapı tanıdık ve
 * tuzak yalnız uzunlukta. İngilizcede böyle bir yapı YOK; İngiliz öğrenci
 * ilgi cümlesine kaçıyor ve ortacı hiç kuramıyor. Aynı madde, iki ayrı
 * zorluk.
 *
 * ARALIKLI TEKRAR: `w03-g4` W1'in Konjunktiv hedefine bu kez gerçek dışılık
 * üzerinden dönüyor; `w03-v2` W1'deki argümantasyon sözlüğünü genişletiyor.
 */
export const DE_C1_W03: QuizWeek = {
  id: "de-c1-w03",
  course: "de",
  level: "C1",
  no: 3,
  theme: "Gesellschaft und Wandel",
  themeTr: "Toplum ve değişim",
  canDo: ["C1.RD.3", "C1.LS.3", "C1.GR.3", "C1.WR.2"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Essay",
      genreTr: "Deneme",
      title: "Wer zieht weg — und warum",
      body:
        "Der im vergangenen Jahr veröffentlichte Bericht zur Binnenwanderung zeigt ein Bild, " +
        "das den gängigen Erwartungen widerspricht. Nicht die Großstädte wachsen am schnellsten, " +
        "sondern die Gemeinden in ihrem Umland.\n\n" +
        "Die Gründe sind bekannt: Die Mieten in den Zentren sind für viele kaum noch zu bezahlen. " +
        "Wer Kinder hat, sucht Platz; wer im Netz arbeiten kann, braucht die Nähe zum Büro immer seltener. " +
        "Hätte man vor zwanzig Jahren dieselbe Entwicklung vorhergesagt, wäre man wohl ausgelacht worden.\n\n" +
        "Die Folgen für die betroffenen Gemeinden sind allerdings zwiespältig. Einerseits steigen die " +
        "Einnahmen, andererseits fehlen Schulen, Ärzte und Busverbindungen. Der Ausbau der Infrastruktur " +
        "hinkt der Zuwanderung regelmäßig hinterher.\n\n" +
        "Sollte sich der Trend fortsetzen, stünden viele kleine Orte vor einer Aufgabe, " +
        "auf die sie weder personell noch finanziell vorbereitet sind.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Interview",
      genreTr: "Söyleşi",
      plays: 2,
      segments: [
        { speaker: "Redakteur", text: "Frau Özdemir, Ihre Gemeinde wächst schnell. Freuen Sie sich?" },
        { speaker: "Özdemir", text: "Grundsätzlich ja. Aber Wachstum allein löst keine Probleme, es schafft auch neue." },
        { speaker: "Redakteur", text: "Woran denken Sie konkret?" },
        { speaker: "Özdemir", text: "An die Schule. Wir haben zwei Klassen mehr und keinen Raum dafür." },
        { speaker: "Redakteur", text: "Wäre ein Neubau nicht die Lösung?" },
        { speaker: "Özdemir", text: "Wenn wir das Geld hätten, stünde er längst. So warten wir auf das Land." },
        { speaker: "Redakteur", text: "Und wenn die Mittel ausbleiben?" },
        { speaker: "Özdemir", text: "Dann müssten wir Kinder abweisen. Das will hier niemand aussprechen." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "de-c1-w03-r1",
      block: "read",
      ref: "t1",
      stem: "Welches Ergebnis des Berichts widerspricht der Erwartung?",
      options: [
        "Die Mieten in den Zentren sinken",
        "Das Umland wächst schneller als die Großstädte",
        "Die Großstädte verlieren keine Einwohner",
        "Die Binnenwanderung hat aufgehört",
      ],
      answer: 1,
      why: "\"Nicht die Großstädte wachsen am schnellsten, sondern die Gemeinden in ihrem Umland.\" `nicht … sondern` yapısı beklentiyi ve gerçeği yan yana koyuyor; şaşırtıcı olan ikinci yarıda.",
      targets: ["lesen.detail", "syntax.nicht-sondern"],
    },
    {
      id: "de-c1-w03-r2",
      block: "read",
      ref: "t1",
      stem: "Wie beschreibt der Text die Folgen für die Gemeinden?",
      options: [
        "Eindeutig positiv",
        "Eindeutig negativ",
        "Zwiespältig: mehr Einnahmen, aber fehlende Infrastruktur",
        "Ohne erkennbare Folgen",
      ],
      answer: 2,
      why: "`einerseits … andererseits` bir dengeyi kuruyor ve metin bunu `zwiespältig` diye adlandırıyor. Tek yöne çeken bir okuma, cümlenin yarısını görmezden gelmek olur.",
      targets: ["lesen.wertung", "konnektor.einerseits"],
    },
    {
      id: "de-c1-w03-r3",
      block: "read",
      ref: "t1",
      stem: "Was sagt der letzte Absatz über die kleinen Orte?",
      options: [
        "Sie sind auf ein weiteres Wachstum nicht vorbereitet",
        "Sie werden den Zuzug sicher bewältigen",
        "Sie haben genug Personal, aber kein Geld",
        "Sie lehnen weiteren Zuzug ab",
      ],
      answer: 0,
      why: "`weder personell noch finanziell vorbereitet` ikisini birden dışlıyor — yani ne insan gücü ne para. Yalnız birini seçen şık, `weder … noch` yapısını yarım okumaktan geliyor.",
      targets: ["lesen.detail", "syntax.weder-noch"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "de-c1-w03-l1",
      block: "listen",
      ref: "a1",
      stem: "Wie bewertet Frau Özdemir das Wachstum?",
      options: [
        "Als reine Belastung",
        "Als grundsätzlich positiv, aber problemerzeugend",
        "Als vorübergehende Erscheinung",
        "Als Erfolg ihrer eigenen Politik",
      ],
      answer: 1,
      why: "\"Grundsätzlich ja. Aber Wachstum allein löst keine Probleme, es schafft auch neue.\" `grundsätzlich` onayı sınırlıyor, `aber` ikinci yarıyı açıyor — iki parça birlikte okunmalı.",
      targets: ["hoeren.haltung", "konnektor.aber"],
    },
    {
      id: "de-c1-w03-l2",
      block: "listen",
      ref: "a1",
      stem: "Warum ist der Neubau der Schule bisher nicht erfolgt?",
      options: [
        "Weil kein Bedarf besteht",
        "Weil die Gemeinde ihn nicht will",
        "Weil das Geld fehlt",
        "Weil der Raum nicht gefunden wurde",
      ],
      answer: 2,
      why: "\"Wenn wir das Geld hätten, stünde er längst.\" Gerçek dışı koşul cümlesi tam da paranın OLMADIĞINI söylüyor — Konjunktiv II'nin işlevi bu: söylenmeyeni ima etmek.",
      targets: ["hoeren.inferenz", "konjunktiv2.irreal"],
    },
    {
      id: "de-c1-w03-l3",
      block: "listen",
      ref: "a1",
      stem: "Was wäre die Folge, wenn die Mittel ausbleiben?",
      options: [
        "Die Gemeinde müsste Kinder abweisen",
        "Die Schule würde geschlossen",
        "Die Gemeinde würde neue Lehrer einstellen",
        "Das Land würde die Gemeinde auflösen",
      ],
      answer: 0,
      why: "\"Dann müssten wir Kinder abweisen.\" Cümle Konjunktiv II ile kuruluyor, yani henüz gerçekleşmemiş bir sonuç. Son cümle (`Das will hier niemand aussprechen`) bunun ağırlığını taşıyor ama yeni bir bilgi eklemiyor.",
      targets: ["hoeren.inferenz", "konjunktiv2.irreal"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "de-c1-w03-g1",
      block: "grammar",
      stem: "Welche Formulierung entspricht: „der Bericht, der im vergangenen Jahr veröffentlicht wurde\"?",
      options: [
        "der im vergangenen Jahr veröffentlichte Bericht",
        "der Bericht im vergangenen Jahr veröffentlicht",
        "der veröffentlichende Bericht im vergangenen Jahr",
        "der Bericht des im vergangenen Jahr Veröffentlichens",
      ],
      answer: 0,
      why: "Genişletilmiş ortaç sıfatı, ilgi cümlesini isimden ÖNCEYE toplar: artikel + tümleç + ortaç + isim. Ortaç edilgen anlam taşıdığı için `veröffentlichte` (Partizip II) kullanılır; `veröffentlichende` etken olurdu ve raporu yayımlayan raporun kendisi olurdu.",
      targets: ["partizipialattribut", "syntax.attribut"],
      byNative: {
        tr: {
          options: [
            "der im vergangenen Jahr veröffentlichte Bericht",
            "der Bericht im vergangenen Jahr veröffentlicht",
            "der veröffentlichende Bericht im vergangenen Jahr",
            "der Bericht des im vergangenen Jahr Veröffentlichens",
          ],
          answer: 0,
          why: "Bu yapı Türkçede NORMALDİR: 'geçen yıl yayımlanan rapor' — ortaç isimden önce gelir. Yani yapı tanıdık, tuzak yalnız ortaç seçiminde: edilgen anlam Partizip II ister.",
        },
        en: {
          options: [
            "der im vergangenen Jahr veröffentlichte Bericht",
            "der Bericht im vergangenen Jahr veröffentlicht",
            "der veröffentlichende Bericht im vergangenen Jahr",
            "der Bericht des im vergangenen Jahr Veröffentlichens",
          ],
          answer: 0,
          why: "İngilizcede bu yapının karşılığı YOK; uzun niteleme ilgi cümlesiyle kurulur (`the report that was published…`). O yüzden ortaç isimden önceye toplanmıyor ve sıfat isimden sonra bırakılıyor.",
        },
      },
    },
    {
      id: "de-c1-w03-g2",
      block: "grammar",
      stem: "Der Ausbau ___ Infrastruktur hinkt der Zuwanderung hinterher.",
      options: ["die", "den", "dem", "der"],
      answer: 3,
      why: "`Ausbau` bir Genitiv tümleci alıyor: neyin genişletilmesi? Dişil `die Infrastruktur` Genitiv'de `der Infrastruktur` olur. `hinterherhinken` ise ayrıca Dativ ister ve o tümleç cümlede zaten var (`der Zuwanderung`).",
      targets: ["genitiv", "kasus.unterscheidung"],
    },
    {
      id: "de-c1-w03-g3",
      block: "grammar",
      stem: "___ man vor zwanzig Jahren dieselbe Entwicklung vorhergesagt, wäre man ausgelacht worden.",
      options: ["Wenn", "Hätte", "Würde", "Falls"],
      answer: 1,
      why: "Koşul cümlesi bağlaçsız da kurulabilir; o zaman çekimli fiil BAŞA geçer: `Hätte man …, wäre man …`. `wenn` ile kurulsaydı fiil sona giderdi ve cümle `Wenn man … vorhergesagt hätte` olurdu.",
      targets: ["konjunktiv2.irreal", "syntax.konditional-ohne-wenn"],
      byNative: {
        en: {
          options: ["Wenn", "Hätte", "Würde", "Falls"],
          answer: 1,
          why: "İngilizcede de bağlaçsız koşul var (`Had we known…`), yani yapı tanıdık; tuzak hangi yardımcı fiilin başa geçtiğinde. Geçmişe dönük gerçek dışılık `hätte` ile kurulur, `würde` ile değil.",
        },
      },
    },
    {
      id: "de-c1-w03-g4",
      block: "grammar",
      stem: "Sollte sich der Trend fortsetzen, ___ viele Orte vor einer schweren Aufgabe.",
      options: ["stehe", "standen", "stünden", "gestanden"],
      answer: 2,
      why: "Metin koşulu `sollte` ile bir varsayım olarak kuruyor ve sonucu da Konjunktiv II ile veriyor: `stünden`. Özne çoğul (`viele Orte`); `stehe` tekil bir Konjunktiv I biçimi, `standen` düz geçmiş zaman, `gestanden` ise Partizip ve tek başına çekimli fiil olamaz.",
      targets: ["konjunktiv2.irreal", "syntax.konditional-ohne-wenn"],
    },
    {
      id: "de-c1-w03-g5",
      block: "grammar",
      stem: "Die Orte sind ___ personell ___ finanziell vorbereitet.",
      options: ["sowohl … als auch", "weder … noch", "entweder … oder", "nicht nur … sondern auch"],
      answer: 1,
      why: "Cümle bir eksikliği anlatıyor, yani iki şeyi birden dışlayan çift bağlaç gerekiyor: `weder … noch`. Ötekiler ekleme ya da seçenek kurar ve cümleyi olumluya çevirir.",
      targets: ["syntax.weder-noch", "konnektor.doppelt"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "de-c1-w03-v1",
      block: "vocab",
      stem: "Der Ausbau der Infrastruktur ___ der Zuwanderung hinterher.",
      options: ["sieht", "folgt", "bleibt", "hinkt"],
      answer: 3,
      why: "`hinterherhinken` geride kalmak demek ve `hinterher` önekiyle bir bütün oluşturur. `folgen` yalnız arkadan gelmeyi anlatır, gecikme yargısı taşımaz — cümledeki eleştiri o yargıda.",
      targets: ["verb.hinterherhinken", "wortfeld.entwicklung"],
    },
    {
      id: "de-c1-w03-v2",
      block: "vocab",
      stem: "Die Folgen für die Gemeinden sind ___: Einnahmen steigen, Schulen fehlen.",
      options: ["eindeutig", "beliebig", "zwiespältig", "vorläufig"],
      answer: 2,
      why: "İki zıt sonucun yan yana durduğu bir durum `zwiespältig`tir. `eindeutig` tam tersini söyler; `beliebig` keyfîlik, `vorläufig` geçicilik bildirir ve ikisi de cümledeki karşıtlığı açıklamaz.",
      targets: ["wortfeld.wertung", "adjektiv.zwiespaeltig"],
    },
    {
      id: "de-c1-w03-v3",
      block: "vocab",
      stem: "Der Bericht zeigt ein Bild, das den gängigen Erwartungen ___.",
      options: ["widerspricht", "entspricht", "gehört", "gefällt"],
      answer: 0,
      why: "`widersprechen` Dativ alır ve çelişmeyi bildirir. `entsprechen` de Dativ alır ama tam tersini söyler — metnin devamı beklentinin YANLIŞ çıktığını anlattığı için yalnız biri tutarlı.",
      targets: ["verb.widersprechen", "kasus.dativ"],
    },
  ],
};
