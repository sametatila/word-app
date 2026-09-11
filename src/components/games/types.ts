import type { Round, RoundWord } from "@/lib/types";
import { courseName, courseOrDefault, type TargetLang } from "@/lib/courses";
import { COURSE_KEY, readLocal } from "@/components/speak-button";
import { glossFor, type GlossWord } from "@/lib/option-label";
import type { ErrorType } from "@/lib/errors";
import { umlautStem } from "@/lib/german";
import { foldNumbers } from "@/lib/numbers";
import { translate, type NativeLang } from "@/lib/i18n/dict";

export type GameResult = {
  wordId: number;
  correct: boolean;
  latencyMs: number;
  hintUsed?: boolean;
  /** Oyunun verdiği SRS kalitesi 0–5 (kısmi puanlı oyunlar); yoksa sunucu hesaplar. */
  quality?: number;
  /** Yanlışsa hata tipi; oyun bilir (bkz. lib/errors.ts `miss`). */
  errorType?: ErrorType;
  /** Yanlışın kendisi: seçilen şık, yazılan kelime. */
  detail?: string;
};

/**
 * Tüm oyunlar aynı sözleşmeyi kullanır:
 * tur bitince `onDone` bir kez çağrılır ve o turdaki tüm kelimelerin
 * sonuçları döner (eşleştirme gibi çoklu turlar birden fazla sonuç döndürür).
 */
export type GameProps<R extends Round = Round> = {
  round: R;
  onDone: (results: GameResult[]) => void;
};

export type { RoundWord };

/**
 * Kursun adı, arayüz dilinde — mobil `targetLangName()` karşılığı.
 *
 * Tur yönergelerinin üçü hedef dilin adını taşıyor ("İngilizce karşılığını
 * yaz"). Kurs oyunlara prop olarak akmıyor; kabuk onu `localStorage`e
 * yazıyor ve seslendirme de oradan okuyor (`speak-button`). Oyunlar ancak
 * `/api/session` cevabı geldikten SONRA çiziliyor, yani bu okuma sunucu
 * çiziminde hiç çalışmıyor ve hidrasyon uyuşmazlığı üretmiyor.
 */
export function targetName(lang: NativeLang): string {
  return courseName(readLocal(COURSE_KEY) ?? "de", lang);
}

// Artikelli gösterim ortak kaynakta: şık üreticisi (lib/session, lib/daily) ile
// oyun ekranının doğru cevabı kurma biçimi AYNI fonksiyondan gelmeli — ayrıldığı
// anda doğru şık seçilemez hâle geliyor.
export { withArtikel } from "@/lib/option-label";

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Kelime türünün etiketi, arayüz dilinde. Veri "Sonstiges" dese de çeviri
 * fiilse fiil sayılır — bu çıkarım TÜRKÇE çeviriye bakıyor (mastar eki), yani
 * arayüz dili ne olursa olsun aynı kaynaktan besleniyor.
 */
export function typLabel(typ: string, tr: string, lang: NativeLang): string {
  if (typ === "Nomen") return translate(lang, "words.typ_noun");
  if (typ === "Verb" || /(mek|mak)(\s*,|$)/.test(tr)) return translate(lang, "words.typ_verb");
  return translate(lang, "words.typ_other");
}

/**
 * Ekranda gösterilecek dilbilgisi notu.
 * Ham PDF gösterimi ("¨-e", "(Sg.)") yerine öğrencinin okuyabileceği bir metin döner.
 */
export function grammarNote(word: RoundWord, lang: NativeLang): string | null {
  const raw = word.formen?.trim();
  if (!raw) return null;
  if (/^\(?Sg\.?\)?$/i.test(raw)) return translate(lang, "words.no_plural");
  if (/^\(?Pl\.?\)?$/i.test(raw)) return translate(lang, "words.plural_only");

  if (word.artikel) {
    const m = raw.match(/^(¨)?-?\s*(\w*)$/);
    if (m) {
      const stem = m[1] ? umlautStem(word.de) : word.de;
      const suffix = m[2] ?? "";
      // Çoğul biçimin kendisi Almanca kalıyor; çevrilen yalnız etiket.
      return translate(lang, "words.plural_is", { form: `die ${stem}${suffix}` });
    }
    return translate(lang, "words.plural_is", { form: raw });
  }
  return raw; // fiil çekimleri olduğu gibi
}

