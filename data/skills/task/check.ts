/**
 * Görev metinlerinin İngilizcesini denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/skills/task/check.ts [paket|all]`
 *
 * Ortak kurallar kardeş hatların aynısı (son noktalama, sayı, karakter
 * kümesi, uzunluk sapması, İngiliz yazımı, mükerrer satır, kapsam). Bu
 * hatta ÖZGÜ dört kural var ve dördü de ölçümden doğdu:
 *
 * - **Almanca kanıt birebir durur.** 462 satır „…“ içinde, 385 satır
 *   parantez içinde Almanca taşıyor: "Adını yazdın mı? (Ich heiße …)".
 *   Öğrenci o kalıbı metinde arayacak; çevrilirse arama boşa çıkar.
 *   Kural yalnız açıklık ALMANCA görünüyorsa işliyor — `focus` alanındaki
 *   "(belirtme hâli)" Türkçedir ve çevrilmek zorundadır.
 *
 * - **Söyleyiş ipucu ÇEVRİLMEZ, YENİDEN YAZILIR.** `drill.hint` ve
 *   `drill.fix` Almanca sesleri TÜRKÇE okunuşla yazıyor: "ştu-DİİRT",
 *   "MAY-ne", "DİİNS-tak". İngilizce okuyan biri bunları okuyamaz —
 *   "shtoo-DEERT", "MY-nuh", "DEENS-tahk" gerekir. 210 ipucunun 168'i
 *   böyle. Kapı Türkçeye özgü harfin İngilizce tarafta KALMADIĞINI
 *   ölçüyor; kalmışsa satır çevrilmemiş, kopyalanmıştır.
 *
 * - **Cevap ele verilmez.** `build.tr` kurulacak Almanca cümlenin
 *   ANLAMIDIR; İngilizcesi o cümleyi içeremez.
 *
 * - **Türkçe satırın karşılığı Türkçenin kendisi olamaz.** Notların bir
 *   kısmı ("-e", "-er") gerçekten aynı kalıyor ve bu doğru; ama satır
 *   Türkçe işaretleri taşıyorsa aynı bırakılmış demektir.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractTasks, type TaskRow } from "./make.js";
import { usSpelling } from "../../lessons/spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors: string[] = [];
const warnings: string[] = [];
const written = new Map<string, string>();

/** Son noktalama sınıfı — kardeş kapıların aynısı. */
const end = (t: string): string => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
/**
 * Üç nokta bu hatta NOKTALAMA DEĞİL, BOŞLUK İŞARETİ.
 *
 * `monologue.targets.tr` cümle başlangıçları veriyor ve „…“ öğrencinin
 * devam edeceği yeri gösteriyor. Yeri DİLE bağlı: Türkçe fiili sona attığı
 * için boşluk ortada kalıyor ("Benim ölçütüm … olurdu"), İngilizce fiili
 * ortada tuttuğu için sona düşüyor ("My criterion would be …"). İkisi de
 * doğru; son noktalama pariteti bunu hata sanıyordu.
 *
 * BOŞLUĞA YAPIŞIK NOKTALAMA DA ONUNLA GİDİYOR. İlk yazımda yalnız üç nokta
 * atılıyordu ve dokuz satır düştü; ikisi de gerçek dil farkıydı:
 *
 *   "… lehine olan şu: …"      → "What speaks for … is that …"
 *   "Bu doğru olsa da …"       → "Although that is true, …"
 *
 * Türkçe boşluğu iki nokta ve bir işaret zamiriyle açıyor ("şu: …"),
 * İngilizce bir bağlaçla ("that …"); Türkçe yan cümleyi ekle bitirip
 * boşluğu arkasına koyuyor, İngilizce virgülle. Aynı bilgi, farklı dizim —
 * boşluğun yanındaki noktalama da boşluğun parçası.
 *
 * Ölçüt yalnız Türkçe satır „…“ taşıyorsa işliyor. Taşımıyorsa
 * İngilizceye SONRADAN eklenmiş bir üç nokta hâlâ hata.
 */
