/**
 * Beceri düz metninin İngilizcesini denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/skills/prose/check.ts [paket|all]`
 *
 * Kurallar kardeş hatlarla aynı aileden; ikisi bu alana özgü:
 *
 * - **Tırnak içindeki KANIT çevrilmez.** Açıklamaların çoğu metinden bir
 *   cümle alıntılıyor: "„Wir essen um halb acht.“ — 19:30." Öğrencinin
 *   metinde göreceği şey o cümledir; İngilizcesi "at half past seven"
 *   deseydi bağ kopardı. Kapı, Türkçedeki her „…“ açıklığının İngilizcede
 *   BİREBİR durduğunu ölçüyor.
 *
 *   İlk yazımda buraya sınav hattının kuralı konmuştu — "doğru şık kökte
 *   görünmesin". Yanlıştı: `explain` cevaptan SONRA gösteriliyor, öğrenci
 *   çoktan cevaplamış oluyor ve ele verecek bir şey kalmıyor. Asıl risk
 *   tersi yöndeydi.
 * - **`intro` yönerge, cümle değil.** Egzersizin başındaki çerçeve
 *   öğrenciye ne yapacağını söylüyor; Türkçesi nokta ile bitmiyorsa
 *   İngilizcesi de bitmemeli — son noktalama pariteleri bunu zaten
 *   ölçüyor, burada ayrıca uzunluk sapması uyarı veriyor.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { proseWork } from "./make.js";
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
/** Harfe bitişik olmayan sayılar; A1, B2 gibi kodlar miktar değildir. */
const numbers = (t: string): string[] =>
  [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();
/**
 * Açıklık TÜRKÇE mi? Öyleyse alıntı değil, vurgudur ve çevrilir.
 *
 * İlk ölçüt yalnız Türkçeye özgü harflere bakıyordu (ı, ş, ğ, İ) ve
 * "Almancada gecikme „sahip olunur“" satırında yanıldı: o açıklıkta özel
 * harf yok ama Türkçe. Kapalı bir işlev sözcüğü listesi eklendi.
 *
 * Liste eksik kalabilir ve o zaman kapı yanlışlıkla "alıntı düşmüş" der —
 * yani YANLIŞ RET. Bu hattaki takas kasten bu yönde: yanlış ret bir satırı
 * elle bakmaya zorlar, yanlış kabul ise kanıt cümlesinin sessizce
 * çevrilmesine izin verirdi (`contains-checker-tradeoffs`in tersi yön,
 * çünkü burada yanlış kabulün bedeli daha yüksek).
 */
const TR_WORDS =
  /\b(bir|ve|ile|için|değil|demek|var|yok|olur|olunur|olmak|gibi|daha|çok|ama|yani|kadar|sonra|önce)\b/i;
const turkish = (t: string): boolean => /[ışğİĞŞ]/.test(t) || TR_WORDS.test(t);

/**
 * Açıklık ALMANCA ya da İNGİLİZCE görünüyor mu? Kural ancak öyleyse
 * işletiliyor.
 *
 * Olumsuz ölçüt tek başına yetmedi: "Önce „siz misiniz“, sonra ad…"
 * satırındaki açıklıklarda ne Türkçeye özgü harf var ne de listedeki bir
 * işlev sözcüğü — ama ikisi de Türkçe. Olumlu ölçüt eklenince kural
 * yalnız TANIDIĞI dilde çalışıyor.
 *
 * İki ölçüt BİRLİKTE kullanılıyor ve sonuç kasten temkinli: tanıyamadığı
 * bir alıntıyı zorlamıyor. Burada kapı tek savunma hattı değil — yazan
 * taraf kuralı zaten biliyor ve kapının işi kaymayı yakalamak. Yanlış ret
 * ise doğru yazılmış bir satırı elle kurcalatıyor ve her turda tekrar
 * ediyor.
 */
const DE_WORDS =
  /\b(der|die|das|ein|eine|einen|ist|sind|war|nicht|kein|keine|und|mit|wir|ich|Sie|du|zu|auf|für|von|dem|den|im|am|bei|nach|vor|über|wie|was|wo|wer|bitte|hier|ja|nein|sehr|gut|noch|schon|aus|um|halb|man|sich|es)\b/;
const EN_WORDS = /\b(the|is|are|was|were|you|your|a|an|of|to|in|and|it|that|for|we|I|my|please|do|does|not)\b/;
const foreign = (t: string): boolean =>
  DE_WORDS.test(t) || EN_WORDS.test(t) || /[A-ZÄÖÜ][a-zäöüß]{2,}/.test(t);

/** Karşılaştırma için sadeleştirme — tırnak ve boşluk çeşitleri eşitlenir. */
const flat = (t: string): string =>
  String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\s+/g, " ").trim();

/* Kapsam ALINTILARI SAYMIYOR: onların karşılığı kendileri ve sözlüğe
   `apply` adımında birim eşleme olarak giriyor. Pakete hiç girmedikleri
   için burada da beklenmiyorlar. */
const src = new Map(proseWork().map((r) => [r.kind + "|" + r.tr, r]));

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
      const row = src.get(key);
      if (!row) H("pakete ait değil");
      const en = String(r.en ?? "").trim();
      if (!en) H("karşılık boş");
      else if (row) {
        if (end(r.tr) !== end(en)) H(`son noktalama uyuşmuyor: «${end(r.tr)}» → «${end(en)}»`);
        const a = numbers(r.tr).join(","), b = numbers(en).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);
        /* Türkçe alıntı taşıyorsa İngilizcede de birebir durmalı. Yalnız
           „…“ ve "…" ölçülüyor: '…' Türkçe sözcük vurgulamak için de
           kullanılıyor ("indem 'nasıl' sorusuna cevap verir"). */
        for (const m of r.tr.matchAll(/[„"]([^„"“”]{2,})[“"]/g)) {
          if (turkish(m[1]) || !foreign(m[1])) continue;
          if (!flat(en).includes(flat(m[1]))) H(`alıntı düşmüş: «${m[1].slice(0, 34)}»`);
        }
        if (en.length > r.tr.length * 2 + 20 || en.length * 2 + 20 < r.tr.length)
          U(`uzunluk çok sapıyor (${r.tr.length} → ${en.length})`);
        /*
          Yazım denetimi ALINTININ DIŞINA bakıyor. Tırnak içi kaynaktan
          geldiği gibi duruyor ve düzeltilmesi YASAK — „In den Bergen über
          1200 Meter“ Almanca bir cümle, `Meter` de Almanca sözcük; İngilizce
          kursun kendi egzersizinde geçen „analyze“ ve „color“ da öyle.
          Onları uyarı olarak bildirmek, düzeltilmemesi gereken üç satırı
          her koşuda tekrar göstermek demekti; asıl uyarılar da o gürültüde
          kayboluyordu.
        */
        for (const h of usSpelling(en.replace(/[„"][^„"“”]*[“"]/g, " "))) U(`Amerikan yazımı ${h}`);
      }
      written.set(key, en);
    }
  }

let coverage: { rows: number; missing: number } | null = null;
if (ARG === "all") {
  const rows = proseWork();
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
process.exit(errors.length ? 1 : 0);
