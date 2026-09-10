import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { forgetAccountScoped } from "./accountScope";
import { getSession, signIn as apiSignIn, signUp as apiSignUp, signOut as apiSignOut, type AuthUser, type AuthOutcome } from "./auth";
import { registerPushDevice, unregisterPushDevice } from "./pushDevice";
import { loadOnboardingPrefs, clearOnboardingPrefs, hasPrefs } from "./onboardingPrefs";
import { updateProfile } from "./updateProfile";
import { billingLogout, configureBilling } from "./billing";
import { googleSignOut } from "./googleAuth";
import { bridgeRefresh } from "./ttsBridge";
import { clearPremium } from "./premium";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDED_KEY } from "./onboarding";

type Ctx = {
  user: AuthUser | null;
  /** Oturum ilk kez okunuyor (açılış): ekran kararı bunu bekler. */
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthOutcome>;
  signUp: (name: string, email: string, password: string) => Promise<AuthOutcome>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  /** Sosyal giriş WebView'i bitince: oturumu tazele + onboarding prefs'i uygula. */
  socialComplete: () => Promise<boolean>;
};

const AuthContext = createContext<Ctx>({
  user: null, loading: true,
  signIn: async () => ({ ok: false, code: "", message: "" }),
  signUp: async () => ({ ok: false, code: "", message: "" }),
  signOut: async () => {},
  refresh: async () => {},
  socialComplete: async () => false,
});

/**
 * Hesap az önce mi açıldı? E-posta yolunda soru kesin yanıtlanıyor (kayıt mı
 * giriş mi); sosyal girişte tek düğme ikisini birden yaptığı için geriye
 * hesabın yaşı kalıyor. Okunamazsa ESKİ hesap sayılır: belirsizlikte koruma
 * yönüne düşmek gerekiyor, çünkü yanlış korumanın bedeli kullanıcının kursunu
 * ayarlardan bir kez seçmesi, yanlış ezmenin bedeli hesabındaki gerçek
 * seviyenin kaybı.
 */
const YENI_HESAP_PENCERESI_MS = 5 * 60_000;
function yeniHesapMi(u: AuthUser | null): boolean {
  const acilis = u?.createdAt ? Date.parse(u.createdAt) : NaN;
  return Number.isFinite(acilis) && Date.now() - acilis < YENI_HESAP_PENCERESI_MS;
}

/**
 * Profile yazılabilir GERÇEK ad — yoksa boş döner. `name` alanı isim yokken
 * e-postaya düşüyor (bkz. auth.userFrom) ve o değer görünen ada yazılamaz:
 * görünen ad sıralamada ve arkadaş listesinde başkalarına görünüyor, yani
 * kullanıcının e-posta adresini yayınlardı.
 */
