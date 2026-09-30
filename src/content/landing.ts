import type { NativeLang } from "@/lib/i18n/dict";

/**
 * TANITIM SAYFASININ METNİ — üç arayüz dilinde.
 *
 * KAYNAK MAĞAZA VİTRİNİ. Konumlandırma, sütunların sırası, sayılar ve her iddia
 * `docs/store/README.md` "Vitrin kararları" ile onaylı uzun açıklamalardan geliyor:
 * vitrinde değişen bir cümle burada da değişir. Sayılar yuvarlak ve sabit
 * ("8.500'den fazla"), veritabanından sayılmıyor; vitrin kararı öyle.
 *
 * NEDEN SÖZLÜKTE DEĞİL. Sayfa düz etiketlerden değil yapılı içerikten oluşuyor
 * (konuşma dökümü, tablo satırları, kelime listeleri) ve her dil KENDİ kursunu
 * anlatıyor: Türkçe ziyaretçi Almanca (+ İngilizce), İngilizce ziyaretçi
 * Almanca, Almanca ziyaretçi İngilizce kursunu görüyor (`coursesForNative`).
 * Anahtar anahtar sözlüğe bölmek bu yapıyı kaybettirirdi; hukuk metinleri de
 * aynı sebeple `src/content/legal/`da.
 *
 * KONUŞMA DÖKÜMÜ GERÇEK. Türkçe ve İngilizce sürümdeki iş görüşmesi, uygulamada
 * B1 "Das Vorstellungsgespräch" adımında yapay zekâyla, o dilin arayüzüyle
 * yapılmış konuşmalardan birebir alındı (ekranları `public/landing/tr-de/` ve
 * `en-de/conversation-*`); düzeltme ve öneriler modelin kendi cevabı. Almanca
 * sürüm İngilizce kursu anlatıyor; onun dökümü de Almanca arayüzle yapılmış
 * İngilizce konuşmadan (`de-en/conversation-*`).
 *
 * YAZILMAYANLAR (vitrin kuralları): "eğlenceli", "oyun", "çocuk"; sınav markası;
 * fiyat; "ücretsiz ve sınırsız sohbet"; "tam unutmak üzereyken". Deneme sınavının
 * "sonunda başarı yüzdesi" 745930f5'ten beri yazılıyor: yazma ve konuşma bölüm
 * sonucu görev puanlarını topluyor (denetim T15), vitrin metniyle aynı cümle.
 */

export type ScreenId = "path" | "unit" | "conversation" | "mock-task" | "walk-intro" | "home" | "skills";

/** Kursların hedef dili ve anlatım dili (arayüz dili). */
export type CourseLang = "de" | "en";
export type PairNative = NativeLang;

/**
 * DİL YOLLARI — `lib/courses` `PAIR_READY`in vitrine açılan kısmı: Türkçe
 * konuşan Almanca ve İngilizce, İngilizce konuşan Almanca, Almanca konuşan
 * İngilizce öğreniyor. Züritüütsch (gsw-zh) duraklatılmış, yeni kullanıcıya
 * sunulmuyor; burada da yok. Çift açılır ya da kapanırsa burası da değişir.
 * Sıra: önce ziyaretçinin kendi yolları, sonra ötekiler (sayfada sıralanıyor).
 */
export const PAIRS: readonly { native: PairNative; course: CourseLang }[] = [
  { native: "tr", course: "de" },
  { native: "tr", course: "en" },
  { native: "en", course: "de" },
  { native: "de", course: "en" },
];

/**
 * Sayfayı başka dilde açan düğmenin etiketi — KENDİ dilinde yazılıyor: onu
 * arayan kişi sayfanın şu anki dilini okuyamıyor olabilir (LangSetting de
 * dilleri kendi adlarıyla yazıyor).
 */
export const SWITCH_LABEL: Record<NativeLang, string> = {
  tr: "Sayfayı Türkçe göster",
  en: "Show this page in English",
  de: "Diese Seite auf Deutsch",
};

export type Pillar = {
  id: string;
  screen: ScreenId;
  title: string;
  lede: string;
  more?: string[];
  caption: string;
};

