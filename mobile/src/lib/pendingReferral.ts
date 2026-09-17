import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api/client";

/**
 * Davet bağının kurulması — ve kurulamadığında BEKLETİLMESİ.
 *
 * Bağ `/r/<KOD>` bağlantısına dokunulunca kuruluyor (bkz. `lib/deepLink`,
 * `App.tsx`). Ama bağlantıya dokunan kişi o anda GİRİŞ YAPMAMIŞ ya da MİSAFİR
 * olabilir: uç hesap istiyor (`requireAccount`) ve misafire kapalı. O anda
 * vazgeçilirse davet sessizce kaybolurdu — hem de tam büyüme döngüsünün
 * ortasında.
 *
 * Bu yüzden kod cihazda bekliyor ve hesap belirdiğinde uygulanıyor.
 *
 * ÇIKIŞTA SİLİNMİYOR (`accountScope` listesinde yok) ve bu bilerek: kod
 * hesaptan ÖNCE geliyor, hesaba ait değil — cihaza gelen bir niyet. Çıkışta
 * silinseydi "bağlantıya dokun, sonra kayıt ol" akışı tam ortasından kopardı.
 *
 * SÜRESİ VAR. Aynı telefonda A bağlantıya dokunup vazgeçse ve haftalar sonra
 * B giriş yapsa, B yanlışlıkla A'nın davetçisine bağlanırdı. Bağ kimseye
 * zarar vermiyor (girene hiçbir şey vermiyor, ödül davetçiye ve ancak gerçek
 * ödemede düşüyor) ama yine de yanlış kayıt; pencere onu sınırlıyor.
 */

const KEY = "lernomi:pending-referral";
const TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type ReferralResult = "ok" | "already" | "self" | "unknown" | "error";

type Pending = { code: string; at: number };

/** Uçtan dönen ham sonucu arayüzün anladığı tek kelimeye çevirir. */
function toResult(raw: unknown): ReferralResult {
  switch (raw) {
    case "ok":
      return "ok";
    case "already":
      return "already";
    case "self":
      return "self";
    case "unknown_code":
      return "unknown";
    default:
      return "error";
  }
}

/** Bağı ŞİMDİ kurmayı dener. Hesap yoksa/uç reddederse `null` döner. */
export async function attachReferral(code: string): Promise<ReferralResult | null> {
  try {
    const r = await api<{ ok?: boolean; result?: string }>("/api/premium/referral", {
      method: "POST",
      body: JSON.stringify({ code }),
    });
    return toResult(r.result);
  } catch {
    /* Hesap yok (401/403), ağ yok ya da sunucu hatası: çağıran bekletmeye
       karar veriyor. Burada "başarısız" ile "henüz olmadı" ayrılmıyor çünkü
       ikisinde de yapılacak şey aynı: kodu sakla, sonra dene. */
    return null;
  }
}

export async function savePendingReferral(code: string): Promise<void> {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify({ code, at: Date.now() } satisfies Pending));
  } catch {
    /* yut — davet kaybolur, uygulama çalışmaya devam eder */
  }
}

export async function clearPendingReferral(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEY);
  } catch {
    /* yut */
  }
}

/**
 * Bekleyen kod varsa uygular. Giriş yapıldıktan sonra çağrılıyor.
 *
 * Sonuç ne olursa olsun kod SİLİNİYOR: "zaten davetlisin" ve "böyle bir kod
 * yok" da nihai cevaplar, tekrar denemenin faydası yok. Yalnız `null`
 * (uygulanamadı: ağ yok, hesap henüz yok) kodu yerinde bırakıyor.
 */
export async function applyPendingReferral(): Promise<ReferralResult | null> {
  let pending: Pending | null = null;
  try {
    const raw = await AsyncStorage.getItem(KEY);
    pending = raw ? (JSON.parse(raw) as Pending) : null;
  } catch {
    return null;
  }
  if (!pending?.code) return null;

  if (!(typeof pending.at === "number") || Date.now() - pending.at > TTL_MS) {
    await clearPendingReferral();
    return null;
  }

  const r = await attachReferral(pending.code);
  if (r !== null) await clearPendingReferral();
  return r;
}
