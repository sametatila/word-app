import { GOOGLE_CLOUD_PREFIXES, GOOGLE_PREFIXES } from "./google-networks-data";
import { parseClientHeader } from "./app-control-shared";

/**
 * GOOGLE'IN KENDİ AĞI — Test Lab robotunu sunucuda tanımanın ikinci yolu.
 *
 * Neden (2026-10-08): mobilin `firebase.test.lab` sinyali (`lib/test-lab`)
 * build 15–22'de hiçbir robotta tetiklenmedi; 45 cihaz kaydının sıfırı
 * işaretliydi, 19 robot hesabı gerçek kullanıcı sayıldı. Hepsinin ortak izi:
 * Android uygulaması, Google'ın kendi adreslerinden (66.102.8.x, 66.249.8x.x,
 * 74.125.2xx.x, 192.178.15.x) tek oturum. Bu yol cihazdan bağımsız ve mobil
 * build istemiyor.
 *
 * KURAL: istek Android uygulamasından (`x-lernomi-client` android/…) ve adres
 * Google'ın listesinde ama Google Cloud müşteri aralıklarında DEĞİL. Bulut
 * müşterisi bir VPN ya da sunucu Google adresi sayılmıyor; gerçek kullanıcı
 * Google'ın şirket ağından ancak Google çalışanıysa gelir. Yanlış tanımanın
 * bedeli ölçümden düşmek; silme ayrıca "bir daha gelmedi" şartına bağlı
 * (`lib/account/test-lab-cleanup`).
 *
 * Aralıklar üretilmiş dosyada (`npm run google-networks`). Adres nginx'in
 * koyduğu `x-real-ip` (hız sınırı ve oturum kaydıyla aynı kaynak).
 */

type Range = { v6: boolean; base: bigint; mask: bigint };

function parseV4(ip: string): bigint | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = BigInt(0);
  for (const p of parts) {
    if (!/^\d{1,3}$/.test(p) || Number(p) > 255) return null;
    n = (n << BigInt(8)) | BigInt(Number(p));
  }
  return n;
}

function parseV6(ip: string): bigint | null {
  const halves = ip.split("::");
  if (halves.length > 2) return null;
  const head = halves[0] ? halves[0].split(":") : [];
  const tail = halves.length === 2 && halves[1] ? halves[1].split(":") : [];
  /* Sonu IPv4 yazılmış adres (::ffff:1.2.3.4): son parça iki gruba açılır. */
  const last = tail.length ? tail : head;
  if (last.length && last[last.length - 1].includes(".")) {
    const v4 = parseV4(last.pop() as string);
    if (v4 === null) return null;
    last.push((v4 >> BigInt(16)).toString(16), (v4 & BigInt(0xffff)).toString(16));
  }
  const missing = 8 - head.length - tail.length;
  if (halves.length === 1 ? missing !== 0 : missing < 1) return null;
  const groups = [...head, ...Array<string>(halves.length === 2 ? missing : 0).fill("0"), ...tail];
  let n = BigInt(0);
  for (const g of groups) {
    if (!/^[0-9a-f]{1,4}$/i.test(g)) return null;
    n = (n << BigInt(16)) | BigInt(parseInt(g, 16));
  }
  return n;
}

/** Adres → (aile, sayı); geçersizse null. IPv4'e eşlenmiş IPv6 IPv4 sayılır. */
export function parseIp(raw: string): { v6: boolean; n: bigint } | null {
  const ip = raw.trim();
  if (!ip) return null;
  if (!ip.includes(":")) {
    const n = parseV4(ip);
    return n === null ? null : { v6: false, n };
  }
  const n = parseV6(ip);
  if (n === null) return null;
  if (n >> BigInt(32) === BigInt(0xffff)) return { v6: false, n: n & BigInt(0xffffffff) };
  return { v6: true, n };
}

function parseRange(cidr: string): Range | null {
  const [addr, bitsRaw] = cidr.split("/");
  const ip = parseIp(addr);
  const bits = Number(bitsRaw);
  if (!ip) return null;
  const width = ip.v6 ? 128 : 32;
  if (!Number.isInteger(bits) || bits < 0 || bits > width) return null;
  const mask = ((BigInt(1) << BigInt(bits)) - BigInt(1)) << BigInt(width - bits);
  return { v6: ip.v6, base: ip.n & mask, mask };
}

let ranges: { google: Range[]; cloud: Range[] } | null = null;
function loaded() {
  if (!ranges) {
    const parse = (xs: readonly string[]) => xs.map(parseRange).filter((r): r is Range => r !== null);
    ranges = { google: parse(GOOGLE_PREFIXES), cloud: parse(GOOGLE_CLOUD_PREFIXES) };
  }
  return ranges;
}

const inAny = (rs: Range[], ip: { v6: boolean; n: bigint }) => rs.some((r) => r.v6 === ip.v6 && (ip.n & r.mask) === r.base);

/** Adres Google'ın kendi ağında mı (Google'a ait, bulut müşterisine verilmemiş). */
export function isGoogleOwnNetwork(ip: string | null | undefined): boolean {
  const parsed = ip ? parseIp(ip) : null;
  if (!parsed) return false;
  const { google, cloud } = loaded();
  return inAny(google, parsed) && !inAny(cloud, parsed);
}

/** İstek Google ağındaki bir Android uygulamasından mı: Test Lab robotu (gerekçe yukarıda). */
export function isTestLabNetwork(clientHeader: string | null | undefined, ip: string | null | undefined): boolean {
  return parseClientHeader(clientHeader)?.platform === "android" && isGoogleOwnNetwork(ip);
}
