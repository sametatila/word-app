import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { AVATAR_IMG_SIZES, catalogSize, circleBox, type AvatarCatalog } from "@/lib/avatar-layers";

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
 * ÇERÇEVE `MascotAvatar` ile aynı: arka plan ve parçalar tuvalin tamamına
 * çizilir, sonra kataloğun daire karesi (`circleBox`: v2'de katalogda, v1'de
 * eski 1,12 / %50-%62 kuralı) kesilip istenen boya küçültülür. Daire
 * kırpması istemcide (CSS / borderRadius).
 *
 * `v=` katalog sürümü (`/avatar/v<n>`): her sürüm kendi dizininden ve kendi
 * dosya listesiyle doğrulanır.
 */
type Catalog = AvatarCatalog;
type Loaded = { root: string; cat: Catalog; ok: Set<string> };
const loaded = new Map<string, Promise<Loaded | null>>();
function catalog(v: string): Promise<Loaded | null> {
  let p = loaded.get(v);
  if (!p) {
    const root = path.join(process.cwd(), "public", "avatar", `v${v}`);
    p = readFile(path.join(root, "katalog.json"), "utf8")
      .then((t) => {
        const cat = JSON.parse(t) as Catalog;
        return { root, cat, ok: new Set([cat.taban, ...cat.parcalar.flatMap((q) => Object.values(q.dosyalar))]) };
      })
      .catch(() => null);
    loaded.set(v, p);
  }
  return p;
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  const s = Number(u.searchParams.get("s"));
  const v = u.searchParams.get("v") ?? "";
  if (!/^[1-9]\d?$/.test(v) || !(AVATAR_IMG_SIZES as readonly number[]).includes(s)) return new Response("bad request", { status: 400 });
  const c = await catalog(v);
  if (!c) return new Response("bad request", { status: 400 });
  const [bg, ...layers] = (u.searchParams.get("l") ?? "").split(",");
  if (layers.length > 12 || (bg && !c.ok.has(bg)) || layers.some((f) => !c.ok.has(f)) || layers[0] !== c.cat.taban) return new Response("bad request", { status: 400 });
  /* Önbellek anahtarı adresin tamamı (nginx): tekrarlı katman ya da fazladan sorgu
     parametresiyle girişsiz biri sınırsız farklı adres üretip her birinde tam tuval
     çizdirebiliyordu (güvenlik denetimi 2026-10-07). İstemci (`avatarImageUrl`)
     ikisini de üretmiyor. */
  if (new Set(layers).size !== layers.length || [...u.searchParams.keys()].some((k) => k !== "v" && k !== "s" && k !== "l")) {
    return new Response("bad request", { status: 400 });
  }

  const { w, h } = catalogSize(c.cat);
  const [x, y, side] = circleBox(c.cat);
  const under = bg
    ? await sharp(path.join(c.root, bg)).resize(w, h, { fit: "cover" }).ensureAlpha().png().toBuffer()
    : await sharp({ create: { width: w, height: h, channels: 4, background: "#FA7C13" } }).png().toBuffer();
  const full = await sharp(under)
    .composite(layers.map((f) => ({ input: path.join(c.root, f) })))
    .png()
    .toBuffer();
  const crop = { left: Math.max(0, Math.round(x)), top: Math.max(0, Math.round(y)), width: Math.round(side), height: Math.round(side) };
  const out = await sharp(full).extract(crop).resize(s, s, { kernel: "lanczos3" }).webp({ quality: 88, effort: 5 }).toBuffer();
  return new Response(new Uint8Array(out), {
    headers: { "content-type": "image/webp", "cache-control": "public, max-age=31536000, immutable" },
  });
}
