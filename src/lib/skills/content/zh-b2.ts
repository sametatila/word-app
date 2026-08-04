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
];
