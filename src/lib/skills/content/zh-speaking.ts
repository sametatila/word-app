import type { SpeakingDrillExercise } from "../types";

/**
 * Konuşma alıştırmaları — Zürih Almancası kursu.
 *
 * Almanca havuzundan iki noktada ayrılıyor.
 *
 * **1. Otomatik değerlendirme yok** (`judge: "self"`). Tarayıcının de-CH
 * tanıyıcısı İsviçre *standart* Almancasını tanıyor, lehçeyi değil. Lehçe
 * tanıma bugün hâlâ açık bir araştırma problemi — bu iş için özel eğitilmiş
 * modellerde bile hata oranı %25 civarında. Böyle bir tanıyıcıya Züritüütsch
 * söyletmek yanlış onaydan daha kötü bir şey üretirdi: doğru söyleyen
 * öğrenciye "yanlış" demek. Kapalı tutmak, güvenilmez bir yargıdan iyi.
 *
 * **2. `confusions` yazılmıyor.** Almanca tarafında sapmalar tanıyıcının
 * gerçekte döndürdüğü kelimelere dayanıyor; burada tanıyıcı hiç çalışmadığı
 * için yazılacak her satır tahmin olurdu — yani ölü içerik. Onun yerine ağırlık
 * `hint` alanlarına veriliyor: her görev, sesin nasıl çıkarılacağını ve
 * Hochdeutsch karşılığından nerede ayrıldığını anlatıyor.
 *
 * Tur yine de eksiksiz çalışıyor: model ses (Leni gerçekten İsviçre Almancası
 * konuşuyor) dinlenir, öğrenci tekrar eder ve kendi değerlendirir. Konuşma
 * çalışmasının aslı zaten bu — "shadowing" yönteminde ölçen kişi öğrencinin
 * kendisidir.
 */
