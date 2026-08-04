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

  // ── Hikâye dizisi: Amina Lehrstell suecht. B2'nin yeni alıştırmalarında
  //    Schnupperlehr → Bewärbig → Absaag → Vertrag sırası izlenir.
  {
    id: "zh-b2-r7",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "De Schnupperbricht",
    genre: "Rapor",
    intro:
      "İsviçre'de çıraklık öncesi deneme haftası (Schnupperlehre) zorunlu bir adımdır. Amina'nın raporunu okuyacaksın.",
    gloss: [
      { de: "d Schnupperlehr", tr: "deneme stajı" },
      { de: "de Bricht", tr: "rapor" },
      { de: "de Betrieb", tr: "işletme" },
      { de: "d Erwartig", tr: "beklenti" },
      { de: "sich vorstelle", tr: "hayal etmek" },
      { de: "d Rückmäldig", tr: "geri bildirim" },
      { de: "iiteile", tr: "görevlendirmek, ayırmak" },
      { de: "überrascht", tr: "şaşırmış" },
      { de: "d Belaschtig", tr: "zorlanma, yük" },
    ],
    minutes: 7,
    text:
      "Schnupperbricht — Amina Bekele, 3. Sek B\nBetrieb: Apotheke am Limmatplatz · 3 Täg\n\nMini Erwartig vorher\n\nIch han dänkt, i de Apothek bediene me Chunde und suecht Medikamänt usem Gstell. Ich han mich uf de Kontakt mit Lüüt gfröit und Angscht gha vor de Chemie.\n\nWas ich gmacht han\n\nAm erschte Tag han ich zuegluegt und Ware iigruumt. Am zwäite Tag han ich sälber Chunde begrüesst und Rezäpt entgäge gnoo. Am dritte Tag han ich im Labor gsee, wie e Salbe agrüehrt wird.\n\nWas anders gsii isch als dänkt\n\nDrei Sache händ mich überrascht. Erschtens: De grössere Täil vo de Arbet isch Beratig, nöd Verchauf. Zwäitens: Me mues sehr genau schriibe und rächne — es Fähler bim Dosiere isch kä chline Fähler. Drittens: Es isch körperlich aaschtrengender, als ich dänkt han; me staat de ganz Tag.\n\nD Rückmäldig vom Betrieb\n\nD Frau Kern hät gsäit, ich seig fründlich mit de Chunde gsii und heig guet zueglost. Verbessere mues ich s Tempo bim Iigrüume und s Fachvokabular.\n\nMis Fazit\n\nIch wott die Lehr mache. Nöd wäge em Verchauf, sondern wäge de Beratig. Was ich no abklärä mues: öb ich mit de Verantwortig bim Dosiere umgaa cha — das isch de Punkt, wo ich am mäischte Respäkt han.",
    questions: [
      {
        text: "Was hät d Amina vorher erwartet?",
        options: [
          "Chunde bediene und Medikamänt sueche",
          "Im Labor schaffe",
          "Vor allem beraate",
        ],
        answer: 0,
        explain: "Beklentisi satış ağırlıklıydı; kimyadan ise korkuyordu.",
      },
      {
        text: "Welli Überraschig nennt si zerscht?",
        options: [
          "De grössere Täil isch Beratig, nöd Verchauf",
          "S Tempo isch hööch",
          "D Chunde sind unfründlich",
        ],
        answer: 0,
        explain: "Üç sürprizin ilki bu.",
      },
      {
        text: "Warum isch s Rächne so wichtig?",
        options: [
          "Es Fähler bim Dosiere isch kä chline Fähler",
          "Well me d Kasse mues füehre",
          "Wäge de Stüüre",
        ],
        answer: 0,
        explain: "Metin bunu doğrudan söylüyor.",
      },
      {
        text: "Was mues si laut Rückmäldig verbessere?",
        options: [
          "S Tempo bim Iigrüume und s Fachvokabular",
          "De Umgang mit Chunde",
          "S Zuelose",
        ],
        answer: 0,
        explain: "İlk ikisi övülüyor, bu ikisi geliştirilecek olarak veriliyor.",
      },
      {
        text: "Was isch ihre grösst Zwiifel?",
        options: [
          "Öb si mit de Verantwortig bim Dosiere umgaa cha",
          "Öb si gnueg verdient",
          "Öb de Wäg z wiit isch",
        ],
        answer: 0,
        explain: "„das isch de Punkt, wo ich am mäischte Respäkt han.“",
      },
    ],
  },
  {
    id: "zh-b2-r8",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "D Loonabrächnig verstaa",
    genre: "Rehber",
    intro:
      "Brüt maaşla banka hesabına düşen tutar arasındaki fark nereye gidiyor? İsviçre bordrosunun kısaltmaları.",
    gloss: [
      { de: "d Loonabrächnig", tr: "maaş bordrosu" },
      { de: "de Bruttoloon", tr: "brüt maaş" },
      { de: "de Nettoloon", tr: "net maaş" },
      { de: "d AHV", tr: "yaşlılık ve dul sigortası (1. sütun)" },
      { de: "d ALV", tr: "işsizlik sigortası" },
      { de: "d Pensionskasse", tr: "emeklilik kasası (2. sütun)" },
      { de: "de Koordinationsabzug", tr: "koordinasyon indirimi" },
      { de: "d Quellestüür", tr: "kaynakta kesilen vergi" },
      { de: "obligatorisch", tr: "zorunlu" },
    ],
    minutes: 8,
    text:
      "Uf de erschte Loonabrächnig staat es Dutzend Abkürzige, und di mäischte Lüüt frooged nie nach. Das lohnt sich aber, well zwo devo direkt beeinflussbar sind.\n\nAHV/IV/EO: 5,3 Prozänt vom Bruttoloon. De Arbetgeber zaalt gliich vill dezue. Das isch di erschti Süüle, also d staatlichi Rente. Si isch für alli gliich uufbaut und nöd verhandelbar.\n\nALV: 1,1 Prozänt für d Arbetslosigkäitsversicherig. Au hier zaalt de Arbetgeber d Hälfti.\n\nBVG (Pensionskasse): Das isch di zwäiti Süüle, und do wird s interessant. De Biitrag hänkt vom Alter ab und schtiigt mit de Jaar. Wichtig isch de Koordinationsabzug: Nöd de ganz Loon isch versicheret, sondern nur de Täil über öppe 26'000 Franke. Wär Tiilzitt schafft, verlüürt drum überproportional — vill Firme händ das underdesse gänderet, aber nöd alli. Do lohnt sich frooge.\n\nNBU: Nicht-Berufsunfall. Zaalt de Arbetnehmer sälber, öppe 1 bis 2 Prozänt.\n\nQuellestüür: Nur bi gwüsse Bewilligige. Si ersetzt d Stüürerklärig — bis zu eme Iikomme vo 120'000. Drüber mues me trotzdem e Erklärig mache.\n\nDe zwäit Punkt, wo me beeinflusse cha, isch di dritti Süüle (3a): freiwillig, mit Stüürabzug. Wär ihn nöd nutzt, verschänkt jedes Jaar Gäld — bi eme mittlere Iikomme öppe 1'500 bis 2'000 Franke Stüüre.",
    questions: [
      {
        text: "Wär zaalt d AHV?",
        options: [
          "Arbetnehmer und Arbetgeber je 5,3 Prozänt",
          "Nur de Arbetnehmer",
          "Nur de Arbetgeber",
        ],
        answer: 0,
        explain: "İşveren aynı tutarı ekliyor.",
      },
      {
        text: "Was isch de Koordinationsabzug?",
        options: [
          "Nur de Loonteil über öppe 26'000 isch versicheret",
          "En Abzug für Verhiirati",
          "E Gebüür vo de Pensionskasse",
        ],
        answer: 0,
        explain: "Bu yüzden yarı zamanlı çalışan orantısız kaybediyor.",
      },
      {
        text: "Wär verlüürt bim Koordinationsabzug am mäischte?",
        options: ["Wär Tiilzitt schafft", "Wär vill verdient", "Ältere Aagschtellti"],
        answer: 0,
        explain: "Metin ayrıca sormaya değer olduğunu söylüyor — bazı firmalar düzeltmiş.",
      },
      {
        text: "Bis zu welem Iikomme ersetzt d Quellestüür d Stüürerklärig?",
        options: ["120'000", "26'000", "Immer"],
        answer: 0,
        explain: "Üzerinde beyanname yine gerekiyor.",
      },
      {
        text: "Warum isch di dritti Süüle wichtig?",
        options: [
          "Si isch freiwillig, aber spart jedes Jaar Stüüre",
          "Si isch obligatorisch",
          "Si ersetzt d AHV",
        ],
        answer: 0,
        explain: "Orta gelirde yılda yaklaşık 1.500–2.000 frank vergi tasarrufu.",
      },
    ],
  },
  {
    id: "zh-b2-r9",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "D Schwiiz und Europa",
    genre: "Açıklayıcı yazı",
    intro:
      "İsviçre AB üyesi değil ama tam ortasında. Bu ilişkinin neden bu kadar karmaşık olduğunu anlatan bir yazı.",
    gloss: [
      { de: "de Biilaterale Wäg", tr: "ikili anlaşmalar yolu" },
      { de: "de Bertrag", tr: "anlaşma" },
      { de: "de Binnemärt", tr: "iç pazar" },
      { de: "d Persoonefreizügigkäit", tr: "serbest dolaşım" },
      { de: "d Guillotine-Klausel", tr: "giyotin maddesi (biri düşerse hepsi düşer)" },
      { de: "d Souveränität", tr: "egemenlik" },
      { de: "nachvollzieh", tr: "sonradan uyum sağlamak" },
      { de: "d Sackgass", tr: "çıkmaz" },
      { de: "d Unsicherheit", tr: "belirsizlik" },
    ],
    minutes: 8,
    text:
      "D Schwiiz isch nöd i de EU — und trotzdem enger mit ere verbunde als mängs Mitgliedsland. Das tönt widersprüchlich und isch s au.\n\nS System heisst biilaterale Wäg. Statt eme Beitritt git s über hundert einzelni Verträg: Persoonefreizügigkäit, Landverchehr, Forschig, technischi Handelshemmnis. Zäme gänd si de Schwiizer Firme fascht de gliich Zuegang zum Binnemärt wie eme Mitglied.\n\nDe Priis isch weniger sichtbar. Erschtens git s d Guillotine-Klausel: Wär äine vo de sibe Verträg vo 1999 kündigt, bringt automatisch alli zum Falle. Das schränkt de politisch Spielruum stark ii — au wänn s Volch e einzelni Frag anders entschäidet.\n\nZwäitens mues d Schwiiz vill EU-Recht nachvollzieh, ohni bim Uusarbeite debii z sii. Kritiker nänned das „Recht übernää ohni mitzredde“. Befürworter antwortet: Genau das isch de Priis vom Zuegang, und er isch günschtiger als Isolation.\n\nSiit Jaare stoot d Verhandlig über es institutionells Abkomme im Zäntrum. D EU wott klari Regle, wie nöis Recht übernoo und Streit entschide wird. Für vill Schwiizer berüehrt das d Souveränität; für vill Firme isch d Unsicherheit s grösser Problem als jede Kompromiss.\n\nDe Text will kä Antwort gää. Er will nur zäige, warum d Debatte nöd zwüsche „defür“ und „degäge“ verlauft, sondern zwüsche verschiidene Vorstellige devo, was Unabhängigkäit i me chliine Land überhaupt häisst.",
    questions: [
      {
        text: "Was isch de biilaterale Wäg?",
        options: [
          "Statt eme Beitritt über hundert einzelni Verträg",
          "E Mitgliedschaft zwäiter Klass",
          "En Vertrag mit Tüütschland",
        ],
        answer: 0,
        explain: "Sonuç: iç pazara neredeyse üye gibi erişim.",
      },
      {
        text: "Was bewirkt d Guillotine-Klausel?",
        options: [
          "Wär äine Vertrag kündigt, bringt alli zum Falle",
          "Si erlaubt schnelli Kündigung",
          "Si schützt d Landwirtschaft",
        ],
        answer: 0,
        explain: "Siyasi hareket alanını ciddi biçimde daraltıyor.",
      },
      {
        text: "Was meined d Kritiker mit „Recht übernää ohni mitzredde“?",
        options: [
          "D Schwiiz mues EU-Recht nachvollzieh, ohni bim Uusarbeite debii z sii",
          "D EU beschliesst Schwiizer Gsetz",
          "D Schwiiz darf nöd abschtimme",
        ],
        answer: 0,
        explain: "Savunucular bunun erişimin bedeli olduğunu söylüyor.",
      },
      {
        text: "Was wott d EU im institutionelle Abkomme?",
        options: [
          "Klari Regle für d Übernaam vo nöiem Recht und für Streitfäll",
          "En Beitritt vo de Schwiiz",
          "Höcheri Zöll",
        ],
        answer: 0,
        explain: "İsviçre tarafında bu egemenlik tartışmasına dönüşüyor.",
      },
      {
        text: "Was isch s Ziel vom Text?",
        options: [
          "Zäige, warum d Debatte nöd zwüsche defür und degäge verlauft",
          "Für en Beitritt argumentiere",
          "Gäge d Verträg argumentiere",
        ],
        answer: 0,
        explain: "Son paragraf bunu açıkça söylüyor.",
      },
    ],
  },
  {
    id: "zh-b2-r10",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "Vier Meinige zum Dienschtjaar",
    genre: "Sınav formatı",
    intro:
      "Aynı konuda dört görüş — kısmen örtüşüyorlar. Kimin neyi kabul edip neyi reddettiğini ayır.",
    gloss: [
      { de: "s Dienschtjaar", tr: "hizmet yılı" },
      { de: "de Zivildienscht", tr: "sivil hizmet" },
      { de: "d Pflicht", tr: "zorunluluk" },
      { de: "freiwillig", tr: "gönüllü" },
      { de: "de Zämehalt", tr: "toplumsal bağ" },
      { de: "d Belaschtig", tr: "yük" },
      { de: "d Grächtigkäit", tr: "adalet" },
      { de: "iischränke", tr: "kısıtlamak" },
    ],
    minutes: 6,
    text:
      "Thema: Sölled alli — Fraue und Männer — es Dienschtjaar leischte?\n\nNORA (Studentin): Ich bi defür, aber nöd us militärische Gründ. Mir händ es Problem mit em Zämehalt: Mir wohned neb enand und rededed nöd mitenand. Es Jaar, wo alli öppis für d Gsellschaft mached, wär s einzige Ort, wo sich Lüüt begägned, wo sich susch nie träffed. Militär oder Pflege isch mir egal.\n\nMARKUS (Unternehmer): Ich bi degäge, und zwar wäge de Choschte. Es ganzes Jaar us em Arbetsmärt — für e ganzi Generation. Mir händ scho hüt z wenig Fachlüüt. Wär das fordered, mues au säge, wär s zaalt.\n\nSELIN (Pflegefachfrau): Ich bi teilwiis defür. Aber ich warne devor, d Pflege als Lückebüesser z bruuche. Junge Lüüt, wo es Jaar bliibed und käi Uusbildig händ, entlaschted üs nöd — si bruuched Betreuig. Wänn me s macht, denn richtig: mit Uusbildig und Bezaalig.\n\nTOBIAS (Rekrutierigsoffizier): Ich bi skeptisch. S Militär bruucht nöd meh Lüüt, es bruucht di richtige. E Pflicht für alli produziert Lüüt, wo nöd wänd — und die kosted meh, als si bringed. Freiwilligkäit funktioniert bi eus besser, als di mäischte dänked.",
    questions: [
      {
        text: "Wär begründet d Zueschtimmig mit em gsellschaftliche Zämehalt?",
        options: ["Nora", "Selin", "Tobias"],
        answer: 0,
        explain: "Askerî gerekçeyi açıkça reddediyor.",
      },
      {
        text: "Welles Argumänt bringt de Markus?",
        options: [
          "D wirtschaftliche Choschte und de Fachchräftemangel",
          "D Ungrächtigkäit",
          "D Qualität vo de Uusbildig",
        ],
        answer: 0,
        explain: "„Wär das fordered, mues au säge, wär s zaalt.“",
      },
      {
        text: "Wovor warnt d Selin?",
        options: [
          "D Pflege als Lückebüesser z bruuche",
          "Vor z wenig Freiwillige",
          "Vor de Choschte",
        ],
        answer: 0,
        explain: "Eğitimsiz gençler yük hafifletmiyor, bakım gerektiriyor.",
      },
      {
        text: "Wär isch teilwiis defür, aber mit Bedingige?",
        options: ["Selin", "Markus", "Tobias"],
        answer: 0,
        explain: "„Wänn me s macht, denn richtig: mit Uusbildig und Bezaalig.“",
      },
      {
        text: "Wie argumentiert de Tobias?",
        options: [
          "S Militär bruucht di richtige Lüüt, nöd meh Lüüt",
          "S Militär bruucht dringend meh Lüüt",
          "D Pflicht isch verfassigswidrig",
        ],
        answer: 0,
        explain: "İstemeyenler getirdiğinden fazlasına mal oluyor.",
      },
    ],
  },
  {
    id: "zh-b2-r11",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "D Absaag — und was drin staat",
    genre: "Yazışma",
    intro:
      "Hikâyenin devamı: Amina yedi ret aldı. Bu ikisi arasındaki fark, iş arayan herkesin bilmesi gerekeni gösteriyor.",
    gloss: [
      { de: "d Absaag", tr: "ret" },
      { de: "d Bewärbig", tr: "başvuru" },
      { de: "de Iidruck", tr: "izlenim" },
      { de: "d Rückmäldig", tr: "geri bildirim" },
      { de: "d Dossierprüefig", tr: "dosya incelemesi" },
      { de: "konkret", tr: "somut" },
      { de: "d Empfehlig", tr: "tavsiye" },
      { de: "sich mälde", tr: "haber vermek" },
    ],
    minutes: 7,
    text:
      "ABSAAG 1 — Drogerie Wettstein\n\nGuete Tag Frau Bekele\n\nBesten Dank für Ihri Bewärbig als Drogistin EFZ. Mir händ üs für e anderi Kandidatin entschide.\n\nMir wünsched Ine für d Zuekunft alles Guete.\n\nFründlichi Grüess\nPersonaldienscht\n\n\nABSAAG 2 — Apotheke am Limmatplatz\n\nGuete Tag Frau Bekele\n\nMir händ Ihri Bewärbig sorgfältig aagluegt und üs schwer taa. Am Schluss händ mir e Kandidatin gnoo, wo scho es Jaar i de Branche gschafft hät.\n\nWil Si üs bi de Schnupperlehr uufgfalle sind, schriib ich Ine meh als üblich:\n\nIhri Stärchi isch de Umgang mit Lüüt. D Frau Kern hät gsäit, Si heiged Chunde zuegloost, wo süsch niemert zuelost. Das cha me nöd lerne.\n\nWas Ihri Bewärbig schwächt: S Motivationsschriibe isch sehr allgemäin. Si schriibed, Si «intressiered sich für Gsundheit» — das schriibed alli. Ihres Erläbnis mit em Dosiere, wo Si im Schnupperbricht beschriibed, chunt im Schriibe gar nöd vor. Genau das wär interessant gsii.\n\nMir händ im Auguscht wider e Lehrstell offe. Ich würd mich fröie, wänn Si sich nomal mälded — und ich stand für e Frag zur Verfüegig.\n\nFründlichi Grüess\nB. Kern",
    questions: [
      {
        text: "Was isch de formal Underschid zwüsche de zwo Absääge?",
        options: [
          "Di zwäit git konkreti Rückmäldig",
          "Di erschti isch persönlicher",
          "Di zwäit isch churzer",
        ],
        answer: 0,
        explain: "Birincisi standart bir ret, ikincisi gerekçeli.",
      },
      {
        text: "Warum hät d Apotheke e anderi Kandidatin gnoo?",
        options: [
          "Si hät scho es Jaar Branchenerfaarig",
          "Si isch günschtiger",
          "Amina hät s Gspröch verpasst",
        ],
        answer: 0,
        explain: "Karar zor olmuş ama deneyim belirleyici.",
      },
      {
        text: "Welli Stärchi wird gnennt?",
        options: [
          "De Umgang mit Lüüt — si lost zue",
          "S Fachvokabular",
          "S Tempo",
        ],
        answer: 0,
        explain: "„Das cha me nöd lerne.“",
      },
      {
        text: "Was kritisiert d Frau Kern am Motivationsschriibe?",
        options: [
          "Es isch allgemäin — s Persönliche fählt",
          "Es isch z lang",
          "Es hät Fähler",
        ],
        answer: 0,
        explain: "Herkesin yazdığı cümleler var; asıl ilginç deneyim yazıya girmemiş.",
      },
      {
        text: "Was büütet si aa?",
        options: [
          "E nöii Lehrstell im Auguscht und Bereitschaft für Frage",
          "En Praktikumsplatz",
          "E Empfehlig a e anderi Apothek",
        ],
        answer: 0,
        explain: "„Ich würd mich fröie, wänn Si sich nomal mälded.“",
      },
    ],
  },
  {
    id: "zh-b2-r12",
    course: "gsw-zh",
    level: "B2",
    skill: "reading",
    title: "Di drei Süüle",
    genre: "Rehber",
    intro:
      "İsviçre emeklilik sistemi üç sütun üzerine kuruludur — ve üçüncüsü kimsenin anlatmadığı vergi avantajıdır.",
    gloss: [
      { de: "d Vorsorg", tr: "emeklilik/geleceğe hazırlık" },
      { de: "d Süüle", tr: "sütun" },
      { de: "d Existänzsicherig", tr: "asgari geçim güvencesi" },
      { de: "d Lebensschtandard", tr: "yaşam standardı" },
      { de: "de Bezug", tr: "çekim, ödeme alma" },
      { de: "s Wohneigentum", tr: "konut mülkiyeti" },
      { de: "de Stüürabzug", tr: "vergi indirimi" },
      { de: "sperre", tr: "bloke etmek" },
      { de: "d Lücke", tr: "boşluk, açık" },
    ],
    minutes: 8,
    text:
      "Di erschti Süüle (AHV) isch staatlich und obligatorisch. Si söll d Existänz sichere — nöd meh. E maximali AHV-Rente lit bi öppe 2'520 Franke im Monet. Wär nur die hät, chunt z Züri nöd dure.\n\nDi zwäiti Süüle (Pensionskasse, BVG) isch obligatorisch ab eme Jaresloon vo 22'680 Franke. Zäme mit de AHV söll si öppe 60 Prozänt vom letschte Loon erreiche. S Gäld ghört eim, aber me chunt normalerwiis nöd dra — mit zwo Uusnaame: Wär Wohneigentum chauft oder sich sälbständig macht, cha s vorbezieh.\n\nDi dritti Süüle (3a) isch freiwillig und stüürlich privilegiert. Wär aagschtellt isch, cha 2025 bis 7'258 Franke im Jaar iizaale und dää Betrag vom stüürbare Iikomme abzieh. S Gäld isch bis füf Jaar vor de Pensionierig gsperrt.\n\nBsunders wichtig isch das für zwo Gruppe. Erschtens für Lüüt mit Lücke i de zwäite Süüle: Wär e Ziit im Uusland gschafft hät oder Tiilzitt arbetet, hät automatisch weniger. Zwäitens für Fraue: Underbrüch wäge Chind wirked sich direkt uf d Rente uus, und de Koordinationsabzug trifft tiefi Pänsum zuesätzlich.\n\nEs praktischs Detail, wo vill nöd wüssed: Es lohnt sich, meh als äi 3a-Konto z haa. Bim Bezug wird jedes Konto einzeln bestüüret, und well de Stüürsatz progressiv isch, zaalt me mit drei chliinere Konte deutlich weniger als mit eme grosse.",
    questions: [
      {
        text: "Was isch s Ziel vo de erschte Süüle?",
        options: [
          "D Existänz sichere, nöd meh",
          "De Lebensschtandard erhalte",
          "Wohneigentum ermögliche",
        ],
        answer: 0,
        explain: "Azami emekli aylığı yaklaşık 2.520 frank — Zürih'te yetmiyor.",
      },
      {
        text: "Wänn cha me d zwäiti Süüle vorbezieh?",
        options: [
          "Bi Wohneigentum oder Sälbständigkäit",
          "Jederziit",
          "Nur bi Uuswanderig",
        ],
        answer: 0,
        explain: "Metin bu iki istisnayı veriyor.",
      },
      {
        text: "Was isch de Vortäil vo de dritte Süüle?",
        options: [
          "Iizaalige chan me vom stüürbare Iikomme abzieh",
          "Si isch obligatorisch",
          "Me chunt jederziit dra",
        ],
        answer: 0,
        explain: "Para emeklilikten beş yıl öncesine kadar bloke.",
      },
      {
        text: "Warum trifft s Fraue bsunders?",
        options: [
          "Underbrüch und tiefi Pänsum senked d Rente direkt",
          "Si zaaled höcheri Biiträg",
          "Si dörfed käi 3a haa",
        ],
        answer: 0,
        explain: "Koordinasyon indirimi düşük çalışma oranını ayrıca vuruyor.",
      },
      {
        text: "Warum lohnt sich meh als äi 3a-Konto?",
        options: [
          "Jedes Konto wird einzeln bestüüret und de Satz isch progressiv",
          "Well d Zinse höcher sind",
          "Well me schnäller dra chunt",
        ],
        answer: 0,
        explain: "Üç küçük hesap tek büyük hesaptan belirgin biçimde az vergi doğuruyor.",
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
    id: "zh-b2-l7",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "S Gspröch für d Lehrstell",
    genre: "İş görüşmesi",
    intro:
      "Hikâyenin devamı: Amina ikinci kez başvurdu ve görüşmeye çağrıldı. Geri bildirimi nasıl kullandığına dikkat et.",
    gloss: [
      { de: "s Bewärbigsgspröch", tr: "iş görüşmesi" },
      { de: "d Motivation", tr: "motivasyon" },
      { de: "d Verantwortig", tr: "sorumluluk" },
      { de: "de Respäkt", tr: "saygı, çekince" },
      { de: "iischtiige", tr: "başlamak" },
      { de: "d Berufsschuel", tr: "meslek okulu" },
      { de: "d Probeziit", tr: "deneme süresi" },
      { de: "sich mälde", tr: "haber vermek" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Frau Kern",
        text: "Frau Bekele, schön sind Si wider da. Si händ sich s zwäite Mal beworbe — was isch anders?",
      },
      {
        speaker: "Amina",
        text: "S Schriibe. Si händ mer gsäit, s seig z allgemäin gsii. Ich han s neu gschriibe und drin verzellt, was mich bim Schnuppere würkli bewegt hät.",
      },
      { speaker: "Frau Kern", text: "Nämli?" },
      {
        speaker: "Amina",
        text: "S Dosiere. Ich han Respäkt devor gha — und genau drum wott ich s lerne. Ich han gmerkt, dass mir Sache mit Verantwortig meh gäbed als Sache ohni.",
      },
      {
        speaker: "Frau Kern",
        text: "Das isch e gueti Antwort. Jetz e unaagnämi Frag: Ihri Note i de Mathematik sind mittelmässig. I dem Bruef rächne mir jede Tag.",
      },
      {
        speaker: "Amina",
        text: "Das schtimmt. Ich han im letschte Jaar e Vier-fünf gha. Ich han sitdem Nachhilf gnoo und im letschte Zügnis e Füüfi. Ich cha Ine s Zügnis zäige.",
      },
      { speaker: "Frau Kern", text: "Das interessiert mich meh als di erschti Note. Warum?" },
      {
        speaker: "Amina",
        text: "Well me dra gschaffet hät. Es zäigt, öb öpper e Schwächi aaluegt oder nöd.",
      },
      {
        speaker: "Frau Kern",
        text: "Genau. Letschti Frag: D Berufsschuel isch äi Tag i de Wuche, und im erschte Jaar isch s vill. Was mached Si, wänn Si merked, dass Si nöd hinderher chömed?",
      },
      {
        speaker: "Amina",
        text: "Sofort säge. Nöd am Schluss vom Semeschter, wänn s scho z spaat isch.",
      },
      {
        speaker: "Frau Kern",
        text: "Si überchömed vo mir bis am Friitig Bschäid. Und unabhängig devo: Das Gspröch isch deutlich besser gsii als di erschti Bewärbig.",
      },
    ],
    questions: [
      {
        text: "Was hät d Amina bi de zwäite Bewärbig gänderet?",
        options: [
          "S Motivationsschriibe — konkret statt allgemäin",
          "D Schuel",
          "S Berufsziel",
        ],
        answer: 0,
        explain: "Geri bildirimi doğrudan uygulamış.",
      },
      {
        text: "Wie begründet si ihres Interässe am Dosiere?",
        options: [
          "Sache mit Verantwortig gäbed ihre meh",
          "Es isch äifach",
          "Es isch guet bezaalt",
        ],
        answer: 0,
        explain: "Çekindiği şeyi öğrenme gerekçesine dönüştürüyor.",
      },
      {
        text: "Wie gaat si mit de Frag zu de Mathematik-Note um?",
        options: [
          "Si gitt s zue und zäigt d Verbesserig",
          "Si widerspricht",
          "Si wächslet s Thema",
        ],
        answer: 0,
        explain: "4,5'ten 5'e; karneyi göstermeyi öneriyor.",
      },
      {
        text: "Was interessiert d Frau Kern am mäischte?",
        options: [
          "Dass si a de Schwächi gschaffet hät",
          "Di erschti Note",
          "D Nachhilf-Firma",
        ],
        answer: 0,
        explain: "„Es zäigt, öb öpper e Schwächi aaluegt oder nöd.“",
      },
      {
        text: "Was säit d Amina zur Belaschtig i de Berufsschuel?",
        options: [
          "Si würd s sofort säge, nöd am Ändi vom Semeschter",
          "Si würd meh lerne",
          "Si würd d Schuel wächsle",
        ],
        answer: 0,
        explain: "„wänn s scho z spaat isch.“",
      },
    ],
  },
  {
    id: "zh-b2-l8",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "Bim Berufsberater",
    genre: "Danışma",
    intro:
      "İsviçre'de ücretsiz bir hizmet: meslek danışmanlığı. Danışmanın nasıl soru sorduğuna dikkat et.",
    gloss: [
      { de: "d Berufsberatig", tr: "meslek danışmanlığı" },
      { de: "de Zwüscheweg", tr: "ara yol" },
      { de: "s Brückeaagebot", tr: "geçiş yılı programı" },
      { de: "d Alternative", tr: "alternatif" },
      { de: "de Notfallplan", tr: "acil durum planı" },
      { de: "d Durchlässigkäit", tr: "geçişkenlik" },
      { de: "abklääre", tr: "netleştirmek" },
      { de: "d Frischt", tr: "süre" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Berater", text: "Sibe Absääge. Wie gaat s Ine demit?" },
      { speaker: "Amina", text: "Schlächt. Ich han underdesse s Gfüel, es lit a mir." },
      {
        speaker: "Berater",
        text: "Verständlich. Trotzdem: Uf e Lehrstell i de Apothek chömed im Kanton Züri öppe zwölf Bewärbige. Bi sibe Absääge sind Si statistisch no ganz normal underwägs.",
      },
      { speaker: "Amina", text: "Das hilft mer ehrlich gsäit nöd sehr." },
      {
        speaker: "Berater",
        text: "Verstand ich. Reded mer über de Plan B — nöd well de Plan A gschtorbe isch, sondern damit Si nöd unter Druck entschäided.",
      },
      { speaker: "Amina", text: "Welli Möglichkäite han ich?" },
      {
        speaker: "Berater",
        text: "Drei. Erschtens: es Brückeaagebot, es Jaar mit Schuel und Praktikum. Zwäitens: e verwandti Lehr — Drogerie, Fachfrau Gsundheit. Drittens: es Zwüschejaar mit Arbet, aber das würd ich nur mit eme klare Ziel mache.",
      },
      { speaker: "Amina", text: "Isch es Brückeaagebot nöd es verlorenes Jaar?" },
      {
        speaker: "Berater",
        text: "Das isch di häufigscht Angscht, und d Zaale säged s Gägetäil: Öppe achtzg Prozänt finded danach e Lehrstell. Betriib gsend, dass öpper dra bliibe isch.",
      },
      { speaker: "Amina", text: "Und wänn ich im Auguscht doch e Zuesaag überchume?" },
      {
        speaker: "Berater",
        text: "Denn nämed Si si und sääged s Brückeaagebot ab. Das isch kä Problem — melde Si sich äifach früeh. Wichtig isch nur, dass Si sich jetz aamälded: D Frischt isch Ändi Februar.",
      },
    ],
    questions: [
      {
        text: "Wie reagiert de Berater uf ihres Gfüel?",
        options: [
          "Er nimmt s ernscht und stellt d Zaale dernäbe",
          "Er säit, si söll positiv dänke",
          "Er widerspricht ere",
        ],
        answer: 0,
        explain: "Aynı zamanda „das hilft mer nöd sehr“ cevabını da kabul ediyor.",
      },
      {
        text: "Warum wott er über de Plan B rede?",
        options: [
          "Damit si nöd unter Druck entschäidet",
          "Well de Plan A gschtorbe isch",
          "Well d Frischt abglaufe isch",
        ],
        answer: 0,
        explain: "Bunu açıkça ayırıyor.",
      },
      {
        text: "Welli drei Möglichkäite nennt er?",
        options: [
          "Brückeaagebot, verwandti Lehr, Zwüschejaar mit Ziel",
          "Gymi, Praktikum, Uusland",
          "Warte, jobbe, nomal bewärbe",
        ],
        answer: 0,
        explain: "Üçüncüsünü yalnızca net bir hedefle öneriyor.",
      },
      {
        text: "Was säit er zur Angscht vor eme verlorene Jaar?",
        options: [
          "Öppe 80 Prozänt finded danach e Lehrstell",
          "Si isch berächtigt",
          "S hänkt vom Betrieb ab",
        ],
        answer: 0,
        explain: "İşletmeler kişinin pes etmediğini görüyor.",
      },
      {
        text: "Was mues si jetz mache?",
        options: [
          "Sich bis Ändi Februar für s Brückeaagebot aamälde",
          "Uf d Zuesaag warte",
          "D Bewärbige stoppe",
        ],
        answer: 0,
        explain: "Sonradan iptal etmek sorun değil.",
      },
    ],
  },
  {
    id: "zh-b2-l9",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "Vortrag: Warum mir Nachrichte miided",
    genre: "Sınav formatı",
    intro:
      "Uzun format: bir konuşma ve içerik soruları. Not alarak dinlemeyi dene.",
    gloss: [
      { de: "d Nachrichtevermiidig", tr: "haberden kaçınma" },
      { de: "de Aateil", tr: "oran" },
      { de: "d Oomacht", tr: "çaresizlik" },
      { de: "d Wiederholig", tr: "tekrar" },
      { de: "d Iiordnig", tr: "bağlama oturtma" },
      { de: "s Handligswüsse", tr: "ne yapılabileceği bilgisi" },
      { de: "d Iischränkig", tr: "sınırlama, çekince" },
      { de: "überinterpretiere", tr: "aşırı yorumlamak" },
    ],
    minutes: 7,
    segments: [
      {
        speaker: "Referentin",
        text: "Ich fang mit ere Zaal aa: I de Schwiiz säit underdesse öppe es Drittel vo de Befragte, si gäng de Nachrichte bewusst us em Wäg. Vor zää Jaar isch s halb so vill gsii.",
      },
      {
        speaker: "Referentin",
        text: "Di naheliegendi Erklärig wär Desinterässe. Si isch falsch. D Gruppe, wo am stärchschte miidet, isch nöd di uninteressierti, sondern di belaschteti: Lüüt mit wenig Ziit, wenig Gäld und wenig Kontrolle über ihri Lag.",
      },
      {
        speaker: "Referentin",
        text: "I de Interviews chunt immer wider s gliiche Wort: Oomacht. Nöd „Ich verstaan s nöd“, sondern „Ich cha sowiso nüüt mache“.",
      },
      {
        speaker: "Referentin",
        text: "De zwäit Grund isch d Wiederholig. Wär de gliich Konflikt jede Tag i de gliiche Form gseet, ohni dass sich d Information ändert, lernt nüüt dezue — er gspürt nur wider s Gliiche. S Hirn nennt das Belaschtig, nöd Wüsse.",
      },
      {
        speaker: "Referentin",
        text: "Was hilft, isch guet undersuecht und wird sälte gmacht. Erschtens Iiordnig: nöd nur was passiert isch, sondern warum und was drus folgt. Zwäitens Handligswüsse: Was chönd Betroffeni konkret tue? Drittens, und das isch unbequem: weniger, aber vollständiger berichte.",
      },
      {
        speaker: "Referentin",
        text: "Ich säg uusdrücklich nöd: nur gueti Nachrichte. Das isch di schlächtischti Antwort uf es ächts Problem. D Lüüt miided Nachrichte nöd, will si schlächt sind, sondern will si folgelos wirked.",
      },
      {
        speaker: "Referentin",
        text: "Und e Iischränkig: Üsi Date chömed us Befragige. Was d Lüüt über ihres Verhalte säged, isch nöd immer das, wo si mached. D Richtig isch stabil, di genaui Höchi würd ich vorsichtig zitiere.",
      },
    ],
    questions: [
      {
        text: "Wie hät sich d Nachrichtevermiidig entwicklet?",
        options: [
          "Si hät sich i zää Jaar öppe verdopplet",
          "Si isch gliich bliibe",
          "Si isch gsunke",
        ],
        answer: 0,
        explain: "Bugün üçte bir; on yıl önce yarısı kadardı.",
      },
      {
        text: "Welli Erklärig wiist d Referentin zrugg?",
        options: ["Desinterässe", "Ziitmangel", "Oomacht"],
        answer: 0,
        explain: "En çok kaçınan grup ilgisizler değil, yükü ağır olanlar.",
      },
      {
        text: "Was isch s Problem a de Wiederholig?",
        options: [
          "Ohni nöii Information entstaat Belaschtig statt Wüsse",
          "D Biiträg sind z lang",
          "D Theme sind z schwiirig",
        ],
        answer: 0,
        explain: "Metin bunu doğrudan söylüyor.",
      },
      {
        text: "Was lehnt si uusdrücklich ab?",
        options: [
          "Nur gueti Nachrichte z berichte",
          "Weniger z berichte",
          "Handligswüsse z gää",
        ],
        answer: 0,
        explain: "„di schlächtischti Antwort uf es ächts Problem.“",
      },
      {
        text: "Welli Iischränkig nennt si sälber?",
        options: [
          "Befragigsdate bilded s Verhalte nöd exakt ab",
          "D Stichprob isch z chlii",
          "D Studie isch alt",
        ],
        answer: 0,
        explain: "Yön istikrarlı ama kesin oranı alıntılamakta temkinli.",
      },
    ],
  },
  {
    id: "zh-b2-l10",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "Podium: Isch d Lehr no zäitgemäss?",
    genre: "Panel",
    intro:
      "İsviçre'nin en çok gurur duyduğu sistem tartışılıyor. Kimin nerede taviz verdiğini izle.",
    gloss: [
      { de: "zäitgemäss", tr: "çağa uygun" },
      { de: "d Akademisierig", tr: "akademikleşme" },
      { de: "d Durchlässigkäit", tr: "geçişkenlik" },
      { de: "de Abschluss", tr: "diploma" },
      { de: "d Automatisierig", tr: "otomasyon" },
      { de: "s Vorurtäil", tr: "önyargı" },
      { de: "iiraume", tr: "kabul etmek" },
      { de: "de Handligsbedarf", tr: "yapılması gereken" },
    ],
    minutes: 7,
    segments: [
      {
        speaker: "Moderator",
        text: "Frau Blattner, Si fordered, dass meh Jugendlichi as Gymi gönd. Warum?",
      },
      {
        speaker: "Blattner",
        text: "Well d Arbetswelt sich schnäller ändert als es Berufsbild. Wär mit fufzäh en Bruef wählt, wählt villicht öppis, wo s i zwänzg Jaar nüme git. E breiti Bildig schützt besser.",
      },
      { speaker: "Moderator", text: "Herr Nussbaumer?" },
      {
        speaker: "Nussbaumer",
        text: "Das Argumänt tönt guet und isch empirisch schwach. D Lehr isch nöd es Bruefsurtäil uf Läbesziit — vierzig Prozänt vo de Lehrabgänger schaffed zää Jaar spöter i me andere Feld. Was bliibt, isch d Fähigkäit z schaffe: Termine, Chunde, Verantwortig. Das lernt me im Gymi nöd.",
      },
      {
        speaker: "Blattner",
        text: "Dää Punkt raum ich ii. Was ich nöd iiraume, isch di soziali Sälektion. Chind vo Akademiker gönd bi gliiche Note deutlich hüüfiger as Gymi. Das isch nöd Talänt, das isch Herkunft.",
      },
      {
        speaker: "Nussbaumer",
        text: "Und do bin ich bi Ine. Das isch de gröscht Handligsbedarf, wo mir händ. Aber d Antwort isch nöd, d Lehr abzwerte — sondern d Durchlässigkäit ernscht z nää. Berufsmatur mues gliichwertig sii, nöd es Trostpreis.",
      },
      { speaker: "Moderator", text: "Und d Automatisierig?" },
      {
        speaker: "Nussbaumer",
        text: "Trifft bäidi Wäg. Es git kä Uusbildig, wo dervor schützt.",
      },
      {
        speaker: "Blattner",
        text: "Do sind mir üs einig. Villicht isch d Frag falsch gstellt: Nöd Lehr oder Gymi, sondern öb öpper mit zwänzg no cha wächsle, ohni vo vorne aazfange.",
      },
    ],
    questions: [
      {
        text: "Wie begründet d Blattner meh Gymi?",
        options: [
          "D Arbetswelt ändert schnäller als es Berufsbild",
          "S Gymi seig günschtiger",
          "D Lehr seig z schwierig",
        ],
        answer: 0,
        explain: "Geniş eğitimin daha iyi koruduğunu savunuyor.",
      },
      {
        text: "Wie kontert de Nussbaumer?",
        options: [
          "Vierzig Prozänt vo de Lehrabgänger wächsled s Feld — d Lehr isch käi Urtäil uf Läbesziit",
          "D Zaale seiged falsch",
          "S Gymi seig z theoretisch",
        ],
        answer: 0,
        explain: "Kalanın çalışma becerisi olduğunu söylüyor.",
      },
      {
        text: "Welle Punkt raumt d Blattner ii?",
        options: [
          "Dass d Lehr d Fähigkäit z schaffe vermittlet",
          "Dass s Gymi überflüssig isch",
          "Dass d Sälektion käi Problem isch",
        ],
        answer: 0,
        explain: "„Dää Punkt raum ich ii.“",
      },
      {
        text: "Worin sind sich bäidi einig?",
        options: [
          "Bi de soziale Sälektion und bi de Automatisierig",
          "Bi de Abschaffig vom Gymi",
          "Bi de Löön",
        ],
        answer: 0,
        explain: "Nussbaumer „do bin ich bi Ine“ diyor; otomasyonda da hemfikirler.",
      },
      {
        text: "Wie formuliert d Blattner am Schluss d Frag nöi?",
        options: [
          "Öb öpper mit zwänzg no cha wächsle, ohni vo vorne aazfange",
          "Öb s Gymi gratis sii söll",
          "Öb d Lehr chürzer wärde söll",
        ],
        answer: 0,
        explain: "Tartışmayı „Lehr mi Gymi mi“ ikileminden çıkarıyor.",
      },
    ],
  },
  {
    id: "zh-b2-l11",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "Es Konfliktgspröch im Betrieb",
    genre: "Diyalog",
    intro:
      "İş yerinde bir çatışma nasıl konuşulur? İsviçre'de doğrudan olacaksın, ama karşındakini köşeye sıkıştırmadan.",
    gloss: [
      { de: "de Konflikt", tr: "çatışma" },
      { de: "de Vorwurf", tr: "suçlama" },
      { de: "sich aagriffe fühle", tr: "saldırıya uğramış hissetmek" },
      { de: "d Absicht", tr: "niyet" },
      { de: "aaschpräche", tr: "konuyu açmak" },
      { de: "klääre", tr: "açıklığa kavuşturmak" },
      { de: "zuegää", tr: "kabul etmek" },
      { de: "abmache", tr: "kararlaştırmak" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Lea", text: "Jonas, häsch churz Ziit? Ich wett öppis aaschpräche." },
      { speaker: "Jonas", text: "Klar. Tönt ernscht." },
      {
        speaker: "Lea",
        text: "Gestern a de Sitzig häsch gsäit, de Bricht seig „irgendwie unvollständig“. Ich han drü Täg dra gschaffet.",
      },
      { speaker: "Jonas", text: "Oh. Ich han di nöd wölle kritisiere." },
      {
        speaker: "Lea",
        text: "Das glaub ich der. Aber vor sibe Lüüt wirkt so en Satz anders als under üs.",
      },
      {
        speaker: "Jonas",
        text: "Do häsch rächt. Ich han a d Zaale usem Lager dänkt — die fähled ja würkli. Aber die häsch du gar nie übercho, oder?",
      },
      { speaker: "Lea", text: "Genau. Ich han zwäimal gfrogt und käi Antwort übercho." },
      {
        speaker: "Jonas",
        text: "Denn isch min Satz äifach falsch gsii. Ich säg das morn i de Rundi — churz, ohni Drama, aber ich säg s.",
      },
      { speaker: "Lea", text: "Merci. Und wänn der öppis uffallt, säg s mer gärn vorher." },
      { speaker: "Jonas", text: "Mached mer so. Ich schriib der denn äifach direkt." },
    ],
    questions: [
      {
        text: "Warum schpricht d Lea de Jonas aa?",
        options: [
          "Wäge ere Bemerkig a de Sitzig",
          "Wäge eme verpasste Termin",
          "Wäge de Ferieplanig",
        ],
        answer: 0,
        explain: "„irgendwie unvollständig“ cümlesi rahatsız etmiş.",
      },
      {
        text: "Was schtört si genau?",
        options: [
          "Dass er s vor sibe Lüüt gsäit hät",
          "Dass er s überhaupt gsäit hät",
          "Dass er nöd ghulfe hät",
        ],
        answer: 0,
        explain: "„vor sibe Lüüt wirkt so en Satz anders als under üs.“",
      },
      {
        text: "Was schtellt sich uus?",
        options: [
          "D Lea hät d fählende Zaale nie übercho",
          "Si hät si vergässe",
          "D Zaale sind falsch gsii",
        ],
        answer: 0,
        explain: "İki kez sormuş, cevap gelmemiş.",
      },
      {
        text: "Wie reagiert de Jonas?",
        options: [
          "Er gitt de Fähler zue und wott en öffentlich korrigiere",
          "Er verteidigt sich",
          "Er entschuldigt sich nur privat",
        ],
        answer: 0,
        explain: "„churz, ohni Drama, aber ich säg s.“",
      },
      {
        text: "Was mached si für d Zuekunft ab?",
        options: [
          "Kritik zerscht direkt, nöd i de Rundi",
          "Käi Kritik meh",
          "Alles schriftlich",
        ],
        answer: 0,
        explain: "„säg s mer gärn vorher.“",
      },
    ],
  },
  {
    id: "zh-b2-l12",
    course: "gsw-zh",
    level: "B2",
    skill: "listening",
    title: "De Vertrag isch da",
    genre: "Telefon",
    intro:
      "Hikâyenin sonu: Amina'nın telefonu çalıyor — ve konuşma beklediği yerde bitmiyor.",
    gloss: [
      { de: "d Zuesaag", tr: "olumlu cevap" },
      { de: "de Lehrvertrag", tr: "çıraklık sözleşmesi" },
      { de: "s Amt für Berufsbildig", tr: "meslek eğitimi dairesi" },
      { de: "unterschriibe", tr: "imzalamak" },
      { de: "d Probeziit", tr: "deneme süresi" },
      { de: "de Loon", tr: "ücret" },
      { de: "d Erwartig", tr: "beklenti" },
      { de: "sich fröie", tr: "sevinmek" },
    ],
    minutes: 6,
    segments: [
      { speaker: "Frau Kern", text: "Frau Bekele? Kern, Apotheke am Limmatplatz. Händ Si churz Ziit?" },
      { speaker: "Amina", text: "Ja … ja, sicher." },
      {
        speaker: "Frau Kern",
        text: "Mir wänd Ine d Lehrstell aabüüte. Ab em 1. Auguscht, Pharma-Assistentin EFZ, drei Jaar.",
      },
      { speaker: "Amina", text: "Würkli? Merci. Merci vilmal." },
      {
        speaker: "Frau Kern",
        text: "Gärn. Ich säg Ine aber au, warum — das isch mir wichtig. Nöd wäge de Note. Wäge de Antwort uf d Frag mit de Berufsschuel.",
      },
      { speaker: "Amina", text: "Wäge däm, dass ich s sofort säge würd?" },
      {
        speaker: "Frau Kern",
        text: "Genau. Mir händ scho Lehrlig gha, wo im Juni gsäit händ, si chömed siit Oktober nöd hinderher. Das isch s Problem, nöd d Note.",
      },
      { speaker: "Amina", text: "Wie gaat s jetz wiiter?" },
      {
        speaker: "Frau Kern",
        text: "Ich schick Ine de Lehrvertrag. Dää unterschriibed Si, Ihri Eltere au, well Si na nöd achzäh sind. Denn gaat er as Amt für Berufsbildig — ohni die Bewilligung isch er nöd gültig.",
      },
      { speaker: "Amina", text: "Und d Probeziit?" },
      {
        speaker: "Frau Kern",
        text: "Drei Mönet. Die isch für bäidi Siite da — au für Si. Wänn Si im Oktober merked, das isch nüt für Si, denn säged Si s. Das isch käi Katastrofe, sondern de Sinn vo de Probeziit.",
      },
      { speaker: "Amina", text: "Das han ich no nie so ghört." },
      { speaker: "Frau Kern", text: "Denn han ich hüt scho öppis Nützlichs gmacht. Bis im Auguscht!" },
    ],
    questions: [
      {
        text: "Was büütet d Frau Kern aa?",
        options: [
          "E Lehrstell als Pharma-Assistentin, drei Jaar",
          "Es Praktikum",
          "En Schnuppertag",
        ],
        answer: 0,
        explain: "1 Ağustos'tan itibaren, EFZ.",
      },
      {
        text: "Warum hät si sich für d Amina entschide?",
        options: [
          "Wäge de Antwort zur Berufsschuel",
          "Wäge de Note",
          "Wäge em Schnupperbricht",
        ],
        answer: 0,
        explain: "Sorunu geç söyleyen çıraklarla tecrübeleri olmuş.",
      },
      {
        text: "Wär mues de Vertrag unterschriibe?",
        options: [
          "Amina und ihri Eltere",
          "Nur Amina",
          "Nur de Betrieb",
        ],
        answer: 0,
        explain: "Henüz 18 yaşında değil.",
      },
      {
        text: "Warum mues de Vertrag as Amt?",
        options: [
          "Ohni Bewilligung isch er nöd gültig",
          "Wäge de Stüüre",
          "Für d Versicherig",
        ],
        answer: 0,
        explain: "Meslek eğitimi dairesinin onayı şart.",
      },
      {
        text: "Wie erklärt d Frau Kern d Probeziit?",
        options: [
          "Si isch für bäidi Siite — au Amina darf abbräche",
          "Si isch nur für de Betrieb",
          "Si duuret es Jaar",
        ],
        answer: 0,
        explain: "„sondern de Sinn vo de Probeziit.“",
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
  {
    id: "zh-b2-w5",
    course: "gsw-zh",
    level: "B2",
    skill: "writing",
    title: "S Motivationsschriibe",
    genre: "Başvuru",
    intro:
      "zh-b2-r11'deki geri bildirimin dersi: genel cümleler değil, tek somut deneyim. Onu yazacaksın.",
    gloss: [
      { de: "s Motivationsschriibe", tr: "motivasyon mektubu" },
      { de: "d Stärchi", tr: "güçlü yön" },
      { de: "konkret", tr: "somut" },
      { de: "s Erläbnis", tr: "yaşantı" },
      { de: "belege", tr: "belgelemek, örneklemek" },
      { de: "d Verantwortig", tr: "sorumluluk" },
      { de: "s Ziel", tr: "hedef" },
      { de: "d Iischränkig", tr: "sınır, çekince" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Deneme stajı sırasında beni en çok etkileyen şey doz hesabıydı.",
        answer: "Was mich bi de Schnupperlehr am mäischte bewegt hät, isch s Dosiere gsii.",
        hint: "„Was …, isch … gsii“ vurgulu bir kalıptır; Präteritum yerine Perfekt.",
      },
      {
        kind: "build",
        tr: "Sorumluluk olan işler bana daha çok şey veriyor.",
        answer: "Sache mit Verantwortig gänd mer meh als Sache ohni.",
        hint: "geben → gää: si gänd; mir → mer.",
      },
      {
        kind: "build",
        tr: "Bunu iddia etmiyorum, örnekle gösteriyorum.",
        answer: "Ich behaupte das nöd, ich beleg s mit eme Biispil.",
        hint: "Motivasyon mektubunun tüm mantığı bu cümlede.",
      },
      {
        kind: "free",
        prompt:
          "Bir çıraklık, staj ya da iş için motivasyon mektubu yaz. Beş noktaya değin: hangi pozisyon için yazdığın, seni bu işe çeken tek somut deneyim (bir an, bir görev — genel cümle değil), bu deneyimin ne gösterdiği, zayıf gördüğün bir yön ve onunla ne yaptığın, kapanış. „Beni ilgilendiriyor“ cümlesini kullanma.",
        checklist: [
          "Hangi pozisyon için yazdığını ilk cümlede belirttin mi?",
          "Tek bir somut deneyim anlattın mı?",
          "Bu deneyimin ne gösterdiğini yazdın mı?",
          "Bir zayıf yönü dürüstçe ele aldın mı?",
          "Genel cümlelerden („ich interessiere mich für …“) kaçındın mı?",
          "Metin bir sayfayı geçmiyor mu?",
        ],
        minWords: 130,
        phrases: [
          { de: "Ich bewirb mich um d Lehrstell als …", tr: "… çıraklık yeri için başvuruyorum." },
          { de: "Was mich am mäischte bewegt hät, isch …", tr: "Beni en çok etkileyen …" },
          { de: "Das hät mer zäigt, dass …", tr: "Bu bana … olduğunu gösterdi." },
          { de: "E Schwächi vo mir isch …", tr: "Bir zayıflığım …" },
          { de: "Dra han ich gschaffet, indem …", tr: "Bunun üzerinde … yaparak çalıştım." },
          { de: "Gärn zäig ich Ine das i me Gspröch.", tr: "Bunu bir görüşmede göstermek isterim." },
        ],
        sample:
          "Sehr geehrti Frau Kern\n\nIch bewirb mich um d Lehrstell als Pharma-Assistentin EFZ ab Auguscht.\n\nWas mich bi de Schnupperlehr am mäischte bewegt hät, isch nöd de Verchauf gsii, sondern s Dosiere. Am dritte Tag han ich gseh, wie Si e Salbe agrüehrt händ und zwäimal nachegrächnet händ, obwohl Si das siit Jaare mached. Ich han gmerkt, dass mich das nöd abschreckt, sondern zieht: Sache mit Verantwortig gänd mer meh als Sache ohni.\n\nDas hät mer au zäigt, warum d Beratig de grösser Täil vo dere Arbet isch. Ich han bi Ine Chunde ghört, wo eigentlich nöd s Medikamänt gsuecht händ, sondern öpper, wo zuelost.\n\nE Schwächi vo mir isch d Mathematik gsii — im vorletschte Zügnis han ich e 4,5 gha. Dra han ich gschaffet, indem ich es halbs Jaar Nachhilf gnoo han; im letschte Zügnis staat e 5. Ich schriib das, well i dem Bruef Rächne käi Näbesach isch.\n\nGärn zäig ich Ine i me Gspröch, was ich siit em Schnuppere dezuegleert han.\n\nFründlichi Grüess\nAmina Bekele",
      },
    ],
  },
  {
    id: "zh-b2-w6",
    course: "gsw-zh",
    level: "B2",
    skill: "writing",
    title: "Erörterig: Pro und Kontra",
    genre: "Sınav formatı",
    intro:
      "Sınavın ana görevi: bir konuyu iki yönüyle tartıp kendi sonucuna varmak. Yapı, içerik kadar puan getirir.",
    gloss: [
      { de: "d Erörterig", tr: "tartışma yazısı" },
      { de: "d These", tr: "tez" },
      { de: "abwäge", tr: "tartmak" },
      { de: "entchräfte", tr: "çürütmek" },
      { de: "zum äine … zum andere", tr: "bir yandan … öte yandan" },
      { de: "letschtlich", tr: "nihayetinde" },
      { de: "d Schlussfolgerig", tr: "sonuç" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bu konu yıllardır tartışılıyor.",
        answer: "Über das Thema wird siit Jaare diskutiert.",
        hint: "Öznesiz edilgen: „Über … wird … diskutiert.“",
      },
      {
        kind: "build",
        tr: "Bu argümanın haklı bir çekirdeği var, ama fazlası değil.",
        answer: "Das Argumänt hät en berächtigte Kärn, aber nöd meh.",
        hint: "Karşı görüşü kabul edip sınırlandırmak B2'de puan getirir.",
      },
      {
        kind: "build",
        tr: "Her şeyi tarttıktan sonra ikinci görüşe katılıyorum.",
        answer: "Nach em Abwäge vo allne Punkt schliess ich mich de zwäite Poschtion aa.",
        hint: "sich anschliessen Dativ ister: de Poschtion.",
      },
      {
        kind: "free",
        prompt:
          "Şu konuda tartışma yazısı yaz: „Sölled alli Jugendliche zerscht e Lehr mache, bevor si as Gymi chönd?“ Yapı: kısa giriş, lehte iki argüman, aleyhte iki argüman, en güçlü karşı argümanı ele alışın, kendi sonucun. Sonucun girişte belli olmasın.",
        checklist: [
          "Giriş konuyu bağlama oturtuyor mu?",
          "İki lehte, iki aleyhte argüman var mı?",
          "Her argümanı bir örnekle destekledin mi?",
          "En güçlü karşı argümanı ciddiye alıp yanıtladın mı?",
          "Sonuç argümanlardan çıkıyor mu?",
          "Bağlaçlarla akış kurdun mu?",
        ],
        minWords: 180,
        phrases: [
          { de: "Über das Thema wird siit Jaare diskutiert.", tr: "Bu konu yıllardır tartışılıyor." },
          { de: "Für … schpricht zerscht, dass …", tr: "…'in lehine önce şu var: …" },
          { de: "Es wiiters Argumänt isch …", tr: "Bir diğer argüman …" },
          { de: "Degäge wird iigwändet, dass …", tr: "Buna karşı … itirazı yapılıyor." },
          { de: "Das Argumänt hät en berächtigte Kärn, aber …", tr: "Bu argümanın haklı bir çekirdeği var ama …" },
          { de: "Nach em Abwäge vo allne Punkt …", tr: "Her şeyi tarttıktan sonra …" },
        ],
        sample:
          "Über d Frag, öb alli Jugendliche zerscht e Lehr mache sötted, wird siit Jaare diskutiert — mäistens denn, wänn d Betriib z wenig Lehrlig finded.\n\nFür so es Modäll schpricht zerscht d Erfaarig: Wär drü Jaar imene Betrieb gschaffet hät, kennt Termine, Chunde und Verantwortig. Das lernt me im Gymi nöd, und es hilft spöter au im Studium. Es wiiters Argumänt isch d Orientierig: Mit fufzäh weiss fascht niemert, was er will. Wär zerscht schafft, entschäidet mit zwänzg besser.\n\nDegäge wird iigwändet, dass me domit e ganzi Generation drü Jaar später as Studium laat. I de Medizin oder de Forschig, wo d Uusbildig sowiso lang isch, isch das käi Chliinigkäit. Zudem würd es Zwangsmodäll genau das zerstöre, was d Lehr uszäichnet: dass si freiwillig gwählt wird.\n\nDää zwäit Iiwand hät en berächtigte Kärn, aber er trifft nöd d Idee, sondern d Form. E Pflicht wär falsch — es Aagebot nöd. Vill Gymischüeler händ nie es Praktikum gmacht, nöd will si nöd wänd, sondern will s niemert vorgseh hät.\n\nNach em Abwäge vo allne Punkt bin ich gäge e Pflicht, aber defür, dass jedi Mittelschuel es obligatorischs Praxisjahr aabüütet — bezaalt und aagrächnet. Nöd zum d Lehr uufwerte, sondern zum d Wahl ehrlicher z mache.",
      },
    ],
  },
  {
    id: "zh-b2-w7",
    course: "gsw-zh",
    level: "B2",
    skill: "writing",
    title: "Kommentar: D Schwiiz und Europa",
    genre: "Köşe yazısı",
    intro:
      "zh-b2-r9'daki konuyu bir köşe yazısına dönüştüreceksin: kendi bakışın, en güçlü itiraz ve bir sonuç.",
    gloss: [
      { de: "de Kommentar", tr: "köşe yazısı" },
      { de: "d Haltig", tr: "duruş" },
      { de: "d Souveränität", tr: "egemenlik" },
      { de: "de Priis", tr: "bedel" },
      { de: "d Iischränkig", tr: "kısıtlama" },
      { de: "verkürze", tr: "basitleştirmek" },
      { de: "d Abhängigkäit", tr: "bağımlılık" },
      { de: "s Fazit", tr: "sonuç" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bağımsızlık küçük bir ülkede farklı bir anlama gelir.",
        answer: "Unabhängigkäit häisst imene chliine Land öppis anders.",
        hint: "heissen → häisse; „öppis anders“ = başka bir şey.",
      },
      {
        kind: "build",
        tr: "Bu tartışmayı basitleştiren, cevabı da kaçırır.",
        answer: "Wär die Debatte verkürzt, verfehlt au d Antwort.",
        hint: "„Wär …, …“ genel özne yapısı; ana cümlede fiil başta.",
      },
      {
        kind: "build",
        tr: "Sonuç olarak mesele üyelik değil, kimin karar verdiğidir.",
        answer: "Letschtlich gaat s nöd um de Beitritt, sondern drum, wär entschäidet.",
        hint: "„es gaat um“ + Akkusativ; „drum, wär …“ yan cümle.",
      },
      {
        kind: "free",
        prompt:
          "İsviçre-Avrupa ilişkisi üzerine bir köşe yazısı yaz. Beş noktaya değin: somut bir gözlem ya da örnekle başla, kendi tezin, en güçlü karşı argümanı ciddiye alman, onu neden yine de yeterli bulmadığın, kendi sonucun. Slogan yazma — tek somut ayrıntı on soyut cümleden güçlüdür.",
        checklist: [
          "Somut bir gözlemle başladın mı?",
          "Tezini net kurdun mu?",
          "Karşı argümanı zayıflatmadan aktardın mı?",
          "Onu bir gerekçeyle yanıtladın mı?",
          "Sonucun tezden ayırt edilebiliyor mu?",
          "Ton ölçülü mü?",
        ],
        minWords: 160,
        phrases: [
          { de: "Wär emal … erläbt hät, weiss, dass …", tr: "Bir kez … yaşayan bilir ki …" },
          { de: "Mini These isch: …", tr: "Tezim şu: …" },
          { de: "S stärchschte Gägenargumänt lautet: …", tr: "En güçlü karşı argüman şudur: …" },
          { de: "Dää Iiwand nimm ich ernscht, wil …", tr: "Bu itirazı ciddiye alıyorum çünkü …" },
          { de: "Trotzdem übergseet er, dass …", tr: "Yine de … gözden kaçıyor." },
          { de: "Mis Fazit isch drum …", tr: "Dolayısıyla sonucum …" },
        ],
        sample:
          "Wär emal e Maschine us Tüütschland importiert hät, weiss, wie üsi Beziehig zu Europa würkli uusgseet: käi Zollformular, käi zwäiti Prüefig, dräi Täg Lieferziit. Das isch nöd Zuefall, sondern es Abkomme über technischi Handelshemmnis — es Dokumänt, wo niemert liest und alli bruuched.\n\nMini These isch: D Debatte über d Souveränität wird gführt, als hätted mir d Wahl zwüsche Abhängigkäit und Unabhängigkäit. Die Wahl hämmer nöd. Mir händ nur d Wahl, öb mir bi de Regle, wo für üs sowiso gälted, mitredde oder nöd.\n\nS stärchschte Gägenargumänt lautet: Wär automatisch Recht übernimmt, gitt s Läzte uuf, wo en chliine Staat hät — d Kontrolle über d äigene Gsetz. Dää Iiwand nimm ich ernscht, wil er nöd theoretisch isch: Es Volch, wo abstimmt und denn ghört, es seig nöd zueständig, verlüürt s Vertraue in s ganze System.\n\nTrotzdem übergseet er öppis. Mir übernämed hüt scho fascht alles — nur ohni am Tisch z sitze. D Frag isch nöd, öb mir Regle übernämed, sondern öb mir si mitschriibed.\n\nMis Fazit isch drum weniger dramatisch, als d Debatte tönt: Nöd de Beitritt isch d Frag, sondern d Ehrlichkäit. Wär vo Unabhängigkäit redt und gliichziitig vo de Liefertermin profitiert, mues säge, wie beides zäme gaat.",
      },
    ],
  },
  {
    id: "zh-b2-w8",
    course: "gsw-zh",
    level: "B2",
    skill: "writing",
    title: "S Mail a de Berufsberater",
    genre: "İş yazışması",
    intro:
      "Hikâyenin son parçası: Amina'nın yerine geçip danışmanına haber vereceksin — ve bir şeyi iptal edeceksin.",
    gloss: [
      { de: "d Zuesaag", tr: "olumlu cevap" },
      { de: "absäge", tr: "iptal etmek" },
      { de: "de Platz freigää", tr: "yeri boşaltmak" },
      { de: "sich bedanke", tr: "teşekkür etmek" },
      { de: "d Underschtützig", tr: "destek" },
      { de: "rächtziitig", tr: "zamanında" },
      { de: "de Rat", tr: "tavsiye" },
    ],
    minutes: 10,
    tasks: [
      {
        kind: "build",
        tr: "Bir çıraklık yeri buldum.",
        answer: "Ich han e Lehrstell übercho.",
        hint: "bekommen → überchoo; Perfekt: han … übercho.",
      },
      {
        kind: "build",
        tr: "Bu yüzden geçiş yılı programını iptal etmek istiyorum.",
        answer: "Drum möcht ich s Brückeaagebot absäge.",
        hint: "absagen ayrılabilir ama mastar hâlde sonda kalır.",
      },
      {
        kind: "build",
        tr: "Yeri erkenden boşaltmak istiyorum ki başkası alsın.",
        answer: "Ich wott de Platz früeh freigää, damit en öpper anders überchunt.",
        hint: "„damit“ yan cümlesinde fiil sonda.",
      },
      {
        kind: "free",
        prompt:
          "Meslek danışmanına bir e-posta yaz. Beş noktaya değin: iyi haberi, hangi işletme ve ne zaman başlayacağın, geçiş yılı programını iptal etmen ve neden erken haber verdiğin, danışmanlığın hangi somut kısmının işe yaradığı, teşekkür. Genel bir teşekkür yazma — neyin yardımcı olduğunu somut söyle.",
        checklist: [
          "Haberi ilk cümlede verdin mi?",
          "İşletme ve tarih var mı?",
          "İptali ve gerekçesini yazdın mı?",
          "Somut olarak neyin yardımcı olduğunu yazdın mı?",
          "Kapanış kibar ve kısa mı?",
        ],
        minWords: 110,
        phrases: [
          { de: "Ich han e Lehrstell übercho.", tr: "Bir çıraklık yeri buldum." },
          { de: "Ich fang am … a.", tr: "…'de başlıyorum." },
          { de: "Drum möcht ich … absäge.", tr: "Bu yüzden …'i iptal etmek istiyorum." },
          { de: "Gholfe hät mir vor allem …", tr: "Bana en çok … yardımcı oldu." },
          { de: "Merci vilmal für Ihri Underschtützig.", tr: "Desteğiniz için çok teşekkürler." },
        ],
        sample:
          "Guete Tag Herr Baumann\n\nIch han e Lehrstell übercho — i de Apotheke am Limmatplatz, als Pharma-Assistentin EFZ. Ich fang am 1. Auguscht aa.\n\nDrum möcht ich s Brückeaagebot absäge, wo ich im Februar aagmäldet han. Ich schriib Ine hüt und nöd im Juli, damit de Platz früeh frei wird und en öpper anders überchunt.\n\nGholfe hät mir vor allem zwäi Sache us üsem Gspröch. Erschtens de Satz, dass ich bi sibe Absääge statistisch normal underwägs seig — ich han vorher dänkt, es lieg a mir. Zwäitens de Plan B: Well ich gwüsst han, dass es en git, bin ich is zwäite Gspröch ganz anders gange. Ich han nöd s Gfüel gha, es hängt alles a dere äine Stund.\n\nMerci vilmal für Ihri Underschtützig. Wänn Si emal öpper händ, wo scho vill Absääge übercho hät: Ich verzell gärn, wie s bi mir gloffe isch.\n\nFründlichi Grüess\nAmina Bekele",
      },
    ],
  },
];
