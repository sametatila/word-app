/**
 * Google'ın IP aralıklarını `src/lib/google-networks-data.ts`e yazar —
 * `npm run google-networks`. Ağ gerektirir; çıktı commit edilir.
 *
 * Kaynak Google'ın yayımladığı iki liste: `goog.json` (Google'ın bütün
 * adresleri) ve `cloud.json` (bunların Google Cloud MÜŞTERİLERİNE verilen
 * kısmı). Test Lab robotunu tanıyan kural "ilkinde var, ikincisinde yok"
 * (`lib/google-networks`): bulut müşterisi bir VPN'den gelen gerçek kullanıcı
 * Google adresi sayılmasın. Listeler ayda birkaç kez küçük değişiyor; arada
 * eklenen bir aralık yalnız o aralıktaki robotu kaçırır, yenilemek yeter.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

type Ranges = { creationTime: string; prefixes: { ipv4Prefix?: string; ipv6Prefix?: string }[] };

async function load(name: string): Promise<Ranges> {
  const res = await fetch(`https://www.gstatic.com/ipranges/${name}`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  return (await res.json()) as Ranges;
}

const list = (r: Ranges) => r.prefixes.map((p) => p.ipv4Prefix ?? p.ipv6Prefix).filter((p): p is string => !!p);
const lines = (xs: string[]) => xs.map((x) => `  "${x}",`).join("\n");

async function main() {
  const [goog, cloud] = await Promise.all([load("goog.json"), load("cloud.json")]);
  const out = `/* ÜRETİLMİŞ DOSYA — elle düzenleme: \`npm run google-networks\` (scripts/google-networks.ts).
   goog.json ${goog.creationTime} · cloud.json ${cloud.creationTime} */

/** Google'ın bütün adresleri (goog.json). */
export const GOOGLE_PREFIXES: readonly string[] = [
${lines(list(goog))}
];

/** Bunların Google Cloud müşterilerine verilen kısmı (cloud.json). */
export const GOOGLE_CLOUD_PREFIXES: readonly string[] = [
${lines(list(cloud))}
];
`;
  const file = join(process.cwd(), "src/lib/google-networks-data.ts");
  writeFileSync(file, out);
  console.log(`${file}: ${list(goog).length} Google, ${list(cloud).length} bulut aralığı`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
