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
];
