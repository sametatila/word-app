import type { SkillExercise } from "../types";

/**
 * C1 — Zürih kursu (Züritüütsch) okuma, dinleme ve yazma egzersizleri.
 * Lehçe yazı dili değildir; bu yüzden türler konuşma diline yakın seçilir:
 * köşe yazısı/blog tonu, panel, radyo sohbeti, forum yorumu.
 * Yazım: data/zurich/style-guide.md (Dieth temelli, sadeleştirilmiş).
 */
export const zhC1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "zh-c1-r1",
    course: "gsw-zh",
    level: "C1",
    skill: "reading",
    title: "Schtirbt s Züritüütsch us?",
    genre: "Köşe yazısı",
    intro:
      "Bir kültür dergisindeki bu köşe yazısında yazar, 'lehçe ölüyor' klişesiyle ironik bir hesaplaşmaya girişiyor. Kimin suçlandığına ve yazarın asıl tehlikeyi nerede gördüğüne dikkat et.",
    gloss: [
      { de: "s Klagelied", tr: "ağıt, yakınma şarkısı" },
      { de: "läbig", tr: "canlı, hayat dolu" },
      { de: "d Zuegwanderete", tr: "göçle gelenler" },
      { de: "de Verluscht", tr: "kayıp" },
      { de: "de Purischt", tr: "dil tutucusu, safçı" },
      { de: "bewache", tr: "korumak, nöbet tutmak" },
      { de: "uufnää", tr: "içine almak, kabul etmek" },
      { de: "de Pausehof", tr: "teneffüs avlusu" },
    ],
    minutes: 5,
    text:
      "Alli paar Jaar schriibt wider öpper s gliiche Klagelied: S Züritüütsch schtirbt us, d Jugend cha nüme richtig rede, und schuld isch s Handy. Ich ha das Lied scho als Chind ghöört – und lueged Sii: Mir rede immer no Mundart. Eifach andersch.\n\nKlar, min Grossvatter hät no Wörter bruucht, wo hüt fascht niemert me kennt. Aber en Sprach, wo läbt, veränderet sich halt. D Jugendliche mische hüt änglischi Wörter is Züritüütsch – «nice», «safe», «cringe». Für vili isch das en Skandal. Für mich isch es s Zäiche, dass de Dialäkt läbig isch: Er nimmt uuf, was er bruucht, und laat gaa, was er nüme bruucht.\n\nAu d Zuegwanderete veränderen d Sprach. Chind, wo dihäi Albanisch oder Tamilisch rede, lerned uf em Pausehof Züritüütsch – und bringed en äigete Sound mit. Das isch kän Verluscht, das isch e nöii Farb.\n\nGfäärlich für de Dialäkt sind nöd d Jugend und nöd d Zuegwanderete. Gfäärlich sind d Purischte, wo jedes nöie Wort als Fääler aaluege und us de Mundart es Museum mache wänd. En Sprach, wo me nu no bewache daarf, läbt nüme. Also: Lönd s Züritüütsch läbe – au wänn's hüt andersch töönt als vor füfzg Jaar.",
    questions: [
      {
        text: "Was häisst «s gliiche Klagelied» im erschte Abschnitt?",
        options: [
          "En alti Klag, wo alli paar Jaar wider ufftaucht",
          "Es bekannts Volkslied us em Kanton Züri",
          "En nöii Studie über d Jugendsprach",
        ],
        answer: 0,
        explain:
          "Yazar „Alli paar Jaar schriibt wider öpper s gliiche Klagelied“ diyor — birkaç yılda bir tekrarlanan aynı yakınma. Gerçek bir şarkı ya da çalışma söz konusu değil, mecaz.",
      },
      {
        text: "Wie beurteilt de Autor di änglische Wörter im Züritüütsch?",
        options: [
          "Als Skandal, wo me schtoppe mues",
          "Als Zäiche, dass de Dialäkt läbig isch",
          "Als Mode, wo gliich wider verschwindt",
        ],
        answer: 1,
        explain:
          "„Für mich isch es s Zäiche, dass de Dialäkt läbig isch“ — başkaları için skandal olan şey, yazara göre canlılık belirtisi: dil ihtiyacını alır, gereksizi bırakır.",
      },
      {
        text: "Richtig oder falsch? De Autor findt, d Zuegwanderete sind e Gfaar für s Züritüütsch.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Das isch kän Verluscht, das isch e nöii Farb“ ve „Gfäärlich … sind nöd … d Zuegwanderete“ — göçmen çocukların kattığı ses yazara göre kayıp değil, yeni bir renk.",
      },
      {
        text: "Wär isch nach em Autor di würklichi Gfaar für de Dialäkt?",
        options: [
          "D Purischte, wo us de Mundart es Museum mache wänd",
          "D Schuele, wo nu Hochdütsch verlanged",
          "S Handy und di soziale Medie",
        ],
        answer: 0,
        explain:
          "Son paragraf: „Gfäärlich sind d Purischte, wo jedes nöie Wort als Fääler aaluege“ — tehlike gençler ya da telefon değil, dili müzeye çevirmek isteyen tutucular.",
      },
      {
        text: "Was mäint de Autor mit em Satz «En Sprach, wo me nu no bewache daarf, läbt nüme»?",
        options: [
          "En Sprach bruucht strängi Regle, zum überläbe",
          "Wänn me en Sprach nöd me bruuche und veränderen daarf, isch si scho tot",
          "D Polizäi sött d Sprach besser schütze",
        ],
        answer: 1,
        explain:
          "Cümle mecazi: yalnızca 'korunabilen', değişmesine izin verilmeyen dil artık yaşamıyordur. Yazının bütün tezi bu — değişim ölüm değil, yaşam belirtisi.",
      },
    ],
  },
  {
    id: "zh-c1-r2",
    course: "gsw-zh",
    level: "C1",
    skill: "reading",
    title: "Wonigssueche z Züri – es Draama in drüü Akt",
    genre: "Blog",
    intro:
      "Zürih'te ev arayan birinin ironik blog yazısı. Üç 'perde' boyunca beklentiyle gerçeklik arasındaki uçuruma ve sondaki beklenmedik dönüşe dikkat et.",
    gloss: [
      { de: "de Betriibigsuszug", tr: "icra sicil belgesi (İsviçre'de kiralamada istenir)" },
      { de: "d Bewärbig", tr: "başvuru" },
      { de: "d Bsichtigung", tr: "daireyi gezip görme" },
      { de: "d Verwaltig", tr: "yönetim, emlak idaresi" },
      { de: "d Genosseschaft", tr: "kooperatif (ucuz konut sağlar)" },
      { de: "sich mälde", tr: "haber vermek, dönüş yapmak" },
      { de: "zügle", tr: "taşınmak (ev değiştirmek)" },
      { de: "d Helfti", tr: "yarısı" },
      { de: "d Ernüchterig", tr: "hayal kırıklığı, ayılma" },
    ],
    minutes: 6,
    text:
      "Akt äis: D Hoffnig. Ich ha tänkt, mit mim guete Loon und mim suubere Betriibigsuszug find ich z Züri locker e Wonig. Ich ha es Dossier gmacht, mit Foto und Motivazioonsschriibe – als wär's e Bewärbig für en Job bi de Bank.\n\nAkt zwäi: D Realität. A de erschte Bsichtigung sind achzg Lüüt vor de Tür gschtande. D Wonig: zwäiehalb Zimmer, vierte Schtock, kä Lift, Chuchi us de Sibezgerjaar. De Priis: zwäituusigdrühundert Franke. D Verwaltig hät gsäit, mir söled s Formular usfüle und bitte nöd aalüüte – si mälde sich. Si händ sich nie gmäldet.\n\nAkt drüü: D Ernüchterig. Mini Fründin hät gmäint, ich söll's bi de Genosseschafte probiere. Super Idee: D Wartelischte sind sit zää Jaar zue. Min Kolleg wont sit sibe Jaar imene WG-Zimmer, wil er kä Wonig findt – und de Maa isch Aawalt.\n\nEpilog: Ich zügle jetz uf Baade. S Zugbilett choschtet öppis, und ich bruuche vierzg Minuute bis Züri. Aber d Miete isch d Helfti, und vom Balkon gsee ich d Limmat statt e Buuschtell. Villicht isch das gar nöd s schlächtscht Änd vo dem Draama.",
    questions: [
      {
        text: "Warum hät de Autor am Aafang tänkt, är findi locker e Wonig?",
        options: [
          "Er hät en guete Loon und en suubere Betriibigsuszug",
          "Er kennt vil Lüüt bi de Verwaltige",
          "Er suecht nu es WG-Zimmer",
        ],
        answer: 0,
        explain:
          "İlk perde: „mit mim guete Loon und mim suubere Betriibigsuszug find ich z Züri locker e Wonig“ — iyi maaş ve temiz icra sicili yeterli sanıyordu.",
      },
      {
        text: "Was passiert nach de erschte Bsichtigung?",
        options: [
          "D Verwaltig lüütet em Autor sofort aa",
          "De Autor überchunt d Wonig",
          "D Verwaltig mäldet sich nie",
        ],
        answer: 2,
        explain:
          "İroni tam burada: yönetim „si mälde sich“ (biz döneriz) demişti, metin kuru bir cümleyle bitiriyor — „Si händ sich nie gmäldet.“",
      },
      {
        text: "Was zäigt s Biischpil vom Kolleg, wo Aawalt isch?",
        options: [
          "Au Lüüt mit guetem Bruef finded z Züri kä Wonig",
          "WG-Zimmer sind tüürer als Wonige",
          "Aawält verdiened z wenig für Züri",
        ],
        answer: 0,
        explain:
          "Avukat bile yedi yıldır ev bulamayıp paylaşımlı odada yaşıyorsa sorun kişisel değil yapısal: iyi meslek de Zürih'te daire garantisi değil.",
      },
      {
        text: "Richtig oder falsch? D Wartelischte vo de Genosseschafte sind e schnälli Lösig.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „D Wartelischte sind sit zää Jaar zue“ — kooperatif listeleri on yıldır kapalı; 'süper fikir' ifadesi alaycı.",
      },
      {
        text: "Wie gseet de Autor sin Umzug uf Baade am Schluss?",
        options: [
          "Als Niderlaag, wo n er nöd cha akzeptiere",
          "Als Lösig mit Vortäil: halbi Miete und Ussicht uf d Limmat",
          "Als kurzfrischtigi Nootlösig für es paar Mönet",
        ],
        answer: 1,
        explain:
          "Epilogdaki dönüş: kira yarıya iniyor, balkondan şantiye yerine Limmat görünüyor — „Villicht isch das gar nöd s schlächtscht Änd“ yenilgi değil, sürpriz iyi son.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "zh-c1-r3",
    course: "gsw-zh",
    level: "C1",
    skill: "reading",
    title: "S Grüezi-Paradox",
    genre: "Köşe yazısı",
    intro:
      "İsviçre nezaketinin yakınlık mı mesafe mi olduğunu tartışan ironik bir köşe yazısı okuyacaksın. Yazarın tonuna dikkat et.",
    gloss: [
      { de: "d Höflichkäit", tr: "nezaket" },
      { de: "d Distanz", tr: "mesafe" },
      { de: "verwächsle", tr: "birbirine karıştırmak" },
      { de: "de Vorwurf", tr: "suçlama" },
      { de: "unverbindlich", tr: "bağlayıcı olmayan, mesafeli" },
      { de: "d Zuegwandti", tr: "sonradan gelenler" },
      { de: "s Missverständnis", tr: "yanlış anlama" },
      { de: "härzlich", tr: "içten" },
      { de: "d Schwelle", tr: "eşik" },
    ],
    minutes: 8,
    text:
      "Es git en Vorwurf, wo ich sit zwänzg Jaar ghööre, meischtens vo Lüüt, wo nöd da uufgwachse sind: D Schwiizer seiged höflich, aber chalt. Me grüezi enand im Träppehuus, me lächlet im Lift — und nach drei Jaar wüsst me na immer nöd, wie di Nochbarin heisst.\n\nIch han lang widersproche. Underdesse gib ich zue: De Vorwurf stimmt. Nume: Er beschriibt käi Chälti, sondern e Regle, wo niemert erklärt.\n\nD Regle gaat so: S Grüezi isch käi Aagebot, s isch e Bestätigung. Es säit nöd „ich möcht di kenne“, sondern „ich gsee di, und ich stör di nöd“. Wär das als Aafang vom Gspröch verstaat, wartet ewig uf de zwäit Satz. Dää chunt nöd — nöd wil me nöd wott, sondern wil s Aafange bi eus als Iigriff giltet.\n\nDas isch käi Entschuldigung. Es isch e Beschriibig — und si erklärt s Missverständnis in beid Richtige. De Zuegwandti liest Chälti, wo Rücksicht gmeint isch. De Iiheimisch liest Uufdringlichkäit, wo Intressse gmeint isch. Beid händ rächt und beid händ unrächt, und beid warted uf de andere.\n\nS Interessante isch, was passiert, wänn d Schwelle emal überschritte isch. Wär bi eus emal drin isch, isch drin: Me hilft bim Zügle, me nimmt d Poscht ane, me passt uf s Chind uuf — und zwar über Jaar, ohni Ufhebes. Di gliich Zruckhaltig, wo vorher wie Distanz uusgseh hät, wird nachhär zu Verlässlichkäit.\n\nDrum säg ich hüt de Nöiaakömmlinge nüme „das isch halt so“. Ich säge ne: Frööged. Zwäimal. S dritt Mal fröget denn s Gägenüber. Und wänn ihr das Gfüel händ, ihr seiged z direkt gsii — sind ihr wahrschiinlich grad rächtziitig gsii.",
    questions: [
      {
        text: "Wie stellt sich de Autor zum Vorwurf?",
        options: [
          "Er hät lang widersproche, gibt en aber jetz zue — mit ere andere Erklärig",
          "Er wiist en klar zrugg",
          "Er findet en übertriibe",
        ],
        answer: 0,
        explain:
          "„Ich han lang widersproche. Underdesse gib ich zue: De Vorwurf stimmt“ — ama soğukluk değil, açıklanmamış bir kural.",
      },
      {
        text: "Was bedüütet s Grüezi laut em Text?",
        options: [
          "Ich gsee di und ich stör di nöd",
          "Ich möcht di kenne lerne",
          "Ich bi i Iile",
        ],
        answer: 0,
        explain: "Selam bir teklif değil, bir teyit: görüldün ve rahatsız edilmeyeceksin.",
      },
      {
        text: "Warum chunt de zwäit Satz nöd?",
        options: [
          "Well s Aafange als Iigriff giltet",
          "Well d Lüüt käi Ziit händ",
          "Well me d Sprooch nöd cha",
        ],
        answer: 0,
        explain: "İstememekten değil: sohbeti başlatmak bir müdahale sayılıyor.",
      },
      {
        text: "Wie beschriibt de Text s Missverständnis?",
        options: [
          "Bäid Siite läsed s Verhalte vom andere falsch",
          "Nume d Zuegwandte irred sich",
          "Nume d Iiheimische sind schuld",
        ],
        answer: 0,
        explain:
          "Gelen soğukluk okuyor (oysa saygı), yerli münasebetsizlik okuyor (oysa ilgi) — ikisi de birbirini bekliyor.",
      },
      {
        text: "Was passiert nach em Überschriite vo de Schwelle?",
        options: [
          "Us Zruckhaltig wird Verlässlichkäit über Jaar",
          "Nüüt veränderet sich",
          "D Distanz wird na grösser",
        ],
        answer: 0,
        explain: "Taşınmaya yardım, posta alma, çocuğa bakma — yıllarca, gösterişsiz.",
      },
      {
        text: "Welle Rat git er de Nöiaakömmlinge?",
        options: [
          "Sälber aafange z frööge — zwäimal",
          "Warte, bis me aagsproche wird",
          "Sich aapasse und schwiige",
        ],
        answer: 0,
        explain:
          "„Frööged. Zwäimal. S dritt Mal fröget denn s Gägenüber“ — fazla direkt hissi genelde tam zamanında demek.",
      },
    ],
  },
  {
    id: "zh-c1-r4",
    course: "gsw-zh",
    level: "C1",
    skill: "reading",
    title: "Direkti Demokratie und ihri Schattesiite",
    genre: "Deneme",
    intro:
      "Doğrudan demokrasinin hem gücünü hem bedelini tartan bir deneme okuyacaksın. Yazarın nerede kabul, nerede itiraz ettiğini izle.",
    gloss: [
      { de: "d Abschtimmig", tr: "referandum, oylama" },
      { de: "d Initiative", tr: "halk girişimi" },
      { de: "s Referändum", tr: "referandum (yasaya karşı)" },
      { de: "d Stimmbetäiligung", tr: "katılım oranı" },
      { de: "d Minderhäit", tr: "azınlık" },
      { de: "de Kompromiss", tr: "uzlaşma" },
      { de: "verzögere", tr: "geciktirmek" },
      { de: "d Legitimation", tr: "meşruiyet" },
      { de: "d Vorlag", tr: "oylanacak metin" },
    ],
    minutes: 9,
    text:
      "Vier Mal im Jaar chunt s Couvert. Drü, vier, mängisch sibe Vorlage: es Steuergsetz, e Velo-Initiative, e Änderig im Jagdgsetz. Für vill Uusländer isch das s Fascinierendschte a de Schwiiz — und für vill Schwiizer di normalschti Sach vo de Wält.\n\nMe cha d Vorteil schnell ufzelle. Wer sälber entschäidet, akzeptiert au Entschäid, wo em nöd passed: D Legitimation isch höcher als bi jedem Parlamäntsbeschluss. Und s Referändum wirkt scho, bevor s brucht wird — will jedi Regierig weiss, dass es cha choo, wird vo Aafang aa breiter verhandlet. De berüehmt Schwiizer Kompromiss isch nöd Charakter, er isch Statistik.\n\nAber d Rächnig hät zwäi Poschte, wo me sältener nennt.\n\nDe erscht heisst Tempo. Es Gsetz, wo dur alli Schtufe mues, bruucht bi eus schnell zää Jaar. Bi de Frauestimmrächt hät das bis nüünzähundertäinesibzg duuret — nöd wil s Parlamänt degäge gsii isch, sondern wil e Minderhäit vo Männer hät chöne blockiere. Wär säit, s System schütz vor Fähler, mues au säge: Es schützt s Bschtaande — au wänn s falsch isch.\n\nDe zwäit Poschte heisst Minderhäit. Bi ere Volksabschtimmig entschäidet e Mehrhäit über Rächt vo Lüüt, wo per Definition nie e Mehrhäit sind. S Parlamänt cha das au — aber es mues sich erkläre, s Volch nöd. E Abschtimmig kennt käi Begründigspflicht.\n\nWas folgt drus? Nöd d Abschaffig, sondern Ehrlichkäit. Direkti Demokratie isch käi Garantie für gscheiti Entschäid, si isch e Garantie für aakzeptierti Entschäid. Das isch vill — aber s isch nöd s gliiche. Wär beides verwächslet, wird jedes Mal enttüüscht sii, wänn d Mehrhäit öppis beschlüsst, wo ihm falsch vorchunt. Und das wird passiere. Regelmässig, vier Mal im Jaar.",
    questions: [
      {
        text: "Was säit de Text zur Legitimation?",
        options: [
          "Si isch höcher, wil me au unaagnämi Entschäid akzeptiert, wänn me sälber entschäidet",
          "Si isch tüüfer als im Parlamänt",
          "Si spielt käi Rolle",
        ],
        answer: 0,
        explain: "Kendi karar veren, hoşuna gitmeyen kararı da kabul ediyor.",
      },
      {
        text: "Wie erklärt de Autor de „Schwiizer Kompromiss“?",
        options: [
          "Als Folg vom Referändum, wo scho vorher wirkt",
          "Als Charaktereigeschaft",
          "Als Erfindig vo de Medie",
        ],
        answer: 0,
        explain: "„De berüehmt Schwiizer Kompromiss isch nöd Charakter, er isch Statistik.“",
      },
      {
        text: "Was isch de erscht Poschte uf de Rächnig?",
        options: ["S Tempo", "S Gäld", "D Sprooch"],
        answer: 0,
        explain: "Tüm aşamalardan geçmesi gereken bir yasa on yıl sürebiliyor.",
      },
      {
        text: "Was schliesst er us em Biispil Frauestimmrächt?",
        options: [
          "S System schützt s Bschtaande, au wänn s falsch isch",
          "S Parlamänt isch schuld gsii",
          "Abschtimmige sind immer gscheiter",
        ],
        answer: 0,
        explain:
          "Parlamento karşı olduğu için değil, bir erkek azınlık engelleyebildiği için 1971'e kadar sürdü.",
      },
      {
        text: "Welles Problem gseet er bi de Minderhäite?",
        options: [
          "E Abschtimmig kennt käi Begründigspflicht",
          "Minderhäite dörfed nöd schtimme",
          "S Parlamänt schützt si nie",
        ],
        answer: 0,
        explain:
          "Parlamento kararını gerekçelendirmek zorunda; halk oylamasının böyle bir yükümlülüğü yok.",
      },
      {
        text: "Was isch sini Schlussfolgerig?",
        options: [
          "Direkti Demokratie garantiert aakzeptierti, nöd gscheiti Entschäid",
          "Me söll d direkt Demokratie abschaffe",
          "Me söll weniger oft abschtimme",
        ],
        answer: 0,
        explain:
          "İkisini karıştıran her seferinde hayal kırıklığına uğrayacak — yılda dört kez.",
      },
    ],
  },
  {
    id: "zh-c1-r5",
    course: "gsw-zh",
    level: "C1",
    skill: "reading",
    title: "Reportage: Di erschti Schicht",
    genre: "Röportaj yazısı",
    intro:
      "Zürih'in gece bitip günün başladığı saatlerini anlatan bir gazete reportajı okuyacaksın — anlatımcı, gözleme dayalı bir metin.",
    gloss: [
      { de: "d Schicht", tr: "vardiya" },
      { de: "de Kehrichtwage", tr: "çöp kamyonu" },
      { de: "d Reinigung", tr: "temizlik" },
      { de: "de Znüni", tr: "kuşluk atıştırmalığı" },
      { de: "unsichtbar", tr: "görünmez" },
      { de: "de Ruum", tr: "alan, mekân" },
      { de: "sich lohne", tr: "değmek" },
      { de: "de Iidruck", tr: "izlenim" },
      { de: "s Klischee", tr: "klişe" },
    ],
    minutes: 9,
    text:
      "Am zwänzg vor vieri isch d Langstrass läär. Nöd ruhig — läär. De Underschid merkt me erscht, wänn me emal um die Ziit dört staat: S Ruusche vo de Stadt isch nöd wägg, es hät nume niemert meh, wo drüber redt.\n\nAntonio Ferreira staat sit zwänzg Jaar um die Ziit uuf. Er fahrt de Kehrichtwage. „D Lüüt mäined, mir sammled Abfall“, säit er und lachet. „Mir sammled, was d Nacht übrig lat.“ Um vieri fangt sini Schicht aa, um halbi zwölfi isch si fertig. Am Nomittag schlaaft er zwäi Stund, denn hollt er sini Töchter vo de Schuel ab. „Das isch de Grund für d Schicht. Nöd s Gäld.“\n\nZwäi Strasse wiiter wüscht d Ana Petrović s Trottoir vor eme Lade, wo erscht am nüüni uufmacht. Si isch siit sibezähni z Züri, siit drüzähni Jaar bi de Reinigung. Ob si sich als Teil vo de Stadt fühlt? Si überleit lang. „Ich kenne d Stadt besser als di mäischte, wo da wohned“, säit si denn. „Aber gseh wärde ich nöd. S isch nöd bös gmeint. Es isch äifach so: Wär früeh schafft, arbeitet dört, wo niemert isch.“\n\nUm sächsi wird s anderscht. D Bäckerei mached uuf, s erscht Tram fahrt, und im Kafi am Egge sitzed di erschte drü Lüüt — nöd d Frühufsteher us de Werbig, sondern Lüüt, wo scho vier Stund hinder sich händ. „Das isch üse Feierabig-Kafi“, säit de Ferreira. „Für die andere isch s de Zmorge.“\n\nS Klischee vo de Stadt, wo nie schlaaft, isch falsch. D Stadt schlaaft — si schlaaft nume nöd alli gliichziitig. Und di Schicht, wo am wenigschte gseh wird, isch di, wo alles andere erscht möglich macht.",
    questions: [
      {
        text: "Wie beschriibt de Text d Langstrass am zwänzg vor vieri?",
        options: [
          "Läär, nöd ruhig — s Ruusche isch da, aber niemert redt drüber",
          "Voll und laut",
          "Ganz still",
        ],
        answer: 0,
        explain: "Yazar tam bu ayrımı yapıyor: boş ile sessiz aynı şey değil.",
      },
      {
        text: "Warum schafft de Ferreira i dere Schicht?",
        options: [
          "Damit er sini Töchter am Nomittag cha abhole",
          "Wäge em Gäld",
          "Wil er nöd cha schlaafe",
        ],
        answer: 0,
        explain: "„Das isch de Grund für d Schicht. Nöd s Gäld.“",
      },
      {
        text: "Was säit d Ana Petrović über ihres Verhältnis zur Stadt?",
        options: [
          "Si kennt si besser als di mäischte, wird aber nöd gseh",
          "Si fühlt sich nöd zueghörig",
          "Si wott wägzüüge",
        ],
        answer: 0,
        explain:
          "Kötü niyet görmüyor: erken çalışan, kimsenin olmadığı yerde çalışır diyor.",
      },
      {
        text: "Was isch bsunders am Kafi um sächsi?",
        options: [
          "Für di äine isch s Feierabig, für di andere de Zmorge",
          "Es isch immer läär",
          "Nume Touriste sitzed dört",
        ],
        answer: 0,
        explain: "Ferreira için mesai sonu kahvesi, ötekiler için kahvaltı.",
      },
      {
        text: "Welles Klischee widerlegt de Text?",
        options: [
          "Dass d Stadt nie schlaaft",
          "Dass Nachtarbet gsund seig",
          "Dass Züri tüür seig",
        ],
        answer: 0,
        explain: "Şehir uyuyor — sadece herkes aynı anda uyumuyor.",
      },
      {
        text: "Wie lautet s Fazit vom Autor?",
        options: [
          "Di am wenigschte sichtbar Schicht macht alles andere erscht möglich",
          "Nachtarbet söll verbote wärde",
          "D Lüüt söled früener uufstaa",
        ],
        answer: 0,
        explain: "Son cümle bunu doğrudan söylüyor.",
      },
    ],
  },
  {
    id: "zh-c1-r6",
    course: "gsw-zh",
    level: "C1",
    skill: "reading",
    title: "Rezension: En Film uf Mundart",
    genre: "Eleştiri",
    intro:
      "Lehçeyle çekilmiş bir filmin eleştirisini okuyacaksın. Eleştirmenin övgü ve itirazlarını ayırt et.",
    gloss: [
      { de: "d Rezension", tr: "eleştiri, kritik" },
      { de: "de Regisseur", tr: "yönetmen" },
      { de: "d Figur", tr: "karakter" },
      { de: "de Diaalog", tr: "diyalog" },
      { de: "überzüüge", tr: "ikna etmek" },
      { de: "d Schwächi", tr: "zaaf" },
      { de: "de Verzicht", tr: "vazgeçme" },
      { de: "de Untertitel", tr: "altyazı" },
      { de: "d Erwartig", tr: "beklenti" },
    ],
    minutes: 8,
    text:
      "Es git e Sort Schwiizer Film, wo me scho kennt, bevor me en gseh hät: es Dorf, en Ätti, wo nöd redt, und am Schluss e Versöönig vor eme Bärgpanorama. «Stilli Wuche» vom Regisseur Lukas Ammann fangt genau so aa — und macht denn öppis Underwartets.\n\nD Gschicht isch schnell verzellt. Zwäi Brüeder träffed sich nach zwölf Jaar wider, wil de Vater gschtorbe isch. De äi hät s Huus ghüetet, de ander isch nach Berlin. Vier Täg, es Huus, e Beerdigung.\n\nWas dää Film über s Klischee hebt, isch de Verzicht. Ammann git de Figure käi grossi Sätz. Di entschäidend Szene duuret sibezää Sekunde, und es fallt käi Wort: De äi Brueder stellt em andere en Kafi ane, mit zwäi Stück Zucker — und mir wüssed sofort, dass er sich erinneret. Wär Mundart-Kino kennt, gseet do öppis Nöis: E Sprooch, wo funktioniert, gnau wil si nöd bruucht wird.\n\nDe Diaalog isch Züritüütsch und Bärndüütsch, und Ammann nimmt s ärnscht: D Figure rededt nöd Mundart, si dänked druff. S Timing, d Verchürzige, s Chluure vo de Wort — das lat sich nöd übersetze, und drum funktioniert de Film mit Untertitel schlächter als ohni.\n\nD Schwächi isch s Ändi. Nach eme Stund und füfzäh Minute, wo nüüt erklärt wird, erklärt de Film uf de letschte drei Minute alles. E Rede am Grab, wo alli Motiv na emal ufzellt, als hett de Regisseur im Schniidruum s Vertroue verlore.\n\nTrotzdem: «Stilli Wuche» isch de bescht Schwiizer Film vo dem Jaar. Und er zäigt, dass Mundart im Kino nöd Folklore mues sii. Si cha s Material sälber sii.",
    questions: [
      {
        text: "Was isch s Klischee, wo de Text am Aafang nennt?",
        options: [
          "Dorf, schwiigende Vater, Versöönig vor Bärgpanorama",
          "Stadtfilm mit vill Diaalog",
          "Komedie mit Touriste",
        ],
        answer: 0,
        explain: "İzlemeden bilinen İsviçre filmi kalıbı — film bununla başlayıp başka yere gidiyor.",
      },
      {
        text: "Was hebt de Film laut Kritik über s Klischee?",
        options: ["De Verzicht — d Figure überchömed käi grossi Sätz", "D Musig", "D Bilder"],
        answer: 0,
        explain: "On yedi saniyelik belirleyici sahnede tek kelime edilmiyor.",
      },
      {
        text: "Was bedüütet d Szene mit em Kafi?",
        options: [
          "De äi Brueder erinneret sich a de ander — ohni es Wort",
          "Si versöned sich definitiv",
          "Si strited sich",
        ],
        answer: 0,
        explain: "İki şeker: hatırladığını gösteriyor, tek kelime olmadan.",
      },
      {
        text: "Was säit de Kritiker über d Untertitel?",
        options: [
          "De Film funktioniert mit ne schlächter als ohni",
          "Si sind unbedingt nötig",
          "Si sind guet gmacht",
        ],
        answer: 0,
        explain:
          "Zamanlama, kısaltmalar ve kelimelerin tınısı çevrilemiyor; altyazıyla film zayıflıyor.",
      },
      {
        text: "Welli Schwächi nennt er?",
        options: [
          "S Ändi erklärt uf drei Minute alles, was vorher offe bliibe isch",
          "D Schauspieler sind schwach",
          "De Film isch z lang",
        ],
        answer: 0,
        explain:
          "Mezar başındaki konuşma tüm motifleri sayıyor — sanki yönetmen kurguda güvenini kaybetmiş.",
      },
      {
        text: "Wie lautet s Gsamturtäil?",
        options: [
          "Trotz em Ändi de bescht Schwiizer Film vo dem Jaar",
          "En misslungene Versuech",
          "Nume für Mundart-Fans",
        ],
        answer: 0,
        explain: "Lehçenin sinemada folklor değil, malzemenin kendisi olabildiğini gösteriyor.",
      },
    ],
  },

  {
    id: "zh-c1-l1",
    course: "gsw-zh",
    level: "C1",
    skill: "listening",
    title: "Podium: Wäm ghöört Züri?",
    genre: "Panel",
    intro:
      "Kentsel yoğunlaşma ve kira artışı üzerine bir panel: mahalle derneğinden Rossi ile belediye meclisi üyesi Keller karşı karşıya. İki tarafın argümanlarını ve sayıları not al.",
    gloss: [
      { de: "d Verdichtig", tr: "kentsel yoğunlaştırma (aynı alana daha çok konut)" },
      { de: "sanieren", tr: "yenilemek, esaslı onarmak" },
      { de: "sich öppis läischte", tr: "bir şeyi karşılayabilmek" },
      { de: "gmäinnützig", tr: "kâr amacı gütmeyen (konut)" },
      { de: "abriisse", tr: "yıkmak" },
      { de: "d Rendite", tr: "getiri, kâr" },
      { de: "de Inveschtor", tr: "yatırımcı" },
      { de: "widerschpräche", tr: "karşı çıkmak, itiraz etmek" },
      { de: "d Beiz", tr: "meyhane, mahalle lokantası" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Moderatorin",
        text: "Grüezi mitenand und härzlich willkomme zum Podium «Wäm ghöört Züri?». Bi mir sind d Schtadträtin Eva Keller und de Marco Rossi vom Quartierverein Ussersiil. Herr Rossi, Sii säged, s Quartier verlüürt sini Seel. Was mäined Sii dermit?",
      },
      {
        speaker: "Rossi",
        text: "Lueged Sii sich doch um: Wo früener en Beck und e Beiz gsii sind, hät's hüt es Fitness-Schtudio und en Coworking-Space. D Lüüt, wo daa uufgwachse sind, chönd sich d Miete nüme läischte. Wänn en alte Block saniert wird, zaled d Mieter nachhär s Doppelte – oder si müend gaa.",
      },
      {
        speaker: "Keller",
        text: "Ich verschtaa de Ärger, aber mir dörfed äis nöd vergässe: Züri wachst. Jedes Jaar chömed tuusigi vo nöie Lüüt i d Schtadt. Wänn mir nöd verdichted, schtiiged d Priis erscht rächt. Drum baut d Schtadt sälber – mir händ s Ziel, dass bis zwäituusigfüfzg äin Drittel vo de Wonige gmäinnützig isch.",
      },
      {
        speaker: "Rossi",
        text: "Das Ziel töönt guet, aber s Tempo schtimmt nöd. Und Verdichtig häisst i de Praxis oft: En günschtige Altbau abriisse und tüüri Nöibaute aanesetze. Das isch kä Wonigspolitik, das isch Rendite.",
      },
      {
        speaker: "Keller",
        text: "Da mues ich widerschpräche. Ohni privati Inveschtore chönd mir gar nöd gnueg baue. D Lösig isch nöd entweder-oder: Mir bruuched bäides, gmäinnützigi und privati Wonige. Und mir bruuched Regle – zum Biischpil en bessere Schutz für d Mieter bi Sanierige.",
      },
      {
        speaker: "Rossi",
        text: "Ich säg's eso: Es Quartier isch me als Bode und Beton. Wänn am Schluss nu no verdient wird und niemert me daa läbt, wo s Quartier träit, dänn hät Züri öppis verloore, wo me mit käm Gäld cha zruggchaufe.",
      },
    ],
    questions: [
      {
        text: "Was mäint de Rossi dermit, s Quartier verlüüri sini Seel?",
        options: [
          "D alte Hüüser wärded nöd me renoviert",
          "Beck und Beiz verschwinded, und di alte Bewoner chönd d Miete nüme zale",
          "D Chile im Quartier wird zuegmacht",
        ],
        answer: 1,
        explain:
          "Rossi somut örnek veriyor: fırın ve meyhanenin yerinde fitness salonu ve coworking var; mahallede büyüyenler kirayı karşılayamıyor — 'ruh kaybı' bu.",
      },
      {
        text: "Was passiert nach em Rossi, wänn en alte Block saniert wird?",
        options: [
          "D Mieter zaled nachhär s Doppelte oder müend gaa",
          "D Wonige wärded günschtiger",
          "D Schtadt übernimmt de Block",
        ],
        answer: 0,
        explain:
          "„zaled d Mieter nachhär s Doppelte – oder si müend gaa“ — yenileme sonrası kira ikiye katlanıyor ya da kiracılar gitmek zorunda.",
      },
      {
        text: "Mit welem Argumänt verteidigt d Keller d Verdichtig?",
        options: [
          "Züri wachst – ohni Verdichtig schtiiged d Priis erscht rächt",
          "D Inveschtore verlanged das vo de Schtadt",
          "Di alte Hüüser sind sowiso z tüür zum sanieren",
        ],
        answer: 0,
        explain:
          "Keller'in ana argümanı: şehir her yıl binlerce kişi büyüyor; yoğunlaştırma olmazsa fiyatlar asıl o zaman yükselir.",
      },
      {
        text: "Weles Ziel nännt d Schtadträtin für s Jaar zwäituusigfüfzg?",
        options: [
          "Äin Drittel vo de Wonige söll gmäinnützig sii",
          "D Helfti vo de Wonige söll de Schtadt ghööre",
          "Alli Nöibaute sölled autofräi sii",
        ],
        answer: 0,
        explain:
          "„s Ziel, dass bis zwäituusigfüfzg äin Drittel vo de Wonige gmäinnützig isch“ — 2050'ye kadar konutların üçte biri kâr amacı gütmeyen olacak.",
      },
      {
        text: "Richtig oder falsch? D Keller findt, me chönn ganz ohni privati Inveschtore gnueg baue.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Ohni privati Inveschtore chönd mir gar nöd gnueg baue“ — Keller özel yatırımcıyı vazgeçilmez görüyor, çözümü 'ikisi birden + kurallar' diye tarif ediyor.",
      },
    ],
  },
  {
    id: "zh-c1-l2",
    course: "gsw-zh",
    level: "C1",
    skill: "listening",
    title: "Radiogschprööch: D Zuekunft vom Dialäkt",
    genre: "Radyo sohbeti",
    intro:
      "Bir dilbilimciyle radyo sohbeti: gençler lehçeyi bozuyor mu, yazılı lehçe patlaması ne anlama geliyor? Araştırmacının her klişeye verdiği cevabı not al.",
    gloss: [
      { de: "d Sprachwüsseschaft", tr: "dilbilim" },
      { de: "behaupte", tr: "iddia etmek" },
      { de: "d Rächtschriibig", tr: "imla, yazım kuralları" },
      { de: "sich aagliiche", tr: "birbirine benzeşmek" },
      { de: "de Usgliich", tr: "dengelenme, eşitlenme" },
      { de: "s Läänwort", tr: "alıntı kelime" },
      { de: "uufnää", tr: "içine almak" },
      { de: "im Gägetäil", tr: "tam tersine" },
    ],
    minutes: 5,
    segments: [
      {
        speaker: "Moderator",
        text: "Guete Morge mitenand. Hüt bi öis im Schtudio: d Sprachwüsseschaftlere Lea Brunner vo de Uni Züri. Frau Brunner, mini Muetter behauptet, d Jugend chöni käs richtigs Züritüütsch me. Hät si rächt?",
      },
      {
        speaker: "Brunner",
        text: "Ihri Muetter isch in guete Gsellschaft – die Klag isch über hundert Jaar alt. Was schtimmt: De Dialäkt veränderet sich. Was nöd schtimmt: dass er verschwindt. Im Gägetäil – d Jugendliche schriibed hüt de ganz Tag Mundart, i de Chats, uf de soziale Medie. So vil gschribnigs Züritüütsch hät's no nie gää.",
      },
      {
        speaker: "Moderator",
        text: "Aber es git ja kä offizielli Rächtschriibig für d Mundart. Isch das käs Problem?",
      },
      {
        speaker: "Brunner",
        text: "Für d Lüüt offesichtlich nöd: Jede schriibt, wie's für ihn töönt, und me verschtaat sich trotzdem. Spannend isch öppis anders. D Regione gliiched sich aa – Wörter, wo früener nu z Bärn oder z Basel bruucht worde sind, ghöört me hüt au z Züri, und umgcheert. D Forschig redt vomene Dialäkt-Usgliich.",
      },
      {
        speaker: "Moderator",
        text: "Und was isch mit em Änglisch? «Nice», «safe», «cringe» – ghöört das jetz au zum Züritüütsch?",
      },
      {
        speaker: "Brunner",
        text: "Warum nöd? Vor hundert Jaar hät me französischi Wörter uufgnaa – s Trottoir, s Billett, de Coiffeur. Hüt sind's halt änglischi. En Sprach, wo Läänwörter uufnimmt, isch nöd chrank, si isch läbig. Chrank wär si erscht, wänn d Chind ganz uufhöre würded, si z rede – und devoo simer z Züri wiit ewäg.",
      },
    ],
    questions: [
      {
        text: "Was säit d Brunner zu de Klag, d Jugend chöni käs richtigs Züritüütsch me?",
        options: [
          "Die Klag isch über hundert Jaar alt – de Dialäkt veränderet sich, aber er verschwindt nöd",
          "D Muetter hät rächt, d Schuele müend me Mundart underrichte",
          "D Jugend redt würkli fascht nu no Hochdütsch",
        ],
        answer: 0,
        explain:
          "Brunner yakınmayı tarihselleştiriyor: yüz yıldır aynı şikâyet var. Değişim doğru, yok olma yanlış — „Was nöd schtimmt: dass er verschwindt.“",
      },
      {
        text: "Warum hät's hüt so vil gschribnigs Züritüütsch wie no nie?",
        options: [
          "D Schuele verlanged Uufsätz uf Mundart",
          "D Jugendliche schriibed i de Chats und uf de soziale Medie Mundart",
          "D Zäitige druked immer me Artikel uf Züritüütsch",
        ],
        answer: 1,
        explain:
          "„d Jugendliche schriibed hüt de ganz Tag Mundart, i de Chats, uf de soziale Medie“ — yazılı lehçe patlamasının kaynağı okul ya da gazete değil, mesajlaşma.",
      },
      {
        text: "Richtig oder falsch? Ohni offizielli Rächtschriibig verschtönd sich d Lüüt bim Mundart-Schriibe nöd.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain:
          "Yanlış: „Jede schriibt, wie's für ihn töönt, und me verschtaat sich trotzdem“ — resmî imla yok ama anlaşma sorunu da yok.",
      },
      {
        text: "Was mäint d Forschig mit em «Dialäkt-Usgliich»?",
        options: [
          "D Regione gliiched sich aa – Wörter wandered zwüsched Bärn, Basel und Züri",
          "Alli Schwiizer sölled di gliich Rächtschriibig bruuche",
          "De Dialäkt gliicht sich immer me em Hochdütsch aa",
        ],
        answer: 0,
        explain:
          "Brunner'in 'asıl ilginç' bulduğu olgu: bölgeler birbirine benzeşiyor, eskiden yalnız Bern'de ya da Basel'de kullanılan kelimeler artık Zürih'te de duyuluyor.",
      },
      {
        text: "Mit welem Vergliich verteidigt d Brunner di änglische Wörter?",
        options: [
          "Vor hundert Jaar hät me gnau eso französischi Wörter uufgnaa",
          "Au s Hochdütsch bruucht immer me änglischi Wörter",
          "D Chind lerned Änglisch sowiso i de Schuel",
        ],
        answer: 0,
        explain:
          "Tarihsel paralellik: Trottoir, Billett, Coiffeur da bir zamanlar Fransızcadan alınmıştı. Alıntı kelime hastalık değil canlılık işareti — „isch nöd chrank, si isch läbig.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "zh-c1-l3",
    course: "gsw-zh",
    level: "C1",
    skill: "listening",
    title: "Streitgspröch: Bruucht Kultur Subvention?",
    genre: "Tartışma",
    intro:
      "Kültür bütçesi üzerine sert bir tartışmayı dinleyeceksin. Kimin hangi noktada geri adım attığına dikkat et.",
    gloss: [
      { de: "d Subvention", tr: "kamu desteği" },
      { de: "de Stüürzaaler", tr: "vergi mükellefi" },
      { de: "de Markt", tr: "piyasa" },
      { de: "d Nachfrag", tr: "talep" },
      { de: "d Elite", tr: "seçkinler" },
      { de: "s Publikum", tr: "seyirci" },
      { de: "de Zuegang", tr: "erişim" },
      { de: "d Rändite", tr: "getiri" },
      { de: "iigschtaa", tr: "kabul etmek" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Moderator",
        text: "Herr Lüthi, Si wänd s Kulturbudget vo de Stadt halbiere. Warum?",
      },
      {
        speaker: "Lüthi",
        text: "Wil ich s ungrächt finde. Mir nämed Gäld vo Lüüt, wo nie is Theater gönd, und gänd s Iistituzione, wo vo eme chliine Publikum bsuecht wärded. Bildigsbürgertum, zaalt vo allne.",
      },
      {
        speaker: "Moderator",
        text: "Frau Signer, stimmt di Beschriibig?",
      },
      {
        speaker: "Signer",
        text: "S Zaalebild stimmt, d Schlussfolgerig nöd. Ja, s Opernhuus hät es chliineres Publikum als s Fuessballstadion. Nume: Mir subventioniered s Stadion au — über Infrastruktur, Sicherheit, Verchehr. De Underschid isch, dass me s dört nöd Subvention nennt.",
      },
      { speaker: "Lüthi", text: "Das isch en Ablänkig." },
      {
        speaker: "Signer",
        text: "Nei, das isch de Kärn. Wänn Si Markt wänd, denn konsequänt: Denn zaalt de Fuessballclub sini Polizeiiisätz sälber. Wänd Si das?",
      },
      { speaker: "Lüthi", text: "… Ich mues iigschtaa, dass ich das nöd ganz durdänkt han." },
      {
        speaker: "Moderator",
        text: "Frau Signer, aber s Argumänt mit em Publikum bliibt: Wär gaat i die Vorstellige?",
      },
      {
        speaker: "Signer",
        text: "Und das isch üsi Uufgab, do han ich em Herr Lüthi rächt z gää. Wär Subvention überchunt, mues au für Zuegang sorge — Priis, Ziite, Sprooch, Schuelprogramm. Es Huus, wo nur en Kräis bedienet, hät s Argumänt gäge sich sälber.",
      },
      {
        speaker: "Lüthi",
        text: "Wänn s dört ane gaat, chan ich mit ere Reduktion statt ere Halbierig läbe. Aber i wott messbari Ziel, nöd Absichtserklärige.",
      },
      { speaker: "Signer", text: "Debii bin ich." },
    ],
    questions: [
      {
        text: "Wie begründet de Lüthi sini Forderig?",
        options: [
          "Gäld vo allne gaat a Iistituzione mit chliinem Publikum",
          "D Kultur seig z tüür worde",
          "D Stadt hebi käis Gäld",
        ],
        answer: 0,
        explain: "„Bildigsbürgertum, zaalt vo allne“ — dağıtım adaletsizliği argümanı.",
      },
      {
        text: "Welles Gägenargumänt bringt d Signer zerscht?",
        options: [
          "Sport wird au subventioniert, me nennt s nume anderscht",
          "Kultur bringt Tourischte",
          "S Budget seig scho chlii",
        ],
        answer: 0,
        explain: "Altyapı, güvenlik ve ulaşım üzerinden stadyum da desteklenir diyor.",
      },
      {
        text: "Wie reagiert de Lüthi uf d Frag mit de Polizeiiisätz?",
        options: [
          "Er gseet ii, dass er s nöd ganz durdänkt hät",
          "Er bestriitet d Zaale",
          "Er wächslet s Thema",
        ],
        answer: 0,
        explain: "„Ich mues iigschtaa, dass ich das nöd ganz durdänkt han.“",
      },
      {
        text: "Wo git d Signer em Lüthi rächt?",
        options: [
          "Bim Zuegang — wer Subvention überchunt, mues s Publikum breiter mache",
          "Bi de Halbierig",
          "Bim Vergliich mit em Stadion",
        ],
        answer: 0,
        explain: "Fiyat, saat, dil, okul programı: erişim sağlamak destek alanın görevi.",
      },
      {
        text: "Uf was lauft s am Schluss uus?",
        options: [
          "Reduktion statt Halbierig, aber mit messbare Ziel",
          "Käi Änderig",
          "Volli Halbierig",
        ],
        answer: 0,
        explain:
          "Lüthi indirime razı ama „messbari Ziel, nöd Absichtserklärige“ istiyor; Signer katılıyor.",
      },
    ],
  },
  {
    id: "zh-c1-l4",
    course: "gsw-zh",
    level: "C1",
    skill: "listening",
    title: "Vortrag: Was Dialäkt mit em Hirn macht",
    genre: "Konferans",
    intro:
      "Bir dilbilim konferansının açılış bölümünü dinleyeceksin: tez, kanıt ve sınırların nasıl kurulduğunu izle.",
    gloss: [
      { de: "de Vortrag", tr: "konferans, sunum" },
      { de: "d Studie", tr: "araştırma" },
      { de: "s Ergebnis", tr: "sonuç" },
      { de: "de Effäkt", tr: "etki" },
      { de: "d Stichprob", tr: "örneklem" },
      { de: "überschätze", tr: "abartmak" },
      { de: "s Vorurtäil", tr: "önyargı" },
      { de: "de Nachwiis", tr: "kanıt" },
      { de: "vorsichtig", tr: "temkinli" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Referentin",
        text: "Ich fange mit ere Frag aa, wo mir jedes Mal gschtellt wird: Isch Dialäkt e Sprooch oder nume e Variante? Sprachwüsseschaftlich isch d Antwort langwiilig — d Gränze isch politisch, nöd linguistisch.",
      },
      {
        speaker: "Referentin",
        text: "Interessanter isch, was im Chopf passiert. Bi eus i de Düütschschwiiz läbed d Lüüt in ere Situation, wo mir Diglossie nenned: Mundart im Gspröch, Hochdüütsch im Gschriibene. Nöd zwäi Sprooche — zwäi Ruum.",
      },
      {
        speaker: "Referentin",
        text: "Jetz d Studie. Mir händ zwäihundertvierzg Schüelerinne und Schüeler us em Kanton Züri und us Baden-Württeberg verglichte. Uufgab: Zwüsche zwäi Sprachmodi hin und her wächsle, under Ziitdruck.",
      },
      {
        speaker: "Referentin",
        text: "S Ergebnis: D Schwiizer Gruppe isch bim Wächsle im Schnitt hundertzwänzg Millisekunde schneller gsii. Statistisch signifikant, aber — und das isch wichtig — de Effäkt isch chlii. Er erklärt öppe drü Prozänt vo de Underschid.",
      },
      {
        speaker: "Referentin",
        text: "Ich betone das, wil söttigi Ergebnis gärn falsch zitiert wärded. Us «drü Prozänt» wird i de Ziitig «Dialäkt macht schlau». Das säit d Studie nöd, und ich säg s au nöd.",
      },
      {
        speaker: "Referentin",
        text: "Was si säit, isch bschäidener und trotzdem relevant: Wär täglich zwüsche Modi wächslet, üebt e Fähigkäit, wo unabhängig vo Intelligänz isch. Das gilt für Dialäktschprecher gnau wie für zwäisprachigi Chind — s isch käi Schwiizer Sunderfall.",
      },
      {
        speaker: "Referentin",
        text: "Und zum Schluss e Iischränkig, wo mir wichtig isch: Üsi Stichprob isch stadtnah und bildigsnah. Für s Land und für anderi Schichte händ mir käi Date. Wär drus e allgemeini Uussag macht, macht das gäge üse Rat.",
      },
    ],
    questions: [
      {
        text: "Wie beantwortet d Referentin d Frag „Sprooch oder Variante“?",
        options: [
          "D Gränze seig politisch, nöd linguistisch",
          "Es seig klar e äigeni Sprooch",
          "Es seig klar nume e Variante",
        ],
        answer: 0,
        explain: "Bilimsel cevabı „langwiilig“ buluyor: sınır siyasi.",
      },
      {
        text: "Was heisst Diglossie i ihrem Sinn?",
        options: [
          "Mundart im Gspröch, Hochdüütsch im Gschriibene — zwäi Ruum",
          "Zwäi verschiideni Sprooche",
          "Es Mischig us bäidem",
        ],
        answer: 0,
        explain: "„Nöd zwäi Sprooche — zwäi Ruum.“",
      },
      {
        text: "Was isch s Ergebnis vo de Studie?",
        options: [
          "D Schwiizer Gruppe isch 120 ms schneller, de Effäkt isch aber chlii",
          "Käi Underschid",
          "E riise Underschid",
        ],
        answer: 0,
        explain: "İstatistiksel olarak anlamlı ama farkın yalnızca %3'ünü açıklıyor.",
      },
      {
        text: "Warum betont si de chliini Effäkt?",
        options: [
          "Wil söttigi Ergebnis i de Ziitig falsch zitiert wärded",
          "Wil d Studie schlächt gmacht isch",
          "Wil si de Effäkt nöd glaubt",
        ],
        answer: 0,
        explain: "„Us «drü Prozänt» wird i de Ziitig «Dialäkt macht schlau».“",
      },
      {
        text: "Was säit si über d Verallgemeinerig?",
        options: [
          "D Stichprob isch stadt- und bildigsnah — allgemeini Uussage gaged ihre Rat",
          "D Ergebnis gältet für alli",
          "Me chan s uf ganz Europa übertrage",
        ],
        answer: 0,
        explain: "Kırsal kesim ve diğer sosyal katmanlar için verileri yok.",
      },
    ],
  },
  {
    id: "zh-c1-l5",
    course: "gsw-zh",
    level: "C1",
    skill: "listening",
    title: "Satire: D Wuche im Rückspiegel",
    genre: "Mizah",
    intro:
      "Radyoda haftalık mizah köşesini dinleyeceksin. Zor olan kelimeler değil — ironiyi anlamak. Söylenenin tersinin kastedildiği yerlere dikkat et.",
    gloss: [
      { de: "de Rückspiegel", tr: "dikiz aynası" },
      { de: "d Ironie", tr: "ironi" },
      { de: "d Vernäämlassig", tr: "görüş alma süreci (siyasi)" },
      { de: "d Arbetsgruppe", tr: "çalışma grubu" },
      { de: "verschiebe", tr: "ertelemek" },
      { de: "de Fortschritt", tr: "ilerleme" },
      { de: "s Papier", tr: "rapor, belge" },
      { de: "d Empöörig", tr: "infial, öfke" },
      { de: "sich beruhige", tr: "yatışmak" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Sprecherin",
        text: "Guete Morge. D Wuche im Rückspiegel — was passiert isch, und was mir drus gmacht händ.",
      },
      {
        speaker: "Sprecherin",
        text: "Di grooss Nachricht: De Stadtrat hät en Entschäid troffe. Nöd über s Thema, sondern über s Verfahre. Es wird e Arbetsgruppe iigsetzt, wo bis im Herbscht prüeft, öb me e Vernäämlassig mues mache. Fortschritt.",
      },
      {
        speaker: "Sprecherin",
        text: "S Thema übrigens: d Velospure a de Seestrass. Diskutiert siit zwölf Jaar. Zwölf Jaar — das isch ungfähr d Ziit, wo es Chind bruucht, zum vom Chindsgi bis is Gymi z choo. S Chind isch underdesse dört. D Velospur nöd.",
      },
      {
        speaker: "Sprecherin",
        text: "Grossi Empöörig hät s au ggää: Es Restaurant am See hät s Menü uf achtezwänzg Franke erhöcht. Zwäi Täg lang isch s Internet vollständig zämebroche. Am dritte Tag hät niemert meh drüber gredt, und am vierte händ alli wider dört zmittag ggässe.",
      },
      {
        speaker: "Sprecherin",
        text: "Und zum Schluss di guet Nachricht: S Papier vo de Arbetsgruppe vo letschtem Jaar isch fertig. Es empfilt, e Arbetsgruppe iizsetze.",
      },
      {
        speaker: "Sprecherin",
        text: "So, das isch d Wuche gsii. Nächschti Wuche wider — es passiert sicher wider nüüt, und mir berichted uusführlich drüber.",
      },
    ],
    questions: [
      {
        text: "Was hät de Stadtrat entschide?",
        options: [
          "Nöd über s Thema, sondern über s Verfahre — e Arbetsgruppe",
          "D Velospure wärded bout",
          "S Projäkt wird gschtriche",
        ],
        answer: 0,
        explain:
          "Sonbahara kadar bir görüş sürecine gerek olup olmadığını inceleyecek bir çalışma grubu.",
      },
      {
        text: "Was drückt d Sprecherin mit em Wort „Fortschritt“ uus?",
        options: [
          "S Gägetäil — si findet s absurd langsam",
          "Ächti Freud über de Entschäid",
          "E neutrali Feststellig",
        ],
        answer: 0,
        explain: "Klasik ironi: söylediğinin tersini kastediyor.",
      },
      {
        text: "Warum nennt si s Biispil mit em Chind?",
        options: [
          "Zum zäige, wie absurd lang zwölf Jaar sind",
          "Wil Chind au Velo fahred",
          "Zum s Gymi z kritisiere",
        ],
        answer: 0,
        explain: "Çocuk anaokulundan liseye vardı, bisiklet şeridi hâlâ yok.",
      },
      {
        text: "Was säit si über d Empöörig zum Menüpriis?",
        options: [
          "Si isch schnäll verpufft — am vierte Tag ässed alli wider dört",
          "Si hät s Restaurant ruiniert",
          "Si duuret na immer aa",
        ],
        answer: 0,
        explain: "Öfkenin ne kadar kısa ömürlü olduğunu gösteren bir yan hikâye.",
      },
      {
        text: "Was isch d Pointe vom letschte Biitrag?",
        options: [
          "S Papier vo de Arbetsgruppe empfilt e nöii Arbetsgruppe",
          "S Papier isch verlore ggange",
          "D Arbetsgruppe hät s Problem glöst",
        ],
        answer: 0,
        explain: "Döngü kendini tekrar ediyor — mizahın asıl vuruşu.",
      },
    ],
  },
  {
    id: "zh-c1-l6",
    course: "gsw-zh",
    level: "C1",
    skill: "listening",
    title: "Interview mit ere Schriftstellerin",
    genre: "Röportaj",
    intro:
      "Lehçeyle yazan bir yazarla yapılan röportajı dinleyeceksin: dil, kimlik ve piyasa üzerine.",
    gloss: [
      { de: "d Schriftstellerin", tr: "kadın yazar" },
      { de: "de Verlag", tr: "yayınevi" },
      { de: "s Publikum", tr: "okur kitlesi" },
      { de: "de Markt", tr: "piyasa" },
      { de: "d Näächi", tr: "yakınlık" },
      { de: "de Kitsch", tr: "kitsch, ucuz duygusallık" },
      { de: "de Zwang", tr: "zorunluluk" },
      { de: "d Ussicht", tr: "ihtimal, görünüm" },
      { de: "de Verzicht", tr: "vazgeçiş" },
    ],
    minutes: 6,
    segments: [
      {
        speaker: "Journalischtin",
        text: "Frau Aebischer, Si schriibed uf Mundart. De Markt derfür isch chlii. Warum?",
      },
      {
        speaker: "Aebischer",
        text: "Wil ich s nöd anderscht cha. Ich han zwäi Büecher uf Hochdüütsch gschriibe, und beidi sind korräkt. Korräkt isch s Schlimmschte, wo me über es Buech cha säge.",
      },
      {
        speaker: "Journalischtin",
        text: "Was isch uf Mundart anderscht?",
      },
      {
        speaker: "Aebischer",
        text: "S Rhythmus. Uf Hochdüütsch dänk ich a d Regle, uf Mundart dänk ich a d Person, wo redt. Und Mundart hät Wörter für Zwüschetöön, wo im Hochdüütsche fehled — für das, wo öpper säit, wänn er eigentlich öppis anders meint.",
      },
      {
        speaker: "Journalischtin",
        text: "Kritiker säged, Mundartliteratur seig automatisch näch am Kitsch.",
      },
      {
        speaker: "Aebischer",
        text: "Dää Vorwurf isch nöd dumm. D Gfaar existiert — wil Mundart Näächi erzüügt, und Näächi ohni Widerstand wird Kitsch. Mini Antwort isch nöd, weniger Mundart z schriibe, sondern d Figure härter z mache. Wär uf Mundart schriibt, mues gägenaa arbete, nöd mitschwümme.",
      },
      {
        speaker: "Journalischtin",
        text: "Und de Verlag? Übersetzige, Uusland …",
      },
      {
        speaker: "Aebischer",
        text: "Do isch d Ussicht ehrlich: chlii. Mis letschte Buech isch in Düütschland nöd erschine, und ich verstaan s. Das isch de Priis, und ich han en bewusst zaalt. Was ich nöd akzeptiere, isch d Frag, öb sich das lohnt. Es lohnt sich nöd. Es stimmt.",
      },
    ],
    questions: [
      {
        text: "Warum hät si ufghört, uf Hochdüütsch z schriibe?",
        options: [
          "Ihri hochdüütsche Büecher seiged nume „korräkt“ gsii",
          "De Verlag hät si abglehnt",
          "Si cha käi Hochdüütsch",
        ],
        answer: 0,
        explain: "„Korräkt isch s Schlimmschte, wo me über es Buech cha säge.“",
      },
      {
        text: "Was isch für si de Hauptunterschid?",
        options: [
          "Uf Mundart dänkt si a d Person, nöd a d Regle",
          "Mundart isch äifacher",
          "Mundart verchauft sich besser",
        ],
        answer: 0,
        explain: "Ayrıca lehçede ara tonlar için kelimeler var: söylenenle kastedilen arasındaki fark.",
      },
      {
        text: "Wie reagiert si uf de Kitsch-Vorwurf?",
        options: [
          "Si nimmt en ärnscht: Näächi ohni Widerstand wärd Kitsch",
          "Si findet en unsinnig",
          "Si schriibt drum weniger Mundart",
        ],
        answer: 0,
        explain: "Cevabı daha az lehçe değil, karakterleri sertleştirmek: „gägenaa arbete“.",
      },
      {
        text: "Wie beurtäilt si d Ussicht uf Übersetzige?",
        options: ["Ehrlich chlii", "Sehr guet", "Si intressiert si nöd"],
        answer: 0,
        explain: "Son kitabı Almanya'da yayımlanmadı ve bunu anlıyor.",
      },
      {
        text: "Was akzeptiert si nöd?",
        options: [
          "D Frag, öb sich das lohnt",
          "De chlii Markt",
          "D Kritik vo de Kritiker",
        ],
        answer: 0,
        explain:
          "Bedeli bilerek ödediğini söylüyor: „Es lohnt sich nöd. Es stimmt.“ — soru yanlış soru.",
      },
    ],
  },

  {
    id: "zh-c1-w1",
    course: "gsw-zh",
    level: "C1",
    skill: "writing",
    title: "Din Komentar: Autofräis Zäntrum?",
    genre: "Forum yorumu",
    intro:
      "Yerel haber sitesinde 'Zürih merkezi arabasız olsun mu?' tartışması kızışmış. Önce iki kalıp cümleyi kur, sonra kendi yorumunu Züritüütsch yaz — lehçede yorum yazmak, Zürih internetinin gündelik gerçeği.",
    minutes: 12,
    gloss: [
      { de: "autofräi", tr: "arabasız, araç trafiğine kapalı" },
      { de: "de Umsatz", tr: "ciro" },
      { de: "poschte", tr: "alışveriş yapmak (İsviçre)" },
      { de: "de Fuessgänger", tr: "yaya" },
      { de: "de Ladebsitzer", tr: "dükkân sahibi" },
      { de: "d Uusnaam", tr: "istisna" },
      { de: "liifere", tr: "teslimat yapmak" },
      { de: "s Parkhuus", tr: "katlı otopark" },
      { de: "d Läbesqualität", tr: "yaşam kalitesi" },
    ],
    tasks: [
      {
        kind: "build",
        tr: "Benim için açık: Merkez arabasız olmalı, çünkü tramvay ve bisikletle herkes her yere hızla ulaşıyor.",
        answer: "Für mich isch klaar: S Zäntrum mues autofräi wärde, wil me mit em Tram und em Velo überall schnäll aanechunt.",
        alternatives: [
          "Für mich isch klaar: S Zäntrum mues autofräi wärde, wil me mit em Tram und em Velo schnäll überall aanechunt.",
        ],
        hint: "«wil» yan cümlesinde çekimli fiil sona gider: … wil me … aanechunt. Fahrrad değil Velo — Helvetismus. «me» = man (insan/genel özne).",
      },
      {
        kind: "build",
        tr: "Dükkân sahipleri daha az cirodan korkuyor, ama araştırmalar yayaların daha çok alışveriş yaptığını gösteriyor.",
        answer: "D Ladebsitzer händ Angscht vor weniger Umsatz, aber d Schtudie zäiged, dass Fuessgänger meh poschte.",
        alternatives: [
          "D Ladebsitzer händ Angscht vor weniger Umsatz, aber d Schtudie zäiged, dass d Fuessgänger meh poschte.",
        ],
        hint: "«dass» yan cümlesi fiili sona atar. einkaufen değil poschte — İsviçre kelimesi. «meh» = daha çok (mehr).",
      },
      {
        kind: "free",
        prompt:
          "Habere bir forum yorumu yaz (Züritüütsch): net bir tavır al, en az bir karşı argümanı ciddiye alıp cevapla ve somut bir öneriyle bitir. Lehçe yorumun doğal, konuşur gibi olsun — resmî mektup register'i değil.",
        stimulus:
          "«Blick uf Züri» mäldet: De Gmäindraat wott s Zäntrum vo Züri bis zwäituusigdriissg autofräi mache. Uusnaame git's für Liferige, Taxi und Lüüt mit Behinderig. D Parkhüüser am Rand vo de Schtadt bliibed offe. D Ladebsitzer warned vor weniger Umsatz, de VCS redt vo meh Läbesqualität.",
        checklist: [
          "Tavrını ilk cümlede net söyle (dafür mü, degäge mi)",
          "Haberden en az bir somut ayrıntıya değin (istisnalar, otoparklar, 2030 hedefi)",
          "Bir karşı argümanı adlandırıp cevapla («D Ladebsitzer säged … aber …»)",
          "Somut bir öneriyle bitir",
          "Lehçe konuşma dili kalıpları kullan: «ich find», «ehrlich gsäit», «lueged doch …»",
        ],
        minWords: 70,
        phrases: [
          { de: "Ehrlich gsäit verschtaan ich d Uufregig nöd.", tr: "Açıkçası bu telaşı anlamıyorum." },
          { de: "Ich bi klaar defüür / degäge.", tr: "Ben açıkça lehindeyim / karşıyım." },
          { de: "Was me debii nöd vergässe döörf: …", tr: "Bu arada unutulmaması gereken: …" },
          { de: "D Erfarig us andere Schtedt zäigt, dass …", tr: "Başka şehirlerin deneyimi gösteriyor ki …" },
          { de: "Min Voorschlag wär, dass …", tr: "Benim önerim şu olurdu: …" },
          { de: "Am Schluss profitiered alli devoo.", tr: "Sonuçta bundan herkes kazançlı çıkar." },
        ],
        sample:
          "Ich bi klaar defüür. Ehrlich gsäit verschtaan ich d Uufregig nöd: Mir rede vomene Zäntrum, wo s Tram scho hüt alli zwoo Minuute fáart, und d Parkhüüser am Rand bliibed ja offe. Wär würkli mues, chunt also immer no aane.\n\nD Ladebsitzer warned vor weniger Umsatz – aber d Erfarig us andere Schtedt zäigt s Gägetäil: Wo d Lüüt z Fuess underwägs sind, blibed si lenger, lueged i d Schaufänschter und poschted am Schluss meh. En Parkplatz vor em Lade bringt äin Chund, e schööni Gass bringt hundert.\n\nMin Voorschlag wär, dass me nöd bis zwäituusigdriissg wartet, sondern scho jetz jede Summer d Gasse für es paar Mönet zuemacht. Dänn gseet jede sälber, was das für s Quartier häisst – und am Schluss profitiered alli devoo.",
      },
    ],
  },
  {
    id: "zh-c1-w2",
    course: "gsw-zh",
    level: "C1",
    skill: "writing",
    title: "Gägerede: En Iiwand ernscht nää",
    genre: "Tartışma yazısı",
    intro:
      "C1'de asıl beceri, karşı görüşü en güçlü hâliyle kurup ondan sonra yanıt vermektir. Bunu yazacaksın.",
    gloss: [
      { de: "d Gägerede", tr: "karşı konuşma, yanıt" },
      { de: "de Iiwand", tr: "itiraz" },
      { de: "zuegschtaa", tr: "kabul etmek" },
      { de: "entchräfte", tr: "çürütmek" },
      { de: "d Prämiss", tr: "öncül, varsayım" },
      { de: "unterstelle", tr: "isnat etmek" },
      { de: "differenziere", tr: "ayrım yapmak" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Bu itirazın en güçlü hâli şöyle olurdu:",
        answer: "I sinere stärchschte Form würd dää Iiwand so tööne:",
        hint: "„in seiner stärksten Form“ → i sinere stärchschte Form; klingen → tööne.",
      },
      {
        kind: "build",
        tr: "Bunu kabul ediyorum, ama sonuç bundan çıkmıyor.",
        answer: "Das schtaan ich zue, aber d Schlussfolgerig folgt drus nöd.",
        hint: "zugestehen ayrılabilir: ich schtaa … zue.",
      },
      {
        kind: "build",
        tr: "Argüman, kanıtlaması gereken şeyi varsayıyor.",
        answer: "S Argumänt setzt vorus, was es erscht müesst bewiise.",
        hint: "voraussetzen ayrılabilir: es setzt … vorus. müsste → müesst.",
      },
      {
        kind: "free",
        prompt:
          "Kendi seçtiğin tartışmalı bir konuda (dil politikası, konut, ulaşım, kültür bütçesi) bir yanıt yazısı yaz. Beş noktaya değin: kime/neye yanıt verdiğin, karşı görüşü en güçlü hâliyle özetlemen, hangi noktayı kabul ettiğin, hangi noktada ve neden ayrıldığın, kendi sonucun. Kabul ettiğin noktayı küçültme.",
        checklist: [
          "Karşı görüşü zayıflatmadan, en güçlü hâliyle kurdun mu?",
          "En az bir noktayı gerçekten kabul ettin mi?",
          "Ayrıldığın noktayı gerekçelendirdin mi (sadece iddia değil)?",
          "Karşı tarafa niyet isnat etmekten kaçındın mı?",
          "Kendi sonucun karşı görüşten ayrı ve net mi?",
          "Bağlaçlarla akış kurdun mu? (zwar … aber, gnau dört, drum)",
        ],
        minWords: 160,
        phrases: [
          {
            de: "I sinere stärchschte Form würd dää Iiwand so tööne: …",
            tr: "Bu itirazın en güçlü hâli şöyle olurdu: …",
          },
          { de: "Das schtaan ich zue.", tr: "Bunu kabul ediyorum." },
          { de: "S Problem lit nöd döt, sondern …", tr: "Sorun orada değil, …" },
          {
            de: "S Argumänt setzt vorus, was es erscht müesst bewiise.",
            tr: "Argüman kanıtlaması gerekeni varsayıyor.",
          },
          { de: "Wär das behauptet, mues au säge, …", tr: "Bunu iddia eden şunu da söylemeli: …" },
          { de: "Drum chum ich zum Schluss, dass …", tr: "Bu yüzden … sonucuna varıyorum." },
        ],
        sample:
          "Zum Iiwand, Mundart im Chindergarte seig es Hindernis für Chind mit ere andere Erschtsprooch:\n\nI sinere stärchschte Form würd dää Iiwand so tööne: E Familie chunt us Syrie, s Chind lernt zwäi Jaar Mundart, und denn, i de erschte Klass, wächslet alles uf Hochdüütsch. Was es glernt hät, gilt döt nur zum Halbe. Es verlüürt Ziit, wo di andere scho vorus sind — und zwar genau di Chind, wo am wenigschte händ.\n\nDas schtaan ich zue. D Zaale gänd em rächt: De Übergang chunt für die Chind härter als für di andere, und wer das bestriitet, hät nie e Klass gseh.\n\nS Problem lit aber nöd bi de Mundart, sondern bim Übergang sälber. Wer d Mundart uus em Chindergarte nimmt, löst de Bruch nöd — er verschiebt en. Denn lernt s Chind zwäi Jaar Hochdüütsch und schtaat nachhär uf em Pauseplatz vor ere Sprooch, wo niemert im Underricht gredt hät. S Argumänt setzt vorus, was es erscht müesst bewiise: dass s Chind nume äi Ziel uf äi Mal cha haa.\n\nWär e reini Hochdüütsch-Lösig will, mues au säge, wie s Chind denn zu de andere Chind chunt. Bis do e Antwort da isch, chum ich zum Schluss, dass mir nöd d Mundart müend abschaffe, sondern de Übergang begleite: bewusst, benennt und mit Ziit.",
      },
    ],
  },
  {
    id: "zh-c1-w3",
    course: "gsw-zh",
    level: "C1",
    skill: "writing",
    title: "Zämefassig und Stellignaam",
    genre: "Özet + görüş",
    intro:
      "İki adımlı bir metin yazacaksın: önce nesnel bir özet, sonra açıkça ayrılmış kendi görüşün. C1'de bu ayrımın görünür olması esastır.",
    gloss: [
      { de: "d Stellignaam", tr: "görüş bildirme" },
      { de: "de Kärnpunkt", tr: "ana nokta" },
      { de: "objektiv", tr: "nesnel" },
      { de: "abgränze", tr: "sınırını çizmek, ayırmak" },
      { de: "d Gwichtig", tr: "ağırlıklandırma" },
      { de: "s Fazit", tr: "sonuç" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Metin, doğrudan demokrasinin meşruiyet ürettiğini savunuyor.",
        answer: "De Text vertritt d These, dass di direkt Demokratie Legitimation erzüügt.",
        hint: "eine These vertreten → d These vertrete; erzeugen → erzüüge.",
      },
      {
        kind: "build",
        tr: "Buraya kadar özet; şimdi kendi değerlendirmem.",
        answer: "Sowiit d Zämefassig; jetz zu minere äigene Iischätzig.",
        hint: "Bu cümle özet ile görüş arasındaki sınırı görünür kılar.",
      },
      {
        kind: "build",
        tr: "Yazarın aksine, ben ağırlığı farklı koyuyorum.",
        answer: "Im Gägesatz zum Autor setz ich d Gwichtig anderscht.",
        hint: "im Gegensatz zu → im Gägesatz zu + Dativ.",
      },
      {
        kind: "free",
        prompt:
          "zh-c1-r4'teki denemeyi (direkti Demokratie) ele al. Önce 6–8 cümlelik nesnel bir özet yaz, sonra açık bir geçiş cümlesiyle kendi görüşünü yaz: yazarın hangi ağırlıklandırmasına katılıyorsun, hangisine katılmıyorsun ve neden. Sonunda kendi sonucun olsun.",
        checklist: [
          "Özet kısmı gerçekten nesnel mi (kendi görüşün sızmıyor mu)?",
          "Yazarın iki maliyet kalemini de doğru aktardın mı?",
          "Özet ve görüş arasında görünür bir geçiş cümlesi var mı?",
          "Katıldığın ve katılmadığın noktayı ayrı ayrı gerekçelendirdin mi?",
          "Kendi sonucun yazarın sonucundan ayırt edilebiliyor mu?",
        ],
        minWords: 180,
        phrases: [
          { de: "De Text vertritt d These, dass …", tr: "Metin … tezini savunuyor." },
          { de: "Als Beleg füehrt er … aa.", tr: "Kanıt olarak …'i öne sürüyor." },
          {
            de: "Sowiit d Zämefassig; jetz zu minere äigene Iischätzig.",
            tr: "Özet buraya kadar; şimdi kendi değerlendirmem.",
          },
          { de: "In däm Punkt bin ich mit em Autor iiverstande, wil …", tr: "Bu noktada yazarla hemfikirim, çünkü …" },
          { de: "Im Gägesatz zum Autor setz ich d Gwichtig anderscht.", tr: "Yazarın aksine ağırlığı farklı koyuyorum." },
          { de: "Mis Fazit isch drum …", tr: "Dolayısıyla sonucum …" },
        ],
        sample:
          "De Text vertritt d These, dass di direkt Demokratie käi Garantie für gscheiti, aber äini für aakzeptierti Entschäid isch. Als Beleg füehrt er zwäi Mechanisme aa: Wär sälber entschäidet, akzeptiert au unaagnämi Resultat, und s Referändum wirkt scho, bevor s brucht wird, wil jedi Regierig vo Aafang aa breiter verhandlet. Dem stellt de Autor zwäi Choschte gägenüber. Erschtens s Tempo: Es Gsetz bruucht zää Jaar oder meh, und s Biispil Frauestimmrächt zäigt, dass e Minderhäit cha blockiere. Zwäitens de Schutz vo Minderhäite: E Volksabschtimmig kennt käi Begründigspflicht, es Parlamänt scho. Sini Schlussfolgerig isch nöd d Abschaffig, sondern Ehrlichkäit über das, wo s System läischtet.\n\nSowiit d Zämefassig; jetz zu minere äigene Iischätzig.\n\nIn däm Punkt bin ich mit em Autor iiverstande, wil de Underschid zwüsche «gscheit» und «aakzeptiert» tatsächlich s ganze Missverständnis erklärt. Wär vo ere Abschtimmig s bescht Resultat erwartet, hät s System falsch verstande.\n\nIm Gägesatz zum Autor setz ich aber d Gwichtig anderscht. Er behandlet Tempo und Minderhäiteschutz als zwäi gliichwertigi Poschte. Das sind si nöd. Langsamkäit chunt spöter zrugg — es Gsetz cha me i zää Jaar na immer mache. E Minderhäit, wo ihres Rächt zwänzg Jaar lang nöd hät, überchunt die Ziit nie zrugg. Das isch käi Frag vo de Gschwindigkäit, sondern vo de Substanz.\n\nMis Fazit isch drum ängers als sis: Direkti Demokratie bruucht Gränze, wo si nöd sälber cha setze — und genau die z definiere isch d offeni Uufgab, wo de Text nöd aapackt.",
      },
    ],
  },
  {
    id: "zh-c1-w4",
    course: "gsw-zh",
    level: "C1",
    skill: "writing",
    title: "Persönliche Text: Zwüsche zwo Sprooche",
    genre: "Deneme",
    intro:
      "Kişisel ama düşünen bir metin yazacaksın: kendi dil deneyimini bir teze bağlayacaksın. C1'de anlatı ve düşünce iç içe geçer.",
    gloss: [
      { de: "d Zueghörigkäit", tr: "aidiyet" },
      { de: "de Bruch", tr: "kırılma, kopuş" },
      { de: "de Zwüscheruum", tr: "ara alan" },
      { de: "d Anekdote", tr: "anekdot" },
      { de: "verallgemeinere", tr: "genellemek" },
      { de: "sich schäme", tr: "utanmak" },
    ],
    minutes: 12,
    tasks: [
      {
        kind: "build",
        tr: "Uzun süre iki dilin arasında bir yerde yaşadım.",
        answer: "Lang han ich irgendwo zwüsche zwo Sprooche gläbt.",
        hint: "zwei (dişil) → zwo; leben → läbe, Perfekt: han … gläbt.",
      },
      {
        kind: "build",
        tr: "Bunu bir eksiklik saymayı ancak sonradan bıraktım.",
        answer: "Ersch spöter han ich ufghört, das als Mangel z gseh.",
        hint: "aufhören ayrılabilir: han ufghört; „ersch spöter“ = ancak sonradan.",
      },
      {
        kind: "build",
        tr: "Tek bir anekdot henüz bir tez değildir.",
        answer: "Äi einzigi Anekdote isch na käi These.",
        hint: "Bu cümle metnini kendi kendine sınamak için iyi bir araçtır.",
      },
      {
        kind: "free",
        prompt:
          "Kişisel bir deneme yaz: dil ve aidiyet. Beş noktaya değin: somut bir sahne (bir an, bir cümle, bir yanlış anlama), o anda ne hissettiğin, o zamandan bugüne ne değiştiği, bundan çıkardığın genel bir düşünce, ve bu düşüncenin sınırı (nerede genellemiyorsun). Sahneyle başla, açıklamayla değil.",
        checklist: [
          "Somut bir sahneyle başladın mı (soyut girişle değil)?",
          "Duyguyu adlandırdın mı, sadece olayı değil?",
          "Bugünle geçmiş arasında bir fark kurdun mu?",
          "Anekdottan bir düşünceye geçtin mi?",
          "Genellemenin sınırını kendin çizdin mi?",
          "Lehçenin ritmini kullandın mı (kısa cümleler, ara tonlar)?",
        ],
        minWords: 180,
        phrases: [
          { de: "Ich erinnere mi na genau a …", tr: "… hâlâ tam olarak hatırlıyorum." },
          { de: "I dem Momänt han ich gmerkt, dass …", tr: "O anda … olduğunu fark ettim." },
          { de: "Hüt gsee ich das anderscht.", tr: "Bugün buna başka türlü bakıyorum." },
          { de: "Was ich drus glernt han, isch …", tr: "Bundan çıkardığım …" },
          { de: "Äi einzigi Anekdote isch na käi These.", tr: "Tek bir anekdot henüz bir tez değildir." },
        ],
        sample:
          "Ich erinnere mi na genau a de Momänt. Ich bi drü Mönet z Züri gsii, im Coop a de Kasse, und d Frau hät mi öppis gfrögt. Ich han s Wort nöd verstande. Si hät s wiederholt — gliich schnäll, gliich fründlich. Ich han gnickt. Si hät gnickt. Ich bi ggange und han nöd gwüsst, zu was ich grad ja gsäit han.\n\nI dem Momänt han ich nöd Wuet gschpürt und au nöd Truur. Ich han mi gschämt. Und zwar nöd wäge de Sprooch, sondern wäge em Nicke. Ich han so tue, als ob — und das isch di erschti Sprooch gsii, wo ich do gschproche han.\n\nHüt gsee ich das anderscht. Was ich domals als Verluscht erläbt han, isch en Zueschtand gsii, wo di mäischte Lüüt uf de Wält kenned: Me isch nöd i de äinte und nöd i de andere Sprooch ganz dihäi. Ersch spöter han ich ufghört, das als Mangel z gseh. Wär zwüsche zwo Sprooche schtaat, ghört öppis, wo di andere nüme ghöred — d Näht, d Stelle, wo e Sprooch entschäidet, was si nöd säit.\n\nAber ich wett vorsichtig sii: Äi einzigi Anekdote isch na käi These. Ich han e Uufenthaltsbewilligung, en Job und Lüüt, wo warted, bis ich en Satz fertig han. Wär das nöd hät, für dää isch de Zwüscheruum käi Ort zum Nachdänke, sondern äifach en Ort ohni Bode. Vo dört us tönt s Ganze anderscht — und dää Text wär nöd vo mir z schriibe.",
      },
    ],
  },
];