export type LandingCopy = {
  hero: { line1: string; line2: string; intro: string; noAccount: string };
  cta: {
    web: string;
    webSignedIn: string;
    appStoreSmall: string;
    appStoreLabel: string;
    playSmall: string;
    playLabel: string;
    soon: string;
    install: string;
  };
  stats: { value: string; label: string }[];
  statsNote: string;
  /** Dört dil yolu (bkz. `PAIRS`): Lernomi tek dil uygulaması değil. */
  langs: {
    title: string;
    lede: string;
    /** Kursun hedef dili, ziyaretçinin dilinde: "Almanca", "German", "Deutsch". */
    course: Record<CourseLang, string>;
    /** Anlatım dili, ziyaretçinin dilinde: "Türkçe anlatımla", "Explained in Turkish". */
    explained: Record<PairNative, string>;
    /** Kursun kelime sayısı (vitrindeki yuvarlak sayı). */
    words: Record<CourseLang, string>;
    rest: string;
    yours: string;
    /** Başka anadil ziyaretçisine: bu sayfayı onun dilinde aç (etiket o dilde, `SWITCH_LABEL`). */
    langNav: string;
  };
  /** Ekranların erişilebilir açıklamaları (uygulamanın o dildeki görüntüsü). */
  alt: Record<ScreenId, string>;
  heroCaption: string;
  dockLabel: string;
  path: Pillar & { steps: string[]; stepsLabel: string };
  talk: Pillar & {
    label: string;
    scene: string;
    lang: string;
    aiName: string;
    aiTag: string;
    me: string;
    ai1: string;
    ai1Gloss: string;
    /** Öğrencinin cümlesi; ikinci düzeltme varsa `wrong2/right2/after2`. */
    mine: { before: string; wrong: string; right: string; after: string; wrong2?: string; right2?: string; after2?: string };
    fix: string;
    ai2: string;
    hintsLabel: string;
    hints: string[];
  };
  exam: Pillar & {
    head: [string, string];
    rows: { name: string; nameLang: string; local: string; how: string }[];
  };
  walk: Pillar & {
    heardLabel: string;
    saidLabel: string;
    heard: string;
    said: string;
    saidLang: string;
    cueLabel: string;
    modes: { when: string; what: string; premium?: boolean }[];
  };
  daily: Pillar & {
    wordsLabel: string;
    words: { article?: "der" | "die" | "das"; word: string; gloss: string }[];
    wordsLang: string;
    wordsNote?: string;
  };
  skills: Pillar & { list: string[] };
  start: { title: string; body: string };
  plans: {
    title: string;
    sub: string;
    freeTitle: string;
    free: string[];
    earn: string;
    premiumTitle: string;
    premiumSub: string;
    premium: string[];
    packs: string;
    trial: string;
  };
  fine: {
    accountTitle: string;
    account: string[];
    certTitle: string;
    cert: string;
    disclaimer: string;
  };
};

