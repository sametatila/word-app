/**
 * Dokunma hedefi denetimi: `node scripts/check-hit-target.mjs`
 *
 * NEDEN VAR. `globals.css`'teki `.hit-8` yardımcısının kendi yorumu ölçüyü
 * yazıyor: mobilde ikincil denetimler `hitSlop={8}` taşıyor ve "gerçek hedef
 * 36-50; webde hedef görünen boyutun kendisi. Yani en çok dokunulan ikincil
 * denetim webde sistematik olarak daha küçük bir hedef sunuyordu." Yardımcı bu
 * yüzden yazıldı - ama yalnız ALTI yerde kullanılıyordu, mobilde ise `hitSlop`
 * yirmi yerde.
 *
 * Ölçüm (2026-09-11), YALNIZ IKONLU (metinsiz) düğmeler:
 *   push-optin kapat       15 px ikon + p-1 =  23  → WCAG 2.2'nin 24'ünün ALTINDA
 *   league-board bildir    13 px ikon + p-1 =  21  → ALTINDA
 *   install-prompt kapat   16 px ikon + p-1 =  24  → sınırda
 *   voice-picker dinle     h-8            =  32  → mobil karşılığı hitSlop={8}
 *
 * EŞİK 36 ve kaynağı o yorumun kendisi: mobilin gerçek hedefi 36-50. `hit-8`
 * her eksende 8 px ekliyor, yani etkili hedef görünen + 16.
 *
 * Kapı yalnız IKONLU düğmeleri ölçüyor: metin taşıyan bir düğmenin hedefi
 * metnin kendi genişliği kadar ve sınıflardan hesaplanamaz. Orada ölçüm
 * yapmayan bir kapı yazmak, yazmamaktan kötüdür.
 *
 * MOBIL YARISI (2026-09-12, §11.429). Eşiğin kaynağı mobilin kendi ölçüsüydü
 * ("ikincil denetimler `hitSlop` ile 36-50") ama mobil HİÇ ÖLÇÜLMÜYORDU:
 * referans olduğu varsayılan taraf denetlenmiyordu. Ölçüldüğünde üç yerde
 * tutulmadığı çıktı — arama kutusunun temizleme ikonu çıplak 18 px (webde aynı
 * düğme 36) ve sınavın "dinle" düğmesi aynı ekranda iki ayrı boyda (30 ve 32).
 *
 * Mobilde ölçü biraz farklı hesaplanıyor: Tailwind sınıfı yok, boyut ya
 * `style`daki `width`/`height` ya da ikon boyutu + dolgu; `hitSlop={N}` her
 * eksende N ekliyor (etkili = görünen + 2N).
 *
 * IKINCI ÖLÇÜ — KLAVYE HEDEFİ (2026-09-11, §11.342). Dokunma hedefi bir
 * denetimin PARMAĞA ne kadar yer bıraktığını söylüyor; aynı denetimin
 * KLAVYEYE hiç yer bırakmaması ayrı ve daha sert bir kusur. `<div onClick>`
 * fareyle çalışır, Tab'la hiç sıraya girmez ve Enter'ı duymaz: o denetim
 * klavye kullanan biri için YOKTUR. Android'de karşılığı `Pressable`, ve
 * `Pressable` odağı da rolü de kendiliğinden taşıyor - yani bu sınıf hata
 * yalnız webde OLABİLİR. Ölçüm bugün 0 buldu; kapı o sıfırı tutuyor.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const ESIK = 36;
const mode = process.argv[2] ?? "--check";

/** Küçük kalması KABUL EDİLEN denetimler, sebepleriyle. */
const ALLOW = new Map([]);

function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + m.slice(p.length).replace(/[^\n]/g, " "));
}
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!/node_modules/.test(p)) walk(p, out); }
    else if (/\.tsx$/.test(e.name)) out.push(p);
  }
  return out;
}


