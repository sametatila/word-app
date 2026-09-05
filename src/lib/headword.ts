/**
 * Madde başlığının veritabanına yazılacak temiz hâli.
 *
 * Kaynak listeler PDF'ten çıkarıldığı için başlıklar sözlük işaretleri taşır:
 * çapraz göndermeler ("Abitur (D)→A"), bölge etiketleri ("Matura (A)"), sayı
 * bilgisi ("Ferien (Pl.)") ve satır sonunda kırılmış yarım parantezler
 * ("Eis (D"). Bunlar öğrencinin yazacağı kelimenin parçası değil.
 *
 * Bu fonksiyon tek bir yerde durmalı: tohumlama betikleri ile doğrulama
 * betiği farklı kopyalar kullanırsa doğrulama yalan söyler — kaynağı bir
 * biçimde, veritabanını başka bir biçimde temizleyip "sapma var" der. Bu
 * gerçekten başımıza geldi: üç ayrı kopya vardı ve doğrulayıcı 40 sahte sapma
 * bildirdi.
 */
export function cleanHeadword(de: string): string {
  let s = de.split("→")[0];
  s = s.replace(/\s*\((D|A|CH)(,\s*(D|A|CH))*\)\s*$/g, "");
  s = s.replace(/\s*\((Sg|Pl)\.\)\s*$/gi, "");
  // Kapanmamış parantez: satır sonunda kırılmış bir not, gerisi atılır.
  if ((s.match(/\(/g)?.length ?? 0) > (s.match(/\)/g)?.length ?? 0)) s = s.split("(")[0];
  return s.replace(/\s+/g, " ").replace(/[\s,;/-]+$/, "").trim() || de;
}

/** Almancada çekimde kökten kopabilen ön ekler. */
const SEPARABLE =
  /^(abe|ufe|ine|use|wiiter|zäme|voraa|naa|vor|zue|uus|us|uf|aus|auf|ein|an|ab|mit|frei|über|unter|durch|um|zurück|weg|los|nach|bei|vorbei|zusammen|fest|fort|hin|her|ver|be|ent|er|ge)/;

/**
 * Örnek cümle kelimeyi taşıyor mu?
 *
 * Düz alt dize araması yetmez: ayrılabilen fiiller cümlede parçalanır
 * ("aufwärmen" → "wärme die Suppe auf") ve dönüşlü zamir ayrı durur. Bu yüzden
 * önek soyulup kalan kök aranır; kısa kelimelerde eşik üç harfe iner.
 *
 * Bu kontrol iki ayrı denetleyicide iki kez yanlış yazıldı ve her seferinde
 * doğru maddeleri eledi — bu yüzden tek yerde duruyor.
 */
/**
 * BİLİNEN SINIR (2026-09-05, ölçüldü): kök ünlüsü değişen biçimleri kaçırır.
 * Eşleştirme kökün ilk dört harfine bakıyor, o yüzden şunlar "yok" görünür:
 *
 *   nehmen → genommen · ziehen → gezogen · treffen → getroffen
 *   werfen → geworfen · bleiben → geblieben · gelten → gilt
 *   bewerben → bewirb · absagen → abgesagt (ge- ön ekle kök arasına giriyor)
 *   zuhören → "hör mir kurz zu" (ön ek birkaç kelime uzakta)
 *
 * Düzenli ortaç ve ayrılabilen fiilin bitişik biçimi bulunur
 * (gefahren, angerufen, "stehe … auf"). Bu işlev YALNIZ denetim betiklerinde
 * kullanılıyor (audit-skills, audit-quality), cevap değerlendirmesinde değil —
 * yani kaçırdığı yerde doğru cevap reddedilmez, denetim yanlış alarm verir.
 * Sözlükçe ya da örnek cümle denetlerken bu listeye takılanları ELLE doğrula:
 * bu oturumda 11 madde bu yüzden yanlışlıkla "metinde yok" sayıldı.
 *
 * Gevşetmek (dört harf yerine üç) ters yönde yanlış üretiyor, o yüzden
 * bilerek dokunulmadı; düzeltmesi çekim tablosu ister.
 */
export function sentenceContainsWord(word: string, sentence: string): boolean {
  // Yalnızca kapsama tespitinde umlaut düz sesliye indirilir: Almanca çekim
  // gövde ünlüsünü değiştirir (fahren → fährt, Arzt → Ärztin) ve düz arama
  // bunları kaçırır. Cevap değerlendirmesinde bu yapılmaz — orada "schon" ile
  // "schön" ayrımı korunmalıdır (bkz. foldSpelling).
  const flat = (t: string) =>
    t.toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");
  const w = flat(String(word ?? ""))
    .replace(/^(der|die|das)\s+/, "")
    .replace(/^sich\s+/, "")
    .trim()
    .split(" ")[0];
  if (w.length < 3) return true;
  const hay = flat(String(sentence ?? ""));
  const roots = [w, w.replace(SEPARABLE, "")].filter((r) => r.length >= 3);
  return roots.some((r) => hay.includes(r.slice(0, Math.min(4, r.length))));
}
