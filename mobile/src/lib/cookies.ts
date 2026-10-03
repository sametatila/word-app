import { TurboModuleRegistry, type TurboModule } from "react-native";

/**
 * Yerel çerez kavanozunu boşaltır (Android `CookieManager`, iOS
 * `NSHTTPCookieStorage`): RN'in kendi ağ modülünün `clearCookies`i.
 *
 * NEDEN: çıkış sunucuya `sign-out` atıyor ama ağ yoksa (uçak modu, adresi
 * engelleyen kurum ağı) istek düşüyor ve oturum çerezi cihazda kalıyordu.
 * Uygulama yeniden açılınca `get-session` önceki hesabı geri getiriyordu
 * (güvenlik denetimi 2026-10-03, O7). Çerez taban başına ayrı (bkz. api/base);
 * kavanozun tamamı boşaldığı için iki tabanın oturumu birden gidiyor.
 *
 * Misafir jetonu çerezde değil Keychain/Keystore'da (lib/guest): ona dokunmuyor.
 * Bedeli: "bu cihaza güven" (2FA) çerezi de gidiyor, sonraki girişte kod bir
 * kez yeniden soruluyor.
 */
interface NetworkingSpec extends TurboModule {
  clearCookies(callback: (cleared: boolean) => void): void;
}

export function clearLocalCookies(): Promise<void> {
  return new Promise((resolve) => {
    try {
      const mod = TurboModuleRegistry.get<NetworkingSpec>("Networking");
      if (!mod?.clearCookies) return resolve();
      mod.clearCookies(() => resolve());
    } catch {
      resolve();
    }
  });
}
