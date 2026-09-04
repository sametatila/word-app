import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getSession, signIn as apiSignIn, signUp as apiSignUp, signOut as apiSignOut, type AuthUser, type AuthOutcome } from "./auth";
import { loadOnboardingPrefs, clearOnboardingPrefs, hasPrefs } from "./onboardingPrefs";
import { updateProfile } from "./updateProfile";
import { configureBilling } from "./billing";
import { googleSignOut } from "./googleAuth";
import { bridgeRefresh } from "./ttsBridge";

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => { setUser(await getSession()); }, []);

  /** Misafirken seçilen anadil/kurs/hedef/seviye — giriş yapınca profile taşınır. */
  const applyPrefs = useCallback(async () => {
    const prefs = await loadOnboardingPrefs();
    if (!hasPrefs(prefs)) return;
    const ok = await updateProfile({
      ...(prefs.course ? { course: prefs.course } : {}),
      ...(prefs.goal ? { dailyGoal: prefs.goal } : {}),
      ...(prefs.level ? { level: prefs.level } : {}),
      ...(prefs.nativeLang ? { nativeLang: prefs.nativeLang } : {}),
    });
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

  // Kullanıcı değişince RevenueCat'i Neon kimliğiyle başlat/güncelle (web+mobil
  // aynı entitlement). Anahtar yoksa güvenle no-op.
  useEffect(() => { void configureBilling(user?.id ?? null); }, [user?.id]);

  // Giriş yapılınca (veya açılışta oturum geri yüklenince) TTS köprüsünü tazele.
  // Köprü uygulama kökünde girişten ÖNCE yükleniyor; taze kurulum/silip-yükle
  // sonrası oturumsuz kalıp o oturumu cihaz TTS'ine kilitliyordu. Giriş sonrası
  // oturum çerezi artık paylaşımlı depoda (Android CookieManager / iOS shared)
  // olduğundan reload köprüyü kimlikli yapar → Katja/Conrad/Emel yeni kurulumda da çalışır.
  useEffect(() => { if (user?.id) bridgeRefresh(true); }, [user?.id]);

  const signIn = useCallback(async (email: string, password: string) => {
    const r = await apiSignIn(email, password);
    if (r.ok) { setUser(r.user ?? (await getSession())); await applyPrefs(); }
    return r;
  }, [applyPrefs]);

  const signUp = useCallback(async (name: string, email: string, password: string) => {
    const r = await apiSignUp(name, email, password);
    if (r.ok) { setUser(r.user ?? (await getSession())); await applyPrefs(); }
    return r;
  }, [applyPrefs]);

  const signOut = useCallback(async () => {
    await apiSignOut();
    // Google SDK oturumunu da kapat ki tekrar girişte hesap seçici açılsın
    // (yoksa önceki hesaba sessizce girilir). Hata olsa da çıkışı sürdür.
    try { await googleSignOut(); } catch { /* yut */ }
    setUser(null);
  }, []);

  const socialComplete = useCallback(async () => {
    const u = await getSession();
    setUser(u);
    if (u) await applyPrefs();
    return !!u;
  }, [applyPrefs]);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refresh, socialComplete }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
