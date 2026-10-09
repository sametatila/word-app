import { LEVEL_ORDER, conversationsForLevel } from "./index";
import { MODULE_SIZE, moduleTheme } from "./modules";
import { DEFAULT_NATIVE, type NativeLang } from "@/lib/courses";
import { foldSentence } from "@/lib/sentence-match";
import type { Conversation, Segment } from "./types";

/**
 * Modülün kendi içeriği — sınav maddelerinin ham maddesi.
 *
 * Modül sınavı uzun süre modülle yalnızca KELİME düzeyinde ilgiliydi: sorular
 * `words` tablosundan kuruluyor, modül yalnızca hangi kelimelerin
 * seçileceğini söylüyordu. Oysa konuşmalar kelime öğretmiyor — kalıp öğretiyor,
 * cümle kurdurüyor, hüküm verdiriyor, konuşturuyor. Modülü bitiren birinin
 * "şunları öğrendim" diyebileceği şey `Ich hätte gern einen Kaffee.`
 * cümlesini kurabilmesi; "der Kaffee" kelimesini tanıması değil.
 *
 * Bu modül konuşmanın ürettiği dört tür ham maddeyi bir araya getiriyor:
 *
 *   - **üretim** (`produce`) — Türkçe cümle → Almanca kuruluş. Konuşmanın
 *     puanlanan adımı zaten bu; sınavın omurgası da bu olmalı.
 *   - **hüküm** (`truefalse`) — bozuk bir Almanca cümle ve gerekçesi. Hazır
 *     yazılmış hata teşhisi: modülün tam olarak hangi yanlışı hedeflediğini
 *     içerikten daha iyi hiçbir kural söyleyemez.
 *   - **kalıp** (`patterns`) — modülün işlevsel dili ("bir şey isterken…").
 *   - **kelime** (`vocab`) — konuşma sırasıyla, artikelsiz köküyle.
 *
 * Hepsi SAF: veritabanı yok, `server-only` yok. Doğrulayıcı betiği
 * (`scripts/check-exams.ts`) ve sınav kurucusu aynı işlevleri çağırıyor.
 */

/** Konuşma başlığından artikeli ayırır: konuşma "der Name" yazar, tablo "Name" tutar. */
export function headword(de: string): string {
  return de.replace(/^(der|die|das)\s+/i, "").trim().toLocaleLowerCase("de-DE");
}

/**
 * Aynı yazılışlı maddelerden modülün ÖĞRETTİĞİ anlam.
 *
 * Havuz başlıkla eşleştiriliyor; "als" (-den daha / -dığında), "sein" (olmak /
 * onun), "zu" (fazla / -e) gibi başlıkta iki madde var ve modül bunlardan
 * yalnız birini öğretiyor. İkisi de sınava girseydi öğrenci öğretilmemiş bir
 * anlamdan sorumlu tutulurdu. Konuşmanın Türkçesine uyan madde kalıyor; hiçbiri
 * uymuyorsa (konuşma başka sözcükle çevirmiş) ikisi de kalıyor — tahmin yok.
 */
export function taughtSense<T extends { de: string; tr: string }>(rows: T[], items: WordItem[]): T[] {
  const low = (s: string) => s.trim().toLocaleLowerCase("de-DE");
  const trs = new Map<string, Set<string>>();
  for (const w of items) (trs.get(w.head) ?? trs.set(w.head, new Set()).get(w.head)!).add(low(w.tr));
  return rows.filter((r) => {
    const same = rows.filter((x) => low(x.de) === low(r.de));
    if (same.length < 2) return true;
    const taught = trs.get(low(r.de));
    const match = taught ? same.filter((x) => taught.has(low(x.tr))) : [];
    return match.length ? match.includes(r) : true;
  });
}

/**
 * Üretim adımının Türkçe yönergesinden sınav sorusu.
 *
 * Konuşma yönergesi sesli anlatım için yazılmış ve bir öğretmen ağzı taşıyor:
 * "Sıra sende: 'Bir kedim var.' nasıl söylersin?". Sınavda öğretmen yok, kâğıt
 * var; bu yüzden yalnızca **çerçeve** cümleleri atılıyor ve geriye çevrilecek
 * cümle ile onu tek anlama sabitleyen ek bağlam kalıyor ("Burada 'o' bir
 * erkek komşu." gibi). Ek bağlam bilerek KALIYOR: onsuz madde ihm/ihr
 * arasında karar veremez hâle gelir, yani ipucu değil sorunun parçasıdır.
 *
 * Liste kapalı ve elle yazılı: kalıba uymayan yönerge kırpılmadan geçer.
 * Yanlış kırpmak, kırpmamaktan pahalı — cümlenin yarısını yutan bir düzenli
 * ifade soruyu cevaplanamaz hâle getirir.
 *
 * NOKTALI ÇERÇEVE DE ÇERÇEVE (2026-10-09). Liste yalnız iki noktalı biçimi
 * tanıyordu ("Sıra sende:"); konuşmalar aynı sözü çoğu kez ayrı bir cümle
 * olarak yazıyor ("Şimdi sıra sende. Şunu İngilizce kur: …") ve sınav kâğıdı
 * "Şimdi sıra sende." diye başlıyordu. Ölçüldü (bütün kurslar, üç anadil, 6684
 * madde): Türkçede 65, Almanca yönergede 76 "Jetzt bist du dran.", İngilizcede
 * ~900 "Last:/One more:/Now:" — sonuncular Türkçede zaten kırpılan
 * "Son:/Bir tane daha:" satırlarının çevirisi, yani aynı madde anadile göre
 * farklı görünüyordu. Kırpma artık TEKRARLI: "Şimdi sıra sende. Deneyelim: …"
 * gibi üst üste iki çerçeve de düşer. Çerçeveden sonra kalan gerçek yönerge
 * ("Şunu İngilizce kur:", "Bilde auf Englisch:") KALIR — ipucu değil, görev.
 * Kırpınca geriye bir şey kalmıyorsa kırpılmaz. Kapı: `scripts/check-exams.ts`.
 */
