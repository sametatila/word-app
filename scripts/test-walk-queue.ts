/**
 * Yürüyüş kuyruğu birim testi: npm run test:walkqueue
 *
 * Sınananlar (sahibin şikâyetlerinin birebir karşılığı):
 *   • "20 tane soracak gibi yapıyor ama 15 oluyor / aşıyor" → toplam TAM 20, aşım yok
 *   • "soru atlıyor / aynısını tekrar soruyor" → speak turlarında kopya kelime yok
 *   • "arada yeni kelime, karışık turdaki gibi" → her yeni kelime tanıtım + söyle çifti
 */
import assert from "node:assert/strict";
import { composeWalk } from "../src/lib/session";
import type { Round, RoundWord } from "../src/lib/types";

const w = (id: number, isNew = false): RoundWord => ({
  id,
  de: `w${id}`,
  artikel: null,
  tr: `t${id}`,
  en: null,
  typ: "Nomen",
  niveau: "B1",
  beispiel: null,
  beispielTr: null,
  beispielEn: null,
  formen: null,
  isNew,
});
const wordId = (r: Round): number => ("word" in r ? r.word.id : -1);
const T = 20;

// 1) Bol tekrar + 3 yeni: tam 20, 3 tanıtım, her tanıtımın söyle turu, speak'te kopya yok
{
  const due = Array.from({ length: 14 }, (_, i) => w(i + 1));
  const fresh = Array.from({ length: 3 }, (_, i) => w(100 + i, true));
  const r = composeWalk(due, fresh, T);
  assert.equal(r.length, 20, "tam 20 tur");
  const intros = r.filter((x) => x.game === "intro");
  assert.equal(intros.length, 3, "3 tanıtım");
  for (const intro of intros) {
    assert.ok(
      r.some((x) => x.game === "speak" && wordId(x) === wordId(intro)),
      "tanıtılan kelimenin söyle turu var",
    );
  }
  const speakIds = r.filter((x) => x.game === "speak").map(wordId);
  assert.equal(new Set(speakIds).size, speakIds.length, "speak turlarında kopya kelime yok");
}

// 2) Aşım yok: 100 tekrar verilse de 20'de duruyor
assert.equal(composeWalk(Array.from({ length: 100 }, (_, i) => w(i + 1)), [], T).length, 20, "100 tekrar → 20");

// 3) Yeni kullanıcı: tekrar yok, yalnız yeni → intro sayısı = yeni-speak sayısı, ≤20
{
  const fresh = Array.from({ length: 10 }, (_, i) => w(200 + i, true));
  const r = composeWalk([], fresh, T);
  assert.ok(r.length <= 20, "aşım yok");
  const intros = r.filter((x) => x.game === "intro").length;
  const newSpeaks = r.filter((x) => x.game === "speak").length;
  assert.equal(intros, newSpeaks, "her yeni kelime intro + speak");
}

// 4) İnce kuyruk şişirilmiyor: 3 tekrar, yeni yok → 3 tur
assert.equal(composeWalk([w(1), w(2), w(3)], [], T).length, 3, "ince kuyruk şişmez");

// 5) Sınırda yeni çift: tanıtım asla söyle'siz kalmıyor
{
  const due = Array.from({ length: 19 }, (_, i) => w(i + 1));
  const r = composeWalk(due, [w(300, true)], T);
  assert.equal(r.length, 20, "tam 20");
  for (const intro of r.filter((x) => x.game === "intro")) {
    assert.ok(r.some((x) => x.game === "speak" && wordId(x) === wordId(intro)), "tanıtımın söyle turu var");
  }
}

console.log("test:walkqueue — tam-boyut/aşım/yeni-kullanıcı/ince/sınır: tamam");
