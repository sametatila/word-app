import { courseOrDefault } from "../lib/courses";

/**
 * Giriş öncesi kısa ısınmanın kelimeleri — hesap açmadan önce "ilk değer" tadı.
 *
 * Veri PARİTEYE bağlı: anahtar `<anadil>-<kurs>`. Eskiden bu liste ekranın içinde
 * sabit Almanca-Türkçe olarak duruyordu, yani İngilizce kursu seçen kullanıcı
 * ısınmada Almanca kelime öğreniyordu. Yeni bir parite eklemek artık buraya bir
 * satır yazmak; içeriği olmayan paritede ısınma adımı hiç gösterilmez
 * (bkz. OnboardingScreen).
 *
 * Aynı hedef dili paylaşan kursa düşmek meşru (gsw-zh → de: ikisi de Almanca),
 * farklı bir dile ASLA düşülmez — ders yükleyicisiyle aynı kural.
 */
export type FirstWord = { de: string; artikel: string | null; tr: string; ex: string; exTr: string };

const BY_PAIR: Record<string, Record<string, FirstWord[]>> = {
  "tr-de": {
    A1: [
      { de: "Hallo", artikel: null, tr: "Merhaba", ex: "Hallo, ich bin Emma.", exTr: "Merhaba, ben Emma." },
      { de: "Tag", artikel: "der", tr: "gün", ex: "Guten Tag!", exTr: "İyi günler!" },
      { de: "Wasser", artikel: "das", tr: "su", ex: "Ich trinke Wasser.", exTr: "Su içiyorum." },
      { de: "Haus", artikel: "das", tr: "ev", ex: "Das Haus ist groß.", exTr: "Ev büyük." },
      { de: "danke", artikel: null, tr: "teşekkürler", ex: "Danke schön!", exTr: "Çok teşekkürler!" },
    ],
    A2: [
      { de: "Termin", artikel: "der", tr: "randevu", ex: "Ich habe einen Termin.", exTr: "Bir randevum var." },
      { de: "Rechnung", artikel: "die", tr: "fatura, hesap", ex: "Die Rechnung, bitte.", exTr: "Hesap, lütfen." },
      { de: "einladen", artikel: null, tr: "davet etmek", ex: "Ich lade dich ein.", exTr: "Seni davet ediyorum." },
      { de: "Wetter", artikel: "das", tr: "hava (durumu)", ex: "Das Wetter ist schön.", exTr: "Hava güzel." },
      { de: "vielleicht", artikel: null, tr: "belki", ex: "Vielleicht komme ich.", exTr: "Belki gelirim." },
    ],
    B1: [
      { de: "Erfahrung", artikel: "die", tr: "deneyim", ex: "Ich habe viel Erfahrung.", exTr: "Çok deneyimim var." },
      { de: "sich bewerben", artikel: null, tr: "başvurmak", ex: "Ich bewerbe mich um die Stelle.", exTr: "İş için başvuruyorum." },
      { de: "Umwelt", artikel: "die", tr: "çevre", ex: "Wir schützen die Umwelt.", exTr: "Çevreyi koruyoruz." },
      { de: "obwohl", artikel: null, tr: "-mesine rağmen", ex: "Obwohl es regnet, gehe ich.", exTr: "Yağmura rağmen gidiyorum." },
      { de: "empfehlen", artikel: null, tr: "tavsiye etmek", ex: "Ich empfehle dieses Buch.", exTr: "Bu kitabı tavsiye ederim." },
    ],
    B2: [
      { de: "Voraussetzung", artikel: "die", tr: "önkoşul", ex: "Deutsch ist eine Voraussetzung.", exTr: "Almanca bir önkoşuldur." },
      { de: "berücksichtigen", artikel: null, tr: "dikkate almak", ex: "Wir berücksichtigen deine Meinung.", exTr: "Görüşünü dikkate alıyoruz." },
      { de: "Zusammenhang", artikel: "der", tr: "bağlam, ilişki", ex: "In diesem Zusammenhang…", exTr: "Bu bağlamda…" },
      { de: "nachhaltig", artikel: null, tr: "sürdürülebilir", ex: "Wir leben nachhaltig.", exTr: "Sürdürülebilir yaşıyoruz." },
      { de: "zweifellos", artikel: null, tr: "kuşkusuz", ex: "Das ist zweifellos richtig.", exTr: "Bu kuşkusuz doğru." },
    ],
    C1: [
      { de: "Auseinandersetzung", artikel: "die", tr: "tartışma, irdeleme", ex: "eine kritische Auseinandersetzung", exTr: "eleştirel bir irdeleme" },
      { de: "gewährleisten", artikel: null, tr: "garanti etmek, sağlamak", ex: "Wir gewährleisten Qualität.", exTr: "Kaliteyi garanti ederiz." },
      { de: "unerlässlich", artikel: null, tr: "vazgeçilmez", ex: "Übung ist unerlässlich.", exTr: "Pratik vazgeçilmezdir." },
      { de: "Vorreiterrolle", artikel: "die", tr: "öncü rol", ex: "Sie übernimmt eine Vorreiterrolle.", exTr: "Öncü rolü üstleniyor." },
      { de: "infolgedessen", artikel: null, tr: "bunun sonucunda", ex: "…, infolgedessen stieg der Preis.", exTr: "…, bunun sonucunda fiyat arttı." },
    ],
  },
};

/** Paritenin ısınma seti; yoksa aynı hedef dili paylaşan kursu dener, o da yoksa boş. */
function setsFor(nativeLang: string, course: string): Record<string, FirstWord[]> | undefined {
  const own = BY_PAIR[`${nativeLang}-${course}`];
  if (own) return own;
  const target = courseOrDefault(course).targetLang;
  for (const key of Object.keys(BY_PAIR)) {
    const [lang, id] = [key.slice(0, key.indexOf("-")), key.slice(key.indexOf("-") + 1)];
    if (lang === nativeLang && courseOrDefault(id).targetLang === target) return BY_PAIR[key];
  }
  return undefined;
}

export function firstWordsFor(nativeLang: string, course: string, level: string): FirstWord[] {
  const sets = setsFor(nativeLang, course);
  if (!sets) return [];
  return sets[level] ?? sets.A1 ?? [];
}

/** Bu paritede ısınma gösterilebilir mi — onboarding buna göre adımı atlar. */
export function hasFirstWords(nativeLang: string, course: string): boolean {
  return !!setsFor(nativeLang, course);
}
