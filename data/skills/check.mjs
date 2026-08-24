/**
 * Beceri sözlükçesi paketlerini denetler: `node data/skills/check.mjs de-001`
 *
 * Argüman bir paket adı, bir kurs öneki (`de`, `zh`) ya da `all` olabilir.
 *
 * Kelime hattındaki denetleyicinin kardeşi ama iki farkla:
 *
 *   - Burada "cümle kelimeyi içeriyor mu" yerine "**metin** kelimeyi içeriyor
 *     mu" sorusu var ve metin bir paragraf. Aynı `contains` mantığı yeniden
 *     yazılmıyor, kelime hattındaki denetleyiciden içe aktarılıyor: iki kopya
 *     olsaydı biri diğerinden sapar ve hangisinin doğru olduğu belli olmazdı.
 *   - Havuzla çelişki **hata değil uyarı**. Sözlükçenin işi metindeki anlamı
 *     vermek; alışveriş ilanındaki `das Angebot` havuzdaki "teklif" değil
 *     "indirim"dir. Çelişki bilinçli olabilir, o yüzden gösteriliyor ama
 *     durdurmuyor.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { contains } from "../meanings/contains.mjs";

const ROOT = new URL("../..", import.meta.url).pathname;
const ARG = (process.argv[2] || "all").toLowerCase();
const IN = `${ROOT}data/skills/in`;
const OUT = `${ROOT}data/skills/out`;

const TR_HARF = /[ıİğĞşŞ]/;

/**
 * Madde bir **şablon** mu?
 *
 * Şablonlarda ("mein Sohn / meine Tochter …", "Sehr geehrte Frau …,") çeviri
 * Almancadaki çizgiyi, üç noktayı ve virgülü yansıtır; orada virgül çok
 * anlamlılık işareti değil. Aynı maddeler metinde de birebir geçmez, parça
 * parça geçer.
 *
 * Ölçüt Almanca başlığın **kendi** noktalaması. Önce "boşluk varsa şablondur"
 * denmişti ve bu artikelli her ismi ("die Wohnung") kapsıyordu — yani
 * sözlükçenin çoğunda iki denetim birden sessizce kapalıydı. Pilot paketi
 * üreten ajan fark etti.
 */
const sablonMu = (de) => /[…/,]/.test(de);

