/**
 * Koç cümleleri (WP-66) birim testi: sayı, yer tutucu doldurma, tekrar etmeyen seçim.
 * Çalıştır: npm run test:coach
 */
import assert from "node:assert/strict";
import { COACH_LINES, fillCoachLine, pickIndex, planMoment } from "../src/lib/coach-lines";

const total = Object.values(COACH_LINES).reduce((n, l) => n + l.length, 0);
assert.ok(total >= 40, `en az 40 cümle olmalı, ${total} var`);
for (const [moment, lines] of Object.entries(COACH_LINES)) {
  assert.ok(lines.length >= 5, `${moment}: en az 5 cümle`);
  for (const l of lines) {
    assert.ok(l.length <= 110, `${moment}: cümle uzun (${l.length}): ${l}`);
    assert.ok(!/\{(?!name|pct|level)\w+\}/.test(l), `${moment}: bilinmeyen yer tutucu: ${l}`);
  }
}

// Yer tutucular
assert.equal(fillCoachLine("Günaydın, {name}! Hadi.", { name: "Ayşe" }), "Günaydın, Ayşe! Hadi.");
assert.equal(fillCoachLine("Günaydın, {name}! Hadi."), "Günaydın! Hadi.");
assert.equal(fillCoachLine("{name}, hadi.", {}), "hadi.");
assert.equal(fillCoachLine("%{pct} ile {level} senin.", { pct: 82, level: "B1" }), "%82 ile B1 senin.");

// Tekrar etmeyen seçim: son (n-1) seçilen dizinler dışarıda kalır
const seq = [0.1, 0.5, 0.9];
let k = 0;
const rnd = () => seq[k++ % seq.length];
const recent: number[] = [];
for (let i = 0; i < 12; i++) {
  const idx = pickIndex(5, recent, rnd);
  const window = recent.slice(-4);
  assert.ok(!window.includes(idx), `tekrar: ${idx} son dört içinde (${window})`);
  recent.push(idx);
}
assert.equal(pickIndex(1, [0]), 0, "tek cümle varsa yine o seçilir");

// Saat → an
assert.equal(planMoment(7), "plan_morning");
assert.equal(planMoment(13), "plan_day");
assert.equal(planMoment(21), "plan_evening");

console.log(`test:coach — ${total} cümle, yer tutucu, tekrar korunumu: tamam`);
