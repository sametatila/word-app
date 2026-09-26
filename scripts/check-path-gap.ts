/**
 * PATİKA BOŞLUĞU — havuzda olup patikanın hiç öğretmediği sözcükler.
 *
 *   npm run check:pathgap            (iki kurs)
 *   npm run check:pathgap -- en      (tek kurs)
 *
 * NEDEN AYRI BİR RAPOR. `check:unitvocab` ve `check:en-unitvocab` bir
 * EGZERSİZİ ölçüyor ("bu metin penceresinin dışına çıkıyor mu"). Bu betik
 * PATİKAYI ölçüyor ("bu sözcük hiç öğretiliyor mu"). İkisinin kesiştiği yerde
 * ünite raporları KONUŞMASIZ sınıfını basıyor ve orası bir eğri değil bir liste
 * istiyor: yazarın sorusu "hangi sözcüğü hangi konuşmaya koyayım".
 *
 * SIRALAMA KULLANIMA GÖRE. Havuzun yarısı hiç öğretilmiyor ve hepsini konuşmaya
 * sokmak imkânsız (konuşma başına sekiz sözcük, sayı sabit). Ama bir sözcük
 * kursun KENDİ metinlerinde geçiyorsa öğrenci onunla zaten karşılaşıyor
 * demektir; öğretilmemesi orada gerçek bir boşluk. Liste o sıklığa göre
 * diziliyor — hiç geçmeyenler ayrı sayılıyor, onlar yalnız kart motorunun
 * işi ve sorun değil.
 *
 * SAYIM KURS GENELİ. Bir seviyenin satırındaki sıklık o seviyenin değil,
 * kursun TAMAMININ metinlerinden geliyor: A1 havuzundaki bir sözcük yalnız
 * B2 metninde geçiyorsa da öğrenci onunla karşılaşıyor demektir. (`Text`
 * kurs genelinde 230 kez geçiyor, A1 metinlerinde hiç.)
 *
 * EŞLEŞTİRME YAKLAŞIKTIR ve iki dilde ayrı: İngilizcede `enStems` (düzensiz
 * fiil, kısaltma, iyelik, türetme), Almancada kapının `kokAra`sı (ön ek
 * soyma + dört harfe kadar kısaltma). İkisi de ünite raporlarında kullanılan
 * ölçünün aynısı, yani iki rapor aynı sözcük için aynı cevabı veriyor.
 * Bilinen gürültü: İngilizcede kısaltma soyma `haven't`ı `haven` sözcüğüne
 * bağlıyor (C1'de ×25). Sayılar önceliklendirme içindir, bütçe için değil.
 *
 * "AYNI CEVAP" İKİ YERDE TUTMUYORDU (2026-09-22'de ölçüldü ve düzeltildi).
 * İngilizce kurs, ünite kapısının (`check-en-unit-vocab`) iki kuralını
 * atlıyordu ve boşluğu olduğundan büyük sayıyordu:
 *
 *   1. SERBEST SÖZCÜKLER. Burada her iki kursa da Almanca `SERBEST` listesi
 *      uygulanıyordu; İngilizcenin kendi listesi `EN_FREE` hiç okunmuyordu.
 *      Ünite kapısı havuzunu `new Set(EN_FREE)` ile kuruyor. Fark İngilizce
 *      kapalı sınıflarda görünüyordu: `either`, `neither`, `nor`, `below`,
 *      `around`, `during`, `except`, `toward` — hepsi `en-gate`de gerekçesiyle
 *      serbest ("temel edat listesi dilbilgisidir, öğretilecek sözcük değil")
 *      ama burada "hiç öğretilmeyen" diye sayılıyordu.
 *   2. GÖVDE. Kullanım tarafı `enStems` ile eşleşiyor, konuşma tarafı BİREBİR
 *      eşleşiyordu: patika `child` öğretse de havuzun `children` kaydı
 *      öğretilmemiş sayılıyordu. Ünite kapısı belirteci
 *      `enStems(w).some((st) => pool.has(st))` ile ölçüyor; buradaki konuşma
 *      kümesi de artık aynı soruyu soruyor. Etkisi (EN): a2 133→109,
 *      b1 229→179, b2 182→147, c1 43→35; kapsam a2 %68→71, b1 %43→50.
 *
 * Almanca tarafa dokunulmadı: oradaki `kokAra` zaten iki yönü de gövdeyle
 * eşliyor ve `SERBEST` o kursun kendi listesi.
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
import { sourceConversationsFor as conversationsFor } from "../src/lib/conversations/source";
import type { SkillExercise } from "../src/lib/skills/types";
import { germanSurface, englishSurface, type LooseExercise } from "./lib/skill-surface";
import { enStems, EN_FREE, LEVELS } from "./lib/en-gate";
// Bütçe deseni: iki yön birden — borç büyüyemez, kapsam düşemez. Gerekçe `lib/budget.ts`de.
import { butceUygula, butceBitir } from "./lib/budget";

const require = createRequire(import.meta.url);
const { kokAra, SERBEST, olc } = require("./lib/vocab-gate.cjs") as {
  kokAra: <T>(m: Map<string, T>, w: string) => T | undefined;
  SERBEST: Set<string>;
  olc: (ham: string, unit: number, ekIzin: string[], seviye: string) => { tok: string[]; disi: string[] };
};

/* Tek harfli parça atılıyor: havuz kaydı "U-turn" tirede bölününce "u" diye
   bir sözcük uyduruyor ve `enStems` "us"u ona indirgeyip B1 boşluğunun
   başına "u×120" yazıyordu. */
