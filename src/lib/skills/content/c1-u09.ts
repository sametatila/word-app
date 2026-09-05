import type { SkillExercise } from "../types";

/**
 * C1 · Ünite 9 — "Hayvan, hava, renk ve spor deyimleri".
 *
 * Dört ders: Schwein gehabt! · Ein Gewitter zieht auf · Blau machen ·
 * Am Ball bleiben.
 *
 *   Kelime: Schwein gehabt, die Katze im Sack kaufen, Pferde stehlen können,
 *           auf den Hund kommen, einen Bären aufbinden, den Stier bei den
 *           Hörnern packen, in den Wind reden, schwarzmalen · dicke Luft, der
 *           Lichtblick, im Trüben fischen, der Sturm im Wasserglas, eiskalt,
 *           auf Wolke sieben schweben, bei Wind und Wetter, das Eis brechen ·
 *           blaumachen, schwarzfahren, das Gelbe vom Ei, grünes Licht geben,
 *           rotsehen, die weiße Weste, blauäugig, das Salz in der Suppe ·
 *           am Ball bleiben, die Latte hoch legen, ein Eigentor schießen, das
 *           Handtuch werfen, in Führung gehen, die Spielregeln kennen, aus dem
 *           Rennen sein, aus dem gleichen Holz geschnitzt
 *
 * Otuz iki deyim tek ünitede: ezberlemek imkânsız, o yüzden egzersizler
 * ezber değil ÇÖZÜMLEME öğretiyor. Her deyim ailesinin kendi mantığı var —
 * hayvanlar şansı ve aldatmayı, hava ruh hâlini ve ilişki iklimini, renkler
 * kural ihlalini, spor rekabeti ve pes etmeyi taşıyor. Aile bilinince tek tek
 * deyim tahmin edilebilir hâle geliyor.
 *
 * İkinci hat: Türkçe karşılığı olan deyim yanıltıcıdır. "Boğayı boynuzundan
 * tutmak" birebir aynı, "auf den Hund kommen" ise Türkçede hiçbir hayvan
 * taşımaz. Birebir örtüşme beklentisi C1'de en sık yapılan hatadır.
 */
