/**
 * İngilizce ölçüm makinesi — İKİ denetleyicinin ortak parçası.
 *
 * `check-library-vocab.ts` kütüphane egzersizini SEVİYE havuzuna karşı ölçer,
 * `check-en-unit-vocab.ts` Patika egzersizini ÜNİTEYE KADAR ÖĞRETİLEN kümeye
 * karşı. Ölçen makine (serbest sözcükler, düzensiz fiil tablosu, gövde
 * türetme) ikisinde de aynı; havuzu çağıran veriyor.
 *
 * Kopyalanmadı çünkü kopya kaçınılmaz olarak ayrışırdı: düzensiz fiil
 * tablosuna bir satır eklendiğinde biri düzelir öteki düzelmezdi ve iki
 * denetleyici aynı metin için farklı oran basardı — hangisinin doğru olduğu
 * anlaşılmadan.
 *
 * Almanca karşılığı `lib/vocab-gate.cjs`; o dosya çekim/ayrılabilen fiil
 * morfolojisi taşır, burada öyle bir makine yok (gerekçesi
 * check-library-vocab.ts başında).
 */
import { readFileSync } from "node:fs";

export const LEVELS = ["a1", "a2", "b1", "b2", "c1"];

/**
 * SON ÜÇ SATIR: yarım kalmış KAPALI SINIFLARIN tamamlanması — Almanca kapıda
 * `SERBEST`in çekim tablolarına yapılanın İngilizce karşılığı.
 *
 * Tablonun kendi ölçüsü "havuzda öğretiliyor mu" DEĞİL: `near` C1 havuz
 * sözcüğü, `around` B2, `within` B1 — üçü de her ünitede serbest, çünkü temel
 * edat listesi dilbilgisidir, öğretilecek sözcük değil. O ölçüye göre listede
 * delikler vardı ve rapor onları bulgu diye basıyordu: `behind` (A1 havuz
 * sözcüğü!) kursun EN SIK kapı dışı bulgusuydu — beş seviyede toplam 44 geçiş.
 * Aynı sınıftan `against`, `above`, `below`; bağlaç/belirteç tarafında
 * `neither` (C1'de ×8), `either`, `nor`, `whether` — hepsinin kardeşleri
 * (`both`, `all`, `any`, `if`, `that`, `because`) zaten serbestti. `-ever`
 * dizisi de öyle: `who`, `what`, `where`, `when` serbest ama `whoever`,
 * `whatever` değildi.
 *
 * BİLEREK DIŞARIDA: `however`, `nevertheless`, `moreover`, `whereas`,
 * `whereby`, `therefore` — bunlar söylem bağlayıcısı, yani B2/C1'de
 * ÖĞRETİLEN sözcükler; Almanca tarafın `trotzdem`/`sondern`/`sogar`
 * bulgularının karşılığı ve raporda görünmeleri doğru.
 */
export const EN_FREE = new Set(`a an the and or but so because if when while as than that this these those there here
i you he she it we they me him her us them my your his its our their mine yours
am is are was were be been being have has had do does did will would can could should may might must shall
not no yes n't to of in on at by for from with about into over under up down out off across after before
between through during without within along around near next last first second third
what which who whom whose where why how much many more most some any every each all both few little
very really just also too only even still already yet again never always often sometimes usually now then
today tomorrow yesterday tonight morning afternoon evening night week month year day hour minute
one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen
eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million
kilometer kilometers kilometre kilometres mile miles
ok okay oh hi hello hey bye please thanks thank sorry mr mrs ms dr o'clock am pm
monday tuesday wednesday thursday friday saturday sunday january february march april may june july august
september october november december euro euros pound pounds dollar dollars percent
true false right wrong cannot mine yours hers ours theirs anything everything anyone everyone someone nobody
somebody anybody everybody
metre metres meter meters km kg cm litre litres liter liters kilo kilos minutes hours euro
children men women people feet teeth
behind against above below beside onto toward towards
neither either none nor whether
whoever whatever wherever whenever whichever`.split(/\s+/).filter(Boolean));

/**
 * HAVUZUN TAMAMI — özel ad ayıklaması için, seviye penceresi olmadan.
 *
 * Almanca kapıdaki `havuzKok` ile aynı iş: kurs bir sözcüğü HİÇBİR seviyede
 * öğretmiyorsa ve metinde büyük harfle geçiyorsa, o bir addır (Deniz, Bremen,
 * Rossi) — "seviye dışı kelime" saymak yanıltıcı olur. Havuzda varsa normal
 * ölçülür, yani "Behind" cümle başındayken de ünite penceresine sorulur.
 */