/**
 * Açılış etiketinin bittiği yer — ilk `>` DEĞİL.
 *
 * İlk yazım `blok.indexOf(">")` diyordu ve `onClick={() => onReport(row)}`
 * içindeki OK İŞARETİNDE duruyordu: açılış etiketi yarım kalıyor, geri kalan
 * öznitelikler "içerik" sayılıyor, içerikte metin görünüyor ve düğme
 * "ölçülemez" diye sessizce atlanıyordu. Kapı yeşildi ve HİÇBİR ŞEY
 * ölçmüyordu - enjeksiyon (bir düğmeden `hit-8`i silmek) yakalanmayınca
 * ortaya çıktı.
 *
 * Doğrusu: süslü parantez derinliği sıfırken ve tırnak içinde değilken
 * gelen ilk `>`.
 */
function acilisiBitir(blok) {
  let derinlik = 0, tirnak = null;
  for (let i = 0; i < blok.length; i++) {
    const c = blok[i];
    if (tirnak) { if (c === tirnak && blok[i - 1] !== "\\") tirnak = null; continue; }
    if (c === '"' || c === "'" || c === "`") { tirnak = c; continue; }
    if (c === "{") derinlik++;
    else if (c === "}") derinlik--;
    else if (c === ">" && derinlik === 0) return i;
  }
  return -1;
}

/** Tailwind dolgusu: `p-1` → 4 px (0.25rem tabanı). */
function px(n) { return Math.round(Number(n) * 4); }

const bulgular = [];
/** Sinif listesi degiskenden gelen, yani olculemeyen dugme sayisi. */
let olculemez = 0;
/** OLCULEN dugme sayisi - "tamam" satirinda yaziyor: bu sayi sifira duserse
    kapi hicbir sey olcmuyor demektir ve "esigin altinda yok" bos bir dogru olur. */
let olculen = 0;

