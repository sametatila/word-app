/**
 * İçerik bütünlüğü + ŞIK KONUMU YANLILIĞI denetimi.
 *
 * NEDEN VAR — 2026-09-05'te ölçülen kusur: 1484 çoktan seçmeli sorunun
 * %83'ünde doğru cevap İLK şıktaydı. Her seviyede, her yazarda aynı
 * (A1 %86, B2 %89, C1 %82, B1 %74). Doğru cevabı önce yazmak insanın doğal
 * eğilimi ve kimse fark etmiyor, çünkü tek tek bakıldığında her soru normal
 * görünüyor — kusur ancak TOPLAMDA görünüyor.
 *
 * Sonucu ciddiydi: hiçbir şey okumadan hep ilk şıkkı işaretleyen biri ~%83
 * alıyordu. Sınav kâğıdı kendi karıştırmasını yapıyordu ama beceri oynatıcısı
 * ve Patika yapmıyordu.
 *
 * Düzeltme `skills/bundled.ts` içindeki `withShuffledOptions` — veri
 * katmanında, çünkü mobil paket o listenin dökümü. Bu betik düzeltmenin
 * ÇALIŞMAYA DEVAM ETTİĞİNİ doğrular: yeni içerik eklenince yanlılık geri
 * gelirse burada görünür.
 *
 * Kullanım: npm run check:content
 */
import { BUNDLED_EXERCISES } from "../src/lib/skills/bundled";

/** Şık listesi taşımayan soru türleri — eksik şık onlarda kusur değil. */
const SIKSIZ = new Set(["gapfill", "short_answer", "dictation", "order"]);
/** Tek bir konumun payı bunu aşarsa yanlılık var demektir (tekdüze ≈ %33). */
const ESIK = 45;

const ex = BUNDLED_EXERCISES as any[];
const hata: string[] = [];
const gorulen = new Set<string>();

for (const e of ex) {
  if (gorulen.has(e.id)) hata.push(`YİNELENEN id: ${e.id}`);
  gorulen.add(e.id);
  if (!e.title || !e.genre) hata.push(`${e.id}: başlık/tür eksik`);
  if (!(e.minutes > 0)) hata.push(`${e.id}: minutes geçersiz`);
  if (e.skill === "reading" && !e.text) hata.push(`${e.id}: okuma metni yok`);
  if (e.skill === "listening" && !e.segments?.length) hata.push(`${e.id}: dinleme parçası yok`);
  if (e.skill === "writing" && !e.tasks?.length) hata.push(`${e.id}: yazma görevi yok`);
  if (e.skill === "speaking" && !e.tasks?.length && !e.dialogue && !e.monologue)
    hata.push(`${e.id}: konuşma içeriği yok`);

  for (const [qi, q] of (e.questions ?? []).entries()) {
    const kind = q.kind ?? "mcq";
    if (!q.text) hata.push(`${e.id} s${qi}: soru metni yok`);
    if (SIKSIZ.has(kind)) {
      if (kind !== "order" && !q.accept?.length) hata.push(`${e.id} s${qi}: ${kind} accept yok`);
      continue;
    }
    if (!q.options?.length) { hata.push(`${e.id} s${qi}: şık yok`); continue; }
    // Aynı şık iki kez basılırsa iki doğru cevap olur ve soru kendini ele verir.
    if (new Set(q.options).size !== q.options.length) hata.push(`${e.id} s${qi}: AYNI ŞIK İKİ KEZ`);
    if (q.options.some((o: string) => !String(o).trim())) hata.push(`${e.id} s${qi}: boş şık`);
    if (typeof q.answer !== "number" || q.answer < 0 || q.answer >= q.options.length)
      hata.push(`${e.id} s${qi}: cevap indeksi geçersiz`);
  }

  for (const t of e.tasks ?? []) {
    if (t.kind === "free" && !t.prompt) hata.push(`${e.id}: free görev prompt yok`);
    if ((t.kind === "build" || t.kind === "rewrite") && !t.answer)
      hata.push(`${e.id}: ${t.kind} görev answer yok`);
  }
}

console.log(`egzersiz ${ex.length} · bütünlük sorunu: ${hata.length}`);
for (const h of hata.slice(0, 30)) console.log("   " + h);
if (hata.length > 30) console.log(`   … ve ${hata.length - 30} tane daha`);

// ── şık konumu yanlılığı ───────────────────────────────────────────────
console.log("\nŞIK KONUMU (üç ve daha çok şıklı sorular; tekdüze ≈ %33):");
const seviye: Record<string, number[]> = {};
for (const e of ex) {
  for (const q of e.questions ?? []) {
    if (SIKSIZ.has(q.kind ?? "mcq") || !q.options || q.options.length < 3) continue;
    (seviye[e.level] ??= [])[q.answer] = ((seviye[e.level] ?? [])[q.answer] ?? 0) + 1;
  }
}
let yanli = 0;
for (const lv of Object.keys(seviye).sort()) {
  const d = seviye[lv];
  const t = d.reduce((a, n) => a + (n ?? 0), 0);
  const pay = d.map((n) => ((n ?? 0) / t) * 100);
  const enYuksek = Math.max(...pay);
  if (enYuksek > ESIK) yanli++;
  console.log(
    `  ${lv}: ${String(t).padStart(4)} soru · ` +
      pay.map((p, i) => `idx${i} %${p.toFixed(0)}`).join(" · ") +
      (enYuksek > ESIK ? `   ← YANLI (%${enYuksek.toFixed(0)} > %${ESIK})` : ""),
  );
}
if (yanli) {
  console.log(`\nUYARI: ${yanli} seviyede şık konumu yanlı. Doğru cevabı ilk şıkka yazmak`);
  console.log("insanın doğal eğilimi; bundled.ts'teki withShuffledOptions bunu dağıtır.");
  console.log("Bu uyarı görünüyorsa ya karıştırma devre dışı ya da yeni tür içerik onu atlıyor.");
}
process.exitCode = hata.length ? 1 : 0;
