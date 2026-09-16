import type { QuizWeek } from "../types";

/**
 * İngilizce A2, hafta 3 — seyahat ve yol tarifi.
 *
 * Omurga: yön edatı `to`, anında karar için `will`, kısa sıfatta `-er`,
 * olumsuz emir. Geri dönüş: `past.irregular` ve `collocation.take` (W1–W2),
 * `lex.miss` (W1), `question.do_support` (W1) olumsuz emirde.
 */
export const EN_A2_W03: QuizWeek = {
  id: "en-a2-w03",
  course: "en",
  level: "A2",
  no: 3,
  theme: "Travel and directions",
  themeTr: "Seyahat ve yol tarifi",
  canDo: ["A2.SPK.2", "A2.LS.5", "A2.RD.3", "A2.GR.14", "A2.GR.15"],
  stimuli: [
    {
      kind: "text",
      id: "en-a2-w03-t1",
      genre: "Information page",
      genreTr: "bilgi sayfası",
      title: "How to get to the Summer Concert",
      body:
        "The concert is in Green Park, on the other side of the river from the city center. " +
        "The easiest way to get there is by tram. Take tram number 3 from Central Station and get off at Park Road. It isn't far. " +
        "Please don't come by car. There are no parking spaces near the park, and the roads around it are closed on Saturday. " +
        "If you want to walk, go across the bridge, turn left and follow the river. It's a nice walk, but it takes almost an hour. " +
        "Trams run all day until midnight. On Sunday the last tram leaves at 10 pm, so don't miss it! " +
        "Tram tickets are cheaper online than at the station.",
    },
    {
      kind: "audio",
      id: "en-a2-w03-a1",
      genre: "Conversation in the street",
      genreTr: "sokakta konuşma",
      plays: 2,
      segments: [
        { speaker: "Ana", text: "Excuse me, can you help me? I'm looking for the train station." },
        { speaker: "Man", text: "Sure. Go straight ahead to the traffic lights, then turn right." },
        { speaker: "Ana", text: "Right at the traffic lights. Is it far?" },
        { speaker: "Man", text: "Not really. After the traffic lights, walk past the bank. The station is opposite the post office." },
        { speaker: "Ana", text: "Opposite the post office. Great. How long does it take?" },
        { speaker: "Man", text: "It's a short walk. But be careful, the entrance is at the back of the building." },
        { speaker: "Ana", text: "Thank you so much!" },
        { speaker: "Man", text: "You're welcome. Have a good trip!" },
      ],
    },
  ],
  items: [
    // ── Okuma ──────────────────────────────────────────────────────────
    {
      id: "en-a2-w03-r1",
      block: "read",
      ref: "en-a2-w03-t1",
      stem: "How do you get to the concert by tram?",
      options: [
        "Take tram 3 and get off at Central Station.",
        "Take tram 3 and get off at Park Road.",
        "Get on tram 3 at Park Road.",
        "Take a tram across the bridge.",
      ],
      answer: 1,
      why: "`get on` binmek, `get off` inmek demek. Central Station binilen yer, Park Road inilen yer. İki durak aynı cümlede geçince fiili (`from` / `get off at`) okumadan durak adını eşlemek yanlış yeri seçtiriyor.",
      targets: ["reading.detail", "lex.get_on_off"],
    },
    {
      id: "en-a2-w03-r2",
      block: "read",
      ref: "en-a2-w03-t1",
      stem: "Why shouldn't you come by car?",
      options: [
        "There is no parking, and the roads are closed.",
        "The tram is cheaper than the car.",
        "The concert is on the other side of the river.",
        "It takes almost an hour from the city center.",
      ],
      answer: 0,
      why: "Gerekçe `Please don't come by car` cümlesinin hemen arkasında. Metindeki başka doğru bilgiler (ucuz bilet, yürüyüşün süresi) arabayla ilgili değil; doğru ama soruya cevap olmayan bir cümleyi seçmek okuma sorularında sık hata.",
      targets: ["reading.detail"],
    },
    {
      id: "en-a2-w03-r3",
      block: "read",
      ref: "en-a2-w03-t1",
      stem: "You are at the concert on Sunday evening. When must you leave to get the last tram?",
      options: ["before midnight", "after 10 pm", "before 10 pm", "at midnight"],
      answer: 2,
      why: "Genel bilgi (`until midnight`) olağan günler için. `On Sunday` ile gelen cümle bir istisna ve istisna genel kuralı ezer. İlk okunan saati hatırlayıp istisnayı atlamak bu sorunun tuzağı.",
      targets: ["reading.detail"],
    },
    // ── Dinleme ────────────────────────────────────────────────────────
    {
      id: "en-a2-w03-l1",
      block: "listen",
      ref: "en-a2-w03-a1",
      stem: "What should Ana do at the traffic lights?",
      options: ["turn left", "go straight ahead", "turn right", "go across the bridge"],
      answer: 2,
      why: "`Go straight ahead to the traffic lights` ışığa kadar olan kısım; ışıkta ne yapılacağını `then` getiriyor. Yol tarifinde her adım bir öncekinin bittiği yerde başlar, ilk duyulan yönü bütün yola yaymak hata.",
      targets: ["listening.detail", "lex.directions"],
    },
    {
      id: "en-a2-w03-l2",
      block: "listen",
      ref: "en-a2-w03-a1",
      stem: "Where is the station?",
      options: ["next to the bank", "next to the post office", "behind the bank", "opposite the post office"],
      answer: 3,
      why: "`opposite` karşısında, `next to` yanında demek. Banka yolda geçilen bir nokta (`walk past`), hedef değil. Konum edatını değiştirmek insanı yanlış binaya götürür.",
      targets: ["listening.detail", "lex.directions"],
    },
    {
      id: "en-a2-w03-l3",
      block: "listen",
      ref: "en-a2-w03-a1",
      stem: "What does the man say about the entrance?",
      options: ["It is at the front.", "It is closed.", "It is next to the bank.", "It is at the back."],
      answer: 3,
      why: "`be careful` bir uyarı getiriyor, yani beklenmedik bir bilgi. Girişler çoğu zaman önde olduğu için duyulanı değil beklenti cevabını seçmek kolay; uyarıdan sonra gelen cümle geçerli.",
      targets: ["listening.detail"],
    },
    // ── Dilbilgisi ─────────────────────────────────────────────────────
    {
      id: "en-a2-w03-g1",
      block: "grammar",
      stem: "Excuse me, how do I get ___ the station?",
      options: ["to", "at", "in", "on"],
      answer: 0,
      why: "Bir yere doğru hareket `to` ile; `at` bir noktada bulunmayı anlatır (`I'm at the station`). Türkçede '-e' yön, '-de' yer eki; `at`ı '-e' diye ezberleyince yön cümlesinde de kullanılıyor.",
      targets: ["prep.to_at"],
      byNative: {
        de: {
          options: ["to", "at", "in", "on"],
          answer: 0,
          why: "Almancada `zum Bahnhof` ve `nach Berlin` iki ayrı edat; İngilizcede ikisi de `to`. `at` Almanca `an`/`bei` gibi yeri bildirir, yönü değil.",
        },
      },
    },
    {
      id: "en-a2-w03-g2",
      block: "grammar",
      stem: "A: \"The bus is very late.\" B: \"OK, ___ a taxi then.\"",
      options: ["I going to take", "I'll take", "I taking", "I will to take"],
      answer: 1,
      why: "Konuşma anında verilen karar `will` (`I'll`) ile söylenir ve `will`den sonra fiil yalın gelir. `going to` önceden yapılmış bir plan içindir ve `I'm going to take` diye `am` ile eksiksiz kurulur.",
      targets: ["future.will", "future.going_to"],
      byNative: {
        de: {
          options: ["I will to take", "I going to take", "I taking", "I'll take"],
          answer: 3,
          why: "Almanca `will` 'istemek' demek, İngilizce `will` ise gelecek. `will to take` Almanca `ich will … nehmen` kalıbından geliyor; İngilizce `will`den sonra `to` yok.",
        },
      },
    },
    {
      id: "en-a2-w03-g3",
      block: "grammar",
      stem: "The tram is ___ than the bus.",
      options: ["more fast", "fastest", "faster", "more faster"],
      answer: 2,
      why: "Tek heceli sıfatlar `-er` alır: `faster`. `more` yalnız uzun sıfatlarla kullanılır (`more expensive`) ve ikisi hiçbir zaman birlikte gelmez. Türkçe 'daha' her sıfatın önüne geldiği için `more fast` kuruluyor.",
      targets: ["compare.comparative"],
    },
    {
      id: "en-a2-w03-g4",
      block: "grammar",
      stem: "___ late! The last tram leaves at ten.",
      options: ["Not be", "Don't", "Be not", "Don't be"],
      answer: 3,
      why: "Olumsuz emir `Don't` + yalın fiil ile kurulur ve `be` fiili de bu kurala girer: `Don't be late`. Türkçede olumsuzluk eki fiile yapıştığı için `Not be` kuruluyor; `Don't` tek başına fiilsiz kalır.",
      targets: ["imperative.negative", "question.do_support"],
      byNative: {
        de: {
          options: ["Be not", "Don't be", "Not be", "Don't"],
          answer: 1,
          why: "Almanca `Sei nicht zu spät!` → `Be not late` aktarımı. İngilizcede olumsuz emir her fiilde `Don't` ile başlar, `be` dahil.",
        },
      },
    },
    {
      id: "en-a2-w03-g5",
      block: "grammar",
      stem: "We ___ the wrong bus and got lost.",
      options: ["taked", "take", "have taken", "took"],
      answer: 3,
      why: "`take` düzensiz: `took`. Olay bitmiş bir anlatının parçası ve `got lost` ile aynı zamanda; bağlanan iki fiil de past simple olur. `-ed` yalnız düzenli fiillere eklenir.",
      targets: ["past.irregular", "collocation.take"],
      byNative: {
        de: {
          options: ["have taken", "taked", "took", "take"],
          answer: 2,
          why: "Almancada anlatı Perfekt'le ilerler (`Wir haben den falschen Bus genommen`). İngilizcede bitmiş bir hikâye past simple ile anlatılır; `have taken` yanındaki `got lost` ile de uyuşmaz.",
        },
      },
    },
    // ── Sözcük ─────────────────────────────────────────────────────────
    {
      id: "en-a2-w03-v1",
      block: "vocab",
      stem: "Hurry up, or we'll ___ the last tram!",
      options: ["lose", "forget", "miss", "leave"],
      answer: 2,
      why: "Aracı kaçırmak `miss`; `lose` bir eşyayı kaybetmek. Tren, otobüs ve tramvayda fiil aynı kalır: `miss the train`, `miss the tram`.",
      targets: ["lex.miss"],
      byNative: {
        de: {
          options: ["lose", "miss", "forget", "leave"],
          answer: 1,
          why: "Almanca `verpassen` → `miss`, `verlieren` → `lose`. `lose the tram` tramvayı bir eşya gibi kaybetmek olur.",
        },
      },
    },
    {
      id: "en-a2-w03-v2",
      block: "vocab",
      stem: "My brother is a bus driver. He ___ a bus in the city center.",
      options: ["rides", "drives", "goes", "takes"],
      answer: 1,
      why: "Aracı kullanan kişi `drive`, yolcu olarak binen `ride` ya da `take`. `ride` Türkçede 'at sürmek'teki gibi 'sürmek' diye anlaşıldığı için sürücü cümlesinde seçiliyor.",
      targets: ["lex.drive_ride"],
      byNative: {
        de: {
          options: ["drives", "rides", "goes", "takes"],
          answer: 0,
          why: "Almanca `fahren` hem aracı kullanmak hem yolcu olmak demek. İngilizcede ayrılır: sürücü `drive`, yolcu `ride` ya da `take the bus`.",
        },
      },
    },
    {
      id: "en-a2-w03-v3",
      block: "vocab",
      stem: "The station isn't far, so we went there ___ foot.",
      options: ["by", "on", "with", "in"],
      answer: 1,
      why: "Ulaşım aracı `by` ile söylenir (`by bus`, `by tram`), ama yürüyerek gitmek sabit kalıp: `on foot`. 'Otobüsle' ile 'yürüyerek' Türkçede farklı olsa da `by` bütün ulaşıma genelleniyor.",
      targets: ["prep.by_on_foot"],
      byNative: {
        de: {
          options: ["with", "by", "on", "in"],
          answer: 2,
          why: "Almanca `mit dem Bus` → `with the bus` ve `zu Fuß` aktarımı yanıltıyor. İngilizcede araçla `by bus`, yürüyerek `on foot`.",
        },
      },
    },
  ],
};
