import type { SkillExercise } from "../types";

/**
 * A1 · Ses çalışması — Türkçe konuşanın Almancada öngörülebilir hataları.
 *
 * Neden bu dosya var: seviye sınavının Sprechen bölümü beceri bankasından
 * besleniyor ve bankada HİÇ konuşma egzersizi yoktu, o yüzden A1 seviye
 * sınavında konuşma bölümü hiç çıkmıyordu. Puanlama boş bölümün ağırlığını
 * diğerlerine dağıtıyor (ceza yok), ama konuşma tabanlı bir kursta seviye
 * sınavının konuşma ÖLÇMEMESİ ciddi bir eksik.
 *
 * İçeriğin seçimi rastgele değil: aşağıdaki her başlık Türkçe ile Almanca
 * arasındaki BELİRLİ bir ses dizgesi farkından doğuyor. Türkçe konuşan biri
 * için kolay olanlar (ö, ü, son sessiz sertleşmesi) hiç çalıştırılmıyor —
 * Türkçede zaten varlar. Zor olanlar:
 *
 *   z  → [ts].  Türkçede z hep [z]; "Zeit" öğrencide "zayt" çıkıyor.
 *   s  → ünlüden önce [z]. Türkçede s hep [s]; "sagen" → "sagen" değil "zagen".
 *   st/sp → sözcük başında [ʃt]/[ʃp]. "Straße" = "ştrase". Yazıda hiç yok.
 *   v  → [f], w → [v]. Türkçedeki v ile tam ters eşleşiyor.
 *   ch → İKİ ayrı ses: ön ünlüden sonra [ç] (ich), arka ünlüden sonra [x]
 *        (Buch). Türkçede ikisi de yok; öğrenci "ş" ya da "k" koyuyor.
 *   -er sonu → [ɐ], neredeyse "a". "Vater" ≈ "Fata", "Vaterr" değil.
 *   ei/ie → [aɪ] / [iː]. Yazılış birbirine benziyor, ses bambaşka.
 *   ünlü UZUNLUĞU anlam ayırıyor: Stadt [a] ≠ Staat [aː]. Türkçede uzunluk
 *        anlam ayırmaz, o yüzden kulak bu farkı hiç aramıyor.
 *
 * `confusions.heard` alanı tanıyıcının o hata yapıldığında ÜRETECEĞİ biçimi
 * yazıyor; öğrenciye "yanlış" demek yerine ne olduğunu söyleyebiliyoruz.
 */