let kokBellek: Set<string> | null = null;
export function enCourseRoots(): Set<string> {
  if (kokBellek) return kokBellek;
  const set = new Set<string>();
  for (const l of readFileSync("data/app/words-en.json", "utf8").split("\n")) {
    if (!l) continue;
    const r = JSON.parse(l) as { de: string };
    for (const w of r.de.toLowerCase().replace(/\(.*?\)/g, "").split(/[\s/,-]+/)) if (w) set.add(w);
  }
  kokBellek = set;
  return set;
}

export function enLevelPool(level: string): Set<string> {
  const rows = readFileSync("data/app/words-en.json", "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l) as { de: string; niveau: string });
  const upto = LEVELS.indexOf(level);
  const set = new Set<string>();
  for (const r of rows) {
    if (LEVELS.indexOf(r.niveau.toLowerCase()) > upto) continue;
    for (const w of r.de.toLowerCase().replace(/\(.*?\)/g, "").split(/[\s/,-]+/)) if (w && !/^(to|the|a|an|sb|sth|somebody|something)$/.test(w)) set.add(w);
  }
  return set;
}

/**
 * Düzensiz biçim → mastar. Kural üretemediklerimiz: İngilizcenin en sık yüz
 * fiilinin yarısı düzensiz ve hepsi A1–A2 katmanında. Bunlar olmadan ölçüm
 * "went", "told", "seen" gibi biçimleri seviye dışı sayıyor ve oranı
 * olduğundan yüksek gösteriyordu.
 */
export const EN_IRREGULAR: Record<string, string> = Object.fromEntries(
  `be:was were been;have:had;do:did done;go:went gone;say:said;get:got gotten;make:made;know:knew known;
think:thought;take:took taken;see:saw seen;come:came;want:wanted;use:used;find:found;give:gave given;
tell:told;work:worked;call:called;try:tried;ask:asked;need:needed;feel:felt;become:became;leave:left;
put:put;mean:meant;keep:kept;let:let;begin:began begun;seem:seemed;help:helped;talk:talked;turn:turned;
show:showed shown;hear:heard;play:played;run:ran;move:moved;live:lived;believe:believed;bring:brought;
happen:happened;write:wrote written;sit:sat;stand:stood;lose:lost;pay:paid;meet:met;include:included;
continue:continued;set:set;learn:learnt;lead:led;understand:understood;watch:watched;follow:followed;
stop:stopped;create:created;speak:spoke spoken;read:read;spend:spent;grow:grew grown;open:opened;
walk:walked;win:won;teach:taught;offer:offered;remember:remembered;consider:considered;buy:bought;
send:sent;build:built;fall:fell fallen;cut:cut;reach:reached;kill:killed;raise:raised;drive:drove driven;
break:broke broken;eat:ate eaten;drink:drank drunk;sleep:slept;wake:woke woken;ride:rode ridden;
swim:swam swum;sing:sang sung;fly:flew flown;draw:drew drawn;wear:wore worn;choose:chose chosen;
forget:forgot forgotten;catch:caught;hide:hid hidden;hold:held;sell:sold;cost:cost;hurt:hurt;
throw:threw thrown;lie:lay lain;rise:rose risen;send:sent;lend:lent;bite:bit bitten`
    .replace(/\n/g, "")
    .split(";")
    .flatMap((pair) => {
      const [base, forms] = pair.split(":");
      return (forms ?? "").trim().split(/\s+/).filter(Boolean).map((f) => [f, base.trim()] as const);
    }),
);

/** Kısaltmalar: "didn't" → did, "we've" → we. Kesme işaretinden sonrası düşer. */
function enContraction(w: string): string | null {
  const m = /^([a-z]+)(?:'(?:t|s|re|ve|ll|d|m))$/.exec(w);
  if (!m) return null;
  // "n't" kesilince kalan kök bazen bir harf eksik olur: can't → ca. Kısaltmanın
  // iki olası kökünü de döndürmek gerekiyordu; çağıran ikisini de deniyor.
  return m[1];
}

export function enStems(w: string): string[] {
  const out = [w];
  const irr = EN_IRREGULAR[w];
  if (irr) out.push(irr);
  const con = enContraction(w);
  if (con) {
    out.push(con, EN_IRREGULAR[con] ?? con);
    if (w.endsWith("n't")) out.push(w.slice(0, -3), EN_IRREGULAR[w.slice(0, -3)] ?? w.slice(0, -3));
  }
  /* İYELİK EKİ GÖVDEYİ GİZLİYOR. "writer's" → "writer" → "write": ilk
     adım yetmiyor, çünkü türetme ekleri yalnız ham belirtece uygulanıyordu
     ve `-er` kuralı apostroflu biçimde hiç çalışmıyordu. Kökün kendi
     gövdeleri de listeye giriyor. */
  if (w.endsWith("'s")) {
    const base = w.slice(0, -2);
    out.push(base);
    if (base.endsWith("er")) out.push(base.slice(0, -2), base.slice(0, -1));
    if (base.endsWith("ies")) out.push(base.slice(0, -3) + "y");
    if (base.endsWith("s")) out.push(base.slice(0, -1));
  }
  if (w.endsWith("ies")) out.push(w.slice(0, -3) + "y");
  if (w.endsWith("es")) out.push(w.slice(0, -2));
  if (w.endsWith("s")) out.push(w.slice(0, -1));
  if (w.endsWith("ed")) out.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith("ied")) out.push(w.slice(0, -3) + "y");
  if (w.endsWith("ing")) out.push(w.slice(0, -3), w.slice(0, -3) + "e");
  if (w.endsWith("er")) out.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith("est")) out.push(w.slice(0, -3), w.slice(0, -2));
  if (w.endsWith("ly")) out.push(w.slice(0, -2));
  // çift ünsüz: running → run, bigger → big
  if (/([b-df-hj-np-tv-z])\1(ing|ed|er|est)$/.test(w)) out.push(w.replace(/([b-df-hj-np-tv-z])\1(ing|ed|er|est)$/, "$1"));
  return out;
}

