import { pointer } from "@/lib/content/read";
import { jsonWithEtag } from "@/lib/content/http";

export const dynamic = "force-dynamic";

/**
 * İÇERİK GÖSTERGESİ — hattın en çok çağrılan ve en küçük ucu.
 *
 *   { "r": 14, "d": ["papers/de:de-b1-01"] }
 *
 * `r` canlı yayın sürümü, `d` kapatılan maddeler. İstemci açılışta ve öne
 * geldiğinde buraya bakıyor; sürüm elindekiyle aynıysa hiçbir şey yapmıyor.
 * Cevap değişmediyse ETag onu 304'e çeviriyor, yani boşta yoklamanın maliyeti
 * birkaç yüz bayt.
 *
 * NEDEN `/api/config`TE DEĞİL. O uç 5 dakika önbellekli ve o pencere zorunlu
 * güncellemenin ne kadar sürede yürürlüğe gireceğini belirliyor. İkisi aynı
 * yere konsaydı ya içerik düzeltmesi beş dakikaya bağlanırdı ya da zorunlu
 * güncelleme yarım dakikada bir sorulurdu. Bir ucun ömrü bir kararın hızıdır;
 * iki ayrı karar, iki ayrı uç.
 *
 * OTURUM İSTEMİYOR: burada sır yok, yalnız "hangi sürüm canlı". Premium
 * gövdeler bu hattan hiç geçmiyor (bkz. `/api/mock-exam`).
 */
export async function GET(req: Request) {
  return jsonWithEtag(req, await pointer(), 30);
}