const kelime = (raw: string) =>
  raw
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .split(/[\s/,-]+/)
    /* NOKTALAMA DA DÜŞER (2026-09-22). Yalnız kesme işareti kırpılıyordu ve
       konuşma KALIPLARI cümle: "Was kann man hier sehen?" → `sehen?`. Böyle bir
       belirteç havuzun `sehen` kaydıyla eşleşmiyor ve kalıpta öğretilen sözcük
       "patika hiç öğretmiyor" diye sayılıyordu — Almanca listede `lesen`,
       `sehen`, `genau`, `rechnen` bu yüzden borç görünüyordu. */
    .map((w) => w.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ""))
    .filter((w) => w.length >= 2);

type Kurs = "de" | "en";

/** Havuz: sözcük → ilk göründüğü seviye.
 *
 * İNGİLİZ SÖZCÜKLERİ HAVUZDA, AMA ÖĞRETİLMESİ BEKLENENLERİN DIŞINDA
 * (2026-09-26, Samet'in kararı). Kurs Amerikan; havuz `flat`, `queue`,
 * `lift` gibi İngiliz sözcüklerini bilerek tutuyor ve kartta `usage: "brit"`
 * etiketiyle gösteriyor (378f9882). Konuşmalar onları öğretmiyor, çünkü
 * öğretmemeleri gerekiyor: Amerikan karşılığını öğretiyorlar. Bu satırlar
 * sayıldıkça kapsam, doğru yapılan her Amerikanlaştırmada DÜŞÜYORDU (A1
 * %99 → %97). Etiketli satır ne kapsamın paydasına ne boşluğa giriyor;
 * aynı sözcük etiketsiz başka bir satırda da varsa (`flat` = "düz") o
 * satır sayılmaya devam ediyor. */
function havuz(kurs: Kurs): Map<string, string> {
  const dosya = kurs === "en" ? "data/app/words-en.json" : "data/app/words.json";
  const ham = readFileSync(dosya, "utf8").trim();
  const rows: { de: string; niveau: string; usage?: string }[] = kurs === "en"
    ? ham.split("\n").filter(Boolean).map((l) => JSON.parse(l))
    : JSON.parse(ham);
  const m = new Map<string, string>();
  for (const r of rows) {
    if ((r.usage ?? "").split(/\s+/).includes("brit")) continue;
    const lv = r.niveau.toLowerCase();
    for (const w of kelime(r.de)) {
      const eski = m.get(w);
      if (eski === undefined || LEVELS.indexOf(lv) < LEVELS.indexOf(eski)) m.set(w, lv);
    }
  }
  return m;
}

/** Konuşma sözlükçesi: sözcük → öğretildiği ilk seviye. Kaynak `conversationsFor`. */
function konusmaSozlugu(kurs: Kurs): Map<string, string> {
  const m = new Map<string, string>();
  for (const l of conversationsFor(kurs)) {
    const lv = l.level.toLowerCase();
    const koy = (raw: string) => {
      for (const w of kelime(raw)) {
        const eski = m.get(w);
        if (eski === undefined || LEVELS.indexOf(lv) < LEVELS.indexOf(eski)) m.set(w, lv);
      }
    };
    for (const v of l.vocab) koy(v.de);
    for (const p of l.patterns) koy(p.de);
  }
  return m;
}

