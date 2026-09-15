import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Keychain from "react-native-keychain";
import { api, API_BASE, ApiError, fetchWithTimeout } from "../api/client";

/**
 * MİSAFİR KİMLİĞİ — istemci tarafı (mağaza ön inceleme B24, App Store 5.1.1(v)).
 *
 * "Hesapsız devam et" sunucuda e-postasız, adsız bir kimlik açıyor
 * (`/api/auth/sign-in/anonymous`); oturum çerezi gerçek hesabınki gibi yerel
 * kavanozda duruyor ve öğrenme uçları o oturumla çalışıyor. Sosyal, yapay
 * zekâ, satın alma ve bildirim hesap istiyor: sunucu misafire
 * `403 account_required` dönüyor (bkz. `isAccountRequired`).
 *
 * JETON CİHAZDA AYRICA SAKLANIYOR. Misafir hesap oluşturduğunda ya da var olan
 * hesabına girdiğinde çerez kavanozundaki misafir oturumunun yerini gerçek
 * oturum alıyor; misafirin kim olduğunu kanıtlayan tek şey açılışta dönen bu
 * jeton. Gerçek oturum açılır açılmaz `claimGuest` onu sunucuya veriyor ve
 * misafirin ilerlemesi hesaba birleşiyor.
 *
 * Anahtar CİHAZA ait (`accountScope` dışında): çıkışta silinmiyor, çünkü
 * birleşme tamamlanmadan silinirse misafirin ilerlemesi kurtarılamaz. Kayıt
 * birleşme bitince, misafir silinince ya da sunucu misafiri tanımayınca siliniyor.
 */
export const GUEST_KEY = "lernomi:guest";

/** Sunucunun hesap isteyen uçlardaki cevabı (bkz. sunucu lib/auth/guest). */
export const ACCOUNT_REQUIRED = "account_required";

export type GuestRecord = {
  id: string;
  token: string;
  at: number;
  /**
   * Birleştirmenin İLK denendiği hesap. Deneme ağ yüzünden yarım kalırsa bir
   * sonraki açılışta yalnız AYNI hesap için yeniden deneniyor: o hesap çıkış
   * yapıp aynı telefonda başkası girerse misafirin ilerlemesi yanlış kişiye
   * geçmesin.
   */
  for?: string;
};

/** Hata "bu özellik hesap istiyor" mu. */
/**
 * Misafirde yapay zekâ çağrısı ATILMIYOR — uç kesin 403 account_required
 * dönecekti. Çağıranlar isteğin yerine bu hatayı fırlatıyor; böylece hesap
 * cümlesi ve yedek yol isteğin gerçekten reddedildiği yolla aynı kalıyor.
 */
export function accountRequiredError(): ApiError {
  return new ApiError(403, ACCOUNT_REQUIRED);
}

export function isAccountRequired(e: unknown): boolean {
  return e instanceof ApiError && e.status === 403 && e.message === ACCOUNT_REQUIRED;
}

/*
 * KAYIT GÜVENLİ DEPODA — iOS Keychain, Android Keystore (react-native-keychain).
 *
 * Jeton misafirin oturumunun KENDİSİ: onu bilen misafir olarak girer ve
 * ilerlemesini bir hesaba birleştirebilir. AsyncStorage'da açık metin
 * duruyordu. Güvenli depo iki şey kazandırıyor: jeton şifreli ve (iOS'ta)
 * uygulama silinip yeniden kurulsa da duruyor — misafir ilerlemesine dönüyor
 * (bkz. lib/auth/guest-resume). `THIS_DEVICE_ONLY`: iCloud yedeğiyle başka bir
 * cihaza taşınmıyor; Android'de `allowBackup=false` zaten aynı işi yapıyor.
 *
 * Güvenli depo açılamazsa (eski cihaz, bozuk anahtar deposu) kayıt
 * AsyncStorage'a düşüyor: şifresiz bir jeton, kaybolmuş bir ilerlemeden iyi.
 * Eski sürümün AsyncStorage kaydı ilk okumada güvenli depoya taşınıyor.
 */
const SECURE_SERVICE = "app.lernomi.guest";

async function readSecure(): Promise<string | null> {
  try {
    const c = await Keychain.getGenericPassword({ service: SECURE_SERVICE });
    return c ? c.password : null;
  } catch {
    return null;
  }
}

async function writeSecure(raw: string): Promise<boolean> {
  try {
    return Boolean(await Keychain.setGenericPassword("guest", raw, { service: SECURE_SERVICE, accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY }));
  } catch {
    return false;
  }
}

function parseRecord(raw: string | null): GuestRecord | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as Partial<GuestRecord>;
    return typeof v.id === "string" && typeof v.token === "string"
      ? { id: v.id, token: v.token, at: Number(v.at) || 0, ...(typeof v.for === "string" ? { for: v.for } : {}) }
      : null;
  } catch {
    return null;
  }
}

