/**
 * Deneme kâğıdı metinlerinin İngilizcesini denetler:
 *   `npx tsx --tsconfig scripts/tsconfig.e2e.json data/mock-exams/prose/check.ts [paket|all]`
 *
 * Ortak kurallar kardeş hatların aynısı — son noktalama, sayı, karakter
 * kümesi, Almanca kanıtın korunması, uzunluk sapması, İngiliz yazımı,
 * mükerrer satır, kapsam. Sözcük sınırı ölçütü de aynı Unicode biçiminde:
 * `\b` ASCII harfe göre çalışıyor ve `\bortaç\b`, `\büber\b`, `\bçok\b`
 * gibi girdiler onunla HİÇ eşleşmiyordu (beceri hattında ölçüldü).
 *
 * Bu hatta ÖZGÜ iki kural:
 *
 * - **`explain` doğru cevabı ele vermez ama METNİ gösterir.** Açıklama
 *   sınav sırasında değil dökümde okunuyor, yani cevabı söylemesi zaten
 *   işi. Ama metinden alıntıladığı parça birebir durmak zorunda: öğrenci
 *   onu kâğıtta arayacak.
 * - **`genreTr` bir ETİKET, cümle değil.** Karşılığı kısa kalmalı; iki
 *   katından uzun bir "tür" satırı yanlış alana yazılmış demektir.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { extractMock, type MockRow } from "./make.js";
import { usSpelling } from "../../lessons/spelling.mjs";

const DIR = new URL(".", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();

const errors: string[] = [];
const warnings: string[] = [];
const written = new Map<string, string>();

const end = (t: string): string => {
  const m = String(t).trim().slice(-1);
  return /[.!?:…,;]/.test(m) ? m : "—";
};
const numbers = (t: string): string[] =>
  [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).sort();
/* Üç nokta bu hatta da BOŞLUK işareti olabiliyor ("Sana … öneriyorum");
   yanındaki noktalama onunla birlikte gidiyor. Gerekçenin tamamı
   `data/skills/task/check.ts`te. */
const slots = (t: string): string => t.replace(/[\s:,;]*…[\s:,;]*/g, "");

const TR_WORDS =
  /(?<!\p{L})(?:bir|ve|ile|için|değil|demek|var|yok|olur|olmak|gibi|daha|çok|ama|yani|kadar|sonra|önce|hâli|biçim|biçimi|yerine|zaman|yer|yön|ya|nerede|hangi|kim|nasıl|doğru|yanlış)(?!\p{L})/iu;
const TR_TERMS =
  /(?<!\p{L})(?:mastar|ortaç|isim|fiil|zamir|özne|nesne|tekil|çoğul|edat|kip|ek|sıfat|zarf|cümle|metin|sözcük|kelime|soru|cevap)(?!\p{L})/iu;
/*
  ÖZEL HARFSİZ TÜRKÇE. "Teknolojiye ayak uyduramayan kendi kabahati.",
  "Mülkiyet: yetki mi, müzakere mi?" ve "Sunumun neresi iyiydi, neden?"
  baştan sona Türkçe ama hiçbirinde ne ı/ş/ğ var ne de yukarıdaki iki
  listeden bir sözcük. Olumlu ölçütteki büyük-harf kuralı ("Teknolojiye",
  "Mülkiyet") onları yabancı saydı ve kapı, Türkçe iddianın İngilizcede
  BİREBİR durmasını — yani ÇEVRİLMEMESİNİ — istedi. Yanlış ret burada
  satırı elle baktırmakla kalmıyor, yanlış olanı dayatıyordu.

  Önce ters yönden denendi: büyük-harf ölçütünü yalnız kısa açıklıklara
  (≤3 sözcük) bırakmak. Ölçüldü ve BIRAKILDI — üç yanlışı düzeltirken
  "Ich backe zwei Kuchen", "Die Zeit bleibt gleich" gibi 107 gerçek
  Almanca açıklığı denetim dışına çıkarıyordu. Uzun Almanca açıklıkların
  çoğunda listedeki işlev sözcüklerinden biri yok; onları ayakta tutan
  tek şey adların büyük harfi.

  Kalan çare Türkçe tarafını büyütmek. Buradakiler ne Almancada ne
  İngilizcede geçiyor; soru eki (`mi`, `mu`, `mü`) ayrı yazıldığı için
  tek başına da yakalanıyor.

  Sonradan bir dördüncüsü çıktı: "(hat, saat, tarih, durak)" — bir sefer
  seferi tarif eden dört Türkçe sözcük. Onu Almanca yapan `hat`ti;
  Türkçede "sefer hattı", Almancada "sahiptir". Tek bir eşsesli sözcük
  bütün açıklığı kanıt saymaya yetiyor, o yüzden listeye özel harfi
  olmayan sık Türkçe adlar da girdi.

  Ölçüldü — kanıt sayılan 2.988 açıklıktan tam 4'ü düşüyor ve dördü de
  yukarıdaki satırlar; tek bir gerçek Almanca açıklık denetim dışında
  kalmıyor.
*/
const TR_PLAIN =
  /(?<!\p{L})(?:kendi|kendine|kendini|bunu|onu|şunu|herkes|hepsi|mi|mu|mü|neden|niçin|ancak|hem|üzerine|konusunda|olarak|göre|saat|tarih|durak|adres|gün|konu|süre|tutar|fiyat|bina|oda|kat|hitap|veda)(?!\p{L})/iu;
