import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { AVATAR_IMG_SIZES } from "@/lib/avatar-layers";

export const runtime = "nodejs";

/**
 * KÜÇÜK AVATAR — arka plan + Nomi tabanı + yuvalar tek WebP (bkz.
 * `lib/avatar-layers` › `avatarImageUrl`).
 *
 * Adres çizilecek dosyaları taşıyor (`l=bg,parça1,parça2…`); yalnız 3B
 * kataloğun gerçekten bildirdiği dosyalar kabul ediliyor, başka hiçbir yol
 * okunmuyor. Sonuç değişmez: adres aynıysa görsel aynı, o yüzden bir yıl
 * `immutable`. Kataloğun yeni sürümü yeni bir kök (`/avatar/v2`) ve `v=`.
 *
 * ÇERÇEVE `MascotAvatar` ile aynı: arka plan daireyi doldurur, Nomi ve
 * parçalar 1,12 büyütülüp (50 %, 62 %) noktasından hizalanır ki yüz dairenin
 * ortasına gelsin. Daire kırpması istemcide (CSS / borderRadius).
 */
const ROOT = path.join(process.cwd(), "public", "avatar", "v1");
const SCALE = 1.12;
const ORIGIN = { x: 0.5, y: 0.62 };

type Catalog = { taban: string; parcalar: { dosyalar: Record<string, string> }[] };
let allowed: Set<string> | null = null;
let taban = "";
async function files(): Promise<Set<string>> {
  if (allowed) return allowed;
  const cat = JSON.parse(await readFile(path.join(ROOT, "katalog.json"), "utf8")) as Catalog;
  taban = cat.taban;
  allowed = new Set([cat.taban, ...cat.parcalar.flatMap((p) => Object.values(p.dosyalar))]);
  return allowed;
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const s = Number(u.searchParams.get("s"));
  if (u.searchParams.get("v") !== "1" || !(AVATAR_IMG_SIZES as readonly number[]).includes(s)) return new Response("bad request", { status: 400 });
  const ok = await files();
  const [bg, ...layers] = (u.searchParams.get("l") ?? "").split(",");
  if (layers.length > 12 || (bg && !ok.has(bg)) || layers.some((f) => !ok.has(f)) || layers[0] !== taban) return new Response("bad request", { status: 400 });

  const N = 512;
  const w = Math.round(N / SCALE);
  const crop = { left: Math.round(ORIGIN.x * N * (1 - 1 / SCALE)), top: Math.round(ORIGIN.y * N * (1 - 1 / SCALE)), width: w, height: w };
  const figure = await sharp({ create: { width: N, height: N, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite(layers.map((f) => ({ input: path.join(ROOT, f) })))
    .png()
    .toBuffer();
  const fig = await sharp(figure).extract(crop).resize(s, s, { kernel: "lanczos3" }).toBuffer();
  const base = bg
    ? sharp(path.join(ROOT, bg)).resize(s, s, { fit: "cover" })
    : sharp({ create: { width: s, height: s, channels: 4, background: "#FA7C13" } });
  const out = await base.composite([{ input: fig }]).webp({ quality: 88, effort: 5 }).toBuffer();
  return new Response(new Uint8Array(out), {
    headers: { "content-type": "image/webp", "cache-control": "public, max-age=31536000, immutable" },
  });
}