const slots = (t: string): string => t.replace(/[\s:,;]*…[\s:,;]*/g, "");
/** Harfe bitişik olmayan sayılar; A1, B2 gibi kodlar miktar değildir. */
const numbers = (t: string): string[] =>
  [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();

/* Açıklık Türkçe mi / yabancı mı — `data/skills/prose/check.ts`in aynısı,
   aynı gerekçelerle. İkisi BİRLİKTE kullanılıyor: kural yalnız tanıdığı
   dilde çalışıyor, tanıyamadığı açıklığı zorlamıyor. */
const TR_WORDS =
  /\b(bir|ve|ile|için|değil|demek|var|yok|olur|olunur|olmak|gibi|daha|çok|ama|yani|kadar|sonra|önce|hâli|biçim|biçimi|yerine|zaman|yer|yön|memleket|ülkesi)\b/i;
const TR_TERMS = /\b(mastar|ortaç|isim|fiil|zamir|özne|nesne|tekil|çoğul|edat|kip|ek|sıfat|zarf)\b/i;
/* KARIŞIK AÇIKLIKLAR — Almanca terim ile Türkçe açıklama aynı parantezin
   içinde. Üç tane çıktı ve üçü de listeye bir sözcük ekletti:

     "(Dativ, yer)"                    yer
     "(Akkusativ, yön)"                yön
     "(memleket ülkesi Türkei)"        memleket, ülkesi

   O satırlarda kural artık Almanca terimin korunduğunu ölçmüyor. Sonuncuda
   kayıp yok: "Türkei" formun CEVABI olduğu için kanıt listesine oradan
   giriyor ve korunması ayrıca ölçülüyor. */
const turkish = (t: string): boolean => /[ışğİĞŞ]/.test(t) || TR_WORDS.test(t) || TR_TERMS.test(t);
const DE_WORDS =
  /\b(der|die|das|ein|eine|einen|einem|ist|sind|war|nicht|kein|keine|und|mit|wir|ich|Sie|du|zu|auf|für|von|dem|den|im|am|bei|nach|vor|über|wie|was|wo|wer|bitte|hier|ja|nein|sehr|gut|noch|schon|aus|um|halb|man|sich|es|habe|hat|haben|werden|wird|wurde|worden|muss|müssen|kann|können|könnte|soll|sollen|will|wollen|darf|dürfen|mag|mögen|möchte|möchten|würde|würden|hätte|wäre|zurück)\b/;
const EN_WORDS = /\b(the|is|are|was|were|you|your|a|an|of|to|in|and|it|that|for|we|I|my|please|do|does|not)\b/;
/*
  ö VE ü ALMANCAYI İŞARETLEMEZ. İlk yazımda ölçüt `[äöüßÄÖÜ]` idi ve iki
  Türkçe açıklığı Almanca sandı: „en büyük“ ve „gelseydi, görecektik“.
  Türkçe ö ve ü'yü Almancayla PAYLAŞIYOR; ölçüldüğünde bu ikisinin tek
  başına yabancı saydığı 44 açıklığın yarısı Türkçeydi (nötr, otobüsü
  bekliyorum, büyük harf, ünite 20). Yalnız ä ve ß Türkçede hiç yok.

  Kaybedilen Almanca açıklıklar (würde, können, müssen, zurück…) sözcük
  listesine eklendi; listeye girmeyen birkaç bileşik fiil (durchführen,
  aufhören) için kural artık çalışmıyor ve bu KASITLI: kapı tanıyamadığı
  bir açıklığı zorlamıyor, yanlış ret her koşuda doğru yazılmış bir satırı
  tekrar kurcalatır.
*/
const foreign = (t: string): boolean =>
  DE_WORDS.test(t) || EN_WORDS.test(t) || /[A-ZÄÖÜ][a-zäöüß]{2,}/.test(t) || /[äßÄ]/.test(t);

/** Karşılaştırma için sadeleştirme — tırnak ve boşluk çeşitleri eşitlenir. */
const flat = (t: string): string =>
  String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\s+/g, " ").trim();

/**
 * Almanca kanıt açıklıkları: „…“ ve (…). Türkçe olanlar elenir.
 *
 * `form.facts` satırlarında ÜÇÜNCÜ bir kaynak var: formun kendi cevapları
 * (`row.de`, „·“ ile ayrılmış). Tırnak taşımıyorlar ama kanıt olmaları
 * tırnaktan bağımsız — öğrenci onları forma birebir yazacak. Adlar Türkçe
 * yazımıyla saklanmış ("Ayla Yıldız", "Emre Şahin") ve İngilizce anlatım da
 * onları aynen taşımak zorunda; "Yildiz" yazan öğrenci formu geçemez.
 *
 * Bu, sınav hattındaki "özel adlar ALMANCA kâğıdı izler" kuralının aynısı,
 * yalnız burada Almanca kâğıt Türkçe yazımı seçmiş. Kural değişmiyor,
 * cevabı değişiyor.
 */
