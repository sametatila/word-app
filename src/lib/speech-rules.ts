import type { SpeechConfusion } from "./speech";

/**
 * Telaffuz sapmalarının kuraldan türetilmesi.
 *
 * Elle yazılan sapmalar iyi çalışıyor ama kapsamı doğrusal: her satır için
 * emek gerekiyor ve elde ~100 biçim varken Almancada binlerce kelime var.
 * Öğrenci listede olmayan bir hata yaptığında elimizde "farklı bir şey
 * duyuldu"dan başka söz kalmıyordu.
 *
 * Buradaki fikir şu: Türkçe konuşanın hata örüntüleri **kural**, kelime kelime
 * liste değil. z sesini [z] söylemek bir kuraldır ve her z'li kelimede geçerli.
 * Kuralı hedef kelimeye uygulayıp sonucu Almanca sözlükte aramak, elle yazılan
 * her satırın yerine yüzlercesini koyuyor — ve sözlük zaten elimizde
 * (uygulamanın kendi 8.000+ kelimesi).
 *
 * Sözlükte aramanın sebebi mevcut içerik kuralının aynısı: tanıyıcı yalnızca
 * gerçek Almanca kelimeler yazar. "şön" gibi var olmayan bir biçim asla
 * dönmez, dolayısıyla üretilse bile ölü içerik olur. Sözlükte karşılığı
 * olmayan her türev atılıyor.
 *
 * Türetilenler elle yazılanların yerine geçmiyor, arkasına ekleniyor: elle
 * yazılan açıklama her zaman daha isabetli olur, önce o denenir.
 */

/** Sözlük araması için sadeleştirme — ß ve büyük harf farkı elenir. */
export function foldWord(word: string): string {
  return word.toLocaleLowerCase("de-DE").replace(/ß/g, "ss");
}

type Rule = {
  id: string;
  /** Hedef kelimeden olası yanlış biçimler. */
  variants: (word: string) => string[];
  /** Kullanıcıya gösterilecek açıklama. */
  fix: (target: string, wrong: string) => string;
};

/** Tekrarlayan üretimleri tek yerde toplar. */
function swap(word: string, from: string, to: string): string[] {
  if (!word.includes(from)) return [];
  return [word.split(from).join(to)];
}

/**
 * Kurallar — hepsi Türkçe konuşanın Almancada yaptığı **belgelenmiş** hatalar.
 *
 * Bilerek dışarıda bırakılanlar da var: ö ve ü'nün *kalitesi* burada yok,
 * çünkü Türkçede bu sesler zaten var ve o hata örüntüsü İngilizce konuşana
 * ait. Uzunluk kuralı ise duruyor — asıl zorluk orada.
 */
