import type { SkillExercise } from "../types";

/**
 * A2 · Ünite 21 — "Alışkanlıklar, diziler, haberler, ekran süresi" (yalnız yazma).
 *
 * Dört ders: Wenn ich Zeit habe · Welche Serie schaust du? · Hast du das
 * gehört? · Zu viel am Handy. İçerik ünite 1-21'in kelimeleriyle sınırlı.
 *
 *   Ünite 21: wenn, meistens, sonst, einige, gelegentlich, irgendwie,
 *             tagsüber, manche · der Krimi, die Fernsehsendung, total,
 *             der Star, der Titel, umschalten, anschauen, der Fan ·
 *             der Zeitungsartikel, die Zeitschrift, der Radiosender, die Lüge,
 *             wahrscheinlich, misstrauisch, mitbekommen, herausfinden ·
 *             die App, posten, liken, das Profil, echt, der Chat, das Selfie,
 *             online
 *   Kalıplar: Wenn ich Zeit habe, lese ich. · Meistens bin ich tagsüber nicht
 *             zu Hause. · Ich schaue Krimis, wenn ich müde bin. · Wie heißt
 *             der Titel? · Ich habe gehört, dass die Preise steigen. ·
 *             Stimmt das wirklich? · Wenn ich Langeweile habe, schaue ich aufs
 *             Handy. · Ich bin heute Abend wieder online.
 *
 * Yazma havuzunu 50'ye tamamlayan son iki egzersiz. Ölçtüğü nokta wenn
 * yan cümlesinin cümle başında durması: yan cümle önce gelince ana cümle
 * fiille başlar (Wenn ich Zeit habe, LESE ich). Öğrenci yan cümleyi kurmayı
 * öğrenip bu ters dönmeyi atlıyor ve "Wenn ich Zeit habe, ich lese" diyor —
 * A2'nin son büyük söz dizimi tuzağı.
 */
export const a2U21: SkillExercise[] = [
  {
    id: "a2-u21-w1",
    level: "A2",
    skill: "writing",
    unit: 21,
    title: "Yan cümle başta olunca",
    genre: "Dil bilgisi",
    intro: "wenn ile başlayan cümlede ana cümle özneyle değil fiille devam eder.",
    gloss: [
      { de: "meistens", tr: "çoğunlukla", en: "mostly" },
      { de: "tagsüber", tr: "gündüzleri", en: "during the day" },
      { de: "der Krimi", tr: "polisiye", en: "crime drama" },
      { de: "die Langeweile", tr: "can sıkıntısı", en: "boredom" },
    ],
    minutes: 6,
    tasks: [
      {
        kind: "build",
        tr: "Vaktim olunca kitap okurum.",
        answer: "Wenn ich Zeit habe, lese ich",
        hint: "Yan cümle başta: virgülden sonra önce fiil, sonra özne gelir.",
      },
      {
        kind: "build",
        tr: "Yorgun olduğumda polisiye izlerim.",
        answer: "Ich schaue Krimis, wenn ich müde bin",
        hint: "Yan cümle sonda durursa ana cümle normal sırasını korur.",
      },
      {
        kind: "build",
        tr: "Çoğunlukla gündüzleri evde olmam.",
        answer: "Meistens bin ich tagsüber nicht zu Hause",
        hint: "Cümle zarfla başlarsa da fiil ikinci sırada kalır, özne arkaya geçer.",
      },
      {
        kind: "rewrite",
        prompt: "Cümleyi düzelt: yan cümle başta olduğu için ana cümlenin sırası değişmeli.",
        source: "Wenn ich Langeweile habe, ich schaue aufs Handy.",
        answer: "Wenn ich Langeweile habe, schaue ich aufs Handy.",
        alternatives: ["Wenn ich Langeweile habe, schaue ich aufs Handy"],
        why: "Yan cümle cümlenin ilk ögesi sayılır, o yüzden çekimli fiil hemen virgülden sonra gelir ve özne fiilin arkasına geçer.",
      },
    ],
  },
  {
    id: "a2-u21-w2",
    level: "A2",
    skill: "writing",
    unit: 21,
    title: "Zu viel am Handy?",
    genre: "Forum yazısı",
    intro: "Foruma yaz: telefonu ne zaman eline alıyorsun, ne değiştirmek istiyorsun?",
    gloss: [
      { de: "die App", tr: "uygulama", en: "app" },
      { de: "posten", tr: "paylaşmak", en: "to post" },
      { de: "online", tr: "çevrimiçi", en: "online" },
      { de: "gelegentlich", tr: "ara sıra", en: "occasionally" },
      { de: "verringern", tr: "azaltmak", en: "to reduce" },
      { de: "machbar", tr: "yapılabilir", en: "doable" },
    ],
    minutes: 8,
    tasks: [
      {
        kind: "reply",
        prompt: "Forumdaki soruya cevap yaz. Telefonu ne zaman eline aldığını wenn ile anlat, günde ne kadar sürdüğünü tahmin et, neyi değiştirmek istediğini söyle ve bunun senin için yapılabilir olup olmadığını yaz.",
        stimulus:
          "FORUM: LEBEN OHNE HANDY — GEHT DAS?\n\n" +
          "Ich schaue jeden Tag ungefähr vier Stunden aufs Handy. Vier! Das sind 28 Stunden pro Woche, also mehr als ein Arbeitstag.\n\n" +
          "Ich habe zwei Apps gelöscht und poste nichts mehr. Es ist besser geworden, aber abends bin ich trotzdem wieder online.\n\n" +
          "Wie ist das bei euch? Wann nehmt ihr das Handy in die Hand — und was habt ihr geändert?",
        checklist: [
          "Telefonu ne zaman eline aldığını wenn ile anlattın mı?",
          "Günde ne kadar sürdüğüne dair bir tahmin verdin mi?",
          "Neyi değiştirmek istediğini yazdın mı?",
          "Bunun senin için yapılabilir olup olmadığını söyledin mi?",
        ],
        minWords: 45,
        phrases: [
          { de: "Wenn ich Langeweile habe, schaue ich aufs Handy.", tr: "canım sıkılınca telefona bakıyorum", en: "when I'm bored I look at my phone" },
          { de: "Ich möchte das verringern.", tr: "bunu azaltmak istiyorum", en: "I'd like to cut that down" },
          { de: "Das ist schwer, aber machbar.", tr: "zor ama yapılabilir", en: "that's hard but doable" },
        ],
        sample:
          "Bei mir ist es ähnlich, aber nicht ganz so schlimm.\n\n" +
          "Wenn ich Langeweile habe, schaue ich sofort aufs Handy — im Bus, in der Warteschlange, manchmal sogar beim Kochen. Wenn ich arbeite, liegt es zum Glück in der Tasche.\n\n" +
          "Ich schätze zwei bis drei Stunden pro Tag. Gelegentlich mehr, wenn ich abends eine Serie anschaue.\n\n" +
          "Ändern möchte ich vor allem den Abend. Ab zehn Uhr lasse ich das Handy jetzt in der Küche, und ich habe wieder einen Wecker gekauft. Die ersten drei Nächte waren komisch, aber ich schlafe besser.\n\n" +
          "Ganz ohne Handy geht es bei mir nicht, weil meine Familie weit weg wohnt. Aber weniger — das ist schwer, aber machbar.",
      },
    ],
  },
];