/** Kaydı yazar: önce güvenli depo, olmazsa AsyncStorage. */
export async function saveGuestRecord(record: GuestRecord): Promise<void> {
  const raw = JSON.stringify(record);
  if (await writeSecure(raw)) {
    try { await AsyncStorage.removeItem(GUEST_KEY); } catch { /* geç */ }
    return;
  }
  try { await AsyncStorage.setItem(GUEST_KEY, raw); } catch { /* depolama kapalıysa geç */ }
}

export async function loadGuestRecord(): Promise<GuestRecord | null> {
  const secure = parseRecord(await readSecure());
  if (secure) return secure;
  let legacy: GuestRecord | null = null;
  try { legacy = parseRecord(await AsyncStorage.getItem(GUEST_KEY)); } catch { /* geç */ }
  // Eski sürümün açık metin kaydı: güvenli depoya taşınıyor.
  if (legacy) await saveGuestRecord(legacy);
  return legacy;
}

export async function clearGuestRecord(): Promise<void> {
  try { await Keychain.resetGenericPassword({ service: SECURE_SERVICE }); } catch { /* geç */ }
  try { await AsyncStorage.removeItem(GUEST_KEY); } catch { /* depolama kapalıysa geç */ }
}

export type GuestStart =
  | { ok: true; record: GuestRecord }
  /** `status` 429: kimlik açma sınırı (IP başına saatte 10); 0: ağ yok. */
  | { ok: false; status: number; code: string };