/**
 * KESME İŞARETİYLE BAĞLANAN TÜRKÇE EK — sözcük listesi değil, yapı.
 *
 * "(A2'de Perfekt beklenir)" karma bir açıklık: `Perfekt` Almanca,
 * gerisi Türkçe. Büyük harf ölçütü onu bütünüyle Almanca saydı ve kapı
 * Türkçe fiilin de İngilizceye geçmemesini istedi.
 *
 * Türkçe yabancı bir ada ek getirirken kesme işareti kullanıyor:
 * `A2'de`, `Nordkasse'de`, `Jonas'a`. Bu yapı ne Almancada var ne de
 * İngilizcede — İngilizcenin kısaltmaları (`'s`, `'t`, `'ve`, `'ll`)
 * listedeki eklerin hiçbiriyle çakışmıyor. Sözcük saymaktan farklı
 * olarak bu ölçüt yeni kâğıtlarda da çalışır.
 */
const TR_SUFFIX =
  /['’](?:de|da|te|ta|den|dan|ten|tan|ye|ya|yi|yı|yu|yü|nin|nın|nun|nün|in|ın|un|ün|le|la|yle|yla|dir|dır|dur|dür|e|a|i|ı|u|ü)(?!\p{L})/iu;
const turkish = (t: string): boolean =>
  /[ışğİĞŞ]/.test(t) ||
  TR_WORDS.test(t) ||
  TR_TERMS.test(t) ||
  TR_PLAIN.test(t) ||
  TR_SUFFIX.test(t);
const DE_WORDS =
  /(?<!\p{L})(?:der|die|das|ein|eine|einen|einem|ist|sind|war|nicht|kein|keine|und|mit|wir|ich|Sie|du|zu|auf|für|von|dem|den|im|am|bei|nach|vor|über|wie|was|wo|wer|bitte|hier|ja|nein|sehr|gut|noch|schon|aus|um|halb|man|sich|es|habe|hat|haben|werden|wird|wurde|worden|muss|müssen|kann|können|soll|sollen|will|wollen|würde|hätte|wäre)(?!\p{L})/u;
const EN_WORDS =
  /(?<!\p{L})(?:the|is|are|was|were|you|your|a|an|of|to|in|and|it|that|for|we|I|my|please|do|does|not)(?!\p{L})/u;
/* ö ve ü Almancayı İŞARETLEMEZ — Türkçe onları paylaşıyor; yalnız ä ve ß
   Türkçede hiç yok. Beceri hattında ölçüldü: bu iki harfin tek başına
   yabancı saydığı açıklıkların yarısı Türkçeydi. */
const foreign = (t: string): boolean =>
  DE_WORDS.test(t) || EN_WORDS.test(t) || /[A-ZÄÖÜ][a-zäöüß]{2,}/.test(t) || /[äßÄ]/.test(t);

const flat = (t: string): string =>
  String(t).replace(/[„“”‚‘’'"]/g, "'").replace(/\s+/g, " ").trim();

/**
 * Almanca kanıt açıklıkları: „…“, «…» ve (…). Türkçe olanlar elenir.
 *
 * « » KARDEŞ HATLARDA YOKTU ve buradaki kaynak onu kullanıyor:
 * "«Fahrkarte» için bir soru kur." Kapı ilk koşuda 62 hata verdi ve hepsi
 * aynı sebeptendi — karakter kümesinde de yoktu. İkisi birlikte düzeltildi:
 * ayraç karakterleri kümeye girdi, İÇİ de kanıt sayıldı. İkincisi olmadan
 * „…“ ile «…» aynı işi gören iki ayraç olurdu ama yalnız biri denetlenirdi.
 */
const evidence = (t: string): string[] => {
  const out: string[] = [];
  for (const m of t.matchAll(/[„"«]([^„"“”«»]{2,})[“"»]/g)) out.push(m[1]);
  for (const m of t.matchAll(/\(([^()]{2,})\)/g)) out.push(m[1]);
  return out.filter((s) => !turkish(s) && foreign(s));
};
const strip = (en: string, tr: string): string => {
  let out = en;
  for (const span of evidence(tr)) out = out.split(span).join(" ");
  return out;
};

const src = new Map(extractMock().map((r) => [r.kind + "|" + r.tr, r]));

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
      const row: MockRow | undefined = src.get(key);
      if (!row) H("pakete ait değil");
      const en = String(r.en ?? "").trim();
      if (!en) H("karşılık boş");
      else if (row) {
        const [eTr, eEn] = r.tr.includes("…") ? [slots(r.tr), slots(en)] : [r.tr, en];
        if (end(eTr) !== end(eEn)) H(`son noktalama uyuşmuyor: «${end(eTr)}» → «${end(eEn)}»`);
        const a = numbers(r.tr).join(","), b = numbers(en).join(",");
        if (a !== b) H(`sayılar uyuşmuyor: «${a}» → «${b}»`);

        /*
          KAYNAKTAN GELEN İŞARETLER. Kümeye üç şey sonradan girdi ve
          üçünde de gerekçe aynı: Türkçe dizede zaten var, İngilizcede de
          durmak zorunda.

            §   tüzük maddesi — "§1", "§3"; 32 dizede geçiyor
            á   Çekçe bir soyadı — "Herr Dostál"
            ²   metrekare — "m²"

          Ölçüldü: kaynağın tamamında kümenin dışında kalan başka
          karakter YOK (Türkçeye özgü harfler hariç, onlar kasten dışarıda
          — kanıt açıklıkları `strip` ile zaten çıkarılıyor, geriye kalan
          Türkçe harf çevrilmemiş demektir).
        */
        for (const ch of strip(en, r.tr))
          if (!/[ -~ÄÖÜäöüßéá²·×‚„“”‘’«»–—…→↔€§]/.test(ch))
            H(`beklenmedik karakter: «${ch}» (U+${ch.codePointAt(0)?.toString(16).toUpperCase().padStart(4, "0")})`);

        for (const span of evidence(r.tr))
          if (!flat(en).includes(flat(span))) H(`Almanca kanıt düşmüş: «${span.slice(0, 34)}»`);

        if (flat(en) === flat(r.tr) && turkish(r.tr)) H("karşılık Türkçenin aynısı");

        /* Tür etiketi cümle değil: iki katından uzun bir karşılık yanlış
           alana yazılmış demektir. */
        if (row.kind === "genreTr" && en.length > r.tr.length * 2 + 10)
          H(`tür etiketi cümleye dönmüş (${r.tr.length} → ${en.length})`);

        if (en.length > r.tr.length * 2 + 20 || en.length * 2 + 20 < r.tr.length)
          U(`uzunluk çok sapıyor (${r.tr.length} → ${en.length})`);

        /* Yazım denetimi yalnız yazanın SEÇTİĞİ sözcüklere bakıyor:
           kaynaktan taşınan Almanca örnekler (Meter, Kilometer) yargılanmaz. */
        const carried = new Set(r.tr.split(/[^\p{L}-]+/u).filter(Boolean));
        const chosen = strip(en, r.tr)
          .split(/([^\p{L}-]+)/u)
          .filter((w) => !carried.has(w))
          .join(" ");
        for (const h of usSpelling(chosen)) U(`Amerikan yazımı ${h}`);
      }
      written.set(key, en);
    }
  }

let coverage: { rows: number; missing: number } | null = null;
if (ARG === "all") {
  const rows = extractMock();
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