const RULES: Rule[] = [
  {
    // Almanca z her yerde [ts]; Türkçe z ise [z]. En sık ve en anlam bozan hata.
    id: "z-s",
    variants: (w) => [...swap(w, "z", "s"), ...swap(w, "z", "ss")],
    fix: (target, wrong) =>
      `„${target}“ yerine „${wrong}“ duyuldu: Almanca „z“ her yerde ts'dir, Türkçedeki z değil.`,
  },
  {
    // Almanca v = [f]; Türkçe v = [v]. Karşılığı çoğu zaman w'li bir kelime.
    id: "v-w",
    variants: (w) => swap(w, "v", "w"),
    fix: (target, wrong) =>
      `„${target}“ yerine „${wrong}“ duyuldu: Almanca „v“ f gibi okunur, Türkçedeki v gibi değil.`,
  },
  {
    // Harfler tek tek okununca ikili ünlüler yer değiştiriyor.
    id: "ie-ei",
    variants: (w) => [...swap(w, "ie", "ei"), ...swap(w, "ei", "ie")],
    fix: (target, wrong) =>
      `„${target}“ yerine „${wrong}“ duyuldu: „ie“ uzun i, „ei“ ise ay okunur — ikilinin ikinci harfi sesi söyler.`,
  },
  {
    // Uzatma h'si düşünce ünlü kısalıyor: ihn → in, fühle → fülle.
    id: "uzunluk-h",
    variants: (w) => [w.replace(/([aeiouäöü])h/g, "$1")],
    fix: (target, wrong) =>
      `„${target}“ yerine „${wrong}“ duyuldu: buradaki „h“ okunmaz, önündeki ünlüyü uzatır — ses kısa kalınca kelime değişiyor.`,
  },
  {
    // Çift ünsüz önündeki ünlünün kısa olduğunu gösterir: offen ≠ Ofen.
    id: "uzunluk-cift-unsuz",
    variants: (w) => {
      const out: string[] = [];
      const single = w.replace(/([bdfgklmnprst])\1/g, "$1");
      if (single !== w) out.push(single);
      // Ters yön: tek ünsüzü ikizleyerek kısaltma.
      for (const m of w.matchAll(/[aeiouäöü]([bdfgklmnprst])(?![bdfgklmnprst])/g)) {
        const at = m.index! + 1;
        out.push(w.slice(0, at) + m[1] + w.slice(at));
      }
      return out;
    },
    fix: (target, wrong) =>
      `„${target}“ yerine „${wrong}“ duyuldu: çift ünsüz önündeki ünlünün kısa olduğunu gösterir, tek ünsüz ise uzun.`,
  },
  {
    // ich-Laut Türkçede yok; en sık ş'ye kayıyor: mich → misch, Kirche → Kirsche.
    id: "ch-sch",
    variants: (w) => swap(w, "ch", "sch"),
    fix: (target, wrong) =>
      `„${target}“ yerine „${wrong}“ duyuldu: „ch“ sesi ş'ye kaydı. Dilin ortası damağa yaklaşır ama dokunmaz.`,
  },
  {
    // Diğer sık kayma: ch kapanıp k oluyor (nicht → nickt).
    id: "ch-k",
    variants: (w) => [...swap(w, "ch", "ck"), ...swap(w, "ch", "k")],
    fix: (target, wrong) =>
      `„${target}“ yerine „${wrong}“ duyuldu: „ch“yi k gibi kapattın. Hava akmaya devam etmeli, kesilmemeli.`,
  },
];

/** Türetmede kullanılmayacak kadar kısa kelimeler — gürültü üretiyorlar. */
const MIN_LENGTH = 3;

/**
 * Bir görev cümlesi için kuraldan türetilmiş sapmalar.
 *
 * `sentence` cümlenin tamamı; kurallar tek tek kelimelere uygulanıyor çünkü
 * tanıyıcı cümleyi her seferinde farklı yazsa da kelimeyi yakalamak yeterli.
 *
 * `lexicon` sadeleştirilmiş Almanca kelime kümesi. Türev ancak burada varsa
 * kabul ediliyor: yoksa tanıyıcı onu hiç yazamaz ve satır ölü doğar.
 */
export function derivedConfusions(sentence: string, lexicon: Set<string>): SpeechConfusion[] {
  const words = sentence
    .replace(/[.,!?;:„“”"'`´()[\]…]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length >= MIN_LENGTH);

  // Aynı cümlede geçen diğer kelimeler türev olarak kullanılamaz: doğru biçim
  // zaten cümlenin içindeyse sapma hiç tetiklenmez. Bu tuzağa elle yazarken de
  // düşülmüştü ("Der Kurs war sehr kurz"), kural motoru aynısını yapmasın.
  const inSentence = new Set(words.map(foldWord));

  const out: SpeechConfusion[] = [];
  const seen = new Set<string>();

  for (const word of words) {
    const folded = foldWord(word);
    for (const rule of RULES) {
      for (const variant of rule.variants(word)) {
        const key = foldWord(variant);
        if (key === folded) continue; // kural bir şey değiştirmemiş
        if (!lexicon.has(key)) continue; // gerçek bir Almanca kelime değil
        if (inSentence.has(key)) continue; // cümlede zaten geçiyor
        if (key.includes(folded)) continue; // doğru biçimi içeriyor
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ heard: [variant], fix: rule.fix(word, variant), expected: word });
      }
    }
  }
  return out;
}
