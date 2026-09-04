/**
 * Modül sınavı kâğıtları, o modülün SONUNA kadar öğretilen kelimelerin
 * dışına çıkıyor mu?
 *
 * Neden ayrı bir denetim gerekti: kâğıtların elle yazılan yarısı (okuma
 * metni, dinleme diyaloğu, konuşma cümleleri, yazma örneği) A1 yeniden
 * kurulmadan ÖNCE yazıldı ve kümülatif kelime denetiminden hiç geçmedi.
 * Kelime bölümü derslerden türetildiği için kendini güncelliyor, bu yarı
 * güncellemiyor.
 *
 * Ölçüm mantığı beceri denetleyicisiyle ORTAK (`lib/vocab-gate.cjs`).
 *
 * Modül = 10 ders, ünite = 4 ders. Modül m'nin son dersi (m+1)*10, yani
 * kümülatif sınır ünite ceil((m+1)*10/4).
 */
import { createRequire } from "node:module";
import { moduleExamPlan } from "../src/lib/lessons/module-exam";

const require = createRequire(import.meta.url);
const { olc, ozet, türkçeMi } = require("./lib/vocab-gate.cjs") as {
  olc: (ham: string, unit: number, ek?: string[]) => { tok: string[]; disi: string[] };
  ozet: (d: string[]) => string[];
  türkçeMi: (s: string) => boolean;
};

const sinirUnite = (m: number) => Math.ceil(((m + 1) * 10) / 4);

let toplamDisi = 0, toplamTok = 0;
const genel = new Map<string, number>();

for (let m = 0; m < 10; m++) {
  const p = moduleExamPlan("A1", m);
  if (!p) { console.log(`modül ${m}: PLAN YOK`); continue; }
  const u = sinirUnite(m);

  // Yazma görevinin kalıpları öğrenciye VERİLİYOR; ölçüme değil izne girer.
  const ek = (p.writing.phrases || []).map((g) => g.de);

  const bolum: Record<string, string> = {
    Lesen: [p.reading.text, ...p.reading.questions.flatMap((q) => [türkçeMi(q.de) ? "" : q.de, ...q.options])].join(" "),
    "Hören": [...p.listening.turns.map((t) => t.de), ...p.listening.questions.flatMap((q) => [türkçeMi(q.de) ? "" : q.de, ...q.options])].join(" "),
    Sprechen: p.speaking.map((s) => s.de).join(" "),
    Schreiben: [p.writing.stimulus ?? "", p.writing.sample].join(" "),
    "Kann-Liste": p.canDo.map((c) => c.de).join(" "),
  };

  const satir: string[] = [];
  for (const [ad, ham] of Object.entries(bolum)) {
    const { tok, disi } = olc(ham, u, ek);
    if (ad !== "Kann-Liste") { toplamTok += tok.length; toplamDisi += disi.length; }
    for (const w of disi) genel.set(w, (genel.get(w) || 0) + 1);
    satir.push(disi.length ? `${ad} ${disi.length}/${tok.length}: ${ozet(disi).slice(0, 6).join(", ")}` : `${ad} temiz`);
  }
  console.log(`\nmodül ${m} · ${p.code} · ${p.titleDe} (ünite 1-${u}'e kadar)`);
  for (const s of satir) console.log("   " + s);
}

console.log(`\nTOPLAM (Kann-Liste hariç): ${toplamDisi}/${toplamTok} = %${(toplamDisi / toplamTok * 100).toFixed(1)} dışı`);
console.log("en sık:", [...genel].sort((a, b) => b[1] - a[1]).slice(0, 25).map(([w, n]) => `${w}×${n}`).join(" · "));
