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
metre metres meter meters km kg cm litre litres liter liters kilo kilos minutes hours euro
children men women people feet teeth`.split(/\s+/).filter(Boolean));

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
  if (w.endsWith("'s")) out.push(w.slice(0, -2));
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

export function measureEn(text: string, pool: Set<string>, ek: string[]): { tok: string[]; disi: string[] } {
  pool = new Set(pool);
  for (const w of ek) for (const p of w.toLowerCase().split(/[\s/,-]+/)) if (p) pool.add(p);
  const raw = text.replace(/[^\p{L}\p{N}'\s-]/gu, " ").split(/\s+/).filter(Boolean);
  const tok: string[] = [];
  const disi: string[] = [];
  raw.forEach((t, i) => {
    const w = t.toLowerCase().replace(/^'+|'+$/g, "");
    if (!w || /\d/.test(w)) return;
    // Özel ad: cümle başında olmayan büyük harfli sözcük.
    const prev = raw[i - 1] ?? "";
    const sentenceStart = i === 0 || /[.!?:]$/.test(prev) || /^["„“]/.test(t);
    if (/^[A-Z]/.test(t) && !sentenceStart) return;
    tok.push(w);
    if (EN_FREE.has(w)) return;
    // Tireli birleşik: parçalarının hepsi biliniyorsa bileşik de bilinir
    // ("twenty-five", "well-known"). Ayrı ayrı bakmak sayıları kurtarıyor.
    if (w.includes("-") && w.split("-").every((part) => !part || EN_FREE.has(part))) return;
    if (enStems(w).some((s) => pool.has(s))) return;
    disi.push(w);
  });
  return { tok, disi };
}
