/**
 * Üretim ipucunun KONUSUNU tanıyan sözcükler (QA F-0020) — `sentence-match`
 * `hintFocus` bunlarla ipucunun sıra mı biçim mi anlattığını ölçüyor.
 *
 * Ayrı dosya, çünkü içerik VERİSİ: anlatım dillerinde (Türkçe, İngilizce,
 * Almanca) konum ve biçim sözcükleri. Ekrana basılmıyor, çevrilmez; ham metin
 * tarayıcılarının (web `i18n-hardcoded`, mobil `i18n-scan`) SKIP listesinde.
 * Web `src/lib/hint-cues.ts` ile mobil `mobile/src/lib/hintCues.ts` birebir
 * aynı; kapısı `check:parity` "ipucu konu sozcukleri".
 *
 * İpucu metinleri `lib/conversations/content` (Türkçe) ve anadil sözlüklerinde
 * (`generated/native-*.json`). Liste değişince bütün ipuçlarında ölçmek için:
 * sıra/karma/biçim dağılımı ve Türkçe ile çevirisi arasındaki uyum.
 */
const L = "(?<!\\p{L})";
const R = "(?!\\p{L})";
export const ORDER_CUES = new RegExp(
  [
    // Türkçe
    `${L}başta${R}`, `${L}başa${R}`, `başında${R}`, `ile başla`, `${L}başlar${R}`, `${L}sonda${R}`, `${L}sona${R}`, `en son${R}`,
    `en sonunda`, `sonuna (gider|gelir|geçer|düşer|kalır|atılır)`, `cümlenin sonun`, `(ilk|ikinci|üçüncü|son) sıra(?! sayı)`,
    `${L}sıra(da|sı|yla)?${R}(?! sayı)`, `${L}ortada${R}`, `araya gir`, `arasına gir`, `hemen (sonra|önce|arkası)`, `önce gel`,
    `${L}önce${R}[^.;:]*${L}sonra${R}`, `arkaya`, `arkasına`, `arkasında`, `önüne`, `önünde`, `devrik`, `virgülden (sonra|önce)`,
    `ayrılabilen`, `${L}öne${R}`,
    // English
    `${L}first${R}(?! (name|auxiliary|verb|person|word|part|one|time))`,
    `${L}last${R}(?! (word|verb|vowel|letter|sound|syllable|part|one|name|time|week|year))`,
    `at the (start|beginning|end|front)`, `to the front`, `(goes?|moves?|go) (right )?to the end`, `word order`,
    `(stands?|stays?|moves? to|keep the verb|verb) second`, `in the middle`, `in between`, `right (after|before)`, `falls? (back|behind)`,
    `(second|first|last) (place|position)`, `${L}position${R}`, `starts? with`, `begins? with`, `after the comma`,
    `(before|after) the (verb|subject|noun|object|comma)`, `inver(ted|sion)`, `separable`, `in front of`, `comes? (first|last|after|before)`,
    `goes? (after|before|last|first)`, `${L}then${R}`,
    // Deutsch
    `am (Anfang|Ende|Satzende|Satzanfang)`, `ans (Ende|Satzende)`, `an den (Anfang|Satzanfang)`, `${L}zuerst${R}`, `als erstes`,
    `an (erster|zweiter|dritter|letzter) Stelle`, `${L}Position`, `Satzstellung`, `Wortstellung`, `Reihenfolge`, `beginnt mit`,
    `beginne mit`, `vorangestellt`, `nach dem Komma`, `(vor|nach) dem (Verb|Subjekt|Komma|Objekt)`, `${L}hinter${R}`, `Inversion`,
    `trennbar`, `steht (vorne|hinten)`, `${L}dann${R}`,
  ].join("|"),
  "iu",
);
export const FORM_CUES = new RegExp(
  [
    // Türkçe
    `dişil`, `${L}eril`, `nötr`, `çoğul`, `tekil`, `${L}h[âa]l(i|e|de|inde|ini|iyle)?${R}`, `çekil`, `çekim`, `biçim`, `harf al`,
    `${L}ek(i|ini|ler|leri)?${R}`, `${L}uzar${R}`, `kısa h[âa]l`, `uyum`, `uyar`, `-ing`, `-ed${R}`, `geçmiş`, `ortaç`, `iyelik`,
    `artikel`, `tanımlık`, `yönelme`, `belirtme`, `tamlayan`, `zamir`, `edilgen`, `${L}kip`, `olumsuz`, `değiş`, `büyük harf`,
    // English
    `feminine`, `masculine`, `neuter`, `plural`, `singular`, `${L}case${R}`, `dative`, `accusative`, `genitive`, `nominative`, `ending`,
    `conjugat`, `inflect`, `participle`, `possessive`, `article`, `${L}agree`, `past simple`, `simple past`, `past tense`,
    `present perfect`, `subjunctive`, `passive`, `pronoun`, `negat`, `irregular`, `${L}tense${R}`, `${L}chang`, `capital`,
    // Deutsch
    `feminin`, `maskulin`, `${L}neutr`, `Dativ`, `Akkusativ`, `Genitiv`, `Nominativ`, `Endung`, `konjugi`, `Konjugation`, `Partizip`,
    `Possessiv`, `Artikel`, `Pronomen`, `Passiv`, `Konjunktiv`, `Zeitform`, `unregelmäßig`, `Verneinung`, `${L}Fall${R}`, `Kasus`,
    `Präteritum`, `${L}Perfekt`, `Singular`, `ändert`, `großgeschrieben`,
  ].join("|"),
  "iu",
);