for (const abs of walk(path.join(ROOT, "src"))) {
  const rel = path.relative(ROOT, abs);
  const src = stripComments(fs.readFileSync(abs, "utf8"));
  const lines = src.split("\n");
  /* Açılış etiketinden kapanışına kadar. Yalnız `button`: `Link` ve `a`
     çoğunlukla metin taşıyor ve bu kapı metni ölçemez. */
  const re = /<(motion\.button|button)\b/g;
  let m;
  while ((m = re.exec(src))) {
    const kapanis = src.indexOf(`</${m[1]}>`, m.index);
    if (kapanis < 0) continue;
    const blok = src.slice(m.index, kapanis);
    const acilisSonu = acilisiBitir(blok);
    if (acilisSonu < 0) continue;
    const acilis = blok.slice(0, acilisSonu);
    const icerik = blok.slice(acilisSonu + 1);
    // IKONLU MU: tek bir <XIcon size={N} /> ve baska gorunur metin yok
    const ikon = icerik.match(/<[A-Z][A-Za-z]*Icon\b[^>]*\bsize=\{(\d+)\}/);
    if (!ikon) continue;
    /* IKONLU = ICERIGI YALNIZ ETIKETLERDEN OLUSAN dugme.
       Ilk yazim `{...}` ifadelerini de siliyordu ve `<Icon/> {t("etiket")}`
       bicimindeki METINLI dugmeler "ikonlu" sayiliyordu: `retry-button`in
       genis dugmesi "18 px" diye bildirildi. Etiketler cikarildiktan sonra
       geride bir sey kaliyorsa (metin ya da ifade) o dugme olculemez. */
    const metin = icerik
      .replace(/<[A-Za-z][^>]*\/>/g, " ")
      .replace(/<\/?[A-Za-z][^>]*>/g, " ")
      .trim();
    if (metin) continue;                       // metin de tasiyor: olculemez
    /* BOYUT SINIFTA DEGIL STILDEYSE OLCULEMEZ. `achievement-badge`in dugmesi
       11 px'lik bir ikon tasiyor ama ikon, genisligi `style={{ width: size }}`
       ile gelen 56-72 px'lik bir karonun icinde: kapi yalniz ikonu gorup
       "19 px" diyordu. Olcemedigi yeri bildiren kapi, komsuyu olcen kapinin
       kardesi - o yuzden bu durum sessizce DISARIDA kaliyor. */
    if (/style=\{\{[^}]*(?:width|height):/.test(icerik)) continue;
    const satir = src.slice(0, m.index).split("\n").length;
    /* SINIF LISTESI DEGISKENDEN GELIYORSA OLCULEMEZ. `user-action`
       `className={`btn btn-ghost ${size}`}` yaziyor: boyut `size`in icinde ve
       kapi onu bilemez. Olcemedigini bildirmek yerine sessizce gecmek dogru
       olan - ama kac tane oldugu asagida sayiliyor. */
    const clsHam = (acilis.match(/className=\{?[`"]([^`"]*)[`"]/) ?? [])[1];
    if (clsHam === undefined || /\$\{/.test(clsHam)) { olculemez++; continue; }
    const cls = clsHam;
    const slop = /\bhit-8\b/.test(acilis);
    let gorunen = Number(ikon[1]);
    const boy = cls.match(/\b(?:size|h)-(\d+(?:\.\d+)?)\b/);
    const dolgu = cls.match(/\bp-(\d+(?:\.\d+)?)\b/) ?? cls.match(/\bpy-(\d+(?:\.\d+)?)\b/);
    if (boy) gorunen = px(boy[1]);
    else if (dolgu) gorunen = Number(ikon[1]) + 2 * px(dolgu[1]);
    const etkili = gorunen + (slop ? 16 : 0);
    const muaf = (ALLOW.get(rel) ?? []).find(([parca]) => acilis.includes(parca));
    if (muaf) continue;
    olculen++;
    if (etkili < ESIK) {
      bulgular.push({ rel, satir, ikon: ikon[1], gorunen, etkili, slop, satirMetni: lines[satir - 1]?.trim().slice(0, 90) });
    }
  }
}

/* ── MOBİL DOKUNMA HEDEFİ ───────────────────────────────────────────────
 * Aynı soru Android/iOS tarafında. Ölçülen yine YALNIZ ikonlu (metinsiz)
 * dokunulabilirler; metin taşıyan bir denetimin genişliği metnin kendisi
 * kadar ve `style`dan hesaplanamaz.
 */
const MOBIL_ETIKETLER = ["PressableScale", "Pressable", "TouchableOpacity", "TouchableHighlight"];
/** Küçük kalması KABUL EDİLEN mobil denetimler, sebepleriyle. */
const MOBIL_ALLOW = new Map([]);
const mobilBulgular = [];
let mobilOlculemez = 0;
let mobilOlculen = 0;

for (const abs of walk(path.join(ROOT, "mobile", "src"))) {
  const rel = path.relative(ROOT, abs);
  const src = stripComments(fs.readFileSync(abs, "utf8"));
  const lines = src.split("\n");
  for (const et of MOBIL_ETIKETLER) {
    const re = new RegExp("<" + et + "\\b", "g");
    let m;
    while ((m = re.exec(src))) {
      const son = acilisiBitir(src.slice(m.index));
      if (son < 0) continue;
      const acilis = src.slice(m.index, m.index + son + 1);
      /* Kendi kendine kapanan etiketin içeriği yok: ikon da yok, ölçülecek
         bir şey de yok. */
      if (/\/>$/.test(acilis)) continue;
      const kapanis = src.indexOf("</" + et + ">", m.index + son);
      if (kapanis < 0) continue;
      const icerik = src.slice(m.index + son + 1, kapanis);
      const ikon = icerik.match(/<[A-Z][A-Za-z]*(?:Icon|Glyph)\b[^>]*\bsize=\{(\d+)\}/);
      if (!ikon) continue;
      /* Metin de taşıyorsa ölçülemez (webdeki ile aynı kural). */
      if (/<(?:Text|RNText|Animated\.Text)\b/.test(icerik)) continue;
      const satir = src.slice(0, m.index).split("\n").length;
      const muaf = (MOBIL_ALLOW.get(rel) ?? []).find(([parca]) => acilis.includes(parca));
      if (muaf) continue;
      const slop = Number((acilis.match(/hitSlop=\{?(\d+)/) ?? [])[1] ?? 0);
      const w = (acilis.match(/\bwidth:\s*(\d+)/) ?? [])[1];
      const h = (acilis.match(/\bheight:\s*(\d+)/) ?? [])[1];
      const pv = (acilis.match(/paddingVertical:\s*(\d+)/) ?? [])[1];
      const ph = (acilis.match(/paddingHorizontal:\s*(\d+)/) ?? [])[1];
      const pad = (acilis.match(/\bpadding:\s*(\d+)/) ?? [])[1];
      /*
       * Görünen boyut:
       *   kutu verilmişse iki eksenin KÜÇÜĞÜ (hedef en dar eksen kadar),
       *   yoksa ikon + dolgunun küçük ekseni,
       *   ikisi de yoksa İKONUN KENDİSİ — RN dokunulabiliri içeriğine göre
       *   ölçüyor, yani hiçbir şey verilmemiş bir denetimin hedefi ikon
       *   kadardır.
       *
       * SON DAL SONRADAN EKLENDİ ve kapının en önemli dalı o. İlk yazımda
       * "hiçbir şey yok" durumu ÖLÇÜLEMEZ sayılıyordu; oysa bilgi hiç
       * verilmemiş bir denetim, fazla küçük olması EN OLASI olan denetimdir.
       * Enjeksiyon ortaya çıkardı: arama kutusunun çıplak 18 px'lik temizleme
       * ikonunu geri koyduğumda kapı bulgu değil "ölçülemez" dedi.
       *
       * Gerçekten ölçülemeyen tek durum boyutun BAŞKA yerden gelmesi:
       * `flex`, satır içi olmayan bir stil (`style={styles.x}` ya da bir
       * değişken) ya da genişliği veren bir dış kap. Orada komşuyu ölçmek
       * kapıyı yanlış yapar.
       */
      const stilSatirIci = /style=\{\{/.test(acilis);
      const stilVar = /\bstyle=/.test(acilis);
      const esnek = /\bflex:/.test(acilis) || /\balignSelf:\s*"stretch"/.test(acilis);
      let gorunen = null;
      if (w !== undefined && h !== undefined) gorunen = Math.min(Number(w), Number(h));
      else if (pv !== undefined || ph !== undefined || pad !== undefined) {
        const dy = 2 * Number(pv ?? pad ?? 0);
        const dx = 2 * Number(ph ?? pad ?? 0);
        gorunen = Number(ikon[1]) + Math.min(dy, dx);
      } else if (!esnek && (!stilVar || stilSatirIci)) gorunen = Number(ikon[1]);
      if (gorunen === null) { mobilOlculemez++; continue; }
      const etkili = gorunen + 2 * slop;
      mobilOlculen++;
      if (etkili < ESIK) {
        mobilBulgular.push({ rel, satir, ikon: ikon[1], gorunen, etkili, slop, satirMetni: lines[satir - 1]?.trim().slice(0, 90) });
      }
    }
  }
}

/* ── KLAVYE HEDEFİ ──────────────────────────────────────────────────────
 * Etkileşimli OLMAYAN bir etikette `onClick` varsa ve denetim ne bir rol ne
 * de `tabIndex` taşıyorsa klavyeden ulaşılamaz. `<a>` yalnız `href`siz
 * olduğunda sayılır (href'li bağ zaten odak sırasında); `<img>`/`<svg>` hiç
 * sayılmaz - onlar tıklanabilir olduklarında gerçek bir düğmenin İÇİNDE
 * duruyorlar, dıştaki düğme odağı taşıyor.
 */
const OLU_ETIKETLER = ["div", "span", "li", "section", "article", "p", "ul", "ol", "tr", "td", "label", "a"];
const klavyesiz = [];
for (const abs of walk(path.join(ROOT, "src"))) {
  const rel = path.relative(ROOT, abs);
  const src = stripComments(fs.readFileSync(abs, "utf8"));
  for (const ad of OLU_ETIKETLER) {
    for (let j = src.indexOf("<" + ad); j >= 0; j = src.indexOf("<" + ad, j + 1)) {
      /* `<div` ile `<divider` ayrimi: etiket adindan sonra harf/rakam gelmez. */
      if (/[A-Za-z0-9]/.test(src[j + 1 + ad.length] ?? "")) continue;
      const son = acilisiBitir(src.slice(j));
      if (son < 0) break;
      const acilis = src.slice(j, j + son + 1);
      if (!/\bonClick=/.test(acilis)) continue;
      if (/\brole=/.test(acilis) || /\btabIndex=/.test(acilis)) continue;
      if (ad === "a" && /\bhref=/.test(acilis)) continue;
      klavyesiz.push({ rel, satir: src.slice(0, j).split("\n").length, ad, metin: acilis.replace(/\s+/g, " ").slice(0, 90) });
    }
  }
}

if (mode === "--hits") {
  for (const b of bulgular) {
    console.log(`${b.rel}:${b.satir}  ikon ${b.ikon} · görünen ${b.gorunen} · etkili ${b.etkili}${b.slop ? " (hit-8 var)" : ""}`);
  }
  for (const b of mobilBulgular) {
    console.log(`${b.rel}:${b.satir}  ikon ${b.ikon} · görünen ${b.gorunen} · etkili ${b.etkili} (hitSlop ${b.slop})`);
  }
  for (const k of klavyesiz) console.log(`${k.rel}:${k.satir}  <${k.ad} onClick> klavyeden ulasilamaz`);
  console.log(`\nweb ${bulgular.length} · mobil ${mobilBulgular.length} · olculemeyen ${olculemez}+${mobilOlculemez} · klavyesiz ${klavyesiz.length}`);
} else if (bulgular.length || mobilBulgular.length || klavyesiz.length) {
  if (bulgular.length) {
    console.error(`check:hit — ikonlu düğmelerin dokunma hedefi ${ESIK} px'in altında:\n`);
    for (const b of bulgular) {
      console.error(`  ${b.rel}:${b.satir}  ikon ${b.ikon} · görünen ${b.gorunen} · etkili ${b.etkili}${b.slop ? " (hit-8 var)" : ""}`);
      console.error(`      ${b.satirMetni}`);
    }
    console.error("\n`hit-8` her eksende 8 px ekler (etkili = görünen + 16); mobil karşılığı `hitSlop={8}`.");
    console.error("Meşru bir istisnaysa betikteki ALLOW listesine SEBEBİYLE ekle.");
  }
  if (mobilBulgular.length) {
    console.error(`check:hit — MOBİL ikonlu dokunulabilirlerin hedefi ${ESIK} px'in altında:\n`);
    for (const b of mobilBulgular) {
      console.error(`  ${b.rel}:${b.satir}  ikon ${b.ikon} · görünen ${b.gorunen} · etkili ${b.etkili} (hitSlop ${b.slop})`);
      console.error(`      ${b.satirMetni}`);
    }
    console.error("\n`hitSlop={N}` her eksende N ekler (etkili = görünen + 2N); kutu vermek de olur.");
    console.error("Meşru bir istisnaysa betikteki MOBIL_ALLOW listesine SEBEBİYLE ekle.");
  }
  if (klavyesiz.length) {
    console.error("\ncheck:hit — klavyeden ulaşılamayan denetimler (etkileşimli olmayan etikette `onClick`):\n");
    for (const k of klavyesiz) {
      console.error(`  ${k.rel}:${k.satir}  <${k.ad} onClick>`);
      console.error(`      ${k.metin}`);
    }
    console.error("\nDoğrusu gerçek bir `<button type=\"button\">`; olmuyorsa `role` + `tabIndex={0}` + Enter/Space.");
  }
  process.exit(1);
} else {
  /* Sayılar çıkışta: "tamam" tek başına taramanın ÇALIŞTIĞINI söylemiyor. */
  console.log(
    `check:hit — web ve mobil ikonlu denetimlerin hepsinin dokunma hedefi ${ESIK} px ve üstü, ` +
      `tıklanan her denetim klavyeden de ulaşılabilir: tamam ` +
      `(ölçülen: ${olculen} web · ${mobilOlculen} mobil; ` +
      `ölçülemeyen: ${olculemez} web · ${mobilOlculemez} mobil)`,
  );
}