export const c1U09: SkillExercise[] = [
  {
    id: "c1-u09-r1",
    level: "C1",
    skill: "reading",
    unit: 9,
    title: "Warum immer Tiere?",
    genre: "Dergi yazısı",
    intro: "Deyimlerdeki hayvanlar nereden geliyor ve ne taşıyor?",
    gloss: [
      { de: "Schwein gehabt", tr: "şansı yaver gitmiş", en: "got lucky" },
      { de: "die Katze im Sack kaufen", tr: "görmeden almak", en: "to buy a pig in a poke" },
      { de: "einen Bären aufbinden", tr: "kafaya atmak", en: "to pull someone's leg" },
      { de: "auf den Hund kommen", tr: "batmak", en: "to go to the dogs" },
      { de: "den Stier bei den Hörnern packen", tr: "boğayı boynuzundan tutmak", en: "to take the bull by the horns" },
      { de: "Pferde stehlen können", tr: "her işe girişilecek kadar güvenmek", en: "to be up for anything" },
      { de: "in den Wind reden", tr: "boşa konuşmak", en: "to talk to a brick wall" },
    ],
    minutes: 7,
    text:
      "DAS TIER IM SATZ\n\n" +
      "Wer Deutsch lernt, stolpert früh über einen Zoo. Man hat Schwein, kauft die Katze im Sack, bindet jemandem einen Bären auf und kommt am Ende auf den Hund.\n\n" +
      "Die Herkunft ist meist bäuerlich. „Schwein gehabt“ geht auf mittelalterliche Wettkämpfe zurück, bei denen der Letzte ein Ferkel als Trostpreis bekam — ein Verlierer, der trotzdem etwas mitnahm. „Die Katze im Sack kaufen“ stammt aus Zeiten, in denen im Sack ein Ferkel sein sollte und manchmal eine Katze war.\n\n" +
      "Nützlicher als die Herkunft ist die Ordnung. Fast alle Tierbilder lassen sich zwei Feldern zuweisen: Glück und Täuschung. „Schwein gehabt“, „mit ihm kann man Pferde stehlen“ — Glück und Verlässlichkeit. „Einen Bären aufbinden“, „die Katze im Sack“ — Täuschung und Risiko.\n\n" +
      "Wer das Feld erkennt, versteht auch unbekannte Wendungen. „Den Stier bei den Hörnern packen“ gehört in keines der beiden: Es geht um Mut, und genau darum fällt es auf.\n\n" +
      "Ein Wort zur Vorsicht. Manche Bilder existieren in beiden Sprachen und bedeuten dasselbe; andere klingen ähnlich und meinen anderes. Wer „auf den Hund kommen“ wörtlich überträgt, redet in den Wind: Im Deutschen bedeutet es wirtschaftlichen Verfall, nicht Tierliebe.",
    questions: [
      {
        text: "Woher stammt „Schwein gehabt“ laut Text?",
        options: [
          "Aus der Jagd",
          "Aus mittelalterlichen Wettkämpfen mit einem Ferkel als Trostpreis",
          "Aus der Landwirtschaft des 19. Jahrhunderts",
        ],
        answer: 1,
        explain: "„ein Verlierer, der trotzdem etwas mitnahm“ — deyimin mantığı buradan geliyor.",
      },
      {
        kind: "gapfill",
        text: "Wer „auf den Hund kommen“ wörtlich überträgt, redet in den ___.",
        options: [],
        answer: 0,
        accept: ["Wind"],
        explain: "in den Wind reden: boşa konuşmak. Metin kendi uyarısını da bir deyimle veriyor.",
      },
      {
        text: "Welchen zwei Feldern ordnet der Text die meisten Tierbilder zu?",
        options: [
          "Arbeit und Ruhe",
          "Glück und Täuschung",
          "Stadt und Land",
        ],
        answer: 1,
        explain: "„Glück und Verlässlichkeit … Täuschung und Risiko.“",
      },
      {
        kind: "short_answer",
        text: "Warum fällt „den Stier bei den Hörnern packen“ laut Text auf?",
        options: [],
        answer: 0,
        accept: [
          "es gehört in keines der beiden Felder, es geht um Mut",
          "weil es um Mut geht",
          "es passt in keine der zwei Gruppen",
        ],
        explain: "Aile mantığı dışına çıktığı için ayrıca akılda kalıyor.",
      },
      {
        kind: "short_answer",
        text: "Was bedeutet „auf den Hund kommen“ im Deutschen?",
        options: [],
        answer: 0,
        accept: [
          "wirtschaftlichen Verfall",
          "wirtschaftlich absteigen",
          "verarmen, herunterkommen",
        ],
        explain: "„nicht Tierliebe“ — birebir çeviri tam ters yöne götürüyor.",
      },
    ],
  },
  {
    id: "c1-u09-r2",
    level: "C1",
    skill: "reading",
    unit: 9,
    title: "Dicke Luft und grünes Licht",
    genre: "Rehber yazısı",
    intro: "Hava ve renk deyimleri: hangisi ofiste durur, hangisi hukuki sorun?",
    gloss: [
      { de: "dicke Luft", tr: "gergin hava", en: "a tense atmosphere" },
      { de: "der Sturm im Wasserglas", tr: "bardakta fırtına", en: "a storm in a teacup" },
      { de: "das Eis brechen", tr: "buzları eritmek", en: "to break the ice" },
      { de: "grünes Licht geben", tr: "yeşil ışık yakmak", en: "to give the green light" },
      { de: "schwarzfahren", tr: "kaçak binmek", en: "to travel without a ticket" },
      { de: "blaumachen", tr: "işi asmak", en: "to skive off" },
      { de: "die weiße Weste", tr: "sicili temiz", en: "a clean record" },
      { de: "das Gelbe vom Ei", tr: "işin en iyisi", en: "the best of the bunch" },
    ],
    minutes: 7,
    text:
      "WETTER UND FARBEN IM BÜRO\n\n" +
      "Zwei Bildfelder tauchen im Arbeitsalltag ständig auf, und beide muss man verschieden dosieren.\n\n" +
      "Die Wetterbilder beschreiben Stimmung. „Bei uns herrscht dicke Luft“ sagt in drei Wörtern, wofür eine Personalabteilung eine Seite braucht. „Ein Sturm im Wasserglas“ ordnet einen Konflikt ein, ohne ihn zu leugnen. Und „das Eis brechen“ beschreibt eine Handlung, die jeder kennt und niemand benennen kann.\n\n" +
      "Diese Bilder sind gefahrlos. Sie beschreiben Zustände, nicht Personen — und deshalb hält sie jede Sitzung aus.\n\n" +
      "Bei den Farben liegt es anders. „Grünes Licht geben“ ist neutral und in jedem Protokoll zulässig. „Nicht das Gelbe vom Ei“ ist eine milde Kritik an einer Sache. Doch zwei Wendungen aus derselben Familie bezeichnen Rechtsverstöße: „blaumachen“ heißt unentschuldigt fehlen, „schwarzfahren“ ohne Fahrschein fahren.\n\n" +
      "Wer sie scherzhaft über Kollegen verwendet, sollte wissen, was er sagt. „Der hat wohl blaugemacht“ klingt beiläufig und behauptet einen Vertragsbruch. Auch „keine weiße Weste haben“ ist keine Neckerei, sondern der Vorwurf einer Verfehlung.\n\n" +
      "Die Regel ist einfach: Wetter beschreibt Lagen, Farben beschreiben oft Menschen. Über Lagen redet man frei, über Menschen genauer.",
    questions: [
      {
        text: "Warum hält jede Sitzung die Wetterbilder aus?",
        options: [
          "Weil sie freundlich klingen",
          "Weil sie Zustände beschreiben, nicht Personen",
          "Weil sie selten benutzt werden",
        ],
        answer: 1,
        explain: "Durum tarif eden imge kimseyi suçlamıyor.",
      },
      {
        kind: "gapfill",
        text: "Bei uns herrscht ___ Luft.",
        options: [],
        answer: 0,
        accept: ["dicke"],
        explain: "Sıfat deyimin parçası, değiştirilemez.",
      },
      {
        text: "Welche zwei Wendungen bezeichnen laut Text Rechtsverstöße?",
        options: [
          "grünes Licht geben und das Gelbe vom Ei",
          "blaumachen und schwarzfahren",
          "dicke Luft und Sturm im Wasserglas",
        ],
        answer: 1,
        explain: "Biri izinsiz devamsızlık, öteki biletsiz seyahat — ikisi de ihlal.",
      },
      {
        kind: "short_answer",
        text: "Was behauptet „Der hat wohl blaugemacht“ tatsächlich?",
        options: [],
        answer: 0,
        accept: [
          "einen Vertragsbruch",
          "unentschuldigtes Fehlen",
          "dass jemand unentschuldigt gefehlt hat",
        ],
        explain: "„klingt beiläufig und behauptet einen Vertragsbruch“ — hafiflik ile içerik uyuşmuyor.",
      },
      {
        kind: "short_answer",
        text: "Wie lautet die Faustregel am Ende des Textes?",
        options: [],
        answer: 0,
        accept: [
          "Wetter beschreibt Lagen, Farben beschreiben oft Menschen",
          "über Lagen frei, über Menschen genauer",
          "Lagen frei, Menschen genau",
        ],
        explain: "İki aileyi ayıran ölçüt: neyi tarif ettiği.",
      },
    ],
  },
  {
    id: "c1-u09-l1",
    level: "C1",
    skill: "listening",
    unit: 9,
    title: "Am Ball bleiben",
    genre: "Diyalog",
    intro: "Spor deyimleri bir proje konuşmasında. Hangisi neyi söylüyor?",
    gloss: [
      { de: "am Ball bleiben", tr: "peşini bırakmamak", en: "to stay on the ball" },
      { de: "das Handtuch werfen", tr: "havlu atmak", en: "to throw in the towel" },
      { de: "ein Eigentor schießen", tr: "kendi kalesine gol atmak", en: "to score an own goal" },
      { de: "die Latte hoch legen", tr: "çıtayı yükseltmek", en: "to set the bar high" },
      { de: "in Führung gehen", tr: "öne geçmek", en: "to take the lead" },
      { de: "die Spielregeln kennen", tr: "oyunun kurallarını bilmek", en: "to know the rules" },
      { de: "aus dem Rennen sein", tr: "yarış dışı kalmak", en: "to be out of the running" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Nora", text: "Vier Absagen in zwei Wochen. Ich überlege, das Handtuch zu werfen." },
      { speaker: "Ilhan", text: "Bevor du das tust: Wie viele Angebote hast du überhaupt abgegeben?" },
      { speaker: "Nora", text: "Sechs." },
      { speaker: "Ilhan", text: "Dann bist du nicht aus dem Rennen, du hast erst angefangen." },
      { speaker: "Nora", text: "Beim letzten hätte es fast geklappt. Bis ich in der Mail den Preis genannt habe, bevor sie gefragt haben." },
      { speaker: "Ilhan", text: "Das war ein Eigentor, ja. Aber ein lehrreiches." },
      { speaker: "Nora", text: "Ich weiß. Ich kannte die Spielregeln nicht." },
      { speaker: "Ilhan", text: "Die kennt am Anfang niemand. Wichtig ist, dass du am Ball bleibst — sechs Angebote sind keine Statistik." },
      { speaker: "Nora", text: "Und wenn ich die Latte etwas niedriger lege? Kleinere Aufträge zuerst?" },
      { speaker: "Ilhan", text: "Das ist keine Aufgabe, das ist Strategie. Mit drei kleinen Referenzen gehst du beim vierten Angebot in Führung." },
      { speaker: "Nora", text: "Ich habe mit dem Preis wohl wirklich ein Eigentor geschossen." },
      { speaker: "Ilhan", text: "Einmal. Und beim nächsten Mal legst du die Latte da hoch, wo sie hingehört — nach der Frage, nicht davor." },
      { speaker: "Nora", text: "Gut. Dann schreibe ich heute Abend zwei neue." },
    ],
    questions: [
      {
        text: "Was war Noras „Eigentor“?",
        options: [
          "Sie hat zu spät geantwortet.",
          "Sie hat den Preis genannt, bevor danach gefragt wurde.",
          "Sie hat zu wenige Angebote geschickt.",
        ],
        answer: 1,
        explain: "Kendi kalesine gol: kendi elleriyle pozisyonunu bozmak.",
      },
      {
        kind: "gapfill",
        text: "Wichtig ist, dass du am ___ bleibst.",
        options: [],
        answer: 0,
        accept: ["Ball"],
        explain: "am Ball bleiben: peşini bırakmamak. Edat ve artikel sabit.",
      },
      {
        text: "Wie bewertet Ilhan den Vorschlag, kleinere Aufträge zu nehmen?",
        options: [
          "Als Aufgeben",
          "Als Strategie",
          "Als Zeitverlust",
        ],
        answer: 1,
        explain: "„Das ist keine Aufgabe, das ist Strategie.“ Çıtayı indirmek pes etmek değil.",
      },
      {
        kind: "dictation",
        text: "Ilhan'ın altı teklifin istatistik olmadığını söylediği cümleyi yaz.",
        options: [],
        answer: 0,
        accept: [
          "sechs Angebote sind keine Statistik",
          "Sechs Angebote sind keine Statistik.",
        ],
        explain: "Sayı azken sonuç çıkarmamak — deyimin taşıdığı asıl öğüt.",
      },
    ],
  },
  {
    id: "c1-u09-l2",
    level: "C1",
    skill: "listening",
    unit: 9,
    title: "Wörtlich genommen",
    genre: "Diyalog",
    intro: "Deyimler birebir çevrilince ne oluyor? İki dil arasında bir yanlış anlama.",
    gloss: [
      { de: "einen Bären aufbinden", tr: "kafaya atmak", en: "to pull someone's leg" },
      { de: "im Trüben fischen", tr: "bulanık suda balık avlamak", en: "to fish in troubled waters" },
      { de: "auf Wolke sieben schweben", tr: "bulutların üstünde olmak", en: "to be on cloud nine" },
      { de: "eiskalt", tr: "buz gibi, acımasız", en: "ice-cold" },
      { de: "blauäugig", tr: "saf", en: "naive" },
      { de: "der Lichtblick", tr: "umut ışığı", en: "ray of hope" },
      { de: "schwarzmalen", tr: "karamsarlık yaymak", en: "to paint a bleak picture" },
    ],
    minutes: 5,
    segments: [
      { speaker: "Meral", text: "Ich habe im Meeting gesagt, ich schwebe auf Wolke sieben. Alle haben gelacht." },
      { speaker: "Bernd", text: "Weil das Verliebtsein heißt. Über ein Quartalsergebnis sagt man das nicht." },
      { speaker: "Meral", text: "Im Türkischen kann man das breiter verwenden." },
      { speaker: "Bernd", text: "Das ist der Punkt. Bilder decken sich fast nie ganz. Manche gar nicht." },
      { speaker: "Meral", text: "Zum Beispiel?" },
      { speaker: "Bernd", text: "„Blauäugig“. Klingt harmlos, heißt aber naiv bis fahrlässig. Wenn du das über einen Kollegen sagst, ist das kein Kompliment." },
      { speaker: "Meral", text: "Und „im Trüben fischen“?" },
      { speaker: "Bernd", text: "Zweideutig. Es kann heißen: ohne Daten arbeiten. Es kann aber auch heißen: absichtlich in einer unklaren Lage Vorteile suchen." },
      { speaker: "Meral", text: "Jemand hat mir gesagt, „einen Bären aufbinden“ heiße jemanden loben. Stimmt das?" },
      { speaker: "Bernd", text: "Nein, das Gegenteil: jemandem etwas Unwahres erzählen. Da hat man dir gerade selbst einen aufgebunden." },
      { speaker: "Meral", text: "Und wenn ich jemandem vorwerfe, er würde schwarzmalen?" },
      { speaker: "Bernd", text: "Das geht, solange es die Lage meint. Über einen Menschen gesagt ist es eiskalt — und ein Lichtblick klingt daneben schnell wie Spott." },
      { speaker: "Meral", text: "Also gefährlich." },
      { speaker: "Bernd", text: "Nur wenn du es über Personen sagst. Über eine Lage geht es." },
      { speaker: "Meral", text: "Ich merke: Bei Redewendungen ist die Frage nicht, was sie heißen, sondern über wen ich sie sage." },
      { speaker: "Bernd", text: "Genau. Und im Zweifel eine weniger. Ein schlecht gesetztes Bild wirkt länger nach als ein fehlendes." },
    ],
    questions: [
      {
        text: "Warum haben alle gelacht?",
        options: [
          "Weil die Redewendung falsch gebildet war",
          "Weil sie Verliebtsein bedeutet",
          "Weil Meral sie zu leise sagte",
        ],
        answer: 1,
        explain: "„Über ein Quartalsergebnis sagt man das nicht.“ Deyim doğru ama alanı dar.",
      },
      {
        kind: "gapfill",
        text: "„Blauäugig“ klingt harmlos, heißt aber ___ bis fahrlässig.",
        options: [],
        answer: 0,
        accept: ["naiv"],
        explain: "Türkçedeki „saf“ kadar yumuşak değil; ihmal suçlamasına yaklaşıyor.",
      },
      {
        text: "Wann ist „im Trüben fischen“ laut Bernd gefährlich?",
        options: [
          "Immer",
          "Wenn man es über Personen sagt",
          "Nur schriftlich",
        ],
        answer: 1,
        explain: "„Über eine Lage geht es.“ Kişiye söylenince kötü niyet iması taşıyor.",
      },
      {
        kind: "short_answer",
        text: "Zu welchem Schluss kommt Meral am Ende?",
        options: [],
        answer: 0,
        accept: [
          "die Frage ist nicht, was sie heißen, sondern über wen sie gesagt werden",
          "über wen ich sie sage",
          "nicht die Bedeutung, sondern das Ziel entscheidet",
        ],
        explain: "Ve Bernd ekliyor: „Ein schlecht gesetztes Bild wirkt länger nach als ein fehlendes.“",
      },
    ],
  },
  {
    id: "c1-u09-w1",
    level: "C1",
    skill: "writing",
    unit: 9,
    title: "Deyimin sabit parçaları",
    genre: "Dil bilgisi",
    intro: "Deyimde artikel, edat ve sıfat çekimi donmuştur — tek harf değişince bozulur.",
    gloss: [
      { de: "den Stier bei den Hörnern packen", tr: "boğayı boynuzundan tutmak", en: "to take the bull by the horns" },
      { de: "grünes Licht geben", tr: "yeşil ışık yakmak", en: "to give the green light" },
      { de: "das Handtuch werfen", tr: "havlu atmak", en: "to throw in the towel" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "build",
        tr: "Boğayı boynuzundan tuttuk.",
        answer: "Wir haben den Stier bei den Hörnern gepackt",
        hint: "bei den Hörnern: edat ve çoğul artikel sabit.",
      },
      {
        kind: "build",
        tr: "Yönetim projeye yeşil ışık yaktı.",
        answer: "Die Leitung hat dem Projekt grünes Licht gegeben",
        hint: "Yeşil ışık verilen taraf yönelme hâlinde; sıfat artikelsiz çekiliyor.",
      },
      {
        kind: "build",
        tr: "Üçüncü denemeden sonra havlu attı.",
        answer: "Nach dem dritten Versuch hat sie das Handtuch geworfen",
        hint: "das Handtuch: artikel deyimin parçası, çıkarılamaz.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: deyimin sabit parçası değiştirilmiş.",
        source: "Wir haben den Stier bei seinen Hörnern gepackt.",
        answer: "Wir haben den Stier bei den Hörnern gepackt.",
        alternatives: ["Wir haben den Stier bei den Hörnern gepackt"],
        why: "Deyimdeki artikel dilbilgisel bir seçim değil, kalıbın parçasıdır. „seinen“ mantıklı görünür ama deyimi bozar ve cümle anadili konuşana yabancı gelir — C1'de ölçülen tam bu duyarlılıktır.",
      },
    ],
  },
  {
    id: "c1-u09-w2",
    level: "C1",
    skill: "writing",
    unit: 9,
    title: "Ein Bericht ohne schiefe Bilder",
    genre: "Kurum yazısı",
    intro: "Deyim kullan ama yerinde: durumu tarif et, kişiyi suçlama.",
    gloss: [
      { de: "dicke Luft", tr: "gergin hava", en: "tense atmosphere" },
      { de: "der Sturm im Wasserglas", tr: "bardakta fırtına", en: "a storm in a teacup" },
      { de: "das Eis brechen", tr: "buzları eritmek", en: "to break the ice" },
      { de: "im Trüben fischen", tr: "bulanık suda balık avlamak", en: "to fish in troubled waters" },
      { de: "der Lichtblick", tr: "umut ışığı", en: "ray of hope" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "reply",
        prompt:
          "Aşağıdaki durumu bir ekip raporunda anlat. En az üç deyim kullan — ama kuralı tut: durumu tarif eden deyimler serbest, kişi hakkında olanlar yasak. Suçlama yapma, olguyu ve önerini yaz.",
        stimulus:
          "DURUM — İki ekip arasında altı haftadır süren gerginlik\n\n" +
          "— Ortak proje: veri aktarımı, teslim iki kez ertelendi\n" +
          "— Toplantılarda karşılıklı iğneleme, ortak toplantı sayısı 6'dan 2'ye düştü\n" +
          "— Asıl anlaşmazlık teknik değil: kimin hangi karara yetkili olduğu belirsiz\n" +
          "— Geçen hafta iki geliştirici kendiliğinden birlikte öğle yemeği yedi, sonrasında iki gün sorunsuz geçti\n" +
          "— Öneri: yetki tablosu ve haftada bir kısa ortak durum toplantısı",
        checklist: [
          "En az üç deyim var mı?",
          "Deyimler durumu mu tarif ediyor (kişiyi değil)?",
          "Asıl anlaşmazlık doğru adlandırıldı mı?",
          "Somut bir öneri var mı?",
        ],
        minWords: 90,
        phrases: [
          { de: "Zwischen den Teams herrscht seit Wochen dicke Luft.", tr: "ekipler arasında haftalardır gergin bir hava var", en: "there has been a tense atmosphere between the teams" },
          { de: "Das ist kein Sturm im Wasserglas.", tr: "bu bardakta fırtına değil", en: "this is not a storm in a teacup" },
          { de: "Solange die Zuständigkeit unklar ist, fischen alle im Trüben.", tr: "yetki belirsiz kaldıkça herkes bulanık suda balık avlıyor", en: "as long as responsibility is unclear, everyone is fishing in troubled waters" },
        ],
        sample:
          "Zwischen den beiden Teams herrscht seit gut sechs Wochen dicke Luft. Die gemeinsamen Termine sind von sechs auf zwei gesunken, die Übergabe wurde zweimal verschoben.\n\n" +
          "Das ist kein Sturm im Wasserglas. Es wäre aber falsch, die Ursache im Technischen zu suchen: Die Schnittstelle funktioniert. Strittig ist, wer welche Entscheidung treffen darf. Solange das unklar bleibt, fischen beide Seiten im Trüben — jede Freigabe kann von der anderen kassiert werden, und das erklärt den Ton in den Sitzungen besser als jede Charakterfrage.\n\n" +
          "Ein Lichtblick: Vergangene Woche haben zwei Entwickler von sich aus zusammen Mittag gegessen. Die beiden Tage danach liefen ohne Eskalation. Das Eis lässt sich also brechen, es braucht nur einen Anlass.\n\n" +
          "Vorschlag: eine einseitige Zuständigkeitstabelle, abgestimmt bis Freitag, und ein wöchentlicher Kurztermin von fünfzehn Minuten. Beides kostet wenig und nimmt der Lage genau das, was sie am Leben hält.",
      },
    ],
  },
];
