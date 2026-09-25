/**
 * AĞ TEŞHİSİ: sunucumuza ulaşılamadığında sebep cihazda mı, ağda mı?
 *
 * Bazı kurumsal ve üniversite ağları (ör. TU Dortmund Wi-Fi) www.lernomi.app'e
 * giden bağlantıyı SNI'ya bakıp sıfırlıyor: alan adı yeni (2026-09-04) ve
 * "yeni alan adı" filtresine takılıyor. Uygulama o zaman "İnternetini kontrol
 * et" diyordu, kullanıcı da sorunu kendi cihazında arıyordu.
 *
 * Yöntem: bizim sunucuya AĞ HATASI alındıktan sonra (yalnız o zaman), her ağda
 * açık olma olasılığı yüksek iki bağımsız adresi kısa zaman aşımıyla yokla.
 * Biri cevap verirse internet var, engellenen yalnız Lernomi ("blocked");
 * ikisi de ağ hatası verirse internet yok ("offline"); karışık ya da beklenmedik
 * cevap (ör. giriş sayfasına yönlendiren otel ağı) "unknown" - o durumda eski
 * "bağlantı kurulamadı" metni kalıyor.
 *
 * GİZLİLİK: istekler çerezsiz, gövdesiz, düz GET; kullanıcıya dair hiçbir şey
 * (kimlik, hesap, cihaz bilgisi) taşımıyor ve cevap hiçbir yere gönderilmiyor.
 * Karşı taraf yalnız her HTTP isteğinin kaçınılmaz olarak gösterdiği IP adresini
 * görüyor - işletim sisteminin kendi bağlantı yoklamasıyla aynı. Gizlilik
 * politikasına etkisi yok.
 */

export type NetworkDiagnosis = "offline" | "blocked" | "unknown";

type Probe = { url: string; ok: (res: Response) => Promise<boolean> };

/*
  ÖLÇÜT SIKI: esir portal (captive portal) bu adreslere 200 ve bir HTML giriş
  sayfası döndürüyor. gstatic YALNIZ 204 sayılıyor; Cloudflare'in izi ise düz
  metin ve `colo=` satırı taşıyor - portal sayfasında o yok.
*/
const PROBES: Probe[] = [
  { url: "https://www.gstatic.com/generate_204", ok: async (r) => r.status === 204 },
  {
    url: "https://cloudflare.com/cdn-cgi/trace",
    ok: async (r) => r.status >= 200 && r.status < 300 && /(^|\n)colo=/.test(await r.text().catch(() => "")),
  },
];

export const PROBE_TIMEOUT_MS = 4000;
export const DIAGNOSIS_TTL_MS = 60_000;

type Result = "reached" | "neterror" | "other";

async function probe(p: Probe): Promise<Result> {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), PROBE_TIMEOUT_MS);
  try {
    const res = await fetch(p.url, {
      method: "GET",
      credentials: "omit",
      cache: "no-store",
      signal: ctl.signal as RequestInit["signal"],
    });
    return (await p.ok(res)) ? "reached" : "other";
  } catch {
    // TypeError (ağ hatası) ya da AbortError (zaman aşımı): ikisi de "ulaşılamadı".
    return "neterror";
  } finally {
    clearTimeout(timer);
  }
}

let cached: { at: number; value: NetworkDiagnosis } | null = null;
let inflight: Promise<NetworkDiagnosis> | null = null;

/**
 * Bizim sunucuya ağ hatası alındığında çağrılır. Sonuç 60 sn önbellekte;
 * aynı anda gelen çağrılar tek yoklamayı paylaşıyor (ağı yormasın). En çok
 * ~4 sn sürer - iki yoklama paralel. Hiçbir zaman fırlatmaz.
 */
export function diagnoseNetwork(): Promise<NetworkDiagnosis> {
  if (cached && Date.now() - cached.at < DIAGNOSIS_TTL_MS) return Promise.resolve(cached.value);
  if (inflight) return inflight;
  inflight = (async () => {
    let value: NetworkDiagnosis = "unknown";
    try {
      const results = await Promise.all(PROBES.map(probe));
      if (results.includes("reached")) value = "blocked";
      else if (results.every((r) => r === "neterror")) value = "offline";
    } catch { /* "unknown" */ }
    cached = { at: Date.now(), value };
    inflight = null;
    return value;
  })();
  return inflight;
}

/** Yalnız testler için. */
export function resetNetworkDiagnosis(): void {
  cached = null;
  inflight = null;
}