/* ── bulguyu SINIFLANDIRMA ───────────────────────────────────────────────
 *
 * Almanca kapıdaki `nerede`nin İngilizce ikizi; sınıflar ve gerekçeleri
 * orada yazılı (`lib/vocab-gate.cjs`). Özet: "kapı dışı" tek bir şey değil,
 * yazarın yapacağı iş sınıfa göre değişiyor — seviye üstü sözcük metni
 * sadeleştirmeyi ister, erken sözcük egzersizi taşımayı, derssiz sözcük
 * patikaya ders eklemeyi, türev hiçbir şey (kapının eksiği).
 *
 * ALMANCADAN TEK FARKI EŞLEŞTİRME. Orada çekim/ayrılabilen önek makinesi
 * gerekiyordu; burada `enStems` zaten var ve düzensiz fiil tablosunu,
 * kısaltmaları, iyelik ekini, türetme eklerini birlikte soyuyor. Almanca
 * tarafta denenip ATILAN iki gevşek eşleştirici (ünsüz iskeleti, anahtar ön
 * eki indeksi) buraya hiç taşınmadı: yanlış sınıf yazarı yanlış işe gönderir,
 * eksik sınıf yalnız "havuzda yok" der.
 */
const EN_SIRA = LEVELS;
let enSeviyeBellek: Map<string, string> | null = null;
/** Sözcük → havuzda ilk göründüğü seviye (her seviye, pencere yok). */
export function enPoolLevels(): Map<string, string> {
  if (enSeviyeBellek) return enSeviyeBellek;
  const m = new Map<string, string>();
  for (const l of readFileSync("data/app/words-en.json", "utf8").split("\n")) {
    if (!l) continue;
    const r = JSON.parse(l) as { de: string; niveau: string };
    const lv = r.niveau.toLowerCase();
    for (const w of r.de.toLowerCase().replace(/\(.*?\)/g, "").split(/[\s/,-]+/)) {
      if (!w) continue;
      const eski = m.get(w);
      if (eski === undefined || EN_SIRA.indexOf(lv) < EN_SIRA.indexOf(eski)) m.set(w, lv);
    }
  }
  enSeviyeBellek = m;
  return m;
}
/** `enStems` ile haritada ara. */
const enAra = <T,>(m: Map<string, T>, w: string): T | undefined => {
  for (const st of enStems(w)) { const v = m.get(st); if (v !== undefined) return v; }
  return undefined;
};
/**
 * Kapı dışı bir sözcüğü sınıflandır. `dersUnite`: bu seviyenin sözcük →
 * (ilk öğretildiği ünite) haritası; çağıran `lessonsFor("en")`den kuruyor,
 * çünkü dersin tek kaynağı orası (mobil döküm bayatlayabilir).
 */
