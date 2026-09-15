import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";
import { forgetAccountScoped } from "./accountScope";
import { getSession, getSessionState, signIn as apiSignIn, signUp as apiSignUp, signOut as apiSignOut, type AuthUser, type AuthOutcome } from "./auth";
import { claimGuest, clearGuestRecord, deleteGuestData, loadGuestRecord, resumeGuest, startGuest, type GuestRecord, type GuestStart } from "./guest";
import { registerPushDevice, unregisterPushDevice } from "./pushDevice";
import { loadOnboardingPrefs, clearOnboardingPrefs, hasPrefs } from "./onboardingPrefs";
import { updateProfile } from "./updateProfile";
import { billingLogout, configureBilling } from "./billing";
import { googleSignOut } from "./googleAuth";
import { bridgeRefresh } from "./ttsBridge";
import { clearPremium } from "./premium";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDED_KEY } from "./onboarding";

/** Misafir hesaba geçtiğinde bir kez gösterilecek not (bkz. ui/GuestClaimNotice). */
export type ClaimNotice = "moved" | "merged";

type Ctx = {
  user: AuthUser | null;
  /** Oturum ilk kez okunuyor (açılış): ekran kararı bunu bekler. */
  loading: boolean;
  /**
   * "Hesapsız devam et" (mağaza ön inceleme B24): sunucuda misafir kimliği açar
   * ve onboarding seçimlerini ona yazar. Başarısızsa sebep döner (429 sınır,
   * 0 ağ yok).
   */
  continueAsGuest: () => Promise<GuestStart>;
  /** Profil › "Misafir verilerini sil": sunucudaki misafiri ve cihazdaki her şeyi siler. */
  deleteGuest: () => Promise<boolean>;
  /** Son birleşmenin notu; gösteren ekran `clearClaimNotice` ile kapatır. */
  claimNotice: ClaimNotice | null;
  clearClaimNotice: () => void;
  /**
   * Cihazdaki misafir kimliği sunucuda artık yok (30 gün kullanılmadı ya da
   * silindi). Giriş ekranı nedenini söylüyor; yeni misafir ya da girişle kapanır.
   */
  guestGone: boolean;
  clearGuestGone: () => void;
  /** `captchaToken`: bot koruması açıkken zorunlu (bkz. lib/auth post). */
  signIn: (email: string, password: string, captchaToken?: string | null) => Promise<AuthOutcome>;
  signUp: (name: string, email: string, password: string, captchaToken?: string | null) => Promise<AuthOutcome>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  /** Sosyal giriş WebView'i bitince: oturumu tazele + onboarding prefs'i uygula. */
  socialComplete: () => Promise<boolean>;
};