const LEAD_INS = [
  "Şimdi sıra sende:",
  "Şimdi sıra sende.",
  "Sıra sende:",
  "Sıra sende.",
  "Sıra sende,",
  "Sırada sen varsın.",
  "Deneme sırası sende:",
  "Şimdi sen söyle:",
  "Şimdi sen sor:",
  "Şimdi sen anlat:",
  "Şimdi sen tarif et:",
  "Şimdi sen kur:",
  "Şimdi sen:",
  "Şimdi sen",
  "Şimdi küçük bir alıştırma.",
  "Şimdi:",
  "Deneyelim.",
  "Deneyelim:",
  "Deneme zamanı.",
  "Küçük bir alıştırma.",
  "Küçük bir deneme.",
  "Son alıştırma.",
  "Son alıştırma:",
  "Son bir alıştırma.",
  "Son bir alıştırma:",
  "Son üretim alıştırması.",
  "Son üretim.",
  "Son üretim:",
  "Son bir üretim.",
  "Son bir soru:",
  "Bir üretim daha:",
  "Bir tane daha:",
  "Bir tane daha.",
  "Son bir tane:",
  "Son bir tane.",
  "Son:",
  "Peki",
  /* ÇEVRİLMİŞ YÖNERGELER. Anadili İngilizce/Almanca olan öğrencinin kâğıdı
     çevrilmiş konuşmadan kuruluyor (`moduleProduce`); çerçeve orada da var.
     Sıklığa göre ölçüldü (`data/conversations/lecture/out`, `prose-de/out`),
     uzun olan önce. */
  "Now it is your turn:",
  "Now it's your turn.",
  "Now your turn:",
  "Now your turn,",
  "Now your turn.",
  "Now you say it:",
  "Now you say:",
  "Now you ask:",
  "Now you:",
  "Now:",
  "Your turn:",
  "Your turn.",
  "Your turn,",
  "Let us try:",
  "Let's try.",
  "A little exercise.",
  "One last exercise.",
  "Last exercise.",
  "One last question:",
  "One last one:",
  "Last one:",
  "Last:",
  "One more:",
  "Jetzt bist du dran:",
  "Jetzt bist du dran.",
  "Jetzt bist du dran,",
  "Jetzt bildest du:",
  "Jetzt fragst du:",
  "Jetzt sag du:",
  "Jetzt du:",
  "Jetzt du.",
  "Jetzt eine kleine Übung.",
  "Du bist dran:",
  "Du bist dran.",
  "Probieren wir es.",
  "Probieren wir es:",
  "Probieren wir:",
  "Zeit zum Üben.",
  "Eine kleine Übung.",
  "Ein kleiner Versuch.",
  "Letzte Produktionsübung.",
  "Eine letzte Übung.",
  "Eine letzte Übung:",
  "Letzte Übung.",
  "Letzte Übung:",
  "Noch eins:",
  "Noch einer:",
  "Noch einer.",
  /* Sıra cümlesi düşünce başa gelen ipucu etiketi ("Son bir cümle kuralım.
     İpucu: Kartımı çoktan yükledim."); eskiden `HINT_CLAUSES` görevi de
     yutuyor ve kâğıtta yalnız "Son bir cümle kuralım." kalıyordu. */
  "İpucu:",
  "Tipp:",
  "Hint:",
];

/** Yönergenin sonuna eklenmiş konuşma ipuçları — sınavda kırpılır. */
const HINT_CLAUSES = ["Küçük bir ipucu:", "Küçük bir bilgi:", "İpucu:", "Unutma:", "Hatırlatma:"];

/* Sonda kalan soru çerçevesi. Çevrilmiş yönergelerde tire ya da virgülle
   bağlı biçimi var ("'…' — what do you say?", "…, wie sagst du das?"); tek
   başına "What do you say?" bilerek yok: ondan önce bir sahne olabilir ve
   sahne tek başına görev söylemez. */
const TAIL_OUTS = [
  "nasıl dersin?",
  "nasıl söylersin?",
  "nasıl sorulur?",
  "nasıl sorarsın?",
  "demek için ne dersin?",
  "demek için hangi cümleyi kullanırsın?",
  "demek için hangi Almanca cümleyi kullanırsın?",
  "Lütfen söyle.",
  "Lütfen söyleyin.",
  "Lütfen deyin.",
  "— what do you say?",
  "— how do you say it?",
  ", wie sagst du das auf Englisch?",
  ", wie sagst du das?",
];

/* Kuyruk soru çerçevesi kırpılınca önünde asılı kalan dil zarfı:
   "Bunu İngilizce nasıl söylersin?" → "Bunu İngilizce". Yalnız kuyruk
   kırpıldıysa ve yalnız bu sözcükler. */
const DANGLING_LANG = /(?:[\s,]+(?:bunu|Bunu))?(?:[\s,]+(?:İngilizcede|Almancada|İngilizce|Almanca))?\s*$/u;
const DANGLING_BUNU = /[\s,]+(?:bunu|Bunu)\s*$/u;

/* Ortada kalan sıra çerçevesi: yönerge önce bir açıklama cümlesi verip sonra
   "Sıra sende:" diyor ("Ülke yerine şehir de söyleyebilirsin. Sıra sende: …").
   Yalnız cümle sınırından sonra ve yalnız bu sözler; çevresi kalır. */
