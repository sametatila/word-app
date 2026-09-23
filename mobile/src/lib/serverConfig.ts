import { api } from "../api/client";

/**
 * Herkese açık sunucu yapılandırması (GET /api/config): hangi giriş sağlayıcıları açık.
 * Hata ya da eski sunucu: sağlayıcılar kapalı sayılır (yalnız e-posta) — düğme
 * gösterip başarısız olmaktan iyidir. Apple için bu ayrıca ZORUNLU: sunucuda
 * sağlayıcı yokken düğmeyi çizmek, iOS'ta çalışmayan bir "Apple ile devam et"
 * demek olur ve inceleme onu bozuk işlevsellik sayar.
 */
/**
 * `turnstileSiteKey`: bot koruması açıksa Turnstile'ın genel anahtarı, kapalıysa
 * boş dize. Boşken uygulama doğrulama kutusunu HİÇ çizmiyor; doluyken kayıt,
 * giriş ve sıfırlama isteklerine jeton iliştirmek ZORUNLU (sunucu jetonsuz
 * isteği reddediyor).
 */
export type ServerConfig = {
  auth: boolean;
  /**
   * `apple` NATIVE akış (iOS), `appleWeb` TARAYICI akışı (Android).
   * Android'de Apple'ın native yolu yok; oradaki düğme ancak sunucuda Services
   * ID tanımlıyken anlamlı, yoksa kullanıcıyı Apple'ın hata sayfasına götürür.
   */
  providers: { google: boolean; apple: boolean; appleWeb: boolean };
  turnstileSiteKey: string;
  /**
   * Misafir açılışında cihaz doğrulaması (Play Integrity, kayıt kipi). `null`:
   * kip kapalı, Android istemci belge İSTEMİYOR (bkz. lib/integrity). Doluyken
   * belge hazırlığının istediği Google Cloud proje numarası.
   */
  guestAttestation: { cloudProjectNumber: string } | null;
  /**
   * Uygulama denetimi (panelden): zorunlu/önerilen build, bakım modu, mağaza
   * bağlantıları. Biçim web `lib/app-control-shared` ile aynı. Eski sunucu ya
   * da hata: `null` - kapı hiçbir şeyi engellemiyor.
   */
  app: AppControl | null;
};

export type AppControl = {
  minBuild: { ios: number; android: number };
  latestBuild: { ios: number; android: number };
  store: { ios: { live: boolean; url: string }; android: { live: boolean; url: string } };
  maintenance: { enabled: boolean; message: { tr: string; en: string; de: string } };
};

function appControlOf(raw: unknown): AppControl | null {
  if (typeof raw !== "object" || raw === null) return null;
  const o = raw as Record<string, Record<string, unknown> | undefined>;
  const n = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : 0);
  const st = (o.store ?? {}) as Record<string, Record<string, unknown> | undefined>;
  const m = (o.maintenance ?? {}) as Record<string, unknown>;
  const msg = (m.message ?? {}) as Record<string, unknown>;
  const s = (v: unknown) => (typeof v === "string" ? v : "");
  return {
    minBuild: { ios: n(o.minBuild?.ios), android: n(o.minBuild?.android) },
    latestBuild: { ios: n(o.latestBuild?.ios), android: n(o.latestBuild?.android) },
    store: {
      ios: { live: st.ios?.live === true, url: s(st.ios?.url) },
      android: { live: st.android?.live === true, url: s(st.android?.url) },
    },
    maintenance: { enabled: m.enabled === true, message: { tr: s(msg.tr), en: s(msg.en), de: s(msg.de) } },
  };
}

function attestationOf(raw: unknown): ServerConfig["guestAttestation"] {
  const n = (raw as { cloudProjectNumber?: unknown } | null | undefined)?.cloudProjectNumber;
  return typeof n === "string" && /^\d{1,20}$/.test(n) ? { cloudProjectNumber: n } : null;
}

let cached: ServerConfig | null = null;

/**
 * `fresh`: önbelleği atla. Uygulama denetimi (bakım, zorunlu güncelleme)
 * süreç ömrü boyunca önbellekte kalırsa panelden açılan bakım, uygulamayı
 * kapatmayan kullanıcıya hiç ulaşmaz; kapı ön plana dönüşte taze okuyor.
 */
export async function fetchServerConfig(fresh = false): Promise<ServerConfig> {
  if (cached && !fresh) return cached;
  try {
    const c = await api<Partial<ServerConfig>>("/api/config");
    cached = {
      auth: c.auth !== false,
      providers: { google: Boolean(c.providers?.google), apple: Boolean(c.providers?.apple), appleWeb: Boolean(c.providers?.appleWeb) },
      turnstileSiteKey: typeof c.turnstileSiteKey === "string" ? c.turnstileSiteKey : "",
      guestAttestation: attestationOf((c as { guestAttestation?: unknown }).guestAttestation),
      app: appControlOf((c as { app?: unknown }).app),
    };
  } catch {
    /* Taze okuma düştüyse eldeki yapılandırma korunuyor: ağ hıçkırığı bakım
       ekranını kaldırıp geri getirmesin. */
    if (fresh && cached) return cached;
    cached = { auth: true, providers: { google: false, apple: false, appleWeb: false }, turnstileSiteKey: "", guestAttestation: null, app: null };
  }
  return cached;
}
