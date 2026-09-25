import type { SkillExercise } from "../../types";

/**
 * DE · B2 — Beceriler kütüphanesi, parti 14.
 *
 * B2 hücresini YİRMİYE tamamlayan on partiden biri. Kurallar ve emsal:
 * `de-b2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 14 aile içi bakım hattı: bakım yapan yakınlar için bir bilgi metni,
 * bir danışma merkezine telefon, işverene esnek çalışma talebi. Dil bilgisi
 * edatlı fiillerle ilgi cümlesi — um die, auf den, mit dem ve belirsiz
 * öncülde worüber, womit, worum.
 */
export const deB2P14: SkillExercise[] = [
  // ─────────────────────────── OKUMA ───────────────────────────
  {
    id: "de-b2-lib-r14",
    course: "de",
    level: "B2",
    skill: "reading",
    title: "Wer pflegt die Pflegenden?",
    genre: "info",
    intro: "Bir danışma merkezinin bilgi metni: evde bakım yapan yakınlar ne kadar yük taşıyor ve hangi yardımlardan habersiz.",
    gloss: [
      { de: "der Angehörige", tr: "yakın akraba", en: "relative" },
      { de: "pflegebedürftig", tr: "bakıma muhtaç", en: "in need of care" },
      { de: "die Belastung", tr: "yük", en: "burden" },
      { de: "der Anspruch", tr: "hak", en: "entitlement" },
      { de: "die Vertretung", tr: "geçici bakım", en: "cover" },
      { de: "die Sprechstunde", tr: "danışma saati", en: "consultation hour" },
    ],
    minutes: 8,
    text:
      "Wer pflegt die Pflegenden?\n\n" +
      "Die meisten Pflegebedürftigen in Deutschland werden nicht im Heim versorgt, sondern zu " +
      "Hause, und zwar überwiegend von Angehörigen: von Töchtern, Söhnen und Ehepartnern, manchmal " +
      "auch von Nachbarn oder Bekannten. Viele dieser Angehörigen sind selbst berufstätig oder " +
      "haben kleine Kinder.\n\n" +
      "Die Belastung wird häufig unterschätzt, auch von den Betroffenen selbst. In einer Befragung " +
      "unseres Beratungszentrums gaben zwei von drei pflegenden Angehörigen an, seit über einem " +
      "Jahr keinen einzigen freien Tag gehabt zu haben. Fast die Hälfte wusste nicht, dass es " +
      "Hilfen gibt, auf die sie Anspruch haben. Drei davon möchten wir hier nennen.\n\n" +
      "Erstens: kostenlose Pflegekurse. Dort lernt man zum Beispiel, wie man einen Kranken im Bett " +
      "bewegt, ohne sich selbst den Rücken zu ruinieren.\n\n" +
      "Zweitens: die Vertretung. Wenn die pflegende Person krank ist oder Urlaub braucht, übernimmt " +
      "die Pflegekasse für einige Wochen im Jahr die Kosten für eine Ersatzpflege — durch einen " +
      "Dienst, aber auch durch Verwandte.\n\n" +
      "Drittens: Beratung. Wer versichert ist, hat Anspruch auf eine kostenlose Pflegeberatung, auf " +
      "Wunsch auch zu Hause.\n\n" +
      "Die häufigste Frage in unserer Sprechstunde lautet übrigens nicht „Was steht mir zu?“, " +
      "sondern „Darf ich mir das überhaupt erlauben?“. Unsere Antwort ist immer dieselbe: Wer " +
      "dauerhaft pflegt, ohne selbst Pausen zu machen, fällt irgendwann aus — und dann fehlt er " +
      "beiden, dem Kranken und sich selbst.",
    questions: [
      {
        text: "Wo werden die meisten Pflegebedürftigen versorgt?",
        options: ["im Heim", "im Krankenhaus", "zu Hause"],
        answer: 2,
        explain: "„nicht im Heim versorgt, sondern zu Hause“ — çoğunlukla yakınları tarafından.",
      },
      {
        text: "Was lernt man in einem Pflegekurs zum Beispiel?",
        options: [
          "wie man Anträge richtig ausfüllt",
          "wie man einen Kranken im Bett bewegt",
          "wie man einen eigenen Pflegedienst gründet",
        ],
        answer: 1,
        explain: "Kurslarda örneğin hastayı yatakta kendi sırtını sakatlamadan hareket ettirmek öğretiliyor.",
      },
      {
        kind: "truefalse",
        text: "Fast alle Befragten kannten die Hilfen, auf die sie Anspruch haben.",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "„Fast die Hälfte wusste nicht, dass es Hilfen gibt, auf die sie Anspruch haben.“",
      },
      {
        kind: "gapfill",
        text: "___ von drei pflegenden Angehörigen hatten seit über einem Jahr keinen freien Tag.",
        options: [],
        answer: 0,
        accept: ["Zwei", "zwei", "2"],
        explain: "„gaben zwei von drei pflegenden Angehörigen an“.",
      },
      {
        kind: "short_answer",
        text: "Welche Frage hört man in der Sprechstunde am häufigsten?",
        options: [],
        answer: 0,
        accept: ["Darf ich mir das erlauben", "Darf ich mir das überhaupt erlauben", "ob sie sich das erlauben dürfen", "ob sie sich das überhaupt erlauben dürfen", "ob man sich das erlauben darf", "ob man sich das überhaupt erlauben darf"],
        explain: "Soru „Neye hakkım var?“ değil, „Kendime buna izin verebilir miyim?“.",
      },
      {
        text: "Was ist die Botschaft des letzten Absatzes?",
        options: [
          "Pausen nützen auch dem Kranken.",
          "Angehörige sollten die Pflege abgeben.",
          "Die Beratung kommt meistens zu spät.",
        ],
        answer: 0,
        explain: "Ara vermeden bakan kişi bir gün çöker ve o zaman hem hastaya hem kendisine eksik kalır.",
      },
    ],
  },

  // ─────────────────────────── DİNLEME ───────────────────────────
  {
    id: "de-b2-lib-l14",
    course: "de",
    level: "B2",
    skill: "listening",
    title: "Anruf beim Pflegestützpunkt",
    genre: "phone",
    intro: "Uzak bir şehirde yaşayan bir oğul, düşen annesi için bakım danışmanlığını arıyor: ilk adım ne, arada ne yapılabilir.",
    gloss: [
      { de: "stürzen", tr: "düşmek", en: "to fall down" },
      { de: "der Antrag", tr: "başvuru", en: "application" },
      { de: "der Pflegegrad", tr: "bakım derecesi", en: "care level" },
      { de: "der Hausnotruf", tr: "evde acil çağrı sistemi", en: "home emergency call" },
      { de: "die Unterstützung", tr: "destek", en: "support" },
      { de: "sich trauen", tr: "cesaret etmek", en: "to dare" },
    ],
    minutes: 8,
    segments: [
      { speaker: "Frau Neumann", text: "Pflegestützpunkt Nordstadt, Sie sprechen mit Frau Neumann. Worum geht es?" },
      { speaker: "Herr Özdemir", text: "Um meine Mutter. Sie ist achtzig, lebt allein und ist vor zwei Wochen in der Küche gestürzt. Gebrochen hat sie sich nichts, aber sie traut sich seitdem kaum noch aus der Wohnung." },
      { speaker: "Frau Neumann", text: "Das tut mir leid. Wohnen Sie in ihrer Nähe?" },
      { speaker: "Herr Özdemir", text: "Leider nicht. Ich wohne zweihundert Kilometer entfernt und arbeite Vollzeit. Ich fahre jedes zweite Wochenende hin, aber das reicht nicht mehr." },
      { speaker: "Frau Neumann", text: "Dann wäre der erste Schritt ein Antrag auf einen Pflegegrad bei der Pflegekasse Ihrer Mutter. Danach kommt eine Gutachterin zu ihr nach Hause und schaut, wobei sie Unterstützung braucht." },
      { speaker: "Herr Özdemir", text: "Und wie lange dauert das?" },
      { speaker: "Frau Neumann", text: "Meistens einige Wochen. Bis dahin würde ich Ihnen einen Hausnotruf empfehlen. Ihre Mutter trägt dann einen Knopf am Handgelenk, und wenn sie stürzt, drückt sie darauf." },
      { speaker: "Herr Özdemir", text: "Das wird sie nicht wollen. Sie sagt immer, sie sei doch keine Kranke." },
      { speaker: "Frau Neumann", text: "Das hören wir oft. Viele Betroffene nehmen es eher an, wenn man es als Hilfe für die Familie darstellt und nicht als Hilfe für sie selbst." },
      { speaker: "Frau Neumann", text: "Und noch etwas: Gibt es vor Ort eine Nachbarin oder einen Bekannten, der einen Schlüssel haben könnte?" },
      { speaker: "Herr Özdemir", text: "Eine Nachbarin, ja. Die kennt meine Mutter seit dreißig Jahren." },
      { speaker: "Frau Neumann", text: "Gut. Dann schicke ich Ihnen den Antrag und eine Liste mit Diensten in ihrer Stadt. Rufen Sie gern wieder an, wenn der Termin mit der Gutachterin feststeht." },
    ],
    questions: [
      {
        text: "Warum ruft Herr Özdemir an?",
        options: [
          "Seine Mutter liegt im Krankenhaus.",
          "Seine Mutter ist gestürzt und unsicher.",
          "Seine Mutter will in ein Heim ziehen.",
        ],
        answer: 1,
        explain: "Annesi mutfakta düşmüş ve o günden beri evden çıkmaya cesaret edemiyor.",
      },
      {
        text: "Was ist laut Frau Neumann der erste Schritt?",
        options: [
          "ein Antrag auf einen Pflegegrad",
          "ein Platz in einem Pflegeheim",
          "ein Termin beim Hausarzt",
        ],
        answer: 0,
        explain: "„Dann wäre der erste Schritt ein Antrag auf einen Pflegegrad.“",
      },
      {
        kind: "truefalse",
        text: "Nach dem Antrag kommt eine Gutachterin zur Mutter nach Hause.",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "Bilirkişi eve gelip annenin nerede desteğe ihtiyacı olduğuna bakıyor.",
      },
      {
        kind: "gapfill",
        text: "Herr Özdemir wohnt ___ Kilometer von seiner Mutter entfernt.",
        options: [],
        answer: 0,
        accept: ["zweihundert", "200"],
        explain: "„Ich wohne zweihundert Kilometer entfernt.“",
      },
      {
        kind: "short_answer",
        text: "Wer könnte vor Ort einen Schlüssel bekommen?",
        options: [],
        answer: 0,
        accept: ["eine Nachbarin", "die Nachbarin", "die Nachbarin der Mutter", "Nachbarin", "eine Nachbarin der Mutter", "die Nachbarin seiner Mutter"],
        explain: "Annesini otuz yıldır tanıyan bir komşu kadın var.",
      },
      {
        text: "Wann nehmen Betroffene einen Hausnotruf eher an?",
        options: [
          "wenn er für sie gar nichts kostet",
          "wenn ihn der Hausarzt verschreibt",
          "wenn er als Hilfe für die Familie gilt",
        ],
        answer: 2,
        explain: "Cihaz kendileri için değil aile için bir yardım olarak sunulunca daha kolay kabul ediliyor.",
      },
    ],
  },

  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "de-b2-lib-w14",
    course: "de",
    level: "B2",
    skill: "writing",
    title: "Bitte um flexible Arbeitszeiten",
    genre: "formal",
    intro: "Babanın bakımı için işverenden esneklik istiyorsun: önce iki cümle kur, sonra somut öneri içeren resmî bir e-posta yaz.",
    gloss: [
      { de: "der Angehörige", tr: "yakın akraba", en: "relative" },
      { de: "die Unterstützung", tr: "destek", en: "support" },
      { de: "die Vertretung", tr: "vekâlet", en: "cover" },
      { de: "erreichbar", tr: "ulaşılabilir", en: "reachable" },
      { de: "absprechen", tr: "kararlaştırmak", en: "to arrange" },
    ],
    minutes: 14,
    tasks: [
      {
        kind: "build",
        tr: "Bir yakını olarak babamın bakımını üstleniyorum.",
        answer: "Als Angehöriger übernehme ich die Pflege meines Vaters.",
        alternatives: ["Die Pflege meines Vaters übernehme ich als Angehöriger."],
        hint: "Sıfattan isim: „angehörig“ → artikelsiz tekil erilde güçlü çekim, „Angehöriger“.",
      },
      {
        kind: "build",
        tr: "Ekipteki diğer çalışanlar için neredeyse hiçbir şey değişmiyor.",
        answer: "Für die anderen Beschäftigten im Team ändert sich kaum etwas.",
        alternatives: ["Kaum etwas ändert sich für die anderen Beschäftigten im Team."],
        hint: "„beschäftigt“ → „die Beschäftigten“: artikelli çoğulda sıfat gibi -en alır.",
      },
      {
        kind: "free",
        prompt:
          "İnsan kaynakları sorumlusu Frau Lorenz'e yaz: durumu özel ayrıntıya boğmadan kısaca anlat, çalışma düzenin için somut bir öneri yap, işlerin nasıl aksamayacağını göster ve bir görüşme iste.",
        checklist: [
          "Durumu kısaca ve ölçülü anlat",
          "Somut bir çalışma düzeni öner",
          "İşlerin nasıl aksamayacağını göster",
          "Bir görüşme iste",
        ],
        minWords: 130,
        phrases: [
          { de: "Ich schreibe Ihnen wegen einer persönlichen Angelegenheit.", tr: "Size kişisel bir konu nedeniyle yazıyorum.", en: "I am writing to you about a personal matter." },
          { de: "Konkret schlage ich vor, dass …", tr: "Somut olarak şunu öneriyorum: …", en: "Specifically, I suggest that …" },
          { de: "Die Zahl meiner Stunden bliebe gleich.", tr: "Çalışma saatlerimin sayısı aynı kalırdı.", en: "The number of my hours would stay the same." },
          { de: "… ist bereits abgesprochen.", tr: "… önceden kararlaştırıldı.", en: "… has already been arranged." },
          { de: "Über einen Termin für ein Gespräch würde ich mich freuen.", tr: "Bir görüşme için randevu verirseniz sevinirim.", en: "I would be glad to arrange a meeting." },
        ],
        sample:
          "Sehr geehrte Frau Lorenz, ich schreibe Ihnen wegen einer persönlichen Angelegenheit. Mein Vater ist " +
          "im Sommer schwer erkrankt und braucht seitdem an mehreren Tagen in der Woche Unterstützung. Als " +
          "Angehöriger übernehme ich gemeinsam mit meiner Schwester einen großen Teil seiner Pflege, und das " +
          "wird voraussichtlich mindestens ein Jahr so bleiben. " +
          "Ich möchte meine Aufgaben weiterhin vollständig erledigen, brauche dafür aber mehr Flexibilität. " +
          "Konkret schlage ich vor, dass ich dienstags und donnerstags von zu Hause arbeite und an diesen Tagen " +
          "erst um zehn Uhr beginne, dafür aber bis achtzehn Uhr erreichbar bin. Die Zahl meiner Stunden bliebe gleich. " +
          "Für die anderen Beschäftigten im Team ändert sich dadurch kaum etwas: Die Besprechungen am Montag " +
          "und Mittwoch würde ich wie bisher im Büro wahrnehmen, und meine Vertretung bei Kundenterminen ist " +
          "mit Herrn Brenner bereits abgesprochen. " +
          "Über einen Termin für ein kurzes Gespräch würde ich mich freuen, gern schon in der nächsten Woche. " +
          "Mit freundlichen Grüßen, Mehmet Kaya",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "de-b2-lib-s14",
    course: "de",
    level: "B2",
    skill: "speaking",
    title: "Müssen Kinder ihre Eltern pflegen?",
    genre: "monologue",
    intro: "Bir dakikadan uzun tek başına konuşacaksın: ahlaki bir görevle pratik bir imkânı birbirinden ayır.",
    gloss: [],
    minutes: 7,
    monologue: {
      promptTr:
        "Yaşlanan anne babanın bakımı çocukların görevi mi? Ahlaki ve pratik açıyı birbirinden ayır, görevin neyi kapsayıp neyi kapsamadığını söyle, kendi sınırını çiz ve devletten ne beklediğini anlat.",
      bulletsTr: [
        "Ahlaki ve pratik açıyı ayır",
        "Görevin neyi kapsadığını söyle",
        "Kendi sınırını çiz",
        "Devletten ne beklediğini anlat",
      ],
      targets: [
        { de: "Moralisch betrachtet …, praktisch aber …", tr: "Ahlaki açıdan bakınca …, pratikte ise …" },
        { de: "Eine Pflicht sehe ich darin, …, nicht aber darin, …", tr: "Görevi …'de görüyorum, …'de değil" },
        { de: "Die Grenze liegt für mich dort, wo …", tr: "Benim için sınır … noktasında" },
        { de: "Vom Staat würde ich erwarten, dass …", tr: "Devletten … beklerdim" },
      ],
      minSeconds: 50,
      maxSeconds: 90,
      sampleDe:
        "Moralisch betrachtet schulden wir unseren Eltern etwas, praktisch aber hängt alles davon ab, was " +
        "jemand leisten kann. Eine Tochter, die dreihundert Kilometer entfernt wohnt und zwei kleine Kinder " +
        "hat, kann nicht dasselbe tun wie ein Sohn, der im Nachbarhaus lebt. " +
        "Eine Pflicht sehe ich darin, sich zu kümmern, nicht aber darin, alles selbst zu machen. Sich kümmern " +
        "heißt: wissen, wie es dem Vater geht, Entscheidungen mittragen, Hilfe organisieren und regelmäßig da sein. " +
        "Die Grenze liegt für mich dort, wo die eigene Gesundheit oder die eigene Familie ernsthaft leidet. " +
        "Wer sich kaputtpflegt, hilft am Ende niemandem. " +
        "Vom Staat würde ich erwarten, dass Angehörige, die trotzdem pflegen, dafür nicht bestraft werden: " +
        "mit flexiblen Arbeitszeiten, mit einer echten Vertretung im Urlaub und mit einer Rente, die diese " +
        "Jahre mitzählt. Dann wäre Pflege eine Entscheidung und kein Schicksal.",
      rubricHint:
        "Ahlaki ve pratik boyutun ayrılması, bir sınır ve somut beklentiler aranır; „nicht aber“, „dort, wo“ ve Konjunktiv II kullanılabilir.",
    },
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "de-b2-lib-g14",
    course: "de",
    level: "B2",
    skill: "grammar",
    title: "die Mutter, um die ich mich kümmere",
    genre: "grammar",
    intro: "Edatlı bir fiil ilgi cümlesine girince edat da yan cümlenin başına geçer; öncül bir kişi değil de „alles, etwas, das“ ise zamir wo(r)- olur.",
    focus: "Edatlı fiillerle ilgi cümlesi: um die, auf den, mit dem ve belirsiz öncülde worüber, womit, worum (dessen/deren/was/wo'dan ayrı katman)",
    gloss: [
      { de: "sich kümmern um", tr: "ilgilenmek", en: "to take care of" },
      { de: "sich verlassen auf", tr: "güvenmek", en: "to rely on" },
      { de: "die Pflegekasse", tr: "bakım sigortası", en: "care insurance fund" },
      { de: "der Antrag", tr: "başvuru", en: "application" },
      { de: "rechnen mit", tr: "beklemek", en: "to expect" },
    ],
    minutes: 10,
    explanation: [
      {
        heading: "Edat yan cümlenin başına gider",
        tr: "Fiil sabit bir edatla kullanılıyorsa (sich kümmern um, sich verlassen auf, sprechen mit) ilgi cümlesinde edat en başa, ilgi zamirinin önüne geçer. Zamirin cinsini isim, hâlini edat belirler. Türkçedeki „ilgilendiğim anne“ yapısında edat görünmez; Almancada asla düşmez.",
        examples: [
          { de: "Das ist meine Mutter, um die ich mich seit einem Jahr kümmere.", tr: "Bu, bir yıldır ilgilendiğim annem.", note: "um + Akk. → um die" },
          { de: "Die Nachbarin, auf die ich mich verlassen kann, kauft für sie ein.", tr: "Güvenebildiğim komşu onun alışverişini yapıyor.", note: "auf + Akk. → auf die" },
          { de: "Die Beraterin, mit der ich telefoniert habe, war sehr geduldig.", tr: "Telefonda konuştuğum danışman çok sabırlıydı.", note: "mit + Dat. → mit der" },
        ],
      },
      {
        heading: "Belirsiz öncülde wo(r)-",
        tr: "Öncül bir isim değil de „alles, etwas, vieles, das Erste“ ya da bütün bir cümleyse, edat + was yerine wo(r)- birleşik biçimi gelir: worüber, womit, worum. Edat ünlüyle başlıyorsa araya -r- girer: wo + auf → worauf. Yalın „was“ın edatlı biçimi budur.",
        examples: [
          { de: "Es gibt vieles, worüber wir noch nicht gesprochen haben.", tr: "Henüz konuşmadığımız çok şey var.", note: "vieles → worüber" },
          { de: "Das Pflegebett war das Erste, worum wir uns gekümmert haben.", tr: "İlk ilgilendiğimiz şey hasta yatağıydı.", note: "das Erste → worum" },
          { de: "Mein Bruder übernimmt die Wochenenden, womit ich nicht gerechnet hatte.", tr: "Hafta sonlarını kardeşim üstleniyor, bunu hiç beklemiyordum.", note: "bütün cümle → womit" },
        ],
      },
      {
        heading: "Kişide asla wo(r)-",
        tr: "Öncül bir kişiyse wo(r)- kullanılmaz; edat + der/die/das gelir: „die Ärztin, mit der …“. Somut bir şeyin adında da yazı dili edat + zamiri seçer: „der Antrag, auf den wir warten“. Oradaki „worauf“ konuşmada duyulur ama resmî metinde zayıf kalır.",
        examples: [
          { de: "Die Pflegerin, auf die wir warten, kommt um neun.", tr: "Beklediğimiz bakıcı dokuzda geliyor.", note: "kişi → auf die" },
          { de: "Der Antrag, über den die Pflegekasse entscheidet, liegt seit Mai dort.", tr: "Bakım sigortasının karar vereceği başvuru mayıstan beri orada.", note: "isim → über den" },
          { de: "Das ist alles, wofür wir im Moment Zeit haben.", tr: "Şu an vakit ayırabildiğimiz her şey bu.", note: "alles → wofür" },
        ],
      },
    ],
    questions: [
      {
        text: "Das ist meine Mutter, ___ ich mich seit einem Jahr kümmere.",
        options: ["um die", "um der", "worum"],
        answer: 0,
        explain: "Öncül bir kişi (die Mutter); „um“ Akkusativ ister: um die.",
      },
      {
        text: "Es gibt vieles, ___ wir noch nicht gesprochen haben.",
        options: ["über das", "über den", "worüber"],
        answer: 2,
        explain: "Öncül belirsiz bir sözcük (vieles): edat + was yerine worüber gelir.",
      },
      {
        text: "Welcher Satz ist richtig?",
        options: [
          "Die Nachbarin, worauf ich mich verlasse, hilft uns.",
          "Die Nachbarin, auf die ich mich verlasse, hilft uns.",
          "Die Nachbarin, auf der ich mich verlasse, hilft uns.",
        ],
        answer: 1,
        explain: "Kişide wo(r)- olmaz; „sich verlassen auf“ Akkusativ ister: auf die.",
      },
      {
        kind: "gapfill",
        text: "Die Beraterin, mit ___ ich telefoniert habe, war sehr geduldig.",
        options: [],
        answer: 0,
        accept: ["der"],
        explain: "„mit“ Dativ ister, öncül dişil: mit der.",
      },
      {
        kind: "gapfill",
        text: "Der Antrag, über ___ die Pflegekasse entscheidet, liegt seit Mai dort.",
        options: [],
        answer: 0,
        accept: ["den"],
        explain: "„entscheiden über“ Akkusativ ister, öncül eril: über den.",
      },
      {
        kind: "gapfill",
        text: "Das Pflegebett war das Erste, ___ wir uns gekümmert haben.",
        options: [],
        answer: 0,
        accept: ["worum"],
        explain: "„das Erste“ belirsiz bir öncül; „sich kümmern um“ → worum.",
      },
      {
        kind: "gapfill",
        text: "Mein Bruder übernimmt die Wochenenden, ___ ich nicht gerechnet hatte. (mit)",
        options: [],
        answer: 0,
        accept: ["womit"],
        explain: "Zamir bütün ana cümleye gönderme yapıyor; „rechnen mit“ → womit.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Der Pflegedienst,", "mit dem", "wir", "zufrieden sind,", "kommt", "jeden Morgen"],
        explain: "Edat ilgi zamirinin önünde yan cümleyi açar; yan cümlede çekimli fiil sonda.",
      },
      {
        kind: "truefalse",
        text: "„Die Ärztin, womit ich gesprochen habe, ruft morgen an.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 1,
        explain: "Öncül bir kişi; wo(r)- kullanılmaz: „die Ärztin, mit der ich gesprochen habe“.",
      },
      {
        kind: "truefalse",
        text: "„Das ist alles, wofür wir im Moment Zeit haben.“ — Bu cümle doğru mu?",
        options: ["Richtig", "Falsch"],
        answer: 0,
        explain: "„alles“ belirsiz bir öncül; „Zeit haben für“ → wofür.",
      },
    ],
  },
];