export function enNerede(w: string, level: string, unit: number, dersUnite: Map<string, number>): { sinif: string; detay: string } {
  const du = enAra(dersUnite, w);
  if (du !== undefined) return du > unit
    ? { sinif: "erken", detay: `u${du} (${du - unit} ünite sonra)` }
    : { sinif: "turev", detay: `kök u${du}'de öğretiliyor` };
  const hv = enAra(enPoolLevels(), w);
  if (hv === undefined) return { sinif: "yabanci", detay: "havuzda yok" };
  return EN_SIRA.indexOf(hv) > EN_SIRA.indexOf(level)
    ? { sinif: "ustu", detay: hv.toUpperCase() }
    : { sinif: "derssiz", detay: `havuz ${hv.toUpperCase()}, bu seviyede ders yok` };
}

export function measureEn(text: string, pool: Set<string>, ek: string[]): { tok: string[]; disi: string[] } {
  pool = new Set(pool);
  for (const w of ek) for (const p of w.toLowerCase().split(/[\s/,-]+/)) if (p) pool.add(p);
  /* NOKTALAMA ÖNCE SİLİNİRSE CÜMLE BAŞI HİÇ BULUNAMAZ.
     Eski hali metni `[^\p{L}\p{N}'\s-] → boşluk` ile temizleyip SONRA
     "önceki belirteç nokta/ünlem/soru ile bitiyor mu" diye soruyordu. O nokta
     bir adım önce boşluğa çevrilmişti, yani koşul BİRİNCİ belirteç dışında
     hiçbir zaman doğru olmuyordu: cümle başındaki her büyük harfli sözcük
     "özel ad" sayılıp ölçümden tamamen düşüyordu — belirteç sayısına bile
     girmiyordu. Ölçüldü: İngilizce kursun 143.606 belirtecinin 17.802'si
     (%12,4) böyle atılıyordu ve atılanların 935'i havuz dışıydı. Çoğu gerçek
     özel ad (Deniz, Ela, Izmir) ama 170 geçiş gerçek bulguydu: neither,
     none, either, whether, whoever, passive, active, verdict, liability,
     especially, somewhere.
     Düzeltme: sınır kararı HAM metinden, sözcükler arasında duran gerçek
     karakterlere bakarak veriliyor. Alan ayracı `|` de cümle başı sayılıyor
     — çağıranlar egzersizin alanlarını onunla birleştiriyor ve her alan yeni
     bir cümledir. */
  const tok: string[] = [];
  const disi: string[] = [];
  let prevEnd = 0;
  let ilk = true;
  for (const m of text.matchAll(/[\p{L}\p{N}'-]+/gu)) {
    const t = m[0];
    const ara = text.slice(prevEnd, m.index);
    const sentenceStart = ilk || /[.!?:;|\n]/.test(ara) || /["„“«(]/.test(ara);
    prevEnd = m.index + t.length;
    ilk = false;
    const w = t.toLowerCase().replace(/^'+|'+$/g, "");
    if (!w || /\d/.test(w)) continue;
    if (/^[A-Z]/.test(t)) {
      // Cümle ORTASINDA büyük harf: İngilizcede tek nedeni özel addır.
      if (!sentenceStart) continue;
      /* Cümle BAŞINDA büyük harf hiçbir şey söylemez — "Deniz works" ile
         "Behind the house" aynı görünür. Ayıran şey havuz: kurs sözcüğü
         hiçbir seviyede öğretmiyorsa addır. Bedeli ölçüldü ve kabul edildi:
         kursun hiçbir yerinde öğretilmeyen `none`, `whoever`, `whereby`,
         `wherein`, `whatever`, `german` cümle başında geçtiklerinde artık
         ada benziyor ve raporda görünmüyorlar (cümle içinde küçük harfle
         geçtiklerinde görünmeye devam ediyorlar). */
      const kok = enCourseRoots();
      if (!enStems(w).some((st) => kok.has(st))) continue;
    }
    tok.push(w);
    if (EN_FREE.has(w)) continue;
    // Tireli birleşik: parçalarının hepsi biliniyorsa bileşik de bilinir
    // ("twenty-five", "well-known"). Ayrı ayrı bakmak sayıları kurtarıyor.
    if (w.includes("-") && w.split("-").every((part) => !part || EN_FREE.has(part))) continue;
    if (enStems(w).some((st) => pool.has(st))) continue;
    disi.push(w);
  }
  return { tok, disi };
}
