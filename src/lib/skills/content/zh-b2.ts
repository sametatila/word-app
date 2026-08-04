import type { SkillExercise } from "../types";

/**
 * B2 — Zürih kursu (gsw-zh) okuma, dinleme ve yazma egzersizleri.
 * Tüm lehçe metinler data/zurich/style-guide.md kurallarına göre Züritüütsch
 * yazılır; yönergeler ve açıklamalar Türkçe. gloss.de alanı lehçedeki biçimi taşır.
 */
export const zhB2: SkillExercise[] = [
  // ---------------------------------------------------------------- OKUMA
  {
    id: "zh-b2-r1",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "Wonigsnoot z Züri: Wär cha sich d Stadt na läischte?",
    genre: "Köşe yazısı",
    intro:
      "Zürih'teki konut sıkıntısı üzerine bir köşe yazısı okuyacaksın; yazarın önerilerine ve tutumuna dikkat et.",
    minutes: 6,
    gloss: [
      { de: "d Wonigsnoot", tr: "konut sıkıntısı" },
      { de: "s Inserat", tr: "ilan" },
      { de: "d Bsichtigung", tr: "daireyi gezip görme" },
      { de: "d Läärwonigsziffere", tr: "boş konut oranı" },
      { de: "sich öppis läischte", tr: "bir şeyi (maddi olarak) karşılayabilmek" },
      { de: "d Gnosseschaft", tr: "(konut) kooperatifi" },
      { de: "de Mietzins", tr: "kira bedeli (İsviçre'de yaygın terim)" },
      { de: "d Wartelischte", tr: "bekleme listesi" },
      { de: "gmäinnützig", tr: "kâr amacı gütmeyen" },
      { de: "de Verluscht", tr: "kayıp" },
    ],
    text:
      "Wär hüt z Züri e Wonig suecht, bruucht starchi Närve: Uf jedes Inserat mälded sich hunderti vo Lüüt, und bi de Bsichtigunge schtaat mer i de Schlange bis uf d Straass. D Läärwonigsziffere liit siit Jaare under äim Prozänt – so tüüf wie i kän andere Schwiizer Stadt.\n\nD Gründ sind bekannt: D Stadt wachst, aber baue tuet mer z wenig. Und wänn öppis Neus baut wird, sind s mäischtens tüüri Wonige, wo sich normali Familie nöd chönd läischte. Wär e alti, günschtigi Wonig hät, git si nüme her – au wänn d Chind scho lang uszoge sind. Das nännt mer de Lock-in-Effäkt: D Lüüt bliibed sitze, wil alles andere tüürer wär.\n\nEn Liechtblick sind d Gnosseschafte. Rund en Viertel vo de Züriwonige ghöört ene – und dört isch de Mietzins im Schnitt fascht d Hälfti günschtiger als uf em freie Markt. Aber d Wartelischte sind lang, und wär nöd scho lang z Züri wont, hät chuum e Chance.\n\nWas also tue? Nu jammere bringt nüüt. D Stadt mues meh Land für de gmäinnützig Wonigsbau zur Verfüegig schtele, und d Gnosseschafte müend schneller baue chöne. Susch wird Züri e Stadt, wo sich am Änd nu na Guetverdiener chönd läischte – und das wär für alli en Verluscht.",
    questions: [
      {
        text: "Weli Haltig hät de Autor insgesamt?",
        options: [
          "Züri söll ufhööre z wachse, dänn löst sich s Problem vo sälber.",
          "D Stadt mues aktiv öppis mache, susch wird Züri e Stadt nu für Guetverdiener.",
          "D Wonigsnoot isch scho glöst, wil d Gnosseschafte gnueg baued.",
        ],
        answer: 1,
        explain:
          "Son paragrafta yazar „Nu jammere bringt nüüt“ deyip somut talepler sıralıyor: şehir arsa ayırmalı, kooperatifler daha hızlı inşa edebilmeli. Yoksa Zürih yalnız yüksek gelirlilerin şehri olur.",
      },
      {
        text: "Warum gänd vil Lüüt iri alti, günschtigi Wonig nüme her?",
        options: [
          "Wil alles andere tüürer wär.",
          "Wil d Chind na dihäi woned.",
          "Wil d Stadt s Zügle verbote hät.",
        ],
        answer: 0,
        explain:
          "Metin bunu „Lock-in-Effäkt“ diye adlandırıyor: insanlar oturmaya devam ediyor, çünkü başka her seçenek daha pahalı olurdu — çocuklar çoktan evden ayrılmış olsa bile.",
      },
      {
        text: "Richtig oder falsch? Bi de Gnosseschafte isch de Mietzins im Schnitt fascht d Hälfti günschtiger als uf em freie Markt.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Doğru: Üçüncü paragrafta „dört isch de Mietzins im Schnitt fascht d Hälfti günschtiger als uf em freie Markt“ yazıyor.",
      },
      {
        text: "Was isch s Problem bi de Gnosseschafte?",
        options: [
          "D Wartelischte sind lang.",
          "Si baued nu tüüri Luxuswonige.",
          "Si ghööred nöd zu de Stadt Züri.",
        ],
        answer: 0,
        explain:
          "„Aber d Wartelischte sind lang“ — bekleme listeleri uzun; üstelik uzun süredir Zürih'te oturmayanların şansı neredeyse yok.",
      },
      {
        text: "Richtig oder falsch? D Läärwonigsziffere z Züri liit über äim Prozänt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: İlk paragrafa göre oran yıllardır yüzde birin ALTINDA („under äim Prozänt“) — hem de İsviçre'nin başka hiçbir şehrinde olmadığı kadar düşük.",
      },
    ],
  },
  {
    id: "zh-b2-r2",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "Bewärbe uf Schwiizerisch: Was bi eus anderscht lauft",
    genre: "Rehber",
    intro:
      "İsviçre'de iş başvurusu ve mülakat kültürünü anlatan bir rehber metni okuyacaksın; kültürel farklara dikkat et.",
    minutes: 5,
    gloss: [
      { de: "sich bewärbe", tr: "başvurmak" },
      { de: "s Bewärbigsdossier", tr: "başvuru dosyası" },
      { de: "s Zügnis", tr: "bonservis, çalışma belgesi" },
      { de: "d Pünktlichkäit", tr: "dakiklik" },
      { de: "ufträäge", tr: "abartmak, şişirmek" },
      { de: "de Aagäber", tr: "kendini beğenmiş, hava atan kişi" },
      { de: "d Bschäidehäit", tr: "alçakgönüllülük" },
      { de: "häikel", tr: "hassas, nazik (konu)" },
      { de: "de Iidruck", tr: "izlenim" },
      { de: "de Entschäid", tr: "karar" },
    ],
    text:
      "Wär us em Usland i d Schwiiz chunt und sich do bewirbt, merkt schnäll: Es lauft äiniges anderscht. S fangt scho bim Dossier aa. I de Schwiiz erwartet mer es vollschtändigs Bewärbigsdossier mit Läbeslauf, Zügnis und Diplom – alles suuber zämegschtelt. Wär nu schnäll es Mail mit äim Satz schickt, hät chuum e Chance.\n\nBim Gsprööch sälber gilt: Pünktlichkäit isch s A und O. Wär z spaat chunt, mues scho fascht nüme cho. Am beschte isch mer zää Minute vorhär dört. Au wichtig: nöd z fescht ufträäge. D Schwiizer mööged käi Aagäber – wär z grooss vo sich sälber redt, wirkt schnäll unsympathisch. Bschäidehäit chunt besser aa als groossi Wort.\n\nEs häikligs Thema isch d Spraach. I vilne Firme wird im Alltag Mundart gredt. Als Bewärber mues mer käi Züritüütsch chöne – aber es macht en guete Iidruck, wänn mer zäigt, dass mer d Lüüt verschtaat oder s wenigschtens lehre wott. Vili Chefs lueged gnau druf, öb öpper sich integriere wott.\n\nUnd nach em Gsprööch? En churze Dankesbrief oder es Mail isch nöd Pflicht, aber gärn gsee. Und dänn häisst s: warte. D Schwiizer Firme lönd sich Ziit mit em Entschäid – das isch käis schlächts Zäiche, sondern ganz normal.",
    questions: [
      {
        text: "Was erwartet mer i de Schwiiz vo eme Bewärbigsdossier?",
        options: [
          "Es mues vollschtändig sii: Läbeslauf, Zügnis und Diplom, suuber zämegschtelt.",
          "Es churzes Mail mit äim Satz längt vollkome.",
          "Nu s Diplom zelt, de Räscht interessiert niemert.",
        ],
        answer: 0,
        explain:
          "İlk paragraf: „es vollschtändigs Bewärbigsdossier mit Läbeslauf, Zügnis und Diplom – alles suuber zämegschtelt“. Tek cümlelik bir e-postayla şans neredeyse sıfır.",
      },
      {
        text: "Warum söll mer im Gsprööch nöd z grooss vo sich sälber rede?",
        options: [
          "Wil d Schwiizer käi Aagäber mööged und das unsympathisch wirkt.",
          "Wil mer dänn z vil Ziit verlüürt.",
          "Wil de Chef susch z vil Frage schtelt.",
        ],
        answer: 0,
        explain:
          "İkinci paragraf: „D Schwiizer mööged käi Aagäber“ — kendini fazla öven aday sevimsiz görünür; alçakgönüllülük büyük laflardan daha iyi karşılanır.",
      },
      {
        text: "Richtig oder falsch? Als Bewärber mues mer zwingend Züritüütsch chöne.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Als Bewärber mues mer käi Züritüütsch chöne“ — ama lehçeyi anladığını ya da öğrenmek istediğini göstermek iyi izlenim bırakır.",
      },
      {
        text: "Was empfilt de Tekscht für nach em Gsprööch?",
        options: [
          "En churze Dankesbrief oder es Mail schicke – und dänn geduldig warte.",
          "Jede Tag aalüüte und nach em Entschäid frage.",
          "Sofort es neus Dossier a di gliich Firma schicke.",
        ],
        answer: 0,
        explain:
          "Son paragraf: teşekkür yazısı zorunlu değil ama hoş karşılanır („gärn gsee“); sonrası beklemek — İsviçre firmalarının kararı geciktirmesi kötüye işaret değil.",
      },
      {
        text: "Richtig oder falsch? Wänn e Firma lang für de Entschäid bruucht, isch das es schlächts Zäiche.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: Metnin son cümlesi bunun „käis schlächts Zäiche, sondern ganz normal“ olduğunu söylüyor.",
      },
    ],
  },
  // ---------------------------------------------------------------- DİNLEME
  {
    id: "zh-b2-r3",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "Lehr oder Gymi? De Schwiizer Sunderwäg",
    genre: "Analiz",
    intro:
      "İsviçre eğitim sisteminin en yabancı gelen yanı: çıraklık. Bu analiz yazısını okuyacaksın.",
    gloss: [
      { de: "d Lehr", tr: "çıraklık eğitimi (Berufslehre)" },
      { de: "s Gymi", tr: "lise (Gymnasium)" },
      { de: "de Betrieb", tr: "işletme, firma" },
      { de: "d Berüefsschuel", tr: "meslek okulu" },
      { de: "de Abschluss", tr: "mezuniyet, diploma" },
      { de: "d Durchlässigkäit", tr: "geçişkenlik (sistemler arası)" },
      { de: "de Sackgass", tr: "çıkmaz sokak" },
      { de: "d Quote", tr: "oran" },
      { de: "s Vorurtäil", tr: "önyargı" },
    ],
    minutes: 7,
    text:
      "Wär us em Uusland chunt, verstaat s zerscht nöd: Nume öppe zwänzg Prozänt vo de Jugendliche im Kanton Züri gönd is Gymi. Di andere mached e Lehr — drei bis vier Jaar im Betrieb, dezue äi bis zwäi Täg Berüefsschuel i de Wuche. Und das isch käi Nootlösig, sondern de normal Wäg.\n\nFür vill Uusländer tönt das nach eme Abschtiig. I de Schwiiz isch es s Gägetäil: E Lehr als Polymechaniker oder Informatiker isch aagseh, und wär früeh im Betrieb schafft, verdient früeh äiges Gäld. D Jugendarbetslosigkäit isch bi eus tüüf — genau wil d Lüüt scho während de Uusbildig im Arbetsmarkt drin sind.\n\nS entschäidende Argumänt heisst aber Durchlässigkäit. E Lehr isch käi Sackgass. Mit ere Berüefsmatur chunt me a d Fachhochschuel, und vo dört wiiter a d Uni. Es git Chefärzt und Profässore, wo mit ere Lehr aagfange händ. De Wäg duuret lenger — aber er isch offe.\n\nKritik git s trotzdem. Erschtens hänged d Chance stark vo de Familie ab: Chind vo Akademiker gönd deutlich hüüfiger is Gymi, au bi gliiche Note. Zwäitens händ Jugendlichi mit uusländischem Name messbar meh Müe, e Lehrstell z finde — glichi Bewärbig, anderi Quote. Und dritens klaged d Betriib, si fänded für gwüssi Berüef fascht niemert meh.\n\nD Antwort vo de Bildigsdiräktion isch bis jetz zruckhaltend: Me setzt uf Information statt uf Vorschrifte. Öb das gnueg isch, wird di nächscht Generation zäige.",
    questions: [
      {
        text: "Was isch im Kanton Züri de normal Wäg nach de Schuel?",
        options: ["E Lehr", "S Gymi", "E Fachhochschuel"],
        answer: 0,
        explain: "Sadece %20'si liseye gidiyor; çoğunluk çıraklık yapıyor ve bu normal yol.",
      },
      {
        text: "Warum isch d Jugendarbetslosigkäit tüüf, laut Text?",
        options: [
          "Well d Jugendlichi scho während de Uusbildig im Arbetsmarkt sind",
          "Well s wenig Jugendlichi git",
          "Well s Gymi z schwer isch",
        ],
        answer: 0,
        explain:
          "Metin bunu doğrudan bağlıyor: eğitim sırasında zaten iş piyasasının içindeler.",
      },
      {
        text: "Was meint de Text mit „Durchlässigkäit“?",
        options: [
          "Dass me mit ere Lehr spöter au a d Uni cha",
          "Dass me d Lehr abbräche cha",
          "Dass d Betriib d Lehrling wächsle chönd",
        ],
        answer: 0,
        explain:
          "Berufsmatura → Fachhochschule → üniversite: yol daha uzun ama kapalı değil.",
      },
      {
        text: "Welli Kritik nennt de Text zerscht?",
        options: [
          "D Chance hänged stark vo de Familie ab",
          "D Lehr duuret z lang",
          "S Gymi isch z tüür",
        ],
        answer: 0,
        explain:
          "Aynı notlarla bile akademisyen çocukları belirgin biçimde daha sık liseye gidiyor.",
      },
      {
        text: "Wie reagiert d Bildigsdiräktion?",
        options: [
          "Zruckhaltend — mit Information statt Vorschrifte",
          "Mit ere nöie Quote für Lehrstelle",
          "Si bestriitet d Zaale",
        ],
        answer: 0,
        explain: "„Me setzt uf Information statt uf Vorschrifte“ — temkinli bir yanıt.",
      },
    ],
  },
  {
    id: "zh-b2-r4",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "Milizsystem: Wär macht eigentlich Politik?",
    genre: "Açıklayıcı yazı",
    intro:
      "İsviçre siyasetinin temel taşı olan 'milis sistemi' üzerine bir yazı okuyacaksın.",
    gloss: [
      { de: "s Milizsystem", tr: "yarı zamanlı gönüllü görev sistemi" },
      { de: "s Amt", tr: "görev, makam" },
      { de: "näbebruefliech", tr: "asıl işin yanında" },
      { de: "de Gmeinderaat", tr: "belediye meclisi" },
      { de: "d Entschädigung", tr: "huzur hakkı, tazminat" },
      { de: "d Belaschtig", tr: "yük" },
      { de: "de Nochwuchs", tr: "yeni nesil, aday bulma" },
      { de: "d Verwaltig", tr: "idare" },
    ],
    minutes: 7,
    text:
      "I de mäischte Länder isch Politik en Bruef. I de Schwiiz isch si — offiziell — es Näbeamt. De Gmeinderaat vo de mäischte Gmeinde tagt am Aabig, d Mitglieder händ tagsüber en normale Job, und d Entschädigung dekt knapp de Uufwand. Das heisst Milizsystem.\n\nD Idee dehinter isch alt und äifach: Wär Politik macht, söll im gliiche Läbe schtaa wie di, wo er vertritt. En Lehrer, e Wirtin und en Buur entschäided anderscht als drei Berüefspolitiker. Und wil s Amt zitlich begränzt isch, chunt me gar nöd i Versuechig, s ganze Läbe druff uufzboue.\n\nDoch s System chunt a d Gränze. D Dossiers sind komplizierter worde: Baurächt, Datenschutz, Finanze. Wär näbebruefliech drüü Stund im Monet hät, list nöd zweihundert Siite. D Folg: D Verwaltig — also di feschtaagstellte Fachlüüt — bereitet alles vor, und s Parlamänt nickt ab. Wär entschäidet denn würkli?\n\nDezue chunt s Nochwuchsproblem. Immer meh chliini Gmeinde findet für ihri Ämter niemert meh. Junge Familie mit zwäi Job händ am Aabig käi Ziit, und wer sälbständig isch, cha sich s Amt schlicht nöd läischte.\n\nEs git zwäi Antworte. Di äi säit: Mir müend d Ämter professionalisiere und aaständig zaale. Di ander wehrt sich genau degäge — dänn verlüürt s System sin Sinn. Wahrschiinlich chunt s uf öppis derzwüsche uus: bessri Entschädigung, meh Unterschtützig, aber s Amt bliibt es Näbeamt.",
    questions: [
      {
        text: "Was heisst Milizsystem?",
        options: [
          "Politik als Näbeamt näbem normale Bruef",
          "Es System mit Berüefspolitiker",
          "Politik nume für Riichi",
        ],
        answer: 0,
        explain:
          "Meclis akşam toplanır, üyelerin gündüz normal işleri vardır, ödeme masrafı ancak karşılar.",
      },
      {
        text: "Was isch d Idee dehinter?",
        options: [
          "Politiker söled im gliiche Läbe schtaa wie d Bevölkerig",
          "Politik söll billig sii",
          "Ämter söled schnäll wächsle",
        ],
        answer: 0,
        explain: "Bir öğretmen, bir lokantacı ve bir çiftçi, üç profesyonel siyasetçiden farklı karar verir.",
      },
      {
        text: "Welles Problem entschtaat wäge de komplizierte Dossiers?",
        options: [
          "D Verwaltig bereitet alles vor und s Parlamänt nickt ab",
          "D Sitzige duured z lang",
          "D Gmeinde händ z vill Gäld",
        ],
        answer: 0,
        explain:
          "Ayda üç saati olan biri iki yüz sayfa okuyamaz; asıl hazırlık idarede kalıyor.",
      },
      {
        text: "Warum findet me schwiirig Nochwuchs?",
        options: [
          "Junge Familie und Sälbständigi händ käi Ziit oder chönd s nöd zaale",
          "D Lüüt intressiered sich nöd für Politik",
          "D Ämter sind abgschafft worde",
        ],
        answer: 0,
        explain: "İki işli genç aileler ve serbest çalışanlar bu görevi üstlenemiyor.",
      },
      {
        text: "Was erwartet de Text als Lösig?",
        options: [
          "Öppis derzwüsche: bessri Entschädigung, aber s Amt bliibt es Näbeamt",
          "Volli Professionalisierig",
          "Abschaffig vom Gmeinderaat",
        ],
        answer: 0,
        explain: "Son cümle iki uç arasında bir orta yol öngörüyor.",
      },
    ],
  },
  {
    id: "zh-b2-r5",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "D Stadt wachst — und denn?",
    genre: "Haber analizi",
    intro:
      "Zürih'in nüfus artışını ve sonuçlarını sayılarla ele alan bir haber analizini okuyacaksın.",
    gloss: [
      { de: "s Wachstum", tr: "büyüme" },
      { de: "d Prognose", tr: "öngörü" },
      { de: "de Zuezug", tr: "göç, gelenler" },
      { de: "verdichte", tr: "yoğunlaştırmak (inşaat)" },
      { de: "d Iischtufig", tr: "kademelendirme, sınıflandırma" },
      { de: "d Infrastruktur", tr: "altyapı" },
      { de: "de Druck", tr: "baskı" },
      { de: "d Massnaam", tr: "önlem" },
    ],
    minutes: 7,
    text:
      "D Stadt Züri wachst wiiter: Ändi letscht Jaar händ da vierehundertdriissgtuusig Lüüt gwohnt, öppe zwölftuusig meh als vor füf Jaar. D Prognose vom Statistische Amt gaat bis zwäitusigvierzg vo öppe füfhunderttuusig uus.\n\nInteressant isch, wohär s Wachstum chunt. Nöd primär vom Zuezug us em Uusland — de isch siit Jaare stabil. Es lit vor allem dra, dass d Lüüt lenger dableibed und weniger uf s Land use zügled. Und dass pro Person meh Wonflächi bruucht wird: hüt öppe fufezwänzg Quadratmeter, vor drissg Jaar warens no zwänzg.\n\nGenau das isch de Chnackpunkt. Me cha nöd gliichziitig meh Lüüt in d Stadt laa und meh Platz pro Person haa, ohni z verdichte. D Stadt bout drum in d Höchi und ersetzt alti Sidlige. Nume: Wo nöi bout wird, staat d Miete am Schluss hööcher — und di alte Bewohner findet sich im nöie Huus nüme.\n\nUnder Druck chunt au d Infrastruktur. Schuelhüüser sind s dringendschte Thema: Sibe nöii bruucht d Stadt bis zwäituusigfüfedrissg, und Bouland hät si fascht käis meh. S Tramnetz isch vo de Kapazität her a de Gränze, obwohl d Stadt scho hüt äini vo de höchschte ÖV-Quote vo Europa hät.\n\nD Massnaame sind bekannt und umstritte: meh gmeinnützige Wonigsbou, höcheri Uusnützig, Tempo dreissg für weniger Lärm. Käini devo löst s Problem elleige. Aber d Alternative — nöd wachse — cha e Stadt nöd beschliesse.",
    questions: [
      {
        text: "Wohär chunt s Wachstum vor allem?",
        options: [
          "D Lüüt bliibed lenger und bruuched meh Flächi pro Person",
          "Vom Zuezug us em Uusland",
          "Vo meh Geburte",
        ],
        answer: 0,
        explain:
          "Yurt dışından göç yıllardır sabit; insanlar daha uzun kalıyor ve kişi başı alan artıyor.",
      },
      {
        text: "Wie vill Wonflächi bruucht hüt e Person?",
        options: ["Öppe 45 m²", "Öppe 20 m²", "Öppe 25 m²"],
        answer: 2,
        explain: "„hüt öppe fufezwänzg Quadratmeter“ = 25 m²; otuz yıl önce 20 m² idi.",
      },
      {
        text: "Was isch de Näbeeffekt vom Verdichte?",
        options: [
          "D Miete schtiiged und alti Bewohner müend zügle",
          "S git weniger Wonige",
          "D Hüüser wärded chliiner",
        ],
        answer: 0,
        explain: "Yeni yapılan yerde kira sonuçta yükseliyor, eski sakinler orada kalamıyor.",
      },
      {
        text: "Welles Infrastrukturthema isch am dringendschte?",
        options: ["Schuelhüüser", "Spitäler", "Strasse"],
        answer: 0,
        explain: "2035'e kadar yedi yeni okul binası gerekiyor ve arsa neredeyse kalmadı.",
      },
      {
        text: "Wie beurtäilt de Text d Massnaame?",
        options: [
          "Käini löst s Problem elleige, aber Nöd-Wachse isch käi Option",
          "Si sind alli wirkigslos",
          "Si löset s Problem vollständig",
        ],
        answer: 0,
        explain: "Son paragraf: tek başına hiçbiri çözmüyor, ama büyümemeye karar verilemez.",
      },
    ],
  },
  {
    id: "zh-b2-r6",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "Zwäi Läserbrief: Sunntigsverchauf",
    genre: "Okur mektupları",
    intro:
      "Aynı konuda karşıt iki okur mektubu okuyacaksın: pazar günleri mağazalar açık olmalı mı?",
    gloss: [
      { de: "de Sunntigsverchauf", tr: "pazar günü satış" },
      { de: "s Personal", tr: "personel" },
      { de: "de Umsatz", tr: "ciro" },
      { de: "freiwillig", tr: "gönüllü" },
      { de: "de Druck", tr: "baskı" },
      { de: "d Ruumaziit", tr: "dinlenme zamanı" },
      { de: "verbüüte", tr: "yasaklamak" },
      { de: "de Zueschlag", tr: "ek ücret, zam" },
    ],
    minutes: 6,
    text:
      "PRO — Vreni Iseli, Züri-Oerlike\n\nMir läbed nüme im Jaar nüünzähundertsibzg. Wär hüt zwäi Job hät oder Schicht schafft, chunt under de Wuche schlicht nöd zum Iichaufe. De Sunntig isch für die Lüüt de äinzig Tag, wo s gaat.\n\nUnd redemer ehrlich: Online chunt s Paket au am Sunntig. Mir verbüüted em chliine Lade vor Ort genau das, wo de grooss Konzern im Netz sowiso macht. Das isch nöd Schutz vom Personal, das isch Schutz vor de Konkurränz — und am Schluss verlüüred üsi Quartierläde.\n\nWär am Sunntig nöd schaffe wott, mues nöd. Aber verbüüte söll me s au niemertem.\n\nKONTRA — Beat Hofstetter, Züri-Affoltere\n\nD Frau Iseli redt vo Freiwilligkäit. Ich han zwölf Jaar im Verchauf gschafft und cha Ine säge: Freiwillig isch das nie. Wär de Sunntig ablehnt, überchunt s nächscht Jaar en schlächtere Plan und weniger Stunde. Niemert schriibt das ufe — aber alli wüssed s.\n\nZum Umsatz: D Studie zäiged, dass d Lüüt nöd meh chaufed, si chaufed nume anderscht verteilt. De Umsatz verschiebt sich, er wachst nöd. Es gwünnt niemert usser em, wo scho grooss isch.\n\nUnd s Wichtigschte: Es git en Grund, warum e Gsellschaft äi gmeinsame ruhige Tag hät. Nöd us religiöse Gründ — sondern wil Familie, Verein und Fründe äi Tag bruuched, wo alli gliichziitig frei händ. Dää Tag git s käis zwäits Mal.",
    questions: [
      {
        text: "Welles isch s Hauptargumänt vo de Frau Iseli?",
        options: [
          "Lüüt mit Schicht oder zwäi Job chömed under de Wuche nöd zum Iichaufe",
          "D Läde verdiened z wenig",
          "De Sunntig isch langwiilig",
        ],
        answer: 0,
        explain: "Vardiyalı ya da iki işi olanlar için pazar tek uygun gün.",
      },
      {
        text: "Wie argumentiert si mit em Onlinehandel?",
        options: [
          "S Verbot schadet em Quartierlade, nöd em Konzern",
          "Online söll me au verbüüte",
          "Online isch tüürer",
        ],
        answer: 0,
        explain: "Yasak yalnızca yerel dükkâna işliyor; büyük online oyuncu zaten pazar da teslim ediyor.",
      },
      {
        text: "Was säit de Herr Hofstetter zur Freiwilligkäit?",
        options: [
          "Si existiert i de Praxis nöd — wer ablehnt, überchunt en schlächtere Plan",
          "Si funktioniert guet",
          "Nume Junge schaffed freiwillig",
        ],
        answer: 0,
        explain:
          "On iki yıllık deneyimine dayanarak: yazılı olmayan ama herkesin bildiği bir baskı var.",
      },
      {
        text: "Was säit er zum Umsatz?",
        options: [
          "Er verschiebt sich nume, er wachst nöd",
          "Er sinkt stark",
          "Er verdopplet sich",
        ],
        answer: 0,
        explain: "Araştırmalara göre insanlar daha çok değil, farklı dağılımda alışveriş yapıyor.",
      },
      {
        text: "Welles isch sis stärchschte Argumänt am Schluss?",
        options: [
          "E Gsellschaft bruucht äi Tag, wo alli gliichziitig frei händ",
          "Religiösi Gründ",
          "D Läde sind am Sunntig z voll",
        ],
        answer: 0,
        explain:
          "Dinî gerekçeyi açıkça reddedip aile, dernek ve arkadaşlar için ortak boş güne dayanıyor.",
      },
    ],
  },

  {
    id: "zh-b2-l1",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "Abstimmigssunntig: D Velorouten-Initiative",
    genre: "Sohbet",
    intro:
      "İki arkadaş, pazar günü oylanacak bisiklet yolları girişimini tartışıyor; kimin hangi gerekçeyi savunduğunu takip et.",
    minutes: 5,
    gloss: [
      { de: "abschtime", tr: "oy kullanmak, oylamak" },
      { de: "d Abstimmig", tr: "halk oylaması" },
      { de: "s Büechli", tr: "oylama kitapçığı (resmi bilgilendirme)" },
      { de: "de Velowääg", tr: "bisiklet yolu" },
      { de: "tränt", tr: "ayrılmış, ayrı" },
      { de: "d Schtüüre", tr: "vergiler" },
      { de: "gföörlich", tr: "tehlikeli" },
      { de: "de Stau", tr: "trafik sıkışıklığı" },
      { de: "d Unfallzaale", tr: "kaza sayıları" },
      { de: "zruggaa", tr: "geri gitmek, azalmak" },
    ],
    segments: [
      {
        speaker: "Reto",
        text: "Du Sandra, häsch scho abgschtimt? Am Sunntig isch ja wider Abstimmigssunntig.",
      },
      {
        speaker: "Sandra",
        text: "Na nöd. Um was gaat s äigetlich gnau? Ich ha nu s Couvert gsee, aber s Büechli na nöd gläse.",
      },
      {
        speaker: "Reto",
        text: "Es gaat um d Velorouten-Initiative. D Stadt wott es Netz vo sichere Velowääge baue, wo vo de Autoschtraasse tränt sind. Choschtepunkt: rund drüühundert Millione über zwänzg Jaar.",
      },
      {
        speaker: "Sandra",
        text: "Puh, das isch vil Gäld. Und wär zaalt das?",
      },
      {
        speaker: "Reto",
        text: "D Stadt, also mir alli über d Schtüüre. Aber ich find, s lohnt sich: Hüt traut sich doch fascht niemert mit em Velo dur d Stadt, wil s äifach z gföörlich isch. Sit ich sicher fahre cha, bruuch ich s Tram fascht nüme.",
      },
      {
        speaker: "Sandra",
        text: "Ich wäiss nöd rächt. Ich fahre sälber Auto – und wänn überall Velowääge sind, hät s ja na weniger Platz und na meh Stau.",
      },
      {
        speaker: "Reto",
        text: "Da bin ich anderer Mäinig. Weniger Autofahrte häisst am Änd weniger Stau, nöd meh. Und lueg emal uf Basel: Sit s dört meh Velowääge git, sind d Unfallzaale klaar zruggange.",
      },
      {
        speaker: "Sandra",
        text: "Hm, s Argumänt mit de Sicherhäit zieht bi mir. Ich lise s Büechli hüt am Aabig – aber ich versprich der nüüt!",
      },
    ],
    questions: [
      {
        text: "Um was gaat s bi de Abstimmig?",
        options: [
          "Um es Netz vo sichere Velowääge, wo vo de Autoschtraasse tränt sind.",
          "Um e neui Tramlinie dur d Innestadt.",
          "Um es Verbot vo Autos i de ganze Stadt.",
        ],
        answer: 0,
        explain:
          "Reto girişimi özetliyor: şehir, araba yollarından ayrılmış („tränt“) güvenli bisiklet yolları ağı kurmak istiyor.",
      },
      {
        text: "Was choschtet s Projekt?",
        options: [
          "Rund drüühundert Millione über zwänzg Jaar.",
          "Rund drüü Millione pro Jaar.",
          "Rund zwänzg Millione äimalig.",
        ],
        answer: 0,
        explain:
          "Reto sayıyı veriyor: „rund drüühundert Millione über zwänzg Jaar“ — yirmi yıla yayılmış yaklaşık üç yüz milyon.",
      },
      {
        text: "Warum isch Sandra am Aafang skeptisch?",
        options: [
          "Si fahrt sälber Auto und hät Angscht vor na meh Stau.",
          "Si findt Velofahre z gföörlich.",
          "Si wott nöd, dass s Tram teurer wird.",
        ],
        answer: 0,
        explain:
          "Sandra kendisi araba kullanıyor: her yerde bisiklet yolu olursa yer azalır ve „na meh Stau“ olur diye çekiniyor.",
      },
      {
        text: "Was säit Reto über Basel?",
        options: [
          "Sit s meh Velowääge git, sind d Unfallzaale zruggange.",
          "Z Basel hät s hüt meh Stau als vorhär.",
          "Basel hät d Initiative abglehnt.",
        ],
        answer: 0,
        explain:
          "Reto Basel'i örnek veriyor: bisiklet yolları arttığından beri kaza sayıları belirgin şekilde azalmış („klaar zruggange“).",
      },
      {
        text: "Richtig oder falsch? Sandra verspricht am Schluss, dass si Ja schtimt.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: Güvenlik argümanı onu etkiliyor ve kitapçığı akşam okuyacak — ama „ich versprich der nüüt“ diyor, söz vermiyor.",
      },
    ],
  },
  {
    id: "zh-b2-l2",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "Stadt oder Land? Es Gsprööch i de Znünipause",
    genre: "Diyalog",
    intro:
      "İki iş arkadaşı, şehirden köye taşınmayı tartışıyor; her birinin gerekçelerini ve planı dinle.",
    minutes: 5,
    gloss: [
      { de: "zügle", tr: "taşınmak" },
      { de: "s Zürioberland", tr: "Zürih'in doğusundaki kırsal bölge" },
      { de: "sich öppis läischte", tr: "bir şeyi karşılayabilmek" },
      { de: "s Pendle", tr: "işe gidip gelme" },
      { de: "d S-Baan", tr: "banliyö treni" },
      { de: "d Beiz", tr: "meyhane, lokanta (İsviçre)" },
      { de: "nüüt los", tr: "hiçbir şey olmuyor, ortalık ölü" },
      { de: "d Huustüür", tr: "evin kapısı" },
      { de: "s Iiweihigsfäscht", tr: "yeni ev kutlaması" },
      { de: "iiglade", tr: "davetli" },
    ],
    segments: [
      {
        speaker: "Mirjam",
        text: "Du Luca, ich han ghöört, ir wänd us de Stadt zügle? Isch das ernscht?",
      },
      {
        speaker: "Luca",
        text: "Ja, mir händ es Huus im Zürioberland gfunde, z Hinwil. Mit eme Garte, für d Chind. D Wonig i de Stadt isch eus äifach z chlii worde – und e grööseri chönd mir eus nöd läischte.",
      },
      {
        speaker: "Mirjam",
        text: "Das verschtaan ich. Aber dänk a s Pendle! Du fahrsch dänn jede Tag ewig lang.",
      },
      {
        speaker: "Luca",
        text: "Mit de S-Baan sind s föifevierzg Minute bis Züri HB. Und ich cha zwäi Täg i de Wuche im Homeoffice schaffe. Das gaat scho.",
      },
      {
        speaker: "Mirjam",
        text: "Und s kulturell Läbe? Kino, Konzärt, Beize – uf em Land isch am Aabig doch äifach nüüt los.",
      },
      {
        speaker: "Luca",
        text: "Stimmt scho. Aber ehrlich gsäit: Sit mir Chind händ, gönd mir eh fascht nüme us. Und d Natur vor de Huustüür isch für eus hüt meh wärt als es Kino um s Egg.",
      },
      {
        speaker: "Mirjam",
        text: "Verschtande. Mir würd d Stadt trotzdem fääle. Und wänn zügled er?",
      },
      {
        speaker: "Luca",
        text: "Änds Monet scho! Aber mir mached es Iiweihigsfäscht – und du bisch natüürli iiglade.",
      },
    ],
    questions: [
      {
        text: "Warum wänd Luca und sini Familie us de Stadt zügle?",
        options: [
          "D Wonig isch z chlii worde und e grööseri chönd si sich nöd läischte.",
          "Luca hät e neui Schtell im Zürioberland gfunde.",
          "D Chind wänd unbedingt uf s Land.",
        ],
        answer: 0,
        explain:
          "Luca iki neden sayıyor: şehirdeki daire küçük geldi ve daha büyüğünü karşılayamıyorlar — Hinwil'de bahçeli bir ev bulmuşlar.",
      },
      {
        text: "Wie lang gaat s mit de S-Baan bis Züri HB?",
        options: ["Föifevierzg Minute.", "Zwänzg Minute.", "Meh als äi Schtund."],
        answer: 0,
        explain:
          "Luca: „Mit de S-Baan sind s föifevierzg Minute bis Züri HB“ — 45 dakika; ayrıca haftada iki gün evden çalışabiliyor.",
      },
      {
        text: "Was gsee Mirjam als Problem?",
        options: [
          "Uf em Land isch am Aabig kulturell nüüt los.",
          "S Huus z Hinwil isch z tüür.",
          "D S-Baan fahrt z sälte.",
        ],
        answer: 0,
        explain:
          "Mirjam kültürel hayatı soruyor: sinema, konser, meyhane — „uf em Land isch am Aabig doch äifach nüüt los“.",
      },
      {
        text: "Wie reagiert Luca uf s Argumänt mit em kulturelle Läbe?",
        options: [
          "Er git zue, dass es stimmt, aber sit si Chind händ, gönd si eh fascht nüme us.",
          "Er säit, z Hinwil häg es besseri Kinos als z Züri.",
          "Er findt Kultur unwichtig und wott nüme drüber rede.",
        ],
        answer: 0,
        explain:
          "„Stimmt scho“ diye kabul ediyor; ama çocuklar olduğundan beri zaten neredeyse hiç çıkmıyorlar ve kapının önündeki doğa onlara sinemadan daha değerli.",
      },
      {
        text: "Richtig oder falsch? D Familie zügled am Änd vom Monet.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain:
          "Doğru: „Änds Monet scho!“ — ay sonunda taşınıyorlar ve yeni ev kutlamasına Mirjam da davetli.",
      },
    ],
  },
  // ---------------------------------------------------------------- YAZMA
  {
    id: "zh-b2-l3",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "S Vorstellungsgspröch",
    genre: "İş görüşmesi",
    intro:
      "Bir iş görüşmesini dinleyeceksin. İsviçre'de görüşme çoğu zaman lehçeyle başlar — kalıpları not et.",
    gloss: [
      { de: "s Vorstellungsgspröch", tr: "iş görüşmesi" },
      { de: "d Stell", tr: "pozisyon" },
      { de: "d Stärchi", tr: "güçlü yön" },
      { de: "d Schwächi", tr: "zayıf yön" },
      { de: "d Kündigungsfrischt", tr: "ihbar süresi" },
      { de: "s Päntum", tr: "çalışma oranı (%80 gibi)" },
      { de: "iischtiige", tr: "işe başlamak" },
      { de: "de Iidruck", tr: "izlenim" },
    ],
    minutes: 5,
    segments: [
      {
        speaker: "Frau Baumann",
        text: "Grüezi Frau Yıldız, schöön sind Si da. Händ Si guet häre gfunde?",
      },
      { speaker: "Frau Yıldız", text: "Grüezi. Ja, merci — s Tram haltet grad vor em Huus." },
      {
        speaker: "Frau Baumann",
        text: "Perfäkt. Denn fangemer aa: Verzelled Si üs churz, warum Si sich uf die Stell bewärbed.",
      },
      {
        speaker: "Frau Yıldız",
        text: "Ich schaffe siit füf Jaar i de Logischtik und ha di letschte zwäi Jaar es chliises Team gfüehrt. Was mer fählt, isch d Verantwortig für es ganzes Projäkt — und genau das gseh ich bi Ine.",
      },
      {
        speaker: "Frau Baumann",
        text: "Mir schaffed stark im Team, mit vill Abschtimmig. Wo lit da Ihri Stärchi — und wo Ihri Schwächi?",
      },
      {
        speaker: "Frau Yıldız",
        text: "Stärchi: Ich plane gärn und dänke wiit vorus. Schwächi: Ich han lang Müe gha, Uufgabe abzgää — ich han lieber sälber gmacht. Underdesse deleghier ich bewusst, aber s bliibt öppis, wo ich beobachte.",
      },
      {
        speaker: "Frau Baumann",
        text: "Danke für di ehrlich Antwort. D Stell isch uf achtzg Prozänt uusgschriibe. Wär das für Si en Themepunkt?",
      },
      {
        speaker: "Frau Yıldız",
        text: "Achtzg passt mer sehr guet. Wichtig wär mer, dass ich d Täg fescht chan iiteile.",
      },
      {
        speaker: "Frau Baumann",
        text: "Das lat sich mache. Und wänn chönted Si iischtiige?",
      },
      {
        speaker: "Frau Yıldız",
        text: "Mini Kündigungsfrischt isch zwäi Mönet, also uf de erscht Auguscht.",
      },
      {
        speaker: "Frau Baumann",
        text: "Guet. Mir mälded üs bis Ändi nächschti Wuche — mir händ na drei Gspröch.",
      },
    ],
    questions: [
      {
        text: "Warum bewirbt sich d Frau Yıldız?",
        options: [
          "Si suecht d Verantwortig für es ganzes Projäkt",
          "Si verdient z wenig",
          "Ihre Betrieb schliesst",
        ],
        answer: 0,
        explain: "„Was mer fählt, isch d Verantwortig für es ganzes Projäkt — und genau das gseh ich bi Ine.“",
      },
      {
        text: "Was nennt si als Schwächi?",
        options: [
          "Si hät Müe gha, Uufgabe abzgää",
          "Si plant z wenig",
          "Si redt nöd gärn vor Lüüt",
        ],
        answer: 0,
        explain: "Delege etmekte zorlanmış; bunun üzerinde bilinçli çalıştığını söylüyor.",
      },
      {
        text: "Wie hööch isch s Päntum?",
        options: ["Achtzg Prozänt", "Hundert Prozänt", "Sächzg Prozänt"],
        answer: 0,
        explain: "„D Stell isch uf achtzg Prozänt uusgschriibe“ — bu ona uyuyor.",
      },
      {
        text: "Was isch ere bim Päntum wichtig?",
        options: [
          "Dass si d Täg fescht cha iiteile",
          "Dass si dihäi cha schaffe",
          "Dass si meh verdient",
        ],
        answer: 0,
        explain: "„Wichtig wär mer, dass ich d Täg fescht chan iiteile.“",
      },
      {
        text: "Wänn chönt si aafange?",
        options: ["Uf de erscht Auguscht", "Sofort", "I zwäi Wuche"],
        answer: 0,
        explain: "İki aylık ihbar süresi var, dolayısıyla 1 Ağustos.",
      },
    ],
  },
  {
    id: "zh-b2-l4",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "Podcast: Zwäisprachig ufwachse",
    genre: "Podcast",
    intro:
      "İki dilli büyüyen çocuklar üzerine bir podcast bölümünü dinleyeceksin — Zürih'te çok tanıdık bir konu.",
    gloss: [
      { de: "zwäisprachig", tr: "iki dilli" },
      { de: "d Muettersprooch", tr: "ana dil" },
      { de: "mische", tr: "karıştırmak" },
      { de: "de Wortschatz", tr: "kelime hazinesi" },
      { de: "de Rückschtand", tr: "gerilik, geri kalma" },
      { de: "uufhole", tr: "yetişmek, açığı kapatmak" },
      { de: "d Identität", tr: "kimlik" },
      { de: "konsequänt", tr: "tutarlı" },
    ],
    minutes: 5,
    segments: [
      {
        speaker: "Moderatorin",
        text: "Bi eus im Studio isch d Sprachforscherin Nadja Frei. Frau Frei, di grooss Angscht vo vilne Eltere: Verwirrt me s Chind, wänn me deheim zwäi Sprooche redt?",
      },
      {
        speaker: "Nadja Frei",
        text: "Nei. Das isch di häufigscht Frag und di äifachscht Antwort. Chinderhirn sind für Mehrsprachigkäit bout — weltwiit wachst d Mehrheit vo de Chind mit zwäi oder meh Sprooche uuf.",
      },
      {
        speaker: "Moderatorin",
        text: "Aber es git doch Chind, wo spöter aafanged rede.",
      },
      {
        speaker: "Nadja Frei",
        text: "Das schtimmt — und es hät nüüt mit Verwirrig z tue. Zwäisprachigi Chind händ am Aafang pro Sprooch en chliinere Wortschatz. Zellt me beid Sprooche zäme, sind si gliich wiit oder wiiter. De Rückschtand pro Sprooch hole si bis öppe zum Schuelaafang uuf.",
      },
      {
        speaker: "Moderatorin",
        text: "Und wänn s Chind d Sprooche mischt, mitte im Satz?",
      },
      {
        speaker: "Nadja Frei",
        text: "Das isch käis Zeiche vo Schwächi, sondern vo Kompetänz. S Chind wählt s Wort, wo grad passt. Erwachseni Zwäisprachigi mached genau s gliiche.",
      },
      {
        speaker: "Moderatorin",
        text: "Was ratet Si de Eltere konkret?",
      },
      {
        speaker: "Nadja Frei",
        text: "Redet mit em Chind d Sprooch, wo ihr am beschte chönd — au wänn s nöd Düütsch isch. E halbi Sprooch vom Vater bringt weniger als e ganzi. Und sind konsequänt: äi Person, äi Sprooch funktioniert am beschte.",
      },
      {
        speaker: "Nadja Frei",
        text: "Und s Wichtigschte, wo z wenig gsäit wird: E Sprooch überläbt nöd wäge Grammatik, sondern wäge Bezieige. Wänn s Chind d Sprooch mit de Grosseltere verbindet, mit Gschichte, mit Ässe — denn bliibt si.",
      },
    ],
    questions: [
      {
        text: "Was säit d Forscherin zur Angscht vor Verwirrig?",
        options: [
          "Si isch unbegründet — Chinderhirn sind für Mehrsprachigkäit bout",
          "Si isch berächtigt",
          "Nume bi drei Sprooche stimmt si",
        ],
        answer: 0,
        explain: "Kısa cevap: hayır. Dünyada çocukların çoğunluğu zaten çok dilli büyüyor.",
      },
      {
        text: "Was gilt für de Wortschatz vo zwäisprachige Chind?",
        options: [
          "Pro Sprooch chliiner, zäme gliich wiit oder wiiter",
          "Er isch immer chliiner",
          "Er isch immer grösser",
        ],
        answer: 0,
        explain: "Dil başına daha az, iki dil birlikte sayıldığında eşit ya da daha ileri.",
      },
      {
        text: "Wie beurtäilt si s Mische vo Sprooche?",
        options: [
          "Als Zeiche vo Kompetänz",
          "Als Problem, wo me korrigiere mues",
          "Als Zeiche vo Faulhäit",
        ],
        answer: 0,
        explain: "Çocuk o an uyan kelimeyi seçiyor; yetişkin iki dilliler de aynısını yapıyor.",
      },
      {
        text: "Welles isch ihre konkret Rat a d Eltere?",
        options: [
          "D Sprooch rede, wo me am beschte cha — konsequänt",
          "Immer Düütsch rede",
          "Zwäi Sprooche gliichziitig mische",
        ],
        answer: 0,
        explain: "„Äi Person, äi Sprooch“ ve babanın yarım dili yerine tam bildiği dil.",
      },
      {
        text: "Was säit si zum Schluss?",
        options: [
          "E Sprooch überläbt wäge Bezieige, nöd wäge Grammatik",
          "Grammatik isch am wichtigschte",
          "Ohni Kurs gaat s nöd",
        ],
        answer: 0,
        explain:
          "Dilin büyükanne-büyükbaba, hikâyeler ve yemekle bağı kurulursa kalıcı oluyor.",
      },
    ],
  },
  {
    id: "zh-b2-l5",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "Sitzig: Es nöis Projäkt",
    genre: "Toplantı",
    intro:
      "Bir ekip toplantısında yeni projenin planlaması konuşuluyor. İş hayatının lehçesini dinleyeceksin.",
    gloss: [
      { de: "d Sitzig", tr: "toplantı" },
      { de: "de Termiin", tr: "tarih, teslim tarihi" },
      { de: "d Ressource", tr: "kaynak (kişi/bütçe)" },
      { de: "de Puffer", tr: "pay, tampon süre" },
      { de: "d Schnittstell", tr: "arayüz, kesişim noktası" },
      { de: "verschiebe", tr: "ertelemek" },
      { de: "s Protokoll", tr: "toplantı tutanağı" },
      { de: "de Iiwand", tr: "itiraz" },
    ],
    minutes: 5,
    segments: [
      {
        speaker: "Reto",
        text: "Also, zum Projäkt Nordstärn: De Kund wott de Start uf de erscht Oktober. Mir händ jetz Juni.",
      },
      {
        speaker: "Sibel",
        text: "Vier Mönet. Das gaat — aber nume, wänn mir d Schnittstell zum alte System vorher klääred. Genau dört sind mir letschts Mal drei Wuche hange bliibe.",
      },
      { speaker: "Reto", text: "Was bruuchsch du dezue?" },
      {
        speaker: "Sibel",
        text: "Zwäi Täg mit em Anbieter und en Entschäid vo de Gschäftsleitig, öb mir migriere oder parallel fahred. Ohni dää Entschäid plane ich ins Läärä.",
      },
      {
        speaker: "Marc",
        text: "Ich han en Iiwand zum Termiin. Im Auguscht sind drei vo üs i de Ferie. Wänn mir dää Monet voll iiplaned, isch de Puffer scho ufbruucht, bevor öppis passiert isch.",
      },
      {
        speaker: "Reto",
        text: "Das isch en guete Punkt. Vorschlag: Mir planed de Auguscht mit halber Kapazität und säged em Kund de fufzähnt Oktober statt de erscht.",
      },
      {
        speaker: "Sibel",
        text: "Iiverstande. Zwäi Wuche Puffer sind realistisch, drei wäred besser — aber ich cha mit zwäi läbe.",
      },
      {
        speaker: "Marc",
        text: "Und wär redt mit em Kund? Wänn das erscht im Auguscht chunt, isch er suur.",
      },
      {
        speaker: "Reto",
        text: "Ich lüüte hüt na aa. Sibel, du hesch bis am Friitig d Schnittstelle-Frag als äi Siite — die nimm ich mit. Marc, du machsch d Ferieplanig im Tool. S Protokoll schick ich hüt Aabig.",
      },
    ],
    questions: [
      {
        text: "Welles isch s grösst Risiko, wo d Sibel nennt?",
        options: [
          "D Schnittstell zum alte System",
          "S Budget",
          "D Qualität vom Kund sine Date",
        ],
        answer: 0,
        explain: "Geçen sefer tam orada üç hafta takılmışlar.",
      },
      {
        text: "Was bruucht si vo de Gschäftsleitig?",
        options: [
          "En Entschäid: migriere oder parallel fahre",
          "Meh Budget",
          "En nöie Mitarbeiter",
        ],
        answer: 0,
        explain: "Bu karar olmadan „plane ich ins Läärä“ — boşa planlamış olur.",
      },
      {
        text: "Was isch em Marc sin Iiwand?",
        options: [
          "Im Auguscht sind drei i de Ferie, de Puffer isch scho wägg",
          "S Projäkt isch z tüür",
          "De Kund isch z fordernd",
        ],
        answer: 0,
        explain: "Ağustos tam kapasite planlanırsa daha bir şey olmadan tampon tükeniyor.",
      },
      {
        text: "Uf welle Termiin äiniged si sich?",
        options: ["De fufzähnt Oktober", "De erscht Oktober", "De erscht Novämber"],
        answer: 0,
        explain: "Ağustos yarı kapasite + müşteriye 15 Ekim.",
      },
      {
        text: "Wär macht was bis am Friitig?",
        options: [
          "D Sibel schriibt d Schnittstelle-Frag uf äi Siite",
          "De Marc redt mit em Kund",
          "De Reto macht d Ferieplanig",
        ],
        answer: 0,
        explain:
          "Reto müşteriyi arıyor, Marc izin planını giriyor, Sibel tek sayfalık notu hazırlıyor.",
      },
    ],
  },
  {
    id: "zh-b2-l6",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "Interview: D Klimaziel vo de Stadt",
    genre: "Röportaj",
    intro:
      "Bir belediye meclisi üyesiyle şehrin iklim hedefleri üzerine yapılan röportajı dinleyeceksin.",
    gloss: [
      { de: "s Ziel", tr: "hedef" },
      { de: "de Uusstoss", tr: "salım, emisyon" },
      { de: "d Heizig ersetze", tr: "kalorifer sistemini değiştirmek" },
      { de: "de Fernwärme", tr: "bölgesel ısıtma" },
      { de: "d Frischt", tr: "süre" },
      { de: "de Widerstand", tr: "direnç, karşı çıkış" },
      { de: "zwinge", tr: "zorlamak" },
      { de: "d Bilanz", tr: "bilanço" },
    ],
    minutes: 5,
    segments: [
      {
        speaker: "Journalischt",
        text: "Frau Sommer, d Stadt wott bis zwäitusigvierzg netto null. Sind Si im Plan?",
      },
      {
        speaker: "Sommer",
        text: "Bim Struum ja, bi de Wärmi nöd. Öppe s vierzg Prozänt vom Uusstoss chunt vo Heizige, und dört gaat s z langsam.",
      },
      { speaker: "Journalischt", text: "Warum?" },
      {
        speaker: "Sommer",
        text: "Wil e Heizig zwänzg Jaar hebt. Wär hüt e nöii Gasheizig iibout, isch bis zwäitusigfüfevierzg drin. Drum isch entschäidend, dass jedi Heizig, wo hüt ersetzt wird, glii uf Fernwärmi oder Wärmipumpe gaat.",
      },
      {
        speaker: "Journalischt",
        text: "Und wänn en Hausbsitzer das nöd wott?",
      },
      {
        speaker: "Sommer",
        text: "Denn hämmer es Problem. Zwinge chöned mir nume beschränkt. Was mir chönd: bezaale. Mir übernämed en Täil vo de Choschte und mir bouted s Fernwärminetz us — wär aagschlosse isch, entschäidet sich fascht immer defür.",
      },
      {
        speaker: "Journalischt",
        text: "Kritiker säged, das seig e Subvention für Hausbsitzer, zaalt vo allne — au vo de Mieter.",
      },
      {
        speaker: "Sommer",
        text: "Dää Iiwand isch berächtigt, und ich nimm en ernscht. Nume: D Alternative isch nöd „nüüt zaale“. D Alternative isch, dass mir spöter meh zaaled, für Schäde. Und d Miete schtiigt bi ere schlächte Heizig au — über d Näbechoschte.",
      },
      {
        speaker: "Journalischt",
        text: "Was passiert, wänn Si s Ziel verfehled?",
      },
      {
        speaker: "Sommer",
        text: "Denn isch es en politische Schade — aber ehrlich gsäit: Es Ziel, wo me sicher erräicht, isch z tüüf gsetzt gsii.",
      },
    ],
    questions: [
      {
        text: "Wo isch d Stadt nöd im Plan?",
        options: ["Bi de Wärmi", "Bim Struum", "Bim Verchehr"],
        answer: 0,
        explain: "„Bim Struum ja, bi de Wärmi nöd“ — emisyonun %40'ı ısıtmadan geliyor.",
      },
      {
        text: "Warum isch d Heizig s zentrale Problem?",
        options: [
          "Well e Heizig zwänzg Jaar hebt — hütigi Entschäid wirked lang",
          "Well Heizige tüür sind",
          "Well s z wenig Handwärker git",
        ],
        answer: 0,
        explain:
          "Bugün takılan gaz kazanı 2045'e kadar yerinde kalıyor; bu yüzden her değişim kritik.",
      },
      {
        text: "Wie wott si d Hausbsitzer überzüüge?",
        options: [
          "Mit Gäld und em Uusbau vom Fernwärminetz",
          "Mit Buesse",
          "Mit eme Verbot",
        ],
        answer: 0,
        explain: "Zorlama sınırlı; maliyetin bir kısmını üstlenip şebekeyi genişletiyorlar.",
      },
      {
        text: "Wie reagiert si uf d Kritik vo de Subvention?",
        options: [
          "Si nimmt en ernscht, aber d Alternative sig spöter meh z zaale",
          "Si bestriitet en",
          "Si findet en unwichtig",
        ],
        answer: 0,
        explain:
          "İtirazı haklı buluyor ama alternatifin „hiç ödememek“ değil, sonra daha çok ödemek olduğunu söylüyor.",
      },
      {
        text: "Was säit si über s Verfehle vom Ziel?",
        options: [
          "Es Ziel, wo me sicher erräicht, wär z tüüf gsetzt gsii",
          "Das wär e Katastrofe",
          "Das cha nöd passiere",
        ],
        answer: 0,
        explain: "Kendine güvenli bir hedefin zaten fazla düşük olacağını söylüyor.",
      },
    ],
  },

  {
    id: "zh-b2-w1",
    course: "gsw-zh",
    level: "B2",
    skill: "writing",
    title: "Forumsbiitraag: Autofreii Innestadt?",
    genre: "Forum yorumu",
    intro:
      "Mahalle forumunda araçsız şehir merkezi tartışılıyor; önce iki cümle kur, sonra tartışmaya kendi yorumunla katıl.",
    minutes: 12,
    gloss: [
      { de: "d Innestadt", tr: "şehir merkezi" },
      { de: "de Vercheer", tr: "trafik" },
      { de: "d Chundschaft", tr: "müşteriler" },
      { de: "s Gwärb", tr: "esnaf, küçük işletmeler" },
      { de: "d Uusnaam", tr: "istisna" },
      { de: "s Parkhuus", tr: "katlı otopark" },
      { de: "de Lärm", tr: "gürültü" },
      { de: "de Versuech", tr: "deneme" },
      { de: "berächtigt", tr: "haklı, yerinde" },
      { de: "de Umsatz", tr: "ciro" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Bence şehir merkezinde çok fazla araba var.",
        answer: "Ich finde, i de Innestadt hät s z vil Autos.",
        alternatives: ["I de Innestadt hät s z vil Autos, finde ich."],
        hint: "Zürihce'de „es gibt“ karşılığı „es hät“ kalıbıdır: „i de Innestadt hät s …“.",
      },
      {
        kind: "build",
        tr: "Bir yandan mağazalar müşteriye muhtaç, öte yandan herkes sakin bir merkez istiyor.",
        answer:
          "Äinersiits bruuched d Läde Chundschaft, anderersiits wänd alli e rueigi Innestadt.",
        alternatives: [
          "Anderersiits wänd alli e rueigi Innestadt, äinersiits bruuched d Läde Chundschaft.",
        ],
        hint: "Karşıtlık kalıbı: „äinersiits …, anderersiits …“ (bir yandan…, öte yandan…). „wänd“ = wollen'in çoğulu.",
      },
      {
        kind: "free",
        prompt:
          "Forumdaki tartışmaya Züritüütsch bir yorum yaz. Görüşünü gerekçelendir, karşı görüşü de tart ve somut bir öneriyle bitir: Zürih şehir merkezi araçsız olmalı mı?",
        stimulus:
          "Biitraag vo Heidi_52 im Quartierforum: Ich han min Lade sit drissg Jaar a de Löwestraass. Wänn d Autos nüme dörfed cho, chunt au d Chundschaft nüme – dänn cha ich grad zuemache. Die Politiker dänked nie a s chliine Gwärb. Wie gsend ir das?",
        checklist: [
          "Heidi'nin yorumuna bir giriş cümlesiyle bağlan.",
          "Kendi görüşünü açıkça belirt ve en az iki gerekçe ver.",
          "Karşı görüşü de tart (äinersiits/anderersiits).",
          "Somut bir öneri ya da orta yol sun.",
          "Bağlaçlarla akışı kur: drum, trotzdem, susch.",
        ],
        minWords: 90,
        phrases: [
          { de: "Äinersiits …, anderersiits …", tr: "Bir yandan…, öte yandan…" },
          { de: "Ich verschtaa d Sorge vo …", tr: "…'nın kaygısını anlıyorum" },
          { de: "Drum bin ich für/gäge …", tr: "Bu yüzden …'dan yanayım / …'a karşıyım" },
          { de: "mit Uusnaame", tr: "istisnalar hariç" },
          { de: "Probiere mer s doch emal us", tr: "Hadi bir deneyelim" },
          { de: "Das betrifft mich diräkt", tr: "Bu beni doğrudan ilgilendiriyor" },
          { de: "meh wärt als …", tr: "…'dan daha değerli" },
        ],
        sample:
          "Ich wone sit füfzää Jaar im Chräis 4, drum betrifft mich s Thema diräkt. Äinersiits verschtaan ich d Sorge vo de Ladebsitzer wie de Heidi: Si bruuched Chundschaft, und wär schwäri Sache chauft, wott mit em Auto vorfahre chöne. Anderersiits gsee ich jede Tag, wie s Quartier under em Vercheer liidet: Lärm, dräckigi Luft und käin Platz für d Chind. Drum bin ich für en autofreii Innestadt – aber mit Uusnaame. D Lieferwäge, s Gwärb und d Lüüt mit ere Behinderig müend wiiterhin dure chöne. Für alli anderi hät s am Rand vo de Stadt Parkhüüser, und vo dört fahrt s Tram alli paar Minute. Züri wär nöd di erschti Stadt: Z Oslo funktioniert das Modäll sit Jaare, und d Läde händ dört hüt sogar meh Umsatz als vorhär. Probiere mer s doch emal us – für es Jaar, als Versuech. Dänn gsend mir, öb d Ängscht berächtigt sind.",
      },
    ],
  },
  {
    id: "zh-b2-w2",
    course: "gsw-zh",
    level: "B2",
    skill: "writing",
    title: "Läserbrief: Sunntigsverchauf",
    genre: "Okur mektubu",
    intro:
      "zh-b2-r6'daki iki okur mektubuna kendi yanıtını yazacaksın: karşı tarafın argümanını da ele alacaksın.",
    gloss: [
      { de: "s Gägenargumänt", tr: "karşı argüman" },
      { de: "iiraume", tr: "kabul etmek (bir noktayı)" },
      { de: "entchräfte", tr: "çürütmek" },
      { de: "d Abwägig", tr: "tartma, değerlendirme" },
      { de: "letschtlich", tr: "nihayetinde" },
      { de: "de Kompromiss", tr: "uzlaşma" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bay Hofstetter'in gönüllülük konusunda haklı olduğunu kabul ediyorum.",
        answer: "Ich raume ii, dass de Herr Hofstetter bi de Freiwilligkäit rächt hät.",
        hint: "einräumen ayrılabilir: ich raume … ii. dass ile yan cümle.",
      },
      {
        kind: "build",
        tr: "Yine de bu argüman tüm mağazalar için geçerli değil.",
        answer: "Trotzdem giltet das Argumänt nöd für alli Läde.",
        hint: "gelten → gälte: es giltet. trotzdem cümle başında, fiil ikinci sırada.",
      },
      {
        kind: "build",
        tr: "Nihayetinde bu, bir tartma meselesi.",
        answer: "Letschtlich isch das e Frag vo de Abwägig.",
        hint: "Genitiv yok: „e Frag vo de Abwägig“.",
      },
      {
        kind: "free",
        prompt:
          "Gazeteye kendi okur mektubunu yaz. Beş noktaya değin: hangi iki mektuba yanıt verdiğin, kendi tezin, karşı tarafın en güçlü argümanını kabul etmen, onu neden yine de yeterli bulmadığın, somut bir uzlaşma önerisi.",
        checklist: [
          "İki mektuba da atıf yaptın mı?",
          "Kendi tezini net kurdun mu?",
          "Karşı argümanı adil biçimde aktardın mı (iiraume)?",
          "Onu bir gerekçeyle çürüttün mü (entchräfte)?",
          "Somut bir uzlaşma önerdin mi?",
          "İsim ve semtle bitirdin mi?",
        ],
        minWords: 110,
        phrases: [
          { de: "Zu de bäide Läserbrief vom …", tr: "…tarihli iki okur mektubuna dair" },
          { de: "Ich raume ii, dass …", tr: "… olduğunu kabul ediyorum." },
          { de: "Trotzdem übergseet er, dass …", tr: "Yine de … olduğunu gözden kaçırıyor." },
          { de: "Entschäidend isch für mi …", tr: "Benim için belirleyici olan …" },
          { de: "En gangbare Kompromiss wär …", tr: "Uygulanabilir bir uzlaşma … olurdu." },
        ],
        sample:
          "Zu de bäide Läserbrief vom letschte Samschtig:\n\nIch raume ii, dass de Herr Hofstetter bi de Freiwilligkäit rächt hät. Wär im Verchauf schafft und de Sunntig ablehnt, spürt das im nächschte Plan — das schriibt niemert ufe, aber es passiert. Wer das bestriitet, hät nie hinder ere Kasse gschtande.\n\nTrotzdem giltet das Argumänt nöd für alli Läde. Im Familiebetrieb, wo d Bsitzer sälber hinder de Theke staned, git s dää Druck nöd. D Frau Iseli hät drum au rächt: Mir verbüüted genau dene, wo am wenigschte Macht händ, während de Onlinehandel am Sunntig ohni Iischränkig lieferet.\n\nEntschäidend isch für mi nöd d Frag „offe oder zue“, sondern wär entschäidet und zu welne Bedingige. Es Verbot schützt s Personal nume so lang, wie s Personal käi anderi Wahl hät.\n\nEn gangbare Kompromiss wär: Sunntigsverchauf erlaubt für Betriib bis zää Aagschtellti, mit eme Loonzueschlag vo fufzg Prozänt und em Rächt, ohni Begründig nei z säge — schriftlich feschtghalte, nöd nume gmeint.\n\nLetschtlich isch das e Frag vo de Abwägig: Mir bruuched käi Sunntig ohni Läde, aber au käi Läde ohni Sunntig.\n\nDeniz Kaya, Züri-Wipkinge",
      },
    ],
  },
  {
    id: "zh-b2-w3",
    course: "gsw-zh",
    level: "B2",
    skill: "writing",
    title: "Aatrag uf Wiiterbildig",
    genre: "İş yazışması",
    intro:
      "Yöneticine bir eğitim talebi yazacaksın: isteğini şirkete faydası üzerinden gerekçelendireceksin.",
    gloss: [
      { de: "d Wiiterbildig", tr: "mesleki eğitim, kurs" },
      { de: "de Aatrag", tr: "talep, başvuru" },
      { de: "de Nutze", tr: "fayda" },
      { de: "d Choschte", tr: "masraf" },
      { de: "d Abwäsenhäit", tr: "işte olmama, devamsızlık" },
      { de: "sich verpflichte", tr: "taahhüt etmek" },
      { de: "d Vertretig", tr: "vekâlet, yerine bakma" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Ekim'de başlayan bir kursa katılmak istiyorum.",
        answer: "Ich möcht en Kurs bsueche, wo im Oktober aafangt.",
        hint: "İlgi cümlesi „wo“ ile: en Kurs, wo … aafangt.",
      },
      {
        kind: "build",
        tr: "Kurs sekiz gün sürüyor ve 3200 franka mal oluyor.",
        answer: "De Kurs duuret acht Täg und choschtet dräitusigzwäihundert Franke.",
        hint: "dauern → duure; kosten → choschte.",
      },
      {
        kind: "build",
        tr: "Yokluğumda Sibel bana vekâlet edebilir.",
        answer: "Während minere Abwäsenhäit chan d Sibel mi vertrete.",
        hint: "Genitiv yerine „während minere …“ (Dativ) kullanılır.",
      },
      {
        kind: "free",
        prompt:
          "Yöneticine bir eğitim talebi e-postası yaz. Beş noktaya değin: hangi kurs ve ne zaman, neden bu kurs, şirkete faydası, masraf ve iş kaybı, yokluğunda işlerin nasıl yürüyeceği. Sonunda net bir ricayla bitir.",
        checklist: [
          "Kursu, tarihi ve süresini yazdın mı?",
          "Gerekçeyi kendi işine bağladın mı?",
          "Şirkete faydasını somut yazdın mı?",
          "Masraf ve devamsızlık konusunu kendin açtın mı?",
          "Vekâlet/işlerin devri için bir öneri sundun mu?",
          "Net bir ricayla bitirdin mi?",
        ],
        minWords: 110,
        phrases: [
          { de: "Ich möcht Ine en Aatrag stelle.", tr: "Size bir talepte bulunmak istiyorum." },
          { de: "De Kurs findet vom … bis am … statt.", tr: "Kurs …–… tarihleri arasında." },
          { de: "Für üses Team bedüütet das, dass …", tr: "Ekibimiz için bu … demek." },
          { de: "D Choschte betraged … Franke.", tr: "Masraf … frank." },
          { de: "Ich verpflichte mi, …", tr: "… taahhüt ediyorum." },
          { de: "Ich bitte Si um Ihres Iiverständnis.", tr: "Onayınızı rica ediyorum." },
        ],
        sample:
          "Grüezi Frau Baumann\n\nIch möcht Ine en Aatrag stelle: Ich möcht en Kurs bsueche, wo im Oktober aafangt — «Projäktleitig i de Logischtik», bi de Fachhochschuel Winterthur. De Kurs duuret acht Täg, verteilt uf vier Mönet, und choschtet dräitusigzwäihundert Franke.\n\nDe Grund isch konkret: Siit em Projäkt Nordstärn füehre ich Termiine und Ressource sälber, aber ich mach das us Erfaarig und nöd us Methodik. Bi de letschte zwäi Verzögerige han ich s Problem z spaat gseh. Genau das isch de Schwerpunkt vom Kurs.\n\nFür üses Team bedüütet das, dass mir d Plänig nöd meh extern iichaufe müend. Elleige bim Projäkt Nordstärn hämmer letschts Jaar vierezwänzgtuusig Franke a e externi Beratig zaalt.\n\nD Abwäsenhäit isch mir bewusst. D Kurstäg sind am Friitig; während minere Abwäsenhäit chan d Sibel mi vertrete, si isch iiverstande. Ich verpflichte mi, s Glernte im Team witerzgää — zwäi Mittagssitzige nach em Kurs.\n\nIch bitte Si um Ihres Iiverständnis und gärn au um es churzes Gspröch, wänn Si Fräge händ.\n\nFründlichi Grüess\nMurat Aydın",
      },
    ],
  },
  {
    id: "zh-b2-w4",
    course: "gsw-zh",
    level: "B2",
    skill: "writing",
    title: "E Zämefassig schriibe",
    genre: "Özet",
    intro:
      "zh-b2-r5'teki metni (D Stadt wachst) özetleyeceksin: kendi görüşünü katmadan, ana çizgiyi kendi cümlelerinle.",
    gloss: [
      { de: "d Zämefassig", tr: "özet" },
      { de: "de Kärn", tr: "öz, çekirdek" },
      { de: "wiedergää", tr: "aktarmak" },
      { de: "d Quelle", tr: "kaynak" },
      { de: "sachlich", tr: "nesnel, olgusal" },
      { de: "wäggloo", tr: "atmak, dışarıda bırakmak" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Metin şehrin büyümesinin sonuçlarını ele alıyor.",
        answer: "De Text handlet vo de Folge vom Wachstum vo de Stadt.",
        alternatives: ["De Text gaat um d Folge vom Wachstum vo de Stadt."],
        hint: "handeln von → handle vo; Genitiv yok: „vom Wachstum vo de Stadt“.",
      },
      {
        kind: "build",
        tr: "Yazara göre asıl sorun kişi başına düşen alan.",
        answer: "Laut em Autor isch d Flächi pro Person s eigentlich Problem.",
        hint: "laut + Dativ: laut em Autor. „eigentlich“ burada „asıl“ anlamında.",
      },
      {
        kind: "build",
        tr: "Sonuç olarak metin hiçbir önlemin tek başına yetmediğini söylüyor.",
        answer: "Zum Schluss säit de Text, dass käini Massnaam elleige gnueget.",
        hint: "genügen → gnüege; keine … allein → käini … elleige.",
      },
      {
        kind: "free",
        prompt:
          "zh-b2-r5'teki metnin özetini yaz. Dört noktaya değin: metnin konusu, büyümenin nedenleri, en önemli iki sonuç, metnin vardığı yargı. Kendi görüşünü ekleme; alıntı yapma, kendi cümlelerinle yaz.",
        checklist: [
          "Giriş cümlesinde konuyu ve metin türünü belirttin mi?",
          "Nedenleri doğru aktardın mı?",
          "En az iki sonucu yazdın mı?",
          "Kendi görüşünü dışarıda tuttun mu?",
          "Kendi cümlelerini kurdun mu (kopyalamadan)?",
        ],
        minWords: 90,
        phrases: [
          { de: "De Text handlet vo …", tr: "Metin … hakkında." },
          { de: "Als Grund nennt de Autor …", tr: "Yazar gerekçe olarak … gösteriyor." },
          { de: "Als Folg dervo …", tr: "Bunun sonucu olarak …" },
          { de: "Wiiter wird gsäit, dass …", tr: "Ayrıca … deniyor." },
          { de: "Zum Schluss chunt de Text zum Schluss, dass …", tr: "Metin sonunda … sonucuna varıyor." },
        ],
        sample:
          "De Text handlet vo de Folge vom Wachstum vo de Stadt Züri. Er zäigt zerscht d Zaale: vierehundertdriissgtuusig Iiwohner hüt, öppe füfhunderttuusig bis zwäitusigvierzg.\n\nAls Grund nennt de Autor nöd de Zuezug us em Uusland — dää sig stabil. Wichtiger seiged zwäi anderi Entwicklige: D Lüüt bliibed lenger i de Stadt, und jedi Person bruucht meh Wonflächi als früener.\n\nAls Folg dervo mues d Stadt verdichte. Laut em Autor isch d Flächi pro Person s eigentlich Problem, wil me nöd gliichziitig meh Lüüt und meh Platz pro Person cha haa. Wo nöi bout wird, schtiiged aber d Miete, und di alte Bewohner müend furt.\n\nWiiter wird gsäit, dass au d Infrastruktur under Druck chunt: Bis zwäituusigfüfedrissg bruucht d Stadt sibe nöii Schuelhüüser, hät aber fascht käis Bouland meh.\n\nZum Schluss chunt de Text zum Schluss, dass käini Massnaam elleige gnueget — aber au, dass e Stadt nöd cha beschliesse, nöd z wachse.",
      },
    ],
  },
];
