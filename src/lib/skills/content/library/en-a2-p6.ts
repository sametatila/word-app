import type { SkillExercise } from "../../types";

/**
 * EN · A2 — Beceriler kütüphanesi, parti 6.
 *
 * Kurallar ve emsal: `en-a2.ts` (parti 1) ve `data/content/SPEC.md`.
 *
 * A2'de okuma, dinleme ve yazma hücreleri mobil partisiyle zaten ONUN
 * üstünde; bu partiler yalnız KONUŞMA ve DİL BİLGİSİ hücrelerini ona
 * tamamlıyor.
 */
export const enA2P6: SkillExercise[] = [
  // ─────────────────────────── KONUŞMA ───────────────────────────
  {
    id: "en-a2-lib-s6",
    course: "en",
    level: "A2",
    skill: "speaking",
    title: "I'll, you've, won't",
    genre: "pronounce",
    intro: "Kısaltmalar yazıda kolay görünür ama söylerken tek heceye iner; hepsini açık söylemek yapay duyulur.",
    gloss: [
      { de: "to promise", tr: "söz vermek" },
      { de: "to forget", tr: "unutmak" },
      { de: "later", tr: "sonra" },
      { de: "already", tr: "çoktan" },
    ],
    minutes: 5,
    tasks: [
      {
        de: "I'll call you later.",
        tr: "Seni sonra ararım.",
        hint: "„I'll“ tek hecedir: AYL. „I will“ diye açmak sözü vurgulamak istediğinde kullanılır.",
        confusions: [
          { heard: ["I will call you later"], fix: "Günlük konuşmada kısaltma normaldir; açık biçim vurgu taşır.", expected: "I'll" },
        ],
      },
      {
        de: "You've already promised.",
        tr: "Zaten söz verdin.",
        hint: "„You've“ = YUUV, tek hece. „have“ burada vurgusuzdur ve v sesine iner.",
        confusions: [
          { heard: ["You have already promised"], fix: "Yardımcı fiil vurgulanmaz; kısalmış hâliyle akar.", expected: "You've" },
        ],
      },
      {
        de: "I won't forget.",
        tr: "Unutmayacağım.",
        hint: "„won't“ = WOUNT, uzun o ile. „want“ (WONT) ile karıştırılmaması için uzunluğa dikkat.",
        confusions: [
          { heard: ["I want forget"], fix: "„won't“ uzun ou taşır; kısa söylersen başka kelime duyulur.", expected: "won't" },
        ],
      },
      {
        de: "She doesn't know yet.",
        tr: "Henüz bilmiyor.",
        hint: "„doesn't“ = DA-zınt. İlk hece vurgulu, ikincisi zayıf; sondaki t çoğu zaman yutulur.",
        confusions: [
          { heard: ["She does not know yet"], fix: "Açık biçim burada sert ve resmî duyulur; kısaltma doğaldır.", expected: "doesn't" },
        ],
      },
      {
        de: "They're here and we're late.",
        tr: "Onlar geldi, biz geç kaldık.",
        hint: "„They're“ = DER, „we're“ = WİR. İkisi de tek hecedir ve are sesi neredeyse kaybolur.",
        confusions: [
          { heard: ["They are here and we are late"], fix: "Kısaltmalarda „are“ ayrı bir hece oluşturmaz.", expected: "they're" },
        ],
      },
      {
        de: "It's been a long day, hasn't it?",
        tr: "Uzun bir gün oldu, değil mi?",
        hint: "„It's been“ = İTS-bin, „hasn't it“ = HEZ-nit. Ek soruda iki kelime birleşir.",
        confusions: [
          { heard: ["It has been a long day, has not it"], fix: "Ek soru her zaman kısaltmayla kurulur.", expected: "hasn't it" },
        ],
      },
    ],
  },

  // ─────────────────────────── DİL BİLGİSİ ───────────────────────────
  {
    id: "en-a2-lib-g6",
    course: "en",
    level: "A2",
    skill: "grammar",
    title: "Have you ever been there?",
    genre: "grammar",
    intro: "Geçmişte olan ama ne zaman olduğu söylenmeyen olaylar için ayrı bir zaman var; onu geçmiş zamandan ayır.",
    focus: "Present perfect: deneyim, ever / never / just / yet",
    gloss: [
      { de: "abroad", tr: "yurt dışı" },
      { de: "to finish", tr: "bitirmek" },
      { de: "yet", tr: "henüz" },
      { de: "ever", tr: "hiç" },
    ],
    minutes: 7,
    explanation: [
      {
        heading: "have + üçüncü biçim",
        tr: "Present perfect „have/has“ ile fiilin ÜÇÜNCÜ biçiminden kurulur: work → worked, see → seen, be → been. Anlamı, olayın geçmişte olduğunu ama ZAMANININ söylenmediğini bildirir. „I have seen that film“ — ne zaman gördüğü önemli değil, önemli olan görmüş olması.",
        examples: [
          { de: "I have seen that film.", tr: "O filmi gördüm.", note: "zaman söylenmiyor" },
          { de: "She has worked here for two years.", tr: "İki yıldır burada çalışıyor.", note: "hâlâ sürüyor" },
          { de: "We haven't finished yet.", tr: "Henüz bitirmedik.", note: "olumsuz + yet" },
        ],
      },
      {
        heading: "ever, never, just, already, yet",
        tr: "Bu zamanla birlikte belirli sözcükler gelir: „ever“ sorularda („Have you ever …?“), „never“ olumsuz deneyimde, „just“ az önce olan için, „already“ beklenenden erken olan için, „yet“ ise soru ve olumsuzda ve CÜMLE SONUNDA durur.",
        examples: [
          { de: "Have you ever been abroad?", tr: "Hiç yurt dışına çıktın mı?", note: "ever + soru" },
          { de: "I have just finished.", tr: "Az önce bitirdim.", note: "just: yeni oldu" },
          { de: "Has the bus arrived yet?", tr: "Otobüs geldi mi?", note: "yet: cümle sonunda" },
        ],
      },
      {
        heading: "Belirli bir zaman varsa past simple",
        tr: "Cümlede „yesterday, last week, in 2019, two days ago“ gibi belirli bir zaman geçiyorsa present perfect KULLANILMAZ; past simple gelir. „I have seen him yesterday“ yanlıştır, „I saw him yesterday“ doğrudur. Bu, en sık yapılan hatadır.",
        examples: [
          { de: "I saw him yesterday.", tr: "Onu dün gördüm.", note: "belirli zaman → past simple" },
          { de: "I have seen him twice.", tr: "Onu iki kez gördüm.", note: "zaman yok → present perfect" },
          { de: "She went to Rome in 2019.", tr: "2019'da Roma'ya gitti.", note: "yıl → past simple" },
        ],
      },
    ],
    questions: [
      {
        text: "___ you ever been abroad?",
        options: ["Did", "Have", "Are"],
        answer: 1,
        explain: "„ever“ ile deneyim soruluyor; yardımcı fiil have'dir.",
      },
      {
        text: "Which sentence is correct?",
        options: [
          "I have seen him yesterday.",
          "I saw him yesterday.",
          "I have saw him yesterday.",
        ],
        answer: 1,
        explain: "Belirli bir zaman varsa past simple gelir.",
      },
      {
        text: "Has the bus arrived ___?",
        options: ["ever", "yet", "just"],
        answer: 1,
        explain: "Soru ve olumsuzda „yet“ kullanılır ve cümle sonunda durur.",
      },
      {
        kind: "gapfill",
        text: "She ___ worked here for two years. (have)",
        options: [],
        answer: 0,
        accept: ["has"],
        explain: "Üçüncü tekil kişide yardımcı fiil has olur.",
      },
      {
        kind: "gapfill",
        text: "We haven't ___ yet. (finish)",
        options: [],
        answer: 0,
        accept: ["finished"],
        explain: "Present perfect'te fiilin üçüncü biçimi gelir.",
      },
      {
        kind: "gapfill",
        text: "I have ___ finished my homework. (az önce)",
        options: [],
        answer: 0,
        accept: ["just"],
        explain: "„just“ az önce olan bir şeyi bildirir.",
      },
      {
        kind: "gapfill",
        text: "She ___ to Rome in 2019. (go)",
        options: [],
        answer: 0,
        accept: ["went"],
        explain: "Yıl belirtildiği için past simple: went.",
      },
      {
        kind: "order",
        text: "Cümleyi doğru sıraya diz.",
        options: [],
        answer: 0,
        items: ["I", "have", "never", "been", "to Paris"],
        explain: "have + never + üçüncü biçim + yer.",
      },
      {
        kind: "truefalse",
        text: "„I have seen him last week.“ — Bu cümle doğru mu?",
        options: ["True", "False"],
        answer: 1,
        explain: "„last week“ belirli bir zamandır; past simple gerekir.",
      },
      {
        kind: "truefalse",
        text: "„Have you ever been abroad?“ — Bu soru doğru mu?",
        options: ["True", "False"],
        answer: 0,
        explain: "Deneyim sorusu present perfect ile kurulur.",
      },
    ],
  },
];