function gercekAd(u: AuthUser | null): string {
  const ad = (u?.name ?? "").trim();
  // İki harften kısası sunucuda zaten reddediliyor (api/profile name_required):
  // göndermek isteğin tamamını düşürür, burada eleniyor.
  return ad.length >= 2 && ad !== (u?.email ?? "").trim() ? ad : "";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => { setUser(await getSession()); }, []);

  /**
   * Girişten sonra cihazı hesaba bağlar ve misafirken seçilen anadil/kurs/hedef/
   * seviyeyi devreder.
   *
   * Seçimler YALNIZCA yeni hesaba yazılır. Zaten kayıtlı biri ilk açılış akışını
   * yürüyüp giriş yaptığında (yeni telefon, silip yeniden kurma) kendi ayarları
   * eziliyordu: "Sıfırdan"a basan bir B1 kullanıcısı A1'e düşüyor, günlük hedefi
   * ve kursu akışta seçilenle değişiyordu — hissiyat değil, veri kaybı. Eski
   * hesapta sunucu yetkili: bekleyen seçimler yazılmadan atılıyor, temizlenince
   * anadili de sunucudan uygulanıyor (bkz. useMe.syncNativeLang).
   */
  const adoptAccount = useCallback(async (u: AuthUser | null, yeniHesap: boolean) => {
    // İlk açılış akışını cihazda geride bırak. Akışı hiç görmemiş olabilir
    // (çıkışla atladı, ya da yeni cihazda doğrudan giriş yaptı); hesabı olan
    // birine o akış bir daha sorulmamalı.
    try { await AsyncStorage.setItem(ONBOARDED_KEY, "1"); } catch { /* depolama kapalıysa geç */ }

    const prefs = await loadOnboardingPrefs();
    if (!hasPrefs(prefs)) return;
    if (!yeniHesap) { await clearOnboardingPrefs(); return; }

    const patch = {
      ...(prefs.course ? { course: prefs.course } : {}),
      ...(prefs.goal ? { dailyGoal: prefs.goal } : {}),
      ...(prefs.level ? { level: prefs.level } : {}),
      ...(prefs.nativeLang ? { nativeLang: prefs.nativeLang } : {}),
    };
    // Ad aynı istekte gidiyor: sunucu "onboarding bitti" damgasını
    // (profiles.courseChosenAt) ancak kurs ve ad BİRLİKTE geldiğinde atıyor
    // (api/profile). Mobil profile hiç ad yazmadığı için mobilden açılan
    // hesaplar damgasız kalıyordu ve aynı kullanıcı web'e girince orada
    // yeniden onboarding'e düşüyordu — aynı kusurun web'deki yüzü.
    const ad = gercekAd(u);
    // Ad moderasyondan dönerse uç 400 veriyor ve istek TÜMDEN reddediliyor;
    // o hâlde kurs/seviye de yazılmamış olur, bu yüzden adsız bir kez daha denenir.
    const ok = (await updateProfile(ad ? { ...patch, displayName: ad } : patch))
      || (!!ad && (await updateProfile(patch)));
    if (ok) await clearOnboardingPrefs();
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const u = await getSession();
      if (alive) { setUser(u); setLoading(false); }
    })();
    return () => { alive = false; };
  }, []);

  // Kullanıcı değişince RevenueCat'i hesap kimliğiyle başlat/güncelle (web+mobil
  // aynı entitlement). Anahtar yoksa güvenle no-op.
  useEffect(() => { void configureBilling(user?.id ?? null); }, [user?.id]);

  // Uzak bildirim jetonu hesaba yazılıyor: oturum varken kaydet. Firebase
  // yapılandırması yoksa sessizce no-op (bkz. pushDevice.ts).
  useEffect(() => { if (user?.id) void registerPushDevice(); }, [user?.id]);

  // Giriş yapılınca (veya açılışta oturum geri yüklenince) TTS köprüsünü tazele.
  // Köprü uygulama kökünde girişten ÖNCE yükleniyor; taze kurulum/silip-yükle
  // sonrası oturumsuz kalıp o oturumu cihaz TTS'ine kilitliyordu. Giriş sonrası
  // oturum çerezi artık paylaşımlı depoda (Android CookieManager / iOS shared)
  // olduğundan reload köprüyü kimlikli yapar → Katja/Conrad/Emel yeni kurulumda da çalışır.
  useEffect(() => { if (user?.id) bridgeRefresh(true); }, [user?.id]);

  const signIn = useCallback(async (email: string, password: string) => {
    const r = await apiSignIn(email, password);
    // Giriş = hesap zaten vardı: akışta seçilenler değil, hesabın kendi ayarları geçerli.
    if (r.ok) { const u = r.user ?? (await getSession()); setUser(u); await adoptAccount(u, false); }
    return r;
  }, [adoptAccount]);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const r = await apiSignUp(name, email, password);
    if (r.ok) { const u = r.user ?? (await getSession()); setUser(u); await adoptAccount(u, true); }
    return r;
  }, [adoptAccount]);

  const signOut = useCallback(async () => {
    // Jeton ÖNCE siliniyor: çıkıştan sonra oturum çerezi kalmadığı için silme
    // isteği 401 alırdı ve cihaz eski hesabın bildirimlerini almaya devam ederdi.
    await unregisterPushDevice();
    await apiSignOut();
    // Google SDK oturumunu da kapat ki tekrar girişte hesap seçici açılsın
    // (yoksa önceki hesaba sessizce girilir). Hata olsa da çıkışı sürdür.
    try { await googleSignOut(); } catch { /* yut */ }
    /*
     * SATIN ALMA VE YETKİ ÖNBELLEĞİ DE KAPANIYOR.
     *
     * İkisi de bu iş için yazılmıştı ("oturum kapanınca çağrılır: bir sonraki
     * kullanıcı öncekinin yetkisini görmesin") ama çağıran yoktu. Uygulama
     * çıkışta yeniden başlamıyor - yalnız `user` null'a çekiliyor - yani
     * bellekteki durum aynen kalıyordu: aynı cihazda A çıkıp B girince B,
     * sunucudan taze durum gelene kadar A'nın premium'unu görüyordu.
     * RevenueCat oturumu da A'nın kimliğinde kalıyor ve satın alma
     * devralınabiliyordu.
     *
     * Web'de bu sorun yok çünkü çıkış tam gezinme yapıyor ve istemci durumu
     * baştan kuruluyor.
     */
    await billingLogout();
    clearPremium();
    /*
     * KALICI KATMAN DA TEMİZLENİYOR.
     *
     * Üstteki iki satır BELLEKTEKİ durumu kapatıyor; `AsyncStorage` olduğu gibi
     * kalıyordu. Yani aynı telefonda A çıkıp B girdiğinde B, A'nın avatarını,
     * serisini, günün turu/haftalık önbelleğini, yarım dersini ve deneme
     * koşularını görüyordu - yukarıdaki gerekçenin kalıcı hâli.
     * Web bunu kimlik değişince yapıyor (`session-keeper`); hangi anahtarların
     * hesaba, hangilerinin cihaza ait olduğu `lib/accountScope`ta yazılı.
     */
    await forgetAccountScoped();
    setUser(null);
  }, []);

  const socialComplete = useCallback(async () => {
    const u = await getSession();
    setUser(u);
    // Sosyal düğme hem kayıt hem giriş: hesabın yaşı ayırıyor (bkz. yeniHesapMi).
    if (u) await adoptAccount(u, yeniHesapMi(u));
    return !!u;
  }, [adoptAccount]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refresh, socialComplete }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