/** Sunucuda misafir kimliği açar ve jetonunu cihaza yazar. */
export async function startGuest(): Promise<GuestStart> {
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/auth/sign-in/anonymous`, {
      method: "POST",
      // `origin` elle: RN koymuyor, Better Auth çerez taşıyan POST'ta şart koşuyor.
      headers: { "content-type": "application/json", accept: "application/json", origin: API_BASE },
      body: "{}",
    });
    const json = (await res.json().catch(() => null)) as { token?: unknown; user?: { id?: unknown }; code?: unknown } | null;
    const token = typeof json?.token === "string" ? json.token : "";
    const id = typeof json?.user?.id === "string" ? json.user.id : "";
    if (!res.ok || !token || !id) return { ok: false, status: res.status, code: typeof json?.code === "string" ? json.code : "" };
    const record: GuestRecord = { id, token, at: Date.now() };
    await saveGuestRecord(record);
    return { ok: true, record };
  } catch {
    return { ok: false, status: 0, code: "NETWORK" };
  }
}

export type ResumeOutcome =
  /** Misafirin oturum çerezi geri kuruldu. */
  | "resumed"
  /** Misafir yok (temizlik silmiş, jeton geçersiz): kayıt silindi. */
  | "gone"
  /** Ağ, sınır ya da sunucu hatası: kayıt duruyor. */
  | "retry";

/**
 * Çerezini kaybetmiş misafiri kimliğine geri döndürür (sunucu
 * `lib/auth/guest-resume`).
 *
 * Misafirin giriş yolu yok; çerez giderse (iki adımlı doğrulaması olan bir
 * hesaba giriş denenip kod girilmeden vazgeçilirse, çerez deposu sıfırlanırsa)
 * giriş ekranındaki "Hesapsız devam et" YENİ bir kimlik açıp eskisinin
 * ilerlemesini sahipsiz bırakıyordu. Hesaba sabitlenmiş kayıt (`for`) bekleyen
 * bir birleştirmedir, geri kurulmaz.
 */
export async function resumeGuest(record: GuestRecord): Promise<ResumeOutcome> {
  if (record.for) return "gone";
  try {
    const res = await fetchWithTimeout(`${API_BASE}/api/auth/guest/resume`, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json", origin: API_BASE },
      body: JSON.stringify({ guestId: record.id, token: record.token }),
    });
    const json = (await res.json().catch(() => null)) as { token?: unknown; code?: unknown } | null;
    /* YALNIZ SUNUCUNUN AÇIK HÜKMÜ "YOK" SAYILIYOR. Çıplak bir 404 (uç henüz
       yayında değil, vekil sunucu hatası) kaydı silseydi misafirin ilerlemesi
       bir daha birleştirilemezdi; o hâlde kayıt duruyor ve sonra yeniden deneniyor. */
    if (!res.ok && (json?.code === "GUEST_NOT_FOUND" || json?.code === "BAD_REQUEST")) { await clearGuestRecord(); return "gone"; }
    if (!res.ok) return "retry";
    // Süresi geçmiş oturumun yerine yenisi açıldıysa jeton değişti: birleştirme onu isteyecek.
    if (typeof json?.token === "string" && json.token && json.token !== record.token) {
      await saveGuestRecord({ ...record, token: json.token });
    }
    return "resumed";
  } catch {
    return "retry";
  }
}

export type ClaimOutcome =
  /** Misafirin ilerlemesi hesaba birleşti; `hadProgress` hesapta önceden ilerleme vardı. */
  | { kind: "merged"; hadProgress: boolean }
  /** Birleştirilecek misafir yok (temizlik silmiş, jeton geçersiz, zaten birleşmiş). */
  | { kind: "gone" }
  /** Ağ, sınır ya da sunucu hatası: kayıt duruyor, bir sonraki açılışta yeniden denenir. */
  | { kind: "retry" };

/**
 * Gerçek hesabın oturumuyla misafiri hesaba birleştirir. Oturum açıldıktan
 * SONRA ve hesabın başka bir isteğinden ÖNCE çağrılır: önce çağrılırsa (profil
 * yazımı, kuyruk boşaltma) hesap misafirin seçimlerini görmeden kendi boş
 * satırlarını kurar.
 */
export async function claimGuest(record: GuestRecord, accountId: string): Promise<ClaimOutcome> {
  if (record.for && record.for !== accountId) return { kind: "gone" };
  if (!record.for) {
    await saveGuestRecord({ ...record, for: accountId });
  }
  try {
    const r = await api<{ merged?: boolean; targetHadProgress?: boolean }>("/api/account/guest/claim", {
      method: "POST",
      body: JSON.stringify({ guestId: record.id, token: record.token }),
    });
    await clearGuestRecord();
    return { kind: "merged", hadProgress: Boolean(r?.targetHadProgress) };
  } catch (e) {
    if (e instanceof ApiError && (e.status === 400 || e.status === 404 || e.status === 409)) {
      await clearGuestRecord();
      return { kind: "gone" };
    }
    return { kind: "retry" };
  }
}

export type ClaimPreview =
  | { kind: "preview"; guestHasProgress: boolean; targetHasProgress: boolean }
  /** Sunucu kipi tanımadı ve DOĞRUDAN birleştirdi (eski sürüm): sonuç bu. */
  | { kind: "merged"; hadProgress: boolean }
  | { kind: "gone" }
  | { kind: "retry" };

/**
 * Birleştirmeden ÖNCE iki tarafın ilerlemesi — hiçbir şey değişmiyor
 * (sunucu `mode: "preview"`). Var olan, içinde ilerleme olan bir hesaba
 * girişte "bu cihazdaki ilerleme hesabına eklensin mi?" diye sorabilmek için.
 *
 * Kipi tanımayan eski sunucu doğrudan birleştirir; yanıtında `merged` varsa
 * birleşme olmuştur ve kayıt siliniyor (soru soracak bir şey kalmadı).
 */
export async function previewGuestClaim(record: GuestRecord): Promise<ClaimPreview> {
  try {
    const r = await api<{ merged?: boolean; targetHadProgress?: boolean; guestHasProgress?: boolean; targetHasProgress?: boolean }>("/api/account/guest/claim", {
      method: "POST",
      body: JSON.stringify({ guestId: record.id, token: record.token, mode: "preview" }),
    });
    if (r?.merged) { await clearGuestRecord(); return { kind: "merged", hadProgress: Boolean(r.targetHadProgress) }; }
    return { kind: "preview", guestHasProgress: Boolean(r?.guestHasProgress), targetHasProgress: Boolean(r?.targetHasProgress) };
  } catch (e) {
    if (e instanceof ApiError && (e.status === 400 || e.status === 404 || e.status === 409)) {
      await clearGuestRecord();
      return { kind: "gone" };
    }
    return { kind: "retry" };
  }
}

/** Kullanıcı eklemek istemedi: misafir sunucuda ve cihazda siliniyor. */
export async function discardGuestClaim(record: GuestRecord): Promise<"discarded" | "retry"> {
  try {
    await api<{ discarded?: boolean }>("/api/account/guest/claim", { method: "POST", body: JSON.stringify({ guestId: record.id, token: record.token, mode: "discard" }) });
  } catch (e) {
    if (!(e instanceof ApiError && e.status === 404)) return "retry";
  }
  await clearGuestRecord();
  return "discarded";
}

/** Misafirin sunucudaki verisini siler (Profil › Misafir verilerini sil). */
export async function deleteGuestData(): Promise<boolean> {
  const del = async (): Promise<"ok" | "no_session" | "failed"> => {
    try {
      await api("/api/account/guest", { method: "DELETE" });
      return "ok";
    } catch (e) {
      return e instanceof ApiError && e.status === 401 ? "no_session" : "failed";
    }
  };
  const first = await del();
  if (first !== "no_session") return first === "ok";
  /* OTURUM YOK AMA KİMLİK DURUYOR OLABİLİR: 401'i "silindi" saymak kaydı ve
     jetonu siliyor, sunucudaki satırlar ise haftalık temizliğe kadar kalıyordu.
     Önce oturum jetonla geri kuruluyor; kimlik gerçekten yoksa silinecek bir
     şey de yok. */
  const rec = await loadGuestRecord();
  if (!rec) return true;
  const resumed = await resumeGuest(rec);
  if (resumed === "gone") return true;
  if (resumed === "retry") return false;
  return (await del()) === "ok";
}
