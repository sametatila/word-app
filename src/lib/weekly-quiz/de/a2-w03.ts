import type { QuizWeek } from "../types";

/**
 * Almanca A2, hafta 3 — seyahat ve yol tarifi.
 *
 * Yeni omurga: iki durumlu edat (yön Akkusativ / yer Dativ), `zu`/`nach` ayrımı,
 * ayrılabilir fiil emir kipinde. Geri dönüş: `kasus.dativ` (W2) `mit` ile,
 * `imperativ.sie` (W2) ve `partizip.trennbar` + `perfekt.sein` (W1).
 */
export const DE_A2_W03: QuizWeek = {
  id: "de-a2-w03",
  course: "de",
  level: "A2",
  no: 3,
  theme: "Unterwegs: Reisen und Wege",
  themeTr: "Seyahat ve yol tarifi",
  canDo: ["A2.SPK.2", "A2.LS.1", "A2.RD.1", "A2.GR.2", "A2.GR.5"],
  stimuli: [
    {
      kind: "text",
      id: "de-a2-w03-t1",
      genre: "E-Mail",
      genreTr: "e-posta",
      title: "So kommen Sie zu uns",
      body:
        "Liebe Frau Brandt,\n\nschön, dass Sie bei uns wohnen! So kommen Sie vom Bahnhof zu unserer Wohnung: " +
        "Nehmen Sie die Straßenbahn Nummer 4 bis zum Marktplatz. Dort steigen Sie in den Bus 12 um und fahren drei Haltestellen. " +
        "Steigen Sie am Rathaus aus. Gehen Sie dann geradeaus bis zur Ampel und an der Ampel links. " +
        "Unser Haus ist das dritte auf der rechten Seite, neben einer Bäckerei. Den Schlüssel bekommen Sie in der Bäckerei. " +
        "Zu Fuß brauchen Sie vom Bahnhof 40 Minuten, mit der Straßenbahn und dem Bus nur 15. " +
        "Am Sonntag fährt der Bus 12 leider nicht. Dann nehmen Sie am besten ein Taxi.\n\nGute Reise!\nKatrin Vogel",
    },
    {
      kind: "audio",
      id: "de-a2-w03-a1",
      genre: "Durchsage und Gespräch",
      genreTr: "anons ve konuşma",
      plays: 2,
      segments: [
        { speaker: "Durchsage", text: "Achtung, eine Information: Der Zug nach München hat heute 20 Minuten Verspätung. Er fährt heute nicht von Gleis 5, sondern von Gleis 7." },
        { speaker: "Emre", text: "Entschuldigung, haben Sie das verstanden? Fährt der Zug nach München jetzt von Gleis 5?" },
        { speaker: "Frau", text: "Nein, von Gleis 7. Und er kommt 20 Minuten später." },
        { speaker: "Emre", text: "Oh nein, dann verpasse ich in München meinen Anschluss nach Salzburg." },
        { speaker: "Frau", text: "Fragen Sie am besten am Schalter. Vielleicht können Sie einen anderen Zug nehmen." },
        { speaker: "Emre", text: "Und wo ist der Schalter?" },
        { speaker: "Frau", text: "Gehen Sie die Treppe nach unten und dann rechts. Der Schalter ist gegenüber vom Café." },
        { speaker: "Emre", text: "Vielen Dank!" },
      ],
    },
  ],
  items: [
    // ── Okuma ──────────────────────────────────────────────────────────
    {
      id: "de-a2-w03-r1",
      block: "read",
      ref: "de-a2-w03-t1",
      stem: "Wo steigt Frau Brandt in den Bus um?",
      options: ["am Rathaus", "am Bahnhof", "an der Ampel", "am Marktplatz"],
      answer: 3,
      why: "`umsteigen` bir araçtan ötekine geçmek, `aussteigen` inmek demek. Rathaus iniş durağı, aktarma değil. İki ayrılabilir fiilin önekini (`um`/`aus`) cümle sonunda yakalamadan okuyunca yanlış durak seçiliyor.",
      targets: ["lesen.detail", "verb.trennbar"],
    },
    {
      id: "de-a2-w03-r2",
      block: "read",
      ref: "de-a2-w03-t1",
      stem: "Frau Brandt kommt an einem Sonntag an. Wie fährt sie am besten zur Wohnung?",
      options: ["mit der Straßenbahn und dem Bus", "mit dem Taxi", "mit dem Bus 12", "mit der Straßenbahn Nummer 12"],
      answer: 1,
      why: "Metnin büyük kısmı olağan günlerin tarifi. Sondaki `Am Sonntag …` cümlesi bir istisna getiriyor ve istisna genel kuralı ezer. Uzun tarifi hatırlayıp son cümleyi atlamak bu sorunun tuzağı.",
      targets: ["lesen.detail"],
    },
    {
      id: "de-a2-w03-r3",
      block: "read",
      ref: "de-a2-w03-t1",
      stem: "Wo bekommt Frau Brandt den Schlüssel?",
      options: ["in der Bäckerei", "im Haus neben der Bäckerei", "am Rathaus", "bei Frau Vogel am Bahnhof"],
      answer: 0,
      why: "Bäckerei metinde iki işle geçiyor: evin yerini gösteren işaret (`neben einer Bäckerei`) ve anahtarın alındığı yer (`in der Bäckerei`). `neben` yanında demek, `in` içinde; edatı okumadan sözcüğü eşleyince konum ile yer karışıyor.",
      targets: ["lesen.detail", "praep.wechsel"],
    },
    // ── Dinleme ────────────────────────────────────────────────────────
    {
      id: "de-a2-w03-l1",
      block: "listen",
      ref: "de-a2-w03-a1",
      stem: "Von welchem Gleis fährt der Zug nach München heute?",
      options: ["von Gleis 5", "von Gleis 20", "von Gleis 7", "von Gleis 12"],
      answer: 2,
      why: "Anons önce olağan peronu (5), sonra değişikliği (7) söylüyor ve ikisini `nicht …, sondern …` ile bağlıyor. Anonslarda ilk duyulan sayı çoğu zaman eski bilgi; `sondern`dan sonrası geçerli olan.",
      targets: ["hoeren.detail", "konnektor.sondern"],
    },
    {
      id: "de-a2-w03-l2",
      block: "listen",
      ref: "de-a2-w03-a1",
      stem: "Welches Problem hat Emre?",
      options: ["Er hat sein Ticket verloren.", "Er verpasst vielleicht seinen Anschluss.", "Er findet das Gleis nicht.", "Der Zug fährt heute nicht."],
      answer: 1,
      why: "Gecikme tek başına Emre'nin derdi değil; derdi gecikmenin sonucu. `Anschluss` bir sonraki bağlantı treni demek ve sonuç `dann …` ile geliyor. Yalnız duyulan olayı (gecikme) değil, konuşanın ondan çıkardığı sonucu izlemek gerekiyor.",
      targets: ["hoeren.detail", "lex.verpassen"],
    },
    {
      id: "de-a2-w03-l3",
      block: "listen",
      ref: "de-a2-w03-a1",
      stem: "Wo ist der Schalter?",
      options: ["oben, neben dem Café", "unten, neben Gleis 7", "oben, links", "unten, gegenüber vom Café"],
      answer: 3,
      why: "`gegenüber` karşısında, `neben` yanında demek. Tarifte `nach unten` ve `rechts` yönü veriyor, `gegenüber vom Café` hedefi. Konum edatını başka bir edatla değiştirmek insanı yanlış kapıya götürür.",
      targets: ["hoeren.detail", "lex.wegbeschreibung"],
    },
    // ── Dilbilgisi ─────────────────────────────────────────────────────
    {
      id: "de-a2-w03-g1",
      block: "grammar",
      stem: "Morgen früh fahren wir in ___ Stadt.",
      options: ["der", "die", "dem", "den"],
      answer: 1,
      why: "`in` iki durumlu bir edat: yön (nereye?) Akkusativ, yer (nerede?) Dativ ister. `fahren` burada yön bildiriyor ve `Stadt` dişil: `in die`. Türkçede '-e' ve '-de' ekleri bu ayrımı taşıyor; eki artikel seçimine bağlamak gerekiyor.",
      targets: ["praep.wechsel", "kasus.akk"],
      byNative: {
        en: {
          options: ["der", "dem", "den", "die"],
          answer: 3,
          why: "İngilizcede `the` hiç değişmediği için `into the city` ile `in the city` arasındaki fark artikele yansımaz. Almancada yön Akkusativ (`in die Stadt`), yer Dativ (`in der Stadt`).",
        },
      },
    },
    {
      id: "de-a2-w03-g2",
      block: "grammar",
      stem: "Entschuldigung, wie komme ich ___ Bahnhof?",
      options: ["zum", "nach", "zur", "in"],
      answer: 0,
      why: "Bir binaya ya da noktaya gidiş `zu` + Dativ: `der Bahnhof` → `zum`. `nach` şehir ve ülke adlarıyla gelir (`nach Berlin`), `zur` dişil isimlerle. Türkçe tek '-e' eki burada üç edata bölünüyor.",
      targets: ["praep.zu_nach", "kasus.dativ"],
      byNative: {
        en: {
          options: ["nach", "zum", "zur", "in"],
          answer: 1,
          why: "İngilizce `to` hem `to the station` hem `to Berlin` için tek biçim. Almancada yer adıyla `nach`, bina ya da noktayla `zu` + Dativ (`zum Bahnhof`).",
        },
      },
    },
    {
      id: "de-a2-w03-g3",
      block: "grammar",
      stem: "Frau Vogel schreibt an Frau Brandt. Welcher Satz ist richtig?",
      options: ["Aussteigen Sie am Rathaus!", "Steig Sie am Rathaus aus!", "Steigen Sie am Rathaus aus!", "Steigen aus Sie am Rathaus!"],
      answer: 2,
      why: "Emir kipinde de ayrılabilir fiilin öneki cümlenin sonuna gider: `Steigen Sie … aus!`. Kibar emirde fiil `-en` ile biter ve `Sie` hemen arkasında durur; `steig` yalnız `du` emrinde kullanılır.",
      targets: ["imperativ.sie", "verb.trennbar"],
      byNative: {
        en: {
          options: ["Aussteigen Sie am Rathaus!", "Steigen Sie am Rathaus aus!", "Steig Sie am Rathaus aus!", "Steigen aus Sie am Rathaus!"],
          answer: 1,
          why: "İngilizce `get off` iki parçası yan yana kalır. Almanca ayrılabilir fiilde önek (`aus`) cümle sonuna ayrılır; emir kipinde de bu değişmez.",
        },
      },
    },
    {
      id: "de-a2-w03-g4",
      block: "grammar",
      stem: "Ich fahre jeden Tag mit ___ Straßenbahn zur Arbeit.",
      options: ["die", "den", "der", "dem"],
      answer: 2,
      why: "`mit` her zaman Dativ ister; dişil `die` Dativ'de `der` olur. Türkçe '-le' eki cinsiyet ve durum taşımadığı için yalın `die` kalıyor, `dem` ise eril ve nötr isimlerin Dativ'i.",
      targets: ["kasus.dativ", "praep.dativ"],
      byNative: {
        en: {
          options: ["die", "der", "den", "dem"],
          answer: 1,
          why: "`with` sonrası İngilizcede hiçbir şey değişmez. `mit` her zaman Dativ: dişil `die` → `der`. Buradaki `der` eril yalın değil, dişil Dativ; biçim aynı, görev farklı.",
        },
      },
    },
    {
      id: "de-a2-w03-g5",
      block: "grammar",
      stem: "Wir sind in Köln in einen anderen Zug ___.",
      options: ["umgesteigt", "umgestiegen", "geumstiegen", "umsteigen"],
      answer: 1,
      why: "Ayrılabilir fiilde `ge-` önekle kökün arasına girer: `um-ge-stiegen`. `steigen` düzensizdir, Partizip'i `-t` değil `-en` ile biter ve kök `stieg` olur. Yardımcı fiil `sind` zaten doğru; iş Partizip'te.",
      targets: ["partizip.trennbar", "perfekt.sein"],
    },
    // ── Sözcük ─────────────────────────────────────────────────────────
    {
      id: "de-a2-w03-v1",
      block: "vocab",
      stem: "Ich bin zwei Minuten zu spät gekommen und habe den Bus ___.",
      options: ["verloren", "vergessen", "gefehlt", "verpasst"],
      answer: 3,
      why: "Bir aracı, randevuyu ya da fırsatı kaçırmak `verpassen`. `verlieren` bir eşyayı kaybetmek, `vergessen` aklından çıkmak. Türkçe 'kaçırmak' ile 'kaybetmek' yakın düştüğü için `verloren` seçiliyor.",
      targets: ["lex.verpassen"],
      byNative: {
        en: {
          options: ["gefehlt", "verpasst", "verloren", "vergessen"],
          answer: 1,
          why: "İngilizce `miss` Almancada tek sözcük değil: aracı kaçırmak `verpassen`, bir şeyin eksik olması `fehlen`. `I missed the bus` → `Ich habe den Bus verpasst`.",
        },
      },
    },
    {
      id: "de-a2-w03-v2",
      block: "vocab",
      stem: "Ich ___ jeden Tag mit dem Fahrrad zur Arbeit.",
      options: ["gehe", "fahre", "laufe", "reite"],
      answer: 1,
      why: "Bir araçla (araba, tren, bisiklet) gidiliyorsa `fahren`, yürüyerek `gehen` ya da `laufen`. Türkçe 'gitmek' ikisini de karşıladığı için `gehe` seçiliyor.",
      targets: ["lex.fahren_gehen"],
      byNative: {
        en: {
          options: ["reite", "gehe", "laufe", "fahre"],
          answer: 3,
          why: "İngilizce `ride a bike` → `reiten` aktarımı yanlış: `reiten` yalnız hayvan sırtında gitmek (ata binmek). Bisikletle, arabayla, trenle gidiş `fahren`.",
        },
      },
    },
    {
      id: "de-a2-w03-v3",
      block: "vocab",
      stem: "Der Zug kommt nicht pünktlich. Er hat 30 Minuten ___.",
      options: ["spät", "später", "Verspätung", "Pause"],
      answer: 2,
      why: "`Verspätung haben` bir isim kalıbı: 'rötarlı olmak'. `spät` ve `später` sıfat/zarf, `haben`in nesnesi olamaz; 'geç kaldı' demek için `zu spät kommen` kullanılır.",
      targets: ["lex.verspaetung"],
    },
  ],
};
