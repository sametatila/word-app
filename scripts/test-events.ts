/**
 * Olay sözlüğü doğrulayıcısı (WP-80): npm run test:events
 *
 * Kaynağı tarar; her `track(` / `trackOnce(` çağrısının adı kapalı listede
 * mi, sabit `kind` etiketleri biçime uyuyor mu (≤ 32, [a-z0-9_:-]), listedeki
 * her olayın en az bir yazan yeri var mı (yazılmayan olay = ölü sözlük
 * girdisi, ya sil ya yaz). Şablon dizeli `kind`lar (`${…}`) yalnız ön ekine
 * bakılarak geçer.
 *
 * Amaç "veri yok" durumuna sessizce düşmemek: biri olayı listeden silerse ya
 * da adı yanlış yazarsa sunucu 204 döner ve kimse fark etmez — bu test eder.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { EVENT_NAMES } from "../src/lib/events";

const KIND_RE = /^[a-z0-9_:-]{1,32}$/i;
const files: string[] = [];
(function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name === "tmp-preview") continue;
      walk(p);
    } else if (/\.(ts|tsx)$/.test(name)) files.push(p);
  }
})("src");

const seen = new Map<string, number>();
const problems: string[] = [];
// Doğrudan tablo yazımı (session.ts toplu ekleme): `name: "olay"`.
const DIRECT = /\bname:\s*"([a-z_]+)"/g;
// track(name, value, kind) — istemci: track("x", 1, "k"); sunucu: track(userId, "x", day, v, "k")
const CALL = /\btrack(?:Once)?\(\s*([^)]*?)\)/gs;
for (const f of files) {
  const src = readFileSync(f, "utf8");
  if (f.startsWith("src/lib/") || f.startsWith("src/app/")) {
    for (const m of src.matchAll(DIRECT)) {
      const n = m[1];
      if ((EVENT_NAMES as readonly string[]).includes(n)) seen.set(n, (seen.get(n) ?? 0) + 1);
    }
  }
  for (const m of src.matchAll(CALL)) {
    const args = m[1];
    const names = [...args.matchAll(/"([a-z_]+)"/g)].map((x) => x[1]);
    const name = names.find((n) => (EVENT_NAMES as readonly string[]).includes(n));
    if (!name) {
      // Ad değişkenden geliyorsa (api/events route) atla; sabit ama listede yoksa hata.
      if (/^\s*"/.test(args) || /,\s*"[a-z_]+"\s*,/.test(args)) problems.push(`${f}: bilinmeyen olay adı → ${args.slice(0, 60)}`);
      continue;
    }
    seen.set(name, (seen.get(name) ?? 0) + 1);
    // Sabit kind: son bağımsız değişken çift tırnaklı dize ise.
    const kind = args.match(/,\s*"([^"]*)"\s*$/)?.[1];
    if (kind !== undefined && !KIND_RE.test(kind)) problems.push(`${f}: kind biçimi bozuk "${kind}" (${name})`);
    const tpl = args.match(/,\s*`([^`]*)`\s*$/)?.[1];
    if (tpl !== undefined) {
      const prefix = tpl.split("${")[0];
      if (prefix && !/^[a-z0-9_:-]*$/i.test(prefix)) problems.push(`${f}: şablon kind ön eki bozuk "${prefix}" (${name})`);
    }
  }
}

// Yalnız sunucuda ya da sağlayıcı tarafından yazılanlar burada listelenir;
// kaynakta çağrısı olmayan olay bu listede değilse hata.
// session_round bilerek yazılmıyor (kpi.md: reviews tablosu aynı satırı taşıyor).
const WRITTEN_ELSEWHERE = new Set<string>(["session_round"]);
const unused = EVENT_NAMES.filter((n) => !seen.has(n) && !WRITTEN_ELSEWHERE.has(n));
if (unused.length) problems.push(`yazılmayan olaylar: ${unused.join(", ")}`);

if (problems.length) {
  console.error("test:events — sorunlar:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(`test:events — ${EVENT_NAMES.length} olay, ${[...seen.values()].reduce((a, b) => a + b, 0)} çağrı, hepsi sözlükte: tamam`);