function denetle(paket) {
  const src = JSON.parse(readFileSync(`${IN}/${paket}.json`, "utf8"));
  const hatalar = [];
  const uyarilar = [];
  if (!existsSync(`${OUT}/${paket}.json`)) return { paket, yok: true, hatalar, uyarilar };

  let out;
  try {
    out = JSON.parse(readFileSync(`${OUT}/${paket}.json`, "utf8"));
  } catch (e) {
    return { paket, hatalar: [`  [bozuk json] ${e.message}`], uyarilar, alan: 0 };
  }
  if (!Array.isArray(out)) return { paket, hatalar: ["  [bozuk json] dizi değil"], uyarilar, alan: 0 };

  const byId = new Map(out.map((r) => [r.id, r]));
  const eksik = src.egzersizler.filter((e) => !byId.has(e.id)).map((e) => e.id);
  if (eksik.length) hatalar.push(`  [eksik egzersiz] ${eksik.join(", ")}`);
  const fazla = out.map((r) => r.id).filter((id) => !src.egzersizler.some((e) => e.id === id));
  if (fazla.length) hatalar.push(`  [pakete ait olmayan] ${fazla.join(", ")}`);

  let alan = 0;
  for (const e of src.egzersizler) {
    const r = byId.get(e.id);
    if (!r) continue;
    const H = (etiket, mesaj) => hatalar.push(`  [${etiket}] ${e.id} — ${mesaj}`);
    const U = (etiket, mesaj) => uyarilar.push(`  [${etiket}] ${e.id} — ${mesaj}`);

    for (const alanAdi of ["gloss", "phrases", "targets", "tasks"]) {
      const kaynak = e[alanAdi];
      if (!kaynak?.length) continue;
      const uretilen = r[alanAdi];
      if (!Array.isArray(uretilen) || uretilen.length !== kaynak.length) {
        H("eksik alan", `${alanAdi}: ${kaynak.length} beklendi, ${uretilen?.length ?? 0} geldi`);
        continue;
      }

      for (let i = 0; i < kaynak.length; i++) {
        const k = kaynak[i];
        const u = uretilen[i];
        alan++;
        if (u?.de !== k.de) {
          H("başlık değişmiş", `${alanAdi}[${i}]: "${k.de}" → "${u?.de}"`);
          continue;
        }
        const tr = (u.tr ?? "").trim();
        const en = (u.en ?? "").trim();
        if (!tr) H("boş tr", `${k.de}`);
        if (!en) H("boş en", `${k.de}`);
        if (TR_HARF.test(en)) H("dil karışması", `${k.de}: en alanında Türkçe harf "${en}"`);
        if (/[()[\]]/.test(tr)) H("parantezli tr", `${k.de} → "${tr}" — açıklama note, HD biçimi hd alanına`);
        if (/[()[\]]/.test(en)) H("parantezli en", `${k.de} → "${en}"`);

        // Cümle çevirilerinde tek karşılık kuralı geçmez; kelime ve
        // kalıplarda geçer, ama kalıbın kendi içinde çizgi olabilir.
        if (alanAdi !== "tasks" && !sablonMu(k.de)) {
          if (/,/.test(tr)) H("çok anlamlı tr", `${k.de} → "${tr}"`);
          if (/,/.test(en)) H("çok anlamlı en", `${k.de} → "${en}"`);
        }

        // Havuzla çelişki: hata değil, bilinçli olabilir.
        if (k.havuz && tr.toLocaleLowerCase("tr-TR") !== k.havuz.tr.toLocaleLowerCase("tr-TR"))
          U("havuzdan farklı", `${k.de}: "${tr}" ↔ havuz "${k.havuz.tr}"`);

        if (u.hd && src.course !== "gsw-zh") U("gereksiz hd", `${k.de}: hd yalnızca Züritüütsch'te`);
        if (u.note && u.note.length > 90) U("uzun note", `${k.de}: ${u.note.length} karakter`);
      }
    }

    // Sözlükçe kelimesi metinde gerçekten geçiyor mu?
    if (e.metin) {
      for (const g of e.gloss ?? []) {
        if (sablonMu(g.de)) continue; // şablonlar metinde parça parça geçer
        if (!contains(e.metin, g.de)) U("metinde yok", `"${g.de}" egzersiz metninde bulunamadı`);
      }
    }
  }

  return { paket, hatalar, uyarilar, alan };
}

const hepsi = readdirSync(IN)
  .filter((f) => f.endsWith(".json") && !f.startsWith("_"))
  .map((f) => f.replace(/\.json$/, ""))
  .sort();
const secili = ARG === "all" ? hepsi : hepsi.filter((p) => p === ARG || p.startsWith(`${ARG}-`));
if (!secili.length) {
  console.error(`"${ARG}" ile eşleşen paket yok.`);
  process.exit(1);
}

let hata = 0;
let uyari = 0;
let bekleyen = 0;
let alan = 0;
for (const p of secili) {
  const r = denetle(p);
  if (r.yok) {
    bekleyen++;
    if (secili.length === 1) console.log(`${p}: çıktı yok`);
    continue;
  }
  hata += r.hatalar.length;
  uyari += r.uyarilar.length;
  alan += r.alan;
  if (r.hatalar.length || r.uyarilar.length) {
    console.log(`\n${p}  (${r.alan} alan)`);
    r.hatalar.forEach((h) => console.log(h));
    r.uyarilar.slice(0, 25).forEach((u) => console.log(u));
    if (r.uyarilar.length > 25) console.log(`  … ve ${r.uyarilar.length - 25} uyarı daha`);
  } else if (secili.length === 1) {
    console.log(`${p}: ${r.alan} alan, temiz.`);
  }
}

console.log(
  `\nözet: ${secili.length - bekleyen}/${secili.length} paket üretilmiş, ${alan} alan · ${hata} hata · ${uyari} uyarı`,
);
process.exit(hata ? 1 : 0);