export const a1Speaking: SkillExercise[] = [
  {
    id: "a1-u04-s1",
    level: "A1",
    skill: "speaking",
    unit: 4,
    title: "z sesi: „ts“",
    genre: "Ses çalışması",
    intro:
      "Almancada z HER ZAMAN „ts“ okunur — Türkçedeki z değil. En sık ve en kolay düzeltilen hata.",
    gloss: [
      { de: "zwei", tr: "iki", en: "two" },
      { de: "zehn", tr: "on", en: "ten" },
      { de: "zusammen", tr: "birlikte", en: "together" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Ich bin zwanzig Jahre alt.",
        tr: "Yirmi yaşındayım.",
        hint: "„zwanzig“ = TSVAN-tsiç. Baştaki z „ts“, sondaki -ig „iç“.",
        confusions: [{ heard: ["swanzig", "sanzig", "wanzig"], fix: "z'yi Türkçe z gibi değil, „ts“ diye söyle.", expected: "zwanzig" }],
      },
      {
        de: "Wir gehen zusammen.",
        tr: "Birlikte gidiyoruz.",
        hint: "„zusammen“ = tsu-ZA-men. Baş: ts. Ortadaki s ünlüler arasında [z].",
      },
      {
        de: "Das kostet zehn Euro.",
        tr: "Bu on euro tutuyor.",
        hint: "„zehn“ = TSEEN, uzun e. „h“ okunmaz, ünlüyü UZATIR.",
        confusions: [{ heard: ["sehn", "zen"], fix: "Baştaki ts'yi duyur; „h“ ses değil, uzatma işareti.", expected: "zehn" }],
      },
      {
        de: "Ich habe zwei Kinder.",
        tr: "İki çocuğum var.",
        hint: "„zwei“ = TSVAY. ei her zaman „ay“ okunur.",
      },
      {
        de: "Wie viel Uhr ist es?",
        tr: "Saat kaç?",
        hint: "„viel“ = FİİL. v Almancada [f] okunur.",
        confusions: [{ heard: ["wie wiel", "wi wil"], fix: "v harfini „f“ gibi söyle: fiel.", expected: "viel" }],
      },
      {
        de: "Wir sind zu Hause.",
        tr: "Evdeyiz.",
        hint: "„zu“ = TSU. Kısa ama ts sesi yine tam.",
      },
    ],
  },
  {
    id: "a1-u07-s1",
    level: "A1",
    skill: "speaking",
    unit: 7,
    title: "s sesi: ünlüden önce „z“",
    genre: "Ses çalışması",
    intro:
      "Almancada sözcük başındaki s, ünlüden önce [z] okunur. Türkçede s hep [s], o yüzden bu ses hiç kurulmuyor.",
    gloss: [
      { de: "sieben", tr: "yedi", en: "seven" },
      { de: "die Sonne", tr: "güneş", en: "sun" },
      { de: "sagen", tr: "söylemek", en: "to say" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Wir sind sieben Personen.",
        tr: "Yedi kişiyiz.",
        hint: "„sieben“ = Zİİ-ben. ie = uzun İ, s = z.",
        confusions: [{ heard: ["siben", "siepen", "sie ben"], fix: "Baştaki s'yi „z“ diye söyle; ie'yi uzat.", expected: "sieben" }],
      },
      {
        de: "Die Suppe ist sehr gut.",
        tr: "Çorba çok güzel.",
        hint: "„Suppe“ = ZU-pe, „sehr“ = ZEER.",
      },
      {
        de: "Was sagen Sie?",
        tr: "Ne diyorsunuz?",
        hint: "„sagen“ = ZA-gen, „Sie“ = Zİİ.",
      },
      {
        de: "Ich sehe die Suppe.",
        tr: "Çorbayı görüyorum.",
        hint: "„sehe“ = ZE-e. Ama „das“ gibi sözcüklerin sonundaki s [s] kalır — kural yalnız BAŞTA.",
        confusions: [{ heard: ["ich zehe", "ich zee"], fix: "Baştaki s [z]; ama sözcük SONUNDAKİ s [z] olmaz.", expected: "sehe" }],
      },
      {
        de: "Am Sonntag habe ich Zeit.",
        tr: "Pazar günü vaktim var.",
        hint: "„Sonntag“ = ZON-tak. Sondaki -g [k] okunur.",
      },
      {
        de: "Meine Schwester ist hier.",
        tr: "Kız kardeşim burada.",
        hint: "„sch“ tek ses: Türkçe ş. „Schwester“ = ŞVES-ta.",
      },
    ],
  },
  {
    id: "a1-u10-s1",
    level: "A1",
    skill: "speaking",
    unit: 10,
    title: "st ve sp: „şt“ ve „şp“",
    genre: "Ses çalışması",
    intro:
      "Sözcük başındaki st ve sp „şt“ ve „şp“ okunur. Yazıda hiçbir ş yok — bu yüzden gözle okuyan öğrenci hiç yakalayamıyor.",
    gloss: [
      { de: "aufstehen", tr: "kalkmak", en: "to get up" },
      { de: "die Stunde", tr: "saat (süre)", en: "hour" },
      { de: "spät", tr: "geç", en: "late" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Ich stehe um sieben auf.",
        tr: "Yedide kalkıyorum.",
        hint: "„stehe“ = ŞTE-e. Söz BAŞINDA st → şt.",
        confusions: [{ heard: ["istehe", "ist ehe", "es tee"], fix: "st'yi „şt“ diye söyle: ŞTE-e.", expected: "stehe" }],
      },
      {
        de: "Es ist schon spät.",
        tr: "Vakit geç oldu.",
        hint: "„spät“ = ŞPEET. sp → şp; ä uzun ve açık e.",
        confusions: [{ heard: ["spet", "es pät", "sbät"], fix: "sp'yi „şp“ diye söyle ve ä'yı uzat.", expected: "spät" }],
      },
      {
        de: "Die Stunde beginnt jetzt.",
        tr: "Ders şimdi başlıyor.",
        hint: "„Stunde“ = ŞTUN-de.",
      },
      {
        de: "Ich habe keine Zeit.",
        tr: "Vaktim yok.",
        hint: "„Zeit“ = TSAYT. z = ts, ei = ay.",
      },
      {
        de: "Ich verstehe das nicht.",
        tr: "Bunu anlamıyorum.",
        hint: "DİKKAT: „verstehe“ içindeki st sözcük başında DEĞİL, ama „stehen“ kendi başına bir sözcük olduğu için yine „şt“: fer-ŞTE-e.",
      },
      {
        de: "Am Montag arbeite ich nicht.",
        tr: "Pazartesi çalışmıyorum.",
        hint: "„nicht“ sonundaki ch = ince [ç]; Türkçe „ş“ değil, „h“ de değil.",
      },
    ],
  },
  {
    id: "a1-u13-s1",
    level: "A1",
    skill: "speaking",
    unit: 13,
    title: "v ve w: ters eşleşme",
    genre: "Ses çalışması",
    intro:
      "Almancada v = [f], w = [v]. Türkçedeki v ile TAM TERS eşleşiyor, o yüzden ikisi de yanlış çıkıyor.",
    gloss: [
      { de: "der Verkäufer", tr: "satıcı", en: "salesperson" },
      { de: "wie viel", tr: "ne kadar", en: "how much" },
      { de: "wieder", tr: "yine", en: "again" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Wie viel kostet das?",
        tr: "Bu ne kadar?",
        hint: "„Wie“ = Vİİ (w = v), „viel“ = FİİL (v = f). Aynı cümlede iki ters kural.",
        confusions: [{ heard: ["wie wiel", "wi wil"], fix: "w'yi „v“, v'yi „f“ oku — Türkçedekinin tersi.", expected: "Wie viel" }],
      },
      {
        de: "Der Verkäufer ist sehr nett.",
        tr: "Satıcı çok kibar.",
        hint: "„Verkäufer“ = fer-KOY-fa. v = f, äu = oy, sondaki -er ≈ „a“.",
        confusions: [{ heard: ["werkäufer", "wer koifer"], fix: "Baştaki v'yi „f“ diye söyle.", expected: "Verkäufer" }],
      },
      {
        de: "Wo wohnen Sie?",
        tr: "Nerede oturuyorsunuz?",
        hint: "İki w de [v]: VO VO-nen.",
      },
      {
        de: "Ich komme wieder.",
        tr: "Yine geleceğim.",
        hint: "„wieder“ = Vİİ-da. ie uzun İ, sondaki -er neredeyse „a“.",
      },
      {
        de: "Das ist zu teuer.",
        tr: "Bu çok pahalı.",
        hint: "„teuer“ = TOY-a. eu = oy.",
        confusions: [{ heard: ["teyer", "te uer"], fix: "eu her zaman „oy“ okunur.", expected: "teuer" }],
      },
      {
        de: "Ich brauche eine Jacke.",
        tr: "Bir cekete ihtiyacım var.",
        hint: "„Jacke“ = YA-ke. Almancada j = Türkçe y.",
        confusions: [{ heard: ["schacke", "dschacke"], fix: "j'yi Türkçe „j“ değil, „y“ diye söyle.", expected: "Jacke" }],
      },
    ],
  },
  {
    id: "a1-u16-s1",
    level: "A1",
    skill: "speaking",
    unit: 16,
    title: "ch: iki ayrı ses",
    genre: "Ses çalışması",
    intro:
      "„ch“ tek harf çifti ama İKİ ses: ince ünlüden sonra [ç] (ich), kalın ünlüden sonra boğazdan [x] (Buch). Türkçede ikisi de yok.",
    gloss: [
      { de: "die Küche", tr: "mutfak", en: "kitchen" },
      { de: "suchen", tr: "aramak", en: "to look for" },
      { de: "noch", tr: "hâlâ", en: "still" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ich spreche nicht viel.",
        tr: "Çok konuşmuyorum.",
        hint: "„ich“ ve „nicht“: İNCE ch. Dilin ortası damağa yaklaşır — „iş“ değil.",
        confusions: [{ heard: ["isch spreche nischt", "ik spreche nikt"], fix: "ch'yi „ş“ ya da „k“ ile değiştirme; i'den sonra ince ch gelir.", expected: "ich nicht" }],
      },
      {
        de: "Die Küche ist klein.",
        tr: "Mutfak küçük.",
        hint: "„Küche“ = KÜ-çe. ü'den sonra yine İNCE ch.",
      },
      {
        de: "Ich suche eine Wohnung.",
        tr: "Bir daire arıyorum.",
        hint: "DİKKAT: „suche“ içinde u'dan sonra KALIN ch — boğazdan. Aynı cümlede „ich“ ince.",
        confusions: [{ heard: ["ich siche", "ich süche"], fix: "u'dan sonraki ch boğazdan gelir, i'den sonraki damaktan.", expected: "suche" }],
      },
      {
        de: "Ich mache das noch.",
        tr: "Bunu daha yapacağım.",
        hint: "„mache“ ve „noch“: a ve o'dan sonra KALIN ch.",
      },
      {
        de: "Das Buch ist auf dem Tisch.",
        tr: "Kitap masanın üstünde.",
        hint: "„Buch“ kalın ch; „Tisch“ ise sch = Türkçe ş. İkisi farklı ses.",
        confusions: [{ heard: ["busch", "buschisch"], fix: "„ch“ ile „sch“ karışmasın: Buch boğazdan, Tisch „ş“.", expected: "Buch Tisch" }],
      },
      {
        de: "Wir möchten einen Tisch.",
        tr: "Bir masa istiyoruz.",
        hint: "„möchten“ = MÖÇ-ten. ö'den sonra ince ch.",
      },
    ],
  },
  {
    id: "a1-u19-s1",
    level: "A1",
    skill: "speaking",
    unit: 19,
    title: "Sondaki -er: neredeyse „a“",
    genre: "Ses çalışması",
    intro:
      "Sözcük sonundaki -er, r gibi okunmaz — zayıf bir „a“ya döner. Türkçe konuşan r'yi tam söyleyince cümle hemen yabancı duyuluyor.",
    gloss: [
      { de: "das Wetter", tr: "hava", en: "weather" },
      { de: "wieder", tr: "yine", en: "again" },
      { de: "lieber", tr: "daha çok (tercihen)", en: "rather" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Das Wetter ist heute schön.",
        tr: "Hava bugün güzel.",
        hint: "„Wetter“ = VE-ta. Sondaki r'yi YUVARLAMA, „a“ya bırak.",
        confusions: [{ heard: ["wetterr", "wetter r"], fix: "Sondaki -er zayıf „a“dır; r'yi tam söyleme.", expected: "Wetter" }],
      },
      {
        de: "Ich höre lieber Musik.",
        tr: "Daha çok müzik dinlerim.",
        hint: "„lieber“ = Lİİ-ba. „höre“ = HÖ-re — buradaki r sözcük sonunda DEĞİL, o yüzden duyulur.",
      },
      {
        de: "Mein Bruder spielt Fußball.",
        tr: "Kardeşim futbol oynuyor.",
        hint: "„Bruder“ = BRU-da. Baştaki r duyulur, sondaki -er „a“.",
      },
      {
        de: "Am Sonntag gehe ich schwimmen.",
        tr: "Pazar günü yüzmeye giderim.",
        hint: "„Sonntag“ = ZON-tak: baştaki s = z, sondaki g = k.",
      },
      {
        de: "Die Kinder sind hier.",
        tr: "Çocuklar burada.",
        hint: "„Kinder“ = KİN-da.",
      },
      {
        de: "Ich komme später wieder.",
        tr: "Sonra yine geleceğim.",
        hint: "İki -er arka arkaya: ŞPEE-ta Vİİ-da. Ayrıca sp → şp.",
      },
    ],
  },
  {
    id: "a1-u22-s1",
    level: "A1",
    skill: "speaking",
    unit: 22,
    title: "ei ve ie: yazı benzer, ses bambaşka",
    genre: "Ses çalışması",
    intro:
      "ei = „ay“, ie = uzun „ii“. İki harf aynı, sıra farklı — ve ses tamamen farklı. Kural: İKİNCİ harf okunur.",
    gloss: [
      { de: "die Arbeit", tr: "iş", en: "work" },
      { de: "das Bier", tr: "bira", en: "beer" },
      { de: "bleiben", tr: "kalmak", en: "to stay" },
    ],
    minutes: 4,
    tasks: [
      {
        de: "Ich bleibe zu Hause.",
        tr: "Evde kalıyorum.",
        hint: "„bleibe“ = BLAY-be. ei → ay. Kural: ikinci harf (i) okunur.",
        confusions: [{ heard: ["blibe", "bliebe"], fix: "ei „ii“ değil „ay“ okunur.", expected: "bleibe" }],
      },
      {
        de: "Die Arbeit ist fertig.",
        tr: "İş bitti.",
        hint: "„Arbeit“ = AR-bayt.",
      },
      {
        de: "Ich trinke ein Bier.",
        tr: "Bir bira içiyorum.",
        hint: "„Bier“ = BİİA (uzun i), „ein“ = AYN. Aynı cümlede ikisi de var.",
        confusions: [{ heard: ["bayer", "beier"], fix: "ie uzun „ii“; ei ise „ay“. İkinci harf okunur.", expected: "Bier" }],
      },
      {
        de: "Wie heißen Sie?",
        tr: "Adınız ne?",
        hint: "„Wie“ = Vİİ, „heißen“ = HAY-sen. ß = keskin s.",
      },
      {
        de: "Ich schreibe eine Karte.",
        tr: "Bir kart yazıyorum.",
        hint: "„schreibe“ = ŞRAY-be.",
      },
      {
        de: "Vielen Dank und viele Grüße.",
        tr: "Çok teşekkürler ve selamlar.",
        hint: "„Vielen“ = FİİLen (v = f, ie = uzun i), „Grüße“ = GRÜ-se.",
      },
    ],
  },
  {
    id: "a1-u25-s1",
    level: "A1",
    skill: "speaking",
    unit: 25,
    title: "Ünlü uzunluğu anlam ayırır",
    genre: "Ses çalışması",
    intro:
      "Almancada ünlü uzunluğu ANLAM değiştirir: Stadt (şehir) ≠ Staat (devlet). Türkçede uzunluk anlam ayırmadığı için kulak bu farkı hiç aramıyor.",
    gloss: [
      { de: "die Stadt", tr: "şehir", en: "city" },
      { de: "der Anfang", tr: "başlangıç", en: "beginning" },
      { de: "stolz", tr: "gururlu", en: "proud" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Ich wohne in der Stadt.",
        tr: "Şehirde oturuyorum.",
        hint: "„Stadt“ KISA a: ŞTAT. Uzatırsan „Staat“ (devlet) olur.",
        confusions: [{ heard: ["staat", "schtaat"], fix: "a'yı kısa tut; uzun a bambaşka bir sözcük yapar.", expected: "Stadt" }],
      },
      {
        de: "Am Anfang war es schwer.",
        tr: "Başlangıçta zordu.",
        hint: "„war“ uzun a: VAAR. „Anfang“ ilk a kısa.",
      },
      {
        de: "Ich bin wirklich stolz.",
        tr: "Gerçekten gururluyum.",
        hint: "„stolz“ = ŞTOLTS. st → şt, z → ts. İki kural bir sözcükte.",
        confusions: [{ heard: ["stols", "s tolz"], fix: "Başta „şt“, sonda „ts“.", expected: "stolz" }],
      },
      {
        de: "Gestern war ein guter Tag.",
        tr: "Dün güzel bir gündü.",
        hint: "„guter“ = GU-ta (uzun u, sondaki -er = a), „Tag“ = TAAK (sondaki g → k).",
      },
      {
        de: "Ich habe viel gelernt.",
        tr: "Çok şey öğrendim.",
        hint: "„viel“ = FİİL, „gelernt“ = ge-LERNT — buradaki r duyulur, sözcük sonunda değil.",
      },
      {
        de: "Nächsten Monat mache ich den Test.",
        tr: "Gelecek ay sınava gireceğim.",
        hint: "„Nächsten“ = NEEKS-ten; ä uzun açık e, chs = „ks“ okunur.",
        confusions: [{ heard: ["nechten", "nächten"], fix: "„chs“ bitişikken „ks“ olur — ch sesi kaybolur.", expected: "nächsten" }],
      },
    ],
  },
];
