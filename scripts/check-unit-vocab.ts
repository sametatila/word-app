/**
 * Ünite hizalı beceri egzersizleri, o üniteye kadar ÖĞRETİLEN kelimelerin
 * dışına çıkıyor mu? Çıkanları sıklığa göre listeler.
 *
 * KAYNAKTAN okur, mobil dökümden değil. Döküm `speaking` becerisini bilerek
 * dışarıda bırakıyor (mobilde konuşma dersin içinde), o yüzden döküm okunduğu
 * sürece konuşma egzersizleri HİÇ denetlenmiyordu.
 *
 * Ölçüm mantığı `lib/vocab-gate.cjs`'de — modül sınavı denetleyicisiyle
 * ORTAK. Buradaki iş yalnızca egzersizden ölçülecek Almancayı toplamak.
 */
import { createRequire } from "node:module";
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";
// Ölçülecek yüzey üç denetleyicide ORTAK; gerekçe `lib/skill-surface.ts`de.
import { germanSurface, type LooseExercise } from "./lib/skill-surface";
// Bütçe deseni: sıfıra inemeyen bulguyu yine de kapı yapar. Gerekçe `lib/budget.ts`de.
import { butceUygula, butceBitir } from "./lib/budget";

const require = createRequire(import.meta.url);
/* `türkçeMi` modulde var ama burada kullanilmiyor - desenden cikarildi (lint
   kullanilmayan degiskeni hata sayiyor). Tip bildiriminde KALIYOR: gerektiginde
   tek kelimeyle geri alinir. */
const { olc, ozet, nerede } = require("./lib/vocab-gate.cjs") as {
  olc: (ham: string, unit: number, ek?: string[], seviye?: string) => { tok: string[]; disi: string[] };
  ozet: (d: string[]) => string[];
  türkçeMi: (s: string) => boolean;
  nerede: (w: string, seviye: string, unit: number) => { sinif: string; detay: string };
};
const ex = BUNDLED_EXERCISES as unknown as LooseExercise[];

// Seviye argümanla seçilir: `npm run check:unitvocab -- b1`. Varsayılan a1,
// böylece mevcut çağrılar aynen çalışır.
const args = process.argv.slice(2);
const tabanYaz = args.includes("--baseline");
/* `--worklist`: sınıf SAYILARI yerine, yazarın sırayla işleyeceği LİSTE.
   Sayılar "ne kadar borç var" diyor; liste "önce neyi yaparsam en çok
   egzersiz temizlenir" diyor — ölçüldü ve ikisi çok farklı çıktı: A2'de 329
   seviye-üstü geçiş 115 egzersize yayılıyor ama medyan egzersiz yalnız İKİ
   sözcük istiyor ve 33 egzersiz TEK sözcükle kapanıyor. */
const liste = args.includes("--worklist");
/* Kapı olarak çalışırken TÜM seviyeler ölçülmeli, yoksa bütçe yarım kalır.
   Elle tek seviye bakmak için argüman hâlâ çalışıyor. */
const seviyeArg = args.find((a) => !a.startsWith("--"));
const seviyeler = seviyeArg ? [seviyeArg.toLowerCase()] : ["a1", "a2", "b1", "b2", "c1"];
const TABAN = "data/content/vocab-de-baseline.json";
const genelSinif = new Map<string, number>();
for (const seviye of seviyeler) {
const hedef = ex.filter((e) => new RegExp(`^${seviye}-u\\d+-`).test(e.id));
console.log(`${seviye.toUpperCase()} · ünite hizalı egzersiz: ${hedef.length}`);
const genelDisi = new Map();
/* Bulguyu SINIFLANDIRARAK say: "kapı dışı" dört ayrı iş demek ve yazarın
   yapacağı şey her birinde başka (gerekçe `lib/vocab-gate.cjs`, `nerede`). */
const sinifSay = new Map<string, number>();
const sinifKelime = new Map<string, Map<string, string>>();
/* Liste kipi için: egzersiz → (sınıf, sözcük) ve sözcük → egzersiz kümesi. */
const egzersizSoz = new Map<string, Map<string, string>>();
const sozEgzersiz = new Map<string, Set<string>>();
for (const e of hedef) {
  // egzersizin kendi sözlükçesi ve yazma görevlerinin kalıpları serbest
  const ek: string[] = [];
  for (const g of e.gloss || []) if (g.de) ek.push(g.de);
  for (const t of e.tasks || []) for (const g of t.phrases || t.words || []) if (g.de) ek.push(g.de);
  // Ünitesiz egzersiz (Beceriler kütüphanesi) kapıya 0 ile giriyor: kapı o
  // durumda seviye tabanını kullanıyor, ünite penceresi açmıyor.
  const { tok, disi } = olc(germanSurface(e), e.unit ?? 0, ek, seviye);
  const oran = tok.length ? (disi.length / tok.length * 100).toFixed(1) : "0";
  if (disi.length) {
    console.log(`  ${e.id.padEnd(12)} %${oran.padStart(4)} dışı (${disi.length}/${tok.length}): ${ozet(disi).slice(0, 8).join(", ")}`);
    for (const w of disi) {
      genelDisi.set(w, (genelDisi.get(w) || 0) + 1);
      const n = nerede(w, seviye, e.unit ?? 0);
      sinifSay.set(n.sinif, (sinifSay.get(n.sinif) || 0) + 1);
      const t = sinifKelime.get(n.sinif) || new Map<string, string>();
      if (!t.has(w)) t.set(w, n.detay);
      sinifKelime.set(n.sinif, t);
      if (liste) {
        const em = egzersizSoz.get(e.id) ?? new Map<string, string>();
        em.set(w, n.sinif); egzersizSoz.set(e.id, em);
        (sozEgzersiz.get(w) ?? sozEgzersiz.set(w, new Set()).get(w)!).add(e.id);
      }
    }
  } else {
    console.log(`  ${e.id.padEnd(12)} temiz`);
  }
}
console.log("\nen sık dışarıda kalanlar:", [...genelDisi].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([w, n]) => `${w}×${n}`).join(" · "));

