import type { SkillExercise } from "../../types";

/**
 * EN · C1 — Beceriler kütüphanesi, ilk parti (2026-09-08).
 *
 * Alan adı `de` hedef dil (İngilizce) metnini taşır; `en` alanı yazılmaz.
 * Amerikan yazımı.
 *
 * C1'de ölçülen şey yeni kural değil SEÇİM: aynı içeriği kaç ayrı üslupta
 * söyleyebildiğin ve hangisini neden seçtiğin. Metinler bu yüzden ima, ironi
 * ve çekince taşıyor; dil bilgisi odağı da vurgunun nereye konduğunu
 * belirleyen yapılar.
 */
export const enC1: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "en-c1-lib-r1",
    course: "en",
    level: "C1",
    skill: "reading",
    title: "The bench with the armrest",
    genre: "Deneme",
    intro: "Kamusal alandaki küçük tasarım kararlarını okuyan bir deneme: bir bankın kolçağı gerçekte kime ne söylüyor?",
    gloss: [
      { de: "armrest", tr: "kolçak" },
      { de: "rehearsed", tr: "ezberlenmiş" },
      { de: "plausible", tr: "makul" },
      { de: "sloped", tr: "eğimli" },
      { de: "drainage", tr: "su tahliyesi" },
      { de: "reverse", tr: "geri almak" },
      { de: "villain", tr: "kötü adam" },
    ],
    minutes: 11,
    text:
      "THE BENCH WITH THE ARMREST\n\n" +
      "Look at the benches in any renovated station and you will notice a detail that was not there thirty years ago: " +
      "a metal armrest in the middle, sometimes two. Ask the operator why, and the answer is comfortable and almost " +
      "certainly rehearsed. The armrests, you will be told, help older passengers to stand up.\n\n" +
      "That is not a lie. Some people do use them exactly that way. It is simply not the reason the bench was " +
      "redesigned, and everyone involved knows it. The armrest is there so that nobody can lie down.\n\n" +
      "What interests me is not the decision itself, which at least has a logic, but the language around it. " +
      "Rarely does a city announce that it intends to move homeless people out of a station; what it announces is " +
      "„improved seating.“ The design does the work, and the vocabulary removes the fingerprints. Nobody has to " +
      "defend a policy that was never written down, because a bench is not a policy. It is furniture.\n\n" +
      "This is what makes the practice so difficult to argue with. A rule can be challenged, published, voted on, " +
      "reversed. A shape cannot. If the sloped surface makes sitting uncomfortable after ten minutes, whom exactly " +
      "do you write to? Every individual object has a plausible explanation - drainage, maintenance, the flow of " +
      "passengers - and it is only when you see forty of them together that the pattern becomes an argument.\n\n" +
      "I should be careful here, because the opposite position is not absurd. Stations are not shelters, and staff " +
      "who are told to manage a waiting hall at two in the morning are not the villains of this story; they have been " +
      "handed a social problem in the form of a cleaning schedule. What I object to is not that a choice was made. " +
      "It is that the choice was made silently, and then furnished.\n\n" +
      "So the test I would apply is simple, and it is a test of language rather than of metal. If the reason a thing " +
      "was built cannot be stated in one plain sentence on a sign next to it, the design is probably doing something " +
      "its designers would rather not say out loud.",
    questions: [
      {
        text: "What is the writer's central objection?",
        options: [
          "Not that a decision was taken, but that it was taken without being stated.",
          "That armrests make benches uncomfortable for older passengers.",
          "That stations should be used as shelters at night.",
        ],
        answer: 0,
        explain: "Beşinci paragraf bunu açıkça ayırıyor: „What I object to is not that a choice was made. It is that the choice was made silently, and then furnished.“",
      },
      {
        text: "Why does the writer say the official explanation is „not a lie“?",
        options: [
          "Because some passengers really do use the armrests to stand up.",
          "Because operators are legally required to say it.",
          "Because the armrests were originally designed for that purpose.",
        ],
        answer: 0,
        explain: "„Some people do use them exactly that way. It is simply not the reason the bench was redesigned.“ — doğru, ama gerekçe değil.",
      },
      {
        text: "What does „the vocabulary removes the fingerprints“ suggest?",
        options: [
          "The wording makes it impossible to see who decided what.",
          "The signs in stations are cleaned regularly.",
          "Officials use technical words that passengers cannot understand.",
        ],
        answer: 0,
        explain: "„improved seating“ gibi bir ifade kararı ve karar vereni görünmez kılıyor; „Nobody has to defend a policy that was never written down.“",
      },
      {
        kind: "truefalse",
        text: "The writer presents station staff as the main culprits.",
        options: ["True", "False"],
        answer: 1,
        explain: "Tam tersi: „staff … are not the villains of this story; they have been handed a social problem in the form of a cleaning schedule.“",
      },
      {
        kind: "gapfill",
        text: "According to the writer, a rule can be challenged and reversed, but a ___ cannot.",
        options: [],
        answer: 0,
        accept: ["shape", "design"],
        explain: "„A rule can be challenged, published, voted on, reversed. A shape cannot.“ — itiraz edilebilirlik farkı yazının merkezinde.",
      },
      {
        kind: "short_answer",
        text: "Where does the writer think the reason should be stated?",
        options: [],
        answer: 0,
        accept: ["on a sign", "on a sign nearby", "next to the object"],
        explain: "Ölçüt dilsel: gerekçe nesnenin yanındaki bir levhaya tek düz cümleyle yazılamıyorsa, tasarım söylenmek istenmeyen bir iş yapıyordur.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "en-c1-lib-l1",
    course: "en",
    level: "C1",
    skill: "listening",
    title: "The sound of a quiet car",
    genre: "Söyleşi",
    intro: "Bir ses tasarımcısıyla söyleşi: elektrikli araçlara neden ses ekleniyor ve o sesi kim seçiyor?",
    gloss: [
      { de: "pedestrian", tr: "yaya" },
      { de: "regulation", tr: "yönetmelik" },
      { de: "emit", tr: "yaymak" },
      { de: "frequency", tr: "frekans" },
      { de: "repetition", tr: "tekrar" },
      { de: "manufacturer", tr: "üretici" },
    ],
    minutes: 11,
    segments: [
      { speaker: "Host", text: "Your job title is sound designer, but you do not work in film. You design the noise that electric cars make. Where does that even begin?" },
      { speaker: "Ito", text: "It begins with a regulation. Below about twenty kilometers an hour, electric vehicles are legally required to emit a sound, because otherwise pedestrians simply do not hear them coming." },
      { speaker: "Host", text: "So the brief is safety. Then why does every manufacturer sound different?" },
      { speaker: "Ito", text: "Because the regulation says how loud and roughly what frequency range, not what it should feel like. Everything above that floor is a choice, and choices get made by marketing departments as much as by engineers." },
      { speaker: "Host", text: "You say that as though it troubles you." },
      { speaker: "Ito", text: "It does, a little. There is a real tension. The safest sound is the one people already associate with danger. The most attractive sound is the one nobody has heard before." },
      { speaker: "Host", text: "And you cannot have both." },
      { speaker: "Ito", text: "Rarely. What we test for is whether a listener can tell, with their back turned, that the car is approaching and roughly how fast. Not whether they like it. Liking comes later, and honestly it comes from repetition." },
      { speaker: "Host", text: "Do you ever design something and then decide against it?" },
      { speaker: "Ito", text: "Constantly. We had a beautiful sound, a kind of soft rising tone, and it tested well in the studio. On a street with traffic it disappeared completely. Beautiful and useless." },
      { speaker: "Host", text: "Is there a sound you would refuse to make?" },
      { speaker: "Ito", text: "Anything that pretends to be an engine. Not for reasons of taste. If we teach a generation that quiet means dangerous and loud means safe, we will have solved this decade's problem and created the next one." },
    ],
    questions: [
      {
        text: "Why must electric cars emit a sound at low speeds?",
        options: [
          "A regulation requires it because pedestrians cannot hear them otherwise.",
          "Because drivers find silent driving uncomfortable.",
          "Because the motor is unstable below twenty kilometers an hour.",
        ],
        answer: 0,
        explain: "İlk cevap bunu söylüyor: yasal zorunluluk ve gerekçesi yayaların aracı duymaması.",
      },
      {
        text: "Why do manufacturers sound different from each other?",
        options: [
          "The regulation fixes loudness and frequency, but not character.",
          "Each country has a completely different regulation.",
          "Older cars were louder, so the standard varies by age.",
        ],
        answer: 0,
        explain: "„… says how loud and roughly what frequency range, not what it should feel like. Everything above that floor is a choice.“",
      },
      {
        text: "What tension does Ito describe?",
        options: [
          "The safest sound is familiar, while the attractive one is new.",
          "Engineers want loud sounds and marketing wants silence.",
          "Regulators disagree with pedestrians about safety.",
        ],
        answer: 0,
        explain: "„The safest sound is the one people already associate with danger. The most attractive sound is the one nobody has heard before.“",
      },
      {
        kind: "truefalse",
        text: "In testing, Ito's team measures whether listeners like the sound.",
        options: ["True", "False"],
        answer: 1,
        explain: "„What we test for is whether a listener can tell … that the car is approaching … Not whether they like it.“ Beğeni sonradan ve tekrardan geliyor.",
      },
      {
        kind: "short_answer",
        text: "Below which speed is a sound legally required?",
        options: [],
        answer: 0,
        accept: ["twenty kilometers an hour", "twenty kilometers", "20 km/h", "20 kilometers an hour", "twenty"],
        explain: "„Below about twenty kilometers an hour, electric vehicles are legally required to emit a sound.“",
      },
      {
        kind: "dictation",
        text: "Stüdyoda iyi çalışan sesin sokakta başına geleni özetleyen iki kelimelik yargıyı duyduğun gibi yaz.",
        options: [],
        answer: 0,
        accept: ["Beautiful and useless.", "Beautiful and useless"],
        explain: "„On a street with traffic it disappeared completely. Beautiful and useless.“ — eksiltili cümle yargıyı sertleştiriyor.",
      },
      {
        text: "Why does Ito refuse to imitate an engine?",
        options: [
          "Because it would teach people that loud means safe, creating a later problem.",
          "Because engine sounds are protected by copyright.",
          "Because engine sounds are too quiet for city traffic.",
        ],
        answer: 0,
        explain: "„If we teach a generation that quiet means dangerous and loud means safe, we will have solved this decade's problem and created the next one.“",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-c1-lib-w1",
    course: "en",
    level: "C1",
    skill: "writing",
    title: "A letter to the editor",
    genre: "Okur mektubu",
    intro: "Önce iki cümle kur, sonra bir dergi yazısının iddiasına gerekçeli ve ölçülü bir itiraz yaz.",
    gloss: [
      { de: "claim", tr: "iddia" },
      { de: "concede", tr: "kabul etmek" },
      { de: "wording", tr: "ifade biçimi" },
      { de: "accountable", tr: "hesap verebilir" },
    ],
    minutes: 15,
    tasks: [
      {
        kind: "build",
        tr: "Bunu ancak baskı arttıktan sonra kabul ettiler.",
        answer: "Only after the pressure increased did they admit it.",
        alternatives: ["Only when the pressure increased did they admit it."],
        hint: "„Only + zaman öbeği“ cümle başına gelince devrik yapı zorunlu olur: yardımcı fiil özneden ÖNCE (did they admit).",
      },
      {
        kind: "build",
        tr: "Beni rahatsız eden karar değil, kullanılan ifade.",
        answer: "What bothers me is not the decision but the wording.",
        alternatives: ["What troubles me is not the decision but the wording."],
        hint: "Cleft yapısı: „What … is …“ vurguyu istediğin öğeye taşır. Türkçedeki „… olan şey“ kalıbının işlevi.",
      },
      {
        kind: "free",
        prompt:
          "Aşağıdaki alıntıya bir okur mektubuyla cevap ver. Yazarın haklı olduğu yeri kabul et, asıl itirazını iki gerekçeyle kur, kendi ölçütünü koy ve dergiye uygun bir kayıtta yaz.",
        stimulus:
          "From „The apology economy“, this month's issue:\n\n" +
          "„Companies have finally learned to apologize. Where a decade ago a corporate statement was a wall of legal " +
          "language, today it is human, specific and fast. Whatever else the last ten years have taught us, they have " +
          "taught organizations to say sorry properly - and that is progress worth naming.“",
        checklist: [
          "Yazarın haklı olduğu noktayı kabul et",
          "İtirazını en az iki gerekçeyle kur",
          "Kendi ölçütünü somut biçimde koy",
          "Dergi kaydına uygun, ölçülü bir kapanış yaz",
        ],
        minWords: 120,
        phrases: [
          { de: "Your correspondent is right that …", tr: "Yazarınız … konusunda haklı" },
          { de: "What the piece does not address is …", tr: "Yazının değinmediği şey …" },
          { de: "It is precisely because … that …", tr: "Tam da … olduğu için …" },
          { de: "A better test would be whether …", tr: "Daha iyi bir ölçüt … olup olmadığı olurdu" },
          { de: "None of this is an argument for …", tr: "Bunların hiçbiri … için bir gerekçe değil" },
        ],
        sample:
          "Sir,\n\n" +
          "Your correspondent is right that corporate statements have changed. The wall of legal language has gone, " +
          "and what replaced it is quicker, plainer and easier to read. On the surface, that is progress.\n\n" +
          "What the piece does not address is what the new form is for. An apology that arrives within four hours and " +
          "names the affected customers is not necessarily more honest than the old one; it is better rehearsed. " +
          "Two things follow. First, speed has become a substitute for inquiry: an organization that apologizes on the " +
          "first day cannot yet know what happened, and the sentence it publishes will quietly shape every later " +
          "account of it. Second, the fluency itself is now a service that can be bought, which means the companies " +
          "with the most practice at causing harm are also the ones with the best apologies.\n\n" +
          "It is precisely because these statements are so well made that they should be read as documents rather than " +
          "as feelings. A better test would be whether anything in the text can be checked six months later: a named " +
          "change, a date, a person who remains answerable. Warmth costs nothing; a commitment costs something.\n\n" +
          "None of this is an argument for the return of the legal wall. It is an argument for reading the new language " +
          "with the same suspicion we once reserved for the old one.\n\n" +
          "Yours faithfully,\nD. Karaca",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-c1-lib-s1",
    course: "en",
    level: "C1",
    skill: "speaking",
    title: "Watching the workers",
    genre: "Monolog",
    intro: "İki dakikaya kadar konuşacaksın: bir konumu savun, en güçlü karşı argümanı anlat ve ölçütünü koy.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Bazı şirketler çalışanların bilgisayar etkinliğini ölçen yazılımlar kullanıyor: tuş sayısı, açık kalan pencereler, molalar. Bu meşru bir yönetim aracı mı, yoksa gözetim mi? Konumunu savun, karşı tarafı hakkıyla anlat ve nerede sınır çizdiğini söyle.",
      bulletsTr: [
        "Konumunu bir cümleyle koy",
        "Karşı tarafın en güçlü argümanını kendi ağzınla anlat",
        "Ölçtüğün şeyin ne olduğunu somut bir örnekle göster",
        "Sınırını bir koşulla birlikte söyle",
      ],
      targets: [
        { de: "Let me start with what I would concede.", tr: "Kabul ettiğim şeyle başlayayım." },
        { de: "The strongest case for it is …", tr: "Bunun en güçlü gerekçesi …" },
        { de: "What that misses, however, is …", tr: "Ama bunun kaçırdığı şey …" },
        { de: "I would draw the line at …", tr: "Sınırı … noktasında çizerim" },
      ],
      minSeconds: 60,
      maxSeconds: 110,
      sampleDe:
        "Let me start with what I would concede. The strongest case for monitoring software is not control but " +
        "fairness: in a distributed team, managers who cannot see anyone tend to reward whoever is loudest in " +
        "meetings, and a record of actual work can protect the quiet, competent person who would otherwise be " +
        "overlooked. I have seen that argument made in good faith, and I do not think it is dishonest.\n\n" +
        "What that misses, however, is what these tools can actually measure. They count keystrokes, active windows " +
        "and idle minutes, none of which is work. The most valuable half hour in my week is usually spent staring at " +
        "a problem before writing a single line, and any system that scores me would record that as absence. " +
        "Measure the wrong thing precisely enough and people will optimize for it - not because they are cynical, " +
        "but because they would like to keep their jobs.\n\n" +
        "So I would draw the line at the level of the individual. Aggregate patterns across a department, published " +
        "openly and used to change workload, seem defensible to me. A dashboard showing one person's minute-by-minute " +
        "activity to their manager does not, and I would want that principle written into the contract rather than " +
        "left to the goodwill of whoever happens to be in charge.",
      rubricHint:
        "Kabul, itiraz ve sınır üçü de bulunmalı; kayıt tutarlı ve çekinceli (hedging) olmalı, C1 için soyutlama beklenir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-c1-lib-g1",
    course: "en",
    level: "C1",
    skill: "grammar",
    title: "not only, but where the stress goes",
    genre: "Kural",
    intro: "Cümlenin neyi öne çıkardığını belirleyen yapılar: devrik başlangıçlar ve vurgu cümleleri.",
    focus: "Inversion (Not only…, Hardly…) ve cleft cümleler (It was … that / What … is)",
    gloss: [
      { de: "inversion", tr: "devrik yapı" },
      { de: "emphasis", tr: "vurgu" },
      { de: "formal", tr: "resmî" },
      { de: "reminder", tr: "hatırlatma" },
      { de: "committee", tr: "kurul" },
    ],
    minutes: 9,
    explanation: [
      {
        heading: "Olumsuz bir öğe başa gelirse özne geri çekilir",
        tr: "Türkçede vurgu sözcüğü yüklemin önüne çekerek yapılır. İngilizcede sıra sabit olduğu için başka bir yol gerekir: olumsuz ya da sınırlayıcı bir öğe cümle başına alınırsa, yardımcı fiil özneden ÖNCE gelir. Bu yapı resmîdir ve az kullanıldığında güçlüdür.",
        examples: [
          { de: "Not only did the report arrive late, it was incomplete.", tr: "Rapor yalnız geç gelmedi, eksikti de.", note: "did + özne" },
          { de: "Rarely does a city announce such a decision.", tr: "Bir şehir böyle bir kararı nadiren duyurur." },
          { de: "Hardly had we started when the system crashed.", tr: "Daha başlamıştık ki sistem çöktü.", note: "Hardly + past perfect + when" },
        ],
      },
      {
        heading: "Cleft: cümleyi ikiye bölerek vurgulamak",
        tr: "Bir öğeyi öne çıkarmak için cümle ikiye bölünür. „It is/was X that …“ özneyi, nesneyi ya da zamanı; „What … is …“ bütün bir eylemi ya da düşünceyi vurgular. Sonuç aynı bilgidir, ama okurun dikkati başka yere düşer.",
        examples: [
          { de: "It was the wording that troubled me, not the decision.", tr: "Beni rahatsız eden ifadeydi, karar değil." },
          { de: "What we test for is whether the sound is audible.", tr: "Bizim sınadığımız şey sesin duyulup duyulmadığı." },
          { de: "What the piece does not address is the purpose.", tr: "Yazının değinmediği şey amaç." },
        ],
      },
      {
        heading: "Ne zaman kullanılmaz",
        tr: "Devrik yapı her cümlede kullanılırsa metin yapmacık olur; bir paragrafta bir kez yeter. Ayrıca soru değildir: sonuna soru işareti konmaz ve „do“ yalnız yardımcı fiil yoksa eklenir.",
        examples: [
          { de: "Never have I seen a clearer example.", tr: "Daha net bir örnek görmemiştim.", note: "have zaten var, do eklenmez" },
          { de: "Only later did we understand the reason.", tr: "Nedenini ancak sonra anladık.", note: "yardımcı fiil yok, did eklendi" },
        ],
      },
    ],
    questions: [
      {
        text: "Not only ___ the deadline, but he also ignored two reminders.",
        options: ["did he miss", "he missed", "he did miss"],
        answer: 0,
        explain: "„Not only“ başa gelince devrik yapı zorunlu: yardımcı fiil özneden önce gelir (did he miss).",
      },
      {
        text: "Which sentence is correctly inverted?",
        options: [
          "Rarely do we receive such detailed feedback.",
          "Rarely we do receive such detailed feedback.",
          "Rarely receive we such detailed feedback.",
        ],
        answer: 0,
        explain: "Sıra: sınırlayıcı öğe + yardımcı fiil + özne + yalın fiil.",
      },
      {
        text: "„It was the silence that surprised everyone.“ - What does this structure do?",
        options: [
          "It puts the emphasis on the silence.",
          "It turns the sentence into a question.",
          "It makes the sentence less formal.",
        ],
        answer: 0,
        explain: "Cleft cümlesi vurguyu „the silence“ öğesine taşır; bilgi aynı kalır, dikkat değişir.",
      },
      {
        kind: "gapfill",
        text: "Rewrite with emphasis: „The wording troubled me, not the decision.“ → „It ___ the wording that troubled me.“",
        options: [],
        answer: 0,
        accept: ["was"],
        explain: "„It was X that …“ kalıbı: geçmiş için „was“, şimdiki için „is“.",
      },
      {
        kind: "gapfill",
        text: "Rewrite: „We only understood the reason later.“ → „Only later ___ ___ understand the reason.“",
        options: [],
        answer: 0,
        accept: ["did we"],
        explain: "„Only later“ başa gelince devrik yapı: did + özne + yalın fiil.",
      },
      {
        kind: "gapfill",
        text: "Complete the cleft: „___ bothers me is the way it was announced.“",
        options: [],
        answer: 0,
        accept: ["What"],
        explain: "„What … is …“ yapısı bütün bir düşünceyi vurgular ve resmî yazıda çok kullanılır.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Never", "have", "I", "seen", "such", "a case"],
        explain: "Olumsuz zarf, yardımcı fiil, özne, ortaç: Never have I seen such a case.",
      },
      {
        kind: "truefalse",
        text: "„Not only he was late, but he forgot the files.“ - Is this sentence correct?",
        options: ["True", "False"],
        answer: 1,
        explain: "Devrik yapı eksik: „Not only was he late, but he also forgot the files.“",
      },
      {
        kind: "truefalse",
        text: "„What surprised the committee was the tone of the letter.“ - Is this sentence correct?",
        options: ["True", "False"],
        answer: 0,
        explain: "Doğru bir cleft: „What …“ öbeği özne, „was“ yüklem, vurgu „the tone“ üzerinde.",
      },
      {
        text: "Why should inversion be used sparingly?",
        options: [
          "Because it draws attention to itself and sounds artificial if repeated.",
          "Because it is only correct in spoken English.",
          "Because it changes the meaning of the sentence completely.",
        ],
        answer: 0,
        explain: "Yapı vurgu için var; her cümlede tekrarlanırsa vurgu kaybolur ve metin yapmacık okunur.",
      },
    ],
  },
];