const tr: LandingCopy = {
  hero: {
    line1: "Konuş, anla,",
    line2: "sınava hazırlan.",
    intro:
      "Lernomi ile Almanca ya da İngilizce öğren: A1'den C1'e, Türkçe anlatımla ve konuşarak. Kelime ezberinde kalmazsın: dili kullanırsın, konuşmana ve yazına geri bildirim alırsın, hazır olduğunda deneme sınavlarıyla kendini ölçersin.",
    noAccount: "Hesap açmadan başlarsın.",
  },
  cta: {
    web: "Tarayıcıda başla",
    webSignedIn: "Öğrenmeye devam et",
    appStoreSmall: "iPhone ve iPad için",
    appStoreLabel: "App Store",
    playSmall: "Android için",
    playLabel: "Google Play",
    soon: "iPhone ve Android uygulamaları yakında mağazalarda.",
    install: "Şimdilik telefonuna ekle",
  },
  stats: [
    { value: "2", label: "kurs: Almanca, İngilizce" },
    { value: "900+", label: "alıştırma, her kursta" },
    { value: "50+", label: "deneme sınavı, her kursta" },
  ],
  statsNote: "Almancada 8.500'den, İngilizcede 7.000'den fazla kelime. Aşağıdaki örnekler Almanca kursundan.",
  langs: {
    title: "Tek dil değil: dört dil yolu.",
    lede: "Patika, konuşma adımları, deneme sınavları ve anlatım her yolda aynı yapıda. Anlatım, ipuçları ve geri bildirim senin dilinde.",
    course: { de: "Almanca", en: "İngilizce" },
    explained: { tr: "Türkçe anlatımla", en: "İngilizce anlatımla", de: "Almanca anlatımla" },
    words: { de: "8.500+ kelime", en: "7.000+ kelime" },
    rest: "Başka dilde konuşanlar için",
    yours: "Senin için",
    langNav: "Sayfanın dili",
  },
  alt: {
    path: "Patika ekranı: B1 seviyesi, şu anki ünite İş dünyası, sıradaki adım okuma, Devam et düğmesi.",
    unit: "Ünite ekranı: İş dünyası ünitesinin adımları; konuşma adımı tamamlanmış, sıradaki okuma.",
    conversation:
      "Konuşma adımı: iş görüşmesinde yapay zekâ karakteri soruyor, kullanıcının cevabındaki seit drei Jahre hatası seit drei Jahren olarak düzeltiliyor, altta üç öneri.",
    "mock-task": "Deneme sınavı, yazma bölümü: görev süresi sayacı, Almanca görev ve Türkçe açıklaması, içerik noktaları.",
    "walk-intro": "Yürüyüş modu: Türkçe ipucunu duyarsın, Almanca karşılığını sesli söylersin; bugün kalan tur sayısı.",
    home: "Öğren ekranı: günlük kelime turu, günlük hedef ve günün görevleri.",
    skills: "Beceriler ekranı: B1 seviyesi; okuma, dinleme, yazma, konuşma ve dil bilgisi sekmeleri, okuma metinleri listesi.",
  },
  heroCaption: "Patika: sıradaki adım bir dokunuşta.",
  dockLabel: "Uygulamadan ekranlar",
  path: {
    id: "adim-adim",
    screen: "unit",
    title: "A1'den C1'e adım adım, Türkçe anlatımla.",
    lede: "Patika seni seviye seviye, ünite ünite ilerletir. Modül ve seviye sınavlarıyla nerede olduğunu görürsün.",
    stepsLabel: "Her ünitede",
    steps: ["Okuma", "Dinleme", "Konuşma", "Yazma", "Dil bilgisi", "Quiz"],
    more: ["Başlangıç seviyeni kendin seç ya da kısa bir seviye testiyle bul."],
    caption: "B1'in ilk ünitesi: İş dünyası.",
  },
  talk: {
    id: "konusma",
    screen: "conversation",
    title: "Konuşarak öğren.",
    lede: "Doktorda, iş görüşmesinde, yol sorarken… Gerçek hayatta karşına çıkacak durumları yapay zekâ karakteriyle konuşarak çalışırsın. Hatanı hemen düzeltir, takıldığında ne diyebileceğini önerir.",
    more: [
      "Her Konuşma adımı Türkçe bir anlatımla başlar: kullanacağın kalıpları önce kendi dilinde okursun. Karşındakinin yapay zekâ olduğunu uygulama ekranda söyler.",
    ],
    /* Türkçe arayüzle, Almanca kursunda yapılan konuşmadan (2026-09-30, ekran
       görüntüsü `public/landing/tr-de/conversation-*`), B1 "Der Lebenslauf". */
    label: "Almanca kursunda geçen bir konuşma",
    scene: "B1 · İş görüşmesi",
    lang: "de",
    aiName: "Görüşmeci",
    aiTag: "yapay zekâ",
    me: "Sen",
    ai1: "Erzählen Sie uns bitte kurz von Ihrem Werdegang. Wo haben Sie angefangen?",
    ai1Gloss: "Lütfen kariyer yolunuzdan kısaca bahsedin. Nerede başladınız?",
    mine: {
      before: "Ich arbeite seit drei ",
      wrong: "Jahre",
      right: "Jahren",
      after: " als Buchhalterin bei einer Firma in Köln.",
    },
    fix: "seit'ten sonra Dativ gelir: seit drei Jahren.",
    ai2: "Das ist ein guter Anfang. Was genau sind Ihre Aufgaben in dieser Position?",
    hintsLabel: "Takılırsan önerir:",
    hints: [
      "Ich bin für die Buchhaltung zuständig.",
      "Ich kümmere mich um die Rechnungen.",
      "Meine Arbeit umfasst die Bilanzierung.",
    ],
    caption: "Hata sohbet sürerken düzeltilir.",
  },
  exam: {
    id: "deneme-sinavlari",
    screen: "mock-task",
    title: "Dört becerili deneme sınavları.",
    lede: "Her seviyede birden çok, toplamda 50'den fazla deneme sınavı. Okuma, dinleme, yazma ve konuşma bölümlerinin her birinin kendi süresi var. Sonunda başarı yüzdeni ve neye çalışman gerektiğini gösteren bir liste alırsın.",
    head: ["Bölüm", "Nasıl puanlanır"],
    rows: [
      { name: "Lesen", nameLang: "de", local: "Okuma", how: "Otomatik puanlanır." },
      { name: "Hören", nameLang: "de", local: "Dinleme", how: "Otomatik puanlanır." },
      { name: "Schreiben", nameLang: "de", local: "Yazma", how: "Yapay zekâ puanlar, hatalarını gösterir." },
      { name: "Sprechen", nameLang: "de", local: "Konuşma", how: "Yapay zekâ puanlar, hatalarını gösterir." },
    ],
    caption: "B1 deneme sınavı, yazma görevi.",
  },
  walk: {
    id: "cepte-yuruyus",
    screen: "walk-intro",
    title: "Cepte yürüyüş.",
    lede: "Yürüyüş modunda ekrana bakmadan çalışırsın: Türkçe ipucunu duyar, kelimeyi sesli söylersin.",
    cueLabel: "Örnek: deneyim kelimesini duyarsın, die Erfahrung diye söylersin.",
    heardLabel: "Duyduğun",
    saidLabel: "Söylediğin",
    heard: "deneyim",
    said: "die Erfahrung",
    saidLang: "de",
    modes: [
      { when: "Ekran açıkken", what: "Ücretsiz, günde 3 tur" },
      { when: "Telefon cebinde, ekran kapalıyken", what: "Premium", premium: true },
    ],
    caption: "Yürüyüş modu, başlamadan önce.",
  },
  daily: {
    id: "her-gun",
    screen: "home",
    title: "Her gün birkaç dakika.",
    lede: "Günlük kelime turunda aralıklı tekrar, kelimeleri unutmadan önce yeniden karşına getirir.",
    wordsLabel: "Örnek: B1'in ilk ünitesinden kelimeler",
    wordsLang: "de",
    words: [
      { article: "der", word: "Lebenslauf", gloss: "özgeçmiş" },
      { article: "die", word: "Erfahrung", gloss: "deneyim" },
      { article: "das", word: "Vorstellungsgespräch", gloss: "iş görüşmesi" },
    ],
    wordsNote: "Artikeller uygulamadaki gibi renkli: der mavi, die kırmızı, das yeşil.",
    more: ["Haftalık quiz, seri ve haftalık lig de var; istersen arkadaşlarınla karşılaştırırsın."],
    caption: "Öğren ekranı: günlük tur ve günün görevleri.",
  },
  skills: {
    id: "beceriler",
    screen: "skills",
    title: "Dili biraz biliyorsan: Beceriler.",
    lede: "Beceriler'de istediğin seviyeden alıştırma yaparsın; Patika'da o seviyeye gelmeyi beklemen gerekmez.",
    list: ["Okuma", "Dinleme", "Yazma", "Konuşma", "Dil bilgisi"],
    caption: "Beceriler, B1.",
  },
  start: {
    title: "Hesap açmadan başla.",
    body: "Hesap oluşturunca ilerlemen hesabına taşınır; telefonda, tablette ve web'de aynı hesapla devam edersin.",
  },
  plans: {
    title: "Ücretsiz başla, istediğinde Premium'a geç.",
    sub: "Reklam yok. Hesabını uygulamanın içinden silebilirsin.",
    freeTitle: "Ücretsiz",
    free: [
      "Kelime çalışma, pratik, okuma, dinleme, dil bilgisi ve quiz ücretsiz ve sınırsız.",
      "Haftalık quiz ve ekran açıkken yürüyüş, günde 3 tur.",
      "Her seviyede 1 deneme sınavı.",
      "Patika'da her seviyede 2 Konuşma ve 2 Yazma adımı; Beceriler'de 2 konuşma ve 2 yazma değerlendirmesi.",
    ],
    earn: "Açık olanları bitirip 7 günlük seri yapınca her birine 2, deneme sınavına 1 yeni hak eklenir; sonra her 7 günlük seride yeniden.",
    premiumTitle: "Premium",
    premiumSub: "Aylık ya da yıllık abonelik.",
    premium: [
      "Telefon cebinde, ekran kapalıyken Cepte yürüyüş.",
      "Bütün deneme sınavları.",
      "Patika'da ve Beceriler'de bütün konuşma ve yazma çalışmaları, seri ve bitirme beklemeden.",
    ],
    packs: "Deneme sınavları her seviyede 3'lü paketlerle açılır: paketteki 3 sınavı bitirince sonraki paket gelir.",
    trial: "Yeni abonelere ilk ay ücretsiz.",
  },
  fine: {
    accountTitle: "Hesabın ve verin",
    account: [
      "Hesap açmadan başlarsın. Arkadaşlar ve lig, yapay zekâyla sohbet, yapay zekâ değerlendirmesi ve Premium hesap ister; hesapsızken Konuşma adımı önceden hazırlanmış bir sohbetle sürer.",
      "Metnin yapay zekâya ancak iznini verirsen gider.",
    ],
    certTitle: "Başarı belgesi",
    cert: "Modül ve seviye sınavlarını geçince neler yapabildiğini gösteren, paylaşabileceğin bir başarı belgesi alırsın.",
    disclaimer:
      "Deneme sınavlarını Lernomi hazırladı; Lernomi hiçbir sınav kurumuyla bağlantılı değildir, belgeler resmî bir sertifika yerine geçmez.",
  },
};

