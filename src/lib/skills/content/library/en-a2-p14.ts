import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 14.
 *
 * Hücreleri YİRMİYE tamamlayan partilerden biri (gerekçe: parti 11 başlığı).
 * Okuma ve dinleme p13'te yirmiye ulaştı; bu parti YAZMA, KONUŞMA ve DİL
 * BİLGİSİ hücrelerini taşır. Kurallar ve emsal: `en-a2.ts` (parti 1) ve
 * `data/content/SPEC.md`.
 *
 * Parti 14 doğa ve kamp hattı: göl kenarındaki bir kamp alanı için internet
 * yorumu. Söyleyiş odağı iki parçalı fiillerde ikinci parçaya düşen vurgu
 * (get UP, turn it OFF); dil bilgisi some- / any- / no- / every- bileşikleri.
 */
export const enA2P14: SkillExercise[] = [
  // ─────────────────────────── YAZMA ───────────────────────────
  {
    id: "en-a2-lib-w14",
    course: "en",
    level: "A2",
    skill: "writing",
    title: "Two Nights by the Lake",
    genre: "review",
    intro: "Göl kenarındaki bir kamp alanında iki gece kaldın; önce iki cümle kur, sonra bir internet sitesine yorum yaz.",
    gloss: [
      { de: "tent", tr: "çadır" },
      { de: "lake", tr: "göl" },
      { de: "shower", tr: "duş" },
      { de: "recommend", tr: "tavsiye etmek" },
    ],
    minutes: 9,
    tasks: [
      {
        kind: "build",
        tr: "Akşamları yapacak hiçbir şey yoktu.",
        answer: "There was nothing to do in the evening.",
        alternatives: ["In the evening there was nothing to do."],
        hint: "„nothing“ kendisi olumsuzdur; yanına „not“ gelmez. Aynı anlam: There wasn't anything to do.",
      },
      {
        kind: "build",
        tr: "Her yer temiz ve sessizdi.",
        answer: "Everywhere was clean and quiet.",
        alternatives: ["Everywhere was quiet and clean."],
        hint: "every- ile kurulan sözcükler tekil sayılır: Everywhere was, Everybody is.",
      },
      {
        kind: "free",
        prompt:
          "Geçen ay göl kenarındaki bir kamp alanında iki gece kaldın. Bir internet sitesine yorum yaz: ne zaman ve kiminle gittin, en çok neyi beğendin, neyi beğenmedin, burayı kimlere önerirsin ve kaç yıldız veriyorsun.",
        checklist: [
          "Ne zaman ve kiminle kaldığını yaz",
          "En çok beğendiğin şeyi ayrıntıyla anlat",
          "Bir sorunu kibarca söyle",
          "Kimlere önerdiğini ve puanını yaz",
        ],
        minWords: 40,
        phrases: [
          { de: "We stayed there for … nights.", tr: "Orada … gece kaldık." },
          { de: "What we liked most was …", tr: "En çok beğendiğimiz şey … oldu" },
          { de: "The only problem was …", tr: "Tek sorun … idi" },
          { de: "I would recommend it to …", tr: "Burayı …'e tavsiye ederim" },
          { de: "Four stars out of five.", tr: "Beşte dört yıldız." },
        ],
        sample:
          "We stayed at Pine Lake Camping for two nights in August with our two children. What we liked most was the " +
          "lake: the water was clean and warm, and there was a small beach only fifty meters from our tent. The toilets " +
          "and showers were clean, and everybody was friendly. The only problem was the shop. It closed at six, and " +
          "after that there was nothing to buy anywhere near the campsite. Also, the internet only worked next to the " +
          "office. I would recommend it to families and to people who like quiet evenings, but not to groups who want " +
          "a party. Four stars out of five.",
      },
    ],
  },

  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s14",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "get UP, turn it OFF",
    genre: "pronounce",
    intro: "İki parçalı fiillerde (get up, turn off, pick up) vurgu çoğu zaman ikinci parçaya düşer. Fiili vurgulayıp küçük kelimeyi yutarsan dinleyen hangi fiili kastettiğini kaçırır.",
    gloss: [
      { de: "get up", tr: "kalkmak" },
      { de: "turn off", tr: "kapamak" },
      { de: "pick up", tr: "gidip almak" },
      { de: "give up", tr: "pes etmek" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "I get up at six.",
        tr: "Altıda kalkarım.",
        hint: "get UP: ikinci parça güçlü ve yüksek. „get“ kısa ve alçak: gi-TAP.",
        confusions: [
          { heard: [], fix: "Ağırlığı „get“e verirsen „up“ yutulur ve fiil tanınmaz.", expected: "get up" },
        ],
      },
      {
        de: "Please turn it off.",
        tr: "Lütfen onu kapat.",
        hint: "Zamir araya girse de vurgu edatta kalır: törn-i-TOF.",
        confusions: [
          { heard: [], fix: "„it“ vurgusuz ve kısa; güçlü olan „off“.", expected: "turn it off" },
        ],
      },
      {
        de: "Can you pick me up at eight?",
        tr: "Beni sekizde alabilir misin?",
        hint: "pick me UP: „me“ zayıf, „up“ güçlü. „eight“ da vurgulu çünkü yeni bilgi.",
        confusions: [
          { heard: [], fix: "„pick“i vurgulayıp „up“ı yutarsan cümle yarım kalır.", expected: "pick me up" },
        ],
      },
      {
        de: "Hurry up, the bus is here.",
        tr: "Acele et, otobüs geldi.",
        hint: "HA-ri-AP: „up“ burada da güçlü. „bus“ ve „here“ ikinci vurgular.",
        confusions: [
          { heard: [], fix: "Edatı tam söyle; kısa bir „ap“ bile yeter ama duyulmalı.", expected: "hurry up" },
        ],
      },
      {
        de: "She looked after my cat.",
        tr: "Kedime o baktı.",
        hint: "look AF-ter: vurgu edatın ilk hecesinde. „looked“ kısa: lukt.",
        confusions: [
          { heard: [], fix: "„after“ın ilk hecesi güçlü; „looked“ ona bağlanır.", expected: "looked after" },
        ],
      },
      {
        de: "Don't give up now.",
        tr: "Şimdi pes etme.",
        hint: "gi-VAP: „give“ ile „up“ bağlanır, vurgu „up“ta. „now“ da güçlü kalır.",
        confusions: [
          { heard: [], fix: "„give“ tek başına „vermek“; anlamı „up“ taşıdığı için o duyulmalı.", expected: "give up" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g14",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "something, anybody, nowhere",
    genre: "grammar",
    intro: "A1'de some ve any'yi isimle kullandın; bu kez onlardan kurulan „bir şey, kimse, hiçbir yer, herkes“ sözcükleri var.",
    focus: "some- / any- / no- / every- bileşikleri: something, anybody, nowhere, everyone",
    gloss: [
      { de: "glasses", tr: "gözlük" },
      { de: "fridge", tr: "buzdolabı" },
      { de: "nobody", tr: "hiç kimse" },
      { de: "everywhere", tr: "her yerde" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "Dört ön ek, üç son ek",
        tr: "some, any, no ve every; thing (şey), body ya da one (kişi) ve where (yer) ile birleşir: something, anybody, nowhere, everyone. „body“ ile „one“ aynı anlamı taşır. Olumlu cümlede genelde some- kullanılır.",
        examples: [
          { de: "There is something in my shoe.", tr: "Ayakkabımda bir şey var." },
          { de: "Somebody called you this morning.", tr: "Bu sabah biri seni aradı." },
          { de: "I left my glasses somewhere.", tr: "Gözlüğümü bir yerde unuttum." },
        ],
      },
      {
        heading: "Soru ve olumsuzda any-, no- tek başına olumsuz",
        tr: "Soru ve „not“ içeren cümlede any- gelir. no- ise kendisi olumsuzdur ve fiil olumlu kalır. Türkçedeki „kimseyi görmedim“ kalıbını birebir çevirip iki olumsuzu yan yana koymak („I didn't see nobody“) yanlıştır.",
        examples: [
          { de: "I didn't see anybody.", tr: "Kimseyi görmedim.", note: "not + any-" },
          { de: "I saw nobody.", tr: "Hiç kimseyi görmedim.", note: "no- + olumlu fiil" },
          { de: "Is anybody there?", tr: "Orada kimse var mı?" },
        ],
      },
      {
        heading: "every- tekil fiil alır",
        tr: "„everybody“ Türkçede „herkes“ gibi çoğul düşünülse de İngilizcede TEKİL sayılır: Everybody is, Everything was. Aynı kural somebody, nobody ve anything için de geçerlidir.",
        examples: [
          { de: "Everybody is here now.", tr: "Artık herkes burada." },
          { de: "Everything was fine.", tr: "Her şey yolundaydı." },
          { de: "Nobody knows the answer.", tr: "Cevabı kimse bilmiyor.", note: "knows: tekil" },
        ],
      },
    ],
    questions: [
      {
        text: "There is ___ at the door. Can you open it?",
        options: ["anybody", "somebody", "nobody"],
        answer: 1,
        explain: "Olumlu cümle ve kapıda biri var: somebody.",
      },
      {
        text: "Everybody ___ ready.",
        options: ["is", "are", "be"],
        answer: 0,
        explain: "every- ile kurulan sözcükler tekil fiil alır: Everybody is.",
      },
      {
        text: "Which sentence is correct?",
        options: ["I don't know nobody here.", "I know nobody not here.", "I don't know anybody here."],
        answer: 2,
        explain: "„not“ varsa any- gelir; iki olumsuz yan yana durmaz.",
      },
      {
        kind: "gapfill",
        text: "We didn't buy ___ at the market.",
        options: [],
        answer: 0,
        accept: ["anything"],
        explain: "Olumsuz cümlede şey için any-: anything.",
      },
      {
        kind: "gapfill",
        text: "I looked ___ for my glasses, but I didn't find them. (all places)",
        options: [],
        answer: 0,
        accept: ["everywhere"],
        explain: "Her yere baktım: everywhere.",
      },
      {
        kind: "gapfill",
        text: "___ called while you were out. (a person)",
        options: [],
        answer: 0,
        accept: ["Somebody", "Someone", "somebody", "someone"],
        explain: "Olumlu cümlede kimliği bilinmeyen biri: somebody ya da someone.",
      },
      {
        kind: "gapfill",
        text: "There was ___ in the fridge, so we went out to eat. (no thing)",
        options: [],
        answer: 0,
        accept: ["nothing"],
        explain: "Fiil olumlu (was), olumsuzluğu nothing taşır.",
      },
      {
        kind: "order",
        text: "Soruyu doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["Did", "you", "meet", "anybody", "there?"],
        explain: "Soruda any-: Did you meet anybody there?",
      },
      {
        kind: "truefalse",
        text: "„Everybody are waiting for you.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„everybody“ tekildir: Everybody is waiting for you.",
      },
      {
        kind: "truefalse",
        text: "„I can't find my keys anywhere.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Olumsuz cümlede any- gelir; cümle doğru.",
      },
    ],
  },
];
