/**
 * Paketi yazar: `node data/mock-exams/prose/write.mjs <paket> [--de] < satirlar.txt`
 * Bir satır bir dize; çok satırlı dizeler için ayraç `%%` (aşağıda).
 * `--de` Almanca tarafı yazar (`in-de/` → `out-de/`).
 *
 * Anahtar paket dosyasından kopyalanıyor; yazan taraf yalnız metni veriyor.
 * Sözlükçe hattında anahtarı elle yazınca elli maddenin otuz altısı
 * tutmamıştı.
 *
 * SATIR SAYISI TUTMAZSA NEREDE KAYDIĞINI DA SÖYLÜYOR. Bu hatta kayma
 * ölçütü iki kanıt açıklığına birden bakıyor — „…“ VE (…) — çünkü Almanca
 * kanıtın iki taşıyıcısı var: 462 satır tırnakta, 385 satır parantezde.
 * Yalnız tırnağa bakan bir ölçüt `free.checklist` paketlerinde hiçbir şey
 * bulamazdı; o türün kanıtı hep parantezde ("(Ich heiße …)").
 *
 * İKİ ÖLÇÜT VAR ve ikincisi dilden bağımsız: SAYI PARİTESİ. Türkçe satırdaki
 * harfe bitişik olmayan sayılar İngilizcede de aynen durmak zorunda; ilk
 * tutmadığı yer kaymanın başladığı yerdir. `build.tr` paketlerinde alıntı
 * açıklığı neredeyse hiç yok (cümleler kısa ve tırnaksız), o yüzden orada
 * tek çalışan ölçüt bu — t-017'de eksik satırı yalnız o buldu.
 *
 * ÜÇÜNCÜ ÖLÇÜT UZUNLUK KORELASYONU ve o da dilden bağımsız: bir satır
 * eksikse o noktadan sonra her İngilizce satır BİR SONRAKİ Türkçenin
 * karşılığıdır, yani kayık hizaya uzunluk olarak daha çok benzer. Üç satır
 * üst üste böyleyse kayma orada GÖRÜNÜR olmuştur — başlangıcı daha yukarıda
 * olabilir ve ileti bunu söylüyor. t-019'da gerçek eksik 130. satırdaydı,
 * ölçüt 139'u gösterdi: aradaki dokuz satır birbirine yakın uzunlukta uzun
 * cümlelerdi, sinyal ancak kısa ipuçları başlayınca yükseldi. Yine de
 * yaklaşık bir yer, hiç yerden iyidir; ilk iki ölçüt orada susmuştu — 58. satırdan sonra hiç sayı yok, `build.tr` cümlelerinde de
 * alıntı yok — eksik satırı yalnız bu bulurdu.
 *
 * ALINTI ÖLÇÜTÜ DAR: açıklık ancak TARTIŞMASIZ Almanca görünüyorsa (ä/ß
 * taşıyor ya da büyük harfle başlayan bir sözcüğü var) kullanılıyor. İlk yazımda ölçüt
 * yalnız Türkçeye özgü harfleri atlıyordu ve t-004'te YANLIŞ satırı
 * gösterdi: „hep dürüst ol“ Türkçe ama ı/ş/ğ taşımıyor. Teşhis aracının
 * yanlış yeri göstermesi, hiçbir şey göstermemesinden kötü.
 *
 * Kapıdaki `foreign()` ile aynı olmak ZORUNDA DEĞİL — bu bir kural değil,
 * teşhis. Orada ölçüt geniş tutulup yanlış ret pahasına kanıt korunuyor;
 * burada dar tutulup yanlış işaret önleniyor.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const DIR = new URL(".", import.meta.url).pathname;
const packet = process.argv[2];
if (!packet) throw new Error("paket adı gerekli");

/* İKİ PARİTE. `--de` Almanca tarafı yazar (`in-de/` → `out-de/`); bayraksız
   İngilizce tarafı (`in/` → `out/`). Kapı da aynı bayrağı alıyor. */
const SUFFIX = process.argv.includes("--de") ? "-de" : "";

