import { api } from "../api/client";

/**
 * better-auth `/list-accounts` yanıtı. Alan adı `providerId` — `provider` DEĞİL.
 *
 * Burada eskiden `provider` yazıyordu ve `api<T>()` denetimsiz bir tip ataması
 * olduğu için TypeScript hiçbir şey söylemiyordu: `a.provider` her zaman
 * undefined dönüyor, Ayarlar'daki liste etiketsiz bir satır çiziyor ve Google
 * ile girmiş kullanıcıya "Bağlı değil" diyordu. Cihazda görüldü 2026-09-09.
 */
export type LinkedAccount = { id: string; providerId: string; accountId: string };

/**
 * Bağlı giriş yöntemleri (better-auth /list-accounts). Hata sessiz: liste boş
 * görünür, ayarlar ekranının geri kalanı çalışmaya devam eder.
 */
export async function listAccounts(): Promise<LinkedAccount[]> {
  try {
    // Süzgeç şart: `api<T>()` tip ATAMASI yapıyor, doğrulama değil. Alan adı
    // değişirse (bir kez değişti) sessizce undefined dolu bir liste dönerdi.
    const raw = await api<Partial<LinkedAccount>[]>("/api/auth/list-accounts");
    return (Array.isArray(raw) ? raw : [])
      .filter((a): a is LinkedAccount => typeof a?.providerId === "string");
  } catch {
    return [];
  }
}

/**
 * Bağlantıyı kaldırır.
 *
 * `fresh` dönerse oturum TAZE değil: uç `freshSessionMiddleware` kullanıyor
 * (oturum 24 saatten eskiyse reddediyor) — çalınmış çerezle giriş yöntemi
 * sökülemesin diye. Çağıran bunu kullanıcıya "yeniden giriş yap" diye
 * çevirmeli, genel hata olarak değil.
 */
export async function unlinkAccount(providerId: string): Promise<"ok" | "fresh" | "offline" | "error"> {
  try {
    await api("/api/auth/unlink-account", { method: "POST", body: JSON.stringify({ providerId }) });
    return "ok";
  } catch (e) {
    const status = (e as { status?: number })?.status;
    if (status === 401 || status === 403) return "fresh";
    /* DURUM KODU YOKSA AĞ HATASI: `api()` HTTP hatalarında `ApiError` (status
       dolu) atıyor, bağlantı kopmasında düz `Error`. İkisi aynı cümleye
       düşünce "internet yok" diyen kullanıcıya "biraz sonra tekrar dene"
       deniyordu; web ikisini ayırıyor (`linked.unlink_offline`). */
    return status === undefined ? "offline" : "error";
  }
}

/**
 * idToken'ın gövdesindeki e-posta — YALNIZCA istemci tarafı koruma için.
 *
 * İmza DOĞRULANMIYOR ve doğrulanmasına gerek de yok: bu değer bir yetki kararı
 * vermiyor, sunucuya gitmeyi ENGELLEMEK için okunuyor. Sunucu token'ı zaten
 * kendisi doğruluyor.
 *
 * NEDEN GEREKLİ: mobilde bağlama, native girişin kullandığı `/sign-in/social`
 * yolundan geçiyor (o uç `link-social`'ın aksine idToken kabul ediyor). Ama o
 * uç "bu e-postanın hesabına gir" demek: kullanıcı ayarlardan BAŞKA bir Google
 * hesabı seçerse bağlama olmaz, sessizce o hesaba geçilir ya da yeni hesap
 * açılır. Kıyas burada yapılıp o çağrı hiç kurulmuyor.
 */
export function tokenEmail(idToken: string): string | null {
  try {
    const govde = idToken.split(".")[1];
    if (!govde) return null;
    const b64 = govde.replace(/-/g, "+").replace(/_/g, "/");
    const dolgu = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const json = JSON.parse(globalThis.atob(dolgu)) as { email?: string };
    return typeof json.email === "string" ? json.email : null;
  } catch {
    return null;
  }
}

/** İki adres aynı hesabı mı gösteriyor (büyük/küçük ve boşluk gözetmeden). */
export function sameEmail(a: string | null | undefined, b: string | null | undefined): boolean {
  return !!a && !!b && a.trim().toLowerCase() === b.trim().toLowerCase();
}
