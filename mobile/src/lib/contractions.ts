/**
 * İngilizce kısaltmaları AÇARAK karşılaştırma biçimine indirger — web
 * `lib/contractions.ts` ile AYNI kural.
 *
 * NEDEN GEREKLİ. Karşılaştırma katmanı kesme işaretini noktalama sayıp
 * boşluğa çeviriyor: "I'm" → "i m", "I am" → "i am". İkisi de doğru İngilizce
 * ama eşleşmiyorlar — yani öğrenci DOĞRU cevabı verip yanlış cevap almış
 * oluyor. 2026-09-12'de ölçüldü: 3.342 üretim adımının hedefinden üretilen
 * 399 doğal kısaltma/açık biçim varyantının 134'ü reddediliyordu
 * ("I cannot visit the park today." ↔ "I can't visit the park today.",
 * "Where is the equipment kept?" ↔ "Where's …", "I would save money" ↔
 * "I'd save money").
 *
 * NEDEN `accept` LİSTESİ DEĞİL. 134 satırı elle yazmak aynı kusuru bir
 * dahaki ders yazıldığında geri getirirdi; katlama sayı sözcüklerinde
 * (`foldNumbers`) zaten bu yolla çözülmüştü ve aynı gerekçe burada da
 * geçerli: kusur içerikte değil KARŞILAŞTIRMADA.
 *
 * YÖN AÇMAK, KISALTMAK DEĞİL. Açık biçim tek anlamlı: "don't" → "do not".
 * Kısaltmak ("do not" → "don't") aynı sonucu verirdi ama ekrana hiç
 * çıkmayan bir biçimi kanon yapardı; hata ayıklarken açık biçim okunur.
 *
 * İKİ EK BELİRSİZ ve ÇÖZÜMÜ TEK TARAFLI SEÇİM DEĞİL. `'s` hem "is" hem
 * "has", `'d` hem "would" hem "had" olabiliyor; üstelik hangisi olduğu
 * cümleden de çıkmıyor — "It's reported that…" edilgen ("is"), "He's been
 * there" ise bitmiş geçmiş ("has"). Birini seçmek ölçüldü ve YANLIŞ çıktı:
 * ortacı "has" saymak sekiz edilgen hedefi reddediyordu.
 *
 * Bu yüzden belirsizliğin GÖRÜNDÜĞÜ yerde — yardımcı + geçmiş ortaç — üç
 * biçim de aynı belirteçte buluşuyor: "it's reported", "it is reported" ve
 * "it has reported" hepsi `ishas reported` oluyor. Ortaç yoksa belirsizlik
 * de yok ve açılım tek: "he's tired" → "he is tired". Karşılığında kabul
 * edilen tek fazlalık, aynı ortaçla kurulmuş iki görünüşün ("he is
 * finished" / "he has finished") eşdeğer sayılması.
 *
 * İYELİK `'s` de açılıyor ("my brother's car" → "my brother is car") ve bu
 * kasıtlı: dönüşüm iki tarafa da aynı uygulandığı için eşleşme bozulmuyor,
 * kural da tek satır kalıyor. Ekranda gösterilen metin hiç değişmiyor.
 */

/** Geçmiş ortaç olduğu kesin olanlar — `'s`/`'d` ayrımı için. */
const PARTICIPLE = new Set([
  "been", "got", "gotten", "gone", "done", "seen", "had", "made", "taken", "come",
  "given", "found", "told", "written", "said", "left", "put", "read", "heard",
  "spoken", "broken", "forgotten", "lost", "won", "bought", "brought", "sent",
  "paid", "met", "kept", "begun", "eaten", "drunk", "driven", "flown", "known",
  "finished", "started", "worked", "lived", "changed", "moved", "arrived", "decided",
]);

const PART = `(?:\\w+ed|${[...PARTICIPLE].join("|")})`;

/** Karşılaştırma için açılmış biçim; İngilizce dışında metin aynen döner. */
export function foldContractions(text: string, lang: string = "de"): string {
  if (lang !== "en") return text;
  return text
    .replace(/[’´`]/g, "'")
    .replace(/\bwon't\b/gi, "will not")
    .replace(/\bshan't\b/gi, "shall not")
    .replace(/\bcan't\b/gi, "can not")
    .replace(/\bcannot\b/gi, "can not")
    .replace(/\blet's\b/gi, "let us")
    /*
      KONUŞMA İNDİRGEMELERİ. Tanıyıcı bunları DUYDUĞU gibi yazıyor ("I'm
      gonna call"), içerik ise tam biçimi taşıyor ("I'm going to call") —
      yani seçim öğrencinin değil tanıyıcının. Ölçüldü: 26 hedef yalnız bu
      yüzden reddediliyordu (18 "gonna", 8 "wanna").
    */
    .replace(/\bgonna\b/gi, "going to")
    .replace(/\bwanna\b/gi, "want to")
    .replace(/\bgotta\b/gi, "got to")
    .replace(/\bkinda\b/gi, "kind of")
    .replace(/\bgimme\b/gi, "give me")
    .replace(/\blemme\b/gi, "let me")
    .replace(/\bdunno\b/gi, "do not know")
    .replace(/\boutta\b/gi, "out of")
    .replace(/\b(?:'cause|cuz)\b/gi, "because")
    // Kesme işareti düşmüş biçim: noktalama temizliği "o'clock"u zaten
    // "o clock" yapıyor, kesmesiz yazan da aynı yere insin.
    .replace(/\bo'?clock\b/gi, "o clock")
    .replace(/\b(\w+)n't\b/gi, "$1 not")
    .replace(/\b(\w+)'m\b/gi, "$1 am")
    .replace(/\b(\w+)'re\b/gi, "$1 are")
    .replace(/\b(\w+)'ve\b/gi, "$1 have")
    .replace(/\b(\w+)'ll\b/gi, "$1 will")
    // Belirsiz ekler: ortaç varsa ortak belirteç, yoksa tek açılım.
    .replace(new RegExp(`\\b(\\w+)'d\\s+(${PART})\\b`, "gi"), "$1 hadwould $2")
    .replace(new RegExp(`\\b(\\w+)'s\\s+(${PART})\\b`, "gi"), "$1 ishas $2")
    .replace(/\b(\w+)'d\b/gi, "$1 would")
    .replace(/\b(\w+)'s\b/gi, "$1 is")
    // Açık yazılmış biçimler de aynı belirtece iniyor.
    .replace(new RegExp(`\\b(?:is|has)\\s+(${PART})\\b`, "gi"), "ishas $1")
    .replace(new RegExp(`\\b(?:had|would)\\s+(${PART})\\b`, "gi"), "hadwould $1")
    .replace(/\s+/g, " ");
}
