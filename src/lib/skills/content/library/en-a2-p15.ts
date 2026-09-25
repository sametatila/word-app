import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 15.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri (gerekçe: parti 11 başlığı).
 * Bu parti YAZMA, KONUŞMA ve DİL BİLGİSİ hücrelerini taşır. Kurallar ve
 * emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * Parti 15 yol ve hareket hattı: parkta bir çocuk doğum günü için hazırlanan
 * hazine avının yolunu anlatan mesaj. Söyleyiş odağı ünlüden ünlüye geçerken araya giren
 * w / y köprüsü (go on, I am); dil bilgisi hareket edatları (into, out of,
 * through, across, along, past) — A1'deki yer edatlarından ayrı.
 */
export const enA2P15: SkillExercise[] = [
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w15",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "A Treasure Hunt in the Park",
    genre: "message",
    intro: "Yeğeninin doğum gününde parkta bir hazine avı var; önce iki cümle kur, sonra çocuklarla yürüyecek arkadaşına ipuçlarının yolunu anlatan bir mesaj yaz.",
    gloss: [
      { de: "treasure hunt", tr: "hazine avı" },
      { de: "clue", tr: "ipucu" },
      { de: "fence", tr: "çit" },
      { de: "pond", tr: "gölet" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Kapıdan geç ve çitin boyunca yürü.",
        answer: "Go through the gate and walk along the fence.",
        alternatives: ["Walk through the gate and go along the fence."],
        hint: "Hareketi edat söyler: through (bir açıklığın içinden geçerek), along (bir çizgi boyunca).",
      },
      {
        kind: "build",
        tr: "Kafenin önünden geç ve tepeye çık.",
        answer: "Walk past the café and go up the hill.",
        alternatives: ["Go past the café and walk up the hill."],
        hint: "„past“ bir şeyin önünden geçip devam etmeyi, „up“ yukarı doğru hareketi anlatır.",
      },
      {
        kind: "free",
        prompt:
          "Yedi yaşındaki yeğeninin doğum gününde parkta bir hazine avı hazırladın ve ipuçlarını sabah sakladın. Çocuklarla sen değil bir arkadaşın yürüyecek. Ona mesaj yaz: nereden ve saat kaçta başlayacaklarını, izleyecekleri yolu, ipuçlarını nereye sakladığını ve hazinenin nerede olduğunu anlat.",
        checklist: [
          "Başlangıç yerini ve saati yaz",
          "Yolu adım adım anlat (kapı, çit, köprü …)",
          "İpuçlarını nereye sakladığını söyle",
          "Hazinenin yerini ve bir sorun olursa ne yapacağını yaz",
        ],
        minWords: 40,
        phrases: [
          { de: "The treasure hunt starts at …", tr: "Hazine avı …'de başlıyor" },
          { de: "Go through … and walk along …", tr: "…'den geçip … boyunca yürüyün" },
          { de: "Walk past … and go up …", tr: "…'in önünden geçip …'e çıkın" },
          { de: "The next clue is under …", tr: "Sonraki ipucu …'in altında" },
          { de: "If a child gets tired, …", tr: "Bir çocuk yorulursa …" },
        ],
        sample:
          "Hi Leo, thanks again for helping with Mina's party! The treasure hunt starts at three at the big gate " +
          "of Green Park. Go through the gate and walk along the fence until you see the old playground. The first " +
          "clue is under the red slide. Then walk past the café and go up the hill. The second clue is behind the " +
          "tree with a yellow ribbon. Go down the other side, across the wooden bridge and onto the little island " +
          "in the pond. The treasure is in a blue box next to the duck house! If a child gets tired, call me and " +
          "I'll come. Ela",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s15",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "go on, I am, two apples",
    genre: "pronounce",
    intro: "Bir kelime ünlüyle bitip sonraki ünlüyle başlıyorsa araya küçük bir w ya da y sesi girer: go on = go-won, I am = ay-yem. Araya durak koymak konuşmayı kesik kesik yapar.",
    gloss: [
      { de: "go on", tr: "devam etmek" },
      { de: "apple", tr: "elma" },
      { de: "aunt", tr: "teyze" },
      { de: "again", tr: "yine" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "Go on, I'm listening.",
        tr: "Devam et, dinliyorum.",
        hint: "„go on“ = gou-WON. u'ya kayan o, sonraki ünlüye bir w ile bağlanır.",
        confusions: [
          { heard: [], fix: "İki kelime arasında durma; w köprüsü kendiliğinden gelir.", expected: "go on" },
        ],
      },
      {
        de: "Two apples, please.",
        tr: "İki elma lütfen.",
        hint: "„two apples“ = tuu-WE-pılz. u ile biten kelimeden sonra w girer.",
        confusions: [
          { heard: [], fix: "„two“ ile „apples“ arasında boşluk bırakma: tuuwepılz.", expected: "two apples" },
        ],
      },
      {
        de: "She is my aunt.",
        tr: "O benim teyzem.",
        hint: "„she is“ = şii-YİZ. i ile biten ünlüden sonra y köprüsü girer.",
        confusions: [
          { heard: [], fix: "„she“ ile „is“ arasında boğazı kapatma; y ile bağla.", expected: "she is" },
        ],
      },
      {
        de: "Do it now.",
        tr: "Şimdi yap.",
        hint: "„do it“ = duu-WİT. Kısa bir cümlede de bağlama aynı.",
        confusions: [
          { heard: [], fix: "Kelimeleri ayrı ayrı söylersen emir sert ve kesik duyulur.", expected: "do it" },
        ],
      },
      {
        de: "Say it again, please.",
        tr: "Lütfen bir daha söyle.",
        hint: "„say it“ = sey-YİT; „it again“ da bağlanır: i-tı-GEN. Üç kelime tek akış.",
        confusions: [
          { heard: [], fix: "y ile başlayan köprü ve t'nin sonraki ünlüye geçişi cümleyi akıcı yapar.", expected: "say it again" },
        ],
      },
      {
        de: "Who is he?",
        tr: "O kim?",
        hint: "„who is“ w ile bağlanır; vurgu „who“da, „he“ kısa ve h'si neredeyse düşer: HUU-wi-zi.",
        confusions: [
          { heard: [], fix: "„who“ ile „is“ arasına w girer; kısa soru tek nefeste söylenir.", expected: "who is" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g15",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "into, through, across",
    genre: "grammar",
    intro: "A1'de bir şeyin NEREDE durduğunu söyleyen edatları öğrendin; bu kez bir yerden bir yere NASIL gidildiğini anlatan hareket edatları var.",
    focus: "Hareket edatları: into / out of, onto, up / down, through, across, along, past",
    gloss: [
      { de: "hill", tr: "tepe" },
      { de: "stairs", tr: "merdiven" },
      { de: "river", tr: "nehir" },
      { de: "jump", tr: "atlamak" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "İçeri, dışarı, üstüne",
        tr: "Türkçe „eve girdi“, „çantadan çıkardı“ derken yönü ekle verir. İngilizcede bir yerin içine girmek „into“, içinden çıkmak „out of“, bir yüzeyin üstüne çıkmak „onto“ ile anlatılır. Durağan „in“ ve „on“ hareket bildirmez.",
        examples: [
          { de: "She ran into the house.", tr: "Koşarak eve girdi.", note: "içine doğru" },
          { de: "He took the milk out of the fridge.", tr: "Sütü buzdolabından çıkardı." },
          { de: "The cat jumped onto the table.", tr: "Kedi masanın üstüne atladı." },
        ],
      },
      {
        heading: "Yukarı, aşağı ve içinden",
        tr: "„up“ ve „down“ yükselip alçalmayı (merdiven, tepe, sokak), „through“ bir şeyin bir ucundan girip öbüründen çıkmayı (park, tünel, kapı) anlatır.",
        examples: [
          { de: "Go up the stairs to the second floor.", tr: "Merdivenden ikinci kata çık." },
          { de: "We walked down the hill to the lake.", tr: "Tepeden göle yürüyerek indik." },
          { de: "We walked through the park.", tr: "Parkın içinden yürüdük." },
        ],
      },
      {
        heading: "Karşıya, boyunca, önünden",
        tr: "„across“ bir yandan öbür yana geçmek (yol, köprü, meydan), „along“ bir çizgiyi izlemek (nehir, sokak, sahil), „past“ bir şeyin önünden geçip devam etmektir. Yol tariflerinin çoğu bu üçüyle kurulur.",
        examples: [
          { de: "Go across the road at the lights.", tr: "Işıklardan karşıya geç." },
          { de: "Drive along the river for two kilometers.", tr: "Nehir boyunca iki kilometre sür." },
          { de: "Walk past the church and turn left.", tr: "Kilisenin önünden geç ve sola dön." },
        ],
      },
    ],
    questions: [
      {
        text: "She walked ___ the room and sat down.",
        options: ["into", "in", "at"],
        answer: 0,
        explain: "Odanın içine doğru bir hareket var: into.",
      },
      {
        text: "Walk ___ the bridge and turn left.",
        options: ["into", "across", "onto"],
        answer: 1,
        explain: "Köprünün bir yanından öbür yanına geçiliyor: across.",
      },
      {
        text: "She took her phone ___ her bag.",
        options: ["onto", "along", "out of"],
        answer: 2,
        explain: "Çantanın içinden dışarı: out of.",
      },
      {
        kind: "gapfill",
        text: "The cat jumped ___ the table. (to the top of it)",
        options: [],
        answer: 0,
        accept: ["onto", "on to"],
        explain: "Bir yüzeyin üstüne doğru hareket: onto.",
      },
      {
        kind: "gapfill",
        text: "The train goes ___ a long tunnel. (in one end, out the other)",
        options: [],
        answer: 0,
        accept: ["through"],
        explain: "Tünelin bir ucundan girip öbüründen çıkmak: through.",
      },
      {
        kind: "gapfill",
        text: "Go ___ the stairs to the third floor.",
        options: [],
        answer: 0,
        accept: ["up"],
        explain: "Yukarı kata çıkılıyor: up the stairs.",
      },
      {
        kind: "gapfill",
        text: "We walked ___ the river for an hour. (next to it, all the way)",
        options: [],
        answer: 0,
        accept: ["along"],
        explain: "Nehrin kıyısını izleyerek yürümek: along.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["The dog", "jumped", "into", "the water"],
        explain: "Suyun içine doğru hareket: jumped into the water.",
      },
      {
        kind: "truefalse",
        text: "„Walk past the bank and take the second street.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Bankanın önünden geçip devam etmek: past; cümle doğru.",
      },
      {
        kind: "truefalse",
        text: "„The train went across the tunnel.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "Tünelin içinden geçilir: The train went through the tunnel.",
      },
    ],
  },
];