/**
 * Kursun kendi egzersiz metinlerinde sözcük sıklığı — KURS GENELİNDE, seviye
 * seviye değil. Soru "bu sözcük öğrenciye hiç görünüyor mu"; A1 havuzundaki
 * bir sözcük B2 metninde geçiyorsa da öğretilmemiş olması bir boşluktur.
 * Ölçüldü ve doğrulandı: `Text*` kurs genelinde 230, A1 metinlerinde 0.
 *
 * EGZERSİZİN KENDİ SÖZLÜKÇESİ AYRI SAYILIYOR (2026-09-22). Ünite kapılarının
 * ikisi de — `check-en-unit-vocab` `allowed()`, `check-unit-vocab` — egzersizin
 * `gloss` listesini havuza ekliyor, gerekçesi orada tek cümle: "Egzersizin
 * kendi sözlükçesi öğrenciye VERİLMİŞTİR." Burada o ayrım yoktu: sözlükçede
 * karşılığı verilen bir sözcük de "öğrenci bunu desteksiz görüyor" sayılıyordu.
 * Artık iki sayı birden dönüyor; bütçe `sozluksuz` olanı sayıyor, yani borç
 * "patika öğretmiyor VE hiçbir yerde karşılığı verilmiyor" demek. Yazma
 * görevinin `phrases`/`words` listeleri de sözlükçe sayılıyor (ünite kapısı
 * öyle sayıyor: öğrenci o sözcükleri görevin içinde karşılığıyla alıyor).
 */