const evidence = (t: string, de?: string): string[] => {
  const out: string[] = [];
  for (const m of t.matchAll(/[„"]([^„"“”]{2,})[“"]/g)) out.push(m[1]);
  for (const m of t.matchAll(/\(([^()]{2,})\)/g)) out.push(m[1]);
  const spans = out.filter((s) => !turkish(s) && foreign(s));
  for (const a of (de ?? "").split(" · "))
    if (a.length > 1 && flat(t).includes(flat(a))) spans.push(a);
  return spans;
};

/**
 * KANITI çıkarır — yalnız onu. Yazım ve karakter denetimleri kalanı görür.
 *
 * İlk yazımda İngilizce taraftaki BÜTÜN tırnaklı ve parantezli açıklıklar
 * atılıyordu ve bir satır sızdı: "English has two participles as well:
 * „bekleyen misafirler“ …" — Türkçe örnek olduğu gibi kopyalanmış, tırnak
 * içinde olduğu için karakter kuralı görmemişti. Ölçüt artık TÜRKÇE
 * satırdan gelen kanıt açıklıkları: Almanca bir alıntının içindeki Türkçe
 * ad („Frau Yalçın“) korunur, İngilizceye kopyalanmış bir Türkçe öbek
 * korunmaz.
 */
const strip = (en: string, tr: string, de?: string): string => {
  let out = en;
  for (const span of evidence(tr, de)) out = out.split(span).join(" ");
  return out;
};

const src = new Map(extractTasks().map((r) => [r.kind + "|" + r.tr, r]));

if (existsSync(`${DIR}out`))
  for (const f of readdirSync(`${DIR}out`).filter((x) => x.endsWith(".json"))) {
    const packet = f.replace(/\.json$/, "");
    if (ARG !== "all" && packet !== ARG) continue;
    for (const r of JSON.parse(readFileSync(`${DIR}out/${f}`, "utf8")) as {
      tr: string;
      kind: string;
      en?: string;
    }[]) {
      const key = r.kind + "|" + r.tr;
      const H = (m: string) => errors.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      const U = (m: string) => warnings.push(`  [${packet}] ${JSON.stringify(r.tr.slice(0, 38))} — ${m}`);
      if (written.has(key)) H("aynı dize iki pakette");
      const row: TaskRow | undefined = src.get(key);
      if (!row) H("pakete ait değil");
      const en = String(r.en ?? "").trim();
      if (!en) H("karşılık boş");
      else if (row) {
        const [eTr, eEn] = r.tr.includes("…") ? [slots(r.tr), slots(en)] : [r.tr, en];
        if (end(eTr) !== end(eEn)) H(`son noktalama uyuşmuyor: «${end(eTr)}» → «${end(eEn)}»`);
        const a = numbers(r.tr).join(","), b = numbers(en).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);

        for (const ch of strip(en, r.tr, row.de))
          if (!/[ -~ÄÖÜäöüßé·×‚„“”‘’–—…→↔]/.test(ch))
            H(`beklenmedik karakter: «${ch}» (U+${ch.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")})`);

        for (const span of evidence(r.tr, row.de))
          if (!flat(en).includes(flat(span))) H(`Almanca kanıt düşmüş: «${span.slice(0, 34)}»`);

        /* SÖYLEYİŞ İPUCU. Türkçe okunuşla yazılmış bir ipucu İngilizce
           tarafta olduğu gibi kalırsa satır çevrilmemiştir. Ölçüt yalnız
           Türkçeye ÖZGÜ harfler; ä/ö/ü Almancadır ve kalabilir. */
        if (row.kind === "drill.hint" || row.kind === "drill.fix") {
          const left = [...strip(en, r.tr, row.de)].filter((c) => /[ışğİĞŞçÇ]/.test(c));
          if (left.length) H(`Türkçe okunuş kalmış: «${[...new Set(left)].join("")}»`);
        }

        /* CEVAP ELE VERİLMEZ: `build.tr` kurulacak cümlenin anlamıdır. */
        if (row.kind === "build.tr" && row.de && flat(en).includes(flat(row.de)))
          H("kurulacak Almanca cümle karşılığın içinde");

        /* Satır gerçekten Türkçeyse aynısı bırakılamaz. "-e", "-er" gibi
           biçim notları Türkçe işareti taşımıyor ve aynı kalabiliyor. */
        if (flat(en) === flat(r.tr) && turkish(strip(r.tr, r.tr))) H("karşılık Türkçenin aynısı");

        if (en.length > r.tr.length * 2 + 20 || en.length * 2 + 20 < r.tr.length)
          U(`uzunluk çok sapıyor (${r.tr.length} → ${en.length})`);
        for (const h of usSpelling(strip(en, r.tr, row.de))) U(`Amerikan yazımı ${h}`);
      }
      written.set(key, en);
    }
  }

let coverage: { rows: number; missing: number } | null = null;
if (ARG === "all") {
  const rows = extractTasks();
  const missing = rows.filter((r) => !written.has(r.kind + "|" + r.tr)).length;
  coverage = { rows: rows.length, missing };
  if (missing) errors.push(`  [kapsam] ${missing} dizenin İngilizcesi yok`);
}

if (errors.length) {
  console.log(`\nHATA (${errors.length}):`);
  console.log(errors.slice(0, 40).join("\n"));
  if (errors.length > 40) console.log(`  … ${errors.length - 40} tane daha`);
}
if (warnings.length) {
  console.log(`\nuyarı (${warnings.length}):`);
  console.log(warnings.slice(0, 20).join("\n"));
}
console.log(
  `\nözet: ${written.size} dize · ${errors.length} hata · ${warnings.length} uyarı` +
    (coverage ? `\nkapsam: ${coverage.rows - coverage.missing}/${coverage.rows}` : ""),
);
if (errors.length) process.exit(1);
