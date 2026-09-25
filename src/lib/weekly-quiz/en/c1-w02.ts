import type { QuizWeek } from "../types";

/**
 * C1 · Hafta 2 · Değişen çalışma hayatı (İngilizce kursu).
 *
 * ÖLÇÜLEN ŞEY: iki tarafın da haklı olduğu bir tartışmayı izlemek ve üslubun
 * taşıyıcılarını seçmek — yarık cümle, isimleştirme ve eşdizim.
 *
 * İSİMLEŞTİRME BU HAFTANIN ÖZEL MADDESİ (`w02-g3`) ve Almanca konuşan için
 * C1'in en karakteristik hatası: Almancanın isim yeğleyen üslubu İngilizceye
 * taşınınca ağır, yapay bir metin çıkıyor ("the realisation of the
 * implementation"). Türk öğrencide bu eğilim yok; oradaki tuzak farklı,
 * `-me/-ma` ile kurulan isim-fiillerin İngilizcede hangi biçime düşeceği.
 *
 * ARALIKLI TEKRAR: `w02-g1` W1'in yarık cümle hedefine ikinci bir kalıpla
 * dönüyor; `w02-v3` sabit eşdizim hedefini yeniliyor.
 */
export const EN_C1_W02: QuizWeek = {
  id: "en-c1-w02",
  course: "en",
  level: "C1",
  no: 2,
  theme: "The changing workplace",
  themeTr: "Değişen çalışma hayatı",
  canDo: ["C1.RD.2", "C1.LS.2", "C1.GR.2", "C1.SPK.3"],

  stimuli: [
    {
      kind: "text",
      id: "t1",
      genre: "Background article",
      genreTr: "Arka plan yazısı",
      title: "Working from home: who does it actually suit?",
      body:
        "The number of employees who work at least partly from home has risen sharply in a few years. " +
        "Many firms now provide equipment that would recently have counted as a luxury.\n\n" +
        "The advantages are obvious: less travelling, more quiet, a freer arrangement of the day. " +
        "Yet the sums do not add up for everyone. Those who work from home accept that the line between " +
        "work and free time becomes blurred. And it is those who are rarely in the office who tend to be " +
        "overlooked when promotions are decided — an effect that is hard to measure but difficult to deny.\n\n" +
        "Unions therefore call for clear rules. Being reachable after hours, they argue, must remain voluntary; " +
        "otherwise flexibility simply turns into longer working hours.\n\n" +
        "Employers reply that rigid rules are unworkable when clients sit in several time zones. " +
        "Both sides have a point — which is precisely why the question remains unsettled.",
    },
    {
      kind: "audio",
      id: "a1",
      genre: "Workplace meeting",
      genreTr: "İş yeri toplantısı",
      plays: 2,
      segments: [
        { speaker: "Kaya", text: "You want to bring back compulsory attendance? That feels like a step backwards." },
        { speaker: "Director", text: "Not quite. Two fixed days in the office; the rest is up to you." },
        { speaker: "Kaya", text: "And what about people who live further away?" },
        { speaker: "Director", text: "Then we find a solution. Exceptions are possible, they just have to be justified." },
        { speaker: "Kaya", text: "That sounds reasonable. What bothers me is that the decision was taken without us." },
        { speaker: "Director", text: "That is a fair point. Next time we will involve the team earlier." },
      ],
    },
  ],

  items: [
    /* ── Okuduğunu anlama ──────────────────────────────────────────────── */
    {
      id: "en-c1-w02-r1",
      block: "read",
      ref: "t1",
      stem: "Which disadvantage does the text mention for home workers?",
      options: [
        "They are paid less than colleagues",
        "They receive no equipment",
        "They are more likely to be overlooked for promotion",
        "They cannot arrange their own day",
      ],
      answer: 2,
      why: "\"…those who are rarely in the office … tend to be overlooked when promotions are decided.\" Ekipman ve serbest gün düzeni metinde AVANTAJ olarak geçiyor; maaş hiç anılmıyor.",
      targets: ["reading.detail", "argument.disadvantage"],
    },
    {
      id: "en-c1-w02-r2",
      block: "read",
      ref: "t1",
      stem: "What do the unions demand?",
      options: [
        "A complete ban on home working",
        "Higher pay for home workers",
        "A single time zone for all clients",
        "That being reachable after hours remains voluntary",
      ],
      answer: 3,
      why: "\"Being reachable after hours, they argue, must remain voluntary.\" `they argue` ara sözü aktarımı işaretliyor: metin sendikanın görüşünü aktarıyor, kendi görüşünü söylemiyor.",
      targets: ["reading.detail", "verb.reporting"],
    },
    {
      id: "en-c1-w02-r3",
      block: "read",
      ref: "t1",
      stem: "How does the text sum up the dispute?",
      options: [
        "The employers are clearly right",
        "Both sides have a point, which is why it stays unsettled",
        "The unions have already won",
        "The question was settled long ago",
      ],
      answer: 1,
      why: "\"Both sides have a point — which is precisely why the question remains unsettled.\" Tanımlamayan ilgi cümlesi bütün önceki cümleyi alıp sonucuna bağlıyor; bu bir taraf tutma değil, teşhis.",
      targets: ["reading.evaluation", "relative.non-defining"],
    },

    /* ── Dinlediğini anlama ────────────────────────────────────────────── */
    {
      id: "en-c1-w02-l1",
      block: "listen",
      ref: "a1",
      stem: "What does the director propose?",
      options: [
        "Two fixed office days, the rest flexible",
        "A full return to the office",
        "Permanent home working",
        "Postponing the decision",
      ],
      answer: 0,
      why: "\"Two fixed days in the office; the rest is up to you.\" Kaya'nın `compulsory attendance` sözü tam dönüşü ima ediyor ama yönetici bunu `Not quite` ile düzeltiyor — geçerli olan düzeltilmiş hâli.",
      targets: ["listening.detail", "listening.correction"],
    },
    {
      id: "en-c1-w02-l2",
      block: "listen",
      ref: "a1",
      stem: "What bothers Kaya most?",
      options: [
        "The number of office days",
        "The distance to the office",
        "That the decision was taken without the team",
        "That exceptions must be justified",
      ],
      answer: 2,
      why: "\"What bothers me is that the decision was taken without us.\" Yarık cümle itirazın hedefini tek noktaya kilitliyor: kuralın içeriği değil, kuruluş biçimi.",
      targets: ["listening.stance", "syntax.cleft"],
    },
    {
      id: "en-c1-w02-l3",
      block: "listen",
      ref: "a1",
      stem: "How does the director respond to that objection?",
      options: [
        "By rejecting it",
        "By accepting it and promising earlier involvement",
        "By postponing the discussion",
        "By threatening consequences",
      ],
      answer: 1,
      why: "\"That is a fair point. Next time we will involve the team earlier.\" Önce kabul, sonra somut söz — iki adım birlikte bir taahhüt kuruyor.",
      targets: ["listening.consensus", "discourse.concession"],
    },

    /* ── Dilbilgisi ────────────────────────────────────────────────────── */
    {
      id: "en-c1-w02-g1",
      block: "grammar",
      stem: "___ those who are rarely in the office who tend to be overlooked.",
      options: ["They are", "There are", "That is", "It is"],
      answer: 3,
      why: "`It is … who …` yarık cümlesi bir öğeyi öne çıkarır ve baştaki `it` her zaman tekildir — vurgulanan öğe çoğul olsa bile. W1'deki `What … is …` kalıbının kardeşi.",
      targets: ["syntax.cleft", "register.formal"],
      byNative: {
        tr: {
          options: ["They are", "There are", "That is", "It is"],
          answer: 3,
          why: "Türkçede vurgu sözcük sırasıyla ve ekle kurulur, ayrı bir yapı gerekmez; o yüzden özneye uyum sezgisiyle `They are` seçiliyor. Yarık cümlede baştaki öğe biçimsel bir tutamaktır ve tekil kalır.",
        },
      },
    },
    {
      id: "en-c1-w02-g2",
      block: "grammar",
      stem: "Many firms provide equipment that ___ recently have counted as a luxury.",
      options: ["would", "will", "should", "must"],
      answer: 0,
      why: "`would have + Partizip` gerçek dışı bir geçmişi anlatır: yakın zamana kadar lüks SAYILIRDI. `will` gelecek, `should` gereklilik, `must` çıkarım bildirir ve hiçbiri bu karşı olguyu kurmaz.",
      targets: ["modal.perfect", "tense.unreal-past"],
    },
    {
      id: "en-c1-w02-g3",
      block: "grammar",
      stem: "Which sentence is better English?",
      options: [
        "The implementation of the reduction of travel time is a benefit.",
        "The reduction implementation of travel time is beneficial.",
        "Reducing travel time is a benefit.",
        "There is the existence of a travel time reduction benefit.",
      ],
      answer: 2,
      why: "İngilizce fiil yeğler; aynı içeriği isim zincirine çevirmek cümleyi ağırlaştırır ve okunurluğu düşürür. Üç seçenek de dil bilgisel olarak kurulabilir, ama İngilizcede yerleşik üslup fiille kurulanıdır.",
      targets: ["style.nominalisation", "register.formal"],
      byNative: {
        de: {
          options: [
            "The implementation of the reduction of travel time is a benefit.",
            "The reduction implementation of travel time is beneficial.",
            "Reducing travel time is a benefit.",
            "There is the existence of a travel time reduction benefit.",
          ],
          answer: 2,
          why: "Almanca isim yeğleyen bir üsluba sahiptir (`die Verkürzung der Fahrzeit`) ve bu doğrudan İngilizceye taşınıyor. Sonuç dil bilgisel ama ağır ve yapay bir cümle — C1'de Almanca konuşanın en karakteristik hatası budur.",
        },
        tr: {
          options: [
            "The implementation of the reduction of travel time is a benefit.",
            "The reduction implementation of travel time is beneficial.",
            "Reducing travel time is a benefit.",
            "There is the existence of a travel time reduction benefit.",
          ],
          answer: 2,
          why: "Türkçede `-me/-ma` ile kurulan isim-fiil hem isim hem eylem gibi davranır ('yolculuğu kısaltma'); İngilizceye geçerken `-ing` biçimi doğru karşılıktır, isim zinciri değil.",
        },
      },
    },
    {
      id: "en-c1-w02-g4",
      block: "grammar",
      stem: "Rigid rules are unworkable ___ clients sit in several time zones.",
      options: ["however", "when", "despite", "nevertheless"],
      answer: 1,
      why: "Boşluktan sonra tam bir cümle geliyor, yani bağlaç gerekiyor: `when`. `however` ve `nevertheless` zarftır ve cümleleri noktalama ile ayırır; `despite` ise isim ya da `-ing` ister.",
      targets: ["connector.subordinating", "syntax.clause"],
      byNative: {
        de: {
          options: ["however", "when", "despite", "nevertheless"],
          answer: 1,
          why: "Almancada `jedoch` hem zarf hem bağlaç gibi konumlanabildiği için `however` bir bağlaç sanılıyor. İngilizcede `however` cümle bağlamaz; iki cümleyi noktalı virgül ya da nokta ayırır.",
        },
      },
    },
    {
      id: "en-c1-w02-g5",
      block: "grammar",
      stem: "Those who work from home accept that the line ___ blurred.",
      options: ["become", "is becoming blurred to be", "became", "becomes"],
      answer: 3,
      why: "Özne `the line` tekil, o yüzden fiil `-s` alır. `Those who work` cümlenin başındaki çoğul öbektir ama yan cümlenin öznesi değildir — uzun cümlede uyumu yanlış özneye bağlamak C1'de sık görülür.",
      targets: ["subject-verb.agreement", "syntax.clause"],
    },

    /* ── Bağlamda kelime ───────────────────────────────────────────────── */
    {
      id: "en-c1-w02-v1",
      block: "vocab",
      stem: "Unions ___ for clear rules on availability.",
      options: ["call", "claim", "demand for", "require of"],
      answer: 0,
      why: "`call for` talep etmek anlamında sabit bir öbektir. `demand` ve `require` doğrudan nesne alır, `for` almaz; `claim` ise iddia etmektir. Edat öbeğin parçasıdır, seçilebilir bir ayrıntı değil.",
      targets: ["collocation.call-for", "wordfield.demand"],
    },
    {
      id: "en-c1-w02-v2",
      block: "vocab",
      stem: "The sums do not ___ for everyone.",
      options: ["count up", "sum up", "add up", "add on"],
      answer: 2,
      why: "`the sums do not add up` hesabın tutmaması demek ve deyim sabittir. `sum up` özetlemek, `count up` saymak, `add on` eklemektir — üçü de gerçek öbek ama bu anlamı taşımaz.",
      targets: ["idiom.add-up", "phrasal-verb"],
      byNative: {
        tr: {
          options: ["count up", "sum up", "add up", "add on"],
          answer: 2,
          why: "Türkçede 'hesap tutmuyor' tek bir fiille kurulur ve deyimsel fiil kavramı yoktur; öğrenci anlamca en yakın görünen tek sözcüğe (`sum`) kayıyor. İngilizcede anlamı taşıyan şey fiil değil, fiil+edat bütünü.",
        },
      },
    },
    {
      id: "en-c1-w02-v3",
      block: "vocab",
      stem: "An effect that is hard to measure but difficult to ___.",
      options: ["refuse", "deny", "reject", "decline"],
      answer: 1,
      why: "`deny` bir şeyin varlığını ya da doğruluğunu reddetmektir. `refuse`, `reject` ve `decline` bir teklifi ya da isteği geri çevirir — nesneleri başkadır, bir etkiyi 'reddetmek' onları almaz.",
      targets: ["verb.deny", "wordfield.evidence"],
    },
  ],
};