/**
 * KESME İŞARETİ SİLİNİYOR, boşluğa çevrilmiyor: "what's" ile "whats" aynı
 * cevap sayılmalı. Almancada görünmeyen bir kusurdu (kesme oradaki başlıklarda
 * neredeyse hiç geçmiyor), İngilizce kursta 338 konuşma adımı kısaltma
 * taşıyor ve tanıyıcı bazen kesmeyi hiç yazmıyor.
 */
const APOSTROPHE = /['’´`\u02BC]/g;

/**
 * Diğer işaretler BOŞLUĞA çevrilir, silinmez: "A/B" iki sözcüktür, "AB" değil.
 *
 * Küme yalnız `.,!?;:` idi. Tire en önemli eksiğiydi: tanıyıcı "t-shirt"
 * yerine "t shirt", "U-Bahn" yerine "U Bahn" yazıyor ve havuzda 142 İngilizce,
 * 14 Almanca tireli başlık var - hiçbiri eşleşmiyordu. Üç nokta da öyle,
 * içerikte "My name is …" duruyor ve kimse onu söylemiyor. Mobil
 * `lib/textFold` `PUNCT` ile aynı küme.
 */
const PUNCT = /[.,!?;:"…—–\-+/()[\]{}≠→„“”»«]/g;

/**
 * Simge → sözcük. İçerikte simge HİÇ geçmiyor (hepsi "Euro", "Prozent" diye
 * yazılı) ama kullanıcı yazarken "5€", "%20" kullanıyor ve tanıyıcı da bazen
 * simge üretiyor. Simgeyi noktalama sayıp atmak yanlış olurdu: "%20" ile "20"
 * aynı şey değil. Sözcüğe açmak iki tarafı ortak biçimde buluşturuyor.
 * Mobil `lib/textFold` `SYMBOLS` ile aynı tablo.
 */
const SYMBOLS: Record<string, Record<string, string>> = {
  de: { "%": " prozent ", "€": " euro ", "$": " dollar ", "£": " pfund ", "&": " und ", "°": " grad " },
  en: { "%": " percent ", "€": " euro ", "$": " dollar ", "£": " pound ", "&": " and ", "°": " degrees " },
};
const SYMBOL_RE = /[%€$£&°]/g;

/** Yazım karşılaştırması: büyük/küçük harf, noktalama ve boşluk toleranslı. */
export function normalize(s: string, lang: TargetLang = currentTargetLang()): string {
  const table = SYMBOLS[lang] ?? SYMBOLS.de;
  return (s || "")
    .toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US")
    .replace(SYMBOL_RE, (c) => table[c] ?? " ")
    .replace(APOSTROPHE, "")
    .replace(PUNCT, " ")
    // Boşluk sadeleştirmesi noktalama temizliğinden SONRA gelmeli: "entweder ...
    // oder" önce yapıldığında çift boşukla kalıyor ve hiçbir yazımla eşleşmiyordu.
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Almanca yazım katlaması — mobil `lib/textFold` `foldCase` ile aynı.
 *
 * Ayrı işlev olarak duruyor çünkü İKİ katlama da (boşluklu ve boşuksuz) buna
 * ihtiyaç duyuyor; eskiden yalnız `foldSpelling`in içine gömülüydü ve
 * `foldTight` ondan habersizdi.
 */
function foldCase(s: string, lang: TargetLang): string {
  return lang === "de"
    ? s.replace(/ß/g, "ss").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
    : s;
}

/**
 * Boşluksuz karşılaştırma biçimi — mobil `lib/textFold` `foldTight`.
 *
 * KARŞILIĞI OLDUĞUNU SÖYLÜYORDU AMA DEĞİLDİ. Mobil tarafta `foldTight`
 * `foldCompare` üstüne kuruluyor, yani umlaut katlaması ve SAYI katlaması
 * içeriyor; buradaki ise yalnız `normalize` idi. Sonuç, aynı cevabın iki
 * platformda farklı yargılanmasıydı — "Fuesse" ya da "5" yazan Android'de
 * yedek geçişi geçiyor, webde geçemiyordu. On üç örnekle ölçüldü: yedisinde
 * ayrışıyordu, şimdi on üçünde de aynı.
 */
export function foldTight(s: string, lang: TargetLang = currentTargetLang()): string {
  return foldNumbers(foldCase(normalize(s, lang), lang), lang).replace(/\s+/g, "");
}

/**
 * Yazım farklarını eşitleyen katlama.
 *
 * Almanca klavyesi olmayan biri ä/ö/ü/ß yazamaz; standart karşılıkları
 * ae/oe/ue/ss'tir. Üstelik `ss` İsviçre'de yanlış değil **doğru** yazımdır —
 * bu uygulamada Züritüütsch kursu da var ve orada ß hiç kullanılmaz. Bu yüzden
 * ikisi de kabul edilir.
 *
 * Umlaut düz sesliye indirgenmez (ö → oe, ö → o değil): aksi hâlde "schon" ile
 * "schön" ya da "Bar" ile "Bär" birbirine karışır ve gerçekten yanlış cevap
 * doğru sayılırdı.
 *
 * Artikel her iki tarafta da isteğe bağlıdır: kelime "Tür" diye saklanıp
 * artikeli ayrı sütunda dursa bile "die Tür" yazan haklıdır.
 */
/**
 * Geçerli kursun hedef dili — mobil `lib/courses` `currentTargetLang()`
 * karşılığı. Eşleştirme işlevleri bunu VARSAYILAN olarak alıyor, yani her
 * çağıranın dili ayrıca taşımasına gerek yok; kurs seçimi zaten yerelde
 * duruyor (`COURSE_KEY`) ve sunucuda okunamazsa varsayılan kursa düşüyor.
 */
function currentTargetLang(): TargetLang {
  return courseOrDefault(readLocal(COURSE_KEY)).targetLang;
}

/**
 * Hedef dilin tanımlıkları — eşleştirmede atılıyor.
 *
 * `der|die|das` SABİT yazılıydı ve yalnız baştaki tanımlığı düşürüyordu:
 * İngilizce kursta "the" hiç düşmüyordu, yani "the door" hiçbir zaman "door"
 * ile eşleşmiyordu ve tanımlık cümlenin ortasında da geçiyor ("at the bus
 * stop"). Mobil `lib/voiceMatch` `ARTICLES` ile aynı tablo ve aynı davranış:
 * tanımlık nerede olursa olsun atılıyor.
 */
const ARTICLES: Record<string, RegExp> = {
  de: /\b(der|die|das)\b/g,
  en: /\b(the|an|a)\b/g,
};

export function foldSpelling(s: string, lang: TargetLang = currentTargetLang()): string {
  // Sayı sözcüğü → rakam, umlaut katlamadan ÖNCE (fünf ve fuenf ikisi de
  // tanınıyor, sıra aslında önemsiz): "fünf" ↔ "5" eşleşsin. Tanıyıcı sayıyı
  // rakam yazıyor, içerik sözcükle; ikisi de rakama iniyor.
  /* Umlaut katlaması artık `foldCase`te ve SAYI katlamasından ÖNCE geliyor —
     mobil `foldCompare` ile aynı sıra. Sıra güvenli, çünkü sayı sözlüğü
     umlautlu ve katlanmış yazımın İKİSİNİ de tanıyor (bkz. `lib/numbers`). */
  return foldNumbers(foldCase(normalize(s, lang), lang), lang)
    .replace(ARTICLES[lang] ?? ARTICLES.de, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Yazılan cevap, verilen başlıklardan herhangi biriyle eşleşiyor mu? */
/**
 * Katlaması BOŞALAN cevap için yedek okuma.
 *
 * Tanımlık artık nerede olursa olsun atıldığı için hedef ya da cevap yalnız
 * tanımlıksa (`der`, `the`) katlama onu tamamen boşaltıyor ve hiçbir zaman
 * eşleşmiyor. Boşalırsa tanımlığı silmeyen düz küçültmeye düşülüyor - mobil
 * `lib/voiceMatch` `foldKeep` ile aynı yedek.
 */
function foldKeep(s: string, lang: TargetLang): string {
  const folded = foldSpelling(s, lang);
  if (folded) return folded;
  return (s || "")
    .toLocaleLowerCase(lang === "de" ? "de-DE" : "en-US")
    .replace(/[.,!?;:"'’]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function matchesAnswer(typed: string, candidates: string[], lang: TargetLang = currentTargetLang()): boolean {
  const target = foldKeep(typed, lang);
  if (!target) return false;
  return candidates
    .flatMap((c) => acceptedForms(c, lang))
    .some((form) => foldKeep(form, lang) === target);
}

/**
 * Tanıyıcının sözlü noktalama ADINI simgeye çevirmesini geri alır.
 *
 * Almanca tanıyıcı "Punkt" dendiğinde onu bir yazım komutu sayıp "." yazıyor
 * (aynı biçimde Komma→",", Fragezeichen→"?"). Ama "der Punkt" başlı başına bir
 * sözlük kelimesi (nokta): simge sonra `normalize` tarafından silinince cevap
 * ORTADAN kalkıyordu ve hiçbir zaman eşleşmiyordu ("der punkt diyorum, da
 * olarak duydu"). Burada simge tekrar sözcüğe açılıyor; yalnızca EK bir okuma
 * olarak deneniyor (asıl okuma önce), yani yanlışlıkla nokta eklenen normal
 * bir cevaba zarar vermiyor — fazladan sözcük zaten `spokenMatches`'te bağışlı.
 */
const RECOGNIZER_PUNCT: Record<string, Array<[RegExp, string]>> = {
  de: [
    [/\u2026|\.\.\./g, " punkt "],
    [/\./g, " punkt "],
    [/,/g, " komma "],
    [/\?/g, " fragezeichen "],
    [/!/g, " ausrufezeichen "],
    [/:/g, " doppelpunkt "],
    [/;/g, " semikolon "],
  ],
  /*
   * İNGİLİZCE TABLO EKSİKTİ. Tanıyıcı "period" dendiğinde "." yazıyor ve
   * havuzda "limitation period", "notice period", "quote" gibi başlıklar var:
   * "limitation period" → "limitation." → katlamada "limitation" kalıyor ve
   * cevap hiç eşleşmiyordu. Mobil `lib/voiceMatch` tablosuyla birebir.
   */
  en: [
    [/\u2026|\.\.\./g, " period "],
    [/\./g, " period "],
    [/,/g, " comma "],
    [/\?/g, " question mark "],
    [/!/g, " exclamation mark "],
    [/:/g, " colon "],
    [/;/g, " semicolon "],
    [/["\u201C\u201D]/g, " quote "],
  ],
};

export function expandPunctuationWords(s: string, lang: TargetLang = currentTargetLang()): string {
  let out = s;
  for (const [re, word] of RECOGNIZER_PUNCT[lang] ?? RECOGNIZER_PUNCT.de) out = out.replace(re, word);
  return out.replace(/\s+/g, " ").trim();
}

/**
 * Söylenen cevap, verilen başlıklardan biriyle eşleşiyor mu?
 *
 * Yazılan cevaptan iki noktada ayrılıyor ve ikisi de ölçümden çıktı:
 *
 *   1. **Artikel aranmıyor.** Tanıyıcı tek kelimelik bir cevapta artikeli çok
 *      sık düşürüyor: "die Katze" denip metne "Katze" olarak geçiyor ve tur
 *      "doğrusu: die Katze" diyordu. Zaten bu turun sorusu "kedi Almanca ne"
 *      — artikelin kendi oyunu var (Artikel Yarışı). `foldSpelling` baştaki
 *      artikeli düşürdüğü için yanlış artikel de kabul ediliyor; burada
 *      ölçülen şey o değil.
 *   2. **Fazladan kelime bağışlanıyor.** Tanıyıcı "die Katze bitte" ya da
 *      "ähm die Katze" yazabiliyor; hedef biçim söylenenin İÇİNDE geçiyorsa
 *      cevap doğrudur. Yazarken böyle bir gürültü olmadığı için orada tam
 *      eşleşme aranıyor.
 *
 * Kısa biçimlerde içerme aranmıyor: "es" gibi iki harfli bir hedef, uzun bir
 * cümlenin içinde tesadüfen geçer ve her şeyi doğru sayardı.
 */
const CONTAINS_MIN = 3;

/*
 * BOŞLUKSUZ OKUMALARDA İÇERME EŞİĞİ AYRI VE YÜKSEK.
 *
 * Boşluk sınırı kalktığı için kısa bir hedef başka bir kelimenin İÇİNDE
 * tesadüfen geçiyor ve yanlış cevap doğru sayılıyor: hedef "was", söylenen
 * "das Wasser" → sıkıştırılmış biçim hedefi içeriyor. Ders havuzundaki 5164
 * başlık ölçüldü - 3 harf eşiğinde 1310 hedef başka bir başlığın içinde
 * geçiyor, 12 harfte 22 (onlar da "der Chef" ⊂ "die Chefin" gibi türevler).
 *
 * 12 seçildi çünkü bu okumanın DERDİ uzun bileşikler: tanıyıcı
 * "Anrufbeantworter"ı bölünce parçaların birleşimi hedefe EŞİT oluyor ve
 * eşitlik zaten sınanıyor; içerme yalnız bölünme ARTI dolgu sözcüğü aynı
 * anda olduğunda gerekiyor ve orada hedef hep uzun.
 */
const TIGHT_CONTAINS_MIN = 12;

export function spokenMatches(heard: string[], candidates: string[], lang: TargetLang = currentTargetLang()): boolean {
  const forms = candidates
    .flatMap((c) => acceptedForms(c, lang))
    .map((f) => foldKeep(f, lang))
    .filter(Boolean);
  if (!forms.length) return false;

  // Asıl okuma fazladan kelimeyi bağışlar (içerme); noktalama-adı açılmış
  // okuma ise YALNIZCA tam eşleşir. Aksi hâlde "Hund." → "hund punkt" içinde
  // "punkt" geçtiği için hedef "Punkt" yanlışlıkla doğru sayılırdı.
  const loose = (said: string) =>
    !!said &&
    forms.some(
      (form) =>
        said === form || (form.length >= CONTAINS_MIN && ` ${said} `.includes(` ${form} `)),
    );
  const exact = (said: string) => !!said && forms.some((form) => said === form);

  /*
   * BOŞLUKSUZ İKİNCİ OKUMA. Tanıyıcı Almanca bileşikleri ayırıyor
   * ("Anrufbeantworter" → "Anruf Beantworter"; havuzda 2313 uzun bileşik) ve
   * tireli İngilizce başlıkları boşlukla yazıyor ("t-shirt" → "t shirt").
   * Boşlukları tamamen atınca iki yazım da aynı dizeye iniyor. Mobil
   * `lib/voiceMatch` bu okumayı baştan beri yapıyordu, web yapmıyordu.
   *
   * İçerme burada da bağışlı ama boşluk sınırı olmadan: sıkıştırılmış hedef
   * sıkıştırılmış söylenenin içinde geçiyorsa doğru ("ähm anrufbeantworter"
   * → "aehmanrufbeantworter" içinde "anrufbeantworter" var).
   */
  const tight = (x: string) => x.replace(/\s+/g, "");
  const formsTight = forms.map(tight);
  const looseTight = (said: string) => {
    const g = tight(said);
    return !!g && formsTight.some((form) => g === form || (form.length >= TIGHT_CONTAINS_MIN && g.includes(form)));
  };

  /*
   * ÜÇÜNCÜ OKUMA: SAYI KATLANMADAN sıkıştırma. Tanıyıcı bileşiği bölünce
   * ikinci parça sayı sözcüğü olabiliyor ("Fasnacht" → "Fasn acht") ve
   * katlanmış biçim ("fasn 8") artık orijinaline benzemiyor; `normalize`
   * sayıya dokunmadığı için ham okuma o yolu kapatıyor. Mobil karşılığı
   * `lib/textFold` `foldLetters`.
   */
  const raw3 = (x: string) => foldTight(x, lang);
  const formsRaw = candidates.flatMap((c) => acceptedForms(c, lang)).map(raw3).filter(Boolean);
  const looseRaw = (said: string) => {
    const h = raw3(said);
    return !!h && formsRaw.some((form) => h === form || (form.length >= TIGHT_CONTAINS_MIN && h.includes(form)));
  };

  return heard.some((raw) => {
    const said = foldKeep(raw, lang);
    if (loose(said)) return true;
    if (looseTight(said)) return true;
    if (looseRaw(raw)) return true;
    const expanded = expandPunctuationWords(raw, lang);
    return expanded !== raw && exact(foldKeep(expanded, lang));
  });
}

/**
 * Bir madde başlığı için kabul edilebilir yazımların tamamı.
 *
 * Sözlük başlığı ile öğrencinin yazacağı şey aynı değildir. Başlık, birden çok
 * bilgiyi tek satıra sıkıştırır:
 *
 *   "sich setzen"      dönüşlü zamir fiilin parçası ama tek başına "setzen" de doğrudur
 *   "setzen (sich)"    aynı şey, parantezle
 *   "der/die Bekannte" iki artikel, tek kelime
 *   "heraus/raus"      iki ayrı geçerli biçim — birini bilmek yeter
 *   "Zeug"             sözlükte "-zeug" olarak da geçebilir, tire ek işaretidir
 *
 * Öğrenciden bu satırı harfi harfine kopyalamasını beklemek yazımı değil,
 * sözlük biçimini ezberlemeyi ölçer. Burada başlıktan bütün makul yazımlar
 * üretilir; herhangi biri doğru sayılır.
 */
export function acceptedForms(raw: string, lang: TargetLang = currentTargetLang()): string[] {
  const out = new Set<string>();

  const add = (value: string) => {
    const base = normalize(value, lang).replace(/[()]/g, " ").replace(/\s+/g, " ").trim();
    if (!base) return;
    out.add(base);
    /* Artikel isteğe bağlı: "die Bekannte" de "Bekannte" de kabul. Tablo dile
       göre; `der|die|das` sabit yazılıydı ve İngilizce başlıkta "the" hiç
       düşmüyordu (bkz. `ARTICLES`). */
    const noArticle = base.replace(new RegExp(`^(${lang === "en" ? "the|an|a" : "der|die|das"})\\s+`), "");
    out.add(noArticle);
    // Dönüşlü zamir isteğe bağlı ve yeri serbest: sözlükte "setzen (sich)"
    // yazsa da öğrenci "sich setzen" ya da yalnızca "setzen" yazabilmeli.
    const withoutSich = noArticle.replace(/\bsich\b/g, " ").replace(/\s+/g, " ").trim();
    if (withoutSich && withoutSich !== noArticle) {
      out.add(withoutSich);
      out.add(`sich ${withoutSich}`);
    }
  };

  for (const variant of parenVariants(raw)) {
    for (const alt of splitAlternatives(variant)) add(alt);
  }
  return [...out];
}

/**
 * Parantezli kısım hem varken hem yokken geçerlidir.
 * "(Schlag-)Sahne" → "Schlagsahne" ve "Sahne"; "setzen (sich)" → "setzen sich" ve "setzen".
 */
function parenVariants(raw: string): string[] {
  if (!raw.includes("(")) return [raw];
  return [
    raw.replace(/\(([^)]*)\)\s*/g, (_, inner: string) => inner.replace(/-+$/, "")), // birleşik
    raw.replace(/\([^)]*\)/g, " "), // parantezsiz
  ];
}

/** Sözlükteki kısa artikel yazımları. */
const ARTICLE_SHORT: Record<string, string> = { r: "der", e: "die", s: "das" };

/**
 * Eğik çizgiyle ayrılmış başlığı gerçek kelimelere açar.
 *
 * Çizgi iki ayrı iş görüyor ve ikisi farklı davranır:
 *   "heraus/raus"      → iki tam kelime, ikisi de geçerli
 *   "der/die Bekannte" → yalnızca artikel değişiyor, kelime ortak
 *
 * Bileşik tahmini bilerek yapılmaz: "Nord-/Ostsee" yazımından "Nordsee"yi
 * çıkarmak, bileşiğin nerede bölündüğünü bilmeyi gerektirir ve büyük/küçük
 * harften türetilemez. Böyle maddeler veride açık yazılır ("Nordsee/Ostsee");
 * burada tahmin etmek sessiz yanlışlar üretirdi.
 */
function splitAlternatives(raw: string): string[] {
  const parts = raw
    .split("/")
    .map((p) => p.trim().replace(/^-+|-+$/g, "").trim())
    .filter(Boolean);
  if (parts.length <= 1) return [parts[0] ?? ""];

  // Her parça artikel ve gövdesine ayrılır. Artikel parçanın tamamı olabilir
  // ("der/die Bekannte") ya da gövdeyle aynı parçada durabilir ("r/e Erwachsene").
  const parsed = parts.map((p) => {
    const withBody = p.match(/^(der|die|das|[res])\s+(.+)$/i);
    if (withBody) return { article: expandArticle(withBody[1]), body: withBody[2] };
    if (/^(der|die|das|[res])$/i.test(p)) return { article: expandArticle(p), body: null };
    return { article: null, body: p };
  });

  // Yalnız artikelden ibaret parçalar gövdeyi kardeşlerinden alır.
  const shared = [...parsed].reverse().find((x) => x.body)?.body ?? "";

  const out: string[] = [];
  for (const part of parsed) {
    const body = part.body ?? shared;
    if (!body) continue;
    out.push(part.article ? `${part.article} ${body}` : body);
  }
  return out;
}

function expandArticle(a: string): string {
  const key = a.toLowerCase();
  return ARTICLE_SHORT[key] ?? key;
}

/**
 * Kelimenin ekranda görünen ANLAMI — kullanıcının anadilinde.
 *
 * Oyunlar bugüne kadar doğrudan `word.tr` basıyordu; arayüzü İngilizce olan
 * kullanıcı da Türkçe anlam görüyordu. Çözücü ortak (`lib/option-label`), yani
 * şıkların üretildiği sunucu tarafıyla ekranın gösterdiği şey aynı kuraldan
 * geçiyor.
 *
 * TÜRKÇEYE DÜŞMÜYOR: karşılık yoksa boş dönüyor. Sunucu havuzu zaten süzdüğü
 * için buraya karşılıksız kelime gelmemeli; geldiğinde boş bir satır, yanlış
 * dilde bir satırdan iyidir çünkü fark edilir.
 */
export function meaningOf(w: GlossWord, lang: NativeLang): string {
  return glossFor(w, lang)?.text ?? "";
}

/** Aynı kelimenin ikinci satırı (İngilizce ayırt edici) — yoksa null. */
export function meaningSubOf(w: GlossWord, lang: NativeLang): string | null {
  return glossFor(w, lang)?.sub ?? null;
}
