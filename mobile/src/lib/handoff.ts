import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE, fetchWithTimeout } from "../api/client";

/**
 * TARAYICIDAN DEVİR — cihaza bağlama.
 *
 * `/auth/app?ott=…` bağlantısı tek kullanımlık bir giriş jetonu taşıyor ve
 * uygulama onu oturuma çeviriyor. Jetonu kimin ürettiğine bakılmıyordu:
 * saldırgan kendi hesabının jetonunu bir bağlantıyla (ya da telefondaki bir
 * uygulamadan doğrudan `Intent` ile) gönderince kurbanın uygulaması sessizce
 * saldırganın hesabına geçiyordu. Gerekçenin tamamı sunucuda
 * (`app/api/handoff-nonce`).
 *
 * Kural: devir yalnız BU cihazın başlattığı bir tarayıcı girişinin
 * sonucuysa kabul ediliyor. Başlatırken alınan değer saklanıyor, dönüşte
 * adresteki değerle karşılaştırılıp siliniyor.
 *
 * AsyncStorage'da (bellekte değil) çünkü kullanıcı tarayıcıdayken sistem
 * uygulamayı kapatabiliyor; dönüş soğuk açılışla geliyor. Cihaza ait ve kısa
 * ömürlü: kullanılınca ya da süresi geçince siliniyor.
 */
const KEY = "lernomi:handoff";

/**
 * Değerin ömrü. Apple girişi (iki adımlı doğrulamayla birlikte) birkaç
 * dakika sürebiliyor; jetonun kendi ömrü devirden sonra 3 dakika.
 */
const TTL_MS = 15 * 60 * 1000;

type Pending = { n: string; at: number };

/** Tarayıcı girişini başlatmadan önce çağrılır; dönüş adresine konacak değeri verir. */
export async function beginHandoff(): Promise<string | null> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/handoff-nonce`, { headers: { accept: "application/json" } });
    if (!res.ok) return null;
    const { nonce } = (await res.json()) as { nonce?: unknown };
    if (typeof nonce !== "string" || !/^[A-Za-z0-9_-]{16,128}$/.test(nonce)) return null;
    await AsyncStorage.setItem(KEY, JSON.stringify({ n: nonce, at: Date.now() } satisfies Pending));
    return nonce;
  } catch {
    return null;
  }
}

/**
 * Gelen devir bu cihazın başlattığı giriş mi.
 *
 * Eşleşince değer SİLİNİYOR: tek kullanımlık, ikinci bir bağlantı onu tekrar
 * kullanamasın. Eşleşmeyen bağlantı silmiyor: kullanıcının gerçek dönüşü
 * hâlâ yolda olabilir, araya giren sahte bir bağlantı onu bozamamalı.
 */
export async function consumeHandoff(nonce: string | null | undefined): Promise<boolean> {
  let pending: Pending | null = null;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    pending = raw ? (JSON.parse(raw) as Pending) : null;
  } catch {
    pending = null;
  }
  if (!pending || typeof pending.n !== "string" || typeof pending.at !== "number") return false;
  const expired = Date.now() - pending.at >= TTL_MS;
  const match = !expired && typeof nonce === "string" && pending.n === nonce;
  if (match || expired) {
    try { await AsyncStorage.removeItem(KEY); } catch { /* yut */ }
  }
  return match;
}