const BASLIK: Record<string, string> = {
  ustu: "SEVİYE ÜSTÜ   — havuzda var ama üst seviyede; metin sadeleşmeli ya da sözlükçeye girmeli",
  erken: "ERKEN         — bu seviyenin dersi öğretiyor, ama daha sonraki ünitede",
  derssiz: "DERSSİZ       — havuzda var ama BU SEVİYENİN dersleri öğretmiyor (üst seviyede öğretiliyor olabilir; patika boşluğu)",
  turev: "TÜREV         — kök bu üniteye kadar öğretilmiş; kapı yüzey biçimini tanımadı (içerik kusuru DEĞİL)",
  // Bilinen eksik: ünlüsü değişen güçlü fiil ortacı (geschwommen ← schwimmen)
  // de buraya düşüyor; sınıflandırma o değişimi çözemiyor (gerekçe `ara`da).
  yabanci: "HAVUZDA YOK   — ödünç sözcük, kısaltma, özel ad, yazım hatası ya da ünlüsü değişen ortaç",
};
const toplam = [...sinifSay.values()].reduce((a, b) => a + b, 0);
if (toplam) {
  console.log("\nbulgu sınıfları:");
  for (const k of ["ustu", "erken", "derssiz", "turev", "yabanci"]) {
    const n = sinifSay.get(k) || 0;
    if (!n) continue;
    const ornek = [...(sinifKelime.get(k) || new Map())].slice(0, 6).map(([w, d]) => `${w} (${d})`).join(" · ");
    console.log(`  ${BASLIK[k]}`);
    console.log(`    ${String(n).padStart(4)} geçiş · %${(n / toplam * 100).toFixed(0)} — ${ornek}`);
  }
}
if (liste && egzersizSoz.size) {
  console.log("\nİŞ LİSTESİ — önce en çok egzersizi rahatlatan sözcük:");
  const sirali = [...sozEgzersiz].sort((a, b) => b[1].size - a[1].size);
  for (const [w, kume] of sirali.slice(0, 20)) {
    const sinif = [...egzersizSoz.values()].map((m) => m.get(w)).find(Boolean) ?? "?";
    console.log(`  ${w.padEnd(18)} ${String(kume.size).padStart(3)} egzersiz  [${sinif}]`);
  }
  const kova = new Map<number, [string, string[]][]>();
  for (const [id, m] of egzersizSoz) (kova.get(m.size) ?? kova.set(m.size, []).get(m.size)!).push([id, [...m.keys()]]);
  console.log("\nEN UCUZ EGZERSİZLER — tek sözcükle temizlenenler:");
  for (const [id, ws] of (kova.get(1) ?? []).slice(0, 25)) console.log(`  ${id.padEnd(14)} ${ws[0]}`);
  const ozetSatir = [...kova].sort((a, b) => a[0] - b[0]).map(([n, l]) => `${n} sözcük→${l.length} egz`).join(" · ");
  console.log(`\ndağılım: ${ozetSatir}`);
}
for (const [k, n] of sinifSay) genelSinif.set(`${seviye} ${k}`, n);
}
process.exit(butceBitir(butceUygula(TABAN, genelSinif, tabanYaz), "npm run check:unitvocab"));
