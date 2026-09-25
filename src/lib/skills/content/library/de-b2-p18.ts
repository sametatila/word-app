import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 18.
 *
 * B2 hücresini YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 18 şehirdeki yaban hayatı hattı: bir yaban hayvanı danışmanıyla
 * söyleşi, parkta bir yarasa gezisi, apartman girişine asılacak bir duyuru.
 * Dil bilgisi würde'siz Konjunktiv II — käme, ginge, gäbe, wüsste,
 * bräuchte, täte, hielte.
 */
export const deB2P18: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r18",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Der Fuchs kennt die Mülltonnen",
    genre: "interview",
    intro: "Şehirde yaban hayvanlarıyla karşılaşanlara danışmanlık yapan biriyle söyleşi: hayvanlar neden geliyor, ne yapmalı, ne yapmamalı.",
    gloss: [
      { de: "der Fuchs", tr: "tilki", en: "fox" },
      { de: "das Wildschwein", tr: "yaban domuzu", en: "wild boar" },
      { de: "scheu", tr: "ürkek", en: "shy" },
      { de: "füttern", tr: "beslemek", en: "to feed" },
      { de: "vertreiben", tr: "kovmak", en: "to drive away" },
      { de: "das Versteck", tr: "saklanma yeri", en: "hiding place" },
    ],
    minutes: 8,
    text:
      "Der Fuchs kennt die Mülltonnen\n\n" +
      "Sabine Roth berät seit zwölf Jahren Menschen, die in der Stadt Wildtieren begegnen.\n\n" +
      "Frau Roth, warum kommen so viele Tiere in die Stadt?\n" +
      "Weil sie hier so gut leben, dass sie gar nicht mehr zurückwollen. Füchse finden in Mülltonnen " +
      "und Komposthaufen mehr Futter als im Wald, und im Winter ist es in der Stadt zwei, drei Grad " +
      "wärmer.\n\n" +
      "Sind die Tiere gefährlich?\n" +
      "Selten. Ein Fuchs ist zu scheu, als dass er einen Menschen angreifen würde. Anders ist es bei " +
      "Wildschweinen mit Jungen: Da sollte man Abstand halten. Die meisten Anrufe bekomme ich aber " +
      "wegen Waschbären, die sich im Dach einrichten.\n\n" +
      "Was raten Sie dann?\n" +
      "Zuerst: nicht füttern. Viele Leute meinen es gut und stellen Katzenfutter auf die Terrasse. Die " +
      "Tiere verlieren dadurch so sehr die Angst, dass sie irgendwann bis in die Küche kommen. Dann wird " +
      "es für beide Seiten schwierig.\n\n" +
      "Kann man sie vertreiben?\n" +
      "Kurzfristig ja, auf Dauer kaum. Wer einen Waschbären aus dem Dach vertreibt, ohne das Loch zu " +
      "schließen, hat im nächsten Jahr den nächsten. Man muss Häuser und Gärten so gestalten, dass sie " +
      "weniger Futter und weniger Verstecke bieten.\n\n" +
      "Und wenn das nicht reicht?\n" +
      "Dann müssen wir lernen, mit ihnen zu leben. Die Tiere waren übrigens oft zuerst da: Viele " +
      "Neubaugebiete liegen genau auf ihren alten Wegen.",
    questions: [
      {
        text: "Warum kommen Füchse laut Frau Roth in die Stadt?",
        options: [
          "weil der Wald immer kleiner wird",
          "weil sie hier mehr Futter finden",
          "weil sie die Nähe von Menschen suchen",
        ],
        answer: 1,
        explain: "Çöp kutularında ve kompost yığınlarında ormandakinden fazla yiyecek var, kışın da şehir daha sıcak.",
      },
      {
        text: "Weshalb bekommt Frau Roth die meisten Anrufe?",
        options: [
          "wegen Füchsen im Garten",
          "wegen Wildschweinen auf der Straße",
          "wegen Waschbären im Dach",
        ],
        answer: 2,
        explain: "„Die meisten Anrufe bekomme ich aber wegen Waschbären, die sich im Dach einrichten.“",
      },
      {
        kind: "truefalse",
        text: "Laut Frau Roth greifen Füchse Menschen häufig an.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Tilki bir insana saldırmayacak kadar ürkek; dikkat gereken, yavrulu yaban domuzları.",
      },
      {
        kind: "gapfill",
        text: "Im Winter ist es in der Stadt zwei, drei ___ wärmer.",
        options: [],
        answer: 0,
        accept: ["Grad"],
        explain: "„im Winter ist es in der Stadt zwei, drei Grad wärmer“.",
      },
      {
        kind: "short_answer",
        text: "Was sollte man laut Frau Roth auf keinen Fall tun?",
        options: [],
        answer: 0,
        accept: ["die Tiere füttern", "füttern", "Tiere füttern"],
        explain: "„Zuerst: nicht füttern.“ — hayvanlar korkularını kaybediyor.",
      },
      {
        text: "Was passiert, wenn man einen Waschbären vertreibt, aber das Loch offen lässt?",
        options: [
          "Im nächsten Jahr kommt ein anderer.",
          "Er kommt danach nie wieder zurück.",
          "Er zieht einfach in den Keller um.",
        ],
        answer: 0,
        explain: "Delik kapanmazsa ertesi yıl bir başkası yerleşiyor.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l18",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Abends im Stadtpark",
    genre: "guide",
    intro: "Şehir parkında akşam yarasa gezisi: rehber hayvanları, bir cihazı ve neden azaldıklarını anlatıyor, bir katılımcı soru soruyor.",
    gloss: [
      { de: "die Fledermaus", tr: "yarasa", en: "bat" },
      { de: "die Taschenlampe", tr: "el feneri", en: "torch" },
      { de: "die Mücke", tr: "sivrisinek", en: "mosquito" },
      { de: "das Märchen", tr: "masal", en: "fairy tale" },
      { de: "fällen", tr: "devirmek", en: "to fell" },
      { de: "dämmen", tr: "yalıtmak", en: "to insulate" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Herr Behrens", text: "Guten Abend und herzlich willkommen zur Fledermausführung. Bitte schalten Sie jetzt Ihre Taschenlampen aus, sonst sehen wir gleich gar nichts." },
      { speaker: "Herr Behrens", text: "In diesem Park leben mindestens sechs Arten. Die meisten schlafen tagsüber in alten Bäumen, einige auch hinter den Fensterläden der Häuser dort drüben." },
      { speaker: "Herr Behrens", text: "Hier in meiner Hand sehen Sie einen Detektor. Fledermäuse rufen so hoch, dass wir sie nicht hören können. Das Gerät macht ihre Rufe für uns hörbar." },
      { speaker: "Frau Engel", text: "Stimmt es eigentlich, dass Fledermäuse blind sind?" },
      { speaker: "Herr Behrens", text: "Nein, das ist ein Märchen. Sie sehen ganz ordentlich. Im Dunkeln orientieren sie sich aber über das Echo ihrer Rufe, und zwar so genau, dass sie eine Mücke im Flug fangen." },
      { speaker: "Herr Behrens", text: "Eine einzige Zwergfledermaus frisst in einer Nacht bis zu dreitausend Insekten. Deshalb sind die Tiere in jedem Garten willkommen." },
      { speaker: "Frau Engel", text: "Und warum gibt es dann immer weniger?" },
      { speaker: "Herr Behrens", text: "Weil alte Bäume gefällt und Häuser inzwischen so gut gedämmt werden, dass keine Spalte mehr offen bleibt. Die Tiere finden schlicht keinen Platz mehr." },
      { speaker: "Herr Behrens", text: "Wer helfen will, kann einen Fledermauskasten an die Hauswand hängen: mindestens drei Meter hoch und nicht in der prallen Sonne." },
      { speaker: "Frau Engel", text: "Und wann sieht man sie am besten?" },
      { speaker: "Herr Behrens", text: "Im Spätsommer, etwa eine halbe Stunde nach Sonnenuntergang, und am liebsten in der Nähe von Wasser." },
      { speaker: "Herr Behrens", text: "Hören Sie das? Dieses Knattern im Detektor bedeutet, dass gerade eine direkt über uns jagt." },
    ],
    questions: [
      {
        text: "Warum sollen die Leute ihre Taschenlampen ausschalten?",
        options: [
          "weil die Tiere sonst angreifen",
          "weil das Licht den Detektor stört",
          "weil man sonst gar nichts sieht",
        ],
        answer: 2,
        explain: "„sonst sehen wir gleich gar nichts“ — karanlığa alışmak gerekiyor.",
      },
      {
        text: "Wozu dient der Detektor?",
        options: [
          "Er macht die Rufe hörbar.",
          "Er lockt die Tiere an.",
          "Er zählt die Insekten.",
        ],
        answer: 0,
        explain: "Yarasaların sesleri insan kulağı için fazla tiz; cihaz onları duyulur kılıyor.",
      },
      {
        kind: "truefalse",
        text: "Fledermäuse sind nicht blind.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„Nein, das ist ein Märchen. Sie sehen ganz ordentlich.“",
      },
      {
        kind: "gapfill",
        text: "Eine Zwergfledermaus frisst in einer Nacht bis zu ___ Insekten.",
        options: [],
        answer: 0,
        accept: ["dreitausend", "3000", "3.000"],
        explain: "„bis zu dreitausend Insekten“.",
      },
      {
        kind: "short_answer",
        text: "Wie hoch soll ein Fledermauskasten mindestens hängen?",
        options: [],
        answer: 0,
        accept: ["drei Meter", "3 Meter", "mindestens drei Meter"],
        explain: "„mindestens drei Meter hoch und nicht in der prallen Sonne“.",
      },
      {
        text: "Warum gibt es immer weniger Fledermäuse?",
        options: [
          "weil es zu wenige Insekten gibt",
          "weil sie keine Plätze mehr finden",
          "weil Katzen sie nachts jagen",
        ],
        answer: 1,
        explain: "Yaşlı ağaçlar kesiliyor ve evlerde açık yarık kalmıyor; saklanacak yer yok.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w18",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Aushang: Bitte keine Tauben füttern",
    genre: "ad",
    intro: "Apartman girişine bir duyuru asıyorsun: önce iki cümle kur, sonra kimseyi suçlamadan ama açıkça bir rica yaz.",
    gloss: [
      { de: "die Taube", tr: "güvercin", en: "pigeon" },
      { de: "füttern", tr: "beslemek", en: "to feed" },
      { de: "die Hausgemeinschaft", tr: "apartman sakinleri", en: "residents" },
      { de: "verstopft", tr: "tıkalı", en: "blocked" },
      { de: "das Verständnis", tr: "anlayış", en: "understanding" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Balkonlar o kadar kirlendi ki artık kullanılamıyor.",
        answer: "Die Balkone sind so schmutzig geworden, dass man sie nicht mehr nutzen kann.",
        alternatives: ["So schmutzig sind die Balkone geworden, dass man sie nicht mehr nutzen kann."],
        hint: "„so + sıfat …, dass“: „so“ ana cümlede sıfatın önünde; yan cümlede fiil sonda.",
      },
      {
        kind: "build",
        tr: "Gittikçe daha çok güvercin geliyor, öyle ki artık kimse dışarıda oturmuyor.",
        answer: "Es kommen immer mehr Tauben, sodass niemand mehr draußen sitzt.",
        alternatives: ["Es kommen immer mehr Tauben, sodass draußen niemand mehr sitzt."],
        hint: "„sodass“ sonucu tek parçalı bir bağlaçla bildirir; yan cümlede fiil sonda.",
      },
      {
        kind: "free",
        prompt:
          "Apartman girişine bir duyuru yaz: birinin güvercinleri beslediğini kimseyi suçlamadan söyle, sonuçlarını somut anlat, beslemenin güvercinlere de neden zarar verdiğini açıkla, kibar bir rica yap ve konuşmak isteyenlere bir yol göster.",
        checklist: [
          "Sorunu kimseyi suçlamadan söyle",
          "Sonuçlarını somut anlat",
          "Beslemenin hayvanlara neden zarar verdiğini açıkla",
          "Kibarca rica et ve konuşma imkânı sun",
        ],
        minWords: 120,
        phrases: [
          { de: "Wir verstehen, dass …, möchten aber …", tr: "…'i anlıyoruz ama … istiyoruz.", en: "We understand that …, but we would like to …" },
          { de: "… ist so …, dass …", tr: "… o kadar … ki …", en: "… is so … that …" },
          { de: "…, sodass …", tr: "…, öyle ki …", en: "…, so that …" },
          { de: "Wir bitten deshalb herzlich darum, …", tr: "Bu yüzden içtenlikle … rica ediyoruz.", en: "We therefore kindly ask that …" },
          { de: "Wer darüber reden möchte, kann gern …", tr: "Bunu konuşmak isteyen … yapabilir.", en: "Anyone who wants to talk about it is welcome to …" },
        ],
        sample:
          "Liebe Hausgemeinschaft, seit einigen Wochen füttert jemand in unserem Haus die Tauben, vermutlich " +
          "aus einem der oberen Stockwerke. Wir verstehen, dass das gut gemeint ist, möchten aber erklären, " +
          "warum es für alle ein Problem ist. " +
          "Inzwischen sitzen jeden Morgen über dreißig Tauben auf dem Dach und auf den Fensterbänken. Die " +
          "Balkone zum Hof sind so schmutzig geworden, dass man sie kaum noch nutzen kann, und an zwei Stellen " +
          "ist die Regenrinne verstopft. Wer im Erdgeschoss wohnt, muss den Hof inzwischen fast jeden Tag fegen. " +
          "Auch den Tieren tut das Brot nicht gut: Sie werden davon krank, und weil so viel Futter da ist, " +
          "brüten sie öfter, sodass es jedes Jahr mehr werden. " +
          "Wir bitten deshalb herzlich darum, das Füttern einzustellen. Wer darüber reden möchte, kann gern " +
          "bei uns klingeln; wir sind meistens abends zu Hause. " +
          "Vielen Dank für Ihr Verständnis! Familie Demir und Herr Pohl, Erdgeschoss",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s18",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Wildtiere in der Stadt: vertreiben oder dulden?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: tek bir cevap verme, durumları ayır ve bir kural öner.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Şehirde yaşayan yaban hayvanları (tilki, rakun, yaban domuzu) kovulmalı mı, yoksa onlarla yaşamayı mı öğrenmeliyiz? Durumları birbirinden ayır, sorunun kaynağını söyle, bedeli kimin ödediğini anlat ve bir kural öner.",
      bulletsTr: [
        "Durumları birbirinden ayır",
        "Sorunun kaynağını söyle",
        "Bedeli kimin ödediğini anlat",
        "Bir kural öner",
      ],
      targets: [
        { de: "Man muss hier unterscheiden zwischen … und …", tr: "Burada … ile … arasında ayrım yapmak gerekiyor" },
        { de: "Viele Konflikte sind so …, dass …", tr: "Pek çok çatışma o kadar … ki …" },
        { de: "Die Kosten dafür tragen vor allem …", tr: "Bunun bedelini en çok … ödüyor" },
        { de: "Als Regel würde ich vorschlagen: …", tr: "Kural olarak şunu önerirdim: …" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Man muss hier unterscheiden zwischen Tieren, die stören, und Tieren, die gefährlich werden können. " +
        "Ein Fuchs, der nachts durch den Garten läuft, stört höchstens den Hund. Eine Wildschweinfamilie auf " +
        "einem Spielplatz ist eine andere Sache. Im ersten Fall bin ich fürs Dulden, im zweiten für schnelles " +
        "Handeln. " +
        "Viele Konflikte sind außerdem so hausgemacht, dass man zuerst bei den Menschen ansetzen sollte: Wer " +
        "Mülltonnen offen lässt oder Katzenfutter auf die Terrasse stellt, lädt die Tiere ein und beschwert " +
        "sich dann über den Besuch. " +
        "Die Kosten dafür tragen vor allem die Nachbarn, die selbst alles richtig machen und trotzdem einen " +
        "Waschbären im Dach haben. " +
        "Als Regel würde ich vorschlagen: Füttern wird verboten und auch kontrolliert, Mülltonnen müssen fest " +
        "schließen, und nur wo Menschen wirklich in Gefahr sind, werden Tiere entfernt. Alles andere ist der " +
        "Preis dafür, dass wir auf ihrem Gebiet gebaut haben.",
      rubricHint:
        "Durumların ayrılması ve uygulanabilir bir kural beklenir; „unterscheiden zwischen“, sonuç cümleleri („so …, dass“) ve Konjunktiv II kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g18",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "Wenn ich wüsste, wo er schläft …",
    genre: "grammar",
    intro: "Konjunktiv II'yi her fiilde „würde“ ile kurmak zorunda değilsin: sık kullanılan güçlü ve karma fiillerin kendi kısa biçimleri var ve yazıda daha doğal duruyor.",
    focus: "würde'siz Konjunktiv II: güçlü ve karma fiillerin kendi biçimleri — käme, ginge, gäbe, hielte, wüsste, bräuchte, täte (nezaket kalıplarının ve geçmiş Konjunktiv II'nin dışında)",
    gloss: [
      { de: "der Fuchs", tr: "tilki", en: "fox" },
      { de: "der Waschbär", tr: "rakun", en: "raccoon" },
      { de: "die Mülltonne", tr: "çöp bidonu", en: "garbage can" },
      { de: "füttern", tr: "beslemek", en: "to feed" },
      { de: "der Igel", tr: "kirpi", en: "hedgehog" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Güçlü fiiller: Präteritum kökü + Umlaut + -e",
        tr: "B1'de wäre, hätte, könnte gibi kısa biçimleri gördün. Öteki güçlü fiillerin Konjunktiv II'si de Präteritum kökünden yapılır: a, o, u ünlüsü noktalanır ve -e eklenir: kam → käme, gab → gäbe. Ünlüsü noktalanamayan kökte yalnız -e eklenir: ging → ginge, hielt → hielte.",
        examples: [
          { de: "Wenn der Fuchs näher käme, würde ich die Kinder reinholen.", tr: "Tilki daha yakına gelse çocukları içeri alırdım.", note: "kam → käme" },
          { de: "Ohne die offenen Mülltonnen gäbe es hier kaum Waschbären.", tr: "Açık çöp bidonları olmasa burada neredeyse hiç rakun olmazdı.", note: "gab → gäbe" },
          { de: "Wenn man die Tonnen geschlossen hielte, ginge das Problem zurück.", tr: "Bidonlar kapalı tutulsa sorun azalırdı.", note: "hielt → hielte, ging → ginge" },
        ],
      },
      {
        heading: "Karma fiiller ve tun",
        tr: "wissen, brauchen, bringen gibi karma fiiller de kendi biçimini alır: wusste → wüsste, brauchte → bräuchte, brachte → brächte. „bräuchte“ konuşmada çok yaygındır. „tun“ → „täte“ ise daha çok kalıplarda yaşar: „Das täte mir leid.“, „Du tätest gut daran, …“",
        examples: [
          { de: "Wenn ich wüsste, wo der Igel schläft, würde ich dort nicht mähen.", tr: "Kirpinin nerede uyuduğunu bilsem orayı biçmezdim.", note: "wusste → wüsste" },
          { de: "Bräuchten wir dafür eine Genehmigung?", tr: "Bunun için bir izne ihtiyacımız olur muydu?", note: "brauchte → bräuchte" },
          { de: "Du tätest gut daran, die Tiere nicht zu füttern.", tr: "Hayvanları beslemesen iyi edersin.", note: "tun → täte" },
        ],
      },
      {
        heading: "Ne zaman würde?",
        tr: "Düzenli fiillerin Konjunktiv II'si Präteritum'la aynıdır: „wenn sie fütterten“ geçmiş gibi okunur. Bu yüzden düzenli fiillerde „würde + mastar“ kullanılır. Güçlü fiillerde iki yol da doğrudur; ama bir cümlede iki kez „würde“ ağırlaşır, kısa biçim bunu önler.",
        examples: [
          { de: "Wenn die Nachbarn die Katzen nicht füttern würden, käme der Fuchs seltener.", tr: "Komşular kedileri beslemese tilki daha seyrek gelirdi.", note: "düzenli: füttern würden" },
          { de: "Wenn der Waschbär ins Haus ginge, würde ich die Feuerwehr rufen.", tr: "Rakun eve girse itfaiyeyi arardım.", note: "yan cümlede kısa biçim" },
          { de: "Es wäre besser, wenn niemand Brot in den Park brächte.", tr: "Kimse parka ekmek getirmese daha iyi olurdu.", note: "brachte → brächte" },
        ],
      },
    ],
    questions: [
      {
        text: "Wenn der Fuchs näher ___, würde ich die Kinder reinholen.",
        options: ["kommte", "käme", "kam"],
        answer: 1,
        explain: "Güçlü fiil: Präteritum kökü „kam“ noktalanır ve -e alır: käme.",
      },
      {
        text: "Welche Form ist der Konjunktiv II von „wissen“?",
        options: ["wüsste", "wisste", "wusste"],
        answer: 0,
        explain: "Karma fiil: Präteritum „wusste“ noktalanır: wüsste. „wusste“ yalnız geçmiş zaman.",
      },
      {
        text: "Warum sagt man meistens „füttern würden“ statt „fütterten“?",
        options: [
          "weil „füttern“ ein starkes Verb ist",
          "weil „würde“ immer höflicher ist",
          "weil „fütterten“ wie Präteritum aussieht",
        ],
        answer: 2,
        explain: "Düzenli fiilin Konjunktiv II'si Präteritum'la aynı; karışmasın diye würde kullanılır.",
      },
      {
        kind: "gapfill",
        text: "Ohne die offenen Mülltonnen ___ es hier kaum Waschbären. (geben)",
        options: [],
        answer: 0,
        accept: ["gäbe"],
        explain: "gab → gäbe: „es gibt“ kalıbının Konjunktiv II'si.",
      },
      {
        kind: "gapfill",
        text: "Wenn man die Tonnen geschlossen ___, ginge das Problem zurück. (halten)",
        options: [],
        answer: 0,
        accept: ["hielte"],
        explain: "hielt kökünde noktalanacak ünlü yok; yalnız -e eklenir: hielte.",
      },
      {
        kind: "gapfill",
        text: "Wenn der Waschbär ins Haus ___, würde ich die Feuerwehr rufen. (gehen)",
        options: [],
        answer: 0,
        accept: ["ginge"],
        explain: "ging → ginge; yan cümlede kısa biçim ikinci bir „würde“yu önler.",
      },
      {
        kind: "gapfill",
        text: "Du ___ gut daran, die Tiere nicht zu füttern. (tun)",
        options: [],
        answer: 0,
        accept: ["tätest"],
        explain: "„tun“un Konjunktiv II'si täte; du ile tätest: kalıp „gut daran tun“.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Wenn ich wüsste,", "wo der Igel schläft,", "würde", "ich", "dort nicht", "mähen"],
        explain: "Yan cümleler önde; ana cümle çekimli fiille (würde) başlar, mastar sonda.",
      },
      {
        kind: "truefalse",
        text: "„Wenn ich das wisste, würde ich es dir sagen.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„wissen“in Konjunktiv II'si „wüsste“dir: „Wenn ich das wüsste, …“",
      },
      {
        kind: "truefalse",
        text: "„Es wäre besser, wenn niemand Brot in den Park brächte.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Karma fiil „bringen“: brachte → brächte.",
      },
    ],
  },
];