const MID_TURN = /(?<=[.!?]\s)(?:Şimdi sıra sende|Sıra sende|Jetzt bist du dran|Du bist dran|Now it is your turn|Now it's your turn|Now your turn|Your turn)[.:,]\s*/gu;

/*
  ANLATIMIN SIRA CÜMLESİ VE ÖNCEKİ ADIMA YASLANAN AÇIKLAMA (QA F-0057 ikinci
  tur, 2026-10-09).

  Konuşmada üretim adımı çoğu kez bir açıklamayla başlıyor ve görevi ancak
  sonra veriyor: "Arkasına aradığın yeri eklersin. Şimdi sen söyle: 'Garı
  arıyorum.'" — "Arkasına" bir önceki adımın kalıbını gösteriyor; sınavda
  maddeler karışık geldiği için orada hiçbir şeyi göstermiyor. Ölçüldü
  (iki kurs × üç anadil, kâğıda girebilecek 6642 madde): ~600 madde birden
  çok cümleli, bunların büyük kısmı İngilizce kursta "Kur.", "Son bir cümle
  kuralım.", "Şimdi olumsuzunu sen kur.", "Bilden wir einen letzten Satz."
  gibi YALNIZ SIRA VEREN bir cümleyle başlıyor. Kurallar (`dropLecture`):

  1. SIRA İŞARETİ ortadaysa ("… Şimdi sen söyle: …", "… Şunu kur: …",
     "… Bilde jetzt du: …") önündeki her şey düşer: işaret, anlatımın bittiği
     ve görevin başladığı yer. İşaret, yalnız `FRAME_WORDS` sözcüklerinden
     oluşup iki noktayla biten cümle başı; ardından harf gelmeli.
  2. Baştaki SIRA CÜMLESİ düşer: tırnaksız, iki noktasız ve bütün sözcükleri
     `FRAME_WORDS` içinde olan cümle ("Kur.", "Şimdi aynı cümlenin tersini
     sen kur.", "Jetzt bildest du den Satz."). İçerik taşıyan bir sözcük
     ("Şimdi aynı soruyu ekmek için sen sor.") cümleyi korur — yanlış
     kırpmak, kırpmamaktan pahalı.
  3. Görev cümlesi TIRNAKLA ya da "nasıl dersin" sorusuyla geliyorsa
     ("Karşındaki öksürüyor. 'Bu öksürük ne zamandır var?' diye nasıl
     sorarsın?", "Your number is thirty-two fifty. How do you say 'My number
     is thirty-two fifty.'?") önündeki tırnaksız açıklama düşer: kurulacak
     cümle tırnağın içinde tam olarak yazılı. Önünde tırnak varsa (örnek
     cümle, "'o' bir kadın" gibi bağlam) dokunulmaz.
  4. ÖNCEKİ ADIMA YASLANAN SÖZ (`BACKREF`: "Şimdi tersini söyle:", "Bir
     önceki konuşmadaki kalıpla …:", "Frag mit derselben Wendung:") görevi
     açan iki noktalı girişteyse giriş, baş cümledeyse cümle, cümlenin
     içindeyse ("… cümlesini bu kalıpla kur.") yalnız o söz düşer. Düşen
     cümle Türkçe "o"nun cinsiyetini taşıyorsa not olarak sona eklenir.
  5. Sondaki gönderme ipucu ("İlk kelimemizi present perfect ile kullan.") düşer.

  Sonuç (2026-10-09): 371 madde değişti, hepsi gözle okundu; örnek cümlesi
  kırpılınca 4 madde ilk kez kâğıda girebiliyor (cevap artık soruda yazılı değil).

  Kapı: `scripts/check-exams.ts` (sabit örnekler + bütün kâğıtta önceki adıma
  yaslanan söz taraması, `leansOnLecture`).
*/
const FRAME_WORDS = new Set(
  (
    /* Türkçe */
    "şimdi hadi haydi son olarak bir de da sen sende sıra kendin yine tekrar kez daha cümle cümleyi cümleni cümlenin " +
    "tane tanesini soru kur kuralım kuracaksın kurmanı kurmayı istiyorum dene deneyelim sor bakalım söyle söylemeni " +
    "iste cevap cevabı ver birleştir birleştirelim birleştiriyoruz ikisini iki yeni görev senden en önemli bu bunu " +
    "şunu ilk tam cümleyle olumsuzunu tersini aynı resmî hâlini kibar isteği aynen öyle hangisi bilgiyi hepsini " +
    "ingilizce almanca " +
    /* Deutsch */
    "jetzt los und bilde bilden bildest wir du den die das einen eine ein letzten letzter letzte satz frage noch " +
    "selbst mal auch probier probierst probieren es frag fragst bittest antwortest verbinde verbinden beide zwei sag " +
    "sagst erzähl in einem baust setzen alles zusammen wichtigsten neue aufgabe genau bist dran wieder ich möchte von " +
    "dir ganzen verneinung gegenteil umgekehrten förmliche höfliche form deinen ersten englisch auf " +
    /* English */
    "now you build ask try say one more sentence which last the other person a it your turn let's us english german"
  ).split(" "),
);
/** Tırnak işareti — sözcük içi kesme ("let's", "Holly'nin") sayılmaz. */
const QUOTE_CHAR = /(?<!\p{L})['‘’]|['‘’](?!\p{L})|["“”„«»‚]/u;
const frameOnly = (s: string): boolean => {
  const words = s
    .replace(/[.!?…,:;–—-]+/g, " ")
    .trim()
    .toLocaleLowerCase("tr-TR")
    .split(/\s+/)
    .filter(Boolean);
  // "tr-TR" küçültmesi "I"yı "ı" yapar: İngilizce/Almanca sözcük için ikinci deneme.
  return words.length > 0 && words.every((w) => FRAME_WORDS.has(w) || FRAME_WORDS.has(w.replace(/ı/g, "i")));
};

/**
 * ÖNCEKİ ADIMA YASLANAN SÖZ — yönergenin kendisinde (tırnak dışında). Yalnız
 * sıra veren bir yönerge ("Son bir cümle kuralım.") de görevsiz sayılır.
 *
 * "Şimdi tersini söyle", "Bir önceki konuşmadaki kalıpla", "Frag mit derselben
 * Wendung", "Nimm unser erstes Wort": konuşmada bir önceki adımı gösteriyor,
 * sınavda hiçbir şeyi. Yalnız yönerge kalıpları; içerik cümlesindeki "aynı
 * şey", "dieselbe Angst", "wieder" bilerek yok (kurulacak cümlenin parçası).
 * Kırpma (`dropLecture` kural 4–5) ve kapı (`scripts/check-exams.ts`) aynı listeyi kullanıyor.
 */
const BACKREF =
  /(?<!\p{L})(?:[Aa]ynı mantıkla|mit dieser Wendung|[Aa]ynı (?:soruyu|cümleyi|cümlenin|kalı[bp]\p{L}*|kural\p{L}*|yapı\p{L}*|isteği)|[Tt]ersini|[Oo]lumsuzunu|ikisini|ilk cümleni|\p{L}*kelimemiz\p{L}*|\p{L}*kalıbımız\p{L}*|Arkasına|önceki konuşma\p{L}*|Aynen öyle|kalıbı hatırla|bu kalıpla|bu kuralı|the same (?:question|sentence|pattern|rule|structure)|the last conversation|the opposite|our (?:first|second|third|fourth|new) (?:word|pattern)|dieselbe (?:Frage|Wendung|Regel|Struktur)|denselben Satz|derselben (?:Wendung|Logik|Regel|Form|Struktur)|die Verneinung|den umgekehrten Satz|unser(?:em)? (?:erstes|zweites|drittes|viertes|neues) Wort|Verbinden wir (?:jetzt )?beide|Verbinde (?:jetzt )?beide)(?!\p{L})/u;
/** Cümle içinde kalan, düşünce cümleyi bozmayan gönderme sözleri (kural 4c). */
const INLINE_BACKREF =
  /^[Aa]ynı mantıkla\s+|\s(?:bu|aynı) kalıpla(?=\s)|\s(?:nach|mit) derselben (?:Logik|Wendung)(?=[\s?.!,])|\smit dieser Wendung(?=[.!?])/gu;
/** Tırnak içi (kurulacak ya da örnek cümle) — önceki adıma yaslanma orada sayılmaz. */
const QUOTED_SPAN = /["“„«‚][^"“”„«»‚‘]*["”“»‘]|(?<!\p{L})'[^']*'(?!\p{L})/gu;
const backRef = (s: string) => BACKREF.test(s.replace(QUOTED_SPAN, " "));
export function leansOnLecture(prompt: string): boolean {
  return backRef(prompt) || frameOnly(prompt);
}

/** Metnin ilk cümlesi; ilk cümlede tırnak varsa yalnız eşli „…“/"…" ise bölünür. */
function firstSentence(text: string): { head: string; rest: string } | null {
  const m = /^(.+?[.!?…])\s+(?=\S)/u.exec(text);
  if (!m) return null;
  const head = m[1];
  if (QUOTE_CHAR.test(head.replace(QUOTED_SPAN, " "))) return null;
  return { head, rest: text.slice(m[0].length) };
}
/** Görev cümlesinin başladığı yer: tırnakla ya da "nasıl dersin" sorusuyla açılan cümle (kural 3). */
const QUOTED_TASK =
  /^(?:['"“„‘‚«]|(?:How do you say|How would you say|What do you say for|What sentence do you use|Wie sagst du|Wie heißt|Wie fragst du|Wie bittest du)\s+['"“„‘‚«])/u;
/** Düşen cümlede kalan cinsiyet bilgisi (Türkçe "o" ikisini de karşılıyor). */
const GENDER_NOTES: [RegExp, string][] = [
  [/(?<!\p{L})erkek(?:ler)? için(?!\p{L})/u, "Bir erkekten bahsediyorsun."],
  [/(?<!\p{L})kadın(?:lar)? için(?!\p{L})/u, "Bir kadından bahsediyorsun."],
];
/** En az iki sözcüklük bir görev kalıyor mu — kırpma bunu hiç bozmaz. */
const enough = (s: string) => /\p{L}{2,}.*\s\S/u.test(s);

function dropLecture(text: string): string {
  // 1. Ortadaki sıra işareti: SONUNCUSU, önündekiyle birlikte. Cümle sınırı
  //    kapanan tırnaktan sonra da olabilir ("… aydınlık." Şimdi sen kur: …").
  let cut = -1;
  for (const m of text.matchAll(/(?<=[.!?…]['"”“’»]?\s)[^.!?…:'"“”„‘’«»]{1,60}:\s*(?=\S)/gu))
    if (frameOnly(m[0]) && /\p{L}/u.test(text.slice(m.index! + m[0].length))) cut = m.index!;
  if (cut > 0) text = text.slice(cut);
  // 4a. Önceki adıma yaslanan GİRİŞ iki noktayla bitiyorsa ("Şimdi tersini
  //     söyle: 'Bu uygun fiyatlı.'", "Frag mit derselben Wendung: Haben Sie …")
  //     iki noktadan sonrası görevin kendisi.
  //     Yalnız iki noktayı açan cümle ölçülür; daha öndeki sıra cümlesi
  //     ("Şimdi ikisini birleştir. Arkadaşın … Ona şunu söyle: …") kural 2'nin işi.
  const colon = text.lastIndexOf(":");
  const clause = text.slice(0, Math.max(colon, 0)).split(/(?<=[.!?…])\s+/u).pop() ?? "";
  if (colon > 0 && backRef(clause) && !QUOTE_CHAR.test(clause) && enough(text.slice(colon + 1)))
    text = text.slice(colon + 1).trim();
  // 4c. Cümlenin içindeki gönderme sözü: "'Dişim ağrıyor' cümlesini bu kalıpla kur."
  text = text.replace(INLINE_BACKREF, "").trim();
  const notes: string[] = [];
  // 2–3–4b. Baştaki sıra cümlesi, tırnaklı görevin önündeki açıklama ve
  //     önceki adıma yaslanan baş cümle ("Şimdi aynı soruyu ekmek için sen sor. Ekmek var mı?").
  for (let round = 0; round < 4; round++) {
    const s = firstSentence(text);
    if (!s || !enough(s.rest)) break;
    if (/:/.test(s.head)) break;
    const quoteless = !QUOTE_CHAR.test(s.head);
    // Gönderme cümlesindeki tırnak yalnız tek sözcük olabilir ("Bilde dieselbe
    // Struktur mit „send“."); tırnakta bir cümle varsa görev o cümlenin içinde.
    const quotedWord = (s.head.match(QUOTED_SPAN) ?? []).every((q) => !/\s/.test(q.trim()));
    if ((quoteless && frameOnly(s.head)) || (QUOTED_TASK.test(s.rest) && quoteless) || (quotedWord && backRef(s.head))) {
      // Düşen cümle Türkçe "o"nun cinsiyetini taşıyorsa ("Aynı kuralı erkek
      // için deneyelim. O bu uygulamayı kullanıyor") bilgi görevin yanına geçer.
      for (const [re, note] of GENDER_NOTES) if (re.test(s.head) && !re.test(s.rest)) notes.push(note);
      text = s.rest;
    } else break;
  }
  // 5. Sonda önceki adıma yaslanan ipucu ("İlk kelimemizi present perfect ile kullan.").
  for (let round = 0; round < 2; round++) {
    const m = /^(.*[.!?…]['"”“’»]?)\s+([^'"“”„‘’«»]+)$/u.exec(text);
    if (!m || !backRef(m[2]) || !enough(m[1])) break;
    text = m[1];
  }
  return notes.length ? `${text} ${notes.join(" ")}` : text;
}

export function examStem(say: Segment[], native: NativeLang = DEFAULT_NATIVE): string {
  // Büyük harf kuralı dile göre: "i" Türkçede "İ", İngilizcede "I".
  const locale = native === "tr" ? "tr-TR" : native === "de" ? "de-DE" : "en-US";
  let text = say
    .map((s) => s.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  // Önce iki noktalı sıra işareti ("… Sıra sende: …" dahil), sonra noktalı
  // "Şimdi sıra sende." düşünce açığa çıkan baştaki anlatım.
  text = dropLecture(text).replace(MID_TURN, "");
  text = dropLecture(text);
  // Üst üste çerçeve olabilir ("Şimdi sıra sende. Deneyelim: …"); her tur
  // en fazla bir çerçeve, geriye bir şey kalmıyorsa durur.
  for (let round = 0; round < 3; round++) {
    const lead = LEAD_INS.find((l) => text.startsWith(l));
    if (!lead) break;
    const rest = text.slice(lead.length).replace(/^[,;:–—-]\s*/, "").trim();
    if (!/\p{L}/u.test(rest)) break;
    text = rest;
  }
  for (const tail of TAIL_OUTS) {
    const at = text.toLocaleLowerCase("tr-TR").lastIndexOf(tail.toLocaleLowerCase("tr-TR"));
    if (at >= 0 && at > text.length - tail.length - 3) {
      const rest = text.slice(0, at).trim().replace(DANGLING_LANG, "").replace(DANGLING_BUNU, "").trim();
      if (/\p{L}/u.test(rest)) text = rest;
      break;
    }
  }
  // Konuşma ipuçları sınav kâğıdına geçmez: anlatımda "ilk yanlıştan sonra
  // söylenecek şey" olarak yazılmışlar, sınavda ise kural gereği ipucu yok.
  for (const hint of HINT_CLAUSES) {
    const at = text.indexOf(hint);
    if (at > 10) text = text.slice(0, at).trim();
  }
  // Çerçeve atılınca başta kalan bağlaç ya da sonda kalan noktalama.
  text = text.replace(/^[,;:–—-]\s*/, "").replace(/[,;:–—]\s*$/, "").trim();
  return text.charAt(0).toLocaleUpperCase(locale) + text.slice(1);
}

/**
 * Cevabı ele veren madde sınava girmez.
 *
 * Anlatımda bazı üretim adımları cümleyi önce ÖRNEK olarak veriyor, sonra
 * söyletiyor ("Almancası: Ich hole dich um acht ab. Şimdi sen söyle: …").
 * Konuşmada bu doğru bir basamak; sınavda cevabın soruda yazılı olması demek.
 */
export function selfAnswering(item: { prompt: string; de: string }): boolean {
  const prompt = foldSentence(item.prompt);
  const words = foldSentence(item.de).split(" ").filter(Boolean);
  if (!words.length) return true;
  // Hedefin soruda geçen en uzun kesintisiz parçası. Eşik %70: bağlaç
  // modülünde yönerge cümlenin başını İSKELE olarak veriyor ("Nachdem ich
  // die Zusage bekommen hatte, …") ve kalanı öğrenci kuruyor — bu geçerli
  // bir üretim maddesi. Cümlenin neredeyse tamamı yazılıysa değil.
  let longest = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = words.length; j > i + longest; j--) {
      if (prompt.includes(words.slice(i, j).join(" "))) {
        longest = j - i;
        break;
      }
    }
  }
  return longest / words.length >= 0.7;
}

/**
 * ÖNCEKİ ADIMA YASLANAN YÖNERGE (QA F-0057, 2026-10-09).
 *
 * Konuşmada üretim adımı bir öncekinin hemen ardından geliyor ve "aynı soruyu
 * tanımadığın birine kibar biçimde sor" orada anlaşılır. Sınavda maddeler
 * karışık ve tek tek geliyor: "aynı soru" hiçbir şeyi göstermiyordu, iki ayrı
 * konuşmadan gelen iki madde birebir aynı yönergeyle (farklı hedefle) aynı
 * kâğıda düştü. Kural: göndermeli ifade ("aynı soruyu", "şu cümleyi", "şunu",
 * "kalıbı hatırla", "tersini") yönergenin SON cümlesindeyse ve ardından
 * kurulacak cümle gelmiyorsa (tırnak yok, iki noktadan sonra cümle yok), madde kendi başına
 * cevaplanamaz. Kaynak (Türkçe) yönergede ölçülür; kapı `scripts/check-exams.ts`.
 * "bunu" bilerek yok: "Yürüyüş yapmayı sever misin? Bunu İngilizce sor."
 * yönergenin içindeki cümleyi gösteriyor.
 */
const DANGLING = /(?<!\p{L})(aynı (soruyu|cümleyi|şeyi|isteği)|şu (cümleyi|soruyu)|şunu|kalıbı hatırla|tersini|olumsuzunu)(?!\p{L})/iu;
export function danglingReference(prompt: string): boolean {
  if (/['"“”„‘’«»]/.test(prompt)) return false;
  /* İki noktadan sonrası kurulacak cümle ("Şu cümleyi kur: Bu ceket …"); ölçülen o kısım. */
  const tail = prompt.slice(prompt.lastIndexOf(":") + 1);
  const sentences = tail.split(/(?<=[.!?…])\s+/).filter(Boolean);
  return DANGLING.test(sentences[sentences.length - 1] ?? "");
}

/**
 * Sınava girebilecek üretim maddeleri: cevabı ele vermeyen, en az iki kelimelik
 * ve HEDEFİ TEKRARSIZ olanlar. Aynı cümle (ör. "I'd like a tea, please.") bir
 * modülün iki konuşmasında da üretiliyor; ikisi aynı kâğıda düşünce öğrenci
 * aynı görevi iki kez görüyordu. Kâğıt kurucusu (`lib/exam`) ve kapı
 * (`scripts/check-exams.ts`) aynı süzgeci kullanıyor.
 */
export function examProduceUsable<T extends { prompt: string; de: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((p) => {
    if (selfAnswering(p) || p.de.trim().split(/\s+/).length < 2) return false;
    const key = foldSentence(p.de);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Segment dizisini düz metne çevirir — Almanca parçalar korunur. */
export function flatten(segments: Segment[]): string {
  return segments.map((s) => s.text).join(" ").replace(/\s+([.,!?;:])/g, "$1").replace(/\s+/g, " ").trim();
}

export type ProduceItem = {
  id: string;
  conversationId: string;
  conversationTitle: string;
  focusId: string;
  /** Türkçe yönerge — çevrilecek cümle ve varsa onu sabitleyen bağlam. */
  prompt: string;
  /** Beklenen Almanca cümle. */
  de: string;
  /** Eşdeğer kabul edilen kuruluşlar. */
  accept: string[];
};

export type JudgeItem = {
  id: string;
  conversationId: string;
  focusId: string;
  /** Hakkında hüküm verilecek Almanca cümle. */
  statement: string;
  answer: boolean;
  /** Gerekçe — sınav bitince açılır, sırasında değil. */
  why: Segment[];
};

export type PatternItem = {
  id: string;
  conversationId: string;
  conversationTitle: string;
  focusId: string;
  de: string;
  tr: string;
};

export type WordItem = { de: string; tr: string; head: string; conversationId: string };

export type ModuleContent = {
  course: string;
  level: string;
  index: number;
  theme: string;
  conversations: Conversation[];
  /** Modülün dilbilgisi odakları, konuşma sırasıyla ve tekrarsız. */
  focus: string[];
  produce: ProduceItem[];
  judge: JudgeItem[];
  patterns: PatternItem[];
  words: WordItem[];
  /** Konuşmaların sohbet sahneleri — durum maddelerinin kaynağı. */
  scenes: { conversationId: string; scene: string; partner: string; opening: string; openingTr: string }[];
};

/** Modülün konuşmaları — katalog sırasıyla on konuşma. */
export async function moduleConversations(course: string, level: string, index: number): Promise<Conversation[]> {
  const inLevel = (await conversationsForLevel(course, level)).filter((l) => l.course === course);
  return inLevel.slice(index * MODULE_SIZE, (index + 1) * MODULE_SIZE);
}

/** Kursun bir seviyesindeki modül sayısı. */
/**
 * Kursun bir seviyesindeki modül sayısı — KONUŞMALARDAN sayılıyor.
 *
 * Adı `conversations/modules` içindeki `moduleCount(course, level)` ile karışmasın
 * diye ayrı: o, plandaki modül sayısını veriyor (sabit), bu ise gerçekte
 * yazılmış konuşma sayısından türüyor. İkisi çoğu seviyede aynı, yarım kalmış
 * bir seviyede değil.
 */
export async function conversationModuleCount(course: string, level: string): Promise<number> {
  const inLevel = (await conversationsForLevel(course, level)).filter((l) => l.course === course);
  return Math.ceil(inLevel.length / MODULE_SIZE);
}

/** Kursun bütün modülleri — `{ level, index }` çiftleri, katalog sırasıyla. */
export async function allModules(course: string): Promise<{ level: string; index: number }[]> {
  const out: { level: string; index: number }[] = [];
  for (const level of LEVEL_ORDER) {
    const n = await conversationModuleCount(course, level);
    for (let i = 0; i < n; i++) out.push({ level, index: i });
  }
  return out;
}

const CACHE = new Map<string, ModuleContent>();

export async function moduleContent(course: string, level: string, index: number): Promise<ModuleContent> {
  const key = `${course}|${level}|${index}`;
  const hit = CACHE.get(key);
  if (hit) return hit;
  const built = buildModuleContent(course, level, index, await moduleConversations(course, level, index));
  CACHE.set(key, built);
  return built;
}

const PRODUCE_CACHE = new Map<string, ProduceItem[]>();

/**
 * Modülün ÜRETİM maddeleri öğrencinin ANADİLİNDE — sınavın "cümle kur" bölümü.
 *
 * `moduleContent` kaynak dilde (Türkçe) kalıyor ve bu bilerek: kelime listesi
 * `taughtSense` ile `words.tr` sütununa eşleniyor, çevrilmiş içerikte o eşleşme
 * bozulurdu. Ama üretim maddesinin yönergesi EKRAN METNİ ve Türkçe geliyordu:
 * anadili İngilizce/Almanca olan öğrenci "Bir kedim var." cümlesini kurmaya
 * çağrılıyordu. Burada konuşmalar konuşma çözücüsüyle (`localiseConversation`,
 * hep-ya-hiç) çevriliyor ve maddeler onlardan kuruluyor; kimlik, hedef cümle ve
 * kabul listesi aynı (puanlama değişmiyor). Çözücü sunucu modülü, o yüzden
 * gecikmeli içe alınıyor: bu dosya doğrulama betiklerinde de açılıyor.
 */
export async function moduleProduce(course: string, level: string, index: number, native: NativeLang): Promise<ProduceItem[]> {
  if (native === DEFAULT_NATIVE) return (await moduleContent(course, level, index)).produce;
  const key = `${course}|${level}|${index}|${native}`;
  const hit = PRODUCE_CACHE.get(key);
  if (hit) return hit;
  const { localiseConversation } = await import("./native-server");
  const source = await moduleConversations(course, level, index);
  const localised = await Promise.all(source.map((c) => localiseConversation(c, native)));
  // Çevrilemeyen konuşma kaynağıyla döner; o durumda önbelleğe yazılmıyor ki
  // sözlük yayına girince bir sonraki istek çevrilmiş hâli alsın.
  const complete = localised.every((c, i) => c !== source[i]);
  const produce = buildModuleContent(course, level, index, localised, native).produce;
  if (complete) PRODUCE_CACHE.set(key, produce);
  return produce;
}

/**
 * MODÜL İÇERİĞİNİN SAF KURUCUSU — konuşmaları DIŞARIDAN alıyor.
 *
 * İki çağıranı var ve ikisi konuşmaları ayrı yerden getiriyor: sunucu yayın
 * hattından (`moduleContent`), doğrulama betikleri kaynaktan
 * (`module-content-source`). Kurucunun kendisi ikisini de tanımıyor — böylece
 * 8,5 MB'lık konuşma kaynağı sunucu derlemesine girmiyor.
 */
export function buildModuleContent(
  course: string,
  level: string,
  index: number,
  conversations: Conversation[],
  native: NativeLang = DEFAULT_NATIVE,
): ModuleContent {
  const focus: string[] = [];
  const produce: ProduceItem[] = [];
  const judge: JudgeItem[] = [];
  const patterns: PatternItem[] = [];
  const words: WordItem[] = [];
  const scenes: ModuleContent["scenes"] = [];
  const seenWord = new Set<string>();
  const seenPattern = new Set<string>();

  for (const conversation of conversations) {
    if (!focus.includes(conversation.focusId)) focus.push(conversation.focusId);
    let p = 0;
    let j = 0;
    for (const step of conversation.lecture) {
      if (step.expect?.kind === "produce") {
        produce.push({
          id: `${conversation.id}#p${p++}`,
          conversationId: conversation.id,
          conversationTitle: conversation.title,
          focusId: conversation.focusId,
          prompt: examStem(step.say, native),
          de: step.expect.target,
          accept: step.expect.accept ?? [],
        });
      } else if (step.expect?.kind === "truefalse") {
        judge.push({
          id: `${conversation.id}#j${j++}`,
          conversationId: conversation.id,
          focusId: conversation.focusId,
          statement: step.expect.statement,
          answer: step.expect.answer,
          why: step.expect.why,
        });
      }
    }
    for (const pattern of conversation.patterns) {
      const dedup = pattern.de.toLocaleLowerCase("de-DE");
      if (seenPattern.has(dedup)) continue;
      seenPattern.add(dedup);
      patterns.push({
        id: `${conversation.id}#k${patterns.length}`,
        conversationId: conversation.id,
        conversationTitle: conversation.title,
        focusId: conversation.focusId,
        de: pattern.de,
        tr: pattern.tr,
      });
    }
    for (const v of conversation.vocab) {
      const head = headword(v.de);
      if (!head || seenWord.has(head)) continue;
      seenWord.add(head);
      words.push({ de: v.de, tr: v.tr, head, conversationId: conversation.id });
    }
    scenes.push({
      conversationId: conversation.id,
      scene: conversation.chat.scene,
      partner: conversation.chat.partner,
      opening: conversation.chat.opening,
      openingTr: conversation.chat.openingTr,
    });
  }

  const content: ModuleContent = {
    course,
    level,
    index,
    /* İçerik şartnamesinin etiketi, EKRAN METNİ DEĞİL: bu alanın hiçbir
       tüketicisi yok ve modül içeriği dile göre önbelleklenmiyor. Kaynak
       dilde bırakılıyor — ekranda görünen tema `buildTrack` tarafında
       öğrencinin diline çevriliyor. */
    theme: moduleTheme(course, level, index, DEFAULT_NATIVE),
    conversations,
    focus,
    produce,
    judge,
    patterns,
    words,
    scenes,
  };
  return content;
}

/**
 * Konuşma odağı → cheatsheet sayfası.
 *
 * Modülün dilbilgisi bölümü seviye havuzundan değil MODÜLÜN konularından
 * kuruluyor; bunun için konuşmaların `focusId` etiketleriyle tablo sayfalarını
 * birbirine bağlayan bir köprü gerekiyor. Köprü elle yazılı, çünkü iki taraf
 * ayrı sözlükler: konuşma "Akkusativ-einen" diyor, tablo "a1-artikel".
 *
 * Bir odak birden çok sayfaya bağlanabilir (Perfekt hem ortaç tablosunda hem
 * fiil listesinde geçer). Eşleşmeyen odak sessizce düşmez —
 * `scripts/check-exams.ts` haritada olmayan bir focusId'yi hata sayıyor.
 */
export const FOCUS_SHEETS: Record<string, string[]> = {
  "Vorstellung": ["a1-praesens", "a1-sein-haben"],
  "Konjugation-Präsens": ["a1-praesens"],
  "W-Fragen": ["a1-wfragen"],
  "Ja-Nein-Fragen": ["a1-satzbau", "a1-wfragen"],
  "Zahlen-Preise": ["a1-zahlen"],
  "Uhrzeit": ["a1-zahlen"],
  "Sein-Haben": ["a1-sein-haben"],
  "Possessiv": ["a1-possessiv"],
  "Artikel": ["a1-artikel"],
  "Akkusativ": ["a1-artikel"],
  "Akkusativ-einen": ["a1-artikel"],
  "Dativ": ["a1-artikel", "a1-pronomen"],
  "Personalpronomen-Dativ": ["a1-pronomen"],
  "Negation-kein": ["a1-negation"],
  "Negation-nicht": ["a1-negation"],
  "Plural": ["a1-plural"],
  "Modalverb-möchten": ["a1-modalverben"],
  "Modalverb-können": ["a1-modalverben"],
  "Modalverb-müssen": ["a1-modalverben"],
  "Modalverb-dürfen": ["a1-modalverben"],
  "Modalverb-wollen": ["a1-modalverben"],
  "Modalverb-sollen": ["a1-modalverben"],
  "Gern-lieber": ["a2-komparativ"],
  "Dativ-gefallen": ["a2-dativverben"],
  "Imperativ-Sie": ["a2-imperativ"],
  "Imperativ-du": ["a2-imperativ"],
  "Präposition-mit": ["a1-praepositionen"],
  "Präposition-in-an-auf": ["a1-praepositionen"],
  "Dativ-Präpositionen": ["a1-praepositionen"],
  "Temporal-am-um": ["a1-praepositionen", "a1-zahlen"],
  "Es-gibt": ["a1-artikel", "a1-satzbau"],
  "Trennbare-Verben": ["a1-trennbar"],
  "V2-Regel": ["a1-satzbau"],
  "Perfekt-Einstieg": ["a1-perfekt"],
  "Perfekt": ["a2-perfekt-partizip", "a1-perfekt"],
  "Perfekt-unregelmäßig": ["a2-perfekt-partizip", "a2-verben"],
  "Perfekt-trennbar": ["a2-perfekt-partizip", "a1-trennbar"],
  "Präteritum": ["a2-praeteritum", "a2-verben"],
  "Präteritum-sein-haben": ["a2-praeteritum"],
  "Präteritum-Modal": ["a2-praeteritum"],
  "Plusquamperfekt": ["b1-plusquamperfekt"],
  "Reflexivverben": ["a2-reflexiv"],
  "Wechselpräpositionen": ["a2-wechselpraepositionen"],
  "Verben-mit-Präpositionen": ["a2-verben-praeposition"],
  "Komparativ": ["a2-komparativ"],
  "Superlativ": ["a2-komparativ"],
  "Adjektivdeklination-Einstieg": ["a2-adjektive"],
  "Adjektivdeklination": ["a2-adjektive", "b1-adjektiv-nomen"],
  "Ordinalzahlen-Datum": ["a2-ordinalzahlen"],
  "Futur-werden": ["b1-futur"],
  "Konjunktiv-II": ["b1-konjunktiv2", "a2-hoeflich"],
  "Konjunktiv-II-irreal": ["b1-konjunktiv2", "c1-konjunktiv2-erweitert"],
  "Passiv-Präsens": ["b1-passiv"],
  "Passiv-Präteritum": ["b1-passiv"],
  "Um-zu": ["b1-infinitiv-zu"],
  "Infinitiv-zu": ["b1-infinitiv-zu"],
  "Relativsatz-Nominativ": ["b1-relativsatz"],
  "Relativsatz-Akkusativ": ["b1-relativsatz"],
  "Relativsatz-Dativ": ["b1-relativsatz"],
  "Relativsatz-Präposition": ["b1-relativsatz", "b1-da-wo"],
  "Indirekte-Frage": ["a2-nebensatz", "b1-konnektoren"],
  "Konnektor-denn": ["a2-nebensatz", "b1-konnektoren"],
  "Zweiteilige-Konnektoren": ["b1-konnektoren"],
  "Nebensatz-weil": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-dass": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-wenn": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-obwohl": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-als": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-nachdem": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-bevor-während": ["a2-nebensatz", "b1-konnektoren"],
  "Nebensatz-damit": ["a2-nebensatz", "b1-konnektoren"],
  // B2 — seviyenin odakları iki kaynaktan besleniyor: kendi tabloları ve
  // üstüne kurulduğu B1 sayfası. İkincisi keyfî değil, sınavın dilbilgisi
  // bölümü için gereken hücre sayısını garanti ediyor (bkz. check-exams).
  "Nominalisierung": ["b2-nominalisierung", "b2-funktionsverbgefuege"],
  "Passiv-Perfekt": ["b2-passiv", "b1-passiv"],
  "Passiv-Modal": ["b2-passiv", "b1-passiv"],
  "Zustandspassiv": ["b2-passiv", "b1-passiv"],
  "Passiversatz": ["b2-passiversatz", "b2-passiv"],
  "Indirekte-Rede-Einstieg": ["b2-konjunktiv1"],
  "Subjektive-Modalverben": ["b2-subjektive-modalverben", "b2-konjunktiv1"],
  "Partizipialattribute": ["b2-partizipialattribute", "b2-nominalisierung", "b1-adjektiv-nomen"],
  "Genitivpräpositionen": ["b1-genitiv", "b2-konnektoren"],
  "Nebensatz-sofern": ["b2-konnektoren", "b1-konnektoren"],
  "Nebensatz-indem": ["b2-konnektoren", "b1-konnektoren"],
  "Je-desto": ["b2-zweiteilige-konnektoren", "b1-konnektoren"],
  "Relativsatz-Genitiv": ["b1-relativsatz", "b1-genitiv"],
  "Als-ob": ["b1-konjunktiv2", "b2-konjunktiv1", "c1-konjunktiv2-erweitert"],
  // C1 — aynı ilke: seviyenin kendi sayfası + dayandığı alt seviye sayfası.
  // C1 tablolarının çoğu uzun kalıp taşıdığı için sınavın dilbilgisi bölümüne
  // az hücre veriyor; alt seviye sayfaları o boşluğu kapatıyor.
  "Funktionsverbgefüge": ["c1-wendungen", "b2-funktionsverbgefuege", "c1-satzstellung"],
  "Konjunktiv-II-Diplomatie": ["c1-konjunktiv2-erweitert", "b1-konjunktiv2", "c1-redemittel"],
  "Modalpartikeln": ["c1-modalpartikeln", "c1-satzstellung"],
  "Nominalstil": ["c1-nominalstil", "b2-nominalisierung"],
  "Rhetorische-Mittel": ["c1-redemittel", "c1-satzstellung"],
  "Konjunktiv-I-Rede": ["b2-konjunktiv1", "c1-redemittel"],
  "Ironie-Untertreibung": ["c1-modalpartikeln", "c1-redemittel", "c1-satzstellung"],
  "Metaphern": ["c1-wendungen", "c1-satzstellung"],
  "Konzessive-Konnektoren": ["c1-textkonnektoren", "b1-konnektoren"],
  "Redewendungen": ["c1-wendungen", "c1-satzstellung"],
  "Partizipialkonstruktionen": ["c1-nominalstil", "b2-partizipialattribute", "c1-adjektiv-nomen-praeposition", "b2-nominalisierung"],
  "Verweiswörter": ["c1-textkonnektoren", "b1-da-wo"],
  "Wortschatz-Nuancen": ["c1-wortbildung", "c1-adjektiv-nomen-praeposition", "b2-verben"],
};

/** Modülün odaklarının açtığı tablo sayfaları — tekrarsız. */
export function moduleSheets(content: Pick<ModuleContent, "focus">): string[] {
  const out: string[] = [];
  for (const focus of content.focus) for (const sheet of FOCUS_SHEETS[focus] ?? []) if (!out.includes(sheet)) out.push(sheet);
  return out;
}