const en: LandingCopy = {
  hero: {
    line1: "Speak, understand,",
    line2: "ace exams.",
    intro:
      "Learn German from A1 to C1 with Lernomi: explained in English, practiced by speaking. Go beyond word lists: use the language, get feedback on your speaking and writing, and test yourself with mock exams when you're ready.",
    noAccount: "No account needed to start.",
  },
  cta: {
    web: "Start in your browser",
    webSignedIn: "Continue learning",
    appStoreSmall: "For iPhone and iPad",
    appStoreLabel: "App Store",
    playSmall: "For Android",
    playLabel: "Google Play",
    soon: "The iPhone and Android apps are coming to the stores soon.",
    install: "Add it to your phone for now",
  },
  stats: [
    { value: "8,500+", label: "German words" },
    { value: "900+", label: "exercises" },
    { value: "50+", label: "mock exams" },
  ],
  statsNote: "From A1 to C1, with explanations in English.",
  langs: {
    title: "One app, four language paths.",
    lede: "Path, speaking steps, mock exams and explanations work the same way on every path. Explanations, hints and feedback come in your own language.",
    course: { de: "German", en: "English" },
    explained: { tr: "Explained in Turkish", en: "Explained in English", de: "Explained in German" },
    words: { de: "8,500+ words", en: "7,000+ words" },
    rest: "For speakers of other languages",
    yours: "For you",
    langNav: "Page language",
  },
  alt: {
    path: "Path screen: level B1, current unit on the working world, next step reading, Continue button.",
    unit: "Unit screen: the steps of the working-world unit; the speaking step is done, reading is next.",
    conversation:
      "Speaking step: in a job interview the AI character asks a question; the user's mistake seit drei Jahre is corrected to seit drei Jahren; three suggestions below.",
    "mock-task": "Mock exam, speaking section: task timer, the German task with its English explanation, content points and a Start speaking button.",
    "walk-intro": "Walk mode: you hear the cue and say the German word out loud; rounds left today.",
    home: "Learn screen: daily word round, daily goal and today's tasks.",
    skills: "Skills screen: level B1; reading, listening, writing, speaking and grammar tabs, list of reading texts.",
  },
  heroCaption: "Path: your next step is one tap away.",
  dockLabel: "Screens from the app",
  path: {
    id: "step-by-step",
    screen: "unit",
    title: "A1 to C1, step by step.",
    lede: "The Path takes you level by level, unit by unit, and module and level exams show you where you stand.",
    stepsLabel: "Every unit has",
    steps: ["Reading", "Listening", "Speaking", "Writing", "Grammar", "Quiz"],
    more: ["Pick your starting level yourself or find it with a short placement test."],
    caption: "The first B1 unit: the working world.",
  },
  talk: {
    id: "speaking",
    screen: "conversation",
    title: "Learn by speaking.",
    lede: "At the doctor's, in a job interview, asking for directions… Practice real-life situations by talking with an AI character. It corrects your mistakes right away and suggests what you could say when you get stuck.",
    more: [
      "Each Speaking step opens with a short intro in English to the phrases you'll use. The app tells you on screen that you're talking to an AI.",
    ],
    /* İngilizce arayüzle, Almanca kursunda yapılan konuşmadan (2026-09-30, ekran
       görüntüsü `public/landing/en-de/conversation-*`), B1 "Der Lebenslauf". */
    label: "A conversation from the German course",
    scene: "B1 · Job interview",
    lang: "de",
    aiName: "Interviewer",
    aiTag: "AI",
    me: "You",
    ai1: "Erzählen Sie uns bitte kurz von Ihrem Werdegang. Wo haben Sie angefangen?",
    ai1Gloss: "Please tell us briefly about your career. Where did you start?",
    mine: {
      before: "Ich arbeite seit drei ",
      wrong: "Jahre",
      right: "Jahren",
      after: " als Buchhalterin bei einer Firma in Köln.",
    },
    fix: "seit takes the dative: seit drei Jahren. And where English says \"I have been working\", German uses the present tense.",
    ai2: "Das ist ein interessanter Startpunkt. Was genau waren Ihre Aufgaben in dieser Position in Köln?",
    hintsLabel: "Stuck? It suggests:",
    hints: [
      "Ich war für die Buchhaltung zuständig.",
      "Ich habe die Rechnungen bearbeitet.",
      "Meine Aufgaben waren sehr vielfältig.",
    ],
    caption: "Mistakes are corrected while you talk.",
  },
  exam: {
    id: "mock-exams",
    screen: "mock-task",
    title: "Four-skill mock exams.",
    lede: "Several at every level, more than 50 in total. Reading, Listening, Writing and Speaking each have their own time limit. At the end you get your score as a percentage and a list of what to work on.",
    head: ["Section", "How it's scored"],
    rows: [
      { name: "Lesen", nameLang: "de", local: "Reading", how: "Scored automatically." },
      { name: "Hören", nameLang: "de", local: "Listening", how: "Scored automatically." },
      { name: "Schreiben", nameLang: "de", local: "Writing", how: "Scored by AI, with your mistakes shown." },
      { name: "Sprechen", nameLang: "de", local: "Speaking", how: "Scored by AI, with your mistakes shown." },
    ],
    caption: "B1 mock exam, speaking task.",
  },
  walk: {
    id: "pocket-walking",
    screen: "walk-intro",
    title: "Pocket Walking.",
    lede: "In Walk mode you study without looking at the screen: you hear the English cue and say the German word out loud.",
    cueLabel: "Example: you hear experience and say die Erfahrung.",
    heardLabel: "You hear",
    saidLabel: "You say",
    heard: "experience",
    said: "die Erfahrung",
    saidLang: "de",
    modes: [
      { when: "Screen on", what: "Free, 3 rounds a day" },
      { when: "Phone in your pocket, screen off", what: "Premium", premium: true },
    ],
    caption: "Walk mode, before you start.",
  },
  daily: {
    id: "every-day",
    screen: "home",
    title: "A few minutes a day.",
    lede: "In the daily word round, spaced repetition brings words back before you forget them.",
    wordsLabel: "Example: words from the first B1 unit",
    wordsLang: "de",
    words: [
      { article: "der", word: "Lebenslauf", gloss: "CV" },
      { article: "die", word: "Erfahrung", gloss: "experience" },
      { article: "das", word: "Vorstellungsgespräch", gloss: "job interview" },
    ],
    wordsNote: "Articles are colored as in the app: der blue, die red, das green.",
    more: ["There's a weekly quiz, a streak and a weekly league too, and you can compare your ranking with friends."],
    caption: "Learn screen: daily round and today's tasks.",
  },
  skills: {
    id: "skills",
    screen: "skills",
    title: "Know some German already? Skills.",
    lede: "In Skills you practice at any level you like, without waiting to reach it on the Path.",
    list: ["Reading", "Listening", "Writing", "Speaking", "Grammar"],
    caption: "Skills, B1.",
  },
  start: {
    title: "Start without an account.",
    body: "Once you create one, your progress moves into it, and you continue with the same account on phone, tablet and the web.",
  },
  plans: {
    title: "Start free, go Premium when you want.",
    sub: "No ads. You can delete your account right in the app.",
    freeTitle: "Free",
    free: [
      "Vocabulary, practice, reading, listening, grammar and quizzes are free and unlimited.",
      "The weekly quiz and Walk mode with the screen on, 3 rounds a day.",
      "1 mock exam per level.",
      "In Path, 2 Speaking and 2 Writing steps per level; in Skills, 2 speaking and 2 writing assessments.",
    ],
    earn: "Finish what's open and reach a 7-day streak to get 2 more of each and 1 more mock exam; then again with every further 7 days of streak.",
    premiumTitle: "Premium",
    premiumSub: "Monthly or yearly subscription.",
    premium: [
      "Pocket Walking with your phone in your pocket and the screen off.",
      "Every mock exam.",
      "Every Speaking and Writing step in Path and every assessment in Skills, with no waiting for streaks or finishing.",
    ],
    packs: "Mock exams open in packs of 3 at each level: finish the 3 exams in a pack and the next pack opens.",
    trial: "New subscribers get the first month free.",
  },
  fine: {
    accountTitle: "Your account and your data",
    account: [
      "You can start without an account. Friends and leagues, AI conversation, AI feedback and Premium need one; without an account, the Speaking step runs as a prepared conversation.",
      "Your text is only sent to the AI if you allow it.",
    ],
    certTitle: "Certificate of achievement",
    cert: "Pass module and level exams to earn a certificate of achievement you can share, showing what you can do.",
    disclaimer:
      "The mock exams are Lernomi's own; Lernomi is not affiliated with any exam provider, and certificates of achievement are not official certificates.",
  },
};

