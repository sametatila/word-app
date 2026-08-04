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
];
