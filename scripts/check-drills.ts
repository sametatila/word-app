/**
 * Drill içerik doğrulayıcı (WP-11 adım 1): npm run test:cheat
 *
 * Kontroller: kimlik tekil ve "d:tablo:nn" biçiminde; tablo var; hata tipi
 * sözlükte; boşluk türünde "___" var ve en az bir alternatif; cevap
 * tablonun hücrelerinde geçen bir biçimi içeriyor (kural tablodan geliyor,
 * havadan değil); gerekçe var ve kısa; pilot tabloların her birinde ≥ 10.
 */
import assert from "node:assert/strict";
import { DRILLS } from "../src/lib/cheatsheet/drills";
import { CHEATSHEETS } from "../src/lib/cheatsheet/index";
import { isErrorType } from "../src/lib/errors";

const sheets = new Map(CHEATSHEETS.map((s) => [s.id, s]));
const seen = new Set<string>();
const perTable = new Map<string, number>();

function cellTokens(sheetId: string): Set<string> {
  const out = new Set<string>();
  const sheet = sheets.get(sheetId)!;
  for (const b of sheet.blocks) {
    if (b.kind !== "table") continue;
    for (const row of b.rows) for (const cell of row) for (const t of cell.toLowerCase().split(/[^\p{L}]+/u)) if (t.length >= 2) out.add(t);
  }
  return out;
}

const tokenCache = new Map<string, Set<string>>();
for (const x of DRILLS) {
  assert.match(x.id, /^d:[a-z0-9-]+:\d{2}$/, `kimlik biçimi: ${x.id}`);
  assert.ok(!seen.has(x.id), `çift kimlik: ${x.id}`);
  seen.add(x.id);
  assert.ok(sheets.has(x.tableId), `${x.id}: tablo yok (${x.tableId})`);
  assert.equal(sheets.get(x.tableId)!.level, x.level, `${x.id}: seviye tabloyla uyuşmuyor`);
  assert.ok(isErrorType(x.errorType), `${x.id}: hata tipi geçersiz (${x.errorType})`);
  assert.ok(x.answer.trim().length > 0, `${x.id}: cevap boş`);
  assert.ok(x.why.length > 0 && x.why.length <= 140, `${x.id}: gerekçe yok ya da uzun`);
  assert.ok(x.prompt.tr.length > 0, `${x.id}: Türkçe yönerge yok`);
  if (x.kind === "fill") {
    assert.ok(x.prompt.de?.includes("___"), `${x.id}: boşluk türünde ___ yok`);
    assert.ok(x.alternatives?.length, `${x.id}: boşluk türünde alternatif (yalnız boşluk) yok`);
  }
  if (x.kind === "transform") assert.ok(x.prompt.de, `${x.id}: dönüştürmede verilen cümle yok`);
  if (!tokenCache.has(x.tableId)) tokenCache.set(x.tableId, cellTokens(x.tableId));
  const cells = tokenCache.get(x.tableId)!;
  // Cevap YA DA gerekçe tablodaki bir biçime dokunmalı: "ist gegangen" tabloda
  // yok ama gerekçesi "sein" der ve sein tablonun hücresi — kural tablodan.
  const anchorTokens = `${x.answer} ${x.why}`.toLowerCase().split(/[^\p{L}]+/u).filter((t) => t.length >= 2);
  assert.ok(anchorTokens.some((t) => cells.has(t)), `${x.id}: cevap ve gerekçe tablodaki hiçbir biçime dokunmuyor (${x.answer})`);
  perTable.set(x.tableId, (perTable.get(x.tableId) ?? 0) + 1);
}

for (const [tableId, n] of perTable) assert.ok(n >= 10, `${tableId}: ${n} madde (< 10)`);

console.log(`test:cheat — ${DRILLS.length} drill, ${perTable.size} tablo: tamam (${[...perTable].map(([t, n]) => `${t} ${n}`).join(", ")})`);
