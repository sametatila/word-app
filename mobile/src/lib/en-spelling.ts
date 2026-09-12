/**
 * İngiliz/Amerikan yazım farkını karşılaştırma için eşitler — web
 * `lib/en-spelling.ts` ile AYNI liste.
 *
 * NEDEN GEREKLİ VE NEDEN ÖĞRENCİNİN SUÇU DEĞİL. İngilizce kursun tanıma
 * yereli `en-US` (`courses.ts` `speechLocale`), içerik ise İngiliz yazımıyla
 * yazılmış. Öğrenci "neighbour" dediğinde tanıyıcı "neighbor" yazıyor ve
 * cevap tutmuyor — seçim öğrencinin değil TANIYICININ. Yazarak cevap
 * verende de aynısı: Amerikan yazımını öğrenmiş biri "color" yazıyor.
 *
 * ÖLÇÜLDÜ (2026-09-12): ders hedeflerinde ve kabul listelerinde 83 İngiliz
 * yazımı geçiyor; bunların 59'u yazım farkı olan kelimeler (neighbour 27,
 * programme 6, colour 4, apologise 4, practise 4, cheque 2, licence 2,
 * memorise 2, centre 2, realise 2, grey/favourite/organise/cancelled 4).
 * Kalanı yazım değil SÖZCÜK tercihi (rubbish, mum, queue) — tanıyıcı onları
 * zaten aynen yazıyor, bu yüzden listede yoklar.
 *
 * YÖN AMERİKAN, çünkü tanıyıcının yereli o. İki tarafa da uygulandığı için
 * yön aslında keyfî; okunurluk için tanıyıcının yazdığı biçim seçildi.
 *
 * LİSTE, KURAL DEĞİL. "-ise → -ize" gibi bir kural "advise"ı da bozardı;
 * kelime listesi gözle denetlenebilir ve yanlış eşleme üretmez.
 */

/** İngiliz → Amerikan; karşılaştırma her iki tarafa da uyguluyor. */
const PAIRS: [string, string][] = [
  ["colour", "color"], ["colours", "colors"], ["coloured", "colored"], ["colourful", "colorful"],
  ["favourite", "favorite"], ["favourites", "favorites"],
  ["neighbour", "neighbor"], ["neighbours", "neighbors"], ["neighbourhood", "neighborhood"],
  ["behaviour", "behavior"], ["labour", "labor"], ["humour", "humor"], ["flavour", "flavor"],
  ["harbour", "harbor"], ["honour", "honor"],
  ["realise", "realize"], ["realised", "realized"], ["realises", "realizes"],
  ["organise", "organize"], ["organised", "organized"], ["organises", "organizes"],
  ["organisation", "organization"], ["organisations", "organizations"],
  ["apologise", "apologize"], ["apologised", "apologized"],
  ["recognise", "recognize"], ["recognised", "recognized"],
  ["specialise", "specialize"], ["specialised", "specialized"],
  ["memorise", "memorize"], ["memorised", "memorized"],
  ["summarise", "summarize"], ["emphasise", "emphasize"], ["criticise", "criticize"],
  ["centre", "center"], ["centres", "centers"], ["metre", "meter"], ["metres", "meters"],
  ["litre", "liter"], ["litres", "liters"], ["theatre", "theater"], ["theatres", "theaters"],
  ["travelling", "traveling"], ["travelled", "traveled"], ["traveller", "traveler"],
  ["cancelled", "canceled"], ["cancelling", "canceling"],
  ["modelled", "modeled"], ["labelled", "labeled"],
  ["jewellery", "jewelry"], ["programme", "program"], ["programmes", "programs"],
  ["cheque", "check"], ["cheques", "checks"], ["licence", "license"], ["licences", "licenses"],
  ["practise", "practice"], ["practised", "practiced"], ["practises", "practices"],
  ["defence", "defense"], ["offence", "offense"], ["grey", "gray"],
  ["tyre", "tire"], ["tyres", "tires"], ["pyjamas", "pajamas"], ["aeroplane", "airplane"],
  ["catalogue", "catalog"], ["analogue", "analog"], ["storey", "story"], ["speciality", "specialty"],
];

const RE = new RegExp(`\\b(${PAIRS.map(([uk]) => uk).join("|")})\\b`, "gi");
const MAP = new Map(PAIRS);

/** Karşılaştırma biçimi; İngilizce dışında metin aynen döner. */
export function foldEnglishSpelling(text: string, lang: string = "de"): string {
  if (lang !== "en") return text;
  return text.replace(RE, (m) => MAP.get(m.toLowerCase()) ?? m);
}