const de: LandingCopy = {
  hero: {
    line1: "Sprechen, verstehen,",
    line2: "bestehen.",
    intro:
      "Lerne mit Lernomi Englisch von A1 bis C1, mit Erklärungen auf Deutsch und durch Sprechen. Statt nur Vokabeln zu pauken, benutzt du die Sprache, bekommst Feedback zu Sprechen und Schreiben und misst dich mit Probeprüfungen.",
    noAccount: "Du startest ohne Konto.",
  },
  cta: {
    web: "Im Browser starten",
    webSignedIn: "Weiterlernen",
    appStoreSmall: "Für iPhone und iPad",
    appStoreLabel: "App Store",
    playSmall: "Für Android",
    playLabel: "Google Play",
    soon: "Die Apps für iPhone und Android kommen bald in die Stores.",
    install: "Bis dahin aufs Handy legen",
  },
  stats: [
    { value: "7.000+", label: "englische Wörter" },
    { value: "900+", label: "Übungen" },
    { value: "50+", label: "Probeprüfungen" },
  ],
  statsNote: "Von A1 bis C1, mit Erklärungen auf Deutsch.",
  langs: {
    title: "Eine App, vier Sprachwege.",
    lede: "Pfad, Sprechen-Schritte, Probeprüfungen und Erklärungen sind auf jedem Weg gleich aufgebaut. Erklärungen, Hinweise und Feedback bekommst du in deiner Sprache.",
    course: { de: "Deutsch", en: "Englisch" },
    explained: { tr: "Auf Türkisch erklärt", en: "Auf Englisch erklärt", de: "Auf Deutsch erklärt" },
    words: { de: "8.500+ Wörter", en: "7.000+ Wörter" },
    rest: "Für andere Muttersprachen",
    yours: "Für dich",
    langNav: "Sprache der Seite",
  },
  alt: {
    path: "Pfad-Ansicht: Niveau B1, aktuelle Einheit, nächster Schritt und die Schaltfläche Weiter.",
    unit: "Einheit-Ansicht im Englischkurs: My career so far ist erledigt, als Nächstes der Lesetext Three rules for a résumé.",
    conversation:
      "Sprechen-Schritt im Englischkurs: Die KI-Figur aus der Karriereberatung fragt nach deiner Ausbildung; I work … since three years wird zu I have worked … for three years korrigiert, darunter drei Vorschläge.",
    "mock-task": "Probeprüfung, Teil Schreiben: Aufgabenzeit, Aufgabe mit Erklärung und Inhaltspunkte.",
    "walk-intro": "Gehmodus: Du hörst den Hinweis und sagst das Wort laut; verbleibende Runden heute.",
    home: "Lernen-Ansicht: tägliche Wortrunde, Tagesziel und Aufgaben des Tages.",
    skills: "Fertigkeiten-Ansicht: Niveau B1; Lesen, Hören, Schreiben, Sprechen und Grammatik, Liste der Lesetexte.",
  },
  heroCaption: "Pfad: der nächste Schritt mit einem Tippen.",
  dockLabel: "Ansichten aus der App",
  path: {
    id: "schritt-fuer-schritt",
    screen: "unit",
    title: "Von A1 bis C1, Schritt für Schritt.",
    lede: "Der Pfad führt dich Niveau für Niveau, Einheit für Einheit; Modul- und Niveauprüfungen zeigen, wo du stehst.",
    stepsLabel: "Jede Einheit hat",
    steps: ["Lesen", "Hören", "Sprechen", "Schreiben", "Grammatik", "Quiz"],
    more: ["Dein Startniveau wählst du selbst oder per kurzem Einstufungstest."],
    caption: "Die erste Einheit auf B1.",
  },
  talk: {
    id: "sprechen",
    screen: "conversation",
    title: "Lernen durch Sprechen.",
    lede: "Beim Arzt, im Vorstellungsgespräch, beim Fragen nach dem Weg … Alltagssituationen übst du im Gespräch mit einer KI-Figur. Sie korrigiert Fehler sofort und schlägt dir etwas vor, wenn du nicht weiterweißt.",
    more: [
      "Jeder Sprechen-Schritt beginnt mit einer kurzen Einführung der Wendungen auf Deutsch. Die App zeigt an, dass du mit einer KI sprichst.",
    ],
    /* Almanca arayüzle, İngilizce kursunda yapılan konuşmadan (2026-09-30,
       ekran görüntüsü `public/landing/de-en/conversation-*`), B1 "Writing a
       résumé": Almanca konuşanın tipik hatası "since three years" + şimdiki zaman. */
    label: "Ein Gespräch aus dem Englischkurs",
    scene: "B1 · Einen Lebenslauf schreiben",
    lang: "en",
    aiName: "Karriereberatung",
    aiTag: "KI",
    me: "Du",
    ai1: "Let's start with your education. What had you done before your first job?",
    ai1Gloss: "Fangen wir mit deiner Ausbildung an. Was hattest du vor deiner ersten Stelle gemacht?",
    mine: {
      before: "I studied economics in Ankara, and I ",
      wrong: "work",
      right: "have worked",
      after: " in a bank ",
      wrong2: "since",
      right2: "for",
      after2: " three years.",
    },
    fix: "Läuft es seit drei Jahren und noch heute, steht im Englischen das Present Perfect mit for, nicht die Gegenwart mit since.",
    ai2: "Ankara is a beautiful city with a great history. It sounds like you have a solid background in economics. What was your first professional role after you finished your degree?",
    hintsLabel: "Wenn du nicht weiterweißt, schlägt sie vor:",
    hints: [
      "I worked as an intern.",
      "I started as a junior analyst.",
      "My first job was in sales.",
    ],
    caption: "Fehler werden mitten im Gespräch korrigiert.",
  },
  exam: {
    id: "probepruefungen",
    screen: "mock-task",
    title: "Probeprüfungen in vier Fertigkeiten.",
    lede: "Mehrere pro Niveau, insgesamt mehr als 50. Lesen, Hören, Schreiben und Sprechen haben jeweils eine eigene Zeit. Am Ende siehst du dein Ergebnis in Prozent und woran du arbeiten solltest.",
    head: ["Teil", "Bewertung"],
    rows: [
      { name: "Reading", nameLang: "en", local: "Lesen", how: "Wird automatisch bewertet." },
      { name: "Listening", nameLang: "en", local: "Hören", how: "Wird automatisch bewertet." },
      { name: "Writing", nameLang: "en", local: "Schreiben", how: "Eine KI bewertet und zeigt deine Fehler." },
      { name: "Speaking", nameLang: "en", local: "Sprechen", how: "Eine KI bewertet und zeigt deine Fehler." },
    ],
    caption: "Probeprüfung, Teil Schreiben.",
  },
  walk: {
    id: "gehmodus",
    screen: "walk-intro",
    title: "Taschen-Gehmodus.",
    lede: "Im Gehmodus lernst du ohne Blick aufs Display: Du hörst den deutschen Hinweis und sagst das englische Wort laut.",
    cueLabel: "Beispiel: Du hörst die Erfahrung und sagst experience.",
    heardLabel: "Du hörst",
    saidLabel: "Du sagst",
    heard: "die Erfahrung",
    said: "experience",
    saidLang: "en",
    modes: [
      { when: "Bildschirm an", what: "Kostenlos, 3 Runden pro Tag" },
      { when: "Handy in der Tasche, Bildschirm aus", what: "Premium", premium: true },
    ],
    caption: "Gehmodus, vor dem Start.",
  },
  daily: {
    id: "jeden-tag",
    screen: "home",
    title: "Jeden Tag ein paar Minuten.",
    lede: "In der täglichen Runde bringt verteilte Wiederholung Wörter zurück, bevor du sie vergisst.",
    wordsLabel: "Beispiel: Wörter aus der ersten B1-Einheit",
    wordsLang: "en",
    words: [
      { word: "career", gloss: "die Karriere" },
      { word: "experience", gloss: "die Erfahrung" },
      { word: "responsibility", gloss: "die Verantwortung" },
    ],
    more: ["Dazu ein Wochen-Quiz, deine Serie und die Wochenliga; wenn du willst, vergleichst du dich mit Freunden."],
    caption: "Lernen-Ansicht: tägliche Runde und Aufgaben des Tages.",
  },
  skills: {
    id: "fertigkeiten",
    screen: "skills",
    title: "Mit Vorkenntnissen: Fertigkeiten.",
    lede: "Bei den Fertigkeiten übst du auf jedem Niveau, ohne es erst im Pfad zu erreichen.",
    list: ["Lesen", "Hören", "Schreiben", "Sprechen", "Grammatik"],
    caption: "Fertigkeiten, B1.",
  },
  start: {
    title: "Ohne Konto starten.",
    body: "Mit einem Konto kommt dein Fortschritt mit, und du lernst auf Handy, Tablet und im Web weiter.",
  },
  plans: {
    title: "Kostenlos starten, Premium wenn du willst.",
    sub: "Keine Werbung. Dein Konto löschst du in der App.",
    freeTitle: "Kostenlos",
    free: [
      "Vokabeln, Üben, Lesen, Hören, Grammatik und Quiz sind kostenlos und unbegrenzt.",
      "Das Wochen-Quiz und der Gehmodus bei eingeschaltetem Bildschirm, 3 Runden pro Tag.",
      "1 Probeprüfung pro Niveau.",
      "Pro Niveau 2 Sprechen- und 2 Schreiben-Schritte im Pfad, bei den Fertigkeiten 2 Sprech- und 2 Schreibbewertungen.",
    ],
    earn: "Schließt du das Offene ab und erreichst eine 7-Tage-Serie, kommen je 2 weitere und 1 Probeprüfung dazu; danach alle weiteren 7 Serientage erneut.",
    premiumTitle: "Premium",
    premiumSub: "Monats- oder Jahresabo.",
    premium: [
      "Taschen-Gehmodus, auch bei ausgeschaltetem Bildschirm.",
      "Alle Probeprüfungen.",
      "Alle Sprech- und Schreibaufgaben in Pfad und Fertigkeiten, ohne auf Serie oder Abschluss zu warten.",
    ],
    packs: "Probeprüfungen öffnen sich pro Niveau in 3er-Paketen: Ist ein Paket fertig, kommt das nächste.",
    trial: "Neue Abonnenten bekommen den ersten Monat kostenlos.",
  },
  fine: {
    accountTitle: "Dein Konto, deine Daten",
    account: [
      "Du kannst ohne Konto loslegen. Freunde und Liga, KI-Gespräche, KI-Feedback und Premium brauchen ein Konto; ohne Konto läuft der Sprechen-Schritt als vorbereitetes Gespräch.",
      "Dein Text geht nur mit deiner Erlaubnis an die KI.",
    ],
    certTitle: "Leistungsnachweis",
    cert: "Für bestandene Modul- und Niveauprüfungen bekommst du einen teilbaren Leistungsnachweis, der zeigt, was du kannst.",
    disclaimer:
      "Die Probeprüfungen stammen von Lernomi; Lernomi ist mit keinem Prüfungsanbieter verbunden, ein Leistungsnachweis ersetzt kein offizielles Zertifikat.",
  },
};

export const LANDING: Record<NativeLang, LandingCopy> = { tr, en, de };

/**
 * EKRAN SETLERİ — dil ÇİFTİ başına, yalnız çeviri değil: her ziyaretçi kendi
 * arayüzünü ve kendi kursunu görüyor (Türkçe → Almanca kursu, İngilizce →
 * Almanca kursu, Almanca → İngilizce kursu). Klasör `public/landing/<çift>/`,
 * dosya `<ekran>-<light|dark>-<480|720>.webp`. Çekim yöntemi
 * `docs/store/screenshots.md`.
 *
 * `null`: o dilin seti henüz çekilmedi; sayfa `SCREEN_FALLBACK`i gösteriyor.
 */
export const SCREEN_SET: Record<NativeLang, string | null> = {
  tr: "tr-de",
  en: "en-de",
  de: "de-en",
};
export const SCREEN_FALLBACK = "en-de";