export const zhSpeaking: SpeakingDrillExercise[] = [
  // ─────────────────── A1 · Ch sesi ───────────────────
  //
  // Züritüütsch'ün en ayırt edici sesi ve öğrenilmesi gereken ilk şey.
  // Hochdeutsch'ta „k“ olan pek çok yerde lehçede gırtlaktan gelen bir „ch“
  // var: Kind → Chind, Küche → Chuchi, Käse → Chäs. Bu ses ne Türkçede ne de
  // standart Almancada kelime başında bulunuyor, yani sıfırdan öğreniliyor.
  {
    id: "zh-a1-s1",
    level: "A1",
    skill: "speaking",
    course: "gsw-zh",
    judge: "self",
    title: "De Ch-Luut",
    genre: "Ses çalışması",
    intro:
      "Züritüütsch'ün imzası bu ses. Hochdeutsch'ta „k“ olan yerde lehçede gırtlaktan gelen bir „ch“ var: Kind → Chind. Ne Türkçede ne standart Almancada kelime başında bulunur.",
    gloss: [
      { de: "s Chind", tr: "çocuk (Hochdeutsch: das Kind)" },
      { de: "d Chuchi", tr: "mutfak (die Küche)" },
      { de: "de Chäs", tr: "peynir (der Käse)" },
      { de: "chli", tr: "küçük (klein)" },
      { de: "cho", tr: "gelmek (kommen)" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "s Chind",
        tr: "çocuk",
        hint:
          "Türkçe „hı“ gibi ama daha derinden — dilin arkası küçük dile yaklaşır ve hava sürtünerek çıkar. „K“ gibi kapatma, hava akmaya devam etsin.",
      },
      {
        de: "d Chuchi",
        tr: "mutfak",
        hint:
          "Aynı ses iki kez: CHU-chi. Bu kelime lehçenin sembolü sayılır — İsviçreliler yabancıları „Chuchichäschtli“ (mutfak dolabı) ile sınar.",
      },
      {
        de: "Ich hätt gern e Stückli Chäs.",
        tr: "Bir parça peynir istiyorum.",
        hint:
          "„Chäs“ = Hochdeutsch „Käse“. Baştaki ch'yi yumuşatma; „käs“ dersen standart Almanca konuşmuş olursun.",
      },
      {
        de: "Das isch es chlises Huus.",
        tr: "Bu küçük bir ev.",
        hint:
          "„chli“ (klein) yine aynı sesle başlıyor. „isch“ ise Hochdeutsch „ist“ — lehçede st her yerde şt okunur.",
      },
      {
        de: "Chumm, mir gönd go poschte.",
        tr: "Hadi, alışverişe gidelim.",
        hint:
          "„Chumm“ = „komm“. Günlük konuşmanın en sık kalıplarından biri; ch sesini burada hızlı söylemeye çalış.",
      },
    ],
  },

  // ─────────────────── A1 · tek ünlüler ───────────────────
  //
  // Hochdeutsch'un ikili ünlüleri (ei, au, eu) Züritüütsch'te tek uzun sese
  // dönüyor: Zeit → Ziit, Haus → Huus, Leute → Lüüt. Türkçe konuşan için bu
  // aslında kolaylık — Türkçede zaten ikili ünlü yok — ama Hochdeutsch
  // öğrenmiş biri için ters yönde bir alışkanlık kırma işi.
  {
    id: "zh-a1-s2",
    level: "A1",
    skill: "speaking",
    course: "gsw-zh",
    judge: "self",
    title: "Eifachi Vokal",
    genre: "Ses çalışması",
    intro:
      "Hochdeutsch'un ikili ünlüleri lehçede tek uzun sese dönüşür: Zeit → Ziit, Haus → Huus, Leute → Lüüt. Çift yazılan harf sesin uzun olduğunu gösterir.",
    gloss: [
      { de: "d Ziit", tr: "zaman (die Zeit)" },
      { de: "s Huus", tr: "ev (das Haus)" },
      { de: "d Lüüt", tr: "insanlar (die Leute)" },
      { de: "wiit", tr: "uzak (weit)" },
      { de: "de Bruef", tr: "meslek (der Beruf)" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Ich han kei Ziit.",
        tr: "Vaktim yok.",
        hint:
          "„Ziit“ = Zeit ama „ay“ yok: ZİİT, uzun i. Çift i yazılması bunun içindir.",
      },
      {
        de: "Mir gönd hei is Huus.",
        tr: "Eve gidiyoruz.",
        hint:
          "„Huus“ = Haus, „au“ yok: HUUS, uzun u. Türkçede zaten ikili ünlü olmadığı için bu sana kolay gelecek.",
      },
      {
        de: "Vill Lüüt sind hüt do.",
        tr: "Bugün çok insan var.",
        hint:
          "„Lüüt“ = Leute → LÜÜT, uzun ü. „hüt“ = heute, o da tek ünlü.",
      },
      {
        de: "Das isch nöd wiit vo do.",
        tr: "Burası uzak değil.",
        hint:
          "„wiit“ = weit → VİİT. „nöd“ ise Hochdeutsch „nicht“ — lehçenin en sık kelimelerinden.",
      },
      {
        de: "Was isch dis Bruef?",
        tr: "Mesleğin ne?",
        hint:
          "„Bruef“ = Beruf; vurgu ilk hecede ve „ue“ tek akışta söylenir: BRUEF.",
      },
    ],
  },

  // ─────────────────── A2 · -li eki ───────────────────
  //
  // Lehçenin ikinci imzası. İki ayrı işi var ve ikisi de çok sık:
  // Hochdeutsch'un -chen/-lein küçültmesi lehçede -li oluyor (Stück → Stückli),
  // ve -lich ile biten sıfatlar -li'ye kısalıyor (wirklich → würkli).
  //
  // Türkçe konuşan için tuzak, ekin sonundaki i'yi uzatmak: Türkçede vurgu
  // sona kayar, oysa burada vurgu kökte kalır ve -li hafifçe söylenir.
  {
    id: "zh-a2-s1",
    level: "A2",
    skill: "speaking",
    course: "gsw-zh",
    judge: "self",
    title: "S -li am Ändi",
    genre: "Ses çalışması",
    intro:
      "„-li“ eki lehçede iki iş yapar: küçültme (Stück → Stückli) ve -lich sonlarının kısalması (wirklich → würkli). Vurgu kökte kalır, ek hafifçe söylenir.",
    gloss: [
      { de: "s Stückli", tr: "parçacık (das Stückchen)" },
      { de: "s Meitli", tr: "kız (das Mädchen)" },
      { de: "s Chäschtli", tr: "dolapçık (das Kästchen)" },
      { de: "würkli", tr: "gerçekten (wirklich)" },
      { de: "fründli", tr: "cana yakın (freundlich)" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Nimm no es Stückli.",
        tr: "Bir parça daha al.",
        hint:
          "Vurgu ŞTÜK'te; „-li“ arkadan hafifçe gelir. Türkçedeki gibi sona vurgu yaparsan yabancı duyulur.",
      },
      {
        de: "S Meitli isch scho i de Schuel.",
        tr: "Kız çoktan okulda.",
        hint:
          "„Meitli“ = Mädchen. „isch“ = ist, „Schuel“ = Schule — ikisinde de lehçenin tek ünlü kuralı işliyor.",
      },
      {
        de: "Das isch würkli guet.",
        tr: "Bu gerçekten iyi.",
        hint:
          "„würkli“ = wirklich. Sonundaki -lich tamamen -li'ye iniyor; ch sesi burada yok.",
      },
      {
        de: "Si isch en fründlichi Frau.",
        tr: "O cana yakın bir kadın.",
        hint:
          "„fründli“ = freundlich, ama sıfat çekimlenince „fründlichi“ oluyor — ek geri geliyor.",
      },
      {
        de: "Häsch s Chäschtli gseh?",
        tr: "Dolapçığı gördün mü?",
        hint:
          "Baştaki Ch (A1'deki ses) ve sondaki -li aynı kelimede. „gseh“ = gesehen; lehçe ge- ekini de kısaltıyor.",
      },
    ],
  },

  // ─────────────── A2 · en sık fiiller ───────────────
  //
  // Lehçeyi anlaşılır kılan şey kelime dağarcığından çok bu birkaç fiilin
  // sesi: Hochdeutsch bilen biri „ist, hat, geht, kommt“ bekliyor ve karşısına
  // „isch, hät, gaht, chunt“ çıkıyor. Bunlar her cümlede geçtiği için önce
  // bunlar oturmalı — gerisi arkasından geliyor.
  {
    id: "zh-a2-s2",
    level: "A2",
    skill: "speaking",
    course: "gsw-zh",
    judge: "self",
    title: "Die wichtigschte Verbe",
    genre: "Ses çalışması",
    intro:
      "Bu birkaç fiil her cümlede geçiyor ve Hochdeutsch'tan en çok ayrılan yerler bunlar. Önce bunlar oturursa lehçenin geri kalanı çok daha kolay geliyor.",
    gloss: [
      { de: "isch", tr: "-dir (ist)" },
      { de: "hät", tr: "sahip (hat)" },
      { de: "gaht", tr: "gidiyor (geht)" },
      { de: "chunt", tr: "geliyor (kommt)" },
      { de: "wott", tr: "istiyor (will)" },
    ],
    minutes: 6,
    tasks: [
      {
        de: "Das isch mis Huus.",
        tr: "Bu benim evim.",
        hint:
          "„isch“ = ist. Lehçede „st“ her yerde şt okunur, sonda bile: İŞ.",
      },
      {
        de: "Er hät kei Ziit.",
        tr: "Onun vakti yok.",
        hint:
          "„hät“ = hat, ama a değil ä: HÄT. „kei“ = kein, „Ziit“ = Zeit.",
      },
      {
        de: "Wohi gaht si?",
        tr: "O nereye gidiyor?",
        hint:
          "„gaht“ = geht; e yerine uzun a var: GAAT. „wohi“ = wohin.",
      },
      {
        de: "Wänn chunt de Zug?",
        tr: "Tren ne zaman geliyor?",
        hint:
          "„chunt“ = kommt ve A1'deki Ch sesiyle başlıyor. „wänn“ = wann.",
      },
      {
        de: "Ich wott es Kafi, bitte.",
        tr: "Bir kahve istiyorum, lütfen.",
        hint:
          "„wott“ = will. Çift t kısa ve sert biter. „es“ = ein, „Kafi“ = Kaffee.",
      },
    ],
  },

  // ─────────── B1 · cümle ritmi ve sık kalıplar ───────────
  //
  // A1 ve A2 tek tek sesleri çalıştırıyor; lehçeyi asıl lehçe yapan şey ise
  // cümlenin akışı. Züritüütsch'te kelimeler birbirine bağlanıyor ve sık
  // kalıplar neredeyse tek kelime gibi söyleniyor („gäll?“, „oder?“,
  // „chum emal“). Tek tek doğru ses çıkarıp cümleyi Hochdeutsch ritminde
  // söylemek hâlâ yabancı duyuluyor.
  //
  // Bu seviyede model sesi (Leni) daha da önemli: hedef tek tek kelimeler
  // değil, onun cümleyi nereye bağladığı.
  {
    id: "zh-b1-s1",
    level: "B1",
    skill: "speaking",
    course: "gsw-zh",
    judge: "self",
    title: "Satzrhythmus",
    genre: "Ses çalışması",
    intro:
      "Doğru sesleri çıkarmak yetmiyor: lehçeyi lehçe yapan cümlenin akışı. Kelimeler birbirine bağlanır, sık kalıplar tek kelime gibi söylenir. Leni'yi dinle ve nereye bağladığına dikkat et.",
    gloss: [
      { de: "gäll?", tr: "değil mi? (nicht wahr?)" },
      { de: "chum emal", tr: "gel hele (komm mal)" },
      { de: "es git", tr: "var (es gibt)" },
      { de: "i weiss nöd", tr: "bilmiyorum (ich weiß nicht)" },
      { de: "das gaht scho", tr: "olur, tamam (das geht schon)" },
    ],
    minutes: 7,
    tasks: [
      {
        de: "Das isch schön, gäll?",
        tr: "Güzel, değil mi?",
        hint:
          "„gäll“ cümlenin sonuna yapışır ve tonu yukarı çıkar. Ayrı bir kelime gibi değil, cümlenin kuyruğu gibi söylenir.",
      },
      {
        de: "Chum emal do ane!",
        tr: "Gel hele buraya!",
        hint:
          "Üç kelime tek akışta: CHUM-e-mal-DO-ane. „emal“ kendi başına vurgusuz, „chum“ ve „do“ taşıyor.",
      },
      {
        de: "I weiss nöd, öb er chunt.",
        tr: "Gelip gelmeyeceğini bilmiyorum.",
        hint:
          "„I weiss nöd“ neredeyse tek kelime: İ-VAYS-nöd. Virgülden sonra kısa bir duraklama var.",
      },
      {
        de: "Es git no vill z tue.",
        tr: "Yapılacak çok şey var.",
        hint:
          "„z tue“ = „zu tun“; „z“ kendi başına bir hece değil, sonraki kelimeye yapışır: ts-TUE.",
      },
      {
        de: "Das gaht scho, mach dir kei Sorge.",
        tr: "Olur, merak etme.",
        hint:
          "İki parçalı: teselli eden ilk kısım düşen tonda, ikinci kısım yumuşak. Lehçenin en sık günlük kalıplarından.",
      },
    ],
  },
];