const AuthContext = createContext<Ctx>({
  user: null, loading: true,
  continueAsGuest: async () => ({ ok: false, status: 0, code: "" }),
  deleteGuest: async () => false,
  claimNotice: null,
  clearClaimNotice: () => {},
  guestGone: false,
  clearGuestGone: () => {},
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

/**
 * Ağ yokken açılan misafir. Misafirin geri giriş yolu yok: oturum okunamadı
 * diye onu çıkış yapmış saymak, giriş ekranında "Hesapsız devam et"e basan
 * kişiye YENİ bir kimlik açtırıp ilerlemesini kaybettirirdi. Cihazdaki kayıt
 * kimliği biliyor; istekler ağ gelince oturum çereziyle zaten doğru gidiyor.
 */
function provisionalGuest(id: string): AuthUser {
  return { id, name: null, email: null, createdAt: null, guest: true };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimNotice, setClaimNotice] = useState<ClaimNotice | null>(null);
  const [guestGone, setGuestGone] = useState(false);
  /** Kullanıcı ağsız açılışta cihaz kaydından mı kuruldu (bkz. provisionalGuest). */
  const provisional = useRef(false);

  /**
   * MİSAFİR HESABA GEÇİYOR. Gerçek bir oturum açıldığında, hesabın başka bir
   * isteği gitmeden ÖNCE çağrılıyor: cihazda misafir kaydı varsa misafirin
   * ilerlemesi sunucuda hesaba birleşiyor (bkz. lib/guest `claimGuest`).
   * Önce profil yazımı ya da kuyruk boşaltma gitseydi hesap kendi boş
   * satırlarını kurar, misafirin seçimlerini görmezdi.
   *
   * Yeni hesaba TAŞINDIYSA hesabın gerçek adı profile yazılıyor: misafirin
   * profili adsızdı ve onboarding seçimleri misafir açılırken zaten harcandı,
   * yani `adoptAccount` ada ulaşamadan dönüyor.
   */
  const claimPendingGuest = useCallback(async (u: AuthUser, yeniHesap: boolean) => {
    if (u.guest) return;
    const rec = await loadGuestRecord();
    if (!rec || rec.id === u.id) return;
    const out = await claimGuest(rec, u.id);
    if (out.kind !== "merged") return;
    setClaimNotice(out.hadProgress ? "merged" : "moved");
    const ad = gercekAd(u);
    if (!out.hadProgress && yeniHesap && ad) await updateProfile({ displayName: ad });
  }, []);

  /**
   * OTURUMU OLMAYAN AMA CİHAZDA KAYDI DURAN MİSAFİR (bkz. lib/guest
   * `resumeGuest`). Çerez gitmiş olabilir — iki adımlı doğrulaması olan bir
   * hesaba giriş denenip kodda vazgeçilmesi bunu yapıyor — ama kimlik
   * sunucuda duruyor: oturum jetonla geri kuruluyor. Kimlik gerçekten
   * yoksa cihazdaki hesap verisi (seri, kuyruklar, yarım ders) o misafirindi
   * ve siliniyor; yoksa aynı telefonda açılan yeni misafir onları devralırdı.
   */
  const restoreGuest = useCallback(async (rec: GuestRecord): Promise<AuthUser | null> => {
    const out = await resumeGuest(rec);
    if (out === "resumed") {
      provisional.current = false;
      return (await getSession()) ?? provisionalGuest(rec.id);
    }
    if (out === "retry") { provisional.current = true; return provisionalGuest(rec.id); }
    provisional.current = false;
    await forgetAccountScoped();
    setGuestGone(true);
    return null;
  }, []);

  const refresh = useCallback(async () => {
    const s = await getSessionState();
    // Okunamadıysa eldeki kullanıcı korunuyor: ağ kesintisi çıkış değil.
    if (!s.known) return;
    provisional.current = false;
    let u = s.user;
    if (u) await claimPendingGuest(u, yeniHesapMi(u));
    else {
      const rec = await loadGuestRecord();
      if (rec && !rec.for) u = await restoreGuest(rec);
    }
    setUser(u);
  }, [claimPendingGuest, restoreGuest]);

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
      const s = await getSessionState();
      let u = s.user;
      if (u) await claimPendingGuest(u, false);
      else {
        const rec = await loadGuestRecord();
        if (rec && !rec.for) {
          if (s.known) u = await restoreGuest(rec);
          else { u = provisionalGuest(rec.id); provisional.current = true; }
        }
      }
      if (alive) { setUser(u); setLoading(false); }
    })();
    return () => { alive = false; };
  }, [claimPendingGuest, restoreGuest]);

  // Ağsız açılan misafir: uygulama öne gelince oturum yeniden okunuyor.
  useEffect(() => {
    const sub = AppState.addEventListener("change", (st) => {
      if (st === "active" && provisional.current) void refresh();
    });
    return () => sub.remove();
  }, [refresh]);

  // Kullanıcı değişince RevenueCat'i hesap kimliğiyle başlat/güncelle (web+mobil
  // aynı entitlement). Anahtar yoksa güvenle no-op.
  //
  // MİSAFİR SATIN ALMAYA EŞLENMİYOR. Premium hesap istiyor (sunucu lib/auth/
  // guest): misafir kimliğiyle alınan bir abonelik başka cihazda geri
  // yüklenemez ve kimlik birleşince yenilemeleri sahipsiz kalırdı. Misafirde
  // sağlayıcı anonim kalıyor; ödeme ekranı hesap oluşturmayı öneriyor.
  const billingId = user && !user.guest ? user.id : null;
  useEffect(() => { void configureBilling(billingId); }, [billingId]);

  // Uzak bildirim jetonu hesaba yazılıyor: oturum varken kaydet. Firebase
  // yapılandırması yoksa sessizce no-op (bkz. pushDevice.ts). Hatırlatmalar
  // hesap istiyor: misafirde jeton hiç alınmıyor.
  useEffect(() => { if (billingId) void registerPushDevice(); }, [billingId]);

  // Giriş yapılınca (veya açılışta oturum geri yüklenince) TTS köprüsünü tazele.
  // Köprü uygulama kökünde girişten ÖNCE yükleniyor; taze kurulum/silip-yükle
  // sonrası oturumsuz kalıp o oturumu cihaz TTS'ine kilitliyordu. Giriş sonrası
  // oturum çerezi artık paylaşımlı depoda (Android CookieManager / iOS shared)
  // olduğundan reload köprüyü kimlikli yapar → Katja/Conrad/Emel yeni kurulumda da çalışır.
  useEffect(() => { if (user?.id) bridgeRefresh(true); }, [user?.id]);

  const signIn = useCallback(async (email: string, password: string, captchaToken?: string | null) => {
    const r = await apiSignIn(email, password, captchaToken);
    /*
      İKİ ADIMLI DOĞRULAMA BEKLİYORSA burada hiçbir şey yazılmıyor: oturum
      yok, `getSession()` de null döner ve kullanıcıyı null'a çekmek ekranı
      "çıkış yapılmış" saymaya iterdi. Yazma işi ikinci adım bitince
      (verify-otp) yapılıyor.
    */
    if (r.ok && r.twoFactor) return r;
    // Giriş = hesap zaten vardı: akışta seçilenler değil, hesabın kendi ayarları geçerli.
    if (r.ok) {
      const u = r.user ?? (await getSession());
      if (u) await claimPendingGuest(u, false);
      setUser(u);
      await adoptAccount(u, false);
    }
    return r;
  }, [adoptAccount, claimPendingGuest]);

  /**
   * Kayıt. OTURUM AÇILDIYSA kullanıcıyı yazar — açılmadıysa yazmaz.
   *
   * Doğrulama zorunluyken sunucu 200 dönüyor ama oturum çerezi yazmıyor
   * (bkz. auth.AuthOutcome.session). Eskiden bu ayrım yoktu: `r.ok` yeterli
   * sayılıyor, `user` state'e yazılıyor ve ekran uygulamaya geçiyordu. Ortaya
   * çıkan durum "giriş yapmış görünen ama oturumu olmayan" bir uygulamaydı —
   * her istek 401, açılışta yeniden giriş ekranı, arada hiçbir açıklama yok.
   *
   * `adoptAccount` da oturuma bağlı: içindeki profil yazımı oturumsuz 401 alır
   * ve bekleyen onboarding seçimleri boşuna harcanırdı. Şimdi seçimler
   * cihazda kalıyor, kullanıcı doğrulayıp girince devrediliyor.
   */
  const signUp = useCallback(async (name: string, email: string, password: string, captchaToken?: string | null) => {
    const r = await apiSignUp(name, email, password, captchaToken);
    if (r.ok && r.session) {
      const u = r.user ?? (await getSession());
      if (u) await claimPendingGuest(u, true);
      setUser(u);
      await adoptAccount(u, true);
    }
    return r;
  }, [adoptAccount, claimPendingGuest]);

  const signOut = useCallback(async () => {
    /* Bu hesaba sabitlenmiş, ağ yüzünden bekleyen bir misafir birleştirmesi
       varsa oturum kapanmadan son kez deneniyor: çıkıştan sonra "Hesapsız
       devam et" kaydı yenisiyle ezer ve eski misafirin ilerlemesi sahipsiz kalır. */
    const pending = await loadGuestRecord();
    if (pending?.for) await claimGuest(pending, pending.for);
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
    if (u) await claimPendingGuest(u, yeniHesapMi(u));
    setUser(u);
    // Sosyal düğme hem kayıt hem giriş: hesabın yaşı ayırıyor (bkz. yeniHesapMi).
    if (u) await adoptAccount(u, yeniHesapMi(u));
    return !!u;
  }, [adoptAccount, claimPendingGuest]);

  /**
   * "Hesapsız devam et". Misafir de yeni bir hesap gibi onboarding seçimlerini
   * profiline alıyor (kurs, seviye, hedef, anadil); ad yok.
   */
  const continueAsGuest = useCallback(async (): Promise<GuestStart> => {
    const r = await startGuest();
    if (!r.ok) return r;
    provisional.current = false;
    setGuestGone(false);
    const u = (await getSession()) ?? provisionalGuest(r.record.id);
    setUser(u);
    await adoptAccount(u, true);
    return r;
  }, [adoptAccount]);

  /**
   * Misafir verilerini sil. Misafirin çıkış yolu yok (bir daha dönemez); bu
   * yüzden "çıkış" yerine bu var ve hesap silmenin aynısı gibi davranıyor:
   * sunucudaki her satır, sonra cihazdaki her şey (dil ve ilk açılış dahil).
   */
  const deleteGuest = useCallback(async () => {
    if (!(await deleteGuestData())) return false;
    await clearGuestRecord();
    await billingLogout();
    clearPremium();
    try { await AsyncStorage.clear(); } catch { /* depolama kapalıysa geç */ }
    provisional.current = false;
    setUser(null);
    return true;
  }, []);

  const clearClaimNotice = useCallback(() => setClaimNotice(null), []);
  const clearGuestGone = useCallback(() => setGuestGone(false), []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refresh, socialComplete, continueAsGuest, deleteGuest, claimNotice, clearClaimNotice, guestGone, clearGuestGone }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
