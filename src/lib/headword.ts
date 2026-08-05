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