type Kullanim = { toplam: Map<string, number>; sozluksuz: Map<string, number> };
function kullanim(kurs: Kurs, hv: Map<string, string>): Kullanim {
  const toplam = new Map<string, number>();
  const sozluksuz = new Map<string, number>();
  const onek = kurs === "en" ? /^en-(a1|a2|b1|b2|c1)-/ : /^(a1|a2|b1|b2|c1)-/;
  const kendi = new Map<string, string>();
  for (const w of hv.keys()) kendi.set(w, w);
  const kokBul = (t: string) => (kurs === "en" ? enStems(t).find((st) => hv.has(st)) : kokAra(kendi, t));
  for (const e of BUNDLED_EXERCISES as unknown as LooseExercise[]) {
    if (!onek.test(e.id)) continue;
    /* Egzersizin sözlükçesi: `gloss` + yazma görevinin kalıp/sözcük listeleri. */
    const sozluk = new Set<string>();
    const ekle = (raw?: string) => {
      if (!raw) return;
      for (const w of raw.toLowerCase().split(/[\s/,-]+/)) {
        const c = w.replace(/^'+|'+$/g, "");
        if (c.length < 2) continue;
        const kok = kokBul(c);
        if (kok) sozluk.add(kok);
      }
    };
    for (const g of e.gloss ?? []) ekle(g.de);
    for (const t of e.tasks ?? []) {
      for (const g of t.phrases ?? []) ekle(g.de);
      for (const g of t.words ?? []) ekle(g.de);
    }
    const metin = kurs === "en" ? englishSurface(e as unknown as SkillExercise) : germanSurface(e);
    /* ALMANCADA BELİRTEÇ SÜZGECİ KAPININ KENDİSİNDEN (2026-09-22). Ham
       belirteçle çalışmak özel adı sözcük sanıyordu: "Berger" soyadı
       `kokAra` ile `bergen` fiiline bağlanıyor ve A1'de "hiç öğretilmeyen"
       borcu diye görünüyordu. `olc` özel adı, sayıyı, takvim sözcüğünü ve
       Türkçe harfli belirteci zaten ayıklıyor; ünite penceresini geniş
       (99) veriyoruz, çünkü buradaki soru ünite değil kurs geneli. */
    const seviye = /^(?:en-)?(a1|a2|b1|b2|c1)-/.exec(e.id)?.[1] ?? "a1";
    if (kurs === "de") {
      /* Almancada hem belirteç süzgeci hem SÖZLÜKÇE KREDİSİ kapının kendi
         işi: `olc`un `ekIzin`i sözlükçeyi havuza katıyor ve bileşik/çekimli
         biçimi de tanıyor ("die Krankenkasse" sözlükçedeyse metindeki
         "Krankenkassen" de biliniyor sayılıyor). Aynı soruyu iki kez, biri
         sözlükçesiz biri sözlükçeli soruyoruz. */
      const sozlukSozcukleri = [
        ...(e.gloss ?? []).map((g) => g.de ?? ""),
        ...(e.tasks ?? []).flatMap((t) => [...(t.phrases ?? []), ...(t.words ?? [])].map((g) => g.de ?? "")),
      ].filter(Boolean);
      for (const w of olc(metin, 99, [], seviye).disi) {
        const kok = kokBul(w);
        if (kok) toplam.set(kok, (toplam.get(kok) ?? 0) + 1);
      }
      for (const w of olc(metin, 99, sozlukSozcukleri, seviye).disi) {
        const kok = kokBul(w);
        if (kok) sozluksuz.set(kok, (sozluksuz.get(kok) ?? 0) + 1);
      }
      continue;
    }
    const tok = metin.toLowerCase().match(/[\p{L}'-]{2,}/gu) ?? [];
    for (const w of tok) {
      const kok = kokBul(w);
      if (!kok) continue;
      toplam.set(kok, (toplam.get(kok) ?? 0) + 1);
      if (!sozluk.has(kok)) sozluksuz.set(kok, (sozluksuz.get(kok) ?? 0) + 1);
    }
  }
  return { toplam, sozluksuz };
}

/**
 * KONUŞMA YUVASI MUHASEBESİ — boşluğun öteki yarısı.
 *
 * Yukarısı "hangi sözcük öğretilmiyor" diyor; buradaki soru "yer var mı".
 * Konuşma başına sözlükçe SEKİZ ve bu sayı sözleşmede sabit (`check-conversations`:
 * "tam 8 kelime"), yani yeni bir sözcük ancak bir yuvayı devralarak girer.
 * Devralınacak yuva da belli: aynı sözcüğü ikinci kez öğreten satır.
 *
 * TEKRAR MUTLAKA İSRAF DEĞİL — ölçüm bunu iddia etmiyor. `help` altı konuşmada
 * geçiyor ve acil durum konuşmasının onu sözlükçeye alması makul. Ama sözlükçe
 * konuşmanın ANLATIM betiğine bağlı (`check-conversations` her kelimenin sesli tekrar
 * ettirildiğini ve sohbet isteminde geçtiğini arıyor), yani her yuvanın
 * bir bedeli var. Sayı, "yer yok" ile "yer var ama başka işi görüyor"
 * arasındaki farkı görünür kılmak için.
 */
function yuvaMuhasebesi(kurs: Kurs) {
  console.log(`\n=== ${kurs.toUpperCase()} kursu — konuşma sözlükçesi yuvaları ===`);
  for (const lv of LEVELS) {
    const konusmalar = conversationsFor(kurs).filter((l) => l.level.toLowerCase() === lv);
    if (!konusmalar.length) continue;
    const gor = new Map<string, string[]>();
    for (const l of konusmalar) for (const v of l.vocab) {
      const k = v.de.toLowerCase().trim();
      if (!gor.has(k)) gor.set(k, []);
      gor.get(k)!.push(l.id);
    }
    const yuva = konusmalar.reduce((n, l) => n + l.vocab.length, 0);
    const tekrar = [...gor].filter(([, a]) => a.length > 1);
    const fazla = tekrar.reduce((n, [, a]) => n + a.length - 1, 0);
    console.log(
      `  ${lv.toUpperCase()}  konuşma ${String(konusmalar.length).padStart(3)} · yuva ${String(yuva).padStart(4)}` +
      ` · benzersiz ${String(gor.size).padStart(4)} · İKİNCİ KEZ öğretilen yuva ${String(fazla).padStart(4)} (%${((fazla / yuva) * 100).toFixed(0)})`,
    );
    if (tekrar.length) {
      const ust = tekrar.sort((a, b) => b[1].length - a[1].length).slice(0, 8);
      console.log(`      en çok yinelenen: ${ust.map(([w, a]) => `${w}×${a.length}`).join(" · ")}`);
    }
  }
}

const argv = process.argv.slice(2);
const tabanYaz = argv.includes("--baseline");
const arg = (argv.find((a) => !a.startsWith("--")) ?? "").toLowerCase();
const kurslar: Kurs[] = arg === "en" || arg === "de" ? [arg as Kurs] : ["de", "en"];
const TABAN = "data/content/pathgap-baseline.json";
const sayim = new Map<string, number>();

for (const kurs of kurslar) {
  const hv = havuz(kurs);
  const ds = konusmaSozlugu(kurs);
  /* "Patika bunu öğretiyor mu" sorusu, ünite kapısının sorduğu biçimde:
     İngilizcede havuz kaydının GÖVDELERİ konuşma kümesine karşı denenir
     (`children` → `child`). Almanca birebir kalıyor — oradaki morfoloji
     `kokAra`da ve onu bu yöne çevirmek Almanca sayıları da oynatırdı;
     ayrı ölçülmesi gereken ayrı bir iş. Başlıktaki (2) numaralı not. */
  const ogretiliyor = (w: string) =>
    kurs === "en" ? enStems(w).some((st) => ds.has(st)) : ds.has(w);
  /* Serbest sözcük listesi kursun kendi listesi: başlıktaki (1) numaralı not. */
  /* Serbest listesi de GÖVDEYE bakıyor: `sunday` serbestse `sundays` da öyle,
     yoksa çoğul biçim "hiç öğretilmeyen" diye borca yazılıyordu. */
  const serbest = (w: string) => (kurs === "en" ? enStems(w).some((st) => EN_FREE.has(st)) : SERBEST.has(w));
  const { toplam: kul, sozluksuz } = kullanim(kurs, hv);
  console.log(`\n=== ${kurs.toUpperCase()} kursu — patika boşluğu ===`);
  for (const lv of LEVELS) {
    const seviyeHavuz = [...hv].filter(([, l]) => l === lv).map(([w]) => w);
    if (!seviyeHavuz.length) continue;
    const ogretilen = seviyeHavuz.filter(ogretiliyor);
    const bosluk = seviyeHavuz.filter((w) => !ogretiliyor(w) && !serbest(w));
    /* BORCA SAYILAN: karşılığı hiçbir yerde verilmeden geçen sözcük. Sözlükçeli
       geçişler ayrı sayılıyor ve raporda gösteriliyor — yazarın işi orada
       "derse al" değil, zaten yapılmış. */
    const kullanilan = bosluk
      .map((w) => [w, sozluksuz.get(w) ?? 0] as const)
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1]);
    const sozlukluKapanan = bosluk.filter((w) => (kul.get(w) ?? 0) > 0 && !(sozluksuz.get(w) ?? 0)).length;
    const kapsam = Math.round((ogretilen.length / seviyeHavuz.length) * 100);
    console.log(
      `  ${lv.toUpperCase()}  havuz ${String(seviyeHavuz.length).padStart(4)} · patika öğretiyor ${String(ogretilen.length).padStart(4)} (%${kapsam})` +
      ` · hiç öğretilmeyen ${String(bosluk.length).padStart(4)}, bunların ${kullanilan.length}'i metinlerde SÖZLÜKÇESİZ geçiyor` +
      ` (${sozlukluKapanan} tanesi geçtiği her yerde sözlükçeli)`,
    );
    /* İki ölçü, iki yön. `bosluk` bir BORÇ: metinde geçip hiç öğretilmeyen
       sözcük sayısı büyüyemez. `kapsam` bir KAZANÇ: patikanın havuzu öğretme
       oranı düşemez. Yüzde tam sayıya yuvarlanıyor, yoksa bir konuşmanın tek
       sözcüğü ondalıkta gezinip kapıyı gereksiz yere kırmızı yakardı. */
    sayim.set(`${kurs} ${lv} bosluk`, kullanilan.length);
    sayim.set(`${kurs} ${lv} kapsam`, kapsam);
    if (kullanilan.length) {
      console.log(`      önce bunlar (sözlükçesiz geçiş, kurs geneli): ${kullanilan.slice(0, 15).map(([w, n]) => `${w}×${n}`).join(" · ")}`);
    }
  }
  yuvaMuhasebesi(kurs);
}
/* Kapı yalnız İKİ kurs birden ölçülünce anlamlı: tek kursla taban yazmak
   ötekinin tavanını sıfırlar, kapsamını da siler. */
if (arg) process.exit(0);
process.exit(butceBitir(butceUygula(TABAN, sayim, tabanYaz, (k) => k.endsWith("kapsam")), "npm run check:pathgap"));