const src = JSON.parse(readFileSync(`${DIR}in${SUFFIX}/${packet}.json`, "utf8"));
const raw = readFileSync(0, "utf8");

/* ÇOK SATIRLI DİZE. Tek başına `%%` duran bir satır varsa kayıt ayracı O
   olur ve satır sonları dizenin İÇİNDE kalır; boş satır da korunur, çünkü
   kaynakta paragraf ayracı o. `%%` yoksa eski davranış aynen sürüyor.
   Gerek OLDU: İngilizce kursun 6.828 dizesinde 86 satır sonu var (ilan,
   e-posta taslağı, tablo) ve bir satır bir dize kuralı orada çalışmaz. */
const lines = /^%%$/m.test(raw)
  ? raw.split(/^%%$/m).map((r) => r.replace(/^\s+|\s+$/g, "")).filter(Boolean)
  : raw.split("\n").map((l) => l.trim()).filter(Boolean);

if (lines.length !== src.words.length) {
  const flat = (t) => String(t).replace(/[„“”‚‘’]/g, '"').replace(/\s+/g, " ").trim();
  const spans = (t) => [
    ...[...String(t).matchAll(/[„"]([^„"“”]{4,})[“"]/g)].map((m) => m[1]),
    ...[...String(t).matchAll(/\(([^()]{4,})\)/g)].map((m) => m[1]),
  ];
  const german = (s) => /[äßÄ]/.test(s) || /[A-ZÄÖÜ][a-zäöüß]{2,}/.test(s);
  const nums = (t) => [...String(t).matchAll(/(?<!\p{L})\d+/gu)].map((m) => m[0]).join(",");
  let at = null;
  let why = "";
  for (let i = 0; i < src.words.length && at === null; i++) {
    if (nums(src.words[i].tr) !== nums(lines[i] ?? "")) {
      at = i;
      why = "sayı";
    }
    for (const s of spans(src.words[i].tr)) {
      if (/[ışğİĞŞ]/.test(s) || !german(s)) continue;
      if (!flat(lines[i] ?? "").includes(flat(s))) {
        at = i;
        why = "kanıt";
      }
    }
  }
  /* Uzunluk korelasyonu: kayık hizanın üç satır üst üste daha iyi oturduğu
     ilk yer. Eşik (12 karakter) gürültüyü eliyor; çeviri uzunluğu tek
     satırda kolayca sapıyor, üç satırda sapmıyor. */
  if (at === null)
    for (let i = 0; i + 3 < src.words.length && at === null; i++) {
      let n = 0;
      for (let k = 0; k < 3; k++) {
        const en = (lines[i + k] ?? "").length;
        const same = Math.abs(en - String(src.words[i + k].tr).length);
        const next = Math.abs(en - String(src.words[i + k + 1]?.tr ?? "").length);
        if (next + 12 < same) n++;
      }
      if (n === 3) {
        at = i;
        why = "uzunluk";
      }
    }

  throw new Error(
    `${packet}: ${src.words.length} satır bekleniyor, ${lines.length} geldi` +
      (at === null
        ? ""
        : `\n  kayma ${why === "uzunluk" ? `en geç ${at + 1}. satırda GÖRÜNÜR oluyor (uzunluk ölçütü — başlangıcı daha yukarıda olabilir)` : `${at + 1}. satırda başlıyor (${why} ölçütü)`}:` +
          `\n    tr: ${src.words[at].tr}\n    en: ${lines[at] ?? "(yok)"}`),
  );
}

const out = src.words.map((w, i) => ({ tr: w.tr, kind: w.kind, en: lines[i] }));
mkdirSync(`${DIR}out${SUFFIX}`, { recursive: true });
writeFileSync(
  `${DIR}out${SUFFIX}/${packet}.json`,
  `[\n${out
    .map((r) => ` { "tr": ${JSON.stringify(r.tr)}, "kind": ${JSON.stringify(r.kind)}, "en": ${JSON.stringify(r.en)} }`)
    .join(",\n")}\n]\n`,
);
console.log(`${packet}: ${out.length} dize yazıldı`);
