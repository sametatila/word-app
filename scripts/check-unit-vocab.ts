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

const require = createRequire(import.meta.url);
const { olc, ozet, türkçeMi, nerede } = require("./lib/vocab-gate.cjs") as {
  olc: (ham: string, unit: number, ek?: string[], seviye?: string) => { tok: string[]; disi: string[] };
  ozet: (d: string[]) => string[];
  türkçeMi: (s: string) => boolean;
  nerede: (w: string, seviye: string, unit: number) => { sinif: string; detay: string };
};
/**
 * Egzersizin GEVŞEK görünümü — yalnız burada okunan alanlar.
 *
 * `any` yerine bu: paket birden çok egzersiz türü taşıyor (quiz, konuşma,
 * yazma) ve hepsinin alanları farklı, ama bu betik yalnız metin yüzeyini
 * topluyor. Hepsini isteğe bağlı alanlarla tarif etmek, `any`nin verdiği
 * özgürlüğü koruyup yanlış alan adını yakalama yeteneğini geri kazandırıyor:
 * `e.txet` artık derlemede patlıyor.
 */
type Gloss = { de?: string; tr?: string };
type LooseTask = {
  de?: string;
  answer?: string;
  source?: string;
  sample?: string;
  stimulus?: string;
  kind?: string;
  /** Yazma görevinde kalıp sözlükçesi; bazı pakette `words` adıyla. */
  phrases?: Gloss[];
  words?: Gloss[];
  fields?: { answer?: string }[];
};
type LooseExercise = {
  id: string;
  skill?: string;
  text?: string;
  /** Egzersizin kendi sözlükçesi — kapı dışı sayılmaz. */
  gloss?: Gloss[];
  /** Patika ünitesi (varsa): kapı seviyesi buna göre seçiliyor. */
  unit?: number;
  segments?: { text?: string }[];
  questions?: { text?: string; accept?: string[] }[];
  tasks?: LooseTask[];
};

const ex = BUNDLED_EXERCISES as unknown as LooseExercise[];

/** Egzersizin ölçülecek Almanca yüzeyi. Türkçe alanlar dışarıda. */
function almanca(e: LooseExercise): string {
  const out: string[] = [];
  if (e.text) out.push(e.text);
  for (const s of e.segments || []) if (s.text) out.push(s.text);
  // Şıklar Türkçe olabiliyor ("samimi (du)"); Almanca ölçümüne sokmuyoruz.
  for (const q of e.questions || []) {
    if (q.text && !türkçeMi(q.text)) out.push(q.text);
    for (const a of q.accept || []) out.push(a);
  }
  for (const t of e.tasks || []) {
    // Konuşma görevinin söylenecek metni `de` alanında; ölçüm dışında kalıyordu.
    if (e.skill === "speaking" && t.de) out.push(t.de);
    if (t.answer) out.push(t.answer);
    if (t.source && !türkçeMi(t.source)) out.push(t.source);
    if (t.sample) out.push(t.sample);
    /* UYARAN ÇOĞUNLUKLA ALMANCA AMA HEPSİ DEĞİL. `stimulus` genelde
       öğrencinin okuyup cevapladığı metin (e-posta, ilan, mesaj) ve Almanca;
       ama 23 görevde Türkçe bir brifing bloğu ("DURUM — … ELİNDEKİ VERİ: …",
       biri A2'de, yirmi ikisi C1'in `-w2` görevlerinde). Almanca ölçümüne
       sokulunca her satırı kapı dışı sayılıyordu: `c1-u09-w2` %12,1 dışı
       görünüyor ve işaretlenen 21 sözcüğün hepsi Türkçeydi (durum, ekip,
       gerginlik, teslim, ertelendi). `source` alanı aynı nedenle zaten
       süzülüyordu; uyaran atlanmıştı. Mobil tarafta ayrımı `isTurkishStem`
       yapıyor, burada `türkçeMi`. */
    if (t.stimulus && !türkçeMi(t.stimulus)) out.push(t.stimulus);
    for (const f of t.fields || []) if (f.answer) out.push(f.answer);
  }
  return out.join(" ");
}

// Seviye argümanla seçilir: `npm run check:unitvocab -- b1`. Varsayılan a1,
// böylece mevcut çağrılar aynen çalışır.
const seviye = (process.argv[2] || "a1").toLowerCase();
const hedef = ex.filter((e) => new RegExp(`^${seviye}-u\\d+-`).test(e.id));
console.log(`${seviye.toUpperCase()} · ünite hizalı egzersiz: ${hedef.length}`);
const genelDisi = new Map();
/* Bulguyu SINIFLANDIRARAK say: "kapı dışı" dört ayrı iş demek ve yazarın
   yapacağı şey her birinde başka (gerekçe `lib/vocab-gate.cjs`, `nerede`). */
const sinifSay = new Map<string, number>();
const sinifKelime = new Map<string, Map<string, string>>();
for (const e of hedef) {
  // egzersizin kendi sözlükçesi ve yazma görevlerinin kalıpları serbest
  const ek: string[] = [];
  for (const g of e.gloss || []) if (g.de) ek.push(g.de);
  for (const t of e.tasks || []) for (const g of t.phrases || t.words || []) if (g.de) ek.push(g.de);
  // Ünitesiz egzersiz (Beceriler kütüphanesi) kapıya 0 ile giriyor: kapı o
  // durumda seviye tabanını kullanıyor, ünite penceresi açmıyor.
  const { tok, disi } = olc(almanca(e), e.unit ?? 0, ek, seviye);
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
    }
  } else {
    console.log(`  ${e.id.padEnd(12)} temiz`);
  }
}
console.log("\nen sık dışarıda kalanlar:", [...genelDisi].sort((a, b) => b[1] - a[1]).slice(0, 20).map(([w, n]) => `${w}×${n}`).join(" · "));

const BASLIK: Record<string, string> = {
  ustu: "SEVİYE ÜSTÜ   — havuzda var ama üst seviyede; metin sadeleşmeli ya da sözlükçeye girmeli",
  erken: "ERKEN         — bu seviyenin dersi öğretiyor, ama daha sonraki ünitede",
  derssiz: "DERSSİZ       — havuzda bu seviyede ama hiçbir ders öğretmiyor (patika boşluğu)",
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
